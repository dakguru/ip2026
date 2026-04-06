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
        q: "Under Rule 29, how is 'Half Pay Leave' (HPL) credit reduced for a period treated as 'Dies-non' or suspension?",
        o: [
            "No deduction",
            "Reduced by 1/18th of such period (max 10 days)",
            "Reduced by 1/10th of such period (max 15 days)",
            "Fully forfeited"
        ],
        a: 1,
        e: "Rule 29: HPL credit is reduced by 1/18th of the period treated as dies-non/suspension, subject to a maximum of 10 days. (Note: EL under Rule 27 is reduced by 1/10th, max 15 days — a common exam trap.)"
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
        o: ["2 days", "5 working days", "10 days", "15 days"],
        a: 1,
        e: "Male Govt servants are entitled to 5 working days of Special Casual Leave for vasectomy (also 5 days for second-time failure/recanalization attempt)."
    },
    {
        q: "How much Special Casual Leave is admissible for a male employee whose wife undergoes 'Tubectomy'?",
        o: ["Nil", "3 working days", "7 working days", "14 days"],
        a: 1,
        e: "A male Govt servant gets 3 working days of Special Casual Leave when his wife undergoes tubectomy. (Female employees undergoing tubectomy themselves are entitled to 10 working days.)"
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

export const leave_set5: RawQuestion[] = [
    {
        q: "On which date did the Central Civil Services (Leave) Rules, 1972 come into force?",
        o: ["1st April 1972", "1st June 1972", "15th August 1972", "1st January 1973"],
        a: 1,
        e: "Rule 1: The CCS (Leave) Rules, 1972 came into force on 1st June, 1972."
    },
    {
        q: "To which category of Government servants do the CCS (Leave) Rules, 1972 apply?",
        o: [
            "All persons employed in India",
            "Government servants appointed to civil services and posts in connection with the affairs of the Union",
            "State Government employees only",
            "Only Gazetted officers"
        ],
        a: 1,
        e: "Rule 2: These rules apply to Government servants appointed to civil services and posts in connection with the affairs of the Union."
    },
    {
        q: "Which of the following is EXCLUDED from the application of CCS (Leave) Rules, 1972?",
        o: [
            "Permanent Central Govt employees",
            "Members of All India Services (IAS, IPS & IFS)",
            "Group C employees of the Central Secretariat",
            "Re-employed Central Govt pensioners"
        ],
        a: 1,
        e: "Rule 2 Exceptions: Members of All India Services (IAS, IPS, IFS) are excluded, as they have their own separate leave rules."
    },
    {
        q: "Which of the following is also NOT governed by CCS (Leave) Rules, 1972?",
        o: [
            "Group B Central Govt employees",
            "Persons paid from contingencies",
            "Permanent Section Officers",
            "Postal employees"
        ],
        a: 1,
        e: "Rule 2 Exceptions: Persons paid from contingencies (along with Railway servants, daily-rated employees, industrial workmen, etc.) are excluded from these rules."
    },
    {
        q: "Under Rule 3, what does 'Completed Years of Service' include for leave purposes?",
        o: [
            "Only the period spent on duty",
            "Duty and Earned Leave only",
            "Continuous service including duty and all leave, including Extraordinary Leave",
            "Only duty and HPL"
        ],
        a: 2,
        e: "Rule 3(d): 'Completed years of service' means continuous service of specified duration including period spent on duty as well as on leave, including extraordinary leave."
    },
    {
        q: "Under Rule 3, what does 'Date of Retirement' mean for a Government servant?",
        o: [
            "The last working day of service",
            "The morning of the last day of the month of attaining retirement age",
            "The afternoon of the last day of the month in which the servant attains the retirement age",
            "The first day of the month following retirement"
        ],
        a: 2,
        e: "Rule 3(e): Date of retirement means the afternoon of the last day of the month in which the Government servant attains the age prescribed for retirement."
    },
    {
        q: "A Government servant in 'quasi-permanent employ' is one who has not been confirmed after a continuous service of:",
        o: ["1 year", "2 years", "3 years", "5 years"],
        a: 2,
        e: "Rule 3(i)(1): A quasi-permanent employee is one declared eligible by UPSC and appointed with a written understanding that the vacancy is expected to become permanent, but not confirmed after 3 years continuous service."
    },
    {
        q: "Under Rule 3, 'Foreign Service' means service in which a Government servant receives pay from a source other than the Consolidated Fund of India. What is the key financial criterion?",
        o: [
            "Pay from a private company",
            "Pay from any source other than the Consolidated Fund of India/State/UT",
            "Pay from foreign governments only",
            "Pay from international organisations only"
        ],
        a: 1,
        e: "Rule 3(g): Foreign service means service where pay is received with the sanction of Government from any source other than the Consolidated Fund of India, a State, or a Union Territory."
    },
    {
        q: "Under Rule 4, a Central Government servant on temporary transfer to a State Government continues to be governed by:",
        o: [
            "The State Government's Leave Rules",
            "CCS (Leave) Rules, 1972",
            "Both, equally",
            "Whichever rules are more beneficial"
        ],
        a: 1,
        e: "Rule 4(1): Government servants governed by CCS Leave Rules shall continue to be governed by these rules while on temporary transfer to a State Government or Indian Railways."
    },
    {
        q: "Under Rule 6, when a Central Government servant is transferred to an industrial establishment, what is done with accumulated Earned Leave?",
        o: [
            "Leave lapses automatically",
            "Leave is converted to HPL",
            "A suo motu order for cash equivalent of EL salary (max 300 days) is issued",
            "Leave is carried forward as it is"
        ],
        a: 2,
        e: "Rule 6: The authority competent to grant leave shall suo motu issue an order granting cash equivalent of leave salary for EL at credit, subject to a maximum of 300 days."
    },
    {
        q: "Under Rule 8, a Government servant's claim to leave is regulated by the rules in force at the time:",
        o: [
            "Of his appointment",
            "The leave is applied for and granted",
            "Of his last promotion",
            "His service commenced"
        ],
        a: 1,
        e: "Rule 8: A Government servant's claim to leave is regulated by the rules in force at the time the leave is applied for and granted."
    },
    {
        q: "Under Rule 9, what happens to leave at credit when a Government servant resigns through proper channel to take up another Government appointment?",
        o: [
            "Leave at credit shall cease (forfeited)",
            "Leave at credit shall NOT lapse",
            "Only 50% of leave is preserved",
            "Leave is automatically encashed"
        ],
        a: 1,
        e: "Rule 9(2): Resignation through the proper channel to take up another appointment shall not result in the lapse of the leave at credit."
    },
    {
        q: "A Government servant dismissed from service who is later reinstated on appeal is entitled to:",
        o: [
            "No leave credit from prior service",
            "Count service prior to dismissal for leave purposes",
            "50% of prior service leave credit",
            "Fresh start only from reinstatement"
        ],
        a: 1,
        e: "Rule 9(3): A Government servant dismissed/removed and reinstated on appeal or revision is entitled to count service prior to dismissal for leave purposes."
    },
    {
        q: "Under Rule 10, within how many days of resuming duty must a request for commutation of one kind of leave into another be submitted?",
        o: ["7 days", "15 days", "30 days", "60 days"],
        a: 2,
        e: "Rule 10(2): The request for commutation must be submitted within 30 days from the date the Government servant joins duty on the expiry of the leave."
    },
    {
        q: "Under Rule 10, which leave can be commuted retrospectively into 'Leave Not Due' (subject to Rule 31)?",
        o: ["Earned Leave", "Half Pay Leave", "Extraordinary Leave (EXOL)", "Study Leave"],
        a: 2,
        e: "Rule 10(3): Extraordinary Leave (EXOL) granted on a medical certificate or otherwise may be commuted retrospectively into Leave Not Due, subject to Rule 31 provisions."
    },
    {
        q: "Under Rule 12, the maximum continuous leave of any kind that can be granted without the President's sanction is:",
        o: ["2 years", "3 years", "5 years", "7 years"],
        a: 2,
        e: "Rule 12(1): No Government servant shall be granted leave of any kind for a continuous period exceeding 5 years, without the sanction of the President."
    },
    {
        q: "A Government servant absent from duty for a continuous period exceeding 5 years (other than on foreign service), without Presidential sanction, is deemed to have:",
        o: [
            "Taken unauthorised Extraordinary Leave",
            "Resigned from Government service",
            "Been suspended",
            "Lost all service benefits only"
        ],
        a: 1,
        e: "Rule 12(3): Such absence results in deemed resignation from Government service. The resignation takes effect from the date the leave commenced."
    },
    {
        q: "The 'deemed resignation' rule under Rule 12 does NOT apply when leave is:",
        o: [
            "For more than 3 years",
            "Applied for on a medical certificate in connection with a disability",
            "Availed on the eve of retirement",
            "For private reasons"
        ],
        a: 1,
        e: "Rule 12(4) Disability Exemption: The deemed resignation rule shall not apply where leave is applied for on a medical certificate in connection with a disability."
    },
    {
        q: "Under Rule 13, a Government servant wishing to take up employment in India while on leave requires sanction from:",
        o: ["The President", "The Appointing Authority", "Head of Department", "The Ministry"],
        a: 1,
        e: "Rule 13(1)(b): For employment in India, prior sanction of the Appointing Authority is required. (For outside India, sanction of the President is required.)"
    },
    {
        q: "Under Rule 14, applications for leave or extension must be made in which Form?",
        o: ["Form 1", "Form 2", "Form 3", "Form 5"],
        a: 0,
        e: "Rule 14(1): Any application for leave or extension thereof shall be made in Form 1 to the competent authority."
    },
    {
        q: "Under Rule 15, who maintains the leave account for a Gazetted Government servant, and in which Form?",
        o: [
            "Head of Office in Form 1",
            "Audit Officer in Form 2",
            "Civil Surgeon in Form 3",
            "The servant himself in Form 5"
        ],
        a: 1,
        e: "Rule 15(1): For Gazetted Officers, a leave account shall be maintained in Form 2 by the Audit Officer. For Non-Gazetted, it is maintained by the Head of Office."
    },
    {
        q: "Under Rule 16, when the admissibility report is unduly delayed, provisional leave sanction can be issued for a period not exceeding:",
        o: ["15 days", "30 days", "60 days", "90 days"],
        a: 2,
        e: "Rule 16(2): The competent authority may issue a provisional sanction for a period not exceeding 60 days based on available information when the report is unduly delayed."
    },
    {
        q: "Rule 18 of CCS (Leave) Rules, 1972 was:",
        o: [
            "Inserted by a 2017 amendment",
            "Omitted — its provisions merged into Rule 19",
            "Substituted to cover disability cases",
            "Retained as a special rule for Gazetted Officers"
        ],
        a: 1,
        e: "Rule 18 was Omitted. Its provisions (relating to medical certificates for Gazetted servants) were merged into Rule 19, which now governs both Gazetted and Non-Gazetted Government servants."
    },
    {
        q: "Under Rule 19, the Medical Certificate form for a Non-Gazetted Government servant is:",
        o: ["Form 3", "Form 3-A", "Form 4", "Form 5"],
        a: 2,
        e: "Rule 19: Form 3 is used for Gazetted officers and Form 4 for Non-Gazetted Government servants. Form 3-A is for disability certification, and Form 5 is the Fitness Certificate."
    },
    {
        q: "Under Rule 19, the competent authority can waive the medical certificate for leave not exceeding how many days?",
        o: ["1 day", "3 days", "5 days", "7 days"],
        a: 1,
        e: "Rule 19(4): The authority may waive the production of a medical certificate for leave for a period not exceeding 3 days at a time. Such leave is debited against leave other than leave on medical grounds."
    },
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

export const leave_set6: RawQuestion[] = [
    {
        q: "Under Rule 21, when does a period of leave ordinarily end?",
        o: [
            "On the day the servant resumes charge",
            "On the day preceding the day on which the servant resumes charge",
            "On the last day sanctioned in the leave order",
            "On the day the fitness certificate is produced"
        ],
        a: 1,
        e: "Rule 21: Leave ordinarily begins on the day on which the transfer of charge is effected and ends on the day preceding that on which the charge is resumed."
    },
    {
        q: "Under Rule 22, in cases where leave is on medical certificate, what happens to holidays immediately before the certified sick day?",
        o: [
            "They are counted as leave days",
            "They are automatically allowed to be prefixed to leave (without counting as leave)",
            "They are forfeited",
            "They are treated as unauthorized absence"
        ],
        a: 1,
        e: "Rule 22(2)(a): When certified medically unwell, holiday(s) immediately preceding the certified day are automatically allowed to be prefixed to leave — they become part of the leave period."
    },
    {
        q: "Under Rule 23, when a Government servant is recalled from leave spent outside India, he is entitled to a refund of passage money from India if he has not completed:",
        o: [
            "One month of leave or 1/4th of the leave period",
            "Half the period of leave or 3 months, whichever is shorter",
            "3/4th of the leave period or 6 months",
            "One full year of leave"
        ],
        a: 1,
        e: "Rule 23(b)(iv): Refund of passage from India is admissible if the servant has not completed half the period of leave or 3 months, whichever is shorter."
    },
    {
        q: "Under Rule 24, a Government servant on leave for Tuberculosis may resume duty on the basis of:",
        o: [
            "A declaration of full recovery",
            "A fitness certificate recommending light work",
            "Head of Department's discretion alone",
            "Completion of 6 months treatment"
        ],
        a: 1,
        e: "Rule 24(3): A Government servant suffering from Tuberculosis may be allowed to resume duty on the basis of a fitness certificate recommending light work."
    },
    {
        q: "Under Rule 25, when a Government servant is absent after the expiry of leave without extension, the period of overstayal is debited as:",
        o: [
            "Earned Leave first, then EO Leave",
            "Half Pay Leave first (to the extent due), then excess as Extraordinary Leave",
            "Extraordinary Leave directly",
            "Casual Leave"
        ],
        a: 1,
        e: "Rule 25(1): The period of overstayal is debited against Half Pay Leave (HPL) to the extent due, and the excess is treated as Extraordinary Leave (EXOL). No leave salary is paid."
    },
    {
        q: "Under Rule 27, the maximum reduction in EL credit due to EXOL/dies-non in a half-year is:",
        o: ["5 days", "10 days", "15 days", "20 days"],
        a: 2,
        e: "Rule 27(3): EL credit is reduced by 1/10th of EXOL/dies-non in the previous half-year, subject to a maximum reduction of 15 days. (HPL reduction under Rule 29 is capped at 10 days.)"
    },
    {
        q: "Under Rule 28, Earned Leave for persons in a 'Vacation Department' is credited in two installments of ___ days each on 1st January and 1st July.",
        o: ["2 days", "5 days", "10 days", "15 days"],
        a: 1,
        e: "Rule 28(1): Vacation Department employees get EL credit of 5 days per installment (10 days per year), compared to 15 days per installment (30 days per year) for non-vacation staff."
    },
    {
        q: "Under Rule 29, Half Pay Leave (HPL) is credited at the rate of ___ for each completed calendar month of service.",
        o: ["2.5 days", "5/3 days (approximately 1.67 days)", "10 days", "20 days"],
        a: 1,
        e: "Rule 29(2): HPL is credited at the rate of 5/3 days for each completed calendar month, totalling 20 days per year (credited as 10 days on 1st Jan and 10 days on 1st July)."
    },
    {
        q: "Under Rule 29, HPL credit is reduced by ___ of any period treated as dies-non, subject to a maximum of 10 days.",
        o: ["1/10th", "1/15th", "1/18th", "1/20th"],
        a: 2,
        e: "Rule 29(4): HPL credit is reduced by 1/18th of the period treated as dies-non or suspension, subject to a maximum of 10 days. (EL is reduced by 1/10th under Rule 27.)"
    },
    {
        q: "Under Rule 33, an Apprentice is entitled to leave on medical certificate at what rate, and for how long?",
        o: [
            "Full pay for up to 3 months per year",
            "Half pay for up to 1 month per year of apprenticeship",
            "No pay for up to 6 months",
            "Full pay for the entire apprenticeship period"
        ],
        a: 1,
        e: "Rule 33(2)(a): An apprentice is entitled to leave on medical certificate at a leave salary equivalent to half pay for a period not exceeding one month in any year of apprenticeship."
    },
    {
        q: "Under Rule 34, a person re-employed after retirement is treated under CCS (Leave) Rules as:",
        o: [
            "A continuing employee with full past service credit",
            "As if entering Government service for the first time on the date of re-employment",
            "An employee eligible for HPL only",
            "A probationer for 2 years"
        ],
        a: 1,
        e: "Rule 34: The provisions of these rules shall apply as if the person had entered Government service for the first time on the date of re-employment."
    },
    {
        q: "Under Rule 38, Leave Preparatory to Retirement (LPR) is limited to a maximum of ___ days, comprising which types of leave?",
        o: [
            "180 days — EL only",
            "240 days — EL and HPL equally",
            "300 days — EL due together with HPL due",
            "365 days — any leave at credit"
        ],
        a: 2,
        e: "Rule 38(1): LPR is limited to 300 days, to the extent of Earned Leave due together with Half Pay Leave due, including the date of retirement."
    },
    {
        q: "Under Rule 38-A, if a Government servant fails to avail LTC within the prescribed period after encashing EL, the refund must be made with interest at:",
        o: [
            "SBI base lending rate",
            "2% above the GPF rate",
            "12% per annum flat",
            "No interest, only principal"
        ],
        a: 1,
        e: "Rule 38-A(5): If LTC is not availed within prescribed time, the entire amount encashed must be refunded with interest at 2% above the GPF rate, and the leave is credited back."
    },
    {
        q: "Under Rule 39, cash equivalent of leave may be withheld by the competent authority when a Government servant retires while:",
        o: [
            "On Earned Leave",
            "On Study Leave",
            "Under suspension or during disciplinary/criminal proceedings",
            "On Leave Preparatory to Retirement"
        ],
        a: 2,
        e: "Rule 39(3) Withholding: The competent authority may withhold cash equivalent if the servant retires while under suspension or during disciplinary or criminal proceedings, if there is a possibility of money becoming recoverable."
    },
    {
        q: "The formula for encashment of Half Pay Leave (HPL) at retirement under Rule 39 uses:",
        o: [
            "(Basic Pay + DA) × HPL days / 30",
            "(Half of Basic Pay + DA) × HPL days / 30",
            "Basic Pay only × HPL days / 26",
            "Full Pay × HPL days / 30"
        ],
        a: 1,
        e: "Rule 39: For HPL encashment, the formula is (Half of Last Basic Pay + DA) × Unutilized HPL / 30. EL is adjusted first; HPL fills the balance up to 300 days."
    },
    {
        q: "Under Rule 39, on resignation from service, cash equivalent of leave is payable for ___ of EL at credit, subject to a maximum of ___ days.",
        o: [
            "100% of EL; 300 days",
            "50% of EL; 150 days",
            "25% of EL; 75 days",
            "No encashment on resignation"
        ],
        a: 1,
        e: "Rule 39(5): On resignation, cash equivalent is granted for 50% of Earned Leave at credit, subject to a maximum of 150 days."
    },
    {
        q: "Under Rule 39-A, the family of a Government servant who dies in service receives cash equivalent for leave (EL + HPL combined) up to a maximum of:",
        o: ["150 days", "180 days", "240 days", "300 days"],
        a: 3,
        e: "Rule 39-A: Maximum 300 days cash equivalent (EL + HPL combined) shall be paid to the family of a Government servant who dies in service."
    },
    {
        q: "Under Rule 39-C, who is FIRST in order of precedence for receiving leave encashment payment upon the death of a Government servant?",
        o: ["Eldest surviving son", "Father", "Widow / Husband", "Eldest unmarried daughter"],
        a: 2,
        e: "Rule 39-C: The order of precedence is: (i) Widow/Husband → (ii) Eldest surviving son → (iii) Eldest unmarried daughter → (iv) Eldest widowed daughter → (v) Father → (vi) Mother, etc."
    },
    {
        q: "Under Rule 43, Maternity Leave is NOT admissible for which of the following?",
        o: ["Normal delivery", "Miscarriage/Abortion (up to 45 days)", "Caesarean section", "Threatened abortion"],
        a: 3,
        e: "Rule 43 Note: Maternity leave is not admissible for 'threatened abortion'. Only actual miscarriage or abortion qualifies for the 45-day limit during entire service."
    },
    {
        q: "Under the OM dated 02.09.2022, 'Special Maternity Leave' of ___ days is granted in case of stillbirth (at or after 28 weeks gestation) or child's death within 28 days of birth.",
        o: ["30 days", "45 days", "60 days", "90 days"],
        a: 2,
        e: "Legislative Update (OM 02.09.2022): A female Government servant is entitled to 60 days of Special Maternity Leave for stillbirth (no signs of life at or after 28 weeks gestation) or death of the child within 28 days of birth."
    },
    {
        q: "Under Rule 43, the maximum leave that can be granted in continuation of Maternity Leave (all types combined) is:",
        o: ["6 months", "1 year", "2 years", "3 years"],
        a: 2,
        e: "Rule 43(6): Leave of the kind due — including Commuted Leave up to 60 days and Leave Not Due — may be granted in continuation of Maternity Leave up to a maximum of 2 years."
    },
    {
        q: "Under Rule 43-B (Child Adoption Leave), continuation leave after the initial 180 days is limited to:",
        o: [
            "6 months fixed",
            "1 year, reduced by the age of the adopted child",
            "2 years",
            "90 days only"
        ],
        a: 1,
        e: "Rule 43-B(4): Continuation leave (including Commuted Leave up to 60 days and LND) may be granted for a period up to one year, reduced by the age of the adopted child."
    },
    {
        q: "Under Rule 43-C, how many spells of Child Care Leave (CCL) per calendar year are permissible for single mothers?",
        o: ["2 spells", "3 spells", "5 spells", "6 spells"],
        a: 3,
        e: "Rule 43-C: While CCL is generally restricted to 3 spells per calendar year, single mothers (widows, divorcees, unmarried) are permitted up to 6 spells per calendar year."
    },
    {
        q: "Under Rule 44 (WRIIL), what is the post-hospitalization pay arrangement for CAPF personnel?",
        o: [
            "Full pay for 6 months, then Half Pay Leave for 12 months",
            "Full pay for 6 months, then Full Pay for next 24 months",
            "Half pay throughout the recovery period",
            "Full pay for 12 months only"
        ],
        a: 1,
        e: "Rule 44(3): For CAPF personnel: Full pay and allowances for the entire hospitalization period, then Full Pay for 6 months immediately following, then Full Pay for the next 24 months. (General employees get HPL after 6 months.)"
    },
    {
        q: "Under Rule 48, Special Leave for Sexual Harassment Inquiry is granted for a maximum of ___ days and its treatment regarding the leave account is:",
        o: [
            "30 days; debited to Earned Leave",
            "60 days; debited as EOL",
            "90 days; NOT debited to the leave account",
            "180 days; debited as Half Pay Leave"
        ],
        a: 2,
        e: "Rule 48: Maximum 90 days during the pendency of the inquiry, granted on the recommendation of the Internal Complaints Committee (ICC), and not debited against the leave account."
    },
    {
        q: "Departmental Leave under Rule 49 applies to employees of which department, and what leave salary is paid?",
        o: [
            "All Central Govt departments; full pay",
            "Survey of India staff; 25% of Earned Leave salary",
            "CAPF personnel; 50% pay",
            "Railway employees; half pay"
        ],
        a: 1,
        e: "Rule 49: Departmental Leave is applicable specifically to Survey of India staff. The leave salary is 25% of the Earned Leave salary. It is not debited to the leave account and does not count as duty."
    },
    {
        q: "What is the annual Casual Leave (CL) entitlement for employees who are entitled to 17 Gazetted Holidays, and for employees with disabilities (PWD)?",
        o: [
            "8 days for general; 10 days for PWD",
            "8 days for general; 12 days for PWD (includes 4 additional days)",
            "10 days for general; 14 days for PWD",
            "6 days for general; 8 days for PWD"
        ],
        a: 1,
        e: "CL Orders: 8 days for employees entitled to 17 gazetted holidays; 10 days for those not so entitled (e.g., industrial); 12 days for employees with disabilities (includes 4 additional days)."
    },
    {
        q: "Casual Leave (CL) cannot be combined with which of the following?",
        o: [
            "Special Casual Leave (SCL)",
            "Earned Leave (EL) or Half Pay Leave (HPL)",
            "Restricted Holidays",
            "Gazetted Holidays"
        ],
        a: 1,
        e: "CL Orders: Casual Leave can be combined with Special Casual Leave (SCL) but cannot be combined with regular leave (EL/HPL) or joining time."
    },
    {
        q: "What is the Special Casual Leave (SCL) entitlement for a female Government servant undergoing Tubectomy?",
        o: ["3 working days", "5 working days", "7 working days", "10 working days"],
        a: 3,
        e: "SCL Orders: A female Government servant undergoing tubectomy is entitled to 10 working days of SCL (also 10 days for second-time failure). Compare: male for vasectomy gets 5 working days; male for wife's tubectomy gets 3 working days."
    },
    {
        q: "What is the Special Casual Leave admissible for donating a major organ?",
        o: ["14 days", "21 days", "30 days", "42 days"],
        a: 3,
        e: "SCL Orders: Organ Donation of a major organ entitles the employee to a maximum of 42 days of SCL. This is separate from and unlinked to the general 30-day SCL limit for sports/other purposes."
    },
    {
        q: "Under SCL for Union Activities, what is the entitlement for office bearers of a recognized service association?",
        o: ["5 days", "10 days", "20 days", "30 days"],
        a: 2,
        e: "SCL Orders — Union Activities: Office bearers of recognized associations: 20 days; Outstation delegates: 10 days; Local delegates: 5 days per calendar year."
    },
];
