const fs = require('fs');

const content = fs.readFileSync('D:\\IP 2026\\LDCE IP Mock Test - 12.txt', 'utf8');
const lines = content.split('\n');

const questions = [];
let currentQuestion = null;

const optionRegex = /^[A-D]\.\s/i;
const answerRegex = /^Answer:\s*([A-D])/i;
const explanationRegex = /^Explanation:\s*/i;

lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    const qMatch = line.match(/^Q(\d+)\.\s+/i);
    if (qMatch) {
        if (currentQuestion) questions.push(currentQuestion);
        const qNum = qMatch[1];
        currentQuestion = {
            id: `weekly-12-${qNum}`,
            text: line.replace(/^Q\d+\.\s+/, '').trim(),
            options: [],
            correctAnswer: -1,
            explanation: ""
        };
    } else if (currentQuestion) {
        if (optionRegex.test(line)) {
            const optText = line.replace(/^[A-D]\.\s+/i, '').trim();
            currentQuestion.options.push(optText);
        } else if (answerRegex.test(line)) {
            const ansChar = line.match(answerRegex)[1].toUpperCase();
            currentQuestion.correctAnswer = ansChar.charCodeAt(0) - 65;
            currentQuestion.explanation = line.replace(answerRegex, '').replace(explanationRegex, '').trim();
        } else if (explanationRegex.test(line)) {
             currentQuestion.explanation += (currentQuestion.explanation ? " " : "") + line.replace(explanationRegex, '').trim();
        } else {
             // Handle multiline question text or tables (though the script is simple)
             if (currentQuestion.correctAnswer === -1 && currentQuestion.options.length === 0) {
                 currentQuestion.text += "\n" + line;
             } else if (currentQuestion.correctAnswer !== -1) {
                 currentQuestion.explanation += " " + line;
             }
        }
    }
});

if (currentQuestion) questions.push(currentQuestion);

// Final cleaning of question text and options
questions.forEach(q => {
    // Remove metadata from start: (Manual for Procurement) [Difficulty: Easy]
    q.text = q.text.replace(/^\(.*?\)\s*\[Difficulty:.*?\]\s*/i, '').trim();
});

console.log(JSON.stringify(questions, null, 4));
