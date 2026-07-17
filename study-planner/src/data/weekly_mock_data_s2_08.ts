import { Question } from "./live_mock_data";

export const WEEKLY_MOCK_S2_08_QUESTIONS: Question[] = [
    {
        "id": "s2-08-1",
        "text": "According to the Mail Operations Division letter dated 02.07.2025, from which date did the operational merger of Registered Post into Speed Post for domestic transmission come into effect?",
        "options": [
            "01.09.2025",
            "The merger was operationally effective from 01.10.2025 as per the official notification.",
            "It became effective exclusively on 15.11.2024 per the recent guidelines.",
            "The rationalisation framework and tariff revision applied from 01.04.2025."
        ],
        "correctAnswer": 0,
        "explanation": "The operational merger of Registered Post into Speed Post for domestic transmission became effective from 01.09.2025, per Mail Operations Division letter dated 02.07.2025. The date 01.10.2025 applies to the formal rationalisation and tariff revision."
    },
    {
        "id": "s2-08-2",
        "text": "What is the newly introduced charge for the One-Time Password (OTP) Delivery value-added service for Speed Post?",
        "options": [
            "A charge of ₹10 per article, exclusive of the applicable GST charges.",
            "₹5 per item plus GST",
            "It is provided free of cost for all the new bulk contractual customers.",
            "A mandatory nominal fee of ₹15 per article for specific destinations."
        ],
        "correctAnswer": 1,
        "explanation": "A separate value-added service of OTP Delivery is available at ₹5 per item plus GST, under which the item is handed over only after the addressee successfully confirms the OTP."
    },
    {
        "id": "s2-08-3",
        "text": "Consider the following statements regarding the bagging protocol under the single-hub processing framework:\n1. Speed Post and Registered articles are combined into a single bag carrying an Orange colour label.\n2. Periodicals and Registered Newspapers are dispatched in a separate bag through surface routes using a Green colour label.\n3. The Green colour bag label is strictly restricted to only Blind Literature packets.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 and 3 only",
            "1 and 2 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "Only one Speed Post bag carrying an Orange colour label contains both Speed Post and Registered articles. Other surface articles, including Periodicals and Registered Newspapers, are closed under a Green colour bag label. Statement 3 is incorrect."
    },
    {
        "id": "s2-08-4",
        "text": "Which of the following statements is/are correct regarding the bag closing pattern for Post Offices mapped with an Intra-Circle Hub (ICH)?\n1. They close a TD bag directly to their parent ICH containing articles for mapped NSHs.\n2. They close an NTD bag to the NSH containing articles for POs served by hubs of other Circles.\n3. Station articles must be forwarded to the parent ICH for systematic processing.",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "2 only"
        ],
        "correctAnswer": 3,
        "explanation": "An ICH-mapped PO closes an NTD bag to the NSH containing articles to be delivered in the mapped POs of the mapped NSH and POs of other Circles. The TD bag goes to the parent ICH. Station articles are retained, not sent to the hub."
    },
    {
        "id": "s2-08-5",
        "text": "A customer books a Speed Post Document and a Speed Post Parcel. Both are delayed, and the customer lodges a complaint. Under the prescribed guidelines, when are these articles treated as 'lost' for compensation?",
        "options": [
            "Document: 60 days from booking or 30 days from complaint (later); Parcel: 30 days (later).",
            "Both the Document and Parcel are uniformly treated as lost after exactly 60 days.",
            "Document: 30 days from booking; Parcel: 60 days from booking or the date of complaint.",
            "Both articles require a mandatory waiting period of 90 days from the initial booking date."
        ],
        "correctAnswer": 0,
        "explanation": "A Speed Post Document is treated as lost after 60 days from booking or 30 days from complaint, whichever is later. For Speed Post Parcel, it is 30 days from booking or receipt of complaint, whichever is later."
    },
    {
        "id": "s2-08-6",
        "text": "Consider the following statements regarding the redesign of delivery areas under the new Delivery Centres (DCs):\n1. The one-way distance to be travelled by delivery staff should generally not exceed 15 km.\n2. Exceptions to the distance limit are strictly prohibited under all operational circumstances.\n3. Delivery areas must be completely mechanized using two-wheelers or four-wheelers.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "The one-way distance should not exceed 15 km, but in exceptional circumstances, it may exceed 15 km as per operational requirements. All delivery areas must be mechanised using a 2-wheeler or 4-wheeler."
    },
    {
        "id": "s2-08-7",
        "text": "Which of the following statements is/are not correct regarding the nomenclature and layout of Delivery Centres?\n1. When document and parcel areas are co-located, it is termed an Integrated Delivery Centre.\n2. When areas are in the same compound but not adjacent, both are called Nodal Delivery Centres.\n3. Separate parcel-delivery staff cannot be assigned in an Integrated Delivery Centre.",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "Where processing areas are separate but in the same compound, the document centre is the \"Delivery Centre\" and the parcel area is the \"Nodal Delivery Centre\". In an Integrated DC, separate delivery staff for parcels may be assigned if justified."
    },
    {
        "id": "s2-08-8",
        "text": "In an Integrated Delivery Centre utilizing mix delivery staff for both documents and parcels, what specific operational step diverges from a facility using separate staff?",
        "options": [
            "Ordinary mail is completely removed from the sorting process of the delivery staff.",
            "Bag receipt scanning is entirely bypassed to accelerate the final delivery dispatch.",
            "Sector sorting for parcels is manually recorded in a separate designated ledger book.",
            "Scanning and generation of a Common Delivery Slip is performed for both together."
        ],
        "correctAnswer": 3,
        "explanation": "In an Integrated DC with mix delivery staff, the key difference is that a Common Delivery Slip is generated for document and parcel together during the scanning phase. Separate staff generate separate slips."
    },
    {
        "id": "s2-08-9",
        "text": "What is the maximum limit of accountable articles that can be delivered by one Delivery Centre per day in a Metro City and a State Capital, respectively?",
        "options": [
            "8,000 articles and 5,000 articles",
            "10,000 articles and 8,000 articles respectively, depending on the available infrastructure.",
            "5,000 articles in Metro Cities and 3,000 articles in all other standard locations.",
            "There is no specified limit provided adequate mechanised staff are deployed effectively."
        ],
        "correctAnswer": 0,
        "explanation": "The maximum number of accountable articles that can be delivered by one DC is kept at 8,000 articles per day (except bulk) in Metro/Big cities, and 5,000 articles per day in State Capitals/Other cities."
    },
    {
        "id": "s2-08-10",
        "text": "Consider the following statements regarding operational guidelines for Delivery Centres:\n1. Three delivery attempts must be made for all undelivered Speed Post documents.\n2. Undelivered articles are kept in deposit for a maximum period of 7 days.\n3. Delivery staff must call the addressee before visiting the address to expedite delivery.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Two delivery attempts may be made for documents or parcels, not three. Undelivered articles are kept in deposit for a maximum of 7 days. Delivery staff make a call to the addressee before visiting."
    },
    {
        "id": "s2-08-11",
        "text": "Which of the following statements is/are correct regarding the implementation of second delivery services in Delivery Centres?\n1. The evening shift for the second delivery operates from 12:00 to 20:00 hrs.\n2. The same Facility ID is utilized for both the morning and evening shift Delivery Centres.\n3. Separate Supervisors must be provided for the First and Second delivery sets.",
        "options": [
            "1 only",
            "1 and 2 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "The Evening/Second Delivery timing is 12:00-20:00 hrs. A separate Facility ID is created for the morning-shift DC and the evening-shift DC to give each a separate identity. Separate Supervisors are provided for both sets."
    },
    {
        "id": "s2-08-12",
        "text": "According to the fuel reimbursement policy implemented with effect from 15.11.2024, what is the prerequisite for processing the reimbursement claim of a delivery staff using an immediate family member's two-wheeler?",
        "options": [
            "The staff must submit an officially notarized legal affidavit confirming continuous usage.",
            "The staff must present the original purchase invoice alongside the vehicle registration.",
            "The relevant sub-divisional head must physically verify the specific vehicle monthly.",
            "A declaration to that effect from the delivery staff must be obtained and kept on record."
        ],
        "correctAnswer": 3,
        "explanation": "If the 2-wheeler is owned by an immediate family member, a declaration to that effect from the delivery staff is to be obtained and placed in the guard file before allowing reimbursement."
    },
    {
        "id": "s2-08-13",
        "text": "Consider the following statements regarding the bag closing pattern for International Track Packets (ITPS):\n1. Post Offices mapped with ICHs close a direct separate bag straight to their NSH only.\n2. NSHs dispatch outward ITPS articles exclusively by surface route to foreign destinations.\n3. Direct bags to mapped FPOs are closed where the daily average is 15 articles or 10 kg.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 3 only",
            "2 and 3 only",
            "1 and 2 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "POs mapped with ICHs close a direct separate bag straight to their NSH only. NSHs close direct bags to mapped FPOs for ITPS and dispatch them by Air wherever an air connection is available, not exclusively surface. POs close direct bags to FPOs where the average is 15 articles or 10 kg."
    },
    {
        "id": "s2-08-14",
        "text": "What is the tentative number of Speed Post (Document) articles normally delivered by one delivery staff in a mix delivery area?",
        "options": [
            "60 articles",
            "43 articles",
            "An average of 95 articles assuming a distance of eighteen kilometers in congested zones.",
            "A mandatory minimum of 42 articles covering all registered accountable categories."
        ],
        "correctAnswer": 1,
        "explanation": "The tentative number of Speed Post (Document) articles normally delivered by one delivery staff in a mix delivery area is 43. Ordinary articles are 95, and person-specific registered/parcels are 42."
    },
    {
        "id": "s2-08-15",
        "text": "What is the estimated space requirement for a Delivery Centre in a Metro City catering to approximately 50–80 delivery staff?",
        "options": [
            "≈ 1,000 – 2,500 Sq. Ft.",
            "Exactly 1,595 Sq. Ft. as mandated by the National Nodal Delivery Centre layout design.",
            "≈ 2,000 – 3,500 Sq. Ft.",
            "≈ 4,000 – 5,500 Sq. Ft. to accommodate required parking for mechanised operations."
        ],
        "correctAnswer": 2,
        "explanation": "The estimated area for a Delivery Centre in Metro / Other Big Cities catering to ≈ 50–80 delivery staff is ≈ 2,000 – 3,500 Sq. Ft. The 1,000–2,500 Sq. Ft. range applies to State Capitals / Other Cities."
    },
    {
        "id": "s2-08-16",
        "text": "Which of the following statements is/are not correct regarding treasury functions and cash collection in a Delivery Centre?\n1. Delivery staff collect required cash for paying eMOs directly from the designated official.\n2. Cash collected for COD articles is retained by the delivery staff until the end of the week.\n3. Digitally collected amounts for Custom duty are automatically settled by the designated official.",
        "options": [
            "1 only",
            "1 and 2 only",
            "1 and 3 only",
            "2 only"
        ],
        "correctAnswer": 3,
        "explanation": "After delivery of COD or Custom duty articles, staff submit the cash collected from addressees to the designated official; they do not retain it until the end of the week. Statements 1 and 3 are correct procedures."
    },
    {
        "id": "s2-08-17",
        "text": "Which of the following statements is/are correct regarding the Facility ID and PIN Code mapping of a Delivery Centre?\n1. Each Delivery Centre is assigned a separate Facility ID in the Core System Integrator (CSI).\n2. The Delivery Centre must use a newly generated PIN code distinct from merged offices.\n3. CEPT maps all merged delivery PIN codes to the assigned PIN code of the Delivery Centre.",
        "options": [
            "1 and 3 only",
            "2 and 3 only",
            "1 and 2 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "A separate Facility ID is created for each DC in CSI. Each DC may be assigned the PIN code of any of the merged delivery Post Offices (ideally the major one); it does not use a newly generated PIN. CEPT maps the delivery PINs."
    },
    {
        "id": "s2-08-18",
        "text": "Consider the following statements about the common processing of Speed Post and Registered articles:\n1. Hubs process domestic packets and must superscribe the mode as AIR or SURFACE on the label.\n2. The operational network for common processing commenced from the first set of 09.12.2024.\n3. Station articles must be dispatched in the NTD bag to the designated sorting hub.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Hubs superscribe the transport mode as AIR or SURFACE in the right-hand corner of the label. The operational network commenced w.e.f. first set of 09.12.2024. Station articles are retained by the delivery POs, not sent to the hub."
    },
    {
        "id": "s2-08-19",
        "text": "A Speed Post parcel booked by a customer is reported lost. According to the current guidelines, what is the maximum time limit to declare the parcel 'lost' for compensation?",
        "options": [
            "60 days from the date of booking or 30 days from the complaint, whichever is later.",
            "Exactly 90 days from the date of the formal complaint submission by the sender.",
            "30 days from the date of booking or from the date of receipt of the complaint, whichever is later.",
            "The parcel is treated as lost immediately upon the expiration of the specified transit period."
        ],
        "correctAnswer": 2,
        "explanation": "For a Speed Post Parcel, the time limit to treat the parcel as 'lost' is 30 days from the date of booking or from the date of receipt of the complaint, whichever is later (superseding the 60/30-day rule which applies to documents)."
    },
    {
        "id": "s2-08-20",
        "text": "Which of the following statements is/are correct concerning the deployment and infrastructure of Delivery Centres?\n1. Delivery Centres operate independently without any counter operations.\n2. Entry of outside persons inside the Delivery Centre is strictly not permitted.\n3. CCTVs must cover the inside processing areas but need not cover the outside bag-exchange area.",
        "options": [
            "1 only",
            "2 and 3 only",
            "1 and 3 only",
            "1 and 2 only"
        ],
        "correctAnswer": 3,
        "explanation": "DCs have no counter operations and feature dedicated supervisory staff. Entry of outside persons is not permitted. CCTVs must cover the outside of the DC, including the bag-exchange area, as well as the processing areas inside. Statement 3 is incorrect."
    },
    {
        "id": "s2-08-21",
        "text": "For an exporter booking international mail through the Dak Ghar Niryat Kendra, what is the minimum monthly revenue threshold required to be considered a contractual bulk customer at a single location?",
        "options": [
            "₹50,000",
            "₹1,00,000",
            "An exact prescribed limit of ₹2,00,000 excluding any applicable goods and services taxes.",
            "There is no predefined financial threshold to qualify for the specified bulk categorisation."
        ],
        "correctAnswer": 0,
        "explanation": "A contractual bulk customer requires a minimum monthly revenue of ₹50,000 (excluding taxes) at a single location. For multiple locations, the threshold is ₹2,00,000."
    },
    {
        "id": "s2-08-22",
        "text": "Which Postal Bill of Export (PBE) form is generated when an exporter files documents electronically at a DNK for an e-commerce export?",
        "options": [
            "PBE-I",
            "PBE-III",
            "The specific non-ecommerce variant officially designated as PBE-IV by the Customs portal.",
            "PBE-II"
        ],
        "correctAnswer": 1,
        "explanation": "Electronic filing for e-commerce exports uses the PBE-III form. PBE-I is for manual e-commerce, PBE-II for manual non-e-commerce, and PBE-IV for electronic non-e-commerce exports."
    },
    {
        "id": "s2-08-23",
        "text": "Consider the following statements regarding the free pick-up facility under the DNK scheme:\n1. It is provided for eligible bulk volumes having a monthly revenue of ₹50,000 from a single location.\n2. The facility is strictly restricted to a 10 km radius from the booking centre under all circumstances.\n3. Heads of Circles (HOCs) are empowered to extend the jurisdiction beyond the municipal limit.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "1 and 2 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "Free pick-up requires a minimum monthly revenue of ₹50,000 for a single location. The facility is normally limited to a 20 km radius (not 10 km), but HOCs are empowered to extend this jurisdiction beyond the municipal limit."
    },
    {
        "id": "s2-08-24",
        "text": "Which of the following statements is/are correct regarding the discount structure for EMS (Merchandise) contractual customers?\n1. A contractual customer providing soft copy data receives a 6% discount for a monthly revenue of ₹2,00,000.\n2. An additional 1% DNK discount is provided for all articles booked through the portal.\n3. If booking data is not provided in soft copy, the applicable discount is reduced by half.",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "For EMS revenue between ₹1,00,001 and ₹5,00,000, the contractual discount is 6%. An additional 1% DNK discount applies to all portal bookings. If data is not in soft copy, the discount is half."
    },
    {
        "id": "s2-08-25",
        "text": "An exporter books a commercial sale article through DNK and marks it as a \"Gift\" with an under-declared value. What is the practical implication of this action as per DNK guidelines?",
        "options": [
            "It is treated as customs fraud and can lead to the seizure of the exported commercial article.",
            "The exporter is formally requested to pay the differential insurance premium amount online.",
            "The consignment is automatically downgraded to an unregistered small packet category.",
            "The Postal Assistant immediately amends the value manually in the CSI Point-of-Sale interface."
        ],
        "correctAnswer": 0,
        "explanation": "For a commercial sale, marking the article as \"Gift\" and under-declaring value is treated as customs fraud and can lead to seizure. A commercial invoice must be attached."
    },
    {
        "id": "s2-08-26",
        "text": "Consider the following statements regarding the UPU customs declarations (CN 22 and CN 23):\n1. CN 22 is a full-page form used when the value of the contents exceeds 300 SDR.\n2. CN 23 requires an itemised description and the corresponding Harmonized System (HS) code.\n3. The CN 22 form is typically utilized for ITPS and Registered small packets up to roughly 2 kg.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "CN 22 is a small adhesive label used for values up to 300 SDR, not exceeding it. CN 23 is the full-page form used above 300 SDR, requiring itemised descriptions and HS codes. CN 22 is typical for ITPS and small packets."
    },
    {
        "id": "s2-08-27",
        "text": "According to the manpower deployment guidelines, what is the minimum staff required to be dedicated to a Category A Dak Ghar Niryat Kendra at any time?",
        "options": [
            "1 efficient Postal Assistant and 1 Supervisor",
            "3 Postal Assistants operating simultaneously during the principal business processing hours.",
            "2 persons (out of 4 trained Postal Assistants and 1 Supervisor identified for the centre)",
            "A mandatory minimum of 4 dedicated personnel to ensure uninterrupted customs clearance."
        ],
        "correctAnswer": 2,
        "explanation": "For a Category A DNK, the minimum staff to be identified and trained is 4 efficient PAs + 1 Supervisor, and 2 persons must be dedicated to the DNK at any time."
    },
    {
        "id": "s2-08-28",
        "text": "Which of the following statements is/are not correct regarding billing and penalties for BNPL customers at DNK?\n1. On failure to pay by the due date, a penalty of 12% per annum is imposed, reckoned from the bill date.\n2. Booking of international mail is stopped after 15 days from the due date if the bill remains unpaid.\n3. The Bank Guarantee must equal the anticipated postage of precisely two consecutive billing cycles.",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "Booking of international mail is not allowed from a defaulting customer after one month from the due date, not 15 days. The Bank Guarantee must equal the anticipated postage of three billing cycles, not two. Statement 1 is correct."
    },
    {
        "id": "s2-08-29",
        "text": "What is the maximum permissible weight limit for an International EMS (Speed Post) article and an International Tracked Packet Service (ITPS) article, respectively?",
        "options": [
            "35 kg and up to 5 kg (for 29 destinations)",
            "20 kg and exactly 2 kg respectively, across all universally designated postal jurisdictions.",
            "35 kg for all EMS variants and a uniform 10 kg limit applied globally for tracked packets.",
            "20 kg for merchandise EMS and up to 5 kg specifically restricted to United States packets."
        ],
        "correctAnswer": 0,
        "explanation": "International EMS has a maximum weight of 35 kg. ITPS was originally up to 2 kg, but the weight limit was raised to 5 kg for 29 destinations."
    },
    {
        "id": "s2-08-30",
        "text": "Consider the following statements regarding the compensation rules for international mail:\n1. For an International Parcel, compensation is 40 SDR plus 4.5 SDR per kg, capped at 130 SDR.\n2. For an International Registered M-Bag, the compensation on total loss is fixed at 150 SDR.\n3. For EMS (Documents), compensation is limited only to the postage paid.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1, 2 and 3",
            "2 and 3 only",
            "1 and 3 only"
        ],
        "correctAnswer": 1,
        "explanation": "Parcel compensation is 40 SDR + 4.5 SDR per kg, capped at 130 SDR. M-Bag compensation is 150 SDR. EMS Document compensation is limited only to the postage paid. All statements are correct."
    },
    {
        "id": "s2-08-31",
        "text": "Which of the following statements is/are correct regarding the end-to-end process flow at a DNK?\n1. The customer must manually submit physical KYC documents to the Customs officer at the FPO.\n2. The Let Export Order (LEO) is granted by Customs after assessing the electronic PBE.\n3. Printing of the PBE form is allowed on the portal only after Customs clearance and dispatch.",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "The customer uploads KYC online via the DNK portal; there is no need for manual submission to Customs at the FPO. LEO is granted by Customs, and the PBE form is downloadable only after clearance and dispatch."
    },
    {
        "id": "s2-08-32",
        "text": "A DNK handling 20 commercial packets per day dispatches bags to the mapped Foreign Post Office (FPO). What is the operational requirement regarding the dispatch of these articles?",
        "options": [
            "The bags must be routed through the nearest Sub-Foreign Post Office regardless of volume.",
            "The articles must be consolidated into a standard surface bag labeled for general delivery.",
            "The DNK must close a direct bag to the mapped FPO to ensure delivery within 72 hours.",
            "The DNK should close a direct bag, which in no case should take more than 48 hours to reach the FPO."
        ],
        "correctAnswer": 3,
        "explanation": "A DNK handling more than 15 articles/packets per day should close a direct bag to the mapped FPO, and in no case should bags take more than 48 hours to reach the mapped FPO."
    },
    {
        "id": "s2-08-33",
        "text": "Which of the following statements is/are correct regarding profile registration on the DNK Customer Portal?\n1. An Import Export Code (IEC) and a GSTIN are mandatory fields for commercial export registration.\n2. Validation of the IEC on the portal automatically updates the customer's profile address.\n3. The Letter of Undertaking (LUT) must be updated at the beginning of each financial year.",
        "options": [
            "1, 2 and 3",
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only"
        ],
        "correctAnswer": 0,
        "explanation": "IEC and GSTIN are mandatory. Validation of the IEC automatically updates the profile address. The LUT document must be updated at the beginning of each financial year. All statements are correct."
    },
    {
        "id": "s2-08-34",
        "text": "Who is the approving authority for granting the advance deposit facility to a contractual bulk customer operating from multiple locations?",
        "options": [
            "The relevant Divisional Head",
            "PMG (within his region) and CPMG (all other cases)",
            "Exclusively the Chief Postmaster General (CPMG) for all the comprehensively mapped regions.",
            "The Director General of Postal Services, New Delhi"
        ],
        "correctAnswer": 1,
        "explanation": "The approving authority for advance deposit/payment at booking for Multiple Locations is the PMG (within his region) and the CPMG (for all other cases). The Divisional Head approves for Single Location."
    },
    {
        "id": "s2-08-35",
        "text": "What is the contractual discount slab applicable to an ITPS customer generating a monthly revenue of ₹30,00,000 (excluding taxes)?",
        "options": [
            "9%",
            "12%",
            "14%",
            "A standard rate of 18% granted exclusively to high-volume bulk exporters consistently."
        ],
        "correctAnswer": 2,
        "explanation": "For ITPS, a monthly revenue between ₹20,00,001 and ₹40,00,000 attracts a discount of 14% for contractual customers. An additional 2% DNK discount is also applicable."
    },
    {
        "id": "s2-08-36",
        "text": "Consider the following statements regarding packaging solutions at a Dak Ghar Niryat Kendra:\n1. Exporters are strictly prohibited from using their own packaging under all circumstances.\n2. E-Marketplaces registered as Bulk Customers may supply packaging inventory at DNKs.\n3. Standard packaging material sourced by Circles is made available to exporters under retail post.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "1, 2 and 3",
            "2 and 3 only"
        ],
        "correctAnswer": 3,
        "explanation": "Exporters are permitted to use their own packaging; if sub-standard, they are guided to standard solutions. E-Marketplaces can supply packaging inventory, and DoP provides standard packaging under retail post. Statement 1 is incorrect."
    },
    {
        "id": "s2-08-37",
        "text": "Which of the following statements is/are not correct regarding the compensation rules for partial loss of international articles?\n1. Compensation is limited to the value of the lost or damaged content.\n2. The compensation amount can exceed the designated \"total loss\" threshold if sufficiently justified.\n3. The postage paid is fully refunded to the sender in instances of partial loss or damage.",
        "options": [
            "2 and 3 only",
            "1 and 2 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "For partial loss/damage, compensation is limited to the value of the lost/damaged content and cannot exceed the \"total loss\" amount. In such cases, the postage paid is not refunded. Statements 2 and 3 are incorrect."
    },
    {
        "id": "s2-08-38",
        "text": "Consider the following statements regarding the billing cycle of a Book Now, Pay Later (BNPL) customer on a fortnightly schedule:\n1. The bill is generated on the 22nd of the month for the first fortnight.\n2. The last date of payment for a bill generated on the 7th of the following month is the 15th of that month.\n3. Failure to pay within one month from the due date results in immediate cessation of bookings.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1, 2 and 3",
            "2 and 3 only",
            "1 and 3 only"
        ],
        "correctAnswer": 1,
        "explanation": "For a fortnightly cycle, bills are generated on the 22nd (due 7th of following month) and the 7th of following month (due 15th). No booking is allowed after one month from the due date if unpaid. All are correct."
    },
    {
        "id": "s2-08-39",
        "text": "An MSME exporter intends to export goods using ITPS to a customer in the European Union. Which specific reference number must be entered on the DNK portal to simplify VAT collection?",
        "options": [
            "The standard Harmonized System classification code designated for the commodity.",
            "A valid 16-digit alphanumeric Customs Tariff Heading reference assigned by ICEGATE.",
            "The Import One-Stop Shop (IOSS) number against the Sender's Customs reference.",
            "The Authorised Dealer Code linked directly to the commercial bank account of the sender."
        ],
        "correctAnswer": 2,
        "explanation": "The Import One-Stop Shop (IOSS) number must be entered against the \"Sender's Customs reference\" number; it is required where the export is to countries of the European Union to simplify VAT collection on low-value goods."
    },
    {
        "id": "s2-08-40",
        "text": "Which of the following statements is/are correct regarding advance deposits at DNK?\n1. Single location customers must open a deposit account with a minimum of ₹5,000 per product.\n2. Multiple location customers require a minimum advance deposit of ₹50,000 per product.\n3. A combined single deposit account is maintained collectively for EMS, Parcel, and ITPS products.",
        "options": [
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3",
            "1 and 2 only"
        ],
        "correctAnswer": 3,
        "explanation": "Single Location requires a minimum advance deposit of ₹5,000 per product, and Multiple Locations require ₹50,000 per product. Separate accounts must be maintained for each product (EMS/Parcel/Registered/ITPS). Statement 3 is incorrect."
    },
    {
        "id": "s2-08-41",
        "text": "As per the revised limits mandated by the Reserve Bank of India, what is the maximum end-of-day balance permitted for an individual customer in an IPPB Regular Savings Account?",
        "options": [
            "₹2,00,000",
            "A strict maximum ceiling limit restricted to exactly ₹1,00,000 per customer account.",
            "₹5,00,000 directly matching the DICGC insurance cover available for individual deposits.",
            "There is absolutely no limit provided the account is successfully linked to a POSA."
        ],
        "correctAnswer": 0,
        "explanation": "A payments bank can accept deposits up to ₹2,00,000 per individual customer (end-of-day balance). This limit was raised from ₹1,00,000 to ₹2,00,000 by the RBI with effect from April 2021."
    },
    {
        "id": "s2-08-42",
        "text": "Which of the following conditions is mandatory for opening a DigiSmart Savings Account?",
        "options": [
            "The customer must physically visit an IPPB access point to provide biometric fingerprints immediately.",
            "The applicant must be aged 18 or above, hold a valid Aadhaar and PAN, and the mobile number must be linked to Aadhaar.",
            "An initial deposit of precisely ₹500 must be remitted prior to the generation of the account number.",
            "The customer must be an active existing account holder of the Post Office Savings Bank (POSA)."
        ],
        "correctAnswer": 1,
        "explanation": "The DigiSmart account requires the individual to be 18 or above, holding both Aadhaar and PAN, with the mobile number linked to Aadhaar. It is an app-only account opened instantly."
    },
    {
        "id": "s2-08-43",
        "text": "Consider the following statements regarding the IPPB Premium Sampoorna Savings Account:\n1. It offers a Cyber Insurance cover of up to ₹25,000.\n2. The account opening subscription fee is ₹199 plus GST.\n3. SMS alerts are charged at ₹0.25 plus GST per SMS on a quarterly basis.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 3 only",
            "2 and 3 only",
            "1 and 2 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "The Premium Sampoorna account offers Cyber Insurance up to ₹25,000 and the opening subscription is ₹199 + GST. However, SMS alerts are provided free of cost, distinguishing it from the Premium Surakshit variant."
    },
    {
        "id": "s2-08-44",
        "text": "Which of the following features is/are NOT available in the IPPB Self Help Group (SHG) Account?\n1. Nomination facility\n2. Linkage to a Post Office Savings Account (POSA)\n3. Issuance of a RuPay Virtual Debit Card",
        "options": [
            "1 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "The Self Help Group (SHG) Account is a dedicated basic group account. Nomination, POSA linkage, standing instructions, and Virtual Debit Cards are all explicitly not offered. Therefore, all three are unavailable."
    },
    {
        "id": "s2-08-45",
        "text": "An IPPB Regular Savings Account customer, with POSA linkage, deposits ₹2,50,000 into their IPPB account. What automated action takes place at the end of the day?",
        "options": [
            "The excess ₹50,000 is automatically transferred (swept out) to the linked Post Office Savings Account.",
            "The entire transaction is immediately rejected and reversed due to exceeding the statutory limits.",
            "The surplus funds are temporarily held in an intermediate suspense account pending manual approval.",
            "The entire ₹2,50,000 balance is aggressively swept into the POSA leaving a strictly zero balance."
        ],
        "correctAnswer": 0,
        "explanation": "If an IPPB savings account is linked to a POSA, any end-of-day balance above the ₹2,00,000 cap is automatically transferred (swept out) to the linked POSA. The excess ₹50,000 is moved."
    },
    {
        "id": "s2-08-46",
        "text": "Consider the following statements regarding cash transaction limits for an IPPB Regular Savings Account:\n1. Cash deposits are free up to ₹10,000 per month, after which a charge of 0.50% applies.\n2. Cash withdrawals are free up to ₹25,000 per month, after which a minimum charge of ₹25 per transaction applies.\n3. There are absolutely no free transaction limits for AePS withdrawals over non-IPPB networks.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 3 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Cash deposits are free up to ₹10,000/month, and withdrawals up to ₹25,000/month; beyond these, a 0.50% charge (min ₹25) applies. One transaction per month is free over a non-IPPB network, making statement 3 incorrect."
    },
    {
        "id": "s2-08-47",
        "text": "Which of the following is NOT covered under the Group Accident Guard (Option 1 - Sum Insured ₹10,00,000) offered through TATA AIG?",
        "options": [
            "Accidental Medical Expenses (IPD) up to ₹1,00,000",
            "Education Benefit up to 10% of SI or ₹1,00,000 (whichever is less) for max 2 children",
            "Complete reimbursement for hospitalization strictly arising from pre-existing bacterial infections.",
            "In-Hospital Daily Cash of ₹1,000/day for a maximum of 10 days with a 2-day deductible"
        ],
        "correctAnswer": 2,
        "explanation": "The Group Accident Guard policy explicitly does NOT cover suicide, military service, illegal acts, bacterial infections, disease, AIDS, or dangerous sports. Medical expenses, education benefits, and daily cash are covered."
    },
    {
        "id": "s2-08-48",
        "text": "Consider the following statements regarding the Antyodaya Shramik Suraksha Yojana (ASSY):\n1. The scheme is currently live pan-India covering over 28 crore unorganised workers.\n2. The premium for Plan A (₹10 lakh cover) is ₹499 including GST.\n3. The risk commencement date starts exactly 15 days after the receipt of the premium.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "1, 2 and 3",
            "2 and 3 only"
        ],
        "correctAnswer": 3,
        "explanation": "ASSY is currently live across the Vadodara, Ahmedabad, and Rajkot regions of Gujarat, with a pan-India rollout planned for the future, so statement 1 is incorrect. Plan A premium is ₹499, and risk commences 15 days after premium receipt."
    },
    {
        "id": "s2-08-49",
        "text": "Under the Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY), what is the pro-rata premium applicable for a subscriber enrolling in the month of October?",
        "options": [
            "₹342",
            "A standard flat rate of exactly ₹436 uniformly applied regardless of the enrolment month.",
            "₹228",
            "₹114"
        ],
        "correctAnswer": 0,
        "explanation": "The pro-rata premium for PMJJBY from September to November is ₹342. The annual premium is ₹436, applied proportionately based on the quarter of enrolment (Jun-Aug: 436, Sep-Nov: 342, Dec-Feb: 228, Mar-May: 114)."
    },
    {
        "id": "s2-08-50",
        "text": "In the IPPB Finacle (CBS) system, which menu command is used for an Outward clearing instruments inquiry?",
        "options": [
            "HOIQ",
            "HALI",
            "HACI",
            "A specific system string documented comprehensively under the central HAITINQ protocol."
        ],
        "correctAnswer": 1,
        "explanation": "In the IPPB Finacle (CBS) menu, the command for \"Outward clearing instruments inquiry\" is HALI. HOIQ is for standing instructions, HACI is for account ledger inquiry, and HAITINQ is for cheque book issued inquiry."
    },
    {
        "id": "s2-08-51",
        "text": "Consider the following limits for money transfers using the IPPB Mobile Banking App for a Savings Account:\n1. The maximum per transaction limit for NEFT (Outward) is ₹2,00,000.\n2. The maximum per day cumulative limit for RTGS (Outward) is ₹10,00,000.\n3. The maximum per day count for IMPS (Outward) is 10 transactions.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3",
            "1 and 3 only"
        ],
        "correctAnswer": 2,
        "explanation": "For the IPPB Mobile App: NEFT max per transaction is ₹2,00,000. RTGS max per day is ₹10,00,000. IMPS max per day count is 10. All statements correctly reflect the published transaction limits."
    },
    {
        "id": "s2-08-52",
        "text": "A customer wishes to opt out of the Virtual Debit Card auto-renewal using IPPB's SMS Banking facility. What is the correct keyword format to send to 9910228664?",
        "options": [
            "CANCEL  VDC",
            "OPT OUT  CARD  <12-digit IPPB a/c number>",
            "NO RENEW  VIRTUAL",
            "STOP  RENEWAL"
        ],
        "correctAnswer": 3,
        "explanation": "To opt out of Virtual Debit Card auto-renewal via SMS Banking, the customer must send the keyword: STOP  RENEWAL   to 9910228664 from their registered mobile number."
    },
    {
        "id": "s2-08-53",
        "text": "Which of the following statements is/are correct regarding IPPB's Doorstep Banking (DSB) charges?\n1. The standard charge is flat ₹20 plus GST per doorstep visit beyond 1 km from the post office.\n2. IPPB has currently waived DSB charges, meaning they are NIL till further notice.\n3. If two different customers are served in a single visit, only one DSB charge is applicable.",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "The notified charge is flat ₹20 + GST per visit beyond 1 km. However, IPPB has waived these charges (NIL till further notice). If another customer is served in the same visit, it is treated as a separate delivery and is chargeable."
    },
    {
        "id": "s2-08-54",
        "text": "What is the fee charged for the successful generation of a Digital Life Certificate (Jeevan Pramaan) through an IPPB access point or doorstep service?",
        "options": [
            "₹50 inclusive of all applicable centralized system taxes.",
            "Rs. 70 per successful DLC (inclusive of GST / CESS)",
            "Rs. 100 per certificate when requested explicitly via the assisted doorstep banking channel.",
            "The service is entirely free for all central and state government pensioners uniformly."
        ],
        "correctAnswer": 1,
        "explanation": "The generation fee for a Digital Life Certificate (Jeevan Pramaan) is Rs. 70 per successful DLC, which is inclusive of GST and CESS. There are no additional doorstep charges for this service."
    },
    {
        "id": "s2-08-55",
        "text": "Under the revised Bring Your Own Device (BYOD) scheme effective 25.06.2025, what is the total monthly remuneration for delivery staff meeting the 90% IMA usage criterion?",
        "options": [
            "₹350 consisting entirely of device maintenance compensation.",
            "₹400 comprising ₹250 for device usage and ₹150 for telecommunication tariffs.",
            "₹500 per month (₹300 for device usage and ₹200 for SIM/Data/Voice/SMS charges)",
            "₹600 per month distributed evenly between device usage and required mobile data allowances."
        ],
        "correctAnswer": 2,
        "explanation": "Under the revised BYOD scheme (w.e.f. 25.06.2025), the remuneration is ₹300 for device usage and ₹200 for SIM/Data/Voice/SMS, totaling ₹500 per month, subject to handling at least 90% of articles through the mobile app."
    },
    {
        "id": "s2-08-56",
        "text": "Consider the following end-user (L0) incentives payable to a Gramin Dak Sevak for IPPB services:\n1. ₹15.40 for generating a Digital Life Certificate.\n2. ₹11 for processing a CELC Aadhaar Mobile Update.\n3. ₹3.90 for an AePS transaction, provided the transaction amount exceeds ₹10.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "The end-user (L0) incentive for a DLC is ₹15.40. For a CELC Aadhaar Mobile Update, it is ₹11. For an AePS transaction, it is ₹3.90 (with no income for transactions < ₹10). All statements are correct."
    },
    {
        "id": "s2-08-57",
        "text": "Which of the following statements is/are correct regarding IPPB's Loan Referral Services?\n1. IPPB directly underwrites and disburses short-term personal loans up to ₹50,000.\n2. IPPB offers loans only on a referral basis, acting as a Loan Lead Referrer.\n3. HDFC Bank and Axis Bank are among the partner banks for personal and home loans.",
        "options": [
            "2 and 3 only",
            "1 and 2 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "As a payments bank, IPPB is not permitted to lend. It sources leads and forwards them to partner banks/NBFCs like HDFC and Axis, which underwrite and disburse the loans. Therefore, statement 1 is incorrect."
    },
    {
        "id": "s2-08-58",
        "text": "Consider the following interest rates applied to IPPB accounts as of 1 June 2022:\n1. Regular Savings Account balance up to ₹1 lakh earns 2.00% p.a.\n2. Premium Khata balance above ₹1 lakh and up to ₹2 lakh earns 2.25% p.a.\n3. Current Account balances earn 2.00% p.a. up to ₹1 lakh.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 3 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Savings accounts (Regular, Premium) earn 2.00% p.a. up to ₹1 lakh and 2.25% p.a. above ₹1 lakh up to ₹2 lakh. Current Accounts earn 0.00% interest. Therefore, statement 3 is incorrect."
    },
    {
        "id": "s2-08-59",
        "text": "A customer sets up a NACH debit instruction which bounces due to insufficient balance in their IPPB account. What charge is levied for the return of this NACH debit?",
        "options": [
            "A penalty equivalent to 1% of the failed mandate transaction amount strictly applied.",
            "A standard flat fee of exactly ₹50 including all the associated central taxation elements.",
            "₹100 + GST",
            "The bank automatically freezes the account without applying any direct financial deductions."
        ],
        "correctAnswer": 2,
        "explanation": "The charge for the return of a NACH (debit) mandate due to insufficient balance is ₹100 + GST. NACH mandate registration is charged at ₹50 + GST."
    },
    {
        "id": "s2-08-60",
        "text": "Which of the following statements is/are correct regarding transaction charges over a non-IPPB AePS network for a Basic Savings Account (BSBDA)?\n1. Up to 3 transactions per month are free over a non-IPPB network.\n2. After the free limit, cash withdrawal is charged at ₹20 per transaction.\n3. A mini-statement request after the free limit is charged at ₹5 per transaction.",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "For a Basic Savings Account (BSBDA), up to 3 transactions per month are free over a non-IPPB network (unlike regular accounts which get 1). After the free limit, withdrawal is ₹20, deposit is ₹20, and mini-statement is ₹5."
    },
    {
        "id": "s2-08-61",
        "text": "Under the Mail Network Optimization Project (MNOP), what is the established target average time for Non-Town Delivery (NTD) articles (D+X)?",
        "options": [
            "Average 2 days",
            "Exactly 1.28 days calculated based on localized transportation availability parameters.",
            "Average 3 days systematically adjusted for geographically challenged destination zones.",
            "A mandated minimum of precisely 48 working hours from the point of final induction."
        ],
        "correctAnswer": 0,
        "explanation": "Under MNOP KPIs, the target for D+X (NTD) is Average 2 days. The target for D+X (TD) is Average 1.28 days."
    },
    {
        "id": "s2-08-62",
        "text": "How many mandatory scans are prescribed for Town Delivery (TD) articles under full scan compliance (KPI #9) for regular (non-BNPL) articles?",
        "options": [
            "Exactly 5 essential transit and receipt tracking checkpoints uniformly.",
            "8 mandatory scans",
            "Precisely 12 systematic processing milestones encompassing both hub and final delivery.",
            "9 distinct operational steps designated specifically for the local delivery network nodes."
        ],
        "correctAnswer": 1,
        "explanation": "The full scan compliance for regular TD articles requires 8 mandatory scans (Booking, Dispatch, MA Receipt, Bag Open, Bag Close, MA Dispatch, PO Receipt, PO Delivery). BNPL TD articles require 5 scans."
    },
    {
        "id": "s2-08-63",
        "text": "Consider the following statements regarding the rationalization of mail hubs under MPOP:\n1. 20 NSHs were downgraded to ICHs in Phase 1, effective 15 November 2025.\n2. 27 NSHs were further downgraded to ICHs in Phase 2, effective 03 February 2026.\n3. A threshold of 50 articles/day applies for retaining direct Speed Post bagging to an NSH outside the parent Circle.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3",
            "1 and 3 only"
        ],
        "correctAnswer": 2,
        "explanation": "Under MPOP rationalization, Phase 1 downgraded 20 NSHs to ICHs w.e.f 15.11.2025. Phase 2 downgraded 27 NSHs to ICHs w.e.f 03.02.2026. A threshold of 50 articles/day applies for retaining direct SP bagging outside the parent Circle."
    },
    {
        "id": "s2-08-64",
        "text": "Which of the following statements is/are not correct regarding the finalized parcel network under MPOP (F.No. 39-04/2025-PD)?\n1. The finalized network comprises precisely 40 L1 parcel hubs and 127 L2 parcel hubs.\n2. Every PIN code is mapped directly to an L2 hub, which then routes it to the L1 hub.\n3. The number of L1 hubs is capped at not more than 45 as per the Minister's direction.",
        "options": [
            "1 only",
            "2 only",
            "1 and 3 only",
            "2 and 3 only"
        ],
        "correctAnswer": 1,
        "explanation": "In the finalised MPOP network, every PIN code will be directly mapped to an L1 hub (not an L2 hub), which will do direct sorting for its catchment. The network has 40 L1 and 127 L2 hubs, with L1s capped at 45."
    },
    {
        "id": "s2-08-65",
        "text": "A postman submits a claim for fuel reimbursement for 2-wheeler delivery. According to the modalities, what percentage of his accountable articles must be processed through the Postman Mobile App (IMA) to receive 100% of the calculated charges?",
        "options": [
            "95% or more",
            "Exactly 90% representing the absolute minimum acceptable functional compliance standard.",
            "A flexible threshold oscillating between 80% and 90% based on the sub-divisional assessment.",
            "Total 100% adherence without any allowances for technical discrepancies or downtime errors."
        ],
        "correctAnswer": 0,
        "explanation": "To receive 100% of the calculated fuel reimbursement charges, delivery performance (processing of articles through IMA) must be 95% or more. If it is 90% to 94.9%, 80% of calculated charges are reimbursed."
    },
    {
        "id": "s2-08-66",
        "text": "Consider the following statements regarding the Joint Parcel Product (JPP) Express Cargo Service:\n1. It caters strictly to weight categories ranging from 35 kg to 100 kg.\n2. First-Mile and Last-Mile activities performed by India Post are charged at ₹4/kg each.\n3. Insurance is levied additionally at 0.03% of the content value plus 18% GST.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "JPP focuses on weight categories from 35 kg to 100 kg. India Post charges ₹4/kg for First Mile and ₹4/kg for Last Mile (or ₹6/kg for both). Insurance is 0.03% + 18% GST through Bajaj Allianz. All statements are correct."
    },
    {
        "id": "s2-08-67",
        "text": "Which of the following statements is/are correct regarding the Static Weight System (SWS) specifications in a parcel hub?\n1. The maximum weight capacity of the system must be 35 kg.\n2. The least count for weight measurement is 20 grams.\n3. The measurement time must not exceed a maximum of 3 seconds.",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3",
            "1 and 3 only"
        ],
        "correctAnswer": 2,
        "explanation": "The Static Weight System (SWS) specifies a maximum weight capacity of 35 kg, a least count for weight of 20 grams, and a maximum measurement time of 3 seconds. All statements are correct."
    },
    {
        "id": "s2-08-68",
        "text": "Under the presumptive loss policy for parcels, if an unresolved error indicates a lost bag, how is the presumptive loss calculated?",
        "options": [
            "Based strictly on the physical dimensions and weight classification of the lost container.",
            "A flat uniform penalty of ₹10,000 imposed indiscriminately on the responsible personnel.",
            "It is limited directly to the postage tariff originally remitted by the designated sender.",
            "The maximum compensation the Department may have to pay for all the parcels invoiced in the bag."
        ],
        "correctAnswer": 3,
        "explanation": "If a bag is lost, the presumptive loss calculated is the maximum compensation the Department may have to pay to the customers for all the parcels invoiced within that bag."
    },
    {
        "id": "s2-08-69",
        "text": "According to the Independent Delivery Centre (IDC) policy dated 14.01.2025, what is the targeted number of delivery beats and area for a standard IDC?",
        "options": [
            "50–80 delivery beats occupying an area of ~1,500 – 3,000 sq. ft.",
            "25–40 delivery beats utilizing exactly 1,200 sq. ft of operational staging footprint.",
            "80–120 delivery beats requiring heavily automated infrastructure exceeding 4,000 sq. ft.",
            "A mandatory minimum of 150 beats centralized in expansive 5,000 sq. ft facilities."
        ],
        "correctAnswer": 0,
        "explanation": "Each IDC will comprise 50 to 80 delivery beats and occupy ~1,500 sq. ft to 3,000 sq. ft depending on the number of beats."
    },
    {
        "id": "s2-08-70",
        "text": "Consider the following floor-marking guidelines used in Parcel Hubs:\n1. Blue colour is used to mark processing areas like bag opening and sorting.\n2. Yellow colour is exclusively used to mark equipment and workstations.\n3. Green colour is used to demarcate walking pathways and common aisles.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Blue marks processing areas. Green marks equipment and workstations. Yellow marks aisles and pathways. Therefore, statements 2 and 3 are incorrect."
    },
    {
        "id": "s2-08-71",
        "text": "Under the common SP + Registered Hub bag closing pattern, what bag-label colour codes are utilized?",
        "options": [
            "Orange for Speed Post only and Yellow exclusively for Registered articles across all miles.",
            "Green for Speed Post articles and Blue representing all registered newspaper bundles fundamentally.",
            "Orange for bags containing Speed Post + Registered articles, and Green for Registered Packets only.",
            "Red indicating high-priority document transmission and White for generic surface route parcels."
        ],
        "correctAnswer": 2,
        "explanation": "Only one Speed Post bag carrying an Orange colour label is sent containing Speed Post + Registered articles. Registered Packets (periodicals, blind literature, etc.) are sent in a separate Green colour label bag via surface."
    },
    {
        "id": "s2-08-72",
        "text": "During an inspection of a sorting hub, a number of NTD mis-sorts are identified. According to KPI #5, how is an NTD mis-sort logically defined?",
        "options": [
            "The article was processed outside the stipulated cutoff time designated for the respective shift.",
            "The article lacked a legible barcode, requiring manual secondary intervention by the sorter.",
            "The article was delivered beyond the D+X standard established for that specific geographic route.",
            "The PIN code of the delivery PO of an article differs from the PINs mapped to the destination sorting hub to which it was bagged."
        ],
        "correctAnswer": 3,
        "explanation": "For NTD mis-sorts (KPI #5), if the delivery-PO PIN on the article differs from the PINs of the delivery POs mapped to the destination sorting hub indicated on the bag label, it is treated as a mis-sort."
    },
    {
        "id": "s2-08-73",
        "text": "Consider the following delivery norms established for various types of articles:\n1. Speed Post delivery between Metros is targeted within 1–3 days.\n2. India Post Parcel delivery within the same state is targeted at 4 days.\n3. First Class (Registered) local delivery within municipal limits is targeted at 2 days.\nWhich of the statements given above is/are correct?",
        "options": [
            "1, 2 and 3",
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only"
        ],
        "correctAnswer": 0,
        "explanation": "According to the indicative delivery norms: Speed Post between Metros is 1-3 days; India Post Parcel same state is 4 days; First Class (Registered) Local is 2 days. All statements are correct."
    },
    {
        "id": "s2-08-74",
        "text": "What is the ad-hoc norm established for the distance travelled by a 2-wheeler vehicle in a congested area?",
        "options": [
            "3 minutes per kilometer traversing standard urban thoroughfares.",
            "5 min/km",
            "Exactly 10 minutes per kilometer corresponding directly to the manual bicycle index.",
            "12 minutes per kilometer reflecting severe traffic restrictions."
        ],
        "correctAnswer": 1,
        "explanation": "The ad-hoc norm for the distance travelled by a 2-wheeler vehicle in a congested area is 5 min/km. In a non-congested area, it is 3 min/km."
    },
    {
        "id": "s2-08-75",
        "text": "What is the operational processing capacity (throughput) of a \"Small\" Parcel Hub compared to a \"Large\" Parcel Hub per hour?",
        "options": [
            "Small: ≤ 120/hr; Large: 251-500/hr directly managing constrained peripheral nodes.",
            "Small: up to 100/hr; Large: above 2000/hr heavily relying on autonomous conveyor sorting systems.",
            "Small: 121–250/hr; Large: 501–1400/hr",
            "Small: 251-500/hr; Large: over 5000/hr as mandated by the revised national logistics framework."
        ],
        "correctAnswer": 2,
        "explanation": "The throughput for a \"Small\" Parcel Hub is 121–250 parcels/hr. The throughput for a \"Large\" Parcel Hub is 501–1400 parcels/hr."
    },
    {
        "id": "s2-08-76",
        "text": "Consider the following statements regarding ad-hoc norms for the Middle Mile manual parcel processing centre:\n1. Bag opening with parcel-receipt scan only operates at 350 parcels/hr.\n2. Bag opening combined with parcel-receipt scan and primary sorting operates at 250 parcels/hr.\n3. Sorting and bagging at a mixed station (into pigeon hole then bags) operates at 150 parcels/hr.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "Bag opening (scan only) is 350 parcels/hr. Bag opening (scan + primary sort) is 250 parcels/hr. Sorting & bagging at a mixed station (into pigeon hole then bags) is 150 parcels/hr. All statements are correct."
    },
    {
        "id": "s2-08-77",
        "text": "Which of the following cities is designated as a Trans-Shipment Centre for the Road Transport Network (RTN) under PNOP?",
        "options": [
            "Nabadiganta",
            "Thiruvananthapuram, facilitating extensive southern logistical coastal coordination.",
            "Jaipur, acting as a crucial central node bridging western and northern arterial routes.",
            "Bhubaneswar, heavily managing eastern provincial freight connections systemically."
        ],
        "correctAnswer": 0,
        "explanation": "Nabadiganta (West Bengal) is one of the 9 designated Trans-Shipment Centres utilized for transportation of parcels/mails through the Road Transport Network. The others include Guwahati, Sagar, Chennai, Siliguri, Bengaluru, Golconda, Nagpur, and Ludhiana."
    },
    {
        "id": "s2-08-78",
        "text": "Which of the following statements is/are correct regarding the identification of future L1 hubs under the MPOP design principles?\n1. Identification utilizes district-level GDP growth projections for the next five years.\n2. Telecom density is utilized as a proxy for demand intensity.\n3. All future L1 hubs must be situated near national highways and airports.",
        "options": [
            "1 and 3 only",
            "1, 2 and 3",
            "2 and 3 only",
            "1 and 2 only"
        ],
        "correctAnswer": 1,
        "explanation": "The five-fold approach for identifying L1 hubs includes alignment with e-commerce fulfillment centres, district-level GDP growth projections, telecom density as a proxy for demand intensity, connectivity by surface and air (near highways and airports), and strategic adjustments. All are correct."
    },
    {
        "id": "s2-08-79",
        "text": "An inward error is received at a Post Office. According to the guidelines, within what maximum timeframe must the office in-charge initiate recovery of presumptive loss if the error remains unresolved?",
        "options": [
            "Exactly 48 hours following the preliminary departmental notification of the systemic error.",
            "Within a comprehensive 30-day window to allow for extensive investigative procedures.",
            "Within 5 days of receipt of the error",
            "Precisely 45 days from the actual operational discrepancy occurrence date strictly."
        ],
        "correctAnswer": 2,
        "explanation": "If an inward error is unresolved at a Post Office, the office in-charge must initiate recovery of presumptive loss within 5 days of receipt of the error. Divisional Offices must ensure final recovery within 45 days of the discrepancy."
    },
    {
        "id": "s2-08-80",
        "text": "Consider the following responsibilities mapped in the customer acquisition matrix under PNOP:\n1. The Marketing Executive (ME) presents to clients with a demand of ≤ ₹5 lakh per month.\n2. The Divisional Head handles presentations for demands between > ₹5 lakh and ≤ ₹8 lakh per month.\n3. The Key Account Manager (KAM) is solely responsible for generating all initial cold canvassing leads.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3",
            "1 and 2 only"
        ],
        "correctAnswer": 3,
        "explanation": "The ME presents for ≤ ₹5 lakh per month, and the Divisional Head for > ₹5 lakh and ≤ ₹8 lakh per month. Generating leads (prospecting/cold canvassing) is the responsibility of the Marketing Executive (ME), not the KAM. Statement 3 is incorrect."
    },
    {
        "id": "s2-08-81",
        "text": "Under Rule 5 of the CCS (Temporary Service) Rules, 1965, what is the stipulated notice period required for terminating the services of a temporary Government servant?",
        "options": [
            "One month",
            "A standard mandatory notification period extending to exactly three calendar months.",
            "Forty-five consecutive days strictly conforming to civil administrative guidelines.",
            "Precisely fourteen working days issued fundamentally by the immediate supervisor."
        ],
        "correctAnswer": 0,
        "explanation": "Under Rule 5(1), the services of a temporary Government servant can be terminated by either side giving notice in writing. The period of such notice is one month."
    },
    {
        "id": "s2-08-82",
        "text": "Following the enhancement effective 01.01.2024 (DA reaching 50%), what is the maximum ceiling for Retirement Gratuity and Death Gratuity applicable to covered civil employees?",
        "options": [
            "A strict limit of exactly ₹20 lakh uniformly across all active departmental cadres.",
            "₹25 lakh",
            "The original foundational limit documented statutorily as ₹15,000 without revisions.",
            "An exact sum of ₹15 lakh reflecting the mid-term commission recommendation strictly."
        ],
        "correctAnswer": 1,
        "explanation": "The maximum limit of Retirement Gratuity and Death Gratuity stands enhanced from ₹20 lakh to ₹25 lakh with effect from 01.01.2024, consequent on Dearness Allowance crossing 50%."
    },
    {
        "id": "s2-08-83",
        "text": "Which of the following categories of employees are expressly excluded from the application of the CCS (Temporary Service) Rules, 1965?\n1. Railway servants\n2. Government servants engaged on contract\n3. Government servants paid out of contingencies",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3",
            "1 and 3 only"
        ],
        "correctAnswer": 2,
        "explanation": "Rule 1(4) expressly excludes Railway servants, persons not in whole-time employment, Government servants on contract, those paid from contingencies, extra-temporary/work-charged staff (unless opted for pension), and non-departmental telegraphists. All statements are correct."
    },
    {
        "id": "s2-08-84",
        "text": "Consider the following statements regarding the termination of temporary service:\n1. Termination under Rule 5 requires one month’s notice or pay plus allowances in lieu thereof.\n2. Termination on account of physical unfitness under Rule 6 requires three months' notice.\n3. Termination under Rule 5 does not attract Article 311 if it flows from the service rule and is not a penalty.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "Termination under Rule 5 needs one month's notice or pay in lieu. Rule 6 allows termination without notice on a valid declaration of physical unfitness. Termination flowing from the rule, without casting a stigma, does not attract Article 311."
    },
    {
        "id": "s2-08-85",
        "text": "A temporary Government servant's service is terminated forthwith under the proviso to Rule 5(1). What is the employee legally entitled to claim in lieu of the notice period?",
        "options": [
            "A sum equivalent to his pay plus allowances for the notice period at the rates he was drawing immediately before termination.",
            "Exclusively the basic pay structure without any incorporation of dearness or housing allowances.",
            "Three times the substantive basic pay derived directly from the primary engagement contract.",
            "A predefined fixed subsistence allowance determined arbitrarily by the relevant Appointing Authority."
        ],
        "correctAnswer": 0,
        "explanation": "The Government servant is entitled to claim a sum equivalent to his pay plus allowances for the notice period (or the shortfall) at the rates drawn immediately before termination. Allowances administratively include DA and HRA."
    },
    {
        "id": "s2-08-86",
        "text": "Under Rule 10(1) of the CCS (TS) Rules, what is the rate of terminal gratuity for a temporary servant with 6 years of continuous service?",
        "options": [
            "One month's pay for each completed year of service accurately determined.",
            "One-half (½) of a month’s pay for each completed year of service.",
            "Nil, as terminal gratuity requires a mandatory minimum of exactly ten continuous years.",
            "Two-thirds of a standard month's basic pay calculated uniformly per annum."
        ],
        "correctAnswer": 1,
        "explanation": "For continuous service of 5 years and above, but below 10 years, the rate of terminal gratuity is one-half (½) of a month’s pay for each completed year of service."
    },
    {
        "id": "s2-08-87",
        "text": "Consider the following statements regarding a temporary Government servant who is compulsorily retired from service as a disciplinary measure under Rule 10(1-A):\n1. The rate of gratuity is entirely forfeited due to the punitive nature of the termination.\n2. The rate of gratuity shall not be less than two-thirds of the normal applicable rate.\n3. The gratuity amount cannot exceed the normal rate specified in sub-rule (1).\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "Where a temporary Government servant is compulsorily retired as a penalty, Rule 10(1-A) sets a floor of two-thirds of the normal rate, and a ceiling not exceeding the normal rate specified in sub-rule (1). Statement 1 is incorrect."
    },
    {
        "id": "s2-08-88",
        "text": "Which of the following statements is/are correct regarding situations where no gratuity is admissible under Rule 10(3)?\n1. No gratuity is admissible to a Government servant who resigns his post ordinarily.\n2. A servant resigning to take up, with prior permission, an appointment in a Central statutory body is eligible for terminal gratuity for the Government service.\n3. A servant absorbed in a Central autonomous body with permission has the option to count the Government service for pension under that body instead of drawing terminal gratuity.",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "Generally, resignation forfeits gratuity. However, the first proviso protects those resigning with permission to join a PSU/statutory body (they get terminal gratuity). The second proviso gives an option to count service for pension in the autonomous body instead."
    },
    {
        "id": "s2-08-89",
        "text": "Under Rule 10(1-B), a temporary Government servant can be routed to the regular CCS (Pension) Rules framework for superannuation pension if they have rendered a minimum continuous temporary service of:",
        "options": [
            "Not less than 10 years",
            "Precisely 5 years as formally outlined by the overarching administrative tribunal structure.",
            "Exactly 15 years strictly mandated for any substantive retirement transitioning explicitly.",
            "A minimum of 20 years for standard superannuation irrespective of the medical status."
        ],
        "correctAnswer": 0,
        "explanation": "Under Rule 10(1-B), a temporary servant who retires on superannuation or is declared permanently incapacitated after rendering not less than 10 years’ temporary service is eligible for pension and retirement gratuity under the CCS (Pension) Rules."
    },
    {
        "id": "s2-08-90",
        "text": "Consider the following statements regarding the \"Quasi-Permanent\" service scheme originally found in the 1965 Rules:\n1. It provided an intermediate status between purely temporary and permanent service.\n2. The scheme remains fully active and is essential for all temporary confirmations today.\n3. The provisions have become obsolete and deleted due to the modern once-only confirmation policy.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Quasi-permanent service was an intermediate status. However, the scheme is no longer operative and the rules (3, 4, 7-9, 11) are deleted/obsolete, as protection is now subsumed by the modern once-only confirmation policy."
    },
    {
        "id": "s2-08-91",
        "text": "According to the definitions in Rule 2, how is a \"temporary Government servant\" fundamentally characterized?",
        "options": [
            "One who completes an initial probationary period without securing executive departmental clearance.",
            "One engaged continuously on an ad-hoc extra-departmental basis managing peripheral tasks.",
            "One holding a civil post without holding a lien or a suspended lien on any permanent post.",
            "One strictly paid from local contingency funds designated purely for seasonal operations."
        ],
        "correctAnswer": 2,
        "explanation": "The linchpin definition is that a temporary servant is one who holds a civil post but does not hold a lien (or a suspended lien) on a permanent post."
    },
    {
        "id": "s2-08-92",
        "text": "A temporary Government servant with 8 years of service goes on an approved spell of extraordinary leave. How is this period treated when calculating terminal gratuity under Rule 10(6)?",
        "options": [
            "It is entirely omitted from the final tally of qualifying years under all formal circumstances.",
            "It is automatically converted into half-pay leave and tabulated at a proportionately reduced value.",
            "It counts for completed service on the same basis as for pension and gratuity under the relevant CCS (Pension) Rules.",
            "It triggers an immediate mandatory recalibration of the fundamental basic pay matrix strictly."
        ],
        "correctAnswer": 2,
        "explanation": "Rule 10(6)(c) states that a period of extraordinary leave counts for completed service on the same basis as for pension and retirement/death gratuity under the relevant rule of the CCS (Pension) Rules."
    },
    {
        "id": "s2-08-93",
        "text": "Which of the following statements is/are correct regarding the bar on double benefits under Rule 10(5)?\n1. If terminal gratuity is paid under Rule 10, no other gratuity or pensionary benefit is payable.\n2. The rule strictly prevents a temporary servant from accumulating overlapping retirement gratuities.\n3. NPS employees are formally exempted from this bar enabling simultaneous dual encashments.",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Sub-rule (5) prevents double benefit: where gratuity under this rule is paid to a servant not covered by the retirement-gratuity provision of the Pension Rules, no other gratuity or pensionary benefit is payable. Statement 3 is incorrect."
    },
    {
        "id": "s2-08-94",
        "text": "How is the \"Appointing Authority\" defined under Rule 2 of the CCS (Temporary Service) Rules, 1965?",
        "options": [
            "The singular executive officer fundamentally heading the divisional postal logistics zone.",
            "The authority declared as such under the CCS (Classification, Control and Appeal) Rules, 1965.",
            "Any gazetted officer formally empowered by a temporary departmental ad-hoc resolution exclusively.",
            "The President of India exclusively for all civil service cadres irrespective of rank status."
        ],
        "correctAnswer": 1,
        "explanation": "\"Appointing Authority\" is defined directly as the authority declared as such under the CCS (Classification, Control and Appeal) Rules, 1965."
    },
    {
        "id": "s2-08-95",
        "text": "What is the guaranteed floor percentage for terminal gratuity matching the Contributory Provident Fund (CPF) Scheme as per the proviso to Rule 10(1)?",
        "options": [
            "Exactly 5% of the substantive basic pay derived directly from the primary engagement contract.",
            "10% strictly imposed uniformly across all temporary civil service structural tiers fundamentally.",
            "8⅓ % of his pay",
            "12% mirroring the standard statutory provident fund deduction mandated across public sectors."
        ],
        "correctAnswer": 2,
        "explanation": "The proviso to Rule 10(1) guarantees that the terminal gratuity shall not be less than the matching Government contribution under a CPF Scheme, subject to the condition that the matching contribution shall not exceed 8⅓ % of his pay."
    },
    {
        "id": "s2-08-96",
        "text": "Consider the following statements regarding the power to re-open a termination case under Rule 5(2):\n1. The Central Government or a Head of Department can re-open a case on its own motion.\n2. Normally, no case may be re-opened after the expiry of three months from the date of notice.\n3. The three-month limit can be exceeded if special circumstances are recorded in writing.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "The authority can re-open the case on its own motion. Generally, no case may be re-opened after three months from the notice/termination. This limit can be exceeded in special circumstances recorded in writing. All statements are correct."
    },
    {
        "id": "s2-08-97",
        "text": "When a Government servant is reinstated under Rule 5(2), what specific details must the reinstatement order specify?\n1. The proportion of pay and allowances payable for the period of absence.\n2. The exact departmental location where the employee must physically report on the next day.\n3. Whether the period of absence is to be treated as a period spent on duty for any specified purpose.",
        "options": [
            "1 and 3 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Under Rule 5(2)(b), the order of reinstatement must specify the amount or proportion of pay and allowances payable for the absence, and whether that period is to be treated as a period spent on duty for any specified purpose."
    },
    {
        "id": "s2-08-98",
        "text": "Which of the following statements is/are correct regarding the applicable gratuity regime for Central Government civil servants based on their date of appointment?\n1. Employees appointed on or before 31.12.2003 are covered by the CCS (Pension) Rules, 2021 and Rule 10 of the TS Rules.\n2. Employees appointed on or after 01.01.2004 are governed by the CCS (Payment of Gratuity under NPS) Rules, 2021.\n3. The ₹25 lakh ceiling applies exclusively to the old pension scheme cohort and not the NPS cohort.",
        "options": [
            "1 and 3 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Entrants on/before 31.12.2003 fall under the Pension Rules 2021 and TS Rule 10. Entrants on/after 01.01.2004 fall under the Gratuity-under-NPS Rules 2021. The ₹25 lakh ceiling applies to both regimes uniformly. Statement 3 is incorrect."
    },
    {
        "id": "s2-08-99",
        "text": "For the purpose of calculating terminal gratuity under Rule 10(6), how is \"Pay\" defined?",
        "options": [
            "Only the base salary excluding any other financial components strictly.",
            "Pay as defined in FR 9(21)(a)(i) (basic pay), plus Non-Practicing Allowance where admissible.",
            "A consolidated aggregate encompassing all variable travel and housing stipends comprehensively.",
            "The median salary averaged strictly over the final thirty-six months of continuous temporary service."
        ],
        "correctAnswer": 1,
        "explanation": "Under Rule 10(6)(b), \"Pay\" means pay as defined in Fundamental Rule 9(21)(a)(i) — i.e., basic pay, plus Non-Practicing Allowance (NPA) where admissible to medical officers."
    },
    {
        "id": "s2-08-100",
        "text": "Consider the definition of \"Defence services\" under Rule 2 of the CCS (Temporary Service) Rules, 1965. Which of the following statements is/are correct?\n1. It includes services under the Government of India in the Ministry of Defence paid out of Defence Services Estimates.\n2. It includes the Defence Accounts Departments (under the Ministry of Finance).\n3. It specifically includes persons who are permanently subject to the Army Act 1950.",
        "options": [
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3",
            "1 and 2 only"
        ],
        "correctAnswer": 3,
        "explanation": "\"Defence services\" includes services in the MoD and Defence Accounts Departments paid out of Defence Services Estimates. However, it explicitly excludes those who are permanently subject to the Air Force Act 1950, Army Act 1950, or Navy Act 1957. Statement 3 is incorrect."
    }
];
