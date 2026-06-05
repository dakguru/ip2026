"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, MessageSquare, ThumbsUp, Loader2, Shield } from "lucide-react";

// Test data mapping
const SERIES_II_TESTS = [
    { id: 'mock-s2-2026-06-06', title: "Weekly Mock Test - S2-02", date: "Jun 6-7, 2026" },
    { id: 'mock-s2-2026-06-13', title: "Weekly Mock Test - S2-03", date: "Jun 13-14, 2026" },
    { id: 'mock-s2-2026-06-20', title: "Weekly Mock Test - S2-04", date: "Jun 20-21, 2026" },
    { id: 'mock-s2-2026-06-27', title: "Weekly Mock Test - S2-05", date: "Jun 27-28, 2026" },
    { id: 'mock-s2-2026-07-04', title: "Weekly Mock Test - S2-06", date: "Jul 4-5, 2026" },
    { id: 'mock-s2-2026-07-11', title: "Weekly Mock Test - S2-07", date: "Jul 11-12, 2026" },
    { id: 'mock-s2-2026-07-18', title: "Weekly Mock Test - S2-08", date: "Jul 18-19, 2026" },
    { id: 'mock-s2-2026-07-25', title: "Weekly Mock Test - S2-09", date: "Jul 25-26, 2026" },
    { id: 'mock-s2-2026-08-01', title: "Weekly Mock Test - S2-10", date: "Aug 1-2, 2026" },
    { id: 'mock-s2-2026-08-08', title: "Weekly Mock Test - S2-11", date: "Aug 8-9, 2026" },
    { id: 'mock-s2-2026-08-15', title: "Weekly Mock Test - S2-12", date: "Aug 15-16, 2026" },
    { id: 'mock-s2-2026-08-22', title: "Weekly Mock Test - S2-13", date: "Aug 22-23, 2026" },
    { id: 'mock-s2-2026-08-29', title: "Weekly Mock Test - S2-14", date: "Aug 29-30, 2026" },
    { id: 'mock-s2-2026-09-05', title: "Weekly Mock Test - S2-15", date: "Sep 5-6, 2026" }
];

const PSGB_TESTS = [
    { id: 'psgb-mock-2026-06-07', title: "PS Gr B - Weekly Mock Test 10", date: "Jun 6-7, 2026" },
    { id: 'psgb-mock-2026-06-14', title: "PS Gr B - Weekly Mock Test 11", date: "Jun 13-14, 2026" },
    { id: 'psgb-mock-2026-06-21', title: "PS Gr B - Weekly Mock Test 12", date: "Jun 20-21, 2026" },
    { id: 'psgb-mock-2026-06-28', title: "PS Gr B - Weekly Mock Test 13", date: "Jun 27-28, 2026" },
    { id: 'psgb-mock-2026-07-05', title: "PS Gr B - Weekly Mock Test 14", date: "Jul 4-5, 2026" }
];

export default function MockFeedbackDashboard() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'s2' | 'psgb'>('s2');
    const [statsMap, setStatsMap] = useState<Record<string, any>>({});
    
    useEffect(() => {
        // Admin check
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
        let isUserAdmin = false;
        if (cookie) {
            try {
                const session = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
                isUserAdmin = session.role === 'admin';
            } catch (e) { console.error(e); }
        }
        setIsAdmin(isUserAdmin);
        
        if (isUserAdmin) {
            fetchStats();
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchStats = async () => {
        try {
            const allTests = [...SERIES_II_TESTS, ...PSGB_TESTS];
            const promises = allTests.map(async (test) => {
                const res = await fetch(`/api/mock-test/feedback?testId=${test.id}`);
                const data = await res.json();
                return { id: test.id, stats: data.stats || { count: 0, avgOverall: 0, recommendPct: 0 } };
            });
            
            const results = await Promise.all(promises);
            const map: Record<string, any> = {};
            results.forEach(r => { map[r.id] = r.stats; });
            setStatsMap(map);
        } catch (e) {
            console.error("Failed to fetch stats", e);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
                <Shield className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Access Restricted</h1>
                <p className="text-zinc-500 mb-6">You do not have permission to view developer mock feedback.</p>
                <Link href="/" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold">Return Home</Link>
            </div>
        );
    }

    const currentTests = activeTab === 's2' ? SERIES_II_TESTS : PSGB_TESTS;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Developer CMS
                    </Link>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        Mock Test Feedback
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">Analyze aspirant feedback, ratings, and suggestions across all live tests.</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-xl w-max mb-8 border border-zinc-200 dark:border-zinc-800">
                    <button 
                        onClick={() => setActiveTab('s2')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 's2' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                    >
                        LDCE IP Series II
                    </button>
                    <button 
                        onClick={() => setActiveTab('psgb')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'psgb' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                    >
                        PS Group B
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentTests.map(test => {
                        const stats = statsMap[test.id] || { count: 0, avgOverall: 0, recommendPct: 0 };
                        const hasFeedback = stats.count > 0;
                        
                        return (
                            <Link 
                                href={`/developer/mock-feedback/${test.id}`} 
                                key={test.id}
                                className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{test.title}</h3>
                                        <p className="text-sm text-zinc-500 mt-1">{test.date}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${hasFeedback ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                                        {stats.count} Responses
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 border border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            Avg Rating
                                        </div>
                                        <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                                            {hasFeedback ? stats.avgOverall.toFixed(1) : '-'}
                                        </div>
                                    </div>
                                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 border border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                                            <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                                            Recommend
                                        </div>
                                        <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                                            {hasFeedback ? `${stats.recommendPct}%` : '-'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
