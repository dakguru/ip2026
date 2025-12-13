"use client";

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, Search, FolderOpen, FileText, Grid, List, Filter } from "lucide-react";

export default function NotesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState('All');

    const TABS = ['All', 'Paper I', 'Paper II', 'Paper III', 'Acts', 'Rules'];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
            {/* Header Section */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Home
                            </Link>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                Library
                            </h1>
                        </div>

                        <div className="flex-1 max-w-md px-8 hidden md:block">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search manuals, acts, rules..."
                                    className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs Scrollable */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-0 -mb-px custom-scrollbar hide-scrollbar">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content (Empty State) */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Empty State Illustration */}
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 relative group cursor-pointer hover:scale-105 transition-transform">
                        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
                        <FolderOpen className="w-10 h-10 text-zinc-400 dark:text-zinc-600 group-hover:text-blue-500 transition-colors" />
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-lg">
                            <PlusIcon className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No Notes Found</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-8">
                        Select a category or add new PDF notes to get started with your repository.
                    </p>
                    <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5">
                        Upload New Note
                    </button>
                </div>

            </main>
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
