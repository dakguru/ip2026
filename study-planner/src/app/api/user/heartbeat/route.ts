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

        const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        if (user.currentSessionId !== sessionId) {
            return NextResponse.json({
                success: false,
                code: 'SESSION_CONFLICT',
                message: 'Logged in on another device'
            }, { status: 401 });
        }

        // Update lastActiveAt
        await UserModel.updateOne(
            { _id: user._id },
            { $set: { lastActiveAt: new Date() } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Heartbeat error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
