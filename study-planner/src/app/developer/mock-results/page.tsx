"use client";

import { useState } from "react";
import { ArrowLeft, FileText, CheckCircle2, ChevronRight, BarChart3, Users, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { addDays, format, startOfToday } from "date-fns";

export default function MockResultsDashboard() {
    // Generate the list of mock tests dynamically (similar to user side)
    const generateMockTests = () => {
        const tests = [
            {
                id: 'live-sample',
                title: 'Sample Mock Test',
                date: 'Always Live',
                status: 'Live',
                type: 'sample'
            }
        ];

        let currentDate = new Date(2026, 0, 17); // Jan 17, 2026
        const endDate = new Date(2026, 2, 31);   // Generate a few months

        let count = 1;
        while (currentDate <= endDate) {
            tests.push({
                id: `mock-${format(currentDate, 'yyyy-MM-dd')}`,
                title: `Weekly Mock Test - ${count.toString().padStart(2, '0')}`,
                date: format(currentDate, 'MMM dd, yyyy'),
                status: 'Scheduled',
                type: 'weekly'
            });
            currentDate = addDays(currentDate, 7);
            count++;
        }
        return tests;
    };

    const mockTests = generateMockTests();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTests = mockTests.filter(test =>
        test.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Developer CMS
                        </Link>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                            <FileText className="w-8 h-8 text-indigo-600" />
                            Mock Test Results
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Select a test to view its leaderboard and detailed submissions.</p>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTests.map((test) => (
                        <Link
                            href={`/developer/mock-results/${test.id}`}
                            key={test.id}
                            className="group block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-900 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg
                                    ${test.type === 'sample'
                                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/20'
                                        : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20'}
                                `}>
                                    {test.type === 'sample' ? 'S' : test.id.split('-').pop()?.substring(8, 10) || 'M'}
                                </div>
                                <div className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-zinc-50 border-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400">
                                    {test.type === 'sample' ? 'Sample' : 'Weekly'}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {test.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {test.date}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                                    <BarChart3 className="w-3.5 h-3.5" /> View Results
                                </span>
                                <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
