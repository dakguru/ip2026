/**
 * Lightweight haptic feedback for the native app.
 *
 * Uses the Web Vibration API (`navigator.vibrate`), which works inside the
 * Android WebView WITHOUT a Capacitor plugin — as long as the VIBRATE
 * permission is present in AndroidManifest.xml. On web browsers / desktop
 * it is a harmless no-op (we only fire inside the native app).
 *
 * Durations are intentionally tiny — native Android taps are a single crisp
 * tick, not a buzz.
 */

type HapticStyle = "light" | "medium" | "selection" | "success";

const PATTERNS: Record<HapticStyle, number | number[]> = {
    selection: 6,   // nav / tab switches
    light: 10,      // buttons, cards
    medium: 18,     // confirmations
    success: [12, 40, 12],
};

function isNativeApp(): boolean {
    return (
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("native-app")
    );
}

export function haptic(style: HapticStyle = "light"): void {
    if (!isNativeApp()) return;
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    try {
        navigator.vibrate(PATTERNS[style]);
    } catch {
        /* vibration unsupported / blocked — ignore */
    }
}
