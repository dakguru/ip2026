"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, Rocket, X } from "lucide-react";

export default function LaunchPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => setIsOpen(true), 800);
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
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 p-6 sm:p-8 text-center space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 shadow-sm mx-auto">
                                <Rocket className="w-4 h-4 text-indigo-400 animate-pulse" />
                                <span className="font-bold tracking-wide uppercase text-[10px] sm:text-xs text-indigo-200">Official Launch</span>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                                    We Officially <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Launched!</span>
                                </h2>
                                <p className="text-sm text-zinc-400 font-medium">
                                    From January 01, 2026. Welcome!
                                </p>
                            </div>

                            {/* Date Info Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors">
                                    <Calendar className="w-6 h-6 text-indigo-400 mb-1" />
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Launch Date</p>
                                    <p className="text-sm font-bold text-white">01 Jan 2026</p>
                                </div>
                                <div className="bg-amber-500/5 rounded-2xl p-3 border border-amber-500/20 flex flex-col items-center justify-center gap-1 hover:bg-amber-500/10 transition-colors">
                                    <Sparkles className="w-6 h-6 text-amber-400 mb-1" />
                                    <p className="text-[10px] text-amber-500/80 uppercase tracking-wider font-bold">Free Access Upto</p>
                                    <p className="text-sm font-bold text-white">04 Jan 2026</p>
                                </div>
                            </div>

                            {/* Announcement Text */}
                            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3">
                                <p className="text-xs text-indigo-200/80 leading-relaxed font-medium">
                                    Users can try our website upto 04.01.2026.
                                </p>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 transition-all transform active:scale-95"
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
