// Fetch full content of all GFR Dak Sutra entries
const gfrIds = [
  '6a0c93ecc4d0af046a6ac1dc',
  '6a0c9098d415c0e002d1c300',
  '6a0c9094f76930e9163f9069',
  '6a0c909030e0d20dcdd418e6',
  '6a0c9060809a067889fa7a45',
  '69c95096a60b6cd0039e0bc1'
];

async function fetchAll() {
  const results = {};
  for (const id of gfrIds) {
    try {
      const res = await fetch(`http://localhost:3000/api/dak-sutra/${id}`);
      const data = await res.json();
      results[id] = data;
      console.log(`Fetched: ${id} - ${data.entry?.title || data.title || 'unknown'}`);
    } catch (e) {
      console.error(`Error fetching ${id}:`, e.message);
    }
  }
  
  const fs = require('fs');
  fs.writeFileSync('gfr_entries_full.json', JSON.stringify(results, null, 2));
  console.log('Done! Written to gfr_entries_full.json');
}

fetchAll();
