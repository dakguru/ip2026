
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
    // DAK SUTRA 1 — BOOK OF BO RULES: ALL FORMS, RECORDS & PRESERVATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Book of Branch Office Rules — Forms, Records & Preservation Guide",
        rule_number: "Rules 5, 7, 8, 9, 19, 20, 21, 22, 36, 37-A, 42, 44, 45, 46, 50",
        act_name: "Book of Branch Office Rules",
        category: "Rule",
        effective_date: new Date("2024-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#1a237e,#283593,#3949ab);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(40,53,147,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">📖 BOOK OF BRANCH OFFICE RULES</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Forms, Records, Registers & Preservation — Complete Reference &nbsp;|&nbsp; BPM's Operational Bible</p>
  </div>

  <!-- SECTION 1: OFFICE NOTICES & LISTS -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Office Notices, Sorting Lists & Due Mail (Rules 5, 7, 8)</h3>

    <p style="margin:0 0 10px;font-size:0.93rem"><strong>Rule 5 — Notice of Hours of Business (Form M-6(c)):</strong> A notice of hours of business in <strong>Form M-6(c)</strong> is supplied to each Branch Office by the <strong>Sub-Divisional Inspector (SDI)</strong>. It must be pasted on a notice board and hung prominently so it is <strong>visible to the public</strong>.</p>

    <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:14px">
      <thead>
        <tr style="background:#2e7d32;color:#fff">
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:left;width:30%">Item (Rule 7)</th>
          <th style="padding:10px 14px;border:1px solid #a5d6a7;text-align:left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Village Sorting List (M-52)</td><td style="border:1px solid #c8e6c9;padding:9px 14px">Lists villages served by each ABPM in <strong>alphabetical order</strong>. Indicates which villages have letter boxes and which have <strong>changeable plates</strong>.</td></tr>
        <tr style="background:#f1f8e9"><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Route List (M-53) & Beat Map</td><td style="border:1px solid #c8e6c9;padding:9px 14px">Accompanied by a map of the beat. Details: route to be followed, days fixed for departure/return, the specific day each village must be visited, and <strong>villages where ABPM may halt</strong>.</td></tr>
        <tr><td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20">Display Requirement</td><td style="border:1px solid #c8e6c9;padding:9px 14px">Village sorting list, copies of route lists, and beat maps must be <strong>hung up in the post office</strong>.</td></tr>
      </tbody>
    </table>

    <p style="margin:0;font-size:0.93rem"><strong>Rule 8 — Due Mail &amp; Sorting Lists:</strong></p>
    <ul style="margin:6px 0 0;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px"><strong>Due Mail List:</strong> Shows bag(s) to be received or dispatched to each office/section and when bags must be accompanied by mail lists.</li>
      <li style="margin-bottom:5px"><strong>Sorting List:</strong> Details articles to be sent in each bag by the Branch Office.</li>
      <li style="margin-bottom:5px">Supplied to every BO in direct communication with <strong>R.M.S.</strong> by Superintendent R.M.S., and every other BO acting as transit/sorting office by Superintendent of Post Offices.</li>
    </ul>
  </div>

  <!-- SECTION 2: SUPERVISION OF DELIVERY STAFF -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">👷 2. Supervision of Delivery Staff (Rule 9)</h3>
    <p style="margin:0 0 10px;font-size:0.93rem">The <strong>Branch Postmaster (BPM)</strong> supervises staff using the following records:</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:28%">Record Name</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:center;width:12%">Form No.</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Postman Book</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-weight:bold;color:#bf360c">MS-27</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Book in which the Postman enters details of articles and <strong>e-Money Orders (eMO)</strong> received from the BPM.</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Village Postman Register</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-weight:bold;color:#bf360c">MS-85</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Register used by Postman to enter article details and eMOs received from the BPM.</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Village Postman Visit Book</td><td style="border:1px solid #ffe0b2;padding:9px 14px;text-align:center;font-weight:bold;color:#bf360c">MS-86</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Visit book where Village Postman enters names of villages visited/to be visited.<br><strong>Red Ink (by BPM):</strong> Villages to be visited on that specific trip.<br><strong>Black Ink (by BPM):</strong> Villages to be visited regularly.</td></tr>
      </tbody>
    </table>
    <div style="background:#fff8f0;border:1px dashed #e65100;border-radius:6px;padding:10px 14px;margin-top:12px;font-size:0.92rem">
      <strong>⚠️ Weight Limit (Rule 9):</strong> Weight of postal articles (including parcels) to be carried by a village postman or extra-departmental delivery agent must <strong>not exceed 10 kg</strong>.
    </div>
  </div>

  <!-- SECTION 3: STAMPS, SEALS & BOOK OF POSTMARKS -->
  <div style="background:#fce4ec;border-left:6px solid #c62828;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.1rem">🔖 3. Stamps, Seals & Book of Postmarks (Rules 11, 19, 20)</h3>

    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 11 — Custody of Cash:</strong> A safe is <strong>not mandatory</strong> for every extra-departmental branch office. It may be provided at the discretion of the <strong>Superintendent of Post Offices</strong> based on a report and recommendation by the S.D.I.</p>

    <p style="margin:8px 0;font-size:0.93rem"><strong>Rule 19 — Stamps &amp; Seals:</strong> Every Branch Office is supplied with a <strong>seal</strong> and the following stamps:</p>
    <ol style="margin:0 0 10px;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px">A combined <strong>name and date stamp</strong> of rectangular shape.</li>
      <li style="margin-bottom:5px">A <strong>postage-due stamp</strong>.</li>
      <li style="margin-bottom:5px">A <strong>number slip name-stamp</strong> (unless the BO does not do independent registration work).</li>
    </ol>
    <ul style="margin:0 0 10px;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px"><strong>Hour Type:</strong> BOs dispatching mails in one direction more than <strong>once a day</strong> get date-stamps containing hour type.</li>
      <li style="margin-bottom:5px"><strong>Usage:</strong> The date stamp must be impressed on every communication addressed by the BPM to the Superintendent or S.D.I., in addition to other required stamps.</li>
    </ul>

    <p style="margin:8px 0;font-size:0.93rem"><strong>Rule 20 — Book of Postmarks (MS-18):</strong> A Book of Postmarks in <strong>Form MS-18</strong> must be maintained in every Branch Office.</p>
    <ul style="margin:0;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px"><strong>Daily Procedure:</strong> Impressions of all stamps holding date/movable type and the seal (if containing movable type) must be taken <strong>daily before use</strong>.</li>
      <li style="margin-bottom:5px"><strong>Verification:</strong> The BPM must ensure impressions are distinct and clear, <strong>initialing the book every day</strong> after all impressions are taken.</li>
    </ul>
  </div>

  <!-- SECTION 4: RECORDS PRESERVATION -->
  <div style="background:#e8eaf6;border-left:6px solid #283593;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1a237e;margin:0 0 14px;font-size:1.1rem">🗄️ 4. Preservation of Books & Forms (Rules 21, 44)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#283593;color:#fff">
          <th style="padding:10px 14px;border:1px solid #9fa8da;text-align:left;width:22%">Period</th>
          <th style="padding:10px 14px;border:1px solid #9fa8da;text-align:left">Records</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e;font-size:1.05rem">3 Years</td><td style="border:1px solid #c5cae9;padding:9px 14px">BO Account (<strong>PA-6</strong>) and BO Journal (<strong>PA-5</strong>).</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e;font-size:1.05rem">2 Years</td><td style="border:1px solid #c5cae9;padding:9px 14px">Book of Receipt (<strong>MS-87(a)</strong>), registered lists, parcel lists, and mail lists.</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#c62828">Disposal</td><td style="border:1px solid #c5cae9;padding:9px 14px">Postman's book of receipt (<strong>MS-87</strong>), Book of Postmarks (<strong>MS-18</strong>), and Registered Journal (<strong>RP-51</strong>) should be destroyed by <strong>shredding in the BPM's presence</strong> to prevent reuse.</td></tr>
        <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">3 Years</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>Branch Office Circulars (Rule 44):</strong> Destroyed after 3 years from the month of April following the close of the official year in which they were issued.</td></tr>
        <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#1a237e">3 Years</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>Leave Applications (Rule 50):</strong> Prepared in <strong>Form App-45</strong> in <strong>4 copies</strong>, submitted to ASPOs/SDI. Preserved for <strong>3 years</strong> after the BPM's service ends.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 5: COMPLAINT, ORDER BOOK & RECEIPTS -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">📒 5. Key Registers — Receipt, Error, Complaint & Order Books (Rules 22, 36, 37-A, 42)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left;width:22%">Register / Form</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Key Facts</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Book of Receipts<br><span style="color:#6a1b9a">MS-87(a)</span></td><td style="border:1px solid #e1bee7;padding:9px 14px">Issues receipts to: senders of insured or V.P. articles (letter or parcel mail), remitters of Money Orders, P.L.I. policyholders for premium payments, payers of telegraph charges realized in cash. Each receipt bears a <strong>printed serial number</strong> assigned to the article or money order.</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Error Book<br><span style="color:#6a1b9a">MS-2</span></td><td style="border:1px solid #e1bee7;padding:9px 14px">A <strong>permanent record</strong> of all irregularities — whether serious or petty. Scope: Includes irregularities by office staff or noticed from other offices (e.g., mis-sending/misdirection of articles).</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Complaint/Suggestion Book<br><span style="color:#6a1b9a">MS-94</span></td><td style="border:1px solid #e1bee7;padding:9px 14px">Must be maintained by all Branch Post Offices. Kept in a <strong>conspicuous place</strong>, easily accessible to the public without them having to ask. Public can record complaints/suggestions in <strong>duplicate using a carbonic process</strong>.</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Post Office Order Book<br><span style="color:#6a1b9a">MS-8</span></td><td style="border:1px solid #e1bee7;padding:9px 14px">Used by <strong>inspecting officers</strong> to record remarks and orders. BPM is <strong>personally responsible</strong> for promptly taking action. Contains <strong>200 serially numbered pages</strong> — willful removal of a page is a serious offense liable for removal from service. It is a <strong>permanent record</strong> and may NOT be destroyed without Superintendent's special permission.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 6: RETURNS & REPORTS -->
  <div style="background:#e0f7fa;border-left:6px solid #00695c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 14px;font-size:1.1rem">📊 6. Returns & Reports (Rules 45, 46)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#00695c;color:#fff">
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left;width:28%">Return</th>
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold">Half-Yearly Enumeration Return<br><span style="color:#00695c">MS-6 | Rule 45</span></td>
          <td style="border:1px solid #b2dfdb;padding:9px 14px">
            <strong>Timing:</strong> Conducted in the <strong>second week of February and August</strong> each year (<strong>8th to 21st</strong>, inclusive).<br>
            <strong>Submission:</strong> Copy forwarded to Account Office by the mail of the <strong>15th</strong>.<br>
            <strong>Data:</strong> Counts of ordinary unregistered letters, unregistered parcels delivered by postmen/village postmen/agents, and window delivery. <em>Service articles counted separately.</em>
          </td>
        </tr>
        <tr style="background:#e0fafa">
          <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold">Yearly Village Return<br><span style="color:#00695c">MS-88 | Rule 46</span></td>
          <td style="border:1px solid #b2dfdb;padding:9px 14px">
            <strong>Timing:</strong> Maintained during the <strong>first 14 days of March</strong> each year (<strong>1st to 14th</strong>, inclusive).<br>
            <strong>Scope:</strong> Records all articles (including money orders) received daily for delivery in each village.<br>
            <strong>Submission:</strong> Totaled, signed by the BPM, and forwarded to ASPOs/SDI on the <strong>15th</strong> of the month.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8eaf6,#f3e5f5);border:1.5px solid #283593;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1a237e;margin:0 0 10px">🧠 Guru's Master Framework — "NSRP-OCR"</h3>
    <p style="margin:0">Remember BO Rules in 7 blocks: <strong>N</strong>otices → <strong>S</strong>orting Lists → <strong>R</strong>ecords/Registers → <strong>P</strong>reservation → <strong>O</strong>rder Book → <strong>C</strong>omplaint Book → <strong>R</strong>eturns. Each block has signature numbers that examiners love to test.</p>
  </div>

  <h4 style="color:#1a237e;border-bottom:2px solid #1a237e;padding-bottom:4px">🎯 The Critical Numbers You MUST Memorise</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#1a237e;color:#fff">
        <th style="padding:9px 14px;border:1px solid #9fa8da">Topic</th>
        <th style="padding:9px 14px;border:1px solid #9fa8da">Key Number / Fact</th>
        <th style="padding:9px 14px;border:1px solid #9fa8da">Rule</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">Hours of Business Notice Form</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">M-6(c) — supplied by SDI</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 5</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Village Sorting List</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">M-52 (alphabetical, letter boxes, changeable plates)</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 7</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">Route List & Beat Map</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">M-53 (route, schedule, halts)</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 7</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Postman Book</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">MS-27</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 9</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">Village Postman Register</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">MS-85</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 9</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Village Postman Visit Book</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">MS-86 (Red ink = specific trip | Black ink = regular)</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 9</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">Max weight — delivery staff</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#c62828">10 kg</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 9</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Book of Postmarks</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">MS-18 | Impressions taken DAILY before use</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 20</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">BO Account preservation</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">3 Years (PA-6 and PA-5)</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 21</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Book of Receipt preservation</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">2 Years (MS-87(a))</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 21</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">Records destroyed by shredding</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#c62828">MS-87, MS-18, RP-51 — in BPM's presence</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 21</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Order Book (MS-8)</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">200 serially numbered pages | Permanent record</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 42</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">Branch Office Circulars</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">Destroyed after 3 years from April after close of official year</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 44</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Half-Yearly Enumeration (MS-6)</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">8th–21st of February & August | Submit copy by 15th</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 45</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:8px 14px">Yearly Village Return (MS-88)</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">1st–14th March | Submit to ASPOs/SDI by 15th</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 46</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:8px 14px">Leave Application (App-45)</td><td style="border:1px solid #c5cae9;padding:8px 14px;font-weight:bold;color:#1a237e">4 copies | Preserved 3 years after BPM's service ends</td><td style="border:1px solid #c5cae9;padding:8px 14px">Rule 50</td></tr>
    </tbody>
  </table>

  <div style="background:#fff3e0;border:1.5px solid #ef6c00;border-radius:10px;padding:16px 20px;margin-top:4px">
    <h4 style="color:#e65100;margin:0 0 10px">⚡ Common Exam Traps — BO Rules (Forms & Records)</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>MS-18 impressions are taken DAILY BEFORE USE</strong> — not after, not weekly. BPM must initial the book daily.</li>
      <li style="margin-bottom:7px"><strong>Red ink vs Black ink in MS-86:</strong> Red = <em>specific trip</em> (written by BPM); Black = <em>regular visit</em> (written by BPM). Both are written by the BPM, not the postman.</li>
      <li style="margin-bottom:7px"><strong>PA-6 (BO Account) preserved for 3 years</strong>, but MS-87(a) (Book of Receipts) preserved for only <strong>2 years</strong>.</li>
      <li style="margin-bottom:7px"><strong>MS-8 (Order Book)</strong> has exactly <strong>200 pages</strong> and CANNOT be destroyed without Superintendent's special permission — it is a permanent record.</li>
      <li style="margin-bottom:7px">Half-yearly return is 8th to <strong>21st</strong> (inclusive) — not 20th, not 22nd. <strong>15th</strong> is the submission deadline.</li>
      <li style="margin-bottom:7px">Yearly Village Return covers first <strong>14 days of March</strong> — forward to SDI/ASPO by the <strong>15th</strong>.</li>
      <li style="margin-bottom:7px">Leave applications are prepared in <strong>4 copies</strong> on Form <strong>App-45</strong> — not 3, not 2.</li>
    </ul>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practice Scenarios — BO Rules (Forms & Records)</h4>
  <p><strong>Q1.</strong> A BPM wants to dispose of the Branch Office's old MS-18 (Book of Postmarks). What is the correct procedure?<br>→ It must be <strong>destroyed by shredding in the BPM's presence</strong> to prevent reuse (Rule 21).</p>
  <p><strong>Q2.</strong> An inspecting officer finds that a page is missing from the Post Office Order Book (MS-8). What is the consequence?<br>→ Willful removal of a page from MS-8 is a <strong>serious offense liable for removal from service</strong> (Rule 42).</p>
  <p><strong>Q3.</strong> A Village Postman is assigned to visit Village X on every alternate day (routine) and Village Y specifically on this Friday. How does the BPM enter this in MS-86?<br>→ Village Y (specific trip) is written in <strong>Red Ink</strong>; Village X (regular) is written in <strong>Black Ink</strong> (Rule 9).</p>
  <p><strong>Q4.</strong> An extra-departmental BPM applies for leave. In how many copies and in which form must the leave application be submitted?<br>→ <strong>4 copies</strong> in <strong>Form App-45</strong>, submitted to ASPOs/SDI (Rule 50).</p>
  <p><strong>Q5.</strong> During what period must the Half-Yearly Enumeration Return be conducted, and when must a copy reach the Account Office?<br>→ Conducted from <strong>8th to 21st of February and August</strong>; copy forwarded to Account Office by the mail of the <strong>15th</strong> (Rule 45).</p>
  <p><strong>Q6.</strong> For how long must BO Account (PA-6) be preserved? And BO Journal (PA-5)?<br>→ Both must be preserved for <strong>3 years</strong> (Rule 21).</p>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 BO Rules (Part 1) — Rapid Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>R.5 — Hours of Business:</strong> Form M-6(c) | Supplied by SDI | Displayed publicly</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>R.7 — Lists:</strong> Village Sorting List = M-52 (alphabetical) | Route List & Beat Map = M-53 | All displayed in PO</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>R.9 — Delivery Supervision:</strong> MS-27 (Postman Book) | MS-85 (VP Register) | MS-86 (VP Visit Book: Red=specific, Black=regular) | Max weight = 10 kg</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>R.19 — Stamps:</strong> 3 stamps: (1) Name+Date stamp (rectangular) (2) Postage-due stamp (3) Number slip name-stamp | Hour type if dispatch >1/day</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>R.20 — Book of Postmarks:</strong> MS-18 | Impressions DAILY BEFORE USE | BPM initials daily</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #283593"><strong>R.21 — Preservation:</strong> PA-5 & PA-6 = 3 Years | MS-87(a), Regd lists, Parcel lists, Mail lists = 2 Years | MS-87, MS-18, RP-51 = SHREDDED in BPM's presence</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>R.36 — Error Book (MS-2):</strong> Permanent record of all irregularities (serious + petty)</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>R.37-A — MS-94:</strong> Complaint/Suggestion Book | Public access (conspicuous place) | Duplicate carbonic process</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #4a148c"><strong>R.42 — MS-8 Order Book:</strong> 200 serially numbered pages | Permanent record | Cannot destroy without Supt. permission | Page removal = removal from service</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>R.45 — MS-6 (Half-Yearly):</strong> 8th–21st February & August | Copy to AO by 15th</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>R.46 — MS-88 (Yearly Village):</strong> 1st–14th March | Signed by BPM | To SDI by 15th</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>R.50 — Leave:</strong> Form App-45 | 4 copies | 3 years after service ends</div>
    </div>
  </div>
</div>`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA 2 — BOOK OF BO RULES: MAIL HANDLING, REGISTRATION & ACCOUNTS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Book of Branch Office Rules — Mail Handling, Registration & Accounts",
        rule_number: "Rules 53, 59, 62, 64, 65, 66, 67, 77, 79, 80, 85, 93, 94, 124, 129, 130, 134",
        act_name: "Book of Branch Office Rules",
        category: "Rule",
        effective_date: new Date("2024-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#004d40,#00695c,#00897b);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(0,105,92,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">📬 BOOK OF BRANCH OFFICE RULES</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Mail Handling · Registration & Insurance · Accounts & Remittances — Complete Operational Guide</p>
  </div>

  <!-- SECTION 1: TAMPERED BAGS & LETTER BOX CLEARANCE -->
  <div style="background:#fce4ec;border-left:6px solid #c62828;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.1rem">🔐 1. Tampered Bags & Letter Box Clearance (Rules 53, 59)</h3>

    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 53 — Bags Received with Signs of Tampering:</strong> If a bag is found with missing cash/articles or signs of tampering:</p>
    <ol style="margin:0 0 12px;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px">Report immediately to the <strong>Superintendent</strong> and the <strong>dispatching office/section</strong>.</li>
      <li style="margin-bottom:5px">Preserve the bag and label (without detaching the seal/cord). Mark them with <strong>initials and the date stamp</strong>.</li>
      <li style="margin-bottom:5px">Record the irregularity in the <strong>Error Book</strong>.</li>
    </ol>

    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 59 — Clearance of Letter-Boxes:</strong></p>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#c62828;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ef9a9a;text-align:left;width:30%">Aspect</th>
          <th style="padding:10px 14px;border:1px solid #ef9a9a;text-align:left">Rule</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#880e4f">Clearance Time</td><td style="border:1px solid #ffcdd2;padding:9px 14px">At hours fixed by the <strong>ASPOs/SDI</strong>.</td></tr>
        <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#880e4f">Paid Articles</td><td style="border:1px solid #ffcdd2;padding:9px 14px">Articles intended for delivery from the branch office itself should be <strong>delivered immediately</strong>.</td></tr>
        <tr><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#880e4f">Sorting</td><td style="border:1px solid #ffcdd2;padding:9px 14px">All other articles are sorted according to the sorting list or set aside for dispatch to the Account Office.</td></tr>
        <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#880e4f">Stamping Rule</td><td style="border:1px solid #ffcdd2;padding:9px 14px">Unregistered articles received in sorting for dispatch must <strong>NOT</strong> be stamped by the Branch Office.</td></tr>
        <tr><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#880e4f">Invalid Stamps</td><td style="border:1px solid #ffcdd2;padding:9px 14px">Non-Indian postage stamps cannot be accepted and should <strong>not be defaced</strong>.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 2: UNPAID ARTICLES, CHECK SLIPS & BUNDLES -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">📦 2. Unpaid Articles, Check Slips & Labelled Bundles (Rules 62, 64, 65)</h3>

    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 62 — Unpaid and Insecure Articles:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px"><strong>Action:</strong> Open or insecure inland articles found in the letter-box or sorting must be <strong>securely closed</strong>.</li>
      <li style="margin-bottom:5px"><strong>Taxing:</strong> Stamp with "Postage Due" if unpaid/insufficiently paid. Note the amount due before forwarding.</li>
      <li style="margin-bottom:5px"><strong>Accounting:</strong> Do NOT credit the unpaid postage amount in the BO Account or Journal (<strong>PA-5</strong>).</li>
      <li style="margin-bottom:5px"><strong>Foreign Post:</strong> An article received by foreign post must <strong>never</strong> be taxed with postage by the branch office.</li>
    </ul>

    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 64 — Check Slips (MS-10):</strong> A check slip is a label tied to the top of labeled bundles.</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:12px">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:20%">Colour</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Used For</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold;color:#bf360c">🩷 Pink</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Ordinary Station Paid and Unpaid Bundle</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold;color:#bf360c">⬜ White</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Ordinary Sorting Bundle (used for both <strong>Express and Deferred</strong>). <em>Note: Two diagonal blue lines indicate an Express bundle.</em></td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold;color:#1565c0">🟦 Blue (with "Air Mail")</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Foreign air mail bundles</td></tr>
      </tbody>
    </table>

    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 65 — Labelled Bundles:</strong></p>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#bf360c;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:28%">Bundle Type</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Definition & Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Station Bundle</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Contains unregistered articles for a particular station. Prepared when articles number <strong>15 or more</strong>.</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Sorting Bundle</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Contains unregistered articles for <strong>many stations</strong>.</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Territorial Bundle</td><td style="border:1px solid #ffe0b2;padding:9px 14px">A sorting bundle prepared for a specific state or tract of country. Prepared when articles number <strong>25 or more</strong>.</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Express Bundle</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Requires <strong>immediate sorting</strong> upon receipt.</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Deferred Bundle</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Can be <strong>disposed of later</strong>.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: DELIVERY OF UNREGISTERED ARTICLES -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📮 3. Delivery & Postage Taxing (Rules 66, 67)</h3>
    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 66 — Delivery of Unregistered Articles:</strong></p>
    <ul style="margin:0 0 10px;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px"><strong>Stamping:</strong> Unregistered articles received for delivery must be date-stamped on the <strong>back</strong> (except postcards, which are stamped on the <strong>address side</strong>).</li>
      <li style="margin-bottom:5px"><strong>Redirection:</strong> If given to a village postman/agent for delivery outside the town/village, they must be <strong>stamped again</strong>.</li>
      <li style="margin-bottom:5px"><strong>Postage Due:</strong> Amounts due on unpaid articles must be entered in the <strong>BO Journal (PA-5)</strong>.</li>
      <li style="margin-bottom:5px"><strong>Foreign Post:</strong> An article received by foreign post must <strong>never</strong> be taxed with postage by the branch office.</li>
    </ul>
    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Rule 67 — Postage Taxing at Branch Office:</strong></p>
    <ul style="margin:0;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:5px">BPM must properly tax all unpaid/insufficiently paid unregistered articles <strong>posted at the BO and intended for local delivery</strong>.</li>
      <li style="margin-bottom:5px"><strong>Registered Newspapers:</strong> The office of posting is responsible for correct postage. The office of delivery should generally not challenge this unless <strong>negligence is suspected</strong>, in which case a report is made to the Superintendent.</li>
    </ul>
  </div>

  <!-- SECTION 4: REGISTRATION & INSURANCE -->
  <div style="background:#e8eaf6;border-left:6px solid #283593;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1a237e;margin:0 0 14px;font-size:1.1rem">📜 4. Registration, Insurance & Acknowledgement (Rules 77, 79, 80, 85, 93, 94)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#283593;color:#fff">
          <th style="padding:10px 14px;border:1px solid #9fa8da;text-align:left;width:22%">Rule / Form</th>
          <th style="padding:10px 14px;border:1px solid #9fa8da;text-align:left">Key Points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold">Registered Journal<br><span style="color:#283593">RP-51 | Rule 77</span></td>
          <td style="border:1px solid #c5cae9;padding:9px 14px">Records receipts given to senders of ordinary registered articles (excluding V.P. and insured). Contains <strong>200 receipts</strong> with printed serial numbers running from <strong>1 to 200</strong>.</td>
        </tr>
        <tr style="background:#f5f5ff">
          <td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold">Registered & Parcel Lists<br><span style="color:#283593">Rule 79</span></td>
          <td style="border:1px solid #c5cae9;padding:9px 14px">Registered List: <strong>Form RP-32</strong>. Parcel List: <strong>Form RP-3</strong>. Corrections to entry numbers or office of posting must be <strong>initialed by BPM</strong>. <strong>No correction is allowed in the total</strong> — if total is incorrect, the list must be destroyed and a fresh one prepared.</td>
        </tr>
        <tr>
          <td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold">Acknowledgement<br><span style="color:#283593">Rule 80</span></td>
          <td style="border:1px solid #c5cae9;padding:9px 14px">Registered articles addressed to a foreign country requiring an acknowledgement must be clearly marked with <strong>"Avis de reception"</strong>.</td>
        </tr>
        <tr style="background:#f5f5ff">
          <td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold">Registered Articles in Letter Box<br><span style="color:#283593">Rule 85</span></td>
          <td style="border:1px solid #c5cae9;padding:9px 14px">If an inland article marked "Registered" is found in the letter box, it must be <strong>registered immediately</strong>. If not fully prepaid, charge a fee equal to <strong>double the usual registration fee</strong> plus the postage due.</td>
        </tr>
        <tr>
          <td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold">Conditions of Insurance<br><span style="color:#283593">Rule 93</span></td>
          <td style="border:1px solid #c5cae9;padding:9px 14px">Registered letters and parcels (including V.P.) may be insured at a Branch Office up to the value of <strong>Rs. 600</strong> for authorized offices.</td>
        </tr>
        <tr style="background:#f5f5ff">
          <td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold">Insured Articles<br><span style="color:#283593">Rule 94</span></td>
          <td style="border:1px solid #c5cae9;padding:9px 14px">Consult <em>Post Office Guide Volume III</em> to verify if destination office accepts insured articles (ensure no symbol "B" or "L" indicates restriction). Acknowledgements for inland insured letters (<strong>RP-54</strong>) are <strong>free</strong>. Foreign insured letters require a special fee if acknowledgement is requested.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 5: ACCOUNTS & REMITTANCES -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">💰 5. Accounts, Remittances & BO Daily Account (Rules 124, 129, 130, 134)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left;width:28%">Rule / Form</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Key Points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Branch Office Account<br><span style="color:#6a1b9a">PA-6 | Rule 124</span></td>
          <td style="border:1px solid #e1bee7;padding:9px 14px">
            Records monetary transactions between BO and Account Office.<br>
            <strong>Exclusion:</strong> Cash realized from postage collections must <strong>never</strong> be included in "Cash collected".<br>
            <strong>V.P. Articles:</strong> Amounts collected for V.P. articles delivered are credited under <strong>"Money orders issued"</strong>.<br>
            <strong>Reply Coupons:</strong> Value of stamps exchanged for reply-coupons is shown under <strong>"Unclassified payments"</strong>.
          </td>
        </tr>
        <tr style="background:#faf5ff">
          <td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Monthly Abstract in B.O. Bag<br><span style="color:#6a1b9a">PA-7 | Rule 129</span></td>
          <td style="border:1px solid #e1bee7;padding:9px 14px">The B.O. bag closed on the <strong>1st of each month</strong> must contain the <strong>Abstract of Monetary Transactions</strong> for the entire preceding month. This abstract is submitted in <strong>Form PA-7</strong>.</td>
        </tr>
        <tr>
          <td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Remittances Sent Through Post<br><span style="color:#6a1b9a">Rule 130</span></td>
          <td style="border:1px solid #e1bee7;padding:9px 14px">
            <strong>Cloth Bags:</strong> Used for remittances of <strong>currency notes only</strong>, up to <strong>Rs. 500</strong>.<br>
            <strong>Leather Cash Bags:</strong> Used for remittances <strong>including coins</strong> or exceeding <strong>Rs. 500</strong>.
          </td>
        </tr>
        <tr style="background:#faf5ff">
          <td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">BO Daily Account<br><span style="color:#6a1b9a">ACG-22(a) | Rule 134</span></td>
          <td style="border:1px solid #e1bee7;padding:9px 14px">
            Entries from BO Account are copied into BO Daily Account (<strong>ACG-22(a)</strong>).<br>
            <strong>Nil Transactions:</strong> On days with no monetary transaction, submit the account in form <strong>ACG-22(c)</strong> instead of ACG-22(a).
          </td>
        </tr>
      </tbody>
    </table>

    <div style="background:#faf5ff;border:1px dashed #6a1b9a;border-radius:6px;padding:10px 14px;margin-top:12px;font-size:0.92rem">
      <strong>Account Office Documents (Chapter 9):</strong><br>
      • <strong>B.O. Slip (PA-4):</strong> Primary communication and accounting slip sent from Account Office to Branch Office.<br>
      • <strong>B.O. Summary (ACG-3(a)):</strong> Summary document prepared at Account Office to consolidate and record daily transactions of the Branch Office.
    </div>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e0f7fa,#e8f5e9);border:1.5px solid #00695c;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 10px">🧠 Guru's Master Framework — "TUBE-RAIDS"</h3>
    <p style="margin:0">Remember Part 2 of BO Rules in 10 blocks: <strong>T</strong>ampering → <strong>U</strong>npaid articles → <strong>B</strong>undles → <strong>E</strong>xpress/Deferred → <strong>R</strong>egistration → <strong>A</strong>cknowledgement → <strong>I</strong>nsurance → <strong>D</strong>aily Accounts → <strong>S</strong>orting. Each block has signature numbers/rules that examiners frequently test.</p>
  </div>

  <h4 style="color:#004d40;border-bottom:2px solid #00695c;padding-bottom:4px">🎯 The Critical Numbers You MUST Memorise</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#00695c;color:#fff">
        <th style="padding:9px 14px;border:1px solid #80cbc4">Topic</th>
        <th style="padding:9px 14px;border:1px solid #80cbc4">Key Number / Fact</th>
        <th style="padding:9px 14px;border:1px solid #80cbc4">Rule</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Check Slip — Pink</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Ordinary Station Paid & Unpaid Bundle</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 64</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Check Slip — White</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Ordinary Sorting Bundle (Express + Deferred) | Two diagonal blue lines = Express</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 64</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Check Slip — Blue ("Air Mail")</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Foreign air mail bundles</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 64</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Station Bundle threshold</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">15 articles or more</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 65</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Territorial Bundle threshold</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">25 articles or more</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 65</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Unregistered article stamping (delivery)</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Date-stamp on BACK | Postcard: stamp on address side</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 66</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Postage due entry</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Entered in BO Journal (PA-5)</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 66</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Foreign post taxing</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#c62828">NEVER taxed with postage by BO</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 66</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Registered Journal (RP-51)</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">200 receipts | Serial numbers 1 to 200</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 77</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Registered List Form</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">RP-32</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 79</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Parcel List Form</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">RP-3</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 79</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Total correction in Regd/Parcel List</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#c62828">NOT allowed — destroy & prepare fresh</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 79</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Acknowledgement marking (foreign)</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">"Avis de reception"</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 80</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Registered article found in letter box</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Register immediately | Penalty: Double registration fee + postage due</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 85</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Insurance limit at BO</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Rs. 600 (for authorized offices)</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 93</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Inland insured letter acknowledgement</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">RP-54 | FREE for inland</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 94</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">V.P. amounts collected</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Credited under "Money orders issued" in PA-6</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 124</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Monthly Abstract form</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">PA-7 | In BO bag closed on 1st of each month</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 129</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Cloth bag remittance limit</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Currency notes only | Up to Rs. 500</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 130</td></tr>
      <tr style="background:#e0fafa"><td style="border:1px solid #b2dfdb;padding:8px 14px">Leather cash bag</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">Coins included OR exceeding Rs. 500</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 130</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px 14px">Nil transaction day form</td><td style="border:1px solid #b2dfdb;padding:8px 14px;font-weight:bold;color:#004d40">ACG-22(c) instead of ACG-22(a)</td><td style="border:1px solid #b2dfdb;padding:8px 14px">Rule 134</td></tr>
    </tbody>
  </table>

  <div style="background:#fff3e0;border:1.5px solid #ef6c00;border-radius:10px;padding:16px 20px;margin-top:4px">
    <h4 style="color:#e65100;margin:0 0 10px">⚡ Common Exam Traps — BO Rules (Mail Handling & Accounts)</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>Station Bundle</strong> requires ≥ 15 articles; <strong>Territorial Bundle</strong> requires ≥ 25 articles — don't mix these up.</li>
      <li style="margin-bottom:7px"><strong>White check slip</strong> is used for BOTH Express and Deferred bundles. The distinction: two <em>diagonal blue lines</em> = Express.</li>
      <li style="margin-bottom:7px"><strong>Unregistered articles for dispatch must NOT be stamped</strong> by the Branch Office (Rule 59) — only articles for local delivery are date-stamped.</li>
      <li style="margin-bottom:7px"><strong>Postcard stamping</strong> is on the <em>address side</em>; all other unregistered articles are stamped on the <strong>back</strong>.</li>
      <li style="margin-bottom:7px"><strong>"Registered" article found in letter box</strong> — the penalty is DOUBLE the registration fee, not just the ordinary fee.</li>
      <li style="margin-bottom:7px"><strong>Cloth bag</strong> = only currency notes, up to Rs. 500. As soon as there are <em>coins</em> or the amount exceeds Rs. 500 → use <strong>Leather Cash Bag</strong>.</li>
      <li style="margin-bottom:7px"><strong>V.P. collections</strong> go under "Money orders issued" in PA-6 — NOT under "Cash collected". Postage collections also never go under "Cash collected".</li>
      <li style="margin-bottom:7px">On a day with <strong>no monetary transactions</strong>, submit <strong>ACG-22(c)</strong> (Nil form), not ACG-22(a).</li>
      <li style="margin-bottom:7px">Corrections to <strong>totals</strong> in Registered/Parcel Lists are strictly prohibited — destroy and prepare a fresh list.</li>
    </ul>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#004d40;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practice Scenarios — BO Rules (Mail Handling & Accounts)</h4>
  <p><strong>Q1.</strong> A Branch Office receives a bag with the cord broken and some articles missing. What are the three steps the BPM must take?<br>→ (1) Report immediately to the <strong>Superintendent and dispatching office</strong>. (2) <strong>Preserve the bag and label</strong> without detaching seal/cord, mark with initials and date stamp. (3) Record the irregularity in the <strong>Error Book</strong> (Rule 53).</p>
  <p><strong>Q2.</strong> During sorting, the BPM finds 30 unregistered articles destined for Delhi. Should a Station Bundle or Territorial Bundle be prepared?<br>→ Since there are 30 articles (≥15) for a particular station (Delhi), prepare a <strong>Station Bundle</strong>. A Territorial Bundle would require ≥ 25 articles for a specific state/territory (Rule 65).</p>
  <p><strong>Q3.</strong> A postcard is received at the Branch Office for delivery. On which side must the date stamp be applied?<br>→ On the <strong>address side</strong> (postcards are the exception; all other unregistered articles are stamped on the back) (Rule 66).</p>
  <p><strong>Q4.</strong> An inland article marked "Registered" is found in the letter box. It has insufficient postage. What action must the BPM take and what penalty applies?<br>→ The BPM must <strong>register it immediately</strong>. Penalty: charge equal to <strong>double the usual registration fee</strong> plus the postage due (Rule 85).</p>
  <p><strong>Q5.</strong> A Branch Office remits Rs. 350/- in currency notes only to the Account Office. What type of bag should be used?<br>→ A <strong>Cloth Bag</strong> — it contains only currency notes and the amount is within Rs. 500 (Rule 130).</p>
  <p><strong>Q6.</strong> On a particular Sunday, there are no monetary transactions at the BO. What form must be submitted to the Account Office?<br>→ <strong>ACG-22(c)</strong> (BO Daily Account — Nil) must be submitted instead of ACG-22(a) (Rule 134).</p>
  <p><strong>Q7.</strong> The BPM realizes the total of a Registered List (RP-32) is incorrect. What should he do?<br>→ He must <strong>destroy the list and prepare a fresh one</strong>. No correction is allowed in the total of entries (Rule 79).</p>
  <p><strong>Q8.</strong> A customer wants an acknowledgement for an inland insured letter. What form is used and what is the fee?<br>→ Form <strong>RP-54</strong>. The acknowledgement for inland insured letters is <strong>FREE</strong> (Rule 94).</p>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:#e0f7fa;border-left:5px solid #00695c;padding:14px 20px;border-radius:8px">
    <h4 style="color:#004d40;margin:0 0 12px">📝 BO Rules (Part 2) — Rapid Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>R.53 — Tampered Bag:</strong> Report to Supt. + dispatching office | Preserve bag & label (no detach) | Mark initials + date | Enter in Error Book</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>R.59 — Letter Box Clearance:</strong> Hours fixed by ASPOs/SDI | Paid articles → deliver immediately | Unregd for dispatch → NOT stamped by BO | Non-Indian stamps → don't deface</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #bf360c"><strong>R.62 — Unpaid Articles:</strong> Insecure → securely close | Stamp "Postage Due" | Don't credit in PA-5 | Foreign post → NEVER tax</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>R.64 — Check Slips (MS-10):</strong> Pink = Station (Paid/Unpaid) | White = Sorting (Express+Deferred; 2 blue diagonal lines = Express) | Blue "Air Mail" = Foreign air mail</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>R.65 — Bundles:</strong> Station = ≥15 articles (one station) | Sorting = many stations | Territorial = ≥25 articles (state/tract) | Express = immediate sorting | Deferred = later</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>R.66 — Delivery:</strong> Stamp on BACK | Postcard → address side | Redirected → stamp again | Postage due → enter in PA-5 | Foreign → NEVER tax</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #283593"><strong>R.77 — Registered Journal (RP-51):</strong> For ordinary registered (not VP/insured) | 200 receipts | Serial 1–200</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>R.79 — Lists:</strong> Regd List = RP-32 | Parcel List = RP-3 | BPM initials corrections | Total wrong → destroy + fresh list (no corrections in total)</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>R.80/85:</strong> Foreign regd acknowledgement = "Avis de reception" | "Registered" in letter box → register immediately + double fee + postage due</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>R.93/94 — Insurance:</strong> BO insurance limit = Rs. 600 | Inland insured ack (RP-54) = FREE | Foreign ack = special fee | Check PO Guide Vol.III (no B/L symbol)</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #4a148c"><strong>R.124 — PA-6 (BO Account):</strong> VP collections → "Money orders issued" | Reply coupons → "Unclassified payments" | Postage collection → NEVER in "Cash collected"</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>R.129 — PA-7:</strong> Monthly Abstract | In BO bag closed on 1st of each month | Covers entire preceding month</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>R.130 — Remittances:</strong> Cloth bag = currency notes only, ≤ Rs. 500 | Leather cash bag = coins OR > Rs. 500</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>R.134 — Daily Account:</strong> Normal day = ACG-22(a) | Nil transactions = ACG-22(c) | AO documents: PA-4 (BO Slip), ACG-3(a) (BO Summary)</div>
    </div>
  </div>
</div>`
    }

];

async function seed() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        // Generate unique slugs
        function generateSlug(length = 6) {
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
            return result;
        }

        for (const entry of entries) {
            // Ensure unique slug
            let slug;
            let slugExists = true;
            while (slugExists) {
                slug = generateSlug();
                const existing = await collection.findOne({ slug });
                if (!existing) slugExists = false;
            }

            const doc = {
                ...entry,
                slug,
                createdAt: now,
                updatedAt: now,
            };

            const result = await collection.insertOne(doc);
            console.log(`✅ Inserted: "${entry.title}" → ID: ${result.insertedId} | Slug: ${slug}`);
        }

        console.log('\n🎉 All Book of BO Rules Dak Sutras seeded successfully!');
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();
    }
}

seed();
