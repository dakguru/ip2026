"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, Users, Download, Trophy, CheckCircle2 } from "lucide-react";

interface PageProps {
    params: Promise<{ testId: string }>;
}

export default function AdminResultPage({ params }: PageProps) {
    const { testId } = use(params);
    const router = useRouter(); // Import useRouter

    // Mock Data for Admin View
    const candidates = [
        { rank: 1, name: "Arun Kumar", score: 92, time: "45m 20s", status: "Submitted" },
        { rank: 2, name: "Priya Singh", score: 88, time: "52m 10s", status: "Submitted" },
        { rank: 3, name: "Rajesh Verma", score: 85, time: "58m 05s", status: "Submitted" },
        { rank: 4, name: "Amit Sharma", score: 82, time: "55m 30s", status: "Submitted" },
        { rank: 5, name: "Sneha Gupta", score: 80, time: "59m 00s", status: "Submitted" },
    ];

    useEffect(() => {
        const checkAdmin = () => {
            const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
            if (!cookie) {
                router.push("/");
                return;
            }
            try {
                const session = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
                if (session.role !== 'admin') {
                    router.push("/");
                }
            } catch (e) {
                router.push("/");
            }
        };
        checkAdmin();
    }, [router]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 font-sans text-zinc-900 dark:text-zinc-100">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href={`/mock-tests/weekly/${testId}`} className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Test
                        </Link>
                        <h1 className="text-3xl font-extrabold flex items-center gap-3">
                            <Shield className="w-8 h-8 text-blue-600" />
                            Result Analytics: {testId}
                        </h1>
                        <p className="text-zinc-500 mt-1">
                            Valdate results and manage rank list before public release.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
                            <CheckCircle2 className="w-4 h-4" /> Publish Leaderboard
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-500 uppercase">Total Attempts</p>
                                <p className="text-3xl font-black">{candidates.length + 142}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-500 uppercase">Highest Score</p>
                                <p className="text-3xl font-black">92 / 100</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Download className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-500 uppercase">Average Score</p>
                                <p className="text-3xl font-black">68.5</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rank List Table */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Candidate Rankings</h2>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Download CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-xs">Rank</th>
                                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-xs">Candidate</th>
                                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-xs">Score</th>
                                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-xs">Time Taken</th>
                                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-xs">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {candidates.map((c) => (
                                    <tr key={c.rank} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">#{c.rank}</td>
                                        <td className="px-6 py-4 font-medium">{c.name}</td>
                                        <td className="px-6 py-4 font-bold text-green-600">{c.score}</td>
                                        <td className="px-6 py-4 text-zinc-500">{c.time}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                {c.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
