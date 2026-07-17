"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, FileText, KeyRound, Loader2, ShieldAlert, Shuffle,
    CheckCircle2, AlertCircle, Clock, ListChecks, BrainCircuit, Trophy, Calendar,
    Columns,
} from "lucide-react";
import { useCourse, CourseMode } from "@/contexts/CourseContext";
import { getQuestionPaperTopicById } from "@/lib/question-paper-data";
import { getMockTestMetaById, getMockTestQuestions } from "@/lib/mock-test-catalog";
import {
    downloadQuestionPaperPDF, downloadAnswerKeyPDF, QuestionPaperOptions,
} from "@/lib/pdf-generator-question-paper";
import { downloadLDCEFormatPDF } from "@/lib/pdf-generator-ldce-format";

type BusyKind = "qp" | "ak" | "ldce" | null;
type Source = "topics" | "mocks";

const COURSE_LABELS: Record<CourseMode, string> = {
    LDCE_IP: "LDCE IP",
    PS_GR_B: "PS Gr B",
};

/** Normalised shape rendered by the card (topics + mock tests both map to this). */
interface CardItem {
    id: string;
    title: string;
    groupLabel: string;   // section heading + chip
    questionCount: number;
    comingSoon: boolean;
    dateLabel?: string;   // mock tests only
}

interface TopicMetaDTO {
    id: string; title: string; paper: string; questionCount: number; comingSoon: boolean;
}
interface MockMetaDTO {
    id: string; title: string; examName: string; group: string; dateLabel: string; questionCount: number;
}

export default function QuestionPaperPDFClient() {
    const { course } = useCourse();

    // Local course selector — independent of the global course so generating a
    // paper for another exam here never changes the admin's app-wide course.
    const [selectedCourse, setSelectedCourse] = useState<CourseMode>(course);
    useEffect(() => { setSelectedCourse(course); }, [course]);

    const [source, setSource] = useState<Source>("topics");

    const [items, setItems] = useState<CardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const [shuffle, setShuffle] = useState(false);
    // One seed per page load → a topic/test's Question Paper and Answer Key
    // always share the same shuffled numbering.
    const [shuffleSeed] = useState(() => Math.floor(Math.random() * 1_000_000));

    const [busy, setBusy] = useState<Record<string, BusyKind>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            setAccessDenied(false);
            setLoadError(false);
            try {
                const endpoint = source === "topics"
                    ? `/api/admin/question-paper-pdf/topics?course=${selectedCourse}`
                    : `/api/admin/question-paper-pdf/mock-tests?course=${selectedCourse}`;
                const res = await fetch(endpoint);
                if (res.status === 403) {
                    if (!cancelled) setAccessDenied(true);
                    return;
                }
                if (!res.ok) throw new Error("Failed to load");
                const data = await res.json();
                if (cancelled) return;

                if (source === "topics") {
                    const topics: TopicMetaDTO[] = data.topics || [];
                    setItems(topics.map((t) => ({
                        id: t.id,
                        title: t.title,
                        groupLabel: t.paper,
                        questionCount: t.questionCount,
                        comingSoon: t.comingSoon,
                    })));
                } else {
                    const tests: MockMetaDTO[] = data.tests || [];
                    setItems(tests.map((t) => ({
                        id: t.id,
                        title: t.title,
                        groupLabel: t.group,
                        questionCount: t.questionCount,
                        comingSoon: false,
                        dateLabel: t.dateLabel,
                    })));
                }
            } catch {
                if (!cancelled) setLoadError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [selectedCourse, source]);

    // Preserve API order (same as the MCQ / mock-tests sections), grouped.
    const groups = useMemo(() => {
        const map = new Map<string, CardItem[]>();
        for (const it of items) {
            if (!map.has(it.groupLabel)) map.set(it.groupLabel, []);
            map.get(it.groupLabel)!.push(it);
        }
        return Array.from(map.entries());
    }, [items]);

    const handleGenerate = async (id: string, kind: "qp" | "ak" | "ldce") => {
        setBusy((b) => ({ ...b, [id]: kind }));
        setErrors((e) => ({ ...e, [id]: null }));
        try {
            let questions;
            let meta;
            if (source === "topics") {
                const topic = getQuestionPaperTopicById(selectedCourse, id);
                if (!topic || topic.questions.length === 0) throw new Error("No questions available");
                questions = topic.questions;
                meta = { topicName: topic.title, paperName: topic.paper, totalQuestions: topic.questionCount };
            } else {
                const m = getMockTestMetaById(id);
                questions = getMockTestQuestions(id);
                if (!m || questions.length === 0) throw new Error("No questions available");
                meta = { topicName: m.title, paperName: m.examName, totalQuestions: questions.length };
            }

            const opts: QuestionPaperOptions = { shuffle, shuffleSeed };
            if (kind === "qp") {
                await downloadQuestionPaperPDF(questions, id, meta, opts);
            } else if (kind === "ak") {
                await downloadAnswerKeyPDF(questions, id, meta, opts);
            } else {
                await downloadLDCEFormatPDF(questions, id, meta, opts);
            }
        } catch (err) {
            console.error("Question Paper PDF generation failed", err);
            setErrors((e) => ({ ...e, [id]: "Unable to generate PDF. Please try again." }));
        } finally {
            setBusy((b) => ({ ...b, [id]: null }));
        }
    };

    if (accessDenied) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 text-center">
                <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Access Denied</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">This page is restricted to administrators.</p>
                <Link href="/" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8 transition-colors font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-3 transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <FileText className="w-7 h-7 text-blue-700 dark:text-blue-400" />
                                Question Paper PDF Generator
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm max-w-2xl">
                                Generate printable MCQ question papers and answer keys from existing topic-wise MCQs and completed mock tests.
                            </p>
                        </div>
                        <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm">
                            Admin
                        </span>
                    </div>

                    {/* Source tabs */}
                    <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-xl mt-5 w-full sm:w-fit">
                        {([
                            { key: "topics", label: "Topic-wise MCQs", icon: BrainCircuit },
                            { key: "mocks", label: "Completed Mock Tests", icon: Trophy },
                        ] as { key: Source; label: string; icon: any }[]).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setSource(tab.key)}
                                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${source === tab.key
                                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700"
                                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
                            >
                                <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Controls: course selector + shuffle toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
                        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-xl">
                            {(["LDCE_IP", "PS_GR_B"] as CourseMode[]).map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedCourse(c)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCourse === c
                                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700"
                                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
                                >
                                    {COURSE_LABELS[c]}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setShuffle((s) => !s)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${shuffle
                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"}`}
                            title="When enabled, questions are shuffled. The Question Paper and Answer Key keep the same numbering."
                        >
                            <Shuffle className="w-3.5 h-3.5" />
                            {shuffle ? "Shuffle questions: ON" : "Use default order"}
                        </button>
                    </div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : loadError ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
                        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Unable to load. Please refresh the page.</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <ListChecks className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-3" />
                        <p className="text-sm font-semibold text-zinc-500">
                            {source === "mocks"
                                ? `No completed mock tests for ${COURSE_LABELS[selectedCourse]} yet.`
                                : `No topics found for ${COURSE_LABELS[selectedCourse]}.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {groups.map(([groupLabel, groupItems]) => (
                            <section key={groupLabel}>
                                <div className="flex items-center gap-3 mb-5">
                                    <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{groupLabel}</h2>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                                    <span className="text-xs font-semibold text-zinc-400">
                                        {groupItems.length} {source === "mocks" ? "tests" : "topics"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                                    {groupItems.map((item) => (
                                        <PaperCard
                                            key={item.id}
                                            item={item}
                                            busy={busy[item.id] ?? null}
                                            error={errors[item.id] ?? null}
                                            onGenerate={handleGenerate}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function PaperCard({
    item, busy, error, onGenerate,
}: {
    item: CardItem;
    busy: BusyKind;
    error: string | null;
    onGenerate: (id: string, kind: "qp" | "ak") => void;
}) {
    const disabled = item.comingSoon || item.questionCount === 0;
    const isBusy = busy !== null;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 border-b-4 shadow-sm hover:shadow-lg transition-all p-5 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {item.groupLabel}
                </span>
                {item.dateLabel && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-400">
                        <Calendar className="w-3 h-3" /> {item.dateLabel}
                    </span>
                )}
            </div>
            <h3 className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-3 line-clamp-3 min-h-[2.5rem]">
                {item.title}
            </h3>

            <div className="mt-auto">
                <div className="mb-3 text-xs font-medium">
                    {item.comingSoon ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                            <Clock className="w-3.5 h-3.5" /> Coming Soon.
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {item.questionCount} questions available
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={() => onGenerate(item.id, "qp")}
                        disabled={disabled || isBusy}
                        className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {busy === "qp" ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</>
                        ) : (
                            <><FileText className="w-4 h-4" /> Question Paper PDF</>
                        )}
                    </button>
                    <button
                        onClick={() => onGenerate(item.id, "ak")}
                        disabled={disabled || isBusy}
                        className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {busy === "ak" ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</>
                        ) : (
                            <><KeyRound className="w-4 h-4" /> Answer Key PDF</>
                        )}
                    </button>
                    <button
                        onClick={() => onGenerate(item.id, "ldce")}
                        disabled={disabled || isBusy}
                        className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {busy === "ldce" ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</>
                        ) : (
                            <><Columns className="w-4 h-4" /> LDCE Format PDF</>
                        )}
                    </button>
                </div>

                {disabled && !item.comingSoon && (
                    <p className="mt-2 text-[11px] text-zinc-400 flex items-center gap-1">
                        <ListChecks className="w-3 h-3" /> No questions available.
                    </p>
                )}
                {error && (
                    <p className="mt-2 text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {error}
                    </p>
                )}
            </div>
        </div>
    );
}
