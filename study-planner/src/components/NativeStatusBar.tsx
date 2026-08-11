"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

/**
 * NativeStatusBar — Themes the Android status bar to match the app.
 *
 * Keeps the status bar icons readable and its background in sync with the
 * active light/dark theme, so the app reads as one continuous surface instead
 * of a web page under a mismatched system bar.
 *
 * Capacitor Style naming (per plugin docs):
 *   Style.Dark  → light icons  (use on a DARK app background)
 *   Style.Light → dark icons   (use on a LIGHT app background)
 *
 * `setBackgroundColor` is a no-op on edge-to-edge / Android 15+ (targetSdk 35),
 * which is expected and harmless — the icon `style` is what guarantees
 * legibility there. Runs only inside the native app; renders nothing.
 *
 * NOTE: requires `npx cap sync android` + an APK rebuild to take effect
 * (adds the native StatusBar module). On web it is a guarded no-op.
 */
export default function NativeStatusBar() {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;
        if (!resolvedTheme) return;

        const isDark = resolvedTheme === "dark";

        (async () => {
            try {
                await StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
                await StatusBar.setBackgroundColor({ color: isDark ? "#0a0a0a" : "#ffffff" });
            } catch {
                /* StatusBar plugin not in this build yet — no-op until next release */
            }
        })();
    }, [resolvedTheme]);

    return null;
}
