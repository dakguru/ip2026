const fs = require('fs');
const filepath = 'D:\\IP 2026\\The Post Office Regulations, 2024 - New MCQs Set.txt';
const tsPath = 'D:\\IP 2026\\study-planner\\src\\data\\quizzes.ts';

const raw = fs.readFileSync(filepath, 'utf8');

// Split the file using "Q1.", "Q2.", etc.
const qs = [];
const chunks = raw.split(/Q\d+\.\s+/).filter(c => c.trim().length > 10);

if (chunks.length !== 175) {
  console.log("Error: Found " + chunks.length + " chunks instead of 175.");
}

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
  let explanation = exPl[2].trim().replace(/\r\n/g, '\n');
  
  let textBeforeCorrect = chunk.substring(0, correctIdx);
  let idxA = textBeforeCorrect.lastIndexOf('\nA. ');
  if (idxA === -1) idxA = textBeforeCorrect.lastIndexOf('A. '); // fallback
  let idxB = textBeforeCorrect.lastIndexOf('B. ');
  let idxC = textBeforeCorrect.lastIndexOf('C. ');
  let idxD = textBeforeCorrect.lastIndexOf('D. ');

  if (idxA === -1 || idxB === -1 || idxC === -1 || idxD === -1) {
    console.log(`Failed at Q${i+1}: Missing option marker A, B, C or D.`);
    continue;
  }

  let qText = textBeforeCorrect.substring(0, idxA).trim().replace(/\r\n/g, '\n');
  
  // Safe extraction of options
  let optAStr = textBeforeCorrect.substring(idxA, idxB);
  let optA = optAStr.substring(optAStr.indexOf('A. ') + 3).trim();

  let optBStr = textBeforeCorrect.substring(idxB, idxC);
  let optB = optBStr.substring(optBStr.indexOf('B. ') + 3).trim();

  let optCStr = textBeforeCorrect.substring(idxC, idxD);
  let optC = optCStr.substring(optCStr.indexOf('C. ') + 3).trim();

  let optD = textBeforeCorrect.substring(idxD + 3).trim();

  // FIX FOR LIST I AND LIST II TABLES
  let lines = qText.split('\n');
  let list1Idx = -1;
  let list2Idx = -1;
  for (let j = 0; j < lines.length; j++) {
      if (lines[j].trim() === 'List I') list1Idx = j;
      if (lines[j].trim() === 'List II' || lines[j].trim() === 'List  II') list2Idx = j;
  }

  if (list1Idx !== -1 && list2Idx !== -1 && list1Idx < list2Idx) {
      let beforeList = lines.slice(0, list1Idx).join('\n').trim();
      let items1 = lines.slice(list1Idx + 1, list2Idx).map(x=>x.trim()).filter(x=>x.length>0);
      let items2 = lines.slice(list2Idx + 1).map(x=>x.trim()).filter(x=>x.length>0);

      let table = `| Column I | Column II |\n| --- | --- |\n`;
      let max = Math.max(items1.length, items2.length);
      for(let j=0; j<max; j++) {
          let col1 = items1[j] ? items1[j].replace(/\|/g, '\\|') : '';
          let col2 = items2[j] ? items2[j].replace(/\|/g, '\\|') : '';
          table += `| ${col1} | ${col2} |\n`;
      }
      qText = beforeList + '\n\n' + table;
  }

  qs.push({
    q: qText,
    o: [optA, optB, optC, optD],
    a: ansNum,
    e: explanation
  });
}

console.log(`Successfully parsed ${qs.length} questions.`);

// Now let's inject them into quizzes.ts
let code = fs.readFileSync(tsPath, 'utf8');

const startIndex = code.indexOf('86: [');
let endIndex = code.indexOf('93: [');
if (endIndex === -1) {
    endIndex = code.indexOf('],', code.lastIndexOf('92: [')) + 2;
}

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find blocks 86-92 in quizzes.ts");
    process.exit(1);
}

// Generate the new blocks string
let newBlocks = '';
let currentBlock = 86;
for (let i = 0; i < qs.length; i += 25) {
    let chunkQs = qs.slice(i, i + 25);
    newBlocks += `  ${currentBlock}: [\n`;
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

code = code.substring(0, startIndex) + newBlocks + code.substring(endIndex);

fs.writeFileSync(tsPath, code);

console.log('Quizzes updated successfully in file!');
