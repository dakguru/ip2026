"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, Calendar, ExternalLink, FileText, Share2, Printer, Tag } from "lucide-react";
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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors" title="Share">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors" title="Print" onClick={() => window.print()}>
                            <Printer className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <article className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">

                    {/* Featured Image (if exists) */}
                    {update.image && (
                        <div className="w-full h-64 md:h-96 relative bg-zinc-100 dark:bg-zinc-800">
                            <img src={update.image} alt={update.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                            <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-xs ${update.category === 'Order' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                update.category === 'Circular' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                }`}>
                                {update.category}
                            </span>
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(update.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl md:leading-tight font-extrabold text-zinc-900 dark:text-zinc-100 mb-8">
                            {update.title}
                        </h1>

                        {/* Main Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-8 whitespace-pre-wrap font-serif">
                            {update.description}
                        </div>

                        {/* Action Box */}
                        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Original Document</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">View or download the official PDF/Link</p>
                                </div>
                            </div>
                            <a
                                href={update.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center gap-2"
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
