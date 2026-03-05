import { NextResponse } from 'next/server';
import { verifyUser, updateSession } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Missing credentials' },
                { status: 400 }
            );
        }

        const user = await verifyUser(email, password);

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate a unique session ID
        const sessionId = crypto.randomUUID();
        await updateSession(user.email, sessionId);

        // maxAge in seconds (30 days — keep user logged in until they login on another device)
        const maxAge = 60 * 60 * 24 * 30;

        // Create response
        const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, courseMode: user.courseMode } });

        // Set cookie - auth_token now holds email and sessionId
        response.cookies.set('auth_token', `${user.email}:${sessionId}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Use 'lax' instead of 'strict' for redirects
            maxAge: maxAge,
            path: '/',
            ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
        });

        // Set a client-readable cookie for UI state (non-httpOnly)
        response.cookies.set('user_session', JSON.stringify({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            membershipLevel: user.membershipLevel,
            planId: user.planId,
            sessionId: sessionId
        }), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: maxAge,
            path: '/',
            ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
