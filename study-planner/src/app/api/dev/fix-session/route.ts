import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'email query param required' }, { status: 400 });
        }

        // Find user (case-insensitive)
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

        if (!user) {
            return NextResponse.json({ error: `User ${email} not found` }, { status: 404 });
        }

        return NextResponse.json({
            email: user.email,
            currentSessionId: user.currentSessionId ?? null,
            lastActiveAt: user.lastActiveAt ?? null,
            lastPlatform: user.lastPlatform ?? null,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'email required in body' }, { status: 400 });
        }

        // Clear the session — user will need to log in fresh
        const result = await User.findOneAndUpdate(
            { email: { $regex: new RegExp(`^${email}$`, 'i') } },
            { $unset: { currentSessionId: '' }, $set: { lastActiveAt: new Date() } },
            { new: true }
        );

        if (!result) {
            return NextResponse.json({ error: `User ${email} not found` }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Session cleared. User can now log in fresh.',
            email: result.email,
            currentSessionId: result.currentSessionId ?? null,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
