const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'po_guide_part2.txt');
const content = fs.readFileSync(filePath, 'utf8');

const questions = [];
const chunks = content.split(/\n\s*---\s*\n/).map(c => c.trim()).filter(c => c);

chunks.forEach((chunk) => {
    if (!chunk) return;

    const lines = chunk.split('\n').map(l => l.trim()).filter(l => l);
    let qTextLines = [];
    let options = [];
    let answerIndex = -1;
    let explanation = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.match(/^Correct Answer:/i)) {
            const ansChar = line.split(':')[1].trim().toUpperCase().replace(/[^A-D]/g, '');
            if (ansChar === 'A') answerIndex = 0;
            else if (ansChar === 'B') answerIndex = 1;
            else if (ansChar === 'C') answerIndex = 2;
            else if (ansChar === 'D') answerIndex = 3;
            continue;
        }

        if (line.match(/^Explanation:/i)) {
            let explText = line.substring('Explanation:'.length).trim();
            for (let j = i + 1; j < lines.length; j++) {
                explText += ' ' + lines[j];
            }
            explanation = explText;
            break;
        }

        if (line.match(/^[A-D]\.\s/)) {
            options.push(line.replace(/^[A-D]\.\s/, '').trim());
        } else {
            if (options.length === 0) {
                let textToAppend = line;
                if (qTextLines.length === 0) {
                    textToAppend = line.replace(/^Q\.\s*\d+\.\s*/, '');
                }
                qTextLines.push(textToAppend);
            } else if (options.length > 0) {
                options[options.length - 1] += ' ' + line;
            }
        }
    }

    if (qTextLines.length > 0) {
        questions.push({
            q: qTextLines.join('\n').trim(),
            o: options,
            a: answerIndex,
            e: explanation
        });
    }
});

let outputStr = '';
const batchSize = 25;
let startId = 82;

for (let i = 0; i < questions.length; i += batchSize) {
    const batch = questions.slice(i, i + batchSize);
    outputStr += `  ${startId++}: [\n`;
    batch.forEach(q => {
        outputStr += `    { q: ${JSON.stringify(q.q)}, o: ${JSON.stringify(q.o)}, a: ${q.a}, e: ${JSON.stringify(q.e)} },\n`;
    });
    outputStr += `  ],\n`;
}

fs.writeFileSync(path.join(__dirname, 'parsed_po2.ts'), outputStr);
console.log(`Parsed ${questions.length} questions into ${Math.ceil(questions.length / batchSize)} sets.`);
