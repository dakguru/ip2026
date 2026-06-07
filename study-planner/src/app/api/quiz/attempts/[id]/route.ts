import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import McqAttempt from '@/models/McqAttempt';
import McqAttemptAnswer from '@/models/McqAttemptAnswer';
import { getSessionUser } from '@/lib/quiz-session';

// GET /api/quiz/attempts/[id]
// Returns a single attempt with its full question-level snapshots so the client
// can (re)build the PDF answer sheet / review screen from saved data.
// Security: the attempt must belong to the authenticated user.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await getSessionUser();
        if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const { id } = await params;
        await dbConnect();

        const attempt = await McqAttempt.findById(id).lean();
        if (!attempt) return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });

        // Ownership check — never expose another user's attempt.
        if (String((attempt as any).userId) !== String(user._id)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const answers = await McqAttemptAnswer.find({ attemptId: id })
            .sort({ questionNumber: 1 })
            .lean();

        return NextResponse.json({ success: true, attempt, answers });
    } catch (error) {
        console.error('Error fetching MCQ attempt:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
