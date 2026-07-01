const fs = require('fs');
const mcqsText = fs.readFileSync('d:/IP 2026/MCQs/MCQs_Vol_VI.txt', 'utf8');

const lines = mcqsText.split('\n');
let parsedMCQs = [];
let currentMCQ = null;
let state = 'WAITING_FOR_Q'; // WAITING_FOR_Q, IN_Q, IN_O_A, IN_O_B, IN_O_C, IN_O_D, IN_ANS, IN_EXP

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^Q\d+\.\s+/.test(trimmed)) {
        if (currentMCQ) {
            parsedMCQs.push(currentMCQ);
        }
        currentMCQ = { q: trimmed.replace(/^Q\d+\.\s+/, ''), o: [], a: -1, e: '' };
        state = 'IN_Q';
        continue;
    }

    if (!currentMCQ) continue;

    if (/^A\.\s+/.test(trimmed) && state === 'IN_Q') {
        currentMCQ.o.push(trimmed.replace(/^A\.\s+/, ''));
        state = 'IN_O_A';
        continue;
    }
    if (/^B\.\s+/.test(trimmed) && (state === 'IN_O_A' || state === 'IN_Q')) {
        currentMCQ.o.push(trimmed.replace(/^B\.\s+/, ''));
        state = 'IN_O_B';
        continue;
    }
    if (/^C\.\s+/.test(trimmed) && (state === 'IN_O_B' || state === 'IN_Q')) {
        currentMCQ.o.push(trimmed.replace(/^C\.\s+/, ''));
        state = 'IN_O_C';
        continue;
    }
    if (/^D\.\s+/.test(trimmed) && (state === 'IN_O_C' || state === 'IN_Q')) {
        currentMCQ.o.push(trimmed.replace(/^D\.\s+/, ''));
        state = 'IN_O_D';
        continue;
    }
    if (/^Ans:\s+/.test(trimmed)) {
        const ansChar = trimmed.replace(/^Ans:\s+/, '')[0].toUpperCase();
        currentMCQ.a = ['A', 'B', 'C', 'D'].indexOf(ansChar);
        state = 'IN_ANS';
        continue;
    }
    if (/^Exp:\s+/.test(trimmed)) {
        currentMCQ.e = trimmed.replace(/^Exp:\s+/, '');
        state = 'IN_EXP';
        continue;
    }

    // Accumulate multi-line strings
    if (trimmed !== '') {
        if (state === 'IN_Q') {
            currentMCQ.q += '\n' + trimmed;
        } else if (state === 'IN_O_A') {
            currentMCQ.o[0] += ' ' + trimmed;
        } else if (state === 'IN_O_B') {
            currentMCQ.o[1] += ' ' + trimmed;
        } else if (state === 'IN_O_C') {
            currentMCQ.o[2] += ' ' + trimmed;
        } else if (state === 'IN_O_D') {
            currentMCQ.o[3] += ' ' + trimmed;
        } else if (state === 'IN_EXP') {
            currentMCQ.e += '\n' + trimmed;
        }
    }
}
if (currentMCQ) {
    parsedMCQs.push(currentMCQ);
}

console.log(`Parsed ${parsedMCQs.length} MCQs.`);

// Now let's inject into quizzes.ts
const quizzesPath = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let quizzesContent = fs.readFileSync(quizzesPath, 'utf8');

// Find max ID in ALL_SETS_DATA
const idRegex = /^\s*(\d+)\s*:\s*\[/gm;
let match;
let maxId = 0;
while ((match = idRegex.exec(quizzesContent)) !== null) {
    const id = parseInt(match[1]);
    if (id > maxId) maxId = id;
}

console.log(`Max ID found: ${maxId}`);

let nextId = maxId + 1;
let newIds = [];
let chunks = [];

for (let i = 0; i < parsedMCQs.length; i += 25) {
    const chunk = parsedMCQs.slice(i, i + 25);
    const setId = nextId++;
    newIds.push(setId);
    
    let chunkStr = `  // --- Postal Manual Volume VI Part ${newIds.length} ---\n`;
    chunkStr += `  ${setId}: [\n`;
    chunk.forEach(mcq => {
        chunkStr += `    { q: ${JSON.stringify(mcq.q)}, o: ${JSON.stringify(mcq.o)}, a: ${mcq.a}, e: ${JSON.stringify("Correct Answer: " + ["A","B","C","D"][mcq.a] + "\\n\\n" + mcq.e)} },\n`;
    });
    chunkStr += `  ],\n`;
    chunks.push(chunkStr);
}

const newContent = chunks.join('\n');

// Replace ALL_SETS_DATA closing brace
quizzesContent = quizzesContent.replace(/ {2}\],\r?\n\};\r?\n/, `  ],\n\n${newContent}};\n`);

// Update createTopic
// createTopic('p1-15', 'Postal Manual Volume VI', 'Paper I', [62]),
quizzesContent = quizzesContent.replace(/createTopic\('p1-15', 'Postal Manual Volume VI', 'Paper I', \[([^\]]*)\]\)/, (match, p1) => {
    let existingIds = p1.trim() ? p1.split(',').map(s => s.trim()) : [];
    existingIds = existingIds.concat(newIds);
    return `createTopic('p1-15', 'Postal Manual Volume VI', 'Paper I', [${existingIds.join(', ')}])`;
});

fs.writeFileSync(quizzesPath, quizzesContent);
console.log('Quizzes updated successfully with IDs: ' + newIds.join(', '));
