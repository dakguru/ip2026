import mongoose from 'mongoose';

const MockEnrollmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    userMobile: { type: String },
    testId: { type: String, required: true },
    testTitle: { type: String, required: true },
    enrolledAt: { type: Date, default: Date.now },
    paymentId: { type: String },
    orderId: { type: String },
    amount: { type: Number },
    status: { type: String, default: 'completed' }
}, { timestamps: true });

// Ensure unique enrollment per user per test
MockEnrollmentSchema.index({ userEmail: 1, testId: 1 }, { unique: true });

export default mongoose.models.MockEnrollment || mongoose.model('MockEnrollment', MockEnrollmentSchema);
