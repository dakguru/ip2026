
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
const client = new MongoClient(MONGODB_URI);

async function main() {
    await client.connect();
    const collection = client.db().collection('daksutras');

    const entry = await collection.findOne({
        title: { $regex: 'CCS.*Joining Time.*Rules.*1979', $options: 'i' }
    });

    if (!entry) {
        console.error('❌ Entry not found');
        process.exit(1);
    }

    // Fix: replace the amber gradient table header with a dark high-contrast header
    const fixed = entry.official_text
        .replace(
            /background:linear-gradient\(90deg,#d97706,#b45309\)/g,
            'background:linear-gradient(90deg,#431407,#7c2d12)'
        )
        // Also fix the 2nd and 3rd <th> text color from #fde68a to white
        .replace(
            /<th style="padding:11px 14px; text-align:center; color:#fde68a;/g,
            '<th style="padding:11px 14px; text-align:center; color:#fff;'
        );

    await collection.updateOne(
        { _id: entry._id },
        { $set: { official_text: fixed, updatedAt: new Date() } }
    );

    console.log('✅ Table header color updated to dark high-contrast for:', entry.title);
    await client.close();
}

main().catch(err => { console.error(err); process.exit(1); });
