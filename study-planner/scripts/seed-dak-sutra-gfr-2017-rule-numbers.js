
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
        title: "GFR 2017 — ULTRA MEMORY GUIDE: All Important Rule Numbers of Chapter 2 & 6 (Serial Order)",
        rule_number: "Chapter 2 (Rules 18–41) & Chapter 6 (Rules 143–205)",
        act_name: "General Financial Rules, 2017",
        category: "Explanation",
        effective_date: new Date("2017-03-07"),
        exam_tags: ["LDCE IP", "PS Group B"],

        // ─── OFFICIAL PROVISION ────────────────────────────────────────────────
        official_text: `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0c2461,#1e3799);color:white;padding:16px 22px;border-radius:14px 14px 0 0;display:flex;align-items:center;gap:14px">
    <span style="font-size:30px">🗂️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;opacity:0.75">Ultra Memory Guide · General Financial Rules, 2017</div>
      <div style="font-size:18px;font-weight:900;margin-top:4px">Complete Serial Rule Number Reference — Chapter 2 &amp; Chapter 6</div>
      <div style="font-size:12px;opacity:0.8;margin-top:3px">Every important rule, in order, with its one-line meaning. Memorise this table = Exam ready.</div>
    </div>
  </div>
  <div style="border:2px solid #c7d3f0;border-top:none;border-radius:0 0 14px 14px;background:#f0f4ff;padding:12px 18px">
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <span style="background:#0c2461;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📘 Chapter 2: Rules 18 → 41</span>
      <span style="background:#1b5e20;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📗 Chapter 6A: Rules 143 → 176 (Goods)</span>
      <span style="background:#880e4f;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📕 Chapter 6B: Rules 177 → 196 (Consulting)</span>
      <span style="background:#e65100;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📙 Chapter 6C: Rules 197 → 205 (Non-Consulting)</span>
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0c2461,#1565c0);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📘</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 2</div>
      <div style="font-size:15px;font-weight:900">General System of Financial Management (Rules 18 to 41)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #90caf9;border-top:none">
    <thead>
      <tr style="background:#e3f2fd">
        <th style="padding:9px 14px;font-size:12px;color:#0c2461;font-weight:900;text-align:center;border-right:2px solid #90caf9;border-bottom:2px solid #90caf9;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#0c2461;font-weight:900;text-align:left;border-right:2px solid #90caf9;border-bottom:2px solid #90caf9;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#0c2461;font-weight:900;text-align:left;border-bottom:2px solid #90caf9">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#1565c0;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">18</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0c2461;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Remission of Revenue</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">No revenue claim can be remitted or abandoned <strong>without the sanction of the competent authority</strong>.</td>
      </tr>
      <tr style="background:#f3f8ff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#1565c0;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">19</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0c2461;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Annual Revenue Remission Statement</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">Departments submit an annual statement to the Audit &amp; Accounts Officer on <strong>1st of June</strong>. Individual remissions below <strong>₹1,000</strong> are excluded.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#0d47a1;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">21</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0c2461;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Standards of Financial Propriety</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">Every officer must ensure expenditure is <strong>not prima-facie more than the occasion demands</strong> — guided by the highest standards of propriety.</td>
      </tr>
      <tr style="background:#f3f8ff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#283593;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">23</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0c2461;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Delegation of Financial Powers</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">Financial powers <strong>not delegated</strong> to subordinates vest <strong>exclusively in the Finance Ministry</strong>.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#283593;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">24</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0c2461;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Consultation with Financial Adviser</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">Before incurring any expenditure, Departments <strong>must consult their Financial Adviser</strong>.</td>
      </tr>
      <tr style="background:#f3f8ff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#b71c1c;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">28</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#b71c1c;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Previous Consent of Finance Ministry</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7"><strong>Prior Finance Ministry consent mandatory</strong> for granting land, assigning revenue, concession/lease of mineral/forest rights, water/power rights, or any relinquishment of revenue.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#1b5e20;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">29</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Communication of Sanctions to Audit</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">All sanctions go to Audit — <strong>except 7 categories</strong>: Advances, Establishment (Appointment/Promotion/Transfer), Posts (Creation/Continuation/Abolition), Charge handover, GPF withdrawals, Contingency, and Routine sanctions.</td>
      </tr>
      <tr style="background:#f3f8ff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">
          <span style="background:#c62828;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">33</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#c62828;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd">Losses and Defalcations</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">Any loss of public money/property must be reported to the next higher authority immediately. Petty losses <strong>up to ₹10,000</strong> exempt. Losses exceeding <strong>₹50,000</strong> (fire/theft/fraud) → Police investigation mandatory.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9">
          <span style="background:#212121;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">41</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#212121;border-right:1px solid #90caf9">Handling of Secret/Top Secret Files by Audit</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;line-height:1.7">Secret/Top Secret files must be sent <strong>personally</strong> to the <strong>Head of the Audit Office</strong>. They are NOT exempt from audit — only the delivery method is different.</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📗</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 6, Part A</div>
      <div style="font-size:15px;font-weight:900">Procurement of Goods (Rules 143 to 176)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #a5d6a7;border-top:none">
    <thead>
      <tr style="background:#e8f5e9">
        <th style="padding:9px 14px;font-size:12px;color:#1b5e20;font-weight:900;text-align:center;border-right:2px solid #a5d6a7;border-bottom:2px solid #a5d6a7;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#1b5e20;font-weight:900;text-align:left;border-right:2px solid #a5d6a7;border-bottom:2px solid #a5d6a7;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#1b5e20;font-weight:900;text-align:left;border-bottom:2px solid #a5d6a7">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#1b5e20;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">143</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Definition of Goods</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">Goods = all tangible/intangible products including software, IP, services, transportation, installation, training. <strong>Excludes</strong> library books/periodicals.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#2e7d32;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">144</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Fundamental Principles of Procurement</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">Description must be <strong>Objective, Functional, Generic, Measurable (O-F-G-M)</strong>. Must NOT indicate a brand/trademark name.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#388e3c;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">147</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Purchase without Quotation</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">Purchases <strong>up to ₹50,000</strong> per occasion (for items not on GeM) can be made without any formal quotation.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#388e3c;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">148</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Local Purchase Committee (LPC)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">For purchases <strong>₹50,001 to ₹5,00,000</strong> — a <strong>3-member committee</strong> is constituted to handle local purchases.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#43a047;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">149</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Limited Tender Enquiry (LTE)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">For procurement <strong>up to ₹50 Lakhs</strong>. Tender sent directly to <strong>more than 3</strong> eligible suppliers. No open advertisement needed.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#43a047;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">150</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1b5e20;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Advertised Tender Enquiry (ATE)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">For procurement <strong>₹50 Lakhs and above</strong>. Must be published openly. Minimum <strong>3 weeks</strong> (4 weeks if foreign bidders) for submission.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#c62828;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">151</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#c62828;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Debarment from Bidding</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">Corruption/BNS guilty → debarred <strong>up to 3 years</strong>. Code of Integrity breach → debarred <strong>up to 2 years</strong>.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#0d47a1;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">155</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0d47a1;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Two-Bid System</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">For complex/technical goods — Technical &amp; Financial bids submitted <em>together</em> in separate sealed envelopes. Technical opened first; Financial opened only for qualified bidders.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#0d47a1;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">156</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0d47a1;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Single Tender Enquiry (STE)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">Buy from one source <strong>only if</strong>: (1) Sole manufacturer, (2) Emergency, or (3) Standardization requirement.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#6a1b9a;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">159</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#6a1b9a;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Mandatory E-Publishing (CPPP)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">All tender enquiries, corrigenda, and bid awards must be <strong>published on CPPP</strong> (eprocure.gov.in) — mandatory for all Ministries, departments, and autonomous bodies.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#6a1b9a;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">160</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#6a1b9a;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Mandatory E-Procurement</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">All bids must be <strong>received electronically</strong> via NIC's portal or any other approved service provider. No offline/manual bid reception permitted.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#c62828;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">161</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#c62828;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Global Tender Enquiry (GTE) — Restriction</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7"><strong>No GTE permitted</strong> for procurements <strong>up to ₹200 Crores</strong>. GTE only allowed beyond ₹200 Cr with special approval.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#006064;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">164</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#006064;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Two-Stage Bidding</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">For evolving requirements — Stage 1: technical bids only (<strong>no price</strong>). Stage 2: shortlisted bidders submit final bids with prices based on revised specs.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#e65100;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">166</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#e65100;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Proprietary Article Certificate</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">When procuring a proprietary article (one made by a single manufacturer), the competent authority must certify that the item is <strong>uniquely available from that source only</strong>.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#f57f17;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">173</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#e65100;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Energy Efficient Appliances (BEE)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7">All electrical appliances procured must carry the <strong>notified threshold or higher BEE Star Rating</strong>. Lower-rated appliances cannot be procured.</td>
      </tr>
      <tr style="background:#f1fff1">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7;border-bottom:1px solid #e8f5e9"><span style="background:#1565c0;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">175</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#1565c0;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9">Bid Security (Earnest Money Deposit)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e8f5e9;line-height:1.7"><strong>2% to 5%</strong> of estimated value. Valid for <strong>45 days</strong> beyond bid validity. Refunded to unsuccessful bidders by the <strong>30th day</strong> after contract award.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #a5d6a7"><span style="background:#0d47a1;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">176</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0d47a1;border-right:1px solid #a5d6a7">Performance Security</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;line-height:1.7"><strong>3% to 5%</strong> of contract value (revised w.e.f 01.01.2024). Valid for <strong>60 days</strong> beyond completion of all obligations including warranty.</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#880e4f,#c2185b);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📕</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 6, Part B</div>
      <div style="font-size:15px;font-weight:900">Procurement of Consulting Services (Rules 177 to 196)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #f48fb1;border-top:none">
    <thead>
      <tr style="background:#fce4ec">
        <th style="padding:9px 14px;font-size:12px;color:#880e4f;font-weight:900;text-align:center;border-right:2px solid #f48fb1;border-bottom:2px solid #f48fb1;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#880e4f;font-weight:900;text-align:left;border-right:2px solid #f48fb1;border-bottom:2px solid #f48fb1;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#880e4f;font-weight:900;text-align:left;border-bottom:2px solid #f48fb1">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #f48fb1;border-bottom:1px solid #fce4ec"><span style="background:#880e4f;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">177</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#880e4f;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Definition of Consulting Services</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #fce4ec;line-height:1.7">Professional, intellectual, training &amp; advisory services. <strong>Does NOT include</strong> direct engagement of retired Government servants.</td>
      </tr>
      <tr style="background:#fff8fa">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #f48fb1;border-bottom:1px solid #fce4ec"><span style="background:#ad1457;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">183</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#880e4f;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Quality &amp; Cost Based Selection (QCBS)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #fce4ec;line-height:1.7">Final score = Technical (up to 80%) + Financial (min 20%). Default split: <strong>70:30</strong>. Technical weightage must <strong>never exceed 80%</strong>.</td>
      </tr>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #f48fb1;border-bottom:1px solid #fce4ec"><span style="background:#c2185b;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">185</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#880e4f;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec">Terms of Reference (TOR)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #fce4ec;line-height:1.7">TOR must contain 5 elements in order: <strong>Objective → Tasks → Timeline → Support → Deliverables</strong> (Mnemonic: <em>O-T-T-S-D</em>).</td>
      </tr>
      <tr style="background:#fff8fa">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #f48fb1"><span style="background:#c2185b;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">193</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#880e4f;border-right:1px solid #f48fb1">Least Cost System (LCS)</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;line-height:1.7"><strong>Zero weightage</strong> for technical score after qualifying. The responsive, technically qualified proposal with the <strong>lowest evaluated cost</strong> wins.</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#e65100,#f57c00);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📙</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 6, Part C</div>
      <div style="font-size:15px;font-weight:900">Procurement of Non-Consulting Services (Rules 197 to 205)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #ffcc80;border-top:none">
    <thead>
      <tr style="background:#fff8e1">
        <th style="padding:9px 14px;font-size:12px;color:#e65100;font-weight:900;text-align:center;border-right:2px solid #ffcc80;border-bottom:2px solid #ffcc80;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#e65100;font-weight:900;text-align:left;border-right:2px solid #ffcc80;border-bottom:2px solid #ffcc80;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#e65100;font-weight:900;text-align:left;border-bottom:2px solid #ffcc80">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #ffcc80;border-bottom:1px solid #fff8e1"><span style="background:#e65100;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">197</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#e65100;border-right:1px solid #ffcc80;border-bottom:1px solid #fff8e1">Definition of Non-Consulting Services</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #fff8e1;line-height:1.7">Services with <strong>physical, measurable deliverables</strong> — security, maintenance, cleaning, vehicle hire, facilities management.</td>
      </tr>
      <tr style="background:#fffbf2">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #ffcc80"><span style="background:#f57c00;color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">198–205</span></td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#e65100;border-right:1px solid #ffcc80">Outsourcing / Non-Consulting Procurement</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;line-height:1.7">Rules for hiring non-consulting services. If a situation is <strong>not covered</strong> here, departments must refer to the <strong>Rules for Goods (135–176)</strong>, not Consulting rules.</td>
      </tr>
    </tbody>
  </table>
</div>`,

        // ─── DAK GURU EXPLANATION ───────────────────────────────────────────────
        guru_explanation: `
<div style="margin-bottom:26px">
  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🧠 The Master Memory System — Chapter 2 &amp; Chapter 6 Clusters
  </div>
  <div style="border:2px solid #9fa8da;border-top:none;border-radius:0 0 10px 10px;padding:18px;background:#e8eaf6">
    <p style="margin:0 0 16px 0;font-size:13.5px;color:#1a237e;font-weight:700;line-height:1.8">Group rules into themes. Learn the theme → the numbers follow naturally.</p>

    <div style="margin-bottom:18px">
      <div style="background:#0c2461;color:white;padding:10px 16px;border-radius:8px 8px 0 0;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase">📘 CHAPTER 2 — 9 Rules to Know (18 → 41)</div>
      <div style="border:2px solid #9fa8da;border-top:none;border-radius:0 0 8px 8px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#fff">
            <td style="padding:10px 14px;width:130px;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6;text-align:center"><span style="background:#1565c0;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">18 · 19</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1a237e;border-bottom:1px solid #e8eaf6"><strong>💸 Revenue Rules</strong> — Remission &amp; Annual June Statement. Remember: <em>"18-19 = Two rules for Revenue"</em></td>
          </tr>
          <tr style="background:#f3f4ff">
            <td style="padding:10px 14px;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6;text-align:center"><span style="background:#0d47a1;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">21</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1a237e;border-bottom:1px solid #e8eaf6"><strong>⚖️ Propriety Rule</strong> — Rule 21 = 21-gun salute to good spending! "Don't spend more than needed."</td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6;text-align:center"><span style="background:#283593;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">23 · 24</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1a237e;border-bottom:1px solid #e8eaf6"><strong>📋 Delegation Duo</strong> — 23 = Powers vest in Finance Ministry if not delegated; 24 = Consult Financial Adviser. <em>"23 and 24 work together like a door and its frame."</em></td>
          </tr>
          <tr style="background:#f3f4ff">
            <td style="padding:10px 14px;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6;text-align:center"><span style="background:#b71c1c;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">28</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1a237e;border-bottom:1px solid #e8eaf6"><strong>🔑 Consent Rule</strong> — 28 = "Wait 28 days... actually WAIT — ask Finance Ministry FIRST." Land, Revenue, Rights → prior consent needed.</td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6;text-align:center"><span style="background:#1b5e20;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">29</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1a237e;border-bottom:1px solid #e8eaf6"><strong>📊 Audit Rule</strong> — 29 = "29 sanctions go to Audit... but not GPF, transfers, posts, advances!" The 7-exemption rule.</td>
          </tr>
          <tr style="background:#f3f4ff">
            <td style="padding:10px 14px;border-right:1px solid #9fa8da;border-bottom:1px solid #e8eaf6;text-align:center"><span style="background:#c62828;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">33</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1a237e;border-bottom:1px solid #e8eaf6"><strong>🚨 Losses Rule</strong> — Rule 33 = "33% of losses need police!" (losses &gt;₹50K due to fraud/fire/theft). Petty losses ≤₹10K: no report needed.</td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #9fa8da;text-align:center"><span style="background:#212121;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">41</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1a237e"><strong>🔒 Secret Rule</strong> — Rule 41 = "41 secrets go personally to the Audit Head." <em>Not exempt — just delivered differently.</em></td>
          </tr>
        </table>
      </div>
    </div>

    <div style="margin-bottom:18px">
      <div style="background:#1b5e20;color:white;padding:10px 16px;border-radius:8px 8px 0 0;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase">📗 CHAPTER 6A — GOODS RULES (143 → 176): The "Buying Ladder"</div>
      <div style="border:2px solid #a5d6a7;border-top:none;border-radius:0 0 8px 8px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#fff">
            <td style="padding:10px 14px;width:130px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#1b5e20;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">143 · 144</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>📖 Define &amp; Guide</strong> — 143 = "What are Goods?" (143 items defined!). 144 = "Four Principles: O-F-G-M". <em>They always come first.</em></td>
          </tr>
          <tr style="background:#f1fff1">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#388e3c;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">147→150</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>🪜 The Buying Ladder</strong> (value increases with each rule):<br><span style="font-family:monospace;font-size:12px">147=No Quote(≤50K) → 148=LPC(50K-5L) → 149=LTE(≤50L) → 150=ATE(50L+)</span></td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#c62828;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">151</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>🚫 Debarment</strong> — "151 = 1 rule, 5 letters (DEBAR), 1 decision." Corruption=3yr, Integrity=2yr.</td>
          </tr>
          <tr style="background:#f1fff1">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#0d47a1;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">155 · 156</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>📂 Bid Methods</strong> — 155 = Two-Bid (both submitted together); 156 = Single Tender (only 3 valid grounds). <em>"155 splits; 156 singles."</em></td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#6a1b9a;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">159·160·161</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>🖥️ Digital Trio</strong> — "P-R-B": <strong>P</strong>ublish(159=CPPP), <strong>R</strong>eceive(160=NIC), <strong>B</strong>an GTE(161=₹200Cr). Three consecutive rules, three digital mandates.</td>
          </tr>
          <tr style="background:#f1fff1">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#006064;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">164</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>🔄 Two-Stage</strong> — "164 = 1 tender, 6 weeks apart, 4 shortlisted." Stage 1 = no price; Stage 2 = price. Used when specs are unclear.</td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#e65100;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">166</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>📜 Proprietary Certificate</strong> — Rule 166 = one source, one certificate. Certify that only this manufacturer makes this product.</td>
          </tr>
          <tr style="background:#f1fff1">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;border-bottom:1px solid #e8f5e9;text-align:center"><span style="background:#f57f17;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">173</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20;border-bottom:1px solid #e8f5e9"><strong>⚡ BEE Star</strong> — "173 = 1 star minimum, 7 categories of appliances, 3-digit rule." Always buy the notified threshold or higher BEE Star Rating.</td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #a5d6a7;text-align:center"><span style="background:#1565c0;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">175 · 176</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#1b5e20"><strong>🔐 Security Pair</strong> — "B comes before P" → <strong>175</strong>=<strong>B</strong>id Security(2-5%, 45 days); <strong>176</strong>=<strong>P</strong>erformance Security(3-5%, 60 days). One letter apart; one rule apart.</td>
          </tr>
        </table>
      </div>
    </div>

    <div style="margin-bottom:18px">
      <div style="background:#880e4f;color:white;padding:10px 16px;border-radius:8px 8px 0 0;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase">📕 CHAPTER 6B — CONSULTING (177 → 193): The "D-S-T-C" Sequence</div>
      <div style="border:2px solid #f48fb1;border-top:none;border-radius:0 0 8px 8px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#fff">
            <td style="padding:10px 14px;width:130px;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec;text-align:center"><span style="background:#880e4f;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">177</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#880e4f;border-bottom:1px solid #fce4ec"><strong>📖 Define</strong> — 177 = "1 definition, 7 types of consulting work." Intellectual, training, advisory. Not retired Govt. servants.</td>
          </tr>
          <tr style="background:#fff8fa">
            <td style="padding:10px 14px;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec;text-align:center"><span style="background:#ad1457;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">183</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#880e4f;border-bottom:1px solid #fce4ec"><strong>⚖️ Score (QCBS)</strong> — 183 = "1 formula: 8 parts Technical, 3 parts Financial... wait, that's 80:30... no — 70:30 default, max 80% technical." Default always 70:30.</td>
          </tr>
          <tr style="background:#fff">
            <td style="padding:10px 14px;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec;text-align:center"><span style="background:#c2185b;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">185</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#880e4f;border-bottom:1px solid #fce4ec"><strong>📝 Terms (TOR)</strong> — 185 = "1-8-5 = One Terms sheet with 5 elements: <strong>O·T·T·S·D</strong>" = Objective, Tasks, Timeline, Support, Deliverables.</td>
          </tr>
          <tr style="background:#fff8fa">
            <td style="padding:10px 14px;border-right:1px solid #f48fb1;text-align:center"><span style="background:#c2185b;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">193</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#880e4f"><strong>💰 Cheapest (LCS)</strong> — 193 = "1 winner, 9 losers, 3 criteria to qualify... but only cost decides!" Zero weightage for tech after qualifying.</td>
          </tr>
        </table>
      </div>
    </div>

    <div>
      <div style="background:#e65100;color:white;padding:10px 16px;border-radius:8px 8px 0 0;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase">📙 CHAPTER 6C — NON-CONSULTING (197 → 205): "Physical Work Rules"</div>
      <div style="border:2px solid #ffcc80;border-top:none;border-radius:0 0 8px 8px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#fff">
            <td style="padding:10px 14px;width:130px;border-right:1px solid #ffcc80;border-bottom:1px solid #fff8e1;text-align:center"><span style="background:#e65100;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">197</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#e65100;border-bottom:1px solid #fff8e1"><strong>📦 Define</strong> — 197 = "1 definition, 9 types, 7 examples of physical work." Security, cleaning, maintenance, vehicle hire.</td>
          </tr>
          <tr style="background:#fffbf2">
            <td style="padding:10px 14px;border-right:1px solid #ffcc80;text-align:center"><span style="background:#f57c00;color:white;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:900">198–205</span></td>
            <td style="padding:10px 14px;font-size:13px;color:#e65100"><strong>📋 Outsource</strong> — 8 rules (198 to 205) for hiring Non-Consulting services. Gap in rules? → Refer to Goods rules (135–176).</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#006064,#00838f);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🪜 The Buying Ladder — Visual Flowchart (Goods Procurement)
  </div>
  <div style="border:2px solid #80deea;border-top:none;border-radius:0 0 10px 10px;padding:20px;background:#e0f7fa">
    <div style="display:flex;align-items:stretch;gap:0;overflow-x:auto">
      <div style="background:linear-gradient(180deg,#1b5e20,#2e7d32);color:white;border-radius:10px;padding:14px 12px;text-align:center;min-width:110px;flex-shrink:0">
        <div style="font-size:22px;font-weight:900;margin-bottom:4px">147</div>
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">No Quotation</div>
        <div style="font-size:12px;opacity:0.9;line-height:1.6">Up to<br><strong>₹50,000</strong></div>
      </div>
      <div style="display:flex;align-items:center;padding:0 6px;color:#006064;font-size:22px;font-weight:900;flex-shrink:0">→</div>
      <div style="background:linear-gradient(180deg,#1565c0,#1976d2);color:white;border-radius:10px;padding:14px 12px;text-align:center;min-width:110px;flex-shrink:0">
        <div style="font-size:22px;font-weight:900;margin-bottom:4px">148</div>
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">LPC</div>
        <div style="font-size:12px;opacity:0.9;line-height:1.6">₹50K to<br><strong>₹5 Lakhs</strong></div>
      </div>
      <div style="display:flex;align-items:center;padding:0 6px;color:#006064;font-size:22px;font-weight:900;flex-shrink:0">→</div>
      <div style="background:linear-gradient(180deg,#e65100,#f57c00);color:white;border-radius:10px;padding:14px 12px;text-align:center;min-width:110px;flex-shrink:0">
        <div style="font-size:22px;font-weight:900;margin-bottom:4px">149</div>
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">LTE</div>
        <div style="font-size:12px;opacity:0.9;line-height:1.6">Up to<br><strong>₹50 Lakhs</strong></div>
      </div>
      <div style="display:flex;align-items:center;padding:0 6px;color:#006064;font-size:22px;font-weight:900;flex-shrink:0">→</div>
      <div style="background:linear-gradient(180deg,#b71c1c,#c62828);color:white;border-radius:10px;padding:14px 12px;text-align:center;min-width:110px;flex-shrink:0">
        <div style="font-size:22px;font-weight:900;margin-bottom:4px">150</div>
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">ATE</div>
        <div style="font-size:12px;opacity:0.9;line-height:1.6">₹50 Lakhs<br><strong>&amp; above</strong></div>
      </div>
    </div>
    <div style="margin-top:14px;background:#006064;color:white;padding:10px 14px;border-radius:8px;font-size:12.5px;font-weight:700">
      💡 Memory Trick: <strong>"No Committee Limited Advertised"</strong> = N·C·L·A = Rules 147·148·149·150. Value goes UP, rules go UP.
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#4a148c,#7b1fa2);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔢 The Digital Trio — Rules 159, 160, 161 (P·R·B)
  </div>
  <div style="border:2px solid #ce93d8;border-top:none;border-radius:0 0 10px 10px;padding:18px;background:#f3e5f5">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:14px">
      <div style="background:white;border:2px solid #ce93d8;border-top:5px solid #6a1b9a;border-radius:10px;padding:16px;text-align:center">
        <div style="font-size:32px;font-weight:900;color:#6a1b9a;margin-bottom:6px">159</div>
        <div style="font-size:14px;font-weight:900;color:#4a148c;margin-bottom:8px">📢 PUBLISH</div>
        <div style="font-size:12.5px;color:#555;line-height:1.7">Tender notices, corrigenda &amp; bid awards on <strong>CPPP</strong> (eprocure.gov.in)</div>
      </div>
      <div style="background:white;border:2px solid #ce93d8;border-top:5px solid #7b1fa2;border-radius:10px;padding:16px;text-align:center">
        <div style="font-size:32px;font-weight:900;color:#7b1fa2;margin-bottom:6px">160</div>
        <div style="font-size:14px;font-weight:900;color:#4a148c;margin-bottom:8px">📩 RECEIVE</div>
        <div style="font-size:12.5px;color:#555;line-height:1.7">All bids received via e-procurement — <strong>NIC or approved provider</strong>. No manual/offline bids.</div>
      </div>
      <div style="background:white;border:2px solid #ce93d8;border-top:5px solid #c62828;border-radius:10px;padding:16px;text-align:center">
        <div style="font-size:32px;font-weight:900;color:#c62828;margin-bottom:6px">161</div>
        <div style="font-size:14px;font-weight:900;color:#c62828;margin-bottom:8px">🚫 BAN GTE</div>
        <div style="font-size:12.5px;color:#555;line-height:1.7">No Global Tender Enquiry for procurements <strong>up to ₹200 Crores</strong>.</div>
      </div>
    </div>
    <div style="background:#4a148c;color:white;padding:10px 14px;border-radius:8px;font-size:12.5px;font-weight:700;text-align:center">
      🔑 Memory: <strong>P·R·B = Press Release Ban</strong> — Press(Publish) the Release(Receive) to Ban(GTE). Rules 159·160·161 — three consecutive, three mandates.
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#880e4f,#c2185b);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🆚 Two-Bid (155) vs. Two-Stage (164) — The Biggest Confusion Buster
  </div>
  <div style="border:2px solid #f48fb1;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#fce4ec">
          <th style="padding:10px 16px;font-size:12px;color:#880e4f;font-weight:900;text-align:center;border-right:2px solid #f48fb1;border-bottom:2px solid #f48fb1"></th>
          <th style="padding:10px 16px;font-size:12px;color:#880e4f;font-weight:900;text-align:center;border-right:2px solid #f48fb1;border-bottom:2px solid #f48fb1">📂 Rule 155 — TWO-BID SYSTEM</th>
          <th style="padding:10px 16px;font-size:12px;color:#006064;font-weight:900;text-align:center;border-bottom:2px solid #f48fb1">🔄 Rule 164 — TWO-STAGE BIDDING</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff">
          <td style="padding:9px 14px;font-size:12px;font-weight:800;color:#666;border-right:2px solid #f48fb1;border-bottom:1px solid #fce4ec">Use when</td>
          <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec;text-align:center">Specs are <strong>KNOWN &amp; FIXED</strong> (complex machinery)</td>
          <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #fce4ec;text-align:center">Specs are <strong>UNCLEAR / EVOLVING</strong></td>
        </tr>
        <tr style="background:#f9f9f9">
          <td style="padding:9px 14px;font-size:12px;font-weight:800;color:#666;border-right:2px solid #f48fb1;border-bottom:1px solid #fce4ec">Submission</td>
          <td style="padding:9px 14px;font-size:13px;color:#333;border-right:1px solid #f48fb1;border-bottom:1px solid #fce4ec;text-align:center">Tech + Finance bids submitted <strong>together</strong> (different envelopes)</td>
          <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #fce4ec;text-align:center">Stage 1 = Tech only (<strong>NO price</strong>); Stage 2 = Price bids on revised specs</td>
        </tr>
        <tr style="background:#fff">
          <td style="padding:9px 14px;font-size:12px;font-weight:800;color:#666;border-right:2px solid #f48fb1">Key difference</td>
          <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#880e4f;border-right:1px solid #f48fb1;text-align:center">Price IS submitted in Stage 1 (just sealed)</td>
          <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#006064;text-align:center">Price is NOT asked in Stage 1 at all</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,

        // ─── PRACTICAL EXAMPLE ─────────────────────────────────────────────────
        practical_example: `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    ⚡ Quick-Fire: Which Rule Applies? — Rule Identification Drill
  </div>
  <div style="border:2px solid #9fa8da;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#e8eaf6">
          <th style="padding:10px 14px;font-size:11px;font-weight:900;color:#1a237e;text-align:left;border-right:2px solid #9fa8da;border-bottom:2px solid #9fa8da;width:65%">📋 Situation / What is described?</th>
          <th style="padding:10px 14px;font-size:11px;font-weight:900;color:#1a237e;text-align:center;border-bottom:2px solid #9fa8da">✅ Rule Number</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Officer sanctions GPF advance — does he endorse to Audit?</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#1b5e20;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 29</span> (Exempt)</td></tr>
        <tr style="background:#f3f4ff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Ministry wants to grant mineral rights to a company</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#b71c1c;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 28</span></td></tr>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Office needs stationery worth ₹40,000 not available on GeM</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#388e3c;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 147</span></td></tr>
        <tr style="background:#f3f4ff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Purchase of furniture worth ₹2,50,000 (not on GeM)</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#1565c0;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 148</span> (LPC)</td></tr>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Procurement of vehicles worth ₹35 Lakhs</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#43a047;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 149</span> (LTE)</td></tr>
        <tr style="background:#f3f4ff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Construction equipment worth ₹75 Lakhs to be procured</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#43a047;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 150</span> (ATE)</td></tr>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Department needs a specific server only XYZ Corp makes</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#0d47a1;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 156</span> (STE)</td></tr>
        <tr style="background:#f3f4ff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Supplier found guilty under Prevention of Corruption Act</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#c62828;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 151</span></td></tr>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Tender notice to be published — which portal?</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#6a1b9a;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 159</span> (CPPP)</td></tr>
        <tr style="background:#f3f4ff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Department wants to invite global bids for ₹180 Crore project</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#c62828;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 161</span> ❌ BANNED</td></tr>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Hiring a consultant for logistics algorithm (₹40 Lakhs)</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#880e4f;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 177</span> + informal enquiry</td></tr>
        <tr style="background:#f3f4ff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Preparing TOR for a management consultant</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#c2185b;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 185</span> (5 elements)</td></tr>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Lowest-cost technically qualified proposal wins — which method?</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#c2185b;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 193</span> (LCS)</td></tr>
        <tr style="background:#f3f4ff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da;border-bottom:1px solid #e8eaf6">Procuring cleaning services for office (₹45 Lakhs)</td><td style="padding:9px 14px;text-align:center;border-bottom:1px solid #e8eaf6"><span style="background:#e65100;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 197</span> + LTE</td></tr>
        <tr style="background:#fff"><td style="padding:9px 14px;font-size:13px;border-right:2px solid #9fa8da">Secret file to be sent for Audit — procedure?</td><td style="padding:9px 14px;text-align:center"><span style="background:#212121;color:white;padding:3px 12px;border-radius:20px;font-weight:900;font-size:14px">Rule 41</span> (personal delivery)</td></tr>
      </tbody>
    </table>
  </div>
</div>`,

        // ─── EXAM INSIGHT ──────────────────────────────────────────────────────
        exam_insight: `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#7b0000,#c62828);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔥 Most Confused Rule Numbers — Exam Trap Table
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #ef9a9a;border-top:none">
    <thead>
      <tr style="background:#ffebee">
        <th style="padding:10px 14px;font-size:12px;color:#7b0000;font-weight:900;text-align:center;border-right:1px solid #ef9a9a;border-bottom:2px solid #ef9a9a;width:15%">Rules</th>
        <th style="padding:10px 14px;font-size:12px;color:#7b0000;font-weight:900;text-align:left;border-right:1px solid #ef9a9a;border-bottom:2px solid #ef9a9a;width:42%">⚠️ Common Wrong Belief</th>
        <th style="padding:10px 14px;font-size:12px;color:#7b0000;font-weight:900;text-align:left;border-bottom:2px solid #ef9a9a">✅ Correct Fact</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff"><td style="padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#c62828;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">155 vs 164</td><td style="padding:9px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">"Both are two-stage processes — same thing"</td><td style="padding:9px 14px;font-size:13px;border-bottom:1px solid #ffcdd2"><strong>155</strong> = Price IS submitted (sealed). <strong>164</strong> = Price NOT asked in Stage 1.</td></tr>
      <tr style="background:#fff8f8"><td style="padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#c62828;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">159 vs 160</td><td style="padding:9px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">"Both Rules publish tenders on CPPP"</td><td style="padding:9px 14px;font-size:13px;border-bottom:1px solid #ffcdd2"><strong>159</strong> = Publish on CPPP. <strong>160</strong> = Receive bids via NIC/approved providers (different mandate).</td></tr>
      <tr style="background:#fff"><td style="padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#c62828;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">175 vs 176</td><td style="padding:9px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">"Performance Security comes first — it's more important"</td><td style="padding:9px 14px;font-size:13px;border-bottom:1px solid #ffcdd2"><strong>175</strong> = Bid Security (comes FIRST); <strong>176</strong> = Performance Security. B before P, 175 before 176.</td></tr>
      <tr style="background:#fff8f8"><td style="padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#c62828;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">183 vs 193</td><td style="padding:9px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">"LCS and QCBS both use technical + financial scores"</td><td style="padding:9px 14px;font-size:13px;border-bottom:1px solid #ffcdd2"><strong>183 (QCBS)</strong> = blends both. <strong>193 (LCS)</strong> = zero weightage for tech after qualifying — pure cost.</td></tr>
      <tr style="background:#fff"><td style="padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#c62828;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">151 Debar</td><td style="padding:9px 14px;font-size:13px;border-right:1px solid #ef9a9a;border-bottom:1px solid #ffcdd2">"Corruption and integrity breach both get 3-year debarment"</td><td style="padding:9px 14px;font-size:13px;border-bottom:1px solid #ffcdd2">Corruption/BNS = up to <strong>3 years</strong>. Integrity breach = up to <strong>2 years</strong>. Different periods!</td></tr>
      <tr style="background:#fff8f8"><td style="padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#c62828;border-right:1px solid #ef9a9a"><strong>29</strong> Audit</td><td style="padding:9px 14px;font-size:13px;border-right:1px solid #ef9a9a">"All sanctions go to Audit — no exceptions"</td><td style="padding:9px 14px;font-size:13px">7 categories are exempt (GPF, transfers, promotions, posts, charge, contingency, routine).</td></tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0);color:white;padding:13px 18px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📌 One-Line Rule Number Mnemonics — Say It, Memorize It
  </div>
  <div style="border:2px solid #90caf9;border-top:none;border-radius:0 0 10px 10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead><tr style="background:#e3f2fd"><th style="padding:9px 14px;font-size:12px;color:#0d47a1;font-weight:900;border-right:2px solid #90caf9;border-bottom:2px solid #90caf9;width:12%">Rule</th><th style="padding:9px 14px;font-size:12px;color:#0d47a1;font-weight:900;border-bottom:2px solid #90caf9">Mnemonic / Memory Hook</th></tr></thead>
      <tbody>
        <tr style="background:#fff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">21</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"21-gun salute to proper spending — don't overspend, honour the rules."</em> → Financial Propriety</td></tr>
        <tr style="background:#f3f8ff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">28</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"28 = Land, Revenue &amp; Rights → Finance Ministry waits before you can give anything away."</em></td></tr>
        <tr style="background:#fff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">33</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"Loss at 33 — like a Test match batting collapse. Report it up immediately!"</em> → Rule for Losses</td></tr>
        <tr style="background:#f3f8ff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">143</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"1-4-3 = I Love Goods! Rule 143 = the love of defining everything that's a 'good'."</em></td></tr>
        <tr style="background:#fff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">147–150</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"N-C-L-A: No Committee Limited Advertised — as value climbs, so does the ladder."</em></td></tr>
        <tr style="background:#f3f8ff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">155 vs 164</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"155 = Sealed together, opened in order. 164 = Stage 1 has NO price — price comes later."</em></td></tr>
        <tr style="background:#fff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">159–161</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"P-R-B = Press Release Ban. Publish(159), Receive(160), Ban GTE(161)."</em></td></tr>
        <tr style="background:#f3f8ff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">175–176</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"B comes before P. Bid(175) before Performance(176). Pay the Bid deposit first, then show Performance."</em></td></tr>
        <tr style="background:#fff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd">185</td><td style="padding:8px 14px;font-size:13px;border-bottom:1px solid #e3f2fd;color:#333"><em>"1-8-5 = One Terms sheet, 8+5=13... forget the math: O·T·T·S·D — five elements, always."</em></td></tr>
        <tr style="background:#f3f8ff"><td style="padding:8px 14px;font-weight:900;color:#1565c0;text-align:center;font-size:15px;border-right:2px solid #90caf9">193</td><td style="padding:8px 14px;font-size:13px;color:#333"><em>"193 = 1 winner, only 1 criterion: COST. Least Cost System — pass the test, lowest price wins."</em></td></tr>
      </tbody>
    </table>
  </div>
</div>

<div style="background:linear-gradient(135deg,#0c2461,#1e3799);color:white;padding:18px 20px;border-radius:14px;margin-bottom:20px">
  <div style="font-size:12px;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;margin-bottom:14px">🏆 ULTRA-REVISION — All Key Rules at One Glance</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">18–19</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Revenue Remission + June Statement</div></div>
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">21</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Financial Propriety</div></div>
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">23–24</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Delegation + Fin. Adviser</div></div>
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">28</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Finance Ministry Consent</div></div>
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">29</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Sanctions to Audit (7 exempt)</div></div>
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">33</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Losses &amp; Defalcations</div></div>
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">41</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Secret Files → Audit Head</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">143</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Definition of Goods</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">144</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Principles — O·F·G·M</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">147</div><div style="opacity:0.8;font-size:11px;margin-top:2px">No Quotation ≤₹50K</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">148</div><div style="opacity:0.8;font-size:11px;margin-top:2px">LPC (₹50K–₹5L)</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">149</div><div style="opacity:0.8;font-size:11px;margin-top:2px">LTE ≤₹50 Lakhs</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">150</div><div style="opacity:0.8;font-size:11px;margin-top:2px">ATE ≥₹50 Lakhs</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">151</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Debarment (3yr/2yr)</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">155</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Two-Bid System</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">156</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Single Tender Enquiry</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">159</div><div style="opacity:0.8;font-size:11px;margin-top:2px">E-Publish on CPPP</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">160</div><div style="opacity:0.8;font-size:11px;margin-top:2px">E-Receive Bids</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">161</div><div style="opacity:0.8;font-size:11px;margin-top:2px">No GTE ≤₹200 Cr</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">164</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Two-Stage Bidding</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">166</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Proprietary Certificate</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">173</div><div style="opacity:0.8;font-size:11px;margin-top:2px">BEE Star Rating</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">175</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Bid Security 2–5%</div></div>
    <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">176</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Perf. Security 3–5%</div></div>
    <div style="background:rgba(255,255,255,0.2);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">177</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Consulting Defined</div></div>
    <div style="background:rgba(255,255,255,0.2);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">183</div><div style="opacity:0.8;font-size:11px;margin-top:2px">QCBS (70:30)</div></div>
    <div style="background:rgba(255,255,255,0.2);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">185</div><div style="opacity:0.8;font-size:11px;margin-top:2px">TOR — O·T·T·S·D</div></div>
    <div style="background:rgba(255,255,255,0.2);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">193</div><div style="opacity:0.8;font-size:11px;margin-top:2px">LCS — Lowest Cost</div></div>
    <div style="background:rgba(255,255,255,0.25);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">197</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Non-Consulting Defined</div></div>
    <div style="background:rgba(255,255,255,0.25);border-radius:8px;padding:10px 12px;font-size:12px;text-align:center"><div style="font-size:20px;font-weight:900">198–205</div><div style="opacity:0.8;font-size:11px;margin-top:2px">Outsourcing Rules</div></div>
  </div>
  <div style="margin-top:14px;background:rgba(255,255,255,0.15);border-radius:8px;padding:12px 16px;font-size:13px;font-weight:700;text-align:center">
    Total: <strong>9 rules</strong> from Chapter 2 · <strong>16 rules</strong> from Chapter 6A · <strong>4 rules</strong> from Chapter 6B · <strong>2 rule-blocks</strong> from Chapter 6C = <strong>31 rule numbers to master</strong>
  </div>
</div>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },
];

async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const collection = client.db().collection('daksutras');
        let inserted = 0, skipped = 0;
        for (const entry of entries) {
            const exists = await collection.findOne({ title: entry.title });
            if (exists) { console.log(`⏭️  Skipping: "${entry.title}"`); skipped++; }
            else { await collection.insertOne(entry); console.log(`✅ Inserted: "${entry.title}"`); inserted++; }
        }
        console.log(`\n📊 Summary: ${inserted} inserted, ${skipped} skipped`);
    } finally {
        await client.close();
        console.log('🔌 Connection closed');
    }
}
main().catch(err => { console.error('❌ Error:', err); process.exit(1); });
