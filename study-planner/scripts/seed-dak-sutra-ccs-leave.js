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
    {
        title: "CCS (Leave) Rules, 1972 — Ultimate Master Guide",
        rule_number: "Various Rules",
        act_name: "Central Civil Services (Leave) Rules, 1972",
        category: "Rule",
        effective_date: new Date("1972-06-01"),
        exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts 2026"],
        official_text: `
<div style="font-family: inherit; color: #333;">
    <h3 style="color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; margin-top: 0;">📜 OFFICIAL PROVISION</h3>
    <ul style="line-height: 1.6; padding-left: 20px;">
        <li style="margin-bottom: 10px;"><strong>👉 Application & Extent (Rule 2):</strong> Applies to Government servants appointed to civil services and posts under the Union. <strong>Does NOT apply to:</strong> Railway Servants, Casual/Daily-rated employees, Contingency-paid staff, Workmen in industrial establishments, Work-charged staff, All India Services (IAS, IPS, IFS), Contract employees (unless specified), and State Gov deputationists.</li>
        <li style="margin-bottom: 10px;"><strong>👉 Right to Leave (Rule 7):</strong> Leave cannot be claimed as a matter of right. The competent authority can refuse or revoke leave when public service exigencies require it. The authority cannot alter the <em>kind</em> of leave applied for without the written request of the employee.</li>
        <li style="margin-bottom: 10px;"><strong>👉 Maximum Continuous Leave (Rule 12):</strong> No Government servant shall be granted leave of any kind for a continuous period exceeding <strong style="color: #dc2626; background: #fee2e2; padding: 2px 6px; border-radius: 4px;">5 years</strong>. Absence exceeding 5 years (except foreign service or disability/medical) is deemed resignation.</li>
        <li style="margin-bottom: 10px;"><strong>👉 Recall to Duty (Rule 23):</strong> Recall from leave is treated as compulsory. If in India, treated as on duty from the date of starting the journey; entitled to TA and leave salary until joining the post.</li>
    </ul>

    <h3 style="color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; margin-top: 24px;">📊 CORE DATA / TABLES</h3>
    <h4 style="color: #374151; margin-bottom: 8px;">Table 1: Standard Leave Accumulation & Limits</h4>
    <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
            <tr style="background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%); color: white;">
                <th style="padding: 12px; text-align: left; font-weight: 600;">Type of Leave</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Advance Credit (Half Year)</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Earning Rate / Month</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Max Accumulation</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Max Granted at a Time</th>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600; color: #111827;">Earned Leave (EL)</td>
                <td style="padding: 12px;">15 Days (Jan 1, Jul 1)</td>
                <td style="padding: 12px;">2.5 Days</td>
                <td style="padding: 12px;"><span style="background: #dbeafe; color: #1e3a8a; padding: 2px 8px; border-radius: 999px; font-weight: bold;">300 Days</span></td>
                <td style="padding: 12px;">180 Days</td>
            </tr>
            <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600; color: #111827;">Half Pay Leave (HPL)</td>
                <td style="padding: 12px;">10 Days (Jan 1, Jul 1)</td>
                <td style="padding: 12px;">5/3 Days</td>
                <td style="padding: 12px;"><span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 999px; font-weight: bold;">No Limit</span></td>
                <td style="padding: 12px;">No Limit</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600; color: #111827;">Leave Not Due (LND)</td>
                <td style="padding: 12px; color: #6b7280;">NIL (Advance against future HPL)</td>
                <td style="padding: 12px; color: #6b7280;">NIL</td>
                <td style="padding: 12px;">360 Days (Entire Service)</td>
                <td style="padding: 12px; color: #6b7280;">N/A</td>
            </tr>
            <tr style="background: #f9fafb;">
                <td style="padding: 12px; font-weight: 600; color: #111827;">Study Leave</td>
                <td style="padding: 12px; color: #6b7280;">N/A</td>
                <td style="padding: 12px; color: #6b7280;">N/A</td>
                <td style="padding: 12px;">24 Months (Entire Service)</td>
                <td style="padding: 12px;">12 Months</td>
            </tr>
        </table>
    </div>

    <h4 style="color: #374151; margin-bottom: 8px;">Table 2: Leave Encashment Formulas</h4>
    <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
            <tr style="background: linear-gradient(90deg, #0f766e 0%, #14b8a6 100%); color: white;">
                <th style="padding: 12px; text-align: left; font-weight: 600; width: 40%;">Encashment Type</th>
                <th style="padding: 12px; text-align: left; font-weight: 600;">Formula</th>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600;">EL Encashment (Retirement/Death)</td>
                <td style="padding: 12px; font-family: monospace; background: #f3f4f6;">(Last Basic Pay + DA) × No. of unutilized EL (Max 300) / 30</td>
            </tr>
            <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-weight: 600;">HPL Encashment (Retirement/Death)</td>
                <td style="padding: 12px; font-family: monospace; background: #f3f4f6;">(Half of Last Basic Pay + DA) × No. of unutilized HPL / 30</td>
            </tr>
            <tr style="background: #ffffff;">
                <td style="padding: 12px; font-weight: 600;">LTC Encashment</td>
                <td style="padding: 12px; font-family: monospace; background: #f3f4f6;">(Basic Pay + DA) × Number of days EL (Max 10) / 30</td>
            </tr>
        </table>
    </div>

    <h3 style="color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; margin-top: 24px;">🔟 STEP-BY-STEP PROCESS: LTC Leave Encashment (Rule 38-A)</h3>
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
            <li style="margin-bottom: 6px;"><strong>Check Eligibility:</strong> Ensure you have a balance of at least <strong>30 days EL</strong> remaining <em>after</em> the proposed encashment.</li>
            <li style="margin-bottom: 6px;"><strong>Verify Limits:</strong> Confirm you have not exceeded the lifetime limit of <strong>60 days</strong> for LTC encashment.</li>
            <li style="margin-bottom: 6px;"><strong>Apply:</strong> Request encashment of up to <strong>10 days EL</strong> simultaneously with the LTC application.</li>
            <li style="margin-bottom: 6px;"><strong>Approval & Pay:</strong> Cash equivalent is calculated based on current Basic Pay + DA.</li>
            <li><strong>Compliance:</strong> You must avail the LTC. If you fail to travel, the entire amount must be refunded with interest (2% above GPF rate), and the leave is credited back.</li>
        </ol>
    </div>

    <h3 style="color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; margin-top: 24px;">💰 NUMERICAL / STRUCTURAL DATA</h3>
    
    <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
        <div style="flex: 1; min-width: 250px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 16px;">
            <h4 style="color: #be123c; margin-top: 0; margin-bottom: 12px; display: flex; items-center: center; gap: 8px;">⏳ Extraordinary Leave (EXOL) Limits</h4>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.5; font-size: 0.95em;">
                <li><strong>3 Months:</strong> Normal conditions (no special criteria).</li>
                <li><strong>6 Months:</strong> Minimum 1-year service + Medical Certificate.</li>
                <li><strong>18 Months:</strong> Min 1-year service + treatment for TB, Leprosy, Cancer, Mental Illness.</li>
                <li><strong>24 Months:</strong> Min 3-years service + prosecuting studies in public interest.</li>
            </ul>
        </div>
        
        <div style="flex: 1; min-width: 250px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px;">
            <h4 style="color: #15803d; margin-top: 0; margin-bottom: 12px; display: flex; items-center: center; gap: 8px;">🎯 Special Casual Leave (SCL) Limits</h4>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.5; font-size: 0.95em;">
                <li><strong>Male Vasectomy:</strong> 5 working days (2nd time: 5 days).</li>
                <li><strong>Female Tubectomy:</strong> 10 working days (2nd time: 10 days).</li>
                <li><strong>Male (Wife's Tubectomy):</strong> 3 working days.</li>
                <li><strong>Female Recanalization:</strong> 21 days.</li>
                <li><strong>Organ Donor:</strong> Maximum 42 days.</li>
                <li><strong>Sports Events:</strong> Maximum 30 days.</li>
            </ul>
        </div>
    </div>

    <h3 style="color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; margin-top: 24px;">🏦 FACILITIES / ELIGIBILITY</h3>
    
    <div style="background: #fdf4ff; border-left: 4px solid #c026d3; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 8px 8px 0;">
        <h4 style="color: #86198f; margin-top: 0; margin-bottom: 8px;">👶 Child Care Leave (CCL) Rules (Rule 43-C)</h4>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
            <li><strong>Eligibility:</strong> Women employees and single male parents.</li>
            <li><strong>Max Duration:</strong> 730 days during entire service for taking care of two eldest surviving children.</li>
            <li><strong>Child Age:</strong> Below 18 years (No age limit if child has min 40% disability).</li>
            <li><strong>Salary Payment:</strong> 100% salary for first 365 days; 80% salary for next 365 days.</li>
            <li><strong>Restrictions:</strong> Max 3 spells in a calendar year (6 spells for single mother). Minimum 5 days per spell.</li>
        </ul>
    </div>

    <div style="background: #fffbeb; border-left: 4px solid #d97706; padding: 12px 16px; border-radius: 0 8px 8px 0;">
        <h4 style="color: #92400e; margin-top: 0; margin-bottom: 8px;">🤰 Maternity & Paternity Leave (Rules 43, 43-A)</h4>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
            <li><strong>Maternity Leave:</strong> 180 days (Less than 2 surviving children). Miscarriage/abortion gets 45 days in entire service.</li>
            <li><strong>Special Maternity Leave:</strong> 60 days in case of death of a child soon after birth (within 28 days) or stillbirth.</li>
            <li><strong>Paternity Leave:</strong> 15 days (Less than 2 surviving children). Must avail up to 15 days before or within 6 months of delivery/adoption. Lapses if not used.</li>
        </ul>
    </div>
</div>
`,
        guru_explanation: `
<div style="font-family: inherit; color: #333;">
    <h3 style="color: #0ea5e9; display: flex; align-items: center; gap: 8px; margin-top: 0;"><span style="font-size: 1.2em;">📖</span> DAK GURU EXPLAINS (SIMPLIFIED)</h3>
    
    <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h4 style="color: #0369a1; margin-top: 0; margin-bottom: 8px;">Concept: Deductions for Dies-Non & Extraordinary Leave (EXOL)</h4>
        <p style="margin-top: 0; line-height: 1.6;"><strong>The Issue:</strong> When you take EXOL without Medical Certificate or have unauthorized absence (Dies-Non), you don't earn leave for that period.<br>
        <strong>The Adjustment:</strong> Instead of recalculating the past, the rule deducts from your <em>next</em> half-yearly advance.</p>
        <ul style="margin-bottom: 0; padding-left: 20px; line-height: 1.6;">
            <li><strong>EL Deduction Rule:</strong> <span style="background: #ffe4e6; color: #be123c; padding: 2px 6px; border-radius: 4px; font-weight: bold;">1/10th</span> of the EXOL/Dies-Non period is deducted from next EL credit (Max deduction = 15 days).</li>
            <li><strong>HPL Deduction Rule:</strong> <span style="background: #fef08a; color: #854d0e; padding: 2px 6px; border-radius: 4px; font-weight: bold;">1/18th</span> of the EXOL/Dies-Non period is deducted from next HPL credit (Max deduction = 10 days).</li>
            <li><em>Note:</em> Always round off fractions to the nearest whole day.</li>
        </ul>
    </div>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h4 style="color: #334155; margin-top: 0; margin-bottom: 8px;">Concept: Prefixing and Suffixing Holidays (Rule 22)</h4>
        <ul style="margin-bottom: 0; padding-left: 20px; line-height: 1.6;">
            <li><strong>Regular Leave:</strong> You can automatically prefix or suffix public holidays and restricted holidays.</li>
            <li><strong>Medical Leave Prefix:</strong> If you fall sick on a Tuesday, Monday's holiday is automatically prefixed.</li>
            <li><strong>Medical Leave Suffix:</strong> If you are declared fit on Sunday, Sunday is suffixed, and you join Monday.</li>
        </ul>
    </div>

    <h3 style="color: #8b5cf6; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #ede9fe; padding-bottom: 8px;"><span style="font-size: 1.2em;">🧠</span> KEY DISTINCTIONS</h3>
    <div style="display: grid; gap: 12px;">
        <div style="background: white; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 12px 16px; border-radius: 0 8px 8px 0;">
            <strong>Casual Leave (CL)</strong> is for short unexpected absences (max 5 days at a time, not formal leave), <strong style="color: #7c3aed;">WHEREAS</strong> <strong>Special Casual Leave (SCL)</strong> is for specific government-recognized activities (Family planning, Sports, Organ donation).
        </div>
        <div style="background: white; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 12px 16px; border-radius: 0 8px 8px 0;">
            <strong>Commuted Leave</strong> is for getting full pay by debiting double the HPL balance (requires MC), <strong style="color: #7c3aed;">WHEREAS</strong> <strong>Leave Not Due (LND)</strong> is for getting half pay when no HPL is left, debited against future HPL earnings (max 360 days).
        </div>
        <div style="background: white; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 12px 16px; border-radius: 0 8px 8px 0;">
            <strong>Maternity Leave</strong> is for childbirth/recovery (180 days, no leave account debit), <strong style="color: #7c3aed;">WHEREAS</strong> <strong>Child Care Leave (CCL)</strong> is for raising children (730 days, salary deductions apply after 1 year).
        </div>
        <div style="background: white; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: 12px 16px; border-radius: 0 8px 8px 0;">
            <strong>EL Encashment at Retirement</strong> is for a max of 300 days, <strong style="color: #7c3aed;">WHEREAS</strong> <strong>LTC Encashment</strong> is for a max of 60 days in an entire career (max 10 days at a time).
        </div>
    </div>
</div>
`,
        practical_example: `
<div style="font-family: inherit; color: #333;">
    <div style="background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%); border: 1px solid #d1d5db; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <div style="margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
                <h4 style="margin: 0; color: #b91c1c; font-size: 1.1em;">Scenario: Dies-Non Penalty on EL</h4>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 3px solid #fca5a5;">
                <p style="margin-top: 0;"><strong>Situation:</strong> A Postal Assistant was on unauthorized absence for 84 days between July and December 2025. The authority treated this as dies-non.</p>
                <p><strong>Action:</strong> For the January 1, 2026 advance, the system must reduce the EL credit. Calculation: <code>84 × 1/10 = 8.4</code> (rounded to <strong>8 days</strong>).</p>
                <p style="margin-bottom: 0;"><strong>Outcome:</strong> The PA will receive only <strong style="color: #b91c1c; background: #fee2e2; padding: 2px 6px; border-radius: 4px;">7 days of EL</strong> (15 standard advance - 8 deducted) on Jan 1, 2026.</p>
            </div>
        </div>

        <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
                <h4 style="margin: 0; color: #047857; font-size: 1.1em;">Scenario: Commuted Leave vs. EL</h4>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 3px solid #6ee7b7;">
                <p style="margin-top: 0;"><strong>Situation:</strong> An Inspector of Posts has 40 days of EL and 60 days of HPL. He falls severely ill and needs 20 days off. He wants full pay but doesn't want to exhaust his EL.</p>
                <p><strong>Action:</strong> He applies for Commuted Leave for 20 days on a Medical Certificate.</p>
                <p style="margin-bottom: 0;"><strong>Outcome:</strong> The authority grants it. He gets full pay for 20 days. His HPL account is debited by <strong>40 days</strong> (twice the amount of commuted leave). His EL remains untouched at 40 days.</p>
            </div>
        </div>

    </div>
</div>
`,
        exam_insight: `
<div style="font-family: inherit; color: #333;">
    <div style="background: linear-gradient(to right, #fffbeb, #fef3c7); border: 1px solid #fde68a; border-radius: 12px; padding: 20px; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.15);">
        <h3 style="color: #b45309; margin-top: 0; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #fcd34d; padding-bottom: 8px;"><span style="font-size: 1.2em;">⚡</span> EXAM INSIGHT — MUST READ</h3>
        
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">🔥</span>
                <div><strong>Most Asked Fact:</strong> Maximum EL accumulation is <strong style="color: #d97706;">300 days</strong>, but maximum EL granted at one time is <strong style="color: #d97706;">180 days</strong> (unless Group A/B studying abroad).</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">🔥</span>
                <div><strong>Most Asked Fact:</strong> Paternity Leave must be availed within <strong style="color: #d97706;">6 months</strong> of delivery, otherwise it lapses. It is NOT debited against the leave account.</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">🔁</span>
                <div><strong>Frequently Confused:</strong> Earned Leave (EL) accrues at <strong>2.5 days/month</strong>. Half Pay Leave (HPL) accrues at <strong>5/3 days/month</strong>.</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid #ef4444;">
                <span style="font-size: 1.2em; line-height: 1.2;">⚠️</span>
                <div><strong>Trap:</strong> Casual Leave (CL) is <strong>NOT</strong> a recognized form of leave. It cannot be combined with any other leave except Special Casual Leave (SCL).</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">📌</span>
                <div><strong>One-Line Revision:</strong> Advance of leave salary was permanently abolished on <strong>07.10.2016</strong>.</div>
            </li>
            <li style="display: flex; gap: 10px; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span style="font-size: 1.2em; line-height: 1.2;">📌</span>
                <div><strong>One-Line Revision:</strong> WRIIL (Work Related Illness Leave) gives full pay for hospitalization, full pay for the next 6 months, and then HPL for the next 12 months.</div>
            </li>
        </ul>
    </div>

    <div style="margin-top: 24px; background: #1e293b; color: white; border-radius: 12px; padding: 20px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #38bdf8; margin-top: 0; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #334155; padding-bottom: 12px;"><span style="font-size: 1.2em;">📌</span> ULTRA-REVISION POINTS</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 16px;">
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>Max continuous leave</strong> of any kind is 5 years.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>EL credited:</strong> 15 days Jan 1 / 15 days Jul 1.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>HPL credited:</strong> 10 days Jan 1 / 10 days Jul 1.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #f43f5e;">
                <strong>Dies-Non deductions:</strong> EL (1/10th), HPL (1/18th).
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #34d399;">
                <strong>LTC Leave Encashment:</strong> Max 10 days per occasion, 60 days lifetime, 30 days EL balance required.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #a78bfa;">
                <strong>Maternity:</strong> 180 days. <strong>Abortion:</strong> 45 days. <strong>Child death:</strong> 60 days.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #a78bfa;">
                <strong>Paternity:</strong> 15 days. Lapses in 6 months.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #fbbf24;">
                <strong>CCL Salary:</strong> 100% for first 365 days; 80% for next 365 days.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>Organ Donation SCL:</strong> Max 42 days.
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border-left: 2px solid #38bdf8;">
                <strong>Study Leave Limits:</strong> 12 months at a time, 24 months total. Bond required.
            </div>
        </div>
    </div>
</div>
`,
        status: "published",
        created_by: "system_admin",
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

        // Clean existing
        await collection.deleteMany({ act_name: "Central Civil Services (Leave) Rules, 1972" });
        console.log('🧹 Cleaned existing entries.');

        for (const entry of entries) {
            const result = await collection.insertOne(entry);
            console.log(`🚀 Seeded: ${entry.title} (_id: ${result.insertedId})`);
        }

        console.log('✨ Seed completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await client.close();
    }
}

seed();
