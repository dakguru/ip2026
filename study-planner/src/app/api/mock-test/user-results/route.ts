import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockResult from "@/models/MockResult";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        const results = await MockResult.find({ userEmail: email }).sort({ submittedAt: -1 });

        // Convert to map: testId -> latest result
        const resultMap: Record<string, any> = {};
        // Group all attempts: testId -> list of results
        const attemptMap: Record<string, any[]> = {};

        results.forEach((r) => {
            if (!resultMap[r.testId]) {
                resultMap[r.testId] = r;
            }
            if (!attemptMap[r.testId]) {
                attemptMap[r.testId] = [];
            }
            attemptMap[r.testId].push(r);
        });

        return NextResponse.json({
            results: resultMap,
            attempts: attemptMap
        });
    } catch (error) {
        console.error("Error fetching user results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
