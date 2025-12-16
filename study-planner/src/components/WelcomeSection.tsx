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
        </section>
    );
}
