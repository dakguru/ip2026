import { RawQuestion } from '../quizzes';

export const leave_set1: RawQuestion[] = [
    {
        q: "Which of the following is true regarding the 'Right to Leave' under CCS (Leave) Rules, 1972?",
        o: [
            "Leave is a right of the Government servant",
            "Leave cannot be denied by the competent authority",
            "Leave cannot be claimed as of right",
            "Leave must be granted whenever an employee applies"
        ],
        a: 2,
        e: "Rule 7 states that leave cannot be claimed as of right. Discretion to refuse or revoke leave is reserved to the authority when public service requires it."
    },
    {
        q: "Can the leave sanctioning authority alter the 'kind of leave' applied for by a Government servant without his consent?",
        o: [
            "Yes, if public service requires so",
            "No, the authority can only refuse/grant but cannot alter the kind of leave",
            "Only for Gazetted officers",
            "Only if the employee is under suspension"
        ],
        a: 1,
        e: "The competent authority has no power to alter the kind of leave applied for. They can only refuse or grant what was requested."
    },
    {
        q: "What is the maximum period of 'Continuous Absence' (including any kind of leave) beyond which a Government servant may be deemed to have resigned?",
        o: ["2 years", "3 years", "5 years", "10 years"],
        a: 2,
        e: "Except with the sanction of the President, no Government servant shall be granted leave of any kind for a continuous period exceeding five years."
    },
    {
        q: "Can a Central Government servant combine 'Casual Leave' (CL) with 'Earned Leave' (EL)?",
        o: [
            "Yes, with prior permission",
            "No, Casual Leave cannot be combined with any other kind of regular leave",
            "Only if the total period is less than 15 days",
            "Only for medical grounds"
        ],
        a: 1,
        e: "Casual Leave (CL) is not a recognized kind of leave under the CCS (Leave) Rules and cannot be combined with regular leave like EL or HPL."
    },
    {
        q: "In which of the following cases can leave NOT be granted to a Government servant?",
        o: ["While on maternity leave", "While under suspension", "While on deputation", "While on half-pay leave"],
        a: 1,
        e: "Rule 17 states that leave shall not be granted to a Government servant who is under suspension."
    },
    {
        q: "On which dates is 'Earned Leave' (EL) credited to the leave account of a Government servant in a calendar year?",
        o: ["1st January and 1st July", "1st April and 1st October", "1st of every month", "31st December only"],
        a: 0,
        e: "EL is credited in two installments of 15 days each on the first day of January and July every year."
    },
    {
        q: "What is the maximum number of days of 'Earned Leave' (EL) that can be accumulated at the credit of a Government servant?",
        o: ["180 days", "240 days", "300 days", "315 days"],
        a: 2,
        e: "The maximum limit for accumulation of Earned Leave is 300 days."
    },
    {
        q: "If a Government servant joins in the middle of a half-year, at what rate is 'Earned Leave' credited?",
        o: [
            "2.5 days for each completed calendar month of service",
            "5 days for each month",
            "15 days fixed",
            "No leave is credited"
        ],
        a: 0,
        e: "When an employee joins mid-term, EL is credited at the rate of 2.5 days for each completed calendar month of service."
    },
    {
        q: "While calculating Earned Leave, if there is a 'fraction of a day,' how is it treated?",
        o: [
            "Rounded off to the next higher day",
            "Ignored",
            "Rounded to the nearest day (0.5+ becomes 1)",
            "Carried over"
        ],
        a: 2,
        e: "Fractions of a day shall be rounded off to the nearest day (e.g., 7.5 days becomes 8)."
    },
    {
        q: "What is the maximum number of days of 'Earned Leave' (EL) that can be granted at a single time in India?",
        o: ["120 days", "180 days", "240 days", "300 days"],
        a: 1,
        e: "The maximum amount of EL that can be granted in India at any one time is 180 days."
    },
    {
        q: "Under what condition can more than 180 days of EL (up to 300 days) be granted at a single time?",
        o: [
            "If he is a Group A officer",
            "If it is for Study Leave",
            "If the entire leave is spent outside India (except neighboring countries)",
            "Only for retirement"
        ],
        a: 2,
        e: "EL can be granted up to 300 days at a time if the portion exceeding 180 days is spent outside India and specified neighboring countries."
    },
    {
        q: "At what rate is 'Half Pay Leave' (HPL) credited to the leave account?",
        o: ["10 days on 1st Jan and 1st July", "15 days on 1st Jan and 1st July", "5 days every quarter", "20 days on 1st January"],
        a: 0,
        e: "HPL is credited at the rate of 10 days on the 1st of January and 1st of July every year (Total 20 days per year)."
    },
    {
        q: "Is there any limit on the maximum 'Accumulation' of Half Pay Leave (HPL)?",
        o: ["300 days", "480 days", "600 days", "No limit"],
        a: 3,
        e: "Unlike EL, there is no maximum limit for the accumulation of Half Pay Leave."
    },
    {
        q: "How is 'Half Pay Leave' (HPL) calculated for a period of 'Extraordinary Leave' (EOL) or 'Dies-non'?",
        o: [
            "No deduction",
            "Reduced by 1/18th of the EOL period",
            "Reduced by 1/10th of the EOL period",
            "Fully forfeited"
        ],
        a: 2,
        e: "The HPL credit is reduced by 1/10th of the period of EOL or dies-non during that half-year, up to a maximum of 10 days."
    },
    {
        q: "'Earned Leave' is NOT admissible in a 'Vacation Department.' Instead, what are they entitled to?",
        o: [
            "30 days EL like everyone else",
            "Half Pay Leave only",
            "Vacation plus reduced EL if prevented from enjoying it",
            "Only Casual Leave"
        ],
        a: 2,
        e: "Employees in vacation departments get full vacation. If required to work during it, they get EL at a prescribed ratio."
    },
    {
        q: "Can a Government servant be granted 'Leave Preparatory to Retirement' (LPR)?",
        o: ["Yes, up to 180 days", "Yes, up to 300 days EL at credit", "Only for 60 days", "No, LPR is abolished"],
        a: 1,
        e: "Rule 38 allows LPR up to the extent of EL due, not exceeding 300 days."
    },
    {
        q: "If a Government servant 'Resigns' of his own volition, what happens to accumulated Earned Leave?",
        o: [
            "Fully encashed",
            "Only 50% encashed",
            "Forfeited (except half leave due up to 150 days in certain cases)",
            "Transferred to new private employer"
        ],
        a: 2,
        e: "Upon resignation, leave credit ceases. Rule 39 enables encashment of half of EL due, subject to a maximum of 150 days."
    },
    {
        q: "What is the EL credit reduction if an employee remains on 'Extraordinary Leave' (EOL) for 20 days?",
        o: ["2 days (1/10th)", "1 day", "No reduction", "5 days"],
        a: 0,
        e: "The EL credit is reduced by 1/10th of the period of EOL/dies-non in the previous half-year. 1/10 of 20 = 2 days."
    },
    {
        q: "Can 'Leave' be combined with 'Holidays'?",
        o: [
            "No, only with Sundays",
            "Yes, holidays can be prefixed or suffixed to leave",
            "Holidays are always counted as leave",
            "Only with Ministry permission"
        ],
        a: 1,
        e: "Government holidays can be prefixed or suffixed to leave. If a holiday falls during the leave, it is counted as leave (except for CL)."
    },
    {
        q: "When does a 'newly appointed' Government servant get their first credit of EL?",
        o: ["After 1 year", "On the date of joining (at 2.5 days per month)", "Next 1st January", "End of probation"],
        a: 1,
        e: "The first credit is given on the date of appointment for the remaining months of that half-year."
    },
    {
        q: "'Half Pay Leave' can be converted into 'Commuted Leave' on medical grounds at what ratio?",
        o: ["1:1", "1:2 (1 day Commuted = 2 days HPL)", "1:3", "2:1"],
        a: 1,
        e: "Commuted Leave is granted by debiting twice the amount of such leave against the HPL due."
    },
    {
        q: "Is 'Commuted Leave' admissible without a Medical Certificate?",
        o: [
            "No, never",
            "Yes, up to 180 days in entire service for approved study",
            "Yes, for private reason up to 10 days",
            "Only for Group A"
        ],
        a: 1,
        e: "Up to 180 days of commuted leave can be granted without a medical certificate for an approved course of study in public interest."
    },
    {
        q: "What is the 'Leave Salary' for a Government servant on Earned Leave?",
        o: ["Half pay", "Equal to pay drawn immediately before leave", "Basic pay only", "75% of pay"],
        a: 1,
        e: "During EL, an employee is entitled to leave salary equal to the pay drawn immediately before proceeding on leave."
    },
    {
        q: "What is the 'Leave Salary' for a Government servant on Half Pay Leave (HPL)?",
        o: ["Half of the pay drawn immediately before leave", "Equal to full pay", "25% of pay", "Only DA"],
        a: 0,
        e: "The leave salary for HPL is exactly half of the pay drawn immediately before proceeding on leave."
    },
    {
        q: "Can a Government servant be granted 'Commuted Leave' even if EL is available?",
        o: ["No, must exhaust EL first", "Yes, it is the employee's choice", "Only with HOD permission", "Only for chronic illness"],
        a: 1,
        e: "An employee can opt for Commuted Leave on medical grounds even if EL is available at their credit."
    }
];

export const leave_set2: RawQuestion[] = [
    {
        q: "What is the maximum number of days of 'Leave Not Due' (LND) in entire service?",
        o: ["180 days", "240 days", "360 days", "No limit"],
        a: 2,
        e: "Leave Not Due (LND) may be granted for a maximum period of 360 days in the entire service."
    },
    {
        q: "Under what condition is 'Leave Not Due' (LND) granted?",
        o: [
            "When EL is exhausted",
            "When no HPL is at credit and prospect of returning is reasonable",
            "For any private reason",
            "Only for Group A"
        ],
        a: 1,
        e: "LND is an advance of HPL granted when no HPL is available and the authority is satisfied the employee will return to earn it back."
    },
    {
        q: "If a servant retires without returning to duty after taking LND, how is it adjusted?",
        o: ["Waived", "Leave salary paid for LND shall be recovered", "Only 50% recovered", "Adjusted against gratuity"],
        a: 1,
        e: "If an employee doesn't return to duty to offset LND, the leave salary paid for it must be recovered (except in cases of ill-health/death)."
    },
    {
        q: "Can 'Leave Not Due' (LND) be granted to a Government servant on medical grounds?",
        o: ["Yes, only on medical grounds", "No", "Yes, both on medical and other specific cases", "Only with President permission"],
        a: 2,
        e: "LND is primarily granted on medical grounds, but can be granted for other reasons if the authority is satisfied."
    },
    {
        q: "What is the maximum period of 'Extraordinary Leave' (EOL) for a temporary employee (less than 1 year)?",
        o: ["3 months", "6 months", "12 months", "24 months"],
        a: 0,
        e: "For temporary employees with less than 1 year of service, EOL without a medical certificate is limited to 3 months."
    },
    {
        q: "What is the EOL limit for a temporary employee (more than 1 year) on medical grounds?",
        o: ["3 months", "6 months", "12 months", "24 months"],
        a: 1,
        e: "For temporary employees with more than 1 year of service, EOL on medical grounds for common diseases is 6 months."
    },
    {
        q: "What is the EOL limit for Tuberculosis or Leprosy (with 1 year of service)?",
        o: ["6 months", "12 months", "18 months", "24 months"],
        a: 2,
        e: "For specialized chronic diseases like TB or Leprosy, employees with 1 year of service can get up to 18 months of EOL."
    },
    {
        q: "Can 'Extraordinary Leave' (EOL) be granted even if regular leave is available?",
        o: ["No", "Yes, if requested in writing", "Only for study", "Only for Group B"],
        a: 1,
        e: "Rule 32 allows the grant of EOL even when other leave is admissible, provided the employee applies for it specifically in writing."
    },
    {
        q: "At what rate is 'Leave Salary' paid for 'Extraordinary Leave' (EOL)?",
        o: ["Half pay", "Equal to basic pay", "No leave salary is paid", "25% pay"],
        a: 2,
        e: "EOL is essentially leave without pay; no leave salary is paid for this period."
    },
    {
        q: "Can 'Extraordinary Leave' (EOL) be converted retrospectively into another kind of leave?",
        o: ["No", "Yes, at the discretion of the granting authority", "Only if requested within 30 days", "Only into EL"],
        a: 1,
        e: "The authority who granted EOL may commute it retrospectively into another kind of leave that was due at the time."
    },
    {
        q: "What is the maximum total EOL for 'Study' in the entire service for temporary servants?",
        o: ["12 months", "24 months", "36 months", "60 months"],
        a: 1,
        e: "EOL for study in public interest for employees with at least 3 years of service can be granted up to 24 months."
    },
    {
        q: "Can 'Commuted Leave' be granted in continuation of Maternity Leave without medical certificate?",
        o: ["No", "Yes, up to 60 days", "Yes, for any period", "Up to 30 days"],
        a: 1,
        e: "Rule 30 allows Commuted Leave up to 60 days without a medical certificate in continuation of maternity leave."
    },
    {
        q: "What travel allowance (TA) is a servant entitled to if 'recalled to duty' from leave?",
        o: [
            "No TA",
            "TA for self and family from leave station to headquarters",
            "Only for self",
            "Only if Gazetted"
        ],
        a: 1,
        e: "Recall to duty from leave entitles the employee to travel expenses as on tour for himself and family, and the journey is treated as duty."
    },
    {
        q: "What happens to accumulated EL beyond 300 days at the end of the year?",
        o: ["Carried to 450", "Lapses (treated as forfeited)", "Only if HOD permits", "Must be encashed"],
        a: 1,
        e: "Any credit beyond 300 days (except for the 15 days credit scenarios) is forfeited and cannot be carried forward."
    },
    {
        q: "From whom is a medical certificate required for 'Commuted Leave' for Group C/D staff?",
        o: ["Civil Surgeon", "AMA or RMP if AMA is unavailable", "Head of Office", "Pharmacy"],
        a: 1,
        e: "For non-Gazetted staff, a certificate from the AMA or a Registered Medical Practitioner (if AMA is out of reach) is acceptable."
    },
    {
        q: "From whom is a medical certificate for 'Commuted Leave' required for Gazetted Officers?",
        o: ["Any RMP", "AMA or a specialist if recommended", "District Collector", "Self-declaration"],
        a: 1,
        e: "Gazetted officers must produce a certificate from their Authorized Medical Attendant (AMA) or other authorized govt doctor."
    },
    {
        q: "When does leave 'ordinarily begin'?",
        o: [
            "Ready to go",
            "On the day on which transfer of charge is effected",
            "Only on Mondays",
            "Date of application"
        ],
        a: 1,
        e: "Leave ordinarily begins on the day charge is transferred and ends on the day charge is resumed."
    },
    {
        q: "What is required to 'Shorten' leave and return to duty early?",
        o: ["Join anytime", "Prior permission of the granting authority", "Phone call", "Pay a fine"],
        a: 1,
        e: "Rule 35 states that no employee shall return to duty early without permission from the authority that granted the leave."
    },
    {
        q: "What is required for an employee returning from leave on 'Medical Grounds'?",
        o: ["Join directly", "Produce a fitness certificate from medical authority", "Wait 7 days", "Only for TB"],
        a: 1,
        e: "An employee on medical leave must produce a certificate of fitness before being allowed to resume duty."
    },
    {
        q: "Is a Government servant entitled to 'DA' while on Half Pay Leave?",
        o: ["No", "Yes, based on the actual leave salary drawn", "Yes, based on full pay", "Only 50% DA"],
        a: 1,
        e: "Dearness Allowance is calculated on the actual leave salary drawn (which is half for HPL)."
    },
    {
        q: "What is the limit for 'Commuted Leave' for 'Approved Study' without medical certificate?",
        o: ["60 days", "120 days", "180 days", "240 days"],
        a: 2,
        e: "Up to 180 days of commuted leave can be granted in entire service for an approved course of study in public interest."
    },
    {
        q: "How much 'Special Casual Leave' is admissible for 'Vasectomy' (male sterilization)?",
        o: ["2 days", "6 working days", "10 days", "15 days"],
        a: 1,
        e: "Male Govt servants are entitled to 6 working days of Special Casual Leave for undergoing vasectomy."
    },
    {
        q: "How much Special Casual Leave is for a male employee whose wife undergoes 'Tubectomy'?",
        o: ["Nil", "3 days", "7 working days", "14 days"],
        a: 2,
        e: "Male employees get 7 working days of Special Casual Leave to attend to their wife post-tubectomy."
    },
    {
        q: "Can 'Special Casual Leave' be combined with EL or HPL?",
        o: ["No", "Yes, it can be combined with any kind of regular leave", "Only HPL", "Only with President permission"],
        a: 1,
        e: "Unlike ordinary CL, Special Casual Leave (for family welfare) can be combined with regular leave."
    },
    {
        q: "What is the 'Maternity Leave' entitlement for a female Government servant?",
        o: ["90 days", "120 days", "180 days", "240 days"],
        a: 2,
        e: "A female employee (with less than 2 surviving children) is entitled to 180 days of Maternity Leave."
    }
];

export const leave_set3: RawQuestion[] = [
    {
        q: "How many days of Maternity Leave can be granted for 'Miscarriage' or 'Abortion' in entire service?",
        o: ["15 days", "45 days", "60 days", "180 days"],
        a: 1,
        e: "Maternity leave for miscarriage or abortion is limited to 45 days during the entire service career."
    },
    {
        q: "Is a medical certificate mandatory for 'Maternity Leave' for miscarriage?",
        o: ["No", "Yes, from AMA/Authorized provider", "Only Group C", "Only 1st trimester"],
        a: 1,
        e: "Leave for miscarriage must be supported by a certificate from an authorized medical attendant or a govt hospital."
    },
    {
        q: "What is the 'Paternity Leave' entitlement for a male Government servant?",
        o: ["7 days", "10 days", "15 days", "30 days"],
        a: 2,
        e: "Male employees (with <2 surviving children) are eligible for 15 days of Paternity Leave during wife's confinement."
    },
    {
        q: "Within what period from delivery must 'Paternity Leave' be availed?",
        o: ["3 months", "6 months", "12 months", "2 years"],
        a: 1,
        e: "Paternity leave must be availed within six months from the date of delivery; otherwise, it lapses."
    },
    {
        q: "Can 'Paternity Leave' be combined with 'Earned Leave'?",
        o: ["No", "Yes, it can be combined with any description of regular leave", "Only if EL < 30", "Only with Ministry permission"],
        a: 1,
        e: "Paternity leave is fully combinable with any other kind of regular leave (EL, HPL, etc.)."
    },
    {
        q: "What is the 'Leave Salary' for 'Paternity Leave'?",
        o: ["Half pay", "Equal to pay drawn immediately before leave", "Basic pay only", "Fixed 5000"],
        a: 1,
        e: "Paternity leave salary is equal to the pay drawn immediately before proceeding on leave."
    },
    {
        q: "Is 'Paternity Leave' admissible in case of 'Child Adoption'?",
        o: ["No", "Yes, for adopting a child below the age of 1 year", "Only if boy", "30 days"],
        a: 1,
        e: "Paternity leave of 15 days is admissible for male employees adopting a child below age one."
    },
    {
        q: "What is 'Child Adoption Leave' for a female Government servant?",
        o: ["60 days", "120 days", "180 days", "360 days"],
        a: 2,
        e: "A female employee adoptions a child below age one gets 180 days of Child Adoption Leave."
    },
    {
        q: "For how many days can 'Child Care Leave' (CCL) be granted in entire service?",
        o: ["360 days", "480 days", "730 days", "900 days"],
        a: 2,
        e: "CCL is admissible for a total of 730 days (2 years) during the entire service career."
    },
    {
        q: "For how many children can 'Child Care Leave' (CCL) be availed?",
        o: ["All", "Only first", "Up to two eldest surviving children", "Only twins"],
        a: 2,
        e: "CCL is limited to the care of the two eldest surviving children."
    },
    {
        q: "What is the maximum age of the child for 'Child Care Leave'?",
        o: ["12 years", "15 years", "18 years", "No limit for daughters"],
        a: 2,
        e: "CCL can be granted for children below 18 years of age (exception for disabled children)."
    },
    {
        q: "What is the leave salary for the 'First 365 days' of CCL?",
        o: ["50% pay", "100% of leave salary", "Nil", "75% pay"],
        a: 1,
        e: "During the first 365 days of CCL, the employee receives 100% of the leave salary."
    },
    {
        q: "What is the leave salary for the 'Second 365 days' of CCL?",
        o: ["100%", "80%", "50%", "Nil"],
        a: 1,
        e: "For the second 365 days (the remaining year) of CCL, the salary is 80% of the pay drawn before leave."
    },
    {
        q: "What is the limit for 'Number of Spells' of CCL per calendar year?",
        o: ["1 spell", "2 spells", "3 spells", "5 spells"],
        a: 2,
        e: "Child Care Leave (CCL) cannot be granted in more than three spells in a single calendar year."
    },
    {
        q: "What is the 'Minimum Duration' of a single spell of CCL?",
        o: ["1 day", "5 days", "15 days", "30 days"],
        a: 1,
        e: "A single spell of CCL must generally be for a minimum period of 5 days."
    },
    {
        q: "Can CCL be granted during the 'Probation Period'?",
        o: ["No", "Yes", "Generally no, but allowed in extreme emergencies (short term)", "Only if extended"],
        a: 2,
        e: "CCL is rarely granted during probation, except in extreme emergencies and for very short durations."
    },
    {
        q: "Is CCL admissible to a 'Single Male Parent'?",
        o: ["No", "Yes, since recent amendment", "Only if widower", "Only for disabled child"],
        a: 1,
        e: "CCL is now admissible to single male parents (widowers, divorcees, or unmarried) in addition to female employees."
    },
    {
        q: "What leave is for injury/illness 'attributable to performance of official duties'?",
        o: ["Regular EL/HPL", "Special Disability Leave", "Work-Related Illness and Injury Leave (WRIIL)", "Extra Leave"],
        a: 2,
        e: "WRIIL consolidated various injury leaves and is for disabilities resulting from official duties."
    },
    {
        q: "What percentage leave salary is paid for 'WRIIL' while hospitalized?",
        o: ["100%", "50%", "75%", "Full pay for 120 days only"],
        a: 0,
        e: "Under WRIIL, 100% pay is provided for any period of hospitalization."
    },
    {
        q: "Following the 120 days of full pay, what is the salary under 'WRIIL'?",
        o: ["100% pay", "No pay", "50% (Half pay)", "Only DA"],
        a: 2,
        e: "Beyond 120 days (if not hospitalized), the employee usually receives 50% pay for the remaining disability period."
    },
    {
        q: "Can 'WRIIL' be debited to the regular leave account?",
        o: ["Yes, EL", "Yes, HPL", "No, it is not debited to regular accounts", "Only if no EL"],
        a: 2,
        e: "WRIIL is a specialized leave that is not deducted from the employee's regular EL or HPL balances."
    },
    {
        q: "Is 'LTC' admissible during Child Care Leave (CCL)?",
        o: ["No", "Yes", "Only for child", "Once in 5 years"],
        a: 1,
        e: "CCL is considered regular leave, making the employee fully eligible for LTC benefits."
    },
    {
        q: "Which kind of leave is for 'Survey of India' employees contracting disease?",
        o: ["Seamen's", "Hospital", "Departmental", "Survey"],
        a: 2,
        e: "Departmental Leave is a specific category for the Survey of India and seasonally operating departments."
    },
    {
        q: "What is the CCL provision for a child with 'Disability'?",
        o: ["Same as 18 years", "No age limit for the child", "1st year only", "3 years instead of 2"],
        a: 1,
        e: "For children with at least 40% benchmark disability, the 18-year age limit for CCL is waived."
    },
    {
        q: "Can CCL be taken without prior sanction?",
        o: ["Yes, inform via SMS", "No, prior sanction is mandatory", "Only if EL exhausted", "Only during holidays"],
        a: 1,
        e: "Proceeding on CCL without formal sanction is not permissible."
    }
];

export const leave_set4: RawQuestion[] = [
    {
        q: "Under what condition is 'Study Leave' granted?",
        o: ["Any higher education", "Direct advantage to Govt in public interest", "PhD abroad", "Employee pays fee"],
        a: 1,
        e: "Study leave is for specialized study that directly benefits the Government's sphere of duty."
    },
    {
        q: "What is the minimum service for 'Study Leave' eligibility?",
        o: ["1 year", "3 years", "5 years", "10 years"],
        a: 2,
        e: "At least five years of regular and continuous service is required for study leave eligibility."
    },
    {
        q: "What is the maximum 'Study Leave' in one spell?",
        o: ["6 months", "12 months", "24 months", "36 months"],
        a: 1,
        e: "Study leave is granted for a maximum of 12 months at any one time."
    },
    {
        q: "What is the maximum 'Total Duration' of Study Leave in entire service?",
        o: ["12 months", "24 months", "36 months", "48 months"],
        a: 1,
        e: "The total period of study leave (for non-medical staff) must not exceed 24 months during the entire service."
    },
    {
        q: "What is the Study Leave limit for 'Medical Officers' for post-graduation?",
        o: ["24 months", "36 months", "48 months", "No limit"],
        a: 1,
        e: "Specialist Medical Officers can get up to 36 months of study leave for specialization."
    },
    {
        q: "Is 'Study Allowance' paid for study within India?",
        o: ["Yes", "No study allowance for study within India", "If staying private", "Group A only"],
        a: 1,
        e: "Study allowance is only for studies conducted outside India."
    },
    {
        q: "What is the 'Bond Period' after returning from Study Leave?",
        o: ["1 year", "3 years", "5 years", "None"],
        a: 1,
        e: "Employees must sign a bond to serve the Government for at least 3 years after returning from study leave."
    },
    {
        q: "What is the consequence of 'Resigning' before bond expiry after Study Leave?",
        o: ["Nothing", "Refund leave salary + other expenses + interest", "Refund 50%", "Refund tuition only"],
        a: 1,
        e: "Failure to fulfill the bond requires the refund of all costs incurred by the Govt (salary, allowance, fees) with interest."
    },
    {
        q: "Can Study Leave be combined with 'Earned Leave'?",
        o: ["No", "Yes, and total absence (excl. study leave) must not exceed 28 months", "Yes, up to 5 yrs", "Only at the end"],
        a: 1,
        e: "Study leave can be combined with other leave, but total absence is regulated (generally 28 months for non-medical)."
    },
    {
        q: "What is the 'EL Encashment' limit while in service for 'LTC'?",
        o: ["5 days", "10 days", "30 days", "No limit"],
        a: 1,
        e: "Up to 10 days of EL can be encashed when availing LTC."
    },
    {
        q: "What is the 'Lifetime Limit' of EL encashment during LTC?",
        o: ["30 days", "60 days", "90 days", "300 days"],
        a: 1,
        e: "An employee can encash up to 60 days total for LTC across their entire service career."
    },
    {
        q: "How much EL must remain after encashment for LTC?",
        o: ["15 days", "30 days", "60 days", "100 days"],
        a: 1,
        e: "At least 30 days of EL must remain in the account after LTC encashment."
    },
    {
        q: "What is the 'Encashment Formula' at Retirement?",
        o: ["Basic Pay only", "(Basic Pay + DA) x days / 30", "(Basic Pay + DA) x days / 26", "50% salary"],
        a: 1,
        e: "Retirement encashment = (Pay + DA) / 30 x number of days (up to 300)."
    },
    {
        q: "Can a 'Compulsorily Retired' servant (as penalty) get leave encashment?",
        o: ["No", "Yes, if authority allows (up to 300 days)", "Only 50%", "Only last 10 yrs"],
        a: 1,
        e: "Even in compulsory retirement as a penalty, authority can allow encashment of leave due."
    },
    {
        q: "Who receives leave encashment if a servant 'Dies while in service'?",
        o: ["Treasury", "Family (spouse/heirs)", "Children only", "Adjusted against loans"],
        a: 1,
        e: "The family of the deceased employee receives the encashment for leave at credit (up to 300 days)."
    },
    {
        q: "To whom is 'Child Care Leave' (CCL) NOT applicable?",
        o: ["Females", "Single male parents", "Married male employees", "Unmarried females with children"],
        a: 2,
        e: "CCL is only for female employees and single male parents."
    },
    {
        q: "How often is 'Special Disability' leave normally granted?",
        o: ["Once", "Whenever disability occurs (certified by medical board)", "On tour accidents only", "Ministry permission"],
        a: 1,
        e: "WRIIL/Special disability leave is granted as needed based on medical board recommendations for duty-related injuries."
    },
    {
        q: "Can 'HPL' be encashed at Retirement?",
        o: ["No", "Yes, to reach 300 total if EL is < 300 (but no DA of HPL)", "Yes, fully in addition to EL", "Group D only"],
        a: 1,
        e: "If EL is < 300, HPL can be used to reach a 300-day limit, but the HPL encashment pay does not include DA."
    },
    {
        q: "Is 'Commuted Leave' admissible if 'HPL' balance is zero?",
        o: ["Yes", "No", "Debited from EL instead", "Only if paid for"],
        a: 1,
        e: "Commuted leave is always debited from HPL; if HPL is zero, it cannot be granted."
    },
    {
        q: "Can a servant 'Relieve himself' for leave before formal sanction?",
        o: ["Yes, if applied", "No, must wait for formal order/transfer", "Only family death", "Only 2 days"],
        a: 1,
        e: "Unauthorized absence can lead to 'dies-non' or disciplinary action."
    },
    {
        q: "Is a female employee entitled to 'Full Pay' on Maternity Leave?",
        o: ["No", "Yes, salary equals pay drawn before leave", "Only after return", "First 90 only"],
        a: 1,
        e: "Maternity leave is a full-pay leave."
    },
    {
        q: "If a female has 'Twins' on 1st delivery, surviving children count is?",
        o: ["1", "2", "None", "3"],
        a: 1,
        e: "Twins mean the employee has two surviving children, affecting subsequent paternity/maternity leave eligibility."
    },
    {
        q: "What happens to EL credit when 'Dismissed' or 'Removed'?",
        o: ["Fully encashed", "Partially", "Lapses (no compensation)", "Spouse"],
        a: 2,
        e: "Dismissal or removal results in the forfeiture of all leave credit."
    },
    {
        q: "What is the 'Sanctioning Authority' for Study Leave?",
        o: ["Supervisor", "HOD or Ministry", "President", "Any Gazetted"],
        a: 1,
        e: "Study leave is sanctioned by the HOD or the concerned Ministry."
    },
    {
        q: "Rule 25 'Absence after expiry of leave' results in?",
        o: ["EL for that period", "Dies-non (no salary/count for increment)", "Promotion", "Warning"],
        a: 1,
        e: "Unsanctioned absence after leave expiry is 'dies-non', missing out on salary and service count."
    }
];
