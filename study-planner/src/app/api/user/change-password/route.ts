import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyUser, updateUser } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        // 1. Authenticate User from Session
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');

        if (!userSession?.value) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        let email = "";
        try {
            const sessionData = JSON.parse(userSession.value);
            email = sessionData.email;
        } catch {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        const { currentPassword, newPassword } = await req.json();

        // 2. Validate Inputs
        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Current and new password are required" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "New password must be at least 6 characters long" }, { status: 400 });
        }

        // 3. Verify Current Password
        const user = await verifyUser(email, currentPassword);
        if (!user) {
            return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
        }

        // 4. Hash New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 5. Update User
        await updateUser(email, { passwordHash: hashedPassword });

        return NextResponse.json({ message: "Password updated successfully" });

    } catch (error: any) {
        console.error("Change Password Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
