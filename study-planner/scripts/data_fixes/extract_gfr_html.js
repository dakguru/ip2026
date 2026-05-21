const fs = require('fs');

const data = JSON.parse(fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_entries_full.json', 'utf8'));

for (const id in data) {
    const entry = data[id];
    if (id === '6a0c93ecc4d0af046a6ac1dc') {
        const officialText = entry.official_text || entry.entry?.official_text || '';
        
        // Let's write the full official text to a file so we can view it
        fs.writeFileSync('D:\\IP 2026\\study-planner\\gfr_ultra_memory_guide.html', officialText);
        console.log('Wrote gfr_ultra_memory_guide.html');
    }
}
