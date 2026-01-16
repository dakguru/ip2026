"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Search, User, Download, FileText, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface MockResult {
    _id: string;
    userName: string;
    userEmail: string;
    score: number;
    totalQuestions: number;
    submittedAt: string;
    answers?: Record<string, number>;
}

export default function MockResultsPage() {
    const [results, setResults] = useState<MockResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const res = await fetch('/api/admin/mock-test/results');
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

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Developer CMS
                        </Link>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                            <FileText className="w-8 h-8 text-indigo-600" />
                            Mock Test Results
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">View submissions for the Admin Sample Test.</p>
                    </div>
                    <div>
                        <Link
                            href="/developer/mock-results/mock-01"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            View Mock Test - 01 Results
                        </Link>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search student..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                            />
                        </div>
                        <div className="text-sm text-zinc-500 font-medium">
                            Total Submissions: {results.length}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50/50 dark:bg-zinc-800/20">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">User</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Score</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Submitted</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-zinc-500">Loading results...</td>
                                    </tr>
                                ) : filteredResults.length > 0 ? (
                                    filteredResults.map((result) => (
                                        <>
                                            <tr key={result._id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                                                            {result.userName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-zinc-900 dark:text-zinc-100">{result.userName}</p>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{result.userEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-lg font-bold ${(result.score / result.totalQuestions) >= 0.7 ? 'text-green-600' :
                                                            (result.score / result.totalQuestions) >= 0.4 ? 'text-yellow-600' : 'text-red-600'
                                                            }`}>
                                                            {result.score}
                                                        </span>
                                                        <span className="text-zinc-400 text-sm">/ {result.totalQuestions}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                                    {format(new Date(result.submittedAt), 'MMM d, h:mm a')}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => toggleRow(result._id)}
                                                        className="px-3 py-1.5 text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors inline-flex items-center gap-1"
                                                    >
                                                        Details {expandedRow === result._id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedRow === result._id && (
                                                <tr className="bg-zinc-50/50 dark:bg-zinc-800/20">
                                                    <td colSpan={4} className="p-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                            <div className="space-y-2">
                                                                <p className="font-bold text-zinc-500 uppercase text-xs">Submission ID</p>
                                                                <p className="font-mono text-zinc-700 dark:text-zinc-300">{result._id}</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <p className="font-bold text-zinc-500 uppercase text-xs">Raw Answers JSON</p>
                                                                <pre className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-xs overflow-x-auto font-mono text-zinc-600 dark:text-zinc-400 max-h-40">
                                                                    {JSON.stringify(result.answers, null, 2)}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-zinc-500">No results found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
