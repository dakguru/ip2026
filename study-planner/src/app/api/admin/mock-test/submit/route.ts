
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import MockResult from "@/models/MockResult";
import User from "@/models/User";
import { createNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { userId, userEmail, userName, score, totalQuestions, answers, testId, submittedAt } = body;

        let user;
        if (userId) {
            user = await User.findById(userId);
        } else if (userEmail) {
            user = await User.findOne({ email: userEmail });
        }

        const finalUserId = user ? user._id.toString() : "manual-entry";
        const finalUserName = user ? user.name : (userName || "Unknown Aspirant");
        const finalUserEmail = user ? user.email : userEmail;

        if (!finalUserEmail) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if an existing result exists to update, or create a new one
        let newResult = await MockResult.findOne({ userEmail: finalUserEmail, testId: testId || 'admin-sample' });
        
        if (newResult) {
            newResult.score = score;
            newResult.totalQuestions = totalQuestions;
            if (answers) newResult.answers = answers;
            if (submittedAt) newResult.submittedAt = new Date(submittedAt);
            if (userName && !user) newResult.userName = userName; // update name if manual
        } else {
            newResult = new MockResult({
                userId: finalUserId,
                userName: finalUserName,
                userEmail: finalUserEmail,
                score,
                totalQuestions,
                answers: answers || {},
                testId: testId || 'admin-sample',
                submittedAt: submittedAt ? new Date(submittedAt) : new Date()
            });
        }

        await newResult.save();

        if (user) {
            await createNotification(
                'mock_test',
                `Admin Mock Test Submitted`,
                `${finalUserName} (${finalUserEmail}) submitted an admin mock test scoring ${score}/${totalQuestions}.`,
                { userId: finalUserId, email: finalUserEmail, score }
            );
        }

        return NextResponse.json({ message: "Result saved successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error saving mock result:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
