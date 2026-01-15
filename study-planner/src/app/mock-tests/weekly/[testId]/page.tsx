"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertCircle, Timer, Save, FileDown, Lock, Flag, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { WEEKLY_MOCK_01_QUESTIONS } from "@/data/weekly_mock_data_01";
import { Question } from "@/data/live_mock_data";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Map IDs to Data
const TEST_DATA_MAP: Record<string, Question[]> = {
    "mock-2026-01-17": WEEKLY_MOCK_01_QUESTIONS
};

interface PageProps {
    params: Promise<{ testId: string }>;
}

export default function WeeklyMockTestRunner({ params }: PageProps) {
    // Unwrap params using React.use()
    const { testId } = use(params);
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [markedForReview, setMarkedForReview] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // User State
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 mins
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState("Aspirant");

    // Load Data & Check Access
    useEffect(() => {
        const loadTest = async () => {
            // 1. Get Questions
            const data = TEST_DATA_MAP[testId];
            if (!data) {
                alert("Test data not found!");
                router.push("/mock-tests");
                return;
            }
            setQuestions(data);

            // 2. Check User Session
            const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
            let userRole = 'user';
            let userPlan = 'free';
            let userEmail = '';

            if (cookie) {
                try {
                    const session = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
                    userRole = session.role || 'user';
                    userPlan = session.membershipLevel || 'free';
                    userEmail = session.email || '';
                    if (session.name) setUserName(session.name);
                } catch (e) {
                    console.error("Session error", e);
                }
            }

            setIsAdmin(userRole === 'admin');

            // 3. Authorization Logic
            const paidTests = localStorage.getItem('paid_mock_tests')?.split(',') || [];
            const hasPaid = paidTests.includes(testId);
            const isPlanEligible = userPlan === 'gold' || userPlan === 'silver';

            // 4. Date Check
            const now = new Date();
            const startDate = new Date("2026-01-17T00:00:00+05:30"); // IST
            const isStarted = now >= startDate;

            if (userRole === 'admin') {
                setIsAuthorized(true); // Admins bypass everything
            } else {
                if (!isStarted) {
                    alert("This test becomes active on Jan 17, 2026, 00:00 AM.");
                    router.push("/mock-tests");
                    return;
                }
                if (isPlanEligible || hasPaid) {
                    setIsAuthorized(true);
                } else {
                    alert("You need to Upgrade to Gold/Silver or Buy this test to attempt.");
                    router.push("/mock-tests"); // Or show paywall
                    return;
                }
            }

            setIsLoading(false);
        };

        loadTest();
    }, [testId, router]);

    // Timer Logic
    useEffect(() => {
        if (!isLoading && isAuthorized && !isSubmitted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isLoading, isAuthorized, isSubmitted, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (idx: number) => {
        if (isSubmitted) return;
        const qId = questions[currentQIndex].id;
        setAnswers(prev => ({ ...prev, [qId]: idx }));
    };

    const toggleMarkReview = () => {
        const qId = questions[currentQIndex].id;
        setMarkedForReview(prev =>
            prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
        );
    };

    const handleSubmit = () => {
        if (!confirm("Are you sure you want to submit the test?")) return;

        let newScore = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    };

    const generatePDF = async () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 14;
        const contentWidth = 180;

        // Load Logo Logic
        const logoUrl = '/dak-guru-new-logo.png';
        let logoData = "";
        try {
            logoData = await new Promise((resolve, reject) => {
                const img = new Image();
                img.src = logoUrl;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    } else {
                        reject("Canvas context failed");
                    }
                };
                img.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.error("Logo load failed", e);
        }

        // Helper to add watermark
        const addWatermark = () => {
            if (logoData) {
                // Background Image Centered
                const wmWidth = 100;
                const wmHeight = 100;
                const wmX = (pageWidth - wmWidth) / 2;
                const wmY = (pageHeight - wmHeight) / 2;

                try {
                    // Attempt to set opacity for watermark (requires compatible jsPDF)
                    // If GState is available on doc (typings vary), use it.
                    // We cast to any to bypass strict type check for GState if needed in this context
                    if ((doc as any).GState) {
                        doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
                        doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight);
                        doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
                    } else {
                        // Fallback: just add it behind content if possible, or skip opacity
                        // Without opacity it might be distracting, so we skip if GState missing
                    }
                } catch (e) {
                    console.warn("Watermark opacity failed", e);
                }
            }
        };

        // Header Layout
        const boxHeight = 45;
        const boxWidth = pageWidth - (margin * 2);

        // 1. Main Header Box Border
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.rect(margin, 15, boxWidth, boxHeight); // Outer box

        // 2. Logo Section (Left)
        const logoSize = 35;
        if (logoData) {
            doc.addImage(logoData, 'PNG', margin + 5, 20, logoSize, logoSize);
        }

        // 3. Title Section (Top Center/Right)
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 128); // Navy Blue
        doc.text("DAK GURU", margin + logoSize + 15, 28);

        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text("Weekly Mock Test – 01", margin + logoSize + 15, 36);

        // 4. Metadata Grid (Right Side / Bottom of Header)
        // Draw a horizontal line separating title from details
        doc.setDrawColor(230, 230, 230);
        doc.line(margin + logoSize + 10, 42, margin + boxWidth - 5, 42);

        // Details Column 1
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text("Candidate Name:", margin + logoSize + 15, 52);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(userName, margin + logoSize + 50, 52);

        // Details Column 2
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text("Date:", margin + logoSize + 110, 52);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        const today = new Date();
        const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
        doc.text(dateStr, margin + logoSize + 122, 52);

        // Score Badge (Top Right Corner inside box)
        const percentage = ((score / questions.length) * 100).toFixed(1);
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(pageWidth - margin - 45, 20, 40, 18, 2, 2, 'F');

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(220, 38, 38);
        doc.text(`${score} / ${questions.length}`, pageWidth - margin - 25, 28, { align: "center" });

        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(`Score (${percentage}%)`, pageWidth - margin - 25, 34, { align: "center" });

        addWatermark(); // Watermark for first page

        let yPos = 75; // Start content below the header box

        questions.forEach((q, index) => {
            if (yPos > pageHeight - 40) {
                doc.addPage();
                addWatermark(); // Watermark on new pages
                yPos = 20;
            }

            // Question Text
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);
            const qTitle = `Q${index + 1}. ${q.text}`;
            const splitTitle = doc.splitTextToSize(qTitle, contentWidth);
            doc.text(splitTitle, margin, yPos);
            yPos += splitTitle.length * 5 + 4;

            // Render Table content if exists
            if (q.table) {
                if (yPos > pageHeight - 60) {
                    doc.addPage();
                    addWatermark();
                    yPos = 20;
                }
                autoTable(doc, {
                    startY: yPos,
                    head: [q.table.headers],
                    body: q.table.rows,
                    theme: 'grid',
                    headStyles: { fillColor: [50, 50, 50] },
                    styles: { fontSize: 9, cellPadding: 2 },
                    margin: { left: margin },
                    tableWidth: contentWidth
                });
                yPos = (doc as any).lastAutoTable.finalY + 8;
            }

            // Options
            doc.setFontSize(10);
            q.options.forEach((opt, optIndex) => {
                const isCorrect = optIndex === q.correctAnswer;
                const isSelected = answers[q.id] === optIndex;

                let optLabel = "";
                // Default style
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);

                if (isCorrect) {
                    doc.setTextColor(0, 100, 0); // Dark Green
                    doc.setFont("helvetica", "bold"); // Bold for correct
                    optLabel = " (Correct Answer)";
                } else if (isSelected && !isCorrect) {
                    doc.setTextColor(220, 38, 38); // Red
                    optLabel = " (Your Answer)";
                }

                if (isSelected && isCorrect) optLabel = " (Your & Correct Answer)";

                const optText = `${String.fromCharCode(65 + optIndex)}. ${opt}${optLabel}`;
                const splitOpt = doc.splitTextToSize(optText, contentWidth - 5);

                if (yPos + splitOpt.length * 5 > pageHeight - 20) {
                    doc.addPage();
                    addWatermark();
                    yPos = 20;
                }

                doc.text(splitOpt, margin + 5, yPos);
                yPos += splitOpt.length * 5 + 1;
            });

            yPos += 4;

            // Explanation
            if (q.explanation) {
                doc.setTextColor(0, 0, 0); // Black
                doc.setFont("helvetica", "bold");
                doc.text("Explanation:", margin, yPos);
                yPos += 5;

                doc.setFont("helvetica", "normal");
                // Remove asterisks
                const cleanExplanation = q.explanation.replace(/\*/g, '');

                const splitExpl = doc.splitTextToSize(cleanExplanation, contentWidth);

                if (yPos + splitExpl.length * 5 > pageHeight - 20) {
                    doc.addPage();
                    addWatermark();
                    doc.text("Explanation (contd):", margin, 20);
                    yPos = 25;
                }

                doc.text(splitExpl, margin, yPos);
                yPos += splitExpl.length * 5 + 10;
            }

            // Separator line
            doc.setDrawColor(240, 240, 240);
            doc.line(margin, yPos - 5, margin + contentWidth, yPos - 5);
        });

        doc.save(`Dak_Guru_Weekly_Test_01_${userName.replace(/\s+/g, '_')}.pdf`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="animate-pulse text-zinc-500">Loading Test Environment...</div>
            </div>
        );
    }

    if (!isAuthorized) return null; // Should have redirected

    const currentQ = questions[currentQIndex];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-purple-500/30 pb-20 md:pb-0">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/mock-tests" className="p-2 -ml-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors active:scale-95">
                            <ArrowLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                        </Link>
                        <div>
                            <h1 className="font-bold text-lg leading-tight md:block hidden">Weekly Mock Test – 01</h1>
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 md:hidden block">Weekly Test 01</span>
                        </div>
                    </div>

                    {!isSubmitted && (
                        <div className="flex items-center gap-3">
                            {/* Mobile Palette Toggle */}
                            <button
                                onClick={() => setMarkedForReview(prev => prev)} // Placeholder for palette toggle if needed, or just rely on bottom nav
                                className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
                            >
                                {/* We can add a grid icon here later for palette toggle */}
                            </button>

                            <div className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border font-mono font-bold text-base md:text-lg transition-colors
                                ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30 animate-pulse'
                                    : 'bg-zinc-100/50 text-zinc-700 border-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-300 dark:border-zinc-700'
                                }`}>
                                <Timer className="w-4 h-4 md:w-5 md:h-5" />
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className={`max-w-7xl mx-auto px-4 py-6 md:py-8 ${!isSubmitted ? 'pb-32 md:pb-8' : ''} transition-all`}>
                {!isSubmitted ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Question Area */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Progress Bar */}
                            <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-purple-600 transition-all duration-300 ease-out rounded-full"
                                    style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                                />
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 md:p-8 border border-zinc-200/60 dark:border-zinc-800 shadow-sm min-h-[50vh] flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                                        Question {currentQIndex + 1} / {questions.length}
                                    </span>
                                    <button
                                        onClick={toggleMarkReview}
                                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all active:scale-95 ${markedForReview.includes(currentQ.id) ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800' : 'text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                    >
                                        <Flag className={`w-3.5 h-3.5 ${markedForReview.includes(currentQ.id) ? 'fill-current' : ''}`} />
                                        {markedForReview.includes(currentQ.id) ? 'Marked' : 'Review'}
                                    </button>
                                </div>

                                <h2 className="text-lg md:text-2xl font-bold leading-relaxed text-zinc-800 dark:text-zinc-100 mb-6 whitespace-pre-wrap">
                                    {currentQ.text}
                                </h2>

                                {currentQ.table && (
                                    <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                                        <table className="w-full text-left text-sm border-collapse min-w-[300px]">
                                            <thead>
                                                <tr className="bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700">
                                                    {currentQ.table.headers.map((h, i) => (
                                                        <th key={i} className="px-4 py-3 font-bold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                                {currentQ.table.rows.map((row, rIdx) => (
                                                    <tr key={rIdx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                                        {row.map((cell, cIdx) => (
                                                            <td key={cIdx} className="px-4 py-3 text-zinc-600 dark:text-zinc-300 border-x border-transparent">{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="space-y-3 mt-auto pt-4">
                                    {currentQ.options.map((option, idx) => {
                                        const isSelected = answers[currentQ.id] === idx;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionSelect(idx)}
                                                className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group active:scale-[0.99]
                                                    ${isSelected
                                                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100 shadow-sm'
                                                        : 'border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                                    }
                                                `}
                                            >
                                                <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                                    ${isSelected ? 'border-purple-600 bg-purple-600' : 'border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400'}
                                                `}>
                                                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />}
                                                </div>
                                                <span className="font-medium text-base leading-relaxed">{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile Fixed Bottom Navigation */}
                            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 lg:static lg:bg-transparent lg:border-none lg:p-0 z-40 flex items-center justify-between gap-3 safe-area-bottom">
                                <div className="w-full flex gap-3 max-w-7xl mx-auto">
                                    <button
                                        onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                                        disabled={currentQIndex === 0}
                                        className="flex-1 py-3.5 rounded-2xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <ChevronLeft className="w-5 h-5" /> Back
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (currentQIndex < questions.length - 1) {
                                                setCurrentQIndex(prev => prev + 1);
                                            } else {
                                                handleSubmit();
                                            }
                                        }}
                                        className={`flex-1 py-3.5 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95
                                        ${currentQIndex === questions.length - 1
                                                ? 'bg-green-600 hover:bg-green-700 shadow-green-500/20'
                                                : 'bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:opacity-90 shadow-zinc-500/10'}`}
                                    >
                                        {currentQIndex === questions.length - 1 ? 'Submit' : 'Next'}
                                        {currentQIndex !== questions.length - 1 && <ChevronRight className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Question Palette (Desktop) */}
                        <div className="hidden lg:block lg:col-span-4 space-y-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Question Palette</h3>
                                    <span className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">{questions.length} Questions</span>
                                </div>
                                <div className="grid grid-cols-5 gap-2.5 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                    {questions.map((q, idx) => {
                                        const isAnswered = answers[q.id] !== undefined;
                                        const isMarked = markedForReview.includes(q.id);
                                        const isCurrent = idx === currentQIndex;

                                        let bgClass = "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 border-zinc-100 dark:border-zinc-800";
                                        if (isAnswered) bgClass = "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 font-bold";
                                        if (isMarked) bgClass = "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 font-bold";
                                        if (isCurrent) bgClass = "ring-2 ring-purple-600 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 z-10 " + bgClass;

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentQIndex(idx)}
                                                className={`aspect-square rounded-xl text-sm transition-all hover:scale-110 active:scale-95 border ${bgClass}`}
                                            >
                                                {idx + 1}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-y-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Answered
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Review
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div> Unvisited
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-green-500/20 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-5 h-5" /> Submit Assessment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Results View
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="text-center pt-8 pb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black mb-4 text-zinc-900 dark:text-white">Test Submitted!</h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8">
                                You scored <span className="font-bold text-zinc-900 dark:text-white">{score}</span> out of <span className="font-bold text-zinc-900 dark:text-white">{questions.length}</span>
                            </p>

                            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/20 max-w-lg mx-auto mb-8">
                                <p className="font-medium text-amber-800 dark:text-amber-200 flex items-center justify-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Rank List will be released on Monday.
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={generatePDF}
                                    className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2"
                                >
                                    <FileDown className="w-4 h-4" /> Download Result PDF
                                </button>
                                <Link
                                    href="/mock-tests"
                                    className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                                >
                                    Gear Up for Next Week
                                </Link>
                            </div>

                            {isAdmin && (
                                <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/20 text-center">
                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                                            <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                                                <Flag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            Admin Controls
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">
                                            Access candidate marks, analyze performance, and validate results.
                                        </p>
                                        <Link
                                            href={`/admin/results/${testId}`}
                                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all inline-flex items-center gap-2 shadow-lg shadow-blue-500/20"
                                        >
                                            View Rank List & Analytics
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Detailed Analysis */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white px-1">Detailed Answer Key</h2>

                            {questions.map((q, idx) => {
                                const userAnsIdx = answers[q.id];
                                const isCorrect = userAnsIdx === q.correctAnswer;
                                const isSkipped = userAnsIdx === undefined;

                                return (
                                    <div key={q.id} className={`rounded-2xl p-6 border-2 ${isCorrect ? 'border-green-100 dark:border-green-900/20 bg-green-50/50 dark:bg-green-900/5' : isSkipped ? 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900' : 'border-red-100 dark:border-red-900/20 bg-red-50/50 dark:bg-red-900/5'}`}>
                                        <div className="flex gap-3 mb-4">
                                            <span className="font-bold text-zinc-400">Q{idx + 1}.</span>
                                            <div className="flex-1">
                                                <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-4 whitespace-pre-wrap">{q.text}</p>

                                                {q.table && (
                                                    <div className="my-4 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                                                        <table className="w-full text-left text-sm border-collapse">
                                                            <thead>
                                                                <tr className="bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700">
                                                                    {q.table.headers.map((h, i) => (
                                                                        <th key={i} className="px-4 py-2 font-bold text-zinc-700 dark:text-zinc-300">{h}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                                                {q.table.rows.map((row, rIdx) => (
                                                                    <tr key={rIdx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                                                                        {row.map((cell, cIdx) => (
                                                                            <td key={cIdx} className="px-4 py-2 text-zinc-600 dark:text-zinc-300">{cell}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                                    {q.options.map((opt, oIdx) => (
                                                        <div key={oIdx} className={`p-3 rounded-lg text-sm font-medium flex items-center justify-between
                                                            ${oIdx === q.correctAnswer ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 ring-1 ring-green-500/50' :
                                                                oIdx === userAnsIdx ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 ring-1 ring-red-500/50' :
                                                                    'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500'}
                                                        `}>
                                                            <span>{opt}</span>
                                                            {oIdx === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />}
                                                            {oIdx === userAnsIdx && oIdx !== q.correctAnswer && <X className="w-4 h-4 text-red-600 dark:text-red-400" />}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-xl p-4 text-sm mt-4">
                                                    <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Explanation:</span>
                                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">{q.explanation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
