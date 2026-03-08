const fs = require('fs');

const psgbDataPath = 'd:/IP 2026/study-planner/src/data/psgbQuizzesData.ts';
let psgbContent = fs.readFileSync(psgbDataPath, 'utf8');

psgbContent = psgbContent.replace(
    /createTopic\('psgb-27', "Manual of Office Procedure", 'Paper I', \[\]\),/,
    `createTopic('psgb-27', "Manual of Office Procedure", 'Paper I', [136, 137, 138]),`
);

psgbContent = psgbContent.replace(
    /createTopic\('psgb-72', "Sexual Harassment of Women at Workplace \(Prevention, Prohibition and Redressal\) Act, 2013", 'Paper II', \[\]\),/,
    `createTopic('psgb-72', "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013", 'Paper II', [139, 140]),`
);

fs.writeFileSync(psgbDataPath, psgbContent);
console.log('psgbQuizzesData.ts text replaced correctly.');
