const fs = require('fs');

function parseMockTest(inputFile, outputFile, exportName, idPrefix) {
    const input = fs.readFileSync(inputFile, 'utf8');
    
    // Split by Q followed by number and period
    const blocks = input.split(/(?:^|\n)Q\d+\.\s*/).filter(b => b.trim() !== '');
    
    let questions = [];
    
    blocks.forEach((block, index) => {
        let qNum = index + 1;
        let lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
        
        let questionTextLines = [];
        let options = [];
        let answerLetter = '';
        let explanation = '';
        let table = null;
        
        let mode = 'text'; // text, options, answer, explanation
        
        for(let i=0; i<lines.length; i++) {
            let line = lines[i];
            
            // Skip section headers
            if (line.startsWith('====') || line.startsWith('SECTION ')) {
                continue;
            }
            
            if (line.match(/^[A-D]\.\s/) && mode !== 'explanation') {
                mode = 'options';
                options.push(line.replace(/^[A-D]\.\s*/, '').trim());
            } else if (line.startsWith('Answer:')) {
                mode = 'answer';
                answerLetter = line.replace('Answer:', '').trim();
            } else if (line.startsWith('Explanation:') || line.startsWith('Explanation :')) {
                mode = 'explanation';
                // Capture text on the SAME line as Explanation:
                let expText = line.replace(/Explanation\s*:/, '').trim();
                if (expText) {
                    explanation = expText;
                }
            } else {
                if (mode === 'text') {
                    questionTextLines.push(line);
                } else if (mode === 'explanation') {
                    explanation += (explanation ? " " : "") + line;
                } else if (mode === 'options') {
                    // sometimes an option leaks to next line
                    if (options.length > 0) {
                        options[options.length-1] += " " + line;
                    }
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
                if (line.toLowerCase().includes('select the correct match') || line.toLowerCase().includes('select the correct') || line === '') {
                    inTable = false;
                    finalQuestionText.push(line);
                } else {
                    let parts = line.split(/  +/);
                    if (parts.length >= 2) {
                        tableRows.push([parts[0].trim(), parts.slice(1).join(" ").trim()]);
                    } else if (parts.length === 1 && tableRows.length > 0) {
                        tableRows[tableRows.length - 1][0] += " " + line.trim();
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
        if (answerIndex === -1) console.log('ERROR missing answer for Q' + qNum + ', got: "' + answerLetter + '" in ' + inputFile);
        if (options.length !== 4) console.log('WARNING Q' + qNum + ' has ' + options.length + ' options instead of 4 in ' + inputFile);
        if (finalQuestionText.join("\n").trim() === '') console.log('WARNING Q' + qNum + ' has empty question text in ' + inputFile);
        
        let questionObj = {
            id: `${idPrefix}-${qNum}`,
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
    
    console.log('Total questions parsed for ' + exportName + ': ' + questions.length);
    
    let output = `import { Question } from "./live_mock_data";\n\nexport const ${exportName}: Question[] = ${JSON.stringify(questions, null, 4)};\n`;
    
    fs.writeFileSync(outputFile, output);
    console.log('Done ' + exportName + '!');
}

parseMockTest(
    'D:\\IP 2026\\PS Gr B - Weekly Mock Test Series\\PS Gr B - Weekly Mock Test 16 V3.txt',
    'D:\\IP 2026\\study-planner\\src\\data\\psgb_mock_data_16.ts',
    'PSGB_MOCK_16_QUESTIONS',
    'psgb-16'
);

parseMockTest(
    'D:\\IP 2026\\LDCE IP Mock Test Series II\\S2 - 09.txt',
    'D:\\IP 2026\\study-planner\\src\\data\\weekly_mock_data_s2_09.ts',
    'WEEKLY_MOCK_S2_09_QUESTIONS',
    's2-09'
);
