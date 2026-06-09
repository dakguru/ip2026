import { NextResponse } from 'next/server';
import { updateUser, getUserByEmail } from '@/lib/db';
import { createNotification } from '@/lib/notifications';

export async function POST(request: Request) {
    try {
        const { currentEmail, name, email, mobile, examPreparingFor, dateOfJoining, courseMode, hasSeenCoursePrompt } = await request.json();

        if (!currentEmail) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const oldUser = await getUserByEmail(currentEmail);

        // SECURITY: Normal users may not change their own course mode directly —
        // that requires admin approval via /api/course-mode-requests. Only admin /
        // super_admin can flip course mode straight from Settings. We silently drop
        // an unauthorised courseMode change so the rest of the profile still saves.
        const isPrivileged = oldUser?.role === 'admin' || oldUser?.role === 'super_admin';
        const courseModeChangeBlocked =
            courseMode !== undefined &&
            !isPrivileged &&
            oldUser?.courseMode !== undefined &&
            courseMode !== oldUser.courseMode;
        const effectiveCourseMode = courseModeChangeBlocked ? undefined : courseMode;

        // Filter undefined values to support partial updates
        const updates: any = {};
        if (name !== undefined) updates.name = name;
        if (email !== undefined) updates.email = email;
        if (mobile !== undefined) {
            const cleanMobile = mobile.replace(/\D/g, '');
            if (cleanMobile.endsWith('9887145011')) {
                return NextResponse.json(
                    { error: 'This mobile number is permanently banned.' },
                    { status: 403 }
                );
            }
            updates.mobile = mobile;
        }
        if (examPreparingFor !== undefined) updates.examPreparingFor = examPreparingFor;
        if (dateOfJoining !== undefined) updates.dateOfJoining = dateOfJoining;
        if (effectiveCourseMode !== undefined) updates.courseMode = effectiveCourseMode;
        if (hasSeenCoursePrompt !== undefined) updates.hasSeenCoursePrompt = hasSeenCoursePrompt;

        const updatedUser = await updateUser(currentEmail, updates);

        if (updatedUser && oldUser && oldUser.courseMode !== updatedUser.courseMode) {
            const oldModeName = oldUser.courseMode === 'PS_GR_B' ? "PS Group 'B'" : "LDCE IP";
            const newModeName = updatedUser.courseMode === 'PS_GR_B' ? "PS Group 'B'" : "LDCE IP";

            await createNotification(
                'system',
                'Course Mode Changed',
                `User ${updatedUser.name} (${updatedUser.email}) switched their course mode from ${oldModeName} to ${newModeName}.`,
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
            planId: updatedUser.planId,
            planName: updatedUser.planName
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
