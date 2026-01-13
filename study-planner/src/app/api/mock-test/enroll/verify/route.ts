import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import MockEnrollment from '@/models/MockEnrollment';
import User from '@/models/User';
import { createNotification } from '@/lib/notifications';

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            email,
            testId,
            testTitle,
            userName,
            userMobile
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

        // 2. Payment Verified - Create Enrollment in DB
        await dbConnect();

        // Get user details if mobile is missing
        let mobile = userMobile;
        let name = userName;
        if (!mobile || !name) {
            const user = await User.findOne({ email });
            if (user) {
                mobile = mobile || user.mobile;
                name = name || user.name;
            }
        }

        const enrollment = await MockEnrollment.findOneAndUpdate(
            { userEmail: email, testId: testId },
            {
                userId: email, // Using email as user identifier if no numeric ID
                userEmail: email,
                userName: name || 'Aspirant',
                userMobile: mobile || 'N/A',
                testId: testId,
                testTitle: testTitle,
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                amount: 49,
                status: 'completed'
            },
            { upsert: true, new: true }
        );

        // Optional: Trigger Notification for Enrollment
        try {
            await createNotification(
                'purchase',
                'Mock Test Enrollment',
                `User ${email} enrolled for ${testTitle}`,
                { userId: email, testId, testTitle }
            );
        } catch (notifErr) {
            console.error("Failed to create notification:", notifErr);
        }

        return NextResponse.json({
            success: true,
            message: 'Enrollment successful',
            enrollment
        });

    } catch (error: any) {
        console.error("Mock Enrollment Verification Error:", error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
