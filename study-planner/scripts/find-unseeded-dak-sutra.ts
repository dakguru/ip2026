import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not found');

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();
        const daksutras = await db.collection('daksutras').find({}, { projection: { title: 1 } }).toArray();
        const dbTitles = new Set(daksutras.map(d => d.title));

        const scriptsDir = path.resolve(process.cwd(), 'scripts');
        const seedFiles = fs.readdirSync(scriptsDir).filter(f => f.startsWith('seed-dak-sutra') && f.endsWith('.js'));

        console.log(`Found ${seedFiles.length} seed files.\n`);

        for (const file of seedFiles) {
            const content = fs.readFileSync(path.join(scriptsDir, file), 'utf8');
            // Basic regex to find titles in entries array
            const titleMatches = content.matchAll(/title:\s*["'](.+?)["']/g);
            let fileTotal = 0;
            let fileUnseeded = [];

            for (const match of titleMatches) {
                const title = match[1];
                fileTotal++;
                if (!dbTitles.has(title)) {
                    fileUnseeded.push(title);
                }
            }

            if (fileUnseeded.length > 0) {
                console.log(`📁 File: ${file}`);
                console.log(`   Found ${fileUnseeded.length} unseeded entries (out of ${fileTotal}):`);
                fileUnseeded.forEach(t => console.log(`   - ${t}`));
            }
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
