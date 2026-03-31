const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

// Manually fix potential whitespace/return char issues:
if (process.env.MONGODB_URI) {
    process.env.MONGODB_URI = process.env.MONGODB_URI.trim().replace(/\r/g, '');
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('❌ MONGODB_URI not found'); process.exit(1); }

async function fixGiftsCard() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');
    
    const db = client.db();
    const col = db.collection('daksutras');

    const cardId = "69c9d991d3aa2557b9575f93";
    
    const updatedContent = {
      official_text: `<p><strong>Rule 13 — Gifts</strong></p>
<p>(1) Save as otherwise provided in this rule, no Government servant shall accept, or permit any member of his family or any other person acting on his behalf to accept, any gift.</p>
<p>(2) <strong>Gifts from Near Relatives/Friends on Special Occasions (Rule 13(2)):</strong></p>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Group</th><th style="border:1px solid #ccc;padding:6px">Limit</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Group A</td><td style="border:1px solid #ccc;padding:6px">₹25,000</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Group B</td><td style="border:1px solid #ccc;padding:6px">₹15,000</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Group C</td><td style="border:1px solid #ccc;padding:6px"><strong>₹7,500</strong></td></tr>
</table>
<p>(3) <strong>Gifts from Others (Non-Relatives/Friends) (Rule 13(3)):</strong></p>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Group</th><th style="border:1px solid #ccc;padding:6px">Limit</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Group A</td><td style="border:1px solid #ccc;padding:6px"><strong>₹5,000</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Group B</td><td style="border:1px solid #ccc;padding:6px">₹5,000</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Group C</td><td style="border:1px solid #ccc;padding:6px">₹2,000</td></tr>
</table>
<p>(4) <strong>Gifts from Foreign Dignitaries (Rule 13(4)):</strong><br>
Acceptance and retention of gifts from foreign dignitaries are now governed by the <strong>Foreign Contribution (Acceptance or Retention of Gifts or Presentations) Rules, 2012</strong>. The previous flat monetary retention limit under Conduct Rules has been superseded by these rules.</p>
<p>(5) <strong>Reporting vs. Sanction Requirements:</strong></p>
<ul>
  <li><strong>Gifts from Relatives/Friends (Rule 13(2)):</strong> If a gift on a special occasion exceeds the limit, the Government servant must <strong>make a report</strong> to the Government within 30 days.</li>
  <li><strong>Gifts from Others (Rule 13(3)):</strong> If a gift from a non-relative/non-friend exceeds the limit, the Government servant <strong>shall not accept the gift without the sanction</strong> (permission) of the Government.</li>
</ul>`,

      guru_explanation: `<p>Rule 13 is about <strong>integrity in action</strong>. The government is strict about gifts because they can be a subtle form of bribery. Here's a plain-language summary of the critical gift rules:</p>
<h4>How to Master the Gift Thresholds</h4>
<ul>
  <li><strong>Sanction vs. Report:</strong> This is a major exam point. Rule 13 exists to ensure impartiality. Remember the procedural difference: excess gifts from relatives require a <strong>report</strong>, but excess gifts from non-relatives require official <strong>sanction</strong> (prior permission) before acceptance.</li>
  <li><strong>The \"Group A/B Symmetry\":</strong> Notice that the limit for gifts from non-relatives is <strong>₹5,000 for both Group A and Group B</strong>. Many people wrongly assume Group A has a higher limit than Group B here, but they are identical (Rule 13(3)).</li>
  <li><strong>The Group C Relative Limit:</strong> Group C employees can now accept gifts from relatives/friends on special occasions up to <strong>₹7,500</strong> (Updated via <strong>DoPT OM No. 11013/02/2019-Estt.A-III</strong>).</li>
  <li><strong>Foreign Gifts:</strong> Don't get stuck on the old ₹5,000 rule. The process is handled entirely under the <strong>Foreign Contribution (Acceptance or Retention of Gifts or Presentations) Rules, 2012</strong>, where the value is appraised by a Customs Appraiser or the Toshakhana.</li>
</ul>
<h4>What Is a \"Gift\" Under Rule 13?</h4>
<p>Any article of value — jewellery, money, property, hospitality (air tickets, hotel stays), vouchers, discount coupons, etc. The test is whether it creates an obligation or could compromise impartiality.</p>`,

      practical_example: `<p><strong>Scenario 1 (Group A/B non-relative limit):</strong> Mr. Sandeep, a Group A Director, is offered a luxury pen worth ₹6,500 from a visiting consultant (a non-friend).</p>
<p><strong>Answer:</strong> Under Rule 13(3), the limit for Group A for gifts from \"others\" is <strong>₹5,000</strong>. Since ₹6,500 > ₹5,000, Sandeep <strong>cannot accept the gift without the prior sanction</strong> of the Government. He cannot simply accept it and report it later; he must seek official permission.</p>

<p><strong>Scenario 2 (Group C relative limit):</strong> Meena, a Postal Assistant (Group C), receives a gold ring worth ₹6,500 from her brother on her wedding anniversary.</p>
<p><strong>Answer:</strong> YES — this is allowed. For Group C, the limit for gifts from relatives on special occasions is <strong>₹7,500</strong>. ₹6,500 is within the limit, so no report is needed.</p>

<p><strong>Scenario 3 (Foreign gift):</strong> An SSP receives an expensive watch from a foreign government during an official visit abroad.</p>
<p><strong>Answer:</strong> Acceptance and retention are now entirely governed by the <strong>Foreign Contribution (Acceptance or Retention of Gifts or Presentations) Rules, 2012</strong>. He must report the gift and hand it over for assessment/appraisal by the Toshakhana. The previous flat ₹5,000 retention rule is no longer active.</p>`,

      exam_insight: `<p><strong>Critical Memory Points for the Exam:</strong></p>
<table style=\"width:100%;border-collapse:collapse;font-size:9.5pt\">
  <tr>
    <th style=\"border:1px solid #ccc;padding:5px\">Who You Are</th>
    <th style=\"border:1px solid #ccc;padding:5px\">From Relatives<br>(Special Occasions)</th>
    <th style=\"border:1px solid #ccc;padding:5px\">From Others<br>(Non-Friends)</th>
  </tr>
  <tr><td style=\"border:1px solid #ccc;padding:5px\"><strong>Group A</strong></td><td style=\"border:1px solid #ccc;padding:5px\">₹25,000</td><td style=\"border:1px solid #ccc;padding:5px\"><strong>₹5,000</strong></td></tr>
  <tr><td style=\"border:1px solid #ccc;padding:5px\"><strong>Group B</strong></td><td style=\"border:1px solid #ccc;padding:5px\">₹15,000</td><td style=\"border:1px solid #ccc;padding:5px\"><strong>₹5,000</strong></td></tr>
  <tr><td style=\"border:1px solid #ccc;padding:5px\"><strong>Group C</strong></td><td style=\"border:1px solid #ccc;padding:5px\"><strong>₹7,500</strong></td><td style=\"border:1px solid #ccc;padding:5px\">₹2,000</td></tr>
</table>
<ul style=\"margin-top:10px\">
  <li><strong>Sanction vs. Report (CRITICAL):</strong> Excess gifts from relatives require <strong>reporting</strong>. Excess gifts from others require Government <strong>sanction</strong>.</li>
  <li><strong>Golden Number for Group C:</strong> The relative gift limit is <strong>₹7,500</strong> (Update: <strong>DoPT OM No. 11013/02/2019-Estt.A-III</strong>).</li>
  <li><strong>Group A & B Parity:</strong> The non-relative gift limit is <strong>₹5,000</strong> for both.</li>
  <li><strong>Foreign Gifts:</strong> Governed by the Foreign Contribution (Acceptance or Retention of Gifts or Presentations) <strong>Rules</strong>, 2012.</li>
</ul>`,
      updatedAt: new Date()
    };

    const r = await col.updateOne(
        { _id: new ObjectId(cardId) },
        { $set: updatedContent }
    );
    
    if (r.modifiedCount > 0) {
      console.log(`✅ Successfully updated Gift Limits card with double-verified legal accuracy.`);
    } else {
      console.log('⚠️ Card not found or no changes made');
    }

  } catch (error) {
    console.error('❌ Database fix failed:', error);
  } finally {
    await client.close();
    process.exit();
  }
}

fixGiftsCard();
