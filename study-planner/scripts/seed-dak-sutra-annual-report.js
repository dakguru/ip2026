
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
// ENTRY 1: INDIA POST — NETWORK AT A GLANCE
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "India Post: Network at a Glance — Annual Report 2024-25 & 2025-26",
    rule_number: "Chapter 1 — Key Facts & Figures",
    act_name: "Post Office Guide Part I",
    category: "Explanation",
    effective_date: new Date("2024-04-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;">
  <h2 style="margin:0 0 4px;font-size:1.3em;">🏣 India Post — World's Largest Postal Network</h2>
  <p style="margin:0;opacity:.85;font-size:.95em;">Annual Report & Book of Information 2024-25 | 2025-26</p>
</div>

<h3 style="color:#1565C0;border-bottom:2px solid #1565C0;padding-bottom:6px;">📌 Historical Milestones</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#1565C0;color:#fff;">
    <th style="padding:8px 12px;text-align:left;">Year</th>
    <th style="padding:8px 12px;text-align:left;">Milestone</th>
  </tr></thead>
  <tbody>
    <tr style="background:#E3F2FD;"><td style="padding:8px 12px;font-weight:700;">1727</td><td style="padding:8px 12px;">First Post Office set up in Kolkata</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">1774</td><td style="padding:8px 12px;">GPO established at Kolkata</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:8px 12px;font-weight:700;">1786</td><td style="padding:8px 12px;">GPO established at Chennai</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">1793</td><td style="padding:8px 12px;">GPO established at Mumbai</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:8px 12px;font-weight:700;">1 Oct 1854</td><td style="padding:8px 12px;">First postage stamp valid across India — uniform rate based on weight</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">1852</td><td style="padding:8px 12px;">First adhesive stamp in Asia — "Scinde Dawk" issued in Sindh province</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:8px 12px;font-weight:700;">18 Feb 1911</td><td style="padding:8px 12px;">World's first airmail flight — Allahabad to Naini (18 km across Ganga)</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">18 Jun 2024</td><td style="padding:8px 12px;">Post Office Act 2023 came into force, repealing Indian Post Office Act 1898</td></tr>
  </tbody>
</table>

<h3 style="color:#1565C0;border-bottom:2px solid #1565C0;padding-bottom:6px;margin-top:22px;">📊 Postal Network at a Glance (as on 31.03.2025)</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#283593;color:#fff;">
    <th style="padding:8px 12px;">Sl.</th><th style="padding:8px 12px;text-align:left;">Particulars</th><th style="padding:8px 12px;text-align:right;">Count</th>
  </tr></thead>
  <tbody>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;">1</td><td style="padding:8px 12px;">Postal Circles</td><td style="padding:8px 12px;text-align:right;font-weight:700;">23</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;">2</td><td style="padding:8px 12px;">Postal Regions</td><td style="padding:8px 12px;text-align:right;font-weight:700;">54</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;">3</td><td style="padding:8px 12px;">Postal Divisions</td><td style="padding:8px 12px;text-align:right;font-weight:700;">471</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;">4</td><td style="padding:8px 12px;font-weight:700;color:#1565C0;">Total Post Offices</td><td style="padding:8px 12px;text-align:right;font-weight:700;color:#1565C0;">1,64,999</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;"></td><td style="padding:8px 12px;">↳ Rural Post Offices (90.41%)</td><td style="padding:8px 12px;text-align:right;">1,49,385</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;"></td><td style="padding:8px 12px;">↳ Urban Post Offices (9.59%)</td><td style="padding:8px 12px;text-align:right;">15,614</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;"></td><td style="padding:8px 12px;">↳ Head Post Offices</td><td style="padding:8px 12px;text-align:right;">810</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;"></td><td style="padding:8px 12px;">↳ Sub Post Offices</td><td style="padding:8px 12px;text-align:right;">24,281</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;"></td><td style="padding:8px 12px;">↳ Branch Post Offices</td><td style="padding:8px 12px;text-align:right;">1,39,908</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;">5</td><td style="padding:8px 12px;">Departmental Post Offices</td><td style="padding:8px 12px;text-align:right;font-weight:700;">25,091</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;">6</td><td style="padding:8px 12px;">Delivery Post Offices</td><td style="padding:8px 12px;text-align:right;font-weight:700;">1,57,455</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;">7</td><td style="padding:8px 12px;">Night Post Offices</td><td style="padding:8px 12px;text-align:right;font-weight:700;">130</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;">8</td><td style="padding:8px 12px;">Railway Mail Service (RMS) Divisions</td><td style="padding:8px 12px;text-align:right;font-weight:700;">69</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;">9</td><td style="padding:8px 12px;">Postal Training Centres (PTCs)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">6</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;">10</td><td style="padding:8px 12px;">National Sorting Hubs</td><td style="padding:8px 12px;text-align:right;font-weight:700;">97</td></tr>
    <tr><td style="padding:8px 12px;text-align:center;">11</td><td style="padding:8px 12px;">Circle Stamp Depot (CSD)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">1</td></tr>
    <tr style="background:#E8EAF6;"><td style="padding:8px 12px;text-align:center;">12</td><td style="padding:8px 12px;">Postal Store Depots (PSD)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">26</td></tr>
  </tbody>
</table>

<h3 style="color:#1565C0;border-bottom:2px solid #1565C0;padding-bottom:6px;margin-top:22px;">👥 Personnel Strength</h3>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
  <div style="flex:1;min-width:160px;background:#E8F5E9;border-left:4px solid #2E7D32;border-radius:8px;padding:12px 16px;">
    <div style="font-size:.8em;color:#2E7D32;font-weight:700;text-transform:uppercase;">Departmental Employees</div>
    <div style="font-size:1.6em;font-weight:800;color:#1B5E20;">1,95,754</div>
  </div>
  <div style="flex:1;min-width:160px;background:#FFF3E0;border-left:4px solid #E65100;border-radius:8px;padding:12px 16px;">
    <div style="font-size:.8em;color:#E65100;font-weight:700;text-transform:uppercase;">Gramin Dak Sevaks</div>
    <div style="font-size:1.6em;font-weight:800;color:#BF360C;">2,78,633</div>
  </div>
</div>

<h3 style="color:#1565C0;border-bottom:2px solid #1565C0;padding-bottom:6px;margin-top:22px;">📡 Service Coverage</h3>
<ul>
  <li>Average persons served per Post Office: <strong>8,566</strong></li>
  <li>Rural PO: serves <strong>6,083</strong> persons | Urban PO: serves <strong>32,314</strong> persons</li>
  <li>Average area covered per Post Office: <strong>19.92 sq. km</strong></li>
  <li>Countries under International Speed Post (merchandise + docs): <strong>100</strong></li>
  <li>Countries under International Speed Post (docs only): <strong>6</strong></li>
</ul>

<h3 style="color:#1565C0;border-bottom:2px solid #1565C0;padding-bottom:6px;margin-top:22px;">⚖️ Constitutional & Legal Provisions</h3>
<p>Posts & Telegraphs, Communication — Entry <strong>No. 31</strong> of <strong>List I (Union List)</strong> of the <strong>Seventh Schedule</strong> to the Constitution of India [Article 246(1)]. It is a <strong>Union Subject</strong>.</p>
<p><strong>Post Office Act, 2023</strong> (43 of 2023): Notified on <strong>24 Dec 2023</strong>. Came into force on <strong>18 June 2024</strong> (Gazette S.O. 2352(E) dated 17 June 2024), repealing the Indian Post Office Act, 1898.</p>

<h3 style="color:#1565C0;border-bottom:2px solid #1565C0;padding-bottom:6px;margin-top:22px;">🏛 Postal Services Board (PSB)</h3>
<ul>
  <li>PSB is the <strong>apex management body</strong> of the Department of Posts</li>
  <li>Comprises: <strong>Chairperson + 7 Members</strong></li>
  <li>Members look after: Personnel Management, Postal Operations, Technology, Infrastructure, Financial Services, HRD, Service Quality & Marketing</li>
  <li>Headed by: <strong>Secretary, Department of Posts</strong> (who is also Chairman of PSB)</li>
  <li>Additional Secretary & Financial Advisor (AS&FA) heads the <strong>Internal Finance Wing (IFW)</strong></li>
</ul>

<h3 style="color:#1565C0;border-bottom:2px solid #1565C0;padding-bottom:6px;margin-top:22px;">🗺 23 Postal Circles & HQs</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9em;">
  <thead><tr style="background:#1565C0;color:#fff;">
    <th style="padding:6px 10px;">Circle</th><th style="padding:6px 10px;">HQ</th>
    <th style="padding:6px 10px;">Circle</th><th style="padding:6px 10px;">HQ</th>
  </tr></thead>
  <tbody>
    <tr style="background:#E3F2FD;"><td style="padding:6px 10px;">Andhra Pradesh</td><td style="padding:6px 10px;">Vijayawada</td><td style="padding:6px 10px;">Madhya Pradesh</td><td style="padding:6px 10px;">Bhopal</td></tr>
    <tr><td style="padding:6px 10px;">Assam</td><td style="padding:6px 10px;">Guwahati</td><td style="padding:6px 10px;">Maharashtra</td><td style="padding:6px 10px;">Mumbai</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:6px 10px;">Bihar</td><td style="padding:6px 10px;">Patna</td><td style="padding:6px 10px;">North Eastern</td><td style="padding:6px 10px;">Shillong</td></tr>
    <tr><td style="padding:6px 10px;">Chhatisgarh</td><td style="padding:6px 10px;">Raipur</td><td style="padding:6px 10px;">Orissa</td><td style="padding:6px 10px;">Bhuvaneshwar</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:6px 10px;">Delhi</td><td style="padding:6px 10px;">New Delhi</td><td style="padding:6px 10px;">Punjab</td><td style="padding:6px 10px;">Chandigarh</td></tr>
    <tr><td style="padding:6px 10px;">Gujarat</td><td style="padding:6px 10px;">Ahmedabad</td><td style="padding:6px 10px;">Rajasthan</td><td style="padding:6px 10px;">Jaipur</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:6px 10px;">Haryana</td><td style="padding:6px 10px;">Ambala</td><td style="padding:6px 10px;">Tamil Nadu</td><td style="padding:6px 10px;">Chennai</td></tr>
    <tr><td style="padding:6px 10px;">Himachal Pradesh</td><td style="padding:6px 10px;">Shimla</td><td style="padding:6px 10px;">Telangana</td><td style="padding:6px 10px;">Hyderabad</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:6px 10px;">J & K</td><td style="padding:6px 10px;">Srinagar</td><td style="padding:6px 10px;">Uttar Pradesh</td><td style="padding:6px 10px;">Lucknow</td></tr>
    <tr><td style="padding:6px 10px;">Jharkhand</td><td style="padding:6px 10px;">Ranchi</td><td style="padding:6px 10px;">Uttaranchal</td><td style="padding:6px 10px;">Dehradun</td></tr>
    <tr style="background:#E3F2FD;"><td style="padding:6px 10px;">Karnataka</td><td style="padding:6px 10px;">Bangalore</td><td style="padding:6px 10px;">West Bengal</td><td style="padding:6px 10px;">Kolkata</td></tr>
    <tr><td style="padding:6px 10px;">Kerala</td><td style="padding:6px 10px;">Thiruvananthapuram</td><td style="padding:6px 10px;"></td><td style="padding:6px 10px;"></td></tr>
  </tbody>
</table>
<p style="margin-top:10px;font-size:.9em;"><strong>Army Postal Service (APS):</strong> 2 Circle Base Post Offices — 1-CBPO (c/o 56 APO) & 2-CBPO (c/o 99 APO). Headed by Addl. DG (rank of Major General). ~75% of ranks drawn from DOP.</p>`,

    guru_explanation: `
<div style="background:#E8F5E9;border-left:5px solid #2E7D32;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#1B5E20;">🎯 How to remember these numbers for the exam</strong>
</div>

<h4 style="color:#1565C0;">The "90-10" Rule of India Post</h4>
<p>Always remember: India Post is predominantly <strong>rural</strong>. About <strong>90%</strong> of post offices (1,49,385) are in rural areas and only <strong>10%</strong> (15,614) are urban. This is the single most-asked fact in IP/ASP exams.</p>

<h4 style="color:#1565C0;">The Vision & Mission in Simple Words</h4>
<p><strong>Vision:</strong> "India Post's products and services will be the customer's first choice." — Just one line, easy to remember.</p>
<p><strong>Mission (5 pillars):</strong></p>
<ol>
  <li>Remain the <strong>largest postal network</strong> in the world</li>
  <li>Provide mail, parcel, banking, insurance & retail with <strong>speed & reliability</strong></li>
  <li>Provide services on a <strong>value-for-money</strong> basis</li>
  <li>Ensure employees are the <strong>main strength</strong> — serve with a human touch</li>
  <li>Deliver <strong>social security</strong> and enable <strong>last-mile connectivity</strong></li>
</ol>

<h4 style="color:#1565C0;">Why is Post & Telegraph a Union Subject?</h4>
<p>Because communication infrastructure must be <strong>uniform across India</strong>. If states controlled it, a letter from Tamil Nadu to UP would require two different laws. Parliament alone legislates on it under Entry 31, List I.</p>

<h4 style="color:#1565C0;">PSB — Think of it like a Company Board</h4>
<p>Secretary (Posts) = <strong>Chairperson</strong> (like a CMD). The 7 Members are like functional Directors — each handles one domain (HR, IT, Finance, Operations, etc.).</p>

<h4 style="color:#1565C0;">The "First Airmail" Story (Often asked!)</h4>
<p>On <strong>18 Feb 1911</strong>, Henri Pequet flew mail from <strong>Allahabad to Naini</strong> — just 18 km across the Ganga. It was the world's first airmail flight. India holds this historic record!</p>`,

    practical_example: `
<h4 style="color:#E65100;">Scenario 1: IP Exam MCQ Trap</h4>
<p>Q: "As on 31.03.2025, how many post offices are in rural areas?"</p>
<p><strong>Trap:</strong> Students confuse 2024 data (1,49,164) with 2025 data (1,49,385). Always use the <strong>latest figure: 1,49,385</strong> for 2025-26 Annual Report.</p>

<h4 style="color:#E65100;">Scenario 2: Classification Question</h4>
<p>Q: "A post office that does not deliver mail directly to addresses — what type is it?"</p>
<p><strong>Answer:</strong> A <strong>non-delivery post office</strong>. Out of 1,64,999 post offices, only 1,57,455 are <strong>Delivery Post Offices</strong>.</p>

<h4 style="color:#E65100;">Scenario 3: APS Question</h4>
<p>Q: "Which officer heads the Army Postal Service?"</p>
<p><strong>Answer:</strong> Additional Director General in the rank of <strong>Major General</strong>. Officers' cadre drawn on deputation from <strong>Indian Postal Services</strong>.</p>`,

    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong>⚡ HIGH-FREQUENCY EXAM FACTS — Memorise These!</strong>
</div>
<ul>
  <li>World's largest postal network: <strong>1,64,999</strong> POs (31.03.2025)</li>
  <li>Rural POs: <strong>1,49,385 (90.41%)</strong> | Urban: <strong>15,614 (9.59%)</strong></li>
  <li>Branch Post Offices: <strong>1,39,908</strong> | Head POs: <strong>810</strong></li>
  <li>Departmental Employees: <strong>1,95,754</strong> | GDS: <strong>2,78,633</strong></li>
  <li>Avg persons per PO: <strong>8,566</strong> | Rural: 6,083 | Urban: 32,314</li>
  <li>Avg area per PO: <strong>19.92 sq.km</strong></li>
  <li>First PO in India: <strong>1727, Kolkata</strong></li>
  <li>First airmail: <strong>18 Feb 1911</strong>, Allahabad→Naini, <strong>18 km</strong></li>
  <li>Scinde Dawk (first Asian stamp): <strong>1852</strong>, Sindh</li>
  <li>First national stamp: <strong>1 Oct 1854</strong></li>
  <li>Posts under: <strong>Entry 31, List I, 7th Schedule</strong></li>
  <li>Post Office Act 2023 in force: <strong>18 June 2024</strong></li>
  <li>PSB: Chairperson + <strong>7 Members</strong></li>
  <li>Postal Circles: <strong>23</strong> | Regions: <strong>54</strong> | Divisions: <strong>471</strong></li>
  <li>RMS Divisions: <strong>69</strong> | PTCs: <strong>6</strong> | Night POs: <strong>130</strong></li>
</ul>`,

    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// ENTRY 2: POST OFFICE SAVINGS BANK (POSB)
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Post Office Savings Bank (POSB): Banking Services, Schemes & Milestones",
    rule_number: "Chapter 2 — Financial Services",
    act_name: "Post Office Guide Part I",
    category: "Explanation",
    effective_date: new Date("2024-04-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg,#1B5E20,#2E7D32);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;">
  <h2 style="margin:0 0 4px;font-size:1.3em;">🏦 Post Office Savings Bank (POSB)</h2>
  <p style="margin:0;opacity:.85;font-size:.95em;">Banking for Every Indian — Since 1882</p>
</div>

<h3 style="color:#2E7D32;border-bottom:2px solid #2E7D32;padding-bottom:6px;">📅 Key Dates in POSB History</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#2E7D32;color:#fff;"><th style="padding:8px 12px;">Date</th><th style="padding:8px 12px;text-align:left;">Event</th></tr></thead>
  <tbody>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;font-weight:700;white-space:nowrap;">Since 1882</td><td style="padding:8px 12px;">POSB facilities available</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">2014</td><td style="padding:8px 12px;">First ATM inaugurated at Thyagaraya Nagar HO, Chennai</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;font-weight:700;">31.12.2016</td><td style="padding:8px 12px;">ATMs made interoperable with banks</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">07.09.2015</td><td style="padding:8px 12px;">Jan Suraksha Schemes (PMSBY & PMJJBY) launched in all CBS POs</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;font-weight:700;">01.12.2015</td><td style="padding:8px 12px;">APY launched in 808 CBS HOs</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">14.12.2018</td><td style="padding:8px 12px;">Internet Banking (e-Banking) launched</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;font-weight:700;">15.10.2019</td><td style="padding:8px 12px;">Mobile Banking launched</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">25.01.2022</td><td style="padding:8px 12px;">PAN validation through NSDL implemented in Finacle</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;font-weight:700;">18.05.2022</td><td style="padding:8px 12px;">NEFT interoperability deployed (IFSC: IPOS0000DOP)</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">31.05.2022</td><td style="padding:8px 12px;">RTGS deployed (IFSC: IPOS0000DOP)</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;font-weight:700;">12.10.2022</td><td style="padding:8px 12px;">e-Passbook facility launched</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">30.08.2022</td><td style="padding:8px 12px;">Management of DOP ATMs handed to IPPB</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;font-weight:700;">06.10.2021</td><td style="padding:8px 12px;">PM CARES Scheme for Children 2021 introduced</td></tr>
    <tr><td style="padding:8px 12px;font-weight:700;">31.12.2025</td><td style="padding:8px 12px;">e-KYC active in 24,184 POs (96.4% of Sub POs + HPOs)</td></tr>
  </tbody>
</table>

<h3 style="color:#2E7D32;border-bottom:2px solid #2E7D32;padding-bottom:6px;margin-top:22px;">💻 Core Banking Solution (CBS)</h3>
<ul>
  <li>CBS (Finacle) implemented in all <strong>1.65 lakh</strong> Post Offices — Anytime, Anywhere banking</li>
  <li>More than <strong>30.39 crore</strong> POSB accounts on Finacle CBS (as on 31.12.2025)</li>
  <li>Internet Banking: more than <strong>14.9 lakh</strong> customers</li>
  <li>Mobile Banking: more than <strong>10.83 lakh</strong> customers</li>
  <li>PAN validation via NSDL implemented w.e.f. <strong>25.01.2022</strong></li>
  <li>1 mobile number can be linked to maximum <strong>5 CIF</strong></li>
  <li>ATMs: <strong>1,000 ATMs</strong> functioning all over India — managed by IPPB w.e.f. 30.08.2022</li>
</ul>

<h3 style="color:#2E7D32;border-bottom:2px solid #2E7D32;padding-bottom:6px;margin-top:22px;">📊 Savings Bank Scheme Profile (as on 31.03.2025)</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9em;">
  <thead><tr style="background:#1B5E20;color:#fff;">
    <th style="padding:7px 10px;text-align:left;">Scheme</th>
    <th style="padding:7px 10px;text-align:right;">No. of Accounts</th>
    <th style="padding:7px 10px;text-align:right;">Balance (₹ Cr)</th>
  </tr></thead>
  <tbody>
    <tr style="background:#E8F5E9;"><td style="padding:7px 10px;">Savings Accounts (incl. MGNREGA)</td><td style="padding:7px 10px;text-align:right;">7,93,87,869</td><td style="padding:7px 10px;text-align:right;">2,12,331.70</td></tr>
    <tr><td style="padding:7px 10px;">RD Accounts</td><td style="padding:7px 10px;text-align:right;">13,09,22,127</td><td style="padding:7px 10px;text-align:right;">2,06,307.15</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:7px 10px;">TD Accounts</td><td style="padding:7px 10px;text-align:right;">2,58,36,610</td><td style="padding:7px 10px;text-align:right;">3,38,531.04</td></tr>
    <tr><td style="padding:7px 10px;">MIS Accounts</td><td style="padding:7px 10px;text-align:right;">91,26,726</td><td style="padding:7px 10px;text-align:right;">2,85,629.52</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:7px 10px;">PPF Accounts</td><td style="padding:7px 10px;text-align:right;">50,38,989</td><td style="padding:7px 10px;text-align:right;">1,62,746.82</td></tr>
    <tr><td style="padding:7px 10px;">Sr. Citizens Savings Scheme (SCSS)</td><td style="padding:7px 10px;text-align:right;">42,97,849</td><td style="padding:7px 10px;text-align:right;">2,00,325.85</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:7px 10px;">Sukanya Samriddhi Accounts</td><td style="padding:7px 10px;text-align:right;">3,53,37,939</td><td style="padding:7px 10px;text-align:right;">1,99,001.69</td></tr>
    <tr style="background:#C8E6C9;font-weight:700;"><td style="padding:7px 10px;">Sub-Total (Savings Bank)</td><td style="padding:7px 10px;text-align:right;">28,99,48,109</td><td style="padding:7px 10px;text-align:right;">16,04,873.77</td></tr>
    <tr><td style="padding:7px 10px;">NSC VIII</td><td style="padding:7px 10px;text-align:right;">3,96,11,831</td><td style="padding:7px 10px;text-align:right;">1,94,798.06</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:7px 10px;">KVP</td><td style="padding:7px 10px;text-align:right;">3,60,75,330</td><td style="padding:7px 10px;text-align:right;">2,32,726.79</td></tr>
    <tr><td style="padding:7px 10px;">MSSC</td><td style="padding:7px 10px;text-align:right;">35,86,383</td><td style="padding:7px 10px;text-align:right;">28,210.93</td></tr>
    <tr style="background:#A5D6A7;font-weight:700;"><td style="padding:7px 10px;">GRAND TOTAL</td><td style="padding:7px 10px;text-align:right;">36,92,21,653</td><td style="padding:7px 10px;text-align:right;">20,60,609.55</td></tr>
  </tbody>
</table>

<h3 style="color:#2E7D32;border-bottom:2px solid #2E7D32;padding-bottom:6px;margin-top:22px;">🛡 Jan Suraksha Schemes & Milestones (as on 31.12.2025)</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#2E7D32;color:#fff;"><th style="padding:8px 12px;text-align:left;">Scheme</th><th style="padding:8px 12px;text-align:right;">Enrolments</th></tr></thead>
  <tbody>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;">Sukanya Samriddhi Accounts (Live)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">3.76 crore</td></tr>
    <tr><td style="padding:8px 12px;">PMSBY (New + Auto Renewal)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">21.07 lakh</td></tr>
    <tr style="background:#E8F5E9;"><td style="padding:8px 12px;">PMJJBY (New + Auto Renewal)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">1.17 lakh</td></tr>
    <tr><td style="padding:8px 12px;">APY Enrolments</td><td style="padding:8px 12px;text-align:right;font-weight:700;">4.16 lakh</td></tr>
  </tbody>
</table>

<h3 style="color:#2E7D32;border-bottom:2px solid #2E7D32;padding-bottom:6px;margin-top:22px;">👧 PM CARES Scheme for Children, 2021</h3>
<ul>
  <li>Notified vide MoF Gazette: <strong>06.10.2021</strong></li>
  <li>Corpus per child at age <strong>18 years: ₹10 lakh</strong></li>
  <li>Amount received at age <strong>23 years: ₹10 lakh</strong></li>
  <li>Live accounts as on 31.12.2025: <strong>4,534</strong></li>
</ul>`,

    guru_explanation: `
<div style="background:#F3E5F5;border-left:5px solid #7B1FA2;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#4A148C;">🎯 POSB — The Banking Backbone of Rural India</strong>
</div>

<h4 style="color:#2E7D32;">Remember POSB as "The Banker of Last Resort for Villages"</h4>
<p>With 1.65 lakh POs on CBS, India Post reaches where no bank branch does. The RD account with <strong>13 crore accounts</strong> is the most popular scheme — targeting the salaried/daily-wage segment who save small amounts monthly.</p>

<h4 style="color:#2E7D32;">The "Three Digital Milestones" to Remember</h4>
<ol>
  <li><strong>2014</strong> — First ATM (Chennai Thyagaraya Nagar HO)</li>
  <li><strong>14.12.2018</strong> — Internet Banking</li>
  <li><strong>15.10.2019</strong> — Mobile Banking</li>
</ol>
<p>These three dates come up repeatedly in IP/ASP exams. Link them: ATM → Net → Mobile, in that order.</p>

<h4 style="color:#2E7D32;">IFSC Code of DOP — A Favourite MCQ</h4>
<p>India Post's IFSC code is <strong>IPOS0000DOP</strong> — valid for both NEFT (from 18.05.2022) and RTGS (from 31.05.2022).</p>

<h4 style="color:#2E7D32;">Jan Suraksha Schemes — The "7-9" Launch Date</h4>
<p>PMSBY & PMJJBY were launched on <strong>07.09.2015</strong> — remember "7-9-15" (7th September 2015). APY came slightly later — <strong>01.12.2015</strong> at 808 HOs.</p>

<h4 style="color:#2E7D32;">Grand Total to Remember</h4>
<p>POSB holds <strong>36.92 crore</strong> active accounts with an outstanding balance of <strong>₹20,60,609.55 crore</strong> — roughly ₹20.6 lakh crore! This reflects the trust of ordinary Indians in India Post.</p>`,

    practical_example: `
<h4 style="color:#E65100;">Scenario 1: e-KYC at Post Office</h4>
<p>A customer wants to open a new POSB account. As on 31.12.2025, <strong>24,184 post offices</strong> (96.4% of Sub POs + HPOs) have e-KYC functionality — so the customer can be enrolled digitally without paper forms in most offices.</p>

<h4 style="color:#E65100;">Scenario 2: NEFT Transfer from POSB</h4>
<p>A POSB account holder wants to transfer ₹50,000 to an SBI account. They use the NEFT facility available since <strong>18.05.2022</strong>. The IFSC code of India Post to be used: <strong>IPOS0000DOP</strong>.</p>

<h4 style="color:#E65100;">Scenario 3: PM CARES — Child Account</h4>
<p>A child orphaned during COVID was enrolled in PM CARES Scheme. A calculated amount is credited monthly so that the corpus becomes <strong>₹10 lakh at age 18</strong>. The child receives the lump sum at <strong>age 23</strong>.</p>`,

    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong>⚡ TOP POSB EXAM FACTS</strong>
</div>
<ul>
  <li>POSB since: <strong>1882</strong></li>
  <li>CBS in all <strong>1.65 lakh</strong> POs; <strong>30.39 crore</strong> accounts on Finacle (31.12.2025)</li>
  <li>First ATM: <strong>2014</strong>, Thyagaraya Nagar HO, Chennai</li>
  <li>ATMs interoperable with banks: <strong>31.12.2016</strong></li>
  <li>ATM management handed to IPPB: <strong>30.08.2022</strong></li>
  <li>Internet Banking: <strong>14.12.2018</strong> | Mobile Banking: <strong>15.10.2019</strong></li>
  <li>NEFT: <strong>18.05.2022</strong> | RTGS: <strong>31.05.2022</strong> | IFSC: <strong>IPOS0000DOP</strong></li>
  <li>e-Passbook: <strong>12.10.2022</strong></li>
  <li>Max CIF per mobile number: <strong>5</strong></li>
  <li>PMSBY & PMJJBY: <strong>07.09.2015</strong> | APY: <strong>01.12.2015</strong> (808 HOs)</li>
  <li>Total POSB accounts: <strong>36.92 crore</strong> | Balance: <strong>₹20,60,609 crore</strong></li>
  <li>Sukanya Samriddhi (live): <strong>3.76 crore</strong> accounts</li>
  <li>PM CARES Children: corpus ₹10L at 18 yrs, receive at <strong>23 yrs</strong>; live accounts: <strong>4,534</strong></li>
  <li>e-KYC: <strong>24,184</strong> POs = <strong>96.4%</strong> of Sub POs + HPOs</li>
</ul>`,

    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// ENTRY 3: INDIA POST PAYMENTS BANK (IPPB)
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "India Post Payments Bank (IPPB): Digital Banking Revolution",
    rule_number: "Chapter 2.3 — IPPB",
    act_name: "Post Office Guide Part I",
    category: "Explanation",
    effective_date: new Date("2024-04-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg,#880E4F,#AD1457);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;">
  <h2 style="margin:0 0 4px;font-size:1.3em;">💳 India Post Payments Bank (IPPB)</h2>
  <p style="margin:0;opacity:.85;font-size:.95em;">Empowering 130 Crore Indians — Digital, Paperless, Doorstep Banking</p>
</div>

<h3 style="color:#880E4F;border-bottom:2px solid #880E4F;padding-bottom:6px;">📊 IPPB at a Glance (Key Statistics)</h3>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px;">
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">1.64 lakh</div>
    <div style="font-size:.8em;color:#C2185B;">IPPB Access Points in POs</div>
  </div>
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">1.39+ lakh</div>
    <div style="font-size:.8em;color:#C2185B;">Access Points in Rural Areas</div>
  </div>
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">13.07 crore</div>
    <div style="font-size:.8em;color:#C2185B;">Accounts Opened (Digital)</div>
  </div>
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">77%</div>
    <div style="font-size:.8em;color:#C2185B;">Customers from Rural India</div>
  </div>
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">₹24,715 Cr</div>
    <div style="font-size:.8em;color:#C2185B;">Customer Deposit Balance</div>
  </div>
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">48%</div>
    <div style="font-size:.8em;color:#C2185B;">Female Customers</div>
  </div>
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">98%</div>
    <div style="font-size:.8em;color:#C2185B;">Women Accounts at Doorstep</div>
  </div>
  <div style="background:#FCE4EC;border-radius:8px;padding:12px;text-align:center;border-top:3px solid #C2185B;">
    <div style="font-size:1.4em;font-weight:800;color:#880E4F;">58%+</div>
    <div style="font-size:.8em;color:#C2185B;">Women Accounts with DBT</div>
  </div>
</div>

<h3 style="color:#880E4F;border-bottom:2px solid #880E4F;padding-bottom:6px;margin-top:20px;">💸 Transaction Performance</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#880E4F;color:#fff;"><th style="padding:8px 12px;text-align:left;">Metric</th><th style="padding:8px 12px;text-align:right;">Value</th></tr></thead>
  <tbody>
    <tr style="background:#FCE4EC;"><td style="padding:8px 12px;">Total Financial Transactions</td><td style="padding:8px 12px;text-align:right;font-weight:700;">2,146 crore+</td></tr>
    <tr><td style="padding:8px 12px;">Total Transaction Value</td><td style="padding:8px 12px;text-align:right;font-weight:700;">₹19,91,259 crore</td></tr>
    <tr style="background:#FCE4EC;"><td style="padding:8px 12px;">DBT Disbursement Transactions</td><td style="padding:8px 12px;text-align:right;font-weight:700;">79.73 crore+</td></tr>
    <tr><td style="padding:8px 12px;">DBT Disbursement Value</td><td style="padding:8px 12px;text-align:right;font-weight:700;">₹1,37,135 crore</td></tr>
    <tr style="background:#FCE4EC;"><td style="padding:8px 12px;">AEPS Transactions (for other bank customers)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">11.89 crore+</td></tr>
    <tr><td style="padding:8px 12px;">AEPS Cash Disbursed</td><td style="padding:8px 12px;text-align:right;font-weight:700;">₹35,572 crore+</td></tr>
  </tbody>
</table>

<h3 style="color:#880E4F;border-bottom:2px solid #880E4F;padding-bottom:6px;margin-top:20px;">🧾 Jeevan Pramaan Centre (JPC)</h3>
<ul>
  <li>Total Digital Life Certificates (DLCs) registered: <strong>4,25,520</strong> (1 Apr 2025 to 31 Dec 2025)</li>
  <li>Customers served at doorstep: <strong>29.02 lakh</strong></li>
  <li>JPC enables pensioners to submit life certificates digitally — no need to visit bank</li>
</ul>

<h3 style="color:#880E4F;border-bottom:2px solid #880E4F;padding-bottom:6px;margin-top:20px;">📋 Earlier Data (Annual Report 2024-25)</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9em;">
  <thead><tr style="background:#AD1457;color:#fff;"><th style="padding:7px 12px;text-align:left;">Metric</th><th style="padding:7px 12px;text-align:right;">2024-25 Figures</th></tr></thead>
  <tbody>
    <tr style="background:#FCE4EC;"><td style="padding:7px 12px;">Deposit Balance</td><td style="padding:7px 12px;text-align:right;">Rs. 15,319 crore+</td></tr>
    <tr><td style="padding:7px 12px;">Financial Transactions</td><td style="padding:7px 12px;text-align:right;">1101 crore+ (₹11,01,646 Cr)</td></tr>
    <tr style="background:#FCE4EC;"><td style="padding:7px 12px;">DBT Transactions</td><td style="padding:7px 12px;text-align:right;">42.60 crore+ (₹66,375 Cr)</td></tr>
    <tr><td style="padding:7px 12px;">Child Enrolment Lite Client (CELC)</td><td style="padding:7px 12px;text-align:right;">8.50 crore+</td></tr>
    <tr style="background:#FCE4EC;"><td style="padding:7px 12px;">AEPS (other banks)</td><td style="padding:7px 12px;text-align:right;">11.17 crore (₹33,199 Cr)</td></tr>
  </tbody>
</table>`,

    guru_explanation: `
<div style="background:#E8EAF6;border-left:5px solid #283593;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#1A237E;">🎯 Understanding IPPB — The "Last-Mile Financial Inclusion" Tool</strong>
</div>

<h4 style="color:#880E4F;">IPPB vs POSB — What's the Difference?</h4>
<table style="width:100%;border-collapse:collapse;font-size:.9em;">
  <thead><tr style="background:#880E4F;color:#fff;"><th style="padding:7px 10px;text-align:left;">Feature</th><th style="padding:7px 10px;">POSB</th><th style="padding:7px 10px;">IPPB</th></tr></thead>
  <tbody>
    <tr style="background:#FCE4EC;"><td style="padding:7px 10px;">Type</td><td style="padding:7px 10px;text-align:center;">Govt. Savings Schemes</td><td style="padding:7px 10px;text-align:center;">Payments Bank</td></tr>
    <tr><td style="padding:7px 10px;">Governed by</td><td style="padding:7px 10px;text-align:center;">Ministry of Finance</td><td style="padding:7px 10px;text-align:center;">RBI (Payments Bank licence)</td></tr>
    <tr style="background:#FCE4EC;"><td style="padding:7px 10px;">ATM</td><td style="padding:7px 10px;text-align:center;">Managed by IPPB (from 2022)</td><td style="padding:7px 10px;text-align:center;">Manages ATMs</td></tr>
    <tr><td style="padding:7px 10px;">Interest</td><td style="padding:7px 10px;text-align:center;">Higher (Govt. backed)</td><td style="padding:7px 10px;text-align:center;">Payments Bank rates</td></tr>
  </tbody>
</table>

<h4 style="color:#880E4F;">The "48-98-58" Women Empowerment Formula</h4>
<p>Three critical numbers about IPPB and women:</p>
<ul>
  <li><strong>48%</strong> of all IPPB customers are women</li>
  <li><strong>98%</strong> of women accounts opened at their doorstep</li>
  <li><strong>58%+</strong> of women accounts receive DBT benefits</li>
</ul>
<p>This shows IPPB is a <strong>women-first financial inclusion tool</strong>.</p>

<h4 style="color:#880E4F;">Why 77% Rural?</h4>
<p>IPPB uses the postman as a <strong>mobile banker</strong> — the Gramin Dak Sevak visits the doorstep with a smartphone and biometric device. This is why 77% of accounts come from rural India where banks don't reach.</p>

<h4 style="color:#880E4F;">DBT — India Post as the Government's Payment Highway</h4>
<p>DBT (Direct Benefit Transfer) means government schemes like MGNREGA wages, LPG subsidy, PM-KISAN are paid directly to beneficiary accounts. IPPB processed <strong>79.73 crore DBT transactions</strong> worth <strong>₹1,37,135 crore</strong> — making it a critical national infrastructure.</p>`,

    practical_example: `
<h4 style="color:#E65100;">Scenario 1: AEPS at a Village</h4>
<p>Ramaiah in a remote village doesn't have an IPPB account — he has an SBI account. But his nearest SBI ATM is 20 km away. The local GDS visits his home with a micro-ATM. Ramaiah can withdraw cash using his Aadhaar + fingerprint via <strong>AEPS (Aadhaar Enabled Payment Service)</strong>. This is counted in the "11.89 crore AEPS transactions for other bank customers."</p>

<h4 style="color:#E65100;">Scenario 2: Jeevan Pramaan at Doorstep</h4>
<p>A 75-year-old pensioner in a small town cannot travel to the post office to submit a life certificate. The postman visits his home, captures the biometric data on a smartphone and submits a Digital Life Certificate (DLC) to IPPB. From <strong>1 Apr to 31 Dec 2025</strong>, 4,25,520 DLCs were registered and 29.02 lakh pensioners were served at doorstep.</p>`,

    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong>⚡ TOP IPPB EXAM FACTS</strong>
</div>
<ul>
  <li>IPPB Access Points in POs: <strong>1.64 lakh</strong> (rural: 1.39+ lakh)</li>
  <li>IPPB accounts opened: <strong>13.07 crore</strong> (digital & paperless)</li>
  <li>Rural customers: <strong>77%</strong> | Female customers: <strong>48%</strong></li>
  <li>Women accounts at doorstep: <strong>98%</strong></li>
  <li>Women accounts with DBT: <strong>58%+</strong></li>
  <li>Deposit balance: <strong>₹24,715 crore</strong></li>
  <li>Total transactions: <strong>2,146 crore+</strong> (₹19,91,259 crore)</li>
  <li>DBT transactions: <strong>79.73 crore+</strong> (₹1,37,135 crore)</li>
  <li>AEPS for other bank customers: <strong>11.89 crore</strong> (₹35,572 crore)</li>
  <li>DLC (Jeevan Pramaan): <strong>4,25,520</strong> registered; doorstep: <strong>29.02 lakh</strong></li>
  <li>DOP ATM management transferred to IPPB: <strong>30.08.2022</strong></li>
  <li>Earlier (2024-25): deposits ₹15,319 Cr; CELC: 8.50 crore</li>
</ul>`,

    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// ENTRY 4: LOGISTICS & SUPPLY CHAIN
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Logistics & Supply Chain: Speed Post, Parcels, MMS & Transport Network",
    rule_number: "Chapter 3 — Logistics and Supply Chain",
    act_name: "Post Office Guide Part I",
    category: "Explanation",
    effective_date: new Date("2024-04-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg,#E65100,#BF360C);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;">
  <h2 style="margin:0 0 4px;font-size:1.3em;">🚚 Logistics & Supply Chain</h2>
  <p style="margin:0;opacity:.85;font-size:.95em;">Speed Post | Parcels | Mail Motor Service | Transport Network</p>
</div>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;">⚡ Speed Post — Traffic & Revenue Trend</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#E65100;color:#fff;">
    <th style="padding:8px 12px;">Financial Year</th>
    <th style="padding:8px 12px;text-align:right;">Traffic (crore)</th>
    <th style="padding:8px 12px;text-align:right;">Revenue (₹ crore)</th>
  </tr></thead>
  <tbody>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">2020-21</td><td style="padding:8px 12px;text-align:right;">35.24</td><td style="padding:8px 12px;text-align:right;">1,209.03</td></tr>
    <tr><td style="padding:8px 12px;">2021-22</td><td style="padding:8px 12px;text-align:right;">42.92</td><td style="padding:8px 12px;text-align:right;">1,396.63</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">2022-23</td><td style="padding:8px 12px;text-align:right;">50.85</td><td style="padding:8px 12px;text-align:right;">1,533.51</td></tr>
    <tr><td style="padding:8px 12px;">2023-24</td><td style="padding:8px 12px;text-align:right;">67.46</td><td style="padding:8px 12px;text-align:right;">1,837.76</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">2024-25</td><td style="padding:8px 12px;text-align:right;">62.14</td><td style="padding:8px 12px;text-align:right;">1,752.54</td></tr>
    <tr style="background:#FFE0B2;font-weight:700;"><td style="padding:8px 12px;">2025-26 (Apr–Dec 2025)</td><td style="padding:8px 12px;text-align:right;">51.10</td><td style="padding:8px 12px;text-align:right;">1,312.74</td></tr>
  </tbody>
</table>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:22px;">📦 Parcel Traffic (2023-24 vs 2024-25)</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#BF360C;color:#fff;">
    <th style="padding:8px 12px;text-align:left;">Parcel Category</th>
    <th style="padding:8px 12px;text-align:right;">2023-24</th>
    <th style="padding:8px 12px;text-align:right;">2024-25</th>
  </tr></thead>
  <tbody>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">Speed Post Parcel</td><td style="padding:8px 12px;text-align:right;">2,51,74,468</td><td style="padding:8px 12px;text-align:right;">3,13,85,000</td></tr>
    <tr><td style="padding:8px 12px;">Business / India Post Parcel (Contractual)</td><td style="padding:8px 12px;text-align:right;">61,87,535</td><td style="padding:8px 12px;text-align:right;">75,79,000</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">Registered Parcel / India Post Parcel (Retail)</td><td style="padding:8px 12px;text-align:right;">3,02,42,034</td><td style="padding:8px 12px;text-align:right;">3,22,37,000</td></tr>
    <tr style="background:#FFCCBC;font-weight:700;"><td style="padding:8px 12px;">Total</td><td style="padding:8px 12px;text-align:right;">6,16,04,037</td><td style="padding:8px 12px;text-align:right;">7,12,01,000</td></tr>
  </tbody>
</table>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:22px;">🏭 Mail Processing Infrastructure</h3>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-bottom:14px;">
  <div style="background:#FFF3E0;border-radius:8px;padding:12px;border-left:4px solid #E65100;">
    <div style="font-weight:700;color:#E65100;font-size:1.2em;">261</div><div style="font-size:.85em;">Speed Post Hubs</div>
  </div>
  <div style="background:#FFF3E0;border-radius:8px;padding:12px;border-left:4px solid #E65100;">
    <div style="font-weight:700;color:#E65100;font-size:1.2em;">260</div><div style="font-size:.85em;">Unregistered Mail Offices</div>
  </div>
  <div style="background:#FFF3E0;border-radius:8px;padding:12px;border-left:4px solid #E65100;">
    <div style="font-weight:700;color:#E65100;font-size:1.2em;">198</div><div style="font-size:.85em;">Business Processing Centres (BPC)</div>
  </div>
  <div style="background:#FFF3E0;border-radius:8px;padding:12px;border-left:4px solid #E65100;">
    <div style="font-weight:700;color:#E65100;font-size:1.2em;">321</div><div style="font-size:.85em;">Transit Mail Offices (TMO)</div>
  </div>
  <div style="background:#FFF3E0;border-radius:8px;padding:12px;border-left:4px solid #E65100;">
    <div style="font-weight:700;color:#E65100;font-size:1.2em;">142</div><div style="font-size:.85em;">BNPL Centres</div>
  </div>
  <div style="background:#FFF3E0;border-radius:8px;padding:12px;border-left:4px solid #E65100;">
    <div style="font-weight:700;color:#E65100;font-size:1.2em;">42</div><div style="font-size:.85em;">RFID-enabled Mail Exchange Hubs</div>
  </div>
</div>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:20px;">🔄 Automated Mail Processing Centres (AMPC)</h3>
<ul>
  <li>AMPCs established in <strong>Delhi and Kolkata</strong> in <strong>2010-11</strong></li>
  <li>Letter Sorting Machine (LSM): capacity <strong>35,000 items/hour</strong></li>
  <li>Mixed Mail Sorter (MMS): capacity <strong>18,000 items/hour</strong></li>
  <li>e-clearance of letter boxes implemented for <strong>53,567</strong> letter boxes (Dec 2025)</li>
</ul>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:20px;">📦 Parcel Hubs & Nodal Delivery Centres</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#E65100;color:#fff;"><th style="padding:8px 12px;text-align:left;">Category</th><th style="padding:8px 12px;text-align:right;">Count</th></tr></thead>
  <tbody>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">Total Parcel Hubs (L-1 + L-2)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">188 (79 L1 + 109 L2)</td></tr>
    <tr><td style="padding:8px 12px;">Semi-Automated Sorting Capacity</td><td style="padding:8px 12px;text-align:right;font-weight:700;">2,500 parcels/hour</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">Semi-Auto Cities</td><td style="padding:8px 12px;text-align:right;">Delhi, Mumbai, Bengaluru, Vijayawada, Jaipur, Kolkata, Lucknow, Hyderabad</td></tr>
    <tr><td style="padding:8px 12px;">Nodal Delivery Centres (NDC) Total</td><td style="padding:8px 12px;text-align:right;font-weight:700;">234</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">NDC — Tier I</td><td style="padding:8px 12px;text-align:right;">73</td></tr>
    <tr><td style="padding:8px 12px;">NDC — Tier II</td><td style="padding:8px 12px;text-align:right;">104</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">NDC — Tier III</td><td style="padding:8px 12px;text-align:right;">57</td></tr>
    <tr><td style="padding:8px 12px;">NDC coverage (PIN codes)</td><td style="padding:8px 12px;text-align:right;font-weight:700;">1,600+</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">NDC share of daily parcel delivery</td><td style="padding:8px 12px;text-align:right;font-weight:700;">~30%</td></tr>
  </tbody>
</table>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:20px;">🚐 Mail Motor Service (MMS)</h3>
<ul>
  <li>Established: <strong>1944</strong></li>
  <li>Fleet: <strong>~2,100 vehicles</strong> (earlier 1,414 + 428 inspection vehicles)</li>
  <li>CNG Mail Vans: <strong>~250</strong> | Electric Vehicles: <strong>2</strong> (more being procured)</li>
  <li>MMS Units: <strong>126 units</strong> across 23 circles (4 Major + 13 Medium + 109 Small workshops)</li>
  <li>Budget 2025-26: <strong>₹15 crore</strong> for new vehicles; <strong>20 EVs</strong> to be procured</li>
  <li>156 vehicles procured under <strong>UPU Quality of Service Fund (QSF)</strong> project</li>
</ul>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:20px;">🛣 Postal Road Transport Network (RTN)</h3>
<ul>
  <li>National routes: <strong>88 (44×2)</strong> covering <strong>62,000+ km per day</strong> (as on 31.12.2024)</li>
  <li>Covers more than <strong>300 cities</strong> across India</li>
  <li>Transhipment Centres: <strong>9</strong> — at Guwahati (Assam), Sagar (MP), Chennai (TN), Siliguri, Nabadiganta (WB), Bengaluru (Karnataka), Ludhiana (Punjab), Golconda (Hyderabad), Nagpur (Maharashtra)</li>
</ul>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:20px;">⛵ Tarang Post (Sea-Link RTN)</h3>
<ul>
  <li>Mail transmitted via <strong>RoPex Ferry</strong> in Gulf of Khambhat</li>
  <li>Inaugurated by MOSC: <strong>20 Jan 2023</strong></li>
  <li>Route: <strong>Hazira (Surat) → Ghogha (Bhavnagar)</strong></li>
  <li>Original distance: 440 km | <strong>Reduced to: 62 km</strong></li>
</ul>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:20px;">📬 International Mail Services</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#BF360C;color:#fff;"><th style="padding:8px 12px;text-align:left;">Service</th><th style="padding:8px 12px;text-align:left;">Coverage/Weight</th></tr></thead>
  <tbody>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">International EMS</td><td style="padding:8px 12px;"><strong>106 countries</strong></td></tr>
    <tr><td style="padding:8px 12px;">Int'l Tracked Packet Service (ITPS)</td><td style="padding:8px 12px;"><strong>85 countries</strong>, up to 5.0 kg</td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">Letter Post</td><td style="padding:8px 12px;"><strong>215</strong> countries; docs up to 2 kg; Literature for Blind up to 7 kg; M Bag up to 30 kg</td></tr>
    <tr><td style="padding:8px 12px;">Small Packets</td><td style="padding:8px 12px;">Up to <strong>2.0 kg</strong></td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">Int'l Speed Post (merchandise + docs)</td><td style="padding:8px 12px;"><strong>100 countries</strong></td></tr>
    <tr><td style="padding:8px 12px;">Int'l Speed Post (docs only)</td><td style="padding:8px 12px;"><strong>6 countries</strong></td></tr>
    <tr style="background:#FBE9E7;"><td style="padding:8px 12px;">Int'l Parcel Service</td><td style="padding:8px 12px;"><strong>191+</strong> destination countries</td></tr>
  </tbody>
</table>

<h3 style="color:#E65100;border-bottom:2px solid #E65100;padding-bottom:6px;margin-top:20px;">🏪 Parcel Packaging & Other Services</h3>
<ul>
  <li>Parcel Packaging Units (PPUs): <strong>2,398</strong> Post Offices (earlier 1,408)</li>
  <li>External Packaging: Boxes, BOPP tapes, strapping rolls</li>
  <li>Internal Packaging: Bubble wrap, airbag, cardboard</li>
  <li><strong>Magazine Post</strong>: Launched <strong>01.04.2022</strong>; <strong>203 publishers</strong> registered; revenue Jan–Dec 2025: <strong>₹7.63 crore</strong></li>
  <li>Magazine Post Rates: Outside municipal area — ₹12 per 200 gm + ₹3/100gm; Within — ₹8/200gm + ₹3/100gm (GST 18% inclusive)</li>
  <li><strong>Click N Book</strong>: Online booking of Speed Post, Registered Articles & Parcels; articles up to <strong>5 kg</strong></li>
</ul>`,

    guru_explanation: `
<div style="background:#FFF3E0;border-left:5px solid #E65100;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#BF360C;">🎯 Logistics — The Exam-Smart Way to Memorise</strong>
</div>

<h4 style="color:#E65100;">Speed Post Traffic — The Peak Year</h4>
<p>Speed Post traffic <strong>peaked in 2023-24</strong> at 67.46 crore articles generating ₹1,837.76 crore revenue. It dipped slightly in 2024-25 (62.14 crore, ₹1,752.54 crore) — this is an important trend for data-based questions.</p>

<h4 style="color:#E65100;">Parcel Hubs — "L1 = 79, L2 = 109, Total = 188"</h4>
<p>Think of it as: <strong>L1 hubs are fewer but larger</strong> (national level, 79 in count) and <strong>L2 hubs are more but smaller</strong> (state/regional level, 109 in count). Together they provide up to 2,500 parcels/hour sorting capacity.</p>

<h4 style="color:#E65100;">The "234 NDC" Rule</h4>
<p>234 Nodal Delivery Centres cover 1,600+ PIN codes across 145 cities (73 Tier-I + 104 Tier-II + 57 Tier-III). They handle ~30% of pan-India daily parcel deliveries. This is India Post's answer to private courier companies' hub-and-spoke model.</p>

<h4 style="color:#E65100;">MMS — Est. 1944, Going Green</h4>
<p>MMS (1944) operates ~2,100 vehicles. The department is going green: 250 CNG vans already running, 20 EVs being procured in FY 2025-26 with ₹15 crore budget.</p>

<h4 style="color:#E65100;">Tarang Post — 440 km → 62 km</h4>
<p>The Tarang Post sea route cuts the mail journey from <strong>440 km (road)</strong> to just <strong>62 km (sea)</strong> between Hazira and Ghogha. A 86% reduction in distance!</p>`,

    practical_example: `
<h4 style="color:#E65100;">Scenario 1: Parcel Route Question</h4>
<p>A parcel booked in Delhi needs to reach Hyderabad. It will pass through: Speed Post Hub (Delhi) → Parcel Hub L1 (Delhi) → Transhipment Centre → Parcel Hub L1 (Hyderabad) → Nodal Delivery Centre → Doorstep delivery via DSS app scan.</p>

<h4 style="color:#E65100;">Scenario 2: Magazine Post Rate Calculation</h4>
<p>A magazine weighing 350 gm is to be sent to a subscriber outside the municipal area. Rate = ₹12 (for first 200 gm) + ₹3×2 (for next 150 gm, counted as 2 × 100 gm slabs) = ₹12 + ₹6 = <strong>₹18</strong> (GST inclusive @ 18%)</p>

<h4 style="color:#E65100;">Scenario 3: Real-Time Delivery Update</h4>
<p>The DSS (Door Step Service) app is downloaded on 1.8 lakh smartphones of postmen/GDS. When a postman delivers an article, he scans and updates the delivery status in real time. BYOD (Bring Your Own Device) scheme: 21,000 personal smartphones registered.</p>`,

    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong>⚡ TOP LOGISTICS EXAM FACTS</strong>
</div>
<ul>
  <li>Speed Post peak traffic: <strong>67.46 crore</strong> (2023-24) | Revenue: ₹1,837.76 crore</li>
  <li>Parcel traffic 2024-25: <strong>7,12,01,000</strong> (7.12 crore total)</li>
  <li>Parcel Hubs: <strong>188</strong> (79 L1 + 109 L2) | Sorting: 2,500/hour</li>
  <li>NDC: <strong>234</strong> | Cities: 145 | PIN codes: 1,600+ | Daily share: 30%</li>
  <li>AMPC: Delhi & Kolkata (2010-11); LSM: <strong>35,000/hr</strong>; MMS: <strong>18,000/hr</strong></li>
  <li>e-clearance letter boxes: <strong>53,567</strong> (Dec 2025)</li>
  <li>Mail Motor Service est.: <strong>1944</strong> | Fleet: ~2,100 vehicles | MMS units: 126</li>
  <li>CNG vans: ~250 | EVs: 2 (20 more in FY26 with ₹15 Cr)</li>
  <li>RTN: <strong>88 national routes</strong>, 62,000+ km/day, 300+ cities</li>
  <li>Transhipment Centres: <strong>9</strong></li>
  <li>Tarang Post: inaugurated <strong>20 Jan 2023</strong>; Hazira → Ghogha; 440 km → <strong>62 km</strong></li>
  <li>Int'l EMS: <strong>106 countries</strong> | Letter Post: <strong>215 countries</strong></li>
  <li>PPUs: <strong>2,398</strong> POs | Magazine Post: launched <strong>01.04.2022</strong>; 203 publishers</li>
  <li>Click N Book: articles up to <strong>5 kg</strong></li>
  <li>DSS App: 1.8 lakh smartphones | BYOD: 21,000 registered</li>
  <li>PM Vishwakarma toolkits delivered: <strong>11.62 lakh</strong> (Sep 2024–Dec 2025)</li>
</ul>`,

    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// ENTRY 5: CITIZEN CENTRIC SERVICES
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Citizen Centric Services: POPSK, Aadhaar, PO-CSC, DNK, PMEGP & More",
    rule_number: "Chapter 4 — Citizen Centric Services",
    act_name: "Post Office Guide Part I",
    category: "Explanation",
    effective_date: new Date("2024-04-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg,#4A148C,#6A1B9A);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;">
  <h2 style="margin:0 0 4px;font-size:1.3em;">🏛 Citizen Centric Services</h2>
  <p style="margin:0;opacity:.85;font-size:.95em;">Passport · Aadhaar · Common Service Centre · Export Kendra · PMEGP · Financial Inclusion</p>
</div>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;">📘 Post Office Passport Seva Kendra (POPSK)</h3>
<ul>
  <li><strong>Pilot commenced:</strong> 25.01.2017 at Metagali PO, Mysuru (Karnataka) & Dahod HPO, Gujarat</li>
  <li><strong>Target:</strong> 491 POPSKs to be set up in phased manner (one per Lok Sabha constituency)</li>
  <li><strong>Operational (31.12.2025):</strong> <strong>452 POPSKs</strong></li>
  <li><strong>Passport applications processed:</strong> <strong>39.15 lakh+</strong></li>
  <li><strong>Police Clearance Certificates (PCC):</strong> <strong>2.03 lakh</strong></li>
  <li><strong>Revenue earned (Jan–Dec 2025):</strong> <strong>₹156.48 crore</strong></li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">🪪 Post Office Aadhaar Updation & Enrollment Centres (UIDAI)</h3>
<ul>
  <li>First Aadhaar Enrollment cum Updation Centre opened: <strong>30.06.2017</strong>, Lucknow</li>
  <li>Total Aadhaar Centres operational: <strong>13,352</strong> (across Post Offices nationwide)</li>
  <li>Aadhaar Centres under APS: <strong>110</strong></li>
  <li>Highest Aadhaar Centre: <strong>Siachin</strong> (operationalized this fiscal year)</li>
  <li>Revenue generated (Jan–Dec 2025): <strong>₹165.03 crore</strong></li>
  <li>Aadhaar enrolments + updates (Jan–Dec 2025): <strong>2.92 crore+</strong></li>
</ul>

<div style="background:#EDE7F6;border-radius:8px;padding:12px 16px;margin:12px 0;">
  <strong>Two Services at Aadhaar Centres:</strong>
  <ol style="margin:6px 0 0;">
    <li><strong>Aadhaar Enrollment:</strong> Electronic capture of demographic & biometric info</li>
    <li><strong>Aadhaar Updation:</strong> (a) Demographic — Name, Email, Mobile, Address, DOB; (b) Biometric — facial image, 10 fingerprints, Iris</li>
  </ol>
</div>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">🌐 Post Office Common Service Centre (PO-CSC)</h3>
<ul>
  <li>Pilot commenced: <strong>May 2020</strong> — 22 POs from 11 Circles</li>
  <li>POs on-boarded as PO-CSC (31.12.2024): <strong>1,43,513</strong></li>
  <li>Services: <strong>G2C (Government to Citizen)</strong> and <strong>B2C (Business to Consumer)</strong></li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">📦 Dak Ghar Niryat Kendra (DNK)</h3>
<ul>
  <li>DNK is an initiative of <strong>DOP and CBIC</strong></li>
  <li>Authorized: <strong>1,013 DNKs</strong> up to district level (operationalized by 31.12.2025)</li>
  <li>North Eastern Region: <strong>122 DNKs</strong> notified</li>
  <li>Exporters file <strong>Portal Bill of Export</strong> electronically, then present parcel at DNK</li>
  <li>Export shipments (FY 2025-26, up to Dec 2025): <strong>4.49 lakh</strong> worth <strong>₹102.57 crore</strong></li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">🏭 PMEGP Verification</h3>
<ul>
  <li>MoU signed: DOP + KVIC on <strong>20.08.2024</strong></li>
  <li>Pan India rollout: <strong>20 Aug 2024</strong> (phased)</li>
  <li>PMEGP units verified (Jan–Dec 2025): <strong>2,04,166</strong></li>
  <li>Purpose: Physical verification of PMEGP units to adjust government subsidy to loan accounts</li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">🚂 India Post Passenger Reservation System</h3>
<ul>
  <li>MoU: DOP + Ministry of Railways on <strong>31.07.2017</strong></li>
  <li>IR-PRS Centres available: <strong>316</strong></li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">📋 KYC Verification (Mutual Fund Investors)</h3>
<ul>
  <li>MoU with UTI: <strong>24.07.2023</strong> | MoU with SUUTI: <strong>23.04.2024</strong></li>
  <li>MoU with Nippon India MF: <strong>03.04.2025</strong> | MoU with SBI MF: <strong>29.04.2025</strong></li>
  <li>MoU with AMFI: <strong>17.07.2025</strong> (KYC for all 50 AMCs registered with AMFI)</li>
  <li>MoU with AMFI for Distribution: <strong>22.08.2025</strong></li>
  <li>MoU with BSE Ltd. for MF Distribution: <strong>12.12.2025</strong></li>
  <li>MoU with SIDBI: <strong>31.12.2025</strong> — Contact Point Verification for Micro Enterprises</li>
  <li>MoU with BSNL: <strong>17.09.2025</strong> — Sale & recharge of BSNL SIM cards</li>
  <li>KYC verifications completed (31.12.2025): <strong>~5 lakh</strong></li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">🎓 Mission Karmayogi & Training</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9em;">
  <thead><tr style="background:#4A148C;color:#fff;"><th style="padding:7px 12px;text-align:left;">Training Institute</th><th style="padding:7px 12px;text-align:left;">Location</th></tr></thead>
  <tbody>
    <tr style="background:#EDE7F6;"><td style="padding:7px 12px;font-weight:700;">RAKNPA (Apex)</td><td style="padding:7px 12px;">Ghaziabad — Five-Star "Outstanding" under NSCSTI</td></tr>
    <tr><td style="padding:7px 12px;">6 PTCs</td><td style="padding:7px 12px;">Darbhanga, Guwahati, Madurai, Mysuru, Saharanpur, Vadodara</td></tr>
    <tr style="background:#EDE7F6;"><td style="padding:7px 12px;">4 RTCs</td><td style="padding:7px 12px;">Bhuvaneshwar, Delhi, Nashik, Hubballi (Karnataka)</td></tr>
    <tr><td style="padding:7px 12px;">6 ZTCs</td><td style="padding:7px 12px;">Delhi, Chennai, Nagpur, Guwahati, Kolkata, Lucknow (for PAOs)</td></tr>
    <tr style="background:#EDE7F6;"><td style="padding:7px 12px;">WTCs</td><td style="padding:7px 12px;"><strong>485</strong></td></tr>
  </tbody>
</table>
<ul style="margin-top:12px;">
  <li><strong>Dak Karmayogi Portal</strong>: Launched <strong>28 June 2022</strong> | Available in <strong>12 Indian languages</strong></li>
  <li>WTDET content model: <strong>Watch, Think, Do, Explore, Test</strong></li>
  <li>Mandatory passing mark: <strong>60%</strong></li>
  <li>Registered on Dak Karmayogi (31.12.2025): <strong>5.02 lakh</strong> employees</li>
  <li>iGOT Karmayogi registrations: <strong>4.54 lakh</strong> | Course completions (iGOT): <strong>56.27 lakh</strong></li>
  <li>Total course enrolments (Dak + iGOT): <strong>1.07 crore</strong> | Completions: 87.32 lakh</li>
  <li>India Post IT 2.0 training: <strong>4,59,366</strong> personnel trained (completed 21.07.2025)</li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">🗓 National Postal Week & World Post Day</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;">
  <thead><tr style="background:#4A148C;color:#fff;"><th style="padding:7px 12px;">Date</th><th style="padding:7px 12px;text-align:left;">Event</th></tr></thead>
  <tbody>
    <tr style="background:#EDE7F6;"><td style="padding:7px 12px;font-weight:700;">Oct 7</td><td style="padding:7px 12px;">Mails & Parcels Day</td></tr>
    <tr><td style="padding:7px 12px;font-weight:700;">Oct 8</td><td style="padding:7px 12px;">Philately Day</td></tr>
    <tr style="background:#EDE7F6;"><td style="padding:7px 12px;font-weight:700;">Oct 9</td><td style="padding:7px 12px;">World Post Day (UPU anniversary)</td></tr>
    <tr><td style="padding:7px 12px;font-weight:700;">Oct 10</td><td style="padding:7px 12px;">Antyodaya Diwas (postal banking & financial inclusion)</td></tr>
    <tr style="background:#EDE7F6;"><td style="padding:7px 12px;font-weight:700;">Oct 11</td><td style="padding:7px 12px;">Vittiya Sashaktikaran Diwas (girl child empowerment)</td></tr>
  </tbody>
</table>
<p>World Post Day 2024 Theme: <strong>"150 Years of Enabling Communication and Empowering Peoples Across Nations"</strong></p>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">📮 Philately</h3>
<ul>
  <li><strong>PAC:</strong> Chaired by Minister for Communications; Co-chaired by MoS Communications; Members include 1 MP (Lok Sabha) + 1 MP (Rajya Sabha) + eminent philatelists</li>
  <li>Commemorative stamps released (Jan–Dec 2024): <strong>43 issues</strong></li>
  <li>Ram Janmabhoomi stamps: <strong>18.01.2024</strong> — set of 6; printed with water & sand from sacred site + sandalwood fragrance + gold foil</li>
  <li>Dhai Akhar Letter Writing Competition: introduced <strong>2017-18</strong>; Theme 2024-25: "The Joy of Writing: Importance of Letters in a Digital Age"</li>
  <li>Meghdoot Award: Certificate + Cash Award <strong>₹21,000/-</strong> + Medallion</li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #4A148C;padding-bottom:6px;margin-top:20px;">💰 Financial Management (FY 2024-25)</h3>
<ul>
  <li>Total Revenue: <strong>₹11,425.24 crore</strong></li>
  <li>Commercial Activities Revenue: <strong>₹4,545.61 crore</strong></li>
  <li>Agency charges (MoF for SB & SC): <strong>₹6,879.63 crore</strong></li>
  <li>Gross Working Expenditure: <strong>₹37,528.49 crore</strong></li>
  <li>Revenue Deficit (FY 2024-25): <strong>₹24,915.20 crore</strong></li>
</ul>`,

    guru_explanation: `
<div style="background:#F3E5F5;border-left:5px solid #6A1B9A;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#4A148C;">🎯 Citizen Services — Connecting Every Indian to Government</strong>
</div>

<h4 style="color:#4A148C;">POPSK — "Passport at your Post Office"</h4>
<p>The big idea: instead of going to a PSK (Passport Seva Kendra) of MEA which may be far away, citizens can go to their nearest Head Post Office for passport services. The pilot started at Mysuru in 2017 and now 452 POPSKs are operational. Target: every Lok Sabha constituency (total 543 → target 491 POPSKs).</p>

<h4 style="color:#4A148C;">Aadhaar at Siachin — The Highest in the Country</h4>
<p>The Aadhaar centre at <strong>Siachin</strong> is now the highest altitude Aadhaar centre in India. This shows India Post's commitment to serving even the most remote locations.</p>

<h4 style="color:#4A148C;">DNK — "Export From Your Doorstep"</h4>
<p>A small weaver in Varanasi can now export handloom sarees directly through the <strong>Dak Ghar Niryat Kendra</strong> at their local post office, without needing a custom broker. They file a <strong>Portal Bill of Export</strong> online and drop the parcel at the DNK. India Post handles the rest.</p>

<h4 style="color:#4A148C;">Mission Karmayogi — The "WTDET" Training</h4>
<p>Every postal employee learns through the Dak Karmayogi portal using the <strong>WTDET</strong> methodology: Watch → Think → Do → Explore → Test. Passing mark is 60%. The portal is in 12 languages so GDS in any state can learn in their own language.</p>

<h4 style="color:#4A148C;">Revenue Deficit — Why India Post "Loses Money"</h4>
<p>Revenue is ₹11,425 crore but expenditure is ₹37,528 crore — deficit of ₹24,915 crore. But this deficit is <strong>deliberate social policy</strong> — India Post serves 6,083 people per rural PO at subsidized rates to ensure universal service. The government funds this deficit as a public good.</p>`,

    practical_example: `
<h4 style="color:#E65100;">Scenario 1: Small Exporter Using DNK</h4>
<p>Sunita, a handicraft maker in Jaipur, wants to export 5 kg of brass items to Germany. She logs onto the CBIC portal, files a <strong>Portal Bill of Export</strong>, and walks to her nearest DNK. India Post's international parcel service handles the rest. The DNK has operationalized 1,013 such export facilitation points across India.</p>

<h4 style="color:#E65100;">Scenario 2: Passport Application at POPSK</h4>
<p>Rajan in a small town needs a passport. The nearest PSK is 80 km away. He visits his local HPO which has a <strong>POPSK</strong>. He submits documents, gets appointment, biometrics captured — all at the post office. His passport is mailed to his address within the promised timeline. As on 31.12.2025, 452 such centres have processed 39.15 lakh applications.</p>

<h4 style="color:#E65100;">Scenario 3: Mutual Fund via Post Office</h4>
<p>Following the MoU with BSE Ltd. (12.12.2025), a rural investor can now buy mutual funds at a post office using BSE's StAR MF platform. The postman helps with KYC verification. This brings formal investment access to India's remotest villages through India Post's 1.64 lakh PO network.</p>`,

    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong>⚡ TOP CITIZEN SERVICES EXAM FACTS</strong>
</div>
<ul>
  <li>POPSK pilot: <strong>25.01.2017</strong>, Mysuru & Dahod | Operational: <strong>452</strong> (target 491)</li>
  <li>Passport applications processed: <strong>39.15 lakh+</strong> | Revenue: <strong>₹156.48 crore</strong></li>
  <li>First Aadhaar centre: <strong>30.06.2017</strong>, Lucknow | Total: <strong>13,352</strong></li>
  <li>Highest Aadhaar centre: <strong>Siachin</strong> | APS centres: 110</li>
  <li>Aadhaar revenue (Jan–Dec 2025): <strong>₹165.03 crore</strong> | 2.92 crore transactions</li>
  <li>PO-CSC pilot: <strong>May 2020</strong> (22 POs, 11 circles) | Onboarded: <strong>1,43,513</strong> POs</li>
  <li>DNK: <strong>1,013</strong> authorized | Export value FY26: ₹102.57 crore (4.49 lakh shipments)</li>
  <li>PMEGP MoU with KVIC: <strong>20.08.2024</strong> | Units verified (Jan–Dec 2025): <strong>2,04,166</strong></li>
  <li>IR-PRS MoU: <strong>31.07.2017</strong> | Centres: <strong>316</strong></li>
  <li>AMFI MoU: <strong>17.07.2025</strong> | BSNL MoU: <strong>17.09.2025</strong> | SIDBI MoU: <strong>31.12.2025</strong></li>
  <li>Dak Karmayogi Portal: launched <strong>28 June 2022</strong> | Languages: <strong>12</strong> | Pass: 60%</li>
  <li>RAKNPA: First Central Training Institute with Five-Star NSCSTI accreditation</li>
  <li>PTCs: 6 | RTCs: 4 | ZTCs: 6 | WTCs: 485</li>
  <li>India Post IT 2.0 personnel trained: <strong>4,59,366</strong> (completed 21.07.2025)</li>
  <li>World Post Day: <strong>9 October</strong> | National Postal Week: 7–11 October</li>
  <li>PAC chaired by: <strong>Minister for Communications</strong></li>
  <li>Meghdoot Award cash: <strong>₹21,000/-</strong></li>
  <li>Dhai Akhar: introduced <strong>2017-18</strong></li>
  <li>Revenue (FY 2024-25): ₹11,425.24 Cr | Deficit: <strong>₹24,915.20 crore</strong></li>
  <li>Special Campaign 5.0: 2–31 Oct 2025 | 17,352 files weeded | 1 lakh+ grievances disposed</li>
  <li>CPGRAMS resolution: reduced to <strong>7 days</strong> (2025)</li>
  <li>Har Ghar Tiranga 2025: <strong>28,13,627</strong> National Flags distributed</li>
  <li>Sukanya Samriddhi: Min ₹250, Max ₹1,50,000/yr, period up to <strong>15 years</strong>; accounts: 3.533 crore</li>
</ul>`,

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
        for (const entry of entries) {
            // Check for duplicate title
            const exists = await col.findOne({ title: entry.title });
            if (exists) {
                console.log(`⏭  Skipped (already exists): ${entry.title}`);
                continue;
            }
            await col.insertOne(entry);
            console.log(`✅ Inserted: ${entry.title}`);
            inserted++;
        }
        console.log(`\n🎉 Done! ${inserted} new entries inserted out of ${entries.length} total.`);
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();
    }
}

main();
