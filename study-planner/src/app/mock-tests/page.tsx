"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Trophy, Users, PlayCircle, AlertCircle, CheckCircle2, Timer, Lock, X, Info } from "lucide-react";
import { FULL_SCHEDULE } from "@/data/schedule";
import { format, isBefore, isSameDay, addDays, startOfToday, eachDayOfInterval, parse } from "date-fns";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

export default function MockTestsPage() {
    const mockTests = useMemo(() => {
        const mocks: MockTest[] = [];
        const today = startOfToday();

        // Convert FULL_SCHEDULE to a Map for easy lookup by date
        const planMap = new Map();
        FULL_SCHEDULE.forEach(item => {
            planMap.set(item.date, item);
        });

        let currentDate = new Date(2026, 0, 17); // Start from Jan 17, 2026 (Saturday)
        const endDate = new Date(2026, 4, 10);   // Extend till end of schedule (approx May for provided data)

        let mockCount = 1;

        while (currentDate <= endDate) {
            const saturdayDate = currentDate;
            const sundayDate = addDays(saturdayDate, 1);

            // Get topics from CURRENT week (Monday to Friday before this Saturday)
            // Example: For Sat Jan 17, take Jan 12 (Mon) to Jan 16 (Fri)
            // Note: Jan 14 is start, so for first week it will just pick up Jan 14, 15, 16

            const mondayDate = addDays(saturdayDate, -5);
            const fridayDate = addDays(saturdayDate, -1);

            const weekTopics: string[] = [];

            // Iterate through each day of the study week
            const interval = eachDayOfInterval({ start: mondayDate, end: fridayDate });

            interval.forEach(d => {
                const dateStr = format(d, 'dd-MM-yyyy'); // Match format in FULL_SCHEDULE (e.g. 14-01-2026)
                const item = planMap.get(dateStr);

                // Only add valid topics, ignoring revisions/breaks
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

            // Push Mock Test
            // Only push if we have topics OR if it's the first one (which might have partial topics)
            // Actually, we should just push all scheduled Saturdays to maintain continuity
            if (weekTopics.length > 0 || mockCount === 1) { // Ensure at least first one shows even if partial
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

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 transition-colors">
            {/* Hero Section */}
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

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm font-medium text-zinc-300">
                        <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-zinc-800/50 rounded-full backdrop-blur-sm border border-zinc-700">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span>1000+ Aspirants</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full backdrop-blur-sm border border-zinc-700">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span>All India Rank</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full backdrop-blur-sm border border-zinc-700">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span>Latest Pattern</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Test Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="space-y-12">

                    {activeMocks.length > 0 && (
                        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {activeMocks.map(mock => (
                                <MockTestCard key={mock.id} mock={mock} onClick={() => setSelectedMock(mock)} />
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
                                        <MockTestCard key={mock.id} mock={mock} onClick={() => setSelectedMock(mock)} />
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
                                    <MockTestCard key={mock.id} mock={mock} onClick={() => setSelectedMock(mock)} />
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
                    {selectedMock && <MockTestDetail mock={selectedMock} />}
                </DialogContent>
            </Dialog>

        </div>
    );
}

function MockTestDetail({ mock }: { mock: MockTest }) {
    const isLive = mock.status === 'live';

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
                    <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2">
                        <PlayCircle className="w-6 h-6" /> Start Test Now
                    </button>
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

function MockTestCard({ mock, onClick }: { mock: MockTest, onClick: () => void }) {
    const isLive = mock.status === 'live';
    const isExpired = mock.status === 'expired';

    return (
        <div onClick={onClick} className={`cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl border shadow-sm md:shadow-lg overflow-hidden hover:transform hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full
            ${isLive ? 'border-red-500 shadow-red-500/20' : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50'}
        `}>
            <div className={`px-4 py-2 flex justify-between items-center border-b
                ${isLive ? 'bg-red-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'}
            `}>
                <span className={`text-xs font-bold uppercase tracking-wider
                    ${isLive ? 'text-white' : 'text-zinc-500'}
                `}>
                    {isLive ? 'Live Now' : isExpired ? 'Ended' : 'Upcoming'}
                </span>
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
                    <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 mr-3 text-zinc-400" />
                        <span>{mock.questionCount} Questions • {mock.marks} Marks</span>
                    </div>
                </div>

                {isLive ? (
                    <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2">
                        <PlayCircle className="w-5 h-5" /> Attempt Now
                    </button>
                ) : isExpired ? (
                    <button className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
                        View Result
                    </button>
                ) : (
                    <button className="w-full py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                        View Details
                    </button>
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
