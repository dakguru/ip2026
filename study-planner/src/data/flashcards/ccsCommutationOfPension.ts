import { RawQuestion } from '../quizzes';

// CCS (Commutation of Pension) Rules, 1981 — Rich MCQs
// Updated Set 1 & Set 2 with 68 questions from the provided topic text file.

export const ccs_commutation_set1: RawQuestion[] = [
  {
    q: "From which date did the Central Civil Services (Commutation of Pension) Rules come into force?",
    o: ["1st April, 1981", "1st July, 1981", "1st January, 1982", "1st June, 1981"],
    a: 1,
    e: "Explanation: Rule 1 fixes commencement at 1st July, 1981, even though the rules bear '1981' in their short title."
  },
  {
    q: "The CCS (Commutation of Pension) Rules, 1981 apply to Government servants appointed on or before:",
    o: ["31.12.2003", "31.03.2004", "01.01.2004", "31.12.2004"],
    a: 0,
    e: "Explanation: Rule 2 confines the rules to pre-NPS recruits — those appointed on or before 31.12.2003."
  },
  {
    q: "Which of the following correctly defines the term 'Pension' under the CCS (Commutation of Pension) Rules, 1981?",
    o: [
      "Only superannuation pension and retiring pension under the Pension Rules, 2021",
      "Any class of pension excluding compassionate allowance",
      "Any class of pension including compassionate allowance under the Pension Rules, 2021",
      "Pension drawn only from the Consolidated Fund of India"
    ],
    a: 2,
    e: "Explanation: Rule 3(h) deliberately includes compassionate allowance within 'pension'."
  },
  {
    q: "Under the CCS (Commutation of Pension) Rules, 1981, the term 'Provisional Pension' refers to pension sanctioned under:",
    o: [
      "Rule 8 of the Pension Rules, 2021 only",
      "Rule 62 of the Pension Rules, 2021 only",
      "Rule 8 or Rule 62 of the Pension Rules, 2021, as the case may be",
      "Rule 33 of the Pension Rules, 2021"
    ],
    a: 2,
    e: "Explanation: Rule 3(j) covers both flavours of provisional pension — Rule 8 (during pendency of proceedings) and Rule 62 (pending finalisation of regular pension)."
  },
  {
    q: "'Retirement gratuity' for the purpose of the Commutation Rules is defined with reference to:",
    o: [
      "Sub-rule (1) of Rule 44 of the Pension Rules, 2021",
      "Sub-rule (1) of Rule 45 of the Pension Rules, 2021",
      "Rule 41 of the Pension Rules, 2021",
      "Rule 50 of the Pension Rules, 2021"
    ],
    a: 1,
    e: "Explanation: Rule 3(f) anchors retirement gratuity in Rule 45(1) of the CCS (Pension) Rules, 2021."
  },
  {
    q: "In the context of the CCS (Commutation of Pension) Rules, 1981, an 'Applicant' means:",
    o: [
      "Only a serving Government servant who applies for commutation before retirement",
      "Only a retired Government servant who applies after retirement",
      "A Government servant, including a retired Government servant, who applies for commutation in the prescribed form",
      "Any pensioner, including those drawing family pension, who applies for commutation"
    ],
    a: 2,
    e: "Explanation: Rule 3(d) is wide enough to include both pre-retirement (Form 1-A) and post-retirement (Form 1/Form 2) applicants."
  },
  {
    q: "Consider the following statements regarding the bar on commutation of pension:\n1. A Government servant against whom departmental or judicial proceedings are pending under Rule 8 of the Pension Rules, 2021 is ineligible.\n2. A Government servant to whom provisional pension has been authorised under Rule 8 of the Pension Rules during the pendency of such proceedings is ineligible.\n3. The bar applies only after the proceedings end in penalty.",
    o: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    a: 1,
    e: "Explanation: Rule 4 imposes a suspensive bar that operates during pendency of proceedings, irrespective of outcome."
  },
  {
    q: "The 'Chief Administrative Medical Authority' under the Commutation Rules refers to:",
    o: [
      "The Director General of Health Services, Government of India",
      "The medical authority of the State or Union Territory as specified",
      "The Chief Medical Officer of CGHS in Delhi",
      "The Medical Board constituted under the Pension Rules, 2021"
    ],
    a: 1,
    e: "Explanation: Rule 3(e) places this authority at the State/Union Territory level."
  },
  {
    q: "Which of the following persons is NOT eligible to commute a percentage of pension under the CCS (Commutation of Pension) Rules, 1981?",
    o: [
      "A Government servant retiring on superannuation pension",
      "A Government servant against whom departmental proceedings are pending under Rule 8 of the Pension Rules, 2021",
      "A Government servant retiring on invalid pension after medical examination",
      "A Government servant in receipt of compassionate allowance"
    ],
    a: 1,
    e: "Explanation: Rule 4 expressly bars commutation during pendency of disciplinary or judicial proceedings."
  },
  {
    q: "A Government servant appointed on 15.06.2004 retires on superannuation in 2034. Can he commute his pension under the CCS (Commutation of Pension) Rules, 1981?",
    o: [
      "Yes, all Government servants are entitled to commute pension regardless of date of appointment",
      "Yes, provided he completes 20 years of service",
      "No, because the rules apply only to those appointed on or before 31.12.2003",
      "No, because commutation has been abolished after 2004"
    ],
    a: 2,
    e: "Explanation: A 15.06.2004 appointee is a post-cutoff (NPS) recruit and is outside the scope of Rule 2."
  },
  {
    q: "The maximum percentage of pension that a Government servant is entitled to commute for a lump sum payment is:",
    o: ["One-third", "40%", "50%", "Two-thirds"],
    a: 1,
    e: "Explanation: Rule 5(1) caps commutation at 40% of pension."
  },
  {
    q: "While computing the lump sum payable on commutation, the amount of commuted value should be:",
    o: ["Rounded off to the nearest rupee", "Rounded down to the lower rupee", "Rounded off to the next higher rupee", "Paid in paise without rounding"],
    a: 2,
    e: "Explanation: Rule 5(3) builds in pensioner-friendly rounding — fractions are rounded upwards."
  },
  {
    q: "In which of the following cases does commutation of pension become absolute on the date following the date of retirement?",
    o: [
      "Where the application is received by the Head of Office only after retirement",
      "Where the medical authority signs the medical report in Part III of Form 4",
      "Where the Government servant has applied in Form 1-A before retirement and commuted value is to be paid on the day after superannuation",
      "Where the Government servant withdraws his application before medical examination"
    ],
    a: 2,
    e: "Explanation: For pre-retirement Form 1-A applicants, absoluteness attaches the day following retirement."
  },
  {
    q: "For an applicant drawing pension from a treasury or Accounts Officer, the reduction in pension on account of commutation becomes operative from:",
    o: [
      "The date of receipt of the commuted value of pension or the end of three months after issue of authority by the Accounts Officer, whichever is earlier",
      "The date of receipt of the commuted value of pension or the end of three months after issue of authority by the Accounts Officer, whichever is later",
      "The date of issue of authority by the Accounts Officer in all cases",
      "The date of retirement, irrespective of when payment is received"
    ],
    a: 0,
    e: "Explanation: The proviso to Rule 6(1) prevents an applicant from drawing both full pension and commuted value indefinitely."
  },
  {
    q: "Where the commuted value is paid in two or more stages, the reduction in the amount of pension shall be made:",
    o: [
      "From the date of the first payment, applied retrospectively to all stages",
      "From the date of the last payment only",
      "From the respective dates of the payments",
      "From the date of issue of the original authority by the Accounts Officer"
    ],
    a: 2,
    e: "Explanation: Under Rule 6(2), where the lump sum is paid in tranches, the corresponding reduction must mirror each tranche's date."
  },
  {
    q: "The date of payment or credit of commuted value of pension is to be entered in:",
    o: [
      "The first half of the PPO only, by the disbursing authority",
      "The second half of the PPO only, retained by the pensioner",
      "Both halves of the PPO, by the disbursing authority",
      "The Service Book of the pensioner, by the Head of Office"
    ],
    a: 2,
    e: "Explanation: Rule 6(3) requires the date in both halves of the PPO."
  },
  {
    q: "A nomination for receiving the commuted value of pension is made in:",
    o: ["Form 1", "Form 2", "Form 4", "Form 5"],
    a: 3,
    e: "Explanation: Rule 7(1) prescribes Form 5 for nominations."
  },
  {
    q: "If an applicant dies after commutation has become absolute but before receiving the commuted value, and there is no subsisting nomination, the commuted value shall be:",
    o: [
      "Lapsed to the Government",
      "Paid to the family in the manner indicated in the Pension Rules",
      "Paid only to the legal heir certified by a civil court",
      "Paid to the residuary legatee under the applicant's will"
    ],
    a: 1,
    e: "Explanation: Rule 7(2) provides that absent a subsisting nomination, the commuted value falls to the family per the Pension Rules."
  },
  {
    q: "The lump sum payable on commutation of pension is calculated using the formula:",
    o: [
      "Commuted portion of pension × 12 × Commutation factor for age next birthday",
      "Commuted portion of pension × 10 × Commutation factor for age last birthday",
      "Basic pension × Commutation factor for age next birthday",
      "Commuted portion of pension × 12 × Commutation factor for age last birthday"
    ],
    a: 0,
    e: "Explanation: Three elements drive the lump sum: monthly commuted amount, the multiplier 12, and the factor against age next birthday."
  },
  {
    q: "A Government servant retires on 30th September 2023 with a basic pension of ₹33,000 and opts to commute the maximum permissible percentage. His age next birthday is 61 years (commutation factor 8.194). The lump sum payable to him is:",
    o: ["₹2,70,402", "₹12,97,930", "₹13,20,000", "₹2,16,322"],
    a: 1,
    e: "Explanation: 40% × ₹33,000 = ₹13,200. Lump sum = ₹13,200 × 12 × 8.194 = ₹12,97,929.60, rounded up to ₹12,97,930 under Rule 5(3)."
  },
  {
    q: "The commutation factor used in the lump sum formula represents:",
    o: [
      "The number of years for which the commuted portion of pension is given up",
      "The commutation value expressed as number of years' purchase",
      "The discount rate applied to the present value of pension",
      "The percentage of pension that may be commuted"
    ],
    a: 1,
    e: "Explanation: The factor represents the commutation value as number of years' purchase, computed actuarially."
  },
  {
    q: "Match the age next birthday with the corresponding commutation factor and identify the correctly arranged set:\n1. 60 years — 8.287\n2. 61 years — 8.194\n3. 65 years — 7.731\n4. 70 years — 6.897",
    o: ["1, 2 and 3 only", "2, 3 and 4 only", "1, 3 and 4 only", "1, 2, 3 and 4"],
    a: 3,
    e: "Explanation: All four pairings are correct as per the Commutation Factor Table appended to the Rules."
  },
  {
    q: "A Government servant in receipt of provisional pension under Rule 62 of the Pension Rules, 2021 may commute a fraction of such provisional pension subject to the limit specified in:",
    o: ["Rule 4 of the Commutation Rules", "Rule 5 of the Commutation Rules", "Rule 8 of the Commutation Rules", "Rule 12 of the Commutation Rules"],
    a: 1,
    e: "Explanation: Rule 9(1) cross-refers to Rule 5 for the 40% ceiling."
  },
  {
    q: "Where an applicant commutes a percentage of provisional pension that works out to not exceeding ₹6,000 per month and on determination of final pension he becomes entitled to commute up to ₹6,000 per month, then for payment of the difference:",
    o: [
      "He must apply afresh in Form 1",
      "He must apply afresh in Form 2 and undergo medical examination",
      "He shall not be required to undergo medical examination",
      "He must apply through the Chief Administrative Medical Authority"
    ],
    a: 2,
    e: "Explanation: Rule 9(2)(b) waives the medical examination requirement where the differential remains within the ₹6,000 per month threshold."
  },
  {
    q: "If, on determination of final pension, the applicant becomes entitled to commute a sum exceeding ₹6,000 (and exceeding ₹100), he is required to apply afresh in:",
    o: ["Form 1", "Form 1-A", "Form 2", "Form 5"],
    a: 2,
    e: "Explanation: Rule 9(2)(c) requires a fresh application in Form 2 because crossing the ₹6,000 threshold reopens the medical-examination route."
  },
  {
    q: "Under Rule 10, where an applicant has commuted a percentage of his final pension and that pension is later revised and enhanced retrospectively as a result of a Government decision:",
    o: [
      "The applicant must apply afresh for commutation of the differential pension",
      "The applicant shall be paid the difference between the commuted value on enhanced pension and that already authorised, without applying afresh",
      "Only fresh commutation is permitted, with reference to the original commutation factor",
      "No further commutation is allowed once final pension has been commuted"
    ],
    a: 1,
    e: "Explanation: Retrospective enhancement of pension automatically generates an additional commuted-value entitlement, paid without fresh application."
  },
  {
    q: "The commuted amount of pension shall be restored on completion of:",
    o: [
      "10 years from the date of commutation becoming absolute",
      "12 years from the date of payment of commuted value",
      "15 years from the date the reduction of pension becomes operative",
      "20 years from the date of retirement"
    ],
    a: 2,
    e: "Explanation: Rule 10-A fixes restoration at 15 years from the date the reduction becomes operative."
  },
  {
    q: "A pensioner draws his commuted value on 1st July 2010, but the reduction in his pension becomes operative from 1st October 2010. When does restoration of his commuted pension take effect?",
    o: ["1st July 2025", "1st October 2025", "1st July 2020", "1st October 2030"],
    a: 0,
    e: "Explanation: Restoration runs 15 years from the date reduction becomes operative, which is the earlier of receipt or end of three months."
  },
  {
    q: "Consider the following statements about restoration of commuted pension under Rule 10-A:\n1. The full original pension is restored after 15 years.\n2. The 15-year period is reckoned from the date of retirement of the Government servant.\n3. The lump sum already paid is recovered from the pensioner before restoration.",
    o: ["1 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"],
    a: 0,
    e: "Explanation: Only Statement 1 correctly captures Rule 10-A. The 15-year period runs from when reduction of pension becomes operative."
  },
  {
    q: "Which one of the following statements regarding Rule 10 (Retrospective Revision) is correct?",
    o: [
      "The applicant must undergo a fresh medical examination for the differential commuted value",
      "The applicant must apply afresh in Form 2 within one year of revision",
      "The applicant is paid the difference between the commuted value on the enhanced pension and the commuted value already authorised, without fresh application",
      "The applicant is barred from receiving any additional commuted value after the original commutation"
    ],
    a: 2,
    e: "Explanation: Rule 10 dispenses with both the fresh application and the medical examination."
  },
  {
    q: "Which of the following classes of pensioners is NOT eligible to commute pension without medical examination?",
    o: [
      "A pensioner authorised superannuation pension under Rule 33 of the Pension Rules",
      "A pensioner authorised retiring pension under Rule 34 of the Pension Rules",
      "A pensioner authorised invalid pension under Rule 39 of the Pension Rules",
      "A pensioner authorised compensation pension on abolition of permanent post under the Pension Rules"
    ],
    a: 2,
    e: "Explanation: Invalid pensioners (Rule 39) must always be examined by a Medical Board."
  },
  {
    q: "A pensioner who desires commutation without medical examination must ensure that his application in Form 1 is delivered to the Head of Office:",
    o: ["Within six months of the date of retirement", "Within one year of the date of retirement", "Within two years of the date of retirement", "At any time during the lifetime of the pensioner"],
    a: 1,
    e: "Explanation: Rule 13(1)(b) makes the one-year window from retirement the bright line."
  },
  {
    q: "In the case of a pensioner whose pension is finalised consequent to departmental or judicial proceedings, the period of one year for application without medical examination shall reckon from:",
    o: [
      "The date of retirement of the Government servant",
      "The date of the original charge memorandum",
      "The date of issue of orders consequent on finalisation of the proceedings",
      "The date of receipt of pension payment order"
    ],
    a: 2,
    e: "Explanation: Rule 13(1)(c) anchors the one-year clock to the finalisation order."
  },
  {
    q: "A Government servant applies for commutation of pension within one year of retirement, but his application in Form 1 is received by the Head of Office after one year of retirement. He shall:",
    o: [
      "Be eligible to commute pension without medical examination",
      "Be deemed to have applied on the date of dispatch of his application",
      "Not be eligible to commute pension without medical examination",
      "Be required to apply afresh in Form 1-A"
    ],
    a: 2,
    e: "Explanation: Rule 13(2) operates on receipt at the Head of Office, not date of dispatch by the applicant."
  }
];

export const ccs_commutation_set2: RawQuestion[] = [
  {
    q: "A Government servant who is due to retire on superannuation and desires that the commuted value of pension be authorised at the time of issue of the pension payment order shall apply in:",
    o: [
      "Form 1, after the date of retirement",
      "Form 1-A, so as to reach the Head of Office not later than 3 months before the date of superannuation",
      "Form 2, along with pension papers",
      "Form 5, before the date of superannuation"
    ],
    a: 1,
    e: "Explanation: Rule 13(3) creates a pre-retirement track via Form 1-A."
  },
  {
    q: "If a Government servant who has applied in Form 1-A dies before the date of superannuation, the Government's liability for payment of the commuted value is:",
    o: [
      "Discharged in full to the family in terms of nomination",
      "Limited to 50% of the commuted value",
      "Nil — the Government has no liability",
      "Liability vests in the Accounts Officer for resolution"
    ],
    a: 2,
    e: "Explanation: Rule 13(3)(b) makes the position absolute: death before superannuation extinguishes commutation rights."
  },
  {
    q: "Where an application in Form 1 is received by the Head of Office after one year of the date of retirement, the Head of Office shall advise the applicant to:",
    o: [
      "Apply afresh in Form 1-A for medical examination",
      "Apply afresh in Form 2 so that arrangements for medical examination can be made",
      "Apply afresh in Form 5 for nomination",
      "Forgo commutation as no remedy is available"
    ],
    a: 1,
    e: "Explanation: Rule 14 routes late applicants into the with-medical-examination track via Form 2."
  },
  {
    q: "After verifying the information furnished in Form 1, the Accounts Officer shall:",
    o: [
      "Pay the commuted value directly into the applicant's bank account",
      "Issue authority for payment of commuted value of pension to the disbursing authority concerned",
      "Forward Form 1 to the Chief Administrative Medical Authority",
      "Return Form 1 to the applicant for signature"
    ],
    a: 1,
    e: "Explanation: Rule 15(1) confines the Accounts Officer to issuing authority."
  },
  {
    q: "In the case of commutation of provisional pension sanctioned under Rule 62 of the Pension Rules, 2021 in Form 1, the route is:",
    o: [
      "Head of Office → Accounts Officer; the Accounts Officer issues authority for payment to the Head of Office for disbursement",
      "Head of Office → Chief Administrative Medical Authority → Accounts Officer",
      "Applicant → Accounts Officer directly, bypassing the Head of Office",
      "Accounts Officer → applicant directly through ECS, without involving the Head of Office"
    ],
    a: 0,
    e: "Explanation: Rule 16 places the Head of Office at the centre of provisional-pension commutation."
  },
  {
    q: "Consider the following statements about commutation without medical examination:\n1. A retiring pensioner under Rule 34 of the Pension Rules is eligible to commute without medical examination if Form 1 is delivered within one year of retirement.\n2. The cut-off for receipt of Form 1-A in pre-retirement cases is three months before the date of superannuation.\n3. A pensioner authorised compassionate allowance under Rule 41 of the Pension Rules is eligible to commute without medical examination.",
    o: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    a: 0,
    e: "Explanation: Statements 1 and 2 are correct; compassionate allowance recipients need medical examination under Rule 18(c)."
  },
  {
    q: "A Government servant retiring on 30.06.2026 wishes to receive his commuted value on 01.07.2026 itself. He must submit Form 1-A to the Head of Office not later than:",
    o: ["31.12.2025", "31.03.2026", "30.04.2026", "31.05.2026"],
    a: 1,
    e: "Explanation: Rule 13(3)(a) requires Form 1-A to reach the Head of Office at least three months before superannuation."
  },
  {
    q: "Which of the following pensioners is required to commute pension only after medical examination?",
    o: [
      "A pensioner authorised superannuation pension under Rule 33 who applied in Form 1 within one year",
      "A pensioner authorised retiring pension under Rule 34 who applied in Form 1-A before retirement",
      "A pensioner who retires on invalid pension under Rule 39 of the Pension Rules",
      "A pensioner authorised compensation pension on abolition of permanent post who applied within one year"
    ],
    a: 2,
    e: "Explanation: Rule 18(a) places invalid pensioners squarely on the medical-examination track."
  },
  {
    q: "The medical authority for an applicant applying for commutation of invalid pension shall be:",
    o: ["A Medical Officer not lower in status than a Civil Surgeon or District Medical Officer", "A Medical Board", "The Chief Administrative Medical Authority himself", "The Director General of Health Services"],
    a: 1,
    e: "Explanation: Rule 22(1) elevates the scrutiny for invalid pensioners by requiring a Medical Board."
  },
  {
    q: "An applicant who has not submitted his application for commutation to the Head of Office within one year of his retirement shall:",
    o: [
      "Lose his right to commutation forever",
      "Be eligible to commute his pension only after medical examination, subject to the limit specified in Rule 5",
      "Be eligible to commute his pension on the original without-medical-examination terms",
      "Be required to apply through a court of law"
    ],
    a: 1,
    e: "Explanation: Rule 18(d) preserves the substantive right to commute even after one year, but conditions it on medical fitness."
  },
  {
    q: "Arrange the following procedural steps in the correct sequence in a commutation case requiring medical examination:\n1. Head of Office addresses Form 3 to the Chief Administrative Medical Authority\n2. Applicant submits Form 2 to the Head of Office\n3. Accounts Officer completes Part IV of Form 2 and transmits it back\n4. Head of Office forwards Form 2 to the Accounts Officer",
    o: ["2 → 4 → 3 → 1", "2 → 1 → 4 → 3", "4 → 2 → 1 → 3", "1 → 2 → 4 → 3"],
    a: 0,
    e: "Explanation: Rule 19 and Rule 20 lay down the sequence."
  },
  {
    q: "A copy of the letter in Form 3 addressed to the Chief Administrative Medical Authority is endorsed to:",
    o: [
      "The applicant only",
      "The applicant and the Accounts Officer",
      "The applicant and the Medical Board",
      "The disbursing authority and the Pension Sanctioning Authority"
    ],
    a: 1,
    e: "Explanation: Rule 20(4) requires endorsement to both the applicant and the Accounts Officer."
  },
  {
    q: "The Chief Administrative Medical Authority shall ensure that the medical examination of the applicant is held, as far as possible:",
    o: [
      "Within 30 days of receipt of documents",
      "Before the date of the applicant's next birthday",
      "Within 90 days of receipt of documents",
      "On any date convenient to the applicant within six months"
    ],
    a: 1,
    e: "Explanation: Rule 21(3) ties timing to the next birthday because the commutation factor is fixed against age next birthday."
  },
  {
    q: "If the applicant fails to appear before the medical authority on the date and time communicated to him without reasonable ground:",
    o: [
      "The application shall be deemed to have been rejected and a fresh application is barred for one year",
      "The medical authority shall report the fact to the Head of Office and return the documents; the application shall be treated as having been withdrawn",
      "The medical authority shall fix a fresh date suo motu",
      "The applicant shall be liable for the entire fee for medical examination as a penalty"
    ],
    a: 1,
    e: "Explanation: Rule 24 treats a no-show without reasonable ground as a constructive withdrawal."
  },
  {
    q: "The fee for medical examination for commutation of pension shall be borne by:",
    o: ["The Accounts Officer", "The Head of Office", "The applicant himself", "The Government, as part of post-retirement benefits"],
    a: 2,
    e: "Explanation: Rule 23 places the cost on the applicant."
  },
  {
    q: "The medical authority for commutation cases under Chapter III, other than invalid pension cases, shall be a Medical Officer not lower in status than that of:",
    o: [
      "A Medical Officer in charge of a CGHS dispensary",
      "A Civil Surgeon or a District Medical Officer",
      "A Director of Health Services",
      "The Chief Administrative Medical Authority of the State"
    ],
    a: 1,
    e: "Explanation: Rule 22(2) sets the bar at Civil Surgeon / District Medical Officer level."
  },
  {
    q: "A Government servant retires on superannuation on 30.04.2026. He submits Form 1 on 25.04.2027. The Form is, however, received by the Head of Office on 05.05.2027. Which of the following is correct?",
    o: [
      "He may commute pension without medical examination since he applied within one year",
      "He must apply afresh in Form 2 and undergo medical examination, since Form 1 was received after one year",
      "He must apply afresh in Form 1-A",
      "The application is barred altogether and no commutation is possible"
    ],
    a: 1,
    e: "Explanation: Rule 13(2) read with Rule 14 turns on date of receipt at the Head of Office."
  },
  {
    q: "Consider the following statements about the medical examination procedure for commutation:\n1. The applicant must pay for his own medical examination.\n2. The medical examination should, as far as possible, be held before the applicant's next birthday.\n3. For invalid pensioners, the medical authority is a single Medical Officer.",
    o: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    a: 0,
    e: "Explanation: Statements 1 and 2 are correct. For invalid pensioners, the medical authority is a Medical Board."
  },
  {
    q: "Under Rule 26, a second medical examination shall take place after the expiry of a period of:",
    o: ["Not less than three months from the first medical examination", "Not less than six months from the first medical examination", "Not less than one year from the first medical examination", "Not less than two years from the first medical examination"],
    a: 2,
    e: "Explanation: Rule 26(1) imposes a one-year cooling period."
  },
  {
    q: "If an applicant desires to be re-examined after the one-year period under Rule 26, the second examination shall be:",
    o: [
      "By the same medical authority, free of cost",
      "By the Chief Administrative Medical Authority himself",
      "By a Medical Board, at the applicant's own expense",
      "By a Medical Board, at Government expense"
    ],
    a: 2,
    e: "Explanation: Rule 26(2) elevates the second examination to a Medical Board at the applicant's expense."
  },
  {
    q: "An applicant who wishes to challenge the findings of the medical authority must prefer an appeal addressed to the Head of Office within:",
    o: [
      "One week of receipt of the certified copy",
      "14 days of receipt of the certified copy",
      "One month of receipt of the certified copy",
      "Three months of receipt of the certified copy"
    ],
    a: 2,
    e: "Explanation: Rule 27 fixes a one-month appeal window from receipt of the certified copy."
  },
  {
    q: "An applicant may withdraw his application for commutation:",
    o: [
      "At any time, including after appearing before the medical authority",
      "Only before the issue of authority by the Accounts Officer",
      "At any time before subjecting himself to medical examination, but in no case after he has appeared before such authority",
      "Only with the prior written approval of the Pension Sanctioning Authority"
    ],
    a: 2,
    e: "Explanation: Rule 28(1) cuts off right of withdrawal at point of appearing before medical authority."
  },
  {
    q: "Where the medical authority directs that the applicant's age shall be assumed to be greater than his actual age, the applicant may withdraw his application within:",
    o: [
      "7 days from the date of receipt of information from the Accounts Officer",
      "14 days from the date of receipt of information from the Accounts Officer",
      "One month from the date of the medical certificate",
      "14 days from the date of the medical certificate"
    ],
    a: 1,
    e: "Explanation: Rule 28(2) creates a 14-day window from receipt of information from the Accounts Officer."
  },
  {
    q: "On receipt of documents from the medical authority, the Accounts Officer is required to:",
    o: [
      "Forward the documents to the Pension Sanctioning Authority for confirmation",
      "Without delay, issue an order of commutation of pension for payment with the residual amount of pension to the disbursing authority concerned",
      "Refer the case back to the Head of Office for revalidation",
      "Wait for the next financial year to authorise payment"
    ],
    a: 1,
    e: "Explanation: Rule 30 is built around a 'without delay' obligation on the Accounts Officer."
  },
  {
    q: "A Government servant has been paid the commuted value of a percentage of his provisional pension. On final assessment of the pension, the Accounts Officer shall:",
    o: [
      "Recover the entire commuted value paid earlier and re-issue afresh",
      "Pay the difference between the commuted value so determined and the commuted value already paid",
      "Authorise no further payment, since the matter has already been concluded",
      "Forward the case for medical re-examination"
    ],
    a: 1,
    e: "Explanation: Rule 31 closes the loop opened by Rule 9 by paying the difference."
  },
  {
    q: "Consider the following statements about Rules 26 to 28:\n1. A second medical examination on request, after one year from the first, must be conducted by a Medical Board.\n2. The cost of the second medical examination is borne by the Government.\n3. An appeal against the findings of the medical authority must be filed within one month of receipt of the certified copy.",
    o: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    a: 1,
    e: "Explanation: Statements 1 and 3 are correct. Statement 2 is wrong since the applicant pays."
  },
  {
    q: "An applicant in a medical-examination case appeared on 10.03.2026. The recomputed value from the Accounts Officer reaches him on 05.04.2026. By when must he give written notice of withdrawal under Rule 28(2)?",
    o: ["09.04.2026", "19.04.2026", "25.04.2026", "05.05.2026"],
    a: 1,
    e: "Explanation: 14 days from 05.04.2026 falls on 19.04.2026."
  },
  {
    q: "As per the Commutation Factor Table appended to the Rules, the commutation factor for a Government servant whose age next birthday is 60 years is:",
    o: ["8.371", "8.287", "8.194", "8.093"],
    a: 1,
    e: "Explanation: The table fixes 8.287 against age next birthday 60."
  },
  {
    q: "Which of the following correctly states the commutation factor at age next birthday 61 — the typical case of a Government servant retiring on superannuation at 60?",
    o: ["8.287", "8.194", "8.093", "7.982"],
    a: 1,
    e: "Explanation: A Government servant retiring at 60 has age next birthday = 61, attracting the factor 8.194."
  },
  {
    q: "As age next birthday increases, the commutation factor:",
    o: ["Increases proportionately", "Decreases", "Remains constant", "First increases and then decreases"],
    a: 1,
    e: "Explanation: The factor reflects the actuarial number of years' purchase — the older the applicant, the smaller the factor."
  },
  {
    q: "Consider the following pairs from the Commutation Factor Table:\n1. Age next birthday 50 — 8.846\n2. Age next birthday 65 — 7.731\n3. Age next birthday 70 — 6.897\n4. Age next birthday 80 — 4.812",
    o: ["1 and 2 only", "1, 2 and 3 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    a: 3,
    e: "Explanation: All four pairings are correct."
  },
  {
    q: "A Government servant retires on voluntary basis at age 49. His age next birthday is 50. He wishes to commute 40% of his pension of ₹40,000. The lump sum payable to him, at the applicable commutation factor of 8.846, is:",
    o: ["₹14,15,360", "₹16,98,432", "₹3,53,840", "₹17,69,200"],
    a: 1,
    e: "Explanation: ₹16,000 × 12 × 8.846 = ₹16,98,432."
  },
  {
    q: "A pensioner retires at the end of the month in which he attains age 60. For the purpose of computing the lump sum on commutation, his commutation factor will be drawn against:",
    o: ["Age 60 (age last birthday)", "Age 61 (age next birthday)", "The mean of ages 60 and 61", "Age 60 reduced by 0.5 actuarially"],
    a: 1,
    e: "Explanation: Rule 8 read with the table mandates use of age next birthday."
  },
  {
    q: "Two Government servants A and B retire on the same date with identical basic pensions of ₹50,000 each. A's age next birthday is 61 (factor 8.194); B's age next birthday is 65 (factor 7.731). Both commute the maximum permissible 40%. The difference in lump sum payable to A over B is approximately:",
    o: ["₹1,11,120", "₹2,77,800", "₹4,44,480", "₹5,55,600"],
    a: 0,
    e: "Explanation: A = ₹20,000 × 12 × 8.194 = ₹19,66,560; B = ₹20,000 × 12 × 7.731 = ₹18,55,440. Difference = ₹1,11,120."
  }
];
