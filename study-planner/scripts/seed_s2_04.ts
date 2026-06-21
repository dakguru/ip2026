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

const testId = "mock-s2-2026-06-20";
const data = [
    { score: 194, userName: "Ramesh Kannan", userEmail: "rameshkannan@example.com" },
    { score: 192, userName: "K Rajesh", userEmail: "krajesh@example.com" },
    { score: 190, userName: "Vishnu", userEmail: "vishnu@example.com" },
    { score: 190, userName: "KK Siva", userEmail: "kksiva@example.com" },
    { score: 186, userName: "Suresh Kumar", userEmail: "sureshkumar@example.com" },
    { score: 186, userName: "MKK DOP", userEmail: "mkkdop@example.com" },
    { score: 182, userName: "Vinu", userEmail: "vinu@example.com" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB.");

        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            const exists = await MockResult.findOne({ userName: item.userName, testId: testId });
            if (!exists) {
                // Slightly increment time so sorting correctly resolves ties if same score
                const submittedAt = new Date(new Date("2026-06-21T10:00:00+05:30").getTime() + i * 10000);

                await MockResult.create({
                    userId: `manual-${Date.now()}-${i}`,
                    userName: item.userName,
                    userEmail: item.userEmail,
                    score: item.score,
                    totalQuestions: 100,
                    answers: {}, // Empty answers
                    testId: testId,
                    submittedAt,
                    isLeaderboardEligible: true
                });
                console.log(`Inserted: ${item.userName}`);
            } else {
                console.log(`Already exists: ${item.userName}, updating score if necessary`);
                if (exists.score !== item.score) {
                    exists.score = item.score;
                    await exists.save();
                    console.log(`Updated: ${item.userName} to ${item.score}`);
                }
            }
        }
    } catch (error) {
        console.error("Error seeding Mock Test data:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seed();
