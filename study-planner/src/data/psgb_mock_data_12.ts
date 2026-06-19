import { Question } from "./live_mock_data";

export const PSGB_MOCK_12_QUESTIONS: Question[] = [
    {
        "id": "psgb-12-1",
        "text": "Which of the following statements regarding the definition of 'cash' under Rule 100 of FHB Vol-I is/are correct?\n1. It includes legal-tender coins, currency notes, and cheques payable on demand.\n2. It includes Government Securities and Bank deposit receipts accepted as security deposit.\n3. It excludes postage stamps, stationery, and reply coupons.",
        "options": [
            "1 only",
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Under Rule 100, FHB Vol-I, 'cash' includes legal tender and demand cheques and explicitly EXCLUDES Government Securities, Bank deposit receipts, and stamps (treated as inventory). Statements 1 and 3 are correct; statement 2 is wrong because securities/deposit receipts are specifically outside the definition."
    },
    {
        "id": "psgb-12-2",
        "text": "According to Rules 24 and 27 of FHB Vol-I, what is the time-bar limit for preferring a general arrear claim without requiring authority from the Circle Accounts Officer?",
        "options": [
            "6 months",
            "1 year",
            "3 years",
            "2 years"
        ],
        "correctAnswer": 3,
        "explanation": "Under Rules 24 and 27, FHB Vol-I, a general arrear claim not preferred within 2 years of becoming due requires the authority of the Circle Accounts Officer for investigation before payment."
    },
    {
        "id": "psgb-12-3",
        "text": "A Government servant in receipt of pay dies in harness. The Head of Office proposes to make an anticipatory payment of the dues to the legal heirs WITHOUT obtaining the usual legal authority (succession certificate). The gross claim works out to Rs. 6,40,000. Under Rule 189 of FHB Vol-I, which course of action is correct?",
        "options": [
            "The Head of Office may pay the full Rs. 6,40,000 on a simple receipt.",
            "The Head of Office may pay up to Rs. 5,00,000 on a receipt; the balance requires a duly stamped Indemnity Bond in Form T.R. 14 with sureties.",
            "The entire amount requires a stamped Indemnity Bond in Form T.R. 14, since the gross claim exceeds Rs. 5,00,000.",
            "No payment is permissible without a succession certificate, regardless of amount."
        ],
        "correctAnswer": 2,
        "explanation": "Under Rule 189, FHB Vol-I, anticipatory payment WITHOUT legal authority is permitted up to Rs. 5,00,000. Where the GROSS claim exceeds Rs. 5,00,000, the payment of the whole amount is regulated by obtaining a duly stamped Indemnity Bond in Form T.R. 14 with sureties — the limit is not a \"first slice free\" device but a threshold that pulls the entire claim into the indemnity-bond procedure. Hence C, not B."
    },
    {
        "id": "psgb-12-4",
        "text": "Under Rule 48 of FHB Vol-I, a receipt acknowledging a sum is required to be stamped under the Indian Stamp Act, 1899 only if the sum EXCEEDS a prescribed amount. Identify that amount.",
        "options": [
            "Rs. 500",
            "Rs. 5,000",
            "Rs. 1,000",
            "Rs. 10,000"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 48, FHB Vol-I requires receipts for sums exceeding Rs. 5,000 to bear a one-rupee revenue stamp under the Indian Stamp Act, 1899 (Article 53, Schedule I). The Rs. 5,000 threshold is the statutory line under the Stamp Act."
    },
    {
        "id": "psgb-12-5",
        "text": "Which of the following statements regarding the correction of errors in a Cash Book (Rule 115) is/are NOT correct?\n1. Erasures and overwriting are permitted if attested by the Disbursing Officer.\n2. Pre-closure corrections are made by striking out the wrong entry and inserting the correct one in red ink.\n3. Post-closure corrections require the sanction of the authority to whom accounts are submitted.",
        "options": [
            "1 only",
            "1 and 2 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Under Rules 115 and 63, FHB Vol-I, erasures and overwriting in the Cash Book are ABSOLUTELY FORBIDDEN — no attestation can validate them; corrections are by neat cancellation in red ink with attestation. So statement 1 is the only incorrect one; statements 2 and 3 correctly state the procedure."
    },
    {
        "id": "psgb-12-6",
        "text": "A temporary misappropriation of Rs. 1,85,000 is detected in a sub office. The Divisional Head wishes to entrust the fact-finding investigation to an Inspector of Posts. Up to what principal amount is an IP/ASP authorised to investigate loss/fraud cases, and does this case qualify?",
        "options": [
            "Up to Rs. 1 Lakh — case does NOT qualify",
            "Up to Rs. 5 Lakhs — case qualifies",
            "Up to Rs. 10 Lakhs — case qualifies",
            "Up to Rs. 2 Lakhs — case qualifies"
        ],
        "correctAnswer": 3,
        "explanation": "As per the consolidated DoP guidelines (OM dated 23.09.2021), IPs/ASPs may investigate loss or fraud (including temporary misappropriation) up to a principal amount of Rs. 2 Lakhs. Rs. 1,85,000 is below the ceiling, so the case qualifies for IP/ASP investigation."
    },
    {
        "id": "psgb-12-7",
        "text": "Consider the following statements about TDS under Section 194-C for payments to contractors (FY 2025-26):\n1. The rate is 1% for Individual/HUF and 2% for any other person.\n2. TDS is attracted if a single payment exceeds Rs. 30,000 OR the aggregate in a financial year exceeds Rs. 1,00,000.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "Section 194-C mandates 1% TDS for Individuals/HUFs and 2% for others, triggered when a single payment exceeds Rs. 30,000 OR the aggregate to one contractor exceeds Rs. 1,00,000 in the FY. Both thresholds are current for FY 2025-26 (AY 2026-27)."
    },
    {
        "id": "psgb-12-8",
        "text": "The Department of Posts records its Capital Outlay on Postal Services OUTSIDE the Revenue Account. Three of the four heads below are revenue or other heads; identify the correct CAPITAL major head.",
        "options": [
            "3201 (Postal Services — Revenue)",
            "7201 (Loans for Postal Services)",
            "5201 (Capital Outlay on Postal Services)",
            "8553 (Postal Deposits)"
        ],
        "correctAnswer": 2,
        "explanation": "As a commercial department, DoP records plant and equipment under Major Head 5201 — Capital Outlay on Postal Services — and pays notional interest on this capital. Note the near-miss distractors: 3201 is the revenue head, 7201 is the loan head, 8553 is a deposit head."
    },
    {
        "id": "psgb-12-9",
        "text": "A cheque is drawn by a cheque-drawing DDO and dated 14 January 2026. Under Rule 156 of FHB Vol-I, up to which date is it payable, and on what principle?",
        "options": [
            "Up to 13 April 2026 — three months from the exact date of issue",
            "Up to 30 April 2026 — three months after the month of issue",
            "Up to 14 July 2026 — six months after the month of issue",
            "Up to 14 February 2026 — one month from the date of issue"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 156 (mirroring the Central Government Account (Receipts and Payments) Rules) provides that a Government cheque is payable within three months AFTER the month of issue. A cheque dated any day in January is therefore valid up to 30 April. The \"after the month of issue\" rule differs from the ordinary RBI 3-months-from-date rule. Rules, Rule on currency of cheques; FHB Vol-V Sec. V.)"
    },
    {
        "id": "psgb-12-10",
        "text": "A Government servant's monthly emoluments, after deducting exempt allowances, come to Rs. 42,000. A Civil Court attaches the salary under a decree OTHER than maintenance (Rule 175, based on CPC Section 60). Compute the maximum amount attachable in a month.",
        "options": [
            "Rs. 13,667",
            "Rs. 14,000",
            "Rs. 41,000",
            "Rs. 21,000"
        ],
        "correctAnswer": 0,
        "explanation": "Under CPC Section 60(1)(i)/Rule 175, for a non-maintenance decree the first Rs. 1,000 plus two-thirds of the remainder is EXEMPT; only one-third of the remainder is attachable. Remainder = 42,000 − 1,000 = 41,000; attachable = 41,000 ÷ 3 = Rs. 13,666.67 ≈ Rs. 13,667. The near-miss distractors: Rs. 14,000 wrongly takes one-third of the whole emoluments; Rs. 41,000 treats almost the entire salary as attachable; Rs. 21,000 wrongly attaches one-half of the remainder.(i).)"
    },
    {
        "id": "psgb-12-11",
        "text": "Under Rule 52 of FHB Vol-I, petty losses of Government property need NOT be reported to the Audit/Accounting Authority if each loss does not exceed a prescribed ceiling. Identify the ceiling.",
        "options": [
            "Rs. 10,000",
            "Rs. 2,000",
            "Rs. 5,000",
            "Rs. 50,000"
        ],
        "correctAnswer": 0,
        "explanation": "Rule 52, FHB Vol-I exempts petty cases: losses not exceeding Rs. 10,000 each need not be reported to the Audit or Accounting Authority."
    },
    {
        "id": "psgb-12-12",
        "text": "Consider the following statements regarding the Personal Computer Advance (GAR-27):\n1. The maximum limit is Rs. 50,000 or the actual price, whichever is lower.\n2. It can be drawn a maximum of five times in an entire service career.\n3. The minimum gap between two advances is 3 years.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "The PC advance rules stipulate a maximum of Rs. 50,000 (or actual price, whichever is lower), a career limit of five occasions, and a minimum gap of 3 years between successive advances. All three are correct."
    },
    {
        "id": "psgb-12-13",
        "text": "A Government servant's claim for Travelling Allowance becomes due on 1 March 2026 but is not preferred. Under Rule 25, the right to TA is forfeited if the claim is not preferred within a fixed period. By which date must the claim be submitted to avoid forfeiture?",
        "options": [
            "By 31 March 2026 (30 days)",
            "By 30 April 2026 (60 days)",
            "By 30 May 2026 (90 days)",
            "By 28 August 2026 (180 days)"
        ],
        "correctAnswer": 1,
        "explanation": "Under Rule 25, the right to Travelling Allowance (including DA on tour) is forfeited if the claim is not preferred within 60 days of becoming due. 1 March + 60 days ≈ 30 April 2026."
    },
    {
        "id": "psgb-12-14",
        "text": "In the three-part structure of the Audit Inspection Report (Rule 95), which part contains the important irregularities (recoveries, breaches of principle, losses) that are likely to mature into draft paras for the Audit Report?",
        "options": [
            "Part-I",
            "Part-II Section-A",
            "Part-II Section-B",
            "Part-III"
        ],
        "correctAnswer": 1,
        "explanation": "Under Rule 95, Part-II Section-A carries the important irregularities likely to become draft paragraphs for the Audit Report; Part-I covers outstanding paras of earlier reports, Part-II Section-B carries minor irregularities, and Part-III is the test-audit/schedule of persistent irregularities."
    },
    {
        "id": "psgb-12-15",
        "text": "Which of the following statements regarding the verification of the Service Book is/are NOT correct?\n1. All service must be verified after 18 years of appointment or 5 years before retirement, whichever is earlier.\n2. The descriptive particulars on the first page must be re-attested every 10 years.\n3. The Head of Office must inspect and initial at least 10% of the total Service Books annually.",
        "options": [
            "1 only",
            "2 only",
            "1 and 3 only",
            "2 and 3 only"
        ],
        "correctAnswer": 1,
        "explanation": "Statement 2 is the incorrect one: Rule 210 requires the descriptive particulars on the first page to be re-attested every 5 YEARS, not 10. Statements 1 and 3 correctly state the verification regime."
    },
    {
        "id": "psgb-12-16",
        "text": "An official can state only his approximate age (in completed years) at the time of appointment. Under Rule 208, how is his date of birth fixed?",
        "options": [
            "1st July of the derived year",
            "16th of the month of appointment",
            "31st December of the derived year",
            "The corresponding date arrived at by deducting his age in years from the date of appointment"
        ],
        "correctAnswer": 3,
        "explanation": "Under Rule 208, FHB Vol-I, where only approximate age is known, the DOB is fixed by deducting the stated age (in years) from the date of appointment. The \"1st July\" convention applies to a different situation (year of birth known but not the date)."
    },
    {
        "id": "psgb-12-17",
        "text": "Consider the following statements regarding the attachment of a Government servant's pay for court decrees under Rules 174 and 175 of FHB Vol-I:\n1. For a maintenance decree, after removing fully exempt allowances, the first Rs. 1,000 is exempted before calculating the attachable one-third.\n2. Allowances such as House Rent Allowance (HRA) and Dearness Allowance (DA) are fully exempt from attachment for both maintenance and non-maintenance decrees.\n3. For non-maintenance decrees, the maximum attachable amount is calculated by subtracting exempt allowances, then subtracting Rs. 1,000, and taking one-third of the remainder.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Statement 1 is incorrect because the Rs. 1,000 \"first-slab\" exemption does not apply to maintenance decrees; only the flat one-third exemption of Basic Pay operates. Statements 2 and 3 correctly describe the exemptions and the specific formula for non-maintenance decrees."
    },
    {
        "id": "psgb-12-18",
        "text": "A general sanction for expenditure (not involving budget provision or GPF) is accorded but not acted upon. Under Rule 324, after what period does it lapse?",
        "options": [
            "3 months",
            "6 months",
            "2 years",
            "1 year"
        ],
        "correctAnswer": 3,
        "explanation": "Rule 324, FHB Vol-I: a general sanction not acted upon for ONE YEAR lapses. Contrast the near-miss alternatives: GPF-advance sanctions lapse in 3 months and budget-linked sanctions lapse at the close of the financial year — but the GENERAL sanction here lapses in one year."
    },
    {
        "id": "psgb-12-19",
        "text": "A 30-year-old resident gets her biometrics updated at a Post Office Aadhaar centre. Under the UIDAI rates effective 1 October 2025, what is the charge, and how does it compare with a demographic update?",
        "options": [
            "Free; demographic update Rs. 50",
            "Rs. 75; demographic update Rs. 50",
            "Rs. 125; demographic update Rs. 75",
            "Rs. 150; demographic update Rs. 90"
        ],
        "correctAnswer": 2,
        "explanation": "Under the UIDAI Office Memorandum dated 19.09.2025 (effective 01.10.2025 to 30.09.2028), an adult biometric update is Rs. 125 and a demographic update is Rs. 75; new enrolment remains free. The Rs. 150/Rs. 90 option is the NEXT cycle's rate, scheduled from 01.10.2028."
    },
    {
        "id": "psgb-12-20",
        "text": "Consider the following statements about the \"Rounding Off\" rules (Rule 47):\n1. Fractions of 50 paise and above are rounded up to the next rupee.\n2. For TA bills, rounding off is done on each individual item before totalling.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 0,
        "explanation": "Statement 1 is correct. Statement 2 is a trap: under Rule 47, for TA bills rounding is done only at the LAST stage (the final figure), never item-by-item, to avoid cumulative rounding gain."
    },
    {
        "id": "psgb-12-21",
        "text": "According to Rule 2 of FHB Vol-II, who is designated as the Head of the Department for the Department of Posts?",
        "options": [
            "The Secretary, Department of Posts",
            "The Director-General, Department of Posts",
            "The Chief Postmaster General",
            "The Member (Finance), Postal Services Board"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 2(10), FHB Vol-II: the President has declared the Director-General, Department of Posts, to be the Head of the Department under SR 2(10)..)"
    },
    {
        "id": "psgb-12-22",
        "text": "In the 15-digit Head of Account classification of the Department of Posts, the segments are Major, Sub-Major, Minor, Sub-Head, Detailed Head, and Object Head. How many digits represent the MINOR head?",
        "options": [
            "3 digits",
            "2 digits",
            "4 digits",
            "6 digits"
        ],
        "correctAnswer": 0,
        "explanation": "In the 15-digit structure (Major 4 + Sub-Major 2 + Minor 3 + Sub-Head 2 + Detailed 2 + Object 2), the Minor head is 3 digits."
    },
    {
        "id": "psgb-12-23",
        "text": "Which authority is responsible for the scrutiny, review, monitoring, and reconciliation of e-accounts rendered by DDOs/NCDDOs?",
        "options": [
            "Head of Postal Accounts Office",
            "Circle Office",
            "General Post Office",
            "Postal Directorate"
        ],
        "correctAnswer": 0,
        "explanation": "Rule 2(3), FHB Vol-II defines the Head of Postal Accounts Office — subordinate to the Head of Circle — as responsible for scrutiny, monitoring, and reconciliation of e-accounts submitted by DDOs/NCDDOs..)"
    },
    {
        "id": "psgb-12-24",
        "text": "Consider the following statements regarding the Head Office Classified Cash Book (ACG-4):\n1. It records transactions of the head office including its subordinate offices.\n2. Its balance is shown in the Postmaster's Balance Sheet.\n3. It reflects ONLY offline transactions of the GPO.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Rule 46, FHB Vol-II: ACG-4 records head office and subordinate office transactions and its balance composes the Postmaster's Balance Sheet. Statement 3 is wrong — it captures both offline and incorporated online transactions."
    },
    {
        "id": "psgb-12-25",
        "text": "The Head Office classified Cash Account for the previous month must reach the Postal Accounts Office by a fixed date each month. Identify it.",
        "options": [
            "1st of each month",
            "10th of each month",
            "15th of each month",
            "5th of each month"
        ],
        "correctAnswer": 3,
        "explanation": "Rule 49, FHB Vol-II: the Head Office classified Cash Account for the previous month is submitted by the 5th of each month to the Postal Accounts Office."
    },
    {
        "id": "psgb-12-26",
        "text": "Under Rule 25 of FHB Vol-II, in an office where multiple treasurers exist, which of the following is NOT inherently a joint custodian of the physical cash in the reserve safe?",
        "options": [
            "The Postmaster",
            "The Treasurer",
            "The Assistant Postmaster (Accounts)",
            "The official holding the second key as joint custodian with the Treasurer"
        ],
        "correctAnswer": 2,
        "explanation": "Rule 25(a), FHB Vol-II: the treasurer is jointly responsible with the postmaster for safe custody of cash in the reserve safe. The APM (Accounts) is not, by virtue of office, the joint custodian of the physical cash safe..)"
    },
    {
        "id": "psgb-12-27",
        "text": "A Railway Mail Service Van travels 800 km, falling in the 501–1000 km distance slab. Under Rule 171 (rates for 2023-24), the haulage charge is levied per berth per km, subject to a per-km-per-berth minimum. Identify the per-berth-per-km rate for this slab.",
        "options": [
            "Rs. 0.73 per berth per km",
            "Rs. 1.15 per berth per km",
            "Rs. 0.61 per berth per km",
            "Rs. 1.50 per berth per km"
        ],
        "correctAnswer": 0,
        "explanation": "For the 501–1000 km slab, the haulage charge is Rs. 0.73 per berth per km (subject to a minimum) as per Rule 171 for 2023-24. NOTE: RMS haulage rates are revised periodically; confirm the rate for the current year against the live order before publishing."
    },
    {
        "id": "psgb-12-28",
        "text": "In Railway Mail Service Vans, a \"Half Van\" (S.H.) accommodates how many berths?",
        "options": [
            "72 berths",
            "36 berths",
            "54 berths",
            "18 berths"
        ],
        "correctAnswer": 1,
        "explanation": "Per the RMS Vans accommodation table, an S.H. (Half Van) accommodates 36 berths, occupying more than 1/4 and up to 1/2 of the coach."
    },
    {
        "id": "psgb-12-29",
        "text": "Consider the following statements regarding the supply of stamps from a Postal Stores Depot (PSD) under Rule 6:\n1. The Postmaster must verify the received articles and return one copy of the invoice to the PSD within 7 days.\n2. The face value of articles received must be entered in the Stock register.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 1,
        "explanation": "Statement 1 is wrong — the invoice copy must be returned within 3 days of receipt of supply, not 7. Statement 2 is correct: face value of articles received is entered in the Stock register."
    },
    {
        "id": "psgb-12-30",
        "text": "A firm wishes to avail the Book Now Pay Later (BNPL) facility. Under Rule 22, it qualifies as a \"bulk customer\" only if its speed post / business post business at a booking office is at least a prescribed monthly value. Identify it.",
        "options": [
            "Rs. 5,000 per month",
            "Rs. 50,000 per month",
            "Rs. 10,000 per month",
            "Rs. 1,00,000 per month"
        ],
        "correctAnswer": 2,
        "explanation": "Rule 22, FHB Vol-II defines a BNPL bulk customer as one providing at least Rs. 10,000 worth of speed post, business post, or a combination in a calendar month at a booking office."
    },
    {
        "id": "psgb-12-31",
        "text": "A BNPL bulk customer fails to pay the bill by the due date. Under Rule 22, what penal interest is imposed and from which date?",
        "options": [
            "10% per annum from the due date",
            "12% per annum from the bill date",
            "15% per annum from the bill date",
            "18% per annum from the due date"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 22, FHB Vol-II: on default, a penalty at 12% per annum on the bill amount is charged from the BILL date (not merely the due date)."
    },
    {
        "id": "psgb-12-32",
        "text": "Under the GST provisions referenced in FHB Vol-II, what is the late fee for not filing a GST return on time?",
        "options": [
            "Rs. 100 per day each for CGST and SGST (total Rs. 200/day, max Rs. 5,000)",
            "Rs. 50 per day (max Rs. 2,500)",
            "Rs. 500 per day (max Rs. 10,000)",
            "1% of the tax due per day"
        ],
        "correctAnswer": 0,
        "explanation": "Rule 103 (as referenced): the late fee is Rs. 100 each under CGST and SGST (total Rs. 200 per day), capped at Rs. 5,000, with interest at 18% p.a. on the tax also payable. NOTE: CGST late-fee structures have been amended several times by notification; confirm the current cap before use."
    },
    {
        "id": "psgb-12-33",
        "text": "Which of the following is NOT categorised as a \"Non-Cheque Drawing and Disbursing Officer\" (NCDDO)?",
        "options": [
            "Regional Office (RO)",
            "Head Post Office (HPO)",
            "Postal Training Centre (PTC)",
            "Head Record Office (HRO) in RMS"
        ],
        "correctAnswer": 1,
        "explanation": "Rules 2(2) and 168, FHB Vol-II list NCDDOs (no cheque-drawing power) such as RO, CO, PLI Dte, HRO, PTC. A Head Post Office is a primary DDO and generally possesses drawing powers, so it is NOT an NCDDO. & 168.)"
    },
    {
        "id": "psgb-12-34",
        "text": "Consider the following statements regarding the payment of arrears of pension of a deceased pensioner (Rule 154):\n1. Pension can be drawn for the full day of the pensioner's death, regardless of the hour of death.\n2. If the gross arrears exceed Rs. 50,000 but not Rs. 2,50,000, payment requires an Indemnity Bond (TR-14).\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "Rule 154, FHB Vol-II: pension is drawn for the day of death regardless of the hour; and arrears above Rs. 50,000 up to Rs. 2,50,000 require an Indemnity Bond (TR-14) under HoD orders. Both correct."
    },
    {
        "id": "psgb-12-35",
        "text": "A counter clerk returns spoilt but unused postal STATIONERY (e.g., embossed envelopes) for refund, and separately a customer returns spoilt postage STAMPS. Under Rule 105, what reductions apply, respectively?",
        "options": [
            "6.25% on stationery; 20% on stamps",
            "20% on stationery; 6.25% on stamps",
            "10% on both",
            "5% on stationery; 10% on stamps"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 105, FHB Vol-II: refund of unused but spoilt postal stationery suffers a 20% reduction, whereas spoilt postage stamps suffer a 6.25% reduction. Matching the two rates to the two articles is the discrimination being tested."
    },
    {
        "id": "psgb-12-36",
        "text": "For how long must the schedules of pension payments be preserved by a Head Post Office?",
        "options": [
            "3 years",
            "5 years",
            "Permanently",
            "10 years"
        ],
        "correctAnswer": 3,
        "explanation": "Rule 159, FHB Vol-II: schedules of pension payments made by Head Post Offices are preserved for ten years."
    },
    {
        "id": "psgb-12-37",
        "text": "Which form is used to maintain the Cash Abstract at Head Record and Sub Record Offices of the RMS?",
        "options": [
            "ACG-2",
            "ACG-33",
            "ACG-4",
            "ACG-40"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 61, FHB Vol-II: a Cash Abstract in Form ACG-33 is kept by each Head Record and Sub Record office to record the office's own money transactions."
    },
    {
        "id": "psgb-12-38",
        "text": "Under the GST-TDS provisions (Rule 92, read with the CGST Act), TDS on GST is deducted where the value of a supply under a contract exceeds Rs. 2.5 Lakhs. At what rate?",
        "options": [
            "1% (0.5% CGST + 0.5% SGST)",
            "2% (1% CGST + 1% SGST)",
            "5% (2.5% CGST + 2.5% SGST)",
            "18% flat"
        ],
        "correctAnswer": 1,
        "explanation": "Under Section 51 of the CGST Act (referenced as Rule 92), a notified deductor must deduct GST-TDS at 2% (1% CGST + 1% SGST, or 2% IGST) where the contract value of taxable supply exceeds Rs. 2,50,000. This is distinct from income-tax TDS under 194-C."
    },
    {
        "id": "psgb-12-39",
        "text": "Consider the following statements about Philately Deposit Accounts (Rule 15):\n1. They can be opened at any Branch Post Office.\n2. An amount of Rs. 200 is prescribed as a security deposit for opening the account.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 15, FHB Vol-II: Philately Deposit Accounts are opened at a Philatelic Bureau or a Philatelic counter of an HO — NOT at Branch Post Offices — so statement 1 is wrong. The Rs. 200 security deposit (statement 2) is correct."
    },
    {
        "id": "psgb-12-40",
        "text": "What is the penalty for not submitting the TDS RETURN on GST?",
        "options": [
            "Rs. 50 per day (max Rs. 2,000)",
            "Rs. 200 per day (max Rs. 10,000)",
            "Rs. 100 per day (max Rs. 5,000)",
            "Rs. 500 per day (no maximum)"
        ],
        "correctAnswer": 2,
        "explanation": "Rule 92 (as referenced): the penalty for non-submission of the GST-TDS return is Rs. 100 per day, subject to a maximum of Rs. 5,000."
    },
    {
        "id": "psgb-12-41",
        "text": "In which two cities was the India Post Payments Bank (IPPB) initially launched as a pilot project on 30 January 2017?",
        "options": [
            "New Delhi and Mumbai",
            "Patna and Lucknow",
            "Ranchi and Raipur",
            "Bhopal and Jaipur"
        ],
        "correctAnswer": 2,
        "explanation": "IPPB was launched as a pilot on 30 January 2017 in Ranchi (Jharkhand) and Raipur (Chhattisgarh)."
    },
    {
        "id": "psgb-12-42",
        "text": "Consider the following statements regarding the IPPB Premium Aarogya Savings Account:\n1. It provides unlimited tele/video consultations with General Practitioners.\n2. The annual renewal subscription fee is Rs. 149 + GST.\n3. It waives the initial waiting period and the pre-existing disease (PED) waiting period.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Statements 1 and 3 are correct (unlimited tele/video GP consultations; no PED waiting period — Niva Bupa). Statement 2 is wrong: the one-time account-OPENING charge is Rs. 149 + GST, but the ANNUAL RENEWAL fee is Rs. 99 + GST."
    },
    {
        "id": "psgb-12-43",
        "text": "Under the IPPB Premium Khata (Savings Account), what interest rate applies to end-of-day balances ABOVE Rs. 1 Lakh and up to Rs. 2 Lakh?",
        "options": [
            "2.25% (quarterly)",
            "2.00% (quarterly)",
            "2.50% (quarterly)",
            "3.00% (quarterly)"
        ],
        "correctAnswer": 0,
        "explanation": "Per the Premium Khata features, interest is 2.00% for balances up to Rs. 1 Lakh and 2.25% (paid quarterly) for balances above Rs. 1 Lakh up to Rs. 2 Lakh."
    },
    {
        "id": "psgb-12-44",
        "text": "A Basic Savings Account holder makes cash withdrawals at access points. Under the IPPB charge schedule, what is the cash-withdrawal charge per month?",
        "options": [
            "Completely free with no limits",
            "Free up to Rs. 25,000 per month; thereafter 0.50% of the value",
            "Flat Rs. 20 per withdrawal",
            "Free up to 4 withdrawals per month; thereafter 0.50% of the value (minimum Rs. 25)"
        ],
        "correctAnswer": 3,
        "explanation": "For a Basic Savings Account, cash withdrawals are free up to 4 per month; beyond the free limit the charge is 0.50% of the transaction value, minimum Rs. 25 per transaction."
    },
    {
        "id": "psgb-12-45",
        "text": "Consider the following statements about the DigiSmart Savings Account:\n1. A customer must complete full biometric KYC within 12 months of opening.\n2. The account can be opened by anyone above 10 years of age.\n3. Failure to complete KYC within 12 months results in account closure with a charge of Rs. 150 + GST.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 2,
        "explanation": "Statement 2 is wrong: DigiSmart is for individuals aged 18 and above holding Aadhaar and PAN. Statements 1 and 3 are correct."
    },
    {
        "id": "psgb-12-46",
        "text": "What is the minimum balance required to be maintained in an IPPB Current Account?",
        "options": [
            "Rs. 500",
            "Rs. 1,000",
            "NIL",
            "Rs. 2,000"
        ],
        "correctAnswer": 2,
        "explanation": "IPPB accounts, including the Current Account, carry NO monthly average balance requirement — the minimum balance is NIL."
    },
    {
        "id": "psgb-12-47",
        "text": "An IPPB customer links her Post Office Savings Account (POSA) with her IPPB account. A credit pushes her IPPB end-of-day balance to Rs. 2,15,000. What happens to the excess over Rs. 2,00,000?",
        "options": [
            "The transaction causing the excess is rejected.",
            "The excess Rs. 15,000 is automatically swept into the linked POSA.",
            "The excess is held in a suspense account without interest.",
            "A penalty of Rs. 100 is charged and the balance is capped."
        ],
        "correctAnswer": 1,
        "explanation": "Under the Sweep-in/Sweep-out facility, when the day-end balance exceeds the Rs. 2 Lakh ceiling, the excess is automatically swept out to the linked POSA (here Rs. 15,000)."
    },
    {
        "id": "psgb-12-48",
        "text": "Which of the following is NOT covered under the TATA AIG Group Accident Guard (GAG) Insurance (Option 1 — Sum Assured Rs. 10 Lakhs)?",
        "options": [
            "Accidental Death",
            "Permanent Partial Disability",
            "Evacuation Benefit",
            "Suicide"
        ],
        "correctAnswer": 3,
        "explanation": "Under the GAG policy exclusions, suicide, war, military operations, illegal acts, and bacterial infections are excluded; accidental death, permanent partial disability, and evacuation benefit are covered."
    },
    {
        "id": "psgb-12-49",
        "text": "What fee is charged for issuing a Digital Life Certificate (DLC / Jeevan Pramaan) through IPPB, inclusive of GST?",
        "options": [
            "Rs. 50",
            "Rs. 100",
            "Rs. 150",
            "Rs. 70"
        ],
        "correctAnswer": 3,
        "explanation": "For every successful DLC generation a nominal fee of Rs. 70 (inclusive of GST/cess) is charged, with no additional doorstep charge."
    },
    {
        "id": "psgb-12-50",
        "text": "Consider the following limits on money transfers via the IPPB Mobile Banking App:\n1. The per-day maximum limit for NEFT (Outward) is Rs. 5,00,000.\n2. The maximum amount per transaction for IMPS (Outward) is Rs. 2,00,000.\n3. The per-day maximum count for UPI (Outward) is 20.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Statements 1 and 3 are correct. Statement 2 is wrong: the maximum amount PER TRANSACTION for IMPS is Rs. 50,000; Rs. 2,00,000 is the per-DAY limit."
    },
    {
        "id": "psgb-12-51",
        "text": "What are the Doorstep Banking (DSB) charges when an IPPB customer uses the Child Enrolment Lite Client (CELC) for Aadhaar enrolment of a child?",
        "options": [
            "NIL",
            "Rs. 20 plus GST",
            "Rs. 50 plus GST",
            "Rs. 70 plus GST"
        ],
        "correctAnswer": 0,
        "explanation": "The product-wise DSB schedule provides NO DSB charges for CELC (child Aadhaar enrolment) and DLC."
    },
    {
        "id": "psgb-12-52",
        "text": "For updating a MOBILE NUMBER in Aadhaar through the CELC service via IPPB, what is the charge to the customer?",
        "options": [
            "Rs. 50 (inclusive of GST)",
            "Free",
            "Rs. 25",
            "Rs. 75"
        ],
        "correctAnswer": 0,
        "explanation": "Under CELC services, mobile-number updation in Aadhaar costs Rs. 50 inclusive of GST, whereas child enrolment itself is free."
    },
    {
        "id": "psgb-12-53",
        "text": "A customer wishes to deposit cash into his IPPB account through the Branch Post Office channel. What is the maximum cash deposit per customer per day at a Branch Post Office?",
        "options": [
            "Rs. 10,000",
            "Rs. 50,000",
            "Rs. 2,00,000",
            "Rs. 25,000"
        ],
        "correctAnswer": 3,
        "explanation": "At a Branch Post Office (and via GDS at doorstep), the cash deposit/withdrawal limit is Rs. 25,000 per customer per day; Head and Sub Post Offices have a Rs. 2,00,000 limit."
    },
    {
        "id": "psgb-12-54",
        "text": "Consider the following statements regarding SMS Banking provided by IPPB:\n1. A customer registers by sending \"REGISTER\" to 9910228664 from the registered mobile number.\n2. To freeze an account, the customer SMSes \"FREEZE<12-digit IPPB a/c number>\".\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "Both are correct: registration is by SMS \"REGISTER\" to 9910228664 (or 7669034700); account freeze is by \"FREEZE<12-digit account number>\"."
    },
    {
        "id": "psgb-12-55",
        "text": "What is the charge for an NEFT (Outward) transaction of amount above Rs. 10,000 and up to Rs. 1 Lakh executed at an IPPB access point?",
        "options": [
            "Rs. 4.75",
            "Rs. 2.25",
            "Rs. 14.75",
            "Rs. 24.75"
        ],
        "correctAnswer": 0,
        "explanation": "Per the remittances schedule, NEFT from Rs. 10,001 to Rs. 1 Lakh at an access point/doorstep is charged Rs. 4.75."
    },
    {
        "id": "psgb-12-56",
        "text": "What incentive is provided to an End User (L0) for opening a Premium Account with Aadhaar seeding and a Virtual Debit Card (VDC)?",
        "options": [
            "Rs. 26.00",
            "Rs. 33.90",
            "Rs. 52.00",
            "Rs. 48.30"
        ],
        "correctAnswer": 3,
        "explanation": "The End-User incentive schedule provides Rs. 48.30 to the End User (L0) for a Premium Account with Aadhaar seeding and VDC."
    },
    {
        "id": "psgb-12-57",
        "text": "In the Finacle CBS menu used by IPPB, which command is used for \"Account Aadhaar Seeding / Inquiry\"?",
        "options": [
            "CAACLM",
            "CKYCACOP",
            "HCHBI",
            "CAAS"
        ],
        "correctAnswer": 3,
        "explanation": "The Finacle menu maps \"Account Aadhaar Seeding / Inquiry\" to CAAS (under CNFTM)."
    },
    {
        "id": "psgb-12-58",
        "text": "Consider the following statements about IPPB's Antyodaya Shramik Suraksha Yojana (ASSY):\n1. Plan A provides accidental insurance cover of Rs. 10 Lakhs at an annual premium of Rs. 499.\n2. The risk commencement date starts immediately on receipt of premium.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 0,
        "explanation": "Statement 1 is correct (Plan A: Rs. 10 Lakhs cover for Rs. 499). Statement 2 is wrong: risk commences 15 days after receipt of premium, to curb fraud."
    },
    {
        "id": "psgb-12-59",
        "text": "Under the IPPB Premium Khata, what is the account-closure charge if the account is closed AFTER 3 months of opening/upgradation?",
        "options": [
            "NIL",
            "Rs. 50 + GST",
            "Rs. 100 + GST",
            "Rs. 150 + GST"
        ],
        "correctAnswer": 1,
        "explanation": "The Premium Saving Account charges specify a closure charge of Rs. 50 + GST if closed after 3 months of opening or upgradation."
    },
    {
        "id": "psgb-12-60",
        "text": "For an IPPB Salary Account (for DoP staff), what monthly average balance (MAB) must be maintained?",
        "options": [
            "Rs. 500",
            "Rs. 1,000",
            "NIL",
            "Rs. 2,000"
        ],
        "correctAnswer": 2,
        "explanation": "All IPPB savings accounts, including the Salary Account, have NIL MAB requirement."
    },
    {
        "id": "psgb-12-61",
        "text": "What is the preservation period for Head Office Summaries, Sub Office Accounts, and Branch Office Accounts?",
        "options": [
            "18 months",
            "2 years",
            "5 years",
            "3 years"
        ],
        "correctAnswer": 3,
        "explanation": "Per the Preservation of Records schedule, Head Office Summaries, Sub Office Accounts, and Branch Office Accounts are preserved for 3 years."
    },
    {
        "id": "psgb-12-62",
        "text": "Consider the following statements regarding the preservation of Savings Bank (SB) records:\n1. Specimen signature books of a Head Office are destroyed forthwith after ensuring no pending accounts exist.\n2. Specimen signature books of a Sub Office are preserved for 5 years after all accounts they cover are closed or transferred.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "HO specimen signature books are destroyed immediately once pending accounts are cleared; SO specimen signature books are kept 5 years after closure/transfer. Both correct."
    },
    {
        "id": "psgb-12-63",
        "text": "A non-Gazetted postal servant belonging to the regular establishment is currently on deputation to the Army Postal Service (APS) and is officiating as a Gazetted officer. According to Rule 211 of FHB Vol-I, where must his Service Book be maintained and kept?",
        "options": [
            "With the Head of Office of his parent postal division",
            "Centrally at the Director of Postal Accounts, Nagpur (APS section)",
            "With the immediate superior officer in the APS command structure",
            "In the Circle Accounts Office of his parent Postal Circle"
        ],
        "correctAnswer": 1,
        "explanation": "Under Rule 211, while Service Books are generally kept by the Head of Office, the Service Books of non-Gazetted postal servants on deputation to APS who are officiating as Gazetted officers are kept centrally at the Director of Postal Accounts, Nagpur (APS section)."
    },
    {
        "id": "psgb-12-64",
        "text": "For how long must the confidential records / character sheets of officials who RETIRED ON AN INVALID PENSION be preserved?",
        "options": [
            "5 years after retirement",
            "10 years",
            "25 years or 3 years after death, whichever is earlier",
            "Permanently"
        ],
        "correctAnswer": 2,
        "explanation": "Confidential records of officials retiring on invalid pension are preserved for 25 years or 3 years after death, whichever is earlier (kept with pension cases)."
    },
    {
        "id": "psgb-12-65",
        "text": "Consider the following statements about the preservation of Service Books / Service Rolls:\n1. Service Books (with leave account) are preserved for 3 years after death/retirement or final sanction of pension.\n2. Service Rolls are preserved for 5 years after death, resignation, discharge, or retirement.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "Service Books: 3 years (post death/retirement/pension sanction); Service Rolls: 5 years. Both correct."
    },
    {
        "id": "psgb-12-66",
        "text": "What is the preservation period for Sub Office Daily Accounts and Branch Office Summaries?",
        "options": [
            "1 year",
            "2 years",
            "18 months",
            "3 years"
        ],
        "correctAnswer": 2,
        "explanation": "Sub Office daily accounts, SO summaries, BO summaries, and SO slips are preserved for 18 months."
    },
    {
        "id": "psgb-12-67",
        "text": "For how many years should the nominal roll kept in SB and Savings Certificates branches be preserved?",
        "options": [
            "3 years",
            "5 years",
            "10 years",
            "Permanently"
        ],
        "correctAnswer": 2,
        "explanation": "The nominal roll in SB and Savings Certificates branches is preserved for 10 years."
    },
    {
        "id": "psgb-12-68",
        "text": "For how long must correspondence relating to robberies, thefts, frauds, and tampering with registered articles be preserved?",
        "options": [
            "1 year after the cases are closed",
            "18 months after final orders are passed",
            "3 years after the cases are closed",
            "5 years after the cases are closed"
        ],
        "correctAnswer": 0,
        "explanation": "Correspondence relating to robberies, thefts, frauds, etc. is preserved for 1 year after the cases are closed."
    },
    {
        "id": "psgb-12-69",
        "text": "Which of the following records is preserved PERMANENTLY (while the others carry a 35-year period)?",
        "options": [
            "Annual establishment return (Book of Establishment)",
            "Pay Bill Register",
            "Letter of authority for payment to another person",
            "Runner's appointment certificates"
        ],
        "correctAnswer": 3,
        "explanation": "Runner's appointment certificates, the Register of Destruction of records, and Ledger Cards of silent accounts are preserved permanently. The other three carry a 35-year period."
    },
    {
        "id": "psgb-12-70",
        "text": "Consider the following statements regarding the preservation of Franking Machine records:\n1. The Franking Machine Record Book (FM.4) is preserved for 2 years after the expiry of the validity date of the licence.\n2. The register maintained by the counter PA operating a Multi-Value Franking Machine (FM.1) is preserved for 3 years from the date of the last entry.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "FM.4 (Record Book) and FM.7 (Licence): 2 years post-expiry; FM.1 (counter PA register): 3 years from last entry. Both correct."
    },
    {
        "id": "psgb-12-71",
        "text": "What is the preservation period for records of DISCIPLINARY proceedings?",
        "options": [
            "3 years from disposal",
            "10 years from disposal",
            "5 years from disposal",
            "7 years from disposal"
        ],
        "correctAnswer": 1,
        "explanation": "Records of disciplinary proceedings fall under \"Ten Years,\" preserved for 10 years from the date of disposal of the case."
    },
    {
        "id": "psgb-12-72",
        "text": "According to the retention schedules, how long are records of APPELLATE proceedings preserved?",
        "options": [
            "3 years",
            "5 years",
            "10 years",
            "7 years"
        ],
        "correctAnswer": 3,
        "explanation": "Records of appellate proceedings fall uniquely under \"Seven Years,\" preserved 7 years from disposal of the appeal."
    },
    {
        "id": "psgb-12-73",
        "text": "What is the preservation period for the Register of Refunds (ACG-27) and the Register of Budget Grants?",
        "options": [
            "5 years",
            "3 years",
            "4 years",
            "10 years"
        ],
        "correctAnswer": 0,
        "explanation": "Both the Register of Refunds (ACG-27) and the Register of Budget Grants fall under \"Five Years.\""
    },
    {
        "id": "psgb-12-74",
        "text": "Consider the following statements:\n1. The Day Bag book in UBOS/DBOS is preserved for 2 years.\n2. The Day Bag book in CBOS is preserved for 10 years.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "Day Bag book in UBOS/DBOS: 2 years; in CBOS: 10 years. Both correct."
    },
    {
        "id": "psgb-12-75",
        "text": "For how long must the confidential records / character sheets of officials who have been DISMISSED, REMOVED, or COMPULSORILY RETIRED be preserved?",
        "options": [
            "3 years after the event",
            "5 years after the event",
            "10 years",
            "6 years (with disciplinary proceedings)"
        ],
        "correctAnswer": 3,
        "explanation": "Under \"Six Years,\" confidential records of officials dismissed, removed, or compulsorily retired are preserved for 6 years alongside disciplinary proceedings."
    },
    {
        "id": "psgb-12-76",
        "text": "What is the preservation period for the Treasurer's Cash Book?",
        "options": [
            "3 years",
            "10 years",
            "5 years",
            "25 years"
        ],
        "correctAnswer": 1,
        "explanation": "While a Head Office Cash Book is preserved for 3 years, the Treasurer's Cash Book is listed under \"Ten Years\" in the Sub Accounts section."
    },
    {
        "id": "psgb-12-77",
        "text": "Consider the following statements regarding the preservation of SB claims:\n1. The Register of deceased depositor's claim cases is generally preserved for 3 years after the accounts are closed.\n2. Where SB withdrawals are allowed on an indemnity bond, the claim records are preserved for 6 years.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "Deceased-depositor claim cases: 3 years (except where allowed on indemnity bond, which is 6 years). Both correct."
    },
    {
        "id": "psgb-12-78",
        "text": "What is the preservation period for the Pay Bill Register?",
        "options": [
            "3 years",
            "10 years",
            "25 years",
            "35 years"
        ],
        "correctAnswer": 3,
        "explanation": "The Pay Bill Register, Annual establishment return, and office copies of establishment pay bills are preserved for 35 years."
    },
    {
        "id": "psgb-12-79",
        "text": "For how long are Bonds of Indemnity obtained for the issue of DUPLICATE 5-year National Savings Certificates (NSCs) preserved?",
        "options": [
            "23 years",
            "5 years",
            "10 years",
            "25 years"
        ],
        "correctAnswer": 0,
        "explanation": "Bonds of Indemnity for duplicate 5-year NSCs are preserved for 23 years from the date of issue."
    },
    {
        "id": "psgb-12-80",
        "text": "What is the preservation period for the Register of Sanctioned Establishment?",
        "options": [
            "3 years after a new one has been prepared",
            "5 years after a new one has been prepared",
            "Permanently",
            "1 year after a new one has been prepared"
        ],
        "correctAnswer": 3,
        "explanation": "The Register of Sanctioned Establishment is preserved until the end of 1 year after a new register has been prepared."
    },
    {
        "id": "psgb-12-81",
        "text": "During which period is the 'Swachhta Pakhwada' observed annually in the Department of Posts?",
        "options": [
            "1st to 15th October",
            "16th to 30th November",
            "1st to 15th January",
            "16th to 31st December"
        ],
        "correctAnswer": 1,
        "explanation": "Swachhta Pakhwada is observed in the second fortnight of November (16th–30th November)."
    },
    {
        "id": "psgb-12-82",
        "text": "Consider the following statements regarding Special Campaign 1.0 (2021-2022):\n1. It was launched by the Department of Administrative Reforms and Public Grievances (DARPG).\n2. Its primary focus was solid and liquid waste management in rural branch offices.\n3. It targeted weeding out of physical files, closing dormant e-files, and rapid liquidation of public grievances.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "2 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 1,
        "explanation": "Statements 1 and 3 are correct. Statement 2 is wrong: SLWM was the focus of the Phase-II national mission, whereas Special Campaign 1.0 (DARPG) targeted administrative pendency, file-weeding, and physical clutter."
    },
    {
        "id": "psgb-12-83",
        "text": "During Special Campaign 3.0 (October 2023), how much revenue was generated from the disposal of administrative scrap within the 30-day primary window?",
        "options": [
            "Rs. 69 Lakh",
            "Rs. 0.92 Crore",
            "Rs. 1.02 Crore",
            "Rs. 1.51 Crore"
        ],
        "correctAnswer": 3,
        "explanation": "DoP generated Rs. 1.51 Crore from scrap disposal during the primary SC 3.0 window in October 2023. (Note: Rs. 0.92 Crore is the FOLLOW-UP figure — see Q99 — and is a deliberate near-miss here.)"
    },
    {
        "id": "psgb-12-84",
        "text": "Under the Swachhta Action Plan, from which fund head should perishable or consumable items be purchased?",
        "options": [
            "Office Expenses (OE — Non-scheme)",
            "Swachh Bharat Mission (SBM) Fund",
            "Swachhta Action Plan (SAP) Fund",
            "Corporate Social Responsibility (CSR) Fund"
        ],
        "correctAnswer": 0,
        "explanation": "The Fund Utilization guidelines prohibit purchase of perishable/consumable items from the SAP Fund; they must be bought under OE (Non-scheme)."
    },
    {
        "id": "psgb-12-85",
        "text": "Consider the following statements about Special Campaign 4.0 (2024-2025):\n1. It integrated an afforestation drive called #EkPedMaaKeNaam, planting over 36,000 trees.\n2. It mandated the organisation of Safai Mitra Suraksha Shivirs for sanitation workers.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "SC 4.0 expanded to ecological sustainability (#EkPedMaaKeNaam, 36,000+ trees) and sanitation-worker welfare (Safai Mitra Suraksha Shivirs). Both correct."
    },
    {
        "id": "psgb-12-86",
        "text": "What is the designated 15-digit General Ledger (GL) code for the Head of the Swachhta Action Plan?",
        "options": [
            "5201.00.101.02.96.53",
            "1201.00.101.01.00.00",
            "3201.00.101.01.96.53",
            "8553.00.101.02.00.00"
        ],
        "correctAnswer": 0,
        "explanation": "The Swachh Bharat notes identify the Head of the Swachhta Action Plan as 5201.00.101.02.96.53 (GL 5101029653). NOTE: GL codes are revision-prone; confirm against the current classification before publishing."
    },
    {
        "id": "psgb-12-87",
        "text": "Who among the postal workforce is specifically designated as a 'Swachhta Doot' / 'Swachhta Ambassador' during the Swachhta Pakhwada, to generate awareness among customers?",
        "options": [
            "Branch Postmaster (BPM)",
            "Postmen / Postwomen",
            "Mail Overseer",
            "Public Grievance Officer"
        ],
        "correctAnswer": 1,
        "explanation": "Postmen/Postwomen may be designated Swachhta Doot/Swachhta Ambassador during the Pakhwada to generate awareness at customers' doorsteps."
    },
    {
        "id": "psgb-12-88",
        "text": "Which three Postal Circles were awarded the 1st, 2nd, and 3rd prizes for extraordinary work during the major Swachhta Pakhwada of 16–30 November 2018?",
        "options": [
            "Gujarat, Rajasthan, and Punjab",
            "Uttar Pradesh, Bihar, and West Bengal",
            "Karnataka, Andhra Pradesh, and Telangana",
            "Maharashtra, Tamil Nadu, and Kerala"
        ],
        "correctAnswer": 3,
        "explanation": "Maharashtra, Tamil Nadu, and Kerala Circles were awarded the 1st, 2nd, and 3rd prizes respectively."
    },
    {
        "id": "psgb-12-89",
        "text": "Consider the following parameters said to assess the best Circles during Swachhta Pakhwada:\n1. Weeding out of old records that have outlived their preservation period.\n2. Number of stamps affixed on postal articles to curb single-use plastic.\n3. Number of solar panels installed in Branch Post Offices.\nWhich of the statements above is/are among the ten official assessment parameters?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Parameters 4 and 9 of the \"Ten Parameters\" cover weeding out old records and affixing stamps to curb single-use plastics. Solar-panel installation, though a department achievement, is NOT one of the ten Pakhwada evaluation parameters."
    },
    {
        "id": "psgb-12-90",
        "text": "During the pandemic era (2020-2021), the postal network supported safe financial interventions. Approximately how many Aadhaar Enabled Payment System (AEPS) transactions were executed during this overarching period?",
        "options": [
            "Over 1362.59 crore",
            "500.50 crore",
            "850.25 crore",
            "1000.00 crore"
        ],
        "correctAnswer": 0,
        "explanation": "The pandemic-era notes cite over 1362.59 crore successful AEPS transactions delivered through doorstep banking under biosecurity protocols."
    },
    {
        "id": "psgb-12-91",
        "text": "What was the central focus of the \"saturation approach\" adopted during Special Campaign 2.0 (2022-2023)?",
        "options": [
            "Concentrating all cleanliness funds at Dak Bhawan headquarters.",
            "Solely digitising rural postal life insurance records.",
            "Targeting outstation, subordinate, and remote field offices where public interface is highest.",
            "Constructing large-scale solar farms at regional centres."
        ],
        "correctAnswer": 2,
        "explanation": "SC 2.0 moved away from concentrating on ministerial headquarters and adopted a \"saturation approach\" targeting outstation, subordinate, and remote field offices down to rural BOs."
    },
    {
        "id": "psgb-12-92",
        "text": "During Special Campaign 2.0 in the Chennai City Central Division, the freed-up 1,000 sq ft of office space was strategically repurposed for:",
        "options": [
            "Employee welfare — staff retiring rooms and recreation facilities",
            "Expanding sorting-hub machinery",
            "Renting to private fintech startups",
            "VIP customer lounges"
        ],
        "correctAnswer": 0,
        "explanation": "The Chennai regional data shows the 1,000 sq ft of freed space was repurposed for employee welfare (staff retiring rooms and recreation facilities)."
    },
    {
        "id": "psgb-12-93",
        "text": "Which slogan is prescribed for the Swachhta stamp affixed on postal articles during Swachhta Pakhwada?",
        "options": [
            "'Clean India, Green India'",
            "'Swachh Dak, Swachh Bharat'",
            "'Ek Kadam Swachhata Ki Ore'",
            "'Say No To Plastic Carry Bags'"
        ],
        "correctAnswer": 3,
        "explanation": "The prescribed activities specify a Swachhta stamp bearing 'Say No To Plastic Carry Bags' to be affixed on postal articles."
    },
    {
        "id": "psgb-12-94",
        "text": "Consider the following statements regarding the \"Special Campaign 5.0 & Disposal of Pending Matters (SCDPM)\":\n1. It freed up 45,000 sq ft of office space nationwide.\n2. It generated Rs. 1.02 crore from the sale of scrap.\n3. It disposed of over one lakh public grievances.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 3,
        "explanation": "SC 5.0 freed up 45,000 sq ft, generated Rs. 1.02 crore from scrap, weeded out 17,352 files, and disposed of over one lakh public grievances. All three correct."
    },
    {
        "id": "psgb-12-95",
        "text": "The 'Five Star Villages Scheme' inauguration was highlighted as environmentally friendly during the pandemic because:",
        "options": [
            "It was conducted entirely through Video Conference (VC), bypassing physical travel and paper-based event management.",
            "It used 100% recycled paper.",
            "It mandated planting five trees in every participating village.",
            "It replaced all diesel mail vans with electric vehicles in the selected villages."
        ],
        "correctAnswer": 0,
        "explanation": "The inauguration was conducted entirely via VC, bypassing physical travel and paper-based event management and thereby reducing the environmental footprint."
    },
    {
        "id": "psgb-12-96",
        "text": "Under the Swachhta Action Plan, what specific infrastructure upgrade is mandated for Post Office courtyards?",
        "options": [
            "Putting interlock tiles",
            "Automatic sanitiser dispensers",
            "Native medicinal shrubs",
            "Concrete rainwater-harvesting pits"
        ],
        "correctAnswer": 0,
        "explanation": "Activity (b) under the Swachhta Action Plan mandates \"Putting interlock tiles in Post Office Courtyards.\""
    },
    {
        "id": "psgb-12-97",
        "text": "During the Swachhta drives of 2018-2019, which organisation recognised Kolkata GPO for conservation of its Heritage Building?",
        "options": [
            "UNESCO",
            "Archaeological Survey of India (ASI)",
            "INTACH",
            "Ministry of Culture"
        ],
        "correctAnswer": 2,
        "explanation": "Kolkata GPO was recognised by INTACH (Indian National Trust for Art and Cultural Heritage) for conservation of the Heritage Building."
    },
    {
        "id": "psgb-12-98",
        "text": "Consider the following steps mandated during the financial year 2019-20 Swachhta initiatives:\n1. Nomination of Nodal officers in all 23 Circles.\n2. Facilitation of 2 hours of voluntary \"Shram Daan\" per week for each employee.\n3. Creation of task forces strictly at the National Directorate level only.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2 and 3"
        ],
        "correctAnswer": 0,
        "explanation": "Statements 1 and 2 are correct. Statement 3 is wrong: task forces were created at Circle/Division levels, not only at the National Directorate."
    },
    {
        "id": "psgb-12-99",
        "text": "Under Special Campaign 3.0 (2023-2024), what follow-up action sustained momentum between November 2023 and August 2024?",
        "options": [
            "Hiring 10,000 new custodial staff",
            "Deep cleaning of an additional 15,931 sites and generating Rs. 0.92 Crore from scrap",
            "Suspending operations in all old, cluttered buildings",
            "Mandatory shift to 100% solar power for all Head Post Offices"
        ],
        "correctAnswer": 1,
        "explanation": "SC 3.0 follow-up actions included cleaning 15,931 additional sites and generating a further Rs. 0.92 Crore from scrap between November 2023 and August 2024. (Contrast Q83: Rs. 1.51 Crore was the PRIMARY-window figure.)"
    },
    {
        "id": "psgb-12-100",
        "text": "The decluttered space achieved during Special Campaign 3.0 was strategically used to expand which hubs designed for MSME commercial exports?",
        "options": [
            "Post Office Passport Seva Kendras",
            "Aadhaar Seva Kendras",
            "Dak Ghar Niryat Kendras",
            "Common Service Centres (CSCs)"
        ],
        "correctAnswer": 2,
        "explanation": "Uncluttered spaces facilitated the establishment of Dak Ghar Niryat Kendras — specialised hubs to facilitate commercial exports for MSMEs."
    }
];
