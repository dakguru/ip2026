import fs from 'fs';
import { psgbSyllabusData } from './src/data/psgbSyllabusData';
import { QUIZ_DATA } from './src/data/quizzes';

// The idea is: traverse psgbSyllabusData, find all topics.
// For each topic, check if there is an exact match (or very close match) in QUIZ_DATA titles.
// Also keep in mind the structure expected for PSGB_QUIZ_DATA:
// export const PSGB_QUIZ_DATA: QuizTopic[] = [ ... ]
// Where QuizTopic has id, title, category ('Paper I' | 'Paper II' | 'Paper III' | 'Paper IV' | ...), and sets: QuizSet[]

const psgbQuizzes: any[] = [];
const papers = ['paper1', 'paper2', 'paper3', 'paper4'];

let tId = 1;

for (const p of papers) {
    const paperObj = (psgbSyllabusData as any)[p];
    if (!paperObj) continue;

    const paperCategory = paperObj.title.split(':')[0].trim(); // "Paper I"

    for (const section of paperObj.sections) {
        for (const item of section.items) {
            const title = item.title;

            // Try matching with existing QUIZ_DATA
            // We strip some common words to match loosely if exact doesn't work,
            // or just use exact match first.
            let matchedTopic = QUIZ_DATA.find(q => q.title.toLowerCase().trim() === title.toLowerCase().trim());

            if (!matchedTopic) {
                // Try a bit looser match
                matchedTopic = QUIZ_DATA.find(q => q.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(q.title.toLowerCase()));
            }

            // Create new topic entry mapped for PSGB
            const setIds = matchedTopic && matchedTopic.sets ? matchedTopic.sets.map(s => parseInt(s.id.replace('set-', ''), 10)) : [];

            psgbQuizzes.push(`  createTopic('psgb-${tId}', ${JSON.stringify(title)}, '${paperCategory}', [${setIds.join(', ')}])`);
            tId++;
        }
    }
}

const fileContent = `import { createTopic, QuizTopic } from './quizzes';

export const PSGB_QUIZ_DATA: QuizTopic[] = [
${psgbQuizzes.join(',\n')}
];
`;

fs.writeFileSync('src/data/psgbQuizzesData.ts', fileContent, 'utf8');
console.log('psgbQuizzesData.ts generated!');
