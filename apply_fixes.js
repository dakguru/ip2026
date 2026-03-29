const fs = require('fs');
const tsPath = 'd:/IP 2026/study-planner/src/data/quizzes.ts';
let code = fs.readFileSync(tsPath, 'utf8');

const regMap = {
  // exact mapping to the new index
  "Regulation 1": "Regulation 1",
  "Regulation 2": "Regulation 2",
  "Regulation 4": "the Post Office Regulations, 2024",
  "Regulation 9\\)": "the Regulations)",
  "Regulation 9,": "the Regulations,",
  "Regulation 12": "Regulation 35",
  "Regulation 15": "Regulation 25",
  "Regulation 18": "Regulation 121",
  "Regulation 22": "Regulation 176",
  "Regulation 28": "Regulation 64",
  "Regulation 32": "the Regulations",
  "Regulation 35": "the Regulations",
  "Regulation 42": "Regulation 93",
  "Regulation 50": "Regulation 55",
  "Regulation 52": "Regulation 62",
  "Regulation 55": "Regulation 62",
  "Regulation 60": "Regulation 46",
  "Regulation 65": "Regulation 73",
  "Regulation 70": "the Regulations",
  "Regulation 85": "the Regulations",
  "Regulation 92": "Regulation 28", // Prohibitions on Gold/Bullion -> Transmission of precious metals.
  "Regulation 92A": "the Regulations",
  "Regulation 95": "Regulation 35",
  "Regulation 98": "the Regulations",
  "Regulation 101": "Regulation 25",
  "Regulation 105": "the Regulations",
  "Regulation 110": "Regulation 91",
  "Regulation 120": "Regulation 92",
  "Regulation 122": "Regulation 92",
  "Regulation 125": "the Regulations",
  "Regulation 128": "Regulation 93",
  "Regulation 130": "Regulation 95",
  "Regulation 135": "Regulation 96",
  "Regulation 138": "the Regulations",
  "Regulation 140": "Regulation 96",
  "Regulation 142": "the Regulations",
  "Regulation 145": "Regulation 41", // Accountable items
  "Regulation 148": "the Regulations",
  "Regulation 150": "Regulation 35", // Dangerous 
  "Regulation 152": "Regulation 97",
  "Regulation 155": "Regulation 9", // Fictitious Stamp -> Fraudulent
  "Regulation 158": "Regulation 117",
  "Regulation 160": "Regulation 55",
  "Regulation 162": "the Regulations",
  "Regulation 165": "Regulation 127",
  "Regulation 168": "Regulation 81",
  "Regulation 172": "the Regulations",
  "Regulation 175": "Regulation 51",
  "Regulation 178": "the Regulations",
  "Regulation 180": "Regulation 43",
  "Regulation 182": "the Regulations",
  "Regulation 185": "Regulation 43",
  "Regulation 188": "Regulation 74",
  "Regulation 190": "the Regulations",
  "Regulation 192": "Regulation 144",
  "Regulation 195": "Regulation 51",
  "Regulation 200": "Regulation 52",
  "Regulation 205": "Regulation 133",
  "Regulation 208": "Regulation 133",
  "Regulation 210": "Regulation 64",
  "Regulation 215": "Regulation 75",
  "Regulation 220": "Regulation 137",
  "Regulation 225": "Regulation 102",
  "Regulation 228": "Regulation 101",
  "Regulation 230": "Regulation 67",
  "Regulation 235": "the Regulations",
  "Regulation 240": "Regulation 55",
  "Regulation 242": "Regulation 136",
  "Regulation 245": "the Regulations",
  "Regulation 246": "Regulation 55",
  "Regulation 250": "Regulation 76",
  "Regulation 255": "Regulation 145", // Money order
  "Regulation 260": "the Regulations",
  "Regulation 265": "Regulation 154",
  "Regulation 268": "the Regulations",
  "Regulation 270": "Regulation 7",
  "Regulation 272": "the Regulations",
  "Regulation 275": "Regulation 157",
  "Regulation 278": "Regulation 158",
  "Regulation 280": "Regulation 31",
  "Regulation 282": "the Regulations",
  "Regulation 288": "the Regulations",
  "Regulation 292": "Regulation 11",
  "Regulation 295": "Regulation 12",
  "Regulation 300": "Regulation 103",
  "Regulation 310": "the Regulations",
  "Regulation 315": "the Regulations",
  "Regulation 320": "Regulation 9",
  "Regulation 325": "Regulation 3"
};

const startIndex = code.indexOf('86: [');
let endIndex = code.indexOf('93: [');
if (endIndex === -1) endIndex = code.indexOf('],', code.lastIndexOf('92: [')) + 2;

let block = code.substring(startIndex, endIndex);

// Replace generic pattern
block = block.replace(/Regulation \d+[A-Z]?(\)|\,)?/g, (match) => {
  if (regMap[match]) return regMap[match];
  let baseMatched = match.match(/Regulation \d+[A-Z]?/);
  if (baseMatched && regMap[baseMatched[0]]) {
     return regMap[baseMatched[0]] + (match.includes(')') ? ')' : (match.includes(',') ? ',' : ''));
  }
  return match; // fallback
});

// Specifically fix exact textual sentences that were poor
block = block.replace(/Regulation 50 deals with 'Redirection.'/, "Regulation 55 deals with 'Redirection.'");
block = block.replace(/Regulation 50 deals with \\"Redirection.\\"/, "Regulation 55 deals with \\\"Redirection.\\\"");
block = block.replace(/governed by Regulation 55\./, "governed by Regulation 62.");
block = block.replace(/Regulation 240 \(Redirection\)/, "Regulation 55 (Redirection)");
block = block.replace(/Regulation 220 covers 'Refusal of Article.'/, "Regulation 62 covers 'Refusal of Article.'");
block = block.replace(/Regulation 220 covers \\"Refusal of Article.\\"/, "Regulation 62 covers \\\"Refusal of Article.\\\"");

code = code.substring(0, startIndex) + block + code.substring(endIndex);

fs.writeFileSync(tsPath, code);
console.log('Quizzes updated successfully.');
