import { QuizTopic } from "@/lib/quizTypes";

const ALL_SETS_DATA = {
    1: [
        { q: "On which date did the Post Office Act, 2023 come into force?", o: ["1st Jan 2024", "24th Dec 2023", "16th Dec 2024", "1st April 2023"], a: 1 },
        { q: "According to Section 2(b), what is an 'item'?", o: ["Any letter", "An indivisible article accepted for service", "A parcel > 10kg", "Government document"], a: 1 },
        { q: "Who provides the services prescribed under the Act?", o: ["State Govt", "Post Office", "Private Couriers", "Foreign Post"], a: 1 },
        { q: "Who has the power to make 'regulations' under the Act?", o: ["Parliament", "Central Govt", "Director General", "Circle Head"], a: 2 },
        { q: "The Post Office has the 'exclusive privilege' of issuing what?", o: ["Money Orders", "Postage Stamps", "Parcels", "ID Cards"], a: 1 },
        { q: "In the Act, 'Post Office' means:", o: ["Only the building", "Department of Posts & its assets", "The staff only", "The sorting hub"], a: 1 },
        { q: "Which Section deals with the Exclusive Privilege of Postage Stamps?", o: ["Section 3", "Section 4", "Section 5", "Section 6"], a: 1 },
        { q: "What does the term 'prescribe' mean in the Act?", o: ["Prescribed by rules", "Prescribed by DG", "Prescribed by Circle Head", "Prescribed by Parliament"], a: 0 },
        { q: "The term 'Director General' includes:", o: ["Only the DG", "Any officer authorized by Central Govt", "Any PMG", "The Minister"], a: 1 },
        { q: "Services provided by the Post Office are subject to:", o: ["Only PO Act", "Any other law for the time being in force", "UPU rules only", "No other laws"], a: 1 },
        { q: "The Post Office Act 2023 is Act No. ___ of 2023.", o: ["40", "43", "45", "50"], a: 1 }
    ],
    2: [
        { q: "Charges for services not paid by a user are recoverable as:", o: ["Civil Debt", "Fine", "Arrear of Land Revenue", "Property Tax"], a: 2 },
        { q: "Official marks on items are considered:", o: ["Invalid", "Prima facie evidence", "Secondary evidence", "Hearsay"], a: 1 },
        { q: "Which Section grants power to intercept items?", o: ["Section 7", "Section 8", "Section 9", "Section 10"], a: 2 },
        { q: "Which is NOT a ground for interception under Section 9?", o: ["Security of State", "Public Order", "Tax Evasion", "Emergency"], a: 2 },
        { q: "Section 10 deals with:", o: ["Exemption from Liability", "Stamps", "Foreign Post", "Penalties"], a: 0 },
        { q: "An officer incurs liability only if they act:", o: ["Negligently", "Fraudulently or Wilfully", "Slowly", "Mistakenly"], a: 1 },
        { q: "Power to delegate authority (other than rulemaking) lies with:", o: ["Director General", "Central Govt", "Parliament", "Circle Head"], a: 1 },
        { q: "Who makes 'Rules' for carrying out the purposes of the Act?", o: ["Director General", "Central Govt", "Postal Board", "Ministry of Finance"], a: 1 },
        { q: "Rules and Regulations must be laid before Parliament for how long?", o: ["15 days", "30 days", "60 days", "90 days"], a: 1 },
        { q: "The Post Office Act 2023 repealed which Act?", o: ["Act of 1854", "Act of 1898", "Act of 1933", "Act of 2000"], a: 1 },
        { q: "Orders to 'remove difficulties' (Sec 15) can be made up to:", o: ["1 year", "2 years", "3 years", "5 years"], a: 1 }
    ],
    3: [
        { q: "When do the Post Office Rules, 2024 come into force?", o: ["Jan 1, 2024", "Dec 24, 2023", "Dec 16, 2024", "April 1, 2025"], a: 2 },
        { q: "Who is defined as the 'Circle Head'?", o: ["Director General", "Chief Postmaster General", "Region Director", "Supdt of Post"], a: 1 },
        { q: "Who is defined as the 'Divisional Head'?", o: ["Inspector", "SSPOs / SSRM / Chief PM", "PMG", "Assistant Director"], a: 1 },
        { q: "Postal services that are affordable and available to all users are called:", o: ["Value Added", "Universal Postal Service", "Premium Service", "Basic Service"], a: 1 },
        { q: "The apex level policy making body is:", o: ["Philatelic Committee", "Postal Services Board", "Circle Board", "Ministry of IT"], a: 1 },
        { q: "Who authorizes the introduction or modification of products?", o: ["Central Govt", "Director General", "Postal Board", "Circle Head"], a: 1 },
        { q: "Can the Post Office collaborate with private entities?", o: ["No, never", "Yes, as authorized by DG", "Only with public entities", "Only for transport"], a: 1 },
        { q: "What is 'Value-added service'?", o: ["Free service", "Add-on features on mail services", "Discounts", "Foreign mail"], a: 1 },
        { q: "The definition of 'Board' refers to:", o: ["Circle Board", "Postal Services Board", "Railway Board", "Selection Board"], a: 1 },
        { q: "Which rule defines the 'Postal Services Board'?", o: ["Rule 3", "Rule 4", "Rule 5", "Rule 6"], a: 2 },
        { q: "Mail offices are premises associated with:", o: ["Selling stamps", "Handling/Processing items", "Admin work only", "Housing staff"], a: 1 }
    ],
    4: [
        { q: "Who issues definitive and commemorative postage stamps?", o: ["Director General only", "Central Govt or DG", "Circle Head", "Mint"], a: 1 },
        { q: "The Philatelic Advisory Committee advises whom?", o: ["Director General", "Central Govt", "Postal Board", "Circle Head"], a: 1 },
        { q: "Which is a valid mode of payment for postage?", o: ["Cash", "Digital", "Franking Machine", "All of the above"], a: 3 },
        { q: "Who specifies standards for addressing on items?", o: ["Central Govt", "Director General", "Circle Head", "Sender"], a: 1 },
        { q: "Who manages and publishes Postcodes (PIN)?", o: ["Ministry of Home", "Director General", "Survey of India", "State Govt"], a: 1 },
        { q: "International postal co-operation follows the convention of:", o: ["WTO", "UPU (Universal Postal Union)", "UN", "IMF"], a: 1 },
        { q: "An official mark on an item can denote:", o: ["It is refused", "Postage is due", "It is unclaimed", "All of the above"], a: 3 },
        { q: "Who is deemed to be the 'sender' of an item?", o: ["Person at counter", "Person/Address purported to have come from", "Postman", "Sorter"], a: 1 },
        { q: "Rule 12 deals with:", o: ["Stamps", "Arrangements with other countries", "Liability", "Definitions"], a: 1 },
        { q: "Rule 13 states that Post Office marks are proof of:", o: ["Date of posting", "Facts denoted (refused/rejected)", "Contents", "Weight"], a: 1 },
        { q: "Franking machine impressions are valid under which Rule?", o: ["Rule 8", "Rule 9", "Rule 10", "Rule 11"], a: 1 }
    ],
    5: [
        { q: "Who is the competent authority to order interception (normal case)?", o: ["Divisional Head", "Member (Ops) or Circle Head", "PMG", "Inspector"], a: 1 },
        { q: "In 'unavoidable circumstances', who can order interception?", o: ["ASP", "Regional Head / Regional Director", "Head Postmaster", "Overseer"], a: 1 },
        { q: "In 'emergent cases', who can order interception?", o: ["Postman", "Divisional Head", "Sub Postmaster", "ASP"], a: 1 },
        { q: "If Divisional Head orders interception, reporting time to competent authority is:", o: ["24 hours", "3 working days", "7 days", "Immediate"], a: 1 },
        { q: "Emergent interception ceases if not confirmed within:", o: ["3 days", "5 days", "7 working days", "10 days"], a: 2 },
        { q: "Who is the Chairman of the Review Committee?", o: ["Secretary Posts", "Director General", "Minister", "Member (Ops)"], a: 1 },
        { q: "How often does the Review Committee meet?", o: ["Monthly", "Once in 3 months", "Annually", "Bi-annually"], a: 1 },
        { q: "Directions for interception remain in force initially for:", o: ["15 days", "30 days", "60 days", "90 days"], a: 1 },
        { q: "The maximum extended period for interception is:", o: ["60 days", "90 days", "120 days", "180 days"], a: 1 },
        { q: "Intercepted items must be opened in the presence of:", o: ["Sender", "Addressee", "Concerned law enforcement authority", "Two witnesses"], a: 2 },
        { q: "Compensation for loss/damage shall NOT be paid if:", o: ["Caused by sender's fault", "Force Majeure", "Prohibited Item", "All of the above"], a: 3 }
    ],
    // UPDATED GSPA 1873 SETS
    6: [
        { q: "The Government Savings Promotion Act, 1873 extends to the whole of India. Which notification extended this Act to the State of Sikkim?", o: ["Finance Bill, 2018", "Ministry of Home Affairs Notification dated 22.7.1983", "Government Savings Bank Amendment Act, 1959", "The State of Sikkim Act, 1975"], a: 1, e: "The Act extends to the whole of India and was extended to the State of Sikkim vide Ministry of Home Affairs Notification No. F.11013/1/82-SKM dated 22.7.1983." },
        { q: "As per Section 3 of the Act, an 'Administrator' is defined under which legislation?", o: ["The Indian Majority Act, 1875", "The Banking Regulation Act, 1949", "Clause (a) of Section 2 of the Indian Succession Act, 1925", "The Civil Procedure Code, 1908"], a: 2, e: "'Administrator' means an administrator as defined in clause (a) of section 2 of the Indian Succession Act, 1925." },
        { q: "Who appoints the 'Authorised Officer' in the case of a banking company or institution other than a Post Office Savings Bank?", o: ["The Director General of Posts", "The Reserve Bank of India", "The Central Government", "The State Bank of India or that banking company/institution itself"], a: 3, e: "In the case of SBI or a banking company, the officer is authorised by the State Bank of India or that banking company or that institution." },
        { q: "Under Section 3B, what is the minimum age requirement for a minor to open and operate an account independently in a Government Savings Bank?", o: ["Six years", "Ten years", "Fourteen years", "Eighteen years"], a: 1, e: "A minor who has attained the age of ten years may open and operate an account in the Government Savings Bank, if so permitted under a Savings Scheme." }
    ],
    7: [
        { q: "If a depositor acts as a minor or a person of unsound mind, who has the authority to designate the nominee?", o: ["The Authorised Officer", "The Guardian", "The Court", "No nomination is permitted"], a: 1, e: "Provided that if the depositor is a minor or a person of unsound mind, the nominee shall be designated by the guardian." },
        { q: "What is the legal effect on a nomination if the deposit is transferred (e.g., pledged or transferred to another branch), provided such transfer is permitted under the Savings Scheme?", o: ["The nomination remains valid", "The nomination is suspended until re-verified", "The transfer automatically cancels the previously made nomination", "The transferee becomes the new nominee"], a: 2, e: "The transfer of deposit, if permitted under a Savings Scheme, shall automatically cancel a nomination previously made." },
        { q: "In a scenario where a depositor has died, and the nominee is a minor, to whom shall the deposit be paid if no person was appointed under Section 4(3) to receive it?", o: ["The minor nominee directly", "The Authorised Officer acts as trustee", "The guardian of the minor for the use of the minor", "The District Magistrate"], a: 2, e: "Where there is no such person (appointed to receive it), the deposit shall be paid to the guardian of the minor for the use of the minor." },
        { q: "If a depositor dies without a nomination in force, and no probate/succession certificate is produced within three months, under what condition can the Authorised Officer pay the amount to a claimant?", o: ["If the claimant provides a bank guarantee", "If the deposit does not exceed the limit prescribed", "If the claimant is the eldest son", "If the Postmaster General approves strictly"], a: 1, e: "If the deposit does not exceed such limit as may be prescribed, the Authorised Officer may pay the same to any person appearing to him to be entitled to receive it." }
    ],
    8: [
        { q: "Under Section 5, what is the status of a payment made by the Government Savings Bank in accordance with the Act regarding the Bank's liability?", o: ["It is a partial discharge of liability", "It is a full discharge from all further liability in respect of the money so paid", "The Bank remains liable to creditors of the deceased", "The Bank is liable only if the rightful heir claims later"], a: 1, e: "Any payment made in accordance with the foregoing provisions of this Act shall be a full discharge from all further liability in respect of the money so paid." },
        { q: "Does a payment made under this Act prevent a creditor of the deceased from recovering their debt?", o: ["Yes, the payment protects the money from all creditors", "No, the creditor may recover the claim from the person who received the payment", "Yes, but only if the payment was made to a nominee", "No, but the creditor must sue the Government Savings Bank"], a: 1, e: "Every creditor or claimant against the estate of the deceased may recover his debt or claim out of the money paid under this Act to any person... in the same manner as if that person had obtained letters of administration." },
        { q: "Under Section 7, if a person makes a false statement upon oath or affirmation to an Authorised Officer, they are deemed guilty of an offence under which section of the Indian Penal Code?", o: ["Section 420", "Section 193", "Section 468", "Section 188"], a: 1, e: "Any person who makes any statement which is false... shall be deemed guilty of an offence under section 193 of the Indian Penal Code." },
        { q: "How does the Act facilitate the 'blind' or physically infirm in operating accounts?", o: ["They must operate via a legal guardian only", "They can operate through any literate individual whom they authorise", "They are not permitted to open accounts", "They must be accompanied by a gazetted officer"], a: 1, e: "Section 12A states that any depositor who suffers from physical infirmity, including blindness may operate and make a deposit through any literate individual whom he authorises." }
    ],
    9: [
        { q: "When calculating Court fees under the Court-fees Act, 1870, regarding the estate of a deceased depositor, what happens to the deposit amount?", o: ["It is taxed at double the rate", "It is excluded from the computation if it does not exceed the prescribed limit", "It is included fully regardless of the limit", "It is excluded only if there is a valid nomination"], a: 1, e: "Where the amount of the deposit... does not exceed the prescribed limit, such amount shall be excluded in computing the fee chargeable under the Court-fees Act, 1870." },
        { q: "Every rule made under Section 15 of this Act must be laid before each House of Parliament for a total period of:", o: ["Fourteen days", "Thirty days", "Sixty days", "Ninety days"], a: 1, e: "Every rule made under this section shall be laid... for a total period of thirty days which may be comprised in one session or in two or more successive sessions." },
        { q: "Which of the following Acts were explicitly repealed by Section 16 of the Government Savings Promotion Act, 1873 (as amended in 2018)?", o: ["The Government Savings Certificates Act, 1959 and The Public Provident Fund Act, 1968", "The Banking Regulation Act, 1949 and The RBI Act, 1934", "The Indian Post Office Act, 1898 and The PPF Act, 1968", "The National Savings Institute Act, 1959"], a: 0, e: "The Government Savings Certificates Act, 1959 and the Public Provident Fund Act, 1968 are hereby repealed." },
        { q: "Which of the following is listed as a 'Discontinued Savings Scheme' in Part B of the Schedule?", o: ["Senior Citizens' Savings Scheme", "Mahila Samman Savings Scheme, 2023", "Indira Vikas Patras", "Kisan Vikas Patra"], a: 2, e: "Indira Vikas Patras is listed under Part B (Discontinued Savings Schemes) at item 37. While KVP was discontinued once, it was restarted and is listed in Part A." },
        { q: "According to Section 3A, the Central Government frames new Savings Schemes to promote:", o: ["Corporate investment", "Foreign Direct Investment", "Household savings", "Government infrastructure spending"], a: 2, e: "...frame new Savings Schemes or amend or discontinue existing Savings Schemes to promote household savings in the country." }
    ],
    10: [
        { q: "Which of the following schemes is listed under 'Part A - Existing Savings Schemes' in the Schedule of the Act?", o: ["15-year Annuity Certificates (I series)", "National Savings Certificates (VIII Issue)", "Indira Vikas Patras", "10-Year Treasury Savings Deposits Certificates"], a: 1, e: "National Savings Certificates (VIII Issue) is listed under Part A (Existing Savings Schemes). The others are in Part B (Discontinued)." },
        { q: "'Sukanya Samridhhi Account' is classified under which part of the Schedule?", o: ["Part A - Existing Savings Schemes", "Part B - Discontinued Savings Schemes", "It is not part of the Schedule", "It is under a separate Act"], a: 0, e: "Sukanya Samridhhi Account is item No. 4 in Part A of the Schedule." },
        { q: "Which of the following is a 'Discontinued Savings Scheme' according to Part B of the Schedule?", o: ["Senior Citizens' Savings Scheme", "Public Provident Fund Scheme", "10-Year Social Security Certificates", "PM CARES for Children Scheme, 2021"], a: 2, e: "10-Year Social Security Certificates is item No. 36 in Part B. The others are in Part A." },
        { q: "'Kisan Vikas Patra' was discontinued in 2011. When was it restarted?", o: ["1st April 2014", "23rd September 2014", "1st January 2015", "It was never restarted"], a: 1, e: "The Schedule notes: 'Kisan Vikas Patra (discontinued from 1st December, 2011 and restarted from 23rd September, 2014)'." }
    ],
    11: [
        { q: "If a depositor becomes insane and a manager of their estate has been duly appointed, to whom shall the Authorised Officer make payments?", o: ["The insane depositor directly", "The Guardian (even if a manager exists)", "The Committee or Manager of the estate", "The District Collector"], a: 2, e: "Section 12 states: 'Where a committee or manager of the depositor's estate has been duly appointed, payments shall be made to such committee or manager'." },
        { q: "Under Section 14, legal protection is granted to the Authorised Officer for actions taken in:", o: ["Good faith", "Emergency", "Writing", "Consultation with the Ministry"], a: 0, e: "'No suit or other legal proceeding shall lie against the Authorised Officer... in respect of anything which is in good faith done or intended to be done under this Act'." },
        { q: "Who has the power to include or omit Savings Schemes in the Schedule?", o: ["The Parliament by passing an Amendment Act", "The Reserve Bank of India", "The Central Government by notification", "The Director General of Posts"], a: 2, e: "Section 3A(2): 'The Central Government may, by notification in the Official Gazette, include or omit or amend Savings Schemes in the Schedule'." },
        { q: "If a depositor dies without a nominee, and a claimant produces a succession certificate after 4 months. Is the Authorised Officer bound to accept it?", o: ["No, it must be produced within 3 months.", "Yes, the 3-month limit in Section 4A(4) only applies to discretionary payments without legal proof.", "No, the account is frozen permanently.", "Yes, but only if the amount is less than the prescribed limit."], a: 1, e: "Section 4A(4) applies 'If... probate... or succession certificate... is not, within three months... produced'. If produced (even later), the normal legal succession procedure applies, superseding the discretionary power of the officer." },
        { q: "Which of the following matters can be 'Prescribed' by rules under Section 15?", o: ["The interest rates (Benchmark)", "Fees for discharge of services", "Mechanism for redressal of grievances", "All of the above"], a: 3, e: "Section 15(2) lists all these: (k) benchmark for interest rates , (g) fees , and (m) mechanism for redressal." },
        { q: "In the definition of 'Government Savings Bank', strictly which entities are included?", o: ["Only Post Offices", "Post Offices and State Bank of India (automatically)", "Post Office Savings Bank, and any other company/institution specified by Central Govt notification", "All Nationalized Banks"], a: 2, e: "Section 3(g): 'Government Savings Bank' means (i) a Post Office Savings Bank; or (ii) State Bank of India or a banking company... as the Central Government may, by notification... specify'." }
    ]
};

// Helper to convert the user's flat format into our app's rich format
interface RawQuestion {
    q: string;
    o: string[];
    a: number;
    e?: string;
}

const convertToQuizSet = (setId: number, title: string, data: RawQuestion[]) => {
    return {
        id: `set-${setId}`,
        title: title,
        questions: data.map((item, idx) => ({
            id: `q-${setId}-${idx}`,
            text: item.q,
            options: item.o,
            correctAnswer: item.a, // Index
            explanation: item.e || `Correct Answer: ${item.o[item.a]}.`
        }))
    };
};

export const QUIZ_DATA: QuizTopic[] = [
    {
        id: 'p1-act-rules-2023-24',
        title: 'Post Office Act 2023 & Rules 2024',
        category: 'Paper I',
        sets: [
            convertToQuizSet(1, 'Set 1: The Act (Sections 1-5)', ALL_SETS_DATA[1]),
            convertToQuizSet(2, 'Set 2: The Act (Sections 6-16)', ALL_SETS_DATA[2]),
            convertToQuizSet(3, 'Set 3: Rules 2024 (Definitions & Services)', ALL_SETS_DATA[3]),
            convertToQuizSet(4, 'Set 4: Rules 2024 (Stamps & Payment)', ALL_SETS_DATA[4]),
            convertToQuizSet(5, 'Set 5: Rules 2024 (Interception & Liability)', ALL_SETS_DATA[5])
        ]
    },
    {
        id: 'p1-gsb-act-1873',
        title: 'Govt Savings Promotion Act 1873',
        category: 'Paper I',
        sets: [
            convertToQuizSet(6, 'Set 1: Preliminary, Definitions, and Scope', ALL_SETS_DATA[6]),
            convertToQuizSet(7, 'Set 2: Nomination and Operation', ALL_SETS_DATA[7]),
            convertToQuizSet(8, 'Set 3: Legal Liability and Procedures', ALL_SETS_DATA[8]),
            convertToQuizSet(9, 'Set 4: Miscellaneous and Repeals', ALL_SETS_DATA[9]),
            convertToQuizSet(10, 'Set 5: Specific Savings Schemes & Schedules', ALL_SETS_DATA[10]),
            convertToQuizSet(11, 'Set 6: Operational & Legal Nuances', ALL_SETS_DATA[11])
        ]
    }
];
