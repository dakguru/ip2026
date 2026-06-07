import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import McqBookmark from '@/models/McqBookmark';
import { getSessionUser } from '@/lib/quiz-session';

// GET /api/quiz/bookmarks?topicId=xxx
// Returns the list of bookmarked question ids for the user (optionally scoped to a topic).
export async function GET(req: Request) {
    try {
        const user = await getSessionUser();
        if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const topicId = searchParams.get('topicId');

        await dbConnect();
        const query: any = { userId: user._id };
        if (topicId) query.topicId = topicId;

        const bookmarks = await McqBookmark.find(query).select('questionId topicId').lean();
        return NextResponse.json({
            success: true,
            questionIds: bookmarks.map((b: any) => b.questionId),
        });
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/quiz/bookmarks
// Body: { topicId, paperId, questionId, bookmarked: boolean }
// Adds or removes a bookmark for the authenticated user. Idempotent.
export async function POST(req: Request) {
    try {
        const user = await getSessionUser();
        if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        await dbConnect();
        const { topicId, paperId = '', questionId, bookmarked } = await req.json();

        if (!questionId || !topicId) {
            return NextResponse.json({ error: 'topicId and questionId required' }, { status: 400 });
        }

        if (bookmarked) {
            // upsert prevents duplicates (unique index on userId+questionId).
            await McqBookmark.updateOne(
                { userId: user._id, questionId },
                { $setOnInsert: { userId: user._id, questionId, topicId, paperId } },
                { upsert: true }
            );
        } else {
            await McqBookmark.deleteOne({ userId: user._id, questionId });
        }

        return NextResponse.json({ success: true, questionId, bookmarked: !!bookmarked });
    } catch (error) {
        console.error('Error toggling bookmark:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
