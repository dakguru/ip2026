import { RawQuestion } from '../quizzes';

// Establishment Norms
// Set 1 (ID 205): Post Office & RMS establishment, GDS TRCA, supervisory norms, divisional office, canteens, review periods
// Answer distribution: A=4, B=4, C=4, D=3

export const establishment_norms_set1: RawQuestion[] = [
  // q0 → A
  {
    q: "For opening a new Branch Post Office (BO) in a normal rural area, the minimum population norm prescribed in the Establishment Norms (Chapter 1) is:",
    o: [
      "3,000 persons",
      "2,500 persons",
      "1,500 persons",
      "500 persons (for any group of villages)",
    ],
    a: 0,
    e: "Chapter 1 (Rural BOs, effective 1 April 1991): **Normal rural area** — minimum population **3,000**, distance from nearest PO **3 km**, and income at least **33⅓% of cost**. For hilly/tribal/desert areas, the norm is relaxed to 500 (single village) or 1,000 (group), with income norm of 15%.",
  },
  // q1 → B
  {
    q: "Under the Kamlesh Chandra Committee recommendations (w.e.f. 01-07-2018), the Time Related Continuity Allowance (TRCA) for a GDS Branch Postmaster (BPM) Level 2 (up to 5 hours of work per day) is:",
    o: [
      "Rs. 12,000 per month",
      "Rs. 14,500 per month",
      "Rs. 12,500 per month",
      "Rs. 10,000 per month",
    ],
    a: 1,
    e: "Kamlesh Chandra Committee GDS TRCA slabs (w.e.f. 01-07-2018): BPM Level 1 (up to 4 hrs) = **Rs.12,000**; **BPM Level 2 (up to 5 hrs) = Rs.14,500**; ABPM/Dak Sevak Level 1 (up to 4 hrs) = Rs.10,000; ABPM Level 2 (up to 5 hrs) = Rs.12,000. The old point-based TRCA system has been abolished.",
  },
  // q2 → C
  {
    q: "As per Chapter 24.5 of Establishment Norms, a Departmental Chowkidar is sanctioned for a Post Office when the average overnight cash/stamp balance exceeds:",
    o: [
      "Rs. 50,000",
      "Rs. 75,000",
      "Rs. 1,50,000",
      "Rs. 2,00,000",
    ],
    a: 2,
    e: "Chapter 24.5 (Chowkidar): Overnight cash/stamp balance **> Rs.75,000** → Part-time Chowkidar; balance **> Rs.1,50,000** → **Departmental Chowkidar**. A Departmental Chowkidar works **48 hours per week**; a GDS Chowkidar has a maximum of **5 hours per day** (updated under Kamlesh Chandra norms).",
  },
  // q3 → D
  {
    q: "In Chapter 29 of Establishment Norms, the supervisory ratio prescribed for the Registration and Parcel departments in a Railway Mail Service (RMS) sorting office is:",
    o: [
      "0.07 each",
      "0.10 for Registration and 0.07 for Parcel",
      "0.11 for both departments",
      "0.14 each",
    ],
    a: 3,
    e: "Chapter 29.2 RMS Supervisory Ratios: Receipt/Dispatch (Mails) = **0.07**; Sorting = **0.07**; Registration = **0.14**; Parcel = **0.14**. Registration and Parcel attract higher supervisory ratios due to the greater responsibility and accountability involved in handling high-value articles.",
  },
  // q4 → A
  {
    q: "Under Chapter 43 of Establishment Norms, the inspecting workload co-efficient assigned to each Head Post Office (HO) for computing Inspector Posts strength is:",
    o: [
      "0.023",
      "0.012",
      "0.005",
      "0.041",
    ],
    a: 0,
    e: "Chapter 43 (Inspectors Establishment): **HO = 0.023**; SO = 0.012; SO in hilly areas = 0.013; BO = 0.005; BO in hilly areas = 0.006; Departmental staff (per official) = 0.001; GDS staff (per official) = 0.0004; Each sub-division formed = 0.41. Each sub-division is based on an inspecting workload of **0.59**.",
  },
  // q5 → B
  {
    q: "As per Chapter 41 of Establishment Norms (Divisional Office SIU Standard), the minimum SIU score required for a Postal Division to be justified as a distinct administrative unit is:",
    o: [
      "0.5",
      "0.9",
      "1.0",
      "1.3",
    ],
    a: 1,
    e: "Chapter 41.1 (Divisional Office SIU Standard): SIU score **≥ 0.9** → Divisional Office justified; score **> 1.3** → Additional ASP post justified. For RMS Divisions: score **≥ 1.0** → Division justified; score **≥ 2.6** → Bifurcation into two divisions.",
  },
  // q6 → C
  {
    q: "A Postal Division qualifies as a 'Group A Division' (headed by a gazetted Superintendent) under Chapter 41.3 of Establishment Norms if its clerical strength exceeds:",
    o: [
      "300",
      "400",
      "450",
      "500",
    ],
    a: 2,
    e: "Chapter 41.3 (Group A Division Criteria): A division is classified as Group A if it **contains 1 gazetted HO**, OR **contains 3 or more non-gazetted HOs/HSG SOs**, OR **clerical strength exceeds 450**. The clerical strength is calculated using the formula: (HOs×0.200) + (SOs×0.050) + (BOs×0.002) + (PAs×0.010) + (Postmen×0.005) + (MTS×0.002) + (GDS Staff×0.001).",
  },
  // q7 → D
  {
    q: "Under Chapter 44 of Establishment Norms, an additional post of Complaints Inspector in a division is justified only when public complaints registered through CPGRAMS/CRM exceed:",
    o: [
      "500 per month",
      "600 per month",
      "750 per month",
      "800 per month",
    ],
    a: 3,
    e: "Chapter 44 (Complaints Inspector): **1 Complaints Inspector per Division** irrespective of complaints volume. An **additional post** is justified only if public complaints exceed **800 per month**. (The norm has been updated from manual complaints counting to CPGRAMS and CRM Portal automated distribution workload as per Directorate Public Grievance Division Orders.)",
  },
  // q8 → A
  {
    q: "A Head Post Office has 16 officials. As per Chapter 24.2 of Establishment Norms (MTS Packers), the sanctioned MTS Packer strength for this office would be:",
    o: [
      "4",
      "3",
      "5",
      "2",
    ],
    a: 0,
    e: "Chapter 24.2 (MTS Packers): For strength **> 10, not exceeding 25**: **3 MTS for first 10 + 1 per 5 officials above 10**. With 16 officials: officials above 10 = 6; 6 ÷ 5 = 1 (integer). Total = 3 + 1 = **4 MTS Packers**. For offices with more than 25 officials, the formula changes to the above norm for first 25 + 1 per 7 officials above 25.",
  },
  // q9 → B
  {
    q: "As per Chapter 35 of Establishment Norms, a Railway Mail Service (RMS) office with 50 to 74 officials working on the platform is entitled to:",
    o: [
      "No Platform Inspector post",
      "1 Platform Inspector upgraded to IRM scale",
      "1 Platform Inspector at T/S scale",
      "1 Platform Inspector per 40 additional officials",
    ],
    a: 1,
    e: "Chapter 35 (Platform Inspectors in RMS): 1–29 officials → **No PI post**; 30–49 → **1 PI (T/S scale)**; **50–74 → 1 PI upgraded to IRM scale**; 130 and above → 1 PI per additional 40 officials. The upgrade to IRM scale reflects the higher supervisory responsibility at medium-sized mail handling platforms.",
  },
  // q10 → C
  {
    q: "Under Chapter 65 of Establishment Norms (Canteens and Tiffin Rooms), a Post Office or office with 150 officials is entitled to establish:",
    o: [
      "Tiffin Room A",
      "Tiffin Room B",
      "Canteen D",
      "Canteen C",
    ],
    a: 2,
    e: "Chapter 65 (Canteens and Tiffin Rooms): 15–49 = Tiffin Room B; 50–99 = Tiffin Room A; **100–249 = Canteen D**; 250–499 = Canteen C; 500–699 = Canteen B; 700–1,200 = Canteen A. An office with 150 officials falls in the 100–249 range, qualifying for **Canteen D**.",
  },
  // q11 → D
  {
    q: "In Chapter 64 of Establishment Norms for Postal Training Centres, the prescribed teacher-to-taught ratio for classroom instruction by an Instructor is:",
    o: [
      "1:15",
      "1:25",
      "1:10",
      "1:20",
    ],
    a: 3,
    e: "Chapter 64 (Postal Training Centres): An **Instructor** is expected to conduct **4 hours of class per day + 3 hours of fixed items** with a **teacher:taught ratio of 1:20**. The Vice-Principal's norm is 24 min per trainee + 136 hours per PS Group B session. The Administrative Officer's norm is 1,057 hours per annum (fixed) + 16 min per trainee.",
  },
  // q12 → A
  {
    q: "The staffing norm for the Central Registry of a Circle Office (CPMG level) under Chapter 45.1 of Establishment Norms is:",
    o: [
      "1 clerk per 57,000 diarised communications per year",
      "1 clerk per 50,000 diarised communications per year",
      "1 clerk per 75,000 diarised communications per year",
      "1 clerk per 1,00,000 diarised communications per year",
    ],
    a: 0,
    e: "Chapter 45.1 (Central Registry of Circle Office): **1 Clerk per 57,000 diarised communications per year**. Additionally: data entry speed standard = 8,000 Key Depressions Per Hour (KDPH); Establishment Section: 1 clerk per 3,750 receipts/year and 1 clerk per 825 T/S SOs under review; Sectional Officers: 1 per 100 points (1,600 productive hours/year).",
  },
  // q13 → B
  {
    q: "Under Chapter 51 of Establishment Norms (Standards for Postmasters in Group A & B HOs), the minimum number of points required to convert a Sub Post Office into a Group B Head Post Office is:",
    o: [
      "11,000 points",
      "4,200 points",
      "2,200 points",
      "3,000 points",
    ],
    a: 1,
    e: "Chapter 51.1 (Points for Conversion): **Group B HO = 4,200 points**; Group A HO (Deputy PM + APM combined) = 11,000 points; Additional Deputy PM (Group B) = 1 per 2,200 points above the base. For Group A: Deputy PM (Gazetted) earns 17 pts/T/S clerk + 3 pts/SBCO clerk + 500 fixed pts; APM (HSG) earns 37 pts/T/S clerk + 7 pts/postman.",
  },
  // q14 → C
  {
    q: "Under the Review Policy in Establishment Norms, which of the following offices has its establishment reviewed annually (and NOT every three years)?",
    o: [
      "LSG/HSG Sub Post Offices",
      "GDS Branch Offices",
      "Head Post Offices and Mail Development Guides (MDGs)",
      "Returned Letter Offices",
    ],
    a: 2,
    e: "Review Periods (Establishment Norms): **Head Post Offices and MDGs → Annual review**; LSG/HSG SOs, Class I SOs, T/SOs → Every 3 years; GDS establishment → Every 3 years; BOs → Triennial (at SO/HO inspection) + Annual BO inspection; RLO establishment → Every 3 years; Postal Stores Depot → Every 3 years.",
  },
];
