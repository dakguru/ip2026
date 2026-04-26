
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const MockResultSchema = new mongoose.Schema({
    userEmail: String,
    score: Number,
    answers: { type: Map, of: Number },
    testId: String
});

const MockResult = mongoose.models.MockResult || mongoose.model('MockResult', MockResultSchema);

async function inspectResult() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const result = await MockResult.findOne({ testId: "psgb-mock-2026-04-26" });
        if (result) {
            console.log(`Email: ${result.userEmail}`);
            console.log(`Score: ${result.score}`);
            console.log(`Answers Map Size: ${result.answers.size}`);
            console.log(`Answer for psgb-04-q14: ${result.answers.get('psgb-04-q14')}`);
        } else {
            console.log("No results found for test");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

inspectResult();
