const fs = require('fs');

const data = JSON.parse(fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_entries_full.json', 'utf8'));

for (const id in data) {
    const entry = data[id];
    console.log(`\n=============================================================`);
    console.log(`ID: ${id}`);
    console.log(`Title: ${entry.title || entry.entry?.title}`);
    console.log(`Rule Number: ${entry.rule_number || entry.entry?.rule_number}`);
    
    const officialText = entry.official_text || entry.entry?.official_text || '';
    
    // Quick regex to extract Rule Number and Heading pairs from HTML tables or bold text
    // Assuming it's formatted like a table or list
    
    console.log(`\n--- Official Text (Preview) ---`);
    console.log(officialText.substring(0, 1000));
}
