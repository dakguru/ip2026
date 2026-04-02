import { NextResponse } from 'next/server';
import { verifyUser, updateSessionById } from '@/lib/db';
import LoginLog from '@/models/LoginLog';
import dbConnect from '@/lib/mongoose';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, password } = await request.json();
        const headerList = await headers();
        
        const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || '0.0.0.0';
        const userAgent = headerList.get('user-agent') || '';
        
        // Simple manual UA parsing
        const isMobile = /mobile|iphone|android|phone/i.test(userAgent);
        const isTablet = /tablet|ipad/i.test(userAgent);
        const deviceType = isTablet ? 'Tablet' : (isMobile ? 'Mobile' : 'Desktop');
        
        let os = 'Unknown OS';
        if (userAgent.indexOf('Win') !== -1) os = 'Windows';
        else if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
        else if (userAgent.indexOf('Android') !== -1) os = 'Android';
        else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
        else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';

        let browser = 'Unknown Browser';
        if (userAgent.indexOf('Chrome') !== -1) browser = 'Chrome';
        else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox';
        else if (userAgent.indexOf('Safari') !== -1) browser = 'Safari';
        else if (userAgent.indexOf('Edge') !== -1) browser = 'Edge';

        if (!email || !password) {
            await LoginLog.create({
                email: email || 'unknown',
                status: 'failed',
                failureReason: 'Missing credentials',
                ip,
                device: { type: deviceType, os, browser }
            });
            return NextResponse.json(
                { error: 'Missing credentials' },
                { status: 400 }
            );
        }

        const user = await verifyUser(email, password);

        if (!user) {
            await LoginLog.create({
                email: email,
                status: 'failed',
                failureReason: 'Invalid email or password',
                ip,
                device: { type: deviceType, os, browser }
            });
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate a unique session ID
        const sessionId = crypto.randomUUID();
        await updateSessionById(user.id, sessionId);

        // Log successful login
        await LoginLog.create({
            userId: user.id,
            userName: user.name,
            email: user.email,
            role: user.role,
            membershipLevel: user.membershipLevel,
            status: 'success',
            ip,
            device: { type: deviceType, os, browser },
            sessionId
        });

        // maxAge in seconds (30 days — keep user logged in until they login on another device)
        const maxAge = 60 * 60 * 24 * 30;

        // Create response
        const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, courseMode: user.courseMode, role: user.role } });

        // Set cookie - auth_token now holds email and sessionId
        response.cookies.set('auth_token', `${user.email}:${sessionId}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: maxAge,
            path: '/',
            ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
        });

        response.cookies.set('user_session', JSON.stringify({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            membershipLevel: user.membershipLevel,
            courseMode: user.courseMode,
            planId: user.planId,
            planName: user.planName,
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
