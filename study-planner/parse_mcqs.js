
const fs = require('fs');

const filePath = 'D:/IP 2026/MCQs on Prevention of Money Laundering Act.txt';
const fileContent = fs.readFileSync(filePath, 'utf-8');

const lines = fileContent.split('\n');

const questions = [];
let currentQuestion = null;
let captureOptions = false;

// Regex
const qStartRegex = /^\*\*Q(\d+)\.\s+(.*)\*\*$/;
const optionRegex = /^([A-D])\.\s+(.*)$/;
const answerKeyRegex = /^\*\*Q(\d+):\s+([A-D])\s+.*$/;
const explanationRegex = /^\*\s+\*\*Concept:\*\*\s+(.*)$/;

// Parse Questions first
for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Check for Question Start
    // Note: The file format is **Q1. Question text**
    // But some might span lines or have slightly different format.
    // Based on the view_file, it looks consistent: **Q1. ...**

    // Sometimes the question text might be inside the ** ** but we need to capture it.
    let qMatch = line.match(/^\*\*Q(\d+)\.\s+(.*)\*\*$/);
    if (!qMatch) {
        // Try matching just the start if it spans
        qMatch = line.match(/^\*\*Q(\d+)\.\s+(.*)/);
        if (qMatch && line.endsWith('**')) {
            qMatch[2] = qMatch[2].substring(0, qMatch[2].length - 2);
        }
    }

    if (qMatch) {
        if (currentQuestion) {
            questions.push(currentQuestion);
        }
        currentQuestion = {
            id: parseInt(qMatch[1]),
            q: qMatch[2],
            o: [],
            a: 0, // default
            e: ""
        };
        captureOptions = true;
        continue;
    }

    if (currentQuestion && captureOptions) {
        let optMatch = line.match(/^([A-D])\.\s+(.*)$/);
        if (optMatch) {
            currentQuestion.o.push(optMatch[2]);
        } else if (line === '' && currentQuestion.o.length === 4) {
            // End of options usually
            captureOptions = false;
        }
        // Handles multiline options? The sample looks like single line options.
    }
}
// Push last question
if (currentQuestion) {
    questions.push(currentQuestion);
}

// Now parsing Answer Key
// The key is at the bottom, but also interleaved in parts?
// The file has "Part 1... Questions", then "Part 2...", "Part 3..."
// And at the end "MASTER ANSWER KEY (Questions 1–75)"
// I should rely on the Master Answer Key starting at line 468.

const answerKeyLines = lines.slice(460); // Start searching from approx line 460
let currentAnswerId = null;

for (let i = 0; i < answerKeyLines.length; i++) {
    let line = answerKeyLines[i].trim();

    // **Q1: C (1st July 2005)**
    let aMatch = line.match(/^\*\*Q(\d+):\s+([A-D])\s+.*$/);
    // Sometimes it might just be **Q1: C**
    if (!aMatch) aMatch = line.match(/^\*\*Q(\d+):\s+([A-D])/);

    if (aMatch) {
        const qId = parseInt(aMatch[1]);
        const ansChar = aMatch[2];
        const ansIndex = ansChar.charCodeAt(0) - 'A'.charCodeAt(0);

        currentAnswerId = qId;
        const q = questions.find(qu => qu.id === qId);
        if (q) {
            q.a = ansIndex;
        }
        continue;
    }

    // * **Concept:** ...
    // explanation
    if (currentAnswerId) {
        let eMatch = line.match(/^\*\s+\*\*Concept:\*\*\s+(.*)$/);
        if (eMatch) {
            const q = questions.find(qu => qu.id === currentAnswerId);
            if (q) {
                // If there's already an explanation, append? Usually one concept line.
                // Also check for "Elimination" lines and add them?
                q.e = eMatch[1];
            }
        }
        // Check for Elimination
        let elMatch = line.match(/^\*\s+\*\*Elimination:\*\*\s+(.*)$/);
        if (elMatch) {
            const q = questions.find(qu => qu.id === currentAnswerId);
            if (q && q.e) {
                q.e += " " + elMatch[1];
            }
        }
    }
}

// Output formatted for quizzes.ts
// Split into 3 sets: 1-25, 26-50, 51-75
const set1 = questions.filter(q => q.id >= 1 && q.id <= 25);
const set2 = questions.filter(q => q.id >= 26 && q.id <= 50);
const set3 = questions.filter(q => q.id >= 51 && q.id <= 75);

const formatSet = (set) => {
    return set.map(q => {
        // Escape quotes
        const qText = q.q.replace(/"/g, '\\"');
        const opts = q.o.map(o => `"${o.replace(/"/g, '\\"')}"`).join(', ');
        const exp = q.e ? `"${q.e.replace(/"/g, '\\"')}"` : `""`;
        return `    { q: "${qText}", o: [${opts}], a: ${q.a}, e: ${exp} },`;
    }).join('\n');
};


const output = `  12: [
${formatSet(set1)}
  ],
  13: [
${formatSet(set2)}
  ],
  14: [
${formatSet(set3)}
  ],`;

fs.writeFileSync('new_pmla_data.txt', output, 'utf8');
console.log('Done writing to new_pmla_data.txt');


