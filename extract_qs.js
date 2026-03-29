const fs = require('fs');
const tsPath = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let code = fs.readFileSync(tsPath, 'utf8');

// Find where "The Post Office Regulations, 2024" is.
const topicKeyword = "'The Post Office Regulations, 2024'";
let qArrayStart = code.lastIndexOf('[', code.indexOf(topicKeyword));
// actually it's inside an object:
// createTopic('...', 'The Post Office Regulations, 2024', 'Paper I', [
//    { id: 1, ... }
// ])

const regex = /createTopic\([^,]+,\s*'The Post Office Regulations, 2024',\s*'[^']+',\s*(\[[\s\S]*?\])\s*\)/;
const match = code.match(regex);

if (match) {
    fs.writeFileSync('d:/IP 2026/po_reg_questions.json', match[1]);
    console.log("Extracted to d:/IP 2026/po_reg_questions.json");
} else {
    console.log("Not found with exact regex. Trying fallback...");
    // maybe it is declared elsewhere?
    const idx = code.indexOf("'The Post Office Regulations, 2024'");
    console.log("Index of topic title: ", idx);
}
