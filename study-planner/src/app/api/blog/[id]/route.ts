import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import PostalUpdateModel from '@/models/PostalUpdate';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await dbConnect();

        const update = await PostalUpdateModel.findOne({ id: id });

        if (!update) {
            return NextResponse.json({ error: 'Update not found' }, { status: 404 });
        }

        // Return the clean object
        return NextResponse.json({
            id: update.id,
            title: update.title,
            date: update.date,
            category: update.category,
            description: update.description || "",
            link: update.link || "#",
            // Include other fields if your schema has them, e.g. image
            image: update.image
        });
    } catch (error) {
        console.error("Error fetching update:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        await dbConnect();

        const update = await PostalUpdateModel.findOne({ id: id });

        if (!update) {
            return NextResponse.json({ error: 'Update not found' }, { status: 404 });
        }

        // Update fields
        update.title = body.title || update.title;
        update.date = body.date || update.date;
        update.category = body.category || update.category;
        update.description = body.description || update.description;
        update.link = body.link || update.link;
        update.image = body.image || update.image;

        await update.save();

        return NextResponse.json({ success: true, update });
    } catch (error) {
        console.error("Error updating update:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
