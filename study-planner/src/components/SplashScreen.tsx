'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';

export default function SplashScreen() {
    // Default to false so it doesn't show on Web (prevents flash)
    // It will only show on Android after the initial check passes
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Check if we are running on Android
        const platform = Capacitor.getPlatform();
        if (platform === 'android') {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }

        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = 'unset';
            return;
        }

        // Timer to dismiss splash
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3500); // 3.5s total duration

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    if (!isMounted) return null;
    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* Background Layer - Deep Midnight Blue / Graphite Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black" />

                {/* Animated Particles / Light Streaks */}
                <Particles />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80 pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center p-8">

                    {/* Primary Logo Animation */}
                    <div className="relative mb-6">
                        {/* Neural/Digital Lines Background Effect */}
                        <motion.div
                            className="absolute inset-0 -m-20 border border-slate-700/30 rounded-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                        />

                        <motion.div
                            className="relative"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Base Logo Image */}
                            <img
                                src="/official-logo.png"
                                alt="Dak Guru Logo"
                                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.3)]"
                            />

                            {/* Metallic Shine Sweep Effect */}
                            <motion.div
                                className="absolute inset-0 z-20 w-full h-full"
                                style={{
                                    background: 'linear-gradient(120deg, transparent 30%, rgba(255, 215, 0, 0.6) 50%, transparent 70%)',
                                    mixBlendMode: 'overlay',
                                }}
                                initial={{ x: '-150%' }}
                                animate={{ x: '150%' }}
                                transition={{
                                    delay: 0.8,
                                    duration: 1.5,
                                    ease: "easeInOut"
                                }}
                            />

                        </motion.div>
                    </div>

                    {/* Brand Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-center"
                    >
                        {/* Hidden H1 for accessibility only, or remove hidden if we want text */}
                        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 tracking-tight font-serif drop-shadow-sm hidden">
                            Dak Guru
                        </h1>
                        <p className="mt-4 text-sm md:text-base font-light tracking-[0.2em] text-slate-300/80 uppercase">
                            Learn Smart. Lead Confident.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

// Background Particles Component
function Particles() {
    // Generate static array for particles
    const particles = Array.from({ length: 15 });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((_, i) => (
                <Particle key={i} index={i} />
            ))}
        </div>
    );
}

function Particle({ index }: { index: number }) {
    // Deterministic random-like values based on index
    const duration = 3 + (index % 5);
    const delay = index * 0.2;
    const top = `${(index * 7) % 100}%`;
    const left = `${(index * 13) % 100}%`;

    return (
        <motion.div
            className="absolute w-1 h-1 bg-yellow-100 rounded-full opacity-0"
            style={{ top, left, boxShadow: '0 0 4px rgba(253, 224, 71, 0.8)' }}
            animate={{
                y: [0, -40, -80],
                opacity: [0, 0.4, 0],
                scale: [0, 1.5, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
            }}
        />
    );
}
