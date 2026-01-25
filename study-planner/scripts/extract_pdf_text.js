const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
}

const dataBuffer = fs.readFileSync(filePath);

pdf(dataBuffer).then(function (data) {
    // PDF text
    console.log(data.text);
}).catch(err => {
    console.error(err);
});
