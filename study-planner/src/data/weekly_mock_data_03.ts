import { Question } from "./live_mock_data";

export const WEEKLY_MOCK_03_QUESTIONS: Question[] = [
    {
        id: "weekly-03-1",
        text: "What is the maximum number of individuals permitted to open a 'Joint Account' under the Government Savings Promotion General Rules, 2018?",
        options: ["Two individuals", "Three individuals", "Four individuals", "Five individuals"],
        correctAnswer: 1,
        explanation: "Rule 3(1)(e) of GSPR 2018 defines a 'Joint Account' as an account opened in the names of more than one and up to three individuals."
    },
    {
        id: "weekly-03-2",
        text: "An account that has completed its term or extended term and has become due for payment is officially defined as a/an:",
        options: ["Dormant account", "Closed account", "Matured account", "Eligible account"],
        correctAnswer: 2,
        explanation: "Rule 3(1)(f) defines a 'Matured account' as one that has completed its term or extended term and is due for payment."
    },
    {
        id: "weekly-03-3",
        text: "Under the General Rules, if an Indian citizen depositor subsequently ceases to be a citizen of India, what is the status of their savings account?",
        options: ["It continues until maturity with normal interest.", "It is deemed closed from the last day of the month preceding the month of cessation of citizenship.", "It is transferred to a Non-resident Ordinary (NRO) account automatically.", "It continues to earn interest at the Savings Scheme rate until it is manually closed."],
        correctAnswer: 1,
        explanation: "Rule 4(4) states that if a depositor ceases to be a citizen of India, the account is closed or deemed closed from the last day of the month preceding such cessation."
    },
    {
        id: "weekly-03-4",
        text: "A minor who has attained a specific age is permitted to open and operate an account independently. What is this minimum age requirement?",
        options: ["10 years", "12 years", "15 years", "18 years"],
        correctAnswer: 0,
        explanation: "Rule 4(2) specifies that a minor who has attained the age of ten years may open and operate an account."
    },
    {
        id: "weekly-03-5",
        text: "When an account is opened by a guardian on behalf of a minor, which of the following is a mandatory eligibility requirement?",
        options: ["Only the guardian must be a resident citizen of India.", "Only the minor must be a resident citizen of India.", "Both the guardian and the minor must be resident citizens of India.", "Residency is required, but citizenship is optional for the minor."],
        correctAnswer: 2,
        explanation: "Rule 4(1) and its second proviso require that both the guardian and the minor (or person of unsound mind) shall be resident citizens of India."
    },
    {
        id: "weekly-03-6",
        text: "If a depositor fails to submit their PAN within the prescribed period after the account balance exceeds Rs. 50,000, what is the immediate consequence?",
        options: ["The account is permanently closed.", "A penalty of 10% is levied on the interest.", "The account ceases to be operational until the document is submitted.", "The balance is transferred to the Government's revenue account."],
        correctAnswer: 2,
        explanation: "Rule 6(1)(b) states that failure to submit the PAN when the balance exceeds Rs. 50,000 results in the account ceasing to be operational until the document is submitted."
    },
    {
        id: "weekly-03-7",
        text: "In the case of a 'Joint B' type account, how is the account operated according to the rules?",
        options: ["By all depositors jointly only.", "By any of the depositors or surviving depositors severally.", "By the first holder only.", "By all depositors and a witness jointly."],
        correctAnswer: 1,
        explanation: "Rule 8(2)(ii) defines 'Joint B' type as an account to be operated by any of the depositors or surviving depositors severally."
    },
    {
        id: "weekly-03-8",
        text: "Which of the following is NOT classified as an 'Officially Valid Document' for the purpose of identifying a depositor?",
        options: ["Driving licence", "Voter's Identity Card", "Job card issued by MGNREGA", "Ration Card"],
        correctAnswer: 3,
        explanation: "Rule 3(1)(h) lists officially valid documents including Passport, Driving Licence, Voter ID, MGNREGA job card, and NPR letter. Ration Card is not mentioned in the exhaustive list."
    },
    {
        id: "weekly-03-9",
        text: "What is the prescribed timeline for a depositor to submit their Aadhaar Number if they only provided proof of enrollment at the time of opening the account?",
        options: ["Within 2 months", "Within 3 months", "Within 6 months", "Within 1 year"],
        correctAnswer: 2,
        explanation: "Rule 6(1)(a) requires the Aadhaar number to be submitted within 6 months from the date of opening the account for linking."
    },
    {
        id: "weekly-03-10",
        text: "If a depositor becomes a Non-resident Indian (NRI) while an account is in operation, how is the interest handled after the date of maturity?",
        options: ["Interest is paid at the Post Office Savings Account rate.", "No interest shall be payable after the date of maturity.", "Interest continues at the original scheme rate.", "Interest is halved for the period post-maturity."],
        correctAnswer: 1,
        explanation: "Rules 4(3) and 9(4) specify that if a depositor becomes an NRI, the account can continue till maturity, but no interest shall be payable after the date of its maturity."
    },
    {
        id: "weekly-03-11",
        text: "Regarding the conversion of accounts, which of the following statements is correct under Rule 8?",
        options: ["A Single Account can be converted into a Joint Account at any time.", "A Joint Account can be converted into a Single Account at the request of any one holder.", "Conversion of a Joint Account into a Single Account is allowed only in the case of a single surviving holder.", "No conversion between Single and Joint accounts is permitted under any circumstances."],
        correctAnswer: 2,
        explanation: "Rule 8(3) states that a Single Account cannot be converted to Joint and vice-versa, with the sole exception that a Joint Account can become Single if there is only one surviving holder."
    },
    {
        id: "weekly-03-12",
        text: "What is the maximum number of nominees allowed for a single or joint account?",
        options: ["Two", "Three", "Four", "Unlimited"],
        correctAnswer: 2,
        explanation: "Rule 14(1) allows a depositor to nominate one or more individuals, but not exceeding four individuals."
    },
    {
        id: "weekly-03-13",
        text: "In the event of the death of a depositor with no nomination in force and an eligible balance exceeding Rs. 5 lakh, what is required for the claim?",
        options: ["An indemnity bond and two witnesses.", "A legal heir certificate from a Tahsildar only.", "Production of probate of will, letters of administration, or a succession certificate.", "A simple affidavit from all legal heirs."],
        correctAnswer: 2,
        explanation: "Rule 15(6)(ii) mandates that for amounts above Rs. 5 lakh, payment shall be made on submission of probate, letters of administration, or a succession certificate."
    },
    {
        id: "weekly-03-14",
        text: "If a deposit is made by means of a cheque, what is considered the 'date of deposit'?",
        options: ["The date the cheque is handed over to the Accounts Office.", "The date written on the cheque leaf.", "The date of realization of the cheque.", "The date the entry is made in the passbook."],
        correctAnswer: 2,
        explanation: "Rule 7(2) explicitly states that the date of realization of the cheque shall be the date of deposit."
    },
    {
        id: "weekly-03-15",
        text: "Under what condition can an account opened on behalf of a minor be pledged as security?",
        options: ["It cannot be pledged until the minor attains majority.", "It can be pledged only if the guardian certifies the minor is alive and the transfer is for the minor's benefit.", "It can be pledged by the guardian for any personal business requirement.", "It can be pledged only with the prior permission of a Court of Law."],
        correctAnswer: 1,
        explanation: "Rule 16(2) allows pledging of a minor's account provided the guardian certifies in writing that the minor is alive and the transfer is for their benefit."
    },
    {
        id: "weekly-03-16",
        text: "What is the fee prescribed for the 'Transfer of Account' from one Accounts Office to another?",
        options: ["Rs. 50", "Rs. 100", "Rs. 200", "No fee is charged for transfers."],
        correctAnswer: 1,
        explanation: "Schedule II, item (c) specifies the fee for 'Transfer of account' is Rs. 100."
    },
    {
        id: "weekly-03-17",
        text: "Which authority is the competent body for the interpretation of the Government Savings Promotion General Rules, 2018?",
        options: ["Reserve Bank of India", "Department of Economic Affairs, Ministry of Finance", "Supreme Court of India", "Comptroller and Auditor General"],
        correctAnswer: 1,
        explanation: "Rule 27 identifies the Department of Economic Affairs, Ministry of Finance, as the final authority for interpretation."
    },
    {
        id: "weekly-03-18",
        text: "If a depositor dies and the eligible amount is below Rs. 5 lakh with no nomination, how long must the claimant wait before the authorized officer can exercise powers to pay the rightful claimant without a succession certificate?",
        options: ["One month", "Three months", "Six months", "One year"],
        correctAnswer: 2,
        explanation: "Rule 15(6) allows the authorized officer to pay a claimant for amounts up to Rs. 5 lakh if no legal documents are produced within six months from the death of the depositor."
    },
    {
        id: "weekly-03-19",
        text: "What is the fee for the issue of a duplicate passbook?",
        options: ["Rs. 20", "Rs. 50", "Rs. 100", "Free of cost"],
        correctAnswer: 1,
        explanation: "Schedule II, item (a)(i) sets the fee for the issue of a duplicate passbook at Rs. 50."
    },
    {
        id: "weekly-03-20",
        text: "Consider the following statements regarding NRI nominees:\nI. An NRI is eligible to be nominated as a nominee.\nII. Payment to an NRI nominee shall be on a non-repatriation basis.\nWhich of the above is/are correct?",
        options: ["I only", "II only", "Both I and II", "Neither I nor II"],
        correctAnswer: 2,
        explanation: "Rule 14(9) states that an NRI is eligible to be nominated, provided the payment is on a non-repatriation basis."
    },
    {
        id: "weekly-03-21",
        text: "An individual already holding a Post Office Savings Account (POSA) in their own name wishes to open another single account in the same capacity. Which of the following is correct regarding this?",
        options: ["An individual can open up to two single accounts.", "Only one account can be opened by an individual as a single account.", "A second single account can be opened provided the balance in the first is below ₹50,000.", "Any number of single accounts can be opened across different post offices."],
        correctAnswer: 1,
        explanation: "Rule 3(1) of the Post Office Savings Account Scheme, 2019, stipulates that an individual can open only one account as a single adult."
    },
    {
        id: "weekly-03-22",
        text: "What is the minimum amount required for subsequent deposits in a Post Office Savings Account?",
        options: ["₹500", "₹100", "₹10", "₹50"],
        correctAnswer: 2,
        explanation: "Per the POSA 2019 rules, the minimum deposit to open is Rs. 500, but subsequent deposits can be as low as Rs. 10."
    },
    {
        id: "weekly-03-23",
        text: "In a Post Office Savings Account, interest for a particular month is calculated based on the lowest balance held between:",
        options: ["The first day and the last day of the month.", "The fifth day and the end of the month.", "The tenth day and the end of the month.", "The tenth day and the twenty-fifth day of the month."],
        correctAnswer: 2,
        explanation: "Interest is calculated on the lowest balance between the 10th day and the last day of the month."
    },
    {
        id: "weekly-03-24",
        text: "If a Post Office Savings Account holder fails to maintain the minimum average balance, what is the amount of the account maintenance fee deducted?",
        options: ["₹100 inclusive of GST", "₹50 exclusive of GST", "₹50 inclusive of GST", "₹20 inclusive of GST"],
        correctAnswer: 2,
        explanation: "If the balance falls below Rs. 500 at the end of the financial year, a maintenance fee of Rs. 50 (inclusive of GST) is deducted."
    },
    {
        id: "weekly-03-25",
        text: "A Post Office Savings Account is classified as a 'Silent Account' if no transaction (deposit or withdrawal) occurs for:",
        options: ["One financial year", "Two completed financial years", "Three completed financial years", "Five completed financial years"],
        correctAnswer: 2,
        explanation: "An account is treated as silent/inoperative if no transaction occurs for three continuous financial years."
    },
    {
        id: "weekly-03-26",
        text: "Regarding the National Savings Recurring Deposit (RD) Scheme, 2019, which statement is correct regarding the maturity period?",
        options: ["The account matures in 3 years.", "The account matures in 5 years.", "The account matures after 60 months of deposits or 6 years, whichever is earlier.", "The account matures in 10 years."],
        correctAnswer: 1,
        explanation: "The National Savings Recurring Deposit Scheme, 2019, specifies a fixed maturity of 5 years (60 monthly deposits)."
    },
    {
        id: "weekly-03-27",
        text: "In an RD account, if the account is opened on the 20th of a calendar month, subsequent deposits must be made:",
        options: ["By the 15th of every month.", "By the 25th of every month.", "Up to the last working day of each month.", "Within 30 days of the previous deposit."],
        correctAnswer: 2,
        explanation: "For accounts opened between the 16th and the last day of a month, subsequent deposits must be made by the last working day of the month."
    },
    {
        id: "weekly-03-28",
        text: "A National Savings Recurring Deposit account is treated as 'Discontinued' if the number of defaults exceeds:",
        options: ["Two", "Three", "Four", "Six"],
        correctAnswer: 2,
        explanation: "An account is discontinued after 4 defaults. Up to 4 defaults can be regularized within the next two months."
    },
    {
        id: "weekly-03-29",
        text: "What is the rebate allowed for making 12 advance deposits in a Recurring Deposit account of ₹100 denomination?",
        options: ["Rs. 10", "Rs. 40", "Rs. 50", "Rs. 100"],
        correctAnswer: 1,
        explanation: "For a Rs. 100 denomination, a 6-month advance yields Rs. 10 rebate; a 12-month advance yields Rs. 40."
    },
    {
        id: "weekly-03-30",
        text: "Premature closure of a National Savings Recurring Deposit account is permissible only after the completion of:",
        options: ["One year from the date of opening.", "Two years from the date of opening.", "Three years from the date of opening.", "Four years from the date of opening."],
        correctAnswer: 2,
        explanation: "RD accounts can be closed prematurely only after the completion of 3 years from the date of opening."
    },
    {
        id: "weekly-03-31",
        text: "Under the National Savings Time Deposit (TD) Scheme, 2019, which of the following is NOT a valid category of account?",
        options: ["One-year account", "Two-year account", "Four-year account", "Five-year account"],
        correctAnswer: 2,
        explanation: "TD Scheme 2019 recognizes 1, 2, 3, and 5-year accounts. There is no 4-year TD category."
    },
    {
        id: "weekly-03-32",
        text: "What is the minimum deposit required to open a Time Deposit account?",
        options: ["Rs. 500", "Rs. 1,000", "Rs. 5,000", "Rs. 10,000"],
        correctAnswer: 1,
        explanation: "The minimum deposit for any TD account category is Rs. 1,000."
    },
    {
        id: "weekly-03-33",
        text: "For a Two-year Time Deposit account, the option for extension must be exercised within:",
        options: ["Six months from the date of maturity.", "Twelve months from the date of maturity.", "Eighteen months from the date of maturity.", "Twenty-four months from the date of maturity."],
        correctAnswer: 1,
        explanation: "For a 2-year TD, the extension must be applied for within 12 months from the date of maturity."
    },
    {
        id: "weekly-03-34",
        text: "In the event of a Time Deposit account maturing but the extension option not being exercised, Post Maturity Interest (PMI) is paid at what rate?",
        options: ["The rate applicable to the original TD category.", "The rate applicable to a 1-year TD.", "The rate applicable to the Post Office Savings Account.", "No interest is paid post-maturity."],
        correctAnswer: 2,
        explanation: "If an account matures and is not extended or closed, interest is paid at the Post Office Savings Account (POSA) rate for the period it remains in the office."
    },
    {
        id: "weekly-03-35",
        text: "Consider the following regarding the interest on Time Deposits:\n1. Interest is compounded on a quarterly basis.\n2. Interest is payable to the account holder at the end of each year.\n3. No additional interest is payable on due interest that is not withdrawn.\nWhich of the statements above are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 3,
        explanation: "TD interest is compounded quarterly but payable annually. If not withdrawn, the interest does not earn further interest."
    },
    {
        id: "weekly-03-36",
        text: "A 5-year Time Deposit account is opened on 01.01.2024. As per the rules, what is the earliest this account can be closed prematurely?",
        options: ["After 3 months", "After 6 months", "After 1 year", "After 2 years"],
        correctAnswer: 1,
        explanation: "No TD account can be closed before the expiry of 6 months from the date of deposit."
    },
    {
        id: "weekly-03-37",
        text: "If a 3-year Time Deposit is closed prematurely after 1 year but before 2 years, the interest rate payable for the completed year will be:",
        options: ["Post Office Savings Account rate.", "Interest rate of 1-year TD minus 1%.", "Interest rate of 1-year TD minus 2%.", "Interest rate of 2-year TD minus 1%."],
        correctAnswer: 2,
        explanation: "If closed after 1 year, interest is paid at 2% less than the rate for the completed years (e.g., 3-year TD rate - 2%)."
    },
    {
        id: "weekly-03-38",
        text: "What is the maximum deposit limit for a single account under the National Savings (Monthly Income Account) Scheme, 2019?",
        options: ["Rs. 4.5 Lakh", "Rs. 9 Lakh", "Rs. 15 Lakh", "Rs. 30 Lakh"],
        correctAnswer: 1,
        explanation: "The maximum limit for a single MIS account was increased to Rs. 9,00,000."
    },
    {
        id: "weekly-03-39",
        text: "In a Joint MIS account held by three adults, how is the share of each account holder calculated for the purpose of the maximum deposit ceiling?",
        options: ["The first holder owns 100% for ceiling purposes.", "Each holder is treated as having an equal one-third share.", "Each holder is treated as having a one-half share.", "There is no individual ceiling for joint accounts."],
        correctAnswer: 1,
        explanation: "For ceiling purposes, each joint holder in an MIS account is deemed to have an equal share."
    },
    {
        id: "weekly-03-40",
        text: "Under the Monthly Income Account (MIS) Scheme, if a deposit is made on the 31st of a month and the following month has only 30 days, when is the interest due?",
        options: ["On the 1st of the next month.", "On the last date of the following month.", "On the 31st of the next month (delayed).", "Interest for that month is forfeited."],
        correctAnswer: 1,
        explanation: "If the corresponding day does not exist in a month, interest is paid on the last day of that month."
    },
    {
        id: "weekly-03-41",
        text: "Premature closure of an MIS account is allowed only after the expiry of:",
        options: ["Six months from opening.", "One year from opening.", "Two years from opening.", "Three years from opening."],
        correctAnswer: 1,
        explanation: "MIS accounts have a lock-in period of one year. No premature closure is allowed before 1 year."
    },
    {
        id: "weekly-03-42",
        text: "If an MIS account is closed prematurely after the expiry of one year but on or before the expiry of three years, what is the deduction from the principal?",
        options: ["1% of the deposit", "2% of the deposit", "5% of the deposit", "Only interest is recovered; no principal deduction."],
        correctAnswer: 1,
        explanation: "PMC between 1 and 3 years incurs a 2% penalty on the principal."
    },
    {
        id: "weekly-03-43",
        text: "What happens to an MIS account in the event of the death of the account holder before maturity?",
        options: ["The nominee must continue the account until the 5-year term ends.", "The account may be closed and the deposit refunded with interest up to the month preceding the month of refund.", "The account is converted to a POSA account automatically.", "The principal is refunded, but all interest paid is recovered."],
        correctAnswer: 1,
        explanation: "On death, the account is closed. Interest is paid up to the preceding month of the refund."
    },
    {
        id: "weekly-03-44",
        text: "Assertion (A): An RD account holder can extend the maturity period to recover defaults.\nReason (R): A status of 'Discontinued' is applied only if defaults exceed four.",
        options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is not the correct explanation of A.", "A is true but R is false.", "A is false but R is true."],
        correctAnswer: 0,
        explanation: "If a holder has defaults (up to 4), they can extend the account tenure to complete 60 deposits. This is linked to the fact that it is not yet 'discontinued'."
    },
    {
        id: "weekly-03-45",
        text: "Which of the following is INCORRECT regarding POSA ATM facilities?",
        options: ["Joint-A Type accounts cannot avail ATM facilities.", "A minor through a guardian cannot be issued an ATM card.", "Each holder of a Joint-B account can avail an ATM card in their own name.", "A depositor must authorize a third party to receive the ATM card at the post office."],
        correctAnswer: 3,
        explanation: "The depositor must personally collect the ATM card; third-party authorization is strictly prohibited by POSB ATM rules."
    },
    {
        id: "weekly-03-46",
        text: "What is the daily ATM cash withdrawal limit for Post Office Debit cards?",
        options: ["Rs. 10,000", "Rs. 25,000", "Rs. 40,000", "Rs. 50,000"],
        correctAnswer: 1,
        explanation: "The standard daily cash withdrawal limit at ATMs for Post Office cards is Rs. 25,000."
    },
    {
        id: "weekly-03-47",
        text: "The annual maintenance charge for a Post Office ATM/Debit card is:",
        options: ["Rs. 50 + GST", "Rs. 100 + GST", "Rs. 125 + GST", "Free of cost"],
        correctAnswer: 2,
        explanation: "The annual maintenance fee for the Debit card is Rs. 125 + GST."
    },
    {
        id: "weekly-03-48",
        text: "For an RD account of Rs. 100 denomination, what is the rebate for making 6 advance deposits in a calendar month?",
        options: ["Rs. 10", "Rs. 20", "Rs. 40", "Nil"],
        correctAnswer: 0,
        explanation: "For a Rs. 100 denomination, a 6-month advance deposit gets a Rs. 10 rebate."
    },
    {
        id: "weekly-03-49",
        text: "Consider the following statements about RD Account extension after maturity:\n1. An RD account can be extended for a maximum of 5 years.\n2. The extended account can be closed at any time.\n3. Interest during the extension period is always at the original RD rate.\nWhich of the statements above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 only", "1, 2, and 3"],
        correctAnswer: 0,
        explanation: "RD can be extended for 5 years. During extension, it can be closed at any time. Interest during extension period is the rate applicable at the time of the original opening."
    },
    {
        id: "weekly-03-50",
        text: "Under the \"Protected Savings Scheme\" for RD accounts of Rs. 100 denomination, which of the following is a mandatory condition for the nominee to receive the full maturity value on the death of the holder?",
        options: ["The account must have been in operation for at least 3 years.", "The first 24 monthly deposits must have been made without default.", "The holder must have been at least 21 years old at the time of opening.", "A loan must have been taken and repaid within the first year."],
        correctAnswer: 1,
        explanation: "The 'Protected Savings Scheme' (Life cover for RD) requires that the account was active for 24 months without any defaults."
    }
];
