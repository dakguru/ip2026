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

const MockResult = mongoose.models.MockResult || mongoose.model("MockResult", MockResultSchema);

async function updateRanker() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        const testId = 'mock-2026-01-31';
        const currentName = 'Arul Murugan S';
        const newName = 'Arun Selvaraj';

        const result = await MockResult.findOne({ testId, userName: currentName });

        if (!result) {
            console.log(`User '${currentName}' not found for test '${testId}'.`);

            // Fallback: Check if we can find by rank (getting top 5 and picking 5th)
            // Note: This relies on the sort order being exactly as the application logic
            const topRankers = await MockResult.find({
                testId,
                isLeaderboardEligible: { $ne: false }
            })
                .sort({ score: -1, submittedAt: 1 })
                .limit(5);

            if (topRankers.length === 5) {
                const fifthRanker = topRankers[4];
                console.log(`Found 5th ranker by sorting: ${fifthRanker.userName}`);
                if (fifthRanker.userName === currentName) {
                    console.log('Ideally this should have been found by findOne query above.');
                } else {
                    console.log(`The 5th ranker is actually '${fifthRanker.userName}', not '${currentName}'. Updating this user instead.`);
                    fifthRanker.userName = newName;
                    await fifthRanker.save();
                    console.log(`Successfully updated name to '${newName}'.`);
                    return;
                }
            } else {
                console.log('Less than 5 rankers found.');
            }

            return;
        }

        console.log(`Found user: ${result.userName} (${result.userEmail})`);
        result.userName = newName;
        await result.save();
        console.log(`Successfully updated name to '${newName}'.`);

    } catch (error) {
        console.error('Error updating ranker:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

updateRanker();
