
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['system', 'enrollment', 'purchase', 'coupon_claim', 'coupon_redeem', 'membership_upgrade', 'community_post', 'community_comment', 'admin_message', 'deployment', 'new_user', 'user_register', 'error_report']
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed }, // flexible for userId, postId, etc.
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
