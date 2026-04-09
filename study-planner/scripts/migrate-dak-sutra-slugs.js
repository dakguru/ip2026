/**
 * Migration: Backfill 6-character alphanumeric slugs for all DakSutra entries
 * Run: node scripts/migrate-dak-sutra-slugs.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';

function generateSlug(length = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return result;
}

async function getUniqueSlug(collection, usedSlugs) {
    let slug;
    let attempts = 0;
    do {
        slug = generateSlug();
        attempts++;
        if (attempts > 1000) throw new Error('Could not generate a unique slug after 1000 attempts');
    } while (usedSlugs.has(slug));
    usedSlugs.add(slug);
    return slug;
}

async function main() {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('daksutras');

    // Get all existing slugs so we don't duplicate
    const existing = await collection.find({ slug: { $exists: true } }, { projection: { slug: 1 } }).toArray();
    const usedSlugs = new Set(existing.map(e => e.slug));
    console.log(`📋 ${usedSlugs.size} entries already have slugs`);

    // Find entries without a slug
    const needsSlugs = await collection.find({ slug: { $exists: false } }).toArray();
    console.log(`🔄 ${needsSlugs.length} entries need slugs`);

    if (needsSlugs.length === 0) {
        console.log('✅ All entries already have slugs. Nothing to do.');
        await client.close();
        return;
    }

    let updated = 0;
    for (const entry of needsSlugs) {
        const slug = await getUniqueSlug(collection, usedSlugs);
        await collection.updateOne(
            { _id: entry._id },
            { $set: { slug } }
        );
        console.log(`  ✅ ${slug}  ← "${entry.title.substring(0, 60)}"`);
        updated++;
    }

    console.log(`\n🎉 Done! ${updated} entries updated with slugs.`);
    await client.close();
}

main().catch(err => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});
