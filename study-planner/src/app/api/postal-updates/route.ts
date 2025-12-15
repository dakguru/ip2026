import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import PostalUpdateModel from '@/models/PostalUpdate';

// GET: Fetch all updates
export async function GET() {
    try {
        await dbConnect();
        const updates = await PostalUpdateModel.find({}).sort({ createdAt: -1 });
        // Map to simpler structure if needed, or return docs
        const mappedUpdates = updates.map(u => ({
            id: u.id,
            title: u.title,
            date: u.date,
            category: u.category,
            description: u.description || "",
            link: u.link || "#"
        }));
        return NextResponse.json(mappedUpdates);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
    }
}

// POST: Create a new update
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, date, category, description, link } = body;

        if (!title || !date || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await dbConnect();

        const newUpdate = await PostalUpdateModel.create({
            id: crypto.randomUUID(),
            title,
            date,
            category,
            description: description || "",
            link: link || "#"
        });

        return NextResponse.json({
            success: true,
            update: {
                id: newUpdate.id,
                title: newUpdate.title,
                date: newUpdate.date,
                category: newUpdate.category,
                description: newUpdate.description,
                link: newUpdate.link
            }
        });

    } catch (error) {
        console.error('Failed to save update:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


// DELETE: Delete an update by ID
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Missing update ID' },
                { status: 400 }
            );
        }

        await dbConnect();

        const result = await PostalUpdateModel.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Update not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Failed to delete update:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
