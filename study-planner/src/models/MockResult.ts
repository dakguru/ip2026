import mongoose from "mongoose";

const MockResultSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: { type: Map, of: Number }, // Map of questionId -> optionIndex
    submittedAt: { type: Date, default: Date.now },
    testId: { type: String, default: 'admin-sample' } // To identify different tests
});

export default mongoose.models.MockResult || mongoose.model("MockResult", MockResultSchema);
