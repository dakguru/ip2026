export interface FlashcardData {
    id: number;
    question: string;
    answer: string;
    explanation: string;
    tag: string;
}

export const poActData: FlashcardData[] = [
    {
        id: 1,
        question: "When did the Post Office Act, 2023 come into force?",
        answer: "18th June 2024",
        explanation: "The Post Office Act, 2023 (Act No. 43 of 2023) officially commenced on June 18, 2024. This is the effective date for all legal provisions within the Act to take effect.",
        tag: "PO Act 2023"
    },
    {
        id: 2,
        question: "Which Act was repealed by the Post Office Act, 2023?",
        answer: "Indian Post Office Act, 1898",
        explanation: "Section 16(1) of the 2023 Act explicitly repeals the 125-year-old Indian Post Office Act of 1898. However, existing rules and notifications under the old Act remain valid until specifically superseded.",
        tag: "PO Act 2023"
    },
    {
        id: 3,
        question: "Who has the exclusive privilege of issuing postage stamps under the Post Office Act, 2023?",
        answer: "The Post Office",
        explanation: "Section 4(1) grants the exclusive privilege of issuing postage stamps to the Post Office. The Director General is further empowered to regulate the supply and sale of these stamps.",
        tag: "PO Act 2023"
    },
    {
        id: 4,
        question: "What is the extent of the Post Office's liability for services provided under the 2023 Act?",
        answer: "No liability except as specifically prescribed",
        explanation: "Section 10(1) exempts the Post Office from liability regarding its services, notwithstanding other laws. Liability is only applicable if explicitly prescribed by rules/regulations.",
        tag: "PO Act 2023"
    },
    {
        id: 5,
        question: "What is the definition of \"Post Office\" in the 2023 Act?",
        answer: "The Department of Posts and its infrastructure",
        explanation: "Section 2(d) defines \"Post Office\" not just as the department but effectively as the entire infrastructure (physical and otherwise) utilized for postal services.",
        tag: "PO Act 2023"
    },
    {
        id: 6,
        question: "How can sums due to the Post Office be recovered if a person refuses to pay?",
        answer: "As if it were an arrear of land revenue",
        explanation: "Section 7(2) empowers the government to recover unpaid charges using the strict mechanisms applicable to \"arrears of land revenue,\" which allows for swifter recovery action.",
        tag: "PO Act 2023"
    },
    {
        id: 7,
        question: "Under Section 9(1), what is NOT a ground for intercepting items?",
        answer: "Non-payment of postage",
        explanation: "Section 9(1) lists specific statutory grounds: Security of the State, Friendly relations with foreign states, Public order, Emergency, Public safety, Contravention of the Post Office Act or any other law.",
        tag: "PO Act 2023"
    },
    {
        id: 8,
        question: "When did the Post Office Rules, 2024 come into force?",
        answer: "16th December 2024",
        explanation: "Rule 1(2) states the commencement date as 16th December, 2024. Note the gap between the Act's enforcement (June 2024) and the Rules' enforcement (December 2024).",
        tag: "PO Rules 2024"
    },
    {
        id: 9,
        question: "Who constitutes the Review Committee to oversee interception directions under the Rules?",
        answer: "Director General and two Postal Board Members",
        explanation: "Rule 16(5) establishes this committee. It consists of the Director General, Posts (Chairman) and two Members of the Postal Services Board.",
        tag: "PO Rules 2024"
    },
    {
        id: 10,
        question: "What is the maximum duration for which an interception direction can remain in force?",
        answer: "90 days total",
        explanation: "Rule 16(11) limits the validity of an interception order. It expires after 30 days unless renewed, and under no circumstances can it exceed 90 days.",
        tag: "PO Rules 2024"
    },
    {
        id: 11,
        question: "Who is authorized to order interception in \"emergent cases\" where prior direction is not feasible?",
        answer: "The Divisional Head",
        explanation: "Rule 16(3) allows the Divisional Head to act in emergencies. They must inform the competent authority within 3 working days and get confirmation within 7 working days.",
        tag: "PO Rules 2024"
    },
    {
        id: 12,
        question: "What is the mandatory condition for opening an intercepted item?",
        answer: "It must be opened in the presence of a law enforcement authority",
        explanation: "Rule 16(8) prohibits a postal officer from opening an intercepted item alone. The presence of law enforcement is a mandatory safeguard.",
        tag: "PO Rules 2024"
    },
    {
        id: 13,
        question: "What defines \"Universal Postal Service\" in the 2024 Rules?",
        answer: "Services affordable and available to all users",
        explanation: "Rule 2(j) sets the criteria for universal service: \"affordability\" and \"availability to all users,\" covering both domestic and international domains.",
        tag: "PO Rules 2024"
    },
    {
        id: 14,
        question: "Who has the authority to introduce, modify, or discontinue postal products?",
        answer: "The Director General",
        explanation: "Rule 4(a) empowers the Director General to manage the portfolio of products and services offered under the Rules.",
        tag: "PO Rules 2024"
    },
    {
        id: 15,
        question: "What is NOT an approved mode of payment for postage under Rule 9?",
        answer: "Barter system",
        explanation: "The 2024 Rules explicitly recognize Cash, Digital mode, Postage stamp, Franking machine impressions, etc. Barter system is not an approved mode.",
        tag: "PO Rules 2024"
    },
    {
        id: 16,
        question: "Who advises the Government on commemorative and special postage stamps?",
        answer: "The Philatelic Advisory Committee",
        explanation: "Rule 8 empowers the Central Government to constitute the Philatelic Advisory Committee to provide expert advice on philatelic matters and stamp issues.",
        tag: "PO Rules 2024"
    },
    {
        id: 17,
        question: "Under Rule 19, compensation is NOT paid for loss or damage caused by:",
        answer: "Force majeure (unforeseeable circumstances)",
        explanation: "Compensation is strictly limited and excludes scenarios beyond control like Force Majeure, or due to user error/negligence.",
        tag: "PO Rules 2024"
    },
    {
        id: 18,
        question: "Who manages and allocates Postcodes (PIN codes)?",
        answer: "The Director General",
        explanation: "Rule 11(2) specifically assigns the duty of managing, allocating, and publishing Postcodes to the Director General.",
        tag: "PO Rules 2024"
    },
    {
        id: 19,
        question: "The specific time limit for the Central Government to issue orders for removing difficulties is:",
        answer: "Two years from commencement",
        explanation: "Section 15(1) empowers the Central Government to issue orders to remove difficulties, with a strict \"sunset clause\" of two years from the commencement date (18.06.2024).",
        tag: "PO Act 2023"
    },
    {
        id: 20,
        question: "For how many days must every rule or regulation made under the Act be laid before Parliament?",
        answer: "30 days",
        explanation: "Section 14 mandates that every rule or regulation must be laid before Parliament for a total period of thirty days to ensure legislative oversight.",
        tag: "PO Act 2023"
    }
];
