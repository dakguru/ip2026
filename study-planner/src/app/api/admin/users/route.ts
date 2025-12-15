import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db';

export async function GET(request: Request) {
    try {
        // In a real app, we would verify the session/token here and check for admin role.
        // Since we are using cookies, let's check for the user_session cookie
        const cookieHeader = request.headers.get('cookie') || '';
        const match = cookieHeader.match(/user_session=([^;]+)/);

        let isAdmin = false;

        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[1]));
                // Verify against DB to ensure role is actually admin
                // (In a real app, you'd use a secure httpOnly token and verify signature)
                const users = await getAllUsers();
                const user = users.find(u => u.email === session.email);
                if (user && user.role === 'admin') {
                    isAdmin = true;
                }
            } catch (e) {
                console.error("Session parse error", e);
            }
        }

        if (!isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized: Admin access required' },
                { status: 403 }
            );
        }

        const users = await getAllUsers();
        // Return safe user data (exclude passwordHash)
        const safeUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            designation: user.designation,
            pincode: user.pincode,
            officeName: user.officeName,
            division: user.division,
            circle: user.circle,
            role: user.role || 'user',
            membershipLevel: user.membershipLevel,
            planId: user.planId,
            planName: user.planName,
            purchaseDate: user.purchaseDate,
            membershipValidity: user.membershipValidity,
            createdAt: user.createdAt
        }));

        return NextResponse.json({ users: safeUsers });

    } catch (error) {
        console.error('Admin API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
