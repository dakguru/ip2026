
import mongoose from 'mongoose';

const PostalUpdateSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // UUID string from existing logic
    title: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    link: { type: String }
}, { timestamps: true });

export default mongoose.models.PostalUpdate || mongoose.model('PostalUpdate', PostalUpdateSchema);
