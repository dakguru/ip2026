
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
        title: "Consolidation of Products & Centralized Delivery of All Articles",
        rule_number: "Circular dated 01.10.2025",
        act_name: "Department of Posts — Operational Rationalization",
        category: "Circular",
        effective_date: new Date("2025-10-01"),
        exam_tags: ["LDCE IP", "PS Group B"],

        // ─── OFFICIAL PROVISION ────────────────────────────────────────────────
        official_text: `
<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#1e3a5f,#2d6a9f);color:white;padding:14px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">📜</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Government of India · Department of Posts</div>
      <div style="font-size:15px;font-weight:900;margin-top:2px">Legal &amp; Official Framework for Postal Product Rationalization</div>
    </div>
  </div>
  <div style="border:1px solid #c8dff5;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f0f7ff">
    <ul style="margin:0;padding-left:20px;line-height:1.9;color:#1a3a5c;font-size:14px">
      <li><strong>Core Rationalization:</strong> The Government of India has rationalized the suite of postal products to streamline services.</li>
      <li><strong>Merger of Services:</strong> The Registered Post service is merged into Speed Post with effect from <strong style="color:#c0392b">01.10.2025</strong>.</li>
      <li><strong>Basic Mail Service:</strong> Speed Post (Speed Post Document &amp; Speed Post Parcel) shall henceforth be the <em>basic mail service</em> for address-specific delivery of accountable postal items within the country.</li>
      <li><strong>Registration as Value-Addition:</strong> Registration will strictly be a value-added service available <strong>only</strong> for Speed Post items. It will no longer be available for other categories of mail.</li>
    </ul>
  </div>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#27ae60);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase">
    ⏱️ Compensation Timeline for Lost Speed Post Articles
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #a8d5b5;border-top:none">
    <thead>
      <tr style="background:#e8f5ed">
        <th style="border:1px solid #a8d5b5;padding:10px 12px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:800">Event</th>
        <th style="border:1px solid #a8d5b5;padding:10px 12px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:800">Time Limit</th>
        <th style="border:1px solid #a8d5b5;padding:10px 12px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:800">Reckoned From</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 12px;font-size:13px">Article treated as <strong>Lost</strong></td>
        <td style="border:1px solid #a8d5b5;padding:9px 12px;text-align:center;font-size:14px;font-weight:900;color:#c0392b">60 days</td>
        <td style="border:1px solid #a8d5b5;padding:9px 12px;font-size:13px">Date of <strong>booking</strong></td>
      </tr>
      <tr style="background:#f5fbf7">
        <td style="border:1px solid #a8d5b5;padding:9px 12px;font-size:13px">Article treated as <strong>Lost</strong> (complaint route)</td>
        <td style="border:1px solid #a8d5b5;padding:9px 12px;text-align:center;font-size:14px;font-weight:900;color:#c0392b">30 days</td>
        <td style="border:1px solid #a8d5b5;padding:9px 12px;font-size:13px">Date of receipt of <strong>complaint</strong></td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 12px;font-size:13px">Compensation <strong>paid</strong> after declaration of loss</td>
        <td style="border:1px solid #a8d5b5;padding:9px 12px;text-align:center;font-size:14px;font-weight:900;color:#16a085">10 days</td>
        <td style="border:1px solid #a8d5b5;padding:9px 12px;font-size:13px">After the loss declaration</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:12px">
  <div style="background:linear-gradient(135deg,#6c3483,#9b59b6);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase">
    📦 Bag Label System — At a Glance
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #d2b4de;border-top:none">
    <thead>
      <tr style="background:#f5eef8">
        <th style="border:1px solid #d2b4de;padding:10px 12px;text-align:left;font-size:12px;color:#6c3483;font-weight:800">Label Colour</th>
        <th style="border:1px solid #d2b4de;padding:10px 12px;text-align:left;font-size:12px;color:#6c3483;font-weight:800">Contents</th>
        <th style="border:1px solid #d2b4de;padding:10px 12px;text-align:left;font-size:12px;color:#6c3483;font-weight:800">Route</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #d2b4de;padding:9px 12px">
          <span style="display:inline-flex;align-items:center;gap:6px">
            <span style="background:#e67e22;width:14px;height:14px;border-radius:3px;display:inline-block"></span>
            <strong>Orange Label</strong>
          </span>
        </td>
        <td style="border:1px solid #d2b4de;padding:9px 12px;font-size:13px">Speed Post &amp; Registered (Accountable / Premium Articles)</td>
        <td style="border:1px solid #d2b4de;padding:9px 12px;font-size:13px">Air <em>and</em> Surface</td>
      </tr>
      <tr style="background:#f9f0ff">
        <td style="border:1px solid #d2b4de;padding:9px 12px">
          <span style="display:inline-flex;align-items:center;gap:6px">
            <span style="background:#27ae60;width:14px;height:14px;border-radius:3px;display:inline-block"></span>
            <strong>Green Label</strong>
          </span>
        </td>
        <td style="border:1px solid #d2b4de;padding:9px 12px;font-size:13px">Book Packets, Periodicals, Blind Literature (Non-Accountable)</td>
        <td style="border:1px solid #d2b4de;padding:9px 12px;font-size:13px"><strong>Surface ONLY</strong></td>
      </tr>
    </tbody>
  </table>
</div>`,

        // ─── DAK GURU EXPLANATION ───────────────────────────────────────────────
        guru_explanation: `
<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#154360,#1a6fa8);color:white;padding:13px 16px;border-radius:10px 10px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏭 The New Integrated Hub &amp; Delivery Concept — Made Simple
  </div>
  <div style="border:1px solid #aed6f1;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#eaf4fc">
    <ul style="margin:0;padding-left:20px;line-height:2;font-size:14px;color:#1a3a5c">
      <li><strong>One Hub, Simplified Bagging:</strong> Operations are simplified into two main streams — Orange bags for premium/accountable items, Green bags for everything else (surface route only).</li>
      <li><strong>Integrated Delivery Centre (DC):</strong> Traditional PO beats are redesigned into large, mechanized DCs covering wide areas. A DC either processes Documents and Parcels in adjacent areas (<em>Integrated DC</em>) or in separate buildings/compounds (<em>Nodal Delivery Centre</em>).</li>
      <li><strong>Mix vs. Separate Staff:</strong> If parcel volume is high enough → Separate Staff (one for letters, one for parcels). If volume is low → Mix Staff (one postman delivers both in the same beat).</li>
      <li><strong>Modernized Delivery:</strong> Postmen use own/departmental 2-wheelers (with fuel reimbursement). 4-wheelers handle heavy parcels. Delivery requires calling the customer first, using the Postman Mobile App (PMA), and collecting COD digitally.</li>
    </ul>
  </div>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#1e8449);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    👥 Delivery Staff Article Targets — Mix Delivery Area
  </div>
  <p style="font-size:12px;color:#666;padding:8px 16px 4px;margin:0;background:#f0fff4;border-left:1px solid #a8d5b5;border-right:1px solid #a8d5b5;font-style:italic">
    Calculated assuming 30 km / 18 km distance, 90 minutes travel time
  </p>
  <table style="width:100%;border-collapse:collapse;border:1px solid #a8d5b5;border-top:none">
    <thead>
      <tr style="background:#d5f5e3">
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:800">Category of Article</th>
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:800">Daily Target per Staff</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Ordinary Articles</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-size:16px;font-weight:900;color:#1a5c3a">95</td>
      </tr>
      <tr style="background:#f0fff4">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Regd. Articles / SP Person Specific / Parcels</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-size:16px;font-weight:900;color:#1a5c3a">42</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Speed Post (Document)</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-size:16px;font-weight:900;color:#1a5c3a">43</td>
      </tr>
      <tr style="background:#f0fff4">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Money Order / eMO</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-size:16px;font-weight:900;color:#e74c3c">1</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">COD</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-size:16px;font-weight:900;color:#e67e22">3</td>
      </tr>
      <tr style="background:#f0fff4">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Insured</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-size:16px;font-weight:900;color:#e74c3c">1</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#784212,#d35400);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    📦 Exclusive Parcel Delivery Staff Target
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #f0b27a;border-top:none">
    <thead>
      <tr style="background:#fdebd0">
        <th style="border:1px solid #f0b27a;padding:10px 14px;text-align:left;font-size:12px;color:#784212;font-weight:800">Category of Article</th>
        <th style="border:1px solid #f0b27a;padding:10px 14px;text-align:center;font-size:12px;color:#784212;font-weight:800">Daily Target per Staff</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #f0b27a;padding:9px 14px;font-size:13px">Speed Post / Business Parcel / Registered Parcel</td>
        <td style="border:1px solid #f0b27a;padding:9px 14px;text-align:center;font-size:22px;font-weight:900;color:#d35400">60</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1b2631,#2e4057);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏙️ City-Wise Delivery Centre Configuration
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #aab7c4;border-top:none">
    <thead>
      <tr style="background:#d6eaf8">
        <th style="border:1px solid #aab7c4;padding:10px 12px;text-align:left;font-size:12px;color:#1b2631;font-weight:800">Metric</th>
        <th style="border:1px solid #aab7c4;padding:10px 12px;text-align:center;font-size:12px;color:#1b2631;font-weight:800">Metro / Big Cities</th>
        <th style="border:1px solid #aab7c4;padding:10px 12px;text-align:center;font-size:12px;color:#1b2631;font-weight:800">State Capitals / Other Cities</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #aab7c4;padding:9px 12px;font-size:13px;font-weight:700">Accountable Article Volume</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:13px;font-weight:900;color:#1a6fa8">&gt; 50,000 / day</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:13px;color:#555">Less than Metro</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aab7c4;padding:9px 12px;font-size:13px;font-weight:700">Staff per DC</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:14px;font-weight:900;color:#16a085">50 – 80 staff</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:14px;font-weight:900;color:#16a085">15 – 60 staff</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #aab7c4;padding:9px 12px;font-size:13px;font-weight:700">Max Capacity (excl. bulk)</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:14px;font-weight:900;color:#8e44ad">8,000 articles / day</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:14px;font-weight:900;color:#8e44ad">5,000 articles / day</td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aab7c4;padding:9px 12px;font-size:13px;font-weight:700">Space Required</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:13px;color:#555">2,000 – 3,500 Sq Ft</td>
        <td style="border:1px solid #aab7c4;padding:9px 12px;text-align:center;font-size:13px;color:#555">1,000 – 2,500 Sq Ft</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:24px">
  <div style="background:linear-gradient(135deg,#1c5c8a,#2980b9);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔟 Processing Flow for Mix Delivery Staff (Documents &amp; Parcels)
  </div>
  <div style="border:1px solid #aed6f1;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#eaf4fc">
    <ol style="margin:0;padding-left:22px;line-height:2;font-size:14px;color:#1a3a5c">
      <li><strong>Receipt &amp; Scan:</strong> Receive bags from Mail Motor Service (MMS) in the common area → perform Bag Receipt Scan.</li>
      <li><strong>Opening:</strong> Open bags → Article Receipt Scan for accountable items → Sector Sorting for Parcels.</li>
      <li><strong>Segregation:</strong> Segregate and face Ordinary Mail → Sort accountable items → Sort parcels by delivery area.</li>
      <li><strong>Stamping &amp; Sequencing:</strong> Stamp Ordinary Mail → Sequence all mail and parcels for the delivery route.</li>
      <li><strong>Slip Generation:</strong> Scan articles → Generate a <em>Common Delivery Slip</em> covering both documents and parcels. <span style="color:#8e44ad">(Note: Separate parcel areas generate separate slips.)</span></li>
      <li><strong>Out for Delivery:</strong> Hand over to staff for mechanized delivery.</li>
      <li><strong>Returns &amp; Dispatch:</strong> Take Delivery Staff Returns → Dispatch outstation bags to Sorting Hub → Tally abstracts.</li>
    </ol>
  </div>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#27ae60);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    💰 Critical Limits &amp; Specifications
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #a8d5b5;border-top:none">
    <thead>
      <tr style="background:#d5f5e3">
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:800">Parameter</th>
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:800">Value</th>
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:800">Note</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Mechanized Beat Distance</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-weight:900;font-size:15px;color:#c0392b">15 km</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:12px;color:#666">Max one-way; extendable in exceptional cases</td>
      </tr>
      <tr style="background:#f0fff4">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Max Deposit Period (undelivered)</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-weight:900;font-size:15px;color:#c0392b">7 days</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:12px;color:#666">After which article is returned/disposed</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Max Delivery Attempts</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-weight:900;font-size:15px;color:#c0392b">2</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:12px;color:#666">For both documents and parcels</td>
      </tr>
      <tr style="background:#f0fff4">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px">Bulk Delivery Staff per DC</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-weight:900;font-size:15px;color:#1a5c3a">1 – 2</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:12px;color:#666">Dedicated exclusively for bulk delivery</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#4a235a,#8e44ad);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🏦 Facilities, Conditions &amp; Staffing
  </div>
  <div style="border:1px solid #d2b4de;border-top:none;border-radius:0 0 10px 10px;padding:16px 18px;background:#f5eef8">
    <ul style="margin:0;padding-left:20px;line-height:2;font-size:14px;color:#4a235a">
      <li><strong>Fuel Reimbursement:</strong> Delivery staff using own 2-wheelers get monthly fuel reimbursements. Circles can also hire electric 2-wheelers or branded 4-wheelers.</li>
      <li><strong>Treasury Functions:</strong> DCs with separate Facility IDs have treasury functions to disburse eMO cash and collect COD / Custom duty payments.</li>
      <li><strong>Security &amp; Access:</strong> Entry restricted to authorized staff only. Full CCTV coverage required — covering bag exchange areas and internal processing.</li>
      <li><strong>Sunday/Holiday Delivery:</strong> Delivery is operational on Sundays and public holidays (excluding office areas). Staff must be rotated to ensure one weekly off.</li>
    </ul>
  </div>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#1a5c3a,#1e8449);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🔀 Second Delivery Shift Timings
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #a8d5b5;border-top:none">
    <thead>
      <tr style="background:#d5f5e3">
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:800">Shift</th>
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:center;font-size:12px;color:#1a5c3a;font-weight:800">Timings</th>
        <th style="border:1px solid #a8d5b5;padding:10px 14px;text-align:left;font-size:12px;color:#1a5c3a;font-weight:800">Remark</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px;font-weight:700">Morning Shift</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#1a6fa8">09:00 – 17:00 hrs</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:12px;color:#555">Standard shift</td>
      </tr>
      <tr style="background:#f0fff4">
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:13px;font-weight:700">Evening / Second Shift</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;text-align:center;font-weight:900;font-size:14px;color:#c0392b">12:00 – 20:00 hrs</td>
        <td style="border:1px solid #a8d5b5;padding:9px 14px;font-size:12px;color:#555">Separate Facility ID + dedicated Supervisors required</td>
      </tr>
    </tbody>
  </table>
</div>`,

        // ─── PRACTICAL EXAMPLE ─────────────────────────────────────────────────
        practical_example: `
<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1c3d6e,#2980b9);color:white;padding:13px 16px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">📌</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario A</div>
      <div style="font-size:14px;font-weight:900">Second Delivery Shift Setup in a Metro DC</div>
    </div>
  </div>
  <div style="border:1px solid #aed6f1;border-top:none;border-radius:0 0 10px 10px;background:#fff;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid #eee">
      <div style="padding:12px 14px;background:#eaf4fc;border-right:1px solid #eee">
        <div style="font-size:10px;font-weight:800;color:#1a6fa8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.6">A Metro DC is overwhelmed with volume and customer demands for faster delivery.</div>
      </div>
      <div style="padding:12px 14px;background:#f0fff4;border-right:1px solid #eee">
        <div style="font-size:10px;font-weight:800;color:#1a5c3a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">Action</div>
        <div style="font-size:13px;color:#222;line-height:1.6">DC initiates a Second Delivery Shift.<br>Morning: <strong>09:00–17:00</strong><br>Evening: <strong>12:00–20:00</strong></div>
      </div>
      <div style="padding:12px 14px;background:#fef9e7">
        <div style="font-size:10px;font-weight:800;color:#b7950b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">Outcome</div>
        <div style="font-size:13px;color:#222;line-height:1.6">DC gets a <strong>Separate Facility ID</strong> and distinct Supervisors / Delivery PAs for accountability separation.</div>
      </div>
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1a5c3a,#1e8449);color:white;padding:13px 16px;border-radius:10px 10px 0 0">
    <span style="font-size:20px">✈️</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">Scenario B</div>
      <div style="font-size:14px;font-weight:900">International Outward Mail Routing via ICH-mapped PO</div>
    </div>
  </div>
  <div style="border:1px solid #a8d5b5;border-top:none;border-radius:0 0 10px 10px;background:#fff;overflow:hidden">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid #eee">
      <div style="padding:12px 14px;background:#f0fff4;border-right:1px solid #eee">
        <div style="font-size:10px;font-weight:800;color:#1a5c3a;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">Situation</div>
        <div style="font-size:13px;color:#222;line-height:1.6">An ICH-mapped post office has International Tracked Packets (ITPS) and Insured items for dispatch.</div>
      </div>
      <div style="padding:12px 14px;background:#eaf4fc;border-right:1px solid #eee">
        <div style="font-size:10px;font-weight:800;color:#1a6fa8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">Action</div>
        <div style="font-size:13px;color:#222;line-height:1.6">The NSH closes <strong>direct bags</strong> for Registered/Insured and ITPS items to the mapped <strong>Foreign Post Office (FPO)</strong>.</div>
      </div>
      <div style="padding:12px 14px;background:#fef9e7">
        <div style="font-size:10px;font-weight:800;color:#b7950b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">Outcome</div>
        <div style="font-size:13px;color:#222;line-height:1.6">Bags dispatched <strong>by Air</strong> (where available), avoiding unnecessary hops in the domestic network.</div>
      </div>
    </div>
  </div>
</div>`,

        // ─── EXAM INSIGHT ──────────────────────────────────────────────────────
        exam_insight: `
<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#7d0000,#c0392b);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    ⚡ Must-Know Exam Facts — Most Asked &amp; Frequently Confused
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #f1948a;border-top:none">
    <thead>
      <tr style="background:#fadbd8">
        <th style="border:1px solid #f1948a;padding:10px 12px;text-align:left;font-size:12px;color:#7d0000;font-weight:800;width:50%">Fact / Common Trap</th>
        <th style="border:1px solid #f1948a;padding:10px 12px;text-align:left;font-size:12px;color:#7d0000;font-weight:800">Correct Answer</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:13px">🔥 <strong>Merger date of Regd. Post into Speed Post</strong></td>
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:14px;font-weight:900;color:#c0392b">01.10.2025</td>
      </tr>
      <tr style="background:#fdf2f2">
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:13px">🔁 <em>"Time limit to declare SP article as lost is 30 days from booking"</em></td>
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:13px;color:#c0392b"><strong>FALSE.</strong> It is <strong>60 days from booking</strong> OR <strong>30 days from complaint receipt</strong> — not 30 days from booking!</td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:13px">⚠️ <em>"Orange Labels are for surface route"</em></td>
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:13px;color:#c0392b"><strong>FALSE.</strong> Orange = Speed Post/Registered (Air &amp; Surface). <strong>Green = Surface ONLY.</strong></td>
      </tr>
      <tr style="background:#fdf2f2">
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:13px">📌 What is a DC with <em>separate buildings</em> for documents &amp; parcels called?</td>
        <td style="border:1px solid #f1948a;padding:9px 12px;font-size:13px;font-weight:900;color:#1a6fa8"><strong>Nodal Delivery Centre</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<div style="margin-bottom:20px">
  <div style="background:linear-gradient(135deg,#1a4a6e,#1a6fa8);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase">
    🧠 Key Distinctions — Compulsory for Exam
  </div>
  <table style="width:100%;border-collapse:collapse;border:1px solid #aed6f1;border-top:none">
    <thead>
      <tr style="background:#d6eaf8">
        <th style="border:1px solid #aed6f1;padding:10px 12px;text-align:left;font-size:12px;color:#1a4a6e;font-weight:800">Concept A</th>
        <th style="border:1px solid #aed6f1;padding:10px 12px;text-align:center;font-size:12px;color:#1a4a6e;font-weight:800">vs.</th>
        <th style="border:1px solid #aed6f1;padding:10px 12px;text-align:left;font-size:12px;color:#1a4a6e;font-weight:800">Concept B</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:10px 12px;font-size:13px">
          <span style="display:inline-block;background:#e67e22;color:white;padding:2px 8px;border-radius:4px;font-weight:900;font-size:12px;margin-bottom:4px">🟠 ORANGE BAG</span><br>
          Speed Post &amp; Registered Articles<br>
          <span style="font-size:12px;color:#555">Air + Surface routes</span>
        </td>
        <td style="border:1px solid #aed6f1;padding:10px 12px;text-align:center;font-weight:900;color:#999;font-size:16px">vs.</td>
        <td style="border:1px solid #aed6f1;padding:10px 12px;font-size:13px">
          <span style="display:inline-block;background:#27ae60;color:white;padding:2px 8px;border-radius:4px;font-weight:900;font-size:12px;margin-bottom:4px">🟢 GREEN BAG</span><br>
          Book Packets, Blind Literature, Periodicals<br>
          <span style="font-size:12px;color:#c0392b;font-weight:700">Surface ONLY</span>
        </td>
      </tr>
      <tr style="background:#eaf4fc">
        <td style="border:1px solid #aed6f1;padding:10px 12px;font-size:13px">
          <strong style="color:#1a6fa8">Integrated DC</strong><br>
          <span style="font-size:12px;color:#555">Parcel &amp; document processing areas are <em>adjacent</em> to each other (same premises)</span>
        </td>
        <td style="border:1px solid #aed6f1;padding:10px 12px;text-align:center;font-weight:900;color:#999;font-size:16px">vs.</td>
        <td style="border:1px solid #aed6f1;padding:10px 12px;font-size:13px">
          <strong style="color:#8e44ad">Nodal DC</strong><br>
          <span style="font-size:12px;color:#555">Processing areas are at a <em>distance</em> from each other — separate buildings/compounds</span>
        </td>
      </tr>
      <tr style="background:#fff">
        <td style="border:1px solid #aed6f1;padding:10px 12px;font-size:13px">
          <strong style="color:#1a5c3a">Mix Staff</strong><br>
          <span style="font-size:12px;color:#555">One postman delivers <em>both</em> documents and parcels in the same beat (low volume)</span>
        </td>
        <td style="border:1px solid #aed6f1;padding:10px 12px;text-align:center;font-weight:900;color:#999;font-size:16px">vs.</td>
        <td style="border:1px solid #aed6f1;padding:10px 12px;font-size:13px">
          <strong style="color:#d35400">Separate Staff</strong><br>
          <span style="font-size:12px;color:#555">One postman ONLY for letters, another ONLY for parcels (justified by high volume)</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#1c3a1c,#27ae60);color:white;padding:14px 18px;border-radius:10px;margin-bottom:20px">
  <div style="font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8;margin-bottom:10px">📌 Ultra-Revision — 60-Second Flash Points</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Regd. Post merger date</span><br>
      <strong style="font-size:16px">01.10.2025</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Lost article comp. paid within</span><br>
      <strong style="font-size:16px">10 days</strong> of declaration
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Mechanized beat max distance</span><br>
      <strong style="font-size:16px">15 km</strong> one-way
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Max deposit time (undelivered)</span><br>
      <strong style="font-size:16px">7 days</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Max delivery attempts</span><br>
      <strong style="font-size:16px">2 attempts</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Second shift timings</span><br>
      <strong style="font-size:16px">12:00 – 20:00 hrs</strong>
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">Metro DC max capacity</span><br>
      <strong style="font-size:16px">8,000 articles/day</strong> (50-80 staff)
    </div>
    <div style="background:rgba(255,255,255,0.12);border-radius:8px;padding:10px 12px;font-size:13px">
      <span style="opacity:0.75;font-size:11px">State capital DC max capacity</span><br>
      <strong style="font-size:16px">5,000 articles/day</strong> (15-60 staff)
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
