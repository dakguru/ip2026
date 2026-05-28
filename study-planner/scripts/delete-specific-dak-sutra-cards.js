const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found');
    process.exit(1);
}

async function run() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        // Delete all PMLA cards from MongoDB
        const res = await col.deleteMany({
            act_name: "Prevention of Money-Laundering Act (PMLA), 2002"
        });
        console.log(`Deleted PMLA cards: ${res.deletedCount} documents.`);

        // Clean up dak_sutra_data.json if it exists
        const dataPath = path.resolve(__dirname, '../dak_sutra_data.json');
        if (fs.existsSync(dataPath)) {
            let fileData = fs.readFileSync(dataPath, 'utf8');
            fileData = fileData.replace(/^\uFEFF/, '');
            let data = JSON.parse(fileData);
            if (data && data.entries) {
                const initialLen = data.entries.length;
                data.entries = data.entries.filter(entry => {
                    const isPMLA = entry.act_name === "Prevention of Money-Laundering Act (PMLA), 2002" || 
                                   entry.title.includes("PMLA") || 
                                   entry.title.includes("KYC Risks & Record Retention");
                    return !isPMLA;
                });
                const finalLen = data.entries.length;
                fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), 'utf8');
                console.log(`✓ Cleaned dak_sutra_data.json: filtered from ${initialLen} to ${finalLen} entries.`);
            }
        }

    } catch (err) {
        console.error("❌ Deletion script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

run();
