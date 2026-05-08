const fs = require('fs');

const input = fs.readFileSync('D:\\IP 2026\\PS Gr B - Weekly Mock Test Series\\PS Gr B - Weekly Mock Test 02.txt', 'utf8');

const blocks = input.split(/\nQ\d+\.\s*/).filter(b => b.trim() !== '');

let questions = [];

blocks.forEach((block, index) => {
    let qNum = index + 1;
    let lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
    
    // The first line might contain "(Subject) [Difficulty]"
    let firstLine = lines.shift() || "";
    let subjectMatch = firstLine.match(/\((.*?)\)/);
    let subject = subjectMatch ? subjectMatch[1] : "";
    let difficultyMatch = firstLine.match(/\[(.*?)\]/);
    let difficulty = difficultyMatch ? difficultyMatch[1] : "";
    
    // Now extract the text until "A. "
    let questionTextLines = [];
    let options = [];
    let answerLetter = '';
    let explanation = '';
    let table = null;
    
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
    
    // Check for table in questionTextLines
    let finalQuestionText = [];
    let inTable = false;
    let tableRows = [];
    let headers = [];
    
    for(let i=0; i<questionTextLines.length; i++) {
        let line = questionTextLines[i];
        if (line.includes('Column I') && line.includes('Column II')) {
            inTable = true;
            headers = ["Column I", "Column II"];
            continue;
        }
        if (inTable) {
            if (line.toLowerCase().includes('select the correct match') || line === '') {
                inTable = false;
                finalQuestionText.push(line);
            } else {
                // Try to split table row
                let parts = line.split(/  +/); // two or more spaces
                if (parts.length >= 2) {
                    tableRows.push([parts[0].trim(), parts.slice(1).join(" ").trim()]);
                } else if (parts.length === 1 && tableRows.length > 0 && !line.match(/^[P-S]\./) && !line.match(/^[1-6]\./) && !line.match(/^[A-Z]\./)) {
                    // continuation of previous row?
                    if (tableRows[tableRows.length - 1][0].length > 0 && !line.match(/^\d/)) {
                        tableRows[tableRows.length - 1][0] += " " + line.trim();
                    } else {
                        tableRows[tableRows.length - 1][1] += " " + line.trim();
                    }
                }
            }
        } else {
            finalQuestionText.push(line);
        }
    }
    
    if (tableRows.length > 0) {
        table = { headers, rows: tableRows };
    }
    
    let answerIndex = ['A', 'B', 'C', 'D'].indexOf(answerLetter);
    if (answerIndex === -1) console.log('ERROR missing answer index', qNum, answerLetter);
    
    let questionObj = {
        id: `psgb-02-${qNum}`,
        text: finalQuestionText.join("\n"),
        options: options,
        correctAnswer: answerIndex,
        explanation: explanation
    };
    
    if (table) {
        questionObj.table = table;
    }
    
    questions.push(questionObj);
});

let output = `import { Question } from "./live_mock_data";\n\nexport const PSGB_MOCK_02_QUESTIONS: Question[] = ${JSON.stringify(questions, null, 4)};\n`;

fs.writeFileSync('d:\\IP 2026\\study-planner\\src\\data\\psgb_mock_data_02.ts', output);
console.log('Done MOCK 02 PSGB!');
