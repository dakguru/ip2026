import mongoose from "mongoose";

/**
 * Crowd-sourced LDCE IP 2026 score predictions.
 * Submitted publicly (no login) from /cutoff-prediction.
 */
const CutoffPredictionSchema = new mongoose.Schema({
    exam:       { type: String, default: 'LDCE_IP_2026', index: true },
    name:       { type: String, required: true, trim: true, maxlength: 60 },
    circle:     { type: String, default: '', trim: true, maxlength: 60 },

    paper1:     { type: Number, required: true, min: 0, max: 250 },
    paper2:     { type: Number, required: true, min: 0, max: 50 },
    paper3:     { type: Number, required: true, min: 0, max: 300 },
    total:      { type: Number, required: true, min: 0, max: 600, index: true },

    // Lets the submitter edit their own entry from the same browser.
    editToken:  { type: String, required: true, index: true, select: false },
    // SHA-256 of client IP (never stored raw) for rate limiting.
    ipHash:     { type: String, default: '', index: true, select: false },

    hidden:     { type: Boolean, default: false, index: true },
}, { timestamps: true });

CutoffPredictionSchema.index({ exam: 1, hidden: 1, total: -1, createdAt: 1 });

export default mongoose.models.CutoffPrediction ||
    mongoose.model('CutoffPrediction', CutoffPredictionSchema);
