
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

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA 1 — REMOTELY MANAGED FRANKING SYSTEM (RMFS) — COMPLETE GUIDE
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Remotely Managed Franking System (RMFS) — Complete Guide",
        rule_number: "Chapter 2 — PO Guide Part-I",
        act_name: "Post Office Guide Part-I",
        category: "Rule",
        effective_date: new Date("2024-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(21,101,192,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">🖨️ REMOTELY MANAGED FRANKING SYSTEM (RMFS)</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">India Post's Brand Name: <strong>Digifrank Plus</strong> &nbsp;|&nbsp; Chapter 2, Post Office Guide Part-I</p>
  </div>

  <!-- SECTION 1: LICENSING -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Licensing & Identification</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#2e7d32;color:#fff">
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:left;width:35%">Attribute</th>
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Licensing Authority</td><td style="border:1px solid #c8e6c9;padding:9px 14px"><strong>Head of Postal Division</strong>, Independent Gazetted Postmaster, or Directors of GPOs (Mumbai, Kolkata, New Delhi)</td></tr>
        <tr style="background:#f1f8e9"><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Validity</td><td style="border:1px solid #c8e6c9;padding:9px 14px"><strong>5 years</strong></td></tr>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Categories of License</td><td style="border:1px solid #c8e6c9;padding:9px 14px">(1) <strong>Individual</strong> &nbsp; (2) <strong>Commercial</strong> &nbsp; (3) <strong>Departmental</strong></td></tr>
        <tr style="background:#f1f8e9"><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Impression Colour</td><td style="border:1px solid #c8e6c9;padding:9px 14px">Must be <strong>Blue</strong> in colour</td></tr>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Impression Components</td><td style="border:1px solid #c8e6c9;padding:9px 14px">Consists of a <strong>Value Die</strong> and a <strong>License Die</strong></td></tr>
        <tr style="background:#f1f8e9"><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">CRN (Customer Reference Number)</td><td style="border:1px solid #c8e6c9;padding:9px 14px">A unique number issued by the Licensing Authority (same as the License Number)</td></tr>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">License Identifier</td><td style="border:1px solid #c8e6c9;padding:9px 14px">A unique machine number assigned by the OEM</td></tr>
        <tr style="background:#f1f8e9"><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Authorised OEMs</td><td style="border:1px solid #c8e6c9;padding:9px 14px">1. <strong>M/s Quadient</strong> (formerly Neopost) &nbsp;&nbsp; 2. <strong>M/s Pitney Bowes India Pvt. Ltd.</strong></td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 2: FEES & PROCESSING TIME -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">💰 2. License Fees & Processing Time</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Type</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:center">Fee</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Condition / Note</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">New License</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-size:1.05rem;color:#bf360c;font-weight:bold">Rs. 375/-</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Issued within <strong>10 working days</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Timely Renewal</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-size:1.05rem;color:#bf360c;font-weight:bold">Rs. 375/-</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Application must be made <strong>1 month before expiry</strong>. Renewed in <strong>5 working days</strong></td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Renewal (Expired License)</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-size:1.05rem;color:#c62828;font-weight:bold">Rs. 475/-</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Higher fee for late renewal</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Cancellation</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center">—</td><td style="border:1px solid #ffe0b2;padding:9px 14px">If no renewal application is submitted, license may be cancelled <strong>3 months</strong> after expiry</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: OPERATIONAL RULES -->
  <div style="background:#fce4ec;border-left:6px solid #c62828;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.1rem">⚙️ 3. Operational Rules & Posting Location</h3>
    <ul style="margin:0;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:8px"><strong>Posting Location:</strong> Articles must be presented at the <strong>Designated Post Office</strong> (not below the status of a double-handed office).</li>
      <li style="margin-bottom:8px"><strong>Only one office</strong> is authorized for acceptance; no second office is permitted.</li>
      <li style="margin-bottom:8px">Franked articles posted in <strong>letter boxes</strong> will be treated as <strong>unpaid articles</strong>.</li>
      <li style="margin-bottom:8px">Articles bearing impressions of a <strong>previous date</strong> are <strong>not accepted</strong>.</li>
      <li style="margin-bottom:8px"><strong>Slogan/Advertisement:</strong> Not more than <strong>one slogan or advertisement</strong> is permitted on a single article.</li>
    </ul>
  </div>

  <!-- SECTION 4: RECHARGE & CREDIT -->
  <div style="background:#e8eaf6;border-left:6px solid #283593;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1a237e;margin:0 0 14px;font-size:1.1rem">🔋 4. Recharge & Credit</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#283593;color:#fff">
          <th style="padding:10px 14px;border:1px solid #9fa8da;text-align:left">Item</th>
          <th style="padding:10px 14px;border:1px solid #9fa8da;text-align:left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">First Recharge (Minimum)</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>Rs. 2,000/-</strong></td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Subsequent Recharges (Minimum)</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>Rs. 1,000/-</strong>, in multiples of <strong>Rs. 100/-</strong></td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Daily Server Dial-in Time</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>10:00 PM</strong> every day</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Auto-Block Trigger</td><td style="border:1px solid #c5cae9;padding:9px 14px">Machine automatically blocked if it fails to dial server for <strong>30 consecutive days</strong></td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Unblocking</td><td style="border:1px solid #c5cae9;padding:9px 14px">Reversible — by dialing server and uploading data (reversible process)</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Non-Reversible Cancellation</td><td style="border:1px solid #c5cae9;padding:9px 14px">Once a meter is officially "cancelled," the process is <strong>non-reversible</strong>; that meter cannot be used for re-credit</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 5: REBATES -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">🏷️ 5. Rebates on Usage</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Rebate Type</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:center">Rate</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Condition</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Standard Rebate</td><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-size:1.1rem;font-weight:bold;color:#4a148c">3%</td><td style="border:1px solid #e1bee7;padding:9px 14px">On franked value; allowed at time of credit upload. Minimum consumption of <strong>Rs. 5,000/-</strong> required</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Additional Rebate</td><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-size:1.1rem;font-weight:bold;color:#4a148c">2%</td><td style="border:1px solid #e1bee7;padding:9px 14px">For presenting franked mail sorted <strong>Pin-Code wise</strong></td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Claim Form</td><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold;color:#4a148c">ACG-17</td><td style="border:1px solid #e1bee7;padding:9px 14px">Claimed using form <strong>ACG-17</strong> at the <strong>first time of posting</strong> after a recharge</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 6: REFUNDS -->
  <div style="background:#e0f7fa;border-left:6px solid #00695c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 14px;font-size:1.1rem">↩️ 6. Refunds</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#00695c;color:#fff">
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left">Refund Type</th>
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left">Amount / Rate</th>
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left">Conditions</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold">Erroneous Impressions</td><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Face value less <strong>5% deduction</strong></td><td style="border:1px solid #b2dfdb;padding:9px 14px">Envelopes/wrappers must be surrendered; claim within <strong>1 month</strong></td></tr>
        <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold">Unused Postage Units</td><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">As remaining</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><s>Only upon <strong>condemnation or discontinuation</strong> of the machine. Claim within <strong>3 months</strong>. Authority: <strong>Head of Circle (HoC)</strong> or <strong>Head of Region (HoR)</strong></s></td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.9rem"><strong>Register of Repairs:</strong> Licensee must preserve the 'Register of Repairs' for <strong>2 years</strong> from the date of the last entry.</p>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1.5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 10px">🧠 Guru's Master Framework — "LRCCBR"</h3>
    <p style="margin:0">Think of RMFS in 6 blocks: <strong>L</strong>icensing → <strong>R</strong>echarge → <strong>C</strong>onnectivity → <strong>C</strong>ancellation → <strong>B</strong>rebate (Rebate) → <strong>R</strong>efund. Master each block's key numbers and you'll answer any RMFS MCQ correctly.</p>
  </div>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">🎯 The Critical Numbers You MUST Memorise</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#0d47a1;color:#fff">
        <th style="padding:9px 14px;border:1px solid #90caf9">Category</th>
        <th style="padding:9px 14px;border:1px solid #90caf9">The Number</th>
        <th style="padding:9px 14px;border:1px solid #90caf9">Context</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">License validity</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">5 years</td><td style="border:1px solid #bbdefb;padding:8px 14px">All three categories</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 14px">New / Timely renewal fee</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">Rs. 375/-</td><td style="border:1px solid #bbdefb;padding:8px 14px">Both are the same</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">Expired license renewal fee</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#c62828">Rs. 475/-</td><td style="border:1px solid #bbdefb;padding:8px 14px">Rs. 100 penalty</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 14px">New license issue time</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">10 working days</td><td style="border:1px solid #bbdefb;padding:8px 14px">—</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">Renewal processing time</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">5 working days</td><td style="border:1px solid #bbdefb;padding:8px 14px">—</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 14px">Auto-cancellation (no renewal)</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#c62828">3 months after expiry</td><td style="border:1px solid #bbdefb;padding:8px 14px">—</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">First recharge minimum</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">Rs. 2,000/-</td><td style="border:1px solid #bbdefb;padding:8px 14px">—</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 14px">Subsequent recharge minimum</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">Rs. 1,000/- (multiples of Rs. 100)</td><td style="border:1px solid #bbdefb;padding:8px 14px">—</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">Server dial-in time</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">10:00 PM daily</td><td style="border:1px solid #bbdefb;padding:8px 14px">—</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 14px">Auto-block period</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#c62828">30 days</td><td style="border:1px solid #bbdefb;padding:8px 14px">Reversible block</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">Standard rebate</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">3% (min consumption Rs. 5,000)</td><td style="border:1px solid #bbdefb;padding:8px 14px">Form ACG-17</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 14px">Pin-code sorting rebate</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">Additional 2%</td><td style="border:1px solid #bbdefb;padding:8px 14px">—</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">Erroneous impression refund deduction</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#c62828">5% deduction</td><td style="border:1px solid #bbdefb;padding:8px 14px">Claim within 1 month</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 14px">Unused units refund time limit</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#c62828">3 months</td><td style="border:1px solid #bbdefb;padding:8px 14px">On condemnation/discontinuation</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px 14px">Register of Repairs retention</td><td style="border:1px solid #bbdefb;padding:8px 14px;font-weight:bold;color:#0d47a1">2 years</td><td style="border:1px solid #bbdefb;padding:8px 14px">From date of last entry</td></tr>
    </tbody>
  </table>

  <div style="background:#fff3e0;border:1.5px solid #ef6c00;border-radius:10px;padding:16px 20px;margin-top:4px">
    <h4 style="color:#e65100;margin:0 0 10px">⚡ Common Exam Traps — RMFS</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px">New license fee and <em>timely</em> renewal fee are the <strong>SAME — Rs. 375/-</strong>. Only expired license renewal costs Rs. 475/-.</li>
      <li style="margin-bottom:7px">Impression colour must be <strong>Blue</strong> — not black, not red.</li>
      <li style="margin-bottom:7px">Block is <strong>reversible</strong> (by dial-in). Cancellation of a meter is <strong>non-reversible</strong> — a major distinction.</li>
      <li style="margin-bottom:7px">Standard rebate requires <strong>minimum consumption of Rs. 5,000/-</strong> — not just any recharge.</li>
      <li style="margin-bottom:7px">Rebate is claimed on form <strong>ACG-17</strong> at the <strong>first posting after a recharge</strong>.</li>
      <li style="margin-bottom:7px">Franked articles in letter boxes = treated as <strong>unpaid</strong> — not as franked.</li>
    </ul>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practice Scenarios — RMFS</h4>
  <p><strong>Q1.</strong> A franking machine license expired on 1st May. The licensee applies for renewal on 20th August. What fee is payable?<br>→ Since license has expired, renewal fee = <strong>Rs. 475/-</strong></p>
  <p><strong>Q2.</strong> A licensee uploads Rs. 8,000/- credit and posts 300 letters. He wants a rebate. What rebate is he entitled to and on which form?<br>→ <strong>3% on franked value</strong> (consumption Rs. 5,000 condition is met). Claimed on form <strong>ACG-17</strong> at first posting after recharge.</p>
  <p><strong>Q3.</strong> A franking machine failed to dial the server for 35 consecutive days. What happens?<br>→ The machine is <strong>automatically blocked</strong> (after 30 days of failure). This is a <strong>reversible block</strong> — it can be unblocked by dialing the server.</p>
  <p><strong>Q4.</strong> A customer posted 50 franked envelopes in a street letter box. How will these be treated?<br>→ As <strong>unpaid articles</strong> — because franked articles must be presented at the designated Post Office counter.</p>
  <p><strong>Q5.</strong> A licensee made an erroneous impression of Rs. 200/- on an envelope. He surrenders it within 15 days. What refund does he get?<br>→ Rs. 200/- less 5% = Rs. 200 − Rs. 10 = <strong>Rs. 190/-</strong></p>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 RMFS — Rapid Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>Brand Name:</strong> Digifrank Plus | <strong>Impression:</strong> Blue | <strong>Components:</strong> Value Die + License Die</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>License validity:</strong> 5 yrs | <strong>New/Timely renewal:</strong> Rs. 375 | <strong>Expired renewal:</strong> Rs. 475</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>New license issue:</strong> 10 working days | <strong>Renewal:</strong> 5 working days | <strong>Auto-cancel:</strong> 3 months after expiry</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>First recharge:</strong> Min Rs. 2,000 | <strong>Subsequent:</strong> Min Rs. 1,000 (multiples of Rs. 100)</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>Server dial:</strong> 10 PM daily | <strong>Auto-block:</strong> 30 days no dial | <strong>Block:</strong> Reversible | <strong>Cancellation:</strong> Non-reversible</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>Rebate:</strong> 3% (min Rs. 5,000 consumption) + 2% (pin-code sort) | <strong>Form:</strong> ACG-17</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #4a148c"><strong>Erroneous refund:</strong> Face value − 5% | <strong>Unused units refund:</strong> Within 3 months of condemnation | <strong>Repair register:</strong> Preserve 2 years</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>OEMs:</strong> (1) M/s Quadient (formerly Neopost) &nbsp; (2) M/s Pitney Bowes India Pvt. Ltd.</div>
    </div>
  </div>
</div>`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA 2 — MONEY ORDERS, IPO, PHILATELY & SPECIAL SERVICES
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Money Orders, IPO, Philately & Special Services — The Numbers That Matter",
        rule_number: "Chapters 6, 7 & 8 — PO Guide Part-I",
        act_name: "Post Office Guide Part-I",
        category: "Rule",
        effective_date: new Date("2024-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#880e4f,#ad1457,#c2185b);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(136,14,79,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.4rem;letter-spacing:0.5px">💸 MONEY REMITTANCE, PHILATELY & SPECIAL SERVICES</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Chapters 6, 7 & 8 — Post Office Guide Part-I &nbsp;|&nbsp; High-Value Exam Topics</p>
  </div>

  <!-- ── CHAPTER 7: MONEY ORDERS ── -->
  <div style="background:#e3f2fd;border-left:6px solid #0d47a1;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:22px">
    <h3 style="color:#0d47a1;margin:0 0 14px;font-size:1.12rem">📮 CHAPTER 7 — Money Orders (MO)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
      <thead>
        <tr style="background:#0d47a1;color:#fff">
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left;width:40%">Rule / Parameter</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Maximum per single MO / eMO</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Rs. 10,000/-</strong> (eMO limit updated from previous Rs. 5,000/-)</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Aggregate monthly limit (to one person)</td><td style="border:1px solid #bbdefb;padding:9px 14px">Total remittance shall <strong>not exceed Rs. 25,000/-</strong> in a month</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Commission</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Rs. 1/-</strong> for every <strong>Rs. 20/-</strong> (or fraction thereof)</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Commission Exemptions</td><td style="border:1px solid #bbdefb;padding:9px 14px">No commission for contributions to: <strong>PM's Relief Fund, PM CARES Fund, Chief Minister's Relief Fund</strong></td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Void MO</td><td style="border:1px solid #bbdefb;padding:9px 14px">If unpaid to payee/remitter at end of <strong>2nd month</strong> following month of issue → treated as <strong>Void</strong></td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Forfeiture</td><td style="border:1px solid #bbdefb;padding:9px 14px">If unpaid beyond <strong>3 years</strong> → forfeited to <strong>Government of India</strong></td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">MO Retention Period</td><td style="border:1px solid #bbdefb;padding:9px 14px">Retained for <strong>7 days</strong> from date of presentation or date sent out for payment. If unpaid after 7 days → returned to remitter on <strong>first working day</strong> following expiry</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">MO Redirection</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Free of charge</strong> upon request (no fee for redirecting MO to new address)</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Death of Payee</td><td style="border:1px solid #bbdefb;padding:9px 14px">Amount returned to <strong>Remitter</strong></td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Death of Both Payee & Remitter</td><td style="border:1px solid #bbdefb;padding:9px 14px">Amount paid to <strong>legal heir of the remitter</strong></td></tr>
      </tbody>
    </table>
  </div>

  <!-- ── CHAPTER 7: IPO ── -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:22px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.12rem">🏦 Indian Postal Orders (IPO)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:center;width:25%">Denomination</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:center">Commission</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-size:1.1rem;font-weight:bold;color:#bf360c">Rs. 10/-</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-weight:bold">Rs. 1/-</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-size:1.1rem;font-weight:bold;color:#bf360c">Rs. 20/-</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-weight:bold">Rs. 2/-</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-size:1.1rem;font-weight:bold;color:#bf360c">Rs. 50/-</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-weight:bold">Rs. 5/-</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-size:1.1rem;font-weight:bold;color:#bf360c">Rs. 100/-</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-weight:bold">Rs. 10/-</td></tr>
      </tbody>
    </table>
    <h4 style="color:#bf360c;margin:12px 0 8px">IPO Validity Rules</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem">
      <thead>
        <tr style="background:#bf360c;color:#fff">
          <th style="padding:9px 14px;border:1px solid #ffab91;text-align:center">Period from Month of Issue</th>
          <th style="padding:9px 14px;border:1px solid #ffab91;text-align:left">Treatment</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">0 – 24 Months</td><td style="border:1px solid #ffccbc;padding:9px 14px">Encashed <strong>without second commission</strong></td></tr>
        <tr style="background:#fbe9e7"><td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">24 – 36 Months</td><td style="border:1px solid #ffccbc;padding:9px 14px">Encashed with a <strong>second commission</strong> paid in postage stamps affixed to the back</td></tr>
        <tr><td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold;color:#c62828">More than 36 Months</td><td style="border:1px solid #ffccbc;padding:9px 14px;color:#c62828;font-weight:bold">FORFEITED</td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.92rem"><strong>Broken Amounts:</strong> Up to <strong>4 postage stamps</strong> (total value not exceeding <strong>Rs. 9/-</strong>) may be affixed to enhance value (except on Rs. 100 IPOs).</p>
    <p style="margin:6px 0 0;font-size:0.92rem"><strong>Payment Mode:</strong> IPOs <strong>cannot</strong> be paid by cash across the counter. Must be paid through a <strong>bank</strong> or <strong>Post Office Savings Bank (POSB)</strong> account. IPOs can be <strong>crossed</strong> like cheques.</p>
  </div>

  <!-- ── CHAPTER 6: CAMP BAGS & OFFICIAL MAIL ── -->
  <div style="background:#e8f5e9;border-left:6px solid #1b5e20;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:22px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.12rem">🎒 CHAPTER 6 — Camp Bags & Official Postal Articles</h3>
    <h4 style="color:#2e7d32;margin:8px 0 10px">Camp Bags — Eligibility & Tariff</h4>
    <p style="margin:0 0 10px;font-size:0.92rem"><strong>Eligibility:</strong> Exclusive facility for the <strong>President, Vice-President, Central Ministers, State Governors,</strong> and <strong>DG Posts</strong>.</p>
    <p style="margin:0 0 12px;font-size:0.92rem"><strong>Availability:</strong> Booked and delivered on <strong>all days, including Sundays and Holidays</strong>.</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem">
      <thead>
        <tr style="background:#2e7d32;color:#fff">
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:left">Particulars</th>
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:center">Parcel (Max 10 Kg)</th>
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:center">Air Parcel</th>
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:center">Letter Mail</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold">Postage</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center">Payable on 10 Kg Parcel</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center">According to weight</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center;font-weight:bold;color:#1b5e20">No Charge</td></tr>
        <tr style="background:#f1f8e9"><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold">Incidental Charge</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center;font-weight:bold;color:#1b5e20">Rs. 16/-</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center;font-weight:bold;color:#1b5e20">Rs. 6/-</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center;font-weight:bold;color:#1b5e20">Nil</td></tr>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold">Registration</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center">As applicable</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center">As applicable</td><td style="border:1px solid #c8e6c9;padding:9px 14px;text-align:center">As applicable</td></tr>
      </tbody>
    </table>
    <h4 style="color:#2e7d32;margin:14px 0 8px">Official Postal Articles — Unpaid/Insufficient Postage</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem">
      <thead><tr style="background:#1b5e20;color:#fff"><th style="padding:9px 14px;border:1px solid #a5d6a7">Condition</th><th style="padding:9px 14px;border:1px solid #a5d6a7">Charge on Delivery</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px"><strong>Unpaid</strong> "On Government Service" articles</td><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Charged at <strong>prepaid rate</strong> (NOT double)</td></tr>
        <tr style="background:#f1f8e9"><td style="border:1px solid #c8e6c9;padding:9px 14px"><strong>Insufficiently paid</strong> official articles</td><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Charged the <strong>deficiency only</strong></td></tr>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px">Prepayment on <strong>official parcels</strong></td><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#c62828">COMPULSORY</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ── CHAPTER 8: PHILATELY ── -->
  <div style="background:#fce4ec;border-left:6px solid #880e4f;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:22px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.12rem">🏷️ CHAPTER 8 — Philately: Historical Facts & Key Rules</h3>

    <h4 style="color:#ad1457;margin:8px 0 10px">Historical Milestones</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
      <thead><tr style="background:#880e4f;color:#fff"><th style="padding:9px 14px;border:1px solid #f48fb1">Milestone</th><th style="padding:9px 14px;border:1px solid #f48fb1">Details</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold;color:#880e4f">First World Stamp</td><td style="border:1px solid #fce4ec;padding:9px 14px">"<strong>Penny Black</strong>" (UK) — issued on <strong>1st May 1840</strong></td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold;color:#880e4f">First India Stamp</td><td style="border:1px solid #fce4ec;padding:9px 14px">"<strong>Scinde Dawk</strong>" — released in <strong>1852</strong>, embossed on wax/paper with the East India Company's Merchant Mark</td></tr>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold;color:#880e4f">First Stamp of Independent India</td><td style="border:1px solid #fce4ec;padding:9px 14px">Issued on <strong>21st November 1947</strong> — depicting the Indian Flag and slogan "Jai Hind," valued at <strong>3½ annas</strong></td></tr>
      </tbody>
    </table>

    <h4 style="color:#ad1457;margin:8px 0 10px">Commemorative Stamp Policies</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
      <thead><tr style="background:#ad1457;color:#fff"><th style="padding:9px 14px;border:1px solid #f48fb1">Policy</th><th style="padding:9px 14px;border:1px solid #f48fb1">Rule</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">Living Personalities</td><td style="border:1px solid #fce4ec;padding:9px 14px;color:#c62828;font-weight:bold">No stamp shall be issued on a living personality — <strong>NO EXCEPTION</strong></td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">Posthumous (General)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Can be issued only <strong>10 years after death</strong></td></tr>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">Posthumous (Head of State)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Exception — can be issued on <strong>1st death anniversary</strong></td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">Institutions / Anniversaries</td><td style="border:1px solid #fce4ec;padding:9px 14px">Issued only on <strong>50th, 75th, 100th, 125th, or 150th</strong> anniversaries</td></tr>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">Mandatory Purchase</td><td style="border:1px solid #fce4ec;padding:9px 14px">Proponents must purchase a minimum of <strong>1 lakh stamps</strong> (or <strong>Rs. 25 Lakh</strong> worth if headquarters is outside India)</td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">Commemorative Stamp Sales Window</td><td style="border:1px solid #fce4ec;padding:9px 14px">Sold at Philatelic Bureaus for <strong>12 months</strong> from issue date</td></tr>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">Unsold Commemorative Stock</td><td style="border:1px solid #fce4ec;padding:9px 14px">After <strong>6 months</strong>, released to regular (Definitive) counters; treated like regular postage</td></tr>
      </tbody>
    </table>

    <h4 style="color:#ad1457;margin:8px 0 10px">Philatelic Deposit Account (PDA) & Advisory Committee</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem">
      <thead><tr style="background:#880e4f;color:#fff"><th style="padding:9px 14px;border:1px solid #f48fb1">Parameter</th><th style="padding:9px 14px;border:1px solid #f48fb1">Details</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PDA — Domestic Min. Opening Balance</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>Rs. 200/-</strong></td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PDA — Foreign Min. Opening Balance</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>Rs. 1,000/-</strong></td></tr>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PDA — Handling Charge (Foreign)</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>2%</strong> (Minimum Rs. 5/-) levied on transactions for foreign customers</td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PAC Chairman</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>Minister of Communications</strong></td></tr>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PAC Co-Chairman / Vice-Chairman</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>Minister of State for Communications</strong></td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PAC Member Secretary</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>DDG (Philately)</strong></td></tr>
        <tr><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PAC Meeting Frequency</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>Once a year</strong></td></tr>
        <tr style="background:#fff0f5"><td style="border:1px solid #fce4ec;padding:9px 14px;font-weight:bold">PAC Tenure</td><td style="border:1px solid #fce4ec;padding:9px 14px"><strong>2 years</strong> from date of notification for constitution of the committee</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ── MY STAMP & SPARSH ── -->
  <div style="background:#e8eaf6;border-left:6px solid #283593;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:14px">
    <h3 style="color:#1a237e;margin:0 0 14px;font-size:1.12rem">🌟 My Stamp, CMS & Deen Dayal SPARSH Yojana</h3>
    <h4 style="color:#283593;margin:0 0 10px">My Stamp</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
      <thead><tr style="background:#283593;color:#fff"><th style="padding:9px 14px;border:1px solid #9fa8da">Parameter</th><th style="padding:9px 14px;border:1px solid #9fa8da">Details</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Cost per sheet</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>Rs. 300/-</strong> per sheet</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Content</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>12 stamps</strong> of Rs. 5/- each (Total face value: <strong>Rs. 60/-</strong>)</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">10% discount</td><td style="border:1px solid #c5cae9;padding:9px 14px">Purchase of <strong>2 – 100 sheets</strong></td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">20% discount</td><td style="border:1px solid #c5cae9;padding:9px 14px">Purchase of <strong>more than 100 sheets</strong> (on additional sheets only)</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">CMS Corporate Minimum Order</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>5,000 sheets</strong>; in multiples of 5,000. Advance notice: <strong>2 months</strong></td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">CMS Corporate Discount</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>20%</strong> on total amount (Cost: Rs. 12,00,000/- for 5,000 sheets after discount)</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">Departmental Distribution (500 extra sheets)</td><td style="border:1px solid #c5cae9;padding:9px 14px">ePost Office: <strong>300</strong> | Philatelic Bureau of Circle: <strong>100</strong> | National Philatelic Museum (NPM): <strong>100</strong></td></tr>
      </tbody>
    </table>

    <h4 style="color:#283593;margin:0 0 10px">Deen Dayal SPARSH Yojana</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem">
      <thead><tr style="background:#1565c0;color:#fff"><th style="padding:9px 14px;border:1px solid #90caf9">Parameter</th><th style="padding:9px 14px;border:1px solid #90caf9">Details</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Full Form</td><td style="border:1px solid #bbdefb;padding:9px 14px">Scholarship for <strong>P</strong>romotion of <strong>A</strong>ptitude &amp; <strong>R</strong>esearch in <strong>S</strong>tamps as a <strong>H</strong>obby</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Target</td><td style="border:1px solid #bbdefb;padding:9px 14px">Students in classes <strong>VI to IX</strong></td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Annual Scholarship</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Rs. 6,000/-</strong> per annum (disbursed as <strong>Rs. 1,500/-</strong> per quarter)</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Selection Criteria</td><td style="border:1px solid #bbdefb;padding:9px 14px">Academic record (min <strong>60%</strong>, or <strong>55% for SC/ST</strong>) + Philately Project/Quiz</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Total Scholarships</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>920 Pan-India</strong> (Maximum <strong>40 per Circle</strong>)</td></tr>
      </tbody>
    </table>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#e3f2fd,#fce4ec);border:1.5px solid #0d47a1;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#0d47a1;margin:0 0 10px">🧠 Guru's Memory System — "MIP-CAP-SPARSH"</h3>
    <ul style="margin:0;padding-left:18px">
      <li><strong>M</strong>oney Order (Rs. 10,000 max | Rs. 25,000 monthly cap | Void on 2nd month | Forfeited at 3 years)</li>
      <li><strong>I</strong>PO (Rs. 10/20/50/100 denominations | 24 months free | 24–36 months: 2nd commission | >36 months: Forfeited)</li>
      <li><strong>P</strong>hilatelic Advisory Committee (Minister of Communications = Chairman)</li>
      <li><strong>C</strong>ommemorative Stamp (10 years after death | Head of State = 1st anniversary | No living personality)</li>
      <li><strong>A</strong>nniversaries for institutions (50/75/100/125/150 only)</li>
      <li><strong>P</strong>DA (Domestic Rs. 200 | Foreign Rs. 1,000)</li>
      <li><strong>S</strong>PARSH (Classes VI–IX | Rs. 6,000/year | 920 scholarships | 40 per circle)</li>
    </ul>
  </div>

  <h4 style="color:#880e4f;border-bottom:2px solid #880e4f;padding-bottom:4px">⚡ High-Frequency Exam Traps</h4>
  <div style="background:#fce4ec;border-radius:8px;padding:14px 20px">
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>MO void</strong> = end of <strong>2nd month</strong> following month of issue (NOT 1 month, NOT 3 months)</li>
      <li style="margin-bottom:7px"><strong>MO forfeiture</strong> = after <strong>3 years</strong> — to Government of India</li>
      <li style="margin-bottom:7px"><strong>IPO &gt; 36 months = forfeited</strong>. This is same as MO's 3-year rule — both = forfeited.</li>
      <li style="margin-bottom:7px">IPOs <strong>cannot be paid in cash</strong> — must go through bank or POSB.</li>
      <li style="margin-bottom:7px"><strong>Camp Bags</strong> — Letter Mail postage = <strong>No Charge</strong>. Incidental charge for parcel = <strong>Rs. 16/-</strong>, for air parcel = <strong>Rs. 6/-</strong>.</li>
      <li style="margin-bottom:7px">Official unpaid article = charged at <strong>prepaid rate</strong> (NOT double — this is different from public mail!)</li>
      <li style="margin-bottom:7px">Stamp on deceased personality = min <strong>10 years after death</strong>. Exception = Head of State → <strong>1st anniversary</strong>.</li>
      <li style="margin-bottom:7px">My Stamp sheet = Rs. 300 for <strong>12 stamps of Rs. 5/-</strong> each. Face value = Rs. 60 only; premium goes to India Post.</li>
      <li style="margin-bottom:7px">SPARSH scholarship: <strong>Rs. 6,000/year</strong> dispersed as <strong>Rs. 1,500 per quarter</strong>; for classes <strong>VI to IX</strong>.</li>
      <li style="margin-bottom:7px"><strong>Philatelic Bureau</strong> ≠ Philatelic Counter. Bureau = mail orders + PDAs. Counter = sale only; no special cancellations.</li>
    </ul>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:#e8eaf6;border-left:5px solid #1a237e;padding:16px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 Rapid Revision — Key Numbers at a Glance</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
      <thead><tr style="background:#1a237e;color:#fff"><th style="border:1px solid #9fa8da;padding:7px 10px">Topic</th><th style="border:1px solid #9fa8da;padding:7px 10px">Key Number / Rule</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">MO max single</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Rs. 10,000/-</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">MO monthly aggregate</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Rs. 25,000/-</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">MO commission</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Re. 1/- per Rs. 20/-</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">MO Void</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">End of 2nd month following issue</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">MO / IPO Forfeiture</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">3 years (MO) | 36 months (IPO)</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">IPO denominations</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Rs. 10, 20, 50, 100</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">IPO 24–36 months</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">2nd commission (in postage stamps on back)</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">Camp Bag incidental (parcel)</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Rs. 16/-</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">Camp Bag incidental (air parcel)</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Rs. 6/-</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">Camp Bag letter mail postage</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">No Charge</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">First India stamp</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Scinde Dawk — 1852</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">First stamp Independent India</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">21 Nov 1947 | 3½ annas | Jai Hind</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">First world stamp</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Penny Black (UK) — 1 May 1840</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">PAC Chairman</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Minister of Communications</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">PAC Tenure / Meetings</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">2 years | Once a year</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">PDA Min (domestic / foreign)</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Rs. 200 / Rs. 1,000</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">SPARSH — Class / Scholarship</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">VI to IX | Rs. 6,000/yr (Rs. 1,500/qtr)</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:7px 10px">SPARSH — Total / per Circle</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">920 Pan-India | Max 40 per Circle</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:7px 10px">My Stamp — sheet cost / stamps</td><td style="border:1px solid #c5cae9;padding:7px 10px;font-weight:bold">Rs. 300 | 12 stamps × Rs. 5 = face Rs. 60</td></tr>
      </tbody>
    </table>
  </div>
</div>`
    }
];

async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        let inserted = 0;
        for (const entry of entries) {
            const existing = await collection.findOne({ title: entry.title });
            if (existing) {
                await collection.updateOne({ title: entry.title }, { $set: { ...entry, updatedAt: now } });
                console.log(`✅ Updated: ${entry.title}`);
                continue;
            }
            const result = await collection.insertOne({
                ...entry,
                createdAt: now,
                updatedAt: now
            });
            console.log(`✅ Inserted: ${entry.title} [${result.insertedId}]`);
            inserted++;
        }

        console.log(`\n🎉 Done! ${inserted} new Dak Sutra entries inserted.`);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
