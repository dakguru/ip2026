
/**
 * Dak Sutra Seed Script — Prevention of Money-Laundering Act (PMLA), 2002
 * SECOND VERSION: Precision-aligned with Project Notes (pmla_raw.txt & new_pmla_data.txt)
 *
 * Run: node scripts/seed-dak-sutra-pmla.js
 */

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
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found');
    process.exit(1);
}

const now = new Date();

const entries = [

    // ═══════════════════════════════════════════════════════════════════════════
    // 1. MASTER TIME LIMITS — PMLA, 2002
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Master Time Limits — Prevention of Money-Laundering Act (PMLA), 2002",
        rule_number: "Sections 5, 8, 12, 13, 17, 18, 26, 42",
        act_name: "Prevention of Money-Laundering Act (PMLA), 2002",
        category: "Section",
        effective_date: new Date("2005-07-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<p><strong>Strict compliance with these timelines is mandatory under the Act to ensure the legality of searches, seizures, and attachments.</strong></p>

<h4>A. Attachment & Seizure Time Limits</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Stage / Provision</th>
    <th style="border:1px solid #ccc;padding:8px">Time Limit</th>
    <th style="border:1px solid #ccc;padding:8px">Section</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Validity of Provisional Attachment Order</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>180 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 5(1)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Complaint to Adjudicating Authority (after attachment)</td>
    <td style="border:1px solid #ccc;padding:8px">Within <strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 5(5)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Notice period to indicate source of income etc.</td>
    <td style="border:1px solid #ccc;padding:8px">Minimum <strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 8(1)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Initial retention period for seized records/property</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>180 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 17/20</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Application for extension of retention</td>
    <td style="border:1px solid #ccc;padding:8px">Within <strong>30 days</strong> of seizure</td>
    <td style="border:1px solid #ccc;padding:8px">Section 17(4)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Production of searched person to Officer/Magistrate</td>
    <td style="border:1px solid #ccc;padding:8px">Within <strong>24 hours</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 18/19</td>
  </tr>
</table>

<h4>B. Appeals Hierarchy Timeline</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Appeal Route</th>
    <th style="border:1px solid #ccc;padding:8px">Time Limit</th>
    <th style="border:1px solid #ccc;padding:8px">Section</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Adjudicating Authority → Appellate Tribunal</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>45 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 26</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Appellate Tribunal → High Court</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>60 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 42</td>
  </tr>
</table>`,

        guru_explanation: `
<p><strong>Precision Alerts:</strong></p>
<ul>
  <li><strong>The 180-Day Rule:</strong> This applies TWICE — once for provisional attachment (S.5) and once for initial retention of seized property (S.17).</li>
  <li><strong>Notice Period:</strong> When the Authority issues a show-cause notice under Section 8, the respondent must be given <em>not less than</em> 30 days to reply.</li>
  <li><strong>Stay Exclusion:</strong> Always remember that any period where investigation is stayed by a Court is <strong>excluded</strong> from the 365-day investigation limit.</li>
  <li><strong>Enforcement Date:</strong> The Act is from 2002, but it was enforced on <strong>01 July 2005</strong>.</li>
</ul>`,

        practical_example: `
<p><strong>Scenario:</strong> A property is attached on 1 Jan. The Director fails to file a complaint by 31 Jan. What happens?<br>
<strong>Answer:</strong> The attachment becomes void as the 30-day limit for filing a complaint to the Adjudicating Authority (S.5(5)) has passed.</p>`,

        exam_insight: `
<p><strong>⭐ High-Yield Dates:</strong></p>
<ul>
  <li>Enactment: <strong>17 Jan 2003</strong></li>
  <li>Commencement: <strong>1 July 2005</strong></li>
</ul>
<p><strong>🔴 Common MCQ:</strong> "Maximum period for which property can be provisionally attached?" -> <strong>180 days</strong>.</p>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. OFFENCES, PUNISHMENTS & BAIL — PMLA, 2002
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Offences, Punishments & Bail Standards (PMLA)",
        rule_number: "Sections 3, 4, 24, 45, 62",
        act_name: "Prevention of Money-Laundering Act (PMLA), 2002",
        category: "Section",
        effective_date: new Date("2005-07-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<h4>Section 3 & 4: The Core Offence</h4>
<p>Money laundering involves concealment, possession, acquisition, or projecting Proceeds of Crime as untainted. It is <strong>Cognizable and Non-Bailable</strong> (Section 45).</p>

<table style="width:100%;border-collapse:collapse">
  <tr style="background:#ffe8e8">
    <th style="border:1px solid #ccc;padding:8px">Offence</th>
    <th style="border:1px solid #ccc;padding:8px">Punishment</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Standard Money Laundering</td>
    <td style="border:1px solid #ccc;padding:8px">Rigorous Imprisonment (RI) <strong>3 to 7 years</strong> + Fine</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Offence related to NDPS Act</td>
    <td style="border:1px solid #ccc;padding:8px">RI up to <strong>10 years</strong> + Fine</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Vexatious Search by Officer</td>
    <td style="border:1px solid #ccc;padding:8px">Imprisonment up to <strong>2 years</strong> or Fine up to ₹50,000</td>
  </tr>
</table>

<h4>Section 45: Bail Conditions</h4>
<p>Bail is usually denied unless the "Twin Conditions" are met (Public Prosecutor opportunity + Court belief in innocence). However, these are relaxed for:</p>
<ul>
  <li>Person under <strong>16 years</strong></li>
  <li>A <strong>Woman</strong></li>
  <li><strong>Sick or Infirm</strong> person</li>
  <li>Money laundering value <strong>less than ₹1 Crore</strong></li>
</ul>`,

        guru_explanation: `
<p>The <strong>₹1 Crore Threshold</strong> is the magic number for two things:</p>
<ol>
  <li><strong>Scheduled Offence (Part B):</strong> Only becomes a PMLA trigger if value > ₹1 Cr.</li>
  <li><strong>Bail:</strong> Strict bail conditions are relaxed if the laundering amount is < ₹1 Cr.</li>
</ol>
<p>Also, note that statements to ED officers (Section 50) are <strong>admissible</strong> in court, unlike statements to the Police, because ED proceedings are "Judicial Proceedings".</p>`,

        practical_example: `
<p><strong>Scenario:</strong> A woman is accused of laundering ₹50 Lakhs. Does she get relaxed bail?<br>
<strong>Answer:</strong> <strong>Yes</strong>, on two grounds: she is a woman AND the amount is less than ₹1 Crore.</p>`,

        exam_insight: `
<p><strong>⭐ Burden of Proof (Sec 24):</strong> In PMLA, the burden of proof that property is untainted lies on the <strong>Accused</strong>. This is the opposite of general criminal law.</p>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. POSTAL SPECIFIC: KYC & RECORD RETENTION
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Postal Specific: KYC Risks & Record Retention Schedule",
        rule_number: "Section 12 & PLI Records Schedule",
        act_name: "Prevention of Money-Laundering Act (PMLA), 2002",
        category: "Section",
        effective_date: new Date("2005-07-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<p><strong>Records must be maintained for 5 years after the business relationship ends. However, the specific schedule for PLI/RPLI policies is highly detailed.</strong></p>

<h4>A. PLI/RPLI Record Retention Table</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#e8f4ff">
    <th style="border:1px solid #ccc;padding:8px">Policy Status</th>
    <th style="border:1px solid #ccc;padding:8px">Retention Period</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Premia < 3 years (Lapsed)</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>5 years after date of Maturity</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Premia ≥ 3 years (Surrendered)</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>5 years after payment</strong> of surrender value</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Forced Surrendered policies</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>5 years after date of 'Forced Surrender'</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Cancelled during 'Free Look'</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>5 years after cancellation</strong> of the policy</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Subject of Court/Litigation Case</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>3 years after final clearance</strong> from litigation</td>
  </tr>
</table>

<h4>B. KYC Risk Categorization (POSB)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0ffff">
    <th style="border:1px solid #ccc;padding:8px">Risk Category</th>
    <th style="border:1px solid #ccc;padding:8px">Criteria (Balance/Maturity)</th>
    <th style="border:1px solid #ccc;padding:8px">Re-KYC Frequency</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px"><strong>Low Risk</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Less than or equal to <strong>₹50,000</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Every <strong>7 years</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px"><strong>Medium Risk</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Between <strong>₹50,000</strong> and <strong>₹10 Lakh</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Every <strong>5 years</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px"><strong>High Risk</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Above <strong>₹10 Lakh</strong> / PEPs</td>
    <td style="border:1px solid #ccc;padding:8px">Every <strong>2 years</strong></td>
  </tr>
</table>`,

        guru_explanation: `
<p><strong>Trap Alert on Lapsed Policies:</strong> Pay close attention to the retention for lapsed policies (less than 3 years premia). It is NOT 5 years from context or lapse date, but <strong>5 years after the date of Maturity</strong>. This is a frequent trick question.</p>
<p><strong>Re-KYC Freeze:</strong> If a customer fails to update KYC, they get a notice at the next transaction. If not done after notice, the <strong>4th transaction</strong> will not be allowed.</p>`,

        practical_example: `
<p><strong>Scenario:</strong> A high-risk account holder last updated KYC in 2024. When is it next due?<br>
<strong>Answer:</strong> 2026 (High Risk = every 2 years).</p>`,

        exam_insight: `
<p><strong>⭐ Reporting Thresholds:</strong></p>
<ul>
  <li>CTR: Transactions totaling > <strong>₹10 Lakh</strong> in a month.</li>
  <li>PLI Premium: > <strong>₹5 Lakh</strong> a month.</li>
  <li>Free Look Ref/: > <strong>₹1 Lakh</strong> refund with 3+ requests.</li>
</ul>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    }
];

async function seed() {
    const client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 60000,
        connectTimeoutMS: 60000
    });
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('daksutras');

        // Overwrite existing entries for this act to ensure precision update
        await collection.deleteMany({ act_name: "Prevention of Money-Laundering Act (PMLA), 2002" });
        console.log('🧹 Cleaned existing PMLA entries for precision update.');

        for (const entry of entries) {
            const result = await collection.insertOne(entry);
            console.log(`🚀 Precision Seeding: ${entry.title} (_id: ${result.insertedId})`);
        }

        console.log('✨ Precision alignment completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await client.close();
    }
}

seed();
