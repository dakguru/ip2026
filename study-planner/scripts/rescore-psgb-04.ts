
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
}

// Define Schema (Simplified for script)
const MockResultSchema = new mongoose.Schema({
    userEmail: String,
    score: Number,
    answers: Map,
    testId: String,
    totalQuestions: Number
});

const MockResult = mongoose.models.MockResult || mongoose.model("MockResult", MockResultSchema);

async function rescore() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected.");

        const testId = "psgb-mock-2026-04-26";
        const questionId = "psgb-04-q14";
        const newCorrectIndex = 3; // Option D
        const oldCorrectIndex = 1; // Option B

        console.log(`Finding results for test: ${testId}...`);
        const results = await MockResult.find({ testId });
        console.log(`Found ${results.length} results.`);

        let updatedCount = 0;

        for (const result of results) {
            const answers = result.answers;
            if (!answers) continue;

            const userSelected = answers.get(questionId);
            
            // "Award 2 marks who opted the option D (3)"
            if (userSelected === newCorrectIndex) {
                console.log(`User ${result.userEmail} selected D. Awarding 2 marks.`);
                result.score += 2;
                await result.save();
                updatedCount++;
            }
        }

        console.log(`Successfully updated ${updatedCount} records.`);
        process.exit(0);
    } catch (error) {
        console.error("Error during rescoring:", error);
        process.exit(1);
    }
}

rescore();
