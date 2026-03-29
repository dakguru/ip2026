const fs = require('fs');

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("No GEMINI_API_KEY found!");
    return;
  }

  const text = fs.readFileSync('D:\\IP 2026\\po_regulations_2024_text.txt', 'utf8');
  const totalLength = text.length;
  console.log(`Text loaded. Length: ${totalLength}`);

  const totalChunks = 10;
  const chunkSize = Math.ceil(totalLength / totalChunks);

  let allQuestions = [];

  for (let i = 0; i < totalChunks; i++) {
    console.log(`Processing chunk ${i + 1}/${totalChunks}...`);
    const chunkText = text.substring(i * chunkSize, (i + 1) * chunkSize);

    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `Generate exactly 15 high-quality, LDCE exam level MCQs covering timelines, penalties, amounts, definitions, and minor points from this portion of the Post Office Regulations, 2024:\n\n${chunkText}` }] }
        ],
        systemInstruction: {
          parts: [{ text: "You are an expert examiner for India Post LDCE Inspector Posts. Generate MCQs that deeply test the candidate's knowledge. Output ONLY a valid raw JSON array and absolutely no markdown or surrounding text. Schema: [{\"q\": \"question text\", \"o\": [\"opt 1\", \"opt 2\", \"opt 3\", \"opt 4\"], \"a\": integer 0 to 3, \"e\": \"explanation text starting with • Concept: and • Elimination:\"}]" }]
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      })
    });

    if (!result.ok) {
        console.log(`Error on chunk ${i+1}: ${result.status} ${result.statusText}`);
        let errStr = await result.text();
        console.log(errStr);
        continue;
    }

    const json = await result.json();
    try {
        let content = json.candidates[0].content.parts[0].text;
        let parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
            allQuestions = allQuestions.concat(parsed);
            console.log(`Chunk ${i + 1} yielded ${parsed.length} questions. Total: ${allQuestions.length}`);
        } else {
            console.log(`Chunk ${i+1} did not return an array.`);
        }
    } catch(e) {
        console.log(`Chunk ${i+1} JSON parse error: ` + e.message);
    }
    
    // give it a tiny break to avoid rate limits
    await new Promise(r => setTimeout(r, 2000));
  }

  // Format and save to TypeScript
  let tsOutput = `// Generated LDCE MCQs for PO Regulations 2024\nimport { Question } from "@/lib/quizTypes";\n\n`;

  // Break them into blocks of 25 for quizzing
  const qsPerBlock = 25;
  for (let b = 0; b < Math.ceil(allQuestions.length / qsPerBlock); b++) {
      let slice = allQuestions.slice(b * qsPerBlock, (b + 1) * qsPerBlock);
      tsOutput += `export const po_reg_ldce_set${b+1}: Question[] = [\n`;
      for (let q of slice) {
          tsOutput += `  { q: ${JSON.stringify(q.q)}, o: ${JSON.stringify(q.o)}, a: ${q.a}, e: ${JSON.stringify(q.e)} },\n`;
      }
      tsOutput += `];\n\n`;
  }

  fs.writeFileSync('D:\\IP 2026\\study-planner\\src\\data\\flashcards\\po_reg_ldce.ts', tsOutput);
  console.log(`Saved ${allQuestions.length} questions to po_reg_ldce.ts`);
}

main();
