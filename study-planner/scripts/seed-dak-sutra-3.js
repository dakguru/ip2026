
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
    // 1. DIGIPIN — DIGITAL POSTAL INDEX NUMBER
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "DIGIPIN — Digital Postal Index Number: Complete Guide",
        rule_number: "Circular 2025",
        act_name: "Department of Posts — Digital Initiatives",
        category: "Circular",
        effective_date: new Date("2025-05-27"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>What is DIGIPIN?</strong></p>
<p>DIGIPIN (Digital Postal Index Number) is a <strong>Digital Public Infrastructure (DPI)</strong> and a standardized, geo-coded, interoperable addressing system in India established by the <strong>Department of Posts, India</strong>. It provides simplified addressing solutions for seamless delivery of public and private services and enables <strong>"Address as a Service" (AaaS)</strong> across the country.</p>
<h4>Key Dates</h4>
<ul>
  <li>Beta release: <strong>19 July 2024</strong> (open for public feedback until 22 September 2024)</li>
  <li>Official launch: <strong>27 May 2025</strong></li>
</ul>
<h4>Core Concept — The 10-Digit Code</h4>
<p>DIGIPIN divides the geographical territory of India into uniform <strong>4-metre by 4-metre (approx.)</strong> grid units. Each such unit is assigned a unique <strong>10-digit alphanumeric code</strong> derived from the latitude and longitude of the unit.</p>
<ul>
  <li>The code uses <strong>16 symbols</strong>: 2, 3, 4, 5, 6, 7, 8, 9, C, J, K, L, M, P, F, T</li>
  <li>DIGIPIN does <strong>not store personal information</strong> — it represents a location only.</li>
  <li>The system is <strong>permanent</strong> and does not change with updates to state, city, or locality names.</li>
</ul>
<h4>Bounding Box</h4>
<ul>
  <li>Longitude: <strong>63.5° to 99.5° East</strong></li>
  <li>Latitude: <strong>2.5° to 38.5° North</strong></li>
  <li>Includes the maritime <strong>Exclusive Economic Zone (EEZ)</strong> — 200 nautical miles from the coastline.</li>
</ul>
<h4>Grid Sizes at Various Code Lengths</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Code Length</th><th style="border:1px solid #ccc;padding:6px">Approx. Area</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">6 digits</td><td style="border:1px solid #ccc;padding:6px">~1 km × 1 km</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">10 digits (full)</td><td style="border:1px solid #ccc;padding:6px">~3.8 m × 3.8 m</td></tr>
</table>
<h4>DHRUVA Ecosystem</h4>
<p><strong>DHRUVA</strong> (Digital Hub for Reference &amp; Unique Virtual Address) is the comprehensive digital address ecosystem where DIGIPIN acts as the foundational layer — similar to how <strong>UPI functions for payments</strong>.</p>
<p>Core Objectives of DHRUVA: (1) Standardization (2) Interoperability (3) Privacy by Design (4) Inclusivity</p>`,
        guru_explanation: `<p>DIGIPIN is one of the most important and newest topics for the IP/PS Group B exam. Here is everything you need to understand it clearly:</p>
<h4>Think of it Like a PIN Code — But Much More Precise</h4>
<p>The traditional 6-digit PIN code tells you the general area (e.g., a post office's delivery zone). DIGIPIN goes further — it gives a <strong>precise 10-digit code</strong> for a 4m × 4m plot of land. Your house, your doorstep — it all gets a unique code.</p>
<h4>Why Was DIGIPIN Needed?</h4>
<ul>
  <li>Millions of Indians have no formal address — remote villages, slums, new colonies.</li>
  <li>India Post delivers to every corner — but without a proper address, delivery fails.</li>
  <li>DIGIPIN gives a <strong>digital address</strong> to every location — even in places without street names.</li>
</ul>
<h4>The 16-Symbol Alphabet</h4>
<p>The symbols used are: <strong>2, 3, 4, 5, 6, 7, 8, 9, C, J, K, L, M, P, F, T</strong>. Notice: 0, 1, A, B, D, E etc. are NOT used — to avoid confusion between letters and numbers (e.g., 0 vs O, 1 vs I).</p>
<h4>How are Symbols Assigned?</h4>
<p>Symbols within each grid level are assigned using a <strong>Z-order (Peano curve) / spiraling pattern</strong>, starting from the <strong>bottom-left (South-West)</strong> corner of the country. This ensures nearby locations share similar prefixes — great for logistics sorting.</p>
<h4>DIGIPIN vs Traditional PIN Code</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">PIN Code</th><th style="border:1px solid #ccc;padding:6px">DIGIPIN</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Digits</td><td style="border:1px solid #ccc;padding:6px">6 digits</td><td style="border:1px solid #ccc;padding:6px">10 alphanumeric</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Precision</td><td style="border:1px solid #ccc;padding:6px">Post Office area</td><td style="border:1px solid #ccc;padding:6px">~4m × 4m plot</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Technology</td><td style="border:1px solid #ccc;padding:6px">Administrative division</td><td style="border:1px solid #ccc;padding:6px">Geo-coded (lat/long)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Stores personal data?</td><td style="border:1px solid #ccc;padding:6px">No</td><td style="border:1px solid #ccc;padding:6px">No</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Changes with city rename?</td><td style="border:1px solid #ccc;padding:6px">Can change</td><td style="border:1px solid #ccc;padding:6px">Never changes</td></tr>
</table>`,
        practical_example: `<p><strong>Scenario 1 — Remote Village Delivery:</strong> A Grameen Dak Sevak in a village needs to deliver a parcel to a tribal hamlet that has no house numbers or street names. Using DIGIPIN, the sender has shared a 10-digit code. The GDS opens the DIGIPIN map on his smartphone — it shows the precise 4m × 4m location of the house. He delivers without any confusion.</p>
<p><strong>Scenario 2 — How to Read a DIGIPIN Code:</strong> Suppose the DIGIPIN of a house is <strong>39J-4MK-F2L7</strong>. The first few characters narrow it down to a large region; more characters progressively pinpoint the exact 4m × 4m cell. Just like zooming in on a map.</p>
<p><strong>Scenario 3 — Emergency Services:</strong> A person calls for an ambulance from a flood-affected area with no address. He shares his DIGIPIN (visible on a DIGIPIN-enabled app). The ambulance uses the code to navigate to the exact location — even offline, since DIGIPIN is an <strong>offline grid system</strong>.</p>`,
        exam_insight: `<p><strong>Top MCQ Facts to Remember:</strong></p>
<ul>
  <li>DIGIPIN officially launched: <strong>27 May 2025</strong></li>
  <li>Beta launched: <strong>19 July 2024</strong></li>
  <li>Developed by: <strong>Department of Posts + IIT Hyderabad + NRSC, ISRO</strong></li>
  <li>Grid unit: <strong>4m × 4m (approx.)</strong></li>
  <li>Code length: <strong>10 digits</strong> (alphanumeric)</li>
  <li>Number of symbols used: <strong>16</strong> (2,3,4,5,6,7,8,9,C,J,K,L,M,P,F,T)</li>
  <li>DIGIPIN is: <strong>Digital Public Infrastructure (DPI)</strong></li>
  <li>DHRUVA full form: <strong>Digital Hub for Reference &amp; Unique Virtual Address</strong></li>
  <li>Full 10-digit code precision: <strong>~3.8m × 3.8m</strong></li>
  <li>DIGIPIN works: <strong>offline and online</strong></li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-top:10px">
  <strong>COMMON TRAP:</strong> "DIGIPIN replaces the traditional PIN code" — <strong>FALSE</strong>. DIGIPIN complements the PIN code system; it doesn't replace it. The two serve different purposes.
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 2. DAK GHAR NIRYAT KENDRA (DNK)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Dak Ghar Niryat Kendra (DNK) — Complete Export Service Guide",
        rule_number: "DNK Policy 2023–25",
        act_name: "Department of Posts — Export Services",
        category: "Circular",
        effective_date: new Date("2023-01-01"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>What is Dak Ghar Niryat Kendra (DNK)?</strong></p>
<p>DNK is a <strong>single-window export facilitation initiative</strong> by the Department of Posts that enables small traders, artisans, craftsmen, and <strong>MSMEs</strong> to export products across the world. It provides online documentation, custom clearance, and address label generation — all without visiting a Foreign Post Office.</p>
<p>The DNK portal (<strong>dnk.cept.gov.in</strong>) is integrated with:</p>
<ul>
  <li><strong>ICEGATE</strong> — Indian Customs Electronic Gateway</li>
  <li><strong>ICES</strong> — Indian Customs EDI System</li>
  <li><strong>PFMS</strong> — Public Financial Management System</li>
  <li><strong>EDPMS</strong> — Export Data Processing &amp; Monitoring System (RBI) — for IGST refund automation</li>
</ul>
<h4>Overview of Operations</h4>
<ul>
  <li>Over <strong>1,013</strong> Dak Niryat Kendra operational across India</li>
  <li>Products exportable to over <strong>219 countries</strong> via Speed Post, Air Parcel, ITPS, etc.</li>
  <li>Speed Post: <strong>106 countries</strong> | ITPS: <strong>46 countries</strong> | International Parcel: <strong>191 countries</strong></li>
</ul>
<h4>Key Features of DNK</h4>
<ul>
  <li>Electronic filing of <strong>PBE (Postal Bill of Export)</strong> — no manual filing needed</li>
  <li>No need to visit the <strong>Foreign Post Office (FPO)</strong> with product samples</li>
  <li>No requirement for customs house agent / customs officer presence</li>
  <li>Packaging facility, pick-up facility, tracking &amp; tracing — all at DNK</li>
  <li>Self-booking through the portal</li>
</ul>
<h4>PBE Classification Table</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">PBE Filing Method</th><th style="border:1px solid #ccc;padding:6px">Export Type</th><th style="border:1px solid #ccc;padding:6px">PBE Form</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Manual</td><td style="border:1px solid #ccc;padding:6px">eCommerce</td><td style="border:1px solid #ccc;padding:6px"><strong>PBE-I</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Manual</td><td style="border:1px solid #ccc;padding:6px">Other than eCommerce</td><td style="border:1px solid #ccc;padding:6px"><strong>PBE-II</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Electronic</td><td style="border:1px solid #ccc;padding:6px">eCommerce</td><td style="border:1px solid #ccc;padding:6px"><strong>PBE-III</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Electronic</td><td style="border:1px solid #ccc;padding:6px">Other than eCommerce</td><td style="border:1px solid #ccc;padding:6px"><strong>PBE-IV</strong></td></tr>
</table>
<p><em>Note: For DNK portal bookings, the applicable PBE forms are PBE-III or PBE-IV (Electronic filing).</em></p>`,
        guru_explanation: `<p>DNK is India Post's flagship export initiative and a hot topic in recent IP/PS exams. Here's a structured breakdown:</p>
<h4>The 10-Step Export Process (Must Know!)</h4>
<ol>
  <li>Exporter does <strong>one-time registration</strong> on DNK portal (dnk.cept.gov.in)</li>
  <li>Fill profile with <strong>IEC (Import Export Code), PAN, GSTIN, AD Code</strong></li>
  <li>Fill article details in electronic PBE format</li>
  <li>On submission, <strong>PBE number allotted by Customs</strong></li>
  <li>Customer prints <strong>CN 22/CN 23</strong> customs declaration label</li>
  <li>Articles presented at DNK with label affixed</li>
  <li>DNK dispatches articles to <strong>FPO (Foreign Post Office)</strong> in distinctly labelled PBE bags</li>
  <li>FPO conducts physical examination</li>
  <li>Any query → raised by Customs through DNK portal; exporter responds online</li>
  <li>Customs grants <strong>LEO (Let Export Order)</strong> → PBE downloadable from portal</li>
</ol>
<h4>Discount Structure (EMS Merchandise)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Monthly Revenue (INR)</th><th style="border:1px solid #ccc;padding:6px">Contractual Discount (A)</th><th style="border:1px solid #ccc;padding:6px">Additional DNK Discount (B)</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Up to ₹25,000</td><td style="border:1px solid #ccc;padding:6px">0%</td><td style="border:1px solid #ccc;padding:6px">1%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">₹25,001 – ₹1,00,000</td><td style="border:1px solid #ccc;padding:6px">3%</td><td style="border:1px solid #ccc;padding:6px">1%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">₹1,00,001 – ₹5,00,000</td><td style="border:1px solid #ccc;padding:6px">6%</td><td style="border:1px solid #ccc;padding:6px">1%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">₹5,00,001 – ₹20,00,000</td><td style="border:1px solid #ccc;padding:6px">9%</td><td style="border:1px solid #ccc;padding:6px">1%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">₹20,00,001 – ₹50,00,000</td><td style="border:1px solid #ccc;padding:6px">12%</td><td style="border:1px solid #ccc;padding:6px">1%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Above ₹50,00,000</td><td style="border:1px solid #ccc;padding:6px">13%</td><td style="border:1px solid #ccc;padding:6px">1%</td></tr>
</table>
<h4>Credit Facility</h4>
<ul>
  <li>Approving authority: <strong>CPMG/PMG</strong></li>
  <li>Security deposit: <strong>Bank Guarantee</strong> equal to <strong>3 billing cycles'</strong> anticipated postage</li>
  <li>Bank Guarantee reviewed on <strong>quarterly basis</strong></li>
</ul>
<h4>Free Pick-Up Eligibility</h4>
<p>Monthly revenue ≥ <strong>₹50,000</strong> (single location) or ≥ <strong>₹2,00,000</strong> (multiple locations). Pickup within <strong>20 km</strong> radius of booking centre.</p>`,
        practical_example: `<p><strong>Scenario 1 — MSME Exporter using DNK:</strong> Ravi, a handicraft maker in Jaipur, wants to export blue pottery to buyers in France, USA, and Japan. Earlier, he had to go to the Foreign Post Office in Delhi with samples. Now, using DNK:</p>
<ol>
  <li>He registers once on dnk.cept.gov.in with his IEC, GSTIN, AD code.</li>
  <li>Fills electronic PBE for each shipment — selects PBE-III (electronic, non-eCommerce).</li>
  <li>Customs allots PBE number online. He prints the CN 22/CN 23 label.</li>
  <li>Presents articles at his nearest DNK. DNK packages and dispatches to FPO.</li>
  <li>Customs inspects at FPO → grants LEO → PBE downloaded from portal.</li>
  <li>Articles flown to destination countries via Speed Post / ITPS.</li>
</ol>
<p><strong>Scenario 2 — Certificate Requirement:</strong> Anita wants to export herbal medicines via DNK. She needs a <strong>NOC from the Assistant Drugs Controller (ADC)</strong> since pharmaceutical products require a "Certificate" (No Objection Certificate) from the competent authority.</p>
<p><strong>Scenario 3 — Discount Calculation:</strong> A contractual EMS customer has monthly revenue of ₹3,00,000 and books via DNK portal. His discount = 6% (contractual) + 1% (additional DNK) = <strong>7% total discount</strong>.</p>`,
        exam_insight: `<p><strong>Must-Know Facts for the Exam:</strong></p>
<ul>
  <li>DNK portal: <strong>dnk.cept.gov.in</strong></li>
  <li>Total DNK centres: <strong>Over 1,013</strong> across India</li>
  <li>Countries served (Speed Post): <strong>106</strong> | ITPS: <strong>46</strong> | Int'l Parcel: <strong>191</strong></li>
  <li>PBE for DNK electronic bookings: <strong>PBE-III</strong> (eCommerce) or <strong>PBE-IV</strong> (other)</li>
  <li>Portal integrated with: <strong>ICEGATE, ICES, PFMS, EDPMS</strong></li>
  <li>Free pickup radius: <strong>20 km</strong> from centre</li>
  <li>Credit facility approved by: <strong>CPMG/PMG</strong></li>
  <li>Bank Guarantee = <strong>3 billing cycles'</strong> postage</li>
  <li>Advance deposit account minimum: <strong>₹5,000</strong> (product-wise)</li>
  <li>IOSS = <strong>Import One Stop Shop</strong> — required for EU country exports</li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-top:10px">
  <strong>KEY DISTINCTION:</strong> "PBE-I and PBE-II are for <u>Manual</u> filing. PBE-III and PBE-IV are for <u>Electronic</u> (DNK portal) filing." This is the most tested fact from the DNK topic.
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. INDIA POST PAYMENTS BANK (IPPB)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "India Post Payments Bank (IPPB) — Complete Guide",
        rule_number: "IPPB Guidelines 2018–2024",
        act_name: "India Post Payments Bank",
        category: "Circular",
        effective_date: new Date("2018-09-01"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>India Post Payments Bank (IPPB)</strong> was set up under the Department of Posts, Ministry of Communications with <strong>100% equity owned by the Government of India</strong>.</p>
<h4>Key Dates</h4>
<ul>
  <li>Pilot project launched: <strong>30 January 2017</strong> at Ranchi (Jharkhand) and Raipur (Chhattisgarh)</li>
  <li>First phase (650 branches + 3,250 post offices) inaugurated: <strong>1 September 2018</strong> by PM Narendra Modi</li>
</ul>
<p>Tagline: <strong>"Aapka Bank, Aapke Dwaar"</strong></p>
<h4>Products Offered by IPPB</h4>
<ol>
  <li>Premium Aarogya Savings Account</li>
  <li>Premium Saving Account (Premium Khata)</li>
  <li>Regular Savings Account</li>
  <li>DigiSmart Savings Account</li>
  <li>Basic Savings Account</li>
  <li>Current Account</li>
  <li>Salary Account</li>
  <li>Door Step Banking</li>
  <li>Insurance — Life, Health and General</li>
  <li>Loan Referral Service</li>
  <li>Social Security Schemes (PMJJBY, PMSBY, APY)</li>
  <li>International Money Transfer (with Ria Money Transfer)</li>
</ol>
<h4>Savings Account Interest Rates</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Balance Range</th><th style="border:1px solid #ccc;padding:6px">Interest Rate (Quarterly)</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Up to ₹1 Lakh</td><td style="border:1px solid #ccc;padding:6px"><strong>2.00% p.a.</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Above ₹1 Lakh up to ₹2 Lakh</td><td style="border:1px solid #ccc;padding:6px"><strong>2.25% p.a.</strong></td></tr>
</table>
<h4>Maximum End of Day Balance</h4>
<p><strong>₹2,00,000</strong>. Any balance above ₹2 lakh at end of day is automatically swept to the linked POSA (Post Office Savings Account).</p>`,
        guru_explanation: `<p>IPPB is a Payments Bank — not a full-service commercial bank. Understanding this distinction is critical for the exam.</p>
<h4>Payments Bank vs Full Bank</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">Payments Bank (IPPB)</th><th style="border:1px solid #ccc;padding:6px">Full Bank (SBI etc.)</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Max balance</td><td style="border:1px solid #ccc;padding:6px">₹2 Lakh</td><td style="border:1px solid #ccc;padding:6px">No limit</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Loans/Advances</td><td style="border:1px solid #ccc;padding:6px">Cannot issue directly</td><td style="border:1px solid #ccc;padding:6px">Yes</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Credit Cards</td><td style="border:1px solid #ccc;padding:6px">No</td><td style="border:1px solid #ccc;padding:6px">Yes</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Debit Cards</td><td style="border:1px solid #ccc;padding:6px">Yes (Virtual)</td><td style="border:1px solid #ccc;padding:6px">Yes</td></tr>
</table>
<h4>The POSA Linkage — Very Important!</h4>
<p>IPPB accounts can be <strong>linked to a Post Office Savings Account (POSA)</strong>. When IPPB balance exceeds ₹2 lakh, the excess is automatically transferred ("swept") to the linked POSA. This is called the <strong>sweep-in facility</strong>.</p>
<h4>Fincluvation TM</h4>
<p>Fincluvation is an initiative of <strong>DoP &amp; IPPB</strong> to invite the <strong>fintech startup community</strong> to co-create solutions for financial inclusion.</p>
<h4>AePS — Aadhaar-enabled Payment System</h4>
<p>IPPB enables <strong>AePS</strong> transactions — allowing customers to do cash deposits, withdrawals, and mini-statements using just their Aadhaar number and fingerprint at any AePS-enabled device — without needing a card or phone.</p>
<h4>Key Charges (Aarogya &amp; Premium Accounts)</h4>
<ul>
  <li>Account Opening: <strong>₹149 + GST</strong></li>
  <li>Annual Renewal: <strong>₹99 + GST</strong></li>
  <li>Virtual Debit Card Issuance: <strong>₹25</strong> (inclusive of taxes)</li>
  <li>Account Closure (after 3 months): <strong>₹50 + GST</strong></li>
  <li>Doorstep Banking: <strong>Free</strong></li>
</ul>`,
        practical_example: `<p><strong>Scenario 1 — Rural Financial Inclusion:</strong> Kamala, a farmer in Odisha, has never used a bank. India Post's Grameen Dak Sevak visits her home and helps open a <strong>Basic Savings Account</strong> with IPPB using AePS (Aadhaar-based). She can now receive PM-Kisan benefit directly, withdraw cash at home, and send money via IPPB — all without visiting a bank branch.</p>
<p><strong>Scenario 2 — Balance Sweep:</strong> Suresh deposits ₹2,50,000 in his IPPB Premium account linked to POSA. At end of day:</p>
<ul>
  <li>IPPB retains: <strong>₹2,00,000</strong> (maximum end-of-day balance)</li>
  <li>Excess ₹50,000 is automatically swept to his <strong>linked POSA</strong></li>
  <li>The POSA earns 4% interest on this amount</li>
</ul>
<p><strong>Scenario 3 — International Remittance:</strong> Ram's brother sends money from the US. IPPB has a tie-up with <strong>Ria Money Transfer</strong> for international remittances. The money can be received directly into the IPPB account or delivered to home via the Postman.</p>`,
        exam_insight: `<p><strong>Must-Know Facts for IPPB:</strong></p>
<ul>
  <li>Pilot launched: <strong>30 January 2017</strong> (Ranchi &amp; Raipur)</li>
  <li>Official launch: <strong>1 September 2018</strong> (by PM Modi)</li>
  <li>Equity: <strong>100% Government of India</strong></li>
  <li>Tagline: <strong>"Aapka Bank, Aapke Dwaar"</strong></li>
  <li>First phase: <strong>650 branches + 3,250 post office access points</strong></li>
  <li>Maximum end-of-day balance: <strong>₹2,00,000</strong></li>
  <li>Interest up to ₹1L: <strong>2.00% p.a.</strong>; ₹1L–₹2L: <strong>2.25% p.a.</strong> (quarterly)</li>
  <li>International remittance partner: <strong>Ria Money Transfer</strong></li>
  <li>Fintech initiative: <strong>Fincluvation TM</strong></li>
  <li>Type: <strong>Payments Bank</strong> (cannot issue loans directly)</li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-top:10px">
  <strong>EXAM TRAP:</strong> "IPPB can issue loans and credit cards" — <strong>FALSE</strong>. IPPB is a Payments Bank. It offers a <em>Loan Referral Service</em> (referral to partner banks) — not direct lending.
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 4. PMJJBY — PRADHAN MANTRI JEEVAN JYOTI BIMA YOJANA
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "PMJJBY — Pradhan Mantri Jeevan Jyoti Bima Yojana",
        rule_number: "Jan Suraksha Schemes — PMJJBY",
        act_name: "Jan Suraksha Yojanas",
        category: "Circular",
        effective_date: new Date("2015-06-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)</strong> is a life insurance scheme offering cover for <strong>death due to any cause</strong>. It is a one-year renewable insurance scheme.</p>
<h4>Key Parameters</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Parameter</th><th style="border:1px solid #ccc;padding:6px">Details</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Coverage</td><td style="border:1px solid #ccc;padding:6px">Death due to <strong>any reason</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Sum Insured</td><td style="border:1px solid #ccc;padding:6px"><strong>₹2 Lakh</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Premium</td><td style="border:1px solid #ccc;padding:6px"><strong>₹436 per annum</strong> (revised from ₹330 w.e.f. 01.06.2022)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Eligibility Age</td><td style="border:1px solid #ccc;padding:6px"><strong>18 to 50 years</strong> (age nearer birthday)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Termination Age</td><td style="border:1px solid #ccc;padding:6px"><strong>55 years</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Cover Period</td><td style="border:1px solid #ccc;padding:6px"><strong>1 June to 31 May</strong> each year</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Enrolment</td><td style="border:1px solid #ccc;padding:6px">Auto-debit from bank/post office account</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">KYC</td><td style="border:1px solid #ccc;padding:6px">Aadhaar is primary KYC</td></tr>
</table>
<h4>Lien Period (Statutory Update 2022–2025)</h4>
<p>For new subscribers: insurance cover is <strong>not available for death other than accident</strong> occurring during the <strong>first 30 days</strong> from date of enrolment. This 30-day period is the <strong>lien period</strong>. No claim is admissible for non-accidental death during this period.</p>
<h4>Appropriation of Premium (₹436)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Component</th><th style="border:1px solid #ccc;padding:6px">Amount</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Insurance Premium to LIC/Insurer</td><td style="border:1px solid #ccc;padding:6px"><strong>₹395</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Commission to Business Correspondents/Agents</td><td style="border:1px solid #ccc;padding:6px"><strong>₹30</strong> (new enrolments only)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Administrative Expenses (to Participating Banks)</td><td style="border:1px solid #ccc;padding:6px"><strong>₹11</strong></td></tr>
</table>`,
        guru_explanation: `<p>PMJJBY is one of three Jan Suraksha Schemes and is a core topic for the exam. Here is how to distinguish it from PMSBY:</p>
<h4>PMJJBY vs PMSBY — The Most Confused Pair</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">PMJJBY</th><th style="border:1px solid #ccc;padding:6px">PMSBY</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Type</td><td style="border:1px solid #ccc;padding:6px">Life Insurance</td><td style="border:1px solid #ccc;padding:6px">Accident Insurance</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Coverage</td><td style="border:1px solid #ccc;padding:6px">Death (any cause)</td><td style="border:1px solid #ccc;padding:6px">Accidental death &amp; disability</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Premium</td><td style="border:1px solid #ccc;padding:6px"><strong>₹436/year</strong></td><td style="border:1px solid #ccc;padding:6px"><strong>₹20/year</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Age Limit (Entry)</td><td style="border:1px solid #ccc;padding:6px">18–50 years</td><td style="border:1px solid #ccc;padding:6px">18–70 years</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Terminates at</td><td style="border:1px solid #ccc;padding:6px">55 years</td><td style="border:1px solid #ccc;padding:6px">70 years</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Insurer</td><td style="border:1px solid #ccc;padding:6px">LIC / Life Insurance Co.</td><td style="border:1px solid #ccc;padding:6px">PSGICs / General Ins. Co.</td></tr>
</table>
<h4>Master Policy Holder</h4>
<p>Participating <strong>Banks / Post Offices</strong> are the Master Policy Holders under PMJJBY. They administer the scheme on behalf of LIC/insurers.</p>
<h4>The Lien Period Rule — New for Exams</h4>
<p>First-time subscribers face a <strong>30-day lien period</strong>. If death (non-accidental) occurs within the first 30 days, <strong>no claim is payable</strong>. However, accidental death is covered from Day 1. This was introduced vide Statutory Update 2022–2025.</p>`,
        practical_example: `<p><strong>Scenario 1:</strong> Renu, aged 32, enrolled in PMJJBY on 15 June. She dies in a road accident on 25 June (Day 10). Is the claim payable?</p>
<p><strong>Answer: YES.</strong> Accidental death is covered from Day 1 — the 30-day lien applies only to non-accidental death.</p>
<p><strong>Scenario 2:</strong> Vijay, aged 34, enrolled for the first time in PMJJBY on 1 July. He died of a heart attack on 20 July (Day 19). Is the claim payable?</p>
<p><strong>Answer: NO.</strong> Death was non-accidental within the 30-day lien period. No claim is admissible.</p>
<p><strong>Scenario 3 — Pro-rata Premium:</strong> Arun wants to join PMJJBY in December for the first time. What premium does he pay?</p>
<p><strong>Answer: ₹228</strong> (pro-rata premium for enrolment in December, January, or February).</p>`,
        exam_insight: `<p><strong>Critical Facts for the Exam:</strong></p>
<ul>
  <li>Full form: <strong>Pradhan Mantri Jeevan Jyoti Bima Yojana</strong></li>
  <li>Type: <strong>Life Insurance</strong> (death by any cause)</li>
  <li>Sum insured: <strong>₹2 Lakh</strong></li>
  <li>Annual premium: <strong>₹436</strong> (revised from ₹330 w.e.f. 01.06.2022)</li>
  <li>Entry age: <strong>18–50 years</strong></li>
  <li>Terminates at: <strong>55 years</strong></li>
  <li>Cover period: <strong>1 June to 31 May</strong></li>
  <li>Lien period for new enrollees: <strong>30 days</strong> (non-accidental death not covered)</li>
  <li>Master Policy Holder: <strong>Banks/Post Offices</strong></li>
  <li>Premium appropriation: ₹395 (LIC) + ₹30 (agent, new only) + ₹11 (admin)</li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-top:10px">
  <strong>TRICK:</strong> "PMJJBY covers only accidental death" — <strong>FALSE</strong>. PMJJBY covers death by <em>any cause</em>. It is PMSBY that covers only <em>accidental</em> death/disability.
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 5. PMSBY + APY — JAN SURAKSHA SCHEMES
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "PMSBY & Atal Pension Yojana — Jan Suraksha Schemes",
        rule_number: "Jan Suraksha Schemes — PMSBY & APY",
        act_name: "Jan Suraksha Yojanas",
        category: "Circular",
        effective_date: new Date("2015-06-01"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<h4>PRADHAN MANTRI SURAKSHA BIMA YOJANA (PMSBY)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Parameter</th><th style="border:1px solid #ccc;padding:6px">Details</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Type</td><td style="border:1px solid #ccc;padding:6px">Accident Insurance (Death &amp; Disability)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Premium</td><td style="border:1px solid #ccc;padding:6px"><strong>₹20 per annum</strong> (revised from ₹12 w.e.f. 01.06.2022)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Eligibility Age</td><td style="border:1px solid #ccc;padding:6px"><strong>18 to 70 years</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Terminates at</td><td style="border:1px solid #ccc;padding:6px"><strong>70 years</strong> (age nearest birthday)</td></tr>
</table>
<h4>PMSBY — Benefits Table</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Event</th><th style="border:1px solid #ccc;padding:6px">Sum Insured</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Accidental Death</td><td style="border:1px solid #ccc;padding:6px"><strong>₹2 Lakh</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Total &amp; irrecoverable loss of both eyes OR both hands/feet OR loss of sight of one eye + loss of one hand/foot</td><td style="border:1px solid #ccc;padding:6px"><strong>₹2 Lakh</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Total &amp; irrecoverable loss of one eye OR one hand/foot</td><td style="border:1px solid #ccc;padding:6px"><strong>₹1 Lakh</strong></td></tr>
</table>
<h4>ATAL PENSION YOJANA (APY)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Parameter</th><th style="border:1px solid #ccc;padding:6px">Details</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Administered by</td><td style="border:1px solid #ccc;padding:6px"><strong>PFRDA</strong> (Pension Fund Regulatory &amp; Development Authority)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Eligibility Age</td><td style="border:1px solid #ccc;padding:6px"><strong>18 to 40 years</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Guaranteed Pension</td><td style="border:1px solid #ccc;padding:6px">₹1,000 / ₹2,000 / ₹3,000 / ₹4,000 / <strong>₹5,000</strong> per month at age 60</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Contribution Mode</td><td style="border:1px solid #ccc;padding:6px">Monthly / Quarterly / Half-yearly via <strong>Auto-Debit</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Income Tax Payers</td><td style="border:1px solid #ccc;padding:6px"><strong>Ineligible</strong> w.e.f. <strong>01.10.2022</strong></td></tr>
</table>
<h4>APY — Dormancy Rules</h4>
<ul>
  <li>No contribution for <strong>6 months</strong> → account <strong>frozen</strong></li>
  <li>No contribution for <strong>12 months</strong> → account <strong>deactivated</strong></li>
  <li>No contribution for <strong>24 months</strong> → account <strong>closed</strong></li>
</ul>
<h4>APY — Penalty for Default</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Monthly Contribution</th><th style="border:1px solid #ccc;padding:6px">Penalty per Month</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Up to ₹100</td><td style="border:1px solid #ccc;padding:6px">Re. 1</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Above ₹100 to ₹500</td><td style="border:1px solid #ccc;padding:6px">₹2</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Above ₹500 to ₹1,000</td><td style="border:1px solid #ccc;padding:6px">₹5</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Above ₹1,000</td><td style="border:1px solid #ccc;padding:6px">₹10</td></tr>
</table>`,
        guru_explanation: `<p>This entry covers two of the three Jan Suraksha Schemes — PMSBY (accident insurance) and APY (pension). Together with PMJJBY, they form the Jan Suraksha trinity.</p>
<h4>PMSBY — The ₹20 Wonder</h4>
<p>For just <strong>₹20 per year</strong>, a subscriber gets ₹2 lakh accident cover. It is the cheapest insurance in India. The premium is deducted via auto-debit from bank/post office account on or before 1st June each year.</p>
<h4>Key APY Point — Income Tax Rule (w.e.f. 01.10.2022)</h4>
<p>From 1st October 2022, <strong>any citizen who is or has been an income-tax payer</strong> is not eligible to join APY. If such a person joined APY on/after 01.10.2022 and is later found to be an income-tax payer, the <strong>APY account will be closed</strong> and the accumulated pension wealth returned to the subscriber.</p>
<h4>APY at Retirement (Age 60)</h4>
<p>The subscriber gets guaranteed pension of ₹1,000–₹5,000/month. On death of subscriber, the <strong>same pension goes to spouse</strong>. On death of both subscriber and spouse, the <strong>accumulated corpus goes to the nominee</strong>.</p>
<h4>Voluntary Exit from APY</h4>
<p>Subscribers can exit APY before age 60. On exit, they receive back their own accumulated contributions plus interest earned — <strong>Government co-contribution (if any) is not returned</strong>.</p>`,
        practical_example: `<p><strong>Scenario 1 — PMSBY Claim:</strong> Amar, a farmer aged 45, has a PMSBY account. He loses his right hand in a tractor accident. He is entitled to:</p>
<p><strong>₹1 Lakh</strong> — total irrecoverable loss of one hand = ₹1 lakh benefit.</p>
<p><strong>Scenario 2 — APY Eligibility:</strong> Rahul filed income tax for AY 2022-23. He wants to open APY in January 2023. Is he eligible?</p>
<p><strong>Answer: NO.</strong> From 01.10.2022, income-tax payers are ineligible for APY. Rahul had been an income-tax payer, so he cannot join APY.</p>
<p><strong>Scenario 3 — APY Dormancy:</strong> Priya stopped contributing to APY for 8 months. What is the status of her account?</p>
<p><strong>Answer: FROZEN.</strong> Accounts are frozen after 6 months of non-contribution. She needs to revive it by paying outstanding contributions and penalties before it gets deactivated at 12 months.</p>`,
        exam_insight: `<p><strong>PMSBY Key Facts:</strong></p>
<ul>
  <li>Type: <strong>Accident Insurance</strong></li>
  <li>Premium: <strong>₹20/year</strong> (revised from ₹12 w.e.f. 01.06.2022)</li>
  <li>Age: <strong>18–70 years</strong> (terminates at 70)</li>
  <li>Death or total disability: <strong>₹2 Lakh</strong></li>
  <li>Partial disability (one eye/one limb): <strong>₹1 Lakh</strong></li>
  <li>Administered through: <strong>PSGICs (Public Sector General Insurance Companies)</strong></li>
</ul>
<p><strong>APY Key Facts:</strong></p>
<ul>
  <li>Administered by: <strong>PFRDA</strong></li>
  <li>Age: <strong>18–40 years</strong></li>
  <li>Pension at 60: <strong>₹1,000 to ₹5,000/month</strong></li>
  <li>Ineligible: <strong>Income-tax payers (from 01.10.2022)</strong></li>
  <li>6 months default → <strong>Frozen</strong></li>
  <li>12 months → <strong>Deactivated</strong></li>
  <li>24 months → <strong>Closed</strong></li>
</ul>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 6. POSTAL LIFE INSURANCE (PLI) — ALL 6 SCHEMES
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Postal Life Insurance (PLI) — All 6 Schemes Decoded",
        rule_number: "Rule 6 & Rule 7",
        act_name: "Post Office Life Insurance Rules, 2011",
        category: "Rule",
        effective_date: new Date("2011-01-01"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>Post Office Life Insurance Rules, 2011</strong></p>
<p>Postal Life Insurance (PLI) was originally introduced on <strong>1st February 1884</strong>. <strong>12th October</strong> is observed as <strong>PLI Day</strong>. Administration is vested in the <strong>Director General of Posts</strong>. The Central Processing Centre (CPC) is a branch of the <strong>Head Post Office</strong>.</p>
<h4>Eligibility (Rule 6) — Who Can Take PLI?</h4>
<ul>
  <li>Central &amp; State Government employees, Defence &amp; Para-Military Services</li>
  <li>PSUs, Banks, Educational Institutions, Local Bodies</li>
  <li>Professionals (Doctors, Engineers, CAs, MBAs, Lawyers, etc.)</li>
  <li>Employees of NSE/BSE listed companies</li>
  <li>Graduates/Diploma holders (Indian or foreign universities)</li>
</ul>
<h4>Key Definitions (Rule 5)</h4>
<ul>
  <li><strong>Auto Paid-up:</strong> Policy with ≥36 premiums paid AND ≥3 years duration, where further premiums are discontinued without intimation.</li>
  <li><strong>Free Look Period:</strong> <strong>15 days</strong> from delivery of policy document — can cancel within this period.</li>
  <li><strong>Lapsing of Policy:</strong> &lt;3 years: &gt;6 unpaid premia → lapses | ≥3 years: &gt;12 unpaid premia → lapses</li>
  <li><strong>Surrender Value:</strong> Payable after <strong>36 premiums paid</strong> AND policy in force for <strong>36 months</strong>.</li>
  <li><strong>Period of Grace:</strong> Up to the <strong>last day of the calendar month</strong> for which premium is due.</li>
</ul>
<h4>The 6 PLI Schemes (Rule 7)</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Scheme</th><th style="border:1px solid #ccc;padding:6px">Name</th><th style="border:1px solid #ccc;padding:6px">Entry Age</th><th style="border:1px solid #ccc;padding:6px">Sum Assured</th><th style="border:1px solid #ccc;padding:6px">Special Feature</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">A</td><td style="border:1px solid #ccc;padding:6px"><strong>SURAKSHA</strong> (Whole Life)</td><td style="border:1px solid #ccc;padding:6px">19–55 yrs</td><td style="border:1px solid #ccc;padding:6px">₹20K – ₹50L</td><td style="border:1px solid #ccc;padding:6px">Payable at 80 or death; Premium paying age: 55/58/60</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">B</td><td style="border:1px solid #ccc;padding:6px"><strong>SUVIDHA</strong> (Convertible WLA)</td><td style="border:1px solid #ccc;padding:6px">19–50 yrs</td><td style="border:1px solid #ccc;padding:6px">₹20K – ₹50L</td><td style="border:1px solid #ccc;padding:6px">Option to convert to EA at end of 5 yrs (but not later than 6 yrs)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">C</td><td style="border:1px solid #ccc;padding:6px"><strong>SANTOSH</strong> (Endowment Assurance)</td><td style="border:1px solid #ccc;padding:6px">19–55 yrs</td><td style="border:1px solid #ccc;padding:6px">₹20K – ₹50L</td><td style="border:1px solid #ccc;padding:6px">Matures at age 35/40/45/50/55/58/60</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">D</td><td style="border:1px solid #ccc;padding:6px"><strong>YUGAL SURAKSHA</strong> (Joint Life)</td><td style="border:1px solid #ccc;padding:6px">21–45 yrs (both spouses)</td><td style="border:1px solid #ccc;padding:6px">₹20K – ₹50L</td><td style="border:1px solid #ccc;padding:6px">One spouse must be PLI eligible; policy term 5–20 yrs</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">E</td><td style="border:1px solid #ccc;padding:6px"><strong>SUMANGAL</strong> (Money Back)</td><td style="border:1px solid #ccc;padding:6px">19 min; 40 max (20yr); 45 max (15yr)</td><td style="border:1px solid #ccc;padding:6px">Max ₹50L</td><td style="border:1px solid #ccc;padding:6px">Periodic money-back payments + full SA at maturity</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">F</td><td style="border:1px solid #ccc;padding:6px"><strong>BAL JIVAN BIMA</strong> (Children Policy)</td><td style="border:1px solid #ccc;padding:6px">Child: 5–20 yrs; Parent: ≤45 yrs</td><td style="border:1px solid #ccc;padding:6px">Max ₹3L (or parent's SA)</td><td style="border:1px solid #ccc;padding:6px">Max 2 children; Premium waived on parent's death</td></tr>
</table>`,
        guru_explanation: `<p>PLI is a favourite exam topic. Here's how to master all 6 schemes with ease:</p>
<h4>Memory Aid for the 6 Schemes</h4>
<p><strong>S-S-S-Y-S-B</strong> → <strong>Suraksha, Suvidha, Santosh, Yugal Suraksha, Sumangal, Bal Jivan Bima</strong></p>
<h4>Key Comparisons</h4>
<p><strong>SURAKSHA vs SANTOSH:</strong></p>
<ul>
  <li>SURAKSHA = Whole Life → money comes at <strong>age 80</strong> or death</li>
  <li>SANTOSH = Endowment → money comes at a <strong>fixed maturity age</strong> (35/40/45/50/55/58/60)</li>
</ul>
<p><strong>SUVIDHA — The Convertible Scheme:</strong></p>
<ul>
  <li>Starts as a Whole Life policy (like Suraksha)</li>
  <li>Can be <strong>converted to an Endowment policy</strong> after 5 years but NOT later than 6 years</li>
  <li>If not converted within this window → it stays as Whole Life (treated as Suraksha)</li>
</ul>
<p><strong>SUMANGAL — Money Back Pattern:</strong></p>
<ul>
  <li><strong>15-year plan:</strong> 20% at end of 6th, 9th, 12th year → 40% + bonus at 15 years</li>
  <li><strong>20-year plan:</strong> 20% at end of 8th, 12th, 16th year → 40% + bonus at 20 years</li>
  <li>Death benefit = <strong>full SA + bonus</strong> regardless of money-back payments already made</li>
</ul>
<h4>Loan &amp; Surrender Rules</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Scheme</th><th style="border:1px solid #ccc;padding:6px">Loan Available After</th><th style="border:1px solid #ccc;padding:6px">Surrender Allowed After</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">SURAKSHA</td><td style="border:1px solid #ccc;padding:6px"><strong>4 years</strong></td><td style="border:1px solid #ccc;padding:6px"><strong>3 years</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">SUVIDHA</td><td style="border:1px solid #ccc;padding:6px"><strong>4 years</strong></td><td style="border:1px solid #ccc;padding:6px"><strong>3 years</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">SANTOSH</td><td style="border:1px solid #ccc;padding:6px"><strong>3 years</strong></td><td style="border:1px solid #ccc;padding:6px"><strong>3 years</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">YUGAL SURAKSHA</td><td style="border:1px solid #ccc;padding:6px"><strong>3 years</strong></td><td style="border:1px solid #ccc;padding:6px"><strong>3 years</strong></td></tr>
</table>`,
        practical_example: `<p><strong>Scenario 1 — Choosing the Right PLI Scheme:</strong> Sunita (age 30, government employee) wants an insurance policy that gives periodic cash payments during the policy term for her children's education milestones. Which PLI scheme suits her?</p>
<p><strong>Answer: SUMANGAL</strong> (Anticipated Endowment Assurance) — it provides periodic money-back payments at fixed intervals during the policy term.</p>
<p><strong>Scenario 2 — SUVIDHA Conversion:</strong> Ramesh takes a SUVIDHA policy at age 30. He wants to convert it to an Endowment policy. Until what age can he convert?</p>
<p><strong>Answer:</strong> He must convert within <strong>5 to 6 years</strong> from taking the policy (i.e., between age 35–36). After 6 years, the conversion option lapses and the policy remains as Whole Life Assurance.</p>
<p><strong>Scenario 3 — BAL JIVAN BIMA:</strong> Mohan has a PLI policy and wants to take a children's policy for his 3 children (ages 6, 9, and 14). How many children's policies can he get?</p>
<p><strong>Answer: Maximum 2 children.</strong> BAL JIVAN BIMA covers a maximum of 2 children of the policyholder. He can choose any 2 of his 3 children.</p>`,
        exam_insight: `<p><strong>Top PLI Facts for the Exam:</strong></p>
<ul>
  <li>PLI introduced: <strong>1st February 1884</strong></li>
  <li>PLI Day: <strong>12th October</strong></li>
  <li>Administered by: <strong>Director General of Posts</strong></li>
  <li>Free Look Period: <strong>15 days</strong></li>
  <li>Max SA for all PLI schemes (except Bal Jivan Bima): <strong>₹50 Lakhs</strong></li>
  <li>Bal Jivan Bima max SA: <strong>₹3 Lakhs</strong> (or parent's SA, whichever is less)</li>
  <li>Surrender value: After <strong>36 premiums + 36 months</strong></li>
  <li>Lapsing (<lt;3 yrs): after <strong>6 unpaid premiums</strong></li>
  <li>Lapsing (≥3 yrs): after <strong>12 unpaid premiums</strong></li>
  <li>SURAKSHA: Loan after <strong>4 years</strong> | SANTOSH: Loan after <strong>3 years</strong></li>
  <li>SUVIDHA conversion window: <strong>end of 5th year to end of 6th year</strong></li>
</ul>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 7. POST OFFICE RECURRING DEPOSIT (RD) — NATIONAL SAVINGS RD SCHEME 2019
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Recurring Deposit (RD) — Complete Rules",
        rule_number: "National Savings RD Scheme, 2019",
        act_name: "National Savings Recurring Deposit Scheme, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>National Savings Recurring Deposit Account Scheme, 2019</strong></p>
<p>Authority: Notified vide G.S.R. 918(E) dated <strong>12.12.2019</strong>, amended vide G.S.R. 285(E) dated <strong>05.05.2020</strong>.</p>
<h4>Account Opening</h4>
<ul>
  <li>Single adult, up to three adults jointly, guardian on behalf of minor/person of unsound mind</li>
  <li>Minor above <strong>10 years</strong> may open in his own name</li>
  <li>An individual may have <strong>more than one account</strong></li>
</ul>
<h4>Maturity Period</h4>
<p><strong>5 years</strong> (60 monthly deposits)</p>
<h4>Deposits</h4>
<ul>
  <li>Minimum: <strong>₹100 per month</strong> (multiples of ₹10)</li>
  <li>No maximum limit</li>
  <li>If opened between 1st–15th: subsequent deposits by <strong>15th</strong> of each month</li>
  <li>If opened between 16th–last working day: subsequent deposits by <strong>last working day</strong> of each month</li>
</ul>
<h4>Default Fee</h4>
<p><strong>₹1 per ₹100</strong> of defaulted instalment per month of default.</p>
<h4>Rules for Defaults</h4>
<ul>
  <li>Up to <strong>4 defaults</strong>: account continues; maturity extended by equal number of months</li>
  <li>More than <strong>4 defaults</strong>: account becomes <strong>Discontinued</strong></li>
  <li><strong>Revival:</strong> within <strong>2 months</strong> from the month of the 4th default</li>
</ul>
<h4>Loan Facility</h4>
<ul>
  <li>Eligible after <strong>1 year</strong> of opening AND <strong>12 monthly deposits</strong> made</li>
  <li>Maximum loan: <strong>50%</strong> of balance at credit</li>
  <li>Interest: <strong>RD rate + 2% per annum</strong> (simple interest)</li>
</ul>
<h4>Premature Closure</h4>
<p>Permitted after <strong>3 years</strong>. Interest paid at Post Office Savings Account (POSA) rate.</p>
<h4>Extension After Maturity</h4>
<p>Can be extended for a maximum <strong>5 years</strong> after maturity. Extended account can be closed at any time during the extended period.</p>`,
        guru_explanation: `<p>RD is a disciplined savings tool — you deposit a fixed amount monthly and get it back with interest after 5 years. Key things to master:</p>
<h4>The Default Rules — Most Tested!</h4>
<p>Think of defaults like a traffic signal:</p>
<ul>
  <li><strong>1–4 defaults (Yellow):</strong> Account continues. Maturity extended by equal months. Pay default fee.</li>
  <li><strong>More than 4 defaults (Red):</strong> Account is DISCONTINUED. Must be revived within 2 months of the 4th default. If not revived, it stays discontinued.</li>
</ul>
<h4>Protected Savings Scheme (PSS) — Very Special!</h4>
<p>If an RD account holder <strong>dies</strong>, his family can claim the <strong>full maturity value</strong> (even if the account hasn't completed 5 years), provided these conditions are met:</p>
<ul>
  <li>Account NOT discontinued</li>
  <li>Account was in operation for at least <strong>2 years</strong> from date of opening</li>
  <li>Holder's age at opening: <strong>18 to 55 years</strong></li>
  <li>First <strong>24 monthly deposits</strong> made without any default</li>
  <li><strong>No loan</strong> during the first 24 months</li>
  <li>Claim made within <strong>1 year</strong> of death</li>
</ul>
<h4>Advance Deposit Rebate</h4>
<p>If you deposit 6 or more months in advance, you get a rebate. For example, 60 advance deposits (full 5 years prepaid) gets a rebate of <strong>₹200 per ₹100 denomination</strong>.</p>`,
        practical_example: `<p><strong>Scenario 1 — Default Calculation:</strong> Sunita missed her RD deposits for 5 months. What happens?</p>
<p><strong>Answer:</strong> More than 4 defaults → account becomes <strong>Discontinued</strong>. She has <strong>2 months from the 4th default</strong> to revive the account by paying all defaulted instalments plus default fee of ₹1 per ₹100 per month of default.</p>
<p><strong>Scenario 2 — Loan on RD:</strong> Ravi opened an RD account 18 months ago with ₹500/month. He has a balance of ₹9,000. He needs a loan urgently.</p>
<p><strong>Analysis:</strong> He is eligible for a loan (account is over 1 year AND 12+ deposits made). Maximum loan = 50% of ₹9,000 = <strong>₹4,500</strong>. Interest on loan = RD rate + 2% p.a.</p>
<p><strong>Scenario 3 — PSS Claim:</strong> Gopal (age 35 at opening) opened an RD in 2021, made 28 deposits regularly without any loan or default, and died in 2024. Can his family claim full maturity value?</p>
<p><strong>Answer: YES.</strong> All PSS conditions are met — account not discontinued, 2+ years old, age 18–55 at opening, first 24 deposits without default, no loan in first 24 months. Claim must be filed within 1 year of death.</p>`,
        exam_insight: `<p><strong>Critical RD Facts for the Exam:</strong></p>
<ul>
  <li>Maturity: <strong>5 years (60 monthly deposits)</strong></li>
  <li>Minimum monthly deposit: <strong>₹100 (multiples of ₹10)</strong></li>
  <li>Default fee: <strong>₹1 per ₹100 per month</strong></li>
  <li>Defaults allowed before discontinuation: <strong>4</strong></li>
  <li>Revival period after 4th default: <strong>2 months</strong></li>
  <li>Loan eligibility: after <strong>1 year + 12 deposits</strong></li>
  <li>Maximum loan: <strong>50% of balance</strong></li>
  <li>Loan interest: <strong>RD rate + 2%</strong></li>
  <li>Premature closure: after <strong>3 years</strong> (at POSA rate)</li>
  <li>Extension after maturity: up to <strong>5 years</strong></li>
  <li>PSS — minimum period for full maturity claim: <strong>2 years</strong> + first 24 deposits without default</li>
  <li>PSS — age eligibility at opening: <strong>18–55 years</strong></li>
</ul>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 8. POST OFFICE TIME DEPOSIT (TD) — NATIONAL SAVINGS TD SCHEME 2019
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Time Deposit (TD) — National Savings TD Scheme 2019",
        rule_number: "National Savings Time Deposit Scheme, 2019",
        act_name: "National Savings Time Deposit Scheme, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>National Savings Time Deposit Account Scheme, 2019</strong></p>
<p>Authority: Notified vide G.S.R. 922(E) dated <strong>12.12.2019</strong>, amended vide G.S.R. 289(E) dated <strong>05.05.2020</strong>.</p>
<h4>Categories of Accounts</h4>
<ul>
  <li><strong>1-Year Account</strong></li>
  <li><strong>2-Year Account</strong></li>
  <li><strong>3-Year Account</strong></li>
  <li><strong>5-Year Account</strong></li>
</ul>
<h4>Deposit Limits</h4>
<ul>
  <li>Minimum: <strong>₹1,000</strong> (in multiples of ₹100)</li>
  <li>Maximum: <strong>No limit</strong></li>
  <li>An individual may hold more than one account</li>
</ul>
<h4>Interest</h4>
<ul>
  <li>Compounded on a <strong>quarterly basis</strong>, payable to the account holder at the <strong>end of each year</strong></li>
  <li>No additional interest if annual interest is not withdrawn</li>
  <li>5-year TD qualifies for deduction under <strong>Section 80C</strong> of Income Tax Act</li>
</ul>
<h4>Extension of Account</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Account Type</th><th style="border:1px solid #ccc;padding:6px">Extension Window (from maturity)</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">1-Year TD</td><td style="border:1px solid #ccc;padding:6px"><strong>6 months</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">2-Year TD</td><td style="border:1px solid #ccc;padding:6px"><strong>12 months</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">3-Year TD</td><td style="border:1px solid #ccc;padding:6px"><strong>18 months</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">5-Year TD</td><td style="border:1px solid #ccc;padding:6px"><strong>18 months</strong></td></tr>
</table>
<p>Account holder may extend <strong>only twice</strong> after the initial maturity date.</p>
<h4>Premature Closure</h4>
<p>No deposit shall be withdrawn before expiry of <strong>6 months</strong>.</p>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Category &amp; Period</th><th style="border:1px solid #ccc;padding:6px">Interest Payable</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">All categories — After 6M but before 1 Year</td><td style="border:1px solid #ccc;padding:6px">POSA rate</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">2-Year TD — After 1Y but before 2Y</td><td style="border:1px solid #ccc;padding:6px">1-Year TD rate minus 2%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">3-Year TD — After 1Y but before 2Y</td><td style="border:1px solid #ccc;padding:6px">1-Year TD rate minus 2%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">3-Year TD — After 2Y but before 3Y</td><td style="border:1px solid #ccc;padding:6px">2-Year TD rate minus 2%</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">5-Year TD — After 4 Years</td><td style="border:1px solid #ccc;padding:6px">3-Year TD rate (applicable)</td></tr>
</table>
<h4>Special Provision for 5-Year TD (w.e.f. 10.11.2023 — SB Order 22/2023)</h4>
<p>For 5-Year TD accounts opened on or after 10.11.2023: Premature closure is <strong>NOT allowed before 4 years</strong>. Only after 4 years, premature closure permitted at POSA rate.</p>`,
        guru_explanation: `<p>Time Deposit is Post Office's Fixed Deposit — you lock in a lump sum for 1/2/3/5 years and earn interest. Here are the key insights:</p>
<h4>The 5-Year TD is Special</h4>
<ul>
  <li>It is the <strong>only TD category with Section 80C tax benefit</strong></li>
  <li>From 10.11.2023 (SB Order 22/2023), it has a <strong>lock-in of 4 years</strong> — premature closure is not allowed before 4 years</li>
  <li>This was a major amendment — very likely to be tested</li>
</ul>
<h4>Post Maturity Interest</h4>
<p>If the account holder does NOT extend the account within the extension window, <strong>Post Maturity Interest (PMI)</strong> is paid from the date of maturity to the date of payment — but only at the <strong>POSA rate</strong> (4% p.a.), not the TD rate.</p>
<h4>Key Comparison with Bank FD</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">PO Time Deposit</th><th style="border:1px solid #ccc;padding:6px">Bank FD</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Minimum</td><td style="border:1px solid #ccc;padding:6px">₹1,000</td><td style="border:1px solid #ccc;padding:6px">Varies (usually ₹1,000)</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Max</td><td style="border:1px solid #ccc;padding:6px">No limit</td><td style="border:1px solid #ccc;padding:6px">No limit</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Govt guarantee</td><td style="border:1px solid #ccc;padding:6px">Yes (sovereign guarantee)</td><td style="border:1px solid #ccc;padding:6px">DICGC up to ₹5L</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">80C benefit</td><td style="border:1px solid #ccc;padding:6px">Only 5-year TD</td><td style="border:1px solid #ccc;padding:6px">Only 5-year FD</td></tr>
</table>`,
        practical_example: `<p><strong>Scenario 1 — Early Withdrawal:</strong> Priya invested ₹50,000 in a 3-Year TD on 01.04.2022. She wants to close it on 15.06.2024 (after 2 years 2 months). What interest does she get?</p>
<p><strong>Answer:</strong> After 2 years but before 3 years for a 3-Year TD → interest paid at <strong>2-Year TD rate minus 2%</strong>.</p>
<p><strong>Scenario 2 — 5-Year TD Lock-in:</strong> Ramesh opened a 5-Year TD on 01.01.2024. He wants to close it on 01.01.2027 (after 3 years). Is premature closure allowed?</p>
<p><strong>Answer: NO</strong> — For 5-Year TDs opened on/after 10.11.2023, premature closure is NOT allowed before <strong>4 years</strong> (SB Order 22/2023).</p>
<p><strong>Scenario 3 — Extension:</strong> Sunita has a 2-Year TD that matured on 01.03.2025. Until when can she exercise the extension option?</p>
<p><strong>Answer:</strong> She has <strong>12 months</strong> from maturity — until 01.03.2026 — to exercise the extension option.</p>`,
        exam_insight: `<p><strong>Critical TD Facts for the Exam:</strong></p>
<ul>
  <li>TD categories: <strong>1, 2, 3, and 5 years</strong></li>
  <li>Minimum deposit: <strong>₹1,000</strong> (multiples of ₹100)</li>
  <li>Interest: compounded <strong>quarterly</strong>, paid <strong>annually</strong></li>
  <li>Tax benefit under 80C: <strong>only 5-year TD</strong></li>
  <li>No premature closure: before <strong>6 months</strong></li>
  <li>Special rule (5-yr TD opened on/after 10.11.2023): no premature closure before <strong>4 years</strong></li>
  <li>Extension allowed: <strong>twice</strong> after initial maturity</li>
  <li>Extension window — 1-yr TD: <strong>6 months</strong> | 2-yr: <strong>12 months</strong> | 3-yr &amp; 5-yr: <strong>18 months</strong></li>
  <li>Post-maturity interest (if not extended): at <strong>POSA rate (4%)</strong></li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-top:10px">
  <strong>HOT AMENDMENT (SB Order 22/2023):</strong> 5-Year TDs opened on or after <strong>10.11.2023</strong> cannot be closed before <strong>4 years</strong> — this is a new restriction not present in earlier rules. Always check the account's opening date!
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 9. POST OFFICE MONTHLY INCOME SCHEME (MIS)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Monthly Income Scheme (MIS) — Complete Rules",
        rule_number: "National Savings (MIA) Scheme, 2019",
        act_name: "National Savings (Monthly Income Account) Scheme, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B", "GDS"],
        official_text: `<p><strong>National Savings (Monthly Income Account) Scheme, 2019</strong></p>
<p>Authority: Notified vide G.S.R. 917(E) dated <strong>12.12.2019</strong>, amended vide G.S.R. 286(E) dated <strong>05.05.2020</strong>.</p>
<h4>Account Opening</h4>
<ul>
  <li>Single adult, up to three adults in joint names, minor above 10 years, guardian on behalf of minor/unsound mind</li>
  <li>An individual may hold more than one account subject to the maximum deposit limit</li>
  <li>Share of account holder in a joint account: <strong>one-half</strong> (2 adults) or <strong>one-third</strong> (3 adults) for computing individual ceiling</li>
</ul>
<h4>Deposit Limits</h4>
<ul>
  <li>Minimum: <strong>₹1,000</strong> (in multiples of ₹1,000)</li>
  <li>Maximum — Single Account: <strong>₹9,00,000</strong></li>
  <li>Maximum — Joint Account: <strong>₹15,00,000</strong></li>
</ul>
<div style="background:#fef9c3;border-left:4px solid #eab308;padding:10px;border-radius:4px;margin:10px 0">
  <strong>LEGISLATIVE NOTE:</strong> Limits enhanced to ₹9 Lakh (Single) and ₹15 Lakh (Joint) w.e.f. <strong>01.04.2023</strong> (earlier: ₹4.5L Single, ₹9L Joint).
</div>
<h4>Maturity Period</h4>
<p><strong>5 years</strong> from the date of opening.</p>
<h4>Interest</h4>
<ul>
  <li>Interest payable monthly on completion of one month from date of deposit</li>
  <li>Unclaimed monthly interest does <strong>not earn additional interest</strong></li>
  <li>If deposit made on 29th/30th/31st and following month lacks that date → interest paid on the <strong>last date</strong> of following month</li>
</ul>
<h4>Premature Closure</h4>
<p>Permitted after <strong>1 year</strong>. Deduction from deposit:</p>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Premature Closure Period</th><th style="border:1px solid #ccc;padding:6px">Deduction from Principal</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">On or before 3 years</td><td style="border:1px solid #ccc;padding:6px"><strong>2% of deposit</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">After 3 years</td><td style="border:1px solid #ccc;padding:6px"><strong>1% of deposit</strong></td></tr>
</table>`,
        guru_explanation: `<p>MIS is the go-to scheme for people who want a <strong>regular monthly income</strong> from a lump sum investment. Here's the complete picture:</p>
<h4>How MIS Works — In Plain Language</h4>
<p>You deposit a lump sum once. Every month, the Post Office pays you <strong>interest as cash</strong> (unlike NSC/PPF where interest is added back). After 5 years, you get your principal back. Perfect for retirees or anyone needing monthly cash flow.</p>
<h4>The 2023 Limit Hike — MUST Know!</h4>
<p>Before 01.04.2023, the limits were ₹4.5L (single) and ₹9L (joint). They were <strong>doubled</strong> w.e.f. 01.04.2023:</p>
<ul>
  <li><strong>Single: ₹9 Lakh</strong></li>
  <li><strong>Joint: ₹15 Lakh</strong></li>
</ul>
<h4>Why No Bonus at Maturity?</h4>
<p>Earlier MIS had a 5% bonus on maturity. This was <strong>discontinued</strong> from 01.12.2011. Now, you simply get your principal back at maturity — no bonus.</p>
<h4>Premature Closure Logic</h4>
<p>If you close before 3 years → deduction of 2%. After 3 years → 1%. The deduction is from the <strong>principal amount</strong>, not from interest paid. Minimum holding: <strong>1 year</strong> (no premature closure before 1 year).</p>
<h4>Monthly Interest Not Claimed</h4>
<p>If you don't withdraw your monthly interest, it simply stays in the account but <strong>does not compound</strong>. It earns no further interest. This distinguishes MIS from RD/PPF where interest reinvests automatically.</p>`,
        practical_example: `<p><strong>Scenario 1 — Monthly Income Calculation:</strong> Retired Laxmibai deposits ₹9,00,000 (maximum) in PO MIS at 7.4% p.a. (current rate). What monthly income does she get?</p>
<p><strong>Calculation:</strong> Monthly interest = ₹9,00,000 × 7.4% ÷ 12 = ₹9,00,000 × 0.074 ÷ 12 = <strong>₹5,550 per month</strong>.</p>
<p><strong>Scenario 2 — Premature Closure Penalty:</strong> Arun deposited ₹5,00,000 in MIS on 01.06.2022. He closes it on 01.09.2024 (after 2 years 3 months, which is before 3 years). What is the deduction?</p>
<p><strong>Answer:</strong> 2% of ₹5,00,000 = <strong>₹10,000 deducted</strong> from principal. He gets ₹4,90,000 back.</p>
<p><strong>Scenario 3 — Joint Account Limit:</strong> A husband (H) and wife (W) open a joint MIS account with H as first holder. They deposit ₹15,00,000. H also wants to open a separate single account. Can he?</p>
<p><strong>Answer: YES, but limited.</strong> H's share in joint account = ₹15,00,000 ÷ 2 = ₹7,50,000. Maximum single-account limit = ₹9,00,000. So H can deposit up to ₹9,00,000 − ₹7,50,000 = <strong>₹1,50,000</strong> in his individual account.</p>`,
        exam_insight: `<p><strong>Critical MIS Facts for the Exam:</strong></p>
<ul>
  <li>Maturity: <strong>5 years</strong></li>
  <li>Minimum deposit: <strong>₹1,000</strong> (in multiples of ₹1,000)</li>
  <li>Max — Single: <strong>₹9,00,000</strong> (enhanced w.e.f. 01.04.2023)</li>
  <li>Max — Joint: <strong>₹15,00,000</strong> (enhanced w.e.f. 01.04.2023)</li>
  <li>Interest: paid <strong>monthly</strong></li>
  <li>Unclaimed monthly interest: <strong>earns NO additional interest</strong></li>
  <li>Premature closure: allowed after <strong>1 year</strong></li>
  <li>Deduction ≤ 3 years: <strong>2%</strong> of deposit</li>
  <li>Deduction &gt; 3 years: <strong>1%</strong> of deposit</li>
  <li>Bonus at maturity: <strong>NIL</strong> (discontinued from 01.12.2011)</li>
  <li>80C benefit: <strong>NIL</strong> (MIS does not qualify for 80C)</li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-top:10px">
  <strong>COMMON MISTAKE:</strong> "MIS gives 5% bonus at maturity" — <strong>FALSE</strong> since 01.12.2011. Also: "MIS interest compounded monthly" — <strong>FALSE</strong>. Interest is <em>paid</em> monthly, not compounded.
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 10. SENIOR CITIZENS SAVINGS SCHEME (SCSS)
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "Senior Citizens Savings Scheme (SCSS) — Complete Rules",
        rule_number: "Senior Citizen Savings Scheme, 2019",
        act_name: "Senior Citizen Savings Scheme, 2019",
        category: "Rule",
        effective_date: new Date("2019-12-12"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<p><strong>Senior Citizen Savings Scheme (SCSS), 2019</strong></p>
<p>Authority: Notified vide G.S.R. 916(E) dated <strong>12.12.2019</strong>, amended vide G.S.R. 287(E) dated <strong>05.05.2020</strong>.</p>
<h4>Eligibility — Who Can Open?</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Category</th><th style="border:1px solid #ccc;padding:6px">Minimum Age</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Normal (any Indian citizen)</td><td style="border:1px solid #ccc;padding:6px"><strong>60 years</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Retired on Superannuation (Civil Services)</td><td style="border:1px solid #ccc;padding:6px"><strong>55 years</strong> but less than 60 years</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Retired Personnel of Defence Services</td><td style="border:1px solid #ccc;padding:6px"><strong>50 years</strong></td></tr>
</table>
<ul>
  <li>Retired civil servants: must open within <strong>3 months</strong> of receiving retirement benefits</li>
  <li>Joint account: only with <strong>spouse</strong> (no age limit for second applicant)</li>
  <li>An individual may hold more than one account subject to maximum deposit limit</li>
</ul>
<h4>Deposit Limits</h4>
<ul>
  <li>Minimum: <strong>₹1,000</strong> (in multiples of ₹1,000)</li>
  <li>Maximum: <strong>₹30,00,000</strong> (enhanced from ₹15L w.e.f. <strong>01.04.2023</strong>)</li>
  <li>Deposits restricted to <strong>retirement benefits received</strong> or ₹30 Lakh, whichever is lower</li>
</ul>
<h4>Interest Payment</h4>
<ul>
  <li>Payable <strong>quarterly</strong> on 1st working day of April, July, October, January</li>
  <li>Unclaimed quarterly interest: <strong>does NOT earn additional interest</strong></li>
</ul>
<h4>Premature Closure</h4>
<p>Account holder may close at <strong>any time</strong>.</p>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Period</th><th style="border:1px solid #ccc;padding:6px">Deduction</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Before 1 Year</td><td style="border:1px solid #ccc;padding:6px">Interest paid so far will be <strong>recovered</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">After 1 Year but before 2 Years</td><td style="border:1px solid #ccc;padding:6px"><strong>1.5%</strong> of deposit</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">After 2 Years</td><td style="border:1px solid #ccc;padding:6px"><strong>1%</strong> of deposit</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Extended account closed before 1 Year</td><td style="border:1px solid #ccc;padding:6px"><strong>1%</strong> of deposit</td></tr>
</table>
<h4>Extension After Maturity</h4>
<ul>
  <li>Account matures in <strong>5 years</strong></li>
  <li>Can be extended for a <strong>block period of 3 years</strong> within <strong>1 year</strong> from maturity</li>
  <li>Extended account: can be closed any time <strong>after 1 year</strong> from extension date, without deduction</li>
</ul>`,
        guru_explanation: `<p>SCSS is the <strong>highest-interest, government-backed savings scheme</strong> for senior citizens. Here's what you must master:</p>
<h4>The Three Age Tiers — Exam Favourite</h4>
<ul>
  <li><strong>60+ years</strong> — Any resident Indian</li>
  <li><strong>55–59 years</strong> — Retired civil servants on superannuation (must open within 3 months)</li>
  <li><strong>50+ years</strong> — Retired Defence personnel (must open within 3 months)</li>
</ul>
<h4>The ₹30 Lakh Cap (2023 Amendment)</h4>
<p>Before 01.04.2023, the maximum was ₹15 Lakh. It was <strong>doubled to ₹30 Lakh</strong> w.e.f. 01.04.2023 by the Finance Ministry. This is a very commonly tested fact.</p>
<h4>Spouse's Rights — Death of Account Holder</h4>
<p>If the account holder dies and the sole nominee is the spouse, the <strong>spouse may continue the SCSS account</strong> on the same terms — even if the spouse is below 60 years — provided the spouse meets eligibility on the date of the account holder's death.</p>
<p>However, if <strong>both spouses have separate SCSS accounts</strong> and one dies, the deceased's account must be <strong>closed</strong> (cannot be continued by the surviving spouse).</p>
<h4>SCSS vs MIS — A Quick Comparison</h4>
<table style="width:100%;border-collapse:collapse">
  <tr><th style="border:1px solid #ccc;padding:6px">Feature</th><th style="border:1px solid #ccc;padding:6px">SCSS</th><th style="border:1px solid #ccc;padding:6px">MIS</th></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Interest payment</td><td style="border:1px solid #ccc;padding:6px"><strong>Quarterly</strong></td><td style="border:1px solid #ccc;padding:6px"><strong>Monthly</strong></td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Maturity</td><td style="border:1px solid #ccc;padding:6px">5 years</td><td style="border:1px solid #ccc;padding:6px">5 years</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Max (single)</td><td style="border:1px solid #ccc;padding:6px">₹30 Lakh</td><td style="border:1px solid #ccc;padding:6px">₹9 Lakh</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Extension</td><td style="border:1px solid #ccc;padding:6px">3-year blocks</td><td style="border:1px solid #ccc;padding:6px">No extension</td></tr>
  <tr><td style="border:1px solid #ccc;padding:6px">Age restriction</td><td style="border:1px solid #ccc;padding:6px">Senior citizens only</td><td style="border:1px solid #ccc;padding:6px">Any adult</td></tr>
</table>`,
        practical_example: `<p><strong>Scenario 1 — Defence Retiree:</strong> Colonel Sharma retired from the Indian Army at age 52 in March 2025. He wants to invest his retirement gratuity in SCSS. Is he eligible?</p>
<p><strong>Answer: YES.</strong> Defence retired personnel can open SCSS at 50+ years. He must open the account within <strong>3 months</strong> of receiving his retirement benefits.</p>
<p><strong>Scenario 2 — Maximum Deposit:</strong> A retired civil servant aged 58 received retirement benefits of ₹35 Lakh. How much can he deposit in SCSS?</p>
<p><strong>Answer: ₹30 Lakh.</strong> The cap is ₹30 Lakh or retirement benefits received, whichever is lower. His benefits (₹35L) exceed ₹30L, so he can deposit only ₹30 Lakh.</p>
<p><strong>Scenario 3 — Premature Closure:</strong> Mrs. Patel opened SCSS in January 2023. She wants to close it in June 2025 (after 2 years 5 months). What deduction applies?</p>
<p><strong>Answer: 1% of deposit</strong> (after 2 years, deduction is 1% of the deposit amount from principal).</p>`,
        exam_insight: `<p><strong>Critical SCSS Facts for the Exam:</strong></p>
<ul>
  <li>Maturity: <strong>5 years</strong></li>
  <li>Extension: <strong>3-year blocks</strong> (apply within 1 year of maturity)</li>
  <li>Min deposit: <strong>₹1,000</strong></li>
  <li>Max deposit: <strong>₹30,00,000</strong> (enhanced from ₹15L w.e.f. <strong>01.04.2023</strong>)</li>
  <li>Interest payment: <strong>Quarterly</strong> (April, July, October, January)</li>
  <li>Normal eligibility: <strong>60 years</strong></li>
  <li>Civil servant superannuation: <strong>55 years</strong> (open within 3 months)</li>
  <li>Defence retiree: <strong>50 years</strong> (open within 3 months)</li>
  <li>Premature before 1 year: <strong>interest recovered</strong></li>
  <li>Premature 1–2 years: <strong>1.5%</strong> deduction</li>
  <li>Premature after 2 years: <strong>1%</strong> deduction</li>
  <li>Joint account: only with <strong>spouse</strong></li>
</ul>
<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:10px;border-radius:4px;margin-top:10px">
  <strong>KEY AMENDMENT 2023:</strong> Maximum SCSS limit doubled to <strong>₹30 Lakh</strong> from ₹15 Lakh, effective <strong>01.04.2023</strong>. Also, MIS limits were similarly doubled. Both are essential exam facts.
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    },

];

async function seedDakSutra3() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        let inserted = 0;
        let skipped = 0;

        for (const entry of entries) {
            const exists = await collection.findOne({ title: entry.title });
            if (exists) {
                console.log(`⏭️  Skipped (already exists): ${entry.title}`);
                skipped++;
            } else {
                await collection.insertOne(entry);
                console.log(`✅ Inserted: ${entry.title}`);
                inserted++;
            }
        }

        console.log(`\n🎉 Done! Inserted: ${inserted} | Skipped: ${skipped}`);
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.close();
    }
}

seedDakSutra3();
