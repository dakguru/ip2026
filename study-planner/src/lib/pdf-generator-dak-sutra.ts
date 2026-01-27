
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
    practical_example?: string;
    exam_insight?: string;
}

import autoTable from "jspdf-autotable";

export const generateDakSutraPDF = async ({
    title,
    rule_number,
    act_name,
    category,
    effective_date,
    official_text,
    guru_explanation,
    practical_example,
    exam_insight
}: DakSutraPDFParams) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Color Palette
    const primaryBlue = [37, 99, 235]; // #2563eb
    const lightBlueBg = [240, 249, 255]; // #f0f9ff
    const textMain = [30, 41, 59]; // #1e293b
    const textGray = [100, 116, 139]; // #64748b

    // Logo state
    const logoUrl = '/official-logo.png';
    let logoData = "";
    try {
        logoData = await new Promise((resolve) => {
            const img = new Image();
            img.src = logoUrl;
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width; canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) { ctx.drawImage(img, 0, 0); resolve(canvas.toDataURL('image/png')); } else resolve("");
            };
            img.onerror = () => resolve("");
        });
    } catch (e) { }

    // --- PDF HELPERS ---
    const addWatermark = (p: jsPDF) => {
        if (!logoData) return;
        try {
            const size = 120;
            const x = (pageWidth - size) / 2;
            const y = (pageHeight - size) / 2;
            (p as any).setGState(new (p as any).GState({ opacity: 0.03 }));
            p.addImage(logoData, 'PNG', x, y, size, size);
            (p as any).setGState(new (p as any).GState({ opacity: 1.0 }));
        } catch (e) { }
    };

    const addFooter = (p: jsPDF) => {
        const count = (p.internal as any).getNumberOfPages();
        p.setDrawColor(226, 232, 240);
        p.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
        p.setFont("helvetica", "normal");
        p.setFontSize(8);
        p.setTextColor(150, 150, 150);
        p.text("Downloaded from www.dakguru.com | A Premium Self-Learning Portal for Postal Aspirants", pageWidth / 2, pageHeight - 10, { align: "center" });
        p.text(`Page ${count}`, pageWidth - margin, pageHeight - 10, { align: "right" });
    };

    const checkPageBreak = (y: number, h: number) => {
        if (y + h > pageHeight - 20) {
            doc.addPage(); addWatermark(doc); addFooter(doc); return 25;
        }
        return y;
    };

    // --- HTML RENDERER ---
    const renderNode = (node: Node, y: number, depth: number = 0, options: any = {}): number => {
        let curY = y;

        if (node.nodeType === Node.TEXT_NODE) {
            const rawText = node.textContent?.replace(/\s+/g, ' ').trim();
            if (!rawText || rawText === "●") return curY; // Skip empty or stand-alone bullet character

            doc.setFontSize(options.fontSize || 10);
            doc.setTextColor(options.color?.[0] || 30, options.color?.[1] || 41, options.color?.[2] || 59);

            if (options.isBold && options.isItalic) doc.setFont("helvetica", "bolditalic");
            else if (options.isBold) doc.setFont("helvetica", "bold");
            else if (options.isItalic) doc.setFont("helvetica", "italic");
            else doc.setFont("helvetica", "normal");

            const xPos = margin + depth;
            const lines = doc.splitTextToSize(rawText, contentWidth - depth);
            lines.forEach((line: string) => {
                curY = checkPageBreak(curY, 6);
                doc.text(line, xPos, curY);
                curY += 5.5;
            });
            return curY;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tag = el.tagName.toLowerCase();
            const classes = el.className;

            // 1. Detect Cards (bg-blue-50, etc.)
            const isCard = classes.includes('bg-') && classes.includes('p-');
            let cardStartY = curY;

            if (isCard) {
                curY += 5;
                cardStartY = curY - 3;
                // Draw Card Accent Border (similar to Web UI)
                doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                doc.rect(margin + depth, cardStartY, 2, 2, 'F'); // Just a marker for start
            }

            const nextOptions = { ...options };
            if (classes.includes('font-bold') || classes.includes('font-black') || ['h1', 'h2', 'h3', 'h4', 'strong', 'th'].includes(tag)) nextOptions.isBold = true;
            if (classes.includes('italic') || tag === 'em') nextOptions.isItalic = true;
            if (classes.includes('text-blue-')) nextOptions.color = primaryBlue;

            if (tag === 'h3' || tag === 'h4') {
                curY += 4;
                nextOptions.fontSize = 12;
                nextOptions.color = primaryBlue;
            }

            // 2. Handle List items with actual dots
            if (tag === 'li') {
                curY = checkPageBreak(curY, 5);
                doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                doc.circle(margin + depth + 2, curY - 1.2, 0.7, 'F');
            }

            // 3. Handle Tables via AutoTable
            if (tag === 'table') {
                curY += 4;
                const rows: any[] = [];
                const head: any[] = [];
                el.querySelectorAll('tr').forEach((tr, i) => {
                    const data: any[] = [];
                    tr.querySelectorAll('td, th').forEach(c => data.push(c.textContent?.trim() || ""));
                    if (i === 0 && tr.querySelector('th')) head.push(data); else rows.push(data);
                });
                autoTable(doc, {
                    startY: curY,
                    head: head.length ? head : undefined,
                    body: rows,
                    margin: { left: margin + depth },
                    styles: { fontSize: 8, font: "helvetica", cellPadding: 2 },
                    headStyles: { fillColor: [241, 245, 249], textColor: [71, 85, 105], fontStyle: 'bold' },
                    theme: 'grid'
                });
                curY = (doc as any).lastAutoTable.finalY + 5;
                return curY;
            }

            // Recurse children
            el.childNodes.forEach(child => {
                curY = renderNode(child, curY, tag === 'li' ? depth + 8 : (isCard ? depth + 5 : depth), nextOptions);
            });

            // 4. Draw the actual card side border after height is known
            if (isCard) {
                doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
                doc.setLineWidth(1.5);
                doc.line(margin + depth, cardStartY, margin + depth, curY - 2);
                curY += 5;
            }

            if (['p', 'div', 'h3', 'h4', 'li'].includes(tag)) curY += 1.5;
        }

        return curY;
    };

    // --- MAIN EXECUTION ---
    addWatermark(doc);
    addFooter(doc);

    // Branding Header
    if (logoData) {
        doc.addImage(logoData, 'PNG', margin, 12, 12, 12);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.text("DAK GURU", margin + 15, 21.5);

    let curY = 40;

    // Header Metadata (Mimic Web Layout)
    doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.roundedRect(margin, curY - 5, 25, 6, 1, 1, 'F');
    doc.setFontSize(8); doc.setTextColor(255, 255, 255);
    doc.text(category.toUpperCase(), margin + 12.5, curY - 0.8, { align: "center" });

    curY += 10;
    doc.setFontSize(18); doc.setTextColor(0, 0, 0);
    const splitTitle = doc.splitTextToSize(title, contentWidth);
    doc.text(splitTitle, margin, curY);
    curY += (splitTitle.length * 8) + 4;

    doc.setFontSize(9); doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    const infoStr = [act_name, rule_number, effective_date ? `Eff: ${format(new Date(effective_date), 'PPP')}` : ''].filter(Boolean).join(" | ");
    doc.text(infoStr, margin, curY);

    curY += 15;

    const renderBlock = (label: string, html: string, startY: number, color: number[]) => {
        let y = checkPageBreak(startY, 25);
        // Header line
        doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
        doc.text(label.toUpperCase(), margin, y);
        doc.setDrawColor(color[0], color[1], color[2], 0.2);
        doc.setLineWidth(0.5);
        doc.line(margin, y + 2, margin + contentWidth, y + 2);
        y += 12;

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, 'text/html');
        return renderNode(htmlDoc.body, y);
    };

    curY = renderBlock("Official Provision", official_text, curY, textGray);
    curY = renderBlock("Dak Guru Explanation", guru_explanation, curY + 12, primaryBlue);

    if (practical_example) curY = renderBlock("Practical Example", practical_example, curY + 12, [180, 83, 9]);
    if (exam_insight) curY = renderBlock("LDCE Exam Insight", exam_insight, curY + 12, [194, 65, 12]);

    doc.save(`DakSutra_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
};
