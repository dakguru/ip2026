
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockResult from "@/models/MockResult";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const testId = searchParams.get('testId');

        const query: any = {};
        if (testId) {
            query.testId = testId;
        }

        // Fetch specific fields to be lighter, sort by submission date descending
        const results = await MockResult.find(query)
            .sort({ score: -1, submittedAt: 1 }) // Rank logic: High score first, then early submission
            .lean();

        return NextResponse.json({ results });

    } catch (error) {
        console.error("Error fetching mock results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
