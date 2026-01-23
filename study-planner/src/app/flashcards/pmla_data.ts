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

export const pmlaFlashcards: FlashcardData[] = [
    {
        id: 1,
        question: "On which date did the Prevention of Money Laundering Act, 2002 come into force?",
        options: {
            A: "17th January 2003",
            B: "1st April 2004",
            C: "1st July 2005",
            D: "1st June 2002"
        },
        correctAnswer: "C",
        explanation: "The Act was enacted on 17th Jan 2003 but came into force on 1st July 2005 via notification. 2002 is the year of the Act; Jan 2003 is the enactment date, not the enforcement date."
    },
    {
        id: 2,
        question: "Under Section 2 of the PMLA, 2002, \"attachment\" specifically refers to the prohibition of which of the following regarding property?",
        options: {
            A: "Seizure and confiscation only",
            B: "Transfer, conversion, disposition, or movement",
            C: "Destruction or alteration",
            D: "Valuation and auction"
        },
        correctAnswer: "B",
        explanation: "Section 2(d) defines \"attachment\" as the prohibition of transfer, conversion, disposition, or movement of property by an order issued under Chapter III. Seizure is taking possession; attachment is a prohibition on dealing with the property."
    },
    {
        id: 3,
        question: "Which of the following entities is explicitly included in the definition of a \"financial institution\" under the PMLA, 2002?",
        options: {
            A: "The Department of Posts in the Government of India",
            B: "Life Insurance Corporation of India only",
            C: "Only Non-Banking Financial Companies (NBFCs)",
            D: "Any private money lender"
        },
        correctAnswer: "A",
        explanation: "The definition of \"Financial Institution\" in the PMLA explicitly includes the Department of Posts (as mentioned in the study material)."
    },
    {
        id: 4,
        question: "In the context of a \"payment system operator\" under the PMLA, an \"overseas principal\" refers to:",
        options: {
            A: "A foreign government regulating the payment system",
            B: "An individual or entity residing outside India who owns or controls the payment system activities in India",
            C: "An Indian entity establishing a subsidiary abroad for payment settlement",
            D: "The Reserve Bank of India’s foreign exchange department"
        },
        correctAnswer: "B",
        explanation: "In the context of a payment system operator, the \"overseas principal\" is the entity outside India controlling the system."
    },
    {
        id: 5,
        question: "According to the definition of \"person\" under the Act, which of the following is NOT excluded?",
        options: {
            A: "A Hindu Undivided Family (HUF)",
            B: "An artificial juridical person",
            C: "An association of persons",
            D: "All of the above are included in the definition"
        },
        correctAnswer: "D",
        explanation: "Section 2(s) defines \"person\" very broadly to include Individuals, HUFs, Companies, Firms, AOPs, and Artificial Juridical Persons."
    },
    {
        id: 6,
        question: "\"Proceeds of crime\" under the PMLA includes property derived from criminal activity relating to a scheduled offence. If such property is taken or held outside the country, what constitutes the \"proceeds of crime\"?",
        options: {
            A: "Only the property held outside India",
            B: "The property equivalent in value held within the country or abroad",
            C: "Only the cash component of the transaction",
            D: "The property is not considered proceeds of crime if held outside India"
        },
        correctAnswer: "B",
        explanation: "\"Proceeds of crime\" includes the property derived from the offence, or the value of such property, or if held outside India, property equivalent in value held within the country or abroad."
    },
    {
        id: 7,
        question: "Which of the following conditions constitutes an \"offence of cross border implications\"?",
        options: {
            A: "An offence committed in India with proceeds transferred outside India",
            B: "An offence committed outside India which would be a scheduled offence in India, and proceeds are transferred to India",
            C: "An attempt to transfer proceeds of crime from India to a place outside India",
            D: "All of the above"
        },
        correctAnswer: "D",
        explanation: "Section 2(ra) defines \"offence of cross border implications\" covering conduct in India with proceeds outside, or conduct outside with proceeds in India."
    },
    {
        id: 8,
        question: "Under the PMLA, \"reporting entity\" includes which of the following?",
        options: {
            A: "Banking company and financial institution",
            B: "Intermediary",
            C: "A person carrying on a designated business or profession",
            D: "All of the above"
        },
        correctAnswer: "D",
        explanation: "Section 2(wa) defines \"reporting entity\" as a banking company, financial institution, intermediary, or a person carrying on a designated business or profession."
    },
    {
        id: 9,
        question: "For an offence specified under Part B of the Schedule to be considered a \"scheduled offence,\" what is the minimum total value involved?",
        options: {
            A: "Ten Lakh Rupees",
            B: "Fifty Lakh Rupees",
            C: "One Crore Rupees",
            D: "Two Crore Rupees"
        },
        correctAnswer: "C",
        explanation: "Originally, Part B offences had a threshold (Rs. 30 Lakhs, then 1 Crore). Note: Recent amendments removed the threshold for many offences, but in the context of the 2002 Act structure, Rs. 1 Crore was the distinct threshold for Part B."
    },
    {
        id: 10,
        question: "Section 3 of the PMLA clarifies that a person is guilty of money-laundering if they are involved in which of the following processes connected with proceeds of crime?",
        options: {
            A: "Concealment or possession",
            B: "Acquisition or use",
            C: "Projecting or claiming it as untainted property",
            D: "Any of the above"
        },
        correctAnswer: "D",
        explanation: "Section 3 states that whosoever directly or indirectly attempts to indulge, knowingly assists, or is a party to concealment, possession, acquisition, or use of proceeds of crime is guilty."
    },
    {
        id: 11,
        question: "What is the standard term of rigorous imprisonment prescribed for the offence of money-laundering under Section 4?",
        options: {
            A: "Not less than 3 years but may extend to 7 years",
            B: "Not less than 5 years but may extend to 10 years",
            C: "Not less than 1 year but may extend to 5 years",
            D: "Not less than 7 years but may extend to 14 years"
        },
        correctAnswer: "A",
        explanation: "Section 4 prescribes the standard punishment: Rigorous Imprisonment (RI) of 3 to 7 years + Fine."
    },
    {
        id: 12,
        question: "If the proceeds of crime involved in money-laundering relate to an offence under the Narcotics Drugs and Psychotropic Substances Act (as per the proviso to Section 4), the imprisonment may extend up to:",
        options: {
            A: "7 years",
            B: "10 years",
            C: "14 years",
            D: "Life imprisonment"
        },
        correctAnswer: "B",
        explanation: "Proviso to Section 4: If the scheduled offence is under the NDPS Act, the maximum punishment extends to 10 years (instead of 7)."
    },
    {
        id: 13,
        question: "Who is authorized to provisionally attach property involved in money-laundering under Section 5(1)?",
        options: {
            A: "Any Police Officer not below the rank of Inspector",
            B: "The Director or any officer not below the rank of Deputy Director",
            C: "The Adjudicating Authority",
            D: "The District Magistrate"
        },
        correctAnswer: "B",
        explanation: "Section 5(1) empowers the Director or an officer not below the rank of Deputy Director to issue a provisional attachment order."
    },
    {
        id: 14,
        question: "What is the maximum validity period of a provisional attachment order made under Section 5(1)?",
        options: {
            A: "90 days",
            B: "180 days",
            C: "365 days",
            D: "60 days"
        },
        correctAnswer: "B",
        explanation: "Section 5(1) states the provisional attachment order is valid for a period not exceeding 180 days."
    },
    {
        id: 15,
        question: "Within how many days from the date of provisional attachment must the Director file a complaint before the Adjudicating Authority?",
        options: {
            A: "30 days",
            B: "45 days",
            C: "60 days",
            D: "90 days"
        },
        correctAnswer: "A",
        explanation: "Section 5(5) requires the Director to file a complaint (Adjudication) within 30 days of the attachment order."
    },
    {
        id: 16,
        question: "The Adjudicating Authority shall consist of a Chairperson and how many other Members?",
        options: {
            A: "One other Member",
            B: "Two other Members",
            C: "Three other Members",
            D: "Four other Members"
        },
        correctAnswer: "B",
        explanation: "Section 6: The Adjudicating Authority consists of a Chairperson and two other Members."
    },
    {
        id: 17,
        question: "To be appointed as a Member of the Adjudicating Authority in the field of law, a person must be qualified for appointment as:",
        options: {
            A: "A High Court Judge",
            B: "A District Judge",
            C: "A Supreme Court Judge",
            D: "An Advocate General"
        },
        correctAnswer: "B",
        explanation: "Section 6(3)(a): A member from the field of law must be qualified for appointment as a District Judge (or has been a member of the Indian Legal Service, Grade I)."
    },
    {
        id: 18,
        question: "Regarding the procedure of the Adjudicating Authority, which of the following statements is correct?",
        options: {
            A: "It is strictly bound by the Code of Civil Procedure, 1908.",
            B: "It is strictly bound by the Code of Criminal Procedure, 1973.",
            C: "It is not bound by the Code of Civil Procedure but shall be guided by the principles of natural justice.",
            D: "It has no power to regulate its own procedure."
        },
        correctAnswer: "C",
        explanation: "Section 6(15): The Adjudicating Authority is not bound by the Code of Civil Procedure but shall be guided by the principles of natural justice."
    },
    {
        id: 19,
        question: "Under Section 8, if the Adjudicating Authority believes a person has committed an offence under Section 3, it may serve a notice calling upon them to indicate the source of their income within a period of not less than:",
        options: {
            A: "15 days",
            B: "30 days",
            C: "45 days",
            D: "60 days"
        },
        correctAnswer: "B",
        explanation: "Section 8(1): The notice period to indicate sources of income etc. shall not be less than 30 days."
    },
    {
        id: 20,
        question: "When computing the period of 365 days for investigation during which attachment continues, which period shall be excluded?",
        options: {
            A: "Public holidays",
            B: "The period during which the investigation is stayed by any court under any law",
            C: "The period taken for departmental enquiries",
            D: "Weekends"
        },
        correctAnswer: "B",
        explanation: "Explanation to Section 5: In computing the 180 days (or 365 days in amended contexts), the period of court stay is excluded."
    }
];
