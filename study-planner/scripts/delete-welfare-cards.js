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

// The 3 welfare card IDs to delete
const WELFARE_IDS = [
    '69f2b8f3f9080f70cf20bdb7',
    '69f2b8f3f9080f70cf20bdb8',
    '69f2b8f3f9080f70cf20bdb9',
];

const WELFARE_TITLES = [
    "Welfare Measures: Death, Illness & Calamity Assistance (Dept & GDS)",
    "Welfare Measures: Scholarships & Educational Grants (Dept & GDS)",
    "Welfare Measures: Circle Welfare Fund for GDS (CWFGDS) & PSSWB Structure",
];

async function run() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        // Delete welfare cards from MongoDB by act_name
        const res = await col.deleteMany({
            act_name: "Welfare Measurement of Dept Employee and GDS"
        });
        console.log(`✓ Deleted from MongoDB: ${res.deletedCount} documents.`);

        // Clean up dak_sutra_data.json
        const dataPath = path.resolve(__dirname, '../dak_sutra_data.json');
        if (fs.existsSync(dataPath)) {
            let fileData = fs.readFileSync(dataPath, 'utf8');
            fileData = fileData.replace(/^\uFEFF/, '');
            let data = JSON.parse(fileData);
            if (data && data.entries) {
                const initialLen = data.entries.length;
                data.entries = data.entries.filter(entry => {
                    return !WELFARE_TITLES.includes(entry.title);
                });
                const finalLen = data.entries.length;
                fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), 'utf8');
                console.log(`✓ Cleaned dak_sutra_data.json: ${initialLen} → ${finalLen} entries (removed ${initialLen - finalLen}).`);
            }
        }

    } catch (err) {
        console.error("❌ Script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

run();
