import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongoose';
import QuizResult from '@/models/QuizResult';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');

        if (!userSession?.value) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const sessionData = JSON.parse(userSession.value);
        const email = sessionData.email;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const body = await req.json();
        const { topicId, topicTitle, score, totalQuestions, correctAnswers, wrongAnswers } = body;

        const result = await QuizResult.create({
            userId: user._id,
            topicId,
            topicTitle,
            score,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            percentage: (score / totalQuestions) * 100
        });

        return NextResponse.json({ success: true, result });

    } catch (error) {
        console.error('Error saving quiz result:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
