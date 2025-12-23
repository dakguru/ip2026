import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongoose';
import QuizResult from '@/models/QuizResult';
import User from '@/models/User';

export async function GET() {
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

        const userId = user._id;

        // 1. Total Quizzes
        const totalQuizzes = await QuizResult.countDocuments({ userId });

        // 2. Recent History
        const history = await QuizResult.find({ userId })
            .sort({ createdAt: -1 })
            .limit(20);

        // 3. Topic-wise Stats
        const topicStats = await QuizResult.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: "$topicTitle",
                    attempts: { $sum: 1 },
                    avgScore: { $avg: "$percentage" },
                    bestScore: { $max: "$percentage" },
                    lastAttempt: { $max: "$createdAt" }
                }
            },
            { $sort: { lastAttempt: -1 } }
        ]);

        return NextResponse.json({
            totalQuizzes,
            history,
            topicStats
        });

    } catch (error) {
        console.error('Error fetching progress:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
