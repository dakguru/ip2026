'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { SplashScreen as CapacitorSplashScreen } from '@capacitor/splash-screen';

export default function AppLoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Ensure body is non-scrollable while splash is active
        document.body.style.overflow = 'hidden';
    }, []);

    useEffect(() => {
        if (!isClient) return;

        // 1. Wait a moment to ensure DOM is painted, then Hide native splash
        // We only call hide if we are actually on a native platform
        const hideNativeSplash = async () => {
            if (Capacitor.isNativePlatform()) {
                try {
                    // Slight delay to ensure React has rendered the first frame of its own splash
                    await new Promise(resolve => setTimeout(resolve, 600));
                    await CapacitorSplashScreen.hide();
                } catch (e) {
                    console.error("Error hiding native splash", e);
                }
            }
        };

        hideNativeSplash();

        // 2. Transition custom splash out after 2.5s
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Re-enable scrolling after animation is done
            setTimeout(() => {
                document.body.style.overflow = 'unset';
            }, 800);
        }, 2200);

        return () => clearTimeout(timer);
    }, [isClient]);

    if (typeof window === 'undefined' || !isClient) {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#0f172a] flex items-center justify-center">
                {/* Minimal placeholder to match native splash while React loads */}
                <div className="w-32 h-32 bg-[#0f172a] rounded-full" />
            </div>
        );
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // Match Native Gradient: 45deg, #0f172a, #dc2626, #7c3aed
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[linear-gradient(45deg,#0f172a,#dc2626,#7c3aed)]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md">

                        {/* Logo Container - Matches Native Splash Icon Position */}
                        <motion.div
                            initial={{ scale: 1, opacity: 1 }} // Start identical to native
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative mb-8"
                        >
                            <img
                                src="/dak-guru-round.png" // Use the round logo used in splash
                                alt="Dak Guru Logo"
                                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg"
                            />
                        </motion.div>

                        {/* Text Container - "Learn. Practice. Succeed" */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }} // Delay to appear right after splash fade
                            className="text-center space-y-4"
                        >
                            {/* Brand Name */}
                            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md font-sans">
                                Dak Guru
                            </h1>

                            {/* Tagline */}
                            <p className="text-sm tracking-[0.2em] text-white/90 font-medium uppercase drop-shadow-sm">
                                Learn. Practice. Succeed
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
