
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

        // We can optionally check if user already submitted this test if we want to restrict to 1 attempt.
        // For now, allowing multiple attempts or just saving every attempt.

        const newResult = new MockResult({
            userId: user._id.toString(),
            userName: user.name,
            userEmail: user.email,
            score,
            totalQuestions,
            answers,
            submittedAt: new Date(),
            testId: testId || 'live-sample' // Add testId to distinguish from admin mock
        });

        await newResult.save();

        return NextResponse.json({ message: "Result saved successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error saving live mock result:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
