import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ErrorReport from '@/models/ErrorReport';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const { category, topic, screenshot, description, reportedBy, reportedByEmail } = body;

        if (!category || !topic || !description || !reportedBy) {
            return NextResponse.json(
                { error: 'Missing required fields: category, topic, description, reportedBy' },
                { status: 400 }
            );
        }

        const report = await ErrorReport.create({
            category,
            topic,
            screenshot: screenshot || '',
            description,
            reportedBy,
            reportedByEmail: reportedByEmail || '',
            status: 'pending'
        });

        return NextResponse.json({ success: true, report }, { status: 201 });
    } catch (error) {
        console.error('Error creating error report:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const reports = await ErrorReport.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(reports);
    } catch (error) {
        console.error('Error fetching error reports:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { reportId, status, adminReply } = body;

        if (!reportId) {
            return NextResponse.json({ error: 'Missing reportId' }, { status: 400 });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const update: any = {};
        if (status) update.status = status;
        if (adminReply !== undefined) update.adminReply = adminReply;

        const report = await ErrorReport.findByIdAndUpdate(reportId, update, { new: true }).lean();

        if (!report) {
            return NextResponse.json({ error: 'Report not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, report });
    } catch (error) {
        console.error('Error updating error report:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const reportId = searchParams.get('id');

        if (!reportId) {
            return NextResponse.json({ error: 'Missing report id' }, { status: 400 });
        }

        const result = await ErrorReport.findByIdAndDelete(reportId);
        if (!result) {
            return NextResponse.json({ error: 'Report not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting error report:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
