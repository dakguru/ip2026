import { NextResponse } from 'next/server';
import { updateUser } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { currentEmail, name, email } = await request.json();

        if (!currentEmail) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const updatedUser = updateUser(currentEmail, { name, email });

        if (!updatedUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Create response
        const response = NextResponse.json({ success: true, user: { name: updatedUser.name, email: updatedUser.email } });

        // Update the session cookie with new details
        // Re-calculate maxAge or preserve it? For simplicity, reset to 1 day.
        const maxAge = 60 * 60 * 24;

        response.cookies.set('user_session', JSON.stringify({ name: updatedUser.name, email: updatedUser.email }), {
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
