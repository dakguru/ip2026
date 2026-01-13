import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import MockEnrollment from "@/models/MockEnrollment";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const testId = searchParams.get('testId');

        if (!testId) {
            return NextResponse.json({ error: "Test ID is required" }, { status: 400 });
        }

        // 1. Fetch users with active membership (Gold or Silver) - they have access to all tests
        const membershipUsers = await User.find({
            membershipLevel: { $in: ['gold', 'silver'] }
        }).select('name email purchaseDate planName membershipLevel mobile');

        // 2. Fetch individual enrollments for this specific test
        const individualEnrollments = await MockEnrollment.find({
            testId: testId,
            status: 'completed'
        });

        // Combined results
        const combined = [
            ...membershipUsers.map(u => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                mobile: u.mobile || 'N/A',
                dateOfPayment: u.purchaseDate,
                paymentMadeFor: u.planName || (u.membershipLevel === 'gold' ? 'Gold Plan' : 'Silver Plan'),
                type: 'membership'
            })),
            ...individualEnrollments.map(e => ({
                id: e._id.toString(),
                name: e.userName,
                email: e.userEmail,
                mobile: e.userMobile || 'N/A',
                dateOfPayment: e.enrolledAt,
                paymentMadeFor: 'Single Test Enrollment',
                type: 'individual'
            }))
        ];

        // Remove duplicates if any (e.g. a gold member also paid individually - shouldn't happen but safe to handle)
        const uniqueEnrollments = Array.from(new Map(combined.map(item => [item.email, item])).values());

        // Map to final format with serial numbers
        const enrollments = uniqueEnrollments.map((u, index) => ({
            serialNo: index + 1,
            name: u.name,
            email: u.email,
            mobile: u.mobile,
            dateOfPayment: u.dateOfPayment,
            paymentMadeFor: u.paymentMadeFor
        }));

        return NextResponse.json({ enrollments });

    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 });
    }
}
