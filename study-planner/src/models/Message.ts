
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    senderName: { type: String, required: true },
    senderEmail: { type: String }, // Optional as user might not provide it in some contexts, but expected here
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
