
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Coupon from '@/models/Coupon';

const RAW_CODES = [
    "X7K9P2", "M3N5B8", "Q1W9E4", "R7T2Y6", "U3I5O8", "P2L4K9", "J7H1G5", "F3D6S9", "A2Q8W4", "E5R1T7",
    "Y3U9I2", "O6P4L8", "K1J7H3", "G5F9D2", "S8A4Q6", "W2E7R3", "T9Y1U5", "I4O8P2", "L7K3J6", "H1G9F4",
    "D5S2A8", "Z3X6C9", "V1B7N4", "M8Q2W5", "E9R3T6", "Y1U7I4", "O2P8L5", "K9J3H6", "G4F7D1", "S5A9Q2",
    "W8E4R7", "T1Y6U3", "I9O2P5", "L4K8J1", "H7G3F6", "D2S9A5", "Z8X4C1", "V5B2N9", "M6Q1W7", "E3R8T4",
    "Y9U2I5", "O1P7L3", "K5J9H2", "G8F4D6", "S1A7Q3", "W9E2R5", "T4Y8U1", "I6O3P9", "L2K5J8", "H9G1F4",
    "D7S3A6", "Z2X9C5", "V8B4N1", "M1Q7W3", "E5R9T2", "Y4U1I8", "O9P3L6", "K2J8H5", "G7F1D9", "S3A5Q8",
    "W6E2R4", "T8Y3U9", "I1O5P7", "L9K2J4", "H5G8F1", "D3S6A9", "Z7X1C4", "V3B9N2", "M5Q4W8", "E2R7T1",
    "Y8U3I6", "O4P9L2", "K7J1H5", "G3F6D8", "S9A2Q4", "W1E5R7", "T6Y2U8", "I3O9P1", "L5K4J7", "H2G6F3",
    "D9S1A5", "Z4X7C2", "V6B3N8", "M2Q9W1", "E8R4T5", "Y5U1I7", "O7P2L6", "K3J9H4", "G9F5D1", "S4A8Q2",
    "W7E3R6", "T2Y5U9", "I8O1P4", "L1K7J3", "H6G2F9", "D4S8A1", "Z9X3C5", "V2B6N7", "M4Q8W2", "E1R5T9"
];

export async function GET() {
    try {
        await dbConnect();

        let addedCount = 0;
        let skippedCount = 0;

        for (const code of RAW_CODES) {
            const exists = await Coupon.findOne({ code });
            if (!exists) {
                await Coupon.create({ code });
                addedCount++;
            } else {
                skippedCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Seed complete. Added ${addedCount}, Skipped ${skippedCount} existing codes.`
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
