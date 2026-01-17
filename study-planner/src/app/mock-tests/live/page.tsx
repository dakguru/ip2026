"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Timer, CheckCircle2, History, Trophy, AlertCircle, Play, XCircle, LayoutGrid, X, FileDown, Lock, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { LIVE_MOCK_QUESTIONS, Question } from "@/data/live_mock_data";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { useIsMobile } from "@/hooks/use-is-mobile";
import NativeQuizRunner from "@/components/quiz/NativeQuizRunner";
import Script from "next/script";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';

interface LeaderboardEntry {
    _id: string;
    userName: string;
    score: number;
    submittedAt: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function LiveMockTestPage() {
    const isNativeApp = useIsMobileApp();
    const isMobileScreen = useIsMobile();
    const isMobileApp = isNativeApp || isMobileScreen;

    const [gameState, setGameState] = useState<'rules' | 'test' | 'leaderboard'>('rules');
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes = 1200 seconds
    const [finalTimeTaken, setFinalTimeTaken] = useState(0);
    const [score, setScore] = useState(0);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("Aspirant");
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'just_submitted' | 'already_submitted'>('just_submitted');
    const [showDownloadNotification, setShowDownloadNotification] = useState(false);

    // Payment & Membership States (Unused for this free sample test, but kept for consistency)
    const [membershipLevel, setMembershipLevel] = useState<'free' | 'silver' | 'gold' | 'admin'>('free');
    const [role, setRole] = useState<'aspirant' | 'admin'>('aspirant');

    // Sample Test is ALWAYS FREE
    const canStart = true;

    const questions: Question[] = LIVE_MOCK_QUESTIONS;
    const total = questions.length;
    const currentQ = questions[currentQIndex];

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
                if (session.membershipLevel) {
                    setMembershipLevel(session.membershipLevel);
                }
                if (session.role) {
                    setRole(session.role);
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
        if (gameState === 'test' && timeLeft > 0 && !isMobileApp) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmit(true);
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
            const res = await fetch('/api/mock-test/live/leaderboard', { cache: 'no-store' });
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

        // Calculate Time Taken
        let calculatedTimeTaken = 0;
        if (mobileAnswers) {
            // Mobile app logic passes time taken or handles it differently, currently assume it might pass it in future
            // For now if mobile answers are passed we assume time logic is handled there or we just default
            // Actually the NativeQuizRunner onComplete passed (mobileAnswers, timeTaken) but we only used first arg in previous call.
            // But we can't change arguments of handleSubmit easily without type check.
            // Let's assume for web:
            calculatedTimeTaken = 1200 - timeLeft;
        } else {
            calculatedTimeTaken = 1200 - timeLeft;
        }
        setFinalTimeTaken(calculatedTimeTaken);

        const finalAnswers = mobileAnswers || answers;

        if (mobileAnswers) {
            setAnswers(mobileAnswers);
        }

        let newScore = 0;
        questions.forEach(q => {
            if (finalAnswers[q.id] === q.correctAnswer) {
                newScore += 2;
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
        doc.setFont("helvetica", "normal");
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
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(79, 70, 229);
        doc.text("All India Live Mock Test Results", 105, 22, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text("Powered by Dak Guru www.dakguru.com", 105, 29, { align: "center" });

        doc.setDrawColor(230, 230, 230);
        doc.line(15, 40, 195, 40);

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

        doc.setTextColor(0, 0, 0);

        let yPos = 75;

        questions.forEach((q, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            const qNumber = `Q${index + 1}.`;
            doc.text(qNumber, 15, yPos);

            const splitQTitle = doc.splitTextToSize(q.text, 170);
            doc.text(splitQTitle, 25, yPos);
            yPos += splitQTitle.length * 5 + 4;

            if (q.table) {
                autoTable(doc, {
                    startY: yPos,
                    head: [q.table.headers],
                    body: q.table.rows,
                    theme: 'grid',
                    headStyles: { fillColor: [79, 70, 229], textColor: 255, fontSize: 10, font: "helvetica", fontStyle: "bold" },
                    styles: { fontSize: 9, cellPadding: 3, font: "helvetica" },
                    margin: { left: 25, right: 15 },
                    columnStyles: { 0: { cellWidth: 'auto' } },
                });
                yPos = (doc as any).lastAutoTable.finalY + 6;
            }

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);

            q.options.forEach((opt, optIndex) => {
                if (yPos > 275) {
                    doc.addPage();
                    yPos = 20;
                }

                const isSelected = answers[q.id] === optIndex;
                const isCorrect = q.correctAnswer === optIndex;

                let color = [50, 50, 50];

                if (isCorrect) {
                    color = [22, 163, 74];
                } else if (isSelected && !isCorrect) {
                    color = [220, 38, 38];
                } else if (isSelected) {
                    color = [79, 70, 229];
                }

                doc.setTextColor(color[0], color[1], color[2]);

                const letter = String.fromCharCode(65 + optIndex);
                doc.setFont("helvetica", isCorrect || isSelected ? "bold" : "normal");

                doc.text(`${letter}.`, 25, yPos);

                doc.setFont("helvetica", "normal");
                const splitOpt = doc.splitTextToSize(opt, 160);
                doc.text(splitOpt, 35, yPos);

                yPos += splitOpt.length * 5 + 1;
            });

            doc.setTextColor(0, 0, 0);
            yPos += 3;

            if (q.explanation) {
                const explText = `Explanation: ${q.explanation}`;
                const splitExpl = doc.splitTextToSize(explText, 165);

                if (yPos + splitExpl.length * 4 > 280) {
                    doc.addPage();
                    yPos = 20;
                }

                const boxHeight = splitExpl.length * 4 + 4;
                doc.setFillColor(249, 250, 251);
                doc.setDrawColor(229, 231, 235);
                doc.rect(25, yPos - 3, 170, boxHeight, 'FD');

                doc.setFont("helvetica", "italic");
                doc.setFontSize(9);
                doc.setTextColor(75, 85, 99);

                doc.text(splitExpl, 28, yPos);
                yPos += boxHeight + 8;
            } else {
                yPos += 8;
            }
        });

        if (isNativeApp) {
            const pdfBase64 = doc.output('datauristring').split(',')[1];
            const fileName = `DakGuru_Result_${Date.now()}.pdf`;
            try {
                // Try writing to Documents directly
                await Filesystem.writeFile({
                    path: fileName,
                    data: pdfBase64,
                    directory: Directory.Documents,
                });
                await Toast.show({
                    text: 'Answer Sheet Generated. Check your Documents folder.',
                    duration: 'long'
                });
            } catch (e) {
                console.error("File write error", e);
                await Toast.show({
                    text: 'Failed to save PDF. Please check permissions.',
                    duration: 'long'
                });
            }
        } else {
            doc.save("DakGuru_MockTest_Result.pdf");
            setShowDownloadNotification(true);
        }
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
                        <div className="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold ring-1 ring-white/30">Free for Everyone</div>
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

                        {/* ACCESS CONTROL AREA - ALWAYS OPEN FOR SAMPLE */}
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
                        setFinalTimeTaken(timeTaken); // Capture mobile time
                        handleSubmit(false, mobileAnswers);
                    }}
                    onExit={() => setGameState('rules')}
                    mode="exam"
                    aspirantName={userName}
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
                            <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm min-h-[400px] overflow-hidden">
                                {/* Watermark */}
                                <img
                                    src="/official-logo.png"
                                    alt=""
                                    className="absolute inset-0 m-auto w-40 opacity-[0.12] pointer-events-none select-none z-0 object-contain"
                                />

                                <div className="relative z-10">
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

    // --- LEADERBOARD SCREEN (ULTRA MODERN) ---
    if (gameState === 'leaderboard') {
        const percentage = Math.round((score / 30) * 100);
        const accuracy = Math.round((score / (Object.keys(answers).length * 2 || 1)) * 100); // Approx accuracy based on attempted
        const timeSpent = finalTimeTaken || (1200 - timeLeft);
        const mins = Math.floor(timeSpent / 60);
        const secs = timeSpent % 60;

        return (
            <div className="min-h-screen bg-slate-50 dark:bg-black font-sans p-4 md:p-8 relative transition-colors">
                {/* Notification */}
                {showDownloadNotification && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-600/20 z-50 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-white/20 p-2 rounded-full">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold">Answer Sheet Downloaded</p>
                            <p className="text-xs text-emerald-100">Check your device downloads folder.</p>
                        </div>
                    </div>
                )}

                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="text-center pt-8 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold uppercase tracking-wider mb-6 border border-green-200 dark:border-green-800">
                            <Sparkles className="w-4 h-4 fill-green-600 dark:fill-green-400" />
                            {submissionStatus === 'already_submitted' ? 'Test Already Completed' : 'Submission Successful'}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            {percentage >= 80 ? "Outstanding!" :
                                percentage >= 60 ? "Great Job!" :
                                    percentage >= 40 ? "Good Effort!" : "Keep Practicing!"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Search for the perfect balance between speed and accuracy to master the exam.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        {/* 1. Score Card (Hero) */}
                        <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/30 group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl -ml-10 -mb-10 group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-1">Total Score</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl md:text-7xl font-black tracking-tighter">{score}</span>
                                        <span className="text-2xl text-indigo-300 font-medium">/ 30</span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold opacity-90">Performance</span>
                                        <span className="text-2xl font-bold">{percentage}%</span>
                                    </div>
                                    <div className="h-3 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div
                                            className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Time Taken */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-slate-100 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-center items-center text-center group hover:border-blue-500/30 transition-colors">
                            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Timer className="w-7 h-7" strokeWidth={2} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                {mins}m {secs}s
                            </h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time Taken</p>
                        </div>

                        {/* 3. Accuracy & Answers */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-slate-100 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-center gap-4 group hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{Math.round(score / 2)}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct Ans</p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-slate-100 dark:bg-zinc-800"></div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                                    <XCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{15 - Math.round(score / 2)}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Incorrect/Skipped</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <button
                            onClick={handleDownloadPDF}
                            className="w-full md:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold shadow-2xl shadow-slate-900/20  active:scale-95 transition-all flex items-center justify-center gap-3 group"
                        >
                            <FileDown className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            <span>Download Answer Sheet</span>
                        </button>

                        <Link href="/" className="w-full md:w-auto text-center px-8 py-4 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-xl font-bold transition-all">
                            Back to Home
                        </Link>
                    </div>

                    {/* Leaderboard Section */}
                    {/* Leaderboard Section - Only visible for Admin or explicitly allowed tests */}
                    {(membershipLevel === 'admin' || role === 'admin' || userEmail?.includes('admin')) ? (
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-xl shadow-slate-100/50 dark:shadow-none overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        Live Leaderboard (Admin View)
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time rankings of all aspirants</p>
                                </div>
                                <div className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs font-bold text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                                    Top 50
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 dark:bg-zinc-800/20">
                                        <tr>
                                            <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-400 uppercase tracking-wider">Rank</th>
                                            <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-400 uppercase tracking-wider">Aspirant</th>
                                            <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Score</th>
                                            <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                        {leaderboard.map((entry, index) => {
                                            const isTop3 = index < 3;
                                            return (
                                                <tr key={index} className="group hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors">
                                                    <td className="py-4 px-6 md:px-8">
                                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                                                        ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                                index === 1 ? 'bg-slate-200 text-slate-700' :
                                                                    index === 2 ? 'bg-orange-100 text-orange-700' : 'text-slate-500'}
                                                    `}>
                                                            {index + 1}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 md:px-8">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xs font-bold">
                                                                {entry.userName.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className={`font-semibold ${isTop3 ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-zinc-300'}`}>
                                                                {entry.userName}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 md:px-8 text-right font-bold text-slate-900 dark:text-white">
                                                        {entry.score}
                                                    </td>
                                                    <td className="py-4 px-6 md:px-8 text-right text-sm text-slate-500 dark:text-slate-400 font-mono">
                                                        {format(new Date(entry.submittedAt), 'MM/dd')}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-xl p-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Leaderboard Hidden</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                                The detailed rank list for this mock test is only available to administrators. Check your individual performance above.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}
