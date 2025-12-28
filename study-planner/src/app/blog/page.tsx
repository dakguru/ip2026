"use client";

import { Newspaper, FileText, ArrowLeft, Mail, Calendar, Tag, ChevronRight, ExternalLink, Gavel, Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPage() {
    const [updates, setUpdates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const res = await fetch('/api/blog', { cache: 'no-store' });
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

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">DG Blog</h1>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                            Latest circulars, notifications, and orders relevant to the Department of Posts.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-32 bg-zinc-100 dark:bg-zinc-800 rounded-xl"></div>
                                ))}
                            </div>
                        ) : updates.length > 0 ? (
                            updates.map((update) => (
                                <Link key={update.id} href={`/blog/${update.id}`} className="block group">
                                    <div className="p-5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg transition-all flex flex-col md:flex-row gap-6">

                                        {/* Image / Thumbnail */}
                                        {/* Image / Thumbnail */}
                                        <div className="shrink-0 w-full md:w-48 h-32 rounded-lg overflow-hidden relative shadow-sm">
                                            {update.image ? (
                                                <img src={update.image} alt={update.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className={`w-full h-full flex flex-col items-center justify-center p-4 text-white relative overflow-hidden ${update.category === 'Order' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                                                    update.category === 'Circular' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                                                        update.category === 'Notification' ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600' :
                                                            'bg-gradient-to-br from-zinc-500 to-stone-600'
                                                    }`}>
                                                    {/* Background Pattern */}
                                                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                                                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                                                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-black rounded-full blur-2xl"></div>
                                                    </div>

                                                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                                        {update.category === 'Order' ? <Gavel className="w-10 h-10 mb-2 opacity-90" /> :
                                                            update.category === 'Circular' ? <FileText className="w-10 h-10 mb-2 opacity-90" /> :
                                                                <Bell className="w-10 h-10 mb-2 opacity-90" />}
                                                    </div>

                                                    <span className="relative z-10 text-xs font-bold uppercase tracking-widest opacity-90">
                                                        {update.category}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Floating Badge (Only show if image is present to avoid double labeling, or keep for consistency) */}
                                            {update.image && (
                                                <div className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${update.category === 'Order' ? 'bg-red-500/90 text-white' :
                                                    update.category === 'Circular' ? 'bg-blue-500/90 text-white' :
                                                        'bg-amber-500/90 text-white'
                                                    }`}>
                                                    {update.category}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-2">
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                                                {update.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{new Date(update.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>

                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                                                {update.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12 text-zinc-400">
                                No updates found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
