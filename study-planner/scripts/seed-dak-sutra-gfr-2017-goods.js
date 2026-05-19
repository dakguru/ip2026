
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
        title: "GFR 2017: Procurement of Goods — Rules 142 to 176 (GeM, Tendering, Security & Bidding)",
        rule_number: "Rules 142–176 of GFR 2017",
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
      <div style="font-size:16px;font-weight:900;margin-top:3px">Legal Definitions &amp; Authoritative Rules for Public Procurement of Goods</div>
    </div>
  </div>
  <div style="border:2px solid #c7d3f0;border-top:none;border-radius:0 0 12px 12px;background:#f0f4ff;padding:16px 18px">
    <p style="margin:0;font-size:13px;color:#1a2a5e;line-height:1.8">These provisions govern how Government Ministries and Departments must procure goods — covering everything from defining what "goods" are, to publishing tenders, to protecting the integrity of the bidding process.</p>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#4a148c,#7b1fa2);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">📦</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rule 143</div>
      <div style="font-size:14px;font-weight:900">Definition of Goods</div>
    </div>
  </div>
  <div style="border:2px solid #ce93d8;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr>
          <th style="padding:10px 16px;background:#f3e5f5;font-size:12px;color:#4a148c;font-weight:800;text-align:left;border-right:2px solid #ce93d8;border-bottom:2px solid #ce93d8;width:50%">✅ INCLUDES</th>
          <th style="padding:10px 16px;background:#fff3e0;font-size:12px;color:#bf360c;font-weight:800;text-align:left;border-bottom:2px solid #ce93d8">❌ STRICTLY EXCLUDES</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:14px 16px;font-size:13px;color:#4a148c;background:#fdf6ff;border-right:2px solid #ce93d8;vertical-align:top;line-height:2">
            • All <strong>tangible or intangible products</strong><br>
            • Software, technology transfer<br>
            • Licenses, patents &amp; intellectual properties<br>
            • Works and services<br>
            • Transportation, insurance<br>
            • Installation &amp; commissioning<br>
            • Training and maintenance
          </td>
          <td style="padding:14px 16px;font-size:13px;color:#bf360c;background:#fff8f5;vertical-align:top;line-height:2">
            <strong>Books, publications, periodicals</strong> etc. procured <em>for a library</em> are strictly outside the definition of "Goods" under GFR Rule 143.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#006266,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">⚖️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rule 144</div>
      <div style="font-size:14px;font-weight:900">Fundamental Principles of Public Procurement</div>
    </div>
  </div>
  <div style="border:2px solid #80cbc4;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e0f7fa">
    <p style="margin:0 0 12px 0;font-size:13.5px;color:#006266;line-height:1.9">The description of the subject matter of procurement must be:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div style="background:white;border:1px solid #80cbc4;border-radius:8px;padding:10px 14px;text-align:center">
        <div style="font-size:22px">🎯</div>
        <div style="font-size:13px;font-weight:900;color:#006266">Objective</div>
        <div style="font-size:12px;color:#555">Based on facts, not opinions</div>
      </div>
      <div style="background:white;border:1px solid #80cbc4;border-radius:8px;padding:10px 14px;text-align:center">
        <div style="font-size:22px">⚙️</div>
        <div style="font-size:13px;font-weight:900;color:#006266">Functional</div>
        <div style="font-size:12px;color:#555">Describes what it must do</div>
      </div>
      <div style="background:white;border:1px solid #80cbc4;border-radius:8px;padding:10px 14px;text-align:center">
        <div style="font-size:22px">🔤</div>
        <div style="font-size:13px;font-weight:900;color:#006266">Generic</div>
        <div style="font-size:12px;color:#555">No brand/trademark names</div>
      </div>
      <div style="background:white;border:1px solid #80cbc4;border-radius:8px;padding:10px 14px;text-align:center">
        <div style="font-size:22px">📏</div>
        <div style="font-size:13px;font-weight:900;color:#006266">Measurable</div>
        <div style="font-size:12px;color:#555">Quantifiable &amp; verifiable</div>
      </div>
    </div>
    <div style="background:#006266;color:white;padding:10px 14px;border-radius:8px;font-size:13px;font-weight:700">
      🚫 Must <u>NOT</u> indicate a requirement for a particular <strong>trade mark, trade name, or brand</strong>.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">🖥️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Mandatory Requirement</div>
      <div style="font-size:14px;font-weight:900">Mandatory E-Publishing &amp; E-Procurement</div>
    </div>
  </div>
  <div style="border:2px solid #a5d6a7;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e8f5e9">
    <ul style="margin:0;padding-left:20px;line-height:2;font-size:13.5px;color:#1b5e20">
      <li>All Ministries/Departments <strong>must</strong> publish tender enquiries, corrigenda, and bid awards on the <strong>Central Public Procurement Portal (CPPP)</strong>.</li>
      <li>It is mandatory to receive <strong>all</strong> bids through approved <strong>e-procurement portals</strong> (such as NIC or other approved providers).</li>
    </ul>
    <div style="display:flex;align-items:center;gap:10px;background:#1b5e20;color:white;padding:10px 14px;border-radius:8px;margin-top:10px;font-size:13px;font-weight:700">
      <span>💡</span> No manual / offline bid submission is allowed for procurements covered under e-procurement mandate.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#7b0000,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">🚫</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Rule 151</div>
      <div style="font-size:14px;font-weight:900">Debarment from Bidding</div>
    </div>
  </div>
  <div style="border:2px solid #ef9a9a;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#ffebee">
          <th style="padding:10px 16px;font-size:12px;color:#7b0000;font-weight:800;text-align:left;border-right:1px solid #ef9a9a;border-bottom:2px solid #ef9a9a">Offence</th>
          <th style="padding:10px 16px;font-size:12px;color:#7b0000;font-weight:800;text-align:center;border-bottom:2px solid #ef9a9a">Debarment Period</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff">
          <td style="padding:10px 16px;font-size:13px;color:#333;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">Found guilty under <strong>Prevention of Corruption Act</strong> or <strong>BNS</strong></td>
          <td style="padding:10px 16px;text-align:center;font-size:16px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">Up to <strong>3 Years</strong></td>
        </tr>
        <tr style="background:#fff8f8">
          <td style="padding:10px 16px;font-size:13px;color:#333;border-right:1px solid #ef9a9a">Breaching the <strong>Code of Integrity</strong></td>
          <td style="padding:10px 16px;text-align:center;font-size:16px;font-weight:900;color:#c62828">Up to <strong>2 Years</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,

        // ─── DAK GURU EXPLANATION ───────────────────────────────────────────────
        guru_explanation: `
<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🚫 The Rule Against Splitting — Anti-Fragmentation Principle
  </div>
  <div style="border:2px solid #9fa8da;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#e8eaf6">
    <p style="margin:0 0 14px 0;font-size:14px;color:#1a237e;line-height:1.9">You <strong>cannot divide a demand for goods</strong> into smaller quantities just to make piecemeal purchases. This is strictly prohibited because it is a trick to:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:white;border:2px solid #9fa8da;border-left:4px solid #c0392b;border-radius:8px;padding:12px 14px;font-size:13px;color:#1a237e;line-height:1.7">
        <strong style="color:#c0392b">❌ Trick 1:</strong> Avoid the mandatory <strong>L-1 bidding or GeM Reverse Auction</strong> by keeping value below the ₹10,00,000 threshold.
      </div>
      <div style="background:white;border:2px solid #9fa8da;border-left:4px solid #c0392b;border-radius:8px;padding:12px 14px;font-size:13px;color:#1a237e;line-height:1.7">
        <strong style="color:#c0392b">❌ Trick 2:</strong> Bypass the need for <strong>higher authority approval</strong> by splitting one big purchase into many small ones that fall under lower limits.
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#004d40,#00695c);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🧵 Textile Reservation Quotas — Protecting Local Weavers
  </div>
  <div style="border:2px solid #80cbc4;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#e0f2f1">
          <th style="padding:10px 16px;font-size:12px;color:#004d40;font-weight:800;text-align:left;border-right:2px solid #80cbc4;border-bottom:2px solid #80cbc4;width:35%">Textile Type</th>
          <th style="padding:10px 16px;font-size:12px;color:#004d40;font-weight:800;text-align:left;border-right:2px solid #80cbc4;border-bottom:2px solid #80cbc4">Mandatory Quota</th>
          <th style="padding:10px 16px;font-size:12px;color:#004d40;font-weight:800;text-align:left;border-bottom:2px solid #80cbc4">Source</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff">
          <td style="padding:10px 16px;font-size:13px;font-weight:800;color:#004d40;border-right:1px solid #80cbc4;border-bottom:1px solid #b2dfdb">Hand-spun &amp; hand-woven textiles (Khadi)</td>
          <td style="padding:10px 16px;font-size:16px;font-weight:900;color:#c0392b;border-right:1px solid #80cbc4;border-bottom:1px solid #b2dfdb"><strong>100%</strong> exclusively</td>
          <td style="padding:10px 16px;font-size:13px;color:#004d40;border-bottom:1px solid #b2dfdb"><strong>KVIC</strong> only</td>
        </tr>
        <tr style="background:#e8f8f5">
          <td style="padding:10px 16px;font-size:13px;font-weight:800;color:#004d40;border-right:1px solid #80cbc4">General handloom origin textiles</td>
          <td style="padding:10px 16px;font-size:16px;font-weight:900;color:#e67e22;border-right:1px solid #80cbc4">Minimum <strong>20%</strong></td>
          <td style="padding:10px 16px;font-size:13px;color:#004d40">SHGs, cooperative societies, or weavers with <strong>Pehchan card</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#e65100,#f57c00);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🌐 Indian Agents &amp; Foreign Principals — Enlistment Rule
  </div>
  <div style="border:2px solid #ffcc80;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#fff8e1">
    <p style="margin:0 0 12px 0;font-size:14px;color:#e65100;line-height:1.9">If an <strong>Indian agent</strong> wants to submit a quote on behalf of a foreign company, they <u>cannot just walk in and bid</u>. They must:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
      <div style="background:white;border:2px solid #ffcc80;border-radius:8px;padding:12px 14px;text-align:center">
        <div style="font-size:28px;margin-bottom:6px">1️⃣</div>
        <div style="font-size:13px;font-weight:800;color:#e65100">Get Enlisted</div>
        <div style="font-size:12px;color:#555;margin-top:4px">Compulsorily enlist with <strong>GeM</strong> under the Dept. of Expenditure's scheme</div>
      </div>
      <div style="background:white;border:2px solid #ffcc80;border-radius:8px;padding:12px 14px;text-align:center">
        <div style="font-size:28px;margin-bottom:6px">⚠️</div>
        <div style="font-size:13px;font-weight:800;color:#e65100">Special Process</div>
        <div style="font-size:12px;color:#555;margin-top:4px">This enlistment is <u>completely different</u> from normal supplier registration</div>
      </div>
      <div style="background:white;border:2px solid #ffcc80;border-radius:8px;padding:12px 14px;text-align:center">
        <div style="font-size:28px;margin-bottom:6px">✅</div>
        <div style="font-size:13px;font-weight:800;color:#e65100">Then Bid</div>
        <div style="font-size:12px;color:#555;margin-top:4px">Only after enlistment can they legally represent a foreign principal</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    💰 Financial Limits for Procurement (Revised w.e.f. 10.07.2024)
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #a5d6a7;border-top:none">
    <thead>
      <tr style="background:#e8f5e9">
        <th style="padding:10px 14px;font-size:12px;color:#1b5e20;font-weight:800;text-align:left;border-right:1px solid #a5d6a7;border-bottom:2px solid #a5d6a7">Procurement Method</th>
        <th style="padding:10px 14px;font-size:12px;color:#1b5e20;font-weight:800;text-align:center;border-right:1px solid #a5d6a7;border-bottom:2px solid #a5d6a7">Estimated Value Limit</th>
        <th style="padding:10px 14px;font-size:12px;color:#1b5e20;font-weight:800;text-align:left;border-bottom:2px solid #a5d6a7">Condition / Action</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td colspan="3" style="padding:6px 14px;font-size:11px;font-weight:900;color:#558b2f;letter-spacing:0.1em;text-transform:uppercase;background:#c8e6c9;border-bottom:1px solid #a5d6a7">🛒 GeM PROCUREMENT</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">GeM: Direct Purchase</td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Up to <strong>₹50,000</strong></td>
        <td style="padding:9px 14px;font-size:12.5px;color:#444;border-bottom:1px solid #dcedc8">From any available supplier meeting quality/specs.</td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">GeM: L-1 Bidding</td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#e67e22;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">₹50,001 to <strong>₹10,00,000</strong></td>
        <td style="padding:9px 14px;font-size:12.5px;color:#444;border-bottom:1px solid #dcedc8">Lowest price amongst at least 3 different manufacturers.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#c0392b;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">GeM: Online / Reverse Auction</td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#c0392b;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Above <strong>₹10,00,000</strong></td>
        <td style="padding:9px 14px;font-size:12.5px;color:#444;border-bottom:1px solid #dcedc8">Mandatory online bidding / reverse auction tools.</td>
      </tr>
      <tr style="background:#f1f8e9">
        <td colspan="3" style="padding:6px 14px;font-size:11px;font-weight:900;color:#558b2f;letter-spacing:0.1em;text-transform:uppercase;background:#c8e6c9;border-bottom:1px solid #a5d6a7">📋 NON-GeM / TENDER ENQUIRY (for items not available on GeM)</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Without Quotation</td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Up to <strong>₹50,000</strong></td>
        <td style="padding:9px 14px;font-size:12.5px;color:#444;border-bottom:1px solid #dcedc8">On each occasion, for items not on GeM.</td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#e67e22;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Local Purchase Committee (LPC)</td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#e67e22;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">₹50,001 to <strong>₹5,00,000</strong></td>
        <td style="padding:9px 14px;font-size:12.5px;color:#444;border-bottom:1px solid #dcedc8">Constitution of a <strong>3-member committee</strong>.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#c0392b;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Limited Tender Enquiry (LTE)</td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#c0392b;border-right:1px solid #a5d6a7;border-bottom:1px solid #dcedc8">Up to <strong>₹50 Lakhs</strong></td>
        <td style="padding:9px 14px;font-size:12.5px;color:#444;border-bottom:1px solid #dcedc8">Must invite <strong>more than 3</strong> supplier firms.</td>
      </tr>
      <tr style="background:#f9ffe9">
        <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#7b0000;border-right:1px solid #a5d6a7">Advertised Tender Enquiry (ATE)</td>
        <td style="padding:9px 14px;text-align:center;font-size:14px;font-weight:900;color:#7b0000;border-right:1px solid #a5d6a7">₹50 Lakhs and above</td>
        <td style="padding:9px 14px;font-size:12.5px;color:#444">Minimum <strong>3 weeks</strong> for submission (4 weeks if bids from abroad).</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔐 Security &amp; Advance Payment Limits
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #90caf9;border-top:none">
    <thead>
      <tr style="background:#e3f2fd">
        <th style="padding:10px 14px;font-size:12px;color:#0d47a1;font-weight:800;text-align:left;border-right:1px solid #90caf9;border-bottom:2px solid #90caf9">Category</th>
        <th style="padding:10px 14px;font-size:12px;color:#0d47a1;font-weight:800;text-align:center;border-right:1px solid #90caf9;border-bottom:2px solid #90caf9">Prescribed Limit</th>
        <th style="padding:10px 14px;font-size:12px;color:#0d47a1;font-weight:800;text-align:center;border-bottom:2px solid #90caf9">Validity</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#0d47a1;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Bid Security (Earnest Money)</td>
        <td style="padding:10px 14px;text-align:center;font-size:15px;font-weight:900;color:#0d47a1;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">2% to 5% of estimated value</td>
        <td style="padding:10px 14px;text-align:center;font-size:13px;font-weight:700;color:#444;border-bottom:1px solid #e3f2fd"><strong>45 days</strong> beyond final bid validity period</td>
      </tr>
      <tr style="background:#f3f8ff">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#1565c0;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Performance Security</td>
        <td style="padding:10px 14px;text-align:center;font-size:15px;font-weight:900;color:#1565c0;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">3% to 5% of contract value <span style="font-size:11px;color:#1565c0">(revised w.e.f 01.01.2024)</span></td>
        <td style="padding:10px 14px;text-align:center;font-size:13px;font-weight:700;color:#444;border-bottom:1px solid #e3f2fd"><strong>60 days</strong> beyond completion of all obligations (incl. warranty)</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#6a1b9a;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Advance Payment (Private Firms)</td>
        <td style="padding:10px 14px;text-align:center;font-size:15px;font-weight:900;color:#6a1b9a;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Max <strong>30%</strong> of contract value</td>
        <td style="padding:10px 14px;text-align:center;font-size:13px;color:#888;border-bottom:1px solid #e3f2fd">—</td>
      </tr>
      <tr style="background:#f3f8ff">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#6a1b9a;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Advance Payment (Govt / PSU)</td>
        <td style="padding:10px 14px;text-align:center;font-size:15px;font-weight:900;color:#6a1b9a;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Max <strong>40%</strong> of contract value</td>
        <td style="padding:10px 14px;text-align:center;font-size:13px;color:#888;border-bottom:1px solid #e3f2fd">—</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#bf360c;border-right:1px solid #90caf9">Advance Payment (Maintenance Contracts)</td>
        <td style="padding:10px 14px;text-align:center;font-size:15px;font-weight:900;color:#bf360c;border-right:1px solid #90caf9">Max amount payable for <strong>6 months</strong></td>
        <td style="padding:10px 14px;text-align:center;font-size:13px;color:#888">—</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#880e4f,#c2185b);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏦 Key Conditions &amp; Eligibility
  </div>
  <div style="border:2px solid #f48fb1;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#fce4ec">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div style="background:white;border-left:4px solid #c2185b;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#880e4f;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📅 Supplier Registration</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Registered for a fixed period of <strong>1 to 3 years</strong>. Must apply afresh for renewal after expiry.</div>
      </div>
      <div style="background:white;border-left:4px solid #27ae60;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Bid Security Exemptions</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Startups, MSMEs, GeM Registered Bidders, &gt;₹500 Cr turnover (3 FYs), GeM Vendor Assessed, BIS Certified product suppliers.</div>
      </div>
      <div style="background:white;border-left:4px solid #e67e22;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">👤 Single Tender (Nomination)</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Allowed <strong>only</strong> if: (1) Only one firm makes the product, (2) Emergency situation, or (3) Standardization from a selected firm.</div>
      </div>
      <div style="background:white;border-left:4px solid #0d47a1;border-radius:8px;padding:12px 14px">
        <div style="font-size:11px;font-weight:900;color:#0d47a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🚗 GeM Automobile Exemption</div>
        <div style="font-size:13px;color:#333;line-height:1.8">Automobiles procured through GeM are permitted as <strong>direct purchases up to L1 rules without any financial ceiling limit</strong>.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#006064,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔟 Two-Bid System vs. Two-Stage Bidding — Know the Difference
  </div>
  <div style="border:2px solid #80deea;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr>
          <th style="padding:10px 16px;background:#b2ebf2;font-size:12px;color:#006064;font-weight:900;text-align:center;border-right:2px solid #80deea;border-bottom:2px solid #80deea;width:50%">📂 TWO-BID SYSTEM<br><span style="font-size:11px;font-weight:600;opacity:0.8">For complex / technical machinery</span></th>
          <th style="padding:10px 16px;background:#e0f2f1;font-size:12px;color:#004d40;font-weight:900;text-align:center;border-bottom:2px solid #80deea">🔄 TWO-STAGE BIDDING<br><span style="font-size:11px;font-weight:600;opacity:0.8">For evolving requirements — Rule 164</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:14px 16px;background:#e0f7fa;border-right:2px solid #80deea;vertical-align:top">
            <ol style="margin:0;padding-left:20px;line-height:2.2;font-size:13px;color:#006064">
              <li><strong>Submission:</strong> Technical and Financial bids received <em>simultaneously</em> — sealed in separate envelopes inside one outer envelope.</li>
              <li><strong>Stage 1 Opening:</strong> Open and evaluate <u>only</u> the Technical bids first.</li>
              <li><strong>Stage 2 Opening:</strong> Open Financial bids of <u>only</u> the technically qualified offers for final ranking and award.</li>
            </ol>
          </td>
          <td style="padding:14px 16px;background:#e8f5e9;vertical-align:top">
            <ol style="margin:0;padding-left:20px;line-height:2.2;font-size:13px;color:#1b5e20">
              <li><strong>Stage 1:</strong> Invite bids via advertised tender containing <u>only</u> technical aspects — <strong>no bid price asked</strong>.</li>
              <li><strong>Evaluation:</strong> Committee evaluates first-stage bids and refines the requirements.</li>
              <li><strong>Stage 2:</strong> Invite all non-rejected bidders to submit a <em>final bid with prices</em> based on the revised specs.</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 16px;background:#006064;color:white;font-size:12.5px;font-weight:700;border-right:2px solid #80deea">
            💡 Use when specs are KNOWN but evaluation must be done in 2 phases
          </td>
          <td style="padding:10px 16px;background:#1b5e20;color:white;font-size:12.5px;font-weight:700">
            💡 Use when specs are NOT FULLY KNOWN and may evolve after seeing vendor capabilities
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,

        // ─── PRACTICAL EXAMPLE ─────────────────────────────────────────────────
        practical_example: `
<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">⚙️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 1 · Two-Stage Bidding (Rule 164)</div>
      <div style="font-size:14px;font-weight:900">Procuring Sophisticated Sorting Machinery with Uncertain Specifications</div>
    </div>
  </div>
  <div style="border:2px solid #a5d6a7;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#e8f5e9;border-right:1px solid #a5d6a7">
        <div style="font-size:10px;font-weight:800;color:#1b5e20;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">The Division Office needs <strong>highly sophisticated sorting machinery</strong> where the exact technical specifications might need adjustment after seeing what vendors can offer.</div>
      </div>
      <div style="padding:14px 16px;background:#e3f2fd;border-right:1px solid #a5d6a7">
        <div style="font-size:10px;font-weight:800;color:#0d47a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">🔍 Why Two-Stage?</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Specs are not fixed in advance. The department needs to <strong>learn from vendor proposals first</strong>, refine requirements, and then get final price bids on the improved specs.</div>
      </div>
      <div style="padding:14px 16px;background:#fff8e1">
        <div style="font-size:10px;font-weight:800;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Correct Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">Use <strong>Two-Stage Bidding:</strong><br>① Invite technical bids without prices<br>② Evaluate &amp; refine specs<br>③ Ask shortlisted bidders for final price bids.</div>
      </div>
    </div>
    <div style="padding:10px 16px;background:#f1f8e9;border-top:1px solid #a5d6a7;font-size:12.5px;color:#1b5e20;font-weight:700">
      ⚠️ Contrast: If specifications were already fully known, the <strong>Two-Bid System</strong> would be used instead — both envelopes submitted together.
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#7b0000,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">⏰</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario 2 · Late Bid Rejection</div>
      <div style="font-size:14px;font-weight:900">Supplier Submits Bid Two Hours After the Official Deadline</div>
    </div>
  </div>
  <div style="border:2px solid #ef9a9a;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <div style="padding:14px 16px;background:#ffebee;border-right:1px solid #ef9a9a">
        <div style="font-size:10px;font-weight:800;color:#7b0000;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📋 Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.7">A supplier submits their bid for an Advertised Tender Enquiry <strong>two hours after the official deadline</strong>, claiming they were held up in traffic.</div>
      </div>
      <div style="padding:14px 16px;background:#fff3e0;border-right:1px solid #ef9a9a">
        <div style="font-size:10px;font-weight:800;color:#e65100;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">📜 The Rule</div>
        <div style="font-size:13px;color:#222;line-height:1.7">For Advertised or Limited Tender Enquiries, late bids received <strong>after the specified date and time</strong> must <u>not be considered under any circumstances</u>.</div>
      </div>
      <div style="padding:14px 16px;background:#f3e5f5">
        <div style="font-size:10px;font-weight:800;color:#6a1b9a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">✅ Correct Action</div>
        <div style="font-size:13px;color:#222;line-height:1.7">The bid must be <strong>rejected immediately</strong> — no exceptions, no discretion, regardless of the reason given by the supplier.</div>
      </div>
    </div>
    <div style="padding:10px 16px;background:#7b0000;color:white;border-top:1px solid #ef9a9a;font-size:12.5px;font-weight:700">
      🚫 There is NO provision to accept a late bid in an ATE or LTE — even if the reason appears genuine.
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
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔥 <strong>No GTE (Global Tender Enquiry) is permitted for procurements up to</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2">₹200 Crores (Rule 161)</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">🔁 <em>"Bid Security is automatically adjusted against Performance Security after award"</em></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>FALSE.</strong> Bid Security is refunded <u>only after</u> receipt of Performance Security — not automatically adjusted unless specifically stated.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">⚠️ <strong>Minimum time for bid submission in an Advertised Tender (domestic)</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>3 weeks</strong> (increases to 4 weeks if bids from abroad are sought)</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>A firm quoting NIL charges — how must the bid be treated?</strong></td>
        <td style="padding:10px 14px;font-size:13px;font-weight:800;color:#c62828;border-bottom:1px solid #ffcdd2">Bid must be treated as <strong>UNRESPONSIVE</strong> and must not be considered.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">📌 <strong>Annual Procurement Plans must be projected on GeM within</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828;border-bottom:1px solid #ffcdd2"><strong>30 days</strong> of Budget approval</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="padding:10px 14px;font-size:13px;border-right:1px solid #ef9a9a">📌 <strong>Bid securities of unsuccessful bidders must be returned latest by</strong></td>
        <td style="padding:10px 14px;font-size:15px;font-weight:900;color:#c62828">The <strong>30th day</strong> after contract award</td>
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
          <span style="display:inline-block;background:#c0392b;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Advertised Tender Enquiry</span><br>
          Used for procurement of <strong>₹50 Lakhs and above</strong>.<br>
          Requires <strong>wide publication</strong> on CPPP. Minimum <strong>3 weeks</strong> for submission.<br>
          <span style="font-size:12px;color:#555">Open to all eligible bidders.</span>
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3f8ff;border-bottom:1px solid #e3f2fd;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#1565c0;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Limited Tender Enquiry</span><br>
          Used for procurements <strong>up to ₹50 Lakhs</strong>.<br>
          Directly sent to <strong>more than 3 eligible suppliers</strong>.<br>
          <span style="font-size:12px;color:#555">No open publication required.</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 14px;font-size:13px;background:#fff;border-right:1px solid #90caf9;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#0d47a1;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Bid Security (Earnest Money)</span><br>
          <strong>2–5%</strong> of estimated value.<br>
          Valid for <strong>45 days</strong> beyond bid validity.<br>
          <span style="font-size:12px;color:#555">Ensures bidder honours their quote. Refunded AFTER Performance Security is received.</span>
        </td>
        <td style="padding:12px 14px;text-align:center;font-weight:900;color:#bbb;font-size:18px;background:#f5f5f5;border-right:1px solid #90caf9">vs.</td>
        <td style="padding:12px 14px;font-size:13px;background:#f3f8ff;vertical-align:top;line-height:1.85">
          <span style="display:inline-block;background:#1565c0;color:white;padding:2px 10px;border-radius:20px;font-weight:900;font-size:12px;margin-bottom:6px">Performance Security</span><br>
          <strong>3–5%</strong> of contract value.<br>
          Valid for <strong>60 days</strong> beyond all obligations + warranty.<br>
          <span style="font-size:12px;color:#555">Ensures successful bidder fulfills the actual contract.</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#1b3a1b,#2e7d32);color:white;padding:16px 20px;border-radius:12px;margin-bottom:20px">
  <div style="font-size:11px;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;margin-bottom:12px">📌 Ultra-Revision — 60-Second Flash Points</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Library books excluded from definition of</span><br>
      <strong style="font-size:15px">"Goods" under GFR Rule 143</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Annual Procurement Plans on GeM within</span><br>
      <strong style="font-size:16px">30 days</strong> of Budget approval
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Bid securities of unsuccessful bidders returned by</span><br>
      <strong style="font-size:16px">30th day</strong> after contract award
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">LPC handles purchases from ₹50,000 up to</span><br>
      <strong style="font-size:16px">₹5,00,000</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Old items can be traded in when buying new under</span><br>
      <strong style="font-size:16px">Buy-Back Offer</strong> rule
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Electrical appliances must carry BEE Star Rating of</span><br>
      <strong style="font-size:16px">Notified threshold or higher</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Min. suppliers for Limited Tender Enquiry</span><br>
      <strong style="font-size:16px">More than 3</strong> firms
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">GTE prohibited for procurements up to</span><br>
      <strong style="font-size:16px">₹200 Crores</strong> (Rule 161)
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
