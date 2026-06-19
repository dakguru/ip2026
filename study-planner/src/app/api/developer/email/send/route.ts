import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import nodemailer from 'nodemailer';

// Verify admin session server-side
async function verifyAdmin(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');
        if (!userSession) return false;

        const session = JSON.parse(decodeURIComponent(userSession.value));
        if (!session?.email) return false;

        await dbConnect();
        const user = await User.findOne({ email: session.email }).select('role');
        return user && (user.role === 'admin' || user.role === 'super_admin');
    } catch {
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const isAuthorized = await verifyAdmin();
        if (!isAuthorized) {
            return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
        }

        const { subject, htmlBody, textBody, recipientFilter, testEmail } = await request.json();

        if (!subject || (!htmlBody && !textBody)) {
            return NextResponse.json({ error: 'Subject and email body are required' }, { status: 400 });
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return NextResponse.json({ error: 'Email credentials not configured on server' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || "smtp.zoho.in",
            port: Number(process.env.EMAIL_PORT) || 465,
            secure: Number(process.env.EMAIL_PORT) === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await dbConnect();

        // If testEmail is provided, send only to that address (preview mode)
        if (testEmail) {
            await transporter.sendMail({
                from: `"Dak Guru" <${process.env.EMAIL_USER}>`,
                to: testEmail,
                subject,
                text: textBody || undefined,
                html: htmlBody || undefined,
            });

            return NextResponse.json({
                success: true,
                message: `Test email sent to ${testEmail}`,
                totalSent: 1,
                totalFailed: 0,
            });
        }

        // Build query filter for recipients
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};
        if (recipientFilter) {
            if (recipientFilter.courseMode && recipientFilter.courseMode !== 'all') {
                query.courseMode = recipientFilter.courseMode;
            }
            if (recipientFilter.membershipLevel && recipientFilter.membershipLevel !== 'all') {
                query.membershipLevel = recipientFilter.membershipLevel;
            }
        }

        const users = await User.find(query).select('email name').lean();
        const validUsers = users.filter((u: any) => u.email && u.email.includes('@'));

        if (validUsers.length === 0) {
            return NextResponse.json({ error: 'No recipients found matching the filter' }, { status: 404 });
        }

        let totalSent = 0;
        let totalFailed = 0;
        const failedEmails: string[] = [];

        // Send in batches of 10 with a small delay to avoid SMTP rate-limits
        const BATCH_SIZE = 10;
        for (let i = 0; i < validUsers.length; i += BATCH_SIZE) {
            const batch = validUsers.slice(i, i + BATCH_SIZE);

            const promises = batch.map(async (user: any) => {
                try {
                    // Personalise greeting if name is available
                    const personalizedHtml = htmlBody
                        ? htmlBody.replace(/{{name}}/gi, user.name || 'Aspirant')
                        : undefined;
                    const personalizedText = textBody
                        ? textBody.replace(/{{name}}/gi, user.name || 'Aspirant')
                        : undefined;

                    await transporter.sendMail({
                        from: `"Dak Guru" <${process.env.EMAIL_USER}>`,
                        to: user.email,
                        subject,
                        text: personalizedText || undefined,
                        html: personalizedHtml || undefined,
                    });
                    totalSent++;
                } catch (err) {
                    console.error(`Failed to send email to ${user.email}:`, err);
                    totalFailed++;
                    failedEmails.push(user.email);
                }
            });

            await Promise.all(promises);

            // Brief pause between batches
            if (i + BATCH_SIZE < validUsers.length) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        return NextResponse.json({
            success: true,
            message: `Emails sent successfully`,
            totalRecipients: validUsers.length,
            totalSent,
            totalFailed,
            failedEmails: failedEmails.length > 0 ? failedEmails : undefined,
        });

    } catch (error: any) {
        console.error('Email API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// GET: Return recipient count for a given filter (for preview)
export async function GET(request: Request) {
    try {
        const isAuthorized = await verifyAdmin();
        if (!isAuthorized) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const courseMode = searchParams.get('courseMode');
        const membershipLevel = searchParams.get('membershipLevel');

        await dbConnect();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};
        if (courseMode && courseMode !== 'all') query.courseMode = courseMode;
        if (membershipLevel && membershipLevel !== 'all') query.membershipLevel = membershipLevel;

        const count = await User.countDocuments(query);
        const sampleEmails = await User.find(query).select('email name').limit(5).lean();

        return NextResponse.json({
            count,
            sampleRecipients: sampleEmails.map((u: any) => ({ email: u.email, name: u.name })),
        });

    } catch (error: any) {
        console.error('Email count API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
