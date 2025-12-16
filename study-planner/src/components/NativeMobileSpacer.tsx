"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";

export default function NativeMobileSpacer({ children }: { children: React.ReactNode }) {
    const isMobileApp = useIsMobileApp();

    return (
        <div className={isMobileApp ? "pb-16" : ""}>
            {children}
        </div>
    );
}
