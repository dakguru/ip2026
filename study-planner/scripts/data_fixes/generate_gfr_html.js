const fs = require('fs');

const rulesChapter2 = [
  { no: '18', head: 'Remission of Revenue', meaning: 'No revenue claim can be remitted or abandoned <strong>without the sanction of the competent authority</strong>.' },
  { no: '19', head: 'Annual Revenue Remission Statement', meaning: 'Departments submit an annual statement to the Audit & Accounts Officer on <strong>1st of June</strong>. Individual remissions below <strong>₹1,000</strong> are excluded.' },
  { no: '20', head: 'Power to make rules for Remission', meaning: 'Departments may frame departmental rules for remission of revenue, subject to general rules issued by the Government.' },
  { no: '21', head: 'Standards of financial propriety', meaning: 'Every officer must ensure expenditure is <strong>not prima-facie more than the occasion demands</strong> — guided by the highest standards of propriety.' },
  { no: '22', head: 'Expenditure from Public Funds', meaning: 'No authority may incur any expenditure or enter into any liability involving expenditure from public funds <strong>unless sanctioned</strong> by a competent authority.' },
  { no: '23', head: 'Delegations of Financial powers', meaning: 'Financial powers <strong>not delegated</strong> to subordinate authorities vest <strong>exclusively in the Finance Ministry</strong>.' },
  { no: '24', head: 'Consultation with Financial Advisers', meaning: 'Before incurring any expenditure, Departments <strong>must consult their Financial Adviser</strong>.' },
  { no: '25', head: 'Provision of funds for sanction', meaning: '<strong>No expenditure</strong> shall be incurred from public revenues without provision of funds — must ensure <strong>budget exists</strong> before spending.' },
  { no: '26', head: 'Responsibility of Controlling Officer', meaning: 'The Controlling Officer is <strong>personally responsible</strong> for ensuring expenditure does not exceed the budget allocation and guarding against waste.' },
  { no: '27', head: 'Date of effect of sanction', meaning: 'Rules, sanctions or orders come into force from the <strong>date of issue</strong> unless any other date is specified therein.' },
  { no: '28', head: 'Required previous consent of the Finance Ministry', meaning: '<strong>Prior Finance Ministry consent mandatory</strong> for granting land, assigning revenue, concession/lease of mineral/forest rights, or relinquishment of revenue.' },
  { no: '29', head: 'Procedure for communication of sanctions', meaning: 'All financial sanctions go to Audit — <strong>except certain categories</strong> like advances, establishment (appointment/promotion), GPF, and routine contingencies.' },
  { no: '30', head: 'Lapse of sanctions', meaning: 'A sanction <strong>automatically lapses</strong> if no payment is made during a period of <strong>12 months</strong> from the date of issue.' },
  { no: '31', head: 'Sanction of an allowance', meaning: 'A sanction respect of an allowance sanctioned for a post, but not drawn, shall <strong>not lapse</strong> within 12 months.' },
  { no: '32', head: 'Remission of disallowances & writing off overpayment', meaning: 'Disallowances by Audit on government servant payments can be remitted, and overpayments written off according to Delegation of Financial Power rules.' },
  { no: '33', head: 'Report of Losses', meaning: 'Any loss of public money/property must be reported to the next higher authority immediately. Petty losses <strong>up to ₹10,000</strong> need not be reported.' },
  { no: '34', head: 'Loss of Government Property due to fire, theft, fraud', meaning: 'Losses above <strong>₹50,000</strong> due to suspected fire, theft, fraud must be invariably reported to the <strong>Police for investigation</strong> as early as possible.' },
  { no: '35', head: 'Loss of immovable Property due to fire, flood etc.', meaning: 'Loss of immovable property exceeding <strong>₹50,000</strong> caused by fire, flood, cyclone, earthquake must be reported at once.' },
  { no: '36', head: 'Report to Audit and Accounts Officers', meaning: 'After a full enquiry of the loss, a copy of the report must be forwarded to the <strong>Audit officer and Pay and Accounts Officer</strong>.' },
  { no: '37', head: 'Responsibility of losses', meaning: 'An officer shall be held <strong>personally responsible</strong> for any loss sustained by the Government through fraud or negligence on his part.' },
  { no: '38', head: 'Prompt disposal of cases of loss', meaning: 'Action at each stage of detection, reporting, write off, and remedial measures should be <strong>completed promptly</strong>.' },
  { no: '39', head: 'Demand for information by Audit or Accounts Officer', meaning: 'A subordinate authority is fully responsible to furnish <strong>any information required</strong> by Audit or PAO for official account or report preparation.' },
  { no: '40', head: 'Submission of records and information', meaning: 'A subordinate authority shall <strong>not withhold any information</strong>, books or other documents required by the Audit Officer.' },
  { no: '41', head: 'Handling of Secret/Top Secret Files', meaning: 'Secret/Top Secret files must be sent <strong>personally</strong> to the <strong>Head of the Audit Office</strong> specifying this fact.' }
];

const rulesChapter6A = [
  { no: '143', head: 'Definition of Goods', meaning: 'Includes all tangible/intangible products, software, technology transfer, licenses. <strong>Excludes</strong> books, publications, periodicals for a library.' },
  { no: '144', head: 'Fundamental principles of public buying', meaning: 'All procurements must bring <strong>efficiency, economy, and transparency</strong>. Specs must be Objective, Functional, Generic, Measurable (OFGM).' },
  { no: '145', head: 'Authorities competent to purchase goods', meaning: 'An authority competent to incur expenditure may sanction purchase of goods in accordance with the Delegation of Financial Powers Rules.' },
  { no: '146', head: 'Procurement of goods required on mobilization', meaning: 'Special procedures apply for procurement during urgent or mobilization situations.' },
  { no: '147', head: 'Powers for procurement of goods', meaning: 'Common use Goods and Services available on GeM are required to be <strong>procured mandatorily</strong> as per Rule 149.' },
  { no: '148', head: 'Deleted', meaning: '<em>This rule has been deleted in GFR 2017.</em>' },
  { no: '149', head: 'Government e-Market place (GeM)', meaning: 'Mandatory portal. Direct buy up to <strong>₹50,000</strong>. L1 from 3+ sellers up to <strong>₹10,00,000</strong>. Bidding/Reverse Auction above <strong>₹10,00,000</strong>. <em>(Limits revised 10.07.2024)</em>' },
  { no: '150', head: 'Registration of Suppliers', meaning: 'For goods not on GeM, Ministry may register suppliers for <strong>1 to 3 years</strong> after verifying credentials.' },
  { no: '151', head: 'Debarment from bidding', meaning: 'Debarred up to <strong>3 years</strong> for corruption/BNS offences. Debarred up to <strong>2 years</strong> for breach of code of integrity.' },
  { no: '152', head: 'Enlistment of Indian Agents', meaning: 'Compulsory for Indian agents who desire to quote directly on behalf of their foreign principals to get themselves enlisted.' },
  { no: '153', head: 'Reserved Items and other Purchase/Price Preference Policy', meaning: 'Mandatory procurement of at least <strong>20% from handloom origin/KVIC</strong> and purchase preference policies for MSMEs.' },
  { no: '154', head: 'Purchase of goods without quotation', meaning: 'Direct purchase up to <strong>₹50,000</strong> on each occasion without inviting quotations or bids. <em>(Revised from ₹25k on 10.07.2024)</em>' },
  { no: '155', head: 'Purchase of goods by Purchase Committee', meaning: 'For goods costing above <strong>₹50,000 and up to ₹5,00,000</strong>. Made on recommendations of a Local Purchase Committee of <strong>3 members</strong>. <em>(Revised limits on 10.07.2024)</em>' },
  { no: '156', head: 'Deleted', meaning: '<em>This rule has been deleted.</em>' },
  { no: '157', head: 'Prohibition of piecemeal purchases', meaning: 'A demand for goods should <strong>not be divided into small quantities</strong> to avoid procurement through L1 buying/bidding or sanction limits.' },
  { no: '158', head: 'Purchase of goods by obtaining bids', meaning: 'Standard methods include: Advertised Tender, Limited Tender, Two-Stage, Single Tender, and Electronic Reverse Auctions.' },
  { no: '159', head: 'E-Publishing', meaning: 'Mandatory for all Ministries/Departments to publish tender enquiries, corrigenda, and bid awards on the <strong>Central Public Procurement Portal (CPPP)</strong>.' },
  { no: '160', head: 'E-Procurement', meaning: 'Mandatory to receive all bids through e-procurement portals in respect of all procurements.' },
  { no: '161', head: 'Advertised Tender Enquiry', meaning: 'For procurement of goods of estimated value <strong>₹50 lakhs and above</strong>. Min time <strong>3 weeks</strong> (4 weeks for global). Global Tender Enquiry (GTE) not allowed up to <strong>₹200 crores</strong>. <em>(Revised 10.07.2024)</em>' },
  { no: '162', head: 'Limited Tender Enquiry', meaning: 'May be adopted when estimated value is <strong>up to ₹50 lakhs</strong>. Number of supplier firms should be more than three. <em>(Revised 10.07.2024)</em>' },
  { no: '163', head: 'Two bid system', meaning: 'For complex/technical machinery. Simultaneous receipt of separate technical and financial bids. Technical opened first.' },
  { no: '164', head: 'Two-Stage Bidding', meaning: 'Stage 1: technical bids without price. Stage 2: final bids with prices from those whose technical bids were acceptable.' },
  { no: '165', head: 'Late Bids', meaning: 'Bids received after the specified date and time for receipt of bids <strong>should not be considered</strong>.' },
  { no: '166', head: 'Single Tender Enquiry', meaning: 'Allowed if only a particular firm manufactures it, in emergencies, or for standardization. Requires a <strong>Proprietary Article Certificate (PAC)</strong>.' },
  { no: '167', head: 'Electronic Reverse Auctions', meaning: 'An online real-time purchasing technique involving presentation by bidders of successively more favorable bids.' },
  { no: '168', head: 'Contents of Bidding Document', meaning: 'Must contain instructions, conditions, schedule of requirements, specifications, and price schedule.' },
  { no: '169', head: 'Maintenance Contract', meaning: 'Needed for sophisticated/costly equipment. Should commence only after the warranty period or extended warranty.' },
  { no: '170', head: 'Bid security (Earnest Money)', meaning: 'Normally ranges between <strong>2% to 5%</strong>. Valid for a period of <strong>45 days</strong> beyond the final bid validity period.' },
  { no: '171', head: 'Performance Security', meaning: 'Amount of <strong>3% to 5%</strong>. Should remain valid for <strong>60 days</strong> beyond the date of completion of all contractual obligations. <em>(Revised from 3-10% to 3-5% w.e.f 01.01.2024)</em>' },
  { no: '172', head: 'Advance payment to Supplier', meaning: 'Should not exceed <strong>30%</strong> (private firms) or <strong>40%</strong> (State/Central agency). For maintenance contracts, not exceeding 6 months.' },
  { no: '173', head: 'Transparency, competition, fairness', meaning: 'All purchases must be transparent and fair. Quotations with NIL charges/consideration will be treated as unresponsive.' },
  { no: '174', head: 'Efficiency, Economy and Accountability', meaning: 'Public procurement procedure should ensure efficiency, economy and accountability in the system.' },
  { no: '175', head: 'Code of Integrity', meaning: 'Prohibition of making offer, acceptance of bribe or reward. Disciplinary action or debarment if contravened.' },
  { no: '176', head: 'Buy-Back Offer', meaning: 'Department may trade the existing old item while purchasing the new one with approval of competent authority.' }
];

const rulesChapter6B = [
  { no: '177', head: 'Consulting Service', meaning: 'Means any subject matter of procurement other than goods or works, including professional, intellectual, training and advisory services.' },
  { no: '178', head: 'Hiring of Consultants', meaning: 'Ministries may hire external professionals or consultancy firms for a specific job which is well defined in content and time frame.' },
  { no: '183', head: 'Identification of likely sources', meaning: 'Up to <strong>₹50 lakhs</strong>: formal/informal enquiries. Above <strong>₹50 lakhs</strong>: Expression of Interest (EoI) on CPPP. <em>(Revised from ₹25L to ₹50L on 10.07.2024)</em>' },
  { no: '184', head: 'Short listing of consultants', meaning: 'The number of short-listed consultants should <strong>not be less than three</strong>.' },
  { no: '185', head: 'Preparation of Terms of Reference (TOR)', meaning: 'TOR must include precise statement of objectives, outline of tasks, schedule for completion, and inputs provided by Ministry.' },
  { no: '186', head: 'Preparation and Issue of Request for Proposal (RFP)', meaning: 'RFP is the document to be used for obtaining offers from the shortlisted consultants.' },
  { no: '187', head: 'Receipt and opening of proposals', asked: true, meaning: 'Asked for in <strong>Two bid</strong> system. Technical proposals should be <strong>opened first</strong>.' },
  { no: '192', head: 'Quality and Cost Based Selection (QCBS)', meaning: 'Weights applied to Quality and Cost (e.g. 70:30, 80:20). Non-financial parameters weightage <strong>cannot exceed 80%</strong>.' },
  { no: '193', head: 'Least Cost System (LCS)', meaning: 'Responsive technically qualified proposal with the <strong>lowest evaluated cost</strong> shall be selected (no weightage for technical score beyond qualification).' },
  { no: '194', head: 'Single Source Selection/Consultancy by nomination', meaning: 'Direct negotiation/nomination under exceptional circumstances (emergencies, continuation of work, only one consultant has expertise).' }
];

const rulesChapter6C = [
  { no: '197', head: 'Non-Consulting Service', meaning: 'Services with physical, measurable deliverables/outcomes (e.g. maintenance, hiring of vehicles, security, janitor, photocopying).' },
  { no: '201', head: 'Invitation of Bids', meaning: 'Up to <strong>₹50 lakhs</strong>: Limited tender enquiry from identified contractors. Above <strong>₹50 lakhs</strong>: Advertisement on CPPP. <em>(Revised from ₹10L to ₹50L on 10.07.2024)</em>' },
  { no: '204', head: 'Procurement of Non-consulting services by nomination', meaning: 'Allowed in exceptional situations with detailed justification and consultation with Financial Adviser.' }
];

function generateRows(rules) {
  const colors = ['#1565c0', '#0d47a1', '#283593'];
  const bgColors = ['#fff', '#f3f8ff'];
  let html = '';
  rules.forEach((r, i) => {
    const cIdx = i % colors.length;
    const bgIdx = i % bgColors.length;
    html += `      <tr style="background:${bgColors[bgIdx]}">
        <td style="padding:9px 14px;text-align:center;border-right:2px solid #90caf9;border-bottom:1px solid #e3f2fd;">
          <span style="background:${colors[cIdx]};color:white;padding:3px 12px;border-radius:20px;font-size:14px;font-weight:900">${r.no}</span>
        </td>
        <td style="padding:9px 14px;font-size:13px;font-weight:800;color:#0c2461;border-right:1px solid #90caf9;border-bottom:1px solid #e3f2fd;">${r.head}</td>
        <td style="padding:9px 14px;font-size:13px;color:#333;border-bottom:1px solid #e3f2fd;line-height:1.7">${r.meaning}</td>
      </tr>\n`;
  });
  return html;
}

const finalHtml = `
<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0c2461,#1e3799);color:white;padding:16px 22px;border-radius:14px 14px 0 0;display:flex;align-items:center;gap:14px">
    <span style="font-size:30px">🗂️</span>
    <div>
      <div style="font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;opacity:0.75">Ultra Memory Guide · General Financial Rules, 2017</div>
      <div style="font-size:18px;font-weight:900;margin-top:4px">Complete Serial Rule Number Reference — Chapter 2 &amp; Chapter 6</div>
      <div style="font-size:12px;opacity:0.8;margin-top:3px">Every important rule, in order, with its one-line meaning. Memorise this table = Exam ready. Updated with 10.07.2024 Amendments.</div>
    </div>
  </div>
  <div style="border:2px solid #c7d3f0;border-top:none;border-radius:0 0 14px 14px;background:#f0f4ff;padding:12px 18px">
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <span style="background:#0c2461;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📘 Chapter 2: Rules 18 → 41</span>
      <span style="background:#1b5e20;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📗 Chapter 6A: Rules 143 → 176 (Goods)</span>
      <span style="background:#880e4f;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📕 Chapter 6B: Rules 177 → 196 (Consulting)</span>
      <span style="background:#e65100;color:white;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:800">📙 Chapter 6C: Rules 197 → 205 (Non-Consulting)</span>
    </div>
  </div>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#0c2461,#1565c0);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📘</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 2</div>
      <div style="font-size:15px;font-weight:900">General System of Financial Management (Rules 18 to 41)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #90caf9;border-top:none">
    <thead>
      <tr style="background:#e3f2fd">
        <th style="padding:9px 14px;font-size:12px;color:#0c2461;font-weight:900;text-align:center;border-right:2px solid #90caf9;border-bottom:2px solid #90caf9;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#0c2461;font-weight:900;text-align:left;border-right:2px solid #90caf9;border-bottom:2px solid #90caf9;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#0c2461;font-weight:900;text-align:left;border-bottom:2px solid #90caf9">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
${generateRows(rulesChapter2)}
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📗</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 6, Part A</div>
      <div style="font-size:15px;font-weight:900">Procurement of Goods (Rules 143 to 176)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #a5d6a7;border-top:none">
    <thead>
      <tr style="background:#e8f5e9">
        <th style="padding:9px 14px;font-size:12px;color:#1b5e20;font-weight:900;text-align:center;border-right:2px solid #a5d6a7;border-bottom:2px solid #a5d6a7;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#1b5e20;font-weight:900;text-align:left;border-right:2px solid #a5d6a7;border-bottom:2px solid #a5d6a7;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#1b5e20;font-weight:900;text-align:left;border-bottom:2px solid #a5d6a7">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
${generateRows(rulesChapter6A)}
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#880e4f,#ad1457);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📕</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 6, Part B</div>
      <div style="font-size:15px;font-weight:900">Consulting Services (Rules 177 to 196)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #f48fb1;border-top:none">
    <thead>
      <tr style="background:#fce4ec">
        <th style="padding:9px 14px;font-size:12px;color:#880e4f;font-weight:900;text-align:center;border-right:2px solid #f48fb1;border-bottom:2px solid #f48fb1;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#880e4f;font-weight:900;text-align:left;border-right:2px solid #f48fb1;border-bottom:2px solid #f48fb1;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#880e4f;font-weight:900;text-align:left;border-bottom:2px solid #f48fb1">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
${generateRows(rulesChapter6B)}
    </tbody>
  </table>
</div>

<div style="margin-bottom:22px">
  <div style="background:linear-gradient(135deg,#e65100,#ef6c00);color:white;padding:12px 18px;border-radius:10px 10px 0 0;display:flex;align-items:center;gap:10px">
    <span style="font-size:20px">📙</span>
    <div>
      <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">GFR 2017 — Chapter 6, Part C</div>
      <div style="font-size:15px;font-weight:900">Non-Consulting Services (Rules 197 to 205)</div>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;border:2px solid #ffcc80;border-top:none">
    <thead>
      <tr style="background:#fff3e0">
        <th style="padding:9px 14px;font-size:12px;color:#e65100;font-weight:900;text-align:center;border-right:2px solid #ffcc80;border-bottom:2px solid #ffcc80;width:100px">Rule No.</th>
        <th style="padding:9px 14px;font-size:12px;color:#e65100;font-weight:900;text-align:left;border-right:2px solid #ffcc80;border-bottom:2px solid #ffcc80;width:220px">Heading / Subject</th>
        <th style="padding:9px 14px;font-size:12px;color:#e65100;font-weight:900;text-align:left;border-bottom:2px solid #ffcc80">One-Line Meaning (Exam-Ready)</th>
      </tr>
    </thead>
    <tbody>
${generateRows(rulesChapter6C)}
    </tbody>
  </table>
</div>
`;

fs.writeFileSync('D:\\IP 2026\\study-planner\\gfr_ultra_memory_guide_corrected.html', finalHtml);
console.log('Corrected HTML generated.');
