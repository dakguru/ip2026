import mongoose from 'mongoose';

// Question-level snapshot for an attempt. We freeze the question text, options,
// correct answer and explanation at submission time so historical PDFs/reviews
// remain accurate even if the source question is later edited.
const McqAttemptAnswerSchema = new mongoose.Schema(
    {
        attemptId: { type: mongoose.Schema.Types.ObjectId, ref: 'McqAttempt', required: true, index: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        topicId: { type: String, required: true, index: true },
        questionId: { type: String, required: true },
        questionNumber: { type: Number },
        questionTextSnapshot: { type: String, default: '' },
        optionASnapshot: { type: String, default: '' },
        optionBSnapshot: { type: String, default: '' },
        optionCSnapshot: { type: String, default: '' },
        optionDSnapshot: { type: String, default: '' },
        // Stored as index (0-3) to align with the rest of the quiz engine. -1 = unattempted.
        selectedOption: { type: Number, default: -1 },
        correctOptionSnapshot: { type: Number, default: 0 },
        isCorrect: { type: Boolean, default: false },
        isUnattempted: { type: Boolean, default: true },
        explanationSnapshot: { type: String, default: '' },
        wasBookmarkedAtSubmission: { type: Boolean, default: false },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

// Used by Revision Mode to find previously-wrong questions for a user+topic.
McqAttemptAnswerSchema.index({ userId: 1, topicId: 1, isCorrect: 1 });

export default mongoose.models.McqAttemptAnswer || mongoose.model('McqAttemptAnswer', McqAttemptAnswerSchema);
