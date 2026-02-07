"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Clock, ChevronRight, Trophy } from "lucide-react";

export default function LiveMockTestBanner() {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    // End Date: 08 Feb 2026, 23:59:59 IST
    const END_DATE = "2026-02-08T23:59:59+05:30";

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(END_DATE) - +new Date();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return null; // Expired
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    return (
        <div className="px-5 pb-2 animate-in fade-in slide-in-from-top-4 duration-700">
            <Link href="/mock-tests">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 shadow-xl shadow-fuchsia-500/20 group active:scale-[0.98] transition-all duration-300">

                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl -ml-8 -mb-8"></div>

                    <div className="relative p-4 flex items-center justify-between gap-3">

                        {/* Left Side: Icon & Text */}
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                            <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
                                <Trophy className="w-5 h-5 text-yellow-300 drop-shadow-md" fill="currentColor" />
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/90">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse box-shadow-green"></span>
                                    Live Now
                                </span>
                                <h3 className="text-sm font-black text-white leading-tight truncate">
                                    All India Weekly Mock - 04
                                </h3>
                                <p className="text-[10px] text-white/80 font-medium truncate mt-0.5">
                                    Compete with top rankers!
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Timer & Arrow */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="flex flex-col items-end gap-0.5">
                                <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider text-right">Ends In</span>
                                <div className="flex items-center gap-1 text-white tabular-nums leading-none">
                                    <Clock className="w-3 h-3 text-white/80" />
                                    <span className="text-sm font-black tracking-tight">
                                        {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
                                        {String(timeLeft.hours).padStart(2, '0')}:
                                        {String(timeLeft.minutes).padStart(2, '0')}:
                                        {String(timeLeft.seconds).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/30 transition-colors">
                                <ChevronRight className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none"></div>
                </div>
            </Link>
        </div>
    );
}
