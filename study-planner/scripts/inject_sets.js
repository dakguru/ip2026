const fs = require('fs');
const path = require('path');

const quizzesFile = path.join(__dirname, '..', 'src', 'data', 'quizzes.ts');
let quizzesContent = fs.readFileSync(quizzesFile, 'utf8');

const match = [...quizzesContent.matchAll(/(\d+):\s*\[/g)];
const singleMatches = [...quizzesContent.matchAll(/(\d+):\s*[\w_]+/g)];
let maxId = 0;
for (const m of match) {
    const val = parseInt(m[1], 10);
    if (val > maxId) maxId = val;
}
for (const m of singleMatches) {
    const val = parseInt(m[1], 10);
    if (val > maxId) maxId = val;
}

const newIds = [maxId + 1, maxId + 2, maxId + 3];

const importStmt = `import { ccs_pension_2021_set1, ccs_pension_2021_set2, ccs_pension_2021_set3 } from './flashcards/ccsPension2021';\n`;
if (!quizzesContent.includes('ccsPension2021')) {
    quizzesContent = quizzesContent.replace('// ----- EXISTING QUESTION DATA -----', importStmt + '\n// ----- EXISTING QUESTION DATA -----');
}

const appendStr = `
  ${newIds[0]}: ccs_pension_2021_set1,
  ${newIds[1]}: ccs_pension_2021_set2,
  ${newIds[2]}: ccs_pension_2021_set3`;

quizzesContent = quizzesContent.replace(/};\s*\n\s*\/\/\s*--\s*HELPER to create topics easily/, "," + appendStr + "\n};\n\n// -- HELPER to create topics easily");

quizzesContent = quizzesContent.replace(/createTopic\('p3-8',\s*'CCS \(Pension\) Rules 2021',\s*'Paper III'\s*(?:,\s*\[\])?\)/, `createTopic('p3-8', 'CCS (Pension) Rules 2021', 'Paper III', [${newIds.join(', ')}])`);

fs.writeFileSync(quizzesFile, quizzesContent);

const psgbFile = path.join(__dirname, '..', 'src', 'data', 'psgbQuizzesData.ts');
let psgbContent = fs.readFileSync(psgbFile, 'utf8');
psgbContent = psgbContent.replace(/createTopic\('psgb-47',\s*"CCS \(Pension\) Rules, 2021",\s*'Paper II',\s*\[\]\)/, `createTopic('psgb-47', "CCS (Pension) Rules, 2021", 'Paper II', [${newIds.join(', ')}])`);
fs.writeFileSync(psgbFile, psgbContent);

console.log("Updated files with new MCQ IDs:", newIds);
