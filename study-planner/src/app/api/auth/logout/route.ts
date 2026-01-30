import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });

    const cookieOptions = {
        path: '/',
        ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
    };

    // Clear cookies with matching options
    response.cookies.set('auth_token', '', { ...cookieOptions, maxAge: 0 });
    response.cookies.set('user_session', '', { ...cookieOptions, maxAge: 0 });
    response.cookies.set('session_v', '', { ...cookieOptions, maxAge: 0 });

    return response;
}
