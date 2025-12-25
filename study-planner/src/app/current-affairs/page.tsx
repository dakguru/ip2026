"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Newspaper, History, Loader2, RefreshCw, AlertCircle, Trophy } from "lucide-react";
import { format } from "date-fns";

// --- Types ---
interface NewsItem {
    id?: string;
    title: string;
    description?: string;
    url?: string;
    imageUrl?: string;
    source?: string;
    publishedAt?: string;
    // content might vary based on the specific API response structure, adapting as generic as possible
    [key: string]: any;
}



// --- Configuration ---
const RAPID_API_KEY = "1bc39bde08msh044dfa558b1e89fp10d0d8jsn64cd63789ee0";
const NEWS_API_HOST = "real-time-news-data.p.rapidapi.com";
const AFFAIRS_API_HOST = "current-affairs-of-india.p.rapidapi.com";
const NEWSAPI_ORG_KEY = "78307967c577440ea972024a7bce20c4";

// --- Components ---

function NewsList({ endpoint, type }: { endpoint: string, type: "recent" | "international" | "sports" }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Determine query based on type
            let query = "India";
            let country = "IN";

            if (type === "international") {
                query = "World";
                country = "US";
            } else if (type === "sports") {
                query = "Sports";
                country = "IN";
            }

            const params = new URLSearchParams({
                query: query,
                limit: "20",
                time_published: "anytime",
                country: country,
                lang: "en"
            });

            // Use Real-Time News Data API
            const res = await fetch(`https://${NEWS_API_HOST}/search?${params.toString()}`, {
                headers: {
                    'x-rapidapi-key': RAPID_API_KEY,
                    'x-rapidapi-host': NEWS_API_HOST
                },
                cache: 'no-store'
            });

            if (!res.ok) throw new Error(`Failed to fetch ${type} news`);
            const json = await res.json();

            // Real-Time News Data API usually returns { data: [...] }
            setData(json.data || []);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [endpoint, type]);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>;
    if (error) return <ErrorDisplay message={error} retry={fetchData} />;

    // Fallback if empty
    if (data.length === 0) return <div className="text-center p-10 text-zinc-500">No updates found for today.</div>;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, idx) => (
                <div key={idx} className="group bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
                    {/* Image handling for this API */}
                    {item.photo_url && (
                        <div className="relative h-48 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {item.source_logo_url && (
                                <div className="absolute top-2 right-2 bg-white/90 p-1 rounded-full shadow-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.source_logo_url} alt="Source" className="w-6 h-6 object-contain" />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                            <Newspaper className="w-3 h-3" />
                            <span>{item.source_name || "News Source"}</span>
                            {item.published_datetime_utc && (
                                <span>• {format(new Date(item.published_datetime_utc), "MMM dd")}</span>
                            )}
                        </div>

                        <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                        </h3>

                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                            {item.snippet || "Click to read more..."}
                        </p>

                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Read Full Story <ArrowLeft className="w-4 h-4 rotate-180 ml-1" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

function HistorySection() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://${AFFAIRS_API_HOST}/history-of-today`, {
                headers: {
                    'x-rapidapi-key': RAPID_API_KEY,
                    'x-rapidapi-host': AFFAIRS_API_HOST
                },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error("Failed to fetch history");
            const json = await res.json();
            setData(Array.isArray(json) ? json : json.data || []);
        } catch (err: any) {
            console.log("History API Error", err);
            setError("History data currently unavailable.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-purple-500 w-8 h-8" /></div>;
    if (error) return <ErrorDisplay message={error} retry={fetchData} />;
    if (data.length === 0) return <div className="text-center p-10 text-zinc-500">No historical events found for today.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600 dark:text-purple-400">
                    <History className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Today in History of India</h2>
            </div>

            <div className="relative border-l-2 border-purple-200 dark:border-purple-900/50 space-y-8 ml-4">
                {data.map((item, idx) => {
                    // Parse the chaotic API response
                    const rawDate = item.date || "";
                    const rawDesc = item.description || item.details || item.snippet || "";

                    const cleanDate = rawDate.trim();
                    const cleanDesc = rawDesc.trim().replace(/\s+/g, " ");

                    // Extract year if possible (Format: 25-December-1763)
                    let year = "Year Unknown";
                    const dateParts = cleanDate.split("-");
                    if (dateParts.length >= 3) {
                        year = dateParts[dateParts.length - 1];
                    }

                    return (
                        <div key={idx} className="relative pl-8">
                            {/* Timeline dot */}
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-white dark:border-zinc-950"></div>

                            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-bold rounded-full mb-2">
                                {year}
                            </span>
                            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                                {item.title || item.event || "Historical Event"}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {cleanDesc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ErrorDisplay({ message, retry }: { message: string, retry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center p-10 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <RefreshCw className="w-10 h-10 text-blue-500 mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                Click to fetch/refresh to retrieve latest updates
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
                for {format(new Date(), "MMMM dd, yyyy")}
            </p>
            <button
                onClick={retry}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
            >
                <RefreshCw className="w-4 h-4" /> Fetch Updates
            </button>

        </div>
    );
}

// --- Main Page ---

export default function CurrentAffairsPage() {
    const [activeTab, setActiveTab] = useState<"recent" | "international" | "history" | "sports">("recent");

    const tabs = [
        { id: "recent", label: "India Updates", icon: Newspaper, color: "text-blue-500" },
        { id: "international", label: "International", icon: Globe, color: "text-green-500" },
        { id: "sports", label: "Global Sports", icon: Trophy, color: "text-yellow-500" },

        { id: "history", label: "History of Today", icon: History, color: "text-purple-500" },
    ] as const;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4 transition-colors font-medium text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                            Current Affairs <span className="text-zinc-400 font-light">| {format(new Date(), "MMMM dd")}</span>
                        </h1>

                        {/* Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md transform scale-105"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                        }`}
                                >
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "" : tab.color}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[500px]">
                <div className={`transition-opacity duration-300 ${activeTab === "recent" ? "block" : "hidden"}`}>
                    <NewsList endpoint="/recent" type="recent" />
                </div>
                <div className={`transition-opacity duration-300 ${activeTab === "international" ? "block" : "hidden"}`}>
                    <NewsList endpoint="/international-today" type="international" />
                </div>
                <div className={`transition-opacity duration-300 ${activeTab === "sports" ? "block" : "hidden"}`}>
                    <NewsList endpoint="/sports" type="sports" />
                </div>

                <div className={`transition-opacity duration-300 ${activeTab === "history" ? "block" : "hidden"}`}>
                    <HistorySection />
                </div>
            </div>
        </div>
    );
}
