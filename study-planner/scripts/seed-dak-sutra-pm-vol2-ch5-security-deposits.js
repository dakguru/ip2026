/**
 * Seed: Dak Sutra — Postal Manual Volume II, Chapter 5 (Security Deposits, Rules 191–260)
 * Source: DakSutra_PMVol2_Ch5_SecurityDeposits.docx (verified as on 13 July 2026)
 * Run: node scripts/seed-dak-sutra-pm-vol2-ch5-security-deposits.js
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
    // DAK SUTRA — PM VOL II, CHAPTER 5: SECURITY DEPOSITS (RULES 191–260)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Security Deposits — Furnishing, Sureties, Verification & Refund (Rules 191–260)",
        rule_number: "Chapter 5 — Postal Manual Vol II (Rules 191–260)",
        act_name: "Postal Manual Volume II",
        category: "Rule",
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(21,101,192,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">🔐 SECURITY DEPOSITS</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Rules 191–260 — Furnishing, Sureties, Verification &amp; Refund &nbsp;|&nbsp; Chapter 5, Postal Manual Volume II</p>
  </div>

  <!-- SECTION 1: OFFICIAL PROVISION -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Official Provision</h3>
    <p style="margin:0 0 10px;font-size:0.95rem"><strong>Rules 191 to 260</strong> of Postal Manual Volume II require officials who handle <strong>cash, stamps or valuable stock</strong> to furnish <strong>security</strong> as a safeguard against pecuniary loss. They specify who must furnish it, the permitted <strong>forms and amount</strong>, exemptions, execution and <strong>verification of bonds</strong>, refund and retention, <strong>inadmissible sureties</strong>, time limits and the treatment of <strong>unclaimed deposits</strong>.</p>
    <p style="margin:0;font-size:0.9rem;color:#33691e"><strong>Basis:</strong> Postal Manual Vol II, Rules 191–260. The Manual fixes the <strong>forms and ratios</strong> of security; the actual standard security amounts are prescribed by <strong>separate Directorate orders</strong> from time to time (the Manual itself avoids fixed rupee figures).</p>
  </div>

  <!-- SECTION 2: WHO MUST FURNISH -->
  <div style="background:#e3f2fd;border-left:6px solid #1565c0;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#0d47a1;margin:0 0 14px;font-size:1.1rem">👥 2. Who Must Furnish Security (Rule 191)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#1565c0;color:#fff">
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left;width:50%">Circle &amp; Administrative Offices</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Post Offices &amp; R.M.S.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #bbdefb;padding:9px 14px;vertical-align:top">
            <ul style="margin:0;padding-left:18px">
              <li style="margin-bottom:6px">Cashiers</li>
              <li style="margin-bottom:6px">Managers / Asst. Managers &amp; Assistants in RLO</li>
              <li style="margin-bottom:6px">Group 'C'/'D' staff handling cash / valuable stock</li>
              <li>Record Suppliers / Daftaries in Stores Depots</li>
            </ul>
          </td>
          <td style="border:1px solid #bbdefb;padding:9px 14px;vertical-align:top">
            <ul style="margin:0;padding-left:18px">
              <li style="margin-bottom:6px">Departmental Sub-Postmasters (Classes A, B, C)</li>
              <li style="margin-bottom:6px">Treasurers and Assistant Treasurers</li>
              <li style="margin-bottom:6px">Cashiers in Sub / Head Record Offices</li>
              <li style="margin-bottom:6px">Sorting Assistants and Mail Guards</li>
              <li style="margin-bottom:6px">Head Postmen, Cash Overseers, cash-escort staff</li>
              <li>Mail / Van Peons, Packers, Runners handling cash</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: FORMS & AMOUNT -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">💰 3. Forms &amp; Amount of Security (Rules 194, 191)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left;width:42%">Item</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Position</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Form 1 — Cash</td><td style="border:1px solid #e1bee7;padding:9px 14px">Deposited in the <strong>Post Office Savings Bank (POSB)</strong></td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Form 2 — Govt Promissory Notes / POSC</td><td style="border:1px solid #e1bee7;padding:9px 14px">Government Promissory Notes or Post Office Savings Certificates</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Form 3 — Personal Bond</td><td style="border:1px solid #e1bee7;padding:9px 14px">Supported by <strong>two sureties</strong></td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#c62828">Restriction</td><td style="border:1px solid #e1bee7;padding:9px 14px"><strong>Acting Postmen &amp; Village Postmen must ALWAYS give a Personal Bond</strong></td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Amount (cash / savings / GP notes)</td><td style="border:1px solid #e1bee7;padding:9px 14px"><strong>Two-thirds</strong> of the standard security amount</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Amount (stamp vendors)</td><td style="border:1px solid #e1bee7;padding:9px 14px"><strong>20 times the vendor's pay</strong> (subject to the prescribed maximum)</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 4: TIME LIMITS -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">⏱️ 4. Time Limits &amp; Controls</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:42%">Item</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Position</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Verification of sureties (Rule 218)</td><td style="border:1px solid #ffe0b2;padding:9px 14px"><strong>Annually</strong>; if bonds &lt; 40 verify at least <strong>one</strong>, if &gt; 40 verify <strong>one per 40</strong> (or fraction)</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Fresh security (Rule 218)</td><td style="border:1px solid #ffe0b2;padding:9px 14px">If a surety dies / is insolvent / withdraws and principal has <strong>&lt; 10 years' service</strong></td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Refund of security (Rule 222)</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Not before <strong>6 months</strong> from death/insolvency, notice of withdrawal, or leaving service</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Time to furnish (Rule 250)</td><td style="border:1px solid #ffe0b2;padding:9px 14px"><strong>1 month</strong> (temporary post) / <strong>3 months</strong> (permanent); DH may extend to <strong>3 / 6 months</strong></td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Retention of bonds (Rule 247)</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Preserve <strong>5 years</strong> (limitation for breach is <strong>30 years</strong>); on promotion, 1 year after confirmation</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Unclaimed deposits (Rule 260)</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Credited to Govt (<strong>'Miscellaneous Revenue'</strong>) if unclaimed <strong>3 years</strong> after becoming refundable</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 5: EXEMPTIONS, SURETIES & PLEDGING -->
  <div style="background:#fce4ec;border-left:6px solid #c62828;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.1rem">🛡️ 5. Exemptions, Sureties &amp; Pledging</h3>
    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Exemptions (Rule 192):</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:6px"><strong>High pay / long service</strong> — officials above a fixed pay limit, or with <strong>20 years' service</strong>, at the Divisional Head's discretion.</li>
      <li style="margin-bottom:6px"><strong>Pensioners</strong> — retired servants re-employed as GDS BPM, Postmen etc. who already draw a pension.</li>
    </ul>
    <p style="margin:0 0 8px;font-size:0.93rem"><strong>Inadmissible sureties (Rule 249):</strong> Professional <strong>money-lenders</strong> (prohibited); <strong>soldiers</strong> (not accepted); women only where single/widowed and no male surety available (archaic — read with equality norms).</p>
    <p style="margin:0;font-size:0.93rem"><strong>Pledging of security (Rule 225):</strong> <strong>Gazetted Officers</strong> pledge to the Appointing Authority; <strong>Non-Gazetted</strong> to their immediate superior (who must be Gazetted).</p>
  </div>

  <!-- VERIFICATION & SOURCE NOTE -->
  <div style="background:#eceff1;border-left:6px solid #455a64;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:8px">
    <h3 style="color:#263238;margin:0 0 10px;font-size:1.05rem">✅ Verification &amp; Source Note</h3>
    <p style="margin:0 0 8px;font-size:0.9rem"><strong>Verified as on:</strong> 13 July 2026. <strong>Primary source:</strong> Postal Manual Vol II, Rules 191–260 (security-deposit procedure). The chapter is internal departmental procedure and contains no stale rupee figures (ratios are used throughout).</p>
    <p style="margin:0;font-size:0.88rem;color:#546e7a"><strong>Flagged items</strong> (confirm against the latest position): (1) standard security amounts are fixed by separate Directorate orders from time to time; only the ratios are Manual-fixed; (2) <strong>GDS security</strong> (Gramin Dak Sevaks) is governed by the GDS rules, not this chapter, and its Fidelity-Guarantee/Security-Bond requirement has been reviewed separately by the Department; (3) the Rule 249 surety-gender clause is reproduced from the original Manual text and is archaic; apply subject to current equality norms.</p>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1.5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 10px">🧠 Dak Guru Explains — Simple Insurance</h3>
    <p style="margin:0 0 10px">The idea is <strong>simple insurance</strong>: anyone who touches Government cash, stamps or valuable stock backs their honesty with security, so a loss can be recovered. Security comes in <strong>three forms</strong> — cash (in POSB), Government promissory notes / savings certificates, or a personal bond with <strong>two sureties</strong>. One hard rule: <strong>acting and village postmen can only give a personal bond</strong> — never cash or notes.</p>
    <p style="margin:0">The Manual works in <strong>ratios, not rupees</strong>: a cash/notes deposit is <strong>two-thirds</strong> of the standard amount; a stamp vendor's security is <strong>twenty times pay</strong>; each instalment (when built up over time) is at least <strong>one-sixth of pay</strong>. Bonds are verified <strong>annually</strong>, on a sliding scale, and preserved for <strong>five years</strong> even though the limitation for a breach runs <strong>thirty years</strong>.</p>
  </div>

  <div style="background:#fff8e1;border:1.5px solid #f9a825;border-radius:10px;padding:16px 20px;margin-bottom:20px">
    <h4 style="color:#f57f17;margin:0 0 10px">⚠️ Study Note — Sureties You Cannot Accept (Rule 249)</h4>
    <p style="margin:0;font-size:0.93rem"><strong>Professional money-lenders</strong> are prohibited; <strong>soldiers</strong> are not accepted; and the Manual's original text treats women as sureties only where single or widowed and no male surety is available — an <strong>archaic clause</strong> that today should be read subject to <strong>constitutional equality norms</strong>.</p>
  </div>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">🪜 Step-by-Step — The Life of a Security Deposit</h4>
  <ol style="margin:0 0 20px;padding-left:22px;font-size:0.93rem">
    <li style="margin-bottom:7px"><strong>Identify liability (Rule 191).</strong> The official handles cash/stamps/stock, so security is required.</li>
    <li style="margin-bottom:7px"><strong>Choose a form (Rule 194).</strong> Cash, GP notes/POSC, or a personal bond with two sureties (acting/village postmen: bond only).</li>
    <li style="margin-bottom:7px"><strong>Execute the bond (Rule 211).</strong> The attesting witness must be an official <strong>above the rank of Postman</strong>.</li>
    <li style="margin-bottom:7px"><strong>Furnish in time (Rule 250).</strong> Within <strong>1 month</strong> (temporary) or <strong>3 months</strong> (permanent); extendable by the Divisional Head.</li>
    <li style="margin-bottom:7px"><strong>Custody (Rule 227).</strong> Passbooks kept by the Head of Office, locked in a <strong>tin box</strong> with the bonds; entered in the <strong>Register of Bonds (Form Sec. 19)</strong>.</li>
    <li style="margin-bottom:7px"><strong>Verify annually (Rule 218) &amp; refund at the end (Rule 222).</strong> Verify sureties on the prescribed scale; refund only after the <strong>6-month waiting period</strong>.</li>
  </ol>

  <h4 style="color:#4a148c;border-bottom:2px solid #4a148c;padding-bottom:4px">⚖️ Key Distinctions</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:4px">
    <thead>
      <tr style="background:#4a148c;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left;width:42%">Concept</th>
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left">Distinction</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Cash/notes vs Personal bond</td><td style="border:1px solid #e1bee7;padding:8px 14px">Two-thirds deposit vs bond with two sureties (acting/village postmen: bond only)</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Verification &lt; 40 vs &gt; 40</td><td style="border:1px solid #e1bee7;padding:8px 14px">At least one bond vs one per 40 (or fraction)</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Retention (5 yrs) vs Limitation (30 yrs)</td><td style="border:1px solid #e1bee7;padding:8px 14px">How long bonds are kept vs how long a breach can be actioned</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Temporary vs Permanent (time to furnish)</td><td style="border:1px solid #e1bee7;padding:8px 14px">1 month vs 3 months (DH may extend to 3 / 6 months)</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Gazetted vs Non-Gazetted (pledging)</td><td style="border:1px solid #e1bee7;padding:8px 14px">To Appointing Authority vs to immediate (Gazetted) superior</td></tr>
    </tbody>
  </table>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practical Examples &amp; Case Studies</h4>

  <div style="background:#e0f2f1;border-left:5px solid #00695c;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:16px">
    <p style="margin:0 0 6px;font-weight:bold;color:#004d40">Case 1 — Verification scale</p>
    <p style="margin:0;font-size:0.93rem">An office holds <strong>90 security bonds</strong>. Since the total exceeds 40, verify <strong>one bond per 40 or fraction</strong> — i.e. at least <strong>three bonds</strong> — during the annual verification.</p>
  </div>

  <div style="background:#e8eaf6;border-left:5px solid #283593;border-radius:0 8px 8px 0;padding:14px 18px">
    <p style="margin:0 0 6px;font-weight:bold;color:#1a237e">Case 2 — Surety lost</p>
    <p style="margin:0;font-size:0.93rem">A surety of an official with <strong>8 years' service</strong> becomes insolvent. Because the principal has put in <strong>less than 10 years</strong>, <strong>fresh security must be furnished</strong>.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 20px;border-radius:8px;margin-bottom:20px">
    <h4 style="color:#0d47a1;margin:0 0 12px">🎯 Exam Insight — How This Chapter Is Asked</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>Ratios</strong> — <strong>2/3</strong> (cash), <strong>20× pay</strong> (stamp vendors), <strong>1/6</strong> (instalment) are classic fill-in-the-blank figures.</li>
      <li style="margin-bottom:7px"><strong>Personal-bond-only</strong> — acting &amp; village postmen; attesting witness must be <strong>above the rank of Postman</strong>.</li>
      <li style="margin-bottom:7px"><strong>Verification scale</strong> — &lt;40 → one; &gt;40 → one per 40; done <strong>annually</strong>.</li>
      <li style="margin-bottom:7px"><strong>Retention vs limitation</strong> — preserve bonds <strong>5 years</strong>, but the limitation for a breach is <strong>30 years</strong>.</li>
      <li style="margin-bottom:7px"><strong>Unclaimed</strong> — <strong>3 years</strong> after refundable → <strong>'Miscellaneous Revenue'</strong>.</li>
    </ul>
  </div>

  <h4 style="color:#c62828;border-bottom:2px solid #c62828;padding-bottom:4px">🔢 Numerical Data — Must-Memorise Figures</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:20px">
    <thead>
      <tr style="background:#c62828;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:left">Item</th>
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:center;width:38%">Figure</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Cash / notes security</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">2/3 of standard amount</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Stamp vendor security</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">20 × pay</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Minimum instalment (built-up deposit)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">1/6 of pay</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Verification scale</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">&lt; 40 bonds: 1; &gt; 40: one per 40</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Fresh security if surety lost</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">Principal has &lt; 10 years' service</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Refund waiting period</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">6 months</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Time to furnish (temp / permanent)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">1 month / 3 months</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Extension by Divisional Head</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">3 months / 6 months</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Retention of expired bonds</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">5 years (breach limitation 30 years)</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Unclaimed deposit → Government</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">After 3 years</td></tr>
    </tbody>
  </table>

  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 Ultra-Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>Rules 191–260</strong> of Postal Manual Vol II = security deposits.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>Forms:</strong> Cash (POSB), GP Notes/POSC, Personal Bond (2 sureties). <strong>Acting &amp; village postmen: Personal Bond only.</strong></div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>Cash/notes = 2/3</strong> of standard; <strong>stamp vendor = 20 × pay</strong>; <strong>instalment ≥ 1/6</strong> of pay.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>Attesting witness</strong> (personal bond): above the rank of Postman (Rule 211).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>Verify annually:</strong> &lt;40 → one bond; &gt;40 → one per 40 (Rule 218). <strong>Fresh security</strong> if surety lost &amp; principal has &lt;10 years' service.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>Refund</strong> only after 6 months (Rule 222); <strong>unclaimed 3 years</strong> → Miscellaneous Revenue (Rule 260).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #4a148c"><strong>Time to furnish:</strong> 1 month (temp) / 3 months (perm); DH extends to 3 / 6 months (Rule 250).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>Retain bonds 5 years; breach limitation 30 years</strong> (Rule 247). <strong>Inadmissible sureties:</strong> money-lenders, soldiers (Rule 249).</div>
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
