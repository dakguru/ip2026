import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topicId: { type: String, required: true }, // ID of the topic from QUIZ_DATA
    topicTitle: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    wrongAnswers: { type: Number, required: true }, // or derived
    percentage: { type: Number },
    attemptedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);
