const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');

const uri = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";
const targetId = "6a0c93ecc4d0af046a6ac1dc";

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const collection = client.db().collection('daksutras');
        const doc = await collection.findOne({ _id: new ObjectId(targetId) }) || await collection.findOne({ _id: targetId });
        
        if (!doc) {
            console.log('Doc not found');
            return;
        }

        // We will start fresh from the original JSON file to ensure we don't mess up our previous half-replacements
        const rawData = JSON.parse(fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_entries_full.json', 'utf8'));
        const entry = rawData[targetId].entry;

        let g = entry.guru_explanation || '';
        let e = entry.exam_insight || '';
        let p = entry.practical_example || '';

        // Safely replace 147 -> 154
        g = g.replace(/147/g, 'Rule_TMP_154');
        e = e.replace(/147/g, 'Rule_TMP_154');
        p = p.replace(/147/g, 'Rule_TMP_154');

        // 148 -> 155
        g = g.replace(/148/g, 'Rule_TMP_155');
        e = e.replace(/148/g, 'Rule_TMP_155');
        p = p.replace(/148/g, 'Rule_TMP_155');

        // 149 -> 162
        g = g.replace(/149/g, 'Rule_TMP_162');
        e = e.replace(/149/g, 'Rule_TMP_162');
        p = p.replace(/149/g, 'Rule_TMP_162');

        // 150 -> 161
        g = g.replace(/150/g, 'Rule_TMP_161');
        e = e.replace(/150/g, 'Rule_TMP_161');
        p = p.replace(/150/g, 'Rule_TMP_161');

        // 155 -> 163 (Two-Bid System). Note: don't touch Rule_TMP_155
        g = g.replace(/155(?![\w])/g, 'Rule_TMP_163');
        e = e.replace(/155(?![\w])/g, 'Rule_TMP_163');
        p = p.replace(/155(?![\w])/g, 'Rule_TMP_163');

        // 156 -> 166 (Single Tender)
        g = g.replace(/156/g, 'Rule_TMP_166');
        e = e.replace(/156/g, 'Rule_TMP_166');
        p = p.replace(/156/g, 'Rule_TMP_166');

        // 175 -> 170 (Bid Security)
        g = g.replace(/175/g, 'Rule_TMP_170');
        e = e.replace(/175/g, 'Rule_TMP_170');
        p = p.replace(/175/g, 'Rule_TMP_170');

        // 176 -> 171 (Perf Security)
        g = g.replace(/176/g, 'Rule_TMP_171');
        e = e.replace(/176/g, 'Rule_TMP_171');
        p = p.replace(/176/g, 'Rule_TMP_171');

        // Now restore all Rule_TMP_
        g = g.replace(/Rule_TMP_/g, '');
        e = e.replace(/Rule_TMP_/g, '');
        p = p.replace(/Rule_TMP_/g, '');

        // Specific text fix in guru: "Ban GTE(161)" to "Ban GTE(161(iv))"
        g = g.replace(/Ban GTE\(161\)/g, 'Ban GTE(161(iv))');
        
        // Let's also fix the 159, 160, 161 header in guru
        g = g.replace(/159·160·161/g, '159·160·161(iv)');
        
        let result = await collection.updateOne({ _id: new ObjectId(targetId) }, { $set: { guru_explanation: g, exam_insight: e, practical_example: p } });
        if (result.matchedCount === 0) {
             result = await collection.updateOne({ _id: targetId }, { $set: { guru_explanation: g, exam_insight: e, practical_example: p } });
        }
        
        console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main();
