const fs = require('fs');
const path = require('path');

const mcqFile = 'D:\\IP 2026\\MCQs\\GFR_2017_103_MCQs.txt';
const flashcardsDir = path.join(__dirname, '..', 'src', 'data', 'flashcards');
const quizzesFile = path.join(__dirname, '..', 'src', 'data', 'quizzes.ts');
const psgbFile = path.join(__dirname, '..', 'src', 'data', 'psgbQuizzesData.ts');

const content = fs.readFileSync(mcqFile, 'utf8');
const blocks = content.split(/Q\d+\.\s+/);

let allMcqs = [];
for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    const lines = block.split(/\r?\n/);
    let qText = "";
    let lineIdx = 0;

    // Extract Question Text
    while (lineIdx < lines.length && !/^[A-D]\.\s+/.test(lines[lineIdx].trim())) {
        const line = lines[lineIdx].trim();
        if (line) {
            qText += (qText ? "\n" : "") + line;
        } else if (qText) {
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
            explanation += lines[lineIdx].trim().substring(12).trim();
            lineIdx++;
            break;
        }
        lineIdx++;
    }

    while (lineIdx < lines.length && !lines[lineIdx].trim().startsWith("---") && !lines[lineIdx].trim().startsWith("──") && !lines[lineIdx].trim().startsWith("════")) {
        const line = lines[lineIdx].trim();
        if (line) {
            explanation += (explanation ? " " : "") + line;
        }
        lineIdx++;
    }

    explanation = explanation.trim();

    const oArr = [optionsMap['A'] || '', optionsMap['B'] || '', optionsMap['C'] || '', optionsMap['D'] || ''];
    const aIndex = ['A', 'B', 'C', 'D'].indexOf(correctLetter);

    if (qText && oArr.every(x => x) && aIndex !== -1 && explanation) {
        allMcqs.push({
            q: qText,
            o: oArr,
            a: aIndex,
            e: explanation
        });
    }
}

// Chunks
const setSize = 25;
const setChunks = [];
for (let i = 0; i < allMcqs.length; i += setSize) {
    setChunks.push(allMcqs.slice(i, i + setSize));
}

// Cleanup quizzes.ts
let quizzesContent = fs.readFileSync(quizzesFile, 'utf8');

// Remove existing imports
quizzesContent = quizzesContent.replace(/import \{ gfr_non_proc_set\d+ \} from '\.\/flashcards\/gfrNonProcurement';\r?\n/g, '');

// Remove existing ALL_SETS_DATA injections
quizzesContent = quizzesContent.replace(/^\s*\d+:\s*gfr_non_proc_set\d+,\r?\n/gm, '');

const m = quizzesContent.match(/(\d+):\s*([a-zA-Z0-9_]+|\[)/g);
let maxId = 0;
if (m) {
    for (const matchStr of m) {
        const num = parseInt(matchStr.match(/\d+/)[0]);
        if (num > maxId) maxId = num;
    }
}

let currentId = maxId + 1;
const setIds = [];
const imports = [];
const exportLines = [];
let ALL_SETS_INJECTIONS = "";

for (let i = 0; i < setChunks.length; i++) {
    const id = currentId++;
    setIds.push(id);
    const varName = `gfr_non_proc_set${i + 1}`;
    imports.push(`import { ${varName} } from './flashcards/gfrNonProcurement';`);
    exportLines.push(`export const ${varName}: QuizItem[] = ${JSON.stringify(setChunks[i], null, 4)};`);
    ALL_SETS_INJECTIONS += `  ${id}: ${varName},\n`;
}

// Write flashcards file
const outputJS = `import { RawQuestion as QuizItem } from '../quizzes';\n\n// GFR 2017 Non Procurement MCQs (103 edition)\n${exportLines.join('\n')}\n`;
fs.writeFileSync(path.join(flashcardsDir, 'gfrNonProcurement.ts'), outputJS);

// Modify quizzes.ts
// Add imports
quizzesContent = quizzesContent.replace(/import { QuizTopic, QuizSet } from "@\/lib\/quizTypes";/, `import { QuizTopic, QuizSet } from "@/lib/quizTypes";\n${imports.join('\n')}`);
// Inject into ALL_SETS_DATA
quizzesContent = quizzesContent.replace(/export const ALL_SETS_DATA: Record<number, any\[\]> = \{/, `export const ALL_SETS_DATA: Record<number, any[]> = {\n${ALL_SETS_INJECTIONS}`);

fs.writeFileSync(quizzesFile, quizzesContent);

// Modify psgbQuizzesData.ts
let psgbContent = fs.readFileSync(psgbFile, 'utf8');
// Find the exact line for psgb-63 and replace its array
psgbContent = psgbContent.replace(
    /(createTopic\('psgb-63', "General Financial Rules 2017 other than public procurement", 'Paper II', )\[[^\]]*\]/,
    `$1[${setIds.join(', ')}]`
);
fs.writeFileSync(psgbFile, psgbContent);

console.log("Reintegrated " + allMcqs.length + " questions into " + setChunks.length + " sets. Assigned IDs: " + setIds.join(', '));
