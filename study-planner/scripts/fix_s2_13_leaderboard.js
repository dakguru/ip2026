const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Setup paths
const PROJECT_ROOT = path.resolve(__dirname, '../');
const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
const envPath = path.join(PROJECT_ROOT, '.env');

// Load environment variables
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config({ path: envPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI not found in .env or .env.local');
    process.exit(1);
}

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

const TEST_ID = 'mock-s2-2026-08-22';

async function run() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected successfully!');

        // 1. Delete KKV's entry
        const kkvResult = await MockResult.deleteMany({
            testId: TEST_ID,
            userEmail: new RegExp('^kkv@gmail\\.com$', 'i')
        });
        console.log(`🗑️ Deleted KKV entries: ${kkvResult.deletedCount}`);

        // 2. Delete Ravi Teja's entry
        const raviResult = await MockResult.deleteMany({
            testId: TEST_ID,
            userEmail: new RegExp('^raviteja@gmail\\.com$', 'i')
        });
        console.log(`🗑️ Deleted Ravi Teja entries: ${raviResult.deletedCount}`);

        // 3. Update Rajeshkanna's score from 194 to 192
        const rajeshResult = await MockResult.updateOne(
            {
                testId: TEST_ID,
                userEmail: new RegExp('^rajeshkanna@gmail\\.com$', 'i')
            },
            { $set: { score: 192 } }
        );
        console.log(`✏️ Updated Rajeshkanna's score to 192: ${rajeshResult.modifiedCount} modified`);

        console.log('\n🎉 S2-13 leaderboard fix completed successfully!');
    } catch (err) {
        console.error('❌ Database operation failed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed.');
    }
}

run();
