'use client';

import React from 'react';
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Briefcase, BookOpen, ChevronRight, Zap, Star, Gavel } from "lucide-react";
import { motion } from "framer-motion";

// ... (imports remain same) we need to update the import block if we add useIsMobile, but pure CSS is better for "mobile browsers"
// Actually I will just update the purely visual classes.

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden relative">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Adjusted padding for mobile */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
                {/* Header Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-8 md:mb-12">
                        <div className="p-2 rounded-full bg-slate-900 group-hover:bg-slate-800 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm md:text-base">Back to Home</span>
                    </Link>
                </motion.div>

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6"
                    >
                        <Zap size={14} className="fill-indigo-400" />
                        Premium Learning Resources
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black tracking-tight mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-slate-400"
                    >
                        Master the Rules.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-xl text-slate-400 leading-relaxed mb-6 md:mb-8 px-2"
                    >
                        Dive into our comprehensive, interactive web guides designed for Important Rules and Acts for the Aspirants. Simplified, updated, and built for mastery.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-indigo-400 font-medium italic text-sm md:text-base"
                    >
                        "Designed for the eye, engineered for the mind."
                    </motion.p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {/* Card 1: FRSR */}
                    <GuideCard
                        href="/guide/frsr"
                        title="FR SR Rules"
                        badge="Flagship"
                        description="Master Fundamental & Supplementary Rules with visual flows, interactive tables, and search."
                        icon={<BookOpen className="w-6 h-6 md:w-8 md:h-8" />}
                        color="blue"
                        delay={0.3}
                    />

                    {/* Card 2: PMLA */}
                    <GuideCard
                        href="/guide/pmla"
                        title="PMLA 2002"
                        badge="Critical"
                        description="Complete guide to Prevention of Money Laundering Act. KYC norms, offences, and attachment rules."
                        icon={<ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />}
                        color="emerald"
                        delay={0.4}
                    />

                    {/* Card 3: CPA */}
                    <GuideCard
                        href="/guide/cpa"
                        title="CPA 2019"
                        badge="Updated"
                        description="Navigate the Consumer Protection Act with latest pecuniary limits, E-Commerce rules, and penalties."
                        icon={<Scale className="w-6 h-6 md:w-8 md:h-8" />}
                        color="amber"
                        delay={0.5}
                    />

                    {/* Card 4: PLI */}
                    <GuideCard
                        href="/guide/pli"
                        title="PLI Rules 2011"
                        badge="New"
                        description="Comprehensive master guide for Postal Life Insurance. Bonus rates, schemes, and incentive structures."
                        icon={<Briefcase className="w-6 h-6 md:w-8 md:h-8" />}
                        color="indigo"
                        delay={0.6}
                    />

                    {/* Card 5: CCS Conduct Rules */}
                    <GuideCard
                        href="/guide/ccs"
                        title="CCS Conduct Rules"
                        badge="Essential"
                        description="Professional conduct, integrity, and absolute devotion to duty. Rules 1 to 22 explained."
                        icon={<Gavel className="w-6 h-6 md:w-8 md:h-8" />}
                        color="violet"
                        delay={0.7}
                    />
                </div>

                {/* Footer Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 md:mt-20 text-center border-t border-slate-800 pt-8 md:pt-10"
                >
                    <p className="text-slate-500 text-xs md:text-sm">
                        &copy; {new Date().getFullYear()} Dak Guru Learning Systems.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// --- Sub-Components ---

function GuideCard({ href, title, badge, description, icon, color, delay }: any) {
    const colorVariants: any = {
        blue: "group-hover:shadow-blue-500/20 group-hover:border-blue-500/50 from-blue-500/20 to-transparent",
        emerald: "group-hover:shadow-emerald-500/20 group-hover:border-emerald-500/50 from-emerald-500/20 to-transparent",
        amber: "group-hover:shadow-amber-500/20 group-hover:border-amber-500/50 from-amber-500/20 to-transparent",
        indigo: "group-hover:shadow-indigo-500/20 group-hover:border-indigo-500/50 from-indigo-500/20 to-transparent",
        violet: "group-hover:shadow-violet-500/20 group-hover:border-violet-500/50 from-violet-500/20 to-transparent",
    };

    const iconColors: any = {
        blue: "text-blue-400 group-hover:text-blue-300 bg-blue-500/10 group-hover:bg-blue-500/20",
        emerald: "text-emerald-400 group-hover:text-emerald-300 bg-emerald-500/10 group-hover:bg-emerald-500/20",
        amber: "text-amber-400 group-hover:text-amber-300 bg-amber-500/10 group-hover:bg-amber-500/20",
        indigo: "text-indigo-400 group-hover:text-indigo-300 bg-indigo-500/10 group-hover:bg-indigo-500/20",
        violet: "text-violet-400 group-hover:text-violet-300 bg-violet-500/10 group-hover:bg-violet-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Link href={href} className={`group relative block h-full bg-slate-900/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-800 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl ${colorVariants[color]}`}>
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-br ${colorVariants[color]} transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-colors duration-300 ${iconColors[color]}`}>
                            {icon}
                        </div>
                        {badge && (
                            <span className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-300 group-hover:bg-white/10 transition-colors">
                                {badge}
                            </span>
                        )}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 group-hover:text-white transition-colors">{title}</h2>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 md:mb-8 flex-grow group-hover:text-slate-300 transition-colors">
                        {description}
                    </p>

                    <div className="flex items-center text-xs md:text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                        Explore Guide <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
