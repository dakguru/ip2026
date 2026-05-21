const fs = require('fs');

const syllabusContent = fs.readFileSync('src/data/psgbSyllabusData.tsx', 'utf8');

const papers = ['paper1', 'paper2', 'paper3', 'paper4'];
const paperTitles = {
    'paper1': 'Paper I',
    'paper2': 'Paper II',
    'paper3': 'Paper III',
    'paper4': 'Paper IV'
};

const psgbTopics = [];

let currentPaper = '';
let lines = syllabusContent.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if we are entering a new paper
    for (const p of papers) {
        if (line.trim().startsWith(`${p}: {`)) {
            currentPaper = paperTitles[p];
        }
    }

    // Look for items with a title
    const titleMatch = line.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch && currentPaper && line.includes('pdfs:')) {
        // wait, items might not be on the same line as pdfs: 
        // Better: look for title: "...", inside items
    }
}
