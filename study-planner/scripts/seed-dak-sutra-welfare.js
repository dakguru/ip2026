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
if (!MONGODB_URI) { console.error('❌ MONGODB_URI not found'); process.exit(1); }

const now = new Date();

const entries = [
// ═══════════════════════════════════════════════════════════════════════════════
// CARD 1: FINANCIAL ASSISTANCE (DEATH, ILLNESS & CALAMITIES)
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Welfare Measures: Death, Illness & Calamity Assistance (Dept & GDS)",
    rule_number: "Welfare Guidelines 2025",
    act_name: "Welfare Measurement of Dept Employee and GDS",
    category: "Explanation",
    effective_date: new Date("2025-12-22"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #B71C1C, #D32F2F);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    Dak Sutra — Financial Assistance (Death, Illness & Calamities)
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Dak Guru · Exam-Oriented Content</p>
</div>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">📜 OFFICIAL PROVISION</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li>The <strong>Field Service (Postal) Benevolent Fund</strong> provides immediate financial relief to Group C employees on deputation at APS.</li>
    <li>The Department extends structured financial assistance to Departmental Employees and Gramin Dak Sevaks (GDS) and their families in cases of death, prolonged illness, and natural calamities.</li>
    <li>Assistance amounts strictly depend on the <strong>nature of the incident</strong> (e.g., normal death, terrorist activity on/off duty, accidents).</li>
</ul>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">📊 CORE DATA / TABLES</h3>
<div style="overflow-x:auto;">
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Category of Incident</th>
      <th style="padding:12px;text-align:left;">Departmental Employee</th>
      <th style="padding:12px;text-align:left;">Gramin Dak Sevak (GDS)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Immediate Death (Normal)</td>
      <td style="padding:12px;">₹ 25,000</td>
      <td style="padding:12px;">₹ 11,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Death due to Terrorist/Dacoit (ON DUTY)</td>
      <td style="padding:12px;color:#C62828;font-weight:bold;">₹ 1,10,000</td>
      <td style="padding:12px;color:#C62828;font-weight:bold;">₹ 1,65,000</td>
    </tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Death due to Terrorist/Robbers (NOT ON DUTY)</td>
      <td style="padding:12px;">₹ 35,000</td>
      <td style="padding:12px;">₹ 13,200</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Death due to Accident (ON DUTY)</td>
      <td style="padding:12px;">₹ 35,000</td>
      <td style="padding:12px;">₹ 27,500</td>
    </tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Natural Calamities, Fire, Floods</td>
      <td style="padding:12px;">₹ 4,500</td>
      <td style="padding:12px;">₹ 5,500</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Prolonged Illness / Major Surgeries</td>
      <td style="padding:12px;">₹ 15,000</td>
      <td style="padding:12px;font-weight:bold;">₹ 30,000</td>
    </tr>
    <tr style="background:#FFEBEE;">
      <td style="padding:12px;font-weight:700;">COVID-19 (w.e.f 15.09.2021)</td>
      <td style="padding:12px;">-</td>
      <td style="padding:12px;">₹ 50,000</td>
    </tr>
  </tbody>
</table>
</div>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">💰 NUMERICAL DATA: TB ASSISTANCE</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;margin-bottom:15px;">
  <thead>
    <tr style="background:#E53935;color:#fff;">
      <th style="padding:10px;text-align:left;">Status</th>
      <th style="padding:10px;text-align:left;">Dept. Employee</th>
      <th style="padding:10px;text-align:left;">GDS (Min 6 Yrs Service)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:10px;font-weight:bold;">Indoor Patient</td>
      <td style="padding:10px;">₹ 400 / month (for 6 months)</td>
      <td style="padding:10px;">₹ 440 / month (for 6 months)</td>
    </tr>
    <tr>
      <td style="padding:10px;font-weight:bold;">Outdoor Patient</td>
      <td style="padding:10px;">₹ 200 / month (for 6 months)</td>
      <td style="padding:10px;">₹ 220 / month (for 6 months)</td>
    </tr>
  </tbody>
</table>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">🏦 FACILITIES / CONDITIONS</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li><strong>Funeral Expenses (GDS):</strong> ₹ 5,500 payable if last rites are performed by near relatives in absence of Next of Kin.</li>
    <li><strong>Hospitalization (GDS):</strong> ₹ 5,500 for accident on duty requiring hospitalization for > 3 days.</li>
    <li><strong>EOL / HPL Illness Assistance (Dept):</strong> EOL (₹1500/month) and HPL (₹750/month). Disease must be > 2 months old. Max 36 months (renewal every 6 months).</li>
    <li><strong>APS Benevolent Fund:</strong> Normal death (₹3500), Enemy Action (₹25000), Scholarship for children (₹500 one-time).</li>
</ul>
`,
    guru_explanation: `
<div style="background:#FFF3E0;border-left:5px solid #E65100;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#BF360C;">📖 DAK GURU EXPLAINS (SIMPLIFIED)</strong>
</div>
<p>The Department provides varying levels of financial compensation based on the exact circumstances of a tragedy. The core concept to remember is the <strong>"On Duty vs. Off Duty"</strong> rule for terrorist attacks.</p>
<ul>
    <li><strong>The Anomaly:</strong> GDS get a <em>higher</em> compensation than Departmental Employees in two specific scenarios: Death by Terrorist <strong>ON DUTY</strong> (GDS: ₹1.65L vs Dept: ₹1.10L) and <strong>Prolonged Illness</strong> (GDS: ₹30k vs Dept: ₹15k).</li>
    <li><strong>The TB Rule:</strong> TB assistance is always strictly for <strong>6 months</strong>. GDS gets exactly 10% more than Dept. employees (Indoor: 440 vs 400; Outdoor: 220 vs 200).</li>
</ul>
`,
    practical_example: `
<h4 style="color:#B71C1C;">🎯 PRACTICAL EXAMPLES / CASE STUDY</h4>
<div style="display:flex;gap:15px;flex-direction:column;">
    <div style="background:#FFEBEE;padding:15px;border-left:4px solid #D32F2F;border-radius:6px;">
        <strong>Situation:</strong> A GDS is killed by a robber while delivering mail (On Duty).<br>
        <strong>Outcome:</strong> Family receives ₹ 1,65,000.<br>
        <strong>Contrast:</strong> If killed by a robber at home (Not on Duty), the amount drops drastically to ₹ 13,200.
    </div>
    <div style="background:#E8F5E9;padding:15px;border-left:4px solid #2E7D32;border-radius:6px;">
        <strong>Situation:</strong> A Departmental employee is on Extra Ordinary Leave (EOL) for 4 months due to severe illness.<br>
        <strong>Outcome:</strong> They are eligible for ₹1,500/month assistance (since illness > 2 months old).
    </div>
</div>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ EXAM INSIGHT — MUST READ</strong>
</div>
<ul>
  <li>🔥 <strong>Most Asked Fact:</strong> Death by terrorist/dacoits ON DUTY amounts (Dept: 1.10L, GDS: 1.65L).</li>
  <li>🔁 <strong>Frequently Confused:</strong> EOL vs HPL assistance. EOL gets ₹1500, HPL gets ₹750 (half).</li>
  <li>⚠️ <strong>Traps & Distinctions:</strong> GDS requires minimum <strong>6 years</strong> of service to claim TB assistance.</li>
  <li>📌 <strong>One-line revision:</strong> GDS COVID-19 assistance is flat ₹50,000 (from 15.09.2021).</li>
</ul>

<h4 style="color:#B71C1C;">🧠 KEY DISTINCTIONS (COMPULSORY)</h4>
<ul>
  <li><strong>Normal Death is for</strong> ₹25k (Dept) & ₹11k (GDS), <strong>whereas Terrorist Death (On Duty) is for</strong> ₹1.10L (Dept) & ₹1.65L (GDS).</li>
  <li><strong>Illness assistance for Dept is</strong> ₹15k, <strong>whereas for GDS it is</strong> ₹30k.</li>
</ul>

<h4 style="color:#B71C1C;">📌 ULTRA-REVISION POINTS</h4>
<ul style="list-style-type:square;margin-left:20px;">
  <li>GDS Funeral Expenses (by relatives): ₹5,500.</li>
  <li>GDS Hospitalization (>3 days on duty accident): ₹5,500.</li>
  <li>Natural Calamities: Dept ₹4,500 / GDS ₹5,500.</li>
  <li>TB Assistance Duration: Exactly 6 Months.</li>
</ul>
`,
    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// CARD 2: SCHOLARSHIPS & EDUCATIONAL GRANTS
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Welfare Measures: Scholarships & Educational Grants (Dept & GDS)",
    rule_number: "Welfare Guidelines 2025",
    act_name: "Welfare Measurement of Dept Employee and GDS",
    category: "Explanation",
    effective_date: new Date("2025-12-22"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #1565C0, #0D47A1);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    Dak Sutra — Educational Scholarships & Grants
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Dak Guru · Exam-Oriented Content</p>
</div>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">📜 OFFICIAL PROVISION</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li>The Department provides Educational Scholarships for children of Departmental Employees (Basic Pay up to ₹65,200/-) and GDS.</li>
    <li>Scholarships are subject to renewal on a <strong>year-to-year basis</strong>.</li>
    <li>Special incentives exist for academic excellence (10th/12th), disabled children, UPSC aspirants, and SC/ST employees pursuing higher education or departmental exams.</li>
</ul>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">📊 CORE DATA: EDUCATIONAL SCHOLARSHIPS</h3>
<div style="overflow-x:auto;">
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;border-radius: 8px;overflow:hidden;margin-bottom:15px;">
  <thead>
    <tr style="background:#1976D2;color:#fff;">
      <th style="padding:12px;text-align:left;">Education Type</th>
      <th style="padding:12px;text-align:left;">Criteria</th>
      <th style="padding:12px;text-align:left;">Dept. Employee</th>
      <th style="padding:12px;text-align:left;">GDS</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;">
      <td style="padding:12px;font-weight:700;">IIT / IIM / AIIMS</td>
      <td style="padding:12px;">50% marks in sem/year</td>
      <td style="padding:12px;">₹ 1500 / month</td>
      <td style="padding:12px;">₹ 1100 / month</td>
    </tr>
    <tr style="border-bottom: 1px solid #BBDEFB;">
      <td style="padding:12px;font-weight:700;">Tech Education Degree</td>
      <td style="padding:12px;">85% marks in qualifying</td>
      <td style="padding:12px;">₹ 1200 / month</td>
      <td style="padding:12px;">₹ 308 / month</td>
    </tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;">
      <td style="padding:12px;font-weight:700;">Tech Education Diploma</td>
      <td style="padding:12px;">85% marks in qualifying</td>
      <td style="padding:12px;">₹ 375 / month</td>
      <td style="padding:12px;">₹ 209 / month</td>
    </tr>
    <tr style="border-bottom: 1px solid #BBDEFB;">
      <td style="padding:12px;font-weight:700;">Tech Ed. Non BA/BSc/BCom</td>
      <td style="padding:12px;">80% marks in qualifying</td>
      <td style="padding:12px;font-weight:bold;">₹ 2100 / annum</td>
      <td style="padding:12px;">₹ 165 / month</td>
    </tr>
    <tr style="background:#E3F2FD;">
      <td style="padding:12px;font-weight:700;">ITI Certificate Course</td>
      <td style="padding:12px;">65% marks in qualifying</td>
      <td style="padding:12px;">₹ 450 / month</td>
      <td style="padding:12px;font-weight:bold;">₹ 1034 / annum</td>
    </tr>
  </tbody>
</table>
</div>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">💰 NUMERICAL DATA: ACADEMIC EXCELLENCE (10th/12th)</h3>
<p style="font-size:0.9em;font-style:italic;">Awards must be announced before 30th September each year. Qualifying marks: Dept (90% for all), GDS (10th & 12th Sci: 85%, 12th Comm/Art: 80%).</p>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;margin-bottom:15px;">
  <thead>
    <tr style="background:#0D47A1;color:#fff;">
      <th style="padding:10px;text-align:left;">Position in Circle</th>
      <th style="padding:10px;text-align:left;">Dept. Employee Child</th>
      <th style="padding:10px;text-align:left;">GDS Child</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;">
      <td style="padding:10px;font-weight:bold;">1st</td>
      <td style="padding:10px;">₹ 9000</td>
      <td style="padding:10px;">₹ 1100</td>
    </tr>
    <tr style="border-bottom: 1px solid #BBDEFB;">
      <td style="padding:10px;font-weight:bold;">2nd</td>
      <td style="padding:10px;">₹ 7200</td>
      <td style="padding:10px;">₹ 880</td>
    </tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;">
      <td style="padding:10px;font-weight:bold;">3rd</td>
      <td style="padding:10px;">₹ 6300</td>
      <td style="padding:10px;">₹ 770</td>
    </tr>
    <tr style="border-bottom: 1px solid #BBDEFB;">
      <td style="padding:10px;font-weight:bold;">4th</td>
      <td style="padding:10px;">₹ 5400</td>
      <td style="padding:10px;">₹ 660</td>
    </tr>
    <tr style="background:#E3F2FD;">
      <td style="padding:10px;font-weight:bold;">5th</td>
      <td style="padding:10px;">₹ 4500</td>
      <td style="padding:10px;">₹ 550</td>
    </tr>
  </tbody>
</table>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">🏦 FACILITIES / CONDITIONS</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li><strong>Disabled Children Scholarship:</strong> Dept: ₹750/month (Pay up to ₹77,900/-). GDS: ₹220/month. Max 8 years. Disability >= 40% (except Blind/Deaf/Dumb).</li>
    <li><strong>UPSC Exam Scholarship:</strong> ₹2000/- (One time) upon clearing Prelims. No pay limit.</li>
    <li><strong>SC/ST Departmental Exams:</strong> IP/AAO (₹2700), PAO (₹1800), PA/SA (₹1350).</li>
    <li><strong>SC/ST Higher Education:</strong> 60% in 10th/12th = ₹1800 one-time. Degree/PG = ₹4500/annum.</li>
    <li><strong>Personality Development:</strong> 75% of fee (max ₹2000/annum) for 2 years. Age <35, Basic Pay <= ₹44,900.</li>
    <li><strong>Excursion Trips:</strong> 75% surface transport cost. 4-5 days/1000km (one way) or 200km (two way). Requires HoC approval. Max 2 officially sponsored trips per FY.</li>
    <li><strong>Recreation Club:</strong> Grant-in-aid Rs. 25/- per head/annum, plus an <strong>additional Rs. 25/-</strong> per head matching grant for subscriptions collected. Max Rs. 25,000/-.</li>
    <li><strong>RWA (Residents Welfare Assoc):</strong> Rs. 45/- per residential quarter. Minimum 200 members (PMG/CPMG can relax this condition).</li>
    <li><strong>Creche Facilities:</strong> For children aged 6mo to 10yrs (max 2 children/employee). Staffing: Up to 10 kids (1 worker, 1 helper), 10-25 kids (1 worker, 2 helpers). Grants: Start (₹60k), Every 3 yrs (₹20k), Recurring (₹1500/month/child max ₹38k).</li>
    <li><strong>Artificial Limbs/Tricycle:</strong> 75% cost of artificial limb/wheelchair (max ₹2000). 2nd Class railway fare to limb center is reimbursable.</li>
    <li><strong>Holiday Home Maintenance:</strong> Furniture for common room (₹1 Lakh), Furniture for each suit (₹75,000), Petty replacements (₹7500).</li>
    <li><strong>Ladies Organisation:</strong> Central Org (₹35,000/annum), Circle Org (₹25,000/annum).</li>
</ul>
`,
    guru_explanation: `
<div style="background:#E3F2FD;border-left:5px solid #1565C0;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#0D47A1;">📖 DAK GURU EXPLAINS (SIMPLIFIED)</strong>
</div>
<p>The education scholarships are split into two main structures: <strong>Monthly/Annual Schemes</strong> (like IIT/ITI) and <strong>One-Time Excellence Awards</strong>.</p>
<ul>
    <li><strong>The 90% Rule Relaxation:</strong> To claim excellence awards, a Dept employee child needs 90% and GDS child needs 80-85%. If no child scores 90%, the limit can be relaxed to 80% to fill the top 5 circle positions.</li>
    <li><strong>Notice the units:</strong> Look closely at the table! Most scholarships are "per month", but Tech Education Non-BA for Dept is <strong>₹2100 per annum</strong>, and ITI for GDS is <strong>₹1034 per annum</strong>. Examiners love testing these exceptions!</li>
</ul>
`,
    practical_example: `
<h4 style="color:#1565C0;">🎯 PRACTICAL EXAMPLES / CASE STUDY</h4>
<div style="display:flex;gap:15px;flex-direction:column;">
    <div style="background:#E1F5FE;padding:15px;border-left:4px solid #03A9F4;border-radius:6px;">
        <strong>Situation:</strong> A Departmental employee's child clears the UPSC Civil Services Preliminary exam.<br>
        <strong>Action Taken:</strong> The employee applies for the UPSC scholarship.<br>
        <strong>Outcome:</strong> A one-time grant of ₹2,000/- is sanctioned, regardless of the employee's basic pay bracket.
    </div>
    <div style="background:#F3E5F5;padding:15px;border-left:4px solid #9C27B0;border-radius:6px;">
        <strong>Situation:</strong> A physically handicapped employee buys a motorized tricycle costing ₹40,000.<br>
        <strong>Outcome:</strong> They get ₹15,000 (since 50% of cost is ₹20k, but the maximum cap is ₹15,000 from the circle welfare fund).
    </div>
</div>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ EXAM INSIGHT — MUST READ</strong>
</div>
<ul>
  <li>🔥 <strong>Most Asked Fact:</strong> RWA requires a minimum of <strong>200 members</strong> for financial assistance.</li>
  <li>🔁 <strong>Frequently Confused:</strong> UPSC grant is ₹2000 <em>without</em> any pay limit, whereas regular scholarships have a ₹65,200 pay limit.</li>
  <li>⚠️ <strong>Traps & Distinctions:</strong> Holiday Home rent is ₹60 for Pay < Level-6, and ₹150 for Pay >= Level-6.</li>
  <li>📌 <strong>One-line revision:</strong> Disabled child transport allowance: A-Class City = ₹450, Other = ₹375.</li>
</ul>

<h4 style="color:#1565C0;">🧠 KEY DISTINCTIONS (COMPULSORY)</h4>
<ul>
  <li><strong>Disabled Transport Charge is</strong> ₹450 (A-Class), <strong>whereas Hostel Subsidy is</strong> ₹300 (A-Class).</li>
  <li><strong>Excursion limit is</strong> 1000 km (one-sided), <strong>whereas two-sided limit is</strong> 200 km.</li>
</ul>

<h4 style="color:#1565C0;">📌 ULTRA-REVISION POINTS</h4>
<ul style="list-style-type:square;margin-left:20px;">
  <li>SC/ST Dept Exam Scholarship for IP/AAO: ₹2,700.</li>
  <li>Personality Development courses: Only once in entire service.</li>
  <li>Creche Max Capacity: 25 Children (26 days/month, 8 hours/day).</li>
  <li>Tailoring class teacher: ₹750/month.</li>
</ul>
`,
    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// CARD 3: CIRCLE WELFARE FUND (CWFGDS) & LOANS
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Welfare Measures: Circle Welfare Fund for GDS (CWFGDS) & PSSWB Structure",
    rule_number: "Welfare Guidelines 2025",
    act_name: "Welfare Measurement of Dept Employee and GDS",
    category: "Explanation",
    effective_date: new Date("2024-07-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #2E7D32, #4CAF50);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
    Dak Sutra — CWFGDS, Loans & Board Structure
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Dak Guru · Exam-Oriented Content</p>
</div>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">📜 OFFICIAL PROVISION</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li>The <strong>Circle Welfare Fund for Gramin Dak Sevak (CWFGDS)</strong> came into force w.e.f. <strong>01.07.2024</strong>.</li>
    <li>It is controlled by the Chief Postmaster General (CPMG), but operational power is delegated to Regional PMGs for faster decisions.</li>
    <li>It is mandatory for all <em>regularly engaged</em> GDS (substitutes are not covered).</li>
    <li>The <strong>Postal Service Staff Welfare Board (PSSWB)</strong> at the central level is chaired by the Minister of Communications.</li>
</ul>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">📊 CORE DATA: CWFGDS SUBSCRIPTION & UTILIZATION</h3>
<div style="display:flex;gap:15px;flex-wrap:wrap;margin-bottom:15px;">
    <div style="flex:1;min-width:200px;background:#E8F5E9;border:1px solid #C8E6C9;border-left:4px solid #4CAF50;border-radius:8px;padding:15px;">
        <h4 style="margin-top:0;color:#2E7D32;">Subscription & Recovery</h4>
        <p style="font-size:0.9em;margin-bottom:5px;"><strong>GDS Subscription:</strong> ₹ 40/month.</p>
        <p style="font-size:0.9em;margin-bottom:5px;"><strong>Annual Recovery:</strong> ₹ 480/- lump sum recovered in April (TRCA of March) by the <strong>Accounts Branch of HO</strong>.</p>
        <p style="font-size:0.9em;margin-bottom:0;"><strong>Central Grant in Aid:</strong> ₹ 200/- per GDS per year (from April 2025 onwards).</p>
    </div>
    <div style="flex:1;min-width:200px;background:#FFF3E0;border:1px solid #FFE0B2;border-left:4px solid #FF9800;border-radius:8px;padding:15px;">
        <h4 style="margin-top:0;color:#E65100;">Fund Utilization Limits</h4>
        <ul style="font-size:0.9em;margin-bottom:0;padding-left:20px;">
            <li><strong>Illness cases:</strong> 25%</li>
            <li><strong>Education assistance:</strong> 20%</li>
            <li><strong>Loans (first-come):</strong> 25%</li>
            <li><strong>Emergencies/Other:</strong> 30%</li>
        </ul>
    </div>
</div>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">💰 NUMERICAL DATA: REPAYABLE LOANS FOR GDS</h3>
<p style="font-size:0.9em;font-style:italic;">Interest rate is strictly <strong>5%</strong>. Max 25 monthly instalments.</p>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;margin-bottom:15px;">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:10px;text-align:left;">Purpose</th>
      <th style="padding:10px;text-align:left;">Max Sanction</th>
      <th style="padding:10px;text-align:left;">Eligibility Conditions</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;">
      <td style="padding:10px;font-weight:bold;">Construction of BO Room with flush toilet</td>
      <td style="padding:10px;">₹ 50,000</td>
      <td style="padding:10px;">Min 5 yrs service. Min 8 yrs service left (Age <= 57).</td>
    </tr>
    <tr style="border-bottom: 1px solid #C8E6C9;">
      <td style="padding:10px;font-weight:bold;">Purchase of Moped / Scooter</td>
      <td style="padding:10px;">₹ 20,000</td>
      <td style="padding:10px;">Min 5 yrs service. Min 8 yrs service left (Age <= 57).</td>
    </tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;">
      <td style="padding:10px;font-weight:bold;">Purchase of PC / Laptop</td>
      <td style="padding:10px;">₹ 20,000</td>
      <td style="padding:10px;">Min 5 yrs service. Min <strong>5 yrs</strong> service left (Age <= 60).</td>
    </tr>
    <tr>
      <td style="padding:10px;font-weight:bold;">Purchase of Mobile / Tablet</td>
      <td style="padding:10px;">₹ 10,000</td>
      <td style="padding:10px;">Min 5 yrs service. Min 8 yrs service left (Age <= 57).</td>
    </tr>
  </tbody>
</table>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">🏦 BOARD COMPOSITION & HONORARIUMS</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li><strong>Central Board (PSSWB):</strong> Chairman (Minister), Vice Chairman (Chairman PSB), Executive Vice Chairman (DG PS).</li>
    <li><strong>Circle Welfare Board:</strong> President (HoC), Vice-President (Nominated by Pres), Secretary (<strong>Welfare Officer</strong>).</li>
    <li><strong>Auditing:</strong> Done by IFA O/o CPMG within 2 months of FY end.</li>
    <li><strong>Honorarium:</strong> Treasurer (₹5000/annum), Auditor (₹1000/annum), HO Dealing Assistant (₹3000), Supervisor (₹1500).</li>
    <li><strong>Scheme Amendments:</strong> All powers regarding amendments to CWFGDS rest with the <strong>Director General Posts</strong>.</li>
</ul>
`,
    guru_explanation: `
<div style="background:#E8F5E9;border-left:5px solid #2E7D32;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#1B5E20;">📖 DAK GURU EXPLAINS (SIMPLIFIED)</strong>
</div>
<p>The CWFGDS creates a self-sustaining pool of money for GDS. Every GDS pays ₹480 a year, and the Center adds ₹200 per GDS.</p>
<ul>
    <li><strong>The Retirement Bonus:</strong> If a GDS goes their entire career (say, 45+ years) without claiming a single rupee from this fund, they receive a parting gift of <strong>₹11,000</strong> upon retirement. (Starts at ₹1,000 for 5 years).</li>
    <li><strong>Loan Trap:</strong> You can only take a loan <strong>twice</strong> in your career. Total lifetime loan ceiling is ₹50,000. If you don't produce the bill within 1 month, you get hit with a <strong>12% penal interest</strong>!</li>
</ul>
`,
    step_by_step: `
<h4 style="color:#2E7D32;">🔟 STEP-BY-STEP PROCESS: Meeting Schedule</h4>
<ol style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li><strong>Quarter 1:</strong> Applications received Jan-March are decided in <strong>April</strong>.</li>
    <li><strong>Quarter 2:</strong> Applications received April-June are decided in <strong>July</strong>.</li>
    <li><strong>Quarter 3:</strong> Applications received July-Sept are decided in <strong>October</strong>.</li>
    <li><strong>Quarter 4:</strong> Applications received Oct-Dec are decided in January.</li>
</ol>
`,
    practical_example: `
<h4 style="color:#2E7D32;">🎯 PRACTICAL EXAMPLES / CASE STUDY</h4>
<div style="display:flex;gap:15px;flex-direction:column;">
    <div style="background:#F1F8E9;padding:15px;border-left:4px solid #689F38;border-radius:6px;">
        <strong>Situation:</strong> A 59-year-old GDS applies for a ₹20,000 loan to buy a scooter.<br>
        <strong>Outcome:</strong> Rejected. Scooter loans require at least 8 years of service left (Max age 57). However, they <em>can</em> get a loan for a laptop, which only requires 5 years left (Max age 60).
    </div>
</div>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ EXAM INSIGHT — MUST READ</strong>
</div>
<ul>
  <li>🔥 <strong>Most Asked Fact:</strong> CWFGDS launched on <strong>01.07.2024</strong>. Central grant is ₹200/GDS/year.</li>
  <li>🔁 <strong>Frequently Confused:</strong> PSSWB Chairman is the <strong>Minister of Communications</strong>, NOT the DG. DG is the Executive Vice Chairman.</li>
  <li>⚠️ <strong>Traps & Distinctions:</strong> Laptop loan requires 5 years service left, all other loans (Room, Scooter, Mobile) require 8 years.</li>
  <li>📌 <strong>One-line revision:</strong> Unutilized fund payout for 30 years contribution = ₹6,500.</li>
</ul>

<h4 style="color:#2E7D32;">🧠 KEY DISTINCTIONS (COMPULSORY)</h4>
<ul>
  <li><strong>Loan limit for BO Room is</strong> ₹50,000, <strong>whereas for Laptop/Scooter it is</strong> ₹20,000.</li>
  <li><strong>Illness fund allocation is</strong> 25%, <strong>whereas Emergency reserve is</strong> 30%.</li>
</ul>

<h4 style="color:#2E7D32;">📌 ULTRA-REVISION POINTS</h4>
<ul style="list-style-type:square;margin-left:20px;">
  <li>Penal interest for missing bill: 12% p.a.</li>
  <li>Loan interest rate: 5% flat.</li>
  <li>Max instalments: 25 months.</li>
  <li>Auditor Honorarium: ₹1000/annum.</li>
</ul>
`,
    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
}

]; // end entries

async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db();
        const col = db.collection('daksutras');

        let inserted = 0;
        let updated = 0;

        for (const entry of entries) {
            const exists = await col.findOne({ title: entry.title });
            if (exists) {
                await col.updateOne({ title: entry.title }, { $set: entry });
                console.log(`🔄 Updated existing card: ${entry.title}`);
                updated++;
            } else {
                await col.insertOne(entry);
                console.log(`✅ Inserted new card: ${entry.title}`);
                inserted++;
            }
        }
        console.log(`\n🎉 Done! ${inserted} new inserted, ${updated} updated out of ${entries.length} total.`);
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();
    }
}

main();
