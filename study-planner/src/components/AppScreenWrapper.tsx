"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobileApp } from '@/hooks/use-mobile-app';

interface AppScreenWrapperProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    className?: string;
    showBottomNav?: boolean;
    hideStatusBarPadding?: boolean;
}

export default function AppScreenWrapper({
    children,
    header,
    className,
    hideStatusBarPadding = false
}: AppScreenWrapperProps) {
    const isMobileApp = useIsMobileApp();

    return (
        <div className={cn(
            "min-h-screen w-full overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors",
            className
        )}>
            {/* Status Bar / Safe Area Top Padding - Only applied if there is no header or explicitly requested */}
            {/* Status Bar Spacer (when no header is provided) */}
            {!header && !hideStatusBarPadding && (
                <div className="h-[max(24px,env(safe-area-inset-top,0px))] bg-inherit sticky top-0 z-30" />
            )}

            {/* Sticky Header with Safe Area Padding */}
            {header && (
                <div className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 pt-[max(24px,env(safe-area-inset-top,0px))] px-5 py-3.5">
                    {header}
                </div>
            )}

            {/* Page Content */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
}
