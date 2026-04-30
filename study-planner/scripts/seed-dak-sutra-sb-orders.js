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
// CARD 1: NEW SCHEMES & LIMIT ENHANCEMENTS
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "SB Orders 2019-2025: Scheme Limit Enhancements & Tax Updates",
    rule_number: "SB Orders 06/2023, 05/2021, 13/2019",
    act_name: "SB Orders on POSB Procedures",
    category: "Explanation",
    effective_date: new Date("2025-01-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #FF6F00, #F57F17);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    Major Financial Enhancements & Citations
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Mahila Samman, SCSS/MIS Enhancements & TDS Orders</p>
</div>

<h3 style="color:#E65100;border-bottom:2px solid #FFE0B2;padding-bottom:6px;margin-top:24px;">📈 1. Scheme Limit Enhancements (SB Order 06/2023)</h3>
<p>Through <strong>SB Order 06/2023</strong>, significant limit enhancements were introduced for key schemes:</p>
<div style="overflow-x:auto;">
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #FFE0B2;border-radius: 8px;overflow:hidden;">
  <thead>
    <tr style="background:#FF9800;color:#fff;">
      <th style="padding:12px;text-align:left;">Scheme</th>
      <th style="padding:12px;text-align:left;">Old Limit</th>
      <th style="padding:12px;text-align:left;background:#F57C00;">New Enhanced Limit</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#FFF3E0;border-bottom: 1px solid #FFE0B2;">
      <td style="padding:12px;font-weight:700;">SCSS (Senior Citizen)</td>
      <td style="padding:12px;">₹ 15 Lakh</td>
      <td style="padding:12px;font-weight:700;color:#E65100;">₹ 30 Lakh</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFE0B2;">
      <td style="padding:12px;font-weight:700;">MIS (Single Account)</td>
      <td style="padding:12px;">₹ 4.5 Lakh</td>
      <td style="padding:12px;font-weight:700;color:#E65100;">₹ 9 Lakh</td>
    </tr>
    <tr style="background:#FFF3E0;">
      <td style="padding:12px;font-weight:700;">MIS (Joint Account)</td>
      <td style="padding:12px;">₹ 9 Lakh</td>
      <td style="padding:12px;font-weight:700;color:#E65100;">₹ 15 Lakh</td>
    </tr>
  </tbody>
</table>
</div>

<h3 style="color:#E65100;border-bottom:2px solid #FFE0B2;padding-bottom:6px;margin-top:24px;">👩 2. Mahila Samman Savings Certificate (MSSC), 2023</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px;">
    <div style="background:#FFF8E1;padding:15px;border-radius:10px;border-left:5px solid #FFC107;">
        <h4 style="margin-top:0;color:#FF8F00;">Partial Withdrawal</h4>
        <p style="margin:0;font-size:0.95em;">Allowed up to <strong>40%</strong> of the eligible balance after <strong>one year</strong> from the date of opening.</p>
    </div>
    <div style="background:#FFEBEE;padding:15px;border-radius:10px;border-left:5px solid #F44336;">
        <h4 style="margin-top:0;color:#D32F2F;">Premature Closure</h4>
        <p style="margin:0;font-size:0.95em;">If closed after 6 months (non-compassionate), interest is paid at <strong>Scheme Rate minus 2%</strong> (i.e. 5.5%).</p>
    </div>
</div>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li><strong>Time Gap:</strong> Mandatory gap of <strong>3 months</strong> between opening a new MSSC and an existing one.</li>
    <li><strong>Tax Benefit:</strong> Investment does <strong>NOT</strong> qualify for Section 80C rebate.</li>
</ul>

<h3 style="color:#E65100;border-bottom:2px solid #FFE0B2;padding-bottom:6px;margin-top:24px;">🧾 3. Crucial TDS & Interest Rate Orders</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;margin-top:10px;">
  <tbody>
    <tr style="border-bottom:1px solid #EEE;background:#FFF3E0;">
      <td style="padding:10px;font-weight:bold;width:40%;">TDS on Agent Commission</td>
      <td style="padding:10px;">Revised to <strong>2%</strong> (from 5%) w.e.f. <strong>01.10.2024</strong> (Section 194-H).</td>
    </tr>
    <tr style="border-bottom:1px solid #EEE;">
      <td style="padding:10px;font-weight:bold;">TDS Sec 194N (SB Order 05/2021)</td>
      <td style="padding:10px;"><strong>2% TDS</strong> on cash withdrawals > ₹20 Lakhs (up to ₹1 Cr) for persons who have <strong>NOT</strong> filed ITR for 3 years.</td>
    </tr>
    <tr style="background:#FFF3E0;border-bottom: 1px solid #FFE0B2;">
      <td style="padding:10px;font-weight:bold;">Senior Citizen TDS Threshold</td>
      <td style="padding:10px;">From 2025-26, TDS deductible only if interest exceeds <strong>₹ 1,00,000</strong>.</td>
    </tr>
    <tr style="border-bottom: 1px solid #FFE0B2;">
      <td style="padding:10px;font-weight:bold;">PPF Deposits (SB Order 13/2019)</td>
      <td style="padding:10px;">Subsequent deposits in PPF must be in multiples of <strong>₹ 50</strong>.</td>
    </tr>
    <tr style="background:#FFF3E0;border-bottom: 1px solid #FFE0B2;">
      <td style="padding:10px;font-weight:bold;">NRI PPF Accounts</td>
      <td style="padding:10px;">Accounts extended by NRIs without proper Form H residency status will earn <strong>zero percent</strong> interest from Oct 1, 2024.</td>
    </tr>
    <tr>
      <td style="padding:10px;font-weight:bold;">KVP Maturity Period</td>
      <td style="padding:10px;">For KVP issued between 01.01.2024 and 01.07.2025, the amount doubles in <strong>115 months</strong>.</td>
    </tr>
  </tbody>
</table>
`,
    guru_explanation: `
<div style="background:#E8F5E9;border-left:5px solid #2E7D32;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#1B5E20;">🧠 Memorize the Orders</strong>
</div>

<h4 style="color:#2E7D32;">The "Big Enhancements" Order</h4>
<p><strong>SB Order 06/2023</strong> is the golden order that brought joy to investors by doubling the SCSS limit (to ₹30 Lakh) and Single MIS limit (to ₹9 Lakh).</p>

<h4 style="color:#2E7D32;">TDS Traps</h4>
<p><strong>SB Order 05/2021</strong> tackles Section 194N (Cash withdrawals for non-ITR filers). Remember <strong>2% above ₹20 Lakhs</strong>. Also, remember the recent update where the TDS rate on agent commission was slashed from 5% to <strong>2%</strong> w.e.f Oct 1, 2024.</p>

<h4 style="color:#2E7D32;">MSSC "40-2-3" Rule</h4>
<p>40% withdrawal after 1 year. 2% penalty for early closure. 3 months gap between accounts. And strictly NO 80C tax rebate.</p>
`,
    practical_example: `
<h4 style="color:#FF6F00;">Scenario: Agent Commission TDS Deduction</h4>
<p>An MPKBY agent earns ₹20,000 commission in November 2024. Because it's after Oct 1, 2024, the TDS deducted will be <strong>2%</strong> (₹400) and not the old 5% (₹1,000). The threshold for 194-H TDS exemption remains ₹15,000.</p>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ FREQUENTLY TESTED FACTS & ORDERS</strong>
</div>
<ul>
  <li><strong>SB Order 06/2023:</strong> Increased SCSS to ₹30L, MIS to ₹9L/₹15L.</li>
  <li><strong>SB Order 05/2021:</strong> 2% TDS on withdrawals > ₹20L for non-ITR filers (Sec 194N).</li>
  <li><strong>MSSC Premature Penalty:</strong> Scheme rate minus 2%.</li>
  <li><strong>TDS Sec 194H (Agent Commission):</strong> 2% (w.e.f 01.10.2024).</li>
  <li><strong>TDS Senior Citizen 2025-26 Threshold:</strong> ₹ 1,00,000.</li>
  <li><strong>PPF Multiples (SB Order 13/2019):</strong> Deposits must be in multiples of ₹50.</li>
  <li><strong>NRI PPF Accounts:</strong> 0% interest from 01.10.2024.</li>
  <li><strong>KVP Maturity (2024-25):</strong> 115 months.</li>
</ul>
`,
    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// CARD 2: DIGITAL BANKING & E-KYC
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "Digital Transformation in POSB: Core Finacle & Network Orders",
    rule_number: "SB Orders 12/2019, 01/2022, 02/2021, 08/2021",
    act_name: "POSB Procedural Updates",
    category: "Explanation",
    effective_date: new Date("2025-01-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #1565C0, #0D47A1);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
    Digital Banking & GDS Limits (2019-2022)
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Cheque rules, Finacle Menus, and Branch PO Enhancements</p>
</div>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:20px;">🛡 1. Fraud Prevention & Finacle Menus (SB Order 01/2022 & 24/2022)</h3>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #E3F2FD;">
  <thead>
    <tr style="background:#1976D2;color:#fff;">
      <th style="padding:10px;text-align:left;">Menu Code</th>
      <th style="padding:10px;text-align:left;">Purpose / Mandate</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#E3F2FD;border-bottom:1px solid #BBDEFB;">
      <td style="padding:10px;font-weight:bold;">CICD</td>
      <td style="padding:10px;">Shows masked Aadhaar (XXXX-XXXX-1234). <strong>SB Order 01/2022</strong> mandates checking PAN/Mobile here for transactions ≥ <strong>₹20,000</strong>.</td>
    </tr>
    <tr style="border-bottom:1px solid #BBDEFB;">
      <td style="padding:10px;font-weight:bold;">ECCRC</td>
      <td style="padding:10px;">e-KYC CIF Creation and changing an existing CIF to e-KYC CIF.</td>
    </tr>
    <tr style="background:#E3F2FD;border-bottom:1px solid #BBDEFB;">
      <td style="padding:10px;font-weight:bold;">HCCA</td>
      <td style="padding:10px;"><strong>SB Order 24/2022:</strong> Menu used exclusively by Head Office (HO) to change the name of an account holder. Disabled at counter level.</td>
    </tr>
    <tr>
      <td style="padding:10px;font-weight:bold;">HINTTM</td>
      <td style="padding:10px;">Used for Interest Adjustment (Premature PPF closure, SCSS/SSA deceased claims).</td>
    </tr>
  </tbody>
</table>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">💳 2. Financial Limits & Services Rollout</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li><strong>POSB Cheques At Par (SB Order 12/2019):</strong> All POSB cheques issued by any CBS Post Office are treated as "At Par" across the network.</li>
    <li><strong>Cash Withdrawal at other SOLs:</strong> POSB cheques accepted for cash withdrawal at other SOLs up to a maximum limit of <strong>₹ 25,000 per day</strong>.</li>
    <li><strong>GDS Withdrawal Limit (SB Order 02/2021):</strong> Limit enhanced to <strong>₹ 20,000</strong> per individual at BOs without requiring Account Office sanction.</li>
    <li><strong>GDS Deposit Limit (SB Order 03/2021):</strong> BPMs cannot accept cash deposits exceeding <strong>₹ 50,000</strong> in an account in a single day.</li>
    <li><strong>Basic Savings Account (SB Order 08/2021):</strong> Account Maintenance Fee revised to <strong>₹ 50</strong> (inclusive of GST). Minimum balance is ₹ 500. Opening requires a copy of a letter/card issued by a competent State/Central Govt authority mentioning the beneficiary's name.</li>
    <li><strong>Intra Operable Net Banking (SB Order 01/2019):</strong> Inaugurated on 14.12.2018.</li>
    <li><strong>Duplicate Passbook Fee:</strong> The fee prescribed for the issue of a duplicate passbook for KVP/NSC certificates is <strong>₹ 50</strong> (+ GST).</li>
</ul>

<h3 style="color:#1565C0;border-bottom:2px solid #BBDEFB;padding-bottom:6px;margin-top:24px;">📱 3. E-KYC Phase I & Customer Interoperability</h3>
<div style="display:flex;gap:15px;flex-wrap:wrap;">
    <div style="flex:1;min-width:200px;background:#E1F5FE;border:1px solid #B3E5FC;border-left:4px solid #03A9F4;border-radius:8px;padding:15px;">
        <h4 style="margin-top:0;color:#0277BD;">e-KYC Phase I</h4>
        <p style="font-size:0.9em;margin-bottom:0;">Applicable for New <strong>POSA (Single)</strong> accounts. No pay-in-slip needed up to <strong>₹ 5,000</strong>.</p>
    </div>
    <div style="flex:1;min-width:200px;background:#FFF3E0;border:1px solid #FFE0B2;border-left:4px solid #FF9800;border-radius:8px;padding:15px;">
        <h4 style="margin-top:0;color:#E65100;">Mobile & Record Rules</h4>
        <p style="font-size:0.9em;margin-bottom:0;">Max <strong>5 CIFs</strong> per mobile. Scanned KYC images preserved for <strong>3 years</strong> (<strong>SB Order 06/2019</strong>).</p>
    </div>
    <div style="flex:1;min-width:200px;background:#E8F5E9;border:1px solid #C8E6C9;border-left:4px solid #4CAF50;border-radius:8px;padding:15px;">
        <h4 style="margin-top:0;color:#2E7D32;">Customer Services</h4>
        <p style="font-size:0.9em;margin-bottom:0;"><strong>IVR Toll-Free:</strong> 1800-266-6868 (<strong>SB Order 28/2021</strong>).<br><strong>e-Passbook:</strong> Introduced in 2022.</p>
    </div>
</div>
`,
    guru_explanation: `
<div style="background:#E3F2FD;border-left:5px solid #1565C0;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#0D47A1;">🧠 Decrypting the Finacle Menus</strong>
</div>

<h4 style="color:#1565C0;">Menu Security (SB Order 24/2022)</h4>
<p>To prevent fraud, counter PAs can no longer change account names using <strong>HCCA</strong>. This power is restricted strictly to the Head Office. If a transaction exceeds ₹20k, the PA MUST invoke <strong>CICD</strong> to verify PAN/Mobile.</p>

<h4 style="color:#1565C0;">The BO Limit Rulebook</h4>
<ul>
  <li><strong>SB Order 02/2021:</strong> GDS can issue up to <strong>₹20,000</strong> withdrawal (up from 5k).</li>
  <li><strong>SB Order 03/2021:</strong> GDS can accept max <strong>₹50,000</strong> deposit per account/day.</li>
</ul>

<h4 style="color:#1565C0;">AT PAR Cheques (SB Order 12/2019)</h4>
<p>"At Par" means a POSB cheque from Kolkata can be presented in Mumbai and cleared instantly within the CBS system without physical outward clearing.</p>
`,
    practical_example: `
<h4 style="color:#1976D2;">Scenario: The ₹20k Threshold</h4>
<p>A customer wants to withdraw ₹25,000 at a Sub Post Office. The PA must first use the <strong>CICD</strong> menu to check if the mobile number and PAN are updated. This is mandated by <strong>SB Order 01/2022</strong> to prevent fraudulent high-value withdrawals.</p>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ FREQUENTLY TESTED ORDERS</strong>
</div>
<ul>
  <li><strong>SB Order 12/2019:</strong> POSB Cheques At Par. Other SOL withdrawal limit: ₹25k.</li>
  <li><strong>SB Order 02/2021:</strong> BO Withdrawal Limit ₹20k.</li>
  <li><strong>SB Order 03/2021:</strong> BO Deposit Limit Max ₹50k.</li>
  <li><strong>SB Order 08/2021:</strong> Basic Savings A/c Maintenance fee ₹50. Min balance ₹500.</li>
  <li><strong>SB Order 24/2022:</strong> HCCA menu for name change restricted to HO.</li>
  <li><strong>SB Order 06/2019:</strong> Scanned KYC images preserved for 3 years.</li>
  <li><strong>SB Order 28/2021:</strong> IVR facility introduced at 1800-266-6868.</li>
</ul>
`,
    status: "published",
    created_by: "sarunkrr@gmail.com",
    createdAt: now, updatedAt: now
},

// ═══════════════════════════════════════════════════════════════════════════════
// CARD 3: HANDLING IRREGULAR ACCOUNTS & CLAIMS
// ═══════════════════════════════════════════════════════════════════════════════
{
    title: "SOPs for Irregular Accounts, Deceased Claims & SCWF Freezing",
    rule_number: "SB Orders 36/2020, 37/2020, 22/2021, 14/2021",
    act_name: "POSB Procedural Updates",
    category: "Explanation",
    effective_date: new Date("2025-01-01"),
    exam_tags: ["LDCE IP", "PS Group B"],
    official_text: `
<div style="background:linear-gradient(135deg, #4A148C, #7B1FA2);color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:18px;box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="margin:0 0 6px;font-size:1.4em;display:flex;align-items:center;gap:10px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    Deceased Claims & Irregular Accounts Protocols
  </h2>
  <p style="margin:0;opacity:.9;font-size:1em;">Sanction Limits, Regularization Rules & Discontinued Schemes</p>
</div>

<h3 style="color:#4A148C;border-bottom:2px solid #E1BEE7;padding-bottom:6px;margin-top:20px;">⚖️ 1. Deceased Claims Sanction Limits (SB Order 36/2020)</h3>
<p>When an account holder passes away <strong>without a nomination or legal evidence</strong>, the financial powers for sanctioning claims are strictly tiered:</p>
<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #E1BEE7;">
  <thead>
    <tr style="background:#6A1B9A;color:#fff;">
      <th style="padding:10px;text-align:left;">Authority Level</th>
      <th style="padding:10px;text-align:left;">Financial Power Limit</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#F3E5F5;border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;">SPM of Time Scale Departmental SO (and LSG)</td>
      <td style="padding:10px;font-weight:bold;">₹ 50,000</td>
    </tr>
    <tr style="border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;">SPM of Higher Selection Grade (Non-Gazetted)</td>
      <td style="padding:10px;font-weight:bold;">₹ 1,00,000</td>
    </tr>
    <tr style="background:#F3E5F5;border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;">Sr. Postmaster / Deputy Chief PM (Group B HPOs)</td>
      <td style="padding:10px;font-weight:bold;">₹ 5,00,000</td>
    </tr>
    <tr>
      <td style="padding:10px;">Chief Postmaster in GPO (Gazetted Group-A)</td>
      <td style="padding:10px;font-weight:bold;color:#4A148C;">₹ 5,00,000</td>
    </tr>
  </tbody>
</table>
<p style="font-size:0.9em;margin-top:5px;background:#FFF9C4;padding:8px;border-left:4px solid #FBC02D;">
<em>* Claims exceeding these limits must be forwarded to the sanctioning authority via <strong>Registered Post</strong> (SB Order 36/2020). If a nomination exists, claims must be settled within <strong>1 working day</strong>.</em></p>

<h3 style="color:#4A148C;border-bottom:2px solid #E1BEE7;padding-bottom:6px;margin-top:24px;">⚠️ 2. Account Transfers & Indemnity Bonds</h3>
<ul style="background:#FAFAFA;padding:15px 15px 15px 35px;border-radius:8px;border: 1px solid #EEE;">
    <li><strong>Account Transfer (SB Order 37/2020):</strong> Actual transfer of National Small Savings Scheme accounts in Finacle can be performed by the <strong>Head Post Office (HO) only</strong>.</li>
    <li><strong>Discontinued Schemes (SB Order 14/2021):</strong> The process of transferring accounts belonging to discontinued schemes (NSS-87 & NSS-92) can now be issued by the <strong>nearby Head Post Office</strong>.</li>
    <li><strong>Indemnity Bond Solvency (SB Order 22/2021):</strong> If a solvency certificate is required, an <strong>Annual Income Certificate certified by the employer</strong> of the surety is an acceptable proof of solvency.</li>
</ul>

<h3 style="color:#4A148C;border-bottom:2px solid #E1BEE7;padding-bottom:6px;margin-top:24px;">❄️ 3. Freezing & Regularization of Irregular Accounts</h3>
<div style="display:flex;gap:15px;flex-wrap:wrap;margin-bottom:15px;">
    <div style="flex:1;min-width:200px;background:#F3E5F5;border:1px solid #E1BEE7;border-left:4px solid #9C27B0;border-radius:8px;padding:15px;">
        <h4 style="margin-top:0;color:#7B1FA2;">INOP vs SCWFR Freeze Codes</h4>
        <p style="font-size:0.9em;margin-bottom:5px;"><strong>INOP:</strong> Frozen after <strong>3 years</strong> of inoperation (batch run Jan 1 & Jul 1).</p>
        <p style="font-size:0.9em;margin-bottom:0;"><strong>SCWFR:</strong> Unclaimed after <strong>10 years</strong> from maturity. Can <strong>ONLY be closed at HPOs</strong>.</p>
    </div>
</div>

<table style="width:100%;border-collapse:collapse;font-size:.95em;border: 1px solid #E1BEE7;">
  <thead>
    <tr style="background:#9C27B0;color:#fff;">
      <th style="padding:10px;text-align:left;">Irregularity Type</th>
      <th style="padding:10px;text-align:left;">Interest / Resolution Consequence</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;font-weight:bold;">PPF Minor Accounts</td>
      <td style="padding:10px;"><strong>POSA interest rate</strong> is paid until individual attains 18 years of age.</td>
    </tr>
    <tr style="background:#F3E5F5;border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;font-weight:bold;">Multiple PPF Accounts</td>
      <td style="padding:10px;">Excess balance in 2nd account (beyond annual ceiling) is refunded with <strong>Zero percent</strong> interest.</td>
    </tr>
    <tr style="border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;font-weight:bold;">NSS-87 (Multiple Accounts)</td>
      <td style="padding:10px;">2nd account (pre-1990) gets <strong>POSA + 2%</strong>. 3rd account gets <strong>0%</strong>.</td>
    </tr>
    <tr style="background:#F3E5F5;border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;font-weight:bold;">Irregular SSA (by Grandparents)</td>
      <td style="padding:10px;">Guardianship shall be transferred to the natural guardian (alive parents) or Legal Guardian.</td>
    </tr>
    <tr style="border-bottom:1px solid #E1BEE7;">
      <td style="padding:10px;font-weight:bold;">Other Minor Accounts</td>
      <td style="padding:10px;">Except PPF/SSA, irregular minor accounts regularized with simple interest at the <strong>prevailing POSA rate</strong>.</td>
    </tr>
  </tbody>
</table>
`,
    guru_explanation: `
<div style="background:#F3E5F5;border-left:5px solid #6A1B9A;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
  <strong style="color:#4A148C;">🧠 Linking the SB Orders to Operations</strong>
</div>

<h4 style="color:#4A148C;">SB Order 36/2020: The Death Claim Code</h4>
<p>This is the most critical operational order for Postmasters. It defined the exact limits (50k ➔ 1L ➔ 5L) and strictly noted that cases exceeding financial powers must be sent up via <strong>Registered Post</strong> (not ordinary or speed post).</p>

<h4 style="color:#4A148C;">SB Order 37/2020 & 14/2021: Transfer Centralization</h4>
<p>Remember that the actual Finacle transfer of National Small Savings Schemes (and discontinued NSS schemes) is centralized to the <strong>Head Post Office (HO)</strong>.</p>

<h4 style="color:#4A148C;">SCWFR Protocol</h4>
<p>If an account is frozen with SCWFR (Senior Citizen Welfare Fund Rules), the SPM cannot touch it. It requires the Head Postmaster to verify the KYC documents before allowing closure.</p>
`,
    practical_example: `
<h4 style="color:#6A1B9A;">Scenario: Dealing with NSS-87 Accounts</h4>
<p>An investor holds three NSS-87 accounts. Based on the regularization rules, the primary account gets the standard treatment. The 2nd account gets POSA + 2%. However, the 3rd account is strictly irregular and gets <strong>0% interest</strong> (only principal refunded). All NSS accounts ceased to earn interest as of 01 Oct 2024.</p>
`,
    exam_insight: `
<div style="background:#FFF9C4;border-left:5px solid #F9A825;border-radius:8px;padding:14px 18px;margin-bottom:14px;">
  <strong style="color:#F57F17;">⚡ FREQUENTLY TESTED ORDERS & FACTS</strong>
</div>
<ul>
  <li><strong>SB Order 36/2020:</strong> Deceased Claim Limits (SO: 50k | HSG: 1L | Gazetted: 5L).</li>
  <li><strong>SB Order 37/2020:</strong> Transfers performed ONLY by Head Post Office.</li>
  <li><strong>SB Order 22/2021:</strong> Annual Income Certificate by employer valid for solvency.</li>
  <li><strong>Nomination Claims Timeline:</strong> Settled within 1 working day.</li>
  <li><strong>SCWFR Code:</strong> Unclaimed after 10 years; Closed ONLY at HPOs.</li>
  <li><strong>Excess PPF 2nd A/c:</strong> 0% interest on excess balance upon merger.</li>
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
            // Check for duplicate title, if exists, update it instead
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
