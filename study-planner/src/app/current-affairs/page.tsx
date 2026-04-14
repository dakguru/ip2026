"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Newspaper, Layers, FileText, Sparkles, ChevronRight, Zap, Globe, Clock, Star } from 'lucide-react';
import AppScreenWrapper from '@/components/AppScreenWrapper';

export default function CurrentAffairsHub() {
    return (
        <AppScreenWrapper
            header={
                <div className="flex items-center justify-between w-full">
                    <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </Link>
                    <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Updates Hub</h1>
                    <div className="w-9" /> {/* Spacer for centering */}
                </div>
            }
        >
            <div className="relative min-h-full pb-20 overflow-hidden">
                {/* Visual Background Elements */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-5 pt-8 md:pt-12 relative z-10">
                    
                    {/* Hero Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-200 dark:border-blue-800/50">
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
