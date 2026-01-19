"use client";

import { useState, useEffect, use, useCallback, memo, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertCircle, Timer, Save, FileDown, Flag, ChevronLeft, ChevronRight, X, LayoutGrid, Clock, Bookmark, Send, HelpCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { WEEKLY_MOCK_01_QUESTIONS } from "@/data/weekly_mock_data_01";
import { Question } from "@/data/live_mock_data";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";

// Map IDs to Data
const TEST_DATA_MAP: Record<string, Question[]> = {
    "mock-2026-01-17": WEEKLY_MOCK_01_QUESTIONS
};

interface PageProps {
    params: Promise<{ testId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Optimization: Memoized Mobile Content Component
const MemoizedMobileContent = memo(({
    currentQ,
    currentQIndex,
    questions,
    answers,
    markedForReview,
    isMobilePaletteOpen,
    handleOptionSelect,
    toggleMarkReview,
    setCurrentQIndex,
    handleSubmit,
    setIsMobilePaletteOpen,
    vibrate
}: any) => {

    const getStatusColor = (qId: string, idx: number) => {
        const ans = answers[qId];
        const isMarked = markedForReview.includes(qId);
        const isCurrent = questions[idx].id === currentQ?.id;

        if (isCurrent) return "border-2 border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900";
        if (isMarked) return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800";
        if (ans !== undefined) return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-800";
        return "bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700";
    };

    if (!currentQ) return null;

    return (
        <div className="flex-1 overflow-y-auto pb-32 pt-4 px-4 md:px-0 scroll-smooth bg-[#F8F9FB] dark:bg-zinc-950">
            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="popLayout" custom={currentQIndex}>
                    <motion.div
                        key={currentQIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="relative bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 dark:border-zinc-800 mb-4 overflow-hidden">
                            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                                <h1 className="text-6xl font-black text-black dark:text-white transform -rotate-12">DAK GURU</h1>
                            </div>
                            <div className="relative z-10">
                                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed font-sans whitespace-pre-wrap">
                                    {currentQ.text}
                                </p>
                                {currentQ.table && (
                                    <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                                                <tr>
                                                    {currentQ.table.headers.map((h: any, i: number) => (
                                                        <th key={i} className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                                {currentQ.table.rows.map((row: any, i: number) => (
                                                    <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                                        {row.map((cell: any, j: number) => (
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

                        <div className="space-y-2.5">
                            {currentQ.options.map((option: string, idx: number) => {
                                const isSelected = answers[currentQ.id] === idx;
                                let containerClass = "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800";
                                let textClass = "text-zinc-700 dark:text-zinc-300";
                                let icon = <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600"></div>;

                                if (isSelected) {
                                    containerClass = "border-blue-600 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-100 dark:ring-blue-900";
                                    textClass = "text-blue-700 dark:text-blue-300 font-bold";
                                    icon = <div className="w-4 h-4 rounded-full border-[5px] border-blue-600"></div>;
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(idx)}
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
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Actions Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-100 dark:border-zinc-800 p-3 pb-[max(12px,env(safe-area-inset-bottom))] z-[110]">
                <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
                    <button
                        onClick={toggleMarkReview}
                        className={`flex flex-col items-center gap-1 min-w-[56px] transition-colors ${markedForReview.includes(currentQ.id) ? "text-purple-600" : "text-zinc-400 hover:text-zinc-600"}`}
                    >
                        <Bookmark className={`w-5 h-5 ${markedForReview.includes(currentQ.id) ? "fill-current" : "stroke-current"}`} strokeWidth={2} />
                        <span className="text-[10px] font-bold">Review</span>
                    </button>

                    <div className="flex flex-1 items-center gap-3 justify-end">
                        <button
                            onClick={() => { vibrate(10); setCurrentQIndex((prev: number) => Math.max(0, prev - 1)); }}
                            disabled={currentQIndex === 0}
                            className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {currentQIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-6 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                            >
                                Submit Test <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => { vibrate(10); setCurrentQIndex((prev: number) => prev + 1); }}
                                className="flex-1 px-6 h-12 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-blue-700"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Palette Drawer */}
            <AnimatePresence>
                {isMobilePaletteOpen && (
                    <div className="fixed inset-0 z-[120] flex items-end justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsMobilePaletteOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-t-[2.5rem] p-6 shadow-2xl max-h-[85vh] flex flex-col z-50 pb-[env(safe-area-inset-bottom)]"
                        >
                            <div className="flex items-center justify-center mb-6 relative">
                                <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-2 absolute -top-3"></div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Question Palette</h3>
                                <button onClick={() => setIsMobilePaletteOpen(false)} className="absolute right-0 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-full text-zinc-500">
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-5 gap-3 overflow-y-auto p-1 pb-20 custom-scrollbar">
                                {questions.map((q: any, idx: number) => (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            vibrate(5);
                                            setCurrentQIndex(idx);
                                            setIsMobilePaletteOpen(false);
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
        </div>
    );
});

export default function WeeklyMockTestRunner({ params, searchParams }: PageProps) {
    // Unwrap params using React.use()
    const { testId } = use(params);
    const query = use(searchParams);
    const isReattempt = query?.reattempt === 'true';
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
    const [userEmail, setUserEmail] = useState("");

    // UI State for Mobile Palette
    const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

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
                    const email = session.email || '';
                    if (email) setUserEmail(email);
                    if (session.name) setUserName(session.name);

                    // Check for previous submission (Skip if reattempting)
                    if (email && !isReattempt) {
                        try {
                            const statusRes = await fetch('/api/mock-test/live/status', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: email, testId })
                            });

                            if (statusRes.ok) {
                                const statusData = await statusRes.json();
                                if (statusData.hasSubmitted) {
                                    setIsSubmitted(true);
                                    setScore(statusData.score);
                                    // We can optionally fetch answers if we want to show them
                                }
                            }
                        } catch (e) {
                            console.error("Failed to check submission status", e);
                        }
                    }

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

    // OPTIMIZED Timer Logic - prevents constant re-subscriptions
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isLoading && isAuthorized && !isSubmitted && hasStarted) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isLoading, isAuthorized, isSubmitted, hasStarted]); // Removed timeLeft

    // Handle Time up
    useEffect(() => {
        if (timeLeft === 0 && !isSubmitted && !isLoading && isAuthorized) {
            handleSubmit();
        }
    }, [timeLeft, isSubmitted, isLoading, isAuthorized]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const vibrate = useCallback((ms: number = 10) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(ms);
        }
    }, []);

    const handleOptionSelect = useCallback((idx: number) => {
        if (isSubmitted) return;
        vibrate(10);
        setAnswers(prev => {
            if (questions.length === 0) return prev;
            // We use state functional update so we just need access to questions/index
            // But we don't have access to currentQIndex inside here unless we add it to dep array of callback
            // So we rely on currentQIndex being a dependency of this callback
            // The questions array is stable after load.
            const currentQ = questions[currentQIndex]; // This closure will update when currentQIndex changes
            if (!currentQ) return prev;
            return { ...prev, [currentQ.id]: idx };
        });
    }, [isSubmitted, currentQIndex, questions, vibrate]);

    const toggleMarkReview = useCallback(() => {
        vibrate(10);
        setMarkedForReview(prev => {
            const currentQ = questions[currentQIndex];
            if (!currentQ) return prev;
            return prev.includes(currentQ.id) ? prev.filter(id => id !== currentQ.id) : [...prev, currentQ.id];
        });
    }, [currentQIndex, questions, vibrate]);

    const handleSubmit = useCallback(async () => {
        if (timeLeft > 0 && !confirm("Are you sure you want to submit the test?")) return;
        vibrate(30);

        let newScore = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);

        // Submit to Server
        if (userEmail && !isReattempt) { // Skip server submission for reattempts 
            // I need to move userEmail to state to access it here.
            try {
                await fetch('/api/mock-test/live/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: userEmail,
                        score: newScore,
                        totalQuestions: questions.length,
                        answers: answers,
                        testId: testId
                    })
                });
            } catch (e) {
                console.error("Failed to save results", e);
                alert("Failed to save result. Please check connection.");
            }
        }

        setIsSubmitted(true);
        window.scrollTo(0, 0);
    }, [timeLeft, questions, answers, vibrate, userEmail, testId]);

    // Refs for stable access inside event listeners
    const handleSubmitRef = useRef(handleSubmit);
    useEffect(() => {
        handleSubmitRef.current = handleSubmit;
    }, [handleSubmit]);

    // Prevent Back Navigation & Refresh
    useEffect(() => {
        if (isSubmitted || isLoading || !isAuthorized || !hasStarted) return;

        // Push state to trap back button
        window.history.pushState(null, '', window.location.href);

        const handlePopState = (event: PopStateEvent) => {
            // "Do you want to end the test?"
            if (window.confirm("Do you want to end the test? Click OK to Submit, Cancel to Continue.")) {
                // Yes -> Submit
                if (handleSubmitRef.current) {
                    handleSubmitRef.current();
                }
            } else {
                // No -> Stay (Restore "Forward" state)
                window.history.pushState(null, '', window.location.href);
            }
        };

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ''; // Trigger browser's standard "Leave site?" dialog
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSubmitted, isLoading, isAuthorized, hasStarted]);

    const generatePDF = async () => {
        const doc = new jsPDF();

        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 14;
        const contentWidth = 180;

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

        const addWatermark = () => {
            if (logoData) {
                const wmWidth = 100;
                const wmHeight = 100;
                const wmX = (pageWidth - wmWidth) / 2;
                const wmY = (pageHeight - wmHeight) / 2;
                try {
                    if ((doc as any).GState) {
                        doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
                        doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight);
                        doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
                    }
                } catch (e) {
                    console.warn("Watermark opacity failed", e);
                }
            }
        };

        const boxHeight = 45;
        const boxWidth = pageWidth - (margin * 2);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.rect(margin, 15, boxWidth, boxHeight);

        const logoSize = 35;
        if (logoData) {
            doc.addImage(logoData, 'PNG', margin + 5, 20, logoSize, logoSize);
        }

        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 128);
        doc.text("DAK GURU", margin + logoSize + 15, 28);

        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text("Weekly Mock Test – 01", margin + logoSize + 15, 36);

        doc.setDrawColor(230, 230, 230);
        doc.line(margin + logoSize + 10, 42, margin + boxWidth - 5, 42);

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text("Candidate Name:", margin + logoSize + 15, 52);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(userName, margin + logoSize + 50, 52);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text("Date:", margin + logoSize + 110, 52);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        const today = new Date();
        const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
        doc.text(dateStr, margin + logoSize + 122, 52);

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

        addWatermark();

        let yPos = 75;

        questions.forEach((q, index) => {
            if (yPos > pageHeight - 40) {
                doc.addPage();
                addWatermark();
                yPos = 20;
            }

            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);
            const qTitle = `Q${index + 1}. ${q.text}`;
            const splitTitle = doc.splitTextToSize(qTitle, contentWidth);
            doc.text(splitTitle, margin, yPos);
            yPos += splitTitle.length * 5 + 4;

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

            doc.setFontSize(10);
            q.options.forEach((opt, optIndex) => {
                const isCorrect = optIndex === q.correctAnswer;
                const isSelected = answers[q.id] === optIndex;
                let optLabel = "";
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);

                if (isCorrect) {
                    doc.setTextColor(0, 100, 0);
                    doc.setFont("helvetica", "bold");
                    optLabel = " (Correct Answer)";
                } else if (isSelected && !isCorrect) {
                    doc.setTextColor(220, 38, 38);
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

            if (q.explanation) {
                doc.setTextColor(0, 0, 0);
                doc.setFont("helvetica", "bold");
                doc.text("Explanation:", margin, yPos);
                yPos += 5;

                doc.setFont("helvetica", "normal");
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

    if (!isAuthorized) return null;

    if (!hasStarted && !isSubmitted) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <div className="p-8 md:p-12 space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                                Weekly Mock Test - 01
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                                Read the instructions carefully before starting.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                <div className="font-bold text-zinc-900 dark:text-zinc-100">60 Min</div>
                                <div className="text-xs text-zinc-500">Duration</div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                                <HelpCircle className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                                <div className="font-bold text-zinc-900 dark:text-zinc-100">{questions.length} Qs</div>
                                <div className="text-xs text-zinc-500">questions</div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                                <div className="font-bold text-zinc-900 dark:text-zinc-100">100 Marks</div>
                                <div className="text-xs text-zinc-500">Total Score</div>
                            </div>
                        </div>

                        <div className="space-y-4 bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" /> Important Rules
                            </h3>
                            <ul className="space-y-3 text-sm text-amber-800 dark:text-amber-300">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    This test can only be attempted <strong>ONCE</strong>.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    Do not refresh the page or press the back button during the test.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    The test will auto-submit when the timer reaches zero.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    Once the test starts, you cannot go back without submitting the test.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    Ensure you have a stable internet connection.
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => {
                                vibrate(20);
                                setHasStarted(true);
                            }}
                            className="w-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-200 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            Start Test Now <ArrowLeft className="w-5 h-5 rotate-180" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQIndex];

    const getStatusColor = (qId: string, idx: number) => {
        const ans = answers[qId];
        const isMarked = markedForReview.includes(qId);
        const isCurrent = questions[idx].id === currentQ.id;

        if (isCurrent) return "border-2 border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900";
        if (isMarked) return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800";
        if (ans !== undefined) return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-800";
        return "bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700";
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-purple-500/30">
            {/* RENDER MOBILE VIEW IF NOT SUBMITTED */}
            {!isSubmitted && (
                <div className="fixed inset-0 z-[100] bg-[#F8F9FB] dark:bg-black flex flex-col font-sans lg:hidden">
                    {/* Header */}
                    <div className="min-h-[3.5rem] py-2 px-4 flex items-center justify-between bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-20 pt-[env(safe-area-inset-top)]">
                        <div className="flex items-center gap-3">
                            <Link href="/mock-tests" className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
                                <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
                            </Link>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none mb-0.5">
                                    {userName}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 tracking-tight leading-none">
                                        DAK GURU
                                    </span>
                                    <span className="w-0.5 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full"></span>
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 leading-none">
                                        Q {currentQIndex + 1} <span className="text-zinc-400 font-medium text-xs">/ {questions.length}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'}`}>
                                <Clock className="w-3.5 h-3.5" />
                                {formatTime(timeLeft)}
                            </div>
                            <button onClick={() => setIsMobilePaletteOpen(true)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Memoized Mobile Content */}
                    <MemoizedMobileContent
                        currentQ={currentQ}
                        currentQIndex={currentQIndex}
                        questions={questions}
                        answers={answers}
                        markedForReview={markedForReview}
                        isMobilePaletteOpen={isMobilePaletteOpen}
                        handleOptionSelect={handleOptionSelect}
                        toggleMarkReview={toggleMarkReview}
                        setCurrentQIndex={setCurrentQIndex}
                        handleSubmit={handleSubmit}
                        setIsMobilePaletteOpen={setIsMobilePaletteOpen}
                        vibrate={vibrate}
                    />
                </div>
            )}

            {/* DESKTOP VIEW (Hidden on Mobile UNLESS Submitted) */}
            <div className={isSubmitted ? "w-full" : "hidden lg:block pb-20"}>
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/mock-tests" className="p-2 -ml-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors active:scale-95">
                                <ArrowLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                            </Link>
                            <div>
                                <h1 className="font-bold text-lg leading-tight">Weekly Mock Test – 01</h1>
                            </div>
                        </div>

                        {!isSubmitted && (
                            <div className="flex items-center gap-3">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono font-bold text-lg transition-colors
                                ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30 animate-pulse'
                                        : 'bg-zinc-100/50 text-zinc-700 border-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-300 dark:border-zinc-700'
                                    }`}>
                                    <Timer className="w-5 h-5" />
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <main className={`max-w-7xl mx-auto px-4 py-8`}>
                    {!isSubmitted ? (
                        <div className="grid grid-cols-12 gap-8">
                            {/* Question Area */}
                            <div className="col-span-8 space-y-6">
                                {/* Progress Bar */}
                                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-600 transition-all duration-300 ease-out rounded-full"
                                        style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                                    />
                                </div>

                                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200/60 dark:border-zinc-800 shadow-sm min-h-[50vh] flex flex-col">
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

                                    <h2 className="text-2xl font-bold leading-relaxed text-zinc-800 dark:text-zinc-100 mb-6 whitespace-pre-wrap">
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
                                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group active:scale-[0.99]
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
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                                        disabled={currentQIndex === 0}
                                        className="flex-1 py-4 rounded-xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <ChevronLeft className="w-5 h-5" /> Previous
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (currentQIndex < questions.length - 1) {
                                                setCurrentQIndex(prev => prev + 1);
                                            } else {
                                                handleSubmit();
                                            }
                                        }}
                                        className={`flex-[2] py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95
                                        ${currentQIndex === questions.length - 1
                                                ? 'bg-green-600 hover:bg-green-700 shadow-green-500/20'
                                                : 'bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:opacity-90 shadow-zinc-500/10'}`}
                                    >
                                        {currentQIndex === questions.length - 1 ? 'Submit Test' : 'Next Question'}
                                        {currentQIndex !== questions.length - 1 && <ChevronRight className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Question Palette (Desktop) */}
                            <div className="col-span-4 space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Question Palette</h3>
                                        <span className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">{questions.length} Questions</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2.5 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                        {questions.map((q, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentQIndex(idx)}
                                                className={`aspect-square rounded-xl text-sm transition-all hover:scale-110 active:scale-95 border ${getStatusColor(q.id, idx)}`}
                                            >
                                                {idx + 1}
                                            </button>
                                        ))}
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
                        // Results View - Shared
                        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 py-12">
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
                                                <Flag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                Admin Controls
                                            </h3>
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

                            <div className="space-y-6 px-4">
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
        </div>
    );
}
