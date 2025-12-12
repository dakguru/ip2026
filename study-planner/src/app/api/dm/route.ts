import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, userEmail, userName } = body;

        // Validation
        if (!message || message.trim().length === 0) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Word count check
        const wordCount = message.trim().split(/\s+/).length;
        if (wordCount > 500) {
            return NextResponse.json({ error: 'Message exceeds 500 words' }, { status: 400 });
        }

        // Send email using Nodemailer if credentials exist
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const nodemailer = await import("nodemailer");
            const transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: "admin@dakguru.com",
                subject: `New DM from ${userName}`,
                text: `
You have received a new Direct Message (DM).

From: ${userName}
Email: ${userEmail || 'Not provided'}

Message:
${message}
                `,
            });
        } else {
            // Fallback logging
            console.log(`--- NEW DM TO ADMIN (Email creds missing) ---`);
            console.log(`From: ${userName} (${userEmail})`);
            console.log(`Message: ${message}`);
            console.log(`-----------------------`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DM Error:", error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
