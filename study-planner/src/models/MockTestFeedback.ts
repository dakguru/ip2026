import mongoose from "mongoose";

const MockTestFeedbackSchema = new mongoose.Schema({
    testId:             { type: String, required: true },
    userEmail:          { type: String, required: true },
    userName:           { type: String, default: 'Anonymous' },

    // Ratings (1–5)
    overallRating:      { type: Number, required: true, min: 1, max: 5 },
    difficultyRating:   { type: Number, required: true, min: 1, max: 5 },   // 1=Very Easy … 5=Very Hard
    contentQuality:     { type: Number, required: true, min: 1, max: 5 },
    explanationQuality: { type: Number, required: true, min: 1, max: 5 },

    // Optional enrichment
    favoriteTopics:     { type: [String], default: [] },
    suggestions:        { type: String, default: '' },
    wouldRecommend:     { type: Boolean, default: true },

    submittedAt:        { type: Date, default: Date.now }
});

// One feedback per user per test
MockTestFeedbackSchema.index({ testId: 1, userEmail: 1 }, { unique: true });

export default mongoose.models.MockTestFeedback ||
    mongoose.model('MockTestFeedback', MockTestFeedbackSchema);
