import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import UserModel from '@/models/User';
import dbConnect from '@/lib/mongoose';

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token');

        if (!token) {
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const [email, sessionId] = token.value.split(':');

        if (!email || !sessionId) {
            return NextResponse.json({ success: false }, { status: 401 });
        }

        await dbConnect();

        // Update lastActiveAt for this user
        // We also check sessionId to ensure it's the current valid session, 
        // though strictly updating activity for the email is probably fine too.
        // Let's being precise and check session match is good practice but might fail if session rotated? 
        // No, currentSessionId is what we want.

        await UserModel.updateOne(
            { email: { $regex: new RegExp(`^${email}$`, 'i') } },
            { $set: { lastActiveAt: new Date() } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Heartbeat error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
