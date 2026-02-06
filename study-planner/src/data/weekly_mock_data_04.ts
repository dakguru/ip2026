import { Question } from "./live_mock_data";

export const WEEKLY_MOCK_04_QUESTIONS: Question[] = [
    {
        id: "weekly-04-1",
        text: "Under the NSC (VIII Issue) Scheme, 2019, if an account holder needs to close the account prematurely due to a court order after 2 years but before 3 years from the date of opening, what amount is payable?",
        options: ["Only the Principal amount", "Principal amount with interest at the rate applicable to Post Office Savings Account (POSA)", "Principal amount with interest at the rate applicable to NSC", "Premature closure is not allowed under any circumstances before 5 years"],
        correctAnswer: 1,
        explanation: "While NSC generally has a 5-year maturity, premature closure is allowed under specific conditions like a court order. If closed after 1 year but before 3 years, the principal is paid along with interest at the POSA rate."
    },
    {
        id: "weekly-04-2",
        text: "What is the maximum number of adults who can jointly open a \"Joint B-Type\" NSC account?",
        options: ["Two adults", "Three adults", "Four adults", "No limit on the number of adults"],
        correctAnswer: 1,
        explanation: "Both Joint A-Type (payable to all) and Joint B-Type (payable to any) NSC accounts can be opened by up to three adults."
    },
    {
        id: "weekly-04-3",
        text: "Which of the following statements regarding deposits in the NSC (VIII Issue) Scheme is CORRECT?",
        options: ["Minimum deposit is ₹500, and there is a maximum limit of ₹15 lakh", "Minimum deposit is ₹1000, and there is a maximum limit of ₹50 lakh", "Minimum deposit is ₹1000, and there is no maximum limit", "Minimum deposit is ₹500, and there is no maximum limit"],
        correctAnswer: 2,
        explanation: "The scheme requires a minimum deposit of ₹1000 (in multiples of ₹100) and explicitly states there is no maximum limit for deposits."
    },
    {
        id: "weekly-04-4",
        text: "If a single NSC account holder dies, to whom can the account be transferred?",
        options: ["Only to the nominee", "Only to the legal heirs", "Either to the legal heirs or the nominees", "The account cannot be transferred; it must be closed immediately"],
        correctAnswer: 2,
        explanation: "On the death of a single account holder, the amount (or account) is transferred to the legal heirs or the nominees."
    },
    {
        id: "weekly-04-5",
        text: "At what age can a minor open an NSC account in their own name?",
        options: ["5 years", "10 years", "15 years", "18 years"],
        correctAnswer: 1,
        explanation: "A minor who has attained the age of ten years is eligible to open an NSC account in his own name.\nKisan Vikas Patra (KVP) Scheme, 2019"
    },
    {
        id: "weekly-04-6",
        text: "For KVP accounts opened on or after July 1, 2023, what is the specified maturity period?",
        options: ["110 months", "115 months", "120 months", "124 months"],
        correctAnswer: 1,
        explanation: "The maturity period for KVP accounts opened on or after July 1, 2023, is explicitly defined as 115 months."
    },
    {
        id: "weekly-04-7",
        text: "Under what condition can a KVP account be prematurely closed by the holder \"at any time\"?",
        options: ["If the holder needs funds for medical emergencies", "On the death of the account holder in a single account", "After completing 1 year from the date of deposit", "Only after 2 years and 6 months"],
        correctAnswer: 1,
        explanation: "Premature closure \"at any time\" is permitted under specific circumstances, including the death of the account holder in a single account or all holders in a joint account."
    },
    {
        id: "weekly-04-8",
        text: "What is the interest rate applicable if a KVP account is closed due to forfeiture by a pledgee (Gazetted Officer)?",
        options: ["KVP interest rate compounded annually", "Simple interest at the POSA rate for the complete months held", "No interest is payable; only the principal is refunded", "Penalty of 2% is deducted from the principal"],
        correctAnswer: 1,
        explanation: "Upon closure due to forfeiture by a pledgee, the principal is paid along with simple interest at the rate applicable to the Post Office Savings Account for the complete months held."
    },
    {
        id: "weekly-04-9",
        text: "Which type of KVP account is \"payable to any\" of the account holders?",
        options: ["Single Holder Type", "Joint A-Type", "Joint B-Type", "Minor's account through guardian"],
        correctAnswer: 2,
        explanation: "Joint B-Type accounts are opened by up to three adults and are payable to \"any\" of the holders."
    },
    {
        id: "weekly-04-10",
        text: "Beyond the lock-in period, a KVP account can be closed \"any time after the expiry of\" how many years and months?",
        options: ["1 year and 6 months", "2 years and 3 months", "2 years and 6 months", "3 years"],
        correctAnswer: 2,
        explanation: "Excluding specific conditions like death or court orders, KVP can be closed inclusive of interest after the expiry of two years and six months from the date of opening.\nPublic Provident Fund (PPF) Scheme, 2019"
    },
    {
        id: "weekly-04-11",
        text: "What is the minimum and maximum annual subscription limit for a PPF account in a financial year?",
        options: ["Minimum ₹100, Maximum ₹1,00,000", "Minimum ₹500, Maximum ₹1,50,000", "Minimum ₹500, Maximum ₹2,00,000", "Minimum ₹1,000, Maximum ₹1,50,000"],
        correctAnswer: 1,
        explanation: "The limits for subscription in a PPF account are a minimum of ₹500 and a maximum of ₹1,50,000 per financial year."
    },
    {
        id: "weekly-04-12",
        text: "In which financial year does a PPF account holder become eligible to apply for their first loan?",
        options: ["1st Financial Year", "2nd Financial Year", "3rd Financial Year", "7th Financial Year"],
        correctAnswer: 2,
        explanation: "A loan can be taken after the expiry of one year from the end of the year in which the initial subscription was made, which effectively means the facility starts from the 3rd financial year."
    },
    {
        id: "weekly-04-13",
        text: "If a PPF loan is not repaid within 36 months, what is the penal interest rate charged?",
        options: ["1% per annum", "2% per annum", "4% per annum", "6% per annum"],
        correctAnswer: 3,
        explanation: "If the loan is not repaid within 36 months, interest is charged at 6% per annum instead of the standard 1% per annum, effective from the first day of the month following the loan disbursement."
    },
    {
        id: "weekly-04-14",
        text: "How is interest calculated for a PPF account each month?",
        options: ["On the lowest balance between the 1st and the end of the month", "On the lowest balance between the 5th day and the end of the month", "On the highest balance between the 10th and the end of the month", "On the average daily balance of the month"],
        correctAnswer: 1,
        explanation: "The lowest balance at the credit of a PPF account between the close of the fifth day and the end of the month is eligible for interest calculation."
    },
    {
        id: "weekly-04-15",
        text: "An account holder of a \"discontinued\" PPF account is prohibited from doing what?",
        options: ["Earning any interest on the existing balance", "Reviving the account after 2 years", "Opening another PPF account in their name", "Withdrawing the principal even after 15 years"],
        correctAnswer: 2,
        explanation: "The account holder of a discontinued account is prohibited from opening another PPF account in his name until the final closure of the discontinued account after maturity.\nSukanya Samriddhi Account (SSA) Scheme, 2019"
    },
    {
        id: "weekly-04-16",
        text: "What is the maximum age of a girl child up to which an account can be opened under SSA?",
        options: ["5 years", "10 years", "12 years", "18 years"],
        correctAnswer: 1,
        explanation: "The SSA scheme is intended for girl children, and accounts can be opened by a guardian in the name of a girl child who has not attained the age of ten years."
    },
    {
        id: "weekly-04-17",
        text: "Under SSA 2019, if a guardian is satisfied that the continuation of the account causes \"undue hardship\" due to life-threatening diseases of the holder, what can be allowed?",
        options: ["Partial withdrawal up to 25%", "Loan up to 50%", "Premature closure of the account", "Transfer of the account to a sibling"],
        correctAnswer: 2,
        explanation: "Premature closure may be allowed on extreme compassionate grounds, such as medical support for life-threatening diseases of the account holder or the death of the guardian, if continuation causes undue hardship."
    },
    {
        id: "weekly-04-18",
        text: "For reasons other than death or extreme hardship, when is premature closure of an SSA account permitted?",
        options: ["Any time after 2 years from opening", "Any time after 5 years from opening", "Any time after completion of 6 months from the date of opening", "Only after the girl turns 18"],
        correctAnswer: 2,
        explanation: "Premature closure for \"any reason other than\" death or hardship is permitted any time after the completion of six months from the date of opening, though it incurs a lower interest rate."
    },
    {
        id: "weekly-04-19",
        text: "If an SSA account is closed prematurely for reasons other than death/hardship (after 6 months), what interest rate is applicable?",
        options: ["2% lower than the SSA specified rate", "4% (POSA rate)", "No interest", "5.5% fixed"],
        correctAnswer: 0,
        explanation: "In such cases of premature closure, the account is eligible only for an interest rate that is 2% points less than the rate specified for the SSA scheme."
    },
    {
        id: "weekly-04-20",
        text: "Does the investment in Sukanya Samriddhi Account qualify for tax rebate under Section 80C?",
        options: ["No, it is a taxable scheme", "Only for accounts opened before 2021", "Yes, investment qualifies for 80C rebate", "Only interest is tax-free"],
        correctAnswer: 2,
        explanation: "The documentation indicates that while some schemes like MSSC do not qualify, SSA is one of the schemes where deposits qualify for deduction under Section 80C. (Note: The snippet mentions MSSC does NOT qualify, contrasting it with others like SSA/NSC/PPF).\nPM CARES for Children Scheme, 2021"
    },
    {
        id: "weekly-04-21",
        text: "The PM CARES for Children Scheme, 2021, was specifically introduced to support which category of children?",
        options: ["Children from low-income families", "Children who lost both parents due to COVID-19", "Children with physical disabilities", "All children below 10 years in rural areas"],
        correctAnswer: 1,
        explanation: "The PM CARES for Children Scheme was notified in 2021 to provide support for children who lost their parents during the pandemic."
    },
    {
        id: "weekly-04-22",
        text: "At what age does the beneficiary typically receive the final lump sum amount under the PM CARES for Children Scheme?",
        options: ["18 years", "21 years", "23 years", "25 years"],
        correctAnswer: 2,
        explanation: "Under the PM CARES for Children Scheme, the child is provided with a monthly stipend from age 18 and a lump sum amount upon reaching 23 years of age."
    },
    {
        id: "weekly-04-23",
        text: "Who acts as the \"Account Holder\" in the records for a PM CARES for Children account?",
        options: ["The child alone", "The District Magistrate as guardian", "The surviving relative", "A joint account of the child and the PM CARES fund manager"],
        correctAnswer: 1,
        explanation: "For these accounts, the child is the beneficiary, but the District Magistrate often acts as the guardian for the purpose of the scheme's administration."
    },
    {
        id: "weekly-04-24",
        text: "Is the interest earned on PM CARES for Children Scheme accounts taxable?",
        options: ["Yes, as per individual tax slabs", "No, it is fully exempt from tax", "Only if interest exceeds ₹50,000", "10% TDS is mandatory"],
        correctAnswer: 1,
        explanation: "Provisions for the PM CARES for Children Scheme generally ensure that the benefits and interest are tax-exempt to support the welfare of the orphans."
    },
    {
        id: "weekly-04-25",
        text: "What is the primary purpose of the monthly stipend provided between age 18 and 23 in PM CARES?",
        options: ["To pay for primary schooling", "To meet personal requirements and higher education expenses", "To invest in a new business", "To pay for medical insurance only"],
        correctAnswer: 1,
        explanation: "The monthly stipend from age 18 to 23 is designed to help the beneficiary meet their personal needs and sustain themselves during higher education.\nMahila Samman Savings Certificate (MSSC), 2023"
    },
    {
        id: "weekly-04-26",
        text: "What is the maximum deposit limit for the Mahila Samman Savings Certificate?",
        options: ["₹1,50,000", "₹2,00,000", "₹5,00,000", "No maximum limit"],
        correctAnswer: 1,
        explanation: "The MSSC scheme, notified in 2023, has a maximum deposit limit of ₹2 lakh for a tenure of 2 years."
    },
    {
        id: "weekly-04-27",
        text: "Does the investment under the Mahila Samman Savings Scheme qualify for rebate under Section 80C?",
        options: ["Yes, up to ₹1.5 lakh", "No, it does not qualify for rebate under 80C", "Only for senior citizens", "Yes, but only for the interest earned"],
        correctAnswer: 1,
        explanation: "The scheme documentation explicitly states: \"The investment under this scheme does not qualify for rebate under 80C of Income Tax Act whereas the interest earned under this scheme is taxable\"."
    },
    {
        id: "weekly-04-28",
        text: "What is the threshold limit for Tax Deduction at Source (TDS) on interest for \"Others\" (non-senior citizens) under the MSSC?",
        options: ["₹10,000", "₹40,000", "₹50,000", "TDS is not applicable"],
        correctAnswer: 1,
        explanation: "For the \"Others\" category (non-senior citizens), the threshold limit for TDS in respect of MSSC is ₹40,000."
    },
    {
        id: "weekly-04-29",
        text: "What is the TDS threshold limit specifically for \"Senior Citizens\" under the MSSC?",
        options: ["₹40,000", "₹50,000", "₹60,000", "Senior citizens are exempt from TDS regardless of amount"],
        correctAnswer: 1,
        explanation: "The threshold limit for TDS for a Senior Citizen (resident individual aged 60 or more) under MSSC is ₹50,000."
    },
    {
        id: "weekly-04-30",
        text: "If an MSSC account is closed prematurely after 6 months for any reason other than death or extreme hardship, what is the interest rate?",
        options: ["4%", "2% lower than the scheme rate (approx. 5.5%)", "7.5% fixed", "No interest is paid"],
        correctAnswer: 1,
        explanation: "For premature closure after six months for general reasons, the account earns interest at 2% less than the specified rate for the scheme, which makes it approximately 5.5%.\nHere are 20 high-quality Multiple Choice Questions (MCQs) on SB Orders 2023 to 2025, numbered from 31 to 50 as requested. Each question includes a detailed explanation referencing the provided text.\nSB Orders 2025"
    },
    {
        id: "weekly-04-31",
        text: "According to the SOP for CBS e-KYC (SB Order 01/2025), which of the following Small Savings Schemes are included in the \"Phase-II\" rollout for paperless transactions?",
        options: ["POSA only", "SSA and PPF only", "MIS, TD, NSC, KVP, RD, and PPF", "All schemes including SCSS and MSSC"],
        correctAnswer: 2,
        explanation: "The rollout of e-KYC is conducted in phases. Phase-I covers POSA only. Phase-II extends this facility to \"MIS, TD, NSC, KVP, RD &amp; PPF\"."
    },
    {
        id: "weekly-04-32",
        text: "In the context of e-KYC operations (SB Order 01/2025), which specific Finacle menu is used for \"e-KYC CIF Modification\"?",
        options: ["ECCRC", "ECMRC", "CASBAM", "HAALM"],
        correctAnswer: 1,
        explanation: "The Finacle menu ECCRC is used for CIF creation, while ECMRC is explicitly designated for \"e-KYC CIF Modification\"."
    },
    {
        id: "weekly-04-33",
        text: "Under SB Order 06/2025 regarding Section 194-A of the IT Act, what is the TDS threshold limit for \"Others\" (non-Senior Citizens) for the financial year 2025-26?",
        options: ["Rs. 40,000", "Rs. 50,000", "Rs. 10,000", "Rs. 20,000"],
        correctAnswer: 1,
        explanation: "The threshold limit for TDS under Sec 194-A for \"Others\" has been revised from Rs. 40,000 (up to 2024-25) to Rs. 50,000 for the financial year 2025-26."
    },
    {
        id: "weekly-04-34",
        text: "With the amendment to SB Order 25/2022 via SB Order 10/2025, what \"Freeze Reason Code\" must be used for accounts that have matured but remain unclosed for more than 3 years?",
        options: ["SCWFR", "INOP", "FROZ", "MATU"],
        correctAnswer: 1,
        explanation: "The order specifies that for Small Savings Schemes accounts that are matured but not closed after 3 years, the Freeze reason code to be used is INOP, which stands for \"Inoperative more than 3 years\".\nSB Orders 2024"
    },
    {
        id: "weekly-04-35",
        text: "As per SB Order 05/2024 regarding the regularization of PPF accounts opened in the name of a minor, what interest rate is payable for the period until the minor attains 18 years of age?",
        options: ["The prevailing PPF Scheme rate", "The prevailing POSA (Post Office Savings Account) rate", "Zero percent interest", "PPF Scheme rate minus 1%"],
        correctAnswer: 1,
        explanation: "For irregular PPF accounts opened for minors, \"POSA interest shall be paid to such irregular accounts until the individual (minor) becomes eligible for opening of account, that is, the individual attains 18 years of age\"."
    },
    {
        id: "weekly-04-36",
        text: "According to SB Order 05/2024, how should the third irregular NSS-87 account (opened in addition to two others) be treated regarding interest payment?",
        options: ["Paid at POSA rate", "Paid at POSA rate + 200 bps", "Refunded with Zero percent interest", "Merged with the primary account"],
        correctAnswer: 2,
        explanation: "For irregular NSS-87 accounts, \"For the third account/more irregular accounts, no interest shall be paid and the principal amount shall be refunded to the investor\"."
    },
    {
        id: "weekly-04-37",
        text: "SB Order 06/2024 introduced the facility to open which of the following accounts through Department of Posts (DOP) Internet Banking?",
        options: ["SSA and PPF only", "MIS, SCSS, and MSSC", "KVP and NSC", "RD and TD only"],
        correctAnswer: 1,
        explanation: "SB Order 06/2024 facilitated the \"Introduction of opening of Monthly Income Scheme (MIS) Account, Senior Citizen Savings Scheme (SCSS) Account and Mahila Samman Saving Certificate (MSSC) through DOP Internet Banking\"."
    },
    {
        id: "weekly-04-38",
        text: "In the process of correcting interest entries (SB Order 03/2024), who is responsible for executing the HACINT menu in Finacle?",
        options: ["The Counter PA", "The Supervisor SBCO", "The Incharge CPC (CBS)", "The Divisional Head"],
        correctAnswer: 2,
        explanation: "After the Supervisor SBCO invokes the HIARM menu for adjustment, \"the Incharge CPC (CBS) will execute the HACINT for HIARM entries\"."
    },
    {
        id: "weekly-04-39",
        text: "Under SB Order 03/2024, what is the financial power of a Head of Division or Group A Postmaster to sanction claims involving correction of the Principal/Interest amount?",
        options: ["Up to Rs. 10,000", "Up to Rs. 25,000", "Up to Rs. 50,000", "Unlimited"],
        correctAnswer: 1,
        explanation: "The \"Head of Division (irrespective of class) and Group A Postmaster can sanction the claims up to Rs. 25,000/- in each case\"."
    },
    {
        id: "weekly-04-40",
        text: "Per SB Order 05/2024, if an NRI extended their PPF account where Form H did not ask for residency status, what interest rate applies to the account after 30th September 2024?",
        options: ["POSA rate", "PPF Scheme rate", "Zero percent", "SCSS rate"],
        correctAnswer: 2,
        explanation: "Such accounts earn POSA interest until 30th September 2024. \"Thereafter, the said account shall earn zero percentage rate of interest\"."
    },
    {
        id: "weekly-04-41",
        text: "How should a Sukanya Samriddhi Account (SSA) opened by grandparents (who are not legal guardians) be regularized according to SB Order 05/2024?",
        options: ["The account must be closed immediately.", "Guardianship shall be transferred to the natural or legal guardian.", "It will earn POSA interest only.", "It cannot be regularized and must be frozen."],
        correctAnswer: 1,
        explanation: "\"In case of accounts opened under the guardianship of grandparents... the guardianship shall be transferred to a person entitled under the law in force, that is, to the natural guardian (alive parents) or Legal Guardian\".\nSB Orders 2023"
    },
    {
        id: "weekly-04-42",
        text: "According to SB Order 05/2023 (MSSC Scheme), what is the minimum deposit amount required to open an account?",
        options: ["Rs. 100", "Rs. 500", "Rs. 1,000", "Rs. 5,000"],
        correctAnswer: 2,
        explanation: "\"A minimum of Rs.1000/- and any sum in multiples of Rs.1000/- may be deposited in an account\"."
    },
    {
        id: "weekly-04-43",
        text: "Under the Mahila Samman Savings Certificate (MSSC) rules (SB Order 05/2023), what is the mandatory time gap required between opening an existing account and a new account for the same individual?",
        options: ["1 month", "3 months", "6 months", "1 year"],
        correctAnswer: 1,
        explanation: "An individual may open any number of accounts subject to the maximum limit and \"a time gap of three months between the existing account and the opening of another account\"."
    },
    {
        id: "weekly-04-44",
        text: "What is the maturity period for a Mahila Samman Savings Certificate (MSSC) account as per SB Order 05/2023?",
        options: ["1 year", "2 years", "3 years", "5 years"],
        correctAnswer: 1,
        explanation: "\"The account shall mature on completion of two years from the date of the account opening\"."
    },
    {
        id: "weekly-04-45",
        text: "If a depositor has not submitted their PAN at the time of account opening, under SB Order 08/2023, they must submit it within two months if the aggregate of all withdrawals and transfers in a month exceeds:",
        options: ["Rs. 5,000", "Rs. 10,000", "Rs. 50,000", "Rs. 1,00,000"],
        correctAnswer: 1,
        explanation: "PAN must be submitted within two months if \"The aggregate of all withdrawal and transfers in a month from the account exceeds Rs. 10,000/-\"."
    },
    {
        id: "weekly-04-46",
        text: "SB Order 07/2023 increased the maximum investment limit for a Joint Account in the Monthly Income Scheme (MIS) to:",
        options: ["Rs. 9 Lakh", "Rs. 10 Lakh", "Rs. 15 Lakh", "Rs. 30 Lakh"],
        correctAnswer: 2,
        explanation: "The maximum investment limit for MIS was enhanced \"from Rs.9 lakh to Rs.15 lakh in Joint Account\"."
    },
    {
        id: "weekly-04-47",
        text: "According to SB Order 01/2023, what is the prescribed timeline for settling deceased claim cases where no nomination exists?",
        options: ["One working day", "Three working days", "Seven working days", "Thirty days"],
        correctAnswer: 2,
        explanation: "Post offices must ensure settlement within \"seven working days in other cases\" (i.e., where no nomination exists)."
    },
    {
        id: "weekly-04-48",
        text: "SB Order 03/2023 clarifies that premature closure of an NSC account is permitted under Rule 7(1) of NSC Scheme 2019 upon the request of:",
        options: ["The Account Holder only", "The Joint Account Holder", "The Sr. Manager of a Nationalized Bank (pledgee)", "The Postmaster"],
        correctAnswer: 2,
        explanation: "\"On request of Sr. Manager of Nationalized bank, the premature closure can be done as per rule 7(1) of NSC Scheme, 2019\" (typically in cases where the account was pleaded/pledged in favor of the bank)."
    },
    {
        id: "weekly-04-49",
        text: "For TDS on the Mahila Samman Savings Certificate (MSSC) under SB Order 13/2023, what is the threshold limit for Senior Citizens for the financial year 2025-26?",
        options: ["Rs. 40,000", "Rs. 50,000", "Rs. 1,00,000", "Rs. 1,50,000"],
        correctAnswer: 2,
        explanation: "The table for TDS on MSSC shows that for a Senior Citizen, the \"Threshold limit from 2025-26\" is \"Rs.1 Lakh\"."
    },
    {
        id: "weekly-04-50",
        text: "Under SB Order 05/2023 (MSSC), if an account is closed prematurely for extreme compassionate grounds (like life-threatening disease), what interest rate is payable?",
        options: ["POSA rate", "Scheme rate (7.5%)", "Scheme rate minus 1%", "Scheme rate minus 2%"],
        correctAnswer: 1,
        explanation: "The penalty of 2% (reducing rate to 5.5%) applies only to premature closure for \"any reason other than mentioned in para above\" (i.e., other than death or compassionate grounds). Therefore, closure for compassionate grounds is allowed by order, implying the principal scheme rate applies without the specific 2% penalty clause mentioned for voluntary early closure. Note: While the text explicitly defines the penalty for \"other\" reasons, standard interpretation for compassionate grounds allowed by order is that they do not suffer the penal interest deduction unless specified."
    },
];
