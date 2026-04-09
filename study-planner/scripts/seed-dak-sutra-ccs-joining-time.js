
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

function generateSlug(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const entries = [
    {
        title: "CCS (Joining Time) Rules, 1979 — Complete Guide: Scope, Admissibility, Amount & Pay",
        slug: generateSlug(),
        rule_number: "Rules 1–7 | GSR 695 dt. 08.05.1979 | Amended: GSR 197 dt. 10.03.1989 & GSR 229(E) dt. 27.03.2015",
        act_name: "CCS (Joining Time) Rules, 1979",
        category: "Rule",
        effective_date: new Date("1979-05-08"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:'Segoe UI',sans-serif; max-width:900px; margin:0 auto;">

  <div style="background:linear-gradient(135deg,#1e3a5f 0%,#2d5f8a 50%,#1a4f7a 100%); border-radius:14px; padding:28px 28px 22px; margin-bottom:24px;">
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
      <div style="background:rgba(255,255,255,0.15); border-radius:8px; padding:8px 12px; font-size:11px; font-weight:900; color:#93c5fd; letter-spacing:2px; text-transform:uppercase;">CCS Rules</div>
      <div style="background:rgba(255,255,255,0.1); border-radius:8px; padding:8px 12px; font-size:11px; font-weight:700; color:#fcd34d;">Rules 1–7 Complete</div>
    </div>
    <h1 style="color:#ffffff; font-size:22px; font-weight:900; margin:0 0 8px; line-height:1.3;">CCS (Joining Time) Rules, 1979</h1>
    <p style="color:#bfdbfe; font-size:13px; margin:0 0 16px; line-height:1.6;">Notified vide <strong style="color:#fde68a;">GSR 695 dated 8th May, 1979</strong> | Amended vide <strong style="color:#fde68a;">GSR 197 dated 10th March, 1989</strong> and <strong style="color:#fde68a;">GSR 229(E) dated 27th March, 2015</strong></p>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <span style="background:rgba(99,179,237,0.2); border:1px solid rgba(99,179,237,0.4); border-radius:20px; padding:4px 12px; font-size:11px; font-weight:700; color:#93c5fd;">LDCE IP</span>
      <span style="background:rgba(167,139,250,0.2); border:1px solid rgba(167,139,250,0.4); border-radius:20px; padding:4px 12px; font-size:11px; font-weight:700; color:#c4b5fd;">PS Group B</span>
      <span style="background:rgba(52,211,153,0.2); border:1px solid rgba(52,211,153,0.4); border-radius:20px; padding:4px 12px; font-size:11px; font-weight:700; color:#6ee7b7;">PM Grade I</span>
    </div>
  </div>

  <!-- RULE 1 -->
  <div style="background:#f0f7ff; border-left:4px solid #2563eb; border-radius:10px; padding:20px; margin-bottom:18px;">
    <h2 style="color:#1e40af; font-size:15px; font-weight:900; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">📋 Rule 1 — Application & Scope</h2>
    <p style="color:#1e3a5f; font-size:13px; line-height:1.7; margin:0 0 12px;">Joining Time is granted to a Government Servant when transferred to the control of another Government or organisation, <strong>in public interest</strong>.</p>
    <p style="color:#1e3a5f; font-size:13px; line-height:1.7; margin:0 0 12px;">These rules apply to all Government servants appointed in Civil Services and posts under the Central Government including <strong>work charged staff</strong>.</p>
    <div style="background:#fee2e2; border-radius:8px; padding:14px; border-left:3px solid #ef4444;">
      <p style="font-size:12px; font-weight:900; color:#991b1b; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.5px;">⛔ NOT Applicable To:</p>
      <ul style="color:#7f1d1d; font-size:13px; line-height:1.9; margin:0; padding-left:20px;">
        <li>(a) Railway employees</li>
        <li>(b) Armed Forces Personnel and those paid from defence services estimates</li>
        <li>(c) Government servants engaged on contract and those not in whole-time employment</li>
        <li>(d) Government servants paid out of contingencies</li>
      </ul>
    </div>
  </div>

  <!-- RULE 2 -->
  <div style="background:#f5f3ff; border-left:4px solid #7c3aed; border-radius:10px; padding:20px; margin-bottom:18px;">
    <h2 style="color:#5b21b6; font-size:15px; font-weight:900; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">🔄 Rule 2 — Transfer & Deputation</h2>
    <p style="color:#2d1b69; font-size:13px; line-height:1.7; margin:0 0 10px;">When a Government servant is transferred to another Government/organisation which has made <strong>separate rules</strong> prescribing joining time, his joining time (for journey to join the new post and for return journey) shall be governed by <strong>those rules</strong>.</p>
    <p style="color:#2d1b69; font-size:13px; line-height:1.7; margin:0;">Exception: Unless different provisions are expressly made in the <strong>terms of deputation/foreign service by mutual agreement</strong> between the lending and borrowing authorities.</p>
  </div>

  <!-- RULE 4 -->
  <div style="background:#ecfdf5; border-left:4px solid #059669; border-radius:10px; padding:20px; margin-bottom:18px;">
    <h2 style="color:#065f46; font-size:15px; font-weight:900; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">✅ Rule 4 — Admissibility of Joining Time</h2>
    <ul style="color:#065f46; font-size:13px; line-height:1.9; margin:0 0 12px; padding-left:20px;">
      <li>Granted on transfer <strong>in public interest</strong> to enable the servant to join the new post</li>
      <li><strong>No joining time</strong> for temporary transfer ≤ <strong>180 days</strong> — only actual transit time allowed</li>
      <li>Surplus staff transferred under Scheme Regulating Redeployment of Surplus Staff → <strong>eligible</strong></li>
      <li>Govt servants discharged due to reduction of establishment and reappointed to another Central Govt Office → <strong>entitled</strong> (subject to conditions)</li>
      <li>Competitive exam/interview appointees (Central/State Govt employees) → eligible if they <strong>opt for counting past service</strong></li>
    </ul>
    <div style="background:#d1fae5; border-radius:8px; padding:12px; border:1px solid #6ee7b7;">
      <p style="font-size:12px; font-weight:900; color:#065f46; margin:0 0 6px;">🚫 Transfer on Own Request:</p>
      <p style="font-size:13px; color:#047857; margin:0; line-height:1.6;">Joining Time is <strong>NOT admissible</strong>. The intervening period may be regularized by grant of <strong>leave applicable</strong> to him. [OM No. 19011/33/81-Allowances dt. 29.01.1983]</p>
    </div>
  </div>

  <!-- RULE 5 -->
  <div style="background:#fffbeb; border-left:4px solid #d97706; border-radius:10px; padding:20px; margin-bottom:18px;">
    <h2 style="color:#92400e; font-size:15px; font-weight:900; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">📅 Rule 5 — Commencement & Amount of Joining Time</h2>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
      <div style="background:#fef3c7; border-radius:8px; padding:12px; border:1px solid #fcd34d; text-align:center;">
        <div style="font-size:11px; font-weight:900; color:#92400e; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Charge given in FORENOON</div>
        <div style="font-size:16px; font-weight:900; color:#d97706;">SAME DATE</div>
        <div style="font-size:11px; color:#78350f; margin-top:4px;">Joining time starts from that very day</div>
      </div>
      <div style="background:#fef3c7; border-radius:8px; padding:12px; border:1px solid #fcd34d; text-align:center;">
        <div style="font-size:11px; font-weight:900; color:#92400e; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Charge given in AFTERNOON</div>
        <div style="font-size:16px; font-weight:900; color:#d97706;">NEXT DATE</div>
        <div style="font-size:11px; color:#78350f; margin-top:4px;">Joining time starts from following day</div>
      </div>
    </div>
    <div style="background:#fff7ed; border-radius:8px; padding:12px; border:1px solid #fed7aa; margin-bottom:16px;">
      <p style="font-size:12px; font-weight:900; color:#9a3412; margin:0 0 4px; text-transform:uppercase;">Same Station Transfer (No Change of Residence):</p>
      <p style="font-size:14px; font-weight:900; color:#ea580c; margin:0;">Maximum: <strong>1 day</strong> only</p>
    </div>
    <p style="color:#92400e; font-size:13px; font-weight:700; margin:0 0 12px;">Inter-Station Transfer (Change of Residence) — Distance-Based Table:</p>
    <div style="overflow-x:auto; border-radius:10px; border:1px solid #fcd34d;">
      <table style="width:100%; border-collapse:collapse; font-size:12px;">
        <thead>
          <tr style="background:linear-gradient(90deg,#d97706,#b45309);">
            <th style="padding:11px 14px; text-align:left; color:#fff; font-weight:900; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-right:1px solid rgba(255,255,255,0.2);">Distance Between Old HQ & New HQ</th>
            <th style="padding:11px 14px; text-align:center; color:#fde68a; font-weight:900; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-right:1px solid rgba(255,255,255,0.2);">Normal Joining Time</th>
            <th style="padding:11px 14px; text-align:center; color:#fde68a; font-weight:900; font-size:11px; text-transform:uppercase; letter-spacing:0.5px;">If Road Travel &gt;200 km Necessarily Continuous</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#fffbeb;">
            <td style="padding:11px 14px; color:#1c1917; font-weight:700; border-bottom:1px solid #fcd34d; border-right:1px solid #fcd34d;">Up to <strong>1,000 km</strong></td>
            <td style="padding:11px 14px; text-align:center; font-weight:900; color:#b45309; border-bottom:1px solid #fcd34d; border-right:1px solid #fcd34d;">10 days</td>
            <td style="padding:11px 14px; text-align:center; font-weight:900; color:#059669; border-bottom:1px solid #fcd34d;">12 days</td>
          </tr>
          <tr style="background:#fef9ee;">
            <td style="padding:11px 14px; color:#1c1917; font-weight:700; border-bottom:1px solid #fcd34d; border-right:1px solid #fcd34d;">More than <strong>1,000 km</strong></td>
            <td style="padding:11px 14px; text-align:center; font-weight:900; color:#b45309; border-bottom:1px solid #fcd34d; border-right:1px solid #fcd34d;">12 days</td>
            <td style="padding:11px 14px; text-align:center; font-weight:900; color:#059669; border-bottom:1px solid #fcd34d;">15 days</td>
          </tr>
          <tr style="background:#fffbeb;">
            <td style="padding:11px 14px; color:#1c1917; font-weight:700; border-right:1px solid #fcd34d;">More than <strong>2,000 km</strong></td>
            <td style="padding:11px 14px; text-align:center; font-weight:900; color:#b45309; border-right:1px solid #fcd34d;"><strong>15 days</strong><br><span style="font-size:10px; color:#78350f;">(12 days if travel by air)</span></td>
            <td style="padding:11px 14px; text-align:center; font-weight:900; color:#059669;">15 days</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="background:#fef3c7; border-radius:8px; padding:12px; margin-top:14px; border-left:3px solid #f59e0b;">
      <p style="font-size:12px; font-weight:900; color:#78350f; margin:0 0 4px;">🏝️ Special Remote Area Provision:</p>
      <p style="font-size:13px; color:#92400e; margin:0; line-height:1.6;">Transfer to/from <strong>North Eastern Region, Sikkim, Andaman &amp; Nicobar Islands, Lakshadweep, Ladakh</strong> → <strong>+2 additional days</strong> over and above the normal joining time. [Rule 5 &amp; Notification dt. 27.03.2015]</p>
    </div>
    <div style="background:#ecfdf5; border-radius:8px; padding:12px; margin-top:10px; border-left:3px solid #10b981;">
      <p style="font-size:12px; color:#065f46; margin:0; line-height:1.6;"><strong>Distance = Actual distance travelled</strong>, not weighted mileage for which fare is charged by Railways in ghat/hill regions.</p>
    </div>
  </div>

  <!-- RULE 6 -->
  <div style="background:#f0fdf4; border-left:4px solid #16a34a; border-radius:10px; padding:20px; margin-bottom:18px;">
    <h2 style="color:#14532d; font-size:15px; font-weight:900; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">💳 Rule 6 — Crediting & Combination of Joining Time</h2>
    <ul style="color:#14532d; font-size:13px; line-height:1.9; margin:0 0 12px; padding-left:20px;">
      <li><strong>Unutilized joining time</strong> → credited to <strong>Earned Leave account</strong> [CCS (Leave) Rules, 1972 — Rule 26]</li>
      <li>Joining time may be <strong>combined</strong> with vacation and/or regular leave of any kind or duration <strong>EXCEPT Casual Leave</strong></li>
    </ul>
    <div style="background:#dcfce7; border-radius:8px; padding:12px; border:1px solid #86efac;">
      <p style="font-size:12px; font-weight:900; color:#14532d; margin:0 0 6px;">🔀 Revised Transfer Orders While In Transit:</p>
      <p style="font-size:13px; color:#166534; margin:0; line-height:1.6;">If directed to a different place while in transit → joining time already availed = counted as fresh spell. <strong>Full joining time</strong> afresh from the date following receipt of revised orders. [Rule 6 &amp; Notification dt. 27.03.2015]</p>
    </div>
  </div>

  <!-- RULE 7 -->
  <div style="background:#fdf4ff; border-left:4px solid #9333ea; border-radius:10px; padding:20px; margin-bottom:18px;">
    <h2 style="color:#581c87; font-size:15px; font-weight:900; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">💰 Rule 7 — Joining Time Pay & Allowances</h2>
    <p style="color:#3b0764; font-size:13px; line-height:1.7; margin:0 0 14px;">A Government servant on joining time is treated as <strong>ON DUTY</strong> during the entire period.</p>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
      <div style="background:#f3e8ff; border-radius:8px; padding:12px; border:1px solid #d8b4fe; text-align:center;">
        <div style="font-size:20px; margin-bottom:4px;">✅</div>
        <div style="font-size:11px; font-weight:900; color:#6b21a8; text-transform:uppercase; margin-bottom:6px;">ENTITLED TO</div>
        <ul style="color:#3b0764; font-size:12px; line-height:1.9; margin:0; padding-left:16px; text-align:left;">
          <li>Joining Time Pay (= last pay drawn)</li>
          <li>Dearness Allowance (DA)</li>
          <li>House Rent Allowance (of old station)</li>
        </ul>
      </div>
      <div style="background:#fce7f3; border-radius:8px; padding:12px; border:1px solid #f9a8d4; text-align:center;">
        <div style="font-size:20px; margin-bottom:4px;">⛔</div>
        <div style="font-size:11px; font-weight:900; color:#9d174d; text-transform:uppercase; margin-bottom:6px;">NOT ENTITLED TO</div>
        <ul style="color:#831843; font-size:12px; line-height:1.9; margin:0; padding-left:16px; text-align:left;">
          <li>Conveyance Allowance</li>
          <li>Permanent Travelling Allowance</li>
          <li>City Compensatory Allowance (abolished — 6th CPC)</li>
        </ul>
      </div>
    </div>
    <div style="background:#f3e8ff; border-radius:8px; padding:12px; margin-top:12px; border-left:3px solid #a855f7;">
      <p style="font-size:13px; color:#6b21a8; margin:0; line-height:1.6;">Joining time pay shall be paid by the <strong>new administrative authority</strong> where such Govt servant joins on transfer. [Rule 7 &amp; Notification dt. 27.03.2015]</p>
    </div>
  </div>

</div>
`,

        guru_explanation: `
<div style="font-family:'Segoe UI',sans-serif; max-width:900px; margin:0 auto;">

  <div style="background:linear-gradient(135deg,#0f766e,#0d9488,#14b8a6); border-radius:14px; padding:22px 24px; margin-bottom:22px; color:white;">
    <div style="font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#99f6e4; margin-bottom:8px;">🎓 Dak Guru Explains</div>
    <h2 style="font-size:18px; font-weight:900; margin:0 0 8px;">What is Joining Time? — The Simple Picture</h2>
    <p style="font-size:13px; color:#ccfbf1; margin:0; line-height:1.7;">When you get transferred from one post/place to another, you don't disappear from pay rolls. The government gives you time to travel, settle, and report — that's <strong style="color:#f0fdfa;">Joining Time</strong>. During this period you are treated as <em>on duty</em>, get full pay, and the period counts as service.</p>
  </div>

  <!-- SECTION 1: WHO GETS IT -->
  <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:18px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(90deg,#1d4ed8,#2563eb); padding:14px 20px;">
      <h3 style="color:#fff; font-size:14px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">1️⃣ Who Gets Joining Time?</h3>
    </div>
    <div style="padding:18px 20px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#eff6ff; border-radius:8px; padding:14px; border-left:3px solid #2563eb;">
          <div style="font-size:11px; font-weight:900; color:#1e40af; text-transform:uppercase; margin-bottom:8px;">✅ Covered</div>
          <ul style="color:#1e3a5f; font-size:12.5px; line-height:1.8; margin:0; padding-left:16px;">
            <li>All Central Govt civil servants</li>
            <li>Work-charged staff</li>
            <li>State Govt servants on deputation to Central Govt</li>
            <li>Railway/Armed Forces on deputation to Civil (CCS rules apply)</li>
          </ul>
        </div>
        <div style="background:#fef2f2; border-radius:8px; padding:14px; border-left:3px solid #dc2626;">
          <div style="font-size:11px; font-weight:900; color:#991b1b; text-transform:uppercase; margin-bottom:8px;">⛔ Excluded</div>
          <ul style="color:#7f1d1d; font-size:12.5px; line-height:1.8; margin:0; padding-left:16px;">
            <li>Railway employees</li>
            <li>Armed Forces / Defence paid</li>
            <li>Contract employees</li>
            <li>Part-time employees</li>
            <li>Paid from contingencies</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 2: WHEN IS IT ADMISSIBLE -->
  <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:18px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(90deg,#059669,#10b981); padding:14px 20px;">
      <h3 style="color:#fff; font-size:14px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">2️⃣ When is Joining Time Admissible?</h3>
    </div>
    <div style="padding:18px 20px;">
      <div style="overflow-x:auto; border-radius:8px; border:1px solid #d1fae5;">
        <table style="width:100%; border-collapse:collapse; font-size:12.5px;">
          <thead>
            <tr style="background:#064e3b;">
              <th style="padding:11px 14px; text-align:left; color:#6ee7b7; font-weight:900; border-right:1px solid rgba(255,255,255,0.1);">Situation</th>
              <th style="padding:11px 14px; text-align:center; color:#6ee7b7; font-weight:900; border-right:1px solid rgba(255,255,255,0.1);">JT Admissible?</th>
              <th style="padding:11px 14px; text-align:left; color:#6ee7b7; font-weight:900;">What Applies?</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#ecfdf5;">
              <td style="padding:10px 14px; color:#065f46; font-weight:600; border-bottom:1px solid #d1fae5; border-right:1px solid #d1fae5;">Transfer in public interest</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#059669; border-bottom:1px solid #d1fae5; border-right:1px solid #d1fae5;">✅ YES</td>
              <td style="padding:10px 14px; color:#065f46; border-bottom:1px solid #d1fae5;">Full joining time as per Rule 5</td>
            </tr>
            <tr style="background:#f0fdf4;">
              <td style="padding:10px 14px; color:#065f46; font-weight:600; border-bottom:1px solid #d1fae5; border-right:1px solid #d1fae5;">Transfer on own request</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#dc2626; border-bottom:1px solid #d1fae5; border-right:1px solid #d1fae5;">❌ NO</td>
              <td style="padding:10px 14px; color:#065f46; border-bottom:1px solid #d1fae5;">Regularized by leave</td>
            </tr>
            <tr style="background:#ecfdf5;">
              <td style="padding:10px 14px; color:#065f46; font-weight:600; border-bottom:1px solid #d1fae5; border-right:1px solid #d1fae5;">Temporary transfer ≤ 180 days</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#dc2626; border-bottom:1px solid #d1fae5; border-right:1px solid #d1fae5;">❌ NO JT</td>
              <td style="padding:10px 14px; color:#065f46; border-bottom:1px solid #d1fae5;">Only actual transit time</td>
            </tr>
            <tr style="background:#f0fdf4;">
              <td style="padding:10px 14px; color:#065f46; font-weight:600; border-right:1px solid #d1fae5;">Surplus staff redeployment</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#059669; border-right:1px solid #d1fae5;">✅ YES</td>
              <td style="padding:10px 14px; color:#065f46;">Full joining time</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- SECTION 3: HOW MUCH -->
  <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:18px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(90deg,#d97706,#f59e0b); padding:14px 20px;">
      <h3 style="color:#fff; font-size:14px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">3️⃣ How Much Joining Time? — The Master Formula</h3>
    </div>
    <div style="padding:18px 20px;">

      <!-- Same station -->
      <div style="background:#fffbeb; border-radius:10px; padding:14px; border:2px solid #fcd34d; margin-bottom:14px; text-align:center;">
        <div style="font-size:12px; font-weight:900; color:#92400e; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Same Station / No Change of Residence</div>
        <div style="font-size:28px; font-weight:900; color:#d97706; margin:4px 0;">1 Day Maximum</div>
        <div style="font-size:12px; color:#78350f;">No travel involved — just 1 day to take charge</div>
      </div>

      <!-- Distance table compact -->
      <div style="font-size:12px; font-weight:900; color:#374151; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">Inter-Station Transfer (Change of Residence):</div>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:14px;">
        <div style="background:linear-gradient(135deg,#dbeafe,#bfdbfe); border-radius:10px; padding:14px; text-align:center; border:1px solid #93c5fd;">
          <div style="font-size:11px; font-weight:900; color:#1e40af; text-transform:uppercase; margin-bottom:4px;">≤ 1,000 km</div>
          <div style="font-size:24px; font-weight:900; color:#1d4ed8;">10</div>
          <div style="font-size:10px; color:#1e40af; font-weight:700;">days normal</div>
          <div style="font-size:10px; color:#059669; font-weight:900; margin-top:4px;">12 days (road &gt;200km)</div>
        </div>
        <div style="background:linear-gradient(135deg,#ede9fe,#ddd6fe); border-radius:10px; padding:14px; text-align:center; border:1px solid #c4b5fd;">
          <div style="font-size:11px; font-weight:900; color:#5b21b6; text-transform:uppercase; margin-bottom:4px;">&gt; 1,000 km</div>
          <div style="font-size:24px; font-weight:900; color:#6d28d9;">12</div>
          <div style="font-size:10px; color:#5b21b6; font-weight:700;">days normal</div>
          <div style="font-size:10px; color:#059669; font-weight:900; margin-top:4px;">15 days (road &gt;200km)</div>
        </div>
        <div style="background:linear-gradient(135deg,#fce7f3,#fbcfe8); border-radius:10px; padding:14px; text-align:center; border:1px solid #f9a8d4;">
          <div style="font-size:11px; font-weight:900; color:#9d174d; text-transform:uppercase; margin-bottom:4px;">&gt; 2,000 km</div>
          <div style="font-size:24px; font-weight:900; color:#be185d;">15</div>
          <div style="font-size:10px; color:#9d174d; font-weight:700;">days normal</div>
          <div style="font-size:10px; color:#dc2626; font-weight:900; margin-top:4px;">12 days if by ✈️ AIR</div>
        </div>
      </div>

      <!-- Remote area bonus -->
      <div style="background:linear-gradient(90deg,#0f172a,#1e293b); border-radius:10px; padding:14px 16px; display:flex; align-items:center; gap:14px;">
        <div style="font-size:28px; flex-shrink:0;">🏝️</div>
        <div>
          <div style="font-size:11px; font-weight:900; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">Remote Area Bonus (+2 Days Extra)</div>
          <div style="font-size:12.5px; color:#e2e8f0; line-height:1.6;">Transfer <strong>to or from</strong>: North Eastern Region • Sikkim • Andaman &amp; Nicobar Islands • Lakshadweep • Ladakh</div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 4: WHEN DOES IT START -->
  <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:18px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(90deg,#7c3aed,#8b5cf6); padding:14px 20px;">
      <h3 style="color:#fff; font-size:14px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">4️⃣ When Does Joining Time Start?</h3>
    </div>
    <div style="padding:18px 20px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe); border-radius:10px; padding:16px; border:2px solid #c4b5fd; text-align:center;">
          <div style="font-size:30px; margin-bottom:8px;">🌅</div>
          <div style="font-size:11px; font-weight:900; color:#5b21b6; text-transform:uppercase; margin-bottom:6px;">Charge handed over in FORENOON</div>
          <div style="font-size:16px; font-weight:900; color:#6d28d9;">Joining Time starts</div>
          <div style="font-size:22px; font-weight:900; color:#7c3aed; margin:4px 0;">SAME DAY</div>
        </div>
        <div style="background:linear-gradient(135deg,#fdf4ff,#f3e8ff); border-radius:10px; padding:16px; border:2px solid #d8b4fe; text-align:center;">
          <div style="font-size:30px; margin-bottom:8px;">🌆</div>
          <div style="font-size:11px; font-weight:900; color:#7e22ce; text-transform:uppercase; margin-bottom:6px;">Charge handed over in AFTERNOON</div>
          <div style="font-size:16px; font-weight:900; color:#6d28d9;">Joining Time starts</div>
          <div style="font-size:22px; font-weight:900; color:#7c3aed; margin:4px 0;">NEXT DAY</div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 5: PAY & ALLOWANCES -->
  <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:18px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(90deg,#0f766e,#14b8a6); padding:14px 20px;">
      <h3 style="color:#fff; font-size:14px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">5️⃣ Pay & Allowances During Joining Time</h3>
    </div>
    <div style="padding:18px 20px;">
      <div style="background:#f0fdfa; border-radius:8px; padding:12px; border-left:4px solid #14b8a6; margin-bottom:14px;">
        <p style="font-size:13px; font-weight:900; color:#0f766e; margin:0;">🔑 Key Principle: The Govt servant on joining time is treated as <span style="background:#ccfbf1; border-radius:4px; padding:2px 6px;">ON DUTY</span></p>
      </div>
      <div style="overflow-x:auto; border-radius:8px; border:1px solid #99f6e4;">
        <table style="width:100%; border-collapse:collapse; font-size:12.5px;">
          <thead>
            <tr style="background:#0f766e;">
              <th style="padding:10px 14px; text-align:left; color:#99f6e4; font-weight:900;">Allowance / Pay</th>
              <th style="padding:10px 14px; text-align:center; color:#99f6e4; font-weight:900;">Status</th>
              <th style="padding:10px 14px; text-align:left; color:#99f6e4; font-weight:900;">Basis</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#f0fdfa; border-bottom:1px solid #ccfbf1;">
              <td style="padding:10px 14px; color:#134e4a; font-weight:700; border-right:1px solid #99f6e4;">Joining Time Pay</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#059669; border-right:1px solid #99f6e4;">✅ Paid</td>
              <td style="padding:10px 14px; color:#134e4a;">Equal to pay drawn at old post (before handing over charge)</td>
            </tr>
            <tr style="background:#ecfdf5; border-bottom:1px solid #ccfbf1;">
              <td style="padding:10px 14px; color:#134e4a; font-weight:700; border-right:1px solid #99f6e4;">Dearness Allowance (DA)</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#059669; border-right:1px solid #99f6e4;">✅ Paid</td>
              <td style="padding:10px 14px; color:#134e4a;">Appropriate to the joining time pay</td>
            </tr>
            <tr style="background:#f0fdfa; border-bottom:1px solid #ccfbf1;">
              <td style="padding:10px 14px; color:#134e4a; font-weight:700; border-right:1px solid #99f6e4;">House Rent Allowance (HRA)</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#059669; border-right:1px solid #99f6e4;">✅ Paid</td>
              <td style="padding:10px 14px; color:#134e4a;">As applicable to <strong>old station</strong> (from where transferred)</td>
            </tr>
            <tr style="background:#ecfdf5; border-bottom:1px solid #ccfbf1;">
              <td style="padding:10px 14px; color:#134e4a; font-weight:700; border-right:1px solid #99f6e4;">Conveyance Allowance</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#dc2626; border-right:1px solid #99f6e4;">❌ Not paid</td>
              <td style="padding:10px 14px; color:#134e4a;">Not admissible during joining time</td>
            </tr>
            <tr style="background:#f0fdfa;">
              <td style="padding:10px 14px; color:#134e4a; font-weight:700; border-right:1px solid #99f6e4;">Permanent Travelling Allowance</td>
              <td style="padding:10px 14px; text-align:center; font-weight:900; color:#dc2626; border-right:1px solid #99f6e4;">❌ Not paid</td>
              <td style="padding:10px 14px; color:#134e4a;">Not admissible during joining time</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="background:#f0fdfa; border-radius:8px; padding:12px; margin-top:12px; border-left:3px solid #14b8a6;">
        <p style="font-size:13px; color:#0f766e; margin:0; line-height:1.6;"><strong>Who pays?</strong> — Joining time pay is paid by the <strong>new administrative authority</strong> where the Govt servant joins on transfer.</p>
      </div>
    </div>
  </div>

  <!-- SECTION 6: UNUSED JT -->
  <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:6px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(90deg,#0369a1,#0284c7); padding:14px 20px;">
      <h3 style="color:#fff; font-size:14px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">6️⃣ What Happens to Unused Joining Time?</h3>
    </div>
    <div style="padding:18px 20px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#f0f9ff; border-radius:8px; padding:14px; border-left:3px solid #0284c7;">
          <div style="font-size:11px; font-weight:900; color:#0369a1; text-transform:uppercase; margin-bottom:6px;">Unused JT → Earned Leave</div>
          <p style="font-size:12.5px; color:#0c4a6e; margin:0; line-height:1.7;">Unutilized joining time is <strong>credited to Earned Leave account</strong> under CCS (Leave) Rules, 1972 [Rule 26]</p>
        </div>
        <div style="background:#f0f9ff; border-radius:8px; padding:14px; border-left:3px solid #0ea5e9;">
          <div style="font-size:11px; font-weight:900; color:#0369a1; text-transform:uppercase; margin-bottom:6px;">Combination Allowed</div>
          <p style="font-size:12.5px; color:#0c4a6e; margin:0; line-height:1.7;">Joining time can be combined with <strong>any leave (including vacation)</strong> EXCEPT <strong>Casual Leave</strong></p>
        </div>
      </div>
    </div>
  </div>

</div>
`,

        practical_example: `
<div style="font-family:'Segoe UI',sans-serif; max-width:900px; margin:0 auto;">

  <div style="background:linear-gradient(135deg,#1e40af,#3b82f6); border-radius:12px; padding:18px 22px; margin-bottom:20px; color:white;">
    <div style="font-size:11px; font-weight:900; color:#bfdbfe; text-transform:uppercase; letter-spacing:2px; margin-bottom:6px;">Case Studies</div>
    <h2 style="font-size:17px; font-weight:900; margin:0;">Real Scenarios — Apply the Rules</h2>
  </div>

  <!-- Case 1 -->
  <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:18px 20px; margin-bottom:14px;">
    <div style="display:flex; align-items:flex-start; gap:14px;">
      <div style="background:#0284c7; color:white; border-radius:8px; padding:6px 10px; font-size:12px; font-weight:900; flex-shrink:0;">CASE 1</div>
      <div style="flex:1;">
        <p style="font-size:13px; color:#0c4a6e; font-weight:700; margin:0 0 8px;">Ramesh, a PA in Mumbai GPO, is transferred in public interest to Kolkata. Distance: 1,900 km. He hands over charge at 11:00 AM on 10th April 2026.</p>
        <div style="background:#e0f2fe; border-radius:8px; padding:12px; border-left:3px solid #0284c7;">
          <p style="font-size:12px; font-weight:900; color:#0369a1; margin:0 0 6px;">Calculation:</p>
          <ul style="font-size:12.5px; color:#0c4a6e; margin:0; padding-left:18px; line-height:1.9;">
            <li>Distance 1,900 km → More than 1,000 km → <strong>12 days</strong> normal joining time</li>
            <li>Charge given in forenoon (11:00 AM) → Joining time starts <strong>10th April itself</strong></li>
            <li>He must join by <strong>21st April 2026</strong> (10th + 11 more days = 21st)</li>
            <li>If he joins on 18th April → Unused 3 days → <strong>Credited to Earned Leave</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Case 2 -->
  <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:18px 20px; margin-bottom:14px;">
    <div style="display:flex; align-items:flex-start; gap:14px;">
      <div style="background:#16a34a; color:white; border-radius:8px; padding:6px 10px; font-size:12px; font-weight:900; flex-shrink:0;">CASE 2</div>
      <div style="flex:1;">
        <p style="font-size:13px; color:#14532d; font-weight:700; margin:0 0 8px;">Sunita is transferred from Delhi to Port Blair (Andaman & Nicobar Islands). Distance: 2,400 km. She must travel by road for 220 km.</p>
        <div style="background:#dcfce7; border-radius:8px; padding:12px; border-left:3px solid #16a34a;">
          <p style="font-size:12px; font-weight:900; color:#166534; margin:0 0 6px;">Calculation:</p>
          <ul style="font-size:12.5px; color:#14532d; margin:0; padding-left:18px; line-height:1.9;">
            <li>Distance 2,400 km → More than 2,000 km</li>
            <li>Road travel &gt;200 km → <strong>15 days</strong> (not the air-reduced 12 days)</li>
            <li>Port Blair = Andaman & Nicobar → <strong>+2 days remote area bonus</strong></li>
            <li><strong>Total Joining Time = 15 + 2 = 17 days</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Case 3 -->
  <div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:12px; padding:18px 20px; margin-bottom:14px;">
    <div style="display:flex; align-items:flex-start; gap:14px;">
      <div style="background:#d97706; color:white; border-radius:8px; padding:6px 10px; font-size:12px; font-weight:900; flex-shrink:0;">CASE 3</div>
      <div style="flex:1;">
        <p style="font-size:13px; color:#78350f; font-weight:700; margin:0 0 8px;">Vijay requests a transfer from Hyderabad to Chennai (own request). Distance: 700 km. He asks: Can I get joining time?</p>
        <div style="background:#fef3c7; border-radius:8px; padding:12px; border-left:3px solid #d97706;">
          <p style="font-size:12px; font-weight:900; color:#92400e; margin:0 0 6px;">Answer:</p>
          <p style="font-size:12.5px; color:#78350f; margin:0; line-height:1.7;"><strong>No joining time</strong> is admissible on transfer on own request. The intervening period between relinquishment at Chennai and taking charge at Hyderabad can only be regularized as <strong>leave</strong> (EL/HPL etc.) applicable to him. [OM No. 19011/33/81-Allowances dt. 29.01.1983]</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Case 4 -->
  <div style="background:#fdf4ff; border:1px solid #e9d5ff; border-radius:12px; padding:18px 20px;">
    <div style="display:flex; align-items:flex-start; gap:14px;">
      <div style="background:#7c3aed; color:white; border-radius:8px; padding:6px 10px; font-size:12px; font-weight:900; flex-shrink:0;">CASE 4</div>
      <div style="flex:1;">
        <p style="font-size:13px; color:#3b0764; font-weight:700; margin:0 0 8px;">Priya is transferred from Delhi to Pune (1,400 km) and while in transit, gets revised orders directing her to Bengaluru instead. She had availed 5 days of joining time so far.</p>
        <div style="background:#f3e8ff; border-radius:8px; padding:12px; border-left:3px solid #7c3aed;">
          <p style="font-size:12px; font-weight:900; color:#581c87; margin:0 0 6px;">Rule 6 — Fresh Spell Principle:</p>
          <ul style="font-size:12.5px; color:#3b0764; margin:0; padding-left:18px; line-height:1.9;">
            <li>5 days already availed = treated as <strong>fresh spell</strong> (not wasted)</li>
            <li>From the day after she receives revised orders → <strong>full fresh joining time starts again</strong></li>
            <li>Delhi → Bengaluru = ~2,150 km → More than 2,000 km → <strong>15 days fresh</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</div>
`,

        exam_insight: `
<div style="font-family:'Segoe UI',sans-serif; max-width:900px; margin:0 auto;">

  <div style="background:linear-gradient(135deg,#92400e,#d97706,#f59e0b); border-radius:14px; padding:22px 24px; margin-bottom:20px; color:white;">
    <div style="font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#fde68a; margin-bottom:8px;">⚡ Exam Insight</div>
    <h2 style="font-size:18px; font-weight:900; margin:0 0 6px;">CCS (Joining Time) Rules — The Numbers That Matter</h2>
    <p style="font-size:13px; color:#fef3c7; margin:0;">Everything examiners love to ask — in one place.</p>
  </div>

  <!-- RAPID REVISION TABLE -->
  <div style="background:#1e293b; border-radius:12px; overflow:hidden; margin-bottom:18px;">
    <div style="padding:14px 20px; background:#0f172a; border-bottom:1px solid #334155;">
      <h3 style="color:#f8fafc; font-size:13px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">📊 Rapid Revision — All Key Numbers at a Glance</h3>
    </div>
    <div style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:12.5px;">
        <thead>
          <tr style="background:#1e3a5f;">
            <th style="padding:10px 14px; text-align:left; color:#93c5fd; font-weight:900; border-right:1px solid #334155;">Topic / Rule</th>
            <th style="padding:10px 14px; text-align:center; color:#fde68a; font-weight:900;">Key Figure / Answer</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#1e293b; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">Notification — Original</td>
            <td style="padding:10px 14px; text-align:center; color:#f0abfc; font-weight:700;">GSR 695 dated 8th May, 1979</td>
          </tr>
          <tr style="background:#263245; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">Last amendment</td>
            <td style="padding:10px 14px; text-align:center; color:#f0abfc; font-weight:700;">GSR 229(E) dated 27th March, 2015</td>
          </tr>
          <tr style="background:#1e293b; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">Same station joining time (max)</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#4ade80;">1 day</td>
          </tr>
          <tr style="background:#263245; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">Temporary transfer — no JT if duration ≤</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#f87171;">180 days</td>
          </tr>
          <tr style="background:#1e293b; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">≤ 1,000 km — normal JT</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#4ade80;">10 days</td>
          </tr>
          <tr style="background:#263245; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">≤ 1,000 km — if road &gt;200 km</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#fbbf24;">12 days</td>
          </tr>
          <tr style="background:#1e293b; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">&gt; 1,000 km — normal JT</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#4ade80;">12 days</td>
          </tr>
          <tr style="background:#263245; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">&gt; 1,000 km — if road &gt;200 km</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#fbbf24;">15 days</td>
          </tr>
          <tr style="background:#1e293b; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">&gt; 2,000 km — normal JT</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#4ade80;">15 days</td>
          </tr>
          <tr style="background:#263245; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">&gt; 2,000 km — if travel by AIR</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#f87171;">12 days (reduced!)</td>
          </tr>
          <tr style="background:#1e293b; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">NE Region / Sikkim / A&amp;N / Lakshadweep / Ladakh bonus</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#a78bfa;">+2 additional days</td>
          </tr>
          <tr style="background:#263245; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">Unutilized JT credited as</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#6ee7b7;">Earned Leave</td>
          </tr>
          <tr style="background:#1e293b; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">JT can be combined with</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#4ade80;">Any leave EXCEPT Casual Leave</td>
          </tr>
          <tr style="background:#263245; border-bottom:1px solid #334155;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">JT Pay = paid by</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#fbbf24;">New administrative authority</td>
          </tr>
          <tr style="background:#1e293b;">
            <td style="padding:10px 14px; color:#94a3b8; border-right:1px solid #334155;">HRA during JT (which station?)</td>
            <td style="padding:10px 14px; text-align:center; font-weight:900; color:#fb923c;">Old station rates</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- TRICKY POINTS -->
  <div style="background:#fff7ed; border-radius:12px; overflow:hidden; border:1px solid #fed7aa; margin-bottom:18px;">
    <div style="background:#c2410c; padding:12px 18px;">
      <h3 style="color:#fff; font-size:13px; font-weight:900; margin:0; text-transform:uppercase; letter-spacing:0.5px;">🎯 Commonly Tested Tricky Points</h3>
    </div>
    <div style="padding:18px;">
      <div style="display:grid; grid-template-columns:1fr; gap:10px;">

        <div style="background:#fef9ee; border-radius:8px; padding:12px; border-left:3px solid #f97316;">
          <p style="font-size:12px; font-weight:900; color:#9a3412; margin:0 0 4px;">❓ Can JT be combined with Casual Leave?</p>
          <p style="font-size:13px; color:#431407; margin:0;"><strong>NO.</strong> JT can be combined with any leave or vacation EXCEPT Casual Leave.</p>
        </div>

        <div style="background:#fef9ee; border-radius:8px; padding:12px; border-left:3px solid #f97316;">
          <p style="font-size:12px; font-weight:900; color:#9a3412; margin:0 0 4px;">❓ Who pays Joining Time Pay?</p>
          <p style="font-size:13px; color:#431407; margin:0;"><strong>New administrative authority</strong> (not the old one). Common trick — don't confuse with old station.</p>
        </div>

        <div style="background:#fef9ee; border-radius:8px; padding:12px; border-left:3px solid #f97316;">
          <p style="font-size:12px; font-weight:900; color:#9a3412; margin:0 0 4px;">❓ For &gt;2,000 km, when is joining time 12 days (not 15)?</p>
          <p style="font-size:13px; color:#431407; margin:0;">Only when the entire journey is by <strong>air</strong>. The maximum is capped at 12 days in that case (not 15).</p>
        </div>

        <div style="background:#fef9ee; border-radius:8px; padding:12px; border-left:3px solid #f97316;">
          <p style="font-size:12px; font-weight:900; color:#9a3412; margin:0 0 4px;">❓ Is JT admissible for temporary transfer of 6 months?</p>
          <p style="font-size:13px; color:#431407; margin:0;"><strong>No</strong> — 6 months = 180 days. JT is NOT admissible for temporary transfer up to and including 180 days. Only actual transit time.</p>
        </div>

        <div style="background:#fef9ee; border-radius:8px; padding:12px; border-left:3px solid #f97316;">
          <p style="font-size:12px; font-weight:900; color:#9a3412; margin:0 0 4px;">❓ Distance = actual or weighted mileage?</p>
          <p style="font-size:13px; color:#431407; margin:0;"><strong>Actual distance travelled</strong> — NOT the weighted mileage charged by Railways for ghat/hill regions.</p>
        </div>

        <div style="background:#fef9ee; border-radius:8px; padding:12px; border-left:3px solid #f97316;">
          <p style="font-size:12px; font-weight:900; color:#9a3412; margin:0 0 4px;">❓ Charge handed over at 2:30 PM — when does JT start?</p>
          <p style="font-size:13px; color:#431407; margin:0;"><strong>Next day.</strong> Charge given in the afternoon → JT commences from the following date.</p>
        </div>

      </div>
    </div>
  </div>

  <!-- MEMORY AID -->
  <div style="background:linear-gradient(135deg,#1e3a5f,#1e40af,#1d4ed8); border-radius:12px; padding:20px 24px; color:white;">
    <h3 style="font-size:14px; font-weight:900; margin:0 0 14px; text-transform:uppercase; letter-spacing:0.5px; color:#bfdbfe;">🧠 Memory Aid — "10-12-15 Rule"</h3>
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:14px;">
      <div style="background:rgba(255,255,255,0.1); border-radius:8px; padding:12px; text-align:center; border:1px solid rgba(255,255,255,0.2);">
        <div style="font-size:28px; font-weight:900; color:#93c5fd;">10</div>
        <div style="font-size:10px; color:#bfdbfe; font-weight:700; text-transform:uppercase;">≤ 1,000 km</div>
        <div style="font-size:10px; color:#93c5fd; margin-top:2px;">→ 12 with road</div>
      </div>
      <div style="background:rgba(255,255,255,0.1); border-radius:8px; padding:12px; text-align:center; border:1px solid rgba(255,255,255,0.2);">
        <div style="font-size:28px; font-weight:900; color:#fde68a;">12</div>
        <div style="font-size:10px; color:#fef9c3; font-weight:700; text-transform:uppercase;">&gt; 1,000 km</div>
        <div style="font-size:10px; color:#fde68a; margin-top:2px;">→ 15 with road</div>
      </div>
      <div style="background:rgba(255,255,255,0.1); border-radius:8px; padding:12px; text-align:center; border:1px solid rgba(255,255,255,0.2);">
        <div style="font-size:28px; font-weight:900; color:#6ee7b7;">15</div>
        <div style="font-size:10px; color:#a7f3d0; font-weight:700; text-transform:uppercase;">&gt; 2,000 km</div>
        <div style="font-size:10px; color:#f87171; margin-top:2px;">→ 12 if by ✈️ air</div>
      </div>
    </div>
    <div style="background:rgba(255,255,255,0.08); border-radius:8px; padding:12px; border:1px solid rgba(255,255,255,0.15);">
      <p style="font-size:12.5px; color:#e2e8f0; margin:0; line-height:1.7;"><strong style="color:#fde68a;">Trick to remember HRA:</strong> "You left your house behind at the OLD station — so HRA is for the OLD place." <br><strong style="color:#fde68a;">Trick to remember JT Pay:</strong> "The NEW authority gets you, so the NEW authority pays you."</p>
    </div>
  </div>

</div>
`,
        createdAt: now,
        updatedAt: now,
    }
];

async function main() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('daksutras');

    let inserted = 0;
    for (const entry of entries) {
        const existing = await collection.findOne({ title: entry.title });
        if (existing) {
            console.log(`⏭️  Already exists: ${entry.title}`);
            continue;
        }
        const result = await collection.insertOne(entry);
        console.log(`✅ Inserted: ${entry.title} [${result.insertedId}]`);
        inserted++;
    }

    console.log(`\n🎉 Done! ${inserted} new Dak Sutra ${inserted === 1 ? 'entry' : 'entries'} inserted.`);
    await client.close();
}

main().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});
