const fs = require('fs');
const quizzesFilePath = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let quizzesContent = fs.readFileSync(quizzesFilePath, 'utf8');

// Updating Sexual Harassment
quizzesContent = quizzesContent.replace(
    /createTopic\('p3-10', 'Sexual Harassment at Work place \(Prevention, prohibition & Redressal\) Act, 2013', 'Paper III'\),/,
    `createTopic('p3-10', 'Sexual Harassment at Work place (Prevention, prohibition & Redressal) Act, 2013', 'Paper III', [139, 140]),`
);

fs.writeFileSync(quizzesFilePath, quizzesContent);
console.log('Quizzes text replaced correctly for Sexual Harassment.');
