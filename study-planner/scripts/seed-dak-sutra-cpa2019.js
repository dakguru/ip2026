
/**
 * Dak Sutra Seed Script — Consumer Protection Act, 2019
 * High-quality entries covering Time Limits, Penalties, Jurisdiction,
 * Mediation, Product Liability, and Key Important Notes.
 *
 * Run: node scripts/seed-dak-sutra-cpa2019.js
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
    // 1. MASTER TIME LIMITS — CONSUMER PROTECTION ACT, 2019
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Master Time Limits — Consumer Protection Act, 2019",
        rule_number: "Sections 22, 36, 37, 38, 40, 41, 50, 51, 60, 67, 69, 73, 77, 80, 81, 86",
        act_name: "Consumer Protection Act, 2019",
        category: "Section",
        effective_date: new Date("2020-07-20"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<p><strong>The Consumer Protection Act, 2019 contains numerous critical time limits spread across its chapters. These are among the highest-yield topics for objective examinations.</strong></p>

<h4>A. Complaint Procedure Time Limits (Section 36 & 38)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Stage</th>
    <th style="border:1px solid #ccc;padding:8px">Time Limit</th>
    <th style="border:1px solid #ccc;padding:8px">Section</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">District Commission to decide admissibility</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>21 days</strong> (deemed admitted if not decided)</td>
    <td style="border:1px solid #ccc;padding:8px">Section 36(2)–(3)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Commission to send notice to opposite party after admission</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>21 days</strong> from date of admission</td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(2)(a)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Opposite party to give version of the case</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong> + extendable by <strong>15 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(2)(a)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Appropriate laboratory to submit analysis/test report</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>45 days</strong> from receipt of reference</td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(2)(c)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Party to comment on laboratory report</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong> + extendable by <strong>15 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(2)(d)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Expert/committee report objection period</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong> + extendable by <strong>15 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(4)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Adjournment exceeding this duration requires written reasons</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(6)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Target disposal — without testing/analysis</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>3 months</strong> from receipt of notice by O.P.</td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(7)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Target disposal — with testing/analysis</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>5 months</strong> from receipt of notice by O.P.</td>
    <td style="border:1px solid #ccc;padding:8px">Section 38(7)</td>
  </tr>
</table>

<h4>B. Review Applications (Sections 40, 50, 60)</h4>
<p>Any party may apply for review within <strong>30 days</strong> of the order at all three Commission levels — District (Section 40), State (Section 50), and National (Section 60). Review is permitted only if there is an <em>error apparent on the face of the record</em>.</p>

<h4>C. Appeals Timeline (Sections 41, 51, 67, 24, 73)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Appeal Route</th>
    <th style="border:1px solid #ccc;padding:8px">Time Limit</th>
    <th style="border:1px solid #ccc;padding:8px">Deposit Required</th>
    <th style="border:1px solid #ccc;padding:8px">Section</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">District Commission → State Commission</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>45 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">50% of awarded amount</td>
    <td style="border:1px solid #ccc;padding:8px">Section 41</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">State Commission → National Commission</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">50% of awarded amount (No Cap)</td>
    <td style="border:1px solid #ccc;padding:8px">Section 51</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">National Commission → Supreme Court</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">50% of awarded amount</td>
    <td style="border:1px solid #ccc;padding:8px">Section 67</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">CCPA order (S.20/21) → National Commission</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">—</td>
    <td style="border:1px solid #ccc;padding:8px">Section 24</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Section 72 Penalty Order → State/National</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">As specified</td>
    <td style="border:1px solid #ccc;padding:8px">Section 73</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">National Commission to dispose appeal</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>90 days</strong> from admission</td>
    <td style="border:1px solid #ccc;padding:8px">—</td>
    <td style="border:1px solid #ccc;padding:8px">Section 51(2)</td>
  </tr>
</table>
<p><strong>⚠️ No appeal</strong> shall lie from orders passed under Section 81(1) (mediation settlement orders) — expressly barred under Sections 41 and 51 provisos.</p>

<h4>D. Mediation Time Limits (Chapter V)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Stage</th>
    <th style="border:1px solid #ccc;padding:8px">Time Limit</th>
    <th style="border:1px solid #ccc;padding:8px">Section</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Parties to give written consent to mediation after Commission's direction</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>5 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 37(1)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Commission to refer matter to mediation after receiving consent</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>5 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 37(2)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Party to raise objection to mediator after disclosure</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>7 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 77(2)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Mediator to submit settlement/failure report to Commission</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>3 months</strong> from date of referral</td>
    <td style="border:1px solid #ccc;padding:8px">Section 80(3)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Commission to pass order recording settlement</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>7 days</strong> from receiving report</td>
    <td style="border:1px solid #ccc;padding:8px">Section 81(1)</td>
  </tr>
</table>

<h4>E. Other Critical Time Limits</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Provision</th>
    <th style="border:1px solid #ccc;padding:8px">Time Limit</th>
    <th style="border:1px solid #ccc;padding:8px">Section</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Limitation period for filing a complaint</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>2 years</strong> from cause of action (condonable)</td>
    <td style="border:1px solid #ccc;padding:8px">Section 69</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Seized documents to be returned</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>20 days</strong> from date of seizure</td>
    <td style="border:1px solid #ccc;padding:8px">Section 22(3)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Product seller to identify manufacturer</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong> from date of being asked</td>
    <td style="border:1px solid #ccc;padding:8px">Section 86(1)(e)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Default return/refund period (unfair trade practice)</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong> if not stipulated in bill</td>
    <td style="border:1px solid #ccc;padding:8px">Section 2(57)(9)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Re-offending bar after compounding</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>3 years</strong> — no compounding available</td>
    <td style="border:1px solid #ccc;padding:8px">Section 96(2)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Rules to be laid before each House of Parliament</td>
    <td style="border:1px solid #ccc;padding:8px"><strong>30 days</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Section 101(3)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Power to remove difficulties (Section 106)</td>
    <td style="border:1px solid #ccc;padding:8px">No order after <strong>2 years</strong> from commencement</td>
    <td style="border:1px solid #ccc;padding:8px">Section 106</td>
  </tr>
</table>`,

        guru_explanation: `
<p>This is the single most tested topic from the Consumer Protection Act, 2019 in objective exams. Here is how to <strong>remember the numbers without confusion</strong>:</p>

<h4>The "5–7–21–30–45–50–90" Pattern</h4>
<p>The time limits follow a logical flow:</p>
<ol>
  <li><strong>5 days</strong> — Everything in Mediation start: consent to mediation → referral by Commission</li>
  <li><strong>7 days</strong> — Mediator objection after disclosure; Commission order after settlement</li>
  <li><strong>20 days</strong> — Return of seized documents (administrative, not judicial)</li>
  <li><strong>21 days</strong> — Admissibility + Notice to opposite party (Commission's own obligations)</li>
  <li><strong>30 days</strong> — Most standard response/appeal windows: OP response, review, appeal S→N, N→SC, CCPA→National</li>
  <li><strong>45 days</strong> — District → State appeal (slightly longer because facts + law review); Lab report</li>
  <li><strong>3 months</strong> — Mediator's report (the longest mediation step — needs time for settlement)</li>
  <li><strong>90 days</strong> — National Commission to finally dispose appeal</li>
</ol>

<h4>The "Deemed Admitted" Trap (Section 36)</h4>
<p>This is a <strong>favourite trick question</strong>: If the District Commission does NOT decide admissibility within 21 days, what happens? The answer is the complaint is <strong>AUTOMATICALLY DEEMED ADMITTED</strong> — no further order needed. The Commission cannot sit on a complaint indefinitely.</p>

<h4>Disposal Targets — Directory, Not Mandatory</h4>
<p>The 3-month (no testing) and 5-month (with testing) disposal targets are <strong>directory provisions</strong> — they represent the endeavour, not a hard deadline. Missing them does NOT invalidate the proceedings, but the Commission must work expeditiously.</p>

<h4>The 50% Deposit Rule for Appeals</h4>
<p>Remember: appeals to the State Commission (from District) and to the Supreme Court (from National) require deposit of <strong>50% of the awarded amount</strong> — no cap. But appeal from State to National Commission also requires <strong>50% of the awarded amount</strong>. The monetary caps that existed in the 1986 Act (e.g., ₹25,000 or ₹35,000) have been <strong>completely removed</strong> in the 2019 Act to discourage frivolous appeals. It is now a flat 50% at all levels.</p>

<h4>Limitation Period — The "2 Years With Rescue" Rule</h4>
<p>File within 2 years from the cause of action. Miss the deadline? You can still file if you explain the delay — but the Commission MUST record its reasons for condoning the delay in writing. Without recorded reasons, no late complaint shall be entertained.</p>`,

        practical_example: `
<p><strong>Scenario 1 — The Deemed Admitted Trick:</strong><br>
A consumer files a complaint on 1st January. The District Commission is busy and doesn't pass any admissibility order. On 25th January (24 days later), what is the status of the complaint?<br>
<strong>Answer:</strong> The complaint is <strong>deemed admitted</strong> as of 22nd January (21st day). The Commission must now proceed with the case.</p>

<p><strong>Scenario 2 — Appeal with Deposit:</strong><br>
The District Commission awards ₹10 Lakh compensation. The opposite party wants to appeal. What must they do?<br>
<strong>Answer:</strong> File appeal before State Commission within <strong>45 days</strong>, and deposit <strong>₹5 Lakh (50% of ₹10 Lakh)</strong>.</p>

<p><strong>Scenario 3 — Big Award Appeal:</strong><br>
The State Commission awards ₹200 Crore. The opposite party appeals to the National Commission. How much must they deposit?<br>
<strong>Answer:</strong> 50% of ₹200 Crore = <strong>₹100 Crore</strong>. There is no monetary cap in the 2019 Act for appeal deposits.</p>

<p><strong>Scenario 4 — Mediation Timeline:</strong><br>
At the first hearing, the Commission directs parties to consider mediation. The parties agree on Day 3. What happens next?<br>
<strong>Answer:</strong> Commission must refer to mediator within <strong>5 days</strong> of receiving consent. Mediator must submit report within <strong>3 months</strong> of receiving the referral. If settlement, Commission passes order within <strong>7 days</strong> of receiving the mediator's report. Total: roughly 100+ days from consent.</p>`,

        exam_insight: `
<p><strong>⭐ Absolute Must-Know Numbers:</strong></p>
<ul>
  <li><strong>21 days</strong> — Admissibility (deemed admitted if not decided)</li>
  <li><strong>3 months / 5 months</strong> — Disposal target (no test / with test)</li>
  <li><strong>45 days</strong> — Appeal: District → State</li>
  <li><strong>30 days</strong> — Appeal: State → National / National → SC</li>
  <li><strong>90 days</strong> — National Commission to dispose appeal</li>
  <li><strong>2 years</strong> — Limitation period</li>
  <li><strong>3 months</strong> — Mediator's report deadline</li>
  <li><strong>7 days</strong> — Commission's order after mediation settlement</li>
  <li><strong>20 days</strong> — Return of seized documents</li>
  <li><strong>30 days</strong> — Product seller to identify manufacturer</li>
</ul>
<p><strong>🔴 Common Trap MCQs:</strong></p>
<ul>
  <li>"Time limit for filing complaint against District Commission order" — <strong>45 days</strong> (not 30)</li>
  <li>"Deposit required for State → National appeal" — <strong>50% (No monetary cap)</strong></li>
  <li>"If Commission doesn't decide admissibility in 21 days" — <strong>deemed admitted</strong> (not dismissed)</li>
  <li>"Mediator's report must be submitted in" — <strong>3 months</strong> (not 30 or 60 days)</li>
  <li>"Can appeal be filed against mediation settlement order?" — <strong>NO</strong></li>
</ul>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. OFFENCES & PENALTIES — SECTIONS 88–93
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Offences & Penalties — Consumer Protection Act, 2019 (Sections 88–93)",
        rule_number: "Sections 88, 89, 90, 91, 92, 93, 96, 97",
        act_name: "Consumer Protection Act, 2019",
        category: "Section",
        effective_date: new Date("2020-07-20"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<p><strong>Chapter VII (Sections 88–93) and related miscellaneous sections contain all the criminal and civil penalties under the Act.</strong></p>

<h4>Section 88 — Non-Compliance with Central Authority Direction (under Section 20)</h4>
<p>Any person who fails to comply with a direction of the Central Authority (CCPA) under Section 20 (recall/reimbursement/discontinuation orders):</p>
<ul>
  <li>Imprisonment up to <strong>6 months</strong> OR fine up to <strong>₹20 Lakh</strong> OR both</li>
</ul>

<h4>Section 89 — Punishment for False or Misleading Advertisement</h4>
<p>Whoever manufactures, sells, stores for sale, or imports any product which causes injury due to a false/misleading advertisement:</p>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Offence</th>
    <th style="border:1px solid #ccc;padding:8px">Imprisonment</th>
    <th style="border:1px solid #ccc;padding:8px">Fine</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">First Offence</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>2 years</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹10 Lakh</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Subsequent Offence</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>5 years</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹50 Lakh</strong></td>
  </tr>
</table>

<h4>Section 90 — Punishment for Adulterated Goods (graded by harm)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#ffe8e8">
    <th style="border:1px solid #ccc;padding:8px">Severity of Harm</th>
    <th style="border:1px solid #ccc;padding:8px">Imprisonment</th>
    <th style="border:1px solid #ccc;padding:8px">Fine</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">No Injury to consumer</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>6 months</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹1 Lakh</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Repeat Offence (no death)</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>1 year</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹3 Lakh</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Grievous Hurt to consumer</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>7 years</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹5 Lakh</strong></td>
  </tr>
  <tr style="background:#ffe0e0">
    <td style="border:1px solid #ccc;padding:8px"><strong>Death of consumer</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Min. <strong>7 years</strong> to <strong>LIFE</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Min. <strong>₹10 Lakh</strong></td>
  </tr>
</table>

<h4>Section 91 — Punishment for Spurious Goods (graded by harm)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#ffe8e8">
    <th style="border:1px solid #ccc;padding:8px">Severity of Harm</th>
    <th style="border:1px solid #ccc;padding:8px">Imprisonment</th>
    <th style="border:1px solid #ccc;padding:8px">Fine</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Non-Grievous Injury</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>1 year</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹3 Lakh</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Grievous Hurt</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>7 years</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹5 Lakh</strong></td>
  </tr>
  <tr style="background:#ffe0e0">
    <td style="border:1px solid #ccc;padding:8px"><strong>Death of consumer</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Min. <strong>7 years</strong> to <strong>LIFE</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Min. <strong>₹10 Lakh</strong></td>
  </tr>
</table>

<h4>Section 92 — Cognizance of Offence (Sections 90 & 91)</h4>
<p>No prosecution under Section 90 or Section 91 shall be instituted EXCEPT by, or with the <strong>written consent of, the Central Authority (CCPA)</strong>.</p>

<h4>Section 93 — Vexatious Search by CCPA Officer</h4>
<p>Any officer of the Central Authority who — without reasonable grounds, harasses any person; vexatiously detains/searches/arrests; vexatiously searches any building/place/vessel/vehicle/aircraft; or abuses powers:</p>
<ul>
  <li>Imprisonment up to <strong>6 months</strong> OR fine up to <strong>₹25,000</strong> OR both (for every offence)</li>
</ul>

<h4>Section 72 — Penalty for Non-Compliance with Commission's Order</h4>
<p>Trader/service provider/complainant who fails to comply with an order of any Commission:</p>
<ul>
  <li>Imprisonment: Not less than <strong>1 month</strong>, extendable to <strong>3 years</strong></li>
  <li>Fine: Not less than <strong>₹25,000</strong>, extendable to <strong>₹1 Lakh</strong></li>
  <li>Or both — subject to opportunity of being heard</li>
</ul>

<h4>Section 96 — Compounding of Offences</h4>
<ul>
  <li>Only the <strong>National Commission</strong> may compound offences under Sections 90 and 91</li>
  <li><strong>Cannot compound</strong> if minimum term of imprisonment is prescribed</li>
  <li><strong>Re-offending within 3 years</strong> of the date of compounding — NOT eligible for compounding</li>
  <li>Sum directed to be paid: to Consumer Welfare Fund or other appropriate authority</li>
</ul>

<h4>Section 97 — Crediting of Penalties</h4>
<p>All sums realised by way of penalties under this Act shall be credited to the <strong>Consumer Welfare Fund</strong> established under Section 101 of the Consumer Protection Act, 1986.</p>`,

        guru_explanation: `
<p>The penalties chapter is a high-yield, objective-heavy section. Here's how to master it:</p>

<h4>Two Types of Penalties for Misleading Advertisements — Don't Confuse!</h4>
<p>This is the <strong>most common confusion</strong> in the exam:</p>
<ul>
  <li><strong>Section 21 (CCPA Civil Penalty)</strong> — Administrative penalty; NO imprisonment. Manufacturer/Endorser: ₹10L (1st), ₹50L (subsequent). Publisher of misleading ad: ₹10L. Endorser BAN: 1 year (1st), 3 years (subsequent).</li>
  <li><strong>Section 89 (Criminal Punishment)</strong> — Imprisonment + fine. 2 years + ₹10L (1st); 5 years + ₹50L (subsequent).</li>
</ul>
<p>If the exam asks "What is the PENALTY under Section 21?" → ₹10L / ₹50L (no imprisonment).<br>
If it asks "What is the PUNISHMENT under Section 89?" → 2 years + ₹10L (with imprisonment).</p>

<h4>The Harm-Graduated Scale (Sections 90 & 91)</h4>
<p>Think of it as a <strong>ladder of punishment based on the severity of harm</strong>:</p>
<p>No injury → Slight harm → Grievous hurt → Death</p>
<p>Section 90 starts at 6 months (no injury). Section 91 starts at 1 year (non-grievous injury). Both end at the same point: <strong>Min. 7 years to Life + Min. ₹10 Lakh for death</strong>.</p>
<p>Memory tip: <strong>Grievous = 7 years + ₹5 Lakh</strong>. <strong>Death = Min. 7 to Life + Min. ₹10 Lakh</strong>.</p>

<h4>The CCPA Consent Gate (Section 92)</h4>
<p>Prosecution for adulterated (S.90) or spurious (S.91) goods is GATED — you cannot prosecute anyone without CCPA's written consent. This prevents frivolous prosecutions.</p>

<h4>Compounding Rules (Section 96)</h4>
<p>Only the National Commission can compound (settle) offences. But note: offences where a <em>minimum imprisonment is prescribed</em> (e.g., death cases — min. 7 years) CANNOT be compounded. And once compounded, the person gets a 3-year "fresh start window" — if they re-offend within 3 years, compounding is not available again.</p>`,

        practical_example: `
<p><strong>Scenario 1 — Adulterated Milk (No Injury):</strong><br>
A dairy sells adulterated milk. A consumer buys it but fortunately isn't harmed. What is the punishment?<br>
<strong>Answer:</strong> Section 90 — Imprisonment up to <strong>6 months + Fine up to ₹1 Lakh</strong> (no injury tier).</p>

<p><strong>Scenario 2 — Spurious Medicine (Grievous Hurt):</strong><br>
A pharma company sells spurious drugs. A patient suffers permanent organ damage (grievous hurt). Punishment?<br>
<strong>Answer:</strong> Section 91 — Imprisonment up to <strong>7 years + Fine up to ₹5 Lakh</strong>.</p>

<p><strong>Scenario 3 — Death from Adulterated Hooch:</strong><br>
A manufacturer sells adulterated alcohol. Three people die. What is the minimum punishment?<br>
<strong>Answer:</strong> Section 90 — <strong>Minimum 7 years to Life imprisonment + Fine minimum ₹10 Lakh</strong>. This offence <strong>cannot be compounded</strong> (minimum imprisonment prescribed).</p>

<p><strong>Scenario 4 — CCPA Order Ignored:</strong><br>
The CCPA issues a recall order for a dangerous toy. The manufacturer ignores it. Punishment?<br>
<strong>Answer:</strong> Section 88 — Imprisonment up to <strong>6 months OR Fine up to ₹20 Lakh</strong> OR both.</p>

<p><strong>Scenario 5 — Commission Order Flouted:</strong><br>
The State Commission directs a builder to refund ₹50 Lakh to a buyer. The builder ignores the order. Punishment?<br>
<strong>Answer:</strong> Section 72 — Imprisonment <strong>1 month to 3 years + Fine ₹25,000 to ₹1 Lakh</strong>.</p>`,

        exam_insight: `
<p><strong>⭐ Master Penalty Comparison Table (Exam Cheat Sheet):</strong></p>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:6px">Section</th>
    <th style="border:1px solid #ccc;padding:6px">Offence</th>
    <th style="border:1px solid #ccc;padding:6px">Imprisonment</th>
    <th style="border:1px solid #ccc;padding:6px">Fine</th>
  </tr>
  <tr><td style="border:1px solid #ccc;padding:6px">S.72</td><td style="border:1px solid #ccc;padding:6px">Non-compliance of Commission order</td><td style="border:1px solid #ccc;padding:6px">1 month – 3 years</td><td style="border:1px solid #ccc;padding:6px">₹25,000 – ₹1 Lakh</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">S.88</td><td style="border:1px solid #ccc;padding:6px">Non-compliance of CCPA direction</td><td style="border:1px solid #ccc;padding:6px">Up to 6 months</td><td style="border:1px solid #ccc;padding:6px">Up to ₹20 Lakh</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">S.89</td><td style="border:1px solid #ccc;padding:6px">False advertisement (1st)</td><td style="border:1px solid #ccc;padding:6px">Up to 2 years</td><td style="border:1px solid #ccc;padding:6px">Up to ₹10 Lakh</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">S.89</td><td style="border:1px solid #ccc;padding:6px">False advertisement (subsequent)</td><td style="border:1px solid #ccc;padding:6px">Up to 5 years</td><td style="border:1px solid #ccc;padding:6px">Up to ₹50 Lakh</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">S.90</td><td style="border:1px solid #ccc;padding:6px">Adulterated goods (no injury)</td><td style="border:1px solid #ccc;padding:6px">Up to 6 months</td><td style="border:1px solid #ccc;padding:6px">Up to ₹1 Lakh</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">S.90/91</td><td style="border:1px solid #ccc;padding:6px">Adulterated/spurious — grievous hurt</td><td style="border:1px solid #ccc;padding:6px">Up to 7 years</td><td style="border:1px solid #ccc;padding:6px">Up to ₹5 Lakh</td></tr>
  <tr style="background:#ffe0e0"><td style="border:1px solid #ccc;padding:6px">S.90/91</td><td style="border:1px solid #ccc;padding:6px">Adulterated/spurious — DEATH</td><td style="border:1px solid #ccc;padding:6px">Min. 7 years to LIFE</td><td style="border:1px solid #ccc;padding:6px">Min. ₹10 Lakh</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">S.93</td><td style="border:1px solid #ccc;padding:6px">Vexatious search by CCPA officer</td><td style="border:1px solid #ccc;padding:6px">Up to 6 months</td><td style="border:1px solid #ccc;padding:6px">Up to ₹25,000</td></tr>
</table>
<p><strong>🔴 Key Trap: "Section 21 penalty for misleading ad" → ₹10L/₹50L (no imprisonment). "Section 89 punishment" → 2yr/5yr + ₹10L/₹50L (WITH imprisonment).</strong></p>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. CCPA — CENTRAL CONSUMER PROTECTION AUTHORITY (Sections 10–27)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Central Consumer Protection Authority (CCPA) — Powers, Functions & Penalties",
        rule_number: "Sections 10–27",
        act_name: "Consumer Protection Act, 2019",
        category: "Section",
        effective_date: new Date("2020-07-20"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<p><strong>The CCPA is a landmark addition in the 2019 Act — completely absent in the 1986 Act. It is a regulatory body for class-wide consumer protection.</strong></p>

<h4>Establishment & Structure (Section 10)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Feature</th>
    <th style="border:1px solid #ccc;padding:8px">Detail</th>
  </tr>
  <tr><td style="border:1px solid #ccc;padding:8px">Established by</td><td style="border:1px solid #ccc;padding:8px">Central Government by notification</td></tr>
  <tr><td style="border:1px solid #ccc;padding:8px">Composition</td><td style="border:1px solid #ccc;padding:8px">Chief Commissioner + prescribed number of Commissioners</td></tr>
  <tr><td style="border:1px solid #ccc;padding:8px">Headquarters</td><td style="border:1px solid #ccc;padding:8px"><strong>National Capital Region of Delhi</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:8px">Regional offices</td><td style="border:1px solid #ccc;padding:8px">Any other place in India as Central Government decides</td></tr>
  <tr><td style="border:1px solid #ccc;padding:8px">Investigation Wing</td><td style="border:1px solid #ccc;padding:8px">Headed by <strong>Director-General</strong> (Section 15)</td></tr>
</table>

<h4>Key Powers & Functions (Sections 18–20)</h4>
<ul>
  <li>Protect, promote and enforce rights of consumers <strong>as a class</strong></li>
  <li>Inquire / cause inquiry <strong>suo motu</strong> or on complaint or Central Govt direction</li>
  <li>File complaints before District/State/National Commission</li>
  <li>Intervene in proceedings before any Commission</li>
  <li><strong>Recall goods</strong> or withdraw services that are dangerous/hazardous (Section 20)</li>
  <li><strong>Reimburse prices</strong> of recalled goods to purchasers (Section 20)</li>
  <li><strong>Discontinue unfair practices</strong> prejudicial to consumers (Section 20)</li>
  <li>Issue safety notices to alert consumers against dangerous goods</li>
  <li>Mandate use of unique/universal goods identifiers</li>
  <li>Advise Ministries on consumer welfare measures</li>
  <li>Issue guidelines to prevent unfair trade practices</li>
</ul>

<h4>Penalties for False/Misleading Advertisement — Section 21</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:8px">Party</th>
    <th style="border:1px solid #ccc;padding:8px">First Offence</th>
    <th style="border:1px solid #ccc;padding:8px">Subsequent Offence</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Manufacturer / Endorser (civil penalty)</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹10 Lakh</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹50 Lakh</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Publisher of misleading advertisement</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹10 Lakh</strong></td>
    <td style="border:1px solid #ccc;padding:8px">—</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px">Endorser — Ban on endorsements</td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>1 year</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>3 years</strong></td>
  </tr>
</table>
<p><strong>Exception (Section 21(5)):</strong> An endorser is NOT liable if they exercised <strong>due diligence to verify the veracity</strong> of the claims made in the advertisement. <strong>Exception (Section 21(6)):</strong> A publisher is NOT liable if they published the ad in the ordinary course of business and had no previous knowledge of the CCPA withdrawal order.</p>

<h4>Appeal against CCPA Orders (Section 24)</h4>
<p>A person aggrieved by any order under Sections 20 and 21 may appeal to the <strong>National Commission within 30 days</strong> of receipt of such order.</p>

<h4>Key Factors for Determining Penalty (Section 21(7))</h4>
<ol>
  <li>Population and area impacted or affected by the offence</li>
  <li>Frequency and duration of the offence</li>
  <li>Vulnerability of the class of persons adversely affected</li>
  <li>Gross revenue from sales effected by virtue of such offence</li>
</ol>`,

        guru_explanation: `
<p>The CCPA is a new and powerful regulator — a first in Indian consumer law. Here's how to understand it conceptually:</p>

<h4>CCPA vs Consumer Commissions — The Key Difference</h4>
<p>Consumer Commissions (District/State/National) handle <strong>individual consumer complaints</strong> — one consumer, one dispute, one resolution.<br>
CCPA handles <strong>class-wide violations</strong> — it protects consumers as a CLASS. It can act suo motu without any individual complaint. It regulates false advertisements that harm millions simultaneously.</p>

<h4>The Two-Track Approach for Misleading Ads</h4>
<p>The 2019 Act creates TWO separate tracks for misleading advertisements:</p>
<ol>
  <li><strong>Administrative Track (CCPA — Section 21):</strong> Civil penalties only (₹10L/₹50L). No imprisonment. Endorser ban up to 1/3 years. Quick regulatory action.</li>
  <li><strong>Criminal Track (Section 89):</strong> Imprisonment (2 years/5 years) + Fine (₹10L/₹50L). Handled by courts. Requires prior investigation.</li>
</ol>
<p>Both tracks can run simultaneously. The same misleading ad can attract civil penalty from CCPA AND criminal prosecution under Section 89.</p>

<h4>Director-General — The Investigative Arm</h4>
<p>The DG heads the Investigation Wing. The DG can delegate powers to Additional DG, Director, Joint Director, Deputy Director, or Assistant Director. Investigations by DG must be submitted to CCPA in the form, manner, and time specified by regulations.</p>

<h4>The "Due Diligence" Shield for Endorsers</h4>
<p>A celebrity or influencer endorsing a product is NOT liable if they genuinely verified the product's claims before endorsing. This is the "due diligence" defence. But once the CCPA has passed an order withdrawing an advertisement, no publisher can claim ignorance if they knew about the order.</p>`,

        practical_example: `
<p><strong>Scenario 1 — Celebrity Endorser:</strong><br>
An actor endorses a weight loss product claiming it reduces 10 kg in 10 days. The CCPA investigates and finds the claim is false. What can CCPA do?<br>
<strong>Answer:</strong> Under Section 21, CCPA can: (1) Issue direction to discontinue the advertisement; (2) Impose civil penalty on the actor (endorser) — up to ₹10 Lakh (1st offence); (3) Ban the actor from making endorsements for up to 1 year. If the actor can prove due diligence (e.g., they were given false lab reports), they may escape liability.</p>

<p><strong>Scenario 2 — Dangerous Toy Recall:</strong><br>
CCPA investigation reveals that a toy manufacturer's product contains toxic paint harmful to children. What orders can CCPA pass?<br>
<strong>Answer:</strong> Under Section 20: (a) Order <strong>recall</strong> of all such toys from the market; (b) Direct <strong>reimbursement</strong> of the price to all purchasers; (c) Order <strong>discontinuation</strong> of the manufacturing practice. Failure to comply = Section 88 punishment (6 months / ₹20 Lakh).</p>

<p><strong>Scenario 3 — Appeal:</strong><br>
A manufacturer receives a CCPA penalty order for ₹10 Lakh on 1st March. Can they challenge it?<br>
<strong>Answer:</strong> Yes. They must file an appeal to the <strong>National Commission within 30 days</strong> — i.e., by 31st March.</p>`,

        exam_insight: `
<p><strong>⭐ CCPA Quick Facts for Exam:</strong></p>
<ul>
  <li>Established: <strong>Central Government</strong> by notification (Section 10)</li>
  <li>HQ: <strong>National Capital Region of Delhi</strong></li>
  <li>Head: <strong>Chief Commissioner</strong></li>
  <li>Investigation Wing: <strong>Director-General</strong></li>
  <li>NOT present in Consumer Protection Act, 1986</li>
  <li>Section 21 penalty — manufacturer/endorser: ₹10L (1st), ₹50L (subsequent)</li>
  <li>Endorser ban: <strong>1 year (1st), 3 years (subsequent)</strong></li>
  <li>Appeal from CCPA order: <strong>National Commission within 30 days</strong></li>
  <li>CCPA can act <strong>suo motu</strong> — does not need a complaint</li>
  <li>Prosecution for S.90/91: needs CCPA's <strong>written consent</strong> (Section 92)</li>
</ul>
<p><strong>🔴 Key Distinctions for MCQs:</strong></p>
<ul>
  <li>CCPA penalty (S.21) = <strong>civil penalty, no imprisonment</strong></li>
  <li>S.89 punishment = <strong>criminal, imprisonment + fine</strong></li>
  <li>CCPA regulates <strong>class-wide</strong> violations; Commissions handle <strong>individual</strong> disputes</li>
  <li>Endorser due diligence defence is available ONLY under Section 21 (civil) — not under Section 89 (criminal)</li>
</ul>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 4. PECUNIARY JURISDICTION & COMPOSITION OF COMMISSIONS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Pecuniary Jurisdiction, Composition & Administrative Control of Consumer Commissions",
        rule_number: "Sections 28, 34, 42, 47, 53, 54, 58, 70",
        act_name: "Consumer Protection Act, 2019",
        category: "Section",
        effective_date: new Date("2020-07-20"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<h4>Updated Pecuniary Jurisdiction & Composition Table</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#e8f4ff">
    <th style="border:1px solid #ccc;padding:8px">Commission Level</th>
    <th style="border:1px solid #ccc;padding:8px">Pecuniary Jurisdiction</th>
    <th style="border:1px solid #ccc;padding:8px">Composition</th>
    <th style="border:1px solid #ccc;padding:8px">Established by</th>
    <th style="border:1px solid #ccc;padding:8px">Section</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px"><strong>District Commission</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Up to <strong>₹50 Lakh</strong></td>
    <td style="border:1px solid #ccc;padding:8px">1 President + min. <strong>2 Members</strong></td>
    <td style="border:1px solid #ccc;padding:8px">State Government</td>
    <td style="border:1px solid #ccc;padding:8px">Section 28</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px"><strong>State Commission</strong></td>
    <td style="border:1px solid #ccc;padding:8px">₹50 Lakh to <strong>₹2 Crore</strong></td>
    <td style="border:1px solid #ccc;padding:8px">1 President + min. <strong>4 Members</strong></td>
    <td style="border:1px solid #ccc;padding:8px">State Government</td>
    <td style="border:1px solid #ccc;padding:8px">Section 42</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:8px"><strong>National Commission</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Above <strong>₹2 Crore</strong></td>
    <td style="border:1px solid #ccc;padding:8px">1 President + min. <strong>4 Members</strong></td>
    <td style="border:1px solid #ccc;padding:8px">Central Government</td>
    <td style="border:1px solid #ccc;padding:8px">Section 53</td>
  </tr>
</table>
<p><em>Note: The original Act, 2019 (Sections 34/47/58) specified higher limits (₹1Cr / ₹1Cr–₹10Cr / above ₹10Cr). The Consumer Protection (Jurisdiction) Rules, 2021 REDUCED these limits to de-clog higher commissions.</em></p>

<h4>Key Points on Composition</h4>
<ul>
  <li>National Commission: Members are appointed in consultation with the <strong>Chief Justice of India</strong> (Section 54)</li>
  <li>Proceedings before District Commission: Conducted by the <strong>President + at least one Member</strong> sitting together (Section 36(1))</li>
  <li>If a member is unable to continue a proceeding mid-way, the President and other member shall continue from the stage at which it was last heard</li>
</ul>

<h4>Territorial Jurisdiction — District Commission (Section 34(2))</h4>
<p>A complaint may be filed in the District Commission within whose local limits:</p>
<ol type="a">
  <li>The opposite party (or any one of them) ordinarily resides / carries on business / has a branch office / personally works for gain</li>
  <li>Any opposite party actually and voluntarily resides — only with the Commission's <strong>permission</strong></li>
  <li>The <strong>cause of action</strong>, wholly or in part, arises</li>
  <li>The <strong>complainant</strong> resides or personally works for gain</li>
</ol>

<h4>Jurisdiction of State Commission (Section 47)</h4>
<p>State Commission entertains: (a) Complaints exceeding ₹1 Crore but not exceeding ₹10 Crore; AND (b) Appeals against orders of any District Commission within the State. It can also call for records and pass appropriate orders for District Commissions acting outside jurisdiction.</p>

<h4>Jurisdiction of National Commission (Section 58)</h4>
<p>National Commission entertains: (a)(i) Complaints exceeding ₹10 Crore; (ii) Appeals against orders of any State Commission; (iii) Appeals against orders of the Central Authority. It can also call for records and pass appropriate orders for State Commissions acting outside jurisdiction.</p>

<h4>Administrative Control (Section 70)</h4>
<ul>
  <li><strong>National Commission</strong> → administrative control over ALL State Commissions</li>
  <li><strong>State Commission</strong> → administrative control over ALL District Commissions within the State</li>
</ul>

<h4>Unfair Contracts — Special Jurisdiction (Section 49 & 59)</h4>
<p>Only the <strong>State Commission and National Commission</strong> can declare any terms of contract which are unfair to the consumer as null and void. The District Commission does NOT have this power.</p>

<h4>Transfer of Cases</h4>
<ul>
  <li><strong>State Commission</strong> (Section 48): May transfer a complaint from one District Commission to another within the State</li>
  <li><strong>National Commission</strong> (Section 62): May transfer a complaint from a District Commission in one State to a District Commission in another State, or from one State Commission to another</li>
</ul>`,

        guru_explanation: `
<h4>How to Remember Jurisdiction Limits (2021 Rules)</h4>
<p>The updated (post-2021 Rules) jurisdiction limits are simplified:</p>
<ul>
  <li>District: Up to <strong>₹50 Lakh</strong></li>
  <li>State: ₹50 Lakh to <strong>₹2 Crore</strong></li>
  <li>National: Above <strong>₹2 Crore</strong></li>
</ul>

<h4>The "2 vs 4 Members" Rule</h4>
<p>District Commission = minimum <strong>2 members</strong>. State and National = minimum <strong>4 members</strong>. Easy memory: District is the smallest, so it has the fewest members.</p>

<h4>The State Government vs Central Government Divide</h4>
<p>District and State Commissions are established by <strong>State Government</strong>. National Commission is established by <strong>Central Government</strong>. This matters because qualifications/service conditions for District and State Commission members are set by State Government rules, while National Commission members are governed by Central Government rules (with CJI consultation for composition).</p>

<h4>The "Complainant Residence" Ground — New in 2019</h4>
<p>The 1986 Act did not allow filing based on the complainant's residence. The 2019 Act added ground (d) — <strong>the complainant resides or works for gain</strong>. This is a major consumer-friendly change — you can now sue near your home, not just near the seller.</p>`,

        practical_example: `
<p><strong>Scenario 1 — Choosing the Right Commission:</strong><br>
A consumer in Coimbatore buys a product online from a company based in Delhi. The product defect causes ₹80 Lakh in damages. Where can they file?<br>
<strong>Answer:</strong> ₹80 Lakh → State Commission (₹50 Lakh – ₹2 Crore range). For territorial jurisdiction: (a) Company's registered office in Delhi → Delhi State Commission; OR (c) Cause of action arose in Coimbatore (product purchased/used there); OR (d) Consumer resides in Coimbatore → Tamil Nadu State Commission. Consumer has maximum flexibility under the 2019 Act.</p>

<p><strong>Scenario 2 — Unfair Contract Complaint:</strong><br>
A housing society member wants to challenge an unfair clause in his apartment purchase agreement. The dispute value is ₹25 Lakh. Can the District Commission hear it?<br>
<strong>Answer:</strong> For an <strong>unfair contract</strong> complaint — <strong>NO</strong>. Only State and National Commissions can declare contract terms null and void (Sections 49 & 59). The consumer must file at State Commission despite the amount being within District jurisdiction.</p>

<p><strong>Scenario 3 — Transfer of Case:</strong><br>
A complaint is pending before the District Commission in Mumbai. The complainant moves to Pune. Can the case be transferred?<br>
<strong>Answer:</strong> Yes. The State Commission may transfer the complaint from Mumbai District Commission to Pune District Commission under Section 48, if the interest of justice so requires.</p>`,

        exam_insight: `
<p><strong>⭐ Quick Reference — Jurisdiction & Composition:</strong></p>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#e8f4ff">
    <th style="border:1px solid #ccc;padding:6px">Commission</th>
    <th style="border:1px solid #ccc;padding:6px">Jurisdiction</th>
    <th style="border:1px solid #ccc;padding:6px">Min. Members</th>
    <th style="border:1px solid #ccc;padding:6px">Established by</th>
  </tr>
  <tr><td style="border:1px solid #ccc;padding:6px">District</td><td style="border:1px solid #ccc;padding:6px">Up to ₹50 Lakh</td><td style="border:1px solid #ccc;padding:6px"><strong>2</strong></td><td style="border:1px solid #ccc;padding:6px">State Govt</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">State</td><td style="border:1px solid #ccc;padding:6px">₹50L – ₹2Cr</td><td style="border:1px solid #ccc;padding:6px"><strong>4</strong></td><td style="border:1px solid #ccc;padding:6px">State Govt</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">National</td><td style="border:1px solid #ccc;padding:6px">Above ₹2Cr</td><td style="border:1px solid #ccc;padding:6px"><strong>4</strong></td><td style="border:1px solid #ccc;padding:6px">Central Govt</td></tr>
</table>
<p><strong>🔴 Trap MCQs:</strong></p>
<ul>
  <li>"Unfair contract complaints can be filed at District Commission" — <strong>FALSE</strong>. Only State + National.</li>
  <li>"National Commission members are appointed by State Govt" — <strong>FALSE</strong>. Central Govt, in consultation with CJI.</li>
  <li>"Who has administrative control over District Commissions?" — <strong>State Commission</strong> (not National).</li>
  <li>"National Commission is established at State Capital" — <strong>FALSE</strong>. National Capital Region.</li>
</ul>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. PRODUCT LIABILITY — CHAPTER VI (Sections 82–87)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Product Liability — Chapter VI (Sections 82–87)",
        rule_number: "Sections 82, 83, 84, 85, 86, 87",
        act_name: "Consumer Protection Act, 2019",
        category: "Section",
        effective_date: new Date("2020-07-20"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<p><strong>Chapter VI (Product Liability) is entirely new in the 2019 Act — it did not exist in the 1986 Act. It creates a comprehensive civil liability framework for defective products and deficient services.</strong></p>

<h4>Section 82 — Application of Chapter</h4>
<p>The provisions of this Chapter shall be <strong>in addition to and not in derogation of</strong> the provisions of any other law in force (e.g., Sale of Goods Act, Drugs Act, etc.).</p>

<h4>Section 83 — Who Can Bring a Product Liability Action?</h4>
<p>Any person who has suffered <strong>harm</strong> may bring an action against:</p>
<ul>
  <li><strong>Product Manufacturer</strong></li>
  <li><strong>Product Service Provider</strong></li>
  <li><strong>Product Seller</strong></li>
</ul>

<h4>Section 84 — Liability of Product Manufacturer</h4>
<p>A product manufacturer shall be liable if:</p>
<ol type="a">
  <li>Product contains a <strong>manufacturing defect</strong></li>
  <li>Product is <strong>defective in design</strong></li>
  <li>There is a <strong>deviation from manufacturing specifications</strong></li>
  <li>Product does not conform to <strong>express warranty</strong></li>
  <li>Product fails to contain <strong>adequate instructions of correct usage</strong> or warning regarding improper/incorrect usage</li>
</ol>

<h4>Section 85 — Liability of Product Service Provider</h4>
<p>A product service provider shall be liable if:</p>
<ol type="a">
  <li>Services <strong>deviated from manufacturing specifications</strong></li>
  <li>Provider failed to exercise <strong>reasonable care and skill</strong></li>
  <li>Provider failed to comply with <strong>express warranties</strong> as to the service</li>
</ol>

<h4>Section 86 — Liability of Product Sellers</h4>
<p>A product seller (who is NOT the manufacturer) shall be liable if:</p>
<ol type="a">
  <li>Exercised <strong>substantial control over design/testing/manufacture/packaging/labelling</strong></li>
  <li><strong>Altered or modified</strong> the product and alteration was a substantial cause of harm</li>
  <li>Made an <strong>independent express warranty</strong> different from manufacturer's warranty</li>
  <li>Failed to exercise <strong>reasonable care</strong> in assembling/inspecting/maintaining</li>
  <li>Sold product but <strong>failed to identify the manufacturer</strong> within <strong>30 DAYS</strong> of being asked</li>
</ol>
<p><strong>Product Seller NOT Liable (Section 86(2)) if:</strong></p>
<ul>
  <li>Product sold under a registered trade mark / brand registered to another person AND not liable under (a)–(d); OR</li>
  <li>Seller can identify the product manufacturer from his records; OR</li>
  <li>Seller identifies the person from whom he received the product, who was reasonably believed to be authorised to supply</li>
</ul>

<h4>Section 87 — Exceptions to Product Liability Action</h4>
<p>Product liability action shall NOT be maintainable where harm is caused due to:</p>
<ol type="a">
  <li><strong>Misuse, modification or alteration</strong> of the product by the consumer</li>
  <li><strong>Failure to follow instructions</strong> supplied with the product</li>
  <li><strong>Compliance by the manufacturer/seller</strong> with mandatory instructions issued under any law in force</li>
</ol>`,

        guru_explanation: `
<h4>Why Product Liability is Revolutionary</h4>
<p>Before 2019, if a defective product caused you harm, you had to prove the manufacturer was negligent (a difficult legal burden). Under Chapter VI, liability is essentially <strong>strict liability</strong> for manufacturers — you just need to prove the product was defective and you suffered harm.</p>

<h4>The Three-Party Liability Web</h4>
<p>Imagine a defective blender that injures you:</p>
<ul>
  <li><strong>Manufacturer</strong> (Section 84) — liable if the design was bad, manufacturing was flawed, specs weren't followed, or instructions were absent</li>
  <li><strong>Service Provider</strong> (Section 85) — liable if they repaired it carelessly, deviated from specs during servicing, or breached warranty</li>
  <li><strong>Seller</strong> (Section 86) — liable if they modified it, gave their own warranty, didn't exercise care in assembling/selling, or can't tell you who made it</li>
</ul>

<h4>The "1 Month Disclosure" Rule — Critical for Product Sellers</h4>
<p>A shop that sells products of unknown/undisclosed manufacture is taking a HUGE risk under this Act. If a customer is harmed and asks "Who made this?", the seller has exactly <strong>30 DAYS</strong> to name the manufacturer. If they can't — <strong>they become liable as if they were the manufacturer</strong>.</p>
<p>This creates a strong incentive for sellers to maintain proper records of their supply chain.</p>

<h4>The Consumer's Own Fault = No Claim</h4>
<p>Section 87 creates the <strong>contributory fault bar</strong>: if you misused the product, ignored the instructions, or modified it yourself — you cannot claim product liability. The harm must be attributable to the product/service, not your own conduct.</p>`,

        practical_example: `
<p><strong>Scenario 1 — Manufacturing Defect:</strong><br>
A pressure cooker bursts and injures a housewife. The investigation reveals the safety valve was not properly installed during manufacture. Who is liable?<br>
<strong>Answer:</strong> The <strong>Product Manufacturer</strong> under Section 84(a) — manufacturing defect. The housewife can bring a product liability action without proving negligence.</p>

<p><strong>Scenario 2 — Inadequate Instructions:</strong><br>
A medication bottle has no warnings about dangerous drug interactions. A patient takes it with another drug and suffers serious harm. Who is liable?<br>
<strong>Answer:</strong> The <strong>Product Manufacturer</strong> under Section 84(e) — failure to provide adequate instructions/warnings.</p>

<p><strong>Scenario 3 — Product Seller Cannot Name Manufacturer:</strong><br>
A consumer is injured by a defective power tool bought from a hardware store. The store sells it under a generic label and when asked who manufactured it, they cannot provide the name within 30 days.<br>
<strong>Answer:</strong> The <strong>Product Seller</strong> becomes liable under Section 86(1)(e) — failure to identify the manufacturer within 30 days. </p>

<p><strong>Scenario 4 — Consumer Misuse:</strong><br>
A consumer uses an electric drill as a kitchen mixer and gets injured. Can they file a product liability action?<br>
<strong>Answer:</strong> <strong>NO</strong>. Section 87(a) — harm caused due to misuse of the product by the consumer. Product liability action is not maintainable.</p>`,

        exam_insight: `
<p><strong>⭐ Product Liability Key Points:</strong></p>
<ul>
  <li>Chapter VI is entirely <strong>new in 2019 Act</strong> — not present in 1986</li>
  <li>Three parties liable: <strong>Manufacturer, Service Provider, Seller</strong></li>
  <li>Manufacturer liable for: <strong>manufacturing defect, design defect, deviation from specs, breach of express warranty, inadequate instructions</strong></li>
  <li>Seller's time limit to identify manufacturer: <strong>30 DAYS</strong> (Section 86(1)(e))</li>
  <li>Three exceptions to product liability: <strong>misuse, failure to follow instructions, compliance with mandatory law</strong></li>
  <li>"Product" does NOT include: <strong>human tissues, blood, blood products and organs</strong> (Section 2(42))</li>
  <li>Section 82: Chapter VI is <strong>in addition to</strong> (not in derogation of) other laws</li>
</ul>
<p><strong>🔴 Trap MCQs:</strong></p>
<ul>
  <li>"Product liability action can be brought only against the manufacturer" — <strong>FALSE</strong>. Seller and service provider also liable.</li>
  <li>"A seller who modifies a product is not liable" — <strong>FALSE</strong>. Modification is a basis of liability under Section 86(1)(b).</li>
  <li>"Defective design is the manufacturer's liability" — <strong>TRUE</strong>. Section 84(b).</li>
  <li>"A consumer who ignored product instructions can claim product liability" — <strong>FALSE</strong>. Section 87(b) bars such a claim.</li>
</ul>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 6. KEY IMPORTANT NOTES, DEFINITIONS & OLD vs NEW ACT
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Key Important Notes, Definitions & 1986 vs 2019 Comparison — Consumer Protection Act",
        rule_number: "Sections 2, 69, 95, 97, 100, 107",
        act_name: "Consumer Protection Act, 2019",
        category: "Explanation",
        effective_date: new Date("2020-07-20"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<h4>1. Commencement (Section 1)</h4>
<ul>
  <li>Act No. <strong>35 of 2019</strong>, assented to on <strong>9th August, 2019</strong></li>
  <li>Major provisions came into force on <strong>20th July 2020</strong> (Notification S.O. 2421(E) dated 23rd July 2020)</li>
  <li>Extends to the <strong>whole of India</strong></li>
  <li>Applies to all goods and services unless expressly exempted by Central Government</li>
</ul>

<h4>2. Key Definitions (Section 2)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#f0f4ff">
    <th style="border:1px solid #ccc;padding:7px">Term</th>
    <th style="border:1px solid #ccc;padding:7px">Key Point</th>
    <th style="border:1px solid #ccc;padding:7px">Section</th>
  </tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Caveat Emptor</strong></td><td style="border:1px solid #ccc;padding:7px">"Let the buyer beware" — SELLER NOT liable; consumer must be careful</td><td style="border:1px solid #ccc;padding:7px">S.2(7)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Caveat Venditor</strong></td><td style="border:1px solid #ccc;padding:7px">"Let the seller beware" — SELLER IS LIABLE; must exercise due care</td><td style="border:1px solid #ccc;padding:7px">S.2(8)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Defect</strong></td><td style="border:1px solid #ccc;padding:7px">Fault/imperfection in quality, quantity, potency, purity or standard of <strong>GOODS</strong></td><td style="border:1px solid #ccc;padding:7px">S.2(18)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Deficiency</strong></td><td style="border:1px solid #ccc;padding:7px">Fault/imperfection/shortcoming in quality, nature or manner of performance of <strong>SERVICES</strong> (includes negligence + withholding information)</td><td style="border:1px solid #ccc;padding:7px">S.2(19)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Consumer</strong></td><td style="border:1px solid #ccc;padding:7px">Buys goods/services for consideration. NOT for resale/commercial purpose. <strong>Self-employment = consumer</strong></td><td style="border:1px solid #ccc;padding:7px">S.2(16)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>E-commerce</strong></td><td style="border:1px solid #ccc;padding:7px">Buying/selling including digital products over digital/electronic network</td><td style="border:1px solid #ccc;padding:7px">S.2(24)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Alternative Dispute Resolution</strong></td><td style="border:1px solid #ccc;padding:7px">Means <strong>mediation</strong> only (Section 2(4))</td><td style="border:1px solid #ccc;padding:7px">S.2(4)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Recall</strong></td><td style="border:1px solid #ccc;padding:7px">Elimination of defect by repair, replacement, take-back or refund</td><td style="border:1px solid #ccc;padding:7px">S.2(49)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px"><strong>Spurious Goods</strong></td><td style="border:1px solid #ccc;padding:7px">Goods which are <strong>falsely claimed to be genuine</strong></td><td style="border:1px solid #ccc;padding:7px">S.2(53)</td></tr>
</table>

<h4>3. Who is a "Complainant" (Section 2(14))?</h4>
<ol type="i">
  <li>A consumer</li>
  <li>Any voluntary consumer association registered under Companies Act 2013 or any law</li>
  <li>The Central Government or any State Government</li>
  <li>One or more consumers where there are numerous consumers having the same interest</li>
  <li>In case of <strong>death of a consumer</strong> — his legal heir or representative</li>
</ol>

<h4>4. Limitation Period — Section 69</h4>
<p><strong>2 years</strong> from the date cause of action arose. Delay condonable — but Commission MUST record reasons for condoning delay in writing.</p>

<h4>5. Public Servants — Section 95</h4>
<p>Every President and Member (all three Commissions), Chief Commissioner, every Commissioner and every officer of CCPA are deemed <strong>public servants</strong> under Section 21 of IPC.</p>

<h4>6. Section 100 — Not in Derogation</h4>
<p>This Act is <strong>in addition to</strong> and NOT in derogation of any other law. Consumer remedies exist alongside other legal remedies.</p>

<h4>7. Section 97 — Consumer Welfare Fund</h4>
<p>All penalties collected under this Act are credited to the <strong>Consumer Welfare Fund</strong>.</p>

<h4>8. Repeal — Section 107</h4>
<p>The <strong>Consumer Protection Act, 1986 (68 of 1986)</strong> is hereby repealed. Pending complaints before any Commission shall continue as if the 1986 Act has not been repealed.</p>

<h4>9. Old (1986) vs New (2019) Comparison Table</h4>
<table style="width:100%;border-collapse:collapse">
  <tr style="background:#e8f4ff">
    <th style="border:1px solid #ccc;padding:7px">Aspect</th>
    <th style="border:1px solid #ccc;padding:7px">1986 Act</th>
    <th style="border:1px solid #ccc;padding:7px">2019 Act</th>
  </tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Central Authority</td><td style="border:1px solid #ccc;padding:7px">Not present</td><td style="border:1px solid #ccc;padding:7px"><strong>CCPA established</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">E-commerce</td><td style="border:1px solid #ccc;padding:7px">Not specifically covered</td><td style="border:1px solid #ccc;padding:7px">Specifically covered (S.2(24), 94)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Product Liability</td><td style="border:1px solid #ccc;padding:7px">Not present</td><td style="border:1px solid #ccc;padding:7px">Dedicated Chapter VI (S.82–87)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Mediation</td><td style="border:1px solid #ccc;padding:7px">Not present</td><td style="border:1px solid #ccc;padding:7px">Dedicated Chapter V (S.74–81)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">District Jurisdiction</td><td style="border:1px solid #ccc;padding:7px">₹20 Lakh</td><td style="border:1px solid #ccc;padding:7px">₹50 Lakh (updated via Rules)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">State Jurisdiction</td><td style="border:1px solid #ccc;padding:7px">₹20L – ₹1Cr</td><td style="border:1px solid #ccc;padding:7px">₹50 Lakh – ₹2 Crore</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">National Jurisdiction</td><td style="border:1px solid #ccc;padding:7px">Above ₹1 Crore</td><td style="border:1px solid #ccc;padding:7px">Above ₹2 Crore</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Limitation Period</td><td style="border:1px solid #ccc;padding:7px">2 years</td><td style="border:1px solid #ccc;padding:7px">2 years (retained)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Unfair Contracts</td><td style="border:1px solid #ccc;padding:7px">Not covered</td><td style="border:1px solid #ccc;padding:7px">Defined (S.2(56)) and actionable</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Endorser Liability</td><td style="border:1px solid #ccc;padding:7px">Not covered</td><td style="border:1px solid #ccc;padding:7px">Explicitly liable (S.21)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Online filing</td><td style="border:1px solid #ccc;padding:7px">Not available</td><td style="border:1px solid #ccc;padding:7px">Expressly provided (S.35)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:7px">Complainant's Residence</td><td style="border:1px solid #ccc;padding:7px">Not a ground for jurisdiction</td><td style="border:1px solid #ccc;padding:7px">Expressly added (S.34(2)(d))</td></tr>
</table>`,

        guru_explanation: `
<h4>The Heart of the 2019 Act — Consumer Empowerment</h4>
<p>The 2019 Act fundamentally shifts the balance from <em>caveat emptor</em> (buyer beware) to <em>caveat venditor</em> (seller beware). Every new provision — CCPA, product liability, endorser accountability, e-commerce rules — reinforces the principle that the seller/manufacturer bears the primary responsibility for the safety and quality of their goods and services.</p>

<h4>Why "Self-Employment = Consumer" Matters</h4>
<p>A carpenter who buys a power tool for his carpentry business is NOT a commercial user — he's using it for earning his livelihood by self-employment. Therefore, he IS a consumer and can file a complaint. This extends consumer protection to India's vast informal economy of self-employed artisans, traders, and small vendors.</p>

<h4>The Mediation Revolution</h4>
<p>Before 2019, consumer disputes had only one path: formal Commission proceedings. Now, Chapter V creates a parallel mediation track. Every Commission must have a <em>consumer mediation cell</em> and maintain a panel of mediators. When both parties agree, the dispute can be settled amicably through mediation — saving time and expense for everyone.</p>

<h4>Section 100 — The "Plus" Rule</h4>
<p>Section 100 is very important conceptually: consumer law runs ALONGSIDE all other laws — it doesn't replace them. You can simultaneously sue under the Consumer Protection Act AND under the civil courts, tort law, etc. Consumer courts are an ADDITIONAL remedy, not the only remedy.</p>`,

        practical_example: `
<p><strong>Scenario 1 — Is He a Consumer?</strong><br>
Ramesh, a tailor, buys a sewing machine for his tailoring shop where he works alone. The machine is defective. Is he a consumer?<br>
<strong>Answer:</strong> <strong>YES</strong>. He uses the machine to earn his livelihood by self-employment. Section 2(16) explanation: commercial purpose does NOT include self-employment. Ramesh IS a consumer.</p>

<p><strong>Scenario 2 — Complaint After 3 Years:</strong><br>
A consumer discovers a defect in her car 3 years after purchase. The cause of action arose at purchase. Can she still file?<br>
<strong>Answer:</strong> The 2-year limitation period has expired. She can file if she shows <strong>sufficient cause</strong> for the delay. The Commission must record in writing its reasons for condoning the delay. It has discretion to condone or refuse.</p>

<p><strong>Scenario 3 — Which Law Applies?</strong><br>
A consumer suffers food poisoning at a restaurant. Can she claim under Consumer Protection Act even if she also files a complaint under the Food Safety Act?<br>
<strong>Answer:</strong> <strong>YES</strong>. Section 100 ensures the Consumer Protection Act is IN ADDITION to, not in derogation of, other laws. Both remedies can run simultaneously.</p>`,

        exam_insight: `
<p><strong>⭐ Absolute Must-Know Facts:</strong></p>
<ul>
  <li>Act No.: <strong>35 of 2019</strong>; Assent: <strong>9th August 2019</strong>; Came into force: <strong>20th July 2020</strong></li>
  <li>Does NOT extend to: <strong>Jammu and Kashmir</strong></li>
  <li>Old Act repealed: <strong>Consumer Protection Act, 1986 (68 of 1986)</strong></li>
  <li>Alternative Dispute Resolution under this Act = <strong>Mediation only</strong> (Section 2(4))</li>
  <li>6 consumer rights (Mnemonic <strong>S.I.C.H.R.E</strong>): <strong>S</strong>afety, <strong>I</strong>nformed, <strong>C</strong>hoose, <strong>H</strong>eard, <strong>R</strong>edressal, <strong>E</strong>ducation</li>
  <li>Defect = applies to <strong>GOODS</strong>; Deficiency = applies to <strong>SERVICES</strong></li>
  <li>Spurious goods = <strong>falsely claimed to be genuine</strong></li>
  <li>Counterfeit goods = <strong>uses identical/deceptively similar trademark</strong> without authorisation</li>
  <li>Section 100: Act is <strong>in addition to, not in derogation of</strong> other laws</li>
  <li>Section 97: All penalties credited to <strong>Consumer Welfare Fund</strong></li>
</ul>
<p><strong>🔴 Classic Exam Traps:</strong></p>
<ul>
  <li>"Self-employed persons are not consumers" — <strong>FALSE</strong>. They ARE consumers.</li>
  <li>"Consumer Protection Act, 2019 extends to whole of India" — <strong>TRUE</strong> (including Jammu & Kashmir).</li>
  <li>"Deficiency applies to goods" — <strong>FALSE</strong>. Deficiency applies to SERVICES; Defect applies to GOODS.</li>
  <li>"The 1986 Act is still in force alongside the 2019 Act" — <strong>FALSE</strong>. The 1986 Act is repealed by Section 107.</li>
</ul>`,

        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    }

];

// ─── MAIN SEED FUNCTION ────────────────────────────────────────────────────────
async function seed() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        // Remove existing entries for this act to avoid duplicates
        const result = await collection.deleteMany({ act_name: "Consumer Protection Act, 2019" });
        console.log(`🗑️  Removed ${result.deletedCount} existing CPA 2019 entries`);

        // Insert new entries
        const insertResult = await collection.insertMany(entries);
        console.log(`✅ Inserted ${insertResult.insertedCount} Dak Sutra entries for Consumer Protection Act, 2019`);

        entries.forEach((e, i) => {
            console.log(`   ${i + 1}. ${e.title}`);
        });

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
        console.log('\n✅ Seed complete. Connection closed.');
        process.exit(0);
    }
}

seed();
