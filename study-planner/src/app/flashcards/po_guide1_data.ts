
export interface FlashcardData {
    id: number;
    question: string;
    answer: string;
    explanation: string;
    tag: string;
}

export const poGuide1Flashcards: FlashcardData[] = [
    {
        id: 1,
        question: "What is the specific timeframe for which a Branch Post Office is permitted to remain open for business in a day?",
        answer: "Maximum 5 hours",
        explanation: "Branch post offices shall be kept open for a maximum period of **five hours** in a day. This is strictly limited, whereas other post offices may work longer hours.",
        tag: "PO Guide Part I"
    },
    {
        id: 2,
        question: "Which authority is empowered to extend the working hours of a Post Office or keep it open on Sundays and Holidays?",
        answer: "Circle Head or Regional Head",
        explanation: "The Circle Head or Regional Head may specify business hours and authorize opening on Sundays/Holidays for special circumstances or public requirements.",
        tag: "PO Guide Part I"
    },
    {
        id: 3,
        question: "What is the prescribed colour for the frank impression under the Remotely Managed Franking System (RMFS)?",
        answer: "Blue",
        explanation: "The frank impression must be **blue** in colour for uniformity and identification. Impressions of other colors or from previous dates are treated as invalid.",
        tag: "PO Guide Part I"
    },
    {
        id: 4,
        question: "What are the validity period and fees for a Franking Machine License?",
        answer: "5 Years; Issue: Rs. 375/-; Renewal: Rs. 475/-",
        explanation: "Validity is 5 years. Issue fee is Rs. 375/-. Renewal fee is Rs. 475/-. Renewal must be applied for between 1 month before expiry and the expiry date.",
        tag: "PO Guide Part I"
    },
    {
        id: 5,
        question: "What is the rebate available to a franking machine licensee who consumes franked value of Rs. 6,000 upon resetting?",
        answer: "3%",
        explanation: "A rebate of 3% is allowed on the franked value upon resetting, provided the minimum consumption is Rs. 5,000/-. An extra 2% is available for pin-code wise sorting.",
        tag: "PO Guide Part I"
    },
    {
        id: 6,
        question: "What is the deduction applicable for claiming a refund on an erroneous franking impression?",
        answer: "5% on the face value",
        explanation: "Refunds can be claimed within **one month** by surrendering the envelopes. A 5% deduction applies to the face value of the impressions.",
        tag: "PO Guide Part I"
    },
    {
        id: 7,
        question: "How should mail intended for Defence Services personnel served by Army Post Offices be addressed?",
        answer: "Number, Rank, Name, Unit, and C/o 56 APO or 99 APO",
        explanation: "The address must include Number, Rank, Name, Unit and be care of **56 A.P.O.** or **99 A.P.O.**. The destination station name must NOT be mentioned.",
        tag: "PO Guide Part I"
    },
    {
        id: 8,
        question: "What is the maximum period a 'Poste Restante' article can be kept in the Post Office?",
        answer: "General: 15 days; COD: 7 days",
        explanation: "General articles are kept for up to **15 days**. Cash on Delivery (COD) articles are kept for only **7 days**.",
        tag: "PO Guide Part I"
    },
    {
        id: 9,
        question: "What fees are exempted for 'Blind Literature Packets'?",
        answer: "Postage, Registration, Acknowledgement, and Attested Copy Receipt fees",
        explanation: "Blind Literature Packets are exempt from postage, registration, acknowledgement, and receipt fees for **surface route** transmission.",
        tag: "PO Guide Part I"
    },
    {
        id: 10,
        question: "What is the 'Late Fee' for renewing a Registered Newspaper if applied between 1st Oct and 31st Dec?",
        answer: "Rs. 50/-",
        explanation: "Rs. 50/- is charged if the application is received between 1st Oct and 31st Dec. Rs. 100/- is charged if received after 31st Dec (expiry).",
        tag: "PO Guide Part I"
    },
    {
        id: 11,
        question: "What is the security deposit for 'Posting of Registered Newspapers without Prepayment of Postage' (WPP)?",
        answer: "Total of one month's postage",
        explanation: "The security deposit required is equivalent to the **total of one month's postage**.",
        tag: "PO Guide Part I"
    },
    {
        id: 12,
        question: "When is a Money Order (MO) treated as 'Void'?",
        answer: "If unpaid at the end of the second month following the month of issue",
        explanation: "An MO becomes void if not paid to the payee or remitter by the end of the **second month** following the month of issue.",
        tag: "PO Guide Part I"
    },
    {
        id: 13,
        question: "What is the commission for encashing an Indian Postal Order (IPO) between 24 and 36 months of issue?",
        answer: "Second commission payable via postage stamps",
        explanation: "Up to 24 months: Free. **24-36 months:** Second commission required. Beyond 36 months: Forfeited.",
        tag: "PO Guide Part I"
    },
    {
        id: 14,
        question: "What is the scholarship amount and academic criteria for 'Deen Dayal SPARSH Yojana'?",
        answer: "Rs. 6,000/- per annum; min 60% marks (55% for SC/ST)",
        explanation: "Scholarship is Rs. 6,000/yr (Rs. 1,500/quarter). Eligibility requires **60% marks** in the recent final exam (5% relaxation for SC/ST).",
        tag: "PO Guide Part I"
    },
    {
        id: 15,
        question: "What is the discount for Corporate Customers purchasing 'My Stamp' (Standard) for more than 100 sheets?",
        answer: "20% on additional sheets over 100",
        explanation: "10% discount for 2-100 sheets. **20% discount** applies only to the additional sheets beyond 100.",
        tag: "PO Guide Part I"
    },
    {
        id: 16,
        question: "What are the rules for reproducing a postage stamp for illustration in a publication?",
        answer: "Black colour only, different size, no perforation",
        explanation: "Must be in **black** (unless permitted), **not the same size** as the original, and **without perforation**.",
        tag: "PO Guide Part I"
    },
    {
        id: 17,
        question: "What is the mandatory minimum order quantity for 'Customized My Stamp' (CMS) for a corporate customer?",
        answer: "5000 sheets",
        explanation: "The minimum order for CMS is **5000 sheets**. India Post prints an extra 500 sheets for its own use.",
        tag: "PO Guide Part I"
    },
    {
        id: 18,
        question: "Who are the Chairman and Co-Chairman of the Philatelic Advisory Committee?",
        answer: "Chairman: Minister of Communications; Co-Chairman: MoS for Communications",
        explanation: "The Minister of Communications is the Chairman, and the Minister of State for Communications is the Co-Chairman (Vice Chairman).",
        tag: "PO Guide Part I"
    },
    {
        id: 19,
        question: "What is the tenure and meeting frequency of the Philatelic Advisory Committee?",
        answer: "Tenure: 2 years; Meetings: Once a year",
        explanation: "The committee has a tenure of **2 years** and meets **once a year**.",
        tag: "PO Guide Part I"
    },
    {
        id: 20,
        question: "What are the word limits for the 'Dhai Akhar Letter Writing Competition'?",
        answer: "Envelope: 1000 words; Inland Letter Card (ILC): 500 words",
        explanation: "**Envelope:** 1000 words limit. **ILC:** 500 words limit.",
        tag: "PO Guide Part I"
    },
    {
        id: 21,
        question: "What is the First Prize amount at the National Level for the Dhai Akhar competition?",
        answer: "Rs. 50,000/-",
        explanation: "First Prize: **Rs. 50,000/-**. Second Prize: Rs. 25,000/-. Third Prize: Rs. 10,000/-.",
        tag: "PO Guide Part I"
    },
    {
        id: 22,
        question: "What is the minimum deposit for a foreigner to open a Philatelic Deposit Account (PDA)?",
        answer: "Rs. 1000/-",
        explanation: "Foreign customers need **Rs. 1000/-** and must open the account at the **Mumbai GPO**. Domestic customers need Rs. 200/-.",
        tag: "PO Guide Part I"
    },
    {
        id: 23,
        question: "When are Commemorative Stamps issued for institutions or buildings?",
        answer: "On 50th, 75th, 100th, 125th, or 150th anniversaries",
        explanation: "Issued only for **apex** institutions on major anniversaries (50, 75, 100, 125, 150).",
        tag: "PO Guide Part I"
    },
    {
        id: 24,
        question: "What postal business is excluded from Mobile Post Offices?",
        answer: "Insured and Cash on Delivery (COD) articles",
        explanation: "Mobile Post Offices do **not** accept Insured or COD articles.",
        tag: "PO Guide Part I"
    },
    {
        id: 25,
        question: "What happens if an RMFS machine fails to dial the server for 30 days?",
        answer: "The machine gets blocked",
        explanation: "It gets **blocked** strictly. Unblocking occurs once it successfully dials the server. It is not cancelled immediately.",
        tag: "PO Guide Part I"
    },
    {
        id: 26,
        question: "What are the charges for Camp Bags booked for high dignitaries?",
        answer: "Incidental: Rs. 16/-; Postage: As per 10 Kg Parcel",
        explanation: "**Incidental charge:** Rs. 16/- per bag. **Postage:** Payable as for a **10 Kg Parcel**, regardless of actual weight (up to 10kg).",
        tag: "PO Guide Part I"
    },
    {
        id: 27,
        question: "How is unpaid postage charged on delivery for 'On Government Service' (Official) articles?",
        answer: "Charged at prepaid rate (single deficiency)",
        explanation: "Unpaid official mail is charged the **prepaid rate**, not double. Insufficiently paid is charged only the deficiency.",
        tag: "PO Guide Part I"
    },
    {
        id: 28,
        question: "What is the fee for a Postal Identification Card?",
        answer: "Rs. 270/- (Rs. 20 App Fee + Rs. 250 Processing)",
        explanation: "Total is **Rs. 270/-** (20 + 250). Valid for 3 years.",
        tag: "PO Guide Part I"
    },
    {
        id: 29,
        question: "What is the date of issue and denomination of the first stamp of Independent India?",
        answer: "21 Nov 1947; 3 ½ Annas",
        explanation: "Issued on **21 Nov 1947** with a value of **3 ½ Annas**. Shows the Indian Flag and 'Jai Hind'.",
        tag: "PO Guide Part I"
    },
    {
        id: 30,
        question: "What is the postage rate for a bundle of Registered Newspapers containing multiple copies?",
        answer: "50 paise (first 100g) + 20 paise (every addl 100g)",
        explanation: "Bundle rate: **50 paise** for first 100g, **20 paise** for each additional 100g. Not delivered to residence.",
        tag: "PO Guide Part I"
    },
    {
        id: 31,
        question: "What is the monetary limit for retail money orders by a single person in a month?",
        answer: "Rs. 25,000/-",
        explanation: "The aggregate limit is **Rs. 25,000/-** per month for a single remitter.",
        tag: "PO Guide Part I"
    },
    {
        id: 32,
        question: "When can a 'Force Letter' or 'Green Envelope' be delivered without postage recovery?",
        answer: "When it bears the date stamp of an Army Post Office (APO)",
        explanation: "If stamped by an **APO**, it is treated as prepaid and delivered free.",
        tag: "PO Guide Part I"
    },
    {
        id: 33,
        question: "What is the fee for the Recall of a Postal Article?",
        answer: "Rs. 6/-",
        explanation: "The fee is **Rs. 6/-** per article, paid in stamps affixed to the application.",
        tag: "PO Guide Part I"
    },
    {
        id: 34,
        question: "What are the rental charges for a Post Box and Post Bag combined?",
        answer: "Rs. 250/- per annum",
        explanation: "Post Box only: Rs. 150/-. Post Bag only: Rs. 150/-. **Combined: Rs. 250/-** per annum.",
        tag: "PO Guide Part I"
    },
    {
        id: 35,
        question: "What is the Maximum Weight Limit for a 'Blind Literature Packet'?",
        answer: "7 Kilograms",
        explanation: "Max weight is **7 kg**.",
        tag: "PO Guide Part I"
    },
    {
        id: 36,
        question: "What is the detention period and fee for a Value Payable (VP) article if the addressee requests more time?",
        answer: "7 days extra; Demurrage Fee applies",
        explanation: "Can be detained for an additional **7 days** on written request, subject to a **Demurrage Fee**.",
        tag: "PO Guide Part I"
    },
    {
        id: 37,
        question: "What is the Maximum Weight Limit for a Book Packet containing Periodicals?",
        answer: "5 Kilograms",
        explanation: "Max weight is **5 kg**.",
        tag: "PO Guide Part I"
    },
    {
        id: 38,
        question: "Is redirection charge applicable if a parcel is redirected to a new address within India?",
        answer: "Yes, usually half the prepaid rate",
        explanation: "Redirection is free for letters/postcards if unopened, but for **Parcels**, redirection fees (half the prepaid rate) apply unless within the same delivery area.",
        tag: "PO Guide Part I"
    },
    {
        id: 39,
        question: "Who pays the postage if an 'On India Government Service' (OIGS) article is refused by the addressee?",
        answer: "The Sender",
        explanation: "For official mail (OIGS), if refused, the **Sender** is liable to pay the postage due.",
        tag: "PO Guide Part I"
    },
    {
        id: 40,
        question: "What is the maximum size limit for a Parcel?",
        answer: "Length: 1m; Length + Girth: 1.80m",
        explanation: "Length max **1 meter**. Length + Girth combined max **1.80 meters**.",
        tag: "PO Guide Part I"
    }
];
