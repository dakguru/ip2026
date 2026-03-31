
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

async function update() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        const topicId = "69c9d990d3aa2557b9575f8d"; // Speed Post Service
        
        // Corrected practical_example:
        // 1. Removed "He should have used courier or other means for critical time-sensitive documents."
        // 2. Fixed the compensation math to 2x charges or ₹1,000 (lesser)
        const practical_example = `<p><strong>Scenario 1 — Compensation Calculation:</strong> Meena sends a Speed Post parcel. The total charges paid were ₹60. It is lost in transit. What is the compensation?</p>
<p><strong>Calculation:</strong></p>
<ul>
  <li>Double the Speed Post charges = 2 × ₹60 = ₹120.</li>
  <li>Maximum limit per rule = ₹1,000.</li>
  <li>Compensation payable = <strong>₹120</strong> (whichever is less).</li>
</ul>
<p><strong>Scenario 2 — Late Delivery Claim:</strong> Raj sends an important tender document via Speed Post from Delhi to Chennai (standard: D+1). It arrives on Day 3 — two days late. He demands compensation for business loss.</p>
<p><strong>Answer:</strong> Under Speed Post rules, only the <strong>Speed Post charges are refunded</strong> for late delivery. Raj cannot claim business loss or consequential damages.</p>`;

        const r = await col.updateOne(
            { _id: new ObjectId(topicId) },
            {
                $set: {
                    practical_example: practical_example,
                    updatedAt: new Date()
                }
            }
        );

        console.log(r.modifiedCount
            ? "✅ Successfully updated Speed Post practical example and removed target text."
            : "⚠️ Topic not found or no changes made");

    } catch (err) {
        console.error("❌ Update script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

update();
