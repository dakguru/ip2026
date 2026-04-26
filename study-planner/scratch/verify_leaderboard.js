
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const MockResultSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    score: Number,
    totalQuestions: Number,
    testId: String,
    submittedAt: Date
});

const MockResult = mongoose.models.MockResult || mongoose.model('MockResult', MockResultSchema);

async function checkResults() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const testId = "psgb-mock-2026-04-26";
        const results = await MockResult.find({ testId }).sort({ score: -1, submittedAt: 1 }).limit(10);
        
        console.log(`Top Results for ${testId}:`);
        results.forEach((r, i) => console.log(`${i+1}. ${r.userName} | ${r.userEmail} | Score: ${r.score} | Submitted: ${r.submittedAt}`));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkResults();
