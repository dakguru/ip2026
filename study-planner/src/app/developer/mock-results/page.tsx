"use client";

import { useState } from "react";
import { ArrowLeft, FileText, ChevronRight, BarChart3, Clock, Loader2, Download, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { TEST_QUESTIONS_MAP } from "@/lib/mock-test-data-map";
import { getMockTestAnswerSheetPDFBlob } from "@/lib/pdf-generator-mocks";
import { PSGB_MOCK_SCHEDULE } from "@/data/psgbMockSchedule";

interface MockTestEntry {
    id: string;
    title: string;
    date: string;
    status: string;
    type: 'sample' | 'weekly' | 'psgb';
    hasData: boolean;
}

export default function MockResultsDashboard() {
    // LDCE IP Mock Tests (Weekly 01–17 + Sample)
    const generateLdceIpTests = (): MockTestEntry[] => {
        const tests: MockTestEntry[] = [
            {
                id: 'live-sample',
                title: 'Sample Mock Test',
                date: 'Always Live',
                status: 'Live',
                type: 'sample',
                hasData: true
            }
        ];

        let currentDate = new Date(2026, 0, 17); // Jan 17, 2026
        const endDate = new Date(2026, 4, 31);   // Through May 2026
        let count = 1;

        while (currentDate <= endDate) {
            const id = `mock-${format(currentDate, 'yyyy-MM-dd')}`;
            tests.push({
                id,
                title: `Weekly Mock Test - ${count.toString().padStart(2, '0')}`,
                date: format(currentDate, 'MMM dd, yyyy'),
                status: 'Scheduled',
                type: 'weekly',
                hasData: id in TEST_QUESTIONS_MAP
            });
            currentDate = addDays(currentDate, 7);
            count++;
        }
        return tests;
    };

    // LDCE PS Gr B Mock Tests (14 weeks from PSGB_MOCK_SCHEDULE)
    const generatePsgbTests = (): MockTestEntry[] => {
        return PSGB_MOCK_SCHEDULE.map((week) => {
            const id = `psgb-mock-${week.sundayDate}`;
            return {
                id,
                title: `PS Gr B Mock Test - ${week.week.toString().padStart(2, '0')}`,
                date: format(new Date(week.sundayDate), 'MMM dd, yyyy'),
                status: 'Scheduled',
                type: 'psgb',
                hasData: id in TEST_QUESTIONS_MAP
            };
        });
    };

    const ldceIpTests = generateLdceIpTests();
    const psgbTests = generatePsgbTests();
    const allTests = [...ldceIpTests, ...psgbTests];

    const [searchTerm, setSearchTerm] = useState("");
    const [isGlobalDownloading, setIsGlobalDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [currentDownloadAction, setCurrentDownloadAction] = useState("");

    const filteredLdceIp = ldceIpTests.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredPsgb = psgbTests.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
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

            for (let i = 0; i < testIds.length; i++) {
                const testId = testIds[i];
                const questions = TEST_QUESTIONS_MAP[testId];
                const testInfo = allTests.find(t => t.id === testId);
                const testTitle = testInfo ? testInfo.title : testId;

                setCurrentDownloadAction(`Fetching results for ${testTitle}...`);

                const testFolder = mainFolder.folder(testTitle.replace(/[^a-z0-9]/gi, '_'));
                if (!testFolder) continue;

                try {
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

                            if (j % 5 === 0) await new Promise(resolve => setTimeout(resolve, 0));
                        } catch (err) {
                            console.error(`Error generating PDF for ${result.userName} in ${testId}`, err);
                        }
                    }
                } catch (err) {
                    console.error(`Error processing test ${testId}`, err);
                }

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

    const TestCard = ({ test }: { test: MockTestEntry }) => {
        const isIp = test.type === 'weekly' || test.type === 'sample';
        const isPsgb = test.type === 'psgb';

        const avatarGradient = test.type === 'sample'
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/20'
            : isPsgb
                ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20';

        const hoverBorder = isPsgb
            ? 'hover:border-amber-300 dark:hover:border-amber-900'
            : 'hover:border-indigo-300 dark:hover:border-indigo-900';

        const decorGradient = isPsgb
            ? 'from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10'
            : 'from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10';

        const hoverIconBg = isPsgb
            ? 'group-hover:bg-amber-500'
            : 'group-hover:bg-indigo-600';

        const hoverTitleColor = isPsgb
            ? 'group-hover:text-amber-600 dark:group-hover:text-amber-400'
            : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400';

        const avatarLabel = test.type === 'sample'
            ? 'S'
            : isPsgb
                ? test.title.match(/(\d+)$/)?.[1]?.padStart(2, '0') || 'G'
                : test.title.match(/(\d+)$/)?.[1]?.padStart(2, '0') || 'M';

        const badgeLabel = test.type === 'sample' ? 'Sample' : isPsgb ? 'PS Gr B' : 'LDCE IP';
        const badgeStyle = isPsgb
            ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400'
            : 'bg-zinc-50 border-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400';

        return (
            <Link
                href={`/developer/mock-results/${test.id}`}
                key={test.id}
                className={`group block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md ${hoverBorder} transition-all duration-300 relative overflow-hidden`}
            >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${decorGradient} rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${avatarGradient}`}>
                        {avatarLabel}
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyle}`}>
                        {badgeLabel}
                    </div>
                </div>

                <h3 className={`text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 ${hoverTitleColor} transition-colors`}>
                    {test.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {test.date}
                </p>

                {!test.hasData && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                        Questions not yet configured
                    </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        <BarChart3 className="w-3.5 h-3.5" /> View Results
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 ${hoverIconBg} group-hover:text-white transition-all`}>
                        <ChevronRight className="w-4 h-4" />
                    </span>
                </div>
            </Link>
        );
    };

    const SectionHeader = ({ icon, title, subtitle, count, accentColor }: {
        icon: React.ReactNode;
        title: string;
        subtitle: string;
        count: number;
        accentColor: string;
    }) => (
        <div className={`flex items-center justify-between mb-6 pb-4 border-b-2 ${accentColor}`}>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    {icon}
                    <div>
                        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{title}</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
                    </div>
                </div>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                {count} tests
            </span>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
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
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search tests..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
                        />
                        <button
                            onClick={handleGlobalBulkDownload}
                            disabled={isGlobalDownloading}
                            className="flex items-center gap-2 px-5 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-500/20 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
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

                <div className="space-y-14">
                    {/* ── LDCE IP MOCK TESTS ── */}
                    <section>
                        <SectionHeader
                            icon={<BookOpen className="w-6 h-6 text-indigo-500" />}
                            title="LDCE IP Mock Tests"
                            subtitle="Inspector Posts · Weekly Series · Jan–May 2026"
                            count={filteredLdceIp.length}
                            accentColor="border-indigo-200 dark:border-indigo-800"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLdceIp.map(test => (
                                <TestCard key={test.id} test={test} />
                            ))}
                        </div>
                    </section>

                    {/* ── LDCE PS GR B MOCK TESTS ── */}
                    <section>
                        <SectionHeader
                            icon={<GraduationCap className="w-6 h-6 text-amber-500" />}
                            title="LDCE PS Gr B Mock Tests"
                            subtitle="Postal Service Group B · Weekly Series · Apr–Jul 2026"
                            count={filteredPsgb.length}
                            accentColor="border-amber-200 dark:border-amber-800"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPsgb.map(test => (
                                <TestCard key={test.id} test={test} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
