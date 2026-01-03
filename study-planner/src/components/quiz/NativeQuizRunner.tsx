"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock, Grid, ChevronLeft, ChevronRight, Bookmark, Send } from "lucide-react";
import { Question } from "@/lib/quizTypes";
import { motion, AnimatePresence } from "framer-motion";

interface NativeQuizRunnerProps {
    quizTitle: string;
    questions: Question[];
    onComplete: (answers: Record<string, number>, timeTaken: number) => void;
    onExit: () => void;
}

export default function NativeQuizRunner({ quizTitle, questions, onComplete, onExit }: NativeQuizRunnerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
    const [visited, setVisited] = useState<Set<string>>(new Set([questions[0]?.id]));
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 min per question
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Haptic Feedback Helper
    const vibrate = (ms: number = 10) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(ms);
        }
    };

    // Load progress from local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(`quiz_progress_${quizTitle}`);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Basic validation to ensure it matches current quiz
                    if (parsed.totalQuestions === questions.length) {
                        setAnswers(parsed.answers || {});
                        setMarkedForReview(new Set(parsed.marked || []));
                        setCurrentIndex(parsed.currentIndex || 0);
                        setTimeLeft(parsed.timeLeft || questions.length * 60);
                        setVisited(new Set(parsed.visited || [questions[0]?.id]));
                    }
                } catch (e) {
                    console.error("Failed to load saved quiz progress", e);
                }
            }
        }
    }, [quizTitle, questions]);

    // Save progress to local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stateToSave = {
                answers,
                marked: Array.from(markedForReview),
                currentIndex,
                timeLeft,
                visited: Array.from(visited),
                totalQuestions: questions.length
            };
            localStorage.setItem(`quiz_progress_${quizTitle}`, JSON.stringify(stateToSave));
        }
    }, [answers, markedForReview, currentIndex, timeLeft, visited, quizTitle, questions]);

    // Clear storage on complete/exit
    const clearProgress = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(`quiz_progress_${quizTitle}`);
        }
    };

    const handleExitRequest = () => {
        vibrate(20);
        setShowExitConfirm(true);
    };

    const confirmExit = () => {
        clearProgress();
        vibrate(20);
        onExit();
    };

    // Track time taken
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

    useEffect(() => {
        setVisited(prev => new Set(prev).add(questions[currentIndex].id));
    }, [currentIndex, questions]);

    const currentQ = questions[currentIndex];

    const handleSelect = (optionIdx: number) => {
        vibrate(5);
        setAnswers(prev => ({ ...prev, [currentQ.id]: optionIdx }));
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

    // Swipe handlers
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            handleNext();
        } else if (swipe > swipeConfidenceThreshold) {
            handlePrev();
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
        clearProgress();
        const totalTime = (questions.length * 60) - timeLeft;
        onComplete(answers, totalTime);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const getStatusColor = (qId: string, idx: number) => {
        const isAnswered = answers[qId] !== undefined;
        const isMarked = markedForReview.has(qId);
        const isCurrent = questions[idx].id === currentQ.id;

        if (isCurrent) return "border-2 border-blue-600 ring-2 ring-blue-100";
        if (isMarked) return "bg-purple-100 text-purple-700 border-purple-300";
        if (isAnswered) return "bg-green-100 text-green-700 border-green-300";
        if (visited.has(qId)) return "bg-red-50 text-red-600 border-red-200"; // Visited but not answered
        return "bg-zinc-50 text-zinc-400 border-zinc-200"; // Not visited
    };

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex flex-col">
            {/* 1. Top Bar */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm z-20">
                <div className="flex items-center gap-3">
                    <button onClick={handleExitRequest} className="p-2 -ml-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 max-w-[200px]">
                            {quizTitle}
                        </span>
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
                            Q.{currentIndex + 1}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-mono font-bold flex items-center gap-1.5 border ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={() => {
                            vibrate(10);
                            setIsPaletteOpen(true);
                        }}
                        className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300"
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* 2. Questions Area (Swipeable) */}
            <div className="flex-1 overflow-y-auto pb-24 bg-zinc-50 dark:bg-black overflow-x-hidden">
                <AnimatePresence mode="popLayout" custom={currentIndex}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="p-5 h-full"
                    >
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 mb-6 relative">
                            {/* Swipe Hint */}
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 animate-pulse sm:hidden">
                                <ChevronRight className="w-6 h-6 text-zinc-300" />
                            </div>
                            <p className="text-lg font-medium text-zinc-800 dark:text-zinc-100 leading-relaxed select-none">
                                {currentQ.text}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {currentQ.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all active:scale-[0.98] flex items-start gap-3
                                ${answers[currentQ.id] === idx
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                        }
                            `}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0
                                ${answers[currentQ.id] === idx
                                            ? "border-blue-500 bg-blue-500"
                                            : "border-zinc-300 dark:border-zinc-600"
                                        }
                            `}>
                                        {answers[currentQ.id] === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <span className={`${answers[currentQ.id] === idx ? "text-blue-700 dark:text-blue-300 font-medium" : "text-zinc-700 dark:text-zinc-300"}`}>
                                        {option}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 3. Bottom Control Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-3 px-4 z-20 pb-[env(safe-area-inset-bottom)]">
                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={toggleMarkRef}
                        className={`flex flex-col items-center gap-1 min-w-[60px] ${markedForReview.has(currentQ.id) ? "text-purple-600" : "text-zinc-400"}`}
                    >
                        <Bookmark className={`w-5 h-5 ${markedForReview.has(currentQ.id) ? "fill-current" : ""}`} />
                        <span className="text-[10px] font-medium">Review</span>
                    </button>

                    <div className="flex items-center gap-3 flex-1 justify-end">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="px-4 py-2.5 rounded-lg font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {currentIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-lg font-bold text-sm shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-all"
                            >
                                Submit Test <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex-1 px-4 py-2.5 bg-zinc-900 dark:bg-white dark:text-zinc-900 active:scale-95 text-white rounded-lg font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 4. Question Palette (Bottom Sheet) */}
            {isPaletteOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsPaletteOpen(false)} />
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        className="relative bg-white dark:bg-zinc-900 w-full max-w-md sm:rounded-2xl rounded-t-2xl p-6 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Question Palette</h3>
                            <button onClick={() => setIsPaletteOpen(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                                <span className="sr-only">Close</span>
                                <ChevronLeft className="w-5 h-5 rotate-90" />
                            </button>
                        </div>

                        <div className="grid grid-cols-5 gap-3 overflow-y-auto p-1 pb-20">
                            {questions.map((q, idx) => (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                        vibrate(5);
                                        setCurrentIndex(idx);
                                        setIsPaletteOpen(false);
                                    }}
                                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border ${getStatusColor(q.id, idx)}`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full" /> Answered</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded-full" /> Marked</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-50 border border-red-200 rounded-full" /> Visited</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-zinc-50 border border-zinc-200 rounded-full" /> Not Visited</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* 5. Exit Confirmation */}
            {showExitConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExitConfirm(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm relative shadow-xl z-10"
                    >
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Quit Quiz?</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            Your progress will be lost if you leave now. Are you sure?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowExitConfirm(false)}
                                className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmExit}
                                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold"
                            >
                                Quit
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
