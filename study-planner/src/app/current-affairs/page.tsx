"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, Globe, Zap, FileText, ChevronRight, 
    Newspaper, Trophy, Sparkles, TrendingUp, Calendar, Clock
} from 'lucide-react';
import AppScreenWrapper from '@/components/AppScreenWrapper';
import HomeHeader from '@/components/HomeHeader';
import { useIsMobileApp } from '@/hooks/use-mobile-app';

export default function CurrentAffairsHub() {
    const isMobileApp = useIsMobileApp();

    if (isMobileApp) {
        return (
            <AppScreenWrapper
                className="bg-zinc-50 dark:bg-zinc-950"
                header={
                    <div className="flex items-center gap-4 w-full">
                        <Link href="/" className="p-1 -ml-1 rounded-full text-zinc-900 dark:text-zinc-100 active:bg-zinc-200 dark:active:bg-zinc-800 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Current Affairs</h1>
                    </div>
                }
            >
                <div className="flex-1 flex flex-col pb-24">
                    
                    {/* Simple Summary Header - Android Style */}
                    <div className="px-5 py-6 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 mb-2">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Daily Insight</span>
                        </div>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight">
                            Your Daily Competitive Edge
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                            Stay updated with the latest news, flashcards, and monthly digests.
                        </p>
                    </div>

                    {/* Categories List - Android Style */}
                    <div className="px-4 py-2 space-y-3">
                        
                        <CategoryListItem 
                            href="/current-affairs/live"
                            icon={Globe}
                            title="Live Feed"
                            subtitle="Real-time daily updates & global news"
                            color="blue"
                            badge="Live"
                        />

                        <CategoryListItem 
                            href="/flashcards?filter=ca"
                            icon={Zap}
                            title="Active Recall Flashcards"
                            subtitle="Master facts with interactive cards"
                            color="amber"
                            isPremium
                        />

                        <CategoryListItem 
                            href="/current-affairs/pdfs"
                            title="Monthly PDF Digests"
                            subtitle="Structured revision materials for 2025-26"
                            color="rose"
                            customIcon={
                                <div className="relative w-8 h-8 flex items-center justify-center">
                                    <Image src="/ca-logo.png" alt="Adda247" fill className="object-contain" />
                                </div>
                            }
                        />

                    </div>

                    {/* Additional Quick Actions */}
                    <div className="mt-8 px-5">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Deep Dive</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <QuickActionCard 
                                icon={Newspaper}
                                label="Editorial Analysis"
                                bg="bg-indigo-50 dark:bg-indigo-900/20"
                                text="text-indigo-600 dark:text-indigo-400"
                            />
                            <QuickActionCard 
                                icon={Calendar}
                                label="Yearly Roundup"
                                bg="bg-teal-50 dark:bg-teal-900/20"
                                text="text-teal-600 dark:text-teal-400"
                            />
                        </div>
                    </div>

                    {/* Source Credit Footer */}
                    <div className="mt-auto pt-12 pb-8 px-5 text-center">
                        <p className="text-[9px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-widest mb-4 text-center w-full">Content Recognition</p>
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <div className="w-5 h-5 relative grayscale opacity-50">
                                <Image src="/ca-logo.png" alt="Adda247 Logo" fill className="object-contain" />
                            </div>
                            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Content Sourced from Adda247</span>
                        </div>
                    </div>

                </div>
            </AppScreenWrapper>
        );
    }

    // Default Desktop View
    return (
        <AppScreenWrapper hideStatusBarPadding={true} scrollableContent={false}>
            <HomeHeader isLoggedIn={true} />

            <div className="flex-1 relative bg-white dark:bg-zinc-950 pb-20 overflow-hidden">
                {/* Soft backdrop behind the hero */}
                <div className="absolute inset-x-0 top-0 h-96 pointer-events-none bg-gradient-to-b from-blue-50 via-indigo-50/40 to-transparent dark:from-blue-950/25 dark:via-indigo-950/10 dark:to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42rem] h-64 pointer-events-none bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-6 pt-6 md:pt-8 relative">
                    {/* Hero Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100 dark:border-blue-800 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            <span>Premium Learning Experience</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight">
                            Current Affairs <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400">Mastery Hub</span>
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
                            Stay ahead of the curve. Access real-time news, interactive flashcards, and curated study materials in one place.
                        </p>
                    </motion.div>

                    {/* Sub-Category Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* 1. Live Feed Card */}
                        <HubCard 
                            href="/current-affairs/live"
                            title="Current Affairs Live"
                            desc="Real-time daily updates and news from across the globe."
                            icon={Globe}
                            color="blue"
                            delay={0.1}
                            badge="Live"
                            badgeColor="red"
                        />

                        {/* 2. Flashcards Card */}
                        <HubCard 
                            href="/flashcards?filter=ca"
                            title="FlashCards"
                            desc="Memorize key events faster with curated CA flashcards."
                            icon={Zap}
                            color="amber"
                            delay={0.2}
                            badge="Premium"
                            badgeColor="amber"
                        />

                        {/* 3. PDF Card */}
                        <HubCard 
                            href="/current-affairs/pdfs"
                            title="Curated PDFs"
                            desc="Structured monthly summaries for deeper revision."
                            customIcon={
                                <div className="relative w-8 h-8 opacity-90">
                                    <Image src="/ca-logo.png" alt="Adda247" fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                                </div>
                            }
                            color="rose"
                            delay={0.3}
                            footer="Thanks & Credits to www.Adda247.com"
                        />

                    </div>

                    {/* Bottom Feature Bar */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-16 p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-700">
                                <Clock className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Study Streak</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">Stay consistent to unlock rewards.</p>
                            </div>
                        </div>
                        <Link href="/planner" className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg">
                            Go to Planner
                        </Link>
                    </motion.div>
                </div>
            </div>
        </AppScreenWrapper>
    );
}

function CategoryListItem({ 
    href, 
    title, 
    subtitle, 
    icon: Icon, 
    customIcon, 
    color, 
    badge,
    isPremium 
}: { 
    href: string, 
    title: string, 
    subtitle: string, 
    icon?: any, 
    customIcon?: React.ReactNode, 
    color: 'blue' | 'amber' | 'rose',
    badge?: string,
    isPremium?: boolean
}) {
    const colors = {
        blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
        rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
    };

    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
        >
            <Link 
                href={href} 
                className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm active:bg-zinc-50 dark:active:bg-zinc-800/50 transition-colors"
            >
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
                    {customIcon ? customIcon : <Icon className="w-6 h-6" strokeWidth={2.5} />}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                            {title}
                        </h3>
                        {badge && (
                            <span className="px-1.5 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[8px] font-black uppercase tracking-tighter animate-pulse">
                                {badge}
                            </span>
                        )}
                        {isPremium && (
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
                        {subtitle}
                    </p>
                </div>

                <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
            </Link>
        </motion.div>
    );
}

function QuickActionCard({ icon: Icon, label, bg, text }: { icon: any, label: string, bg: string, text: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-start gap-3 p-4 rounded-3xl ${bg} border border-transparent active:border-zinc-200 dark:active:border-zinc-700 transition-all text-left w-full`}
        >
            <div className={`w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm ${text}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-black leading-tight ${text} opacity-90`}>{label}</span>
        </motion.button>
    );
}

function HubCard({ 
    href, 
    title, 
    desc, 
    icon: Icon, 
    customIcon, 
    color, 
    delay, 
    badge, 
    badgeColor,
    footer 
}: { 
    href: string; 
    title: string; 
    desc: string; 
    icon?: any; 
    customIcon?: React.ReactNode; 
    color: 'blue' | 'amber' | 'rose'; 
    delay: number;
    badge?: string;
    badgeColor?: 'red' | 'amber';
    footer?: string;
}) {
    const colors = {
        blue: "group-hover:text-blue-600 dark:group-hover:text-blue-400 border-blue-500/10 group-hover:border-blue-500/30",
        amber: "group-hover:text-amber-600 dark:group-hover:text-amber-400 border-amber-500/10 group-hover:border-amber-500/30",
        rose: "group-hover:text-rose-600 dark:group-hover:text-rose-400 border-rose-500/10 group-hover:border-rose-500/30"
    };

    const bgs = {
        blue: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400",
        amber: "bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400",
        rose: "bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400"
    };

    const badgeClasses = {
        red: "bg-red-500 text-white animate-pulse",
        amber: "bg-amber-500 text-black"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="group relative"
        >
            <Link href={href} className={`block h-full relative overflow-hidden bg-white dark:bg-zinc-900/80 backdrop-blur-md rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 ${colors[color]} p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1`}>
                
                {badge && (
                    <div className={`absolute top-6 right-6 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest z-10 ${badgeColor ? badgeClasses[badgeColor] : ''}`}>
                        {badge}
                    </div>
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${bgs[color]} shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    {customIcon ? customIcon : Icon && <Icon className="w-7 h-7" strokeWidth={2.5} />}
                </div>

                <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform">
                    {title}
                </h3>
                
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed mb-6 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                    {desc}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        Explore <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>

                {footer && (
                    <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-bold text-zinc-400 leading-tight">
                        {footer}
                    </div>
                )}
            </Link>
        </motion.div>
    );
}
