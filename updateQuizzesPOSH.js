const fs = require('fs');
const mcqsText = fs.readFileSync('d:/IP 2026/MCQs POSH Act 2013.txt', 'utf8');

const blocks = mcqsText.split(/\n\s*\n/);
let parsedMCQs = [];

blocks.forEach(block => {
    const lines = block.trim().split('\n');
    if (lines.length >= 6) {
        const qLine = lines.find(l => /^\d+\.\s*/.test(l));
        if (!qLine) return;
        const q = qLine.replace(/^\d+\.\s*/, '').trim();

        const oLineA = lines.find(l => /^A\)/.test(l));
        const oLineB = lines.find(l => /^B\)/.test(l));
        const oLineC = lines.find(l => /^C\)/.test(l));
        const oLineD = lines.find(l => /^D\)/.test(l));

        if (!oLineA || !oLineB || !oLineC || !oLineD) return;

        const options = [
            oLineA.replace(/^A\)\s*/, '').trim(),
            oLineB.replace(/^B\)\s*/, '').trim(),
            oLineC.replace(/^C\)\s*/, '').trim(),
            oLineD.replace(/^D\)\s*/, '').trim()
        ];

        const aLine = lines.find(l => /^Correct Answer:/.test(l));
        if (!aLine) return;
        const answerLabel = aLine.split(':')[1].trim();
        const a = ['A', 'B', 'C', 'D'].indexOf(answerLabel);

        const eLine = lines.find(l => /^Explanation:/.test(l));
        let e = '';
        if (eLine) {
            e = eLine.replace(/^Explanation:\s*/, '').trim();
        }

        parsedMCQs.push({ q, o: options, a, e });
    }
});

console.log(`Parsed ${parsedMCQs.length} MCQs.`);

// Chunk into 25 each
let startSetId = 139; // Continuing from 138
let formattedStrings = [];

for (let i = 0; i < parsedMCQs.length; i += 25) {
    const chunk = parsedMCQs.slice(i, i + 25);
    const setId = startSetId++;

    let chunkStr = `  {\n    "id": ${setId},\n    "questions": [\n`;
    chunk.forEach((mcq, idx) => {
        chunkStr += `      {"q":${JSON.stringify(mcq.q)},"o":${JSON.stringify(mcq.o)},"a":${mcq.a},"e":${JSON.stringify(mcq.e)}}`;
        if (idx < chunk.length - 1) chunkStr += ',';
        chunkStr += '\n';
    });
    chunkStr += `    ]\n  }`;
    formattedStrings.push(chunkStr);
}

const newContent = formattedStrings.join(',\n');

const quizzesFilePath = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let quizzesContent = fs.readFileSync(quizzesFilePath, 'utf8');

quizzesContent = quizzesContent.replace(/\s*\]\s*\};\s*export interface/, `,\n${newContent}\n]};\n\nexport interface`);

fs.writeFileSync(quizzesFilePath, quizzesContent);
console.log('Quizzes updated successfully with IDs 139 and 140.');
