
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

const now = new Date();

const entries = [
    {
        title: "GFR 2017: Financial Management, E-Procurement & Integrity — Rules 23, 24, 28, 29, 159, 160, 185 (Part 4 — Final)",
        rule_number: "Rules 23, 24, 28, 29, 159, 160, 185 of GFR 2017",
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
      <div style="font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;opacity:0.75">Ministry of Finance · General Financial Rules, 2017 — Part 4</div>
      <div style="font-size:16px;font-weight:900;margin-top:3px">Financial Powers, Prior Consents, E-Procurement &amp; Integrity Framework</div>
    </div>
  </div>
  <div style="border:2px solid #c7d3f0;border-top:none;border-radius:0 0 12px 12px;background:#f0f4ff;padding:14px 18px">
    <p style="margin:0;font-size:13px;color:#1a2a5e;line-height:1.8">This final consolidation covers the governance layer of GFR 2017 — how financial powers flow, when the Finance Ministry must be consulted, and the mandatory digital infrastructure for public procurement.</p>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">⚖️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rules 23 &amp; 24</div>
      <div style="font-size:14px;font-weight:900">Delegation of Financial Powers</div>
    </div>
  </div>
  <div style="border:2px solid #a5d6a7;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="padding:14px 18px;background:#e8f5e9">
      <ul style="margin:0;padding-left:20px;line-height:2.1;font-size:13.5px;color:#1b5e20">
        <li>Financial powers of the Government that have <strong>not been delegated</strong> to a subordinate authority shall vest <strong>exclusively in the Finance Ministry</strong>.</li>
        <li>Before incurring any expenditure, Departments and Ministries <strong>must consult</strong> with their <strong>Financial Adviser</strong>.</li>
      </ul>
    </div>
    <div style="background:#1b5e20;color:white;padding:10px 16px;font-size:12.5px;font-weight:700">
      💡 Undelegated = Finance Ministry. Delegated = Subordinate authority. Pre-expenditure consultation with Financial Adviser is mandatory.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#b71c1c,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">🔑</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rule 28</div>
      <div style="font-size:14px;font-weight:900">Previous Consent of Finance Ministry</div>
    </div>
  </div>
  <div style="border:2px solid #ef9a9a;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="padding:14px 18px;background:#ffebee">
      <p style="margin:0 0 12px 0;font-size:13.5px;color:#b71c1c;line-height:1.9"><strong>Explicit prior consent</strong> from the Finance Ministry is required before any sanction involving:</p>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#ffcdd2">
          <th style="padding:8px 14px;font-size:11px;font-weight:900;color:#b71c1c;text-align:left;border-bottom:2px solid #ef9a9a">Category</th>
          <th style="padding:8px 14px;font-size:11px;font-weight:900;color:#b71c1c;text-align:left;border-left:1px solid #ef9a9a;border-bottom:2px solid #ef9a9a">What Requires Prior Finance Ministry Consent</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff">
          <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#b71c1c;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2;white-space:nowrap">🏞️ Land</td>
          <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #ffcdd2">Grant of land by the Government</td>
        </tr>
        <tr style="background:#fff8f8">
          <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#b71c1c;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2;white-space:nowrap">💰 Revenue</td>
          <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #ffcdd2">Assignment of revenue or relinquishment of revenue in any way</td>
        </tr>
        <tr style="background:#fff">
          <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#b71c1c;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2;white-space:nowrap">🏗️ Concession</td>
          <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #ffcdd2">Any concession, lease or licence of mineral or forest rights</td>
        </tr>
        <tr style="background:#fff8f8">
          <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#b71c1c;border-right:1px solid #ef9a9a;white-space:nowrap">💧 Resources</td>
          <td style="padding:9px 14px;font-size:13px;color:#333">Rights to water power or any other right of a similar nature</td>
        </tr>
      </tbody>
    </table>
    <div style="background:#b71c1c;color:white;padding:10px 16px;font-size:12.5px;font-weight:700">
      🔥 Exam Trigger: Any sanction that "gives away" a natural resource, land, or revenue right → Finance Ministry consent FIRST.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">🖥️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rules 159 &amp; 160</div>
      <div style="font-size:14px;font-weight:900">Mandatory E-Publishing &amp; E-Procurement</div>
    </div>
  </div>
  <div style="border:2px solid #90caf9;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#e3f2fd">
          <th style="padding:10px 16px;font-size:12px;color:#0d47a1;font-weight:900;text-align:center;border-right:2px solid #90caf9;border-bottom:2px solid #90caf9;width:50%">📢 Rule 159 — E-PUBLISHING</th>
          <th style="padding:10px 16px;font-size:12px;color:#0d47a1;font-weight:900;text-align:center;border-bottom:2px solid #90caf9">📩 Rule 160 — E-PROCUREMENT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:14px 16px;background:#e8f4ff;border-right:2px solid #90caf9;vertical-align:top;line-height:1.9;font-size:13px;color:#0d47a1">
            All Ministries/Departments, attached/subordinate offices, and autonomous/statutory bodies must <strong>publish</strong>:<br>
            • Tender enquiries<br>
            • Corrigenda<br>
            • Details of bid awards<br><br>
            on the <strong>Central Public Procurement Portal (CPPP)</strong>.
          </td>
          <td style="padding:14px 16px;background:#e3f2fd;vertical-align:top;line-height:1.9;font-size:13px;color:#0d47a1">
            All Ministries/Departments must <strong>receive all bids</strong> electronically through e-procurement portals.<br><br>
            They may use:<br>
            • <strong>NIC's e-procurement solution</strong>, or<br>
            • Any other <strong>approved service provider</strong> following due process.<br><br>
            No offline / manual bid reception is permitted.
          </td>
        </tr>
      </tbody>
    </table>
    <div style="background:#0d47a1;color:white;padding:10px 16px;font-size:12.5px;font-weight:700">
      ⚠️ Trap: Rule 159 = <em>Publishing</em> on CPPP (eprocure.gov.in). Rule 160 = <em>Receiving</em> bids via NIC or approved providers. Two separate mandates!
    </div>
  </div>
</div>`,

        // ─── DAK GURU EXPLANATION ───────────────────────────────────────────────
        guru_explanation: `
<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#7b0000,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🤝 Code of Integrity in Bidding — What Bidders Must Disclose
  </div>
  <div style="border:2px solid #ef9a9a;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#ffebee">
    <p style="margin:0 0 14px 0;font-size:14px;color:#b71c1c;line-height:1.9">No official or bidder can accept bribes or unfair advantages. Bidders <strong>must compulsorily disclose</strong> at the time of bidding:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:white;border:2px solid #ef9a9a;border-top:4px solid #c62828;border-radius:8px;padding:13px 14px">
        <div style="font-size:26px;margin-bottom:8px">📋</div>
        <div style="font-size:13px;font-weight:900;color:#b71c1c;margin-bottom:6px">Previous Transgressions</div>
        <div style="font-size:12.5px;color:#555;line-height:1.75">Any bribes, rule-breaking, or integrity violations committed in <strong>any country</strong> during the <strong>last 3 years</strong>.</div>
      </div>
      <div style="background:white;border:2px solid #ef9a9a;border-top:4px solid #c62828;border-radius:8px;padding:13px 14px">
        <div style="font-size:26px;margin-bottom:8px">🚫</div>
        <div style="font-size:13px;font-weight:900;color:#b71c1c;margin-bottom:6px">Prior Debarments</div>
        <div style="font-size:12.5px;color:#555;line-height:1.75">If they have been <strong>debarred by any other procuring entity</strong> anywhere — this must be disclosed upfront.</div>
      </div>
    </div>
    <div style="background:#b71c1c;color:white;padding:10px 14px;border-radius:8px;margin-top:12px;font-size:12.5px;font-weight:700">
      ⚡ Concealing past transgressions is itself a code of integrity violation — and can lead to debarment for up to 2 years.
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#e65100,#f57c00);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🌐 Enlistment of Indian Agents for Foreign Principals
  </div>
  <div style="border:2px solid #ffcc80;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#fff8e1">
    <p style="margin:0 0 14px 0;font-size:14px;color:#e65100;line-height:1.9">An Indian agent wanting to quote on behalf of a <strong>foreign company</strong> cannot simply submit a bid. They must follow a special process:</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px">
      <div style="background:white;border:2px solid #ffcc80;border-top:4px solid #f57c00;border-radius:8px;padding:13px;text-align:center">
        <div style="font-size:26px;margin-bottom:6px">1️⃣</div>
        <div style="font-size:13px;font-weight:900;color:#e65100">Mandatory Enlistment</div>
        <div style="font-size:12px;color:#555;margin-top:4px;line-height:1.7">Must enlist with <strong>GeM</strong> under the Compulsory Enlistment Scheme of the Dept. of Expenditure.</div>
      </div>
      <div style="background:white;border:2px solid #ffcc80;border-top:4px solid #c0392b;border-radius:8px;padding:13px;text-align:center">
        <div style="font-size:26px;margin-bottom:6px">⚠️</div>
        <div style="font-size:13px;font-weight:900;color:#c0392b">Not Regular Registration</div>
        <div style="font-size:12px;color:#555;margin-top:4px;line-height:1.7">This enlistment is <u>entirely different</u> from normal supplier/vendor registration on GeM.</div>
      </div>
      <div style="background:white;border:2px solid #ffcc80;border-top:4px solid #1b5e20;border-radius:8px;padding:13px;text-align:center">
        <div style="font-size:26px;margin-bottom:6px">✅</div>
        <div style="font-size:13px;font-weight:900;color:#1b5e20">Then Bid</div>
        <div style="font-size:12px;color:#555;margin-top:4px;line-height:1.7">Only after successful enlistment can the agent legally represent a foreign principal in any bid.</div>
      </div>
    </div>
    <div style="background:#e65100;color:white;padding:10px 14px;border-radius:8px;font-size:12.5px;font-weight:700">
      💡 This rule prevents foreign firms from circumventing Indian procurement norms by routing through unregistered local middlemen.
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#004d40,#00695c);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🧵 Reserved Items — Khadi &amp; Handloom Textile Procurement
  </div>
  <div style="border:2px solid #80cbc4;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#e0f2f1">
          <th style="padding:10px 16px;font-size:12px;color:#004d40;font-weight:800;text-align:left;border-right:2px solid #80cbc4;border-bottom:2px solid #80cbc4;width:30%">Textile Type</th>
          <th style="padding:10px 16px;font-size:12px;color:#004d40;font-weight:800;text-align:center;border-right:2px solid #80cbc4;border-bottom:2px solid #80cbc4">Mandatory Quota</th>
          <th style="padding:10px 16px;font-size:12px;color:#004d40;font-weight:800;text-align:left;border-bottom:2px solid #80cbc4">Approved Sources</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff">
          <td style="padding:12px 16px;border-right:1px solid #80cbc4;border-bottom:1px solid #b2dfdb">
            <span style="background:#004d40;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">🧶 Khadi</span><br>
            <span style="font-size:12px;color:#555;margin-top:4px;display:block">Hand-spun &amp; hand-woven textiles</span>
          </td>
          <td style="padding:12px 16px;text-align:center;font-size:22px;font-weight:900;color:#c62828;border-right:1px solid #80cbc4;border-bottom:1px solid #b2dfdb">100%<br><span style="font-size:11px;color:#c62828">Exclusively</span></td>
          <td style="padding:12px 16px;font-size:13px;color:#1b5e20;border-bottom:1px solid #b2dfdb;line-height:1.8"><strong>KVIC only</strong> — no other source permitted for Khadi procurement.</td>
        </tr>
        <tr style="background:#e8f8f5">
          <td style="padding:12px 16px;border-right:1px solid #80cbc4">
            <span style="background:#00695c;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">🪡 Handloom</span><br>
            <span style="font-size:12px;color:#555;margin-top:4px;display:block">General handloom origin textiles</span>
          </td>
          <td style="padding:12px 16px;text-align:center;font-size:22px;font-weight:900;color:#e67e22;border-right:1px solid #80cbc4">Min. 20%<br><span style="font-size:11px;color:#e67e22">of total</span></td>
          <td style="padding:12px 16px;font-size:13px;color:#1b5e20;line-height:1.8"><strong>KVIC, SHGs, cooperative societies,</strong> or weavers with a <strong>Pehchan card</strong>.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📋 Exceptions to Communication of Sanctions to Audit — Rule 29
  </div>
  <p style="margin:0;padding:10px 18px;font-size:13px;color:#333;background:#e8eaf6;border-left:2px solid #9fa8da;border-right:2px solid #9fa8da;font-style:italic">Generally, all financial sanctions must be sent to the Audit/Accounts Officer. The following categories are <strong>explicitly exempt</strong>:</p>
  <table style="width:100%;border-collapse:collapse;border:2px solid #9fa8da;border-top:none">
    <thead>
      <tr style="background:#e8eaf6">
        <th style="padding:9px 14px;font-size:12px;color:#1a237e;font-weight:800;text-align:left;border-right:1px solid #9fa8da;border-bottom:2px solid #9fa8da;width:28%">Category</th>
        <th style="padding:9px 14px;font-size:12px;color:#1a237e;font-weight:800;text-align:left;border-bottom:2px solid #9fa8da">Sanction Type — Do NOT Endorse to Audit</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1a237e;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6"><span style="background:#3949ab;color:white;padding:2px 8px;border-radius:4px;font-size:11px">Advances</span></td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8eaf6">Grant of advances to Central Government employees</td>
      </tr>
      <tr style="background:#f3f4ff">
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1a237e;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6"><span style="background:#3949ab;color:white;padding:2px 8px;border-radius:4px;font-size:11px">Establishment</span></td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8eaf6">Appointment, promotion, or transfer of Gazetted and non-Gazetted Officers</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1a237e;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6"><span style="background:#3949ab;color:white;padding:2px 8px;border-radius:4px;font-size:11px">Posts</span></td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8eaf6">Creation, continuation, or abolition of posts</td>
      </tr>
      <tr style="background:#f3f4ff">
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1a237e;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6"><span style="background:#3949ab;color:white;padding:2px 8px;border-radius:4px;font-size:11px">Charge</span></td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8eaf6">Handing over and taking over of charge</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1a237e;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6"><span style="background:#3949ab;color:white;padding:2px 8px;border-radius:4px;font-size:11px">Prov. Fund</span></td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8eaf6">Payment or withdrawal of GPF advances to Government servants</td>
      </tr>
      <tr style="background:#f3f4ff">
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1a237e;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6"><span style="background:#3949ab;color:white;padding:2px 8px;border-radius:4px;font-size:11px">Contingency</span></td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8eaf6">Contingent expenditure sanctioned under powers of the Head of Office</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1a237e;border-right:1px solid #9fa8da"><span style="background:#3949ab;color:white;padding:2px 8px;border-radius:4px;font-size:11px">Routine</span></td>
        <td style="padding:9px 14px;font-size:13px;color:#333">Issued by Heads of Subordinate Offices (other than proper Ministries/Departments)</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#880e4f,#c2185b);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📊 Key Numerical Limits at a Glance
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #f48fb1;border-top:none">
    <thead>
      <tr style="background:#fce4ec">
        <th style="padding:10px 14px;font-size:12px;color:#880e4f;font-weight:800;text-align:left;border-right:1px solid #f48fb1;border-bottom:2px solid #f48fb1">Metric / Category</th>
        <th style="padding:10px 14px;font-size:12px;color:#880e4f;font-weight:800;text-align:center;border-bottom:2px solid #f48fb1">Value / Limit</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Global Tender Enquiry (GTE) — Prohibition Threshold</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#c2185b;border-bottom:1px solid #fce4ec">No GTE up to <strong>₹200 Crores</strong></td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Mandatory Handloom Procurement (general textiles)</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#e67e22;border-bottom:1px solid #fce4ec">At least <strong>20%</strong></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Code of Integrity — Past Transgression Disclosure Window</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#0d47a1;border-bottom:1px solid #fce4ec">Last <strong>3 years</strong></td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Bid Security Validity (beyond bid validity period)</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#1b5e20;border-bottom:1px solid #fce4ec"><strong>45 days</strong></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Budget Projection on GeM Portal</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#6a1b9a;border-bottom:1px solid #fce4ec">Within <strong>30 days</strong> of Budget approval</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1">Refund of Unsuccessful Bidders' Bid Securities</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#c62828">Latest by the <strong>30th day</strong> after contract award</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#37474f,#546e7a);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏦 Conditions &amp; Special Eligibility Rules
  </div>
  <div style="border:2px solid #b0bec5;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#eceff1">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div style="background:white;border-left:4px solid #0d47a1;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#0d47a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🖥️ E-Platform Flexibility</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Ministries may use <strong>NIC's solution</strong> or any other <strong>approved service provider</strong> for e-procurement — they are not locked to one platform, provided due process is followed.</div>
      </div>
      <div style="background:white;border-left:4px solid #c62828;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#c62828;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🔧 Non-Consulting Gap Rule</div>
        <div style="font-size:13px;color:#333;line-height:1.8">If a situation arises not covered under Non-Consulting Outsourcing rules (198–205), the department must refer to the <strong>Rules for Procurement of Goods (135–176)</strong> — NOT to consulting service rules.</div>
      </div>
      <div style="background:white;border-left:4px solid #1b5e20;border-radius:8px;padding:12px 14px;grid-column:1/-1">
        <div style="font-size:11px;font-weight:900;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📅 Budget Projection Obligation</div>
        <div style="font-size:13px;color:#333;line-height:1.8">All procuring requirements (whether on <strong>OPEX or CAPEX models</strong>) must be projected on the <strong>GeM portal within 30 days</strong> of the Budget being approved. This enables planning and transparency.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#006064,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔟 Terms of Reference (TOR) for Consultants — Rule 185
  </div>
  <div style="border:2px solid #80deea;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e0f7fa">
    <p style="margin:0 0 14px 0;font-size:13.5px;color:#006064;line-height:1.9">When hiring a consultant, the department must prepare a strict TOR containing all five elements <strong>in sequence</strong>:</p>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
      <div style="background:white;border:2px solid #80deea;border-top:4px solid #006064;border-radius:8px;padding:12px 10px;text-align:center">
        <div style="background:#006064;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;margin:0 auto 8px">1</div>
        <div style="font-size:13px;font-weight:900;color:#006064">Objective</div>
        <div style="font-size:11px;color:#555;margin-top:4px;line-height:1.6">Precise statement of objectives</div>
      </div>
      <div style="background:white;border:2px solid #80deea;border-top:4px solid #00838f;border-radius:8px;padding:12px 10px;text-align:center">
        <div style="background:#00838f;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;margin:0 auto 8px">2</div>
        <div style="font-size:13px;font-weight:900;color:#00838f">Tasks</div>
        <div style="font-size:11px;color:#555;margin-top:4px;line-height:1.6">Outline of specific tasks to be carried out</div>
      </div>
      <div style="background:white;border:2px solid #80deea;border-top:4px solid #0097a7;border-radius:8px;padding:12px 10px;text-align:center">
        <div style="background:#0097a7;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;margin:0 auto 8px">3</div>
        <div style="font-size:13px;font-weight:900;color:#0097a7">Timeline</div>
        <div style="font-size:11px;color:#555;margin-top:4px;line-height:1.6">Fixed schedule for completion of tasks</div>
      </div>
      <div style="background:white;border:2px solid #80deea;border-top:4px solid #00acc1;border-radius:8px;padding:12px 10px;text-align:center">
        <div style="background:#00acc1;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;margin:0 auto 8px">4</div>
        <div style="font-size:13px;font-weight:900;color:#00acc1">Support</div>
        <div style="font-size:11px;color:#555;margin-top:4px;line-height:1.6">Inputs / support the Ministry will provide</div>
      </div>
      <div style="background:white;border:2px solid #80deea;border-top:4px solid #26c6da;border-radius:8px;padding:12px 10px;text-align:center">
        <div style="background:#26c6da;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;margin:0 auto 8px">5</div>
        <div style="font-size:13px;font-weight:900;color:#006064">Deliverables</div>
        <div style="font-size:11px;color:#555;margin-top:4px;line-height:1.6">Final outputs required of the Consultant</div>
      </div>
    </div>
    <div style="background:#006064;color:white;padding:10px 14px;border-radius:8px;margin-top:12px;font-size:12.5px;font-weight:700">
      📌 Mnemonic: <strong>O T T S D</strong> → Objective · Tasks · Timeline · Support · Deliverables
    </div>
  </div>
</div>`,

        // ─── PRACTICAL EXAMPLE ─────────────────────────────────────────────────
        practical_example: `
<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1a237e,#283593);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">💰</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 1 · Rule 29 — Audit Exemption</div>
      <div style="font-size:14px;font-weight:900">GPF Advance for Employee's Wedding — Does It Go to Audit?</div>
    </div>
  </div>
  <div style="border:2px solid #9fa8da;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#e8eaf6;border-right:1px solid #9fa8da">
        <div style="font-size:10px;font-weight:800;color:#1a237e;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">The Division Office sanctions a <strong>GPF advance</strong> for an employee's daughter's wedding. The Postmaster wonders whether to send a copy to the Audit Officer.</div>
      </div>
      <div style="padding:14px 16px;background:#e3f2fd;border-right:1px solid #9fa8da">
        <div style="font-size:10px;font-weight:800;color:#0d47a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📜 The Rule</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Under Rule 29, <strong>GPF withdrawals / advances to employees</strong> are explicitly in the exempt list — they are treated as routine personal finance actions, not public expenditure sanctions.</div>
      </div>
      <div style="padding:14px 16px;background:#e8f5e9">
        <div style="font-size:10px;font-weight:800;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Correct Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">The Postmaster does <strong>NOT</strong> need to endorse a copy to the Audit Officer. The sanction is complete without it.</div>
      </div>
    </div>
    <div style="padding:10px 16px;background:#1a237e;color:white;font-size:12.5px;font-weight:700">
      💡 Other exempt cases: promotions, transfers, creation/abolition of posts, contingent expenditure by Head of Office.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#e65100,#f57c00);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">🌐</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 2 · Indian Agent for Foreign Principal</div>
      <div style="font-size:14px;font-weight:900">International Machinery Brand Bids via Delhi Representative</div>
    </div>
  </div>
  <div style="border:2px solid #ffcc80;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#fff8e1;border-right:1px solid #ffcc80">
        <div style="font-size:10px;font-weight:800;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">An <strong>international machinery brand</strong> wants to bid for a high-value government contract through its <strong>local representative in Delhi</strong>.</div>
      </div>
      <div style="padding:14px 16px;background:#fff3e0;border-right:1px solid #ffcc80">
        <div style="font-size:10px;font-weight:800;color:#bf360c;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🚫 What's NOT Allowed</div>
        <div style="font-size:13px;color:#222;line-height:1.7">The local representative <strong>cannot simply submit the bid</strong> as if they were a regular supplier — even if they are already registered on GeM as a vendor.</div>
      </div>
      <div style="padding:14px 16px;background:#e8f5e9">
        <div style="font-size:10px;font-weight:800;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Correct Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">They must first <strong>enlist under the Compulsory Enlistment Scheme</strong> for Indian Agents under the Dept. of Expenditure — a separate, mandatory process.</div>
      </div>
    </div>
    <div style="padding:10px 16px;background:#e65100;color:white;font-size:12.5px;font-weight:700">
      ⚠️ Regular GeM vendor registration ≠ Enlistment as Indian Agent. Two completely different processes.
    </div>
  </div>
</div>`,

        // ─── EXAM INSIGHT ──────────────────────────────────────────────────────
        exam_insight: `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#7b0000,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔥 High-Probability Exam Questions — Must-Know Facts
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
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔥 <strong>Rule 28 — What always needs Finance Ministry consent first?</strong></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2">Any grant of land, assignment/relinquishment of revenue, mineral/forest rights, or water/power rights.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">⚠️ <em>"E-Publishing and E-Procurement both happen on CPPP"</em></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>FALSE.</strong> E-Publishing (Rule 159) is on <strong>CPPP</strong>. E-Procurement (Rule 160) can be via <strong>NIC or other approved providers</strong>.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>Unsuccessful bid securities refunded by the</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>30th day</strong> after contract award</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔁 <em>"Khadi and Handloom both have a 20% mandatory quota"</em></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>FALSE.</strong> Khadi = <strong>100% exclusive</strong> from KVIC. Only general handloom textiles have the <strong>20% minimum</strong> quota.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>Undelegated financial powers vest in</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">The <strong>Finance Ministry</strong> exclusively</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a">📌 <strong>Code of Integrity — disclosure window for past violations</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828">Last <strong>3 years</strong> in any country</td>
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
          <span style="display:inline-block;background:#004d40;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Khadi (Hand-spun / Hand-woven)</span><br>
          <strong>100% exclusive</strong> reservation — must be bought <strong>only from KVIC</strong>. No alternatives.<br>
          <span style="font-size:12px;color:#555">The strictest textile reservation in GFR.</span>
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3f8ff;border-bottom:1px solid #e3f2fd;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#00695c;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">General Handloom Textiles</span><br>
          <strong>Minimum 20%</strong> must come from handloom origins. Rest is open market.<br>
          <span style="font-size:12px;color:#555">Sources: KVIC, SHGs, cooperatives, weavers with Pehchan card.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 14px;font-size:13px;background:#fff;border-right:1px solid #90caf9;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#e65100;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Supplier Registration</span><br>
          For <strong>domestic firms</strong> supplying goods/services on GeM.<br>
          Valid for <strong>1 to 3 years</strong> — must renew on expiry.<br>
          <span style="font-size:12px;color:#555">Standard onboarding process for all domestic vendors.</span>
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3f8ff;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#0d47a1;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Agent Enlistment</span><br>
          Mandatory separate process for <strong>Indian agents quoting on behalf of foreign principals</strong>.<br>
          Done under the <strong>Compulsory Enlistment Scheme</strong> of Dept. of Expenditure.<br>
          <span style="font-size:12px;color:#555">Completely different from and NOT a substitute for supplier registration.</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#1b3a1b,#2e7d32);color:white;padding:16px 20px;border-radius:12px;margin-bottom:20px">
  <div style="font-size:11px;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;margin-bottom:12px">📌 Ultra-Revision — 60-Second Flash Points</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Undelegated financial powers vest exclusively in</span><br>
      <strong style="font-size:15px">Finance Ministry</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">GPF, appointments &amp; routine contingencies — send to Audit?</span><br>
      <strong style="font-size:15px">NO — all exempt under Rule 29</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Bidder integrity disclosure covers past</span><br>
      <strong style="font-size:16px">3 years</strong> in any country
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">All bids must be received via</span><br>
      <strong style="font-size:15px">E-Procurement (mandatory)</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Non-Consulting gap — refer to Rules for</span><br>
      <strong style="font-size:15px">Goods (Rules 135–176)</strong>, not Consulting
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">TOR for consultants has exactly</span><br>
      <strong style="font-size:15px">5 elements</strong> (O·T·T·S·D)
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">GTE banned for procurements up to</span><br>
      <strong style="font-size:16px">₹200 Crores</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">GeM budget projection required within</span><br>
      <strong style="font-size:16px">30 days</strong> of Budget approval
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

        let inserted = 0, skipped = 0;

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

main().catch(err => { console.error('❌ Error:', err); process.exit(1); });
