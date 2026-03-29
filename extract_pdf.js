const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('d:\\\\IP 2026\\\\Paper I\\\\THE PO REGULATIONS, 2024 FINAL.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('d:\\\\IP 2026\\\\po_regulations_2024_text.txt', data.text);
    console.log('PDF text extracted to d:\\\\IP 2026\\\\po_regulations_2024_text.txt');
});
