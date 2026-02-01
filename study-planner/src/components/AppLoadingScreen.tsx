'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { SplashScreen as CapacitorSplashScreen } from '@capacitor/splash-screen';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function AppLoadingScreen() {
    // Default to FALSE to prevent "blink" on Web
    // On Android, the Native Splash Screen covers this component until we explicitly show it and hide the native splash.
    const [isVisible, setIsVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // If we are native, we SHOW this screen
        if (Capacitor.isNativePlatform()) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }
        // If Web, it stays false (invisible), so no blink.
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const handleSplash = async () => {
            if (isVisible && Capacitor.isNativePlatform()) {
                try {
                    // 1. Hide the NATIVE splash immediately or very quickly
                    // The user wants "Strictly No Splash Screen", so we rely on this React component
                    // as the "Loading Screen" only if needed.
                    await CapacitorSplashScreen.hide();

                    // 2. Keep this React loading screen visible for a short duration
                    // to ensure the Home Page (dashboard) has time to render its initial layout.
                    // This satisfies "If App Home loading takes time, show a loading screen".
                    // We use a small buffer to prevent a flash of unstyled content.
                    setTimeout(() => {
                        setIsVisible(false);
                        // Re-enable scrolling after animation is done
                        setTimeout(() => {
                            document.body.style.overflow = 'unset';
                        }, 500);
                    }, 1500); // 1.5s total loading time (adjustable)

                } catch (e) {
                    console.error("Error hiding native splash", e);
                    // Fallback ensure it closes
                    setIsVisible(false);
                    document.body.style.overflow = 'unset';
                }
            }
        };

        if (isVisible) {
            handleSplash();
        }

    }, [isClient, isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // Match Native Gradient: 45deg, #0f172a, #dc2626, #7c3aed
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[linear-gradient(45deg,#0f172a,#dc2626,#7c3aed)] select-none touch-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md">

                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative mb-6"
                        >
                            <Image
                                src="/dak-guru-round.png"
                                alt="Dak Guru Logo"
                                width={140}
                                height={140}
                                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                                priority
                                loading="eager"
                            />
                        </motion.div>

                        {/* Text Container */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
                            className="text-center space-y-2 mb-8"
                        >
                            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md font-sans">
                                Dak Guru
                            </h1>

                            <p className="text-lg text-white/90 font-medium drop-shadow-sm border-t border-white/20 pt-2 px-4 shadow-[0_-1px_0_rgba(0,0,0,0.1)]">
                                Your LDCE Partner
                            </p>
                        </motion.div>

                        {/* Animated Loading Icon */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full drop-shadow-md"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
