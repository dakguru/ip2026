
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json({ error: 'Code required' }, { status: 400 });
        }

        const coupon = await Coupon.findOne({ code, isValid: true });

        if (!coupon) {
            return NextResponse.json({ error: 'Invalid Coupon Code', valid: false }, { status: 400 });
        }

        // We do NOT check isAssigned here necessarily so that users can check validity
        // BUT strict interpretation might be: if assigned to SOMEONE ELSE, it's invalid?
        // Actually, generic coupons might be valid for multiple. But these are unique.
        // So let's check if assigned to THIS user? We don't have user context easily here without session.
        // Let's just return valid=true if it exists in the DB for now. 
        // The prompt implies these are ONE-TIME-USE PER USER? Or just ONE-TIME-DISTRIBUTION?
        // "Once the coupon code sent to one user, it should not be send again to another user" -> This is distribution.
        // "eventhough he used this or not" -> Implies the code ITSELF is what matters.
        // Let's allow validation if it exists. 

        return NextResponse.json({ valid: true, discount: coupon.discountPercentage });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
