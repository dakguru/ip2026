const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Setup paths
const PROJECT_ROOT = path.resolve(__dirname, '../');
const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
const envPath = path.join(PROJECT_ROOT, '.env');

// Load environment variables
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config({ path: envPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI not found');
    process.exit(1);
}

const CouponSchema = new mongoose.Schema({
    code: String,
    isAssigned: Boolean,
    assignedToEmail: String,
    assignedToName: String,
    assignedToMobile: String,
    assignedAt: Date,
    discountPercentage: { type: Number, default: 30 },
    isValid: Boolean,
    isRedeemed: Boolean,
    redeemedAt: Date,
    redeemedByEmail: String
}, { timestamps: true });

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

async function run() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected successfully!');

        // Update ALL existing coupons to 30% discount
        const result = await Coupon.updateMany(
            {},
            { $set: { discountPercentage: 30 } }
        );

        console.log(`\n✅ Updated ${result.modifiedCount} coupon(s) to 30% discount.`);
        console.log(`   (${result.matchedCount} total coupons matched)`);

    } catch (err) {
        console.error('❌ Failed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed.');
    }
}

run();
