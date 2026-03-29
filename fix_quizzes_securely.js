const fs = require('fs');
const filepath = 'D:\\IP 2026\\study-planner\\src\\data\\quizzes.ts';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Restore convertToQuizSet and Fix RawQuestion
const badPart = `export interface RawQuestion {
  q: string;
  o: string[];
  a: number;
};`;

const goodPart = `export interface RawQuestion {
  q: string;
  o: string[];
  a: number;
  e?: string;
}

export const convertToQuizSet = (setId: number, title: string, data: RawQuestion[]) => {
  return {
    id: "set-" + setId,
    title: title,
    questions: data.map((item, idx) => ({
      id: "q-" + setId + "-" + idx,
      text: item.q,
      options: item.o,
      correctAnswer: item.a,
      explanation: item.e || ("Correct Answer: " + item.o[item.a] + ".")
    }))
  };
};`;

if (content.includes(badPart)) {
    content = content.replace(badPart, goodPart);
    console.log("Restored convertToQuizSet.");
} else {
    // try with different line endings
    const badPart2 = badPart.replace(/\n/g, '\r\n');
    if (content.includes(badPart2)) {
        content = content.replace(badPart2, goodPart.replace(/\n/g, '\r\n'));
        console.log("Restored convertToQuizSet (CRLF).");
    } else {
        console.log("Could not find badPart to restore.");
    }
}

// 2. Add the question blocks to ALL_SETS_DATA
const setsEnd = `163: consolidation_set3,
};`;

const newSets = `163: consolidation_set3,
  164: po_reg_ldce_set1,
  165: po_reg_ldce_set2,
  166: po_reg_ldce_set3,
  167: po_reg_ldce_set4,
  168: po_reg_ldce_set5,
  169: po_reg_ldce_set6,
};`;

if (content.includes(setsEnd)) {
    content = content.replace(setsEnd, newSets);
    console.log("Added question blocks.");
} else {
    const setsEnd2 = setsEnd.replace(/\n/g, '\r\n');
    if (content.includes(setsEnd2)) {
        content = content.replace(setsEnd2, newSets.replace(/\n/g, '\r\n'));
        console.log("Added question blocks (CRLF).");
    } else {
        console.log("Could not find setsEnd.");
    }
}

// 3. Update createTopic with IDs
const oldTopic = `createTopic('p1-6a', 'The Post Office Regulations, 2024 (MCQs : LDCE Level)', 'Paper I', []),`;
const newTopic = `createTopic('p1-6a', 'The Post Office Regulations, 2024 (MCQs : LDCE Level)', 'Paper I', [164, 165, 166, 167, 168, 169]),`;

if (content.includes(oldTopic)) {
    content = content.replace(oldTopic, newTopic);
    console.log("Updated topic IDs.");
} else {
    const oldTopic2 = oldTopic.replace(/\n/g, '\r\n');
    if (content.includes(oldTopic2)) {
        content = content.replace(oldTopic2, newTopic.replace(/\n/g, '\r\n'));
        console.log("Updated topic IDs (CRLF).");
    } else {
        console.log("Could not find oldTopic.");
    }
}

fs.writeFileSync(filepath, content);
console.log("Done.");
