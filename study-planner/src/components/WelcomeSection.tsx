"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { useState, useEffect } from "react";
import Link from "next/link";

interface WelcomeSectionProps {
    displayName: string;
}


function CountdownTimer() {
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

    if (!timeLeft) {
        return <span>Live : All India Mock Tests for LDCE IP 2026</span>;
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
            <span>All India Mock Tests for LDCE IP 2026</span>
        </span>
    );
}

export default function WelcomeSection({ displayName }: WelcomeSectionProps) {
    const isMobileApp = useIsMobileApp();

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
                Prepare Smart. Progress Fast. Get Promoted.
            </p>

            <div className="mt-6 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75 fill-mode-both">
                <Link href="/flashcards" className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-300 dark:border-indigo-600 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 text-xs sm:text-sm font-black tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] uppercase hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all duration-300 animate-pulse">
                    ✨ Unique Revision Tool : Flashcards - Free Access to everyone till Feb-03 🚀
                </Link>
            </div>

            <div className="mt-6 md:mt-10 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 w-full max-w-full px-2">
                <Link href="/mock-tests" className="relative group inline-block w-full sm:w-auto">
                    {/* Glowing effect background */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse"></div>
                    <div className="relative px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg leading-none flex items-center justify-center gap-2 sm:gap-3 shadow-xl transform transition-transform hover:scale-[1.02] active:scale-95 border border-white/20 w-full">
                        <span className="relative flex h-2 w-2 sm:h-3 sm:w-3 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-white"></span>
                        </span>
                        <span className="text-white font-bold tracking-wide uppercase text-[10px] sm:text-sm md:text-base drop-shadow-md whitespace-nowrap text-center">
                            <CountdownTimer />
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
}

