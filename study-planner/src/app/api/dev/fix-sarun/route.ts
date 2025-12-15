import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();

        // 1. Define the target user email
        const targetEmail = "sarunkrr@gmail.com";

        // 2. Define the correct Silver Plan details
        // Silver Monthly: 249
        const purchaseDate = new Date();
        const validityDate = new Date(purchaseDate);
        validityDate.setDate(validityDate.getDate() + 30); // 30 Days

        const planDetails = {
            membershipLevel: "silver",
            planId: "fix_manual_update_001",
            planName: "Monthly Silver Plan",
            purchaseDate: purchaseDate,
            membershipValidity: validityDate,
        };

        // 3. Find and Update
        const updatedUser = await User.findOneAndUpdate(
            { email: targetEmail },
            { $set: planDetails },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: `User ${targetEmail} not found` }, { status: 404 });
        }

        return NextResponse.json({
            message: "User patched successfully",
            user: {
                email: updatedUser.email,
                plan: updatedUser.planName,
                validity: updatedUser.membershipValidity
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
