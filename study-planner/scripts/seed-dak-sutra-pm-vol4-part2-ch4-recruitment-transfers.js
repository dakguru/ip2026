/**
 * Seed: Dak Sutra — Postal Manual Volume IV, Part 2, Chapter 4 (Recruitment, Appointment & Transfers, incl. Rule-38)
 * Source: Dak_Sutra_Postal_Manual_Vol_IV_Part2_Ch4.md (verified as on 13 July 2026; Rule-38 currency verified against DoP orders)
 * Run: node scripts/seed-dak-sutra-pm-vol4-part2-ch4-recruitment-transfers.js
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
    // DAK SUTRA — PM VOL IV, PART 2, CHAPTER 4: RECRUITMENT, APPOINTMENT & TRANSFERS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Recruitment, Appointment & Transfers — Rule-38 Framework (PM Vol IV, Part 2, Ch. 4)",
        rule_number: "Part 2, Chapter 4 — Postal Manual Vol IV",
        act_name: "Postal Manual Volume IV",
        category: "Rule",
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(21,101,192,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">🔄 RECRUITMENT, APPOINTMENT &amp; TRANSFERS</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Part 2, Chapter 4 — Postal Manual Volume IV &nbsp;|&nbsp; Re-employment, Gradation Lists &amp; the Rule-38 Framework &nbsp;|&nbsp; Rule-38 currency verified against DoP orders</p>
  </div>

  <!-- SECTION 1: OFFICIAL PROVISION -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Official Provision</h3>
    <ul style="margin:0;padding-left:20px;font-size:0.95rem">
      <li style="margin-bottom:8px"><strong>Re-employment of pensioners</strong> in non-gazetted posts may be sanctioned by the <strong>Head of a Circle</strong> under <strong>Article 520(iii) of the Civil Service Regulations (CSR)</strong> (and by a gazetted appointing authority in charge of a Division / First-Class HO within jurisdiction).</li>
      <li style="margin-bottom:8px"><strong>Gradation lists</strong> are the official seniority record of a cadre; their accuracy decides promotions.</li>
      <li style="margin-bottom:8px"><strong>Rule-37:</strong> all officials are <strong>liable to transfer to any part of India</strong> in the interest of service.</li>
      <li><strong>Rule-38:</strong> transfer <strong>at one's own request</strong> — Inter-Circle, Intra-Circle and Mutual — submitted <strong>through the online system</strong>.</li>
    </ul>
  </div>

  <!-- SECTION 2: GRADATION LISTS -->
  <div style="background:#e3f2fd;border-left:6px solid #1565c0;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#0d47a1;margin:0 0 14px;font-size:1.1rem">📇 2. Gradation Lists</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#1565c0;color:#fff">
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Gradation List</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Compiled / Published</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left;width:20%">Reference</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Circle gradation list</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Once in 5 years</strong> (corrected up to 1st July)</td><td style="border:1px solid #bbdefb;padding:9px 14px">Rule 32-A</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Divisional gradation list</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Once in 3 years</strong></td><td style="border:1px solid #bbdefb;padding:9px 14px">Rule 32-B</td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.9rem"><strong>Format:</strong> maintained in <strong>Form App. 44</strong>, names entered <strong>separately and in strict order of seniority</strong> per class, blank pages left for updates. Errors must be pointed out for rectification <strong>within one year</strong> of issue.</p>
  </div>

  <!-- SECTION 3: RULE-38 FREQUENCY & GAPS -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">🎫 3. Rule-38 — Frequency &amp; Gaps <span style="font-weight:normal;font-size:0.85rem">(current DoP guidelines)</span></h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left;width:42%">Lever</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Rule</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Eligibility (general)</td><td style="border:1px solid #e1bee7;padding:9px 14px">Complete <strong>1 year of service</strong> (waived for terminal illness of spouse/dependent children, or compassionate appointment)</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Chances in entire service</td><td style="border:1px solid #e1bee7;padding:9px 14px"><strong>2 Inter-Circle + 2 Intra-Circle</strong></td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Gap for 2nd transfer in <em>same</em> category</td><td style="border:1px solid #e1bee7;padding:9px 14px"><strong>3 years</strong> (no gap when switching to the <em>other</em> category)</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">After an Inter-Circle transfer</td><td style="border:1px solid #e1bee7;padding:9px 14px">Must complete <strong>3 years</strong> in new unit before another Inter-Circle (may apply Intra-Circle immediately)</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">PwBD candidates</td><td style="border:1px solid #e1bee7;padding:9px 14px"><strong>One additional chance</strong> in <strong>both</strong> categories</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 4: COMPETENT AUTHORITY -->
  <div style="background:#e0f7fa;border-left:6px solid #00695c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 14px;font-size:1.1rem">🖋️ 4. Rule-38 — Competent Authority</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#00695c;color:#fff">
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left">Type of Transfer</th>
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left">Competent Authority (Manual)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold">Inter-Circle</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>CPMG of both Circles</strong></td></tr>
        <tr style="background:#f0fdfa"><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold">Intra-Circle (change of Region)</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>CPMG</strong></td></tr>
        <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold">Intra-Region</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>PMG</strong></td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.9rem;background:#fff8e1;border:1px solid #f9a825;border-radius:8px;padding:10px 14px"><strong>⚠️ Current position:</strong> under the centralised Rule-38 guidelines, both <strong>Inter-Circle and Intra-Circle</strong> transfers are sanctioned by the <strong>CPMG(s) concerned</strong>. Treat the three-tier table above as the <em>Manual</em> text and read it with the current guidelines (see Verification Note).</p>
  </div>

  <!-- SECTION 5: WITHDRAWAL / DECLINE -->
  <div style="background:#fce4ec;border-left:6px solid #c62828;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 14px;font-size:1.1rem">↩️ 5. Withdrawal / Decline of a Rule-38 Transfer</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#c62828;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ef9a9a;text-align:left;width:48%">Situation</th>
          <th style="padding:10px 14px;border:1px solid #ef9a9a;text-align:left">Effect</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold">Withdraw request</td><td style="border:1px solid #ffcdd2;padding:9px 14px">Allowed <strong>on the portal at any time</strong></td></tr>
        <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold">Decline a provisionally-approved transfer</td><td style="border:1px solid #ffcdd2;padding:9px 14px">Allowed <strong>on the portal within 72 hours</strong> of allotment</td></tr>
        <tr><td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold">Cancel <em>after</em> the 72-hr window / after final order</td><td style="border:1px solid #ffcdd2;padding:9px 14px"><strong>Deemed to have availed one chance</strong> (but no 3-year gap then imposed for re-applying in same category)</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 6: RELIEVING NORMS & TENURE -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">⏱️ 6. Relieving Norms &amp; Tenure</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left;width:52%">Item</th>
          <th style="padding:10px 14px;border:1px solid #ffcc80;text-align:left">Rule</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Relieving not denied if working strength ≥</td><td style="border:1px solid #ffe0b2;padding:9px 14px"><strong>66.66%</strong> of sanctioned strength</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Relieving timeline</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Within <strong>30 days</strong> of order (extendable to <strong>60 days</strong> on written request)</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Officiating arrangements (Rule 50)</td><td style="border:1px solid #ffe0b2;padding:9px 14px">Short-term vacancies <strong>≤ 4 months</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Post tenure (SPOs/RMS; IP/RMS except special)</td><td style="border:1px solid #ffe0b2;padding:9px 14px"><strong>3 years</strong> at a time</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:9px 14px;font-weight:bold">Station tenure</td><td style="border:1px solid #ffe0b2;padding:9px 14px"><strong>6 years</strong> (max at one station)</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 7: FACILITIES / ELIGIBILITY -->
  <div style="background:#e8eaf6;border-left:6px solid #283593;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1a237e;margin:0 0 14px;font-size:1.1rem">🎫 7. Facilities, Eligibility &amp; Conditions</h3>
    <ul style="margin:0;padding-left:20px;font-size:0.93rem">
      <li style="margin-bottom:8px"><strong>Re-employment</strong> requires the pensioner be <strong>within jurisdiction</strong> and <strong>financially solvent / satisfactory record</strong>.</li>
      <li style="margin-bottom:8px"><strong>Age-limit relaxation cannot be done by Heads of Circles</strong>; where no delegation exists, the power vests in <strong>Government</strong>, and cases go to the <strong>Director-General before recruitment</strong>. Being within the age limit at <strong>recruitment</strong> but over-aged by <strong>appointment</strong> needs <strong>no separate sanction</strong>.</li>
      <li style="margin-bottom:8px"><strong>Rule-38 one-year condition is waived</strong> for terminal illness (spouse/dependent children) or compassionate appointment.</li>
      <li style="margin-bottom:8px"><strong>IP/ASP</strong> are eligible for Inter-Circle transfer under the <strong>centralised cadre-management framework</strong>; the minimum one-year-service condition for IP/ASP was <strong>removed w.e.f. 01.06.2024</strong> (see Verification Note).</li>
      <li><strong>Rule-37-A timing:</strong> transfers generally in <strong>April</strong> (to avoid dislocating children's schooling) — relaxed in <strong>emergent cases or promotions</strong>.</li>
    </ul>
  </div>

  <!-- VERIFICATION & SOURCE NOTE -->
  <div style="background:#eceff1;border-left:6px solid #455a64;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:8px">
    <h3 style="color:#263238;margin:0 0 10px;font-size:1.05rem">✅ Verification &amp; Source Note</h3>
    <p style="margin:0 0 8px;font-size:0.9rem"><strong>Verified as on:</strong> 13 July 2026.</p>
    <p style="margin:0 0 6px;font-size:0.9rem"><strong>Rule-38 IP/ASP currency (VERIFIED against DoP orders):</strong></p>
    <ul style="margin:0 0 10px;padding-left:20px;font-size:0.88rem">
      <li style="margin-bottom:5px"><strong>Centralised cadre management</strong> of IP/ASP introduced vide DoP letter <strong>No. X-7/15/2021-SPN-II dated 15.02.2023</strong>, with additional instructions <strong>dated 03.07.2023</strong>.</li>
      <li style="margin-bottom:5px"><strong>Minimum one-year-service condition removed for IP/ASP w.e.f. 01.06.2024</strong> vide DoP letter of even number <strong>dated 27.05.2024</strong>; inter-se priority per All-India Seniority List / examination seniority.</li>
      <li style="margin-bottom:5px"><strong>Clarification dated 19.07.2024:</strong> an IP/ASP who refuses an approved Inter-Circle transfer will <strong>not be considered</strong> for a subsequent request for <strong>one year</strong> from the date of the transfer order.</li>
      <li><strong>Amendment dated 09.02.2026:</strong> where <strong>Rule 16 CCS(CCA), 1965</strong> proceedings are pending at transfer-order stage, the IP/ASP <strong>may be retained up to 3 months</strong>; where <strong>Rule 14</strong> proceedings are pending/contemplated, the request is <strong>deemed cancelled</strong> (next candidate taken; original candidate keeps waiting-list number). A <strong>minimum 6-month gap between Committee sittings</strong> was also introduced.</li>
    </ul>
    <p style="margin:0;font-size:0.88rem;color:#546e7a"><strong>⚠️ Flagged / read-with-caution:</strong> (1) <strong>Transfer cycle</strong> — the Manual provision is half-yearly (March/September); the source booklet states the current framework is quarterly (Mar/Jun/Sep/Dec) under the general Rule-38 guidelines (DoP order dated 03.02.2023), while the 09.02.2026 amendment fixes a minimum 6-month gap between IP/ASP Committee sittings — confirm the cadre-wise cycle currently notified before acting; (2) the <strong>competent-authority table</strong> is the Manual text; under current centralised guidelines Inter- and Intra-Circle transfers are sanctioned by the CPMG(s) concerned. Stable Manual provisions (re-employment, age rules, Leave Reserve ≤10%, gradation lists, seniority rules, Rule-37/37-A, officiating, tenure) are reproduced from the source booklet; confirm the latest consolidated guidelines before official use.</p>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1.5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 10px">🧠 Dak Guru Explains — Two Moods, One Balance</h3>
    <p style="margin:0">Chapter 4 has <strong>two moods</strong>. The <strong>recruitment/seniority</strong> half is administrative housekeeping — who can be re-employed, how seniority is fixed and listed, when the age is judged. The <strong>transfer</strong> half is where careers actually move, and it is built on a <strong>balance</strong>: Rule-37 says the Department can send you anywhere (service interest), while Rule-38 gives you a <strong>limited, rationed right</strong> to ask to move (2+2 chances, 3-year gaps). The online portal + priority lists exist to make a discretionary favour into a <strong>rule-bound queue</strong>. For IP/ASP specifically, that queue is now <strong>centrally managed</strong> and Committee-driven, with recent tightening around <strong>refusals and pending disciplinary cases</strong>.</p>
  </div>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">🪜 Step-by-Step — Filing a Rule-38 Transfer</h4>
  <ol style="margin:0 0 20px;padding-left:22px;font-size:0.93rem">
    <li style="margin-bottom:7px">Confirm eligibility — <strong>1 year of service</strong> (or a waiver ground).</li>
    <li style="margin-bottom:7px">Submit the request <strong>online</strong> (Inter-Circle / Intra-Circle / Mutual), choosing units in order of preference.</li>
    <li style="margin-bottom:7px">Request is slotted into the <strong>priority list</strong> by seniority/criteria and processed in the <strong>notified cycle</strong>.</li>
    <li style="margin-bottom:7px">On provisional allotment, either <strong>accept</strong>, or <strong>decline within 72 hours</strong>.</li>
    <li style="margin-bottom:7px">On final order, get <strong>relieved within 30 days</strong> (extendable to 60 on written request), provided the working-strength floor (<strong>66.66%</strong>) is respected.</li>
  </ol>

  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">🥇 Seniority on Recruitment</h4>
  <ol style="margin:0 0 20px;padding-left:22px;font-size:0.93rem">
    <li style="margin-bottom:7px"><strong>Competitive exam</strong> → seniority follows <strong>order of merit</strong>.</li>
    <li style="margin-bottom:7px"><strong>Partly departmental + partly outsiders</strong> → <strong>departmental candidates rank senior</strong> to outsiders.</li>
    <li style="margin-bottom:7px"><strong>Promotion by pure selection</strong> → seniority follows <strong>order of preference</strong>.</li>
  </ol>

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
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Rule-37</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Rule-38</td><td style="border:1px solid #e1bee7;padding:8px 14px">Liability to transfer vs transfer on own request</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Circle gradation (5 yrs)</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Divisional gradation (3 yrs)</td><td style="border:1px solid #e1bee7;padding:8px 14px">Different publication cycles</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Inter-Circle chances (2)</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Intra-Circle chances (2)</td><td style="border:1px solid #e1bee7;padding:8px 14px">Same count, separate quotas; 3-yr gap within each</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Decline within 72 hrs</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Cancel after 72 hrs / final order</td><td style="border:1px solid #e1bee7;padding:8px 14px">No penalty vs deemed to have availed a chance</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Post tenure (3 yrs)</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Station tenure (6 yrs)</td><td style="border:1px solid #e1bee7;padding:8px 14px">Per-post vs per-station maximum</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Manual competent-authority table</td><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Current centralised guidelines</td><td style="border:1px solid #e1bee7;padding:8px 14px">PMG/CPMG tiers vs CPMG-centred sanction</td></tr>
    </tbody>
  </table>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practical Example</h4>

  <div style="background:#e0f2f1;border-left:5px solid #00695c;border-radius:0 8px 8px 0;padding:14px 18px">
    <p style="margin:0 0 6px;font-weight:bold;color:#004d40">An IP with 8 months in the cadre wants to move to his home Circle</p>
    <p style="margin:0;font-size:0.93rem">Under the pre-2024 rule he would have been ineligible (one-year bar). But the Department <strong>removed the one-year-service condition for IP/ASP w.e.f. 01.06.2024</strong>, so he <strong>can</strong> file an Inter-Circle request on the Rule-38 portal; his inter-se priority is fixed per the All-India Seniority List / examination seniority. <em>If</em>, however, a <strong>Rule-14 CCS(CCA) proceeding</strong> is contemplated against him at the time of the transfer order, the <strong>09.02.2026 amendment</strong> means his request is <strong>deemed cancelled</strong> and the next candidate is taken — though he keeps his original waiting-list number for later consideration.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 20px;border-radius:8px;margin-bottom:20px">
    <h4 style="color:#0d47a1;margin:0 0 12px">🎯 Exam Insight — How This Chapter Is Asked</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>2 + 2 / 3-year gap / 72 hours / 66.66% / 30→60 days</strong> — the Rule-38 number cluster is the single richest MCQ mine in Vol IV.</li>
      <li style="margin-bottom:7px"><strong>Rule-37 (liable anywhere) vs Rule-38 (own request)</strong> — don't confuse the two rule numbers.</li>
      <li style="margin-bottom:7px"><strong>Gradation:</strong> Circle <strong>5-yearly</strong> vs Divisional <strong>3-yearly</strong> — a classic swap trap; rectify within <strong>1 year</strong>; Form <strong>App. 44</strong>.</li>
      <li style="margin-bottom:7px"><strong>Age judged at recruitment, not appointment</strong> — frequently tested one-liner.</li>
      <li style="margin-bottom:7px"><strong>IP/ASP one-year condition removed (01.06.2024)</strong> and the <strong>09.02.2026 disciplinary-pendency amendment</strong> are current, high-probability update questions.</li>
      <li style="margin-bottom:7px">Officiating <strong>Rule 50 ≤ 4 months</strong>; Post tenure <strong>3 yrs</strong>; Station tenure <strong>6 yrs</strong>.</li>
    </ul>
  </div>

  <h4 style="color:#c62828;border-bottom:2px solid #c62828;padding-bottom:4px">🔢 Numerical Data — Memory Pegs</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:20px">
    <thead>
      <tr style="background:#c62828;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:left">Item</th>
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:center;width:42%">Figure</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Gradation — Circle / Divisional</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">5-yearly (up to 1 July) / 3-yearly</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Gradation errors — rectify within / Form</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">1 year / App. 44</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Rule-38 chances / same-category gap</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">2 + 2 / 3 years</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Decline window / working-strength floor</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">72 hours / 66.66%</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Relieving timeline</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">30 days → 60 days</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Age at appointment judged as on</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">Date of recruitment</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Leave Reserve</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">≤ 10% of operative clerical staff</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Officiating (Rule 50) / Post tenure / Station tenure</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">≤ 4 months / 3 yrs / 6 yrs</td></tr>
    </tbody>
  </table>

  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 Ultra-Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>Re-employment:</strong> HOC under Art. 520(iii) CSR; within jurisdiction; solvency matters.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>Age relaxation:</strong> not by HOC; refer to DG/Government; age judged <strong>at recruitment</strong>.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>Gradation:</strong> Circle 5yr / Divisional 3yr, Form App. 44, rectify within 1 year.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>Seniority:</strong> competitive → merit; dept+outsider → dept senior; pure selection → preference.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>Rule-38:</strong> 2+2 · 3-yr gap · 72 hrs · 66.66% · 30→60 days; portal-based; April timing (Rule-37-A).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>IP/ASP:</strong> one-year condition removed 01.06.2024; centralised (15.02.2023/03.07.2023); refusal bar (19.07.2024); disciplinary-pendency amendment 09.02.2026.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>Officiating ≤ 4 months (Rule 50)</strong>; Post tenure <strong>3 yrs</strong>; Station tenure <strong>6 yrs</strong>.</div>
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
