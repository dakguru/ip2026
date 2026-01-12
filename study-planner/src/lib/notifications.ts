
import Notification from '@/models/Notification';

export type NotificationType = 'system' | 'enrollment' | 'purchase' | 'coupon_claim' | 'coupon_redeem' | 'membership_upgrade' | 'community_post' | 'community_comment' | 'admin_message' | 'deployment';

export async function createNotification(
    type: NotificationType,
    title: string,
    message: string,
    metadata?: Record<string, any>
) {
    try {
        await Notification.create({
            type,
            title,
            message,
            metadata,
            createdAt: new Date(),
            isRead: false
        });
        console.log(`[Notification] Created: ${title}`);
    } catch (error) {
        console.error(`[Notification] Error creating notification:`, error);
    }
}
