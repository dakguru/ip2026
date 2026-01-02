"use client";

import HomeHeader from "@/components/HomeHeader";
import DashboardCarousel from "@/components/dashboard/DashboardCarousel";
import Link from "next/link";
import { BookOpen, Layers, PenTool, FileText, Globe, GraduationCap } from "lucide-react";

interface MobileDashboardProps {
    displayName: string;
}

export default function MobileDashboard({ displayName }: MobileDashboardProps) {
    const mainFeatures = [
        { label: "Web Guide", icon: BookOpen, color: "bg-blue-100 text-blue-600", href: "/guide" },
        { label: "Flashcards", icon: Layers, color: "bg-orange-100 text-orange-600", href: "/flashcards" },
        { label: "DG Blog", icon: PenTool, color: "bg-purple-100 text-purple-600", href: "/blog" },
        { label: "PDF Notes", icon: FileText, color: "bg-rose-100 text-rose-600", href: "/notes" },
        { label: "Current Affairs", icon: Globe, color: "bg-emerald-100 text-emerald-600", href: "/current-affairs" },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pb-24">
            {/* Custom Header with Dak Guru Branding */}
            <div className="sticky top-0 z-40 bg-white dark:bg-zinc-950 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        DG
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">Dak Guru</h1>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Exam Preparation App</span>
                    </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-300">
                    {displayName.charAt(0)}
                </div>
            </div>

            <div className="space-y-6 pt-4">
                {/* 1. Carousel */}
                <DashboardCarousel />

                {/* 2. Main Features Grid */}
                <div className="px-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Study Materials</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {mainFeatures.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.color} shadow-sm group-active:scale-95 transition-all text-xl`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <span className="text-xs font-medium text-center text-zinc-700 dark:text-zinc-300">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 3. Community / Updates Section (Placeholder for "More") */}
                <div className="px-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-1">Join Our Community</h3>
                            <p className="text-indigo-100 text-sm mb-3">Connect with other aspirants and clear your doubts.</p>
                            <Link href="/social" className="inline-block bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold shadow-md active:scale-95 transition-transform">
                                Go to Community
                            </Link>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                            <GraduationCap className="w-32 h-32" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Spacer for Bottom Nav */}
            <div className="h-16"></div>
        </div>
    );
}
