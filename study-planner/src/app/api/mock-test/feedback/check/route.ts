import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockTestFeedback from "@/models/MockTestFeedback";

// POST — Check if user already submitted feedback for a test
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { testId, userEmail } = body;

        if (!testId || !userEmail) {
            return NextResponse.json({ hasSubmitted: false });
        }

        await dbConnect();
        const existing = await MockTestFeedback.findOne({ testId, userEmail }).lean();

        return NextResponse.json({ hasSubmitted: !!existing });
    } catch (error) {
        console.error("Feedback check error:", error);
        return NextResponse.json({ hasSubmitted: false });
    }
}
