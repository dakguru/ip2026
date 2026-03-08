"use client";

import { ArrowLeft, Bell, Calendar, ChevronRight, FileText, Gavel, Mail, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

type BlogUpdate = {
    id: string;
    title: string;
    date: string;
    category: string;
    description?: string;
    link?: string;
    image?: string;
};

const CATEGORY_ACCENTS: Record<string, string> = {
    Order: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    Circular: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
    Notification: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

const CATEGORY_TILE: Record<string, string> = {
    Order: "from-rose-500 to-orange-500",
    Circular: "from-sky-500 to-indigo-500",
    Notification: "from-amber-500 to-orange-500",
};

export default function BlogPage() {
    const isMobileApp = useIsMobileApp();
    const [updates, setUpdates] = useState<BlogUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const res = await fetch("/api/blog", { cache: "no-store" });
                if (res.ok) {
                    const data = await res.json();
                    setUpdates(data);
                }
            } catch (error) {
                console.error("Failed to load updates", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdates();
    }, []);

    const categories = useMemo(() => {
        const set = new Set(updates.map((u) => u.category).filter(Boolean));
        return ["All", ...Array.from(set)];
    }, [updates]);

    const filteredUpdates = useMemo(() => {
        const q = query.trim().toLowerCase();
        const byCategory = updates.filter((update) => {
            if (selectedCategory === "All") return true;
            return update.category === selectedCategory;
        });

        const byQuery = byCategory.filter((update) => {
            if (!q) return true;
            return (
                update.title.toLowerCase().includes(q) ||
                (update.description || "").toLowerCase().includes(q) ||
                (update.category || "").toLowerCase().includes(q)
            );
        });

        return byQuery.sort((a, b) => {
            const first = new Date(a.date).getTime();
            const second = new Date(b.date).getTime();
            return sortBy === "newest" ? second - first : first - second;
        });
    }, [query, selectedCategory, sortBy, updates]);

    const categoryCounts = useMemo(() => {
        return updates.reduce<Record<string, number>>((acc, update) => {
            const key = update.category || "Other";
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    }, [updates]);

    const featuredUpdate = filteredUpdates[0];
    const listUpdates = filteredUpdates.slice(1);

    const categoryBadge = (category: string) =>
        CATEGORY_ACCENTS[category] || "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";

    const categoryGradient = (category: string) => CATEGORY_TILE[category] || "from-zinc-500 to-zinc-700";

    if (isMobileApp) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
                <div className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center gap-3">
                    <Link href="/" className="p-2 -ml-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex-1">DG Blog</h1>
                </div>

                <div className="p-4 space-y-4">
                    <section className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Circulars, notifications and orders in one place.</p>
                        <div className="relative mb-3">
                            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search updates"
                                className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${selectedCategory === category
                                        ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                                        : "bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </section>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : filteredUpdates.length > 0 ? (
                        <div className="space-y-3">
                            {filteredUpdates.map((update) => (
                                <Link key={update.id} href={`/blog/${update.id}`} className="block group">
                                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-sm border border-zinc-100 dark:border-zinc-800 flex gap-4 active:scale-[0.98] transition-all">
                                        <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center shadow-inner relative">
                                            {update.image ? (
                                                <img src={update.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className={`w-full h-full flex items-center justify-center text-white bg-gradient-to-br ${categoryGradient(update.category)}`}>
                                                    {update.category === "Order" ? <Gavel className="w-6 h-6" /> :
                                                        update.category === "Circular" ? <FileText className="w-6 h-6" /> :
                                                            <Bell className="w-6 h-6" />}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${categoryBadge(update.category)}`}>
                                                    {update.category}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 flex items-center gap-1 truncate">
                                                    <Calendar className="w-2.5 h-2.5" />
                                                    {new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                                </span>
                                            </div>

                                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                                                {update.title}
                                            </h3>
                                        </div>

                                        <div className="self-center text-zinc-300 dark:text-zinc-600">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                            <Mail className="w-12 h-12 mb-2 opacity-20" />
                            <p className="text-sm">No updates found for this filter.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] items-start">
                    <section className="space-y-6">
                        <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-sm">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">Official Updates</p>
                                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">DG Blog</h1>
                                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                                        Latest circulars, notifications, and orders relevant to the Department of Posts.
                                    </p>
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 min-w-[130px]">
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Total posts</p>
                                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{updates.length}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search by keyword, category, or topic"
                                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
                                    />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                                    className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-zinc-200 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
                                >
                                    <option value="newest">Newest first</option>
                                    <option value="oldest">Oldest first</option>
                                </select>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedCategory === category
                                            ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                                            : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 animate-pulse space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-28 bg-zinc-100 dark:bg-zinc-800 rounded-xl"></div>
                                ))}
                            </div>
                        ) : filteredUpdates.length > 0 ? (
                            <div className="space-y-4">
                                {featuredUpdate && (
                                    <Link href={`/blog/${featuredUpdate.id}`} className="block group">
                                        <article className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-7 shadow-sm hover:shadow-md transition">
                                            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500 dark:text-zinc-400 mb-3">
                                                Featured update
                                            </p>
                                            <div className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-5 items-start">
                                                <div className="w-full h-40 rounded-2xl overflow-hidden relative">
                                                    {featuredUpdate.image ? (
                                                        <img src={featuredUpdate.image} alt={featuredUpdate.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    ) : (
                                                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br text-white ${categoryGradient(featuredUpdate.category)}`}>
                                                            {featuredUpdate.category === "Order" ? <Gavel className="w-10 h-10" /> :
                                                                featuredUpdate.category === "Circular" ? <FileText className="w-10 h-10" /> :
                                                                    <Bell className="w-10 h-10" />}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryBadge(featuredUpdate.category)}`}>
                                                            {featuredUpdate.category}
                                                        </span>
                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {new Date(featuredUpdate.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                                        {featuredUpdate.title}
                                                    </h2>
                                                    <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
                                                        {featuredUpdate.description || "Tap to read the complete update."}
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                )}

                                {listUpdates.map((update) => (
                                    <Link key={update.id} href={`/blog/${update.id}`} className="block group">
                                        <article className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:shadow-md transition">
                                            <div className="flex gap-4">
                                                <div className={`hidden sm:flex shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${categoryGradient(update.category)} text-white items-center justify-center`}>
                                                    {update.category === "Order" ? <Gavel className="w-6 h-6" /> :
                                                        update.category === "Circular" ? <FileText className="w-6 h-6" /> :
                                                            <Bell className="w-6 h-6" />}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryBadge(update.category)}`}>
                                                            {update.category}
                                                        </span>
                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
                                                        {update.title}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                                        {update.description || "Read the full circular for complete details."}
                                                    </p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600 shrink-0 self-center" />
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center">
                                <Mail className="w-12 h-12 mx-auto mb-3 text-zinc-300 dark:text-zinc-600" />
                                <p className="text-zinc-600 dark:text-zinc-400">No updates match your current filters.</p>
                            </div>
                        )}
                    </section>

                    <aside className="space-y-4 lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">Categories</h3>
                            <div className="space-y-2">
                                {Object.entries(categoryCounts).map(([category, count]) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <span className="text-zinc-700 dark:text-zinc-300">{category}</span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">Recent posts</h3>
                            <div className="space-y-3">
                                {updates.slice(0, 4).map((update) => (
                                    <Link key={update.id} href={`/blog/${update.id}`} className="block group">
                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                            {update.title}
                                        </p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                            {new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
