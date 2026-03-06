import { RawQuestion } from '../quizzes';

export const cea_rules_set1: RawQuestion[] = [
    {
        q: "For how many children is the Children Education Allowance (CEA) admissible for a Government servant?",
        o: [
            "Only the first child",
            "Up to the two eldest surviving children",
            "All three children if the third is a girl",
            "No limit as long as they are dependent"
        ],
        a: 1,
        e: "CEA is admissible for the two eldest surviving children only. An exception exists for the birth of twins/triplets as the second child."
    },
    {
        q: "What is the current fixed monthly ceiling for Children Education Allowance (CEA)?",
        o: ["Rs. 1,500 per month", "Rs. 2,250 per month", "Rs. 3,000 per month", "Rs. 6,750 per month"],
        a: 1,
        e: "As per the 7th Pay Commission recommendations, the CEA is fixed at Rs. 2,250 per month (total Rs. 27,000 per year)."
    },
    {
        q: "What happens to the CEA amount if the Dearness Allowance (DA) increases by 50%?",
        o: ["It remains the same", "It increases by 50%", "It increases by 25%", "It is doubled"],
        a: 2,
        e: "The ceiling of CEA and Hostel Subsidy shall be automatically raised by 25% every time the Dearness Allowance (DA) goes up by 50%."
    },
    {
        q: "For 'Divyang' (children with disabilities), the fixed amount of CEA is:",
        o: [
            "Same as regular children (Rs. 2,250)",
            "1.5 times the regular amount",
            "Double the regular amount (Rs. 4,500 per month)",
            "Fully waived"
        ],
        a: 2,
        e: "For children with benchmark disabilities, the CEA is paid at double the normal rate, i.e., Rs. 4,500 per month."
    },
    {
        q: "From which classes is the CEA admissible for a child?",
        o: ["Only from Class 1", "From Class 1 to 10", "From Nursery/LKG/UKG to 12th standard", "Only for Degree courses"],
        a: 2,
        e: "CEA is admissible from two classes before class one (Nursery, LKG, UKG) up to 12th standard."
    },
    {
        q: "What is the age limit for a 'Normal' child to receive CEA?",
        o: ["18 years", "20 years (or completion of 12th, whichever is earlier)", "21 years", "25 years"],
        a: 1,
        e: "For a regular child, the allowance is admissible till they complete the 12th standard or reach 20 years of age."
    },
    {
        q: "What is the age limit for a 'Disabled' (Divyang) child for the purpose of CEA?",
        o: ["20 years", "22 years", "25 years", "No limit"],
        a: 1,
        e: "In the case of a child with a benchmark disability, the age limit is 22 years instead of 20 years."
    },
    {
        q: "If both husband and wife are Central Government servants, who can claim the CEA?",
        o: [
            "Both can claim for one child each",
            "Both can claim for both children",
            "Only one of them can claim for the children",
            "Only the mother is allowed to claim"
        ],
        a: 2,
        e: "If both spouses are employees, only one can claim the allowance for their children."
    },
    {
        q: "Can CEA be claimed even if the child 'Fails' (Detained) in a particular class?",
        o: ["No", "Yes, there is no restriction that the child must pass the class", "Only for the first failure", "Only for class 1 to 5"],
        a: 1,
        e: "CEA is admissible irrespective of whether the child passes or fails. However, it cannot be claimed for the same class for more than two years."
    },
    {
        q: "Is CEA admissible for correspondence or distance learning courses?",
        o: ["No", "Only if the school is recognized", "Yes, for classes 11th and 12th if the school/board is recognized", "Only for Group A"],
        a: 2,
        e: "CEA is admissible for classes 11th and 12th through recognized open/distance learning schools recognized by a Board."
    },
    {
        q: "Can a Government servant claim CEA for a child who is or has been 'Married'?",
        o: ["Yes, if they are below 20", "No, as they are no longer dependent", "Only for daughters", "Only with permission"],
        a: 1,
        e: "A married child is not considered a dependent and is therefore not eligible for CEA."
    },
    {
        q: "If a servant 'Stops serving' during the middle of the academic year (e.g. death), is CEA admissible for the full year?",
        o: ["No", "Yes, for the entire academic year even if the employee retires or dies", "Only for 3 months", "Only if over 10 years old"],
        a: 1,
        e: "If a servant ceases service due to retirement or death, CEA is admissible till the end of that academic year."
    },
    {
        q: "Does CEA cover children attending 'Polytechnic' or 'Diploma' courses?",
        o: ["No", "Yes, if taken after 10th (equivalent to class 11-12)", "Only Group D", "Only Engineering"],
        a: 1,
        e: "CEA is admissible for diploma courses in polytechnics if joined after 10th standard and treated as equivalent to class 11 and 12."
    },
    {
        q: "Are 'Hostel Subsidy' and 'CEA' mutually exclusive?",
        o: ["Yes", "No, an employee can claim both CEA and Hostel Subsidy for the same child", "Only for disabled", "Only if distance > 100km"],
        a: 1,
        e: "An employee can claim both CEA and Hostel Subsidy for the same child simultaneously."
    },
    {
        q: "Reimbursement of CEA for an academic year is done:",
        o: ["Monthly", "Quarterly", "Annually (after end of academic year)", "At retirement"],
        a: 2,
        e: "Reimbursement of CEA is typically done once a year after completion of the academic year."
    },
    {
        q: "What is the current fixed monthly ceiling for 'Hostel Subsidy'?",
        o: ["Rs. 2,250", "Rs. 4,500", "Rs. 6,750 per month", "Rs. 9,000"],
        a: 2,
        e: "The monthly ceiling for Hostel Subsidy is fixed at Rs. 6,750 (total Rs. 81,000 per year)."
    },
    {
        q: "What is the minimum 'Distance' required between residence and hostel for Hostel Subsidy?",
        o: ["10 km", "25 km", "50 km", "100 km"],
        a: 2,
        e: "Hostel Subsidy is only admissible if the hostel is at least 50 kilometers away from the employee's residence."
    },
    {
        q: "How is the reimbursement for CEA currently claimed (simplified 2018 rules)?",
        o: [
            "Original receipts for every item",
            "Certificate from HOI confirming the child studied in the school during the year",
            "Marksheet only",
            "No evidence required"
        ],
        a: 1,
        e: "An employee only needs to submit a certificate from the Head of the Institution (HOI) confirming study for the year."
    },
    {
        q: "What alternate proof is acceptable if HOI certificate is unavailable?",
        o: ["Self-declaration", "Self-attested copy of report card or full-year fee receipts", "Certificate from Gazetted", "Not admissible"],
        a: 1,
        e: "Self-attested copies of the report card or full-year fee receipts are acceptable alternatives."
    },
    {
        q: "What documented proof is mandatory for 'Hostel Subsidy'?",
        o: [
            "Self-declaration",
            "Certificate from HOI (study + hostel stay) or self-attested receipts for boarding/lodging",
            "Marksheet",
            "Medical certificate"
        ],
        a: 1,
        e: "Hostel subsidy requires proof of hostel stay and expenditure via HOI certificate or self-attested receipts."
    },
    {
        q: "For children with 'Disability,' what is the rule regarding school recognition?",
        o: ["Govt school only", "Govt/Govt-aided or recognized by RCI/State/Central Govt", "Any private school", "Not admissible"],
        a: 1,
        e: "Special schools for disabled children must be recognized by designated official bodies."
    },
    {
        q: "Is CEA admissible for a child in a 'Vocational' school?",
        o: ["No", "Yes, if equivalent to class 11 and 12", "Only if income < 5000", "Only Group D"],
        a: 1,
        e: "Vocational courses equivalent to class 11-12 in recognized institutions are eligible for CEA."
    },
    {
        q: "If a servant is 'Suspended' during the academic year, is CEA admissible?",
        o: ["No", "Yes, CEA/Hostel Subsidy is admissible during suspension", "Only 50%", "Only 1 child"],
        a: 1,
        e: "CEA is a welfare benefit and remains admissible even while the employee is under suspension."
    },
    {
        q: "Can CEA be claimed for a 'Stepchild' or 'Legally Adopted' child?",
        o: ["No", "Yes, if they are dependent on the employee", "Only adopted girls", "Only if biological children died"],
        a: 1,
        e: "Stepchildren and legally adopted children dependent on the employee are eligible for CEA."
    },
    {
        q: "What is the rule for CEA if a servant is 'Dismissed' or 'Removed' as a penalty?",
        o: ["Admissible till end of year", "Ceases immediately on date of dismissal/removal", "Next 3 months", "Next increment"],
        a: 1,
        e: "Dismissal/Removal results in immediate cessation of CEA eligibility on the date of departure."
    },
    {
        q: "If the DA (Dearness Allowance) increases to 60%, how much will the CEA amount be?",
        o: ["Rs. 2,250", "Rs. 2,812.50", "Rs. 3,375", "Rs. 4,500"],
        a: 1,
        e: "Base CEA (2250) + 25% increase = Rs. 2,812.50, as DA crossed the 50% threshold."
    },
    {
        q: "Can a servant claim CEA for a 3rd child if 2nd delivery was twins?",
        o: ["No", "Yes, multiple births in second delivery are an exception", "Only girls", "Only if 1st child died"],
        a: 1,
        e: "The two-child limit is relaxed for multiple births (twins/triplets) in the second delivery."
    },
    {
        q: "Under the new 2018 consolidated rules, which item requires individual receipts?",
        o: ["Tuition fees", "Uniforms & shoes", "Books", "None (Fixed monthly grant)"],
        a: 3,
        e: "CEA is now a fixed monthly grant; individual breakdown and itemized receipts are no longer required."
    },
    {
        q: "What constitutes an 'Academic Year' for CEA?",
        o: ["Jan to Dec", "April to March (typically)", "July to June", "Child's birthday cycle"],
        a: 1,
        e: "Academic year corresponds to the school session (typically April to March)."
    },
    {
        q: "Can a servant claim CEA for a child who is 'Earning'?",
        o: ["Yes, if minor", "No, the child must be wholly dependent", "If income < 1000", "Always admissible"],
        a: 1,
        e: "Dependency is mandatory. A child who is earning a livelihood is no longer eligible for CEA."
    }
];
