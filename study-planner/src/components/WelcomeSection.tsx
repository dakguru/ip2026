"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCourse } from "@/contexts/CourseContext";
import { ArrowRight } from "lucide-react";

interface WelcomeSectionProps {
    displayName: string;
}


function CountdownTimer({ course }: { course: string | null }) {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        const targetDate = new Date('2026-01-17T00:00:00');

        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return null;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const testText = course === 'PS_GR_B'
        ? "All India Mock Tests for PS Group B 2026"
        : "All India Mock Tests for LDCE IP 2026";

    if (!timeLeft) {
        return <span>{testText}</span>;
    }

    return (
        <span className="flex items-center gap-2">
            <span className="flex items-baseline gap-1">
                <span className="font-mono font-black text-yellow-300 text-base sm:text-lg">{timeLeft.days}d</span>
                <span className="text-[10px] sm:text-xs opacity-80 decoration-0"> : </span>
                <span className="font-mono font-black text-yellow-300 text-base sm:text-lg">{timeLeft.hours}h</span>
                <span className="text-[10px] sm:text-xs opacity-80 decoration-0"> : </span>
                <span className="font-mono font-black text-yellow-300 text-base sm:text-lg">{timeLeft.minutes}m</span>
                <span className="text-[10px] sm:text-xs opacity-80 decoration-0"> : </span>
                <span className="font-mono font-black text-yellow-300 text-base sm:text-lg">{timeLeft.seconds}s</span>
            </span>
            <span className="mx-1 opacity-50">|</span>
            <span>{testText}</span>
        </span>
    );
}

export default function WelcomeSection({ displayName }: WelcomeSectionProps) {
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

            <p className={`text-zinc-600 dark:text-zinc-300 mx-auto ${isMobileApp ? 'text-xs max-w-sm' : 'text-xs sm:text-xl max-w-3xl'}`}>
                {tagline}
            </p>

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

            {/* ✨ All India Mock Test — Premium Live Banner */}
            <div className="mt-8 md:mt-12 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 px-4">
                <Link href="/mock-tests" className="relative group w-full max-w-xl block">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-white/[0.08] shadow-[0_8px_40px_-12px_rgba(99,102,241,0.35)] hover:shadow-[0_12px_50px_-10px_rgba(99,102,241,0.45)] transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]">

                        {/* Animated aurora blobs */}
                        <div className="absolute -top-20 -right-20 w-56 h-56 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse"></div>
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-violet-500/15 rounded-full blur-[70px] animate-pulse [animation-delay:1s]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/10 rounded-full blur-[60px] animate-pulse [animation-delay:2s]"></div>

                        {/* Subtle grid texture */}
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

                        {/* Shimmer sweep on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none"></div>

                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">

                            {/* Trophy Icon */}
                            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 backdrop-blur-md border border-amber-400/20 flex items-center justify-center shadow-inner">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3h14c.55 0 1 .45 1 1v2c0 2.76-2.24 5-5 5h-.42c-.77 1.15-1.84 1.92-3.08 2.27V16h1.5c1.38 0 2.5 1.12 2.5 2.5V20H8.5v-1.5C8.5 17.12 9.62 16 11 16h1.5v-2.73c-1.24-.35-2.31-1.12-3.08-2.27H9c-2.76 0-5-2.24-5-5V4c0-.55.45-1 1-1zm0 3v1c0 1.66 1.34 3 3 3h.42c.34-.9.89-1.69 1.58-2.28V6H5zm14 0h-5v1.72c.69.59 1.24 1.38 1.58 2.28H16c1.66 0 3-1.34 3-3V6zM7 21h10v1H7v-1z"/></svg>
                                {/* Live ping dot */}
                                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-slate-900"></span>
                                </span>
                            </div>

                            {/* Text block */}
                            <div className="flex-1 min-w-0">
                                {/* LIVE badge */}
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full bg-red-500/15 border border-red-500/25 mb-1.5">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-red-400">Live Now</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-[15px] sm:text-lg font-black text-white leading-tight tracking-tight">
                                    <CountdownTimer course={course} />
                                </h3>
                                <p className="text-[10px] sm:text-xs text-indigo-300/70 font-medium mt-0.5 truncate">Compete with top rankers across India</p>
                            </div>

                            {/* Arrow */}
                            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-white/[0.12] group-hover:border-white/20 transition-all duration-300">
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    </div>
                </Link>
            </div>
        </section>
    );
}

