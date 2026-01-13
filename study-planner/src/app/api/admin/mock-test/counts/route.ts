import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import MockEnrollment from "@/models/MockEnrollment";

export async function GET(req: Request) {
    try {
        await connectDB();

        // 1. Count Gold/Silver users (they are enrolled in ALL tests)
        const membershipCount = await User.countDocuments({
            membershipLevel: { $in: ['gold', 'silver'] }
        });

        // 2. Count individual enrollments per test
        const individualCounts = await MockEnrollment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: "$testId", count: { $sum: 1 } } }
        ]);

        // Create a map of testId -> total enrollment count
        const counts: Record<string, number> = {};

        // Add individual counts + membership counts
        individualCounts.forEach(item => {
            counts[item._id] = item.count + membershipCount;
        });

        return NextResponse.json({
            counts,
            universalCount: membershipCount // In case we want to show it as "membershipCount + X"
        });

    } catch (error) {
        console.error("Error fetching mock test counts:", error);
        return NextResponse.json({ error: "Failed to fetch counts" }, { status: 500 });
    }
}
