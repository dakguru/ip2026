const fs = require('fs');

const fileBuffer = fs.readFileSync('D:\\IP 2026\\LDCE IP Mock Test - 12.txt');
const content = fileBuffer.toString('utf8');

// The file has a mix of line breaks and Q\d+. on same line.
// Let's first replace all line breaks with spaces to make it easier to regex from a single block
const singleLineContent = content.replace(/\r?\n|\r/g, ' ');

// Split by Q\d+.
const questionBlocks = singleLineContent.split(/Q\d+\./);
if (questionBlocks[0].trim() === "") questionBlocks.shift();

const questions = [];

questionBlocks.forEach((block, index) => {
    block = block.trim();
    if (!block) return;

    const qNum = index + 1;
    
    // Extract metadata
    const metadataMatch = block.match(/^\((.*?)\)\s*\[Difficulty:\s*(.*?)\]/);
    let workingText = block;
    if (metadataMatch) {
       workingText = block.substring(metadataMatch[0].length).trim();
    }

    // Identify indices of A., B., C., D., Answer:, Explanation:
    const aIdx = workingText.indexOf('A. ');
    const bIdx = workingText.indexOf('B. ');
    const cIdx = workingText.indexOf('C. ');
    const dIdx = workingText.indexOf('D. ');
    const ansIdx = workingText.indexOf('Answer:');
    const expIdx = workingText.indexOf('Explanation:');

    if (aIdx === -1) return; // Not a valid question block

    const questionText = workingText.substring(0, aIdx).trim();
    const optA = workingText.substring(aIdx + 3, bIdx).trim();
    const optB = workingText.substring(bIdx + 3, cIdx).trim();
    const optC = workingText.substring(cIdx + 3, dIdx).trim();
    const optD = workingText.substring(dIdx + 3, ansIdx).trim();
    
    const ansPart = workingText.substring(ansIdx + 7, expIdx).trim();
    const correctAnswer = ansPart.toUpperCase().charCodeAt(0) - 65;
    
    const explanation = workingText.substring(expIdx + 12).trim();

    questions.push({
        id: `weekly-12-${qNum}`,
        text: questionText,
        options: [optA, optB, optC, optD],
        correctAnswer: correctAnswer,
        explanation: explanation
    });
});

fs.writeFileSync('tmp/parsed_mcqs.json', JSON.stringify(questions, null, 4));
console.log(`Parsed ${questions.length} questions to tmp/parsed_mcqs.json`);
