const fs = require('fs');

const qFile = 'D:\\IP 2026\\study-planner\\src\\data\\quizzes.ts';
let qContent = fs.readFileSync(qFile, 'utf8');

// Replace 359-374 with 368-383 for gfr_non_proc
for (let i = 1; i <= 16; i++) {
    const oldId = 358 + i;
    const newId = 367 + i;
    qContent = qContent.replace(new RegExp(`\\b${oldId}: gfr_non_proc_set${i},`), `${newId}: gfr_non_proc_set${i},`);
}
fs.writeFileSync(qFile, qContent);

const pFile = 'D:\\IP 2026\\study-planner\\src\\data\\psgbQuizzesData.ts';
let pContent = fs.readFileSync(pFile, 'utf8');

// Replace the array for psgb-63
const oldIds = Array.from({length: 16}, (_, i) => 359 + i).join(', ');
const newIds = Array.from({length: 16}, (_, i) => 368 + i).join(', ');
pContent = pContent.replace(
    `createTopic('psgb-63', "General Financial Rules 2017 other than public procurement", 'Paper II', [${oldIds}])`,
    `createTopic('psgb-63', "General Financial Rules 2017 other than public procurement", 'Paper II', [${newIds}])`
);
fs.writeFileSync(pFile, pContent);
console.log("Fixed IDs.");
