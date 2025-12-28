
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongoose';
import QuizResultModel from '@/models/QuizResult';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');

        if (!userSession?.value) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const sessionData = JSON.parse(userSession.value);
        const email = sessionData.email;

        // We need userId, but the session cookie might not have it directly if it was just email/name
        // However, QuizResult needs userId (ObjectId).
        // Does the session have userId? 
        // In login/route.ts: 
        // response.cookies.set('user_session', JSON.stringify({ name: user.name, email: user.email, mobile: user.mobile, role: user.role, membershipLevel: user.membershipLevel }), ...
        // It does NOT have _id. 
        // So we need to look up the user first.

        await dbConnect();

        // Import User model dynamically or ensure it's registered
        const UserModel = (await import('@/models/User')).default;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const quizResults = await QuizResultModel.find({ userId: user._id }).sort({ attemptedAt: -1 });

        return NextResponse.json({
            quizResults
        });

    } catch (error) {
        console.error("Error fetching progress:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
