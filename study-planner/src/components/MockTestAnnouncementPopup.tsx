"use client";

import { useState, useEffect } from "react";
import { X, Trophy, Crown, Medal, Sparkles, Star, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RANKERS = [
    { rank: 1, name: "Bhupendra", score: 82, color: "from-yellow-400 via-amber-500 to-yellow-600" },
    { rank: 2, name: "Gollangi Sateesh", score: 78, color: "from-slate-300 via-slate-400 to-slate-500" },
    { rank: 3, name: "Karan", score: 74, color: "from-orange-400 via-orange-500 to-orange-600" },
    { rank: 4, name: "Murali", score: 72, color: "from-blue-400 to-indigo-500" },
    { rank: 5, name: "Shyam kumar gupta", score: 72, color: "from-blue-400 to-indigo-500" },
    { rank: 6, name: "Nn", score: 70, color: "from-blue-400 to-indigo-500" },
    { rank: 7, name: "Virat Kohli", score: 70, color: "from-blue-400 to-indigo-500" },
];

export default function MockTestAnnouncementPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem("seen_mock_results_test_02_v2");
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("seen_mock_results_test_02_v2", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                    {/* Backdrop with sophisticated blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="relative w-full max-w-lg bg-zinc-950 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10"
                    >
                        {/* Animated Background Gradients */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse delay-700"></div>

                        {/* Decoration Items */}
                        <div className="absolute top-6 left-6">
                            <Sparkles className="w-5 h-5 text-yellow-500/40 animate-bounce" />
                        </div>

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-50 p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all transform hover:rotate-90 active:scale-90"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="relative z-10 p-1.5">
                            <div className="bg-zinc-900/40 backdrop-blur-2xl rounded-[1.8rem] sm:rounded-[2.2rem] p-5 sm:p-10 text-center border border-white/5">

                                {/* Header Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 text-yellow-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                                        <Trophy className="w-3 h-3" />
                                        Hall of Fame
                                    </div>

                                    <h2 className="text-3xl sm:text-5xl font-black text-white mb-1.5 tracking-tight leading-tight">
                                        TOP 7 <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-sm">
                                            CHAMPIONS
                                        </span>
                                    </h2>

                                    <p className="text-zinc-400 text-[11px] sm:text-sm font-medium mb-6 sm:mb-8 max-w-sm mx-auto leading-relaxed">
                                        Weekly Mock Test - 02 <br />
                                        <span className="text-zinc-500 font-normal">24.01.2026 & 25.01.2026</span>
                                    </p>
                                </motion.div>

                                {/* Rankings List */}
                                <div className="space-y-2 mb-8 max-h-[45vh] overflow-y-auto pr-1 scrollbar-hide">
                                    {RANKERS.map((user, index) => (
                                        <motion.div
                                            key={user.rank}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className={`group relative flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300 ${index === 0
                                                    ? "bg-gradient-to-r from-yellow-500/20 to-zinc-800/10 border-yellow-500/30 shadow-[0_4px_20px_rgba(234,179,8,0.1)] scale-[1.02] mb-3"
                                                    : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10"
                                                }`}
                                        >
                                            {/* Rank Indicator */}
                                            <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg shadow-lg ${index === 0 ? "bg-gradient-to-br from-yellow-300 to-yellow-600 text-zinc-900" :
                                                    index === 1 ? "bg-gradient-to-br from-slate-200 to-slate-400 text-zinc-800" :
                                                        index === 2 ? "bg-gradient-to-br from-orange-300 to-orange-600 text-zinc-900" :
                                                            "bg-zinc-800 text-zinc-400"
                                                }`}>
                                                {index === 0 ? <Crown className="w-5 h-5" /> : user.rank}
                                            </div>

                                            {/* Name and Score */}
                                            <div className="flex-1 text-left min-w-0">
                                                <div className={`font-bold tracking-wide truncate ${index === 0 ? "text-lg text-yellow-50" : "text-sm text-zinc-200"}`}>
                                                    {user.name}
                                                </div>
                                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Rank {user.rank}</div>
                                            </div>

                                            <div className="text-right shrink-0">
                                                <div className={`text-xl font-black tracking-tighter ${index === 0 ? "text-yellow-400" : "text-white"}`}>
                                                    {user.score}
                                                </div>
                                                <div className="text-[9px] uppercase font-bold text-zinc-600 leading-none">Score</div>
                                            </div>

                                            {/* Glow for Top Rank */}
                                            {index === 0 && (
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-transparent -z-10 blur-lg opacity-40"></div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer Action */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                    className="flex flex-col gap-4"
                                >
                                    <button
                                        onClick={handleClose}
                                        className="group relative w-full flex items-center justify-center px-6 py-4 bg-white text-zinc-950 rounded-xl font-black text-base overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                                            Got it!
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>

                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.15em]">
                                        Dak Guru Official Leaderboard
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
