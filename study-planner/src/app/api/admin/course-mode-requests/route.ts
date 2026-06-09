import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { isAdmin } from '@/lib/auth-utils';
import CourseModeRequest from '@/models/CourseModeRequest';
import User from '@/models/User';

function serialize(doc: any, membership?: { membershipLevel?: string; planName?: string }) {
    return {
        id: doc._id.toString(),
        userId: doc.userId,
        userName: doc.userName,
        userEmail: doc.userEmail,
        userMobile: doc.userMobile || null,
        // Current (live) membership of the user — the tag identifies which course
        // the user actually paid for (Gold/Silver = LDCE IP, Diamond/Platinum =
        // PS Group B, Free = base). Resolved client-side via getDisplayMembership.
        membershipLevel: membership?.membershipLevel || 'free',
        planName: membership?.planName || null,
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
 * GET — admin/super_admin only. Lists course mode switch requests, optionally
 * filtered by ?status=pending|approved|rejected (omit / "all" for everything).
 */
export async function GET(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const query: any = {};
        if (status && status !== 'all') {
            query.status = status;
        }

        const requests = await CourseModeRequest.find(query)
            .sort({ requestedAt: -1 })
            .lean();

        // Enrich each request with the user's CURRENT membership tier so the admin
        // can see which course the user actually paid for.
        const emails = [...new Set(requests.map((r: any) => r.userEmail).filter(Boolean))];
        const users = emails.length
            ? await User.find({ email: { $in: emails } }, 'email membershipLevel planName').lean()
            : [];
        const membershipMap = users.reduce((acc: Record<string, any>, u: any) => {
            acc[u.email.toLowerCase()] = { membershipLevel: u.membershipLevel, planName: u.planName };
            return acc;
        }, {});

        const counts = {
            pending: await CourseModeRequest.countDocuments({ status: 'pending' }),
            approved: await CourseModeRequest.countDocuments({ status: 'approved' }),
            rejected: await CourseModeRequest.countDocuments({ status: 'rejected' }),
        };

        return NextResponse.json({
            requests: requests.map((r: any) => serialize(r, membershipMap[r.userEmail?.toLowerCase()])),
            counts: { ...counts, all: counts.pending + counts.approved + counts.rejected },
        });
    } catch (error) {
        console.error('Admin course mode requests GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
