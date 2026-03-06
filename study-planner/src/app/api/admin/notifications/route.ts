
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Notification from '@/models/Notification';

export async function GET(req: Request) {
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

        const { searchParams } = new URL(req.url);
        const scope = searchParams.get('scope');

        let filter: any = {};

        // If scope is public, ONLY show community updates and app deployments/updates
        // Hide sensitive info like 'enrollment', 'purchase', 'system' (used for user registration), etc.
        if (scope === 'public') {
            filter.type = {
                $in: ['community_post', 'community_comment', 'deployment', 'admin_message']
            };
        }

        const notifications = await Notification.find(filter)
            .sort({ createdAt: -1 })
            .limit(100);

        // Map notifications to POJO to allow adding properties
        const notificationObjects = notifications.map(n => n.toObject());

        // Enrich with user info if userId (email) exists in metadata
        const userEmails = [...new Set(notificationObjects
            .map(n => n.metadata?.userId || n.metadata?.email)
            .filter(Boolean))];

        if (userEmails.length > 0) {
            const users = await (await import('@/models/User')).default.find({
                email: { $in: userEmails }
            }, 'email membershipLevel planName courseMode name');

            const userMap = users.reduce((acc, user) => {
                acc[user.email.toLowerCase()] = {
                    membershipLevel: user.membershipLevel,
                    planName: user.planName,
                    courseMode: user.courseMode,
                    name: user.name
                };
                return acc;
            }, {} as Record<string, any>);

            notificationObjects.forEach((n: any) => {
                const email = n.metadata?.userId || n.metadata?.email;
                if (email && userMap[email.toLowerCase()]) {
                    n.userContext = userMap[email.toLowerCase()];
                }
            });
        }

        return NextResponse.json({ notifications: notificationObjects });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await connectDB();
        const { id, markAll } = await req.json();

        if (markAll) {
            await Notification.updateMany({ isRead: false }, { $set: { isRead: true } });
            return NextResponse.json({ success: true, message: 'All notifications marked as read' });
        }

        if (id) {
            await Notification.findByIdAndUpdate(id, { $set: { isRead: true } });
            return NextResponse.json({ success: true, message: 'Notification marked as read' });
        }

        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
    }
}
