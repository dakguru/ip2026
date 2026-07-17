/**
 * Seed: Dak Sutra — Postal Manual Volume II, Chapter 1 (Organisation)
 * Source: DakSutra_PMVol2_Ch1_Organisation.docx (verified as on 13 July 2026)
 * Run: node scripts/seed-dak-sutra-pm-vol2-ch1-organisation.js
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
    // DAK SUTRA — PM VOL II, CHAPTER 1: ORGANISATION OF THE DEPARTMENT OF POSTS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Organisation of the Department of Posts — Complete Guide",
        rule_number: "Chapter 1 — Postal Manual Vol II",
        act_name: "Postal Manual Volume II",
        category: "Rule",
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85;color:#1a1a2e">

  <div style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);color:#fff;padding:20px 26px;border-radius:12px;margin-bottom:24px;box-shadow:0 4px 15px rgba(21,101,192,0.4)">
    <h2 style="margin:0 0 6px;font-size:1.45rem;letter-spacing:0.5px">🏛️ ORGANISATION OF THE DEPARTMENT OF POSTS</h2>
    <p style="margin:0;font-size:0.95rem;opacity:0.92">Organisation, Establishment &amp; General Administration &nbsp;|&nbsp; Chapter 1, Postal Manual Volume II</p>
  </div>

  <!-- SECTION 1: OFFICIAL PROVISION -->
  <div style="background:#e8f5e9;border-left:6px solid #2e7d32;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 14px;font-size:1.1rem">📋 1. Official Provision</h3>
    <p style="margin:0 0 10px;font-size:0.95rem">The <strong>Department of Posts (DoP)</strong>, branded <strong>India Post</strong>, functions under the <strong>Ministry of Communications</strong>, Government of India. It is one of the <strong>two Departments</strong> of the Ministry — the other being the <strong>Department of Telecommunications</strong>. Its organisational and administrative framework flows from the political executive at the apex down to the field formations that deliver postal services.</p>
    <p style="margin:0;font-size:0.9rem;color:#33691e"><strong>Basis:</strong> Postal Manual Vol II, Chapter 1 (structural framework), read with India Post — "Our Organisation", indiapost.gov.in. Statutory backdrop: the <strong>Post Office Act, 2023</strong> (in force <strong>18 June 2024</strong>), which repealed the Indian Post Office Act, 1898.</p>
  </div>

  <!-- SECTION 2: CHAIN OF COMMAND -->
  <div style="background:#e3f2fd;border-left:6px solid #1565c0;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#0d47a1;margin:0 0 14px;font-size:1.1rem">⛓️ 2. The Chain of Command (Apex → Field)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#1565c0;color:#fff">
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left;width:40%">Level</th>
          <th style="padding:10px 14px;border:1px solid #90caf9;text-align:left">Held / Headed by</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Political executive</td><td style="border:1px solid #bbdefb;padding:9px 14px">Minister of Communications (Cabinet) + Minister of State</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Administrative head</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Secretary (Posts)</strong> &amp; Chairperson, Postal Services Board</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Apex management body</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Postal Services Board</strong> (Chairperson + 7 Members)</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Circle</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Chief Postmaster General (CPMG)</strong></td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Region</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Postmaster General (PMG)</strong></td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Division (Postal / RMS)</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>SP / SSP</strong> (or <strong>SRM / SSRM</strong> for RMS)</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Sub-Division</td><td style="border:1px solid #bbdefb;padding:9px 14px"><strong>Inspector of Posts (IP)</strong> / Assistant Supdt. of Posts (ASP)</td></tr>
        <tr style="background:#f0f7ff"><td style="border:1px solid #bbdefb;padding:9px 14px;font-weight:bold;color:#0d47a1">Post Offices</td><td style="border:1px solid #bbdefb;padding:9px 14px">Head Office (HO), Sub Office (SO), Branch Office (BO)</td></tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: POSTAL SERVICES BOARD -->
  <div style="background:#f3e5f5;border-left:6px solid #6a1b9a;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 14px;font-size:1.1rem">🏢 3. Postal Services Board (PSB) — Chairperson + 7 Members</h3>
    <p style="margin:0 0 12px;font-size:0.93rem">The PSB is the <strong>apex management body</strong> of the Department. The seven Members hold the following portfolios:</p>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#6a1b9a;color:#fff">
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:center;width:8%">#</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Member Portfolio</th>
          <th style="padding:10px 14px;border:1px solid #ce93d8;text-align:left">Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold">1</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Personnel</td><td style="border:1px solid #e1bee7;padding:9px 14px">Establishment, cadre, discipline</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold">2</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Operations</td><td style="border:1px solid #e1bee7;padding:9px 14px">Mail operations &amp; delivery network</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold">3</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Technology</td><td style="border:1px solid #e1bee7;padding:9px 14px">Technology &amp; Estates</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold">4</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Financial Services</td><td style="border:1px solid #e1bee7;padding:9px 14px">POSB, small savings, IPPB interface</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold">5</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">HRD</td><td style="border:1px solid #e1bee7;padding:9px 14px">Human Resource Development &amp; training</td></tr>
        <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold">6</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Infrastructure</td><td style="border:1px solid #e1bee7;padding:9px 14px">Buildings, estates, capital works</td></tr>
        <tr><td style="border:1px solid #e1bee7;padding:9px 14px;text-align:center;font-weight:bold">7</td><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;color:#4a148c">Service Quality &amp; Marketing</td><td style="border:1px solid #e1bee7;padding:9px 14px">Customer satisfaction, philately, media</td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.9rem"><strong>Permanent invitee:</strong> Additional Secretary &amp; Financial Advisor. The Board is assisted by a <strong>Secretary to the Board</strong> (a senior Directorate officer).</p>
  </div>

  <!-- SECTION 4: 23 CIRCLES -->
  <div style="background:#fff3e0;border-left:6px solid #e65100;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#bf360c;margin:0 0 14px;font-size:1.1rem">🗺️ 4. Administrative Jurisdictions — 23 Postal Circles</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
      <thead>
        <tr style="background:#e65100;color:#fff">
          <th style="padding:9px 12px;border:1px solid #ffcc80;text-align:left">Circle</th>
          <th style="padding:9px 12px;border:1px solid #ffcc80;text-align:left">Headquarters</th>
          <th style="padding:9px 12px;border:1px solid #ffcc80;text-align:left">Jurisdiction</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Andhra Pradesh</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Vijayawada</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Andhra Pradesh</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Assam</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Guwahati</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Assam</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Bihar</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Patna</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Bihar</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Chhattisgarh</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Raipur</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Chhattisgarh</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Delhi</td><td style="border:1px solid #ffe0b2;padding:8px 12px">New Delhi</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Delhi</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Gujarat</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Ahmedabad</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>Gujarat + Daman &amp; Diu + D&amp;NH</strong></td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Haryana</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Ambala</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Haryana</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Himachal Pradesh</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Shimla</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Himachal Pradesh</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">J &amp; K</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Srinagar / Jammu</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>J&amp;K + Ladakh</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Jharkhand</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Ranchi</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Jharkhand</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Karnataka</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Bengaluru</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Karnataka</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Kerala</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Thiruvananthapuram</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>Kerala + Lakshadweep</strong></td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Madhya Pradesh</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Bhopal</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Madhya Pradesh</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Maharashtra</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Mumbai</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>Maharashtra + Goa</strong></td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">North East</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Shillong</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Tripura</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Odisha</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Bhubaneswar</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Odisha</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Punjab</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Chandigarh</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>Punjab + Chandigarh</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Rajasthan</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Jaipur</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Rajasthan</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Tamil Nadu</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Chennai</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>Tamil Nadu + Puducherry</strong></td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Telangana</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Hyderabad</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Telangana</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Uttar Pradesh</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Lucknow</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Uttar Pradesh</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">Uttarakhand</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Dehradun</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Uttarakhand</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px 12px;font-weight:bold">West Bengal</td><td style="border:1px solid #ffe0b2;padding:8px 12px">Kolkata</td><td style="border:1px solid #ffe0b2;padding:8px 12px"><strong>WB + Sikkim + A&amp;N Islands</strong></td></tr>
      </tbody>
    </table>
    <p style="margin:12px 0 0;font-size:0.9rem">A <strong>24th, non-territorial Base Circle</strong> runs the <strong>Army Postal Service</strong>, headed by the <strong>Additional Director General, APS</strong> (rank of <strong>Major General</strong>).</p>
  </div>

  <!-- SECTION 5: SUPPORT & TRAINING UNITS -->
  <div style="background:#e0f7fa;border-left:6px solid #00695c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 14px;font-size:1.1rem">🏭 5. Key Support &amp; Training Units</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.93rem">
      <thead>
        <tr style="background:#00695c;color:#fff">
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left;width:40%">Unit</th>
          <th style="padding:10px 14px;border:1px solid #80cbc4;text-align:left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Postal Stores Depots (PSD) — 5</td><td style="border:1px solid #b2dfdb;padding:9px 14px">Aligarh, Nashik, Bhubaneswar, Thrissur, Kolkata</td></tr>
        <tr style="background:#f0fdfa"><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Security Printing Presses — 2</td><td style="border:1px solid #b2dfdb;padding:9px 14px">Nashik &amp; Hyderabad</td></tr>
        <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Zonal Returned Letter Offices — 4</td><td style="border:1px solid #b2dfdb;padding:9px 14px">Kolkata (E), Mumbai (W), Lucknow (N), Chennai (S)</td></tr>
        <tr style="background:#f0fdfa"><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Apex training academy</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>RAKNPA, Ghaziabad</strong> (PIN 201 002)</td></tr>
        <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Postal Training Centres — 6</td><td style="border:1px solid #b2dfdb;padding:9px 14px">Guwahati, Vadodara, Mysuru, Madurai, Saharanpur, Darbhanga</td></tr>
      </tbody>
    </table>
  </div>

  <!-- VERIFICATION & SOURCE NOTE -->
  <div style="background:#eceff1;border-left:6px solid #455a64;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:8px">
    <h3 style="color:#263238;margin:0 0 10px;font-size:1.05rem">✅ Verification &amp; Source Note</h3>
    <p style="margin:0 0 8px;font-size:0.9rem"><strong>Verified as on:</strong> 13 July 2026. <strong>Primary sources:</strong> India Post — "Our Organisation", indiapost.gov.in (Board composition; 23 Circles); RAKNPA / DoP training-centre listings; Post Office Act, 2023 (in force 18 June 2024); Postal Manual Vol II, Chapter 1.</p>
    <p style="margin:0;font-size:0.88rem;color:#546e7a"><strong>Flagged items</strong> (confirm against the latest Directorate position): (1) the current org chart shows the <em>Secretary &amp; Chairperson PSB</em> and the <em>DG Postal Services</em> as distinct office-holders, whereas the historical position treated them as one; (2) the APS other-ranks 75% : 25% split is carried from the source booklet; (3) Circle-HQ cells are carried from the source table.</p>
  </div>

</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1.5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 10px">🧠 Dak Guru Explains — The Pyramid</h3>
    <p style="margin:0 0 10px">Think of the Department as a <strong>pyramid</strong>. At the very top sit the political executive (the Minister and MoS) — they set policy but do not run day-to-day postal work. Directly below is a single senior civil servant of the rank of <strong>Secretary to the Government of India</strong>, who is the administrative head and the ex-officio <strong>Chairperson of the Postal Services Board</strong>. The Board, with its seven Members, is the collective brain that manages the network.</p>
    <p style="margin:0">Below the Directorate, the country is carved into <strong>23 territorial Circles</strong> — usually one per State — each run by a CPMG. A Circle splits into <strong>Regions</strong> (PMG), a Region into <strong>Divisions</strong> (SP/SSP), a Division into <strong>Sub-Divisions</strong> (IP/ASP), and finally into the <strong>Post Offices</strong> (HO → SO → BO) where the public is served. A 24th, non-territorial <strong>Base Circle</strong> runs the Army Postal Service separately.</p>
  </div>

  <div style="background:#fff8e1;border:1.5px solid #f9a825;border-radius:10px;padding:16px 20px;margin-bottom:20px">
    <h4 style="color:#f57f17;margin:0 0 10px">⚠️ Verified — Read This Carefully</h4>
    <p style="margin:0 0 8px;font-size:0.93rem">Older notes say the <strong>Secretary (Posts)</strong>, the <strong>Director General Postal Services</strong> and the <strong>Chairperson PSB</strong> are one and the same person. That reflects the <em>historical</em> arrangement, where the Secretary was ex-officio DG.</p>
    <p style="margin:0;font-size:0.93rem">As currently constituted, India Post's "Our Organisation" page lists the <strong>Secretary, DoP &amp; Chairperson, PSB</strong> and the <strong>Director General Postal Services</strong> as <strong>two distinct office-holders</strong> / Board members. <strong>Safest exam line:</strong> the Secretary is the <em>administrative head and Chairperson PSB</em>; the DG Postal Services is the <em>operational head</em> — treat the current Directorate org chart as authoritative and confirm on exam day.</p>
  </div>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">🪜 Step-by-Step — Tracing Administrative Control</h4>
  <ol style="margin:0 0 20px;padding-left:22px;font-size:0.93rem">
    <li style="margin-bottom:7px"><strong>Directorate</strong> (Secretary / DG &amp; PSB) — apex policy and control.</li>
    <li style="margin-bottom:7px"><strong>Circle Office</strong> — CPMG exercises control over the whole Circle.</li>
    <li style="margin-bottom:7px"><strong>Regional Office</strong> — PMG supervises a group of Divisions.</li>
    <li style="margin-bottom:7px"><strong>Divisional Office</strong> — SP/SSP (or SRM/SSRM) manages field operations.</li>
    <li style="margin-bottom:7px"><strong>Sub-Division</strong> — IP/ASP inspects and controls a cluster of offices.</li>
    <li style="margin-bottom:7px"><strong>Post Offices</strong> — HO controls its SOs; each SO controls its account BOs.</li>
  </ol>

  <h4 style="color:#0d47a1;border-bottom:2px solid #0d47a1;padding-bottom:4px">👤 Who Heads What — Roles &amp; Jurisdiction</h4>
  <ul style="margin:0 0 20px;padding-left:20px;font-size:0.93rem">
    <li style="margin-bottom:7px"><strong>Circle</strong> → Chief Postmaster General (CPMG); usually co-terminus with a State.</li>
    <li style="margin-bottom:7px"><strong>Region</strong> → Postmaster General (PMG).</li>
    <li style="margin-bottom:7px"><strong>Postal / RMS Division</strong> → SP/SSP of Post Offices, or SRM/SSRM of RMS.</li>
    <li style="margin-bottom:7px"><strong>Sub-Division</strong> → Inspector of Posts (IP) or ASP.</li>
    <li style="margin-bottom:7px"><strong>Base Circle (APS)</strong> → Additional Director General, Army Postal Service (rank of <strong>Major General</strong>).</li>
    <li style="margin-bottom:7px"><strong>RAKNPA, Ghaziabad</strong> → apex academy for IPoS Group 'A' and Group 'B' officers.</li>
  </ul>

  <h4 style="color:#4a148c;border-bottom:2px solid #4a148c;padding-bottom:4px">⚖️ Key Distinctions</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:4px">
    <thead>
      <tr style="background:#4a148c;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left;width:38%">Concept</th>
        <th style="padding:9px 14px;border:1px solid #ce93d8;text-align:left">Distinction</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Secretary vs DG Postal Services</td><td style="border:1px solid #e1bee7;padding:8px 14px">Administrative head &amp; Chairperson PSB vs operational head of the network (currently shown as distinct office-holders — flag)</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Circle vs Region vs Division</td><td style="border:1px solid #e1bee7;padding:8px 14px">CPMG vs PMG vs SP/SSP</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Division vs Sub-Division</td><td style="border:1px solid #e1bee7;padding:8px 14px">Headed by SP/SSP vs by IP/ASP</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">Territorial Circle vs Base Circle</td><td style="border:1px solid #e1bee7;padding:8px 14px">23 State-based Circles vs 1 APS Circle for the Armed Forces</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">RAKNPA vs PTC</td><td style="border:1px solid #e1bee7;padding:8px 14px">Apex academy (Group A &amp; B) vs regional centres (Group B &amp; C)</td></tr>
      <tr style="background:#faf5ff"><td style="border:1px solid #e1bee7;padding:8px 14px;font-weight:bold">PSD vs Security Press</td><td style="border:1px solid #e1bee7;padding:8px 14px">Stores/forms depot vs printing of stamps &amp; security stationery</td></tr>
    </tbody>
  </table>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;border-bottom:2px solid #00695c;padding-bottom:4px">📦 Practical Examples &amp; Case Studies</h4>

  <div style="background:#e0f2f1;border-left:5px solid #00695c;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:16px">
    <p style="margin:0 0 6px;font-weight:bold;color:#004d40">Case 1 — Placing your own Division on the map</p>
    <p style="margin:0;font-size:0.93rem">Erode Division is a Postal Division headed by an <strong>SP</strong>. It sits inside the <strong>Tamil Nadu Circle</strong> (HQ Chennai), under a Region headed by a <strong>PMG</strong>. Above that: the <strong>CPMG</strong> (Circle) → the <strong>Directorate</strong> (Secretary/DG &amp; PSB). This single ladder answers most "who controls whom" questions.</p>
  </div>

  <div style="background:#e8eaf6;border-left:5px solid #283593;border-radius:0 8px 8px 0;padding:14px 18px">
    <p style="margin:0 0 6px;font-weight:bold;color:#1a237e">Case 2 — Territorial vs Base Circle</p>
    <p style="margin:0;font-size:0.93rem">A soldier's letter is handled by <strong>APS field post offices</strong> under the <strong>Base Circle</strong>, not by the territorial Circle where the unit is located. The Base Circle is counted <strong>separately</strong> from the 23 territorial Circles.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 20px;border-radius:8px;margin-bottom:20px">
    <h4 style="color:#0d47a1;margin:0 0 12px">🎯 Exam Insight — How This Chapter Is Asked</h4>
    <ul style="margin:0;padding-left:18px;font-size:0.93rem">
      <li style="margin-bottom:7px"><strong>"How many Postal Circles?"</strong> — answer <strong>23 (territorial)</strong>. If the option adds the Base Circle, the total is <strong>24</strong>.</li>
      <li style="margin-bottom:7px"><strong>Board composition</strong> — Chairperson + <strong>7 Members</strong>; know the seven portfolios in order.</li>
      <li style="margin-bottom:7px"><strong>Training set-up</strong> — <strong>1 apex academy (RAKNPA) + 6 PTCs</strong> is a favourite one-liner.</li>
      <li style="margin-bottom:7px"><strong>Circle jurisdiction traps</strong> — Kerala includes <strong>Lakshadweep</strong>; WB includes <strong>Sikkim + A&amp;N</strong>; Maharashtra includes <strong>Goa</strong>; TN includes <strong>Puducherry</strong>; Gujarat includes <strong>Daman &amp; Diu + D&amp;NH</strong>; Punjab includes <strong>Chandigarh</strong>; NE Circle = <strong>six States</strong>.</li>
    </ul>
  </div>

  <h4 style="color:#c62828;border-bottom:2px solid #c62828;padding-bottom:4px">🔢 Numerical Data — Must-Memorise Figures</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:20px">
    <thead>
      <tr style="background:#c62828;color:#fff">
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:left">Item</th>
        <th style="padding:9px 14px;border:1px solid #ef9a9a;text-align:center;width:32%">Figure</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Departments in Ministry of Communications</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">2 (Posts + Telecom)</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Territorial Postal Circles</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">23</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Base Circle (Army Postal Service)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">1 (the 24th Circle)</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Members of Postal Services Board</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">7 (+ Chairperson)</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Postal Stores Depots</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">5</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Security Printing Presses</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">2</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Zonal Returned Letter Offices</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">4</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Postal Training Centres (PTCs)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">6</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">Apex training academy (RAKNPA)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">1</td></tr>
      <tr style="background:#fff5f5"><td style="border:1px solid #ffcdd2;padding:8px 14px">Rank of ADG, Army Postal Service</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">Major General</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px 14px">APS other-ranks: DoP vs Army (per source)</td><td style="border:1px solid #ffcdd2;padding:8px 14px;text-align:center;font-weight:bold;color:#b71c1c">75% : 25%</td></tr>
    </tbody>
  </table>

  <div style="background:#e8eaf6;border-left:5px solid #283593;padding:14px 20px;border-radius:8px">
    <h4 style="color:#1a237e;margin:0 0 12px">📝 Ultra-Revision Card</h4>
    <div style="display:grid;gap:6px;font-size:0.9rem">
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #1565c0"><strong>DoP</strong> = 1 of 2 Departments under the Ministry of Communications (other = DoT).</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #2e7d32"><strong>Apex body</strong> = Postal Services Board = Chairperson + 7 Members. <strong>Permanent invitee</strong> = Addl. Secretary &amp; Financial Advisor.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #e65100"><strong>7 portfolios:</strong> Personnel, Operations, Technology, Financial Services, HRD, Infrastructure, Service Quality &amp; Marketing.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #6a1b9a"><strong>23 territorial Circles + 1 Base Circle (APS) = 24.</strong></div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #c62828"><strong>Field ladder:</strong> Circle (CPMG) → Region (PMG) → Division (SP/SSP) → Sub-Division (IP/ASP) → HO/SO/BO.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #00695c"><strong>PSDs (5):</strong> Aligarh, Nashik, Bhubaneswar, Thrissur, Kolkata. <strong>Presses (2):</strong> Nashik &amp; Hyderabad. <strong>RLOs (4):</strong> Kolkata, Mumbai, Lucknow, Chennai.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #4a148c"><strong>RAKNPA Ghaziabad + 6 PTCs:</strong> Guwahati, Vadodara, Mysuru, Madurai, Saharanpur, Darbhanga.</div>
      <div style="background:#fff;border-radius:6px;padding:8px 12px;border-left:4px solid #37474f"><strong>ADG, Army Postal Service</strong> = rank of Major General.</div>
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
