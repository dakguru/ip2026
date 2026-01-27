
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import DakSutra from '@/models/DakSutra';
import { isAdmin } from '@/lib/auth-utils';

export async function GET(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        let query: any = { status: 'published' }; // Only show published entries to public

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { rule_number: { $regex: search, $options: 'i' } }
            ];
        }
        if (category && category !== 'all') {
            query.category = category;
        }

        const entries = await DakSutra.find(query)
            .select('title rule_number act_name category effective_date exam_tags')
            .sort({ createdAt: -1 });

        return NextResponse.json({ entries });
    } catch (error) {
        console.error('Dak Sutra Public Fetch Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
