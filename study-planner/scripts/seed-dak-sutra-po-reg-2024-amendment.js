
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

    // ─────────────────────────────────────────────────────────────────────────
    // ENTRY 1 — PO REGULATIONS 2024 AMENDMENT: 10 MAJOR PRODUCT CHANGES
    // F. No. 27-19/2019-PO dated 27th March, 2026
    // ─────────────────────────────────────────────────────────────────────────
    {
        title: "PO Regulations 2024 — Major Changes in Postal Products (Amendment 27.03.2026)",
        rule_number: "F. No. 27-19/2019-PO dated 27.03.2026 | Effective: 16.12.2024",
        act_name: "The Post Office Regulations, 2024",
        category: "Circular",
        effective_date: new Date("2026-03-27"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff;padding:18px 24px;border-radius:12px;margin-bottom:24px">
    <div style="font-size:0.78rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;opacity:0.75;margin-bottom:4px">F. No. 27-19/2019-PO</div>
    <h2 style="margin:0 0 4px;font-size:1.25rem;font-weight:800">Ministry of Communications — Department of Posts</h2>
    <div style="font-size:0.9rem;opacity:0.88">Dak Bhawan, Sansad Marg, New Delhi-110001 &nbsp;|&nbsp; Dated: <strong>27th March, 2026</strong></div>
    <div style="margin-top:10px;background:rgba(255,255,255,0.12);border-radius:6px;padding:10px 14px;font-size:0.88rem">
      <strong>Subject:</strong> Post Office Regulations, 2024 — Compliance of the Revised Regulatory Framework for Registered Newspapers and Periodicals.
    </div>
  </div>

  <div style="background:#fffde7;border-left:5px solid #f9a825;border-radius:8px;padding:14px 18px;margin-bottom:22px">
    <p style="margin:0;font-size:0.93rem">As per this circular, with the implementation of the Post Office Regulations, 2024 (effective from <strong>16.12.2024</strong>), the definition of <em>"Newspaper"</em> and the eligibility criteria for registration have been revised. Only <strong>weekly publications dispatched in loosely folded bundles</strong> shall be categorized as Newspapers eligible for concessional newspaper tariffs.</p>
  </div>

  <h3 style="color:#1a237e;border-left:5px solid #3f51b5;padding-left:12px;margin-top:24px">Major Changes in the PO Regulations, 2024 — At a Glance</h3>

  <div style="overflow-x:auto;margin-bottom:24px">
  <table style="width:100%;border-collapse:collapse;font-size:0.88rem;min-width:680px">
    <thead>
      <tr style="background:linear-gradient(90deg,#1a237e,#283593);color:#fff">
        <th style="border:1px solid #5c6bc0;padding:11px 14px;text-align:center;width:4%">#</th>
        <th style="border:1px solid #5c6bc0;padding:11px 14px;text-align:left;width:22%">Old Product Name</th>
        <th style="border:1px solid #5c6bc0;padding:11px 14px;text-align:left;width:18%">New Product Name</th>
        <th style="border:1px solid #5c6bc0;padding:11px 14px;text-align:left;width:34%">Features of New Product</th>
        <th style="border:1px solid #5c6bc0;padding:11px 14px;text-align:left;width:22%">Rationale</th>
      </tr>
    </thead>
    <tbody>

      <tr style="background:#f3e5f5">
        <td style="border:1px solid #ce93d8;padding:10px 12px;text-align:center;font-weight:800;color:#6a1b9a">1</td>
        <td style="border:1px solid #ce93d8;padding:10px 12px;color:#4a148c">PC, Reply PC, Printed PC, Competition PC, Meghdoot PC</td>
        <td style="border:1px solid #ce93d8;padding:10px 12px;font-weight:800;color:#6a1b9a">Postcard</td>
        <td style="border:1px solid #ce93d8;padding:10px 12px">One Rate @ <strong>₹0.50</strong> (50 paise)</td>
        <td style="border:1px solid #ce93d8;padding:10px 12px;font-style:italic;color:#6a1b9a">Multiplicity of products removed</td>
      </tr>

      <tr style="background:#e3f2fd">
        <td style="border:1px solid #90caf9;padding:10px 12px;text-align:center;font-weight:800;color:#0d47a1">2</td>
        <td style="border:1px solid #90caf9;padding:10px 12px;color:#0d47a1">Letters</td>
        <td style="border:1px solid #90caf9;padding:10px 12px;font-weight:800;color:#1565c0">Letters</td>
        <td style="border:1px solid #90caf9;padding:10px 12px">Weight limit reduced from <strong>2 kg</strong> to <strong>500 gms</strong></td>
        <td style="border:1px solid #90caf9;padding:10px 12px;font-style:italic;color:#1565c0">To differentiate between letter and parcel</td>
      </tr>

      <tr style="background:#e8f5e9">
        <td style="border:1px solid #a5d6a7;padding:10px 12px;text-align:center;font-weight:800;color:#1b5e20">3</td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px;color:#2e7d32">Book Packet containing printed Books, Pattern &amp; Sample Packet, Book Packet</td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px;font-weight:800;color:#1b5e20">Book Post</td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px">
          <ol style="margin:0;padding-left:18px">
            <li>All old types (Books, Patterns, Sample) merged into <strong>ONE</strong></li>
            <li><strong>No minimum</strong> items to be posted</li>
            <li>Printed books <strong>with advertisement</strong> can also be posted</li>
          </ol>
        </td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px;font-style:italic;color:#2e7d32">Ease of understanding; One Product One Need; avoid imposing penalties</td>
      </tr>

      <tr style="background:#fff8e1">
        <td style="border:1px solid #ffe082;padding:10px 12px;text-align:center;font-weight:800;color:#e65100">4</td>
        <td style="border:1px solid #ffe082;padding:10px 12px;color:#bf360c">Registered Parcel</td>
        <td style="border:1px solid #ffe082;padding:10px 12px;font-weight:800;color:#e65100">India Post Parcel — Retail</td>
        <td style="border:1px solid #ffe082;padding:10px 12px">
          <ol style="margin:0;padding-left:18px">
            <li>All registered parcel features kept</li>
            <li>Items above <strong>500 grams</strong> covered</li>
            <li><strong>Volumetric concept</strong> introduced (higher of gross or volumetric applies)</li>
            <li><strong>Merchandise declaration</strong> required</li>
            <li>Address specific delivery, COD, Insurance &amp; Proof of Delivery available</li>
          </ol>
        </td>
        <td style="border:1px solid #ffe082;padding:10px 12px;font-style:italic;color:#bf360c">Rationalize products to avoid confusion</td>
      </tr>

      <tr style="background:#fce4ec">
        <td style="border:1px solid #f48fb1;padding:10px 12px;text-align:center;font-weight:800;color:#880e4f">5</td>
        <td style="border:1px solid #f48fb1;padding:10px 12px;color:#880e4f">Business Parcel</td>
        <td style="border:1px solid #f48fb1;padding:10px 12px;font-weight:800;color:#ad1457">India Post Parcel — Contractual</td>
        <td style="border:1px solid #f48fb1;padding:10px 12px">
          <ol style="margin:0;padding-left:18px">
            <li>Bulk customer covered</li>
            <li>Bulk/contractual customer must execute <strong>agreement</strong></li>
            <li>Same value added services as Retail Parcel</li>
          </ol>
        </td>
        <td style="border:1px solid #f48fb1;padding:10px 12px;font-style:italic;color:#880e4f">Rationalize products to avoid confusion</td>
      </tr>

      <tr style="background:#e0f7fa">
        <td style="border:1px solid #80deea;padding:10px 12px;text-align:center;font-weight:800;color:#006064">6</td>
        <td style="border:1px solid #80deea;padding:10px 12px;color:#004d40">Indian Postal Order</td>
        <td style="border:1px solid #80deea;padding:10px 12px;font-weight:800;color:#006064">Indian Postal Order</td>
        <td style="border:1px solid #80deea;padding:10px 12px">
          <ul style="margin:0;padding-left:18px">
            <li>Denominations less than <strong>Rs. 10</strong> are <strong>discontinued</strong></li>
            <li>Now available in: <strong>Rs. 10, 20, 50 &amp; 100</strong></li>
          </ul>
        </td>
        <td style="border:1px solid #80deea;padding:10px 12px;font-style:italic;color:#006064">Smaller denominations not in usage</td>
      </tr>

      <tr style="background:#f3e5f5">
        <td style="border:1px solid #ce93d8;padding:10px 12px;text-align:center;font-weight:800;color:#4a148c">7</td>
        <td style="border:1px solid #ce93d8;padding:10px 12px;color:#4a148c">Registered Newspaper</td>
        <td style="border:1px solid #ce93d8;padding:10px 12px;font-weight:800;color:#6a1b9a">Registered Newspaper</td>
        <td style="border:1px solid #ce93d8;padding:10px 12px">
          <ol style="margin:0;padding-left:18px">
            <li>Newspaper means a publication of <strong>loose folded sheet</strong> brought daily or once a week (up to 7 days interval)</li>
            <li><strong>Cannot be posted in letter boxes</strong></li>
          </ol>
        </td>
        <td style="border:1px solid #ce93d8;padding:10px 12px;font-style:italic;color:#4a148c">Definition change under Press &amp; Registration of Periodicals Act, 2023</td>
      </tr>

      <tr style="background:#e8eaf6">
        <td style="border:1px solid #9fa8da;padding:10px 12px;text-align:center;font-weight:800;color:#1a237e">8</td>
        <td style="border:1px solid #9fa8da;padding:10px 12px;color:#283593">Book Packet containing Periodicals</td>
        <td style="border:1px solid #9fa8da;padding:10px 12px;font-weight:800;color:#1a237e">Periodical Post</td>
        <td style="border:1px solid #9fa8da;padding:10px 12px">
          <ol style="margin:0;padding-left:18px">
            <li>Periodical means any publication published and printed at <strong>regular intervals</strong></li>
            <li>Gap of <strong>&gt; 7 days</strong> of publishing a newspaper → treated as periodical and charged at <strong>periodical rates</strong></li>
            <li><strong>Cannot be posted in letter boxes</strong></li>
          </ol>
        </td>
        <td style="border:1px solid #9fa8da;padding:10px 12px;font-style:italic;color:#283593">Definition change through Press &amp; Registration of Periodicals Act, 2023</td>
      </tr>

      <tr style="background:#e8f5e9">
        <td style="border:1px solid #a5d6a7;padding:10px 12px;text-align:center;font-weight:800;color:#1b5e20">9</td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px;color:#2e7d32">Value Payable (VPP)</td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px;font-weight:800;color:#1b5e20">Cash on Delivery — Retail (COD)</td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px">
          <ul style="margin:0;padding-left:18px">
            <li>All features of VPP retained</li>
            <li>Max booking amount changed from <strong>Rs. 5,000</strong> to <strong>Rs. 10,000</strong></li>
          </ul>
        </td>
        <td style="border:1px solid #a5d6a7;padding:10px 12px;font-style:italic;color:#2e7d32">Products with similar features subsumed</td>
      </tr>

      <tr style="background:#fff3e0">
        <td style="border:1px solid #ffcc80;padding:10px 12px;text-align:center;font-weight:800;color:#bf360c">10</td>
        <td style="border:1px solid #ffcc80;padding:10px 12px;color:#e65100">Electronic Money Order (eMO)</td>
        <td style="border:1px solid #ffcc80;padding:10px 12px;font-weight:800;color:#bf360c">Money Order</td>
        <td style="border:1px solid #ffcc80;padding:10px 12px">
          <ol style="margin:0;padding-left:18px">
            <li>Single MO ≤ <strong>Rs. 10,000</strong> (Max limit Rs. 10,000)</li>
            <li>Monthly limit of <strong>Rs. 25,000</strong> per payee (Retail)</li>
            <li>Commission rate <strong>unchanged</strong></li>
            <li><strong>No commission</strong> for PM Relief Fund / PM CARES / CM Relief Fund</li>
          </ol>
        </td>
        <td style="border:1px solid #ffcc80;padding:10px 12px;font-style:italic;color:#bf360c">Rationalize different products to avoid confusion</td>
      </tr>

    </tbody>
  </table>
  </div>

  <div style="background:#e8eaf6;border-radius:8px;padding:12px 16px;font-size:0.85rem;color:#283593">
    <strong>Signed by:</strong> Pradeep Kr. Tyagi, Director (Postal Operations) &nbsp;|&nbsp; <strong>File No.:</strong> 27-19/2019-PO &nbsp;|&nbsp; <strong>Addressed to:</strong> All Chief Post Masters General
  </div>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border-left:5px solid #2e7d32;border-radius:10px;padding:16px 20px;margin-bottom:22px">
    <h3 style="color:#1b5e20;margin:0 0 8px">🧠 Dak Guru Decodes — Why This Circular Matters</h3>
    <p style="margin:0">This circular is a landmark update. It officially notifies the <strong>10 major product rationalization changes</strong> under the Post Office Regulations, 2024 (effective 16.12.2024). The key theme is: <em>"One Product One Need"</em> — multiple old products with overlapping features have been merged into single, clearly-named products. This is high-yield content for both LDCE IP and PS Group B exams.</p>
  </div>

  <h4 style="color:#1565c0;margin-bottom:6px">📬 1. Postcard — Simplest Change to Remember</h4>
  <p style="margin-top:0">Five old postcard variants (PC, Reply PC, Printed PC, Competition PC, Meghdoot PC) are all merged into a single <strong>Postcard at ₹0.50</strong>. The confusion of different cards with different rates ends here. <em>Remember: just ₹0.50 for any postcard.</em></p>

  <h4 style="color:#ad1457;margin-bottom:6px">✉️ 2. Letters — Weight Cap Cut to 500g</h4>
  <p style="margin-top:0">The weight limit for Letters has been drastically cut from 2 kg to <strong>500 grams</strong>. Anything above 500g must now go as a parcel (India Post Parcel). This is a trap question: <em>"What is the maximum weight of a letter under PO Regulations 2024?"</em> Answer: <strong>500 grams</strong>.</p>

  <h4 style="color:#1b5e20;margin-bottom:6px">📚 3. Book Post — No More Minimum, Ads Allowed</h4>
  <p style="margin-top:0">All three old book packet categories are merged into one <strong>Book Post</strong>. Two new liberalizations: (1) <strong>no minimum number of items</strong> required, and (2) books <em>with advertisements</em> can also be sent — a change from the earlier restriction.</p>

  <h4 style="color:#e65100;margin-bottom:6px">📦 4 & 5. India Post Parcel — Retail vs Contractual</h4>
  <p style="margin-top:0">The old <em>Registered Parcel</em> becomes <strong>India Post Parcel – Retail</strong> (for individuals). The old <em>Business Parcel</em> becomes <strong>India Post Parcel – Contractual</strong> (for bulk/business customers who sign agreements). Both have the same value-added services (COD, Insurance, Proof of Delivery), but <strong>contractual customers must execute a formal agreement</strong>. The <strong>volumetric weight concept</strong> is newly introduced — you will be charged on gross or volumetric weight, whichever is higher.</p>

  <h4 style="color:#006064;margin-bottom:6px">💵 6. Indian Postal Order — Only ₹10 and Above</h4>
  <p style="margin-top:0">All denominations below Rs. 10 have been scrapped. IPOs now come only in <strong>₹10, ₹20, ₹50, and ₹100</strong>. Smaller denominations were simply not being used in practice.</p>

  <div style="background:#fce4ec;border-left:5px solid #c62828;border-radius:8px;padding:14px 18px;margin:18px 0">
    <h4 style="color:#b71c1c;margin:0 0 10px">📰 7 & 8. The Newspaper vs. Periodical Distinction — MOST IMPORTANT CHANGE</h4>
    <p style="margin:0 0 10px"><strong>This is the core subject of the circular.</strong> The definitions now come from the <em>Press and Registration of Periodicals Act, 2023</em>:</p>
    <ul style="margin:0;padding-left:20px">
      <li><strong>Registered Newspaper</strong> = Only publications in <strong>loose folded sheets</strong>, published at intervals of <strong>up to 7 days</strong> (daily or weekly). These get concessional newspaper tariff.</li>
      <li><strong>Periodical Post</strong> = Any publication published at regular intervals with a gap of <strong>more than 7 days</strong> is treated as a <em>periodical</em> and charged at periodical rates (not newspaper rates).</li>
      <li><strong>BOTH cannot be posted in letter boxes</strong> — they must be posted at the counter.</li>
    </ul>
  </div>

  <h4 style="color:#2e7d32;margin-bottom:6px">💳 9. COD (Retail) — ₹10,000 Limit</h4>
  <p style="margin-top:0">The old Value Payable Post (VPP) is renamed <strong>Cash on Delivery (COD) — Retail</strong>. The maximum booking amount has doubled from <strong>Rs. 5,000 to Rs. 10,000</strong>. Everything else about VPP is retained.</p>

  <h4 style="color:#bf360c;margin-bottom:6px">💸 10. Money Order — Limits & Zero Commission Cases</h4>
  <p style="margin-top:0">The old eMO merges into a single <strong>Money Order</strong> product. Key figures to remember: Single MO cap = <strong>₹10,000</strong>; Monthly per-payee limit = <strong>₹25,000</strong>. Commission rate stays the same. Important: <strong>Zero commission</strong> for PM Relief Fund, PM CARES Fund, and CM Relief Fund remittances.</p>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:18px">
    <h4 style="color:#e65100;margin:0 0 10px">⚡ Quick Recap — The 10 Changes in 30 Seconds</h4>
    <ol style="margin:0;padding-left:20px;line-height:2">
      <li>Multiple postcards → <strong>One Postcard @ ₹0.50</strong></li>
      <li>Letters weight: 2 kg → <strong>500 gms</strong></li>
      <li>Book packets merged → <strong>Book Post</strong> (no minimum, ads allowed)</li>
      <li>Registered Parcel → <strong>IP Parcel – Retail</strong> (volumetric weight + merchandise declaration)</li>
      <li>Business Parcel → <strong>IP Parcel – Contractual</strong> (agreement needed)</li>
      <li>IPO denominations below ₹10 gone → only <strong>₹10, 20, 50, 100</strong></li>
      <li>Newspaper = loosely folded, <strong>≤ 7 days</strong> interval</li>
      <li>Periodical = <strong>&gt; 7 days</strong> interval, Periodical Post rates</li>
      <li>VPP → <strong>COD Retail</strong>, limit raised to <strong>₹10,000</strong></li>
      <li>eMO → <strong>Money Order</strong>, cap ₹10,000 / month ₹25,000</li>
    </ol>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c;margin-bottom:14px">📦 Scenario-Based Questions</h4>

  <div style="background:#e3f2fd;border-radius:8px;padding:12px 16px;margin-bottom:14px">
    <p style="margin:0"><strong>Q1.</strong> A publisher releases a magazine every Sunday (weekly). Is it a Newspaper or a Periodical under PO Regulations 2024?<br>
    → <strong>Registered Newspaper</strong> — published weekly (7-day interval), in loosely folded sheets. Eligible for concessional newspaper tariff.</p>
  </div>

  <div style="background:#fce4ec;border-radius:8px;padding:12px 16px;margin-bottom:14px">
    <p style="margin:0"><strong>Q2.</strong> A fortnightly magazine (published every 15 days) claims newspaper rates. Is it allowed?<br>
    → <strong>No</strong> — gap is more than 7 days, so it is a <strong>Periodical</strong> and must be sent under Periodical Post at periodical rates.</p>
  </div>

  <div style="background:#e8f5e9;border-radius:8px;padding:12px 16px;margin-bottom:14px">
    <p style="margin:0"><strong>Q3.</strong> A customer wants to send a letter weighing 700 grams. Can it be sent as a Letter?<br>
    → <strong>No</strong> — Letters under PO Regulations 2024 are limited to <strong>500 grams</strong>. It must be sent as an India Post Parcel.</p>
  </div>

  <div style="background:#fff8e1;border-radius:8px;padding:12px 16px;margin-bottom:14px">
    <p style="margin:0"><strong>Q4.</strong> A bulk book-seller wants to post sample books. Under old rules, he needed a minimum quantity. Is that still required?<br>
    → <strong>No</strong> — under Book Post (PO Regulations 2024), <strong>no minimum number of items</strong> is required to be posted.</p>
  </div>

  <div style="background:#f3e5f5;border-radius:8px;padding:12px 16px;margin-bottom:14px">
    <p style="margin:0"><strong>Q5.</strong> A customer sends a VPP (Value Payable) item worth Rs. 8,000 for COD collection. Is this permissible?<br>
    → <strong>Yes</strong> — under the new Cash on Delivery (Retail), the max booking amount is <strong>Rs. 10,000</strong>. Rs. 8,000 is within limit.</p>
  </div>

  <div style="background:#e0f7fa;border-radius:8px;padding:12px 16px;margin-bottom:14px">
    <p style="margin:0"><strong>Q6.</strong> A customer sends a donation of Rs. 5,000 through Money Order to the PM CARES Fund. How much commission is charged?<br>
    → <strong>Nil (Zero commission)</strong> — remittances to PM CARES Fund / PM Relief Fund / CM Relief Fund are exempt from commission.</p>
  </div>

  <div style="background:#fff3e0;border-radius:8px;padding:12px 16px;margin-bottom:14px">
    <p style="margin:0"><strong>Q7.</strong> A company dispatches 50 parcels daily. What type of parcel service do they use?<br>
    → <strong>India Post Parcel – Contractual</strong> — bulk/contractual customers must execute a formal agreement with the Department.</p>
  </div>

  <div style="background:#fce4ec;border-radius:8px;padding:12px 16px">
    <p style="margin:0"><strong>Q8.</strong> A parcel weighs 1 kg physically, but its dimensions give a volumetric weight of 1.5 kg. Which weight is used for tariff?<br>
    → <strong>1.5 kg (volumetric)</strong> — under India Post Parcel, the <em>higher</em> of gross or volumetric weight applies.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff;border-radius:10px;padding:14px 20px;margin-bottom:18px">
    <h4 style="margin:0 0 6px;font-size:1rem">📝 Exam Insight — PO Regulations 2024 Major Changes</h4>
    <p style="margin:0;font-size:0.88rem;opacity:0.88">High probability topics for LDCE IP &amp; PS Group B</p>
  </div>

  <div style="background:#e3f2fd;border-left:5px solid #1565c0;border-radius:8px;padding:14px 18px;margin-bottom:18px">
    <h4 style="color:#0d47a1;margin:0 0 12px">🔢 Critical Numbers to Memorise</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
      <thead>
        <tr style="background:#1565c0;color:#fff">
          <th style="border:1px solid #90caf9;padding:8px 12px">Item</th>
          <th style="border:1px solid #90caf9;padding:8px 12px">Old Value</th>
          <th style="border:1px solid #90caf9;padding:8px 12px">New Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:8px 12px">Postcard rate</td><td style="border:1px solid #bbdefb;padding:8px 12px">Multiple rates</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#0d47a1">₹0.50 (one rate)</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 12px">Letters weight limit</td><td style="border:1px solid #bbdefb;padding:8px 12px">2 kg</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#0d47a1">500 grams</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px 12px">IPO minimum denomination</td><td style="border:1px solid #bbdefb;padding:8px 12px">Below ₹10 (discontinued)</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#0d47a1">₹10, ₹20, ₹50, ₹100</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 12px">COD/VPP max booking amount</td><td style="border:1px solid #bbdefb;padding:8px 12px">₹5,000</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#0d47a1">₹10,000</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px 12px">Single Money Order limit</td><td style="border:1px solid #bbdefb;padding:8px 12px">—</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#0d47a1">₹10,000</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 12px">Monthly MO limit per payee</td><td style="border:1px solid #bbdefb;padding:8px 12px">—</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#0d47a1">₹25,000</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px 12px">Newspaper publishing interval</td><td style="border:1px solid #bbdefb;padding:8px 12px">—</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#c62828">≤ 7 days</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px 12px">Periodical (charged at periodical rates)</td><td style="border:1px solid #bbdefb;padding:8px 12px">—</td><td style="border:1px solid #bbdefb;padding:8px 12px;font-weight:bold;color:#c62828">&gt; 7 days gap</td></tr>
      </tbody>
    </table>
  </div>

  <div style="background:#fff3e0;border-left:5px solid #e65100;border-radius:8px;padding:14px 18px;margin-bottom:18px">
    <h4 style="color:#bf360c;margin:0 0 10px">⚡ Likely MCQ Traps</h4>
    <ul style="margin:0;padding-left:20px">
      <li>"Newspapers can be posted in letter boxes" → <strong>FALSE</strong> — neither Newspapers nor Periodicals can be posted in letter boxes</li>
      <li>"Monthly limit of Money Order is ₹10,000" → <strong>FALSE</strong> — ₹10,000 is per single MO; monthly limit is <strong>₹25,000</strong></li>
      <li>"Commission is charged for PM CARES remittances" → <strong>FALSE</strong> — <strong>No commission</strong> for relief fund MOs</li>
      <li>"Book Post requires minimum 5 items" → <strong>FALSE</strong> — <strong>no minimum</strong> since PO Regulations 2024</li>
      <li>"A 600g item can be sent as a Letter" → <strong>FALSE</strong> — Letters are now limited to <strong>500 grams</strong></li>
      <li>"A weekly magazine qualifies as Newspaper" → <strong>TRUE</strong> — only if dispatched in loosely folded bundles</li>
      <li>"Business Parcel customers need no agreement" → <strong>FALSE</strong> — contractual customers <strong>must execute agreement</strong></li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;border-radius:8px;padding:14px 18px">
    <h4 style="color:#1b5e20;margin:0 0 10px">🎯 Source Reference (for descriptive answers)</h4>
    <ul style="margin:0;padding-left:20px">
      <li><strong>File No.:</strong> 27-19/2019-PO</li>
      <li><strong>Date of circular:</strong> 27th March, 2026</li>
      <li><strong>Issued by:</strong> Director (Postal Operations), Dak Bhawan</li>
      <li><strong>PO Regulations 2024 effective from:</strong> 16th December, 2024</li>
      <li><strong>Definition source:</strong> Press and Registration of Periodicals Act, 2023</li>
      <li><strong>Theme:</strong> "One Product One Need" — product rationalization</li>
    </ul>
  </div>
</div>`
    }
];

async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('daksutras');

        let inserted = 0;
        let updated = 0;
        for (const entry of entries) {
            const existing = await collection.findOne({ title: entry.title });
            if (existing) {
                await collection.updateOne({ title: entry.title }, { $set: { ...entry, updatedAt: now } });
                console.log(`✅ Updated: ${entry.title}`);
                updated++;
                continue;
            }
            const result = await collection.insertOne({
                ...entry,
                createdAt: now,
                updatedAt: now
            });
            console.log(`✅ Inserted: ${entry.title} [${result.insertedId}]`);
            inserted++;
        }

        console.log(`\n🎉 Done! ${inserted} inserted, ${updated} updated.`);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
