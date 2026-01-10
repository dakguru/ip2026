import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Coupon from '@/models/Coupon';

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const signature = request.headers.get('x-razorpay-signature');

        if (!signature) {
            return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
        }

        const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

        if (!secret) {
            console.error('RAZORPAY_WEBHOOK_SECRET or KEY_SECRET is not defined');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        if (expectedSignature !== signature) {
            console.error('Invalid webhook signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const event = JSON.parse(body);

        // Handle only payment.captured or order.paid
        if (event.event === 'payment.captured' || event.event === 'order.paid') {
            const payment = event.payload.payment.entity;
            const notes = payment.notes;

            if (!notes || !notes.user_email) {
                console.warn('Webhook received but no user_email in notes', payment.id);
                return NextResponse.json({ status: 'ignored', reason: 'no_email_in_notes' });
            }

            const {
                user_email,
                plan_id,
                plan_name,
                plan_type,
                validity_days,
                coupon_code
            } = notes;

            await dbConnect();

            const purchaseDate = new Date();
            const validityDate = new Date(purchaseDate);
            validityDate.setDate(validityDate.getDate() + (parseInt(validity_days) || 365));

            // Update User
            const updatedUser = await User.findOneAndUpdate(
                { email: { $regex: new RegExp(`^${user_email.trim()}$`, 'i') } },
                {
                    $set: {
                        membershipLevel: plan_type,
                        membershipValidity: validityDate,
                        planId: plan_id,
                        planName: plan_name,
                        purchaseDate: purchaseDate
                    }
                },
                { new: true }
            );

            if (!updatedUser) {
                console.error(`Webhook: User not found for email ${user_email}`);
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            console.log(`Webhook: Upgraded user ${user_email} to ${plan_type}`);

            // Mark Coupon Redeemed
            if (coupon_code) {
                await Coupon.findOneAndUpdate(
                    { code: coupon_code },
                    {
                        $set: {
                            isRedeemed: true,
                            redeemedAt: new Date(),
                            redeemedByEmail: user_email
                        }
                    }
                );
            }

            return NextResponse.json({ status: 'ok', message: 'User upgraded' });
        }

        return NextResponse.json({ status: 'ignored' });

    } catch (error: any) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}
