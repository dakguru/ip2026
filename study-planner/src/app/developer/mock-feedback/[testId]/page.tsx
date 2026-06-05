"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Users, Gauge, FileText, BookOpen, ThumbsUp, Search, Loader2, Shield, MessageSquare } from "lucide-react";

interface FeedbackEntry {
    _id: string;
    userName: string;
    userEmail: string;
    overallRating: number;
    difficultyRating: number;
    contentQuality: number;
    explanationQuality: number;
    favoriteTopics: string[];
    suggestions: string;
    wouldRecommend: boolean;
    submittedAt: string;
}

interface PageProps {
    params: Promise<{ testId: string }>;
}

export default function MockFeedbackDetailPage({ params }: PageProps) {
    const { testId } = use(params);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
    const [stats, setStats] = useState<any>(null);

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
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [testId]);

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/mock-test/feedback?testId=${testId}`);
            const data = await res.json();
            if (data.feedbacks) setFeedbacks(data.feedbacks);
            if (data.stats) setStats(data.stats);
        } catch (e) {
            console.error("Failed to fetch feedback data", e);
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
                <Link href="/" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold mt-4">Return Home</Link>
            </div>
        );
    }

    // Compute distribution
    const ratingDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const diffDist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const topicCounts: Record<string, number> = {};

    feedbacks.forEach(f => {
        ratingDist[f.overallRating as keyof typeof ratingDist]++;
        diffDist[f.difficultyRating as keyof typeof diffDist]++;
        f.favoriteTopics?.forEach(t => {
            topicCounts[t] = (topicCounts[t] || 0) + 1;
        });
    });

    const maxRatingCount = Math.max(...Object.values(ratingDist), 1);
    const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
    const maxTopicCount = sortedTopics.length > 0 ? sortedTopics[0][1] : 1;

    const filteredFeedbacks = feedbacks.filter(f => 
        f.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getDifficultyText = (val: number) => {
        if (val <= 1.5) return "Very Easy";
        if (val <= 2.5) return "Easy";
        if (val <= 3.5) return "Moderate";
        if (val <= 4.5) return "Hard";
        return "Very Hard";
    };

    const getDifficultyColor = (val: number) => {
        if (val <= 2.5) return "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800";
        if (val <= 3.5) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
        return "text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/developer/mock-feedback" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        {testId} Analytics
                    </h1>
                </div>

                {stats?.count === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 p-12 rounded-2xl text-center border border-zinc-200 dark:border-zinc-800">
                        <MessageSquare className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No feedback yet</h3>
                        <p className="text-zinc-500">Wait for aspirants to attempt the test and submit their reviews.</p>
                    </div>
                ) : (
                    <>
                        {/* Section 1: Aggregate Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
                                <Users className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats?.count}</div>
                                <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Responses</div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-center shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats?.avgOverall?.toFixed(1)}</div>
                                <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Avg Overall</div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
                                <Gauge className="w-5 h-5 text-purple-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats?.avgDifficulty?.toFixed(1)}</div>
                                <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Difficulty</div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
                                <FileText className="w-5 h-5 text-cyan-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats?.avgContent?.toFixed(1)}</div>
                                <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Content Qual</div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
                                <BookOpen className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats?.avgExplanation?.toFixed(1)}</div>
                                <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Exp. Qual</div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 text-center shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                                <ThumbsUp className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats?.recommendPct}%</div>
                                <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Recommend</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Section 2: Rating Distribution */}
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-6">Rating Distribution</h3>
                                <div className="space-y-3">
                                    {[5, 4, 3, 2, 1].map((stars) => {
                                        const count = ratingDist[stars as keyof typeof ratingDist];
                                        const pct = (count / maxRatingCount) * 100;
                                        const colors = {
                                            5: "bg-emerald-500", 4: "bg-green-400", 3: "bg-yellow-400", 2: "bg-orange-400", 1: "bg-red-500"
                                        };
                                        return (
                                            <div key={stars} className="flex items-center gap-3">
                                                <div className="w-8 text-sm font-medium text-zinc-500 flex items-center gap-1">
                                                    {stars}<Star className="w-3 h-3" />
                                                </div>
                                                <div className="flex-1 h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${colors[stars as keyof typeof colors]}`} style={{ width: `${pct}%` }} />
                                                </div>
                                                <div className="w-8 text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">{count}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Section 3: Topic Popularity */}
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-6">Favorite Topics</h3>
                                {sortedTopics.length === 0 ? (
                                    <p className="text-zinc-500 text-sm">No topics selected yet.</p>
                                ) : (
                                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {sortedTopics.map(([topic, count]) => (
                                            <div key={topic} className="flex items-center justify-between gap-4">
                                                <div className="text-sm text-zinc-700 dark:text-zinc-300 truncate flex-1" title={topic}>{topic}</div>
                                                <div className="flex items-center gap-2 w-1/3">
                                                    <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${(count / maxTopicCount) * 100}%` }} />
                                                    </div>
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 w-4 text-right">{count}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 4: Individual Feedbacks */}
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Individual Feedback ({filteredFeedbacks.length})</h2>
                            <div className="relative w-64">
                                <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Search user..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredFeedbacks.map((f) => (
                                <div key={f._id} className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center text-lg">
                                                {f.userName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-zinc-900 dark:text-zinc-100">{f.userName}</div>
                                                <div className="text-xs text-zinc-500">{f.userEmail}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-zinc-400 text-right">
                                            {new Date(f.submittedAt).toLocaleDateString()}<br/>
                                            {new Date(f.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-0.5">Overall</span>
                                            <div className="flex gap-0.5">
                                                {[1,2,3,4,5].map(s => (
                                                    <Star key={s} className={`w-3.5 h-3.5 ${s <= f.overallRating ? 'text-amber-500 fill-amber-500' : 'text-zinc-300 dark:text-zinc-700'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-0.5">Content</span>
                                            <div className="flex gap-0.5">
                                                {[1,2,3,4,5].map(s => (
                                                    <Star key={s} className={`w-3.5 h-3.5 ${s <= f.contentQuality ? 'text-blue-500 fill-blue-500' : 'text-zinc-300 dark:text-zinc-700'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-0.5">Explanation</span>
                                            <div className="flex gap-0.5">
                                                {[1,2,3,4,5].map(s => (
                                                    <Star key={s} className={`w-3.5 h-3.5 ${s <= f.explanationQuality ? 'text-indigo-500 fill-indigo-500' : 'text-zinc-300 dark:text-zinc-700'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="ml-auto">
                                            <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-0.5 text-right">Difficulty</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getDifficultyColor(f.difficultyRating)}`}>
                                                {getDifficultyText(f.difficultyRating)}
                                            </span>
                                        </div>
                                    </div>

                                    {f.favoriteTopics && f.favoriteTopics.length > 0 && (
                                        <div className="mb-4">
                                            <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1.5">Favorite Topics</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {f.favoriteTopics.map(t => (
                                                    <span key={t} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded text-xs border border-zinc-200 dark:border-zinc-700">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {f.suggestions && (
                                        <div className="mb-4 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-3 rounded-xl">
                                            <span className="text-[10px] uppercase font-bold text-amber-600/70 dark:text-amber-500/70 block mb-1">Suggestions</span>
                                            <p className="text-sm text-zinc-800 dark:text-zinc-200 italic">"{f.suggestions}"</p>
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg ${f.wouldRecommend ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20' : 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800'}`}>
                                            <ThumbsUp className={`w-3.5 h-3.5 ${!f.wouldRecommend && 'rotate-180'}`} />
                                            {f.wouldRecommend ? 'Would Recommend' : 'Would Not Recommend'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {filteredFeedbacks.length === 0 && (
                                <div className="text-center py-8 text-zinc-500">No feedback matches your search.</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
