"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    ArrowLeft, Globe, Newspaper, History, Loader2, 
    RefreshCw, Trophy, Sparkles, ArrowRight, ChevronRight,
    MapPin, Clock, Calendar
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import HomeHeader from "@/components/HomeHeader";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

// --- Types ---
interface NewsItem {
    id?: string;
    title: string;
    snippet?: string;
    link?: string;
    photo_url?: string;
    source_name?: string;
    source_logo_url?: string;
    published_datetime_utc?: string;
}

// --- Components ---

function NewsList({ type }: { type: "recent" | "international" | "sports" }) {
    const [data, setData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/proxy/current-affairs?type=${type}`, { cache: 'no-store' });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Failed to fetch ${type} news`);
            }
            const json = await res.json();
            setData(json.data || []);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [type]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Fetching Latest Updates...</p>
        </div>
    );

    if (error) return <ErrorDisplay message={error} retry={fetchData} />;
    if (data.length === 0) return (
        <div className="text-center py-20">
            <p className="text-zinc-500 dark:text-zinc-400 font-medium italic">No updates found for today.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-20">
            {data.map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                >
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col">
                        {item.photo_url && (
                            <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5" />
                                    {item.published_datetime_utc ? format(new Date(item.published_datetime_utc), "HH:mm") : "Just Now"}
                                </div>
                            </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                {item.source_logo_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={item.source_logo_url} alt="" className="w-6 h-6 rounded-full object-contain bg-white ring-1 ring-zinc-100" />
                                ) : (
                                    <Newspaper className="w-5 h-5 text-zinc-400" />
                                )}
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">{item.source_name || "News Source"}</span>
                            </div>
                            <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium line-clamp-3 leading-relaxed mb-6">
                                {item.snippet || "Click to read more..."}
                            </p>
                            <div className="mt-auto pt-4 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Read Full Story <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </div>
                    </a>
                </motion.div>
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
            const res = await fetch(`/api/proxy/current-affairs?type=history`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch history");
            const json = await res.json();
            const historyData = json.data;
            setData(Array.isArray(historyData) ? historyData : (historyData?.data || []));
        } catch (err: any) {
            setError("History data currently unavailable.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-zinc-400 w-8 h-8" /></div>;
    if (error) return <ErrorDisplay message={error} retry={fetchData} />;

    return (
        <div className="max-w-4xl mx-auto px-6 pb-20">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-[1.5rem] bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                    <History className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Time Capsule</p>
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white leading-none">Today in History</h2>
                </div>
                <div className="ml-auto px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-500">
                    {format(new Date(), "MMMM dd")}
                </div>
            </div>

            <div className="relative border-l-2 border-indigo-100 dark:border-indigo-900/30 space-y-12 ml-6">
                {data.map((item, idx) => {
                    const rawDate = item.date || "";
                    const dateParts = rawDate.split("-");
                    const year = dateParts.length >= 3 ? dateParts[dateParts.length - 1] : "N/A";

                    return (
                        <div key={idx} className="relative pl-10 group">
                            <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-zinc-950 border-4 border-indigo-500 group-hover:scale-125 transition-transform"></div>
                            <span className="inline-flex px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-3">{year}</span>
                            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                                {item.title || item.event || "Significant Event"}
                            </h3>
                            <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {item.description || item.snippet || item.details}
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
        <div className="max-w-lg mx-auto p-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 text-center shadow-xl shadow-zinc-200/20">
            <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-500 mx-auto mb-6">
                <RefreshCw className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">Sync Interrupted</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 font-medium leading-relaxed px-4">
                {message}
            </p>
            <button
                onClick={retry}
                className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black text-xs uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-lg hover:shadow-xl"
            >
                Try Re-fetching Data
            </button>
        </div>
    );
}

export default function CurrentAffairsLivePage() {
    const [activeTab, setActiveTab] = useState<"recent" | "international" | "history" | "sports">("recent");
    const isMobileApp = useIsMobileApp();

    const tabs = [
        { id: "recent", label: "National News", icon: Newspaper, color: "text-blue-500" },
        { id: "international", label: "Global Events", icon: Globe, color: "text-emerald-500" },
        { id: "sports", label: "Sports Center", icon: Trophy, color: "text-orange-500" },
        { id: "history", label: "Archived History", icon: History, color: "text-indigo-500" },
    ] as const;

    if (isMobileApp) {
        return (
            <AppScreenWrapper
                className="bg-zinc-50 dark:bg-zinc-950"
                header={
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/current-affairs" className="p-1 -ml-1 rounded-full text-zinc-900 dark:text-zinc-100 active:bg-zinc-200 dark:active:bg-zinc-800 transition-colors">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Live Updates</h1>
                        </div>
                    </div>
                }
            >
                <div className="flex-1 flex flex-col">
                    
                    {/* Tabs - Native Scrollable Row */}
                    <div className="sticky top-0 z-20 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-lg px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar border-b border-zinc-100 dark:border-zinc-900 mb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg"
                                        : "bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-100 dark:border-zinc-800"
                                }`}
                            >
                                <tab.icon className="w-3.5 h-3.5" />
                                {tab.label.split(' ')[0]}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === "history" ? (
                                    <HistorySection />
                                ) : (
                                    <div className="space-y-4 px-4 pb-24">
                                        <NewsListMobile type={activeTab as any} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Quick Link to Quiz - Native Banner Style */}
                    <div className="fixed bottom-24 left-4 right-4 z-10">
                        <Link 
                            href="/flashcards?filter=ca"
                            className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-transform"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Test Knowledge</p>
                                    <p className="text-sm font-bold">Daily CA Flashcards</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </AppScreenWrapper>
        );
    }

    // Default Desktop View
    return (
        <AppScreenWrapper hideStatusBarPadding={true}>
            <HomeHeader isLoggedIn={true} />
            
            <div className="flex-1 bg-white dark:bg-zinc-950 pb-20">
                <div className="max-w-7xl mx-auto px-6 pt-12">
                    
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="space-y-4">
                            <Link href="/current-affairs" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back to Hub
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
                                Live <span className="text-blue-600">Feed</span>
                            </h1>
                            <div className="flex items-center gap-4 text-sm font-bold text-zinc-500">
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                    <Calendar className="w-4 h-4" />
                                    {format(new Date(), "MMMM dd, yyyy")}
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    Real-time Updates
                                </span>
                            </div>
                        </div>

                        {/* Desktop Tabs */}
                        <div className="flex p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
                                        activeTab === tab.id
                                            ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === "history" ? (
                                <HistorySection />
                            ) : (
                                <NewsList type={activeTab as any} />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Desktop Quiz Banner */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 p-8 rounded-[3rem] bg-zinc-900 overflow-hidden relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-transparent opacity-50"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[1.8rem] bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-white">Daily CA Mastery Quiz</h3>
                                    <p className="text-zinc-400 text-sm font-medium">Turn today's news into tomorrow's marks with interactive recall.</p>
                                </div>
                            </div>
                            <Link 
                                href="/flashcards?filter=ca"
                                className="px-8 py-3.5 bg-white text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-3"
                            >
                                Start Practicing <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AppScreenWrapper>
    );
}

function NewsListMobile({ type }: { type: "recent" | "international" | "sports" }) {
    const [data, setData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/proxy/current-affairs?type=${type}`, { cache: 'no-store' });
            if (!res.ok) throw new Error(`Failed to fetch ${type} news`);
            const json = await res.json();
            setData(json.data || []);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [type]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
        </div>
    );

    if (error) return <ErrorDisplay message={error} retry={fetchData} />;

    return (
        <div className="space-y-4">
            {data.map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white dark:bg-zinc-900 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm active:bg-zinc-50 transition-colors"
                >
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                        {item.photo_url && (
                            <div className="relative h-44 w-full bg-zinc-100 dark:bg-zinc-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[9px] font-black uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {item.published_datetime_utc ? format(new Date(item.published_datetime_utc), "HH:mm") : "Just Now"}
                                </div>
                            </div>
                        )}
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                {item.source_logo_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={item.source_logo_url} alt="" className="w-5 h-5 rounded-full object-contain" />
                                ) : (
                                    <Newspaper className="w-4 h-4 text-zinc-400" />
                                )}
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.source_name || "News Source"}</span>
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium line-clamp-3 leading-relaxed mb-4">
                                {item.snippet || "Click to read more..."}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-50 dark:border-zinc-800">
                                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1">
                                    Full Story <ChevronRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </a>
                </motion.div>
            ))}
        </div>
    );
}
