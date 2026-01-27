
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

        if (!entry || entry.status !== 'published') {
            return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        }

        return NextResponse.json({ entry });
    } catch (error) {
        console.error('Dak Sutra Public Detail Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
