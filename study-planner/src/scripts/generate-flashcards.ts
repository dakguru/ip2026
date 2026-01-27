
import * as fs from 'fs';
import * as path from 'path';

// This script will be run via npx ts-node
// It parses the quizzes.ts and other mock data files to generate flashcards.

interface MCQ {
    q: string;
    o: string[];
    a: number;
    e?: string;
}

interface FlashCard {
    pdf_title: string;
    topic: string;
    card_no: number;
    question: string;
    answer: string;
    explanation?: string;
    exam_weight: "High" | "Medium" | "Low";
    keywords: string[];
    source_mcq_id?: string;
}

const REJECT_PATTERNS = [
    /following/i,
    /not true/i,
    /incorrect/i,
    /except/i,
    /NOT/i,
    /TRUE/i,
    /FALSE/i,
    /select the/i,
    /find the/i,
    /Which of the/i,
    /Which one/i,
    /Consider the/i,
    /Assertion \(A\)/i,
    /reason \(R\)/i,
    /Match the/i,
    /Arrange the/i,
    /All of the above/i,
    /None of the above/i,
    /Both .* and .*/i,
    /Only .* and .*/i,
    /code below/i,
    /code given below/i
];

function isCompatible(q: string, options: string[]): boolean {
    if (REJECT_PATTERNS.some(pattern => pattern.test(q))) return false;

    // Check options for multi-choice meta-options
    if (options.some(o => /all of the above|none of the above|both [ab] and [bc]|only [123]/i.test(o))) return false;

    // Check if question asks for "Which" without a direct subject
    if (/^Which (is|was|are|were)/i.test(q)) return false;

    return true;
}

function cleanQuestion(q: string): string {
    let cleaned = q.trim();

    // Remove leading numbers like "1. ", "10) "
    cleaned = cleaned.replace(/^\d+[\.\)]\s*/, '');

    // Rewrite if it's a statement with "means:" or "is:"
    if (cleaned.endsWith(':')) {
        cleaned = cleaned.slice(0, -1);
        if (!cleaned.toLowerCase().includes('what') && !cleaned.toLowerCase().includes('who') && !cleaned.toLowerCase().includes('how')) {
            cleaned = "What is defined as " + cleaned + "?";
        }
    }

    // Ensure it ends with a question mark if it's an interrogative
    if (!cleaned.endsWith('?') && (cleaned.toLowerCase().startsWith('what') || cleaned.toLowerCase().startsWith('who') || cleaned.toLowerCase().startsWith('how') || cleaned.toLowerCase().startsWith('when') || cleaned.toLowerCase().startsWith('where') || cleaned.toLowerCase().startsWith('which'))) {
        cleaned += '?';
    }

    return cleaned;
}

function generateKeywords(q: string, a: string): string[] {
    const words = [...q.split(/\s+/), ...a.split(/\s+/)];
    const stopWords = new Set(['what', 'is', 'the', 'of', 'in', 'and', 'for', 'to', 'a', 'with', 'on', 'as', 'at', 'by', 'under']);
    const keywords = words
        .map(w => w.replace(/[^\w]/g, '').toLowerCase())
        .filter(w => w.length > 3 && !stopWords.has(w));
    return Array.from(new Set(keywords)).slice(0, 5);
}

async function run() {
    const quizzesPath = path.join(process.cwd(), 'src/data/quizzes.ts');
    const content = fs.readFileSync(quizzesPath, 'utf8');

    // We can't easily import from here due to potential ESM/CJS issues in a script, 
    // so we'll use a regex to extract the ALL_SETS_DATA and QUIZ_TOPICS

    // For simplicity, I'll extract the data blocks
    const setsMatch = content.match(/const ALL_SETS_DATA: Record<number, any\[\]> = (\{[\s\S]*?\n\s*\});/);
    if (!setsMatch) {
        console.error("Could not find ALL_SETS_DATA");
        return;
    }

    // Evaluate the sets data (carefully)
    // Note: The data in quizzes.ts is mostly JSON-like but with comments and trailing commas.
    // We'll use a safer approach: evaluate it in a controlled way or parse it.
    // Since it's a TS file with specific structure, we can try to "lazy-eval" it by cleaning it up.

    let setsDataStr = setsMatch[1]
        .replace(/\/\/.*$/gm, '') // remove comments
        .replace(/(\w+):/g, '"$1":') // quote keys
        .replace(/,\s*}/g, '}') // remove trailing commas
        .replace(/,\s*\]/g, ']'); // remove trailing commas

    let allSets: Record<number, MCQ[]> = {};
    try {
        // Some lines might still be tricky (like multi-line strings or escaped chars)
        // If JSON.parse fails, we'll use eval as a fallback in this controlled environment
        allSets = JSON.parse(setsDataStr);
    } catch (e) {
        // Fallback to eval for complex TS structures
        try {
            allSets = eval(`(${setsMatch[1]})`);
        } catch (e2) {
            console.error("Failed to parse sets data", e2);
            return;
        }
    }

    // Extract Topic mappings
    const topicsMatch = [...content.matchAll(/createTopic\('([^']*)', '([^']*)', '([^']*)'(?:, \[([\d, ]*)\])?\)/g)];
    const topics = topicsMatch.map(m => ({
        id: m[1],
        title: m[2],
        category: m[3],
        sets: m[4] ? m[4].split(',').map(s => parseInt(s.trim())) : []
    }));

    const auditLog: any[] = [];
    const allFlashCards: Record<string, FlashCard[]> = {};
    const seenCards = new Set<string>(); // Global duplicate tracking

    let totalScanned = 0;
    let totalRejected = 0;
    let totalCreated = 0;
    let totalDuplicates = 0;

    for (const topic of topics) {
        const topicCards: FlashCard[] = [];
        let topicScanned = 0;
        let topicRejected = 0;
        let topicDuplicates = 0;

        for (const setId of topic.sets) {
            const questions = allSets[setId] || [];
            topicScanned += questions.length;

            questions.forEach((qObj, idx) => {
                const questionText = qObj.q;
                const options = qObj.o || [];

                if (isCompatible(questionText, options)) {
                    const front = cleanQuestion(questionText);
                    const answerText = options[qObj.a];

                    // Duplicate check: Normalized Front + Back
                    const cardKey = (front + '||' + answerText).toLowerCase().replace(/\s+/g, '');
                    if (seenCards.has(cardKey)) {
                        topicDuplicates++;
                        return;
                    }
                    seenCards.add(cardKey);

                    let explanation = qObj.e || "";
                    // Clean up explanation (remove "Correct Answer: " prefix)
                    explanation = explanation.replace(/^Correct Answer:\s*/i, '').trim();
                    if (!explanation) explanation = `The correct answer is ${answerText}.`;

                    topicCards.push({
                        pdf_title: topic.title,
                        topic: topic.category,
                        card_no: topicCards.length + 1,
                        question: front,
                        answer: answerText,
                        explanation: explanation,
                        exam_weight: "Medium",
                        keywords: generateKeywords(front, answerText),
                        source_mcq_id: `q-set${setId}-${idx}`
                    });
                } else {
                    topicRejected++;
                }
            });
        }

        if (topicCards.length > 0) {
            allFlashCards[topic.id] = topicCards;
            totalCreated += topicCards.length;
        }

        totalScanned += topicScanned;
        totalRejected += topicRejected;
        totalDuplicates += topicDuplicates;

        auditLog.push({
            topic_name: topic.title,
            total_mcqs: topicScanned,
            rejected_mcqs: topicRejected,
            duplicates_removed: topicDuplicates,
            flashcards_created: topicCards.length
        });
    }

    // Output JSON Summary
    const summary = {
        total_mcqs_scanned: totalScanned,
        total_mcqs_rejected: totalRejected,
        total_duplicates_removed: totalDuplicates,
        total_flashcards_created: totalCreated,
        topics: auditLog
    };

    console.log(JSON.stringify(summary, null, 2));

    // Write the generated flashcards to a file
    const outputDir = path.join(process.cwd(), 'src/data/flashcards');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    // We'll create separate files for each topic if they don't exist, 
    // or just a big one called 'generated_from_mcq.ts'

    let outputContent = 'import { FlashCard } from "../../types";\n\n';

    for (const [topicId, cards] of Object.entries(allFlashCards)) {
        const varName = topicId.replace(/-/g, '_');
        outputContent += `export const ${varName}: FlashCard[] = ${JSON.stringify(cards, null, 4)};\n\n`;
    }

    fs.writeFileSync(path.join(outputDir, 'generated_from_mcq.ts'), outputContent);

    // Save audit log
    fs.writeFileSync(path.join(process.cwd(), 'flashcards_audit_log.json'), JSON.stringify(summary, null, 2));
}

run();
