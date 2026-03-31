
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

        const topicId = "69c95096a60b6cd0039e0bc6";
        
        const official_text = `<p><strong>Section 2(d) – Definition of "Post Office":</strong></p>
<p>"Post Office" means the Department of Posts and includes every house, building, room, place or any other asset used by the Post Office for providing any service.</p>
<p><strong>Section 3 – Services to be Provided:</strong></p>
<p>The Post Office shall provide such services as the Central Government may prescribe.</p>
<p><strong>Section 4 – Exclusive Privilege:</strong></p>
<p>The Post Office shall have the exclusive privilege of issuing postage stamps. <em>(Note: The 2023 Act contains no exclusive privilege regarding the conveyance of letters).</em></p>
<p><strong>Section 9 – Interception:</strong></p>
<p>Power to intercept, open or detain any item.</p>
<p><strong>Section 10 – Liability:</strong></p>
<p>Exemption of the Post Office and its officers from liability.</p>`;

        const guru_explanation = `<p>There are three major misconceptions floating around regarding the 2023 Act. Let's set the record straight:</p>
<ol>
  <li><strong>What is a "Post Office" Today?</strong><br/>
  The definition of "Post Office" is found in <strong>Section 2(d)</strong>, not Section 2(l). Under the new Act, a Post Office strictly refers to the Department of Posts and its physical assets (buildings, rooms, places, etc.) used to provide services. It does <em>not</em> legally encompass private entities through this specific definition.</li>
  <li><strong>The End of the Letter Monopoly (Section 3)</strong><br/>
  The biggest historical shift in the 2023 Act is the <strong>complete removal</strong> of the government's exclusive privilege to carry letters. Under the old 1898 Act, the government had a strict monopoly. Today, that monopoly is entirely gone, officially bringing private courier services under the regulatory ambit without needing "exemptions".</li>
  <li><strong>What Is Actually Section 4?</strong><br/>
  Because the letter monopoly was abolished, Section 4 no longer lists "exemptions for private couriers." Instead, Section 4 simply grants the Post Office the exclusive privilege (monopoly) over <strong>issuing postage stamps</strong>.</li>
</ol>`;

        const practical_example = `<p><strong>Scenario 1 – Section 2(d) in Practice:</strong> The Department of Posts leases an independent warehouse specifically to act as a new parcel sorting facility.</p>
<ul>
  <li><strong>Is this warehouse a "Post Office"?</strong></li>
  <li><strong>Answer: YES.</strong> Under Section 2(d), any building, room, or asset used by the Department of Posts to provide a service legally qualifies as a "Post Office".</li>
</ul>
<p><strong>Scenario 2 – Private Couriers and the Law:</strong> BlueDart Courier picks up a standard legal document from a law firm and charges ₹200 for delivery.</p>
<ul>
  <li><strong>Is this a violation of the government's exclusive privilege?</strong></li>
  <li><strong>Answer: NO.</strong> The Post Office Act, 2023 completely abolished the government's exclusive privilege over conveying letters. Private couriers operate freely because the postal monopoly on letters no longer exists, <em>not</em> because they fall under a "Section 4 exemption."</li>
</ul>`;

        const exam_insight = `<p><strong>Most Important Clarifications for the Exam:</strong></p>
<ul>
  <li><strong>COMMON MISTAKE:</strong> "Section 4 of the Post Office Act, 2023 provides exemptions for private couriers."
    <ul><li><strong>FALSE.</strong> Section 4 deals strictly with the monopoly on issuing postage stamps. The letter monopoly was removed entirely.</li></ul>
  </li>
  <li><strong>COMMON MISTAKE:</strong> "Section 2(l) defines a Post Office as any authorized entity."
    <ul><li><strong>FALSE.</strong> The definition is under Section 2(d) and focuses on the Department of Posts and its physical assets.</li></ul>
  </li>
</ul>
<p><strong>High-Probability MCQs:</strong></p>
<ul>
  <li><em>Q: Which section of the Post Office Act, 2023 grants the exclusive privilege to issue postage stamps?</em><br/><strong>Answer: Section 4.</strong></li>
  <li><em>Q: Under the Post Office Act, 2023, which section provides the power to intercept, open, or detain postal items?</em><br/><strong>Answer: Section 9.</strong></li>
</ul>`;

        const r = await col.updateOne(
            { _id: new ObjectId(topicId) },
            {
                $set: {
                    title: "Section 2(d): Definition of 'Post Office' — Post Office Act, 2023",
                    rule_number: "Section 2(d)",
                    official_text: official_text,
                    guru_explanation: guru_explanation,
                    practical_example: practical_example,
                    exam_insight: exam_insight,
                    updatedAt: new Date()
                }
            }
        );

        console.log(r.modifiedCount
            ? "✅ Successfully updated Dak Sutra topic: Section 2(d) Definition"
            : "⚠️ Topic not found or no changes made");

    } catch (err) {
        console.error("❌ Update script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

update();
