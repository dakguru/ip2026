"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, PenSquare, Filter, MessageCircle, Star, Sparkles } from 'lucide-react';
import { NativePostItem } from './NativePostItem';
import { WriteArticleModal } from '@/components/WriteArticleModal'; // Reusing existing modals
import { DMModal } from '@/components/DMModal';
import ErrorReportForm from '@/components/social/ErrorReportForm';
import { useRouter } from 'next/navigation';

// Simplified Mobile Feed
export default function NativeSocialFeed({
    posts,
    user,
    onFetchPosts,
    onAskQuestion,
    savedPostIds,
    onSavePost,
    onDeletePost
}: {
    posts: any[],
    user: any,
    onFetchPosts: () => void,
    onAskQuestion: (text: string, details: string) => void,
    savedPostIds: number[],
    onSavePost: (id: number) => void,
    onDeletePost: (id: number) => void
}) {
    const [activeTab, setActiveTab] = useState("All");
    const [isAskOpen, setIsAskOpen] = useState(false);
    const [questionInput, setQuestionInput] = useState("");
    const [detailsInput, setDetailsInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const [isReportMode, setIsReportMode] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [errorReports, setErrorReports] = useState<any[]>([]);
    const [loadingReports, setLoadingReports] = useState(false);

    const fetchErrorReports = async () => {
        setLoadingReports(true);
        try {
            const res = await fetch('/api/community/error-reports');
            if (res.ok) setErrorReports(await res.json());
        } catch (e) { console.error(e); } finally { setLoadingReports(false); }
    };

    useEffect(() => { fetchErrorReports(); }, []);

    // Admin helpers
    const isUserAdmin = (u: typeof user) => {
        if (!u) return false;
        const r = u.role?.toLowerCase() || "";
        const n = u.name?.toLowerCase() || "";
        return r.includes('admin') || n.includes('admin') || r.includes('mentor');
    };
    const [mobileReplyingTo, setMobileReplyingTo] = useState<string | null>(null);
    const [mobileReplyText, setMobileReplyText] = useState("");

    const handleMobileResolve = async (id: string) => {
        try {
            await fetch('/api/community/error-reports', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reportId: id, status: 'resolved' }) });
            fetchErrorReports();
        } catch (e) { console.error(e); }
    };
    const handleMobileDelete = async (id: string) => {
        if (!confirm('Delete this error report?')) return;
        try {
            await fetch(`/api/community/error-reports?id=${id}`, { method: 'DELETE' });
            fetchErrorReports();
        } catch (e) { console.error(e); }
    };
    const handleMobileReply = async (id: string) => {
        if (!mobileReplyText.trim()) return;
        try {
            await fetch('/api/community/error-reports', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reportId: id, adminReply: mobileReplyText.trim() }) });
            setMobileReplyingTo(null); setMobileReplyText("");
            fetchErrorReports();
        } catch (e) { console.error(e); }
    };


    // Filter Posts
    const getFilteredPosts = () => {
        let filtered = posts;

        if (activeTab === "Success Stories") {
            filtered = posts.filter(p => p.tags && p.tags.includes("Success Story"));
        } else if (activeTab === "My Posts") {
            filtered = posts.filter(p => p.author === user?.name);
        } else if (activeTab === "Saved") {
            filtered = posts.filter(p => savedPostIds.includes(p.id));
        }

        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(lower) ||
                p.description?.toLowerCase().includes(lower) ||
                p.tags?.some((t: string) => t.toLowerCase().includes(lower))
            );
        }

        return filtered;
    };

    const handleMobileAsk = () => {
        if (!questionInput.trim()) return;
        onAskQuestion(questionInput, detailsInput);
        setQuestionInput("");
        setDetailsInput("");
        setIsAskOpen(false);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
            {/* Mobile Header: Compact & Modern */}
            <div className="sticky top-0 z-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 pt-[env(safe-area-inset-top)] px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">DG Community</h1>
                    <div className="flex gap-2">
                        <button
                            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                            onClick={() => setActiveTab("Search")} // Or toggle search input
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        {user && (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
                                {user.name[0]}
                            </div>
                        )}
                    </div>
                </div>

                {/* Horizontal Scrollable Tabs */}
                <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
                    <div className="flex gap-2">
                        {["All", "Success Stories", "Error Reports", "My Posts", "Saved"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === tab
                                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md transform scale-105'
                                    : 'bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ask / Report Widget (Collapsed State) */}
            {!isAskOpen && (
                <div className="mx-4 mt-4 mb-4 flex gap-2">
                    <div
                        onClick={() => { setIsReportMode(false); setIsAskOpen(true); }}
                        className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <PenSquare className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="font-bold text-xs text-zinc-800 dark:text-zinc-200">Discuss</p>
                            <p className="text-[10px] text-zinc-400">Ask a doubt</p>
                        </div>
                    </div>
                    <div
                        onClick={() => { setIsReportMode(true); setIsAskOpen(true); }}
                        className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                            <Star className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="font-bold text-xs text-zinc-800 dark:text-zinc-200">Report Error</p>
                            <p className="text-[10px] text-zinc-400">Found a mistake?</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Ask Input / Report Error Expanded */}
            {isAskOpen && !isReportMode && (
                <div className="mx-4 mt-4 mb-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-5 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Ask Question</h3>
                        <button onClick={() => setIsAskOpen(false)} className="text-zinc-400 hover:text-zinc-900 text-sm font-medium">Cancel</button>
                    </div>
                    <textarea
                        value={questionInput}
                        onChange={(e) => setQuestionInput(e.target.value)}
                        placeholder="What's on your mind? (e.g., Syllabus query, Exam date...)"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 border-none resize-none"
                        autoFocus
                    />
                    <textarea
                        value={detailsInput}
                        onChange={(e) => setDetailsInput(e.target.value)}
                        placeholder="Add details (optional)..."
                        className="w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 border-none resize-none"
                    />
                    <button
                        onClick={handleMobileAsk}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
                    >
                        Post Question
                    </button>
                </div>
            )}
            {isAskOpen && isReportMode && (
                <div className="mx-4 mt-4 mb-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center px-5 pt-5">
                        <h3 className="font-bold text-lg">Report Error</h3>
                        <button onClick={() => setIsAskOpen(false)} className="text-zinc-400 hover:text-zinc-900 text-sm font-medium">Cancel</button>
                    </div>
                    <ErrorReportForm user={user} onLoginRedirect={() => router.push('/login')} onSuccess={() => { fetchErrorReports(); setIsAskOpen(false); }} />
                </div>
            )}

            {/* Feed Content */}
            <div className="px-4 space-y-4">
                {activeTab === "Error Reports" ? (
                    loadingReports ? (
                        <div className="text-center py-20 text-zinc-400">
                            <div className="w-8 h-8 border-2 border-zinc-300 border-t-orange-500 rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-sm">Loading error reports...</p>
                        </div>
                    ) : errorReports.length > 0 ? (
                        errorReports.map((report: any) => (
                            <div key={report._id} className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-bold text-xs shrink-0">
                                        {report.reportedBy?.[0] || "?"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{report.reportedBy}</span>
                                            <span className="text-xs text-zinc-400">{new Date(report.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${report.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {report.status === 'resolved' ? '✅ Resolved' : '⏳ Pending'}
                                            </span>
                                        </div>
                                        <div className="flex gap-1.5 mb-2 flex-wrap">
                                            <span className="px-1.5 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold">{report.category}</span>
                                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium">{report.topic}</span>
                                        </div>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300">{report.description}</p>
                                        {report.screenshot && (
                                            <img src={report.screenshot} alt="" className="mt-2 max-w-full rounded-lg border border-zinc-200" />
                                        )}
                                        {/* Admin Reply Display */}
                                        {report.adminReply && (
                                            <div className="mt-2 p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                                <div className="flex items-center gap-1 mb-0.5">
                                                    <span className="bg-blue-100 text-blue-700 text-[9px] px-1 py-0.5 rounded font-bold">Admin</span>
                                                    <span className="text-[10px] font-semibold text-blue-700">Reply</span>
                                                </div>
                                                <p className="text-xs text-blue-800 dark:text-blue-200">{report.adminReply}</p>
                                            </div>
                                        )}
                                        {/* Action Buttons */}
                                        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                                            {/* Admin-only: Resolve + Reply */}
                                            {isUserAdmin(user) && (
                                                <>
                                                    {report.status !== 'resolved' && (
                                                        <button onClick={() => handleMobileResolve(report._id)} className="px-2.5 py-1 bg-green-500 text-white rounded-lg text-[10px] font-bold">✅ Resolve</button>
                                                    )}
                                                    <button onClick={() => { setMobileReplyingTo(mobileReplyingTo === report._id ? null : report._id); setMobileReplyText(report.adminReply || ""); }} className="px-2.5 py-1 bg-blue-500 text-white rounded-lg text-[10px] font-bold">💬 {report.adminReply ? 'Edit' : 'Reply'}</button>
                                                </>
                                            )}
                                            {/* Delete: Admin or Owner */}
                                            {user && (isUserAdmin(user) || user.email === report.reportedByEmail || user.name === report.reportedBy) && (
                                                <button onClick={() => handleMobileDelete(report._id)} className="px-2.5 py-1 bg-red-500 text-white rounded-lg text-[10px] font-bold">🗑️ Delete</button>
                                            )}
                                        </div>
                                        {mobileReplyingTo === report._id && (
                                            <div className="mt-2 flex gap-1.5">
                                                <input type="text" value={mobileReplyText} onChange={(e) => setMobileReplyText(e.target.value)} placeholder="Admin reply..." className="flex-1 border border-zinc-300 rounded-lg px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-800" onKeyDown={(e) => { if (e.key === 'Enter') handleMobileReply(report._id); }} />
                                                <button onClick={() => handleMobileReply(report._id)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Send</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-zinc-400">
                            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">No error reports yet.</p>
                        </div>
                    )
                ) : getFilteredPosts().length > 0 ? (
                    getFilteredPosts().map((post) => (
                        <NativePostItem
                            key={post.id}
                            post={post}
                            currentUser={user}
                            onSave={onSavePost}
                            isSaved={savedPostIds.includes(post.id)}
                            onDelete={onDeletePost}
                            onRefresh={onFetchPosts}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 text-zinc-400">
                        <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p className="text-sm">No posts found.</p>
                    </div>
                )}
            </div>

            {/* FAB for Success Story or DM (Optional) */}
            <div className="fixed bottom-24 right-4 z-10 flex flex-col gap-3">
                <button className="w-12 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-xl flex items-center justify-center active:scale-90 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
