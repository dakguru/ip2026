/**
 * Seed: Dak Sutra — Postal Manual Volume IV, Part 2, Chapter 3 (Rules Relating to Departmental Examinations)
 * Source: Dak_Sutra_Postal_Manual_Vol_IV_Part2_Ch3.md (verified as on 13 July 2026)
 * Run: node scripts/seed-dak-sutra-pm-vol4-part2-ch3-departmental-exams.js
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
    // DAK SUTRA — PM VOL IV, PART 2, CHAPTER 3: DEPARTMENTAL EXAMINATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Departmental Examinations — Conduct, Integrity & Records (PM Vol IV, Part 2, Ch. 3)",
        rule_number: "Part 2, Chapter 3 — Postal Manual Vol IV",
        act_name: "Postal Manual Volume IV",
        category: "Rule",
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(21,101,192,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">📝 RULES RELATING TO DEPARTMENTAL EXAMINATIONS</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Part 2, Chapter 3 — Postal Manual Volume IV &nbsp;|&nbsp; Notification, Conduct, Integrity &amp; Record Retention</p>
  </div>

  <!-- SECTION 1: OFFICIAL PROVISION -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Official Provision</h3>
    <ul style="margin:0;padding-left:20px;font-size:0.95rem">
      <li style="margin-bottom:8px">Departmental examinations are the route by which serving staff qualify for <strong>promotion or entry to a higher cadre</strong>.</li>
      <li style="margin-bottom:8px">Each exam must be <strong>notified well in advance</strong>, <strong>scheduled to avoid clashes</strong>, conducted with <strong>integrity safeguards</strong> (OMR cross-check, CCTV), and its <strong>records preserved</strong> for fixed periods.</li>
      <li>The <strong>level of officer</strong> who may set the question paper <strong>rises with the level of the examination</strong>.</li>
    </ul>
  </div>

  <!-- SECTION 2: CONDUCT TIMELINE & INTEGRITY -->
  <div style="background:#e3f2fd;border-left:6px solid #1565c0;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#0d47a1;margin:0 0 14px;font-size:1.1rem">⏱️ 2. Conduct Timeline &amp; Integrity Checks</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#1565c0;color:#fff">
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left;width:45%">Item</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Rule</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Advance notice of examination</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Not less than 40 days</strong></td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Notification must state</td><td style="border:1px solid #bbdefb;padding:9px 14px">Vacancies <strong>category-wise</strong> as per Recruitment Rules</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">OMR evaluation cross-check</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>10%</strong> of OMR sheets manually re-checked by a nominated Committee/Officers</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Declaration of results</td><td style="border:1px solid #bbdefb;padding:9px 14px">Preferably <strong>within 60 days</strong> of the exam</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#c62828">Revaluation of answer scripts</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>NOT permissible</strong> — in any case or circumstance</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: RECORD PRESERVATION -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">🗄️ 3. Record Preservation Periods</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Record</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:28%">Preservation Period</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:28%">Reckoned From</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">OMR sheets &amp; Answer Books</td><td style="border:1px solid #ffe0b2;padding:9px 14px;color:#bf360c;font-weight:bold">12 months (1 year)</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Date of declaration of result</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Tabulated result sheets / mark-sheet registers</td><td style="border:1px solid #ffe0b2;padding:9px 14px;color:#bf360c;font-weight:bold">3 years</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Date of announcement of result</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">CCTV footage of exam halls</td><td style="border:1px solid #ffe0b2;padding:9px 14px;color:#bf360c;font-weight:bold">2 years</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Date of declaration of result</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Records of court / vigilance / RTI / disputes</td><td style="border:1px solid #ffe0b2;padding:9px 14px;color:#bf360c;font-weight:bold">Until finalisation</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Then disposed on Competent Authority's orders</td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.9rem"><strong>CCTV custody:</strong> exam halls &amp; Centre Supervisors' offices must be CCTV-covered; footage kept in the <strong>personal custody of the DPS (HQ) for 2 years</strong> after declaration of results.</p>
  </div>

  <!-- SECTION 4: PAPER-SETTING AUTHORITY -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">✍️ 4. Competent Authority for Paper-Setting</h3>
    <p style="margin:0 0 12px;font-size:0.93rem">The paper-setter's level <strong>rises with the level of the examination</strong>:</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Examination / Cadre</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left;width:35%">Paper-Setter Level</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Postal Assistant / Sorting Assistant</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">JAG &amp; above</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">Postman / Mail Guard</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">STS / JAG &amp; above</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">MTS</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">JTS / STS &amp; above</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">LDCE — Inspector of Posts (IP)</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#c62828">JAG / SAG</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold">LDCE — PS Group 'B'</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#c62828">HAG</td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.88rem;color:#6a1b9a"><strong>Officer grades:</strong> JTS = Junior Time Scale · STS = Senior Time Scale · JAG = Junior Administrative Grade · SAG = Senior Administrative Grade · HAG = Higher Administrative Grade.</p>
  </div>

  <!-- SECTION 5: FACILITIES / ELIGIBILITY -->
  <div style="background:#e0f7fa;border-left:6px solid #00695c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 14px;font-size:1.1rem">🎫 5. Facilities, Eligibility &amp; Conditions</h3>
    <ul style="margin:0;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:8px">Candidates may obtain <strong>communication of their marks via an RTI application</strong>.</li>
      <li style="margin-bottom:8px"><strong>Withdrawal of candidature</strong> may be allowed by the <strong>same authority that granted permission to appear</strong>.</li>
      <li><strong>After roll numbers are assigned</strong>, withdrawal is <strong>generally not permitted</strong> — except for reasons <strong>genuinely beyond the candidate's control</strong>.</li>
    </ul>
  </div>

  <!-- VERIFICATION & SOURCE NOTE -->
  <div style="background:#eceff1;border-left:6px solid #455a64;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:8px">
    <h3 style="color:#263238;margin:0 0 10px;font-size:1.05rem">✅ Verification &amp; Source Note</h3>
    <p style="margin:0 0 8px;font-size:0.9rem"><strong>Verified as on:</strong> 13 July 2026. <strong>Source basis:</strong> the provisions in this chapter (40-day notice, 10% OMR cross-check, 60-day result, no-revaluation rule, record-retention periods, CCTV custody, and paper-setting officer levels) are reproduced from the Postal Manual Vol IV / Department of Posts departmental-examination conduct guidelines as carried in the Dak Guru source booklet.</p>
    <p style="margin:0;font-size:0.88rem;color:#546e7a"><strong>⚠️ Verification limitation (FLAGGED):</strong> a primary DoP order fixing these specific figures could <strong>not be independently located</strong> in the current check. These are stable internal procedural norms, but before quoting a specific figure (e.g. the 10% cross-check, the retention periods, or the paper-setter grade) in official work, confirm the current DoP departmental-examination guidelines / relevant Directorate order in force. No post-cutoff amendment to these figures was identified; treat as latest available pending confirmation against the primary order.</p>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1.5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 10px">🧠 Dak Guru Explains — Fairness vs Integrity</h3>
    <p style="margin:0">Every rule in this chapter serves one of two goals: <strong>fairness</strong> or <strong>integrity</strong>. The 40-day notice, the no-festival-clash scheduling, and the RTI route to one's marks all protect the <em>candidate's fair chance</em>. The 10% OMR cross-check, CCTV in halls, the major-penalty response to copying, and the retention schedule all protect the <em>integrity of the result</em>. The <strong>paper-setting ladder</strong> is a control too: the higher the stakes of the cadre, the more senior the officer trusted to frame the paper — an <strong>IP paper needs JAG/SAG</strong>, and the <strong>PS Group 'B' paper needs an HAG-level officer</strong>.</p>
  </div>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">🪜 Step-by-Step — Notification → Result</h4>
  <ol style="margin:0 0 20px;padding-left:22px;font-size:0.93rem">
    <li style="margin-bottom:7px">Issue notification <strong>≥ 40 days</strong> ahead, stating <strong>category-wise vacancies</strong> per Recruitment Rules.</li>
    <li style="margin-bottom:7px">Fix a date that <strong>avoids national/regional festivals and national holidays</strong>.</li>
    <li style="margin-bottom:7px">Receive applications <strong>through the proper channel</strong> (re-totalling requests too).</li>
    <li style="margin-bottom:7px">Conduct the exam under <strong>CCTV</strong> in halls and Supervisors' offices.</li>
    <li style="margin-bottom:7px">Evaluate OMR mechanically, then <strong>manually cross-check 10%</strong> via a nominated Committee.</li>
    <li style="margin-bottom:7px">Declare results <strong>preferably within 60 days</strong>.</li>
    <li style="margin-bottom:7px">Preserve records per the retention schedule; <strong>no revaluation</strong> entertained.</li>
  </ol>

  <div style="background:#ffebee;border:1.5px solid #c62828;border-radius:10px;padding:16px 20px;margin-bottom:20px">
    <h4 style="color:#b71c1c;margin:0 0 10px">🚨 On Unfair Means</h4>
    <ol style="margin:0;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:6px">If a candidate is found <strong>using unfair means / copying</strong>, the supervising officer forwards a <strong>report to the competent authority</strong>.</li>
      <li>The competent authority proceeds to impose a <strong>major penalty</strong>.</li>
    </ol>
  </div>

  <h4 style="color:#4a148c;border-bottom:2px solid #4a148c;padding-bottom:4px">⚖️ Key Distinctions</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:4px">
    <thead>
      <tr style="background:#4a148c;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left;width:26%">Concept A</th>
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left;width:28%">Concept B</th>
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left">The Distinction</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Revaluation</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Re-totalling</td><td style="border:1px solid #e1bee7;padding:8px 14px"><strong>Barred entirely</strong> vs <strong>allowed</strong> through proper channel</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">OMR/Answer books (1 yr)</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Tabulated results (3 yrs)</td><td style="border:1px solid #e1bee7;padding:8px 14px">Different retention periods</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">CCTV footage (2 yrs)</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Court/vigilance records (until finalisation)</td><td style="border:1px solid #e1bee7;padding:8px 14px">Fixed vs open-ended retention</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Withdraw before roll no.</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Withdraw after roll no.</td><td style="border:1px solid #e1bee7;padding:8px 14px">Permitted by granting authority vs generally barred</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">IP paper (JAG/SAG)</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">PS Group 'B' paper (HAG)</td><td style="border:1px solid #e1bee7;padding:8px 14px">Setter seniority rises with exam level</td></tr>
    </tbody>
  </table>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practical Example</h4>

  <div style="background:#e0f2f1;border-left:5px solid #00695c;border-radius:0 8px 8px 0;padding:14px 18px">
    <p style="margin:0 0 6px;font-weight:bold;color:#004d40">A candidate wants his marks after a disappointing LDCE result</p>
    <p style="margin:0;font-size:0.93rem">Revaluation is <strong>barred outright</strong>, so that door is closed. His legitimate routes are a <strong>re-totalling application through the proper channel</strong> and an <strong>RTI application</strong> to obtain communication of his marks — the OMR sheets themselves survive only <strong>12 months</strong> from result declaration, so any such request must be made well within that window.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 20px;border-radius:8px;margin-bottom:20px">
    <h4 style="color:#0d47a1;margin:0 0 12px">🎯 Exam Insight — How This Chapter Is Asked</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>40 days</strong> notice, <strong>10%</strong> cross-check, <strong>60 days</strong> result — three favourite fill-in-the-blanks.</li>
      <li style="margin-bottom:7px"><strong>Revaluation = never; re-totalling = allowed</strong> through proper channel — the distinction is heavily tested.</li>
      <li style="margin-bottom:7px">Retention set: <strong>1 / 3 / 2 / until-finalisation</strong> — memorise as OMR-1, Tabulated-3, CCTV-2, Disputes-until-final.</li>
      <li style="margin-bottom:7px">Paper-setter for <strong>IP = JAG/SAG</strong>; for <strong>PS Group 'B' = HAG</strong> — the top two are the usual targets.</li>
      <li style="margin-bottom:7px">Unfair means → <strong>major penalty</strong> (not minor).</li>
    </ul>
  </div>

  <h4 style="color:#c62828;border-bottom:2px solid #c62828;padding-bottom:4px">🔢 Numerical Data — Memory Pegs</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:20px">
    <thead>
      <tr style="background:#c62828;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:left">Item</th>
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:center;width:40%">Figure</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Advance notice (minimum)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">40 days</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">OMR manual cross-check</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">10%</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Results (preferably)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">60 days</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Retention — OMR / answer books</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">1 year</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Retention — tabulated results</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">3 years</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Retention — CCTV footage</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">2 years</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Retention — court / vigilance / RTI / disputes</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">Until finalisation</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">CCTV custody</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">DPS (HQ), 2 years</td></tr>
    </tbody>
  </table>

  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 Ultra-Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0">Notice <strong>40 days</strong> · vacancies <strong>category-wise</strong> · schedule <strong>no festival/holiday clash</strong>.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>10%</strong> OMR manual cross-check · results <strong>60 days</strong> · <strong>no revaluation ever</strong>.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100">Retention: <strong>OMR 1yr · Tabulated 3yr · CCTV 2yr · Disputes until final</strong>; CCTV with <strong>DPS(HQ) 2yr</strong>.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828">Unfair means → <strong>major penalty</strong>.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a">Paper-setters: PA/SA <strong>JAG+</strong> · Postman/MG <strong>STS/JAG+</strong> · MTS <strong>JTS/STS+</strong> · IP <strong>JAG/SAG</strong> · PS Gr B <strong>HAG</strong>.</div>
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
