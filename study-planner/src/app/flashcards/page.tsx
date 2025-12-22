"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Zap, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function FlashcardsPage() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Target Date: Feb 1st, 2026, 10:00 AM
            const targetDate = new Date("2026-02-01T10:00:00");
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial calculation

        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/20 flex items-center justify-center shadow-xl">
                <span className="text-3xl md:text-5xl font-black text-white font-mono tracking-tighter drop-shadow-lg">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span className="text-xs md:text-sm font-bold text-amber-200 uppercase tracking-widest mt-3 drop-shadow-md">
                {label}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex flex-col items-center justify-center p-6">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-zinc-950 to-zinc-950 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-amber-500/10 rounded-full"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: 0
                        }}
                        animate={{
                            top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            opacity: [0, 0.4, 0],
                            scale: [0.5, 1.2, 0.5]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: `${Math.random() * 300 + 50}px`,
                            height: `${Math.random() * 300 + 50}px`,
                        }}
                    />
                ))}
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 z-50 text-white/50 hover:text-white flex items-center gap-2 transition-colors group"
            >
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm hidden md:block">Back to Home</span>
            </Link>

            {/* Main Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl"
            >
                {/* Glowing Border Container */}
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 shadow-[0_0_100px_-20px_rgba(245,158,11,0.3)]">

                    {/* Inner Card Content */}
                    <div className="bg-black/80 backdrop-blur-xl rounded-[23px] p-8 md:p-16 text-center border border-white/5 relative overflow-hidden">

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />

                        <div className="relative z-10">
                            {/* Icon & Label */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase tracking-wider text-xs md:text-sm mb-8"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Premium Feature</span>
                            </motion.div>

                            {/* Main Title */}
                            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-6 drop-shadow-2xl">
                                FLASH CARDS
                            </h1>

                            <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed">
                                Master your study material with our intelligent, adaptive revision system.
                                <span className="text-amber-400 block mt-2 font-semibold">Coming soon to supercharge your prep.</span>
                            </p>

                            {/* Divider with Launch Date */}
                            <div className="flex items-center justify-center gap-4 mb-16">
                                <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-amber-500/50" />
                                <div className="text-center">
                                    <div className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1">Mark Your Calendar</div>
                                    <div className="text-white font-mono text-lg md:text-xl">Feb 01, 2026 • 10:00 AM</div>
                                </div>
                                <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-amber-500/50" />
                            </div>

                            {/* Countdown Timer */}
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                                <TimeUnit value={timeLeft.days} label="Days" />
                                <span className="text-4xl md:text-6xl font-thin text-white/20 -mt-8">:</span>
                                <TimeUnit value={timeLeft.hours} label="Hours" />
                                <span className="text-4xl md:text-6xl font-thin text-white/20 -mt-8">:</span>
                                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                                <span className="text-4xl md:text-6xl font-thin text-white/20 -mt-8 hidden md:inline">:</span>
                                <TimeUnit value={timeLeft.seconds} label="Seconds" />
                            </div>

                            {/* Notify Button (Optional) */}
                            <button className="mt-16 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 mx-auto">
                                <Clock className="w-5 h-5" />
                                <span>I'll be Waiting</span>
                            </button>

                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
