
import mongoose from 'mongoose';

const LoginLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
    email: { type: String, required: true },
    role: { type: String },
    membershipLevel: { type: String },
    loginAt: { type: Date, default: Date.now },
    logoutAt: { type: Date },
    duration: { type: Number }, // In minutes
    device: {
        type: { type: String }, // Mobile, Desktop, Tablet, App
        os: { type: String },
        browser: { type: String }
    },
    ip: { type: String },
    location: {
        city: { type: String },
        region: { type: String },
        country: { type: String }
    },
    status: { type: String, enum: ['success', 'failed'], required: true },
    failureReason: { type: String },
    sessionId: { type: String }
}, { timestamps: true });

// Index for faster queries
LoginLogSchema.index({ loginAt: -1 });
LoginLogSchema.index({ userId: 1, loginAt: -1 });

export default mongoose.models.LoginLog || mongoose.model('LoginLog', LoginLogSchema);
