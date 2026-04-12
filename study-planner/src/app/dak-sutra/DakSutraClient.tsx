"use client";

import { useEffect, useState, useMemo } from "react";
import {
    Search, BookOpen, ChevronRight,
    Calendar, Scale, Mail, Lightbulb,
    Gavel, Sparkles, TrendingUp, GraduationCap
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import HomeHeader from "@/components/HomeHeader";
import DakSutraLoader from "./components/DakSutraLoader";

interface DakSutraEntry {
    _id: string;
    slug: string;
    title: string;
    rule_number: string;
    act_name: string;
    category: string;
    effective_date: string;
    exam_tags: string[];
}

const CATEGORY_CONFIG: Record<string, {
    gradient: string;
    border: string;
    badge: string;
    badgeText: string;
    icon: React.ReactNode;
    glow: string;
    stripe: string;
}> = {
    Rule: {
        gradient: "from-blue-600/10 via-blue-500/5 to-transparent",
        border: "border-blue-200 dark:border-blue-500/20",
        badge: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400",
        badgeText: "text-blue-600 dark:text-blue-400",
        icon: <Gavel className="w-3.5 h-3.5" />,
        glow: "shadow-blue-500/10",
        stripe: "from-blue-500 to-blue-400",
    },
    Section: {
        gradient: "from-violet-600/10 via-violet-500/5 to-transparent",
        border: "border-violet-200 dark:border-violet-500/20",
        badge: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400",
        badgeText: "text-violet-600 dark:text-violet-400",
        icon: <BookOpen className="w-3.5 h-3.5" />,
        glow: "shadow-violet-500/10",
        stripe: "from-violet-500 to-violet-400",
    },
    Regulation: {
        gradient: "from-emerald-600/10 via-emerald-500/5 to-transparent",
        border: "border-emerald-200 dark:border-emerald-500/20",
        badge: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        badgeText: "text-emerald-600 dark:text-emerald-400",
        icon: <Scale className="w-3.5 h-3.5" />,
        glow: "shadow-emerald-500/10",
        stripe: "from-emerald-500 to-emerald-400",
    },
    Circular: {
        gradient: "from-amber-600/10 via-amber-500/5 to-transparent",
        border: "border-amber-200 dark:border-amber-500/20",
        badge: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400",
        badgeText: "text-amber-600 dark:text-amber-400",
        icon: <Mail className="w-3.5 h-3.5" />,
        glow: "shadow-amber-500/10",
        stripe: "from-amber-500 to-amber-400",
    },
    Explanation: {
        gradient: "from-indigo-600/10 via-indigo-500/5 to-transparent",
        border: "border-indigo-200 dark:border-indigo-500/20",
        badge: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
        badgeText: "text-indigo-600 dark:text-indigo-400",
        icon: <Lightbulb className="w-3.5 h-3.5" />,
        glow: "shadow-indigo-500/10",
        stripe: "from-indigo-500 to-indigo-400",
    },
};

const DEFAULT_CONFIG = CATEGORY_CONFIG.Rule;

const TAG_COLORS: Record<string, string> = {
    "LDCE IP": "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    "PS Group B": "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
    "GDS": "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
};

interface DakSutraClientProps {
    isLoggedIn: boolean;
    membershipLevel: string;
}

export default function DakSutraClient({ isLoggedIn, membershipLevel }: DakSutraClientProps) {
    const isMobileApp = useIsMobileApp();
    const [entries, setEntries] = useState<DakSutraEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Force light mode on this page regardless of user's dark mode preference
    useEffect(() => {
        const html = document.documentElement;
        const wasDark = html.classList.contains('dark');
        html.classList.remove('dark');
        return () => {
            if (wasDark) html.classList.add('dark');
        };
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    useEffect(() => {
        fetchEntries();
    }, [debouncedSearch, categoryFilter]);

    const fetchEntries = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams();
            if (debouncedSearch) query.set('search', debouncedSearch);
            if (categoryFilter !== 'all') query.set('category', categoryFilter);
            const res = await fetch(`/api/dak-sutra?${query.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setEntries(data.entries || []);
            }
        } catch (error) {
            console.error("Failed to fetch entries", error);
        } finally {
            setIsLoading(false);
        }
    };

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        entries.forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
        return counts;
    }, [entries]);

    const categories = ["all", "Rule", "Section", "Regulation", "Circular", "Explanation"];

    return (
        <div className="min-h-screen bg-[#f5f6fa] overflow-x-hidden">
            {/* Rich Header */}
            {!isMobileApp && (
                <HomeHeader isLoggedIn={isLoggedIn} membershipLevel={membershipLevel as any} />
            )}

            <AppScreenWrapper hideStatusBarPadding={true}>
                {/* Hero */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 text-white">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                    <div className="absolute top-0 left-0 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl" />

                    <div className="relative w-full px-4 md:max-w-7xl md:mx-auto md:px-6 pb-6 md:pb-16 pt-[max(20px,calc(env(safe-area-inset-top,0px)+8px))] md:pt-16">
                        {/* Wordmark */}
                        <div className="flex items-center gap-2.5 mb-2 md:mb-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-none">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-transparent">
                                    Dak Sutra
                                </span>
                            </h1>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 md:mb-6 backdrop-blur-sm">
                            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            Postal Laws Decoded for LDCE IP &amp; PS Group B
                        </div>

                        <h2 className="text-[22px] sm:text-3xl md:text-5xl font-black leading-tight mb-1.5 md:mb-4">
                            Postal Rules,{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Simplified.
                            </span>
                        </h2>

                        <p className="text-blue-200/80 text-[12px] md:text-base leading-relaxed mb-4 md:mb-8 max-w-xs md:max-w-xl">
                            Official provisions broken down with plain-language explanations, real-life examples, and exam-focused insights.
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-4">
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 md:px-4 md:py-2.5">
                                <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-300" />
                                <span className="text-[11px] md:text-sm font-bold text-white">{entries.length}+ Rules</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 md:px-4 md:py-2.5">
                                <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-300" />
                                <span className="text-[11px] md:text-sm font-bold text-white">Exam-Focused</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 md:px-4 md:py-2.5">
                                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300" />
                                <span className="text-[11px] md:text-sm font-bold text-white">Guru Explained</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search + Filter + Cards */}
                <div className="w-full md:max-w-7xl md:mx-auto px-3 md:px-6 pt-4 md:pt-8 pb-[max(32px,calc(env(safe-area-inset-bottom,0px)+24px))]">

                    {/* Search */}
                    <div className="mb-3 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search rules, sections, acts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 md:py-4 bg-white border border-zinc-200 rounded-2xl text-[13px] md:text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all font-medium shadow-sm"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="mb-4 md:mb-6">
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {categories.map((cat) => {
                                const cfg = cat === "all" ? null : CATEGORY_CONFIG[cat];
                                const isActive = categoryFilter === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setCategoryFilter(cat)}
                                        className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-xl text-[11px] font-bold border transition-all shrink-0 touch-manipulation ${
                                            isActive
                                                ? cat === "all"
                                                    ? "bg-zinc-900 text-white border-transparent shadow-md"
                                                    : `${cfg?.badge} border-transparent shadow-md`
                                                : "bg-white border-zinc-200 text-zinc-500"
                                        }`}
                                    >
                                        {cfg?.icon}
                                        {cat === "all" ? "All" : cat + "s"}
                                        {cat !== "all" && categoryCounts[cat] ? (
                                            <span className="ml-0.5 text-[9px] opacity-60 font-black">{categoryCounts[cat]}</span>
                                        ) : null}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results count */}
                    {!isLoading && entries.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-px flex-1 bg-zinc-200" />
                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest px-1">
                                {entries.length} {entries.length === 1 ? "entry" : "entries"}
                            </span>
                            <div className="h-px flex-1 bg-zinc-200" />
                        </div>
                    )}

                    {/* ── CARDS ── */}
                    {isLoading ? (
                        <DakSutraLoader />
                    ) : entries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                            {entries.map((entry) => {
                                const cfg = CATEGORY_CONFIG[entry.category] || DEFAULT_CONFIG;
                                return (
                                    <Link
                                        key={entry._id}
                                        href={`/dak-sutra/${entry.slug || entry._id}`}
                                        className="group block w-full bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-[0_1px_6px_rgba(0,0,0,0.06)] active:scale-[0.98] active:shadow-none hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-all duration-150 touch-manipulation"
                                    >
                                        {/* Top gradient stripe */}
                                        <div className={`h-[3px] w-full bg-gradient-to-r ${cfg.stripe}`} />

                                        <div className="p-4">
                                            {/* Row 1 — category + date */}
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shrink-0 ${cfg.badge}`}>
                                                    {cfg.icon}
                                                    {entry.category}
                                                </span>
                                                {entry.effective_date && (
                                                    <span className="text-[10px] font-semibold text-zinc-400 tabular-nums shrink-0">
                                                        {format(new Date(entry.effective_date), 'MMM yyyy')}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Act name */}
                                            <p className={`text-[10px] font-black uppercase tracking-wider mb-0.5 truncate ${cfg.badgeText}`}>
                                                {entry.act_name}
                                            </p>

                                            {/* Rule reference */}
                                            {entry.rule_number && (
                                                <p className="text-[9.5px] text-zinc-400 font-medium mb-3 line-clamp-1">
                                                    {entry.rule_number}
                                                </p>
                                            )}

                                            {/* Title — hero text */}
                                            <h3 className={`text-[15px] font-extrabold text-zinc-900 leading-snug line-clamp-2 mb-4 group-hover:${cfg.badgeText} transition-colors`}>
                                                {entry.title}
                                            </h3>

                                            {/* Footer — tags + read arrow */}
                                            <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100">
                                                <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                                                    {entry.exam_tags?.slice(0, 2).map(tag => (
                                                        <span
                                                            key={tag}
                                                            className={`text-[9px] font-bold px-2 py-0.5 rounded-lg border ${TAG_COLORS[tag] || "bg-zinc-50 text-zinc-400 border-zinc-200"}`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {(entry.exam_tags?.length ?? 0) > 2 && (
                                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg border bg-zinc-50 text-zinc-400 border-zinc-200">
                                                            +{entry.exam_tags.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className={`inline-flex items-center gap-0.5 text-[10px] font-black shrink-0 ${cfg.badgeText} group-hover:gap-1.5 transition-all`}>
                                                    Read
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 md:py-24 rounded-2xl border border-zinc-100 bg-white">
                            <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mx-auto mb-3">
                                <Search className="w-5 h-5 text-zinc-300" />
                            </div>
                            <p className="text-sm font-bold text-zinc-700 mb-1">No matches found</p>
                            <p className="text-zinc-400 text-xs">Try different filters or search terms.</p>
                        </div>
                    )}
                </div>
            </AppScreenWrapper>
        </div>
    );
}
