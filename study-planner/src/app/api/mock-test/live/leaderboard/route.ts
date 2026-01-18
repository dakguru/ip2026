
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MockResult from "@/models/MockResult";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const testId = searchParams.get('testId') || 'live-sample';
        const limit = parseInt(searchParams.get('limit') || '50');

        // Fetch results for the specified testId, excluding reattempts (isLeaderboardEligible: false)
        // Sort by score descending, then by submittedAt ascending (earlier submission is better tie-breaker)
        const leaderboard = await MockResult.find({
            testId,
            isLeaderboardEligible: { $ne: false } // Include true or undefined (legacy)
        })
            .sort({ score: -1, submittedAt: 1 })
            .select('userName userEmail score submittedAt') // Include userEmail for masking
            .limit(limit)
            .lean();

        const response = NextResponse.json({ leaderboard });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        return response;

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
