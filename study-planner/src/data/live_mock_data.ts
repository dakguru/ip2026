
export interface TableData {
    headers: string[];
    rows: string[][];
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // 0-based index
    explanation: string;
    table?: TableData;
    difficulty?: string;
}

export const LIVE_MOCK_QUESTIONS: Question[] = [
    {
        id: "live-1",
        text: "Consider the following statements regarding the privileges retained by the Government under The Post Office Act, 2023:\n1. The Central Government retains the exclusive privilege of conveying letters by post.\n2. The Post Office retains the exclusive privilege of issuing postage stamps.\n3. Private courier services are now explicitly banned from handling letters weighing less than 50 grams.\n\nWhich of the statements given above is/are correct?",
        options: ["1 only", "2 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 1,
        explanation: "Section 4 of the Post Office Act, 2023 grants the Post Office the exclusive privilege of issuing postage stamps. Statement 1 is incorrect because the 2023 Act removes the exclusive privilege of the Central Government to convey letters (which existed under Section 4 of the 1898 Act). Statement 3 is incorrect as the Act does not explicitly ban private couriers; it regulates the Post Office's own services."
    },
    {
        id: "live-2",
        text: "Under The Government Savings Promotion Act, 1873 (as amended), what is the minimum age at which a minor is explicitly permitted to open and operate an account independently, provided the specific Savings Scheme allows it?",
        options: ["6 years", "10 years", "14 years", "18 years"],
        correctAnswer: 1,
        explanation: "Under Section 10 (renumbered/amended sections vary by text, but specifically Section 3B in updated text) of the Government Savings Promotion Act, 1873, a minor who has attained the age of ten years may open and operate an account if the specific Savings Scheme permits it."
    },
    {
        id: "live-3",
        text: "With reference to the Prevention of Money Laundering Act, 2002 (PMLA), the term 'Proceeds of Crime' refers to property derived or obtained, directly or indirectly, by any person as a result of criminal activity relating to:",
        options: ["Any offence under the Indian Penal Code (IPC).", "A Scheduled Offence only.", "Any offence under the Customs Act.", "Any civil or criminal liability."],
        correctAnswer: 1,
        explanation: "Section 2(1)(u) of the PMLA defines 'Proceeds of Crime' as property derived from criminal activity relating to a Scheduled Offence."
    },
    {
        id: "live-4",
        text: "The Post Office Act, 2023 empowers the Central Government to intercept, open, or detain any item in the interest of specific grounds. Which of the following is NOT one of those grounds?",
        options: ["Security of the State", "Friendly relations with foreign states", "Protection of trade monopolies", "Public emergency or public safety"],
        correctAnswer: 2,
        explanation: "Section 9 of the Post Office Act, 2023 allows interception on grounds of: Security of State, Friendly relations with foreign states, Public order, Emergency, Public safety, or Contravention of the Act/other laws. 'Protection of trade monopolies' is not a valid ground for interception under the Act."
    },
    {
        id: "live-5",
        text: "In the context of the PMLA, 2002 and its 2023 notifications, which of the following professionals are now classified as 'Reporting Entities' when carrying out financial transactions (like managing client assets) on behalf of their clients?\n1. Chartered Accountants\n2. Company Secretaries\n3. Cost and Works Accountants\n\nSelect the correct answer using the code below:",
        options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2, and 3"],
        correctAnswer: 3,
        explanation: "A May 2023 Notification by the Finance Ministry expanded the PMLA ambit. Practicing CAs, CSs, and CWAs are now 'Reporting Entities' when they engage in financial transactions (buying/selling property, managing money/assets) on behalf of clients."
    },
    {
        id: "live-6",
        text: "Section 10 of The Post Office Act, 2023 deals with the liability of the Post Office. Which statement best describes the legal position regarding the liability of the Post Office or its officers?",
        options: ["The Post Office is liable for all losses incurred during transit, similar to a private courier.", "Officers are personally liable for any delay in the delivery of premium mail services.", "The Post Office incurs no liability for any service provided, except as may be prescribed, and officers are exempt unless they act fraudulently or wilfully.", "Compensation for loss of an article is mandatory and is fixed at 50% of the article's declared value."],
        correctAnswer: 2,
        explanation: "Section 10 of the Post Office Act, 2023 provides 'Exemption from Liability.' The Post Office is not liable for loss/damage unless prescribed, and officers are exempt unless they acted fraudulently or wilfully."
    },
    {
        id: "live-7",
        text: "A depositor in a Government Savings Bank under the Government Savings Promotion Act, 1873 wishes to make a nomination. If the nominee is a minor, what is the mandatory requirement under the Act?",
        options: ["The nomination is invalid until the minor turns 18.", "The depositor must appoint a person to receive the deposit in the event of death during the minority of the nominee.", "The deposit is automatically transferred to the minor’s natural guardian without any specific appointment.", "The minor must sign the nomination form along with the depositor."],
        correctAnswer: 1,
        explanation: "Under Section 4(3) of the Government Savings Promotion Act, 1873, if a nominee is a minor, the depositor must appoint a person to receive the deposit in the event of the depositor's death during the nominee's minority."
    },
    {
        id: "live-8",
        text: "Which authority is empowered to adjudicate whether any property is involved in money laundering under Section 8 of the PMLA, 2002?",
        options: ["The Enforcement Directorate (ED)", "The Adjudicating Authority appointed by the Central Government", "The High Court of the respective State", "The Reserve Bank of India"],
        correctAnswer: 1,
        explanation: "Section 6 and Section 8 of the PMLA establish the Adjudicating Authority. This authority determines whether the attached property is involved in money laundering."
    },
    {
        id: "live-9",
        text: "Regarding the regulation of tariffs/charges under The Post Office Act, 2023, consider the following:\nAssertion (A): The Director General of Postal Services may make regulations to fix charges for services provided by the Post Office.\nReason (R): Parliamentary approval is no longer mandatorily required for every revision of service charges under the new Act.",
        options: ["Both A and R are correct, and R is the correct explanation of A.", "Both A and R are correct, but R is NOT the correct explanation of A.", "A is correct, but R is incorrect.", "A is incorrect, but R is correct."],
        correctAnswer: 0,
        explanation: "Section 3(2) of the Post Office Act, 2023 empowers the Director General to make regulations fixing charges. This is a shift from the 1898 Act where rates were often fixed by the Act/Parliament, giving the Post Office more commercial flexibility."
    },
    {
        id: "live-10",
        text: "Under the Government Savings Promotion Act, 1873, Section 14A provides 'Protection against attachment'. This protection applies to:",
        options: ["Only the interest earned on the deposit.", "The amount standing to the credit of any depositor in the Government Savings Bank.", "Only deposits made by retired government servants.", "Deposits seized by the Income Tax Department."],
        correctAnswer: 1,
        explanation: "Section 14A of the Government Savings Promotion Act, 1873 states that the 'amount standing to the credit of any depositor' in the Government Savings Bank shall not be liable to attachment under any decree or order of any Court in respect of any debt or liability incurred by the depositor."
    },
    {
        id: "live-11",
        text: "The PMLA, 2002 places the 'Burden of Proof' regarding the proceeds of crime (Section 24) on:",
        options: ["The Prosecution (Enforcement Directorate).", "The Accused / Person charged with the offence.", "The Reporting Entity (Bank/Intermediary).", "The Adjudicating Authority."],
        correctAnswer: 1,
        explanation: "Section 24 of the PMLA reverses the burden of proof. It states that in proceedings relating to proceeds of crime, the Court/Authority shall presume that such proceeds are involved in money-laundering unless the accused proves otherwise."
    },
    {
        id: "live-12",
        text: "If a person refuses to pay the charges for a service availed under The Post Office Act, 2023, how is the due amount recoverable?",
        options: ["As a civil debt through the District Court.", "By confiscating the person's passport.", "As if it were an arrear of land revenue.", "By deducting it from the person’s bank account directly without notice."],
        correctAnswer: 2,
        explanation: "Section 7 of the Post Office Act, 2023 states that if a person refuses or neglects to pay charges, the amount shall be recoverable as if it were an arrear of land revenue."
    },
    {
        id: "live-13",
        text: "Match the relevant Act with its specific provision:\n\nSelect the correct matching:",
        table: {
            headers: ["Act", "Provision"],
            rows: [
                ["1. Post Office Act, 2023", "P. Reverse Burden of Proof"],
                ["2. Govt Savings Promotion Act, 1873", "Q. Removal of Exclusive Privilege of conveying letters"],
                ["3. PMLA, 2002", "R. Nomination facilities for depositors"]
            ]
        },
        options: ["1-Q, 2-R, 3-P", "1-R, 2-P, 3-Q", "1-P, 2-Q, 3-R", "1-Q, 2-P, 3-R"],
        correctAnswer: 0,
        explanation: "Post Office Act, 2023: Removed the exclusive privilege of conveying letters (Matching 1-Q). GSPA, 1873: Deals with Savings and Nomination (Matching 2-R). PMLA, 2002: Known for the Reverse Burden of Proof (Matching 3-P)."
    },
    {
        id: "live-14",
        text: "According to the 2023 notifications under PMLA, which of the following activities, when carried out by a person for another, brings them under the definition of a 'person carrying on designated business or profession'?\n1. Acting as a formation agent of companies.\n2. Providing a registered office or business address for a company.\n3. Acting as a nominee shareholder for another person.",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 3,
        explanation: "The May 9, 2023 Notification under PMLA broadened the definition of 'person carrying on designated business or profession' to include Company Service Providers (formation agents, providing office address, acting as nominee directors/shareholders)."
    },
    {
        id: "live-15",
        text: "Under the Government Savings Promotion Act, 1873, if a depositor dies and there is no nomination in force, and the probate of the will is not produced, to whom may the payment be made?",
        options: ["It is forfeited to the Central Government.", "It is paid to the District Magistrate.", "It may be paid to any person appearing to the proper authority to be entitled to receive it (upto a prescribed limit) or to the legal heirs who produce a succession certificate.", "It is transferred to the Senior Citizens' Welfare Fund immediately."],
        correctAnswer: 2,
        explanation: "Section 4A(4) of the Government Savings Promotion Act, 1873 allows payment to a person appearing entitled to it (often upon production of a succession certificate if the amount is high, or simple proof if below the limit)."
    }
];
