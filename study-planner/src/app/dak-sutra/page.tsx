
"use client";

import { useEffect, useState } from "react";
import {
    Search, Filter, BookOpen, ChevronRight,
    Loader2, ArrowLeft, Bookmark, Calendar
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

export default function DakSutraPublicListPage() {
    const [entries, setEntries] = useState<DakSutraEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    useEffect(() => {
        fetchEntries();
    }, [search, categoryFilter]);

    const fetchEntries = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams();
            if (search) query.set('search', search);
            if (categoryFilter !== 'all') query.set('category', categoryFilter);

            const res = await fetch(`/api/dak-sutra?${query.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setEntries(data.entries);
            }
        } catch (error) {
            console.error("Failed to fetch entries", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppScreenWrapper
            header={
                <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-all">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-medium text-sm">Home</span>
                        </Link>
                        <h1 className="text-lg font-black text-blue-600 uppercase tracking-tight">Dak Sutra</h1>
                        <div className="w-10"></div> {/* Spacer */}
                    </div>
                </div>
            }
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                            Postal Rules <br />
                            <span className="text-blue-600">Simplified.</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-lg font-medium">
                            Explore structured breakdowns of Department of Posts rules, regulations, and circulars designed for LDCE aspirants.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search rules..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-pointer text-zinc-700 dark:text-zinc-300 transition-all"
                        >
                            <option value="all">All Items</option>
                            <option value="Rule">Rules</option>
                            <option value="Section">Sections</option>
                            <option value="Regulation">Regulations</option>
                            <option value="Circular">Circulars</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                        <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Loading Dak Sutra...</p>
                    </div>
                ) : entries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {entries.map((entry) => (
                            <Link
                                key={entry._id}
                                href={`/dak-sutra/${entry._id}`}
                                className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {entry.category}
                                    </span>
                                </div>

                                <div className="mt-4 mb-6">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Bookmark className="w-4 h-4" />
                                        <span className="text-xs font-black uppercase tracking-tighter">
                                            {entry.act_name} {entry.rule_number ? `#${entry.rule_number}` : ''}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors leading-tight">
                                        {entry.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {entry.exam_tags?.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-800 text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">
                                            {entry.effective_date ? format(new Date(entry.effective_date), 'MMM yyyy') : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
                        <BookOpen className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">No matches found</h3>
                        <p className="text-zinc-500 text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </AppScreenWrapper>
    );
}
