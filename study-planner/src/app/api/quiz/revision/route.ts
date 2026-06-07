import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import McqAttemptAnswer from '@/models/McqAttemptAnswer';
import McqBookmark from '@/models/McqBookmark';
import { getSessionUser } from '@/lib/quiz-session';

// GET /api/quiz/revision?topicId=xxx
// Returns the de-duplicated set of question ids that are either:
//   - previously answered wrong by this user for the topic, or
//   - bookmarked by this user for the topic.
// The client resolves these ids against the static question bank.
export async function GET(req: Request) {
    try {
        const user = await getSessionUser();
        if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const topicId = searchParams.get('topicId');
        if (!topicId) return NextResponse.json({ error: 'topicId required' }, { status: 400 });

        await dbConnect();

        const [wrongAnswers, bookmarks] = await Promise.all([
            McqAttemptAnswer.find({ userId: user._id, topicId, isCorrect: false, isUnattempted: false })
                .select('questionId')
                .lean(),
            McqBookmark.find({ userId: user._id, topicId }).select('questionId').lean(),
        ]);

        const wrongIds = new Set(wrongAnswers.map((a: any) => a.questionId));
        const bookmarkIds = new Set(bookmarks.map((b: any) => b.questionId));

        // De-duplicate union of wrong + bookmarked.
        const questionIds = Array.from(new Set([...wrongIds, ...bookmarkIds]));

        return NextResponse.json({
            success: true,
            questionIds,
            bookmarkIds: Array.from(bookmarkIds),
            wrongIds: Array.from(wrongIds),
        });
    } catch (error) {
        console.error('Error fetching revision questions:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
