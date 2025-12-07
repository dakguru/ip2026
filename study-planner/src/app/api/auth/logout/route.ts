import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });

    // Clear cookies
    response.cookies.delete('auth_token');
    response.cookies.delete('user_session'); // clear the UI state cookie too

    return response;
}
