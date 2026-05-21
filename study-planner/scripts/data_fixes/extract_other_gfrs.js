const fs = require('fs');

const data = JSON.parse(fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_entries_full.json', 'utf8'));
const map = {
  '6a0c909030e0d20dcdd418e6': 'Procurement of Goods',
  '6a0c9094f76930e9163f9069': 'Revenue, Audits',
  '6a0c9098d415c0e002d1c300': 'Financial Management',
  '6a0c9060809a067889fa7a45': 'Chapter 2 & 6',
  '69c95096a60b6cd0039e0bc1': 'Proprietary Article Certificate'
};

for (const id of Object.keys(map)) {
  const entry = data[id];
  console.log(`\n\n--- ${map[id]} ---`);
  console.log(entry.official_text ? entry.official_text.substring(0, 500) : 'No official text');
  // Just dump it to a file to examine
  fs.writeFileSync(`D:\\IP 2026\\study-planner\\gfr_${id}.html`, entry.official_text || entry.entry?.official_text || '');
}
