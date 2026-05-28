
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
    // DAK SUTRA 1 — PO ACT 2023: FOUNDATION, DEFINITIONS & SECTIONS 1–9
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Act 2023 — Foundation, Definitions & Key Provisions (Sections 1–9)",
        rule_number: "Sections 1 to 9",
        act_name: "Post Office Act 2023",
        category: "Section",
        effective_date: new Date("2024-06-18"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff;padding:18px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.45rem;letter-spacing:1px">📜 THE POST OFFICE ACT, 2023</h2>
    <p style="margin:8px 0 0;font-size:0.95rem;opacity:0.92">Act No. <strong>43 of 2023</strong> &nbsp;|&nbsp; Came into force on <strong>18th June 2024</strong></p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">Notification No. <strong>S.O. 2353(E)</strong>, dated <strong>17th June 2024</strong></p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">Repeals the <strong>Indian Post Office Act, 1898 (6 of 1898)</strong></p>
  </div>

  <h3 style="color:#c62828;border-left:5px solid #c62828;padding-left:12px">Section 1 — Short Title, Extent, Application & Commencement</h3>
  <ul>
    <li>This Act may be called the <strong>Post Office Act, 2023</strong>.</li>
    <li>It came into force on <strong>18.06.2024</strong>.</li>
    <li>Officially brought into force vide Notification No. <strong>S.O. 2353(E)</strong>, dated <strong>17th June 2024</strong>.</li>
  </ul>

  <h3 style="color:#c62828;border-left:5px solid #c62828;padding-left:12px">Section 2 — Definitions</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:18px">
    <thead>
      <tr style="background:#b71c1c;color:#fff">
        <th style="border:1.5px solid #e57373;padding:10px 14px;text-align:left;width:28%">Term [Clause]</th>
        <th style="border:1.5px solid #e57373;padding:10px 14px;text-align:left">Definition (Verbatim / Near-Verbatim)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Director General [2(a)]</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Means the <strong>Director General of Postal Services</strong> appointed by the Central Government and includes any officer authorised by the Central Government to perform the duties of the Director General.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Item [2(b)]</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Means an <strong>indivisible article</strong> which the Post Office accepts for providing a service.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Notification [2(c)]</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Means a notification published in the <strong>Official Gazette</strong>.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Post Office [2(d)]</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Means the <strong>Department of Posts</strong> and includes <strong>every house, building, room, place or any other asset</strong> used by the Post Office for providing any service.</td>
      </tr>
      <tr>
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Prescribe [2(e)/(f)]</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Means <strong>prescribe by rules made under this Act</strong>; the expression "prescribed" shall be construed accordingly.</td>
      </tr>
      <tr style="background:#fff8f8">
        <td style="border:1px solid #ffcdd2;padding:9px 14px;font-weight:bold;color:#b71c1c">Regulations [2(g)]</td>
        <td style="border:1px solid #ffcdd2;padding:9px 14px">Means <strong>the regulations made under this Act</strong>.</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Section 3 — Services to be Provided by Post Office</h3>
  <ul>
    <li><strong>Sec. 3(1):</strong> The Post Office shall provide such services as the <strong>Central Government may prescribe</strong>.</li>
    <li><strong>Sec. 3(2):</strong> The <strong>Director General</strong> may make regulations —
      <ul>
        <li>(a) in respect of activities necessary to provide services; and</li>
        <li>(b) to fix charges for, and the terms and conditions in respect of, services.</li>
      </ul>
    </li>
    <li><strong>Sec. 3(3):</strong> Any service provided by the Post Office shall be subject to any other law for the time being in force.</li>
  </ul>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">Section 4 — Exclusive Privilege in Respect of Postage Stamps</h3>
  <ul>
    <li><strong>Sec. 4(1):</strong> The Post Office shall have the <strong>exclusive privilege of issuing postage stamps</strong>.</li>
    <li><strong>Sec. 4(2):</strong> The Director General may make regulations relating to the <strong>supply and sale of postage stamps and postal stationery</strong>.</li>
    <li><strong>Postage Stamp [Sec. 4(3)(a)]:</strong> Any stamp provided by the Central Government, <em>in any form, physical or digital</em>, for denoting sums payable in respect of service provided by the Post Office; includes stamps affixed, printed, embossed, embedded, impressed, or otherwise indicated on an item.</li>
    <li><strong>Postal Stationery [Sec. 4(3)(b)]:</strong> Stationery issued by the Post Office such as <strong>envelopes, letter cards, postcards</strong>, bearing imprinted stamps or inscriptions indicating that sum payable in respect of a service has been prepaid.</li>
  </ul>

  <h3 style="color:#6a1b9a;border-left:5px solid #6a1b9a;padding-left:12px">Section 5 — Addresses and Postcodes</h3>
  <ul>
    <li><strong>Sec. 5(1):</strong> The <strong>Central Government</strong> may prescribe standards for addressing on the items, address identifiers and usage of postcodes.</li>
    <li><strong>Postcode [Sec. 5(2)]:</strong> Means a series of digits, letters or digital code or <em>a combination of digits, letters or digital code</em> used to identify a geographic area or location, and ease the process of sorting and delivery of items.</li>
  </ul>

  <h3 style="color:#00695c;border-left:5px solid #00695c;padding-left:12px">Section 6 — Power to Give Effect to Arrangements with Other Countries</h3>
  <p>The <strong>Central Government</strong> may make rules to give effect to arrangements made with any <strong>foreign country or territory</strong> for services provided by the Post Office between India and the said foreign country or territory.</p>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Section 7 — Recovery of Sums Due in Respect of Services</h3>
  <ul>
    <li><strong>Sec. 7(1):</strong> Every person who avails a service provided by the Post Office shall be <strong>liable to pay the charges</strong> in respect of such service.</li>
    <li><strong>Sec. 7(2):</strong> If any person refuses or neglects to pay the charges, such amount shall be recoverable as if it were an <strong>arrear of land revenue</strong> due from him.</li>
  </ul>

  <h3 style="color:#4a148c;border-left:5px solid #4a148c;padding-left:12px">Section 8 — Official Mark to be Evidence of Certain Facts Denoted</h3>
  <p>The <strong>Central Government</strong> may prescribe the conditions for denoting the official marks on items to be used as <strong>prima facie evidence</strong> of the facts so denoted.</p>

  <h3 style="color:#bf360c;border-left:5px solid #bf360c;padding-left:12px">Section 9 — Power to Intercept, Open or Detain Any Item or Deliver Item to Customs Authority</h3>
  <ul>
    <li><strong>Sec. 9(1):</strong> The <strong>Central Government</strong> may, by notification, empower any officer to cause any item in course of transmission to be <strong>intercepted, opened or detained</strong> in the interest of —
      <ul>
        <li>(a) Security of the State</li>
        <li>(b) Friendly relations with foreign states</li>
        <li>(c) Public order</li>
        <li>(d) Emergency</li>
        <li>(e) Public safety</li>
        <li>(f) Any contravention of this Act or any other law for the time being in force.</li>
      </ul>
    </li>
    <li><strong>Sec. 9(2):</strong> The Central Government may cause any such item to be <strong>disposed of</strong> in such manner as it deems appropriate.</li>
    <li><strong>Sec. 9(3):</strong> The Central Government may, by notification, empower any officer to deliver an item — reckoned to contain anything <strong>liable to duty or prohibited item</strong> — to <strong>customs authority or any other specified authority</strong>; such authority shall deal with such item in accordance with any law for the time being in force.</li>
  </ul>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:5px solid #2e7d32;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#1b5e20;margin:0 0 8px">🧠 Dak Guru's Take — Why This Act Matters</h3>
    <p style="margin:0">The Post Office Act 2023 is a <strong>landmark legislation</strong> replacing the 125-year-old Indian Post Office Act 1898. It is <strong>Act No. 43 of 2023</strong> with only <strong>16 sections</strong> — lean, modern, and exam-critical. Every single section has appeared in LDCE exams. Understand the structure: <em>CG prescribes → DG regulates → Officers implement</em>.</p>
  </div>

  <h4 style="color:#1565c0">🗓️ Critical Dates — Don't Mix Them Up!</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.93rem;margin-bottom:16px">
    <thead><tr style="background:#1565c0;color:#fff"><th style="border:1px solid #90caf9;padding:9px">Event</th><th style="border:1px solid #90caf9;padding:9px">Date</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Act passed by Parliament (Act No.)</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">43 of 2023</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Notification issued (commencement notification)</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">17th June 2024 — S.O. 2353(E)</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Act came into force</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">18th June 2024</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Old Act repealed</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">Indian Post Office Act, 1898 (6 of 1898)</td></tr>
    </tbody>
  </table>

  <h4 style="color:#6a1b9a">🔑 Section 2 Definitions — The Examiner's Favourite!</h4>
  <ul>
    <li><strong>"Item"</strong> = an <em>indivisible article</em>. Key word: INDIVISIBLE. A letter, a parcel, a money order are all "items".</li>
    <li><strong>"Post Office"</strong> is NOT just the building — it includes <em>every house, building, room, place or any other asset</em> used for providing service. Wide definition!</li>
    <li><strong>"Director General"</strong> = DG of Postal Services appointed by CG. The DG can have an authorised officer exercise DG's duties.</li>
    <li><strong>"Prescribe"</strong> means prescribed by <em>rules</em> (not regulations). Distinguish: <em>Rules</em> are made by CG; <em>Regulations</em> are made by DG.</li>
  </ul>

  <h4 style="color:#e65100">⚡ The CG vs DG Power Map</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:16px">
    <thead><tr style="background:#e65100;color:#fff"><th style="border:1px solid #ffcc80;padding:9px">What is prescribed/decided by CG</th><th style="border:1px solid #ffcc80;padding:9px">What is done by DG</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #ffe0b2;padding:8px">Which services the PO shall provide (Sec. 3)</td><td style="border:1px solid #ffe0b2;padding:8px">Make regulations for activities to provide services; fix charges (Sec. 3)</td></tr>
      <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Standards for addressing on items and postcodes (Sec. 5)</td><td style="border:1px solid #ffe0b2;padding:8px">Regulations for supply and sale of postage stamps and postal stationery (Sec. 4)</td></tr>
      <tr><td style="border:1px solid #ffe0b2;padding:8px">Rules for arrangements with foreign countries (Sec. 6)</td><td style="border:1px solid #ffe0b2;padding:8px">Make regulations for carrying out provisions of this Act (Sec. 13)</td></tr>
      <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Official mark conditions — prima facie evidence (Sec. 8)</td><td style="border:1px solid #ffe0b2;padding:8px"></td></tr>
      <tr><td style="border:1px solid #ffe0b2;padding:8px">Empower officers to intercept items (Sec. 9)</td><td style="border:1px solid #ffe0b2;padding:8px"></td></tr>
    </tbody>
  </table>

  <h4 style="color:#c62828">🚨 Section 9 — Interception: The Most Exam-Tested Section!</h4>
  <p>Section 9 deals with interception. Remember the <strong>6 grounds</strong> using the mnemonic <strong>"SFFPEP"</strong>: <em><strong>S</strong>ecurity of State, <strong>F</strong>riendly relations with foreign states, <strong>F</strong>orce of public order, <strong>P</strong>ublic safety, <strong>E</strong>mergency, <strong>P</strong>rovision contravention</em> (any contravention of this Act or any other law).</p>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ Section 7 — Recovery as Land Revenue!</h4>
    <p style="margin:0">If someone refuses to pay postal charges, the amount is recoverable as an <strong>arrear of land revenue</strong>. This is a classic MCQ option — examiners often give options like "civil debt," "income tax arrears," or "court fine." The correct answer is always <strong>"arrear of land revenue."</strong></p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c">🎯 Practical Scenarios — PO Act 2023 (Sections 1–9)</h4>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — "Item" Definition:</strong> A speed post letter is posted. On the way, the sorting machine tears it into two pieces. Is it still one "item"? → <strong>Yes</strong> — because at the time of acceptance it was an <em>indivisible article</em>. The definition applies at the point of acceptance by the Post Office.</p>
  </div>

  <div style="background:#e3f2fd;border-left:4px solid #1565c0;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — Recovery as Land Revenue:</strong> A bulk mailer used bulk booking facility and owes Rs. 12,000 as postage but refuses to pay. What action can the Post Office take? → The amount shall be recoverable as an <strong>arrear of land revenue</strong> (Section 7(2)).</p>
  </div>

  <div style="background:#fce4ec;border-left:4px solid #c62828;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — Interception (Section 9):</strong> Intelligence reports suggest a parcel from a foreign country contains prohibited narcotics. Who can order interception? → The <strong>Central Government</strong> by notification may empower an officer to intercept the item — on the ground of contravention of any law for the time being in force.</p>
  </div>

  <div style="background:#f3e5f5;border-left:4px solid #6a1b9a;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 4 — Postage Stamp Privilege:</strong> A private courier company starts printing and selling its own "postal stamps" for its services, calling them postage stamps. Is this lawful? → <strong>No</strong> — Section 4(1) gives the <em>exclusive privilege</em> of issuing postage stamps ONLY to the Post Office (Department of Posts).</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#e8eaf6,#c5cae9);border-left:5px solid #1a237e;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#1a237e;margin:0 0 10px">⚡ EXAM INSIGHT — PO Act 2023 Sections 1–9</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>Act No. = <strong>43 of 2023</strong></li>
      <li>Came into force = <strong>18th June 2024</strong></li>
      <li>Notification = <strong>S.O. 2353(E) dated 17th June 2024</strong></li>
      <li>Repealed = <strong>Indian Post Office Act, 1898 (Act 6 of 1898)</strong></li>
      <li>Total Sections in the Act = <strong>16 Sections</strong></li>
      <li>Services prescribed by = <strong>Central Government</strong></li>
      <li>Charges fixed by = <strong>Director General (via regulations)</strong></li>
      <li>Exclusive privilege of postage stamps = <strong>Post Office only</strong></li>
      <li>Recovery of postal charges = as <strong>arrear of land revenue</strong></li>
      <li>Official mark is <strong>prima facie evidence</strong></li>
      <li>Interception: empowered by = <strong>Central Government (by notification)</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li><em>Rules</em> are made by <strong>CG</strong>; <em>Regulations</em> are made by <strong>DG</strong> (with prior approval of CG)</li>
      <li>"Postcode" is defined in <strong>Section 5</strong>, not Section 2</li>
      <li>"Postage stamp" includes <strong>physical AND digital</strong> forms</li>
      <li>"Post Office" includes <em>any asset used for service</em> — not just the building</li>
    </ul>

    <p style="margin:0 0 8px"><strong>⚠️ Traps:</strong></p>
    <ul style="margin:0;padding-left:20px">
      <li>The Act came into force on <strong>18th June</strong> but notification was issued on <strong>17th June</strong> — trap question!</li>
      <li>Section 9 grounds do NOT include "personal reason" — all 6 grounds are public/national interest</li>
      <li>DG's power to make regulations requires <strong>prior approval of CG</strong> (Section 13)</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points</h4>
    <ol style="margin:0;padding-left:20px">
      <li><strong>43 of 2023</strong> → force from <strong>18.06.2024</strong> (notification: 17.06.2024, S.O. 2353(E))</li>
      <li><strong>Item</strong> = indivisible article accepted by PO</li>
      <li><strong>Post Office</strong> = Department of Posts + every house/building/room/place/asset used</li>
      <li><strong>Services prescribed by CG</strong>; charges regulated by DG</li>
      <li><strong>Postage stamp</strong> exclusive privilege of PO; includes physical AND digital</li>
      <li><strong>Postcode</strong> = digits/letters/digital code combination to identify geographic area</li>
      <li>Unpaid charges = recoverable as <strong>arrear of land revenue</strong></li>
      <li>Official marks = <strong>prima facie evidence</strong></li>
      <li>Interception on <strong>6 grounds</strong> — empowered by CG by notification</li>
      <li>Intercepted items containing duty-liable goods → delivered to <strong>customs authority</strong></li>
    </ol>
  </div>
</div>`
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // DAK SUTRA 2 — PO ACT 2023: LIABILITY, POWERS, RULE-MAKING & REPEAL (Sections 10–16)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Act 2023 — Liability, Delegation, Rule-Making, Parliament & Repeal (Sections 10–16)",
        rule_number: "Sections 10 to 16",
        act_name: "Post Office Act 2023",
        category: "Section",
        effective_date: new Date("2024-06-18"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#4a148c,#6a1b9a);color:#fff;padding:16px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.35rem;letter-spacing:1px">📜 PO ACT 2023 — SECTIONS 10 to 16</h2>
    <p style="margin:6px 0 0;font-size:0.92rem;opacity:0.9">Liability | Delegation | Rule-Making | Regulations | Parliament | Difficulties | Repeal</p>
  </div>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Section 10 — Exemption from Liability</h3>
  <ul>
    <li><strong>Sec. 10(1):</strong> Notwithstanding anything in any other law for the time being in force, the Post Office shall <strong>not incur any liability</strong> except such liability as may be <strong>prescribed</strong> with regard to a service provided by the Post Office.</li>
    <li><strong>Sec. 10(2):</strong> No officer of the Post Office shall incur any liability with regard to a service provided by the Post Office, <strong>unless</strong> the officer has —
      <ul>
        <li>(a) <strong>acted fraudulently</strong>, or</li>
        <li>(b) <strong>wilfully caused loss, delay or mis-delivery</strong> of service.</li>
      </ul>
    </li>
  </ul>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Section 11 — Delegation of Power (Other than Rule-Making Powers) to Director General</h3>
  <p>The <strong>Central Government</strong> may, by notification, authorise — either absolutely or subject to conditions — the <strong>Director General</strong> to exercise <strong>any of the powers conferred upon the Central Government</strong> by this Act, <em>other than the power to make rules</em>.</p>
  <p style="color:#c62828;font-weight:bold">⚠️ CRITICAL: Rule-making power CANNOT be delegated to DG. This is the key exception.</p>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">Section 12 — Power to Make Rules</h3>
  <p>The <strong>Central Government</strong> may, by notification, make <strong>rules</strong> for carrying out the purposes of this Act.</p>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Section 13 — Power to Make Regulations</h3>
  <p>The <strong>Director General</strong> may, with the <strong>prior approval of the Central Government</strong>, by notification, make <strong>regulations</strong> for carrying out the provisions of this Act.</p>

  <div style="background:#fff8e1;border:1.5px solid #f9a825;border-radius:8px;padding:14px 18px;margin:16px 0">
    <h4 style="color:#e65100;margin:0 0 8px">📊 RULES vs REGULATIONS — The Critical Distinction</h4>
    <table style="width:100%;border-collapse:collapse;font-size:0.92rem">
      <thead><tr style="background:#e65100;color:#fff"><th style="border:1px solid #ffcc80;padding:9px">Aspect</th><th style="border:1px solid #ffcc80;padding:9px">Rules (Sec. 12)</th><th style="border:1px solid #ffcc80;padding:9px">Regulations (Sec. 13)</th></tr></thead>
      <tbody>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Made by</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Central Government</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold">Director General</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Prior Approval needed?</td><td style="border:1px solid #ffe0b2;padding:8px">Not specifically stated</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold;color:#c62828">Yes — Prior approval of CG mandatory</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Mode</td><td style="border:1px solid #ffe0b2;padding:8px">By notification</td><td style="border:1px solid #ffe0b2;padding:8px">By notification</td></tr>
        <tr style="background:#fff8f0"><td style="border:1px solid #ffe0b2;padding:8px">Can be delegated?</td><td style="border:1px solid #ffe0b2;padding:8px;font-weight:bold;color:#c62828">NO — Rule-making power cannot be delegated</td><td style="border:1px solid #ffe0b2;padding:8px">N/A</td></tr>
        <tr><td style="border:1px solid #ffe0b2;padding:8px">Example</td><td style="border:1px solid #ffe0b2;padding:8px">Post Office Rules, 2024</td><td style="border:1px solid #ffe0b2;padding:8px">Post Office Regulations, 2024</td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="color:#4a148c;border-left:5px solid #4a148c;padding-left:12px">Section 14 — Laying of Rules and Regulations in Parliament</h3>
  <p>Every rule or regulation made under this Act shall be laid, as soon as may be after it is made, before each House of Parliament, while it is in session, for a total period of <strong>thirty days</strong> which may be comprised in <strong>one session or in two or more successive sessions</strong>.</p>
  <p>If, before the expiry of the session immediately following the session or the successive sessions aforesaid, <strong>both Houses agree</strong> in making any modification in the rule or regulation or both Houses agree that the rule or regulation should not be made, the rule or regulation shall thereafter have effect only in such modified form or be of no effect; <em>so, however, that any such modification or annulment shall be without prejudice to the validity of anything previously done under that rule or regulation</em>.</p>

  <h3 style="color:#00695c;border-left:5px solid #00695c;padding-left:12px">Section 15 — Power to Remove Difficulties</h3>
  <ul>
    <li><strong>Sec. 15(1):</strong> If any difficulty arises in giving effect to the provisions of this Act, the <strong>Central Government</strong> may, by order in the Official Gazette, make such provisions as appear necessary or expedient for removing the difficulty:
      <br><em><strong>Proviso:</strong> No order shall be made after the expiry of <strong>two years</strong> from the date of commencement of this Act.</em></li>
    <li><strong>Sec. 15(2):</strong> Every order made under this section shall be laid, as soon as may be after it is made, before each House of Parliament.</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #bf360c;padding-left:12px">Section 16 — Repeal and Savings</h3>
  <ul>
    <li><strong>Sec. 16(1):</strong> The <strong>Indian Post Office Act, 1898 (6 of 1898)</strong> is hereby <strong>repealed</strong>.</li>
    <li><strong>Sec. 16(2):</strong> Notwithstanding the repeal, all <strong>rules, notifications and orders</strong> made or purported to have been made under the Indian Post Office Act, 1898 shall, in so far as they relate to matters for which provision is made in this Act and are not inconsistent therewith, be deemed to have been made under this Act and shall continue in force unless and until they are <strong>superseded</strong> by any rules or notification or order made under this Act.</li>
  </ul>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#ede7f6,#d1c4e9);border-left:5px solid #4a148c;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#4a148c;margin:0 0 8px">🧠 Dak Guru's Strategy for Sections 10–16</h3>
    <p style="margin:0">These sections are the "power architecture" of the PO Act. They define WHO has liability, WHO makes rules vs regulations, and HOW they interact with Parliament. <strong>Every IP exam has 2–3 direct questions from this section block.</strong></p>
  </div>

  <h4 style="color:#880e4f">💡 Section 10 — The "Fraud OR Wilful" Rule</h4>
  <p>A postal officer is only personally liable if he acted <strong>FRAUDULENTLY</strong> (dishonest intent) OR <strong>WILFULLY</strong> caused loss/delay/mis-delivery (deliberate intent). Mere negligence or accidental error does NOT make an officer liable. This is a massive protection for postal employees.</p>
  <p>The Post Office itself is liable only to the extent <strong>prescribed</strong> by law (i.e., under PO Regulations, 2024 — the compensation chart). It is NOT liable for everything.</p>

  <h4 style="color:#1565c0">🔑 Section 11 — Delegation Exception</h4>
  <p>CG can delegate ANY power to DG by notification — <em>except</em> the power to make rules. Think of it as: the CG keeps the <strong>"legislation key"</strong> in its own pocket. Rules (Section 12) stay with CG always. This is frequently tested.</p>

  <h4 style="color:#2e7d32">📅 Section 14 — The "30 Days" Rule</h4>
  <ul>
    <li>Rules and Regulations must be laid before <strong>each House of Parliament</strong></li>
    <li>Period: <strong>30 days</strong> total (can span one session or two or more successive sessions)</li>
    <li>If both Houses agree to modify or annul: the rule takes modified/annulled form</li>
    <li>But any modification/annulment does NOT affect past actions done under that rule</li>
  </ul>

  <h4 style="color:#c62828">⏰ Section 15 — The "2-Year" Power</h4>
  <p>The CG has power to remove difficulties by official gazette order — but this power expires <strong>2 years after commencement of the Act</strong>. The Act commenced on 18.06.2024, so the CG's difficulty-removal power expires on <strong>17.06.2026</strong>. After that, no such orders can be issued.</p>

  <h4 style="color:#bf360c">📜 Section 16 — Repeal with Savings — No Gap!</h4>
  <p>The 1898 Act is repealed BUT all orders, notifications, and rules made under it continue in force until superseded. This ensures there is <strong>no legal vacuum</strong> during the transition period. Old postal orders remain valid and enforceable.</p>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ Most Confusing Pair: Section 12 vs Section 13</h4>
    <p style="margin:0">Students often confuse who makes rules vs regulations. Memory trick: <strong>"12 = CG's dozen (Rules)"</strong> and <strong>"13 = DG's lucky thirteen (Regulations)"</strong>. Always remember: DG needs CG's prior approval for Regulations.</p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c">🎯 Practical Scenarios — PO Act 2023 (Sections 10–16)</h4>

  <div style="background:#fce4ec;border-left:4px solid #c62828;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — Liability (Sec. 10):</strong> A postman accidentally delivers a registered letter to the wrong address. Is the postman personally liable? → <strong>No</strong> — accidental mis-delivery is NOT wilful. Personal liability requires <em>fraudulent action or wilful</em> cause of loss/delay/mis-delivery. However, the Post Office may still pay prescribed compensation.</p>
  </div>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — Delegation (Sec. 11):</strong> The CG wants the DG to exercise the power of prescribing standards for addressing (Sec. 5) on its behalf. Can it? → <strong>Yes</strong> — by notification, CG can delegate any power to DG, except rule-making power. Sec. 5 power (addressing standards) can be delegated.</p>
  </div>

  <div style="background:#e3f2fd;border-left:4px solid #1565c0;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — Rules vs Regulations (Sec. 12 & 13):</strong> The DG wants to introduce a new regulation for charging speed post. Does he need CG permission? → <strong>Yes</strong> — Under Section 13, the DG must have the <em>prior approval of the Central Government</em> before making any regulation.</p>
  </div>

  <div style="background:#f3e5f5;border-left:4px solid #6a1b9a;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 4 — Repeal & Savings (Sec. 16):</strong> An order issued under the Indian Post Office Act, 1898 relating to delivery of money orders is still in use. Is it still valid after the 2023 Act came into force? → <strong>Yes</strong> — Section 16(2) saves all old rules, notifications, and orders that are not inconsistent with the new Act, until they are superseded.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#ede7f6,#d1c4e9);border-left:5px solid #4a148c;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#4a148c;margin:0 0 10px">⚡ EXAM INSIGHT — PO Act 2023 Sections 10–16</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>PO officer liable ONLY if: <strong>fraudulently acted OR wilfully caused loss/delay/mis-delivery</strong></li>
      <li>PO liability: only as <strong>prescribed</strong> (by PO Regulations)</li>
      <li>Rule-making power (<strong>CANNOT</strong> be delegated to DG)</li>
      <li>Rules made by: <strong>Central Government</strong> (Sec. 12)</li>
      <li>Regulations made by: <strong>Director General</strong> with <strong>prior approval of CG</strong> (Sec. 13)</li>
      <li>Rules/Regulations to be laid before Parliament for: <strong>30 days</strong> (Sec. 14)</li>
      <li>Power to remove difficulties: expires after <strong>2 years</strong> from commencement (Sec. 15)</li>
      <li>Act repealed by PO Act 2023: <strong>Indian Post Office Act, 1898 (Act 6 of 1898)</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>30 days for Parliament = total period across <em>one or more sessions</em></li>
      <li>"2 years" in Section 15 = from <em>commencement</em> of Act (18.06.2024), not enactment</li>
      <li>Regulations by DG: need <strong>prior</strong> approval of CG — NOT prior + written permission</li>
    </ul>

    <p style="margin:0 0 8px"><strong>⚠️ Key Distinctions:</strong></p>
    <ul style="margin:0;padding-left:20px">
      <li><strong>Rules</strong> (Sec.12) = by CG; <strong>Regulations</strong> (Sec.13) = by DG (with CG prior approval)</li>
      <li><strong>Fraudulent OR Wilful</strong> = officer liable; <strong>Negligent/Accidental</strong> = officer NOT liable</li>
      <li>PO Act 2023 repeals Act of <strong>1898</strong>, NOT 1933 (which was Indian Post Office Rules, 1933)</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points — Sections 10–16</h4>
    <ol style="margin:0;padding-left:20px">
      <li>PO = <strong>no liability</strong> unless prescribed; Officer = liable only if <strong>fraud or wilful</strong></li>
      <li>CG can delegate any power to DG EXCEPT <strong>rule-making power</strong></li>
      <li>Section 12 = CG makes <strong>Rules</strong>; Section 13 = DG makes <strong>Regulations</strong> (with prior CG approval)</li>
      <li>Rules/Regulations laid before Parliament for <strong>30 days</strong> (one or more sessions)</li>
      <li>Both Houses can modify or annul — but <strong>past actions remain valid</strong></li>
      <li>Power to remove difficulties = <strong>only 2 years</strong> from commencement</li>
      <li>Every difficulty-removal order also laid before each House of Parliament</li>
      <li>Old Act repealed = <strong>Indian Post Office Act, 1898 (6 of 1898)</strong></li>
      <li>Old rules under 1898 Act continue valid until <strong>superseded</strong> by new rules</li>
      <li>PO Rules 2024 = made under <strong>Section 12</strong>; PO Regulations 2024 = made under <strong>Section 13</strong></li>
    </ol>
  </div>
</div>`
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // DAK SUTRA 3 — PO RULES 2024: FOUNDATION, SERVICES, BOARD & STAMPS (Rules 1–12)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Rules 2024 — Foundation, Definitions, Services, Board & Stamps (Rules 1–12)",
        rule_number: "Rules 1 to 12",
        act_name: "The Post Office Rules, 2024",
        category: "Rule",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#004d40,#00695c);color:#fff;padding:18px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.4rem;letter-spacing:1px">📜 THE POST OFFICE RULES, 2024</h2>
    <p style="margin:8px 0 0;font-size:0.95rem;opacity:0.92">G.S.R. <strong>767(E)</strong> &nbsp;|&nbsp; Made under <strong>Section 12</strong> of PO Act 2023</p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">In suppression of <strong>Indian Post Office Rules, 1933</strong></p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">Came into force: <strong>16th December 2024</strong></p>
  </div>

  <h3 style="color:#00695c;border-left:5px solid #00695c;padding-left:12px">Rule 1 — Short Title and Commencement</h3>
  <ul>
    <li>These rules may be called the <strong>Post Office Rules, 2024</strong>.</li>
    <li>They shall come into force on the <strong>16th day of December, 2024</strong>.</li>
    <li>Notification: <strong>G.S.R. 767(E)</strong></li>
    <li>Made in exercise of powers under <strong>Section 12</strong> of the PO Act, 2023 (43 of 2023).</li>
    <li>In suppression of <strong>Indian Post Office Rules, 1933</strong>.</li>
  </ul>

  <h3 style="color:#00695c;border-left:5px solid #00695c;padding-left:12px">Rule 2 — Definitions</h3>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:18px">
    <thead>
      <tr style="background:#004d40;color:#fff">
        <th style="border:1.5px solid #80cbc4;padding:10px 14px;text-align:left;width:28%">Term [Clause]</th>
        <th style="border:1.5px solid #80cbc4;padding:10px 14px;text-align:left">Definition (Verbatim)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Act [2(a)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means "the Post Office Act, 2023" (<strong>43 of 2023</strong>).</td>
      </tr>
      <tr style="background:#e0f2f1">
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Board [2(b)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means the <strong>Postal Services Board</strong> specified in rule 5.</td>
      </tr>
      <tr>
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Circle Head [2(c)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means the <strong>Chief Postmaster General</strong> concerned or an officer exercising the powers of Chief Postmaster General in the circle.</td>
      </tr>
      <tr style="background:#e0f2f1">
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Divisional Head [2(d)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means <strong>Director or Senior Superintendent or Chief Postmaster or Superintendent</strong> of Postal Division or Railway Mail Service (RMS) Division or Foreign Post, or an officer exercising the powers of Director or Senior Superintendent or Chief Postmaster or Superintendent of Postal Division or RMS Division or Foreign Post.</td>
      </tr>
      <tr>
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Mail Offices [2(e)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means the <strong>Post Offices or premises associated with handling, processing or transmission of items</strong>, used by the Department of Post.</td>
      </tr>
      <tr style="background:#e0f2f1">
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Mail Service [2(f)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means all activities related to <strong>collection, handling, transmission, delivery, forwarding, returning and holding of items</strong>.</td>
      </tr>
      <tr>
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Postage [2(g)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means the <strong>sum chargeable on mail service</strong>.</td>
      </tr>
      <tr style="background:#e0f2f1">
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Regional Director [2(h)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means the <strong>Director</strong> concerned or an officer exercising the powers of Director in the region.</td>
      </tr>
      <tr>
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Regional Head [2(i)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means the <strong>Postmaster General</strong> concerned or an officer exercising the powers of Postmaster General in the region.</td>
      </tr>
      <tr style="background:#e0f2f1">
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Universal Postal Service [2(j)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means the provision of such postal services which are <strong>affordable and made available to all users, within and outside the country</strong>.</td>
      </tr>
      <tr>
        <td style="border:1px solid #b2dfdb;padding:9px 14px;font-weight:bold;color:#004d40">Value-Added Service [2(k)]</td>
        <td style="border:1px solid #b2dfdb;padding:9px 14px">Means <strong>add-on features on mail services</strong>.</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Rule 3 — Services to be Provided by Post Office (Domestic/Foreign)</h3>
  <p>Every Post Office may provide the following services:</p>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:14px">
    <thead><tr style="background:#1565c0;color:#fff"><th style="border:1px solid #90caf9;padding:8px;width:8%">Clause</th><th style="border:1px solid #90caf9;padding:8px">Service</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(a)</td><td style="border:1px solid #bbdefb;padding:8px">Mail services within or beyond the limits of the country</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(b)</td><td style="border:1px solid #bbdefb;padding:8px">Value-added service applicable in respect of clause (a)</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(c)</td><td style="border:1px solid #bbdefb;padding:8px">Universal postal service in respect of clause (a)</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(d)</td><td style="border:1px solid #bbdefb;padding:8px">Financial services including banking, Government Savings Bank, payment system and any other financial services</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(e)</td><td style="border:1px solid #bbdefb;padding:8px">Money remittances services within or beyond the limits of the country</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(f)</td><td style="border:1px solid #bbdefb;padding:8px">Insurance services including life insurance or any other insurance</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(g)</td><td style="border:1px solid #bbdefb;padding:8px">Citizen-centric services as authorised by the Central Government</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(h)</td><td style="border:1px solid #bbdefb;padding:8px">Services associated with addressing identifiers and postcodes</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(i)</td><td style="border:1px solid #bbdefb;padding:8px">Any service offered by State Government or Local Government</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px;text-align:center;font-weight:bold">(j)</td><td style="border:1px solid #bbdefb;padding:8px">Any service offered through collaboration with public or private entities</td></tr>
    </tbody>
  </table>

  <h3 style="color:#6a1b9a;border-left:5px solid #6a1b9a;padding-left:12px">Rule 4 — Director General to Authorise Certain Services</h3>
  <p>The Director General is authorised to —</p>
  <ul>
    <li>(a) <strong>Introduce new products</strong>, or <strong>modify or discontinue</strong> any products related to the services mentioned in these rules; and</li>
    <li>(b) <strong>Enter into a collaboration</strong> with public or private entities in respect of services specified under rule 3.</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #bf360c;padding-left:12px">Rule 5 — Postal Services Board (PSB)</h3>
  <p>The <strong>Postal Services Board</strong> shall be the <strong>apex level policy making body</strong>, having <strong>perpetual succession and a common seal</strong>, for any of the services provided by the Post Office under rule 3.</p>

  <h3 style="color:#bf360c;border-left:5px solid #bf360c;padding-left:12px">Rule 6 — Composition of the Board</h3>
  <p>The <strong>Central Government</strong> may, by notification in the Official Gazette, specify the composition of the Board; and <strong>powers, functions and duties</strong> of the Board.</p>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Rule 7 — Exclusive Privilege in Respect of Postage Stamps</h3>
  <p>Subject to the provisions of rule 8, the <strong>Central Government</strong> or, as the case may be, the <strong>Director General</strong> shall issue <strong>definitive, commemorative, special issues of postage stamps</strong> or any other form of postage stamps or related material.</p>

  <h3 style="color:#e65100;border-left:5px solid #e65100;padding-left:12px">Rule 8 — Philatelic Advisory Committee (PAC)</h3>
  <p>The <strong>Central Government</strong> may constitute a <strong>Philatelic Advisory Committee</strong> which shall <strong>advise that Government on issues of commemorative and special postage stamps</strong> and other allied matters related thereto.</p>

  <h3 style="color:#1b5e20;border-left:5px solid #1b5e20;padding-left:12px">Rule 9 — Modes of Payment of Postage or Other Charges</h3>
  <p>The payment of postage or other sums chargeable for mail services under rule 3 shall be made through any of the following modes:</p>
  <ul>
    <li>(a) <strong>In cash</strong></li>
    <li>(b) <strong>Payment through digital mode</strong></li>
    <li>(c) <strong>By postage stamp</strong></li>
    <li>(d) <strong>By means of impressions of franking machines</strong></li>
    <li>(e) <strong>Any other mode</strong>, as may be specified in the regulations</li>
  </ul>

  <h3 style="color:#1b5e20;border-left:5px solid #1b5e20;padding-left:12px">Rule 10 — Modes of Payment for Other Services</h3>
  <p>The modes of payment for the sum chargeable on any other services mentioned in these rules shall be such, as may be <strong>specified in the regulations</strong>.</p>

  <h3 style="color:#4a148c;border-left:5px solid #4a148c;padding-left:12px">Rule 11 — Addresses and Postcodes</h3>
  <ul>
    <li><strong>Rule 11(1):</strong> The <strong>Director General</strong> shall, by regulations —
      <ul>
        <li>(i) specify the standards for addressing on the items;</li>
        <li>(ii) manage and allocate addressing identifiers and postcodes.</li>
      </ul>
    </li>
    <li><strong>Rule 11(2):</strong> The Director General shall <strong>manage, allocate and publish Postcodes or Postal Index Number (PIN) codes</strong>.</li>
  </ul>

  <h3 style="color:#c62828;border-left:5px solid #c62828;padding-left:12px">Rule 12 — Power to Give Effect to Arrangements with Other Countries</h3>
  <ul>
    <li><strong>Rule 12(1):</strong> The <strong>Central Government</strong> shall provide the services in furtherance to <strong>international postal co-operation</strong>.</li>
    <li><strong>Rule 12(2):</strong> International postal co-operation shall be with other countries/territories, <strong>Universal Postal Union (UPU)</strong>, or other postal unions, or public/private entities, and in conformity with the provisions of the —
      <ul>
        <li><strong>UPU Convention Manual and Regulations</strong></li>
        <li>Multilateral or bilateral agreements with foreign countries</li>
        <li>Other unions, laws and bye-laws</li>
        <li>International laws, as may be applicable</li>
      </ul>
    </li>
    <li><strong>Rule 12(3):</strong> The <strong>Director General</strong> is authorised to issue regulations for the purposes of sub-rules (1) and (2).</li>
  </ul>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#e0f2f1,#b2dfdb);border-left:5px solid #004d40;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#004d40;margin:0 0 8px">🧠 Dak Guru's Take — PO Rules 2024 vs 1933</h3>
    <p style="margin:0">The PO Rules 2024 (G.S.R. 767(E)) came into force on <strong>16th December 2024</strong>, replacing the old Indian Post Office Rules, 1933 — just like PO Act 2023 replaced the 1898 Act. These Rules are made under <strong>Section 12</strong> of PO Act 2023 by the <strong>Central Government</strong>. The PO Regulations 2024 (made under Section 13 by DG) came on the same date — both came into force on 16.12.2024.</p>
  </div>

  <h4 style="color:#004d40">📊 Key Dates Comparison</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:16px">
    <thead><tr style="background:#004d40;color:#fff"><th style="border:1px solid #80cbc4;padding:9px">Legislation</th><th style="border:1px solid #80cbc4;padding:9px">Notification</th><th style="border:1px solid #80cbc4;padding:9px">In Force From</th><th style="border:1px solid #80cbc4;padding:9px">Supersedes</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #b2dfdb;padding:8px">PO Act 2023</td><td style="border:1px solid #b2dfdb;padding:8px">S.O. 2353(E), 17.06.2024</td><td style="border:1px solid #b2dfdb;padding:8px;font-weight:bold">18.06.2024</td><td style="border:1px solid #b2dfdb;padding:8px">IPO Act 1898</td></tr>
      <tr style="background:#e0f2f1"><td style="border:1px solid #b2dfdb;padding:8px">PO Rules 2024</td><td style="border:1px solid #b2dfdb;padding:8px">G.S.R. 767(E)</td><td style="border:1px solid #b2dfdb;padding:8px;font-weight:bold">16.12.2024</td><td style="border:1px solid #b2dfdb;padding:8px">IPO Rules 1933</td></tr>
      <tr><td style="border:1px solid #b2dfdb;padding:8px">PO Regulations 2024</td><td style="border:1px solid #b2dfdb;padding:8px">S.O. 5440(E)</td><td style="border:1px solid #b2dfdb;padding:8px;font-weight:bold">16.12.2024</td><td style="border:1px solid #b2dfdb;padding:8px">Previous regulations</td></tr>
    </tbody>
  </table>

  <h4 style="color:#1565c0">🏛️ Rule 5 — Postal Services Board (PSB) — The Apex Body</h4>
  <p>The PSB is the <strong>apex level policy making body</strong> for postal services. Key features: has <strong>perpetual succession</strong> (doesn't die when members change) and a <strong>common seal</strong> (can sign as a legal entity). Its composition is notified by CG. Think of it as the "board of directors" of India Post.</p>

  <h4 style="color:#6a1b9a">💡 Rule 2 Definitions — The Hierarchy of Officers</h4>
  <ul>
    <li><strong>Circle Head</strong> = Chief Postmaster General (CPMG) — Top officer in a Circle</li>
    <li><strong>Regional Head</strong> = Postmaster General (PMG) — Regional level</li>
    <li><strong>Regional Director</strong> = Director — Regional level (below PMG)</li>
    <li><strong>Divisional Head</strong> = Director/SSP/Chief PM/Superintendent — Division level</li>
  </ul>

  <h4 style="color:#e65100">📮 Rule 3 — 10 Services of Post Office</h4>
  <p>Remember using <strong>"M-V-U-F-M-I-C-A-S-C"</strong>: <em>Mail, Value-added, Universal, Financial, Money remittance, Insurance, Citizen-centric, Addressing, State/Local Govt, Collaboration</em>.</p>

  <h4 style="color:#1b5e20">💰 Rule 9 — 5 Modes of Payment</h4>
  <p>Remember: <strong>Cash, Digital, Stamp, Franking, Any other (regulations)</strong> — 5 modes for mail services specifically. For other services (Rule 10), the mode is "as specified in regulations."</p>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ Rule 11 vs Section 5 — PIN Code Responsibility</h4>
    <p style="margin:0">In the <em>Act (Section 5)</em>, it is the <strong>Central Government</strong> that prescribes addressing standards. In the <em>Rules (Rule 11)</em>, this power is given to the <strong>Director General</strong> by regulations. The DG also manages and publishes PIN codes. This is a frequently confused pair in exams!</p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c">🎯 Practical Scenarios — PO Rules 2024 (Rules 1–12)</h4>

  <div style="background:#e0f2f1;border-left:4px solid #004d40;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — Value-Added Service (Rule 2(k) + Rule 3(b)):</strong> A customer sends a speed post and also opts for SMS alerts for every stage of delivery. What is this service called? → <strong>Value-Added Service</strong> — it is an add-on feature on top of the core mail service.</p>
  </div>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — Postal Services Board (Rule 5):</strong> A major policy decision needs to be taken about introducing drone delivery services for India Post. Which body is competent to make this policy? → The <strong>Postal Services Board</strong> — it is the <em>apex level policy making body</em> for services under Rule 3.</p>
  </div>

  <div style="background:#e3f2fd;border-left:4px solid #1565c0;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — DG's Power (Rule 4):</strong> India Post wants to discontinue the Telegraph Money Order service. Who is authorised to do this? → The <strong>Director General</strong> — under Rule 4(a), the DG is authorised to modify or discontinue any products related to services mentioned in these rules.</p>
  </div>

  <div style="background:#fff3e0;border-left:4px solid #e65100;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 4 — Payment Mode (Rule 9):</strong> A customer wants to pay the speed post charge by digital UPI payment. Is this allowed? → <strong>Yes</strong> — Rule 9(b) specifically allows "payment through digital mode" as one of the 5 modes of payment for postage and mail service charges.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#e0f7fa,#b2ebf2);border-left:5px solid #00695c;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#004d40;margin:0 0 10px">⚡ EXAM INSIGHT — PO Rules 2024 Rules 1–12</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>PO Rules 2024 Notification = <strong>G.S.R. 767(E)</strong></li>
      <li>PO Rules 2024 in force from = <strong>16th December 2024</strong></li>
      <li>Made under = <strong>Section 12</strong> of PO Act 2023</li>
      <li>Supersedes = <strong>Indian Post Office Rules, 1933</strong></li>
      <li>Postal Services Board = <strong>apex level policy making body</strong> with perpetual succession and common seal</li>
      <li>PSB composition notified by = <strong>Central Government</strong></li>
      <li>Circle Head = <strong>Chief Postmaster General</strong></li>
      <li>Regional Head = <strong>Postmaster General</strong></li>
      <li>Divisional Head = Director/SSP/Chief PM/Superintendent</li>
      <li>Rule 3 services = <strong>10 categories</strong> (a) to (j)</li>
      <li>Payment modes (Rule 9) = <strong>5 modes</strong></li>
      <li>PAC advises on = <strong>commemorative and special postage stamps</strong></li>
      <li>PIN codes managed by = <strong>Director General</strong> (Rule 11(2))</li>
      <li>International postal co-operation conforms to = <strong>UPU Convention Manual and Regulations</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0;padding-left:20px">
      <li><strong>Rule 2(h) Regional Director</strong> = Director; <strong>Rule 2(i) Regional Head</strong> = Postmaster General — don't swap these</li>
      <li><strong>Rule 7</strong> = CG or DG shall issue postage stamps; <strong>Rule 8</strong> = PAC advises on commemorative/special stamps</li>
      <li><strong>Rule 9</strong> = payment for mail services (postage); <strong>Rule 10</strong> = payment for other services</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points — Rules 1–12</h4>
    <ol style="margin:0;padding-left:20px">
      <li>PO Rules 2024: <strong>G.S.R. 767(E)</strong>, in force <strong>16.12.2024</strong>, under Sec. 12</li>
      <li>Supersedes <strong>Indian Post Office Rules, 1933</strong></li>
      <li>Circle Head = <strong>CPMG</strong>; Regional Head = <strong>PMG</strong>; Regional Director = <strong>Director</strong></li>
      <li>Rule 3: <strong>10 services</strong> — mail, value-added, UPS, financial, money remittance, insurance, citizen-centric, addressing, state/local, collaboration</li>
      <li>DG authorised under Rule 4 to: <strong>introduce, modify, or discontinue</strong> products</li>
      <li>Postal Services Board = <strong>apex policy body</strong>, perpetual succession, common seal</li>
      <li>PAC = advises on <strong>commemorative and special stamps</strong> (NOT definitive)</li>
      <li>Rule 9: <strong>5 payment modes</strong> — Cash, Digital, Stamp, Franking, Any other (by regulations)</li>
      <li>PIN codes = managed, allocated and published by <strong>Director General</strong></li>
      <li>International co-operation = conforms to <strong>UPU Convention</strong> + bilateral/multilateral agreements</li>
    </ol>
  </div>
</div>`
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // DAK SUTRA 4 — PO RULES 2024: INTERCEPTION, MARKS, SENDER, LIABILITY (Rules 13–19)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        title: "Post Office Rules 2024 — Official Marks, Sender, Interception & Liability (Rules 13–19)",
        rule_number: "Rules 13 to 19",
        act_name: "The Post Office Rules, 2024",
        category: "Rule",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "admin@dakguru.com",

        official_text: `
<div style="font-family:Georgia,serif;line-height:1.85">

  <div style="background:linear-gradient(135deg,#b71c1c,#c62828);color:#fff;padding:18px 22px;border-radius:12px;margin-bottom:22px">
    <h2 style="margin:0;font-size:1.4rem;letter-spacing:1px">📜 PO RULES 2024 — RULES 13 TO 19</h2>
    <p style="margin:8px 0 0;font-size:0.95rem;opacity:0.92">Official Marks · Sender Identity · Interception Powers · Liability</p>
    <p style="margin:4px 0 0;font-size:0.88rem;opacity:0.85">The most exam-critical section — Rule 16 alone generates 4–5 MCQs per exam!</p>
  </div>

  <h3 style="color:#880e4f;border-left:5px solid #ad1457;padding-left:12px">Rule 13 — Official Mark to be Denoted</h3>
  <p>The Post Office marks shall be the <strong>proof of certain facts denoted</strong> on the item, in respect of —</p>
  <ul>
    <li><strong>(a)</strong> The production of the item, having thereon the official mark of the Post Office denoting that the item has been <strong>refused or rejected or unclaimed, or cannot for any other reason be delivered</strong>, or any other remark so denoted, shall be <strong>sufficient proof</strong> of the fact indicated; and</li>
    <li><strong>(b)</strong> Every proceeding for the <strong>recovery of any postage or other sum alleged to be due</strong> under the Act.</li>
  </ul>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Rule 14 — Sender of Item</h3>
  <p>The person or the address or from whom the item is purported to have come, shall be <strong>deemed to be the sender</strong> thereof.</p>

  <h3 style="color:#2e7d32;border-left:5px solid #2e7d32;padding-left:12px">Rule 15 — Official Mark on Items</h3>
  <p>The <strong>Director General</strong> may, by regulations, authorise certain officers or officials to make an official mark on an item denoting that —</p>
  <ul>
    <li>(a) Any <strong>postage or other sum is due</strong> in respect thereof to the Post Office;</li>
    <li>(b) The mark shall be the proof that the said sum as is <strong>so due</strong>; and</li>
    <li>(c) The item has been <strong>refused or rejected or unclaimed, or cannot for any other reason be delivered</strong>.</li>
  </ul>

  <h3 style="color:#bf360c;border-left:5px solid #bf360c;padding-left:12px">Rule 16 — Interception, Detention and Opening of Item(s)</h3>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (1) — Normal Circumstances: Competent Authorities</h4>
  <p style="margin-left:12px">No direction for interception, detention or opening of any item or class of item shall be issued, <strong>except by an order made by —</strong></p>
  <ul style="margin-left:12px">
    <li>(a) A <strong>Member of the Board</strong> looking after the work of operations in the Department of Posts; OR</li>
    <li>(b) The <strong>Circle Head</strong>.</li>
  </ul>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (2) — Unavoidable Circumstances</h4>
  <p style="margin-left:12px">In unavoidable circumstances, such order may be made by an officer, <strong>not below the rank of the Regional Head or the Regional Director</strong>.</p>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (3) — Emergent Cases</h4>
  <p style="margin-left:12px">In emergent cases, where obtaining of prior directions is not feasible, the required interception shall be carried out on the directions of the <strong>Divisional Head</strong>, who shall —</p>
  <ul style="margin-left:12px">
    <li>Inform the concerned competent authority (under sub-rule (1) or (2)) within <strong>three working days</strong>;</li>
    <li>Such order shall be got confirmed by the concerned competent authority within a period of <strong>seven working days</strong>;</li>
    <li><strong>Proviso:</strong> If confirmation from the competent authority is NOT received within the stipulated <strong>seven days</strong>, such interception shall <strong>cease to operate</strong> and shall not be recommenced without the prior approval of the competent authority.</li>
  </ul>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (4) — Reasons in Writing</h4>
  <p style="margin-left:12px">Any order issued by the competent authority under sub-rules (1), (2) and (3) shall <strong>contain reasons to be recorded in writing</strong> for such direction.</p>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (5) — Review Committee</h4>
  <p style="margin-left:12px">In order to oversee the interception, the <strong>Central Government</strong> shall constitute a <strong>review committee</strong> consisting of —</p>
  <ul style="margin-left:12px">
    <li>(a) <strong>Director General, Posts</strong> — Chairman; and</li>
    <li>(b) <strong>Two Members of the Board</strong>, other than the Member mentioned in sub-rule (1) — Members.</li>
  </ul>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (6) — Meeting Frequency</h4>
  <p style="margin-left:12px">The review committee shall meet at least <strong>once in three months</strong> and review all directions issued under sub-rules (1), (2) and (3).</p>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (7) — Authorised Officers for Interception</h4>
  <p style="margin-left:12px">The Central Government hereby notifies the following officers as <strong>authorized officers</strong> to intercept and detain items on the orders of the competent authority —</p>
  <ul style="margin-left:12px">
    <li>(a) <strong>Officer in-charge of Post Office</strong> or any higher officer; or</li>
    <li>(b) <strong>Officer in-charge of the Mail Office</strong> or any higher officer.</li>
  </ul>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (8) — Opening Only in Presence of Law Enforcement</h4>
  <p style="margin-left:12px"><strong>No authorized officer shall open any item</strong> specified in this rule, except in the <strong>presence of the concerned law enforcement authority</strong>.</p>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (9) — Record Keeping</h4>
  <p style="margin-left:12px">The authorised officer shall maintain proper records mentioning —</p>
  <ul style="margin-left:12px">
    <li>Category of the item including any tracking number</li>
    <li>Particulars of sender and addressee</li>
    <li>Weight of the item</li>
    <li>Postage</li>
    <li>Reason for interception and detention</li>
    <li>Date of interception and detention of the item</li>
    <li>Duration for which the directions remain in force</li>
  </ul>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (10) — Disposal</h4>
  <p style="margin-left:12px">The authorised officer shall ensure the <strong>disposal of the item intercepted</strong> in the manner as specified in the <strong>Post Office Regulations, 2024</strong>.</p>

  <h4 style="color:#c62828;margin-left:12px">Sub-rule (11) — Duration of Interception Directions</h4>
  <p style="margin-left:12px">The directions for interception and detention shall remain in force, unless revoked earlier, for a period <strong>not exceeding thirty days</strong> from the date of issue and may be <strong>further extended</strong>:</p>
  <ul style="margin-left:12px">
    <li><strong>Proviso 1:</strong> The period may NOT be extended beyond <strong>ninety days</strong>.</li>
    <li><strong>Proviso 2:</strong> On expiry of the period specified in Proviso 1, the detained item shall be <strong>handed over to the concerned law enforcement authority</strong>.</li>
  </ul>

  <h4 style="color:#c62828;margin-left:12px">Sub-rules (12) & (13)</h4>
  <ul style="margin-left:12px">
    <li><strong>Sub-rule (12):</strong> The interception and detention of an item does <strong>NOT exempt the sender</strong> from any action which might have been taken, if the item had been delivered in due course through post.</li>
    <li><strong>Sub-rule (13):</strong> The provisions of sub-rules (1) to (11) shall apply <em>mutatis mutandis</em> to the items <strong>sent to and received from foreign countries</strong>.</li>
  </ul>

  <h3 style="color:#4a148c;border-left:5px solid #4a148c;padding-left:12px">Rule 17 — Duty of Authorized Officers in Delivering Items</h3>
  <p>The authorized officers shall be empowered to deliver an item, reckoned to contain anything liable to duty or suspected to contain any prohibited item, to such <strong>customs authority or any other law enforcement authority</strong> as may be specified in notification issued under sub-section (3) of Section 9 of the Act for taking necessary action in accordance with any law for the time being in force.</p>

  <h3 style="color:#00695c;border-left:5px solid #00695c;padding-left:12px">Rule 18 — Interception in Addition to and Not in Derogation of Other Laws</h3>
  <p>Nothing contained in rule 16 shall prevent interception of items as required under any law for the time being in force and shall be governed by any procedures applicable under such law.</p>

  <h3 style="color:#1565c0;border-left:5px solid #1565c0;padding-left:12px">Rule 19 — Exemption from Liability</h3>
  <ul>
    <li><strong>Rule 19(1):</strong> The <strong>Central Government</strong> shall provide <strong>compensation for loss or damage of an item</strong> or its contents or on any other grounds, if any, as specified in the regulations.</li>
    <li><strong>Rule 19(2):</strong> The compensation shall <strong>NOT exceed</strong> the amount of the loss or damage, and shall <strong>NOT be paid</strong> on —
      <ul>
        <li>Prohibited items; or</li>
        <li>Loss or damage caused by the <strong>fault or negligence of the sender</strong>; or</li>
        <li>Arising from <strong>force majeure</strong>.</li>
      </ul>
    </li>
  </ul>
</div>`,

        guru_explanation: `
<div style="font-family:Arial,sans-serif;line-height:1.8">

  <div style="background:linear-gradient(135deg,#ffebee,#ffcdd2);border-left:5px solid #b71c1c;padding:16px 20px;border-radius:10px;margin-bottom:20px">
    <h3 style="color:#b71c1c;margin:0 0 8px">🧠 Dak Guru's Take — Rule 16: The Interception Universe!</h3>
    <p style="margin:0">Rule 16 is the MOST exam-critical rule in PO Rules 2024. It has 13 sub-rules covering who can order interception, under what conditions, within what time frames, who reviews it, how long it lasts, and what happens at the end. <strong>Master the hierarchy and time limits — they appear in almost every exam.</strong></p>
  </div>

  <h4 style="color:#c62828">🏛️ Rule 16 — The Authority Pyramid for Interception</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:16px">
    <thead><tr style="background:#c62828;color:#fff"><th style="border:1px solid #ef9a9a;padding:9px">Situation</th><th style="border:1px solid #ef9a9a;padding:9px">Who Can Order?</th><th style="border:1px solid #ef9a9a;padding:9px">Time Constraint</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #ffcdd2;padding:8px;font-weight:bold">Normal circumstances [16(1)]</td><td style="border:1px solid #ffcdd2;padding:8px">Member of Board (Operations) OR Circle Head</td><td style="border:1px solid #ffcdd2;padding:8px">None specified</td></tr>
      <tr style="background:#fff8f8"><td style="border:1px solid #ffcdd2;padding:8px;font-weight:bold">Unavoidable circumstances [16(2)]</td><td style="border:1px solid #ffcdd2;padding:8px">Officer not below Regional Head OR Regional Director</td><td style="border:1px solid #ffcdd2;padding:8px">None specified</td></tr>
      <tr><td style="border:1px solid #ffcdd2;padding:8px;font-weight:bold">Emergent cases [16(3)]</td><td style="border:1px solid #ffcdd2;padding:8px">Divisional Head</td><td style="border:1px solid #ffcdd2;padding:8px">Must inform competent authority: <strong>3 working days</strong>; Confirmation must come: <strong>7 working days</strong></td></tr>
    </tbody>
  </table>

  <h4 style="color:#1565c0">⏰ Rule 16 — The Critical Time Limits</h4>
  <table style="width:100%;border-collapse:collapse;font-size:0.92rem;margin-bottom:16px">
    <thead><tr style="background:#1565c0;color:#fff"><th style="border:1px solid #90caf9;padding:9px">Event</th><th style="border:1px solid #90caf9;padding:9px">Time Limit</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Divisional Head must inform competent authority (emergent case)</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">3 working days</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Competent authority must confirm the interception</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">7 working days</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px">If no confirmation in 7 days</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">Interception CEASES to operate</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">Initial period of interception direction</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">Up to 30 days (extendable)</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Maximum total period of interception (including extensions)</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">90 days (absolute maximum)</td></tr>
      <tr style="background:#e3f2fd"><td style="border:1px solid #bbdefb;padding:8px">After 90 days, item is</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">Handed over to law enforcement authority</td></tr>
      <tr><td style="border:1px solid #bbdefb;padding:8px">Review Committee meetings</td><td style="border:1px solid #bbdefb;padding:8px;font-weight:bold">At least once in 3 months</td></tr>
    </tbody>
  </table>

  <h4 style="color:#2e7d32">🔑 Review Committee Composition</h4>
  <ul>
    <li>Chairman: <strong>Director General, Posts</strong></li>
    <li>Members: <strong>Two Members of the Board</strong> (other than the Member mentioned in sub-rule (1) — i.e., other than the "Member Operations")</li>
    <li>Constituted by: <strong>Central Government</strong></li>
  </ul>

  <h4 style="color:#4a148c">💡 Rule 19 — Compensation — The 3 No-Pay Conditions</h4>
  <p>Compensation shall NOT be paid if: (1) Item is <strong>prohibited</strong>; (2) Loss caused by <strong>fault/negligence of sender</strong>; (3) Arises from <strong>force majeure</strong>. Always stated as the "3 exclusions."</p>

  <div style="background:#fff3e0;border:1.5px solid #ff6f00;border-radius:8px;padding:14px 18px;margin-top:12px">
    <h4 style="color:#e65100;margin:0 0 8px">⚡ Rule 18 — Non-Obstante Clause</h4>
    <p style="margin:0">Rule 16's interception procedure does NOT prevent interception under any OTHER law (like NDPS Act, IPC, Customs Act). Rule 18 is a "saving clause" — it ensures that Rule 16 works <em>in addition to</em>, not instead of, other laws. A frequently missed but important concept.</p>
  </div>
</div>`,

        practical_example: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <h4 style="color:#00695c">🎯 Practical Scenarios — PO Rules 2024 (Rules 13–19)</h4>

  <div style="background:#ffebee;border-left:4px solid #c62828;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 1 — Interception Authority [Rule 16(1)]:</strong> A suspicious parcel is identified at the Chennai sorting hub during normal operations. An IP wants to order its interception. Can he? → <strong>No</strong> — In normal circumstances, only a <em>Member of the Board (Operations)</em> or the <em>Circle Head</em> can order interception. An IP is far below the required rank.</p>
  </div>

  <div style="background:#fce4ec;border-left:4px solid #880e4f;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 2 — Emergency Interception [Rule 16(3)]:</strong> A Divisional Superintendent (acting as Divisional Head) intercepts a parcel in an emergent case without prior directions. What must he do next? → He must <strong>inform the competent authority within 3 working days</strong>. The competent authority must then confirm within <strong>7 working days</strong>. If no confirmation in 7 days, the interception automatically ceases.</p>
  </div>

  <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 3 — Interception Duration [Rule 16(11)]:</strong> A parcel is intercepted and initially held for 30 days. The security agency wants to extend the detention. For how long can it be further extended? → Extensions are allowed but the <strong>total period cannot exceed 90 days</strong>. After 90 days, the item must be handed over to the law enforcement authority.</p>
  </div>

  <div style="background:#e3f2fd;border-left:4px solid #1565c0;padding:12px 16px;border-radius:6px;margin-bottom:14px">
    <p><strong>Scenario 4 — Compensation Exclusion [Rule 19(2)]:</strong> A sender packed a prohibited firearm in a parcel and it was lost in transit. Can the sender claim compensation? → <strong>No</strong> — Rule 19(2) explicitly states compensation shall not be paid on <em>prohibited items</em>. Additionally, the sender may also face legal action.</p>
  </div>

  <div style="background:#f3e5f5;border-left:4px solid #6a1b9a;padding:12px 16px;border-radius:6px">
    <p><strong>Scenario 5 — Sender Identity [Rule 14]:</strong> A parcel arrives with a return address "XYZ Enterprises, Delhi." The actual sending person is unknown. Who is deemed the sender? → Under Rule 14, <strong>the person OR the address from whom the item is purported to have come</strong> is deemed the sender. So "XYZ Enterprises, Delhi" is the deemed sender.</p>
  </div>
</div>`,

        exam_insight: `
<div style="font-family:Arial,sans-serif;line-height:1.8">
  <div style="background:linear-gradient(135deg,#ffebee,#ffcdd2);border-left:5px solid #b71c1c;padding:16px 20px;border-radius:10px;margin-bottom:18px">
    <h4 style="color:#b71c1c;margin:0 0 10px">⚡ EXAM INSIGHT — PO Rules 2024 Rules 13–19</h4>

    <p style="margin:0 0 10px"><strong>🔥 Most Asked Facts:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li>Normal interception ordered by: <strong>Member Board (Operations) OR Circle Head</strong></li>
      <li>Unavoidable circumstances: officer not below <strong>Regional Head or Regional Director</strong></li>
      <li>Emergency interception: by <strong>Divisional Head</strong></li>
      <li>Emergent case: inform competent authority within <strong>3 working days</strong></li>
      <li>Emergent case: confirmation required within <strong>7 working days</strong></li>
      <li>If no confirmation in 7 days: <strong>interception ceases</strong></li>
      <li>Max initial period: <strong>30 days</strong></li>
      <li>Absolute maximum period: <strong>90 days</strong></li>
      <li>After 90 days: <strong>handed over to law enforcement authority</strong></li>
      <li>Review Committee Chairman: <strong>Director General, Posts</strong></li>
      <li>Review Committee Members: <strong>2 Members of the Board</strong> (other than Member Operations)</li>
      <li>Review Committee frequency: <strong>at least once in 3 months</strong></li>
      <li>Opening item: only in presence of <strong>law enforcement authority</strong></li>
      <li>Authorised officers for interception: <strong>Officer in-charge of Post Office or Mail Office</strong> (or higher)</li>
      <li>Interception does <strong>NOT exempt sender</strong> from legal action</li>
      <li>Rule 16 applies to foreign items also: <strong>mutatis mutandis</strong></li>
      <li>Compensation NOT paid: <strong>prohibited items, sender's fault, force majeure</strong></li>
    </ul>

    <p style="margin:0 0 8px"><strong>🔁 Frequently Confused Points:</strong></p>
    <ul style="margin:0 0 12px;padding-left:20px">
      <li><strong>3 working days</strong> = inform; <strong>7 working days</strong> = confirm — do not swap</li>
      <li><strong>30 days</strong> = initial; <strong>90 days</strong> = absolute maximum — do not say 60 days</li>
      <li>Review Committee = constituted by <strong>CG</strong>, chaired by <strong>DG Posts</strong></li>
      <li>Rule 18 = interception under Rule 16 does NOT prevent interception under other laws</li>
    </ul>

    <p style="margin:0 0 8px"><strong>⚠️ Key Distinctions:</strong></p>
    <ul style="margin:0;padding-left:20px">
      <li><strong>Rule 13</strong> = Official mark is proof (evidentiary value); <strong>Rule 15</strong> = DG authorises officers to make official marks</li>
      <li><strong>Rule 14</strong> = Sender = person OR address from whom item purported to have come (deemed sender concept)</li>
      <li><strong>Rule 17</strong> = Duty to deliver to customs (duty-liable/prohibited items); <strong>Rule 18</strong> = Interception under other laws also permitted</li>
    </ul>
  </div>

  <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:14px 18px;border-radius:8px">
    <h4 style="color:#1b5e20;margin:0 0 10px">📌 Ultra-Revision Points — Rules 13–19</h4>
    <ol style="margin:0;padding-left:20px">
      <li>Rule 13: Official PO mark = <strong>proof of fact</strong> (prima facie evidence of refused/unclaimed/undeliverable)</li>
      <li>Rule 14: <strong>Deemed sender</strong> = person or address from whom item purported to come</li>
      <li>Rule 15: DG by regulations authorises officers to make official marks on items</li>
      <li>Rule 16(1): Normal interception = <strong>Member Board (Ops) OR Circle Head</strong></li>
      <li>Rule 16(2): Unavoidable = <strong>Regional Head OR Regional Director</strong> (not below)</li>
      <li>Rule 16(3): Emergency = <strong>Divisional Head</strong> → inform in <strong>3 days</strong> → confirm in <strong>7 days</strong></li>
      <li>Rule 16(5): Review Committee = <strong>DG (Chairman) + 2 Board Members</strong>, meets <strong>every 3 months</strong></li>
      <li>Rule 16(8): Item opened ONLY in presence of <strong>law enforcement authority</strong></li>
      <li>Rule 16(11): Max <strong>30 days</strong> initial; max <strong>90 days</strong> total; then → law enforcement</li>
      <li>Rule 19: No compensation for: <strong>prohibited items, sender's fault, force majeure</strong></li>
    </ol>
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

        console.log(`\n🎉 Done! ${inserted} new Dak Sutra entries inserted/updated.`);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
