import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import MessageModel from '@/models/Message';

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

        // Connect to Database
        await dbConnect();

        // Save Message to DB
        await MessageModel.create({
            senderName: userName || 'Anonymous',
            senderEmail: userEmail,
            message: message.trim()
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully' });

    } catch (error) {
        console.error("DM Error:", error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
