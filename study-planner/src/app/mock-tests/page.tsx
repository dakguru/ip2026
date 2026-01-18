"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Trophy, Users, PlayCircle, AlertCircle, CheckCircle2, Timer, Lock, X, Info, Sparkles, Loader2, ChevronRight, History } from "lucide-react";
import { FULL_SCHEDULE } from "@/data/schedule";
import { format, isBefore, isSameDay, addDays, startOfToday, eachDayOfInterval } from "date-fns";
import { useMemo, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import Script from "next/script";

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
    const [membershipLevel, setMembershipLevel] = useState<'free' | 'silver' | 'gold'>('free');
    const [paidTests, setPaidTests] = useState<string[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("Aspirant");
    const [role, setRole] = useState<string>("user");
    const [processingId, setProcessingId] = useState<string | null>(null);

    // Admin Enrollment View State
    const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
    const [enrollmentList, setEnrollmentList] = useState<any[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);
    const [selectedTestForEnrollment, setSelectedTestForEnrollment] = useState<string>("");
    const [enrollmentCounts, setEnrollmentCounts] = useState<Record<string, number>>({});
    const [universalCount, setUniversalCount] = useState(0);

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
                if (session.email) setUserEmail(session.email);
                if (session.name) setUserName(session.name);
                if (session.membershipLevel) setMembershipLevel(session.membershipLevel);
                if (session.role) setRole(session.role);
            } catch (e) {
                console.error("Session parse error");
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
            const sundayDate = addDays(saturdayDate, 1);

            const mondayDate = addDays(saturdayDate, -5);
            const fridayDate = addDays(saturdayDate, -1);

            const weekTopics: string[] = [];

            // Iterate through each day of the study week
            const interval = eachDayOfInterval({ start: mondayDate, end: fridayDate });

            interval.forEach(d => {
                const dateStr = format(d, 'dd-MM-yyyy');
                const item = planMap.get(dateStr);

                if (item && item.subTopic && !item.subTopic.toLowerCase().includes("revision") && !item.day.toLowerCase().includes("sunday")) {
                    const cleanTopic = item.subTopic.trim();
                    if (!weekTopics.includes(cleanTopic)) {
                        weekTopics.push(cleanTopic);
                    }
                }
            });

            // Determine Status
            let status: 'live' | 'upcoming' | 'completed' = 'upcoming';

            if ((isSameDay(today, saturdayDate) || isSameDay(today, sundayDate))) {
                status = 'live';
            } else if (isBefore(today, saturdayDate)) {
                status = 'upcoming';
            } else {
                status = 'completed';
            }

            if (weekTopics.length > 0 || mockCount === 1) {
                mocks.push({
                    id: `mock-${format(saturdayDate, 'yyyy-MM-dd')}`,
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
    }, []);

    const activeMocks = mockTests.filter(m => m.status === 'live');
    const upcomingMocks = mockTests.filter(m => m.status === 'upcoming');
    const completedMocks = mockTests.filter(m => m.status === 'completed').reverse();

    // Dialog State
    const [selectedMock, setSelectedMock] = useState<MockTest | null>(null);
    const [selectedMockForRank, setSelectedMockForRank] = useState<MockTest | null>(null);

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
                    amount: 49,
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
                handler: async function (response: any) {
                    // 2. Verify Payment via server
                    try {
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
                            const newPaidList = [...paidTests, mock.id];
                            setPaidTests(newPaidList);
                            localStorage.setItem('paid_mock_tests', newPaidList.join(','));
                            alert("Enrollment Successful! You can now access this test when it goes live.");
                            fetchEnrollmentCounts(); // Refresh counts
                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    } catch (e) {
                        console.error(e);
                        alert("Error verifying payment");
                    }
                    setProcessingId(null);
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

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 transition-colors">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {/* Hero Section */}
            {isMobileApp ? (
                // Mobile App Optimized Hero (Compact & Beautiful)
                <div className="relative bg-zinc-950 border-b border-zinc-900 overflow-hidden pt-4 pb-8">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-0 w-40 h-40 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"></div>
                    </div>

                    <div className="relative z-10 px-5">
                        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-300 mb-4 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="ml-1 text-sm font-medium">Back</span>
                        </Link>

                        <div className="flex flex-col items-center text-center">
                            {/* Live Badge */}
                            {activeMocks.length > 0 && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-[10px] mb-4">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                    </span>
                                    LIVE NOW
                                </div>
                            )}

                            <h1 className="text-3xl font-black text-white leading-tight mb-2">
                                All India Mock Tests
                                <span className="block text-2xl mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    LDCE IP 2026
                                </span>
                            </h1>

                            <p className="text-sm text-zinc-400 max-w-xs mx-auto mb-6 leading-relaxed">
                                Compete globally. Real-time ranking.
                            </p>

                            {/* CTA Button - Enhanced */}
                            <Link href="/mock-tests/live" className="w-full max-w-[280px] group relative inline-flex items-center justify-center p-[1px] mb-6 overflow-hidden rounded-xl">
                                <span className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity"></span>
                                <span className="relative w-full py-3 bg-zinc-900 rounded-[11px] flex items-center justify-center gap-2 group-hover:bg-opacity-0 transition-all">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    <span className="font-bold text-white text-sm">Attempt Live Sample Test</span>
                                    <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                                </span>
                            </Link>

                            {/* Stats Grid - Compact */}
                            <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
                                <div className="flex flex-col items-center justify-center p-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                    <Users className="w-4 h-4 text-blue-400 mb-1" />
                                    <span className="text-[10px] font-bold text-white">1000+</span>
                                    <span className="text-[9px] text-zinc-500">Aspirants</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                    <Trophy className="w-4 h-4 text-yellow-400 mb-1" />
                                    <span className="text-[10px] font-bold text-white">Rank</span>
                                    <span className="text-[9px] text-zinc-500">All India</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                    <Clock className="w-4 h-4 text-green-400 mb-1" />
                                    <span className="text-[10px] font-bold text-white">Latest</span>
                                    <span className="text-[9px] text-zinc-500">Pattern</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Original Desktop/Web Hero
                <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center">
                        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 md:mb-8 transition-colors text-sm md:text-base">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                        </Link>

                        {activeMocks.length > 0 && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs md:text-sm mb-6 animate-pulse">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                LIVE NOW
                            </div>
                        )}

                        <h1 className="text-3xl md:text-6xl font-extrabold text-white tracking-tight mb-4 md:mb-6 leading-tight">
                            All India Mock Tests <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                for LDCE IP 2026
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 md:mb-10 px-2 leading-relaxed">
                            Compete with aspirants across India. Real-time ranking, detailed analysis, and exam-like environment.
                        </p>

                        <div className="flex justify-center mb-10 w-full animate-in zoom-in duration-500">
                            <Link href="/mock-tests/live" className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-2xl hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                <span className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white transition-all duration-300"></span>
                                <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-zinc-900 rounded-[14px] group-hover:bg-opacity-0 flex items-center gap-3">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:text-white">Attempt Free Sample Test</span>
                                    <ArrowLeft className="w-5 h-5 text-white rotate-180 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Test Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="space-y-12">

                    {activeMocks.length > 0 && (
                        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {activeMocks.map(mock => (
                                <MockTestCard
                                    key={mock.id}
                                    mock={mock}
                                    onClick={() => setSelectedMock(mock)}
                                    isPaid={paidTests.includes(mock.id)}
                                    membershipLevel={membershipLevel}
                                    onEnroll={() => handleEnroll(mock)}
                                    isProcessing={processingId === mock.id}
                                    role={role}
                                    onViewEnrollments={() => handleViewEnrollments(mock)}
                                    enrollmentCount={enrollmentCounts[mock.id] || universalCount}
                                    onShowRankList={() => setSelectedMockForRank(mock)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Revamped Schedule Section */}
                    <div className="relative group">
                        {/* Animated Gradient Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-[2rem] opacity-30 blur-md group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                        <div className="relative bg-white dark:bg-zinc-950 rounded-[1.9rem] p-6 md:p-10 shadow-2xl overflow-hidden ring-1 ring-zinc-900/5 dark:ring-white/10">

                            {/* Decorative Background Blobs */}
                            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <div>
                                        <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-400 flex items-center gap-3">
                                            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                            Complete Schedule
                                        </h2>
                                        <p className="mt-2 text-zinc-500 dark:text-zinc-400 font-medium">
                                            Your roadmap to success. Stay consistent and track your progress.
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
                                            onClick={() => setSelectedMock(mock)}
                                            isPaid={paidTests.includes(mock.id)}
                                            membershipLevel={membershipLevel}
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

                    {completedMocks.length > 0 && (
                        <div className="opacity-75">
                            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 px-4 md:px-8 flex items-center gap-3">
                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" />
                                Previous Tests
                            </h2>
                            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
                                {completedMocks.map(mock => (
                                    <MockTestCard
                                        key={mock.id}
                                        mock={mock}
                                        onClick={() => setSelectedMock(mock)}
                                        isPaid={true} // Previous tests always viewable/result (or handle appropriately)
                                        membershipLevel={membershipLevel}
                                        onEnroll={() => { }}
                                        enrollmentCount={enrollmentCounts[mock.id] || universalCount}
                                        onShowRankList={() => setSelectedMockForRank(mock)}
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
            />

        </div>
    );
}


function MockTestDetail({ mock, membershipLevel, isPaid, onEnroll, isProcessing, role }: {
    mock: MockTest;
    membershipLevel: string;
    isPaid: boolean;
    onEnroll: () => void;
    isProcessing?: boolean;
    role?: string;
}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update time every minute to check for test activation
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const isTimeReached = currentTime >= mock.startDate;
    const isEnded = currentTime > mock.endDate;
    const isLive = mock.status === 'live' || (role === 'admin' && mock.id === 'mock-2026-01-17') || (isTimeReached && !isEnded);
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
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <FileTextIcon className="w-6 h-6" />
                    </span>
                    {mock.title}
                </DialogTitle>
                <DialogDescription className="text-base pt-2">
                    <div className="flex flex-col gap-2">
                        <span>Scheduled for <span className="font-bold text-zinc-900 dark:text-zinc-100">{format(mock.startDate, 'MMMM dd, yyyy')}</span> to <span className="font-bold text-zinc-900 dark:text-zinc-100">{format(mock.endDate, 'MMMM dd, yyyy')}</span>.</span>

                        {targetDate && !isEnded && (
                            <div className="inline-flex items-center gap-2 mt-1 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-fit">
                                <Timer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{timerLabel}</span>
                                <MockCountdown targetDate={targetDate} />
                            </div>
                        )}
                    </div>
                </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{mock.duration}</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Minutes</div>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{mock.questionCount}</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Questions</div>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{mock.marks}</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Marks</div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-purple-500" /> Test Topics
                    </h3>
                    <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-100 dark:border-purple-900/20">
                        <ul className="space-y-2">
                            {mock.topics.map((topic, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                                    <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                                    <span>{topic}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500" /> Test Instructions
                    </h3>
                    <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-900/20">
                        <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                            <li className="flex gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500">1.</span>
                                The test window is open from Saturday 00:00 AM to Sunday 11:59 PM. You can attempt the test at any time within this window.
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500">2.</span>
                                Once started, the timer cannot be paused. Ensure you have a stable internet connection.
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500">3.</span>
                                There is <strong>no negative marking</strong> for this test series.
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-amber-600 dark:text-amber-500">4.</span>
                                All India Rank will be generated on the following Monday at 10:00 AM.
                            </li>
                        </ul>
                    </div>
                </div>

                {isLive ? (
                    canAccess ? (
                        <Link href={`/mock-tests/weekly/${mock.id}`} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2">
                            <PlayCircle className="w-6 h-6" /> Start Test Now
                        </Link>
                    ) : (
                        <button
                            onClick={(e) => { e.stopPropagation(); onEnroll(); }}
                            disabled={isProcessing}
                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-500/50 flex items-center justify-center gap-2 transition-all transform active:scale-95 animate-pulse"
                        >
                            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-yellow-300 fill-current" />}
                            Enroll Now - ₹49
                        </button>
                    )
                ) : (
                    <button disabled className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                        <Lock className="w-5 h-5" />
                        {mock.status === 'completed' ? 'Test Completed' : (mock.status === 'expired' ? 'Test Ended' : 'Test Not Yet Active')}
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
    isPaid,
    onEnroll,
    isProcessing,
    role,
    onViewEnrollments,
    enrollmentCount,
    onShowRankList
}: {
    mock: MockTest;
    onClick: () => void;
    membershipLevel: string;
    isPaid: boolean;
    onEnroll: () => void;
    isProcessing?: boolean;
    role?: string;
    onViewEnrollments?: () => void;
    enrollmentCount?: number;
    onShowRankList?: () => void;
}) {
    const [isTimerExpired, setIsTimerExpired] = useState(false);
    const isLive = mock.status === 'live' || (role === 'admin' && mock.id === 'mock-2026-01-17') || isTimerExpired;
    const isCompleted = mock.status === 'completed';
    const isExempt = membershipLevel === 'gold' || membershipLevel === 'silver';
    const canAccess = isExempt || isPaid || role === 'admin';

    // Blue background for completed tests
    const cardBgClass = isCompleted
        ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50"
        : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800";

    return (
        <div
            onClick={onClick}
            className={`relative flex flex-col p-5 rounded-2xl shadow-sm border transition-all hover:shadow-lg group cursor-pointer ${cardBgClass}`}
        >

            {/* Live Indicator - ONLY if not completed */}
            {!isCompleted && isLive && (
                <div className="absolute top-4 right-4 animate-pulse">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>
            )}

            {/* Completed Indicator */}
            {isCompleted && (
                <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                </div>
            )}

            <div className="flex-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 pr-8">{mock.title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {mock.topics.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded-md font-medium border border-zinc-200 dark:border-zinc-700">
                            {t}
                        </span>
                    ))}
                    {mock.topics.length > 2 && (
                        <span className="text-xs text-zinc-400 px-1 py-1">+ {mock.topics.length - 2} more</span>
                    )}
                </div>

                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{mock.duration} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>{mock.questionCount} Qs</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mt-auto">
                {/* Top 7 Rank Holders Button */}
                {(isCompleted || role === 'admin') && onShowRankList && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onShowRankList(); }}
                        className="w-full py-2.5 bg-gradient-to-r from-amber-200 to-yellow-400 hover:from-amber-300 hover:to-yellow-500 dark:from-amber-700 dark:to-yellow-600 text-amber-900 dark:text-amber-100 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 mb-2 transition-all transform hover:scale-[1.02]"
                    >
                        <Trophy className="w-4 h-4" /> Top 7 Rank Holders
                    </button>
                )}

                {/* Main CTA */}
                <div className="flex gap-2">
                    {/* Admin: View Enrollments Button */}
                    {role === 'admin' && onViewEnrollments && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onViewEnrollments(); }}
                            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1"
                        >
                            <Users className="w-4 h-4" /> {enrollmentCount}
                        </button>
                    )}

                    {isCompleted ? (
                        canAccess ? (
                            <Link
                                href={`/mock-tests/weekly/${mock.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 py-3 bg-white dark:bg-zinc-800 border-2 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                            >
                                <History className="w-4 h-4" /> Reattempt
                            </Link>
                        ) : (
                            <button
                                onClick={(e) => { e.stopPropagation(); onEnroll(); }}
                                disabled={isProcessing}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
                            >
                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300 fill-current" />}
                                Unlock - ₹49
                            </button>
                        )
                    ) : (
                        <button
                            onClick={(e) => {
                                // This button's click will bubble up to the parent div's onClick,
                                // which opens the modal. No need for e.stopPropagation() here if the intent
                                // is for clicking this button to also open the modal.
                                // If it had a different action, we'd stop propagation.
                                // Since the parent div handles the primary click (opening details),
                                // and this button's purpose is to show status/trigger action,
                                // we let the parent handle the modal opening.
                            }}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-shadow shadow-md hover:shadow-lg
                                 ${isLive
                                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                                }
                             `}
                        // Removed disabled attribute so it is clickable and opens the modal
                        >
                            {isLive ? (
                                <>
                                    <PlayCircle className="w-4 h-4" /> Attempt Now
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" /> Upcoming
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function RankListModal({ mock, isOpen, onClose }: { mock: MockTest | null, isOpen: boolean, onClose: () => void }) {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && mock) {
            setLoading(true);
            fetch(`/api/mock-test/live/leaderboard?testId=${mock.id}&limit=7`)
                .then(res => res.json())
                .then(data => {
                    setLeaderboard(data.leaderboard || []);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [isOpen, mock]);

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
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-50"></div>

                    <Trophy className="w-12 h-12 mx-auto mb-3 text-white drop-shadow-md" />
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-sm relative z-10">
                        Top 7 Rank Holders
                    </DialogTitle>
                    <p className="text-amber-100 font-medium text-sm relative z-10">All India Weekly Mock Test</p>
                </div>

                <div className="p-0 max-h-[60vh] overflow-y-auto">
                    {loading ? (
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
                                <div key={idx} className="flex items-center gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-sm shrink-0
                                        ${idx === 0 ? 'bg-yellow-100 text-yellow-600 ring-4 ring-yellow-50' :
                                            idx === 1 ? 'bg-slate-100 text-slate-600 ring-4 ring-slate-50' :
                                                idx === 2 ? 'bg-orange-100 text-orange-600 ring-4 ring-orange-50' :
                                                    'bg-zinc-100 text-zinc-500'
                                        }
                                    `}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-2">
                                            {user.userName}
                                        </h4>
                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate font-mono mt-0.5">
                                            {maskEmail(user.userEmail)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-indigo-600 dark:text-indigo-400 text-lg">{user.score * 2}</div>
                                        <div className="text-[10px] font-bold text-zinc-400 uppercase">Marks</div>
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
