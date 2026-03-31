import { RawQuestion } from '../quizzes';

// CCS (Commutation of Pension) Rules, 1981
// Set 1 (ID 194): Rules 1–16 — Application, Definitions, Limit, Absolute date, Nominations, Calculation, Without Medical Exam
// Set 2 (ID 195): Rules 17–31 + Commutation Factor Table — After Medical Exam, Medical Authority, Second Exam, Restoration
// Answer distribution per set: A=4, B=4, C=4, D=3

export const ccs_commutation_set1: RawQuestion[] = [
  // q0 → B
  {
    q: "The CCS (Commutation of Pension) Rules, 1981 came into force on:",
    o: [
      "1st January, 1981",
      "1st July, 1981",
      "1st April, 1982",
      "1st January, 1982",
    ],
    a: 1,
    e: "Rule 1 states that these rules came into force from **1st July, 1981**.",
  },
  // q1 → C
  {
    q: "The CCS (Commutation of Pension) Rules, 1981 apply to Government servants appointed on or before:",
    o: [
      "31.12.2000",
      "31.03.2004",
      "31.12.2003",
      "01.01.2004",
    ],
    a: 2,
    e: "Rule 2 states that these rules apply to Government servants appointed **on or before 31.12.2003** who may be entitled to or have been authorized any class of pension referred to in Chapter V of the CCS (Pension) Rules, 2021.",
  },
  // q2 → A
  {
    q: "Under Rule 3, 'Applicant' means:",
    o: [
      "A government servant, including a retired Government servant, who applies for commutation of a percentage of pension in the prescribed form",
      "Only a serving government servant who applies for early retirement benefits",
      "A nominee who claims the commuted value of pension after the applicant's death",
      "The Head of Office who processes and forwards commutation applications",
    ],
    a: 0,
    e: "Rule 3(d) defines 'Applicant' as a **government servant, including a retired Government servant, who applies for commutation of a percentage of pension in the prescribed form**.",
  },
  // q3 → D
  {
    q: "What is the maximum percentage of pension that a Government servant is entitled to commute under Rule 5?",
    o: [
      "25%",
      "33⅓%",
      "50%",
      "40%",
    ],
    a: 3,
    e: "Rule 5(1) states that a Government servant shall be entitled to commute for a lump sum payment of an amount **not exceeding 40%** of his pension.",
  },
  // q4 → B
  {
    q: "Under Rule 5, the amount of commuted value of pension as finally calculated should be rounded off to:",
    o: [
      "The nearest rupee",
      "The next higher rupee",
      "The nearest hundred rupees",
      "The next lower rupee",
    ],
    a: 1,
    e: "Rule 5(3) specifically states that the commuted value of pension as finally calculated **should be rounded off to the next higher rupee**.",
  },
  // q5 → A
  {
    q: "Under Rule 6, in the case of an applicant applying without medical examination, commutation of pension becomes absolute on:",
    o: [
      "The date on which the application in Form 1 is received by the Head of Office",
      "The date the Accounts Officer issues the commutation authority",
      "The date the commuted value is credited to the applicant's account",
      "The date following the date of retirement",
    ],
    a: 0,
    e: "Rule 6(1)(a) provides that commutation becomes absolute — in the case of an applicant who applies in Form 1 — **on the date on which the application in Form 1 is received by the Head of Office**.",
  },
  // q6 → C
  {
    q: "For an applicant drawing pension from a treasury or Accounts Officer, the reduction in pension due to commutation becomes operative at the end of how many months after the Accounts Officer issues the commutation authority — if the commuted value has not been received earlier?",
    o: [
      "1 month",
      "6 months",
      "3 months",
      "2 months",
    ],
    a: 2,
    e: "Rule 6 proviso (a) states: the reduction in pension shall be operative from the date of receipt of commuted value **or at the end of three months** after issue of authority by the Accounts Officer, **whichever is earlier**.",
  },
  // q7 → D
  {
    q: "Under Rule 4, commutation of pension is NOT allowed to a Government servant:",
    o: [
      "Who is above 60 years of age at the time of retirement",
      "Who has availed Leave Travel Concession in the preceding year",
      "Against whom a provisional pension has been sanctioned under normal pension rules",
      "Against whom departmental or judicial proceedings are pending as referred to in Rule 8 of the Pension Rules, 2021",
    ],
    a: 3,
    e: "Rule 4 disallows commutation to a Government servant: (1) against whom **departmental or judicial proceedings are pending** (Rule 8 of Pension Rules, 2021), or (2) to whom provisional pension is authorized during pendency of such proceedings.",
  },
  // q8 → C
  {
    q: "Under Rule 7, the nomination to receive the commuted value of pension (in case the applicant dies after commutation becomes absolute but before receiving the commuted value) is to be made in:",
    o: [
      "Form 1",
      "Form 2",
      "Form 5",
      "Form 4",
    ],
    a: 2,
    e: "Rule 7(1) states that an applicant shall make a nomination **in Form 5** along with the application, conferring on one or more persons the right to receive the commuted value of pension in case the applicant dies without receiving it.",
  },
  // q9 → B
  {
    q: "Under Rule 10-A, the commuted amount of pension shall be restored on completion of how many years from the date the reduction became operative?",
    o: [
      "12 years",
      "15 years",
      "17 years",
      "20 years",
    ],
    a: 1,
    e: "Rule 10-A states: the commuted amount of pension shall be restored on completion of **fifteen years** from the date the reduction of pension on account of commutation becomes operative in accordance with Rule 6.",
  },
  // q10 → A
  {
    q: "Which of the following types of pension qualifies a Government servant for commutation WITHOUT medical examination under Rule 12?",
    o: [
      "Superannuation pension (Rule 33 of Pension Rules)",
      "Invalid pension (Rule 39 of Pension Rules)",
      "Compassionate allowance (Rule 41 of Pension Rules)",
      "Compulsory retirement pension (Rule 40 of Pension Rules)",
    ],
    a: 0,
    e: "Rule 12 lists five categories eligible for commutation **without medical examination**, which include: superannuation pension (Rule 33), retiring pension (Rule 34), absorption pension, compensation pension, and pension finalized after departmental/judicial proceedings. **Invalid pension, compassionate allowance, and compulsory retirement pension** require medical examination.",
  },
  // q11 → B
  {
    q: "An applicant seeking commutation without medical examination shall apply to the Head of Office in:",
    o: [
      "Form 2",
      "Form 1",
      "Form 3",
      "Form 4",
    ],
    a: 1,
    e: "Rule 13 prescribes that an applicant seeking commutation **without medical examination** shall apply to the Head of Office in **Form 1**.",
  },
  // q12 → C
  {
    q: "Under Rule 13(3), a Government servant who desires commutation with the pension payment order (i.e., before retirement) shall apply in Form 1-A, which must reach the Head of Office not later than:",
    o: [
      "1 month before the date of superannuation",
      "6 months before the date of superannuation",
      "3 months before the date of superannuation",
      "2 months before the date of superannuation",
    ],
    a: 2,
    e: "Rule 13(3)(a) states that such an applicant shall apply to the Head of Office in **Form 1-A** so as to reach the Head of Office **not later than 3 months** before the date of superannuation.",
  },
  // q13 → D
  {
    q: "Under Rule 14, if the application in Form 1 is received by the Head of Office after one year from the date of retirement, the applicant must:",
    o: [
      "Submit Form 5 with a fresh nomination",
      "Request the Accounts Officer to condone the delay",
      "Re-submit Form 1 with supporting documents",
      "Apply afresh in Form 2 so that arrangements for medical examination can be made",
    ],
    a: 3,
    e: "Rule 14 states that if Form 1 is received by the Head of Office **after one year** from the date of retirement, the applicant shall not be eligible to commute without medical examination and must **apply afresh in Form 2** so that arrangements for medical examination can be made.",
  },
  // q14 → A
  {
    q: "Under Rule 9, commutation of provisional pension up to what amount per month does NOT require medical examination?",
    o: [
      "Rs. 6,000 per month",
      "Rs. 3,000 per month",
      "Rs. 12,000 per month",
      "Rs. 9,000 per month",
    ],
    a: 0,
    e: "Rule 9(2)(a) provides that an applicant who desires to commute a percentage of his provisional pension which works out to be **not exceeding Rs. 6,000 per month** does not require medical examination.",
  },
];

export const ccs_commutation_set2: RawQuestion[] = [
  // q0 → A
  {
    q: "Under Rule 18, which of the following applicants is eligible for commutation of pension AFTER medical examination?",
    o: [
      "A Government servant who retired on invalid pension under Rule 39 of the Pension Rules",
      "A Government servant who took superannuation retirement under Rule 33",
      "A Government servant who was granted a compensation pension on abolition of a permanent post",
      "A Government servant who applied in Form 1 within one year of retirement",
    ],
    a: 0,
    e: "Rule 18 lists applicants eligible for commutation **after medical examination**, which includes those who: (a) retire on **invalid pension (Rule 39)**, (b) are compulsorily retired as penalty (Rule 40), (c) receive compassionate allowance (Rule 41), or (d) have not applied within one year of retirement.",
  },
  // q1 → C
  {
    q: "An applicant who is eligible for commutation after medical examination shall apply to the Head of Office in:",
    o: [
      "Form 1",
      "Form 3",
      "Form 2",
      "Form 5",
    ],
    a: 2,
    e: "Rule 19 prescribes that an applicant referred to in Rule 18 (commutation **after medical examination**) shall apply to the Head of Office in **Form 2**.",
  },
  // q2 → B
  {
    q: "'Chief Administrative Medical Authority' as defined in Rule 3(e) means:",
    o: [
      "The Director General of Health Services",
      "The medical authority of the State or the Union Territory as specified",
      "The Chief Medical Officer of the Department of Posts",
      "The Medical Board constituted by the Central Government",
    ],
    a: 1,
    e: "Rule 3(e) defines 'Chief Administrative Medical Authority' as **the medical authority of the State or the Union Territory as specified**.",
  },
  // q3 → D
  {
    q: "Under Rule 22, the medical authority in the case of an applicant who applies for commutation of Invalid Pension shall be:",
    o: [
      "Any government medical officer",
      "A Civil Surgeon",
      "A District Medical Officer",
      "A Medical Board",
    ],
    a: 3,
    e: "Rule 22(1) states that the medical authority shall be a **Medical Board** where an applicant applies for commutation of **Invalid Pension**.",
  },
  // q4 → A
  {
    q: "Under Rule 22, in cases other than invalid pension, the medical authority shall not be lower in status than:",
    o: [
      "A Civil Surgeon or a District Medical Officer",
      "A government doctor with at least 10 years' experience",
      "The Director of Health Services of the State",
      "A Specialist Medical Officer in a Government hospital",
    ],
    a: 0,
    e: "Rule 22(2) provides that in cases other than invalid pension, the medical authority shall be a **Medical Officer not lower in status than that of a Civil Surgeon or a District Medical Officer**.",
  },
  // q5 → C
  {
    q: "Under Rule 23, the fee for medical examination for commutation of pension shall be borne by:",
    o: [
      "The Central Government",
      "The Head of Office from the departmental budget",
      "The applicant",
      "Shared equally between the applicant and the Government",
    ],
    a: 2,
    e: "Rule 23 states: 'The applicant shall be required to pay for medical examination **such fee as may be specified by the Central Government**.' The fee is thus borne by **the applicant**.",
  },
  // q6 → B
  {
    q: "Under Rule 21, when fixing the date of medical examination for commutation, it shall be ensured that, as far as possible, the examination is held before:",
    o: [
      "The date of the applicant's retirement anniversary",
      "The date of the applicant's next birthday",
      "The expiry of the current financial year",
      "Three months from the date of submission of Form 2",
    ],
    a: 1,
    e: "Rule 21(3) states: 'In fixing the date of medical examination, it shall be ensured that the medical examination is held, as far as possible, **before the date of the applicant's next birthday**.' This is crucial as the commutation factor depends on age next birthday.",
  },
  // q7 → D
  {
    q: "A Government servant who is compulsorily retired from service as a penalty and is granted pension under Rule 40 of the Pension Rules is eligible to commute a percentage of his pension:",
    o: [
      "Only up to 20% of pension without medical examination",
      "Without any medical examination like a superannuation retiree",
      "Only after obtaining prior sanction of the Ministry",
      "After being declared fit by the appropriate medical authority (after medical examination)",
    ],
    a: 3,
    e: "Rule 18(b) places such applicants — compulsorily retired under Rule 40 — under Chapter III (commutation **after medical examination**). They are eligible to commute subject to Rule 5 limits, **after being declared fit by the appropriate medical authority**.",
  },
  // q8 → B
  {
    q: "Under Rule 27, an applicant may prefer an appeal against the findings of the medical authority within:",
    o: [
      "15 days of receipt of the certified copy from the medical authority",
      "One month of the receipt of the certified copy from the medical authority",
      "Three months of the medical examination",
      "60 days of the medical examination",
    ],
    a: 1,
    e: "Rule 27 states: 'An applicant may, within **one month** of the receipt of the certified copy from the medical authority, prefer an appeal by addressing a letter to the Head of Office that the opinion of the medical authority may be reviewed by another medical authority.'",
  },
  // q9 → A
  {
    q: "Under Rule 28, an applicant seeking commutation after medical examination may withdraw his application:",
    o: [
      "At any time before subjecting himself to medical examination before the medical authority",
      "At any time, even after undergoing medical examination",
      "Only within 30 days of submitting Form 2",
      "Not at all, once Form 2 has been submitted to the Head of Office",
    ],
    a: 0,
    e: "Rule 28(1) provides that the applicant may withdraw his application **at any time before subjecting himself to medical examination** before the medical authority; but in no case after he has appeared before such authority.",
  },
  // q10 → C
  {
    q: "Under Rule 28(2), if the medical authority directs that the applicant's age for commutation purposes shall be assumed to be greater than his actual age, the applicant may withdraw his application within how many days of receiving this information from the Accounts Officer?",
    o: [
      "7 days",
      "30 days",
      "14 days",
      "21 days",
    ],
    a: 2,
    e: "Rule 28(2) provides that in such a case, the applicant may, by giving notice in writing to the Head of Office, withdraw his application within **14 days** from the date on which he receives the information from the Accounts Officer.",
  },
  // q11 → B
  {
    q: "Under Rule 26, a second medical examination for commutation can take place only after the expiry of a period of not less than:",
    o: [
      "6 months from the date of the first medical examination",
      "One year from the date of the first medical examination",
      "Two years from the date of the first medical examination",
      "3 months from the date of the first medical examination",
    ],
    a: 1,
    e: "Rule 26(1) provides that the second medical examination shall take place after the expiry of a period of **not less than one year** from the date of the first medical examination.",
  },
  // q12 → D
  {
    q: "Under Rule 26, the second medical examination for commutation shall be conducted by:",
    o: [
      "A Medical Officer not below the rank of Civil Surgeon",
      "A panel doctor approved by the Government",
      "The same authority that conducted the first examination",
      "A Medical Board at the applicant's own expense",
    ],
    a: 3,
    e: "Rule 26(2) states: 'If the applicant desires to be re-examined on expiry of the period of one year, the examination shall be by a **Medical Board at his own expense**.'",
  },
  // q13 → A
  {
    q: "Under Rule 10, if a Government servant's final pension is retrospectively revised and enhanced by Government decision after commutation, does the applicant need to apply afresh to receive the difference in commuted value?",
    o: [
      "No, the applicant shall automatically be paid the difference; no fresh application is required",
      "Yes, a fresh Form 1 must be submitted to the Head of Office",
      "Yes, a fresh Form 2 with a new medical examination is required",
      "No, but a written intimation to the Accounts Officer is required",
    ],
    a: 0,
    e: "Rule 10 states that when pension is retrospectively revised and enhanced, the applicant shall be paid the **difference** between the commuted value determined with reference to the enhanced pension and the commuted value already authorized. **For payment of this difference, the applicant shall not be required to apply afresh**.",
  },
  // q14 → C
  {
    q: "As per the Commutation Factor Table (commutation value expressed as number of years' purchase) appended to the CCS (Commutation of Pension) Rules, 1981, the commutation factor for age next birthday of 61 is:",
    o: [
      "8.287",
      "8.093",
      "8.194",
      "8.371",
    ],
    a: 2,
    e: "The Commutation Factor Table appended to the Rules specifies: Age next birthday **61** → Commutation Value = **8.194**. (For reference: Age 60 = 8.287; Age 62 = 8.093; Age 59 = 8.371.)",
  },
];
