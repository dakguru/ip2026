const fs = require('fs');
const targetFile = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let targetContent = fs.readFileSync(targetFile, 'utf8');

const newContent = fs.readFileSync('d:/IP 2026/tmp_mcqs_formatted.txt', 'utf8');

targetContent = targetContent.replace(/\s*\]\s*\};\s*export interface/, `],\n${newContent}};\n\nexport interface`);

fs.writeFileSync(targetFile, targetContent);
console.log('Quizzes updated successfully.');
