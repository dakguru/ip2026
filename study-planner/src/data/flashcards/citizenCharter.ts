import { RawQuestion } from '../quizzes';

// Citizens' Charter of Department of Posts
// Set 1 (ID 190): Vision, Mission, Services overview, Mail Delivery Standards
// Set 2 (ID 191): Financial Services — Money Order, POSB (Non-CBS & CBS), PLI/RPLI
// Set 3 (ID 192): Counter/Branch Office Standards, Grievance Redress, Expectations
// Answer distribution per set: ~25% each for A/B/C/D

export const citizen_charter_set1: RawQuestion[] = [
  // q0 → D
  {
    q: "What is the Vision of the Department of Posts as stated in the Citizens' Charter?",
    o: [
      "To be the most trusted postal network in India",
      "To ensure last-mile connectivity for every citizen",
      "To sustain its position as the largest postal network in the world",
      "India Post's products and services will be the customer's first choice",
    ],
    a: 3,
    e: "The Vision of the Department of Posts is: 'India Post's products and services will be the customer's first choice.'",
  },
  // q1 → A
  {
    q: "What is the Mission of the Department of Posts as stated in the Citizens' Charter?",
    o: [
      "To sustain its position as the largest postal network in the world touching the lives of every citizen in the country",
      "To maximize revenue through premium postal services",
      "To compete with private courier companies on price and speed",
      "To achieve 100% digital delivery of communications",
    ],
    a: 0,
    e: "The Mission is to sustain its position as the largest postal network in the world touching the lives of every citizen — with customer satisfaction, human touch, and social security delivery as key pillars.",
  },
  // q2 → C
  {
    q: "Which of the following is NOT mentioned as part of the Mission of the Department of Posts in the Citizens' Charter?",
    o: [
      "Ensuring customer satisfaction by providing services with speed, reliability and on value-for-money basis",
      "Ensuring that employees serve their customers with a human touch",
      "Achieving 100% computerization of all post offices by 2026",
      "Continuing to deliver social security services and to enable last mile connectivity as a Government of India platform",
    ],
    a: 2,
    e: "The three Mission points are: (1) Customer satisfaction with speed, reliability and value-for-money; (2) Employees serving with a human touch; (3) Delivering social security services and last-mile connectivity. Computerization target is not part of the Mission.",
  },
  // q3 → B
  {
    q: "Which of the following is NOT a category of Customers/Clients mentioned in the Citizens' Charter of DoP?",
    o: [
      "All individuals and corporate customers",
      "Financial institutions and banking companies",
      "Public Institutions, private businesses and media",
      "Government organizations",
    ],
    a: 1,
    e: "The Charter lists: All individuals and corporate customers; Public Institutions, private businesses and media; Government organizations; and Other postal administrations. Financial institutions/banks are not separately listed.",
  },
  // q4 → D
  {
    q: "Which of the following falls under 'Mail Services' in the Citizens' Charter of DoP?",
    o: [
      "Postal Life Insurance",
      "Issue of definitive postage stamps",
      "Indian Postal Order",
      "Value Payable Post",
    ],
    a: 3,
    e: "Mail Services include letters, postcards, inland letter cards, book packets, value payable post, parcels, Logistics Post, ePost, and premium mail services like Speed Post, Business Post, etc.",
  },
  // q5 → A
  {
    q: "Under which service category do 'Postal Life Insurance and Rural Postal Life Insurance' fall in the Citizens' Charter?",
    o: [
      "Financial Services",
      "Mail Services",
      "Counter Services",
      "Philately",
    ],
    a: 0,
    e: "Financial Services include: Money Transfer (Money Order, Indian Postal Order), Post Office Savings Bank (Small Savings Schemes & Savings Certificates), and Postal Life Insurance and Rural Postal Life Insurance.",
  },
  // q6 → C
  {
    q: "Philately services in the Citizens' Charter include which of the following?",
    o: [
      "Only promotion of philately and collection drives",
      "Only issue of definitive postage stamps",
      "Promotion of philately, definitive stamps, commemorative/special stamps, and delivery through Philatelic Bureau/counters/ePost Office",
      "Delivery of stamps through Speed Post only",
    ],
    a: 2,
    e: "Philately services include: Promotion of philately; Issue of definitive postage stamps; Issue of commemorative and special postage stamps; Delivery through Philatelic Bureau, counters and ePost Office.",
  },
  // q7 → B
  {
    q: "As per the Citizens' Charter, what is the service standard for LOCAL delivery of First Class Mail (Letters, Postcards & Letter Cards) and Registered Letters?",
    o: ["1 Day", "2 Days", "3 Days", "2–4 Days"],
    a: 1,
    e: "Local delivery standard for First Class Mail (Letters, Postcards & Letter cards) & Registered Letters is 2 Days.",
  },
  // q8 → D
  {
    q: "What is the service standard for First Class Mail delivery from Metro to Metro?",
    o: ["1–2 Days", "2–3 Days", "3–5 Days", "2–4 Days"],
    a: 3,
    e: "Metro-Metro delivery standard for First Class Mail is 2–4 Days. Metro cities: Delhi, Mumbai, Kolkata, Chennai, Hyderabad and Bengaluru.",
  },
  // q9 → A
  {
    q: "What is the delivery standard for First Class Mail from State Capital to State Capital?",
    o: ["2–6 Days", "2–4 Days", "3–5 Days", "4–6 Days"],
    a: 0,
    e: "State Capital to State Capital delivery standard for First Class Mail is 2–6 Days.",
  },
  // q10 → B
  {
    q: "What is the delivery standard for First Class Mail within the same state?",
    o: ["2–4 Days", "3–5 Days", "2–6 Days", "4–6 Days"],
    a: 1,
    e: "Same State delivery standard for First Class Mail is 3–5 Days.",
  },
  // q11 → C
  {
    q: "What is the delivery standard for First Class Mail for the Rest of the Country?",
    o: ["4–5 Days", "3–6 Days", "5–6 Days", "6–7 Days"],
    a: 2,
    e: "Rest of the Country delivery standard for First Class Mail is 5–6 Days.",
  },
  // q12 → D
  {
    q: "What is the service standard for LOCAL delivery of Speed Post articles?",
    o: ["Same Day", "2–3 Days", "1–3 Days", "1–2 Days"],
    a: 3,
    e: "Local delivery standard for Speed Post articles is 1–2 Days.",
  },
  // q13 → A
  {
    q: "What is the service standard for Speed Post delivery from Metro to Metro?",
    o: ["1–3 Days", "1–2 Days", "2–3 Days", "2–4 Days"],
    a: 0,
    e: "Metro-Metro delivery standard for Speed Post is 1–3 Days.",
  },
  // q14 → B
  {
    q: "What is the service standard for Speed Post from State Capital to State Capital and within the Same State?",
    o: ["1–3 Days", "1–4 Days", "2–4 Days", "2–5 Days"],
    a: 1,
    e: "Both State Capital to State Capital and Same State Speed Post delivery standards are 1–4 Days.",
  },
  // q15 → C
  {
    q: "What is the service standard for Speed Post articles for the Rest of the Country?",
    o: ["3–5 Days", "5–6 Days", "4–5 Days", "4–6 Days"],
    a: 2,
    e: "Rest of the Country delivery standard for Speed Post articles is 4–5 Days.",
  },
  // q16 → D
  {
    q: "What is the LOCAL delivery standard for Business Parcel & Second Class Mail (Parcel, Book Packet, Registered Newspapers, Blind Literature packets)?",
    o: ["2 Days", "4 Days", "2–4 Days", "3 Days"],
    a: 3,
    e: "Local delivery standard for Business Parcel & Second Class Mail is 3 Days.",
  },
  // q17 → A
  {
    q: "What is the delivery standard for Business Parcel & Second Class Mail from Metro to Metro?",
    o: ["4–5 Days", "2–4 Days", "3–5 Days", "5–6 Days"],
    a: 0,
    e: "Metro-Metro delivery standard for Business Parcel & Second Class Mail is 4–5 Days.",
  },
  // q18 → B
  {
    q: "What is the delivery standard for Business Parcel & Second Class Mail for the Rest of the Country?",
    o: ["5–6 Days", "6–7 Days", "4–6 Days", "5–7 Days"],
    a: 1,
    e: "Rest of the Country delivery standard for Business Parcel & Second Class Mail is 6–7 Days.",
  },
  // q19 → C
  {
    q: "As per the Citizens' Charter, how many extra days are added for articles booked or delivered in Branch Offices?",
    o: ["Same Day (no extra)", "2 Extra Days", "1 Extra Day", "3 Extra Days"],
    a: 2,
    e: "Articles/MOs booked/delivered in Branch Offices will take 1 Extra Day in addition to standard delivery timelines.",
  },
  // q20 → D
  {
    q: "The service standards for mail apply to articles conforming to which Gazette notification dated 23.09.2013?",
    o: ["No. 286", "No. 386", "No. 586", "No. 486"],
    a: 3,
    e: "Standards apply to articles conforming to Gazette notification no. 486, dated 23.09.2013 (excluding MOs), and bearing correct address & Pin code.",
  },
  // q21 → A
  {
    q: "For International EMS articles, 'End to End' delivery standards apply to outbound articles booked in cities with OEs. Which are those cities?",
    o: [
      "Delhi, Mumbai, Kolkata, Chennai and Kochi",
      "Delhi, Mumbai, Kolkata, Chennai and Hyderabad",
      "Delhi, Mumbai, Kolkata, Chennai and Bengaluru",
      "Delhi, Mumbai, Chennai, Kolkata and Pune",
    ],
    a: 0,
    e: "The End to End delivery standards for International EMS are for outbound articles booked in cities with OEs: Delhi, Mumbai, Kolkata, Chennai and Kochi.",
  },
  // q22 → B
  {
    q: "What is the International EMS service standard for the United Kingdom?",
    o: ["3–5 Days", "2–6 Days", "4–7 Days", "4–8 Days"],
    a: 1,
    e: "International EMS delivery standard for the United Kingdom (UK) is 2–6 Days.",
  },
  // q23 → C
  {
    q: "What is the International EMS service standard for the United States of America?",
    o: ["4–8 Days", "5–9 Days", "4–7 Days", "3–6 Days"],
    a: 2,
    e: "International EMS delivery standard for the USA is 4–7 Days.",
  },
  // q24 → D
  {
    q: "What is the International EMS service standard for China?",
    o: ["3–7 Days", "4–8 Days", "5–9 Days", "4–9 Days"],
    a: 3,
    e: "International EMS delivery standard for China is 4–9 Days.",
  },
];

export const citizen_charter_set2: RawQuestion[] = [
  // q0 → A
  {
    q: "As per the Citizens' Charter, what is the service standard for delivery of Money Order — Local and between Metro Cities?",
    o: ["2 Working Days", "1 Working Day", "3 Working Days", "4 Working Days"],
    a: 0,
    e: "Delivery of Money Order for Local and between Metro Cities takes 2 Working Days. Metro cities: Delhi, Mumbai, Kolkata, Chennai, Hyderabad and Bengaluru.",
  },
  // q1 → B
  {
    q: "What is the service standard for delivery of Money Order for the Rest of India?",
    o: ["2 Working Days", "4 Working Days", "3 Working Days", "5 Working Days"],
    a: 1,
    e: "Delivery of Money Order for the Rest of India takes 4 Working Days.",
  },
  // q2 → C
  {
    q: "For International Money Transfer (instant inward remittances through Western Union), the service standard for payment on production of code and required documents is:",
    o: ["Same Day / Instantaneous", "5 Minutes", "10 Minutes", "30 Minutes"],
    a: 2,
    e: "Payment on production of code and required documents for International Money Transfer Service takes 10 Minutes. Service is available at specified offices.",
  },
  // q3 → D
  {
    q: "Under POSB (Non-CBS), what is the time standard for transfer of accounts within the same Head Post Office?",
    o: ["Same Day", "3 Working Days", "7 Working Days", "1 Working Day"],
    a: 3,
    e: "Transfer of accounts within the same Head Post Office (Non-CBS) takes 1 Working Day.",
  },
  // q4 → A
  {
    q: "Under POSB (Non-CBS), what is the time standard for transfer of accounts from one Head Post Office to another?",
    o: ["7 Working Days", "3 Working Days", "5 Working Days", "15 Days"],
    a: 0,
    e: "Transfer of accounts from one Head Post Office to another Head Post Office (Non-CBS) takes 7 Working Days.",
  },
  // q5 → B
  {
    q: "Under POSB (Non-CBS), what is the time standard for transfer of accounts requested at the transferee post office?",
    o: ["7 Working Days", "15 Days", "10 Working Days", "30 Working Days"],
    a: 1,
    e: "Account transfer requested at the transferee post office (Non-CBS) takes 15 Days.",
  },
  // q6 → C
  {
    q: "Under POSB (Non-CBS), what is the service standard for settlement of deceased claims where nomination exists?",
    o: ["Same Day", "3 Working Days", "1 Working Day", "7 Working Days"],
    a: 2,
    e: "Settlement of deceased claims (Non-CBS) where nomination exists takes 1 Working Day.",
  },
  // q7 → D
  {
    q: "Under POSB (Non-CBS), what is the service standard for settlement of deceased claims where no nomination exists?",
    o: ["1 Working Day", "3 Working Days", "15 Working Days", "7 Working Days"],
    a: 3,
    e: "Settlement of deceased claims (Non-CBS) where no nomination exists takes 7 Working Days.",
  },
  // q8 → A
  {
    q: "Under POSB (Non-CBS), what is the service standard for Issue of Duplicate Passbook?",
    o: ["7 Working Days", "1 Working Day", "3 Working Days", "5 Working Days"],
    a: 0,
    e: "Issue of Duplicate Passbook under POSB (Non-CBS) takes 7 Working Days.",
  },
  // q9 → B
  {
    q: "Under POSB (Non-CBS), what is the service standard for Interest Posting?",
    o: ["Same Day", "1 Working Day", "3 Working Days", "7 Working Days"],
    a: 1,
    e: "Interest Posting under POSB (Non-CBS) takes 1 Working Day.",
  },
  // q10 → C
  {
    q: "What is the time standard for Discharge of Savings Certificates at a post office other than the office of purchase (Non-CBS)?",
    o: ["15 Working Days", "20 Working Days", "30 Working Days", "45 Working Days"],
    a: 2,
    e: "Discharge of Savings Certificates at a PO other than the office of purchase (Non-CBS) takes 30 Working Days from receipt of application.",
  },
  // q11 → D
  {
    q: "What is the time standard for Transfer of Savings Certificates (Non-CBS)?",
    o: ["15 Working Days", "20 Working Days", "45 Working Days", "30 Working Days"],
    a: 3,
    e: "Transfer of Savings Certificate (Non-CBS) takes 30 Working Days from receipt of application.",
  },
  // q12 → A
  {
    q: "For Issue of Duplicate Certificate issued BEFORE 01.07.2016 (Non-CBS), the time standard from receipt of application with required documents is:",
    o: ["15 Working Days", "7 Working Days", "10 Working Days", "30 Working Days"],
    a: 0,
    e: "Duplicate certificates issued before 01.07.2016 (Non-CBS) take 15 Working Days from receipt of application at the post office of issue.",
  },
  // q13 → B
  {
    q: "For duplicate savings certificates issued on or after 01.07.2016 (Non-CBS), the standard when presented at HO is:",
    o: ["Same Day", "1 Day", "3 Working Days", "7 Working Days"],
    a: 1,
    e: "Duplicate certificates issued on or after 01.07.2016 and presented at HO (Non-CBS) take 1 Day.",
  },
  // q14 → C
  {
    q: "Under POSB CBS (3.1.1), what is the time standard for transfer of accounts at any Head Post Office?",
    o: ["Same Day", "3 Working Days", "1 Working Day", "7 Working Days"],
    a: 2,
    e: "Under CBS (3.1.1), transfer of accounts at any Head Post Office takes 1 Working Day.",
  },
  // q15 → D
  {
    q: "Under POSB CBS (3.1.2), a deceased claim WITH nomination presented at a Sub Post Office takes:",
    o: ["1 Working Day", "5 Working Days", "7 Working Days", "3 Working Days"],
    a: 3,
    e: "Under CBS (3.1.2), deceased claim with nomination presented at any Sub Post Office takes 3 Working Days.",
  },
  // q16 → A
  {
    q: "Under POSB CBS (3.1.3), a deceased claim WITHOUT nomination — if within powers of HO or SO — takes:",
    o: ["1 Working Day", "3 Working Days", "5 Working Days", "7 Working Days"],
    a: 0,
    e: "Under CBS (3.1.3), deceased claim without nomination within powers of HO or SO takes 1 Working Day.",
  },
  // q17 → B
  {
    q: "Under POSB CBS (3.1.3), a deceased claim WITHOUT nomination — beyond powers of HO/SO but within powers of Divisional Heads — takes:",
    o: ["3 Working Days", "7 Working Days", "15 Working Days", "1 Working Day"],
    a: 1,
    e: "Under CBS (3.1.3), deceased claim without nomination, beyond powers of HO/SO but within Divisional Head's powers, takes 7 Working Days.",
  },
  // q18 → C
  {
    q: "Under POSB CBS (3.1.4), Issue of Duplicate Passbook when presented at a Sub Office (SO) takes:",
    o: ["1 Working Day", "3 Working Days", "7 Working Days", "15 Working Days"],
    a: 2,
    e: "Under CBS (3.1.4), Duplicate Passbook when presented at SO (physical movement of application from SO to HO and back) takes 7 Working Days.",
  },
  // q19 → D
  {
    q: "Under POSB CBS (3.1.7), transfer of certificates requested at Sub Office (SO) takes:",
    o: ["1 Working Day", "7 Working Days", "15 Working Days", "3 Working Days"],
    a: 3,
    e: "Under CBS (3.1.7), transfer of certificates at SO takes 3 Working Days. At HO it takes 1 Working Day.",
  },
  // q20 → A
  {
    q: "Under CBS (3.1.11), Issue of ATM Card (Insta) after receipt of complete application/documents takes:",
    o: ["1 Working Day", "Same Day", "3 Working Days", "7 Working Days"],
    a: 0,
    e: "Issue of ATM Card (Insta) under CBS takes 1 Working Day after receipt of complete application/documents.",
  },
  // q21 → B
  {
    q: "Under CBS (3.1.12), Issue of ATM Card (Personalized) takes:",
    o: ["15 Days", "30 Days", "21 Days", "7 Days"],
    a: 1,
    e: "Issue of ATM Card (Personalized) under CBS takes 30 Days.",
  },
  // q22 → C
  {
    q: "Under CBS (3.1.13), Enabling ebanking/mbanking after receipt of complete application/documents takes:",
    o: ["Same Day", "3 Working Days", "1 Working Day", "7 Working Days"],
    a: 2,
    e: "Enabling ebanking/mbanking under CBS takes 1 Working Day after receipt of complete application/documents.",
  },
  // q23 → D
  {
    q: "Under CBS (3.1.9), Opening of Account/Purchase of Savings Certificates (after clearance of cheque) takes:",
    o: ["Same Day", "3 Working Days", "7 Working Days", "1 Working Day"],
    a: 3,
    e: "Under CBS (3.1.9), Opening of Account/Purchase of saving certificates after clearance of cheque takes 1 Working Day.",
  },
  // q24 → A
  {
    q: "Under CBS (3.1.10), closure of an account at Sub Office (SO) with payment by cheque takes:",
    o: ["3 Working Days", "1 Working Day", "5 Working Days", "7 Working Days"],
    a: 0,
    e: "Under CBS (3.1.10), account closure at SO for payment by cheque takes 3 Working Days. For cash/transfer to savings account at SO or HO it takes 1 Working Day.",
  },
  // q25 → B
  {
    q: "For PLI/RPLI — Issue of Acceptance Letter / Policy Bond, the standard from receipt of completed documents is:",
    o: ["7 Days", "15 Days", "10 Days", "30 Days"],
    a: 1,
    e: "Issue of Acceptance Letter/Policy Bond for PLI/RPLI takes 15 Days from receipt of completed documents.",
  },
  // q26 → C
  {
    q: "For PLI/RPLI — Maturity claim settlement / Paid up value / Survival Benefit payment, the time standard from receipt of completed documents is:",
    o: ["7 Days", "10 Days", "15 Days", "30 Days"],
    a: 2,
    e: "Maturity claim settlement/Paid up value/Survival Benefit payment for PLI/RPLI takes 15 Days from receipt of completed documents.",
  },
  // q27 → D
  {
    q: "For PLI/RPLI — Settlement of death claims (with or without nomination, no investigation), the time standard from receipt of completed documents is:",
    o: ["15 Days", "20 Days", "60 Days", "30 Days"],
    a: 3,
    e: "Settlement of PLI/RPLI death claims (with or without nomination) takes 30 Days from receipt of completed documents.",
  },
  // q28 → A
  {
    q: "For PLI/RPLI death claims involving investigation, the time standard from receipt of completed documents is:",
    o: ["90 Days", "30 Days", "60 Days", "120 Days"],
    a: 0,
    e: "PLI/RPLI death claims involving investigation take 90 Days from receipt of completed documents.",
  },
  // q29 → B
  {
    q: "For PLI/RPLI — Revival of policy / Conversion of policy, the standard from receipt of completed documents is:",
    o: ["7 Days", "15 Days", "10 Days", "30 Days"],
    a: 1,
    e: "Revival/Conversion of policy (PLI/RPLI) takes 15 Days from receipt of completed documents.",
  },
  // q30 → C
  {
    q: "For PLI/RPLI — Loan against policies (4.5.i), the time standard on receipt of request is:",
    o: ["5 Days", "15 Days", "10 Days", "30 Days"],
    a: 2,
    e: "Loan against policies (PLI/RPLI) is settled within 10 Days of receipt of request.",
  },
  // q31 → D
  {
    q: "For PLI/RPLI — Change of address (4.5.ii), the time standard on receipt of request is:",
    o: ["2 Days", "7 Days", "10 Days", "5 Days"],
    a: 3,
    e: "Change of address for PLI/RPLI is processed within 5 Days of receipt of request.",
  },
  // q32 → A
  {
    q: "For PLI/RPLI — Change of nomination (4.5.iii) and Assignment of policy (4.5.iv), the time standard on receipt of request is:",
    o: ["10 Days", "5 Days", "7 Days", "15 Days"],
    a: 0,
    e: "Both Change of nomination and Assignment of policy (PLI/RPLI) are processed within 10 Days of receipt of request.",
  },
];

export const citizen_charter_set3: RawQuestion[] = [
  // q0 → A
  {
    q: "As per the Citizens' Charter, Counter Services at post offices (excluding waiting time in queue) should be completed within:",
    o: ["2–5 Minutes", "1–2 Minutes", "5–10 Minutes", "10 Minutes"],
    a: 0,
    e: "Counter Services (excluding waiting time in queue) should be completed within 2–5 Minutes.",
  },
  // q1 → B
  {
    q: "Under Service Standards for Branch Office (6.1), the transaction time for sale of stamps, stationery and miscellaneous services is:",
    o: ["2 Minutes", "3 Minutes", "5 Minutes", "10 Minutes"],
    a: 1,
    e: "At Branch Office, transaction time for Sale of Stamps and stationery, Miscellaneous Services is 3 Minutes.",
  },
  // q2 → C
  {
    q: "Under Service Standards for Branch Office (6.2), the transaction time for Booking of Registered Articles, Money Orders, PLI premia, POSB Deposit & Withdrawal is:",
    o: ["3 Minutes", "5 Minutes", "10 Minutes", "7 Minutes"],
    a: 2,
    e: "At Branch Office, transaction time for Booking of Registered Articles, Money Orders, PLI premia, POSB Deposit & Withdrawal is 10 Minutes.",
  },
  // q3 → D
  {
    q: "Transactions of all nine savings schemes required to be authorized/routed through the Account Office take how many additional days beyond the Branch Office standard?",
    o: ["3 Days", "5 Days", "7 Days", "6 Days"],
    a: 3,
    e: "Transactions of all nine schemes routed through the Account Office take 6 Days in addition to the relevant service standards declared for authorized Branch Offices.",
  },
  // q4 → A
  {
    q: "What is the service standard for Issue of Acknowledgement of a complaint (on the day of receipt, or instantaneous for web registration)?",
    o: [
      "On the day of receipt itself (Instantaneous for web registration)",
      "Within 3 Working Days",
      "Within 7 Working Days",
      "Within 1 Working Day for all modes",
    ],
    a: 0,
    e: "Acknowledgement of complaint: On the day of receipt itself. Instantaneous in case of web registration / 1 Day for other modes of receipt.",
  },
  // q5 → B
  {
    q: "What is the service standard for Settlement of Complaints (Public Grievance Redress) as per the Citizens' Charter?",
    o: ["30 Days", "60 Days", "45 Days", "90 Days"],
    a: 1,
    e: "Settlement of Complaints — time from lodging of complaint is 60 Days.",
  },
  // q6 → C
  {
    q: "What is the service standard for Settlement of a complaint in cases requiring investigation?",
    o: ["60 Days", "75 Days", "90 Days", "120 Days"],
    a: 2,
    e: "Settlement of complaint requiring investigation — time from lodging of complaint is 90 Days.",
  },
  // q7 → D
  {
    q: "Within how many days of a transaction or availing a service must a customer lodge a complaint?",
    o: ["30 Days", "45 Days", "90 Days", "60 Days"],
    a: 3,
    e: "Complaints are to be lodged within 60 Days of the transaction/availing of a service.",
  },
  // q8 → A
  {
    q: "If a complaint is not redressed within stipulated time or to the customer's satisfaction, it may be escalated to:",
    o: [
      "The Postmaster General of the Region or Chief Postmaster General of the Circle",
      "The Director General of Posts at Dak Bhavan",
      "The Ministry of Communications",
      "The Consumer Disputes Redressal Forum",
    ],
    a: 0,
    e: "If not redressed in time or to satisfaction, the complaint may be taken up with the Postmaster General of the Region or the Chief Postmaster General of the Circle.",
  },
  // q9 → B
  {
    q: "Who is the Nodal Officer for handling non-PLI grievances at HQ level?",
    o: [
      "Director General of Posts, Dak Bhavan, New Delhi",
      "DDG (PG), Department of Posts, Dak Bhavan, New Delhi – 110001",
      "Member (Operations), Postal Services Board",
      "General Manager (Business & Investments), PLI Directorate",
    ],
    a: 1,
    e: "DDG (PG), Department of Posts, Dak Bhavan, New Delhi – 110001 (ddgpgq@indiapost.gov.in) is the Nodal Officer for non-PLI grievances at HQ level.",
  },
  // q10 → C
  {
    q: "Who is the Nodal Officer for handling PLI/RPLI grievances at HQ level?",
    o: [
      "DDG (PLI), Dak Bhavan, New Delhi",
      "Director, Postal Life Insurance, New Delhi",
      "General Manager (Business & Investments), Directorate of PLI, Chanakyapuri PO Complex, New Delhi–110023",
      "Member (Banking), Postal Services Board",
    ],
    a: 2,
    e: "For PLI/RPLI complaints at HQ level: General Manager (Business & Investments), Directorate of PLI, Chanakyapuri PO Complex, New Delhi–110023 (gmo.pli@indiapost.gov.in).",
  },
  // q11 → D
  {
    q: "The India Post Call Centre number mentioned in the Citizens' Charter is:",
    o: ["1800 111 000", "1800 266 6666", "155255", "1800 266 6868"],
    a: 3,
    e: "The India Post Call Centre number is 1800 266 6868. Customers can also tweet @indiapostoffice.",
  },
  // q12 → A
  {
    q: "Where should complaints relating to Value Payable articles be lodged?",
    o: [
      "At the office of booking",
      "At the delivery post office",
      "At any post office",
      "At the SSPO/SPO office",
    ],
    a: 0,
    e: "For Value Payable articles, complaints are to be lodged at the office of booking.",
  },
  // q13 → B
  {
    q: "PLI/RPLI complaints can be handed or posted to whom at each Circle Office headquarters?",
    o: [
      "Chief Postmaster General",
      "Deputy Divisional Manager (PLI/RPLI) and Development Officer (PLI)",
      "Divisional Superintendent (Post Offices)",
      "Senior Postmaster at Circle Headquarters",
    ],
    a: 1,
    e: "PLI/RPLI complaints can be handed or posted to the Deputy Divisional Manager (PLI/RPLI) stationed at each Circle Office headquarters and Development Officer (PLI).",
  },
  // q14 → C
  {
    q: "According to the Citizens' Charter (Reasonable Expectations — Mails), what must customers in multi-storied buildings do?",
    o: [
      "Collect mail from the nearest post office themselves",
      "Register their building with the nearest post office",
      "Provide a Mail Box on the ground floor for each address in multi-storied buildings",
      "Pay extra charges for home delivery",
    ],
    a: 2,
    e: "Citizens are expected to provide a Mail Box on the ground floor for each address in multi-storied buildings to facilitate delivery.",
  },
  // q15 → D
  {
    q: "According to Reasonable Expectations (Mails), what should customers do to enable delivery of registered/insured/Speed Post articles in their absence?",
    o: [
      "Submit a pre-authorization form at the post office in advance",
      "Notify the postman 3 days in advance",
      "Arrange for a mailbox at the post office",
      "Give proper authorization to a representative for receiving delivery",
    ],
    a: 3,
    e: "Citizens should give proper authorization to a representative for receiving delivery of registered, insured, money orders and Speed Post etc. in their absence.",
  },
  // q16 → A
  {
    q: "According to the Charter, customers should insist on obtaining what when booking articles and money orders?",
    o: ["Receipts", "Tracking number sticker", "SMS confirmation", "Priority seal"],
    a: 0,
    e: "Customers are expected to insist on obtaining receipts for articles and money orders booked.",
  },
  // q17 → B
  {
    q: "Under Reasonable Expectations — Financial Services (4.1), customers must NOT disclose to any person other than the recipient:",
    o: [
      "The passbook balance",
      "The code number/Secret code of instant money order communicated by the Post Office",
      "The policy surrender value",
      "The account transfer reference number",
    ],
    a: 1,
    e: "Customers must not disclose the code number/Secret code of instant money order communicated by the Post Office to any person other than the recipient/s.",
  },
  // q18 → C
  {
    q: "Before carrying out any transactions with Savings/PLI/RPLI Agents, citizens should check:",
    o: [
      "The Agent's photograph and Aadhaar",
      "The Agent's mobile number and address",
      "The Agency Number, Authorization and validity of the Agent",
      "The Agent's commission certificate",
    ],
    a: 2,
    e: "Citizens should check the Agency Number, Authorization and validity of the Small Savings and PLI/RPLI Agents before carrying out any transactions with them.",
  },
  // q19 → D
  {
    q: "The Complaints and Suggestion Book is available in all post offices and:",
    o: [
      "Is available only at Head Post Offices",
      "Is given only when the customer files a written request",
      "Is available online only",
      "Required to be given to customer when demanded",
    ],
    a: 3,
    e: "The Complaints and Suggestion Book is available in all post offices and is required to be given to customers when demanded.",
  },
  // q20 → A
  {
    q: "Online complaints relating to deficiency in service can be lodged at which portals mentioned in the Citizens' Charter?",
    o: [
      "www.indiapost.gov.in or pgportal.gov.in",
      "Only www.indiapost.gov.in",
      "Only pgportal.gov.in",
      "www.dop.gov.in or grievance.gov.in",
    ],
    a: 0,
    e: "Complaints can be lodged online at www.indiapost.gov.in or pgportal.gov.in, or by calling 1800 266 6868, tweeting @indiapostoffice, or by hand/post.",
  },
  // q21 → B
  {
    q: "Under the GRM (Section 5 — Time for Redress), if a delay is expected in redressal, what should be done within 60 days?",
    o: [
      "The complaint must be closed mandatorily",
      "An interim reply indicating the reason for delay and additional time required must be sent",
      "The complaint must be escalated to CPMG",
      "The complaint should be transferred to the Consumer Forum",
    ],
    a: 1,
    e: "If delay is expected, an interim reply within 60 Days indicating the reason for delay and additional time required for redress must be provided.",
  },
  // q22 → C
  {
    q: "Under CBS (3.1.6), for Discharge of Savings Certificates at a PO other than the office of purchase (after transfer), payment by cheque at SO takes:",
    o: ["1 Working Day", "2 Working Days", "3 Working Days", "7 Working Days"],
    a: 2,
    e: "Under CBS (3.1.6), discharge of Savings Certificates after transfer — payment by cheque at SO takes 3 Working Days. Payment at HO or by cash/transfer to savings account at SO takes 1 Working Day.",
  },
  // q23 → D
  {
    q: "Which of the following correctly lists the service standards for all three mail categories for LOCAL delivery?",
    o: [
      "First Class Mail: 1 Day, Speed Post: 1–2 Days, Business Parcel: 2 Days",
      "First Class Mail: 2 Days, Speed Post: 2–3 Days, Business Parcel: 3 Days",
      "First Class Mail: 3 Days, Speed Post: 1–2 Days, Business Parcel: 4 Days",
      "First Class Mail: 2 Days, Speed Post: 1–2 Days, Business Parcel: 3 Days",
    ],
    a: 3,
    e: "Local delivery standards: First Class Mail = 2 Days; Speed Post = 1–2 Days; Business Parcel & Second Class Mail = 3 Days.",
  },
  // q24 → A
  {
    q: "Under CBS (3.1.5), what is the standard for Interest Posting?",
    o: ["1 Working Day (Same Day)", "3 Working Days", "7 Working Days", "1 Month"],
    a: 0,
    e: "Under CBS (3.1.5), Interest Posting takes 1 Working Day (Same Day).",
  },
];
