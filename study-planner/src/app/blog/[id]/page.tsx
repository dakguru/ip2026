"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, Calendar, ExternalLink, FileText, Share2, Printer, Tag, Gavel, Bell } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Correctly unwrap params using React.use()
    const { id } = use(params);

    const [update, setUpdate] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUpdate = async () => {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const data = await res.json();
                setUpdate(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdate();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 flex justify-center pt-20">
                <div className="animate-pulse space-y-4 max-w-3xl w-full">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
                    <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !update) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 md:p-12 font-sans pb-20 md:pb-0">
            <div className="max-w-4xl mx-auto">
                {/* Header Navigation - Sticky on Mobile for better UX */}
                <div className="sticky top-0 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md px-4 py-3 md:px-0 md:py-0 md:static flex items-center justify-between mb-4 md:mb-8 border-b md:border-none border-zinc-200 dark:border-zinc-800 md:bg-transparent">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors font-bold text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <div className="flex gap-1 md:gap-2">
                        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors" title="Share">
                            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>

                <article className="bg-white dark:bg-zinc-900 md:rounded-3xl shadow-sm border-y md:border border-zinc-100 dark:border-zinc-800 overflow-hidden">

                    {/* Featured Image (if exists) */}
                    <div className="w-full h-48 md:h-80 relative bg-zinc-100 dark:bg-zinc-800">
                        {update.image ? (
                            <img src={update.image} alt={update.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className={`w-full h-full flex flex-col items-center justify-center p-6 text-white relative overflow-hidden ${update.category === 'Order' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                                update.category === 'Circular' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                                    update.category === 'Notification' ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600' :
                                        'bg-gradient-to-br from-zinc-500 to-stone-600'
                                }`}>
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                                </div>
                                <div className="relative z-10 opacity-90 scale-125 md:scale-150 mb-0 md:mb-4">
                                    {update.category === 'Order' ? <Gavel className="w-12 h-12 md:w-16 md:h-16" /> :
                                        update.category === 'Circular' ? <FileText className="w-12 h-12 md:w-16 md:h-16" /> :
                                            <Bell className="w-12 h-12 md:w-16 md:h-16" />}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-5 md:p-12">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm">
                            <span className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full font-bold uppercase tracking-wider text-[10px] md:text-xs ${update.category === 'Order' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                update.category === 'Circular' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                }`}>
                                {update.category}
                            </span>
                            <div className="flex items-center gap-1.5 md:gap-2 text-zinc-500 dark:text-zinc-400 font-medium">
                                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span>{new Date(update.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-4xl md:leading-tight font-extrabold text-zinc-900 dark:text-zinc-100 mb-6 md:mb-8 leading-snug">
                            {update.title}
                        </h1>

                        {/* Main Content */}
                        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-7 md:leading-8 whitespace-pre-wrap font-sans">
                            {update.description}
                        </div>

                        {/* Action Box */}
                        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                                <div className="p-2.5 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                                    <FileText className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base md:text-lg text-zinc-900 dark:text-zinc-100">Original Document</h3>
                                    <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">View official PDF</p>
                                </div>
                            </div>
                            <a
                                href={update.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto px-6 py-2.5 md:px-8 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <span>View Document</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
