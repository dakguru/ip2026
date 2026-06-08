import { CourseMode } from "@/contexts/CourseContext";
import { Question } from "@/lib/quizTypes";
import { TEST_QUESTIONS_MAP } from "@/lib/mock-test-data-map";
import { SERIES_II_MOCK_SCHEDULE } from "@/data/seriesIIMockSchedule";
import { PSGB_MOCK_SCHEDULE } from "@/data/psgbMockSchedule";

/**
 * Browser-agnostic catalog of mock tests that have published question content
 * (`TEST_QUESTIONS_MAP`). Used by the admin "Question Paper PDF" page to offer
 * Question Paper / Answer Key PDFs for COMPLETED mock tests of both courses.
 *
 * Titles, dates and completion status mirror the exact derivation used by the
 * public mock-tests page (`src/app/mock-tests/page.tsx`) so the admin sees the
 * same names/dates users see. No mock data is duplicated — questions are read
 * straight from the existing `TEST_QUESTIONS_MAP`.
 *
 * Importable from both server (admin API) and client (page + PDF generators).
 */

export interface MockTestMeta {
    id: string;
    course: CourseMode;
    title: string;        // test title (rendered as "Topic" in the PDF)
    examName: string;     // rendered as "Paper" in the PDF
    group: string;        // section heading on the page (and PAPER chip label)
    dateLabel: string;    // dd.mm.yyyy of the test
    completed: boolean;
    questionCount: number;
}

const pad2 = (n: number) => n.toString().padStart(2, "0");

/** Extract the trailing "YYYY-MM-DD" from a test id, as a local Date (midnight). */
function dateFromId(id: string): Date | null {
    const m = id.match(/(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function tailDateStr(id: string): string | null {
    const m = id.match(/\d{4}-\d{2}-\d{2}$/);
    return m ? m[0] : null;
}

function endOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

function ddmmyyyy(d: Date): string {
    return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
}

// Series II lookup by id; PSGB lookup by sunday (exam) date.
const seriesIIById = new Map(SERIES_II_MOCK_SCHEDULE.map((t) => [t.id, t]));
const psgbBySunday = new Map(PSGB_MOCK_SCHEDULE.map((w) => [w.sundayDate, w]));

// Series-I weekly tests: number them chronologically (Weekly Mock Test - NN).
const seriesIIndex = (() => {
    const ids = Object.keys(TEST_QUESTIONS_MAP)
        .filter((id) => id.startsWith("mock-") && !id.startsWith("mock-s2-"))
        .map((id) => ({ id, d: dateFromId(id) }))
        .filter((x): x is { id: string; d: Date } => x.d !== null)
        .sort((a, b) => a.d.getTime() - b.d.getTime());
    return new Map(ids.map((x, i) => [x.id, i + 1]));
})();

/** Build metadata for a single test id, or null if it can't be classified. */
function buildMeta(id: string, questionCount: number): MockTestMeta | null {
    const now = Date.now();

    // ── PS Group B ────────────────────────────────────────────────────────────
    if (id.startsWith("psgb-")) {
        const ds = tailDateStr(id);
        const week = ds ? psgbBySunday.get(ds) : undefined;
        const sunday = dateFromId(id);
        if (!sunday) return null;
        const end = endOfDay(sunday);
        return {
            id,
            course: "PS_GR_B",
            title: week ? `PS Gr B - Weekly Mock Test ${pad2(week.week)}` : `PS Gr B Mock Test`,
            examName: "PS Group B Mock Test",
            group: "PS Group B - Weekly Series",
            dateLabel: ddmmyyyy(sunday),
            completed: now > end.getTime(),
            questionCount,
        };
    }

    // ── LDCE IP Series II ──────────────────────────────────────────────────────
    if (id.startsWith("mock-s2-")) {
        const test = seriesIIById.get(id);
        const start = test ? new Date(test.startDate + "T00:00:00") : dateFromId(id);
        const endBase = test ? new Date(test.endDate + "T00:00:00") : dateFromId(id);
        if (!start || !endBase) return null;
        return {
            id,
            course: "LDCE_IP",
            title: test ? test.title : `Weekly Mock Test (Series II)`,
            examName: "LDCE IP Mock Test - Series II",
            group: "LDCE IP - Series II",
            dateLabel: ddmmyyyy(start),
            completed: now > endOfDay(endBase).getTime(),
            questionCount,
        };
    }

    // ── LDCE IP Series I (weekly) ──────────────────────────────────────────────
    if (id.startsWith("mock-")) {
        const saturday = dateFromId(id);
        if (!saturday) return null;
        // Window ends end-of-day Sunday (Saturday + 1), special-cased like the page.
        let sunday = new Date(saturday.getFullYear(), saturday.getMonth(), saturday.getDate() + 1);
        if (id === "mock-2026-05-02") sunday = new Date(2026, 4, 4);
        const idx = seriesIIndex.get(id);
        return {
            id,
            course: "LDCE_IP",
            title: `Weekly Mock Test - ${idx ? pad2(idx) : "??"}`,
            examName: "LDCE IP Mock Test - Series I",
            group: "LDCE IP - Series I",
            dateLabel: ddmmyyyy(saturday),
            completed: now > endOfDay(sunday).getTime(),
            questionCount,
        };
    }

    // Anything else (e.g. "live-sample") is a demo, not a scheduled test — skip.
    return null;
}

/** Full catalog of content-bearing mock tests, sorted by date (newest first). */
export function getMockTestCatalog(): MockTestMeta[] {
    return Object.entries(TEST_QUESTIONS_MAP)
        .map(([id, qs]) => buildMeta(id, Array.isArray(qs) ? qs.length : 0))
        .filter((m): m is MockTestMeta => m !== null && m.questionCount > 0)
        .sort((a, b) => {
            const da = dateFromId(a.id)?.getTime() ?? 0;
            const db = dateFromId(b.id)?.getTime() ?? 0;
            return db - da;
        });
}

/** Completed mock tests for a course (the admin "Completed Mock Tests" list). */
export function getCompletedMockTests(course: CourseMode): MockTestMeta[] {
    return getMockTestCatalog().filter((m) => m.course === course && m.completed);
}

/** Look up a single test's metadata by id. */
export function getMockTestMetaById(id: string): MockTestMeta | undefined {
    return getMockTestCatalog().find((m) => m.id === id);
}

/** Questions for a test id, in stored order (empty array when unknown). */
export function getMockTestQuestions(id: string): Question[] {
    const qs = TEST_QUESTIONS_MAP[id];
    return Array.isArray(qs) ? (qs as Question[]) : [];
}
