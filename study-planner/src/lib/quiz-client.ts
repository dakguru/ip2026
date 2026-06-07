import { Question } from '@/lib/quizTypes';

export interface McqAttemptSummary {
    _id: string;
    topicId: string;
    topicTitle?: string;
    paperId?: string;
    mode: 'practice' | 'exam' | 'revision';
    startQuestionNo?: number;
    endQuestionNo?: number;
    selectedBatch?: string;
    totalQuestions: number;
    attemptedCount: number;
    correctCount: number;
    wrongCount: number;
    unattemptedCount: number;
    score: number;
    percentage: number;
    timeTakenSeconds: number;
    createdAt: string;
}

export interface SubmitAttemptPayload {
    topicId: string;
    topicTitle: string;
    paperId: string;
    mode: 'practice' | 'exam' | 'revision';
    startQuestionNo?: number;
    endQuestionNo?: number;
    selectedBatch?: string;
    timeTakenSeconds: number;
    questions: Question[];
    answers: Record<string, number>;
    bookmarkedIds: string[];
}

export async function fetchAttempts(topicId: string): Promise<McqAttemptSummary[]> {
    const res = await fetch(`/api/quiz/attempts?topicId=${encodeURIComponent(topicId)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.attempts || [];
}

export async function fetchBookmarks(topicId: string): Promise<string[]> {
    const res = await fetch(`/api/quiz/bookmarks?topicId=${encodeURIComponent(topicId)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.questionIds || [];
}

export async function fetchRevisionIds(topicId: string): Promise<{ questionIds: string[]; bookmarkIds: string[]; wrongIds: string[] }> {
    const res = await fetch(`/api/quiz/revision?topicId=${encodeURIComponent(topicId)}`);
    if (!res.ok) return { questionIds: [], bookmarkIds: [], wrongIds: [] };
    return res.json();
}

export async function toggleBookmarkApi(params: { topicId: string; paperId: string; questionId: string; bookmarked: boolean }): Promise<boolean> {
    const res = await fetch('/api/quiz/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    return res.ok;
}

export async function submitAttempt(payload: SubmitAttemptPayload): Promise<McqAttemptSummary | null> {
    const questions = payload.questions.map((q, idx) => ({
        questionId: q.id,
        questionNumber: idx + 1,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || '',
        selectedOption: payload.answers[q.id] ?? -1,
        wasBookmarked: payload.bookmarkedIds.includes(q.id),
    }));

    const res = await fetch('/api/quiz/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topicId: payload.topicId,
            topicTitle: payload.topicTitle,
            paperId: payload.paperId,
            mode: payload.mode,
            startQuestionNo: payload.startQuestionNo,
            endQuestionNo: payload.endQuestionNo,
            selectedBatch: payload.selectedBatch,
            timeTakenSeconds: payload.timeTakenSeconds,
            questions,
        }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.attempt || null;
}

// Loads a stored attempt and converts its snapshots into the {questions, answers}
// shape the PDF generator expects, so a previous-attempt PDF uses frozen data.
export async function loadAttemptForPdf(attemptId: string): Promise<{
    attempt: McqAttemptSummary;
    questions: Question[];
    answers: Record<string, number>;
    bookmarkedIds: string[];
} | null> {
    const res = await fetch(`/api/quiz/attempts/${attemptId}`);
    if (!res.ok) return null;
    const data = await res.json();
    const answersDocs: any[] = data.answers || [];
    const questions: Question[] = answersDocs.map((a) => ({
        id: a.questionId,
        text: a.questionTextSnapshot,
        options: [a.optionASnapshot, a.optionBSnapshot, a.optionCSnapshot, a.optionDSnapshot],
        correctAnswer: a.correctOptionSnapshot,
        explanation: a.explanationSnapshot,
    }));
    const answers: Record<string, number> = {};
    const bookmarkedIds: string[] = [];
    answersDocs.forEach((a) => {
        if (typeof a.selectedOption === 'number' && a.selectedOption >= 0) {
            answers[a.questionId] = a.selectedOption;
        }
        if (a.wasBookmarkedAtSubmission) bookmarkedIds.push(a.questionId);
    });
    return { attempt: data.attempt, questions, answers, bookmarkedIds };
}

export function rangeLabel(a: McqAttemptSummary): string {
    if (a.mode === 'revision') return 'Revision Set';
    if (a.selectedBatch) return a.selectedBatch;
    if (a.startQuestionNo && a.endQuestionNo) return `${a.startQuestionNo}-${a.endQuestionNo}`;
    return `1-${a.totalQuestions}`;
}
