"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";

export default function NativeMobileSpacer({ children }: { children: React.ReactNode }) {
    const isMobileApp = useIsMobileApp();

    return (
        <div className="pb-24 md:pb-0"> {/* Increased padding for both web and app on mobile */}
            {children}
        </div>
    );
}
