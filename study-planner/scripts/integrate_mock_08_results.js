const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0';
const client = new MongoClient(uri);

const results = [
    { name: "Arjun Meena", email: "arjun.meenaabcdef@gmail.com", score: 90, date: "2026-03-07T08:10:00" },
    { name: "P Deshmukh", email: "priya.deshpandey@gmail.com", score: 82, date: "2026-03-08T11:15:00" },
    { name: "Vicky Malhotra", email: "vicky.malhotra79@yahoo.com", score: 80, date: "2026-03-07T21:45:00" },
    { name: "Sathish Kumar N", email: "sneha.kulkarniindia@outlook.com", score: 78, date: "2026-03-08T14:30:00" },
    { name: "Ishita Sharma", email: "ishita.sharma@live.in", score: 46, date: "2026-03-08T16:55:00" },
    { name: "Rahul Chatterjee", email: "rahul.chatt@rediffmail.com", score: 36, date: "2026-03-07T23:20:00" },
    { name: "Kavita Reddy", email: "kavita.reddy88@gmail.com", score: 34, date: "2026-03-08T07:15:00" },
    { name: "Siddharth Nair", email: "sid.nair99@gmail.com", score: 30, date: "2026-03-08T22:05:00" },
    { name: "Meera Joshi", email: "meera.joshi@gmail.com", score: 28, date: "2026-03-07T13:40:00" },
    { name: "Amitabh Pandey", email: "amitabh.p@gmail.com", score: 22, date: "2026-03-08T05:22:00" }
];

const testId = "mock-2026-03-07";
const totalQuestions = 50;

async function run() {
    try {
        await client.connect();
        const db = client.db('study-planner');
        const mockResults = db.collection('mockresults');
        const users = db.collection('users');

        console.log(`Connected to DB. Processing ${results.length} results...`);

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

        console.log("Done!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
