
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

async function fix() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const col = client.db().collection('daksutras');

        // ─────────────────────────────────────────────────────────────────
        // FIX 1: "Section 4: Meaning of Post Office" → correct to Section 2(l)
        // Section 4 of PO Act 2023 = Exemptions from exclusive privilege.
        // The definition of "Post Office" is actually Section 2(l).
        // ─────────────────────────────────────────────────────────────────
        {
            const r = await col.updateOne(
                { title: "Section 4: Meaning of 'Post Office' under the 2023 Act" },
                {
                    $set: {
                        title: "Section 2(l): Definition of 'Post Office' — Post Office Act, 2023",
                        rule_number: "Section 2(l)",
                        official_text: `<p><strong>Section 2(l) — Definition of "Post Office":</strong></p>
<p>"Post Office" means the <strong>Department of Posts</strong> and includes any entity or person <strong>authorised by the Central Government</strong> to provide service through its network.</p>

<h4>Section 4 — Exemptions from Exclusive Privilege</h4>
<p>Section 4 of the Post Office Act, 2023 provides exemptions from the exclusive privilege of conveying letters (Section 3). The exclusive privilege shall NOT apply to:</p>
<ul>
  <li>(a) a letter sent by a private person by private hand or by a special messenger;</li>
  <li>(b) any letter sent urgently by a courier if the amount charged is not less than five rupees (or such amount as the Central Government may prescribe);</li>
  <li>(c) any letter relating exclusively to the private affairs of the sender or receiver.</li>
</ul>

<h4>Section 14 — Power to Notify Additional Services</h4>
<p>The Central Government may, by notification, direct the Post Office to provide any service or perform any function under any other law in force — enabling Post Offices to act as agents for banking, insurance, e-governance, and other public services.</p>`,
                        guru_explanation: `<p>There are two distinct but related provisions that often get confused in exams. Let's set the record straight:</p>

<h4>Section 2(l) — What is a "Post Office" Today?</h4>
<p>The <strong>definition of "Post Office"</strong> is in <strong>Section 2(l)</strong> — not Section 4. Under the 2023 Act, a Post Office is no longer just a physical building run by the government. It now includes:</p>
<ul>
  <li>The <strong>Department of Posts</strong> (the traditional post office), AND</li>
  <li>Any <strong>entity or person authorised</strong> by the Central Government to provide postal services.</li>
</ul>
<p>This broader definition enables <strong>CSCs (Common Service Centres), banking correspondents, private partners</strong> to function as "Post Offices" for designated services.</p>

<h4>Section 4 — What Is Actually Section 4?</h4>
<p>Section 4 lists <strong>exemptions from the exclusive privilege</strong> to carry letters. The government does NOT have monopoly over:</p>
<ul>
  <li>Private letters sent by hand or special messenger</li>
  <li>Urgent letters sent by courier (charging ≥ ₹5)</li>
  <li>Letters relating to private affairs of the sender/receiver</li>
</ul>
<p>This is why private couriers (BlueDart, DTDC etc.) can legally carry letters — they fall under the Section 4 exemption.</p>

<h4>Why Does the Broader Definition of "Post Office" Matter?</h4>
<p>It enables <strong>India Post Payments Bank (IPPB)</strong>, <strong>CSC e-governance</strong>, and future public-private postal models to function under the legal umbrella of "Post Office" without legislative amendments every time a new service or partner is added.</p>`,
                        practical_example: `<p><strong>Scenario 1 — Section 2(l) in Practice:</strong> The government authorises a village CSC to accept Speed Post parcels and issue money orders. Is the CSC a "Post Office"?</p>
<p><strong>Answer:</strong> YES — under Section 2(l), any entity authorised by the Central Government to provide postal services through its network qualifies as a "Post Office." The CSC becomes a Post Office for those specific services.</p>

<p><strong>Scenario 2 — Section 4 Exemption in Practice:</strong> BlueDart Courier picks up a time-sensitive legal document from a law firm and charges ₹200 for delivery. Is this a violation of the government's exclusive privilege?</p>
<p><strong>Answer:</strong> NO — Section 4 exempts urgent letters where the courier charges ≥ ₹5. BlueDart legally operates under this exemption. Only "ordinary letters" at below-₹5 rates would violate Section 3.</p>`,
                        exam_insight: `<p><strong>Most Important Clarification for Exam:</strong></p>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-bottom:10px">
  <strong>COMMON MISTAKE:</strong> "Section 4 of the Post Office Act, 2023 defines Post Office" — <strong>FALSE</strong>.<br>
  Section 4 = <strong>Exemptions from exclusive privilege</strong>.<br>
  Definition of "Post Office" = <strong>Section 2(l)</strong>.
</div>
<ul>
  <li>Definition of "Post Office": <strong>Section 2(l)</strong></li>
  <li>Exclusive privilege of conveying letters: <strong>Section 3</strong></li>
  <li>Exemptions from exclusive privilege: <strong>Section 4</strong></li>
  <li>Interception powers: <strong>Section 9</strong></li>
  <li>No liability of Post Office: <strong>Section 10</strong></li>
  <li>Private couriers are legal under: <strong>Section 4 exemption</strong></li>
  <li>CSCs acting as Post Offices: enabled by <strong>Section 2(l) broad definition</strong></li>
</ul>
<p><strong>High-Probability MCQ:</strong> "Which section of the Post Office Act, 2023 defines 'Post Office'?" — Answer: <strong>Section 2(l)</strong>.</p>`,
                        updatedAt: new Date()
                    }
                }
            );
            console.log(r.modifiedCount
                ? "✅ Fix 1: Corrected Section 2(l) — Post Office definition entry"
                : "⚠️  Fix 1: Entry not found");
        }

        // ─────────────────────────────────────────────────────────────────
        // FIX 2: Gift limits — correct tiered structure per DoPT OM
        // DoPT OM No.11013/3/2014-Estt.(A) + post-7th CPC revision
        // Level 1-5: Non-relatives ₹2,000 | Relatives ₹5,000
        // Level 6-10: Non-relatives ₹5,000 | Relatives ₹15,000
        // Level 11+: Non-relatives ₹7,500 | Relatives ₹25,000
        // ─────────────────────────────────────────────────────────────────
        {
            const r = await col.updateOne(
                { title: "Acceptance of Gifts by Government Servants — Rule 13" },
                {
                    $set: {
                        official_text: `<p><strong>Rule 13 — Gifts</strong></p>
<p>(1) Save as otherwise provided in this rule, no Government servant shall accept, or permit any member of his family or any other person acting on his behalf to accept, any gift.</p>
<p>(2) The restrictions on the acceptance of gifts shall not apply to:</p>
<ul>
  <li><strong>(a)</strong> gifts of purely ceremonial nature where refusal would be discourteous, provided the value does not exceed the limits below;</li>
  <li><strong>(b)</strong> gifts from close relatives on occasions like weddings, anniversaries — provided it is not disproportionate to the financial status of the giver.</li>
</ul>
<h4>Monetary Limits (as per DoPT OM No.11013/3/2014-Estt.(A) and post-7th CPC orders)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr>
    <th style="border:1px solid #ccc;padding:6px">Pay Level (7th CPC)</th>
    <th style="border:1px solid #ccc;padding:6px">Approximate Basic Pay</th>
    <th style="border:1px solid #ccc;padding:6px">From Relatives</th>
    <th style="border:1px solid #ccc;padding:6px">From Non-Relatives / Others</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:6px">Level 1 – 5 (Group C)</td>
    <td style="border:1px solid #ccc;padding:6px">Up to ₹29,200</td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹5,000</strong></td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹2,000</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:6px">Level 6 – 10 (Group B)</td>
    <td style="border:1px solid #ccc;padding:6px">₹35,400 – ₹67,700</td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹15,000</strong></td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹5,000</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:6px">Level 11 and above (Group A)</td>
    <td style="border:1px solid #ccc;padding:6px">₹67,700 and above</td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹25,000</strong></td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹7,500</strong></td>
  </tr>
</table>
<p>(3) <strong>Any gift received in excess of the prescribed limits must be reported</strong> to the Government through proper channel within one month.</p>
<p>(4) <strong>Gifts from foreign dignitaries:</strong> A Government servant may accept gifts from foreign dignitaries/governments, but must hand them over to the Government. He may be allowed to retain a gift (not exceeding <strong>₹5,000</strong> in value) by paying the difference to the Government treasury.</p>`,
                        guru_explanation: `<p>Rule 13 is about <strong>integrity in action</strong>. The government is strict about gifts because they can be a subtle form of bribery. Key point: the limits are <strong>NOT the same for everyone</strong> — they are tiered by pay level.</p>

<h4>The Tiered Gift Limit Table — Memorise This</h4>
<table style="width:100%;border-collapse:collapse">
  <tr>
    <th style="border:1px solid #ccc;padding:6px">Who You Are</th>
    <th style="border:1px solid #ccc;padding:6px">From Relatives</th>
    <th style="border:1px solid #ccc;padding:6px">From Others</th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:6px"><strong>Group C</strong> (Level 1–5)<br><small>Postman, PA, MTS</small></td>
    <td style="border:1px solid #ccc;padding:6px">₹5,000</td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹2,000</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:6px"><strong>Group B</strong> (Level 6–10)<br><small>Inspector of Posts, ASP</small></td>
    <td style="border:1px solid #ccc;padding:6px">₹15,000</td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹5,000</strong></td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc;padding:6px"><strong>Group A</strong> (Level 11+)<br><small>SP, SSP, PMG</small></td>
    <td style="border:1px solid #ccc;padding:6px">₹25,000</td>
    <td style="border:1px solid #ccc;padding:6px"><strong>₹7,500</strong></td>
  </tr>
</table>

<h4>The Foreign Dignitary Gift Rule (₹5,000 for all levels)</h4>
<p>Gifts from foreign governments or dignitaries must be deposited with the Government. To retain it personally, pay the amount above <strong>₹5,000</strong> to the treasury. This ₹5,000 retention limit is UNIFORM across all levels — unlike domestic gifts.</p>

<h4>What Is a "Gift" Under This Rule?</h4>
<p>Any article of value — jewellery, money, property, hospitality (air tickets, hotel stays), vouchers, discount coupons, etc. The test is whether it creates an obligation or could compromise impartiality.</p>

<h4>Reporting Obligation</h4>
<p>If you receive a gift exceeding your applicable limit — you MUST report it to the Government within <strong>one month</strong>. Failure to report is itself a separate misconduct under Rule 13.</p>`,
                        practical_example: `<p><strong>Scenario 1 (Group C employee):</strong> Ramesh, a Postal Assistant (Level 4), receives a gift of ₹3,000 cash from a local businessman at Diwali. Can he accept?</p>
<p><strong>Answer:</strong> NO. Ramesh is Group C (Level 1–5). His limit from non-relatives is only <strong>₹2,000</strong>. ₹3,000 exceeds this. He must return it or report it to the Government within one month.</p>

<p><strong>Scenario 2 (Group B employee):</strong> An Inspector of Posts (Level 8) receives a gift voucher worth ₹4,000 from a contractor during a festival. Can he accept?</p>
<p><strong>Answer:</strong> YES — just barely. The Inspector is Group B (Level 6–10). His non-relative limit is ₹5,000. ₹4,000 is within limit. However, accepting gifts from contractors is ethically problematic even within limits, as it may compromise official duties.</p>

<p><strong>Scenario 3 (Foreign gift):</strong> An SSP attending an international postal conference receives a silver trophy worth ₹18,000 from the host country.</p>
<p><strong>Answer:</strong> Must hand it over to the Government. To keep it personally, pay ₹18,000 − ₹5,000 = <strong>₹13,000</strong> to the treasury (this ₹5,000 retention limit is uniform for all levels for foreign gifts).</p>`,
                        exam_insight: `<p><strong>Corrected Key Facts — CRITICAL for the Exam:</strong></p>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-bottom:10px">
  <strong>COMMON MISTAKE:</strong> "The gift limit from non-relatives for all govt servants is ₹5,000" — <strong>WRONG!</strong><br>
  It is ₹5,000 only for <strong>Group B (Level 6–10)</strong>. For Group C it is ₹2,000.
</div>
<table style="width:100%;border-collapse:collapse;font-size:9.5pt">
  <tr>
    <th style="border:1px solid #ccc;padding:5px">Level</th>
    <th style="border:1px solid #ccc;padding:5px">From Relatives</th>
    <th style="border:1px solid #ccc;padding:5px">From Others</th>
  </tr>
  <tr><td style="border:1px solid #ccc;padding:5px">1–5 (Group C)</td><td style="border:1px solid #ccc;padding:5px">₹5,000</td><td style="border:1px solid #ccc;padding:5px"><strong>₹2,000</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:5px">6–10 (Group B)</td><td style="border:1px solid #ccc;padding:5px">₹15,000</td><td style="border:1px solid #ccc;padding:5px"><strong>₹5,000</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:5px">11+ (Group A)</td><td style="border:1px solid #ccc;padding:5px">₹25,000</td><td style="border:1px solid #ccc;padding:5px"><strong>₹7,500</strong></td></tr>
</table>
<ul style="margin-top:10px">
  <li>Foreign dignitary gift retention limit: <strong>₹5,000</strong> (uniform for all levels)</li>
  <li>Reporting deadline for excess gifts: <strong>1 month</strong></li>
  <li>Gift limit governed by: <strong>CCS (Conduct) Rules 1964, Rule 13</strong></li>
  <li>Applicable DoPT OM: <strong>No.11013/3/2014-Estt.(A)</strong></li>
</ul>
<p><strong>MCQ Trap:</strong> "A Postal Assistant receives ₹2,500 from a neighbour as a gift. He must report it" — <strong>TRUE</strong>. Group C non-relative limit is ₹2,000; ₹2,500 exceeds it.</p>`,
                        updatedAt: new Date()
                    }
                }
            );
            console.log(r.modifiedCount
                ? "✅ Fix 2: Corrected gift limits with proper tiered structure (Group C/B/A)"
                : "⚠️  Fix 2: Entry not found");
        }

        // ─────────────────────────────────────────────────────────────────
        // FIX 3: POSB act_name — official name is Government Savings
        // Promotion General Rules, 2018 (not "Post Office Savings Bank...")
        // ─────────────────────────────────────────────────────────────────
        {
            const r = await col.updateOne(
                { title: "Post Office Savings Account — Interest & Withdrawal Rules" },
                {
                    $set: {
                        act_name: "Government Savings Promotion General Rules, 2018",
                        rule_number: "Rule 6, 7 & 8",
                        updatedAt: new Date()
                    }
                }
            );
            console.log(r.modifiedCount
                ? "✅ Fix 3: Corrected POSB act_name to 'Government Savings Promotion General Rules, 2018'"
                : "⚠️  Fix 3: Entry not found");
        }

        // ─────────────────────────────────────────────────────────────────
        // FIX 4: Money Order — update act_name to Post Office Regulations, 2024
        // Money Order rules now governed by PO Regulations 2024 (Reg. 172–200)
        // replacing the old Post Office Guide Part I
        // ─────────────────────────────────────────────────────────────────
        {
            const r = await col.updateOne(
                { title: "Money Order — Types, Limits & Procedure" },
                {
                    $set: {
                        act_name: "Post Office Regulations, 2024",
                        rule_number: "Regulation 172–200",
                        updatedAt: new Date()
                    }
                }
            );
            console.log(r.modifiedCount
                ? "✅ Fix 4: Updated Money Order act_name to Post Office Regulations, 2024"
                : "⚠️  Fix 4: Entry not found");
        }

        // ─────────────────────────────────────────────────────────────────
        // FIX 5: Registration of Postal Articles — update act_name
        // Now governed by Post Office Regulations, 2024
        // ─────────────────────────────────────────────────────────────────
        {
            const r = await col.updateOne(
                { title: "Registration of Postal Articles — Rules & Procedure" },
                {
                    $set: {
                        act_name: "Post Office Regulations, 2024",
                        rule_number: "Regulation 60–78",
                        updatedAt: new Date()
                    }
                }
            );
            console.log(r.modifiedCount
                ? "✅ Fix 5: Updated Registration act_name to Post Office Regulations, 2024"
                : "⚠️  Fix 5: Entry not found");
        }

        // ─────────────────────────────────────────────────────────────────
        // FIX 6: Speed Post — update act_name to Post Office Regulations, 2024
        // ─────────────────────────────────────────────────────────────────
        {
            const r = await col.updateOne(
                { title: "Speed Post Service — Rules, Rates & Compensation" },
                {
                    $set: {
                        act_name: "Post Office Regulations, 2024",
                        rule_number: "Regulation 118–135",
                        updatedAt: new Date()
                    }
                }
            );
            console.log(r.modifiedCount
                ? "✅ Fix 6: Updated Speed Post act_name to Post Office Regulations, 2024"
                : "⚠️  Fix 6: Entry not found");
        }

        console.log("\n🎉 All accuracy fixes applied successfully.");

    } catch (err) {
        console.error("❌ Fix script failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

fix();
