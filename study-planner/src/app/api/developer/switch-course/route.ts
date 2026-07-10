import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth-utils";
import UserModel from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function POST(request: Request) {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await request.json();
        const { userId, courseMode } = body;

        if (!userId || !courseMode) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (courseMode !== "LDCE_IP" && courseMode !== "PS_GR_B") {
            return NextResponse.json({ error: "Invalid course mode" }, { status: 400 });
        }

        await dbConnect();

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.courseMode = courseMode;
        await user.save();

        return NextResponse.json({ success: true, message: "Course mode updated successfully" });
    } catch (error) {
        console.error("Course Mode Switch API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
