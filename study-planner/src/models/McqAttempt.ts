import mongoose from 'mongoose';

// Attempt-level record for a single MCQ practice session (topic-wise, user-wise).
// Snapshots of the individual questions live in the McqAttemptAnswer collection so
// that old attempt PDFs stay accurate even if a question is later edited.
const McqAttemptSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        paperId: { type: String, default: '' }, // category e.g. "Paper I"
        topicId: { type: String, required: true, index: true },
        topicTitle: { type: String, default: '' },
        mode: { type: String, enum: ['practice', 'exam', 'revision'], default: 'practice' },
        startQuestionNo: { type: Number },
        endQuestionNo: { type: Number },
        selectedBatch: { type: String, default: '' },
        totalQuestions: { type: Number, required: true },
        attemptedCount: { type: Number, default: 0 },
        correctCount: { type: Number, default: 0 },
        wrongCount: { type: Number, default: 0 },
        unattemptedCount: { type: Number, default: 0 },
        score: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 },
        timeTakenSeconds: { type: Number, default: 0 },
        pdfUrl: { type: String, default: '' },
        // PDFs are rendered client-side on demand from the saved snapshots.
        pdfGeneratedStatus: { type: String, enum: ['on_demand', 'stored', 'pending', 'unavailable'], default: 'on_demand' },
    },
    { timestamps: true }
);

McqAttemptSchema.index({ userId: 1, topicId: 1, createdAt: -1 });

export default mongoose.models.McqAttempt || mongoose.model('McqAttempt', McqAttemptSchema);
