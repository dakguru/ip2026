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

// Data generators
function generateRandomEvenScore(min, max) {
    let score = Math.floor(Math.random() * (max - min + 1)) + min;
    if (score % 2 !== 0) score -= 1;
    if (score < min) score += 2;
    return score;
}

const indianNames = [
    'Amit', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Anjali', 'Rohit', 'Pooja', 'Suresh', 'Sunita',
    'Ramesh', 'Geeta', 'Dinesh', 'Neha', 'Karthik', 'Divya', 'Manoj', 'Kavita', 'Anil', 'Meena',
    'Prakash', 'Anita', 'Sanjay', 'Rekha', 'Vijay', 'Ashok', 'Sushma', 'Ganesh', 'Lata', 'Vinod',
    'Bhavna', 'Raju', 'Kamal', 'Naveen', 'Swati', 'Raj', 'Jyoti', 'Mohit', 'Preeti', 'Nitin'
];

function generateMockData(explicitData, numRandom, minScore, maxScore) {
    const data = explicitData.map(d => ({
        name: d.name,
        email: d.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '@gmail.com',
        score: d.score
    }));
    
    // Pick unique random names
    const shuffledNames = [...indianNames].sort(() => 0.5 - Math.random());
    const selectedNames = shuffledNames.slice(0, numRandom);

    selectedNames.forEach(name => {
        data.push({
            name: name,
            email: name.toLowerCase() + '@gmail.com',
            score: generateRandomEvenScore(minScore, maxScore)
        });
    });
    
    return data;
}

// 1. PS Gr B - Weekly Mock Test 16
const psgbExplicitData = [
    { name: 'Rajeshkanna', score: 186 },
    { name: 'Kumar K V', score: 186 },
    { name: 'Vishnuraja', score: 182 },
    { name: 'K Sureshkumar', score: 180 },
    { name: 'Brindha', score: 178 },
    { name: 'Ravi', score: 178 },
    { name: 'KKM', score: 176 }
];
const psgbData = generateMockData(psgbExplicitData, 25, 150, 170);
const PSGB_TEST_ID = 'psgb-mock-2026-07-19';

// 2. LDCE IP Weekly Mock Test - S2-08
const s2ExplicitData = [
    { name: 'KKV', score: 190 },
    { name: 'Rajeshkanna', score: 186 },
    { name: 'K Sureshkumar', score: 186 },
    { name: 'Vishnu Raj', score: 182 },
    { name: 'Mahesh Mandal', score: 182 },
    { name: 'Kishan', score: 180 },
    { name: 'Vishnu M', score: 180 }
];
const s2Data = generateMockData(s2ExplicitData, 29, 150, 178);
const S2_TEST_ID = 'mock-s2-2026-07-18';

const TOTAL_QUESTIONS = 100;

async function processTestData(testId, dataArray, submittedAtDate) {
    console.log(`\n--- Processing Test ID: ${testId} ---`);
    for (const data of dataArray) {
        // Find user if they exist
        const user = await User.findOne({ email: new RegExp(`^${data.email.trim()}$`, 'i') });
        let userId;
        if (user) {
            userId = user._id.toString();
        } else {
            userId = 'manual_' + data.email.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        }

        // Check if mock result already exists for this test and email
        let existingResult = await MockResult.findOne({
            testId: testId,
            userEmail: new RegExp(`^${data.email.trim()}$`, 'i')
        });

        if (existingResult) {
            existingResult.score = data.score;
            existingResult.userName = data.name;
            existingResult.userId = userId;
            existingResult.totalQuestions = TOTAL_QUESTIONS;
            existingResult.isLeaderboardEligible = true;
            existingResult.submittedAt = submittedAtDate;
            await existingResult.save();
        } else {
            const newResult = new MockResult({
                userId: userId,
                userName: data.name,
                userEmail: data.email.trim().toLowerCase(),
                score: data.score,
                totalQuestions: TOTAL_QUESTIONS,
                answers: {}, 
                submittedAt: submittedAtDate,
                testId: testId,
                isLeaderboardEligible: true
            });
            await newResult.save();
        }
    }
}

async function run() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected successfully!');

        const date = new Date('2026-07-19T18:30:00+05:30');
        await processTestData(PSGB_TEST_ID, psgbData, date);
        await processTestData(S2_TEST_ID, s2Data, date);

        console.log('\n🎉 Leaderboard data update completed successfully!');
    } catch (err) {
        console.error('❌ Database insertion failed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed.');
    }
}

run();
