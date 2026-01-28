"use client";

import Link from "next/link";
import { Sparkles, Calendar, ArrowLeft, Lock } from "lucide-react";

export default function FlashcardsIntroBanner() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20 transform rotate-12 transition-transform hover:rotate-0 duration-500">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                        Flash Cards
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Master the syllabus with our interactive flashcards. <br />
                        <span className="text-zinc-400 text-sm">Memorize rules, sections, and limits easily.</span>
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                            <Calendar className="w-7 h-7" />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Coming Soon</p>
                            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                February 1, 2026
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 w-full flex items-center justify-center gap-2 text-xs text-zinc-400">
                            <Lock className="w-3 h-3" />
                            <span>Exclusive for Gold Members</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
