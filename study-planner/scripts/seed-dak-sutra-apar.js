
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

// ═══════════════════════════════════════════════════════════════════════
// ENTRY 1 — APAR: Structure, Grading System & Integrity Guidelines
// ═══════════════════════════════════════════════════════════════════════
{
    title: "APAR — Structure, Grading System & Integrity Guidelines",
    rule_number: "DOP&T Instructions on APAR",
    act_name: "Instructions on Maintenance of APAR",
    category: "Explanation",
    effective_date: new Date("2009-09-01"),
    exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts", "PA/SA"],
    status: "published",
    created_by: "system@dakguru.com",
    createdAt: now,
    updatedAt: now,

    official_text: `
        <div style="background:linear-gradient(135deg,#e8f4fd,#d6eaf8); border-left:5px solid #2980b9; padding:18px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#1a5276; margin-top:0; font-size:1.1em;">📋 What is APAR?</h3>
            <p style="margin-bottom:8px;">The <strong>Annual Performance Assessment Report (APAR)</strong> is written by the <em>immediate superior officer</em> (Reporting Officer) for every Government servant in an <strong>objective and impartial manner</strong>. The performance period covers the financial year: <strong>April – March</strong>.</p>
            <p style="margin:0;">APAR is a vital document for career advancement — <strong>Confirmation, Promotion, Deputation, and Foreign Assignment</strong>.</p>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#1b4f72,#2980b9); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🎯 Two Principal Objectives of APAR</h3>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0;">
                <div style="padding:16px; border-right:1px solid #d5d8dc; background:#eaf4fb;">
                    <div style="font-size:2em; text-align:center; margin-bottom:8px;">🚀</div>
                    <p style="margin:0; text-align:center;"><strong>Objective 1</strong><br/>Improve the performance of the subordinate in their <em>present job</em></p>
                </div>
                <div style="padding:16px; background:#e9f7ef;">
                    <div style="font-size:2em; text-align:center; margin-bottom:8px;">🌱</div>
                    <p style="margin:0; text-align:center;"><strong>Objective 2</strong><br/>Assess potentialities and prepare them for <em>future opportunities</em></p>
                </div>
            </div>
            <div style="padding:12px 16px; background:#fef9e7; border-top:1px solid #d5d8dc;">
                <p style="margin:0; font-size:0.9em; color:#7d6608;"><strong>⭐ Key Principle:</strong> The Reporting Officer's focus must be <strong>DEVELOPMENTAL rather than JUDGMENTAL</strong>. APAR is a true indicator of achievement — NOT a tool for control or discipline.</p>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#6c3483,#a569bd); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📂 Structure of APAR — 4 Sections</h3>
            </div>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4ecf7; color:#4a235a;">
                        <th style="padding:12px; text-align:center; border:1px solid #d7bde2; width:15%;">Section</th>
                        <th style="padding:12px; text-align:left; border:1px solid #d7bde2; width:30%;">Name</th>
                        <th style="padding:12px; text-align:left; border:1px solid #d7bde2;">Filled By</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fff;">
                        <td style="padding:11px; text-align:center; border:1px solid #d7bde2; font-weight:bold; color:#6c3483;">I</td>
                        <td style="padding:11px; border:1px solid #d7bde2;"><strong>Basic Information</strong></td>
                        <td style="padding:11px; border:1px solid #d7bde2;">Administration Division / Personnel Department</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:11px; text-align:center; border:1px solid #d7bde2; font-weight:bold; color:#1a5276;">II</td>
                        <td style="padding:11px; border:1px solid #d7bde2;"><strong>Self-Appraisal</strong></td>
                        <td style="padding:11px; border:1px solid #d7bde2;">The <strong>Appraisee</strong> (Government servant reported upon)</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:11px; text-align:center; border:1px solid #d7bde2; font-weight:bold; color:#1e8449;">III</td>
                        <td style="padding:11px; border:1px solid #d7bde2;"><strong>Appraisal</strong></td>
                        <td style="padding:11px; border:1px solid #d7bde2;"><strong>Reporting Officer</strong> (and Reviewing Officer, if necessary)</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:11px; text-align:center; border:1px solid #d7bde2; font-weight:bold; color:#922b21;">IV</td>
                        <td style="padding:11px; border:1px solid #d7bde2;"><strong>Review</strong></td>
                        <td style="padding:11px; border:1px solid #d7bde2;"><strong>Reviewing Officer</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div style="background:#eafaf1; border:1px solid #a9dfbf; padding:16px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#1e8449; margin-top:0;">✍️ Self-Appraisal by Appraisee (Section II)</h3>
            <ul style="margin:0; padding-left:20px; line-height:1.8;">
                <li>APAR is <strong>initiated by the Appraisee</strong> (Government servant reported upon)</li>
                <li>Must give <strong>duty description in not more than 100 words</strong></li>
                <li>Must specify: <em>Targets set, Achievements, Shortfalls (if any), Constraints encountered, Areas of greater achievement</em></li>
                <li>Self-appraisal is <strong>mandatory for LSG and above</strong> (in Department of Posts)</li>
            </ul>
        </div>
    `,

    guru_explanation: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1a5276,#2980b9); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📊 APAR Grading System (Scale: 1–10)</h3>
            </div>
            <div style="padding:14px; background:#eaf4fb;">
                <p style="margin:0 0 10px 0; font-size:0.9em;"><strong>Numerical grades</strong> are awarded on a scale of <strong>1 (lowest) to 10 (highest)</strong> for three parameters:</p>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:12px;">
                    <div style="background:#d6eaf8; padding:12px; border-radius:8px; text-align:center; border-top:4px solid #2980b9;">
                        <div style="font-size:1.8em; font-weight:bold; color:#1a5276;">40%</div>
                        <div style="font-size:0.85em; color:#1a5276; font-weight:bold;">Work Output</div>
                    </div>
                    <div style="background:#d5f5e3; padding:12px; border-radius:8px; text-align:center; border-top:4px solid #27ae60;">
                        <div style="font-size:1.8em; font-weight:bold; color:#1e8449;">30%</div>
                        <div style="font-size:0.85em; color:#1e8449; font-weight:bold;">Personal Attributes</div>
                    </div>
                    <div style="background:#fdebd0; padding:12px; border-radius:8px; text-align:center; border-top:4px solid #e67e22;">
                        <div style="font-size:1.8em; font-weight:bold; color:#d35400;">30%</div>
                        <div style="font-size:0.85em; color:#d35400; font-weight:bold;">Functional Competency</div>
                    </div>
                </div>
            </div>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="background:#1a5276; color:white; font-size:0.9em;">
                        <th style="padding:12px; text-align:center; border:1px solid #1a5276;">Grading Score</th>
                        <th style="padding:12px; text-align:center; border:1px solid #1a5276;">Avg. Score for Promotion</th>
                        <th style="padding:12px; text-align:center; border:1px solid #1a5276;">Rating</th>
                        <th style="padding:12px; text-align:center; border:1px solid #1a5276;">MACP Eligible?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fef9e7;">
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; font-size:1em; color:#d4ac0d;">8 – 10</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; color:#d4ac0d;">9</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd;">
                            <span style="background:#fef9e7; border:2px solid #f1c40f; color:#d4ac0d; padding:3px 12px; border-radius:20px; font-weight:bold; font-size:0.9em;">⭐ OUTSTANDING</span>
                        </td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; color:#1e8449; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; font-size:1em; color:#2980b9;">6 – less than 8</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; color:#2980b9;">7</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd;">
                            <span style="background:#eaf4fb; border:2px solid #2980b9; color:#2980b9; padding:3px 12px; border-radius:20px; font-weight:bold; font-size:0.9em;">🔵 VERY GOOD</span>
                        </td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; color:#1e8449; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#eafaf1;">
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; font-size:1em; color:#27ae60;">4 – less than 6</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; color:#27ae60;">5</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd;">
                            <span style="background:#eafaf1; border:2px solid #27ae60; color:#27ae60; padding:3px 12px; border-radius:20px; font-weight:bold; font-size:0.9em;">🟢 GOOD</span>
                        </td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; color:#e74c3c; font-weight:bold;">❌ No</td>
                    </tr>
                    <tr style="background:#fdedec;">
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; font-size:1em; color:#c0392b;">Below 4</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; font-weight:bold; color:#c0392b;">0</td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd;">
                            <span style="background:#fdedec; border:2px solid #e74c3c; color:#c0392b; padding:3px 12px; border-radius:20px; font-weight:bold; font-size:0.9em;">⛔ UNRATED</span>
                        </td>
                        <td style="padding:12px; text-align:center; border:1px solid #ddd; color:#e74c3c; font-weight:bold;">❌ No</td>
                    </tr>
                </tbody>
            </table>
            <div style="padding:12px 16px; background:#fef5e7; border-top:2px solid #f39c12;">
                <p style="margin:0; font-size:0.88em; color:#784212;"><strong>⚠️ 7th CPC Benchmark (Effective 2016):</strong> For MACP/Promotion, minimum benchmark is <strong>"Very Good" (Score ≥ 6)</strong>. "Good" (Score 5) is NO LONGER sufficient. Any grade below 6 renders employee unfit for MACP.</p>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#784212,#ca6f1e); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🔒 Integrity Column — 3 Options</h3>
            </div>
            <div style="padding:14px;">
                <p style="margin:0 0 12px 0; font-size:0.9em; color:#444;">The Reporting Officer <strong>must select one</strong> of the following three options:</p>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#eafaf1; padding:12px; border-radius:8px; border-left:4px solid #27ae60;">
                        <span style="background:#27ae60; color:white; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.85em;">1</span>
                        <p style="margin:0; color:#1e8449;"><em>"Beyond doubt"</em></p>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#fdedec; padding:12px; border-radius:8px; border-left:4px solid #e74c3c;">
                        <span style="background:#e74c3c; color:white; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.85em;">2</span>
                        <p style="margin:0; color:#c0392b;"><em>"Since the integrity of the officer is doubtful, a <strong>secret note is attached</strong>."</em></p>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#fdfefe; padding:12px; border-radius:8px; border-left:4px solid #95a5a6; border:1px solid #eee;">
                        <span style="background:#7f8c8d; color:white; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.85em;">3</span>
                        <p style="margin:0; color:#555;"><em>"Not watched the officer's work for sufficient time to form a definite judgment but <strong>nothing adverse has been reported</strong> to me about the officer."</em></p>
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1e8449,#27ae60); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📝 General Guidelines for Filling APAR</h3>
            </div>
            <div style="padding:14px;">
                <table style="width:100%; border-collapse:collapse;">
                    <tr style="background:#eafaf1;">
                        <td style="padding:10px 14px; border:1px solid #a9dfbf; width:40%;"><strong>Absence & Training</strong></td>
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;">Period of absence (leave/training) must be mentioned. Training details & date of filing property returns must be recorded.</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;"><strong>Justification of Low Grades (1 or 2)</strong></td>
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;">Must be <strong>adequately justified</strong> with specific failures.</td>
                    </tr>
                    <tr style="background:#eafaf1;">
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;"><strong>Justification of High Grades (9 or 10)</strong></td>
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;">Must be <strong>justified with specific accomplishments</strong>.</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;"><strong>Peer Comparison</strong></td>
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;">Rate the officer against a <em>larger population of peers</em> currently or previously working under them.</td>
                    </tr>
                    <tr style="background:#eafaf1;">
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;"><strong>Near Relatives</strong></td>
                        <td style="padding:10px 14px; border:1px solid #a9dfbf;">Near relative should not be posted under a Reporting Authority for long. If inescapable, APAR must be written by the <strong>Reviewing Officer</strong>.</td>
                    </tr>
                </table>
            </div>
        </div>
    `,

    practical_example: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#922b21,#e74c3c); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">⏱️ Eligibility — Minimum 3-Month Rule</h3>
            </div>
            <div style="padding:14px; background:#fdedec;">
                <p style="margin:0 0 10px 0;"><strong>Both Reporting and Reviewing Officers</strong> must have at least <strong>3 months of experience</strong> supervising the government servant before recording assessment.</p>
                <div style="background:#fff; border:1px solid #f1948a; padding:10px; border-radius:8px; font-size:0.88em; color:#922b21;">
                    <strong>🔍 Leave Deduction Rule:</strong> If Earned Leave taken is <strong>more than 15 days</strong>, the leave period is <strong>deducted</strong> from the total tenure when calculating the 3-month eligibility. Short-term leave is not counted.
                </div>
            </div>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="background:#922b21; color:white; font-size:0.88em;">
                        <th style="padding:11px; text-align:left; border:1px solid #c0392b;">Scenario</th>
                        <th style="padding:11px; text-align:left; border:1px solid #c0392b;">Rule</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fff;">
                        <td style="padding:10px; border:1px solid #e9e9e9; font-weight:bold;">Multiple Reports in a year</td>
                        <td style="padding:10px; border:1px solid #e9e9e9;">Two or more independent reports allowed — each Reporting Officer must have <strong>min. 3 months</strong> experience</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:10px; border:1px solid #e9e9e9; font-weight:bold;">No Eligible Reporting Officer</td>
                        <td style="padding:10px; border:1px solid #e9e9e9;"><strong>Reviewing Officer</strong> may initiate report as Reporting Officer (if they were the same throughout &amp; can fill necessary columns)</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; border:1px solid #e9e9e9; font-weight:bold;">Retirement of Reporting/Reviewing Officer</td>
                        <td style="padding:10px; border:1px solid #e9e9e9;">May write report within <strong>1 month of retirement</strong></td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:10px; border:1px solid #e9e9e9; font-weight:bold;">Officer under Suspension</td>
                        <td style="padding:10px; border:1px solid #e9e9e9;">May write/review within <strong>2 months of suspension</strong> or <strong>1 month from due date</strong>, whichever is <em>later</em></td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; border:1px solid #e9e9e9; font-weight:bold;">Transfer during the year</td>
                        <td style="padding:10px; border:1px solid #e9e9e9;">Must write APARs for all staff up to date of transfer within <strong>3–5 weeks</strong> of transfer</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:10px; border:1px solid #e9e9e9; font-weight:bold;">Honorary / Part-time Officials</td>
                        <td style="padding:10px; border:1px solid #e9e9e9;"><strong>APAR need NOT be written</strong> for officers on honorary or purely part-time basis</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    exam_insight: `
        <div style="background:#f4f6f7; border-radius:12px; padding:16px; margin-bottom:16px;">
            <h3 style="color:#1a252f; margin-top:0; font-size:1em;">🎯 High-Probability Exam Points</h3>
            <ul style="margin:0; padding-left:20px; line-height:2;">
                <li>APAR period = <strong>April to March</strong> (Financial Year)</li>
                <li>Self-appraisal duty description = <strong>max 100 words</strong></li>
                <li>Minimum supervision required for Reporting/Reviewing Officer = <strong>3 months</strong></li>
                <li>Retirement case = report within <strong>1 month</strong></li>
                <li>Suspension case = within <strong>2 months of suspension</strong> or <strong>1 month from due date</strong> — whichever is <strong>LATER</strong></li>
                <li>Transfer case = within <strong>3–5 weeks</strong> of transfer</li>
                <li>Overall grade weightage = <strong>40% Work Output + 30% Personal Attributes + 30% Functional Competency</strong></li>
                <li>7th CPC benchmark = <strong>Very Good (≥6)</strong> for both MACP and Promotion</li>
                <li>Grades 1 or 2 → must give <strong>specific reasons for failure</strong></li>
                <li>Grades 9 or 10 → must give <strong>specific accomplishments</strong></li>
                <li>Integrity options = <strong>3</strong> (Beyond doubt / Doubtful with secret note / Insufficient watch)</li>
                <li>Near relative case → APAR written by <strong>Reviewing Officer</strong></li>
            </ul>
        </div>
    `
},

// ═══════════════════════════════════════════════════════════════════════
// ENTRY 2 — APAR: Time Schedule, Benchmarks, Custody & DoP Guidelines
// ═══════════════════════════════════════════════════════════════════════
{
    title: "APAR — Time Schedule, Benchmarks, Custody & DoP Guidelines",
    rule_number: "DOP&T Instructions on APAR — Annexure & DoP Guidelines",
    act_name: "Instructions on Maintenance of APAR",
    category: "Explanation",
    effective_date: new Date("2009-09-01"),
    exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts", "PA/SA"],
    status: "published",
    created_by: "system@dakguru.com",
    createdAt: now,
    updatedAt: now,

    official_text: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#154360,#1f618d); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📅 Complete APAR Time Schedule (Financial Year)</h3>
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
                <thead>
                    <tr style="background:#154360; color:white;">
                        <th style="padding:11px 14px; text-align:center; border:1px solid #1f618d; width:8%;">S.No.</th>
                        <th style="padding:11px 14px; text-align:left; border:1px solid #1f618d;">Activity</th>
                        <th style="padding:11px 14px; text-align:center; border:1px solid #1f618d; width:22%;">Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">1</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Distribution of blank APAR forms</strong> to all concerned (to the officer to be reported upon where self-appraisal is required)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276; background:#d6eaf8;">31st March<br/><span style="font-size:0.8em; font-weight:normal; color:#555;">(may be done a week earlier)</span></td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">2</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Submission of self-appraisal</strong> to the Reporting Officer by the officer (where applicable)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1e8449; background:#eafaf1;">15th April</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">3</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Submission of report by Reporting Officer</strong> to Reviewing Officer</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1e8449; background:#eafaf1;">30th June</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">4</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Completion of Report by Reviewing Officer</strong> and sending to Administration / CR Section / Cell</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1e8449; background:#eafaf1;">31st July</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">5</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Appraisal by Accepting Authority</strong>, wherever provided</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#d35400; background:#fef5e7;">31st August</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">6</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;">
                            <strong>Disclosure to the officer reported upon:</strong><br/>
                            (a) Where there is <em>no</em> Accepting Authority<br/>
                            (b) Where there <em>is</em> an Accepting Authority
                        </td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#d35400; background:#fef5e7;">
                            1st September<br/>
                            15th September
                        </td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">7</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Receipt of representation</strong>, if any, on APAR</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#7d6608; background:#fef9e7;">15 days from date of receipt of communication</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">8</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;">
                            <strong>Forwarding representation to Competent Authority:</strong><br/>
                            (a) No Accepting Authority<br/>
                            (b) Accepting Authority exists
                        </td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#7d6608; background:#fef9e7;">
                            21st September<br/>
                            6th October
                        </td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">9</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Disposal of representation</strong> by the Competent Authority</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#922b21; background:#fdedec;">Within 1 month from receipt</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">10</td>
                        <td style="padding:10px; border:1px solid #d6eaf8;"><strong>Communication of decision</strong> of Competent Authority on representation by APAR Cell</td>
                        <td style="padding:10px; text-align:center; border:1px solid #d6eaf8; font-weight:bold; color:#922b21; background:#fdedec;">15th November</td>
                    </tr>
                    <tr style="background:#154360;">
                        <td style="padding:11px; text-align:center; border:1px solid #1f618d; font-weight:bold; color:#aed6f1;">11</td>
                        <td style="padding:11px; border:1px solid #1f618d; color:#aed6f1;"><strong>End of entire APAR process</strong> (Final taking on record)</td>
                        <td style="padding:11px; text-align:center; border:1px solid #1f618d; font-weight:bold; color:#f9e79f;">30th November</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    guru_explanation: `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
            <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden;">
                <div style="background:linear-gradient(90deg,#1e8449,#27ae60); padding:10px 14px;">
                    <h3 style="color:#fff; margin:0; font-size:0.95em;">📈 Performance Benchmarks (7th CPC)</h3>
                </div>
                <div style="padding:14px;">
                    <div style="background:#eafaf1; border-left:4px solid #27ae60; padding:12px; border-radius:0 8px 8px 0; margin-bottom:10px;">
                        <p style="margin:0; font-size:0.9em;"><strong>For DPC / Promotion:</strong><br/>Minimum <strong>"Very Good"</strong> required in <strong>3 years</strong> out of the last <strong>5 years</strong></p>
                    </div>
                    <div style="background:#eafaf1; border-left:4px solid #1e8449; padding:12px; border-radius:0 8px 8px 0;">
                        <p style="margin:0; font-size:0.9em;"><strong>For MACP:</strong><br/>Minimum <strong>"Very Good"</strong> required in <strong>5 years</strong> out of the last <strong>5 years</strong></p>
                    </div>
                </div>
            </div>
            <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden;">
                <div style="background:linear-gradient(90deg,#6c3483,#a569bd); padding:10px 14px;">
                    <h3 style="color:#fff; margin:0; font-size:0.95em;">📁 Custody of APARs</h3>
                </div>
                <div style="padding:14px;">
                    <table style="width:100%; border-collapse:collapse; font-size:0.88em;">
                        <tr style="background:#f4ecf7;">
                            <td style="padding:8px 10px; border:1px solid #d7bde2; font-weight:bold;">Group A &amp; B</td>
                            <td style="padding:8px 10px; border:1px solid #d7bde2;">Head of the Department (or authority specified by HoD)</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 10px; border:1px solid #d7bde2; font-weight:bold;">Group C</td>
                            <td style="padding:8px 10px; border:1px solid #d7bde2;">Authority specified by Head of the Department</td>
                        </tr>
                        <tr style="background:#fdedec;">
                            <td style="padding:8px 10px; border:1px solid #d7bde2; font-weight:bold; color:#922b21;">Key Constraint</td>
                            <td style="padding:8px 10px; border:1px solid #d7bde2; color:#922b21;">APAR must <strong>NOT</strong> be kept by authority <em>higher than</em> the appointing authority</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#784212,#ca6f1e); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🗂️ Preservation Period & Dossier Handling</h3>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0;">
                <div style="padding:14px; border-right:1px solid #e9e9e9;">
                    <h4 style="color:#784212; margin-top:0; font-size:0.9em;">📦 Preservation Period</h4>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        <div style="background:#fdedec; padding:10px; border-radius:8px; border-left:3px solid #e74c3c;">
                            <strong style="color:#c0392b;">Death:</strong><br/>
                            <span style="font-size:0.88em;">Preserved for <strong>2 years</strong> from date of death</span>
                        </div>
                        <div style="background:#fef9e7; padding:10px; border-radius:8px; border-left:3px solid #f39c12;">
                            <strong style="color:#784212;">Retirement / Dismissal / Removal / Resignation:</strong><br/>
                            <span style="font-size:0.88em;">Preserved for <strong>5 years</strong> from date of event</span>
                        </div>
                    </div>
                </div>
                <div style="padding:14px;">
                    <h4 style="color:#784212; margin-top:0; font-size:0.9em;">📬 Sending Dossier for Selection</h4>
                    <ul style="margin:0; padding-left:18px; font-size:0.88em; line-height:1.8; color:#555;">
                        <li>Always retain the <strong>original dossier</strong> with cadre authorities</li>
                        <li>Send only a <strong>photocopy</strong> to outside authority</li>
                        <li>Photocopies must be <strong>destroyed immediately</strong> after purpose is accomplished</li>
                    </ul>
                </div>
            </div>
        </div>

        <div style="background:#fef9e7; border:1px solid #f9e79f; padding:14px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#7d6608; margin-top:0; font-size:0.95em;">📋 No Report Certificate — When to Issue?</h3>
            <p style="font-size:0.9em; margin-bottom:8px;">When there is a gap in APAR for a period, the officer in-charge must place a <strong>"No Report Certificate"</strong> in the dossier. Valid reasons:</p>
            <ul style="margin:0; padding-left:20px; font-size:0.88em; line-height:1.8; color:#555;">
                <li>Officer did not work for minimum <strong>3 months</strong> under a reporting officer</li>
                <li>Officer was on <strong>leave or training</strong> during the period</li>
                <li>Officer was on <strong>unauthorized absence</strong> (if factually established)</li>
                <li>Time limit lapsed for retired Reporting/Reviewing Officer to make remarks</li>
            </ul>
        </div>

        <div style="background:#eaf4fb; border:1px solid #aed6f1; padding:14px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#1a5276; margin-top:0; font-size:0.95em;">🌐 Deputation / Foreign Service</h3>
            <ul style="margin:0; padding-left:20px; font-size:0.88em; line-height:1.9; color:#555;">
                <li>APAR is maintained by the <strong>parent Department</strong></li>
                <li>Periodicity = same as in the parent Department</li>
                <li>It is the <strong>parent Department's responsibility</strong> to obtain and maintain APAR of deputationist</li>
            </ul>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#17202a,#2e4057); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">💻 SPARROW System</h3>
            </div>
            <div style="padding:14px;">
                <p style="margin:0 0 10px 0; font-size:0.9em;"><strong>SPARROW</strong> = <em>Smart Performance Appraisal Report Recording Online Window</em></p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div style="background:#e8f4fd; padding:12px; border-radius:8px;">
                        <p style="margin:0; font-size:0.88em;"><strong>Maintained by:</strong> National Informatics Centre (NIC)</p>
                    </div>
                    <div style="background:#e8f4fd; padding:12px; border-radius:8px;">
                        <p style="margin:0; font-size:0.88em;"><strong>Launched:</strong> 01 April 2014</p>
                    </div>
                    <div style="background:#eafaf1; padding:12px; border-radius:8px; grid-column:span 2;">
                        <p style="margin:0; font-size:0.88em;"><strong>Scope in DoP:</strong> All APARs of <strong>Group 'A' officers (SSP Cadre onwards)</strong> are processed through SPARROW</p>
                    </div>
                </div>
            </div>
        </div>
    `,

    practical_example: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#0e2f44,#154360); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🏛️ Cadre-wise Reporting & Reviewing Officers — Department of Posts</h3>
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
                <thead>
                    <tr style="background:linear-gradient(90deg,#154360,#1f618d); color:white;">
                        <th style="padding:12px 14px; text-align:left; border:1px solid #1f618d;">Cadre</th>
                        <th style="padding:12px 14px; text-align:center; border:1px solid #1f618d;">Reporting Officer</th>
                        <th style="padding:12px 14px; text-align:center; border:1px solid #1f618d;">Reviewing Officer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">IP / ASP</td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center;"><strong>SSP / SP</strong></td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center;"><strong>DPS</strong></td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">PS Group B</td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center;"><strong>DPS</strong></td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center;"><strong>PMG or CPMG</strong></td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">PA / LSG / HSG</td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center;"><strong>SSP / SP of the Division</strong></td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center; font-style:italic; color:#555;">As per Circle norms</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; font-weight:bold; color:#1a5276;">MTS / Postman / MG</td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center;"><strong>Inspector of Posts / Postmaster / HRO</strong></td>
                        <td style="padding:11px 14px; border:1px solid #d6eaf8; text-align:center; font-style:italic; color:#555;">As per Circle norms</td>
                    </tr>
                </tbody>
            </table>
            <div style="padding:12px 16px; background:#f4f6f7;">
                <p style="margin:0; font-size:0.88em; color:#444;"><strong>Additional Notes (DoP):</strong></p>
                <ul style="margin:6px 0 0 0; padding-left:20px; font-size:0.88em; line-height:1.8; color:#555;">
                    <li><strong>MTS APARs</strong> are written as <em>Group C employees</em> effectively from <strong>01.04.2019</strong></li>
                    <li><strong>Custodian for IP/ASP APARs:</strong> DPS (HQ)</li>
                    <li><strong>Custodian for PS Group B APARs:</strong> Sr. Private Secretary to CPMG (entire Circle)</li>
                    <li><strong>Self-appraisal mandatory for:</strong> LSG and above cadres</li>
                </ul>
            </div>
        </div>
    `,

    exam_insight: `
        <div style="background:#f4f6f7; border-radius:12px; padding:16px; margin-bottom:16px;">
            <h3 style="color:#1a252f; margin-top:0; font-size:1em;">🎯 High-Probability Exam Points — Part 2</h3>
            <ul style="margin:0; padding-left:20px; line-height:2;">
                <li>APAR process ends (Final taking on record): <strong>30th November</strong></li>
                <li>Self-appraisal submission deadline: <strong>15th April</strong></li>
                <li>Reporting Officer submits to Reviewing Officer by: <strong>30th June</strong></li>
                <li>Reviewing Officer sends to Admin/CR Cell by: <strong>31st July</strong></li>
                <li>Disclosure (no Accepting Authority): <strong>1st September</strong></li>
                <li>Disclosure (Accepting Authority exists): <strong>15th September</strong></li>
                <li>Appeal against rejection of representation: within <strong>6 months</strong></li>
                <li>APAR preservation after death: <strong>2 years</strong></li>
                <li>APAR preservation after retirement/dismissal/removal/resignation: <strong>5 years</strong></li>
                <li>SPARROW launched: <strong>01/04/2014</strong> — maintained by <strong>NIC</strong></li>
                <li>SPARROW covers: <strong>Group A officers (SSP Cadre onwards)</strong> in DoP</li>
                <li>For DPC/Promotion: "Very Good" in <strong>3 of last 5 years</strong></li>
                <li>For MACP: "Very Good" in <strong>5 of last 5 years</strong> (all 5)</li>
                <li>IP/ASP — Reviewing Officer: <strong>DPS</strong></li>
                <li>PS Group B — Reviewing Officer: <strong>PMG or CPMG</strong></li>
                <li>Send only <strong>photocopy</strong> of dossier; original stays with cadre authority</li>
                <li>APAR NOT required for <strong>honorary/purely part-time</strong> officials</li>
            </ul>
        </div>
    `
}

];

async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db();
        const col = db.collection('daksutras');

        for (const entry of entries) {
            // Generate a short random slug
            const slug = Math.random().toString(36).substring(2, 8);
            const doc = { ...entry, slug };

            const existing = await col.findOne({ title: doc.title });
            if (existing) {
                console.log(`⚠️  Already exists, skipping: "${doc.title}"`);
                continue;
            }

            const result = await col.insertOne(doc);
            console.log(`✅ Inserted: "${doc.title}" → _id: ${result.insertedId}`);
        }

        console.log('\n🎉 Done seeding APAR Dak Sutra entries!');
    } finally {
        await client.close();
    }
}

main().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});
