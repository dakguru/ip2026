const fs = require('fs');
const input = fs.readFileSync('D:\\IP 2026\\PS Gr B - Weekly Mock Test Series\\PS Gr B - Weekly Mock Test 02.txt', 'utf8');
const blocks = input.split(/\nQ\d+\.\s*/).filter(b => b.trim() !== '');

let q7 = blocks[6]; // index 6 is Q7
let lines = q7.split('\n').map(l => l.trim()).filter(l => l !== '');
let firstLine = lines.shift() || "";

let questionTextLines = [];
let options = [];
let mode = 'text';

for(let i=0; i<lines.length; i++) {
    let line = lines[i];
    if (line.match(/^[A-D]\.\s/)) {
        mode = 'options';
        options.push(line.replace(/^[A-D]\.\s*/, '').trim());
    } else if (line.startsWith('Answer:')) {
        mode = 'answer';
    } else if (line.startsWith('Explanation:')) {
        mode = 'explanation';
    } else {
        if (mode === 'text') {
            questionTextLines.push(line);
        } else if (mode === 'options') {
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
    console.log("-> AT START OF LOOP, line:", line, "inTable is:", inTable);
    if (line.includes('Column I') && line.includes('Column II')) {
        inTable = true;
        headers = ["Column I", "Column II"];
        console.log("--> Setting inTable to TRUE");
        continue;
    }
    if (inTable) {
        console.log("--> Inside inTable=TRUE branch");
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
        console.log("--> Inside inTable=FALSE branch. PUSHING.");
        finalQuestionText.push(line);
    }
}

console.log("TEXT LINES:", JSON.stringify(finalQuestionText, null, 2));
console.log("OPTIONS:", JSON.stringify(options, null, 2));

