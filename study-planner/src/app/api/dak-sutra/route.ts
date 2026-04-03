
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import DakSutra from '@/models/DakSutra';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        let query: any = { status: 'published' };

        if (search) {
            // Using compound OR query that leverages indexes effectively
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { rule_number: { $regex: search, $options: 'i' } },
                { act_name: { $regex: search, $options: 'i' } },
            ];
        }

        if (category && category !== 'all') {
            query.category = category;
        }

        // Use lean() for better performance as we are only reading data
        const entries = await DakSutra.find(query)
            .select('title rule_number act_name category effective_date exam_tags')
            .sort({ createdAt: -1 })
            .lean();

        const response = NextResponse.json({ entries });
        
        // Add cache control to speed up subsequent visits (1 min)
        response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59');
        
        return response;
    } catch (error) {
        console.error('Dak Sutra Public Fetch Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
