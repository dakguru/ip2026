'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Briefcase, BookOpen, ChevronRight, Star, Gavel, Lock, ShoppingCart, Mail, Calculator, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useCourse } from '@/contexts/CourseContext';

export default function GuidePage() {
    const { course } = useCourse();
    const [isLocked, setIsLocked] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
            if (cookie) {
                const value = cookie.split('=')[1];
                const decoded = decodeURIComponent(value);
                const session = JSON.parse(decoded);

                const level = session?.membershipLevel || 'free';
                const planId = session?.planId || '';

                let unlocked = false;
                if (course === 'PS_GR_B') {
                    const hasDiamond = level === 'gold' && (planId.includes('diamond') || planId.includes('ps_gr_b'));
                    const hasPlatinum = level === 'silver' && (planId.includes('platinum') || planId.includes('ps_gr_b'));
                    unlocked = hasDiamond || hasPlatinum;
                } else {
                    unlocked = level === 'gold' || level === 'silver';
                }

                if (unlocked) {
                    setIsLocked(false);
                }
            }
        } catch (e) {
            console.error("Failed to parse session", e);
        } finally {
            setIsLoading(false);
        }
    }, [course]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0c1222] flex items-center justify-center text-slate-400">
                <span className="text-sm">Loading access...</span>
            </div>
        );
    }

    if (isLocked) {
        return (
            <div className="min-h-screen bg-[#0c1222] flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white/[0.04] p-8 rounded-2xl border border-white/10 max-w-md w-full">
                    <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-7 h-7 text-amber-400" />
                    </div>
                    <h1 className="text-xl font-bold text-white mb-2">Premium Content</h1>
                    <p className="text-slate-400 text-sm mb-8">Access to the Web Guide is for Silver and Gold members. Upgrade to unlock all guides.</p>
                    <div className="flex flex-col gap-3">
                        <Link href="/pricing" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0c1222] font-semibold rounded-xl transition-colors">
                            Upgrade Now
                        </Link>
                        <Link href="/" className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium rounded-xl transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c1222] text-slate-100 selection:bg-amber-500/30 selection:text-white overflow-hidden relative">

            {/* Background: subtle grid + gradient orbs */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[28rem] bg-gradient-to-b from-teal-500/8 via-amber-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-15%] right-[-5%] w-[480px] h-[480px] bg-teal-500/12 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 py-6 sm:py-8 md:py-14 pb-[max(1.5rem,env(safe-area-inset-bottom))] relative z-10">
                {/* Back link - min 44px touch target on mobile */}
                <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 active:text-amber-400 transition-colors group mb-8 sm:mb-10 md:mb-14 min-h-[44px] min-w-[44px] -ml-2 pl-2 rounded-lg touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        <span className="p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 border border-white/5 group-hover:border-amber-500/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                </motion.div>

                {/* Hero */}
                <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-6"
                    >
                        <Star size={12} className="fill-amber-400/80" />
                        Premium Learning Resources
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 text-white"
                    >
                        Master the Rules.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-slate-400 text-base md:text-lg leading-relaxed mb-6"
                    >
                        Comprehensive, interactive web guides for Rules and Acts—simplified, updated, and built for mastery.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="text-teal-400/90 font-medium text-sm md:text-base"
                    >
                        &ldquo;Designed for the eye, engineered for the mind.&rdquo;
                    </motion.p>
                </div>

                {/* Cards grid - single column on mobile with comfortable gap for touch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-4 md:gap-6">
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

                    {/* Card 2: Post Office Act 2023 */}
                    <GuideCard
                        href="/guide/post-office-act-2023"
                        title="Post Office Act, 2023"
                        badge="New 2023"
                        description="Complete guide to the new Post Office Act. Services, interception, liability, offences, and key provisions for exams."
                        icon={<Mail className="w-6 h-6 md:w-8 md:h-8" />}
                        color="teal"
                        delay={0.35}
                    />

                    {/* Card 3: PMLA */}
                    <GuideCard
                        href="/guide/pmla"
                        title="PMLA 2002"
                        badge="Critical"
                        description="Complete guide to Prevention of Money Laundering Act. KYC norms, offences, and attachment rules."
                        icon={<ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />}
                        color="emerald"
                        delay={0.4}
                    />

                    {/* Card 3: Annual Report 24-25 */}
                    <GuideCard
                        href="/guides/annual-report-24-25/index.html"
                        title="Annual Report"
                        badge="New 2024-25"
                        description="Essential exam guide covering Department stats, policies, and key metrics for 2024-2025."
                        icon={<BookOpen className="w-6 h-6 md:w-8 md:h-8" />}
                        color="blue"
                        delay={0.45}
                    />

                    {/* Card 4: Constitution of India */}
                    <GuideCard
                        href="/guides/constitution/index.html"
                        title="Constitution of India"
                        badge="Preamble & Rights"
                        description="Comprehensive guide to Indian Constitution: Fundamental Rights, Duties, Judiciary, and more."
                        icon={<Scale className="w-6 h-6 md:w-8 md:h-8" />}
                        color="indigo"
                        delay={0.5}
                    />

                    {/* Card 5: Procurement Guide */}
                    <GuideCard
                        href="/guides/procurement/index.html"
                        title="Procurement Guide"
                        badge="GFR 2017+"
                        description="Master Procurement of Goods & Services. Modes, Policies (MSE/MII), and Financials simplified."
                        icon={<ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />}
                        color="purple"
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

                    {/* Card 5: FHB Vol-I */}
                    <GuideCard
                        href="/guides/fhb-vol-1/index.html"
                        title="FHB Vol-I"
                        badge="Financial"
                        description="Interactive master guide for Financial Handbook Volume I. Accounting rules, payments, and loss limits."
                        icon={<Briefcase className="w-6 h-6 md:w-8 md:h-8" />}
                        color="amber"
                        delay={0.65}
                    />

                    {/* Card 6: FHB Vol-II */}
                    <GuideCard
                        href="/guides/fhb-vol-2/index.html"
                        title="FHB Vol-II"
                        badge="Financial"
                        description="Supply of Stamps, Revenue Receipts, and Post Office Accounts. Essential guide for Vol-II."
                        icon={<BookOpen className="w-6 h-6 md:w-8 md:h-8" />}
                        color="emerald"
                        delay={0.68}
                    />

                    {/* Card 7: CCS Conduct Rules */}
                    <GuideCard
                        href="/guide/ccs"
                        title="CCS Conduct Rules"
                        badge="Essential"
                        description="Professional conduct, integrity, and absolute devotion to duty. Rules 1 to 22 explained."
                        icon={<Gavel className="w-6 h-6 md:w-8 md:h-8" />}
                        color="violet"
                        delay={0.7}
                    />

                    {/* GSPR 2018 – SB & Small Savings */}
                    <GuideCard
                        href="/guide/gspr"
                        title="Government Savings (GSPR 2018)"
                        badge="SB & Small Savings"
                        description="Post Office SB, TD, MIS, NSC, PPF, SSY, SCSS and small savings schemes. Limits, nomination, exam highlights."
                        icon={<Calculator className="w-6 h-6 md:w-8 md:h-8" />}
                        color="emerald"
                        delay={0.72}
                    />

                    {/* RTI Act 2005 */}
                    <GuideCard
                        href="/guide/rti"
                        title="RTI Act, 2005"
                        badge="Right to Information"
                        description="PIO, time limits (30 days / 48 hours), exemptions, appeal to CIC/SIC, and penalties. Essential for GK and Paper I."
                        icon={<FileText className="w-6 h-6 md:w-8 md:h-8" />}
                        color="blue"
                        delay={0.74}
                    />

                    {/* Post Office Rules 2024 */}
                    <GuideCard
                        href="/guide/post-office-rules-2024"
                        title="Post Office Rules, 2024"
                        badge="Under PO Act 2023"
                        description="Operational framework under the Post Office Act 2023. Services, standards, and licensing. Read with the Act."
                        icon={<Mail className="w-6 h-6 md:w-8 md:h-8" />}
                        color="cyan"
                        delay={0.76}
                    />

                    {/* CCS (CCA) Rules */}
                    <GuideCard
                        href="/guide/ccs-cca"
                        title="CCS (CCA) Rules"
                        badge="Discipline & Appeal"
                        description="Classification, penalties (minor and major), suspension, inquiry procedure, appeal and UPSC consultation."
                        icon={<Gavel className="w-6 h-6 md:w-8 md:h-8" />}
                        color="rose"
                        delay={0.78}
                    />
                </div>

                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 md:mt-24 text-center border-t border-white/5 pt-8"
                >
                    <p className="text-slate-500 text-xs md:text-sm">
                        &copy; {new Date().getFullYear()} Dak Guru Learning Systems.
                    </p>
                </motion.footer>
            </div>
        </div>
    );
}

// --- Sub-Components ---

const CARD_COLORS: Record<string, { border: string; icon: string; badge: string }> = {
    blue:   { border: "border-l-blue-500", icon: "text-blue-400 bg-blue-500/10", badge: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
    teal:   { border: "border-l-teal-500", icon: "text-teal-400 bg-teal-500/10", badge: "bg-teal-500/15 text-teal-300 border-teal-500/25" },
    emerald: { border: "border-l-emerald-500", icon: "text-emerald-400 bg-emerald-500/10", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
    amber:  { border: "border-l-amber-500", icon: "text-amber-400 bg-amber-500/10", badge: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
    indigo: { border: "border-l-indigo-500", icon: "text-indigo-400 bg-indigo-500/10", badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25" },
    violet: { border: "border-l-violet-500", icon: "text-violet-400 bg-violet-500/10", badge: "bg-violet-500/15 text-violet-300 border-violet-500/25" },
    purple: { border: "border-l-purple-500", icon: "text-purple-400 bg-purple-500/10", badge: "bg-purple-500/15 text-purple-300 border-purple-500/25" },
    cyan:   { border: "border-l-cyan-500", icon: "text-cyan-400 bg-cyan-500/10", badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
    rose:   { border: "border-l-rose-500", icon: "text-rose-400 bg-rose-500/10", badge: "bg-rose-500/15 text-rose-300 border-rose-500/25" },
};

function GuideCard({ href, title, badge, description, icon, color, delay }: any) {
    const c = CARD_COLORS[color] || CARD_COLORS.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="min-h-[120px]"
        >
            <Link
                href={href}
                className={`group relative block h-full rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] active:bg-white/[0.08] active:scale-[0.99] hover:border-white/15 transition-all duration-200 overflow-hidden border-l-4 ${c.border} touch-manipulation select-none`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
                        <div className={`shrink-0 p-2.5 sm:p-3 rounded-lg ${c.icon} transition-colors group-hover:brightness-110`}>
                            {icon}
                        </div>
                        {badge && (
                            <span className={`shrink-0 px-2 py-1 rounded-md border text-[10px] font-semibold uppercase tracking-wider ${c.badge}`}>
                                {badge}
                            </span>
                        )}
                    </div>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 leading-snug">{title}</h2>
                    <p className="text-[15px] sm:text-sm text-slate-400 leading-relaxed flex-grow mb-4 sm:mb-5">
                        {description}
                    </p>
                    {/* Min 44px touch target for "Explore guide" - full-width tappable area */}
                    <span className="inline-flex items-center min-h-[44px] -mb-1 text-[13px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-amber-400 group-active:text-amber-400 transition-colors">
                        Explore guide <ChevronRight className="w-4 h-4 sm:w-3.5 sm:h-3.5 ml-1 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform shrink-0" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
