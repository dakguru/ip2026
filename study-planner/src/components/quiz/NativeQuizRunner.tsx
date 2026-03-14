"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Grid, ChevronLeft, ChevronRight, Bookmark, Send, CheckCircle2, XCircle, HelpCircle, AlertCircle } from "lucide-react";
import { Question } from "@/lib/quizTypes";
import { motion, AnimatePresence } from "framer-motion";
import FormattedQuestionText from "./FormattedQuestionText";

interface NativeQuizRunnerProps {
    quizTitle: string;
    questions: Question[];
    onComplete: (answers: Record<string, number>, timeTaken: number) => void;
    onExit: () => void;
    mode?: 'practice' | 'exam';
    aspirantName?: string;
}

export default function NativeQuizRunner({ quizTitle, questions, onComplete, onExit, mode = 'practice', aspirantName = "Aspirant" }: NativeQuizRunnerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 min per question
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // New: Explanation State
    const [showExplanation, setShowExplanation] = useState<Set<string>>(new Set());

    // Haptic Feedback Helper
    const vibrate = (ms: number = 10) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(ms);
        }
    };

    // Load progress
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(`quiz_progress_${quizTitle}`);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.totalQuestions === questions.length) {
                        setAnswers(parsed.answers || {});
                        setMarkedForReview(new Set(parsed.marked || []));
                        setCurrentIndex(parsed.currentIndex || 0);
                        setTimeLeft(parsed.timeLeft || questions.length * 60);
                        // Restore shown explanations based on answers
                        const answeredIds = Object.keys(parsed.answers || {});
                        setShowExplanation(new Set(answeredIds));
                    }
                } catch (e) {
                    console.error("Failed to load saved quiz progress", e);
                }
            }
        }
    }, [quizTitle, questions]);

    // Save progress
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stateToSave = {
                answers,
                marked: Array.from(markedForReview),
                currentIndex,
                timeLeft,
                totalQuestions: questions.length
            };
            localStorage.setItem(`quiz_progress_${quizTitle}`, JSON.stringify(stateToSave));
        }
    }, [answers, markedForReview, currentIndex, timeLeft, quizTitle, questions]);

    const handleExitRequest = () => {
        vibrate(20);
        setShowExitConfirm(true);
    };

    const confirmExit = () => {
        localStorage.removeItem(`quiz_progress_${quizTitle}`);
        vibrate(20);
        onExit();
    };

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const currentQ = questions[currentIndex];
    const isAnswered = answers[currentQ.id] !== undefined;

    const handleSelect = (optionIdx: number) => {
        // In practice mode, prevent changing if already answered (instant validation)
        // In exam mode, allow changing anytime
        if (mode === 'practice' && isAnswered) return;

        vibrate(10);
        setAnswers(prev => ({ ...prev, [currentQ.id]: optionIdx }));

        // Auto-show explanation on answer ONLY in practice mode
        if (mode === 'practice') {
            setShowExplanation(prev => new Set(prev).add(currentQ.id));
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            vibrate(10);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            vibrate(10);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const toggleMarkRef = () => {
        vibrate(10);
        setMarkedForReview(prev => {
            const next = new Set(prev);
            if (next.has(currentQ.id)) {
                next.delete(currentQ.id);
            } else {
                next.add(currentQ.id);
            }
            return next;
        });
    };

    const handleSubmit = () => {
        vibrate(30);
        localStorage.removeItem(`quiz_progress_${quizTitle}`);
        const totalTime = (questions.length * 60) - timeLeft;
        onComplete(answers, totalTime);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const getStatusColor = (qId: string, idx: number) => {
        const ans = answers[qId];
        const isMarked = markedForReview.has(qId);
        const isCurrent = questions[idx].id === currentQ.id;

        if (isCurrent) return "border-2 border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900";
        if (isMarked) return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800";
        if (ans !== undefined) return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-800";
        return "bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700";
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#F8F9FB] dark:bg-black flex flex-col font-sans">
            {/* 1. Modern Header */}
            <div className="min-h-[3.5rem] py-2 px-4 flex items-center justify-between bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-20 pt-[env(safe-area-inset-top)]">
                <div className="flex items-center gap-3">
                    <button onClick={handleExitRequest} className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
                        <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none mb-0.5">
                            {aspirantName}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 tracking-tight leading-none">
                                DAK GURU
                            </span>
                            <span className="w-0.5 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full"></span>
                            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 leading-none">
                                Q {currentIndex + 1} <span className="text-zinc-400 font-medium text-xs">/ {questions.length}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(timeLeft)}
                    </div>
                    <button onClick={() => setIsPaletteOpen(true)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        <Grid className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* 2. Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-32 pt-4 px-4 md:px-0 scroll-smooth">
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="popLayout" custom={currentIndex}>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {/* Question Card */}
                            {/* Question Card */}
                            <div className="relative bg-white dark:bg-zinc-900 p-5 md:p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 dark:border-zinc-800 mb-4 overflow-hidden">
                                {/* Branding Watermark */}
                                <img
                                    src="/official-logo.png"
                                    alt=""
                                    className="absolute inset-0 m-auto w-32 md:w-40 opacity-[0.12] pointer-events-none select-none z-0 object-contain"
                                />

                                <div className="relative z-10">
                                    <FormattedQuestionText 
                                        text={currentQ.text} 
                                        className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed font-sans"
                                    />

                                    {currentQ.table && (
                                        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                            <table className="w-full text-left text-xs md:text-sm">
                                                <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                                                    <tr>
                                                        {currentQ.table.headers.map((h, i) => (
                                                            <th key={i} className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                                    {currentQ.table.rows.map((row, i) => (
                                                        <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                                            {row.map((cell, j) => (
                                                                <td key={j} className="px-4 py-3 text-zinc-700 dark:text-zinc-300 font-medium">{cell}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-2.5">
                                {currentQ.options.map((option, idx) => {
                                    const isSelected = answers[currentQ.id] === idx;
                                    const isCorrect = idx === currentQ.correctAnswer;
                                    const showResult = mode === 'practice' && isAnswered;

                                    // Determine Styling
                                    let containerClass = "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800";
                                    let textClass = "text-zinc-700 dark:text-zinc-300";
                                    let icon = <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600"></div>;

                                    if (showResult) {
                                        if (isCorrect) {
                                            containerClass = "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md shadow-green-500/10";
                                            textClass = "text-green-800 dark:text-green-300 font-bold";
                                            icon = <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 fill-green-100 dark:fill-green-900" />;
                                        } else if (isSelected) {
                                            containerClass = "border-red-500 bg-red-50 dark:bg-red-900/20 shadow-md shadow-red-500/10";
                                            textClass = "text-red-800 dark:text-red-300 font-bold";
                                            icon = <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 fill-red-100 dark:fill-red-900" />;
                                        } else {
                                            containerClass = "border-zinc-100 dark:border-zinc-800 opacity-60 bg-zinc-50 dark:bg-zinc-900";
                                        }
                                    } else if (isSelected) {
                                        containerClass = "border-blue-600 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-100 dark:ring-blue-900";
                                        textClass = "text-blue-700 dark:text-blue-300 font-bold";
                                        icon = <div className="w-4 h-4 rounded-full border-[5px] border-blue-600"></div>;
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelect(idx)}
                                            disabled={mode === 'practice' && isAnswered}
                                            className={`relative w-full text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.99] flex items-start gap-3.5 ${containerClass}`}
                                        >
                                            <div className="mt-0.5 shrink-0 transition-transform duration-300">
                                                {icon}
                                            </div>
                                            <span className={`text-sm leading-snug ${textClass}`}>
                                                {option}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation Accordion (In Practice Mode Only) */}
                            {mode === 'practice' && isAnswered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    className="mt-6 overflow-hidden"
                                >
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800">
                                        <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
                                            <HelpCircle className="w-4 h-4" /> Explanation
                                        </div>
                                        <FormattedQuestionText 
                                            text={currentQ.explanation || ""} 
                                            className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 3. Bottom Actions Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-100 dark:border-zinc-800 p-3 pb-[max(12px,env(safe-area-inset-bottom))] z-[110]">
                <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
                    <button
                        onClick={toggleMarkRef}
                        className={`flex flex-col items-center gap-1 min-w-[56px] transition-colors ${markedForReview.has(currentQ.id) ? "text-purple-600" : "text-zinc-400 hover:text-zinc-600"}`}
                    >
                        <Bookmark className={`w-5 h-5 ${markedForReview.has(currentQ.id) ? "fill-current" : "stroke-current"}`} strokeWidth={2} />
                        <span className="text-[10px] font-bold">Review</span>
                    </button>

                    <div className="flex flex-1 items-center gap-3 justify-end">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {currentIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-6 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                            >
                                Finish Test <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex-1 px-6 h-12 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-blue-700"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 4. Palette Drawer */}
            <AnimatePresence>
                {isPaletteOpen && (
                    <div className="fixed inset-0 z-50 flex items-end justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsPaletteOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-t-[2.5rem] p-6 shadow-2xl max-h-[85vh] flex flex-col z-50"
                        >
                            <div className="flex items-center justify-center mb-6 relative">
                                <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-2 absolute -top-3"></div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Question Palette</h3>
                                <button onClick={() => setIsPaletteOpen(false)} className="absolute right-0 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-full text-zinc-500">
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-5 gap-3 overflow-y-auto p-1 pb-20 custom-scrollbar">
                                {questions.map((q, idx) => (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            vibrate(5);
                                            setCurrentIndex(idx);
                                            setIsPaletteOpen(false);
                                        }}
                                        className={`h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-bold border-2 transition-all ${getStatusColor(q.id, idx)}`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 5. Exit Alert */}
            <AnimatePresence>
                {showExitConfirm && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowExitConfirm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 w-full max-w-sm relative shadow-2xl z-10 text-center"
                        >
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Leave Quiz?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8 font-medium">
                                Your progress will be lost. Are you sure you want to exit?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowExitConfirm(false)}
                                    className="flex-1 px-6 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold"
                                >
                                    Stay
                                </button>
                                <button
                                    onClick={confirmExit}
                                    className="flex-1 px-6 py-3.5 rounded-2xl bg-red-600 text-white font-bold shadow-lg shadow-red-500/30"
                                >
                                    Leave
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
