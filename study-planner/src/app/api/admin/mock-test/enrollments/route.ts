import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(req: Request) {
    try {
        await connectDB();

        // In a real scenario, we might filter by specific test ID if individual purchases existed.
        // For now, since access is plan-based, we return all Gold/Silver users who have access to all tests.
        // We can pass `testId` to maybe filter strictly if we had that data.
        const { searchParams } = new URL(req.url);
        const testId = searchParams.get('testId');

        // Fetch users with active membership (Gold or Silver)
        const users = await User.find({
            membershipLevel: { $in: ['gold', 'silver'] }
        }).select('name email purchaseDate planName membershipLevel mobile');

        // Map to desired format
        const enrollments = users.map((u, index) => ({
            serialNo: index + 1,
            name: u.name,
            email: u.email,
            mobile: u.mobile || 'N/A',
            dateOfPayment: u.purchaseDate,
            paymentMadeFor: u.planName || (u.membershipLevel === 'gold' ? 'Gold Plan' : 'Silver Plan')
        }));

        return NextResponse.json({ enrollments });

    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 });
    }
}
