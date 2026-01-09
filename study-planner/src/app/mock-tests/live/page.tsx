"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Timer, CheckCircle2, History, Trophy, AlertCircle, Play, XCircle, LayoutGrid, X, FileDown } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { LIVE_MOCK_QUESTIONS, Question } from "@/data/live_mock_data";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import NativeQuizRunner from "@/components/quiz/NativeQuizRunner";

interface LeaderboardEntry {
    _id: string;
    userName: string;
    score: number;
    submittedAt: string;
}

export default function LiveMockTestPage() {
    const isMobileApp = useIsMobileApp();
    const [gameState, setGameState] = useState<'rules' | 'test' | 'leaderboard'>('rules');
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes = 1200 seconds
    const [score, setScore] = useState(0);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("Aspirant");
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'just_submitted' | 'already_submitted'>('just_submitted');
    const [showDownloadNotification, setShowDownloadNotification] = useState(false);

    const questions: Question[] = LIVE_MOCK_QUESTIONS;
    const total = questions.length;
    const currentQ = questions[currentQIndex];

    // Removed unused hasChecked state if not used, or keep it if unsure. It was in previous file but unused in visible logic. keeping strictly to restore.
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        // Get user session
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
        if (cookie) {
            try {
                const session = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
                if (session.email) {
                    setUserEmail(session.email);
                    checkSubmissionStatus(session.email);
                }
                if (session.name) {
                    setUserName(session.name);
                }
            } catch (e) {
                console.error("Session parse error");
            }
        }
        fetchLeaderboard();
    }, []);

    const checkSubmissionStatus = async (email: string) => {
        try {
            const res = await fetch('/api/mock-test/live/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.hasSubmitted) {
                    setScore(data.score);
                    setGameState('leaderboard');
                    setSubmissionStatus("already_submitted");
                }
            }
        } catch (e) {
            console.error("Failed to check status", e);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        // Only run web timer if NOT mobile app (Mobile app handles its own timer in NativeQuizRunner)
        if (gameState === 'test' && timeLeft > 0 && !isMobileApp) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmit(true); // Auto-submit
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft, isMobileApp]);

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('/api/mock-test/live/leaderboard');
            if (res.ok) {
                const data = await res.json();
                setLeaderboard(data.leaderboard);
            }
        } catch (e) {
            console.error("Failed to fetch leaderboard", e);
        }
    };

    const handleStartTest = () => {
        setGameState('test');
    };

    const handleOptionSelect = (qId: string, idx: number) => {
        setAnswers(prev => ({ ...prev, [qId]: idx }));
    };

    const handleSubmit = async (auto = false, mobileAnswers?: Record<string, number>) => {
        if (!auto && !mobileAnswers && !confirm("Are you sure you want to submit the test?")) return;

        setIsSubmitting(true);
        const finalAnswers = mobileAnswers || answers;

        // Sync state if coming from mobile
        if (mobileAnswers) {
            setAnswers(mobileAnswers);
        }

        let newScore = 0;
        questions.forEach(q => {
            if (finalAnswers[q.id] === q.correctAnswer) {
                newScore += 2; // 2 marks per question
            }
        });
        setScore(newScore);

        if (userEmail) {
            try {
                await fetch('/api/mock-test/live/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: userEmail,
                        score: newScore,
                        totalQuestions: total,
                        answers: finalAnswers,
                        testId: 'live-sample'
                    })
                });
            } catch (e) {
                console.error("Failed to submit results", e);
            }
        }

        await fetchLeaderboard();
        setGameState('leaderboard');
        setIsSubmitting(false);
    };

    const handleDownloadPDF = async () => {
        const doc = new jsPDF();

        // Set global font
        doc.setFont("helvetica", "normal");

        // Add Logo
        try {
            const logoPath = '/android-logo.jpg';
            const img = new Image();
            img.src = logoPath;
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });
            doc.addImage(img, 'JPEG', 15, 10, 25, 25);
        } catch (err) {
            console.error("Error adding logo", err);
        }

        // Title Section (Centered relative to page width 210mm)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(79, 70, 229); // Indigo 600
        doc.text("All India Live Mock Test Results", 105, 22, { align: "center" });

        // Branding
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text("Powered by Dak Guru www.dakguru.com", 105, 29, { align: "center" });

        // Separator Line
        doc.setDrawColor(230, 230, 230);
        doc.line(15, 40, 195, 40);

        // User Details Grid
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);

        doc.text("Aspirant Name:", 15, 52);
        doc.setFont("helvetica", "normal");
        doc.text(userName, 50, 52);

        doc.setFont("helvetica", "bold");
        doc.text("Date:", 130, 52);
        doc.setFont("helvetica", "normal");
        doc.text(format(new Date(), "dd-MM-yyyy"), 145, 52);

        doc.setFont("helvetica", "bold");
        doc.text("Score:", 15, 60);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(score >= 15 ? 22 : 220, score >= 15 ? 163 : 38, score >= 15 ? 74 : 38);
        doc.text(`${score} / 30`, 50, 60);

        doc.setTextColor(0, 0, 0); // Reset

        // content start y
        let yPos = 75;

        questions.forEach((q, index) => {
            // Check page break
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            // Question Text
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            const qNumber = `Q${index + 1}.`;
            doc.text(qNumber, 15, yPos);

            const splitQTitle = doc.splitTextToSize(q.text, 170);
            doc.text(splitQTitle, 25, yPos); // Indent question text slightly
            yPos += splitQTitle.length * 5 + 4;

            // Render Table if exists
            if (q.table) {
                autoTable(doc, {
                    startY: yPos,
                    head: [q.table.headers],
                    body: q.table.rows,
                    theme: 'grid',
                    headStyles: { fillColor: [79, 70, 229], textColor: 255, fontSize: 10, font: "helvetica", fontStyle: "bold" },
                    styles: { fontSize: 9, cellPadding: 3, font: "helvetica" },
                    margin: { left: 25, right: 15 },
                    columnStyles: { 0: { cellWidth: 'auto' } }, // Auto width
                });
                yPos = (doc as any).lastAutoTable.finalY + 6;
            }

            // Options
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);

            q.options.forEach((opt, optIndex) => {
                // Check page break for options
                if (yPos > 275) {
                    doc.addPage();
                    yPos = 20;
                }

                const isSelected = answers[q.id] === optIndex;
                const isCorrect = q.correctAnswer === optIndex;

                let color = [50, 50, 50]; // Dark Grey default

                if (isCorrect) {
                    color = [22, 163, 74]; // Green 600
                } else if (isSelected && !isCorrect) {
                    color = [220, 38, 38]; // Red 600
                } else if (isSelected) {
                    // Should be covered by above, but just in case
                    color = [79, 70, 229]; // Indigo
                }

                doc.setTextColor(color[0], color[1], color[2]);

                // Draw Letter
                const letter = String.fromCharCode(65 + optIndex);
                doc.setFont("helvetica", isCorrect || isSelected ? "bold" : "normal");

                // Align Letter at previous icon position
                doc.text(`${letter}.`, 25, yPos);

                // Draw Option Text
                doc.setFont("helvetica", "normal");
                const splitOpt = doc.splitTextToSize(opt, 160); // Increased width slightly since shifted left
                doc.text(splitOpt, 35, yPos);

                yPos += splitOpt.length * 5 + 1;
            });

            doc.setTextColor(0, 0, 0); // Reset to black
            yPos += 3;

            // Explanation
            if (q.explanation) {
                // Check page break for explanation
                const explText = `Explanation: ${q.explanation}`;
                const splitExpl = doc.splitTextToSize(explText, 165);

                if (yPos + splitExpl.length * 4 > 280) {
                    doc.addPage();
                    yPos = 20;
                }

                // Background box for explanation
                const boxHeight = splitExpl.length * 4 + 4;
                doc.setFillColor(249, 250, 251); // Gray 50
                doc.setDrawColor(229, 231, 235); // Gray 200
                doc.rect(25, yPos - 3, 170, boxHeight, 'FD'); // Fill and Draw

                doc.setFont("helvetica", "italic");
                doc.setFontSize(9);
                doc.setTextColor(75, 85, 99); // Gray 600

                doc.text(splitExpl, 28, yPos);
                yPos += boxHeight + 8; // Extra padding after question
            } else {
                yPos += 8;
            }
        });

        doc.save("DakGuru_MockTest_Result.pdf");
        setShowDownloadNotification(true);
    };

    useEffect(() => {
        if (showDownloadNotification) {
            const timer = setTimeout(() => {
                setShowDownloadNotification(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showDownloadNotification]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // --- RULES SCREEN ---
    if (gameState === 'rules') {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 flex items-center justify-center font-sans">
                <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <h1 className="text-3xl font-extrabold mb-2 relative z-10">All India Live Mock Test</h1>
                        <p className="text-indigo-100 relative z-10">Sample Test for LDCE IP 2026 Aspirants</p>
                    </div>

                    <div className="p-8">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-indigo-600" />
                            Rules & Regulations
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg shrink-0">
                                    <Timer className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 dark:text-zinc-100">20 Minutes Duration</p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">The test will auto-submit after the timer ends.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg shrink-0">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 dark:text-zinc-100">30 Marks Total</p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">15 Questions x 2 Marks each. No negative marking.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg shrink-0">
                                    <Trophy className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 dark:text-zinc-100">All India Rank</p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Check your rank on the leaderboard instantly after submission.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link href="/mock-tests" className="flex-1 py-3 text-center rounded-xl font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                Cancel
                            </Link>
                            <button onClick={handleStartTest} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
                                <Play className="w-4 h-4" /> Begin Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- TEST SCREEN ---
    if (gameState === 'test') {
        if (isMobileApp) {
            return (
                <NativeQuizRunner
                    quizTitle="Live Mock Test"
                    questions={questions}
                    onComplete={(mobileAnswers, timeTaken) => {
                        // Pass answers to submit
                        handleSubmit(false, mobileAnswers);
                    }}
                    onExit={() => setGameState('rules')}
                    mode="exam"
                />
            );
        }

        return (
            <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-indigo-500/30 transition-colors relative">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-zinc-200">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                Live Mock Test
                            </span>
                            <div className="hidden md:flex items-center text-sm font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                                Aspirant Name: <span className="text-zinc-900 ml-1 font-bold">{userName}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="md:hidden flex items-center text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full mr-2">
                                <span className="text-zinc-900 font-bold truncate max-w-[80px]">{userName}</span>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold shadow-sm ${timeLeft < 300 ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-zinc-200 text-zinc-700'
                                }`}>
                                <Timer className="w-4 h-4" />
                                {formatTime(timeLeft)}
                            </div>
                            <button
                                onClick={() => setIsPaletteOpen(true)}
                                className="md:hidden p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors border border-zinc-200 bg-white"
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 py-8">
                    {/* Progress Bar */}
                    <div className="h-1 bg-zinc-200 rounded-full overflow-hidden mb-8">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                            style={{ width: `${((currentQIndex + 1) / total) * 100}%` }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Question Area */}
                        <div className="md:col-span-8 space-y-6">
                            <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm min-h-[400px]">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-zinc-500 font-mono text-sm font-medium">Question {currentQIndex + 1} of {total}</span>
                                    <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide border border-indigo-100">+2 Marks</span>
                                </div>
                                <h2 className="text-xl font-medium leading-relaxed mb-8 whitespace-pre-wrap text-zinc-800">
                                    {currentQ.text}
                                </h2>

                                {currentQ.table && (
                                    <div className="mb-8 overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                                <tr>
                                                    {currentQ.table.headers.map((h, i) => (
                                                        <th key={i} className="px-6 py-4 font-bold text-zinc-900">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100">
                                                {currentQ.table.rows.map((row, i) => (
                                                    <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                                                        {row.map((cell, j) => (
                                                            <td key={j} className="px-6 py-4 text-zinc-700 font-medium">{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {currentQ.options.map((option, idx) => {
                                        const isSelected = answers[currentQ.id] === idx;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionSelect(currentQ.id, idx)}
                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group
                                                    ${isSelected
                                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                                        : 'border-zinc-100 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-white'
                                                    }
                                                `}
                                            >
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                                    ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-zinc-300 group-hover:border-zinc-400'}
                                                `}>
                                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <span className="font-medium">{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                                    disabled={currentQIndex === 0}
                                    className="px-6 py-3 rounded-xl font-medium text-zinc-500 hover:text-zinc-900 disabled:opacity-50 disabled:hover:text-zinc-500 hover:bg-zinc-100 transition-colors"
                                >
                                    Previous
                                </button>

                                {currentQIndex < total - 1 ? (
                                    <button
                                        onClick={() => setCurrentQIndex(prev => Math.min(total - 1, prev + 1))}
                                        className="px-8 py-3 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl font-bold transition-all shadow-lg hover:shadow-zinc-500/20"
                                    >
                                        Next Question
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSubmit(false)}
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-500/20"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Test'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Question Palette Desktop */}
                        <div className="hidden md:block md:col-span-4">
                            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm sticky top-24">
                                <h3 className="text-zinc-400 font-bold mb-4 text-sm uppercase tracking-wider">Question Palette</h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {questions.map((q, i) => {
                                        const isAnswered = answers[q.id] !== undefined;
                                        const isCurrent = currentQIndex === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentQIndex(i)}
                                                className={`aspect-square rounded-lg text-sm font-bold flex items-center justify-center transition-all
                                                    ${isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : ''}
                                                    ${isAnswered
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                                                    }
                                                `}
                                            >
                                                {i + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                                        <div className="w-3 h-3 rounded bg-indigo-600"></div> Answered
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                                        <div className="w-3 h-3 rounded bg-zinc-100 border border-zinc-200"></div> Not Answered
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                                        <div className="w-3 h-3 rounded border-2 border-indigo-500 bg-transparent"></div> Current
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Mobile Drawer */}
                {isPaletteOpen && (
                    <>
                        <div
                            className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200"
                            onClick={() => setIsPaletteOpen(false)}
                        />
                        <div className="fixed top-16 bottom-0 right-0 w-80 max-w-full bg-white z-40 shadow-2xl p-6 transform transition-transform duration-300 ease-out md:hidden flex flex-col animate-in slide-in-from-right border-l border-zinc-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg text-zinc-900">Question Palette</h3>
                                <button
                                    onClick={() => setIsPaletteOpen(false)}
                                    className="p-2 hover:bg-zinc-100 rounded-full text-zinc-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="overflow-y-auto flex-1">
                                <div className="grid grid-cols-5 gap-2">
                                    {questions.map((q, i) => {
                                        const isAnswered = answers[q.id] !== undefined;
                                        const isCurrent = currentQIndex === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setCurrentQIndex(i);
                                                    setIsPaletteOpen(false);
                                                }}
                                                className={`aspect-square rounded-lg text-sm font-bold flex items-center justify-center transition-all
                                                    ${isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : ''}
                                                    ${isAnswered
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                                                    }
                                                `}
                                            >
                                                {i + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                                        <div className="w-4 h-4 rounded bg-indigo-600 shadow-sm"></div> Answered
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                                        <div className="w-4 h-4 rounded bg-zinc-100 border border-zinc-200 shadow-sm"></div> Not Answered
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                                        <div className="w-4 h-4 rounded border-2 border-indigo-500 bg-transparent"></div> Current
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // --- LEADERBOARD SCREEN ---
    if (gameState === 'leaderboard') {
        const userRank = leaderboard.findIndex(l => l.userName === (leaderboard.find(u => u.submittedAt)?.userName || 'You')) + 1; // Approximate logic, ideally fetch from backend

        return (
            <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans p-4 md:p-12 relative">
                {/* Notification */}
                {showDownloadNotification && (
                    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-bold">Answer Sheet Downloaded. Go to your Downloads folder</span>
                    </div>
                )}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-full mb-6 shadow-2xl shadow-yellow-500/20">
                            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900">
                            {submissionStatus === 'already_submitted' ? 'Test Already Completed' : 'Test Completed!'}
                        </h1>
                        <p className="text-zinc-500 text-lg md:text-xl">
                            You scored <span className="text-zinc-900 font-bold">{score} / 30</span>
                        </p>

                        <div className="mt-8 w-full max-w-sm mx-auto">
                            <button
                                onClick={handleDownloadPDF}
                                className="w-full group px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-3"
                            >
                                <FileDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Download Answer Sheet
                            </button>
                            <p className="text-xs text-zinc-400 mt-2 font-medium">Includes Correct Answers & Explanations</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xl">
                        <div className="p-4 md:p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-zinc-800">
                                <History className="w-5 h-5 text-indigo-600" /> Live Leaderboard
                            </h2>
                            <span className="text-[10px] md:text-xs font-bold bg-white border border-zinc-200 px-3 py-1 rounded-full text-zinc-500 uppercase tracking-wider">Top 50</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px] md:min-w-0">
                                <thead className="bg-zinc-50">
                                    <tr>
                                        <th className="py-3 px-4 md:py-4 md:px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider w-16 md:w-20">Rank</th>
                                        <th className="py-3 px-4 md:py-4 md:px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            <span className="md:hidden">Aspirant</span>
                                            <span className="hidden md:inline">Name of the Aspirant Shri/Smt</span>
                                        </th>
                                        <th className="py-3 px-4 md:py-4 md:px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">
                                            <span className="md:hidden">Score</span>
                                            <span className="hidden md:inline">Score Secured</span>
                                        </th>
                                        <th className="py-3 px-4 md:py-4 md:px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">
                                            <span className="md:hidden">Date</span>
                                            <span className="hidden md:inline">Completed on (Date and Time)</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {leaderboard.map((entry, index) => {
                                        const isCurrentUser = entry.userName === userEmail; // Simplified check
                                        // More accurate to check ID if we had it, but name/email should suffice for this demo

                                        let rankBadge;
                                        if (index === 0) rankBadge = "🥇";
                                        else if (index === 1) rankBadge = "🥈";
                                        else if (index === 2) rankBadge = "🥉";
                                        else rankBadge = `#${index + 1}`;

                                        return (
                                            <tr key={index} className="group hover:bg-zinc-50 transition-colors">
                                                <td className="py-4 px-6 font-bold text-zinc-500">{rankBadge}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                                                            ${index < 3 ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-500'}
                                                        `}>
                                                            {entry.userName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-zinc-900">{entry.userName}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-right font-bold text-zinc-900">{entry.score}</td>
                                                <td className="py-4 px-6 text-right text-sm text-zinc-500 font-mono">
                                                    {format(new Date(entry.submittedAt), 'MMM d, h:mm a')}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-12 text-center pb-20">
                        <Link href="/" className="px-8 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
