"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Newspaper, BrainCircuit, History, Loader2, RefreshCw, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
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

interface QuizItem {
    question: string;
    options: string[];
    answer: string; // Assuming the API returns the correct answer
    explanation?: string;
}

interface HistoryItem {
    year: string;
    event: string;
    description?: string;
}

// --- Configuration ---
const RAPID_API_KEY = "1bc39bde08msh044dfa558b1e89fp10d0d8jsn64cd63789ee0";
const NEWS_API_HOST = "real-time-news-data.p.rapidapi.com";
const AFFAIRS_API_HOST = "current-affairs-of-india.p.rapidapi.com";

// --- Components ---

function NewsList({ endpoint, type }: { endpoint: string, type: "recent" | "international" }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Determine query based on type
            const query = type === "recent" ? "India" : "World";
            const country = type === "recent" ? "IN" : "US"; // Defaulting International to US/Global mix

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
                }
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

function QuizSection() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const fetchQuiz = async () => {
        setLoading(true);
        setError(null);
        setSelectedAnswers({});
        setShowResults(false);
        try {
            // Note: Keeping generic fetch for now or update if a specific Quiz API is available
            // Using a placeholder response for demonstration if API fails or is not configured for quizzes
            const res = await fetch(`${BASE_URL}/today-quiz`, {
                headers: {
                    'X-RapidAPI-Key': RAPID_API_KEY,
                    'X-RapidAPI-Host': RAPID_API_HOST
                }
            });
            if (!res.ok) throw new Error("Failed to fetch today's quiz");
            const json = await res.json();
            setQuestions(Array.isArray(json) ? json : json.data || []);
        } catch (err: any) {
            console.log("Quiz API Error (Expected if using News Data API key):", err);
            setError("Quiz service currently unavailable. Please check back later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchQuiz(); }, []);

    const handleSelect = (qIdx: number, option: string) => {
        if (showResults) return;
        selectedAnswers[qIdx] = option;
        setSelectedAnswers({ ...selectedAnswers });
    }

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>;
    if (error) return <ErrorDisplay message={error} retry={fetchQuiz} />;
    if (questions.length === 0) return <div className="text-center p-10 text-zinc-500">No quiz questions available for today.</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Daily Quiz Challenge</h2>
                <button onClick={fetchQuiz} className="text-sm text-blue-600 hover:underline flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Reset</button>
            </div>

            {questions.map((q, idx) => {
                const questionText = q.question || q.Question || "Question " + (idx + 1);
                const options = q.options || q.Options || ["True", "False"];
                const correctAnswer = q.answer || q.correct_answer || q.CorrectAnswer || "";

                const isCorrect = showResults && selectedAnswers[idx] === correctAnswer;
                const isWrong = showResults && selectedAnswers[idx] !== correctAnswer && selectedAnswers[idx] !== undefined;

                return (
                    <div key={idx} className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                        <p className="font-semibold text-lg mb-4 text-zinc-900 dark:text-zinc-50"><span className="text-blue-500 mr-2">{idx + 1}.</span>{questionText}</p>
                        <div className="space-y-2">
                            {options.map((opt: string, oIdx: number) => {
                                const isSelected = selectedAnswers[idx] === opt;
                                const isThisCorrect = opt === correctAnswer;

                                let btnClass = "w-full text-left p-3 rounded-lg border transition-all ";
                                if (showResults) {
                                    if (isThisCorrect) btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200 ";
                                    else if (isSelected) btnClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200 ";
                                    else btnClass += "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 opacity-60 ";
                                } else {
                                    if (isSelected) btnClass += "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-300 ";
                                    else btnClass += "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 ";
                                }

                                return (
                                    <button
                                        key={oIdx}
                                        onClick={() => handleSelect(idx, opt)}
                                        className={btnClass}
                                        disabled={showResults}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{opt}</span>
                                            {showResults && isThisCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                            {showResults && isSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {!showResults && (
                <button
                    onClick={() => setShowResults(true)}
                    disabled={Object.keys(selectedAnswers).length < questions.length}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Submit Answers
                </button>
            )}

            {showResults && (
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Quiz Completed!</h3>
                    <p>Great job practicing today. Come back tomorrow for more!</p>
                </div>
            )}
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
            const res = await fetch(`${BASE_URL}/history-of-today`, {
                headers: {
                    'X-RapidAPI-Key': RAPID_API_KEY,
                    'X-RapidAPI-Host': RAPID_API_HOST
                }
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
                {data.map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                        {/* Timeline dot */}
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-white dark:border-zinc-950"></div>

                        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-bold rounded-full mb-2">
                            {item.year || "Year Unknown"}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                            {item.title || item.event || "Historical Event"}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {item.description || item.details || item.snippet}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ErrorDisplay({ message, retry }: { message: string, retry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center p-10 text-center bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
            <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">Unable to Load Data</h3>
            <p className="text-red-600 dark:text-red-300/80 mb-6 max-w-md">{message}</p>
            <button onClick={retry} className="px-5 py-2 bg-white dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors">
                Try Again
            </button>
        </div>
    );
}

// --- Main Page ---

export default function CurrentAffairsPage() {
    const [activeTab, setActiveTab] = useState<"recent" | "international" | "quiz" | "history">("recent");

    const tabs = [
        { id: "recent", label: "India Updates", icon: Newspaper, color: "text-blue-500" },
        { id: "international", label: "International", icon: Globe, color: "text-green-500" },
        { id: "quiz", label: "Today's Quiz", icon: BrainCircuit, color: "text-orange-500" },
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
                                    onClick={() => setActiveTab(tab.id)}
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
                <div className={`transition-opacity duration-300 ${activeTab === "quiz" ? "block" : "hidden"}`}>
                    <QuizSection />
                </div>
                <div className={`transition-opacity duration-300 ${activeTab === "history" ? "block" : "hidden"}`}>
                    <HistorySection />
                </div>
            </div>
        </div>
    );
}
