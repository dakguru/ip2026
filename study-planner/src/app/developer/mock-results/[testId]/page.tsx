"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import React from "react";
import { ArrowLeft, Search, CheckCircle2, ChevronDown, ChevronUp, Clock, Calendar, Download, FileText, Loader2, RefreshCw, Radio } from "lucide-react";
import Link from "next/link";
import { format, eachDayOfInterval, addDays } from "date-fns";
import { useParams } from "next/navigation";
import { TEST_QUESTIONS_MAP } from "@/lib/mock-test-data-map";
import { generateMockTestAnswerSheetPDF, getMockTestAnswerSheetPDFBlob } from "@/lib/pdf-generator-mocks";
import { FULL_SCHEDULE } from "@/data/schedule";


interface MockResult {
    _id: string;
    userName: string;
    userEmail: string;
    score: number;
    totalQuestions: number;
    submittedAt: string;
    answers?: Record<string, number>;
}

// Schedule map — determines when auto-refresh is active
const TEST_SCHEDULE_MAP: Record<string, { start: Date; end: Date }> = {
    "mock-2026-01-17": { start: new Date("2026-01-17T00:00:00+05:30"), end: new Date("2026-01-18T23:59:59+05:30") },
    "mock-2026-01-24": { start: new Date("2026-01-24T00:00:00+05:30"), end: new Date("2026-01-25T23:59:59+05:30") },
    "mock-2026-01-31": { start: new Date("2026-01-31T00:00:00+05:30"), end: new Date("2026-02-01T23:59:59+05:30") },
    "mock-2026-02-07": { start: new Date("2026-02-07T00:00:00+05:30"), end: new Date("2026-02-08T23:59:59+05:30") },
    "mock-2026-02-14": { start: new Date("2026-02-14T00:00:00+05:30"), end: new Date("2026-02-15T23:59:59+05:30") },
    "mock-2026-02-21": { start: new Date("2026-02-21T00:00:00+05:30"), end: new Date("2026-02-22T23:59:59+05:30") },
    "mock-2026-02-28": { start: new Date("2026-02-28T00:00:00+05:30"), end: new Date("2026-03-01T23:59:59+05:30") },
    "mock-2026-03-07": { start: new Date("2026-03-07T00:00:00+05:30"), end: new Date("2026-03-08T23:59:59+05:30") },
    "mock-2026-03-14": { start: new Date("2026-03-14T00:00:00+05:30"), end: new Date("2026-03-15T23:59:59+05:30") },
    "mock-2026-03-21": { start: new Date("2026-03-21T00:00:00+05:30"), end: new Date("2026-03-22T23:59:59+05:30") },
    "mock-2026-03-28": { start: new Date("2026-03-28T00:00:00+05:30"), end: new Date("2026-03-29T23:59:59+05:30") },
    "mock-2026-04-04": { start: new Date("2026-04-04T00:00:00+05:30"), end: new Date("2026-04-05T23:59:59+05:30") },
    "mock-2026-04-11": { start: new Date("2026-04-11T00:00:00+05:30"), end: new Date("2026-04-12T23:59:59+05:30") },
    "mock-2026-04-18": { start: new Date("2026-04-18T00:00:00+05:30"), end: new Date("2026-04-19T23:59:59+05:30") },
    "mock-2026-04-25": { start: new Date("2026-04-25T00:00:00+05:30"), end: new Date("2026-04-26T23:59:59+05:30") },
    "mock-2026-05-02": { start: new Date("2026-05-02T00:00:00+05:30"), end: new Date("2026-05-03T23:59:59+05:30") },
    "live-sample": { start: new Date(0), end: new Date("2099-12-31T23:59:59+05:30") },
};

const getTopicsForMock = (saturdayDate: Date): string[] => {
    if (!saturdayDate || saturdayDate.getTime() === 0) return ["Sample Mock Test Topics"];
    const mondayDate = addDays(saturdayDate, -5);
    const planMap = new Map();
    FULL_SCHEDULE.forEach((item: any) => {
        planMap.set(item.date, item);
    });

    const weekTopics: string[] = [];
    const interval = eachDayOfInterval({ start: mondayDate, end: saturdayDate });

    interval.forEach(d => {
        const dateStr = format(d, 'dd-MM-yyyy');
        const item = planMap.get(dateStr);

        if (item && item.subTopic && !item.subTopic.toLowerCase().includes("revision") && !item.day.toLowerCase().includes("sunday")) {
            // Remove " – Day X", " - Day X", " (Day X)", etc.
            let cleanTopic = item.subTopic
                .replace(/\s*[–\-\(]*\s*Day\s*\d+\s*(of\s*\d+)?\s*\)*\s*$/gi, '')
                .trim();
            
            if (!weekTopics.includes(cleanTopic)) {
                weekTopics.push(cleanTopic);
            }
        }
    });
    return weekTopics.length > 0 ? weekTopics : ["Introductory/General Topics"];
};

export default function MockTestDetailResultsPage() {
    const params = useParams();
    const testId = params.testId as string;

    // Helper to format test ID for display
    const formatTestName = (id: string) => {
        if (id === 'live-sample') return 'Sample Mock Test';
        if (id.startsWith('mock-')) {
            // mock-2026-01-17 -> Weekly Mock Test (Jan 17)
            return `Weekly Mock Test (${id.replace('mock-', '')})`;
        }
        return id;
    };

    const [results, setResults] = useState<MockResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [isBulkDownloading, setIsBulkDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
    const [nextRefreshIn, setNextRefreshIn] = useState(20);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);

    // Determine if this test is currently live
    const schedule = TEST_SCHEDULE_MAP[testId];
    const now = new Date();
    const isLive = schedule ? now >= schedule.start && now <= schedule.end : false;

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => setShowNotification(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    const fetchResults = useCallback(async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/mock-test/results?testId=${testId}`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setResults(data.results);
                setLastRefreshed(new Date());
            }
        } catch (error) {
            console.error("Failed to fetch results", error);
        } finally {
            if (!silent) setIsLoading(false);
        }
    }, [testId]);

    // Initial load
    useEffect(() => {
        if (testId) fetchResults(false);
    }, [testId, fetchResults]);

    // Auto-refresh every 20s ONLY during live window
    useEffect(() => {
        if (!isLive) return;

        const INTERVAL_MS = 20_000;
        setNextRefreshIn(20);

        // Countdown ticker
        countdownRef.current = setInterval(() => {
            setNextRefreshIn(prev => {
                if (prev <= 1) return 20;
                return prev - 1;
            });
        }, 1000);

        // Data poller
        intervalRef.current = setInterval(() => {
            fetchResults(true);
        }, INTERVAL_MS);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (countdownRef.current) clearInterval(countdownRef.current);
        };
    }, [isLive, fetchResults]);

    const filteredResults = results.filter(r =>
        r.userName.toLowerCase().includes(search.toLowerCase()) ||
        r.userEmail.toLowerCase().includes(search.toLowerCase())
    );

    const toggleRow = (id: string) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    // Calculate Stats
    const totalAttempts = results.length;
    const avgScore = totalAttempts > 0
        ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts)
        : 0;

    const highestScore = totalAttempts > 0
        ? Math.max(...results.map(r => r.score))
        : 0;

    const handleBulkDownload = async () => {
        if (filteredResults.length === 0) return;

        const questions = TEST_QUESTIONS_MAP[testId];
        if (!questions) {
            alert("Question data not found for this test.");
            return;
        }

        if (!confirm(`Are you sure you want to download ${filteredResults.length} answer sheets as a ZIP file? This might take a moment.`)) return;

        setIsBulkDownloading(true);
        setDownloadProgress(0);

        try {
            // Dynamically import libraries to avoid SSR issues and keep initial bundle small
            const JSZip = (await import("jszip")).default;
            const { saveAs } = (await import("file-saver"));

            const zip = new JSZip();
            const folderName = `AnswerSheets-${testId.replace('mock-', '')}`;
            const folder = zip.folder(folderName);

            if (!folder) {
                throw new Error("Failed to create zip folder");
            }

            for (let i = 0; i < filteredResults.length; i++) {
                const result = filteredResults[i];
                try {
                    const testConfig = TEST_SCHEDULE_MAP[testId];
                    const testSchedule = testConfig ? `${format(testConfig.start, 'dd-MMM-yyyy')} to ${format(testConfig.end, 'dd-MMM-yyyy')}` : "";
                    const testTopics = testConfig ? getTopicsForMock(testConfig.start) : [];

                    const { blob, filename } = await getMockTestAnswerSheetPDFBlob({
                        userName: result.userName,
                        score: result.score,
                        totalQuestions: result.totalQuestions || questions.length,
                        questions: questions as any,
                        answers: result.answers || {},
                        testName: formatTestName(testId),
                        submittedAt: result.submittedAt,
                        testSchedule,
                        testTopics
                    });

                    folder.file(filename, blob);

                    // Tiny delay to keep UI responsive
                    if (i % 5 === 0) await new Promise(resolve => setTimeout(resolve, 0));

                } catch (error) {
                    console.error(`Failed to generate PDF for ${result.userName}:`, error);
                }
                setDownloadProgress(Math.round(((i + 1) / filteredResults.length) * 100));
            }

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `DakGuru_${folderName}_All_Answers.zip`);
            setShowNotification(true);

        } catch (e) {
            console.error("Bulk download failed", e);
            alert("Failed to generate zip file. Please try again.");
        } finally {
            setIsBulkDownloading(false);
            setDownloadProgress(0);
        }
    };

    const handleExportCSV = () => {
        if (results.length === 0) return;

        const headers = ["Rank", "Name", "Email", "Score", "Total Questions", "Percentage", "Attempted At"];
        const rows = results.map((r, index) => [
            index + 1,
            r.userName,
            r.userEmail,
            r.score,
            r.totalQuestions || 50,
            `${((r.score / (r.totalQuestions || 50)) * 100).toFixed(1)}%`,
            new Date(r.submittedAt).toLocaleString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `DakGuru_Results_${testId}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/developer/mock-results" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to All Tests
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                                <FileText className="w-3 h-3" /> Result Dashboard
                                {isLive && (
                                    <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold border border-red-200 dark:border-red-800/50 animate-pulse">
                                        <Radio className="w-2.5 h-2.5" /> LIVE
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 capitalize">
                                {formatTestName(testId)}
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Detailed performance report and aspirants ranking.</p>
                            {isLive && lastRefreshed && (
                                <p className="text-xs text-zinc-400 mt-1.5 flex items-center gap-1.5">
                                    <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
                                    Auto-refreshing every 20s &nbsp;·&nbsp; Next in <span className="font-bold text-indigo-500">{nextRefreshIn}s</span> &nbsp;·&nbsp; Last updated: {lastRefreshed.toLocaleTimeString()}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="px-5 py-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center">
                                <span className="block text-xs text-zinc-500 uppercase font-bold mb-1">Attempts</span>
                                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{totalAttempts}</span>
                            </div>
                            <div className="px-5 py-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center">
                                <span className="block text-xs text-zinc-500 uppercase font-bold mb-1">Avg Score</span>
                                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{avgScore}</span>
                            </div>
                            <div className="px-5 py-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center">
                                <span className="block text-xs text-zinc-500 uppercase font-bold mb-1">Top Score</span>
                                <span className="text-2xl font-black text-green-600 dark:text-green-400">{highestScore}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => fetchResults(false)}
                                className="flex items-center gap-2 px-3 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                title="Refresh now"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleBulkDownload}
                                disabled={isBulkDownloading || filteredResults.length === 0}
                                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isBulkDownloading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {downloadProgress}%
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-4 h-4" /> Download All PDFs
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleExportCSV}
                                disabled={results.length === 0}
                                className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-4 h-4" /> Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50/50 dark:bg-zinc-800/20">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider w-20">Rank</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Aspirant</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Score</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Attempted On</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-right">Answer Sheet</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <div className="flex justify-center flex-col items-center gap-2">
                                                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                                                <span className="text-zinc-500 text-sm">Loading data...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredResults.length > 0 ? (
                                    filteredResults.map((result, index) => {
                                        const rank = index + 1;
                                        const isSample = testId === 'live-sample';
                                        const actualTotalQuestions = isSample ? 30 : result.totalQuestions;
                                        const maxMarks = actualTotalQuestions ? actualTotalQuestions * 2 : 0;

                                        return (
                                            <React.Fragment key={result._id}>
                                                <tr className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                                                            ${rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                                rank === 2 ? 'bg-zinc-200 text-zinc-700' :
                                                                    rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-transparent text-zinc-500'}
                                                        `}>
                                                            {rank <= 3 ? rank : `#${rank}`}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                                                                {result.userName.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{result.userName}</p>
                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{result.userEmail}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col">
                                                            <span className={`text-lg font-bold ${result.score >= 40 ? 'text-green-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                                                {result.score} <span className="text-zinc-400 text-sm font-normal">/ {maxMarks || 'N/A'}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col text-sm">
                                                            <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                                                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                                                                {format(new Date(result.submittedAt), 'MMM dd, yyyy')}
                                                            </span>
                                                            <span className="text-zinc-500 text-xs flex items-center gap-1.5 mt-0.5">
                                                                <Clock className="w-3.5 h-3.5" />
                                                                {format(new Date(result.submittedAt), 'hh:mm a')}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => toggleRow(result._id)}
                                                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1 border
                                                                    ${expandedRow === result._id
                                                                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400'
                                                                        : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800'}
                                                                `}
                                                            >
                                                                View {expandedRow === result._id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                            </button>
                                                            <button
                                                                onClick={async () => {
                                                                    const questions = TEST_QUESTIONS_MAP[testId];
                                                                    if (!questions) {
                                                                        alert("Questions data not found for this test ID.");
                                                                        return;
                                                                    }
                                                                    try {
                                                                        const testConfig = TEST_SCHEDULE_MAP[testId];
                                                                        const testSchedule = testConfig ? `${format(testConfig.start, 'dd-MMM-yyyy')} to ${format(testConfig.end, 'dd-MMM-yyyy')}` : "";
                                                                        const testTopics = testConfig ? getTopicsForMock(testConfig.start) : [];

                                                                        await generateMockTestAnswerSheetPDF({
                                                                            userName: result.userName,
                                                                            score: result.score,
                                                                            totalQuestions: result.totalQuestions || questions.length,
                                                                            questions: questions as any,
                                                                            answers: result.answers || {},
                                                                            testName: formatTestName(testId),
                                                                            submittedAt: result.submittedAt,
                                                                            testSchedule,
                                                                            testTopics
                                                                        });
                                                                        setShowNotification(true);
                                                                    } catch (e) {
                                                                        console.error(e);
                                                                        alert("Failed to generate PDF");
                                                                    }
                                                                }}
                                                                className="p-1.5 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                                                                title="Download Answer Sheet PDF"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {expandedRow === result._id && (
                                                    <tr className="bg-zinc-50/50 dark:bg-zinc-800/20 shadow-inner">
                                                        <td colSpan={5} className="p-0">
                                                            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-top-2 duration-200">
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Answer Sheet Data</h4>
                                                                    <span className="text-xs text-zinc-500 font-mono">ID: {result._id}</span>
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                                                                        <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Response Summary</h5>
                                                                        <div className="space-y-2 text-sm">
                                                                            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                                                                                <span className="text-zinc-600 dark:text-zinc-400">Total Questions</span>
                                                                                <span className="font-medium">{actualTotalQuestions}</span>
                                                                            </div>
                                                                            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                                                                                <span className="text-zinc-600 dark:text-zinc-400">Questions Attempted</span>
                                                                                <span className="font-medium">
                                                                                    {result.answers ? Object.keys(result.answers).length : 0}
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                                                                                <span className="text-zinc-600 dark:text-zinc-400">Marks Secured</span>
                                                                                <span className="font-medium text-green-600">
                                                                                    {result.score}
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex justify-between py-1">
                                                                                <span className="text-zinc-600 dark:text-zinc-400">Accuracy</span>
                                                                                <span className="font-medium text-blue-600">
                                                                                    {result.answers && Object.keys(result.answers).length > 0
                                                                                        ? Math.round((result.score / Object.keys(result.answers).length) * 100)
                                                                                        : 0}%
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="bg-zinc-100 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/50 overflow-hidden flex flex-col">
                                                                        <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Raw Data (Debug)</h5>
                                                                        <pre className="flex-1 overflow-auto text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                                                            {JSON.stringify(result.answers, null, 2)}
                                                                        </pre>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                                                    <Search className="w-8 h-8 text-zinc-300" />
                                                </div>
                                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No results found</h3>
                                                <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mt-1">
                                                    No submissions found for <span className="font-mono text-zinc-600 font-bold">{testId}</span>.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {showNotification && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <div>
                        <p className="font-bold text-sm">Answer Sheet Generated</p>
                        <p className="text-xs opacity-80">Check your Downloads folder</p>
                    </div>
                </div>
            )}
        </div>
    );
}
