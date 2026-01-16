"use client";

import { useState, useEffect } from "react";
import { X, Calendar, ArrowRight, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MockTestAnnouncementPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a short delay for better UX
        const timer = setTimeout(() => {
            // ALWAYS SHOW for now as per user request to "fix it" (making sure it appears)
            setIsOpen(true);

            // Original logic preserved in comments if needed later:
            // const hasSeen = sessionStorage.getItem("seen_mock_announcement_jan17");
            // if (!hasSeen) {
            //     setIsOpen(true);
            // }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("seen_mock_announcement_jan17", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-500 rounded-full blur-[60px] opacity-40"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-40"></div>

                        {/* Content */}
                        <div className="relative z-10 p-1">
                            {/* Inner Border/Container */}
                            <div className="bg-zinc-900/90 backdrop-blur-xl rounded-[1.3rem] p-6 sm:p-8 text-center relative overflow-hidden">

                                {/* Confetti / Sparkle Decoration */}
                                <div className="absolute top-4 left-4">
                                    <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                                </div>
                                <div className="absolute top-8 right-12">
                                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse delay-700" />
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Icon */}
                                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 transform rotate-3">
                                    <Trophy className="w-10 h-10 text-white drop-shadow-md" />
                                </div>

                                {/* Badge */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                    </span>
                                    Official Announcement
                                </div>

                                <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                                    All India <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                        Mock Test is Live NOW..!
                                    </span>
                                </h2>

                                <div className="flex items-center justify-center gap-3 my-5">
                                    <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 min-w-[80px]">
                                        <span className="text-xs text-zinc-400 uppercase font-bold">JAN</span>
                                        <span className="text-2xl font-black text-white">17</span>
                                    </div>
                                    <span className="text-zinc-500 font-medium">&</span>
                                    <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 min-w-[80px]">
                                        <span className="text-xs text-zinc-400 uppercase font-bold">JAN</span>
                                        <span className="text-2xl font-black text-white">18</span>
                                    </div>
                                </div>

                                <div className="text-left bg-black/20 rounded-xl p-3 border border-white/5 mb-6 text-xs text-zinc-300 space-y-1">
                                    <p className="font-bold text-zinc-500 uppercase tracking-wider mb-2 text-[10px]">Syllabus Covered:</p>
                                    <p className="flex items-center gap-2"><span className="text-green-400">✔</span> The Post Office Act, 2023</p>
                                    <p className="flex items-center gap-2"><span className="text-green-400">✔</span> Government Savings Promotion Act</p>
                                    <p className="flex items-center gap-2"><span className="text-green-400">✔</span> PMLA Act, 2002 & Amendments</p>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href="/mock-tests"
                                        onClick={() => setIsOpen(false)} // Don't persist close on navigation, just close
                                        className="group relative w-full flex items-center justify-center px-8 py-4 bg-white text-zinc-900 rounded-xl font-bold text-lg overflow-hidden transition-transform active:scale-95"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></span>
                                        <span className="relative flex items-center gap-2">
                                            Attempt Now
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>

                                    <button
                                        onClick={handleClose}
                                        className="text-sm text-zinc-500 hover:text-white transition-colors font-medium"
                                    >
                                        Remind me later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
