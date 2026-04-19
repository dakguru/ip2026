import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import LoginLog from '@/models/LoginLog';
import mongoose from 'mongoose';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const fromDate = searchParams.get('from_date');
        const toDate = searchParams.get('to_date');
        const ipFilter = searchParams.get('ip');
        const exportAll = searchParams.get('export') === '1';
        const { userId } = await params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const match: any = {
            userId: new mongoose.Types.ObjectId(userId),
            status: 'success'
        };

        if (fromDate || toDate) {
            match.loginAt = {};
            if (fromDate) match.loginAt.$gte = new Date(fromDate);
            if (toDate) match.loginAt.$lte = new Date(toDate + 'T23:59:59.999Z');
        }

        if (ipFilter) {
            match.ip = { $regex: ipFilter.replace(/\./g, '\\.'), $options: 'i' };
        }

        const skip = exportAll ? 0 : (page - 1) * limit;
        const fetchLimit = exportAll ? 5000 : limit;

        const total = await LoginLog.countDocuments(match);

        const logs = await LoginLog.find(match)
            .sort({ loginAt: -1 })
            .skip(skip)
            .limit(fetchLimit)
            .select('loginAt ip location device sessionId')
            .lean();

        return NextResponse.json({
            logs,
            total,
            page,
            pages: Math.ceil(total / limit),
            limit
        });

    } catch (error) {
        console.error('Login Logs Error:', error);
        return NextResponse.json({ error: 'Failed to fetch login logs' }, { status: 500 });
    }
}
