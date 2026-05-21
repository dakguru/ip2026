const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'd:\\IP 2026\\Paper I\\Preservation Period of Records.pdf';
const outputPath = 'd:\\IP 2026\\brain\\5119471e-eb00-452d-8fcd-01055dfd7231\\scratch\\preservation_records_content.txt';

async function extract() {
    try {
        if (!fs.existsSync(pdfPath)) {
            console.error('PDF file not found');
            return;
        }
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdf = new PDFParse();
        await pdf.load(dataBuffer);
        const text = await pdf.getText();
        fs.writeFileSync(outputPath, text);
        console.log('Success extracting to:', outputPath);
    } catch (err) {
        console.error('Error:', err);
    }
}

extract();
