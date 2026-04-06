
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

const entry = {
    title: "CCS (CCA) Rules, 1965 — Classification, Control & Appeal",
    rule_number: "Rules 1–35",
    act_name: "CCS (Classification, Control and Appeal) Rules, 1965",
    category: "Rule",
    effective_date: new Date("1965-12-01"),
    exam_tags: ["LDCE IP", "PS Group B", "GDS to PA"],
    official_text: `
        <div style="background:#f0f7ff; border:1px solid #c8dff5; padding:15px; border-radius:12px; margin-bottom:20px; color:#1a1a1a;">
            <h3 style="color:#1a3a5c; margin-top:0;">📜 Part-I: General (Rules 1–3)</h3>
            <p><strong>Rule 1:</strong> These rules are called the <strong>CCS (CCA) Rules, 1965</strong> and came into force on <strong>01 December 1965</strong>.</p>
            <p><strong>Rule 3 — Application:</strong> Apply to every Government servant including civilians in Defence Services, but <strong>NOT</strong> to:</p>
            <ul>
                <li>Railway Government Servants</li>
                <li>Members of All India Services</li>
                <li>Persons in casual employment</li>
                <li>Extra-Departmental Agents</li>
                <li>Monthly-rated staff paid from contingencies (not on regular establishment)</li>
                <li>Daily-rated staff paid from contingencies</li>
                <li>All hot weather and monsoon establishment</li>
            </ul>
            <p><em>Note: The President may by order exclude any group of Govt. servants from these rules.</em></p>
        </div>

        <div style="background:#f5eef8; border:1px solid #d2b4de; padding:15px; border-radius:12px; margin-bottom:20px; color:#1a1a1a;">
            <h3 style="color:#4a235a; margin-top:0;">🔑 Key Definitions (Rule 2)</h3>
            <table style="width:100%; border-collapse:collapse;">
                <tr style="background:#d2b4de; color:#4a235a;">
                    <th style="padding:10px; border:1px solid #c39bd3; text-align:left;">Term</th>
                    <th style="padding:10px; border:1px solid #c39bd3; text-align:left;">Meaning</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"><strong>Appointing Authority</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Authority empowered to appoint to the Service/post — whichever is the highest</td></tr>
                <tr style="background:#fdf2ff;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"><strong>Commission</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Union Public Service Commission (UPSC)</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"><strong>Disciplinary Authority</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Authority competent to impose any of the penalties in Rule 11</td></tr>
                <tr style="background:#fdf2ff;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"><strong>Head of Department</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Authority declared as Head under <strong>FRSR Rules</strong></td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"><strong>Secretary</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Secretary to Govt. of India — includes Addl. Secretary, Jt. Secretary, Secretary to PM/President/Cabinet/Planning Commission</td></tr>
                <tr style="background:#fdf2ff;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"><strong>Govt. Servant</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Holds a civil post under Union; includes foreign service, state Govt. disposal of Central Govt., and temporary posts</td></tr>
            </table>
        </div>

        <div style="background:#f0fff4; border:1px solid #d5f5e3; padding:15px; border-radius:12px; margin-bottom:20px; color:#1a1a1a;">
            <h3 style="color:#1a5c3a; margin-top:0;">🏛️ Part-II: Classification (Rules 4–7)</h3>
            <p><strong>Rule 4 & 6 — Classification of Services & Posts:</strong></p>
            <table style="width:100%; border-collapse:collapse;">
                <tr style="background:#1a5c3a; color:white;">
                    <th style="padding:10px; border:1px solid #117a65;">Pay Level</th>
                    <th style="padding:10px; border:1px solid #117a65;">Group (Services)</th>
                    <th style="padding:10px; border:1px solid #117a65;">Old Class</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">Level 10 to 18</td><td style="padding:9px; border:1px solid #eee; color:#1a5c3a; font-weight:bold;">Group 'A'</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Class-I</td></tr>
                <tr style="background:#f0fff4;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">Level 6 to 9</td><td style="padding:9px; border:1px solid #eee; color:#1a5c3a; font-weight:bold;">Group 'B'</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Class-II</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">Level 1 to 5</td><td style="padding:9px; border:1px solid #eee; color:#1a5c3a; font-weight:bold;">Group 'C'</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Class-III</td></tr>
            </table>
            <p style="margin-top:10px;"><strong>Rule 7 — General Central Service:</strong> Posts not included in any other Central Civil Service → deemed part of <strong>General Central Service</strong> of corresponding group (e.g., Scientists, NDRF, Non-Political Executive).</p>
        </div>

        <div style="background:#fff9f0; border:1px solid #fdebd0; padding:15px; border-radius:12px; margin-bottom:20px; color:#1a1a1a;">
            <h3 style="color:#784212; margin-top:0;">👑 Part-III: Appointing Authority (Rules 8–9)</h3>
            <ul>
                <li><strong>Rule 8 — Group 'A':</strong> All appointments made by the <strong>President</strong>. President may delegate this power by general or special order.</li>
                <li style="margin-top:8px;"><em>Note: For Goa, Daman & Diu, Dadra & Nagar Haveli, Arunachal Pradesh and Mizoram — the respective <strong>Administrators</strong> are the appointing authority.</em></li>
                <li style="margin-top:8px;"><strong>Rule 9 — Group 'B', 'C' & 'D':</strong> Made by authorities specified by general or special order of the President, or as specified in the <strong>Schedule</strong>.</li>
            </ul>
        </div>
    `,
    guru_explanation: `
        <div style="background:#fdf2f2; border:1px solid #f5b7b1; padding:15px; border-radius:12px; margin-bottom:20px; color:#1a1a1a;">
            <h3 style="color:#922b21; margin-top:0;">⚠️ Part-IV: Suspension — Rule 10 (The Most Critical Rule)</h3>

            <h4 style="color:#922b21;">When can a Govt. Servant be Suspended?</h4>
            <table style="width:100%; border-collapse:collapse; margin-bottom:15px;">
                <tr style="background:#f5b7b1; color:#922b21;">
                    <th style="padding:10px; border:1px solid #ec7063;">Clause</th>
                    <th style="padding:10px; border:1px solid #ec7063;">Grounds for Suspension</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">(a)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Disciplinary proceeding is <strong>contemplated or pending</strong></td></tr>
                <tr style="background:#fff5f5;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">(aa)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">He has <strong>engaged in activities prejudicial to the interest of the security of the State</strong></td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">(b)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">A criminal case is <strong>under investigation, inquiry or trial</strong></td></tr>
            </table>

            <h4 style="color:#922b21;">Deemed Suspension [Rule 10(2)] — Automatic!</h4>
            <p>A Govt. servant shall be <strong>deemed to be placed under suspension</strong> by the Appointing Authority —</p>
            <table style="width:100%; border-collapse:collapse; margin-bottom:15px;">
                <tr style="background:#f5b7b1; color:#922b21;">
                    <th style="padding:10px; border:1px solid #ec7063;">Clause</th>
                    <th style="padding:10px; border:1px solid #ec7063;">Trigger</th>
                    <th style="padding:10px; border:1px solid #ec7063;">Effective from</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">(a)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Detained in custody (criminal or otherwise) for more than <strong>48 hours</strong></td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">Date of detention</td></tr>
                <tr style="background:#fff5f5;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">(b)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Convicted and sentenced to imprisonment exceeding <strong>48 hours</strong> (and not immediately dismissed)</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">Date of conviction</td></tr>
            </table>
            <p><em><strong>Explanation:</strong> The 48-hour imprisonment period is computed from the <strong>commencement of imprisonment after conviction</strong>. Intermittent periods are counted together.</em></p>

            <h4 style="color:#922b21;">Suspension Review & Time Limits</h4>
            <table style="width:100%; border-collapse:collapse;">
                <tr style="background:#f5b7b1; color:#922b21;">
                    <th style="padding:10px; border:1px solid #ec7063;">Provision</th>
                    <th style="padding:10px; border:1px solid #ec7063;">Time Limit</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Review of suspension order by competent authority [Rule 10(6)]</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">Before expiry of <strong>90 days</strong> from effective date of suspension</td></tr>
                <tr style="background:#fff5f5;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Extension of suspension (single extension) [Rule 10(6)]</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">Not exceeding <strong>180 days</strong> at a time</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Suspension order not valid unless reviewed [Rule 10(7)]</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">Lapses after <strong>90 days</strong> if not extended</td></tr>
            </table>

            <h4 style="color:#922b21; margin-top:15px;">Maximum Suspension Periods (Without Charge Sheet)</h4>
            <table style="width:100%; border-collapse:collapse;">
                <tr style="background:#f5b7b1; color:#922b21;">
                    <th style="padding:10px; border:1px solid #ec7063;">Ground (Rule 10(1))</th>
                    <th style="padding:10px; border:1px solid #ec7063;">Maximum Period</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Clause (a) — Disciplinary proceeding contemplated/pending</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;"><strong>270 days</strong> from date of suspension order</td></tr>
                <tr style="background:#fff5f5;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Clause (aa) — Security of State / (b) Criminal case</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;"><strong>2 years</strong> from date of suspension order</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Deemed suspension (custody released) — Clause (2)</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;"><strong>2 years</strong> from date of release / intimation to appointing authority</td></tr>
            </table>
        </div>

        <div style="background:#f0f7ff; border:1px solid #c8dff5; padding:15px; border-radius:12px; margin-bottom:20px; color:#1a1a1a;">
            <h3 style="color:#1a3a5c; margin-top:0;">⚖️ Part-V: Penalties — Rule 11</h3>
            <p>Penalties may be imposed for <strong>"good and sufficient reasons"</strong> only.</p>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                <div style="background:#fff9f0; border:1px solid #fdebd0; padding:15px; border-radius:10px; color:#1a1a1a;">
                    <h4 style="color:#784212; margin-top:0; text-align:center;">Minor Penalties (i–iv)</h4>
                    <ol style="padding-left:20px;">
                        <li><strong>(i)</strong> Censure</li>
                        <li><strong>(ii)</strong> Withholding of promotion</li>
                        <li><strong>(iii)</strong> Recovery from pay of pecuniary loss caused by negligence/breach of orders</li>
                        <li><strong>(iii-a)</strong> Reduction to lower stage in pay scale by <strong>1 stage</strong> for max <strong>3 years</strong>, <em>without cumulative effect</em>, not adversely affecting pension</li>
                        <li><strong>(iv)</strong> Withholding of increments of pay</li>
                    </ol>
                </div>
                <div style="background:#fdf2f2; border:1px solid #f5b7b1; padding:15px; border-radius:10px; color:#1a1a1a;">
                    <h4 style="color:#922b21; margin-top:0; text-align:center;">Major Penalties (v–ix)</h4>
                    <ol start="5" style="padding-left:20px;">
                        <li><strong>(v)</strong> Reduction to lower stage in pay scale for specified period (with/without cumulative effect)</li>
                        <li><strong>(vi)</strong> Reduction to lower time-scale / grade / post / Service — <em>bar to promotion</em></li>
                        <li><strong>(vii)</strong> Compulsory Retirement</li>
                        <li><strong>(viii)</strong> Removal from service — <em style="color:#117a65;">NOT a disqualification for future employment</em></li>
                        <li><strong>(ix)</strong> Dismissal from service — <em style="color:#c0392b;">IS a disqualification for future employment</em></li>
                    </ol>
                </div>
            </div>

            <div style="background:#fff8e1; border:1px solid #ffe082; padding:12px; border-radius:10px; margin-top:15px; color:#1a1a1a;">
                <h4 style="color:#6d4c41; margin-top:0;">Mandatory Penalty — Removal or Dismissal</h4>
                <p>In every case where charge of <strong>possession of disproportionate assets</strong> or <strong>acceptance of any gratification other than legal remuneration (bribery)</strong> is established, the penalty of <strong>Removal or Dismissal from service SHALL be imposed</strong>.</p>
            </div>

            <h4 style="color:#1a3a5c; margin-top:15px;">What is NOT a Penalty (Explanation to Rule 11)?</h4>
            <ul>
                <li>Withholding of increment for failure to pass departmental examination (if in terms of appointment)</li>
                <li>Stoppage at efficiency bar for unfitness</li>
                <li>Non-promotion of a Govt. servant (substantive or officiating) for whom he is eligible</li>
                <li>Reversion from officiating higher service on administrative grounds unconnected with conduct</li>
                <li>Reversion from probation at end of probation period</li>
                <li>Compulsory retirement on superannuation</li>
                <li>Termination of probationer / temporary Govt. servant as per terms</li>
                <li>Compensation under Complaints Committee for sexual harassment (Rule 3-C of CCS Conduct Rules, 1964)</li>
            </ul>
        </div>
    `,
    practical_example: `
        <div style="background:#fff; border:1px solid #e0e0e0; border-radius:16px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05); color:#1a1a1a;">

            <div style="margin-bottom:20px;">
                <span style="background:#fdf2f2; color:#c0392b; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; text-transform:uppercase;">Rule 12 — Disciplinary Authorities</span>
                <ul style="margin-top:10px; line-height:1.8;">
                    <li>The <strong>President</strong> may impose any penalty on any Govt. servant.</li>
                    <li>Appointing authority or any authority specified in the Schedule can impose <strong>any penalty</strong>.</li>
                    <li><strong>Major penalties (v) to (ix)</strong> can only be imposed by an authority <strong>not less than the appointing authority</strong>.</li>
                    <li>At <strong>LBSNAA</strong>, the Director of the Academy can impose minor penalties (i) and (iii) on probationers.</li>
                </ul>
            </div>

            <div style="margin-bottom:20px; padding-top:15px; border-top:1px solid #f0f0f0;">
                <span style="background:#e8f4fd; color:#2196f3; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; text-transform:uppercase;">Govt. Decisions under Rule 12</span>
                <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                    <tr style="background:#eaf4fc; color:#1a4a6e; font-weight:bold;">
                        <th style="padding:10px; border:1px solid #aed6f1;">Point</th>
                        <th style="padding:10px; border:1px solid #aed6f1;">Rule / Limit</th>
                    </tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Departmental inquiry completion time by IO</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">6 months</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">IO must be senior in rank to charge officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Yes, mandatory</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Panel of retired IO valid for</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">3 years</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Retired IO — Cases per year / at a time</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">8 per year / max 4 at a time</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Serving IO (IP/ASP) — Cases per year / at a time</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">10 per year / max 2 at a time</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Defense Assistant (Retired) — Cases at a time</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">8 per year / max 4 at a time</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Defense Assistant (Serving) — Cases at a time</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">Max 3 at a time</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Inquiry Report submitted in</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">2 copies to disciplinary authority</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">"Censure" is a penalty; "Warning" is</td><td style="padding:9px; border:1px solid #eee; font-weight:bold; color:#c0392b;">NOT a penalty</td></tr>
                </table>
            </div>

            <div style="margin-bottom:20px; padding-top:15px; border-top:1px solid #f0f0f0;">
                <span style="background:#f0fff4; color:#117a65; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; text-transform:uppercase;">Honorarium for Inquiry Officers</span>
                <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                    <tr style="background:#d5f5e3; color:#1a5c3a;">
                        <th style="padding:10px; border:1px solid #a9dfbf;">Category</th>
                        <th style="padding:10px; border:1px solid #a9dfbf;">Role</th>
                        <th style="padding:10px; border:1px solid #a9dfbf;">Rate</th>
                    </tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Serving officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Inquiry Officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">15% of Basic Pay drawn</td></tr>
                    <tr style="background:#f0fff4;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Serving officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Presenting Officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">10% of Basic Pay drawn</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Retired IO — Category I (>10 witnesses)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Inquiry Officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">90% of Monthly Basic Pension</td></tr>
                    <tr style="background:#f0fff4;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Retired IO — Category II (6-10 witnesses)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Inquiry Officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">70% of Monthly Basic Pension</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Retired IO — Category III (<6 witnesses)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Inquiry Officer</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">60% of Monthly Basic Pension</td></tr>
                    <tr style="background:#f0fff4;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;" colspan="2">Transport Allowance (Retired IO)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">₹40,000 per case</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Secretarial Assistance (>10 witnesses)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">₹40,000</td></tr>
                    <tr style="background:#f0fff4;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Secretarial Assistance (6-10 witnesses)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">₹30,000</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Secretarial Assistance (<6 witnesses)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">₹20,000</td></tr>
                    <tr style="background:#f0fff4;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;" colspan="2">Common proceedings — additional amount</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">₹5,000 (both retired and serving)</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee;" colspan="2">Payment schedule</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">50% on submission of report; Remaining within <strong>45 days</strong></td></tr>
                </table>
            </div>

            <div style="padding-top:15px; border-top:1px solid #f0f0f0;">
                <span style="background:#fef9e7; color:#b7950b; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; text-transform:uppercase;">Disciplinary & Appellate Authority — Postal Services</span>
                <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                    <tr style="background:linear-gradient(90deg,#1b2631,#2c3e50); color:white;">
                        <th style="padding:10px; border:1px solid #2c3e50;">Category of Officer</th>
                        <th style="padding:10px; border:1px solid #2c3e50;">Disciplinary Authority</th>
                        <th style="padding:10px; border:1px solid #2c3e50;">Appellate Authority</th>
                    </tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">SAG/HAG/JAG/STS/JTS (IPOS Group A)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">President</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">N/A</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">PS Group B (SPOs/SRMs/ADs etc.)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">DG (Posts)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">President</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">PS Group B (SPOs/SRMs/Ads etc.)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">CPMG</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">DG (Posts)</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Group B Gazetted ASP/ASRM</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">CPMG</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">Member (P)</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Group B Gazetted ASP/ASRM</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">DPS</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">CPMG</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Group B Non-Gazetted IRM/IP</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">DPS</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">PMG/CPMG</td></tr>
                    <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Group C (PA/SA)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">SSPOs/SPOs / SSRMs/SRMs</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">DPS</td></tr>
                    <tr style="background:#f9f9f9;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Group C (Postman/Mail Guard/MTS)</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">IP/IRM/Postmaster</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; font-weight:bold;">SPOs/SSPOs/SRM/SSRMs</td></tr>
                </table>
            </div>
        </div>
    `,
    exam_insight: `
        <div style="background:linear-gradient(135deg, #fffcf0 0%, #fff7d6 100%); border:1px solid #f1c40f; padding:20px; border-radius:16px; margin-bottom:25px; color:#1a1a1a;">
            <h3 style="color:#9c640c; margin-top:0;">🔥 Master Time Limits Table — CCS (CCA) Rules, 1965</h3>
            <table style="width:100%; border-collapse:collapse; border-radius:8px; overflow:hidden;">
                <tr style="background:#e67e22; color:white;">
                    <th style="padding:11px; border:1px solid #ca6f1e;">Sl.</th>
                    <th style="padding:11px; border:1px solid #ca6f1e;">Provision / Action</th>
                    <th style="padding:11px; border:1px solid #ca6f1e; text-align:center;">Time Limit</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">1</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Detention in custody triggering deemed suspension</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">Exceeding 48 hours</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">2</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Imprisonment after conviction triggering deemed suspension</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">Exceeding 48 hours</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">3</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">First review of suspension order</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">Before 90 days</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">4</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Maximum extension of suspension (single extension)</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">180 days at a time</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">5</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Max suspension without charge sheet — [Rule 10(1)(a)]</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">270 days</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">6</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Max suspension without charge sheet — [Rule 10(1)(aa)/(b)]</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">2 years</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">7</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Completion of departmental inquiry by IO</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">6 months</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">8</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Written representation against charge sheet by charged official</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">15 days</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">9</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Written representation on advice of UPSC by charged official</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">15 days</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">10</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Written representation on inquiry report [Rule 15(2)]</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">15 days</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">11</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Sending proposal to CVC (first stage / second stage advice)</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">1 month from receipt of investigation report</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">12</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Final order after inquiry</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">Within 3 months</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">13</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Major penalty proceeding (from charge sheet to completion)</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">18 months</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">14</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">IO Honorarium — remaining payment after 50% on submission</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">Within 45 days</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">15</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Period of limitation for filing appeal [Rule 25]</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">45 days from delivery of order</td></tr>
                <tr style="background:#fffde7;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">16</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Revision by appellate authority [Rule 29(v)]</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">Within 6 months of the order proposed to be revised</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a; text-align:center;">17</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Panel of retired IO valid for</td><td style="padding:9px; border:1px solid #eee; text-align:center; font-weight:bold; color:#c0392b;">3 years</td></tr>
            </table>
        </div>

        <div style="background:#f0f7ff; border:1px solid #c8dff5; padding:20px; border-radius:16px; margin-bottom:25px; color:#1a1a1a;">
            <h3 style="color:#1a3a5c; margin-top:0;">📋 Part-VI to IX — Procedure, Appeal, Revision & Review</h3>

            <h4 style="color:#1a3a5c;">Rule 14 — Major Penalty Procedure</h4>
            <p>No major penalty (v to ix) shall be imposed <strong>except after an inquiry held as provided under Rule 14 and Rule 15</strong>. The inquiry report must contain:</p>
            <ul>
                <li>Articles of charge and imputations of misconduct/misbehaviour</li>
                <li>Defence of the Govt. servant on each article</li>
                <li>Assessment of evidence on each article</li>
                <li>Findings on each article with reasons</li>
            </ul>

            <h4 style="color:#1a3a5c;">Rule 16 — Minor Penalty Procedure</h4>
            <p>For minor penalties (i to iv): Govt. servant must be <strong>informed in writing</strong> of the proposal and given <strong>reasonable opportunity</strong> to make representation. Formal inquiry NOT mandatory.</p>

            <h4 style="color:#1a3a5c;">Rule 19 — Special Procedure (No Inquiry Needed)</h4>
            <p>Normal inquiry (Rules 14–18) can be bypassed when:</p>
            <ol>
                <li>Penalty is imposed based on conduct that led to <strong>conviction on a criminal charge</strong></li>
                <li>Disciplinary authority is satisfied that inquiry is <strong>not reasonably practicable</strong></li>
                <li>President is satisfied that holding inquiry is <strong>not expedient in the interest of security of the State</strong></li>
            </ol>

            <h4 style="color:#1a3a5c;">Rules 22 & 23 — Appeal: Lies / Does NOT Lie</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                <div style="background:#fdf2f2; border:1px solid #f5b7b1; padding:12px; border-radius:10px; color:#1a1a1a;">
                    <h5 style="color:#922b21; margin-top:0;">No Appeal Lies Against (Rule 22):</h5>
                    <ul style="margin:0; padding-left:18px; font-size:13px;">
                        <li>Any order made by the <strong>President</strong></li>
                        <li>Interlocutory / step-in-aid orders (except suspension)</li>
                        <li>Orders by inquiring authority during inquiry under Rule 14</li>
                    </ul>
                </div>
                <div style="background:#f0fff4; border:1px solid #d5f5e3; padding:12px; border-radius:10px; color:#1a1a1a;">
                    <h5 style="color:#1a5c3a; margin-top:0;">Appeal Lies Against (Rule 23):</h5>
                    <ul style="margin:0; padding-left:18px; font-size:13px;">
                        <li>Suspension order under Rule 10</li>
                        <li>Order imposing any penalty under Rule 11</li>
                        <li>Order enhancing any penalty</li>
                        <li>Order denying/varying pay, allowances, pension to his disadvantage</li>
                        <li>Stopping at efficiency bar on ground of unfitness</li>
                        <li>Reverting while officiating in higher service/grade/post</li>
                    </ul>
                </div>
            </div>

            <h4 style="color:#1a3a5c; margin-top:15px;">Rule 29 — Revision vs Rule 29-A — Review</h4>
            <table style="width:100%; border-collapse:collapse;">
                <tr style="background:#c8dff5; color:#1a3a5c;">
                    <th style="padding:10px; border:1px solid #a9cce3;">Feature</th>
                    <th style="padding:10px; border:1px solid #a9cce3;">Revision (Rule 29)</th>
                    <th style="padding:10px; border:1px solid #a9cce3;">Review (Rule 29-A)</th>
                </tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Stage</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;"><strong>After Appeal</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Any time</td></tr>
                <tr style="background:#f0f7ff;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Initiated by</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Suo motu OR on application</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">President, on own motion or otherwise</td></tr>
                <tr><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Key condition</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Authority who decided appeal <strong>CANNOT</strong> revise his own order</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">New material or evidence which <strong>could not be produced or was not available</strong> at time of passing order</td></tr>
                <tr style="background:#f0f7ff;"><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Time limit</td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">Appellate authority within <strong>6 months</strong></td><td style="padding:9px; border:1px solid #eee; color:#1a1a1a;">No specific limit</td></tr>
            </table>
        </div>

        <div style="background:linear-gradient(135deg, #fff0f0 0%, #ffe6e6 100%); border:1px solid #f5b7b1; padding:20px; border-radius:16px; margin-bottom:20px; color:#1a1a1a;">
            <h3 style="color:#922b21; margin-top:0;">⚡ One-Line Quick Revision</h3>
            <ul style="list-style-type:'→ '; padding-left:20px; color:#2c2c2c; line-height:2;">
                <li>CCS (CCA) Rules came into force: <strong>01 December 1965</strong></li>
                <li>"Warning" is <strong>NOT a penalty</strong>; "Censure" IS a penalty</li>
                <li>Removal = NOT disqualified; Dismissal = <strong>Disqualified</strong> for future Govt. employment</li>
                <li>Bribery/DA assets established → Mandatory <strong>Removal or Dismissal</strong></li>
                <li>Deemed suspension: custody/imprisonment exceeds <strong>48 hours</strong></li>
                <li>First suspension review: before <strong>90 days</strong>; max extension: <strong>180 days</strong></li>
                <li>Without charge sheet: max <strong>270 days</strong> (clause a) or <strong>2 years</strong> (clause aa/b)</li>
                <li>Appeal period: <strong>45 days</strong>; Revision by appellate authority: <strong>6 months</strong></li>
                <li>Inquiry completion: <strong>6 months</strong>; Major penalty time limit: <strong>18 months</strong></li>
                <li>Disciplinary cases closed on <strong>death</strong> of the charged official</li>
                <li>Conviction on criminal charge → Special procedure → <strong>No inquiry required</strong></li>
                <li>Review (29-A) allowed only when <strong>new evidence not available earlier</strong> surfaces</li>
                <li>Appellate authority considers: Procedure + Evidence + Adequacy of penalty</li>
            </ul>
        </div>
    `,
    status: "published",
    created_by: "system_admin",
    createdAt: now,
    updatedAt: now
};

async function seed() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const db = client.db();
        const collection = db.collection('daksutras');

        // Check if exists and delete
        await collection.deleteOne({ title: entry.title });

        const result = await collection.insertOne(entry);
        console.log(`✓ Seeded "${entry.title}" successfully (ID: ${result.insertedId})!`);

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

seed();
