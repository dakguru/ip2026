import { RawQuestion } from '../quizzes';

// Fundamental Rules & Supplementary Rules (including CCS Joining Time Rules, 1979)
// Set 1 (ID 201): FR Ch I–II — Short title, Application, Definitions (FR-1 to FR-9)
// Set 2 (ID 202): FR Ch III–VIII — Service conditions, Pay, Increments, Lien, Suspension, Dismissal (FR-10 to FR-55)
// Set 3 (ID 203): FR Ch IX+, Supplementary Rules, CCS Joining Time Rules, 1979
// Answer distribution per set: A=4, B=4, C=4, D=3

export const fr_sr_set1: RawQuestion[] = [
  // q0 → A
  {
    q: "The Fundamental Rules came into force with effect from:",
    o: [
      "1st January, 1922",
      "1st April, 1922",
      "1st January, 1919",
      "26th January, 1950",
    ],
    a: 0,
    e: "FR-1 states: 'These rules may be called the Fundamental Rules. They shall come into force with effect from the 1st January 1922.'",
  },
  // q1 → C
  {
    q: "The Fundamental Rules do NOT apply to Government servants whose conditions of service are governed by:",
    o: [
      "State Government Service Rules",
      "Railway Establishment Code",
      "Army or Marine Regulations",
      "State Police Service Regulations",
    ],
    a: 2,
    e: "FR-3 states that the Fundamental Rules do not apply to Government servants whose conditions of service are governed by Army or Marine Regulations.",
  },
  // q2 → B
  {
    q: "Under FR-7, no powers may be exercised or delegated under the Fundamental Rules except after consultation with:",
    o: [
      "The Prime Minister's Office",
      "The Ministry of Finance",
      "The Department of Personnel and Training",
      "The Comptroller and Auditor General",
    ],
    a: 1,
    e: "FR-7 states: 'No powers may be exercised or delegated under these rules except after consultation with the Ministry of Finance.'",
  },
  // q3 → D
  {
    q: "The power of interpreting the Fundamental Rules is reserved to:",
    o: [
      "The Ministry of Finance",
      "The Supreme Court of India",
      "The Department of Personnel and Training",
      "The President",
    ],
    a: 3,
    e: "FR-8 states: 'The powers of interpreting these rules are reserved to the President.'",
  },
  // q4 → A
  {
    q: "Under FR-9, 'Compensatory Allowance' is defined as an allowance granted to meet personal expenditure necessitated by special circumstances. Which of the following is INCLUDED in compensatory allowance?",
    o: [
      "Travelling Allowance",
      "Sumptuary Allowance",
      "Free passage by sea to any place outside India",
      "Dearness Allowance",
    ],
    a: 0,
    e: "FR-9(5) defines Compensatory Allowance as including Travelling Allowance, but specifically excluding sumptuary allowance and the grant of free passage by sea to or from any place outside India.",
  },
  // q5 → C
  {
    q: "Under FR-9, which of the following is treated as 'Duty' for the purposes of increments and qualifying service for pension but NOT for MACP?",
    o: [
      "Joining time after transfer",
      "Participation in National sports events",
      "Training before appointment (on stipend)",
      "Attendance at departmental examination",
    ],
    a: 2,
    e: "As per Government Decisions on Duty under FR-9(6): 'Training before appointment is to be treated as duty for increments and qualifying service for pension, but not for MACP.'",
  },
  // q6 → B
  {
    q: "'Fee' under FR-9 is defined as a payment to a Government servant from a source other than the Consolidated Fund. Which of the following is EXCLUDED from the definition of 'Fee'?",
    o: [
      "Sale proceeds from a book authored by the servant",
      "Income from property and dividends on securities",
      "Royalties from a patent",
      "Income from publishing a book",
    ],
    a: 1,
    e: "FR-9(6-A) excludes from the definition of 'Fee': (a) unearned income such as income from property, dividends, and interests on securities; and (b) income from literary, cultural, artistic, scientific, or technological efforts.",
  },
  // q7 → A
  {
    q: "'Honorarium' under FR-9 is defined as a payment granted from the Consolidated Fund as remuneration for special work of an occasional nature. Which of the following is treated as a RECURRING honorarium?",
    o: [
      "Overtime Allowance (OTA) and Extra Duty Allowance",
      "Travelling Allowance",
      "Leave Travel Concession",
      "Non-Practicing Allowance",
    ],
    a: 0,
    e: "FR-9(9) states that OTA (Overtime Allowance), Overtime pay, and Extra Duty Allowance are treated as recurring honoraria — they are recurrent payments from the Consolidated Fund for special work.",
  },
  // q8 → D
  {
    q: "Under FR-9, 'Lien' means the title of a Government servant to hold on a regular basis a post to which an appointment has been made on a regular basis and on which:",
    o: [
      "Promotion is not imminent",
      "Transfer is not possible",
      "Seniority has been established",
      "Probation is not applicable",
    ],
    a: 3,
    e: "FR-9(13) defines Lien as the title to hold on a regular basis a post to which appointment has been made on a regular basis and on which probation is not applicable.",
  },
  // q9 → C
  {
    q: "Under FR-9, 'Officiate' means that a Government servant performs the duties of a post on which:",
    o: [
      "He himself holds a lien",
      "No one holds a lien",
      "Another person holds a lien",
      "The post has been kept in abeyance",
    ],
    a: 2,
    e: "FR-9(19) defines 'Officiate': 'A Government servant officiates in a post when performing the duties of a post on which another person holds a lien.'",
  },
  // q10 → B
  {
    q: "Under FR-9(21), the Non-Practicing Allowance (NPA) for medical posts is:",
    o: [
      "10% of Basic Pay",
      "20% of Basic Pay",
      "25% of Basic Pay",
      "15% of Basic Pay",
    ],
    a: 1,
    e: "FR-9(21) states: 'Non-practicing allowance (NPA) to medical posts is 20% of Basic pay.' Additionally, basic pay plus NPA should not exceed the pay of Cabinet Secretary level (Rs. 2,37,500).",
  },
  // q11 → A
  {
    q: "'Substantive Pay' under FR-9 means:",
    o: [
      "Only the basic pay of the post to which a substantive appointment has been made",
      "Basic pay plus special pay plus personal pay",
      "Total emoluments excluding dearness allowance",
      "Pay drawn in an officiating capacity",
    ],
    a: 0,
    e: "FR-9(28) defines 'Substantive Pay' as the pay other than special pay, personal pay, or emoluments classed as pay by the President, to which a Government servant is entitled on account of a post to which an appointment has been made substantively — i.e., only basic pay of the post.",
  },
  // q12 → C
  {
    q: "'Personal Pay' under FR-9 is additional pay granted to a Government servant primarily:",
    o: [
      "As a reward for exceptional performance in a year",
      "When posted to a hardship station",
      "To save from a loss of substantive pay due to revision of pay or non-disciplinary reduction",
      "When appointed to officiate in a higher post",
    ],
    a: 2,
    e: "FR-9(23) defines Personal Pay as additional pay granted: (a) to save from a loss of substantive pay in respect of a permanent post (other than a tenure post) due to revision of pay or any non-disciplinary reduction; or (b) in exceptional circumstances on other personal considerations.",
  },
  // q13 → D
  {
    q: "Under FR-9, 'Foreign Service' means service in which pay is received with the sanction of Government from:",
    o: [
      "Any international organization recognized by the United Nations",
      "The Government of a foreign country",
      "A body corporate created by an Act of Parliament",
      "Any source other than the Consolidated Fund of India, the Consolidated Fund of a State or Union Territory",
    ],
    a: 3,
    e: "FR-9(7) defines 'Foreign Service' as service in which pay is received with the sanction of Government from any source other than the Consolidated Fund of India, the Consolidated Fund of a State, or the Consolidated Fund of a Union Territory.",
  },
  // q14 → B
  {
    q: "'Tenure Post' under FR-9 means:",
    o: [
      "A post sanctioned for a limited time only",
      "A permanent post which an individual Government servant may not hold for more than a limited period",
      "A post created specifically for a single project",
      "A post subject to annual renewal by the sanctioning authority",
    ],
    a: 1,
    e: "FR-9(30-A) defines 'Tenure Post' as a permanent post which an individual Government servant may not hold for more than a limited period. Compare this with a 'Temporary Post' which is a post carrying a definite rate of pay sanctioned for a limited time.",
  },
];

export const fr_sr_set2: RawQuestion[] = [
  // q0 → C
  {
    q: "Under FR-13, for how long can a Government servant's lien on a post be retained for appointment in another Central Government Office or State Government?",
    o: [
      "Up to 1 year; exceptional cases up to 2 years",
      "Up to 3 years; exceptional cases up to 5 years",
      "Up to 2 years; exceptional cases up to 3 years",
      "Up to 5 years in all cases",
    ],
    a: 2,
    e: "FR-13 provides: Retention of lien for appointment in another Central Government Office or State Government — up to 2 years and in exceptional cases up to 3 years. For deputation to developing countries of Asia, Africa and Latin America, lien may be retained initially 2 years, extendable to 5 years.",
  },
  // q1 → A
  {
    q: "Under FR-13, a Government servant's lien stands terminated on:",
    o: [
      "Resignation or Technical Resignation",
      "Transfer to another station",
      "Proceeding on Earned Leave for more than 1 year",
      "Being placed under suspension",
    ],
    a: 0,
    e: "FR-13 provides that lien is terminated on Resignation or Technical Resignation, and also when a Government employee acquires a lien on a permanent post outside the cadre on which they are borne.",
  },
  // q2 → B
  {
    q: "Under FR-18, unless the President otherwise determines, no Government servant shall be granted leave of any kind for a continuous period exceeding:",
    o: [
      "Three years",
      "Five years",
      "Four years",
      "Two years",
    ],
    a: 1,
    e: "FR-18 states: 'Unless the President, in view of the exceptional circumstances of the case otherwise determines, no Government servant shall be granted leave of any kind for a continuous period exceeding five years.'",
  },
  // q3 → D
  {
    q: "Under FR-22, the option for pay fixation from the date of promotion (rather than the date of next increment) must be exercised within:",
    o: [
      "Three months of assumption of charge",
      "Six months of assumption of charge",
      "Three months of issuance of promotion order",
      "One month of assumption of charge",
    ],
    a: 3,
    e: "FR-22(I)(a)(1) provides: 'The option of pay fixation within one month from the assumption of charge.' The Government servant can opt for pay fixation from the date of promotion or from the date of next increment.",
  },
  // q4 → A
  {
    q: "Under FR-26, which of the following counts towards service for increment on a time scale of pay?",
    o: [
      "All kinds of leave except Extraordinary Leave (EXOL)",
      "Extraordinary leave in all cases",
      "Period of unauthorized absence",
      "Suspension period when the charge is proved",
    ],
    a: 0,
    e: "FR-26 specifies that for increment purposes, all duty, officiating/deputation service, and all kinds of leave except Extraordinary Leave (EXOL) count. EXOL counts only if granted on medical certificate, on account of civil commotion, or for prosecuting higher technical/scientific studies.",
  },
  // q5 → C
  {
    q: "Under FR-27, premature increments for excellence in sports are limited to what maximum number in an entire service career?",
    o: [
      "3 increments",
      "7 increments",
      "5 increments",
      "10 increments",
    ],
    a: 2,
    e: "FR-27 provides: 'National level — One Increment; International level — Two increments; Total 5 (five) increments entire service.' These are awarded to sports men/women, referees, umpires, and coaches achieving excellence in National and International events.",
  },
  // q6 → B
  {
    q: "Under FR-35, the officiating pay (additional pay in an officiating capacity) is:",
    o: [
      "10% of Basic pay or Rs. 5,000 maximum",
      "12.5% of Basic pay or Rs. 6,700 maximum",
      "15% of Basic pay or Rs. 7,500 maximum",
      "20% of Basic pay or Rs. 10,000 maximum",
    ],
    a: 1,
    e: "FR-35 provides: 'The Central Government fix the pay of an officiating Government servant at an amount less than that admissible under these rules. 12.5% of Basic pay or Rs. 6,700 maximum.'",
  },
  // q7 → D
  {
    q: "Under FR-49, if a Government servant is formally appointed to hold charge of a post in a DIFFERENT cadre or different office, and the additional charge is held for a period exceeding 45 days but not exceeding 3 months, he shall be allowed:",
    o: [
      "Full pay of the higher post only",
      "Pay of higher post + 5% of presumptive pay of additional post",
      "Only his own pay without any additional pay",
      "Pay of higher post + 10% of presumptive pay of additional post",
    ],
    a: 3,
    e: "FR-49(iii) provides: Where a Government servant holds charge of a post not in the same office or not in the same cadre, he shall be allowed the pay of the higher post plus 10% of the presumptive pay of the additional post or posts, if the additional charge is held for a period exceeding 45 days but not exceeding 3 months.",
  },
  // q8 → A
  {
    q: "Under FR-49, the aggregate of pay and additional pay of a Government servant holding additional charge shall in no case exceed:",
    o: [
      "Rs. 2,37,500",
      "Rs. 2,50,000",
      "Rs. 2,00,000",
      "Rs. 3,00,000",
    ],
    a: 0,
    e: "FR-49(iv) states: 'The aggregate of pay and additional pay shall in no case exceed Rs. 2,37,500.' This corresponds to the Cabinet Secretary-level pay ceiling.",
  },
  // q9 → C
  {
    q: "Under FR-53, the subsistence allowance payable to a Government servant under suspension is:",
    o: [
      "30% of earned leave salary",
      "40% of earned leave salary plus Dearness Allowance",
      "50% of earned leave salary or equal to half pay leave salary plus Dearness Allowance",
      "75% of earned leave salary",
    ],
    a: 2,
    e: "FR-53(1)(i) provides: 'Subsistence allowance — 50% of earned leave salary or equal to half pay leave salary plus Dearness Allowance.' The suspension must first be reviewed within 3 months from the date of suspension.",
  },
  // q10 → B
  {
    q: "Under FR-53, after review of suspension beyond 3 months, when can the subsistence allowance be INCREASED?",
    o: [
      "When the suspension is found to be purely procedural",
      "When the prolongation of suspension is not directly attributable to the Government servant",
      "When the Government servant files a writ petition in the High Court",
      "When the charge sheet is found to be not sustainable",
    ],
    a: 1,
    e: "FR-53(1)(ii) provides: 'Subsistence allowance may be increased not exceeding 50% of the subsistence allowance admissible during the first three months when the suspension period is extended after review — not directly attributable to the Government servant.'",
  },
  // q11 → D
  {
    q: "FR-55 of the Fundamental Rules provides that:",
    o: [
      "Leave may be sanctioned to a Govt. servant under suspension with approval of the Ministry",
      "Leave on medical grounds is admissible to a Govt. servant under suspension",
      "Casual leave may be granted to a Govt. servant under suspension",
      "Leave may NOT be granted to a Government servant under suspension",
    ],
    a: 3,
    e: "FR-55 unambiguously states: 'Leave may not be granted to a government servant under suspension.'",
  },
  // q12 → A
  {
    q: "Under FR-45-A, the annual license fee for Government accommodation is:",
    o: [
      "6% per annum of capital cost or 10% of officer's monthly emoluments, whichever is less",
      "8% per annum of capital cost or 12% of monthly emoluments, whichever is less",
      "10% per annum of capital cost or 15% of monthly emoluments, whichever is less",
      "5% per annum of capital cost or 8% of monthly emoluments, whichever is less",
    ],
    a: 0,
    e: "FR-45-A(b) provides: License fee is 6% per annum of capital cost or not exceeding 10% of the officer's monthly emoluments, whichever is less. For calculating the monthly fee: annual license fee divided by 12.",
  },
  // q13 → C
  {
    q: "Under FR-45-A, if a Government servant is occupying Higher-Class accommodation than entitled, the license fee payable is:",
    o: [
      "Double the normal license fee for the higher accommodation",
      "The normal license fee of the entitled accommodation only",
      "Three times the license fee of the higher accommodation",
      "Normal license fee plus 50% surcharge",
    ],
    a: 2,
    e: "The Government Decision under FR-45-A states: 'On occupation of Higher-class accommodation — three times of license fee of the higher accommodation.'",
  },
  // q14 → B
  {
    q: "Under FR-45-A, for how long may a Government servant retain Government accommodation after retirement on normal license fee?",
    o: [
      "Up to 3 months",
      "Up to 6 months",
      "Up to 12 months",
      "Up to 2 months",
    ],
    a: 1,
    e: "FR-45-A Government Decisions (Retention table) provide: Retirement — 6 months on normal license fee. Compare: Transfer involves 2 months on normal + up to 6 months on double fee; Death/missing — 12 months normal + further 12 months normal (if family has no house at place of posting).",
  },
];

export const fr_sr_set3: RawQuestion[] = [
  // q0 → A
  {
    q: "Under FR-56, every Government servant shall retire from service on the afternoon of the last day of the month in which he attains the age of:",
    o: [
      "60 years",
      "58 years",
      "62 years",
      "65 years",
    ],
    a: 0,
    e: "FR-56(a) provides: 'Every Government servant shall retire from service on the afternoon of the last day of the month in which he attains the age of 60 years.' However, specialists in the Teaching, Non-Teaching and Public Health sub-cadres of Central Health Service retire at 65 years.",
  },
  // q1 → D
  {
    q: "Under FR-56(j), for Premature Retirement of Group A & B employees who entered service before age 35, the Government may retire them after they have attained the age of:",
    o: [
      "45 years",
      "55 years",
      "48 years",
      "50 years",
    ],
    a: 3,
    e: "FR-56(j) provides: 'Group A & B (entered in service before age of 35 years) — after he has attained the age of 50 years.' For all other cases (not entering before age 35), premature retirement is after attaining the age of 55 years. Notice is 3 months or 3 months' pay in lieu.",
  },
  // q2 → B
  {
    q: "For Voluntary Retirement under FR-56(k), Group 'C' employees who are not governed by any pension rules may voluntarily retire after completing:",
    o: [
      "20 years of service",
      "30 years of service",
      "25 years of service",
      "15 years of service",
    ],
    a: 1,
    e: "FR-56(m) provides: 'A Government servant in Group 'C' post who is not governed by any pension rules may, by giving notice of not less than three months in writing to the Appropriate Authority, retire from service after he has completed 30 years' service.'",
  },
  // q3 → C
  {
    q: "Under FR-51, a Central Government Officer is eligible for foreign service only after completing how many years of service with a clear vigilance record?",
    o: [
      "5 years",
      "7 years",
      "9 years",
      "12 years",
    ],
    a: 2,
    e: "FR-51 Government Decision provides: 'A Central Govt. Officer shall be eligible for foreign service only after he has completed 9 years of service with clear from vigilance angle.' The maximum deputation in one stretch is 5 years, and maximum over the entire service is 7 years.",
  },
  // q4 → A
  {
    q: "Under FR-51, the cooling-off period before a fresh deputation at Joint Secretary level and below is:",
    o: [
      "3 years",
      "1 year",
      "2 years",
      "Nil",
    ],
    a: 0,
    e: "FR-51 provides cooling-off periods: Joint Secretary level and below — 3 years; Additional Secretary level — 1 year; Secretary level — Nil.",
  },
  // q5 → D
  {
    q: "Under FR-116, from 1st April 2019, the total contribution towards pension and leave salary for an OPS (Old Pension Scheme) employee on foreign service in India is:",
    o: [
      "14% of (Basic Pay + DA)",
      "28% of (Basic Pay + DA)",
      "11% of (Basic Pay + DA)",
      "18% of (Basic Pay + DA)",
    ],
    a: 3,
    e: "FR-116 (from 1st April 2019): OPS employee — 18% of Basic pay + DA [Monthly contribution by employee @ 14% + For Gratuity @ 4%]. NPS employee contributes 28% [Employer 14% + Employee 10% + Gratuity 4%]. Leave salary contribution for all Government servants = 11% of (Basic Pay + DA).",
  },
  // q6 → B
  {
    q: "Under SR-12 of the Supplementary Rules, if a Government servant earns a fee of Rs. 9,500 in a financial year, the amount to be credited to the Consolidated Fund of India is:",
    o: [
      "Rs. 3,167",
      "Rs. 1,500",
      "Rs. 2,000",
      "Rs. 4,750",
    ],
    a: 1,
    e: "SR-12 provides: one-third (1/3) of any fees in excess of Rs. 5,000 paid in a financial year shall be credited to the Consolidated Fund. Calculation: (Rs. 9,500 − Rs. 5,000) ÷ 3 = Rs. 4,500 ÷ 3 = Rs. 1,500.",
  },
  // q7 → C
  {
    q: "Under SR-198, the Service Book of a Government servant is maintained from the date of first appointment. The employee must hand over the service book to the office in which month each year for updating?",
    o: [
      "April",
      "October",
      "January",
      "July",
    ],
    a: 2,
    e: "SR-198 Government Decisions provide: 'In January each year, the Govt. servant shall hand over the service book to his office for updating.' The office shall update and return it to the Govt. employee within 30 days of its receipt. A lost copy is replaced on payment of Rs. 500.",
  },
  // q8 → A
  {
    q: "Under SR-199, descriptive particulars in the Service Book must be re-attested every:",
    o: [
      "Five years",
      "Three years",
      "Two years",
      "Ten years",
    ],
    a: 0,
    e: "SR-199 (Attestation of Entries) provides: 'The head of office must attest all entries. Re-attest the descriptive particulars every five years.' Every step of the official's official life must be recorded and each entry attested by the Head of Office.",
  },
  // q9 → D
  {
    q: "The CCS (Joining Time) Rules, 1979 came into force on:",
    o: [
      "1st January, 1979",
      "1st April, 1979",
      "26th January, 1979",
      "19th May, 1979",
    ],
    a: 3,
    e: "Rule 2 of CCS (Joining Time) Rules, 1979 states: 'They shall come into force from 19th May 1979.'",
  },
  // q10 → B
  {
    q: "Under Rule 4 of CCS (Joining Time) Rules, 1979, no joining time is admissible for temporary transfer for a period not exceeding:",
    o: [
      "90 days",
      "180 days",
      "30 days",
      "120 days",
    ],
    a: 1,
    e: "Rule 4 provides: 'No joining time is admissible in case of temporary transfer for a period not exceeding 180 days. Only the actual transit time, as admissible in case of journeys on tour, may be allowed.'",
  },
  // q11 → C
  {
    q: "Under Rule 8 of CCS (Joining Time) Rules, 1979, when posting involves transfer to another post within the SAME station (no change of residence), joining time admissible is:",
    o: [
      "No joining time",
      "3 days",
      "Only 1 day",
      "5 days",
    ],
    a: 2,
    e: "Rule 8 provides: 'New post within same station — only one day joining time where it does not involve change of residence.' The same station is defined as an area within the municipality.",
  },
  // q12 → A
  {
    q: "Under Rule 9 of CCS (Joining Time) Rules, 1979, the joining time admissible for a transfer involving change of station where the distance between old and new station is more than 1000 km but up to 2000 km is:",
    o: [
      "12 days (15 days if road journey is more than 200 km)",
      "10 days (12 days if road journey is more than 200 km)",
      "15 days (by air 12 days)",
      "8 days (10 days if road journey is more than 200 km)",
    ],
    a: 0,
    e: "Rule 9 joining time table: Distance more than 1000 km up to 2000 km — 12 days; where journey by road is more than 200 km — 15 days. (≤1000 km = 10/12 days; >2000 km = 15 days or 12 days by air.) For transfer to NE, Sikkim, A&N, Lakshadweep, Ladakh: +2 additional days.",
  },
  // q13 → B
  {
    q: "Under Rule 11 of CCS (Joining Time) Rules, 1979, unutilized joining time is credited to the account of:",
    o: [
      "Half Pay Leave",
      "Earned Leave (subject to a maximum accumulation of 300 days)",
      "Commuted Leave",
      "Casual Leave",
    ],
    a: 1,
    e: "Rule 11 provides: 'Unutilized joining time will be credited in the account of Earned Leave, subjected to maximum accumulation of 300 days.' This applies when a Govt. servant joins without availing full joining time.",
  },
  // q14 → D
  {
    q: "Under Rule 6 of CCS (Joining Time) Rules, 1979, a break in service may be converted into joining time without pay by the Head of Department if the break does not exceed 30 days and the Govt. servant has rendered not less than:",
    o: [
      "1 year of continuous service",
      "5 years of continuous service",
      "2 years of continuous service",
      "3 years of continuous service",
    ],
    a: 3,
    e: "Rule 6 provides: 'The period of break may be converted into joining time without pay by the Head of Department, provided that the break does not exceed 30 days and the Govt. servant has rendered not less than 3 years continuous service on the date of his discharge.'",
  },
];
