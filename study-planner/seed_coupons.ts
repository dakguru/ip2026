import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Need to resolve the current directory for dotenv
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

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

const codes = [
  "8K2M9P","3J7V1W","9L5XQ2","B4N7K1","R9T3M6",
  "G2H8Y5","F1D9S4","Z6P0L3","X7C2V9","A5N1M8",
  "Q3W9E4","S7D2F1","K8L0P6","J4H2G9","M3N1B7",
  "V9C5X2","T8R4E1","P0O7I3","U5Y2T9","L1K8J4",
  "6G3F9D","4S2A7Z","X1C8V5","B9N3M6","K4L7P2",
  "1J9H5G","3F8D2S","7A4Z1X","0C9V6B","5N2M8K",
  "9P4O1I","2U7Y3T","8R5E9W","Q6W2E4","S1D8F3",
  "Z9X5C2","V4B7N1","M8K3L0","P6O2I9","U1Y8T4",
  "G7F3D1","H9G5J2","K0L6P4","N2M8B3","V7C1X9",
  "A4S2D8","W9E5R1","T3Y7U0","I4O8P2","L6K1J9",
  "H5G2F8","D4S7A1","Z0X6C3","V9B2N5","M1N7B4",
  "K8L3P9","J2H5G1","G9F4D7","S3D1A8","P5O9I2",
  "U7Y4T0","R1E6W9","Q2W8E5","C3V9B4","N7M1K2",
  "L8P5O3","I1U9Y6","T2R7E4","W5Q1A9","S8D4F2",
  "G0H6J3","K2L9M5","X7C1V8","B4N2M9","Z5X3C1",
  "P9O4I7","U2Y8T5","R6E1W3","Q0W7E4","S9D5F2",
  "G1H8J4","K3L7M2","X9C5V1","B6N2M8","Z4X0C7",
  "P1O8I5","U3Y9T6","R7E2W4","Q1W8E5","S2D9F6",
  "V5B1N8","M4K0L7","J3H9G6","F2D8S5","A1S7D4",
  "T9R5E2","Y6U2I8","O3P9L5","K0J7H4","G4F1D9"
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI not found in environment");
    }
    
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    let insertedCount = 0;
    let duplicateCount = 0;

    for (const code of codes) {
      try {
        await Coupon.create({ code, discountPercentage: 50 });
        insertedCount++;
      } catch (err: any) {
        if (err.code === 11000) {
          duplicateCount++;
        } else {
          console.error(`Error inserting ${code}:`, err.message);
        }
      }
    }

    console.log(`Successfully inserted ${insertedCount} new coupons.`);
    console.log(`Skipped ${duplicateCount} duplicate coupons.`);
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
