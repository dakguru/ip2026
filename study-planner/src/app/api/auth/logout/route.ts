import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongoose';
import LoginLog from '@/models/LoginLog';

export async function POST() {
    try {
        await dbConnect();
        const cookieStore = await cookies();
        const userSessionCookie = cookieStore.get('user_session')?.value;
        
        if (userSessionCookie) {
            try {
                const sessionData = JSON.parse(userSessionCookie);
                if (sessionData.sessionId) {
                    // Update LoginLog with logoutAt
                    const loginEnd = new Date();
                    const log = await LoginLog.findOne({ sessionId: sessionData.sessionId });
                    if (log) {
                        log.logoutAt = loginEnd;
                        // Approximate duration in minutes
                        log.duration = Math.ceil((loginEnd.getTime() - log.loginAt.getTime()) / (1000 * 60));
                        await log.save();
                    }
                }
            } catch (e) {
                console.error('Logout logging error (parse):', e);
            }
        }

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
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ success: true }); // Still return success to clear UI
    }
}
