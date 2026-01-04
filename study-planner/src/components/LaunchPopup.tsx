"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Rocket, Zap, Info, Calendar } from "lucide-react";

export default function LaunchPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md z-0"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-[32rem] bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#0f172a] border border-indigo-500/30 rounded-[2rem] shadow-2xl overflow-hidden z-10"
                    >
                        {/* Decorative Dynamic Background */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse-slow" />
                            <div className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow delay-75" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent opacity-50" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-zinc-300 hover:text-white hover:rotate-90 duration-300"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 text-center flex flex-col items-center gap-6">

                            {/* Animated Icon Badge */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-20 animate-pulse"></div>
                                <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-full px-5 py-1.5 shadow-lg backdrop-blur-md">
                                    <Sparkles className="w-4 h-4 text-yellow-400" />
                                    <span className="font-bold tracking-widest uppercase text-[11px] text-yellow-200">
                                        LDCE 2026 PLANS
                                    </span>
                                </div>
                            </div>

                            {/* Headline & Sub-headline */}
                            <div className="space-y-4 mx-1">
                                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
                                    Gold & Silver Plans <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 animate-gradient-x">
                                        Are Now OPEN!
                                    </span>
                                </h2>

                                <div className="space-y-2">
                                    <p className="text-sm sm:text-base text-zinc-300 font-medium">
                                        Thank you for the overwhelming response.
                                    </p>
                                    <p className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm font-bold animate-pulse">
                                        <Zap className="w-4 h-4 text-red-400 fill-red-400" />
                                        50% DISCOUNT FOR FIRST 50 SUBSCRIBERS!
                                    </p>
                                </div>
                            </div>

                            {/* Announcement Card */}
                            <div className="w-full bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/20 rounded-xl p-5 backdrop-blur-sm relative overflow-hidden text-left group hover:border-indigo-500/40 transition-colors duration-500">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-indigo-300 mt-1 flex-shrink-0" />
                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-indigo-200">
                                            All India Live Mock Tests
                                        </p>
                                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                            Prepare for LDCE IP 2026 with our Live Mock Tests starting from <span className="text-white font-semibold">January 17, 2026</span>. Don't miss out!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 w-full">
                                <p className="text-sm font-medium text-zinc-400 italic">
                                    Welcome back to Dak Guru!
                                </p>

                                {/* CTA */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-gray-900 font-black text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] ring-1 ring-white/20"
                                >
                                    Explore the Portal
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
