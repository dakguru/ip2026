"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Live Events Data
const bannerData = [
    {
        id: 1,
        tag: "App Launch",
        title: "Dak Guru Official App has been launched",
        sub: "Experience learning on your Android device",
        color: "from-blue-600 via-indigo-600 to-violet-700",
        link: "/"
    },
    {
        id: 2,
        tag: "Special Offer",
        title: "Flash Cards: Free Access till Feb-03",
        sub: "All premium decks unlocked for a limited time",
        color: "from-amber-500 to-orange-600",
        link: "/flashcards"
    },
    {
        id: 3,
        tag: "Active Now",
        title: "Weekly Mock Test - 03 is Live Now..!",
        sub: "Join the All-India test and check your ranking",
        color: "from-rose-500 to-red-700",
        link: "/mock-tests"
    },
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
        }, 6000);
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
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            startTimer();
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe || isRightSwipe) {
            if (isLeftSwipe) {
                setCurrent((prev) => (prev + 1) % bannerData.length);
            } else {
                setCurrent((prev) => (prev - 1 + bannerData.length) % bannerData.length);
            }
        }
        startTimer();
    };

    return (
        <div className="w-full h-[170px] md:h-[200px]">
            <div
                className="relative w-full h-full rounded-[28px] overflow-hidden shadow-xl shadow-blue-500/10 transform transition-all duration-500 touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {bannerData.map((banner) => (
                        <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
                            <Link href={banner.link} className={`w-full h-full flex flex-col justify-center px-8 relative hover:opacity-95 transition-all bg-gradient-to-br ${banner.color}`}>
                                {/* Animated Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine pointer-events-none"></div>

                                <div className="relative z-10 text-white">
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <span className="inline-block py-1 px-3 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-[0.15em] border border-white/20 shadow-sm animate-pulse-slow">
                                            {banner.tag}
                                        </span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                                    </div>

                                    <h3 className="text-base md:text-xl font-black leading-[1.2] mb-1.5 max-w-[95%] drop-shadow-md tracking-tight">
                                        {banner.title}
                                    </h3>
                                    <div className="flex items-center gap-2 group/btn">
                                        <p className="text-white/80 font-bold text-[11px] md:text-sm uppercase tracking-wider">
                                            {banner.sub}
                                        </p>
                                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                            <ChevronRight className="w-3 h-3 text-white" strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>

                                {/* Abstract Glass Orbs */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/20 rounded-full blur-3xl opacity-40"></div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Modern Dot Indicators */}
                <div className="absolute bottom-4 left-8 flex gap-2 z-20">
                    {bannerData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
