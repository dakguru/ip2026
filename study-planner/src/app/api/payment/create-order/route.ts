import { NextResponse } from 'next/server';
import razorpay from '@/lib/razorpay';
import shortid from 'shortid';

export async function POST(request: Request) {
    try {
        const { amount, currency = 'INR' } = await request.json();

        // 1. Basic Validation
        if (!amount) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }

        // 2. Create Order Options
        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency,
            receipt: shortid.generate(),
            payment_capture: 1, // Auto capture
        };

        // 3. Create Order via Razorpay SDK
        const order = await razorpay.orders.create(options);

        // 4. Return Order Details
        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });

    } catch (error: any) {
        console.error("Razorpay Order Creation Error:", error);
        return NextResponse.json({
            error: 'Failed to create order',
            details: error.message
        }, { status: 500 });
    }
}
