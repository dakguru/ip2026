const fs = require('fs');
const text = fs.readFileSync('D:\\IP 2026\\MCQs\\SMALL SAVINGS SCHEMES.txt', 'utf8');

const questions = [];
let currentQ = null;
const lines = text.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  if (line.match(/^Q\d+\./)) {
    if (currentQ) questions.push(currentQ);
    currentQ = { q: line.replace(/^Q\d+\.\s*/, '').trim(), options: [], a: -1, e: '' };
    
    let j = i + 1;
    while (j < lines.length && !lines[j].trim().match(/^[A-D]\./) && !lines[j].trim().match(/^Q\d+\./)) {
      if (lines[j].trim() && !lines[j].includes('====') && !lines[j].match(/^PART /)) {
        currentQ.q += '\n' + lines[j].trim();
      }
      j++;
    }
    i = j - 1;
  } else if (currentQ && line.match(/^[A-D]\./)) {
    currentQ.options.push(line.replace(/^[A-D]\.\s*/, '').trim());
  } else if (currentQ && line.match(/^Correct Answer:\s*([A-D])/)) {
    const match = line.match(/^Correct Answer:\s*([A-D])/);
    currentQ.a = match[1].charCodeAt(0) - 65;
  } else if (currentQ && line.match(/^Explanation:\s*(.*)/)) {
    currentQ.e = line.match(/^Explanation:\s*(.*)/)[1].trim();
    let j = i + 1;
    while (j < lines.length && !lines[j].trim().match(/^Q\d+\./)) {
      if (lines[j].trim() && !lines[j].includes('====') && !lines[j].includes('═') && !lines[j].includes('PART ') && !lines[j].includes('⏸ Continued') && !lines[j].includes('####')) {
        currentQ.e += ' ' + lines[j].trim();
      } else if (lines[j].trim() && (lines[j].includes('═') || lines[j].includes('PART ') || lines[j].includes('⏸ Continued'))) {
        break; // Stop on section headers
      }
      j++;
    }
    i = j - 1;
  }
}
if (currentQ) questions.push(currentQ);

const validQuestions = questions.filter(q => q.q && q.options.length > 0 && q.a >= 0);
console.log('Parsed ' + validQuestions.length + ' valid questions out of ' + questions.length + ' total.');

function escapeStr(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function formatQ(q) {
  const oStr = q.options.map(o => `"${escapeStr(o)}"`).join(', ');
  return `    { q: "${escapeStr(q.q)}", o: [${oStr}], a: ${q.a}, e: "${escapeStr(q.e)}" }`;
}

const chunkSize = Math.ceil(validQuestions.length / 3);
const set37 = validQuestions.slice(0, chunkSize);
const set38 = validQuestions.slice(chunkSize, chunkSize * 2);
const set39 = validQuestions.slice(chunkSize * 2);

let out = '  // === SET 37: Small Savings Scheme, 2019 (Part 1) ===\n  37: [\n';
out += set37.map(formatQ).join(',\n');
out += '\n  ],\n\n  // === SET 38: Small Savings Scheme, 2019 (Part 2) ===\n  38: [\n';
out += set38.map(formatQ).join(',\n');
out += '\n  ],\n\n  // === SET 39: Small Savings Scheme, 2019 (Part 3) ===\n  39: [\n';
out += set39.map(formatQ).join(',\n');
out += '\n  ],';

const targetFile = 'd:\\IP 2026\\study-planner\\src\\data\\quizzes.ts';
let content = fs.readFileSync(targetFile, 'utf8');

const regex = /\/\/ === SET 37: Small Savings Scheme, 2019 \(Part 1\) ===[\s\S]*?\/\/ === SET 40: IT Act 2000 \(Part 1\) ===/m;
content = content.replace(regex, out + '\n\n  // === SET 40: IT Act 2000 (Part 1) ===');

fs.writeFileSync(targetFile, content);
console.log('Successfully updated quizzes.ts');
