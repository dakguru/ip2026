const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const coupons = [
    "T9L3X4",
    "W2N8V7"
];

// Define Schema locally to avoid import issues
const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    isAssigned: { type: Boolean, default: false },
    assignedToEmail: { type: String },
    assignedToName: { type: String },
    assignedToMobile: { type: String },
    assignedAt: { type: Date },
    discountPercentage: { type: Number, default: 50 },
    isValid: { type: Boolean, default: true },
    isRedeemed: { type: Boolean, default: false },
    redeemedAt: { type: Date },
    redeemedByEmail: { type: String }
}, { timestamps: true });

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        let createdCount = 0;
        let existingCount = 0;

        for (const code of coupons) {
            const existing = await Coupon.findOne({ code });
            if (existing) {
                console.log(`Skipping existing coupon: ${code}`);
                existingCount++;
            } else {
                await Coupon.create({
                    code,
                    discountPercentage: 50,
                    isValid: true
                });
                console.log(`Created coupon: ${code}`);
                createdCount++;
            }
        }

        console.log(`\nFinished!`);
        console.log(`Created: ${createdCount}`);
        console.log(`Existing: ${existingCount}`);

    } catch (error) {
        console.error('Error seeding coupons:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seed();
