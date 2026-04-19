
const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env
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

    // ─────────────────────────────────────────────────────────────
    //  ENTRY 1 — Application, Key Definitions & NPS Registration
    // ─────────────────────────────────────────────────────────────
    {
        title: "NPS Rules 2021 — Application, Definitions & Registration into NPS",
        rule_number: "Rules 1–4",
        act_name: "CCS (Implementation of NPS) Rules, 2021",
        category: "Rule",
        effective_date: new Date("2021-03-30"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "system@dakguru.com",
        createdAt: now,
        updatedAt: now,

        official_text: `
<div style="background:linear-gradient(135deg,#e8f4fd,#d6eaf8); border-left:5px solid #2980b9; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#1a5276; margin-top:0;">📋 Rule 1 — Short Title & Commencement</h3>
  <p>These rules are called the <strong>Central Civil Services (Implementation of National Pension System) Rules, 2021</strong>.<br>
  They came into force on <strong style="color:#c0392b;">30.03.2021</strong> (date of publication in the Official Gazette).</p>
</div>

<div style="background:linear-gradient(135deg,#fef9e7,#fdebd0); border-left:5px solid #e67e22; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#784212; margin-top:0;">🎯 Rule 2 — Application (Who is Covered?)</h3>
  <p>These rules apply to <strong>Government servants</strong> (including civilian Govt. servants in Defence Services) appointed <strong>substantively on or after 1st January 2004</strong> to civil services/posts in connection with the affairs of the Union.</p>
  <h4 style="color:#784212; margin-bottom:6px;">❌ NOT Applicable to:</h4>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
    <thead><tr style="background:#e67e22; color:white;"><th style="padding:8px; border:1px solid #ca6f1e;">Category</th><th style="padding:8px; border:1px solid #ca6f1e;">Reason / Note</th></tr></thead>
    <tbody>
      <tr style="background:#fef9e7;"><td style="padding:8px; border:1px solid #f0e6d3;">Railway Servants</td><td style="padding:8px; border:1px solid #f0e6d3;">Separate rules apply</td></tr>
      <tr style="background:#fdebd0;"><td style="padding:8px; border:1px solid #f0e6d3;">Casual / Daily Rated employees</td><td style="padding:8px; border:1px solid #f0e6d3;">Not substantive posts</td></tr>
      <tr style="background:#fef9e7;"><td style="padding:8px; border:1px solid #f0e6d3;">Persons paid from contingencies</td><td style="padding:8px; border:1px solid #f0e6d3;">—</td></tr>
      <tr style="background:#fdebd0;"><td style="padding:8px; border:1px solid #f0e6d3;">Members of All India Services</td><td style="padding:8px; border:1px solid #f0e6d3;">Separate AIS rules</td></tr>
      <tr style="background:#fef9e7;"><td style="padding:8px; border:1px solid #f0e6d3;">Persons locally recruited for Indian establishments abroad</td><td style="padding:8px; border:1px solid #f0e6d3;">Diplomatic / consular posts</td></tr>
      <tr style="background:#fdebd0;"><td style="padding:8px; border:1px solid #f0e6d3;">Persons employed on contract</td><td style="padding:8px; border:1px solid #f0e6d3;">—</td></tr>
      <tr style="background:#fef9e7;"><td style="padding:8px; border:1px solid #f0e6d3;">Persons covered by Constitution / any other law</td><td style="padding:8px; border:1px solid #f0e6d3;">—</td></tr>
      <tr style="background:#fdebd0;"><td style="padding:8px; border:1px solid #f0e6d3;">Persons to whom CCS (Pension) Rules, 1972 apply</td><td style="padding:8px; border:1px solid #f0e6d3;">Old Pension Scheme (OPS) personnel</td></tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#eafaf1,#d5f5e3); border-left:5px solid #27ae60; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#1e8449; margin-top:0;">📖 Rule 3 — Key Definitions</h3>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
    <thead><tr style="background:#27ae60; color:white;"><th style="padding:8px; border:1px solid #1e8449;">Term</th><th style="padding:8px; border:1px solid #1e8449;">Meaning</th></tr></thead>
    <tbody>
      <tr style="background:#eafaf1;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>Accredited Bank</strong></td><td style="padding:8px; border:1px solid #a9dfbf;">RBI or any bank appointed to transact Govt. business, officially recognised for fund transfer to Trustee Bank</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>Accumulated Pension Corpus</strong></td><td style="padding:8px; border:1px solid #a9dfbf;">Monetary value of pension investments in Individual Pension Account (IPA) of the subscriber under NPS</td></tr>
      <tr style="background:#eafaf1;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>Annuity</strong></td><td style="padding:8px; border:1px solid #a9dfbf;">Periodic payment by Annuity Service Provider to subscriber on purchase of annuity plan from Accumulated Pension Corpus</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>Authority (PFRDA)</strong></td><td style="padding:8px; border:1px solid #a9dfbf;">Pension Fund Regulatory and Development Authority — established under PFRDA Act, 2013</td></tr>
      <tr style="background:#eafaf1;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>CRA (Central Recordkeeping Agency)</strong></td><td style="padding:8px; border:1px solid #a9dfbf;">Agency registered under sec. 27 of PFRDA Act, 2013 — performs recordkeeping, accounting, administration and customer service</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>DDO (Drawing & Disbursing Officer)</strong></td><td style="padding:8px; border:1px solid #a9dfbf;">Head of Office or any Gazetted Officer designated to draw bills and make payments on behalf of Central Govt.</td></tr>
      <tr style="background:#eafaf1;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>PAO (Pay & Accounts Officer)</strong></td><td style="padding:8px; border:1px solid #a9dfbf;">Officer who maintains accounts of a Ministry/Dept/Office — includes Accountant-General</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:8px; border:1px solid #a9dfbf;"><strong>PRAN</strong></td><td style="padding:8px; border:1px solid #a9dfbf;"><strong>Permanent Retirement Account Number</strong> — unique identification number allotted to each subscriber by CRA</td></tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#f5eef8,#e8daef); border-left:5px solid #8e44ad; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#6c3483; margin-top:0;">🔐 Rule 4 — Registration into National Pension System</h3>
  <p><strong>Step-by-step process with prescribed timelines:</strong></p>
  <ol style="line-height:2;">
    <li><strong>Government servant</strong> → submits <em>Common Subscriber Registration Form</em> to <strong>Head of Office</strong> immediately on joining.</li>
    <li><strong>Head of Office</strong> → countersigns and forwards to <strong>DDO</strong> within <strong style="color:#8e44ad;">3 working days</strong> of joining. Retains a copy for record.</li>
    <li><strong>DDO</strong> → forwards to <strong>PAO/CDDO</strong> within <strong style="color:#8e44ad;">3 working days</strong> of receipt from Head of Office.</li>
    <li><strong>PAO/CDDO</strong> → processes, uploads to online system, forwards to <strong>CRA</strong> within <strong style="color:#8e44ad;">3 working days</strong>. Also sends signed copy to CRA for record.</li>
    <li><strong>CRA</strong> → completes registration and allocates <strong>PRAN</strong> as per PFRDA turnaround time. Communicates PRAN to PAO/CDDO and dispatches PRAN kits to subscriber.</li>
    <li><strong>PAO/CDDO</strong> → communicates PRAN to DDO <strong>immediately</strong>.</li>
    <li><strong>DDO</strong> → communicates PRAN to Head of Office <strong>immediately</strong>.</li>
    <li><strong>Head of Office</strong> → records PRAN in service book and pastes certified copy of form within <strong style="color:#8e44ad;">5 working days</strong>.</li>
  </ol>
  <div style="background:#d7bde2; border-radius:8px; padding:12px; margin-top:12px;">
    <p style="margin:0;"><strong>💡 First Contribution:</strong> Credited to Individual Pension Account within <strong style="color:#6c3483;">20 days</strong> of application submission OR by last date of the joining month — whichever is <em>later</em>.</p>
    <p style="margin-top:8px; margin-bottom:0;"><strong>⚠️ Salary Before Registration:</strong> If registration is incomplete before salary drawl, salary shall be paid after <strong>withholding the contribution amount</strong>.</p>
  </div>
</div>`,

        guru_explanation: `
<div style="background:#1a252f; color:#ecf0f1; padding:20px; border-radius:16px; margin-bottom:20px;">
  <h3 style="color:#f39c12; margin-top:0; font-size:1.1em; letter-spacing:1px;">⚡ EXAM POWER POINTS — Rules 1 to 4</h3>
  <ul style="line-height:2.2; font-size:0.95em;">
    <li>📅 NPS Rules 2021 came into force on <strong style="color:#f39c12;">30.03.2021</strong></li>
    <li>📅 NPS applicable to Govt servants appointed on or after <strong style="color:#f39c12;">1st January 2004</strong></li>
    <li>✅ Applies to: Central Govt civilians (incl. Defence civilians)</li>
    <li>❌ Does NOT apply to: Railway servants, AIS members, contractual/casual employees, OPS-covered persons</li>
    <li>🔢 Registration timeline — each stage: <strong style="color:#2ecc71;">3 working days → 3 days → 3 days</strong></li>
    <li>📋 Head of Office records PRAN in service book within <strong style="color:#2ecc71;">5 working days</strong></li>
    <li>💰 First contribution credited within <strong style="color:#2ecc71;">20 days</strong> of application / joining month's last date (whichever later)</li>
    <li>🏛️ PRAN = <strong style="color:#f39c12;">Permanent Retirement Account Number</strong> — allotted by CRA</li>
    <li>🏛️ CRA registered under <strong style="color:#f39c12;">Section 27 of PFRDA Act, 2013</strong></li>
  </ul>
</div>

<div style="background:#eaf2ff; border:1px solid #aed6f1; border-radius:12px; padding:16px; margin-bottom:20px;">
  <h4 style="color:#154360; margin-top:0;">🔁 Registration Flow — Quick Recall</h4>
  <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; font-size:0.88em;">
    <div style="background:#2980b9; color:white; padding:8px 12px; border-radius:8px; text-align:center;"><strong>Govt. Servant</strong><br>→ Submits form to<br>Head of Office</div>
    <div style="font-size:1.4em; color:#2980b9;">→</div>
    <div style="background:#8e44ad; color:white; padding:8px 12px; border-radius:8px; text-align:center;"><strong>Head of Office</strong><br>→ to DDO<br><em>within 3 days</em></div>
    <div style="font-size:1.4em; color:#8e44ad;">→</div>
    <div style="background:#27ae60; color:white; padding:8px 12px; border-radius:8px; text-align:center;"><strong>DDO</strong><br>→ to PAO/CDDO<br><em>within 3 days</em></div>
    <div style="font-size:1.4em; color:#27ae60;">→</div>
    <div style="background:#e67e22; color:white; padding:8px 12px; border-radius:8px; text-align:center;"><strong>PAO/CDDO</strong><br>→ to CRA online<br><em>within 3 days</em></div>
    <div style="font-size:1.4em; color:#e67e22;">→</div>
    <div style="background:#c0392b; color:white; padding:8px 12px; border-radius:8px; text-align:center;"><strong>CRA</strong><br>→ Allots PRAN<br>Sends PRAN kit</div>
  </div>
</div>

<div style="background:#fdedec; border:1px solid #f1948a; border-radius:12px; padding:16px;">
  <h4 style="color:#922b21; margin-top:0;">🎯 Common Exam Traps</h4>
  <ul style="font-size:0.92em; line-height:2;">
    <li><strong>"NPS applies from 26.01.2004"</strong> → ❌ FALSE. It applies to those appointed on/after <strong>01.01.2004</strong></li>
    <li><strong>"Head of Office sends form directly to CRA"</strong> → ❌ FALSE. Route is: Head of Office → DDO → PAO → CRA</li>
    <li><strong>"PRAN is allotted by PAO"</strong> → ❌ FALSE. PRAN is allotted by <strong>CRA</strong></li>
    <li><strong>"First contribution is credited within 30 days"</strong> → ❌ FALSE. It is <strong>20 days</strong></li>
    <li><strong>"Railway servants are covered under NPS Rules 2021"</strong> → ❌ FALSE. They are exempt</li>
  </ul>
</div>`,

        slug: "nps-2021-rules-1-4"
    },

    // ─────────────────────────────────────────────────────────────
    //  ENTRY 2 — Emoluments, Contributions & Interest on Delay
    // ─────────────────────────────────────────────────────────────
    {
        title: "NPS Rules 2021 — Emoluments, Contributions (Subscriber & Govt.) & Interest on Delay",
        rule_number: "Rules 5–8",
        act_name: "CCS (Implementation of NPS) Rules, 2021",
        category: "Rule",
        effective_date: new Date("2021-03-30"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "system@dakguru.com",
        createdAt: now,
        updatedAt: now,

        official_text: `
<div style="background:linear-gradient(135deg,#eafaf1,#d5f5e3); border-left:5px solid #27ae60; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#1e8449; margin-top:0;">💼 Rule 5 — Emoluments (Basis for NPS Contribution)</h3>
  <table style="width:100%; border-collapse:collapse; font-size:0.92em;">
    <thead><tr style="background:#27ae60; color:white;"><th style="padding:10px; border:1px solid #1e8449;">Situation</th><th style="padding:10px; border:1px solid #1e8449;">Emoluments Counted</th></tr></thead>
    <tbody>
      <tr style="background:#eafaf1;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Normal duty</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Basic Pay + Non-Practice Allowance (NPA) + Dearness Allowance (DA)</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>On Leave</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Basic Pay + NPA + DA (same as duty)</td></tr>
      <tr style="background:#eafaf1;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>On Suspension</strong></td><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Subsistence Allowance</strong> treated as emoluments</td></tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#e8f4fd,#d6eaf8); border-left:5px solid #2980b9; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#1a5276; margin-top:0;">👤 Rule 6 — Contribution by the SUBSCRIBER</h3>
  <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:16px;">
    <div style="flex:1; min-width:180px; background:#2980b9; color:white; border-radius:12px; padding:16px; text-align:center;">
      <div style="font-size:2em; font-weight:bold;">10%</div>
      <div style="font-size:0.85em;">of Emoluments per month</div>
    </div>
    <div style="flex:2; min-width:220px; background:#d6eaf8; border-radius:12px; padding:16px; color:#1a5276;">
      <ul style="margin:0; padding-left:18px; line-height:2;">
        <li>Amount rounded off to <strong>next higher rupee</strong></li>
        <li>Deducted from salary by DDO — sent to PAO/CDDO by <strong style="color:#c0392b;">20th of each month</strong></li>
        <li>PAO/CDDO uploads Subscription Contribution File (Transaction ID) by <strong style="color:#c0392b;">25th of each month</strong></li>
        <li>PAO/CDDO remits to Trustee Bank through Accredited Bank by <strong style="color:#c0392b;">last working day</strong> of month</li>
        <li>March contribution remitted by <strong style="color:#c0392b;">1st working day of April</strong></li>
      </ul>
    </div>
  </div>
  <div style="background:#aed6f1; border-radius:10px; padding:12px;">
    <strong>Special Cases:</strong>
    <ul style="margin:6px 0 0 18px; line-height:2; font-size:0.92em;">
      <li><strong>Suspension:</strong> Subscriber <em>may</em> (at his option) contribute during suspension period</li>
      <li><strong>Absence without pay:</strong> NO contribution during periods with no pay/leave salary</li>
      <li><strong>Deputation:</strong> Subscriber continues to contribute based on emoluments worked out</li>
      <li><strong>Probation:</strong> Subscriber SHALL contribute during probation period</li>
      <li><strong>Salary arrears (retrospective increase):</strong> Contributions treated as contributions for the <strong>month of actual payment</strong></li>
      <li><strong>Voluntary excess contribution:</strong> Subscriber may contribute <em>more</em> than 10% at his option</li>
    </ul>
  </div>
</div>

<div style="background:linear-gradient(135deg,#fef9e7,#fdebd0); border-left:5px solid #e67e22; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#784212; margin-top:0;">🏛️ Rule 7 — Contribution by the GOVERNMENT</h3>
  <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:16px;">
    <div style="flex:1; min-width:180px; background:#e67e22; color:white; border-radius:12px; padding:16px; text-align:center;">
      <div style="font-size:2em; font-weight:bold;">14%</div>
      <div style="font-size:0.85em;">of Emoluments per month</div>
      <div style="font-size:0.75em; margin-top:4px;">(or as notified from time to time)</div>
    </div>
    <div style="flex:2; min-width:220px; background:#fdebd0; border-radius:12px; padding:16px; color:#784212;">
      <ul style="margin:0; padding-left:18px; line-height:2;">
        <li>Amount rounded off to <strong>next higher rupee</strong></li>
        <li>Credited to Individual Pension Account every month</li>
        <li>Even during <strong>medical leave / civil commotion leave / higher studies leave</strong> where leave salary is NIL or less than full pay: Govt contributes <strong>14% of notional emoluments</strong> (pay + DA + NPA in leave salary)</li>
      </ul>
    </div>
  </div>
  <div style="background:#fad7a0; border-radius:10px; padding:12px;">
    <strong>Suspension cases:</strong>
    <ul style="margin:6px 0 0 18px; line-height:2; font-size:0.92em;">
      <li>Govt. contributes based on <strong>subsistence allowance</strong> during suspension</li>
      <li>If subscriber opts NOT to pay during suspension → Govt. also makes <strong>NO contribution</strong></li>
      <li>If suspension treated as duty/leave after inquiry → difference credited to IPA <strong>with interest</strong> (PPF rate)</li>
    </ul>
  </div>
</div>

<div style="background:linear-gradient(135deg,#f5eef8,#e8daef); border-left:5px solid #8e44ad; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#6c3483; margin-top:0;">⏱️ Rule 8 — Interest on Delayed Deposit of Contributions</h3>
  <p>If delay in crediting to IPA is due to factors <strong>NOT attributable to the subscriber</strong>:</p>
  <ul style="line-height:2;">
    <li>Delay in commencement of monthly contributions (registration delay)</li>
    <li>Delay in deduction of monthly contribution from salary</li>
    <li>Delay in crediting monthly contributions by the Government</li>
  </ul>
  <div style="background:#d7bde2; border-radius:8px; padding:12px; margin-top:8px;">
    <p style="margin:0;"><strong>Interest shall be credited</strong> to the IPA of the subscriber along with the delayed contribution.</p>
    <p style="margin:8px 0 0;"><strong>Rate of Interest:</strong> PPF deposit rate as decided by the Government from time to time.</p>
    <p style="margin:8px 0 0;"><strong>Time limit for credit of interest:</strong> Within <strong style="color:#6c3483;">30 days</strong> of the crediting of the contribution amount.</p>
  </div>
</div>

<div style="background:linear-gradient(135deg,#fdfefe,#eaecee); border-left:5px solid #566573; padding:18px; border-radius:12px;">
  <h3 style="color:#2c3e50; margin-top:0;">📊 Rule 9 — Investment of Accumulated Pension Corpus</h3>
  <p>The Accumulated Pension Corpus of a subscriber shall be <strong>invested by pension fund(s)</strong> in such manner as <strong>notified by the Authority (PFRDA)</strong>.</p>
</div>`,

        guru_explanation: `
<div style="background:#1a252f; color:#ecf0f1; padding:20px; border-radius:16px; margin-bottom:20px;">
  <h3 style="color:#f39c12; margin-top:0; font-size:1.1em; letter-spacing:1px;">⚡ EXAM POWER POINTS — Rules 5 to 9</h3>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em; color:#ecf0f1;">
    <thead><tr style="background:#f39c12; color:#1a252f;"><th style="padding:8px;">Key Fact</th><th style="padding:8px;">Value / Rule</th></tr></thead>
    <tbody>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Subscriber contribution</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#2ecc71; font-weight:bold;">10% of emoluments/month</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Government contribution</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#f39c12; font-weight:bold;">14% of emoluments/month</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Rounding of contributions</td><td style="padding:8px; border-bottom:1px solid #2c3e50;">Next higher rupee</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Emoluments on suspension</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#e74c3c;">Subsistence Allowance</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">DDO sends bill to PAO/CDDO by</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#3498db; font-weight:bold;">20th of each month</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">PAO uploads Subscription Contribution File by</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#3498db; font-weight:bold;">25th of each month</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Remittance to Trustee Bank by</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#3498db; font-weight:bold;">Last working day of month</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">March month remittance</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#e74c3c; font-weight:bold;">1st working day of April</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Interest on delayed deposit (Rule 8)</td><td style="padding:8px; border-bottom:1px solid #2c3e50;">PPF rate; credited within <strong>30 days</strong></td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px;">Contribution during probation</td><td style="padding:8px; color:#2ecc71;">YES — mandatory</td></tr>
    </tbody>
  </table>
</div>

<div style="background:#eaf2ff; border:1px solid #aed6f1; border-radius:12px; padding:16px; margin-bottom:20px;">
  <h4 style="color:#154360; margin-top:0;">💡 Contribution Comparison: Subscriber vs Government</h4>
  <div style="display:flex; gap:12px; flex-wrap:wrap;">
    <div style="flex:1; min-width:160px; text-align:center; background:#d6eaf8; border-radius:10px; padding:12px;">
      <div style="font-size:1.5em; font-weight:bold; color:#2980b9;">👤 10%</div>
      <div style="font-size:0.85em; color:#154360;">Subscriber's own contribution</div>
    </div>
    <div style="flex:1; min-width:160px; text-align:center; background:#fdebd0; border-radius:10px; padding:12px;">
      <div style="font-size:1.5em; font-weight:bold; color:#e67e22;">🏛️ 14%</div>
      <div style="font-size:0.85em; color:#784212;">Government's matching contribution</div>
    </div>
    <div style="flex:1; min-width:160px; text-align:center; background:#d5f5e3; border-radius:10px; padding:12px;">
      <div style="font-size:1.5em; font-weight:bold; color:#27ae60;">📈 24%</div>
      <div style="font-size:0.85em; color:#1e8449;">Total monthly corpus building</div>
    </div>
  </div>
</div>

<div style="background:#fdedec; border:1px solid #f1948a; border-radius:12px; padding:16px;">
  <h4 style="color:#922b21; margin-top:0;">🎯 Common Exam Traps — Contributions</h4>
  <ul style="font-size:0.92em; line-height:2.2;">
    <li><strong>"Government contributes 10%"</strong> → ❌ FALSE. Govt contributes <strong>14%</strong>; subscriber contributes 10%</li>
    <li><strong>"No contribution during suspension"</strong> → ❌ FALSE. Subscriber <em>may</em> contribute at his option; Govt contributes based on subsistence allowance</li>
    <li><strong>"No contribution during probation"</strong> → ❌ FALSE. Subscriber SHALL contribute during probation</li>
    <li><strong>"Arrears contribution is for the month of arrears"</strong> → ❌ FALSE. It is treated as contribution for the <strong>month of actual payment</strong></li>
    <li><strong>"Interest on delay is credited within 20 days"</strong> → ❌ FALSE. It is within <strong>30 days</strong></li>
  </ul>
</div>`,

        slug: "nps-2021-rules-5-9"
    },

    // ─────────────────────────────────────────────────────────────
    //  ENTRY 3 — Exit, Benefits, Retirement & Retirement Prep
    // ─────────────────────────────────────────────────────────────
    {
        title: "NPS Rules 2021 — Exit Options, Retirement Benefits, Death & Pre-Retirement Procedure",
        rule_number: "Rules 10–23",
        act_name: "CCS (Implementation of NPS) Rules, 2021",
        category: "Rule",
        effective_date: new Date("2021-03-30"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "system@dakguru.com",
        createdAt: now,
        updatedAt: now,

        official_text: `
<div style="background:linear-gradient(135deg,#f5eef8,#e8daef); border-left:5px solid #8e44ad; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#6c3483; margin-top:0;">📝 Rule 10 — Option on Death / Invalidation / Disablement (Forms 1 & 2)</h3>
  <p>Every NPS subscriber shall exercise an option <strong>in Form-1</strong> at the time of joining, choosing benefits under:</p>
  <ul style="line-height:2;">
    <li><strong>National Pension System (NPS)</strong> — PFRDA (Exits & Withdrawals) Regulations, 2015</li>
    <li><strong>CCS (Pension) Rules, 1972 (now 2021)</strong></li>
    <li><strong>CCS (Extraordinary Pension) Rules, 1939 (now 2023)</strong></li>
  </ul>
  <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:10px;">
    <div style="flex:1; min-width:200px; background:#d7bde2; border-radius:10px; padding:12px;">
      <strong style="color:#6c3483;">Form-1:</strong> Indicates the pension option (NPS / OPS / Extraordinary Pension).<br>Copy goes to Service Book, CRA, and Pay & Accounts Office.
    </div>
    <div style="flex:1; min-width:200px; background:#e8daef; border-radius:10px; padding:12px;">
      <strong style="color:#6c3483;">Form-2:</strong> Details of <strong>Family Members</strong> and <strong>Disabled Child</strong>.<br>Must be submitted along with Form-1. Updated whenever family size changes (including child's marriage).
    </div>
  </div>
  <div style="background:#d2b4de; border-radius:8px; padding:12px; margin-top:12px;">
    <p style="margin:0; font-size:0.92em;"><strong>⟳ Option Revision:</strong> Form-1 option can be revised <strong>any number of times</strong> before retirement by submitting a fresh option to the Head of Office.</p>
    <p style="margin:8px 0 0; font-size:0.92em;"><strong>Death in service:</strong> Last option exercised by deceased subscriber is treated as <strong>final</strong> — family has NO right to revise.</p>
  </div>

  <h4 style="color:#6c3483; margin-top:16px;">🔴 Default Options (when no Form-1 exercised):</h4>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
    <thead><tr style="background:#8e44ad; color:white;"><th style="padding:8px; border:1px solid #6c3483;">Situation</th><th style="padding:8px; border:1px solid #6c3483;">Default Benefit</th></tr></thead>
    <tbody>
      <tr style="background:#f5eef8;"><td style="padding:8px; border:1px solid #d7bde2;">Subscriber dies without Form-1 AND has service &lt; <strong>15 years</strong> OR dies within <strong>3 years</strong> of notification</td><td style="padding:8px; border:1px solid #d7bde2;">Family pension under <strong>CCS (Pension) Rules, 2021 / CCS (Extraordinary Pension) Rules, 2023</strong></td></tr>
      <tr style="background:#e8daef;"><td style="padding:8px; border:1px solid #d7bde2;">Discharged on invalidation/disability without Form-1 AND service &lt; <strong>15 years</strong> OR within <strong>3 years</strong> of notification</td><td style="padding:8px; border:1px solid #d7bde2;">Invalid/disability pension under <strong>CCS (Pension) Rules, 2021 / CCS (Extraordinary Pension) Rules, 2023</strong></td></tr>
      <tr style="background:#f5eef8;"><td style="padding:8px; border:1px solid #d7bde2;">All other cases — no option exercised</td><td style="padding:8px; border:1px solid #d7bde2;"><strong>PFRDA (Exits & Withdrawals under NPS) Regulations, 2015</strong> as default</td></tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#eafaf1,#d5f5e3); border-left:5px solid #27ae60; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#1e8449; margin-top:0;">🏁 Exit Options at a Glance (Rules 11–18)</h3>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
    <thead><tr style="background:#27ae60; color:white;"><th style="padding:10px; border:1px solid #1e8449;">Rule</th><th style="padding:10px; border:1px solid #1e8449;">Exit Event</th><th style="padding:10px; border:1px solid #1e8449;">Benefit</th></tr></thead>
    <tbody>
      <tr style="background:#eafaf1;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 11</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Superannuation retirement</td><td style="padding:10px; border:1px solid #a9dfbf;">Benefits as per PFRDA (Exits & Withdrawals) Regulations, 2015</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 12</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Voluntary retirement after <strong>20 years</strong> of regular service (with <strong>3 months</strong> notice)</td><td style="padding:10px; border:1px solid #a9dfbf;">Same as superannuation benefits under PFRDA Regs, 2015<br><em>Notice can be reduced with appointing authority approval; withdrawal of notice at least 15 days before retirement date</em></td></tr>
      <tr style="background:#eafaf1;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 13</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Retirement under FR 56 (compulsory, before age) / Special Voluntary Retirement Scheme</td><td style="padding:10px; border:1px solid #a9dfbf;">Same as superannuation benefits; surplus staff also get <strong>ex-gratia</strong> under SVRS</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 14</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Resignation from service</td><td style="padding:10px; border:1px solid #a9dfbf;">Lump sum + annuity as per PFRDA Regs (pre-superannuation exit); NOT paid before <strong>90 days</strong> from resignation effective date</td></tr>
      <tr style="background:#eafaf1;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 15</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Absorption in Corporation/Company/Body under Govt.</td><td style="padding:10px; border:1px solid #a9dfbf;">Deemed retired from date of absorption; benefits as per superannuation PFRDA Regs (continues NPS with same PRAN in new org)</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 16</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Retirement on invalidation (bodily/mental infirmity)</td><td style="padding:10px; border:1px solid #a9dfbf;">If OPS option: Head of Office disburses as per CCS Pension Rules 2021; Govt contribution returned to Govt; subscriber gets remaining corpus as lump sum</td></tr>
      <tr style="background:#eafaf1;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 17</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Boarding out on account of disablement attributable to Govt. service</td><td style="padding:10px; border:1px solid #a9dfbf;">If OPS option: CCS (Extraordinary Pension) Rules 2023 apply; Govt contribution returned to Govt; subscriber gets remaining corpus</td></tr>
      <tr style="background:#d5f5e3;"><td style="padding:10px; border:1px solid #a9dfbf;"><strong>Rule 18</strong></td><td style="padding:10px; border:1px solid #a9dfbf;">Compulsory retirement / Dismissal / Removal</td><td style="padding:10px; border:1px solid #a9dfbf;">Lump sum + annuity as per PFRDA Regs (pre-superannuation exit); may continue NPS as non-Govt subscriber with same PRAN</td></tr>
    </tbody>
  </table>
</div>

<div style="background:linear-gradient(135deg,#fef9e7,#fdebd0); border-left:5px solid #e67e22; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#784212; margin-top:0;">⚖️ Rule 19 — Departmental / Judicial Proceedings Pending at Retirement</h3>
  <p>Proceedings <strong>do NOT affect</strong> NPS benefits — lump sum and annuity from accumulated pension corpus shall be paid as admissible. However, gratuity and other retirement benefits NOT covered by these rules shall be regulated as applicable.</p>
</div>

<div style="background:linear-gradient(135deg,#e8f4fd,#d6eaf8); border-left:5px solid #2980b9; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#1a5276; margin-top:0;">👨‍👩‍👧 Rule 20 — Entitlement for Family on Death of Subscriber</h3>
  <ul style="line-height:2; font-size:0.92em;">
    <li>If OPS/Extraordinary Pension option → family pension paid per CCS Pension Rules 2021 / CCS (EP) Rules 2023</li>
    <li>Government's contribution (and returns thereon) in accumulated corpus → transferred to <strong>Government account</strong></li>
    <li>Remaining corpus → paid in <strong>lump sum to nominee</strong> (per PFRDA Exits Regulations 2015)</li>
    <li>If no nomination / nomination does not subsist → paid to <strong>legal heir(s)</strong></li>
  </ul>
</div>

<div style="background:linear-gradient(135deg,#eafaf1,#d5f5e3); border-left:5px solid #27ae60; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#1e8449; margin-top:0;">📅 Rule 21 — List of Subscribers Due for Retirement</h3>
  <ul style="line-height:2; font-size:0.92em;">
    <li>Every Head of Department shall prepare a list <strong>every 3 months</strong> — on <strong>1st January, 1st April, 1st July, 1st October</strong></li>
    <li>List covers all subscribers retiring within <strong>next 12 to 15 months</strong></li>
    <li>Copy supplied to PAO not later than <strong>31st January, 30th April, 31st July, 31st October</strong></li>
  </ul>
</div>

<div style="background:linear-gradient(135deg,#f5eef8,#e8daef); border-left:5px solid #8e44ad; padding:18px; border-radius:12px; margin-bottom:20px;">
  <h3 style="color:#6c3483; margin-top:0;">🏠 Rule 22 — No Demand Certificate (Government Accommodation)</h3>
  <p>Head of Office writes to Directorate of Estates at least <strong style="color:#8e44ad;">1 year before</strong> anticipated retirement for issuance of 'No Demand Certificate' for the period preceding <strong style="color:#8e44ad;">8 months</strong> before retirement of the allottee.</p>
</div>

<div style="background:linear-gradient(135deg,#e8f4fd,#d6eaf8); border-left:5px solid #2980b9; padding:18px; border-radius:12px;">
  <h3 style="color:#1a5276; margin-top:0;">📬 Rule 23 — Submission of NPS Withdrawal Claim on Superannuation</h3>
  <ul style="line-height:2; font-size:0.92em;">
    <li>Subscriber submits duly filled <strong>Withdrawal Form</strong> (prescribed by PFRDA) to Head of Office <strong style="color:#c0392b;">6 months before</strong> retirement on superannuation (or on leave preparatory to retirement — whichever is earlier)</li>
    <li>For other exits: submit immediately after issue of retirement/exit orders</li>
  </ul>
</div>`,

        guru_explanation: `
<div style="background:#1a252f; color:#ecf0f1; padding:20px; border-radius:16px; margin-bottom:20px;">
  <h3 style="color:#f39c12; margin-top:0; font-size:1.1em; letter-spacing:1px;">⚡ EXAM POWER POINTS — Rules 10 to 23</h3>
  <table style="width:100%; border-collapse:collapse; font-size:0.9em; color:#ecf0f1;">
    <thead><tr style="background:#f39c12; color:#1a252f;"><th style="padding:8px;">Key Fact</th><th style="padding:8px;">Value</th></tr></thead>
    <tbody>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Option form for pension choice</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#2ecc71;"><strong>Form-1</strong></td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Form for family details</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#2ecc71;"><strong>Form-2</strong></td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Option in Form-1 can be revised</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#f39c12;">Any number of times before retirement</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Voluntary retirement notice period</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#3498db; font-weight:bold;">3 months (minimum 20 years service)</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Withdrawal of VRS notice — latest</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#3498db; font-weight:bold;">15 days before intended retirement</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Resignation — NPS payment held for</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#e74c3c; font-weight:bold;">90 days from resignation effective date</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Retirement list prepared every</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#2ecc71;">3 months (Jan/Apr/Jul/Oct 1st)</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">List covers retirement in next</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#2ecc71;">12 to 15 months</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">No Demand Certificate — intimation to Directorate of Estates</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#f39c12; font-weight:bold;">1 year before retirement</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">No Demand Certificate covers period preceding</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#f39c12; font-weight:bold;">8 months before retirement</td></tr>
      <tr style="background:#212f3d;"><td style="padding:8px; border-bottom:1px solid #2c3e50;">Withdrawal Form submission (superannuation)</td><td style="padding:8px; border-bottom:1px solid #2c3e50; color:#e74c3c; font-weight:bold;">6 months before retirement</td></tr>
      <tr style="background:#1a252f;"><td style="padding:8px;">Default threshold for OPS family pension (no Form-1)</td><td style="padding:8px; color:#f39c12; font-weight:bold;">Service &lt; 15 years OR within 3 years of notification</td></tr>
    </tbody>
  </table>
</div>

<div style="background:#eaf2ff; border:1px solid #aed6f1; border-radius:12px; padding:16px; margin-bottom:20px;">
  <h4 style="color:#154360; margin-top:0;">🗂️ Rule 12 — Voluntary Retirement: Key Conditions</h4>
  <ul style="font-size:0.92em; line-height:2.2;">
    <li>Minimum service: <strong>20 years</strong> of regular service</li>
    <li>Notice: <strong>3 months</strong> in writing to appointing authority</li>
    <li>Notice period can be <strong>curtailed</strong> by appointing authority if no administrative inconvenience</li>
    <li>Once notice given → cannot withdraw except with <strong>specific approval</strong> and at least <strong>15 days before</strong> retirement date</li>
    <li><strong>Exceptions</strong> (rule doesn't apply): Scientists/technical experts on ITEC, posted abroad in Ministries, or on specific foreign Govt. contract unless served in India ≥ 1 year after return</li>
  </ul>
</div>

<div style="background:#fdedec; border:1px solid #f1948a; border-radius:12px; padding:16px;">
  <h4 style="color:#922b21; margin-top:0;">🎯 Common Exam Traps — Rules 10–23</h4>
  <ul style="font-size:0.92em; line-height:2.2;">
    <li><strong>"Family can revise the pension option after subscriber's death"</strong> → ❌ FALSE. Last option is <strong>final</strong></li>
    <li><strong>"Resignation payment is immediate"</strong> → ❌ FALSE. Payment held for <strong>90 days</strong></li>
    <li><strong>"Retirement list is prepared every 6 months"</strong> → ❌ FALSE. It is every <strong>3 months</strong></li>
    <li><strong>"Withdrawal form submitted 3 months before retirement"</strong> → ❌ FALSE. It is <strong>6 months before</strong> superannuation</li>
    <li><strong>"Pending judicial proceedings stop NPS payment"</strong> → ❌ FALSE. NPS benefits (lump sum + annuity) are <strong>not affected</strong> by proceedings</li>
    <li><strong>"Govt. contribution goes to nominee on death"</strong> → ❌ FALSE. Govt. contribution is transferred back to <strong>Government account</strong></li>
    <li><strong>"No Demand Certificate is obtained 6 months before"</strong> → ❌ FALSE. It is <strong>1 year before</strong> retirement</li>
  </ul>
</div>`,

        slug: "nps-2021-rules-10-23"
    }
];

async function seedEntries() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        for (const entry of entries) {
            const existing = await collection.findOne({ slug: entry.slug });
            if (existing) {
                await collection.updateOne({ slug: entry.slug }, { $set: { ...entry, updatedAt: new Date() } });
                console.log(`🔄 Updated: ${entry.title}`);
            } else {
                await collection.insertOne(entry);
                console.log(`✅ Inserted: ${entry.title}`);
            }
        }

        console.log('\n🎉 All 3 NPS Rules 2021 Dak Sutra entries seeded successfully!');
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();
    }
}

seedEntries();
