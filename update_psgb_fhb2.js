const fs = require('fs');

const inputFile = 'D:/IP 2026/MCQs/FHB II PSGB.txt';
const quizzesFile = 'D:/IP 2026/study-planner/src/data/quizzes.ts';

const rawText = fs.readFileSync(inputFile, 'utf-8');

const questions = [];
let currentQ = null;

const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.match(/^Q\d+\./)) {
        if (currentQ) {
            questions.push(currentQ);
        }
        currentQ = {
            q: line.replace(/^Q\d+\.\s*/, '').trim(),
            o: [],
            a: -1,
            e: ''
        };
        let j = i + 1;
        while(j < lines.length && !lines[j].match(/^[A-D]\./) && !lines[j].match(/^Correct Answer:/)) {
             currentQ.q += '\n' + lines[j];
             j++;
        }
        i = j - 1;
    } else if (currentQ && line.match(/^[A-D]\./)) {
        currentQ.o.push(line.replace(/^[A-D]\.\s*/, '').trim());
    } else if (currentQ && line.startsWith('Correct Answer:')) {
        const ansChar = line.replace('Correct Answer:', '').trim()[0];
        currentQ.a = ansChar.charCodeAt(0) - 'A'.charCodeAt(0);
    } else if (currentQ && line.startsWith('Explanation:')) {
        let j = i + 1;
        let expLines = [];
        while (j < lines.length && !lines[j].match(/^Q\d+\./) && !lines[j].startsWith('… continued')) {
            expLines.push(lines[j].replace(/^•\s*/, '').trim());
            j++;
        }
        currentQ.e = expLines.join(' ').trim();
        i = j - 1;
    }
}
if (currentQ) {
    questions.push(currentQ);
}

const half = Math.ceil(questions.length / 2);
const q146 = questions.slice(0, half);
const q147 = questions.slice(half);

function formatQuestions(qs) {
    return qs.map(q => `    { "q": ${JSON.stringify(q.q)}, "o": ${JSON.stringify(q.o)}, "a": ${q.a}, "e": ${JSON.stringify(q.e)} }`).join(',\n');
}

const str146 = formatQuestions(q146);
const str147 = formatQuestions(q147);

let quizzesContent = fs.readFileSync(quizzesFile, 'utf-8');

const regex146 = /146:\s*\[[\s\S]*?\}\s*\],\s*147:/;
if (!regex146.test(quizzesContent)) {
    console.error("Could not find block 146");
    process.exit(1);
}
quizzesContent = quizzesContent.replace(regex146, `146: [\n${str146}\n  ],\n  147:`);

const regex147 = /147:\s*\[[\s\S]*?\}\s*\],\s*\/\/\s*---/;
if (!regex147.test(quizzesContent)) {
    console.error("Could not find block 147");
    process.exit(1);
}
quizzesContent = quizzesContent.replace(regex147, `147: [\n${str147}\n  ],\n\n  // ---`);

fs.writeFileSync(quizzesFile, quizzesContent);
console.log('Successfully updated quizzes.ts');
