
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    // Kept as a free-form string (no enum) on purpose: the admin notifications UI
    // already renders unknown types via a default config, and a hard enum here
    // silently rejects any newly-added notification type until every running
    // process is restarted (Mongoose caches the compiled model globally). Known
    // types: system, enrollment, purchase, coupon_claim, coupon_redeem,
    // membership_upgrade, community_post, community_comment, admin_message,
    // deployment, new_user, user_register, error_report, mock_test,
    // course_mode_request, course_mode_approved, course_mode_rejected.
    type: {
        type: String,
        required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed }, // flexible for userId, postId, etc.
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
