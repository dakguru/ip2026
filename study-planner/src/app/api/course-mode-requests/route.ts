import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { getUserByEmail } from '@/lib/db';
import { getSessionUser } from '@/lib/quiz-session';
import { createNotification } from '@/lib/notifications';
import CourseModeRequest from '@/models/CourseModeRequest';

const MODE_LABEL: Record<string, string> = {
    LDCE_IP: 'LDCE IP',
    PS_GR_B: 'PS Group B',
};

function serialize(doc: any) {
    return {
        id: doc._id.toString(),
        userId: doc.userId,
        userName: doc.userName,
        userEmail: doc.userEmail,
        userMobile: doc.userMobile || null,
        currentCourseMode: doc.currentCourseMode,
        requestedCourseMode: doc.requestedCourseMode,
        status: doc.status,
        requestedAt: doc.requestedAt,
        reviewedAt: doc.reviewedAt,
        reviewedBy: doc.reviewedBy,
        adminRemarks: doc.adminRemarks,
    };
}

/**
 * GET — returns the current user's pending request (if any) and their most
 * recent request, so the Settings page can show pending/approved/rejected state.
 */
export async function GET() {
    try {
        const session = await getSessionUser();
        if (!session) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        await dbConnect();
        const userId = session._id.toString();

        const pending = await CourseModeRequest.findOne({ userId, status: 'pending' }).lean();
        const latest = await CourseModeRequest.findOne({ userId }).sort({ requestedAt: -1 }).lean();

        return NextResponse.json({
            pending: pending ? serialize(pending) : null,
            latest: latest ? serialize(latest) : null,
        });
    } catch (error) {
        console.error('Course mode request GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST — a normal user submits a course mode switch request. The user is always
 * resolved from the server-side session (never trusted from the body), the
 * course mode is NOT changed here, and duplicate pending requests are blocked.
 */
export async function POST(request: Request) {
    try {
        const session = await getSessionUser();
        if (!session) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { requestedCourseMode } = await request.json();
        if (requestedCourseMode !== 'LDCE_IP' && requestedCourseMode !== 'PS_GR_B') {
            return NextResponse.json({ error: 'Invalid course mode.' }, { status: 400 });
        }

        const user = await getUserByEmail(session.email);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Admin / super_admin switch directly and should not use this flow.
        if (user.role === 'admin' || user.role === 'super_admin') {
            return NextResponse.json(
                { error: 'Admins can switch course mode directly without approval.' },
                { status: 400 }
            );
        }

        const currentCourseMode = user.courseMode || 'LDCE_IP';

        // Edge case: same mode → nothing to do.
        if (requestedCourseMode === currentCourseMode) {
            return NextResponse.json(
                { error: 'You are already using this course mode.' },
                { status: 400 }
            );
        }

        await dbConnect();
        const userId = user.id;

        // Prevent duplicate pending requests (also enforced at DB-query level).
        const existing = await CourseModeRequest.findOne({ userId, status: 'pending' }).lean();
        if (existing) {
            return NextResponse.json(
                {
                    error: 'You already have a pending Course Mode Switch Request. Please wait for Admin Approval.',
                    pending: serialize(existing),
                },
                { status: 409 }
            );
        }

        const created = await CourseModeRequest.create({
            userId,
            userName: user.name,
            userEmail: user.email,
            userMobile: user.mobile || null,
            currentCourseMode,
            requestedCourseMode,
            status: 'pending',
            requestedAt: new Date(),
            reviewedAt: null,
            reviewedBy: null,
            adminRemarks: null,
        });

        // Notify admins about the new request.
        await createNotification(
            'course_mode_request',
            'New Course Mode Switch Request',
            `${user.name} requested to switch from ${MODE_LABEL[currentCourseMode]} to ${MODE_LABEL[requestedCourseMode]}.`,
            {
                targetRole: 'admin',
                requestId: created._id.toString(),
                userEmail: user.email,
                userName: user.name,
            }
        );

        return NextResponse.json({
            success: true,
            message:
                'Your course mode switch request has been submitted for Admin Approval. You will continue in your existing course mode until approval.',
            request: serialize(created),
        });
    } catch (error) {
        console.error('Course mode request POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
