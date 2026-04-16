
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
if (!MONGODB_URI) { console.error('No MONGODB_URI'); process.exit(1); }

const ENTRY_ID = '69e10c97d264f226b1a562a5';

const official_text = `
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

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
        <div style="background:#eaf4fb; border:2px solid #3498db; border-radius:10px; padding:14px; text-align:center;">
            <p style="font-size:1.5rem; font-weight:900; color:#1a5276; margin:0;">20</p>
            <p style="font-size:0.8rem; font-weight:bold; color:#1a5276; margin:4px 0 0 0;">Days per Year</p>
            <p style="font-size:0.75rem; color:#7fb3d3; margin:0;">(10 per half year)</p>
        </div>
        <div style="background:#fdebd0; border:2px solid #e74c3c; border-radius:10px; padding:14px; text-align:center;">
            <p style="font-size:1rem; font-weight:900; color:#c0392b; margin:0;">WITHOUT</p>
            <p style="font-size:0.8rem; font-weight:bold; color:#c0392b; margin:4px 0 0 0;">Accumulation</p>
            <p style="font-size:0.75rem; color:#e67e22; margin:0;">(does not carry forward)</p>
        </div>
    </div>

    <div style="background:#fdedec; border:1px solid #f1948a; border-radius:8px; padding:12px; margin-bottom:12px;">
        <p style="font-weight:bold; color:#922b21; margin:0 0 4px 0;">📜 Rule 7 — Official Text</p>
        <p style="margin:0; font-size:0.87rem; font-style:italic;">&ldquo;The Gramin Dak Sevaks may be granted paid leave at the rate of <strong>20 days</strong> in a year (<strong>10 days</strong> for every half year) <strong>without accumulation</strong> or as may be determined by the Government from time to time.&rdquo;</p>
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
`;

const guru_explanation = `
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
                <td style="padding:8px 12px; border:1px solid #1d3461; color:#e74c3c; font-weight:bold;">WITHOUT accumulation (Rule 7)</td>
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
    <div style="background:#fdedec; border:1px solid #f1948a; border-radius:12px; padding:14px;">
        <h4 style="color:#922b21; margin:0 0 8px 0;">⚠️ Critical: Paid Leave is WITHOUT Accumulation</h4>
        <p style="margin:0; font-size:0.87rem;">Rule 7 clearly states paid leave is granted <strong>&ldquo;without accumulation&rdquo;</strong>. This means unused paid leave does <strong>NOT carry forward</strong> to the next year. GDS must utilise their 20 days within the year. This is unlike regular Govt. servants where Earned Leave accumulates up to 300 days.</p>
    </div>
    <div style="background:#fef5e7; border:1px solid #fad7a0; border-radius:12px; padding:14px;">
        <h4 style="color:#7d3c11; margin:0 0 8px 0;">⚡ Rule 8 Trap — Common Mistake</h4>
        <p style="margin:0; font-size:0.87rem;">Students confuse Rule 8 with disciplinary removal. Rule 8 is simple <strong>termination by notice</strong> (applicable only in first 3 years). It requires NO inquiry. But the Sevak loses gratuity and severance amount — a harsh but clear provision.</p>
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
`;

const practical_example = `
<div style="background:#f8f9fa; border:1px solid #dee2e6; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#343a40; margin:0 0 12px 0;">📋 Solved Examples</h4>
    <div style="display:grid; grid-template-columns:1fr; gap:10px;">
        <div style="background:#d1ecf1; border:1px solid #bee5eb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#0c5460; margin:0 0 4px 0;">Q: Ramesh joined as GDS on 1 Jan 2024. How many paid leaves does he earn by 31 Dec 2024?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> 10 days (for Jan–Jun) + 10 days (for Jul–Dec) = <strong>20 days</strong> total for the year. These must be used within the year — they do NOT carry forward (Rule 7: without accumulation).</p>
        </div>
        <div style="background:#fff3cd; border:1px solid #ffc107; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#856404; margin:0 0 4px 0;">Q: Ramesh did not take any paid leave in 2024. Can he carry 20 days forward to 2025?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> <strong>No.</strong> Rule 7 explicitly states paid leave is granted <strong>without accumulation</strong>. Unused leave lapses — it does not carry forward to the next year.</p>
        </div>
        <div style="background:#f8d7da; border:1px solid #f5c6cb; border-radius:8px; padding:12px;">
            <p style="font-weight:bold; color:#721c24; margin:0 0 4px 0;">Q: GDS Priya's engagement is terminated under Rule 8 after 2 years. Is she entitled to GDS Gratuity?</p>
            <p style="margin:0; font-size:0.87rem;"><strong>Answer:</strong> <strong>NO.</strong> Rule 8 Note 2 explicitly states that a GDS terminated under Rule 8 is not eligible for GDS Gratuity and Severance Amount.</p>
        </div>
    </div>
</div>
`;

const exam_insight = `
<div style="background:#fce4ec; border:1px solid #f48fb1; border-radius:12px; padding:16px 20px;">
    <h4 style="color:#880e4f; margin:0 0 10px 0;">🔥 Must-Know for Exam</h4>
    <ul style="margin:0; padding-left:18px; font-size:0.88rem; line-height:1.8;">
        <li>GDS Paid Leave rate → <strong>10 days per half year = 20 days per year</strong></li>
        <li>Paid Leave is granted <strong>WITHOUT accumulation</strong> (Rule 7 — does not carry forward)</li>
        <li>Emergency Leave → <strong>5 days per calendar year</strong> (Rule 7-A)</li>
        <li>Maternity Leave → <strong>180 days</strong> (female GDS with &lt; 2 surviving children) (Rule 7-B)</li>
        <li>Half Pay Leave → <strong>NOT available</strong> for GDS</li>
        <li>Termination notice (Rule 8) → <strong>1 month</strong> (by either party)</li>
        <li>Rule 8 applies only if engagement &lt; <strong>3 years</strong></li>
        <li>GDS terminated under Rule 8 → <strong>No gratuity, no severance amount</strong></li>
        <li>GDS do NOT get pension — they get <strong>GDS Gratuity + Severance + SDBS</strong></li>
        <li>SDBS subscription starts after <strong>1 year</strong> from date of joining</li>
    </ul>
</div>
`;

async function run() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db();
        const result = await db.collection('daksutras').updateOne(
            { _id: new ObjectId(ENTRY_ID) },
            { $set: { official_text, guru_explanation, practical_example, exam_insight, updatedAt: new Date() } }
        );
        console.log(`✅ Updated: ${result.modifiedCount} document(s)`);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
        console.log('✅ Done!');
    }
}

run();
