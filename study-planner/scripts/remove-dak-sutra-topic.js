
const { MongoClient, ObjectId } = require('mongodb');
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

async function remove() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        const topicId = "697792ed9c1334ee60ea3613";
        
        const r = await col.deleteOne({ _id: new ObjectId(topicId) });

        console.log(r.deletedCount
            ? "✅ Successfully removed Dak Sutra topic: " + topicId
            : "⚠️ Topic not found or already removed");

    } catch (err) {
        console.error("❌ Remove script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

remove();
