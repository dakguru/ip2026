"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Timer, Save } from "lucide-react";
import Link from "next/link";
import { ADMIN_MOCK_QUESTIONS, Question } from "@/data/admin_mock_questions";

export default function AdminTestRunner() {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        if (!isSubmitted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmit(); // Auto-submit when time runs out
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isSubmitted, timeLeft]);

    useEffect(() => {
        // Simple client-side admin check (security by obscurity, but fits 'sample' requirement)
        // Ideally should verify with server, but for this "sample test" accessible via UI...
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
        if (cookie) {
            try {
                const session = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
                if (session.role === 'admin') {
                    setIsAdmin(true);
                }
                if (session.email) {
                    setUserEmail(session.email);
                }
            } catch (e) {
                console.error("Session parse error");
            }
        }
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const questions: Question[] = ADMIN_MOCK_QUESTIONS;
    const currentQ = questions[currentQIndex];
    const total = questions.length;

    const handleOptionSelect = (qId: string, idx: number) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [qId]: idx }));
    };

    const handleSubmit = async () => {
        let newScore = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        setIsSubmitted(true);

        if (userEmail) {
            try {
                await fetch('/api/admin/mock-test/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: userEmail,
                        score: newScore,
                        totalQuestions: total,
                        answers: answers
                    })
                });
            } catch (e) {
                console.error("Failed to submit results", e);
            }
        }
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="text-zinc-400 mt-2">This sample test is strictly for Administrators.</p>
                    <Link href="/" className="inline-block mt-6 px-6 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500/30">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium hidden sm:inline">Back to Admin</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold ${timeLeft < 300 ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                            }`}>
                            <Timer className="w-4 h-4" />
                            {formatTime(timeLeft)}
                        </div>
                        <div className="text-sm font-medium tabular-nums">
                            {currentQIndex + 1} <span className="text-zinc-500">/</span> {total}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {!isSubmitted ? (
                    <div className="space-y-8">
                        {/* Progress Bar */}
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-600 transition-all duration-300 ease-out"
                                style={{ width: `${((currentQIndex + 1) / total) * 100}%` }}
                            />
                        </div>

                        {/* Question Card */}
                        <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 shadow-xl">
                            <h2 className="text-xl md:text-2xl font-semibold leading-relaxed mb-8">
                                {currentQ.text}
                            </h2>

                            <div className="space-y-3">
                                {currentQ.options.map((option, idx) => {
                                    const isSelected = answers[currentQ.id] === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(currentQ.id, idx)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group
                                                ${isSelected
                                                    ? 'border-purple-500 bg-purple-500/10 text-white'
                                                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800'
                                                }
                                            `}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                                ${isSelected ? 'border-purple-500 bg-purple-500' : 'border-zinc-600 group-hover:border-zinc-500'}
                                            `}>
                                                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <span className="font-medium">{option}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between pt-4">
                            <button
                                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentQIndex === 0}
                                className="px-6 py-3 rounded-xl font-medium text-zinc-400 hover:text-white disabled:opacity-50 disabled:hover:text-zinc-400 hover:bg-zinc-900 transition-colors"
                            >
                                Previous
                            </button>

                            {currentQIndex < total - 1 ? (
                                <button
                                    onClick={() => setCurrentQIndex(prev => Math.min(total - 1, prev + 1))}
                                    className="px-8 py-3 bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl font-bold transition-all shadow-lg hover:shadow-zinc-200/20"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Submit Test
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    // Results View (Modified)
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="text-center pt-12 pb-20">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-full mb-8 shadow-2xl shadow-purple-500/30 animate-pulse">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Test Submitted Successfully!</h1>
                            <p className="text-zinc-400 text-xl max-w-lg mx-auto leading-relaxed">
                                Thank you for your participation. Your responses have been recorded.
                            </p>

                            <div className="mt-12 p-6 bg-zinc-900 rounded-2xl border border-zinc-800 max-w-md mx-auto">
                                <p className="text-lg font-medium text-zinc-200 flex items-center justify-center gap-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                    Results will be announced on Monday
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link href="/admin" className="px-8 py-4 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700 transition-colors inline-flex items-center gap-2">
                                <ArrowLeft className="w-5 h-5" /> Return to Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
