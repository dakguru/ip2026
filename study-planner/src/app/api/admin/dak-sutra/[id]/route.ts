
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import DakSutra from '@/models/DakSutra';
import { isAdmin } from '@/lib/auth-utils';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    try {
        await dbConnect();
        const entry = await DakSutra.findById(id);
        if (!entry) {
            return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        }
        return NextResponse.json({ entry });
    } catch (error) {
        console.error('Dak Sutra Fetch Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    try {
        await dbConnect();
        const data = await request.json();
        const entry = await DakSutra.findByIdAndUpdate(id, data, { new: true });

        if (!entry) {
            return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, entry });
    } catch (error) {
        console.error('Dak Sutra Update Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    try {
        await dbConnect();
        const entry = await DakSutra.findByIdAndDelete(id);

        if (!entry) {
            return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Dak Sutra Delete Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
