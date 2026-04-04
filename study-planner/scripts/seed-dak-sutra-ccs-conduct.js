
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
    title: "CCS (Conduct) Rules, 1964 — Comprehensive Guide",
    rule_number: "Rules 1–25",
    act_name: "CCS (Conduct) Rules, 1964",
    category: "Rule",
    effective_date: new Date("1964-12-12"),
    exam_tags: ["LDCE IP", "PS Group B", "GDS to PA"],
    official_text: `
        <div style="background:#f0f7ff; border:1px solid #c8dff5; padding:15px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#1a3a5c; margin-top:0;">📜 Scope and Applicability</h3>
            <p>These rules came into force on <strong>12 December 1964</strong> and apply to every person appointed to a civil service or post (including civilians in Defense Service) in connection with the affairs of the Union.</p>
            <h4 style="color:#1a3a5c;">Exemptions</h4>
            <p>The rules do <strong>NOT</strong> apply to:</p>
            <ul>
                <li>Railway Government Servants</li>
                <li>Members of All India Services</li>
                <li>Non-gazetted staff drawing pay under <strong>₹500 per month</strong> in establishments like ports, public works, irrigation, mines, and factories.</li>
            </ul>
        </div>

        <div style="background:#f5eef8; border:1px solid #d2b4de; padding:15px; border-radius:12px; margin-bottom:20px;">
            <h3 style="color:#4a235a; margin-top:0;">🔑 Key Definitions (Rule 2 & 7)</h3>
            <p><strong>"Family" (Rule 2):</strong> Includes spouse, child (son/daughter), parents, brothers, and sisters or any person related by blood or marriage, <em>whether they are dependent on the Govt. servant or not</em>.</p>
            <p><strong>"Strike" (Rule 7):</strong> Includes mass abstention from work without permission, refusal to work overtime, "go slow", "sit-down", "pen down", "stay-in", "token", sympathetic strikes, and participation in a <strong>bandh</strong>.</p>
        </div>

        <h3 style="color:#1b2631; border-left:4px solid #1b2631; padding-left:10px;">📊 Time Limits for Permissions</h3>
        <p>The competent authority must grant or refuse permission within the following prescribed timelines:</p>
        <table style="width:100%; border-collapse:collapse; margin-top:15px; border:1px solid #eee; border-radius:8px; overflow:hidden;">
            <thead>
                <tr style="background:linear-gradient(90deg, #1b2631, #2c3e50); color:white;">
                    <th style="padding:12px; text-align:left; border:1px solid #2c3e50;">Rule No.</th>
                    <th style="padding:12px; text-align:left; border:1px solid #2c3e50;">Provision Relating To</th>
                    <th style="padding:12px; text-align:left; border:1px solid #2c3e50;">Time Period</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background:#fff;">
                    <td style="padding:10px; border:1px solid #eee; font-weight:bold;">8(1), 18(2), 18(3)</td>
                    <td style="padding:10px; border:1px solid #eee;">Connection with Radio/Press, Transaction in Movable & Immovable property</td>
                    <td style="padding:10px; border:1px solid #eee; color:#c0392b; font-weight:bold;">30 Days</td>
                </tr>
                <tr style="background:#f9f9f9;">
                    <td style="padding:10px; border:1px solid #eee; font-weight:bold;">18-A</td>
                    <td style="padding:10px; border:1px solid #eee;">Transactions in immovable property outside India or with foreigners</td>
                    <td style="padding:10px; border:1px solid #eee; color:#c0392b; font-weight:bold;">60 Days</td>
                </tr>
            </tbody>
        </table>
    `,
    guru_explanation: `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:20px;">
            <div style="background:#fff9f0; border:1px solid #fdebd0; padding:15px; border-radius:12px;">
                <h4 style="color:#784212; margin-top:0;">📝 Handling Oral Instructions (Rule 3)</h4>
                <p>Superiors should ordinarily give directions in <strong>writing</strong>. If oral direction is unavoidable, it must be confirmed in writing immediately. If they fail, the subordinate <em>must</em> seek written confirmation as early as possible.</p>
            </div>
            <div style="background:#f0fff4; border:1px solid #d5f5e3; padding:15px; border-radius:12px;">
                <h4 style="color:#1a5c3a; margin-top:0;">🏢 Subletting Quarters (Rule 15-A)</h4>
                <p>Subletting government accommodation is <strong>"Grave Misconduct"</strong>. It leads directly to disciplinary proceedings under Rule 14 of CCS (CCA) Rules, 1965.</p>
            </div>
        </div>

        <h3 style="color:#1a4a6e; border-bottom:2px solid #3498db; padding-bottom:5px;">⚖️ Investment vs. Speculation (Rule 16)</h3>
        <p>You can invest, but you cannot gamble with the market. Here is the distinction:</p>
        <div style="border:1px solid #aed6f1; border-radius:12px; overflow:hidden;">
            <div style="background:#eaf4fc; padding:10px; display:flex; justify-content:space-around; font-weight:bold; color:#1a4a6e;">
                <div style="flex:1; text-align:center;">Allowed: Investment</div>
                <div style="width:1px; background:#aed6f1;"></div>
                <div style="flex:1; text-align:center; color:#c0392b;">Prohibited: Speculation</div>
            </div>
            <div style="padding:15px; display:flex; justify-content:space-around; background:#fff;">
                <div style="flex:1; border-right:1px solid #eee; padding-right:10px;">Occasional investments through authorized stock brokers. Focusing on long-term growth.</div>
                <div style="flex:1; padding-left:10px;">"Frequent purchase or sale (or both)" of shares or securities. Day-trading is strictly banned.</div>
            </div>
        </div>

        <h3 style="color:#4a235a; margin-top:25px;">📰 Vindication of Acts (Rule 19)</h3>
        <p>If you are criticized in public for your official work, you are bound by these rules:</p>
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
            <tr style="background:#f5eef8;">
                <th style="padding:10px; border:1px solid #d2b4de; text-align:left;">Context</th>
                <th style="padding:10px; border:1px solid #d2b4de; text-align:left;">Requirement</th>
            </tr>
            <tr>
                <td style="padding:10px; border:1px solid #eee;"><strong>Official Acts</strong></td>
                <td style="padding:10px; border:1px solid #eee;">Prior Govt. Sanction required. If no reply for <strong>3 Months</strong>, permission is assumed.</td>
            </tr>
            <tr>
                <td style="padding:10px; border:1px solid #eee;"><strong>Private Character</strong></td>
                <td style="padding:10px; border:1px solid #eee;">No prior sanction needed; just <strong>report later</strong> to authorities.</td>
            </tr>
        </table>
    `,
    practical_example: `
        <div style="background:#fff; border:1px solid #e0e0e0; border-radius:16px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            <div style="margin-bottom:20px;">
                <span style="background:#e8f4fd; color:#2196f3; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; text-transform:uppercase;">Scenario 1: The "Pen-Down" Protest</span>
                <p style="margin-top:8px; line-height:1.6;">Employees sit in office but refuse to sign any documents or process files to protest. 
                <br><strong>Verdict:</strong> They are charged with an illegal strike. Under Rule 7, "pen down" or "stay-in" practices resulting in cessation of work are explicitly <strong>Strike</strong>.</p>
            </div>
            
            <div style="margin-bottom:20px; padding-top:15px; border-top:1px solid #f0f0f0;">
                <span style="background:#fef9e7; color:#f1c40f; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; text-transform:uppercase;">Scenario 2: The Day Trader</span>
                <p style="margin-top:8px; line-height:1.6;">A Group "C" employee uses a mobile app to buy/sell shares multiple times a week. 
                <br><strong>Verdict:</strong> Disciplinary action for speculation. Even through a licensed broker, "frequent" trading is <strong>Prohibited</strong>.</p>
            </div>

            <div style="padding-top:15px; border-top:1px solid #f0f0f0;">
                <span style="background:#fdf2f2; color:#e74c3c; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; text-transform:uppercase;">Scenario 3: The Ignored Request</span>
                <p style="margin-top:8px; line-height:1.6;">An officer requests permission to sue for defamation. 4 months pass without a reply. He proceeds to court.
                <br><strong>Verdict:</strong> Protected. Under Rule 19, if no reply in <strong>3 months</strong>, permission is automatically assumed.</p>
            </div>
        </div>
    `,
    exam_insight: `
        <div style="background:linear-gradient(135deg, #fffcf0 0%, #fff7d6 100%); border:1px solid #f1c40f; padding:20px; border-radius:16px; margin-bottom:25px;">
            <h3 style="color:#9c640c; margin-top:0; display:flex; items-center gap:10px;">🔥 One-Line Quick Revision</h3>
            <ul style="list-style-type: '⚡ '; padding-left:20px; color:#5d4037;">
                <li><strong>Lunch Break:</strong> Strictly <strong>30 Minutes</strong> only.</li>
                <li><strong>Playing Cards:</strong> Banned inside/outside office (except recreation rooms).</li>
                <li><strong>MP Communications:</strong> Acknowledge in 15 days, Final reply in next 15 days.</li>
                <li><strong>Marriage (Rule 21):</strong> Marriage with person having living spouse is <strong>Strictly Prohibited</strong>.</li>
            </ul>
        </div>

        <h3 style="color:#1a5c3a; margin-top:25px;">💰 Numerical Limits & Penalties</h3>
        <table style="width:100%; border-collapse:collapse; border-radius:12px; overflow:hidden; border:1px solid #d5f5e3;">
            <thead>
                <tr style="background:#d5f5e3; color:#1a5c3a;">
                    <th style="padding:12px; text-align:left;">Transaction Type</th>
                    <th style="padding:12px; text-align:left;">Intimation Threshold</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding:10px; border:1px solid #eee;"><strong>Movable Property</strong></td>
                    <td style="padding:10px; border:1px solid #eee;">Exceeds <strong>2 Months' Basic Pay</strong> (Report within 1 month)</td>
                </tr>
                <tr style="background:#f9fffb;">
                    <td style="padding:10px; border:1px solid #eee;"><strong>Property Repair/Addition</strong></td>
                    <td style="padding:10px; border:1px solid #eee;">Exceeds <strong>2 Months' Basic Pay</strong></td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #eee;"><strong>Share Transactions (Annual)</strong></td>
                    <td style="padding:10px; border:1px solid #eee;">Total in year > <strong>6 Months' Basic Pay</strong></td>
                </tr>
                <tr style="background:#f9fffb;">
                    <td style="padding:10px; border:1px solid #eee; color:#c0392b; font-weight:bold;">Child Labour (Rule 22-A)</td>
                    <td style="padding:10px; border:1px solid #eee; color:#c0392b;">Fine up to <strong>₹20,000</strong> or 1 year jail</td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top:25px; padding:15px; background:#f0f7ff; border:1px solid #c8dff5; border-radius:12px;">
            <h4 style="color:#1a4a6e; margin-top:0;">📅 Immovable Property Returns (IPR)</h4>
            <p>Must be submitted by <strong>31st January</strong> every year. <br>System for IAS: <strong>PRISM</strong> (Property Related Information System).</p>
            <p><strong>Authorities:</strong> Group A (Govt), Group B (Head of Dept), Group C (Head of Office).</p>
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
        console.log(`✓ Seeded ${entry.title} successfully (ID: ${result.insertedId})!`);

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

seed();
