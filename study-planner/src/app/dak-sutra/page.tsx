"use client";

import { useEffect, useState, useMemo } from "react";
import {
    Search, BookOpen, ChevronRight, Loader2, ArrowLeft,
    Bookmark, Calendar, Scale, FileText, Mail, Lightbulb,
    Gavel, Sparkles, TrendingUp, GraduationCap, Filter
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

interface DakSutraEntry {
    _id: string;
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

export default function DakSutraPublicListPage() {
    const isMobileApp = useIsMobileApp();
    const [entries, setEntries] = useState<DakSutraEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [debouncedSearch, setDebouncedSearch] = useState("");

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
        <AppScreenWrapper hideStatusBarPadding={true}>
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 text-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-violet-500/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 md:px-6 pb-8 md:pb-16 pt-[max(32px,calc(env(safe-area-inset-top,0px)+16px))] md:pt-16">
                    {/* Back link */}
                    <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold mb-5 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Home
                    </Link>

                    {/* Stylish Dak Sutra wordmark */}
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-transparent">
                                Dak Sutra
                            </span>
                        </h1>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-200 mb-4 md:mb-6 backdrop-blur-sm">
                        <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        Postal Laws Decoded for LDCE IP &amp; PS Group B
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight mb-3 md:mb-4">
                        Postal Rules,{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                            Simplified.
                        </span>
                    </h2>

                    <p className="text-blue-200/80 max-w-xl text-sm md:text-base leading-relaxed mb-5 md:mb-8">
                        Official provisions broken down with plain-language explanations, real-life examples, and exam-focused insights.
                    </p>

                    <div className="flex flex-wrap gap-2 md:gap-4">
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 md:px-4 md:py-2.5">
                            <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-300" />
                            <span className="text-xs md:text-sm font-bold text-white">{entries.length}+ Rules</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 md:px-4 md:py-2.5">
                            <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-300" />
                            <span className="text-xs md:text-sm font-bold text-white">Exam-Focused</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 md:px-4 md:py-2.5">
                            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300" />
                            <span className="text-xs md:text-sm font-bold text-white">Dak Guru Explained</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search + Filter + Cards */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-10 pb-[max(32px,calc(env(safe-area-inset-bottom,0px)+24px))]">

                {/* Search */}
                <div className="mb-4 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search rules, sections, acts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl md:rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-all font-medium shadow-sm"
                    />
                </div>

                {/* Category Filter Pills — full-bleed scroll on mobile */}
                <div className="-mx-4 px-4 md:mx-0 md:px-0 mb-5 md:mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                        {categories.map((cat) => {
                            const cfg = cat === "all" ? null : CATEGORY_CONFIG[cat];
                            const isActive = categoryFilter === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 md:px-4 rounded-xl text-xs font-bold border transition-all shrink-0 snap-start touch-manipulation ${
                                        isActive
                                            ? cat === "all"
                                                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent shadow-lg"
                                                : `${cfg?.badge} border-transparent shadow-md`
                                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                                    }`}
                                >
                                    {cfg?.icon}
                                    {cat === "all" ? "All" : cat + "s"}
                                    {cat !== "all" && categoryCounts[cat] ? (
                                        <span className="ml-0.5 text-[10px] opacity-70">{categoryCounts[cat]}</span>
                                    ) : null}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results count */}
                {!isLoading && (
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 md:mb-6">
                        {entries.length} {entries.length === 1 ? "entry" : "entries"} found
                    </p>
                )}

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 md:py-32">
                        <div className="relative">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mb-4 shadow-xl shadow-blue-500/30">
                                <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900">
                                <Loader2 className="w-full h-full animate-spin text-blue-600" />
                            </div>
                        </div>
                        <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mt-3">Loading Dak Sutra...</p>
                    </div>
                ) : entries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                        {entries.map((entry) => {
                            const cfg = CATEGORY_CONFIG[entry.category] || DEFAULT_CONFIG;
                            return (
                                <Link
                                    key={entry._id}
                                    href={`/dak-sutra/${entry._id}`}
                                    className={`group relative bg-white dark:bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-xl touch-manipulation ${cfg.border} ${cfg.glow}`}
                                >
                                    {/* Top colour stripe */}
                                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cfg.stripe}`} />

                                    <div className="p-4 pt-5 min-w-0">
                                        {/* Row 1 — Category badge + Date */}
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide shrink-0 ${cfg.badge}`}>
                                                {cfg.icon}
                                                {entry.category}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-semibold text-zinc-400 shrink-0">
                                                <Calendar className="w-3 h-3" />
                                                {entry.effective_date ? format(new Date(entry.effective_date), 'MMM yyyy') : '—'}
                                            </div>
                                        </div>

                                        {/* Row 2 — Act name */}
                                        <div className={`flex items-start gap-1.5 mb-1 ${cfg.badgeText}`}>
                                            <Bookmark className="w-3 h-3 shrink-0 mt-[2px]" />
                                            <span className="text-[11px] font-black leading-snug break-words min-w-0">
                                                {entry.act_name}
                                            </span>
                                        </div>

                                        {/* Row 3 — Rule number (if present, separate line) */}
                                        {entry.rule_number && (
                                            <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 mb-2.5 pl-[18px] leading-snug break-words">
                                                {entry.rule_number}
                                            </p>
                                        )}

                                        {/* Divider */}
                                        <div className="border-t border-zinc-100 dark:border-zinc-800 mb-2.5" />

                                        {/* Row 4 — Title */}
                                        <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words line-clamp-2 min-w-0">
                                            {entry.title}
                                        </h3>

                                        {/* Row 5 — Exam tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {entry.exam_tags?.map(tag => (
                                                <span
                                                    key={tag}
                                                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${TAG_COLORS[tag] || "bg-zinc-50 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700"}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Row 6 — Footer CTA */}
                                        <div className={`flex items-center justify-between pt-2.5 border-t border-zinc-100 dark:border-zinc-800`}>
                                            <span className={`text-[11px] font-black tracking-wide ${cfg.badgeText}`}>
                                                Read full rule
                                            </span>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${cfg.badge} group-hover:scale-110 transition-transform`}>
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 md:py-24 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-7 h-7 md:w-8 md:h-8 text-zinc-300 dark:text-zinc-600" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">No matches found</h3>
                        <p className="text-zinc-500 text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </AppScreenWrapper>
    );
}
