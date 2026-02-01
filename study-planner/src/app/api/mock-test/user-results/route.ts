import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockResult from "@/models/MockResult";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        // Use lean() for better performance and easier object modification
        const results = await MockResult.find({ userEmail: email }).sort({ submittedAt: -1 }).lean();

        // Convert to map: testId -> latest result
        const resultMap: Record<string, any> = {};
        // Group all attempts: testId -> list of results
        const attemptMap: Record<string, any[]> = {};

        results.forEach((r: any) => {
            if (!resultMap[r.testId]) {
                resultMap[r.testId] = { ...r };
            }
            if (!attemptMap[r.testId]) {
                attemptMap[r.testId] = [];
            }
            attemptMap[r.testId].push(r);
        });

        // Calculate Ranks for each test
        const testIds = Object.keys(resultMap);
        for (const testId of testIds) {
            // Find the attempt that counts for leaderboard (usually the first one, or explicitly marked)
            const eligibleAttempt = attemptMap[testId].find((r: any) => r.isLeaderboardEligible !== false);

            if (eligibleAttempt) {
                // Count how many people performed better
                const betterScorers = await MockResult.countDocuments({
                    testId: testId,
                    isLeaderboardEligible: { $ne: false },
                    $or: [
                        { score: { $gt: eligibleAttempt.score } },
                        { score: eligibleAttempt.score, submittedAt: { $lt: eligibleAttempt.submittedAt } }
                    ]
                });

                // Rank is betterScorers + 1
                resultMap[testId].rank = betterScorers + 1;
            }
        }

        return NextResponse.json({
            results: resultMap,
            attempts: attemptMap
        });
    } catch (error) {
        console.error("Error fetching user results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
