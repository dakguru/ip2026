const fs = require('fs');
const mcqsText = fs.readFileSync('d:/IP 2026/MCQs/MCQs_Vol_VII_Top_75.txt', 'utf8');

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
    if (/^Correct Answer:\s+/.test(trimmed)) {
        const ansChar = trimmed.replace(/^Correct Answer:\s+/, '')[0].toUpperCase();
        currentMCQ.a = ['A', 'B', 'C', 'D'].indexOf(ansChar);
        state = 'IN_ANS';
        continue;
    }
    if (/^Explanation:\s*/.test(trimmed)) {
        currentMCQ.e = trimmed.replace(/^Explanation:\s*/, '');
        state = 'IN_EXP';
        continue;
    }

    // Accumulate multi-line strings
    if (trimmed !== '') {
        if (trimmed.startsWith('=')) continue; // skip section headers
        if (trimmed.startsWith('TOPIC')) continue; // skip topic headers
        
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
            if (currentMCQ.e !== '') {
                currentMCQ.e += '\n' + trimmed;
            } else {
                currentMCQ.e = trimmed;
            }
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
    
    let chunkStr = `  // --- Postal Manual Volume VII Part ${newIds.length} ---\n`;
    chunkStr += `  ${setId}: [\n`;
    chunk.forEach(mcq => {
        const eStr = mcq.e ? mcq.e.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') : '';
        chunkStr += `    { q: ${JSON.stringify(mcq.q)}, o: ${JSON.stringify(mcq.o)}, a: ${mcq.a}, e: "Correct Answer: ${["A","B","C","D"][mcq.a]}\\n\\n${eStr}" },\n`;
    });
    chunkStr += `  ],\n`;
    chunks.push(chunkStr);
}

const newContent = chunks.join('\n');

// Replace ALL_SETS_DATA closing brace. We know the file ends properly now.
// Look for   ],
// };
quizzesContent = quizzesContent.replace(/ {2}\],\r?\n\};\r?\n/, `  ],\n\n${newContent}};\n`);

// Update createTopic for p1-16
quizzesContent = quizzesContent.replace(/createTopic\('p1-16', 'Postal Manual Volume VII', 'Paper I', \[[^\]]*\]\)/, `createTopic('p1-16', 'Postal Manual Volume VII', 'Paper I', [${newIds.join(', ')}])`);

fs.writeFileSync(quizzesPath, quizzesContent);
console.log('Quizzes updated successfully with IDs: ' + newIds.join(', '));
