const fs = require('fs');
const path = 'd:/IP 2026/study-planner/src/data/quizzes.ts';

let content = fs.readFileSync(path, 'utf8');

// The new sets are from 359 to 364.
// Let's just fix the \\\\n replacing them with \\n globally in the file (it shouldn't hurt anything since \\\\n is only used where I made the mistake).
content = content.replace(/\\\\n/g, '\\n');

// Now, remove the extra text from the explanations.
// The extra text patterns are:
// 1. \[ Rule .*? \]
// 2. -{10,}
// 3. ={10,}
// 4. END OF SET.*?MCQs

content = content.replace(/\\n\[ Rule [^\]]+ \]/g, '');
content = content.replace(/\\n-{10,}/g, '');
content = content.replace(/\\n={10,}/g, '');
content = content.replace(/\\nEND OF SET.*?MCQs/g, '');

fs.writeFileSync(path, content);
console.log('Quizzes cleaned successfully.');
