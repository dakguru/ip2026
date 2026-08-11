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
    /** If false, content won't auto-scroll (used by Notes/PDF pages). Default: true */
    scrollableContent?: boolean;
}

export default function AppScreenWrapper({
    children,
    header,
    className,
    hideStatusBarPadding = false,
    scrollableContent = true
}: AppScreenWrapperProps) {
    const isMobileApp = useIsMobileApp();

    return (
        <div className={cn(
            "w-full overflow-x-hidden bg-[#f8f9fb] dark:bg-[#0a0a0a] flex flex-col transition-colors duration-200",
            scrollableContent ? "h-screen-dvh overflow-hidden" : "min-h-screen",
            className
        )}>
            {/* Status Bar / Safe Area Top Padding - Only applied if there is no header or explicitly requested */}
            {/* Status Bar Spacer (when no header is provided) */}
            {!header && !hideStatusBarPadding && (
                <div className="h-[max(24px,env(safe-area-inset-top,0px))] bg-inherit shrink-0 z-30" />
            )}

            {/* Fixed Header with Safe Area Padding */}
            {header && (
                <div className="shrink-0 z-30 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-2xl border-b border-zinc-200/60 dark:border-zinc-800/60 pt-[max(44px,calc(env(safe-area-inset-top,24px)+14px))] px-5 pb-3.5">
                    {header}
                </div>
            )}

            {/* Page Content — scrollable by default */}
            <main className={cn(
                "flex-1 flex flex-col",
                scrollableContent && "overflow-y-auto overscroll-contain"
            )}>
                {children}
            </main>
        </div>
    );
}
