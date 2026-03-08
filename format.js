const fs = require('fs');
const text = fs.readFileSync('d:/IP 2026/MCQs Manual of Office Procedure.txt', 'utf8');
const qs = text.split(/\n\s*\n/).filter(x => x.trim() !== '');
const out = [];

for (const q of qs) {
    const lines = q.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
    if (lines.length < 6) continue;

    const qText = lines[0].replace(/^\d+\.\s*/, '').trim();
    const o0 = lines[1].replace(/^[A-Z]\)\s*/, '').trim();
    const o1 = lines[2].replace(/^[A-Z]\)\s*/, '').trim();
    const o2 = lines[3].replace(/^[A-Z]\)\s*/, '').trim();
    const o3 = lines[4].replace(/^[A-Z]\)\s*/, '').trim();

    const aLine = lines[5];
    const aMatch = aLine.match(/Correct Answer:\s*([A-D])/);
    if (!aMatch) continue;

    const aIdx = ['A', 'B', 'C', 'D'].indexOf(aMatch[1]);

    const eLine = lines[6];
    const eText = eLine.replace(/^Explanation:\s*/, '').trim();

    out.push({
        q: qText,
        o: [o0, o1, o2, o3],
        a: aIdx,
        e: eText
    });
}

const chunked = [];
for (let i = 0; i < out.length; i += 25) {
    chunked.push(out.slice(i, i + 25));
}

let finalStr = '';
let currentSetId = 136;
for (const chunk of chunked) {
    finalStr += `  ${currentSetId}: [\n`;
    for (let j = 0; j < chunk.length; j++) {
        finalStr += `    ${JSON.stringify(chunk[j])}${j === chunk.length - 1 ? '' : ','}\n`;
    }
    finalStr += `  ],\n`;
    currentSetId++;
}

fs.writeFileSync('d:/IP 2026/tmp_mcqs_formatted.txt', finalStr);
console.log('Done!');
