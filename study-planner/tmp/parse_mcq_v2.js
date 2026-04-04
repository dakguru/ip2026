const fs = require('fs');

const content = fs.readFileSync('D:\\IP 2026\\LDCE IP Mock Test - 12.txt', 'utf8');

// Use a regex to find each question block starting with Q followed by a number
const questionBlocks = content.split(/Q\d+\./);
// The first element might be empty or preamble
if (questionBlocks[0].trim() === "") questionBlocks.shift();

const questions = [];

questionBlocks.forEach((block, index) => {
    block = block.trim();
    if (!block) return;

    const qNum = index + 1;
    
    // Extract metadata
    const metadataMatch = block.match(/^\((.*?)\)\s*\[Difficulty:\s*(.*?)\]/);
    let text = block;
    if (metadataMatch) {
        text = block.substring(metadataMatch[0].length).trim();
    }

    // Extract options
    const options = [];
    const aMatch = text.match(/A\.\s+(.*?)B\.\s+/s);
    const bMatch = text.match(/B\.\s+(.*?)C\.\s+/s);
    const cMatch = text.match(/C\.\s+(.*?)D\.\s+/s);
    const dMatch = text.match(/D\.\s+(.*?)Answer:\s+/s);

    if (aMatch) options.push(aMatch[1].trim());
    if (bMatch) options.push(bMatch[1].trim());
    if (cMatch) options.push(cMatch[1].trim());
    if (dMatch) options.push(dMatch[1].trim());

    // Extract answer and explanation
    const ansMatch = text.match(/Answer:\s*([A-D])\s+Explanation:\s*(.*)$/s);
    let correctAnswer = -1;
    let explanation = "";

    if (ansMatch) {
        correctAnswer = ansMatch[1].toUpperCase().charCodeAt(0) - 65;
        explanation = ansMatch[2].trim();
    }

    // Extract question text (up to the first option)
    const qTextMatch = text.match(/^(.*?)A\.\s+/s);
    let questionText = text;
    if (qTextMatch) {
        questionText = qTextMatch[1].trim();
    }

    questions.push({
        id: `weekly-12-${qNum}`,
        text: questionText,
        options: options,
        correctAnswer: correctAnswer,
        explanation: explanation
    });
});

console.log(JSON.stringify(questions, null, 4));
