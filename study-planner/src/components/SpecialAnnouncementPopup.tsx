"use client";
import { useState, useEffect } from "react";
import { X, Sparkles, Target, TrendingUp, Award } from "lucide-react";
import Image from "next/image";

export default function SpecialAnnouncementPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const timer = setTimeout(() => {
            const hasSeen = localStorage.getItem("seen_mcq_announcement_may2026");
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const close = () => {
        setIsOpen(false);
        localStorage.setItem("seen_mcq_announcement_may2026", "true");
    };

    if (!isOpen) return null;

    // ─── MOBILE COMPACT POPUP ───
    if (isMobile) {
        return (
            <div
                className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-3 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
                onClick={(e) => { if (e.target === e.currentTarget) close(); }}
            >
                <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[1.75rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-500 border border-zinc-200 dark:border-zinc-800">
                    {/* Gradient top accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-amber-500" />

                    {/* Close button */}
                    <button
                        onClick={close}
                        className="absolute right-3 top-5 z-20 p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full text-zinc-500 dark:text-zinc-400 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="px-5 pt-5 pb-4">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/20">
                                <Image src="/dak-guru-round.png" alt="Dak Guru" fill className="object-cover" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em]">Message from</p>
                                <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 leading-tight">Team Dak Guru</h3>
                            </div>
                        </div>

                        {/* Greeting */}
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3 italic">Dear Aspirants,</p>

                        {/* Body */}
                        <div className="space-y-3 text-[12.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            <p>
                                We are carefully curating <strong className="text-zinc-800 dark:text-zinc-200">exam-oriented MCQs</strong> for each topic, with special focus on questions that carry a <strong className="text-blue-600 dark:text-blue-400">high probability of appearing</strong> in the LDCE examination.
                            </p>
                            <p>
                                Every MCQ is framed to help you <strong className="text-zinc-800 dark:text-zinc-200">revise the rules, understand the concept</strong>, and prepare in the exact direction required.
                            </p>
                        </div>

                        {/* Focus Tagline */}
                        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-800/50">
                            <p className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest mb-2 text-center">Our Focus is Clear</p>
                            <div className="flex items-center justify-center gap-3">
                                {[
                                    { icon: Target, label: "Relevance", color: "text-blue-600 dark:text-blue-400" },
                                    { icon: Sparkles, label: "Accuracy", color: "text-purple-600 dark:text-purple-400" },
                                    { icon: TrendingUp, label: "Exam Value", color: "text-emerald-600 dark:text-emerald-400" },
                                ].map((item) => (
                                    <div key={item.label} className="flex flex-col items-center gap-1">
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 flex items-center justify-center">
                                            <item.icon className={`w-4 h-4 ${item.color}`} />
                                        </div>
                                        <span className="text-[9px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Motivation */}
                        <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
                            Stay consistent. The right preparation today can make a <strong className="text-zinc-700 dark:text-zinc-300">big difference</strong> on exam day.
                        </p>

                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1">
                                    <Award className="w-3 h-3" /> India&apos;s Smart LDCE Portal
                                </p>
                                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400">www.dakguru.com</p>
                            </div>
                            <button
                                onClick={close}
                                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-black text-[11px] uppercase tracking-wider shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── DESKTOP PREMIUM POPUP ───
    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
            <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-zinc-200 dark:border-zinc-800">

                {/* Decorative top gradient bar */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-amber-500" />

                {/* Background decorative blurs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[60px] -ml-16 -mb-16 pointer-events-none" />

                {/* Close button */}
                <button
                    onClick={close}
                    className="absolute right-5 top-6 z-20 p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full text-zinc-500 dark:text-zinc-400 transition-all hover:rotate-90 duration-300"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 p-8 md:p-10">
                    {/* Header with branding */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-xl shadow-blue-500/20">
                            <Image src="/dak-guru-round.png" alt="Dak Guru" fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-0.5">A Message from</p>
                            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Team Dak Guru</h3>
                        </div>
                    </div>

                    {/* Greeting */}
                    <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-4 italic">Dear Aspirants,</p>

                    {/* Body content */}
                    <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <p>
                            We are carefully curating <strong className="text-zinc-800 dark:text-zinc-200">exam-oriented MCQs</strong> for each topic, with special focus on questions that carry a <strong className="text-blue-600 dark:text-blue-400">high probability of appearing</strong> in the LDCE examination.
                        </p>
                        <p>
                            Every MCQ is being framed to help you <strong className="text-zinc-800 dark:text-zinc-200">revise the rules, understand the concept</strong>, and prepare in the exact direction required for the exam.
                        </p>
                    </div>

                    {/* Focus Tagline - Visual Cards */}
                    <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 border border-blue-100 dark:border-blue-800/40">
                        <p className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em] mb-4 text-center">Our Focus is Clear</p>
                        <div className="flex items-center justify-center gap-6">
                            {[
                                { icon: Target, label: "More Relevance", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800" },
                                { icon: Sparkles, label: "More Accuracy", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800" },
                                { icon: TrendingUp, label: "More Exam Value", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800" },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col items-center gap-2 group">
                                    <div className={`w-12 h-12 rounded-xl ${item.bg} border shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-translate-y-1 duration-300`}>
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Motivational line */}
                    <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
                        Stay consistent. The right preparation today can make a <strong className="text-zinc-700 dark:text-zinc-300">big difference</strong> on exam day.
                    </p>

                    {/* Footer - Branding + CTA */}
                    <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5" /> India&apos;s Smart Self Preparation Portal for LDCE
                            </p>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">www.dakguru.com</p>
                        </div>
                        <button
                            onClick={close}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95 transition-all duration-300"
                        >
                            Continue Preparing →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
