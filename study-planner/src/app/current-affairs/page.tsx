"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, ExternalLink, Loader2, RefreshCw, AlertCircle, Newspaper } from "lucide-react";
import { format } from "date-fns";

// Types for News API Response
interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

const NEWS_API_KEY = "78307967c577440ea972024a7bce20c4";

export default function CurrentAffairsPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchNews() {
        setLoading(true);
        setError(null);
        try {
            // Using 'everything' endpoint for specific queries or 'top-headlines' for general
            // We'll filter for India and maybe some educational/exam related keywords if possible, 
            // but for 'Current Affairs' top headlines is usually expected.
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${NEWS_API_KEY}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch news");
            }

            const data: NewsResponse = await res.json();

            // Filter out articles that were removed or have no image (optional aesthetic choice)
            const validArticles = data.articles.filter(
                article => article.title !== "[Removed]" && article.urlToImage
            );

            setArticles(validArticles);
        } catch (err) {
            console.error(err);
            setError("Failed to load news. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                                <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Newspaper className="w-8 h-8" />
                                </span>
                                Current Affairs
                            </h1>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-lg">
                                Stay updated with the latest national and exam-relevant news.
                            </p>
                        </div>
                        <button
                            onClick={fetchNews}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all font-medium disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                        <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">Fetching latest updates...</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Something went wrong</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">{error}</p>
                        <button
                            onClick={fetchNews}
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <article
                                key={index}
                                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                    {article.urlToImage ? (
                                        <Image
                                            src={article.urlToImage}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                            <Newspaper className="w-12 h-12 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {article.source.name}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
                                        <Calendar className="w-3 h-3" />
                                        {format(new Date(article.publishedAt), "MMM dd, yyyy • hh:mm a")}
                                    </div>

                                    <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {article.title}
                                    </h2>

                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {article.description || "Click to read the full story..."}
                                    </p>

                                    <div className="mt-auto">
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                        >
                                            Read Full Story <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
