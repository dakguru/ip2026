"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, PenSquare, Filter, MessageCircle, Star, Sparkles } from 'lucide-react';
import { NativePostItem } from './NativePostItem';
import { WriteArticleModal } from '@/components/WriteArticleModal'; // Reusing existing modals
import { DMModal } from '@/components/DMModal';

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
                        {["All", "Success Stories", "My Posts", "Saved"].map(tab => (
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

            {/* Ask Question Widget (Collapsed State) */}
            {!isAskOpen && (
                <div className="mx-4 mt-4 mb-4">
                    <div
                        onClick={() => setIsAskOpen(true)}
                        className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-3 active:scale-98 transition-transform"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <PenSquare className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Have a doubt?</p>
                            <p className="text-xs text-zinc-400">Ask the community...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Ask Input Expanded */}
            {isAskOpen && (
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

            {/* Feed Content */}
            <div className="px-4 space-y-4">
                {getFilteredPosts().length > 0 ? (
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
