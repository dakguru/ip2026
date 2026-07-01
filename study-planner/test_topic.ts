import { QUIZ_DATA } from './src/data/quizzes';
const topic = QUIZ_DATA.find(t => t.id === 'p1-15');
console.log("Topic ID:", topic.id);
console.log("Topic Title:", topic.title);
console.log("Sets count:", topic.sets.length);
console.log("Total Questions:", topic.sets.reduce((acc, set) => acc + set.questions.length, 0));
