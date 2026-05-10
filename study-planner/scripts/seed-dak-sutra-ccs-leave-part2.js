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
    {
        title: "CCS (Leave) Rules, 1972 — Part 2: Study Leave & WRIIL",
        rule_number: "Various Rules",
        act_name: "Central Civil Services (Leave) Rules, 1972",
        category: "Rule",
        effective_date: new Date("1972-06-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<div style="font-family: inherit; color: #333;">
    <h3 style="color: #0d9488; border-bottom: 2px solid #ccfbf1; padding-bottom: 8px; margin-top: 0;">📜 OFFICIAL PROVISION</h3>
    <ul style="line-height: 1.6; padding-left: 20px;">
        <li style="margin-bottom: 12px;"><strong>👉 Work Related Illness and Injury Leave (WRIIL) (Rule 44):</strong> The authority competent to grant leave may grant WRIIL to a government servant (permanent or temporary) who suffers illness or injury attributable to official duties or in consequence of their official position. <strong style="color: #dc2626; background: #fee2e2; padding: 2px 6px; border-radius: 4px;">No EL or HPL</strong> will be credited during the period the employee is on WRIIL.</li>
        <li style="margin-bottom: 12px;"><strong>👉 Study Leave (Rule 50):</strong> Granted for a special course of study consisting of higher studies or specialized training in a professional or technical subject in or out of India. Shall not be granted for studies abroad if adequate facilities exist in India. The official must not be due to reach superannuation within <strong>3 years</strong> (5 years for health services) from the date of return to duty.</li>
        <li style="margin-bottom: 12px;"><strong>👉 Sexual Harassment Inquiry Leave (Rule 48):</strong> On the recommendation of the complaint committee, an aggrieved female Govt. servant may be granted up to <strong style="color: #7c3aed; background: #ede9fe; padding: 2px 6px; border-radius: 4px;">90 days</strong> of leave during the pendency of the inquiry. This leave is <em>not debited</em> against her leave account.</li>
    </ul>

    <h3 style="color: #0d9488; border-bottom: 2px solid #ccfbf1; padding-bottom: 8px; margin-top: 24px;">📊 CORE DATA / TABLES</h3>
    
    <h4 style="color: #374151; margin-bottom: 8px;">Table 1: Study Leave Limits & Eligibility (Rule 50 & 51)</h4>
    <div style="overflow-x: auto; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
            <tr style="background: linear-gradient(90deg, #0d9488 0%, #0f766e 100%); color: white;">
                <th style="padding: 12px; text-align: left; font-weight: 600;">Parameter</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Normal Government Servant</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Central Health Service (CHS)</th>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600;">Minimum Service</td>
                <td style="padding: 12px;">5 years continuous regular</td>
                <td style="padding: 12px;">5 years continuous regular</td>
            </tr>
            <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600;">Max Leave at a Time</td>
                <td style="padding: 12px;">12 months</td>
                <td style="padding: 12px;">12 months</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600;">Max Leave in Service</td>
                <td style="padding: 12px;"><span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 999px; font-weight: bold;">24 months</span></td>
                <td style="padding: 12px;"><span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 999px; font-weight: bold;">36 months (PG)</span></td>
            </tr>
            <tr style="background: #f9fafb;">
                <td style="padding: 12px; font-weight: 600;">Bond Execution Period</td>
                <td style="padding: 12px;">3 years after return</td>
                <td style="padding: 12px;">5 years after return</td>
            </tr>
        </table>
    </div>

    <h4 style="color: #374151; margin-bottom: 8px;">Table 2: Preference for Cash Equivalent in Case of Death (Rule 39-C)</h4>
    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px; margin-bottom: 12px; font-size: 0.9em; color: #92400e;">
        <span style="font-weight: bold;">Note:</span> If a Govt. servant dies, encashment is paid to the family in this strict sequence.
    </div>
    <div style="overflow-x: auto; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
            <tr style="background: linear-gradient(90deg, #ea580c 0%, #c2410c 100%); color: white;">
                <th style="padding: 12px; text-align: left; font-weight: 600; width: 20%;">Rank</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Beneficiary</th>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: bold; color: #c2410c;">1st</td>
                <td style="padding: 12px;">Widow (eldest surviving if multiple) or Husband</td>
            </tr>
            <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: bold; color: #c2410c;">2nd</td>
                <td style="padding: 12px;">Eldest surviving son or adopted son</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: bold; color: #c2410c;">3rd</td>
                <td style="padding: 12px;">Eldest surviving unmarried daughter</td>
            </tr>
            <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: bold; color: #c2410c;">4th</td>
                <td style="padding: 12px;">Eldest surviving widowed daughter</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: bold; color: #c2410c;">5th & 6th</td>
                <td style="padding: 12px;">Father (5th), then Mother (6th)</td>
            </tr>
            <tr style="background: #f9fafb;">
                <td style="padding: 12px; font-weight: bold; color: #c2410c;">7th to 11th</td>
                <td style="padding: 12px; font-size: 0.9em;">Brother (<18) → Unmarried sister → Widowed sister → Married daughter → Eldest child of eldest predeceased son</td>
            </tr>
        </table>
    </div>

    <h3 style="color: #0d9488; border-bottom: 2px solid #ccfbf1; padding-bottom: 8px; margin-top: 24px;">🔟 STEP-BY-STEP PROCESS: Departmental Leave (Rule 49)</h3>
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
            <li style="margin-bottom: 6px;"><strong>Applicability:</strong> Specifically applies to staff like Survey of India attached to survey parties.</li>
            <li style="margin-bottom: 6px;"><strong>Standard Sanction:</strong> Granted with leave salary for not more than <strong>6 months</strong> at a time.</li>
            <li style="margin-bottom: 6px;"><strong>Special Extension:</strong> Can be extended by Surveyor General up to a max of one year in all.</li>
            <li style="margin-bottom: 6px;"><strong>Postal Exception:</strong> Maximum of <strong>18 months</strong> can be granted by the PMG in DOP in special cases.</li>
            <li><strong>Salary Payout:</strong> Paid at 25% of the equal to earned leave for the first 6 months, payable after return to duty.</li>
        </ol>
    </div>

    <h3 style="color: #0d9488; border-bottom: 2px solid #ccfbf1; padding-bottom: 8px; margin-top: 24px;">💰 NUMERICAL / STRUCTURAL DATA</h3>
    
    <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <div style="flex: 1; min-width: 250px; background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px;">
            <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">🎓 Study Leave Max Absences (Rule 54)</h4>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.5; font-size: 0.95em;">
                <li><strong>General limit:</strong> 28 months (Study Leave + other leaves).</li>
                <li><strong>PhD limit:</strong> 36 months total absence.</li>
                <li><strong>Initial HRA payout:</strong> First 180 days at standard rates of the last station.</li>
            </ul>
        </div>
        
        <div style="flex: 1; min-width: 250px; background: #fdf4ff; border: 1px solid #e879f9; border-radius: 8px; padding: 16px;">
            <h4 style="color: #a21caf; margin-top: 0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">⚓ Seamen's Sick Leave (Rule 47)</h4>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.5; font-size: 0.95em;">
                <li><strong>On vessel / hospital:</strong> Full pay for max <strong>6 weeks</strong>.</li>
                <li><strong>Disabled on duty:</strong> Full pay for max <strong>3 months</strong>.</li>
            </ul>
        </div>
    </div>

    <h3 style="color: #0d9488; border-bottom: 2px solid #ccfbf1; padding-bottom: 8px; margin-top: 24px;">🏦 FACILITIES / CONDITIONS</h3>
    
    <div style="background: #f0fdfa; border-left: 4px solid #14b8a6; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 8px 8px 0;">
        <h4 style="color: #0f766e; margin-top: 0; margin-bottom: 8px;">🚑 Invalidation from Service (Rule 39-B)</h4>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
            <li><strong>Permanent Staff:</strong> Eligible for cash equivalent of leave salary for <em>both</em> EL and HPL, subject to a max of 300 days on date of invalidation.</li>
            <li><strong>Temporary Staff:</strong> Shall <em>not</em> be granted cash equivalent for HPL on invalidation.</li>
        </ul>
    </div>

    <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 12px 16px; border-radius: 0 8px 8px 0;">
        <h4 style="color: #334155; margin-top: 0; margin-bottom: 8px;">💵 Allowances During Study Leave (Rules 56 & 60)</h4>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
            <li><strong>Outside India:</strong> Leave salary equals pay drawn immediately before leave + DA + HRA.</li>
            <li><strong>Scholarship Adjustment:</strong> Stipend/scholarship is adjusted against leave salary, but leave salary cannot drop below the Half-Pay Leave rate.</li>
        </ul>
    </div>
</div>
`,
        guru_explanation: `
<div style="font-family: inherit; color: #333;">
    <h3 style="color: #0ea5e9; display: flex; align-items: center; gap: 8px; margin-top: 0;"><span style="font-size: 1.2em;">📖</span> DAK GURU EXPLAINS (SIMPLIFIED)</h3>
    
    <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 8px;">Concept: Work Related Illness and Injury Leave (WRIIL)</h4>
        <p style="margin-top: 0; line-height: 1.6;"><strong>The Rule:</strong> If you get injured strictly due to your official duty, the government takes full care of your leave without deducting from your personal leave balances.</p>
        <ul style="margin-bottom: 0; padding-left: 20px; line-height: 1.6;">
            <li><strong>Hospital Phase:</strong> 100% full pay and allowances for the entire hospital stay.</li>
            <li><strong>Recovery (Civilian):</strong> Full pay for first 6 months, then Half Pay Leave (HPL) salary for next 12 months.</li>
            <li><strong>Recovery (CAPF):</strong> Full pay for first 6 months, AND full pay for the next 24 months.</li>
        </ul>
    </div>

    <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h4 style="color: #be123c; margin-top: 0; margin-bottom: 8px;">Concept: Non-Completion of Study Leave (Rule 63)</h4>
        <p style="margin-top: 0; line-height: 1.6;"><strong>The Trap:</strong> If you resign/retire without returning, quit within 3 years, or fail to complete the course, heavy penalties apply.</p>
        <ul style="margin-bottom: 0; padding-left: 20px; line-height: 1.6;">
            <li><strong>The Penalty:</strong> Refund actual leave salary, Study Allowance, fees, and travel expenses incurred by Govt.</li>
            <li><strong>Leave Reversal:</strong> The study leave will be converted into regular leave (EL/HPL) at your credit, and any remainder is treated as Extraordinary Leave (EXOL).</li>
        </ul>
    </div>

    <h3 style="color: #8b5cf6; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #ede9fe; padding-bottom: 8px;"><span style="font-size: 1.2em;">🧠</span> KEY DISTINCTIONS (COMPULSORY)</h3>
    <div style="display: grid; gap: 12px;">
        <div style="background: white; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 12px 16px; border-radius: 0 8px 8px 0;">
            <strong>Encashment on Retirement</strong> is for a max of 300 days (EL + HPL), <strong style="color: #7c3aed;">WHEREAS</strong> <strong>Encashment on Resignation</strong> is for only half the EL at credit, capped at 150 days (HPL encashment is void).
        </div>
        <div style="background: white; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 12px 16px; border-radius: 0 8px 8px 0;">
            <strong>WRIIL (Civilian)</strong> pays Half Pay Leave salary for 12 months after the initial 6 months, <strong style="color: #7c3aed;">WHEREAS</strong> <strong>WRIIL (CAPF)</strong> pays Full Pay for 24 months after the initial 6 months.
        </div>
        <div style="background: white; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 12px 16px; border-radius: 0 8px 8px 0;">
            <strong>Normal Max Continuous Leave</strong> is 5 years, <strong style="color: #7c3aed;">WHEREAS</strong> <strong>Study Leave max continuous absence</strong> (Study + other leaves) is generally 28 months (36 for PhD).
        </div>
    </div>
</div>
`,
        practical_example: `
<div style="font-family: inherit; color: #333;">
    <div style="background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%); border: 1px solid #d1d5db; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <div style="margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <div style="background: #1d4ed8; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
                <h4 style="margin: 0; color: #1e3a8a; font-size: 1.1em;">Scenario: Tragic Demise and Leave Encashment</h4>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 3px solid #93c5fd;">
                <p style="margin-top: 0;"><strong>Situation:</strong> A male Govt servant dies, leaving 250 days EL and 100 days HPL. Survived by his mother and an adopted son. His wife passed away previously.</p>
                <p><strong>Action:</strong> Cash equivalent calculated for max 300 days total.</p>
                <p style="margin-bottom: 0;"><strong>Outcome:</strong> Payment is made strictly to the <strong>adopted son</strong> (2nd preference), superseding the mother (6th preference).</p>
            </div>
        </div>

        <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <div style="background: #047857; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
                <h4 style="margin: 0; color: #064e3b; font-size: 1.1em;">Scenario: The Study Leave Stipend</h4>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 3px solid #6ee7b7;">
                <p style="margin-top: 0;"><strong>Situation:</strong> Official takes 12 months Study Leave in UK, receiving a monthly stipend of ₹30,000.</p>
                <p><strong>Action:</strong> Govt pays leave salary (Pay + DA + HRA) but deducts the ₹30,000 stipend.</p>
                <p style="margin-bottom: 0;"><strong>Outcome:</strong> Even after adjustment, the Govt ensures total leave salary does not drop below regular Half-Pay Leave rate.</p>
            </div>
        </div>

    </div>
</div>
`,
        exam_insight: `
<div style="font-family: inherit; color: #333;">
    <div style="background: linear-gradient(to right, #fffbeb, #fef3c7); border: 1px solid #fde68a; border-radius: 12px; padding: 20px; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.15);">
        <h3 style="color: #b45309; margin-top: 0; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #fcd34d; padding-bottom: 8px;"><span style="font-size: 1.2em;">⚡</span> EXAM INSIGHT — MUST READ</h3>
        
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">🔥</span>
                <div><strong>Most Asked Fact:</strong> Study leave is <strong>NOT</strong> debited against the regular leave account.</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">🔥</span>
                <div><strong>Most Asked Fact:</strong> Departmental Leave does <strong>NOT</strong> count as duty, nor is it debited to the leave account.</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">🔁</span>
                <div><strong>Frequently Confused:</strong> WRIIL provides full pay for 6 months post-hospitalization for civilians, but for CAPF officers, it provides full pay for <strong>24 months</strong>.</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid #ef4444;">
                <span style="font-size: 1.2em; line-height: 1.2;">⚠️</span>
                <div><strong>Traps & Distinctions:</strong> Standard resignation encashment is only <strong>half</strong> of EL credit, capped at <strong>150 days</strong> (Not 300).</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">📌</span>
                <div><strong>One-Line Revision:</strong> Exemption from income tax is applicable on retirement EL encashment.</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">📌</span>
                <div><strong>One-Line Revision:</strong> Re-employed pensioners are entitled to encash EL along with LTC during re-employment, up to the 60-day limit.</div>
            </li>
        </ul>
    </div>

    <div style="margin-top: 24px; background: #1e293b; color: white; border-radius: 12px; padding: 20px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #38bdf8; margin-top: 0; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #334155; padding-bottom: 12px;"><span style="font-size: 1.2em;">📌</span> ULTRA-REVISION POINTS</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 16px;">
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>Study Leave Eligibility:</strong> Minimum 5 years continuous service.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>Study Leave Max:</strong> 24 months total (36 for CHS).
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>Study Bond:</strong> 3 years for regular staff, 5 years for CHS.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #a78bfa;">
                <strong>Harassment Inquiry Leave:</strong> Max 90 days (not debited from account).
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #ef4444;">
                <strong>WRIIL Leaves Earned:</strong> ZERO EL or HPL credited while on WRIIL.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #34d399;">
                <strong>Seamen Sick Leave:</strong> Max 6 weeks full pay on vessel; 3 months if disabled.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #f59e0b;">
                <strong>Resignation Encashment:</strong> Only EL, up to 1/2 of balance, max 150 days.
            </div>
        </div>
    </div>
</div>
`,
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

        // Note: Part 1 and Part 2 are separate entries, so we don't delete everything for CCS Leave rules.
        // We delete only Part 2 if it exists.
        await collection.deleteMany({ title: "CCS (Leave) Rules, 1972 — Part 2: Study Leave & WRIIL" });
        console.log('🧹 Cleaned existing Part 2 entry.');

        for (const entry of entries) {
            const result = await collection.insertOne(entry);
            console.log(`🚀 Seeded: ${entry.title} (_id: ${result.insertedId})`);
        }

        console.log('✨ Part 2 Seed completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await client.close();
    }
}

seed();
