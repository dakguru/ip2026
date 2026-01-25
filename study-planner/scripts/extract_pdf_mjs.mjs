import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist';

const filePath = process.argv[2];
if (!filePath) {
    console.error("No file");
    process.exit(1);
}

const buffer = fs.readFileSync(filePath);
const data = new Uint8Array(buffer);

const loadingTask = pdfjsLib.getDocument({
    data: data,
    useSystemFonts: true,
});

loadingTask.promise.then(async function (pdf) {
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + "\n\n";
    }

    fs.writeFileSync('extracted_text.txt', fullText, 'utf8');
    console.log("Done");
}).catch(function (reason) {
    console.error(reason);
});
