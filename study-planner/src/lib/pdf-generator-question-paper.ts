import jsPDF from "jspdf";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Toast } from "@capacitor/toast";
import { FileOpener } from "@capacitor-community/file-opener";
import { Question } from "@/lib/quizTypes";
import { loadDakGuruLogo, cleanText } from "@/lib/pdf-generator-mocks";

/**
 * Admin-only "Question Paper PDF" generator.
 *
 * Produces two professional, printable PDFs from the existing topic-wise MCQ
 * data (passed in by the caller — same data that powers the MCQ/Quiz section):
 *   - Question Paper  : questions + options only (no answers, no explanations)
 *   - Answer Key      : correct option + answer text + explanation
 *
 * Generation is client-side (browser) and reuses the shared jsPDF helpers
 * (`loadDakGuruLogo`, `cleanText`) for consistency with the existing MCQ answer
 * sheet PDF. No existing PDF/quiz functionality is modified.
 */

// ── Brand palette ────────────────────────────────────────────────────────────
const NAVY: [number, number, number] = [0, 0, 90];          // headings
const TEAL: [number, number, number] = [13, 148, 136];      // accent / website
const GOLD: [number, number, number] = [194, 156, 41];      // accent line
const INK: [number, number, number] = [33, 37, 41];         // body text
const MUTED: [number, number, number] = [120, 120, 120];    // labels / footer

export interface QuestionPaperMeta {
    topicName: string;
    paperName: string;      // e.g. "Paper I"
    totalQuestions: number;
}

export interface QuestionPaperOptions {
    /** When true, questions are emitted in a (deterministic) shuffled order. */
    shuffle?: boolean;
    /**
     * Seed used for the deterministic shuffle. The page passes the SAME seed for
     * a topic's Question Paper and Answer Key so their numbering stays identical.
     */
    shuffleSeed?: number;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

// ── Deterministic shuffle (mulberry32) ───────────────────────────────────────
// Same seed -> same order, so the Question Paper and Answer Key generated for
// one topic always share the exact question numbering.
function hashString(str: string): number {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function mulberry32(seed: number) {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Returns questions in default order, or a deterministic shuffle when requested. */
export function orderQuestions(
    questions: Question[],
    topicId: string,
    options?: QuestionPaperOptions
): Question[] {
    if (!options?.shuffle) return questions;
    const rng = mulberry32(hashString(topicId) ^ (options.shuffleSeed ?? 0));
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ── Date / filename helpers ──────────────────────────────────────────────────
const pad2 = (n: number) => n.toString().padStart(2, "0");

/** "DD.MM.YYYY" for in-document display. */
function displayDate(d: Date): string {
    return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** "DDMMYYYY" for filenames. */
function fileDate(d: Date): string {
    return `${pad2(d.getDate())}${pad2(d.getMonth() + 1)}${d.getFullYear()}`;
}

/** Sanitise a topic title into a clean filename token (keeps original casing). */
function fileToken(topicName: string): string {
    return topicName
        .replace(/&/g, " and ")
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "");
}

// ── Layout constants ─────────────────────────────────────────────────────────
const MARGIN = 14;

interface DocCtx {
    doc: jsPDF;
    pageWidth: number;
    pageHeight: number;
    boxWidth: number;
    contentWidth: number;
    logoData: string;
    y: number;
}

function setColor(doc: jsPDF, c: [number, number, number]) {
    doc.setTextColor(c[0], c[1], c[2]);
}

/** Draws the branded header block and returns the y-position below it. */
function drawHeader(ctx: DocCtx, subtitle: string, meta: QuestionPaperMeta, generatedOn: Date) {
    const { doc, boxWidth, logoData } = ctx;
    const headerTop = 14;
    const logoSize = 26;
    const textX = MARGIN + logoSize + 12;
    const rightEdge = MARGIN + boxWidth - 6;

    // Pre-wrap the (potentially long) topic title.
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const topicValX = textX + 16;
    const topicLines: string[] = doc
        .splitTextToSize(cleanText(meta.topicName || "-"), rightEdge - topicValX)
        .slice(0, 2);

    const detailsTop = headerTop + 26;
    const row1Y = detailsTop;                       // Paper | Total Questions
    const topicY = detailsTop + 7;                  // Topic (wraps)
    const topicBottom = topicY + (topicLines.length - 1) * 4.5;
    const genY = topicBottom + 6.5;                 // Generated on
    const boxHeight = genY + 4 - headerTop;

    // Box
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.5);
    doc.rect(MARGIN, headerTop, boxWidth, boxHeight);

    if (logoData) {
        doc.addImage(logoData, "PNG", MARGIN + 5, headerTop + 4, logoSize, logoSize);
    }

    // Titles
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    setColor(doc, NAVY);
    doc.text("DAK GURU", textX, headerTop + 11);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    setColor(doc, TEAL);
    doc.text(subtitle, textX, headerTop + 18);

    // Gold accent line under the title
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.8);
    doc.line(textX, headerTop + 21, textX + 70, headerTop + 21);
    doc.setLineWidth(0.4);
    doc.setDrawColor(230, 230, 230);
    doc.line(textX + 70, headerTop + 21, rightEdge, headerTop + 21);

    const label = (txt: string, x: number, yy: number) => {
        doc.setFont("helvetica", "bold");
        setColor(doc, MUTED);
        doc.setFontSize(9);
        doc.text(txt, x, yy);
    };
    const value = (txt: string, x: number, yy: number) => {
        doc.setFont("helvetica", "normal");
        setColor(doc, INK);
        doc.setFontSize(9);
        doc.text(cleanText(txt), x, yy);
    };

    const rightColX = textX + 92;
    // Row 1: Paper | Total Questions
    label("Paper:", textX, row1Y);
    value(meta.paperName || "-", textX + 16, row1Y);
    label("Total Questions:", rightColX, row1Y);
    value(String(meta.totalQuestions), rightColX + 30, row1Y);

    // Row 2: Topic (wraps up to 2 lines)
    label("Topic:", textX, topicY);
    doc.setFont("helvetica", "normal");
    setColor(doc, INK);
    doc.setFontSize(9);
    doc.text(topicLines, topicValX, topicY);

    // Row 3: Generated on
    label("Generated on:", textX, genY);
    value(displayDate(generatedOn), textX + 26, genY);

    ctx.y = headerTop + boxHeight + 8;
}

/** Renders the instructions block (Question Paper only). */
function drawInstructions(ctx: DocCtx, lines: string[]) {
    const { doc, boxWidth } = ctx;
    const innerW = boxWidth - 12;
    // Pre-measure height
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const wrapped: string[][] = lines.map((l) =>
        doc.splitTextToSize(cleanText(l), innerW - 6)
    );
    const lineCount = wrapped.reduce((a, w) => a + w.length, 0);
    const boxH = 9 + lineCount * 4.6 + 4;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.4);
    doc.roundedRect(MARGIN, ctx.y, boxWidth, boxH, 2, 2, "FD");

    // Left teal accent bar
    doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.rect(MARGIN, ctx.y, 1.6, boxH, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    setColor(doc, NAVY);
    doc.text("Instructions", MARGIN + 8, ctx.y + 7);

    let ty = ctx.y + 13;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setColor(doc, INK);
    wrapped.forEach((w, i) => {
        doc.text(`${i + 1}.`, MARGIN + 8, ty);
        doc.text(w, MARGIN + 14, ty);
        ty += w.length * 4.6;
    });

    ctx.y += boxH + 8;
}

/** Footer on every page: "Dak Guru | www.dakguru.com | Page X of Y". */
function drawFooters(doc: jsPDF, pageWidth: number, pageHeight: number, boxWidth: number) {
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.4);
        doc.line(MARGIN, pageHeight - 12, MARGIN + boxWidth, pageHeight - 12);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "normal");
        setColor(doc, MUTED);
        doc.text("Dak Guru", MARGIN, pageHeight - 7);
        setColor(doc, TEAL);
        doc.text("www.dakguru.com", pageWidth / 2, pageHeight - 7, { align: "center" });
        setColor(doc, MUTED);
        doc.text(`Page ${p} of ${pageCount}`, pageWidth - MARGIN, pageHeight - 7, {
            align: "right",
        });
    }
}

/** Adds a new page and resets the content cursor below the top margin. */
function newPage(ctx: DocCtx) {
    ctx.doc.addPage();
    ctx.y = 18;
}

/** Ensure `needed` mm of vertical space remains; otherwise start a new page. */
function ensureSpace(ctx: DocCtx, needed: number) {
    if (ctx.y + needed > ctx.pageHeight - 16) newPage(ctx);
}

function createCtx(logoData: string): DocCtx {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const boxWidth = pageWidth - MARGIN * 2;
    return {
        doc,
        pageWidth,
        pageHeight,
        boxWidth,
        contentWidth: boxWidth - 4,
        logoData,
        y: 0,
    };
}

// ── Question Paper PDF ───────────────────────────────────────────────────────
export async function createQuestionPaperPDFDoc(
    questions: Question[],
    topicId: string,
    meta: QuestionPaperMeta,
    options?: QuestionPaperOptions
): Promise<jsPDF> {
    const logoData = await loadDakGuruLogo("official-logo.png");
    const ctx = createCtx(logoData);
    const { doc, contentWidth } = ctx;
    const now = new Date();

    drawHeader(ctx, "Question Paper", meta, now);
    drawInstructions(ctx, [
        "Choose the most appropriate answer.",
        "Each question carries equal marks.",
        "This question paper is generated from Dak Guru topic-wise MCQ practice section.",
    ]);

    const ordered = orderQuestions(questions, topicId, options);
    const qTextX = MARGIN + 2;
    const optX = MARGIN + 9;
    const optTextX = optX + 6;

    ordered.forEach((q, idx) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        const stem = doc.splitTextToSize(`Q${idx + 1}. ${cleanText(q.text)}`, contentWidth - 2);

        // Pre-measure the option block.
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const optLines = q.options.map((opt) =>
            doc.splitTextToSize(cleanText(opt), contentWidth - 10)
        );
        const stemH = stem.length * 5.2;
        const optsH = optLines.reduce((a, w) => a + w.length * 5 + 1.5, 0);
        const blockH = stemH + 3 + optsH + 5;

        // Keep the whole question together when it fits on one page; otherwise
        // keep at least the stem with its first option before allowing a break.
        if (blockH <= ctx.pageHeight - 34) {
            ensureSpace(ctx, blockH);
        } else {
            ensureSpace(ctx, stemH + 3 + (optLines[0]?.length || 1) * 5 + 4);
        }

        // Question stem
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        setColor(doc, NAVY);
        doc.text(stem, qTextX, ctx.y);
        ctx.y += stemH + 3;

        // Options A. B. C. D.
        q.options.forEach((opt, oIdx) => {
            const lines = optLines[oIdx];
            ensureSpace(ctx, lines.length * 5 + 2);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            setColor(doc, INK);
            doc.text(`${OPTION_LETTERS[oIdx]}.`, optX, ctx.y);
            doc.setFont("helvetica", "normal");
            doc.text(lines, optTextX, ctx.y);
            ctx.y += lines.length * 5 + 1.5;
        });

        ctx.y += 5;
    });

    // End marker
    ensureSpace(ctx, 14);
    ctx.y += 2;
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.5);
    doc.line(ctx.pageWidth / 2 - 30, ctx.y, ctx.pageWidth / 2 + 30, ctx.y);
    ctx.y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    setColor(doc, NAVY);
    doc.text("— End of Question Paper —", ctx.pageWidth / 2, ctx.y, { align: "center" });

    drawFooters(doc, ctx.pageWidth, ctx.pageHeight, ctx.boxWidth);
    return doc;
}

// ── Answer Key PDF ───────────────────────────────────────────────────────────
export async function createAnswerKeyPDFDoc(
    questions: Question[],
    topicId: string,
    meta: QuestionPaperMeta,
    options?: QuestionPaperOptions
): Promise<jsPDF> {
    const logoData = await loadDakGuruLogo("official-logo.png");
    const ctx = createCtx(logoData);
    const { doc, contentWidth } = ctx;
    const now = new Date();

    drawHeader(ctx, "Answer Key with Explanation", meta, now);

    const ordered = orderQuestions(questions, topicId, options);
    const qTextX = MARGIN + 2;

    ordered.forEach((q, idx) => {
        const correctIdx = q.correctAnswer;
        const correctLetter = OPTION_LETTERS[correctIdx] ?? "?";
        const correctText = cleanText(q.options[correctIdx] ?? "");
        const explanation = cleanText(q.explanation || "No explanation provided.");

        // Pre-measure.
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        const stem = doc.splitTextToSize(`Q${idx + 1}. ${cleanText(q.text)}`, contentWidth - 2);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        const ansLines = doc.splitTextToSize(
            `Correct Answer: ${correctLetter}. ${correctText}`,
            contentWidth - 4
        );
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        const expLines = doc.splitTextToSize(explanation, contentWidth - 6);

        const stemH = stem.length * 5.2;
        const ansH = ansLines.length * 5;
        const expH = expLines.length * 4.8;
        const blockH = stemH + 3 + ansH + 4 + 5 + expH + 6;

        if (blockH <= ctx.pageHeight - 34) {
            ensureSpace(ctx, blockH);
        } else {
            ensureSpace(ctx, stemH + 3 + ansH + 6);
        }

        // Question stem
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        setColor(doc, NAVY);
        doc.text(stem, qTextX, ctx.y);
        ctx.y += stemH + 3;

        // Correct answer (teal/green emphasis)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(13, 120, 90);
        ensureSpace(ctx, ansH + 2);
        doc.text(ansLines, qTextX, ctx.y);
        ctx.y += ansH + 4;

        // Explanation
        ensureSpace(ctx, 6 + expLines.length * 4.8);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        setColor(doc, MUTED);
        doc.text("Explanation:", qTextX, ctx.y);
        ctx.y += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        setColor(doc, INK);
        expLines.forEach((line: string) => {
            ensureSpace(ctx, 5);
            doc.text(line, qTextX, ctx.y);
            ctx.y += 4.8;
        });

        // Subtle separator between questions
        ctx.y += 3;
        ensureSpace(ctx, 4);
        doc.setDrawColor(235, 235, 235);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, ctx.y, MARGIN + ctx.boxWidth, ctx.y);
        ctx.y += 5;
    });

    ensureSpace(ctx, 14);
    ctx.y += 2;
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.5);
    doc.line(ctx.pageWidth / 2 - 30, ctx.y, ctx.pageWidth / 2 + 30, ctx.y);
    ctx.y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    setColor(doc, NAVY);
    doc.text("— End of Answer Key —", ctx.pageWidth / 2, ctx.y, { align: "center" });

    drawFooters(doc, ctx.pageWidth, ctx.pageHeight, ctx.boxWidth);
    return doc;
}

// ── Save / download (web + native, mirrors pdf-generator-mcq) ─────────────────
async function savePdf(doc: jsPDF, filename: string) {
    if (!Capacitor.isNativePlatform()) {
        doc.save(filename);
        return;
    }
    try {
        const pdfBase64 = doc.output("datauristring").split(",")[1];
        try {
            const permStatus = await Filesystem.checkPermissions();
            if (permStatus.publicStorage !== "granted") await Filesystem.requestPermissions();
        } catch (e) {
            console.warn("Permission check skipped", e);
        }

        let fileUri = "";
        let savedLocation = "Documents";
        try {
            const res = await Filesystem.writeFile({
                path: `DakGuru/${filename}`,
                data: pdfBase64,
                directory: Directory.Documents,
                recursive: true,
            });
            fileUri = res.uri;
        } catch (docsErr) {
            console.warn("Documents save failed, trying ExternalStorage", docsErr);
            const res = await Filesystem.writeFile({
                path: `Download/DakGuru/${filename}`,
                data: pdfBase64,
                directory: Directory.ExternalStorage,
                recursive: true,
            });
            fileUri = res.uri;
            savedLocation = "Downloads";
        }

        await Toast.show({ text: `Saved to ${savedLocation}. Opening...`, duration: "short" });
        try {
            await FileOpener.open({ filePath: fileUri, contentType: "application/pdf", openWithDefault: true });
        } catch (openerErr) {
            console.warn("FileOpener failed", openerErr);
            await Toast.show({ text: "File saved but couldn't auto-open.", duration: "long" });
        }
    } catch (error) {
        console.error("Native PDF save error", error);
        throw error;
    }
}

/** Generate + download the Question Paper PDF. */
export async function downloadQuestionPaperPDF(
    questions: Question[],
    topicId: string,
    meta: QuestionPaperMeta,
    options?: QuestionPaperOptions
) {
    const doc = await createQuestionPaperPDFDoc(questions, topicId, meta, options);
    const filename = `DakGuru_QuestionPaper_${fileToken(meta.topicName)}_${fileDate(new Date())}.pdf`;
    await savePdf(doc, filename);
}

/** Generate + download the Answer Key PDF. */
export async function downloadAnswerKeyPDF(
    questions: Question[],
    topicId: string,
    meta: QuestionPaperMeta,
    options?: QuestionPaperOptions
) {
    const doc = await createAnswerKeyPDFDoc(questions, topicId, meta, options);
    const filename = `DakGuru_AnswerKey_${fileToken(meta.topicName)}_${fileDate(new Date())}.pdf`;
    await savePdf(doc, filename);
}
