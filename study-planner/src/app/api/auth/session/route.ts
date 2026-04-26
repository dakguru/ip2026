import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, sessionId } = await request.json();

        if (!email || !sessionId) {
            return NextResponse.json({ valid: false, status: 'invalid' }, { status: 400 });
        }

        const result = await validateSession(email, sessionId);
        const { status, downgraded, membershipLevel } = result;

        if (status === 'conflict') {
            return NextResponse.json({
                valid: false,
                status: 'conflict',
                code: 'SESSION_CONFLICT',
                message: 'Logged in on another device'
            }, { status: 401 });
        }

        const response = NextResponse.json({ 
            valid: status === 'valid', 
            status,
            downgraded 
        });

        // If the user was downgraded due to expiry, update their session cookie
        if (status === 'valid' && downgraded) {
            const userSessionCookie = request.headers.get('cookie')
                ?.split(';')
                .find(c => c.trim().startsWith('user_session='))
                ?.split('=')[1];

            if (userSessionCookie) {
                try {
                    const sessionData = JSON.parse(decodeURIComponent(userSessionCookie));
                    sessionData.membershipLevel = membershipLevel;
                    
                    const cookieOptions = {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 30, // 30 days
                        httpOnly: false,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax' as const,
                        ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
                    };

                    response.cookies.set('user_session', JSON.stringify(sessionData), cookieOptions);
                } catch (e) {
                    console.error("Failed to update user_session cookie after downgrade", e);
                }
            }
        }

        return response;
    } catch (error) {
        console.error('Session validation error:', error);
        return NextResponse.json({ valid: false, status: 'error' }, { status: 500 });
    }
}
