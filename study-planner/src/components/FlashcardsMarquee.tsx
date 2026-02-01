"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FlashcardsMarquee() {
    return (
        <div className="relative w-full overflow-hidden bg-indigo-50/50 dark:bg-indigo-900/10 border-y border-indigo-100 dark:border-indigo-500/10 py-2 sm:py-3 mb-6 sm:mb-8 backdrop-blur-sm">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10" />

            {/* Marquee Track */}
            <motion.div
                className="flex whitespace-nowrap min-w-full"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30, // Adjust speed (seconds)
                }}
            >
                {/* Content Repeated to ensure seamless loop */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 sm:gap-8 mx-4 sm:mx-8">
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-indigo-800 dark:text-indigo-200">
                            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
                            <span>More Flashcards & Topics are being added daily!</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-indigo-300 dark:bg-indigo-700" />
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            <span>Stay Tuned For Updates</span>
                            <span className="text-lg leading-none">🚀</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-indigo-300 dark:bg-indigo-700" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
