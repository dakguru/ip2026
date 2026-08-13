const fs = require('fs');

const content = fs.readFileSync('D:\\IP 2026\\MCQs\\Schedule of Financial Powers Updated as per Addendum III.txt', 'utf8');

const questions = [];
let i = 1;
while (true) {
    const qStr = 'Q' + i + '.';
    const qIndex = content.indexOf(qStr);
    if (qIndex === -1) break;
    
    let nextIndex = content.indexOf('Q' + (i + 1) + '.');
    if (nextIndex === -1) nextIndex = content.length;
    
    const block = content.substring(qIndex, nextIndex);
    
    const optAIndex = block.indexOf('\nA.');
    if (optAIndex === -1) { i++; continue; }
    
    let qText = block.substring(qStr.length, optAIndex).trim();
    
    const ansIndex = block.indexOf('Correct Answer:');
    if (ansIndex === -1) { i++; continue; }
    
    const optsStr = block.substring(optAIndex, ansIndex).trim();
    const optsLines = optsStr.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    let opts = [];
    let currentOpt = '';
    for (let line of optsLines) {
        if (/^[A-D]\./.test(line)) {
            if (currentOpt) opts.push(currentOpt);
            currentOpt = line.replace(/^[A-D]\.\s*/, '').trim();
        } else if (currentOpt) {
            currentOpt += ' ' + line;
        }
    }
    if (currentOpt) opts.push(currentOpt);
    
    let ansLetter = block.substring(ansIndex + 'Correct Answer:'.length).trim()[0];
    let aNum = ansLetter.charCodeAt(0) - 65;
    
    const expIndex = block.indexOf('Explanation:');
    let eText = '';
    if (expIndex !== -1) {
        eText = block.substring(expIndex + 'Explanation:'.length).trim();
        // remove the next Q... if there are any separators like ---
        const sep = eText.indexOf('──');
        if (sep !== -1) eText = eText.substring(0, sep).trim();
        const sep2 = eText.indexOf('✅');
        if (sep2 !== -1) eText = eText.substring(0, sep2).trim();
        const sep3 = eText.indexOf('⏸');
        if (sep3 !== -1) eText = eText.substring(0, sep3).trim();
        eText = eText.replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\s+/g, ' ').trim();
    }
    
    questions.push({q: qText, o: opts, a: aNum, e: eText});
    i++;
}

// Write to scheduleOfFinancialPowers.ts
let tsOutput = 'import { Question } from "@/lib/quizTypes";\n\n';
for (let s = 0; s < 5; s++) {
    const start = Math.floor(s * questions.length / 5);
    const end = Math.floor((s + 1) * questions.length / 5);
    const slice = questions.slice(start, end);
    tsOutput += 'export const schedule_financial_powers_set' + (s + 1) + ': any[] = ' + JSON.stringify(slice, null, 2) + ';\n\n';
}

fs.writeFileSync('d:\\IP 2026\\study-planner\\src\\data\\flashcards\\scheduleOfFinancialPowers.ts', tsOutput, 'utf8');
console.log('Processed ' + questions.length + ' questions.');
