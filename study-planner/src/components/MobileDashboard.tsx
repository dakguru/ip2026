"use client";

import HomeHeader from "@/components/HomeHeader";
import DashboardCarousel from "@/components/dashboard/DashboardCarousel";
import Link from "next/link";
import { BookOpen, Layers, PenTool, FileText, Globe, GraduationCap } from "lucide-react";
import Image from "next/image";

interface MobileDashboardProps {
    displayName: string;
}

export default function MobileDashboard({ displayName }: MobileDashboardProps) {
    const mainFeatures = [
        { label: "Web Guide", icon: BookOpen, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", href: "/guide" },
        { label: "Flashcards", icon: Layers, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400", href: "/flashcards" },
        { label: "DG Blog", icon: PenTool, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400", href: "/blog" },
        { label: "PDF Notes", icon: FileText, color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400", href: "/notes" },
        { label: "Current Affairs", icon: Globe, color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400", href: "/current-affairs" },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pb-32">
            {/* Custom Header with Dak Guru Branding */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm pt-[max(12px,env(safe-area-inset-top))] transition-all">
                <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <Image src="/dak-guru-round.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">Dak Guru</h1>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Exam Preparation App</span>
                    </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-300 shadow-sm">
                    {displayName.charAt(0)}
                </div>
            </div>

            <div className="space-y-6 pt-2">
                {/* 1. Carousel */}
                <DashboardCarousel />

                {/* PRO UPGRADE CARD (Prominent) */}
                <div className="px-4">
                    <Link href="/pricing" className="block relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/20 transition-colors"></div>
                        <div className="relative z-10 p-5 flex items-center justify-between">
                            <div className="text-white">
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider border border-white/10 uppercase">PRO</span>
                                    Upgrade to Gold
                                </h3>
                                <p className="text-xs text-white/90 font-medium max-w-[150px] leading-relaxed">Unlock Full Tests, PDF Notes & Video Classes</p>
                            </div>
                            <div className="bg-white text-orange-600 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xl whitespace-nowrap transform group-hover:scale-105 transition-transform">
                                Upgrade Now
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 2. Main Features Grid */}
                <div className="px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 text-sm uppercase tracking-wide opacity-80">
                            <Layers className="w-4 h-4" /> Study Materials
                        </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {mainFeatures.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className={`w-[72px] h-[72px] rounded-2xl flex items-center justify-center ${item.color} shadow-sm border border-black/5 dark:border-white/5 active:scale-95 transition-all text-xl group-hover:shadow-md`}>
                                    <item.icon className="w-8 h-8 opacity-90" strokeWidth={1.5} />
                                </div>
                                <span className="text-[11px] font-semibold text-center text-zinc-600 dark:text-zinc-400 leading-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 3. Community / Updates Section (Placeholder for "More") */}
                <div className="px-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden active:scale-[0.99] transition-transform">
                        <div className="relative z-10 max-w-[70%]">
                            <h3 className="font-bold text-lg mb-2 leading-tight">Join Our Community</h3>
                            <p className="text-indigo-100 text-xs mb-4 leading-relaxed">Connect with thousands of other aspirants, share notes, and clear your doubts instantly.</p>
                            <Link href="/social" className="inline-block bg-white text-indigo-700 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-transform hover:bg-zinc-50">
                                Enter Community
                            </Link>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                            <GraduationCap className="w-36 h-36" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
