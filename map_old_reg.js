const fs = require('fs');
const tsPath = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let code = fs.readFileSync(tsPath, 'utf8');

const startIndex = code.indexOf('86: [');
let endIndex = code.indexOf('93: [');
if (endIndex === -1) endIndex = code.indexOf('],', code.lastIndexOf('92: [')) + 2;

const block = code.substring(startIndex, endIndex);

const items = [];
let m;
const regex = /\{(?:[^{}]|{[^}]*})*\}/g;
while ((m = regex.exec(block)) !== null) {
  let str = m[0];
  let rm = str.match(/Regulation \d+[A-Z]?/g);
  if (rm) {
    items.push({
      regs: [...new Set(rm)],
      text: str
    });
  }
}

fs.writeFileSync('d:/IP 2026/regs_to_fix.json', JSON.stringify(items, null, 2));
console.log('Saved ' + items.length + ' questions with Regulation mentions.');
