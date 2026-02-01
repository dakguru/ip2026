const mongoose = require('mongoose');

// Ideally this should come from process.env, but hardcoded for the script as per previous file content
const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const coupons = [
    "DG7K2P", "XJ9M4W", "BT5N8R", "QZ1V6Y", "HK3L9M",
    "P4W7NB", "CV2M9K", "RT8X5Z", "GN6P1Q", "YJ3D7W",
    "MK9L2V", "BR4H7N", "XF5K8P", "TW1Z6M", "QS3G9D",
    "NP7W2X", "VK4M8R", "HY1B6Z", "LT5N9P", "JC2K7W",
    "GD8X3M", "RZ6P1V", "KW4L9N", "BM2H7Q", "TV5Z8K",
    "PL9N3W", "HX7K2M", "CR5V8Z", "BK1G6P", "MW4Q9D",
    "ZF7L2N", "VD5H8K", "RT3P9W", "XJ1M6V", "GY4B7Q",
    "KS8N2M", "PW6V3Z", "HL9K1D", "BT4R7X", "NV2M5P",
    "QW7Z3K", "MJ9N1G", "BR5L8V", "XH2D6W", "TK4P9N",
    "PV1G7M", "KZ8X3W", "HN5M2Q", "BC7L9R", "WF4K2Z"
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
