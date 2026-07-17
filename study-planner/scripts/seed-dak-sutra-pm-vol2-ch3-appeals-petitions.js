/**
 * Seed: Dak Sutra — Postal Manual Volume II, Chapter 3 (Appeals & Petitions, Rules 115–122)
 * Source: DakSutra_PMVol2_Ch3_AppealsPetitions.docx (verified as on 13 July 2026)
 * Run: node scripts/seed-dak-sutra-pm-vol2-ch3-appeals-petitions.js
 */

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

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
function generateSlug(length = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return result;
}

const entries = [

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA — PM VOL II, CHAPTER 3: APPEALS & PETITIONS (RULES 115–122)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Appeals & Petitions — Representation against an Order (Rules 115–122)",
        rule_number: "Chapter 3 — Postal Manual Vol II (Rules 115–122)",
        act_name: "Postal Manual Volume II",
        category: "Rule",
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(21,101,192,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">📨 APPEALS &amp; PETITIONS</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Rules 115–122 — Representation against an Order &nbsp;|&nbsp; Chapter 3, Postal Manual Volume II</p>
  </div>

  <!-- SECTION 1: OFFICIAL PROVISION -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Official Provision</h3>
    <p style="margin:0 0 10px;font-size:0.95rem"><strong>Rules 115 to 122</strong> of Postal Manual Volume II govern how a Government servant of the Department of Posts may <strong>represent against an order</strong>. They classify representations into <strong>appeals</strong> and <strong>petitions</strong>, fix the channel and manner of submission, prescribe a <strong>limitation period</strong>, list the grounds on which a petition may be <strong>withheld</strong>, and lay down the special procedure for <strong>petitions addressed to the President</strong>.</p>
    <p style="margin:0;font-size:0.9rem;color:#33691e"><strong>Basis:</strong> Postal Manual Vol II, Rules 115–122 (petition procedure). Disciplinary-appeal side read with the <strong>CCS (CCA) Rules, 1965</strong> — the operative disciplinary rules — under which the President's power of review is exercised through <strong>Rule 29-A</strong> (Rule 29 being revision).</p>
  </div>

  <!-- SECTION 2: APPEAL VS PETITION -->
  <div style="background:#e3f2fd;border-left:6px solid #1565c0;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#0d47a1;margin:0 0 14px;font-size:1.1rem">⚖️ 2. Appeal vs Petition</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#1565c0;color:#fff">
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left;width:20%">Feature</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Appeal</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Petition</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Nature</td><td style="border:1px solid #bbdefb;padding:9px 14px">Formal challenge to a specific order under a <strong>defined rule</strong></td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Residuary</strong> representation — anything that is not an appeal</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Example</td><td style="border:1px solid #bbdefb;padding:9px 14px">Appeal against a penalty under CCS (CCA) Rules, 1965</td><td style="border:1px solid #bbdefb;padding:9px 14px">Any other grievance / request for redress</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Governing rules</td><td style="border:1px solid #bbdefb;padding:9px 14px">The rule under which the appeal lies (e.g. CCS CCA)</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Rules 115–122</strong> of Postal Manual Vol II</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: CHANNEL OF SUBMISSION -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">🪜 3. Channel of Submission (Rule 117)</h3>
    <p style="margin:0 0 12px;font-size:0.93rem">A petition to a higher authority against a lower authority's decision must carry a <strong>copy of the order challenged</strong> and be <strong>routed through the officer who passed that order</strong>.</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Order passed by</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Petition lies to</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Routed through</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Inspector of Posts (IP)</td><td style="border:1px solid #e1bee7;padding:9px 14px">Superintendent of Post Offices</td><td style="border:1px solid #e1bee7;padding:9px 14px">the Inspector</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Supdt. of Post Offices</td><td style="border:1px solid #e1bee7;padding:9px 14px">Director of Postal Services (DPS)</td><td style="border:1px solid #e1bee7;padding:9px 14px">the Superintendent</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Director of Postal Services</td><td style="border:1px solid #e1bee7;padding:9px 14px">Head of Circle (major) / DG (minor Circles)</td><td style="border:1px solid #e1bee7;padding:9px 14px">the DPS</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Head of Circle</td><td style="border:1px solid #e1bee7;padding:9px 14px">Director General</td><td style="border:1px solid #e1bee7;padding:9px 14px">the Head of Circle</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 4: TIME LIMITS -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">⏱️ 4. Key Time Limits &amp; Controls</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:45%">Item</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Position</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Limitation to file a petition (Rule 118-D)</td><td style="border:1px solid #ffe0b2;padding:9px 14px"><strong>6 months</strong> from date informed of the order — else liable to <strong>rejection without investigation</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Counting the 6 months</td><td style="border:1px solid #ffe0b2;padding:9px 14px">From the date of the <strong>original order</strong> (a fresh representation does <strong>not</strong> restart the clock)</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Termination under temporary service</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Petition against termination (Rule 5, CCS Temporary Service Rules 1965) barred if filed after <strong>3 months</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Report of withheld petitions (Rule 121)</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Forwarded <strong>quarterly</strong> to the Director General</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 5: GROUNDS FOR WITHHOLDING -->
  <div style="background:#fce4ec;border-left:6px solid #c62828;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.1rem">🚫 5. Grounds for Withholding a Petition (Rule 120)</h3>
    <p style="margin:0 0 12px;font-size:0.93rem">The <strong>Head of Circle</strong> (or an authority subordinate to the DG) may withhold a petition addressed to the Director General in the following situations — and must <strong>inform the petitioner</strong> of the fact and the reasons:</p>
    <ol style="margin:0;padding-left:22px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>Transfers</strong> ordered in the interest of service — unless the officer is transferred frequently at short intervals.</li>
      <li style="margin-bottom:7px"><strong>Unfitness for permanent employment</strong> — removal of probationers, temporary officials or learners (excluding cases of specific offences such as fraud).</li>
      <li style="margin-bottom:7px"><strong>Resignation</strong> — voluntary, unconditional resignation.</li>
      <li style="margin-bottom:7px"><strong>Improper language</strong> — illegible, unintelligible, disrespectful or otherwise improper petitions.</li>
      <li style="margin-bottom:7px"><strong>Repetitive</strong> — a previous petition already disposed of, disclosing no new facts.</li>
      <li style="margin-bottom:7px"><strong>Premature</strong> — the lower competent authority has not yet been approached.</li>
      <li style="margin-bottom:7px"><strong>Time-barred</strong> — submitted after 6 months without reasonable cause.</li>
      <li style="margin-bottom:7px"><strong>Employment / exemption</strong> — applications for employment not based on the rules, or exemption from prescribed qualifications.</li>
      <li style="margin-bottom:7px"><strong>Termination (temporary service)</strong> — against termination under Rule 5, CCS (Temporary Service) Rules 1965, if filed after 3 months.</li>
    </ol>
  </div>

  <!-- VERIFICATION & SOURCE NOTE -->
  <div style="background:#eceff1;border-left:6px solid #455a64;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:8px">
    <h3 style="color:#263238;margin:0 0 10px;font-size:1.05rem">✅ Verification &amp; Source Note</h3>
    <p style="margin:0 0 8px;font-size:0.9rem"><strong>Verified as on:</strong> 13 July 2026. <strong>Primary sources:</strong> CCS (CCA) Rules, 1965 — DoPT; Rule 29-A confirms the President's power of review (revision under Rule 29); Postal Manual Vol II, Rules 115–122 (petition procedure).</p>
    <p style="margin:0;font-size:0.88rem;color:#546e7a"><strong>Flagged items</strong> (confirm against the latest position): (1) CCS (Temporary Service) Rules 1965, Rule 5 (3-month bar) is carried from the source as a manual cross-reference and not separately re-verified against the current rule text; (2) Rule numbers 115–122 and the hierarchy/withholding lists are reproduced from the Postal Manual Vol II text carried in the source booklet.</p>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1.5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 10px">🧠 Dak Guru Explains — The Split &amp; The Golden Thread</h3>
    <p style="margin:0 0 10px">Start from the <strong>split</strong>: an <strong>appeal</strong> is a formal remedy against a specific order under a <em>named rule</em>. Everything else a Government servant wants to say to authority is a <strong>petition</strong> — the catch-all. Chapter 3 is the rulebook for that catch-all.</p>
    <p style="margin:0">The golden thread is the <strong>proper channel</strong>. You cannot leapfrog levels (the <strong>competency rule</strong>): a petition against an IP's order must first be addressed to the Superintendent — it cannot jump straight to the DPS. Petitions sent directly to higher authorities, bypassing the channel, are simply <strong>filed without notice</strong>. The forwarding officer must attach a full statement of the case, all documents, and a <strong>definite recommendation</strong>; a regional-language petition needs an <strong>English translation</strong>.</p>
  </div>

  <div style="background:#fff8e1;border:1.5px solid #f9a825;border-radius:10px;padding:16px 20px;margin-bottom:20px">
    <h4 style="color:#f57f17;margin:0 0 10px">⚠️ Study Note — Petition vs Review Petition</h4>
    <p style="margin:0;font-size:0.93rem">Do not confuse a Chapter 3 petition with a <strong>review petition under Rule 29-A of CCS (CCA) Rules, 1965</strong>. In disciplinary matters, once the appellate stage is over, the representation is addressed to the Head of Circle or Member (Personnel); a <strong>review of a disciplinary order lies to the President alone</strong> under Rule 29-A.</p>
  </div>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">🪜 Step-by-Step — Submitting a Petition</h4>
  <ol style="margin:0 0 20px;padding-left:22px;font-size:0.93rem">
    <li style="margin-bottom:7px"><strong>Address it right (Rule 115).</strong> Direct the petition to the authority competent to pass orders on the subject.</li>
    <li style="margin-bottom:7px"><strong>One person, one petition (Rule 116).</strong> Submit separately in your own name — <strong>joint petitions are inadmissible</strong>; identical petitions are allowed only where the circumstances apply personally to each signatory.</li>
    <li style="margin-bottom:7px"><strong>Draft with discipline (Rule 116).</strong> Clear, concise, temperate, respectful, free of irrelevant matter, ending in a <strong>specific prayer</strong>.</li>
    <li style="margin-bottom:7px"><strong>Attach the order &amp; route it (Rule 117).</strong> Enclose a copy of the order challenged and send it <strong>through the very officer who passed it</strong>.</li>
    <li style="margin-bottom:7px"><strong>Mind the clock (Rule 118-D).</strong> File within <strong>6 months</strong> of being informed of the order.</li>
    <li style="margin-bottom:7px"><strong>Forwarding (Rule 118).</strong> The receiving officer forwards with a full statement, documents and a definite recommendation (plus English translation if needed).</li>
  </ol>

  <h4 style="color:#4a148c;border-bottom:2px solid #4a148c;padding-bottom:4px">⚖️ Key Distinctions</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:4px">
    <thead>
      <tr style="background:#4a148c;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left;width:38%">Concept</th>
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left">Distinction</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Appeal vs Petition</td><td style="border:1px solid #e1bee7;padding:8px 14px">Formal remedy under a named rule vs residuary representation (Rules 115–122)</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Petition vs Review petition</td><td style="border:1px solid #e1bee7;padding:8px 14px">Chapter 3 petition vs review of a disciplinary order under Rule 29-A CCS (CCA) — the latter lies to the <strong>President only</strong></td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">6 months vs 3 months</td><td style="border:1px solid #e1bee7;padding:8px 14px">General petition limitation (6 months) vs petition against temporary-service termination (3 months)</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Filed without notice vs Withheld</td><td style="border:1px solid #e1bee7;padding:8px 14px">Direct submission bypassing channel (Rule 118) vs discretionary withholding on listed grounds (Rule 120)</td></tr>
    </tbody>
  </table>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practical Examples &amp; Case Studies</h4>

  <div style="background:#e0f2f1;border-left:5px solid #00695c;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:16px">
    <p style="margin:0 0 6px;font-weight:bold;color:#004d40">Case 1 — The channel trap</p>
    <p style="margin:0;font-size:0.93rem">An IP passes an order against an official who petitions the <strong>DPS directly</strong>. Result: liable to be <strong>filed without notice</strong> — the competency rule requires the <strong>Superintendent</strong> to be addressed first, and the petition must be <strong>routed through the IP</strong> who passed the order.</p>
  </div>

  <div style="background:#e8eaf6;border-left:5px solid #283593;border-radius:0 8px 8px 0;padding:14px 18px">
    <p style="margin:0 0 6px;font-weight:bold;color:#1a237e">Case 2 — The clock</p>
    <p style="margin:0;font-size:0.93rem">An official is informed of an order on <strong>1 January</strong> but petitions on <strong>10 August</strong>. Since it is beyond <strong>6 months</strong> (counted from the original order), it is liable to be <strong>rejected without investigation</strong> unless reasonable cause for the delay is shown.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 20px;border-radius:8px;margin-bottom:20px">
    <h4 style="color:#0d47a1;margin:0 0 12px">🎯 Exam Insight — How This Chapter Is Asked</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>Limitation</strong> — <strong>6 months</strong>, counted from the <strong>original order</strong>, is the single most-asked figure here.</li>
      <li style="margin-bottom:7px"><strong>Joint petitions</strong> — <strong>inadmissible</strong>; identical petitions allowed only where circumstances apply personally to each.</li>
      <li style="margin-bottom:7px"><strong>Withheld-petition report</strong> — goes <strong>quarterly</strong> to the DG (Rule 121).</li>
      <li style="margin-bottom:7px"><strong>Petitions to the President</strong> — routed to the DG by the Head of Circle; a petition merely addressed to the <strong>"Chairman" or a "Member" of the PSB is NOT a petition to the President</strong> and is returned for correction.</li>
    </ul>
  </div>

  <h4 style="color:#c62828;border-bottom:2px solid #c62828;padding-bottom:4px">🔢 Numerical Data — Must-Memorise Figures</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:20px">
    <thead>
      <tr style="background:#c62828;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:left">Item</th>
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:center;width:35%">Figure</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Limitation to file a petition</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">6 months</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Petition vs termination (temporary service)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">3 months</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Report of withheld petitions to DG</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">Quarterly</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Point from which 6 months is counted</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">Date of the original order</td></tr>
    </tbody>
  </table>

  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 Ultra-Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>Rules 115–122</strong> of Postal Manual Vol II govern appeals &amp; petitions.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>Petition = residuary</strong>; appeal = formal challenge under a named rule.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>Joint petitions inadmissible</strong>; each employee petitions separately.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>Route through the officer who passed the order</strong>; attach a copy of that order.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>Competency rule:</strong> cannot skip a level (IP → Supdt → DPS → HoC/DG). Direct petitions bypassing the channel are <strong>filed without notice</strong>.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>Limitation = 6 months</strong> from the original order (Rule 118-D). Temporary-service termination petition barred after <strong>3 months</strong>.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #4a148c"><strong>Withheld-petitions list</strong> sent <strong>quarterly</strong> to DG (Rule 121).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>Petitions to the President</strong> forwarded to DG by HoC (Rule 122); those addressed to 'Chairman/Member' PSB are <strong>returned</strong>.</div>
    </div>
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

        // Collect existing slugs so generated ones stay unique
        const existingSlugs = new Set(
            (await collection.find({ slug: { $exists: true } }, { projection: { slug: 1 } }).toArray())
                .map(d => d.slug)
        );
        const uniqueSlug = () => {
            let slug;
            do { slug = generateSlug(); } while (existingSlugs.has(slug));
            existingSlugs.add(slug);
            return slug;
        };

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
                slug: uniqueSlug(),
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
