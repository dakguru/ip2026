
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockResult from "@/models/MockResult";
import User from "@/models/User";
import { createNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { userId, userEmail, score, totalQuestions, answers } = body;

        let user;
        if (userId) {
            user = await User.findById(userId);
        } else if (userEmail) {
            user = await User.findOne({ email: userEmail });
        }

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newResult = new MockResult({
            userId: user._id.toString(),
            userName: user.name,
            userEmail: user.email,
            score,
            totalQuestions,
            answers,
            submittedAt: new Date()
        });

        await newResult.save();

        await createNotification(
            'mock_test',
            `Admin Mock Test Submitted`,
            `${user.name} (${user.email}) submitted an admin mock test scoring ${score}/${totalQuestions}.`,
            { userId: user._id.toString(), email: user.email, score }
        );

        return NextResponse.json({ message: "Result saved successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error saving mock result:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
