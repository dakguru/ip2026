/**
 * Seed: Dak Sutra — Postal Manual Volume II, Chapter 4 (Personal Matters & Legal Proceedings, Rules 127–174-A)
 * Source: DakSutra_PMVol2_Ch4_LegalProceedings.docx (verified as on 13 July 2026; updated to DFPR 2024 & BNS/BNSS 2023)
 * Run: node scripts/seed-dak-sutra-pm-vol2-ch4-legal-proceedings.js
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
    // DAK SUTRA — PM VOL II, CHAPTER 4: LEGAL PROCEEDINGS (RULES 127–174-A)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Personal Matters & Legal Proceedings — Suits & Prosecutions (Rules 127–174-A)",
        rule_number: "Chapter 4 — Postal Manual Vol II (Rules 127–174-A)",
        act_name: "Postal Manual Volume II",
        category: "Rule",
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(21,101,192,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">⚖️ PERSONAL MATTERS &amp; LEGAL PROCEEDINGS</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Rules 127–174-A — Legal Advice, Suits, Prosecutions &nbsp;|&nbsp; Chapter 4, Postal Manual Volume II &nbsp;|&nbsp; Updated to DFPR 2024 &amp; BNS/BNSS 2023</p>
  </div>

  <!-- SECTION 1: OFFICIAL PROVISION -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Official Provision</h3>
    <p style="margin:0 0 12px;font-size:0.95rem"><strong>Rules 127 to 174-A</strong> of Postal Manual Volume II cover the Department's conduct of <strong>legal proceedings</strong>: when legal advice must be taken, who may institute or defend <strong>civil suits</strong> and sign plaints, how <strong>criminal prosecutions</strong> are sanctioned and conducted, the <strong>joinder of charges</strong>, the role of the <strong>Government Pleader</strong>, exemption from <strong>jury service</strong>, and <strong>funeral expenses</strong> of departmental staff.</p>
    <div style="background:#fff;border:1px solid #a5d6a7;border-radius:8px;padding:12px 16px">
      <p style="margin:0 0 8px;font-size:0.9rem;color:#33691e"><strong>Basis — Two Live-Law Overlays:</strong></p>
      <p style="margin:0 0 8px;font-size:0.9rem"><strong>1. Money limits:</strong> the small rupee figures in the original Manual are historical. Financial powers to institute or defend suits now flow from the <strong>Schedule of Financial Powers under Rule 12(2) of the Delegation of Financial Powers Rules (DFPR), 2024</strong> — which replaced DFPR 1978 with effect from <strong>1 April 2024</strong>.</p>
      <p style="margin:0;font-size:0.9rem"><strong>2. Criminal law:</strong> references to the IPC / CrPC now read as the <strong>Bharatiya Nyaya Sanhita (BNS), 2023</strong> and <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023</strong> — both in force from <strong>1 July 2024</strong>.</p>
    </div>
  </div>

  <!-- SECTION 2: CIVIL SUITS -->
  <div style="background:#e3f2fd;border-left:6px solid #1565c0;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#0d47a1;margin:0 0 14px;font-size:1.1rem">🏛️ 2. Civil Suits — Who Sanctions (Rule 127)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#1565c0;color:#fff">
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left;width:48%">Situation</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Sanction / Authority</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Instituting a civil suit for the Department</td><td style="border:1px solid #bbdefb;padding:9px 14px">Head of Circle obtains orders of the <strong>Director General</strong> (general rule)</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Acting on notice of a suit against the Department</td><td style="border:1px solid #bbdefb;padding:9px 14px">Head of Circle obtains orders of the DG</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Suits on security bonds of postal servants</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Delegated</strong> — HoC need not refer to DG</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Suits re MO / SB / insured-article losses</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Delegated</strong> — within the prescribed financial limit (now per Schedule of Financial Powers, DFPR 2024)</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Legal advice at Kolkata/Chennai/Mumbai etc.</td><td style="border:1px solid #bbdefb;padding:9px 14px">Advice of the <strong>Government Solicitor / Law Officer</strong> obtained before proceeding</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: CRIMINAL PROCEEDINGS -->
  <div style="background:#fce4ec;border-left:6px solid #c62828;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.1rem">🚔 3. Criminal Proceedings (Rules 133–135)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#c62828;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ef9a9a;text-align:left;width:42%">Item</th>
          <th style="padding:10px 14px;border:1px solid #ef9a9a;text-align:left">Position</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold">Non-cognizable case — prosecution</td><td style="border:1px solid #ffcdd2;padding:9px 14px">Not instituted without <strong>previous sanction of the Head of Circle</strong></td></tr>
        <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold">Emergency exception</td><td style="border:1px solid #ffcdd2;padding:9px 14px">If delay would let the accused escape, sanction may be <strong>anticipated</strong> — but reported <strong>immediately</strong> (email/post) to the HoC</td></tr>
        <tr><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold">Conduct of prosecution</td><td style="border:1px solid #ffcdd2;padding:9px 14px"><strong>Written complaint</strong> before the nearest empowered Magistrate</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 4: DELEGATED POWERS & CONDITIONS -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">🗝️ 4. Delegated Powers, Exceptions &amp; Conditions</h3>
    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Suits the HoC may pursue without referring to the DG (Rule 127):</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:6px"><strong>Security bonds</strong> — suits connected with the security bonds of postal servants.</li>
      <li style="margin-bottom:6px"><strong>Transaction losses</strong> — suits on Money Orders, Savings Bank and insured articles, within the prescribed limit (now per the Schedule of Financial Powers, DFPR 2024).</li>
    </ul>
    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Recoveries from guarantors (Rule 127):</strong> HoC may sanction civil suits against defaulting guarantors of combined offices to recover deficits, provided there is a <strong>reasonable prospect of realisation</strong>, and the action is <strong>advised by the local Government Solicitor</strong>.</p>
    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Signing on behalf of the Government (Rule 127-A):</strong> All <strong>Gazetted Officers conversant with the facts</strong> may sign and verify <strong>plaints and written statements</strong> in civil suits by or against the Central Government, and sign <strong>vakalatnamas</strong>.</p>
    <p style="margin:0;font-size:0.93rem"><strong>Funeral expenses (Rule 174-A):</strong> Debited to the <strong>Contingent Grant</strong> where an employee dies in departmental premises, or on duty at an out-station where the body cannot be attended to by relatives.</p>
  </div>

  <!-- VERIFICATION & SOURCE NOTE -->
  <div style="background:#eceff1;border-left:6px solid #455a64;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:8px">
    <h3 style="color:#263238;margin:0 0 10px;font-size:1.05rem">✅ Verification &amp; Source Note</h3>
    <p style="margin:0 0 8px;font-size:0.9rem"><strong>Verified as on:</strong> 13 July 2026. <strong>Primary sources:</strong> Delegation of Financial Powers Rules, 2024 (MoF/DoE) — in force 01.04.2024, replacing DFPR 1978; DoP powers delegated under Rule 12(2) via the Schedule of Financial Powers. Bharatiya Nyaya Sanhita, 2023 &amp; Bharatiya Nagarik Suraksha Sanhita, 2023 — in force 01.07.2024 (replacing IPC 1860 &amp; CrPC 1973). BNSS 2023 joinder-of-charges provision. Postal Manual Vol II, Rules 127–174-A.</p>
    <p style="margin:0;font-size:0.88rem;color:#546e7a"><strong>Flagged items</strong> (confirm against the latest position): (1) the exact BNSS section number for the five-offence joinder rule — mapping tables across sources are inconsistent (reported around §242 of BNSS, successor to CrPC §219); the five-offence figure is confirmed, but cite the section from the bare BNSS; (2) jury exemption (Rule 152) is retained in the Manual though jury trials no longer exist in Indian criminal procedure; (3) rule numbers and the delegated-power / signing provisions are reproduced from the Postal Manual Vol II text carried in the source booklet.</p>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1.5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 10px">🧠 Dak Guru Explains — Where the Manual Meets the Courts</h3>
    <p style="margin:0">This chapter is where the Manual meets the courts, and it is the chapter <strong>most affected by recent legislation</strong>. Two overlays matter. First, <strong>money</strong>: any old rupee limit for suits is dead — the live limits sit in the <strong>Schedule of Financial Powers under DFPR 2024</strong>. Second, <strong>criminal law</strong>: the whole IPC/CrPC scaffolding has been replaced by <strong>BNS and BNSS, 2023</strong>.</p>
  </div>

  <div style="background:#ffebee;border:1.5px solid #c62828;border-radius:10px;padding:16px 20px;margin-bottom:20px">
    <h4 style="color:#b71c1c;margin:0 0 10px">🚨 Updated — Three Charges is now Five</h4>
    <p style="margin:0 0 8px;font-size:0.93rem">The Manual's <strong>Rule 138</strong> mirrors the old <strong>CrPC §219</strong>: at one trial, an accused could be tried for not more than <strong>three</strong> offences of the same kind committed within 12 months.</p>
    <p style="margin:0;font-size:0.93rem">Under the successor provision in the <strong>BNSS, 2023</strong> (joinder-of-charges chapter), that ceiling has been raised to <strong>five offences of the same kind within twelve months</strong>. Quote <strong>five, not three</strong>, for the current position — flag the exact BNSS section on exam day.</p>
  </div>

  <div style="background:#fff8e1;border:1.5px solid #f9a825;border-radius:10px;padding:16px 20px;margin-bottom:20px">
    <h4 style="color:#f57f17;margin:0 0 10px">⚠️ Study Note — Jury Exemption (Rule 152)</h4>
    <p style="margin:0;font-size:0.93rem"><strong>Rule 152 exempts all DoP employees</strong> from serving as jurors or assessors. Remember the rule for the exam, but note the reality: <strong>jury trials were abolished in India</strong> and neither the CrPC nor the BNSS provides for juries — so the exemption is of <strong>historical significance only</strong>.</p>
  </div>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">🪜 Step-by-Step — A Non-Cognizable Prosecution</h4>
  <ol style="margin:0 0 20px;padding-left:22px;font-size:0.93rem">
    <li style="margin-bottom:7px"><strong>Seek sanction (Rule 133).</strong> Obtain the <strong>previous sanction of the Head of Circle</strong> before instituting the prosecution.</li>
    <li style="margin-bottom:7px"><strong>Emergency route (Rule 133).</strong> If delay would let the accused escape, anticipate sanction — then <strong>report the action immediately</strong> (email/post) to the HoC.</li>
    <li style="margin-bottom:7px"><strong>File the complaint (Rule 135).</strong> Prefer a <strong>written complaint</strong> before the nearest empowered Magistrate.</li>
    <li style="margin-bottom:7px"><strong>Frame charges (Rule 138).</strong> Up to <strong>five offences of the same kind within 12 months</strong> may be tried at one trial (current BNSS position).</li>
    <li style="margin-bottom:7px"><strong>Representation (Rule 146).</strong> Ordinary Magistrate cases need <strong>no legal assistance</strong>; a <strong>Government Pleader</strong> (Sessions / appeals) is engaged with HoC sanction if a special fee applies.</li>
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
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Civil suit vs Criminal prosecution</td><td style="border:1px solid #e1bee7;padding:8px 14px">DG's orders (HoC) vs HoC's <strong>previous sanction</strong> (non-cognizable)</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Plaint vs Vakalatnama</td><td style="border:1px solid #e1bee7;padding:8px 14px">Statement of claim in a suit vs authority to a pleader — both signed by <strong>Gazetted Officers conversant with facts</strong></td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">IPC/CrPC vs BNS/BNSS</td><td style="border:1px solid #e1bee7;padding:8px 14px">Repealed 1860/1973 codes vs BNS &amp; BNSS 2023 (in force <strong>01.07.2024</strong>)</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">DFPR 1978 vs DFPR 2024</td><td style="border:1px solid #e1bee7;padding:8px 14px">Superseded vs current (w.e.f. <strong>01.04.2024</strong>); DoP powers under Rule 12(2)</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Government Pleader vs no assistance</td><td style="border:1px solid #e1bee7;padding:8px 14px">Sessions/appeals (HoC sanction if special fee) vs ordinary Magistrate cases (no assistance)</td></tr>
    </tbody>
  </table>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practical Examples &amp; Case Studies</h4>

  <div style="background:#e0f2f1;border-left:5px solid #00695c;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:16px">
    <p style="margin:0 0 6px;font-weight:bold;color:#004d40">Case 1 — A Money-Order loss suit</p>
    <p style="margin:0;font-size:0.93rem">A dispute over a Money-Order loss falls within the <strong>delegated exceptions</strong>: the Head of Circle can proceed <strong>without a reference to the DG</strong>, provided the amount is within the limit now fixed by the <strong>Schedule of Financial Powers under DFPR 2024</strong>.</p>
  </div>

  <div style="background:#e8eaf6;border-left:5px solid #283593;border-radius:0 8px 8px 0;padding:14px 18px">
    <p style="margin:0 0 6px;font-weight:bold;color:#1a237e">Case 2 — Multiple thefts of stamps</p>
    <p style="margin:0;font-size:0.93rem">An official commits <strong>four similar thefts of stamps across ten months</strong>. Under the current BNSS position, all four (up to <strong>five of the same kind within 12 months</strong>) may be tried at a <strong>single trial</strong> — whereas the old Manual/CrPC rule would have capped it at three.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 20px;border-radius:8px;margin-bottom:20px">
    <h4 style="color:#0d47a1;margin:0 0 12px">🎯 Exam Insight — How This Chapter Is Asked</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>Three vs Five</strong> — the joinder-of-charges number is the headline trap: <strong>three under the old CrPC, five under BNSS 2023</strong>.</li>
      <li style="margin-bottom:7px"><strong>DFPR 2024</strong> — any question quoting an old rupee suit-limit is testing whether you know the framework has moved to <strong>DFPR 2024</strong>.</li>
      <li style="margin-bottom:7px"><strong>Sanctioning authority</strong> — non-cognizable prosecution needs the <strong>Head of Circle's previous sanction</strong>.</li>
      <li style="margin-bottom:7px"><strong>Jury exemption</strong> — Rule 152 exists, but <strong>juries are abolished</strong>; treat as historical.</li>
      <li style="margin-bottom:7px"><strong>Signing</strong> — <strong>Gazetted Officers</strong> (conversant with facts) sign plaints, written statements and vakalatnamas.</li>
    </ul>
  </div>

  <h4 style="color:#c62828;border-bottom:2px solid #c62828;padding-bottom:4px">🔢 Numerical Data — Must-Memorise Figures</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:8px">
    <thead>
      <tr style="background:#c62828;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:left">Item</th>
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:center;width:25%">Old (Manual / CrPC)</th>
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:center;width:25%">Current (BNSS 2023)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Max charges of same kind at one trial</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#78909c">3</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">5</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Time-window for those offences</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#78909c">12 months</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">12 months</td></tr>
    </tbody>
  </table>
  <p style="margin:0 0 20px;font-size:0.88rem;color:#78909c"><strong>Note:</strong> suit-related rupee limits in the Manual are superseded — read the Schedule of Financial Powers under DFPR 2024.</p>

  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 Ultra-Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>Rules 127–174-A</strong> of Postal Manual Vol II = legal proceedings.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>Civil suit:</strong> HoC obtains DG's orders (general rule); <strong>delegated</strong> for security-bond &amp; MO/SB/insured-article suits.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>Suit money-limits</strong> now per Schedule of Financial Powers under <strong>DFPR 2024</strong> (replaced DFPR 1978 w.e.f. 01.04.2024).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>Gazetted Officers</strong> sign plaints, written statements &amp; vakalatnamas (Rule 127-A).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>Non-cognizable prosecution:</strong> previous sanction of Head of Circle (Rule 133). <strong>Emergency:</strong> sanction may be anticipated, but reported immediately to HoC.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>Joinder of charges:</strong> up to <strong>FIVE</strong> offences of same kind within 12 months at one trial (BNSS 2023; was three under CrPC §219).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #4a148c"><strong>IPC → BNS 2023; CrPC → BNSS 2023</strong> (both in force 01.07.2024). <strong>Jury exemption</strong> (Rule 152) survives in the Manual but juries are abolished — historical.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>Funeral expenses</strong> → Contingent Grant (Rule 174-A).</div>
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
