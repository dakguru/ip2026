'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, FileQuestion, PlayCircle, Trophy, CheckCircle2, XCircle, Timer, AlertCircle, Settings, Lock, Download, Eye, ShieldAlert, Info, Check, X, Calendar, Scroll, Loader2, ChevronDown, BookOpen, Sparkles, Clock } from 'lucide-react';
import { QUIZ_DATA } from '@/data/quizzes';
import { QuizSet, QuizTopic } from '@/lib/quizTypes';
import { IP_PYQ_YEARS, PAPER_COLORS, type YearInfo } from '@/data/ipPyqData';
import { useCourse } from '@/contexts/CourseContext';
import { Capacitor } from '@capacitor/core';
import { Toast } from '@capacitor/toast';
import AppScreenWrapper from '@/components/AppScreenWrapper';
import FormattedQuestionText from '@/components/quiz/FormattedQuestionText';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
    loading: () => <div className="flex items-center justify-center h-full text-slate-400 bg-zinc-950">Loading viewer...</div>,
    ssr: false
});

// PS Gr.B Previous Year Papers
const PSGB_PYQ_PAPERS = [
    {
        id: 'psgb-paper-1-2023',
        title: 'LDCE PS Gr. B — Paper I',
        subtitle: '2023 (Series C)',
        year: '2023',
        paper: 'Paper I',
        path: '/notes/psgb/Paper_I_GrB_2023.pdf',
        filename: 'LDCE_PSGrB_Paper_I_2023.pdf',
        color: 'teal',
        description: 'General Financial Rules, Service Rules & other Acts',
    },
    {
        id: 'psgb-paper-2-2023',
        title: 'LDCE PS Gr. B — Paper II',
        subtitle: '2023 (Series C)',
        year: '2023',
        paper: 'Paper II',
        path: '/notes/psgb/Paper_II_GrB_2023.pdf',
        filename: 'LDCE_PSGrB_Paper_II_2023.pdf',
        color: 'indigo',
        description: 'Postal Operations, SB, PLI & Allied Topics',
    },
];

function PaperPdfCard({
    paper,
    isLocked,
    onView,
    onDownload,
}: {
    paper: typeof PSGB_PYQ_PAPERS[0];
    isLocked: boolean;
    onView: () => void;
    onDownload: () => void;
}) {
    const isTeal = paper.color === 'teal';
    const gradientBg = isTeal
        ? 'from-teal-600 via-teal-700 to-indigo-700'
        : 'from-indigo-600 via-indigo-700 to-purple-800';
    const accentBg = isTeal ? 'bg-teal-500/20' : 'bg-indigo-500/20';
    const accentText = isTeal ? 'text-teal-300' : 'text-indigo-300';
    const badgeBg = isTeal ? 'bg-teal-500/30 text-teal-200' : 'bg-indigo-500/30 text-indigo-200';

    return (
        <div className={`relative rounded-2xl overflow-hidden shadow-xl border border-white/5 bg-gradient-to-br ${gradientBg}`}>
            <div className={`absolute top-0 right-0 w-40 h-40 ${accentBg} rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none`} />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-black/10 rounded-full blur-2xl -ml-6 -mb-6 pointer-events-none" />

            <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeBg}`}>
                        <Scroll className="w-3 h-3" />
                        PYQ
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${accentText}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {paper.year}
                    </span>
                </div>

                <div className="mb-1">
                    <span className="text-white/60 text-xs font-medium uppercase tracking-widest">{paper.paper}</span>
                </div>
                <h3 className="text-white font-extrabold text-xl leading-tight mb-1">{paper.title}</h3>
                <p className="text-white/70 text-sm font-medium mb-1">{paper.subtitle}</p>
                <p className="text-white/50 text-xs leading-snug mb-6">{paper.description}</p>

                {isLocked ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                            <Lock className="w-4 h-4" />
                            <span>Locked</span>
                        </div>
                        <Link
                            href="/pricing"
                            className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            Upgrade
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={onView}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-sm font-semibold backdrop-blur-sm transition-all active:scale-95 border border-white/10"
                        >
                            <Eye className="w-4 h-4" />
                            View PDF
                        </button>
                        <button
                            onClick={onDownload}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-zinc-900 rounded-xl text-sm font-bold hover:bg-white/90 transition-all active:scale-95 shadow-md"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                )}
            </div>

            <div className={`h-1 w-full ${isTeal ? 'bg-gradient-to-r from-teal-400 to-indigo-400' : 'bg-gradient-to-r from-indigo-400 to-purple-400'}`} />
        </div>
    );
}

export default function PyqDashboard() {
    const { course } = useCourse();
    const isPS = course === 'PS_GR_B';
    // Navigation State
    const [view, setView] = useState<'topics' | 'config' | 'quiz'>('topics');
    const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
    const [generatedSet, setGeneratedSet] = useState<QuizSet | null>(null);

    // Membership State
    const [membershipLevel, setMembershipLevel] = useState<string>('free');
    const [planId, setPlanId] = useState<string>('');

    useEffect(() => {
        try {
            const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
            if (cookie) {
                const value = cookie.split('=')[1];
                const decoded = decodeURIComponent(value);
                const session = JSON.parse(decoded);
                if (session && session.membershipLevel) {
                    setMembershipLevel(session.membershipLevel);
                }
                if (session && session.planId) {
                    setPlanId(session.planId);
                }
            }
        } catch (e) {
            console.error("Failed to parse session", e);
        }
    }, []);

    // IP PYQ Year Navigation State
    const [selectedPyqYear, setSelectedPyqYear] = useState<string | null>(null);

    // PDF Papers State
    const [showAdvisory, setShowAdvisory] = useState(false);
    const [advisoryAgreed, setAdvisoryAgreed] = useState(false);
    const [pendingPdfAction, setPendingPdfAction] = useState<{ type: 'view' | 'download', paper: typeof PSGB_PYQ_PAPERS[0] } | null>(null);
    const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

    const handlePdfActionRequest = (type: 'view' | 'download', paper: typeof PSGB_PYQ_PAPERS[0]) => {
        setPendingPdfAction({ type, paper });
        setAdvisoryAgreed(false);
        setShowAdvisory(true);
    };

    const handleAdvisoryConfirm = async () => {
        setShowAdvisory(false);
        if (!pendingPdfAction) return;
        const action = pendingPdfAction;
        setPendingPdfAction(null);
        if (action.type === 'view') {
            setActivePdf({ url: action.paper.path, title: action.paper.title + ' ' + action.paper.subtitle });
        } else {
            await performPdfDownload(action.paper);
        }
    };

    const performPdfDownload = async (paper: typeof PSGB_PYQ_PAPERS[0]) => {
        try {
            if (!Capacitor.isNativePlatform()) {
                const link = document.createElement('a');
                link.href = paper.path;
                link.download = paper.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }
            await Toast.show({ text: 'Starting download...', duration: 'short' });
            const { default: PdfDownloader } = await import('@/plugins/PdfDownloader');
            const encodedPath = paper.path.split('/').map(s => encodeURIComponent(s)).join('/');
            const downloadUrl = `https://dakguru.com${encodedPath}`;
            await PdfDownloader.downloadPdf({ url: downloadUrl, filename: paper.filename });
        } catch (err: any) {
            await Toast.show({ text: `Download failed: ${err?.message || 'Unknown error'}`, duration: 'long' });
        }
    };

    // Config State
    const [desiredCount, setDesiredCount] = useState<number>(10);

    // Quiz Session State
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({}); // qId -> optionIndex
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Helpers
    const currentQ = generatedSet?.questions[currentQIndex];

    const resetToDashboard = () => {
        setSelectedTopic(null);
        setGeneratedSet(null);
        setAnswers({});
        setIsSubmitted(false);
        setCurrentQIndex(0);
        setView('topics');
    };

    const isUnlocked = () => {
        if (course === 'PS_GR_B') {
            const hasDiamond = membershipLevel === 'gold' && (planId.includes('diamond') || planId.includes('ps_gr_b'));
            const hasPlatinum = membershipLevel === 'silver' && (planId.includes('platinum') || planId.includes('ps_gr_b'));
            return hasDiamond || hasPlatinum;
        }
        return ['gold', 'silver', 'platinum', 'diamond'].includes(membershipLevel.toLowerCase());
    };

    const handleTopicSelect = (topic: QuizTopic) => {
        if (!isUnlocked()) return;
        setSelectedTopic(topic);
        setView('config');
        setDesiredCount(10); // Default
    };

    const startQuiz = () => {
        if (!selectedTopic) return;
        let allQuestions = selectedTopic.sets.flatMap(s => s.questions);
        allQuestions = allQuestions.sort(() => Math.random() - 0.5);
        const count = desiredCount === -1 ? allQuestions.length : Math.min(desiredCount, allQuestions.length);
        const finalQuestions = allQuestions.slice(0, count);
        const tempSet: QuizSet = {
            id: `pyq-${Date.now()}`,
            title: `PYQ Study: ${selectedTopic.title}`,
            questions: finalQuestions
        };
        setGeneratedSet(tempSet);
        setCurrentQIndex(0);
        setAnswers({});
        setIsSubmitted(false);
        setView('quiz');
    };

    const handleOptionSelect = (qId: string, idx: number) => {
        if (isSubmitted || answers[qId] !== undefined) return;
        setAnswers(prev => ({ ...prev, [qId]: idx }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const calculateScore = () => {
        if (!generatedSet) return 0;
        let score = 0;
        generatedSet.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) score++;
        });
        return score;
    };

    // --- VIEW: CONFIGURATION ---
    if (view === 'config' && selectedTopic) {
        const totalAvailable = selectedTopic.sets.reduce((acc, s) => acc + s.questions.length, 0);

        return (
            <AppScreenWrapper>
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{selectedTopic.title}</h2>
                            <p className="text-zinc-500 mb-8">Customize your study session.</p>

                            {totalAvailable > 0 ? (
                                <>
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">How many questions do you want to attempt?</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[10, 20, 50].filter(n => n <= totalAvailable).map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => setDesiredCount(num)}
                                                    className={`p-3 rounded-xl border text-sm font-semibold transition-all
                                                        ${desiredCount === num
                                                            ? (isPS ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 text-teal-700 dark:text-teal-300' : 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-700 dark:text-cyan-300')
                                                            : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}
                                                    `}
                                                >
                                                    {num} Questions
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setDesiredCount(-1)}
                                                className={`p-3 rounded-xl border text-sm font-semibold transition-all
                                                    ${desiredCount === -1
                                                        ? (isPS ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 text-teal-700 dark:text-teal-300' : 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-700 dark:text-cyan-300')
                                                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}
                                                `}
                                            >
                                                All Questions ({totalAvailable})
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={startQuiz}
                                        className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg ${isPS ? 'bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 shadow-teal-200 dark:shadow-teal-900/20' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-cyan-200 dark:shadow-cyan-900/20'} transition-all active:scale-95 flex items-center justify-center gap-2`}
                                    >
                                        <PlayCircle className="w-5 h-5" /> Start Practicing
                                    </button>
                                </>
                            ) : (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-sm flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>We are currently updating the question bank for this topic. Please check back later.</p>
                                </div>
                            )}
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    resetToDashboard();
                                }}
                                className="w-full py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all cursor-pointer bg-transparent"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </AppScreenWrapper>
        );
    }

    // --- VIEW: ACTIVE QUIZ & RESULTS ---
    if (view === 'quiz' && generatedSet && currentQ) {
        const total = generatedSet.questions.length;
        const score = calculateScore();
        const isAnswered = answers[currentQ.id] !== undefined;

        return (
            <AppScreenWrapper
                header={
                    <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
                        <button onClick={resetToDashboard} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" /> Quit
                        </button>
                        <div className="font-bold text-lg text-zinc-800 dark:text-zinc-100 hidden md:block max-w-md truncate">{generatedSet.title}</div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="text-zinc-500 dark:text-zinc-400">Q {currentQIndex + 1} / {total}</span>
                            {!isSubmitted && (
                                <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${isPS ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' : 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'}`}>
                                    <Timer className="w-4 h-4" />
                                    <span>Time Running</span>
                                </div>
                            )}
                        </div>
                    </div>
                }
            >
                <div className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-6">
                    {!isSubmitted ? (
                        <div className="space-y-6 md:space-y-8">
                            {/* Question Card */}
                            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                                <FormattedQuestionText 
                                    text={currentQ.text} 
                                    className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed md:mb-8"
                                />
                                <div className="space-y-3">
                                    {currentQ.options.map((opt, idx) => {
                                        const isSelected = answers[currentQ.id] === idx;
                                        const isAnsweredAlready = answers[currentQ.id] !== undefined;
                                        const isCorrect = idx === currentQ.correctAnswer;
                                        const showCorrect = isAnsweredAlready && isCorrect;
                                        const showWrong = isAnsweredAlready && isSelected && !isCorrect;

                                        let buttonStyle = "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300";
                                        let iconStyle = "border-zinc-300 dark:border-zinc-600";

                                        if (showCorrect) {
                                            buttonStyle = "border-green-500 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 font-medium";
                                            iconStyle = "border-green-500 bg-green-500 text-white";
                                        } else if (showWrong) {
                                            buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300 font-medium";
                                            iconStyle = "border-red-500 bg-red-500 text-white";
                                        } else if (isAnsweredAlready) {
                                            buttonStyle = "border-zinc-100 dark:border-zinc-800 opacity-50 dark:text-zinc-500";
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionSelect(currentQ.id, idx)}
                                                disabled={isAnsweredAlready}
                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${buttonStyle}`}
                                            >
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${iconStyle}`}>
                                                    {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                    {showWrong && <XCircle className="w-4 h-4 text-white" />}
                                                </div>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {isAnswered && (
                                    <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className={`p-4 rounded-xl border-l-4 ${answers[currentQ.id] === currentQ.correctAnswer ? 'bg-green-50 dark:bg-green-900/10 border-green-500' : 'bg-red-50 dark:bg-red-900/10 border-red-500'}`}>
                                        <FormattedQuestionText 
                                            text={currentQ.explanation || ""} 
                                            className="text-zinc-700 dark:text-zinc-300 text-sm"
                                        />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between pb-8">
                                <button
                                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                                    disabled={currentQIndex === 0}
                                    className="px-6 py-3 rounded-xl font-medium text-zinc-600 dark:text-zinc-400 disabled:opacity-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Previous
                                </button>

                                {currentQIndex < total - 1 ? (
                                    <button
                                        onClick={() => setCurrentQIndex(prev => Math.min(total - 1, prev + 1))}
                                        className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
                                    >
                                        Next Question
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                                    >
                                        Finish Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        // RESULTS VIEW
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 text-white rounded-full shadow-lg mb-6">
                                    <Trophy className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Paper Completed!</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                                    You scored <span className="text-zinc-900 dark:text-zinc-100 font-bold">{score} / {total} {total > 0 && `(${Math.round(score / total * 100)}%)`}</span>
                                </p>
                                <div className="mt-8">
                                    <button onClick={resetToDashboard} className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg">
                                        Solve Another Paper
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {generatedSet.questions.map((q, idx) => {
                                    const userAnswer = answers[q.id];
                                    const isCorrect = userAnswer === q.correctAnswer;

                                    return (
                                        <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? 'border-green-100 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10' : 'border-red-100 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10'}`}>
                                        <div className="flex gap-3 mb-4">
                                            <span className="font-bold text-zinc-900 dark:text-zinc-100">{idx + 1}.</span>
                                            <FormattedQuestionText 
                                                text={q.text} 
                                                className="font-semibold text-zinc-900 dark:text-zinc-100"
                                            />
                                        </div>
                                            <div className="space-y-2 mb-4">
                                                {q.options.map((opt, oIdx) => (
                                                    <div key={oIdx} className={`flex items-center gap-3 p-2 rounded-lg text-sm
                                                        ${oIdx === q.correctAnswer ? 'bg-green-100 dark:bg-green-900/10 text-green-800 dark:text-green-300 font-medium' :
                                                            (oIdx === userAnswer && !isCorrect) ? 'bg-red-100 dark:bg-red-900/10 text-red-800 dark:text-red-300' : 'text-zinc-500 dark:text-zinc-400'}
                                                    `}>
                                                        {oIdx === q.correctAnswer ? <CheckCircle2 className="w-4 h-4 shrink-0" /> :
                                                            (oIdx === userAnswer && !isCorrect) ? <XCircle className="w-4 h-4 shrink-0" /> :
                                                                <div className="w-4 h-4 shrink-0" />}
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-sm bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300">
                                                <span className="font-bold block mb-1">Explanation:</span>
                                                <FormattedQuestionText text={q.explanation || ""} className="text-sm" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </AppScreenWrapper>
        );
    }

    // --- VIEW: TOPIC SELECTION (DASHBOARD) ---
    const pyqTopics = QUIZ_DATA.filter(t =>
        t.category === 'PYQ' && (isPS ? t.id.startsWith('psgb-') : !t.id.startsWith('psgb-'))
    );

    const unlocked = isUnlocked();

    return (
        <AppScreenWrapper>
            <div className="p-6 md:p-8 transition-colors">
                <div className="max-w-6xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div className="flex items-center gap-4 mb-12">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${isPS ? 'bg-gradient-to-br from-teal-500 to-indigo-600 shadow-teal-200 dark:shadow-teal-900/20' : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-200 dark:shadow-cyan-900/20'}`}>
                            <FileQuestion className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Previous Year Papers</h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg">Study with real exam questions.</p>
                        </div>
                    </div>

                    {/* PS Gr. B — Actual PDF Papers Section */}
                    {isPS && (
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-teal-500 to-indigo-600" />
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Actual Exam Papers</h2>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Original question papers — view or download as PDF</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {PSGB_PYQ_PAPERS.map(paper => (
                                    <PaperPdfCard
                                        key={paper.id}
                                        paper={paper}
                                        isLocked={!unlocked}
                                        onView={() => handlePdfActionRequest('view', paper)}
                                        onDownload={() => handlePdfActionRequest('download', paper)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* IP Course — Year-Wise PYQ MCQ Bank */}
                    {!isPS && (
                        <IpPyqYearSection
                            pyqYears={IP_PYQ_YEARS}
                            quizData={QUIZ_DATA}
                            selectedYear={selectedPyqYear}
                            onYearSelect={(y) => setSelectedPyqYear(prev => prev === y ? null : y)}
                            onPaperSelect={(topicId) => {
                                const topic = QUIZ_DATA.find(t => t.id === topicId);
                                if (topic) handleTopicSelect(topic);
                            }}
                            isLocked={!unlocked}
                        />
                    )}

                    {/* PS Gr. B MCQ Practice Section */}
                    {isPS && pyqTopics.length > 0 && (
                        <>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600" />
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">MCQ Study</h2>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Attempt previous year questions interactively</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pyqTopics.map(topic => (
                                    <TopicCard
                                        key={topic.id}
                                        topic={topic}
                                        onSelect={handleTopicSelect}
                                        isLocked={!unlocked}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Full-Screen PDF Viewer */}
                {activePdf && (
                    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col">
                        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 shrink-0">
                            <span className="text-white font-semibold text-sm truncate max-w-xs md:max-w-md">{activePdf.title}</span>
                            <button
                                onClick={() => setActivePdf(null)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <X className="w-4 h-4" /> Close
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <PdfViewer url={activePdf.url} />
                        </div>
                    </div>
                )}

                {/* Ethical Use Advisory Modal */}
                {showAdvisory && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
                            <div className="bg-gradient-to-r from-teal-600 to-indigo-600 p-5 sm:p-6 text-white relative overflow-hidden">
                                <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 absolute -bottom-2 -right-2 text-white/20" />
                                <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                    <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                                    Ethical Use Advisory
                                </h3>
                                <p className="text-teal-100 text-xs sm:text-sm mt-1">Please read carefully before proceeding</p>
                            </div>
                            <div className="p-5 sm:p-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    These original exam papers are provided exclusively for your personal preparation for LDCE PS Group B examination.
                                </p>
                            </div>
                            <div className="p-5 sm:p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                                <label className="flex items-start gap-3 cursor-pointer group mb-5 select-none">
                                    <div className="relative flex items-center mt-0.5">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={advisoryAgreed}
                                            onChange={e => setAdvisoryAgreed(e.target.checked)}
                                        />
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-zinc-300 rounded transition-colors peer-checked:bg-teal-600 peer-checked:border-teal-600 dark:border-zinc-600" />
                                        <Check className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 text-white left-1 top-0.5 sm:left-1 sm:top-1 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug">
                                        I agree to use this material ethically for personal preparation only.
                                    </span>
                                </label>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowAdvisory(false)}
                                        className="flex-1 py-3 rounded-xl font-bold text-sm text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAdvisoryConfirm}
                                        disabled={!advisoryAgreed}
                                        className="flex-[2] py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-lg disabled:opacity-50 transition-all"
                                    >
                                        Confirm & Proceed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppScreenWrapper>
    );
}

// ─── IP PYQ Year-Wise Section ────────────────────────────────────────────────

function IpPyqYearSection({
    pyqYears,
    quizData,
    selectedYear,
    onYearSelect,
    onPaperSelect,
    isLocked,
}: {
    pyqYears: YearInfo[];
    quizData: QuizTopic[];
    selectedYear: string | null;
    onYearSelect: (year: string) => void;
    onPaperSelect: (topicId: string) => void;
    isLocked: boolean;
}) {
    const getQCount = (topicId: string | null) => {
        if (!topicId) return 0;
        const topic = quizData.find(t => t.id === topicId);
        return topic ? topic.sets.reduce((a, s) => a + s.questions.length, 0) : 0;
    };

    const getYearStats = (year: YearInfo) => {
        const mcqPapers = year.papers.filter(p => p.type !== 'descriptive');
        const available = mcqPapers.filter(p => p.topicId && getQCount(p.topicId) > 0).length;
        const totalQs = mcqPapers.reduce((a, p) => a + getQCount(p.topicId), 0);
        return { available, total: mcqPapers.length, totalQs };
    };

    return (
        <div className="mb-8">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600" />
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">MCQ Question Bank — Year Wise</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Curated & verified against the revised 2025 LDCE IP syllabus</p>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/30 flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Years Covered</p>
                        <p className="text-lg font-extrabold text-white">2011 – 2025</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Total Questions</p>
                        <p className="text-lg font-extrabold text-white">
                            {pyqYears.reduce((a, y) => a + getYearStats(y).totalQs, 0).toLocaleString()}+
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Status</p>
                        <p className="text-lg font-extrabold text-white">Syllabs-Mapped & Updated</p>
                    </div>
                </div>
            </div>

            {/* Year Cards */}
            <div className="space-y-4">
                {pyqYears.map((yearInfo) => {
                    const stats = getYearStats(yearInfo);
                    const isOpen = selectedYear === yearInfo.year;
                    const hasAny = stats.available > 0;

                    return (
                        <div key={yearInfo.year} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                            {/* Year Row — clickable header */}
                            <button
                                onClick={() => onYearSelect(yearInfo.year)}
                                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                            >
                                {/* Year badge */}
                                <div className={`shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-extrabold shadow-sm
                                    ${hasAny
                                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-200 dark:shadow-cyan-900/20'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                    }`}
                                >
                                    <span className="text-xl leading-none">{yearInfo.year.slice(2)}</span>
                                    <span className="text-[10px] leading-none mt-0.5 opacity-80">{yearInfo.year.slice(0, 2)}</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">LDCE IP {yearInfo.year}</span>
                                        {yearInfo.pattern === 'new' && (
                                            <span className="px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                New Pattern
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm flex-wrap">
                                        <span className="text-zinc-500 dark:text-zinc-400">
                                            {yearInfo.pattern === 'new' ? '3 Papers' : '4 Papers'}
                                        </span>
                                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                                        {hasAny ? (
                                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                {stats.totalQs} MCQs available
                                            </span>
                                        ) : (
                                            <span className="text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                Extraction in progress
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Progress pills */}
                                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                                    {yearInfo.papers.filter(p => p.type !== 'descriptive').map(p => {
                                        const qc = getQCount(p.topicId);
                                        return (
                                            <div key={p.num} title={`${p.label}: ${qc > 0 ? qc + ' Qs' : 'Pending'}`}
                                                className={`w-2.5 h-2.5 rounded-full ${qc > 0 ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                                            />
                                        );
                                    })}
                                </div>

                                <ChevronDown className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Expanded Paper Cards */}
                            {isOpen && (
                                <div className="px-6 pb-6 pt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-zinc-100 dark:border-zinc-800">
                                    {yearInfo.papers.map((paper) => {
                                        const colors = PAPER_COLORS[paper.num] ?? PAPER_COLORS[1];
                                        const qCount = getQCount(paper.topicId);
                                        const isDescriptive = paper.type === 'descriptive';
                                        const isAvailable = !isDescriptive && qCount > 0;
                                        const isPending = !isDescriptive && !isAvailable;

                                        return (
                                            <div
                                                key={paper.num}
                                                className={`relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br ${colors.gradient} shadow-lg`}
                                            >
                                                <div className={`absolute top-0 right-0 w-24 h-24 ${colors.accent} rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none`} />

                                                <div className="relative p-5">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.badge} px-2 py-0.5 rounded-full`}>
                                                            {isDescriptive ? 'Descriptive' : 'MCQ'}
                                                        </span>
                                                        <span className={`text-xs font-semibold ${colors.text}`}>{paper.label}</span>
                                                    </div>

                                                    <p className="text-white/60 text-xs leading-relaxed mb-4 min-h-[2.5rem]">{paper.subjects}</p>

                                                    {isDescriptive ? (
                                                        <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                                                            <BookOpen className="w-3.5 h-3.5" />
                                                            Not applicable for MCQ bank
                                                        </div>
                                                    ) : isLocked ? (
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex items-center gap-1.5 text-white/50 text-xs">
                                                                <Lock className="w-3.5 h-3.5" /> Locked
                                                            </span>
                                                            <Link href="/pricing" className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold rounded-full hover:scale-105 transition-transform active:scale-95">
                                                                Upgrade
                                                            </Link>
                                                        </div>
                                                    ) : isAvailable ? (
                                                        <button
                                                            onClick={() => paper.topicId && onPaperSelect(paper.topicId)}
                                                            className="w-full py-2.5 flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm font-bold rounded-xl backdrop-blur-sm transition-all active:scale-95 border border-white/10"
                                                        >
                                                            <PlayCircle className="w-4 h-4" />
                                                            Practice · {qCount} Qs
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-white/40 text-xs font-medium">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            Coming Soon
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={`h-0.5 w-full ${isAvailable ? 'bg-white/30' : 'bg-white/10'}`} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── PS / Legacy Topic Card ───────────────────────────────────────────────────
function TopicCard({ topic, onSelect, isLocked = false }: { topic: QuizTopic, onSelect: (t: QuizTopic) => void, isLocked?: boolean }) {
    const { course } = useCourse();
    const isPS = course === 'PS_GR_B';
    const qCount = topic.sets.reduce((acc, s) => acc + s.questions.length, 0);

    const Content = () => (
        <>
            <div className={`absolute top-0 right-0 p-4 transition-opacity ${isLocked ? 'opacity-10' : 'opacity-5 group-hover:opacity-10'}`}>
                <FileQuestion className={`w-24 h-24 ${isPS ? 'text-teal-600' : 'text-cyan-600'}`} />
            </div>

            <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${isPS ? 'text-teal-600 dark:text-teal-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
                {topic.category}
            </span>
            <h3 className={`text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 transition-colors z-10 ${isPS ? 'group-hover:text-teal-700 dark:group-hover:text-teal-400' : 'group-hover:text-cyan-700 dark:group-hover:text-cyan-400'}`}>{topic.title}</h3>

            <div className="mt-auto pt-4 flex items-center justify-between z-10 w-full">
                <div className="text-zinc-400 dark:text-zinc-500 text-sm font-medium">
                    {isLocked ? (
                        <div className="flex items-center gap-2 text-zinc-500">
                            <Lock className="w-4 h-4" />
                            <span>Locked</span>
                        </div>
                    ) : (
                        qCount > 0 ? (
                            <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <CheckCircle2 className="w-4 h-4" /> {qCount} Questions
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Settings className="w-4 h-4" /> Coming Soon
                            </span>
                        )
                    )}
                </div>

                {isLocked && (
                    <Link href="/pricing" className="relative z-20 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow hover:shadow-lg transition-shadow hover:scale-105 active:scale-95">
                        Upgrade
                    </Link>
                )}
            </div>
        </>
    );

    const baseClasses = `group bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-all text-left flex flex-col h-full relative overflow-hidden
        ${isLocked ? 'opacity-70 grayscale-[0.5]' : (isPS ? 'hover:border-teal-200 dark:hover:border-teal-700/50 hover:shadow-xl dark:shadow-lg dark:shadow-teal-900/10 cursor-pointer' : 'hover:border-cyan-200 dark:hover:border-cyan-700/50 hover:shadow-xl dark:shadow-lg dark:shadow-cyan-900/10 cursor-pointer')}
    `;

    if (isLocked) {
        return (
            <div className={baseClasses}>
                <Content />
            </div>
        );
    }

    return (
        <button
            onClick={() => onSelect(topic)}
            className={baseClasses}
        >
            <Content />
        </button>
    );
}
