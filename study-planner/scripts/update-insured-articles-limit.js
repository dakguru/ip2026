
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

async function update() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const collection = client.db().collection('daksutras');

        const updatedEntry = {
            title: "Insured Articles — Rules, Limits & Compensation Procedure",
            rule_number: "Regulation 133 (as amended by S.O. 1595(E), 25 March 2026)",
            act_name: "Post Office Regulations, 2024",
            category: "Regulation",
            effective_date: new Date("2026-04-01"),
            exam_tags: ["LDCE IP", "PS Group B", "GDS"],
            official_text: `<p><strong>Insured Articles — Overview</strong></p>
<p>Any postal article (letter, parcel, etc.) containing articles of <strong>value</strong> may be insured against loss or damage in the postal system. Insurance is a declaration of value by the sender, and the Post Office undertakes to pay compensation equal to the insured value (subject to maximum limits) in case of loss or damage.</p>

<h4>Recent Amendment — S.O. 1595(E) dated 25 March 2026</h4>
<div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 14px;border-radius:6px;margin:8px 0">
  <p style="margin:0"><strong>Post Office (Third Amendment) Regulations, 2026</strong><br>
  In the Post Office Regulations, 2024, in <strong>Regulation 133, sub-regulation (1)</strong>, for the words <em>"not exceeding one lakh rupees"</em>, the words <em>"not exceeding five lakh rupees"</em> shall be substituted.<br>
  <strong>Effective: 1st April, 2026</strong> &nbsp;|&nbsp; Issued by: Vivek Kumar Daksh, Dy. Director General &nbsp;|&nbsp; F. No. F-01-01/2024-PO-Part (1)</p>
</div>

<h4>Articles That Can Be Insured</h4>
<ul>
  <li>Letters and parcels containing currency, jewellery, valuables, documents, electronic items</li>
  <li>Articles must be properly packed to withstand transit</li>
</ul>

<h4>Maximum Insurable Value (w.e.f. 1 April 2026)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Category</th><th style="border:1px solid #ccc;padding:6px">Limit</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Domestic insured articles (Regulation 133)</td><td style="border:1px solid #ccc;padding:6px"><strong>₹5,00,000 (₹5 lakh)</strong> per article</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Before 1 April 2026 (old limit)</td><td style="border:1px solid #ccc;padding:6px">₹1,00,000 (₹1 lakh)</td></tr>
</table>

<h4>Insurance Fee</h4>
<p>Insurance fee is charged in addition to normal postage. The fee is calculated based on the declared insured value as per the slab rates notified by the Department.</p>

<h4>Compensation for Loss — Conditions</h4>
<ul>
  <li>Compensation is payable if the article is <strong>lost, rifled, or damaged</strong> in transit.</li>
  <li>The sender must establish the <strong>actual value</strong> of the loss — compensation cannot exceed the actual value OR the insured amount, whichever is <strong>lower</strong>.</li>
  <li>Compensation is <strong>not payable</strong> if the loss/damage is due to the <strong>inherent defect</strong> of the article or improper packing by the sender.</li>
  <li>Compensation is <strong>not payable</strong> if the loss occurred due to <strong>act of God</strong> (flood, earthquake, etc.) or enemy action.</li>
</ul>

<h4>Procedure for Claim</h4>
<ol>
  <li>Sender files complaint at booking post office.</li>
  <li>Inquiry is conducted by the Division.</li>
  <li>If confirmed lost/damaged, claim is processed by the competent authority.</li>
  <li>Amount sanctioned and paid by Money Order/NEFT.</li>
</ol>`,

            guru_explanation: `<p>Insurance is the financial safety net for valuable postal articles. The government has <strong>significantly enhanced the protection</strong> w.e.f. 1 April 2026 by raising the cap from ₹1 lakh to ₹5 lakh. Here's the complete picture:</p>

<h4>Registration vs Insurance — The Final Word</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">Registration</th><th style="border:1px solid #ccc;padding:6px">Insurance</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Purpose</td><td style="border:1px solid #ccc;padding:6px">Accountability &amp; tracking</td><td style="border:1px solid #ccc;padding:6px">Monetary protection</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Delivery</td><td style="border:1px solid #ccc;padding:6px">Against signature</td><td style="border:1px solid #ccc;padding:6px">Against signature</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Loss Compensation</td><td style="border:1px solid #ccc;padding:6px">Up to ₹100 only</td><td style="border:1px solid #ccc;padding:6px">Up to declared/insured value<br><strong>(max ₹5 lakh w.e.f. 1 Apr 2026)</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Best Use Case</td><td style="border:1px solid #ccc;padding:6px">Documents, legal notices</td><td style="border:1px solid #ccc;padding:6px">Jewellery, electronics, currency</td></tr>
</table>

<h4>Why Was the Limit Raised to ₹5 Lakh?</h4>
<p>The old ₹1 lakh limit was set under earlier regulations and had become inadequate given inflation and rising value of goods being mailed — especially electronics, jewellery, and legal instruments. The <strong>Post Office (Third Amendment) Regulations, 2026</strong> [S.O. 1595(E)] raised it <strong>5× to ₹5 lakh</strong>, making insured postal service a viable alternative to private courier insurance for high-value items.</p>

<h4>The "Actual Value or Insured Value, Whichever is Lower" Rule</h4>
<p>This fundamental rule is unchanged by the amendment: If you insure a watch for ₹3,00,000 but it actually costs ₹2,00,000, and it's lost — you get only <strong>₹2,00,000</strong> (actual value). You cannot profit from insurance. Always insure for the <strong>full actual value</strong> (up to the ₹5 lakh cap).</p>

<h4>When is Compensation NOT Paid?</h4>
<ul>
  <li>Improper packing by sender (fragile goods in flimsy packaging)</li>
  <li>Inherent vice of the article (perishable goods spoiling)</li>
  <li>Force majeure — natural disasters, enemy action</li>
  <li>If the declared value at booking was lower than the claimed loss</li>
</ul>`,

            practical_example: `<p><strong>Scenario 1 (New Limit):</strong> Arjun sends gold jewellery worth ₹4,50,000 as an insured article after 1 April 2026, declaring full value. The parcel is lost.</p>
<p><strong>Answer:</strong> Under the amended Regulation 133 (w.e.f. 1 April 2026), the maximum insurable value is ₹5 lakh. Arjun's declared value ₹4,50,000 is within the limit. Compensation = <strong>₹4,50,000</strong> (subject to inquiry confirming loss).</p>

<p><strong>Scenario 2 (Before vs After the Amendment):</strong> The same jewellery (₹4,50,000) was sent before 1 April 2026 — the maximum insurable value was then ₹1 lakh.</p>
<p><strong>Answer:</strong> Arjun could insure only up to ₹1,00,000. Even if he declared ₹4,50,000, the Post Office would only pay <strong>₹1,00,000</strong> (old cap). The ₹3,50,000 balance would have been an uninsured loss. This shows the importance of the amendment.</p>

<p><strong>Scenario 3 (Under-insurance):</strong> Rita sends a laptop worth ₹80,000 but insures it for only ₹50,000 to save on the insurance fee. It's lost.</p>
<p><strong>Answer:</strong> Compensation = lower of actual (₹80,000) and insured (₹50,000) = <strong>₹50,000</strong>. She loses ₹30,000 by under-insuring. Always insure for full actual value.</p>`,

            exam_insight: `<p><strong>Key Numbers & Rules — Updated as per S.O. 1595(E) dated 25 March 2026:</strong></p>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Parameter</th><th style="border:1px solid #ccc;padding:6px">Before 1 Apr 2026</th><th style="border:1px solid #ccc;padding:6px">From 1 Apr 2026</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Max insurable value</td><td style="border:1px solid #ccc;padding:6px">₹1,00,000</td><td style="border:1px solid #ccc;padding:6px"><strong>₹5,00,000</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Governing provision</td><td style="border:1px solid #ccc;padding:6px">Regulation 133(1)</td><td style="border:1px solid #ccc;padding:6px">Regulation 133(1) as amended</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Amendment notification</td><td style="border:1px solid #ccc;padding:6px">—</td><td style="border:1px solid #ccc;padding:6px">S.O. 1595(E), 25 March 2026</td></tr>
</table>
<ul>
  <li>Registered article (uninsured) loss compensation: <strong>₹100 only</strong> (unchanged)</li>
  <li>Compensation rule: lower of <strong>actual value or insured value</strong> (unchanged)</li>
  <li>Compensation NOT payable: improper packing, force majeure, inherent defect (unchanged)</li>
  <li>Amendment name: <strong>Post Office (Third Amendment) Regulations, 2026</strong></li>
  <li>Issued by: <strong>Vivek Kumar Daksh, Dy. DG</strong>, under section 13 of Post Office Act, 2023</li>
</ul>
<p><strong>Hot Exam MCQ (expect this in 2026 exams):</strong> "What is the maximum value up to which a domestic postal article can be insured with effect from 1st April, 2026?" — Answer: <strong>₹5,00,000 (₹5 lakh)</strong>.</p>
<p><strong>Trap Question:</strong> "The maximum insurable value for postal articles is ₹1 lakh" — <strong>FALSE</strong> (was true before 1 April 2026; now it is ₹5 lakh).</p>`,

            status: "published",
            updatedAt: new Date()
        };

        const result = await collection.updateOne(
            { title: "Insured Articles — Rules, Limits & Compensation Procedure" },
            {
                $set: {
                    rule_number: updatedEntry.rule_number,
                    act_name: updatedEntry.act_name,
                    category: updatedEntry.category,
                    effective_date: updatedEntry.effective_date,
                    exam_tags: updatedEntry.exam_tags,
                    official_text: updatedEntry.official_text,
                    guru_explanation: updatedEntry.guru_explanation,
                    practical_example: updatedEntry.practical_example,
                    exam_insight: updatedEntry.exam_insight,
                    updatedAt: updatedEntry.updatedAt
                }
            }
        );

        if (result.matchedCount === 0) {
            console.error("❌ Entry not found in DB — check the title.");
        } else if (result.modifiedCount === 1) {
            console.log("✅ Successfully updated: Insured Articles entry");
            console.log("   - Insurance limit: ₹1 lakh → ₹5 lakh");
            console.log("   - Effective date: 1 April 2026");
            console.log("   - Act updated to: Post Office Regulations, 2024 (amended)");
            console.log("   - Rule number updated to: Regulation 133, S.O. 1595(E)");
        } else {
            console.log("ℹ️  Entry found but no changes made (already up to date).");
        }

    } catch (err) {
        console.error("❌ Update failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

update();
