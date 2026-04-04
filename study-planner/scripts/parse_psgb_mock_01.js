import fs from 'fs';
import path from 'path';

const filePath = "D:\\IP 2026\\PS Gr B - Weekly Mock Test Series\\PS Gr B - Weekly Mock Test 01.txt";
const content = fs.readFileSync(filePath, 'utf-8');

const questions = [];
const qRegex = /Q(\d+)\.\s+\((.*?)\)\s+\[Difficulty:\s+(.*?)\]\r?\n(.*?)\r?\nA\.\s+(.*?)\r?\nB\.\s+(.*?)\r?\nC\.\s+(.*?)\r?\nD\.\s+(.*?)\r?\n\r?\nAnswer:\s+([A-D])\r?\n\r?\nExplanation:\r?\n(.*?)(?=\n\r?\nQ\d+\.|$)/gs;

let match;
while ((match = qRegex.exec(content)) !== null) {
    const [_, qNo, topic, difficulty, questionText, oA, oB, oC, oD, answer, explanation] = match;
    questions.push({
        id: parseInt(qNo),
        question: questionText.trim().replace(/\r?\n/g, ' '),
        options: [oA.trim(), oB.trim(), oC.trim(), oD.trim()],
        answer: ['A', 'B', 'C', 'D'].indexOf(answer),
        explanation: explanation.trim().replace(/\r?\n/g, ' '),
        topic: topic.trim(),
        difficulty: difficulty.trim()
    });
}

console.log(`Extracted ${questions.length} questions.`);

const outputContent = `export const PSGB_MOCK_01_QUESTIONS = ${JSON.stringify(questions, null, 4)};`;
fs.writeFileSync('d:\\IP 2026\\study-planner\\src\\data\\psgb_mock_data_01.ts', outputContent);
