"use client";

import { useEffect } from "react";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { haptic } from "@/lib/haptics";

/**
 * NativeInteractions — App-wide tactile feedback for the native app.
 *
 * Instead of wiring haptics into every button, we delegate a single
 * `pointerdown` listener on the document. When the user taps something that
 * behaves like a control (button, link, [role=button]/[role=tab], or anything
 * opted-in with .haptic / .native-ripple / .touch-feedback), we fire a tiny
 * vibration — mimicking the crisp tick of native Android widgets.
 *
 * Runs only inside the native app; renders nothing.
 */
export default function NativeInteractions() {
    const isMobileApp = useIsMobileApp();

    useEffect(() => {
        if (!isMobileApp) return;

        const INTERACTIVE = "button, a, [role='button'], [role='tab'], .native-ripple, .touch-feedback, .haptic";

        const onPointerDown = (e: PointerEvent) => {
            const target = e.target as Element | null;
            if (!target || typeof target.closest !== "function") return;

            const control = target.closest(INTERACTIVE);
            if (!control) return;

            // Skip disabled controls
            if (control.getAttribute("aria-disabled") === "true") return;
            if ((control as HTMLButtonElement).disabled) return;

            // Tabs/nav feel lighter than buttons
            const isNav = !!control.closest("nav") || control.getAttribute("role") === "tab";
            haptic(isNav ? "selection" : "light");
        };

        document.addEventListener("pointerdown", onPointerDown, { passive: true });
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [isMobileApp]);

    return null;
}
