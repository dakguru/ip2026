
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env
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

// IDs of the 2 old entries to remove
const IDS_TO_DELETE = [
    '69c95096a60b6cd0039e0bc3', // GDS Conduct & Disciplinary Rules — Misconduct and Action
    '69c95096a60b6cd0039e0bc5', // GDS Leave Rules: Paid Leave
];

const now = new Date();

const entries = [

    // ─────────────────────────────────────────────────────────────────────────
    // ENTRY 1: GDS Categories, Terms of Engagement & Eligibility
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "GDS (C&E) Rules 2020 — Categories, Terms of Engagement & Eligibility",
        rule_number: "Rules 3, 3-A, 3-B & 3-C",
        act_name: "GDS (Conduct and Engagement) Rules, 2020",
        category: "Rule",
        effective_date: new Date("2020-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `
<div style="background:linear-gradient(135deg,#e8f4f8,#d1ecf1); border-left:5px solid #0e6e9b; padding:16px 20px; border-radius:12px; margin-bottom:20px;">
    <h3 style="color:#0e6e9b; margin:0 0 6px 0; font-size:1rem;">GRAMIN DAK SEVAKS (CONDUCT AND ENGAGEMENT) RULES, 2020</h3>
    <p style="margin:0; color:#1a4a5e; font-size:0.85rem;">Issued in supersession of GDS (C&E) Rules, 2011 — under authority of the Government of India.</p>
</div>

<div style="background:#fff; border:1px solid #d4e6f1; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#1b2631; border-left:4px solid #2980b9; padding-left:10px; margin-top:0;">Rule 3 — Categories of Gramin Dak Sevaks</h3>
    <table style="width:100%; border-collapse:collapse; font-size:0.88rem; margin-top:10px;">
        <thead>
            <tr style="background:linear-gradient(90deg,#1b4f72,#2980b9); color:#fff;">
                <th style="padding:10px 14px; text-align:left; border-radius:8px 0 0 0;">GDS Post</th>
                <th style="padding:10px 14px; text-align:left;">Description</th>
                <th style="padding:10px 14px; text-align:left; border-radius:0 8px 0 0;">Work Location</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background:#f0f7ff;">
                <td style="padding:10px 14px; border:1px solid #d6eaf8; font-weight:bold; color:#154360;">Branch Postmaster (BPM)</td>
                <td style="padding:10px 14px; border:1px solid #d6eaf8;">Head of the GDS Branch Post Office</td>
                <td style="padding:10px 14px; border:1px solid #d6eaf8;">Branch Post Office</td>
            </tr>
            <tr style="background:#fff;">
                <td style="padding:10px 14px; border:1px solid #d6eaf8; font-weight:bold; color:#154360;">Asst. Branch Postmaster (ABPM)</td>
                <td style="padding:10px 14px; border:1px solid #d6eaf8;">GDS other than BPM working in Branch Office</td>
                <td style="padding:10px 14px; border:1px solid #d6eaf8;">Branch Post Office</td>
            </tr>
            <tr style="background:#f0f7ff;">
                <td style="padding:10px 14px; border:1px solid #d6eaf8; font-weight:bold; color:#154360;">Dak Sevak (DS)</td>
                <td style="padding:10px 14px; border:1px solid #d6eaf8;">GDS other than BPM/ABPM</td>
                <td style="padding:10px 14px; border:1px solid #d6eaf8;">Head Office / Sub Office / RMS Office</td>
            </tr>
        </tbody>
    </table>
</div>

<div style="background:#fff; border:1px solid #d5f5e3; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#1e8449; border-left:4px solid #27ae60; padding-left:10px; margin-top:0;">Rule 3-A — Key Terms &amp; Conditions of Engagement</h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:10px;">
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="margin:0 0 6px 0; font-weight:bold; color:#1a5276;">⏱ Duty Hours</p>
            <p style="margin:0; font-size:0.88rem;">A Sevak shall NOT perform duty beyond <strong>5 hours per day</strong> (maximum).</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="margin:0 0 6px 0; font-weight:bold; color:#1a5276;">🎂 Retirement Age</p>
            <p style="margin:0; font-size:0.88rem;">A Sevak shall NOT be retained beyond <strong>65 years</strong> of age.</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="margin:0 0 6px 0; font-weight:bold; color:#1a5276;">🏠 Residence Requirement</p>
            <p style="margin:0; font-size:0.88rem;">Mandatory to reside in post village/delivery jurisdiction within <strong>one month</strong> of selection (before engagement). Failure is a disciplinary violation under Rule 10.</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="margin:0 0 6px 0; font-weight:bold; color:#1a5276;">💼 Service Status</p>
            <p style="margin:0; font-size:0.88rem;">A Sevak is <strong>outside the Civil Service</strong> of the Union. Cannot claim parity with Central Govt. employees.</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="margin:0 0 6px 0; font-weight:bold; color:#1a5276;">🔄 Transfer</p>
            <p style="margin:0; font-size:0.88rem;">Can be transferred from one postal unit to another on public interest / vigilance / administrative grounds.</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="margin:0 0 6px 0; font-weight:bold; color:#1a5276;">🏛 Post Office Premises</p>
            <p style="margin:0; font-size:0.88rem;">Post Office shall be located in accommodation provided by GDS BPM. Combination of duties of a Sevak is permissible.</p>
        </div>
    </div>
</div>

<div style="background:#fff; border:1px solid #fdebd0; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#784212; border-left:4px solid #e67e22; padding-left:10px; margin-top:0;">Rule 3-B — Eligibility Criteria for Engagement</h3>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div style="background:#fef9e7; border:1px solid #fad7a0; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#7d6608; margin:0 0 6px 0;">📅 Age Criteria</p>
            <p style="margin:0; font-size:0.88rem;">Minimum: <strong>18 years</strong> &nbsp;|&nbsp; Maximum: <strong>40 years</strong><br><em>(as on date of notification of vacancy)</em></p>
        </div>
        <div style="background:#fef9e7; border:1px solid #fad7a0; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#7d6608; margin:0 0 6px 0;">📚 Educational Qualification</p>
            <p style="margin:0; font-size:0.88rem;">10th Standard pass with <strong>Maths &amp; English</strong> (compulsory/elective) from a recognised Central/State/UT Board.</p>
        </div>
    </div>

    <h4 style="color:#784212; margin-bottom:8px;">Upper Age Relaxation Table</h4>
    <table style="width:100%; border-collapse:collapse; font-size:0.87rem;">
        <thead>
            <tr style="background:linear-gradient(90deg,#7d6608,#b7950b); color:#fff;">
                <th style="padding:9px 12px; text-align:left;">Category</th>
                <th style="padding:9px 12px; text-align:center;">Age Relaxation</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background:#fffde7;"><td style="padding:8px 12px; border:1px solid #fad7a0;">SC / ST</td><td style="padding:8px 12px; border:1px solid #fad7a0; text-align:center; font-weight:bold; color:#1a5276;">5 Years</td></tr>
            <tr style="background:#fff;"><td style="padding:8px 12px; border:1px solid #fad7a0;">OBC</td><td style="padding:8px 12px; border:1px solid #fad7a0; text-align:center; font-weight:bold; color:#1a5276;">3 Years</td></tr>
            <tr style="background:#fffde7;"><td style="padding:8px 12px; border:1px solid #fad7a0;">EWS</td><td style="padding:8px 12px; border:1px solid #fad7a0; text-align:center; font-weight:bold; color:#c0392b;">No Relaxation</td></tr>
            <tr style="background:#fff;"><td style="padding:8px 12px; border:1px solid #fad7a0;">PwD / PH</td><td style="padding:8px 12px; border:1px solid #fad7a0; text-align:center; font-weight:bold; color:#1a5276;">10 Years</td></tr>
            <tr style="background:#fffde7;"><td style="padding:8px 12px; border:1px solid #fad7a0;">PwD/PH + SC/ST</td><td style="padding:8px 12px; border:1px solid #fad7a0; text-align:center; font-weight:bold; color:#1a5276;">15 Years</td></tr>
            <tr style="background:#fff;"><td style="padding:8px 12px; border:1px solid #fad7a0;">PwD/PH + OBC</td><td style="padding:8px 12px; border:1px solid #fad7a0; text-align:center; font-weight:bold; color:#1a5276;">13 Years</td></tr>
        </tbody>
    </table>

    <div style="margin-top:14px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; padding:12px;">
        <p style="margin:0; font-size:0.87rem;"><strong>🔖 EWS Reservation:</strong> Persons belonging to EWSs (not covered under SC/ST/OBC reservation) get <strong>10% reservation</strong> in GDS engagements as per Directorate letter No. 17-09/2019 dated 26.02.2019.</p>
    </div>
</div>

<div style="background:#fff; border:1px solid #d2b4de; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#4a235a; border-left:4px solid #8e44ad; padding-left:10px; margin-top:0;">TRCA — Time Related Continuity Allowance</h3>
    <p style="font-size:0.88rem; color:#555; margin-bottom:10px;">Minimum TRCA as per Directorate Order No. 17-31/2016-GDS dated <strong>25.06.2018</strong>:</p>
    <table style="width:100%; border-collapse:collapse; font-size:0.87rem;">
        <thead>
            <tr style="background:linear-gradient(90deg,#4a235a,#8e44ad); color:#fff;">
                <th style="padding:9px 14px; text-align:left;">Category</th>
                <th style="padding:9px 14px; text-align:center;">4 Hours / Level 1</th>
                <th style="padding:9px 14px; text-align:center;">5 Hours / Level 2</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background:#f5eef8;"><td style="padding:8px 14px; border:1px solid #d7bde2; font-weight:bold;">BPM</td><td style="padding:8px 14px; border:1px solid #d7bde2; text-align:center; font-weight:bold; color:#1a5276;">₹ 12,000/-</td><td style="padding:8px 14px; border:1px solid #d7bde2; text-align:center; font-weight:bold; color:#117a65;">₹ 14,500/-</td></tr>
            <tr style="background:#fff;"><td style="padding:8px 14px; border:1px solid #d7bde2; font-weight:bold;">ABPM / Dak Sevak</td><td style="padding:8px 14px; border:1px solid #d7bde2; text-align:center; font-weight:bold; color:#1a5276;">₹ 10,000/-</td><td style="padding:8px 14px; border:1px solid #d7bde2; text-align:center; font-weight:bold; color:#117a65;">₹ 12,000/-</td></tr>
        </tbody>
    </table>
    <p style="font-size:0.82rem; color:#777; margin-top:8px;">For GDS engaged on or after <strong>01.07.2018</strong>, initial TRCA fixation is done at the first stage of Level 1 of the respective category. IPPB work is NOT included in TRCA calculation (done on incentive basis).</p>
</div>

<div style="background:#fff; border:1px solid #aed6f1; border-radius:12px; padding:16px 20px; margin-bottom:14px;">
    <h3 style="color:#1a5276; border-left:4px solid #2980b9; padding-left:10px; margin-top:0;">Rule 3-C — Voluntary Discharge Scheme</h3>
    <p style="margin:0; font-size:0.88rem;">All categories of GDS can avail the Voluntary Discharge Scheme on completion of <strong>20 years</strong> of engagement period, or on <strong>medical grounds</strong>, as per instructions issued from time to time.</p>
</div>
        `,
        guru_explanation: `
<div style="background:#0a192f; color:#ccd6f6; border-radius:16px; padding:20px 24px; margin-bottom:20px;">
    <h3 style="color:#64ffda; margin:0 0 14px 0; font-size:1rem; letter-spacing:0.5px;">🎯 EXAM ESSENTIALS — What Examiners Love to Ask</h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#112240; border:1px solid #1d3461; border-radius:8px; padding:12px;">
            <p style="color:#64ffda; font-weight:bold; margin:0 0 6px 0; font-size:0.82rem; text-transform:uppercase; letter-spacing:0.5px;">Working Hours</p>
            <p style="color:#8892b0; margin:0; font-size:0.87rem;">Max duty = <strong style="color:#ccd6f6;">5 hours/day</strong>. GDS is NOT an 8-hour employee. This is a fundamental difference from regular Dept. staff.</p>
        </div>
        <div style="background:#112240; border:1px solid #1d3461; border-radius:8px; padding:12px;">
            <p style="color:#64ffda; font-weight:bold; margin:0 0 6px 0; font-size:0.82rem; text-transform:uppercase; letter-spacing:0.5px;">Retirement Age</p>
            <p style="color:#8892b0; margin:0; font-size:0.87rem;">65 years — much higher than regular govt. employees (60 years). A common MCQ trap!</p>
        </div>
        <div style="background:#112240; border:1px solid #1d3461; border-radius:8px; padding:12px;">
            <p style="color:#64ffda; font-weight:bold; margin:0 0 6px 0; font-size:0.82rem; text-transform:uppercase; letter-spacing:0.5px;">Age for Engagement</p>
            <p style="color:#8892b0; margin:0; font-size:0.87rem;">Min <strong style="color:#ccd6f6;">18</strong> — Max <strong style="color:#ccd6f6;">40</strong> years as on date of vacancy notification.</p>
        </div>
        <div style="background:#112240; border:1px solid #1d3461; border-radius:8px; padding:12px;">
            <p style="color:#64ffda; font-weight:bold; margin:0 0 6px 0; font-size:0.82rem; text-transform:uppercase; letter-spacing:0.5px;">Residence Deadline</p>
            <p style="color:#8892b0; margin:0; font-size:0.87rem;"><strong style="color:#ccd6f6;">1 month</strong> after selection but BEFORE engagement. Failure = disciplinary action under Rule 10.</p>
        </div>
        <div style="background:#112240; border:1px solid #1d3461; border-radius:8px; padding:12px;">
            <p style="color:#64ffda; font-weight:bold; margin:0 0 6px 0; font-size:0.82rem; text-transform:uppercase; letter-spacing:0.5px;">EWS Relaxation</p>
            <p style="color:#8892b0; margin:0; font-size:0.87rem;"><strong style="color:#e74c3c;">No age relaxation</strong> for EWS — but they DO get 10% reservation in vacancies.</p>
        </div>
        <div style="background:#112240; border:1px solid #1d3461; border-radius:8px; padding:12px;">
            <p style="color:#64ffda; font-weight:bold; margin:0 0 6px 0; font-size:0.82rem; text-transform:uppercase; letter-spacing:0.5px;">Voluntary Discharge</p>
            <p style="color:#8892b0; margin:0; font-size:0.87rem;">Available after <strong style="color:#ccd6f6;">20 years</strong> of engagement or on medical grounds.</p>
        </div>
    </div>
</div>

<div style="background:#e8f8f5; border:1px solid #a2d9ce; border-radius:12px; padding:16px 20px; margin-bottom:16px;">
    <h4 style="color:#117a65; margin:0 0 10px 0;">💡 Understanding GDS Status — The Core Concept</h4>
    <p style="margin:0 0 8px 0; font-size:0.88rem;">GDS are <strong>not civil servants</strong>. They are engaged (not appointed) and work on a part-time basis. Their relationship with the government is governed by these C&E Rules, not the CCS Rules. They do not get:</p>
    <ul style="margin:0; padding-left:20px; font-size:0.88rem; space:4px;">
        <li>Pension (they get GDS Gratuity, Severance Amount and SDBS instead)</li>
        <li>Pay scale (they get TRCA — Time Related Continuity Allowance)</li>
        <li>Status of Central Government employee</li>
    </ul>
    <div style="margin-top:10px; background:#d1f2eb; border-radius:6px; padding:8px 12px;">
        <p style="margin:0; font-size:0.87rem;"><strong>📌 SDBS Note (Updated 2026):</strong> Subscription towards Service Discharge Benefit Scheme (SDBS) begins only after completion of <strong>one year</strong> from the date of joining.</p>
    </div>
</div>
        `,
        practical_example: `
<div style="background:#f8f9fa; border:1px solid #dee2e6; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#343a40; margin:0 0 12px 0;">📋 Practical Scenarios for Exam</h4>
    <div style="display:grid; grid-template-columns:1fr; gap:10px;">
        <div style="background:#fff3cd; border:1px solid #ffc107; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#856404; margin:0 0 4px 0;">Scenario 1: Age Calculation</p>
            <p style="margin:0; font-size:0.87rem;">Ramu is an OBC candidate aged 42 years on the date of GDS vacancy notification. Is he eligible?<br><strong>Answer:</strong> Yes! OBC gets 3 years relaxation. So max age = 40+3 = 43 years. He qualifies.</p>
        </div>
        <div style="background:#d1ecf1; border:1px solid #bee5eb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#0c5460; margin:0 0 4px 0;">Scenario 2: Residence Condition</p>
            <p style="margin:0; font-size:0.87rem;">Sita was selected as BPM on 1st June 2024. She must shift residence to the post village by <strong>1st July 2024</strong> (1 month). If she fails, she faces disciplinary proceedings under Rule 10.</p>
        </div>
        <div style="background:#d4edda; border:1px solid #c3e6cb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#155724; margin:0 0 4px 0;">Scenario 3: TRCA for BPM</p>
            <p style="margin:0; font-size:0.87rem;">A BPM works 5 hours/day (Level 2). Minimum TRCA = <strong>₹14,500/-</strong> per month. If she works only 4 hours/day (Level 1), minimum TRCA = ₹12,000/- per month.</p>
        </div>
    </div>
</div>
        `,
        exam_insight: `
<div style="background:#fce4ec; border:1px solid #f48fb1; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#880e4f; margin:0 0 10px 0;">🔥 High-Frequency Exam Questions</h4>
    <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.7;">
        <li>Maximum duty hours for GDS per day → <strong>5 hours</strong></li>
        <li>Maximum age of retention for GDS → <strong>65 years</strong></li>
        <li>Age for engagement: Min <strong>18</strong>, Max <strong>40</strong> years</li>
        <li>PwD + SC/ST age relaxation → <strong>15 years</strong></li>
        <li>EWS — age relaxation → <strong>No relaxation</strong> (but 10% reservation)</li>
        <li>Minimum TRCA for BPM (5 hrs/Level 2) → <strong>₹14,500/-</strong></li>
        <li>Minimum TRCA for ABPM/DS (4 hrs/Level 1) → <strong>₹10,000/-</strong></li>
        <li>Voluntary Discharge Scheme eligibility → after <strong>20 years</strong></li>
        <li>GDS is <strong>outside Civil Service</strong> of the Union</li>
        <li>Residence deadline after selection → <strong>1 month</strong></li>
    </ul>
</div>
        `,
        status: "published",
        created_by: "admin@dakguru.com",
        createdAt: now,
        updatedAt: now,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENTRY 2: GDS Leave, Termination & Gratuity Rules
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "GDS Rules — Leave, Termination, Gratuity & Benefits",
        rule_number: "Rules 6, 7, 7-A, 7-B & 8",
        act_name: "GDS (Conduct and Engagement) Rules, 2020",
        category: "Rule",
        effective_date: new Date("2020-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `
<div style="background:linear-gradient(135deg,#fdf6e3,#fdebd0); border-left:5px solid #e67e22; padding:16px 20px; border-radius:12px; margin-bottom:20px;">
    <h3 style="color:#7d3c11; margin:0 0 6px 0; font-size:1rem;">GDS LEAVE, TERMINATION & POST-ENGAGEMENT BENEFITS</h3>
    <p style="margin:0; color:#784212; font-size:0.85rem;">Rules 6 to 8 — Governing leave entitlements, termination procedure, and financial benefits for Gramin Dak Sevaks.</p>
</div>

<div style="background:#fff; border:1px solid #d5f5e3; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#1e8449; border-left:4px solid #27ae60; padding-left:10px; margin-top:0;">Rule 6 — Pension / GDS Gratuity / Severance Amount</h3>
    <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:14px; margin-bottom:12px;">
        <p style="margin:0; font-size:0.88rem;">Gramin Dak Sevaks are <strong>NOT entitled to pension</strong>. However, they shall be entitled to:</p>
        <ul style="margin:8px 0 0 0; padding-left:20px; font-size:0.88rem;">
            <li><strong>GDS Gratuity</strong></li>
            <li><strong>Severance Amount</strong></li>
            <li><strong>SDBS</strong> (Service Discharge Benefit Scheme)</li>
        </ul>
        <p style="margin:10px 0 0 0; font-size:0.87rem; background:#d1f2eb; border-radius:6px; padding:8px 12px;"><strong>📌 Important (Updated 2026):</strong> SDBS subscription begins only after completion of <strong>ONE YEAR</strong> from the date of joining.</p>
    </div>
    <p style="font-size:0.87rem; color:#555; margin:0;">NOTE: If a GDS engagement is terminated under Rule 8, he/she is NOT eligible for GDS Gratuity and Severance Amount.</p>
</div>

<div style="background:#fff; border:1px solid #d6eaf8; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#1a5276; border-left:4px solid #2980b9; padding-left:10px; margin-top:0;">Rule 7 — Leave (Paid Leave)</h3>

    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:14px;">
        <div style="background:#eaf4fb; border:2px solid #3498db; border-radius:10px; padding:14px; text-align:center;">
            <p style="font-size:1.5rem; font-weight:900; color:#1a5276; margin:0;">20</p>
            <p style="font-size:0.8rem; font-weight:bold; color:#1a5276; margin:4px 0 0 0;">Days per Year</p>
            <p style="font-size:0.75rem; color:#7fb3d3; margin:0;">(10 per half year)</p>
        </div>
        <div style="background:#eaf4fb; border:2px solid #3498db; border-radius:10px; padding:14px; text-align:center;">
            <p style="font-size:1.5rem; font-weight:900; color:#1a5276; margin:0;">180</p>
            <p style="font-size:0.8rem; font-weight:bold; color:#1a5276; margin:4px 0 0 0;">Days Max Accumulation</p>
            <p style="font-size:0.75rem; color:#7fb3d3; margin:0;">(carry forward allowed)</p>
        </div>
        <div style="background:#eaf4fb; border:2px solid #3498db; border-radius:10px; padding:14px; text-align:center;">
            <p style="font-size:1.5rem; font-weight:900; color:#c0392b; margin:0;">NIL</p>
            <p style="font-size:0.8rem; font-weight:bold; color:#c0392b; margin:4px 0 0 0;">Half Pay Leave</p>
            <p style="font-size:0.75rem; color:#c0392b; margin:0;">(Not available for GDS)</p>
        </div>
    </div>

    <div style="background:#fff8e1; border:1px solid #ffe082; border-radius:8px; padding:12px; margin-bottom:12px;">
        <p style="font-weight:bold; color:#7d6608; margin:0 0 6px 0;">⚠️ Consequence of Exceeding Leave Limit (Proviso to Rule 7)</p>
        <p style="margin:0; font-size:0.87rem;">If a Sevak fails to resume duty on expiry of the maximum leave granted, OR remains absent beyond the limit — the Sevak shall be <strong>removed from engagement</strong>, unless the Government decides otherwise in view of exceptional circumstances. Removal follows the procedure under Rule 10.</p>
    </div>
</div>

<div style="background:#fff; border:1px solid #f9ebea; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#922b21; border-left:4px solid #e74c3c; padding-left:10px; margin-top:0;">Rule 7-A — Emergency Leave</h3>
    <div style="background:#fdedec; border:1px solid #f1948a; border-radius:8px; padding:12px; text-align:center;">
        <p style="font-size:1.4rem; font-weight:900; color:#922b21; margin:0;">5 Days</p>
        <p style="font-size:0.85rem; color:#7b241c; margin:4px 0 0 0;">Maximum Emergency Leave per calendar year</p>
    </div>
    <p style="font-size:0.87rem; color:#555; margin:10px 0 0 0;">Gramin Dak Sevaks are entitled to <strong>Emergency Leave</strong> for a maximum of <strong>5 days</strong> in a calendar year, or as may be prescribed by the Government from time to time.</p>
</div>

<div style="background:#fff; border:1px solid #e8d5f5; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#6c3483; border-left:4px solid #8e44ad; padding-left:10px; margin-top:0;">Rule 7-B — Maternity Leave for Female GDS</h3>
    <div style="background:#f9f0ff; border:1px solid #d7bde2; border-radius:8px; padding:12px; text-align:center; margin-bottom:10px;">
        <p style="font-size:1.4rem; font-weight:900; color:#4a235a; margin:0;">180 Days</p>
        <p style="font-size:0.85rem; color:#6c3483; margin:4px 0 0 0;">Maternity Leave — from date of commencement</p>
    </div>
    <p style="font-size:0.87rem; color:#555; margin:0;">A female GDS with <strong>less than two surviving children</strong> may be granted maternity leave for <strong>180 days</strong> from the date of its commencement, by an authority competent to grant leave.</p>
</div>

<div style="background:#fff; border:1px solid #fad7a0; border-radius:12px; padding:16px 20px; margin-bottom:14px;">
    <h3 style="color:#784212; border-left:4px solid #e67e22; padding-left:10px; margin-top:0;">Rule 8 — Termination of Engagement</h3>

    <div style="background:#fef9e7; border:1px solid #fad7a0; border-radius:8px; padding:14px; margin-bottom:12px;">
        <h4 style="color:#7d6608; margin:0 0 8px 0;">When does this Rule Apply?</h4>
        <p style="margin:0; font-size:0.87rem;">This rule applies to a Sevak who has <strong>NOT</strong> rendered more than <strong>3 years'</strong> continuous engagement. For such cases, engagement can be terminated by <strong>either party</strong> by giving written notice.</p>
    </div>

    <table style="width:100%; border-collapse:collapse; font-size:0.87rem; margin-bottom:12px;">
        <thead>
            <tr style="background:linear-gradient(90deg,#7d3c11,#ca6f1e); color:#fff;">
                <th style="padding:9px 14px; text-align:left;">Aspect</th>
                <th style="padding:9px 14px; text-align:left;">Provision</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background:#fef9e7;"><td style="padding:8px 14px; border:1px solid #fad7a0; font-weight:bold;">Notice Period</td><td style="padding:8px 14px; border:1px solid #fad7a0;"><strong>1 month</strong> (by either party — Sevak or Engaging Authority)</td></tr>
            <tr style="background:#fff;"><td style="padding:8px 14px; border:1px solid #fad7a0; font-weight:bold;">Immediate Termination</td><td style="padding:8px 14px; border:1px solid #fad7a0;">Allowed — Sevak gets TRCA + DA equivalent for notice period (1 month) by Money Order</td></tr>
            <tr style="background:#fef9e7;"><td style="padding:8px 14px; border:1px solid #fad7a0; font-weight:bold;">Gratuity &amp; Severance</td><td style="padding:8px 14px; border:1px solid #fad7a0; color:#c0392b;"><strong>NOT eligible</strong> when terminated under Rule 8</td></tr>
        </tbody>
    </table>

    <div style="background:#fdedec; border:1px solid #f1948a; border-radius:8px; padding:12px;">
        <p style="margin:0; font-size:0.87rem;"><strong>Note 1:</strong> When immediate termination is intended, one month's TRCA + DA must be remitted to the Sevak by <strong>Money Order</strong> in lieu of notice.<br><br><strong>Note 2:</strong> A GDS terminated under Rule 8 is <strong>NOT eligible</strong> for GDS Gratuity and Severance Amount.</p>
    </div>
</div>
        `,
        guru_explanation: `
<div style="background:#0a192f; color:#ccd6f6; border-radius:16px; padding:20px 24px; margin-bottom:20px;">
    <h3 style="color:#64ffda; margin:0 0 14px 0; font-size:1rem; letter-spacing:0.5px;">🎯 Leave & Benefits — Quick Comparison Card</h3>
    <table style="width:100%; border-collapse:collapse; font-size:0.87rem;">
        <thead>
            <tr>
                <th style="padding:8px 12px; text-align:left; background:#112240; color:#64ffda; border:1px solid #1d3461;">Leave Type</th>
                <th style="padding:8px 12px; text-align:center; background:#112240; color:#64ffda; border:1px solid #1d3461;">Quantum</th>
                <th style="padding:8px 12px; text-align:left; background:#112240; color:#64ffda; border:1px solid #1d3461;">Key Condition</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#a8b2d8;">Paid Leave</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; text-align:center; color:#ccd6f6; font-weight:bold;">20 days/year</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#a8b2d8;">Max accumulation: 180 days</td>
            </tr>
            <tr style="background:#0d2137;">
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#a8b2d8;">Emergency Leave</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; text-align:center; color:#ccd6f6; font-weight:bold;">5 days/year</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#a8b2d8;">Per calendar year</td>
            </tr>
            <tr>
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#a8b2d8;">Maternity Leave</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; text-align:center; color:#ccd6f6; font-weight:bold;">180 days</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#a8b2d8;">Female GDS with &lt; 2 surviving children</td>
            </tr>
            <tr style="background:#0d2137;">
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#e74c3c;">Half Pay Leave</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; text-align:center; color:#e74c3c; font-weight:bold;">NIL</td>
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#e74c3c;">Not available for GDS</td>
            </tr>
        </tbody>
    </table>
</div>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px;">
    <div style="background:#e8f8f5; border:1px solid #a2d9ce; border-radius:12px; padding:14px;">
        <h4 style="color:#117a65; margin:0 0 8px 0;">💡 Key Insight: Paid Leave Accumulation</h4>
        <p style="margin:0; font-size:0.87rem;">GDS Paid Leave of 20 days/year can be accumulated up to a maximum of <strong>180 days</strong>. Beyond 180, no further leave is credited until some is used. Unlike regular government servants, there is NO encashment of accumulated leave on retirement in the traditional sense.</p>
    </div>
    <div style="background:#fef5e7; border:1px solid #fad7a0; border-radius:12px; padding:14px;">
        <h4 style="color:#7d3c11; margin:0 0 8px 0;">⚡ Rule 8 Trap — Common Mistake</h4>
        <p style="margin:0; font-size:0.87rem;">Students confuse Rule 8 with disciplinary removal. Rule 8 is simple <strong>termination by notice</strong> (like a probationary period for first 3 years). It requires NO inquiry. But the Sevak loses gratuity and severance amount — a harsh but clear provision.</p>
    </div>
</div>

<div style="background:#f4f6f7; border:1px solid #abb2b9; border-radius:12px; padding:14px;">
    <h4 style="color:#2c3e50; margin:0 0 8px 0;">📊 Post-Engagement Benefits Summary</h4>
    <table style="width:100%; border-collapse:collapse; font-size:0.87rem;">
        <tr style="background:#2c3e50; color:#fff;">
            <th style="padding:8px 12px; text-align:left;">Benefit</th>
            <th style="padding:8px 12px; text-align:center;">Available?</th>
        </tr>
        <tr style="background:#fff;"><td style="padding:7px 12px; border:1px solid #d5dbdb;">Pension</td><td style="padding:7px 12px; border:1px solid #d5dbdb; text-align:center; color:#e74c3c; font-weight:bold;">NO</td></tr>
        <tr style="background:#f4f6f7;"><td style="padding:7px 12px; border:1px solid #d5dbdb;">GDS Gratuity</td><td style="padding:7px 12px; border:1px solid #d5dbdb; text-align:center; color:#27ae60; font-weight:bold;">YES (except Rule 8 termination)</td></tr>
        <tr style="background:#fff;"><td style="padding:7px 12px; border:1px solid #d5dbdb;">Severance Amount</td><td style="padding:7px 12px; border:1px solid #d5dbdb; text-align:center; color:#27ae60; font-weight:bold;">YES (except Rule 8 termination)</td></tr>
        <tr style="background:#f4f6f7;"><td style="padding:7px 12px; border:1px solid #d5dbdb;">SDBS</td><td style="padding:7px 12px; border:1px solid #d5dbdb; text-align:center; color:#27ae60; font-weight:bold;">YES (after 1 year from joining)</td></tr>
    </table>
</div>
        `,
        practical_example: `
<div style="background:#f8f9fa; border:1px solid #dee2e6; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#343a40; margin:0 0 12px 0;">📋 Solved Examples</h4>
    <div style="display:grid; grid-template-columns:1fr; gap:10px;">
        <div style="background:#d1ecf1; border:1px solid #bee5eb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#0c5460; margin:0 0 4px 0;">Q: Ramesh joined as GDS on 1 Jan 2024. How many paid leaves does he earn by 31 Dec 2024?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> 10 days (for Jan-Jun) + 10 days (for Jul-Dec) = <strong>20 days</strong> total for the year.</p>
        </div>
        <div style="background:#fff3cd; border:1px solid #ffc107; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#856404; margin:0 0 4px 0;">Q: A GDS accumulated 175 days of leave. In the next 6 months he earns 10 more. How many will be credited?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> Only <strong>5 days</strong> — because the max accumulation limit is 180 days (175 + 5 = 180). The remaining 5 days lapse.</p>
        </div>
        <div style="background:#f8d7da; border:1px solid #f5c6cb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#721c24; margin:0 0 4px 0;">Q: GDS Priya's engagement is terminated under Rule 8 after 2 years. Is she entitled to GDS Gratuity?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> <strong>NO</strong>. Rule 8 termination explicitly disqualifies the Sevak from GDS Gratuity and Severance Amount.</p>
        </div>
    </div>
</div>
        `,
        exam_insight: `
<div style="background:#fce4ec; border:1px solid #f48fb1; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#880e4f; margin:0 0 10px 0;">🔥 Must-Know for Exam</h4>
    <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.8;">
        <li>GDS Paid Leave rate → <strong>10 days per half year = 20 days per year</strong></li>
        <li>Maximum accumulation of Paid Leave → <strong>180 days</strong></li>
        <li>Emergency Leave → <strong>5 days per calendar year</strong></li>
        <li>Maternity Leave → <strong>180 days</strong> (female GDS with &lt; 2 surviving children)</li>
        <li>Half Pay Leave → <strong>NOT available</strong> for GDS</li>
        <li>Termination notice (Rule 8) → <strong>1 month</strong> (by either party)</li>
        <li>Rule 8 applies only if engagement &lt; <strong>3 years</strong></li>
        <li>GDS terminated under Rule 8 → <strong>No gratuity, no severance</strong></li>
        <li>GDS do NOT get pension — they get <strong>GDS Gratuity + Severance + SDBS</strong></li>
        <li>SDBS subscription starts after <strong>1 year</strong> from date of joining</li>
    </ul>
</div>
        `,
        status: "published",
        created_by: "admin@dakguru.com",
        createdAt: now,
        updatedAt: now,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENTRY 3: GDS Penalties, Disciplinary Procedure & Conduct Rules
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "GDS Penalties, Disciplinary Procedure & Conduct Rules",
        rule_number: "Rules 9, 10, 11, 12, 13, 14, 21 & 22",
        act_name: "GDS (Conduct and Engagement) Rules, 2020",
        category: "Rule",
        effective_date: new Date("2020-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `
<div style="background:linear-gradient(135deg,#fbeee6,#fce9d8); border-left:5px solid #c0392b; padding:16px 20px; border-radius:12px; margin-bottom:20px;">
    <h3 style="color:#922b21; margin:0 0 6px 0; font-size:1rem;">GDS DISCIPLINARY FRAMEWORK — PENALTIES, PROCEDURE & CONDUCT</h3>
    <p style="margin:0; color:#7b241c; font-size:0.85rem;">Rules 9 to 14, 21 &amp; 22 — Complete disciplinary ecosystem for Gramin Dak Sevaks</p>
</div>

<div style="background:#fff; border:1px solid #fad7a0; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#784212; border-left:4px solid #e67e22; padding-left:10px; margin-top:0;">Rule 9 — Nature of Penalties</h3>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
        <div style="background:#fef9e7; border:2px solid #f39c12; border-radius:10px; padding:14px;">
            <h4 style="color:#7d3c11; margin:0 0 10px 0; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.5px;">⚡ Minor Penalties (1–5)</h4>
            <ol style="margin:0; padding-left:18px; font-size:0.86rem; line-height:1.7;">
                <li><strong>Censure</strong></li>
                <li>Debarring from MTS/Postman/Mail Guard/PA/SA recruitment — up to <strong>3 years</strong></li>
                <li>Debarring from MTS recruitment (selection-cum-seniority) — up to <strong>3 years</strong></li>
                <li>Recovery from TRCA of pecuniary loss caused by negligence/breach</li>
                <li>Withholding of annual TRCA increment — without cumulative effect — up to <strong>3 years</strong></li>
            </ol>
        </div>
        <div style="background:#fdebd0; border:2px solid #e74c3c; border-radius:10px; padding:14px;">
            <h4 style="color:#922b21; margin:0 0 10px 0; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.5px;">🔴 Major Penalties (6–9)</h4>
            <ol start="6" style="margin:0; padding-left:18px; font-size:0.86rem; line-height:1.7;">
                <li>Reduction to lower TRCA stage for period exceeding <strong>3 years</strong> (not permanent)</li>
                <li><strong>Compulsory Discharge</strong> — with monetary benefits (SDBS + Gratuity proportionate)</li>
                <li><strong>Removal</strong> from engagement — NOT a disqualification for future engagement</li>
                <li><strong>Dismissal</strong> — SHALL ordinarily be a disqualification for future engagement</li>
            </ol>
        </div>
    </div>
</div>

<div style="background:#fff; border:1px solid #d6eaf8; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#1a5276; border-left:4px solid #2980b9; padding-left:10px; margin-top:0;">Rules 10-A to 10-G — Disciplinary Procedure</h3>

    <div style="background:#eaf4fb; border:1px solid #aed6f1; border-radius:8px; padding:12px; margin-bottom:12px;">
        <h4 style="color:#1a5276; margin:0 0 8px 0;">Rule 10-A: Procedure for Minor Penalty</h4>
        <p style="margin:0; font-size:0.87rem;">No order for Minor Penalty (Rules 1–5) shall be passed EXCEPT after:<br>
        <strong>(a)</strong> Sevak is informed in writing of the proposal and allegations and given opportunity to represent.<br>
        <strong>(b)</strong> Representation, if any, is considered by the Engaging Authority.</p>
    </div>

    <div style="background:#fdedec; border:1px solid #f1948a; border-radius:8px; padding:12px; margin-bottom:12px;">
        <h4 style="color:#922b21; margin:0 0 8px 0;">Rule 10-B: Procedure for Major Penalty</h4>
        <p style="margin:0; font-size:0.87rem;">No order for Major Penalty (Rules 6–9) shall be passed EXCEPT after:<br>
        <strong>(a)</strong> Sevak is informed in writing and given opportunity to represent.<br>
        <strong>(b)</strong> Representation is considered by the Engaging Authority.</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
        <div style="background:#f5f0fb; border:1px solid #d2b4de; border-radius:8px; padding:12px;">
            <h4 style="color:#4a235a; margin:0 0 6px 0; font-size:0.87rem;">Rule 10-D: Mandatory Inquiry (Major Penalty)</h4>
            <p style="margin:0; font-size:0.86rem;">Inquiry is <strong>mandatory</strong> for major penalties even if GDS accepts charges. Purpose: to give GDS adequate opportunity to defend. Exception: If charge is accepted unconditionally, no inquiry needed.</p>
        </div>
        <div style="background:#f4f6f7; border:1px solid #aab7b8; border-radius:8px; padding:12px;">
            <h4 style="color:#2c3e50; margin:0 0 6px 0; font-size:0.87rem;">Rule 10-E: Discretionary Inquiry (Minor Penalty)</h4>
            <p style="margin:0; font-size:0.86rem;">For minor penalties, inquiry is <strong>NOT mandatory</strong> — it is at the discretion of the Disciplinary/Engaging Authority. However, if GDS requests inspection of documents or cross-examination, authority must apply its mind carefully.</p>
        </div>
    </div>

    <div style="background:#e8f8f5; border:1px solid #76d7c4; border-radius:8px; padding:12px; margin-bottom:12px;">
        <h4 style="color:#0e6655; margin:0 0 8px 0;">Rule 10-F: Procedure After Discharge (at age 65)</h4>
        <p style="margin:0; font-size:0.87rem;">If departmental proceedings were instituted while the Sevak was in engagement and the Sevak subsequently gets discharged at age 65, the proceedings shall continue as if the Sevak had continued in engagement. The authority's function is to reach a finding and submit report to the President. <strong>No appeal</strong> shall lie against such decision.</p>
    </div>

    <div style="background:#fef9e7; border:1px solid #fad7a0; border-radius:8px; padding:12px;">
        <h4 style="color:#7d6608; margin:0 0 8px 0;">Rule 10-G: Proceedings After Discharge (not instituted during engagement)</h4>
        <p style="margin:0; font-size:0.87rem;">If proceedings were <strong>NOT instituted</strong> during engagement and GDS is discharged at 65 years, fresh proceedings:<br>
        <strong>(i)</strong> Require sanction of the President.<br>
        <strong>(ii)</strong> Cannot relate to events more than <strong>4 years</strong> before institution.<br>
        <strong>(iii)</strong> Conducted as per procedure for dismissal from engagement.</p>
    </div>
</div>

<div style="background:#fff; border:1px solid #d5f5e3; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#1e8449; border-left:4px solid #27ae60; padding-left:10px; margin-top:0;">Rule 11 — When Rule 10 Procedure Does NOT Apply</h3>
    <p style="font-size:0.87rem; margin-bottom:8px;">The disciplinary procedure under Rule 10 shall NOT be followed in 3 situations:</p>
    <ol style="margin:0; padding-left:20px; font-size:0.87rem; line-height:1.8;">
        <li>Where penalty is imposed due to <strong>conviction on criminal charge</strong></li>
        <li>Where the authority is satisfied that it is <strong>not reasonably practicable</strong> to hold inquiry (recorded in writing)</li>
        <li>Where the <strong>President is satisfied</strong> that it is not expedient in the interest of <strong>security of the State</strong></li>
    </ol>
</div>

<div style="background:#fff; border:1px solid #d6eaf8; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#1a5276; border-left:4px solid #2980b9; padding-left:10px; margin-top:0;">Rule 12 — Put Off Duty</h3>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
        <div style="background:#eaf4fb; border:1px solid #aed6f1; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1a5276; margin:0 0 6px 0;">When can a Sevak be Put Off Duty?</p>
            <ul style="margin:0; padding-left:18px; font-size:0.86rem; line-height:1.6;">
                <li>When disciplinary proceedings are contemplated or pending</li>
                <li>When a criminal case is under investigation / inquiry / trial</li>
            </ul>
        </div>
        <div style="background:#eaf4fb; border:1px solid #aed6f1; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1a5276; margin:0 0 6px 0;">Special Authority — Fraud/Embezzlement Cases</p>
            <p style="margin:0; font-size:0.86rem;">Inspector of Post Offices or ASPO can put GDS off duty under immediate intimation to Engaging Authority. Such order is effective for <strong>15 days</strong> only unless confirmed by Engaging Authority.</p>
        </div>
    </div>

    <h4 style="color:#1a5276; margin-bottom:8px;">Ex-Gratia Compensation during Put Off Duty</h4>
    <table style="width:100%; border-collapse:collapse; font-size:0.87rem;">
        <thead>
            <tr style="background:linear-gradient(90deg,#1b4f72,#2980b9); color:#fff;">
                <th style="padding:9px 14px; text-align:left;">Period of Put Off Duty</th>
                <th style="padding:9px 14px; text-align:left;">Compensation</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background:#f0f7ff;"><td style="padding:8px 14px; border:1px solid #d6eaf8;">First 90 days</td><td style="padding:8px 14px; border:1px solid #d6eaf8;"><strong>25%</strong> of TRCA + admissible DA per month</td></tr>
            <tr style="background:#fff;"><td style="padding:8px 14px; border:1px solid #d6eaf8;">Beyond 90 days (prolonged, not Sevak's fault)</td><td style="padding:8px 14px; border:1px solid #d6eaf8;">May be <strong>increased up to 50%</strong> of compensation for first 90 days</td></tr>
            <tr style="background:#f0f7ff;"><td style="padding:8px 14px; border:1px solid #d6eaf8;">Beyond 90 days (prolonged due to Sevak's fault)</td><td style="padding:8px 14px; border:1px solid #d6eaf8;">May be <strong>reduced up to 50%</strong> of compensation for first 90 days</td></tr>
            <tr style="background:#fdebd0;"><td style="padding:8px 14px; border:1px solid #fad7a0; color:#c0392b;">Absconding / Unauthorized Absence</td><td style="padding:8px 14px; border:1px solid #fad7a0; color:#c0392b; font-weight:bold;">NO ex-gratia compensation</td></tr>
        </tbody>
    </table>
    <p style="font-size:0.85rem; color:#555; margin-top:8px;"><strong>Special provision:</strong> If major penalty proceedings end with only a minor penalty — the Sevak gets <strong>full TRCA + allowances</strong> for the put off duty period.</p>
</div>

<div style="background:#fff; border:1px solid #fad7a0; border-radius:12px; padding:16px 20px; margin-bottom:18px;">
    <h3 style="color:#784212; border-left:4px solid #e67e22; padding-left:10px; margin-top:0;">Rules 13 & 14 — Appeal</h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#fef9e7; border:1px solid #fad7a0; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#7d3c11; margin:0 0 6px 0;">Who can Appeal?</p>
            <p style="margin:0; font-size:0.86rem;">A Sevak may appeal against:<br>• An order putting him off duty<br>• Any penalty under Rule 9<br>Appeal goes to the authority <strong>immediately superior</strong> to the one who passed the order.</p>
        </div>
        <div style="background:#fef9e7; border:1px solid #fad7a0; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#7d3c11; margin:0 0 6px 0;">Time Limit for Appeal</p>
            <p style="margin:0; font-size:0.86rem;"><strong>3 months</strong> from the date of receiving copy of the order. Appellate Authority may entertain late appeal if sufficient cause is shown.</p>
        </div>
    </div>
</div>

<div style="background:#fff; border:1px solid #d4e6f1; border-radius:12px; padding:16px 20px; margin-bottom:14px;">
    <h3 style="color:#1a5276; border-left:4px solid #2980b9; padding-left:10px; margin-top:0;">Rules 19 & 20 — Revision & Review</h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#eaf4fb; border:1px solid #aed6f1; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1a5276; margin:0 0 6px 0;">Rule 19 — Revision</p>
            <p style="margin:0; font-size:0.86rem;">Regional PMG / Head of Circle / superior authority may revise orders at any time. Revision cannot be done after <strong>6 months</strong> from the order date (except by Govt./Head of Circle/PMG Region), and also not before expiry of <strong>3 months</strong> appeal period.</p>
        </div>
        <div style="background:#eaf4fb; border:1px solid #aed6f1; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1a5276; margin:0 0 6px 0;">Rule 20 — Review</p>
            <p style="margin:0; font-size:0.86rem;">The <strong>President</strong> may review any order passed under these rules when new material or evidence — not available at the time of the original order — comes to light, which changes the nature of the case.</p>
        </div>
    </div>
</div>

<div style="background:#fff; border:1px solid #d5f5e3; border-radius:12px; padding:16px 20px; margin-bottom:14px;">
    <h3 style="color:#1e8449; border-left:4px solid #27ae60; padding-left:10px; margin-top:0;">GDS Conduct Rules — Rules 21 & 22</h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1e8449; margin:0 0 6px 0;">Rule 21 — General Conduct</p>
            <p style="margin:0; font-size:0.86rem;">Every Sevak shall at all times:<br>(i) Maintain <strong>absolute integrity</strong><br>(ii) Maintain <strong>devotion to duty</strong><br>(iii) Do nothing which is <strong>unbecoming</strong> of a Sevak</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1e8449; margin:0 0 6px 0;">Rule 21-A — Promptness &amp; Courtesy</p>
            <p style="margin:0; font-size:0.86rem;">No Sevak shall:<br>(i) Act in discourteous manner in official duties<br>(ii) Adopt dilatory tactics or wilfully cause delay in disposal of work</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1e8449; margin:0 0 6px 0;">Rule 21-B — Sexual Harassment</p>
            <p style="margin:0; font-size:0.86rem;">No GDS shall indulge in sexual harassment of any woman at any workplace. Sevak in charge of workplace shall take steps to PREVENT sexual harassment.</p>
        </div>
        <div style="background:#f0fff4; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#1e8449; margin:0 0 6px 0;">Rule 22 — Politics &amp; Elections</p>
            <p style="margin:0; font-size:0.86rem;">No Sevak shall be member of / associated with any political party or political activity. Duty to prevent family members from subversive political activities and report inability to do so to the Government.</p>
        </div>
    </div>
</div>
        `,
        guru_explanation: `
<div style="background:#0a192f; color:#ccd6f6; border-radius:16px; padding:20px 24px; margin-bottom:20px;">
    <h3 style="color:#64ffda; margin:0 0 14px 0; font-size:1rem; letter-spacing:0.5px;">🎯 Penalties Quick-Reference Card</h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#112240; border:1px solid #f39c12; border-radius:8px; padding:12px;">
            <p style="color:#f39c12; font-weight:bold; margin:0 0 8px 0; font-size:0.82rem; text-transform:uppercase;">MINOR PENALTIES</p>
            <ul style="color:#8892b0; margin:0; padding-left:16px; font-size:0.85rem; line-height:1.7;">
                <li>Censure</li>
                <li>Debarring (MTS/PA/SA/Postman) — max 3 yrs</li>
                <li>Recovery from TRCA</li>
                <li>Withholding increment — max 3 yrs</li>
            </ul>
        </div>
        <div style="background:#112240; border:1px solid #e74c3c; border-radius:8px; padding:12px;">
            <p style="color:#e74c3c; font-weight:bold; margin:0 0 8px 0; font-size:0.82rem; text-transform:uppercase;">MAJOR PENALTIES</p>
            <ul style="color:#8892b0; margin:0; padding-left:16px; font-size:0.85rem; line-height:1.7;">
                <li>TRCA stage reduction (>3 years)</li>
                <li>Compulsory Discharge (with benefits)</li>
                <li>Removal (NOT disqualified for future)</li>
                <li>Dismissal (IS disqualified for future)</li>
            </ul>
        </div>
    </div>
    <div style="margin-top:12px; background:#112240; border:1px solid #64ffda; border-radius:8px; padding:12px;">
        <p style="color:#64ffda; font-weight:bold; margin:0 0 6px 0; font-size:0.82rem;">REMOVAL vs DISMISSAL — KEY DIFFERENCE</p>
        <p style="color:#8892b0; margin:0; font-size:0.85rem;"><strong style="color:#ccd6f6;">Removal</strong> = Separated from service but <strong style="color:#27ae60;">NOT disqualified</strong> for future government engagement.<br><strong style="color:#ccd6f6;">Dismissal</strong> = Separated from service AND <strong style="color:#e74c3c;">IS ordinarily disqualified</strong> for future engagement — more severe!</strong></p>
    </div>
</div>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px;">
    <div style="background:#fef5e7; border:1px solid #fad7a0; border-radius:12px; padding:14px;">
        <h4 style="color:#7d3c11; margin:0 0 8px 0;">💡 Put Off Duty vs Suspension</h4>
        <p style="margin:0; font-size:0.87rem;">GDS are "Put Off Duty" — NOT "Suspended" (suspension is for regular govt servants). The ex-gratia is <strong>25% TRCA + DA</strong> for first 90 days, which can be increased to 50% or decreased to 12.5% of TRCA depending on fault.</p>
    </div>
    <div style="background:#e8f8f5; border:1px solid #a2d9ce; border-radius:12px; padding:14px;">
        <h4 style="color:#117a65; margin:0 0 8px 0;">💡 Appeal Time Limit Trick</h4>
        <p style="margin:0; font-size:0.87rem;">Appeal period = <strong>3 months</strong>. Revision limitation = <strong>6 months</strong>. Review by <strong>President</strong> = No time limit (based on new material evidence). Always remember: Appeal → 3 months, Revision → 6 months.</p>
    </div>
</div>

<div style="background:#f4f6f7; border:1px solid #abb2b9; border-radius:12px; padding:14px;">
    <h4 style="color:#2c3e50; margin:0 0 10px 0;">📊 Inquiry Requirement Summary</h4>
    <table style="width:100%; border-collapse:collapse; font-size:0.87rem;">
        <tr style="background:#2c3e50; color:#fff;">
            <th style="padding:8px 12px; text-align:left;">Penalty Type</th>
            <th style="padding:8px 12px; text-align:center;">Inquiry Required?</th>
            <th style="padding:8px 12px; text-align:left;">Note</th>
        </tr>
        <tr style="background:#fff;"><td style="padding:7px 12px; border:1px solid #d5dbdb;">Minor Penalty</td><td style="padding:7px 12px; border:1px solid #d5dbdb; text-align:center; color:#f39c12; font-weight:bold;">Discretionary</td><td style="padding:7px 12px; border:1px solid #d5dbdb; font-size:0.82rem;">Authority decides; not mandatory</td></tr>
        <tr style="background:#f4f6f7;"><td style="padding:7px 12px; border:1px solid #d5dbdb;">Major Penalty</td><td style="padding:7px 12px; border:1px solid #d5dbdb; text-align:center; color:#e74c3c; font-weight:bold;">Mandatory*</td><td style="padding:7px 12px; border:1px solid #d5dbdb; font-size:0.82rem;">*Unless charge unconditionally accepted</td></tr>
        <tr style="background:#fff;"><td style="padding:7px 12px; border:1px solid #d5dbdb;">Criminal conviction</td><td style="padding:7px 12px; border:1px solid #d5dbdb; text-align:center; color:#7d3c11; font-weight:bold;">NOT required</td><td style="padding:7px 12px; border:1px solid #d5dbdb; font-size:0.82rem;">Rule 11 — direct penalty</td></tr>
    </table>
</div>
        `,
        practical_example: `
<div style="background:#f8f9fa; border:1px solid #dee2e6; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#343a40; margin:0 0 12px 0;">📋 Exam-Style Solved Scenarios</h4>
    <div style="display:grid; grid-template-columns:1fr; gap:10px;">
        <div style="background:#fff3cd; border:1px solid #ffc107; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#856404; margin:0 0 4px 0;">Q: GDS Suresh is put off duty for 3 months. How much ex-gratia does he receive?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> For the first 90 days (3 months) = <strong>25% of TRCA + admissible DA per month</strong>. If prolonged beyond 90 days, authority can vary the rate.</p>
        </div>
        <div style="background:#d1ecf1; border:1px solid #bee5eb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#0c5460; margin:0 0 4px 0;">Q: GDS Lakshmi was put off duty for major penalty proceedings. The final order imposed only a minor penalty. What is she entitled to for the put off duty period?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> <strong>Full TRCA + all allowances</strong> for the entire put off duty period (as per Rule 12 proviso).</p>
        </div>
        <div style="background:#d4edda; border:1px solid #c3e6cb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#155724; margin:0 0 4px 0;">Q: What is the difference between penalty No. 8 (Removal) and No. 9 (Dismissal) under Rule 9?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> Removal (No. 8) = NOT a disqualification for future engagement. Dismissal (No. 9) = SHALL ORDINARILY be a disqualification for future engagement. Dismissal is the more severe punishment.</p>
        </div>
        <div style="background:#f8d7da; border:1px solid #f5c6cb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#721c24; margin:0 0 4px 0;">Q: GDS Arun was dismissed and wants to appeal. He received the order on 1 Jan 2025. What is the last date to appeal?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> <strong>31 March 2025</strong> (within 3 months from date of receiving order under Rule 14). Beyond this, only Appellate Authority can entertain with sufficient cause.</p>
        </div>
    </div>
</div>
        `,
        exam_insight: `
<div style="background:#fce4ec; border:1px solid #f48fb1; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#880e4f; margin:0 0 10px 0;">🔥 High-Priority Exam Points</h4>
    <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.8;">
        <li>Total penalties: <strong>9</strong> (Minor: 1–5, Major: 6–9)</li>
        <li>Censure is a <strong>minor</strong> penalty (No. 1)</li>
        <li>Debarring — max period → <strong>3 years</strong></li>
        <li>Dismissal <strong>ordinarily disqualifies</strong> for future engagement; Removal does NOT</li>
        <li>Major penalty inquiry is <strong>mandatory</strong> even if charges accepted</li>
        <li>Minor penalty inquiry is <strong>discretionary</strong></li>
        <li>Rule 10 procedure does NOT apply for <strong>criminal conviction</strong>, security of State, or where inquiry is impracticable</li>
        <li>Put off duty ex-gratia → <strong>25% TRCA + DA</strong> for first 90 days</li>
        <li>IPoS/ASPO put off duty order valid for only <strong>15 days</strong> unless confirmed</li>
        <li>Appeal period → <strong>3 months</strong></li>
        <li>Revision cannot be done after <strong>6 months</strong></li>
        <li>Review is by <strong>President</strong> — based on new material/evidence</li>
        <li>Rule 21 — GDS must maintain absolute integrity, devotion to duty, and avoid unbecoming conduct</li>
        <li>Rule 22 — GDS <strong>cannot join any political party</strong></li>
        <li>Post-discharge proceedings (10-G) cannot relate to events more than <strong>4 years</strong> before institution</li>
    </ul>
</div>
        `,
        status: "published",
        created_by: "admin@dakguru.com",
        createdAt: now,
        updatedAt: now,
    },
];

async function run() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        // Step 1: Delete the 2 old GDS entries (already deleted in a prior run — kept for idempotency)
        const deleteResult = await collection.deleteMany({
            _id: { $in: IDS_TO_DELETE.map(id => new ObjectId(id)) }
        });
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} old GDS entries`);

        // Step 2: Insert the 3 new comprehensive entries
        const insertResult = await collection.insertMany(entries);
        console.log(`✅ Inserted ${insertResult.insertedCount} new GDS C&E Rules entries`);

        console.log('\n📋 New entry titles:');
        entries.forEach((e, i) => console.log(`  ${i + 1}. ${e.title}`));

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
        console.log('\n✅ Done!');
    }
}

run();
