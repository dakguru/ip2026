"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Search, CheckCircle2, ChevronDown, ChevronUp, Clock, Calendar, Download, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { WEEKLY_MOCK_01_QUESTIONS } from "@/data/weekly_mock_data_01";
import { generateMockTestAnswerSheetPDF } from "@/lib/pdf-generator-mocks";

interface MockResult {
    _id: string;
    userName: string;
    userEmail: string;
    score: number;
    totalQuestions: number;
    submittedAt: string;
    answers?: Record<string, number>;
}

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

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => setShowNotification(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    useEffect(() => {
        if (testId) {
            fetchResults();
        }
    }, [testId]);

    const fetchResults = async () => {
        try {
            const res = await fetch(`/api/admin/mock-test/results?testId=${testId}`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setResults(data.results);
            }
        } catch (error) {
            console.error("Failed to fetch results", error);
        } finally {
            setIsLoading(false);
        }
    };

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
        ? Math.round(results.reduce((acc, curr) => acc + curr.score * 2, 0) / totalAttempts)
        : 0;

    const highestScore = totalAttempts > 0
        ? Math.max(...results.map(r => r.score * 2))
        : 0;

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
                            </div>
                            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 capitalize">
                                {formatTestName(testId)}
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Detailed performance report and aspirants ranking.</p>
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
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
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
                                            <>
                                                <tr key={result._id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
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
                                                            <span className={`text-lg font-bold ${result.score * 2 >= 40 ? 'text-green-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                                                {result.score * 2} <span className="text-zinc-400 text-sm font-normal">/ {maxMarks || 'N/A'}</span>
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
                                                                    const questions = testId === 'mock-2026-01-17' ? WEEKLY_MOCK_01_QUESTIONS : [];
                                                                    if (questions.length === 0) {
                                                                        alert("Questions data not found for this test ID.");
                                                                        return;
                                                                    }
                                                                    try {
                                                                        await generateMockTestAnswerSheetPDF({
                                                                            userName: result.userName,
                                                                            score: result.score,
                                                                            totalQuestions: result.totalQuestions,
                                                                            questions: questions as any,
                                                                            answers: result.answers || {},
                                                                            testName: formatTestName(testId),
                                                                            submittedAt: result.submittedAt
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
                                                                                <span className="text-zinc-600 dark:text-zinc-400">Correct Answers</span>
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
                                            </>
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
