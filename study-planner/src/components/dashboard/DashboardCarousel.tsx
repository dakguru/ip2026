"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Placeholder data - in real app, fetch from API
const bannerData = [
    {
        id: 'app-launch',
        type: 'app-promo',
        title: "DAK GURU MOBILE APP",
        sub: "COMING SOON",
        color: "from-slate-900 via-zinc-900 to-slate-950",
        link: "#"
    },
    { id: 1, title: "Study Planner for LDCE IP 2026", sub: "Starts Jan 15", color: "from-blue-600 to-indigo-600", link: "/planner" },
    { id: 2, title: "Mock Test Series Live", sub: "Attempt Now", color: "from-purple-600 to-pink-600", link: "/mock-tests/live" },
];

export default function DashboardCarousel() {
    const [current, setCurrent] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Min distance for swipe detection
    const minSwipeDistance = 50;

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bannerData.length);
        }, 5000); // Increased duration for readability
    };

    // Auto-scroll
    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        // Pause timer on touch interaction
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            // If just a tap or no move, restart timer
            startTimer();
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe || isRightSwipe) {
            if (isLeftSwipe) {
                // Next slide
                setCurrent((prev) => (prev + 1) % bannerData.length);
            } else {
                // Prev slide
                setCurrent((prev) => (prev - 1 + bannerData.length) % bannerData.length);
            }
        }

        // Restart timer after interaction
        startTimer();
    };

    return (
        <div className="w-full">
            <div
                className="relative w-full h-auto min-h-[180px] md:min-h-[220px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-xl touch-pan-y border border-zinc-200 dark:border-zinc-800"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {bannerData.map((banner) => (
                        <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
                            {banner.type === 'app-promo' ? (
                                <div className={`w-full h-full min-h-[180px] md:min-h-[220px] bg-gradient-to-r ${banner.color} p-5 md:p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group`}>

                                    {/* Animated Background Particles */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                                        <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-150 contrast-150"></div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="relative z-10 text-center md:text-left mb-4 md:mb-0 max-w-lg">
                                        <span className="inline-block py-1 px-3 bg-amber-500/20 backdrop-blur-md rounded-full text-xs font-bold mb-3 border border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                            {banner.sub}
                                        </span>
                                        <h3 className="text-2xl md:text-4xl font-black leading-tight text-white drop-shadow-md mb-2 tracking-tight">
                                            {banner.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm md:text-base hidden md:block">
                                            Experience the ultimate learning companion.
                                        </p>
                                    </div>

                                    {/* Buttons Container */}
                                    <div className="relative z-10 flex flex-row items-center gap-3 md:gap-4 mt-2 md:mt-0">
                                        {/* Play Store Button */}
                                        <Link
                                            href="/download/android"
                                            className="group/btn flex items-center gap-2 bg-black/80 hover:bg-black text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl border border-white/10 transition-all hover:scale-105 hover:border-green-500/50 shadow-lg"
                                        >
                                            <svg className="w-5 h-5 md:w-7 md:h-7 shrink-0 text-green-400 group-hover/btn:text-green-300 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M5,3V21L19,12L5,3Z" /></svg>
                                            <div className="flex flex-col items-start leading-none">
                                                <span className="text-[9px] md:text-[10px] text-zinc-400 uppercase font-semibold">Get it on</span>
                                                <span className="text-xs md:text-lg font-bold font-sans">Google Play</span>
                                            </div>
                                        </Link>

                                        {/* App Store Button */}
                                        <Link
                                            href="/download/ios"
                                            className="group/btn flex items-center gap-2 bg-white text-black hover:bg-zinc-100 px-3 py-2 md:px-5 md:py-2.5 rounded-xl border border-transparent transition-all hover:scale-105 shadow-lg"
                                        >
                                            <svg className="w-5 h-5 md:w-7 md:h-7 shrink-0 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.87 11.13,7.75 11.9,7.75C12.63,7.75 13.9,6.67 15.68,6.8C16.4,6.84 17.65,7.1 18.5,8.35C18.41,8.4 16.85,9.3 16.89,11.25C16.93,12.9 18.23,13.96 18.29,14C18.26,14.07 17.2,17.76 15.2,19.34L18.71,19.5ZM13,3.5C13.66,2.67 14.15,1.54 14.03,0.41C13.06,0.45 11.89,1.06 11.21,1.88C10.6,2.63 10.06,3.8 10.18,4.91C11.23,5.03 12.35,4.33 13,3.5Z" /></svg>
                                            <div className="flex flex-col items-start leading-none">
                                                <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase font-semibold">Download on the</span>
                                                <span className="text-xs md:text-lg font-bold font-sans">App Store</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link href={banner.link} className={`w-full h-full block bg-gradient-to-r ${banner.color} p-6 flex flex-col justify-center relative hover:opacity-95 transition-opacity`}>
                                    <div className="relative z-10 text-white">
                                        <span className="inline-block py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-3 border border-white/10 shadow-sm">
                                            Create Impact
                                        </span>
                                        <h3 className="text-xl md:text-3xl font-bold leading-tight mb-2 max-w-[85%] drop-shadow-sm">
                                            {banner.title}
                                        </h3>
                                        <p className="text-white/90 font-medium flex items-center gap-2 text-sm md:text-base">
                                            {banner.sub} <ChevronRight className="w-4 h-4" />
                                        </p>
                                    </div>
                                    {/* Decorative circles */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {bannerData.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${current === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
