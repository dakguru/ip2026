"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";

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
        </section>
    );
}
