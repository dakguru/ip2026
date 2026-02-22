import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MockResultSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: { type: Map, of: Number },
    submittedAt: { type: Date, default: Date.now },
    testId: { type: String, default: 'admin-sample' },
    isLeaderboardEligible: { type: Boolean, default: true }
});

const MockResult = mongoose.models.MockResult || mongoose.model("MockResult", MockResultSchema);

const testId = "mock-2026-02-21";
const data = [
    { score: 92, userName: "Ananya ", userEmail: "ananya.sharma99@gmail.com" },
    { score: 90, userName: "Arjun Mehra", userEmail: "arjunmehra.vns@gmail.com" },
    { score: 90, userName: "Priyanka Nair", userEmail: "priyanka.nair88@gmail.com" },
    { score: 86, userName: "R Deshmukh", userEmail: "rohan.desh101@gmail.com" },
    { score: 82, userName: "Ishaan", userEmail: "ishaanmalhotra@gmail.com" },
    { score: 80, userName: "Sneha Reddy", userEmail: "sneha.reddy94@gmail.com" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB.");

        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            const exists = await MockResult.findOne({ userEmail: item.userEmail, testId: testId });
            if (!exists) {
                // Slightly increment time so sorting correctly resolves ties if same score
                const submittedAt = new Date(new Date("2026-02-21T10:00:00+05:30").getTime() + i * 10000);

                await MockResult.create({
                    userId: `manual-${Date.now()}-${i}`,
                    userName: item.userName,
                    userEmail: item.userEmail,
                    score: item.score,
                    totalQuestions: 50,
                    answers: {}, // Empty answers
                    testId: testId,
                    submittedAt,
                    isLeaderboardEligible: true
                });
                console.log(`Inserted: ${item.userName}`);
            } else {
                console.log(`Already exists: ${item.userName}`);
            }
        }
    } catch (error) {
        console.error("Error seeding Mock Test 06 data:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seed();
