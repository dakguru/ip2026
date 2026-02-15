"use client";

import { useState } from "react";
import { ArrowLeft, FileText, CheckCircle2, ChevronRight, BarChart3, Users, Clock, Loader2, Download } from "lucide-react";
import Link from "next/link";
import { addDays, format, startOfToday } from "date-fns";
import { TEST_QUESTIONS_MAP } from "@/lib/mock-test-data-map";
import { getMockTestAnswerSheetPDFBlob } from "@/lib/pdf-generator-mocks";

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
    const [isGlobalDownloading, setIsGlobalDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [currentDownloadAction, setCurrentDownloadAction] = useState("");

    const filteredTests = mockTests.filter(test =>
        test.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGlobalBulkDownload = async () => {
        const testIds = Object.keys(TEST_QUESTIONS_MAP);
        if (testIds.length === 0) return;

        if (!confirm(`This will download ALL answer sheets for ALL ${testIds.length} configured tests. This process may take a while. Continue?`)) return;

        setIsGlobalDownloading(true);
        setDownloadProgress(0);

        try {
            const JSZip = (await import("jszip")).default;
            const { saveAs } = (await import("file-saver"));
            const zip = new JSZip();
            const mainFolder = zip.folder("DakGuru_All_Mock_Results");

            if (!mainFolder) throw new Error("Failed to create zip folder");

            let processedCount = 0;
            // Rough estimate of total steps (fetching + generating)
            // We don't know total users yet, so we'll just track progress by test ID roughly

            for (let i = 0; i < testIds.length; i++) {
                const testId = testIds[i];
                const questions = TEST_QUESTIONS_MAP[testId];
                const testInfo = mockTests.find(t => t.id === testId);
                const testTitle = testInfo ? testInfo.title : testId;

                setCurrentDownloadAction(`Fetching results for ${testTitle}...`);

                // Create folder for this test
                const testFolder = mainFolder.folder(testTitle.replace(/[^a-z0-9]/gi, '_'));
                if (!testFolder) continue;

                try {
                    // Fetch results
                    const res = await fetch(`/api/admin/mock-test/results?testId=${testId}`, { cache: 'no-store' });
                    if (!res.ok) continue;

                    const data = await res.json();
                    const results: any[] = data.results || [];

                    if (results.length === 0) continue;

                    for (let j = 0; j < results.length; j++) {
                        const result = results[j];
                        setCurrentDownloadAction(`Generating PDF for ${result.userName} (${testTitle})...`);

                        try {
                            const { blob, filename } = await getMockTestAnswerSheetPDFBlob({
                                userName: result.userName,
                                score: result.score,
                                totalQuestions: result.totalQuestions || questions.length,
                                questions: questions,
                                answers: result.answers || {},
                                testName: testTitle,
                                submittedAt: result.submittedAt
                            });

                            testFolder.file(filename, blob);

                            // Yield to main thread
                            if (j % 5 === 0) await new Promise(resolve => setTimeout(resolve, 0));

                        } catch (err) {
                            console.error(`Error generating PDF for ${result.userName} in ${testId}`, err);
                        }
                    }

                } catch (err) {
                    console.error(`Error processing test ${testId}`, err);
                }

                // Update progress based on tests processed
                setDownloadProgress(Math.round(((i + 1) / testIds.length) * 100));
            }

            setCurrentDownloadAction("Zipping all files...");
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `DakGuru_Complete_Mock_History_${format(new Date(), 'yyyy-MM-dd')}.zip`);

        } catch (error) {
            console.error("Global download failed", error);
            alert("Failed to complete global download. Check console for details.");
        } finally {
            setIsGlobalDownloading(false);
            setDownloadProgress(0);
            setCurrentDownloadAction("");
        }
    };

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
                    <div>
                        <button
                            onClick={handleGlobalBulkDownload}
                            disabled={isGlobalDownloading}
                            className="flex items-center gap-2 px-5 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-500/20 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isGlobalDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <div className="flex flex-col items-start text-xs">
                                        <span>Processing... {downloadProgress}%</span>
                                        <span className="opacity-75 font-normal max-w-[150px] truncate">{currentDownloadAction}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5" />
                                    Download All Mock Data
                                </>
                            )}
                        </button>
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
