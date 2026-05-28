
/**
 * Dak Sutra Seed Script — Prevention of Money-Laundering Act (PMLA), 2002
 * VERSION 2: 4 Rich, Comprehensive, Exam-Weapon Entries
 * Source: PMLA_2002_B-12-English_20022025.pdf (Basic Pay Publications)
 *
 * Run: node scripts/seed-dak-sutra-pmla-v2.js
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

const entries = [

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA 1 — PMLA 2002: FOUNDATION, DEFINITIONS & OFFENCE OF MONEY LAUNDERING
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "PMLA 2002 — Foundation, Key Definitions & Offence of Money Laundering (Ch. I & II)",
        rule_number: "Sections 1 to 4",
        act_name: "Prevention of Money-Laundering Act (PMLA), 2002",
        category: "Section",
        effective_date: new Date("2005-07-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff;padding:18px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.45rem;letter-spacing:1px">🏛️ PREVENTION OF MONEY LAUNDERING ACT, 2002</h2>
    <p style="margin:8px 0 0;font-size:0.95rem;opacity:0.92">Act No. <strong>15 of 2003</strong> &nbsp;|&nbsp; Enacted: <strong>17th January 2003</strong></p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">Came into Force: <strong>1st July 2005</strong> &nbsp;|&nbsp; Extends to: <strong>Whole of India</strong></p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">Purpose: To prevent money-laundering and to provide for confiscation of property derived from, or involved in, money-laundering.</p>
  </div>

  <h3 style="color:#c62828;border-left:5px solid #c62828;padding-left:12px">Section 2 — Key Definitions</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#b71c1c;color:#fff">
        <th style="border:1.5px solid #e57373;padding:10px 14px;text-align:left;width:26%">Term</th>
        <th style="border:1.5px solid #e57373;padding:10px 14px;text-align:left">Definition (Verbatim / Near-Verbatim)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Attachment</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Prohibition of transfer, conversion, disposition or movement of property by an order issued.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Banking Company</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">A banking company or a co-operative bank to which the Banking Regulation Act, 1949 applies and includes any bank or banking institution referred to in Section 51 of that Act.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Financial Institution</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">As defined in Sec. 45-I of RBI Act 1934 and includes a chit fund company, a housing finance institution, an authorised person, a payment system operator, a non-banking financial company and the <strong>Department of Posts</strong> in the Government of India.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Payment System</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">A system that enables payment to be effected between a payer and a beneficiary, involving clearing, payment or settlement service or all of them. Includes: credit card, debit card, smart card, money transfer operations or similar operations.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Payment System Operator</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">A person who operates a payment system and includes his <strong>overseas principal</strong>. Overseas principal includes an individual residing outside India, Karta of HUF, or company/firm/body of individuals incorporated/registered outside India — who owns, controls or manages the payment system in India.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Person</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Includes — (i) an individual, (ii) a Hindu undivided family, (iii) a company, (iv) a firm, (v) an association of persons or body of individuals whether incorporated or not, (vi) every artificial juridical person not falling within preceding sub-clauses, (vii) any agency, office or branch owned or controlled by any of the above persons.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Proceeds of Crime</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Any property derived or obtained, directly or indirectly, by any person as a result of criminal activity relating to a <strong>scheduled offence</strong> or the value of any such property or where such property is taken or held outside the country, then the property equivalent in value held within the country or abroad. Includes property derived not only from the scheduled offence but also from any criminal activity relatable to the scheduled offence.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Property</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Any property or assets of every description, whether corporeal or incorporeal, movable or immovable, tangible or intangible and includes deeds and instruments evidencing title to, or interest in, such property or assets, wherever located.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Reporting Entity</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">A banking company, financial institution, intermediary or a person carrying on a designated business or profession.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Scheduled Offence</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">(i) Offences specified under <strong>Part A</strong> of the Schedule; or (ii) Offences under <strong>Part B</strong> if total value involved is <strong>₹1 Crore or more</strong>; or (iii) Offences under <strong>Part C</strong> of the Schedule.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Value</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">The <strong>fair market value</strong> of any property on the date of its acquisition by any person, or if such date cannot be determined, the date on which such property is possessed by such person.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Offence of Cross Border Implications</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">(i) Any conduct outside India which constitutes an offence at that place and if committed in India would be a scheduled offence (Part A/B/C) and the proceeds are transferred to India; or (ii) A scheduled offence committed in India and proceeds transferred outside India (or attempt made).</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Section 3 — Offence of Money-Laundering</h3>
  <p>Whosoever directly or indirectly <strong>attempts to indulge</strong> or knowingly assists or knowingly is a party or is actually involved in any process or activity connected with the <strong>proceeds of crime</strong> including its —</p>
  <ul>
    <li>(a) concealment; or</li>
    <li>(b) possession; or</li>
    <li>(c) acquisition; or</li>
    <li>(d) use; or</li>
    <li>(e) projecting as untainted property; or</li>
    <li>(f) claiming as untainted property, in any manner whatsoever;</li>
  </ul>
  <p>...shall be <strong>guilty of offence of money-laundering</strong>.</p>
  <p><strong>Key Clarification:</strong> The process or activity connected with proceeds of crime is a <em>continuing activity</em> and continues till such time a person is directly or indirectly enjoying the proceeds of crime by its concealment, possession, acquisition, use or projecting/claiming it as untainted property.</p>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">Section 4 — Punishment for Money-Laundering</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:14px">
    <thead>
      <tr style="background:#1b5e20;color:#fff">
        <th style="border:1px solid #a5d6a7;padding:10px">Type of Offence</th>
        <th style="border:1px solid #a5d6a7;padding:10px">Punishment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #c8e6c9;padding:9px"><strong>Standard Money Laundering</strong></td>
        <td style="border:1px solid #c8e6c9;padding:9px">Rigorous Imprisonment (RI) — <strong>not less than 3 years</strong> but which <strong>may extend to 7 years</strong> + Fine</td>
      </tr>
      <tr style="background:#f1f8e9">
        <td style="border:1px solid #c8e6c9;padding:9px"><strong>NDPS-related (Poppy/Opium/Narcotics/Drugs)</strong></td>
        <td style="border:1px solid #c8e6c9;padding:9px">RI — <strong>not less than 3 years</strong> but which <strong>may extend to 10 years</strong> + Fine</td>
      </tr>
    </tbody>
  </table>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8eaf6,#c5cae9);border-left:5px solid #1a237e;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1a237e;margin:0 0 8px">🧠 Dak Guru's Take — Why PMLA Matters for IP Exam</h3>
    <p style="margin:0">PMLA 2002 is a <strong>critical exam topic</strong> for Inspector Posts. The Department of Posts is explicitly listed as a <strong>Financial Institution</strong> under PMLA — making this Act directly applicable to every Post Office. PMLA applies via KYC/AML obligations for POSB and PLI/RPLI. Know the <em>3-number rule</em>: <strong>15 of 2003 / 17 Jan 2003 / 01 July 2005</strong>.</p>
  </div>

  <h4 style="color:#c62828">🗓️ Critical Identity Numbers — Never Mix Up!</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:16px">
    <thead><tr style="background:#b71c1c;color:#fff"><th style="border:1px solid #e57373;padding:9px">Parameter</th><th style="border:1px solid #e57373;padding:9px">Value</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px">Act Number</td><td style="border:1px solid #ffcdd2;padding:8px;font-weight:bold">Act 15 of 2003</td></tr>
      <tr style="background:#fff8f8"><td style="border:1px solid #ffcdd2;padding:8px">Date of Enactment</td><td style="border:1px solid #ffcdd2;padding:8px;font-weight:bold">17th January 2003</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px">Date of Commencement</td><td style="border:1px solid #ffcdd2;padding:8px;font-weight:bold">1st July 2005</td></tr>
      <tr style="background:#fff8f8"><td style="border:1px solid #ffcdd2;padding:8px">Extent</td><td style="border:1px solid #ffcdd2;padding:8px;font-weight:bold">Whole of India</td></tr>
    </tbody>
  </table>

  <h4 style="color:#1565c0">💡 Definition Highlights — Exam Traps!</h4>
  <ul>
    <li><strong>Financial Institution</strong> INCLUDES the <strong>Department of Posts</strong> — making POSB/PLI/RPLI subject to PMLA obligations. This is a top MCQ favourite!</li>
    <li><strong>"Person"</strong> under PMLA has 7 categories (i to vii) — including artificial juridical persons and agencies controlled by any of the above.</li>
    <li><strong>Proceeds of Crime</strong> — the key is it can be derived <em>directly OR indirectly</em> from any criminal activity relatable to a scheduled offence, not just the scheduled offence itself.</li>
    <li><strong>Scheduled Offence Part B</strong> — only becomes a PMLA trigger if total value is <strong>₹1 Crore or more</strong>. Below ₹1 Cr, Part B offences are NOT scheduled offences under PMLA.</li>
    <li><strong>Value</strong> = fair market value on the <em>date of acquisition</em>. If acquisition date is unknown, the date of possession is used.</li>
  </ul>

  <h4 style="color:#2e7d32">⚡ Section 3 — 6 Modes of Money Laundering</h4>
  <p>Remember: <strong>C-P-A-U-P-C</strong> — <em>Concealment, Possession, Acquisition, Use, Projecting as untainted, Claiming as untainted</em>. Any one of these with proceeds of crime = money laundering offence.</p>

  <h4 style="color:#bf360c">🔴 Punishment Logic (Section 4)</h4>
  <ul>
    <li>Standard: <strong>3 to 7 years RI</strong> + Fine</li>
    <li>NDPS-linked: <strong>3 to 10 years RI</strong> + Fine (7 replaced by 10)</li>
    <li>The minimum is ALWAYS 3 years. There is no "up to 3 years" — it is NOT LESS THAN 3 years.</li>
  </ul>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ "Continuing Activity" — Key Legal Concept</h4>
    <p style="margin:0">The money laundering offence under Section 3 is a <strong>continuing offence</strong>. As long as a person continues to enjoy proceeds of crime (by concealment, possession, etc.), the offence continues. This has implications for limitation periods and prosecution timelines.</p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c">🎯 Practical Scenarios — PMLA Foundations</h4>

  <div style="background:#e8eaf6;border-left:4px solid #1a237e;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — "Financial Institution" includes Post Office:</strong> A customer opens multiple POSB accounts and deposits large sums, then withdraws and moves funds to avoid tax. Is the Post Office covered under PMLA? → <strong>Yes</strong> — The Department of Posts is explicitly included in the definition of "financial institution" under PMLA, making it a Reporting Entity with obligations for KYC, record-keeping, and reporting suspicious transactions.</p>
  </div>

  <div style="background:#fce4ec;border-left:4px solid #c62828;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — Scheduled Offence Part B Threshold:</strong> A person commits a fraud worth ₹85 Lakhs. Does this trigger PMLA? → <strong>No</strong> — If this fraud is a Part B scheduled offence, it triggers PMLA only if the value is <strong>₹1 Crore or more</strong>. At ₹85 Lakhs, it does NOT qualify as a scheduled offence under Part B, so PMLA does not apply.</p>
  </div>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — NDPS-Related Laundering:</strong> A drug trafficker is caught laundering ₹5 Crore of drug money. What is the maximum punishment? → <strong>10 years RI</strong> + Fine — because the proceeds relate to narcotics/drugs, which substitutes "7 years" with <strong>"10 years"</strong> as the maximum under Section 4.</p>
  </div>

  <div style="background:#fff3e0;border-left:4px solid #e65100;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 4 — Cross-Border Implication:</strong> A person in Dubai conducts fraud and transfers the proceeds to a bank account in India. Is this covered by PMLA? → <strong>Yes</strong> — This falls under "offence of cross border implications" — the conduct outside India constitutes an offence there and would be a scheduled offence if committed in India, and the proceeds are transferred to India.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#e8eaf6,#c5cae9);border-left:5px solid #1a237e;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#1a237e;margin:0 0 10px">⚡ EXAM INSIGHT — PMLA Foundations (Sections 1–4)</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>PMLA = <strong>Act 15 of 2003</strong></li>
      <li>Enacted = <strong>17th January 2003</strong></li>
      <li>In force from = <strong>1st July 2005</strong></li>
      <li>Extends to = <strong>Whole of India</strong></li>
      <li>Department of Posts = <strong>Financial Institution</strong> under PMLA</li>
      <li>Scheduled Offence Part B threshold = <strong>₹1 Crore or more</strong></li>
      <li>Standard punishment = RI <strong>3 to 7 years</strong> + Fine</li>
      <li>NDPS-related punishment = RI <strong>3 to 10 years</strong> + Fine</li>
      <li>6 modes of ML offence = Concealment, Possession, Acquisition, Use, Projecting, Claiming</li>
      <li>Value = <strong>fair market value on date of acquisition</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>PMLA was enacted in <strong>2002</strong> (Act name) but is <strong>Act 15 of 2003</strong> — passed by Parliament in 2003</li>
      <li>"Attachment" = <em>prohibition of transfer/movement</em>, NOT seizure or confiscation</li>
      <li>Reporting Entity = Banking Company + Financial Institution + Intermediary + Designated business/profession</li>
      <li>Proceeds of Crime includes property INDIRECTLY derived — not just directly obtained</li>
    </ul>

    <p style="margin:0 0 8px"><strong>⚠️ Traps & Distinctions:</strong></p>
    <ul style="margin:0;padding-left:20px">
      <li>NDPS: "7 years" is <strong>substituted</strong> by "10 years" — minimum remains 3 years</li>
      <li>Part B scheduled offence ONLY applies if value ≥ <strong>₹1 Crore</strong>; Part A applies regardless of value</li>
      <li>Payment system "includes" credit/debit/smart card, money transfer — it is an <em>explanation</em>, not exhaustive list</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points</h4>
    <ol style="margin:0;padding-left:20px">
      <li>PMLA = <strong>Act 15 of 2003</strong>, enacted <strong>17 Jan 2003</strong>, force from <strong>01 July 2005</strong></li>
      <li>Extends to <strong>whole of India</strong></li>
      <li>Department of Posts = <strong>Financial Institution</strong> under PMLA</li>
      <li>Reporting Entity = any banking company / financial institution / intermediary / designated business</li>
      <li>Scheduled offence Part B = PMLA trigger only if value ≥ <strong>₹1 Crore</strong></li>
      <li>Offence of ML = any of 6 activities (CPAUPC) with proceeds of crime</li>
      <li>ML is a <strong>continuing offence</strong> — continues as long as person enjoys proceeds</li>
      <li>Standard punishment = RI <strong>3 to 7 years</strong> + Fine</li>
      <li>NDPS-related = RI <strong>3 to 10 years</strong> + Fine</li>
      <li>"Value" = fair market value on <strong>date of acquisition</strong> (or possession if acquisition date unknown)</li>
    </ol>
  </div>
</div>`,
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA 2 — PMLA 2002: ATTACHMENT, ADJUDICATION & CONFISCATION (Chapter III)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "PMLA 2002 — Attachment, Adjudication & Confiscation: All Critical Time Limits (Ch. III)",
        rule_number: "Sections 5 to 11",
        act_name: "Prevention of Money-Laundering Act (PMLA), 2002",
        category: "Section",
        effective_date: new Date("2005-07-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#880e4f,#ad1457);color:#fff;padding:18px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.4rem;letter-spacing:1px">⚖️ CHAPTER III — ATTACHMENT, ADJUDICATION & CONFISCATION</h2>
    <p style="margin:8px 0 0;font-size:0.92rem;opacity:0.92">Sections 5 to 11 &nbsp;|&nbsp; Most Time-Limit Heavy Chapter in PMLA</p>
  </div>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Section 5 — Attachment of Property Involved in Money Laundering</h3>
  <ul>
    <li><strong>Who can attach:</strong> The Director or any other officer <strong>not below the rank of Deputy Director</strong> authorised by the Director.</li>
    <li><strong>Basis:</strong> Reason to believe (to be recorded in <strong>writing</strong>) that —
      <ul>
        <li>(a) Any person is in possession of proceeds of crime; AND</li>
        <li>(b) Such proceeds are likely to be <em>concealed, transferred or dealt with</em> in any manner which may frustrate confiscation proceedings.</li>
      </ul>
    </li>
    <li><strong>Duration:</strong> Provisional attachment for a period <strong>not exceeding 180 days</strong> from the date of the order.</li>
    <li><strong>After attachment:</strong> Director/Deputy Director shall <em>immediately</em> forward a copy of the order along with material in his possession to the <strong>Adjudicating Authority</strong> in a <strong>sealed envelope</strong>.</li>
    <li><strong>Complaint filing:</strong> The Director/officer who provisionally attaches property shall, within a period of <strong>30 days</strong> from such attachment, file a complaint before the Adjudicating Authority.</li>
  </ul>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Section 6 — Adjudicating Authorities: Composition, Powers</h3>
  <ul>
    <li><strong>Composition:</strong> An Adjudicating Authority shall consist of a <strong>Chairperson</strong> and <strong>two other Members</strong>.</li>
    <li><strong>Qualification for Member (Law field):</strong> (i) Qualified for appointment as District Judge; OR (ii) Has been a member of Indian Legal Service and held a post in <strong>Grade I</strong> of that service.</li>
    <li><strong>Qualification for Member (Finance/Accountancy/Administration):</strong> Possesses such qualifications as may be prescribed.</li>
    <li><strong>Bench location:</strong> The bench of Adjudicating Authority shall ordinarily sit at <strong>New Delhi</strong>.</li>
    <li><strong>Term of office:</strong> The Chairperson and every Member shall hold office for a term of <strong>5 years</strong> from the date on which he enters upon office OR attaining <strong>65 years</strong>, whichever is the earliest.</li>
    <li><strong>Procedure:</strong> The Adjudicating Authority shall NOT be bound by the Code of Civil Procedure, 1908 but shall be guided by the principles of <strong>natural justice</strong>.</li>
  </ul>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">Section 8 — Adjudication Process</h3>
  <ul>
    <li>If the Adjudicating Authority has reason to believe that any person has committed an offence under Section 3 or is in possession of proceeds of crime, it may serve a <strong>notice of not less than 30 days</strong> calling upon him to indicate source of income.</li>
    <li>The Adjudicating Authority shall consider the reply (if any) to the notice issued.</li>
    <li><strong>Where attachment continues:</strong> Where the AA decides that property is involved in money laundering, the attachment of property will continue for a period <strong>not exceeding 365 days</strong> during the pendency of the proceedings under any court.</li>
    <li><strong>Stay exclusion:</strong> The period during which investigation is <em>stayed by any court</em> under any law shall be EXCLUDED from the computation of 365 days.</li>
    <li><strong>Confiscation:</strong> Where the Special Court finds money laundering offence committed, it shall order that property shall stand <strong>confiscated to the Central Government</strong>.</li>
  </ul>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Section 9 — Vesting of Property in Central Government</h3>
  <ul>
    <li>Where an order of confiscation has been made, all rights and title in such property shall <strong>vest absolutely in the Central Government</strong> free from all encumbrances.</li>
    <li>If the Special Court or Adjudicating Authority finds that any encumbrance/lease-hold interest was created to <strong>defeat provisions of this Chapter</strong>, it may declare such encumbrance/lease-hold interest to be <strong>void</strong>.</li>
  </ul>

  <h3 style="color:#4a148c;border-left:5px solid #4a148c;padding-left:12px">Section 10 — Management of Confiscated Properties</h3>
  <ul>
    <li>The Central Government may, by order published in the <strong>Official Gazette</strong>, appoint officers (not below the rank of <strong>Joint Secretary to the Government of India</strong>) to perform the functions of an <strong>Administrator</strong>.</li>
    <li>The Administrator shall receive and manage the property in relation to which an order has been made.</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #bf360c;padding-left:12px">Section 11 — Powers Regarding Summons, Production of Documents</h3>
  <p>The Adjudicating Authority shall have the same powers as are vested in a <strong>civil court</strong> under Code of Civil Procedure, 1908 in respect of —</p>
  <ul>
    <li>(a) Discovery and inspection</li>
    <li>(b) Enforcing attendance of any person (including officer of banking company/financial institution/company) and examining him on oath</li>
    <li>(c) Compelling production of records</li>
    <li>(d) Receiving evidence on affidavits</li>
    <li>(e) Issuing commissions for examination of witnesses and documents</li>
    <li>(f) Any other matter as may be prescribed</li>
  </ul>

  <div style="background:#fff8e1;border:1.5px solid #f9a825;border-radius:8px;padding:14px 18px;margin-top:16px">
    <h4 style="color:#e65100;margin:0 0 10px">📊 MASTER TIME LIMITS TABLE — Chapter III</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="border:1px solid #ffcc80;padding:9px">Stage / Provision</th>
          <th style="border:1px solid #ffcc80;padding:9px">Time Limit</th>
          <th style="border:1px solid #ffcc80;padding:9px">Section</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Provisional Attachment Order validity</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Not exceeding 180 days</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 5(1)</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Filing complaint to Adjudicating Authority (after attachment)</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Within 30 days</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 5(5)</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Notice period to indicate source of income (adjudication)</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Not less than 30 days</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 8(1)</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Attachment continuation during court proceedings (investigation)</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Not exceeding 365 days</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 8(3)</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Retention period for seized property/records</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Not exceeding 180 days</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 20/21</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Withholding release after court/AA order</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Up to 90 days</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 21</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Application for retention (after seizure/freezing)</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Within 30 days</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 17(4)</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Production of searched person to Gazetted Officer / Magistrate</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Within 24 hours</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 18</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Taking arrested person to Special Court / Magistrate</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Within 24 hours</td><td style="border:1px solid #ffe0b2;padding:8px">Sec. 19</td></tr>
      </tbody>
    </table>
  </div>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#fce4ec,#f8bbd9);border-left:5px solid #880e4f;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#880e4f;margin:0 0 8px">🧠 Dak Guru's Strategy — Chapter III Time Limits</h3>
    <p style="margin:0">Chapter III is the <strong>most time-limit intensive chapter</strong> of PMLA. The examiner loves to ask about specific days. Remember the <strong>three "180s"</strong>: provisional attachment (180 days), seizure retention (180 days). And the <strong>two "30s"</strong>: complaint filing (30 days), notice period (30 days). The <strong>"365"</strong> is for investigation during court proceedings.</p>
  </div>

  <h4 style="color:#880e4f">💡 Adjudicating Authority — Key Facts</h4>
  <ul>
    <li>Composition: <strong>1 Chairperson + 2 Members</strong> (total 3)</li>
    <li>Bench at: <strong>New Delhi</strong> (ordinarily)</li>
    <li>Term: <strong>5 years</strong> OR <strong>age 65</strong>, whichever is earlier</li>
    <li>NOT bound by CPC, 1908 — guided by principles of <strong>natural justice</strong></li>
    <li>Has powers of <strong>civil court</strong> for summoning, documents, evidence</li>
  </ul>

  <h4 style="color:#1565c0">🔑 Section 5 — The Attachment Drill</h4>
  <ol>
    <li>Director/Deputy Director has reason to believe (recorded in writing)</li>
    <li>Issues provisional attachment order — valid for <strong>180 days</strong></li>
    <li>Immediately forwards copy to Adjudicating Authority in a <strong>sealed envelope</strong></li>
    <li>Within <strong>30 days</strong> — files complaint to Adjudicating Authority</li>
    <li>AA sends notice of minimum <strong>30 days</strong> to the accused</li>
    <li>If AA decides property is involved in ML — attachment continues for up to <strong>365 days</strong></li>
  </ol>

  <h4 style="color:#2e7d32">🏛️ Administrator Qualification</h4>
  <p>Under Section 10, the Administrator for managing confiscated properties must be an officer of rank <strong>not below Joint Secretary to the Government of India</strong>. Appointed by the Central Government through <strong>Official Gazette</strong>. This is a less-known but exam-relevant detail.</p>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ 365 Days — Stay Exclusion Rule!</h4>
    <p style="margin:0">For computing the 365-day investigation period, any period during which the investigation is <strong>stayed by any court</strong> under any law is <strong>EXCLUDED</strong>. This means the actual 365-day clock pauses during a court-ordered stay. Examiners love trapping students on this!</p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#880e4f">🎯 Practical Scenarios — Attachment & Adjudication</h4>

  <div style="background:#fce4ec;border-left:4px solid #880e4f;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — Missed Complaint Deadline:</strong> Property is provisionally attached on 1st January. The Director files the complaint before the Adjudicating Authority on 5th February (35 days later). Is the attachment valid? → <strong>No</strong> — The complaint must be filed within <strong>30 days</strong> of provisional attachment (Section 5(5)). Filing on Day 35 violates the mandatory timeline and the attachment becomes legally infirm.</p>
  </div>

  <div style="background:#e8eaf6;border-left:4px solid #1a237e;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — AA Composition Question:</strong> An Adjudicating Authority is constituted. How many members is it? → <strong>3 members total</strong> — 1 Chairperson + 2 other Members. The bench ordinarily sits at <strong>New Delhi</strong>. Members serve for 5 years or till age 65, whichever is earlier.</p>
  </div>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — Stay Extension:</strong> AA decides to continue attachment for investigation. A court stays proceedings for 45 days during the 365-day period. What is the effective period? → The 365-day investigation period is <strong>extended by 45 days</strong> (the stay period is excluded), giving an effective period of 365 + 45 = 410 calendar days.</p>
  </div>

  <div style="background:#fff3e0;border-left:4px solid #e65100;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 4 — Administrator Qualification:</strong> The CG needs to appoint a property administrator for confiscated ML assets. What is the minimum rank? → Not below the rank of <strong>Joint Secretary to the Government of India</strong>. The appointment must be made by order published in the <strong>Official Gazette</strong>.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#fce4ec,#f8bbd9);border-left:5px solid #880e4f;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#880e4f;margin:0 0 10px">⚡ EXAM INSIGHT — Chapter III (Sections 5–11)</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>Provisional Attachment: <strong>180 days</strong></li>
      <li>Complaint to AA after attachment: <strong>30 days</strong></li>
      <li>Notice period for accused (Sec. 8): <strong>NOT LESS than 30 days</strong></li>
      <li>Investigation/attachment continuation during court proceedings: <strong>365 days</strong></li>
      <li>Seizure retention: <strong>180 days</strong></li>
      <li>Withholding release after court order: <strong>90 days</strong></li>
      <li>AA Composition: <strong>1 Chairperson + 2 Members</strong></li>
      <li>AA Bench location: <strong>New Delhi</strong></li>
      <li>Term of AA Chairperson/Member: <strong>5 years or 65 years</strong> age, whichever earlier</li>
      <li>AA powers: equivalent to <strong>civil court</strong></li>
      <li>AA is NOT bound by: <strong>CPC 1908</strong></li>
      <li>Confiscation vests property in: <strong>Central Government</strong></li>
      <li>Administrator minimum rank: <strong>Joint Secretary to GOI</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>"30 days for complaint" vs "30 days notice" — complaint = WITHIN 30 days; notice = NOT LESS THAN 30 days</li>
      <li>180 days = provisional attachment; 365 days = investigation continuation during court proceedings</li>
      <li>AA is guided by <strong>natural justice</strong>, NOT CPC</li>
    </ul>

    <p style="margin:0 0 8px"><strong>⚠️ Traps:</strong></p>
    <ul style="margin:0;padding-left:20px">
      <li>Court stay period is <strong>EXCLUDED</strong> from 365-day count</li>
      <li>Attachment order forwarded in <strong>sealed envelope</strong> — not open envelope</li>
      <li>After 180 days seizure period, property returned UNLESS AA permits continuation</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points</h4>
    <ol style="margin:0;padding-left:20px">
      <li>Attachment by: <strong>Director / not below Dy. Director</strong> (reason recorded in writing)</li>
      <li>Provisional attachment valid: <strong>180 days</strong></li>
      <li>Complaint to AA: within <strong>30 days</strong> of attachment</li>
      <li>AA notice to accused: minimum <strong>30 days</strong></li>
      <li>Investigation continuation: max <strong>365 days</strong> (stay periods excluded)</li>
      <li>Seizure retention: max <strong>180 days</strong> (AA may extend)</li>
      <li>Withhold release: max <strong>90 days</strong></li>
      <li>AA = <strong>1 Chairperson + 2 Members</strong>, bench at <strong>New Delhi</strong></li>
      <li>Term of AA: <strong>5 years or age 65</strong>, whichever earlier</li>
      <li>Confiscation → vests in <strong>Central Government free from all encumbrances</strong></li>
    </ol>
  </div>
</div>`,
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA 3 — PMLA 2002: OBLIGATIONS, SEARCH, ARREST, SPECIAL COURTS & APPEALS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "PMLA 2002 — Obligations, Searches, Arrests, Special Courts & Appeals (Ch. IV, V, VI, VII)",
        rule_number: "Sections 12, 13, 16–19, 24–26, 35, 41–46",
        act_name: "Prevention of Money-Laundering Act (PMLA), 2002",
        category: "Section",
        effective_date: new Date("2005-07-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#004d40,#00695c);color:#fff;padding:18px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.4rem;letter-spacing:1px">🔍 CHAPTERS IV, V, VI, VII — OBLIGATIONS, SEARCHES, COURTS & APPEALS</h2>
    <p style="margin:8px 0 0;font-size:0.92rem;opacity:0.92">Record-Keeping · Penalties · Powers · Arrests · Burden of Proof · Appeals</p>
  </div>

  <h3 style="color:#004d40;border-left:5px solid #004d40;padding-left:12px">CHAPTER IV — Section 12: Reporting Entity to Maintain Records</h3>
  <p>Every reporting entity shall —</p>
  <ul>
    <li><strong>(a) Transactions Record:</strong> Maintain a record of all transactions (including attempted ones) in a manner enabling reconstruction of individual transactions. Records shall be maintained for a period of <strong>five years from the date of transaction</strong> between a client and the reporting entity.</li>
    <li><strong>(b) Furnish to Director:</strong> Information relating to such transactions, whether attempted or executed, the nature and value of which may be prescribed.</li>
    <li><strong>(c) Identity/KYC Records:</strong> Maintain record of documents evidencing identity of clients and beneficial owners, account files and business correspondence. Records shall be maintained for <strong>five years after the business relationship ends or account is closed, whichever is later</strong>.</li>
  </ul>
  <p><strong>Confidentiality:</strong> Every information maintained, furnished or verified shall be kept <strong>confidential</strong> (save as otherwise provided under any law).</p>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Section 13 — Power of Director to Impose Fine</h3>
  <p>If a reporting entity/its designated director/any employee fails to comply with obligations under Chapter IV, the Director may —</p>
  <ul>
    <li>(a) Issue a <strong>warning in writing</strong>; or</li>
    <li>(b) Direct compliance with specific instructions; or</li>
    <li>(c) Direct to send reports at prescribed intervals; or</li>
    <li>(d) By order, impose a <strong>monetary penalty</strong> — not less than <strong>₹10,000</strong> but may extend to <strong>₹1,00,000</strong> for <strong>each failure</strong>.</li>
  </ul>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">CHAPTER V — Section 17: Search and Seizure</h3>
  <p><strong>Who:</strong> Director or any other officer not below the rank of <strong>Deputy Director</strong> authorised by him.</p>
  <p><strong>Basis:</strong> Reason to believe (recorded in writing) that any person —</p>
  <ul>
    <li>(i) Has committed money-laundering; or</li>
    <li>(ii) Is in possession of proceeds of crime; or</li>
    <li>(iii) Is in possession of records relating to ML; or</li>
    <li>(iv) Is in possession of property related to crime</li>
  </ul>
  <p><strong>Powers include:</strong> (a) Enter and search buildings/place/vessel/vehicle/aircraft; (b) Break open locks where keys not available; (c) Seize any record or property found; (d) Place marks of identification; (e) Make note/inventory; (f) Examine on oath any person in possession/control of records.</p>
  <p><strong>30-Day Rule:</strong> The authority seizing/freezing any record or property shall, within <strong>30 days</strong> from such seizure/freezing, file an application requesting retention or continuation of freezing order before the Adjudicating Authority.</p>

  <h3 style="color:#6a1b9a;border-left:5px solid #6a1b9a;padding-left:12px">Section 18 — Search of Person</h3>
  <ul>
    <li>If an authority (authorised by Central Government by general or special order) has reason to believe (in writing) that any person has secreted any record or proceeds of crime, it may <strong>search that person</strong> and seize such record or property.</li>
    <li>If such person so requires, he shall be taken within <strong>24 hours</strong> to the nearest <strong>Gazetted Officer</strong> (superior in rank) or a <strong>Magistrate</strong>.</li>
    <li>The 24-hour period <strong>excludes</strong> the time necessary for journey to such Gazetted Officer or Magistrate's Court.</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #bf360c;padding-left:12px">Section 19 — Power to Arrest</h3>
  <ul>
    <li><strong>Who can arrest:</strong> The Director, Deputy Director, Assistant Director or any other officer authorised by Central Government.</li>
    <li><strong>Basis:</strong> Reason to believe (recorded in writing) that any person has been guilty of an offence punishable under this Act.</li>
    <li><strong>On arrest:</strong> Shall, as soon as may be, <strong>inform him of the grounds for such arrest</strong>.</li>
    <li><strong>Forwarding order:</strong> Immediately after arrest, forward a copy of the order along with material in his possession to the Adjudicating Authority in a <strong>sealed envelope</strong>.</li>
    <li><strong>24-Hour Rule:</strong> Every person arrested shall, within <strong>24 hours</strong>, be taken to a <strong>Special Court</strong> or Judicial Magistrate or Metropolitan Magistrate (having jurisdiction). The 24-hour period <strong>excludes</strong> journey time from place of arrest to Court.</li>
  </ul>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Section 24 — Burden of Proof</h3>
  <p>In any proceeding relating to proceeds of crime under this Act —</p>
  <ul>
    <li><strong>(a)</strong> In case of a person charged with offence of money-laundering, the Authority or Court shall, <em>unless the contrary is proved</em>, <strong>presume that proceeds of crime ARE involved in money-laundering</strong>; AND</li>
    <li><strong>(b)</strong> In case of any other person, the Authority or Court MAY presume that proceeds of crime are involved in money-laundering.</li>
  </ul>
  <p><em>Key: The burden of proof lies on the ACCUSED to prove the property is NOT proceeds of crime — opposite to normal criminal law.</em></p>

  <h3 style="color:#004d40;border-left:5px solid #004d40;padding-left:12px">CHAPTER VI — Section 25 & 26: Appellate Tribunal</h3>
  <ul>
    <li><strong>Section 25:</strong> Appellate Tribunal is setup under <em><strong>The Smugglers and Foreign Exchange Manipulators (Forfeiture of Property) Act, 1976 (SAFEMA)</strong></em>.</li>
    <li><strong>Section 26:</strong> Any person aggrieved by an order of the Adjudicating Authority OR any reporting entity aggrieved by an order of the Director may prefer an appeal to the Appellate Tribunal.</li>
    <li><strong>Time limit for appeal:</strong> Every appeal shall be filed within <strong>45 days</strong> from the date on which a copy of the order is received.</li>
    <li><strong>Disposal:</strong> Endeavour shall be made to dispose of the appeal finally within <strong>6 months</strong> from the date of filing of the appeal.</li>
  </ul>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Section 42 — Appeal to High Court</h3>
  <p>Any person aggrieved by any decision or order of the Appellate Tribunal may file an appeal to the <strong>High Court</strong> within <strong>60 days</strong> from the date of communication of the decision.</p>

  <h3 style="color:#880e4f;border-left:5px solid #880e4f;padding-left:12px">CHAPTER VII — Section 43 & 44: Special Courts</h3>
  <ul>
    <li>The Central Government, in consultation with the <strong>Chief Justice of the High Court</strong>, shall designate one or more <strong>Courts of Session</strong> as Special Court or Special Courts for trial of offences punishable under Section 4.</li>
    <li>Offences triable by Special Court shall be tried by the Special Court constituted for the <strong>area in which the offence has been committed</strong>.</li>
    <li>Special Courts follow <strong>Code of Criminal Procedure, 1973 / Bharatiya Nagarik Suraksha Sanhita, 2023</strong> as applicable to a Court of Session.</li>
  </ul>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">Section 45 — Offences Cognizable and Non-Bailable</h3>
  <ul>
    <li>No person accused of an offence under PMLA shall be released on bail or on his own bond <strong>unless</strong> —
      <ul>
        <li>(1) The <strong>Public Prosecutor</strong> has been given an opportunity to oppose the application for release; AND</li>
        <li>(2) Where the PP opposes the application, the court is satisfied that there are reasonable grounds for believing that he is <strong>not guilty</strong> of such offence AND is <strong>not likely to commit any offence</strong> while on bail.</li>
      </ul>
    </li>
    <li><strong>Bail Relaxation:</strong> Strict conditions are relaxed if the accused is —
      <ul>
        <li>Under the age of <strong>16 years</strong>; OR</li>
        <li>Is a <strong>woman</strong>; OR</li>
        <li>Is <strong>sick or infirm</strong>; OR</li>
        <li>Is accused of laundering a sum of <strong>less than ₹1 Crore</strong></li>
      </ul>
    </li>
    <li><strong>Cognizance of offence:</strong> Special Court shall not take cognizance except upon a complaint in writing made by — (1) The Director; OR (2) Any officer of the Central Government or State Government authorised in writing by the Central Government.</li>
  </ul>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Section 46 — Application of CrPC + Public Prosecutor Qualification</h3>
  <p>A person shall NOT be qualified to be appointed as a Public Prosecutor or Special Public Prosecutor unless he has been in practice as an advocate for <strong>not less than 7 years</strong> under the union or state, requiring special knowledge of law.</p>

  <h3 style="color:#4a148c;border-left:5px solid #4a148c;padding-left:12px">CHAPTER X Miscellaneous — Sections 62, 63, 64</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
    <thead><tr style="background:#4a148c;color:#fff"><th style="border:1px solid #ce93d8;padding:9px">Section</th><th style="border:1px solid #ce93d8;padding:9px">Offence</th><th style="border:1px solid #ce93d8;padding:9px">Punishment</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #e1bee7;padding:8px;font-weight:bold">Sec. 62</td><td style="border:1px solid #e1bee7;padding:8px">Vexatious search (searching without recording reasons)</td><td style="border:1px solid #e1bee7;padding:8px">Imprisonment up to <strong>2 years</strong> OR Fine up to <strong>₹50,000</strong> or both</td></tr>
      <tr style="background:#f3e5f5"><td style="border:1px solid #e1bee7;padding:8px;font-weight:bold">Sec. 63(1)</td><td style="border:1px solid #e1bee7;padding:8px">Wilfully giving false information causing arrest/search</td><td style="border:1px solid #e1bee7;padding:8px">Imprisonment up to <strong>2 years</strong> OR Fine up to <strong>₹50,000</strong> or both</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px;font-weight:bold">Sec. 63(2)</td><td style="border:1px solid #e1bee7;padding:8px">Refusing to answer/sign/attend after summons</td><td style="border:1px solid #e1bee7;padding:8px">Penalty not less than <strong>₹500</strong> but may extend to <strong>₹10,000</strong></td></tr>
      <tr style="background:#f3e5f5"><td style="border:1px solid #e1bee7;padding:8px;font-weight:bold">Sec. 64</td><td style="border:1px solid #e1bee7;padding:8px">Cognizance of Sec. 62 & 63 offences</td><td style="border:1px solid #e1bee7;padding:8px">Requires <strong>previous sanction of CG</strong>; CG to decide within <strong>90 days</strong></td></tr>
    </tbody>
  </table>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e0f2f1,#b2dfdb);border-left:5px solid #004d40;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 8px">🧠 Dak Guru's Appeal Hierarchy Map</h3>
    <p style="margin:0">Understand the <strong>3-tier appeal structure</strong> of PMLA:</p>
    <p style="margin:8px 0 0"><strong>Adjudicating Authority → Appellate Tribunal (within 45 days) → High Court (within 60 days)</strong></p>
    <p style="margin:6px 0 0">The Appellate Tribunal targets disposal within <strong>6 months</strong>. Civil courts have NO jurisdiction under PMLA (Section 41).</p>
  </div>

  <h4 style="color:#004d40">⚖️ Burden of Proof — The Big Reversal!</h4>
  <p>In normal criminal law, the prosecution has to prove guilt. In PMLA — <strong>it is REVERSED</strong>. The court/authority presumes that proceeds of crime ARE involved in ML unless the <strong>accused proves otherwise</strong>. This is the <em>reverse burden of proof</em> (Section 24). Extremely important for exams!</p>

  <h4 style="color:#1565c0">🚔 Bail "Twin Test" (Section 45)</h4>
  <p>For bail in PMLA offences, TWO conditions must be satisfied simultaneously:</p>
  <ol>
    <li>Public Prosecutor gets opportunity to oppose, AND</li>
    <li>Court believes accused is (a) NOT guilty AND (b) NOT likely to commit offence on bail</li>
  </ol>
  <p>These are the <strong>"Twin Conditions"</strong> for bail. The exceptions (under 16, woman, sick, <₹1Cr) are relaxed from these strict conditions.</p>

  <h4 style="color:#880e4f">🏛️ Special Court vs Appellate Tribunal</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:16px">
    <thead><tr style="background:#880e4f;color:#fff"><th style="border:1px solid #f48fb1;padding:9px">Aspect</th><th style="border:1px solid #f48fb1;padding:9px">Special Court</th><th style="border:1px solid #f48fb1;padding:9px">Appellate Tribunal</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #fce4ec;padding:8px">What it is</td><td style="border:1px solid #fce4ec;padding:8px">Designated Court of Session</td><td style="border:1px solid #fce4ec;padding:8px">Setup under SAFEMA, 1976</td></tr>
      <tr style="background:#fff8f8"><td style="border:1px solid #fce4ec;padding:8px">Designated by</td><td style="border:1px solid #fce4ec;padding:8px">CG in consultation with CJ of HC</td><td style="border:1px solid #fce4ec;padding:8px">Under SAFEMA</td></tr>
      <tr><td style="border:1px solid #fce4ec;padding:8px">Tries</td><td style="border:1px solid #fce4ec;padding:8px">Offences under Section 4 + scheduled offences</td><td style="border:1px solid #fce4ec;padding:8px">Appeals from AA orders & Director orders</td></tr>
      <tr style="background:#fff8f8"><td style="border:1px solid #fce4ec;padding:8px">Appeal from</td><td style="border:1px solid #fce4ec;padding:8px">Appellate Tribunal (within 60 days)</td><td style="border:1px solid #fce4ec;padding:8px">AA/Director (within 45 days)</td></tr>
    </tbody>
  </table>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ Section 12 Record-Keeping — The Two "5-Year" Rules</h4>
    <p style="margin:0"><strong>Rule 1 —</strong> Transaction records: 5 years from <em>date of transaction</em>. <strong>Rule 2 —</strong> Identity/KYC records: 5 years after <em>business relationship ends or account is closed, whichever is LATER</em>. The distinction is important — "later" means the clock starts from whichever event happens after the other.</p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#004d40">🎯 Practical Scenarios — Obligations, Searches & Courts</h4>

  <div style="background:#e0f2f1;border-left:4px solid #004d40;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — Record Retention (Section 12):</strong> A customer closes his POSB account on 1st January 2025 after making his last transaction on 1st October 2024. When can the records be destroyed? → The identity/KYC records must be retained for <strong>5 years after account closure (1st Jan 2030)</strong> and transaction records for 5 years after transaction (1st Oct 2029). Use whichever is LATER = <strong>1st January 2030</strong>.</p>
  </div>

  <div style="background:#fce4ec;border-left:4px solid #880e4f;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — Bail (Section 45):</strong> A 15-year-old boy is accused of money laundering of ₹2 Crores. Does he qualify for bail relaxation? → <strong>Yes, on age ground</strong> — he is under 16 years. However, note that the ₹2 Crore amount does NOT qualify for relaxation (only <₹1 Crore qualifies). The age condition alone is sufficient for relaxation.</p>
  </div>

  <div style="background:#e8eaf6;border-left:4px solid #1a237e;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — Appeal Timeline:</strong> An Adjudicating Authority passes an order on 1st March. When is the last date to appeal to the Appellate Tribunal? → <strong>Within 45 days</strong> of receiving copy of the order = by approximately 15th April (45 days from receiving the copy of order).</p>
  </div>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 4 — Fine for Non-Compliance (Section 13):</strong> A post office fails to maintain KYC records as required. The Director finds 5 such failures during an inquiry. What is the minimum fine? → ₹10,000 per failure × 5 failures = minimum <strong>₹50,000</strong>. Maximum fine = ₹1,00,000 × 5 = ₹5,00,000.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#e0f2f1,#b2dfdb);border-left:5px solid #004d40;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#004d40;margin:0 0 10px">⚡ EXAM INSIGHT — Chapters IV–VII</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>Transaction record: <strong>5 years from date of transaction</strong></li>
      <li>KYC/Identity record: <strong>5 years after business relationship ends or account closed (later)</strong></li>
      <li>Fine for non-compliance: <strong>₹10,000 to ₹1,00,000 per failure</strong></li>
      <li>Seizure/retention application: within <strong>30 days</strong></li>
      <li>Arrest → production before court: within <strong>24 hours</strong> (journey time excluded)</li>
      <li>Burden of proof: on the <strong>Accused</strong> (reverse burden)</li>
      <li>Appellate Tribunal setup under: <strong>SAFEMA, 1976</strong></li>
      <li>Appeal to AT: within <strong>45 days</strong></li>
      <li>AT disposal target: within <strong>6 months</strong></li>
      <li>Appeal to HC: within <strong>60 days</strong></li>
      <li>Civil court jurisdiction: <strong>barred</strong> (Sec. 41)</li>
      <li>Special Court = designated <strong>Court of Session</strong></li>
      <li>Special Court designated by: <strong>CG + CJ of HC</strong></li>
      <li>Bail relaxation: age < <strong>16</strong>, woman, sick/infirm, amount < <strong>₹1 Crore</strong></li>
      <li>PP minimum qualification: <strong>7 years as advocate</strong></li>
      <li>Vexatious search punishment: RI up to <strong>2 years OR ₹50,000</strong></li>
      <li>Refusing to answer summons: penalty <strong>₹500 to ₹10,000</strong></li>
      <li>Sanction for cognizance (Sec. 64): CG decides within <strong>90 days</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>Appellate Tribunal ← under SAFEMA 1976 (NOT under PMLA itself)</li>
      <li>Appeal to AT = 45 days; Appeal to HC = 60 days — don't swap!</li>
      <li>Burden of proof in PMLA: on <strong>accused</strong> (opposite of normal criminal law)</li>
      <li>Sec. 62 & 63 both have same max punishment: 2 years/₹50,000; but Sec.63(2) is a different penalty (₹500–₹10,000)</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points</h4>
    <ol style="margin:0;padding-left:20px">
      <li>Transaction records: <strong>5 years from date of transaction</strong></li>
      <li>KYC records: <strong>5 years after business ends or account closed (later)</strong></li>
      <li>Director's fine: <strong>₹10,000 to ₹1,00,000</strong> per failure</li>
      <li>Search: by Director / not below <strong>Deputy Director</strong></li>
      <li>Seizure application to AA: within <strong>30 days</strong></li>
      <li>Arrested person to court: within <strong>24 hours</strong> (journey time excluded)</li>
      <li>Burden of proof: on <strong>accused</strong> (reverse burden)</li>
      <li>AT under <strong>SAFEMA 1976</strong>; appeal within <strong>45 days</strong>, disposal in <strong>6 months</strong></li>
      <li>HC appeal: within <strong>60 days</strong></li>
      <li>Bail "Twin Test" + 4 exceptions (age<16, woman, sick/infirm, <₹1Cr)</li>
    </ol>
  </div>
</div>`,
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DAK SUTRA 4 — PMLA 2002: POSTAL SECTOR — KYC / AML / CTR / STR COMPLIANCE
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "PMLA 2002 — Postal KYC, AML/CFT Compliance: Risk Categorisation, CTR, STR & Record Retention",
        rule_number: "Section 12, 12AA — KYC/AML/CFT Guidelines for POSB & PLI/RPLI",
        act_name: "Prevention of Money-Laundering Act (PMLA), 2002",
        category: "Section",
        effective_date: new Date("2005-07-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#e65100,#f4511e);color:#fff;padding:18px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.4rem;letter-spacing:1px">🏦 POSTAL SECTOR PMLA COMPLIANCE</h2>
    <p style="margin:8px 0 0;font-size:0.92rem;opacity:0.92">KYC / AML / CFT Norms for PLI, RPLI & POSB | Section 12AA of PMLA, 2002</p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">KYC Policy · Risk Categorisation · CTR · STR · Record Retention</p>
  </div>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">KYC Policy — 4 Pillars (Under PMLA for POSB)</h3>
  <p>Under PMLA provisions, Post Office Savings Bank declares its KYC Policy on the following four elements:</p>
  <ol>
    <li><strong>Customer Acceptance Policy (CAP)</strong></li>
    <li><strong>Risk Management</strong></li>
    <li><strong>Customer Identification Procedure (CIP)</strong></li>
    <li><strong>Monitoring of Transactions, Record Keeping and Reporting</strong></li>
  </ol>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Customer Due Diligence (CDD)</h3>
  <p>Conducting CDD implies that each Post Office obtains satisfactory evidence and properly establishes in its records the <strong>identity and legal existence</strong> of any person doing any kind of business with it. Such evidence must be substantiated by <strong>reliable and independent source documents</strong>.</p>

  <h4 style="color:#1565c0;margin-left:8px">KYC Norms — Documents Required</h4>
  <p><strong>(a) For ALL risk categories:</strong></p>
  <ol>
    <li>Two Photographs (AOF+KYC Form) — Three in case of Branch Office (extra photo on specimen signature book)</li>
    <li>Aadhaar</li>
    <li>PAN</li>
    <li>Address Proof — Aadhaar or PAN</li>
    <li>If Aadhaar or PAN don't have present address: Official Valid Document or Document used for Limited purpose</li>
  </ol>
  <p><strong>(b) For High Risk categories:</strong> All items in (a) PLUS <strong>Proof of Source of Fund</strong>.</p>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">Risk Categorisation of Customers (POSB)</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:14px">
    <thead>
      <tr style="background:#1b5e20;color:#fff">
        <th style="border:1px solid #a5d6a7;padding:10px">Risk Category</th>
        <th style="border:1px solid #a5d6a7;padding:10px">Criteria (Balance / Maturity Value of All Accounts)</th>
        <th style="border:1px solid #a5d6a7;padding:10px">Re-KYC Frequency</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#c8e6c9">
        <td style="border:1px solid #a5d6a7;padding:9px;font-weight:bold;color:#1b5e20">🟢 LOW RISK</td>
        <td style="border:1px solid #a5d6a7;padding:9px">Does NOT exceed <strong>₹50,000</strong></td>
        <td style="border:1px solid #a5d6a7;padding:9px;font-weight:bold">Every <strong>7 Years</strong></td>
      </tr>
      <tr>
        <td style="border:1px solid #a5d6a7;padding:9px;font-weight:bold;color:#e65100">🟡 MEDIUM RISK</td>
        <td style="border:1px solid #a5d6a7;padding:9px">Exceeds <strong>₹50,000</strong> up to <strong>₹10 Lakh</strong></td>
        <td style="border:1px solid #a5d6a7;padding:9px;font-weight:bold">Every <strong>5 Years</strong></td>
      </tr>
      <tr style="background:#ffcdd2">
        <td style="border:1px solid #ef9a9a;padding:9px;font-weight:bold;color:#b71c1c">🔴 HIGH RISK</td>
        <td style="border:1px solid #ef9a9a;padding:9px">Exceeds <strong>₹10 Lakh</strong> (also PEPs)</td>
        <td style="border:1px solid #ef9a9a;padding:9px;font-weight:bold">Every <strong>2 Years</strong></td>
      </tr>
    </tbody>
  </table>
  <p><strong>Important:</strong> For High Risk category accounts, <strong>Proof of Source of Fund is mandatory</strong>.</p>
  <p><strong>PEP — Politically Exposed Persons:</strong> Heads of State/Government, Senior politicians, Senior government or judicial or military officers, Senior executive of state-owned corporation, and important political party officials. Accounts related to PEPs <strong>residing outside India</strong> shall fall under <strong>High Risk Category</strong>.</p>

  <h3 style="color:#880e4f;border-left:5px solid #880e4f;padding-left:12px">Customer Acceptance Policy (CAP)</h3>
  <ul>
    <li>No account is opened in <strong>anonymous or fictitious name/benami</strong>.</li>
    <li>Not to open/close an existing account where POSB is unable to apply appropriate CDD measures or verify identity or obtain required documents.</li>
    <li>Any decision to close account should be taken by the <strong>Head of the Postal Division</strong> by giving suitable notice to the customer.</li>
    <li><strong>PLI Max Sum Assured:</strong> ₹<strong>50 Lakhs</strong> for all policies combined (existing and proposed), subject to — 10 times annual income till age of entry of 40 years; 7 times annual income for age of entry exceeding 40 years.</li>
    <li><strong>RPLI Max Sum Assured:</strong> ₹<strong>10 Lakhs</strong> for all policies combined, subject to same multipliers (10x ≤40yr, 7x >40yr).</li>
  </ul>

  <h3 style="color:#004d40;border-left:5px solid #004d40;padding-left:12px">Transactions to be Monitored & Maintained</h3>
  <p>All post offices shall maintain the record of all transactions including the record of:</p>
  <ul>
    <li>(a) All cash transactions of value of <strong>more than ₹10 Lakh</strong>.</li>
    <li>(b) All series of cash transactions which are <strong>less than ₹10 Lakh</strong> but are integrally connected and are carried out within <strong>one month</strong> period and totally exceed ₹10 Lakh.</li>
    <li>(c) Any transaction where cash is accepted and <strong>forged or counterfeit currency notes</strong> are used or where forgery of valuable security or documents has taken place.</li>
    <li>(d) Any <strong>attempted transaction</strong> involving forged or counterfeit currency notes or forged security/document.</li>
    <li>(e) All <strong>suspicious transactions</strong> involving deposit, withdrawal, transfer of account, solvency certificate/indemnity certificate etc., irrespective of the amount.</li>
  </ul>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Definition of Suspicious Transaction</h3>
  <p>Suspicious Transaction means an <strong>attempted transaction</strong>, whether or not made in cash, which to a person acting in good faith —</p>
  <ul>
    <li>(a) Gives rise to a reasonable ground of suspicion that it may involve proceeds of an offence in the schedule, <em>regardless of the value involved</em>; or</li>
    <li>(b) Appears to be made in circumstances of unusual or unjustified complexity; or</li>
    <li>(c) Appears to have no economic rationale or bonafide purpose; or balance/maturity value exceeds <strong>₹10 Lakh</strong>; or</li>
    <li>(d) Gives rise to a reasonable ground of suspicion that it involves <strong>financing of activities relating to terrorism</strong>.</li>
  </ul>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Reporting Schedule</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
    <thead>
      <tr style="background:#e65100;color:#fff">
        <th style="border:1px solid #ffcc80;padding:9px">S.No.</th>
        <th style="border:1px solid #ffcc80;padding:9px">Type of Report</th>
        <th style="border:1px solid #ffcc80;padding:9px">Threshold / Condition</th>
        <th style="border:1px solid #ffcc80;padding:9px">Reporting Timeline & Route</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #ffe0b2;padding:8px;text-align:center">1</td>
        <td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Cash Transaction Report (CTR) of POSB</td>
        <td style="border:1px solid #ffe0b2;padding:8px">Cash transactions > ₹10 Lakh OR series of connected transactions in a month totalling > ₹10 Lakh</td>
        <td style="border:1px solid #ffe0b2;padding:8px">CEPT CBS-Reports Team → DDG (PCO/PMLA) Directorate, by <strong>6th working day</strong> of the subsequent month via FINnet 2.0 (FIU-IND)</td>
      </tr>
      <tr style="background:#fff8f0">
        <td style="border:1px solid #ffe0b2;padding:8px;text-align:center">2</td>
        <td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">CTR of PLI/RPLI</td>
        <td style="border:1px solid #ffe0b2;padding:8px">Same criteria as POSB CTR</td>
        <td style="border:1px solid #ffe0b2;padding:8px">PLI-CEPT Team → DDG (PCO & PMLA) Postal Directorate, by <strong>6th working day</strong> of the subsequent month via FINnet 2.0 (FIU-IND)</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffe0b2;padding:8px;text-align:center">3</td>
        <td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Suspected Transaction Report (STR)</td>
        <td style="border:1px solid #ffe0b2;padding:8px">Any suspicious transaction — irrespective of amount (even abandoned transactions)</td>
        <td style="border:1px solid #ffe0b2;padding:8px"><strong>Post Office → same day → Division Office → same day → Circle Office → DDG (CPO), PMLA</strong></td>
      </tr>
    </tbody>
  </table>

  <h3 style="color:#4a148c;border-left:5px solid #4a148c;padding-left:12px">Transactions to be Reported to PCO/PMLA Section (Dak Bhawan) — PLI/RPLI</h3>
  <ol>
    <li>Cancellation of policy during free look period, where <strong>3 or more</strong> free look cancellation requests are received from a single policyholder in a calendar month, under which the amount refunded put together exceeds <strong>₹1 Lakh</strong>.</li>
    <li>Receipt of request for change of address <strong>3 or more times</strong> from the same policyholder in a Financial Year, excluding correction in addresses without change.</li>
    <li>Requests for policies <strong>beyond his/her capacity</strong>.</li>
    <li>Premium payments of more than <strong>₹5 Lakhs</strong> a month in one or more transactions.</li>
    <li>Payments of premiums in cash with subsequent request for refund of amount over paid.</li>
    <li>Any transaction involving <strong>documents found to be forged</strong> or using counterfeit currency.</li>
  </ol>

  <h3 style="color:#004d40;border-left:5px solid #004d40;padding-left:12px">Record Keeping (POSB)</h3>
  <ol>
    <li>All long books and List of Transactions (hard or soft copy): preserved for <strong>5 years</strong>.</li>
    <li>All ledger cards/account details, Account Opening Forms with CDD/KYC documents and SS Books: preserved for <strong>5 years after closure of the account</strong>.</li>
    <li>All account closure vouchers: preserved for <strong>5 years from date of closure</strong>.</li>
    <li>All purchase application forms along with KYC/CDD documents: preserved for <strong>5 years after discharge of certificates</strong>.</li>
  </ol>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Record Retention Policy — PLI/RPLI (Circle & CPC)</h3>
  <p>Data/documents related to PLI/RPLI insurance services shall be preserved for a minimum period of <strong>5 years from the exit of the policy or final disposal of claim</strong>. Specific retention schedule:</p>
  <table style="width:100%;border-collapse:collapse;font-size:0.91rem;margin-bottom:14px">
    <thead>
      <tr style="background:#1565c0;color:#fff">
        <th style="border:1px solid #90caf9;padding:9px;width:5%">S.No.</th>
        <th style="border:1px solid #90caf9;padding:9px">Policy Status</th>
        <th style="border:1px solid #90caf9;padding:9px">Retention Period</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center">1</td><td style="border:1px solid #bbdefb;padding:8px">Policies where less than 3 years of premia paid, and policy is <strong>lapsed</strong></td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">5 years after date of Maturity</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center">2</td><td style="border:1px solid #bbdefb;padding:8px">Policies where at least 3 years of premia paid, and policy is <strong>surrendered</strong></td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">5 years after payment of surrender value</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center">3</td><td style="border:1px solid #bbdefb;padding:8px">Policies where at least 3 years of premia paid, and policy is <strong>Forced surrendered</strong></td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">5 years after date of 'Forced Surrender'</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center">4</td><td style="border:1px solid #bbdefb;padding:8px">Policies where at least 3 years of premia paid, and insurance contract is discharged due to <strong>Maturity or Death</strong></td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">5 years after payment of Maturity/Death Claim amount</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center">5</td><td style="border:1px solid #bbdefb;padding:8px">Policies cancelled at the option of insurant during <strong>'Free Look' period</strong></td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">5 years after cancellation of the policy</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center">6</td><td style="border:1px solid #bbdefb;padding:8px">Policies which are subject of any <strong>case filed in any court of law</strong></td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">3 years after final clearance from arbitration/litigation/enquiry/audit OR till prescribed retention period, whichever is later</td></tr>
    </tbody>
  </table>

  <h3 style="color:#880e4f;border-left:5px solid #880e4f;padding-left:12px">KYC in Existing Accounts (SB/PPF/MIS/SCSS/NSS/TD/RD)</h3>
  <ul>
    <li>Notice issued at the time of <strong>next transaction</strong>.</li>
    <li>If depositor fails to submit KYC up to the <strong>3rd next transaction</strong>, the <strong>4th transaction will not be allowed</strong>.</li>
  </ul>

  <h3 style="color:#004d40;border-left:5px solid #004d40;padding-left:12px">Important Full Forms</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:10px">
    <thead><tr style="background:#004d40;color:#fff"><th style="border:1px solid #80cbc4;padding:8px">Abbreviation</th><th style="border:1px solid #80cbc4;padding:8px">Full Form</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">KYC</td><td style="border:1px solid #b2dfdb;padding:7px">Know Your Customer</td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">AML</td><td style="border:1px solid #b2dfdb;padding:7px">Anti Money Laundering</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">CFT</td><td style="border:1px solid #b2dfdb;padding:7px">Combating Financing of Terrorism</td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">MTSS</td><td style="border:1px solid #b2dfdb;padding:7px">Money Transfer Service Scheme</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">FIU-IND</td><td style="border:1px solid #b2dfdb;padding:7px">Financial Intelligence Unit — India</td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">PEP</td><td style="border:1px solid #b2dfdb;padding:7px">Politically Exposed Person</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">CTR</td><td style="border:1px solid #b2dfdb;padding:7px">Cash Transaction Report</td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">STR</td><td style="border:1px solid #b2dfdb;padding:7px">Suspicious Transaction Report</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">CDD</td><td style="border:1px solid #b2dfdb;padding:7px">Customer Due Diligence</td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:7px;font-weight:bold">CAP</td><td style="border:1px solid #b2dfdb;padding:7px">Customer Acceptance Policy</td></tr>
    </tbody>
  </table>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#fff8e1,#ffecb3);border-left:5px solid #e65100;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#e65100;margin:0 0 8px">🧠 Dak Guru's Key Insight — Postal KYC is PMLA Compliance!</h3>
    <p style="margin:0">Every time a post office does KYC for POSB or PLI/RPLI, it is actually implementing <strong>PMLA compliance</strong>. The Department of Posts is a "Financial Institution" under PMLA — so KYC, CTR, STR are all PMLA obligations. The <strong>7/5/2 rule</strong> for re-KYC is the most exam-tested aspect: Low=7yr, Medium=5yr, High=2yr.</p>
  </div>

  <h4 style="color:#e65100">🔑 Risk Categorisation Memory Trick</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:16px">
    <thead><tr style="background:#e65100;color:#fff"><th style="border:1px solid #ffcc80;padding:9px">Risk</th><th style="border:1px solid #ffcc80;padding:9px">Balance Limit</th><th style="border:1px solid #ffcc80;padding:9px">Re-KYC</th><th style="border:1px solid #ffcc80;padding:9px">Extra Document</th></tr></thead>
    <tbody>
      <tr style="background:#e8f5e9"><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold;color:#1b5e20">🟢 LOW</td><td style="border:1px solid #ffe0b2;padding:8px">≤ ₹50,000</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">7 Years</td><td style="border:1px solid #ffe0b2;padding:8px">None extra</td></tr>
      <tr><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold;color:#e65100">🟡 MEDIUM</td><td style="border:1px solid #ffe0b2;padding:8px">₹50,001 – ₹10 Lakh</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">5 Years</td><td style="border:1px solid #ffe0b2;padding:8px">None extra</td></tr>
      <tr style="background:#fce4ec"><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold;color:#b71c1c">🔴 HIGH</td><td style="border:1px solid #ffe0b2;padding:8px">> ₹10 Lakh (or PEP)</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">2 Years</td><td style="border:1px solid #ffe0b2;padding:8px">Proof of Source of Fund (mandatory)</td></tr>
    </tbody>
  </table>

  <h4 style="color:#1565c0">📊 CTR vs STR — The Critical Distinction</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:16px">
    <thead><tr style="background:#1565c0;color:#fff"><th style="border:1px solid #90caf9;padding:9px">Aspect</th><th style="border:1px solid #90caf9;padding:9px">CTR (Cash Transaction Report)</th><th style="border:1px solid #90caf9;padding:9px">STR (Suspicious Transaction Report)</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Threshold</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">> ₹10 Lakh (single or connected in 1 month)</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">No threshold — any suspicious transaction</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Payment mode</td><td style="border:1px solid #bbdefb;padding:8px">Cash only</td><td style="border:1px solid #bbdefb;padding:8px">Cash OR non-cash</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Reporting route</td><td style="border:1px solid #bbdefb;padding:8px">Via CEPT/PLI-CEPT → DDG(PCO/PMLA)</td><td style="border:1px solid #bbdefb;padding:8px">PO → Division → Circle → DDG(CPO) PMLA</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Timeline</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">By 6th working day of subsequent month</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">Same day at each level</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Platform</td><td style="border:1px solid #bbdefb;padding:8px">FINnet 2.0 (FIU-IND)</td><td style="border:1px solid #bbdefb;padding:8px">Proper channel</td></tr>
    </tbody>
  </table>

  <h4 style="color:#880e4f">⚡ PLI/RPLI Key Traps for Exams</h4>
  <ul>
    <li><strong>PLI Max Sum Assured:</strong> ₹50 Lakhs total (all existing + proposed policies combined)</li>
    <li><strong>RPLI Max Sum Assured:</strong> ₹10 Lakhs total (all existing + proposed policies combined)</li>
    <li><strong>Income multipliers:</strong> 10x for age ≤40 years; 7x for age >40 years (both PLI and RPLI)</li>
    <li><strong>Lapsed policy record retention:</strong> NOT from lapse date — from <em>date of Maturity</em>. This is a top trap!</li>
    <li><strong>Court case policy:</strong> 3 years after final clearance OR till prescribed retention period, whichever is LATER — only exception to the 5-year rule!</li>
  </ul>

  <div style="background:#e8eaf6;border:1.5px solid #1a237e;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#1a237e;margin:0 0 8px">🔟 4th Transaction Rule — KYC Enforcement</h4>
    <p style="margin:0">When KYC is pending on existing accounts (SB/PPF/MIS/SCSS/NSS/TD/RD): Notice is issued at the <em>next transaction</em>. If depositor doesn't update KYC by the <strong>3rd next transaction</strong>, the <strong>4th transaction is NOT ALLOWED</strong>. The sequence: 1st next = notice; 2nd next = transact; 3rd next = transact; 4th next = BLOCKED.</p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#e65100">🎯 Practical Scenarios — Postal KYC & AML Compliance</h4>

  <div style="background:#fff3e0;border-left:4px solid #e65100;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — Risk Categorisation:</strong> A customer has a PPF balance of ₹8,00,000, RD maturity value of ₹1,50,000, and an SB balance of ₹75,000. Total = ₹10,25,000. What is his risk category? → <strong>HIGH RISK</strong> — total balance/maturity value exceeds ₹10 Lakhs. Re-KYC is due every <strong>2 years</strong> and <strong>Proof of Source of Fund is mandatory</strong>.</p>
  </div>

  <div style="background:#e3f2fd;border-left:4px solid #1565c0;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — CTR Reporting:</strong> A customer makes 4 cash deposits in a month — ₹3L, ₹3L, ₹3L, and ₹2L — totalling ₹11L. Is CTR required? → <strong>Yes</strong> — Even though individual transactions are below ₹10L, they are <em>integrally connected cash transactions within one month</em> totalling ₹11L (>₹10L). Report must be filed by the <strong>6th working day</strong> of the next month via FINnet 2.0.</p>
  </div>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — PLI Sum Assured Compliance:</strong> A customer aged 35 earning ₹4L annually wants to take PLI with sum assured ₹50L. He already has an existing PLI of ₹10L. Is the new policy permissible? → <strong>No</strong> — His income multiplier at age 35 (≤40 years) = 10x income = 10 × ₹4L = <strong>₹40L maximum total</strong>. He already has ₹10L, so maximum permissible new policy = ₹30L. A ₹50L new policy (total ₹60L) would exceed both the ₹50L absolute cap AND the ₹40L income-linked cap.</p>
  </div>

  <div style="background:#fce4ec;border-left:4px solid #880e4f;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 4 — PLI Record Retention (Lapsed Policy):</strong> A policyholder paid premiums for only 2 years, and the policy lapsed. The policy maturity date was 2030. When should the records be preserved until? → The policy has <strong>less than 3 years of premia paid</strong> and is lapsed. Per the retention schedule, records must be preserved for <strong>5 years after the date of Maturity</strong> = until <strong>2035</strong>. NOT 5 years from the lapse date.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#fff8e1,#ffe0b2);border-left:5px solid #e65100;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#e65100;margin:0 0 10px">⚡ EXAM INSIGHT — Postal KYC / AML Compliance</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>KYC Policy 4 elements: <strong>CAP, Risk Management, CIP, Monitoring & Reporting</strong></li>
      <li>Low Risk: ≤ <strong>₹50,000</strong> — Re-KYC every <strong>7 years</strong></li>
      <li>Medium Risk: ₹50,001 to <strong>₹10 Lakh</strong> — Re-KYC every <strong>5 years</strong></li>
      <li>High Risk: > <strong>₹10 Lakh</strong> — Re-KYC every <strong>2 years</strong></li>
      <li>High Risk extra document: <strong>Proof of Source of Fund</strong></li>
      <li>CTR threshold: cash transactions > <strong>₹10 Lakh</strong> (single or connected in 1 month)</li>
      <li>CTR deadline: <strong>6th working day</strong> of subsequent month</li>
      <li>CTR platform: <strong>FINnet 2.0 — FIU-IND</strong></li>
      <li>STR: no threshold — <strong>any suspicious transaction</strong>, reported same day at each level</li>
      <li>STR route: <strong>PO → Division → Circle → DDG(CPO) PMLA</strong> (same day at each)</li>
      <li>PLI Max Sum Assured: <strong>₹50 Lakhs</strong> (all policies combined)</li>
      <li>RPLI Max Sum Assured: <strong>₹10 Lakhs</strong> (all policies combined)</li>
      <li>Income multiplier: <strong>10x</strong> for age ≤40; <strong>7x</strong> for age >40</li>
      <li>KYC update for existing accounts: <strong>4th transaction blocked</strong> if not done</li>
      <li>Free look cancellation report: <strong>3+ requests, >₹1 Lakh</strong> refund in a calendar month</li>
      <li>Premium > <strong>₹5 Lakhs</strong>/month — report to PCO/PMLA</li>
      <li>Address change: <strong>3+ times in FY</strong> — report</li>
      <li>PEPs outside India = <strong>High Risk</strong></li>
      <li>FIU-IND = <strong>Financial Intelligence Unit — India</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>STR is for <strong>suspected/suspicious</strong> transactions, NOT just cash — any transaction type</li>
      <li>Lapsed policy (< 3 yrs premia) retention: 5 years from <strong>MATURITY DATE</strong>, NOT from lapse date</li>
      <li>Court case policy: <strong>3 years</strong> after final clearance (only exception to 5-year rule)</li>
      <li>CTR reporting: CEPT/PLI-CEPT team, NOT the post office directly</li>
    </ul>

    <p style="margin:0 0 8px"><strong>⚠️ Traps:</strong></p>
    <ul style="margin:0;padding-left:20px">
      <li>RPLI max = <strong>₹10 Lakhs</strong> (NOT ₹50 Lakhs); PLI max = <strong>₹50 Lakhs</strong></li>
      <li>Suspicious transaction = even if <strong>NOT completed/abandoned</strong> — still report as STR</li>
      <li>CAP says: account closure decision by <strong>Head of the Postal Division</strong> (not PM/SPM)</li>
      <li>"3rd next transaction" gets KYC notice; "4th next transaction" is blocked</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points</h4>
    <ol style="margin:0;padding-left:20px">
      <li>KYC has <strong>4 pillars</strong>: CAP, Risk Management, CIP, Monitoring & Reporting</li>
      <li>Low/Medium/High risk re-KYC: <strong>7 / 5 / 2 years</strong></li>
      <li>Low ≤₹50K; Medium ₹50K–₹10L; High >₹10L</li>
      <li>High Risk needs <strong>Proof of Source of Fund</strong> additionally</li>
      <li>CTR: > <strong>₹10L</strong>, by <strong>6th working day</strong>, via <strong>FINnet 2.0 (FIU-IND)</strong></li>
      <li>STR: any amount, same-day chain: <strong>PO → Division → Circle → DDG(CPO)</strong></li>
      <li>PLI max = <strong>₹50L</strong>; RPLI max = <strong>₹10L</strong>; multiplier = 10x (≤40yr), 7x (>40yr)</li>
      <li>Lapsed policy (< 3yr premia) records: <strong>5 years after date of Maturity</strong></li>
      <li>Court case policy: <strong>3 years after final clearance OR retention period, whichever later</strong></li>
      <li>KYC enforcement: notice at next transaction; <strong>4th transaction blocked</strong> if not updated</li>
    </ol>
  </div>
</div>`,
        createdAt: now,
        updatedAt: now
    }
];

async function seed() {
    const client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 60000,
        connectTimeoutMS: 60000
    });
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('daksutras');

        // Replace all existing PMLA entries with the new 4 comprehensive entries
        const deleteResult = await collection.deleteMany({ act_name: "Prevention of Money-Laundering Act (PMLA), 2002" });
        console.log(`🧹 Removed ${deleteResult.deletedCount} existing PMLA entry/entries.`);

        for (const entry of entries) {
            const result = await collection.insertOne(entry);
            console.log(`🚀 Seeded: ${entry.title} (_id: ${result.insertedId})`);
        }

        console.log(`\n✨ Successfully seeded ${entries.length} PMLA Dak Sutra entries!`);
        console.log('📚 Entries created:');
        entries.forEach((e, i) => console.log(`   ${i + 1}. ${e.title}`));
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await client.close();
    }
}

seed();
