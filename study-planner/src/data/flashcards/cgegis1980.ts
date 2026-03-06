import { RawQuestion } from '../quizzes';

export const cgegis_set1: RawQuestion[] = [
    {
        q: "In which year was the Central Government Employees Group Insurance Scheme (CGEGIS) introduced?",
        o: ["1972", "1980", "1982", "1985"],
        a: 1,
        e: "The scheme was introduced in 1980 and came into force with effect from 1st January 1982."
    },
    {
        q: "When does a Government servant normally become a 'Full Member' of the CGEGIS?",
        o: [
            "On the date of joining service",
            "On the 1st of January following the date of appointment",
            "After completing 1 year of service",
            "Only after confirmation"
        ],
        a: 1,
        e: "Employees joining on any day other than 1st January are 'temporary members' (insurance only) and become full members (Savings + Insurance) from the next 1st January."
    },
    {
        q: "What is the monthly 'Subscription' amount for a Group 'A' officer?",
        o: ["Rs. 30", "Rs. 60", "Rs. 120", "Rs. 240"],
        a: 2,
        e: "Monthly subscription rates: Group A = Rs. 120, Group B = Rs. 60, Group C = Rs. 30, and Group D = Rs. 15."
    },
    {
        q: "What is the 'Insurance Amount' payable to the family of a Group 'B' employee in the event of death?",
        o: ["Rs. 30,000", "Rs. 60,000", "Rs. 1,20,000", "Rs. 2,40,000"],
        a: 1,
        e: "The insurance cover amounts are: Group A = 1.2L, Group B = 60K, Group C = 30K, and Group D = 15K."
    },
    {
        q: "What is the monthly subscription for a Group 'C' employee?",
        o: ["Rs. 15", "Rs. 30", "Rs. 45", "Rs. 60"],
        a: 1,
        e: "The monthly subscription for Group C employees is Rs. 30."
    },
    {
        q: "Into what two parts is the CGEGIS subscription divided?",
        o: [
            "Pension Fund and Insurance Fund",
            "Savings Fund and Insurance Fund",
            "Health Fund and Death Fund",
            "Welfare Fund and Service Fund"
        ],
        a: 1,
        e: "The subscription is split into two parts: The Savings Fund and the Insurance Fund."
    },
    {
        q: "What is the current 'Ratio' of the subscription allocated to the Savings/Insurance Funds?",
        o: ["50:50", "60:40", "70:30", "80:20"],
        a: 2,
        e: "70% is apportioned to the Savings Fund and 30% to the Insurance Fund."
    },
    {
        q: "If an employee dies while in service, what total amount is paid to the family?",
        o: [
            "Only Insurance Amount",
            "Only Savings Fund accumulation",
            "Insurance Amount (as per group) PLUS the Savings Fund accumulation",
            "Only 50% of the total"
        ],
        a: 2,
        e: "Families receive the full insurance cover amount for the group plus the entire Savings Fund accumulation with interest."
    },
    {
        q: "If a servant retires on superannuation, what amount do they receive from CGEGIS?",
        o: [
            "Full Insurance amount",
            "Only the accumulation in the Savings Fund with interest",
            "Both Insurance and Savings amount",
            "120 times the monthly subscription"
        ],
        a: 1,
        e: "Upon retirement/resignation, the employee only receives the amount accumulated in the Savings Fund with interest. Insurance cover ceases."
    },
    {
        q: "What is paid to a 'Temporary Member' if they die before becoming a full member?",
        o: ["Nothing", "Only the Savings portion", "The full Insurance amount for their group", "Only Rs. 5,000"],
        a: 2,
        e: "Temporary members are entitled to the full'Insurance cover' for their group from the date of joining."
    },
    {
        q: "Can a Government servant 'Opt-out' of the CGEGIS?",
        o: [
            "Yes, anytime",
            "No, it is compulsory for all Central Government employees",
            "Only for Group A",
            "Only if they have private LIC policies"
        ],
        a: 1,
        e: "Subscription to CGEGIS is compulsory for all Central Government employees enrolled under the scheme."
    },
    {
        q: "If an employee is 'Promoted' from Group C to Group B in June, when does the rate increase?",
        o: ["Immediately", "From July", "From the 1st of January of the following year", "Only after confirmation"],
        a: 2,
        e: "Any change in the subscription rate due to promotion is effective only from the following 1st of January."
    },
    {
        q: "If an employee promoted in June dies in October before Jan, what insurance amount is paid?",
        o: ["Rs. 60,000 (Group B)", "Rs. 30,000 (Group C)", "Rs. 45,000 (Average)", "Zero"],
        a: 1,
        e: "Enhanced insurance premium starts only from the next 1st January; hence, death before that is paid at the previous group rate."
    },
    {
        q: "How is the CGEGIS subscription recovered for an employee on EOL without pay?",
        o: [
            "Waived",
            "Recovered in arrears along with interest when he joins back",
            "Nominee must pay monthly",
            "Deducted from GPF"
        ],
        a: 1,
        e: "Arrears are recovered when duty is resumed, along with interest fixed by the Government."
    },
    {
        q: "What is the maximum 'Interest' rate that can be charged on arrears of subscription?",
        o: ["6%", "10%", "12%", "15%"],
        a: 2,
        e: "Arrears are recovered with compound interest at 12% per annum (or as fixed by Govt)."
    },
    {
        q: "To whom should the payment be made if the employee has NOT filed any 'Nomination'?",
        o: ["Eldest son", "Spouse", "Distributed equally among all eligible family members", "Treasury"],
        a: 2,
        e: "Payment is shared equally among all eligible family members in the absence of a nomination."
    },
    {
        q: "Is a 'Nomination' made for GPF valid for CGEGIS as well?",
        o: ["Yes", "No, a separate nomination specifically for CGEGIS is required", "Only for non-gazetted", "Only if authenticated"],
        a: 1,
        e: "CGEGIS requires a specific nomination (Form 7 or 8) separate from GPF/Pension nominations."
    },
    {
        q: "Which form is used for CGEGIS 'Nomination' when the employee has a family?",
        o: ["Form 3", "Form 7", "Form 8", "Form 10"],
        a: 1,
        e: "Form 7 is for nomination when the employee has a family. Form 8 is for when they have no family."
    },
    {
        q: "Can an employee 'Loan' against their CGEGIS savings fund accumulation?",
        o: ["Yes", "No, no loans or withdrawals are permitted", "Only for marriage", "Only for house"],
        a: 1,
        e: "No loans or withdrawals are permitted from the CGEGIS funds."
    },
    {
        q: "What is the subscription rate for a Group 'D' employee?",
        o: ["Rs. 5", "Rs. 10", "Rs. 15", "Rs. 20"],
        a: 2,
        e: "For Group D, the monthly subscription is Rs. 15."
    },
    {
        q: "If an employee's 'Services are Terminated' (e.g. resignation), what are they paid?",
        o: ["Insurance amount", "Accumulation in Savings Fund with interest", "Nothing", "50% of total paid"],
        a: 1,
        e: "In any case of exit from service (resignation/dismissal), the employee receives the Savings Fund accumulation."
    },
    {
        q: "Is the CGEGIS subscription exempt from 'Income Tax'?",
        o: ["Yes, under Section 80C", "No", "Only for Group D", "Only if income < 5L"],
        a: 0,
        e: "Monthly subscriptions to CGEGIS are eligible for deduction under Section 80C."
    },
    {
        q: "How often does the Government notify the 'Tables of Benefits' for the Savings Fund?",
        o: ["Monthly", "Quarterly", "Once in 10 years", "Every 5 years"],
        a: 1,
        e: "The Ministry of Finance notifies the Tables of Benefits for CGEGIS savings fund quarterly."
    },
    {
        q: "Does the CGEGIS apply to employees on 'Deputation' to a State Government?",
        o: ["No", "Yes, and the borrowing authority must recover/remit regular subscriptions", "Only if State Govt agrees", "Only for 2 years"],
        a: 1,
        e: "Employees on deputation remain members; the borrowing organization must recover and remit subscriptions."
    },
    {
        q: "If an employee goes 'Missing', after what period can the family claim CGEGIS benefits?",
        o: ["Immediately", "1 year after date of lodging FIR", "After 7 years", "Never"],
        a: 1,
        e: "Families can claim benefits 1 year after an FIR is lodged regarding a missing employee, subject to specific conditions."
    }
];
