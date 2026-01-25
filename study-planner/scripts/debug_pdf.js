const pdfLib = require('pdf-parse');
console.log('Type:', typeof pdfLib);
console.log('Keys:', Object.keys(pdfLib));
if (pdfLib.default) console.log('Default type:', typeof pdfLib.default);
