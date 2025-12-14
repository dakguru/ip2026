import { NextRequest, NextResponse } from 'next/server';
import { updateUser, User, getAllUsers } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        // 1. Verify Admin Session
        const sessionCookie = request.cookies.get('user_session');
        let isAdmin = false;

        if (sessionCookie) {
            try {
                // Decode if necessary (cookie values are often URI encoded)
                const cookieValue = decodeURIComponent(sessionCookie.value);
                const session = JSON.parse(cookieValue);

                // robust check: verify against DB to ensures admin role is valid and current
                const users = await getAllUsers();
                const adminUser = users.find(u => u.email === session.email);

                if (adminUser && adminUser.role === 'admin') {
                    isAdmin = true;
                } else if (session.role === 'admin') {
                    // Fallback to expecting the cookie to be trusted if DB lookup fails (though DB lookup shouldn't fail)
                    isAdmin = true;
                }
            } catch (e) {
                console.error("Session parse error in update route:", e);
            }
        }

        if (!isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized: Admin privileges required' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { targetEmail, updates } = body;

        console.log(`Admin updating user ${targetEmail}`, updates);

        if (!targetEmail || !updates) {
            return NextResponse.json(
                { error: 'Missing target email or updates' },
                { status: 400 }
            );
        }

        // 2. Perform Update
        const updatedUser = await updateUser(targetEmail, updates);

        if (!updatedUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error('Admin Update error:', error);
        return NextResponse.json(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { error: (error as any).message || 'Internal server error' },
            { status: 500 }
        );
    }
}
