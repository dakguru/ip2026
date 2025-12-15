import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { getAllUsers } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            email, // We'll pass email from client for now, but ideally get it from session
            planType // 'gold' or 'silver'
        } = await request.json();

        // 1. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid Payment Signature' }, { status: 400 });
        }

        // 2. Payment Verified - Update User in DB
        if (email && planType) {
            await dbConnect();

            // Using findOneAndUpdate to locate and update user
            const updatedUser = await User.findOneAndUpdate(
                { email: email },
                { membershipLevel: planType },
                { new: true }
            );

            if (!updatedUser) {
                console.warn(`User with email ${email} not found during payment update.`);
                // We still return success for payment, but log the error. 
                // In real app, might want to handle this manually or webhook.
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Payment verified and membership updated'
        });

    } catch (error: any) {
        console.error("Payment Verification Error:", error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
