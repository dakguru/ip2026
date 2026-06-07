"use client";

import { Download, History, Loader2, CheckCircle2, XCircle, Clock, FileText } from "lucide-react";
import { McqAttemptSummary, rangeLabel } from "@/lib/quiz-client";

interface QuizPreviousAttemptsProps {
    attempts: McqAttemptSummary[];
    loading: boolean;
    isPS: boolean;
    onDownload: (attempt: McqAttemptSummary) => void;
    downloadingId: string | null;
}

const MODE_LABELS: Record<string, string> = {
    practice: 'Practice Mode',
    exam: 'Exam Mode',
    revision: 'Revision Mode',
};

function formatDateTime(iso: string) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const date = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${date}, ${h.toString().padStart(2, '0')}:${m} ${ampm}`;
}

function formatTime(seconds: number) {
    if (!seconds || seconds <= 0) return null;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')} min ${s.toString().padStart(2, '0')} sec`;
}

export default function QuizPreviousAttempts({ attempts, loading, isPS, onDownload, downloadingId }: QuizPreviousAttemptsProps) {
    const accentText = isPS ? 'text-teal-600 dark:text-teal-400' : 'text-purple-600 dark:text-purple-400';

    return (
        <div className="mt-2">
            <div className="flex items-center gap-2 mb-4">
                <History className={`w-4 h-4 ${accentText}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Previous Attempts</span>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center gap-2 py-8 text-zinc-400 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading your attempts…
                </div>
            ) : attempts.length === 0 ? (
                <div className="text-center py-8 px-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700">
                    <FileText className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
                    <p className="font-bold text-sm text-zinc-700 dark:text-zinc-300">No Previous Attempts</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
                        You have not attempted this topic yet. Start practising to track your progress.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {attempts.map((a, idx) => {
                        const attemptNo = attempts.length - idx; // newest first => highest number
                        const time = formatTime(a.timeTakenSeconds);
                        const isDownloading = downloadingId === a._id;
                        return (
                            <div key={a._id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-4 shadow-sm">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                                                Attempt {attemptNo.toString().padStart(2, '0')}
                                            </span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPS ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'}`}>
                                                {MODE_LABELS[a.mode] || a.mode}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">{formatDateTime(a.createdAt)}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 leading-none">
                                            {a.score}<span className="text-zinc-400 text-sm font-medium">/{a.totalQuestions}</span>
                                        </div>
                                        <div className="text-[11px] font-bold text-green-600 dark:text-green-400">{a.percentage}%</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-3 flex-wrap text-[11px] text-zinc-500 dark:text-zinc-400">
                                    <span className="font-medium">Q: {rangeLabel(a)}</span>
                                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><CheckCircle2 className="w-3 h-3" />{a.correctCount}</span>
                                    <span className="flex items-center gap-1 text-red-500 dark:text-red-400"><XCircle className="w-3 h-3" />{a.wrongCount}</span>
                                    <span className="text-zinc-400">Unatt: {a.unattemptedCount}</span>
                                    {time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{time}</span>}
                                </div>

                                <button
                                    onClick={() => onDownload(a)}
                                    disabled={isDownloading}
                                    className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-60
                                        ${isPS ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                                >
                                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                    {isDownloading ? 'Generating PDF…' : 'Download PDF Answer Sheet'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
