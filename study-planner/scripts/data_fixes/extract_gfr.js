const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function extract() {
    const buffer = fs.readFileSync('D:\\IP 2026\\13. GFR_2017.pdf');
    const parser = new PDFParse({ data: buffer });
    await parser.load();
    const info = parser.getInfo();
    console.log('Info:', JSON.stringify(info, null, 2));
    
    let allText = '';
    const numPages = info.numPages || info.pages || 100;
    console.log('Attempting to extract', numPages, 'pages...');
    
    for (let i = 1; i <= numPages; i++) {
        try {
            const pageText = await parser.getPageText(i);
            allText += `\n=== PAGE ${i} ===\n` + pageText;
        } catch (e) {
            console.log(`Page ${i} error:`, e.message);
            break;
        }
    }
    
    fs.writeFileSync('D:\\IP 2026\\study-planner\\gfr_2017_extracted.txt', allText);
    console.log('Text length:', allText.length);
    console.log('Done!');
}
extract().catch(console.error);
