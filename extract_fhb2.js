const fs = require('fs');
const pdf = require('./study-planner/node_modules/pdf-parse');

const buffer = fs.readFileSync('Paper III/FHB Vol - II.pdf');
pdf(buffer).then(data => {
    fs.writeFileSync('FHB_Vol_II.txt', data.text);
    console.log('Extracted ' + data.text.length + ' characters.');
}).catch(e => console.error(e));
