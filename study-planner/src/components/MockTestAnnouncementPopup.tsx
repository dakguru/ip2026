"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, FileText, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOPICS = [
    "NSC (VIII Issue) Scheme & KVP Scheme, 2019",
    "PPF Scheme, 2019 & SSA Scheme, 2019",
    "PM Cares & MSSC",
    "SB Orders 2023",
    "SB Orders 2024",
    "SB Orders 2025"
];

export default function MockTestAnnouncementPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // storage key updated to test 04
        const hasSeen = sessionStorage.getItem("seen_mock_announcement_test_04");
        if (!hasSeen) {
            // Small delay to ensure animations play nicely after load
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        // Target Date: Feb 07, 2026 00:00:00 AM IST
        const targetDate = new Date("2026-02-07T00:00:00+05:30").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("seen_mock_announcement_test_04", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 font-sans">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-[500px] bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl"
                    >
                        {/* Top Gradient Header */}
                        <div className="h-24 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/30 dark:to-zinc-900" />

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-5 right-5 z-20 p-2 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors shadow-sm border border-zinc-100 dark:border-zinc-700"
                        >
                            <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                        </button>

                        <div className="px-8 pb-8 -mt-12 relative z-10">
                            {/* Centered Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <FileText className="w-10 h-10" />
                                </div>
                            </div>

                            {/* Title & Date */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">
                                    Weekly Mock Test - 04
                                </h2>
                                <div className="inline-flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>Feb 07, 2026 - Feb 08, 2026</span>
                                </div>
                            </div>

                            {/* Countdown Section */}
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 flex items-center justify-between mb-8 border border-zinc-100 dark:border-zinc-700/50">
                                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] uppercase tracking-wider pl-2">
                                    <Clock className="w-4 h-4" />
                                    STARTS IN:
                                </div>
                                <div className="flex items-center gap-1 sm:gap-3 mr-2">
                                    {[
                                        { val: timeLeft.days, label: "D" },
                                        { val: timeLeft.hours, label: "H" },
                                        { val: timeLeft.minutes, label: "M" },
                                        { val: timeLeft.seconds, label: "S" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-baseline">
                                            <span className="text-2xl font-black text-zinc-900 dark:text-white tabular-nums w-8 text-center">
                                                {String(item.val).padStart(2, '0')}
                                            </span>
                                            <span className="text-[10px] text-zinc-400 font-bold self-center ml-0.5">{item.label}</span>
                                            {idx < 3 && <span className="text-zinc-300 dark:text-zinc-600 mx-1.5 text-lg font-light">:</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {[
                                    { label: "MINUTES", value: "60" },
                                    { label: "QUESTIONS", value: "50" },
                                    { label: "MARKS", value: "100" }
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-white dark:bg-zinc-800 rounded-2xl py-4 px-2 text-center shadow-[0_2px_15px_rgba(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-700">
                                        <div className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Topics List */}
                            <div className="bg-[#F5F7FF] dark:bg-indigo-950/20 rounded-3xl p-6 border border-indigo-50 dark:border-indigo-500/10 mb-8">
                                <div className="flex items-center gap-2 mb-4 text-indigo-900 dark:text-indigo-300 font-bold text-xs uppercase tracking-widest">
                                    <AlertCircle className="w-4 h-4" />
                                    Test Topics
                                </div>
                                <ul className="space-y-3.5">
                                    {TOPICS.map((topic, i) => (
                                        <li key={i} className="flex items-start gap-3.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="leading-snug">{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleClose}
                                className="w-full py-4 bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-zinc-900/10"
                            >
                                Get Ready
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
