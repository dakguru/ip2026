import { NextResponse } from 'next/server';
import UserModel from '@/models/User';
import dbConnect from '@/lib/mongoose';

export async function GET() {
    try {
        await dbConnect();

        // Count users active in the last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        const onlineUsers = await UserModel.find({
            lastActiveAt: { $gte: fiveMinutesAgo }
        }).select('name email role lastActiveAt lastPlatform membershipLevel');

        return NextResponse.json({
            count: onlineUsers.length,
            users: onlineUsers
        });
    } catch (error) {
        console.error('Online users stats error:', error);
        return NextResponse.json({ count: 0, users: [] }, { status: 500 });
    }
}
