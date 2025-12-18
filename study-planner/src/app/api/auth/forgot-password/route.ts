import { NextResponse } from 'next/server';
import { getUserByEmail, updateUser } from '@/lib/db';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import UserModel from '@/models/User';

export async function POST(request: Request) {
    try {
        const rawEmail = (await request.json()).email;
        if (!rawEmail) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const email = rawEmail.trim().toLowerCase();

        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json({ error: 'Email not found' }, { status: 404 });
        }

        // Generate temporary password (8 chars)
        const tempPassword = Math.random().toString(36).slice(-8);

        // Hash the temporary password
        const passwordHash = await bcrypt.hash(tempPassword, 10);

        // Update user with new password hash
        await updateUser(email, {
            passwordHash
        });

        // Send email with ACTUAL password
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || "smtp.office365.com",
                port: Number(process.env.EMAIL_PORT) || 587,
                secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender address
                to: email, // Receiver address (User's email)
                subject: `Password Reset Request - Dak Guru`,
                text: `
Hello,

You have requested to reset your password for your Dak Guru account.

Your temporary password is: ${tempPassword}

Please log in using this password and change it immediately from your profile settings.

If you did not request this, please contact support.

Regards,
Dak Guru Team
                `,
                html: `
<div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Password Reset Request</h2>
    <p>Hello,</p>
    <p>You have requested to reset your password for your Dak Guru account.</p>
    <p>Your temporary password is: <strong style="font-size: 18px; color: #4F46E5;">${tempPassword}</strong></p>
    <p>Please log in using this password and change it immediately from your profile settings.</p>
    <p>If you did not request this, please contact support.</p>
    <br/>
    <p>Regards,</p>
    <p><strong>Dak Guru Team</strong></p>
</div>
                `
            };

            await transporter.sendMail(mailOptions);
            return NextResponse.json({ success: true, message: "A temporary password has been sent to your email." });

        } else {
            // Fallback for dev without creds
            console.log("---------------------------------------------------");
            console.log(`PASSWORD RECOVERY FOR: ${email}`);
            console.log(`YOUR TEMPORARY PASSWORD IS: ${tempPassword}`);
            console.log("---------------------------------------------------");
            console.warn("EMAIL_USER/EMAIL_PASS not set. Email not sent, but logged.");

            // In development, return the password to the UI for testing
            if (process.env.NODE_ENV !== 'production') {
                return NextResponse.json({
                    success: true,
                    message: `DEV MODE: Creds missing. Password: ${tempPassword}`
                });
            }

            return NextResponse.json({ success: true, message: "Temporary password generated (Check Console - Dev Mode)" });
        }

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
