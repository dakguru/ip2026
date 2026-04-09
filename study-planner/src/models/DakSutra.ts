
import mongoose from 'mongoose';

function generateSlug(length = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

const DakSutraSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    rule_number: { type: String },
    act_name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Rule', 'Section', 'Regulation', 'Circular', 'Explanation']
    },
    effective_date: { type: Date },
    exam_tags: { type: [String], default: [] }, // Multi-select
    official_text: { type: String }, // Rich text
    guru_explanation: { type: String }, // Rich text
    practical_example: { type: String }, // Optional rich text
    exam_insight: { type: String }, // Optional rich text
    document_url: { type: String }, // PDF link
    featured_image: { type: String }, // Optional image
    status: {
        type: String,
        default: 'draft',
        enum: ['draft', 'published']
    },
    created_by: { type: String, required: true }, // Admin email or ID
}, { timestamps: true });

// Auto-generate slug on new documents
DakSutraSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = generateSlug();
    }
    next();
});

// Optimized indexes for faster filtering and sorting
DakSutraSchema.index({ status: 1, createdAt: -1 });
DakSutraSchema.index({ status: 1, category: 1, createdAt: -1 });
DakSutraSchema.index({ slug: 1 });
DakSutraSchema.index({ title: 'text', rule_number: 'text', act_name: 'text' });

// Next.js hot-reloading fix: delete model if it exists to refresh schema
if (mongoose.models.DakSutra) {
    delete mongoose.models.DakSutra;
}

export default mongoose.model('DakSutra', DakSutraSchema);

