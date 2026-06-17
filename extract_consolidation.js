const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    const dataBuffer = fs.readFileSync('D:\\IP 2026\\Paper I\\Consolidation of Products & Centralized Delivery Policy.pdf');
    const parser = new PDFParse(dataBuffer);
    const result = await parser.parse();
    
    // Try to get text content
    let text = '';
    if (result.text) {
        text = result.text;
    } else if (result.pages) {
        text = result.pages.map(p => p.text || '').join('\n\n--- Page Break ---\n\n');
    } else {
        text = JSON.stringify(result, null, 2);
    }
    
    fs.writeFileSync('D:\\IP 2026\\tmp_consolidation_extract.txt', text);
    console.log('Pages:', result.numpages || result.pages?.length || 'unknown');
    console.log('Extracted', text.length, 'chars');
    console.log('Keys:', Object.keys(result));
}

main().catch(err => console.error(err));
