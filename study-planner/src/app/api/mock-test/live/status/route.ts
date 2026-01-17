
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MockResult from "@/models/MockResult";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, testId } = await req.json();

        if (!email) {
            return NextResponse.json({ hasSubmitted: false });
        }

        const existingResult = await MockResult.findOne({
            userEmail: email,
            testId: testId || 'live-sample'
        });

        if (existingResult) {
            return NextResponse.json({
                hasSubmitted: true,
                score: existingResult.score,
                rank: 0 // We can calculate rank if needed, but for blocking just needs true
            });
        }

        return NextResponse.json({ hasSubmitted: false });

    } catch (error) {
        console.error("Error checking status:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
