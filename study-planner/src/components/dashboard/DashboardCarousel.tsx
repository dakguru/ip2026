"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

// Placeholder data - in real app, fetch from API
const bannerData = [
    { id: 1, title: "New Batch for IPO Exam 2026", sub: "Starts Jan 15", color: "from-blue-600 to-indigo-600" },
    { id: 2, title: "Mock Test Series Live", sub: "Attempt Now", color: "from-purple-600 to-pink-600" },
    { id: 3, title: "Get 50% Off on Gold Plan", sub: "Limited Time", color: "from-amber-500 to-orange-600" },
];

export default function DashboardCarousel() {
    const [current, setCurrent] = useState(0);

    // Auto-scroll
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bannerData.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full px-4 pt-4 pb-2">
            <div className="relative w-full h-44 rounded-3xl overflow-hidden shadow-lg">
                <div
                    className="flex transition-transform duration-500 ease-out h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {bannerData.map((banner) => (
                        <div key={banner.id} className={`w-full h-full flex-shrink-0 bg-gradient-to-r ${banner.color} p-6 flex flex-col justify-center relative`}>
                            <div className="relative z-10 text-white">
                                <span className="inline-block py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-3 border border-white/10">
                                    Create Impact
                                </span>
                                <h3 className="text-2xl font-bold leading-tight mb-2 max-w-[80%]">{banner.title}</h3>
                                <p className="text-white/80 font-medium flex items-center gap-2">
                                    {banner.sub} <ChevronRight className="w-4 h-4" />
                                </p>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                        </div>
                    ))}
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {bannerData.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${current === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
