import mongoose from 'mongoose';

// A user's bookmark for a specific MCQ question. Unique per user+question so a
// question can never be bookmarked twice by the same user.
const McqBookmarkSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        paperId: { type: String, default: '' },
        topicId: { type: String, required: true, index: true },
        questionId: { type: String, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

McqBookmarkSchema.index({ userId: 1, questionId: 1 }, { unique: true });
McqBookmarkSchema.index({ userId: 1, topicId: 1 });

export default mongoose.models.McqBookmark || mongoose.model('McqBookmark', McqBookmarkSchema);
