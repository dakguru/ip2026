import jsPDF from "jspdf";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Toast } from "@capacitor/toast";
import { FileOpener } from '@capacitor-community/file-opener';
import {
    Question,
    loadDakGuruLogo,
    cleanText,
    renderAnswerSheetQuestions,
} from "./pdf-generator-mocks";

export interface McqPdfParams {
    userName: string;
    paperName: string; // e.g. "Paper I"
    topicName: string;
    mode: 'practice' | 'exam' | 'revision';
    questionRange: string; // e.g. "1-10" or "Revision Set"
    submittedAt: string;
    timeTakenSeconds?: number;
    questions: Question[];
    answers: Record<string, number>; // questionId -> selected index (-1/absent = unattempted)
    // Pre-computed summary (falls back to deriving from questions/answers).
    summary?: {
        total: number;
        attempted: number;
        correct: number;
        wrong: number;
        unattempted: number;
        score: number;
        percentage: number;
    };
}

const MODE_LABELS: Record<string, string> = {
    practice: 'Practice Mode',
    exam: 'Exam Mode',
    revision: 'Revision Mode',
};

const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const date = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${date}, ${h.toString().padStart(2, '0')}:${m} ${ampm}`;
};

const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return '—';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')} min ${s.toString().padStart(2, '0')} sec`;
};

const deriveSummary = (questions: Question[], answers: Record<string, number>) => {
    const total = questions.length;
    let correct = 0, wrong = 0, unattempted = 0;
    questions.forEach((q) => {
        const sel = answers[q.id];
        if (sel === undefined || sel < 0) unattempted++;
        else if (sel === q.correctAnswer) correct++;
        else wrong++;
    });
    const attempted = correct + wrong;
    const score = correct;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, attempted, correct, wrong, unattempted, score, percentage };
};

/**
 * Builds the MCQ Practice Answer Sheet PDF. The header and question-wise review
 * reuse the exact Mock Test answer sheet styling (shared helpers), with an
 * MCQ-specific header (paper/topic/mode/range) and a score-summary strip.
 */
export const createMcqAnswerSheetPDFDoc = async (params: McqPdfParams) => {
    const { userName, paperName, topicName, mode, questionRange, submittedAt, timeTakenSeconds = 0, questions, answers } = params;
    const summary = params.summary || deriveSummary(questions, answers);

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 14;
    const contentWidth = 180;
    const boxWidth = pageWidth - margin * 2;

    // Use the official round emblem (cleaner, non-boxy) for the MCQ answer sheet.
    const logoData = await loadDakGuruLogo('official-logo.png');

    const addWatermark = () => {
        if (!logoData) return;
        const wmSize = 100;
        try {
            if ((doc as any).GState) {
                doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
                doc.addImage(logoData, 'PNG', (pageWidth - wmSize) / 2, (pageHeight - wmSize) / 2, wmSize, wmSize);
                doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
            }
        } catch (e) {
            console.warn('Watermark opacity failed', e);
        }
    };

    // --- HEADER BLOCK ---
    const logoSize = 30;
    const headerTop = 15;
    const textX = margin + logoSize + 13;
    const rightEdge = margin + boxWidth - 6;   // inner right boundary
    const rightColX = textX + 92;              // right column label x

    // Detail-row helpers (defined before measuring so we can pre-wrap the topic).
    const label = (txt: string, x: number, yy: number) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.text(txt, x, yy);
    };
    // Renders a value, truncating with an ellipsis if it would exceed maxW.
    const value = (txt: string, x: number, yy: number, maxW?: number) => {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        let out = cleanText(txt || '-');
        if (maxW && doc.getTextWidth(out) > maxW) {
            while (out.length > 1 && doc.getTextWidth(out + '…') > maxW) out = out.slice(0, -1);
            out = out.trimEnd() + '…';
        }
        doc.text(out, x, yy);
    };

    // Pre-measure the (long) topic title so the box grows to fit 1-2 lines.
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const topicValX = textX + 15;
    const topicLines: string[] = doc.splitTextToSize(cleanText(topicName || '-'), rightEdge - topicValX).slice(0, 2);

    const detailsTop = headerTop + 28;
    const row1Y = detailsTop;
    const row2Y = detailsTop + 6.5;
    const topicY = detailsTop + 13;
    const topicBottom = topicY + (topicLines.length - 1) * 4.5;
    const attemptedY = topicBottom + 6.5;
    const boxHeight = (attemptedY + 4) - headerTop;

    // Box outline
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(margin, headerTop, boxWidth, boxHeight);

    if (logoData) {
        doc.addImage(logoData, 'PNG', margin + 5, headerTop + 4, logoSize, logoSize);
    }

    // Titles
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 128);
    doc.text('DAK GURU', textX, headerTop + 11);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 148, 136);
    doc.text('MCQ Practice Answer Sheet', textX, headerTop + 18);

    doc.setDrawColor(230, 230, 230);
    doc.line(textX, headerTop + 21, rightEdge, headerTop + 21);

    // Row 1: Paper | Mode
    label('Paper:', textX, row1Y);
    value(paperName || '-', textX + 16, row1Y, rightColX - (textX + 16) - 3);
    label('Mode:', rightColX, row1Y);
    value(MODE_LABELS[mode] || mode, rightColX + 14, row1Y, rightEdge - (rightColX + 14));

    // Row 2: Candidate | Questions
    label('Candidate:', textX, row2Y);
    value(userName, textX + 22, row2Y, rightColX - (textX + 22) - 3);
    label('Questions:', rightColX, row2Y);
    value(questionRange, rightColX + 22, row2Y, rightEdge - (rightColX + 22));

    // Row 3: Topic (full width, wraps up to 2 lines)
    label('Topic:', textX, topicY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text(topicLines, topicValX, topicY);

    // Row 4: Attempted on (full width)
    label('Attempted on:', textX, attemptedY);
    value(formatDateTime(submittedAt), textX + 28, attemptedY, rightEdge - (textX + 28));

    addWatermark();

    // --- SCORE SUMMARY STRIP ---
    let yPos = headerTop + boxHeight + 8;
    const cells = [
        { l: 'Total', v: String(summary.total) },
        { l: 'Attempted', v: String(summary.attempted) },
        { l: 'Correct', v: String(summary.correct) },
        { l: 'Wrong', v: String(summary.wrong) },
        { l: 'Unattempted', v: String(summary.unattempted) },
        { l: 'Score', v: `${summary.score}/${summary.total}` },
        { l: 'Percentage', v: `${summary.percentage}%` },
        { l: 'Time Taken', v: formatDuration(timeTakenSeconds) },
    ];
    const cellW = boxWidth / cells.length;
    const summaryH = 16;
    doc.setFillColor(245, 247, 250);
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(margin, yPos, boxWidth, summaryH, 2, 2, 'FD');
    cells.forEach((c, i) => {
        const cx = margin + cellW * i + cellW / 2;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(c.l === 'Correct' ? 0 : c.l === 'Wrong' ? 200 : 60, c.l === 'Correct' ? 120 : 40, c.l === 'Wrong' ? 40 : 60);
        doc.text(c.v, cx, yPos + 7, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(120, 120, 120);
        doc.text(c.l.toUpperCase(), cx, yPos + 12, { align: 'center' });
        if (i > 0) {
            doc.setDrawColor(225, 225, 225);
            doc.line(margin + cellW * i, yPos + 2, margin + cellW * i, yPos + summaryH - 2);
        }
    });

    yPos += summaryH + 10;

    // --- QUESTION-WISE REVIEW (shared engine) ---
    let endY = renderAnswerSheetQuestions(doc, questions, answers, {
        startY: yPos,
        margin,
        contentWidth,
        pageHeight,
        addWatermark,
    });

    // --- CLOSING BLOCK (styled sign-off after the last question) ---
    const centerX = pageWidth / 2;
    if (endY > pageHeight - 45) {
        doc.addPage();
        addWatermark();
        endY = 30;
    } else {
        endY += 6;
    }

    // Decorative divider with the "End of Answer Sheet" pill
    doc.setDrawColor(13, 148, 136);
    doc.setLineWidth(0.4);
    doc.line(margin + 20, endY, pageWidth - margin - 20, endY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 128);
    doc.setFillColor(255, 255, 255);
    const endText = '—  End of Answer Sheet  —';
    const endW = doc.getTextWidth(endText) + 6;
    doc.rect(centerX - endW / 2, endY - 3.5, endW, 7, 'F');
    doc.text(endText, centerX, endY + 1.5, { align: 'center' });

    // Motivational tagline
    endY += 12;
    doc.setFont('helvetica', 'bolditalic');
    doc.setFontSize(10.5);
    doc.setTextColor(13, 148, 136);
    doc.text('Your preparation. Your progress. Your success — powered by Dak Guru.', centerX, endY, { align: 'center' });

    // Copyright line (mixed colours: gray text + teal website)
    endY += 7;
    const year = new Date().getFullYear();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const copyPart = `© ${year} Dak Guru. All rights reserved.  `;
    const sitePart = 'www.dakguru.com';
    const copyW = doc.getTextWidth(copyPart);
    const siteW = doc.getTextWidth(sitePart);
    const startX = centerX - (copyW + siteW) / 2;
    doc.setTextColor(120, 120, 120);
    doc.text(copyPart, startX, endY, { align: 'left' });
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 148, 136);
    doc.text(sitePart, startX + copyW, endY, { align: 'left' });

    // --- FOOTER on every page ---
    // Left: portal name | Center: website | Right: page numbers.
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, pageHeight - 12, margin + boxWidth, pageHeight - 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(130, 130, 130);
        doc.text('Dak Guru - Self Learning Portal', margin, pageHeight - 7);
        doc.setTextColor(13, 148, 136);
        doc.text('www.dakguru.com', pageWidth / 2, pageHeight - 7, { align: 'center' });
        doc.setTextColor(130, 130, 130);
        doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
    }

    return doc;
};

/**
 * Generates and downloads (web) or saves+opens (native) the MCQ answer sheet.
 */
export const downloadMcqAnswerSheetPDF = async (params: McqPdfParams) => {
    const doc = await createMcqAnswerSheetPDFDoc(params);
    const safe = `${params.topicName}_${params.userName}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `Dak_Guru_MCQ_AnswerSheet_${safe}_${Date.now()}.pdf`;

    if (!Capacitor.isNativePlatform()) {
        doc.save(filename);
        return;
    }

    // Native: save then open (mirrors the Mock Test save logic).
    try {
        const pdfBase64 = doc.output('datauristring').split(',')[1];
        try {
            const permStatus = await Filesystem.checkPermissions();
            if (permStatus.publicStorage !== 'granted') await Filesystem.requestPermissions();
        } catch (e) {
            console.warn('Permission check skipped', e);
        }

        let fileUri = '';
        let savedLocation = 'Documents';
        try {
            const res = await Filesystem.writeFile({ path: `DakGuru/${filename}`, data: pdfBase64, directory: Directory.Documents, recursive: true });
            fileUri = res.uri;
        } catch (docsErr) {
            console.warn('Documents save failed, trying ExternalStorage', docsErr);
            const res = await Filesystem.writeFile({ path: `Download/DakGuru/${filename}`, data: pdfBase64, directory: Directory.ExternalStorage, recursive: true });
            fileUri = res.uri;
            savedLocation = 'Downloads';
        }

        await Toast.show({ text: `Saved to ${savedLocation}. Opening...`, duration: 'short' });
        try {
            await FileOpener.open({ filePath: fileUri, contentType: 'application/pdf', openWithDefault: true });
        } catch (openerErr) {
            console.warn('FileOpener failed', openerErr);
            await Toast.show({ text: "File saved but couldn't auto-open.", duration: 'long' });
        }
    } catch (error) {
        console.error('Native MCQ PDF save error', error);
        throw error;
    }
};
