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

async function fix() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        const r = await col.updateOne(
            { title: "Money Order — Types, Limits & Procedure" },
            {
                $set: {
                    act_name: "Post Office Regulations, 2024",
                    rule_number: "Regulation 145–156",
                    official_text: `<p><strong>Money Order: Definition</strong></p>
<p>Money order (MO) shall be an order issued by the Post Office for the payment of a sum of money to the person in whose name the money order is sent, by the remitter.</p>
<h4>Categories of Money Orders</h4>
<p>As per Regulation 147, Money Orders are booked under the following categories:</p>
<ol>
  <li><strong>Retail Money Order:</strong> Money is remitted from a person to another person within the country.</li>
  <li><strong>Bulk Money Order:</strong> Where money is remitted by one person to many persons, or from many persons to one person.</li>
  <li><strong>Service Money Order:</strong> For departmental or official purposes.</li>
</ol>
<h4>Limits (Regulation 145)</h4>
<ul>
  <li>Maximum amount for a <strong>single MO</strong>: <strong>₹10,000</strong> (excluding fraction of a rupee).</li>
  <li>Maximum amount remitted through retail MO to a person in a month: <strong>₹25,000</strong>.</li>
</ul>
<h4>Commission</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Amount</th><th style="border:1px solid #ccc;padding:6px">Commission</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">For every ₹20 or part thereof</td><td style="border:1px solid #ccc;padding:6px">₹1</td></tr>
</table>
<p><em>Exemption:</em> Remittances to PM's Relief Fund, PM CARES Fund, or Chief Minister's Relief Fund are transmitted free of charge.</p>
<h4>Period of Currency & Void MO</h4>
<p>The currency period of the money order expires at the <strong>end of the last day of the second month</strong> following the month of issue. If it remains unpaid at the end of this period, it is treated as a <strong>void money order</strong>. The amount of a money order unpaid beyond <strong>three years</strong> from the date of booking is forfeited to the Government.</p>`,
                    guru_explanation: `<p>The Post Office Regulations, 2024 brought a massive overhaul to the Money Order service. Forget the old rules — here is what you need to know now:</p>
<h4>1. The Limits Have Changed</h4>
<p>Earlier, the limit for a single MO was ₹5,000. Now, under Regulation 145, the maximum amount for a single MO is <strong>₹10,000</strong>. Additionally, there is a new cap: you cannot remit more than <strong>₹25,000</strong> to a single person in a month via retail money orders.</p>
<h4>2. Only 3 Categories Now</h4>
<p>The old classifications (Ordinary MO, Instant MO/iMO, Mobile MO) are gone from the core regulations. They are now officially categorized simply as <strong>Retail, Bulk, and Service</strong> money orders.</p>
<h4>3. Shorter Currency Period</h4>
<p>An MO now becomes "void" at the end of the <strong>second month</strong> following the month of its issue. However, the hard deadline for total forfeiture remains <strong>3 years</strong> from the date of booking — after which the money goes to the Government.</p>
<h4>4. Flat Commission Rate</h4>
<p>The complicated old slabs are gone. The commission is simply <strong>₹1 for every ₹20</strong> (or fraction thereof). That equates to a 5% commission rate across the board.</p>`,
                    practical_example: `<p><strong>Scenario 1 — Commission Calculation (2024 Rules):</strong> Arun sends a Retail Money Order of ₹850 to his mother. What commission does he pay?</p>
<p><strong>Calculation:</strong></p>
<ul>
  <li>Commission = ₹1 for every ₹20 or part thereof</li>
  <li>₹850 ÷ ₹20 = 42.5 → rounds up to 43 parts</li>
  <li>Commission = 43 × ₹1 = <strong>₹43</strong></li>
  <li>Total paid by Arun = ₹850 + ₹43 = <strong>₹893</strong></li>
</ul>
<p><strong>Scenario 2 — Monthly Limit:</strong> An employer tries to send three retail money orders of ₹10,000 each to the same employee within the same month.</p>
<p><strong>Answer:</strong> The first two MOs (₹20,000 total) will be booked. The third MO will be rejected or limited to ₹5,000, because the maximum retail MO limit to a single person in a month is strictly <strong>₹25,000</strong>.</p>`,
                    exam_insight: `<p><strong>Critical New Numbers for the Exam (Post Office Regulations 2024):</strong></p>
<ul>
  <li>Single MO maximum limit: <strong>₹10,000</strong></li>
  <li>Monthly limit to one person (retail MO): <strong>₹25,000</strong></li>
  <li>Commission rate: <strong>₹1 for every ₹20</strong> or fraction thereof</li>
  <li>MO becomes void: End of <strong>second month</strong> following the month of issue</li>
  <li>MO amount forfeited to Govt: After <strong>3 years</strong> from booking</li>
  <li>Official Categories: <strong>Retail, Bulk, Service</strong> MO</li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-bottom:10px">
  <strong>COMMON MISTAKE:</strong> "The maximum amount for a single Money Order is ₹5,000." — <strong>FALSE!</strong> It is now <strong>₹10,000</strong> under Regulation 145(2) of the 2024 Regulations. Ensure you use the updated limits in your exam!
</div>`,
                    updatedAt: new Date()
                }
            }
        );

        console.log(r.modifiedCount ? "✅ Fix applied successfully." : "⚠️  Entry not found");
    } catch (err) {
        console.error("❌ Fix script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

fix();
