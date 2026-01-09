
import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    isAssigned: { type: Boolean, default: false },
    assignedToEmail: { type: String },
    assignedToName: { type: String },
    assignedToMobile: { type: String },
    assignedAt: { type: Date },
    discountPercentage: { type: Number, default: 50 },
    isValid: { type: Boolean, default: true }, // Admin can manually invalidate

    // Redemption Tracking
    isRedeemed: { type: Boolean, default: false },
    redeemedAt: { type: Date },
    redeemedByEmail: { type: String }
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
