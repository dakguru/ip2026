
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // Keeping num ID for now to match interface, or could switch to ObjectId
    author: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: String, default: () => new Date().toISOString() }
});

const PostSchema = new mongoose.Schema({
    // We can let MongoDB manage _id, but current frontend might expect numeric/string ID.
    // existing `id` in JSON was `Date.now()`. We can keep storing it or use _id.
    // Let's keep a custom `postId` for compatibility if needed, or rely on _id.
    // The interface uses `id: number`.
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String, required: true },
    role: { type: String },
    followers: { type: String, default: '0' },
    views: { type: String, default: '0' },
    answer: { type: mongoose.Schema.Types.Mixed, default: null }, // Flexible structure for answer
    comments: [CommentSchema],
    tags: [String],
    likes: { type: Number, default: 0 },
    likedBy: [String],
    createdAt: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
