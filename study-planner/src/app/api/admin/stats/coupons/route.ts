
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Coupon from '@/models/Coupon';

export async function GET() {
    try {
        await dbConnect();

        // Total Coupons
        const total = await Coupon.countDocuments({});

        // Claimed (Assigned)
        const claimed = await Coupon.countDocuments({ isAssigned: true });

        // Redeemed (Used)
        const redeemed = await Coupon.countDocuments({ isRedeemed: true });

        // Available (Not Assigned)
        const available = await Coupon.countDocuments({ isAssigned: false });

        return NextResponse.json({
            stats: {
                total,
                claimed,
                redeemed,
                available
            }
        });

    } catch (error: any) {
        console.error("Coupon Stats Error:", error);
        return NextResponse.json({ error: error.message || 'Error fetching stats' }, { status: 500 });
    }
}
