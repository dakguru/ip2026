
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

    // ─────────────────────────────────────────────────────────────────────────
    // CARD 1 — PMSBY & PMJJBY: Insurance Schemes under Jansuraksha Mission
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Jansuraksha Schemes — PMSBY & PMJJBY: Insurance for All",
        rule_number: "Launched 09.05.2015",
        act_name: "Pradhan Mantri Jan Suraksha Yojanas",
        category: "Scheme",
        effective_date: new Date("2015-05-09"),
        exam_tags: ["LDCE IP", "PS Group B"],

        official_text: `
<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#1a3a5c,#2d6a9f);color:white;padding:14px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">🛡️</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Ministry of Finance · Government of India</div>
      <div style="font-size:15px;font-weight:900;margin-top:2px">Pradhan Mantri Jan Suraksha Schemes — Statutory Framework</div>
    </div>
  </div>
  <div style="border:1px solid #c8dff5;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f0f7ff">
    <ul style="margin:0;padding-left:20px;line-height:2;color:#1a3a5c;font-size:14px">
      <li>Both schemes were <strong>launched on 9 May 2015</strong> by the Prime Minister at Kolkata as part of the <strong>Pradhan Mantri Jan Dhan Yojana (PMJDY)</strong> ecosystem — the financial inclusion trinity.</li>
      <li>They are <strong>voluntary</strong>, bank/post-office-linked insurance schemes targeted at the <em>unorganised sector</em> and economically weaker sections.</li>
      <li>Premiums are auto-debited from the subscriber's savings account (POSB / bank) once a year.</li>
      <li>The Ministry of Finance is the <strong>nodal ministry</strong>. The schemes are implemented through <strong>Scheduled Commercial Banks, Regional Rural Banks, Cooperative Banks,</strong> and <strong>India Post / IPPB</strong>.</li>
    </ul>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#27ae60);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    ⚖️ PMSBY vs PMJJBY — The Master Comparison Table
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #a8d5b5;border-top:none">
    <thead>
      <tr style="background:#e8f5ed">
        <th style="border:1px solid #a8d5b5;padding:11px 13px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:900">Parameter</th>
        <th style="border:1px solid #a8d5b5;padding:11px 13px;text-align:center;font-size:12px;color:#1a3a8c;font-weight:900;background:#eef0ff">PMSBY<br><span style="font-weight:400;font-size:11px">(Suraksha Bima Yojana)</span></th>
        <th style="border:1px solid #a8d5b5;padding:11px 13px;text-align:center;font-size:12px;color:#6a1a1a;font-weight:900;background:#fff0f0">PMJJBY<br><span style="font-weight:400;font-size:11px">(Jeevan Jyoti Bima Yojana)</span></th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Type of Cover</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#1a3a8c;font-weight:700">Accidental Death &amp; Disability</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#6a1a1a;font-weight:700">Life (Any Cause of Death)</td>
      </tr>
      <tr style="background:#f7f9ff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Insurer</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#1a3a8c">Public Sector General Insurance Companies</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#6a1a1a">LIC &amp; Other Life Insurance Companies</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Eligible Age</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:14px;font-weight:900;color:#1a3a8c">18 – 70 Years</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:14px;font-weight:900;color:#6a1a1a">18 – 50 Years</td>
      </tr>
      <tr style="background:#f7f9ff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Annual Premium</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:15px;font-weight:900;color:#1a3a8c">₹ 20 / year</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:15px;font-weight:900;color:#6a1a1a">₹ 436 / year</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Sum Assured</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;color:#1a3a8c">
          <strong>₹2 lakh</strong> — Accidental Death / Total Permanent Disability<br>
          <strong>₹1 lakh</strong> — Partial Permanent Disability
        </td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:15px;font-weight:900;color:#6a1a1a">₹ 2 lakh<br><span style="font-weight:400;font-size:12px">(Death from any cause)</span></td>
      </tr>
      <tr style="background:#f7f9ff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Coverage Period</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#1a3a8c">1 June – 31 May (Annual renewal)</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#6a1a1a">1 June – 31 May (Annual renewal)</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Medical Exam?</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#16a085;font-weight:800">✗ Not Required</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#16a085;font-weight:800">✗ Not Required</td>
      </tr>
      <tr style="background:#f7f9ff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Maximum Age for Coverage</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:14px;font-weight:900;color:#c0392b">70 Years</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:14px;font-weight:900;color:#c0392b">55 Years<br><span style="font-weight:400;font-size:12px">(Enroll by 50; covers till 55)</span></td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Original Premium (2015)</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#888">₹12 / year</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#888">₹330 / year</td>
      </tr>
      <tr style="background:#f7f9ff">
        <td style="border:1px solid #a8d5b5;padding:10px 13px;font-size:13px;font-weight:700">Revised Premium (w.e.f.)</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#c0392b;font-weight:700">₹20 (w.e.f. 01.06.2022)</td>
        <td style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:13px;color:#c0392b;font-weight:700">₹436 (w.e.f. 01.06.2022)</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#6a1a8c,#9b59b6);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    💀 PMSBY — Disability Cover: What Counts?
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #d7bde2;border-top:none">
    <thead>
      <tr style="background:#f5eef8">
        <th style="border:1px solid #d7bde2;padding:10px 13px;text-align:left;font-size:12px;color:#6a1a8c;font-weight:900">Type of Disability</th>
        <th style="border:1px solid #d7bde2;padding:10px 13px;text-align:left;font-size:12px;color:#6a1a8c;font-weight:900">Definition</th>
        <th style="border:1px solid #d7bde2;padding:10px 13px;text-align:center;font-size:12px;color:#6a1a8c;font-weight:900">Benefit</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #d7bde2;padding:10px 13px;font-size:13px;font-weight:700;color:#c0392b">Total Permanent Disability</td>
        <td style="border:1px solid #d7bde2;padding:10px 13px;font-size:13px">Loss of both eyes / both hands / both feet, or one eye and one hand/foot</td>
        <td style="border:1px solid #d7bde2;padding:10px 13px;text-align:center;font-size:15px;font-weight:900;color:#c0392b">₹ 2 Lakh</td>
      </tr>
      <tr style="background:#f5eef8">
        <td style="border:1px solid #d7bde2;padding:10px 13px;font-size:13px;font-weight:700;color:#8e44ad">Partial Permanent Disability</td>
        <td style="border:1px solid #d7bde2;padding:10px 13px;font-size:13px">Loss of one eye or one hand or one foot</td>
        <td style="border:1px solid #d7bde2;padding:10px 13px;text-align:center;font-size:15px;font-weight:900;color:#8e44ad">₹ 1 Lakh</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1b2631,#2e4057);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏤 Role of Department of Posts / IPPB
  </div>
  <div style="border:1px solid #aab7c4;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f2f3f4">
    <ul style="margin:0;padding-left:20px;line-height:2;font-size:14px;color:#1b2631">
      <li>India Post and <strong>India Post Payments Bank (IPPB)</strong> are authorised to offer both PMSBY and PMJJBY through their network.</li>
      <li>Customers holding <strong>Post Office Savings Bank (POSB)</strong> accounts or <strong>IPPB accounts</strong> can enroll at any post office / IPPB access point.</li>
      <li><strong>Gramin Dak Sevaks (GDS)</strong> play a critical last-mile role in enrolling rural subscribers through Doorstep Banking.</li>
      <li>Auto-debit is executed from the subscriber's linked savings account on or before <strong>31 May</strong> each year for the ensuing year's coverage.</li>
      <li>Claims are facilitated through the respective insurer (PSGI Companies for PMSBY; LIC for PMJJBY) via the bank/post office branch.</li>
    </ul>
  </div>
</div>
`,

        guru_explanation: `
<div style="background:linear-gradient(135deg,#fffcf0,#fff7d6);border:1px solid #f1c40f;padding:18px 20px;border-radius:12px;margin-bottom:22px">
  <h3 style="color:#9c640c;margin-top:0">🧠 How to Remember the Schemes in 60 Seconds</h3>
  <p style="font-size:14px;line-height:1.8;color:#5d4037">Think of it this way:<br>
  <strong style="color:#1a3a8c">PMSBY</strong> = "<em>Suraksha</em>" = <strong>Safety Net</strong> → covers <em>accidents</em> only → cheapest plan at <strong>₹20/year</strong> → valid till age <strong>70</strong>.<br>
  <strong style="color:#c0392b">PMJJBY</strong> = "<em>Jeevan Jyoti</em>" = <strong>Life Light</strong> → covers <em>life</em> (any death) → term insurance at <strong>₹436/year</strong> → enroll by age <strong>50</strong>, covered till <strong>55</strong>.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
    <div style="background:#eef0ff;border-radius:10px;padding:14px;border:1px solid #c5cae9">
      <div style="font-size:12px;font-weight:900;color:#1a237e;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px">PMSBY Quick Facts</div>
      <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.9;color:#1a3a5c">
        <li>₹20/year → ₹2L accidental cover</li>
        <li>Age cap: <strong>70 years</strong></li>
        <li>Disability: ₹2L (total) / ₹1L (partial)</li>
        <li>Insurer: General Insurance Co.</li>
        <li>Death due to suicide: <strong>NOT covered</strong></li>
      </ul>
    </div>
    <div style="background:#fff0f0;border-radius:10px;padding:14px;border:1px solid #ffcdd2">
      <div style="font-size:12px;font-weight:900;color:#6a1a1a;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px">PMJJBY Quick Facts</div>
      <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.9;color:#6a1a1a">
        <li>₹436/year → ₹2L life cover</li>
        <li>Enroll: <strong>18–50 years</strong></li>
        <li>Covers till age <strong>55</strong></li>
        <li>Insurer: LIC / Life Ins. Companies</li>
        <li>Death from <strong>any cause</strong> covered</li>
      </ul>
    </div>
  </div>
</div>

<div style="background:#f0fff4;border:1px solid #a8d5b5;border-radius:12px;padding:18px;margin-bottom:22px">
  <h3 style="color:#1a5c3a;margin-top:0">💡 Why Two Schemes? The Logic</h3>
  <p style="font-size:14px;line-height:1.8;color:#1a5c3a">
  <strong>PMSBY</strong> is designed for the daily-wage worker, farmer, or GDS who faces risk of <em>accidents at work</em>. At just ₹20/year (less than 6 paise a day!), it's the world's cheapest accidental insurance.<br><br>
  <strong>PMJJBY</strong> is a pure term life cover. A domestic worker who dies of illness (heart attack, fever) needs their family protected — that's PMJJBY. At ₹436/year (about ₹1.20/day), it's still far cheaper than private term plans.<br><br>
  <strong>Key insight for exam:</strong> A person can hold <em>both</em> PMSBY and PMJJBY simultaneously through the same bank account. If someone dies in an accident, the family can claim <strong>₹4 lakh total</strong> (₹2L from each).</p>
</div>

<div style="background:#f5eef8;border:1px solid #d7bde2;border-radius:12px;padding:18px;margin-bottom:22px">
  <h3 style="color:#6a1a8c;margin-top:0">📋 Termination of Cover — Both Schemes</h3>
  <p style="font-size:13px;color:#6a1a8c;margin-bottom:10px">A subscriber's cover <strong>automatically terminates</strong> in any of the following situations:</p>
  <ul style="padding-left:20px;line-height:2;font-size:14px;color:#4a235a;margin:0">
    <li>Bank account / POSB account is closed or balance is insufficient for auto-debit.</li>
    <li>Subscriber attains the maximum age limit (<strong>70 for PMSBY; 55 for PMJJBY</strong>).</li>
    <li>Subscriber is enrolled under multiple accounts — cover restricted to one account.</li>
    <li>Non-payment / non-renewal of premium by due date.</li>
  </ul>
</div>
`,

        practical_example: `
<div style="background:#fff;border:1px solid #e0e0e0;border-radius:16px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
  <div style="margin-bottom:20px">
    <span style="background:#eef0ff;color:#1a237e;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;text-transform:uppercase">Scenario 1: The GDS with PMSBY</span>
    <p style="margin-top:10px;line-height:1.8;font-size:14px">Ramaiah, a Branch Postmaster in rural Tamil Nadu, pays ₹20/year for PMSBY via auto-debit from his POSB account. He meets with a road accident and loses one hand.<br>
    <strong>✓ Claim:</strong> ₹1 lakh (Partial Permanent Disability). His wife files a claim at the post office with FIR copy, medical certificate, and disability certificate.</p>
  </div>

  <div style="margin-bottom:20px;padding-top:15px;border-top:1px solid #f0f0f0">
    <span style="background:#fff0f0;color:#c0392b;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;text-transform:uppercase">Scenario 2: Double Cover — PMSBY + PMJJBY</span>
    <p style="margin-top:10px;line-height:1.8;font-size:14px">Meena holds both PMSBY (₹20) and PMJJBY (₹436). Total annual premium: <strong>₹456</strong>. She dies in an accident while travelling.<br>
    <strong>✓ Claim:</strong> Family gets <strong>₹2L from PMSBY</strong> (accidental death) + <strong>₹2L from PMJJBY</strong> (life cover) = <strong>₹4 Lakh total</strong>.</p>
  </div>

  <div style="padding-top:15px;border-top:1px solid #f0f0f0">
    <span style="background:#fef9e7;color:#9c640c;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;text-transform:uppercase">Scenario 3: PMJJBY — Age Limit Trap</span>
    <p style="margin-top:10px;line-height:1.8;font-size:14px">Suresh enrolled in PMJJBY at age 49. He has been renewing it every year. He is now 54. His wife asks if he can take a new policy at 54.<br>
    <strong>✓ Answer:</strong> No. New enrollment after age 50 is not permitted. But since Suresh enrolled before 50 and has been renewing continuously, his cover continues till he turns <strong>55</strong>.</p>
  </div>
</div>
`,

        exam_insight: `
<div style="background:linear-gradient(135deg,#fffcf0,#fff7d6);border:1px solid #f1c40f;padding:20px;border-radius:16px;margin-bottom:25px">
  <h3 style="color:#9c640c;margin-top:0">🔥 One-Line Quick Revision</h3>
  <ul style="list-style-type:'⚡ ';padding-left:20px;color:#5d4037;line-height:2.2;font-size:14px">
    <li>Launch date (both): <strong>9 May 2015</strong> (Kolkata)</li>
    <li>PMSBY Premium: <strong>₹20/year</strong> (was ₹12; revised 01.06.2022)</li>
    <li>PMJJBY Premium: <strong>₹436/year</strong> (was ₹330; revised 01.06.2022)</li>
    <li>PMSBY covers: <strong>accident only</strong>; PMJJBY covers: <strong>any cause of death</strong></li>
    <li>PMSBY age: <strong>18–70</strong>; PMJJBY enroll age: <strong>18–50</strong>, cover till <strong>55</strong></li>
    <li>Both sum assured: <strong>₹2 lakh</strong> (PMSBY partial disability: ₹1 lakh)</li>
    <li>Both use <strong>auto-debit</strong> from savings account; renewal period: <strong>1 June to 31 May</strong></li>
    <li>No medical examination for either scheme</li>
  </ul>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#27ae60);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔢 The Numbers You MUST Know
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #a8d5b5;border-top:none">
    <thead>
      <tr style="background:#e8f5ed">
        <th style="border:1px solid #a8d5b5;padding:10px 13px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:900">Item</th>
        <th style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:12px;color:#1a3a8c;font-weight:900">PMSBY</th>
        <th style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:12px;color:#c0392b;font-weight:900">PMJJBY</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 13px;font-size:13px">Premium (current)</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:900;color:#1a3a8c">₹ 20</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:900;color:#c0392b">₹ 436</td>
      </tr>
      <tr style="background:#f7fff9">
        <td style="border:1px solid #a8d5b5;padding:9px 13px;font-size:13px">Sum Assured (death)</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:900;color:#1a3a8c">₹ 2 Lakh</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:900;color:#c0392b">₹ 2 Lakh</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 13px;font-size:13px">Partial disability sum</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:900;color:#1a3a8c">₹ 1 Lakh</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:500;color:#888">N/A</td>
      </tr>
      <tr style="background:#f7fff9">
        <td style="border:1px solid #a8d5b5;padding:9px 13px;font-size:13px">Max age</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:900;color:#1a3a8c">70 years</td>
        <td style="border:1px solid #a8d5b5;padding:9px 13px;text-align:center;font-weight:900;color:#c0392b">55 years (enroll by 50)</td>
      </tr>
    </tbody>
  </table>
</div>
`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // CARD 2 — APY: Atal Pension Yojana — Comprehensive Guide
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Atal Pension Yojana (APY) — Comprehensive Guide",
        rule_number: "Launched 09.05.2015; Operational 01.06.2015",
        act_name: "Pradhan Mantri Jan Suraksha Yojanas — APY",
        category: "Scheme",
        effective_date: new Date("2015-06-01"),
        exam_tags: ["LDCE IP", "PS Group B"],

        official_text: `
<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#7b1a1a,#c0392b);color:white;padding:14px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">🏦</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">PFRDA · Ministry of Finance · Government of India</div>
      <div style="font-size:15px;font-weight:900;margin-top:2px">Atal Pension Yojana — Statutory &amp; Operational Framework</div>
    </div>
  </div>
  <div style="border:1px solid #f5b7b1;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#fdf2f0">
    <ul style="margin:0;padding-left:20px;line-height:2;color:#7b1a1a;font-size:14px">
      <li>APY was <strong>launched on 9 May 2015</strong> and became <strong>operational from 1 June 2015</strong>, replacing the earlier <em>Swavalamban Yojana (NPS-Lite)</em>.</li>
      <li>It is regulated by <strong>PFRDA</strong> (Pension Fund Regulatory and Development Authority) and implemented through <strong>banks, post offices, and IPPB</strong>.</li>
      <li>Target beneficiaries: Workers in the <strong>unorganised sector</strong> — domestic workers, farmers, shop workers, daily-wage labourers.</li>
      <li>Subscribers get a <strong>guaranteed minimum pension</strong> of ₹1,000 to ₹5,000 per month from age <strong>60</strong>.</li>
      <li><strong>Not open to income tax payers</strong> (restriction introduced w.e.f. <strong>1 October 2022</strong>).</li>
    </ul>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a3a5c,#2980b9);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📊 APY at a Glance — Key Parameters
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #aed6f1;border-top:none">
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700;width:40%">Eligibility Age</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:14px;font-weight:900;color:#1a3a5c">18 – 40 Years</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700">Minimum Contribution Period</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:14px;font-weight:900;color:#c0392b">20 Years</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700">Pension Commencement Age</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:14px;font-weight:900;color:#1a5c3a">60 Years</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700">Guaranteed Pension Slabs</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:14px;font-weight:900;color:#8e44ad">₹1,000 / ₹2,000 / ₹3,000 / ₹4,000 / ₹5,000 per month</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700">Payment Mode</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;color:#555">Monthly / Quarterly / Half-yearly auto-debit from savings account</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700">Regulator</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700;color:#7b1a1a">PFRDA (Pension Fund Regulatory and Development Authority)</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700">Predecessor Scheme</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;color:#555">Swavalamban Yojana (NPS-Lite)</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;font-weight:700">Taxability of Pension</td>
        <td style="border:1px solid #aed6f1;padding:10px 14px;font-size:13px;color:#c0392b;font-weight:700">Taxable as income in subscriber's hands</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#27ae60);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    💰 Indicative Contribution Chart (Monthly Contribution for ₹1,000 &amp; ₹5,000 pension)
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #a8d5b5;border-top:none">
    <thead>
      <tr style="background:#e8f5ed">
        <th style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:900">Age at Entry</th>
        <th style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:900">Years to Contribute</th>
        <th style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:900">Monthly (for ₹1,000 pension)</th>
        <th style="border:1px solid #a8d5b5;padding:10px 13px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:900">Monthly (for ₹5,000 pension)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;font-size:15px;color:#1a5c3a">18</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-size:13px">42</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#16a085;font-size:14px">₹ 42</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#c0392b;font-size:14px">₹ 210</td>
      </tr>
      <tr style="background:#f7fff9">
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;font-size:15px;color:#1a5c3a">25</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-size:13px">35</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#16a085;font-size:14px">₹ 76</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#c0392b;font-size:14px">₹ 376</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;font-size:15px;color:#1a5c3a">30</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-size:13px">30</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#16a085;font-size:14px">₹ 116</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#c0392b;font-size:14px">₹ 577</td>
      </tr>
      <tr style="background:#f7fff9">
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;font-size:15px;color:#e67e22">35</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-size:13px">25</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#e67e22;font-size:14px">₹ 181</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#c0392b;font-size:14px">₹ 902</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;font-size:15px;color:#c0392b">40</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-size:13px">20</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#c0392b;font-size:14px">₹ 291</td>
        <td style="border:1px solid #a8d5b5;padding:9px;text-align:center;font-weight:900;color:#c0392b;font-size:14px">₹ 1,454</td>
      </tr>
    </tbody>
  </table>
  <div style="border:1px solid #a8d5b5;border-top:none;padding:10px 14px;background:#f0fff4;font-size:12px;color:#1a5c3a;border-radius:0 0 8px 8px">
    <strong>Key Insight:</strong> Joining at 18 vs 40 makes a huge difference — ₹210/month vs ₹1,454/month for the same ₹5,000 pension. <em>Earlier you join, lower the contribution!</em>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#6a1a8c,#9b59b6);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏛️ Government Co-Contribution — Eligibility &amp; Terms
  </div>
  <div style="border:1px solid #d7bde2;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f5eef8">
    <ul style="margin:0;padding-left:20px;line-height:2.2;font-size:14px;color:#4a235a">
      <li>Government contributed <strong>50% of the subscriber's contribution</strong> or <strong>₹1,000 per annum</strong> (whichever is lower) for <strong>5 years</strong> (FY 2015-16 to 2019-20).</li>
      <li><strong>Eligible subscribers</strong> must satisfy ALL three conditions:
        <ol style="padding-left:20px;line-height:2">
          <li>Enrolled in APY between <strong>1 June 2015 and 31 March 2016</strong></li>
          <li>Not a beneficiary of any <strong>statutory social security scheme</strong> (e.g., EPF/NPS/ESI)</li>
          <li>Not an <strong>income tax payer</strong></li>
        </ol>
      </li>
      <li>Co-contribution period: <strong>FY 2015-16 to 2019-20</strong> (5 years total).</li>
      <li>Subscribers who joined after 31.03.2016 are <strong>NOT eligible</strong> for govt. co-contribution.</li>
    </ul>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1b2631,#2e4057);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    ⚰️ Death &amp; Exit Provisions
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #aab7c4;border-top:none">
    <thead>
      <tr style="background:#d6eaf8">
        <th style="border:1px solid #aab7c4;padding:10px 13px;text-align:left;font-size:12px;color:#1b2631;font-weight:900">Situation</th>
        <th style="border:1px solid #aab7c4;padding:10px 13px;text-align:left;font-size:12px;color:#1b2631;font-weight:900">What Happens</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px;font-weight:700">Subscriber dies before 60</td>
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px">Spouse may <strong>continue contributions</strong> to maintain APY account and receive pension at 60. OR the entire <strong>pension corpus is returned</strong> to spouse/nominee.</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px;font-weight:700">Subscriber dies after 60 (pension started)</td>
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px"><strong>Spouse receives same pension</strong> for life. On spouse's death, the accumulated <strong>pension corpus is returned to the nominee</strong>.</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px;font-weight:700">Both subscriber and spouse die</td>
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px">Entire <strong>pension corpus paid to nominee</strong> as a lump sum.</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px;font-weight:700;color:#c0392b">Premature exit (voluntary)</td>
        <td style="border:1px solid #aab7c4;padding:10px 13px;font-size:13px;color:#c0392b"><strong>Not permitted</strong> except in <em>exceptional circumstances</em> (terminal disease, death of spouse). Only subscriber's own contribution + earned interest (minus charges) is returned — <strong>government co-contribution is NOT returned</strong>.</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#27ae60);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏤 Role of Department of Posts / IPPB in APY
  </div>
  <div style="border:1px solid #a8d5b5;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f0fff4">
    <ul style="margin:0;padding-left:20px;line-height:2;font-size:14px;color:#1a5c3a">
      <li><strong>India Post Payments Bank (IPPB)</strong> is an authorised Point of Presence (PoP) for APY enrollment and administration.</li>
      <li>Customers with <strong>POSB / IPPB savings accounts</strong> can enroll at any post office or via the IPPB mobile app / GDS doorstep service.</li>
      <li>Auto-debit of contributions is set up from the subscriber's linked POSB/IPPB account.</li>
      <li>Postmen and GDS play a vital role in <strong>last-mile enrollment</strong> in rural India where banking penetration is low.</li>
      <li>DOP acts as a PoP-SP (Service Provider) and earns a small incentive per enrollment from PFRDA.</li>
    </ul>
  </div>
</div>
`,

        guru_explanation: `
<div style="background:linear-gradient(135deg,#fffcf0,#fff7d6);border:1px solid #f1c40f;padding:18px 20px;border-radius:12px;margin-bottom:22px">
  <h3 style="color:#9c640c;margin-top:0">🧠 Understanding APY in Plain Language</h3>
  <p style="font-size:14px;line-height:1.9;color:#5d4037">APY is essentially a <strong>defined benefit pension plan</strong> for the informal sector. Unlike NPS (where your final pension depends on market returns), APY <em>guarantees</em> you a fixed pension — ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month — for life, starting at age 60.<br><br>
  You choose your pension slab when you join. Based on your age and the slab chosen, a contribution table tells you how much to pay monthly. The government manages the corpus through PFRDA-approved pension fund managers. If the corpus grows more than assumed, the excess stays in your corpus. If it falls short, the <strong>government makes up the shortfall</strong> — hence "guaranteed".</p>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px">
  <div style="background:#f0fff4;border:1px solid #a8d5b5;border-radius:12px;padding:16px">
    <h4 style="color:#1a5c3a;margin-top:0">✅ Who CAN Join APY</h4>
    <ul style="padding-left:18px;font-size:13px;line-height:2;margin:0;color:#1a5c3a">
      <li>Age 18–40 (Indian citizen)</li>
      <li>Has a savings bank / POSB / IPPB account</li>
      <li>Not an income tax payer (after Oct 2022)</li>
      <li>Not covered by EPF / NPS / ESIC, etc. (for govt. co-contribution only)</li>
    </ul>
  </div>
  <div style="background:#fdf2f0;border:1px solid #f5b7b1;border-radius:12px;padding:16px">
    <h4 style="color:#7b1a1a;margin-top:0">❌ Who CANNOT Join APY</h4>
    <ul style="padding-left:18px;font-size:13px;line-height:2;margin:0;color:#7b1a1a">
      <li>Persons above age 40</li>
      <li>Income tax payers (w.e.f. 1 Oct 2022)</li>
      <li>Persons with existing APY account (only one account per person)</li>
      <li>NRIs</li>
    </ul>
  </div>
</div>

<div style="background:#f5eef8;border:1px solid #d7bde2;border-radius:12px;padding:18px;margin-bottom:22px">
  <h3 style="color:#6a1a8c;margin-top:0">💡 APY vs PMJJBY vs NPS — The Key Differences</h3>
  <table style="width:100%;border-collapse:collapse;font-size:13px">
    <thead>
      <tr style="background:#e8daef">
        <th style="border:1px solid #d7bde2;padding:9px;text-align:left;color:#4a235a">Feature</th>
        <th style="border:1px solid #d7bde2;padding:9px;text-align:center;color:#4a235a">APY</th>
        <th style="border:1px solid #d7bde2;padding:9px;text-align:center;color:#4a235a">PMJJBY</th>
        <th style="border:1px solid #d7bde2;padding:9px;text-align:center;color:#4a235a">NPS (Tier I)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #d7bde2;padding:9px;font-weight:700">Benefit Type</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center">Pension (defined)</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center">Life Insurance</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center">Pension (market-linked)</td>
      </tr>
      <tr style="background:#f5eef8">
        <td style="border:1px solid #d7bde2;padding:9px;font-weight:700">Regulator</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center">PFRDA</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center">IRDAI</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center">PFRDA</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #d7bde2;padding:9px;font-weight:700">Guaranteed Return</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center;color:#16a085;font-weight:800">Yes</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center;color:#c0392b">N/A</td>
        <td style="border:1px solid #d7bde2;padding:9px;text-align:center;color:#c0392b">No (market-linked)</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background:#f0f7ff;border:1px solid #c8dff5;border-radius:12px;padding:18px;margin-bottom:22px">
  <h3 style="color:#1a3a5c;margin-top:0">📅 Default (Non-Payment) Penalty Structure</h3>
  <table style="width:100%;border-collapse:collapse;font-size:13px">
    <thead>
      <tr style="background:#d6eaf8">
        <th style="border:1px solid #aed6f1;padding:9px;text-align:left;color:#1a3a5c">Monthly Contribution</th>
        <th style="border:1px solid #aed6f1;padding:9px;text-align:center;color:#c0392b">Overdue Penalty per Month</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:9px">Up to ₹100 per month</td>
        <td style="border:1px solid #aed6f1;padding:9px;text-align:center;font-weight:900;color:#c0392b">₹ 1</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aed6f1;padding:9px">₹101 – ₹500 per month</td>
        <td style="border:1px solid #aed6f1;padding:9px;text-align:center;font-weight:900;color:#c0392b">₹ 2</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:9px">₹501 – ₹1,000 per month</td>
        <td style="border:1px solid #aed6f1;padding:9px;text-align:center;font-weight:900;color:#c0392b">₹ 5</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aed6f1;padding:9px">Above ₹1,001 per month</td>
        <td style="border:1px solid #aed6f1;padding:9px;text-align:center;font-weight:900;color:#c0392b">₹ 10</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size:12px;color:#1a3a5c;margin-top:10px;margin-bottom:0"><strong>Consequence of continued default:</strong> After 6 months → account frozen. After 12 months → account deactivated. After 24 months → account closed and corpus returned.</p>
</div>
`,

        practical_example: `
<div style="background:#fff;border:1px solid #e0e0e0;border-radius:16px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
  <div style="margin-bottom:20px">
    <span style="background:#e8f5ed;color:#1a5c3a;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;text-transform:uppercase">Scenario 1: Early Enrollee — The Smart Move</span>
    <p style="margin-top:10px;line-height:1.8;font-size:14px">Kavitha, a domestic worker aged 18, enrolls in APY targeting ₹5,000/month pension. Her monthly contribution is just <strong>₹210</strong>. Over 42 years, she contributes roughly <strong>₹1.06 lakh total</strong> and receives ₹5,000/month pension from age 60 — for life. After her death, her husband receives the same pension; after both die, the <strong>corpus (approx. ₹8.5 lakh)</strong> is returned to their nominee.</p>
  </div>

  <div style="margin-bottom:20px;padding-top:15px;border-top:1px solid #f0f0f0">
    <span style="background:#fdf2f0;color:#c0392b;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;text-transform:uppercase">Scenario 2: Late Enrollee — The Cost of Delay</span>
    <p style="margin-top:10px;line-height:1.8;font-size:14px">Rajan, aged 40, wants the same ₹5,000 pension. He must contribute <strong>₹1,454/month</strong> for 20 years. Total outgo: ~<strong>₹3.49 lakh</strong> — more than 3 times Kavitha's total cost. Same benefit, much higher cost due to delay. This is why APY strongly incentivises early enrollment.</p>
  </div>

  <div style="padding-top:15px;border-top:1px solid #f0f0f0">
    <span style="background:#eef0ff;color:#1a237e;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;text-transform:uppercase">Scenario 3: IPPB Postman Enrollment Drive</span>
    <p style="margin-top:10px;line-height:1.8;font-size:14px">A Grameen Dak Sevak visits a rural hamlet with an IPPB micro-ATM. He helps 5 unbanked workers open IPPB accounts and enrolls them in APY, PMSBY, and PMJJBY simultaneously. This is the <strong>Jansuraksha Trinity</strong> — one visit, three protections: accident cover, life cover, and retirement pension — at a combined monthly cost of under ₹200 for a 30-year-old targeting ₹3,000 pension.</p>
  </div>
</div>
`,

        exam_insight: `
<div style="background:linear-gradient(135deg,#fffcf0,#fff7d6);border:1px solid #f1c40f;padding:20px;border-radius:16px;margin-bottom:25px">
  <h3 style="color:#9c640c;margin-top:0">🔥 One-Line Quick Revision — APY</h3>
  <ul style="list-style-type:'⚡ ';padding-left:20px;color:#5d4037;line-height:2.2;font-size:14px">
    <li>Full form: <strong>Atal Pension Yojana</strong> (not Atal Pension Yojna)</li>
    <li>Launched: <strong>9 May 2015</strong>; Operational: <strong>1 June 2015</strong></li>
    <li>Regulator: <strong>PFRDA</strong> (not SEBI, not IRDAI)</li>
    <li>Eligibility: <strong>18–40 years</strong>; Pension starts at: <strong>60 years</strong></li>
    <li>Pension slabs: <strong>₹1,000 / 2,000 / 3,000 / 4,000 / 5,000</strong> per month</li>
    <li>Minimum contribution period: <strong>20 years</strong></li>
    <li>Govt. co-contribution: <strong>50% or ₹1,000 p.a.</strong> (whichever lower) — first 5 years only</li>
    <li>No govt. co-contribution if enrolled <strong>after 31.03.2016</strong></li>
    <li>Income tax payers: <strong>NOT eligible</strong> (from 01.10.2022)</li>
    <li>Predecessor scheme: <strong>Swavalamban Yojana (NPS-Lite)</strong></li>
    <li>On death (post-60): Spouse gets <strong>same pension</strong>; corpus to nominee thereafter</li>
    <li>Default penalty starts from: <strong>₹1/month</strong> (for contributions up to ₹100)</li>
  </ul>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#7b1a1a,#c0392b);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🧮 The Jansuraksha Trinity — Combined View
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #f5b7b1;border-top:none">
    <thead>
      <tr style="background:#fdf2f0">
        <th style="border:1px solid #f5b7b1;padding:10px 13px;text-align:left;font-size:12px;color:#7b1a1a;font-weight:900">Feature</th>
        <th style="border:1px solid #f5b7b1;padding:10px 13px;text-align:center;font-size:12px;color:#1a3a8c;font-weight:900">PMSBY</th>
        <th style="border:1px solid #f5b7b1;padding:10px 13px;text-align:center;font-size:12px;color:#c0392b;font-weight:900">PMJJBY</th>
        <th style="border:1px solid #f5b7b1;padding:10px 13px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:900">APY</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #f5b7b1;padding:9px 13px;font-size:13px;font-weight:700">Purpose</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:12px">Accident protection</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:12px">Life cover</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:12px">Retirement pension</td>
      </tr>
      <tr style="background:#fdf2f0">
        <td style="border:1px solid #f5b7b1;padding:9px 13px;font-size:13px;font-weight:700">Regulator</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:12px">IRDAI</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:12px">IRDAI</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:12px">PFRDA</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #f5b7b1;padding:9px 13px;font-size:13px;font-weight:700">Annual Cost</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-weight:900;font-size:14px;color:#1a3a8c">₹ 20</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-weight:900;font-size:14px;color:#c0392b">₹ 436</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:12px;color:#1a5c3a">Age-based (monthly auto-debit)</td>
      </tr>
      <tr style="background:#fdf2f0">
        <td style="border:1px solid #f5b7b1;padding:9px 13px;font-size:13px;font-weight:700">Age Limit</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:13px">18–70</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:13px">18–50</td>
        <td style="border:1px solid #f5b7b1;padding:9px 13px;text-align:center;font-size:13px">18–40</td>
      </tr>
    </tbody>
  </table>
</div>
`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    }

];

async function seed() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const db = client.db();
        const collection = db.collection('daksutras');

        for (const entry of entries) {
            await collection.deleteOne({ title: entry.title });
            const result = await collection.insertOne(entry);
            console.log(`✓ Seeded: "${entry.title}" (ID: ${result.insertedId})`);
        }

        console.log("\n🎉 All Jansuraksha Dak Sutra entries seeded successfully!");

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

seed();
