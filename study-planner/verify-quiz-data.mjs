// Quick verification script
import { QUIZ_DATA } from './src/data/quizzes.ts';

const p1_11 = QUIZ_DATA.find(topic => topic.id === 'p1-11');
const p1_30 = QUIZ_DATA.find(topic => topic.id === 'p1-30');

console.log('=== Postal Manual Volume II (p1-11) ===');
console.log('Topic:', p1_11?.title);
console.log('Sets:', p1_11?.sets.length || 0);
console.log('Total Questions:', p1_11?.sets.reduce((acc, set) => acc + set.questions.length, 0) || 0);

console.log('\n=== Postal Manual Volume III (p1-30) ===');
console.log('Topic:', p1_30?.title);
console.log('Sets:', p1_30?.sets.length || 0);
console.log('Total Questions:', p1_30?.sets.reduce((acc, set) => acc + set.questions.length, 0) || 0);
