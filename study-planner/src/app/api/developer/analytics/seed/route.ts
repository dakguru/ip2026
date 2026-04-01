
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import LoginLog from '@/models/LoginLog';
import UserModel from '@/models/User';
import { subDays, subHours, subMinutes } from 'date-fns';

export async function POST() {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
    }

    try {
        await dbConnect();

        // 1. Get some real users to assign logs to
        const users = await UserModel.find({ role: 'user' }).limit(10);
        if (users.length === 0) {
            return NextResponse.json({ error: 'No users found to seed logs for' }, { status: 400 });
        }

        const devices = ['desktop', 'mobile_browser', 'app', 'tablet'];
        const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
        const osList = ['Windows', 'MacOS', 'Android', 'iOS', 'Linux'];
        const statuses = ['success', 'success', 'success', 'failed']; // 75% success rate

        const logs = [];
        const now = new Date();

        // Generate 500 logs over the last 90 days
        for (let i = 0; i < 500; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const daysAgo = Math.floor(Math.random() * 90);
            const hoursAgo = Math.floor(Math.random() * 24);
            const minutesAgo = Math.floor(Math.random() * 60);
            
            const loginTime = subMinutes(subHours(subDays(now, daysAgo), hoursAgo), minutesAgo);
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            logs.push({
                userId: user._id,
                userName: user.name,
                email: user.email,
                role: user.role,
                membershipLevel: user.membershipLevel,
                loginAt: loginTime,
                status: status,
                failureReason: status === 'failed' ? 'Invalid credentials' : null,
                device: {
                    type: devices[Math.floor(Math.random() * devices.length)],
                    os: osList[Math.floor(Math.random() * osList.length)],
                    browser: browsers[Math.floor(Math.random() * browsers.length)]
                },
                ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
                sessionId: Math.random().toString(36).substring(7)
            });
        }

        // Bulk insert
        await LoginLog.insertMany(logs);

        // Also update users' lastActiveAt to make retention stats look real
        for (const user of users) {
             const randomDaysAgo = Math.floor(Math.random() * 40);
             await UserModel.updateOne(
                 { _id: user._id },
                 { $set: { lastActiveAt: subDays(now, randomDaysAgo) } }
             );
        }

        return NextResponse.json({ success: true, count: logs.length });

    } catch (error) {
        console.error('Seeding Error:', error);
        return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
    }
}
