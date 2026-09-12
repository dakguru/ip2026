import fs from 'fs';
import path from 'path';

function parseFile(filePath, prefix, setId, testId, title, desc) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    let questions = [];
    let currentQuestion = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        if (line.match(/^Q\d+\./)) {
            if (currentQuestion) {
                questions.push(currentQuestion);
            }
            currentQuestion = {
                id: `${prefix}_q${questions.length + 1}`,
                text: line,
                options: [],
                correctAnswer: 0,
                explanation: ""
            };
        } else if (line.match(/^[A-D]\./)) {
            currentQuestion.options.push(line.replace(/^[A-D]\.\s*/, ''));
        } else if (line.startsWith('Answer:')) {
            const ansChar = line.replace('Answer:', '').trim();
            currentQuestion.correctAnswer = ansChar.charCodeAt(0) - 65;
        } else if (line.startsWith('Explanation:')) {
            currentQuestion.explanation = line.replace('Explanation:', '').trim();
        } else {
            // Append to either explanation or text depending on state
            if (currentQuestion) {
                if (currentQuestion.explanation !== "") {
                    currentQuestion.explanation += '\n' + line;
                } else if (currentQuestion.options.length > 0) {
                    // Ignore stray lines between options and answer
                } else {
                    currentQuestion.text += '\n' + line;
                }
            }
        }
    }
    if (currentQuestion) {
        questions.push(currentQuestion);
    }

    const tsCode = `import { Question } from "@/types/quiz";\n\nexport const ${prefix.toUpperCase()}_QUESTIONS: Question[] = ${JSON.stringify(questions, null, 4)};\n`;
    
    const outputFilename = `src/data/${prefix}_questions.ts`;
    fs.writeFileSync(path.join(process.cwd(), outputFilename), tsCode);
    console.log(`Generated ${outputFilename} with ${questions.length} questions`);
}

const inputDir = 'D:\\IP 2026\\LDCE IP Mock Test Series II\\Paper III';

for (let i = 1; i <= 5; i++) {
    const filename = `Set - ${i}.txt`;
    const filePath = path.join(inputDir, filename);
    const prefix = `fl_paper3_set_${i}`;
    const testId = `fl-p3-set${i}`;
    parseFile(filePath, prefix, i, testId, `Full Length Mock Test - Paper III - Set ${i}`, `Paper III Set ${i} Mock Test`);
}
