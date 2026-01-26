
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import DakSutra from '@/models/DakSutra';
import { isAdmin, getAdminEmail } from '@/lib/auth-utils';

export async function GET(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        const status = searchParams.get('status');

        let query: any = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { rule_number: { $regex: search, $options: 'i' } }
            ];
        }
        if (category && category !== 'all') {
            query.category = category;
        }
        if (status && status !== 'all') {
            query.status = status;
        }

        const entries = await DakSutra.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ entries });
    } catch (error) {
        console.error('Dak Sutra Fetch Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        await dbConnect();
        const data = await request.json();
        console.log("Dak Sutra Payload:", data);
        const adminEmail = await getAdminEmail();

        const entry = await DakSutra.create({
            ...data,
            created_by: adminEmail
        });

        return NextResponse.json({ success: true, entry });
    } catch (error) {
        console.error('Dak Sutra Create Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
