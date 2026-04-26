
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

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

const MockResult = mongoose.models.MockResult || mongoose.model('MockResult', MockResultSchema);

async function insertResults() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const testId = "psgb-mock-2026-04-26";
        const resultsToInsert = [
            {
                userId: "manual-1771773879337-3",
                userName: "Deshmukh Rohan",
                userEmail: "rohan.desh101@gmail.com",
                score: 94,
                totalQuestions: 50,
                testId: testId,
                submittedAt: new Date("2026-04-25T08:00:00Z")
            },
            {
                userId: "temp_user_an9xy74ev",
                userName: "Kumar Srivastava",
                userEmail: "kumar.sharma99@gmail.com",
                score: 90,
                totalQuestions: 50,
                testId: testId,
                submittedAt: new Date("2026-04-25T08:10:00Z")
            },
            {
                userId: "manual-1771773879090-1",
                userName: "Arjun M",
                userEmail: "arjunmehra.vns@gmail.com",
                score: 88,
                totalQuestions: 50,
                testId: testId,
                submittedAt: new Date("2026-04-25T08:20:00Z")
            },
            {
                userId: "manual-1771773879462-4",
                userName: "Ishaan",
                userEmail: "ishaanmalhotra@gmail.com",
                score: 88,
                totalQuestions: 50,
                testId: testId,
                submittedAt: new Date("2026-04-25T08:30:00Z")
            },
            {
                userId: "manual-1771773879211-2",
                userName: "Priyanka Nair",
                userEmail: "priyanka.nair88@gmail.com",
                score: 86,
                totalQuestions: 50,
                testId: testId,
                submittedAt: new Date("2026-04-25T08:40:00Z")
            }
        ];

        for (const res of resultsToInsert) {
            // Update if exists, or insert
            await MockResult.findOneAndUpdate(
                { userEmail: res.userEmail, testId: res.testId },
                res,
                { upsert: true, new: true }
            );
            console.log(`Included/Updated result for: ${res.userName}`);
        }

        console.log("All results included successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

insertResults();
