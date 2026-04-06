import { RawQuestion } from '../quizzes';

// The Central Goods and Services Tax Act, 2017 (Act No. 12 of 2017)
// Set 1 (ID 196): Preliminary, Definitions & Levy — Sections 1–11, Chapters I–III
// Set 2 (ID 197): Time of Supply, Value of Supply & Input Tax Credit — Sections 12–19, Chapters IV–V
// Set 3 (ID 198): Registration, Tax Invoice, Credit & Debit Notes — Sections 22–34, Chapters VI–VII
// Answer distribution per set: A=4, B=3/4, C=4, D=3/4

// ─────────────────────────────────────────────────────────────────────────────
// SET 1 — Preliminary, Key Definitions & Levy (Sections 1–11)
// ─────────────────────────────────────────────────────────────────────────────
export const gst_act_set1: RawQuestion[] = [
  // q0 → D
  {
    q: "The Central Goods and Services Tax Act, 2017 is Act No.:",
    o: [
      "Act No. 10 of 2017",
      "Act No. 11 of 2017",
      "Act No. 14 of 2017",
      "Act No. 12 of 2017",
    ],
    a: 3,
    e: "The CGST Act is Act No. 12 of 2017. It was enacted to provide for the levy and collection of tax on intra-State supply of goods or services or both.",
  },
  // q1 → A
  {
    q: "The CGST Act, 2017 makes provision for levy and collection of tax on:",
    o: [
      "Intra-State supply of goods or services or both by the Central Government",
      "Inter-State supply of goods or services or both",
      "Both intra-State and inter-State supply of goods or services",
      "Import and export of goods or services or both",
    ],
    a: 0,
    e: "The CGST Act provides for levy and collection of tax on intra-State supply of goods or services or both by the Central Government. Inter-State supplies are covered by the IGST Act, 2017.",
  },
  // q2 → C
  {
    q: "Under Section 2(16) of the CGST Act, 'Board' means:",
    o: [
      "The GST Council established under Article 279A of the Constitution",
      "The Central Board of Direct Taxes constituted under the Central Boards of Revenue Act, 1963",
      "The Central Board of Indirect Taxes and Customs constituted under the Central Boards of Revenue Act, 1963",
      "The National Anti-Profiteering Authority constituted under the CGST Act",
    ],
    a: 2,
    e: "Section 2(16) defines 'Board' as the Central Board of Indirect Taxes and Customs constituted under the Central Boards of Revenue Act, 1963 (54 of 1963).",
  },
  // q3 → B
  {
    q: "The illustration given in Section 2(30) of the CGST Act for a 'composite supply' states that where goods are packed and transported with insurance, the supply of goods, packing materials, transport and insurance together is a composite supply, and the supply which is treated as the 'principal supply' is:",
    o: [
      "Supply of insurance",
      "Supply of goods",
      "Supply of transport",
      "Supply of packing materials",
    ],
    a: 1,
    e: "As per the Illustration in Section 2(30): where goods are packed and transported with insurance, the supply of goods, packing materials, transport and insurance is a composite supply, and supply of goods is a principal supply.",
  },
  // q4 → D
  {
    q: "Under Section 2(74) read with Section 8(b) of the CGST Act, the tax on a 'mixed supply' shall be determined as:",
    o: [
      "The average rate of tax applicable on all the supplies in the mix",
      "The rate applicable on the supply which has the lowest rate of tax",
      "The rate applicable on the supply which forms the largest component by value",
      "The rate applicable on the particular supply which attracts the highest rate of tax",
    ],
    a: 3,
    e: "Section 8(b) states: a mixed supply comprising two or more supplies shall be treated as a supply of that particular supply which attracts the highest rate of tax. This distinguishes it from a composite supply (taxed at the rate of the principal supply).",
  },
  // q5 → A
  {
    q: "Under Section 2(62) of the CGST Act, which of the following is specifically EXCLUDED from the definition of 'input tax'?",
    o: [
      "Tax paid under the composition levy (Section 10)",
      "Integrated goods and services tax charged on import of goods",
      "Tax payable under Section 9(3) on reverse charge basis",
      "State tax charged on any supply of goods or services made to a registered person",
    ],
    a: 0,
    e: "Section 2(62) defines 'input tax' and specifically provides that it does not include the tax paid under the composition levy (Section 10). IGST on imports, reverse charge tax, and State tax are all included in the definition of input tax.",
  },
  // q6 → C
  {
    q: "Under Section 2(92) of the CGST Act, a 'quarter' means:",
    o: [
      "Any period of three months as chosen by the taxpayer",
      "The first three months of a financial year (April to June)",
      "A period comprising three consecutive calendar months, ending on the last day of March, June, September and December",
      "Any consecutive period of 90 days as notified by the Government",
    ],
    a: 2,
    e: "Section 2(92) defines 'quarter' as a period comprising three consecutive calendar months, ending on the last day of March, June, September and December of a calendar year.",
  },
  // q7 → B
  {
    q: "Under Section 2(52) of the CGST Act, the term 'goods' includes which of the following?",
    o: [
      "Money and securities",
      "Actionable claims, growing crops and grass",
      "Immovable property attached to the ground",
      "All movable property including money and securities",
    ],
    a: 1,
    e: "Section 2(52) defines 'goods' as every kind of movable property other than money and securities but includes actionable claims, growing crops, grass and things attached to or forming part of the land which are agreed to be severed before supply or under a contract of supply.",
  },
  // q8 → A
  {
    q: "Under Section 2(33) of the CGST Act, 'continuous supply of services' means a supply which is provided under a contract for a period exceeding:",
    o: [
      "Three months, with periodic payment obligations",
      "Six months, with periodic payment obligations",
      "One year, with periodic payment obligations",
      "Thirty days, with periodic payment obligations",
    ],
    a: 0,
    e: "Section 2(33) defines 'continuous supply of services' as supply provided continuously or on recurrent basis, under a contract, for a period exceeding three months with periodic payment obligations.",
  },
  // q9 → D
  {
    q: "Under Section 10(1) of the CGST Act, the composition levy threshold for a supplier (other than in special category States) is aggregate turnover in the preceding financial year not exceeding:",
    o: [
      "Twenty-five lakh rupees",
      "Fifty lakh rupees",
      "One crore rupees",
      "One crore fifty lakh rupees",
    ],
    a: 3,
    e: "Section 10(1) provides that a registered person whose aggregate turnover in the preceding FY did not exceed one crore fifty lakh rupees may opt for the composition levy. The threshold for special category States is seventy-five lakh rupees.",
  },
  // q10 → B
  {
    q: "Under Section 10(2) of the CGST Act, the composition levy is NOT available to which of the following?",
    o: [
      "A supplier of services with turnover below ₹50 lakh",
      "A casual taxable person or a non-resident taxable person",
      "A manufacturer other than of notified goods",
      "A restaurant service provider (excluding alcohol for human consumption)",
    ],
    a: 1,
    e: "Section 10(2)(d) specifically excludes a non-resident taxable person or a casual taxable person from the composition levy. Other exclusions include: inter-State outward supplies, e-commerce operator with TCS, and manufacturers of notified goods (ice cream, pan masala, aerated drinks, tobacco).",
  },
  // q11 → C
  {
    q: "Under Section 9(1) of the CGST Act, the central goods and services tax shall be levied at rates not exceeding:",
    o: [
      "Twelve per cent",
      "Eighteen per cent",
      "Twenty per cent",
      "Twenty-eight per cent",
    ],
    a: 2,
    e: "Section 9(1) provides that CGST shall be levied at such rates, not exceeding twenty per cent, as may be notified by the Government on the recommendations of the Council.",
  },
  // q12 → A
  {
    q: "Under Section 8(a) of the CGST Act, the tax liability on a 'composite supply' shall be determined as:",
    o: [
      "The rate applicable to the principal supply of that composite supply",
      "The average rate applicable on all the component supplies",
      "The highest rate applicable among all supplies in the composite supply",
      "The rate applicable on the supply forming the largest portion by value",
    ],
    a: 0,
    e: "Section 8(a) states: a composite supply comprising two or more supplies, one of which is a principal supply, shall be treated as a supply of such principal supply — i.e., taxed at the rate applicable to the principal supply.",
  },
  // q13 → D
  {
    q: "Under Section 2(98) of the CGST Act, 'reverse charge' means:",
    o: [
      "The liability to collect tax by the supplier from the recipient",
      "The right of the recipient to claim refund of tax already paid",
      "The power of the Government to revise the rate of tax retrospectively",
      "The liability to pay tax by the recipient of supply of goods or services instead of the supplier",
    ],
    a: 3,
    e: "Section 2(98) defines 'reverse charge' as the liability to pay tax by the recipient of supply of goods or services or both instead of the supplier, under Section 9(3) or 9(4) of the CGST Act or Section 5(3) or 5(4) of the IGST Act.",
  },
  // q14 → C
  {
    q: "The 'GST Council' referred to in Section 2(36) of the CGST Act is established under which provision of the Constitution of India?",
    o: [
      "Article 265 of the Constitution",
      "Article 246A of the Constitution",
      "Article 279A of the Constitution",
      "Article 301 of the Constitution",
    ],
    a: 2,
    e: "Section 2(36) defines 'Council' as the Goods and Services Tax Council established under Article 279A of the Constitution.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SET 2 — Time of Supply, Value of Supply & ITC (Sections 12–19)
// ─────────────────────────────────────────────────────────────────────────────
export const gst_act_set2: RawQuestion[] = [
  // q0 → B
  {
    q: "Under Section 12(2) of the CGST Act, the time of supply of goods (in normal cases, not reverse charge) shall be the EARLIER of:",
    o: [
      "The date of delivery of goods to the recipient or the date of payment, whichever is earlier",
      "The date of issue of invoice (or last date to issue invoice under Section 31), or the date on which the supplier receives the payment",
      "The date of removal of goods or the date of receipt of goods by the recipient",
      "The date of raising of purchase order or the date of acceptance of goods by the recipient",
    ],
    a: 1,
    e: "Section 12(2) provides that the time of supply of goods shall be the earlier of: (a) the date of issue of invoice or the last date on which the supplier is required under Section 31 to issue the invoice; or (b) the date on which the supplier receives the payment.",
  },
  // q1 → C
  {
    q: "Under Section 12(3) of the CGST Act, the time of supply of goods in respect of which tax is paid on reverse charge basis shall be the EARLIEST of — which period is specified in clause (c) of that sub-section (relating to the invoice)?",
    o: [
      "Date immediately following 60 days from the date of issue of invoice",
      "Date immediately following 45 days from the date of issue of invoice",
      "Date immediately following 30 days from the date of issue of invoice",
      "Date immediately following 90 days from the date of issue of invoice",
    ],
    a: 2,
    e: "Section 12(3)(c) provides that for goods under reverse charge, the time of supply is the date immediately following thirty days from the date of issue of invoice or any other document in lieu thereof by the supplier.",
  },
  // q2 → A
  {
    q: "Under Section 13(3) of the CGST Act, the time of supply of services liable to tax on reverse charge basis shall be the earliest of — which period is specified in clause (b) (relating to the invoice)?",
    o: [
      "The date immediately following sixty days from the date of issue of invoice by the supplier",
      "The date immediately following thirty days from the date of issue of invoice by the supplier",
      "The date immediately following ninety days from the date of issue of invoice by the supplier",
      "The date immediately following forty-five days from the date of issue of invoice by the supplier",
    ],
    a: 0,
    e: "Section 13(3)(b) provides that for services under reverse charge, the time of supply is the date immediately following sixty days from the date of issue of invoice or any other document by the supplier. (Note: For goods it is 30 days; for services it is 60 days.)",
  },
  // q3 → D
  {
    q: "Under Section 15(2) of the CGST Act, which of the following is INCLUDED in the transaction value of a supply?",
    o: [
      "Government subsidies directly linked to the price of the goods or services",
      "Tax paid under GST Acts (i.e., CGST, SGST, IGST) charged separately by the supplier",
      "Any discount given before or at the time of supply and duly recorded in the invoice",
      "Incidental expenses including commission and packing charges levied by the supplier",
    ],
    a: 3,
    e: "Section 15(2)(c) includes incidental expenses, including commission and packing, charged by the supplier in the transaction value. Government subsidies are EXCLUDED [Section 15(2)(e) only includes non-Government subsidies]. GST itself is not included. Discounts recorded in invoice are excluded from value per Section 15(3).",
  },
  // q4 → B
  {
    q: "Under Section 15(3) of the CGST Act, a post-supply discount shall NOT be included in the value of supply if:",
    o: [
      "The discount is given in cash to the recipient after three months of supply",
      "The discount is established in terms of an agreement entered before or at the time of supply, is linked to specific invoices, and the recipient has reversed the ITC attributable to the discount",
      "The discount is given voluntarily by the supplier without any prior agreement",
      "The discount exceeds ten per cent of the invoice value",
    ],
    a: 1,
    e: "Section 15(3)(b) provides that a post-supply discount is excluded from value if: (i) such discount is established in terms of an agreement entered before or at the time of supply; (ii) it is linked to specific invoices; and (iii) the recipient has reversed the ITC attributable to the discount.",
  },
  // q5 → C
  {
    q: "Under Section 16(2) of the CGST Act, if a recipient of goods or services fails to pay the supplier the amount towards the value of supply along with the tax payable thereon within how many days from the date of issue of invoice, the ITC availed shall be reversed along with interest?",
    o: [
      "Ninety days",
      "One hundred and twenty days",
      "One hundred and eighty days",
      "Two hundred and ten days",
    ],
    a: 2,
    e: "Section 16(2) proviso states: if the recipient fails to pay the supplier within one hundred and eighty days from the date of issue of invoice by the supplier, an amount equal to the ITC availed shall be paid by him along with interest payable under Section 50.",
  },
  // q6 → A
  {
    q: "Under Section 16(4) of the CGST Act, a registered person shall NOT be entitled to take ITC in respect of any invoice or debit note for supply of goods or services or both after the:",
    o: [
      "Thirtieth day of November following the end of the financial year to which such invoice or debit note pertains, or the date of furnishing of the relevant annual return, whichever is earlier",
      "Thirtieth day of September following the end of the financial year to which the invoice pertains",
      "Date on which the return for the month of March of that financial year is filed",
      "Sixtieth day following the end of the financial year to which the invoice pertains",
    ],
    a: 0,
    e: "Section 16(4) provides that ITC shall not be taken after the thirtieth day of November following the end of the financial year to which the invoice or debit note pertains, or furnishing of the relevant annual return, whichever is earlier.",
  },
  // q7 → D
  {
    q: "Under Section 17(4) of the CGST Act, what special option is available to a banking company or a financial institution regarding ITC?",
    o: [
      "They may claim full ITC on all inputs, capital goods, and input services",
      "They are completely exempt from the ITC provisions of Section 17",
      "They can claim ITC proportional to the ratio of taxable to total turnover each month",
      "They may avail fifty per cent of the eligible ITC on inputs, capital goods and input services each month, with the remaining lapsing",
    ],
    a: 3,
    e: "Section 17(4) gives a banking company or financial institution the option to either: (a) follow the proportionality method of sub-section (2); or (b) avail fifty per cent of the eligible ITC on inputs, capital goods and input services each month, with the remaining lapsing.",
  },
  // q8 → B
  {
    q: "Under Section 17(5) of the CGST Act ('blocked credits'), ITC on motor vehicles and conveyances is generally NOT available. However, ITC IS available when motor vehicles are used for:",
    o: [
      "Transportation of employees to and from the workplace",
      "Further supply of such vehicles, transportation of passengers, imparting training on driving/flying/navigating, or transportation of goods",
      "Official use by directors and senior management for business meetings",
      "Hiring out to other businesses under a lease arrangement",
    ],
    a: 1,
    e: "Section 17(5)(a) blocks ITC on motor vehicles and conveyances EXCEPT when used for: (i) further supply of such vehicles; (ii) transportation of passengers; (iii) imparting training on driving, flying, or navigating such vehicles; (iv) transportation of goods.",
  },
  // q9 → C
  {
    q: "Under Section 17(5) of the CGST Act, ITC is NOT available in respect of:",
    o: [
      "Capital goods used exclusively for making taxable supplies",
      "Input services used in the course or furtherance of business",
      "Goods lost, stolen, destroyed, written off, or disposed of by way of gift or free samples",
      "Inputs directly used in the manufacture of goods for outward taxable supply",
    ],
    a: 2,
    e: "Section 17(5)(j) specifically blocks ITC on goods lost, stolen, destroyed, written off, or disposed of by way of gift or free samples. ITC is available on capital goods and inputs used for taxable business supplies.",
  },
  // q10 → A
  {
    q: "Under Section 19(3) of the CGST Act, if inputs sent to a job worker are not received back by the principal within how many years, the principal shall be liable to pay tax as if such inputs were supplied on the date of being sent to the job worker?",
    o: [
      "One year",
      "Two years",
      "Three years",
      "Five years",
    ],
    a: 0,
    e: "Section 19(3) provides: if inputs are not received back from the job worker within one year from the date they were sent, the principal shall pay tax (along with interest) as if such inputs were supplied on the day they were sent.",
  },
  // q11 → D
  {
    q: "Under Section 19(4) of the CGST Act, if capital goods (other than moulds, dies, jigs, fixtures and tools) sent to a job worker are not received back by the principal within how many years, the principal is liable to pay tax?",
    o: [
      "One year",
      "Two years",
      "Five years",
      "Three years",
    ],
    a: 3,
    e: "Section 19(4) provides: if capital goods (other than moulds/dies/jigs/fixtures/tools) are not received back from the job worker within three years from the date they were sent, the principal shall pay tax along with interest.",
  },
  // q12 → B
  {
    q: "Under Section 18(1) of the CGST Act, ITC on inputs/capital goods for a newly registered person is NOT available on inputs or capital goods purchased more than how long before the date of issue of the tax invoice by the supplier?",
    o: [
      "Six months",
      "One year",
      "Two years",
      "Three years",
    ],
    a: 1,
    e: "Section 18(1) proviso states that ITC is not available on inputs or capital goods purchased more than one year before the date of issue of the tax invoice by the supplier.",
  },
  // q13 → A
  {
    q: "Under Section 16(3) of the CGST Act, if a registered person has claimed depreciation on the tax component of the cost of capital goods under the Income-tax Act, 1961, what happens to the ITC on that tax component?",
    o: [
      "ITC on that tax component shall NOT be allowed",
      "ITC on that tax component shall be allowed but must be reversed within one year",
      "ITC on that tax component shall be allowed only to the extent of 50%",
      "ITC on that tax component shall be allowed but credited only in the following financial year",
    ],
    a: 0,
    e: "Section 16(3) provides: where the registered person has claimed depreciation on the tax component of the cost of capital goods and plant and machinery under the Income-tax Act, 1961, the input tax credit on the said tax component shall not be allowed.",
  },
  // q14 → C
  {
    q: "Under Section 12(6) of the CGST Act, the time of supply relating to an addition in the value of supply by way of interest, late fee or penalty for delayed payment of any consideration shall be:",
    o: [
      "The original date of supply of the goods or services",
      "The date on which the invoice for the original supply was issued",
      "The date on which the supplier receives such addition in value",
      "The date on which the recipient records the liability in his books of account",
    ],
    a: 2,
    e: "Section 12(6) states that the time of supply relating to an addition by way of interest, late fee or penalty for delayed payment of consideration shall be the date on which the supplier receives such addition in value.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SET 3 — Registration, Tax Invoice, Credit & Debit Notes (Sections 22–34)
// ─────────────────────────────────────────────────────────────────────────────
export const gst_act_set3: RawQuestion[] = [
  // q0 → A
  {
    q: "Under Section 22(1) of the CGST Act, every supplier shall be liable to be registered in a State or Union territory (other than special category States) if his aggregate turnover in a financial year exceeds:",
    o: [
      "Twenty lakh rupees",
      "Forty lakh rupees",
      "Ten lakh rupees",
      "Fifty lakh rupees",
    ],
    a: 0,
    e: "Section 22(1) provides that every supplier shall be liable to be registered if his aggregate turnover exceeds twenty lakh rupees in a financial year. For special category States, the threshold is ten lakh rupees.",
  },
  // q1 → D
  {
    q: "Under Section 24 of the CGST Act, which of the following categories of persons is COMPULSORILY required to be registered regardless of turnover?",
    o: [
      "A supplier making exclusively exempt supplies",
      "An agriculturist supplying produce from his own cultivation",
      "A supplier whose aggregate turnover is less than ₹5 lakh",
      "A casual taxable person making taxable supply",
    ],
    a: 3,
    e: "Section 24(ii) mandates compulsory registration for casual taxable persons making taxable supply, irrespective of their turnover. Other compulsorily registered persons include: persons making inter-State taxable supply, reverse charge payers, non-resident taxable persons, ISD, TDS deductors, and agents.",
  },
  // q2 → B
  {
    q: "Under Section 25(1) of the CGST Act, every person liable to be registered shall apply for registration within how many days from the date on which he becomes liable?",
    o: [
      "Fifteen days",
      "Thirty days",
      "Sixty days",
      "Ninety days",
    ],
    a: 1,
    e: "Section 25(1) requires every person liable for registration to apply within thirty days from the date of becoming liable. Exception: a casual taxable person or a non-resident taxable person shall apply at least five days prior to the commencement of business.",
  },
  // q3 → C
  {
    q: "Under Section 27(1) of the CGST Act, the certificate of registration issued to a casual taxable person or a non-resident taxable person shall be valid for:",
    o: [
      "The period specified in the application or sixty days, whichever is earlier",
      "A maximum period of one hundred and eighty days from the effective date",
      "The period specified in the application or ninety days from the effective date of registration, whichever is earlier",
      "The period specified in the application only, with no further extension",
    ],
    a: 2,
    e: "Section 27(1) provides that registration for a casual or non-resident taxable person is valid for the period specified in the application or ninety days from the effective date of registration, whichever is earlier. The proper officer may extend this by a further period not exceeding ninety days.",
  },
  // q4 → A
  {
    q: "Under Section 23(1) of the CGST Act, which of the following persons is NOT liable to be registered under GST?",
    o: [
      "An agriculturist, to the extent of supply of produce out of cultivation of land",
      "A person making inter-State taxable supply of goods",
      "A person required to pay tax on reverse charge basis",
      "An Input Service Distributor",
    ],
    a: 0,
    e: "Section 23(1)(b) provides that an agriculturist, to the extent of supply of produce out of cultivation of land shall not be liable to registration. Section 24 mandates compulsory registration (irrespective of turnover) for inter-State suppliers, reverse charge payers, and ISDs.",
  },
  // q5 → D
  {
    q: "Under Section 29(1) of the CGST Act, a proper officer may cancel the registration of a regular taxpayer (other than a composition taxpayer) if he has not furnished returns for a continuous period of:",
    o: [
      "Three months",
      "Two consecutive tax periods",
      "Three consecutive tax periods",
      "Six months",
    ],
    a: 3,
    e: "Section 29(1)(f) provides that registration may be cancelled if any registered person, other than a composition taxpayer, has not furnished returns for a continuous period of six months. (For composition taxpayers, non-filing for three consecutive tax periods is the ground.)",
  },
  // q6 → B
  {
    q: "Under Section 29(1) of the CGST Act, the registration of a composition taxpayer may be cancelled if he has not furnished returns for:",
    o: [
      "A continuous period of six months",
      "Three consecutive tax periods",
      "Two consecutive financial years",
      "A continuous period of ninety days",
    ],
    a: 1,
    e: "Section 29(1)(e) provides: registration may be cancelled if a composition taxpayer has not furnished returns for three consecutive tax periods. For regular taxpayers, non-filing for a continuous period of six months is the ground.",
  },
  // q7 → C
  {
    q: "Under Section 25(5) of the CGST Act, if a person who is liable for registration applies for it within thirty days of becoming liable, the effective date of registration shall be:",
    o: [
      "The date on which the application for registration is submitted electronically",
      "The date on which the registration certificate is granted by the proper officer",
      "The date on which such person became liable to registration",
      "The date of commencement of business in that State or Union territory",
    ],
    a: 2,
    e: "Section 25(5) provides that if a liability arises and the person applies within thirty days, the effective date of registration shall be the date on which the person became liable to registration.",
  },
  // q8 → A
  {
    q: "Under Section 22(1) of the CGST Act, the Government may, on the recommendations of the Council, enhance the registration threshold from twenty lakh rupees to what amount in the case of a supplier engaged exclusively in the supply of goods?",
    o: [
      "Forty lakh rupees",
      "Sixty lakh rupees",
      "Fifty lakh rupees",
      "Seventy-five lakh rupees",
    ],
    a: 0,
    e: "Section 22(1) Provided also states that the Government may, on Council recommendations, enhance the aggregate turnover threshold from twenty lakh rupees to such amount not exceeding forty lakh rupees in the case of a supplier engaged exclusively in the supply of goods.",
  },
  // q9 → D
  {
    q: "Under Section 29(1) of the CGST Act, before cancelling the registration of a person, the proper officer shall:",
    o: [
      "Issue a notice under Section 73 or Section 74 for recovery of tax",
      "Obtain prior approval from the GST Council",
      "File a complaint before the jurisdictional court",
      "Issue a show cause notice and give an opportunity of being heard",
    ],
    a: 3,
    e: "Section 29(1) proviso states: 'Proper officer shall not cancel the registration without giving the person a show cause notice and opportunity of being heard.' Cancellation of registration is a quasi-judicial action requiring natural justice.",
  },
  // q10 → B
  {
    q: "Under Section 31(3A) of the CGST Act, a registered person is NOT required to issue a tax invoice if the value of the goods or services or both supplied is less than:",
    o: [
      "One hundred rupees",
      "Two hundred rupees",
      "Five hundred rupees",
      "One thousand rupees",
    ],
    a: 1,
    e: "Section 31(3A) provides that a registered person shall not issue a tax invoice if the value of supply is less than two hundred rupees, subject to conditions. A Bill of Supply may be issued instead. However, the registered person may issue a tax invoice voluntarily, and the recipient is entitled to demand one.",
  },
  // q11 → C
  {
    q: "Under Section 34(2) of the CGST Act, a registered person who issues a credit note in relation to a supply shall declare the details of such credit note in the return not later than:",
    o: [
      "The thirtieth day of September following the end of the financial year in which the supply was made",
      "The date of furnishing of the return for the month in which the credit note was issued",
      "The thirtieth day of November following the end of the financial year in which the supply was made, or the date of furnishing of the relevant annual return, whichever is earlier",
      "Within sixty days of the date of issue of the credit note",
    ],
    a: 2,
    e: "Section 34(2) provides that the details of a credit note shall be declared in the return not later than the thirtieth day of November following the end of the financial year in which the supply was made, or the date of furnishing of the relevant annual return, whichever is earlier.",
  },
  // q12 → A
  {
    q: "Under Section 31(1) of the CGST Act, a registered person supplying taxable goods shall issue a tax invoice:",
    o: [
      "Before or at the time of removal of goods (where supply involves movement) or delivery/making available to recipient (in other cases)",
      "Within thirty days from the date of removal of goods",
      "After the complete delivery of all goods in the consignment",
      "Before the date of payment by the recipient",
    ],
    a: 0,
    e: "Section 31(1) provides that a registered person supplying taxable goods shall issue a tax invoice before or at the time of removal of goods for supply (where supply involves movement) or delivery/making available to the recipient in other cases.",
  },
  // q13 → D
  {
    q: "Under Section 31(7) of the CGST Act, in the case of goods sent or taken on approval for sale or return, a tax invoice shall be issued:",
    o: [
      "Before the goods are sent for approval",
      "Only after the goods are finally approved by the recipient",
      "Within thirty days of the date the goods are sent on approval",
      "Before or at the time of supply, or six months from the date of removal, whichever is earlier",
    ],
    a: 3,
    e: "Section 31(7) provides that for goods sent on approval/sale or return, invoice shall be issued before or at the time of supply, or six months from the date of removal, whichever is earlier.",
  },
  // q14 → B
  {
    q: "Under Section 25(6) of the CGST Act, the general rule for registration is:",
    o: [
      "A separate registration is required for each taxable supply a person makes",
      "A single registration per State or Union territory; exception: persons with multiple business verticals in the same State/UT may obtain separate registration for each vertical",
      "A single registration for the whole of India, regardless of the number of States in which the person operates",
      "A person must register in every State/UT where he has customers, regardless of having a fixed place of business",
    ],
    a: 1,
    e: "Section 25(6) provides that a person is entitled to a single registration per State/UT. Exception: a person having multiple business verticals in a State/UT may obtain separate registration for each business vertical [Section 25(2)].",
  },
];
