import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// We might need to handle types for autoTable as it extends jsPDF
interface AutoTableUserOptions {
    startY?: number;
    head?: any[][];
    body?: any[][];
    theme?: 'striped' | 'grid' | 'plain';
    styles?: any;
    headStyles?: any;
    columnStyles?: any;
    didDrawPage?: (data: any) => void;
    margin?: any;
}

export const generatePlannerPDF = (schedule: any[], progressPercentage: number) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // --- HELPER: CENTER TEXT ---
    const centerText = (text: string, y: number, size: number = 12, font: string = 'helvetica', style: string = 'normal', color: [number, number, number] = [0, 0, 0]) => {
        doc.setFont(font, style);
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        const textWidth = doc.getStringUnitWidth(text) * size / doc.internal.scaleFactor;
        const x = (pageWidth - textWidth) / 2;
        doc.text(text, x, y);
    };

    // --- COVER PAGE ---
    // Background Gradient (Simulated with rects)
    doc.setFillColor(30, 58, 138); // Blue 900
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Decorative Circle
    doc.setFillColor(59, 130, 246); // Blue 500
    doc.circle(pageWidth / 2, pageHeight / 2, 80, 'F');
    doc.setFillColor(30, 58, 138, 0.9); // Mask
    doc.circle(pageWidth / 2, pageHeight / 2, 70, 'F');

    // Logo / Brand
    centerText("DAK GURU", 40, 30, 'helvetica', 'bold', [255, 255, 255]);
    centerText("Learn, Practice, Succeed", 50, 12, 'helvetica', 'normal', [200, 200, 200]);

    // Title
    centerText("MISSION IP 2026", 110, 40, 'helvetica', 'bold', [255, 255, 255]);
    centerText("Comprehensive Strategic Roadmap", 125, 18, 'helvetica', 'normal', [220, 220, 220]);

    // Metadata Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageWidth / 2 - 70, 160, 140, 60, 5, 5, 'F');

    doc.setFontSize(14);
    doc.setTextColor(30, 64, 175); // Blue 800
    doc.text("Plan Details", pageWidth / 2, 175, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99); // Gray 600
    doc.text(`Duration: 128 Days`, pageWidth / 2, 190, { align: 'center' });
    doc.text(`Start Date: Jan 14, 2026`, pageWidth / 2, 200, { align: 'center' });
    doc.text(`Daily Goal: 2-3 Hours`, pageWidth / 2, 210, { align: 'center' });

    // Footer
    centerText("Generated via Dak Guru Study Planner", pageHeight - 15, 10, 'helvetica', 'italic', [150, 150, 150]);

    // --- SCHEDULE PAGES ---
    doc.addPage();
    doc.setFillColor(255, 255, 255); // Reset bg
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header on Page 2
    doc.setFontSize(18);
    doc.setTextColor(30, 58, 138);
    doc.text("Daily Schedule", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth - 14, 20, { align: 'right' });

    // Table Data Preparation
    const tableBody = schedule.map(item => [
        item.date,
        item.paper,
        item.subTopic,
        item.duration || '-'
    ]);

    // AutoTable Usage Fix: Call autoTable directly with doc as first argument
    autoTable(doc, {
        startY: 30,
        head: [['Date', 'Paper', 'Topic / Activity', 'Duration']],
        body: tableBody,
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 3,
            overflow: 'linebreak'
        },
        headStyles: {
            fillColor: [30, 58, 138], // Blue 900
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 25, fontStyle: 'bold' }, // Date
            1: { cellWidth: 20 }, // Paper
            2: { cellWidth: 'auto' }, // Topic
            3: { cellWidth: 20, halign: 'center' } // Duration
        },
        alternateRowStyles: {
            fillColor: [243, 244, 246] // Gray 100
        },
        didParseCell: (data: any) => {
            // Color code Papers
            if (data.section === 'body' && data.column.index === 1) {
                if (data.cell.raw === 'Paper I') {
                    data.cell.styles.textColor = [37, 99, 235]; // Blue 600
                } else if (data.cell.raw === 'Paper III') {
                    data.cell.styles.textColor = [220, 38, 38]; // Red 600
                } else if (data.cell.raw === 'Revision') {
                    data.cell.styles.textColor = [217, 119, 6]; // Amber 600
                }
            }
            // Highlight Sundays
            if (data.section === 'body' && data.row.raw[2] && typeof data.row.raw[2] === 'string' && data.row.raw[2].toLowerCase().includes('revision')) {
                data.cell.styles.fillColor = [254, 252, 232]; // Yellow 50
            }
        },
        didDrawPage: (data: any) => {
            // Footer on each page
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Dak Guru - Mission IP 2026 | Page ${(doc.internal as any).getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        }
    });

    doc.save('DakGuru_IP2026_Planner.pdf');
};
