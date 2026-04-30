
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

const targetTitles = [
    "India Post: Network at a Glance — Annual Report 2024-25 & 2025-26",
    "Post Office Savings Bank (POSB): Banking Services, Schemes & Milestones",
    "India Post Payments Bank (IPPB): Digital Banking Revolution",
    "Logistics & Supply Chain: Speed Post, Parcels, MMS & Transport Network",
    "Citizen Centric Services: POPSK, Aadhaar, PO-CSC, DNK, PMEGP & More"
];

async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db();
        const col = db.collection('daksutras');

        const result = await col.updateMany(
            { title: { $in: targetTitles } },
            { $set: { act_name: "Annual Report and Book of Information" } }
        );

        console.log(`✅ Updated ${result.modifiedCount} cards.`);
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();
    }
}

main();
