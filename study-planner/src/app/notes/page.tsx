"use client";

import { useState } from 'react';
import Link from "next/link";
import {
    Search,
    FileText,
    BookOpen,
    Bookmark,
    Clock,
    Filter,
    MoreVertical,
    Download,
    Share2,
    Star,
    ChevronRight,
    Library,
    Scale
} from "lucide-react";

export default function NotesPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = [
        { id: "All", label: "All Materials" },
        { id: "Manuals", label: "Postal Manuals" },
        { id: "Acts", label: "Acts & Rules" },
        { id: "Forms", label: "Official Forms" },
        { id: "Saved", label: "Saved" },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans pb-20 md:pb-0">

            {/* Top Decoration */}
            <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 pointer-events-none z-0" />

            {/* Header */}
            <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-zinc-200/50 dark:border-zinc-800/50 supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 py-4">

                        {/* Top Bar */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                    Study Material
                                </h1>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                                    Your complete digital library
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300">
                                    <Bookmark className="w-5 h-5" />
                                </button>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center text-xs font-bold text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-purple-500">
                                        OP
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-zinc-900 transition-all font-medium text-sm shadow-sm"
                                placeholder="Search for manuals, rules, or topics..."
                            />
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                                <button className="p-1.5 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <Filter className="w-4 h-4 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Categories Tab (Scrollable) */}
                    <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-zinc-100 dark:border-zinc-800/50 pt-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex flex-col items-center gap-1 pb-2 min-w-max transition-colors relative ${activeCategory === cat.id
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                                    }`}
                            >
                                <span className="text-sm font-semibold">{cat.label}</span>
                                {activeCategory === cat.id && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full layout-id" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">

                {/* Quick Access / Featured */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        Recent & Featured
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Promo/Feature Card 1 */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-500/20 group cursor-pointer hover:shadow-xl hover:shadow-blue-500/30 transition-all">
                            <div className="absolute top-0 right-0 p-3 opacity-10 font-black text-6xl leading-none">PDF</div>
                            <div className="relative z-10">
                                <span className="inline-block px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-xs font-bold mb-3 border border-white/20">
                                    UPDATED
                                </span>
                                <h3 className="text-lg font-bold mb-1">PO Guide Part I</h3>
                                <p className="text-blue-100 text-sm mb-4 line-clamp-2">Complete clauses and rules updated 2024 edition.</p>
                                <div className="flex items-center gap-2 text-xs font-medium text-blue-50">
                                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 240 Pages</span>
                                </div>
                            </div>
                        </div>

                        {/* Promo/Feature Card 2 */}
                        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all group cursor-pointer relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-purple-500/10 transition-colors"></div>
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Complete IPO Act 1898</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">Official Gazette notification with latest amendments.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-400">PDF • 1.2 MB</span>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-purple-500 transition-colors">
                                        <Star className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <Library className="w-4 h-4 text-indigo-500" />
                            Browse By Category
                        </h2>
                        <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                            View All <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {/* List Item Style */}
                        <div className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">CCS (Conduct) Rules 1964</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Updated Jan 2024 • 45 Pages</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">Postal Manual Volume V</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Definitions & General Rules</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">MNOP Project Guidelines</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Operational Guidelines v2.0</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
