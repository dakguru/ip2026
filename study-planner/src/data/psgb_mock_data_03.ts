import { Question } from "./live_mock_data";

export const PSGB_MOCK_03_QUESTIONS: Question[] = [
    {
        "id": "psgb-03-1",
        "text": "What does the expression \"Transit Mail Office\" (TMO) signify under the Railway Mail Service (RMS)?",
        "options": [
            "A branch of RMS where sorting of letters is done and closed bags are dispatched",
            "A branch of RMS where closed bags are received and dispatched, but sorting of letters is not done",
            "An office established at the Headquarters of a Postal Circle for unclaimed articles",
            "A post office authorised to receive letters from neighbouring Post Offices"
        ],
        "correctAnswer": 1,
        "explanation": "A Transit Mail Office is a branch of RMS where closed bags are received and dispatched, but the sorting of letters is not done in this unit. A Mail Agent or Mail Guard serves as the in-charge.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 1 – Rule 9-B",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-2",
        "text": "Consider the following statements regarding the Zonal Returned Letter Office (RLO):\n1. The concept of an RLO at the Circle Headquarters is strictly applicable across all major states.\n2. The Zonal RLO for the Northern region is located in Lucknow.\n3. The Zonal RLO deals with unclaimed and refused articles without addresses or with incomplete addresses.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2, and 3"
        ],
        "correctAnswer": 1,
        "explanation": "The concept of RLO at Circle HQ has been changed, and now there are only four Zonal RLOs covering all of India. The Northern Zonal RLO is in Lucknow, and they deal with unclaimed/refused articles. Statement 1 is incorrect.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 2-3 – Rule 12",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-3",
        "text": "Match the following types of Foreign Post Offices with their correct functions:",
        "options": [
            "P-2, Q-4, R-1, S-3",
            "P-1, Q-3, R-2, S-4",
            "P-4, Q-2, R-3, S-1",
            "P-2, Q-1, R-4, S-3"
        ],
        "correctAnswer": 0,
        "explanation": "An Office of Exchange exchanges international mails (2). Office of Exchange of Transit handles only closed mail bags (4). A Foreign Post Office assesses customs duty (1). A Sub-Foreign Post Office handles mapped offices without direct foreign exchange (3).\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 3 – Rule 13",
        "difficulty": "Hard",
        "table": {
            "headers": ["List I (Office Type)", "List II (Function)"],
            "rows": [
                ["P. Office of Exchange", "1. Assessment of Customs Duty is carried out only for articles delivered in its jurisdiction"],
                ["Q. Office of Exchange of transit", "2. Makes up and exchanges international mails with foreign countries after customs clearance"],
                ["R. Foreign Post Office", "3. No exchange of mail with other countries, handles inbound/outbound mapped mail"],
                ["S. Sub-Foreign Post Office", "4. Receives and dispatches only closed mail bags addressed to or received from OEs"]
            ]
        }
    },
    {
        "id": "psgb-03-4",
        "text": "Who among the following officials acts as the in-charge of a Sub-Record Office (SRO) in the Railway Mail Service?",
        "options": [
            "Head Sorting Assistant",
            "Head Record Officer (HSG-I)",
            "Sub Record Officer (LSG)",
            "Record Officer (SA)"
        ],
        "correctAnswer": 2,
        "explanation": "According to the rules defining Record Offices, the in-charge of a Sub-Record Office (SRO), which is situated in the same RMS division other than the headquarters, is the Sub Record Officer (LSG).\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 6 – Rule 15 & 18",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-5",
        "text": "Which specific section of the Postal Directorate functions as the Central Bag Office?",
        "options": [
            "'A' Section",
            "'B' Section",
            "'C' Section",
            "'D' Section"
        ],
        "correctAnswer": 3,
        "explanation": "The 'D' Section of the Postal Directorate acts as the Central Bag Office. It deals exclusively with correspondence relating to the procurement and distribution of bags.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 7 – Rule 18.A",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-6",
        "text": "Regarding the preparation of labelled bundles, which of the following conditions is strictly correct according to Postal Manual Volume V?",
        "options": [
            "A Territorial bundle is prepared when the number of articles is 15 or more.",
            "A Station bundle contains registered articles of a particular station.",
            "An Express bundle contains articles which can be disposed of later.",
            "A Territorial bundle is prepared when the number of articles is 25 or more."
        ],
        "correctAnswer": 3,
        "explanation": "A Territorial bundle is prepared for a state or foreign country when the number of articles is 25 and more. Station bundles contain unregistered articles. Express bundles require immediate sorting.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 8 – Rule 24",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-7",
        "text": "Identify the correct color scheme of check slips used for tying Labelled Bundles containing foreign air mail:",
        "options": [
            "Pink check slip",
            "White check slip",
            "Blue check slip marked \"Air Mail\"",
            "Yellow check slip"
        ],
        "correctAnswer": 2,
        "explanation": "Blue check slips marked \"Air Mail\" are specifically used for foreign air mail bundles. Pink is for Ordinary Station Paid/Unpaid, and White is for Ordinary Sorting Bundles.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 9 – Rule 25",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-8",
        "text": "When an air parcel is sent inside an airmail bag, what superscription must the label of the bag bear to properly indicate its contents?",
        "options": [
            "I.B.",
            "C.A.P.",
            "'F'",
            "V.P."
        ],
        "correctAnswer": 1,
        "explanation": "When an air parcel is sent inside an airmail bag, the label of the bag should prominently bear the superscription \"C.A.P\" to clearly indicate that it contains an air parcel.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 9 – Rule 26-A",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-9",
        "text": "The symbol \"F\" marked on the label of a combined mail bag indicates the inclusion of which of the following items?",
        "options": [
            "Only ordinary unregistered letters",
            "Cash bag and Register bag",
            "Airmail parcel",
            "Insured bundles"
        ],
        "correctAnswer": 1,
        "explanation": "When a cash bag and a Register bag are both included inside a single Mail bag, the distinguishing symbol \"F\" must be marked on the label.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 9 – Rule 26",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-10",
        "text": "Given the definitions of \"Late letters\" and \"Too late letters\", consider the following statements:\n1. Late letters are posted after the closing hour without the prescribed late fee.\n2. Too late letters are posted after the closing hour with the prescribed late fee.\n3. The late fee has been abolished vide GSR-912(E) dated 29.12.2022.\nWhich of the statement(s) is/are correct?",
        "options": [
            "1 and 2 only",
            "3 only",
            "1, 2, and 3",
            "None of the above"
        ],
        "correctAnswer": 1,
        "explanation": "Historically, Late letters were posted with the prescribed late fee, whereas Too late letters lacked the fee. However, the late fee was entirely abolished vide GSR-912(E) dated 29.12.2022, making statement 3 the only accurate current provision.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 11 – Rule 56.A",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-11",
        "text": "What is the prescribed maximum limit of weight to be carried by each letter mail runner on a main line?",
        "options": [
            "10 Kg",
            "14 Kg",
            "28 Kg",
            "37 Kg"
        ],
        "correctAnswer": 1,
        "explanation": "The weight to be carried by each letter mail runner on a main line should not ordinarily exceed 14 Kg. In contrast, the limit for a postman is 10 Kg, and for a special parcel runner, it is 28 Kg.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 14 – Rule 135",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-12",
        "text": "Under the revised monetary limits for handling loss and fraud cases (w.e.f. 23.09.21), what is the financial investigation limit assigned to an Inspector / ASPOS?",
        "options": [
            "Up to Rs. 1 Lakh",
            "Above Rs. 1 Lakh up to Rs. 2 Lakh",
            "Up to Rs. 2 Lakh",
            "Above Rs. 2 Lakh up to Rs. 5 Lakh"
        ],
        "correctAnswer": 2,
        "explanation": "The revised monetary limit (w.e.f. 23.09.2021) for the investigation of loss and fraud cases by an Inspector / ASPOS was increased to \"Up to Rs. 2 Lakh\". The earlier limit was up to Rs. 1 Lakh.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 17 – Rule 175",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-13",
        "text": "Under what precise condition can a sender recall a postal article from the post without reference to the addressee's consent?",
        "options": [
            "By paying a postal fee of Rs. 10/-, provided the item has reached the destination office.",
            "Free of charge, if the original and substitute addresses are in the same delivery area.",
            "By paying a postal fee of Rs. 6/-, provided the item is cancelled before dispatch from the booking office.",
            "The sender cannot recall the item once handed over to the postal counter."
        ],
        "correctAnswer": 2,
        "explanation": "The sender can recall an accountable domestic or international inward item by paying a postal fee of Rs. 6/-, provided the item is successfully cancelled before it has been dispatched from the office of booking.\n\nSource: 15. Postal_Manual_Volume_V.pdf – Page 15 – Rule 148",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-14",
        "text": "In the Organizational structure of the Department of Posts, into how many Postal Circles is the country geographically divided?",
        "options": [
            "21",
            "22",
            "23",
            "24"
        ],
        "correctAnswer": 2,
        "explanation": "The Department of Posts is organized into exactly 23 Postal Circles across India. Each of these circles is headed by a Chief Postmaster General (CPMG).\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 2 – Circle Organization",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-15",
        "text": "Consider the composition of the Base Circle in the Department of Posts. Which of the following statements correctly describes its unique operational structure?",
        "options": [
            "It is headed by a Chief Postmaster General and consists of 100% Armed personnel.",
            "It is headed by a Major General called Additional Director General and comprises 75% Civil and 25% Armed personnel.",
            "It is headed by the Member (Operations) and comprises 50% Civil and 50% Armed personnel.",
            "It is headed by an Additional Director General comprising 25% Civil and 75% Armed personnel."
        ],
        "correctAnswer": 1,
        "explanation": "The Base Circle is specifically headed by a Major General called the Additional Director General (ADG) and is composed of 75% Civil and 25% Armed personnel.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 2 – Base Office",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-16",
        "text": "Which of the following Postal Circles is incorrectly matched with its defined jurisdiction over specific States or Union Territories?",
        "options": [
            "Gujarat Circle – Gujarat, Daman & Diu, Dadra and Nagar Haveli",
            "Kerala Circle – Kerala, Lakshadweep",
            "Maharashtra Circle – Maharashtra, Goa, Daman & Diu",
            "West Bengal Circle – West Bengal, Sikkim, Andaman and Nicobar"
        ],
        "correctAnswer": 2,
        "explanation": "The Maharashtra Circle has jurisdiction over Maharashtra and Goa only. The Union Territory of Daman & Diu is mapped under the jurisdiction of the Gujarat Circle. Thus, option C is incorrectly matched.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 2 – Circle Jurisdiction",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-17",
        "text": "Match the following Postal Circles with their respective Headquarters:",
        "options": [
            "P-2, Q-1, R-4, S-3",
            "P-1, Q-2, R-3, S-4",
            "P-4, Q-3, R-2, S-1",
            "P-2, Q-4, R-1, S-3"
        ],
        "correctAnswer": 0,
        "explanation": "The correct Headquarters mapping is: Haryana - Ambala (2), Chhattisgarh - Raipur (1), Uttaranchal (Uttarakhand) - Dehradun (4), and Orissa (Odisha) - Bhubneshwar (3).\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 1-2 – Circle Table",
        "difficulty": "Moderate",
        "table": {
            "headers": ["List I (Postal Circle)", "List II (Headquarters)"],
            "rows": [
                ["P. Haryana", "1. Raipur"],
                ["Q. Chhattisgarh", "2. Ambala"],
                ["R. Uttarakhand (Uttaranchal)", "3. Bhubneshwar"],
                ["S. Odisha", "4. Dehradun"]
            ]
        }
    },
    {
        "id": "psgb-03-18",
        "text": "Where is the Regional Postal Store Depot for the state of Odisha located?",
        "options": [
            "Cuttack",
            "Puri",
            "Bhubaneshwar",
            "Rourkela"
        ],
        "correctAnswer": 2,
        "explanation": "According to the organizational directory, the Regional Postal Store Depot for the state of Odisha is situated in Bhubaneshwar.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 3 – Regional Postal Store Depots",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-19",
        "text": "Identify the correct physical location corresponding to the Rafi Ahmed Kidwai National Postal Academy (RAKNPA) as per its designated PIN code.",
        "options": [
            "Mysore",
            "Saharanpur",
            "Ghaziabad",
            "Darbhanga"
        ],
        "correctAnswer": 2,
        "explanation": "The organizational manual lists RAKNPA with the pincode 201 002, which corresponds to Ghaziabad, Uttar Pradesh.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 3 – Postal Training Centre",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-20",
        "text": "Assertion (A): The North East Postal Circle encompasses all seven sister states of Northeast India.\nReason (R): The state of Sikkim is placed under the jurisdiction of the West Bengal Postal Circle.",
        "options": [
            "Both A and R are true and R is the correct explanation of A",
            "Both A and R are true but R is not the correct explanation of A",
            "A is true but R is false",
            "A is false but R is true"
        ],
        "correctAnswer": 3,
        "explanation": "The North East Circle includes Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, and Tripura (6 states). Assam forms a separate, independent Circle. Therefore, Assertion A is false. Reason R is true as Sikkim is indeed under the West Bengal Circle.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 2 – Circle Jurisdiction",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-21",
        "text": "As per the detailed Organizational Chart of the Department of Posts, which of the following authorities directly supervises the Chief General Manager (Parcel Directorate)?",
        "options": [
            "Member (Operations)",
            "Member (Technology)",
            "Director General Postal Services",
            "Secretary (Posts)"
        ],
        "correctAnswer": 2,
        "explanation": "According to the official Organizational Chart, the CGM (Parcel Directorate) operates directly under the Director General Postal Services (For Operations).\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 1 – Organizational Chart",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-22",
        "text": "Where are the two designated Security Presses of the Department of Posts located?",
        "options": [
            "Mumbai and Kolkata",
            "Nashik and Hyderabad",
            "Aligarh and Bhubaneshwar",
            "Trissur and Chennai"
        ],
        "correctAnswer": 1,
        "explanation": "The Security Presses under the Department of Posts organization are located at Nashik and Hyderabad.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 3 – Security Press",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-23",
        "text": "In the core organizational setup of the Postal Services Board, the Member (Tech) concurrently holds the designation of:",
        "options": [
            "Director General Postal Services",
            "Secretary (Posts)",
            "Secretary (Postal Services Board)",
            "Chief Investment Officer"
        ],
        "correctAnswer": 2,
        "explanation": "According to the Organizational Chart detailing the board's structure, the Member (Tech) is concurrently designated as the Secretary for operations (Postal Services Board).\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 1 – Organizational Chart",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-24",
        "text": "Which of the following statements regarding the Postal Training Centres (PTCs) is/are factually correct?\n1. PTC Vadodara is located in the Gujarat Circle.\n2. PTC Madurai is located in the Tamil Nadu Circle.\n3. PTC Saharanpur is located in the Uttarakhand Circle.",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2, and 3"
        ],
        "correctAnswer": 0,
        "explanation": "PTC Vadodara is in Gujarat, and PTC Madurai is in Tamil Nadu. However, PTC Saharanpur is located in Uttar Pradesh, not Uttarakhand. Thus, statement 3 is incorrect.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 3 – Postal Training Centre",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-25",
        "text": "The Government Solicitor or Law Officer for the Department of Posts is officially stationed at which of the following group of major cities?",
        "options": [
            "Delhi, Mumbai, and Chennai",
            "Mumbai, Kolkata, and Chennai",
            "Ahmedabad, Bengaluru, and Hyderabad",
            "Lucknow, Patna, and Guwahati"
        ],
        "correctAnswer": 1,
        "explanation": "The Government solicitor or law officer is stationed at Mumbai, Kolkata, and Chennai, primarily to advise on important legal cases arising in those regions.\n\nSource: 12. Postal_Manual_Volume_II.pdf – Page 3 – Government solicitor or law officer",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-26",
        "text": "Under the MNOP KPI framework, what is the strict target limit set for the Key Performance Indicator 'Share of duplicate barcodes'?",
        "options": [
            "Less than 5%",
            "1%",
            "0%",
            "2%"
        ],
        "correctAnswer": 2,
        "explanation": "The target for KPI #8 \"Share of duplicate barcodes\" is strictly fixed at 0%. This KPI specifically assesses how many articles were booked by reusing barcodes within a prescribed timeframe.\n\nSource: 24. MNOP_PNOP.pdf – Page 2 – KPI Table",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-27",
        "text": "Consider the following statements regarding the tracking scan compliance under MNOP:\n1. For Time Delivery (TD) articles, a total of 8 scans are mandatory.\n2. For Non-Time Delivery (NTD) articles, a total of 12 scans are mandatory.\n3. For BNPL-NTD category articles, 9 scans are mandatory.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2, and 3"
        ],
        "correctAnswer": 3,
        "explanation": "A total of 8 scans are mandatory for TD articles, whereas 12 scans are mandatory for NTD articles. In the specific case of BNPL-NTD category articles, 9 scans are strictly mandatory. All statements are correct.\n\nSource: 24. MNOP_PNOP.pdf – Page 5-6 – Full Scan Compliance",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-28",
        "text": "In the Parcel Network Optimization Project (PNOP), what does a \"Yellow\" colored bag label specifically signify?",
        "options": [
            "Surface connectivity for India Post Parcel",
            "Air connectivity for Speed Post Parcel",
            "Returned Parcel destined for RLO",
            "Unregistered First Class Mail"
        ],
        "correctAnswer": 1,
        "explanation": "The parcel bag label features two main colors: Yellow for Air connectivity (assigned to Speed Post Parcel) and Blue for Surface connectivity (assigned to India Post Parcel).\n\nSource: 24. MNOP_PNOP.pdf – Page 12 – PNOP Concept",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-29",
        "text": "What are the established Postman Ad-hoc Establishment Norms for the time taken to travel a distance of 1 KM by a 2-wheeler vehicle in a congested area?",
        "options": [
            "10 Minutes/KM",
            "6 Minutes/KM",
            "5 Minutes/KM",
            "3 Minutes/KM"
        ],
        "correctAnswer": 2,
        "explanation": "The ad-hoc norm for a mechanised delivery beat via a 2-wheeler vehicle in a congested area is set at 5 Minutes/KM. In a non-congested area, the norm is 3 Minutes/KM.\n\nSource: 24. MNOP_PNOP.pdf – Page 9 – Postman Ad-hoc Establishment Norms",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-30",
        "text": "To be eligible for a 100% payment of calculated fuel reimbursement charges under the mechanized delivery scheme, what is the absolute minimum percentage of delivery performance (accountable articles processed through IMA) that must be achieved?",
        "options": [
            "80%",
            "90%",
            "95%",
            "100%"
        ],
        "correctAnswer": 2,
        "explanation": "If delivery performance (processing of Accountable articles through IMA) is 95% or more, a 100% payment of calculated reimbursement charges is granted. If performance falls between 90% to 94.9%, only 80% is paid.\n\nSource: 24. MNOP_PNOP.pdf – Page 11 – Delivery Performance",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-31",
        "text": "According to PNOP Delivery Norms, a Nodal Delivery Centre (NDC) must be established in metros and cities where the parcel density exceeds:",
        "options": [
            "2 Parcels per Sq K.M.",
            "5 Parcels per Sq K.M.",
            "1 Parcel per Sq K.M.",
            "10 Parcels per Sq K.M."
        ],
        "correctAnswer": 2,
        "explanation": "An NDC is mandated to be set up in metros and all other cities/towns where the parcel density exceeds 1 Parcel per Sq K.M. The standard area for an ideal layout is 1595 Sq Ft.\n\nSource: 24. MNOP_PNOP.pdf – Page 13 – Setup of Nodal Delivery Centre",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-32",
        "text": "Under what physical or customer-defined conditions does a Speed Post article formally qualify to be processed as a \"Parcel\"?",
        "options": [
            "If the weight of the article exceeds 250 grams",
            "If the dimensions are beyond 30cms X 20cms X 2cms",
            "If the weight of the article is exceeding 500 grams",
            "Only if it is explicitly marked \"C.A.P\" by the sender"
        ],
        "correctAnswer": 2,
        "explanation": "Speed Post articles qualify as parcels if any of the following conditions are met: weight > 500 grams, dimensions > 38x27x2cms, or if the customer declares the contents as merchandise.\n\nSource: 24. MNOP_PNOP.pdf – Page 13 – Speed Post articles qualifying as parcel",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-33",
        "text": "Under the Bring Your Own Device (BYOD) Scheme (effective 25.06.2025), what is the fixed monthly incentive specifically allocated for using a personal smartphone, excluding SIM/Data charges?",
        "options": [
            "Rs. 200/-",
            "Rs. 300/-",
            "Rs. 500/-",
            "Rs. 1000/-"
        ],
        "correctAnswer": 1,
        "explanation": "The total BYOD remuneration is split into two components: a fixed incentive of Rs. 300/- per smartphone per month, and Rs. 200/- per month allocated for SIM/Data/SMS charges.\n\nSource: 24. MNOP_PNOP.pdf – Page 13 – BYOD Scheme",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-34",
        "text": "Match the designated Parcel Hub Category with its maximum allowed Throughput per hour under PNOP guidelines:",
        "options": [
            "P-3, Q-1, R-4, S-2",
            "P-1, Q-3, R-2, S-4",
            "P-3, Q-4, R-1, S-2",
            "P-4, Q-1, R-3, S-2"
        ],
        "correctAnswer": 0,
        "explanation": "The throughput limits are: Very-Small Category is <= 120 parcels/hr (3). Small is 121 to 250 parcels/hr (1). Medium is 251 to 500 parcels/hr (4). Large is 501 to 1400 parcels/hr (2).\n\nSource: 24. MNOP_PNOP.pdf – Page 15-16 – Operational area for a Parcel Hub",
        "difficulty": "Hard",
        "table": {
            "headers": ["List I (Parcel Hub Category)", "List II (Max Throughput/Hr)"],
            "rows": [
                ["P. Very-Small Category", "1. 121 to 250 parcels"],
                ["Q. Small Category", "2. 501 to 1400 parcels"],
                ["R. Medium Category", "3. Less than or equal to 120 parcels"],
                ["S. Large Category", "4. 251 to 500 parcels"]
            ]
        }
    },
    {
        "id": "psgb-03-35",
        "text": "In the Joint Parcel Product (JPP) Express Cargo Service executed in collaboration with Indian Railways, what is the handling charge inclusive of GST for an option combining both First Mile and Last Mile services?",
        "options": [
            "Rs. 4 per Kg",
            "Rs. 6 per Kg",
            "Rs. 8 per Kg",
            "Rs. 10 per Kg"
        ],
        "correctAnswer": 1,
        "explanation": "For Only First Mile or Only Last Mile, the handling charge is Rs. 4 per Kg. However, for a service comprising both First Mile and Last Mile, the combined charge is Rs. 6 per Kg inclusive of GST.\n\nSource: 24. MNOP_PNOP.pdf – Page 20 – Joint Parcel Product",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-36",
        "text": "As per PNOP operational norms, what is the exact timeline for executing the recovery of presumptive loss from erring officials after a bag/parcel remains untraced?",
        "options": [
            "The loss must be recovered within 30 days from the day of discrepancy.",
            "Recovery is to be made within a period of 45 days from the day of discrepancy.",
            "Recovery starts instantly on the 6th day without further notice.",
            "The loss must be written off if not traced within 15 days."
        ],
        "correctAnswer": 1,
        "explanation": "If a bag or parcel is not traced within 5 days, it becomes a presumptive loss. The Divisional office must initiate and ensure action to recover the loss within a strict period of 45 days from the day of discrepancy.\n\nSource: 24. MNOP_PNOP.pdf – Page 18 – Action at Divisional Office",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-37",
        "text": "Assertion (A): The Bag receipt area and Bag dispatch area in a parcel processing facility may be combined into a common area for all Hub categories except Category 4 (Large).\nReason (R): In cases where the facility has an attached Transit Mail Office (TMO), allocating receipt and dispatch at the TMO itself reduces space requirements for the parcel hub.",
        "options": [
            "Both A and R are true and R is the correct explanation of A",
            "Both A and R are true but R is not the correct explanation of A",
            "A is true but R is false",
            "A is false but R is true"
        ],
        "correctAnswer": 1,
        "explanation": "Category 1, 2, and 3 Hubs allow combining receipt and dispatch areas, while Large Category 4 demands dedicated separate spaces. The reason is factually true, as TMOs help reduce overall space, but it does not directly explain why Category 4 cannot combine these areas. Category 4 requires separation due to its massive volume throughput (501 to 1400 parcels/hr).\n\nSource: 24. MNOP_PNOP.pdf – Page 29-30 – Area combination guidelines",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-38",
        "text": "What is the designated strict target for the KPI 'Share of \"mis-sorted\" articles (NTD)' under the MNOP Project's performance review?",
        "options": [
            "0%",
            "1%",
            "5%",
            "10%"
        ],
        "correctAnswer": 1,
        "explanation": "According to the KPI targets established under the MNOP project, the target for the \"Share of 'mis-sorted' articles (NTD)\" is explicitly set at 1%. By contrast, for TD mis-sorts, it is 5%.\n\nSource: 24. MNOP_PNOP.pdf – Page 2 – KPI Table",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-39",
        "text": "Under the Government Savings Promotion General Rules, 2018, an account formally opened in the names of more than one and up to three individuals is strictly defined as:",
        "options": [
            "Multi-user Account",
            "Cooperative Account",
            "Joint Account",
            "Guardian Account"
        ],
        "correctAnswer": 2,
        "explanation": "Rule 3(1)(e) explicitly defines a \"Joint Account\" as an account opened in the names of more than one and up to three individuals.\n\nSource: 8. GSPR_2018.pdf – Page 1 – Rule 3(1)(e)",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-40",
        "text": "At what minimum age is a minor legally permitted to independently open and operate a single account under the provisions of a Savings Scheme governed by GSPR, 2018?",
        "options": [
            "10 years",
            "12 years",
            "15 years",
            "18 years"
        ],
        "correctAnswer": 0,
        "explanation": "According to Rule 4(2), a Minor who has successfully attained the age of ten years may independently open and operate an account in accordance with the provisions of a Savings Scheme.\n\nSource: 8. GSPR_2018.pdf – Page 2 – Rule 4(2)",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-41",
        "text": "What operational changes occur to a single account if the depositor subsequently becomes a Non-Resident Indian (NRI) during the operational period of the account?",
        "options": [
            "The account is immediately closed and funds repatriated.",
            "The account earns no interest from the date of status change.",
            "The account may continue till maturity on a non-repatriation basis without further extension.",
            "The account gets compulsorily transferred to a commercial bank."
        ],
        "correctAnswer": 2,
        "explanation": "Rule 4(3) stipulates that if a depositor becomes an NRI, the account may seamlessly continue till its maturity on a non-repatriation basis. However, it cannot be extended beyond maturity, and no interest is payable post-maturity.\n\nSource: 8. GSPR_2018.pdf – Page 3 – Rule 4(3)",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-42",
        "text": "Consider the following statements regarding the submission of identity documents (PAN / Form 60) for a Savings Account under GSPR, 2018:\n1. If not submitted at account opening, PAN must be provided within two months if the balance at any time exceeds Rs. 50,000/-.\n2. PAN must be submitted if the aggregate of all withdrawals and transfers in a month exceeds Rs. 10,000/-.\n3. Failure to submit PAN within the specified period will result in the immediate closure of the account.\nWhich of the statements given above is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "1, 2, and 3"
        ],
        "correctAnswer": 0,
        "explanation": "PAN/Form 60 must be submitted within 2 months if the balance exceeds Rs. 50,000, aggregate yearly credits exceed Rs. 1,00,000, or monthly withdrawals/transfers exceed Rs. 10,000. Failure results in the account ceasing to be operational until submission, not an immediate permanent closure (thus Statement 3 is wrong).\n\nSource: 8. GSPR_2018.pdf – Page 4 – Rule 6(1)(b)",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-43",
        "text": "What is the primary procedural difference between a Joint 'A' type and a Joint 'B' type account?",
        "options": [
            "Joint 'A' is operated severally, while Joint 'B' is operated jointly.",
            "Joint 'A' is operated jointly by all depositors, while Joint 'B' is operated severally by any of the depositors.",
            "Joint 'A' is for adults only, while Joint 'B' includes minors.",
            "Joint 'A' permits a maximum of three depositors, while Joint 'B' permits up to four."
        ],
        "correctAnswer": 1,
        "explanation": "Rule 8(2) states that a Joint 'A' type account is to be operated by all the depositors or surviving depositors jointly, whereas a Joint 'B' type account is operated by any of the depositors or surviving depositors severally.\n\nSource: 8. GSPR_2018.pdf – Page 6 – Rule 8(2)",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-44",
        "text": "Under what strict condition can an account originally opened as a Joint Account be subsequently converted into a Single Account?",
        "options": [
            "When all but one joint account holder provide a no-objection certificate.",
            "When the balance drops below the minimum limit for a joint account.",
            "Conversion is strictly prohibited under all circumstances.",
            "Conversion is allowed only in the case of a single surviving joint account holder."
        ],
        "correctAnswer": 3,
        "explanation": "Rule 8(3) unequivocally dictates that an account opened as a Single Account cannot be converted into a Joint Account or vice versa, provided that the conversion of a Joint Account into a single account is permitted only in the isolated case of a single surviving Joint Account holder.\n\nSource: 8. GSPR_2018.pdf – Page 6 – Rule 8(3)",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-45",
        "text": "When a minor account holder operating under GSPR 2018 attains majority, what procedural requirement must be fulfilled to continue operating the account?",
        "options": [
            "The guardian must close the account and transfer funds to a new adult account.",
            "The depositor must submit a revised application whose signature is attested by the guardian who opened the account.",
            "The account automatically converts to a regular account without any paperwork.",
            "The minor must provide an affidavit stating they are now an adult."
        ],
        "correctAnswer": 1,
        "explanation": "Rule 10(2) explicitly states that when the minor attains majority, they must submit a revised application along with fresh KYC documents. Crucially, the signature of the new major depositor must be attested by the guardian who originally opened the account.\n\nSource: 8. GSPR_2018.pdf – Page 7-8 – Rule 10(2)",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-46",
        "text": "Which statutory form is prescribed for submitting an application to transfer an account from one Government Savings Bank to another?",
        "options": [
            "Form 1",
            "Form 5",
            "Form 7",
            "Form 10"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 13(1) specifies that an account may be transferred from one Accounts Office to another by submitting an application utilizing Form-5, along with the prescribed transfer fees and the original passbook.\n\nSource: 8. GSPR_2018.pdf – Page 9 – Rule 13(1)",
        "difficulty": "Moderate"
    },
    {
        "id": "psgb-03-47",
        "text": "Which of the following scenarios correctly describes the rules for nomination under the Government Savings Promotion General Rules, 2018?",
        "options": [
            "A maximum of three individuals can be nominated as beneficiaries.",
            "A Non-Resident Indian (NRI) cannot be nominated under any condition.",
            "The transfer of the account as a security pledge under Rule 16 leads to the immediate cancellation of the existing nomination.",
            "In accounts opened before 1st April 2018, nominations cannot be updated or altered."
        ],
        "correctAnswer": 2,
        "explanation": "Rule 14(6)(ii) confirms that a nomination stands cancelled if the account is transferred as security under Rule 16. The rules permit a maximum of 4 nominees, and NRIs can indeed be nominated, provided the payment is on a non-repatriation basis.\n\nSource: 8. GSPR_2018.pdf – Page 10 – Rule 14(6)",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-48",
        "text": "Assertion (A): An account opened on behalf of a person of unsound mind can be pledged as security to a Scheduled Bank.\nReason (R): Pledging is permitted provided the guardian certifies in writing that the pledge/transfer is for the benefit of the person of unsound mind and that the person is alive.",
        "options": [
            "Both A and R are true and R is the correct explanation of A",
            "Both A and R are true but R is not the correct explanation of A",
            "A is true but R is false",
            "A is false but R is true"
        ],
        "correctAnswer": 0,
        "explanation": "Rule 16(2) proviso allows the transfer or pledging of an account opened on behalf of a minor or a person of unsound mind only if the guardian certifies in writing that the person is alive and the transfer is strictly for their benefit.\n\nSource: 8. GSPR_2018.pdf – Page 13 – Rule 16(2)",
        "difficulty": "Hard"
    },
    {
        "id": "psgb-03-49",
        "text": "In the event of pledging an account as security, which of the following Forms is utilized by the depositor to apply, supported by the pledgee's acceptance letter?",
        "options": [
            "Form 5",
            "Form 7",
            "Form 10",
            "Form 11"
        ],
        "correctAnswer": 1,
        "explanation": "Rule 16(1) specifies that an Account may be officially pledged or transferred as security on an application made by the depositor utilizing Form 7 supported with an acceptance letter from the pledgee.\n\nSource: 8. GSPR_2018.pdf – Page 13 – Rule 16(1)",
        "difficulty": "Easy"
    },
    {
        "id": "psgb-03-50",
        "text": "If a depositor dies without a nomination and the eligible balance is Rs. 3 Lakhs, which authority may pay the claimant without requiring a succession certificate from a court?",
        "options": [
            "Only the Head of Circle",
            "The authorized officer of the Accounts Office",
            "The District Magistrate",
            "The Revenue Tahsildar"
        ],
        "correctAnswer": 1,
        "explanation": "According to Rule 15(6)(i), if there is no nomination and the amount does not exceed Rs. 5 Lakhs, the authorized officer of the Accounts Office may independently pay the claimant without a succession certificate, relying on a death certificate, Form-11, Affidavit, and Indemnity bond.\n\nSource: 8. GSPR_2018.pdf – Page 11 – Rule 15(6)",
        "difficulty": "Hard"
    }
];
