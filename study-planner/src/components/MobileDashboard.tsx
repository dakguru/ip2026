"use client";

import DashboardCarousel from "@/components/dashboard/DashboardCarousel";
import Link from "next/link";
import { BookOpen, Layers, PenTool, FileText, Globe, GraduationCap, ChevronRight, Crown, Sparkles } from "lucide-react";
import Image from "next/image";

interface MobileDashboardProps {
    displayName: string;
}

export default function MobileDashboard({ displayName }: MobileDashboardProps) {
    const mainFeatures = [
        { label: "Web Guide", icon: BookOpen, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", href: "/guide" },
        { label: "Flashcards", icon: Layers, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20", href: "/flashcards" },
        { label: "Community", icon: GraduationCap, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20", href: "/social" },
        { label: "PDF Notes", icon: FileText, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", href: "/notes" },
        { label: "Curr. Affairs", icon: Globe, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", href: "/current-affairs" },
        { label: "DG Blog", icon: PenTool, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", href: "/blog" },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-black pb-32 font-sans">
            {/* Custom Header with Dak Guru Branding */}
            <div className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between pt-[max(12px,env(safe-area-inset-top))] transition-all">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full border border-zinc-100 dark:border-zinc-800 shadow-sm ring-2 ring-white dark:ring-zinc-900">
                        <Image src="/dak-guru-round.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">Dak Guru</h1>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-wide uppercase mt-0.5 block">Learning App</span>
                    </div>
                </div>
                <Link href="/settings">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-700 dark:text-zinc-300 shadow-sm active:scale-95 transition-transform">
                        {displayName.charAt(0)}
                    </div>
                </Link>
            </div>

            <div className="space-y-8 pt-4">
                {/* 1. Carousel */}
                <div className="pl-4">
                    <DashboardCarousel />
                </div>

                {/* PRO UPGRADE CARD (World Class Design) */}
                <div className="px-5">
                    <Link href="/pricing" className="block relative overflow-hidden rounded-[2rem] shadow-xl shadow-amber-500/20 group transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600"></div>

                        {/* Decorative Patterns */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/15 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl -ml-12 -mb-12"></div>

                        <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="text-white space-y-2">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                    <Crown className="w-3 h-3 text-yellow-200 fill-current" />
                                    <span>Premium Access</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black leading-tight mb-1 drop-shadow-sm">
                                        Upgrade to Gold
                                    </h3>
                                    <p className="text-sm text-amber-50 font-medium leading-relaxed max-w-[200px]">
                                        Unlock full syllabus mock tests, PDF library & video classes.
                                    </p>
                                </div>
                            </div>

                            <div className="self-end sm:self-center">
                                <span className="inline-flex items-center gap-2 bg-white text-orange-600 px-5 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-black/10 group-hover:bg-orange-50 transition-colors">
                                    Get Started <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 2. Main Features Grid (Crisp Shadows) */}
                <div className="px-5">
                    <div className="flex items-center justify-between mb-5 px-1">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-500" /> Quick Actions
                        </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {mainFeatures.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className={`w-[84px] h-[84px] rounded-[1.5rem] flex items-center justify-center ${item.bg} ${item.color} shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] border border-white dark:border-zinc-800 active:scale-95 transition-all duration-300 group-hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)] group-hover:-translate-y-1`}>
                                    <item.icon className="w-8 h-8 opacity-100 drop-shadow-sm" strokeWidth={1.8} />
                                </div>
                                <span className="text-xs font-semibold text-center text-zinc-600 dark:text-zinc-400 leading-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 3. Community Highlights (Stunning Card) */}
                <div className="px-5">
                    <div className="group relative overflow-hidden rounded-[2rem] bg-indigo-600 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.4)] active:scale-[0.98] transition-all">
                        {/* Background Image/Gradient */}
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700"></div>

                        <div className="relative z-10 p-6 sm:p-8 text-white flex flex-col items-start">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-inner">
                                <GraduationCap className="w-6 h-6 text-indigo-100" />
                            </div>

                            <h3 className="text-xl font-bold mb-2">Join the Community</h3>
                            <p className="text-indigo-100 text-sm mb-6 leading-relaxed max-w-xs font-medium opacity-90">
                                Connect with thousands of aspirants. Discuss doubts, share strategies, and grow together.
                            </p>

                            <Link href="/social" className="w-full sm:w-auto text-center bg-white text-indigo-700 px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:bg-indigo-50 transition-colors">
                                Enter Discussion Forum
                            </Link>
                        </div>

                        {/* Decorative 3D Effect */}
                        <div className="absolute -right-8 -bottom-8 opacity-10 transform rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <GraduationCap className="w-48 h-48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
