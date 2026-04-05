import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Coupon from '@/models/Coupon';
import { createNotification } from '@/lib/notifications';

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            email, // We'll pass email from client for now, but ideally get it from session
            plan, // { id, name, type, validityDays }
            couponCode // Optional: identifying used coupon
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
        if (email && plan) {
            await dbConnect();

            // Calculate validity date
            const purchaseDate = new Date();
            const validityDays = plan.validityDays || 0;
            const validityDate = new Date(purchaseDate);
            validityDate.setDate(validityDate.getDate() + validityDays);

            // Using findOneAndUpdate to locate and update user with case-insensitive email
            const updatedUser = await User.findOneAndUpdate(
                { email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } },
                {
                    membershipLevel: plan.type, // 'gold' or 'silver'
                    membershipValidity: validityDate,
                    planId: plan.id,
                    planName: plan.name,
                    purchaseDate: purchaseDate
                },
                { new: true }
            );

            if (!updatedUser) {
                console.error(`CRITICAL: User with email ${email} not found during payment update. OrderID: ${razorpay_order_id}`);
                return NextResponse.json({
                    error: 'Payment verified but User not found. Please contact support.',
                    debug_email: email
                }, { status: 404 });
            }

            // 2b. If this is a mock test, also create a MockEnrollment record
            if (plan.type === 'mock_test') {
                const MockEnrollment = (await import("@/models/MockEnrollment")).default;
                await MockEnrollment.findOneAndUpdate(
                    { userEmail: email, testId: plan.id },
                    {
                        userId: email,
                        userEmail: email,
                        userName: updatedUser.name || 'Aspirant',
                        userMobile: updatedUser.mobile || 'N/A',
                        testId: plan.id,
                        testTitle: plan.name,
                        paymentId: razorpay_payment_id || 'GENERAL_VERIFY',
                        orderId: razorpay_order_id || 'GENERAL_VERIFY',
                        amount: 49, // Standard price for individual mocks
                        status: 'completed',
                        enrolledAt: new Date()
                    },
                    { upsert: true }
                );
            }

            // Trigger Notification for Upgrade
            await createNotification(
                'membership_upgrade',
                'Membership Upgraded',
                `User ${email} upgraded to ${plan.type.toUpperCase()} using ${plan.name}`,
                { userId: email, plan: plan.name, level: plan.type }
            );

            // 3. Mark Coupon as Redeemed (if used)
            if (couponCode) {
                await Coupon.findOneAndUpdate(
                    { code: couponCode },
                    {
                        $set: {
                            isRedeemed: true,
                            redeemedAt: new Date(),
                            redeemedByEmail: email
                        }
                    }
                );

                // Notification for Redemption
                await createNotification(
                    'coupon_redeem',
                    'Coupon Redeemed',
                    `User ${email} redeemed coupon ${couponCode}`,
                    { userId: email, code: couponCode }
                );
            }

            // Create response
            const response = NextResponse.json({
                success: true,
                message: 'Payment verified and membership updated'
            });

            // Re-set the user_session cookie with updated membership data to reflect changes immediately on client
            const maxAge = 60 * 60 * 24 * 30; // 30 days

            response.cookies.set('user_session', JSON.stringify({
                name: updatedUser.name,
                email: updatedUser.email,
                mobile: updatedUser.mobile,
                role: updatedUser.role,
                membershipLevel: updatedUser.membershipLevel, // Updated
                planId: updatedUser.planId,
                planName: updatedUser.planName,
                sessionId: updatedUser.currentSessionId || ''
            }), {
                httpOnly: false, // Client readable
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: maxAge,
                path: '/',
                ...(process.env.NODE_ENV === 'production' ? { domain: '.dakguru.com' } : {})
            });

            return response;

        } else {
            return NextResponse.json({ error: 'Missing email or plan data' }, { status: 400 });
        }

    } catch (error: any) {
        console.error("Payment Verification Error:", error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
