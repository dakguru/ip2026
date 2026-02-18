
import mongoose from 'mongoose';

const ErrorReportSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['PDF Notes', 'MCQs', 'Mock Tests', 'FlashCards', 'Other']
    },
    topic: { type: String, required: true },
    screenshot: { type: String, default: '' }, // base64 string
    description: { type: String, required: true },
    reportedBy: { type: String, required: true },
    reportedByEmail: { type: String, default: '' },
    adminReply: { type: String, default: '' },
    status: {
        type: String,
        enum: ['pending', 'resolved', 'dismissed'],
        default: 'pending'
    }
}, { timestamps: true });

export default mongoose.models.ErrorReport || mongoose.model('ErrorReport', ErrorReportSchema);
