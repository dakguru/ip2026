"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar, Trophy, AlertCircle, PlayCircle, CheckCircle2 } from "lucide-react";

export default function LiveMockBanner() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 border-b border-white/10 shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

                    {/* Left Content */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider mb-2 animate-bounce">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            Live Now - Attempt Now
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                            All India Live Mock Test
                        </h2>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300 text-sm font-medium">
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span>Jan 17 & 18 (2 Days)</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                <Trophy className="w-4 h-4 text-yellow-400" />
                                <span>Results: Mon, Jan 19</span>
                            </div>
                        </div>

                        <div className="bg-black/20 rounded-xl p-4 border border-white/5 md:inline-block w-full md:w-auto">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center md:text-left block">Syllabus Covered</h3>
                            <ul className="space-y-2 text-left">
                                {[
                                    "The Post Office Act, 2023",
                                    "Government Savings Promotion Act-1873",
                                    "PMLA Act, 2002 & Amendments"
                                ].map((topic, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right CTA */}
                    <div className="shrink-0 w-full md:w-auto">
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <Link
                                href="/mock-tests/live"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1 active:translate-y-0 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <span className="relative flex items-center gap-2">
                                    <PlayCircle className="w-6 h-6 text-indigo-600" />
                                    Attempt Test Now
                                </span>
                            </Link>
                            <p className="text-center text-xs text-slate-400">
                                * Exclusive for Gold/Silver Members
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
