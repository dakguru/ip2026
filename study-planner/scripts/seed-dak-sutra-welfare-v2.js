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
// CARD 1: Welfare Measures: Departmental Employee Welfare Schemes & Framework
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Welfare Measures: Departmental Employee Welfare Schemes & Framework",
    rule_number: "O.M. No. 1-01/2024-Wl&Sps dt. 22.12.2025",
    act_name: "Welfare Measures for Dept Employees & GDS",
    category: "Explanation",
    effective_date: new Date("2025-12-22"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #B71C1C, #D32F2F);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    Dak Sutra — Departmental Employee Welfare Schemes & Framework
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Dak Guru · Premium Content</p>
</div>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">🏛️ Welfare Framework</h3>
<div style="overflow-x:auto;">
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Point</th>
      <th style="padding:12px;text-align:left;">Departmental Employees</th>
      <th style="padding:12px;text-align:left;">Gramin Dak Sevaks (GDS)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Governing Fund</td>
      <td style="padding:12px;">Circle Welfare Fund / Central Welfare Fund</td>
      <td style="padding:12px;">Circle Welfare Fund for Gramin Dak Sevaks (CWFGDS)</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Character</td>
      <td style="padding:12px;">Non-contributory for individual employee</td>
      <td style="padding:12px;">Contributory</td>
    </tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Individual subscription</td>
      <td style="padding:12px;">Nil</td>
      <td style="padding:12px;">₹40 p.m. / ₹480 p.a.</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Central assistance</td>
      <td style="padding:12px;">Central Welfare Fund</td>
      <td style="padding:12px;">₹200 per GDS per year</td>
    </tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Repayable loan</td>
      <td style="padding:12px;">Not part of this scheme</td>
      <td style="padding:12px;">Available</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Retirement benefit for non-claimants</td>
      <td style="padding:12px;">Not available</td>
      <td style="padding:12px;">Available</td>
    </tr>
    <tr style="background:#FFEBEE;">
      <td style="padding:12px;font-weight:700;">Main final authority</td>
      <td style="padding:12px;">Head of Circle</td>
      <td style="padding:12px;">Head of Region for Regional cases; Head of Circle is coordinating/final Circle authority</td>
    </tr>
  </tbody>
</table>
</div>
<div style="background:#FFF9C4;border-left:4px solid #FBC02D;padding:12px;border-radius:6px;margin-bottom:20px;">
  <strong style="color:#F57F17;">Note:</strong> GDS welfare stream separated from departmental employees through letter dated <strong>17.09.2013</strong>.
</div>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">🏢 PSSWB Structure</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Position</th>
      <th style="padding:12px;text-align:left;">Held by</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Chairman</td><td style="padding:12px;">Hon'ble Minister of Communications</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Vice-Chairman</td><td style="padding:12px;">Chairman, Postal Services Board</td></tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Executive Vice-Chairman</td><td style="padding:12px;">Director General (Postal Services)</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Secretary</td><td style="padding:12px;">Director (Welfare & Sports), Postal Directorate</td></tr>
    <tr style="background:#FFEBEE;"><td style="padding:12px;font-weight:700;">Members</td><td style="padding:12px;">Directorate/Circle representatives, recognised unions/federations and nominated cadre representatives</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;color:#424242;">13th PSSWB meeting held on 11.11.2025. Departmental welfare revisions conveyed through O.M. No. 1-01/2024-Wl&Sps dated 22.12.2025, effective from <strong>01.04.2026</strong>.</p>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">📍 Circle Welfare Board</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Position</th>
      <th style="padding:12px;text-align:left;">Authority</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">President</td><td style="padding:12px;">Head of Circle / CPMG</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Vice-President</td><td style="padding:12px;">Officer nominated by President</td></tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Secretary</td><td style="padding:12px;">Welfare Officer of Circle</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Members</td><td style="padding:12px;">Circle Office officers + recognised service-union representatives</td></tr>
  </tbody>
</table>
<div style="background:#E3F2FD;border-left:4px solid #1E88E5;padding:12px;border-radius:6px;margin-bottom:20px;">
  <strong>Note:</strong> Welfare Fund and Sports Fund are distinct funds.
</div>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">☠️ Death Assistance — Departmental Employees (w.e.f. 01.04.2026)</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Situation</th>
      <th style="padding:12px;text-align:left;">Old</th>
      <th style="padding:12px;text-align:left;">Current</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Immediate death relief</td>
      <td style="padding:12px;">₹10,000</td>
      <td style="padding:12px;font-weight:bold;color:#C62828;">₹25,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Accident while on duty</td>
      <td style="padding:12px;">₹15,000</td>
      <td style="padding:12px;font-weight:bold;color:#C62828;">₹35,000</td>
    </tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Attack by robbers/terrorists while on duty</td>
      <td style="padding:12px;">₹75,000</td>
      <td style="padding:12px;font-weight:bold;color:#C62828;">₹1,10,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Such attack while not on duty</td>
      <td style="padding:12px;">₹15,000</td>
      <td style="padding:12px;font-weight:bold;color:#C62828;">₹35,000</td>
    </tr>
  </tbody>
</table>
<div style="background:#FFF3E0;border-left:4px solid #F57C00;padding:12px;border-radius:6px;margin-bottom:20px;">
  <strong>Exam Trap ⚠️:</strong> ₹35,000 has two uses — Accidental death on duty AND Attack while not on duty.<br>
  For attack while on duty, GDS receives ₹1,65,000 (higher than departmental ₹1,10,000).
</div>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">⚕️ Illness, Calamity & Special Assistance</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Benefit</th>
      <th style="padding:12px;text-align:left;">Departmental</th>
      <th style="padding:12px;text-align:left;">GDS</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Natural calamity/fire/flood</td>
      <td style="padding:12px;">₹4,500</td>
      <td style="padding:12px;font-weight:bold;color:#2E7D32;">₹5,500</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">Serious illness/major surgery</td>
      <td style="padding:12px;">₹15,000</td>
      <td style="padding:12px;font-weight:bold;color:#2E7D32;">₹30,000</td>
    </tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">TB diet, indoor</td>
      <td style="padding:12px;">₹400 p.m.</td>
      <td style="padding:12px;font-weight:bold;color:#2E7D32;">₹440 p.m.</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFCDD2;">
      <td style="padding:12px;font-weight:700;">TB diet, outdoor</td>
      <td style="padding:12px;">₹200 p.m.</td>
      <td style="padding:12px;font-weight:bold;color:#2E7D32;">₹220 p.m.</td>
    </tr>
    <tr style="background:#FFEBEE;">
      <td style="padding:12px;font-weight:700;">Maximum TB period</td>
      <td style="padding:12px;">6 months</td>
      <td style="padding:12px;">6 months</td>
    </tr>
  </tbody>
</table>
<p style="font-size:0.95em;">Serious illness includes cancer, brain haemorrhage, kidney failure/transplant, heart surgery.</p>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">💊 Departmental EOL/HPL Assistance</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Leave</th>
      <th style="padding:12px;text-align:left;">Assistance</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Extraordinary Leave (EOL)</td><td style="padding:12px;">₹1,500 p.m.</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Half Pay Leave (HPL)</td><td style="padding:12px;">₹750 p.m.</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;">Conditions: disease > 2 months old; up to 36 months; renewable at 6-month intervals.</p>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">🦽 Mobility Aids</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Facility</th>
      <th style="padding:12px;text-align:left;">Assistance</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Mechanical/motorised tricycle</td><td style="padding:12px;">₹15,000 or 50% of cost, whichever is less</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Artificial limb/wheelchair/orthopaedic tricycle</td><td style="padding:12px;">75% of cost, max ₹2,000</td></tr>
    <tr style="background:#FFEBEE;"><td style="padding:12px;font-weight:700;">Journey to artificial-limb centre</td><td style="padding:12px;">Second-class rail fare</td></tr>
  </tbody>
</table>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">👨‍🦽 Specially Abled Children</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFCDD2;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#D32F2F;color:#fff;">
      <th style="padding:12px;text-align:left;">Benefit</th>
      <th style="padding:12px;text-align:left;">Current Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Scholarship</td><td style="padding:12px;">₹750 p.m.</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Transport, 'A' Class city</td><td style="padding:12px;">₹450 p.m.</td></tr>
    <tr style="background:#FFEBEE;border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Transport, other city</td><td style="padding:12px;">₹375 p.m.</td></tr>
    <tr style="border-bottom: 1px solid #FFCDD2;"><td style="padding:12px;font-weight:700;">Hostel/mess, 'A' Class city</td><td style="padding:12px;">₹300 p.m.</td></tr>
    <tr style="background:#FFEBEE;"><td style="padding:12px;font-weight:700;">Hostel/mess, other city</td><td style="padding:12px;">₹250 p.m.</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;">Max 8 years, not more than twice for same class, disability 40%+, for totally blind/deaf-dumb no percentage limit, Classes 1-12, basic pay ceiling ₹77,900.</p>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">🏢 Organisational Welfare</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
  <li><strong>CPLO:</strong> Central ₹35,000 p.a., Circle ₹25,000 p.a.</li>
  <li><strong>Recreation Clubs:</strong> ₹25 per head p.a. + matching grant up to ₹25 per head, max ₹25,000/club.</li>
  <li><strong>RWA:</strong> ₹45 per residential quarter p.a.</li>
  <li><strong>Crèche:</strong> age 6 months-10 years, max 2 children, capacity 1-25, 26 days/month, 8 hours/day, initial grant ₹60,000, subsequent ₹20,000/3 years, recurring ₹1,500/child/month max ₹38,000.</li>
</ul>

<h3 style="color:#C62828;border-bottom:2px solid #FFCDD2;padding-bottom:6px;margin-top:24px;">🚌 Excursion Trips & Holiday Homes</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
  <li><strong>Excursion Trips:</strong> 1,000 km one-sided once a year OR 200 km one-sided twice a year. Travel subsidy 75%, basic pay up to ₹65,200.</li>
  <li><strong>Holiday Homes Rent:</strong> Basic ≤₹35,400 = ₹60/day; Above ₹35,400 = ₹150/day.</li>
  <li><strong>Holiday Homes Furnishing:</strong> Common room ₹1,00,000; Each suite ₹75,000; Petty replacements ₹7,500.</li>
</ul>
`,
    guru_explanation: `
<div style="background:#FFEBEE;border-left:5px solid #D32F2F;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#B71C1C;">📖 DAK GURU EXPLAINS (SIMPLIFIED)</strong>
</div>
<ul style="padding-left: 20px;">
  <li>The Department has two parallel welfare systems separated since <strong>17.09.2013</strong>.</li>
  <li>Departmental = non-contributory, GDS = contributory (₹40/month).</li>
  <li>13th PSSWB met on 11.11.2025, revisions effective from <strong>01.04.2026</strong>.</li>
  <li><strong>₹35,000</strong> appears twice in death assistance (accident on duty AND attack off duty).</li>
  <li>GDS gets <strong>MORE</strong> than departmental in 4 areas: attack on duty, natural calamity, major surgery, TB diet.</li>
  <li>Transport ≠ Hostel for specially abled children.</li>
  <li>ITI scholarship is per annum, rest are per month.</li>
</ul>
`,
    practical_example: `
<h4 style="color:#B71C1C;">🎯 PRACTICAL EXAMPLES / CASE STUDY</h4>
<div style="display:flex;gap:15px;flex-direction:column;">
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #D32F2F;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 1:</strong> Departmental employee dies in accident while on duty → ₹35,000 (not ₹25,000, not ₹1,10,000)
  </div>
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #D32F2F;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 2:</strong> Dept employee's daughter joins B.Sc. with 58% in Class 12 → ₹375 p.m. (minimum percentage removed)
  </div>
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #D32F2F;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 3:</strong> Employee claims ₹450 for hostel for specially abled child in 'A' Class city → Wrong. ₹450 is transport; hostel is ₹300.
  </div>
</div>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ EXAM INSIGHT — MUST READ</strong>
</div>
<ul style="padding-left: 20px;">
  <li><strong>1 April 2026</strong> dividing date.</li>
  <li>90% in ALL subjects for academic excellence.</li>
  <li>GDS beats departmental only in limited heads.</li>
  <li>Transport ₹450/₹375 ≠ Hostel ₹300/₹250.</li>
  <li>ITI = per annum.</li>
  <li>Non-technical dept scholarship = girl students only.</li>
  <li>SC/ST → SC/ST/OBC.</li>
  <li>Excursion = 1,000 km once OR 200 km twice.</li>
</ul>

<h4 style="color:#B71C1C;">📌 ULTRA-REVISION CHAINS</h4>
<ul style="list-style-type:square;margin-left:20px;color:#333;">
  <li><strong>25K–35K–110K–35K</strong> = dept death rates</li>
  <li><strong>15K/30K</strong> = dept/GDS surgery</li>
  <li><strong>1500/1200/450/375/2100 p.a.</strong> = dept education</li>
  <li><strong>9000/7200/6300/5400/4500</strong> = academic excellence</li>
  <li><strong>2700/1800/1350</strong> = IPO-AAO/JA-UDC/PA-SA scholarship</li>
  <li><strong>60/150</strong> = Holiday Home rent</li>
  <li><strong>1000 km once / 200 km twice / 75%</strong> = excursion</li>
</ul>
`,
    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// CARD 2: Welfare Measures: CWFGDS — Membership, Grants & GDS Benefits
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Welfare Measures: CWFGDS — Membership, Grants & GDS Benefits",
    rule_number: "O.M. No. 20-09/2019-WL & Sports dt. 11.02.2026",
    act_name: "Welfare Measures for Dept Employees & GDS",
    category: "Explanation",
    effective_date: new Date("2026-02-11"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #1565C0, #0D47A1);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    Dak Sutra — CWFGDS: Membership, Grants & GDS Benefits
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Dak Guru · Premium Content</p>
</div>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">📜 Governing Provision & Membership</h3>
<p>Current instrument: <strong>O.M. No. 20-09/2019-WL & Sports dated 11.02.2026</strong>, superseded O.M. dated 11.09.2024. CWFGDS controlled by CPMG. Regional shares operated by Regional PMGs but ONE Circle Fund.</p>
<p><strong>Who is covered:</strong> All regularly engaged serving GDS. NOT substitute GDS or provisionally engaged GDS. GDS under put off duty may continue membership. Membership ceases at 65 years.</p>

<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#1976D2;color:#fff;">
      <th style="padding:12px;text-align:left;">Situation</th>
      <th style="padding:12px;text-align:left;">Consequence</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Non-recovery for administrative reason</td><td style="padding:12px;">Later recovery, no interest</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Fault attributable to GDS</td><td style="padding:12px;">Penal interest ₹1 per month per instalment</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:12px;font-weight:700;color:#D32F2F;">6 months continuous without valid reason</td><td style="padding:12px;font-weight:bold;color:#D32F2F;">Membership terminated</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;">If discharged due to reduction of posts, benefit continues up to 1 year if contribution continues.</p>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">💰 Subscription & Finance</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#1976D2;color:#fff;">
      <th style="padding:12px;text-align:left;">Particular</th>
      <th style="padding:12px;text-align:left;">Provision</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Monthly subscription</td><td style="padding:12px;">₹40</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Annual subscription</td><td style="padding:12px;">₹480</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Recovery</td><td style="padding:12px;">One lump sum in April from March TRCA</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">New entrant</td><td style="padding:12px;">₹40/month proportionately to FY end</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Refund</td><td style="padding:12px;">Normally no refund</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Wrong/mistaken recovery</td><td style="padding:12px;">May be refunded</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:12px;font-weight:700;">Central grant-in-aid</td><td style="padding:12px;font-weight:bold;">₹200 per GDS per year</td></tr>
  </tbody>
</table>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">📋 Nomination & Application Process</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
  <li>Nomination at engagement remains valid unless revised.</li>
  <li>GDS with family → only family member; No family → any person.</li>
  <li>On acquiring family → earlier nomination invalid.</li>
  <li>No nomination + no unanimous family → equal shares.</li>
  <li>Minor nominee → surviving parent with custody or de-facto guardian.</li>
</ul>
<p><strong>Application Process:</strong> 10-step process from Form-I to payment. Scrutiny Committee = at least 3 officers. Priority = first come first served.</p>

<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#1976D2;color:#fff;">
      <th style="padding:12px;text-align:left;">Applications Received</th>
      <th style="padding:12px;text-align:left;">Decided in</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Jan-Mar</td><td style="padding:12px;">April</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Apr-Jun</td><td style="padding:12px;">July</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Jul-Sep</td><td style="padding:12px;">October</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;font-weight:700;">Oct-Dec</td><td style="padding:12px;font-weight:bold;color:#1565C0;">January</td></tr>
  </tbody>
</table>
<div style="background:#FFF9C4;border-left:4px solid #FBC02D;padding:12px;border-radius:6px;margin-bottom:20px;">
  <strong>Exceptions:</strong> ₹11,000 immediate death relief + ₹5,500 funeral may be released immediately by Divisional Heads.
</div>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">💎 14 Heads of GDS Financial Grant</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#1976D2;color:#fff;">
      <th style="padding:12px;text-align:left;">No.</th>
      <th style="padding:12px;text-align:left;">Benefit</th>
      <th style="padding:12px;text-align:left;">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">1</td><td style="padding:12px;font-weight:700;">Immediate assistance after death</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹11,000</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">2</td><td style="padding:12px;font-weight:700;">Terrorist/extremist death ON DUTY</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹1,65,000</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">3</td><td style="padding:12px;font-weight:700;">Terrorist/extremist death NOT ON DUTY</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹13,200</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">4</td><td style="padding:12px;font-weight:700;">Accidental death ON DUTY</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹27,500</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">5</td><td style="padding:12px;font-weight:700;">Funeral expenses</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹5,500</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">6</td><td style="padding:12px;font-weight:700;">Major surgery</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹30,000 (w.e.f. 01.04.2026)</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">7</td><td style="padding:12px;font-weight:700;">On-duty accident hospitalisation >3 days</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹5,500</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">8</td><td style="padding:12px;font-weight:700;">TB nutritional assistance</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹440 indoor / ₹220 outdoor p.m.</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">9</td><td style="padding:12px;font-weight:700;">Educational scholarship</td><td style="padding:12px;">Prescribed course-wise rates</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">10</td><td style="padding:12px;font-weight:700;">Academic excellence</td><td style="padding:12px;">₹1,100/880/770/660/550</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">11</td><td style="padding:12px;font-weight:700;">Differently abled child scholarship</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹220 p.m.</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">12</td><td style="padding:12px;font-weight:700;text-decoration:line-through;color:#757575;">Maternity grant</td><td style="padding:12px;font-weight:bold;color:#D32F2F;">DELETED</td></tr>
    <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">13</td><td style="padding:12px;font-weight:700;">Natural calamity</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹5,500</td></tr>
    <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:12px;">14</td><td style="padding:12px;font-weight:700;">COVID assistance</td><td style="padding:12px;font-weight:bold;color:#1565C0;">₹50,000</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;">Head 12 deleted because overridden by separate GDS establishment provision. Once-only rule with exceptions for natural calamity and major surgery.</p>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">⚕️ Detailed GDS Health Assistance</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
  <li><strong>Serious Illness/Surgery:</strong> PMG/CPMG may sanction up to ₹30,000. ₹5,500 for on-duty accident with hospitalisation <strong>>3 days</strong>. Not medical reimbursement.</li>
  <li><strong>TB Assistance:</strong> Indoor ₹440 p.m., Outdoor ₹220 p.m., max 6 months, min 6 years service, Govt Hospital/TB sanatorium, within 3 months of detection, <strong>self only</strong>. (Distinction: Dept TB = employee + family. GDS TB = self only).</li>
</ul>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">🎓 Educational Scholarship & Academic Excellence</h3>
<div style="display:flex;gap:15px;flex-wrap:wrap;margin-bottom:15px;">
    <div style="flex:1;min-width:300px;">
        <table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;border-radius: 8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <thead>
            <tr style="background:#1976D2;color:#fff;">
              <th style="padding:8px;text-align:left;">Course</th>
              <th style="padding:8px;text-align:left;">Rate</th>
              <th style="padding:8px;text-align:left;">Min Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">IIT/AIIMS/IIM</td><td style="padding:8px;font-weight:bold;">₹1,100 p.m.</td><td style="padding:8px;">No minimum</td></tr>
            <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">Technical Degree</td><td style="padding:8px;font-weight:bold;">₹308 p.m.</td><td style="padding:8px;">85%</td></tr>
            <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">Technical Diploma</td><td style="padding:8px;font-weight:bold;">₹209 p.m.</td><td style="padding:8px;">85%</td></tr>
            <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">Non-tech Degree</td><td style="padding:8px;font-weight:bold;">₹165 p.m.</td><td style="padding:8px;">80%</td></tr>
            <tr style="background:#E3F2FD;"><td style="padding:8px;">ITI</td><td style="padding:8px;font-weight:bold;color:#D32F2F;">₹1,034 p.a.</td><td style="padding:8px;">65%</td></tr>
          </tbody>
        </table>
    </div>
    <div style="flex:1;min-width:200px;">
        <table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #BBDEFB;border-radius: 8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <thead>
            <tr style="background:#0D47A1;color:#fff;">
              <th style="padding:8px;text-align:left;">Group</th>
              <th style="padding:8px;text-align:left;">Min Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">Class 10</td><td style="padding:8px;font-weight:bold;">85%</td></tr>
            <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">Class 12 Science</td><td style="padding:8px;font-weight:bold;">85%</td></tr>
            <tr style="background:#E3F2FD;border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">Class 12 Commerce</td><td style="padding:8px;font-weight:bold;">80%</td></tr>
            <tr style="border-bottom: 1px solid #BBDEFB;"><td style="padding:8px;">Class 12 Humanities</td><td style="padding:8px;font-weight:bold;">80%</td></tr>
          </tbody>
        </table>
    </div>
</div>
<p style="font-size:0.95em;">Renewal needs 50%. IIT/IIM/AIIMS exempt from marks for continuation. Fail = stopped (can revive). Detention = discontinued altogether. Max 2 children per GDS. Education cannot exceed 20% of fund.</p>
<p style="font-size:0.95em;">Merit to two decimal places. Tied students all receive award. Awards finalised before 30 September. Award chain: ₹1,100 → ₹880 → ₹770 → ₹660 → ₹550.</p>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">🌪️ Natural Calamity & Abled Children</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
  <li><strong>Differently Abled Children:</strong> ₹220 p.m., max 8 years, not more than twice for same class, 40% disability, blind/deaf/dumb no percentage threshold.</li>
  <li><strong>Natural Calamity:</strong> ₹5,500. Actual damage required. State Govt must declare area. Form-IV. 3 months from Govt Order. False declaration → disciplinary action.</li>
</ul>
`,
    guru_explanation: `
<div style="background:#E3F2FD;border-left:5px solid #1565C0;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#0D47A1;">📖 DAK GURU EXPLAINS (SIMPLIFIED)</strong>
</div>
<ul style="padding-left: 20px;">
  <li>CWFGDS is the contributory welfare mechanism for GDS.</li>
  <li>Current scheme commenced <strong>11.02.2026</strong>, NOT 01.07.2024.</li>
  <li>Head 12 (maternity) is <strong>DELETED</strong>.</li>
  <li>Accident hospitalisation must exceed 3 days (exactly 3 = no grant).</li>
  <li>GDS TB = self only (vs dept = employee + family).</li>
  <li>Failure vs detention: different consequences for scholarship.</li>
  <li>Academic merit = two decimal places.</li>
</ul>
`,
    practical_example: `
<h4 style="color:#1565C0;">🎯 PRACTICAL EXAMPLES / CASE STUDY</h4>
<div style="display:flex;gap:15px;flex-direction:column;">
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #1565C0;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 1:</strong> GDS hospitalised exactly 3 days → no ₹5,500 (needs MORE than 3 days).
  </div>
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #1565C0;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 2:</strong> GDS son gets 47% in technical course → scholarship stopped, can revive at 50%. If detained, discontinued.
  </div>
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #1565C0;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 3:</strong> GDS in flood-declared area but no actual property damage → no assistance.
  </div>
</div>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ EXAM INSIGHT — MUST READ</strong>
</div>
<ul style="padding-left: 20px;">
  <li>CWFGDS commencement = <strong>11.02.2026</strong>.</li>
  <li>Subscription = ₹40 p.m.; ₹480 p.a.</li>
  <li>Grant-in-aid = ₹200/GDS/year.</li>
  <li>6 months without subscription = membership termination.</li>
  <li>Head 12 = deleted maternity.</li>
  <li>>3 days hospitalisation.</li>
  <li>GDS TB = self only.</li>
  <li>Fail vs detention different consequences.</li>
  <li>Merit list = two decimal places.</li>
  <li>Natural calamity application = 3 months.</li>
</ul>

<h4 style="color:#1565C0;">📌 ULTRA-REVISION</h4>
<ul style="list-style-type:square;margin-left:20px;color:#333;">
  <li><strong>11K–165K–13.2K–27.5K–5.5K</strong> = GDS death/funeral chain</li>
  <li><strong>30K</strong> = major surgery</li>
  <li><strong>440/220</strong> = TB</li>
  <li><strong>1100/308/209/165/1034 p.a.</strong> = scholarship</li>
  <li><strong>1100/880/770/660/550</strong> = merit</li>
  <li><strong>85/85/80/80</strong> = Class 10/XII Sci/Commerce/Humanities</li>
</ul>
`,
    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// CARD 3: Welfare Measures: GDS Loans, Fund Management & Master Comparison
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Welfare Measures: GDS Loans, Fund Management & Master Comparison",
    rule_number: "O.M. No. 20-09/2019-WL & Sports dt. 11.02.2026",
    act_name: "Welfare Measures for Dept Employees & GDS",
    category: "Explanation",
    effective_date: new Date("2026-02-11"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #2E7D32, #4CAF50);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
    Dak Sutra — GDS Loans, Fund Management & Comparison
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Dak Guru · Premium Content</p>
</div>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">💳 Repayable Loans</h3>
<p>Max ₹1,00,000 at simple interest.</p>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:12px;text-align:left;">Purpose</th>
      <th style="padding:12px;text-align:left;">Maximum</th>
      <th style="padding:12px;text-align:left;">Interest</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">BO room with flush toilet</td><td style="padding:12px;font-weight:bold;">₹50,000</td><td style="padding:12px;">5%</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Computer/laptop</td><td style="padding:12px;font-weight:bold;">₹20,000</td><td style="padding:12px;">5%</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Moped/scooter/motorcycle</td><td style="padding:12px;font-weight:bold;">₹20,000</td><td style="padding:12px;">5%</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Electric two-wheeler</td><td style="padding:12px;font-weight:bold;color:#2E7D32;">₹50,000 OR 80% of cost, whichever is less</td><td style="padding:12px;font-weight:bold;color:#2E7D32;">3%</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:12px;font-weight:700;">Mobile/tablet</td><td style="padding:12px;font-weight:bold;">₹15,000</td><td style="padding:12px;">5%</td></tr>
  </tbody>
</table>
<div style="background:#FFF3E0;border-left:4px solid #F57C00;padding:12px;border-radius:6px;margin-bottom:20px;">
  <strong>EV Trap ⚠️:</strong> If EV costs ₹50,000, 80% = ₹40,000, so eligible loan = ₹40,000.
</div>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">⏳ Service Left + Instalments + Surety</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:12px;text-align:left;">Loan</th>
      <th style="padding:12px;text-align:left;">Service Left</th>
      <th style="padding:12px;text-align:left;">Repayment</th>
      <th style="padding:12px;text-align:left;">Surety</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">BO room</td><td style="padding:12px;">8 years; age ≤57</td><td style="padding:12px;font-weight:bold;">56 × ₹1,000</td><td style="padding:12px;">2 permanent regular departmental officials with >6 years service left</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Computer</td><td style="padding:12px;">5 years; age ≤60</td><td style="padding:12px;font-weight:bold;">21 × ₹1,000</td><td style="padding:12px;">2 GDS with >5 years left</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Ordinary two-wheeler</td><td style="padding:12px;">5 years; age ≤60</td><td style="padding:12px;font-weight:bold;">21 × ₹1,000</td><td style="padding:12px;">2 GDS with >5 years left</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Electric vehicle</td><td style="padding:12px;">5 years; age ≤60</td><td style="padding:12px;font-weight:bold;">Max 50 EMIs</td><td style="padding:12px;">2 GDS with >5 years left</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:12px;font-weight:700;">Mobile/tablet</td><td style="padding:12px;">5 years; age ≤60</td><td style="padding:12px;font-weight:bold;">21 EMIs</td><td style="padding:12px;">2 GDS with >5 years left</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;">Instalment sequence: <strong>56–21–21–50 max–21</strong>. BO room = 8 years + departmental sureties. All others = 5 years + GDS sureties.</p>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">📑 Loan Conditions & Recovery</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
  <li><strong>BO Room:</strong> Only BPM/GDSSPM eligible. New construction only. Land in BPM's name. Loan cannot purchase land. Construction within 6 months. PMG may extend 1 month; further by Head of Circle.</li>
  <li><strong>Vehicle/Equipment:</strong> New items only. Vehicle within 1 month. Written dealer assurance. Mobile bill in GDS name. No sale before repayment. Penal interest <strong>12% p.a.</strong></li>
  <li><strong>Not Sanctioned If:</strong> Put off duty, disciplinary action pending, criminal case pending, insolvency. Max 2 loans in career, overall ceiling ₹1,00,000, previous loan fully repaid first.</li>
</ul>

<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:12px;text-align:left;">Event</th>
      <th style="padding:12px;text-align:left;">Recovery</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Resignation</td><td style="padding:12px;">Adjust TRCA; remaining from surety</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Medical invalidation</td><td style="padding:12px;">May adjust from ex-gratia gratuity</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Retirement/default</td><td style="padding:12px;">From gratuity and/or sureties</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Death</td><td style="padding:12px;">From sums due to nominee; balance from sureties</td></tr>
  </tbody>
</table>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">🎁 Retirement Benefit for Non-Claimants</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:12px;text-align:left;">Contribution Service</th>
      <th style="padding:12px;text-align:left;">Payment</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">Less than 5 years</td><td style="padding:12px;">Nil</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">5 years</td><td style="padding:12px;">₹1,000</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">10 years</td><td style="padding:12px;">₹2,000</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">15 years</td><td style="padding:12px;">₹3,000</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">20 years</td><td style="padding:12px;">₹4,500</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">25 years</td><td style="padding:12px;">₹5,500</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">30 years</td><td style="padding:12px;">₹6,500</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">35 years</td><td style="padding:12px;">₹8,000</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">40 years</td><td style="padding:12px;">₹9,000</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">More than 45 years</td><td style="padding:12px;font-weight:bold;color:#2E7D32;">₹11,000</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;">Note: "more than 45 years", not exactly 45.</p>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">📊 Fund Utilisation & Administration</h3>
<p>Calculated on balance as on 1 April:</p>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
  <li><strong>Illness (Heads 6,7,8,14):</strong> 25%</li>
  <li><strong>Education (Heads 9,10,11):</strong> 20%</li>
  <li><strong>Loans (Para 15):</strong> 25% ordinarily (Up to 40% if corpus ≥₹50 lakh)</li>
  <li><strong>Other welfare + emergency:</strong> Remaining balance</li>
</ul>

<div style="display:flex;gap:15px;flex-wrap:wrap;margin-bottom:15px;">
    <div style="flex:1;min-width:250px;">
        <table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <thead>
            <tr style="background:#388E3C;color:#fff;"><th style="padding:8px;text-align:left;">Functionary</th><th style="padding:8px;text-align:left;">Annual Amount</th></tr>
          </thead>
          <tbody>
            <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Treasurer</td><td style="padding:8px;font-weight:bold;">₹5,000</td></tr>
            <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Auditor</td><td style="padding:8px;font-weight:bold;">₹1,000</td></tr>
            <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Dealing Assistant, HO</td><td style="padding:8px;font-weight:bold;">₹3,000</td></tr>
            <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Supervisor, HO</td><td style="padding:8px;font-weight:bold;">₹1,500</td></tr>
          </tbody>
        </table>
    </div>
    <div style="flex:1;min-width:250px;">
        <table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <thead>
            <tr style="background:#388E3C;color:#fff;"><th style="padding:8px;text-align:left;">Audit Requirement</th><th style="padding:8px;text-align:left;">Deadline</th></tr>
          </thead>
          <tbody>
            <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Regional PMG → CPMG</td><td style="padding:8px;font-weight:bold;">15 April</td></tr>
            <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Internal audit</td><td style="padding:8px;">Within 2 months after FY</td></tr>
            <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Auditor's report</td><td style="padding:8px;">Within 3 months after FY</td></tr>
            <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:8px;">Annual Fund audit</td><td style="padding:8px;font-weight:bold;">On/before 30 June</td></tr>
            <tr style="background:#E8F5E9;"><td style="padding:8px;">Audit certificate to Directorate</td><td style="padding:8px;">Within 1 month of audit</td></tr>
          </tbody>
        </table>
    </div>
</div>
<p style="font-size:0.95em;">Surplus funds: only in Government financial institutions or nationalised banks.</p>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">📝 Seven Forms</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:12px;text-align:left;">Form</th>
      <th style="padding:12px;text-align:left;">Annexure</th>
      <th style="padding:12px;text-align:left;">Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">Form-I</td><td style="padding:12px;">C</td><td style="padding:12px;">Joining CWFGDS</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">Form-II</td><td style="padding:12px;">D</td><td style="padding:12px;">Financial assistance</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">Form-III</td><td style="padding:12px;">E</td><td style="padding:12px;">Illness beyond PMG/CPMG → Directorate</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">Form-IV</td><td style="padding:12px;">F</td><td style="padding:12px;">Natural calamity</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">Form-V</td><td style="padding:12px;">G</td><td style="padding:12px;">BO-room construction loan</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;">Form-VI</td><td style="padding:12px;">H</td><td style="padding:12px;">Surety Bond</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:12px;">Form-VII</td><td style="padding:12px;">I</td><td style="padding:12px;">Vehicle/computer/mobile/tablet loans</td></tr>
  </tbody>
</table>
<p style="font-size:0.95em;">Memory trick: <strong>I Join → II Assistance → III Directorate → IV Calamity → V BO Room → VI Surety → VII Other Loans</strong></p>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">🏆 Master Comparison — Departmental vs GDS</h3>
<div style="overflow-x:auto;">
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:12px;text-align:left;">Benefit</th>
      <th style="padding:12px;text-align:left;">Departmental</th>
      <th style="padding:12px;text-align:left;">GDS</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Immediate death</td><td style="padding:12px;">₹25,000</td><td style="padding:12px;">₹11,000</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Attack on duty</td><td style="padding:12px;">₹1,10,000</td><td style="padding:12px;font-weight:bold;background:#C8E6C9;">₹1,65,000</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Attack off duty</td><td style="padding:12px;">₹35,000</td><td style="padding:12px;">₹13,200</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Accident on duty death</td><td style="padding:12px;">₹35,000</td><td style="padding:12px;">₹27,500</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Funeral</td><td style="padding:12px;">—</td><td style="padding:12px;">₹5,500</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Natural calamity</td><td style="padding:12px;">₹4,500</td><td style="padding:12px;font-weight:bold;background:#C8E6C9;">₹5,500</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Major surgery</td><td style="padding:12px;">₹15,000</td><td style="padding:12px;font-weight:bold;background:#C8E6C9;">₹30,000</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">TB indoor</td><td style="padding:12px;">₹400</td><td style="padding:12px;font-weight:bold;background:#C8E6C9;">₹440</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">TB outdoor</td><td style="padding:12px;">₹200</td><td style="padding:12px;font-weight:bold;background:#C8E6C9;">₹220</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Special-child scholarship</td><td style="padding:12px;">₹750</td><td style="padding:12px;">₹220</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">IIT/AIIMS/IIM</td><td style="padding:12px;">₹1,500</td><td style="padding:12px;">₹1,100</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Technical degree</td><td style="padding:12px;">₹1,200</td><td style="padding:12px;">₹308</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Technical diploma</td><td style="padding:12px;">₹450</td><td style="padding:12px;">₹209</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">ITI</td><td style="padding:12px;">₹2,100 p.a.</td><td style="padding:12px;">₹1,034 p.a.</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Loan</td><td style="padding:12px;">—</td><td style="padding:12px;">Up to ₹1 lakh</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:700;">Subscription</td><td style="padding:12px;">Nil</td><td style="padding:12px;">₹40 p.m.</td></tr>
  </tbody>
</table>
</div>

<h3 style="color:#2E7D32;border-bottom:2px solid #C8E6C9;padding-bottom:6px;margin-top:24px;">📅 Important Dates</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #C8E6C9;border-radius: 8px;overflow:hidden;margin-bottom:15px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background:#388E3C;color:#fff;">
      <th style="padding:12px;text-align:left;">Date</th>
      <th style="padding:12px;text-align:left;">Significance</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">17.09.2013</td><td style="padding:12px;">GDS welfare stream bifurcated</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">22.08.2017</td><td style="padding:12px;">12th PSSWB meeting</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">31.01.2018</td><td style="padding:12px;">Previous general welfare revision</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">27.06.2018</td><td style="padding:12px;">GDS maternity provision overriding Welfare Fund</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">15.09.2021</td><td style="padding:12px;">₹50,000 GDS COVID assistance order</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">11.09.2024</td><td style="padding:12px;">Now-superseded CWFGDS</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">11.11.2025</td><td style="padding:12px;">13th PSSWB meeting</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">22.12.2025</td><td style="padding:12px;">Departmental welfare revision O.M.</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;color:#2E7D32;">11.02.2026</td><td style="padding:12px;font-weight:bold;color:#2E7D32;">Current CWFGDS issued</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;color:#2E7D32;">01.04.2026</td><td style="padding:12px;font-weight:bold;color:#2E7D32;">Revised rates effective</td></tr>
    <tr style="background:#E8F5E9;border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">15 April</td><td style="padding:12px;">Regional accounts to CPMG</td></tr>
    <tr style="border-bottom: 1px solid #C8E6C9;"><td style="padding:12px;font-weight:bold;">30 June</td><td style="padding:12px;">Outer audit date</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:12px;font-weight:bold;">30 September</td><td style="padding:12px;">Academic excellence awards finalised</td></tr>
  </tbody>
</table>
`,
    guru_explanation: `
<div style="background:#E8F5E9;border-left:5px solid #2E7D32;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#1B5E20;">📖 DAK GURU EXPLAINS (SIMPLIFIED)</strong>
</div>
<ul style="padding-left: 20px;">
  <li>Max GDS loan = ₹1,00,000 (not ₹50,000).</li>
  <li>EV loan has dual ceiling (₹50,000 OR 80%, whichever less).</li>
  <li>BO room loan = 8 years + departmental sureties (different from all others).</li>
  <li>12% penal interest for non-compliance.</li>
  <li>Max 2 loans in career, must repay previous first.</li>
  <li>Retirement benefit ONLY for those who NEVER claimed any assistance.</li>
  <li>Fund utilisation: 25-20-25/40-Balance formula.</li>
  <li>7 forms are high-probability MCQ area.</li>
</ul>
`,
    practical_example: `
<h4 style="color:#2E7D32;">🎯 PRACTICAL EXAMPLES / CASE STUDY</h4>
<div style="display:flex;gap:15px;flex-direction:column;">
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #2E7D32;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 1:</strong> GDS wants EV loan, vehicle costs ₹50,000 → eligible for ₹40,000 (80% rule).
  </div>
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #2E7D32;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 2:</strong> GDS claims retirement benefit after 40 years but claimed calamity assistance once → NOT eligible (must never have claimed).
  </div>
  <div style="background:#FAFAFA;padding:15px;border-left:4px solid #2E7D32;border-radius:6px;border:1px solid #EEE;">
    <strong>Case 3:</strong> BO room loan applicant is 58 years old → NOT eligible (age must be ≤57).
  </div>
</div>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ EXAM INSIGHT — 12 DANGER ZONES</strong>
</div>
<ol style="padding-left: 20px;">
  <li>Departmental ≠ GDS rates.</li>
  <li>Departmental not always higher.</li>
  <li>Ignore superseded figures after 31.03.2026.</li>
  <li>CWFGDS commencement = 11.02.2026.</li>
  <li>Max GDS loan = ₹1,00,000.</li>
  <li>Instalments: 56/21/21/max 50/21.</li>
  <li>8 years left only for BO room.</li>
  <li>Oct-Dec decided in January.</li>
  <li>Accident grant >3 days.</li>
  <li>EV = ₹50,000 OR 80%.</li>
  <li>ITI = per annum.</li>
  <li>Non-technical dept scholarship = girl students only.</li>
</ol>

<h4 style="color:#2E7D32;">🧠 KEY DISTINCTIONS (COMPULSORY LIST)</h4>
<ul style="padding-left: 20px;">
  <li>CWF vs CWFGDS</li>
  <li>Non-contributory vs contributory</li>
  <li>Fail vs detention</li>
  <li>Transport vs hostel</li>
  <li>BO room (8 years, dept sureties) vs other loans (5 years, GDS sureties)</li>
  <li>Ordinary 2-wheeler (₹20K at 5%) vs electric (₹50K/80% at 3%)</li>
  <li>Natural calamity = actual damage needed</li>
  <li>GDS TB = self only vs dept = employee + family</li>
</ul>

<h4 style="color:#2E7D32;">📌 FINAL ULTRA-REVISION CAPSULE</h4>
<ul style="list-style-type:square;margin-left:20px;color:#333;">
  <li><strong>Dept Death:</strong> 25–35–110–35</li>
  <li><strong>GDS Death:</strong> 11–165–13.2–27.5–Funeral 5.5</li>
  <li><strong>Surgery:</strong> 15/30</li>
  <li><strong>TB:</strong> 400/200 vs 440/220</li>
  <li><strong>Subscription:</strong> 40 × 12 = 480</li>
  <li><strong>Central Grant:</strong> 200/GDS/year</li>
  <li><strong>Dept Education:</strong> 1500–1200–450–375–2100 p.a.</li>
  <li><strong>GDS Education:</strong> 1100–308–209–165–1034 p.a.</li>
  <li><strong>Dept Merit:</strong> 9000–7200–6300–5400–4500</li>
  <li><strong>GDS Merit:</strong> 1100–880–770–660–550</li>
  <li><strong>GDS Marks:</strong> 85–85–80–80</li>
  <li><strong>GDS Loans:</strong> 50–20–20–EV 50/80%–15 thousand</li>
  <li><strong>Loan Interest:</strong> 5% ordinary / 3% electric / 12% penal</li>
  <li><strong>Instalments:</strong> 56–21–21–50 max–21</li>
  <li><strong>Fund Limits:</strong> 25% illness – 20% education – 25/40% loans – balance others</li>
  <li><strong>Golden dates:</strong> 22.12.2025, 11.02.2026, 01.04.2026</li>
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
        console.log(`\n🎉 DB Done! ${inserted} new inserted, ${updated} updated out of ${entries.length} total.`);

        // Update json index file
        const jsonPath = path.resolve(__dirname, '../dak_sutra_data.json');
        if (fs.existsSync(jsonPath)) {
            const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            for (const entry of entries) {
                const doc = await col.findOne({ title: entry.title });
                if (doc) {
                    const existingIndex = jsonData.entries.findIndex(e => e.title === entry.title);
                    const indexEntry = {
                        _id: doc._id.toString(),
                        title: doc.title,
                        rule_number: doc.rule_number,
                        act_name: doc.act_name,
                        category: doc.category,
                        effective_date: doc.effective_date,
                        exam_tags: doc.exam_tags
                    };
                    if (existingIndex >= 0) {
                        jsonData.entries[existingIndex] = indexEntry;
                    } else {
                        jsonData.entries.unshift(indexEntry);
                    }
                }
            }
            fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 4));
            console.log('✅ Updated dak_sutra_data.json');
        }
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();
    }
}

main();
