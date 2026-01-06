
export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // 0-based index
    explanation: string;
}

export const ADMIN_MOCK_QUESTIONS: Question[] = [
    // --- The Post Office Act, 2023 ---
    {
        id: "poa-1",
        text: "The Post Office Act, 2023 received the assent of the President on which date?",
        options: ["24th December 2023", "25th December 2023", "1st January 2024", "10th August 2023"],
        correctAnswer: 0,
        explanation: "The Post Office Act, 2023 received the assent of the President on 24th December 2023."
    },
    {
        id: "poa-2",
        text: "Which Act is repealed by the Post Office Act, 2023?",
        options: ["The Indian Post Office Act, 1898", "The Post Office Act, 1900", "The Postal Services Act, 2000", "The Telegraph Act, 1885"],
        correctAnswer: 0,
        explanation: "The Post Office Act, 2023 repeals the Indian Post Office Act, 1898."
    },
    {
        id: "poa-3",
        text: "Under Section 3 of the Post Office Act, 2023, who has the exclusive privilege of issuing postage stamps?",
        options: ["Director General Postal Services", "Central Government", "Reserve Bank of India", "Department of Posts"],
        correctAnswer: 1,
        explanation: "Section 3 grants the Central Government the exclusive privilege of issuing postage stamps."
    },
    {
        id: "poa-6",
        text: "What power does the Central Government have regarding interception of postal articles under the 2023 Act?",
        options: ["Absolute power in all cases", "Power to intercept only in emergency", "Power to intercept on grounds of security of State, public order, etc.", "No power to intercept"],
        correctAnswer: 2,
        explanation: "Section 9 allows interception in the interest of the security of the State, friendly relations with foreign states, public order, emergency, or public safety."
    },

    // --- Government Savings Promotion Act-1873 ---
    {
        id: "gspa-1",
        text: "The Government Savings Promotion Act, 1873 extends to:",
        options: ["Only British India", "Whole of India", "Whole of India except J&K", "Only Union Territories"],
        correctAnswer: 1,
        explanation: "The Act extends to the whole of India."
    },
    {
        id: "gspa-3",
        text: "Section 4 of GSPA 1873 deals with:",
        options: ["Nomination", "Payment on death of depositor", "Interest calculation", "Opening of accounts"],
        correctAnswer: 0,
        explanation: "Section 4 deals with Nomination by depositors."
    },
    {
        id: "gspa-15",
        text: "The full title of the Act is:",
        options: ["Government Savings Bank Act, 1873", "Government Savings Promotion Act, 1873", "Public Provident Fund Act, 1873", "National Savings Act, 1873"],
        correctAnswer: 1,
        explanation: "It was formerly the Government Savings Banks Act, 1873, but renamed to Government Savings Promotion Act, 1873."
    },

    // --- PMLA Act, 2002 & Amendments ---
    {
        id: "pmla-1",
        text: "PMLA stands for:",
        options: ["Prevention of Money Laundering Act", "Public Money Laundering Act", "Prevention of Monetary Loss Act", "Prohibition of Money Laundering Act"],
        correctAnswer: 0,
        explanation: "Prevention of Money Laundering Act."
    },
    {
        id: "pmla-3",
        text: "Money Laundering involves which three stages?",
        options: ["Placement, Layering, Integration", "Deposit, Transfer, Withdrawal", "Hiding, Moving, Spending", "Collection, Distribution, Utilization"],
        correctAnswer: 0,
        explanation: "The three stages are Placement, Layering, and Integration."
    },
    {
        id: "pmla-11",
        text: "What is the threshold for filing CTR in respect of cash transactions?",
        options: ["Exceeding Rs. 50,000", "Exceeding Rs. 10 Lakhs", "Exceeding Rs. 2 Lakhs", "Exceeding Rs. 5 Lakhs"],
        correctAnswer: 1,
        explanation: "Transactions exceeding Rs. 10 Lakhs (or equivalent in foreign currency) are reported in CTR."
    }
];
