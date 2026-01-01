"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Rocket } from "lucide-react";

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
                        className="absolute inset-0 bg-black/70 backdrop-blur-md z-0"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-[28rem] bg-gradient-to-br from-slate-900 via-[#0B1120] to-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
                    >
                        {/* Decorative Dynamic Background */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse-slow" />
                            <div className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow delay-75" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent opacity-50" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-5 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-zinc-400 hover:text-white hover:rotate-90 duration-300"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 text-center flex flex-col items-center gap-6">

                            {/* Animated Icon Badge */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
                                <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-5 py-2 shadow-lg backdrop-blur-md">
                                    <Rocket className="w-4 h-4 text-indigo-400" />
                                    <span className="font-bold tracking-widest uppercase text-[11px] text-indigo-200">
                                        LDCE 2026
                                    </span>
                                </div>
                            </div>

                            {/* Headline & Sub-headline */}
                            <div className="space-y-3 mx-1">
                                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                                    Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 animate-gradient-x">LDCE IP 2026</span> Today.
                                </h2>
                                <p className="text-base sm:text-lg text-zinc-400 font-medium">
                                    Premium study materials available now.
                                </p>
                            </div>

                            {/* The Hook Card */}
                            <div className="w-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative z-10 flex flex-col gap-2">
                                    <Sparkles className="w-5 h-5 text-amber-400 mb-1 mx-auto" />
                                    <p className="text-sm text-zinc-200 font-medium leading-relaxed">
                                        Preparing for LDCE PS Group 'B' 2026?
                                    </p>
                                    <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                                        Stay tuned—launching very soon!
                                    </p>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] ring-1 ring-white/20"
                            >
                                Start Exploring Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
