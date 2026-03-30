
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
    // 1. REGISTRATION OF POSTAL ARTICLES — POST OFFICE GUIDE PART I
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Registration of Postal Articles — Rules & Procedure",
        rule_number: "Rule 60–78",
        act_name: "Post Office Guide Part I",
        category: "Rule",
        effective_date: new Date("2024-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>Registration: Definition & Eligibility</strong></p>
<p>Registration is a special service by which a postal article is given an <strong>individual identity number</strong> and is processed with extra care and accountability at every stage of transit. It also provides for delivery against acknowledgment and compensation in case of loss.</p>
<h4>Articles That Can Be Registered</h4>
<ul>
  <li>Letters, book packets, patterns and samples, and parcels</li>
  <li>Newspapers (if sent separately, not under registered newspaper scheme)</li>
  <li>Any other article admissible by the Post Office</li>
</ul>
<h4>Weight & Size Limits</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Article Type</th><th style="border:1px solid #ccc;padding:6px">Maximum Weight</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Registered Letter</td><td style="border:1px solid #ccc;padding:6px">2 kg</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Registered Book Packet</td><td style="border:1px solid #ccc;padding:6px">5 kg</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Registered Parcel</td><td style="border:1px solid #ccc;padding:6px">35 kg (domestic)</td></tr>
</table>
<h4>Registration Fee</h4>
<p>A registration fee is charged in addition to the normal postage. The fee varies by weight and article type, as notified by the Department from time to time.</p>
<h4>Delivery Procedure</h4>
<p>A registered article is delivered to the <strong>addressee personally</strong> against a signature (acknowledgment). If the addressee is not available, a <strong>slip (notice)</strong> is left for re-delivery or collection from the post office. After two attempts, the article is returned to sender if unclaimed within <strong>30 days</strong>.</p>
<h4>Compensation for Loss</h4>
<p>Compensation for loss of a registered article (not insured) is payable as follows:</p>
<ul>
  <li>Registered letter/packet: up to <strong>₹100</strong></li>
  <li>Registered parcel: up to <strong>₹100</strong></li>
  <li>For higher compensation, the article must be <strong>insured</strong> in addition to being registered.</li>
</ul>`,
        guru_explanation: `<p>Registration is one of the oldest and most important value-added postal services. Here's how to think about it clearly for the exam:</p>
<h4>Registration ≠ Insurance</h4>
<p>This is the <strong>most common confusion</strong> in the exam. Registration gives your article an <strong>identity and accountability</strong> — it is tracked, signed for, and you get an acknowledgment card. But if the article is <strong>lost</strong>, you only get up to ₹100 as compensation.</p>
<p>Insurance gives <strong>monetary protection</strong> — the article is compensated at its declared value (up to the insured amount) if lost or damaged.</p>
<p>To get both: <strong>Register AND Insure</strong> the article.</p>
<h4>The Acknowledgment Card (AD Card)</h4>
<p>When you want proof that the addressee received the article, you attach an <strong>Acknowledgment Due (AD) card</strong> at the time of booking. After delivery, the postman gets it signed by the addressee and it is mailed back to you. This is your legal proof of delivery — often used in court cases, legal notices, etc.</p>
<h4>What Happens If the Addressee Is Absent?</h4>
<ol>
  <li>Postman leaves a <strong>notice/slip</strong> — article not delivered.</li>
  <li>A second delivery attempt is made.</li>
  <li>If still unclaimed, article is held at the post office for <strong>30 days</strong>.</li>
  <li>After 30 days, returned to sender (if return address is available).</li>
</ol>
<h4>Registration Number Format</h4>
<p>Every registered article gets a unique number like <strong>RL123456789IN</strong> (for registered letter from India). This can be tracked online on the DoP track & trace portal.</p>`,
        practical_example: `<p><strong>Scenario 1 — The Right Choice:</strong> A lawyer wants to send a legal notice to a client. The notice must reach the client with proof of delivery. What service should he use?</p>
<p><strong>Answer:</strong> <strong>Registered Post with AD (Acknowledgment Due)</strong>. The signed AD card returned to the lawyer is admissible as evidence in court that the notice was received.</p>
<p><strong>Scenario 2 — Registration + Insurance:</strong> A jeweller wants to send gold ornaments worth ₹50,000 to a customer in another city. He registers the parcel. If it's lost, what does he get?</p>
<p><strong>Answer:</strong> Only <strong>₹100</strong> (maximum compensation for registered parcel without insurance). He should have also <strong>insured</strong> it for ₹50,000 to get full compensation.</p>
<p><strong>Scenario 3 — Absent Addressee:</strong> A registered article arrives for Ram but he is in hospital. The postman cannot deliver. What happens?</p>
<p><strong>Answer:</strong> Slip is left → second attempt made → if unclaimed, article held at post office for <strong>30 days</strong> → returned to sender after 30 days.</p>`,
        exam_insight: `<p><strong>Key Numbers & Facts to Memorize:</strong></p>
<ul>
  <li>Compensation for loss of registered article (uninsured): <strong>₹100</strong></li>
  <li>Registered parcel max weight (domestic): <strong>35 kg</strong></li>
  <li>Registered letter max weight: <strong>2 kg</strong></li>
  <li>Unclaimed registered articles held for: <strong>30 days</strong> before return</li>
  <li>AD card = <strong>Acknowledgment Due</strong> card — proof of delivery</li>
  <li>Registration prefix in tracking number: <strong>RL</strong> (Registered Letter), <strong>RB</strong> (Registered Book), <strong>RP</strong> (Registered Parcel)</li>
</ul>
<p><strong>Classic Trap MCQ:</strong> "Registration provides full compensation for the value of articles lost" — <strong>FALSE</strong>. Registration only provides up to ₹100. For full value compensation, the article must also be <strong>insured</strong>.</p>
<p><strong>Another Trap:</strong> "Which of these services provides proof of delivery? (a) Speed Post (b) Registered Post AD (c) Ordinary Post (d) Book Packet." Answer: <strong>(b) Registered Post with AD</strong>.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 2. SPEED POST SERVICE — POST OFFICE GUIDE PART II
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Speed Post Service — Rules, Rates & Compensation",
        rule_number: "Rule 1–18",
        act_name: "Post Office Guide Part II",
        category: "Rule",
        effective_date: new Date("1986-08-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>Speed Post — Introduction</strong></p>
<p>Speed Post (Express Parcel Post) was introduced in India on <strong>1 August 1986</strong>. It is a guaranteed time-bound delivery service operating under the Department of Posts.</p>
<h4>Weight & Size Limits</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Parameter</th><th style="border:1px solid #ccc;padding:6px">Limit</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Minimum weight</td><td style="border:1px solid #ccc;padding:6px">No minimum</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Maximum weight (domestic)</td><td style="border:1px solid #ccc;padding:6px">35 kg</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Maximum length</td><td style="border:1px solid #ccc;padding:6px">1.4 m</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Max girth + length</td><td style="border:1px solid #ccc;padding:6px">3 m</td></tr>
</table>
<h4>Delivery Standards</h4>
<ul>
  <li>Metro to Metro: <strong>Next Day Delivery (D+1)</strong></li>
  <li>State capitals: <strong>D+1 or D+2</strong></li>
  <li>District HQs: <strong>D+2 or D+3</strong></li>
  <li>Other places: as per specific norms</li>
</ul>
<h4>Compensation for Late Delivery or Loss</h4>
<ul>
  <li><strong>Late delivery:</strong> Refund of Speed Post charges (no further compensation)</li>
  <li><strong>Loss of article (up to 50g):</strong> ₹1,000 or the charges paid, whichever is more</li>
  <li><strong>Loss of article (above 50g):</strong> ₹1,000 + ₹10 per 50g (beyond the first 50g), subject to a maximum of <strong>₹5,000</strong></li>
  <li>For higher compensation: article must be <strong>additionally insured</strong></li>
</ul>
<h4>Non-Admissible Articles</h4>
<p>Articles prohibited by the Post Office Act and dangerous goods such as hazardous materials, live animals (certain), radioactive material are not admissible under Speed Post.</p>`,
        guru_explanation: `<p>Speed Post is India Post's premium domestic and international delivery service. For the exam, understand these five pillars:</p>
<h4>1. History — The Date Matters</h4>
<p>Speed Post was launched on <strong>1 August 1986</strong>. This is a very frequently asked MCQ — "Speed Post was introduced in India in the year ___." Answer: <strong>1986</strong>.</p>
<h4>2. It's Registered by Default</h4>
<p>Every Speed Post article is treated as a <strong>registered article</strong> — it gets a unique tracking number, is processed with priority, and requires a signature on delivery. You don't pay a separate registration fee.</p>
<h4>3. Compensation is Capped</h4>
<p>Maximum automatic compensation for loss: <strong>₹5,000</strong>. Beyond this, the sender must insure the article separately. For court notices, legal documents, etc., the value is usually not monetary — so ₹5,000 cap is rarely a problem.</p>
<h4>4. Late Delivery Refund</h4>
<p>If Speed Post is delivered late (beyond the published delivery standard), the <strong>Speed Post charges are refunded</strong>. But the basic postage (stamp charge) is not refunded. No other damage/compensation is payable for delay.</p>
<h4>5. Tracking is Mandatory</h4>
<p>All Speed Post articles are trackable via the India Post website/app using the 13-digit consignment number (format: <strong>EW123456789IN</strong>).</p>`,
        practical_example: `<p><strong>Scenario 1 — Compensation Calculation:</strong> Meena sends a Speed Post parcel of 500g. It is lost in transit. What is the compensation?</p>
<p><strong>Calculation:</strong></p>
<ul>
  <li>First 50g: ₹1,000</li>
  <li>Remaining 450g = 9 × 50g = 9 × ₹10 = ₹90</li>
  <li>Total = ₹1,000 + ₹90 = <strong>₹1,090</strong></li>
  <li>This is within the ₹5,000 cap, so full ₹1,090 is payable.</li>
</ul>
<p><strong>Scenario 2 — Late Delivery Claim:</strong> Raj sends an important tender document via Speed Post from Delhi to Chennai (standard: D+1). It arrives on Day 3 — two days late. He demands compensation for business loss.</p>
<p><strong>Answer:</strong> Under Speed Post rules, only the <strong>Speed Post charges are refunded</strong> for late delivery. Raj cannot claim business loss or consequential damages. He should have used courier or other means for critical time-sensitive documents.</p>`,
        exam_insight: `<p><strong>Must-Know Facts for the Exam:</strong></p>
<ul>
  <li>Speed Post launched: <strong>1 August 1986</strong></li>
  <li>Max weight (domestic): <strong>35 kg</strong></li>
  <li>Metro-to-Metro delivery standard: <strong>Next day (D+1)</strong></li>
  <li>Loss compensation (up to 50g): <strong>₹1,000</strong></li>
  <li>Maximum loss compensation: <strong>₹5,000</strong></li>
  <li>Late delivery compensation: <strong>Refund of Speed Post charges only</strong></li>
  <li>Tracking number format: <strong>EW — IN</strong> (13 digits)</li>
  <li>Speed Post articles are automatically <strong>registered</strong></li>
</ul>
<p><strong>Common MCQ Pattern:</strong> "Which of the following is NOT a feature of Speed Post?" — Options include: guaranteed delivery time, compensation for loss, proof of delivery, and priority air transport. The trick option might be "full value compensation" — which is false (max ₹5,000 without insurance).</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. MONEY ORDER — RULES, LIMITS & TYPES
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Money Order — Types, Limits & Procedure",
        rule_number: "Regulation 145–156",
        act_name: "Post Office Regulations, 2024",
        category: "Rule",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>Money Order: Definition</strong></p>
<p>Money order (MO) shall be an order issued by the Post Office for the payment of a sum of money to the person in whose name the money order is sent, by the remitter.</p>
<h4>Categories of Money Orders</h4>
<p>As per Regulation 147, Money Orders are booked under the following categories:</p>
<ol>
  <li><strong>Retail Money Order:</strong> Money is remitted from a person to another person within the country.</li>
  <li><strong>Bulk Money Order:</strong> Where money is remitted by one person to many persons, or from many persons to one person.</li>
  <li><strong>Service Money Order:</strong> For departmental or official purposes.</li>
</ol>
<h4>Limits (Regulation 145)</h4>
<ul>
  <li>Maximum amount for a <strong>single MO</strong>: <strong>₹10,000</strong> (excluding fraction of a rupee).</li>
  <li>Maximum amount remitted through retail MO to a person in a month: <strong>₹25,000</strong>.</li>
</ul>
<h4>Commission</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Amount</th><th style="border:1px solid #ccc;padding:6px">Commission</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">For every ₹20 or part thereof</td><td style="border:1px solid #ccc;padding:6px">₹1</td></tr>
</table>
<p><em>Exemption:</em> Remittances to PM's Relief Fund, PM CARES Fund, or Chief Minister's Relief Fund are transmitted free of charge.</p>
<h4>Period of Currency & Void MO</h4>
<p>The currency period of the money order expires at the <strong>end of the last day of the second month</strong> following the month of issue. If it remains unpaid at the end of this period, it is treated as a <strong>void money order</strong>. The amount of a money order unpaid beyond <strong>three years</strong> from the date of booking is forfeited to the Government.</p>`,
        guru_explanation: `<p>The Post Office Regulations, 2024 brought a massive overhaul to the Money Order service. Forget the old rules — here is what you need to know now:</p>
<h4>1. The Limits Have Changed</h4>
<p>Earlier, the limit for a single MO was ₹5,000. Now, under Regulation 145, the maximum amount for a single MO is <strong>₹10,000</strong>. Additionally, there is a new cap: you cannot remit more than <strong>₹25,000</strong> to a single person in a month via retail money orders.</p>
<h4>2. Only 3 Categories Now</h4>
<p>The old classifications (Ordinary MO, Instant MO/iMO, Mobile MO) are gone from the core regulations. They are now officially categorized simply as <strong>Retail, Bulk, and Service</strong> money orders.</p>
<h4>3. Shorter Currency Period</h4>
<p>An MO now becomes "void" at the end of the <strong>second month</strong> following the month of its issue. However, the hard deadline for total forfeiture remains <strong>3 years</strong> from the date of booking — after which the money goes to the Government.</p>
<h4>4. Flat Commission Rate</h4>
<p>The complicated old slabs are gone. The commission is simply <strong>₹1 for every ₹20</strong> (or fraction thereof). That equates to a flat 5% commission rate across the board.</p>`,
        practical_example: `<p><strong>Scenario 1 — Commission Calculation (2024 Rules):</strong> Arun sends a Retail Money Order of ₹850 to his mother. What commission does he pay?</p>
<p><strong>Calculation:</strong></p>
<ul>
  <li>Commission = ₹1 for every ₹20 or part thereof</li>
  <li>₹850 ÷ ₹20 = 42.5 → rounds up to 43 parts</li>
  <li>Commission = 43 × ₹1 = <strong>₹43</strong></li>
  <li>Total paid by Arun = ₹850 + ₹43 = <strong>₹893</strong></li>
</ul>
<p><strong>Scenario 2 — Monthly Limit:</strong> An employer tries to send three retail money orders of ₹10,000 each to the same employee within the same month.</p>
<p><strong>Answer:</strong> The first two MOs (₹20,000 total) will be booked. The third MO will be rejected or limited to ₹5,000, because the maximum retail MO limit to a single person in a month is strictly <strong>₹25,000</strong>.</p>`,
        exam_insight: `<p><strong>Critical New Numbers for the Exam (Post Office Regulations 2024):</strong></p>
<ul>
  <li>Single MO maximum limit: <strong>₹10,000</strong></li>
  <li>Monthly limit to one person (retail MO): <strong>₹25,000</strong></li>
  <li>Commission rate: <strong>₹1 for every ₹20</strong> or fraction thereof</li>
  <li>MO becomes void: End of <strong>second month</strong> following the month of issue</li>
  <li>MO amount forfeited to Govt: After <strong>3 years</strong> from booking</li>
  <li>Official Categories: <strong>Retail, Bulk, Service</strong> MO</li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-bottom:10px">
  <strong>COMMON MISTAKE:</strong> "The maximum amount for a single Money Order is ₹5,000." — <strong>FALSE!</strong> It is now <strong>₹10,000</strong> under Regulation 145(2) of the 2024 Regulations. Ensure you use the updated limits in your exam!
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 4. NSC — NATIONAL SAVINGS CERTIFICATE
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "National Savings Certificate (NSC) — Rules & Features",
        rule_number: "NSC (VIII Issue) Rules, 2019",
        act_name: "National Savings Certificate (VIII Issue) Rules, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>National Savings Certificate (NSC VIII Issue) — Key Rules</strong></p>
<h4>Who Can Open</h4>
<ul>
  <li>Any adult individual (single or joint account, max 3 adults)</li>
  <li>A guardian on behalf of a minor / person of unsound mind</li>
  <li>A minor above 10 years in his/her own name</li>
  <li><strong>HUF, Trust, and companies CANNOT invest in NSC</strong></li>
</ul>
<h4>Deposit Limits</h4>
<ul>
  <li>Minimum: <strong>₹1,000</strong> (and in multiples of ₹100)</li>
  <li>Maximum: <strong>No limit</strong></li>
</ul>
<h4>Tenure</h4>
<p>NSC matures in <strong>5 years</strong> from the date of issue.</p>
<h4>Interest Rate & Compounding</h4>
<p>Interest is compounded <strong>annually</strong> but paid only at maturity. Current rate: <strong>7.7% per annum</strong> (as of Q1 FY 2024–25).</p>
<h4>Tax Benefits</h4>
<ul>
  <li>Investment qualifies for deduction under <strong>Section 80C</strong> of the Income Tax Act (up to ₹1.5 lakh).</li>
  <li>Accrued interest (years 1–4) is deemed reinvested — so it also qualifies for 80C deduction each year.</li>
  <li>Interest in the <strong>5th year (maturity year) is taxable</strong> as income from other sources.</li>
</ul>
<h4>Premature Closure</h4>
<p>Premature closure is generally <strong>not permitted</strong> except:</p>
<ul>
  <li>Death of the account holder</li>
  <li>Forfeiture by a pledgee who is a Gazetted Government Officer</li>
  <li>Court order</li>
</ul>
<h4>Pledge/Transfer</h4>
<p>NSC can be pledged as security for a loan. The certificate is transferred to the pledgee (bank, NBFC, etc.) by endorsement. It can also be transferred from one person to another (with conditions).</p>`,
        guru_explanation: `<p>NSC is the most popular small savings certificate and features prominently in postal exam papers. Let's break it down:</p>
<h4>NSC vs KVP — The Most Confused Pair</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">NSC</th><th style="border:1px solid #ccc;padding:6px">KVP (Kisan Vikas Patra)</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Maturity</td><td style="border:1px solid #ccc;padding:6px">5 years (fixed)</td><td style="border:1px solid #ccc;padding:6px">~115 months (doubles money)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Interest</td><td style="border:1px solid #ccc;padding:6px">7.7% compounded annually</td><td style="border:1px solid #ccc;padding:6px">7.5% compounded annually</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Tax Benefit</td><td style="border:1px solid #ccc;padding:6px">80C deduction available</td><td style="border:1px solid #ccc;padding:6px">No 80C deduction</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Premature Closure</td><td style="border:1px solid #ccc;padding:6px">Not normally allowed</td><td style="border:1px solid #ccc;padding:6px">After 2.5 years (lock-in)</td></tr>
</table>
<h4>The "Deemed Reinvestment" Tax Trick</h4>
<p>NSC interest for years 1 to 4 is <strong>not paid out</strong> — it is automatically reinvested. The Income Tax Act treats this as "deemed interest received and reinvested," so the accrued interest qualifies for 80C deduction too. In the 5th year, the entire interest is treated as income (taxable) since it's finally paid out.</p>
<h4>Who CANNOT Open NSC?</h4>
<p>HUF, Trusts, and Companies are <strong>not eligible</strong>. Only individuals and guardians of minors can invest. This is a frequently tested exclusion.</p>`,
        practical_example: `<p><strong>Scenario 1 — Maturity Value Calculation:</strong> Priya invests ₹10,000 in NSC at 7.7% per annum compounded annually for 5 years. What does she get at maturity?</p>
<p><strong>Calculation:</strong><br>
A = P × (1 + r)^n = 10,000 × (1.077)^5<br>
= 10,000 × 1.4499 ≈ <strong>₹14,499</strong></p>
<p><strong>Scenario 2 — Tax Benefit:</strong> Rajan invests ₹1,50,000 in NSC in FY 2024-25. He also invests ₹30,000 in LIC premium. What is his total 80C deduction?</p>
<p><strong>Answer:</strong> 80C limit is ₹1.5 lakh. He can claim ₹1.5 lakh total — so ₹1,20,000 from NSC and ₹30,000 from LIC = ₹1,50,000. He cannot exceed the ₹1.5 lakh cap under 80C.</p>`,
        exam_insight: `<p><strong>Must-Know for the Exam:</strong></p>
<ul>
  <li>NSC maturity: <strong>5 years</strong></li>
  <li>Interest rate: <strong>7.7% p.a.</strong> compounded annually (verify latest quarterly revision)</li>
  <li>Minimum deposit: <strong>₹1,000</strong></li>
  <li>Maximum deposit: <strong>No limit</strong></li>
  <li>Tax benefit: <strong>Section 80C</strong></li>
  <li>Premature closure: <strong>Not normally permitted</strong></li>
  <li>Who CANNOT invest: <strong>HUF, Trust, Companies</strong></li>
  <li>Interest compounding: <strong>Annually</strong></li>
  <li>Interest payout: <strong>At maturity only</strong></li>
</ul>
<p><strong>Trick Question:</strong> "NSC interest is paid monthly" — <strong>FALSE</strong>. It is compounded annually and paid only at maturity.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 5. PPF — PUBLIC PROVIDENT FUND
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Public Provident Fund (PPF) — Full Rules & Features",
        rule_number: "PPF Scheme, 2019",
        act_name: "Public Provident Fund Scheme, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>Public Provident Fund (PPF) Scheme, 2019 — Key Provisions</strong></p>
<h4>Who Can Open</h4>
<ul>
  <li>A resident individual (in his own name)</li>
  <li>On behalf of a minor of whom he is a guardian</li>
  <li><strong>NRI, HUF, Trust, and companies CANNOT open PPF</strong></li>
  <li>Only <strong>ONE account</strong> per individual (cannot open a second account)</li>
</ul>
<h4>Deposit Limits</h4>
<ul>
  <li>Minimum per year: <strong>₹500</strong> (if not deposited, account becomes discontinued)</li>
  <li>Maximum per year: <strong>₹1,50,000</strong></li>
  <li>Deposits can be made in <strong>lump sum or maximum 12 instalments</strong> per year</li>
</ul>
<h4>Tenure</h4>
<p>PPF has a maturity period of <strong>15 years</strong>. After maturity, it can be extended in <strong>blocks of 5 years</strong> indefinitely.</p>
<h4>Interest</h4>
<p>Interest is calculated on the <strong>minimum balance between the 5th day and the last day</strong> of each month. Current rate: <strong>7.1% per annum</strong>, compounded annually, credited on <strong>31 March</strong> each year.</p>
<h4>Loan Facility</h4>
<p>A loan against PPF can be taken from the <strong>3rd year to the 6th year</strong> of the account. Maximum loan: <strong>25% of balance at the end of 2nd preceding year</strong>. Loan must be repaid within 36 months.</p>
<h4>Partial Withdrawal</h4>
<p>Partial withdrawal is permitted from the <strong>7th year onwards</strong>. Maximum withdrawal: 50% of balance at end of 4th preceding year or end of preceding year, whichever is lower.</p>
<h4>Premature Closure</h4>
<p>Premature closure is permitted after 5 years only in specific cases:</p>
<ul>
  <li>Life-threatening illness of account holder or dependent family members</li>
  <li>Higher education of account holder or minor child</li>
  <li>Change in residency status (to NRI)</li>
  <li>On premature closure: interest reduced by <strong>1%</strong> as penalty</li>
</ul>`,
        guru_explanation: `<p>PPF is the gold standard of safe, tax-free long-term savings in India. Known for EEE (Exempt-Exempt-Exempt) tax status. Let's decode it:</p>
<h4>The EEE Tax Status — PPF's Biggest Advantage</h4>
<ul>
  <li><strong>E1 — Exempt at Investment:</strong> Deposit qualifies for 80C deduction (up to ₹1.5 lakh)</li>
  <li><strong>E2 — Exempt at Accumulation:</strong> Interest earned every year is fully tax-free</li>
  <li><strong>E3 — Exempt at Withdrawal:</strong> Maturity amount (principal + interest) is completely tax-free</li>
</ul>
<p>Compare: NSC is ETE (Exempt-Taxable-Exempt) — interest is taxable. PPF is better for long-term tax-free growth.</p>
<h4>The 5th Day Rule for Interest</h4>
<p>Interest is calculated on the minimum balance between the <strong>5th and last day</strong> of each month. <strong>Optimal deposit date: before the 5th of the month.</strong> If you deposit on 6th, that month's deposit earns no interest that month.</p>
<h4>The 15+5+5... Extension Feature</h4>
<p>After 15 years, you can extend PPF in <strong>5-year blocks</strong> with or without contribution:</p>
<ul>
  <li>With contribution: Continue depositing, earning interest, getting 80C benefit</li>
  <li>Without contribution: Account earns interest on existing balance, no 80C benefit</li>
</ul>
<h4>Loan vs Partial Withdrawal Timeline</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Facility</th><th style="border:1px solid #ccc;padding:6px">Available From</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Loan</td><td style="border:1px solid #ccc;padding:6px">3rd to 6th year</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Partial Withdrawal</td><td style="border:1px solid #ccc;padding:6px">7th year onwards</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Full Closure (normal)</td><td style="border:1px solid #ccc;padding:6px">After 15 years</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Premature Closure</td><td style="border:1px solid #ccc;padding:6px">After 5 years (special conditions)</td></tr>
</table>`,
        practical_example: `<p><strong>Scenario 1 — Interest Optimization:</strong> Sunita has a PPF account. She plans to deposit ₹1,50,000 this financial year. If she deposits on 4 April vs 6 April, what's the difference?</p>
<p><strong>Answer:</strong> Interest is calculated on balance between 5th and last day of month. Depositing by <strong>4 April</strong> means the ₹1,50,000 earns interest from April itself. Depositing on 6 April means the April month's minimum balance is the opening balance (without this deposit) — so she loses one month's interest on ₹1,50,000. At 7.1%, that's approximately <strong>₹887 lost</strong>.</p>
<p><strong>Scenario 2 — Loan Repayment:</strong> Ram took a PPF loan of ₹50,000 in the 4th year. He hasn't repaid it. Interest on the loan is charged at <strong>1% above PPF rate = 8.1%</strong>. He must repay within 36 months or the loan outstanding will be deducted from the balance at maturity.</p>`,
        exam_insight: `<p><strong>Critical Numbers for PPF MCQs:</strong></p>
<ul>
  <li>PPF Scheme notified under: <strong>PPF Scheme, 2019</strong></li>
  <li>Maturity period: <strong>15 years</strong></li>
  <li>Extension: <strong>5-year blocks</strong></li>
  <li>Interest rate: <strong>7.1% p.a.</strong> (compounded annually)</li>
  <li>Interest credited: <strong>31 March</strong> annually</li>
  <li>Minimum deposit per year: <strong>₹500</strong></li>
  <li>Maximum deposit per year: <strong>₹1,50,000</strong></li>
  <li>Max instalments per year: <strong>12</strong></li>
  <li>Loan available: <strong>3rd to 6th year</strong> (max 25% of 2nd preceding year's balance)</li>
  <li>Partial withdrawal: from <strong>7th year</strong></li>
  <li>Premature closure: after <strong>5 years</strong> (penalty: 1% interest reduction)</li>
  <li>Tax status: <strong>EEE</strong> (Exempt-Exempt-Exempt)</li>
  <li>Interest calculation: min balance between <strong>5th and last day</strong> of month</li>
</ul>
<p><strong>Trap Question:</strong> "A second PPF account can be opened if the first account has matured" — <strong>FALSE</strong>. Only one PPF account per individual is allowed (the existing account can be extended).</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 6. SUKANYA SAMRIDDHI ACCOUNT (SSA)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Sukanya Samriddhi Account — Complete Rules",
        rule_number: "Sukanya Samriddhi Account Rules, 2019",
        act_name: "Sukanya Samriddhi Account Rules, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>Sukanya Samriddhi Account (SSA) — Key Provisions</strong></p>
<h4>Who Can Open</h4>
<ul>
  <li>A natural or legal <strong>guardian</strong> can open an SSA account in the name of a <strong>girl child</strong></li>
  <li>Girl child must be <strong>below 10 years of age</strong> at the time of account opening</li>
  <li>Maximum <strong>2 accounts</strong> per family (one per girl child)</li>
  <li>Exception: If the 2nd birth produces twins/triplets (all girls), a 3rd account is allowed</li>
</ul>
<h4>Deposit Rules</h4>
<ul>
  <li>Minimum per year: <strong>₹250</strong></li>
  <li>Maximum per year: <strong>₹1,50,000</strong></li>
  <li>Deposits must be made for <strong>15 years</strong> from account opening</li>
  <li>After 15 years, no new deposits are required — the account continues to earn interest till maturity</li>
</ul>
<h4>Maturity</h4>
<p>The account matures <strong>21 years from the date of opening</strong> or on the <strong>date of marriage of the girl child after attaining 18 years</strong>, whichever is earlier.</p>
<h4>Partial Withdrawal</h4>
<p>Up to <strong>50% of the balance</strong> as at the end of the preceding financial year can be withdrawn after the girl child attains the age of <strong>18 years</strong> — for higher education or marriage purposes.</p>
<h4>Interest Rate</h4>
<p>Current rate: <strong>8.2% per annum</strong> (compounded annually), highest among all small savings schemes. Credited annually on <strong>31 March</strong>.</p>
<h4>Tax Status</h4>
<p>SSA is <strong>EEE</strong>: Deposits qualify for 80C deduction, interest is tax-free, and maturity amount is tax-free.</p>
<h4>Premature Closure</h4>
<ul>
  <li>Death of the girl child: full balance paid with interest</li>
  <li>Marriage of girl child after 18 years: account closed, full balance paid</li>
  <li>Financial hardship (after 5 years): premature closure permitted with conditions</li>
</ul>`,
        guru_explanation: `<p>Sukanya Samriddhi Yojana (SSY) was launched under <strong>Beti Bachao Beti Padhao</strong> initiative in <strong>January 2015</strong>. SSA is the account opened under this scheme through Post Offices and banks. Here's how to master it for the exam:</p>
<h4>The Key Ages to Remember</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Event</th><th style="border:1px solid #ccc;padding:6px">Girl's Age</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Account can be opened</td><td style="border:1px solid #ccc;padding:6px">Below 10 years</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Deposits required for</td><td style="border:1px solid #ccc;padding:6px">15 years from opening</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Partial withdrawal allowed</td><td style="border:1px solid #ccc;padding:6px">After 18 years</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Account matures</td><td style="border:1px solid #ccc;padding:6px">21 years from opening (or marriage after 18)</td></tr>
</table>
<h4>Why SSA Has Highest Interest?</h4>
<p>The government offers a premium rate because this scheme targets girl children's long-term financial security — a social policy objective. The 8.2% rate (Q1 FY 2024-25) is the highest among all Post Office savings schemes.</p>
<h4>The "Deposit for 15, Earn for 21" Structure</h4>
<p>You deposit for 15 years. From year 16 to 21, NO deposits are required but the account continues to earn interest on the accumulated balance. This 6-year silent growth period significantly boosts the maturity amount.</p>
<h4>Nomination</h4>
<p>Nomination facility is <strong>not available</strong> for SSA (since it is specifically for the girl child's benefit). The guardian manages the account until the girl turns 18.</p>`,
        practical_example: `<p><strong>Scenario — Opening and Maturity:</strong> Meena opens an SSA for her daughter Priya (age 5) on 1 April 2025. She deposits ₹1,50,000 every year.</p>
<ul>
  <li>Deposits made for: <strong>15 years</strong> (FY 2025-26 to FY 2039-40)</li>
  <li>Account matures: <strong>21 years from opening</strong> = 1 April 2046 (Priya will be 26)</li>
  <li>Or earlier if Priya marries <strong>after turning 18</strong> (i.e., after 2043)</li>
  <li>From FY 2040-41 to FY 2045-46: no deposits, but interest continues at 8.2%</li>
  <li>Approximate maturity value at ₹1.5L/year, 8.2% for 21 years: over <strong>₹69 lakhs</strong> (indicative)</li>
</ul>
<p><strong>Partial Withdrawal:</strong> In 2043 (Priya turns 18), Meena can withdraw up to 50% of the balance as of 31 March 2043 for Priya's college admission fees.</p>`,
        exam_insight: `<p><strong>Must-Know Facts for SSA MCQs:</strong></p>
<ul>
  <li>Scheme launched: <strong>January 2015</strong> (Beti Bachao Beti Padhao)</li>
  <li>Max age to open: <strong>Below 10 years</strong></li>
  <li>Max accounts per family: <strong>2</strong> (exception for twins/triplets)</li>
  <li>Minimum deposit: <strong>₹250/year</strong></li>
  <li>Maximum deposit: <strong>₹1,50,000/year</strong></li>
  <li>Interest rate: <strong>8.2% p.a.</strong> (highest among small savings)</li>
  <li>Maturity: <strong>21 years from opening</strong></li>
  <li>Partial withdrawal: after girl attains <strong>18 years</strong> (up to 50%)</li>
  <li>Tax status: <strong>EEE</strong></li>
  <li>Nomination: <strong>Not available</strong></li>
</ul>
<p><strong>Most Common Confusion:</strong> "Deposits are required for 21 years" — <strong>FALSE</strong>. Deposits are required only for <strong>15 years</strong>. The account runs for 21 years but no deposits are needed from year 16 onwards.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 7. INSURED ARTICLES — RULES & COMPENSATION
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Insured Articles — Rules, Limits & Compensation Procedure",
        rule_number: "Rule 109–130",
        act_name: "Post Office Guide Part I",
        category: "Rule",
        effective_date: new Date("2024-01-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>Insured Articles — Overview</strong></p>
<p>Any postal article (letter, parcel, etc.) containing articles of <strong>value</strong> may be insured against loss or damage in the postal system. Insurance is a declaration of value by the sender, and the Post Office undertakes to pay compensation equal to the insured value (subject to maximum limits) in case of loss or damage.</p>
<h4>Articles That Can Be Insured</h4>
<ul>
  <li>Letters and parcels containing currency, jewellery, valuables, documents, electronic items</li>
  <li>Articles must be properly packed to withstand transit</li>
</ul>
<h4>Maximum Insurable Value</h4>
<ul>
  <li>Domestic insured articles: up to <strong>₹1,00,000</strong> (₹1 lakh) per article</li>
  <li>Insured articles sent by Speed Post: same compensation rules as Speed Post (up to ₹5,000 without insurance; with insurance, up to declared value)</li>
</ul>
<h4>Insurance Fee</h4>
<p>Insurance fee is charged in addition to normal postage. The fee is calculated based on the declared insured value. (Exact slab rates are notified by the Department.)</p>
<h4>Compensation for Loss — Conditions</h4>
<ul>
  <li>Compensation is payable if the article is <strong>lost, rifled, or damaged</strong> in transit.</li>
  <li>The sender must establish the <strong>actual value</strong> of the loss — compensation cannot exceed the actual value OR the insured amount, whichever is <strong>lower</strong>.</li>
  <li>Compensation is not payable if the loss/damage is due to the <strong>inherent defect</strong> of the article or improper packing by the sender.</li>
  <li>Compensation is not payable if the loss occurred due to <strong>act of God</strong> (flood, earthquake, etc.) or enemy action.</li>
</ul>
<h4>Procedure for Claim</h4>
<ol>
  <li>Sender files complaint at booking post office.</li>
  <li>Inquiry is conducted by the Division.</li>
  <li>If confirmed lost/damaged, claim is processed.</li>
  <li>Amount sanctioned by competent authority and paid by Money Order/NEFT.</li>
</ol>`,
        guru_explanation: `<p>Insurance is the financial safety net for valuable postal articles. Here's how to think about it clearly:</p>
<h4>Registration vs Insurance — The Final Word</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">Registration</th><th style="border:1px solid #ccc;padding:6px">Insurance</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Purpose</td><td style="border:1px solid #ccc;padding:6px">Accountability &amp; tracking</td><td style="border:1px solid #ccc;padding:6px">Monetary protection</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Delivery</td><td style="border:1px solid #ccc;padding:6px">Against signature</td><td style="border:1px solid #ccc;padding:6px">Against signature</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Loss Compensation</td><td style="border:1px solid #ccc;padding:6px">Up to ₹100 only</td><td style="border:1px solid #ccc;padding:6px">Up to declared/insured value (max ₹1 lakh)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Extra Charge</td><td style="border:1px solid #ccc;padding:6px">Registration fee</td><td style="border:1px solid #ccc;padding:6px">Insurance fee (higher)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Best Use Case</td><td style="border:1px solid #ccc;padding:6px">Documents, legal notices</td><td style="border:1px solid #ccc;padding:6px">Jewellery, electronics, currency</td></tr>
</table>
<h4>The "Actual Value or Insured Value, Whichever is Lower" Rule</h4>
<p>This is very important: If you insure a watch for ₹50,000 but it actually costs ₹30,000, and it's lost — you get only <strong>₹30,000</strong> (actual value). You cannot profit from insurance. Conversely, if you insure for ₹30,000 but the watch costs ₹50,000 — you also get only ₹30,000 (insured value). So always insure for the <strong>full actual value</strong>.</p>
<h4>When is Compensation NOT Paid?</h4>
<ul>
  <li>Improper packing by sender (broken glassware in flimsy box)</li>
  <li>Inherent vice of the article (perishable goods rotting)</li>
  <li>Force majeure — natural disasters, enemy action</li>
  <li>If the article was declared at a different (lower) value at booking</li>
</ul>`,
        practical_example: `<p><strong>Scenario 1:</strong> Arjun sends gold jewellery worth ₹75,000 as an insured article, declaring value as ₹75,000. The parcel is lost. What compensation does he get?</p>
<p><strong>Answer:</strong> Compensation = lower of (actual value ₹75,000) and (insured value ₹75,000) = <strong>₹75,000</strong> — full compensation subject to inquiry.</p>
<p><strong>Scenario 2:</strong> Rita sends a laptop worth ₹80,000 but insures it for only ₹50,000 (to save on insurance fee). It's lost. What does she get?</p>
<p><strong>Answer:</strong> Compensation = lower of (actual ₹80,000) and (insured ₹50,000) = <strong>₹50,000</strong>. She loses ₹30,000 by under-insuring.</p>
<p><strong>Scenario 3:</strong> A sender packs crockery carelessly; the parcel arrives damaged. He claims insurance.</p>
<p><strong>Answer:</strong> Claim <strong>rejected</strong> — damage due to improper packing by sender. Insurance does not cover this.</p>`,
        exam_insight: `<p><strong>Key Numbers & Rules for the Exam:</strong></p>
<ul>
  <li>Maximum insurable value (domestic): <strong>₹1,00,000 (₹1 lakh)</strong></li>
  <li>Registered article (uninsured) loss compensation: <strong>₹100 only</strong></li>
  <li>Compensation rule: lower of <strong>actual value or insured value</strong></li>
  <li>Compensation NOT payable: improper packing, force majeure, inherent defect</li>
  <li>Insured articles require <strong>proper packing</strong> — Post Office may check/require re-packing</li>
</ul>
<p><strong>Exam Pattern Question:</strong> "A jeweller insures a parcel for ₹20,000 but the actual value is ₹45,000. If the parcel is lost, what compensation is payable?" — Answer: <strong>₹20,000</strong> (insured value, being lower).</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 8. CCS CONDUCT RULES — GIFTS (RULE 13)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Acceptance of Gifts by Government Servants — Rule 13",
        rule_number: "Rule 13",
        act_name: "CCS (Conduct) Rules, 1964",
        category: "Rule",
        effective_date: new Date("1964-11-30"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>Rule 13 — Gifts</strong></p>
<p>(1) Save as otherwise provided in this rule, no Government servant shall accept, or permit any member of his family or any other person acting on his behalf to accept, any gift.</p>
<p>(2) The restrictions on the acceptance of gifts shall not apply to:</p>
<ul>
  <li><strong>(a)</strong> gifts of <strong>purely ceremonial nature</strong> where refusal would be discourteous, provided the value does not exceed the limits below;</li>
  <li><strong>(b)</strong> gifts from close relatives on occasions like weddings, anniversaries — provided it is not disproportionate to the financial status of the giver.</li>
</ul>
<h4>Monetary Limits for Accepting Gifts</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Pay Level</th><th style="border:1px solid #ccc;padding:6px">Gift from Relatives</th><th style="border:1px solid #ccc;padding:6px">Gift from Others</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Level 1 to 10 (up to ₹67,700 basic)</td><td style="border:1px solid #ccc;padding:6px">₹25,000</td><td style="border:1px solid #ccc;padding:6px">₹5,000</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Level 11 and above</td><td style="border:1px solid #ccc;padding:6px">₹25,000</td><td style="border:1px solid #ccc;padding:6px">₹5,000</td></tr>
</table>
<p><em>Note: The limits were revised. The currently applicable limits as per DoPT orders are: gifts from relatives — up to ₹25,000; gifts from non-relatives — up to ₹5,000 for all categories.</em></p>
<p>(3) <strong>Any gift received in excess of the prescribed limits must be reported</strong> to the Government through proper channel.</p>
<p>(4) <strong>Gifts from foreign dignitaries:</strong> A Government servant may accept gifts from foreign dignitaries/governments, but must hand them over to the Government. He may be allowed to retain a gift (not exceeding ₹5,000 in value) by paying the difference to the Government treasury.</p>`,
        guru_explanation: `<p>Rule 13 is about <strong>integrity in action</strong>. The government is very strict about gifts because gifts can be a subtle form of bribery. Here's the complete picture:</p>
<h4>The Core Principle</h4>
<p>The rule says: <strong>No gifts</strong> — unless it's within the prescribed monetary limits AND it's from a relative OR it's a purely ceremonial gift where refusing would be rude.</p>
<h4>The Critical Limits (Most Tested)</h4>
<ul>
  <li>From <strong>relatives</strong> (wedding, anniversaries, etc.): up to <strong>₹25,000</strong></li>
  <li>From <strong>non-relatives</strong> (public, contractors, friends): up to <strong>₹5,000</strong></li>
  <li>If gift exceeds limit: <strong>MUST report to Government</strong></li>
</ul>
<h4>The Foreign Dignitary Gift Rule</h4>
<p>This is a frequently tested provision: If the President of a foreign country gifts you a gold pen worth ₹50,000:</p>
<ul>
  <li>You <strong>cannot keep it</strong> (value exceeds ₹5,000)</li>
  <li>You <strong>must hand it over to the Government</strong></li>
  <li>But you can pay ₹45,000 (₹50,000 – ₹5,000) to the treasury and <strong>keep it</strong></li>
</ul>
<h4>What Is a "Gift" Under This Rule?</h4>
<p>Any article of value — jewellery, money, property, hospitality (air tickets, hotel stays), vouchers, etc. The test is whether it creates an obligation or compromises impartiality.</p>`,
        practical_example: `<p><strong>Scenario 1 — Within Limits:</strong> A postmaster receives a box of sweets worth ₹200 from a customer on Diwali. He can accept it — it's a ceremonial gift within limits. No reporting needed.</p>
<p><strong>Scenario 2 — Exceeds Limit:</strong> A contractor from whom the Postal Division purchases envelopes gifts the Superintendent of Post Offices a wristwatch worth ₹8,000 during a festival. The SPO is tempted to accept.</p>
<p><strong>Correct Action:</strong> The SPO CANNOT accept. The gift is from a non-relative (contractor) and exceeds ₹5,000. If accepted, he must <strong>report it to the Government</strong>. Accepting and not reporting is a violation of Rule 13 and can lead to disciplinary action.</p>
<p><strong>Scenario 3 — Foreign Gift:</strong> An Inspector of Posts represents India at an international postal conference. The host country's Postmaster General gifts him a silver trophy worth ₹15,000.</p>
<p><strong>Action:</strong> He must hand over the trophy to the Government. To keep it personally, he pays ₹15,000 – ₹5,000 = <strong>₹10,000 to the treasury</strong>.</p>`,
        exam_insight: `<p><strong>Key Numbers and Rules — Memorise These:</strong></p>
<ul>
  <li>Gift from relatives — maximum allowed: <strong>₹25,000</strong></li>
  <li>Gift from non-relatives — maximum allowed: <strong>₹5,000</strong></li>
  <li>Gift exceeding limit: must be <strong>reported to Government</strong></li>
  <li>Foreign dignitary gifts: must be <strong>handed over to Government</strong></li>
  <li>To retain foreign gift: pay excess over <strong>₹5,000</strong> to treasury</li>
  <li>Gift rule governed by: <strong>CCS (Conduct) Rules, 1964, Rule 13</strong></li>
</ul>
<p><strong>Classic MCQ:</strong> "A government servant can accept a gift of ₹10,000 from a relative without any restriction" — <strong>FALSE</strong>. The limit from relatives is ₹25,000, so ₹10,000 is allowed. But: "A government servant can accept a gift of ₹8,000 from a public member/contractor without reporting" — <strong>FALSE</strong>. Non-relative limit is ₹5,000.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 9. APAR — ANNUAL PERFORMANCE APPRAISAL REPORT
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Annual Performance Appraisal Report (APAR) — Complete Guidelines",
        rule_number: "DoPT OM dated 14.05.2009",
        act_name: "APAR Guidelines (DoPT)",
        category: "Circular",
        effective_date: new Date("2009-05-14"),
        exam_tags: ["PS Group B", "LDCE IP"],
        official_text: `<p><strong>Annual Performance Appraisal Report (APAR) — Key Guidelines</strong></p>
<h4>What is APAR?</h4>
<p>APAR (formerly called ACR — Annual Confidential Report) is an official annual assessment of a Government servant's performance, integrity, character, and conduct during the assessment year (1 April to 31 March).</p>
<h4>Key Authorities Involved</h4>
<ul>
  <li><strong>Reporting Officer:</strong> The immediate superior who writes the report (PAR/APAR).</li>
  <li><strong>Reviewing Officer:</strong> The officer superior to the Reporting Officer who reviews and countersigns.</li>
  <li><strong>Accepting Authority:</strong> In some cadres, a third-level officer accepts the APAR.</li>
</ul>
<h4>Timeline for APAR Completion</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Stage</th><th style="border:1px solid #ccc;padding:6px">Deadline</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Self-appraisal by officer reported upon</td><td style="border:1px solid #ccc;padding:6px">30 April</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Report by Reporting Officer</td><td style="border:1px solid #ccc;padding:6px">31 May</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Review by Reviewing Officer</td><td style="border:1px solid #ccc;padding:6px">30 June</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Acceptance (if applicable)</td><td style="border:1px solid #ccc;padding:6px">31 July</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Communication of adverse remarks to officer</td><td style="border:1px solid #ccc;padding:6px">Within 1 month of acceptance</td></tr>
</table>
<h4>Disclosure of APAR</h4>
<p>The complete APAR (numerical grades AND descriptive remarks) shall be disclosed to the officer reported upon as a matter of right. This was a landmark change from the old "Confidential Report" system — earlier, only adverse remarks were communicated.</p>
<h4>Grading System (10-Point Scale)</h4>
<p>Performance is graded on a 10-point scale:</p>
<ul>
  <li><strong>1–4:</strong> Poor/Below Average</li>
  <li><strong>5–6:</strong> Average/Good</li>
  <li><strong>7–8:</strong> Very Good</li>
  <li><strong>9–10:</strong> Outstanding</li>
</ul>
<p>Benchmark for promotion purposes: generally <strong>7 and above (Very Good)</strong> is required.</p>
<h4>Representation Against Adverse Entries</h4>
<p>If an officer is not satisfied with adverse remarks, he may represent within <strong>15 days</strong> of receipt of the adverse remarks to the Reviewing Officer. If still aggrieved, he may represent to the Accepting Authority. Final representation is to the Central Government.</p>`,
        guru_explanation: `<p>APAR is one of the most important administrative tools in government service. Here's everything you need for the exam:</p>
<h4>ACR vs APAR — The Shift</h4>
<p>The old Annual Confidential Report (ACR) was <strong>secret</strong> — the employee couldn't see it. The APAR system (DoPT OM dated <strong>14 May 2009</strong>) made reports <strong>transparent</strong>. The complete APAR is now disclosed to the government servant.</p>
<h4>The 5-Date Timeline — Most Tested</h4>
<p>Remember: <strong>30 April → 31 May → 30 June → 31 July → 1 month</strong></p>
<ol>
  <li><strong>30 April:</strong> Officer submits self-appraisal</li>
  <li><strong>31 May:</strong> Reporting Officer completes APAR</li>
  <li><strong>30 June:</strong> Reviewing Officer reviews</li>
  <li><strong>31 July:</strong> Accepting Authority accepts</li>
  <li>Within <strong>1 month of acceptance:</strong> Adverse remarks communicated</li>
</ol>
<h4>The Bench Mark for Promotion</h4>
<p>A score of <strong>7/10 (Very Good)</strong> is typically the benchmark for empanelment/promotion. An officer with even one year of "Below Benchmark" APAR may be denied promotion. This is why APAR is so critical in a government servant's career.</p>
<h4>Who Cannot Write an APAR?</h4>
<p>A Reporting Officer who has observed the government servant for <strong>less than 3 months</strong> during the year should not write the APAR — there isn't enough basis for assessment. A different period breakup is done.</p>`,
        practical_example: `<p><strong>Scenario 1 — Adverse Entry Representation:</strong> Suresh (Inspector of Posts) receives his APAR showing a grade of 5/10 with a remark that he was "inattentive to public grievances." He disagrees.</p>
<p><strong>Correct Procedure:</strong></p>
<ol>
  <li>Suresh can make a <strong>representation within 15 days</strong> of receiving the adverse remarks.</li>
  <li>Representation goes first to the <strong>Reviewing Officer</strong>.</li>
  <li>If not satisfied, he can represent to the <strong>Accepting Authority</strong>.</li>
  <li>Final appeal: to the <strong>Central Government</strong> (Secretary level).</li>
</ol>
<p><strong>Scenario 2 — Late APAR:</strong> A Reporting Officer fails to complete Meena's APAR by 31 May. What happens?</p>
<p><strong>Answer:</strong> The delay in APAR completion itself can be noted adversely against the Reporting Officer. The APAR must still be completed — there is no "deemed satisfactory" provision for delays. However, if the APAR is never written and the officer suffers (e.g., denied promotion), she can challenge it.</p>`,
        exam_insight: `<p><strong>Critical APAR Facts for the Exam:</strong></p>
<ul>
  <li>APAR introduced (replacing ACR): <strong>DoPT OM dated 14.05.2009</strong></li>
  <li>Assessment year: <strong>1 April to 31 March</strong></li>
  <li>Self-appraisal deadline: <strong>30 April</strong></li>
  <li>Reporting Officer's deadline: <strong>31 May</strong></li>
  <li>Reviewing Officer's deadline: <strong>30 June</strong></li>
  <li>Accepting Authority's deadline: <strong>31 July</strong></li>
  <li>Adverse remarks communicated within: <strong>1 month</strong> of acceptance</li>
  <li>Representation period: <strong>15 days</strong> from receipt of adverse remarks</li>
  <li>Grading scale: <strong>1–10</strong></li>
  <li>Benchmark for promotion: typically <strong>7/10 (Very Good)</strong></li>
  <li>Minimum period for Reporting Officer to write APAR: <strong>3 months</strong> of observation</li>
</ul>
<p><strong>Most Tested MCQ:</strong> "What is the deadline for the Reporting Officer to complete the APAR?" — Answer: <strong>31 May</strong>. Students often confuse 30 June (Reviewing Officer) with 31 May.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 10. KISAN VIKAS PATRA (KVP)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Kisan Vikas Patra (KVP) — Rules & Features",
        rule_number: "KVP Rules, 2019",
        act_name: "Kisan Vikas Patra Rules, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>Kisan Vikas Patra (KVP) — Key Provisions</strong></p>
<h4>Background</h4>
<p>KVP was originally launched in 1988, discontinued in 2011, and <strong>relaunched in November 2014</strong>. It is a savings certificate scheme available at Post Offices and designated banks.</p>
<h4>Who Can Purchase</h4>
<ul>
  <li>Any adult individual (single or joint, up to 3 adults)</li>
  <li>A guardian on behalf of a minor</li>
  <li>A minor above 10 years in own name</li>
  <li><strong>HUF and Trusts CANNOT invest</strong></li>
</ul>
<h4>Deposit Limits</h4>
<ul>
  <li>Minimum: <strong>₹1,000</strong> (in multiples of ₹100)</li>
  <li>Maximum: <strong>No limit</strong></li>
</ul>
<h4>Interest & Doubling</h4>
<p>Interest rate: <strong>7.5% per annum</strong> (compounded annually, Q1 FY 2024-25). At this rate, the investment <strong>doubles in approximately 115 months</strong> (9 years 7 months).</p>
<h4>Maturity Period</h4>
<p>The maturity period is declared by the Central Government quarterly based on the prevailing interest rate. Currently: <strong>115 months</strong> (approximately 9 years 7 months). The key feature is that the money <strong>doubles</strong> at maturity.</p>
<h4>Premature Closure</h4>
<p>KVP can be prematurely closed after a lock-in of <strong>2 years and 6 months</strong> (30 months) from the date of issue, under the following conditions:</p>
<ul>
  <li>Death of account holder (any time)</li>
  <li>Forfeiture by a pledgee (gazetted officer)</li>
  <li>Court order</li>
  <li>After 30 months (on request — with reduced interest)</li>
</ul>
<h4>Tax Treatment</h4>
<p>KVP does NOT offer any tax deduction under Section 80C. Interest is taxable under "Income from Other Sources." There is no TDS on KVP interest.</p>`,
        guru_explanation: `<p>KVP is the simplest doubling instrument among Post Office schemes. Here's how to master it vs NSC for the exam:</p>
<h4>KVP vs NSC — Side-by-Side Comparison</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">KVP</th><th style="border:1px solid #ccc;padding:6px">NSC</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Maturity</td><td style="border:1px solid #ccc;padding:6px">~115 months (doubles)</td><td style="border:1px solid #ccc;padding:6px">5 years (60 months)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Interest Rate</td><td style="border:1px solid #ccc;padding:6px">7.5% p.a.</td><td style="border:1px solid #ccc;padding:6px">7.7% p.a.</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">80C Tax Benefit</td><td style="border:1px solid #ccc;padding:6px"><strong>No</strong></td><td style="border:1px solid #ccc;padding:6px"><strong>Yes</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Premature Closure</td><td style="border:1px solid #ccc;padding:6px">After 30 months</td><td style="border:1px solid #ccc;padding:6px">Not normally allowed</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Key Feature</td><td style="border:1px solid #ccc;padding:6px">Money doubles</td><td style="border:1px solid #ccc;padding:6px">Tax-saving instrument</td></tr>
</table>
<h4>The "Doubling" Concept</h4>
<p>KVP certificates show the <strong>maturity value and date</strong> on the certificate itself. If you invest ₹50,000 today, the certificate shows it will be worth ₹1,00,000 on a specific future date. This simplicity made it very popular.</p>
<h4>KYC is Mandatory</h4>
<p>Since 2014 relaunch, PAN card is required for investments above <strong>₹50,000</strong> in KVP. This was introduced to prevent money laundering (KVP was earlier misused for parking undisclosed income).</p>`,
        practical_example: `<p><strong>Scenario 1:</strong> Ravi invests ₹2,00,000 in KVP at 7.5% p.a. (maturity: 115 months). What does he receive at maturity?</p>
<p><strong>Answer:</strong> KVP doubles the money. Ravi receives <strong>₹4,00,000</strong> at maturity (approximately after 9 years 7 months). Simple!</p>
<p><strong>Scenario 2 — Premature Closure:</strong> Meena invested ₹1,00,000 in KVP. After 2 years (24 months), she needs the money urgently due to a medical emergency.</p>
<p><strong>Answer:</strong> Premature closure is NOT allowed before 30 months (2 years 6 months) for general reasons. Death and court orders are the exceptions. Meena must wait until <strong>30 months</strong> from issue date. If she truly cannot wait, she can explore pledging the KVP certificate for a bank loan.</p>`,
        exam_insight: `<p><strong>Must-Know KVP Facts:</strong></p>
<ul>
  <li>KVP relaunched: <strong>November 2014</strong> (originally 1988, discontinued 2011)</li>
  <li>Current interest rate: <strong>7.5% p.a.</strong></li>
  <li>Maturity (current): <strong>115 months</strong> (~9 years 7 months)</li>
  <li>What happens at maturity: <strong>Money doubles</strong></li>
  <li>Minimum investment: <strong>₹1,000</strong></li>
  <li>Maximum: <strong>No limit</strong></li>
  <li>Section 80C benefit: <strong>No</strong></li>
  <li>Premature closure lock-in: <strong>30 months</strong></li>
  <li>PAN required for investment above: <strong>₹50,000</strong></li>
  <li>HUF eligible: <strong>No</strong></li>
</ul>
<p><strong>Frequent MCQ:</strong> "Which Post Office scheme offers 80C tax deduction?" — Options include KVP, NSC, MIS, TD. Answer: <strong>NSC and TD (5-year)</strong>. KVP does NOT offer 80C benefit.</p>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

];

async function seed() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const db = client.db();
        const collection = db.collection('daksutras');

        let inserted = 0;
        let skipped = 0;

        for (const entry of entries) {
            const exists = await collection.findOne({ title: entry.title });
            if (exists) {
                console.log(`  ⏭  Skipping (already exists): ${entry.title}`);
                skipped++;
            } else {
                await collection.insertOne(entry);
                console.log(`  ✅ Inserted: [${entry.category}] ${entry.title}`);
                inserted++;
            }
        }

        console.log(`\n📚 Done!`);
        console.log(`  Inserted: ${inserted}`);
        console.log(`  Skipped:  ${skipped}`);
        console.log(`  Total entries in this batch: ${entries.length}`);

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

seed();
