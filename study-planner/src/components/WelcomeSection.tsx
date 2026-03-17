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

            <div className="mt-8 md:mt-12 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <Link href="/mock-tests" className="relative group transition-transform hover:scale-[1.02] active:scale-95">
                    {/* The Background Decorative Strips (Left) */}
                    <div className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                        <div className="w-6 md:w-12 h-0.5 md:h-1 bg-red-600 -skew-x-[30deg] opacity-60"></div>
                        <div className="w-10 md:w-16 h-1.5 md:h-2 bg-red-600 -skew-x-[30deg]"></div>
                        <div className="w-4 md:w-8 h-0.5 md:h-1 bg-red-600 -skew-x-[30deg] opacity-60"></div>
                    </div>

                    {/* Main Container */}
                    <div className="relative">
                        {/* LIVE Tag */}
                        <div className="absolute -top-2.5 left-5 md:left-10 z-20">
                            <div className="bg-red-600 text-white px-3 md:px-5 py-0.5 text-[9px] md:text-xs font-black italic tracking-widest transform -skew-x-[20deg] shadow-lg flex items-center gap-1.5">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                                </span>
                                LIVE
                            </div>
                        </div>

                        {/* Main Banner Body */}
                        <div className="relative flex items-stretch">
                            {/* Blue Main Bar */}
                            <div className="bg-[#001030] py-2 md:py-3 pl-8 md:pl-12 pr-6 md:pr-10 transform -skew-x-[20deg] border-l-[4px] md:border-l-[6px] border-red-600 shadow-2xl relative overflow-hidden">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                
                                <div className="transform skew-x-[20deg] flex items-center gap-2.5">
                                    <span className="text-white text-sm md:text-lg font-black italic tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                                        <CountdownTimer course={course} />
                                    </span>
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-red-500 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                                </div>
                            </div>

                            {/* Right Red Accent Shape */}
                            <div className="w-6 md:w-10 bg-red-600 transform -skew-x-[20deg] -ml-3 md:-ml-5 shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}

