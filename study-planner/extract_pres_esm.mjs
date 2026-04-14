import fs from 'fs';
import pdf from 'pdf-parse';

const pdfPath = 'd:\\IP 2026\\Paper I\\Preservation Period of Records.pdf';
const outputPath = 'd:\\IP 2026\\brain\\5119471e-eb00-452d-8fcd-01055dfd7231\\scratch\\preservation_records_extracted.txt';

async function run() {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        fs.writeFileSync(outputPath, data.text);
        console.log('Successfully extracted PDF text');
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
