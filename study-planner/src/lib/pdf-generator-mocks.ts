
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Toast } from "@capacitor/toast";
import { FileOpener } from '@capacitor-community/file-opener';

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    table?: {
        headers: string[];
        rows: string[][];
    };
}

// Shared logo loader — returns a PNG data URL (or "" on failure). Reused by the
// MCQ answer sheet. Pass a different `filename` to swap the header logo
// (defaults to the Mock Test logo so existing callers are unaffected).
export const loadDakGuruLogo = async (filename: string = 'dak-guru-new-logo.png'): Promise<string> => {
    const logoUrl = (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.())
        ? `https://dakguru.com/${filename}`
        : `/${filename}`;
    try {
        return await new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.src = logoUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    reject('Canvas context failed');
                }
            };
            img.onerror = (e) => reject(e);
        });
    } catch (e) {
        console.error('Logo load failed', e);
        return '';
    }
};

// Clean text and fix encoding issues so jsPDF (helvetica) renders correctly.
export const cleanText = (text: string) => {
    if (!text) return '';
    return text
        .replace(/₹/g, 'Rs. ')
        .replace(/\t/g, ' ')
        .replace(/⅓/g, '1/3')
        .replace(/⅔/g, '2/3')
        .replace(/¼/g, '1/4')
        .replace(/½/g, '1/2')
        .replace(/¾/g, '3/4')
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/—/g, '-')
        .replace(/–/g, '-')
        .replace(/→/g, '->')
        .replace(/←/g, '<-')
        .replace(/↔/g, '<->')
        .replace(/⇒/g, '=>')
        .replace(/⇐/g, '<=')
        .replace(/•/g, '-')
        .replace(/✓/g, '[v]')
        .replace(/…/g, '...');
};

interface GeneratePDFParams {
    userName: string;
    score: number;
    totalQuestions: number;
    questions: Question[];
    answers: Record<string, number>;
    testName: string;
    submittedAt: string;
    testSchedule?: string;
    testTopics?: string[];
}

export function tryParseMatchTheFollowing(text: string) {
    const col1Pattern = "Service|List-I(?: \\([^)]+\\))?|List I|Column I|Column A|Category I|Category|List 1|File Head|Form|Initiative";
    const col2Pattern = "Time|List-II(?: \\([^)]+\\))?|List II|Column II|Column B|Category II|List 2|Correspondence|Context|Detail";
    const regex = new RegExp(`^([\\s\\S]*?)\\s*(${col1Pattern}):\\s*(P\\.\\s+[\\s\\S]+?)\\s*(${col2Pattern}):\\s*(1\\.\\s+[\\s\\S]+?)\\s*(Codes:[\\s\\S]*|Which\\s+of[\\s\\S]*|Choose[\\s\\S]*|Select[\\s\\S]*|$)`, "i");
    const match = text.match(regex);
    if (!match) return null;

    const [, intro, col1Title, col1Raw, col2Title, col2Raw, closingRaw] = match;
    const col1Items = col1Raw.trim().split(/\s+(?=[A-Z]\.\s|[A-Z]\)\s|[A-Z]\.)/).map(s => s.trim());
    
    // Extract closing if present in col2Raw or matched separately
    const closingRe = /\s+(Which\s+of|Codes:|Select\s+|Choose\s+|Match\s+|Correct\s+|Correct\s+code)/i;
    const closingMatch = col2Raw.match(closingRe);
    let col2Clean = col2Raw;
    let closing = closingRaw || '';
    
    if (closingMatch && closingMatch.index !== undefined) {
        col2Clean = col2Raw.slice(0, closingMatch.index).trim();
        if (!closing) {
            closing = col2Raw.slice(closingMatch.index).trim();
        }
    }
    
    const col2Items = col2Clean.trim().split(/\s+(?=\d+\.\s|\d+\)\s|\d+\.)/).map(s => s.trim());

    if (col1Items.length < 2 || col2Items.length < 2) return null;
    return { intro: intro.trim(), col1Title: col1Title.trim(), col1Items, col2Title: col2Title.trim(), col2Items, closing: closing.trim() };
}

export function tryParseNumberedList(text: string) {
    const pattern = /(?<=[\s:])(\d+)\.\s/g;
    const allMatches = [...text.matchAll(pattern)];
    if (allMatches.length < 2) return null;

    // Build sequential run starting at 1
    const runMatches: RegExpMatchArray[] = [];
    for (const m of allMatches) {
        const num = parseInt(m[1]);
        if (num === runMatches.length + 1) {
            runMatches.push(m);
        }
    }
    if (runMatches.length < 2 || parseInt(runMatches[0][1]) !== 1) return null;

    const intro = text.slice(0, runMatches[0].index).trim();

    // Extract item content
    const items: string[] = [];
    for (let i = 0; i < runMatches.length; i++) {
        const contentStart = runMatches[i].index! + runMatches[i][0].length;
        const contentEnd = i + 1 < runMatches.length ? runMatches[i + 1].index! : text.length;
        const content = text.slice(contentStart, contentEnd).trim();
        items.push(content);
    }

    // Check closing question
    const closingRe = /\s+(Which\s+of|How\s+many|Select\s+|Choose\s+the|Match\s+)/i;
    const lastItem = items[items.length - 1];
    const closingMatch = lastItem.match(closingRe);
    let closing = '';

    if (closingMatch && closingMatch.index !== undefined) {
        closing = lastItem.slice(closingMatch.index).trim();
        items[items.length - 1] = lastItem.slice(0, closingMatch.index).trim();
    }

    return { intro, items, closing };
}

interface RenderQuestionsOpts {
    startY: number;
    margin: number;
    contentWidth: number;
    pageHeight: number;
    addWatermark: () => void;
}

/**
 * Renders the question-wise review block (question text, tables, options with
 * correct/your-answer labels, and explanations) onto the jsPDF doc, handling
 * page breaks and watermarks. Shared by the Mock Test and MCQ answer sheets so
 * both use an identical layout. Returns the final y position.
 */
export const renderAnswerSheetQuestions = (
    doc: jsPDF,
    questions: Question[],
    answers: Record<string, number>,
    { startY, margin, contentWidth, pageHeight, addWatermark }: RenderQuestionsOpts
): number => {
    let yPos = startY;

    questions.forEach((q, index) => {
        // Reset potentially polluted state
        doc.setCharSpace(0);

        // Check page break for question title
        if (yPos > pageHeight - 40) {
            doc.addPage();
            addWatermark();
            yPos = 20;
        }

        const matchTheFollowing = tryParseMatchTheFollowing(q.text);
        const numberedList = tryParseNumberedList(q.text);

        if (matchTheFollowing) {
            const { intro, col1Title, col1Items, col2Title, col2Items, closing } = matchTheFollowing;
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);

            const qIntro = cleanText(`Q${index + 1}. ${intro}`);
            const splitIntro = doc.splitTextToSize(qIntro, contentWidth);
            doc.text(splitIntro, margin, yPos, { align: "left" });
            yPos += splitIntro.length * 5 + 4;

            if (yPos > pageHeight - 60) {
                doc.addPage();
                addWatermark();
                yPos = 20;
            }

            const maxRows = Math.max(col1Items.length, col2Items.length);
            const tableRows = Array.from({ length: maxRows }).map((_, i) => [
                cleanText(col1Items[i] || ""),
                cleanText(col2Items[i] || "")
            ]);

            autoTable(doc, {
                startY: yPos,
                head: [[cleanText(col1Title), cleanText(col2Title)]],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [79, 70, 229] },
                styles: { fontSize: 9, cellPadding: 3 },
                margin: { left: margin },
                tableWidth: contentWidth
            });
            yPos = (doc as any).lastAutoTable.finalY + 6;

            if (closing) {
                if (yPos > pageHeight - 20) {
                    doc.addPage();
                    addWatermark();
                    yPos = 20;
                }
                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 0, 0);
                const splitClosing = doc.splitTextToSize(cleanText(closing), contentWidth);
                doc.text(splitClosing, margin, yPos, { align: "left" });
                yPos += splitClosing.length * 5 + 4;
            }
        } else if (numberedList) {
            const { intro, items, closing } = numberedList;
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);

            const qIntro = cleanText(`Q${index + 1}. ${intro}`);
            const splitIntro = doc.splitTextToSize(qIntro, contentWidth);
            doc.text(splitIntro, margin, yPos, { align: "left" });
            yPos += splitIntro.length * 5 + 4;

            items.forEach((item, itemIdx) => {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                const itemText = cleanText(`${itemIdx + 1}. ${item}`);
                const splitItem = doc.splitTextToSize(itemText, contentWidth - 8);

                if (yPos + splitItem.length * 5 > pageHeight - 15) {
                    doc.addPage();
                    addWatermark();
                    yPos = 20;
                }
                doc.text(splitItem, margin + 5, yPos, { align: "left" });
                yPos += splitItem.length * 5 + 1;
            });

            yPos += 2;

            if (closing) {
                if (yPos > pageHeight - 20) {
                    doc.addPage();
                    addWatermark();
                    yPos = 20;
                }
                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 0, 0);
                const splitClosing = doc.splitTextToSize(cleanText(closing), contentWidth);
                doc.text(splitClosing, margin, yPos, { align: "left" });
                yPos += splitClosing.length * 5 + 4;
            }
        } else {
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);
            const qTitle = cleanText(`Q${index + 1}. ${q.text}`);
            const splitTitle = doc.splitTextToSize(qTitle, contentWidth);
            doc.text(splitTitle, margin, yPos, { align: "left" });
            yPos += splitTitle.length * 5 + 4;
        }

        // Render Table if available
        if (q.table) {
            if (yPos > pageHeight - 60) {
                doc.addPage();
                addWatermark();
                yPos = 20;
            }
            autoTable(doc, {
                startY: yPos,
                head: [q.table.headers.map(h => cleanText(h))],
                body: q.table.rows.map(row => row.map(cell => cleanText(cell))),
                theme: 'grid',
                headStyles: { fillColor: [50, 50, 50] },
                styles: { fontSize: 9, cellPadding: 2 },
                margin: { left: margin },
                tableWidth: contentWidth
            });
            yPos = (doc as any).lastAutoTable.finalY + 8;
        }

        doc.setFontSize(10);

        // Render Options
        q.options.forEach((opt, optIndex) => {
            const isCorrect = optIndex === q.correctAnswer;
            const isSelected = answers[q.id] === optIndex;
            let optLabel = "";
            doc.setFont("helvetica", "normal");
            doc.setTextColor(60, 60, 60);

            if (isCorrect) {
                doc.setTextColor(0, 100, 0);
                doc.setFont("helvetica", "bold");
                optLabel = " (Correct Answer)";
            } else if (isSelected && !isCorrect) {
                doc.setTextColor(220, 38, 38);
                optLabel = " (Your Answer)";
            }
            if (isSelected && isCorrect) optLabel = " (Your & Correct Answer)";

            const optText = cleanText(`${String.fromCharCode(65 + optIndex)}. ${opt}${optLabel}`);

            // Ensure charSpace is 0 before measuring/rendering
            doc.setCharSpace(0);

            const splitOpt = doc.splitTextToSize(optText, contentWidth - 5);

            if (yPos + splitOpt.length * 5 > pageHeight - 20) {
                doc.addPage();
                addWatermark();
                yPos = 20;
            }
            doc.text(splitOpt, margin + 5, yPos, { align: "left" });
            yPos += splitOpt.length * 5 + 1;
        });

        yPos += 4;

        // Explanation
        if (q.explanation) {
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text("Explanation:", margin, yPos, { align: "left" });
            yPos += 5;

            doc.setFont("helvetica", "normal");
            const rawExplanation = q.explanation.replace(/\*/g, '');
            // Strip out "Source: ..." part for the PDF
            const explanationWithoutSource = rawExplanation.split(/Source:\s/i)[0].trim();
            const cleanExplanation = cleanText(explanationWithoutSource);
            const splitExpl = doc.splitTextToSize(cleanExplanation, contentWidth);

            if (yPos + splitExpl.length * 5 > pageHeight - 20) {
                doc.addPage();
                addWatermark();
                doc.text("Explanation (contd):", margin, 20, { align: "left" });
                yPos = 25;
            }
            doc.text(splitExpl, margin, yPos, { align: "left" });
            yPos += splitExpl.length * 5 + 10;
        }

        // Separator Line
        doc.setDrawColor(240, 240, 240);
        doc.line(margin, yPos - 5, margin + contentWidth, yPos - 5);
    });

    return yPos;
};

export const createMockTestAnswerSheetPDFDoc = async ({
    userName,
    score,
    totalQuestions,
    questions,
    answers,
    testName,
    submittedAt,
    testSchedule,
    testTopics
}: GeneratePDFParams) => {
    const doc = new jsPDF();

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 14;
    const contentWidth = 180;

    const logoData = await loadDakGuruLogo();

    const addWatermark = () => {
        if (logoData) {
            const wmWidth = 100;
            const wmHeight = 100;
            const wmX = (pageWidth - wmWidth) / 2;
            const wmY = (pageHeight - wmHeight) / 2;
            try {
                if ((doc as any).GState) {
                    doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
                    doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight);
                    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
                }
            } catch (e) {
                console.warn("Watermark opacity failed", e);
            }
        }
    };

    // --- HEADER BLOCK ---
    const boxWidth = pageWidth - (margin * 2);
    const logoSize = 35;

    let topicsText = testTopics && testTopics.length > 0 ? testTopics.join(", ") : "";
    let splitTopics: string[] = [];
    if (topicsText) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        splitTopics = doc.splitTextToSize(topicsText, contentWidth - logoSize - 35);
    }
    
    let boxHeight = 45;
    if (testSchedule) boxHeight += 8;
    if (topicsText) boxHeight += Math.max(8, (splitTopics.length * 5) + 3);

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(margin, 15, boxWidth, boxHeight);

    if (logoData) {
        doc.addImage(logoData, 'PNG', margin + 5, 20, logoSize, logoSize);
    }

    // Main Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 128);
    doc.text("DAK GURU", margin + logoSize + 15, 28);

    // Sub Title
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text(testName, margin + logoSize + 15, 36);

    // Separator
    doc.setDrawColor(230, 230, 230);
    doc.line(margin + logoSize + 10, 42, margin + boxWidth - 5, 42);

    // Details Line
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text("Candidate Name:", margin + logoSize + 15, 52);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(userName, margin + logoSize + 50, 52);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text("Date:", margin + logoSize + 110, 52);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    // Format date properly
    const dateObj = new Date(submittedAt);
    const dateStr = !isNaN(dateObj.getTime())
        ? `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`
        : submittedAt;
    doc.text(dateStr, margin + logoSize + 122, 52);

    let infoY = 60;
    
    if (testSchedule) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text("Schedule:", margin + logoSize + 15, infoY);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(testSchedule, margin + logoSize + 35, infoY);
        infoY += 8;
    }

    if (topicsText) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text("Topics:", margin + logoSize + 15, infoY);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(splitTopics, margin + logoSize + 35, infoY);
        infoY += (splitTopics.length * 5) + 2;
    }

    // Score Box
    const percentage = ((score / (totalQuestions * 2)) * 100).toFixed(1);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(pageWidth - margin - 45, 20, 40, 18, 2, 2, 'F');

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38);
    doc.text(`${score} / ${totalQuestions * 2}`, pageWidth - margin - 25, 28, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(`Score (${percentage}%)`, pageWidth - margin - 25, 34, { align: "center" });

    addWatermark();

    const yPos = 15 + boxHeight + 15;

    renderAnswerSheetQuestions(doc, questions, answers, {
        startY: yPos,
        margin,
        contentWidth,
        pageHeight,
        addWatermark,
    });

    return doc;
};

export const generateMockTestAnswerSheetPDF = async (params: GeneratePDFParams) => {
    const doc = await createMockTestAnswerSheetPDFDoc(params);
    const { userName } = params;

    const safeFilename = userName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `Dak_Guru_AnswerSheet_${safeFilename}_${Date.now()}.pdf`;

    if (!Capacitor.isNativePlatform()) {
        doc.save(filename);
        return;
    }

    // Native Platform Download Logic
    try {
        const pdfBase64 = doc.output('datauristring').split(',')[1];

        // 1. Permission Check
        try {
            const permStatus = await Filesystem.checkPermissions();
            if (permStatus.publicStorage !== 'granted') {
                await Filesystem.requestPermissions();
            }
        } catch (e) {
            console.warn("Permission check failed/skipped", e);
        }

        let fileUri = "";
        let savedLocation = "Documents";

        // 2. Primary: Save to app's Documents/DakGuru/ folder (works reliably on Android 10+ scoped storage)
        try {
            const res = await Filesystem.writeFile({
                path: `DakGuru/${filename}`,
                data: pdfBase64,
                directory: Directory.Documents,
                recursive: true
            });
            fileUri = res.uri;
        } catch (docsErr) {
            console.warn("Failed to save to Documents, trying ExternalStorage...", docsErr);
            // 3. Fallback to ExternalStorage Downloads folder
            try {
                const res = await Filesystem.writeFile({
                    path: `Download/DakGuru/${filename}`,
                    data: pdfBase64,
                    directory: Directory.ExternalStorage,
                    recursive: true
                });
                fileUri = res.uri;
                savedLocation = "Downloads";
            } catch (extErr) {
                console.error("Failed to save to ExternalStorage", extErr);
                throw new Error("Could not save PDF to storage.");
            }
        }

        await Toast.show({
            text: `Saved to ${savedLocation}. Opening...`,
            duration: 'short'
        });

        // 4. Open File
        try {
            await FileOpener.open({
                filePath: fileUri,
                contentType: 'application/pdf',
                openWithDefault: true,
            });
        } catch (openerErr) {
            console.warn("FileOpener failed", openerErr);
            await Toast.show({
                text: "File saved but couldn't auto-open.",
                duration: 'long'
            });
        }

    } catch (error: any) {
        console.error("Native PDF Generation/Save Error", error);
        throw error; // Re-throw so the UI knows it failed
    }
};

export const getMockTestAnswerSheetPDFBlob = async (params: GeneratePDFParams) => {
    const doc = await createMockTestAnswerSheetPDFDoc(params);
    const { userName } = params;
    const safeFilename = userName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `Dak_Guru_AnswerSheet_${safeFilename}_${Date.now()}.pdf`;

    return {
        blob: doc.output('blob'),
        filename
    };
};
