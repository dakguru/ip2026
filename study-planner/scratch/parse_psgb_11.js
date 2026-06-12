const fs = require('fs');

const input = fs.readFileSync('D:\\IP 2026\\PS Gr B - Weekly Mock Test Series\\PS Gr B - Weekly Mock Test 11.txt', 'utf8');

// Prepend \n to make sure the first Q1. matches \nQ\d+\.\s*
const blocks = ('\n' + input).split(/\nQ\d+\.\s*/).filter(b => b.trim() !== '');

console.log(`Total blocks found: ${blocks.length}`);

let questions = [];

blocks.forEach((block, index) => {
    let qNum = index + 1;
    let lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
    
    let questionTextLines = [];
    let options = [];
    let answerLetter = '';
    let explanation = '';
    
    let mode = 'text'; // text, options, answer, explanation
    
    for(let i=0; i<lines.length; i++) {
        let line = lines[i];
        if (line.match(/^[A-D]\.\s/)) {
            mode = 'options';
            options.push(line.replace(/^[A-D]\.\s*/, '').trim());
        } else if (line.startsWith('Answer:')) {
            mode = 'answer';
            answerLetter = line.replace('Answer:', '').trim();
        } else if (line.startsWith('Explanation:')) {
            mode = 'explanation';
            explanation = line.replace('Explanation:', '').trim();
        } else {
            if (mode === 'text') {
                questionTextLines.push(line);
            } else if (mode === 'explanation') {
                explanation += (explanation ? " " : "") + line;
            } else if (mode === 'options') {
                // sometimes an option leaks to next line
                options[options.length-1] += " " + line;
            }
        }
    }
    
    let answerIndex = ['A', 'B', 'C', 'D'].indexOf(answerLetter);
    if (answerIndex === -1) {
        console.log('ERROR missing answer index for Q' + qNum, 'letter:', answerLetter);
    }
    
    let questionObj = {
        id: `psgb-11-${qNum}`,
        text: questionTextLines.join("\n"),
        options: options,
        correctAnswer: answerIndex,
        explanation: explanation
    };
    
    questions.push(questionObj);
});

console.log(`Parsed ${questions.length} questions successfully.`);

let output = `import { Question } from "./live_mock_data";\n\nexport const PSGB_MOCK_11_QUESTIONS: Question[] = ${JSON.stringify(questions, null, 4)};\n`;

fs.writeFileSync('d:\\IP 2026\\study-planner\\src\\data\\psgb_mock_data_11.ts', output);
console.log('Successfully wrote psgb_mock_data_11.ts');
