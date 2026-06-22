import { RawQuestion } from '../quizzes';

// =====================================================================================
// MANUAL FOR PROCUREMENT OF GOODS & SERVICES  (Goods, Works & Services)
// Source: "Manual of Procurement of Goods & Services" (Dak Guru study material,
//          based on Manual on Policies & Procedures for Purchase of Goods —
//          Department of Expenditure, Ministry of Finance, June 2022) — read in full (pp. 1–33).
// Coverage: scope & definitions, categorisation, Five R's, fundamental principles,
//           MSE & Make-in-India preferences, option clause, all modes of procurement,
//           bidding systems, e-procurement & reverse auction, GeM, bid & tender documents,
//           bid/performance security, advance payment, contract management, delivery,
//           force majeure, liquidated damages and disposal of scrap.
// Integrated for BOTH course modes: LDCE IP (topic p3-6) and PS Gr. B (topic psgb-32).
// All facts, rule numbers, monetary limits, time-limits and percentages drawn strictly
// from the source. Answer index "a" is 0-based.
// =====================================================================================

// -------------------------------------------------------------------------------------
// SET 1 — Scope, Definitions, Categorisation & the Five R's
// -------------------------------------------------------------------------------------
export const manual_procurement_set1: RawQuestion[] = [
  {
    q: "The Manual on Policies and Procedures for Purchase of Goods was released by which authority in June 2022?",
    o: ["Central Vigilance Commission", "Department of Expenditure, Ministry of Finance", "Ministry of Commerce and Industry", "Director General of Supplies & Disposals"],
    a: 1,
    e: "The Department of Expenditure (DoE), Ministry of Finance released the manuals (Goods, Works, and Consultancy & Other Services) in June 2022."
  },
  {
    q: "Ministries/Departments have been delegated full powers to make their own arrangements for procurement of goods and services that are NOT available on:",
    o: ["CPPP", "GeM (Government e-Marketplace)", "the DGS&D rate contract", "the NIC portal"],
    a: 1,
    e: "Full delegated powers apply to procurement of goods and services not available on GeM, exercised as per the Delegation of Financial Power Rules and the Procurement Guidelines."
  },
  {
    q: "Common-use goods and services available on GeM are required to be procured mandatorily through GeM under which rule of GFR, 2017?",
    o: ["Rule 143", "Rule 145", "Rule 149", "Rule 167"],
    a: 2,
    e: "Rule 149 of GFR 2017 makes procurement through GeM mandatory for common-use goods and services available on GeM."
  },
  {
    q: "Procurement of goods may include small work or services incidental/consequential to supply (transportation, insurance, installation, commissioning, training, maintenance) under which rule?",
    o: ["Rule 143 of GFR 2017", "Rule 144 of GFR 2017", "Rule 149 of GFR 2017", "Rule 154 of GFR 2017"],
    a: 0,
    e: "Rule 143 of GFR 2017 provides that procurement of goods may include incidental small works/services such as transportation, insurance, installation, commissioning, training and maintenance."
  },
  {
    q: "A Competent Authority competent to incur expenditure may sanction the purchase of goods for public service as per the Delegation of Financial Rules under which rule?",
    o: ["Rule 143", "Rule 145", "Rule 149", "Rule 158"],
    a: 1,
    e: "Rule 145 of GFR 2017 empowers a Competent Authority to sanction purchase of goods required for use in public service following the Procurement Guidelines."
  },
  {
    q: "The definition of 'goods' in the manual specifically EXCLUDES which of the following?",
    o: ["Software and patents", "Books, publications and periodicals for a library", "Livestock and medicines", "Machinery and spare parts"],
    a: 1,
    e: "'Goods' includes articles, material, livestock, machinery and even intangibles like software/patents, but expressly EXCLUDES books, publications, periodicals etc. for a library."
  },
  {
    q: "Which of the following is INCLUDED within the definition of 'goods' under the manual?",
    o: ["Books for a library", "Periodicals", "Intangible products like software, technology transfer, licenses and patents", "Consultancy assignments"],
    a: 2,
    e: "Intangible products such as software, technology transfer, licenses, patents and other intellectual properties are treated as 'goods'."
  },
  {
    q: "Procurements are categorised into which three categories?",
    o: ["Goods, Works and Services", "Direct, Indirect and Capital", "Domestic, Global and Mixed", "Petty, Limited and Open"],
    a: 0,
    e: "The three categories are: (a) Goods, (b) Services (Consultancy and Non-consultancy), and (c) Works."
  },
  {
    q: "Services are sub-divided into which two types?",
    o: ["Technical and Non-technical", "Consultancy and Non-consultancy", "Skilled and Unskilled", "Capital and Revenue"],
    a: 1,
    e: "Services comprise (i) Consultancy services and (ii) Non-consultancy services."
  },
  {
    q: "What is the main difference between 'Goods' and 'Works'?",
    o: ["Goods are cheaper than works", "Goods are manufactured on the supplier's own premises, whereas Works are executed on the premises of the procuring entity", "Works never involve any goods", "Goods always require global tendering"],
    a: 1,
    e: "Manufacture of goods is done on the supplier's premises (other than installation/commissioning), while Works are executed on the premises of the procuring entity (other than prefabricated components)."
  },
  {
    q: "The main difference between Consultancy and Non-consultancy services lies in the level of:",
    o: ["Physical labour", "Intellectual input", "Capital investment", "Time taken"],
    a: 1,
    e: "Intellectual input is predominant in Consultancy services and not central to non-consultancy services."
  },
  {
    q: "Non-consultancy services are best described as:",
    o: ["One-off, non-routine assignments with non-measurable outputs", "Repetitive routines with measurable and standardised outputs", "Assignments with predominant intellectual input", "Research and development work"],
    a: 1,
    e: "Non-consultancy services are repetitive routines with measurable, standardised outputs; consultancy services are one-off, non-routine with outputs neither precisely measurable nor standardised."
  },
  {
    q: "Procurement of IT projects should usually be carried out as procurement of:",
    o: ["Goods", "Works", "Consultancy services", "Non-consultancy services"],
    a: 2,
    e: "IT projects should usually be procured as consultancy services because the outcomes/deliverables vary from one service provider to another."
  },
  {
    q: "Which of the following is NOT one of the Five R's of Procurement?",
    o: ["Right Quality", "Right Source", "Right Person", "Right Time and Place"],
    a: 2,
    e: "The Five R's are: Right Quality, Right Quantity, Right Price, Right Time and Place, and Right Source. 'Right Person' is not among them."
  },
  {
    q: "Works executed on the premises of the procuring entity exclude which component?",
    o: ["Cement", "Prefabricated components", "Labour", "Steel"],
    a: 1,
    e: "Works are executed on the premises of the procuring entity OTHER THAN prefabricated components."
  },
  {
    q: "Composite IT system integration services include the design, development, deployment and commissioning of IT systems including all EXCEPT:",
    o: ["Hardware supply", "Software development", "Bandwidth and operation/maintenance after go-live", "Procurement of library periodicals"],
    a: 3,
    e: "Composite IT system integration covers hardware supply, software development, bandwidth and operation/maintenance after going live — not library periodicals."
  }
];

// -------------------------------------------------------------------------------------
// SET 2 — Fundamental Principles & Purchase Preference for MSE
// -------------------------------------------------------------------------------------
export const manual_procurement_set2: RawQuestion[] = [
  {
    q: "The Fundamental Principles of Public Procurement are laid down in which rule of GFR, 2017?",
    o: ["Rule 135", "Rule 144", "Rule 149", "Rule 160"],
    a: 1,
    e: "As stated in the manual, Rule 144 of GFR 2017 lays down the Fundamental Principles of Public Procurement."
  },
  {
    q: "Under the Transparency Principle, dissemination of information to likely bidders must be:",
    o: ["Selective and on request", "Simultaneous, symmetric and unrestricted", "Restricted to registered vendors", "Through newspapers only"],
    a: 1,
    e: "Transparency involves simultaneous, symmetric and unrestricted dissemination of information to all likely bidders."
  },
  {
    q: "All relevant procurement information should be published on which portal?",
    o: ["GeM only", "Central Public Procurement Portal (CPPP)", "Ministry intranet", "RBI website"],
    a: 1,
    e: "Procuring entities must ensure publication of all relevant information on the Central Public Procurement Portal (CPPP)."
  },
  {
    q: "The Professionalism Principle requires procuring authorities to avoid wasteful, dilatory and improper practices that violate the:",
    o: ["Code of Integrity for Public Procurement (CIPP)", "Companies Act", "Prevention of Corruption Act", "Indian Contract Act"],
    a: 0,
    e: "They must avoid practices violating the Code of Integrity for Public Procurement (CIPP)."
  },
  {
    q: "Procuring authorities are responsible and accountable to ensure transparency, fairness, equality, competition and:",
    o: ["Lowest price always", "Appeal rights", "Foreign participation", "Maximum profit"],
    a: 1,
    e: "The transparency principle covers transparency, fairness, equality, competition and appeal rights."
  },
  {
    q: "Under the Public Procurement Policy for MSEs, Order 2012 (amended), the minimum percentage of annual value of goods/services to be procured from MSEs is:",
    o: ["10 per cent", "20 per cent", "25 per cent", "50 per cent"],
    a: 2,
    e: "Central Government Ministries/Departments/PSUs shall procure a minimum of 25 per cent of their annual value of goods or services from MSEs."
  },
  {
    q: "If the L1 price is from someone other than an MSE, participating Micro & Small Enterprises quoting within which price band may be allowed to supply?",
    o: ["Within L1 + 10%", "Within L1 + 15%", "Within L1 + 20%", "Within L1 + 25%"],
    a: 1,
    e: "MSEs quoting within a price band of L1 + 15% are allowed to supply, by bringing down their price to the L1 price."
  },
  {
    q: "MSEs quoting within the price band may be allowed to supply up to what percentage of the total tendered value by matching the L1 price?",
    o: ["10 per cent", "15 per cent", "25 per cent", "50 per cent"],
    a: 2,
    e: "Such MSEs may supply up to 25 per cent of the total tendered value by bringing their price down to the L1 price."
  },
  {
    q: "If more than one eligible MSE within the price band agrees to match the L1 price, the 25% quantity is:",
    o: ["Awarded to the first MSE", "Distributed proportionately among them", "Cancelled", "Awarded by lottery"],
    a: 1,
    e: "Where more than one eligible MSE within the band matches L1, the 25% quantity is distributed proportionately to them."
  },
  {
    q: "Provisions for ensuring timely payments to MSE suppliers are contained in which chapter of the MSMED Act, 2006?",
    o: ["Chapter III", "Chapter V", "Chapter VI", "Chapter IX"],
    a: 1,
    e: "Chapter V of the MSMED Act, 2006 provides for timely payments to MSE suppliers."
  },
  {
    q: "The period agreed for payment to MSE suppliers must not exceed how many days from the deemed acceptance of materials?",
    o: ["15 days", "30 days", "45 days", "60 days"],
    a: 2,
    e: "Payment to MSE suppliers must not exceed forty-five (45) days from the deemed acceptance of the supplied materials."
  },
  {
    q: "In case of discrepancies in MSE supplies, the Procuring Entity must raise an objection within how many days of receipt, failing which it is deemed accepted?",
    o: ["7 days", "10 days", "15 days", "21 days"],
    a: 2,
    e: "Objection must be raised within 15 days from the date of receipt of materials; otherwise it is treated as deemed acceptance."
  },
  {
    q: "For delayed payment to an MSE supplier, the buyer is liable to pay compound interest at:",
    o: ["The bank rate", "Twice the bank rate", "Three times the bank rate notified by RBI", "The RBI repo rate"],
    a: 2,
    e: "For delays, the buyer pays compound interest on the delayed amount at three times the bank rate notified by the Reserve Bank."
  },
  {
    q: "The four fundamental aims of bidding systems are to balance Right Quality, Right Source and Right Price against the:",
    o: ["Complexity/criticality of technical requirements and value of procurement", "Number of bidders only", "Geographic location of bidders", "Currency of payment"],
    a: 0,
    e: "Bidding systems balance Right Quality, Right Source and Right Price under different complexities/criticality of technical requirements and value of procurements."
  }
];

// -------------------------------------------------------------------------------------
// SET 3 — Make in India (MII) Preference, BEE Ratings & Option Clause
// -------------------------------------------------------------------------------------
export const manual_procurement_set3: RawQuestion[] = [
  {
    q: "To be categorised as a 'Class-I local supplier', the minimum local content requirement is:",
    o: ["20 per cent", "30 per cent", "50 per cent", "60 per cent"],
    a: 2,
    e: "A 'Class-I local supplier' must have a minimum of 50 per cent local content."
  },
  {
    q: "For a 'Class-II local supplier', the minimum local content requirement is:",
    o: ["10 per cent", "20 per cent", "30 per cent", "50 per cent"],
    a: 1,
    e: "A 'Class-II local supplier' must have a minimum of 20 per cent local content."
  },
  {
    q: "A supplier is treated as 'Non-Local Class' if the local content is:",
    o: ["Less than 20 per cent", "Less than 50 per cent", "Less than 30 per cent", "Exactly 20 per cent"],
    a: 0,
    e: "'Non-Local Class' means local content of less than 20 per cent."
  },
  {
    q: "The margin of purchase preference available to a Class-I local supplier is:",
    o: ["L1 + 5%", "L1 + 10%", "L1 + 15%", "L1 + 20%"],
    a: 1,
    e: "The margin of purchase preference (L10%) for Class-I local suppliers is L1 + 10%."
  },
  {
    q: "Does a 'Class-II local supplier' get any purchase preference?",
    o: ["Yes, 50% preference", "Yes, purchase preference like Class-I", "No, it will not get any preference", "Yes, 25% preference"],
    a: 2,
    e: "A 'Class-II local supplier' will NOT get a preference for any procurement undertaken by procuring entities."
  },
  {
    q: "At the time of project execution, local content certification by a cost/chartered accountant in practice is required for all contracts above:",
    o: ["INR 1 crore", "INR 5 crore", "INR 10 crore", "INR 50 crore"],
    a: 2,
    e: "For all contracts above INR 10 crore, the supplier must provide local content certification duly certified by a cost/chartered accountant in practice."
  },
  {
    q: "If a supplier's category falls (e.g., Class-I to Class-II/Non-local) for not meeting the local content requirement, the penalty that may be imposed is up to:",
    o: ["5% of contract value", "10% of contract value", "15% of contract value", "25% of contract value"],
    a: 1,
    e: "A penalty up to 10% of the contract value may be imposed where the supplier's category changes due to shortfall in local content."
  },
  {
    q: "If the procuring entity negotiates with an L1 bidder who is not a Class-I local supplier, the margin of purchase preference (L10%) is calculated on the basis of:",
    o: ["The lower negotiated price", "The original L1 price", "The average of all bids", "The estimated value"],
    a: 1,
    e: "The L10% margin must be calculated on the original L1 price, not on the lower negotiated price."
  },
  {
    q: "Under the BEE energy-efficiency labelling, the threshold star rating prescribed for Split Air Conditioners (normal usage > 1000 hrs/year) is:",
    o: ["3 Star", "4 Star", "5 Star", "2 Star"],
    a: 2,
    e: "Split Air Conditioners require 5 Star under normal conditions (annual usage expected > 1000 hours)."
  },
  {
    q: "The threshold BEE star rating for Frost Free Refrigerators is:",
    o: ["3 Star", "4 Star", "5 Star", "2 Star"],
    a: 1,
    e: "Frost Free Refrigerators require a 4 Star rating."
  },
  {
    q: "The threshold BEE star rating prescribed for Ceiling Fans and Water Heaters is:",
    o: ["3 Star", "4 Star", "5 Star", "2 Star"],
    a: 2,
    e: "Both Ceiling Fans and Water Heaters require a 5 Star rating."
  },
  {
    q: "For an Air Conditioner with limited usage (e.g., in conference rooms), the threshold BEE rating is:",
    o: ["3 Star", "4 Star", "5 Star", "2 Star"],
    a: 0,
    e: "Where usage of an AC is limited (e.g., conference rooms), a 3 Star rating is the threshold."
  },
  {
    q: "A plus/minus option clause is normally incorporated for raw materials/consumables of recurrent requirement in all tenders of value above:",
    o: ["Rs. 25 lakh", "Rs. 50 lakh", "Rs. 1 crore", "Rs. 5 lakh"],
    a: 1,
    e: "For recurrent raw materials/consumables, all tenders above Rs. 50 lakh should incorporate a plus/minus option clause."
  },
  {
    q: "The standard plus/minus option clause normally allows the purchaser to increase/decrease the ordered quantity by up to:",
    o: ["10 per cent", "15 per cent", "25 per cent", "50 per cent"],
    a: 2,
    e: "The normal plus/minus option clause is 25 per cent of the ordered quantity, at the same terms and prices."
  }
];

// -------------------------------------------------------------------------------------
// SET 4 — Modes of Procurement: Open Tender Enquiry (OTE) & Global Tender Enquiry (GTE)
// -------------------------------------------------------------------------------------
export const manual_procurement_set4: RawQuestion[] = [
  {
    q: "Which is the default mode of procurement that gives the best value for money but has a relatively complex and prolonged procedure?",
    o: ["Limited Tender Enquiry (LTE)", "Open Tender Enquiry (OTE)", "Proprietary Article Certificate (PAC)", "Direct procurement"],
    a: 1,
    e: "Open Tender Enquiry (OTE) is the default mode and gives the best value for money, though its procedure is relatively complex and prolonged."
  },
  {
    q: "OTE mode should be adopted for procurements exceeding the threshold of:",
    o: ["Rs. 25 lakh", "Rs. 50 lakh", "Rs. 5 lakh", "Rs. 1 crore"],
    a: 1,
    e: "OTE should be used for procurements exceeding Rs. 50 lakh, among other situations (Rule 161 of GFR 2017)."
  },
  {
    q: "OTE and GTE procedures are governed by which rule of GFR, 2017?",
    o: ["Rule 161", "Rule 162", "Rule 163", "Rule 166"],
    a: 0,
    e: "Rule 161 of GFR 2017 governs Open Tender Enquiry and Global Tender Enquiry."
  },
  {
    q: "In OTE, the due date fixed for opening of the tender shall be a minimum of:",
    o: ["14 days from advertisement", "21 days from advertisement", "28 days from advertisement", "Four weeks from advertisement"],
    a: 1,
    e: "The due date for opening in OTE shall be minimum 21 (twenty-one) days from the date of advertisement."
  },
  {
    q: "Advertisements/tender enquiries for OTE and GTE must be published on:",
    o: ["Newspapers only", "CPPP (www.eprocure.gov.in) and GeM", "GeM only", "DGS&D portal"],
    a: 1,
    e: "Advertisements must be given on the Central Public Procurement Portal (CPPP) at www.eprocure.gov.in and on GeM."
  },
  {
    q: "To promote wider participation, the cost charged for tender documents downloaded by bidders should be:",
    o: ["Rs. 500", "No cost (free)", "1% of tender value", "Rs. 1,500"],
    a: 1,
    e: "No cost of tender document may be charged for tender documents downloaded by bidders, to promote wider participation and ease of bidding."
  },
  {
    q: "Global Tender Enquiry (GTE) is primarily aimed at inviting participation of:",
    o: ["Only registered Indian vendors", "Foreign firms, through provision for payment in foreign currencies via Letter of Credit", "MSEs only", "Local scrap dealers"],
    a: 1,
    e: "GTE, through appropriate advertising and provision for payment in foreign currencies via Letter of Credit, invites participation of foreign firms."
  },
  {
    q: "In GTE, the due date for opening of the tender shall be a minimum of:",
    o: ["21 days", "Four weeks", "Six weeks", "30 days"],
    a: 1,
    e: "The due date for opening in GTE shall be minimum four weeks from the date of advertisement."
  },
  {
    q: "No Global Tender Enquiry shall be invited up to a value of (or such limit as DoE may prescribe):",
    o: ["Rs. 50 crore", "Rs. 100 crore", "Rs. 200 crore", "Rs. 500 crore"],
    a: 2,
    e: "No GTE shall be invited up to Rs. 200 crore, or such limit as the Department of Expenditure may prescribe from time to time."
  },
  {
    q: "GTE tender documents must be drafted in which language?",
    o: ["Hindi", "English", "Both Hindi and the local language", "Any UPU language"],
    a: 1,
    e: "GTE tender documents must be in English, with technical specifications based on national requirements or an international trade standard."
  },
  {
    q: "In GTE tenders, the price may be asked in Indian Rupees or which other currencies?",
    o: ["Only US Dollars", "US Dollars, Euros, Pound Sterling, Yen or RBI's notified basket of currencies", "Only Euros and Pounds", "Any cryptocurrency"],
    a: 1,
    e: "GTE prices may be in INR or US Dollars, Euros, Pound Sterling, Yen or currencies under the RBI's notified basket."
  },
  {
    q: "In GTE procurements, e-procurement:",
    o: ["Is always mandatory", "May not be mandatorily insisted upon", "Is prohibited", "Requires Cabinet approval"],
    a: 1,
    e: "In GTE cases, e-procurement may not be mandatorily insisted upon."
  },
  {
    q: "GTE may be viable when goods of required specifications/quality are not available within the country and:",
    o: ["The procurement is below Rs. 5 lakh", "Alternatives available in the country are not suitable for the purpose", "Only one local vendor exists", "The buyer prefers imports"],
    a: 1,
    e: "GTE is viable where required goods are not available domestically and the alternatives available within the country are not suitable for the purpose."
  },
  {
    q: "The two types of Open Tenders are:",
    o: ["OTE and LTE", "OTE and GTE", "GTE and PAC", "LTE and SLTE"],
    a: 1,
    e: "Open Tenders comprise (a) Open Tender Enquiry (OTE) and (b) Global Tender Enquiry (GTE)."
  },
  {
    q: "Mandatory procurement of goods/services available on GeM falls under which rule of GFR 2017 (as a listed mode of procurement)?",
    o: ["Rule 154", "Rule 158", "Rule 162", "Rule 166"],
    a: 1,
    e: "Mandatory procurement of goods and services available on GeM is listed as a mode of procurement under Rule 158 of GFR 2017."
  }
];

// -------------------------------------------------------------------------------------
// SET 5 — LTE, SLTE, PAC, STE, Rate Contract & Direct Procurement
// -------------------------------------------------------------------------------------
export const manual_procurement_set5: RawQuestion[] = [
  {
    q: "Limited Tender Enquiry (LTE) should be the default mode of procurement when the estimated value is between (w.e.f. 10th July 2024):",
    o: ["Rs. 25,000 to Rs. 25 lakh", "Rs. 5 lakh to Rs. 50 lakh", "Rs. 1 lakh to Rs. 10 lakh", "Rs. 50,000 to Rs. 5 lakh"],
    a: 1,
    e: "LTE is the default mode when the estimated value is between Rs. 5 lakh and Rs. 50 lakh (limit changed w.e.f. 10th July 2024)."
  },
  {
    q: "LTE is governed by which rule of GFR, 2017?",
    o: ["Rule 161", "Rule 162", "Rule 163", "Rule 166"],
    a: 1,
    e: "Limited Tender Enquiry is governed by Rule 162 of GFR 2017."
  },
  {
    q: "The minimum number of bidders to whom an LTE should be sent is:",
    o: ["Two", "Three", "More than three", "Five"],
    a: 2,
    e: "LTE should be sent to more than three bidders; if fewer than three approved vendors are available, it may be sent to the available ones with the Competent Authority's approval, recording reasons."
  },
  {
    q: "In LTE, the time given for submission of quotes should not be less than (with six weeks for imports/complex cases):",
    o: ["One week", "Two weeks", "Three weeks", "Four weeks"],
    a: 2,
    e: "Adequate time for quotes should be not less than three weeks; a longer period (six weeks) may be given for imports or complex cases."
  },
  {
    q: "In LTE, since selected bidders are normally registered with the Procuring Entity, which securities are normally NOT taken?",
    o: ["Only Bid Security", "Bid Security and Performance Security", "Only Performance Security", "Liquidated Damages"],
    a: 1,
    e: "In LTE, Bid Security and Performance Security are normally not taken because the bidders are registered vendors."
  },
  {
    q: "Special Limited Tender Enquiry (SLTE) is used for procurements:",
    o: ["Below Rs. 5 lakh", "More than Rs. 50 lakh under special circumstances", "Up to Rs. 25,000", "On GeM only"],
    a: 1,
    e: "SLTE permits LTE even for values higher than Rs. 50 lakh (where OTE would normally apply) under special circumstances, based on a certificate of urgency (Rule 162 of GFR 2017)."
  },
  {
    q: "SLTE for procurements above Rs. 50 lakh requires:",
    o: ["A certificate of urgency signed by the indenter", "Cabinet approval", "A global tender", "A reverse auction"],
    a: 0,
    e: "Powers to sanction SLTE are based on a certificate of urgency signed by the indenter, laid down in the SoPP."
  },
  {
    q: "PAC stands for:",
    o: ["Public Accounts Committee", "Proprietary Article Certificate", "Procurement Award Certificate", "Pre-Approved Contract"],
    a: 1,
    e: "PAC stands for Proprietary Article Certificate, signed by the appropriate authority for items procured only from OEMs/proprietary-rights holders."
  },
  {
    q: "No item should be procured on PAC basis for more than how many years, after which a mandatory OTE is used to test the market?",
    o: ["One year", "Two years", "Three years", "Five years"],
    a: 2,
    e: "No item should be procured on PAC basis for more than three years, after which a mandatory OTE mode may be used."
  },
  {
    q: "Single Tender Enquiry (STE) without a PAC means a tender invitation to:",
    o: ["At least three firms", "One firm only without a PAC certificate", "All registered vendors", "Only foreign firms"],
    a: 1,
    e: "A tender invitation to one firm only without a PAC certificate is called a Single Tender Enquiry (STE)."
  },
  {
    q: "STE (e.g., for standardization/compatibility with existing machinery) is permissible under which rule of GFR 2017?",
    o: ["Rule 162", "Rule 164", "Rule 166", "Rule 167"],
    a: 2,
    e: "STE without PAC for standardization/compatibility of machinery is governed by Rule 166 of GFR 2017."
  },
  {
    q: "A Rate Contract (RC) is essentially:",
    o: ["A fixed-quantity supply order", "A price agreement with vendors at specified prices and terms during a period, with no quantity or minimum commitment guaranteed", "A global tender", "A maintenance contract"],
    a: 1,
    e: "RC is a price agreement; no quantity is mentioned nor is any minimum commitment guaranteed."
  },
  {
    q: "A Rate Contract used in works, services and consultancy is commonly known as a:",
    o: ["Framework Contract (FC)", "Turn-key Contract", "Annual Maintenance Contract", "Open Contract"],
    a: 0,
    e: "In works/services/consultancy, the RC concept is applied mutatis mutandis and is commonly called a Framework Contract (FC)."
  },
  {
    q: "Direct procurement of goods without quotation (petty purchase) should not exceed which threshold for each requirement?",
    o: ["Rs. 25,000", "Rs. 50,000", "Rs. 1,00,000", "Rs. 15,000"],
    a: 1,
    e: "Direct procurement without quotation should not exceed Rs. 50,000 for each case (Rule 154 of GFR 2017)."
  },
  {
    q: "Direct procurement without quotation is governed by which rule of GFR, 2017?",
    o: ["Rule 145", "Rule 154", "Rule 161", "Rule 167"],
    a: 1,
    e: "Direct procurement without quotation (petty purchase) is governed by Rule 154 of GFR 2017."
  },
  {
    q: "For petty purchases, an imprest amount may be sanctioned sufficient for how many months' estimated procurements, recouped monthly?",
    o: ["One month", "Two months", "Three months", "Six months"],
    a: 1,
    e: "Normally an imprest amount sufficient for two months' estimated procurements can be sanctioned, recouped monthly through expense vouchers."
  },
  {
    q: "To keep better control on direct procurement, the suggested annual ceiling per office is about:",
    o: ["Rs. 1 lakh", "Rs. 5 lakh per year", "Rs. 10 lakh", "Rs. 50,000"],
    a: 1,
    e: "An annual ceiling of about Rs. 5 lakh per office per year may be fixed for direct procurement."
  },
  {
    q: "In petty purchases, cash payment may be allowed only up to (otherwise cheque/ECS):",
    o: ["Rs. 1,000", "Rs. 5,000", "Rs. 10,000", "Rs. 25,000"],
    a: 1,
    e: "For transparency, payments should be by cheque/ECS, except that cash payment may be allowed up to Rs. 5,000."
  },
  {
    q: "Before any procurement outside GeM, it is mandatory for a buyer to generate which report on the GeM portal?",
    o: ["Annual Procurement Plan", "GeM Availability Report and Past Transaction Summary (GeMAR&PTS)", "Bid Security Report", "Last Purchase Price report"],
    a: 1,
    e: "It is mandatory to generate a 'GeM Availability Report and Past Transaction Summary' (GeMAR&PTS) with a unique ID for procurement outside GeM."
  }
];

// -------------------------------------------------------------------------------------
// SET 6 — Bidding Systems, e-Procurement & Electronic Reverse Auction
// -------------------------------------------------------------------------------------
export const manual_procurement_set6: RawQuestion[] = [
  {
    q: "The Single Stage Two Envelope (Two Bid) System is governed by which rule of GFR, 2017?",
    o: ["Rule 162", "Rule 163", "Rule 164", "Rule 166"],
    a: 1,
    e: "The Single Stage Two Envelope (Two Bid) System is governed by Rule 163 of GFR 2017."
  },
  {
    q: "In the two-envelope system, the first envelope (the techno-commercial bid) contains everything EXCEPT:",
    o: ["Eligibility details", "Technical quality and performance aspects", "Price and relevant financial details", "Commercial terms and conditions"],
    a: 2,
    e: "The techno-commercial bid contains eligibility, technical quality/performance, commercial terms and documents — but NOT the price and financial details."
  },
  {
    q: "In the two-envelope system, the second envelope is called the:",
    o: ["Techno-commercial bid", "Financial bid", "Eligibility bid", "Pre-qualification bid"],
    a: 1,
    e: "The second envelope, called the financial bid, contains the price quotation along with other financial details."
  },
  {
    q: "In a two-bid system, the financial bids of technically non-compliant bidders are:",
    o: ["Opened first", "Returned unopened to the bidders", "Evaluated separately", "Forwarded to CVC"],
    a: 1,
    e: "Financial bids of technically non-compliant bidders are returned unopened; in e-procurement they simply do not get opened."
  },
  {
    q: "Two Stage Bidding (Expression of Interest / Market Exploration) is governed by which rule of GFR, 2017?",
    o: ["Rule 163", "Rule 164", "Rule 166", "Rule 167"],
    a: 1,
    e: "Two Stage Bidding through Expression of Interest (EoI) is governed by Rule 164 of GFR 2017."
  },
  {
    q: "An Expression of Interest (EoI) / two-stage bid is appropriate when:",
    o: ["The item is a common-use, standardised good", "It is not feasible to formulate detailed specifications without inputs from bidders", "The value is below Rs. 50,000", "The supplier is a registered MSE"],
    a: 1,
    e: "EoI is used where the procuring entity cannot formulate detailed specifications without technical inputs from bidders, or for rapidly-evolving/R&D requirements."
  },
  {
    q: "A single stage bidding system is suitable where:",
    o: ["Technical requirements are simple/moderate, source capability is not crucial and value is not too high", "The requirement is highly complex and critical", "Source capability is the key determinant", "Only foreign firms can supply"],
    a: 0,
    e: "Single stage bidding suits cases where technical requirements are simple/moderate, source capability is not crucial and the value is not too high."
  },
  {
    q: "With respect to e-procurement, it is:",
    o: ["Optional for all Ministries", "Mandatory for Ministries/Departments to receive all bids through e-procurement portals", "Allowed only for GTE", "Restricted to GeM"],
    a: 1,
    e: "It is mandatory for Ministries/Departments to receive all bids through e-procurement portals for all procurements."
  },
  {
    q: "Ministries/Departments with low procurement volume may use the e-procurement solution developed by:",
    o: ["CPPP", "NIC", "GeM", "MSTC"],
    a: 1,
    e: "Such Ministries/Departments may use the e-procurement solution developed by NIC."
  },
  {
    q: "Exemption from e-procurement on grounds of national security/strategic confidentiality requires approval of:",
    o: ["The Cabinet Secretary", "The concerned Secretary, with concurrence of Financial Advisers", "CVC", "The Prime Minister's Office"],
    a: 1,
    e: "Such cases may be exempted after seeking approval of the concerned Secretary and with concurrence of Financial Advisers."
  },
  {
    q: "Electronic Reverse Auction (RA) is classified as a:",
    o: ["Static procurement method", "Dynamic procurement method", "Nomination basis tender", "Direct procurement"],
    a: 1,
    e: "Electronic Reverse Auction is a type of auction classified as a dynamic procurement method."
  },
  {
    q: "Which items are NOT good candidates for reverse auction?",
    o: ["Commodities and commercially-off-the-shelf items", "Items of strategic/critical/vital nature, items in short supply, items with only a few suppliers", "High-value items with many suppliers", "Standardised goods"],
    a: 1,
    e: "Strategic, critical and vital items, items in short supply and those with only a few suppliers are not good candidates for reverse auction."
  },
  {
    q: "In an electronic reverse auction, if a new lower bid is received within the last few minutes (say two minutes) of closing, the closing time may be:",
    o: ["Immediately closed", "Automatically extended by a few minutes (say five minutes)", "Cancelled", "Reset to the start"],
    a: 1,
    e: "If a new lower bid arrives in the last few minutes (say two minutes), the closing time may get automatically extended by a few minutes (say five minutes); maximum extensions may be stipulated (say five)."
  },
  {
    q: "While permitting use of Reverse Auction, which body has asked Departments to decide on RA and work out the detailed procedure themselves?",
    o: ["Department of Expenditure", "Central Vigilance Commission (CVC)", "NIC", "Reserve Bank of India"],
    a: 1,
    e: "The CVC has asked Departments/organisations to decide on reverse auction and work out the detailed procedure, ensuring transparency and fairness."
  }
];

// -------------------------------------------------------------------------------------
// SET 7 — One Stop Government e-Marketplace (GeM)
// -------------------------------------------------------------------------------------
export const manual_procurement_set7: RawQuestion[] = [
  {
    q: "The One Stop Government e-Marketplace (GeM) is governed by which rule of GFR, 2017?",
    o: ["Rule 149", "Rule 158", "Rule 167", "Rule 161"],
    a: 2,
    e: "GeM is governed by Rule 167 of GFR 2017."
  },
  {
    q: "GeM (the online Government e-Market Place for common use goods and services) has been developed by:",
    o: ["Ministry of Finance", "Ministry of Commerce", "NIC", "Department of Expenditure"],
    a: 1,
    e: "The Ministry of Commerce developed the online Government e-Market Place (GeM) for common use goods and services."
  },
  {
    q: "On GeM, direct online purchase up to which amount may be made through any available supplier meeting requisite quality, specification and delivery period?",
    o: ["Rs. 10,000", "Rs. 25,000", "Rs. 50,000", "Rs. 1,00,000"],
    a: 2,
    e: "Up to Rs. 50,000 may be procured through any available supplier on GeM meeting the requisite quality, specification and delivery period."
  },
  {
    q: "On GeM, for purchases above Rs. 50,000 and up to Rs. 10,00,000, the buyer must purchase from the GeM seller having the lowest price among at least:",
    o: ["Two manufacturers", "Three different manufacturers", "Five manufacturers", "One manufacturer"],
    a: 1,
    e: "Above Rs. 50,000 and up to Rs. 10,00,000, purchase is from the GeM seller having the lowest price among at least three different manufacturers."
  },
  {
    q: "On GeM, purchases above Rs. 10,00,000 must be made:",
    o: ["From any single supplier", "From the supplier with the lowest price after mandatorily obtaining bids using online bidding or reverse auction", "Only through LTE outside GeM", "Through PAC"],
    a: 1,
    e: "Above Rs. 10,00,000, purchase is from the supplier with the lowest price after mandatorily obtaining bids using the online bidding/reverse auction tool on GeM."
  },
  {
    q: "The GeM direct-purchase monetary limits were last amended with effect from:",
    o: ["1st January 2024", "10th July 2024", "1st April 2023", "18th June 2024"],
    a: 1,
    e: "The GeM direct purchase limits were amended w.e.f. 10th July 2024."
  },
  {
    q: "For direct purchase of Automobiles on GeM, the ceiling for direct purchase is:",
    o: ["Rs. 50,000", "Rs. 10,00,000", "No limit", "Rs. 1,00,000"],
    a: 2,
    e: "In the case of procurement of Automobiles, there is no ceiling on the direct purchase amount on GeM."
  },
  {
    q: "Ministries/Departments must project their Annual Procurement Plan of goods and services on the GeM portal within how many days of Budget approval?",
    o: ["15 days", "30 days", "45 days", "60 days"],
    a: 1,
    e: "The Annual Procurement Plan must be projected on the GeM portal within 30 days of Budget approval."
  },
  {
    q: "Ministries/Departments must work out their procurement requirements on which models at the time of preparation of Budget Estimates?",
    o: ["BOT or BOOT model", "OPEX or CAPEX model", "PPP or EPC model", "Lease or Hire model"],
    a: 1,
    e: "Requirements are worked out on either the 'OPEX' model or the 'CAPEX' model as per requirement/suitability."
  },
  {
    q: "Government buyers may ascertain the reasonableness of prices before placing an order on GeM using:",
    o: ["The Bid Security Report", "Business Analytics (BA) tools, including the Last Purchase Price on GeM", "The Annual Report", "The CIPP code"],
    a: 1,
    e: "Buyers may use Business Analytics (BA) tools on GeM, including the Last Purchase Price on GeM and the Department's own Last Purchase Price."
  },
  {
    q: "On GeM, a demand for goods shall NOT be:",
    o: ["Placed through reverse auction", "Divided into small quantities to make piecemeal purchases (to avoid L-1 buying/bidding or sanction of higher authority)", "Compared with the Last Purchase Price", "Routed through bidding tools"],
    a: 1,
    e: "A demand shall not be divided into small quantities to make piecemeal purchases to avoid L-1 buying/bidding/reverse auction or the sanction of higher authorities."
  },
  {
    q: "The procurement process on GeM is described as:",
    o: ["Partly manual and partly online", "End to end (from placement of supply order to payment) — fully electronic and online", "Only for order placement", "Limited to price discovery"],
    a: 1,
    e: "The GeM process is end to end — from placement of supply order to payment to suppliers — and is fully electronic and online."
  },
  {
    q: "The monetary ceilings for GeM direct purchase are applicable:",
    o: ["For all purchases everywhere", "Only for purchases made through GeM; for purchases outside GeM, relevant GFR Rules apply", "Only for purchases above Rs. 10 lakh", "Only for automobiles"],
    a: 1,
    e: "The ceilings apply only to purchases through GeM; for any purchases outside GeM, the relevant GFR Rules apply."
  },
  {
    q: "Mandatory procurement of goods or services available on GeM is provided under which rule of GFR, 2017?",
    o: ["Rule 143", "Rule 149", "Rule 162", "Rule 171"],
    a: 1,
    e: "Procurement of goods/services by Ministries/Departments is mandatory for goods/services available on GeM as per Rule 149 of GFR 2017."
  }
];

// -------------------------------------------------------------------------------------
// SET 8 — Bid Documents, Tender Documents, Validity, GTE Special Conditions & Costs
// -------------------------------------------------------------------------------------
export const manual_procurement_set8: RawQuestion[] = [
  {
    q: "The essential aspects to be contained in a bid document (including provisions for questioning bidding conditions and dispute settlement) are referenced to which rule?",
    o: ["Rule 168", "Rule 171", "Rule 173", "Rule 167"],
    a: 2,
    e: "Rule 173 of GFR 2017 covers essential contents of the bid document, including provisions for questioning bidding conditions [173(iv)], settlement of disputes [173(v)] and interpretation under Indian laws [173(vi)]."
  },
  {
    q: "The contents/main sections of the Standard Bidding Document (SBD) are referenced to which rule of GFR, 2017?",
    o: ["Rule 168", "Rule 171", "Rule 173", "Rule 161"],
    a: 0,
    e: "Rule 168 of GFR 2017 governs the contents of tender documents (the main sections of the SBD)."
  },
  {
    q: "As per Standard Bidding Documents, if a firm quotes NIL charges/consideration, the bid shall be treated as:",
    o: ["The lowest valid bid (L1)", "Unresponsive and will not be considered", "Eligible for negotiation", "A conditional bid"],
    a: 1,
    e: "SBDs include a clause that if a firm quotes NIL charges/consideration, the bid shall be treated as unresponsive and will not be considered."
  },
  {
    q: "The resultant procurement contract will be interpreted under:",
    o: ["UNCITRAL Model Law", "Indian laws", "The law of the supplier's country", "International commercial law"],
    a: 1,
    e: "Essential terms of the contract include a clause that the resultant contract will be interpreted under Indian laws [Rule 173(vi)]."
  },
  {
    q: "In the SBD, 'AITB' stands for:",
    o: ["Annexure to Invitation of Tender Bids", "Appendix to Instructions to Bidders", "Additional Information to Bidders", "Approved Item Tender Bid"],
    a: 1,
    e: "AITB is the Appendix to Instructions to Bidders — used to keep procurement-specific information separate instead of modifying the ITB."
  },
  {
    q: "General Conditions of Contract (GCC) should not be altered; any changes should be made only through:",
    o: ["The Notice Inviting Tender (NIT)", "Special Conditions of Contract (SCC)", "Instructions to Bidders (ITB)", "The price schedule"],
    a: 1,
    e: "GCCs should not be altered; changes, if any, should be made only through the Special Conditions of Contract (SCC)."
  },
  {
    q: "If not otherwise specified in the tender document, a bid shall remain valid for a period of:",
    o: ["30 days", "45 days", "60 days", "90 days"],
    a: 3,
    e: "A bid shall remain valid for the period mentioned in the tender document, or 90 days if not so specified."
  },
  {
    q: "In GTE procurements, the Agency Commission payable to an Indian Agent normally should not exceed:",
    o: ["2 per cent", "5 per cent", "10 per cent", "15 per cent"],
    a: 1,
    e: "Agency Commission to the Indian Agent normally does not exceed five per cent, and not more than specified in the Agency agreement."
  },
  {
    q: "In GTE tenders, Indian bidders are required to quote in:",
    o: ["US Dollars", "INR only", "Any RBI-notified currency", "Euros"],
    a: 1,
    e: "Indian bidders are to quote in INR only; foreign bidders may quote in RBI's notified basket of foreign currencies."
  },
  {
    q: "As per the tender document cost schedule, the cost of the tender document for an estimated value below Rs. 25 lakh is:",
    o: ["Rs. 500", "Rs. 1,500", "Rs. 2,500", "Rs. 5,000"],
    a: 0,
    e: "Below Rs. 25 lakh, the tender document cost is Rs. 500."
  },
  {
    q: "For an estimated tender value of Rs. 25 lakh to Rs. 2 crore, the tender document cost is:",
    o: ["Rs. 500", "Rs. 1,500", "Rs. 2,500", "Rs. 5,000"],
    a: 1,
    e: "Rs. 25 lakh to Rs. 2 crore → tender document cost Rs. 1,500."
  },
  {
    q: "For an estimated tender value of Rs. 2 crore to Rs. 25 crore, the tender document cost is:",
    o: ["Rs. 1,500", "Rs. 2,500", "Rs. 5,000", "Case-to-case"],
    a: 1,
    e: "Rs. 2 crore to Rs. 25 crore → tender document cost Rs. 2,500."
  },
  {
    q: "For an estimated tender value of Rs. 25 crore to Rs. 50 crore, the tender document cost is:",
    o: ["Rs. 2,500", "Rs. 5,000", "Rs. 10,000", "Case-to-case"],
    a: 1,
    e: "Rs. 25 crore to Rs. 50 crore → tender document cost Rs. 5,000."
  },
  {
    q: "For an estimated tender value above Rs. 50 crore, the cost of the tender document is:",
    o: ["Rs. 5,000", "Rs. 10,000", "To be decided on a case-to-case basis", "Free"],
    a: 2,
    e: "Above Rs. 50 crore, the tender document cost is to be decided on a case-to-case basis."
  },
  {
    q: "Which is stated to be the default method of tendering to ensure efficiency of procurement?",
    o: ["Limited tender", "Open online tendering", "Single tender", "Direct procurement"],
    a: 1,
    e: "Open online tendering should be the default method to ensure efficiency of procurement; experience criteria should be kept broad-based."
  }
];

// -------------------------------------------------------------------------------------
// SET 9 — Bid Security (EMD), Performance Security & Advance Payment
// -------------------------------------------------------------------------------------
export const manual_procurement_set9: RawQuestion[] = [
  {
    q: "Bid Security (Earnest Money Deposit) normally ranges between what percentage of the estimated value of goods to be procured?",
    o: ["1–2 per cent", "2–5 per cent", "3–10 per cent", "5–10 per cent"],
    a: 1,
    e: "Bid Security (EMD) normally ranges between 2–5 per cent of the estimated value of the goods to be procured."
  },
  {
    q: "EMD (Bid Security) is NOT required if the tender value is up to:",
    o: ["Rs. 1,00,000", "Rs. 2,00,000", "Rs. 5,00,000", "Rs. 10,00,000"],
    a: 2,
    e: "EMD is not required if the tender value is up to Rs. 5,00,000 (five lakh)."
  },
  {
    q: "The bid security is normally to remain valid for a period of how many days beyond the final bid validity period?",
    o: ["30 days", "45 days", "60 days", "90 days"],
    a: 1,
    e: "Bid security normally remains valid for 45 days beyond the final bid validity period."
  },
  {
    q: "Bid securities of unsuccessful bidders should be returned at the earliest after expiry of the final bid validity period, and latest by:",
    o: ["The 15th day after award", "The 21st day after award", "The 30th day after award of the contract", "The 45th day after award"],
    a: 2,
    e: "They should be returned latest by the 30th day after the award of the contract."
  },
  {
    q: "In two-packet/two-stage tendering, bid securities of unsuccessful bidders at the first (technical) stage should be returned within:",
    o: ["15 days", "30 days of declaration of the first stage result", "45 days", "60 days"],
    a: 1,
    e: "In two-packet/two-stage tendering, bid securities of unsuccessful first-stage bidders should be returned within 30 days of declaration of the first-stage result."
  },
  {
    q: "Performance Security is governed by which rule of GFR, 2017?",
    o: ["Rule 168", "Rule 171", "Rule 173", "Rule 167"],
    a: 1,
    e: "Performance Security is governed by Rule 171 of GFR 2017."
  },
  {
    q: "From 01.01.2024, the performance security for Goods/Services is:",
    o: ["2–5 per cent of contract value", "3–5 per cent of contract value", "3–10 per cent of contract value", "5–10 per cent of contract value"],
    a: 1,
    e: "From 01.01.2024, performance security for Goods/Services is 3%–5% of the value of the contract."
  },
  {
    q: "From 01.01.2024, the performance security for Works is:",
    o: ["3–5 per cent", "3–10 per cent", "5–10 per cent", "2–5 per cent"],
    a: 1,
    e: "Performance security for Works is 3%–10% of the contract value."
  },
  {
    q: "In a scrap tender, the Security Deposit is:",
    o: ["10 per cent of bid value", "15 per cent of bid value", "25 per cent of bid value", "50 per cent of bid value"],
    a: 2,
    e: "In a scrap tender, the Security Deposit is 25% of the bid value."
  },
  {
    q: "Submission of Performance Security is NOT necessary for a contract value up to:",
    o: ["Rs. 25 lakh", "Rs. 50 lakh", "Rs. 5 lakh", "Rs. 1 crore"],
    a: 1,
    e: "Performance Security is not necessary for a contract value up to Rs. 50 lakh."
  },
  {
    q: "Performance Security is generally to be furnished within how many days after notification of the award?",
    o: ["7–14 days", "14–28 days", "30 days", "45 days"],
    a: 1,
    e: "Performance Security is generally furnished within 14–28 days after notification of the award."
  },
  {
    q: "Performance Security should remain valid for a period of how many days beyond the date of completion of all contractual obligations (including warranty)?",
    o: ["30 days", "45 days", "60 days", "90 days"],
    a: 2,
    e: "Performance Security should remain valid for 60 days beyond the date of completion of all contractual obligations, including warranty obligations."
  },
  {
    q: "Advance payment to private firms should not exceed:",
    o: ["20 per cent of contract value", "30 per cent of contract value", "40 per cent of contract value", "50 per cent of contract value"],
    a: 1,
    e: "Advance payment to private firms should not exceed thirty per cent of the contract value."
  },
  {
    q: "Advance payment to a State/Central Government agency or PSU should not exceed:",
    o: ["30 per cent", "40 per cent", "50 per cent", "60 per cent"],
    a: 1,
    e: "Advance payment to a State/Central Government agency or PSU should not exceed forty per cent of the contract value."
  },
  {
    q: "For a maintenance contract, the advance payment should not exceed the amount payable for:",
    o: ["Three months under the contract", "Six months under the contract", "One year under the contract", "Two months under the contract"],
    a: 1,
    e: "For a maintenance contract, the advance should not exceed the amount payable for six months under the contract."
  },
  {
    q: "Which entities may be exempted by the Procuring Entity from submission of Performance Security?",
    o: ["All private firms", "Govt. Ministries/Departments, attached/subordinate offices, autonomous bodies, and OEMs in whose favour a PAC is issued", "Only MSEs", "Only foreign bidders"],
    a: 1,
    e: "Exemption may be given to Govt. Ministries/Departments, attached & subordinate offices, autonomous bodies, and OEMs in whose favour PAC is issued."
  }
];

// -------------------------------------------------------------------------------------
// SET 10 — Contract Management, Delivery, Force Majeure, LD & Disposal of Scrap
// -------------------------------------------------------------------------------------
export const manual_procurement_set10: RawQuestion[] = [
  {
    q: "The primary purpose of contract management is to ensure that the contract:",
    o: ["Generates maximum profit for the supplier", "Delivers the desired outcomes as per its terms and conditions, with payments matching performance", "Avoids any inspection", "Is awarded to an MSE"],
    a: 1,
    e: "Contract management ensures the contract delivers desired outcomes per terms and conditions, and that payments match performance — 'we pay only for what we get'."
  },
  {
    q: "Once a contract has been concluded, its terms and conditions:",
    o: ["May be freely varied by the supplier", "Should not be varied; any inescapable modification needs prior approval of the CA with Finance concurrence", "Can be changed by the indenter alone", "Lapse after 90 days"],
    a: 1,
    e: "Terms should not be varied; where inescapable, modification is done with prior approval of the CA and concurrence of Associated/Integrated Finance, and must not vitiate the original tender decision."
  },
  {
    q: "The Option Clause percentage (additional quantity at the same rate/terms) ideally should not exceed:",
    o: ["10–15 per cent", "20–25 per cent", "25–30 per cent", "30–40 per cent"],
    a: 2,
    e: "The option clause percentage should be part of the bid document/contract and ideally should not exceed 25–30%."
  },
  {
    q: "Before making the final payment or releasing the performance bank guarantee, which certificate may be insisted upon from the supplier?",
    o: ["Proprietary Article Certificate", "No Claim Certificate", "Local Content Certificate", "Certificate of Urgency"],
    a: 1,
    e: "A 'No Claim Certificate' may be insisted upon from the supplier before the final payment/release of the PBG to prevent future claims."
  },
  {
    q: "Interest for delayed payment to contractors becomes payable if bills are delayed by more than:",
    o: ["15 working days", "21 working days", "30 working days after submission of the bill", "45 days"],
    a: 2,
    e: "A provision may be made for payment of interest where bills are delayed by more than 30 working days after submission by the contractor."
  },
  {
    q: "Where interest is payable for delayed payment to a contractor, the rate of interest should be the rate of:",
    o: ["The bank rate", "General Provident Fund (GPF)", "RBI repo rate", "12% per annum"],
    a: 1,
    e: "The rate of interest for delayed payment should be the rate of interest of the General Provident Fund (GPF)."
  },
  {
    q: "For items delivered throughout the year, variation considered as a 'delay' attracting Liquidated Damages is beyond which limit in any calendar month?",
    o: ["+/- 5 per cent", "+/- 7 per cent", "+/- 10 per cent", "+/- 15 per cent"],
    a: 2,
    e: "Variation beyond +/- 10% in any calendar month (or +/- 7% cumulative in a quarter, or +/- 5% cumulative in a year) is treated as delay attracting LD."
  },
  {
    q: "Under a Force Majeure clause, if performance is prevented/delayed by FM for a period exceeding how many days, either party may terminate the contract without financial repercussion?",
    o: ["30 days", "60 days", "90 days", "180 days"],
    a: 2,
    e: "If FM prevents/delays performance for a period exceeding 90 days, either party may terminate the contract without financial repercussion on either side."
  },
  {
    q: "Which of the following is NOT covered by a Force Majeure event?",
    o: ["A natural calamity (act of God)", "War, strike or riots", "Negligence/wrong-doing or predictable seasonal rain", "Crimes beyond human control"],
    a: 2,
    e: "Force Majeure excludes negligence/wrong-doing, predictable/seasonal rain and any events specifically excluded in the clause."
  },
  {
    q: "The quantum of Liquidated Damages (LD) for late delivery is:",
    o: ["0.25% per week, max 5%", "0.5% (half per cent) of the price of stores delivered late, for each week or part, subject to a maximum of 5%", "1% per week, max 10%", "2% per week, max 15%"],
    a: 1,
    e: "LD is 0.5% of the price of the late-delivered stores per week or part thereof, subject to a maximum deduction of 5% of the total contract value."
  },
  {
    q: "In case of inordinate delay, the maximum LD deduction shall be:",
    o: ["5 per cent of total contract value", "10 per cent of total contract value", "15 per cent of total contract value", "25 per cent of total contract value"],
    a: 1,
    e: "In case of inordinate delay, the maximum LD deduction shall be 10% of the total contract value."
  },
  {
    q: "Inordinate delays are defined as inexcusable delays of more than what proportion of the total completion period?",
    o: ["10 per cent", "20 per cent", "One-fourth (25 per cent)", "One-third"],
    a: 2,
    e: "Inordinate delays are inexcusable delays of more than one-fourth (25%) of the total completion period."
  },
  {
    q: "The Competent Authority may relax the need for survey by a Survey Committee for known small-value scrap items (newspapers, containers, etc.) up to a value of:",
    o: ["Rs. 5,000", "Rs. 10,000", "Rs. 15,000", "Rs. 25,000"],
    a: 2,
    e: "The CA may relax the survey requirement, as a standing order, for known scrap items of small value up to Rs. 15,000."
  },
  {
    q: "Scrap up to Rs. 4 lakh may be sold by which mode to locally known scrap dealers?",
    o: ["Open Tender", "Limited Tender basis", "Direct petty purchase", "Reverse auction only"],
    a: 1,
    e: "Scrap up to Rs. 4 lakh may be sold on a Limited Tender basis to locally known scrap dealers; above Rs. 4 lakh, e-auction (preferred)/tender/public auction is used."
  },
  {
    q: "Useable machinery/spares that may still be useful to other Ministries/Departments/PSUs are to be disposed at book value plus:",
    o: ["10% + 5% freight + 10% handling", "20% + 7.5% freight + 12.5% handling", "25% + 10% freight + 15% handling", "15% + 7.5% freight + 7.5% handling"],
    a: 1,
    e: "Such useable machinery/spares are disposed at book value plus 20%, with 7.5% freight and 12.5% handling charges, directly to the concerned organisation."
  },
  {
    q: "The Competent Authority may declare and dispose of scrap material based on the 'Book Value' or:",
    o: ["5% of the original/market value of new goods", "10% of the original value", "20% of the market value", "25% of the original value"],
    a: 0,
    e: "The CA may declare and dispose of scrap based on the 'Book Value' or 5% of the original/market value of new goods, as laid down in the SoPP."
  }
];
