import fs from 'fs';

function parseMock(inputFile, outputFile, exportVarName, idPrefix) {
    console.log(`Parsing ${inputFile}...`);
    try {
        const content = fs.readFileSync(inputFile, 'utf-8');
        const questions = [];
        
        // Split by "Q<number>."
        const parts = content.split(/Q\d+\.\s+/).filter(p => p.trim().length > 0);
        
        parts.forEach((part, index) => {
            const qNo = index + 1;
            
            const aMatch = part.match(/\nA\.\s+(.*?)(?=\nB\.)/s);
            const bMatch = part.match(/\nB\.\s+(.*?)(?=\nC\.)/s);
            const cMatch = part.match(/\nC\.\s+(.*?)(?=\nD\.)/s);
            const dMatch = part.match(/\nD\.\s+(.*?)(?=\nAnswer:)/s);
            
            const ansMatch = part.match(/\nAnswer:\s+([A-D])/);
            const expMatch = part.match(/\nExplanation:\s*(.*)/s);
            
            if (aMatch && bMatch && cMatch && dMatch && ansMatch && expMatch) {
                const questionText = part.split(/\nA\./)[0].trim().replace(/\r?\n/g, ' ');
                
                questions.push({
                    id: `${idPrefix}-${qNo}`,
                    text: questionText,
                    options: [
                        aMatch[1].trim().replace(/\r?\n/g, ' '),
                        bMatch[1].trim().replace(/\r?\n/g, ' '),
                        cMatch[1].trim().replace(/\r?\n/g, ' '),
                        dMatch[1].trim().replace(/\r?\n/g, ' ')
                    ],
                    correctAnswer: ['A', 'B', 'C', 'D'].indexOf(ansMatch[1]),
                    explanation: expMatch[1].trim().replace(/\r?\n/g, ' ')
                });
            } else {
                console.log(`Failed to parse question ${qNo}`);
            }
        });

        console.log(`Extracted ${questions.length} questions.`);

        const outputContent = `import { Question } from "./live_mock_data";\n\nexport const ${exportVarName}: Question[] = ${JSON.stringify(questions, null, 4)};`;
        fs.writeFileSync(outputFile, outputContent);
        console.log(`Saved to ${outputFile}`);
    } catch (err) {
        console.error(`Error parsing ${inputFile}:`, err);
    }
}

parseMock(
    "D:\\IP 2026\\LDCE IP Mock Test Series II\\S2 - 07.txt", 
    "d:\\IP 2026\\study-planner\\src\\data\\weekly_mock_data_s2_07.ts", 
    "WEEKLY_MOCK_S2_07_QUESTIONS",
    "mock-s2-07"
);
