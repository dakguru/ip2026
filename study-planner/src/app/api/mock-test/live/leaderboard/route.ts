
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MockResult from "@/models/MockResult";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        // Fetch results for 'live-sample' testId
        // Sort by score descending, then by submittedAt ascending (earlier submission is better tie-breaker)
        const leaderboard = await MockResult.find({ testId: 'live-sample' })
            .sort({ score: -1, submittedAt: 1 })
            .select('userName score submittedAt') // Only select necessary fields
            .limit(50) // Top 50
            .lean();

        return NextResponse.json({ leaderboard });

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
