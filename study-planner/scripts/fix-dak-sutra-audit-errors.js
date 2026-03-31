
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

async function applyFixes() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        // FIX 1: Post Office Act, 2023 (ID: 69c95096a60b6cd0039e0bb9)
        const poActFix = {
            $set: {
                official_text: `<p>The Post Office Act, 2023 received Presidential assent on <strong>24 December 2023</strong> and came into force on <strong>18 June 2024</strong>, replacing the Indian Post Office Act, 1898.</p>
<h4>Key Definitions</h4>
<ul>
  <li><strong>Section 2(d) – \"Post Office\":</strong> \"Post Office\" means the Department of Posts and includes every house, building, room, place or any other asset used by the Post Office for providing any service.</li>
  <li><strong>Section 2(j) – \"Postal article\":</strong> Includes any article (letter, postcard, parcel, newspaper, book-packet, etc.) transmissible by post.</li>
  <li><strong>Section 3 – Services to be Provided:</strong> The Post Office shall provide such services as the Central Government may, by notification, prescribe.</li>
</ul>
<h4>Exclusive Privilege (Section 4)</h4>
<p>The Post Office shall have the exclusive privilege of <strong>issuing postage stamps</strong>. Unlike the 1898 Act, the new Act does <strong>not</strong> grant any exclusive privilege (monopoly) over the conveyance of letters.</p>
<h4>Interception (Section 9)</h4>
<p>The Central Government or any officer specially authorised by it may direct interception, opening or detention of any postal article in the interest of — (i) sovereignty and integrity of India; (ii) security of the State; (iii) friendly relations with foreign states; (iv) public order, decency or morality; (v) prevention of cognisable offences.</p>
<h4>Liability of the Post Office (Section 10)</h4>
<p>The Post Office shall not incur any liability in respect of loss, misdelivery, delay or damage to any postal article, except as otherwise provided under rules. The Central Government may, by rules, provide for compensation for loss or damage.</p>`,
                guru_explanation: `<p>The Post Office Act, 2023 is a radical shift from the 1898 Act. Here's what has changed fundamentally:</p>
<ol>
  <li><strong>Monopoly on Letters is GONE:</strong> The biggest change is that the government <strong>no longer has exclusive privilege</strong> over conveying letters. Private couriers were always theoretically illegal for letters since 1898, but the 2023 Act officially ends this monopoly.</li>
  <li><strong>Postage Stamps (Section 4):</strong> The only remaining exclusive privilege is the <strong>issuing of postage stamps</strong>. No private entity can issue stamps.</li>
  <li><strong>Definition of Post Office:</strong> It's now in <strong>Section 2(d)</strong> and focused on the Department's physical assets used for service.</li>
</ol>`,
                exam_insight: `<p><strong>Exam Highlights for the 2023 Act:</strong></p>
<ul>
  <li>Act replaces: <strong>Indian Post Office Act, 1898</strong></li>
  <li>Primary source of rules: <strong>Post Office Regulations, 2024</strong></li>
  <li>Monopoly on letters: <strong>Abolished</strong></li>
  <li>Exclusive Privilege (Section 4): <strong>Issuing postage stamps</strong></li>
  <li>Post Office definition: <strong>Section 2(d)</strong></li>
  <li>Number of grounds for interception (Section 9): <strong>5 grounds</strong></li>
</ul>`,
                updatedAt: new Date()
            }
        };
        await col.updateOne({ _id: new ObjectId("69c95096a60b6cd0039e0bb9") }, poActFix);
        console.log("✅ Fixed: Post Office Act Card (Monopoly & Section refs)");

        // FIX 2: Speed Post Service (ID: 69c9d990d3aa2557b9575f8d)
        const speedPostFix = {
            $set: {
                official_text: `<p><strong>Speed Post — Introduction</strong></p>
<p>Speed Post was introduced in India on <strong>1 August 1986</strong>. It is a guaranteed time-bound delivery service.</p>
<h4>Weight & Size Limits</h4>
<table style=\"width:100%;border-collapse:collapse\">
  <tr><th style=\"border:1px solid #ccc;padding:6px\">Parameter</th><th style=\"border:1px solid #ccc;padding:6px\">Limit</th></tr>
  <tr><td style=\"border:1px solid #ccc;padding:6px\">Maximum weight (domestic)</td><td style=\"border:1px solid #ccc;padding:6px\">35 kg</td></tr>
  <tr><td style=\"border:1px solid #ccc;padding:6px\">Max length</td><td style=\"border:1px solid #ccc;padding:6px\">1.5 m</td></tr>
  <tr><td style=\"border:1px solid #ccc;padding:6px\">Max Girth + Length</td><td style=\"border:1px solid #ccc;padding:6px\">3 m</td></tr>
</table>
<h4>Compensation for Loss</h2>
<ul>
  <li>For loss of Speed Post article, or loss of its contents, or damage to its contents: <strong>Double the Speed Post charges or ₹1,000, whichever is less</strong>.</li>
  <li>For delay in delivery: <strong>Speed Post charges</strong> (excluding basic postage).</li>
</ul>`,
                guru_explanation: `<p>Speed Post is a priority service, but for the exam, remember the compensation limit is quite low compared to private couriers unless you use <strong>Insurance</strong>.</p>
<ul>
  <li>Default compensation for loss is capped at ₹1,000 or 2x charges (whichever is less).</li>
  <li>If you want higher protection, you must pay for <strong>Insurance</strong>.</li>
</ul>`,
                exam_insight: `<p><strong>Speed Post Facts:</strong></p>
<ul>
  <li>Launched: <strong>1 Aug 1986</strong></li>
  <li>Max weight: <strong>35 kg</strong></li>
  <li>Loss/Damage compensation: <strong>2x charge or ₹1,000 (lesser)</strong></li>
  <li>Delay compensation: <strong>Refund of charges</strong></li>
</ul>`,
                updatedAt: new Date()
            }
        };
        await col.updateOne({ _id: new ObjectId("69c9d990d3aa2557b9575f8d") }, speedPostFix);
        console.log("✅ Fixed: Speed Post Compensation rules");

        // FIX 3: Insured Articles (ID: 69c9d991d3aa2557b9575f91)
        const insuredFix = {
            $set: {
                official_text: `<p><strong>Insured Articles — Overview</strong></p>
<p>Articles of value may be insured against loss or damage. The Department undertakes to pay compensation equal to the insured value in case of loss or damage.</p>
<h4>Limits (Regulation 133)</h4>
<ul>
  <li>Maximum insurable value for domestic registered articles: <strong>₹1,00,000 (₹1 Lakh)</strong>.</li>
  <li>The value of a currency note insured must not exceed ₹20,000.</li>
</ul>`,
                guru_explanation: `<p>Insurance is the only way to get full value compensation for your valuables. While Speed Post and Registered Post have low fixed compensation (₹1,000 and ₹100 respectively), Insurance covers the <strong>actual value declared</strong> up to ₹1 Lakh.</p>`,
                exam_insight: `<p><strong>Critical Numbers:</strong></p>
<ul>
  <li>Max insurance limit: <strong>₹1 Lakh</strong></li>
  <li>Max insurance for currency notes: <strong>₹20,000</strong></li>
  <li>Insurance is available for Registered Letters and Registered Parcels.</li>
</ul>`,
                updatedAt: new Date()
            }
        };
        await col.updateOne({ _id: new ObjectId("69c9d991d3aa2557b9575f91") }, insuredFix);
        console.log("✅ Fixed: Insured Article limits (Reverted to correct ₹1 Lakh limit)");

        // FIX 4: Philatelic Advisory Committee (ID: 69775947196d0b3710bda5fe)
        await col.updateOne(
            { _id: new ObjectId("69775947196d0b3710bda5fe") },
            { $set: { effective_date: new Date('2024-04-01'), updatedAt: new Date() } }
        );
        console.log("✅ Fixed: PAC Metadata date");

        console.log("\n🎉 All critical audit fixes applied successfully.");

    } catch (err) {
        console.error("❌ Fix script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

applyFixes();
