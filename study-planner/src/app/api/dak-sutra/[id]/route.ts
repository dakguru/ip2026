
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import DakSutra from '@/models/DakSutra';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();

        // Try slug first, then fall back to ObjectId for old links
        let entry = await DakSutra.findOne({ slug: id });
        if (!entry && mongoose.Types.ObjectId.isValid(id)) {
            entry = await DakSutra.findById(id);
        }

        if (!entry || entry.status !== 'published') {
            return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        }

        return NextResponse.json({ entry });
    } catch (error) {
        console.error('Dak Sutra Public Detail Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
