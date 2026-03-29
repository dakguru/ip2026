
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

    // ─────────────────────────────────────────────────────────────────────────
    // 1. POST OFFICE ACT, 2023
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Act, 2023 — Key Provisions at a Glance",
        rule_number: "Sections 1–28",
        act_name: "Post Office Act, 2023",
        category: "Section",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p>The Post Office Act, 2023 received Presidential assent on <strong>18 December 2023</strong> and came into force on <strong>16 December 2024</strong>, replacing the Indian Post Office Act, 1898.</p>
<h4>Key Definitions</h4>
<ul>
  <li><strong>Section 2(j) – "Postal article":</strong> Includes any article (letter, postcard, parcel, newspaper, book-packet, etc.) transmissible by post.</li>
  <li><strong>Section 2(k) – "Postal services":</strong> Services rendered by the Post Office including collection, processing, transmission, and delivery of postal articles.</li>
  <li><strong>Section 2(l) – "Post Office":</strong> The Department of Posts and includes any entity or person authorised by the Central Government to provide services through its network.</li>
</ul>
<h4>Exclusive Privilege (Section 3)</h4>
<p>The Central Government shall have the exclusive privilege of conveying by post, from one place to another, all letters including express delivery of letters, except where it otherwise provides.</p>
<h4>Exemptions (Section 4)</h4>
<p>The exclusive privilege shall not apply to: (a) a letter sent by a private person by private hand or by a special messenger; (b) a letter sent to a courier by a telegraph office.</p>
<h4>Interception of Postal Articles (Section 9)</h4>
<p>The Central Government or any officer specially authorised by it may direct interception, opening or detention of any postal article in the interest of — (i) sovereignty and integrity of India; (ii) security of the State; (iii) friendly relations with foreign states; (iv) public order, decency or morality; (v) prevention of cognisable offences.</p>
<h4>Liability of the Post Office (Section 10)</h4>
<p>The Post Office shall not incur any liability in respect of — (a) loss, misdelivery, delay or damage to any postal article in the course of transmission, except as otherwise provided under this Act; (b) money orders or electronic money orders. However, the Central Government may, by rules, provide for compensation for loss or damage.</p>`,
        guru_explanation: `<p>The Post Office Act, 2023 is a landmark reform — the first complete overhaul since the British-era <strong>Indian Post Office Act, 1898</strong>. Here's what you must understand for the exam:</p>
<h4>The Big Changes from 1898 Act</h4>
<ul>
  <li>The old Act had <strong>criminal penalties</strong> for misusing postal services. The 2023 Act removes criminal provisions — it is a civil legislation now.</li>
  <li>The definition of "Post Office" is <strong>broader</strong> — any authorised entity can act as a post office, enabling partnerships with private players and CSCs.</li>
  <li>The <strong>exclusive privilege</strong> of conveying letters remains, but exemptions are clearer.</li>
</ul>
<h4>Section 9 — The Interception Power (Very Important!)</h4>
<p>The government can open your mail — but only on <strong>5 grounds</strong>: sovereignty, security, foreign relations, public order, and prevention of cognisable offences. This power is similar to phone tapping powers under IT Act.</p>
<h4>Section 10 — No Liability by Default</h4>
<p>The Post Office is <strong>NOT liable</strong> for loss or damage by default. This is unchanged from 1898. Compensation is only as per rules notified by the Central Government.</p>`,
        practical_example: `<p><strong>Scenario:</strong> A customer files a complaint saying his Speed Post parcel (booked with insurance) was lost in transit. He asks for compensation under the Post Office Act, 2023.</p>
<p><strong>Application of Law:</strong></p>
<ul>
  <li>Under <strong>Section 10</strong>, the Post Office is not liable for loss by default.</li>
  <li>However, since the article was <strong>insured</strong>, the Central Government rules (under Section 10) provide for compensation up to the insured value.</li>
  <li>The postmaster must process the claim as per the Compensation Rules, not as a direct right under the Act.</li>
</ul>
<p><strong>Key takeaway:</strong> Insurance is the route to compensation — the Act itself provides no automatic remedy.</p>`,
        exam_insight: `<p><strong>Top MCQ Facts to Remember:</strong></p>
<ul>
  <li>Post Office Act, 2023 came into force: <strong>16 December 2024</strong></li>
  <li>Replaced: <strong>Indian Post Office Act, 1898</strong></li>
  <li>Grounds for interception (Section 9): <strong>5 grounds</strong></li>
  <li>Post Office's default liability for loss/damage: <strong>Nil</strong> (Section 10)</li>
  <li>The 2023 Act is a <strong>civil legislation</strong> (no criminal provisions)</li>
  <li>Exclusive privilege: conveying <strong>letters</strong> (not parcels)</li>
</ul>
<p><strong>Likely Question Format:</strong> "Which of the following is NOT a ground for interception of postal articles under Section 9 of the Post Office Act, 2023?" — The answer would be something like "Tax evasion" which is not listed.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 2. CCS (LEAVE) RULES, 1972 – EARNED LEAVE
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Earned Leave — CCS (Leave) Rules, 1972",
        rule_number: "Rule 26",
        act_name: "CCS (Leave) Rules, 1972",
        category: "Rule",
        effective_date: new Date("1972-01-01"),
        exam_tags: ["PS Group B", "LDCE IP"],
        official_text: `<p><strong>Rule 26. Earned Leave.</strong></p>
<p>(1) A Government servant (other than a military officer) shall be entitled to earned leave at the rate of <strong>2.5 days for each completed calendar month</strong> of service. This amounts to <strong>30 days in a full calendar year</strong>.</p>
<p>(2) The maximum accumulation of earned leave that a Government servant may accumulate at any given time shall be <strong>300 days</strong>.</p>
<p>(3) Earned leave at a time shall not normally exceed <strong>180 days</strong> (except for study leave or leave preparatory to retirement).</p>
<p>(4) A Government servant may be <strong>refused</strong> earned leave if the exigencies of public service so require. In such a case, the leave due but refused shall be credited and may be availed later.</p>
<p>(5) Leave preparatory to retirement: A Government servant may be granted leave preparatory to retirement (LPR) for the entire balance of earned leave at credit up to a maximum of <strong>300 days</strong>.</p>`,
        guru_explanation: `<p>Earned Leave (EL) is the most important type of leave in CCS Leave Rules. Think of it as <strong>leave you earn by working</strong>. Here's the quick cheat sheet:</p>
<h4>The Numbers You Must Know</h4>
<ul>
  <li>Accrual rate: <strong>2½ days per calendar month</strong> = <strong>30 days per year</strong></li>
  <li>Maximum accumulation: <strong>300 days</strong></li>
  <li>Maximum EL at a stretch: <strong>180 days</strong> (general rule)</li>
  <li>Leave preparatory to retirement (LPR): up to <strong>300 days</strong></li>
</ul>
<h4>Can Leave Be Refused?</h4>
<p>Yes! If public interest requires it, the sanctioning authority can refuse earned leave. But the leave is <strong>not forfeited</strong> — it stays in the account. The employee can avail it later or encash it at retirement.</p>
<h4>EL Encashment</h4>
<p>At retirement, a government servant can encash up to <strong>300 days</strong> of earned leave. This is a significant monetary benefit — one of the most discussed points in the exam!</p>
<h4>Half Pay vs Earned Leave</h4>
<p>EL is on <strong>full pay</strong>. Half Pay Leave (HPL) is on — you guessed it — half pay (Rule 29). Don't confuse them.</p>`,
        practical_example: `<p><strong>Scenario:</strong> Suresh, a postal inspector, has 298 days of EL accumulated. He is retiring on 31 March 2026. His last posting is very busy and he can take only 5 days of LPR. What happens to remaining EL?</p>
<p><strong>Solution:</strong></p>
<ul>
  <li>He has 298 days EL at credit.</li>
  <li>He takes 5 days LPR — so 293 days remain at the time of retirement.</li>
  <li>He can <strong>encash 293 days</strong> of EL at retirement (since it's within 300-day limit).</li>
  <li>If his basic pay is ₹50,000/month, the encashment = (50,000 ÷ 30) × 293 ≈ <strong>₹4,88,333</strong></li>
</ul>
<p><strong>Key Point:</strong> The 300-day limit applies both to <em>maximum accumulation</em> and to <em>maximum encashment</em> at retirement.</p>`,
        exam_insight: `<p><strong>Must-Know Facts for the Exam:</strong></p>
<ul>
  <li>EL accrual: <strong>2½ days/month = 30 days/year</strong></li>
  <li>Max EL credit at any time: <strong>300 days</strong></li>
  <li>Max EL at a stretch (normally): <strong>180 days</strong></li>
  <li>Max EL encashment at retirement: <strong>300 days</strong></li>
  <li>Leave refused for public exigency is <strong>not forfeited</strong></li>
  <li>EL is granted on <strong>full pay</strong></li>
</ul>
<p><strong>Tricky Question Type:</strong> "A Government servant with 310 days EL at credit retires — how many days can he encash?" Answer: <strong>300 days</strong> (accumulation beyond 300 is not permitted, so this situation cannot arise. But if the question says 298 days, encash all 298).</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. CCS (CONDUCT) RULES 1964 — GENERAL CONDUCT
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "General Conduct — Maintaining Integrity & Loyalty",
        rule_number: "Rule 3",
        act_name: "CCS (Conduct) Rules, 1964",
        category: "Rule",
        effective_date: new Date("1964-11-30"),
        exam_tags: ["PS Group B", "LDCE IP"],
        official_text: `<p><strong>Rule 3. General.</strong></p>
<p>(1) Every Government servant shall at all times:</p>
<ul>
  <li>(i) maintain <strong>absolute integrity</strong>;</li>
  <li>(ii) maintain <strong>devotion to duty</strong>;</li>
  <li>(iii) do nothing which is <strong>unbecoming of a Government servant</strong>.</li>
</ul>
<p>(2) Every Government servant holding a supervisory post shall take all possible steps to ensure the integrity and devotion to duty of all Government servants for the time being under his control and authority.</p>
<p>(3) No Government servant shall, in the performance of his official duties, or in the exercise of powers conferred on him, act otherwise than in his best judgment, except when he is acting under the direction of his official superior.</p>
<p>(4) <strong>Proviso:</strong> A Government servant who has been given a direction by his superior shall, if he is working against his better judgment, communicate his views in writing to the authority giving the direction. In any case, the Government servant shall act in accordance with the direction.</p>`,
        guru_explanation: `<p>Rule 3 is the <strong>mother rule</strong> of all conduct rules. It lays down the foundational duties of every government employee. Three words summarise it:</p>
<ol>
  <li><strong>Integrity</strong> — Be honest, no corruption, no misuse of position</li>
  <li><strong>Devotion to Duty</strong> — Put your work first, don't be negligent</li>
  <li><strong>Dignity</strong> — Don't act in a way that embarrasses the government ("unbecoming of a Government servant")</li>
</ol>
<h4>The Supervisory Responsibility</h4>
<p>If you are a supervisor (like a Postmaster or Inspector), Rule 3(2) says <strong>you are responsible</strong> for the integrity of your juniors too. If a clerk under you commits fraud and you knew but didn't act — you can also be penalised.</p>
<h4>Following Superior's Orders</h4>
<p>What if your boss tells you to do something you think is wrong?</p>
<ul>
  <li>You <strong>must obey</strong> the direction.</li>
  <li>But you can put your objection <strong>in writing</strong>.</li>
  <li>Once you've noted your objection on record, follow the order. You'll be protected if things go wrong.</li>
</ul>`,
        practical_example: `<p><strong>Scenario:</strong> Mohan, a Head Postmaster, is directed by the Divisional Superintendent to mark attendance of an absent employee as 'present' for the previous month. Mohan disagrees but doesn't know what to do.</p>
<p><strong>Correct action under Rule 3:</strong></p>
<ol>
  <li>Mohan should NOT simply comply — falsifying records violates his integrity under Rule 3(1)(i).</li>
  <li>He should <strong>record his objection in writing</strong> (email or note) to the DS, clearly stating this act would violate service rules.</li>
  <li>If the DS still insists in writing, Mohan follows the order but his written objection protects him under Rule 3(4).</li>
  <li>Ideally, Mohan should also report the matter to the next higher authority.</li>
</ol>`,
        exam_insight: `<p><strong>Top MCQ Points:</strong></p>
<ul>
  <li>The three duties under Rule 3(1): <strong>Integrity, Devotion to Duty, Dignity</strong></li>
  <li>Rule 3(2) extends responsibility to <strong>supervisors</strong> for their subordinates' conduct</li>
  <li>If a superior gives a direction against your judgment — <strong>note in writing and comply</strong></li>
  <li>Rule 3(4) is the <strong>safety valve</strong> for honest officers under pressure from superiors</li>
</ul>
<p><strong>Common Exam Trick:</strong> "A government servant must always act on his own judgment" — <strong>FALSE</strong>. He must follow superior's directions, but can record dissent in writing.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 4. CCS (CCA) RULES, 1965 — MINOR PENALTIES
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Penalties under CCS (CCA) Rules, 1965",
        rule_number: "Rule 11",
        act_name: "CCS (CCA) Rules, 1965",
        category: "Rule",
        effective_date: new Date("1965-12-01"),
        exam_tags: ["PS Group B", "LDCE IP"],
        official_text: `<p><strong>Rule 11. Penalties.</strong></p>
<p>The following penalties may, for good and sufficient reasons, be imposed on a Government servant, namely:</p>
<h4>Minor Penalties</h4>
<ol type="i">
  <li>Censure;</li>
  <li>Withholding of his promotion;</li>
  <li>Recovery from his pay of the whole or part of any pecuniary loss caused by him to the Government by negligence or breach of orders;</li>
  <li>(a) Reduction to a lower stage in the time-scale of pay for a period not exceeding three years, without cumulative effect and not adversely affecting his pension; (b) Withholding of increments of pay;</li>
</ol>
<h4>Major Penalties</h4>
<ol start="5" type="i">
  <li>Save as provided for in clause (iv)(a), reduction to a lower stage in the time-scale of pay for a specified period, with further directions as to whether or not the Government servant will earn increments of pay during the period of such reduction, and whether, on expiry of such period, the reduction will or will not have the effect of postponing his future increments of pay;</li>
  <li>Reduction to a lower time-scale of pay, grade, post or service;</li>
  <li>Compulsory retirement;</li>
  <li>Removal from service which shall not be a disqualification for future employment under the Government;</li>
  <li>Dismissal from service which shall ordinarily be a disqualification for future employment under the Government.</li>
</ol>`,
        guru_explanation: `<p>Rule 11 lists the <strong>9 penalties</strong> that can be imposed on a government servant — 4 minor and 5 major. <strong>Memorise this list!</strong> It is the most frequently tested provision in CCS (CCA) Rules.</p>
<h4>Quick Memory Aid</h4>
<p><strong>Minor Penalties (4): C-W-R-W</strong></p>
<ol>
  <li><strong>C</strong>ensure</li>
  <li><strong>W</strong>ithholding of promotion</li>
  <li><strong>R</strong>ecovery from pay (for loss caused)</li>
  <li><strong>W</strong>ithholding of increment / Reduction in pay scale (non-cumulative, ≤3 years)</li>
</ol>
<p><strong>Major Penalties (5): R-R-C-R-D</strong></p>
<ol start="5">
  <li><strong>R</strong>eduction in pay scale (with further directions)</li>
  <li><strong>R</strong>eduction to lower grade/post</li>
  <li><strong>C</strong>ompulsory Retirement</li>
  <li><strong>R</strong>emoval from service (NOT disqualified for future employment)</li>
  <li><strong>D</strong>ismissal (DISQUALIFIED for future employment)</li>
</ol>
<h4>Removal vs Dismissal — The KEY Difference</h4>
<ul>
  <li><strong>Removal:</strong> Severe, but you can still apply for govt jobs later.</li>
  <li><strong>Dismissal:</strong> The most severe — ordinarily bars you from future government employment.</li>
</ul>`,
        practical_example: `<p><strong>Scenario:</strong> Priya, a Postal Assistant, was 15 minutes late on 5 separate occasions. Her supervisor wants to take action. Which penalty is appropriate?</p>
<p><strong>Analysis:</strong></p>
<ul>
  <li>Habitual late coming is a misconduct but is a <strong>minor lapse</strong>.</li>
  <li>Appropriate penalty: <strong>Censure</strong> (minor penalty i) for first instance, or <strong>Withholding of increment</strong> (minor penalty iv) if it is habitual and warned earlier.</li>
  <li>Major penalty like Reduction or Compulsory Retirement would be <strong>disproportionate</strong> and would be set aside by a Court/Tribunal.</li>
</ul>
<p><strong>Lesson:</strong> The penalty must be <strong>proportionate to the misconduct</strong>. Imposing a major penalty for a minor lapse is grounds for appeal and reversal.</p>`,
        exam_insight: `<p><strong>Critical Facts for the Exam:</strong></p>
<ul>
  <li>Total penalties under Rule 11: <strong>9 (4 minor + 5 major)</strong></li>
  <li>Most severe penalty: <strong>Dismissal</strong></li>
  <li>Removal — future employment: <strong>NOT disqualified</strong></li>
  <li>Dismissal — future employment: <strong>Disqualified (ordinarily)</strong></li>
  <li>Reduction in pay (minor, Rule 11-iv-a): <strong>≤ 3 years, no cumulative effect</strong></li>
  <li>Minor penalty — Inquiry required? <strong>No formal inquiry</strong> (but opportunity to show cause must be given)</li>
  <li>Major penalty — Inquiry required? <strong>Yes, formal inquiry under Rule 14</strong></li>
</ul>
<p><strong>Frequently Tested MCQ:</strong> "Which of the following is NOT a minor penalty?" — Options include Censure, Compulsory Retirement (major), Withholding of promotion, Recovery from pay. Answer: <strong>Compulsory Retirement</strong>.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 5. CONSUMER PROTECTION ACT 2019 — DEFINITION OF CONSUMER
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Who is a 'Consumer'? — Section 2(7)",
        rule_number: "Section 2(7)",
        act_name: "Consumer Protection Act, 2019",
        category: "Section",
        effective_date: new Date("2020-07-20"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>Section 2(7) — "Consumer" means any person who:</strong></p>
<p><strong>(i) buys any goods</strong> for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment, and includes any user of such goods other than the person who buys such goods for consideration paid or promised, but does not include a person who obtains such goods for resale or for any commercial purpose; or</p>
<p><strong>(ii) hires or avails of any service</strong> for a consideration which has been paid or promised, or partly paid and partly promised, or under any system of deferred payment, and includes any beneficiary of such service other than the person who hires or avails of the service, but does not include a person who avails of such service for any commercial purpose.</p>
<p><strong>Explanation:</strong> For the purposes of this clause, "commercial purpose" does not include use by a person of goods bought and used by him exclusively for the purpose of earning his livelihood by means of self-employment.</p>`,
        guru_explanation: `<p>The definition of "Consumer" is the <strong>most important definition</strong> in the Consumer Protection Act, 2019. Three things to understand:</p>
<h4>1. Who IS a Consumer?</h4>
<ul>
  <li>Anyone who <strong>buys goods</strong> or <strong>avails services</strong> for consideration (payment)</li>
  <li>Also includes <strong>users</strong> of the goods (not just the buyer) — e.g., if husband buys a mixer-grinder, wife using it is also a consumer</li>
  <li>Includes beneficiaries of service — e.g., person on whose behalf an insurance policy is taken</li>
</ul>
<h4>2. Who is NOT a Consumer?</h4>
<ul>
  <li>Person who buys goods for <strong>resale</strong> — e.g., a shopkeeper buying items to sell</li>
  <li>Person who avails services for <strong>commercial purpose</strong> — e.g., a courier company hiring delivery trucks</li>
</ul>
<h4>3. The Important Exception (Self-Employment)</h4>
<p>If someone buys goods/services to earn a livelihood through <strong>self-employment</strong>, they ARE a consumer — even if it sounds "commercial." Example: An auto-rickshaw driver who bought his vehicle on EMI is a consumer if the vehicle has a defect.</p>`,
        practical_example: `<p><strong>Scenario 1 (IS a Consumer):</strong> Ramesh books a Speed Post at the Post Office to send legal documents. The Speed Post is lost. Ramesh is a <strong>consumer</strong> (he availed a postal service for personal purpose) and can file a complaint with the Consumer Forum.</p>
<p><strong>Scenario 2 (NOT a Consumer):</strong> ABC Courier Ltd. uses India Post's Bulk Mail service to handle 10,000 articles per day for their commercial operations. They are <strong>NOT a consumer</strong> — they use services for commercial purpose.</p>
<p><strong>Scenario 3 (Self-Employment Exception):</strong> Meena, a saree vendor, uses Speed Post to deliver sarees to customers across India. Even though she uses it commercially, she is a <strong>consumer</strong> if she is a self-employed individual earning her own livelihood — not a company.</p>`,
        exam_insight: `<p><strong>Key Facts to Nail the MCQ:</strong></p>
<ul>
  <li>Consumer Protection Act 2019 came into force: <strong>20 July 2020</strong></li>
  <li>Person buying for <strong>resale</strong>: NOT a consumer</li>
  <li>Person buying for <strong>commercial purpose</strong>: NOT a consumer</li>
  <li>Person buying for <strong>self-employment livelihood</strong>: IS a consumer (exception to commercial purpose)</li>
  <li>Users of goods (not buyers) — e.g., family members: <strong>ARE consumers</strong></li>
  <li>This definition covers both <strong>goods and services</strong></li>
</ul>
<p><strong>Classic Exam Trick:</strong> "A person who buys goods for commercial purpose is not a consumer" — <strong>TRUE</strong>. But "A self-employed artisan buying tools for his craft is not a consumer" — <strong>FALSE</strong> (self-employment exception applies).</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 6. CCS (PENSION) RULES 2021 — FAMILY PENSION
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Family Pension — Eligibility and Amount",
        rule_number: "Rule 50",
        act_name: "CCS (Pension) Rules, 2021",
        category: "Rule",
        effective_date: new Date("2021-04-01"),
        exam_tags: ["PS Group B"],
        official_text: `<p><strong>Rule 50. Family Pension.</strong></p>
<p>(1) A Government servant who has completed at least <strong>one year</strong> of continuous service shall be eligible for family pension.</p>
<p>(2) The family pension shall be payable to the family at a <strong>uniform rate of 30%</strong> of the last drawn basic pay, subject to a minimum of ₹9,000 per month.</p>
<p>(3) <strong>Enhanced Family Pension:</strong> For the first 10 years after death (or until the date on which the Government servant would have attained the age of 67 years, whichever is earlier), family pension shall be paid at an <strong>enhanced rate of 50% of the last drawn basic pay</strong>.</p>
<p>(4) <strong>Family</strong> means: (i) spouse; (ii) unmarried son below 25 years; (iii) unmarried daughter; (iv) widowed/divorced daughter; (v) parents (if wholly dependent); (vi) minor children of a pre-deceased son/daughter.</p>
<p>(5) The family pension shall cease on the beneficiary getting married, or on attaining the age of 25 (for sons), or on getting employed in a government job earning more than the family pension.</p>`,
        guru_explanation: `<p>Family Pension is the pension given to the <strong>family</strong> when a government servant dies — either during service or after retirement. Here's the breakdown:</p>
<h4>The Two Rates</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Period</th><th style="border:1px solid #ccc;padding:6px">Rate</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">First 10 years (or up to age 67 if less)</td><td style="border:1px solid #ccc;padding:6px"><strong>Enhanced: 50% of last basic pay</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">After 10 years</td><td style="border:1px solid #ccc;padding:6px"><strong>Normal: 30% of last basic pay</strong></td></tr>
</table>
<h4>Minimum Amount</h4>
<p>Family pension cannot be less than <strong>₹9,000 per month</strong> (as per current rules).</p>
<h4>Order of Precedence</h4>
<p>Spouse → Children → Dependent Parents. Once a higher-priority member is eligible, lower-priority members cannot claim.</p>
<h4>When Does It Stop?</h4>
<ul>
  <li>Son: on marriage or age 25</li>
  <li>Daughter: on marriage (except widowed/divorced daughter)</li>
  <li>Spouse: on remarriage</li>
  <li>Any beneficiary: on getting a govt job paying more than the pension</li>
</ul>`,
        practical_example: `<p><strong>Scenario:</strong> Suresh, a Postal Superintendent, dies in service at age 52 with last drawn basic pay of ₹60,000. His wife Gita and son Raj (age 20) survive him.</p>
<p><strong>Family Pension Calculation:</strong></p>
<ul>
  <li><strong>Enhanced rate (first 10 years or till he would have turned 67 — i.e., 15 years away):</strong> 10 years applies as 10 < 15</li>
  <li>Enhanced family pension = 50% × ₹60,000 = <strong>₹30,000/month for 10 years</strong></li>
  <li>After 10 years: Normal rate = 30% × ₹60,000 = <strong>₹18,000/month thereafter</strong></li>
  <li>Beneficiary: <strong>Gita (spouse)</strong> — first in order of precedence</li>
  <li>Raj cannot claim simultaneously; it passes to him only if Gita dies/remarries</li>
  <li>Raj's claim would stop at <strong>age 25</strong> if he were the primary beneficiary</li>
</ul>`,
        exam_insight: `<p><strong>Must-Know Numbers:</strong></p>
<ul>
  <li>Minimum service for family pension eligibility: <strong>1 year</strong></li>
  <li>Normal family pension: <strong>30%</strong> of last basic pay</li>
  <li>Enhanced family pension: <strong>50%</strong> of last basic pay</li>
  <li>Enhanced rate period: <strong>10 years</strong> or till the deceased would have turned <strong>67</strong>, whichever is earlier</li>
  <li>Minimum family pension: <strong>₹9,000/month</strong></li>
  <li>Son's entitlement ceases at: <strong>age 25</strong> or on marriage</li>
</ul>
<p><strong>Classic MCQ:</strong> "Enhanced family pension is payable for a period of — (a) 5 years (b) 7 years (c) 10 years (d) 15 years" — Answer: <strong>(c) 10 years</strong></p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 7. FR & SR — PAY FIXATION ON PROMOTION
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Pay Fixation on Promotion — FR 22",
        rule_number: "FR 22",
        act_name: "Fundamental Rules & Supplementary Rules (FR & SR)",
        category: "Rule",
        effective_date: new Date("2016-01-01"),
        exam_tags: ["PS Group B"],
        official_text: `<p><strong>FR 22(I)(a)(1) — Pay Fixation on Promotion (7th CPC regime)</strong></p>
<p>When a Government servant is promoted to a higher post, his pay in the new Level of Pay Matrix shall be fixed in the following manner:</p>
<ol>
  <li>The pay in the new Level shall be fixed at the <strong>next higher cell</strong> of the Level of Pay Matrix in which the pay after granting one increment in the existing Level equals or exceeds the pay in the new Level.</li>
  <li>If no such higher cell is available, the pay shall be fixed at the last cell in the new Level.</li>
  <li>The <strong>Date of Next Increment (DNI)</strong> in the new post shall be fixed at <strong>1st July of the following year</strong>, if the promotion takes effect on or after 2nd January. If it takes effect between 1st January and 30th June, the DNI shall be 1st July of the same year (provided at least 6 months have elapsed).</li>
</ol>`,
        guru_explanation: `<p>Pay fixation on promotion can seem complex, but follow these <strong>3 simple steps</strong>:</p>
<h4>Step-by-Step: How Pay is Fixed on Promotion</h4>
<ol>
  <li><strong>Add 1 notional increment</strong> to your current pay in the existing level (current level's next cell).</li>
  <li><strong>Go to the promoted level</strong> — find the cell that is equal to or just above the amount in Step 1.</li>
  <li>Your new pay = that cell in the promoted level.</li>
</ol>
<h4>Date of Next Increment (DNI) — The Critical Rule</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Promotion Date</th><th style="border:1px solid #ccc;padding:6px">DNI</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">1 Jan – 30 Jun</td><td style="border:1px solid #ccc;padding:6px">1 July of same year (if 6 months complete)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">2 Jul – 31 Dec</td><td style="border:1px solid #ccc;padding:6px">1 July of next year</td></tr>
</table>
<h4>Option to Choose</h4>
<p>An employee can choose between two options: (1) get pay fixed on promotion date immediately; or (2) get pay fixed on the date of next increment in the lower post. The option must be exercised within <strong>one month</strong> of promotion.</p>`,
        practical_example: `<p><strong>Scenario:</strong> Vijay is a Postal Assistant in Level 4 (Pay Matrix). His current pay is ₹29,200. He is promoted to Inspector of Posts (Level 7) on 1 August 2025. What is his pay in Level 7?</p>
<p><strong>Step-by-step:</strong></p>
<ol>
  <li>Current pay in Level 4: ₹29,200. Add one notional increment (3% of 29,200 ≈ ₹876, rounded to ₹29,900 as per matrix). Notional pay = <strong>₹29,900 (approximately)</strong>.</li>
  <li>Find the cell in Level 7 equal to or just above ₹29,900. Suppose Level 7 starts at ₹44,900, ₹46,300, ₹47,700... The cell just at or above ₹29,900 would be the <strong>first applicable cell of Level 7</strong>.</li>
  <li>His pay in Level 7 = that cell value.</li>
</ol>
<p><strong>DNI:</strong> Promoted on 1 Aug 2025 → DNI = <strong>1 July 2026</strong>.</p>`,
        exam_insight: `<p><strong>Key Points for Exam:</strong></p>
<ul>
  <li>Pay fixation rule: FR <strong>22(I)(a)(1)</strong></li>
  <li>Method: <strong>1 notional increment in old level + match in new level</strong></li>
  <li>DNI after promotion: <strong>1st July</strong> (either same or next year)</li>
  <li>Option to fix pay on increment date: must be exercised within <strong>one month</strong></li>
  <li>Pay fixation is applicable only when promoted to a <strong>higher Level</strong></li>
</ul>
<p><strong>Common MCQ:</strong> "On promotion, an employee's pay is fixed by granting — (a) one additional increment (b) one notional increment in the lower post and then matching in the higher post (c) 5% increment directly in the higher post." Answer: <strong>(b)</strong>.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 8. RTI ACT 2005 — TIME LIMIT FOR PROVIDING INFORMATION
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "RTI Act 2005 — Time Limit for Providing Information",
        rule_number: "Section 7",
        act_name: "Right to Information Act, 2005",
        category: "Section",
        effective_date: new Date("2005-10-12"),
        exam_tags: ["PS Group B", "LDCE IP"],
        official_text: `<p><strong>Section 7 — Disposal of Request.</strong></p>
<p>(1) Subject to the proviso to sub-section (2) of section 5, the Central Public Information Officer or State Public Information Officer, as the case may be, on receipt of a request, shall, as expeditiously as possible, and in any case within <strong>thirty days</strong> of the receipt of the request, either provide the information on payment of such fee as may be prescribed or reject the request for any of the reasons specified in sections 8 and 9.</p>
<p><strong>Proviso:</strong> Where the information sought for concerns the life or liberty of a person, the information shall be provided within <strong>forty-eight hours</strong> of the receipt of the request.</p>
<p>(2) If the Central Public Information Officer or State Public Information Officer fails to give decision on the request for information within the period specified under sub-section (1), the Central Public Information Officer or State Public Information Officer, as the case may be, shall be deemed to have refused the request.</p>
<p>(3) Where a decision is taken to provide the information on payment of any further fee representing the cost of providing the information, the Central Public Information Officer or State Public Information Officer shall send an intimation to the person making the request, giving — (a) the details of further fees...; (b) information concerning his or her right with respect to review the decision as to the amount of fees charged.</p>
<p>(8) Where access to the record or a part thereof is required to be provided under this Act and the person to whom access is to be provided is sensorily disabled, the Central Public Information Officer or State Public Information Officer, as the case may be, shall provide assistance to enable access to the information, including providing such assistance as may be appropriate for the inspection.</p>`,
        guru_explanation: `<p>Section 7 is all about <strong>how fast</strong> the government must reply to your RTI. Three timelines to remember:</p>
<h4>The Timeline Chart</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Situation</th><th style="border:1px solid #ccc;padding:6px">Time Limit</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Normal RTI request</td><td style="border:1px solid #ccc;padding:6px"><strong>30 days</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Life or liberty of a person</td><td style="border:1px solid #ccc;padding:6px"><strong>48 hours</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Where request transferred to another PIO</td><td style="border:1px solid #ccc;padding:6px"><strong>30 days from transfer</strong> (overall max 35 days)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">BPL applicant fee</td><td style="border:1px solid #ccc;padding:6px">No fee (exempt)</td></tr>
</table>
<h4>What If No Reply Comes in 30 Days?</h4>
<p>Under Section 7(2), if the CPIO doesn't reply within 30 days, the request is <strong>deemed rejected</strong>. The applicant can directly file a <strong>First Appeal</strong> — no need to wait.</p>
<h4>Sensorily Disabled Persons</h4>
<p>A nice provision: If the applicant is blind or deaf, the CPIO must provide assistance to access the information in an appropriate format (Section 7(8)).</p>`,
        practical_example: `<p><strong>Scenario 1:</strong> A prisoner files an RTI asking about the status of his mercy petition, which affects his date of execution. The CPIO receives it on 1 March 2025.</p>
<p>→ This concerns <strong>life and liberty</strong> → must be provided within <strong>48 hours</strong> (by 3 March 2025, 5 PM).</p>
<p><strong>Scenario 2:</strong> A postal employee files an RTI about his seniority list. The CPIO receives it on 1 March 2025 and doesn't reply.</p>
<p>→ Normal case → 30 day limit → expires 31 March 2025 → <strong>Deemed rejected</strong> on 31 March → Employee can file <strong>First Appeal</strong> from 1 April 2025.</p>`,
        exam_insight: `<p><strong>Numbers Every LDCE/PS Aspirant Must Know:</strong></p>
<ul>
  <li>Normal RTI response time: <strong>30 days</strong></li>
  <li>Life or liberty cases: <strong>48 hours</strong></li>
  <li>Non-reply within 30 days: <strong>Deemed rejection</strong></li>
  <li>RTI Act came into force: <strong>12 October 2005</strong></li>
  <li>RTI fee (normal): <strong>₹10</strong> per application</li>
  <li>BPL applicants: <strong>No RTI fee</strong></li>
  <li>First appeal: within <strong>30 days</strong> of rejection (or deemed rejection)</li>
  <li>Second appeal: to <strong>Central Information Commission (CIC)</strong> within 90 days</li>
</ul>
<p><strong>Trap Question:</strong> "RTI application related to life and liberty must be replied within — (a) 24 hours (b) 48 hours (c) 72 hours (d) 7 days." Answer: <strong>(b) 48 hours</strong>.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 9. GFR 2017 — PROPRIETARY ARTICLE CERTIFICATE
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Proprietary Article Certificate — GFR 2017",
        rule_number: "Rule 166",
        act_name: "General Financial Rules, 2017",
        category: "Rule",
        effective_date: new Date("2017-03-07"),
        exam_tags: ["PS Group B", "LDCE IP"],
        official_text: `<p><strong>Rule 166 — Procurement of goods of proprietary nature.</strong></p>
<p>Purchase of goods of proprietary nature, the source of which is limited to only one supplier, can be made without inviting tenders. In such cases, the following certificate shall be recorded by the competent authority:</p>
<blockquote>
  <p><em>"I am personally satisfied that these goods/services purchased are of the requisite quality and specification and have been procured from a reliable supplier at a reasonable price."</em></p>
</blockquote>
<p><strong>Conditions for Proprietary Article Purchase:</strong></p>
<ul>
  <li>The item must be of a <strong>proprietary nature</strong> — i.e., manufactured/supplied by only one firm.</li>
  <li>The Purchase Officer must be satisfied about quality, specification, and price.</li>
  <li>A <strong>Proprietary Article Certificate (PAC)</strong> must be recorded.</li>
  <li>No comparative quotations are required if PAC is recorded.</li>
</ul>`,
        guru_explanation: `<p>Normally in government procurement, you must get at least <strong>3 quotations</strong> and go through a tendering process. But what if something is available only from ONE company?</p>
<p>That's where the <strong>Proprietary Article Certificate (PAC)</strong> comes in. It's the government's way of saying: "We know this is only available from one supplier, so we're buying directly — but the officer takes responsibility."</p>
<h4>When Can You Use PAC?</h4>
<ul>
  <li>Only ONE manufacturer/supplier makes this product (e.g., a specific spare part for a particular machine)</li>
  <li>The purchasing officer is satisfied it's needed and priced fairly</li>
</ul>
<h4>The Certificate is Personal Responsibility</h4>
<p>The key words in the certificate are "<strong>I am personally satisfied</strong>" — this places accountability on the officer signing it. If it's later found that alternatives were available, the officer is liable for irregular procurement.</p>
<h4>What PAC is NOT</h4>
<p>PAC cannot be used just because you prefer a particular brand. The <strong>absence of genuine competition</strong> must be established, not just preference.</p>`,
        practical_example: `<p><strong>Scenario:</strong> A GPO needs to procure a specific software module that is compatible only with their existing CBS (Core Banking Solution) system, manufactured by a single vendor. The postmaster wants to buy it directly.</p>
<p><strong>Correct Procedure:</strong></p>
<ol>
  <li>Obtain a certificate from the technical officer confirming the software is proprietary and no alternatives exist.</li>
  <li>The competent purchase authority records the <strong>PAC</strong> as per Rule 166 GFR 2017.</li>
  <li>Direct procurement from the vendor is made after satisfying about the price being reasonable (get a price quotation from vendor and compare with market if possible).</li>
  <li>The PAC is filed with the purchase order — available for audit inspection.</li>
</ol>
<p><strong>Wrong approach:</strong> Saying "we prefer this vendor" is NOT sufficient for PAC. There must be genuine technical necessity for single-source procurement.</p>`,
        exam_insight: `<p><strong>Key Facts for GFR Questions:</strong></p>
<ul>
  <li>GFR 2017 replaced: <strong>GFR 2005</strong> (effective 7 March 2017)</li>
  <li>PAC governed by: <strong>Rule 166, GFR 2017</strong></li>
  <li>When PAC is used: <strong>Proprietary/single-source items only</strong></li>
  <li>Tenders required: <strong>Not required</strong> when PAC is recorded</li>
  <li>Responsibility: The officer who signs PAC takes <strong>personal responsibility</strong></li>
  <li>Certificate text keywords: <strong>"I am personally satisfied"</strong></li>
</ul>
<p><strong>Frequent Exam Question:</strong> "In which of the following situations can goods be procured without tendering under GFR 2017?" — Options include urgent purchase, proprietary article, petty purchase (up to ₹25,000). All can qualify but PAC specifically covers proprietary articles under Rule 166.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 10. POSB CBS MANUAL — INTEREST CALCULATION
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Savings Account — Interest & Withdrawal Rules",
        rule_number: "Rule 6 & 7",
        act_name: "Post Office Savings Bank General Rules, 2018 (GSPR 2018)",
        category: "Rule",
        effective_date: new Date("2018-12-12"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>Rule 6 — Rate of Interest on Savings Account:</strong></p>
<p>Interest at the rate notified by the Central Government from time to time shall be payable on the balance in the savings account. Currently, interest is paid at <strong>4% per annum</strong>.</p>
<p>Interest shall be calculated on the <strong>minimum balance</strong> between the <strong>10th day and the last day</strong> of each calendar month and credited to the account at the end of each financial year (31 March).</p>
<p><strong>Rule 7 — Minimum Balance:</strong></p>
<ul>
  <li>Minimum balance required to maintain a savings account: <strong>₹500</strong> (for accounts without cheque facility).</li>
  <li>For accounts with cheque facility: <strong>₹500</strong>.</li>
  <li>If balance falls below ₹500 and the account is not operated for <strong>3 consecutive years</strong>, the account becomes a <strong>silent account</strong>.</li>
  <li>An account maintenance fee of <strong>₹100 per year</strong> is deducted from silent accounts until balance is exhausted.</li>
</ul>
<p><strong>Maximum Balance (Rule 8):</strong></p>
<ul>
  <li>Individual Account: <strong>No maximum limit</strong> (w.e.f. notification).</li>
  <li>Joint Account: No maximum limit.</li>
</ul>`,
        guru_explanation: `<p>The POSB Savings Account is the most basic and widely used post office financial product. Here are the exam-critical rules:</p>
<h4>Interest Calculation — The 10th Day Rule</h4>
<p>Interest is calculated on the <strong>minimum balance between the 10th and last day</strong> of the month. This is crucial:</p>
<ul>
  <li>If you deposit money <strong>after the 10th</strong> of a month, that deposit does NOT earn interest for that month.</li>
  <li>If you withdraw money <strong>before the 10th</strong>, the reduced balance is taken for calculation.</li>
  <li><strong>Best practice for depositors:</strong> Deposit before the 10th; withdraw after the 10th.</li>
</ul>
<h4>Silent Account</h4>
<p>No transactions for 3 years + balance below ₹500 = <strong>Silent Account</strong>. A ₹100/year maintenance fee is charged until the money runs out. To revive: submit a revival application with identity proof.</p>
<h4>Current Interest Rate</h4>
<p>POSB Savings Account: <strong>4% per annum</strong>. Interest is credited <strong>annually on 31 March</strong>.</p>`,
        practical_example: `<p><strong>Scenario:</strong> Ramesh has ₹10,000 in his POSB account on 1 April. He deposits ₹5,000 on 15 April and withdraws ₹2,000 on 5 May. What is the minimum balance for April and May?</p>
<ul>
  <li><strong>April:</strong> Balance from 1st to 14th = ₹10,000. He deposits ₹5,000 on 15th — but interest for April is based on minimum between 10th and 30th. Between 10th–30th, the balance was ₹10,000 (deposit came on 15th). → Minimum = <strong>₹10,000</strong></li>
  <li><strong>May:</strong> He withdrew ₹2,000 on 5th May. Between 10th–31st May, balance = ₹10,000 + ₹5,000 – ₹2,000 = ₹13,000. → Minimum = <strong>₹13,000</strong></li>
</ul>
<p><strong>Moral:</strong> The ₹5,000 deposit didn't help in April (deposited after 10th). The ₹2,000 withdrawal on 5th May didn't hurt (withdrawn before 10th, so doesn't affect May's minimum).</p>`,
        exam_insight: `<p><strong>Must-Know Numbers for the Exam:</strong></p>
<ul>
  <li>POSB Savings interest rate: <strong>4% per annum</strong></li>
  <li>Interest calculation: minimum balance between <strong>10th and last day</strong> of month</li>
  <li>Interest credited: <strong>31st March</strong> every year</li>
  <li>Minimum balance: <strong>₹500</strong></li>
  <li>Maximum balance: <strong>No limit</strong></li>
  <li>Silent account triggered: <strong>3 years no transaction + below ₹500</strong></li>
  <li>Silent account maintenance fee: <strong>₹100 per year</strong></li>
  <li>GSPR 2018 replaced: <strong>POSB General Rules, 1981</strong></li>
</ul>
<p><strong>Trick Question:</strong> "Interest on POSB Savings Account is calculated daily" — <strong>FALSE</strong>. It is calculated on monthly minimum balance (between 10th and last day).</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 11. GDS CONDUCT RULES 2020 — TERMINATION AND MISCONDUCT
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "GDS Conduct & Disciplinary Rules — Misconduct and Action",
        rule_number: "Rule 5 & 6",
        act_name: "GDS (Conduct and Engagement) Rules, 2020",
        category: "Rule",
        effective_date: new Date("2020-01-01"),
        exam_tags: ["LDCE IP"],
        official_text: `<p><strong>Rule 5 — Misconduct:</strong></p>
<p>A Gramin Dak Sevak shall be liable to termination of engagement or imposition of financial penalty for misconduct. Misconduct includes:</p>
<ul>
  <li>(i) wilful insubordination or disobedience, whether alone or in combination with others, to any lawful and reasonable order of a superior;</li>
  <li>(ii) theft, fraud or dishonesty in connection with the employer's business or property;</li>
  <li>(iii) taking or giving of bribes;</li>
  <li>(iv) habitual absence without leave or absence without leave for more than <strong>8 consecutive days</strong>;</li>
  <li>(v) habitual late attendance;</li>
  <li>(vi) wilful damage or loss of department's goods;</li>
  <li>(vii) conviction by any court of law.</li>
</ul>
<p><strong>Rule 6 — Penalties:</strong></p>
<p>The following penalties may be imposed on a GDS for misconduct:</p>
<ol>
  <li>Warning;</li>
  <li>Censure;</li>
  <li>Recovery of loss caused;</li>
  <li>Reduction in TRCA (Time Related Continuity Allowance) for a period not exceeding 3 years;</li>
  <li>Termination of engagement.</li>
</ol>`,
        guru_explanation: `<p>GDS (Gramin Dak Sevak) are not regular government servants — they are engaged on a contractual basis. But they still have a conduct framework. Here's what you need to know:</p>
<h4>GDS ≠ Regular Employee — Key Differences</h4>
<ul>
  <li>GDS penalties are <strong>simpler</strong> (5 vs 9 under CCS CCA Rules)</li>
  <li>The most severe penalty is <strong>"Termination of Engagement"</strong> (not Dismissal)</li>
  <li>No formal inquiry is required for minor penalties — only for Termination (similar to major penalty)</li>
</ul>
<h4>The 8-Day Rule</h4>
<p>Absence without leave for more than <strong>8 consecutive days</strong> is automatic misconduct. This is a bright-line rule — even if there's a genuine reason, the GDS must apply for leave. Just staying absent is not acceptable.</p>
<h4>The Penalty Sequence</h4>
<p>Think of GDS penalties as a ladder: Warning → Censure → Recovery → TRCA reduction → Termination. Penalties are proportionate to the severity of misconduct.</p>`,
        practical_example: `<p><strong>Scenario:</strong> Sunita, a GDS BPM at a Branch Post Office, was absent without any leave application for 10 consecutive days. The Postmaster did not hear from her. What action can be taken?</p>
<p><strong>Analysis:</strong></p>
<ul>
  <li>Absent for 10 days > 8 days without leave = <strong>Misconduct under Rule 5(iv)</strong></li>
  <li>A show-cause notice is issued to Sunita asking her explanation.</li>
  <li>If no satisfactory reply, the competent authority may impose penalty.</li>
  <li>Given the severity (10 days absence), <strong>Termination of Engagement</strong> is possible, but a reasonable opportunity must be given to explain.</li>
  <li>If she provides a valid reason (hospitalisation, family emergency with proof), the authority may impose a lesser penalty like <strong>Censure</strong> or Warning.</li>
</ul>`,
        exam_insight: `<p><strong>Key Facts for GDS-related MCQs:</strong></p>
<ul>
  <li>GDS Rules governing conduct: <strong>GDS (Conduct and Engagement) Rules, 2020</strong></li>
  <li>Absence triggering misconduct: more than <strong>8 consecutive days</strong> without leave</li>
  <li>Total penalties available for GDS: <strong>5</strong> (vs 9 for regular employees)</li>
  <li>Highest penalty for GDS: <strong>Termination of Engagement</strong> (NOT Dismissal)</li>
  <li>GDS penalty for TRCA reduction: max <strong>3 years</strong></li>
  <li>GDS are NOT regular government servants — they are <strong>engaged</strong> not appointed</li>
</ul>
<p><strong>Trick Question:</strong> "The maximum penalty that can be imposed on a GDS is Dismissal from Service" — <strong>FALSE</strong>. It's Termination of Engagement, which is different from Dismissal.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 12. PREVENTION OF CORRUPTION ACT, 1988
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Criminal Misconduct by a Public Servant — Section 13",
        rule_number: "Section 13",
        act_name: "Prevention of Corruption Act, 1988",
        category: "Section",
        effective_date: new Date("1988-09-09"),
        exam_tags: ["PS Group B"],
        official_text: `<p><strong>Section 13 — Criminal Misconduct by a Public Servant:</strong></p>
<p>(1) A public servant is said to commit the offence of criminal misconduct if:</p>
<ul>
  <li><strong>(a)</strong> he dishonestly or fraudulently misappropriates or otherwise converts for his own use any property entrusted to him or under his control as a public servant;</li>
  <li><strong>(b)</strong> he intentionally enriches himself illicitly during the period of his office;</li>
  <li><strong>(c)</strong> [Omitted by Amendment Act, 2018]</li>
  <li><strong>(d)</strong> [Omitted by Amendment Act, 2018]</li>
  <li><strong>(e)</strong> he or any person on his behalf is in possession of pecuniary resources or property disproportionate to his known sources of income at any point of time during or after the period of his office.</li>
</ul>
<p>(2) Any public servant who commits criminal misconduct shall be punishable with imprisonment for a term which shall be <strong>not less than 4 years</strong> and may extend to <strong>7 years</strong>, and shall also be liable to fine.</p>`,
        guru_explanation: `<p>The Prevention of Corruption Act (PC Act) 1988 is the backbone of anti-corruption law in India. The key provision for the exam is <strong>Section 13 — Criminal Misconduct</strong>.</p>
<h4>Two Main Offences Under Section 13</h4>
<ol>
  <li><strong>Misappropriation [13(1)(a)]:</strong> Using government property/money for personal benefit. Example: a postmaster pocketing postal receipts.</li>
  <li><strong>Disproportionate Assets [13(1)(e)]:</strong> Having property that cannot be explained from known income. This is the most commonly used provision against corrupt officers.</li>
</ol>
<h4>2018 Amendment — Important!</h4>
<p>Sections 13(1)(c) and (d) were removed by the <strong>Prevention of Corruption (Amendment) Act, 2018</strong>. The old "presumption of corruption" provisions were deleted. Now the prosecution must prove corrupt intent more directly.</p>
<h4>Punishment</h4>
<p>Minimum: <strong>4 years</strong> | Maximum: <strong>7 years</strong> + Fine. There is no option for less than 4 years under Section 13.</p>`,
        practical_example: `<p><strong>Scenario:</strong> A Head Postmaster is found to have assets worth ₹2.5 crore (land, cash, gold). His total salary income over 20 years is about ₹60 lakhs. No inheritance or gift can explain the gap.</p>
<p><strong>Legal Analysis:</strong></p>
<ul>
  <li>Assets (₹2.5 crore) are grossly disproportionate to known income (₹60 lakh).</li>
  <li>This attracts <strong>Section 13(1)(e)</strong> — Disproportionate Assets.</li>
  <li>The burden of proof then shifts to the officer to explain the assets.</li>
  <li>If he fails to explain, he is convicted under Section 13(2) — minimum <strong>4 years</strong> imprisonment.</li>
</ul>
<p>Note: The CBI/vigilance must first establish that assets are indeed disproportionate. The accused then explains. This is a reverse-burden provision.</p>`,
        exam_insight: `<p><strong>Must-Know for Exam:</strong></p>
<ul>
  <li>PC Act, 1988 came into force: <strong>9 September 1988</strong></li>
  <li>Section 13 covers: <strong>Criminal Misconduct by Public Servant</strong></li>
  <li>Punishment under Sec 13: min <strong>4 years</strong>, max <strong>7 years</strong> + Fine</li>
  <li>Disproportionate assets provision: <strong>Section 13(1)(e)</strong></li>
  <li>Sections 13(1)(c) & (d) removed by: <strong>PC Amendment Act, 2018</strong></li>
  <li>Section 7 covers: <strong>Accepting gratification other than legal remuneration</strong> (bribery)</li>
  <li>Section 7 punishment: <strong>3 to 7 years</strong></li>
</ul>
<p><strong>Frequently Asked:</strong> "What is the minimum punishment under Section 13 of the PC Act, 1988?" — Answer: <strong>4 years</strong>. Don't confuse with Section 7 (bribery) which is min 3 years.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ORIGINAL 2 (preserved)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "GDS Leave Rules: Paid Leave",
        rule_number: "Rule 4",
        act_name: "GDS Conduct & Engagement Rules",
        category: "Rule",
        effective_date: new Date("2020-01-01"),
        exam_tags: ["GDS", "LDCE IP"],
        official_text: `<p><strong>Rule 4: Leave.</strong></p>
<p>(1) A Gramin Dak Sevak shall be entitled to such leave as may be determined by the Government from time to time.</p>
<p>(2) Paid leave shall be granted to a Gramin Dak Sevak at the rate of <strong>10 days for every half year of service</strong>.</p>`,
        guru_explanation: `<p>For every 6 months you work as a GDS, you earn <strong>10 days of paid leave</strong>. So in a full year, you get <strong>20 days</strong>. You can accumulate up to <strong>180 days</strong> in total.</p>
<p>Remember: If you don't use them, you can carry them forward — but once you hit 180, you won't earn more until you use some!</p>`,
        practical_example: `<p>If Ramesh joined as GDS on <strong>1 January 2024</strong>, by 30 June 2024, he will have <strong>10 days of paid leave</strong> credited to his account. If he takes 2 days leave in July, he will have <strong>8 days remaining</strong> plus the next 10 days added on 31 December 2024.</p>`,
        exam_insight: `<p><strong>Frequent LDCE IP question:</strong> "What is the maximum accumulation limit for GDS Paid Leave?" Answer: <strong>180 days</strong>.</p>
<p>Also note: There is <strong>no provision for Half Pay Leave</strong> for GDS.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },
    {
        title: "Section 4: Meaning of 'Post Office' under the 2023 Act",
        rule_number: "Section 4",
        act_name: "Post Office Act 2023",
        category: "Section",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>Section 4.</strong> The Central Government may, by notification, provide for the delivery of any service through the Post Office as it may deem fit. The 'Post Office' means the Department of Posts and includes any entity or person authorized by the Central Government to provide service through its network.</p>`,
        guru_explanation: `<p>This is a major change in the 2023 Act. The definition of Post Office is now <strong>much broader</strong>! It's no longer just a physical building but can be any 'entity or person' authorised by the Ministry. This opens the door for private partnerships and digital-only post offices.</p>`,
        practical_example: `<p>Imagine a <strong>CSC (Common Service Center)</strong> in a village being authorized to accept Speed Post parcels. Under Section 4, that CSC effectively becomes a 'Post Office' for that service.</p>`,
        exam_insight: `<p>Watch out for the date! The Post Office Act 2023 came into force on <strong>16th December 2024</strong>. This is a highly probable MCQ for all upcoming postal exams.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    }
];

async function seed() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const db = client.db();
        const collection = db.collection('daksutras');

        console.log(`Inserting ${entries.length} Dak Sutra entries...`);
        const result = await collection.insertMany(entries);
        console.log(`✓ Seeded ${result.insertedCount} entries successfully!`);
        console.log("\n📚 Entries created:");
        entries.forEach((e, i) => console.log(`  ${i + 1}. [${e.category}] ${e.title}`));

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

seed();
