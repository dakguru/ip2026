import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, mobile, message } = body;

        console.log("Contact Form Submission:", body);

        // 1. If we have credentials, send real email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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
                from: `"Dak Guru Contact" <${process.env.EMAIL_USER}>`,
                to: "admin@dakguru.com",
                replyTo: email,
                subject: `Contact Request: ${firstName} ${lastName}`,
                text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${mobile}

Message:
${message}
                `,
            };

            await transporter.sendMail(mailOptions);
            return NextResponse.json({ success: true, message: "Email sent successfully" });
        }

        // 2. Fallback: Log to console (simulated)
        console.warn("EMAIL_USER/EMAIL_PASS not set. Email not sent, but logged.");
        return NextResponse.json({ success: true, message: "Form processed (simulation)" });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
