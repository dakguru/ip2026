"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

/**
 * NativePageTransition — Subtle enter animation on route change, native only.
 *
 * Opacity-only fade (`.native-page-enter` in globals.css) so it never creates
 * a containing block that would offset `position: fixed` children.
 *
 * IMPORTANT: the `.native-page-enter` class (opacity < 1 while animating) also
 * creates a STACKING CONTEXT. If it lingered, any `position: fixed` overlay
 * rendered inside the page (e.g. the NativeQuizRunner and its `z-[110]` Next
 * bar) would be trapped beneath the root-level MobileBottomNav (`z-50`) — the
 * bar would vanish behind the bottom nav. So we drop the class as soon as the
 * enter animation finishes, leaving a plain passthrough wrapper with no
 * stacking context. A timeout fallback covers reduced-motion (where the
 * animation is disabled and `animationend` never fires) and any missed event.
 *
 * On web/desktop it renders children untouched.
 */
function TransitionInner({ children }: { children: React.ReactNode }) {
    const [entering, setEntering] = useState(true);

    useEffect(() => {
        // Fallback: always clear shortly after the 200ms animation, even if
        // `animationend` never fires (prefers-reduced-motion, backgrounded tab…).
        const t = setTimeout(() => setEntering(false), 450);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className={entering ? "native-page-enter" : undefined}
            onAnimationEnd={(e) => {
                // Only our own enter animation — ignore animations bubbling up
                // from child elements.
                if (e.target === e.currentTarget) setEntering(false);
            }}
        >
            {children}
        </div>
    );
}

export default function NativePageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMobileApp = useIsMobileApp();

    if (!isMobileApp) {
        return <>{children}</>;
    }

    // Remount per route so the enter animation replays on each navigation.
    return <TransitionInner key={pathname}>{children}</TransitionInner>;
}
