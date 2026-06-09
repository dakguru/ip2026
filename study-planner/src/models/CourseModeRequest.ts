
import mongoose from 'mongoose';

/**
 * Course Mode Switch Approval request.
 *
 * Normal users can no longer change `User.courseMode` directly (that was being
 * abused to share one paid profile between two aspirants). Instead they raise a
 * request here which an admin / super_admin reviews. The user's course mode is
 * only updated when the request is approved.
 */
const CourseModeRequestSchema = new mongoose.Schema({
    userId: { type: String, required: true },          // User._id as string
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userMobile: { type: String },
    currentCourseMode: { type: String, enum: ['LDCE_IP', 'PS_GR_B'], required: true },
    requestedCourseMode: { type: String, enum: ['LDCE_IP', 'PS_GR_B'], required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    requestedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date, default: null },
    reviewedBy: { type: String, default: null },       // reviewing admin's email/id
    adminRemarks: { type: String, default: null },
}, { timestamps: true });

// Fast lookups for "does this user already have a pending request?" and admin lists.
CourseModeRequestSchema.index({ userId: 1, status: 1 });
CourseModeRequestSchema.index({ status: 1, requestedAt: -1 });

export default mongoose.models.CourseModeRequest || mongoose.model('CourseModeRequest', CourseModeRequestSchema);
