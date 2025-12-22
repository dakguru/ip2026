"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit, FileText, Loader2 } from "lucide-react";

export default function ManageBlogPage() {
    const [updates, setUpdates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUpdates();
    }, []);

    const fetchUpdates = async () => {
        try {
            const res = await fetch('/api/blog', { cache: 'no-store' }); // Ensure fresh data
            if (res.ok) {
                const data = await res.json();
                setUpdates(data);
            }
        } catch (error) {
            console.error("Failed to load updates", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this update?")) return;

        try {
            const res = await fetch('/api/blog', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                setUpdates(updates.filter(u => u.id !== id));
            } else {
                throw new Error("Failed to delete");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete update. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                            Manage Blog Posts
                        </h1>
                    </div>
                    <Link href="/developer/blog/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" /> Add New Post
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                            <tr>
                                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Title</th>
                                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
                                <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {updates.map((update) => (
                                <tr key={update.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <td className="py-4 px-6 text-sm text-zinc-500">
                                        {update.date}
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{update.title}</p>
                                        <p className="text-xs text-zinc-500 truncate max-w-xs">{update.description}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 rounded text-xs font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300`}>
                                            {update.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-blue-600 dark:text-blue-400">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(update.id)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-red-600 dark:text-red-400">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {updates.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-zinc-500">
                                        No updates found. Create one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
