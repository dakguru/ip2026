
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Toast } from "@capacitor/toast";
import { FileOpener } from '@capacitor-community/file-opener';

interface Question {
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

interface GeneratePDFParams {
    userName: string;
    score: number;
    totalQuestions: number;
    questions: Question[];
    answers: Record<string, number>;
    testName: string;
    submittedAt: string;
}

export const generateMockTestAnswerSheetPDF = async ({
    userName,
    score,
    totalQuestions,
    questions,
    answers,
    testName,
    submittedAt
}: GeneratePDFParams) => {
    const doc = new jsPDF();

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 14;
    const contentWidth = 180;

    const logoUrl = '/dak-guru-new-logo.png';
    let logoData = "";
    try {
        logoData = await new Promise((resolve, reject) => {
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
                    reject("Canvas context failed");
                }
            };
            img.onerror = (e) => reject(e);
        });
    } catch (e) {
        console.error("Logo load failed", e);
    }

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
    const boxHeight = 45;
    const boxWidth = pageWidth - (margin * 2);

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(margin, 15, boxWidth, boxHeight);

    const logoSize = 35;
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

    let yPos = 75;

    // Helper to clean text and fix encoding issues
    const cleanText = (text: string) => {
        if (!text) return "";
        return text.replace(/₹/g, "Rs. ").replace(/\t/g, " ");
    };

    // --- QUESTIONS LOOP ---
    questions.forEach((q, index) => {
        // Reset potentially polluted state
        doc.setCharSpace(0);

        // Check page break for question title
        if (yPos > pageHeight - 40) {
            doc.addPage();
            addWatermark();
            yPos = 20;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        const qTitle = cleanText(`Q${index + 1}. ${q.text}`);
        const splitTitle = doc.splitTextToSize(qTitle, contentWidth);
        doc.text(splitTitle, margin, yPos, { align: "left" });
        yPos += splitTitle.length * 5 + 4;

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
            const cleanExplanation = cleanText(q.explanation.replace(/\*/g, ''));
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

    const safeFilename = userName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `Dak_Guru_AnswerSheet_${safeFilename}.pdf`;

    if (!Capacitor.isNativePlatform()) {
        doc.save(filename);
        return;
    }

    // Native Platform Download Logic: Save to Cache & Open
    try {
        // Get PDF as base64
        const pdfBase64 = doc.output('datauristring').split(',')[1];

        // Save to Cache
        const savedFile = await Filesystem.writeFile({
            path: filename,
            data: pdfBase64,
            directory: Directory.Cache,
            recursive: true
        });

        await Toast.show({
            text: 'Opening answer sheet...',
            duration: 'short'
        });

        // Open with FileOpener
        await FileOpener.open({
            filePath: savedFile.uri,
            contentType: 'application/pdf',
            openWithDefault: true,
        });

    } catch (error: any) {
        console.error("Native PDF open failed", error);
        await Toast.show({
            text: `Failed to open PDF: ${error.message}`,
            duration: 'long'
        });
    }
};
