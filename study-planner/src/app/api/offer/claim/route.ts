
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Coupon from '@/models/Coupon';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { userName, userEmail, userMobile } = await request.json();

        if (!userEmail || !userName || !userMobile) {
            return NextResponse.json({ error: 'Missing required details' }, { status: 400 });
        }

        // 1. Check if user already has a coupon assigned
        const existingAssignment = await Coupon.findOne({ assignedToEmail: userEmail });
        if (existingAssignment) {
            // Optional: Resend email if they lost it, but for now just return success so the frontend feels "done"
            // Or return specific message. Let's return success but maybe note it.
            // Actually, let's just resend the email to be helpful.
            await sendCouponEmail(userEmail, userName, existingAssignment.code);
            return NextResponse.json({ success: true, message: 'Coupon already assigned. Email resent.', code: existingAssignment.code });
        }

        // 2. Find first unassigned coupon
        // We sort by _id or createdAt to ensure serial assignment order if imported in order
        const coupon = await Coupon.findOneAndUpdate(
            { isAssigned: false, isValid: true },
            {
                $set: {
                    isAssigned: true,
                    assignedToEmail: userEmail,
                    assignedToName: userName,
                    assignedToMobile: userMobile,
                    assignedAt: new Date()
                }
            },
            { sort: { createdAt: 1 }, new: true } // Get the updated document
        );

        if (!coupon) {
            return NextResponse.json({ error: 'Sorry, all launch offer coupons have been claimed! Please contact support for other offers.' }, { status: 410 });
        }

        // 3. Send Email
        await sendCouponEmail(userEmail, userName, coupon.code);

        // 4. Also Send Admin Notification (Silent)
        await sendAdminNotification(userEmail, userName, userMobile, coupon.code);

        return NextResponse.json({ success: true, message: 'Coupon assigned and email sent!', code: coupon.code });

    } catch (error: any) {
        console.error('Coupon claim error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

async function sendCouponEmail(email: string, name: string, code: string) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not set. Skipping email.");
        return;
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

    const mailOptions = {
        from: `Dak Guru Offers <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🎉 Congratulations! Here is your 50% OFF Launch Offer Code',
        html: `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
  .header { 
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); 
    padding: 40px 20px; 
    text-align: center; 
    color: white; 
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -50px; left: -50px;
    width: 200px; height: 200px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    filter: blur(40px);
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -30px; right: -30px;
    width: 150px; height: 150px;
    background: rgba(255,215,0,0.2);
    border-radius: 50%;
    filter: blur(30px);
  }
  .logo-text { font-size: 32px; font-weight: 800; letter-spacing: 1px; margin-bottom: 10px; display: inline-block; border-bottom: 3px solid #fbbf24; padding-bottom: 5px; }
  .header h1 { margin: 10px 0 5px; font-size: 24px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #fbbf24; }
  
  .content { padding: 40px 30px; text-align: center; }
  .greeting { font-size: 18px; color: #374151; margin-bottom: 20px; }
  .message { color: #4b5563; line-height: 1.6; margin-bottom: 30px; }
  
  .coupon-box {
    background: linear-gradient(to right, #fef3c7, #fee2e2);
    border: 2px dashed #f59e0b;
    border-radius: 12px;
    padding: 30px;
    margin: 30px 0;
    position: relative;
  }
  .coupon-label { font-size: 12px; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: block; }
  .coupon-code { font-size: 36px; font-weight: 900; color: #dc2626; letter-spacing: 4px; font-family: monospace; background: white; padding: 10px 20px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  
  .cta-button {
    display: inline-block;
    background: linear-gradient(to right, #2563eb, #1d4ed8);
    color: white;
    text-decoration: none;
    padding: 15px 30px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
    margin-top: 20px;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
  }
  
  .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">Dak Guru</div>
      <h1>Launch Offer</h1>
    </div>
    
    <div class="content">
      <p class="greeting">Hello, <strong>${name}</strong>!</p>
      <p class="message">
        Thank you for being one of our first supporters. As a token of our appreciation, we are thrilled to present you with this exclusive <strong>50% Discount Code</strong> for our Gold & Silver Plans.
      </p>
      
      <div class="coupon-box">
        <span class="coupon-label">Your Unique Coupon Code</span>
        <div class="coupon-code">${code}</div>
      </div>
      
      <p class="message" style="font-size: 14px;">
        Use this code at checkout to claim your discount instantly. <br/>
        <em>Valid for a limited time only!</em>
      </p>
      
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://www.dakguru.com'}/pricing" class="cta-button">Redeem Now</a>
    </div>
    
    <div class="footer">
      &copy; 2025 Dak Guru Study Planner. All rights reserved.<br>
      This is an automated message. Please do not reply directly to this email.
    </div>
  </div>
</body>
</html>
        `
    };

    await transporter.sendMail(mailOptions);
}

async function sendAdminNotification(userEmail: string, userName: string, userMobile: string, code: string) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
    // ... Simplified admin notification logic (reuse transporter) ...
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.zoho.in",
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Admin receives it too
        subject: `[Admin] New Coupon Claimed by ${userName}`,
        text: `User ${userName} (${userEmail}, ${userMobile}) has claimed coupon code: ${code}.`
    });
}
