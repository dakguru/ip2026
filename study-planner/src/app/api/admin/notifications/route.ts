
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Notification from '@/models/Notification';

export async function GET() {
    try {
        await connectDB();

        // Check if we have any notifications, if not, seed a welcome one
        const count = await Notification.countDocuments();
        if (count === 0) {
            await Notification.create({
                type: 'system',
                title: 'Notification System Initialized',
                message: 'Admin notification system is now active. You will receive updates here.',
                createdAt: new Date()
            });
            await Notification.create({
                type: 'deployment',
                title: 'System Update',
                message: 'Admin Dashboard has been updated with new Notification Center.',
                createdAt: new Date()
            });
        }

        const notifications = await Notification.find({})
            .sort({ createdAt: -1 })
            .limit(100);

        return NextResponse.json({ notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}
