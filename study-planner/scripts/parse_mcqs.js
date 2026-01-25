const fs = require('fs');
const path = require('path');

const filePath = 'D:\\IP 2026\\MCQs on Gramin Dak Sevaks (Conduct and Engagement) Rules, 2020.txt';
const targetFile = 'd:\\IP 2026\\study-planner\\src\\data\\quizzes.ts';

try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to match questions: **Q<number>.
    const questions = {};

    for (let i = 1; i <= 50; i++) {
        const startRegex = new RegExp(`\\*\\*Q${i}\\.`);
        const startMatch = content.match(startRegex);

        if (!startMatch) continue;

        const startIndex = startMatch.index;
        let endMatch;
        if (i < 50) {
            const endRegex = new RegExp(`\\*\\*Q${i + 1}\\.`);
            endMatch = content.match(endRegex);
        }

        let endIndex = endMatch ? endMatch.index : content.length;
        const qBlock = content.substring(startIndex, endIndex);

        // 1. QUESTION
        const optAMatch = qBlock.match(/\nA\.\s/);
        if (!optAMatch) continue;

        let qText = qBlock.substring(0, optAMatch.index);
        qText = qText.replace(new RegExp(`\\*\\*Q${i}\\.\\s*`), '').trim();
        qText = qText.replace(/\*\*/g, '');

        // 2. OPTIONS
        const ansHeaderMatch = qBlock.match(/\*\*Correct Answer:/);
        let optsEndIndex = ansHeaderMatch ? ansHeaderMatch.index : qBlock.length;

        const optionsBlock = qBlock.substring(optAMatch.index, optsEndIndex);
        const lines = optionsBlock.split('\n');
        let opts = [];
        let currentOpt = '';

        lines.forEach(line => {
            line = line.trim();
            if (line.match(/^[A-D]\.\s/)) {
                if (currentOpt) opts.push(currentOpt);
                currentOpt = line.replace(/^[A-D]\.\s/, '').trim();
            } else if (line.length > 0 && currentOpt) {
                currentOpt += ' ' + line;
            }
        });
        if (currentOpt) opts.push(currentOpt);

        // 3. ANSWER
        let ansIndex = 0;
        if (ansHeaderMatch) {
            const ansLine = qBlock.substring(ansHeaderMatch.index);
            const letterMatch = ansLine.match(/\*\*Correct Answer:\s*([A-D])/);
            if (letterMatch) {
                ansIndex = letterMatch[1].charCodeAt(0) - 'A'.charCodeAt(0);
            }
        }

        // 4. EXPLANATION (REFINED)
        // Goal: Remove "**Rule/Concept:** ..." and keep only "**Logic:** ..." content (without the "Logic:" label)

        // Steps:
        // a. Isolate explanation block
        const explHeaderMatch = qBlock.match(/\*\*Explanation:\*\*/);
        let explanation = "";
        if (explHeaderMatch) {
            let rawExp = qBlock.substring(explHeaderMatch.index + explHeaderMatch[0].length).trim();

            // b. Look for "Logic:" marker
            // It appears as `* **Logic:**` usually.
            const logicMatch = rawExp.match(/\*\s*\*\*Logic:\*\*\s*/);

            if (logicMatch) {
                // Keep everything AFTER Logic:
                explanation = rawExp.substring(logicMatch.index + logicMatch[0].length).trim();
            } else {
                // Fallback if no Logic tag: try to strip Rule/Concept if present
                // Logic: usually comes AFTER Rule/Concept.
                // If we can't find Logic, maybe it's just text.
                explanation = rawExp;
                // cleanup generic bullets
            }

            // c. Final Cleanup
            explanation = explanation.replace(/\r?\n|\r/g, " "); // join lines
            explanation = explanation.replace(/^\*\s*/, ''); // remove leading bullet if any leftover
        }

        questions[i] = {
            q: qText,
            o: opts,
            a: ansIndex,
            e: explanation
        };
    }

    // Split into sets 113, 114
    const s113 = []; // 1-25
    const s114 = []; // 26-50

    for (let i = 1; i <= 25; i++) if (questions[i]) s113.push(questions[i]);
    for (let i = 26; i <= 50; i++) if (questions[i]) s114.push(questions[i]);

    const rawJson = JSON.stringify({
        113: s113,
        114: s114
    }, null, 2);

    const injectionContent = rawJson.substring(rawJson.indexOf('{') + 1, rawJson.lastIndexOf('}'));

    // READ QUIZZES.TS
    let tsContent = fs.readFileSync(targetFile, 'utf8');

    // UPDATE EXISTING SETS 113 & 114
    // We need to replace the PREVIOUS injection.
    // We can look for `  "113": [` start point and `  "114": [ ... ]` end point.
    // Or simpler: We know the structure.
    // We can regex replace the entire block for 113 and 114.

    // Regex: 
    // "113": \[[\s\S]*?\}\s*\]\s*,\s*"114": \[[\s\S]*?\}\s*\]
    // Caution: The last set might not have a comma if it's at end of object.
    // But in our previous injection, we appended it.

    // Let's use a safer marker approach if possible.
    // We added them at the end of the object `ALL_SETS_DATA`.
    // We can find `"113": [` and go until `};`? No, `};` ends the whole object.
    // We can find `"113": [` and delete everything until `};` and then re-inject.

    const startMarker = /"113":\s*\[/;
    const endMarker = /};\s*interface RawQuestion/;

    const startMatch = tsContent.match(startMarker);
    const endMatch = tsContent.match(endMarker);

    if (startMatch && endMatch) {
        // Remove old 113 & 114
        // We keep the content BEFORE 113.
        // But we need to handle the comma before 113 if it exists.
        // Actually, my previous injection prepend a comma: `,${injectionContent}`.
        // So checking for `,"113":` might be better.

        const removalStart = tsContent.indexOf('"113":');
        // Look back for comma?
        // const preRemoval = tsContent.substring(0, removalStart);
        // It's safer to just replace from "113": ... to end of object, then re-append.

        // But wait, "113" is inside the object.
        // Let's truncate the file content at the point where "113" starts, 
        // ensuring we handle the preceding comma if we want to be clean, 
        // OR just overwrite.

        // Cleanest:
        // 1. Find `ALL_SETS_DATA` end `};`
        // 2. We appended before that.
        // 3. Since we JUST added them, they are at the end.
        // 4. Let's just strip them out and add again.

        // Regex to find "113": ... up to "114": ... ] ... (end of array)

        // Let's construct the new block `,"113": ..., "114": ...`
        // And replace the old block `,"113": ..., "114": ...`

        // Problem: Regex matching large blocks can be tricky with stack limits or greedy matching.
        // But 50 questions isn't THAT huge.

        // Strategy:
        // Find `,"113": [`
        // Find `};`
        // Replace everything between with the new content (excluding `};` of course).

        const dataStart = tsContent.indexOf('"113": [');
        // Check if there is a comma before it
        let replaceStart = dataStart;
        if (tsContent[dataStart - 1] === ',') {
            // replaceStart = dataStart - 1; // Include comma?
            // No, out injection string `injectionContent` starts with `"113": ...`
            // We want to replace ` "113": ... ... ]` with new content.
            // IF we use the exact same structure, it's fine.
        } else {
            // Maybe it was `,\n  "113": [`
        }

        if (dataStart === -1) {
            console.error("Could not find existing Set 113 to replace.");
            process.exit(1);
        }

        const dataEnd = tsContent.lastIndexOf('};');

        const before = tsContent.substring(0, dataStart);
        const after = tsContent.substring(dataEnd); // Includes }; and following

        // injectionContent starts with "113": ...
        // We just stitch them.
        tsContent = before + injectionContent + '\n' + after;

        fs.writeFileSync(targetFile, tsContent, 'utf8');
        console.log("Successfully updated quizzes.ts with REFINED GDS MCQs");
    } else {
        console.error("Could not find markers for replacement.");
        process.exit(1);
    }

} catch (err) {
    console.error(err);
    process.exit(1);
}
