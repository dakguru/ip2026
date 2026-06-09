import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { isAdmin, getAdminEmail } from '@/lib/auth-utils';
import { getUserByEmail, updateUser } from '@/lib/db';
import { createNotification } from '@/lib/notifications';
import CourseModeRequest from '@/models/CourseModeRequest';

const MODE_LABEL: Record<string, string> = {
    LDCE_IP: 'LDCE IP',
    PS_GR_B: 'PS Group B',
};

/**
 * PATCH — admin/super_admin approves or rejects a course mode switch request.
 *
 * Security: the role is verified server-side via isAdmin(). Only on APPROVE is
 * the target user's course mode updated. Rejection leaves it unchanged.
 * Body: { action: 'approve' | 'reject', remarks?: string }
 */
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { id } = await params;
        const { action, remarks } = await request.json();

        if (action !== 'approve' && action !== 'reject') {
            return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
        }

        await dbConnect();
        const reqDoc = await CourseModeRequest.findById(id);
        if (!reqDoc) {
            return NextResponse.json({ error: 'Request not found.' }, { status: 404 });
        }

        if (reqDoc.status !== 'pending') {
            return NextResponse.json(
                { error: `This request has already been ${reqDoc.status}.` },
                { status: 409 }
            );
        }

        const adminEmail = (await getAdminEmail()) || 'admin';
        const now = new Date();

        // Edge case: user deleted / inactive after raising the request.
        const targetUser = await getUserByEmail(reqDoc.userEmail);
        if (!targetUser) {
            reqDoc.status = 'rejected';
            reqDoc.reviewedAt = now;
            reqDoc.reviewedBy = adminEmail;
            reqDoc.adminRemarks = 'User account no longer exists.';
            await reqDoc.save();
            return NextResponse.json(
                { error: 'This user no longer exists. The request has been marked invalid.' },
                { status: 404 }
            );
        }

        if (action === 'approve') {
            // Update the user's course mode to the requested one.
            await updateUser(targetUser.email, { courseMode: reqDoc.requestedCourseMode });

            reqDoc.status = 'approved';
            reqDoc.reviewedAt = now;
            reqDoc.reviewedBy = adminEmail;
            await reqDoc.save();

            await createNotification(
                'course_mode_approved',
                'Course Mode Switch Approved',
                `Your Course Mode Switch Request has been approved. Your course mode has been changed to ${MODE_LABEL[reqDoc.requestedCourseMode]} successfully.`,
                { targetUserEmail: targetUser.email, requestId: reqDoc._id.toString() }
            );

            return NextResponse.json({
                success: true,
                message: 'Course mode switch request approved successfully.',
            });
        }

        // Reject
        const cleanRemarks = typeof remarks === 'string' && remarks.trim() ? remarks.trim() : null;
        reqDoc.status = 'rejected';
        reqDoc.reviewedAt = now;
        reqDoc.reviewedBy = adminEmail;
        reqDoc.adminRemarks = cleanRemarks;
        await reqDoc.save();

        const rejectMsg = cleanRemarks
            ? `Your Course Mode Switch Request has been rejected by Admin. Reason: ${cleanRemarks}`
            : 'Your Course Mode Switch Request has been rejected. Please contact Admin for further clarification.';

        await createNotification(
            'course_mode_rejected',
            'Course Mode Switch Rejected',
            rejectMsg,
            { targetUserEmail: targetUser.email, requestId: reqDoc._id.toString() }
        );

        return NextResponse.json({
            success: true,
            message: 'Course mode switch request rejected successfully.',
        });
    } catch (error) {
        console.error('Admin course mode request PATCH error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
