
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

        // Convert to map: testId -> result
        const resultMap: Record<string, any> = {};
        results.forEach((r) => {
            // If multiple attempts exist, recent one (due to sort) or logic? 
            // Usually we keep the latest or best. Let's keep the latest for now.
            // Since we sorted by submittedAt desc, the first one encountered is the latest.
            if (!resultMap[r.testId]) {
                resultMap[r.testId] = r;
            }
        });

        return NextResponse.json({ results: resultMap });
    } catch (error) {
        console.error("Error fetching user results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
