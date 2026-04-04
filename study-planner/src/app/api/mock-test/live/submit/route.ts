
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MockResult from "@/models/MockResult";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { userEmail, score, totalQuestions, answers, testId } = body;

        let user;
        if (userEmail) {
            user = await User.findOne({ email: userEmail });
        }

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        let isLeaderboardEligible = true;

        if (testId && (testId.startsWith('mock-') || testId.startsWith('psgb-mock-'))) {
            try {
                // Heuristic to detect live window based on testId date
                const dateMatch = testId.match(/\d{4}-\d{2}-\d{2}/);
                if (dateMatch) {
                    const dateStr = dateMatch[0];
                    const referenceDate = new Date(dateStr); // UTC Midnight

                    let endDate;
                    if (testId.startsWith('psgb-mock-')) {
                        // For PSGB, date in ID is the end date (Sunday)
                        endDate = new Date(referenceDate);
                        endDate.setHours(23, 59, 59, 999);
                    } else {
                        // For regular mock, date in ID is the start date (Saturday)
                        endDate = new Date(referenceDate);
                        endDate.setDate(referenceDate.getDate() + 1);
                        endDate.setHours(23, 59, 59, 999);
                    }

                    const now = new Date();

                    if (now > endDate) {
                        // Test is Completed (Post-Live window)
                        // Allow unlimited reattempts, but not for leaderboard
                        isLeaderboardEligible = false;
                    } else {
                        // Test is Live
                        // Strictly ENFORCE Single Attempt
                        const existingResult = await MockResult.findOne({
                            userEmail: user.email,
                            testId: testId
                        });

                        if (existingResult) {
                            return NextResponse.json({
                                error: "Only one attempt is allowed during the live window. Re-attempts are blocked until the test schedule ends."
                            }, { status: 403 });
                        }

                        isLeaderboardEligible = true;
                    }
                }
            } catch (e) {
                console.error("Single attempt enforcement error:", testId, e);
            }
        }

        const newResult = new MockResult({
            userId: user._id.toString(),
            userName: user.name,
            userEmail: user.email,
            score,
            totalQuestions,
            answers,
            submittedAt: new Date(),
            testId: testId || 'live-sample', // Add testId to distinguish from admin mock
            isLeaderboardEligible
        });

        await newResult.save();

        return NextResponse.json({ message: "Result saved successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error saving live mock result:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
