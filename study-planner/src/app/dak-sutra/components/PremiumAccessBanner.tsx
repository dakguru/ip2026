"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ShieldAlert, Crown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumAccessBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenBanner = localStorage.getItem("dak_sutra_premium_announcement_seen");
        if (!hasSeenBanner) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismissBanner = () => {
        setIsVisible(false);
        localStorage.setItem("dak_sutra_premium_announcement_seen", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Colorful Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 opacity-10" />
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

                        {/* Content Area */}
                        <div className="relative p-6 sm:p-8">
                            {/* Close Button */}
                            <button 
                                onClick={dismissBanner}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                            </button>

                            {/* Header Icon */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-500 blur-xl opacity-30 animate-pulse" />
                                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                        <Crown className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1">
                                        <div className="bg-white dark:bg-zinc-800 rounded-full p-1 shadow-md border border-zinc-100 dark:border-zinc-700">
                                            <Sparkles className="w-3 h-3 text-amber-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                    Important Announcement
                                </p>
                                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                    Dak Sutra Access
                                </h3>
                                <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 mx-auto rounded-full" />
                                
                                <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2">
                                    Dear Aspirants,<br />
                                    Dak Sutra content has been made available free of cost for a limited period.
                                </p>

                                <div className="bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-4 mt-4">
                                    <div className="flex items-start gap-3">
                                        <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                        <p className="text-[12px] text-left font-bold text-indigo-900 dark:text-indigo-200 leading-tight">
                                            Access will be available only to <span className="text-fuchsia-600 dark:text-fuchsia-400">Premium Members</span> with effect from 18.04.2026.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={dismissBanner}
                                className="w-full mt-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Understood
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <p className="text-[10px] text-zinc-400 text-center mt-4 font-medium italic">
                                — Team Dak Guru
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
