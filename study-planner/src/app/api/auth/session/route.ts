import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, sessionId } = await request.json();

        if (!email || !sessionId) {
            return NextResponse.json({ valid: false }, { status: 400 });
        }

        const isValid = await validateSession(email, sessionId);

        return NextResponse.json({ valid: isValid });
    } catch (error) {
        console.error('Session validation error:', error);
        return NextResponse.json({ valid: false }, { status: 500 });
    }
}
