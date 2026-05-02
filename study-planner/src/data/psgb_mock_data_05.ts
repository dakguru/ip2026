import { Question } from "./live_mock_data";

export const PSGB_MOCK_05_QUESTIONS: Question[] = [
    {
        id: "psgb-05-q1",
        text: "Under the Post Office Savings Bank (CBS) service standards, what is the timeline for the opening of an account or purchase of saving certificates after the clearance of a cheque?",
        options: ["1 Working Day", "3 Working Days", "7 Working Days", "Same Day"],
        correctAnswer: 0,
        explanation: "As per the Citizen Charter, the opening of an account or purchase of saving certificates after the clearance of a cheque in a CBS Post Office takes 1 Working Day."
    },
    {
        id: "psgb-05-q2",
        text: "According to the Mails/Money Order service standards, what is the maximum delivery time for a First Class Mail (Letter) within the same state?",
        options: ["1-2 Days", "2-4 Days", "3-5 Days", "5-6 Days"],
        correctAnswer: 2,
        explanation: "The delivery of First Class Mail (Letters, Postcards & Letter cards) within the same state takes 3-5 Days, excluding the day of posting, holidays, and Sundays."
    },
    {
        id: "psgb-05-q3",
        text: "What is the prescribed service standard for the settlement of Postal Life Insurance (PLI) death claims involving investigation?",
        options: ["15 Days", "30 Days", "60 Days", "90 Days"],
        correctAnswer: 3,
        explanation: "The Citizen Charter stipulates that the settlement of PLI/RPLI death claims involving investigation takes 90 Days from the receipt of completed documents."
    },
    {
        id: "psgb-05-q4",
        text: "Under the Public Grievance Redress service standards, within how many days should a standard public grievance be settled, barring cases requiring detailed investigation?",
        options: ["15 Days", "30 Days", "45 Days", "60 Days"],
        correctAnswer: 3,
        explanation: "The service standard for the settlement of standard complaints from the time of lodging is 60 Days, whereas cases requiring investigation may take up to 90 days."
    },
    {
        id: "psgb-05-q5",
        text: "Which of the following timelines for International EMS articles is INCORRECT based on the \"End to End\" delivery standards for outbound articles?",
        options: ["Japan: 3-6 Days", "United Kingdom: 2-6 Days", "Australia: 3-7 Days", "Singapore: 3-6 Days"],
        correctAnswer: 2,
        explanation: "The timeline for Australia is 4-8 Days, NOT 3-7 Days. Japan (3-6 Days), United Kingdom (2-6 Days), and Singapore (3-6 Days) are correct as per the service standards."
    },
    {
        id: "psgb-05-q6",
        text: "Evaluate the following statements regarding the Post Office Savings Bank (CBS) service standards: 1. Transfer of a Savings Certificate requested at a Sub Post Office (SO) takes 3 Working Days. 2. The issue of a personalized ATM Card takes 30 Days. 3. Enabling ebanking/mbanking takes 3 Working Days after receipt of complete documents. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 0,
        explanation: "Enabling ebanking/mbanking takes 1 Working Day after receipt of complete application/documents, not 3 Working Days. Statements 1 and 2 are factually correct."
    },
    {
        id: "psgb-05-q7",
        text: "Assertion (A): Customers should lodge complaints relating to any deficiency in service within 60 days of the transaction. Reason (R): If a complaint is not redressed within the stipulated time, the customer must first escalate the issue to the Directorate of Public Grievances (DPG) before approaching the Postmaster General.",
        options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"],
        correctAnswer: 2,
        explanation: "Complaints must be lodged within 60 days. However, the escalation matrix states that unredressed complaints should be taken up with the Postmaster General or Chief Postmaster General, not directly to the DPG."
    },
    {
        id: "psgb-05-q8",
        text: "Match the following services with their corresponding transaction times at a Branch Office (BO): Service: P. Counter Services (excluding waiting time in queue) Q. Sale of Stamps and stationery (BO authorized) R. Post Office Savings Bank Deposit & withdrawal (BO authorized) Time: 1. 2-5 Minutes 2. 3 Minutes 3. 10 Minutes",
        options: ["P-1, Q-2, R-3", "P-2, Q-3, R-1", "P-1, Q-3, R-2", "P-3, Q-1, R-2"],
        correctAnswer: 0,
        explanation: "Standard Counter Services take 2-5 Minutes. At a BO, the transaction time for the sale of stamps is 3 Minutes. POSB deposits and withdrawals at an authorized BO take 10 Minutes."
    },
    {
        id: "psgb-05-q9",
        text: "Which of the following is NOT listed as a reasonable expectation from a service recipient regarding Money Order/Mails Services?",
        options: ["To notify the delivery post office of the change of address and provide the forwarding address.", "To cooperate by producing ID on demand by Postmen or at the counter.", "To provide a Mail Box on the ground floor for each address in a multi-storied building.", "To independently verify the background of the delivery staff before accepting insured articles."],
        correctAnswer: 3,
        explanation: "Verifying the background of delivery staff is NOT a stated expectation. Providing a Mail Box, producing ID, and notifying change of address are explicitly mandated under reasonable expectations."
    },
    {
        id: "psgb-05-q10",
        text: "Consider the following statements regarding the discharge of Savings Certificates at a post office other than the office of purchase: 1. For non-CBS Post Offices, the time taken from the receipt of the application is 30 Working Days. 2. For CBS Post Offices, if the payment request is made at an SO by cheque after the transfer of the certificate, it takes 1 Working Day. Which of the statements given above is/are correct?",
        options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
        correctAnswer: 0,
        explanation: "For non-CBS POs, the process takes 30 Working Days. For CBS POs, a payment request at an SO via cheque takes 3 Working Days, whereas cash/transfer takes 1 Working Day. Thus, statement 2 is incorrect."
    },
    {
        id: "psgb-05-q11",
        text: "What is the strict procedural action mandated for anonymous complaints received by the Department of Posts?",
        options: ["They must be investigated within 30 days.", "They must be forwarded to the Central Vigilance Commission.", "They must be filed and kept on record without initiating any preliminary enquiry.", "They must be returned to the sender."],
        correctAnswer: 2,
        explanation: "As per CVC Guidelines (OM 39-1/2010-Vig), no action is to be taken on anonymous complaints. They must be filed and kept on record without initiating any preliminary enquiry."
    },
    {
        id: "psgb-05-q12",
        text: "What does the acronym PIDPI stand for in the context of whistleblower protection in grievance handling?",
        options: ["Postal Investigation and Disciplinary Protection Initiative", "Public Interest Disclosure and Protection of Informers", "Preventive Integrity Directorate and Public Information", "Public Inquiry Disclosure and Protection of Individuals"],
        correctAnswer: 1,
        explanation: "PIDPI stands for \"Public Interest Disclosure and Protection of Informers,\" a resolution used for genuine informers who wish to hide their identity."
    },
    {
        id: "psgb-05-q13",
        text: "According to DoPT OM No. 11013/2/2014-Estt.A-III, what is the mandatory requirement for the Chairperson of the Internal Complaints Committee (ICC)?",
        options: ["Must be a Group 'A' officer from the Vigilance Department.", "Must be an officer nominated directly by the CVC.", "Must be a senior female employee to ensure fair and uninfluenced proceedings.", "Must be an independent NGO representative."],
        correctAnswer: 2,
        explanation: "The Chairperson of the Complaint Committee (ICC) must be a senior female employee. If unavailable in the same office, she can be nominated from another office."
    },
    {
        id: "psgb-05-q14",
        text: "Under the revised guidelines for the Customer Relationship Management (CRM) Platform (OM PG-01/3/2021-PG-DoP), what is the targeted timeline for the disposal of grievances?",
        options: ["Strictly 60 days", "Progressively reduced to 7 to 15 days depending on the nature of the complaint", "Uniformly 45 days for all types of complaints", "Maximum 30 days, extended to 90 days for rural areas"],
        correctAnswer: 1,
        explanation: "To enhance citizen satisfaction, the timeline for the disposal of grievances on the CRM Platform has been progressively reduced from 30 days to targets of 7 to 15 days, depending on the complaint's nature."
    },
    {
        id: "psgb-05-q15",
        text: "Which of the following is NOT an acceptable ground for marking a grievance as 'Closed' in the CRM/CPGRAMS system?",
        options: ["An interim reply stating \"The matter is under investigation\" has been provided to the complainant.", "Corrective action has been executed, such as the delivery of the delayed article.", "Compensation has been sanctioned and paid for a lost article.", "The pending COD amount has been physically credited to the sender's account."],
        correctAnswer: 0,
        explanation: "Interim replies do not constitute grounds for closing a ticket in CRM or CPGRAMS. A complaint can only be closed when a final, substantive resolution has been provided."
    },
    {
        id: "psgb-05-q16",
        text: "Consider the following statements regarding the handling of vigilance complaints: 1. If a delay in mail delivery is proven to be intentional to extract a bribe, it converts from a service grievance into a vigilance complaint. 2. First Stage Advice from the CVC is sought after the formal inquiry is completed but before the final penalty is imposed. 3. Complaints against Secretaries to the Government of India are scrutinized by a specialized Group of Ministers or a high-level apex committee. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2, and 3"],
        correctAnswer: 1,
        explanation: "Statement 2 is incorrect because First Stage Advice is sought after a preliminary enquiry report is ready. Second Stage Advice is sought after the formal inquiry is completed. Statements 1 and 3 are correct."
    },
    {
        id: "psgb-05-q17",
        text: "Assertion (A): Departments must provide an Action Taken Report (ATR) to the Commissioner for SC/ST detailing remedial measures implemented for genuine grievances of SC/ST employees. Reason (R): The Commissioner for SC/ST is strictly prohibited from calling for original files and records, and must rely entirely on the ATR provided by the Department.",
        options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"],
        correctAnswer: 2,
        explanation: "Assertion (A) is correct as Departments must provide an ATR detailing remedial measures. Reason (R) is false because the Commissioner has the statutory power to call for original files and records."
    },
    {
        id: "psgb-05-q18",
        text: "Which of the following statements regarding the service standards for Post Office Savings Bank (CBS) is INCORRECT?",
        options: [
            "Interest posting is mandated to be completed within 1 Working Day.",
            "Deceased claims without a nomination, if beyond the powers of the HO/SO and within the powers of Divisional Heads, take 7 Working Days.",
            "The issue of a duplicate passbook when presented at any Sub Post Office (SO) takes 3 Working Days.",
            "Transfer of a Savings Certificate requested at a Sub Post Office takes 3 Working Days."
        ],
        correctAnswer: 2,
        explanation: "According to the Citizen Charter, the issue of a duplicate passbook when presented at any Sub Post Office takes 7 Working Days due to the required physical movement of the application from the SO to its HO and vice versa."
    },
    {
        id: "psgb-05-q19",
        text: "Which of the following statements regarding the verification of complaint identity is INCORRECT?",
        options: ["If a complaint contains a specific name and address, a registered acknowledgment must be sent to verify identity.", "If an acknowledgment letter returns undelivered, the complaint is treated as pseudonymous and filed.", "Under the PIDPI resolution, the envelope is opened by any postal counter clerk to expedite the investigation.", "The identity of a whistleblower under PIDPI is concealed to protect them from retaliation."],
        correctAnswer: 2,
        explanation: "Under PIDPI, the envelope is opened only by a designated nodal officer, not by any postal counter clerk, to ensure absolute confidentiality. The other statements are correct procedural guidelines."
    },
    {
        id: "psgb-05-q20",
        text: "Evaluate the following statements regarding the Standard Operating Procedure (SOP) for complaint handling on CRM (OM 009/5/2023-PG): 1. The SOP dictates an exact workflow: Acknowledgment → Root Cause Analysis → Rectification → Polite Drafting of Final Reply → Closure. 2. \"One-line replies\" such as \"Matter resolved\" or \"Closed\" are explicitly banned. 3. The SOP mandates an auto-escalation matrix if the first-level resolution breaches the new shortened timelines. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 3,
        explanation: "All three statements are correct. The SOP mandates a detailed workflow, bans one-line replies, and implements an auto-escalation matrix if timelines are breached."
    },
    {
        id: "psgb-05-q21",
        text: "According to Rule 616 of Postal Manual Vol II, what color of ink is exclusively prescribed for official correspondence or records unless otherwise specified?",
        options: ["Black", "Blue", "Green", "Red"],
        correctAnswer: 1,
        explanation: "Except where specifically prescribed, ink other than blue should not be used on official correspondence or records as per Rule 616."
    },
    {
        id: "psgb-05-q22",
        text: "What is the normal life of a Departmental Identity Card (Form Ms-95) as per Rule 721?",
        options: ["2 years", "3 years", "4 years", "5 years"],
        correctAnswer: 2,
        explanation: "According to Rule 721 of the Postal Manual Volume II, the normal life of the Departmental Identity Card (Form Ms-95) is 4 years."
    },
    {
        id: "psgb-05-q23",
        text: "In the filing system for the Office of a Superintendent of Post Offices, under which standard File Head are correspondence regarding Robberies, Losses, and Frauds classified?",
        options: ["File Head B", "File Head E", "File Head F", "File Head K"],
        correctAnswer: 2,
        explanation: "According to Rule 637, correspondence files in the Divisional Office are classified under File Head F for Robberies, Losses, and Frauds."
    },
    {
        id: "psgb-05-q24",
        text: "By what date must the Annual Reports be submitted to the Director General?",
        options: ["1st April", "1st May", "16th June", "30th September"],
        correctAnswer: 2,
        explanation: "As per Rule 696, Annual Reports must be submitted to the Head of Circle by 1st May and to the Director General before 16th June."
    },
    {
        id: "psgb-05-q25",
        text: "What is the penalty for sending a personal communication from a departmental official free \"On Service\"?",
        options: ["Withholding of one increment", "A warning placed in the character sheet", "Double the charges that should have been paid", "Dismissal from service"],
        correctAnswer: 2,
        explanation: "Under Rule 666, breach of this rule attracts a penalty of double the charges that should have been paid, recovered via postage stamps."
    },
    {
        id: "psgb-05-q26",
        text: "Consider the following statements regarding National Observances & Protocol: 1. The National Week is celebrated from 6th to 13th April. 2. When displayed in a straight line with flags of other countries, the National Flag must be on the extreme right (observer's left) and it is hoisted first and lowered last. 3. At official functions, \"Vande Mataram\" is played at the beginning, and \"Jana Gana Mana\" is played at the end. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2, and 3"],
        correctAnswer: 3,
        explanation: "All the three Statements are correct."
    },
    {
        id: "psgb-05-q27",
        text: "Match the following File Heads for the Superintendent of Railway Mail Service (RMS) with their respective classes of correspondence: File Head: P. Head A Q. Head D R. Head G Correspondence: 1. Sorting lists, due bag statements, and town delivery bags 2. General orders, rules regarding mails, and station bundles 3. Opening of new lines, time-tables, and train detentions",
        options: ["P-2, Q-1, R-3", "P-1, Q-2, R-3", "P-3, Q-1, R-2", "P-2, Q-3, R-1"],
        correctAnswer: 0,
        explanation: "Under Rule 637 for RMS, Head A deals with Procedure (General orders, station bundles). Head D covers Sorting (Sorting lists, due bag statements). Head G covers Conveyance of Mails (new lines, time-tables)."
    },
    {
        id: "psgb-05-q28",
        text: "Which of the following statements concerning the handling of Personal Files and Leave Papers is INCORRECT?",
        options: ["When an official is transferred to another Circle for 2 months, their personal file must immediately be forwarded in a Service Registered Cover.", "Papers relating to casual leave should not be made part of the permanent personal file.", "At the end of each year, all casual leave papers should be destroyed and a fresh series started.", "The personal bundle is transferred only when deputed for a period exceeding 3 months to another Circle or Division."],
        correctAnswer: 0,
        explanation: "Rule 666 dictates that the personal file/bundle must be forwarded only when an official is transferred or deputed for a period exceeding 3 months. Therefore, a 2-month transfer does NOT mandate immediate forwarding."
    },
    {
        id: "psgb-05-q29",
        text: "Assertion (A): The Skeleton Postal Map of the Circle must be submitted to the Director General in the month of June each year. Reason (R): The map requires annual adjustments to incorporate all corrections necessitated by infrastructural changes during the past year, keeping the records up to date.",
        options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"],
        correctAnswer: 0,
        explanation: "Rule 694-C mandates the submission of the Skeleton Postal Map in June every year precisely to incorporate all corrections necessitated by changes during the past year, ensuring updated records."
    },
    {
        id: "psgb-05-q30",
        text: "Evaluate the following statements regarding the Budget Estimate and Control structure in the Department of Posts: 1. The Budget Cell in each Circle comprises a Budget Control Unit (BCU) located at the Circle Office and a Budget Operation Unit (BOU) located at the Postal Accounts Office. 2. Revenue Expenditure (formerly \"Non-Plan\") covers non-productive areas like salaries and subsidies. 3. The Secretary (Department of Posts) acts as the Chief Accounts Authority. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 1,
        explanation: "Statement 1 is incorrect because the BCU is located at the Postal Accounts Office (PAO) and the BOU is located at the Circle Office (CO). Statements 2 and 3 accurately reflect the expenditure classification and administrative roles."
    },
    {
        id: "psgb-05-q31",
        text: "According to the Manual of Office Procedure, what is the maximum number of levels through which a file should pass for a decision?",
        options: ["Two", "Three", "Four", "Five"],
        correctAnswer: 2,
        explanation: "CSMOP guidelines dictate that the number of levels through which a file passes for a decision shall not exceed four."
    },
    {
        id: "psgb-05-q32",
        text: "What color file cover is prescribed to facilitate the identification of Rajya Sabha Questions, Motions, etc., for urgent dealing?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctAnswer: 1,
        explanation: "The file covers of the Lok Sabha and Rajya Sabha Questions, Motions etc. are to be in red colour and green colour respectively. Thus, Rajya Sabha files use green."
    },
    {
        id: "psgb-05-q33",
        text: "Which form of communication is normally used for issuing instructions meant for internal administration, such as the grant of regular leave or distribution of work among sections?",
        options: ["Notification", "Order", "Office Order", "Demi-official letter"],
        correctAnswer: 2,
        explanation: "An 'Office Order' is normally used for issuing instructions meant for internal administration, e.g., grant of regular leave, distribution of work, appointments, and transfers."
    },
    {
        id: "psgb-05-q34",
        text: "In the Single File System (SFS), which of the following practices is mandated for the movement and processing of files between a Non-Secretariat Office (NSO) and the Department?",
        options: ["The SFS file must bear a formal I.D. No. for identification and tracking.", "Noting by the Secretariat must be recorded continuously on the same page as the NSO noting.", "SFS files are exempt from being recorded in the section diary.", "The NSO is prohibited from using its own file cover for SFS cases."],
        correctAnswer: 0,
        explanation: "Under the Single File System (SFS) as outlined in the CSMOP:\n\nI.D. Number: Every SFS file must bear a formal I.D. Number (Identification Number) to ensure it can be tracked as it moves between the NSO and the Secretariat.\n\nNoting: To maintain clarity between the NSO’s proposal and the Department’s decision-making, the Secretariat noting must always start on a new blank note sheet.\n\nEfficiency: The primary goal of SFS is to eliminate the need for the Department to open a separate \"shadow\" file, thus reducing redundant work and speeding up the decision-making process."
    },
    {
        id: "psgb-05-q35",
        text: "What is the specified timeline for handling a communication received from a Member of Parliament (MP) or VIP?",
        options: ["Reply directly within 7 days.", "Acknowledge within 15 days, followed by a reply within the next 15 days.", "Acknowledge within 7 days, followed by a reply within the next 30 days.", "Acknowledge within 3 days, followed by a reply within the next 7 days."],
        correctAnswer: 1,
        explanation: "Each communication received from an MP/VIP shall be acknowledged within 15 days, followed by a reply within the next 15 days of the acknowledgment sent."
    },
    {
        id: "psgb-05-q36",
        text: "Consider the following statements regarding the modification of notes or orders: 1. Senior officers must require their juniors to modify or replace incorrect notes recorded by them. 2. Pasting over a note or a portion of it to conceal facts is strictly prohibited. 3. The withdrawal of a final decision communicated to a party requires the approval of an officer higher than the one who took the original decision. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 1,
        explanation: "Statement 1 is incorrect because senior officers should not require modification or replacement of notes by juniors; instead, they should record their own notes. Statements 2 and 3 are correct."
    },
    {
        id: "psgb-05-q37",
        text: "Assertion (A): When an officer gives an oral instruction, they should follow it up by a written confirmation at the earliest if there is no time to give the instructions in writing initially. Reason (R): Oral orders on behalf of a Minister communicated by their personal staff do not require written confirmation as they carry the delegated authority of the Minister.",
        options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"],
        correctAnswer: 2,
        explanation: "Assertion (A) is correct. Reason (R) is false because whenever a member of the personal staff of a Minister communicates an oral order, it must be confirmed by them in writing immediately thereafter."
    },
    {
        id: "psgb-05-q38",
        text: "Match the Form of Communication with its appropriate context: Form: P. Resolution Q. Demi-official letter R. Notification Context: 1. Written in first person, personal tone, addressed to an officer one or two levels below. 2. Promulgation of statutory rules and appointments published in the Gazette of India. 3. Public announcement of policy decisions or appointment of committees of enquiry.",
        options: ["P-3, Q-1, R-2", "P-2, Q-1, R-3", "P-3, Q-2, R-1", "P-1, Q-3, R-2"],
        correctAnswer: 0,
        explanation: "A Resolution is used for public announcements of policy. A Demi-official letter is personal and friendly, written in the first person. A Notification is used for statutory rules in the Gazette."
    },
    {
        id: "psgb-05-q39",
        text: "Which of the following procedures concerning the handling of classified documents is NOT correct?",
        options: ["A separate set of registers, such as section diary and file register, must be maintained by the Section Officer personally in non-designated sections.", "Every classified file shall be reviewed once in five years for declassification.", "For discussions outside the office, any official, including an MTS, may carry Secret papers if authorized verbally by a Joint Secretary.", "The classification 'For official use only' requires the prior approval of the branch officer."],
        correctAnswer: 2,
        explanation: "For Secret papers, only an officer not below the level of Under Secretary may carry them outside, and it requires the written authorization of a Joint Secretary level officer. Verbal authorization or carriage by MTS is NOT permitted."
    },
    {
        id: "psgb-05-q40",
        text: "Evaluate the following statements regarding the Subject classification based file numbering system:  1. The standard heads will bear consecutive serial numbers, whereas standard sub-heads will not be allocated such numbers.  2. When the notes and correspondence portion of a file becomes bulky (exceeds 150 pages), it will be stitched and marked 'Volume I'.  3. The first three elements in the file number are separated by a dash, and the last two by a slant stroke.  Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 0,
        explanation: "Statement 1 is Correct: Under the subject classification system, standard heads bear consecutive serial numbers, but standard sub-heads do not receive such numbers.  \n\nStatement 2 is Correct: According to the CSMOP, when the 'notes' plus the 'correspondence' portion of a file becomes bulky (specifically exceeding 150 pages), it must be stitched and marked as 'Volume I'. Subsequent papers are added to a new volume marked 'Volume II', and so on.\n\nStatement 3 is Incorrect: The CSMOP prescribes that the first three elements of the file number are separated by a slant stroke (/) and the last two by a dash (-). An example format would be: 3/17/2023-Estt."
    },
    {
        id: "psgb-05-q41",
        text: "According to the Annual Report, what is the average area served by a Post Office in India?",
        options: ["10.50 sq.km.", "15.25 sq.km.", "19.92 sq.km.", "25.00 sq.km."],
        correctAnswer: 2,
        explanation: "The average area served by a Post Office is 19.92 sq.km, with one Post Office serving 8,566 people on average as of 2025."
    },
    {
        id: "psgb-05-q42",
        text: "In which year did the new postal legislation \"The Post Office Act\" receive the assent of the President of India?",
        options: ["2022", "2023", "2024", "2025"],
        correctAnswer: 1,
        explanation: "The Post Office Act, 2023 (43 of 2023) received the assent of the President of India on 24th December 2023 and came into force on 18th June 2024."
    },
    {
        id: "psgb-05-q43",
        text: "What proportion of India Post Payments Bank (IPPB) customers comprise female customers?",
        options: ["25%", "33%", "48%", "60%"],
        correctAnswer: 2,
        explanation: "According to the IPPB milestones in the Annual Report, 48% of IPPB customers comprise female customers."
    },
    {
        id: "psgb-05-q44",
        text: "Under the Logistics and Supply Chain initiatives, how many Dak Ghar Niryat Kendras (DNKs) have been authorized up to the district level across the nation by 31st Dec 2025?",
        options: ["500", "823", "1013", "1408"],
        correctAnswer: 2,
        explanation: "The Department of Posts has authorized 1013 DNKs up to the district level across the nation."
    },
    {
        id: "psgb-05-q45",
        text: "Which of the following Memorandums of Understanding (MoUs) executed by the Department of Posts is INCORRECTLY matched with its purpose?",
        options: ["MoU with KVIC: Physical verification of PMEGP units", "MoU with AMFI: Distribution of mutual fund products", "MoU with SIDBI: Contact Point Verification for Informal Micro Enterprises", "MoU with UIDAI: Disbursement of Direct Benefit Transfers to rural banks"],
        correctAnswer: 3,
        explanation: "The MoU with UIDAI relates to Post Office Aadhaar Updation and Enrollment Centers, NOT DBT disbursements to rural banks. The other MoUs with KVIC, AMFI, and SIDBI are correctly matched."
    },
    {
        id: "psgb-05-q46",
        text: "Consider the following statements regarding the new \"The Post Office Act, 2023\": 1. It repealed the colonial-era Indian Post Office Act, 1898. 2. It came into force with effect from 18th June, 2024. 3. It delegates exclusive power to make laws on postal matters to State Governments under the concurrent list. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 0,
        explanation: "Statement 3 is incorrect as the Constitution enumerates Posts and Telegraphs in List I (Union List), meaning Parliament has exclusive power. Statements 1 and 2 are accurate."
    },
    {
        id: "psgb-05-q47",
        text: "Assertion (A): The Mail Motor Service (MMS) fleet predominantly comprises electric vehicles (EVs) to align with green initiatives. Reason (R): Out of a fleet of nearly 2100 vehicles, 250 are CNG propelled and only 02 are Electric Vehicles as of the latest report.",
        options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"],
        correctAnswer: 3,
        explanation: "Assertion (A) is false because the fleet is not predominantly EVs; out of 2100 vehicles, there are only 2 EVs and 250 CNG vehicles. Reason (R) states the accurate factual figures."
    },
    {
        id: "psgb-05-q48",
        text: "Match the following Training Initiatives/Institutions with their respective details: Initiative: P. RAKNPA Q. Dak Karmayogi Portal R. Seva Bhav Training Detail: 1. E-Learning Portal where mandatory passing mark in test is 60%. 2. First Central Training Institute to receive a Five-Star \"Outstanding\" Accreditation. 3. Training program launched by the Capacity Building Commission covering 1,18,577 employees.",
        options: ["P-2, Q-1, R-3", "P-3, Q-1, R-2", "P-2, Q-3, R-1", "P-1, Q-2, R-3"],
        correctAnswer: 0,
        explanation: "RAKNPA received the Five-Star \"Outstanding\" Accreditation. Dak Karmayogi is the e-learning portal with a 60% passing mark. Seva Bhav Training was launched by CBC and trained 1,18,577 employees."
    },
    {
        id: "psgb-05-q49",
        text: "Which of the following figures regarding the Financial Management of the Department for FY 2024-25 is NOT correct?",
        options: ["Total revenue earned was ₹11,425.24 crore.", "Revenue earned from Commercial Activities was ₹4,545.61 crore.", "Gross working expenditure was ₹24,915.20 crore.", "The Revenue Deficit stood at ₹24,915.20 crore."],
        correctAnswer: 2,
        explanation: "The gross working expenditure during FY 2024-25 was ₹37,528.49 crore, not ₹24,915.20 crore. The figure of ₹24,915.20 crore represents the Revenue Deficit. Thus, option C contains the incorrect figure."
    },
    {
        id: "psgb-05-q50",
        text: "Evaluate the following statements regarding the development of the North Eastern Region: 1. The Department earmarks 10% of allocations for Central Sector Schemes for exclusive development of the North East Region. 2. The number of post offices in the North East Region decreased between 2018 and 2025 due to operational consolidation. 3. 122 Dak Ghar Niryat Kendras (DNK) have been notified in the North Eastern Region to boost exports. Which of the statements given above is/are correct?",
        options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2, and 3"],
        correctAnswer: 2,
        explanation: "Statement 2 is incorrect because the number of post offices actually increased from 7,140 in 2018 to 8,758 in 2025. Statements 1 and 3 accurately reflect the policy guidelines and operational achievements."
    },
];
