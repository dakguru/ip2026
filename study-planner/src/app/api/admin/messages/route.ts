import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import MessageModel from '@/models/Message';
import { getAllUsers } from '@/lib/db'; // We'll user getAllUsers helper to quickly check admin status for now, or just query DB directly

export async function GET(request: Request) {
    try {
        await dbConnect();

        // Auth Check (Basic cookie check + DB verification like in users route)
        const cookieHeader = request.headers.get('cookie') || '';
        const match = cookieHeader.match(/user_session=([^;]+)/);
        let isAdmin = false;

        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[1]));
                // Quick verify (in prod use proper auth)
                const users = await getAllUsers();
                const user = users.find(u => u.email === session.email);
                if (user && user.role === 'admin') {
                    isAdmin = true;
                }
            } catch (e) {
                console.error("Session parse error", e);
            }
        }

        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const messages = await MessageModel.find({}).sort({ createdAt: -1 });
        return NextResponse.json(messages);

    } catch (error) {
        console.error("Fetch Messages Error:", error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();

        // Auth check (reuse logic)
        const cookieHeader = request.headers.get('cookie') || '';
        const match = cookieHeader.match(/user_session=([^;]+)/);
        let isAdmin = false;

        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[1]));
                const users = await getAllUsers();
                const user = users.find(u => u.email === session.email);
                if (user && user.role === 'admin') isAdmin = true;
            } catch (e) { }
        }

        if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await MessageModel.findByIdAndDelete(id);

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
