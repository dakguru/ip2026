
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
if (!MONGODB_URI) { console.error('❌ MONGODB_URI not found'); process.exit(1); }

async function dump() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        const entries = await col.find({}).toArray();
        const tmpDir = path.resolve(__dirname, '../tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }
        fs.writeFileSync(path.resolve(tmpDir, 'dak-sutra-dump.json'), JSON.stringify(entries, null, 2));

        console.log(`✅ Dumped ${entries.length} Dak Sutra entries to tmp/dak-sutra-dump.json`);

    } catch (err) {
        console.error("❌ Dump script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

dump();
