'use client';

import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { SplashScreen as CapacitorSplashScreen } from '@capacitor/splash-screen';

/**
 * AppLoadingScreen — Coordinates the native-to-React handoff.
 * 
 * A native Android overlay (splash_overlay.xml) with Dak Guru branding sits
 * on top of the WebView. The WebView loads and renders behind it.
 * 
 * This component:
 * 1. Waits for React to mount (Home page is rendered)
 * 2. Hides Capacitor's splash plugin layer
 * 3. Calls AndroidNative.appReady() to fade out the native overlay
 * 
 * Result: Splash fades out → Home page is ALREADY visible underneath. Zero gap.
 */
export default function AppLoadingScreen() {
    useEffect(() => {
        const initApp = async () => {
            if (Capacitor.isNativePlatform()) {
                // 0. Tag the root element so CSS can scope native-only styling
                //    (footer removal, no overscroll glow, no text-selection on chrome).
                document.documentElement.classList.add('native-app');

                try {
                    // 1. Hide Capacitor's splash plugin layer (separate from our native overlay)
                    await CapacitorSplashScreen.hide();
                } catch (e) {
                    console.error('Error hiding Capacitor splash', e);
                }

                // 2. Signal to native Android that React is ready
                //    This triggers the native overlay to fade out,
                //    revealing the already-rendered Home page beneath it
                try {
                    if ((window as any).AndroidNative?.appReady) {
                        (window as any).AndroidNative.appReady();
                    }
                } catch (e) {
                    console.error('Error calling AndroidNative.appReady', e);
                }
            }

            // 3. Add app-ready class for web (CSS fade-in on non-native)
            requestAnimationFrame(() => {
                document.body.classList.add('app-ready');
            });
        };

        // Small delay to ensure the Home page DOM has painted
        // before we dismiss the native overlay
        const timer = setTimeout(initApp, 100);
        return () => clearTimeout(timer);
    }, []);

    // Renders nothing — purely a coordinator
    return null;
}
