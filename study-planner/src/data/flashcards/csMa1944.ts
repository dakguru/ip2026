import { RawQuestion } from '../quizzes';

export const cs_ma_set1: RawQuestion[] = [
    {
        q: "To which of the following groups are the Central Services (Medical Attendance) Rules, 1944 NOT applicable?",
        o: [
            "Person appointed to the Central Civil Services",
            "Person employed in the Civil post under the Central Government",
            "Person covered by the Central Government Health Scheme (CGHS)",
            "Person on deputation from State Government serving under the Central Government"
        ],
        a: 2,
        e: "The CS (MA) Rules apply to all Central Government employees except those covered by the CGHS, which is a separate scheme for specific cities."
    },
    {
        q: "Under the CS (MA) Rules, what is the monthly income limit for a family member to be considered a dependent of the Government servant?",
        o: ["Rs. 3,500 + DA", "Rs. 6,000 + DA", "Rs. 9,000 + DA", "Rs. 12,000 + DA"],
        a: 2,
        e: "A family member is treated as dependent if their total monthly income from all sources does not exceed Rs. 9,000 plus the applicable Dearness Relief."
    },
    {
        q: "Who is the 'Authorized Medical Attendant' (AMA) for a Government servant whose pay is Level 1 to Level 5 of the Pay Matrix?",
        o: [
            "Medical Officer (MO) / Assistant Surgeon",
            "Civil Surgeon / Chief Medical Officer (CMO)",
            "Director of Health Services",
            "Private practitioner authorized by the head of office"
        ],
        a: 0,
        e: "For employees in Pay Level 1 to 5, the Authorized Medical Attendant (AMA) is typically a Medical Officer or an Assistant Surgeon belonging to the State or Central Government service."
    },
    {
        q: "Which of the following justifies the appointment of a 'Special Authorized Medical Attendant'?",
        o: [
            "If the employee is a Gazetted Officer",
            "If the employee is posted in a rural area",
            "If specialized treatment is required that the normal AMA cannot provide",
            "If the employee is on Earned Leave for more than 30 days"
        ],
        a: 2,
        e: "A Special AMA (Consultant/Specialist) is authorized when the patient requires specialized treatment or consultation that the normal AMA is not qualified to provide."
    },
    {
        q: "In the case of a male Government servant, which of the following is NOT included in the definition of 'Family'?",
        o: [
            "Parents residing with and wholly dependent on the employee",
            "Unmarried sisters residing with and wholly dependent on the employee",
            "Married daughters visiting the employee during school vacations",
            "Widowed sisters residing with and wholly dependent on the employee"
        ],
        a: 2,
        e: "The definition of family includes dependent parents and unmarried/widowed sisters. Married daughters (unless widowed/deserted/divorced) are not included."
    },
    {
        q: "What is the rule regarding the 'residence' of dependent parents to qualify for medical attendance?",
        o: [
            "They must reside with the Government servant at his place of duty",
            "They can reside anywhere in India",
            "They must reside in the hometown declared for LTC",
            "They must reside in a CGHS covered city"
        ],
        a: 0,
        e: "Under CS (MA) Rules, dependent parents must generally reside with the Government servant at the place of his duty to be eligible for treatment/reimbursement."
    },
    {
        q: "Can a Government servant claim medical reimbursement for his 'Stepmother'?",
        o: [
            "No, only the biological mother is eligible",
            "Yes, if she resides with and is wholly dependent on him",
            "Only if his biological mother is not alive",
            "Only if the stepmother has no children of her own"
        ],
        a: 1,
        e: "A stepmother is included in the definition of 'family' under Medical Attendance Rules, provided she resides with the employee and meets the dependency criteria."
    },
    {
        q: "If both husband and wife are Central Government servants, how is the medical facility availed?",
        o: [
            "Both must claim separately for themselves only",
            "One can opt for the family, or both can claim separately for different family members",
            "Only the husband is allowed to claim for the children",
            "Only the wife is allowed to claim for the children"
        ],
        a: 1,
        e: "If both are Government servants, they have the option to choose who will claim for the family by submitting a joint declaration."
    },
    {
        q: "Who is the Authorized Medical Attendant (AMA) for a Gazetted Officer whose pay is Level 6 and above?",
        o: ["Medical Officer", "Assistant Surgeon Grade II", "Civil Surgeon / CMO / Specialist in Govt Hospital", "Staff Nurse with 10 years experience"],
        a: 2,
        e: "For Gazetted Officers and higher levels, the AMA is normally a Civil Surgeon, Chief Medical Officer, or a Specialist in a Government hospital."
    },
    {
        q: "What is the maximum number of 'consultations' at the AMA's room allowed for a single spell of illness?",
        o: ["2 consultations", "4 consultations", "10 consultations", "No limit"],
        a: 1,
        e: "For a single spell of illness, the AMA is generally allowed to charge for a maximum of four consultations."
    },
    {
        q: "Under what condition is 'medical attendance at residence' allowed for a Government servant?",
        o: [
            "If the employee is a Grade I officer",
            "If the residence is more than 5 km from the hospital",
            "If the patient is so ill that he cannot travel to the hospital",
            "If the employee is on maternity leave"
        ],
        a: 2,
        e: "Medical attendance at the patient's residence is allowed only if the patient's condition is so serious that it is unsafe or impossible to move him."
    },
    {
        q: "Is a Government servant entitled to reimbursement for 'Nursing' charges in a hospital?",
        o: [
            "No, nursing is always part of hospital service",
            "Yes, for all employees",
            "Yes, if the AMA certifies that a special nurse was essential for recovery",
            "Only for Group A officers"
        ],
        a: 2,
        e: "Reimbursement for special nursing is allowed only if the AMA certifies that the hospital's routine nursing was insufficient and a private nurse was essential."
    },
    {
        q: "For the purpose of dependency, what constitutes 'Monthly Income'?",
        o: ["Only basic pay", "Basic pay + All allowances", "Total income from all sources including pension/stipend", "Only rental income"],
        a: 2,
        e: "Monthly income means the total income from all sources, including pension (before commutation), stipend, and rental income."
    },
    {
        q: "Are 'Apprentices' in Central Government service eligible for CS (MA) Rules?",
        o: [
            "No, they are not regular employees",
            "Only if they are paid a salary instead of a stipend",
            "Yes, they are eligible for the same benefits as regular employees",
            "Only during the second year"
        ],
        a: 2,
        e: "Apprentices who are entitled to the benefits of Government service under their terms of apprenticeship are covered under Medical Attendance Rules."
    },
    {
        q: "If an employee's dependent sister gets married, when does her eligibility for reimbursement cease?",
        o: ["Immediately from the date of marriage", "At the end of the block year", "When she reaches 25", "When she moves out"],
        a: 0,
        e: "Once a dependent sister gets married, she ceases to be part of the Government servant's family for medical reimbursement purposes."
    },
    {
        q: "Which of the following is excluded from 'Medical Attendance' under the rules?",
        o: ["Consultation at AMA clinic", "Hospital treatment", "Patient's journey TA", "Cosmetic surgery for aesthetic reasons"],
        a: 3,
        e: "Treatment for purely aesthetic or cosmetic reasons (without any underlying injury or deformity) is not covered for reimbursement."
    },
    {
        q: "Is a Government servant eligible for reimbursement for 'Homeopathic' treatment?",
        o: [
            "No, only Allopathy is covered",
            "Yes, from recognized AYUSH practitioners in Govt/recognized hospitals",
            "Only if Allopathy fails",
            "Only for minor ailments"
        ],
        a: 1,
        e: "Treatment can be taken from recognized practitioners/hospitals of Homeopathy, Ayurveda, Siddha, and Unani (AYUSH)."
    },
    {
        q: "What is the rule regarding reimbursement for 'Dental Treatment' under CS (MA) Rules?",
        o: [
            "Not admissible at all",
            "Only for major surgeries",
            "Admissible for curative treatments (extractions, filling, RCT) in Govt hospitals",
            "Only for senior citizens"
        ],
        a: 2,
        e: "Curative dental treatment is admissible, but purely cosmetic procedures or costly aesthetic implants are generally restricted."
    },
    {
        q: "Can a 'Retired' Government servant avail of facilities under the CS (MA) Rules, 1944?",
        o: ["Yes, if they served for 20 years", "No, it applies only to currently serving employees", "Yes, in non-CGHS areas", "Only for surgeries"],
        a: 1,
        e: "CS (MA) Rules are specifically for serving employees. Retired employees are covered under CGHS or Fixed Medical Allowance (FMA)."
    },
    {
        q: "What is the accommodation entitlement for basic pay up to Rs. 47,600?",
        o: ["Private Ward", "Semi-private Ward", "General Ward", "Deluxe Ward"],
        a: 2,
        e: "Employees with basic pay up to Rs. 47,600 are entitled to 'General Ward' accommodation."
    },
    {
        q: "Above what Basic Pay level is an employee entitled to a 'Private Ward'?",
        o: ["Above Rs. 47,600", "Above Rs. 63,100", "Above Rs. 35,400", "Above Rs. 90,000"],
        a: 1,
        e: "Employees with Basic Pay above Rs. 63,100 are entitled to 'Private Ward' accommodation."
    },
    {
        q: "If an employee desires to be treated by a Specialist at a different station, what is required?",
        o: [
            "Prior permission from HOD",
            "Certificate from local AMA that treatment is essential and not available locally",
            "Recommendation from an MP",
            "No permission required"
        ],
        a: 1,
        e: "Referrals to outstation specialists must be supported by a certificate from the local AMA stating that the treatment is necessary and unavailable locally."
    },
    {
        q: "Are 'Tonics' and 'Vitamins' reimbursable under CS (MA) Rules?",
        o: ["Yes, if prescribed", "Only for children", "Generally NO, except for specific deficiency diseases", "Only if under Rs. 500"],
        a: 2,
        e: "Items that are nutritional or prophylactic (like vitamins/tonics) are not reimbursed unless prescribed for a specific deficiency disease as part of curative treatment."
    },
    {
        q: "What constitutes 'Medical Attendance' for a patient under the rules?",
        o: ["Only consultation", "Consultation + Diagnostic tests + Injections", "Only medicines", "Consultation + Travel + Food"],
        a: 1,
        e: "Medical attendance includes consultation, diagnostic tests (X-Ray, Pathological), and procedures (Injections, Nursing) required for cure."
    },
    {
        q: "In a station where there is NO Government hospital, how is the AMA decided?",
        o: [
            "User can go to any private clinic",
            "Govt appoints a private medical practitioner as AMA",
            "Must travel to nearest town",
            "Only DM can authorize"
        ],
        a: 1,
        e: "In stations without Govt hospitals, the Government designates local private practitioners as AMAs for its employees."
    }
];

export const cs_ma_set2: RawQuestion[] = [
    {
        q: "What is the entitlement regarding 'Diet Charges' during hospitalization?",
        o: [
            "Fully reimbursable for all",
            "No diet charges are ever reimbursed",
            "Reimbursable for basic pay up to Rs. 44,900",
            "Reimbursable only for TB or Leprosy"
        ],
        a: 2,
        e: "Employees whose basic pay is up to Rs. 44,900 are entitled to reimbursement or free diet during hospital stay."
    },
    {
        q: "If an employee in Level 7 is treated for 'Cancer' or 'Mental Illness', are his diet charges reimbursable?",
        o: [
            "No, he exceeds the pay limit",
            "Yes, diet charges are fully reimbursable for these specific diseases regardless of pay",
            "Only in a sanatorium",
            "Only for 30 days"
        ],
        a: 1,
        e: "Diet charges are reimbursed for all employees during treatment for Cancer, Mental Illness, TB, and Leprosy, regardless of pay level."
    },
    {
        q: "What is the rule regarding the 'consultation fee' charged by a private practitioner appointed as an AMA?",
        o: [
            "AMA can charge any fee",
            "Fee is fixed by Central Govt and fully reimbursable",
            "Govt pays directly to AMA",
            "Not reimbursable"
        ],
        a: 1,
        e: "The consultation fees for private AMAs are fixed by the Government and are reimbursable to the employee."
    },
    {
        q: "Can an employee be reimbursed for the cost of 'Oxygen' used during treatment?",
        o: ["No", "Yes, the actual cost of cylinders used is reimbursable", "Only for cardiac surgeries", "Only in ICU"],
        a: 1,
        e: "Essential medicines and life-support items like oxygen used during treatment are admissible for reimbursement."
    },
    {
        q: "What is the rule regarding 'Specialist consultation fee' at the patient's residence?",
        o: [
            "Permitted for all Gazetted officers",
            "Only if AMA certifies the patient was too ill to be moved",
            "Prohibited",
            "Only for relatives"
        ],
        a: 1,
        e: "Consultations at the residence are exceptional and require a specific certificate from the AMA."
    },
    {
        q: "If an employee stays in a 'General Ward' despite being entitled to 'Private Ward', what is reimbursed?",
        o: ["No difference paid", "Actual room charges for General Ward", "Cash incentive", "Private Ward charges"],
        a: 1,
        e: "Reimbursement is restricted to actual expenses or entitlement, whichever is lower. Staying in a lower ward means reimbursement of actual lower charges."
    },
    {
        q: "Is a Government servant entitled to reimbursement for 'Blood Transfusion' charges?",
        o: ["No", "Yes, for cost of blood from recognized banks and transfusion charges", "Only for hemophilia", "Only for hospital-owned banks"],
        a: 1,
        e: "Charges for blood and transfusion from recognized and licensed blood banks are admissible."
    },
    {
        q: "Can an employee claim for 'Pathological Tests' done in a private laboratory?",
        o: [
            "Only if within 1 km",
            "Yes, if referred by the MO because facility was unavailable at Govt hospital",
            "Always",
            "Only if over Rs. 500"
        ],
        a: 1,
        e: "Private lab tests are reimbursable if referred by the AMA because the facility was unavailable at the Government hospital."
    },
    {
        q: "What is the rule regarding the 'Essentiality Certificate' (Form B)?",
        o: [
            "Filled by patient's family",
            "Mandatory certificate signed by AMA certifying treatment was essential",
            "Certificate of birth",
            "Signed by Head of Office"
        ],
        a: 1,
        e: "The Essentiality Certificate (signed by the MO) is mandatory for any medical claim to certify the admissibility of treatment and medicines."
    },
    {
        q: "For an employee in Pay Level 8, what is the ward entitlement in a private empanelled hospital?",
        o: ["Private Ward", "Semi-private Ward", "General Ward", "Deluxe Ward"],
        a: 1,
        e: "Employees in Pay Levels 7 to 11 are entitled to 'Semi-private Ward' accommodation."
    },
    {
        q: "Can 'Surgical Charges' for procedures in private recognized hospitals be reimbursed?",
        o: [
            "No, only in Govt hospitals",
            "Yes, but limited to the CGHS or approved package rates",
            "Full reimbursement",
            "Only for Govt surgeons"
        ],
        a: 1,
        e: "The Government reimburses the actual amount or the approved package rate (CGHS rate), whichever is lower, for procedures in recognized private hospitals."
    },
    {
        q: "What is the normal maximum duration for 'outdoor treatment' for a single illness?",
        o: ["10 days", "20 days", "3 months", "No limit"],
        a: 1,
        e: "AMA outdoor treatment is typically limited to 10-20 days; if not recovered, the patient is referred to a specialist or hospital."
    },
    {
        q: "Can an employee be reimbursed for 'Insulin' for a diabetic family member?",
        o: ["No", "Yes, as it is curative and essential", "Only for Type 1", "Only for minors"],
        a: 1,
        e: "Insulin is an admissible curative medicine for reimbursement under the rules."
    },
    {
        q: "For 'Sanatorium' treatment for TB, what charges are admissible?",
        o: ["Only fare", "Only special nursing", "Fees, diet, and medicines as per sanatorium rules", "None"],
        a: 2,
        e: "For TB patients in recognized sanatoriums, all fees, diet charges, and essential medicines charged by the institution are admissible."
    },
    {
        q: "Is 'Physiotherapy' treatment reimbursable?",
        o: ["No", "Yes, if prescribed post-surgery/injury and performed at a recognized hospital", "Only for seniors", "Only over 10 sessions"],
        a: 1,
        e: "Physiotherapy is admissible if it is curative post-surgery or injury and performed at a recognized medical institution."
    },
    {
        q: "Can an employee claim for treatment while on 'Leave' at a different station?",
        o: ["No, must return to headquarters", "Yes, can consult the local AMA of that station", "Only for leave > 15 days", "Only for accidents"],
        a: 1,
        e: "Employees and family can avail medical facilities at any station in India where they are temporarily staying (e.g., on leave or tour)."
    },
    {
        q: "What is the rule regarding the cost of 'Heart Valve Replacement'?",
        o: ["Cap of Rs. 10,000", "Full reimbursement", "Admissible subject to Govt ceiling rates/approved implants", "Only for age > 50"],
        a: 2,
        e: "Implant costs like heart valves or pacemakers are subject to specific ceiling rates fixed by the Government."
    },
    {
        q: "For 'Maternity' (Childbirth), how many children are covered for reimbursement?",
        o: ["First child only", "Two children", "Three children", "No limit"],
        a: 1,
        e: "Reimbursement for maternity expenses is restricted to the first two children in accordance with the small family norm."
    },
    {
        q: "Is the consultation fee paid to a Government doctor (allowed private practice) reimbursable?",
        o: ["No", "Yes, if the doctor is the AMA for the employee", "Only Gazetted", "Only Sundays"],
        a: 1,
        e: "If a Govt doctor is authorized for private practice and is the designated AMA, the fee is reimbursable."
    },
    {
        q: "If dependent parents stay with a brother (non-Govt) in another city, can the employee claim their costs?",
        o: ["Yes", "No, they must reside with the Govt servant at his station", "Only if brother earns < Rs. 5000", "Only for hospitalisation"],
        a: 1,
        e: "Dependency for medical purposes requires 'residing with' the employee. If they stay elsewhere with others, they are ineligible for that period."
    },
    {
        q: "Are charges for routine health check-ups (X-ray/ECG) reimbursable?",
        o: ["Yes, once a year", "No, only if done for diagnosis of an actual illness", "Only for age > 40", "Only if abnormal"],
        a: 1,
        e: "Routine check-ups are not covered; diagnostic tests must be part of actual treatment for a disease."
    },
    {
        q: "Can an employee be reimbursed for treatment at a 'Private Nursing Home' not recognized by Govt?",
        o: ["Yes, for any ailment", "No, only for Govt or specifically recognized hospitals", "Only if within 5 km", "Only Gazetted"],
        a: 1,
        e: "Reimbursement is strictly limited to Government hospitals or recognized/empanelled private hospitals."
    },
    {
        q: "What is the rule regarding reimbursement of 'Special Nursing' in an ICU?",
        o: ["Full reimbursement", "Never allowed", "Usually not reimbursed as ICU packages are comprehensive", "Only if no ICU nurse"],
        a: 2,
        e: "ICU package rates are comprehensive and include specialized nursing, so separate nursing claims are rarely admitted."
    },
    {
        q: "Can an employee get an 'Advance' for a major heart surgery in a private recognized hospital?",
        o: ["No", "Yes, up to 90% of the estimated cost", "Only up to Rs. 50,000", "Only with bank guarantee"],
        a: 1,
        e: "For major inpatient treatments, a medical advance up to 90% of the estimated cost can be granted."
    },
    {
        q: "What is the rule for 'Abortion' (Termination of Pregnancy) reimbursement?",
        o: ["Not admissible", "Admissible for therapeutic reasons (medical necessity)", "Admissible for elective ones", "Only first occasion"],
        a: 1,
        e: "Abortion is admissible if medically necessary to protect the life/health of the mother, as per the MTP Act."
    }
];

export const cs_ma_set3: RawQuestion[] = [
    {
        q: "What is the requirement for reimbursement of 'Emergency Treatment' in a private unrecognized hospital?",
        o: [
            "Minister's permission",
            "AMA certificate stating condition was life-threatening and immediate treatment was essential",
            "Police report",
            "MP recommendation"
        ],
        a: 1,
        e: "Emergency treatment in unrecognized hospitals is only allowed if it's certified as a genuine life-threatening emergency by a government MO/AMA."
    },
    {
        q: "Within what period must a claim for 'outdoor treatment' (OPD) be submitted?",
        o: ["3 months", "6 months", "1 year", "No limit"],
        a: 1,
        e: "Claims for outdoor treatment (OPD) must be submitted within six months of the date of completion of treatment."
    },
    {
        q: "Within what period must a claim for 'hospitalisation' cases be submitted?",
        o: ["3 months", "6 months", "1 year", "2 years"],
        a: 1,
        e: "For inpatient treatment, the claim must be submitted within six months from the date of discharge."
    },
    {
        q: "What happens if a medical claim is submitted after the six-month limit?",
        o: [
            "Automatically rejected",
            "Can be condoned by HOD for valid reasons",
            "Reduced by 10%",
            "Must be approved by AG"
        ],
        a: 1,
        e: "HODs have the power to condone the delay in medical claim submission if valid justifications are provided."
    },
    {
        q: "Who is eligible for the 'Fixed Medical Allowance' (FMA)?",
        o: ["All serving employees", "Pensioners residing in non-CGHS areas", "Employees with no claims", "Senior officers only"],
        a: 1,
        e: "FMA is only for pensioners. Serving employees get actual reimbursement based on claims."
    },
    {
        q: "Which item is EXPLICITLY 'Non-admissible' under Schedule I?",
        o: ["Antibiotics", "Glucose powders", "Insulin", "IV Fluids"],
        a: 1,
        e: "Glucose powders and nutritional supplements are in the non-admissible list as they are considered food, not medicine."
    },
    {
        q: "Is the cost of 'Hand Sanitizer' and 'Face Masks' typically reimbursable?",
        o: ["Yes", "Only for surgeons", "No, these are hygiene products/consumables", "Only during pandemic"],
        a: 2,
        e: "Hygiene products and consumables are generally not part of 'curative treatment' for reimbursement under standard rules."
    },
    {
        q: "Does the CS (MA) Rules cover 'Spectacles' (Eye-glasses) reimbursement?",
        o: ["Yes", "Only for seniors", "Generally NO", "Only if power > 5.0"],
        a: 2,
        e: "Common spectacles and vision-correcting surgeries like LASIK are currently NOT admissible for reimbursement."
    },
    {
        q: "Can an employee get reimbursement for a 'Hearing Aid'?",
        o: ["Yes, once a year", "No", "Yes, if prescribed by ENT Specialist (subject to Govt ceiling)", "Only for 100% loss"],
        a: 2,
        e: "Hearing aids are admissible subject to fixed ceiling rates set by the Government."
    },
    {
        q: "What is the consequence of submitting a 'False/Bogus' medical claim?",
        o: ["Only rejection", "Penalty only", "Potential removal from service after disciplinary action", "All of the above"],
        a: 2,
        e: "Fraudulent medical claims are treated as serious misconduct leading to recovery and major penalties, including dismissal."
    },
    {
        q: "What is the requirement for 'Treatment Abroad'?",
        o: ["PM's approval", "Medical Board recommendation + Health/Finance Ministry sanction", "Referral from AMA only", "Never allowed"],
        a: 1,
        e: "Treatment abroad requires a high-level medical board recommendation and explicit approval from the Ministry of Health."
    },
    {
        q: "Can a family member who is also a Govt servant claim as a dependent?",
        o: ["Yes", "No, they must claim from their own department", "Only if salary is low", "Only for spouse"],
        a: 1,
        e: "A Govt servant has their own eligibility and cannot be treated as a dependent by another Govt servant for medical claims."
    },
    {
        q: "When a patient is referred to a Specialist in another city, who gets TA?",
        o: ["Only patient", "Patient + One attendant if certified as essential", "Only attendant", "No TA"],
        a: 1,
        e: "Patient and an escort (if medically essential) are entitled to travel fare/TA for medical journeys."
    },
    {
        q: "Is reimbursement for 'IVF' treatment allowed?",
        o: ["No", "Yes, up to 3 attempts (subject to package rates/age)", "Only for females", "3 attempts every 5 years"],
        a: 1,
        e: "The Government allows reimbursement for IVF treatment (up to 3 attempts) at established package rates."
    },
    {
        q: "What is the rule for 'Knee Replacement' reimbursement in private hospitals?",
        o: ["Full reimbursement", "Actual or CGHS/approved rate (subject to implant ceiling), whichever is lower", "Not admissible", "Only for age > 60"],
        a: 1,
        e: "Knee replacement is reimbursed according to CGHS package rates and specific ceiling rates for implants."
    },
    {
        q: "Can a Government servant be reimbursed for treatment at 'Railway Hospitals'?",
        o: ["No", "Yes, they are treated as Government hospitals", "Only with Railway Board permission", "Only if nearby"],
        a: 1,
        e: "Railway and Military hospitals are treated as Government hospitals for CS (MA) purposes."
    },
    {
        q: "If an employee on 'Foreign Tour' falls ill, how are the expenses met?",
        o: ["Not reimbursed", "Reimbursed in foreign currency", "By the Indian Mission/Embassy locally", "Travel insurance only"],
        a: 2,
        e: "Medical expenses for employees on official tour abroad are generally met by the relevant Indian Mission/Embassy."
    },
    {
        q: "Is the cost of 'Glucometer strips' used at home reimbursable?",
        o: ["Yes", "Not admissible as it's self-care consumable", "Only monitor is reimbursed", "Only for children"],
        a: 1,
        e: "Routine monitoring devices used at home are not covered under standard CS (MA) reimbursement."
    },
    {
        q: "Can a 'Brother' over 18 years be a dependent?",
        o: ["No", "Only if unmarried, dependent, and minor (or disabled if major)", "Yes, if student", "Only in hometown"],
        a: 1,
        e: "Brothers cease to be dependents at age 18, unless they are mentally or physically disabled."
    },
    {
        q: "If private cost for emergency surgery is Rs 5L but CGHS rate is Rs 2L, how much is reimbursed?",
        o: ["Rs 5 Lakh", "Rs 2 Lakh (CGHS Rate)", "Rs 3.5 Lakh", "Zero"],
        a: 1,
        e: "Reimbursement is limited to the CGHS/approved package rate; the difference must be borne by the employee."
    },
    {
        q: "Is 'Specialist Consultation' in an OPD reimbursable?",
        o: ["Only Gazetted", "Yes, if referred by the primary AMA", "No", "Only for 20 years experience"],
        a: 1,
        e: "OPD specialist consultation is admissible if referred by the Authorized Medical Attendant."
    },
    {
        q: "Are 'Ambulance' charges reimbursable?",
        o: ["Yes, all travel", "Only if > 50km", "Yes, in emergency transport to/between hospitals", "No"],
        a: 2,
        e: "Ambulance charges for emergency transport between hospitals or from residence to hospital are admissible."
    },
    {
        q: "Within what period should a 'Medical Advance' be adjusted?",
        o: ["1 month of discharge/completion", "6 months", "1 year", "No limit"],
        a: 0,
        e: "Medical advances must be adjusted by submitting the final claim within one month of discharge."
    },
    {
        q: "Is treatment for 'Infertility' investigations admissible?",
        o: ["No", "Yes, in Govt/recognized hospitals", "Only for males", "Only Level 11+"],
        a: 1,
        e: "Diagnostic investigations for infertility in Government or recognized hospitals are admissible."
    },
    {
        q: "What is the dependency cutoff for a 'daughter'?",
        o: ["21 years", "25 years", "Until she starts earning or gets married", "Only school completion"],
        a: 2,
        e: "There is no upper age limit for a daughter's dependency as long as she is unmarried/widowed/divorced and meets the income criteria."
    }
];
