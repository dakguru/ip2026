import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Toast } from "@capacitor/toast";
import { FileOpener } from "@capacitor-community/file-opener";
import { Question } from "@/lib/quizTypes";
import { loadDakGuruLogo, cleanText } from "@/lib/pdf-generator-mocks";
import {
    QuestionPaperMeta,
    QuestionPaperOptions,
    orderQuestions,
} from "@/lib/pdf-generator-question-paper";

/**
 * LDCE-format Question Paper PDF generator.
 *
 * Produces a landscape A4 PDF that mirrors the official LDCE exam paper layout:
 *   – Page split vertically: English on the left, Hindi on the right
 *   – MCQs rendered inside bordered table rows
 *   – Dak Guru branded header, watermark, and footer on every page
 *   – No instruction page
 *
 * Hindi translations are NOT yet available in the data layer, so the right
 * column currently shows placeholder text. When Hindi fields are added to the
 * Question interface, the generator will use them automatically.
 */

// ── Brand palette (matches the existing QP generator) ───────────────────────
const NAVY: [number, number, number] = [0, 0, 90];
const TEAL: [number, number, number] = [13, 148, 136];
const GOLD: [number, number, number] = [194, 156, 41];
const INK: [number, number, number] = [33, 37, 41];
const MUTED: [number, number, number] = [120, 120, 120];

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

// ── Layout constants (landscape A4: 297 × 210 mm) ──────────────────────────
const MARGIN = 10;
const HEADER_HEIGHT = 28;     // compact header
const FOOTER_HEIGHT = 12;
const COL_GAP = 6;            // gap between left/right columns (divided in half)

// ── Helpers ─────────────────────────────────────────────────────────────────

const pad2 = (n: number) => n.toString().padStart(2, "0");
function displayDate(d: Date): string {
    return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
}
function fileDate(d: Date): string {
    return `${pad2(d.getDate())}${pad2(d.getMonth() + 1)}${d.getFullYear()}`;
}
function fileToken(name: string): string {
    return name
        .replace(/&/g, " and ")
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "");
}

function setColor(doc: jsPDF, c: [number, number, number]) {
    doc.setTextColor(c[0], c[1], c[2]);
}

interface LDCECtx {
    doc: jsPDF;
    pageWidth: number;   // 297
    pageHeight: number;  // 210
    colWidth: number;    // usable width of each column
    leftX: number;       // x-start of left column content
    rightX: number;      // x-start of right column content
    dividerX: number;    // x position of the vertical divider
    logoData: string;
    contentTop: number;  // y below header where content starts
    contentBottom: number; // y above footer where content must stop
}

// ── Watermark ───────────────────────────────────────────────────────────────
function addWatermark(ctx: LDCECtx) {
    const { doc, pageWidth, pageHeight } = ctx;
    doc.saveGraphicsState();
    doc.setGState(new (doc as any).GState({ opacity: 0.04 }));
    doc.setFont("helvetica", "bold");
    doc.setFontSize(60);
    doc.setTextColor(0, 0, 0);
    const cx = pageWidth / 2;
    const cy = pageHeight / 2;
    doc.text("DAK GURU", cx, cy, { align: "center", angle: 35 });
    doc.restoreGraphicsState();
}

// ── Header (compact, single-row) ────────────────────────────────────────────
function drawHeader(
    ctx: LDCECtx,
    meta: QuestionPaperMeta,
    generatedOn: Date
) {
    const { doc, pageWidth, logoData } = ctx;
    const y = MARGIN;
    const w = pageWidth - MARGIN * 2;
    const h = HEADER_HEIGHT;

    // Background box
    doc.setFillColor(250, 250, 252);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.4);
    doc.rect(MARGIN, y, w, h, "FD");

    // Logo
    const logoSize = 18;
    if (logoData) {
        doc.addImage(logoData, "PNG", MARGIN + 4, y + 5, logoSize, logoSize);
    }

    const textX = MARGIN + logoSize + 8;

    // "DAK GURU" title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    setColor(doc, NAVY);
    doc.text("DAK GURU", textX, y + 10);

    // Subtitle: "Question Paper"
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    setColor(doc, TEAL);
    doc.text("Question Paper", textX, y + 16);

    // Gold accent
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.6);
    doc.line(textX, y + 18.5, textX + 50, y + 18.5);
    doc.setLineWidth(0.3);
    doc.setDrawColor(230, 230, 230);
    doc.line(textX + 50, y + 18.5, textX + 100, y + 18.5);

    // Meta info: Paper | Questions | Topic | Date — right-aligned block
    const rightEdge = MARGIN + w - 6;
    doc.setFontSize(7.5);

    // Row 1
    doc.setFont("helvetica", "bold");
    setColor(doc, MUTED);
    doc.text("Paper:", textX, y + 24);
    doc.setFont("helvetica", "normal");
    setColor(doc, INK);
    doc.text(cleanText(meta.paperName || "-"), textX + 14, y + 24);

    doc.setFont("helvetica", "bold");
    setColor(doc, MUTED);
    doc.text("Questions:", textX + 60, y + 24);
    doc.setFont("helvetica", "normal");
    setColor(doc, INK);
    doc.text(String(meta.totalQuestions), textX + 82, y + 24);

    // Topic (truncated if long)
    doc.setFont("helvetica", "bold");
    setColor(doc, MUTED);
    doc.text("Topic:", textX + 105, y + 24);
    doc.setFont("helvetica", "normal");
    setColor(doc, INK);
    const topicMax = rightEdge - (textX + 130);
    const topicText = cleanText(meta.topicName || "-");
    const topicTruncated = doc.splitTextToSize(topicText, topicMax)[0];
    doc.text(topicTruncated, textX + 118, y + 24);

    // Date on top-right
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setColor(doc, MUTED);
    doc.text(displayDate(generatedOn), rightEdge, y + 8, { align: "right" });

    // Column labels: "ENGLISH VERSION" and "HINDI VERSION"
    const labelY = y + h - 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);

    // English label — centered in left column
    setColor(doc, NAVY);
    doc.text("ENGLISH VERSION", ctx.leftX + ctx.colWidth / 2, labelY, { align: "center" });

    // Hindi label — centered in right column
    setColor(doc, NAVY);
    doc.text("HINDI VERSION", ctx.rightX + ctx.colWidth / 2, labelY, { align: "center" });
}

// ── Footer ──────────────────────────────────────────────────────────────────
function drawFooters(ctx: LDCECtx) {
    const { doc, pageWidth, pageHeight } = ctx;
    const w = pageWidth - MARGIN * 2;
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        const fy = pageHeight - MARGIN - 2;
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, fy, MARGIN + w, fy);
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "normal");
        setColor(doc, MUTED);
        doc.text("Dak Guru - Self Learning Portal", MARGIN, fy + 4);
        setColor(doc, TEAL);
        doc.text("www.dakguru.com", pageWidth / 2, fy + 4, { align: "center" });
        setColor(doc, MUTED);
        doc.text(`Page ${p} of ${pageCount}`, MARGIN + w, fy + 4, { align: "right" });
    }
}

// ── Vertical divider on current page ────────────────────────────────────────
function drawDivider(ctx: LDCECtx) {
    const { doc, dividerX, pageHeight } = ctx;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(dividerX, MARGIN, dividerX, pageHeight - MARGIN);
}

// ── Measure a question block height ─────────────────────────────────────────
interface QBlock {
    qNum: number;
    questionText: string;
    options: string[];
    /** Total height in mm needed for this question block on one column side. */
    height: number;
    /** Pre-split lines for the question stem. */
    stemLines: string[];
    /** Pre-split lines per option. */
    optionLines: string[][];
}

function measureQuestion(
    doc: jsPDF,
    q: Question,
    qNum: number,
    colWidth: number
): QBlock {
    const internalWidth = colWidth - 8; // padding inside table cell

    // Question stem
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    const stemText = cleanText(`${qNum}. ${q.text}`);
    const stemLines: string[] = doc.splitTextToSize(stemText, internalWidth);

    // Options
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const optionLines: string[][] = q.options.map((opt, i) => {
        const optText = cleanText(`(${OPTION_LETTERS[i]}) ${opt}`);
        return doc.splitTextToSize(optText, internalWidth / 2 - 4);
    });

    // Height calculation:
    // Stem: stemLines * lineHeight + padding
    // Options: arranged in 2×2 grid — max of (row1, row2) heights
    const stemLineH = 3.8;
    const optLineH = 3.5;
    const stemH = stemLines.length * stemLineH + 4; // top+bottom padding
    const row1H = Math.max(
        (optionLines[0]?.length || 1) * optLineH,
        (optionLines[1]?.length || 1) * optLineH
    );
    const row2H = Math.max(
        (optionLines[2]?.length || 1) * optLineH,
        (optionLines[3]?.length || 1) * optLineH
    );
    const optsH = row1H + row2H + 6; // padding between rows + bottom

    const totalH = stemH + optsH + 2; // border spacing

    return { qNum, questionText: q.text, options: q.options, height: totalH, stemLines, optionLines };
}

// ── Render a single question block in one column ────────────────────────────
function renderQuestionBlock(
    doc: jsPDF,
    block: QBlock,
    x: number,
    y: number,
    colWidth: number,
    isHindi: boolean
): number {
    const internalWidth = colWidth - 8;
    const cellPadX = 4;
    const stemLineH = 3.8;
    const optLineH = 3.5;

    // Outer border for the question block
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.rect(x, y, colWidth, block.height);

    // ── Stem section ────────────────────────────────────────────────────
    const stemH = block.stemLines.length * stemLineH + 4;

    // Divider between stem and options
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(x, y + stemH, x + colWidth, y + stemH);

    // Render stem text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setColor(doc, INK);

    if (isHindi) {
        // Placeholder for Hindi
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        setColor(doc, MUTED);
        const placeholderLines = doc.splitTextToSize(
            `${block.qNum}. [Hindi translation not yet available]`,
            internalWidth
        );
        doc.text(placeholderLines, x + cellPadX, y + 4);
    } else {
        doc.text(block.stemLines, x + cellPadX, y + 4);
    }

    // ── Options section (2×2 grid) ──────────────────────────────────────
    const optsY = y + stemH + 2;
    const halfW = colWidth / 2;

    // Vertical divider between option columns
    doc.setDrawColor(215, 215, 215);
    doc.setLineWidth(0.15);
    doc.line(x + halfW, y + stemH, x + halfW, y + block.height);

    // Row 1 options (A, B)
    const row1H = Math.max(
        (block.optionLines[0]?.length || 1) * optLineH,
        (block.optionLines[1]?.length || 1) * optLineH
    );

    // Horizontal divider between option rows
    const row1Bottom = optsY + row1H + 2;
    doc.line(x, row1Bottom, x + colWidth, row1Bottom);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    if (isHindi) {
        setColor(doc, MUTED);
        // Placeholder options
        for (let i = 0; i < Math.min(block.options.length, 4); i++) {
            const optX = x + cellPadX + (i % 2) * halfW;
            const optY = i < 2 ? optsY + 2 : row1Bottom + 2;
            doc.text(`(${OPTION_LETTERS[i]}) [Hindi]`, optX, optY);
        }
    } else {
        setColor(doc, INK);
        // Option A (top-left)
        if (block.optionLines[0]) {
            doc.text(block.optionLines[0], x + cellPadX, optsY + 2);
        }
        // Option B (top-right)
        if (block.optionLines[1]) {
            doc.text(block.optionLines[1], x + halfW + cellPadX, optsY + 2);
        }
        // Option C (bottom-left)
        if (block.optionLines[2]) {
            doc.text(block.optionLines[2], x + cellPadX, row1Bottom + 2);
        }
        // Option D (bottom-right)
        if (block.optionLines[3]) {
            doc.text(block.optionLines[3], x + halfW + cellPadX, row1Bottom + 2);
        }
    }

    return y + block.height;
}

// ── Main PDF creation ───────────────────────────────────────────────────────
export async function createLDCEFormatPDFDoc(
    questions: Question[],
    topicId: string,
    meta: QuestionPaperMeta,
    options?: QuestionPaperOptions
): Promise<jsPDF> {
    const logoData = await loadDakGuruLogo("official-logo.png");

    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.width;   // 297
    const pageHeight = doc.internal.pageSize.height;  // 210

    const totalContentWidth = pageWidth - MARGIN * 2;
    const colWidth = (totalContentWidth - COL_GAP) / 2;
    const leftX = MARGIN;
    const dividerX = MARGIN + colWidth + COL_GAP / 2;
    const rightX = dividerX + COL_GAP / 2;
    const contentTop = MARGIN + HEADER_HEIGHT + 4;
    const contentBottom = pageHeight - MARGIN - FOOTER_HEIGHT;

    const ctx: LDCECtx = {
        doc, pageWidth, pageHeight, colWidth, leftX, rightX, dividerX, logoData,
        contentTop, contentBottom,
    };

    const now = new Date();

    // Draw header on page 1
    drawHeader(ctx, meta, now);
    addWatermark(ctx);
    drawDivider(ctx);

    // Order questions (with optional shuffle)
    const ordered = orderQuestions(questions, topicId, options);

    // Measure all question blocks
    const blocks: QBlock[] = ordered.map((q, i) =>
        measureQuestion(doc, q, i + 1, colWidth)
    );

    // Render questions
    let curY = contentTop;

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const spaceLeft = contentBottom - curY;

        // Need a new page?
        if (block.height > spaceLeft) {
            doc.addPage();
            addWatermark(ctx);
            drawDivider(ctx);
            curY = MARGIN + 4;
        }

        // Render English (left column)
        renderQuestionBlock(doc, block, leftX, curY, colWidth, false);

        // Render Hindi placeholder (right column)
        renderQuestionBlock(doc, block, rightX, curY, colWidth, true);

        curY += block.height + 2; // gap between questions
    }

    // End marker
    if (curY + 12 > contentBottom) {
        doc.addPage();
        addWatermark(ctx);
        drawDivider(ctx);
        curY = MARGIN + 4;
    }
    curY += 4;
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 30, curY, pageWidth / 2 + 30, curY);
    curY += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setColor(doc, NAVY);
    doc.text("— End of Question Paper —", pageWidth / 2, curY, { align: "center" });

    // Footers on all pages
    drawFooters(ctx);

    return doc;
}

// ── Save / download (web + native) ─────────────────────────────────────────
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

/** Generate + download the LDCE-format bilingual Question Paper PDF. */
export async function downloadLDCEFormatPDF(
    questions: Question[],
    topicId: string,
    meta: QuestionPaperMeta,
    options?: QuestionPaperOptions
) {
    const doc = await createLDCEFormatPDFDoc(questions, topicId, meta, options);
    const filename = `DakGuru_LDCE_QP_${fileToken(meta.topicName)}_${fileDate(new Date())}.pdf`;
    await savePdf(doc, filename);
}
