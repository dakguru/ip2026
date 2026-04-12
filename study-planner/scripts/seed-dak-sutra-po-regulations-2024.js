
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

    // ─────────────────────────────────────────────────────────────────────────────
    // DAK SUTRA 1 — FOUNDATION & KEY DEFINITIONS (Regs 1–2)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "PO Regulations 2024 — Foundation, Structure & Key Definitions",
        rule_number: "Regulations 1 & 2",
        act_name: "The Post Office Regulations, 2024",
        category: "Regulation",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff;padding:18px 22px;border-radius:10px;margin-bottom:20px">
    <h2 style="margin:0;font-size:1.4rem;letter-spacing:1px">📜 THE POST OFFICE REGULATIONS, 2024</h2>
    <p style="margin:6px 0 0;font-size:0.95rem;opacity:0.9">Notified vide <strong>Notification No. S.O. 5440(E)</strong> dated <strong>16th December, 2024</strong></p>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-bottom:22px;font-size:0.95rem">
    <thead>
      <tr style="background:#e8eaf6;color:#1a237e">
        <th style="border:1.5px solid #9fa8da;padding:10px 14px;text-align:left">Attribute</th>
        <th style="border:1.5px solid #9fa8da;padding:10px 14px;text-align:left">Detail</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#283593">Parent Act</td><td style="border:1px solid #c5cae9;padding:9px 14px">Post Office Act, 2023 (Act No. 43 of 2023)</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#283593">Power under</td><td style="border:1px solid #c5cae9;padding:9px 14px">Section 13 of the Post Office Act, 2023</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#283593">Notification Date</td><td style="border:1px solid #c5cae9;padding:9px 14px">16th December, 2024</td></tr>
      <tr style="background:#f5f5ff"><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#283593">Commencement</td><td style="border:1px solid #c5cae9;padding:9px 14px">16th day of December, 2024</td></tr>
      <tr><td style="border:1px solid #c5cae9;padding:9px 14px;font-weight:bold;color:#283593">Structure</td><td style="border:1px solid #c5cae9;padding:9px 14px"><strong>15 Chapters, 180 Regulations, 5 Schedules</strong></td></tr>
    </tbody>
  </table>

  <h3 style="color:#c62828;border-left:5px solid #c62828;padding-left:12px">Regulation 2 — Key Definitions</h3>

  <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:18px">
    <thead>
      <tr style="background:#b71c1c;color:#fff">
        <th style="padding:10px 14px;border:1px solid #e57373;text-align:left;width:28%">Term</th>
        <th style="padding:10px 14px;border:1px solid #e57373;text-align:left">Definition (Verbatim)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Accountable Items</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Items that provide a receipt at the time of booking for track and trace (stage wise electronic data on movement of item) and require the signature (in ink or digital) of the addressee, the payee, or their authorised person upon receipt of an item, to provide evidence of delivery. <em>Includes: India Post Parcel, Speed Post, Magazine Post, International Speed Post Services (EMS), International Air Parcels, International Tracked Packets, International Registered Letter items, Money Order and items with value added services like registration, insurance and cash on delivery (COD).</em></td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Addressee</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">The intended recipient or the person to whom any item is to be delivered.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Authorised Person</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">A person, duly authorised by the addressee to receive the item or by a payee to receive the money on his behalf.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Delivery</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">The delivery of an item at the address of the addressee, or to the addressee or other person or location considered to be authorised to receive the item according to the usual manner of delivering items to the addressee.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">In Course of Transmission by Post</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">The period starting from receipt of an item by the post office to its delivery to the addressee or return to the sender or otherwise disposed of.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Letter Box</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">A box installed in post offices or mail offices or at public places, for posting of fully prepaid letters, postcards, letter cards and book post items.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Payee</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">The person who intends to receive money through money remittance services.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Post</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Any system for collection, clearance, sorting, dispatch, conveyance, and delivery of items by the postal network.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Postmaster</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">The Director or Chief Postmaster of general post office, or Senior Postmaster or Head Postmaster of head post office, or an officer exercising the powers of Postmaster, as the case may be, who is the head of such post office.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Redirection</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Action of assigning or directing an item to an address, other than the one to which it was initially addressed, for a specific reason.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Remitter</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">The person who remits money through money remittance services.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Sender</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">A person who sends any item.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c;vertical-align:top">Weight</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Gross weight or volumetric weight, <strong>whichever is higher</strong>, except when stated otherwise.</td>
      </tr>
    </tbody>
  </table>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.75">

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px;margin-bottom:18px">
    <h3 style="color:#1b5e20;margin:0 0 8px">🧠 Guru's Take — Why This Matters</h3>
    <p style="margin:0">The PO Regulations 2024 is the <strong>operational bible</strong> for every postal employee. It was notified under <strong>Section 13 of the Post Office Act 2023</strong> — the new Act that replaced the old Indian Post Office Act 1898. This regulation governs everything from how a letter is addressed to how compensation is paid. <em>In the IP/PS exam, at least 4–6 questions come directly from these regulations every year.</em></p>
  </div>

  <h4 style="color:#1565c0">🎯 The "Weight" Definition — A Classic Trap!</h4>
  <p>Weight means <strong>gross weight OR volumetric weight — whichever is HIGHER</strong>. This is a tricky MCQ trap. Many candidates assume it is always gross weight. Remember: if a large-volume but light item is sent, the volumetric weight may be higher, and that is what gets charged.</p>

  <h4 style="color:#6a1b9a">🔑 Three "Admin Instructions" Phrases to Remember</h4>
  <p>You will see the phrase <em>"as specified by administrative instructions from time to time"</em> throughout the regulations. This means that specific operational details (fees, forms, procedures) are NOT in the regulations themselves but in separate administrative orders issued by the Central Government or the Director General (as per Regs 178–180).</p>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:16px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ Exam Danger Zone</h4>
    <ul style="margin:0;padding-left:20px">
      <li>These regulations <strong>supersede previous rules</strong> where applicable. Do NOT cite older rules in answers.</li>
      <li>Structure: <strong>15 Chapters, 180 Regulations, 5 Schedules</strong> — likely to appear as a direct MCQ.</li>
      <li>"Accountable items" include COD, insurance, and registered items — not just Speed Post.</li>
      <li>"In course of transmission" starts from <em>receipt by post office</em>, not from posting in letter box.</li>
    </ul>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <h4 style="color:#00695c">📦 Practical Scenarios</h4>
  <p><strong>Scenario 1 (Weight):</strong> A sender posts a large foam cushion weighing 300 grams, but its volumetric weight (calculated from dimensions) is 700 grams. Which weight is charged? → <strong>700 grams (volumetric)</strong>, as it is higher.</p>
  <p><strong>Scenario 2 (Accountable Item):</strong> A Speed Post item is posted in a letter box. Is this allowed? → <strong>No.</strong> Accountable items shall not be posted in letter boxes (Reg. 22). They must be presented at the post office counter.</p>
  <p><strong>Scenario 3 (In Course of Transmission):</strong> An item is lost after being collected from the sender's doorstep for Speed Post. Is the Post Office liable? → <strong>Yes</strong>, because "in course of transmission" begins from the moment of receipt by the post office (including doorstep pickup).</p>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 18px;border-radius:8px">
    <h4 style="color:#0d47a1;margin:0 0 10px">📝 Top Exam Points — Regulations 1 & 2</h4>
    <ol style="margin:0;padding-left:20px">
      <li>Notification No. = <strong>S.O. 5440(E)</strong> | Date = <strong>16.12.2024</strong></li>
      <li>Power source = <strong>Section 13, PO Act 2023</strong></li>
      <li>Total structure = <strong>15 Chapters + 180 Regulations + 5 Schedules</strong></li>
      <li>"Weight" always means <strong>gross or volumetric — whichever is higher</strong></li>
      <li>Accountable items = items with <strong>receipt + track & trace + signature on delivery</strong></li>
      <li>"In course of transmission" starts from <strong>receipt by post office</strong>, ends at <strong>delivery/return/disposal</strong></li>
      <li>Administrative instructions are issued under <strong>Regulations 178, 179 or 180</strong></li>
    </ol>
  </div>
</div>`
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // DAK SUTRA 2 — BUSINESS HOURS, POSTAGE & POSTAGE STAMPS (Regs 3–17)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "Business Hours, Postage & Postage Stamps — Complete Rules",
        rule_number: "Regulations 3 to 17",
        act_name: "The Post Office Regulations, 2024",
        category: "Regulation",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.8">

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulation 3 — Business Hours</h3>
  <p>The business hours in a post office, during which business is transacted with the public, shall generally be as under on normal weekdays, which are not holidays for the Post Office or the Government:</p>

  <table style="width:100%;border-collapse:collapse;margin-bottom:18px;font-size:0.93rem">
    <thead>
      <tr style="background:#004d40;color:#fff">
        <th style="border:1px solid #80cbc4;padding:10px 14px">Sl. No.</th>
        <th style="border:1px solid #80cbc4;padding:10px 14px">Work</th>
        <th style="border:1px solid #80cbc4;padding:10px 14px">Business Hours</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;text-align:center">(i)</td><td style="border:1px solid #b2dfdb;padding:9px 14px">For references and enquiries</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>During the entire working hours of the office</strong></td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:9px 14px;text-align:center">(ii)</td><td style="border:1px solid #b2dfdb;padding:9px 14px">Counter services including booking and posting of items, premium collection of insurance premiums</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>Six hours</strong></td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:9px 14px;text-align:center">(iii)</td><td style="border:1px solid #b2dfdb;padding:9px 14px">Money remittance — Electronic Money Order, Indian Postal Order etc.</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>Six hours</strong></td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:9px 14px;text-align:center">(iv)</td><td style="border:1px solid #b2dfdb;padding:9px 14px">Savings Bank</td><td style="border:1px solid #b2dfdb;padding:9px 14px"><strong>Six hours</strong></td></tr>
    </tbody>
  </table>
  <p><strong>Reg. 3(2):</strong> Branch post offices shall be kept open for a maximum period of <strong>five hours</strong> in a day.</p>

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulations 5–7 — Postage Rules</h3>
  <ul>
    <li><strong>Reg. 5(1):</strong> Postage shall generally be paid by modes mentioned in rule 9.</li>
    <li><strong>Reg. 5(2):</strong> The pre-payment of postage and other sums payable on an item shall be <strong>mandatory</strong> except otherwise mentioned in these regulations.</li>
    <li><strong>Reg. 6(2):</strong> Unpaid or insufficiently paid items are liable to be <strong>kept on hold</strong> for charging the postage due on them.</li>
  </ul>

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulation 7 — When Postage Is NOT Deemed Prepaid</h3>
  <p>Postage and other sums chargeable on an item shall <strong>not be deemed to be prepaid</strong> by means of a proper stamp or franking impression or point of sale receipt if —</p>
  <ul>
    <li>(a) The stamp has not been provided for use as a postage stamp under these regulations;</li>
    <li>(b) The stamp has been <strong>obliterated, defaced, torn, cut or otherwise rendered imperfect</strong>;</li>
    <li>(c) The stamp has any word, letter, figure or design <strong>printed or impressed otherwise than by the Director General</strong> before posting; or</li>
    <li>(d) The stamp has been cut, or otherwise, <strong>separated from an embossed envelope, or from a postcard or wrapper</strong>.</li>
  </ul>
  <p><strong>Proviso:</strong> Nothing in this regulation shall prevent the transmission of <strong>Book Now Pay Later (BNPL)</strong> items or other items as specified by administrative instructions from time to time.</p>

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulations 8–10 — Supply, Fraudulent Usage & Illegal Manufacture of Stamps</h3>
  <ul>
    <li><strong>Reg. 8(2):</strong> No person or entity or institution or organisation or electronic platform shall sell or distribute postage stamps or deal in any other manner in postage stamps, <strong>except with the prior permission of the Director General</strong>.</li>
    <li><strong>Reg. 9(1):</strong> The act of usage of previously used postage stamp, fraudulently or with intent to cause loss to the Government, shall be <strong>punishable under the applicable law</strong>.</li>
    <li><strong>Reg. 9(2):</strong> If such postage stamp is detected on an item already posted, the item shall <strong>not be delivered</strong>.</li>
    <li><strong>Reg. 10(1):</strong> Illegal manufacturing and usage of forged, counterfeit, or fictitious postage stamps shall be <strong>punishable under the applicable law</strong>.</li>
  </ul>

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulation 13 — Types of Postage Stamps</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#1b5e20;color:#fff">
        <th style="border:1px solid #a5d6a7;padding:10px 14px">Type of Stamp</th>
        <th style="border:1px solid #a5d6a7;padding:10px 14px">Description (Verbatim)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20;vertical-align:top">(a) Definitive Stamps</td>
        <td style="border:1px solid #c8e6c9;padding:9px 14px">Postage stamps, specifically issued to meet the <strong>day-to-day postage needs</strong> and are made available for sale for a period till stocks of a particular series last, which shall be printed and reprinted in different denominations as per the requirement of the post office.</td>
      </tr>
      <tr style="background:#f1f8e9">
        <td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20;vertical-align:top">(b) Commemorative Stamps</td>
        <td style="border:1px solid #c8e6c9;padding:9px 14px">Postage stamps issued to <strong>commemorate an event, institution, theme and personages</strong>, which shall be printed only once, in limited numbers and are sold for a limited period. <em>They may be kept as collectible items and may be used for payment of postage.</em></td>
      </tr>
      <tr>
        <td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20;vertical-align:top">(c) Special Stamps</td>
        <td style="border:1px solid #c8e6c9;padding:9px 14px">Postage stamps which are <strong>thematic like flora, fauna, architecture or art</strong> without commemorating any specific event.</td>
      </tr>
      <tr style="background:#f1f8e9">
        <td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20;vertical-align:top">(d) Joint Issue Stamps</td>
        <td style="border:1px solid #c8e6c9;padding:9px 14px">Postage stamps which are <strong>issued by India and any other country</strong> on mutually agreed terms and conditions.</td>
      </tr>
      <tr>
        <td style="border:1px solid #c8e6c9;padding:9px 14px;font-weight:bold;color:#1b5e20;vertical-align:top">(e) My Stamps</td>
        <td style="border:1px solid #c8e6c9;padding:9px 14px">Stamps which are issued on the basis of <strong>personalised or customised printing elements provided by the customer or proponent</strong>, subject to confirmation with administrative instructions.</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulation 14 — Key Rules on Stamp Issuance</h3>
  <ul>
    <li><strong>Reg. 14(5):</strong> <span style="color:#b71c1c;font-weight:bold">No postage stamp shall be issued on a living personality.</span></li>
    <li><strong>Reg. 14(6):</strong> Stamp design and denomination shall be as <strong>approved by the Central Government</strong>.</li>
    <li><strong>Reg. 14(3):</strong> Proponents for a commemorative stamp relating to institutions or events must make a <strong>mandatory purchase</strong> of such stamps (Central Government may relax in exceptional cases).</li>
  </ul>

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulation 15 — Philatelic Advisory Committee</h3>
  <p>The Philatelic Advisory Committee shall advise on the issue of Commemorative Stamps, Special Stamps, and other allied matters. The <strong>Union Minister-in-Charge of the Ministry of Communications</strong> shall be the <em>ex officio</em> Chairperson.</p>

  <h3 style="color:#004d40;border-left:5px solid #00695c;padding-left:12px">Regulation 16 — Manner of Affixing Postage Stamps</h3>
  <ul>
    <li>Stamps affixed to an item must be <strong>completely adherent to the item itself</strong> and not to any part of its contents or any separate label.</li>
    <li>The stamps should be affixed to the <strong>right-hand top corner of the address side</strong>.</li>
    <li>The provisions of this regulation shall apply to <strong>franking of items in toto</strong>.</li>
  </ul>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px;margin-bottom:18px">
    <h3 style="color:#1b5e20;margin:0 0 8px">🧠 Guru's Memory Framework</h3>
    <p style="margin:0"><strong>Remember "6–6–6–5"</strong> for business hours: Counter, Money Remittance, Savings Bank = <em>Six hours each</em>; References = entire working hours; Branch Post Office = <em>Five hours</em> maximum.</p>
  </div>

  <h4 style="color:#6a1b9a">💜 Stamp Types — The "D-C-S-J-M" Mnemonic</h4>
  <p>Use <strong>D-C-S-J-M</strong>: <strong>D</strong>efinitive → <strong>C</strong>ommemorative → <strong>S</strong>pecial → <strong>J</strong>oint Issue → <strong>M</strong>y Stamps</p>
  <ul>
    <li><strong>Definitive</strong> = Daily use. Reprinted as needed.</li>
    <li><strong>Commemorative</strong> = One-time print, limited edition. Can be used for postage AND collected.</li>
    <li><strong>Special</strong> = Thematic (flora, fauna, art). No specific event being commemorated.</li>
    <li><strong>Joint Issue</strong> = India + another country, mutually agreed.</li>
    <li><strong>My Stamps</strong> = Customer's own personalised design.</li>
  </ul>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:16px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ High-Frequency Exam Points</h4>
    <ul style="margin:0;padding-left:20px">
      <li>No stamp on a <strong>living personality</strong> — this is absolute and unconditional.</li>
      <li>Stamp design approved by <strong>Central Government</strong>, not Director General.</li>
      <li>Philatelic Advisory Committee Chairperson = <strong>Union Minister of Communications</strong> (ex officio).</li>
      <li>Stamps to be affixed at <strong>right-hand top corner</strong> of the address side.</li>
      <li>Selling stamps without DG permission = <strong>punishable offence</strong>.</li>
      <li>BNPL items are exempt from the "postage not prepaid" provision of Reg. 7.</li>
    </ul>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 18px;border-radius:8px">
    <h4 style="color:#0d47a1;margin:0 0 10px">📝 Quick Recall Table — Business Hours</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
      <thead><tr style="background:#1565c0;color:#fff"><th style="padding:8px;border:1px solid #90caf9">Service</th><th style="padding:8px;border:1px solid #90caf9">Hours</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:8px">References &amp; Enquiries</td><td style="border:1px solid #bbdefb;padding:8px">Entire working hours</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Counter / Booking / Insurance</td><td style="border:1px solid #bbdefb;padding:8px"><strong>6 hours</strong></td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px">Money Remittance (MO, eMO, IPO)</td><td style="border:1px solid #bbdefb;padding:8px"><strong>6 hours</strong></td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Savings Bank</td><td style="border:1px solid #bbdefb;padding:8px"><strong>6 hours</strong></td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px">Branch Post Office (total)</td><td style="border:1px solid #bbdefb;padding:8px"><strong>5 hours maximum</strong></td></tr>
      </tbody>
    </table>
  </div>
</div>`
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // DAK SUTRA 3 — PROHIBITION, DELIVERY & UNDELIVERED ITEMS (Regs 25, 41–68)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "Prohibition of Items, Delivery Rules & Undelivered Items",
        rule_number: "Regulations 25, 41–68",
        act_name: "The Post Office Regulations, 2024",
        category: "Regulation",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.8">

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 25 — Prohibition of Domestic Items</h3>
  <p>Subject to the provisions of these regulations, <strong>no person shall send by post</strong> —</p>

  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#880e4f;color:#fff">
        <th style="border:1px solid #f48fb1;padding:9px 14px;width:8%">Clause</th>
        <th style="border:1px solid #f48fb1;padding:9px 14px">Prohibited Item</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(a)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Any explosive, dangerous, filthy, noxious or deleterious substance, any sharp instrument not properly protected, or any living creature which is either noxious or likely to injure items in course of transmission by post or any officer of the Post Office.</td></tr>
      <tr style="background:#fce4ec"><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(b)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Anything likely to injure, any item during transmission by post, or any officer of the Post Office.</td></tr>
      <tr><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(c)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Any ticket, proposal, advertisement or any other matter relating to a <strong>lottery</strong>, except where the lottery is organised or authorised by the <strong>Central Government or State Government</strong>.</td></tr>
      <tr style="background:#fce4ec"><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(d)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Any indecent, immoral or obscene printing, painting, photograph, lithograph, engraving, book or card, or any other digital media, or any other indecent, immoral, or obscene item.</td></tr>
      <tr><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(i)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Narcotics and psychotropic substances, as defined by the International Narcotics Control Board, or other illicit drugs.</td></tr>
      <tr style="background:#fce4ec"><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(j)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Counterfeit and pirated items.</td></tr>
      <tr><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(l)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Dangerous goods, narcotics and psychotropic substances, prohibited drugs and cosmetics items, items prohibited by IATA, ICAO, Department of Wildlife and the Drug and Cosmetics Act, 1940 or items prohibited by any law of the land. <em><strong>Note:</strong> Battery and other items prohibited by air shall be sent through <strong>surface mode only</strong>.</em></td></tr>
      <tr style="background:#fce4ec"><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(m)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Live animals <strong>except otherwise permitted</strong> in these regulations.</td></tr>
      <tr><td style="border:1px solid #fce4ec;padding:9px 14px;text-align:center;font-weight:bold">(n)</td><td style="border:1px solid #fce4ec;padding:9px 14px">Coins, banknotes and other valuable items, except permitted through a special process. Currency notes, coins, or bank notes shall invariably be transmitted as <strong>insured items</strong>.</td></tr>
    </tbody>
  </table>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulations 41–43 — Delivery of Accountable Items</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#4a148c;color:#fff">
        <th style="border:1px solid #ce93d8;padding:9px 14px">Regulation</th>
        <th style="border:1px solid #ce93d8;padding:9px 14px">Key Rule</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;vertical-align:top">Reg. 41 — Accountable Items</td><td style="border:1px solid #e1bee7;padding:9px 14px">Delivery shall be made: (a) to the addressee or the authorized person — in case of <em>registered item, insured item, Cash on Delivery, Money Order</em>; (b) to the authorised person or on the address — in case of <em>Speed Post item, India Post Parcel, etc.</em></td></tr>
      <tr style="background:#f3e5f5"><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;vertical-align:top">Reg. 42 — Two Delivery Attempts</td><td style="border:1px solid #e1bee7;padding:9px 14px">An accountable item shall be issued for delivery and if not delivered on first presentation, it shall be issued once again for delivery. <strong>In case of inability to deliver after two attempts, it shall, in no case, be issued again for delivery.</strong> A notice of arrival shall be issued to the addressee.</td></tr>
      <tr><td style="border:1px solid #e1bee7;padding:9px 14px;font-weight:bold;vertical-align:top">Reg. 43 — Addressee to Sign</td><td style="border:1px solid #e1bee7;padding:9px 14px">The addressee of an accountable item or an authorised person shall sign in the receipt and proof of delivery, unless the outward appearance of the cover gives rise to <em>suspicion of tampering</em>. Where tampering is suspected, the item shall be opened at the post office in the presence of the <strong>Postmaster</strong> and contents entered in an inventory prepared in <strong>duplicate and signed by the addressee</strong>.</td></tr>
    </tbody>
  </table>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 52 — Delivery of Damaged Item</h3>
  <p>Where an accountable item is received in the office of delivery in a damaged condition, a notice shall be sent to the addressee requesting him to attend the post office within:</p>
  <ul>
    <li><strong>Seven days</strong> — in the case of domestic item</li>
    <li><strong>Fifteen days</strong> — in the case of international item</li>
  </ul>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 55 — Redirection of Items</h3>
  <p>The sender of an item may avail the following facility in respect of the accountable domestic item and international inward item, by paying a postal fee of <strong>Rs. 6/-</strong>, without reference to the consent of the addressee:</p>
  <ul>
    <li>(a) <strong>Recall of the item from the post</strong> (Provided that the item may be cancelled before it has been dispatched from the office of booking).</li>
    <li>(b) <strong>Alteration in address or name of the addressee</strong>.</li>
  </ul>
  <p><strong>Reg. 55(2):</strong> The addressee of an item may avail the facility of alteration in address, <strong>free of charge</strong> if the original address and the substitute address are within the delivery area of the same post office.</p>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 62 — Refusal of Items</h3>
  <ul>
    <li>The addressee of an item <strong>shall not be bound to pay</strong> the amount due on it if he does not want to take delivery; the word <strong>"Refused"</strong> shall be written by the Postman across the cover.</li>
    <li>Unclaimed and refused items shall be returned, at once, <strong>direct to the offices of posting</strong> for delivery to the sender.</li>
  </ul>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 64 — Detention at Post Office of Addressee</h3>
  <p>An item shall ordinarily be kept in deposit in the post office to which it is addressed for a period of <strong>seven days</strong> after all enquiries to find the addressee have proved unsuccessful.</p>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 66 — Standard Remarks on Undelivered Items</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.9rem;margin-bottom:18px">
    <thead>
      <tr style="background:#37474f;color:#fff">
        <th style="border:1px solid #90a4ae;padding:9px 12px;width:5%">Sl.</th>
        <th style="border:1px solid #90a4ae;padding:9px 12px;width:22%">Standard Remark</th>
        <th style="border:1px solid #90a4ae;padding:9px 12px">Scenario</th>
        <th style="border:1px solid #90a4ae;padding:9px 12px">Final Disposal</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">1</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Refused</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Addressee is present but declines to accept</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Returned to sender</td></tr>
      <tr style="background:#eceff1"><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">2</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Addressee not found</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Address is located, but addressee not available (addressee specific delivery)</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Keep in deposit for <strong>7 days</strong>; if nobody claims, returned to sender</td></tr>
      <tr><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">3</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Addressee left without instructions</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Addressee is known to have left without leaving forwarding instructions</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Returned to sender</td></tr>
      <tr style="background:#eceff1"><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">4</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Premises Locked</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Multiple attempts made but premises consistently found closed</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Returned to sender</td></tr>
      <tr><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">5</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Insufficient Address</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Address is incomplete or inadequate to locate the recipient</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Returned to sender</td></tr>
      <tr style="background:#eceff1"><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">6</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Unclaimed</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Delivery attempt made and notice served, but item not collected within prescribed time</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Returned to sender</td></tr>
      <tr><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">7</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Deceased</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Addressee has passed away</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Return to sender</td></tr>
      <tr style="background:#eceff1"><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">8</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Redirected</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Item forwarded to a new address based on addressee's written instructions</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Redirected on the <strong>same day</strong></td></tr>
      <tr><td style="border:1px solid #cfd8dc;padding:8px 12px;text-align:center">13</td><td style="border:1px solid #cfd8dc;padding:8px 12px;font-weight:bold">Poste Restante</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Poste Restante (C/o Postmaster) item will be kept with the Postmaster for <strong>15 days</strong> and if not claimed, returned to sender</td><td style="border:1px solid #cfd8dc;padding:8px 12px">Returned to sender (after 15 days)</td></tr>
    </tbody>
  </table>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 67 — Detention at Returned Letter Office (RLO)</h3>
  <p>Items that remain undelivered to the addressee as well as the sender shall be detained at the <strong>Returned Letter Office</strong> for a period of —</p>
  <ul>
    <li>(a) <strong>Fifteen days</strong> when they are unaccountable; and</li>
    <li>(b) <strong>Thirty days</strong> when they are accountable.</li>
  </ul>
  <p><em>RLO = An office that deals with unclaimed and refused items, or items without addresses, or with undecipherable or incomplete addresses.</em></p>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Regulation 71 — Rates Chargeable on Unpaid Domestic Items</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
    <thead><tr style="background:#bf360c;color:#fff"><th style="border:1px solid #ff8a65;padding:9px 14px">Condition</th><th style="border:1px solid #ff8a65;padding:9px 14px">Charge</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #ffccbc;padding:9px 14px">On an unpaid item</td><td style="border:1px solid #ffccbc;padding:9px 14px"><strong>Double the prepaid rate</strong></td></tr>
      <tr style="background:#fbe9e7"><td style="border:1px solid #ffccbc;padding:9px 14px">On an insufficiently paid item</td><td style="border:1px solid #ffccbc;padding:9px 14px"><strong>Double the deficiency</strong></td></tr>
    </tbody>
  </table>
  <p style="color:#b71c1c;font-weight:bold">Note: The postage or air mail fee actually charged shall in no case be less than Rupee One.</p>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <div style="background:#fce4ec;border-left:5px solid #c62828;padding:14px 18px;border-radius:8px;margin-bottom:18px">
    <h3 style="color:#b71c1c;margin:0 0 8px">🧠 Guru's Take — Three Critical Numbers</h3>
    <ul style="margin:0;padding-left:18px">
      <li><strong>2 attempts</strong> = Maximum delivery attempts for accountable items (Reg. 42)</li>
      <li><strong>7 days</strong> = Deposit at delivery post office + "Addressee not found" hold period (Reg. 64)</li>
      <li><strong>15/30 days</strong> = RLO detention (unaccountable/accountable respectively) (Reg. 67)</li>
    </ul>
  </div>
  <h4 style="color:#4a148c">💡 Redirection Fee — Rs. 6/- Rule</h4>
  <p>The fee for recall/redirection is <strong>Rs. 6/-</strong>. But addressee can redirect within same post office area <strong>free of charge</strong>. Always remember: once the item is out for delivery, no request can be entertained (Reg. 56).</p>
  <h4 style="color:#004d40">🚫 Prohibited Items — Special Exceptions</h4>
  <ul>
    <li>Lottery materials — allowed if organised by <strong>Central or State Government</strong>.</li>
    <li>Live animals — generally prohibited, but permitted in specific international cases (Reg. 27): bees, leeches, silk-worms, parasites for noxious insect control, Drosophilidae flies for biomedical research.</li>
    <li>Currency notes — must be transmitted as <strong>insured items</strong>.</li>
    <li>Batteries — prohibited by air; must go by <strong>surface only</strong>.</li>
  </ul>
  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:16px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ Exam Traps</h4>
    <ul style="margin:0;padding-left:20px">
      <li>After 2 failed delivery attempts, the item is <strong>never sent out again</strong> — only a notice is issued.</li>
      <li>Damaged item notice: <strong>7 days (domestic)</strong> vs <strong>15 days (international)</strong> — easy to swap in MCQs.</li>
      <li>RLO is not the delivery post office — it is a separate office handling undeliverable mail.</li>
      <li>Poste Restante = kept with Postmaster for <strong>15 days</strong> (same as unaccountable RLO detention — coincidence!).</li>
      <li>Unpaid item charge = <strong>double the prepaid rate</strong>; insufficient = <strong>double the deficiency</strong>. Minimum charge = <strong>Re. 1/-</strong>.</li>
    </ul>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 18px;border-radius:8px">
    <h4 style="color:#0d47a1;margin:0 0 10px">📝 Time-Limits Summary Table</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
      <thead><tr style="background:#0d47a1;color:#fff"><th style="border:1px solid #90caf9;padding:8px">Event</th><th style="border:1px solid #90caf9;padding:8px">Time Limit</th><th style="border:1px solid #90caf9;padding:8px">Regulation</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:8px">Max delivery attempts for accountable item</td><td style="border:1px solid #bbdefb;padding:8px"><strong>2 attempts</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 42</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Deposit at post office of addressee</td><td style="border:1px solid #bbdefb;padding:8px"><strong>7 days</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 64</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px">Damaged item notice — domestic</td><td style="border:1px solid #bbdefb;padding:8px"><strong>7 days</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 52</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Damaged item notice — international</td><td style="border:1px solid #bbdefb;padding:8px"><strong>15 days</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 52</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px">RLO detention — unaccountable items</td><td style="border:1px solid #bbdefb;padding:8px"><strong>15 days</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 67</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">RLO detention — accountable items</td><td style="border:1px solid #bbdefb;padding:8px"><strong>30 days</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 67</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px">Poste Restante — kept with Postmaster</td><td style="border:1px solid #bbdefb;padding:8px"><strong>15 days</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 66</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Address change intimation validity</td><td style="border:1px solid #bbdefb;padding:8px"><strong>3 months</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 69</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:8px">Redirection/recall fee</td><td style="border:1px solid #bbdefb;padding:8px"><strong>Rs. 6/-</strong></td><td style="border:1px solid #bbdefb;padding:8px">Reg. 55</td></tr>
      </tbody>
    </table>
  </div>
</div>`
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // DAK SUTRA 4 — COMPENSATION CHART (Regs 73–86)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "Compensation for Loss & Damage — The Complete Chart",
        rule_number: "Regulations 73 to 86",
        act_name: "The Post Office Regulations, 2024",
        category: "Regulation",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B", "PM Grade I"],
        status: "published",
        created_by: "admin@dakguru.com",
        official_text: `
<div style="font-family:Georgia,serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#bf360c,#e64a19);color:#fff;padding:16px 22px;border-radius:10px;margin-bottom:20px">
    <h2 style="margin:0;font-size:1.3rem">💰 CHAPTER IV — COMPENSATION (Regulations 73–86)</h2>
    <p style="margin:6px 0 0;opacity:0.9">The Post Office shall be liable to pay compensation for <strong>loss of item, abstraction of content, loss of content, damage to content, or damage to item</strong>, subject to conditions in this Chapter.</p>
  </div>

  <h3 style="color:#bf360c;border-left:5px solid #e64a19;padding-left:12px">Regulation 73 — General Principles</h3>
  <ul>
    <li><strong>Reg. 73(2):</strong> The compensation shall be payable to the <strong>sender</strong>. Provided that the compensation shall be payable to the <strong>addressee</strong> if the sender waives his right in favour of the addressee.</li>
    <li><strong>Reg. 73(3):</strong> The compensation for consequential loss or damage or any other such loss or damage shall <strong>NOT be payable</strong>.</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #e64a19;padding-left:12px">Compensation Chart — All Categories at a Glance</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:20px">
    <thead>
      <tr style="background:#bf360c;color:#fff">
        <th style="border:1px solid #ff8a65;padding:10px 14px;width:6%">Reg.</th>
        <th style="border:1px solid #ff8a65;padding:10px 14px;width:28%">Type of Item</th>
        <th style="border:1px solid #ff8a65;padding:10px 14px">Compensation Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">74</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">Domestic Registered Item</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">Subject to a maximum of <strong>Rs. 100/- (Rupees One Hundred)</strong> or the actual value of contents, whichever is <strong>less</strong>.</td>
      </tr>
      <tr style="background:#fbe9e7">
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">74</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">International Registered Item</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px"><strong>30 SDR</strong></td>
      </tr>
      <tr>
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">75</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">Domestic Speed Post</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">
          <strong>For loss / damage / abstraction of content:</strong> Double the Speed Post charges OR <strong>Rs. 1,000/- (Rupees One Thousand)</strong>, whichever is <strong>less</strong>.<br>
          <strong>For delay in delivery:</strong> Speed Post charges.
        </td>
      </tr>
      <tr style="background:#fbe9e7">
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">75</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">International Speed Post (EMS)</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">
          <strong>For loss / damage / abstraction of content:</strong> <strong>30 SDR</strong>.<br>
          <strong>For delay in delivery:</strong> Difference between the EMS charges and the registered post charges.
        </td>
      </tr>
      <tr>
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">76</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">Domestic Insured Item</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">The <strong>insured value</strong> or the actual value of the contents, whichever is <strong>less</strong>.</td>
      </tr>
      <tr style="background:#fbe9e7">
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">76</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">International Insured Item</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">Subject to a maximum of the <strong>insured value</strong> or the actual value of contents, whichever is less. Compensation shall <strong>not exceed the insured amount</strong>.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">77</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">India Post Parcel</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">Subject to a maximum of <strong>Rs. 500/- (Rupees Five Hundred)</strong> or the actual value of contents, whichever is <strong>less</strong>.</td>
      </tr>
      <tr style="background:#fbe9e7">
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">78</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">International Air Parcel</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px"><strong>40 SDR per parcel plus 4.50 SDR per kg</strong></td>
      </tr>
      <tr>
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">79</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">International Tracked Packet</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">The compensation is restricted to <strong>₹1,000/-</strong> or the actual declared value of the contents, whichever is less.</td>
      </tr>
      <tr style="background:#fbe9e7">
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">80</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">Domestic Money Order — Loss</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">The amount of money order <strong>plus the commission paid</strong>.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">80</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">Domestic Money Order — Delay</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">The interest at the rate of <strong>savings bank account</strong> for the period of delay on the amount of money order.</td>
      </tr>
      <tr style="background:#fbe9e7">
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">80</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">International Money Remittance</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">The amount of money remittance <strong>plus the commission paid</strong>.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">81</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">VPP / COD — Loss of item</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px">Subject to a maximum of <strong>Rs. 500/-</strong> or actual value of contents, whichever is <strong>less</strong>.</td>
      </tr>
      <tr style="background:#fbe9e7">
        <td style="border:1px solid #ffccbc;padding:9px 14px;text-align:center;font-weight:bold">81</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px;font-weight:bold;vertical-align:top">VPP / COD — Amount collected but not remitted</td>
        <td style="border:1px solid #ffccbc;padding:9px 14px"><strong>The amount collected.</strong><br><em>Note: No liability if item is delivered to addressee and amount remitted to sender.</em></td>
      </tr>
    </tbody>
  </table>

  <h3 style="color:#bf360c;border-left:5px solid #e64a19;padding-left:12px">Regulation 82 — When NO Compensation Shall Be Payable</h3>
  <p>No compensation shall be payable —</p>
  <ul>
    <li>(a) If the claim is not made within the period specified in <strong>Regulation 83</strong>;</li>
    <li>(b) If the loss or damage is caused by the <strong>fault or negligence of the sender or the addressee</strong>;</li>
    <li>(c) If the item contained anything <strong>prohibited from transmission by post</strong>;</li>
    <li>(d) If the item was <strong>seized or detained</strong> by any competent authority under any law;</li>
    <li>(e) If the sender has <strong>not packed the item securely</strong>;</li>
    <li>(f) In case of <strong>"force majeure"</strong> events (e.g., natural disasters, war, civil commotion).</li>
  </ul>
  <p><strong>Reg. 82(2):</strong> The decision of the <strong>Department of Posts</strong> regarding the payment of compensation shall be <strong>final</strong>.</p>

  <h3 style="color:#bf360c;border-left:5px solid #e64a19;padding-left:12px">Regulation 83 — Time Limit for Claiming Compensation</h3>
  <p>The claim for compensation shall be preferred within the following time limits from the <strong>date of booking</strong> of the item:</p>
  <ul>
    <li>(a) For <strong>domestic items: Three months</strong>.</li>
    <li>(b) For <strong>international items: Six months</strong> (or as per UPU regulations).</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #e64a19;padding-left:12px">Regulation 84 — Procedure for Claiming Compensation</h3>
  <ul>
    <li>The claim shall be submitted to the <strong>office of booking or the office of delivery</strong>.</li>
    <li>The claimant shall produce the <strong>original receipt of booking</strong> along with the claim application.</li>
    <li>The Department may require the claimant to produce <strong>evidence of the value of the contents</strong>.</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #e64a19;padding-left:12px">Regulation 85 & 86 — Liability & Ex Gratia</h3>
  <ul>
    <li><strong>Reg. 85:</strong> Liability of the Post Office shall be <strong>limited to the compensation amounts</strong> specified in this Chapter and shall not extend to any indirect or consequential loss or damage.</li>
    <li><strong>Reg. 86:</strong> The Department of Posts may, in exceptional cases, consider <strong>ex gratia payment</strong>, subject to the approval of the <strong>Director General, Postal Services</strong>.</li>
  </ul>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <div style="background:#fff3e0;border-left:5px solid #e65100;padding:14px 18px;border-radius:8px;margin-bottom:18px">
    <h3 style="color:#bf360c;margin:0 0 8px">🧠 Guru's Memory Map — The Magic Numbers</h3>
    <ul style="margin:0;padding-left:18px">
      <li>Domestic Registered = <strong>Rs. 100</strong></li>
      <li>Speed Post = Double charges OR <strong>Rs. 1,000</strong> (whichever less)</li>
      <li>India Post Parcel = <strong>Rs. 500</strong></li>
      <li>VPP/COD loss = <strong>Rs. 500</strong></li>
      <li>International Air Parcel = <strong>40 SDR + 4.50 SDR/kg</strong></li>
      <li>International items (registered/EMS/tracked) = <strong>30 SDR each</strong></li>
    </ul>
  </div>

  <h4 style="color:#1a237e">🎯 SDR = Special Drawing Rights</h4>
  <p>SDR is an international monetary unit used by UPU (Universal Postal Union) for international compensation. The actual rupee equivalent changes daily based on exchange rates. In exam questions, just remember the SDR numbers — don't worry about conversion.</p>

  <h4 style="color:#1a237e">⏰ Claim Time Limits</h4>
  <p>Think of it as: <strong>Domestic = 3 months; International = 6 months</strong> (double of domestic). Always measured from the <em>date of booking</em>, NOT from the date of loss or damage.</p>

  <div style="background:#e8eaf6;border:1.5px solid #3949ab;border-radius:8px;padding:14px 18px;margin-top:16px">
    <h4 style="color:#1a237e;margin:0 0 8px">⚡ Top Exam Traps in Chapter IV</h4>
    <ul style="margin:0;padding-left:20px">
      <li>Compensation is payable to the <strong>sender</strong> (not the addressee) — unless the sender waives his right.</li>
      <li>Consequential / indirect losses are <strong>NEVER compensated</strong> — only direct loss/damage.</li>
      <li>If item contained prohibited goods, <strong>no compensation</strong> even if lost.</li>
      <li>If sender packed poorly, <strong>no compensation</strong> — secure packing is the sender's duty.</li>
      <li>Department's decision on compensation is <strong>final</strong> (Reg. 82(2)).</li>
      <li>Ex gratia = needs approval of <strong>Director General, Postal Services</strong> — not the Postmaster.</li>
    </ul>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <h4 style="color:#00695c">📦 Compensation Scenarios — Practice Problems</h4>
  <p><strong>Q1.</strong> A registered letter worth Rs. 250 is lost. What compensation is payable?<br>
  → Max Rs. 100 or actual value (Rs. 250) — <strong>whichever is less → Rs. 100</strong> (Reg. 74).</p>
  <p><strong>Q2.</strong> A Speed Post parcel worth Rs. 5,000 is lost. Speed Post charges paid = Rs. 80. What compensation?<br>
  → Double the charges = Rs. 160; OR Rs. 1,000 — <strong>whichever is less → Rs. 160</strong> (Reg. 75).</p>
  <p><strong>Q3.</strong> An India Post Parcel worth Rs. 2,000 is damaged. What is the compensation?<br>
  → Max Rs. 500 or actual value — <strong>whichever is less → Rs. 500</strong> (Reg. 77).</p>
  <p><strong>Q4.</strong> A Money Order of Rs. 1,000 is lost. Commission paid = Rs. 25. What is the compensation?<br>
  → Amount of MO + commission = <strong>Rs. 1,025</strong> (Reg. 80).</p>
  <p><strong>Q5.</strong> A Speed Post was delayed by 2 days. Charges paid = Rs. 50. What is the compensation?<br>
  → For delay = <strong>Speed Post charges = Rs. 50</strong> (Reg. 75).</p>
  <p><strong>Q6.</strong> A sender posted prohibited narcotics in a Speed Post. The item is lost. Is compensation payable?<br>
  → <strong>No</strong> — item contained prohibited goods (Reg. 82(c)).</p>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.75">
  <div style="background:#e3f2fd;border-left:5px solid #1565c0;padding:14px 18px;border-radius:8px">
    <h4 style="color:#0d47a1;margin:0 0 10px">📝 Master Compensation Summary</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
      <thead><tr style="background:#0d47a1;color:#fff"><th style="border:1px solid #90caf9;padding:7px">Item Type</th><th style="border:1px solid #90caf9;padding:7px">Max Compensation</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #bbdefb;padding:7px">Domestic Registered</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Rs. 100 or actual (less)</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px">Domestic Speed Post (loss)</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">2× charges OR Rs. 1,000 (less)</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:7px">Domestic Speed Post (delay)</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Speed Post charges</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px">Domestic Insured</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Insured value or actual (less)</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:7px">India Post Parcel</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Rs. 500 or actual (less)</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px">VPP/COD (loss)</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Rs. 500 or actual (less)</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:7px">International Registered</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">30 SDR</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px">International EMS (loss)</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">30 SDR</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:7px">International EMS (delay)</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">EMS charges − Registered post charges</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px">International Air Parcel</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">40 SDR + 4.50 SDR/kg</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:7px">International Tracked Packet</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">₹1,000 or actual (less)</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px">Domestic MO (loss)</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">MO amount + commission</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:7px">Domestic MO (delay)</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">SB interest rate for delay period</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px">International Money Remittance</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Amount + commission</td></tr>
        <tr><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Claim period — Domestic</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold;color:#b71c1c">3 months from date of booking</td></tr>
        <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold">Claim period — International</td><td style="border:1px solid #bbdefb;padding:7px;font-weight:bold;color:#b71c1c">6 months from date of booking</td></tr>
      </tbody>
    </table>
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
        for (const entry of entries) {
            const existing = await collection.findOne({ title: entry.title });
            if (existing) {
                await collection.updateOne({ title: entry.title }, { $set: { ...entry, updatedAt: now } });
                console.log(`✅ Updated: ${entry.title}`);
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

        console.log(`\n🎉 Done! ${inserted} new Dak Sutra entries inserted.`);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
