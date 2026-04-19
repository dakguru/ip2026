const { MongoClient } = require('mongodb');

// URI from the template integrate_mock_08_results.js
const uri = 'mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0';
const client = new MongoClient(uri);

const results = [
    { name: "Kumar Srivastava", email: "kumar.sharma99@gmail.com", score: 92, date: "2026-04-19T10:30:00" },
    { name: "Arjun M", email: "arjunmehra.vns@gmail.com", score: 88, date: "2026-04-19T11:45:00" },
    { name: "Priyanka Nair", email: "priyanka.nair88@gmail.com", score: 86, date: "2026-04-19T14:15:00" },
    { name: "Deshmukh Rohan", email: "rohan.desh101@gmail.com", score: 82, date: "2026-04-19T16:20:00" },
    { name: "Ishaan", email: "ishaanmalhotra@gmail.com", score: 82, date: "2026-04-19T18:05:00" }
];

const testId = "psgb-mock-2026-04-19";
const totalQuestions = 50;

async function run() {
    try {
        await client.connect();
        const db = client.db('study-planner');
        const mockResults = db.collection('mockresults');
        const users = db.collection('users');

        console.log(`Connected to DB. Processing ${results.length} results for ${testId}...`);

        for (const res of results) {
            // Find user to get real userId if available
            const user = await users.findOne({ email: res.email });
            const userId = user ? user._id.toString() : `temp_user_${Math.random().toString(36).substr(2, 9)}`;

            const resultDoc = {
                userId: userId,
                userName: res.name,
                userEmail: res.email,
                score: res.score,
                totalQuestions: totalQuestions,
                answers: {}, // Empty as we only have the total score
                submittedAt: new Date(res.date),
                testId: testId,
                isLeaderboardEligible: true
            };

            // Check if already exists
            const existing = await mockResults.findOne({ userEmail: res.email, testId: testId });
            if (existing) {
                await mockResults.updateOne({ _id: existing._id }, { $set: resultDoc });
                console.log(`Updated result for ${res.email}`);
            } else {
                await mockResults.insertOne(resultDoc);
                console.log(`Inserted result for ${res.email}`);
            }
        }

        console.log("Integration complete!");
    } catch (error) {
        console.error("Error during integration:", error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
