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
    code: { type: String, required: true, unique: true },
    isAssigned: { type: Boolean, default: false },
    assignedToEmail: { type: String },
    assignedToName: { type: String },
    assignedToMobile: { type: String },
    assignedAt: { type: Date },
    discountPercentage: { type: Number, default: 30 },
    isValid: { type: Boolean, default: true },
    isRedeemed: { type: Boolean, default: false },
    redeemedAt: { type: Date },
    redeemedByEmail: { type: String }
}, { timestamps: true });

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

const codesToSeed = [
    "0DIADD", "0J2TKI", "0KUVCU", "169Y15", "1D0JNP", "1HL06L", "1V4FBF", "1WF6BO", "2CR0KT", "2UG987",
    "2V0F38", "3FJF2N", "566OMW", "6554NM", "663P83", "6NUFB3", "6OV9HC", "6S1A25", "78DWK3", "7D7UWY",
    "7XF7EB", "815JCE", "85BAXN", "8QBOIQ", "94CLLS", "9ET7FD", "9J5TBT", "9LT0Z2", "9MH5HC", "9TCFW6",
    "9X06X5", "A5RBD0", "AHXTTH", "AP2NVM", "B2BT7B", "B8EMAC", "BEOOJX", "C1XD6G", "CM7JJC", "CSEHWZ",
    "DHPTD2", "DHXQ8Z", "DMEG8P", "DRMQBT", "DZ1H48", "EJRWIH", "EJXO86", "EK1HGF", "EMAXCX", "ESP0KC",
    "F43TEO", "FDG0LD", "FIOHIE", "FV0TMO", "GD7OZQ", "GYBW5P", "H8ZLUZ", "HJ7XEL", "HO8RUC", "IDFFX7",
    "IFZ47R", "IGWGDP", "J9D9WC", "JB1WX7", "KQX3HQ", "LWKXMC", "MICV5J", "MMZBGY", "N7QO1H", "NTIS7M",
    "OJ5JQ7", "OM5SJ8", "OOUMKG", "OTE4PY", "OWOFSD", "PBRA52", "PZ0P91", "QJTEJD", "R716DH", "RMLE1T",
    "SD4PIC", "SU4Z4E", "SUVIOL", "T4AB29", "TNEV6V", "TUGB3E", "TWN0OO", "UPJ7L1", "VAWKHY", "WHBNU8",
    "WSXZ2U", "XLHOEP", "XTFYUB", "XV3OCV", "YFECLL", "YTNWFA", "YW7S0A", "ZEGYLS", "ZEUNTK", "ZW54L8"
];

async function run() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected successfully!');

        const couponsToInsert = codesToSeed.map(code => ({
            code,
            discountPercentage: 30,
            isAssigned: false,
            isValid: true,
            isRedeemed: false
        }));

        const result = await Coupon.insertMany(couponsToInsert, { ordered: false });
        console.log(`\n✅ Successfully inserted ${result.length} new 30% discount coupons.`);

    } catch (err) {
        if (err.code === 11000) {
            console.warn('⚠️ Some coupons already exist in the database (Duplicate Key Error).');
        } else {
            console.error('❌ Failed:', err);
        }
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed.');
    }
}

run();
