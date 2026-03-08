const fs = require('fs');

const quizzesFile = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let quizzesContent = fs.readFileSync(quizzesFile, 'utf8');

const newContent = fs.readFileSync('d:/IP 2026/tmp_mcqs_formatted_fhb2.txt', 'utf8');

// Append new sets to `export const quizzes = { ... }`
quizzesContent = quizzesContent.replace(/\s*\]\s*\};\s*export interface RawQuestion/, `],\n${newContent}};\n\nexport interface RawQuestion`);

// Update p3-28 to P&T FHB Volume I & II in quizzes.ts (if it exists)
if (quizzesContent.includes("createTopic('p3-28', 'P&T FHB Volume I', 'Paper III', [141, 142, 143, 144, 145])")) {
    quizzesContent = quizzesContent.replace(
        "createTopic('p3-28', 'P&T FHB Volume I', 'Paper III', [141, 142, 143, 144, 145])",
        "createTopic('p3-28', 'P&T FHB Volume I & II', 'Paper III', [141, 142, 143, 144, 145, 146, 147])"
    );
}

fs.writeFileSync(quizzesFile, quizzesContent);

const psgbFile = 'd:/IP 2026/study-planner/src/data/psgbQuizzesData.ts';
let psgbContent = fs.readFileSync(psgbFile, 'utf8');

if (psgbContent.includes("createTopic('psgb-62', \"Postal Financial Handbook Volume I and II\", 'Paper II', [141, 142, 143, 144, 145])")) {
    psgbContent = psgbContent.replace(
        "createTopic('psgb-62', \"Postal Financial Handbook Volume I and II\", 'Paper II', [141, 142, 143, 144, 145])",
        "createTopic('psgb-62', \"Postal Financial Handbook Volume I and II\", 'Paper II', [141, 142, 143, 144, 145, 146, 147])"
    );
}

fs.writeFileSync(psgbFile, psgbContent);

console.log('Quizzes updated successfully for FHB Vol 2.');
