import { NextResponse } from 'next/server';
import { updateUser, getUserByEmail } from '@/lib/db';
import { createNotification } from '@/lib/notifications';

export async function POST(request: Request) {
    try {
        const { currentEmail, name, email, mobile, examPreparingFor, dateOfJoining, courseMode } = await request.json();

        if (!currentEmail) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const oldUser = await getUserByEmail(currentEmail);

        const updatedUser = await updateUser(currentEmail, {
            name,
            email,
            mobile,
            examPreparingFor,
            dateOfJoining,
            courseMode
        });

        if (updatedUser && oldUser && oldUser.courseMode !== updatedUser.courseMode) {
            const modeName = updatedUser.courseMode === 'PS_GR_B' ? "PS Group 'B'" : "LDCE IP";
            await createNotification(
                'system',
                'Course Mode Changed',
                `User ${updatedUser.name} (${updatedUser.email}) switched their course mode to ${modeName}.`,
                { userId: updatedUser.email, oldMode: oldUser.courseMode, newMode: updatedUser.courseMode }
            );
        }

        if (!updatedUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Create response
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...safeUser } = updatedUser;
        const response = NextResponse.json({ success: true, user: safeUser });

        // Update the session cookie with new details
        const maxAge = 60 * 60 * 24 * 30;

        response.cookies.set('user_session', JSON.stringify({
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            courseMode: updatedUser.courseMode,
            membershipLevel: updatedUser.membershipLevel,
            planId: updatedUser.planId
        }), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: maxAge,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { error: (error as any).message || 'Internal server error' },
            { status: 500 }
        );
    }
}
