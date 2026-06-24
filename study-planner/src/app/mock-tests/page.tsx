"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Trophy, Users, PlayCircle, Play, AlertCircle, CheckCircle2, Timer, Lock, X, Info, Sparkles, Loader2, ChevronRight, History } from "lucide-react";
import { FULL_SCHEDULE } from "@/data/schedule";
import { PSGB_MOCK_SCHEDULE } from "@/data/psgbMockSchedule";
import { SERIES_II_MOCK_SCHEDULE } from "@/data/seriesIIMockSchedule";
import { getDisplayMembership } from "@/lib/membership-utils";
import { format, isBefore, isSameDay, addDays, startOfToday, eachDayOfInterval, endOfDay } from "date-fns";
import { useMemo, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { useCourse } from "@/contexts/CourseContext";
import Script from "next/script";
import { generateMockTestAnswerSheetPDF } from "@/lib/pdf-generator-mocks";
import { TEST_QUESTIONS_MAP } from "@/lib/mock-test-data-map";
import { FileDown } from "lucide-react";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import HomeHeader from "@/components/HomeHeader";


// Mock Test Interface
interface MockTest {
    id: string;
    title: string;
    topics: string[];
    startDate: Date; // Saturday
    endDate: Date;   // Sunday
    status: 'live' | 'upcoming' | 'completed';
    questionCount: number;
    marks: number;
    duration: number; // minutes
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function MockTestsPage() {
    const isMobileApp = useIsMobileApp();
    const { course } = useCourse();
    const [forceLdceIp, setForceLdceIp] = useState(false);
    const [forcePsgb, setForcePsgb] = useState(false);
    const [membershipLevel, setMembershipLevel] = useState<'free' | 'silver' | 'gold'>('free');
    const [planName, setPlanName] = useState<string | null>(null);
    const [paidTests, setPaidTests] = useState<string[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("Aspirant");
    const [role, setRole] = useState<string>("user");
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [activeSeriesTab, setActiveSeriesTab] = useState<'series1' | 'series2'>('series2');

    // Admin Enrollment View State
    const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
    const [enrollmentList, setEnrollmentList] = useState<any[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);
    const [selectedTestForEnrollment, setSelectedTestForEnrollment] = useState<string>("");
    const [enrollmentCounts, setEnrollmentCounts] = useState<Record<string, number>>({});

    const [universalCount, setUniversalCount] = useState(0);

    // User Results State
    const [userResults, setUserResults] = useState<Record<string, any>>({});
    const [userAttempts, setUserAttempts] = useState<Record<string, any[]>>({});
    const [selectedMockForSheets, setSelectedMockForSheets] = useState<MockTest | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [showDownloadNotification, setShowDownloadNotification] = useState(false);

    useEffect(() => {
        if (showDownloadNotification) {
            const timer = setTimeout(() => setShowDownloadNotification(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showDownloadNotification]);

    const fetchEnrollmentCounts = async () => {
        try {
            const res = await fetch('/api/admin/mock-test/counts');
            if (res.ok) {
                const data = await res.json();
                setEnrollmentCounts(data.counts || {});
                setUniversalCount(data.universalCount || 0);
            }
        } catch (error) {
            console.error("Failed to fetch counts", error);
        }
    };

    useEffect(() => {
        // Get user session
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
        if (cookie) {
            try {
                const session = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
                if (session.email) {
                    setUserEmail(session.email);
                    // Fetch User Results
                    fetch('/api/mock-test/user-results', {
                        method: 'POST',
                        body: JSON.stringify({ email: session.email })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.results) setUserResults(data.results);
                            if (data.attempts) setUserAttempts(data.attempts);

                            // Merge DB enrollments with Local Storage
                            const localPaid = (localStorage.getItem('paid_mock_tests')?.split(',') || []).filter(Boolean);
                            const serverPaid = data.enrolledTests || [];
                            const allPaid = Array.from(new Set([...localPaid, ...serverPaid]));

                            setPaidTests(allPaid);
                            localStorage.setItem('paid_mock_tests', allPaid.join(','));
                        })
                        .catch(err => console.error('Error fetching results', err));
                }
                if (session.name) setUserName(session.name);
                if (session.membershipLevel) setMembershipLevel(session.membershipLevel);
                if (session.planName) setPlanName(session.planName);
                if (session.role) setRole(session.role);
            } catch (e) {
                console.error('Session parse error');
            }
        }

        // Load paid tests
        const paid = localStorage.getItem('paid_mock_tests');
        if (paid) {
            setPaidTests(paid.split(','));
        }

        fetchEnrollmentCounts();
    }, []);

    const mockTests = useMemo(() => {
        const mocks: MockTest[] = [];
        const today = startOfToday();

        // Convert FULL_SCHEDULE to a Map for easy lookup by date
        const planMap = new Map();
        FULL_SCHEDULE.forEach(item => {
            planMap.set(item.date, item);
        });

        let currentDate = new Date(2026, 0, 17); // Start from Jan 17, 2026 (Saturday)
        const endDate = new Date(2026, 4, 10);   // Extend till end of schedule

        let mockCount = 1;

        while (currentDate <= endDate) {
            const saturdayDate = currentDate;
            let sundayDate = endOfDay(addDays(saturdayDate, 1));

            const calculatedId = `mock-${format(saturdayDate, 'yyyy-MM-dd')}`;

            if (calculatedId === 'mock-2026-05-02') {
                sundayDate = new Date(2026, 4, 4, 23, 59, 59); // 04.05.2026 @ 23:59 hours
            }


            const mondayDate = addDays(saturdayDate, -5);
            const fridayDate = addDays(saturdayDate, -1);

            const weekTopics: string[] = [];

            // Iterate through each day of the study week
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

            // Determine Status
            let status: 'live' | 'upcoming' | 'completed' = 'upcoming';

            const now = new Date();

            if (now > sundayDate) {
                status = 'completed';
            } else if (now >= saturdayDate || (role === 'admin' && (calculatedId === 'mock-2026-05-02' || calculatedId === 'mock-2026-04-25' || calculatedId === 'mock-2026-04-18' || calculatedId === 'mock-2026-04-04' || calculatedId === 'mock-2026-03-14' || calculatedId === 'mock-2026-03-07' || calculatedId === 'mock-2026-02-28' || calculatedId === 'mock-2026-03-21' || calculatedId === 'mock-2026-03-28' || calculatedId === 'mock-2026-04-11'))) {
                status = 'live';
            } else {
                status = 'upcoming';
            }

            if (weekTopics.length > 0 || mockCount === 1) {
                mocks.push({
                    id: calculatedId,
                    title: `Weekly Mock Test - ${mockCount.toString().padStart(2, '0')}`,
                    topics: weekTopics.length > 0 ? weekTopics : ["Introductory/General Topics"],
                    startDate: saturdayDate,
                    endDate: sundayDate,
                    status,
                    questionCount: 50,
                    marks: 100,
                    duration: 60
                });
                mockCount++;
            }

            currentDate = addDays(currentDate, 7);
        }

        return mocks;
    }, [role]);

    const seriesIIMockTests = useMemo(() => {
        return SERIES_II_MOCK_SCHEDULE.map(test => {
            const startDate = new Date(test.startDate + "T00:00:00+05:30");
            const endDate = new Date(test.endDate + "T23:59:59+05:30");
            
            let status: 'live' | 'upcoming' | 'completed' = 'upcoming';
            const now = new Date();

            if (now > endDate) {
                status = 'completed';
            } else if (now >= startDate) {
                status = 'live';
            } else {
                status = 'upcoming';
            }

            return {
                id: test.id,
                title: test.title,
                topics: test.topics,
                startDate,
                endDate,
                status,
                questionCount: 100,
                marks: test.marks,
                duration: test.duration,
            } as MockTest;
        });
    }, [role]);

    const activeMocks = mockTests.filter(m => m.status === 'live');
    const upcomingMocks = mockTests.filter(m => m.status === 'upcoming');
    const completedMocks = mockTests.filter(m => m.status === 'completed').reverse();

    const activeMocksSeriesII = seriesIIMockTests.filter(m => m.status === 'live');
    const upcomingMocksSeriesII = seriesIIMockTests.filter(m => m.status === 'upcoming');
    const completedMocksSeriesII = seriesIIMockTests.filter(m => m.status === 'completed').reverse();

    const currentActiveMocks = activeSeriesTab === 'series1' ? activeMocks : activeMocksSeriesII;
    const currentUpcomingMocks = activeSeriesTab === 'series1' ? upcomingMocks : upcomingMocksSeriesII;
    const currentCompletedMocks = activeSeriesTab === 'series1' ? completedMocks : completedMocksSeriesII;

    // Dialog State
    const [selectedMock, setSelectedMock] = useState<MockTest | null>(null);
    const [selectedMockForRank, setSelectedMockForRank] = useState<MockTest | null>(null);

    const handleMockClick = (mock: MockTest) => {
        if (!userEmail) {
            window.location.href = '/login';
            return;
        }
        setSelectedMock(mock);
    };

    const verifyEnrollment = async (
        orderId: string,
        paymentId: string,
        signature: string,
        mock: MockTest
    ) => {
        setProcessingId(mock.id);
        try {
            const verifyRes = await fetch('/api/mock-test/enroll/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    razorpay_order_id: orderId,
                    razorpay_payment_id: paymentId,
                    razorpay_signature: signature,
                    email: userEmail,
                    testId: mock.id,
                    testTitle: mock.title,
                    userName: userName
                })
            });

            if (verifyRes.ok) {
                const newPaidList = [...paidTests, mock.id];
                // Avoid duplicates
                if (!paidTests.includes(mock.id)) {
                    setPaidTests([...newPaidList]);
                    localStorage.setItem('paid_mock_tests', [...newPaidList].join(','));
                }

                alert("Enrollment Successful! You can now access this test when it goes live.");
                fetchEnrollmentCounts(); // Refresh counts
            } else {
                alert("Payment verification failed. Please contact support.");
            }
        } catch (e) {
            console.error(e);
            alert("Error verifying payment");
        } finally {
            setProcessingId(null);
        }
    };

    const handleEnroll = async (mock: MockTest) => {
        if (!userEmail) {
            alert("Please log in to enroll.");
            window.location.href = '/login';
            return;
        }

        setProcessingId(mock.id);

        try {
            // 1. Create Order via server
            const orderRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: (mock.id.startsWith("mock-s2-") || mock.id.startsWith("psgb-mock-")) ? 99 : 49,
                    email: userEmail,
                    plan: { id: mock.id, name: mock.title, type: 'mock_test' }
                })
            });

            if (!orderRes.ok) throw new Error("Order creation failed");
            const order = await orderRes.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Dak Guru",
                description: `Enrollment: ${mock.title}`,
                image: "/dak-guru-round.png",
                order_id: order.id,
                // Update callback_url to use the API route that handles POST and redirects to this page with query params
                callback_url: `${window.location.origin}/api/payment/callback?to=/mock-tests&testId=${mock.id}`,
                redirect: false, // Try to handle client side first, but if app redirects, callback_url is used
                handler: async function (response: any) {
                    await verifyEnrollment(
                        response.razorpay_order_id,
                        response.razorpay_payment_id,
                        response.razorpay_signature,
                        mock
                    );
                },
                prefill: {
                    name: userName,
                    email: userEmail
                },
                theme: {
                    color: "#dc2626"
                },
                modal: {
                    ondismiss: function () {
                        setProcessingId(null);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error: any) {
            console.error("Enrollment Error:", error);
            alert("Enrollment failed. Please try again.");
            setProcessingId(null);
        }
    };

    // Handle Redirect Callback (e.g. UPI Intent on Mobile)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const rpPaymentId = params.get('razorpay_payment_id');
        const rpOrderId = params.get('razorpay_order_id');
        const rpSignature = params.get('razorpay_signature');
        const testId = params.get('testId');

        if (rpPaymentId && rpOrderId && rpSignature && testId && userEmail) {
            const mock = mockTests.find(m => m.id === testId);
            if (mock) {
                verifyEnrollment(rpOrderId, rpPaymentId, rpSignature, mock);
                // Clear query params to prevent re-verification on refresh
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, [userEmail, mockTests]);

    const handleViewEnrollments = async (mock: MockTest) => {
        setSelectedTestForEnrollment(mock.title);
        setEnrollmentModalOpen(true);
        setLoadingEnrollments(true);
        try {
            const res = await fetch(`/api/admin/mock-test/enrollments?testId=${mock.id}`);
            if (res.ok) {
                const data = await res.json();
                setEnrollmentList(data.enrollments);
            } else {
                alert("Failed to fetch enrollments");
            }
        } catch (error) {
            console.error(error);
            alert("Error fetching data");
        } finally {
            setLoadingEnrollments(false);
        }
    };

    const handleDownloadAnalytics = async (mock: MockTest, result: any) => {
        if (!result) return;
        setDownloadingId(mock.id);
        try {
            const questions = TEST_QUESTIONS_MAP[mock.id];
            if (!questions) {
                alert("Question data not found for PDF generation.");
                return;
            }

            await generateMockTestAnswerSheetPDF({
                userName: userName,
                score: result.score,
                totalQuestions: result.totalQuestions, // Use result's total questions in case it changed
                questions: questions,
                answers: result.answers || {},
                testName: mock.title,
                submittedAt: result.submittedAt,
                testSchedule: `${format(mock.startDate, 'dd-MMM-yyyy')} to ${format(mock.endDate, 'dd-MMM-yyyy')}`,
                testTopics: mock.topics
            });
            setShowDownloadNotification(true);

        } catch (error) {
            console.error("PDF Gen Error", error);
            alert("Failed to generate PDF");
        } finally {
            setDownloadingId(null);
        }
    };

    const isPsGroupB = (course === 'PS_GR_B' && !forceLdceIp) || forcePsgb;

    // ===== PS GROUP B MOCK TESTS (Full Schedule) =====
    if (isPsGroupB) {
        return (
            <PsgbMockTestPage
                isMobileApp={isMobileApp}
                membershipLevel={membershipLevel}
                planName={planName}
                paidTests={paidTests}
                userEmail={userEmail}
                userName={userName}
                role={role}
                onSwitchToLdceIp={() => { setForcePsgb(false); setForceLdceIp(true); }}
            />
        );
    }

    return (
        <AppScreenWrapper hideStatusBarPadding={true} scrollableContent={false}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {!isMobileApp && (
                <HomeHeader isLoggedIn={!!userEmail} membershipLevel={membershipLevel as any} />
            )}

            {/* Hero Section */}
            {isMobileApp ? (
                // Mobile App — Native Android Material 3 Inspired Compact Top App Bar
                <div className="sticky top-0 z-20 shrink-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/80 shadow-sm">
                    <div className="px-4 pt-[max(12px,calc(env(safe-area-inset-top,0px)+6px))] pb-3 flex items-center gap-3">
                        <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors -ml-1">
                            <ArrowLeft className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-[17px] font-black text-zinc-900 dark:text-zinc-100 leading-none tracking-tight flex items-center gap-1.5 animate-in fade-in slide-in-from-left-4 duration-300">
                                Mock Tests
                                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">LDCE IP</span>
                            </h1>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">All India Test Series &amp; Rankings</p>
                        </div>
                        <button
                            onClick={() => setForcePsgb(true)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold active:scale-95 transition-transform"
                        >
                            <Sparkles className="w-3 h-3" />
                            PS Gr B
                        </button>
                        {activeMocks.length > 0 && (
                            <Link href="/mock-tests/live" className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-950/30 active:scale-95 transition-transform">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                </span>
                                <span className="text-red-600 dark:text-red-400 font-bold text-[9px] uppercase tracking-wider">Live Test</span>
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                // Desktop/Web — Premium Hero (matching PS Group B style)
                <div className="relative shrink-0 min-h-[320px] md:min-h-[400px] bg-[#0a0a0f] overflow-hidden isolate">
                    {/* Animated gradient mesh background — 4 blobs */}
                    <div className="absolute inset-0">
                        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/30 via-blue-500/20 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }}></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/25 via-indigo-500/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
                        <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
                        <div className="absolute bottom-[10%] left-[15%] w-[300px] h-[300px] bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
                    </div>

                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

                    {/* Floating accent orbs */}
                    <div className="absolute top-20 left-[10%] w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_15px_5px_rgba(99,102,241,0.4)] animate-bounce" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute top-32 right-[15%] w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_12px_4px_rgba(96,165,250,0.4)] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                    <div className="absolute bottom-24 left-[25%] w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_3px_rgba(192,132,252,0.4)] animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
                    <div className="absolute bottom-16 right-[30%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_5px_rgba(34,211,238,0.3)] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>

                    {/* Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 md:pt-8 md:pb-12 text-center">
                        {/* Back button - glass style */}
                        <div className="flex justify-center w-full mb-4 md:mb-5">
                            <Link href="/" className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 text-sm backdrop-blur-sm">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                <span className="font-medium">Back to Home</span>
                            </Link>
                        </div>

                        {/* Live badge */}
                        {activeMocks.length > 0 && (
                            <div className="mb-4">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                    </span>
                                    LIVE NOW
                                </div>
                            </div>
                        )}

                        {/* Subtitle badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"></span>
                            All India Weekly Mock Test Series
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-3 md:mb-4 leading-[1.05]">
                            <span className="block">Mock Test Series</span>
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400" style={{ WebkitBackgroundClip: 'text' }}>
                                LDCE IP 2026
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-zinc-400/90 max-w-xl mx-auto mb-5 leading-relaxed font-medium">
                            Compete nationally with real-time ranking and detailed analytics.
                            <span className="text-zinc-500 block mt-1">Weekly tests with All India ranking &amp; comprehensive answer sheets.</span>
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-7">
                            {[
                                { icon: <Users className="w-5 h-5" />, label: '1000+', sub: 'Aspirants', color: 'from-indigo-500/20 to-indigo-500/5', iconColor: 'text-indigo-400', borderColor: 'border-indigo-500/20' },
                                { icon: <Trophy className="w-5 h-5" />, label: 'Rank', sub: 'All India', color: 'from-amber-500/20 to-amber-500/5', iconColor: 'text-amber-400', borderColor: 'border-amber-500/20' },
                                { icon: <Clock className="w-5 h-5" />, label: activeSeriesTab === 'series2' ? '120 Min' : '60 Min', sub: 'Per Test', color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400', borderColor: 'border-emerald-500/20' },
                                { icon: <CheckCircle2 className="w-5 h-5" />, label: '100 MCQs', sub: 'Per Test', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400', borderColor: 'border-blue-500/20' },
                            ].map((stat, idx) => (
                                <div key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} backdrop-blur-md hover:scale-105 transition-transform duration-300 min-w-[140px]`}>
                                    <div className={`${stat.iconColor} shrink-0`}>{stat.icon}</div>
                                    <div className="text-left">
                                        <div className="text-sm font-black text-white leading-tight">{stat.label}</div>
                                        <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{stat.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Switch to PS Group B — Animated border-glow button */}
                        <button
                            onClick={() => setForcePsgb(true)}
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                        >
                            {/* Animated gradient border */}
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 p-[2px] animate-[spin_4s_linear_infinite] bg-[length:200%_200%] animate-[gradient-shift_3s_ease_infinite]" style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 3s ease infinite' }}>
                                <span className="flex h-full w-full rounded-full bg-[#0e0e18] group-hover:bg-[#151525] transition-colors duration-300"></span>
                            </span>
                            {/* Glow */}
                            <span className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.25),0_0_40px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.4),0_0_50px_rgba(139,92,246,0.15)] transition-shadow duration-300"></span>
                            {/* Content */}
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-400"></span>
                            </span>
                            <span className="relative text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">Switch to PS Group B Mock Tests</span>
                            <ChevronRight className="w-4 h-4 relative text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>

                    {/* Bottom gradient border */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none"></div>
                </div>
            )}

            {/* Test Cards Section */}
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isMobileApp ? 'mt-0' : '-mt-4 md:-mt-10'} relative z-10 w-full overflow-x-hidden`}>
                <div className={`${isMobileApp ? 'space-y-4' : 'space-y-12'} w-full`}>

                    {/* Info Banner — Native M3 style on mobile, gradient on desktop */}
                    {isMobileApp ? (
                        <div className="flex items-start gap-3 p-3.5 bg-indigo-50 dark:bg-indigo-900/15 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-800/40 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-sm">💡</span>
                            </div>
                            <p className="text-[11.5px] text-indigo-900 dark:text-indigo-200 leading-relaxed font-medium flex-1">
                                To simulate a real LDCE vacancy scenario, only <span className="font-bold">Top 7 ranks</span> are published. Assume 7 vacancies and prepare to secure your place.
                            </p>
                        </div>
                    ) : (
                        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-lg rounded-xl sm:rounded-2xl border border-white/10 mb-4 mx-0 sm:mx-0 w-full max-w-full">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                            <div className="w-full flex items-center h-[2.75rem] sm:h-12 relative z-10 overflow-hidden">
                                <div className="flex-shrink-0 w-auto bg-white/20 backdrop-blur-md px-3 sm:px-4 h-full flex items-center justify-center z-20 shadow-xl border-r border-white/10">
                                    <span className="font-black text-[10px] sm:text-sm tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap">
                                        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-yellow-400"></span>
                                        </span>
                                        Why Top 7?
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0 overflow-hidden h-full flex items-center group cursor-default ml-2 sm:ml-4">
                                    <div className="animate-scroll-mobile sm:animate-scroll flex items-center whitespace-nowrap min-w-max">
                                        <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 font-medium text-[11px] sm:text-xs md:text-base tracking-wide text-white/95 group-hover:text-white transition-colors">
                                            <span className="inline-block mx-2 sm:mx-4 shrink-0">★</span>
                                            <span className="shrink-0">To simulate a real LDCE vacancy scenario, only Top 7 ranks are published. Assume 7 vacancies and prepare to secure your place. Best Wishes ~ Team Dak Guru</span>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 font-medium text-[11px] sm:text-xs md:text-base tracking-wide text-white/95 group-hover:text-white transition-colors">
                                            <span className="inline-block mx-2 sm:mx-4 shrink-0">★</span>
                                            <span className="shrink-0">To simulate a real LDCE vacancy scenario, only Top 7 ranks are published. Assume 7 vacancies and prepare to secure your place. Best Wishes ~ Team Dak Guru</span>
                                        </div>
                                    </div>
                                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-indigo-600 to-transparent z-10 pointer-events-none"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-indigo-600 to-transparent z-10 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Segmented Tab — Clearly visible */}
                    <div className={`relative z-20 ${isMobileApp ? 'mb-3' : 'mb-6'} bg-zinc-200/80 dark:bg-zinc-800 p-1.5 rounded-2xl flex items-center justify-between border border-zinc-300 dark:border-zinc-700 shadow-md max-w-[420px] mx-auto w-full`}>
                        <button 
                            onClick={() => setActiveSeriesTab('series1')}
                            className={`flex-1 py-3 px-3 rounded-xl text-sm sm:text-base font-extrabold transition-all duration-200 relative ${activeSeriesTab === 'series1' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-700/50'}`}
                        >
                            Series - I
                        </button>
                        <button 
                            onClick={() => setActiveSeriesTab('series2')}
                            className={`flex-1 py-3 px-3 rounded-xl text-sm sm:text-base font-extrabold transition-all duration-200 relative ${activeSeriesTab === 'series2' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-700/50'}`}
                        >
                            Series - II
                        </button>
                    </div>

                    {currentCompletedMocks.length > 0 && (
                        <div className="flex justify-center -mt-1 mb-6 relative z-20 w-full">
                            <a
                                href="#previous-tests"
                                className="group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-[20px] sm:rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all active:scale-[0.98] text-[12px] sm:text-sm font-bold w-full sm:w-auto"
                            >
                                <span className="flex h-2.5 w-2.5 relative shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1860FF]"></span>
                                </span>
                                <span>Looking for Previous Mock Tests? Click Here</span>
                                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-[270deg] shrink-0 text-zinc-400 group-hover:text-blue-500 group-hover:translate-y-1 transition-all" />
                            </a>
                        </div>
                    )}

                    {currentActiveMocks.length > 0 && (
                        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {currentActiveMocks.map(mock => (
                                <MockTestCard
                                    key={mock.id}
                                    mock={mock}
                                    onClick={() => handleMockClick(mock)}
                                    isPaid={paidTests.includes(mock.id)}
                                    membershipLevel={membershipLevel}
                                    displayMembership={getDisplayMembership(membershipLevel, planName)}
                                    onEnroll={() => handleEnroll(mock)}
                                    isProcessing={processingId === mock.id}
                                    role={role}
                                    onViewEnrollments={() => handleViewEnrollments(mock)}
                                    enrollmentCount={enrollmentCounts[mock.id] || universalCount}
                                    onShowRankList={() => setSelectedMockForRank(mock)}
                                    userResult={userResults[mock.id]}
                                    onDownloadResult={() => handleDownloadAnalytics(mock, userResults[mock.id])}
                                    onViewSheets={() => setSelectedMockForSheets(mock)}
                                    isDownloading={downloadingId === mock.id}
                                />
                            ))}
                        </div>
                    )}


                    {/* Revamped Schedule Section */}
                    <div className={`relative ${isMobileApp ? '' : 'group'} mt-2`}>
                        {/* Soft Gradient Shadow for Complete Schedule — Desktop only */}
                        {!isMobileApp && <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-[32px] opacity-40 blur-lg transition duration-1000 group-hover:opacity-60 animate-tilt"></div>}

                        <div className={`relative ${isMobileApp ? 'bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800' : 'bg-white/95 backdrop-blur-xl dark:bg-zinc-950/95 rounded-[28px] p-6 sm:p-8 md:p-10 shadow-sm border border-zinc-100 dark:border-zinc-800'} overflow-hidden`}>

                            {/* Decorative Background Soft Blobs — Desktop only */}
                            {!isMobileApp && <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl"></div>}
                            {!isMobileApp && <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-3xl"></div>}

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <div className="text-left">
                                        <h2 className="text-[22px] sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                                            <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                                            Complete Schedule
                                        </h2>
                                        <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium pl-10">
                                            Your roadmap to success. Stay consistent and track your progress.
                                        </p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="font-bold text-zinc-700 dark:text-zinc-300 text-sm">
                                            {currentUpcomingMocks.length} Upcoming Tests
                                        </span>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {currentUpcomingMocks.map(mock => (
                                        <MockTestCard
                                            key={mock.id}
                                            mock={mock}
                                            onClick={() => handleMockClick(mock)}
                                            isPaid={paidTests.includes(mock.id)}
                                            membershipLevel={membershipLevel}
                                            displayMembership={getDisplayMembership(membershipLevel, planName)}
                                            onEnroll={() => handleEnroll(mock)}
                                            isProcessing={processingId === mock.id}
                                            role={role}
                                            onViewEnrollments={() => handleViewEnrollments(mock)}
                                            enrollmentCount={enrollmentCounts[mock.id] || universalCount}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {currentCompletedMocks.length > 0 && (
                        <div id="previous-tests" className="opacity-100 mb-12 scroll-mt-24">
                            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 px-4 md:px-8 flex items-center gap-3">
                                <History className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" />
                                Previous Tests
                            </h2>
                            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
                                {currentCompletedMocks.map(mock => (
                                    <MockTestCard
                                        key={mock.id}
                                        mock={mock}
                                        onClick={() => handleMockClick(mock)}
                                        isPaid={paidTests.includes(mock.id)}
                                        membershipLevel={membershipLevel}
                                        displayMembership={getDisplayMembership(membershipLevel, planName)}
                                        onEnroll={() => handleEnroll(mock)}
                                        enrollmentCount={enrollmentCounts[mock.id] || universalCount}
                                        onShowRankList={() => setSelectedMockForRank(mock)}
                                        onViewSheets={() => setSelectedMockForSheets(mock)}
                                        userResult={userResults[mock.id]}
                                        onDownloadResult={() => handleDownloadAnalytics(mock, userResults[mock.id])}
                                        isDownloading={downloadingId === mock.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}


                </div>

                <div className="mt-12 md:mt-16 text-center">
                    <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Why Attempt Mock Tests?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-8">
                        <div className="p-5 md:p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                                <Timer className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">Time Management</h3>
                            <p className="text-sm text-zinc-500">Practice completing the exam within the stipulated time limit.</p>
                        </div>
                        <div className="p-5 md:p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">Performance Analysis</h3>
                            <p className="text-sm text-zinc-500">Get detailed insights into your strong and weak areas.</p>
                        </div>
                        <div className="p-5 md:p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">All India Ranking</h3>
                            <p className="text-sm text-zinc-500">Know where you stand among thousands of other aspirants.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={!!selectedMock} onOpenChange={(open) => !open && setSelectedMock(null)}>
                <DialogContent className="max-w-2xl w-[95%] max-h-[85vh] overflow-y-auto rounded-2xl">
                    {selectedMock && (
                        <MockTestDetail
                            mock={selectedMock}
                            membershipLevel={membershipLevel}
                            isPaid={paidTests.includes(selectedMock.id)}
                            onEnroll={() => handleEnroll(selectedMock)}
                            isProcessing={processingId === selectedMock.id}
                            role={role}
                            userResult={userResults[selectedMock.id]}
                            onDownloadResult={() => handleDownloadAnalytics(selectedMock, userResults[selectedMock.id])}
                            onViewSheets={() => {
                                setSelectedMock(null);
                                setSelectedMockForSheets(selectedMock);
                            }}
                            isDownloading={downloadingId === selectedMock.id}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Admin Enrollment List Dialog */}
            <Dialog open={enrollmentModalOpen} onOpenChange={setEnrollmentModalOpen}>
                <DialogContent className="max-w-4xl w-[95%] max-h-[85vh] overflow-hidden flex flex-col rounded-2xl p-0 bg-white dark:bg-zinc-900">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50">
                        <div>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                                <Users className="w-5 h-5 text-blue-600" /> Enrollments
                            </DialogTitle>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                Users enrolled for <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedTestForEnrollment}</span>
                            </p>
                        </div>
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">
                            Total: {enrollmentList.length}
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-0">
                        {loadingEnrollments ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                                <span className="text-sm text-zinc-500">Loading enrollment data...</span>
                            </div>
                        ) : enrollmentList.length > 0 ? (
                            <div className="w-full">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400 w-16">S.No</th>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400">User Name</th>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400">Phone</th>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400">Payment Date</th>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400">Payment For</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                                        {enrollmentList.map((user, idx) => (
                                            <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                                                <td className="px-6 py-3 text-zinc-500">{user.serialNo}</td>
                                                <td className="px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100">{user.name}</td>
                                                <td className="px-6 py-3 text-zinc-600 dark:text-zinc-300">{user.mobile}</td>
                                                <td className="px-6 py-3 text-zinc-600 dark:text-zinc-300">
                                                    {user.dateOfPayment ? format(new Date(user.dateOfPayment), 'dd MMM yyyy') : '-'}
                                                </td>
                                                <td className="px-6 py-3">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${user.paymentMadeFor?.toLowerCase().includes('gold')
                                                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30'
                                                        : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800'
                                                        }`}>
                                                        {user.paymentMadeFor}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-20 text-center text-zinc-500 dark:text-zinc-400">
                                No enrollments found for this test.
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <RankListModal
                mock={selectedMockForRank}
                isOpen={!!selectedMockForRank}
                onClose={() => setSelectedMockForRank(null)}
                role={role}
            />

            <AnswerSheetModal
                mock={selectedMockForSheets}
                attempts={selectedMockForSheets ? userAttempts[selectedMockForSheets.id] || [] : []}
                isOpen={!!selectedMockForSheets}
                onClose={() => setSelectedMockForSheets(null)}
                onDownload={handleDownloadAnalytics}
                isDownloading={downloadingId}
            />

            {/* Download Notification */}
            {showDownloadNotification && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-600/20 z-[100] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-white/20 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold">Answer Sheet Downloaded</p>
                        <p className="text-xs text-emerald-100">Check your Downloads Folder</p>
                    </div>
                </div>
            )}

        </AppScreenWrapper>
    );
}


function MockTestDetail({
    mock,
    membershipLevel,
    isPaid,
    onEnroll,
    isProcessing,
    role,
    userResult,
    onDownloadResult,
    onViewSheets,
    isDownloading
}: {
    mock: MockTest;
    membershipLevel: string;
    isPaid: boolean;
    onEnroll: () => void;
    isProcessing?: boolean;
    role?: string;
    userResult?: any;
    onDownloadResult?: () => void;
    onViewSheets?: () => void;
    isDownloading?: boolean;
}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update time every minute to check for test activation
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const isTimeReached = currentTime >= mock.startDate;
    const isEnded = currentTime > mock.endDate;
    const isLive = mock.status === 'live' || role === 'admin' || (isTimeReached && !isEnded);
    const isExempt = membershipLevel === 'gold' || membershipLevel === 'silver';
    const canAccess = isExempt || isPaid || role === 'admin';

    // Determine target date for countdown
    let targetDate = null;
    let timerLabel = "";

    if (mock.status === 'upcoming') {
        targetDate = mock.startDate;
        timerLabel = "Test Starts In:";
    } else if (isLive) {
        targetDate = mock.endDate;
        timerLabel = "Test Ends In:";
    }

    return (
        <>
            <DialogHeader className="space-y-2 pt-2 text-left">
                <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2.5">
                    <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <FileTextIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </span>
                    <span className="line-clamp-1">{mock.title}</span>
                </DialogTitle>
                <DialogDescription className="text-xs md:text-base text-zinc-500 dark:text-zinc-400">
                    <span className="block md:inline">Scheduled for </span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block md:inline">
                        {format(mock.startDate, 'MMM dd, yyyy')} - {format(mock.endDate, 'MMM dd, yyyy')}
                    </span>
                </DialogDescription>

                {targetDate && !isEnded && (
                    <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-fit">
                        <Timer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{timerLabel}</span>
                        <div className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-100">
                            <MockCountdown targetDate={targetDate} onComplete={() => setCurrentTime(new Date())} />
                        </div>
                    </div>
                )}
            </DialogHeader>

            <div className="mt-4 space-y-4 md:space-y-6">
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="p-2 md:p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
                        <div className="text-lg md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">{mock.duration}</div>
                        <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider font-semibold">Minutes</div>
                    </div>
                    <div className="p-2 md:p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
                        <div className="text-lg md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">{mock.questionCount}</div>
                        <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider font-semibold">Questions</div>
                    </div>
                    <div className="p-2 md:p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
                        <div className="text-lg md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">{mock.marks}</div>
                        <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider font-semibold">Marks</div>
                    </div>
                </div>

                <div>
                    <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 md:mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-purple-500" /> Test Topics
                    </h3>
                    <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-3 md:p-4 border border-purple-100 dark:border-purple-900/20">
                        <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                            {mock.topics.map((topic, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 md:gap-3 leading-snug">
                                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                                    <span>{topic}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 md:mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500" /> Test Instructions
                    </h3>
                    <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-3 md:p-4 border border-amber-100 dark:border-amber-900/20">
                        <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                            <li className="flex gap-2.5 md:gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500 shrink-0">1.</span>
                                <span>The test window is open from Saturday 00:00 AM to Sunday 11:59 PM. You can attempt the test at any time within this window.</span>
                            </li>
                            <li className="flex gap-2.5 md:gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500 shrink-0">2.</span>
                                <span>Once started, the timer cannot be paused. Ensure you have a stable internet connection.</span>
                            </li>
                            <li className="flex gap-2.5 md:gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500 shrink-0">3.</span>
                                <span>There is <strong>no negative marking</strong> for this test series.</span>
                            </li>
                            <li className="flex gap-2.5 md:gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500 shrink-0">4.</span>
                                <span>All India Rank will be generated on the following Monday at 10:00 AM.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {isLive ? (
                    canAccess ? (
                        userResult ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">Attempted Successfully</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-wider">Your Score</span>
                                        <span className="font-black text-zinc-900 dark:text-white text-lg leading-none">
                                            {userResult.score}<span className="text-zinc-400 text-xs font-bold ml-0.5">/{mock.marks}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    <button
                                        disabled
                                        className="py-3 sm:py-4 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 dark:text-zinc-500 rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-not-allowed border border-zinc-200 dark:border-zinc-700 px-1"
                                    >
                                        <CheckCircle2 className="w-4 h-4 shrink-0" /> <span className="truncate">Submitted</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
                                            onViewSheets?.();
                                        }}
                                        className="py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-[0.97] px-1"
                                    >
                                        <FileDown className="w-4 h-4 shrink-0" /> <span className="truncate">Answer Sheet</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={`/mock-tests/weekly/${mock.id}`}
                                onClick={() => { if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20); }}
                                className="w-full py-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-2xl font-black text-base md:text-lg shadow-xl shadow-emerald-800/10 hover:shadow-emerald-800/20 transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98]"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner shrink-0">
                                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                                </div>
                                Start Assessment Now
                            </Link>
                        )
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                                onEnroll();
                            }}
                            disabled={isProcessing}
                            className="w-full py-4.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-2xl font-black text-base md:text-lg shadow-xl shadow-red-500/40 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.98] animate-pulse-slow"
                        >
                            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-yellow-300 fill-current" />}
                            Enroll Now for Rs.{(mock.id.startsWith("mock-s2-") || mock.id.startsWith("psgb-mock-")) ? '99' : '49'}/-
                        </button>
                    )
                ) : mock.status === 'completed' ? (
                    canAccess ? (
                        <div className="flex flex-col gap-4">
                            {userResult && (
                                <div className="flex items-center justify-between p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">Test Completed</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-wider">Your Score</span>
                                        <span className="font-black text-zinc-900 dark:text-white text-lg leading-none">
                                            {userResult.score}<span className="text-zinc-400 text-xs font-bold ml-0.5">/{mock.marks}</span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <Link
                                    href={`/mock-tests/weekly/${mock.id}?reattempt=true`}
                                    onClick={() => { if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15); }}
                                    className="py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] px-1"
                                >
                                    <History className="w-4 h-4 shrink-0" /> <span className="truncate">Reattempt</span>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
                                        onViewSheets?.();
                                    }}
                                    className="py-3 sm:py-4 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm shadow-lg shadow-zinc-950/20 flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-[0.97] px-1"
                                >
                                    <FileTextIcon className="w-4 h-4 shrink-0" /> <span className="truncate">Attempts</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                                onEnroll();
                            }}
                            disabled={isProcessing}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-2xl font-black text-base md:text-lg shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.98]"
                        >
                            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-yellow-300 fill-current" />}
                            Enroll Now for Rs.{(mock.id.startsWith("mock-s2-") || mock.id.startsWith("psgb-mock-")) ? '99' : '49'}/-
                        </button>
                    )
                ) : (
                    <button disabled className="w-full py-4.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-2xl font-bold flex items-center justify-center gap-3 cursor-not-allowed border border-dashed border-zinc-200 dark:border-zinc-700">
                        <Lock className="w-5 h-5" />
                        Test Link Not Active Yet
                    </button>
                )}
            </div>
        </>
    );
}

function MockCountdown({ targetDate, onComplete }: { targetDate: Date, onComplete?: () => void }) {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return null;
        };

        const initialTime = calculateTimeLeft();
        setTimeLeft(initialTime);

        if (!initialTime) {
            onComplete?.();
        }

        const timer = setInterval(() => {
            const time = calculateTimeLeft();
            setTimeLeft(time);
            if (!time) {
                clearInterval(timer);
                onComplete?.();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    if (!timeLeft) {
        return <span>View Details</span>;
    }

    return (
        <span className="font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
            {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </span>
    );
}

function MockTestCard({
    mock,
    onClick,
    membershipLevel,
    displayMembership,
    isPaid,
    onEnroll,
    isProcessing,
    role,
    onViewEnrollments,
    enrollmentCount,
    onShowRankList,
    onViewSheets,
    userResult,
    onDownloadResult,
    isDownloading
}: {
    mock: MockTest;
    onClick: () => void;
    membershipLevel: string;
    displayMembership?: string;
    isPaid: boolean;
    onEnroll: () => void;
    isProcessing?: boolean;
    role?: string;
    onViewEnrollments?: () => void;
    enrollmentCount?: number;
    onShowRankList?: () => void;
    onViewSheets?: () => void;
    userResult?: any;
    onDownloadResult?: () => void;
    isDownloading?: boolean;
}) {
    const isTimeReached = new Date() >= mock.startDate;
    const isEnded = new Date() > mock.endDate;
    const isLive = mock.status === 'live' || (isTimeReached && !isEnded);
    const isCompleted = mock.status === 'completed';
    const isExempt = membershipLevel === 'gold' || membershipLevel === 'silver';
    const canAccess = isExempt || isPaid || role === 'admin';
    const hasAttempted = !!userResult;

    // Dynamic styles based on state
    // Dynamic styles based on state
    const cardBgClass = isCompleted || hasAttempted
        ? "bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-zinc-900 border-blue-100 dark:border-blue-900/50"
        : isLive
            ? "bg-white dark:bg-zinc-900 border-red-500/50 dark:border-red-500/50 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] dark:shadow-[0_0_30px_-5px_rgba(239,68,68,0.2)] ring-1 ring-red-500/20 transform scale-[1.02]"
            : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700";

    return (
        <div
            onClick={onClick}
            className={`relative flex flex-col p-3.5 sm:p-5 mx-auto w-full max-w-full sm:max-w-none rounded-[1.25rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer overflow-hidden ${cardBgClass}`}
        >
            {/* Decorative Background Elements */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-full blur-3xl opacity-20 
                ${isLive ? 'from-red-400 to-orange-400' : isCompleted ? 'from-blue-400 to-indigo-400' : 'from-zinc-200 to-zinc-400'}
            `}></div>

            {/* Header: Access Badges & Status */}
            <div className="flex justify-between items-start mb-4 relative z-10 gap-2">
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest truncate">Weekly Test</span>
                    <span className="text-[10px] sm:text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md w-fit truncate">
                        {format(mock.startDate, 'dd MMM')} - {format(mock.endDate, 'dd MMM')}
                    </span>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0 max-w-[50%]">
                    {/* Live Pulse */}
                    {!isCompleted && isLive && !hasAttempted && (
                        <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-800 animate-pulse">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider truncate">Live Now</span>
                        </div>
                    )}

                    {/* Attempted Badge */}
                    {hasAttempted && (
                        <div className="flex flex-col items-end">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-800 mb-1 shrink-0">
                                <CheckCircle2 className="w-3 h-3 shrink-0" /> Attempted
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-400">
                                Score: {userResult.score}/{mock.marks}
                            </span>
                            {isCompleted && userResult.rank && (
                                <span className="text-[9px] sm:text-[10px] font-black text-amber-500 uppercase tracking-wider mt-0.5">
                                    Rank: #{userResult.rank}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Completed Badge */}
                    {isCompleted && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                            <CheckCircle2 className="w-3 h-3 shrink-0" /> Completed
                        </span>
                    )}

                    {/* Membership Badges */}
                    {(membershipLevel === 'gold' || membershipLevel === 'silver') && (
                        <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold shadow-sm shrink-0 ${
                            displayMembership === 'diamond'
                                ? 'bg-gradient-to-r from-fuchsia-100 to-purple-100 text-fuchsia-800 border border-fuchsia-200'
                                : displayMembership === 'platinum'
                                    ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border border-teal-200'
                                    : displayMembership === 'gold' || membershipLevel === 'gold'
                                        ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200'
                                        : 'bg-gradient-to-r from-slate-100 to-zinc-200 text-slate-700 border border-slate-200'
                        }`}>
                            {displayMembership === 'diamond' ? '💎 Diamond Access'
                                : displayMembership === 'platinum' ? '🏅 Platinum Access'
                                    : membershipLevel === 'gold' ? '🏆 Gold Access'
                                        : '🥈 Silver Access'}
                        </span>
                    )}
                    {membershipLevel !== 'gold' && membershipLevel !== 'silver' && isPaid && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 shadow-sm shrink-0">
                            ✅ Paid
                        </span>
                    )}
                </div>
            </div>

            {/* Title & Info */}
            <div className="flex-1 relative z-10 mb-5">
                <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-50 leading-tight mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    {mock.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {mock.topics.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[11px] sm:text-xs bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded-lg font-medium border border-zinc-100 dark:border-zinc-800/50 truncate max-w-[150px]">
                            {t}
                        </span>
                    ))}
                    {mock.topics.length > 2 && (
                        <span className="text-[11px] sm:text-xs text-zinc-400 px-1 py-1 font-medium">+ {mock.topics.length - 2} more</span>
                    )}
                </div>

                <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-semibold whitespace-nowrap">{mock.duration} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-semibold whitespace-nowrap">{mock.questionCount} Questions</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-3 relative z-10">
                {onShowRankList && (role === 'admin' || new Date() > mock.endDate) && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onShowRankList(); }}
                        disabled={role !== 'admin' && (new Date() >= mock.startDate && new Date() <= mock.endDate)}
                        className={`w-full py-2.5 sm:py-3 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-white rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 sm:gap-2 transition-all transform hover:scale-[1.02] active:scale-95 px-2 mb-2 ${
                            role !== 'admin' && (new Date() >= mock.startDate && new Date() <= mock.endDate) ? 'opacity-50 cursor-not-allowed grayscale' : ''
                        }`}
                    >
                        <Trophy className="w-4 h-4 text-white fill-current shrink-0" /> 
                        <span>
                            {role === 'admin' && (new Date() >= mock.startDate && new Date() <= mock.endDate) 
                                ? 'Live Leaderboard' 
                                : 'View Top 7 Rankers'}
                        </span>
                    </button>
                )}

                {/* Main CTA */}
                <div className="flex gap-2 sm:gap-3">
                    {/* Admin: Enrollments */}
                    {role === 'admin' && onViewEnrollments && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onViewEnrollments(); }}
                            className="px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0"
                            title="View Enrollments"
                        >
                            <Users className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">{enrollmentCount}</span>
                        </button>
                    )}

                    {isCompleted ? (
                        canAccess ? (
                            <div className="flex flex-col gap-2.5 flex-1">
                                <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 w-full">
                                    <Link
                                        href={`/mock-tests/weekly/${mock.id}?reattempt=true`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
                                        }}
                                        className="flex-1 py-2 sm:py-3 bg-white dark:bg-zinc-800 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl sm:rounded-2xl font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-2 transition-all active:scale-[0.97] shadow-sm px-1 sm:px-2 min-w-0"
                                    >
                                        <History className="w-3.5 h-3.5 shrink-0" /> <span>Reattempt</span>
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
                                            onViewSheets?.();
                                        }}
                                        className="flex-1 py-2 sm:py-3 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl sm:rounded-2xl font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-2 transition-all hover:bg-zinc-800/90 active:scale-[0.97] px-1 sm:px-2 min-w-0"
                                    >
                                        <FileTextIcon className="w-3.5 h-3.5 shrink-0" /> <span>Attempts</span>
                                    </button>
                        </div>
                    </div>
                ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                                onEnroll();
                            }}
                            disabled={isProcessing}
                            className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-red-500/30 transition-all transform active:scale-[0.97] px-2 min-w-0 w-full"
                        >
                            {isProcessing ? <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin shrink-0" /> : <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-200 fill-current shrink-0" />}
                            <span className="text-center">Enroll for Rs.{(mock.id.startsWith("mock-s2-") || mock.id.startsWith("psgb-mock-")) ? '99' : '49'}/-</span>
                        </button>
                )
                    ) : isLive ? (
                        hasAttempted ? (
                            <div className="flex gap-2 w-full">
                                <button
                                    disabled
                                    className="flex-1 py-2.5 sm:py-3 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 dark:text-zinc-500 rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 cursor-not-allowed border border-zinc-200 dark:border-zinc-700 px-1 sm:px-2 min-w-0"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> <span>Submitted</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
                                        onViewSheets?.();
                                    }}
                                    className="flex-1 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25 transition-all active:scale-[0.97] px-1 sm:px-2 min-w-0"
                                >
                                    <FileTextIcon className="w-3.5 h-3.5 shrink-0" /> <span>Attempts</span>
                                </button>
                            </div>
                ) : (
                    canAccess ? (
                        <Link
                            href={`/mock-tests/weekly/${mock.id}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                            }}
                            className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-red-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.97] animate-pulse-slow px-2 min-w-0"
                        >
                            <PlayCircle className="w-3.5 h-3.5 sm:w-4 h-4 fill-current shrink-0" /> <span>Attempt Live Test</span>
                        </Link>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                                onEnroll();
                            }}
                            disabled={isProcessing}
                            className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-red-500/30 transition-all transform active:scale-[0.97] px-2 min-w-0"
                        >
                            {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-200 fill-current shrink-0" />}
                            <span className="text-center">Enroll for Rs.{(mock.id.startsWith("mock-s2-") || mock.id.startsWith("psgb-mock-")) ? '99' : '49'}/-</span>
                        </button>
                    )
                )
            ) : !canAccess ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                        onEnroll();
                    }}
                    disabled={isProcessing}
                    className="flex-1 py-2 sm:py-3 w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/30 transition-all transform hover:scale-[1.01] active:scale-[0.97] px-2 min-w-0"
                >
                    {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 fill-current shrink-0" />}
                    <span className="text-center">Enroll for Rs.{(mock.id.startsWith("mock-s2-") || mock.id.startsWith("psgb-mock-")) ? '99' : '49'}/-</span>
                </button>
            ) : (
                <button
                    onClick={onClick}
                    className="flex-1 py-2 sm:py-3 w-full bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-dashed border-zinc-200 dark:border-zinc-700 px-2 min-w-0"
                >
                    <Lock className="w-3.5 h-3.5 shrink-0" /> <span>View Schedule</span>
                </button>
            )}
                </div>
            </div>
        </div>
    );
}

interface LeaderboardEntry {
    userName: string;
    userEmail: string;
    score: number;
}

function RankListModal({ mock, isOpen, onClose, role }: { mock: MockTest | null, isOpen: boolean, onClose: () => void, role?: string }) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(false);

    const now = new Date();
    // Non-admin users cannot see leaderboard during the live test window (Sat 00:00 - Sun 23:59)
    const isWithinLiveWindow = mock && now >= mock.startDate && now <= mock.endDate;
    const isLeaderboardBlocked = isWithinLiveWindow && role !== 'admin';

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isOpen && mock && !isLeaderboardBlocked) {
            setLoading(true);
            const fetchLeaderboard = () => {
                fetch(`/api/mock-test/live/leaderboard?testId=${mock.id}&limit=7`)
                    .then(res => res.json())
                    .then(data => {
                        setLeaderboard(data.leaderboard || []);
                    })
                    .catch(err => console.error(err))
                    .finally(() => setLoading(false));
            };

            fetchLeaderboard();
            
            // 20-second polling for admin during live period
            if (role === 'admin' && mock.status === 'live') {
                intervalId = setInterval(fetchLeaderboard, 20000); // 20 seconds polling
            }
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isOpen, mock, role, isLeaderboardBlocked]);

    // Helper to mask email: bhu***dra***17@gmail.com
    const maskEmail = (email: string) => {
        if (!email) return "";
        const [local, domain] = email.split('@');
        if (!local || local.length < 3) return email; // Too short to mask nicely

        // Show first 3 chars, mask middle, show last 2 chars of local part if possible
        const start = local.substring(0, 3);
        const end = local.length > 5 ? local.substring(local.length - 2) : "";
        const maskedLocal = `${start}***${end}`;

        return `${maskedLocal}@${domain}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md w-[95%] rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-5 md:p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-50"></div>

                    <Trophy className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 text-white drop-shadow-md" />
                    <DialogTitle className="text-xl md:text-2xl font-black uppercase tracking-tight text-white drop-shadow-sm relative z-10">
                        {mock && mock.status === 'live' && role === 'admin' ? 'Live Leaderboard' : 'Top 7 Rank Holders'}
                    </DialogTitle>
                    <p className="text-amber-100 font-medium text-[10px] md:text-sm relative z-10">
                        {mock ? `${mock.title} (${format(mock.startDate, 'dd.MM')} - ${format(mock.endDate, 'dd.MM')})` : 'All India Weekly Mock Test'}
                    </p>
                </div>

                <div className="p-0 max-h-[60vh] overflow-y-auto">
                    {isLeaderboardBlocked ? (
                        <div className="py-14 flex flex-col items-center justify-center text-center px-6">
                            <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                                <Lock className="w-7 h-7 text-amber-500" />
                            </div>
                            <h3 className="font-black text-zinc-800 dark:text-zinc-100 text-base mb-2">Leaderboard is Live!</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                The leaderboard is being monitored exclusively by the Admin during the live test window.
                            </p>
                            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-3 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-xl border border-amber-100 dark:border-amber-800">
                                🏆 Top 7 Rankers will be revealed after the live test concludes
                            </p>
                        </div>
                    ) : loading ? (
                        <div className="py-12 flex flex-col items-center justify-center text-zinc-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-2 text-amber-500" />
                            Loading Champions...
                        </div>
                    ) : leaderboard.length === 0 ? (
                        <div className="py-12 text-center text-zinc-500 p-6">
                            No ranks generated yet. Be the first!
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {leaderboard.map((user, idx) => (
                                <div key={idx} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-base md:text-lg shadow-sm shrink-0
                                        ${idx === 0 ? 'bg-yellow-100 text-yellow-600 ring-2 md:ring-4 ring-yellow-50' :
                                            idx === 1 ? 'bg-slate-100 text-slate-600 ring-2 md:ring-4 ring-slate-50' :
                                                idx === 2 ? 'bg-orange-100 text-orange-600 ring-2 md:ring-4 ring-orange-50' :
                                                    'bg-zinc-100 text-zinc-500'
                                        }
                                    `}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100 truncate">
                                            {user.userName}
                                        </h4>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-indigo-600 dark:text-indigo-400 text-base md:text-lg">{user.score}</div>
                                        <div className="text-[9px] font-bold text-zinc-400 uppercase">Marks</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 text-center border-t border-zinc-100 dark:border-zinc-800">
                    <button onClick={onClose} className="text-sm font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                        Close Leaderboard
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function AnswerSheetModal({ mock, attempts, isOpen, onClose, onDownload, isDownloading }: {
    mock: MockTest | null,
    attempts: any[],
    isOpen: boolean,
    onClose: () => void,
    onDownload: (mock: MockTest, result: any) => void,
    isDownloading: string | null
}) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md w-[95%] rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0">
                <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20"></div>
                    <FileDown className="w-12 h-12 mb-3 text-white drop-shadow-md mx-auto" />
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-sm text-center relative z-10">
                        Your Attempts
                    </DialogTitle>
                    <p className="text-indigo-100 font-medium text-sm text-center relative z-10 border-t border-white/20 pt-2 mt-2">
                        {mock?.title}
                    </p>
                </div>

                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    {attempts.length === 0 ? (
                        <div className="py-12 flex flex-col items-center text-center px-4">
                            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                                <History className="w-8 h-8 text-zinc-400" />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">No Previous Attempts</h3>
                            <p className="text-sm text-zinc-500 mb-6">You haven't attempted this mock test yet.</p>
                            <Link 
                                href={`/mock-tests/weekly/${mock?.id}`}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20"
                            >
                                <PlayCircle className="w-5 h-5" /> Attempt Now
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {attempts.map((attempt, idx) => (
                                <div key={attempt._id || idx} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 group hover:border-indigo-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 font-bold text-zinc-500">
                                            {attempts.length - idx}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                                                {idx === attempts.length - 1 ? 'Live Attempt' : `Re-attempt ${attempts.length - 1 - idx}`}
                                            </h4>
                                            <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5 font-bold uppercase tracking-wider">
                                                <Calendar className="w-3 h-3" />
                                                {format(new Date(attempt.submittedAt), 'dd MMM yyyy, hh:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right hidden sm:block">
                                            <div className="font-black text-indigo-600 dark:text-indigo-400">{attempt.score}/{attempt.totalQuestions * 2}</div>
                                            <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Score</div>
                                        </div>
                                        <button
                                            onClick={() => mock && onDownload(mock, attempt)}
                                            disabled={isDownloading === mock?.id}
                                            className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                                        >
                                            <FileDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                    <button onClick={onClose} className="w-full py-3 text-sm font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function TargetIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function FileTextIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
    );
}

// ===== PS GROUP B MOCK TEST PAGE COMPONENT =====
function PsgbMockTestPage({
    isMobileApp,
    membershipLevel,
    planName,
    paidTests: initialPaidTests,
    userEmail,
    userName,
    role,
    onSwitchToLdceIp
}: {
    isMobileApp: boolean;
    membershipLevel: 'free' | 'silver' | 'gold';
    planName: string | null;
    paidTests: string[];
    userEmail: string | null;
    userName: string;
    role: string;
    onSwitchToLdceIp: () => void;
}) {
    const [paidTests, setPaidTests] = useState<string[]>(initialPaidTests);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [selectedMock, setSelectedMock] = useState<MockTest | null>(null);
    const [selectedMockForRank, setSelectedMockForRank] = useState<MockTest | null>(null);
    const [selectedMockForSheets, setSelectedMockForSheets] = useState<MockTest | null>(null);
    const [userResults, setUserResults] = useState<Record<string, any>>({});
    const [userAttempts, setUserAttempts] = useState<Record<string, any[]>>({});
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [showDownloadNotification, setShowDownloadNotification] = useState(false);
    const [enrollmentCounts, setEnrollmentCounts] = useState<Record<string, number>>({});
    const [universalCount, setUniversalCount] = useState(0);
    const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
    const [enrollmentList, setEnrollmentList] = useState<any[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);
    const [selectedTestForEnrollment, setSelectedTestForEnrollment] = useState<string>("");

    useEffect(() => {
        if (showDownloadNotification) {
            const timer = setTimeout(() => setShowDownloadNotification(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showDownloadNotification]);

    useEffect(() => {
        if (userEmail) {
            fetch('/api/mock-test/user-results', {
                method: 'POST',
                body: JSON.stringify({ email: userEmail })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.results) setUserResults(data.results);
                    if (data.attempts) setUserAttempts(data.attempts);
                    const serverPaid = data.enrolledTests || [];
                    const allPaid = Array.from(new Set([...initialPaidTests, ...serverPaid]));
                    setPaidTests(allPaid);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('paid_mock_tests', allPaid.join(','));
                    }
                })
                .catch(err => console.error('Error fetching results', err));
        }
        fetch('/api/admin/mock-test/counts')
            .then(res => res.json())
            .then(data => {
                setEnrollmentCounts(data.counts || {});
                setUniversalCount(data.universalCount || 0);
            })
            .catch(() => {});
    }, [userEmail, initialPaidTests]);

    // Generate mock tests from PS Gr B schedule
    const psgbMockTests = useMemo(() => {
        const now = new Date();
        return PSGB_MOCK_SCHEDULE.map(week => {
            const satDate = new Date(week.saturdayDate + 'T00:00:00');
            let sunDate = endOfDay(new Date(week.sundayDate + 'T00:00:00'));
            
            if (week.week === 5) {
                sunDate = new Date(2026, 4, 4, 23, 59, 59); // 04.05.2026 @ 23:59
            }

            const testId = `psgb-mock-${week.sundayDate}`;
            const isAdmin = role === 'admin';
            const isWeek01 = week.week === 1;
            const isWeek02 = week.week === 2;
            const isWeek03 = week.week === 3;
            const isWeek04 = week.week === 4;
            const isWeek05 = week.week === 5;
            const isWeek06 = week.week === 6;
            const isWeek07 = week.week === 7;

            let status: 'live' | 'upcoming' | 'completed' = 'upcoming';
            const isPublicLive = now >= satDate && now <= sunDate;
            const isPast = now > sunDate;

            if (isPast) {
                status = 'completed';
            } else if (isPublicLive || (isAdmin && (isWeek01 || isWeek02 || isWeek03 || isWeek04 || isWeek05 || isWeek06 || isWeek07))) {
                status = 'live';
            }

            const isSelectedMock = week.week >= 9 && week.week <= 14;
            return {
                id: testId,
                title: `PS Gr B - Weekly Mock Test ${week.week.toString().padStart(2, '0')}`,
                topics: week.topics,
                startDate: satDate,
                endDate: sunDate,
                status,
                questionCount: isSelectedMock ? 100 : 50,
                marks: isSelectedMock ? 200 : 100,
                duration: isSelectedMock ? 120 : 60
            } as MockTest;
        });
    }, [role]);

    const activeMocks = psgbMockTests.filter(m => m.status === 'live');
    const upcomingMocks = psgbMockTests.filter(m => {
        if (m.status !== 'upcoming') return false;
        if (role === 'admin') return true;
        
        // Show all upcoming PSGB mock cards to all users (Free, Silver, Gold).
        // Free users will see an 'Enroll' button; Silver/Gold and those who paid will see 'View Details' or 'Locked'.
        return true;
    });
    const completedMocks = psgbMockTests.filter(m => m.status === 'completed').reverse();

    const handleMockClick = (mock: MockTest) => {
        if (!userEmail) {
            window.location.href = '/login';
            return;
        }
        setSelectedMock(mock);
    };

    const handleEnroll = async (mock: MockTest) => {
        if (!userEmail) {
            alert("Please log in to enroll.");
            window.location.href = '/login';
            return;
        }
        setProcessingId(mock.id);
        try {
            const orderRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 99,
                    email: userEmail,
                    plan: { id: mock.id, name: mock.title, type: 'mock_test' }
                })
            });
            if (!orderRes.ok) throw new Error("Order creation failed");
            const order = await orderRes.json();
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Dak Guru",
                description: `Enrollment: ${mock.title}`,
                image: "/dak-guru-round.png",
                order_id: order.id,
                callback_url: `${window.location.origin}/api/payment/callback?to=/mock-tests&testId=${mock.id}`,
                redirect: false,
                handler: async function (response: any) {
                    const verifyRes = await fetch('/api/mock-test/enroll/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            email: userEmail,
                            testId: mock.id,
                            testTitle: mock.title,
                            userName: userName
                        })
                    });
                    if (verifyRes.ok) {
                        const newPaid = [...paidTests, mock.id];
                        setPaidTests(Array.from(new Set(newPaid)));
                        localStorage.setItem('paid_mock_tests', Array.from(new Set(newPaid)).join(','));
                        alert("Enrollment Successful!");
                    } else {
                        alert("Payment verification failed.");
                    }
                },
                prefill: { name: userName, email: userEmail },
                theme: { color: "#7c3aed" },
                modal: { ondismiss: () => setProcessingId(null) }
            };
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Enrollment Error:", error);
            alert("Enrollment failed.");
            setProcessingId(null);
        }
    };

    const handleDownloadAnalytics = async (mock: MockTest, result: any) => {
        if (!result) return;
        setDownloadingId(mock.id);
        try {
            const questions = TEST_QUESTIONS_MAP[mock.id];
            if (!questions) { alert("Question data not found."); return; }
            await generateMockTestAnswerSheetPDF({
                userName, score: result.score, totalQuestions: result.totalQuestions,
                questions, answers: result.answers || {}, testName: mock.title,
                submittedAt: result.submittedAt,
                testSchedule: `${format(mock.startDate, 'dd-MMM-yyyy')} to ${format(mock.endDate, 'dd-MMM-yyyy')}`,
                testTopics: mock.topics
            });
            setShowDownloadNotification(true);
        } catch (error) {
            console.error("PDF Gen Error", error);
            alert("Failed to generate PDF");
        } finally {
            setDownloadingId(null);
        }
    };

    const handleViewEnrollments = async (mock: MockTest) => {
        setSelectedTestForEnrollment(mock.title);
        setEnrollmentModalOpen(true);
        setLoadingEnrollments(true);
        try {
            const res = await fetch(`/api/admin/mock-test/enrollments?testId=${mock.id}`);
            if (res.ok) {
                const data = await res.json();
                setEnrollmentList(data.enrollments);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingEnrollments(false);
        }
    };

    return (
        <AppScreenWrapper hideStatusBarPadding={true} scrollableContent={false}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {!isMobileApp && (
                <HomeHeader isLoggedIn={!!userEmail} membershipLevel={membershipLevel as any} />
            )}

            {/* ===== HERO ===== */}
            {isMobileApp ? (
                // Mobile App — Native Android Material 3 Inspired Compact Top App Bar
                <div className="sticky top-0 z-20 shrink-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/80 shadow-sm">
                    <div className="px-4 pt-[max(12px,calc(env(safe-area-inset-top,0px)+6px))] pb-3 flex items-center gap-3">
                        <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors -ml-1">
                            <ArrowLeft className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-[17px] font-black text-zinc-900 dark:text-zinc-100 leading-none tracking-tight flex items-center gap-1.5 animate-in fade-in slide-in-from-left-4 duration-300">
                                Mock Tests
                                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">PSGB 2026</span>
                            </h1>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">PS Group B Structured Series</p>
                        </div>
                        <button
                            onClick={onSwitchToLdceIp}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold active:scale-95 transition-transform"
                        >
                            <Sparkles className="w-3 h-3" />
                            LDCE IP
                        </button>
                    </div>
                </div>
            ) : (
                <div className="relative shrink-0 min-h-[320px] md:min-h-[400px] bg-[#0a0a0f] overflow-hidden isolate">
                    {/* Animated gradient mesh background */}
                    <div className="absolute inset-0">
                        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }}></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tl from-orange-500/25 via-rose-500/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
                        <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
                        <div className="absolute bottom-[10%] left-[15%] w-[300px] h-[300px] bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
                    </div>

                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

                    {/* Floating accent orbs */}
                    <div className="absolute top-20 left-[10%] w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_15px_5px_rgba(139,92,246,0.4)] animate-bounce" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute top-32 right-[15%] w-1.5 h-1.5 bg-fuchsia-400 rounded-full shadow-[0_0_12px_4px_rgba(232,121,249,0.4)] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                    <div className="absolute bottom-24 left-[25%] w-1 h-1 bg-orange-400 rounded-full shadow-[0_0_10px_3px_rgba(251,146,60,0.4)] animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
                    <div className="absolute bottom-16 right-[30%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_5px_rgba(34,211,238,0.3)] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>

                    {/* Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 md:pt-6 md:pb-8 text-center">
                        {/* Back button - glass style */}
                        <div className="flex justify-center w-full mb-4 md:mb-4">
                            <Link href="/" className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 text-sm backdrop-blur-sm">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                <span className="font-medium">Back to Home</span>
                            </Link>
                        </div>

                        {/* Live badge */}
                        {activeMocks.length > 0 && (
                            <div className="mb-4">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                    </span>
                                    LIVE NOW
                                </div>
                            </div>
                        )}

                        {/* Subtitle badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></span>
                            All India Weekly Mock Test Series
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-3 md:mb-4 leading-[1.05]">
                            <span className="block">Mock Test Series</span>
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-fuchsia-400 to-violet-400" style={{ WebkitBackgroundClip: 'text' }}>
                                PS Group B 2026
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-zinc-400/90 max-w-xl mx-auto mb-4 leading-relaxed font-medium">
                            16-week structured test series aligned with the official study plan.
                            <span className="text-zinc-500 block mt-1">Compete with aspirants across India & track your progress.</span>
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
                            {[
                                { icon: <Calendar className="w-5 h-5" />, label: '16 Weeks', sub: 'Schedule', color: 'from-violet-500/20 to-violet-500/5', iconColor: 'text-violet-400', borderColor: 'border-violet-500/20' },
                                { icon: <AlertCircle className="w-5 h-5" />, label: '50-100 MCQs', sub: 'Per Test', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400', borderColor: 'border-blue-500/20' },
                                { icon: <Clock className="w-5 h-5" />, label: '60-120 Min', sub: 'Duration', color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400', borderColor: 'border-emerald-500/20' },
                                { icon: <Trophy className="w-5 h-5" />, label: 'Top 7', sub: 'All India Rank', color: 'from-amber-500/20 to-amber-500/5', iconColor: 'text-amber-400', borderColor: 'border-amber-500/20' },
                            ].map((stat, idx) => (
                                <div key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} backdrop-blur-md hover:scale-105 transition-transform duration-300 min-w-[140px]`}>
                                    <div className={`${stat.iconColor} shrink-0`}>{stat.icon}</div>
                                    <div className="text-left">
                                        <div className="text-sm font-black text-white leading-tight">{stat.label}</div>
                                        <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{stat.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Switch button — Animated border-glow */}
                        <button
                            onClick={onSwitchToLdceIp}
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                        >
                            {/* Animated gradient border */}
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 p-[2px]" style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 3s ease infinite' }}>
                                <span className="flex h-full w-full rounded-full bg-[#0e0e18] group-hover:bg-[#151525] transition-colors duration-300"></span>
                            </span>
                            {/* Glow */}
                            <span className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.25),0_0_40px_rgba(56,189,248,0.1)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.4),0_0_50px_rgba(56,189,248,0.15)] transition-shadow duration-300"></span>
                            {/* Content */}
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                            </span>
                            <span className="relative text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">Switch to LDCE IP Mock Tests</span>
                            <ChevronRight className="w-4 h-4 relative text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>

                    {/* Bottom gradient border */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none"></div>
                </div>
            )}

            {/* ===== CONTENT ===== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
                <div className="space-y-12 w-full">

                    {/* Attractive Marquee Notification */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-white shadow-lg rounded-xl sm:rounded-2xl border border-white/10 mb-4 mx-0 sm:mx-0 w-full max-w-full">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                        <div className="w-full flex items-center h-[2.75rem] sm:h-12 relative z-10 overflow-hidden">
                            <div className="flex-shrink-0 w-auto bg-white/20 backdrop-blur-md px-3 sm:px-4 h-full flex items-center justify-center z-20 shadow-xl border-r border-white/10">
                                <span className="font-black text-[10px] sm:text-sm tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap">
                                    <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-yellow-400"></span>
                                    </span>
                                    Why Top 7?
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden h-full flex items-center group cursor-default ml-2 sm:ml-4">
                                <div className="animate-scroll-mobile sm:animate-scroll flex items-center whitespace-nowrap min-w-max">
                                    {/* Block 1 */}
                                    <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 font-medium text-[11px] sm:text-xs md:text-base tracking-wide text-white/95 group-hover:text-white transition-colors">
                                        <span className="inline-block mx-2 sm:mx-4 shrink-0">★</span>
                                        <span className="shrink-0">To simulate a real PS Group B vacancy scenario, only Top 7 ranks are published. Assume 7 vacancies and prepare to secure your place. Best Wishes ~ Team Dak Guru</span>
                                    </div>
                                    {/* Block 2 (Duplicate for Seamless Loop) */}
                                    <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 font-medium text-[11px] sm:text-xs md:text-base tracking-wide text-white/95 group-hover:text-white transition-colors">
                                        <span className="inline-block mx-2 sm:mx-4 shrink-0">★</span>
                                        <span className="shrink-0">To simulate a real PS Group B vacancy scenario, only Top 7 ranks are published. Assume 7 vacancies and prepare to secure your place. Best Wishes ~ Team Dak Guru</span>
                                    </div>
                                </div>

                                {/* Gradient Overlays for Smooth Fade Effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-violet-600 to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-violet-600 to-transparent z-10 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                    {completedMocks.length > 0 && (
                        <div className="flex justify-center -mt-2 mb-4 relative z-20 w-full px-1">
                            <a
                                href="#previous-tests"
                                className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 bg-white dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-600 dark:text-zinc-300 rounded-[14px] sm:rounded-full shadow-lg border border-zinc-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all active:scale-95 text-[11px] sm:text-sm font-bold w-full sm:w-auto overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
                            >
                                <span className="flex h-2 w-2 relative shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                                </span>
                                <span className="truncate">Looking for Previous PSGB Mock Tests? Click Here</span>
                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 rotate-[270deg] shrink-0 group-hover:translate-y-1 transition-transform" />
                            </a>
                        </div>
                    )}

                    {/* LIVE TESTS */}
                    {activeMocks.length > 0 && (
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                Live Now
                            </h2>
                            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {activeMocks.map(mock => (
                                    <MockTestCard
                                        key={mock.id}
                                        mock={mock}
                                        onClick={() => handleMockClick(mock)}
                                        isPaid={paidTests.includes(mock.id)}
                                        membershipLevel={membershipLevel}
                                        displayMembership={getDisplayMembership(membershipLevel, planName)}
                                        onEnroll={() => handleEnroll(mock)}
                                        isProcessing={processingId === mock.id}
                                        role={role}
                                        onViewEnrollments={() => handleViewEnrollments(mock)}
                                        enrollmentCount={enrollmentCounts[mock.id] || (mock.id.startsWith('psgb-mock') ? 102 : universalCount)}
                                        onShowRankList={() => setSelectedMockForRank(mock)}
                                        userResult={userResults[mock.id]}
                                        onDownloadResult={() => handleDownloadAnalytics(mock, userResults[mock.id])}
                                        onViewSheets={() => setSelectedMockForSheets(mock)}
                                        isDownloading={downloadingId === mock.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* UPCOMING SCHEDULE */}
                    {upcomingMocks.length > 0 && (
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-[2rem] opacity-20 blur-md group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-white dark:bg-zinc-950 rounded-[1.9rem] p-6 md:p-10 shadow-2xl overflow-hidden ring-1 ring-zinc-900/5 dark:ring-white/10">
                                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                        <div>
                                            <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-400 flex items-center gap-3">
                                                <Calendar className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                                                Complete Schedule
                                            </h2>
                                            <p className="mt-2 text-zinc-500 dark:text-zinc-400 font-medium">
                                                16-week weekly test schedule aligned with the PS Gr B study plan.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            <span className="font-bold text-zinc-700 dark:text-zinc-300 text-sm">
                                                {upcomingMocks.length} Upcoming Tests
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid gap-5 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                        {upcomingMocks.map(mock => (
                                            <MockTestCard
                                                key={mock.id}
                                                mock={mock}
                                                onClick={() => handleMockClick(mock)}
                                                isPaid={paidTests.includes(mock.id)}
                                                membershipLevel={membershipLevel}
                                                displayMembership={getDisplayMembership(membershipLevel, planName)}
                                                onEnroll={() => handleEnroll(mock)}
                                                isProcessing={processingId === mock.id}
                                                role={role}
                                                onViewEnrollments={() => handleViewEnrollments(mock)}
                                                enrollmentCount={enrollmentCounts[mock.id] || (mock.id.startsWith('psgb-mock') ? 102 : universalCount)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* COMPLETED TESTS */}
                    {completedMocks.length > 0 && (
                        <div id="previous-tests" className="opacity-100 mb-12 scroll-mt-24">
                            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 px-4 md:px-8 flex items-center gap-3">
                                <History className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" />
                                Previous Tests
                            </h2>
                            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
                                {completedMocks.map(mock => (
                                    <MockTestCard
                                        key={mock.id}
                                        mock={mock}
                                        onClick={() => handleMockClick(mock)}
                                        isPaid={paidTests.includes(mock.id)}
                                        membershipLevel={membershipLevel}
                                        displayMembership={getDisplayMembership(membershipLevel, planName)}
                                        onEnroll={() => handleEnroll(mock)}
                                        enrollmentCount={enrollmentCounts[mock.id] || universalCount}
                                        onShowRankList={() => setSelectedMockForRank(mock)}
                                        onViewSheets={() => setSelectedMockForSheets(mock)}
                                        userResult={userResults[mock.id]}
                                        onDownloadResult={() => handleDownloadAnalytics(mock, userResults[mock.id])}
                                        isDownloading={downloadingId === mock.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Why Attempt Section */}
                <div className="mt-12 md:mt-16 text-center">
                    <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Why Attempt Mock Tests?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-8">
                        <div className="p-5 md:p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-violet-600 dark:text-violet-400">
                                <Timer className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">Time Management</h3>
                            <p className="text-sm text-zinc-500">Practice completing the exam within the stipulated time limit.</p>
                        </div>
                        <div className="p-5 md:p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-fuchsia-600 dark:text-fuchsia-400">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">Performance Analysis</h3>
                            <p className="text-sm text-zinc-500">Get detailed insights into your strong and weak areas.</p>
                        </div>
                        <div className="p-5 md:p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">All India Ranking</h3>
                            <p className="text-sm text-zinc-500">Know where you stand among thousands of other aspirants.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MODALS ===== */}
            <Dialog open={!!selectedMock} onOpenChange={(open) => !open && setSelectedMock(null)}>
                <DialogContent className="max-w-2xl w-[95%] max-h-[85vh] overflow-y-auto rounded-2xl">
                    {selectedMock && (
                        <MockTestDetail
                            mock={selectedMock}
                            membershipLevel={membershipLevel}
                            isPaid={paidTests.includes(selectedMock.id)}
                            onEnroll={() => handleEnroll(selectedMock)}
                            isProcessing={processingId === selectedMock.id}
                            role={role}
                            userResult={userResults[selectedMock.id]}
                            onDownloadResult={() => handleDownloadAnalytics(selectedMock, userResults[selectedMock.id])}
                            onViewSheets={() => {
                                setSelectedMock(null);
                                setSelectedMockForSheets(selectedMock);
                            }}
                            isDownloading={downloadingId === selectedMock.id}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={enrollmentModalOpen} onOpenChange={setEnrollmentModalOpen}>
                <DialogContent className="max-w-4xl w-[95%] max-h-[85vh] overflow-hidden flex flex-col rounded-2xl p-0 bg-white dark:bg-zinc-900">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50">
                        <div>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                                <Users className="w-5 h-5 text-violet-600" /> Enrollments
                            </DialogTitle>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                Users enrolled for <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedTestForEnrollment}</span>
                            </p>
                        </div>
                        <div className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-bold">
                            Total: {enrollmentList.length}
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-0">
                        {loadingEnrollments ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-violet-600 mb-2" />
                                <span className="text-sm text-zinc-500">Loading enrollment data...</span>
                            </div>
                        ) : enrollmentList.length > 0 ? (
                            <div className="w-full">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400 w-16">S.No</th>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400">User Name</th>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400">Phone</th>
                                            <th className="px-6 py-3 font-semibold text-zinc-500 dark:text-zinc-400">Payment Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                                        {enrollmentList.map((user, idx) => (
                                            <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                                                <td className="px-6 py-3 text-zinc-500">{user.serialNo}</td>
                                                <td className="px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100">{user.name}</td>
                                                <td className="px-6 py-3 text-zinc-600 dark:text-zinc-300">{user.mobile}</td>
                                                <td className="px-6 py-3 text-zinc-600 dark:text-zinc-300">
                                                    {user.dateOfPayment ? format(new Date(user.dateOfPayment), 'dd MMM yyyy') : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-20 text-center text-zinc-500">No enrollments found for this test.</div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <RankListModal
                mock={selectedMockForRank}
                isOpen={!!selectedMockForRank}
                onClose={() => setSelectedMockForRank(null)}
                role={role}
            />

            <AnswerSheetModal
                mock={selectedMockForSheets}
                attempts={selectedMockForSheets ? userAttempts[selectedMockForSheets.id] || [] : []}
                isOpen={!!selectedMockForSheets}
                onClose={() => setSelectedMockForSheets(null)}
                onDownload={handleDownloadAnalytics}
                isDownloading={downloadingId}
            />

            {/* Download Notification */}
            {showDownloadNotification && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-600/20 z-[100] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-white/20 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold">Answer Sheet Downloaded</p>
                        <p className="text-xs text-emerald-100">Check your Downloads Folder</p>
                    </div>
                </div>
            )}
        </AppScreenWrapper>
    );
}
