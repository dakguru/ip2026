"use client";

import { useEffect, useState } from "react";
import {
    ArrowLeft, FileText, BookOpen, Zap,
    Share2, Calendar, Bookmark,
    Check, Download, Scale, Mail, Lightbulb, Gavel,
    ChevronRight, Sparkles, GraduationCap, Target, Clock
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import HomeHeader from "@/components/HomeHeader";
import DakSutraLoader from "../components/DakSutraLoader";
import PremiumLockedOverlay from "../components/PremiumLockedOverlay";
import { PremiumGateProvider, usePremiumGate } from "@/contexts/PremiumGateContext";

const CATEGORY_CONFIG: Record<string, {
    heroGradient: string;
    accentColor: string;
    accentBg: string;
    accentBorder: string;
    icon: React.ReactNode;
    pillClass: string;
}> = {
    Rule: {
        heroGradient: "from-blue-900 via-blue-800 to-slate-900",
        accentColor: "text-blue-600 dark:text-blue-400",
        accentBg: "bg-blue-50 dark:bg-blue-500/10",
        accentBorder: "border-blue-200 dark:border-blue-500/30",
        icon: <Gavel className="w-4 h-4 md:w-5 md:h-5" />,
        pillClass: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30",
    },
    Section: {
        heroGradient: "from-violet-900 via-violet-800 to-slate-900",
        accentColor: "text-violet-600 dark:text-violet-400",
        accentBg: "bg-violet-50 dark:bg-violet-500/10",
        accentBorder: "border-violet-200 dark:border-violet-500/30",
        icon: <BookOpen className="w-4 h-4 md:w-5 md:h-5" />,
        pillClass: "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30",
    },
    Regulation: {
        heroGradient: "from-emerald-900 via-emerald-800 to-slate-900",
        accentColor: "text-emerald-600 dark:text-emerald-400",
        accentBg: "bg-emerald-50 dark:bg-emerald-500/10",
        accentBorder: "border-emerald-200 dark:border-emerald-500/30",
        icon: <Scale className="w-4 h-4 md:w-5 md:h-5" />,
        pillClass: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30",
    },
    Circular: {
        heroGradient: "from-amber-900 via-amber-800 to-slate-900",
        accentColor: "text-amber-600 dark:text-amber-400",
        accentBg: "bg-amber-50 dark:bg-amber-500/10",
        accentBorder: "border-amber-200 dark:border-amber-500/30",
        icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />,
        pillClass: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30",
    },
    Explanation: {
        heroGradient: "from-indigo-900 via-indigo-800 to-slate-900",
        accentColor: "text-indigo-600 dark:text-indigo-400",
        accentBg: "bg-indigo-50 dark:bg-indigo-500/10",
        accentBorder: "border-indigo-200 dark:border-indigo-500/30",
        icon: <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />,
        pillClass: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30",
    },
};

const DEFAULT_CFG = CATEGORY_CONFIG.Rule;

interface DakSutraDetailClientProps {
    id: string;
    isLoggedIn: boolean;
    membershipLevel: string;
}

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function DakSutraDetailClientInner({ id, isLoggedIn, membershipLevel }: DakSutraDetailClientProps) {
    const isMobileApp = useIsMobileApp();
    const { isLocked, remainingTime, nextRefreshAt, isPremium } = usePremiumGate();
    const [entry, setEntry] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const isWarning = !isPremium && !isLocked && remainingTime <= 10;

    useEffect(() => {
        fetch(`/api/dak-sutra/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.entry) setEntry(data.entry);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: `Dak Guru: ${entry.title}`, text: `Check out: ${entry.title}`, url });
            } catch { }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = async () => {
        const { generateDakSutraPDF } = await import("@/lib/pdf-generator-dak-sutra");
        await generateDakSutraPDF({
            title: entry.title,
            rule_number: entry.rule_number,
            act_name: entry.act_name,
            category: entry.category,
            effective_date: entry.effective_date,
            official_text: entry.official_text || "",
            guru_explanation: entry.guru_explanation || "",
            practical_example: entry.practical_example,
            exam_insight: entry.exam_insight,
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-slate-950 pt-20">
                <DakSutraLoader />
            </div>
        );
    }

    if (!entry) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-zinc-400 dark:text-zinc-500" />
                </div>
                <p className="text-zinc-600 dark:text-slate-400 text-base font-bold">Rule not found or not yet published</p>
                <Link href="/dak-sutra" className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Back to Dak Sutra
                </Link>
            </div>
        );
    }

    const cfg = CATEGORY_CONFIG[entry.category] || DEFAULT_CFG;
    const bottomPad = isMobileApp ? "pb-32" : "pb-20 md:pb-24";

    return (
        <div className={`min-h-screen bg-white dark:bg-[#0F1117] text-zinc-900 dark:text-white ${bottomPad}`}>
            {/* Floating timer badge */}
            <AnimatePresence>
                {!isPremium && !isLocked && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className={`fixed top-3 right-3 z-[60] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black shadow-lg border backdrop-blur-sm transition-colors ${
                            isWarning
                                ? "bg-red-500/90 text-white border-red-400/50 animate-pulse"
                                : "bg-zinc-900/80 text-white border-white/10"
                        }`}
                    >
                        <Clock className="w-3 h-3 shrink-0" />
                        Free Access: {formatTime(remainingTime)}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rich Header */}
            {!isMobileApp && (
                <HomeHeader isLoggedIn={isLoggedIn} membershipLevel={membershipLevel as any} />
            )}

            {/* ── HERO BANNER ── */}
            <div className={`relative bg-gradient-to-br ${cfg.heroGradient} overflow-hidden`}>
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "20px 20px" }}
                />
                <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                {/* Nav bar */}
                <div className="relative max-w-4xl mx-auto px-4 pt-2 md:pt-4 pb-0 flex items-center justify-between">
                    <Link
                        href="/dak-sutra"
                        className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm font-semibold min-h-[44px] touch-manipulation"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>All Rules</span>
                    </Link>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-black uppercase tracking-widest bg-white/10 text-white border-white/30`}>
                        {cfg.icon}
                        <span className="hidden xs:inline">{entry.category}</span>
                    </div>
                </div>

                {/* Hero content */}
                <div className="relative max-w-4xl mx-auto px-4 py-4 md:py-12">
                    {entry.exam_tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {entry.exam_tags.map((tag: string) => (
                                <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-white/10 text-white/80 border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-lg sm:text-2xl md:text-4xl font-black text-white leading-tight mb-3 md:mb-6">
                        {entry.title}
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg md:rounded-xl border bg-white/10 border-white/20 min-w-0">
                            <Bookmark className="w-3 md:w-3.5 h-3 md:h-3.5 text-white/70 shrink-0" />
                            <span className="text-[10px] md:text-xs font-bold text-white/90 truncate">
                                {entry.act_name}{entry.rule_number ? ` — ${entry.rule_number}` : ""}
                            </span>
                        </div>
                        {entry.effective_date && (
                            <div className="flex items-center gap-1.2 px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg md:rounded-xl border bg-white/5 border-white/10">
                                <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5 text-white/50 shrink-0" />
                                <span className="text-[10px] md:text-xs font-medium text-white/70 whitespace-nowrap">
                                    {format(new Date(entry.effective_date), 'dd MMM yyyy')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-[#0F1117] to-transparent" />
            </div>

            {/* ── CONTENT (gated) ── */}
            <div className="relative max-w-4xl mx-auto px-3 sm:px-4 md:px-6 mt-1 min-h-[60vh]">
                {/* Blurred content wrapper */}
                <motion.div
                    animate={{ filter: isLocked && !isPremium ? "blur(6px)" : "blur(0px)" }}
                    transition={{ duration: 0.5 }}
                    style={{ pointerEvents: isLocked && !isPremium ? "none" : "auto", userSelect: isLocked && !isPremium ? "none" : "auto" }}
                    className="space-y-4 md:space-y-6"
                >
                    {/* 1. OFFICIAL PROVISION */}
                    <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white shadow-sm dark:shadow-none">
                        <div className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                                <FileText className="w-3 h-3 md:w-4 md:h-4 text-zinc-600 dark:text-zinc-300" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Official Provision</p>
                                <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium">Verbatim legal text</p>
                            </div>
                            <div className="ml-auto shrink-0 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-700/50 text-[8px] md:text-[9px] font-bold text-zinc-500 uppercase tracking-widest hidden sm:block">
                                Primary Source
                            </div>
                        </div>
                        <div className="p-4 md:p-8 overflow-x-auto">
                            <div
                                className="dak-html-content prose prose-zinc max-w-none text-zinc-700 text-[13px] md:text-base leading-relaxed
                                    prose-headings:font-bold prose-headings:text-sm md:prose-headings:text-base prose-headings:mt-4 prose-headings:mb-2
                                    prose-strong:font-bold prose-ul:space-y-1 prose-table:text-xs md:prose-table:text-sm
                                    prose-td:p-1.5 md:prose-td:p-2 prose-th:p-1.5 md:prose-th:p-2"
                                dangerouslySetInnerHTML={{ __html: entry.official_text }}
                            />
                        </div>
                    </div>

                    {/* 2. DAK GURU EXPLANATION */}
                    <div className={`rounded-2xl overflow-hidden border ${cfg.accentBorder} bg-white shadow-sm dark:shadow-none`}>
                        <div className={`flex items-center gap-2 px-3 py-2 md:px-5 md:py-4 border-b ${cfg.accentBorder} ${cfg.accentBg}`}>
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center shrink-0 ${cfg.accentBg} border ${cfg.accentBorder}`}>
                                <BookOpen className={`w-3 h-3 md:w-4 md:h-4 ${cfg.accentColor}`} />
                            </div>
                            <div className="min-w-0">
                                <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] ${cfg.accentColor}`}>Dak Guru Explains</p>
                                <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium">Plain language breakdown</p>
                            </div>
                            <div className={`ml-auto shrink-0 flex items-center gap-1 px-2 py-1 rounded border text-[8px] md:text-[9px] font-bold uppercase tracking-widest ${cfg.pillClass} hidden sm:flex`}>
                                <Sparkles className="w-2.5 h-2.5" />
                                Simplified
                            </div>
                        </div>
                        <div className="p-4 md:p-8 overflow-x-auto">
                            <div
                                className="dak-html-content prose prose-zinc max-w-none text-zinc-800 text-[13px] md:text-base leading-relaxed
                                    prose-headings:font-extrabold prose-headings:text-sm md:prose-headings:text-base prose-headings:mt-4 prose-headings:mb-2
                                    prose-strong:font-extrabold prose-ul:space-y-1.5 prose-ol:space-y-1.5 prose-table:text-xs md:prose-table:text-sm
                                    prose-td:p-1.5 md:prose-td:p-2 prose-th:p-1.5 md:prose-th:p-2"
                                dangerouslySetInnerHTML={{ __html: entry.guru_explanation }}
                            />
                        </div>
                    </div>

                    {/* 3. PRACTICAL EXAMPLE */}
                    {entry.practical_example && (
                        <div className="rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-950/50 shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-4 border-b border-blue-200 dark:border-blue-500/20 bg-blue-100/60 dark:bg-blue-500/5">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-blue-200 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center shrink-0">
                                    <Target className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Practical Example</p>
                                    <p className="text-[10px] md:text-xs text-blue-500/70 dark:text-blue-300/60 font-medium">Real-world scenario</p>
                                </div>
                                <div className="ml-auto shrink-0 px-2 py-1 rounded bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-[8px] md:text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hidden sm:block">
                                    Case Study
                                </div>
                            </div>
                            <div className="p-4 md:p-8 overflow-x-auto">
                                <div
                                    className="dak-html-content prose prose-zinc max-w-none text-blue-900 text-[13px] md:text-base leading-relaxed
                                        prose-headings:font-bold prose-headings:text-sm md:prose-headings:text-base prose-headings:mt-4 prose-headings:mb-2
                                        prose-strong:font-extrabold prose-ul:space-y-1.5 prose-ol:space-y-1.5 prose-ol:list-decimal
                                        prose-table:text-xs md:prose-table:text-sm prose-td:p-1.5 md:prose-td:p-2 prose-th:p-1.5 md:prose-th:p-2"
                                    dangerouslySetInnerHTML={{ __html: entry.practical_example }}
                                />
                            </div>
                        </div>
                    )}

                    {/* 4. EXAM INSIGHT */}
                    {entry.exam_insight && (
                        <div className="rounded-2xl overflow-hidden border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 shadow-sm dark:shadow-none relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-200/40 dark:bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                            <div className="relative flex items-center gap-2 px-3 py-2 md:px-5 md:py-4 border-b border-amber-200 dark:border-amber-500/20 bg-amber-100/60 dark:bg-amber-500/5">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-amber-200 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center shrink-0">
                                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">Exam Insight</p>
                                    <p className="text-[10px] md:text-xs text-amber-500/70 dark:text-amber-300/60 font-medium">What the examiner wants you to know</p>
                                </div>
                                <div className="ml-auto shrink-0 flex items-center gap-1 px-2 py-1 rounded bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-[8px] md:text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest hidden sm:flex">
                                    <GraduationCap className="w-2.5 h-2.5" />
                                    Must Read
                                </div>
                            </div>
                            <div className="relative p-4 md:p-8 overflow-x-auto">
                                <div
                                    className="dak-html-content prose prose-zinc max-w-none text-amber-900 text-[13px] md:text-base leading-relaxed
                                        prose-headings:font-extrabold prose-headings:text-sm md:prose-headings:text-base prose-headings:mt-4 prose-headings:mb-2
                                        prose-strong:font-extrabold prose-ul:space-y-1.5 prose-ol:space-y-1.5
                                        prose-table:text-xs md:prose-table:text-sm prose-td:p-1.5 md:prose-td:p-2 prose-th:p-1.5 md:prose-th:p-2"
                                    dangerouslySetInnerHTML={{ __html: entry.exam_insight }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── QUICK ACTIONS ── */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 md:pt-4">
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-all font-bold text-sm text-zinc-700 dark:text-zinc-200 active:scale-95 touch-manipulation min-h-[48px] sm:min-h-0"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-emerald-500" />}
                            {copied ? "Link Copied!" : "Share"}
                        </button>
                        {isPremium && (
                            <button
                                onClick={handleDownload}
                                className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 border border-blue-500 transition-all font-bold text-sm text-white active:scale-95 shadow-lg shadow-blue-500/20 touch-manipulation min-h-[48px] sm:min-h-0"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </button>
                        )}
                        <Link
                            href="/dak-sutra"
                            className="flex items-center justify-center sm:justify-end gap-1.5 sm:ml-auto text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 text-sm font-semibold transition-colors py-2 touch-manipulation"
                        >
                            More Rules <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                {/* Lock overlay */}
                <AnimatePresence>
                    {isLocked && !isPremium && (
                        <PremiumLockedOverlay nextRefreshAt={nextRefreshAt} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function DakSutraDetailClient({ id, isLoggedIn, membershipLevel }: DakSutraDetailClientProps) {
    const isPremium = membershipLevel !== "free" && membershipLevel !== "" && membershipLevel !== "mock_test";
    return (
        <PremiumGateProvider isPremium={isPremium}>
            <DakSutraDetailClientInner id={id} isLoggedIn={isLoggedIn} membershipLevel={membershipLevel} />
        </PremiumGateProvider>
    );
}
