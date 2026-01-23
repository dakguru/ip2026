export interface FlashcardData {
    id: number;
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
}

export const poActData: FlashcardData[] = [
    {
        id: 1,
        question: "1. When did the Post Office Act, 2023 come into force?",
        options: {
            A: "18th June 2023",
            B: "18th June 2024",
            C: "1st January 2024",
            D: "1st April 2024"
        },
        correctAnswer: "B",
        explanation: "The Post Office Act, 2023 (Act No. 43 of 2023) officially commenced on June 18, 2024. This is the effective date for all legal provisions within the Act to take effect."
    },
    {
        id: 2,
        question: "2. Which Act was repealed by the Post Office Act, 2023?",
        options: {
            A: "Indian Post Office Act, 1998",
            B: "Indian Post Office Act, 1898",
            C: "Post Office Act, 1947",
            D: "Indian Postal Services Act, 2000"
        },
        correctAnswer: "B",
        explanation: "Section 16(1) of the 2023 Act explicitly repeals the 125-year-old Indian Post Office Act of 1898. However, existing rules and notifications under the old Act remain valid until specifically superseded."
    },
    {
        id: 3,
        question: "3. Who has the exclusive privilege of issuing postage stamps under the Post Office Act, 2023?",
        options: {
            A: "The Central Government",
            B: "The President of India",
            C: "The Post Office",
            D: "The Reserve Bank of India"
        },
        correctAnswer: "C",
        explanation: "Section 4(1) grants the exclusive privilege of issuing postage stamps to the Post Office. The Director General is further empowered to regulate the supply and sale of these stamps."
    },
    {
        id: 4,
        question: "4. What is the extent of the Post Office's liability for services provided under the 2023 Act?",
        options: {
            A: "Full liability for all losses",
            B: "Liability limited to Rs. 100",
            C: "Liability only for registered items",
            D: "No liability except as specifically prescribed"
        },
        correctAnswer: "D",
        explanation: "Section 10(1) exempts the Post Office from liability regarding its services, notwithstanding other laws. Liability is only applicable if explicitly prescribed by rules/regulations."
    },
    {
        id: 5,
        question: "5. What is the definition of \"Post Office\" in the 2023 Act?",
        options: {
            A: "Only the head office in Delhi",
            B: "Any building where mail is sorted",
            C: "The Department of Posts and its infrastructure",
            D: "Only distinct post office buildings"
        },
        correctAnswer: "C",
        explanation: "Section 2(d) defines \"Post Office\" not just as the department but effectively as the entire infrastructure (physical and otherwise) utilized for postal services."
    },
    {
        id: 6,
        question: "6. How can sums due to the Post Office be recovered if a person refuses to pay?",
        options: {
            A: "Through civil court suit",
            B: "As if it were an arrear of land revenue",
            C: "By police complaint only",
            D: "By confiscating personal property directly"
        },
        correctAnswer: "B",
        explanation: "Section 7(2) empowers the government to recover unpaid charges using the strict mechanisms applicable to \"arrears of land revenue,\" which allows for swifter recovery action."
    },
    {
        id: 7,
        question: "7. Under Section 9(1), which of the following is NOT a ground for intercepting items?",
        options: {
            A: "Security of the State",
            B: "Public order",
            C: "Non-payment of postage",
            D: "Friendly relations with foreign states"
        },
        correctAnswer: "C",
        explanation: "Section 9(1) lists specific statutory grounds: Security of the State, Friendly relations with foreign states, Public order, Emergency, Public safety, Contravention of the Post Office Act or any other law."
    },
    {
        id: 8,
        question: "8. When did the Post Office Rules, 2024 come into force?",
        options: {
            A: "18th June 2024",
            B: "16th December 2024",
            C: "1st January 2025",
            D: "15th August 2024"
        },
        correctAnswer: "B",
        explanation: "Rule 1(2) states the commencement date as 16th December, 2024. Note the gap between the Act's enforcement (June 2024) and the Rules' enforcement (December 2024)."
    },
    {
        id: 9,
        question: "9. Who constitutes the Review Committee to oversee interception directions under the Rules?",
        options: {
            A: "Director General and two Postal Board Members",
            B: "Minister of Communications and Secretary",
            C: "Cabinet Secretary and Home Secretary",
            D: "Three independent judges"
        },
        correctAnswer: "A",
        explanation: "Rule 16(5) establishes this committee. It consists of the Director General, Posts (Chairman) and two Members of the Postal Services Board."
    },
    {
        id: 10,
        question: "10. What is the maximum duration for which an interception direction can remain in force?",
        options: {
            A: "30 days total",
            B: "60 days total",
            C: "90 days total",
            D: "180 days total"
        },
        correctAnswer: "C",
        explanation: "Rule 16(11) limits the validity of an interception order. It expires after 30 days unless renewed, and under no circumstances can it exceed 90 days."
    },
    {
        id: 11,
        question: "11. Who is authorized to order interception in \"emergent cases\" where prior direction is not feasible?",
        options: {
            A: "The Postmaster General",
            B: "The Divisional Head",
            C: "The Inspector of Posts",
            D: "The Head Postmaster"
        },
        correctAnswer: "B",
        explanation: "Rule 16(3) allows the Divisional Head to act in emergencies. They must inform the competent authority within 3 working days and get confirmation within 7 working days."
    },
    {
        id: 12,
        question: "12. What is the mandatory condition for opening an intercepted item?",
        options: {
            A: "It must be opened by a gazetted officer",
            B: "It must be opened on video camera",
            C: "It must be opened in presence of law enforcement authority",
            D: "It must be opened by the addressee only"
        },
        correctAnswer: "C",
        explanation: "Rule 16(8) prohibits a postal officer from opening an intercepted item alone. The presence of law enforcement is a mandatory safeguard."
    },
    {
        id: 13,
        question: "13. What defines \"Universal Postal Service\" in the 2024 Rules?",
        options: {
            A: "Free services for all citizens",
            B: "Services affordable and available to all users",
            C: "Services available only in rural areas",
            D: "Government mail services only"
        },
        correctAnswer: "B",
        explanation: "Rule 2(j) sets the criteria for universal service: \"affordability\" and \"availability to all users,\" covering both domestic and international domains."
    },
    {
        id: 14,
        question: "14. Who has the authority to introduce, modify, or discontinue postal products?",
        options: {
            A: "The Central Government",
            B: "The Postal Services Board",
            C: "The Director General",
            D: "The Minister of Communications"
        },
        correctAnswer: "C",
        explanation: "Rule 4(a) empowers the Director General to manage the portfolio of products and services offered under the Rules."
    },
    {
        id: 15,
        question: "15. Which of the following is NOT an approved mode of payment for postage under Rule 9?",
        options: {
            A: "Digital mode",
            B: "Postage stamp",
            C: "Barter system",
            D: "Franking machine impressions"
        },
        correctAnswer: "C",
        explanation: "The 2024 Rules explicitly recognize Cash, Digital mode, Postage stamp, Franking machine impressions, etc. Barter system is not an approved mode."
    },
    {
        id: 16,
        question: "16. Who advises the Government on commemorative and special postage stamps?",
        options: {
            A: "The Arts Council of India",
            B: "The Philatelic Advisory Committee",
            C: "The Stamp Design Bureau",
            D: "The Cultural Ministry"
        },
        correctAnswer: "B",
        explanation: "Rule 8 empowers the Central Government to constitute the Philatelic Advisory Committee to provide expert advice on philatelic matters and stamp issues."
    },
    {
        id: 17,
        question: "17. Under Rule 19, compensation is NOT paid for loss or damage caused by:",
        options: {
            A: "Post Office negligence",
            B: "Force majeure (unforeseeable circumstances)",
            C: "Accidental loss during transit",
            D: "Theft by postal employee"
        },
        correctAnswer: "B",
        explanation: "Compensation is strictly limited and excludes scenarios beyond control like Force Majeure, or due to user error/negligence."
    },
    {
        id: 18,
        question: "18. Who manages and allocates Postcodes (PIN codes)?",
        options: {
            A: "The Planning Commission",
            B: "The Director General",
            C: "The State Government",
            D: "The Municipal Corporation"
        },
        correctAnswer: "B",
        explanation: "Rule 11(2) specifically assigns the duty of managing, allocating, and publishing Postcodes to the Director General."
    },
    {
        id: 19,
        question: "19. The specific time limit for the Central Government to issue orders for removing difficulties is:",
        options: {
            A: "One year from commencement",
            B: "Two years from commencement",
            C: "Five years from commencement",
            D: "Six months from commencement"
        },
        correctAnswer: "B",
        explanation: "Section 15(1) empowers the Central Government to issue orders to remove difficulties, with a strict \"sunset clause\" of two years from the commencement date (18.06.2024)."
    },
    {
        id: 20,
        question: "20. For how many days must every rule or regulation made under the Act be laid before Parliament?",
        options: {
            A: "14 days",
            B: "30 days",
            C: "60 days",
            D: "90 days"
        },
        correctAnswer: "B",
        explanation: "Section 14 mandates that every rule or regulation must be laid before Parliament for a total period of thirty days to ensure legislative oversight."
    }
];
