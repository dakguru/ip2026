import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import IosInterest from '@/models/IosInterest';

export async function GET() {
    try {
        await dbConnect();
        const count = await IosInterest.countDocuments();
        return NextResponse.json({ count });
    } catch (error) {
        console.error("Error fetching iOS interest count:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Basic IP extraction
        let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        if (ip.includes(',')) {
            ip = ip.split(',')[0].trim();
        }

        // If 'unknown', we might allow it (or block, but better to allow for now)
        // Check if this IP is already recorded
        if (ip !== 'unknown') {
            const existing = await IosInterest.findOne({ ip });
            if (existing) {
                // Already voted
                const count = await IosInterest.countDocuments();
                return NextResponse.json({ success: true, count, message: "Use existing vote" });
            }
        } else {
            // Fallback for local dev where IP might be tricky or missing
            // Generate a random ID if we want to allow testing, but for production let's stick to IP or just allow 
            // In dev localhost is ::1 or 127.0.0.1
        }

        // Create new vote
        // Generate a random suffix if IP is unknown/localhost to allow multiple tests in dev
        if (process.env.NODE_ENV === 'development' && (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1')) {
            ip = `dev-${Date.now()}-${Math.random()}`;
        }

        await IosInterest.create({ ip });
        const count = await IosInterest.countDocuments();

        return NextResponse.json({ success: true, count });

    } catch (error: any) {
        // Handle duplicate key error specifically (race condition)
        if (error.code === 11000) {
            const count = await IosInterest.countDocuments();
            return NextResponse.json({ success: true, count, message: "Already voted" });
        }
        console.error("Error recording iOS interest:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
