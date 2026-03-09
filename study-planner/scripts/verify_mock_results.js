const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('study-planner');
        const mockResults = db.collection('mockresults');

        const results = await mockResults.find({ testId: "mock-2026-03-07" }).sort({ score: -1 }).toArray();
        console.log(`Found ${results.length} results for mock-2026-03-07`);
        results.forEach((r, i) => {
            console.log(`${i + 1}. ${r.userName} (${r.userEmail}) - ${r.score}/100 - ${r.submittedAt}`);
        });
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
