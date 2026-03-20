"use client";

import { useState, useEffect, use, useCallback, memo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Loader2, Clock, HelpCircle, CheckCircle2, AlertCircle, History, FileDown, Home, ChevronLeft, ChevronRight, Send, Bookmark, XCircle, Flag, X, Lock as LockIcon, Sparkles, ArrowLeft, LayoutGrid, Timer, Save } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { TEST_QUESTIONS_MAP } from "@/lib/mock-test-data-map";
import { Question } from "@/data/live_mock_data";
import { generateMockTestAnswerSheetPDF } from "@/lib/pdf-generator-mocks";
import { motion, AnimatePresence } from "framer-motion";
import { FULL_SCHEDULE } from "@/data/schedule";
import { format, eachDayOfInterval, addDays } from "date-fns";
import FormattedQuestionText from "@/components/quiz/FormattedQuestionText";


const getTopicsForMock = (saturdayDate: Date): string[] => {
    const mondayDate = addDays(saturdayDate, -5);
    const planMap = new Map();
    FULL_SCHEDULE.forEach(item => {
        planMap.set(item.date, item);
    });

    const weekTopics: string[] = [];
    const interval = eachDayOfInterval({ start: mondayDate, end: saturdayDate });

    interval.forEach(d => {
        const dateStr = format(d, 'dd-MM-yyyy');
        const item = planMap.get(dateStr);

        if (item && item.subTopic && !item.subTopic.toLowerCase().includes("revision") && !item.day.toLowerCase().includes("sunday")) {
            // Remove " – Day X", " - Day X", " (Day X)", etc.
            const cleanTopic = item.subTopic
                .replace(/\s*[–\-\(]*\s*Day\s*\d+\s*(of\s*\d+)?\s*\)*\s*$/gi, '')
                .trim();
            
            if (!weekTopics.includes(cleanTopic)) {
                weekTopics.push(cleanTopic);
            }
        }
    });
    return weekTopics.length > 0 ? weekTopics : ["Introductory/General Topics"];
};

interface LeaderboardEntry {
    _id: string;
    userName: string;
    userEmail: string;
    score: number;
    submittedAt: string;
}

interface TestConfig {
    startDate: Date;
    endDate?: Date;
    title: string;
}

const TEST_CONFIG_MAP: Record<string, TestConfig> = {
    "mock-2026-01-17": {
        startDate: new Date("2026-01-17T00:00:00+05:30"),
        endDate: new Date("2026-01-18T23:59:59+05:30"),
        title: "Weekly Mock Test - 01"
    },
    "mock-2026-01-24": {
        startDate: new Date("2026-01-24T00:00:00+05:30"),
        endDate: new Date("2026-01-25T23:59:59+05:30"),
        title: "Weekly Mock Test - 02"
    },
    "mock-2026-01-31": {
        startDate: new Date("2026-01-31T00:00:00+05:30"),
        endDate: new Date("2026-02-01T23:59:59+05:30"),
        title: "Weekly Mock Test - 03"
    },
    "mock-2026-02-07": {
        startDate: new Date("2026-02-07T00:00:00+05:30"),
        endDate: new Date("2026-02-08T23:59:59+05:30"),
        title: "Weekly Mock Test - 04"
    },
    "mock-2026-02-14": {
        startDate: new Date("2026-02-14T00:00:00+05:30"),
        endDate: new Date("2026-02-15T23:59:59+05:30"),
        title: "Weekly Mock Test - 05"
    },
    "mock-2026-02-21": {
        startDate: new Date("2026-02-21T00:00:00+05:30"),
        endDate: new Date("2026-02-22T23:59:59+05:30"),
        title: "Weekly Mock Test - 06"
    },
    "mock-2026-02-28": {
        startDate: new Date("2026-02-28T00:00:00+05:30"),
        endDate: new Date("2026-03-01T23:59:59+05:30"),
        title: "Weekly Mock Test - 07"
    },
    "mock-2026-03-07": {
        startDate: new Date("2026-03-07T00:00:00+05:30"),
        endDate: new Date("2026-03-08T23:59:59+05:30"),
        title: "Weekly Mock Test - 08"
    },
    "mock-2026-03-14": {
        startDate: new Date("2026-03-14T00:00:00+05:30"),
        endDate: new Date("2026-03-15T23:59:59+05:30"),
        title: "Weekly Mock Test - 09"
    },
    "mock-2026-03-21": {
        startDate: new Date("2026-03-21T00:00:00+05:30"),
        endDate: new Date("2026-03-22T23:59:59+05:30"),
        title: "Weekly Mock Test - 10"
    },
    "mock-2026-03-28": {
        startDate: new Date("2026-03-28T00:00:00+05:30"),
        endDate: new Date("2026-03-29T23:59:59+05:30"),
        title: "Weekly Mock Test - 11"
    },
    "mock-2026-04-04": {
        startDate: new Date("2026-04-04T00:00:00+05:30"),
        endDate: new Date("2026-04-05T23:59:59+05:30"),
        title: "Weekly Mock Test - 12"
    },
    "mock-2026-04-11": {
        startDate: new Date("2026-04-11T00:00:00+05:30"),
        endDate: new Date("2026-04-12T23:59:59+05:30"),
        title: "Weekly Mock Test - 13"
    },
    "mock-2026-04-18": {
        startDate: new Date("2026-04-18T00:00:00+05:30"),
        endDate: new Date("2026-04-19T23:59:59+05:30"),
        title: "Weekly Mock Test - 14"
    },
    "mock-2026-04-25": {
        startDate: new Date("2026-04-25T00:00:00+05:30"),
        endDate: new Date("2026-04-26T23:59:59+05:30"),
        title: "Weekly Mock Test - 15"
    },
    "mock-2026-05-02": {
        startDate: new Date("2026-05-02T00:00:00+05:30"),
        endDate: new Date("2026-05-03T23:59:59+05:30"),
        title: "Weekly Mock Test - 16"
    }
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
                        <div className="relative bg-white dark:bg-zinc-900 p-4 md:p-5 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 mb-3 overflow-hidden">
                            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
                                <h1 className="text-4xl font-black text-black dark:text-white transform -rotate-12">DAK GURU</h1>
                            </div>
                            <div className="relative z-10">
                                <FormattedQuestionText 
                                    text={currentQ.text} 
                                    className="text-[15px] md:text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed font-sans"
                                />
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
                                        className={`relative w-full text-left p-4.5 rounded-2xl border-2 transition-all duration-300 active:scale-[0.98] flex items-start gap-4 ${containerClass}`}
                                    >
                                        <div className="mt-1 shrink-0 transition-all duration-300">
                                            {icon}
                                        </div>
                                        <span className={`text-[15px] md:text-base leading-snug ${textClass}`}>
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
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-90"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {currentQIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex-1 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-sm shadow-xl shadow-zinc-900/10 dark:shadow-none flex items-center justify-center gap-2 transition-all transform active:scale-[0.96] hover:opacity-90"
                            >
                                Finish Assessment <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => { vibrate(15); setCurrentQIndex((prev: number) => prev + 1); }}
                                className="flex-1 h-12 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.96] hover:bg-blue-700"
                            >
                                Next Question <ChevronRight className="w-4 h-4" />
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
                                        className={`h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-black border-2 transition-all active:scale-[0.9] ${getStatusColor(q.id, idx)}`}
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
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isFetchingLeaderboard, setIsFetchingLeaderboard] = useState(false);

    // Live Window Logic
    const testConfig = TEST_CONFIG_MAP[testId];
    const isLiveWindow = testConfig?.startDate && testConfig?.endDate 
        ? (new Date() >= testConfig.startDate && new Date() < testConfig.endDate) 
        : false;
    const canSeeLeaderboard = isAdmin; // Only visible to admin as requested

    // Load Data & Check Access
    useEffect(() => {
        const loadTest = async () => {
            // 1. Get Questions
            // 1. Get Questions
            let data = TEST_QUESTIONS_MAP[testId];

            // Debugging / Fallback for Mock 4
            if (!data && testId === 'mock-2026-02-07') {
                console.warn("Test ID matched but data lookup failed. Attempting direct assignment.");
                // This fallback is now redundant with TEST_QUESTIONS_MAP but kept for safety if map is out of sync
                const { WEEKLY_MOCK_04_QUESTIONS } = await import("@/data/weekly_mock_data_04");
                data = WEEKLY_MOCK_04_QUESTIONS;
            }

            if (!data) {
                console.error(`Test data not found for ID: ${testId}`);
                console.log("Available Test IDs:", Object.keys(TEST_QUESTIONS_MAP));

                // Check if Questions are loaded
                if (testId === 'mock-2026-02-07') {
                    alert("System Error: Mock Test 04 data is not loaded correctly. Please contact support.");
                } else {
                    alert(`Test data not found for ID: "${testId}". Please go back and try again.`);
                }

                router.push("/mock-tests");
                return;
            }
            setQuestions(data);


            // 2. Check User Session
            const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
            let userRole = 'user';
            let userPlan = 'free';
            const userEmail = '';

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
                                if (statusData.hasSubmitted && userRole !== 'admin') {
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
            const config = TEST_CONFIG_MAP[testId];
            const startDate = config ? config.startDate : new Date("2026-01-17T00:00:00+05:30"); // Default Fallback
            const endDate = config?.endDate || new Date(startDate.getTime() + 48 * 60 * 60 * 1000); // Default +48h

            const isStarted = now >= startDate;
            const isEnded = now > endDate;

            if (userRole === 'admin') {
                setIsAuthorized(true); // Admins bypass everything
            } else {
                if (!isStarted) {
                    // Format start date for alert
                    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                    alert(`This test becomes active on ${startDate.toLocaleDateString('en-IN', options)}.`);
                    router.push("/mock-tests");
                    return;
                }

                // BLOCK RE-ATTEMPTS DURING LIVE WINDOW
                if (!isEnded && isReattempt) {
                    alert("Re-attempts are not allowed during the live test period. You can reattempt after the test window closes.");
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

    const fetchLeaderboard = useCallback(async () => {
        setIsFetchingLeaderboard(true);
        try {
            const res = await fetch(`/api/mock-test/live/leaderboard?testId=${testId}&limit=50`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setLeaderboard(data.leaderboard);
            }
        } catch (e) {
            console.error("Failed to fetch leaderboard", e);
        } finally {
            setIsFetchingLeaderboard(false);
        }
    }, [testId]);

    useEffect(() => {
        if (isSubmitted) {
            fetchLeaderboard();
        }
    }, [isSubmitted, fetchLeaderboard]);

    // Auto-update leaderboard for admin every 20 seconds during live schedule
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAdmin && isLiveWindow && isSubmitted) {
            interval = setInterval(() => {
                fetchLeaderboard();
            }, 20000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isAdmin, isLiveWindow, isSubmitted, fetchLeaderboard]);

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

        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        const marks = correctCount * 2;
        setScore(marks);

        // Submit to Server
        // Submit to Server
        if (userEmail && !isReattempt && !isAdmin) { // Skip server submission for reattempts AND Admins
            // I need to move userEmail to state to access it here.
            try {
                await fetch('/api/mock-test/live/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: userEmail,
                        score: marks,
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
        if (isGeneratingPDF) return;
        setIsGeneratingPDF(true);
        const startDate = TEST_CONFIG_MAP[testId]?.startDate;
        const endDate = TEST_CONFIG_MAP[testId]?.endDate;
        const testSchedule = startDate && endDate ? `${format(startDate, 'dd-MMM-yyyy')} to ${format(endDate, 'dd-MMM-yyyy')}` : '';
        const testTopics = startDate ? getTopicsForMock(startDate) : [];

        try {
            await generateMockTestAnswerSheetPDF({
                userName,
                score,
                totalQuestions: questions.length,
                questions: questions as any,
                answers,
                testName: TEST_CONFIG_MAP[testId]?.title || "Weekly Mock Test",
                submittedAt: new Date().toISOString(),
                testSchedule: testSchedule,
                testTopics: testTopics
            });
        } catch (error) {
            console.error("PDF generation failed", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }

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
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 pt-[calc(env(safe-area-inset-top)+20px)] pb-10">
                <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <div className="p-5 md:p-12 space-y-6 md:space-y-8">
                        <div className="text-center space-y-2 md:space-y-4">
                            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                                {TEST_CONFIG_MAP[testId]?.title || "Weekly Mock Test"}
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg">
                                Read the instructions carefully before starting.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2.5 md:p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                                <Clock className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1.5 md:mb-2 text-blue-600" />
                                <div className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100">60 Min</div>
                                <div className="text-[10px] md:text-xs text-zinc-500">Duration</div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2.5 md:p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1.5 md:mb-2 text-purple-600" />
                                <div className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100">{questions.length} Qs</div>
                                <div className="text-[10px] md:text-xs text-zinc-500">Total</div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2.5 md:p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1.5 md:mb-2 text-green-600" />
                                <div className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100">100 Marks</div>
                                <div className="text-[10px] md:text-xs text-zinc-500">Marks</div>
                            </div>
                        </div>

                        <div className="space-y-4 bg-amber-50 dark:bg-amber-900/10 p-4 md:p-6 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 text-sm md:text-base">
                                <AlertCircle className="w-4 h-4 md:w-5 md:h-5" /> Important Rules
                            </h3>
                            <ul className="space-y-3 text-xs md:text-sm text-amber-800 dark:text-amber-300">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    <span>This test can only be attempted <strong>ONCE</strong>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    <span>Do not refresh the page or press the back button during the test.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    <span>The test will auto-submit when the timer reaches zero.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    <span>Once the test starts, you cannot go back without submitting the test.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    <span>Ensure you have a stable internet connection.</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => {
                                vibrate(25);
                                setHasStarted(true);
                            }}
                            className="w-full h-15 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-100 text-white dark:text-zinc-900 rounded-[1.25rem] font-black text-lg shadow-xl shadow-zinc-900/10 dark:shadow-none hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                        >
                            Start Assessment Now <ArrowLeft className="w-5 h-5 rotate-180 transition-transform group-active:translate-x-1" />
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
                                <h1 className="font-bold text-lg leading-tight">{TEST_CONFIG_MAP[testId]?.title || "Weekly Mock Test"}</h1>
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

                                    <FormattedQuestionText 
                                        text={currentQ.text} 
                                        className="text-2xl font-bold leading-relaxed text-zinc-800 dark:text-zinc-100 mb-6"
                                    />

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
                                <h1 className="text-2xl md:text-4xl font-black mb-2 text-zinc-900 dark:text-white">Test Submitted!</h1>
                                <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg mb-8">
                                    You scored <span className="font-bold text-zinc-900 dark:text-white">{score}</span> out of <span className="font-bold text-zinc-900 dark:text-white">{questions.length * 2}</span>
                                </p>

                                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-4 md:p-6 border border-amber-100 dark:border-amber-900/20 max-w-lg mx-auto mb-8">
                                    <p className="font-medium text-sm md:text-base text-amber-800 dark:text-amber-200 flex items-center justify-center gap-2">
                                        <AlertCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                        All India Rank List will be released on Monday.
                                    </p>
                                </div>
                            </div>

                            <div className="max-w-4xl mx-auto space-y-12">
                                {/* Live Leaderboard */}
                                <div className="max-w-2xl mx-auto mb-12 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden">
                                    <div className="p-6 md:p-8 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                                        <div>
                                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                                {isLiveWindow ? "Live Leaderboard" : "Final Leaderboard"}
                                            </h2>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                                {isLiveWindow ? "Real-time ranking during live window" : "Official rankings for this assessment"}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                                Top 50
                                            </div>
                                            {isLiveWindow && isAdmin && (
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Admin View</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto min-h-[200px] flex flex-col justify-center">
                                        {canSeeLeaderboard ? (
                                            <table className="w-full text-left">
                                                <thead className="bg-zinc-50/50 dark:bg-zinc-800/20">
                                                    <tr>
                                                        <th className="py-3 px-4 md:px-8 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider">Rank</th>
                                                        <th className="py-3 px-4 md:px-8 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider">Aspirant</th>
                                                        <th className="py-3 px-4 md:px-8 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Score</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                                    {isFetchingLeaderboard ? (
                                                        <tr>
                                                            <td colSpan={3} className="py-10 text-center text-zinc-400">
                                                                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                                                                Fetching Rankings...
                                                            </td>
                                                        </tr>
                                                    ) : leaderboard.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={3} className="py-10 text-center text-zinc-400 text-sm">No submissions yet. Be the first!</td>
                                                        </tr>
                                                    ) : (
                                                        leaderboard.map((entry, index) => {
                                                            const isCurrentUser = entry.userEmail === userEmail;
                                                            return (
                                                                <tr key={index} className={`group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${isCurrentUser ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
                                                                    <td className="py-3 px-4 md:px-8">
                                                                        <div className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-xs
                                                                        ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                                                index === 1 ? 'bg-zinc-200 text-zinc-700' :
                                                                                    index === 2 ? 'bg-orange-100 text-orange-700' : 'text-zinc-500'}
                                                                    `}>
                                                                            {index + 1}
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-3 px-4 md:px-8">
                                                                        <div className="flex items-center gap-2 md:gap-3">
                                                                            <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                                                                {entry.userName.charAt(0).toUpperCase()}
                                                                            </div>
                                                                            <div className="flex flex-col min-w-0">
                                                                                <span className={`font-semibold text-xs md:text-sm truncate ${index < 3 ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300'}`}>
                                                                                    {entry.userName}
                                                                                    {isCurrentUser && <span className="ml-1 text-[8px] font-bold bg-indigo-600 text-white px-1 py-0.5 rounded uppercase">You</span>}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-3 px-4 md:px-8 text-right font-bold text-zinc-900 dark:text-white text-sm">
                                                                        {entry.score}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="py-12 px-6 text-center space-y-3">
                                                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto text-amber-600">
                                                    <LockIcon className="w-6 h-6" />
                                                </div>
                                                <h3 className="font-bold text-zinc-900 dark:text-white">Leaderboard Restricted</h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                                                    Real-time rankings are currently visible to moderators only. The public leaderboard will be enabled after the test window completes.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {canSeeLeaderboard && (
                                        <div className="p-4 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 text-center">
                                            <button
                                                onClick={() => fetchLeaderboard()}
                                                disabled={isFetchingLeaderboard}
                                                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                                            >
                                                <History className={`w-3.5 h-3.5 ${isFetchingLeaderboard ? 'animate-spin' : ''}`} />
                                                Refresh Rankings
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 px-4 mb-12 w-full">
                                    {(() => {
                                        const config = TEST_CONFIG_MAP[testId];
                                        const startDate = config ? config.startDate : new Date("2026-01-17T00:00:00+05:30");
                                        const now = new Date();
                                        const endDateTime = config?.endDate || new Date(startDate.getTime() + 48 * 60 * 60 * 1000);
                                        const canReattempt = (now > endDateTime) || isAdmin;

                                        if (!canReattempt) return null;

                                        return (
                                            <button
                                                onClick={() => {
                                                    vibrate(15);
                                                    if (confirm("Reattempting will not save your score to the leaderboard. This is for practice only.\n\nContinue?")) {
                                                        window.location.href = `${window.location.pathname}?reattempt=true`;
                                                    }
                                                }}
                                                className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 text-sm md:text-base text-center active:scale-[0.97]"
                                            >
                                                <History className="w-4 h-4" /> Reattempt Test
                                            </button>
                                        );
                                    })()}
                                    <button
                                        onClick={() => { vibrate(10); generatePDF(); }}
                                        disabled={isGeneratingPDF}
                                        className="w-full md:w-auto px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm md:text-base active:scale-[0.97] shadow-xl shadow-zinc-900/5 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isGeneratingPDF ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                                        {isGeneratingPDF ? 'Generating...' : 'Answer Sheet'}
                                    </button>
                                    <Link
                                        href="/"
                                        onClick={() => vibrate(5)}
                                        className="w-full md:w-auto px-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl font-black hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 text-sm md:text-base active:scale-[0.97]"
                                    >
                                        <Home className="w-4 h-4" /> Return to Home
                                    </Link>
                                </div>

                                {isAdmin && (
                                    <div className="mb-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
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
                                                        <FormattedQuestionText 
                                                            text={q.text} 
                                                            className="font-medium text-zinc-900 dark:text-zinc-100 mb-4"
                                                        />
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
                                                            <FormattedQuestionText text={q.explanation || ""} className="text-zinc-700 dark:text-zinc-300 leading-relaxed" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
