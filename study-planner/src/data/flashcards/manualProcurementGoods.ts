import { RawQuestion } from '../quizzes';

// Manual on Policies and Procedures for Purchase of Goods and Services
// Department of Expenditure, Ministry of Finance — June 2022
// Set 1: General Principles, Definitions, Methods of Procurement

export const manual_procurement_set1: RawQuestion[] = [
  {
    q: "The Manual on Policies and Procedures for Purchase of Goods was released by which authority in June 2022?",
    o: ["Central Vigilance Commission", "Department of Expenditure, Ministry of Finance", "Ministry of Commerce and Industry", "Director General of Supplies & Disposals"],
    a: 1,
    e: "The Department of Expenditure (DoE), Ministry of Finance released three manuals in June 2022 — for Goods, Works, and Consultancy & Other Services — replacing earlier fragmented instructions."
  },
  {
    q: "Which GFR 2017 Rule lays down the general principles applicable to procurement of goods by Government?",
    o: ["Rule 135", "Rule 144", "Rule 149", "Rule 160"],
    a: 0,
    e: "GFR Rule 135 lays down the general financial principles: economy, efficiency, transparency, fair competition, and integrity in procurement."
  },
  {
    q: "What is the upper limit for direct purchase of goods without quotation/tender (not through GeM)?",
    o: ["Rs. 10,000", "Rs. 15,000", "Rs. 25,000", "Rs. 50,000"],
    a: 2,
    e: "As per GFR Rule 144(a), goods of value up to Rs. 25,000 may be procured without obtaining bids, in a single purchase from an eligible vendor."
  },
  {
    q: "Under GFR Rule 144, Limited Tender Inquiry (LTI) is applicable for procurement valued above Rs. 25,000 and up to:",
    o: ["Rs. 5 lakh", "Rs. 10 lakh", "Rs. 25 lakh", "Rs. 1 crore"],
    a: 2,
    e: "Limited Tender Inquiry (LTI) is applicable for procurements above Rs. 25,000 and up to Rs. 25,00,000 (Rs. 25 lakh)."
  },
  {
    q: "Open Tender Inquiry (OTI) must be used for procurement of goods valued above:",
    o: ["Rs. 5 lakh", "Rs. 10 lakh", "Rs. 25 lakh", "Rs. 1 crore"],
    a: 2,
    e: "Open Tender Inquiry (OTI) is mandatory for procurements above Rs. 25,00,000 (Rs. 25 lakh), to ensure wide competition and transparency."
  },
  {
    q: "In Limited Tender Inquiry, what is the minimum number of vendors that must be contacted?",
    o: ["2", "3", "5", "7"],
    a: 1,
    e: "At least 3 vendors must be contacted in a Limited Tender Inquiry. If fewer than 3 eligible vendors exist, reasons must be recorded."
  },
  {
    q: "Single Tender Inquiry (Nomination basis) is permissible in which of the following circumstances?",
    o: ["When the estimated value is below Rs. 1 lakh", "In emergencies or when only one source exists", "When L-1 defaults in an earlier tender", "When foreign goods are procured"],
    a: 1,
    e: "Single Tender / Nomination is permitted only in exceptional circumstances: genuine emergencies, proprietary items, or when only a single manufacturer/supplier exists. Full justification must be recorded."
  },
  {
    q: "Which definition correctly describes 'Goods' under the procurement manual?",
    o: ["Only manufactured articles and raw materials", "All articles, materials, commodities, livestock, furniture, fixtures, raw material, spares and things", "Only items procured from the market with a price tag", "Capital assets only"],
    a: 1,
    e: "'Goods' has a broad definition encompassing all articles, materials, commodities, livestock, furniture, fixtures, raw material, spares and things that can be purchased, hired, or leased."
  },
  {
    q: "The principle of 'Value for Money' in procurement means:",
    o: ["Procuring the cheapest goods irrespective of quality", "Getting the lowest price by aggressive negotiation", "Achieving the optimal combination of whole-life cost and quality to meet the requirement", "Avoiding any expenditure beyond the approved budget"],
    a: 2,
    e: "Value for Money means achieving the best combination of whole-life cost and quality to meet the needs — it does not mean lowest price alone."
  },
  {
    q: "The 5 R's framework of public procurement, as mentioned in the manual, includes which of the following?",
    o: ["Right Quality, Right Quantity, Right Price, Right Time & Place, Right Source", "Right Vendor, Right Quality, Right Delivery, Right Price, Right Documentation", "Right Contract, Right Inspection, Right Payment, Right Disposal, Right Audit", "Right Approval, Right Tendering, Right Evaluation, Right Award, Right Closure"],
    a: 0,
    e: "The 5 R's are: Right Quality, Right Quantity, Right Price, Right Time & Place, and Right Source — the guiding framework for public procurement."
  },
  {
    q: "Annual Procurement Plan must be prepared by ministries/departments by:",
    o: ["31st October of the current financial year", "1st April of the financial year", "31st March of the preceding financial year", "Beginning of the financial year"],
    a: 3,
    e: "Procurement planning must be completed at the beginning of the financial year so that the procurement cycle can be completed and goods received within the financial year."
  },
  {
    q: "Rate Contracts for common use items are entered into by which organisation on behalf of Government of India?",
    o: ["Ministry of Finance (DFA)", "National Productivity Council", "DGS&D (Directorate General of Supplies & Disposals)", "CPWD"],
    a: 2,
    e: "DGS&D enters into Rate Contracts (RCs) with manufacturers/firms for common use items, and Government departments can directly place supply orders against these RCs without further tendering."
  },
  {
    q: "Splitting of a procurement requirement into smaller lots to avoid the threshold limit requiring Open Tender Inquiry is:",
    o: ["Permissible if each split is below Rs. 25 lakh", "Permissible with approval of Head of Department", "Strictly prohibited", "Permissible only for perishable goods"],
    a: 2,
    e: "Splitting procurements to circumvent tender thresholds is strictly prohibited and treated as a serious irregularity."
  },
  {
    q: "Which authority is competent to approve procurement through Single Tender (Nomination basis)?",
    o: ["Dealing Officer", "Head of the Section", "An officer not below the rank of Under Secretary or equivalent", "Any Gazetted officer"],
    a: 2,
    e: "Single Tender procurement must be approved by an officer not below the rank of Under Secretary or equivalent, with full written justification."
  },
  {
    q: "What is 'Consignee' in procurement terminology?",
    o: ["The vendor supplying the goods", "The person/authority authorized to receive the contracted goods", "The customs clearing agent", "The transporter of goods"],
    a: 1,
    e: "Consignee is the person or authority named in the supply order who is authorized to receive the goods at the specified destination."
  },
  {
    q: "Which of the following is NOT a valid mode of procurement under GFR 2017?",
    o: ["Limited Tender Inquiry", "Open Tender Inquiry", "Government e-Marketplace (GeM)", "Verbal tender or oral inquiry"],
    a: 3,
    e: "Verbal/oral tenders have no legal validity. All procurement must follow documented procedures: Direct, LTI, OTI, GeM, or Single Tender."
  },
  {
    q: "The term 'Earnest Money Deposit (EMD)' or 'Bid Security' is used to:",
    o: ["Guarantee the quality of goods supplied", "Ensure bidder does not withdraw after submitting bid", "Cover liquidated damages if delivery is delayed", "Secure advance payment made to the vendor"],
    a: 1,
    e: "EMD/Bid Security ensures a bidder remains committed to their bid during validity period and does not withdraw or modify post-submission — protecting the purchaser."
  },
];

// Set 2: Tender Process — Publication, Bid Documents, Evaluation, GeM

export const manual_procurement_set2: RawQuestion[] = [
  {
    q: "Open Tenders above what value must compulsorily be published on the Central Public Procurement Portal (CPPP)?",
    o: ["Rs. 5 lakh", "Rs. 10 lakh", "Rs. 25 lakh", "All open tenders regardless of value"],
    a: 3,
    e: "All Open Tender Inquiries must be published on the CPPP (eprocure.gov.in/cppp) in addition to the organization's own website, ensuring wide publicity."
  },
  {
    q: "Under the Make in India (Public Procurement) Order 2017 (as amended 2020), a 'Class I Local Supplier' has local content of at least:",
    o: ["20%", "30%", "50%", "75%"],
    a: 2,
    e: "Class I Local Supplier: local content ≥ 50%. Class II Local Supplier: 20% to <50%. Non-local supplier: <20%."
  },
  {
    q: "In procurements up to Rs. 200 crore (where sufficient local competition exists), which suppliers are eligible to participate?",
    o: ["Only Class I Local Suppliers", "Class I and Class II Local Suppliers only", "All suppliers including non-local", "Only MSE vendors"],
    a: 1,
    e: "For procurements up to Rs. 200 crore, only Class I and Class II Local Suppliers may bid if at least two local suppliers are expected to participate. Non-local suppliers are excluded."
  },
  {
    q: "In a procurement restricted to local suppliers (Make in India), if only one eligible local supplier responds, the contract should be:",
    o: ["Awarded to that single local supplier if price is reasonable", "Cancelled and re-tendered with non-local suppliers also eligible", "Extended by another 15 days before deciding", "Referred to DPIIT for approval"],
    a: 0,
    e: "If sufficient local competition exists (at least one valid bid), the contract can be awarded to the local supplier if the price is fair and reasonable, without reverting to global tendering."
  },
  {
    q: "GFR Rule 149 mandates that Common Use Goods and Services notified on GeM must be procured through:",
    o: ["DGS&D Rate Contract", "Open Tender only", "Government e-Marketplace (GeM)", "Limited Tender from empanelled vendors"],
    a: 2,
    e: "GFR Rule 149 mandates procurement of all notified common use goods and services exclusively through the Government e-Marketplace (GeM)."
  },
  {
    q: "On GeM, for procurements between Rs. 50,000 and Rs. 10,00,000, the purchase method is:",
    o: ["Direct Purchase (no comparison needed)", "L-1 comparison among at least 3 OEM sellers/service providers", "Competitive Bidding (Open Tender)", "Reverse Auction mandatory"],
    a: 1,
    e: "On GeM: Direct Purchase up to Rs. 50,000; L-1 comparison (min. 3 OEMs) for Rs. 50,000–Rs. 10 lakh; Bidding/RA above Rs. 10 lakh."
  },
  {
    q: "The GFR Rule inserted vide DoE OM dated 23.07.2020 that restricts procurement from land-border countries is:",
    o: ["GFR Rule 135", "GFR Rule 144(xi)", "GFR Rule 149", "GFR Rule 160"],
    a: 1,
    e: "GFR Rule 144(xi) restricts procurement from bidders from countries sharing a land border with India, unless they are registered with DPIIT. This was inserted to enhance national security in procurement."
  },
  {
    q: "In the Two-Bid System (also called Two-Envelope System), what is opened first?",
    o: ["Financial/Price bid", "Technical bid", "Both simultaneously", "EMD envelope"],
    a: 1,
    e: "In the Two-Bid System, Technical Bids are opened and evaluated first. Financial/Price Bids are opened only for technically qualified vendors."
  },
  {
    q: "When should pre-bid conference/pre-bid meeting be held for complex tenders?",
    o: ["After receiving all bids", "Before the bid submission deadline, to clarify doubts of potential bidders", "On the day of bid opening", "After shortlisting the L-1 vendor"],
    a: 1,
    e: "A pre-bid conference is held before the bid submission deadline to allow potential bidders to seek clarifications on the bid document. All clarifications must be published on the website."
  },
  {
    q: "Bid Security (EMD) is generally fixed at what percentage of the estimated value of the procurement?",
    o: ["0.5% to 1%", "2% to 5%", "5% to 10%", "10% to 15%"],
    a: 1,
    e: "Bid Security is typically 2% to 5% of the estimated value. It ensures bidders remain committed during bid validity and do not withdraw or modify bids."
  },
  {
    q: "Which categories of bidders are generally exempt from payment of Bid Security (EMD)?",
    o: ["State Government Departments only", "Foreign suppliers and PSUs", "MSEs registered with NSIC, KVIC, Central and State PSUs", "All vendors with turnover above Rs. 10 crore"],
    a: 2,
    e: "MSEs registered with NSIC/MSME bodies, KVIC, and Central/State PSUs are exempt from Bid Security requirement, encouraging participation by smaller enterprises."
  },
  {
    q: "Bid Security (EMD) of unsuccessful bidders must be returned:",
    o: ["After 12 months from bid opening", "After award of the contract", "After the completion of the project", "Promptly after finalization of the contract or expiry of bid validity"],
    a: 3,
    e: "EMD of unsuccessful bidders must be returned promptly — either after finalization of the contract or after the bid validity period expires — to avoid tying up vendor funds unnecessarily."
  },
  {
    q: "The Integrity Pact is a document signed between the procuring entity and:",
    o: ["The Ministry of Finance", "All bidders/contractors, committing to corruption-free conduct", "The Central Vigilance Commission", "The Comptroller and Auditor General"],
    a: 1,
    e: "An Integrity Pact is a binding agreement between the purchaser and all bidders, committing both parties to corruption-free, transparent conduct throughout the procurement process."
  },
  {
    q: "What is 'Reverse Auction' in the context of procurement?",
    o: ["A method where the buyer fixes the final price and sellers accept it", "A competitive online bidding where sellers submit progressively lower prices to win the contract", "Auction of scrap/surplus goods by the government", "A bidding process where the highest bidder wins"],
    a: 1,
    e: "Reverse Auction is an online procurement method where sellers submit progressively lower bids in real time, competing against each other — the lowest-price bidder wins the contract."
  },
  {
    q: "Post-Tender Negotiations (PTN) are:",
    o: ["Standard practice to obtain better prices from all bidders", "Permitted with all bidders to reduce their prices", "Banned as a rule; permitted only with L-1 in exceptional circumstances", "Permitted for tenders above Rs. 1 crore"],
    a: 2,
    e: "PTN is prohibited as a standard practice to maintain integrity of the tender process. It is permitted only with L-1 (lowest bidder) in exceptional cases, and must be approved by a competent authority."
  },
  {
    q: "The primary principle for determining the successful bidder in a procurement is:",
    o: ["Vendor with the highest quality score", "Vendor with the longest track record", "Lowest technically responsive (L-1) bidder", "Vendor preferred by the Administrative Ministry"],
    a: 2,
    e: "The L-1 (Lowest technically responsive) bidder — the bidder with the lowest price who fully meets all technical and qualification requirements — is awarded the contract."
  },
  {
    q: "If L-1 backs out after post-tender negotiation (i.e., after being selected), the appropriate action is:",
    o: ["Award to L-2 automatically at L-1's quoted price", "Forfeit L-1's EMD and re-tender", "Award to L-2 at L-2's originally quoted price", "Negotiate with L-2 for a price reduction"],
    a: 1,
    e: "If L-1 backs out, the EMD is forfeited and the matter is typically re-tendered. Awarding directly to L-2 is not the norm; re-tendering ensures fair competition."
  },
];

// Set 3: Contract Management, Delivery, Payment, Quality, Liquidated Damages

export const manual_procurement_set3: RawQuestion[] = [
  {
    q: "Performance Security (Performance Guarantee) is typically fixed at what percentage of the contract value?",
    o: ["1% to 2%", "2% to 3%", "3% to 5%", "10% to 15%"],
    a: 2,
    e: "Performance Security is typically 3% to 5% of the contract value. For contracts involving higher risk, it can be up to 10%. It ensures the contractor fulfills all obligations."
  },
  {
    q: "When must the Performance Security be furnished by the successful bidder?",
    o: ["Within 7 days of notification of award", "Within 15 days of notification of award, before signing the contract", "After receiving the first advance payment", "After delivery of 50% of the goods"],
    a: 1,
    e: "Performance Security must be submitted within 15 days (or as specified) of notification of award, and before the formal contract/supply order is signed."
  },
  {
    q: "The Performance Security is released to the contractor/supplier:",
    o: ["After 50% of delivery is completed", "After 12 months from contract signing", "After satisfactory completion of all contractual obligations including warranty", "On the date of invoice submission"],
    a: 2,
    e: "Performance Security is released only after complete fulfillment of all contractual obligations, including warranty/defect liability period. It protects the purchaser throughout the contract."
  },
  {
    q: "Liquidated Damages (LD) are levied when:",
    o: ["Quality of goods is below specifications", "Goods are delivered later than the contractually agreed delivery date", "The vendor raises a higher invoice than quoted", "The vendor fails to attend a pre-bid meeting"],
    a: 1,
    e: "Liquidated Damages are a pre-agreed compensation levied on the contractor for delay in delivery/completion beyond the contracted delivery period. They are not a penalty but a genuine pre-estimate of loss."
  },
  {
    q: "The standard rate of Liquidated Damages (LD) for delay in delivery of goods is typically:",
    o: ["0.5% per week subject to max 5%", "0.5% per week subject to max 10%", "1% per week subject to max 5%", "2% per month subject to max 10%"],
    a: 1,
    e: "Standard LD clause: 0.5% of the value of delayed goods per week of delay, subject to a maximum of 10% of the total contract value."
  },
  {
    q: "What is 'Force Majeure' in procurement contracts?",
    o: ["A clause allowing government to cancel the contract without compensation", "Extraordinary events beyond a party's control that prevent fulfillment of contractual obligations", "A provision for price escalation due to market conditions", "A clause allowing substitution of goods"],
    a: 1,
    e: "Force Majeure refers to extraordinary events beyond a party's control (natural disasters, wars, pandemics) that prevent contract performance. Neither party is liable for delays caused by such events."
  },
  {
    q: "In procurement contracts, 'Advance Payment' to a supplier is:",
    o: ["A standard feature of all Government contracts", "Generally discouraged; permissible only in specific cases with proper BG", "Permitted up to 50% for all manufacturers", "Not permitted under any circumstances in Government procurement"],
    a: 1,
    e: "Advance payment is generally discouraged. When unavoidable (e.g., for indigenous manufacturers), it requires a Bank Guarantee of equal value from the supplier, and proper justification and approval."
  },
  {
    q: "What is the maximum permissible advance payment to a private domestic supplier under Government procurement norms?",
    o: ["10% of contract value", "15% of contract value", "25% of contract value", "50% of contract value"],
    a: 2,
    e: "Advance payment to private manufacturers/suppliers should not exceed 15% of contract value. For plant and machinery, up to 30% may be permissible with Head of Department approval."
  },
  {
    q: "What is 'Pre-Dispatch Inspection' in procurement?",
    o: ["Inspection of goods at destination after delivery", "Inspection at the supplier's premises before goods are dispatched, to ensure quality and specs are met", "Customs inspection of imported goods", "Annual inspection of stores inventory"],
    a: 1,
    e: "Pre-Dispatch Inspection (PDI) is conducted at the supplier's factory/premises before dispatch to verify goods meet quality and specification requirements, avoiding rejection after delivery."
  },
  {
    q: "If goods are rejected upon delivery inspection (post-receipt inspection), the supplier must:",
    o: ["Refund the full advance payment immediately", "Replace the rejected goods within the time specified in the contract, at no extra cost", "Pay LD at the standard rate of 5%", "Refer the matter to arbitration"],
    a: 1,
    e: "Rejected goods must be replaced by the supplier at no extra cost within the stipulated time period. Failure to replace may result in risk purchase at the supplier's expense."
  },
  {
    q: "When a supplier fails to deliver or replace rejected goods, the purchaser may exercise the right of:",
    o: ["Arbitration only", "Risk Purchase — procuring from another source and recovering excess cost from the defaulting supplier", "Automatic blacklisting of the vendor", "Force Majeure clause"],
    a: 1,
    e: "Risk Purchase: the purchaser procures required goods from an alternative source and recovers the excess cost (beyond original contract price) from the defaulting supplier."
  },
  {
    q: "The Warranty Period (Defect Liability Period) for goods supplied under Government contracts is typically:",
    o: ["3 months from date of delivery", "6 months from date of delivery", "12 to 24 months from date of delivery/installation", "5 years from date of delivery"],
    a: 2,
    e: "Standard Warranty/Defect Liability Period is 12 to 24 months from the date of delivery or installation and commissioning. During this period, the supplier must rectify defects free of charge."
  },
  {
    q: "FOR (Free on Rail/Road) Destination price in a supply order means:",
    o: ["Supplier bears cost up to loading; buyer pays freight", "Supplier bears all costs including freight and transit insurance up to the destination", "Buyer bears all costs from ex-works", "Price excludes all taxes and duties"],
    a: 1,
    e: "FOR Destination means the supplier bears all charges (packing, freight, transit insurance) up to the specified destination. Buyer's cost begins at the delivery point."
  },
  {
    q: "What is a 'Running Contract' in procurement?",
    o: ["A contract awarded to the runner-up (L-2) bidder", "A long-term contract for supply of goods on an ongoing basis up to a specified quantity/value over a period", "A contract that auto-renews annually without re-tendering", "A contract for hiring vehicles on a daily basis"],
    a: 1,
    e: "A Running Contract (also called a Period Contract) allows the purchaser to place supply orders for varying quantities within an overall limit over the contract period — useful for items with fluctuating demand."
  },
  {
    q: "Who is responsible for maintaining the Vendor Registration/Empanelment list for Limited Tender procurement?",
    o: ["Ministry of Finance", "DGS&D centrally for all departments", "Each Ministry/Department for its own common items", "NITI Aayog"],
    a: 2,
    e: "Each Ministry/Department maintains its own approved vendor/supplier lists for commonly procured items. These lists must be periodically reviewed and updated to include new qualified vendors."
  },
  {
    q: "Can a public sector undertaking (PSU) sub-contract the entire awarded work on a back-to-back basis to a private firm?",
    o: ["Yes, if disclosed in the bid", "Yes, for contracts above Rs. 100 crore with Ministry approval", "No — PSU acting as a mere conduit/middleman is not acceptable", "Yes, if the sub-contractor is also registered on GeM"],
    a: 2,
    e: "A PSU sub-contracting the entire work back-to-back to a private firm, effectively acting as a conduit, is not acceptable. This circumvents the open tendering process and is an irregularity."
  },
];

// Set 4: MSE Provisions, Startup Policy, Integrity, Debarment, Stores Management

export const manual_procurement_set4: RawQuestion[] = [
  {
    q: "What percentage of annual procurement must Central Government Ministries/Departments/PSUs mandatorily procure from Micro and Small Enterprises (MSEs)?",
    o: ["10%", "20%", "25%", "30%"],
    a: 2,
    e: "25% of total annual procurement must be from Micro and Small Enterprises (MSEs) as per the Public Procurement Policy for MSEs, 2012."
  },
  {
    q: "Within the 25% MSE procurement target, what sub-target is reserved for MSEs owned by SC/ST entrepreneurs?",
    o: ["2%", "3%", "4%", "5%"],
    a: 1,
    e: "3% of the 25% MSE procurement target is reserved for MSEs owned by SC/ST entrepreneurs, promoting inclusion."
  },
  {
    q: "As per the MSE Procurement Policy, if an MSE's quoted price is within ____% of L-1 (non-MSE), the MSE gets price preference:",
    o: ["5%", "10%", "15%", "20%"],
    a: 2,
    e: "MSEs are entitled to price preference: if their price is within 15% of L-1 (non-MSE), they can be awarded the contract at L-1's price, subject to other conditions."
  },
  {
    q: "MSEs registered with which body are exempt from payment of Earnest Money Deposit (EMD) in Government tenders?",
    o: ["SEBI", "NSIC (National Small Industries Corporation)", "Reserve Bank of India", "Competition Commission of India"],
    a: 1,
    e: "MSEs registered with NSIC under its Single Point Registration Scheme are exempted from payment of Earnest Money Deposit (EMD) in Government tenders."
  },
  {
    q: "As per the Government's Startup Procurement Policy, Startups (recognized by DPIIT) may participate in Government procurement:",
    o: ["Only through the GeM portal", "Without requiring prior experience or prior turnover criteria in eligible product/service categories", "Only for contracts below Rs. 10 lakh", "Only as a sub-contractor to an established firm"],
    a: 1,
    e: "DPIIT-recognized Startups are exempted from Prior Experience and Prior Turnover criteria in Government procurement, to encourage innovative solutions from young enterprises."
  },
  {
    q: "Under the Procurement Policy for Startups, the contract value for direct procurement from Startups without competitive tender is limited to:",
    o: ["Rs. 10 lakh", "Rs. 25 lakh", "Rs. 50 lakh", "Rs. 1 crore"],
    a: 1,
    e: "Government departments can procure innovative products/services from DPIIT-recognized Startups without competitive tender up to Rs. 25 lakh per procurement."
  },
  {
    q: "Under the Integrity Pact, an Independent External Monitor (IEM) is appointed by:",
    o: ["CVC in consultation with the organization", "The procuring Ministry/Department itself", "Ministry of Finance", "CAG of India"],
    a: 0,
    e: "The Central Vigilance Commission (CVC) approves the appointment of Independent External Monitors (IEMs) for major tenders. IEMs monitor the integrity pact compliance."
  },
  {
    q: "What is the purpose of 'Debarment' or 'Banning' of a firm in procurement?",
    o: ["To reduce vendor competition", "To bar a firm from participating in government tenders for a specified period due to misconduct, fraud, or poor performance", "To renegotiate prices with a firm", "To restrict a firm to a specific category of procurement only"],
    a: 1,
    e: "Debarment/Banning is a disciplinary action that bars a firm from participating in Government procurement for a specified period, on grounds like fraud, corrupt practices, submission of fake documents, or persistent non-performance."
  },
  {
    q: "Which of the following is a valid ground for debarring/banning a firm from Government procurement?",
    o: ["Submitting a higher price than L-1", "Requesting extension of bid validity", "Submission of forged or false documents in a tender", "Seeking clarifications on the bid document"],
    a: 2,
    e: "Grounds for banning/debarment include: submission of forged documents, bribery/corrupt practices, willful non-performance, national security concerns. Submitting a higher price is NOT a ground."
  },
  {
    q: "Rotation of officers handling procurement (purchases, contracts, stores) in sensitive posts must occur every:",
    o: ["1 year", "2 to 3 years", "3 to 5 years", "5 years"],
    a: 1,
    e: "Officers in sensitive procurement posts (purchase, contract, stores, accounts, works) must be rotated every 2 to 3 years to minimize corruption risk, as per CVC guidelines incorporated in the manual."
  },
  {
    q: "Which of the following statements about Indian Agents of foreign firms is CORRECT?",
    o: ["A foreign firm can appoint multiple agents for the same tender", "Agency commission must be disclosed in the bid and paid in Indian Rupees", "Agency commission can be paid in foreign currency by mutual agreement", "No restrictions apply to Indian agents of foreign firms"],
    a: 1,
    e: "Each foreign firm can have only ONE Indian agent per tender. The agency commission must be disclosed in the bid and paid exclusively in Indian Rupees."
  },
  {
    q: "Bank Guarantee (BG) submitted as Performance Security or EMD must be verified:",
    o: ["At the time of encashment only", "Once during the contract period at a convenient time", "Invariably from the issuing bank, independently and confidentially, immediately on receipt", "Through the vendor's confirmation"],
    a: 2,
    e: "All Bank Guarantees must be verified from the issuing bank immediately — done independently and confidentially — to prevent acceptance of forged BGs, a recurring irregularity in procurement."
  },
  {
    q: "The minimum stock level in stores management is set to:",
    o: ["Avoid over-stocking and locking of capital", "Ensure adequate stock to meet demand during the lead time for replenishment", "Match last year's consumption exactly", "Provide for 12 months of consumption"],
    a: 1,
    e: "Minimum Stock Level (Safety Stock) is maintained to meet demand during the replenishment lead time, preventing stock-out situations. It acts as a buffer against supply delays."
  },
  {
    q: "The 'Re-Order Level' in inventory management is the stock level at which:",
    o: ["Goods are declared unserviceable", "A new purchase order must be initiated to replenish stock", "Stock must be transferred to another store", "Goods should be auctioned/disposed of"],
    a: 1,
    e: "Reorder Level = Minimum Stock Level + (Average consumption rate × Lead time). When stock falls to this level, a new purchase order must be placed to avoid running below minimum stock."
  },
  {
    q: "Annual Physical Verification of stores (inventory) is:",
    o: ["Optional, to be done only when discrepancies are suspected", "Mandatory; all stores must be physically verified at least once a year", "Required only for items above Rs. 1 lakh in value", "Done by external auditors only, not departmental staff"],
    a: 1,
    e: "Physical verification of all stores must be conducted at least once a year. Discrepancies between physical count and book balance must be investigated and regularized."
  },
  {
    q: "Surplus, obsolete, or unserviceable goods in Government stores should be:",
    o: ["Retained indefinitely as they may be needed later", "Disposed of promptly by auctioning or other approved means to free up space and recover value", "Transferred to another department without formality", "Written off without any physical disposal"],
    a: 1,
    e: "Surplus/unserviceable stores should be promptly disposed of through public auction or other approved methods (e.g., sale to rag merchants, destruction) to recover value and free storage space. Proper sanction is required for write-off."
  },
  {
    q: "The document 'Manual on Policies and Procedures for Purchase of Goods' released in June 2022 replaced earlier guidance primarily issued by:",
    o: ["DPIIT", "Central Vigilance Commission (CVC) in its 72 procurement circulars", "Ministry of Home Affairs", "National Productivity Council"],
    a: 1,
    e: "The DoE Manuals (June 2022) for Goods, Works, and Consultancy replaced the 72 CVC procurement circulars that were all withdrawn by CVC Circular dated 11 July 2022."
  },
];
