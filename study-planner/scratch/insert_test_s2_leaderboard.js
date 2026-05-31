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

// Define inline schemas
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

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

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const MockResult = mongoose.models.MockResult || mongoose.model('MockResult', MockResultSchema);

// Data to insert for Weekly Mock Test (s2-2026-05-30)
const mockData = [
    { name: 'Parthiban K', email: 'parthiban.07@gmail.com', score: 194 },
    { name: 'Rajesh Kannan', email: 'kannan.rajesh@gmail.com', score: 190 },
    { name: 'KS Surya', email: 'kss.ipklesubdn@gmail.com', score: 190 },
    { name: 'Vishnu', email: 'vishnuthepostalasst@gmail.com', score: 156 },
    { name: 'M M Kumaran', email: 'mmkumaran.99@gmail.com', score: 160 }
];

const TEST_ID = 'mock-s2-2026-05-30';
const TOTAL_QUESTIONS = 100;

async function run() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected successfully!');

        for (const data of mockData) {
            console.log(`\nProcessing: ${data.name} (${data.email}) - Score: ${data.score}`);

            // Find user if they exist
            const user = await User.findOne({ email: new RegExp(`^${data.email.trim()}$`, 'i') });
            let userId;
            if (user) {
                console.log(`👤 Found registered user! ID: ${user._id}`);
                userId = user._id.toString();
            } else {
                userId = 'manual_' + data.email.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                console.log(`ℹ️ User not registered. Generated manual ID: ${userId}`);
            }

            // Check if mock result already exists for this test and email
            let existingResult = await MockResult.findOne({
                testId: TEST_ID,
                userEmail: new RegExp(`^${data.email.trim()}$`, 'i')
            });

            if (existingResult) {
                console.log(`⚠️ Result already exists. Updating it...`);
                existingResult.score = data.score;
                existingResult.userName = data.name;
                existingResult.userId = userId;
                existingResult.totalQuestions = TOTAL_QUESTIONS;
                existingResult.isLeaderboardEligible = true;
                existingResult.submittedAt = new Date('2026-05-30T15:30:00+05:30'); // realistic submission date
                await existingResult.save();
                console.log(`✅ Result updated successfully!`);
            } else {
                console.log(`➕ Result does not exist. Creating new record...`);
                const newResult = new MockResult({
                    userId: userId,
                    userName: data.name,
                    userEmail: data.email.trim().toLowerCase(),
                    score: data.score,
                    totalQuestions: TOTAL_QUESTIONS,
                    answers: {}, // empty manual answers map
                    submittedAt: new Date('2026-05-30T15:30:00+05:30'),
                    testId: TEST_ID,
                    isLeaderboardEligible: true
                });
                await newResult.save();
                console.log(`✅ Result inserted successfully!`);
            }
        }

        console.log('\n🎉 Leaderboard data update completed successfully!');
    } catch (err) {
        console.error('❌ Database insertion failed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed.');
    }
}

run();
