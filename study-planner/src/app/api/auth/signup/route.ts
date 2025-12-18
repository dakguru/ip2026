import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { email, password, name, mobile, designation, pincode, officeName, division, circle, gender } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await createUser(email, password, name, {
            mobile,
            designation,
            pincode,
            officeName,
            division,
            circle,
            gender
        });

        // Send Welcome Email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST || "smtp.zoho.in",
                    port: Number(process.env.EMAIL_PORT) || 465,
                    secure: Number(process.env.EMAIL_PORT) === 465,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Welcome to Dak Guru - Your Advanced Preparation Master',
                    html: `
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
    <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #2563EB; margin: 0;">Welcome to Dak Guru!</h1>
        <p style="color: #6B7280; font-size: 16px;">We're thrilled to have you on board, ${name}.</p>
    </div>

    <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; line-height: 1.6;">
            You have successfully registered for the most advanced study planner for departmental exams. 
            Get ready to organize your study schedule, track your progress, and achieve your goals with ease.
        </p>
    </div>

    <div style="margin-bottom: 24px;">
        <h3 style="color: #111827;">What you can do next:</h3>
        <ul style="color: #4B5563; line-height: 1.6;">
            <li>📅 Create your personalized study plan</li>
            <li>📝 Access comprehensive notes and materials</li>
            <li>📊 Track your daily progress and analytics</li>
            <li>🤝 Connect with the community</li>
        </ul>
    </div>

    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://www.dakguru.com'}/login" style="background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login to Your Account</a>
        <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">
            If you have any questions, feel free to reply to this email.
        </p>
    </div>
</div>
                    `
                };

                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // We don't fail the signup if email fails, just log it
            }
        }

        return NextResponse.json({ success: true, message: 'Account created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { error: (error as any).message || 'Internal server error' },
            { status: 500 }
        );
    }
}
