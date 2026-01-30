import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, sessionId } = await request.json();

        if (!email || !sessionId) {
            return NextResponse.json({ valid: false, status: 'invalid' }, { status: 400 });
        }

        const status = await validateSession(email, sessionId);

        if (status === 'conflict') {
            return NextResponse.json({
                valid: false,
                status: 'conflict',
                code: 'SESSION_CONFLICT',
                message: 'Logged in on another device'
            }, { status: 401 });
        }

        return NextResponse.json({ valid: status === 'valid', status });
    } catch (error) {
        console.error('Session validation error:', error);
        return NextResponse.json({ valid: false, status: 'error' }, { status: 500 });
    }
}
