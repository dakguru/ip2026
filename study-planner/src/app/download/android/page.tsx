"use client";

import React from "react";
import { Play, Sparkles, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AndroidDownloadPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500/30 overflow-hidden relative font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

                {/* Back Button */}
                <Link href="/" className="absolute top-6 left-6 p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-900 backdrop-blur-md transition-colors border border-green-500/20 group">
                    <ArrowLeft className="w-6 h-6 text-green-500/70 group-hover:text-green-400 transition-colors" />
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full text-center"
                >
                    {/* Hero Icon / Banner */}
                    <div className="relative mx-auto mb-10 w-32 h-32 flex items-center justify-center group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-400 opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity duration-1000"></div>
                        <div className="relative w-28 h-28 bg-gradient-to-br from-zinc-900 to-black rounded-[2rem] border border-green-500/30 shadow-2xl flex items-center justify-center backdrop-blur-xl">
                            {/* Animated Play Store Triangle feel */}
                            <svg className="w-14 h-14 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3L19 12L5 21V3Z" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
                                <path d="M5 3L12 12M5 21L12 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-2 tracking-tighter">
                        Coming Soon
                    </h1>
                    <p className="text-zinc-500 font-medium mb-12">Google Play Store</p>

                    {/* Progress Monitor */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-50"></div>

                        <div className="flex justify-between items-end mb-4">
                            <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                Status
                            </span>
                            <span className="text-3xl font-mono font-bold text-green-400">90%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-4 bg-zinc-800 rounded-full overflow-hidden mb-6 relative">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "90%" }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-green-600 to-emerald-400 rounded-full relative"
                            >
                                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                            </motion.div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Core Development Completed</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Security Audit Passed</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white font-medium">
                                <div className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></div>
                                <span>Final Testing in Progress...</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 px-6 py-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl inline-flex items-center gap-3">
                        <InfoIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-100 text-sm font-medium">
                            Will be launched in one or two weeks
                        </span>
                    </div>

                    <div className="mt-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium group">
                            <span>Return to Home</span>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

function InfoIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    )
}
