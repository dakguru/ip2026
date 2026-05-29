const fs = require('fs');
const path = require('path');

const filePath = "D:\\IP 2026\\LDCE IP Mock Test Series II\\S2 - 01.txt";
const content = fs.readFileSync(filePath, 'utf-8');

// Normalize line endings
const normalizedContent = content.replace(/\r\n/g, '\n');

// Split content by Q followed by number and dot/parenthesis, but keep the Q
// We can find all indexes of questions
const qPositions = [];
const qRegex = /\n(Q\d+[\.\)])/g;
let match;
while ((match = qRegex.exec('\n' + normalizedContent)) !== null) {
    qPositions.push(match.index);
}

const questions = [];

for (let i = 0; i < qPositions.length; i++) {
    const start = qPositions[i];
    const end = (i + 1 < qPositions.length) ? qPositions[i + 1] : normalizedContent.length;
    const qBlock = ('\n' + normalizedContent).substring(start, end).trim();
    
    // Parse the block
    // It should have:
    // Q<Num>. <Question Text>
    // A. or A) <Option A>
    // B. or B) <Option B>
    // C. or C) <Option C>
    // D. or D) <Option D>
    // Answer: <Ans>
    // Explanation: <Expl>
    
    const lines = qBlock.split('\n');
    const qHeaderMatch = lines[0].match(/^Q(\d+)[\.\)]\s*(.*)$/);
    if (!qHeaderMatch) {
        console.error("Failed to parse header for block:", qBlock);
        continue;
    }
    const qNum = qHeaderMatch[1];
    let qText = qHeaderMatch[2];
    
    let lineIdx = 1;
    // Question text might span multiple lines until we see option A
    while (lineIdx < lines.length && !lines[lineIdx].trim().match(/^[A][\.\)]/)) {
        qText += '\n' + lines[lineIdx];
        lineIdx++;
    }
    
    // Now extract options A, B, C, D
    let oA = '', oB = '', oC = '', oD = '';
    
    if (lineIdx < lines.length && lines[lineIdx].trim().match(/^[A][\.\)]/)) {
        oA = lines[lineIdx].trim().replace(/^[A][\.\)]\s*/, '');
        lineIdx++;
        while (lineIdx < lines.length && !lines[lineIdx].trim().match(/^[B][\.\)]/)) {
            oA += '\n' + lines[lineIdx];
            lineIdx++;
        }
    }
    
    if (lineIdx < lines.length && lines[lineIdx].trim().match(/^[B][\.\)]/)) {
        oB = lines[lineIdx].trim().replace(/^[B][\.\)]\s*/, '');
        lineIdx++;
        while (lineIdx < lines.length && !lines[lineIdx].trim().match(/^[C][\.\)]/)) {
            oB += '\n' + lines[lineIdx];
            lineIdx++;
        }
    }
    
    if (lineIdx < lines.length && lines[lineIdx].trim().match(/^[C][\.\)]/)) {
        oC = lines[lineIdx].trim().replace(/^[C][\.\)]\s*/, '');
        lineIdx++;
        while (lineIdx < lines.length && !lines[lineIdx].trim().match(/^[D][\.\)]/)) {
            oC += '\n' + lines[lineIdx];
            lineIdx++;
        }
    }
    
    if (lineIdx < lines.length && lines[lineIdx].trim().match(/^[D][\.\)]/)) {
        oD = lines[lineIdx].trim().replace(/^[D][\.\)]\s*/, '');
        lineIdx++;
        while (lineIdx < lines.length && !lines[lineIdx].trim().startsWith('Answer:')) {
            oD += '\n' + lines[lineIdx];
            lineIdx++;
        }
    }
    
    let answerText = '';
    if (lineIdx < lines.length && lines[lineIdx].trim().startsWith('Answer:')) {
        answerText = lines[lineIdx].trim().replace(/^Answer:\s*/, '').trim();
        lineIdx++;
    }
    
    let explanationText = '';
    if (lineIdx < lines.length && lines[lineIdx].trim().startsWith('Explanation:')) {
        explanationText = lines[lineIdx].trim().replace(/^Explanation:\s*/, '');
        lineIdx++;
        while (lineIdx < lines.length) {
            explanationText += '\n' + lines[lineIdx];
            lineIdx++;
        }
    }
    
    // Map answer letter to number index
    let correctAnswer = -1;
    if (answerText.startsWith('A')) correctAnswer = 0;
    else if (answerText.startsWith('B')) correctAnswer = 1;
    else if (answerText.startsWith('C')) correctAnswer = 2;
    else if (answerText.startsWith('D')) correctAnswer = 3;
    
    questions.push({
        id: `mock-s2-01-${qNum}`,
        text: qText.trim(),
        options: [oA.trim(), oB.trim(), oC.trim(), oD.trim()],
        correctAnswer: correctAnswer,
        explanation: explanationText.trim()
    });
}

console.log(`Successfully parsed ${questions.length} questions.`);

// Let's verify correctness of options and answers
let errors = 0;
questions.forEach((q, idx) => {
    if (q.correctAnswer === -1) {
        console.error(`Error: Q${idx+1} has invalid correctAnswer:`, q);
        errors++;
    }
    if (q.options.some(o => !o)) {
        console.error(`Error: Q${idx+1} has empty options:`, q);
        errors++;
    }
});

if (errors === 0) {
    const outputContent = `import { Question } from "./live_mock_data";

export const WEEKLY_MOCK_S2_01_QUESTIONS: Question[] = ${JSON.stringify(questions, null, 4)};
`;
    fs.writeFileSync('D:\\IP 2026\\study-planner\\src\\data\\weekly_mock_data_s2_01.ts', outputContent);
    console.log("Written output to src/data/weekly_mock_data_s2_01.ts");
} else {
    console.error(`Failed to write output due to ${errors} validation errors.`);
}
