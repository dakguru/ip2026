import { RawQuestion } from '../quizzes';

export const recognition_set1: RawQuestion[] = [
    {
        q: "To whom do the CCS (Recognition of Service Association) Rules, 1993 NOT apply?",
        o: [
            "All Central Government employees",
            "Persons in the Ministry of Defence",
            "Persons in the Police forces and Central Intelligence Agency",
            "Both B and C"
        ],
        a: 2,
        e: "Rule 3 states these rules do not apply to persons in the Police forces, Central Intelligence Agency, or similar security-related organizations."
    },
    {
        q: "What is the 'Primary Objective' of a Service Association to be eligible for recognition?",
        o: [
            "To engage in political activities",
            "To promote the common service interests of its members",
            "To run a business for profit",
            "To organize strikes regularly"
        ],
        a: 1,
        e: "One of the core conditions for recognition is that the Service Association must be formed primarily to promote the common service interests of its members."
    },
    {
        q: "Can a Service Association be recognized if its membership is open to 'outsiders' (non-Govt servants)?",
        o: [
            "Yes, if they are retired",
            "No, membership must be restricted to a distinct category of Government servants",
            "Only if they are registered lawyers",
            "Only with PM's permission"
        ],
        a: 1,
        e: "Rule 5(b) requires that membership of the Service Association must be restricted to a distinct category of Government servants having common interests."
    },
    {
        q: "What is the minimum 'Membership Percentage' required for an association to be granted recognition as representing a distinct category?",
        o: ["15%", "25%", "35%", "50%"],
        a: 2,
        e: "To be eligible for recognition, an association must represent at least 35% of the total number of employees in the relevant distinct category."
    },
    {
        q: "If no single association has 35% membership, how is recognition granted?",
        o: [
            "No recognition is given",
            "The association with the second largest membership is recognized",
            "The association with the largest membership (if at least 15%) can be recognized",
            "Only based on the HOD's recommendation"
        ],
        a: 2,
        e: "If no association has 35%, the one with the highest membership (provided it has at least 15%) can be considered for recognition."
    },
    {
        q: "What is the 'Check-off System' mentioned in these rules?",
        o: [
            "A way to mark attendance",
            "A method to verify membership through deduction of subscription from payroll",
            "A performance appraisal tool",
            "A disciplinary procedure"
        ],
        a: 1,
        e: "Membership is verified through the 'Check-off' system, where the subscription is deducted from the monthly payroll based on written authorization."
    },
    {
        q: "How often is the 'subscription' for the association recovered from the salary?",
        o: ["Weekly", "Monthly", "Annually (usually in July)", "Quarterly"],
        a: 2,
        e: "The subscription is typically recovered from the salary of the month of July every year (as per standard OMs)."
    },
    {
        q: "Can a Service Association be formed on the basis of 'Caste, Tribe, or Religious denomination'?",
        o: ["Yes", "No, it is strictly prohibited", "Only if the HOD permits", "Only in specific States"],
        a: 1,
        e: "Recognition is not granted to any association that is formed on the basis of caste, tribe, or religious denominations."
    },
    {
        q: "Who can be an 'Office-Bearer' of a recognized Service Association?",
        o: [
            "Any citizen of India",
            "Only serving Government servants belonging to that specific category",
            "Retired Govt servants only",
            "Politicians with experience"
        ],
        a: 1,
        e: "Rule 5(h) states that the office-bearers must be serving Government servants of the category it represents (outsiders not permitted)."
    },
    {
        q: "Can a recognized Service Association publish a 'Periodical' or Magazine?",
        o: ["No", "Yes, but only for the purpose of promoting common service interests", "Yes, including political news", "Only with Ministry permission"],
        a: 1,
        e: "A recognized association can publish a periodical/magazine primarily to disseminate information relevant to the service interests of its members."
    },
    {
        q: "Is a recognized Service Association allowed to maintain a 'Political Fund'?",
        o: ["Yes", "No, they are prohibited from supporting any political party", "Only during elections", "Up to 10%"],
        a: 1,
        e: "Recognized associations are strictly prohibited from collecting or maintaining funds for political purposes."
    },
    {
        q: "Under what condition can the Government 'Withdraw' recognition?",
        o: [
            "Fails to submit annual accounts",
            "Violates any of the conditions of recognition",
            "Membership falls below required percentage",
            "All of the above"
        ],
        a: 3,
        e: "Recognition can be withdrawn if the association violates conditions, fails to maintain membership, or fails account submission requirements."
    },
    {
        q: "Can a Government servant be a member of 'multiple' recognized associations simultaneously?",
        o: ["Yes", "No, an employee typically authorizes deduction for only one association annually", "Only with HOD permission", "Double subscription"],
        a: 1,
        e: "The Check-off system ensures that an employee opts for only one association for subscription deduction."
    },
    {
        q: "Does a recognized Service Association have the right to 'Strike'?",
        o: ["Yes", "No, the association must not resort to or abet any strike", "Only after 30 days notice", "Only during lunch"],
        a: 1,
        e: "Recognized associations must abide by conduct rules which prohibit strikes; abetting one is grounds for revocation of recognition."
    },
    {
        q: "How often must a recognized association submit its 'Annual Accounts'?",
        o: ["Monthly", "Quarterly", "Annually after every audit", "Once in 5 years"],
        a: 2,
        e: "Service associations must submit audited annual accounts every year to the Government."
    },
    {
        q: "Which authority is empowered to grant 'Recognition' at the National level?",
        o: ["The President", "DoPT (Ministry of Personnel)", "Supreme Court", "Any Joint Secretary"],
        a: 1,
        e: "Recognition for associations across multiple departments is handled by the DoPT (Department of Personnel and Training)."
    },
    {
        q: "Is a 'Legal Practitioner' (Lawyer) allowed to represent the association in its internal elections?",
        o: ["Yes", "No, outsiders are not allowed to interfere in internal management", "Member's relative", "If 500+ members"],
        a: 1,
        e: "The rules aim to keep associations internal to employees; outsiders/lawyers are excluded from management roles."
    },
    {
        q: "What is the term of recognition once granted?",
        o: ["1 year", "2 years", "Continues unless withdrawn or membership falls below threshold", "5 years"],
        a: 2,
        e: "Recognition is valid until revoked or if the association fails periodic membership verification."
    },
    {
        q: "Can a recognized association approach a 'Political Party' for Parliamentary grievances?",
        o: ["Yes", "No, must follow established official channels of communication", "Only ruling party MP", "Only with Speaker permission"],
        a: 1,
        e: "Associations communicate grievances only through official channels and cannot use political influence."
    },
    {
        q: "What happens if an office-bearer is 'Dismissed' from Government service?",
        o: [
            "He can continue",
            "He ceases to be an office-bearer immediately",
            "He can stay for 6 months",
            "If association allows"
        ],
        a: 1,
        e: "Since office-bearers must be serving employees, anyone dismissed/removed loses their status immediately."
    }
];
