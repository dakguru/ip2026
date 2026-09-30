"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";
import Link from "next/link";
import { useCourse } from "@/contexts/CourseContext";
import { ArrowRight, Sparkles, Target } from "lucide-react";

interface WelcomeSectionProps {
    displayName: string;
    isLoggedIn: boolean;
}


export default function WelcomeSection({ displayName, isLoggedIn }: WelcomeSectionProps) {
    const isMobileApp = useIsMobileApp();
    const { course } = useCourse();

    const tagline = course === 'PS_GR_B'
        ? <Link href="/settings" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-500 hover:opacity-80 transition-opacity cursor-pointer inline-flex items-center gap-1">Course Mode : LDCE PS Group B 2026</Link>
        : <Link href="/settings" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 hover:opacity-80 transition-opacity cursor-pointer inline-flex items-center gap-1">Course Mode : LDCE IP 2026</Link>;

    return (
        <section className={`text-center px-4 ${isMobileApp ? 'pt-6 pb-6' : 'pt-16 pb-12'}`}>
            <h1 className={`font-extrabold text-blue-600 dark:text-blue-400 capitalize flex items-center justify-center gap-3 flex-wrap ${isMobileApp ? 'text-2xl mb-2 gap-2' : 'text-3xl md:text-5xl mb-4'}`}>
                {isMobileApp ? (
                    // Mobile App: Compact
                    <span className="block w-full">Welcome, {displayName.split(' ')[0]}</span>
                ) : (
                    // Website: Full
                    <span>Welcome {displayName}</span>
                )}
            </h1>

            {isLoggedIn && (
                <p className={`text-zinc-600 dark:text-zinc-300 mx-auto ${isMobileApp ? 'text-xs max-w-sm' : 'text-xs sm:text-xl max-w-3xl'}`}>
                    {tagline}
                </p>
            )}

            <div className="mt-6 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75 fill-mode-both">
                <Link
                    href="https://play.google.com/store/apps/details?id=com.studyplanner.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-lg hover:border-green-400 dark:hover:border-green-500 transition-all duration-200 hover:scale-[1.03] active:scale-95"
                >
                    {/* Play Store icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                        <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z" fill="url(#pg)" />
                        <defs>
                            <linearGradient id="pg" x1="3" y1="12" x2="19.5" y2="12" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#34A853" />
                                <stop offset="40%" stopColor="#4285F4" />
                                <stop offset="70%" stopColor="#EA4335" />
                                <stop offset="100%" stopColor="#FBBC05" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="text-[10.5px] min-[380px]:text-[12px] sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors whitespace-nowrap">
                        Download Our <span className="text-green-600 dark:text-green-400 font-bold">Dak Guru</span> Android App
                    </span>
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* ✨ LDCE IP 2026 Cut-Off Prediction — Premium Animated Banner */}
            <div className="mt-8 md:mt-12 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 px-1 sm:px-4">
                <Link href="/cutoff-prediction" className="relative group w-full max-w-2xl block" aria-label="LDCE IP 2026 Cut-Off Prediction">
                    {/* Outer glow */}
                    <div className="absolute -inset-1 rounded-[1.4rem] bg-gradient-to-r from-fuchsia-500 via-amber-400 to-cyan-400 cop-gradient-flow opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-500"></div>

                    {/* Spinning rainbow border */}
                    <div className="relative overflow-hidden rounded-[1.25rem] p-[2px] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.55)] transition-transform duration-500 group-hover:-translate-y-0.5 group-active:scale-[0.98]">
                        <div
                            className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 cop-spin-slow"
                            style={{ background: "conic-gradient(from 0deg, #f43f5e, #f59e0b, #facc15, #22c55e, #06b6d4, #6366f1, #d946ef, #f43f5e)" }}
                        ></div>

                        <div className="relative overflow-hidden rounded-[calc(1.25rem-2px)] bg-[#0b0820]">
                            {/* Aurora layers */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-fuchsia-950/80 to-slate-950 cop-gradient-flow"></div>
                            <div className="absolute -top-16 -left-10 w-56 h-56 rounded-full bg-fuchsia-500/30 blur-[70px] cop-drift"></div>
                            <div className="absolute -bottom-20 right-0 w-64 h-64 rounded-full bg-cyan-400/25 blur-[80px] cop-drift [animation-delay:-5s]"></div>
                            <div className="absolute top-0 left-1/3 w-40 h-40 rounded-full bg-amber-400/20 blur-[60px] cop-drift [animation-delay:-9s]"></div>

                            {/* Twinkling stars */}
                            {[["12%", "22%", "0s"], ["28%", "78%", "0.6s"], ["70%", "15%", "1.2s"], ["82%", "70%", "1.8s"], ["50%", "88%", "0.9s"], ["92%", "35%", "2.2s"]].map(([left, top, delay], i) => (
                                <span key={i} className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.7)] cop-twinkle" style={{ left, top, animationDelay: delay }}></span>
                            ))}

                            {/* Continuous shine sweep */}
                            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent cop-sweep pointer-events-none"></div>

                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-3 sm:gap-5 px-4 py-4 sm:px-6 sm:py-5">
                                {/* Icon */}
                                <div className="relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-pink-500 p-[1.5px] shadow-[0_0_25px_rgba(251,146,60,0.55)]">
                                    <div className="w-full h-full rounded-[calc(1rem-1.5px)] bg-[#150d2e]/90 flex items-center justify-center">
                                        <Target className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.7)] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" strokeWidth={2.2} />
                                    </div>
                                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#0b0820]"></span>
                                    </span>
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                                        <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full bg-emerald-400/15 border border-emerald-300/30 text-[8.5px] sm:text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                            Live
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full bg-amber-300/15 border border-amber-200/30 text-[8.5px] sm:text-[10px] font-black uppercase tracking-[0.16em] text-amber-200">
                                            <Sparkles className="w-2.5 h-2.5" /> Answer Keys Out
                                        </span>
                                    </div>
                                    <h3 className="text-[15px] min-[380px]:text-base sm:text-2xl font-black leading-tight tracking-tight">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 cop-gradient-flow">LDCE IP 2026</span>{" "}
                                        <span className="text-white">Cut-Off Prediction</span>
                                    </h3>
                                    <p className="text-[10.5px] sm:text-sm text-indigo-200/80 font-medium mt-0.5 sm:mt-1 leading-snug">
                                        Enter your Paper I, II &amp; III marks · See your all-India standing
                                    </p>
                                </div>

                                {/* CTA */}
                                <div className="shrink-0 flex items-center">
                                    <span className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#1a1040] text-sm font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.35)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.55)] transition-all">
                                        Predict Now
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.75} />
                                    </span>
                                    <span className="sm:hidden w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-[0_0_18px_rgba(255,255,255,0.4)]">
                                        <ArrowRight className="w-4 h-4 text-[#1a1040]" strokeWidth={2.75} />
                                    </span>
                                </div>
                            </div>

                            {/* Bottom rainbow line */}
                            <div className="h-[2px] bg-gradient-to-r from-fuchsia-500 via-amber-300 to-cyan-400 cop-gradient-flow"></div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}

