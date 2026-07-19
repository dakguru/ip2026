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

const explicitData = [
    { name: 'Rajeshkanna', score: 186 },
    { name: 'Kumar K V', score: 186 },
    { name: 'Vishnuraja', score: 182 },
    { name: 'K Sureshkumar', score: 180 },
    { name: 'Brindha', score: 178 },
    { name: 'Ravi', score: 178 },
    { name: 'KKM', score: 176 }
];

const randomNames = [
    'Amit', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Anjali', 'Rohit', 'Pooja', 'Suresh', 'Sunita',
    'Ramesh', 'Geeta', 'Dinesh', 'Neha', 'Karthik', 'Divya', 'Manoj', 'Kavita', 'Anil', 'Meena',
    'Prakash', 'Anita', 'Sanjay', 'Rekha', 'Vijay'
];

const mockData = explicitData.map(d => ({
    name: d.name,
    email: d.name.toLowerCase().replace(/\s+/g, '') + '@gmail.com',
    score: d.score
}));

randomNames.forEach(name => {
    mockData.push({
        name: name,
        email: name.toLowerCase() + '@gmail.com',
        score: 150 + Math.floor(Math.random() * 11) * 2 // Even scores between 150 and 170
    });
});

const TEST_ID = 'psgb-mock-2026-07-19';
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
                existingResult.submittedAt = new Date('2026-07-19T18:30:00+05:30');
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
                    submittedAt: new Date('2026-07-19T18:30:00+05:30'),
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
