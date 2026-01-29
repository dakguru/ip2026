'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { SplashScreen as CapacitorSplashScreen } from '@capacitor/splash-screen';

export default function AppLoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Use a more direct check for Capacitor to be ready as early as possible
        const isNative = Capacitor.isNativePlatform();
        if (isNative) {
            setShouldRender(true);
            document.body.style.overflow = 'hidden';
        }
    }, []);

    useEffect(() => {
        if (!shouldRender) return;

        // 1. Wait a moment to ensure DOM is painted, then Hide native splash
        const hideNativeSplash = async () => {
            try {
                // Slight delay to ensure the white webview (before React paint) isn't visible
                // This covers the gap between "JS Loaded" and "First Frame Painted"
                await new Promise(resolve => setTimeout(resolve, 500));
                await CapacitorSplashScreen.hide();
            } catch (e) {
                console.error("Error hiding splash", e);
            }
        };

        hideNativeSplash();

        // 2. Guaranteed transition to app after 2.5 seconds (giving enough time for 'app' feel)
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                document.body.style.overflow = 'unset';
            }, 800);
        }, 2500);

        return () => clearTimeout(timer);
    }, [shouldRender]);


    if (!shouldRender) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md">

                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative mb-8"
                        >
                            <img
                                src="/official-logo.png"
                                alt="Dak Guru Logo"
                                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-sm"
                            />

                            {/* Subtle Breathing Glow behind logo (Optional/Micro-interaction) */}
                            <motion.div
                                className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full -z-10"
                                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Text Container */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="text-center space-y-3"
                        >
                            {/* Brand Name */}
                            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-sans">
                                Dak Guru
                            </h1>

                            {/* Tagline */}
                            <p className="text-sm tracking-[0.15em] text-slate-500 font-light uppercase">
                                Learn, Practice, Succeed
                            </p>
                        </motion.div>

                        {/* Subtle Loader (if needed, but kept minimal aka "pulsing" as requested) */}
                        {/* We use the logo glow for the 'active' feeling, no extra spinner needed as per 'calm' requirement */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
