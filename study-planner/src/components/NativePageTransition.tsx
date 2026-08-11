"use client";

import { usePathname } from "next/navigation";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

/**
 * NativePageTransition — Subtle enter animation on route change, native only.
 *
 * Keying the wrapper by pathname remounts the subtree on navigation, which
 * re-triggers the CSS enter animation (defined as `.native-page-enter` in
 * globals.css). We deliberately animate OPACITY ONLY (no transform) so we
 * never create a containing block that would offset `position: fixed`
 * children mid-transition.
 *
 * On web/desktop it renders children untouched (no wrapper, no animation).
 */
export default function NativePageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMobileApp = useIsMobileApp();

    if (!isMobileApp) {
        return <>{children}</>;
    }

    return (
        <div key={pathname} className="native-page-enter">
            {children}
        </div>
    );
}
