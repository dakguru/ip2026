"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Trophy, Users, PlayCircle, AlertCircle, CheckCircle2, Timer, Lock, X, Info, Sparkles, Loader2, ChevronRight } from "lucide-react";
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
    status: 'live' | 'upcoming' | 'expired';
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
            let status: 'live' | 'upcoming' | 'expired' = 'upcoming';

            if ((isSameDay(today, saturdayDate) || isSameDay(today, sundayDate))) {
                status = 'live';
            } else if (isBefore(today, saturdayDate)) {
                status = 'upcoming';
            } else {
                status = 'expired';
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
    const previousMocks = mockTests.filter(m => m.status === 'expired').reverse();

    // Dialog State
    const [selectedMock, setSelectedMock] = useState<MockTest | null>(null);

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

                    {previousMocks.length > 0 && (
                        <div className="opacity-75">
                            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 px-4 md:px-8 flex items-center gap-3">
                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" />
                                Previous Tests
                            </h2>
                            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
                                {previousMocks.map(mock => (
                                    <MockTestCard
                                        key={mock.id}
                                        mock={mock}
                                        onClick={() => setSelectedMock(mock)}
                                        isPaid={true} // Previous tests always viewable/result (or handle appropriately)
                                        membershipLevel={membershipLevel}
                                        onEnroll={() => { }}
                                        enrollmentCount={enrollmentCounts[mock.id] || universalCount}
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

        </div>
    );
}


function MockTestDetail({ mock, membershipLevel, isPaid, onEnroll, isProcessing }: {
    mock: MockTest;
    membershipLevel: string;
    isPaid: boolean;
    onEnroll: () => void;
    isProcessing?: boolean;
}) {
    const isLive = mock.status === 'live';
    const isExempt = membershipLevel === 'gold' || membershipLevel === 'silver';
    const canAccess = isExempt || isPaid;

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
                    Scheduled for <span className="font-bold text-zinc-900 dark:text-zinc-100">{format(mock.startDate, 'MMMM dd, yyyy')}</span> to <span className="font-bold text-zinc-900 dark:text-zinc-100">{format(mock.endDate, 'MMMM dd, yyyy')}</span>.
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
                        <Info className="w-4 h-4 text-purple-500" /> Syllabus Covered
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
                        <AlertCircle className="w-4 h-4 text-amber-500" /> Rules & Regulations
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
                        <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2">
                            <PlayCircle className="w-6 h-6" /> Start Test Now
                        </button>
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
                        {mock.status === 'expired' ? 'Test Ended' : 'Test Not Yet Active'}
                    </button>
                )}
            </div>
        </>
    );
}


function MockCountdown({ targetDate }: { targetDate: Date }) {
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

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

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
    enrollmentCount
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
}) {
    const isLive = mock.status === 'live';
    const isExpired = mock.status === 'expired';
    const isUpcoming = mock.status === 'upcoming';
    const isExempt = membershipLevel === 'gold' || membershipLevel === 'silver';
    const canAccess = isExempt || isPaid;

    return (
        <div onClick={onClick} className={`cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl border shadow-sm md:shadow-lg overflow-hidden hover:transform hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full
            ${isLive ? 'border-red-500 shadow-red-500/20' : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50'}
        `}>
            {/* Header */}
            <div className={`px-4 py-2 flex justify-between items-center border-b
                ${isLive ? 'bg-red-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'}
            `}>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider
                        ${isLive ? 'text-white' : 'text-zinc-500'}
                    `}>
                        {isLive ? 'Live Now' : isExpired ? 'Ended' : 'Upcoming'}
                    </span>

                    {/* Enrollment Count - Global Visibility */}
                    <div className="flex items-center gap-1.5 ml-1">
                        <Users className={`w-3.5 h-3.5 ${isLive ? 'text-white' : 'text-zinc-400'}`} />
                        <span className={`text-[11px] font-bold ${isLive ? 'text-white' : 'text-zinc-500'}`}>
                            {enrollmentCount || 0}
                        </span>

                        {role === 'admin' && onViewEnrollments && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewEnrollments();
                                }}
                                className={`p-1 rounded hover:bg-black/10 transition-colors ml-0.5`}
                                title="View Enrolled Users"
                            >
                                <ChevronRight className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
                <span className={`text-xs font-bold
                    ${isLive ? 'text-white' : 'text-blue-600'}
                `}>
                    {format(mock.startDate, 'MMM dd')} - {format(mock.endDate, 'dd')}
                </span>
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl
                        ${isLive ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}
                    `}>
                        <FileTextIcon className="w-8 h-8" />
                    </div>
                    {/* Membership Badge if Included */}
                    {isExempt && (
                        <div className="px-2 py-1 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] font-bold rounded shadow-sm">
                            {membershipLevel === 'gold' ? 'GOLD' : 'SILVER'} ACCESS
                        </div>
                    )}
                    {/* Paid Enrolled Badge - Explicitly for paid users */}
                    {isPaid && !isExempt && (
                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full border border-green-200 dark:border-green-800 flex items-center gap-1 shadow-sm animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="w-3 h-3" />
                            PAID & ENROLLED
                        </div>
                    )}
                </div>

                <h3 className={`text-xl font-bold mb-2 transition-colors
                    ${isLive ? 'text-zinc-900 dark:text-zinc-100 group-hover:text-red-600' : 'text-zinc-900 dark:text-zinc-100'}
                `}>
                    {mock.title}
                </h3>

                <div className="mb-6 flex-1">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Syllabus Covered</p>
                    <ul className="space-y-1">
                        {mock.topics.slice(0, 3).map((topic, idx) => (
                            <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-300 flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0"></span>
                                <span className="line-clamp-1">{topic}</span>
                            </li>
                        ))}
                        {mock.topics.length > 3 && (
                            <li className="text-xs text-zinc-400 pl-3">
                                + {mock.topics.length - 3} more topics
                            </li>
                        )}
                    </ul>
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
                        <Clock className="w-4 h-4 mr-3 text-zinc-400" />
                        <span>{mock.duration} Minutes</span>
                    </div>
                </div>

                {isLive ? (
                    canAccess ? (
                        <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2">
                            <PlayCircle className="w-5 h-5" /> Attempt Now
                        </button>
                    ) : (
                        <button
                            onClick={(e) => { e.stopPropagation(); onEnroll(); }}
                            disabled={isProcessing}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/50 flex items-center justify-center gap-2 animate-pulse"
                        >
                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300 fill-current" />}
                            Enroll Now - ₹49
                        </button>
                    )
                ) : isExpired ? (
                    <button className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
                        View Result
                    </button>
                ) : (
                    // Upcoming Logic
                    canAccess ? (
                        <button className="w-full py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            <MockCountdown targetDate={mock.startDate} />
                        </button>
                    ) : (
                        <button
                            onClick={(e) => { e.stopPropagation(); onEnroll(); }}
                            disabled={isProcessing}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/50 flex items-center justify-center gap-2"
                        >
                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300 fill-current" />}
                            Enroll Now - ₹49
                        </button>
                    )
                )}
            </div>
        </div>
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
