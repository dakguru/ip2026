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
}> = {
    Rule: {
        gradient: "from-blue-600/10 via-blue-500/5 to-transparent",
        border: "border-blue-200 dark:border-blue-500/20",
        badge: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400",
        badgeText: "text-blue-600 dark:text-blue-400",
        icon: <Gavel className="w-4 h-4" />,
        glow: "shadow-blue-500/10",
    },
    Section: {
        gradient: "from-violet-600/10 via-violet-500/5 to-transparent",
        border: "border-violet-200 dark:border-violet-500/20",
        badge: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400",
        badgeText: "text-violet-600 dark:text-violet-400",
        icon: <BookOpen className="w-4 h-4" />,
        glow: "shadow-violet-500/10",
    },
    Regulation: {
        gradient: "from-emerald-600/10 via-emerald-500/5 to-transparent",
        border: "border-emerald-200 dark:border-emerald-500/20",
        badge: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        badgeText: "text-emerald-600 dark:text-emerald-400",
        icon: <Scale className="w-4 h-4" />,
        glow: "shadow-emerald-500/10",
    },
    Circular: {
        gradient: "from-amber-600/10 via-amber-500/5 to-transparent",
        border: "border-amber-200 dark:border-amber-500/20",
        badge: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400",
        badgeText: "text-amber-600 dark:text-amber-400",
        icon: <Mail className="w-4 h-4" />,
        glow: "shadow-amber-500/10",
    },
    Explanation: {
        gradient: "from-indigo-600/10 via-indigo-500/5 to-transparent",
        border: "border-indigo-200 dark:border-indigo-500/20",
        badge: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
        badgeText: "text-indigo-600 dark:text-indigo-400",
        icon: <Lightbulb className="w-4 h-4" />,
        glow: "shadow-indigo-500/10",
    },
};

const DEFAULT_CONFIG = CATEGORY_CONFIG.Rule;

const TAG_COLORS: Record<string, string> = {
    "LDCE IP": "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    "PS Group B": "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
    "GDS": "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
};

export default function DakSutraPublicListPage() {
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
        <AppScreenWrapper
            header={
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-semibold text-sm">Home</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                                <BookOpen className="w-3.5 h-3.5 text-white" />
                            </div>
                            <h1 className="text-base font-black tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent uppercase">
                                Dak Sutra
                            </h1>
                        </div>
                        <div className="w-16" />
                    </div>
                </div>
            }
        >
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 text-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
                <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-200 mb-6 backdrop-blur-sm">
                        <Sparkles className="w-3 h-3" />
                        Postal Laws Decoded for LDCE &amp; PS Group B
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                        Postal Rules,{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                            Simplified.
                        </span>
                    </h2>
                    <p className="text-blue-200/80 max-w-xl text-base md:text-lg leading-relaxed mb-8">
                        Official provisions broken down with plain-language explanations, real-life examples, and exam-focused insights — everything you need, nothing you don't.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                            <GraduationCap className="w-4 h-4 text-blue-300" />
                            <span className="text-sm font-bold text-white">{entries.length}+ Rules</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                            <TrendingUp className="w-4 h-4 text-violet-300" />
                            <span className="text-sm font-bold text-white">Exam-Focused</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span className="text-sm font-bold text-white">Dak Guru Explained</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                {/* Search + Filter */}
                <div className="mb-8 flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search rules, sections, acts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-5 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-all font-medium shadow-sm"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {categories.map((cat) => {
                            const cfg = cat === "all" ? null : CATEGORY_CONFIG[cat];
                            const isActive = categoryFilter === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                                        isActive
                                            ? cat === "all"
                                                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent shadow-lg"
                                                : `${cfg?.badge} border-transparent shadow-md`
                                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                                    }`}
                                >
                                    {cfg?.icon}
                                    {cat === "all" ? "All Types" : cat + "s"}
                                    {cat !== "all" && categoryCounts[cat] && (
                                        <span className={`ml-1 text-[10px] opacity-70`}>{categoryCounts[cat]}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results count */}
                {!isLoading && (
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">
                        {entries.length} {entries.length === 1 ? "entry" : "entries"} found
                    </p>
                )}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mb-4 shadow-xl shadow-blue-500/30">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900">
                                <Loader2 className="w-full h-full animate-spin text-blue-600" />
                            </div>
                        </div>
                        <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mt-3">Loading Dak Sutra...</p>
                    </div>
                ) : entries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {entries.map((entry) => {
                            const cfg = CATEGORY_CONFIG[entry.category] || DEFAULT_CONFIG;
                            return (
                                <Link
                                    key={entry._id}
                                    href={`/dak-sutra/${entry._id}`}
                                    className={`group relative bg-white dark:bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${cfg.border} ${cfg.glow}`}
                                >
                                    {/* Top gradient stripe */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                                        entry.category === "Rule" ? "from-blue-500 to-blue-400" :
                                        entry.category === "Section" ? "from-violet-500 to-violet-400" :
                                        entry.category === "Regulation" ? "from-emerald-500 to-emerald-400" :
                                        entry.category === "Circular" ? "from-amber-500 to-amber-400" :
                                        "from-indigo-500 to-indigo-400"
                                    }`} />

                                    <div className="p-5 pt-6">
                                        {/* Header row */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${cfg.badge}`}>
                                                {cfg.icon}
                                                {entry.category}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                                                <Calendar className="w-3 h-3" />
                                                {entry.effective_date ? format(new Date(entry.effective_date), 'MMM yyyy') : 'N/A'}
                                            </div>
                                        </div>

                                        {/* Act name */}
                                        <div className={`flex items-center gap-1.5 mb-2 ${cfg.badgeText}`}>
                                            <Bookmark className="w-3 h-3 shrink-0" />
                                            <span className="text-[11px] font-black truncate">
                                                {entry.act_name}{entry.rule_number ? ` · ${entry.rule_number}` : ""}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 leading-snug mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {entry.title}
                                        </h3>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {entry.exam_tags?.map(tag => (
                                                <span
                                                    key={tag}
                                                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${TAG_COLORS[tag] || "bg-zinc-50 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700"}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                            <span className={`text-xs font-bold ${cfg.badgeText} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                Read more →
                                            </span>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${cfg.badge} group-hover:scale-110`}>
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">No matches found</h3>
                        <p className="text-zinc-500 text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </AppScreenWrapper>
    );
}
