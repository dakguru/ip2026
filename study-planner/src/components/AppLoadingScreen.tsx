'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { SplashScreen as CapacitorSplashScreen } from '@capacitor/splash-screen';

export default function AppLoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const initStart = async () => {
            // Logic to only render this on mobile app if desired, 
            // but user request implies "Usage Context: App Launch", usually mobile.
            // We force it for consistency if running as a PWA/Mobile wrapper.
            // Ideally check Capacitor.isNativePlatform() to avoid annoying web users.
            if (Capacitor.isNativePlatform()) {
                setShouldRender(true);
                document.body.style.overflow = 'hidden';
            } else {
                // For web dev testing, you might want to uncomment this:
                // setShouldRender(true);
            }
        };

        initStart();
    }, []);

    useEffect(() => {
        if (!shouldRender) return;

        const handleLoadComplete = async () => {
            // Minimum display time to ensure branding is seen and animation is smooth
            // even if the app loads instantly.
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsVisible(false); // Trigger exit animation

            // Wait for exit animation to finish before unblocking scroll
            setTimeout(() => {
                document.body.style.overflow = 'unset';
            }, 800); // Matches exit duration
        };

        // In a real app, you might listen to a global "ready" state.
        // For now, since this mounts in RootLayout, once we mount, the "app" is effectively loading.
        // We'll treat "mounted + min delay" as "loaded".

        // Hide native splash immediately so ours takes over
        const hideNative = async () => {
            try {
                await CapacitorSplashScreen.hide();
            } catch (e) {
                console.error("Error hiding native splash", e);
            }
        };

        hideNative();
        handleLoadComplete();

    }, [shouldRender]);

    if (!shouldRender) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
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
                            <h1 className="text-3xl font-medium tracking-tight text-slate-900 font-sans">
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
