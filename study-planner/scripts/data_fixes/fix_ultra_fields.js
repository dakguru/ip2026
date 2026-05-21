const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";
const targetId = "6a0c93ecc4d0af046a6ac1dc";

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('daksutras');

        let doc = await collection.findOne({ _id: new ObjectId(targetId) });
        if (!doc) {
            doc = await collection.findOne({ _id: targetId });
        }
        if (!doc) {
            console.log('Document not found!');
            return;
        }

        let guru = doc.guru_explanation || '';
        let exam = doc.exam_insight || '';
        let practical = doc.practical_example || '';

        // Guru Explanation Replacements
        guru = guru.replace(/147→150/g, '154, 155, 161, 162');
        guru = guru.replace(/147=No Quote\(≤50K\) → 148=LPC\(50K-5L\) → 149=LTE\(≤50L\) → 150=ATE\(50L\+\)/g, '154=No Quote(≤50K) → 155=LPC(50K-5L) → 162=LTE(≤50L) → 161=ATE(50L+)');
        guru = guru.replace(/155 · 156/g, '163 · 166');
        guru = guru.replace(/155 = Two-Bid \(both submitted together\); 156 = Single Tender/g, '163 = Two-Bid (both submitted together); 166 = Single Tender');
        guru = guru.replace(/155 splits; 156 singles/g, '163 splits; 166 singles');
        guru = guru.replace(/159·160·161/g, '159·160·161(iv)');
        guru = guru.replace(/175 · 176/g, '170 · 171');
        guru = guru.replace(/175=Bid Security\(2-5%, 45 days\); 176=Performance Security\(3-5%, 60 days\)/g, '170=Bid Security(2-5%, 45 days); 171=Performance Security(3-5%, 60 days)');
        // Flowchart boxes
        guru = guru.replace(/<div style="font-size:22px;font-weight:900;margin-bottom:4px">147<\/div>/g, '<div style="font-size:22px;font-weight:900;margin-bottom:4px">154</div>');
        guru = guru.replace(/<div style="font-size:22px;font-weight:900;margin-bottom:4px">148<\/div>/g, '<div style="font-size:22px;font-weight:900;margin-bottom:4px">155</div>');
        guru = guru.replace(/<div style="font-size:22px;font-weight:900;margin-bottom:4px">149<\/div>/g, '<div style="font-size:22px;font-weight:900;margin-bottom:4px">162</div>');
        guru = guru.replace(/<div style="font-size:22px;font-weight:900;margin-bottom:4px">150<\/div>/g, '<div style="font-size:22px;font-weight:900;margin-bottom:4px">161</div>');
        guru = guru.replace(/Rules 147·148·149·150/g, 'Rules 154, 155, 162, 161');
        // Two-Bid vs Two-Stage
        guru = guru.replace(/Two-Bid \(155\) vs. Two-Stage \(164\)/g, 'Two-Bid (163) vs. Two-Stage (164)');
        guru = guru.replace(/Rule 155 — TWO-BID SYSTEM/g, 'Rule 163 — TWO-BID SYSTEM');
        guru = guru.replace(/📂 Rule 155/g, '📂 Rule 163');
        guru = guru.replace(/155=B/g, '170=B'); // just in case

        // Exam Insight Replacements
        exam = exam.replace(/155 vs 164/g, '163 vs 164');
        exam = exam.replace(/155<\/strong> = Price IS submitted/g, '163</strong> = Price IS submitted');
        exam = exam.replace(/175 vs 176/g, '170 vs 171');
        exam = exam.replace(/175<\/strong> = Bid Security \(comes FIRST\); <strong>176/g, '170</strong> = Bid Security (comes FIRST); <strong>171');
        exam = exam.replace(/175 before 176/g, '170 before 171');
        exam = exam.replace(/147–150/g, '154, 155, 161, 162');
        exam = exam.replace(/175–176/g, '170–171');
        exam = exam.replace(/Bid\(175\) before Performance\(176\)/g, 'Bid(170) before Performance(171)');
        
        // The Ultra Revision Grid
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">147<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">No Quotation/g, '<div style="font-size:20px;font-weight:900">154</div><div style="opacity:0.8;font-size:11px;margin-top:2px">No Quotation');
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">148<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">LPC/g, '<div style="font-size:20px;font-weight:900">155</div><div style="opacity:0.8;font-size:11px;margin-top:2px">LPC');
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">149<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">LTE/g, '<div style="font-size:20px;font-weight:900">162</div><div style="opacity:0.8;font-size:11px;margin-top:2px">LTE');
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">150<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">ATE/g, '<div style="font-size:20px;font-weight:900">161</div><div style="opacity:0.8;font-size:11px;margin-top:2px">ATE');
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">155<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">Two-Bid System/g, '<div style="font-size:20px;font-weight:900">163</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Two-Bid System');
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">156<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">Single Tender/g, '<div style="font-size:20px;font-weight:900">166</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Single Tender');
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">175<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">Bid Security/g, '<div style="font-size:20px;font-weight:900">170</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Bid Security');
        exam = exam.replace(/<div style="font-size:20px;font-weight:900">176<\/div><div style="opacity:0.8;font-size:11px;margin-top:2px">Perf. Security/g, '<div style="font-size:20px;font-weight:900">171</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Perf. Security');

        // Practical Example Replacements (if any)
        practical = practical.replace(/Rule 155/g, 'Rule 163');
        practical = practical.replace(/Rule 149/g, 'Rule 162');
        practical = practical.replace(/Rule 150/g, 'Rule 161');

        console.log("Updating document in MongoDB...");
        let result = await collection.updateOne(
            { _id: new ObjectId(targetId) },
            { $set: { 
                guru_explanation: guru,
                exam_insight: exam,
                practical_example: practical
            }}
        );
        if (result.matchedCount === 0) {
             result = await collection.updateOne(
                { _id: targetId },
                { $set: { 
                    guru_explanation: guru,
                    exam_insight: exam,
                    practical_example: practical
                }}
            );
        }
        console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();
