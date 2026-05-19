
const { MongoClient } = require('mongodb');
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

const now = new Date();

const entries = [
    {
        title: "General Financial Rules (GFR) 2017 — Chapter 2 & 6: Procurement, Losses & Financial Propriety",
        rule_number: "Rules 21, 33, 143, 164, 177, 197 of GFR 2017",
        act_name: "General Financial Rules, 2017",
        category: "Rule",
        effective_date: new Date("2017-03-07"),
        exam_tags: ["LDCE IP", "PS Group B"],

        // ─── OFFICIAL PROVISION ────────────────────────────────────────────────
        official_text: `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0c2461,#1e3799);color:white;padding:14px 20px;border-radius:12px 12px 0 0;display:flex;align-items:center;gap:12px">
    <span style="font-size:24px">📜</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;opacity:0.75">Ministry of Finance · Government of India</div>
      <div style="font-size:16px;font-weight:900;margin-top:3px">Constitutional Basis — Government &amp; Public Accounts</div>
    </div>
  </div>
  <div style="border:2px solid #c7d3f0;border-top:none;border-radius:0 0 12px 12px;overflow:hidden">
    <div style="background:#f0f4ff;padding:14px 18px;border-bottom:1px solid #dce4f5">
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px">
        <span style="background:#0c2461;color:white;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:800;white-space:nowrap;flex-shrink:0">Art. 150 &amp; 283(1)</span>
        <div style="font-size:13.5px;color:#1a2a5e;line-height:1.8"><strong>Government Account:</strong> All moneys received by or on behalf of the Government — whether as dues, for deposit, remittance or otherwise — shall be brought into <strong style="color:#0c2461">Government Account without delay</strong>.</div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px">
        <span style="background:#1e3799;color:white;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:800;white-space:nowrap;flex-shrink:0">Art. 284</span>
        <div style="font-size:13.5px;color:#1a2a5e;line-height:1.8"><strong>Public Account:</strong> All moneys received by or deposited with <em>any officer</em>, other than revenues or public moneys raised by Government, shall be paid into the <strong style="color:#1e3799">Public Account</strong>. This includes all moneys received by or deposited with the Supreme Court of India or any other Court (other than a High Court) within a Union Territory.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#006266,#00897b);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">⚖️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rule 21 · GFR 2017</div>
      <div style="font-size:14px;font-weight:900">Standards of Financial Propriety</div>
    </div>
  </div>
  <div style="border:2px solid #a8d5c9;border-top:none;border-radius:0 0 10px 10px;padding:14px 18px;background:#e8f8f5">
    <p style="margin:0 0 8px 0;font-size:14px;color:#00574a;line-height:1.9">Every officer incurring or authorizing expenditure from public moneys must be guided by <strong>high standards of financial propriety</strong>. The expenditure should <strong>not be prima-facie more than the occasion demands</strong>.</p>
    <div style="display:flex;align-items:center;gap:8px;background:#00574a;color:white;padding:8px 14px;border-radius:8px;font-size:12.5px;font-weight:700">
      <span>💡</span> The officer must ensure that government funds are spent wisely, prudently, and only to the extent necessary.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#4a148c,#7b1fa2);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📦 Definition of Goods — Rule 143
  </div>
  <div style="border:2px solid #ce93d8;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#f3e5f5">
          <th style="padding:10px 14px;text-align:left;font-size:12px;color:#4a148c;font-weight:800;width:50%;border-bottom:2px solid #ce93d8">✅ INCLUDES</th>
          <th style="padding:10px 14px;text-align:left;font-size:12px;color:#b71c1c;font-weight:800;border-bottom:2px solid #ce93d8;border-left:2px solid #ce93d8">❌ EXCLUDES</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:12px 14px;font-size:13px;color:#4a148c;background:#fdf6ff;border-right:2px solid #ce93d8;vertical-align:top;line-height:1.85">
            All <strong>tangible or intangible products</strong> such as:<br>
            • Software, technology transfer<br>
            • Licenses, patents &amp; intellectual properties<br>
            • Works and services<br>
            • Transportation, insurance<br>
            • Installation, commissioning<br>
            • Training and maintenance
          </td>
          <td style="padding:12px 14px;font-size:13px;color:#b71c1c;background:#fff8f8;vertical-align:top;line-height:1.85">
            <strong>Books, publications, periodicals, etc.</strong> procured for a library are <em>strictly excluded</em> from the definition of Goods under GFR.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#bf360c,#e64a19);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🤝 Consulting vs. Non-Consulting Services — Rules 177 &amp; 197
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #ffab91;border-top:none">
    <thead>
      <tr style="background:#fbe9e7">
        <th style="padding:10px 14px;font-size:12px;color:#bf360c;font-weight:800;text-align:left;border-right:1px solid #ffab91">Rule 177 — CONSULTING SERVICE</th>
        <th style="padding:10px 14px;font-size:12px;color:#0d47a1;font-weight:800;text-align:left">Rule 197 — NON-CONSULTING SERVICE</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:12px 14px;font-size:13px;color:#bf360c;background:#fff8f6;border-right:1px solid #ffab91;vertical-align:top;line-height:1.85">
          Any subject matter of procurement <em>other than goods or works</em>, involving:<br>
          • <strong>Professional, intellectual</strong> services<br>
          • <strong>Training &amp; advisory</strong> services<br><br>
          <span style="background:#bf360c;color:white;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:800">NOTE:</span> Does <u>NOT</u> include direct engagement of a retired Government servant.
        </td>
        <td style="padding:12px 14px;font-size:13px;color:#0d47a1;background:#f3f8ff;vertical-align:top;line-height:1.85">
          Procurement involving <strong>physical, measurable deliverables</strong> where performance standards can be clearly identified. Includes:<br>
          • Maintenance contracts<br>
          • Hiring of vehicles<br>
          • Building facilities management<br>
          • Security services
        </td>
      </tr>
    </tbody>
  </table>
</div>`,

        // ─── DAK GURU EXPLANATION ───────────────────────────────────────────────
        guru_explanation: `
<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🚫 The Golden Rule of Splitting — Anti-Fragmentation Principle
  </div>
  <div style="border:2px solid #9fa8da;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e8eaf6">
    <p style="margin:0 0 12px 0;font-size:14px;color:#1a237e;line-height:1.9">A demand for goods <strong>shall NOT be divided into small quantities</strong> to make piecemeal purchases. This rule prevents officers from intentionally:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:white;border:1px solid #9fa8da;border-radius:8px;padding:12px 14px;font-size:13px;color:#1a237e;line-height:1.7">
        <strong style="color:#c0392b">❌ Bypassing</strong> GeM reverse auction rules by keeping value under the ₹10L threshold
      </div>
      <div style="background:white;border:1px solid #9fa8da;border-radius:8px;padding:12px 14px;font-size:13px;color:#1a237e;line-height:1.7">
        <strong style="color:#c0392b">❌ Avoiding</strong> seeking approval from higher authorities by splitting one big purchase into many small ones
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#880e4f,#c2185b);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🚨 Handling Losses &amp; Defalcations — Rule 33
  </div>
  <div style="border:2px solid #f48fb1;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#fce4ec">
          <th style="padding:10px 14px;text-align:left;font-size:12px;color:#880e4f;font-weight:800;border-bottom:1px solid #f48fb1">Situation</th>
          <th style="padding:10px 14px;text-align:center;font-size:12px;color:#880e4f;font-weight:800;border-bottom:1px solid #f48fb1;border-left:1px solid #f48fb1">Action Required</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff">
          <td style="padding:10px 14px;font-size:13px;color:#333;border-bottom:1px solid #f8bbd0;border-right:1px solid #f48fb1">Any loss of public money, stamps, or government property</td>
          <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#880e4f;text-align:center;border-bottom:1px solid #f8bbd0">Report immediately to the next higher authority</td>
        </tr>
        <tr style="background:#fff5f8">
          <td style="padding:10px 14px;font-size:13px;color:#333;border-bottom:1px solid #f8bbd0;border-right:1px solid #f48fb1">Petty losses of value <strong>up to ₹10,000</strong></td>
          <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#27ae60;text-align:center;border-bottom:1px solid #f8bbd0">❌ No need to report</td>
        </tr>
        <tr style="background:#fff">
          <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1">Mistakes in assessments</td>
          <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#27ae60;text-align:center">❌ No need to report</td>
        </tr>
        <tr style="background:#fff5f8">
          <td style="padding:10px 14px;font-size:13px;color:#333;border-top:1px solid #f8bbd0;border-right:1px solid #f48fb1">Loss <strong>exceeding ₹50,000</strong> due to fire, theft, or fraud</td>
          <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c0392b;text-align:center;border-top:1px solid #f8bbd0">🚔 Police must be brought in for investigation</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#004d40,#00695c);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    ⏳ The Lifespan of a Sanction — Lapse Rule
  </div>
  <div style="border:2px solid #80cbc4;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e0f2f1">
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
      <div style="background:white;border:2px solid #00897b;border-radius:10px;padding:14px 18px;flex:1;min-width:180px;text-align:center">
        <div style="font-size:11px;font-weight:800;color:#004d40;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Sanction Issued</div>
        <div style="font-size:28px;font-weight:900;color:#00695c">Day 0</div>
      </div>
      <div style="font-size:24px;color:#00695c;font-weight:900">→</div>
      <div style="background:white;border:2px dashed #00897b;border-radius:10px;padding:14px 18px;flex:1;min-width:180px;text-align:center">
        <div style="font-size:11px;font-weight:800;color:#004d40;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Payment Window</div>
        <div style="font-size:28px;font-weight:900;color:#00695c">12 Months</div>
      </div>
      <div style="font-size:24px;color:#c0392b;font-weight:900">→</div>
      <div style="background:#ffebee;border:2px solid #ef9a9a;border-radius:10px;padding:14px 18px;flex:1;min-width:180px;text-align:center">
        <div style="font-size:11px;font-weight:800;color:#c0392b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">If No Payment Made</div>
        <div style="font-size:24px;font-weight:900;color:#c0392b">SANCTION LAPSES</div>
      </div>
    </div>
    <p style="margin:12px 0 0 0;font-size:13px;color:#004d40;line-height:1.8"><strong>Key Point:</strong> If no payment (even in part) is made within <strong>12 months</strong> from the date of issue of the sanction, it automatically lapses. Fresh sanction must be obtained.</p>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#4527a0,#6a1b9a);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📊 QCBS Grading System — Quality &amp; Cost Based Selection
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #ce93d8;border-top:none">
    <thead>
      <tr style="background:#ede7f6">
        <th style="padding:10px 14px;text-align:left;font-size:12px;color:#4527a0;font-weight:800;border-right:1px solid #ce93d8;border-bottom:2px solid #ce93d8">Grade</th>
        <th style="padding:10px 14px;text-align:center;font-size:12px;color:#4527a0;font-weight:800;border-right:1px solid #ce93d8;border-bottom:2px solid #ce93d8">Score Range</th>
        <th style="padding:10px 14px;text-align:center;font-size:12px;color:#4527a0;font-weight:800;border-bottom:2px solid #ce93d8">Technical Marks Awarded</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#f9f0ff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#f39c12,#f1c40f);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">⭐ Outstanding</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#4527a0;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">91 – 100</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#f39c12;border-bottom:1px solid #ede7f6">100</td>
      </tr>
      <tr style="background:#ffffff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#27ae60,#2ecc71);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">✨ Excellent</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#4527a0;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">81 – 90</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#27ae60;border-bottom:1px solid #ede7f6">90</td>
      </tr>
      <tr style="background:#f9f0ff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#2980b9,#3498db);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">💎 Very Good</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#4527a0;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">71 – 80</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#2980b9;border-bottom:1px solid #ede7f6">80</td>
      </tr>
      <tr style="background:#ffffff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#16a085,#1abc9c);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">👍 Good</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#4527a0;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">61 – 70</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#16a085;border-bottom:1px solid #ede7f6">70</td>
      </tr>
      <tr style="background:#f9f0ff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#7f8c8d,#95a5a6);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">🔵 Very Fair</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#4527a0;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">51 – 60</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#7f8c8d;border-bottom:1px solid #ede7f6">60</td>
      </tr>
      <tr style="background:#ffffff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#8e44ad,#9b59b6);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">📋 Fair</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#4527a0;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">41 – 50</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#8e44ad;border-bottom:1px solid #ede7f6">50</td>
      </tr>
      <tr style="background:#f9f0ff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#e67e22,#d35400);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">📉 Average</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#4527a0;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">31 – 40</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#e67e22;border-bottom:1px solid #ede7f6">40</td>
      </tr>
      <tr style="background:#ffffff">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6"><span style="background:linear-gradient(135deg,#c0392b,#e74c3c);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">⬇️ Below Average</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:700;color:#999;border-right:1px solid #ce93d8;border-bottom:1px solid #ede7f6">—</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#c0392b;border-bottom:1px solid #ede7f6">Zero (0)</td>
      </tr>
      <tr style="background:#fff5f5">
        <td style="padding:9px 14px;border-right:1px solid #ce93d8"><span style="background:linear-gradient(135deg,#7b0000,#b71c1c);color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">💀 Very Poor</span></td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:700;color:#999;border-right:1px solid #ce93d8">—</td>
        <td style="padding:9px 14px;text-align:center;font-size:18px;font-weight:900;color:#b71c1c">0</td>
      </tr>
    </tbody>
  </table>
  <div style="background:#4527a0;color:white;padding:10px 16px;border-radius:0 0 8px 8px;font-size:12.5px;margin-top:-2px">
    ⚠️ <strong>Key Rule:</strong> Technical weightage in QCBS must <strong>never exceed 80%</strong>. Default ratio is <strong>70:30</strong> (Technical : Financial).
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🧮 CTFS Calculation — Combined Technical &amp; Financial Score (Weightage 70:30)
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #90caf9;border-top:none">
    <thead>
      <tr style="background:#e3f2fd">
        <th style="padding:10px 12px;font-size:12px;color:#0d47a1;font-weight:800;border-right:1px solid #90caf9;border-bottom:2px solid #90caf9;text-align:left">Bidder</th>
        <th style="padding:10px 12px;font-size:12px;color:#0d47a1;font-weight:800;border-right:1px solid #90caf9;border-bottom:2px solid #90caf9;text-align:center">Formula Applied (70:30)</th>
        <th style="padding:10px 12px;font-size:12px;color:#0d47a1;font-weight:800;border-right:1px solid #90caf9;border-bottom:2px solid #90caf9;text-align:center">CTFS Score</th>
        <th style="padding:10px 12px;font-size:12px;color:#0d47a1;font-weight:800;border-bottom:2px solid #90caf9;text-align:center">Rank</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#e8f5e9">
        <td style="padding:10px 12px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Bidder 1</td>
        <td style="padding:10px 12px;font-size:12px;color:#1b5e20;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd;font-family:monospace">100×(70/100) + 76.92×(30/100)</td>
        <td style="padding:10px 12px;text-align:center;font-size:18px;font-weight:900;color:#1b5e20;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">93.07</td>
        <td style="padding:10px 12px;text-align:center;border-bottom:1px solid #e3f2fd"><span style="background:#f39c12;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:13px">🥇 L1</span></td>
      </tr>
      <tr style="background:#e3f2fd">
        <td style="padding:10px 12px;font-size:13px;font-weight:800;color:#0d47a1;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Bidder 2</td>
        <td style="padding:10px 12px;font-size:12px;color:#0d47a1;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd;font-family:monospace">90×(70/100) + 83.33×(30/100)</td>
        <td style="padding:10px 12px;text-align:center;font-size:18px;font-weight:900;color:#0d47a1;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">87.99</td>
        <td style="padding:10px 12px;text-align:center;border-bottom:1px solid #e3f2fd"><span style="background:#78909c;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:13px">🥈 L2</span></td>
      </tr>
      <tr style="background:#fff8e1">
        <td style="padding:10px 12px;font-size:13px;font-weight:800;color:#e65100;border-right:1px solid #90caf9">Bidder 4</td>
        <td style="padding:10px 12px;font-size:12px;color:#e65100;border-right:1px solid #90caf9;font-family:monospace">80×(70/100) + 100×(30/100)</td>
        <td style="padding:10px 12px;text-align:center;font-size:18px;font-weight:900;color:#e65100;border-right:1px solid #90caf9">86.00</td>
        <td style="padding:10px 12px;text-align:center"><span style="background:#8d6e63;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:13px">🥉 L3</span></td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    💰 Critical Financial Limits — GeM &amp; Procurement Thresholds (Revised 2024)
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #a5d6a7;border-top:none">
    <thead>
      <tr style="background:#e8f5e9">
        <th style="padding:10px 14px;text-align:left;font-size:12px;color:#1b5e20;font-weight:800;border-right:1px solid #a5d6a7;border-bottom:2px solid #a5d6a7">Category / Method</th>
        <th style="padding:10px 14px;text-align:center;font-size:12px;color:#1b5e20;font-weight:800;border-bottom:2px solid #a5d6a7">Financial Limit / Value</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#f1f8e9">
        <td colspan="2" style="padding:6px 14px;font-size:11px;font-weight:900;color:#558b2f;letter-spacing:0.1em;text-transform:uppercase;background:#c8e6c9;border-bottom:1px solid #a5d6a7">🛒 GeM PROCUREMENT</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Direct GeM Purchase</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#1b5e20;border-bottom:1px solid #dcedc8">Up to <strong>₹50,000</strong> <span style="font-size:11px;color:#558b2f;font-weight:700">(Revised from ₹25,000 w.e.f 10.07.2024)</span></td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">GeM L-1 (Lowest of 3 sellers)</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#1b5e20;border-bottom:1px solid #dcedc8">₹50,000 to <strong>₹10,00,000</strong> <span style="font-size:11px;color:#558b2f;font-weight:700">(Revised w.e.f 10.07.2024)</span></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">GeM Online Bidding / Reverse Auction</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#c0392b;border-bottom:1px solid #dcedc8">Above <strong>₹10,00,000</strong> <span style="font-size:11px;color:#c0392b;font-weight:700">(Revised from ₹5L w.e.f 10.07.2024)</span></td>
      </tr>
      <tr style="background:#f1f8e9">
        <td colspan="2" style="padding:6px 14px;font-size:11px;font-weight:900;color:#558b2f;letter-spacing:0.1em;text-transform:uppercase;background:#c8e6c9;border-bottom:1px solid #a5d6a7">📋 TENDER ENQUIRY</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Purchase without Quotation</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#1b5e20;border-bottom:1px solid #dcedc8">Up to <strong>₹50,000</strong> on each occasion</td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Local Purchase Committee (LPC)</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#1b5e20;border-bottom:1px solid #dcedc8">₹50,000 to <strong>₹5,00,000</strong> <span style="font-size:11px;color:#558b2f;font-weight:700">(Revised w.e.f 10.07.2024)</span></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Limited Tender Enquiry</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#e67e22;border-bottom:1px solid #dcedc8">Up to <strong>₹50 Lakhs</strong> <span style="font-size:11px;color:#e67e22;font-weight:700">(Revised from ₹25L w.e.f 10.07.2024)</span></td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Advertised Tender Enquiry</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#c0392b;border-bottom:1px solid #dcedc8">₹50 Lakhs and above</td>
      </tr>
      <tr style="background:#f1f8e9">
        <td colspan="2" style="padding:6px 14px;font-size:11px;font-weight:900;color:#558b2f;letter-spacing:0.1em;text-transform:uppercase;background:#c8e6c9;border-bottom:1px solid #a5d6a7">🔐 SECURITY &amp; ADVANCE PAYMENT</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Bid Security (Earnest Money)</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#0d47a1;border-bottom:1px solid #dcedc8"><strong>2% to 5%</strong> of estimated value</td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Performance Security</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#0d47a1;border-bottom:1px solid #dcedc8"><strong>3% to 5%</strong> of contract value <span style="font-size:11px;color:#0d47a1;font-weight:700">(Revised w.e.f 01.01.2024)</span></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Advance Payment — Private Firms</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#8e44ad;border-bottom:1px solid #dcedc8">Max <strong>30%</strong> of contract value</td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #a5d6a7">Advance Payment — Govt/PSU</td>
        <td style="padding:9px 14px;text-align:center;font-size:15px;font-weight:900;color:#8e44ad">Max <strong>40%</strong> of contract value</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#e65100,#f57c00);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏦 Facilities, Conditions &amp; Eligibility
  </div>
  <div style="border:2px solid #ffcc80;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#fff8e1">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div style="background:white;border:1px solid #ffcc80;border-left:4px solid #f57c00;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📅 Supplier Registration</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Registered for a fixed period of <strong>1 to 3 years</strong>. Must apply afresh for renewal after expiry.</div>
      </div>
      <div style="background:white;border:1px solid #ffcc80;border-left:4px solid #f57c00;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">⏰ Performance Security Validity</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Must remain valid for <strong>60 days beyond</strong> the date of completion of all contractual obligations including warranty.</div>
      </div>
      <div style="background:white;border:1px solid #ffcc80;border-left:4px solid #c0392b;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#c0392b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🚫 Debarment Rules</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Guilty under <strong>Prevention of Corruption Act</strong>: Debarred up to <strong>3 years</strong>.<br>Breaching <strong>Code of Integrity</strong>: Debarred up to <strong>2 years</strong>.</div>
      </div>
      <div style="background:white;border:1px solid #ffcc80;border-left:4px solid #27ae60;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#27ae60;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Bid Security Exemptions</div>
        <div style="font-size:13px;color:#333;line-height:1.8">MSMEs, GeM Registered Bidders, Bidders with &gt;₹500 Cr turnover (once in 3 FYs), GeM Vendor Assessed, Startups, BIS Certified primary product suppliers.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#006064,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔟 Step-by-Step: Two-Stage Bidding Process — Rule 164
  </div>
  <div style="border:2px solid #80deea;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e0f7fa">
    <ol style="margin:0;padding-left:22px;line-height:2.2;font-size:14px;color:#006064">
      <li><strong>Stage 1 — Invitation:</strong> The Ministry/Department invites bids through an <em>advertised tender</em> containing technical aspects and terms <strong>without asking for a bid price</strong>.</li>
      <li><strong>Stage 1 — Evaluation:</strong> An appropriate committee evaluates all eligible first-stage bids on technical merit.</li>
      <li><strong>Stage 2 — Final Bids:</strong> The procuring entity invites all <em>non-rejected</em> bidders to present a final bid <strong>with bid prices</strong> in response to a revised set of terms and conditions.</li>
    </ol>
  </div>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#4a0072,#6a1b9a);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔟 Step-by-Step: Reporting of Losses — Rule 33
  </div>
  <div style="border:2px solid #ce93d8;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f3e5f5">
    <ol style="margin:0;padding-left:22px;line-height:2.2;font-size:14px;color:#4a0072">
      <li><strong>Initial Report:</strong> Submit as soon as a suspicion arises that a loss has taken place — don't wait for confirmation.</li>
      <li><strong>Investigation:</strong> Conduct a full and thorough enquiry into the circumstances of the loss.</li>
      <li><strong>Final Report:</strong> Send to authorities indicating the <em>nature of loss</em>, <em>rule violations</em>, and <em>prospects of recovery</em>.</li>
      <li><strong>Forwarding:</strong> Send a copy of the report to the <strong>Audit Officer</strong> and the <strong>Pay and Accounts Officer</strong>.</li>
    </ol>
  </div>
</div>`,

        // ─── PRACTICAL EXAMPLE ─────────────────────────────────────────────────
        practical_example: `
<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1a6fa8,#2980b9);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">📌</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 1 · GeM Direct Purchase</div>
      <div style="font-size:14px;font-weight:900">Sr. Postmaster, Tiruchirappalli HO — Office Stationery ₹35,000</div>
    </div>
  </div>
  <div style="border:2px solid #aed6f1;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#eaf4fc;border-right:1px solid #aed6f1">
        <div style="font-size:10px;font-weight:800;color:#1a6fa8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Sr. Postmaster needs to procure <strong>office stationery worth ₹35,000</strong> for day-to-day use.</div>
      </div>
      <div style="padding:14px 16px;background:#e8f8f5;border-right:1px solid #aed6f1">
        <div style="font-size:10px;font-weight:800;color:#00574a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🔍 Analysis</div>
        <div style="font-size:13px;color:#222;line-height:1.7">₹35,000 falls within the <strong>Direct GeM Purchase</strong> limit of up to ₹50,000 (revised w.e.f 10.07.2024).</div>
      </div>
      <div style="padding:14px 16px;background:#e8f5e9">
        <div style="font-size:10px;font-weight:800;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Procurement can be made through <strong>any available supplier on GeM</strong> meeting the required quality and specifications — no bidding needed.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#b71c1c,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">🌊</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 2 · Loss Reporting (Rule 33)</div>
      <div style="font-size:14px;font-weight:900">Flood Damage to Postal Properties — Loss of ₹75,000</div>
    </div>
  </div>
  <div style="border:2px solid #ef9a9a;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#ffebee;border-right:1px solid #ef9a9a">
        <div style="font-size:10px;font-weight:800;color:#b71c1c;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">A severe flood damages postal properties in the division — estimated loss of <strong>₹75,000 to building communications</strong> (immovable property).</div>
      </div>
      <div style="padding:14px 16px;background:#fff3e0;border-right:1px solid #ef9a9a">
        <div style="font-size:10px;font-weight:800;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🔍 Analysis</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Loss of <strong>immovable property exceeds ₹50,000</strong>. Although it's flood damage, reporting to higher authorities is mandatory.</div>
      </div>
      <div style="padding:14px 16px;background:#f3e5f5">
        <div style="font-size:10px;font-weight:800;color:#6a1b9a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Must be <strong>reported at once</strong> by the subordinate authority to the Government through the <strong>usual channel</strong>.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1a5c3a,#2e7d32);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">💻</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 3 · Consulting Service Procurement</div>
      <div style="font-size:14px;font-weight:900">Department Hires Consultant for Logistics Algorithm — ₹40 Lakhs</div>
    </div>
  </div>
  <div style="border:2px solid #a5d6a7;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#e8f5e9;border-right:1px solid #a5d6a7">
        <div style="font-size:10px;font-weight:800;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Department wishes to hire a <strong>consultant to design a new logistics algorithm</strong>, estimated to cost <strong>₹40 Lakhs</strong>.</div>
      </div>
      <div style="padding:14px 16px;background:#e3f2fd;border-right:1px solid #a5d6a7">
        <div style="font-size:10px;font-weight:800;color:#0d47a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🔍 Analysis</div>
        <div style="font-size:13px;color:#222;line-height:1.7">₹40 Lakhs is <em>less than ₹50 Lakhs</em> — the threshold for publishing Expression of Interest (EOI) on CPPP.</div>
      </div>
      <div style="padding:14px 16px;background:#fff8e1">
        <div style="font-size:10px;font-weight:800;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Department can prepare a <strong>long list of potential consultants</strong> via formal/informal enquiries. <strong>No need to publish EOI on CPPP</strong>.</div>
      </div>
    </div>
  </div>
</div>`,

        // ─── EXAM INSIGHT ──────────────────────────────────────────────────────
        exam_insight: `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#7b0000,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔥 Most Asked Facts — High-Probability Exam Questions
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #ef9a9a;border-top:none">
    <thead>
      <tr style="background:#ffebee">
        <th style="padding:10px 14px;font-size:12px;color:#7b0000;font-weight:800;text-align:left;border-right:1px solid #ef9a9a;border-bottom:2px solid #ef9a9a;width:55%">Fact / Common Trap</th>
        <th style="padding:10px 14px;font-size:12px;color:#7b0000;font-weight:800;text-align:left;border-bottom:2px solid #ef9a9a">✅ Correct Answer</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔥 <strong>New GeM slab — direct purchase limit (w.e.f 10.07.2024)</strong></td>
        <td style="padding:10px 14px;font-size:14px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">₹50,000 (was ₹25,000 earlier)</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔥 <strong>GeM Reverse Auction threshold (w.e.f 10.07.2024)</strong></td>
        <td style="padding:10px 14px;font-size:14px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">Above ₹10,00,000 (was ₹5L earlier)</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">⚠️ <em>"Are library books considered 'Goods' under GFR?"</em></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>NO.</strong> Books/publications for libraries are <u>strictly excluded</u> from definition of Goods under Rule 143.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>Sanction lapses if no payment made within</strong></td>
        <td style="padding:10px 14px;font-size:14px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">12 months from date of issue</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>Petty losses not required to be reported (up to)</strong></td>
        <td style="padding:10px 14px;font-size:14px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">₹10,000</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔁 <em>"Bid Security is refunded after the bidder wins"</em></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>NOT immediately.</strong> Bid Security is refunded to the successful bidder <u>only AFTER</u> receipt of the <strong>Performance Security</strong>.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a">📌 <strong>GTE (Global Tender Enquiry) restriction</strong></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828">No GTE is permitted for procurements <u>up to ₹200 Crores</u>.</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🧠 Key Distinctions — Compulsory for Exam
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #90caf9;border-top:none">
    <thead>
      <tr style="background:#e3f2fd">
        <th style="padding:10px 14px;font-size:12px;color:#0d47a1;font-weight:800;text-align:left;border-right:1px solid #90caf9;border-bottom:2px solid #90caf9">Concept A</th>
        <th style="padding:10px 14px;font-size:12px;color:#0d47a1;font-weight:800;text-align:center;border-right:1px solid #90caf9;border-bottom:2px solid #90caf9;width:60px">vs.</th>
        <th style="padding:10px 14px;font-size:12px;color:#0d47a1;font-weight:800;text-align:left;border-bottom:2px solid #90caf9">Concept B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:12px 14px;font-size:13px;background:#fff;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#0d47a1;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Government Account</span><br>
          For revenues &amp; dues collected <em>on behalf of Government</em>.<br>
          <span style="font-size:12px;color:#555">Art. 150 &amp; 283(1)</span>
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3f8ff;border-bottom:1px solid #e3f2fd;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#1565c0;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Public Account</span><br>
          For moneys deposited with an officer that are <em>other than revenues</em> — includes Supreme Court deposits.<br>
          <span style="font-size:12px;color:#555">Art. 284</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 14px;font-size:13px;background:#fff;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#e65100;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Advertised Tender Enquiry</span><br>
          For procurement of goods with estimated value <strong>₹50 Lakhs and above</strong>. Published nationwide.
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#fff8f0;border-bottom:1px solid #e3f2fd;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#f57c00;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Limited Tender Enquiry</span><br>
          For estimated value <strong>up to ₹50 Lakhs</strong>. Sent only to a limited list of registered suppliers (more than 3).
        </td>
      </tr>
      <tr>
        <td style="padding:12px 14px;font-size:13px;background:#fff;border-right:1px solid #90caf9;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#6a1b9a;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Consulting Services (Rule 177)</span><br>
          Involve <strong>intellectual, training &amp; advisory</strong> outputs — hiring professionals for expertise. Does <u>not</u> include retired Govt. servants.
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3e5f5;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#4a148c;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Non-Consulting Services (Rule 197)</span><br>
          Involve <strong>physical, measurable deliverables</strong> — security, maintenance, vehicle hire, building management.
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#1b3a1b,#2e7d32);color:white;padding:16px 20px;border-radius:12px;margin-bottom:20px">
  <div style="font-size:11px;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;margin-bottom:12px">📌 Ultra-Revision — 60-Second Flash Points</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Sanction lapses after</span><br>
      <strong style="font-size:16px">12 months</strong> with no payment
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Petty loss no-report limit</span><br>
      <strong style="font-size:16px">₹10,000</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Police needed if loss &gt;</span><br>
      <strong style="font-size:16px">₹50,000</strong> (fire/theft/fraud)
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">LTE minimum suppliers</span><br>
      <strong style="font-size:16px">More than 3</strong> firms
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">KVIC handloom textile purchase</span><br>
      <strong style="font-size:16px">Min 20%</strong> exclusively from KVIC/clusters
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Advance on maintenance contracts</span><br>
      <strong style="font-size:16px">Max 6 months</strong> payable amount
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">QCBS max technical weightage</span><br>
      <strong style="font-size:16px">80%</strong> (never exceed)
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">NIL charges bid is treated as</span><br>
      <strong style="font-size:16px">Unresponsive</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Supplier registration period</span><br>
      <strong style="font-size:16px">1 to 3 years</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Performance security valid beyond contract</span><br>
      <strong style="font-size:16px">60 days</strong> after completion + warranty
    </div>
  </div>
</div>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },
];

// ─── DB WRITE ──────────────────────────────────────────────────────────────────
async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        let inserted = 0;
        let skipped = 0;

        for (const entry of entries) {
            const exists = await collection.findOne({ title: entry.title });
            if (exists) {
                console.log(`⏭️  Skipping (already exists): "${entry.title}"`);
                skipped++;
            } else {
                await collection.insertOne(entry);
                console.log(`✅ Inserted: "${entry.title}"`);
                inserted++;
            }
        }

        console.log(`\n📊 Summary: ${inserted} inserted, ${skipped} skipped`);
    } finally {
        await client.close();
        console.log('🔌 Connection closed');
    }
}

main().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});
