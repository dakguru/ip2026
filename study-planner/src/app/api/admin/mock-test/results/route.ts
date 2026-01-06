
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockResult from "@/models/MockResult";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Fetch specific fields to be lighter, sort by submission date descending
        const results = await MockResult.find()
            .sort({ submittedAt: -1 })
            .lean();

        return NextResponse.json({ results });

    } catch (error) {
        console.error("Error fetching mock results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
