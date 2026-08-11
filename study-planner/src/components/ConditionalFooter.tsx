"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";
import Footer from "./Footer";

/**
 * ConditionalFooter — Renders the marketing/legal Footer everywhere EXCEPT
 * inside the native Capacitor app (Android/iOS).
 *
 * The web footer (copyright + legal links) belongs on the desktop and
 * mobile-browser experience, but it breaks the native-app feel — a real
 * Android app doesn't scroll into a website footer above the bottom nav.
 *
 * `useIsMobileApp` starts false (matching the server render), so the Footer
 * is present on the initial paint on both web and native — no hydration
 * mismatch — and is then removed on native after mount.
 */
export default function ConditionalFooter() {
    const isMobileApp = useIsMobileApp();

    if (isMobileApp) {
        return null;
    }

    return <Footer />;
}
