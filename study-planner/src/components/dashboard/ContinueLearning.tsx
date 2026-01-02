"use client";

import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContinueLearning() {
    return (
        <div className="px-4 mb-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Continue Learning</h3>
                <Link href="/planner" className="text-xs text-blue-600 font-semibold">View All</Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                    <Play className="w-5 h-5 ml-1 fill-current" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">PO Guide Part I - Lecture 4</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Paper I • 15 mins left</p>
                </div>
                <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-full">
                    Resume
                </button>
            </div>
        </div>
    );
}
