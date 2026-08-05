import { RawQuestion } from '../quizzes';

export const cea_rules_set1: RawQuestion[] = [
    {
        q: "Reimbursement of Children Education Allowance (CEA) and Hostel Subsidy can normally be claimed for a maximum of how many children?",
        o: ["One child", "Two eldest surviving children", "Three children", "Any number of dependent children"],
        a: 1,
        e: "• The allowance is strictly limited to the two eldest surviving children, subject to specific, defined exceptions."
    },
    {
        q: "In which of the following scenarios is the Children Education Allowance (CEA) admissible for more than two children?",
        o: ["When the government servant adopts a third child.", "When the second childbirth results in twins or multiple births.", "When the first child passes away before the age of 18.", "When the third child is a Divyang (differently-abled) child."],
        a: 1,
        e: "• The rule provides an explicit exception allowing claims beyond two children if the second childbirth results in multiple births (twins/triplets)."
    },
    {
        q: "What is the current fixed monthly ceiling for Children Education Allowance (CEA) as of 01.01.2024?",
        o: ["Rs. 2,250", "Rs. 2,812.50", "Rs. 3,375", "Rs. 4,500"],
        a: 1,
        e: "• Effective 01.01.2024, the DA reached 50%, triggering an automatic 25% increase in the CEA ceiling from Rs. 2,250 to Rs. 2,812.50 per month."
    },
    {
        q: "What is the revised annual ceiling for Children Education Allowance (CEA) per child effective from 01.01.2024?",
        o: ["Rs. 27,000", "Rs. 33,750", "Rs. 40,500", "Rs. 54,000"],
        a: 1,
        e: "• With the monthly rate increased to Rs. 2,812.50, the annual total becomes Rs. 33,750 per child (2,812.50 × 12)."
    },
    {
        q: "For a Divyang (differently-abled) child, the Children Education Allowance is paid at what rate?",
        o: ["At the normal rate", "1.5 times the normal rate", "Double the normal rate", "Triple the normal rate"],
        a: 2,
        e: "• For children with benchmark disabilities, the CEA is paid at double the normal rate. As of 01.01.2024, this is Rs. 5,625 per month (Rs. 67,500 annually)."
    },
    {
        q: "What is the current monthly ceiling for Hostel Subsidy effective from 01.01.2024?",
        o: ["Rs. 6,750", "Rs. 8,100", "Rs. 8,437.50", "Rs. 10,125"],
        a: 2,
        e: "• The Hostel Subsidy ceiling increased by 25% due to DA reaching 50% w.e.f. 01.01.2024. The old monthly rate of Rs. 6,750 increased by 25% to Rs. 8,437.50 per month (Rs. 6,750 × 1.25 = Rs. 8,437.50)."
    },
    {
        q: "What is the total annual ceiling for Hostel Subsidy per child effective from 01.01.2024?",
        o: ["Rs. 81,000", "Rs. 91,250", "Rs. 1,01,250", "Rs. 1,21,500"],
        a: 2,
        e: "• The revised annual ceiling for Hostel Subsidy is Rs. 1,01,250 per child (Rs. 8,437.50 × 12)."
    },
    {
        q: "For a female government servant who herself has a benchmark disability, what is the revised monthly ceiling for Special Allowance for Child Care effective from 01.01.2024?",
        o: ["Rs. 3,000", "Rs. 3,750", "Rs. 4,500", "Rs. 5,000"],
        a: 1,
        e: "• The Special Allowance for Child Care is payable to female government employees who themselves have benchmark disabilities (not related to whether the child is Divyang). It increased by 25% from Rs. 3,000 to Rs. 3,750 per month w.e.f. 01.01.2024, following DA reaching 50%."
    },
    {
        q: "What is the maximum age limit for a normal child to be eligible for Children Education Allowance?",
        o: ["18 years", "20 years or till the time of passing 12th standard, whichever is earlier", "21 years", "22 years"],
        a: 1,
        e: "• For regular children, the limit is 20 years or passing class 12, whichever is earlier."
    },
    {
        q: "What is the maximum age limit for a Divyang (disabled) child to be eligible for Children Education Allowance?",
        o: ["20 years", "22 years", "25 years", "No age limit"],
        a: 1,
        e: "• For children with benchmark disabilities, the age limit is extended to 22 years."
    },
    {
        q: "From which stage of education is the Children Education Allowance admissible?",
        o: ["From Class 1 only", "From three classes prior to Class 1 up to Class 12", "Only for higher secondary education", "Only for technical and professional courses"],
        a: 1,
        e: "• Admissible for three classes prior to Class 1 up to the 12th standard."
    },
    {
        q: "Is Children Education Allowance admissible for a child who fails in a particular class?",
        o: ["No, it stops immediately upon failure.", "Yes, it is admissible irrespective of passing or failing.", "Only if the failure is in Class 10 or 12.", "Only if a medical certificate is produced."],
        a: 1,
        e: "• CEA is admissible irrespective of the child's performance (pass/fail). However, if the child stays in the same class for more than two years, the allowance is not paid for that class from the third year onwards."
    },
    {
        q: "What is the minimum distance required between the government servant's residence and the hostel for claiming Hostel Subsidy?",
        o: ["More than 10 km", "More than 25 km", "More than 50 km", "More than 100 km"],
        a: 2,
        e: "• Hostel Subsidy is only admissible if the hostel is located more than 50 km away from the government servant's residence."
    },
    {
        q: "Can a government servant claim both Children Education Allowance and Hostel Subsidy for the same child?",
        o: ["No, they are mutually exclusive.", "Yes, both can be claimed concurrently if the conditions are met.", "Only if the child is Divyang.", "Only for the eldest child."],
        a: 1,
        e: "• Both CEA and Hostel Subsidy can be claimed together for the same child."
    },
    {
        q: "Which of the following is an acceptable document for claiming Children Education Allowance (CEA) as per simplified rules?",
        o: ["Original receipts for every month's tuition fee", "A certificate from the Head of Institution confirming the child studied in the school during the previous academic year", "A self-declaration without any supporting documents", "Only the annual result card"],
        a: 1,
        e: "• A simple certificate from the Head of the Institution is sufficient. Alternatively, self-attested copies of the report card or fee receipts for the entire year can be used."
    },
    {
        q: "If both husband and wife are Central Government servants, who is eligible to claim the CEA/Hostel Subsidy?",
        o: ["Both can claim for one child each.", "Only the husband can claim.", "Only one of them can claim for the children.", "Both can claim for all children."],
        a: 2,
        e: "• Only one parent is eligible to claim the allowance, even if both are government servants."
    },
    {
        q: "Is CEA admissible for a child attending a 'Special School' for the disabled which is not a regular school?",
        o: ["No", "Yes, provided the school is recognized by the Central/State Government or UT administration.", "Only if it is a Government school.", "Only if the child is below 10 years."],
        a: 1,
        e: "• Admissible if the special school is recognized by the government or authorized bodies like the Rehabilitation Council of India."
    },
    {
        q: "If a government servant dies while in service, how long is the Children Education Allowance admissible for their children?",
        o: ["It stops immediately on the date of death.", "Admissible till the end of the current academic year only.", "Admissible till the children complete their education (up to 12th) or reach the age limit, provided the spouse/child does not get a government job.", "Admissible for 2 years from the date of death."],
        a: 2,
        e: "• The allowance continues until the children finish 12th standard or reach the age limit, provided they remain eligible and the family doesn't gain other government employment."
    },
    {
        q: "What is the rule regarding CEA for a child who undergoes a diploma course in a polytechnic?",
        o: ["Not admissible as it is not a school course.", "Admissible if the child joins the course after 10th standard, as it is equivalent to classes 11 and 12.", "Admissible only if the diploma is in a medical field.", "Only admissible for the first year of the diploma."],
        a: 1,
        e: "• Admissible for diploma courses in polytechnics if taken after class 10, treating it as equivalent to classes 11 and 12."
    },
    {
        q: "Can Children Education Allowance be claimed for education through 'Open' or 'Distance' learning?",
        o: ["No, only regular schooling is allowed.", "Yes, for classes 11 and 12, provided the school is recognized by a Board/Council.", "Yes, for all classes from 1 to 12.", "Only for Divyang children."],
        a: 1,
        e: "• Admissible for classes 11 and 12 through recognized open/distance learning platforms."
    },
    {
        q: "Is Children Education Allowance admissible during the period of 'Suspension' of a government servant?",
        o: ["No", "Yes, it remains admissible as it is a welfare measure.", "Only 50% of the amount is paid.", "Only for one child."],
        a: 1,
        e: "• The allowance is admissible during suspension."
    },
    {
        q: "What happens to the admissibility of CEA if a government servant is 'Dismissed' or 'Removed' from service?",
        o: ["It continues till the end of the academic year.", "It ceases from the date of dismissal or removal.", "It continues for 6 months.", "It is paid as a one-time lump sum."],
        a: 0,
        e: "• The CEA and Hostel Subsidy remain admissible till the end of the academic year in which the dismissal or removal occurs."
    },
    {
        q: "Can CEA be claimed for a child who is 'Married' but still below 20 years of age?",
        o: ["Yes", "No, a married child is not considered a dependent.", "Only if the spouse is also a student.", "Only for female children."],
        a: 1,
        e: "• Married children are not eligible."
    },
    {
        q: "What is the frequency for claiming the reimbursement of Children Education Allowance?",
        o: ["Monthly", "Quarterly", "Half-yearly", "Annually, after the completion of the academic year"],
        a: 3,
        e: "• Claimed once a year after the academic year ends."
    },
    {
        q: "Which of the following classes are NOT covered under the CEA scheme?",
        o: ["Nursery", "LKG", "UKG", "Play School/Pre-Nursery"],
        a: 3,
        e: "• Admissible only for two classes before Class 1 (Nursery, LKG, UKG). Play schools or pre-nursery are not included."
    },
    {
        q: "Is the cost of 'Uniform', 'Shoes', and 'Books' reimbursed separately under the current CEA rules?",
        o: ["Yes, on production of receipts.", "No, it is part of the fixed monthly ceiling.", "Only for BPL employees.", "Only if DA is below 50%."],
        a: 1,
        e: "• Under the 7th CPC, it is a consolidated fixed allowance. No separate reimbursement for books, uniforms, etc., is allowed."
    },
    {
        q: "If a government servant is on 'Extraordinary Leave' (EOL) without medical certificate, is CEA admissible?",
        o: ["No", "Yes, it is admissible.", "Only for the first 30 days.", "Only if sanctioned by the Head of Department."],
        a: 1,
        e: "• CEA is admissible during EOL (with or without medical certificate). Since CEA is an annual reimbursement for the child's actual educational expenditure — not a monthly pay component — it is not suspended during EOL. The child's education is uninterrupted regardless of the parent's leave status. (DoPT has clarified this position consistent with the 7th CPC CEA framework.)"
    },
    {
        q: "What is the rule for CEA in respect of 'Step-children'?",
        o: ["Not admissible.", "Admissible provided they are legally recognized as part of the family and are dependent.", "Only if biological children are not there.", "Only if the step-parent is the mother."],
        a: 1,
        e: "• Admissible for step-children and legally adopted children."
    },
    {
        q: "When can the 'Hostel Subsidy' be claimed if the expenditure is less than the fixed ceiling?",
        o: ["The full ceiling amount is paid regardless of expenditure.", "The actual expenditure incurred or the ceiling, whichever is less, is paid.", "Only 50% of the ceiling is paid.", "The claim is rejected."],
        a: 1,
        e: "• For Hostel Subsidy, the amount is the actual expenditure or the ceiling, whichever is lower. (Unlike CEA which is a fixed grant)."
    },
    {
        q: "If a child resides with a 'Guardian' or 'Relative' in a different city, can Hostel Subsidy be claimed?",
        o: ["Yes", "No, it is only for children staying in a hostel of a recognized residential school/institution.", "Only if the relative is a government servant.", "Only if the distance is > 200 km."],
        a: 1,
        e: "• Specifically for stay in a recognized hostel of a residential school."
    },
    {
        q: "Is CEA admissible for education in 'Foreign Countries'?",
        o: ["No", "Yes, if the government servant is posted in an Indian Mission abroad and the child is with them.", "Yes, for any employee whose child studies abroad.", "Only for children of Group A officers."],
        a: 1,
        e: "• Only for employees posted abroad in Indian Missions, for children studying in that country or recognized schools in India."
    }
];
