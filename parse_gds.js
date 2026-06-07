const fs = require('fs');
const filepath = 'D:\\IP 2026\\MCQs\\GDS Rulings.txt';
const tsPath = 'D:\\IP 2026\\study-planner\\src\\data\\quizzes.ts';

const raw = fs.readFileSync(filepath, 'utf8');

const qs = [];
const chunks = raw.split(/Q\d+\.\s+/).filter(c => c.trim().length > 10);

for (let i = 0; i < chunks.length; i++) {
  let chunk = chunks[i];
  
  let correctIdx = chunk.lastIndexOf('Correct Answer:');
  if (correctIdx === -1) {
    console.log(`Failed at Q${i+1}: Cannot find Correct Answer.`);
    continue;
  }
  
  let exPl = chunk.substring(correctIdx).match(/Correct Answer:\s*([A-D])\s*Explanation:\s*([\s\S]*)/i);
  if (!exPl) {
      console.log(`Failed at Q${i+1}: Cannot parse correct answer/explanation.`);
      continue;
  }
  
  let ansStr = exPl[1].trim().toUpperCase();
  let ansNum = ansStr === 'A' ? 0 : ansStr === 'B' ? 1 : ansStr === 'C' ? 2 : 3;
  let explanationStr = exPl[2].trim().replace(/\r\n/g, '\n');
  
  let closureIdx = explanationStr.indexOf('✅ Part');
  if (closureIdx !== -1) {
      explanationStr = explanationStr.substring(0, closureIdx).trim();
  }
  let lineIdx = explanationStr.indexOf('═══════════════════════════════════════════');
  if (lineIdx !== -1) {
      explanationStr = explanationStr.substring(0, lineIdx).trim();
  }
  
  let explanation = `Correct Answer: ${ansStr}\n\n${explanationStr}`.trim();

  let textBeforeCorrect = chunk.substring(0, correctIdx);
  let idxA = textBeforeCorrect.lastIndexOf('\nA. ');
  if (idxA === -1) idxA = textBeforeCorrect.lastIndexOf('A. '); // fallback
  let idxB = textBeforeCorrect.lastIndexOf('\nB. ');
  if (idxB === -1) idxB = textBeforeCorrect.lastIndexOf('B. ');
  let idxC = textBeforeCorrect.lastIndexOf('\nC. ');
  if (idxC === -1) idxC = textBeforeCorrect.lastIndexOf('C. ');
  let idxD = textBeforeCorrect.lastIndexOf('\nD. ');
  if (idxD === -1) idxD = textBeforeCorrect.lastIndexOf('D. ');

  if (idxA === -1 || idxB === -1 || idxC === -1 || idxD === -1) {
    console.log(`Failed at Q${i+1}: Missing option marker A, B, C or D.`);
    continue;
  }

  let qText = textBeforeCorrect.substring(0, idxA).trim().replace(/\r\n/g, '\n');
  
  let optAStr = textBeforeCorrect.substring(idxA, idxB);
  let optA = optAStr.substring(optAStr.indexOf('A. ') + 3).trim();

  let optBStr = textBeforeCorrect.substring(idxB, idxC);
  let optB = optBStr.substring(optBStr.indexOf('B. ') + 3).trim();

  let optCStr = textBeforeCorrect.substring(idxC, idxD);
  let optC = optCStr.substring(optCStr.indexOf('C. ') + 3).trim();

  let optD = textBeforeCorrect.substring(idxD + 3).trim();

  qs.push({
    q: qText,
    o: [optA, optB, optC, optD],
    a: ansNum,
    e: explanation
  });
}

console.log(`Successfully parsed ${qs.length} questions.`);

let code = fs.readFileSync(tsPath, 'utf8');

// Find the start of `export interface RawQuestion`
let rawQuestionIdx = code.indexOf('export interface RawQuestion');
if (rawQuestionIdx === -1) {
    console.log("Cannot find export interface RawQuestion");
    process.exit(1);
}
let insertIdx = code.lastIndexOf('};', rawQuestionIdx);
if (insertIdx === -1) {
    console.log("Cannot find end of ALL_SETS_DATA");
    process.exit(1);
}

let newBlocks = '';
let currentBlock = 355;
let usedBlocks = [];

for (let i = 0; i < qs.length; i += 25) {
    let chunkQs = qs.slice(i, i + 25);
    newBlocks += `\n  // --- GDS Rulings Part ${Math.floor(i/25)+1} ---\n`;
    newBlocks += `  ${currentBlock}: [\n`;
    usedBlocks.push(currentBlock);
    for (let q of chunkQs) {
        let qStr = JSON.stringify(q.q);
        let o0 = JSON.stringify(q.o[0]);
        let o1 = JSON.stringify(q.o[1]);
        let o2 = JSON.stringify(q.o[2]);
        let o3 = JSON.stringify(q.o[3]);
        let eStr = JSON.stringify(q.e);
        newBlocks += `    { q: ${qStr}, o: [${o0}, ${o1}, ${o2}, ${o3}], a: ${q.a}, e: ${eStr} },\n`;
    }
    newBlocks += `  ],\n`;
    currentBlock++;
}

code = code.substring(0, insertIdx) + newBlocks + code.substring(insertIdx);

let topicMatch = `createTopic('p1-34', 'GDS Rulings', 'Paper I'),`;
let newTopicMatch = `createTopic('p1-34', 'GDS Rulings', 'Paper I', [${usedBlocks.join(', ')}]),`;

if (code.includes(topicMatch)) {
    code = code.replace(topicMatch, newTopicMatch);
} else {
    console.log("Could not find createTopic for GDS Rulings to replace.");
}

fs.writeFileSync(tsPath, code);
console.log('Quizzes updated successfully in file!');
