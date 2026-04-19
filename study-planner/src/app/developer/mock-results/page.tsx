"use client";

import { useState } from "react";
import {
    ArrowLeft, FileText, ChevronRight, BarChart3, Clock, Loader2, Download,
    BookOpen, GraduationCap, CalendarDays, CheckCircle2, Circle, Zap
} from "lucide-react";
import Link from "next/link";
import { addDays, format, isBefore, isAfter, startOfDay, isSameDay } from "date-fns";
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
    const today = startOfDay(new Date());

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

        let currentDate = new Date(2026, 0, 17);
        const endDate = new Date(2026, 4, 31);
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

    const q = searchTerm.toLowerCase();

    // Date-based classification
    const getDateStatus = (test: MockTestEntry): 'live' | 'completed' | 'upcoming' => {
        if (test.type === 'sample') return 'live';
        const d = startOfDay(new Date(test.date));
        if (isSameDay(d, today)) return 'live';
        if (isBefore(d, today)) return 'completed';
        return 'upcoming';
    };

    // Live = today's date or sample
    const liveLdce = ldceIpTests
        .filter(t => getDateStatus(t) === 'live' && t.title.toLowerCase().includes(q))
        .sort((a, b) => a.type === 'sample' ? -1 : b.type === 'sample' ? 1 : 0);

    const livePsgb = psgbTests
        .filter(t => getDateStatus(t) === 'live' && t.title.toLowerCase().includes(q));

    const totalLive = liveLdce.length + livePsgb.length;

    // LDCE IP non-live: completed + upcoming, both ascending by date
    const ldceNonLive = ldceIpTests
        .filter(t => getDateStatus(t) !== 'live' && t.title.toLowerCase().includes(q))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // PS Gr B non-live: completed + upcoming, both ascending by date
    const psgbNonLive = psgbTests
        .filter(t => getDateStatus(t) !== 'live' && t.title.toLowerCase().includes(q))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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

    // ── Live list row
    const LiveListRow = ({ test, index }: { test: MockTestEntry; index: number }) => {
        const isSample = test.type === 'sample';
        const isPsgb = test.type === 'psgb';
        const avatarLabel = isSample ? 'S'
            : isPsgb
                ? test.title.match(/(\d+)$/)?.[1]?.padStart(2, '0') || 'G'
                : test.title.match(/(\d+)$/)?.[1]?.padStart(2, '0') || 'M';

        const accentLeft = isSample
            ? 'border-l-emerald-400 dark:border-l-emerald-600'
            : isPsgb
                ? 'border-l-amber-400 dark:border-l-amber-600'
                : 'border-l-indigo-400 dark:border-l-indigo-600';

        const avatarGradient = isSample
            ? 'from-green-500 to-emerald-600'
            : isPsgb
                ? 'from-amber-500 to-orange-600'
                : 'from-indigo-500 to-purple-600';

        return (
            <Link
                href={`/developer/mock-results/${test.id}`}
                className={`group flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-l-4 ${accentLeft} rounded-r-xl px-5 py-3.5 hover:shadow-md transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700`}
            >
                <span className="w-6 text-center text-[10px] font-black text-zinc-300 dark:text-zinc-600 shrink-0 font-mono">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm bg-gradient-to-br ${avatarGradient}`}>
                    {avatarLabel}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {test.title}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <CalendarDays className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span className="text-[11px] text-zinc-400 font-medium">{test.date}</span>
                    </div>
                </div>
                <div className="shrink-0 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Live</span>
                </div>
                <BarChart3 className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 transition-colors shrink-0" />
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors shrink-0" />
            </Link>
        );
    };

    // ── Non-live list row (completed or upcoming)
    const NonLiveListRow = ({ test, index, dateStatus }: { test: MockTestEntry; index: number; dateStatus: 'completed' | 'upcoming' }) => {
        const isPsgb = test.type === 'psgb';
        const isCompleted = dateStatus === 'completed';

        const avatarLabel = isPsgb
            ? test.title.match(/(\d+)$/)?.[1]?.padStart(2, '0') || 'G'
            : test.title.match(/(\d+)$/)?.[1]?.padStart(2, '0') || 'M';

        const accentLeft = isPsgb
            ? 'border-l-amber-400 dark:border-l-amber-600'
            : 'border-l-indigo-400 dark:border-l-indigo-600';

        const avatarGradient = isPsgb
            ? isCompleted ? 'from-amber-400 to-orange-500' : 'from-amber-500 to-orange-600'
            : isCompleted ? 'from-indigo-400 to-purple-500' : 'from-indigo-500 to-purple-600';

        const rowBg = isCompleted
            ? 'bg-zinc-50 dark:bg-zinc-800/40'
            : 'bg-white dark:bg-zinc-900';

        return (
            <Link
                href={`/developer/mock-results/${test.id}`}
                className={`group flex items-center gap-4 ${rowBg} border border-zinc-200 dark:border-zinc-800 border-l-4 ${accentLeft} rounded-r-xl px-5 py-3.5 hover:shadow-md transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700`}
            >
                <span className="w-6 text-center text-[10px] font-black text-zinc-300 dark:text-zinc-600 shrink-0 font-mono">
                    {String(index + 1).padStart(2, '0')}
                </span>

                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm bg-gradient-to-br ${avatarGradient} ${isCompleted ? 'opacity-75' : ''}`}>
                    {avatarLabel}
                </div>

                <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm truncate transition-colors ${isCompleted
                        ? 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200'
                        : 'text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                        {test.title}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <CalendarDays className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span className="text-[11px] font-medium text-zinc-400">{test.date}</span>
                    </div>
                </div>

                {isCompleted ? (
                    <div className="shrink-0 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-zinc-400" />
                        <span className="text-[10px] font-black uppercase tracking-wide text-zinc-400">Completed</span>
                    </div>
                ) : (
                    <div className="shrink-0 flex items-center gap-1.5">
                        <Circle className="w-2.5 h-2.5 text-zinc-300 dark:text-zinc-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">Upcoming</span>
                    </div>
                )}

                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors shrink-0" />
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Developer CMS
                        </Link>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                            <FileText className="w-8 h-8 text-indigo-600" />
                            Mock Test Results
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Select a test to view its leaderboard and detailed submissions.</p>
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
                            className="flex items-center gap-2 px-5 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-500/20 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap text-sm"
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
                                    <Download className="w-4 h-4" />
                                    Download All Mock Data
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-10">

                    {/* ── LIVE MOCK TESTS ── */}
                    {totalLive > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-emerald-200 dark:border-emerald-900">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                            Live Mock Tests
                                            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                                Active
                                            </span>
                                        </h2>
                                        <p className="text-xs text-zinc-400">Tests with configured questions &amp; results data</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                    {totalLive} tests
                                </span>
                            </div>

                            {/* Live LDCE IP */}
                            {liveLdce.length > 0 && (
                                <div className="mb-5">
                                    <div className="flex items-center gap-2 mb-2 px-1">
                                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                                        <span className="text-[11px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400">LDCE IP</span>
                                        <span className="text-[10px] text-zinc-400 font-bold">· {liveLdce.length} tests</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {liveLdce.map((test, i) => (
                                            <LiveListRow key={test.id} test={test} index={i} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Live PS Gr B */}
                            {livePsgb.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2 px-1">
                                        <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                                        <span className="text-[11px] font-black uppercase tracking-widest text-amber-500 dark:text-amber-400">PS Gr B</span>
                                        <span className="text-[10px] text-zinc-400 font-bold">· {livePsgb.length} tests</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {livePsgb.map((test, i) => (
                                            <LiveListRow key={test.id} test={test} index={i} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* ── LDCE IP: Completed + Upcoming ── */}
                    {ldceNonLive.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-indigo-200 dark:border-indigo-900">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-indigo-500" />
                                    <div>
                                        <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">LDCE IP</h2>
                                        <p className="text-xs text-zinc-400">Inspector Posts · Weekly Series · Jan–May 2026</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                                    {ldceNonLive.length} tests
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {ldceNonLive.map((test, i) => (
                                    <NonLiveListRow key={test.id} test={test} index={i} dateStatus={getDateStatus(test) as 'completed' | 'upcoming'} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── PS Gr B: Completed + Upcoming ── */}
                    {psgbNonLive.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-amber-200 dark:border-amber-900">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-5 h-5 text-amber-500" />
                                    <div>
                                        <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">PS Gr B</h2>
                                        <p className="text-xs text-zinc-400">Postal Service Group B · Weekly Series · Apr–Jul 2026</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                    {psgbNonLive.length} tests
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {psgbNonLive.map((test, i) => (
                                    <NonLiveListRow key={test.id} test={test} index={i} dateStatus={getDateStatus(test) as 'completed' | 'upcoming'} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Empty state */}
                    {totalLive === 0 && ldceNonLive.length === 0 && psgbNonLive.length === 0 && searchTerm && (
                        <div className="text-center py-20">
                            <FileText className="w-12 h-12 text-zinc-200 dark:text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-400 font-medium">No tests match "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
