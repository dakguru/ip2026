"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";
import Link from "next/link";

interface WelcomeSectionProps {
    displayName: string;
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

            <p className={`text-zinc-600 dark:text-zinc-300 mx-auto ${isMobileApp ? 'text-sm max-w-sm' : 'text-xl max-w-3xl'}`}>
                Prepare Smart. Progress Fast. Get Promoted.
            </p>

            <div className="mt-6 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75 fill-mode-both">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-bold tracking-wide shadow-sm uppercase">
                    🎯 Exclusively designed for LDCE IP 2026
                </span>
            </div>

            <div className="mt-10 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <Link href="/mock-tests" className="relative group inline-block">
                    {/* Glowing effect background */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse"></div>
                    <div className="relative px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg leading-none flex items-center gap-3 shadow-xl transform transition-transform hover:scale-[1.02] active:scale-95 border border-white/20">
                        <span className="relative flex h-3 w-3 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        <span className="text-white font-bold tracking-wide uppercase text-sm sm:text-base drop-shadow-md text-nowrap">
                            Live : All India Mock Tests for LDCE IP 2026
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
}
