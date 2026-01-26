
"use client";

import { useEffect, useState } from "react";
import {
    Plus, Search, Filter, Edit, Trash2, Eye,
    BookOpen, Calendar, Tag, ChevronRight,
    MoreHorizontal, Loader2, ArrowLeft,
    CheckCircle2, Circle
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface DakSutraEntry {
    _id: string;
    title: string;
    rule_number: string;
    act_name: string;
    category: string;
    effective_date: string;
    status: 'draft' | 'published';
    createdAt: string;
}

export default function DakSutraListPage() {
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

            const res = await fetch(`/api/admin/dak-sutra?${query.toString()}`);
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

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;

        try {
            const res = await fetch(`/api/admin/dak-sutra/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setEntries(entries.filter(e => e._id !== id));
            }
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Admin
                        </Link>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                            Dak Sutra
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage structured postal rules and regulations.</p>
                    </div>
                    <Link
                        href="/admin/dak-sutra/create"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        New Entry
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search by title or rule number..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-4 h-4 text-zinc-400 hidden md:block" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="flex-1 md:w-48 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm outline-none cursor-pointer"
                        >
                            <option value="all">All Categories</option>
                            <option value="Rule">Rule</option>
                            <option value="Section">Section</option>
                            <option value="Regulation">Regulation</option>
                            <option value="Circular">Circular</option>
                            <option value="Explanation">Explanation</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Title & Rule</th>
                                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Act / Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Effective Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                        </td>
                                    </tr>
                                ) : entries.length > 0 ? (
                                    entries.map((entry) => (
                                        <tr key={entry._id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">
                                                        {entry.title}
                                                    </span>
                                                    <span className="text-xs text-zinc-500">
                                                        Rule: {entry.rule_number || "N/A"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{entry.act_name}</span>
                                                    <span className="inline-flex w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                                        {entry.category}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                    ${entry.status === 'published'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                                    }`}>
                                                    {entry.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                                                    {entry.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-zinc-500">
                                                    {entry.effective_date ? format(new Date(entry.effective_date), 'MMM d, yyyy') : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Link
                                                    href={`/admin/dak-sutra/preview/${entry._id}`}
                                                    className="inline-flex p-2 text-zinc-400 hover:text-blue-600 transition-colors"
                                                    title="Preview"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/dak-sutra/edit/${entry._id}`}
                                                    className="inline-flex p-2 text-zinc-400 hover:text-amber-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(entry._id)}
                                                    className="inline-flex p-2 text-zinc-400 hover:text-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                            No entries found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
