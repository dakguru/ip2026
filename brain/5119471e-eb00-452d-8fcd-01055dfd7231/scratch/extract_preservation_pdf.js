const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const pdfPath = 'd:\\IP 2026\\Paper I\\Preservation Period of Records.pdf';
const outputPath = 'd:\\IP 2026\\brain\\5119471e-eb00-452d-8fcd-01055dfd7231\\scratch\\preservation_records_content.txt';

if (!fs.existsSync(pdfPath)) {
    console.error('PDF file not found at:', pdfPath);
    process.exit(1);
}

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync(outputPath, data.text);
    console.log('PDF text extracted to:', outputPath);
}).catch(err => {
    console.error('Error extracting PDF:', err);
});
