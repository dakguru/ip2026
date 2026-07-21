import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();

        // Fetch all paid users (non-free membership)
        const paidUsers = await User.find(
            { membershipLevel: { $ne: 'free' } },
            {
                name: 1,
                email: 1,
                mobile: 1,
                courseMode: 1,
                membershipLevel: 1,
                membershipValidity: 1,
                planId: 1,
                planName: 1,
                purchaseDate: 1,
                createdAt: 1,
            }
        ).sort({ membershipValidity: 1 }).lean();

        return NextResponse.json({ users: paidUsers });
    } catch (error: any) {
        console.error('Error fetching membership data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch membership data' },
            { status: 500 }
        );
    }
}
