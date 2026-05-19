
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
        title: "GFR 2017: Revenue, Audits & Special Procurements — Rules 18, 19, 41, 173, 193 & Service Selection Methods",
        rule_number: "Rules 18, 19, 41, 173, 193 of GFR 2017",
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
      <div style="font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;opacity:0.75">Ministry of Finance · General Financial Rules, 2017</div>
      <div style="font-size:16px;font-weight:900;margin-top:3px">Revenue Remission, Audit Secrecy, Energy &amp; Evaluation Rules</div>
    </div>
  </div>
  <div style="border:2px solid #c7d3f0;border-top:none;border-radius:0 0 12px 12px;background:#f0f4ff;padding:14px 18px">
    <p style="margin:0;font-size:13px;color:#1a2a5e;line-height:1.8">Part 3 covers rules that do not fit neatly into procurement alone — they govern how the Government handles revenue write-offs, secret documents during audits, energy standards, and the selection of the cheapest qualified service provider.</p>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">💸</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rules 18 &amp; 19</div>
      <div style="font-size:14px;font-weight:900">Remission of Revenue</div>
    </div>
  </div>
  <div style="border:2px solid #a5d6a7;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="padding:14px 18px;background:#e8f5e9">
      <ul style="margin:0;padding-left:20px;line-height:2;font-size:13.5px;color:#1b5e20">
        <li>A claim to revenue shall <strong>not be remitted or abandoned</strong> save with the sanction of the <strong>competent authority</strong>.</li>
        <li>Departments shall submit an <strong>Annual Statement on the 1st of June</strong> to the Audit and Accounts Officer.</li>
        <li>However, <strong>individual remissions below ₹1,000</strong> need not be included in this annual statement.</li>
      </ul>
    </div>
    <div style="background:#1b5e20;color:white;padding:10px 16px;font-size:12.5px;font-weight:700">
      💡 Key Point: Even if a remission is below ₹1,000, it still requires competent authority sanction — it is just excluded from the <em>annual reporting statement</em>.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#212121,#424242);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">🔒</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rule 41</div>
      <div style="font-size:14px;font-weight:900">Handling of 'Secret' Files by Audit</div>
    </div>
  </div>
  <div style="border:2px solid #9e9e9e;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#f5f5f5">
          <th style="padding:10px 16px;font-size:12px;color:#212121;font-weight:800;text-align:left;border-right:2px solid #9e9e9e;border-bottom:2px solid #9e9e9e">Classification</th>
          <th style="padding:10px 16px;font-size:12px;color:#212121;font-weight:800;text-align:left;border-bottom:2px solid #9e9e9e">Required Procedure</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff">
          <td style="padding:12px 16px;border-right:1px solid #9e9e9e;border-bottom:1px solid #eeeeee">
            <span style="background:#c62828;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">🔴 Top Secret</span>
          </td>
          <td style="padding:12px 16px;font-size:13px;color:#212121;line-height:1.8;border-bottom:1px solid #eeeeee">
            The file may be sent <strong>personally</strong> to the <strong>Head of the Audit Office</strong>, specifying the classification. The Head deals with it in accordance with standing instructions.
          </td>
        </tr>
        <tr style="background:#f9f9f9">
          <td style="padding:12px 16px;border-right:1px solid #9e9e9e">
            <span style="background:#e64a19;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:900">🟠 Secret</span>
          </td>
          <td style="padding:12px 16px;font-size:13px;color:#212121;line-height:1.8">
            Same procedure applies — sent <strong>personally</strong> to the Head of the Audit Office with the classification clearly specified.
          </td>
        </tr>
      </tbody>
    </table>
    <div style="background:#212121;color:white;padding:10px 16px;font-size:12.5px;font-weight:700">
      ⚠️ Critical: Secret/Top Secret files are <u>NOT exempt from Audit</u>. They are only handled via a special personal delivery channel.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#f57f17,#f9a825);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">⚡</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.9">Rule 173</div>
      <div style="font-size:14px;font-weight:900">Energy Efficient Appliances</div>
    </div>
  </div>
  <div style="border:2px solid #ffe082;border-top:none;border-radius:0 0 10px 10px;padding:14px 18px;background:#fffde7">
    <p style="margin:0;font-size:13.5px;color:#6d4c00;line-height:1.9">Ministries/Departments, while procuring electrical appliances, shall ensure that they carry the <strong>notified threshold or higher Star Rating</strong> of the <strong>Bureau of Energy Efficiency (BEE)</strong>. Procuring lower-rated appliances is <u>not permitted</u>.</p>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#880e4f,#c2185b);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">📉</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rule 193</div>
      <div style="font-size:14px;font-weight:900">Least Cost System (LCS)</div>
    </div>
  </div>
  <div style="border:2px solid #f48fb1;border-top:none;border-radius:0 0 10px 10px;padding:14px 18px;background:#fce4ec">
    <ul style="margin:0;padding-left:20px;line-height:2;font-size:13.5px;color:#880e4f">
      <li>Under LCS, there is <strong>zero weightage for the technical score</strong> in the final evaluation.</li>
      <li>The <strong>responsive, technically qualified proposal</strong> with the <strong>lowest evaluated cost</strong> is selected.</li>
      <li>Technical evaluation is used only as a <em>qualifying gate</em> — not for scoring the final winner.</li>
    </ul>
    <div style="display:flex;align-items:center;gap:8px;background:#880e4f;color:white;padding:10px 14px;border-radius:8px;margin-top:10px;font-size:13px;font-weight:700">
      <span>💡</span> LCS = Pass the technical test, then it's purely a price competition.
    </div>
  </div>
</div>`,

        // ─── DAK GURU EXPLANATION ───────────────────────────────────────────────
        guru_explanation: `
<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#e65100,#f57c00);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    👤 When to Use a Single Tender Enquiry (Nomination)
  </div>
  <div style="border:2px solid #ffcc80;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#fff8e1">
    <p style="margin:0 0 12px 0;font-size:14px;color:#e65100;line-height:1.9">You can bypass competition and buy from a <strong>single source only</strong> under three specific circumstances:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
      <div style="background:white;border:2px solid #ffcc80;border-top:4px solid #f57c00;border-radius:8px;padding:14px;text-align:center">
        <div style="font-size:28px;margin-bottom:8px">🏭</div>
        <div style="font-size:13px;font-weight:900;color:#e65100;margin-bottom:6px">Sole Manufacturer</div>
        <div style="font-size:12px;color:#555;line-height:1.7">It is in the <em>absolute knowledge</em> of the department that <strong>only one firm</strong> makes the product in question.</div>
      </div>
      <div style="background:white;border:2px solid #ffcc80;border-top:4px solid #c0392b;border-radius:8px;padding:14px;text-align:center">
        <div style="font-size:28px;margin-bottom:8px">🚨</div>
        <div style="font-size:13px;font-weight:900;color:#c0392b;margin-bottom:6px">Emergency</div>
        <div style="font-size:12px;color:#555;line-height:1.7">A <strong>sudden, extreme emergency</strong> exists where delay caused by a tender process would be damaging.</div>
      </div>
      <div style="background:white;border:2px solid #ffcc80;border-top:4px solid #1b5e20;border-radius:8px;padding:14px;text-align:center">
        <div style="font-size:28px;margin-bottom:8px">🔩</div>
        <div style="font-size:13px;font-weight:900;color:#1b5e20;margin-bottom:6px">Standardization</div>
        <div style="font-size:12px;color:#555;line-height:1.7">The item <strong>must be sourced from a specific firm</strong> to maintain standardization with existing equipment or systems.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#4a148c,#7b1fa2);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🎨 Logo &amp; Design Competitions — Transparent Selection
  </div>
  <div style="border:2px solid #ce93d8;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f3e5f5">
    <p style="margin:0 0 12px 0;font-size:14px;color:#4a148c;line-height:1.9">If a department needs a <strong>new logo or symbol</strong>, it cannot simply pick a designer at random. The rules require:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:white;border-left:4px solid #7b1fa2;border-radius:8px;padding:12px 14px;font-size:13px;color:#4a148c;line-height:1.75">
        <strong>1. Public Competition:</strong><br> A design competition must be held in a <strong>transparent manner with wide publicity</strong>.
      </div>
      <div style="background:white;border-left:4px solid #7b1fa2;border-radius:8px;padding:12px 14px;font-size:13px;color:#4a148c;line-height:1.75">
        <strong>2. CPPP Publication:</strong><br> The competition must be posted on the <strong>Central Public Procurement Portal (CPPP)</strong> to ensure open access.
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📋 Endorsing Sanctions — What Goes to Audit &amp; What Does Not
  </div>
  <div style="border:2px solid #9fa8da;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr>
          <th style="padding:10px 16px;background:#e8eaf6;font-size:12px;color:#1a237e;font-weight:800;text-align:left;border-right:2px solid #9fa8da;border-bottom:2px solid #9fa8da;width:50%">✅ MUST BE SENT to Audit/Accounts Officer</th>
          <th style="padding:10px 16px;background:#e8f5e9;font-size:12px;color:#1b5e20;font-weight:800;text-align:left;border-bottom:2px solid #9fa8da">❌ Do NOT Send (Routine Personal Sanctions)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:14px 16px;font-size:13px;color:#1a237e;background:#f3f5ff;border-right:2px solid #9fa8da;line-height:2;vertical-align:top">
            All financial sanctions for expenditure, procurement, contracts, and non-routine approvals must go to the Audit/Accounts Officer.
          </td>
          <td style="padding:14px 16px;font-size:13px;color:#1b5e20;background:#f1fff1;line-height:2;vertical-align:top">
            • <strong>GPF withdrawals</strong> granted to employees<br>
            • <strong>Grants of advances</strong> to employees<br>
            • <strong>Promotions</strong> and <strong>Transfers</strong> of staff
          </td>
        </tr>
      </tbody>
    </table>
    <div style="background:#1a237e;color:white;padding:10px 16px;font-size:12.5px;font-weight:700">
      💡 Rule of Thumb: If it's about <em>money leaving government coffers for services/goods</em>, it goes to Audit. If it's a routine HR/personal finance action, it does not.
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#006266,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🗂️ Service Procurement Limits — Consulting vs. Non-Consulting
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #80cbc4;border-top:none">
    <thead>
      <tr style="background:#e0f2f1">
        <th style="padding:10px 14px;font-size:12px;color:#006266;font-weight:800;text-align:center;border-right:1px solid #80cbc4;border-bottom:2px solid #80cbc4;width:20%">Service Type</th>
        <th style="padding:10px 14px;font-size:12px;color:#006266;font-weight:800;text-align:center;border-right:1px solid #80cbc4;border-bottom:2px solid #80cbc4;width:25%">Estimated Value</th>
        <th style="padding:10px 14px;font-size:12px;color:#006266;font-weight:800;text-align:left;border-bottom:2px solid #80cbc4">Procurement Method / Action Required</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td colspan="3" style="padding:6px 14px;font-size:11px;font-weight:900;color:#004d40;letter-spacing:0.1em;text-transform:uppercase;background:#b2dfdb;border-bottom:1px solid #80cbc4">🤝 CONSULTING SERVICES (Intellectual / Advisory / Training)</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;text-align:center;border-right:1px solid #80cbc4;border-bottom:1px solid #e0f2f1">
          <span style="background:#00838f;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:800">Consulting</span>
        </td>
        <td style="padding:10px 14px;text-align:center;font-size:14px;font-weight:900;color:#006266;border-right:1px solid #80cbc4;border-bottom:1px solid #e0f2f1">Up to <strong>₹50 Lakhs</strong></td>
        <td style="padding:10px 14px;font-size:13px;color:#333;line-height:1.75;border-bottom:1px solid #e0f2f1">Prepare a long list of potential consultants via <strong>formal/informal enquiries</strong>. No need to publish EOI on CPPP.</td>
      </tr>
      <tr style="background:#e8f8f5">
        <td style="padding:10px 14px;text-align:center;border-right:1px solid #80cbc4;border-bottom:1px solid #e0f2f1">
          <span style="background:#00838f;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:800">Consulting</span>
        </td>
        <td style="padding:10px 14px;text-align:center;font-size:14px;font-weight:900;color:#c0392b;border-right:1px solid #80cbc4;border-bottom:1px solid #e0f2f1">Above <strong>₹50 Lakhs</strong></td>
        <td style="padding:10px 14px;font-size:13px;color:#333;line-height:1.75;border-bottom:1px solid #e0f2f1">Publish an <strong>'Expression of Interest' (EOI) on CPPP</strong> to shortlist eligible consultants from the open market.</td>
      </tr>
      <tr style="background:#fff">
        <td colspan="3" style="padding:6px 14px;font-size:11px;font-weight:900;color:#1b5e20;letter-spacing:0.1em;text-transform:uppercase;background:#c8e6c9;border-bottom:1px solid #80cbc4;border-top:1px solid #80cbc4">🔧 NON-CONSULTING SERVICES (Physical / Measurable Deliverables)</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;text-align:center;border-right:1px solid #80cbc4;border-bottom:1px solid #e0f2f1">
          <span style="background:#2e7d32;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:800">Non-Consulting</span>
        </td>
        <td style="padding:10px 14px;text-align:center;font-size:14px;font-weight:900;color:#1b5e20;border-right:1px solid #80cbc4;border-bottom:1px solid #e0f2f1">Up to <strong>₹50 Lakhs</strong></td>
        <td style="padding:10px 14px;font-size:13px;color:#333;line-height:1.75;border-bottom:1px solid #e0f2f1">Issue a <strong>Limited Tender Enquiry</strong> to prima facie eligible contractors (minimum <strong>more than 3</strong>).</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:10px 14px;text-align:center;border-right:1px solid #80cbc4">
          <span style="background:#2e7d32;color:white;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:800">Non-Consulting</span>
        </td>
        <td style="padding:10px 14px;text-align:center;font-size:14px;font-weight:900;color:#c0392b;border-right:1px solid #80cbc4">Above <strong>₹50 Lakhs</strong></td>
        <td style="padding:10px 14px;font-size:13px;color:#333;line-height:1.75">Issue an <strong>advertisement on CPPP, GeM, and the organisation's own website</strong> for open competition.</td>
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
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Annual Revenue Remission Statement — Exclusion Threshold</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#c2185b;border-bottom:1px solid #fce4ec">Below <strong>₹1,000</strong></td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Advertised Tender Enquiry — Minimum Submission Time (Domestic)</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#0d47a1;border-bottom:1px solid #fce4ec"><strong>3 weeks</strong></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Advertised Tender Enquiry — Minimum Submission Time (Foreign Bidders)</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#0d47a1;border-bottom:1px solid #fce4ec"><strong>4 weeks</strong></td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Minimum Shortlisted Consultants (for any selection method)</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#1b5e20;border-bottom:1px solid #fce4ec">Not less than <strong>3</strong></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1">QCBS Technical Weightage — Maximum Permissible</td>
        <td style="padding:10px 14px;text-align:center;font-size:16px;font-weight:900;color:#e65100">Must <strong>not exceed 80%</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#37474f,#546e7a);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏦 Rents, Fines &amp; Special Conditions
  </div>
  <div style="border:2px solid #b0bec5;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#eceff1">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div style="background:white;border-left:4px solid #546e7a;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#37474f;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🏢 Rents — Civil Departments</div>
        <div style="font-size:13px;color:#333;line-height:1.8">If a civil department (other than CPWD) maintains a <strong>rentable building</strong>, the <strong>Head of Department</strong> is responsible for recovering the rent from occupants.</div>
      </div>
      <div style="background:white;border-left:4px solid #c62828;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#c62828;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">⚖️ Fines — No Double Refund</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Every authority imposing a fine must ensure it is <strong>deposited into the treasury without double refunds</strong>. Once paid, it cannot be refunded twice.</div>
      </div>
      <div style="background:white;border-left:4px solid #1565c0;border-radius:8px;padding:12px 14px;grid-column:1/-1">
        <div style="font-size:11px;font-weight:900;color:#1565c0;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">👤 Single Source Selection (Nomination) — For Consulting Services</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Can only be used under <strong>exceptional circumstances</strong>: (1) Continuation of previous/related work, (2) Emergency or natural disaster, or (3) If only one consultant has the requisite expertise.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#006064,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔟 Consulting Services Bidding Process — Two-Bid System
  </div>
  <div style="border:2px solid #80deea;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e0f7fa">
    <ol style="margin:0;padding-left:22px;line-height:2.4;font-size:14px;color:#006064">
      <li>
        <strong>Submission:</strong> Consultants submit two separately sealed envelopes — a <em>Technical Bid</em> and a <em>Financial Bid</em> — placed inside one larger sealed outer envelope.
      </li>
      <li>
        <strong>First Opening:</strong> The purchasing department opens <u>only the Technical Proposals</u> on the specified date in the presence of the bidders' representatives.
      </li>
      <li>
        <strong>Technical Evaluation:</strong> The <strong>Consultancy Evaluation Committee (CEC)</strong> evaluates the technical bids and records reasons for acceptance and rejection of each.
      </li>
      <li>
        <strong>Second Opening:</strong> Financial bids of <u>only the technically qualified bidders</u> are opened for final evaluation and selection (via QCBS, LCS, or other applicable method).
      </li>
    </ol>
    <div style="background:#006064;color:white;padding:10px 14px;border-radius:8px;margin-top:12px;font-size:12.5px;font-weight:700">
      💡 Financial bids of <em>technically rejected</em> consultants are <strong>never opened</strong> — they are returned unopened.
    </div>
  </div>
</div>`,

        // ─── PRACTICAL EXAMPLE ─────────────────────────────────────────────────
        practical_example: `
<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#212121,#424242);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">💻</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 1 · Single Tender Enquiry</div>
      <div style="font-size:14px;font-weight:900">Cyber-Attack Recovery — Only One Firm Makes the Required Software</div>
    </div>
  </div>
  <div style="border:2px solid #9e9e9e;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#f5f5f5;border-right:1px solid #9e9e9e">
        <div style="font-size:10px;font-weight:800;color:#424242;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">The Division Office suffers a <strong>cyber-attack</strong> and needs immediate recovery software that <strong>only one specific cybersecurity firm in India manufactures</strong>.</div>
      </div>
      <div style="padding:14px 16px;background:#eceff1;border-right:1px solid #9e9e9e">
        <div style="font-size:10px;font-weight:800;color:#546e7a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🔍 GFR Grounds</div>
        <div style="font-size:13px;color:#222;line-height:1.7">This satisfies <strong>Condition 1</strong> for STE: it is in the absolute knowledge of the department that <strong>only a particular firm is the manufacturer</strong>.</div>
      </div>
      <div style="padding:14px 16px;background:#e8f5e9">
        <div style="font-size:10px;font-weight:800;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Correct Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">The department can proceed with a <strong>Single Tender Enquiry (STE)</strong> directly to that cybersecurity firm without inviting competitive bids.</div>
      </div>
    </div>
    <div style="padding:10px 16px;background:#37474f;color:white;font-size:12.5px;font-weight:700">
      ⚠️ Even though it's an emergency, the STE is justified here primarily on grounds of <em>sole manufacturer</em> — both reasons independently qualify.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#006266,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">🧹</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 2 · Non-Consulting Service Procurement</div>
      <div style="font-size:14px;font-weight:900">PMG Office — External Cleaning &amp; Janitorial Service for ₹45 Lakhs</div>
    </div>
  </div>
  <div style="border:2px solid #80cbc4;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#e0f7fa;border-right:1px solid #80cbc4">
        <div style="font-size:10px;font-weight:800;color:#006266;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">PMG Office wants to hire an <strong>external cleaning and janitorial service</strong> for one year, estimated to cost <strong>₹45 Lakhs</strong>.</div>
      </div>
      <div style="padding:14px 16px;background:#e8f5e9;border-right:1px solid #80cbc4">
        <div style="font-size:10px;font-weight:800;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🔍 Classification</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Cleaning is a <strong>Non-Consulting Service</strong> (physical, measurable deliverables). At ₹45 Lakhs, it is <strong>within the ₹50 Lakh threshold</strong>.</div>
      </div>
      <div style="padding:14px 16px;background:#fff8e1">
        <div style="font-size:10px;font-weight:800;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Correct Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Issue a <strong>Limited Tender Enquiry</strong> to eligible contractors — must go to <strong>more than 3</strong> of them. No CPPP advertisement needed.</div>
      </div>
    </div>
    <div style="padding:10px 16px;background:#006064;color:white;font-size:12.5px;font-weight:700">
      💡 If the estimated cost were ₹55 Lakhs (above ₹50L), the office would need to advertise on CPPP, GeM, and its own website instead.
    </div>
  </div>
</div>`,

        // ─── EXAM INSIGHT ──────────────────────────────────────────────────────
        exam_insight: `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#7b0000,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔥 High-Probability Exam Questions — Most Asked Facts
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
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔥 <strong>LCS gives zero weightage to what?</strong></td>
        <td style="padding:10px 14px;font-size:14px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">Technical Score — only lowest evaluated cost wins after qualifying.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">⚠️ <em>"Secret/Top Secret files are exempt from audit scrutiny"</em></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>FALSE.</strong> They are NOT exempt. They must be sent <u>personally</u> to the Head of the Audit Office.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>Annual Procurement Plans must be projected on GeM within</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>30 days</strong> of Budget approval</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>Individual remissions excluded from 1st June Annual Statement if below</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>₹1,000</strong></td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔁 <em>"Late bids in a Limited Tender Enquiry can be accepted if the reason is genuine"</em></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>FALSE.</strong> Late bids in ATE or LTE must <u>NOT be considered under any circumstances</u>.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a">📌 <strong>Electrical appliances procured by Ministries must carry</strong></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828">BEE Star Rating of the <strong>notified threshold or higher</strong>.</td>
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
          <span style="display:inline-block;background:#880e4f;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">LCS — Least Cost System</span><br>
          Technical score carries <strong>zero weight</strong> in final selection.<br>
          The technically <em>qualified</em> bidder with the <strong>lowest evaluated cost wins</strong>.<br>
          <span style="font-size:12px;color:#555">Used when technical quality is largely standard/routine.</span>
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3f8ff;border-bottom:1px solid #e3f2fd;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#4527a0;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">QCBS — Quality &amp; Cost Based</span><br>
          Technical score carries significant weight (default <strong>70:30</strong>).<br>
          Final winner is the bidder with the <strong>highest combined score</strong>.<br>
          <span style="font-size:12px;color:#555">Used when expertise and quality of output truly matters.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 14px;font-size:13px;background:#fff;border-right:1px solid #90caf9;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#e65100;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">ATE — Domestic Timeline</span><br>
          Minimum <strong>3 weeks</strong> from publication date for bid submission.
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3f8ff;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#c0392b;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">ATE — Foreign Bidders Included</span><br>
          Minimum <strong>4 weeks</strong> required to account for international logistics and communication.
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#1b3a1b,#2e7d32);color:white;padding:16px 20px;border-radius:12px;margin-bottom:20px">
  <div style="font-size:11px;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;margin-bottom:12px">📌 Ultra-Revision — 60-Second Flash Points</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Electrical appliances must carry</span><br>
      <strong style="font-size:15px">BEE Star Rating (threshold or higher)</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Revenue remissions excluded from 1st June statement if below</span><br>
      <strong style="font-size:16px">₹1,000</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Consultants / LTE contractors must always be more than</span><br>
      <strong style="font-size:16px">3 firms</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Buy-Back offers permitted when</span><br>
      <strong style="font-size:15px">Replacing old items with newer versions</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Late bids in ATE or LTE</span><br>
      <strong style="font-size:15px">Must NOT be considered — ever</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">QCBS max technical weightage cap</span><br>
      <strong style="font-size:16px">80%</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Consulting EOI on CPPP required above</span><br>
      <strong style="font-size:16px">₹50 Lakhs</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">LCS selects winner purely on</span><br>
      <strong style="font-size:15px">Lowest cost (zero tech weightage)</strong>
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
