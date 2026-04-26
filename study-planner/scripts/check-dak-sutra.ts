import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not found');

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();
        const entries = await db.collection('daksutras').find({}, { projection: { title: 1 } }).toArray();
        console.log(`Total entries: ${entries.length}`);
        entries.forEach((e, i) => {
            console.log(`${i + 1}. ${e.title}`);
        });
    } finally {
        await client.close();
    }
}

main().catch(console.error);
