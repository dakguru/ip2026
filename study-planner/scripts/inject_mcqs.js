const fs = require('fs');
const path = require('path');

const mcqFiles = [
    'artifacts/ccs_pension_rules_2021_mcqs.md',
    'artifacts/ccs_pension_rules_2021_mcqs_part2.md',
    'artifacts/ccs_pension_rules_2021_mcqs_part3.md'
];

let allMcqs = [];

for (const file of mcqFiles) {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, 'utf8');

    // Split by "Q" followed by number
    const blocks = content.split(/Q\d+\.\s+/);

    for (let i = 1; i < blocks.length; i++) {
        const block = blocks[i].trim();
        if (!block) continue;

        // Extract question
        const lines = block.split(/\r?\n/);

        // Extract Question Text
        let qText = "";
        let lineIdx = 0;

        // Collect lines until we hit option A. or a line that clearly starts with A.
        while (lineIdx < lines.length && !/^[A-D]\.\s+/.test(lines[lineIdx].trim())) {
            const line = lines[lineIdx].trim();
            if (line) {
                qText += (qText ? "\n" : "") + line;
            } else if (qText) {
                // If there's an empty line within the question, add it as a newline
                qText += "\n";
            }
            lineIdx++;
        }

        qText = qText.trim();

        // Extract Options
        const optionsMap = {};
        while (lineIdx < lines.length && /^[A-D]\.\s+/.test(lines[lineIdx].trim())) {
            const optLine = lines[lineIdx].trim();
            const letter = optLine.charAt(0);
            const optText = optLine.substring(3).trim();
            optionsMap[letter] = optText;
            lineIdx++;
        }

        // Extract Correct Answer
        let correctLetter = "";
        while (lineIdx < lines.length) {
            const ansMatch = lines[lineIdx].match(/Correct Answer:\s*([A-D])/);
            if (ansMatch) {
                correctLetter = ansMatch[1];
                lineIdx++;
                break;
            }
            lineIdx++;
        }

        // Extract Explanation
        let explanation = "";
        while (lineIdx < lines.length) {
            if (lines[lineIdx].trim().startsWith("Explanation:")) {
                lineIdx++;
                break;
            }
            lineIdx++;
        }

        while (lineIdx < lines.length && !lines[lineIdx].trim().startsWith("---")) {
            const line = lines[lineIdx].trim();
            if (line) {
                explanation += (explanation ? "\n" : "") + line;
            }
            lineIdx++;
        }

        explanation = explanation.trim();

        // Finalize Format
        const oArr = [optionsMap['A'], optionsMap['B'], optionsMap['C'], optionsMap['D']];
        const aIndex = ['A', 'B', 'C', 'D'].indexOf(correctLetter);

        // Map to RawQuestion format
        if (qText && oArr.every(x => x) && aIndex !== -1 && explanation) {
            allMcqs.push({
                q: qText,
                o: oArr,
                a: aIndex,
                e: explanation
            });
        }
    }
}

// Slice them into 3 sets of 25 (or adjust depending on typical quiz sizes)
const setSize = 25;
const setChunks = [];
for (let i = 0; i < allMcqs.length; i += setSize) {
    setChunks.push(allMcqs.slice(i, i + setSize));
}

// Write to a new file in data or just append
const outputJS = `import { RawQuestion as QuizItem } from '../quizzes';

// Generated CCS Pension Rules MCQs
export const ccs_pension_2021_set1: QuizItem[] = ${JSON.stringify(setChunks[0] || [], null, 4)};
export const ccs_pension_2021_set2: QuizItem[] = ${JSON.stringify(setChunks[1] || [], null, 4)};
export const ccs_pension_2021_set3: QuizItem[] = ${JSON.stringify(setChunks[2] || [], null, 4)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'flashcards', 'ccsPension2021.ts');
fs.writeFileSync(outputPath, outputJS);

console.log("Successfully parsed " + allMcqs.length + " MCQs and wrote to " + outputPath);
