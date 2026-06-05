import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockTestFeedback from "@/models/MockTestFeedback";

// POST — Submit feedback
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            testId, userEmail, userName,
            overallRating, difficultyRating, contentQuality, explanationQuality,
            favoriteTopics, suggestions, wouldRecommend
        } = body;

        // Validation
        if (!testId || !userEmail) {
            return NextResponse.json({ error: "testId and userEmail are required" }, { status: 400 });
        }
        if (!overallRating || !difficultyRating || !contentQuality || !explanationQuality) {
            return NextResponse.json({ error: "All four ratings are required" }, { status: 400 });
        }

        await dbConnect();

        // Check for duplicate
        const existing = await MockTestFeedback.findOne({ testId, userEmail });
        if (existing) {
            return NextResponse.json({ error: "Feedback already submitted for this test" }, { status: 409 });
        }

        await MockTestFeedback.create({
            testId,
            userEmail,
            userName: userName || 'Anonymous',
            overallRating,
            difficultyRating,
            contentQuality,
            explanationQuality,
            favoriteTopics: favoriteTopics || [],
            suggestions: suggestions || '',
            wouldRecommend: wouldRecommend !== false
        });

        return NextResponse.json({ success: true, message: "Feedback submitted successfully" });
    } catch (error: unknown) {
        console.error("Feedback submit error:", error);
        if (error && typeof error === 'object' && 'code' in error && (error as { code: number }).code === 11000) {
            return NextResponse.json({ error: "Feedback already submitted for this test" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
    }
}

// GET — Fetch all feedback for a test (admin)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const testId = searchParams.get("testId");

        if (!testId) {
            return NextResponse.json({ error: "testId is required" }, { status: 400 });
        }

        await dbConnect();

        const feedbacks = await MockTestFeedback.find({ testId }).sort({ submittedAt: -1 }).lean();

        // Compute aggregate stats
        const count = feedbacks.length;
        if (count === 0) {
            return NextResponse.json({
                feedbacks: [],
                stats: { count: 0, avgOverall: 0, avgDifficulty: 0, avgContent: 0, avgExplanation: 0, recommendPct: 0 }
            });
        }

        const sum = (field: string) => feedbacks.reduce((acc: number, f: Record<string, unknown>) => acc + (Number(f[field]) || 0), 0);
        const avgOverall = Math.round((sum('overallRating') / count) * 10) / 10;
        const avgDifficulty = Math.round((sum('difficultyRating') / count) * 10) / 10;
        const avgContent = Math.round((sum('contentQuality') / count) * 10) / 10;
        const avgExplanation = Math.round((sum('explanationQuality') / count) * 10) / 10;
        const recommendCount = feedbacks.filter((f: Record<string, unknown>) => f.wouldRecommend === true).length;
        const recommendPct = Math.round((recommendCount / count) * 100);

        return NextResponse.json({
            feedbacks,
            stats: { count, avgOverall, avgDifficulty, avgContent, avgExplanation, recommendPct }
        });
    } catch (error) {
        console.error("Feedback fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }
}
