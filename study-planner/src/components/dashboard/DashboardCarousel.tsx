"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Placeholder data - in real app, fetch from API
const bannerData = [
    { id: 1, title: "Study Planner for LDCE IP 2026", sub: "Starts Jan 15", color: "from-blue-600 to-indigo-600", link: "/planner" },
    { id: 2, title: "Mock Test Series Live", sub: "Attempt Now", color: "from-purple-600 to-pink-600", link: "/mock-tests" },
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
        <div className="w-full h-[180px] md:h-[220px]">
            <div
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {bannerData.map((banner) => (
                        <div key={banner.id} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                            <Link href={banner.link} className={`w-full h-full flex flex-col justify-center px-7 relative hover:opacity-95 transition-all bg-gradient-to-br ${banner.color}`}>
                                <div className="relative z-10 text-white mt-2">
                                    <span className="inline-block py-1 px-3 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider mb-2 border border-white/10 shadow-sm">
                                        Create Impact
                                    </span>
                                    <h3 className="text-xl md:text-3xl font-black leading-tight mb-2 max-w-[90%] drop-shadow-md tracking-tight">
                                        {banner.title}
                                    </h3>
                                    <p className="text-white/95 font-bold flex items-center gap-1.5 text-[13px] md:text-base">
                                        {banner.sub} <ChevronRight className="w-4 h-4" />
                                    </p>
                                </div>
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>
                            </Link>
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
