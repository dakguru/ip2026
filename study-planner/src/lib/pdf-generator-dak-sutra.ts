
import jsPDF from "jspdf";
import { format } from "date-fns";

interface DakSutraPDFParams {
    title: string;
    rule_number?: string;
    act_name: string;
    category: string;
    effective_date?: string;
    official_text: string;
    guru_explanation: string;
}

export const generateDakSutraPDF = async ({
    title,
    rule_number,
    act_name,
    category,
    effective_date,
    official_text,
    guru_explanation
}: DakSutraPDFParams) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Color Palette
    const primaryColor = [37, 99, 235]; // Blue 600
    const secondaryColor = [71, 85, 105]; // Slate 600

    // Watermark/Logo placeholder logic
    const logoUrl = '/dak-guru-new-logo.png';
    let logoData = "";
    try {
        logoData = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = logoUrl;
            img.crossOrigin = "Anonymous";
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
        console.warn("Logo load failed for PDF", e);
    }

    const addWatermark = () => {
        if (logoData) {
            const wmWidth = 130;
            const wmHeight = 130;
            const wmX = (pageWidth - wmWidth) / 2;
            const wmY = (pageHeight - wmHeight) / 2;
            try {
                // Set opacity for watermark
                (doc as any).setGState(new (doc as any).GState({ opacity: 0.03 }));
                doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight);
                (doc as any).setGState(new (doc as any).GState({ opacity: 1.0 }));
            } catch (e) {
                // Fallback
                doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight);
            }
        }
    };

    const addPageDecoration = () => {
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, 10, pageWidth - margin, 10);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text("Downloaded from www.dakguru.com | A Self-Learning Portal", pageWidth / 2, pageHeight - 10, { align: "center" });
    };

    const renderJustifiedText = (text: string, startY: number, fontFace: string, fontSize: number, isOfficial: boolean = false) => {
        doc.setFont(fontFace, "normal");
        doc.setFontSize(fontSize);
        if (isOfficial) {
            doc.setTextColor(0, 0, 0);
        } else {
            doc.setTextColor(30, 41, 59);
        }

        const paragraphs = text.split('\n');
        let currentY = startY;

        paragraphs.forEach(para => {
            const trimmedPara = para.trim();
            if (!trimmedPara) {
                currentY += 4;
                return;
            }

            let xOff = margin;
            let drawWidth = contentWidth;
            let bullet = "";
            let restText = trimmedPara;

            // Detect bullets or numbered lists
            const listMatch = trimmedPara.match(/^([•\-\*]|\d+\.)\s+(.*)/);
            if (listMatch) {
                bullet = listMatch[1];
                restText = listMatch[2];
                xOff = margin + 10; // Safe indentation
                drawWidth = contentWidth - 10;
            }

            const lines = doc.splitTextToSize(restText, drawWidth);
            lines.forEach((line: string, index: number) => {
                if (currentY > pageHeight - 20) {
                    doc.addPage();
                    addPageDecoration();
                    addWatermark();
                    currentY = 25;
                    doc.setFont(fontFace, "normal");
                    doc.setFontSize(fontSize);
                }

                if (index === 0 && bullet) {
                    doc.setFont("helvetica", "bold");
                    doc.text(bullet, margin, currentY);
                    doc.setFont(fontFace, "normal");
                }

                // Justify all lines except the last one of a paragraph.
                // Bullets/Lists are left-aligned to prevent overlapping bugs in jsPDF.
                const alignMode = (bullet || index === lines.length - 1) ? "left" : "justify";

                doc.text(line, xOff, currentY, { align: alignMode, maxWidth: drawWidth });
                currentY += 6;
            });
            currentY += 2;
        });
        return currentY;
    };

    addPageDecoration();
    addWatermark();

    let y = 30;

    if (logoData) {
        doc.addImage(logoData, 'PNG', margin, 15, 15, 15);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("DAK GURU", margin + (logoData ? 20 : 0), 27);

    y = 45;

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.roundedRect(margin, y - 5, 30, 7, 1, 1, 'F');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(category.toUpperCase(), margin + 15, y, { align: "center" });

    y += 10;

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    const splitTitle = doc.splitTextToSize(title, contentWidth);
    doc.text(splitTitle, margin, y);
    y += (splitTitle.length * 8) + 5;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    const metaArr = [];
    if (act_name) metaArr.push(act_name);
    if (rule_number) metaArr.push(rule_number);
    if (effective_date) metaArr.push(`Eff: ${format(new Date(effective_date), 'PPP')}`);
    doc.text(metaArr.join(" | "), margin, y);

    y += 12;

    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    doc.text("OFFICIAL PROVISION", margin + 5, y + 6.5);
    y += 15;

    y = renderJustifiedText(official_text, y, "times", 12, true);
    y += 10;

    if (y > pageHeight - 40) {
        doc.addPage();
        addPageDecoration();
        addWatermark();
        y = 25;
    }

    doc.setFillColor(239, 246, 255);
    doc.rect(margin, y, contentWidth, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("DAK GURU EXPLANATION", margin + 5, y + 6.5);
    y += 15;

    y = renderJustifiedText(guru_explanation, y, "helvetica", 12, false);

    const safeFilename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`Dak_Sutra_${safeFilename}.pdf`);
};
