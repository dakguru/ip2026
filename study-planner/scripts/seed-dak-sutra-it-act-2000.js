
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

// ═══════════════════════════════════════════════════════════════════════
// ENTRY 1 — IT Act 2000: Overview, Jurisdiction & Key Definitions
// ═══════════════════════════════════════════════════════════════════════
{
    title: "IT Act 2000 — Overview, Jurisdiction & Key Definitions",
    rule_number: "Sections 1 & 2",
    act_name: "Information Technology Act, 2000",
    category: "Section",
    effective_date: new Date("2000-10-17"),
    exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts", "PA/SA"],
    status: "published",
    created_by: "system@dakguru.com",
    createdAt: now,
    updatedAt: now,

    official_text: `
        <div style="background:linear-gradient(135deg,#e8f8f5,#d1f2eb); border-left:6px solid #1abc9c; padding:18px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#0e6655; margin-top:0; font-size:1.1em;">⚡ The Information Technology Act, 2000 — At a Glance</h3>
            <p style="margin-bottom:8px;">India's landmark legislation governing <strong>electronic commerce, digital signatures, cybercrimes, and e-governance</strong>. It is the primary law for cybersecurity and electronic transactions in India.</p>
            <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:12px;">
                <div style="background:#fff; border:2px solid #1abc9c; border-radius:8px; padding:10px 16px; text-align:center; flex:1; min-width:130px;">
                    <div style="font-size:1.5em; font-weight:bold; color:#0e6655;">09 June 2000</div>
                    <div style="font-size:0.82em; color:#0e6655; font-weight:bold;">📅 Date of Enactment</div>
                </div>
                <div style="background:#fff; border:2px solid #27ae60; border-radius:8px; padding:10px 16px; text-align:center; flex:1; min-width:130px;">
                    <div style="font-size:1.5em; font-weight:bold; color:#1e8449;">17 Oct 2000</div>
                    <div style="font-size:0.82em; color:#1e8449; font-weight:bold;">🚀 Date of Commencement</div>
                </div>
                <div style="background:#fff; border:2px solid #2980b9; border-radius:8px; padding:10px 16px; text-align:center; flex:1; min-width:130px;">
                    <div style="font-size:1.5em; font-weight:bold; color:#1a5276;">94 Sections</div>
                    <div style="font-size:0.82em; color:#1a5276; font-weight:bold;">📖 Total Provisions</div>
                </div>
                <div style="background:#fff; border:2px solid #8e44ad; border-radius:8px; padding:10px 16px; text-align:center; flex:1; min-width:130px;">
                    <div style="font-size:1.5em; font-weight:bold; color:#6c3483;">2 Schedules</div>
                    <div style="font-size:0.82em; color:#6c3483; font-weight:bold;">📋 Schedules Annexed</div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#1a5276,#2e86c1); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🌐 Extent & Jurisdiction — Section 1</h3>
            </div>
            <div style="padding:16px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div style="background:#eaf4fb; border-left:4px solid #2980b9; border-radius:8px; padding:14px;">
                        <div style="font-weight:bold; color:#1a5276; margin-bottom:6px;">🇮🇳 Territorial Extent</div>
                        <p style="margin:0; font-size:0.92em;">Extends to the <strong>whole of India</strong>. Also applies to offenses committed <strong>outside India</strong> by any person — provided the act involves a <em>computer, computer system, or computer network located in India</em>.</p>
                    </div>
                    <div style="background:#fef9e7; border-left:4px solid #f39c12; border-radius:8px; padding:14px;">
                        <div style="font-weight:bold; color:#7d6608; margin-bottom:6px;">🔑 Key Principle</div>
                        <p style="margin:0; font-size:0.92em;">The Act has <strong>extraterritorial jurisdiction</strong>. A foreigner sitting abroad who attacks a computer system in India can be prosecuted under this Act.</p>
                    </div>
                </div>
                <div style="background:#fdedec; border:1px solid #f1948a; border-radius:8px; padding:12px; margin-top:12px;">
                    <p style="margin:0; font-size:0.9em; color:#922b21;"><strong>⚠️ What is EXCLUDED from the IT Act? (First Schedule)</strong><br/>
                    1. Negotiable Instruments <em>(except Cheques)</em> &nbsp;|&nbsp; 2. Power-of-Attorney &nbsp;|&nbsp; 3. Trust Deeds &nbsp;|&nbsp; 4. Wills &nbsp;|&nbsp; 5. Contracts for Sale/Conveyance of Immovable Property<br/>
                    <strong>Note:</strong> Cheques are NOT excluded — the Act applies to cheques (e.g., truncated cheques).</p>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#6c3483,#9b59b6); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📖 Critical Definitions — Section 2</h3>
            </div>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="background:#f4ecf7; color:#4a235a; font-size:0.88em;">
                        <th style="padding:11px 14px; text-align:left; border:1px solid #d7bde2; width:25%;">Term</th>
                        <th style="padding:11px 14px; text-align:left; border:1px solid #d7bde2;">Definition (as per the Act)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fff;">
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-weight:bold; color:#6c3483;">Addressee</td>
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-size:0.91em;">A person who is <em>intended by the originator to receive</em> the electronic record. <strong>Does NOT include any intermediary.</strong></td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-weight:bold; color:#1a5276;">Asymmetric Crypto System</td>
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-size:0.91em;">A system of a secure <strong>key pair</strong> — a <em>Private Key</em> (for creating digital signature) and a <em>Public Key</em> (for verifying digital signature).</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-weight:bold; color:#1e8449;">Certifying Authority</td>
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-size:0.91em;">A person who has been granted a licence to issue a <strong>Digital Signature Certificate</strong> under Section 24.</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-weight:bold; color:#784212;">Computer Resource</td>
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-size:0.91em;">Includes <em>computer, communication device, computer system, computer network, data, computer database, or software</em>.</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-weight:bold; color:#922b21;">Secure System</td>
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-size:0.91em;">Computer hardware/software/procedure that is: (1) Secure from unauthorized access, (2) Reliable, (3) Suited to intended functions, (4) Adheres to accepted security procedures.</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-weight:bold; color:#0e6655;">Intermediary</td>
                        <td style="padding:10px 14px; border:1px solid #e8e8e8; font-size:0.91em;">Any person who on behalf of another person <em>receives, stores, transmits</em> any electronic record or provides any service. Includes ISPs, web-hosting providers, search engines, social media platforms.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    guru_explanation: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1e8449,#27ae60); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🔐 Digital Signature vs Electronic Signature — The Core Distinction</h3>
            </div>
            <div style="padding:16px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
                    <div style="background:#eafaf1; border:2px solid #27ae60; border-radius:10px; padding:14px;">
                        <div style="font-weight:bold; color:#1e8449; margin-bottom:8px; font-size:1em;">🔏 Digital Signature</div>
                        <ul style="margin:0; padding-left:18px; font-size:0.9em; line-height:1.8; color:#1e8449;">
                            <li>Uses <strong>Asymmetric Crypto System</strong></li>
                            <li>Has a <strong>Hash Function</strong></li>
                            <li>Issued by a <strong>Certifying Authority</strong></li>
                            <li>Legally valid under <strong>Section 3</strong></li>
                            <li>More <strong>secure & specific</strong></li>
                        </ul>
                    </div>
                    <div style="background:#eaf4fb; border:2px solid #2980b9; border-radius:10px; padding:14px;">
                        <div style="font-weight:bold; color:#1a5276; margin-bottom:8px; font-size:1em;">✍️ Electronic Signature</div>
                        <ul style="margin:0; padding-left:18px; font-size:0.9em; line-height:1.8; color:#1a5276;">
                            <li>Broader term — <strong>includes digital signature</strong></li>
                            <li>Includes biometrics, OTPs, PINs</li>
                            <li>Listed under <strong>Second Schedule</strong></li>
                            <li>Valid under <strong>Section 3A</strong></li>
                            <li>More <strong>flexible in form</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#784212,#ca6f1e); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🏛️ Controller of Certifying Authorities (CCA) — Key Facts</h3>
            </div>
            <div style="padding:14px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#fef5e7; padding:12px; border-radius:8px; border-left:4px solid #ca6f1e;">
                        <span style="background:#ca6f1e; color:white; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.85em;">1</span>
                        <p style="margin:0; color:#784212; font-size:0.92em;">Appointed by the <strong>Central Government</strong> under Section 17 to supervise Certifying Authorities.</p>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#fef5e7; padding:12px; border-radius:8px; border-left:4px solid #ca6f1e;">
                        <span style="background:#ca6f1e; color:white; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.85em;">2</span>
                        <p style="margin:0; color:#784212; font-size:0.92em;">Application fee for CA license: <strong>Maximum Rs. 25,000/-</strong>.</p>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#fef5e7; padding:12px; border-radius:8px; border-left:4px solid #ca6f1e;">
                        <span style="background:#ca6f1e; color:white; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.85em;">3</span>
                        <p style="margin:0; color:#784212; font-size:0.92em;">CCA maintains a publicly accessible <strong>Repository of Digital Signature Certificates</strong>.</p>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#fdedec; padding:12px; border-radius:8px; border-left:4px solid #e74c3c;">
                        <span style="background:#e74c3c; color:white; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.85em;">⚠</span>
                        <p style="margin:0; color:#922b21; font-size:0.92em;">If a CA fails to surrender license after suspension/revocation: penalty up to <strong>Rs. 5,00,000/-</strong>.</p>
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1a5276,#2980b9); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🏗️ Structure of the IT Act — Key Chapters</h3>
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
                <thead>
                    <tr style="background:#d6eaf8; color:#1a5276;">
                        <th style="padding:10px 14px; text-align:center; border:1px solid #aed6f1; width:20%;">Chapter</th>
                        <th style="padding:10px 14px; text-align:left; border:1px solid #aed6f1; width:40%;">Subject Matter</th>
                        <th style="padding:10px 14px; text-align:center; border:1px solid #aed6f1;">Key Sections</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#1a5276;">I</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Preliminary (Extent & Definitions)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">1–2</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">II</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Digital Signature & Electronic Signature</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">3–3A</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#1e8449;">III</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Electronic Governance</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">4–10A</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#784212;">IV</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Attribution, Acknowledgement & Despatch of Electronic Records</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">11–13</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#117864;">V</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Secure Electronic Records & Secure Electronic Signatures</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">14–16</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#0e6655;">VI</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Regulation of Certifying Authorities</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">17–34</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#2471a3;">VII</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Electronic Signature Certificates</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">35–39</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">VIII</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Duties of Subscribers</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">40–42</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#922b21;">IX</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Penalties, Compensation & Adjudication</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">43–47</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#c0392b;">X</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">The Appellate Tribunal (TDSAT)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">48–64</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#d35400;">XI</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Offences (Cybercrimes)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">65–78</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#7d6608;">XII</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Intermediaries Not Liable in Certain Cases</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">79</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#1f618d;">XIIA</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Examiner of Electronic Evidence</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">79A</td>
                    </tr>
                    <tr style="background:#eaf4fb;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#1a5276;">XIII</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Miscellaneous</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">80–94</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    practical_example: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#0e6655,#1abc9c); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">💡 Concept Clarity — Asymmetric Key System Explained</h3>
            </div>
            <div style="padding:16px; background:#e8f8f5;">
                <p style="margin:0 0 12px 0; font-size:0.93em; color:#0e6655;"><strong>Scenario:</strong> Postmaster Ramesh wants to send a digitally signed circular to all IPs in his division.</p>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:0.9em;">
                    <div style="background:#fff; border-radius:8px; padding:12px; border-left:4px solid #1abc9c;">
                        <strong style="color:#0e6655;">Step 1 — Ramesh uses his PRIVATE KEY</strong> to create a digital signature on the document. Only Ramesh holds this key (like a personal stamp).
                    </div>
                    <div style="background:#fff; border-radius:8px; padding:12px; border-left:4px solid #27ae60;">
                        <strong style="color:#1e8449;">Step 2 — Recipients use Ramesh's PUBLIC KEY</strong> (published in CCA repository) to verify that the signature is genuine and the document is unaltered.
                    </div>
                    <div style="background:#fef9e7; border-radius:8px; padding:12px; border-left:4px solid #f39c12;">
                        <strong style="color:#7d6608;">Key Insight:</strong> Private Key = Confidential (signing). Public Key = Openly shared (verification). You cannot derive one from the other.
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1a5276,#2980b9); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📬 Time of Receipt of Electronic Record — Section 13</h3>
            </div>
            <div style="padding:14px;">
                <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
                    <thead>
                        <tr style="background:#d6eaf8; color:#1a5276;">
                            <th style="padding:10px; border:1px solid #aed6f1;">Scenario</th>
                            <th style="padding:10px; border:1px solid #aed6f1;">Time of Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background:#fff;">
                            <td style="padding:10px; border:1px solid #e0e0e0;">Addressee designated a computer resource</td>
                            <td style="padding:10px; border:1px solid #e0e0e0;">When record <strong>enters the designated resource</strong></td>
                        </tr>
                        <tr style="background:#eaf4fb;">
                            <td style="padding:10px; border:1px solid #e0e0e0;">Sent to a resource NOT designated</td>
                            <td style="padding:10px; border:1px solid #e0e0e0;">When record is <strong>retrieved by addressee</strong></td>
                        </tr>
                        <tr style="background:#fff;">
                            <td style="padding:10px; border:1px solid #e0e0e0;">No designated computer resource</td>
                            <td style="padding:10px; border:1px solid #e0e0e0;">When record <strong>enters the addressee's computer</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,

    exam_insight: `
        <div style="background:linear-gradient(135deg,#fef9e7,#fdebd0); border:2px solid #f39c12; border-radius:12px; padding:16px; margin-bottom:16px;">
            <h3 style="color:#784212; margin-top:0; font-size:1em;">🎯 High-Probability Exam Points — Overview & Definitions</h3>
            <ul style="margin:0; padding-left:20px; line-height:2.1; font-size:0.92em;">
                <li>IT Act enacted: <strong>09 June 2000</strong> | Commenced: <strong>17 October 2000</strong></li>
                <li>Act has <strong>extraterritorial jurisdiction</strong> — applies to crimes involving computers located in India even if committed abroad</li>
                <li><strong>First Schedule</strong> excludes: Negotiable Instruments (except cheques), PoA, Trusts, Wills, Immovable property contracts</li>
                <li><strong>Cheques ARE covered</strong> under IT Act (e.g., truncated cheques in electronic clearing)</li>
                <li>Addressee = intended recipient; <strong>excludes intermediary</strong></li>
                <li>Asymmetric Crypto: <strong>Private Key → Signs</strong> | <strong>Public Key → Verifies</strong></li>
                <li>CA license application fee: <strong>maximum Rs. 25,000/-</strong></li>
                <li>Failure to surrender suspended CA license: penalty up to <strong>Rs. 5,00,000/-</strong></li>
                <li>Appellate Tribunal = <strong>TDSAT</strong> (transferred from Cyber Appellate Tribunal via Finance Act 2017)</li>
                <li>Appeal time limit against Controller/Adjudicating Officer order: <strong>45 days</strong> from receipt of order</li>
            </ul>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; padding:14px;">
            <h3 style="color:#1a252f; margin-top:0; font-size:0.95em;">🔁 Confusing Pairs to Watch</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.9em;">
                <div style="background:#fdedec; padding:10px; border-radius:8px; border-left:3px solid #e74c3c;">
                    <strong style="color:#922b21;">Electronic Signature (Sec 3A)</strong><br/>Broader; includes biometrics, OTPs
                </div>
                <div style="background:#eafaf1; padding:10px; border-radius:8px; border-left:3px solid #27ae60;">
                    <strong style="color:#1e8449;">Digital Signature (Sec 3)</strong><br/>Specific; uses Asymmetric Crypto + Hash
                </div>
                <div style="background:#eaf4fb; padding:10px; border-radius:8px; border-left:3px solid #2980b9;">
                    <strong style="color:#1a5276;">Originator</strong><br/>Person who sends electronic record
                </div>
                <div style="background:#f4ecf7; padding:10px; border-radius:8px; border-left:3px solid #8e44ad;">
                    <strong style="color:#6c3483;">Addressee</strong><br/>Intended recipient (NOT intermediary)
                </div>
            </div>
        </div>
    `,
},


// ═══════════════════════════════════════════════════════════════════════
// ENTRY 2 — IT Act 2000: Cybercrimes, Offenses & Punishments
// ═══════════════════════════════════════════════════════════════════════
{
    title: "IT Act 2000 — Cybercrimes, Offenses & Punishments (Sections 43–67F)",
    rule_number: "Sections 43–67F",
    act_name: "Information Technology Act, 2000",
    category: "Section",
    effective_date: new Date("2000-10-17"),
    exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts", "PA/SA"],
    status: "published",
    created_by: "system@dakguru.com",
    createdAt: now,
    updatedAt: now,

    official_text: `
        <div style="background:linear-gradient(135deg,#fdedec,#f9ebea); border-left:6px solid #e74c3c; padding:18px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#922b21; margin-top:0; font-size:1.1em;">⚖️ Two Types of Liability Under the IT Act</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:10px;">
                <div style="background:#fff; border:2px solid #e74c3c; border-radius:10px; padding:14px;">
                    <div style="font-weight:bold; color:#c0392b; margin-bottom:6px; font-size:0.95em;">💰 Civil Liability (Section 43 & 43A)</div>
                    <p style="margin:0; font-size:0.9em; color:#555;">Results in <strong>Compensation/Damages</strong> payable to the affected party. No imprisonment. Filed before Adjudicating Officer.</p>
                </div>
                <div style="background:#fff; border:2px solid #8e44ad; border-radius:10px; padding:14px;">
                    <div style="font-weight:bold; color:#6c3483; margin-bottom:6px; font-size:0.95em;">🔒 Criminal Liability (Sections 65–67F)</div>
                    <p style="margin:0; font-size:0.9em; color:#555;">Results in <strong>Imprisonment and/or Fine</strong>. Investigated by Police Inspector or above. Tried by Court.</p>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#922b21,#e74c3c); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">⚡ Section 43 — Damage to Computer System (Civil)</h3>
            </div>
            <div style="padding:14px; background:#fdedec;">
                <p style="margin:0 0 10px 0; font-size:0.92em; color:#922b21;"><strong>Who is liable?</strong> Any person who, <em>without permission</em> of the owner/person in charge:</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.88em;">
                    <div style="background:#fff; padding:10px; border-radius:6px; border-left:3px solid #e74c3c;">Accesses or secures access</div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border-left:3px solid #e74c3c;">Downloads, copies, or extracts data</div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border-left:3px solid #e74c3c;">Introduces a virus or contaminant</div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border-left:3px solid #e74c3c;">Disrupts or causes denial of access</div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border-left:3px solid #e74c3c;">Assists unauthorized access</div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border-left:3px solid #e74c3c;">Charges services to another person's account</div>
                </div>
                <div style="background:#fff; border:1px solid #f1948a; border-radius:8px; padding:10px; margin-top:10px;">
                    <strong style="color:#c0392b;">Consequence:</strong> Liable to pay <strong>compensation</strong> to the affected person. (Section 43 = Civil, NOT criminal imprisonment)
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#1a5276,#2980b9); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🏢 Section 43A — Body Corporate Liability for Data Breach</h3>
            </div>
            <div style="padding:14px; background:#eaf4fb;">
                <p style="margin:0 0 10px 0; font-size:0.92em;">If a <strong>Body Corporate</strong> (company) possesses or deals with <strong>Sensitive Personal Data (SPD)</strong> and is <em>negligent</em> in maintaining reasonable security practices, causing wrongful loss/gain:</p>
                <div style="background:#fff; border:2px solid #2980b9; border-radius:8px; padding:12px;">
                    <strong style="color:#1a5276;">Penalty:</strong> Liable to pay damages by way of <strong>compensation</strong> to the person affected. <strong>No upper cap</strong> on compensation amount.
                </div>
                <div style="background:#fef9e7; border-radius:8px; padding:10px; margin-top:10px; font-size:0.88em; color:#7d6608; border-left:4px solid #f39c12;">
                    <strong>SPD Examples:</strong> Bank account details, passwords, physical/mental health data, sexual orientation, medical records, biometric data.
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#0e6655,#1abc9c); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📋 Section 44 & 45 — Penalty for Administrative Non-Compliance</h3>
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:0.9em;">
                <thead>
                    <tr style="background:#e8f8f5; color:#0e6655;">
                        <th style="padding:10px 14px; text-align:left; border:1px solid #a9dfbf;">Section</th>
                        <th style="padding:10px 14px; text-align:left; border:1px solid #a9dfbf;">Offense</th>
                        <th style="padding:10px 14px; text-align:left; border:1px solid #a9dfbf;">Penalty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fff;">
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold; color:#0e6655;">44(a)</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0;">Failure to furnish documents/report to Controller or CA</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold;">Up to Rs. 1,50,000/-</td>
                    </tr>
                    <tr style="background:#e8f8f5;">
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold; color:#0e6655;">44(b)</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0;">Failure to file return</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold;">Rs. 5,000/- per day</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold; color:#0e6655;">44(c)</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0;">Failure to maintain books of account/records</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold;">Rs. 10,000/- per day</td>
                    </tr>
                    <tr style="background:#fef9e7;">
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold; color:#7d6608;">45</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0;"><strong>Residuary Penalty</strong> (catch-all for unlisted contraventions)</td>
                        <td style="padding:10px 14px; border:1px solid #e0e0e0; font-weight:bold;">Individual: Rs. 1 Lakh | Company: Rs. 10 Lakhs</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    guru_explanation: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#c0392b,#e74c3c); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🔐 Complete Punishment Chart — Cybercrimes (Sections 65–67F)</h3>
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:0.88em;">
                <thead>
                    <tr style="background:#c0392b; color:white;">
                        <th style="padding:10px 12px; text-align:center; border:1px solid #e74c3c; width:10%;">Section</th>
                        <th style="padding:10px 12px; text-align:left; border:1px solid #e74c3c; width:30%;">Offense</th>
                        <th style="padding:10px 12px; text-align:center; border:1px solid #e74c3c; width:15%;">Imprisonment</th>
                        <th style="padding:10px 12px; text-align:center; border:1px solid #e74c3c; width:15%;">Fine</th>
                        <th style="padding:10px 12px; text-align:center; border:1px solid #e74c3c; width:12%;">Bailable?</th>
                        <th style="padding:10px 12px; text-align:center; border:1px solid #e74c3c;">Compoundable?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#c0392b;">65</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Tampering with Computer Source Documents</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>3 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>2 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#c0392b;">66</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Computer-Related Offenses</strong> (hacking)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>3 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>5 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#8e44ad;">66B</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Receiving Stolen Computer Resource</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>3 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>1 Lakh</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#8e44ad;">66C</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Identity Theft</strong> (fraudulent use of password/e-signature)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>3 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>1 Lakh</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#8e44ad;">66D</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Cheating by Personation</strong> (Phishing)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>3 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>1 Lakh</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#fafafa;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#1a5276;">66E</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Violation of Privacy</strong> (voyeurism, non-consensual images)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>3 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>2 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#fdedec;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#c0392b;">66F</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Cyber Terrorism</strong> (threat to national security)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#c0392b;">LIFE IMPRISONMENT</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">—</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#c0392b; font-weight:bold;">❌ No</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#c0392b; font-weight:bold;">❌ No</td>
                    </tr>
                    <tr style="background:#fff3e0;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#e67e22;">67</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Obscene Material Online</strong> (1st conviction)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>3 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>5 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#27ae60; font-weight:bold;">✅ Yes</td>
                    </tr>
                    <tr style="background:#fef5e7;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#e67e22;">67</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Obscene Material</strong> (Subsequent conviction)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>5 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>10 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#e74c3c; font-weight:bold;">❌ No</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#e74c3c; font-weight:bold;">❌ No</td>
                    </tr>
                    <tr style="background:#fce4ec;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#880e4f;">67A</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Sexually Explicit Material</strong> (1st conviction)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>5 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>10 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#e74c3c; font-weight:bold;">❌ No</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#e74c3c; font-weight:bold;">❌ No</td>
                    </tr>
                    <tr style="background:#f8bbd0;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#880e4f;">67B</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;"><strong>Child Pornography</strong> (1st conviction)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to <strong>5 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Up to Rs. <strong>10 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#e74c3c; font-weight:bold;">❌ No</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; color:#e74c3c; font-weight:bold;">❌ No</td>
                    </tr>
                    <tr style="background:#f06292; color:white;">
                        <td style="padding:10px; text-align:center; border:1px solid #e74c3c; font-weight:bold;">67B</td>
                        <td style="padding:10px; border:1px solid #e74c3c;"><strong>Child Pornography</strong> (Subsequent conviction)</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e74c3c; font-weight:bold;">Up to <strong>7 years</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e74c3c; font-weight:bold;">Up to Rs. <strong>10 Lakhs</strong></td>
                        <td style="padding:10px; text-align:center; border:1px solid #e74c3c; font-weight:bold;">❌ No</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e74c3c; font-weight:bold;">❌ No</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1e8449,#27ae60); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🔑 Section 77B — Bailable vs Non-Bailable Rule</h3>
            </div>
            <div style="padding:16px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
                    <div style="background:#eafaf1; border:2px solid #27ae60; border-radius:10px; padding:14px; text-align:center;">
                        <div style="font-size:2em; margin-bottom:6px;">🟢</div>
                        <div style="font-weight:bold; color:#1e8449; font-size:1.1em;">BAILABLE</div>
                        <div style="color:#1e8449; margin-top:6px; font-size:0.92em;">Imprisonment ≤ <strong>3 years</strong></div>
                    </div>
                    <div style="background:#fdedec; border:2px solid #e74c3c; border-radius:10px; padding:14px; text-align:center;">
                        <div style="font-size:2em; margin-bottom:6px;">🔴</div>
                        <div style="font-weight:bold; color:#c0392b; font-size:1.1em;">NON-BAILABLE</div>
                        <div style="color:#c0392b; margin-top:6px; font-size:0.92em;">Imprisonment > <strong>3 years</strong></div>
                    </div>
                </div>
                <div style="background:#fef9e7; border-radius:8px; padding:12px; font-size:0.9em; border-left:4px solid #f39c12; color:#784212;">
                    <strong>⚠️ Section 77A — Compounding of Offenses:</strong> Allowed only if imprisonment ≤ 3 years. Offenses like Cyber Terrorism (66F) and Child Pornography (67B subsequent) CANNOT be compounded.
                </div>
            </div>
        </div>
    `,

    practical_example: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#6c3483,#9b59b6); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">💡 Scenario-Based Distinction: Sections 66C, 66D & 72</h3>
            </div>
            <div style="padding:16px;">
                <div style="display:flex; flex-direction:column; gap:10px; font-size:0.91em;">
                    <div style="background:#f4ecf7; border-radius:10px; padding:14px; border-left:5px solid #9b59b6;">
                        <strong style="color:#6c3483;">🎭 Section 66C — Identity Theft:</strong><br/>
                        Rahul steals Priya's login password and uses it to access her bank account. He has <em>fraudulently used her electronic signature / unique identification</em> → <strong>Identity Theft</strong> | 3 yrs + Rs. 1 Lakh
                    </div>
                    <div style="background:#eaf4fb; border-radius:10px; padding:14px; border-left:5px solid #2980b9;">
                        <strong style="color:#1a5276;">🎭 Section 66D — Cheating by Personation:</strong><br/>
                        Rahul creates a fake Facebook profile of Priya and convinces her friend to send money. He <em>pretended to be someone else using a computer resource</em> → <strong>Phishing / Personation</strong> | 3 yrs + Rs. 1 Lakh
                    </div>
                    <div style="background:#fdedec; border-radius:10px; padding:14px; border-left:5px solid #e74c3c;">
                        <strong style="color:#922b21;">🔒 Section 72 — Breach of Confidentiality:</strong><br/>
                        A government auditor, while inspecting a company's IT records under the Act, shares those records with a third party without consent → <strong>Breach of official trust</strong> | 2 yrs + Rs. 1 Lakh
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#922b21,#c0392b); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🛡️ Section 76 — Confiscation of Equipment</h3>
            </div>
            <div style="padding:14px; background:#fdedec;">
                <p style="margin:0 0 10px 0; font-size:0.92em;">Any computer, computer system, floppy discs, compact disks, tapes, or accessories used in contravention of the IT Act are <strong>liable to confiscation</strong>.</p>
                <div style="background:#fff; border:1px solid #f1948a; border-radius:8px; padding:10px; font-size:0.88em; color:#922b21;">
                    <strong>Exception:</strong> If the lawful owner proves the device was used <em>without their knowledge or connivance</em>, the court <strong>may</strong> choose NOT to confiscate it.
                </div>
            </div>
        </div>
    `,

    exam_insight: `
        <div style="background:linear-gradient(135deg,#fef9e7,#fdebd0); border:2px solid #e67e22; border-radius:12px; padding:16px; margin-bottom:16px;">
            <h3 style="color:#784212; margin-top:0; font-size:1em;">🎯 High-Probability Exam Points — Punishments</h3>
            <ul style="margin:0; padding-left:20px; line-height:2.1; font-size:0.92em;">
                <li>Section 65 (Source Code Tampering): <strong>3 years + Rs. 2 Lakhs</strong></li>
                <li>Section 66C (Identity Theft): <strong>3 years + Rs. 1 Lakh</strong></li>
                <li>Section 66D (Phishing/Personation): <strong>3 years + Rs. 1 Lakh</strong></li>
                <li>Section 66E (Violation of Privacy): <strong>3 years + Rs. 2 Lakhs</strong></li>
                <li>Section 66F (Cyber Terrorism): <strong>LIFE IMPRISONMENT</strong> — most severe penalty</li>
                <li>Section 67 (Obscenity) 1st: <strong>3 yrs + Rs. 5L</strong> | Subsequent: <strong>5 yrs + Rs. 10L</strong></li>
                <li>Section 67A (Sexually Explicit): 1st conviction = <strong>5 yrs + Rs. 10L</strong></li>
                <li>Section 67B (Child Porn): 1st = <strong>5 yrs + Rs. 10L</strong> | Subsequent = <strong>7 yrs + Rs. 10L</strong></li>
                <li>Sec 43A: Body Corporate data breach — <strong>No upper cap</strong> on compensation</li>
                <li>Police Investigation rank: <strong>Inspector or above</strong> (Section 78)</li>
                <li>Compounding allowed for offenses ≤ <strong>3 years</strong> imprisonment only (Section 77A)</li>
                <li>Offenses ≤ 3 years = <strong>Bailable</strong>; > 3 years = <strong>Non-Bailable</strong> (Section 77B)</li>
            </ul>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; padding:14px;">
            <h3 style="color:#1a252f; margin-top:0; font-size:0.95em;">📈 Escalating Punishment Pattern — Easy Memory Trick</h3>
            <div style="display:flex; flex-direction:column; gap:8px; font-size:0.9em;">
                <div style="display:flex; align-items:center; gap:10px; background:#eafaf1; padding:10px; border-radius:8px;">
                    <span style="background:#27ae60; color:white; border-radius:20px; padding:3px 10px; font-weight:bold; font-size:0.85em;">3 Yrs</span>
                    <span>General obscenity (Sec 67 1st), Identity theft (66C), Phishing (66D), Privacy violation (66E), Hacking (66)</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px; background:#fef5e7; padding:10px; border-radius:8px;">
                    <span style="background:#e67e22; color:white; border-radius:20px; padding:3px 10px; font-weight:bold; font-size:0.85em;">5 Yrs</span>
                    <span>Obscenity subsequent (67), Sexually explicit (67A 1st), Child porn 1st (67B 1st)</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px; background:#fce4ec; padding:10px; border-radius:8px;">
                    <span style="background:#c0392b; color:white; border-radius:20px; padding:3px 10px; font-weight:bold; font-size:0.85em;">7 Yrs</span>
                    <span>Child pornography subsequent conviction (Sec 67B)</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px; background:#fdedec; padding:10px; border-radius:8px;">
                    <span style="background:#880e4f; color:white; border-radius:20px; padding:4px 10px; font-weight:bold; font-size:0.82em;">LIFE</span>
                    <span>Cyber Terrorism only (Sec 66F) — most severe under the entire Act</span>
                </div>
            </div>
        </div>
    `,
},


// ═══════════════════════════════════════════════════════════════════════
// ENTRY 3 — IT Act 2000: Intermediaries, CERT-In, Adjudication & Powers
// ═══════════════════════════════════════════════════════════════════════
{
    title: "IT Act 2000 — Intermediary Liability, CERT-In, Section 69 Powers & Adjudication",
    rule_number: "Sections 46, 69, 70B, 72, 79, 79A, 88",
    act_name: "Information Technology Act, 2000",
    category: "Section",
    effective_date: new Date("2000-10-17"),
    exam_tags: ["LDCE IP", "PS Group B", "Inspector Posts", "PA/SA"],
    status: "published",
    created_by: "system@dakguru.com",
    createdAt: now,
    updatedAt: now,

    official_text: `
        <div style="background:linear-gradient(135deg,#eaf4fb,#d6eaf8); border-left:6px solid #2980b9; padding:18px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#1a5276; margin-top:0; font-size:1.1em;">🏛️ The Four Key Authorities Under the IT Act</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:10px; font-size:0.9em;">
                <div style="background:#fff; border:2px solid #2980b9; border-radius:10px; padding:12px;">
                    <div style="font-weight:bold; color:#1a5276; margin-bottom:6px;">🏢 Controller of CAs (CCA)</div>
                    <p style="margin:0;">Appointed under <strong>Section 17</strong>. Supervises and regulates Certifying Authorities issuing Digital Signature Certificates.</p>
                </div>
                <div style="background:#fff; border:2px solid #27ae60; border-radius:10px; padding:12px;">
                    <div style="font-weight:bold; color:#1e8449; margin-bottom:6px;">⚖️ Adjudicating Officer</div>
                    <p style="margin:0;">Appointed under <strong>Section 46</strong>. Decides cases of civil liability (compensation). Must be an officer not below the rank of <strong>Director to the Govt of India</strong> (or equivalent State Govt officer).</p>
                </div>
                <div style="background:#fff; border:2px solid #e67e22; border-radius:10px; padding:12px;">
                    <div style="font-weight:bold; color:#d35400; margin-bottom:6px;">📡 CERT-In</div>
                    <p style="margin:0;">Designated under <strong>Section 70B</strong>. National nodal agency for cyber incident response and emergency coordination.</p>
                </div>
                <div style="background:#fff; border:2px solid #8e44ad; border-radius:10px; padding:12px;">
                    <div style="font-weight:bold; color:#6c3483; margin-bottom:6px;">🔎 Examiner of Electronic Evidence</div>
                    <p style="margin:0;">Notified under <strong>Section 79A</strong>. Provides expert opinion on digital evidence before courts and authorities.</p>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#1a5276,#2980b9); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">⚖️ Section 46 — Adjudicating Officer (Power to Adjudicate)</h3>
            </div>
            <div style="padding:16px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.9em; margin-bottom:12px;">
                    <div style="background:#eaf4fb; border-radius:8px; padding:12px; border-left:4px solid #2980b9;">
                        <strong style="color:#1a5276;">Jurisdiction Limit</strong><br/>Cases where claim does NOT exceed <strong>Rs. 5 Crores</strong>. Above Rs. 5 Crores → Civil Court jurisdiction.
                    </div>
                    <div style="background:#eafaf1; border-radius:8px; padding:12px; border-left:4px solid #27ae60;">
                        <strong style="color:#1e8449;">Who is Adjudicating Officer?</strong><br/>An officer not below the rank of <strong>Director to the Government of India</strong> (or an equivalent officer of a State Government) with IT expertise.
                    </div>
                </div>
                <div style="background:#fef9e7; border-radius:8px; padding:12px; border-left:4px solid #f39c12; font-size:0.9em; color:#784212;">
                    <strong>Powers of Adjudicating Officer:</strong> Empowered with civil court powers — can summon, examine on oath, enforce production of documents, receive evidence, issue commissions for examination of witnesses.
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#c0392b,#e74c3c); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🔐 Section 69 — Power to Intercept, Monitor & Decrypt</h3>
            </div>
            <div style="padding:16px; background:#fdedec;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.9em; margin-bottom:12px;">
                    <div style="background:#fff; border:1px solid #f1948a; border-radius:8px; padding:12px;">
                        <strong style="color:#922b21;">Who can issue direction?</strong><br/>Central Government OR State Government or their <em>specially authorized officer</em>
                    </div>
                    <div style="background:#fff; border:1px solid #f1948a; border-radius:8px; padding:12px;">
                        <strong style="color:#922b21;">Grounds for exercise:</strong><br/>Sovereignty & Integrity of India, Defence, Security of State, Friendly relations with foreign states, Public order, Investigation of offenses
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.9em;">
                    <div style="background:#fff; border:1px solid #f1948a; border-radius:8px; padding:12px;">
                        <strong style="color:#922b21;">Failure to assist in decryption:</strong><br/>Punishment up to <strong>7 years</strong> imprisonment <em>and</em> shall also be liable to fine (Section 69(4))
                    </div>
                    <div style="background:#fff; border:1px solid #f1948a; border-radius:8px; padding:12px;">
                        <strong style="color:#922b21;">Section 69A — Block Websites:</strong><br/>Central Govt can block public access to any information in any computer resource (upheld in Shreya Singhal vs Union of India as valid with safeguards)
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:20px;">
            <div style="background:linear-gradient(90deg,#0e6655,#1abc9c); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🛡️ Section 70 — Protected Systems (Critical Infrastructure)</h3>
            </div>
            <div style="padding:14px; background:#e8f8f5;">
                <p style="margin:0 0 10px 0; font-size:0.92em;">The <strong>Central Government</strong> may declare any computer resource to be a <strong>"Protected System"</strong> if it is essential to the Govt's security, public safety, or national critical infrastructure.</p>
                <div style="background:#fff; border:1px solid #a9dfbf; border-radius:8px; padding:10px; font-size:0.9em; color:#0e6655;">
                    <strong>Punishment for unauthorized access to Protected System:</strong> Imprisonment up to <strong>10 years</strong> and fine (Section 70(3) — this is NOT covered under normal Section 66 rules).
                </div>
            </div>
        </div>
    `,

    guru_explanation: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#784212,#ca6f1e); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">🌐 Section 79 — Intermediary Safe Harbor (Immunity from Liability)</h3>
            </div>
            <div style="padding:16px;">
                <p style="margin:0 0 12px 0; font-size:0.92em; color:#444;">An <strong>Intermediary</strong> (Facebook, ISP, Google, etc.) is <strong>NOT liable</strong> for third-party information hosted or transmitted by it, PROVIDED ALL THREE conditions are satisfied:</p>
                <div style="display:flex; flex-direction:column; gap:10px; font-size:0.9em; margin-bottom:14px;">
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#eafaf1; padding:12px; border-radius:8px; border-left:4px solid #27ae60;">
                        <span style="background:#27ae60; color:white; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">1</span>
                        <p style="margin:0; color:#1e8449;">Function is limited to providing <strong>access/transmission/hosting</strong> (mere conduit or passive storage)</p>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#eaf4fb; padding:12px; border-radius:8px; border-left:4px solid #2980b9;">
                        <span style="background:#2980b9; color:white; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">2</span>
                        <p style="margin:0; color:#1a5276;">Does NOT <em>initiate</em> the transmission, <em>select</em> the receiver, or <em>modify</em> the information</p>
                    </div>
                    <div style="display:flex; align-items:flex-start; gap:12px; background:#f4ecf7; padding:12px; border-radius:8px; border-left:4px solid #8e44ad;">
                        <span style="background:#8e44ad; color:white; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">3</span>
                        <p style="margin:0; color:#6c3483;">Observes <strong>"Due Diligence"</strong> as prescribed by the Central Government (IT Intermediary Guidelines)</p>
                    </div>
                </div>
                <div style="background:#fdedec; border:1px solid #f1948a; border-radius:8px; padding:12px; font-size:0.9em; color:#922b21;">
                    <strong>❌ When Safe Harbor is LOST:</strong><br/>
                    (i) If intermediary <em>conspires, abets, or induces</em> the offense OR<br/>
                    (ii) If intermediary fails to remove/disable content upon receiving <strong>actual knowledge</strong> or a <strong>government/court order</strong>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#e67e22,#f39c12); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📡 Section 70B — CERT-In (Indian Computer Emergency Response Team)</h3>
            </div>
            <div style="padding:16px; background:#fef5e7;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.9em; margin-bottom:12px;">
                    <div style="background:#fff; border:1px solid #f39c12; border-radius:8px; padding:12px;">
                        <strong style="color:#d35400;">Designated by:</strong> Central Government under Section 70B
                    </div>
                    <div style="background:#fff; border:1px solid #f39c12; border-radius:8px; padding:12px;">
                        <strong style="color:#d35400;">Role:</strong> National nodal agency for cyber incident <strong>prevention, collection, analysis, and response</strong>
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:0.9em;">
                    <div style="background:#fff; border-radius:6px; padding:10px; border-left:3px solid #f39c12; color:#784212;">
                        ✅ Collects, analyses, and disseminates information on <strong>cyber incidents</strong>
                    </div>
                    <div style="background:#fff; border-radius:6px; padding:10px; border-left:3px solid #f39c12; color:#784212;">
                        ✅ Issues <strong>forecasts and alerts</strong> on cybersecurity incidents
                    </div>
                    <div style="background:#fff; border-radius:6px; padding:10px; border-left:3px solid #f39c12; color:#784212;">
                        ✅ Coordinates <strong>emergency response</strong> and emergency measures
                    </div>
                    <div style="background:#fff; border-radius:6px; padding:10px; border-left:3px solid #f39c12; color:#784212;">
                        ✅ Issues <strong>guidelines, advisories, and vulnerability notes</strong>
                    </div>
                    <div style="background:#fdedec; border-radius:6px; padding:10px; border-left:3px solid #e74c3c; color:#922b21;">
                        ⚠️ <strong>Penalty for non-compliance</strong> with CERT-In directions: Imprisonment up to <strong>1 year</strong> or fine up to <strong>Rs. 1 Lakh</strong> or both
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1a5276,#2980b9); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📊 Section 67C — Data Retention & Preservation by Intermediaries</h3>
            </div>
            <div style="padding:14px; background:#eaf4fb;">
                <p style="margin:0 0 10px 0; font-size:0.92em;">Intermediaries (social media, ISPs, web hosts) are required to <strong>preserve and retain</strong> information for such period and in such manner/format as may be specified by the <strong>Central Government</strong>.</p>
                <div style="background:#fff; border:1px solid #aed6f1; border-radius:8px; padding:10px; font-size:0.88em; color:#1a5276;">
                    <strong>Purpose:</strong> Aid law enforcement agencies in investigation of cybercrimes. Intermediaries cannot arbitrarily delete logs or records that may be needed as evidence.
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#1e8449,#27ae60); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">📋 Section 88 — Cyber Regulations Advisory Committee</h3>
            </div>
            <div style="padding:14px; background:#eafaf1;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.9em;">
                    <div style="background:#fff; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
                        <strong style="color:#1e8449;">Constituted by:</strong> <strong>Central Government</strong>
                    </div>
                    <div style="background:#fff; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
                        <strong style="color:#1e8449;">Composition:</strong> Govt representatives, industry experts, domain specialists
                    </div>
                    <div style="background:#fff; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
                        <strong style="color:#1e8449;">Function 1:</strong> Advise <strong>Central Government</strong> on making rules/regulations under the IT Act
                    </div>
                    <div style="background:#fff; border:1px solid #a9dfbf; border-radius:8px; padding:12px;">
                        <strong style="color:#1e8449;">Function 2:</strong> Advise the <strong>Controller of Certifying Authorities (CCA)</strong>
                    </div>
                </div>
            </div>
        </div>
    `,

    practical_example: `
        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#784212,#ca6f1e); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">💡 Practical Scenario — Intermediary Safe Harbor in Action</h3>
            </div>
            <div style="padding:16px; background:#fef5e7;">
                <div style="display:flex; flex-direction:column; gap:10px; font-size:0.9em;">
                    <div style="background:#fff; border-radius:8px; padding:12px; border-left:4px solid #27ae60;">
                        <strong style="color:#1e8449;">✅ Protected Scenario:</strong> A user posts defamatory content on a social media platform. The platform is NOT immediately liable because it did not create or initiate that content — <em>Safe Harbor applies</em>.
                    </div>
                    <div style="background:#fff; border-radius:8px; padding:12px; border-left:4px solid #e74c3c;">
                        <strong style="color:#922b21;">❌ Safe Harbor Lost:</strong> The same social media platform receives a court order to remove the defamatory content but deliberately ignores it. Now the platform <em>loses its immunity</em> and becomes liable.
                    </div>
                    <div style="background:#fef9e7; border-radius:8px; padding:12px; border-left:4px solid #f39c12;">
                        <strong style="color:#7d6608;">📌 Real-World Analogy:</strong> A telephone company (intermediary) is not liable for what two criminals discuss on a call — BUT if the company knowingly helps facilitate criminal planning, it loses immunity.
                    </div>
                </div>
            </div>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; overflow:hidden; margin-bottom:22px;">
            <div style="background:linear-gradient(90deg,#6c3483,#9b59b6); padding:12px 16px;">
                <h3 style="color:#fff; margin:0; font-size:1em;">⚖️ Quick Reference: Punishments for Miscellaneous Offenses</h3>
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:0.88em;">
                <thead>
                    <tr style="background:#f4ecf7; color:#4a235a;">
                        <th style="padding:10px 12px; text-align:center; border:1px solid #d7bde2;">Section</th>
                        <th style="padding:10px 12px; text-align:left; border:1px solid #d7bde2;">Offense</th>
                        <th style="padding:10px 12px; text-align:center; border:1px solid #d7bde2;">Punishment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">69</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Failure to assist in decryption</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#c0392b;">Up to 7 years</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">70</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Unauthorized access to Protected System</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#c0392b;">Up to 10 years + fine</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">72</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Breach of Confidentiality by authorized officials</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold;">2 yrs + Rs. 1 Lakh</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">72A</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Disclosure of information in breach of lawful contract</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold;">3 yrs + Rs. 5 Lakhs</td>
                    </tr>
                    <tr style="background:#fff;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">74</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Publication of Digital Signature Certificate for fraudulent purpose</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold;">2 yrs + Rs. 1 Lakh</td>
                    </tr>
                    <tr style="background:#f9f9f9;">
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0; font-weight:bold; color:#6c3483;">75</td>
                        <td style="padding:10px; border:1px solid #e0e0e0;">Act to apply for offense committed outside India</td>
                        <td style="padding:10px; text-align:center; border:1px solid #e0e0e0;">Same as applicable provisions</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    exam_insight: `
        <div style="background:linear-gradient(135deg,#fef9e7,#fdebd0); border:2px solid #e67e22; border-radius:12px; padding:16px; margin-bottom:16px;">
            <h3 style="color:#784212; margin-top:0; font-size:1em;">🎯 High-Probability Exam Points — Authorities & Powers</h3>
            <ul style="margin:0; padding-left:20px; line-height:2.1; font-size:0.92em;">
                <li>Adjudicating Officer appointed under <strong>Section 46</strong> — handles civil liability claims up to <strong>Rs. 5 Crore</strong></li>
                <li>Appeal against Adjudicating Officer/Controller order: within <strong>45 days</strong> to TDSAT</li>
                <li>Appellate Tribunal = <strong>TDSAT</strong> (transferred from Cyber Appellate Tribunal under Finance Act, 2017)</li>
                <li>CERT-In designated under <strong>Section 70B</strong> — nodal agency for cyber incident response</li>
                <li>Failure to comply with CERT-In: <strong>1 year + Rs. 1 Lakh</strong></li>
                <li>Section 69 — Interception/Decryption: failure to assist = up to <strong>7 years</strong></li>
                <li>Section 70 — Protected Systems: unauthorized access = up to <strong>10 years</strong></li>
                <li>Safe Harbor (Sec 79): intermediary loses immunity if it <strong>conspires</strong> or <strong>fails to act on court/govt order</strong></li>
                <li>Cyber Regulations Advisory Committee: constituted by <strong>Central Government</strong> under Section 88</li>
                <li>Investigation rank: Police Officer NOT BELOW <strong>Inspector</strong> (Section 78)</li>
                <li>Section 79A — Examiner of Electronic Evidence: provides <strong>expert opinion</strong> in court proceedings</li>
                <li>Section 43A Body Corporate liability: <strong>NO UPPER LIMIT</strong> on compensation for data breaches</li>
            </ul>
        </div>

        <div style="background:#fdfefe; border:1px solid #d5d8dc; border-radius:12px; padding:14px;">
            <h3 style="color:#1a252f; margin-top:0; font-size:0.95em;">🔢 Key Numbers — Quick Revision Table</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.88em;">
                <div style="background:#eaf4fb; padding:10px; border-radius:8px; text-align:center; border-top:3px solid #2980b9;">
                    <div style="font-size:1.4em; font-weight:bold; color:#1a5276;">45 Days</div>
                    <div style="color:#1a5276; font-size:0.8em;">Appeal time limit to TDSAT</div>
                </div>
                <div style="background:#eafaf1; padding:10px; border-radius:8px; text-align:center; border-top:3px solid #27ae60;">
                    <div style="font-size:1.4em; font-weight:bold; color:#1e8449;">Rs. 5 Cr</div>
                    <div style="color:#1e8449; font-size:0.8em;">Adjudicating Officer limit</div>
                </div>
                <div style="background:#fef5e7; padding:10px; border-radius:8px; text-align:center; border-top:3px solid #e67e22;">
                    <div style="font-size:1.4em; font-weight:bold; color:#d35400;">7 Years</div>
                    <div style="color:#d35400; font-size:0.8em;">Failure to assist in decryption (Sec 69)</div>
                </div>
                <div style="background:#fdedec; padding:10px; border-radius:8px; text-align:center; border-top:3px solid #e74c3c;">
                    <div style="font-size:1.4em; font-weight:bold; color:#c0392b;">10 Years</div>
                    <div style="color:#c0392b; font-size:0.8em;">Unauthorized access to Protected System (Sec 70)</div>
                </div>
                <div style="background:#f4ecf7; padding:10px; border-radius:8px; text-align:center; border-top:3px solid #8e44ad;">
                    <div style="font-size:1.4em; font-weight:bold; color:#6c3483;">Inspector</div>
                    <div style="color:#6c3483; font-size:0.8em;">Minimum rank for IT Act investigation (Sec 78)</div>
                </div>
                <div style="background:#fce4ec; padding:10px; border-radius:8px; text-align:center; border-top:3px solid #e91e63;">
                    <div style="font-size:1.4em; font-weight:bold; color:#880e4f;">LIFE</div>
                    <div style="color:#880e4f; font-size:0.8em;">Cyber Terrorism (Sec 66F) — maximum penalty</div>
                </div>
            </div>
        </div>
    `,
},

]; // end of entries array


async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('daksutras');

        for (const entry of entries) {
            await collection.deleteMany({ title: entry.title });
            const result = await collection.insertOne(entry);
            console.log(`✅ Inserted: "${entry.title}" → _id: ${result.insertedId}`);
        }

        console.log(`\n🎉 Successfully seeded ${entries.length} IT Act 2000 Dak Sutra entries!`);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
