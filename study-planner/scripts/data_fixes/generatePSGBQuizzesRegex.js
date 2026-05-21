const fs = require('fs');

const quizzesContent = fs.readFileSync('src/data/quizzes.ts', 'utf8');
const syllabusContent = fs.readFileSync('src/data/psgbSyllabusData.tsx', 'utf8');

// 1. Extract createTopic calls from quizzes.ts
const quizTopics = [];
const topicRegex = /createTopic\([^,]+,\s*(['"`])(.*?)\1,\s*(['"`])(.*?)\3,\s*\[([^\]]*)\]/g;
let match;
while ((match = topicRegex.exec(quizzesContent)) !== null) {
    const title = match[2];
    const category = match[4];
    const setIdsStr = match[5];
    const setIds = setIdsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    quizTopics.push({ title, category, setIds });
}

// 2. Extract topics from psgbSyllabusData.tsx
const psgbTopics = [];
const papers = ['paper1', 'paper2', 'paper3', 'paper4'];
const paperTitles = {
    'paper1': 'Paper I',
    'paper2': 'Paper II',
    'paper3': 'Paper III',
    'paper4': 'Paper IV'
};

let currentPaper = null;
const lines = syllabusContent.split('\n');

for (const line of lines) {
    for (const p of papers) {
        if (line.includes(`${p}: {`)) {
            currentPaper = paperTitles[p];
        }
    }

    const nameMatch = line.match(/name:\s*["']([^"']+)["']/);

    if (nameMatch && currentPaper) {
        const title = nameMatch[1];

        // Find matching quiz
        let matched = quizTopics.find(q => q.title.toLowerCase().trim() === title.toLowerCase().trim());
        if (!matched) {
            let matches = quizTopics.filter(q => q.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(q.title.toLowerCase()));
            if (matches.length > 0) {
                matched = matches[0];
            }
        }

        const sets = matched ? matched.setIds.join(', ') : '';
        psgbTopics.push(`  createTopic('psgb-${psgbTopics.length + 1}', ${JSON.stringify(title)}, '${currentPaper}', [${sets}])`);
    }
}

const fileContent = `import { createTopic, QuizTopic } from './quizzes';

export const PSGB_QUIZ_DATA: QuizTopic[] = [
${psgbTopics.join(',\n')}
];
`;

fs.writeFileSync('src/data/psgbQuizzesData.ts', fileContent, 'utf8');
console.log('psgbQuizzesData.ts generated!');
