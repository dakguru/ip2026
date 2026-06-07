import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import McqAttempt from '@/models/McqAttempt';
import McqAttemptAnswer from '@/models/McqAttemptAnswer';
import McqBookmark from '@/models/McqBookmark';
import { getSessionUser } from '@/lib/quiz-session';

// GET /api/quiz/attempts?topicId=xxx
// Returns the authenticated user's previous attempts for a topic (newest first).
export async function GET(req: Request) {
    try {
        const user = await getSessionUser();
        if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const topicId = searchParams.get('topicId');
        if (!topicId) return NextResponse.json({ error: 'topicId required' }, { status: 400 });

        await dbConnect();

        const attempts = await McqAttempt.find({ userId: user._id, topicId })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ success: true, attempts });
    } catch (error) {
        console.error('Error fetching MCQ attempts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

interface SubmitQuestion {
    questionId: string;
    questionNumber?: number;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    selectedOption?: number; // -1 / undefined => unattempted
    wasBookmarked?: boolean;
}

// POST /api/quiz/attempts
// Saves a submitted attempt + per-question snapshots and returns the summary.
export async function POST(req: Request) {
    try {
        const user = await getSessionUser();
        if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        await dbConnect();
        const body = await req.json();
        const {
            topicId,
            topicTitle = '',
            paperId = '',
            mode = 'practice',
            startQuestionNo,
            endQuestionNo,
            selectedBatch = '',
            timeTakenSeconds = 0,
            questions = [],
        } = body as {
            topicId: string;
            topicTitle?: string;
            paperId?: string;
            mode?: string;
            startQuestionNo?: number;
            endQuestionNo?: number;
            selectedBatch?: string;
            timeTakenSeconds?: number;
            questions: SubmitQuestion[];
        };

        if (!topicId || !Array.isArray(questions) || questions.length === 0) {
            return NextResponse.json({ error: 'topicId and questions required' }, { status: 400 });
        }

        const totalQuestions = questions.length;
        let correctCount = 0;
        let wrongCount = 0;
        let unattemptedCount = 0;

        questions.forEach((q) => {
            const sel = typeof q.selectedOption === 'number' ? q.selectedOption : -1;
            if (sel < 0) {
                unattemptedCount++;
            } else if (sel === q.correctAnswer) {
                correctCount++;
            } else {
                wrongCount++;
            }
        });

        const attemptedCount = correctCount + wrongCount;
        const score = correctCount; // 1 mark per correct answer
        const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

        const attempt = await McqAttempt.create({
            userId: user._id,
            paperId,
            topicId,
            topicTitle,
            mode,
            startQuestionNo,
            endQuestionNo,
            selectedBatch,
            totalQuestions,
            attemptedCount,
            correctCount,
            wrongCount,
            unattemptedCount,
            score,
            percentage,
            timeTakenSeconds,
            pdfGeneratedStatus: 'on_demand',
        });

        const answerDocs = questions.map((q, idx) => {
            const sel = typeof q.selectedOption === 'number' ? q.selectedOption : -1;
            const isUnattempted = sel < 0;
            const isCorrect = !isUnattempted && sel === q.correctAnswer;
            return {
                attemptId: attempt._id,
                userId: user._id,
                topicId,
                questionId: q.questionId,
                questionNumber: q.questionNumber ?? idx + 1,
                questionTextSnapshot: q.text || '',
                optionASnapshot: q.options?.[0] || '',
                optionBSnapshot: q.options?.[1] || '',
                optionCSnapshot: q.options?.[2] || '',
                optionDSnapshot: q.options?.[3] || '',
                selectedOption: sel,
                correctOptionSnapshot: q.correctAnswer,
                isCorrect,
                isUnattempted,
                explanationSnapshot: q.explanation || '',
                wasBookmarkedAtSubmission: !!q.wasBookmarked,
            };
        });

        await McqAttemptAnswer.insertMany(answerDocs);

        return NextResponse.json({
            success: true,
            attempt: {
                _id: attempt._id,
                topicId,
                topicTitle,
                mode,
                totalQuestions,
                attemptedCount,
                correctCount,
                wrongCount,
                unattemptedCount,
                score,
                percentage,
                timeTakenSeconds,
                createdAt: attempt.createdAt,
                startQuestionNo,
                endQuestionNo,
                selectedBatch,
            },
        });
    } catch (error) {
        console.error('Error saving MCQ attempt:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
