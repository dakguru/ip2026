import { Question } from "./live_mock_data";

export const PSGB_MOCK_02_QUESTIONS: Question[] = [
    {
        "id": "psgb-02-1",
        "text": "Which of the following is considered an \"accountable item\" under the Post Office Regulations, 2024?",
        "options": [
            "Ordinary Letter",
            "Registered Letter",
            "Unregistered Printed Paper",
            "Periodical Post"
        ],
        "correctAnswer": 1,
        "explanation": "Regulation 2(1)(a) defines accountable items as those providing a receipt at booking and requiring a signature upon delivery, explicitly including International Registered Letter items."
    },
    {
        "id": "psgb-02-2",
        "text": "Consider the following statements regarding the business hours of post offices:\n1. Branch post offices shall be kept open for a maximum period of five hours in a day.\n2. Savings Bank counter services are generally available for eight hours on normal weekdays.\nWhich of the above statements is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 0,
        "explanation": "Under Regulation 3, Branch post offices are kept open for a maximum of five hours. Savings Bank counter services are generally available for six hours, not eight."
    },
    {
        "id": "psgb-02-3",
        "text": "Which of the following is NOT prohibited from being transmitted as printed papers and literature for the blind?",
        "options": [
            "Items containing any postage stamp or form of prepayment",
            "Items containing a paper representing a monetary value",
            "Items bearing any inscription or item of correspondence",
            "An enclosed uncancelled card bearing the printed address of the sender prepaid for return"
        ],
        "correctAnswer": 3,
        "explanation": "Regulation 29 prohibits postage stamps and monetary values, EXCEPT an enclosed card, envelope, or wrapper bearing the printed address of the sender prepaid for return."
    },
    {
        "id": "psgb-02-4",
        "text": "A sender books an inward international item. Upon delivery, it is found that the postage is insufficiently prepaid. Which of the following is the correct charge recovered from the addressee?",
        "options": [
            "Double the prepaid rate",
            "Double the deficiency, subject to a minimum of one rupee",
            "The exact deficiency amount",
            "The item is returned to the sender without delivery"
        ],
        "correctAnswer": 1,
        "explanation": "Regulation 72(1) states that for an insufficiently paid inward international item, double the deficiency is charged, provided the amount charged shall in no case be less than rupee one."
    },
    {
        "id": "psgb-02-5",
        "text": "If an accountable item cannot be delivered on its first presentation, how many more times can it be issued for delivery?",
        "options": [
            "Issued twice more",
            "Issued once again",
            "It is never issued again",
            "Kept at the post office until collected"
        ],
        "correctAnswer": 1,
        "explanation": "Regulation 42(1) explicitly states that if an accountable item is not delivered due to any reason on its first presentation, it shall be issued once again for delivery."
    },
    {
        "id": "psgb-02-6",
        "text": "Which of the following items are completely prohibited from being sent by post under domestic regulations?",
        "options": [
            "Any ticket or proposal relating to a private lottery",
            "Any indecent, immoral or obscene printing",
            "Any item having a pictorial representation of a proclaimed offender",
            "All of the above"
        ],
        "correctAnswer": 3,
        "explanation": "Regulation 25(1) clearly lists private lottery tickets, indecent or obscene printings, and pictorial representations of proclaimed offenders as prohibited domestic items."
    },
    {
        "id": "psgb-02-7",
        "text": "Match the Standard Remarks used for undelivered items with their final disposal scenarios:",
        "options": [
            "1-Z, 2-X, 3-Y",
            "1-X, 2-Z, 3-Y",
            "1-Y, 2-X, 3-Z",
            "1-Z, 2-Y, 3-X"
        ],
        "correctAnswer": 0,
        "explanation": "As per the Standard Remarks table in Regulation 66, \"Addressee not found\" requires keeping in deposit for 7 days. \"Left without instructions\" is returned to sender. \"Unclaimed\" applies when an item is not collected in time.",
        "table": {
            "headers": [
                "Column I",
                "Column II"
            ],
            "rows": [
                [
                    "1. Addressee not found",
                    "X. Returned to sender immediately"
                ],
                [
                    "2. Addressee left without instructions",
                    "Y. Item not collected within prescribed time after intimation"
                ],
                [
                    "3. Unclaimed",
                    "Z. Keep in deposit for 7 days and if nobody claims, return to sender"
                ]
            ]
        }
    },
    {
        "id": "psgb-02-8",
        "text": "All of the following items are legally acceptable as \"Gyan Post\" EXCEPT:",
        "options": [
            "Text books used by aspirants of competitive examinations",
            "Books containing incidental announcements or list of books",
            "Magazines and journals published at a regular interval of time",
            "Literature related to social, cultural, and religious nature"
        ],
        "correctAnswer": 2,
        "explanation": "Under Regulation 92A(2)(a), \"Gyan Post\" items shall not contain any publication published at regular intervals, such as magazines or journals."
    },
    {
        "id": "psgb-02-9",
        "text": "Under the compensation policy for domestic items, what is the compensation payable for the loss or damage of a Speed Post (Domestic) article?",
        "options": [
            "Rs. 500 flat rate",
            "Rs. 100 or actual value, whichever is less",
            "Double the Speed Post postage paid or Rs. 1000, whichever is less",
            "Rs. 1000 flat rate"
        ],
        "correctAnswer": 2,
        "explanation": "Regulation 73(3) prescribes compensation for Speed Post (Domestic) loss or damage as double the amount of Speed Post postage paid or Rs. 1000, whichever is less depending upon actual value."
    },
    {
        "id": "psgb-02-10",
        "text": "Consider the following statements regarding the redirection of items:\n1. An addressee may alter the address free of charge if the new address is within the delivery area of the same post office.\n2. A sender can recall an item from the post without the consent of the addressee by paying a postal fee of Rs. 6.\nWhich of the above statements is/are correct?",
        "options": [
            "1 only",
            "2 only",
            "Both 1 and 2",
            "Neither 1 nor 2"
        ],
        "correctAnswer": 2,
        "explanation": "Regulation 55 allows the sender to recall an item for a fee of Rs. 6 without the addressee's consent, and allows the addressee free alteration if the new address is within the same delivery area."
    },
    {
        "id": "psgb-02-11",
        "text": "According to the Post Office Regulations, 2024, what is the minimum allowed dimension for a letter in roll form?",
        "options": [
            "Single dimension 140 mm, sum of length and twice diameter 200 mm",
            "Single dimension 100 mm, sum of length and twice diameter 170 mm",
            "Single dimension 100 mm, sum of length and twice diameter 200 mm",
            "Single dimension 150 mm, sum of length and twice diameter 300 mm"
        ],
        "correctAnswer": 1,
        "explanation": "Regulation 87(4)(ii) specifies the minimum dimensions for a letter in roll form: Single dimension 100 mm, and the sum of length and twice diameter 170 mm."
    },
    {
        "id": "psgb-02-12",
        "text": "Which of the following is NOT a condition for posting a Registered Newspaper?",
        "options": [
            "It must be brought out, printed, or published in India only.",
            "It must be registered with the Press Registrar General of India.",
            "A late fee of Rs. 500 is charged for renewal received after the expiry date.",
            "The date of the publication must be printed on the first or last page."
        ],
        "correctAnswer": 2,
        "explanation": "Regulation 95 specifies a late fee of Rs. 100 (not Rs. 500) for renewal applications received after the date of expiry of the previous registration."
    },
    {
        "id": "psgb-02-13",
        "text": "In the context of the \"Book Now Pay Later\" (BNPL) facility, which of the following statements is/are correct?\n1. It is available only to retail customers sending international parcels.\n2. A corporate customer is one who provides a minimum specified business worth of postage in a calendar month.\n3. The monthly bill will be raised by the booking office by the 7th day of the following month.",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "All of the above"
        ],
        "correctAnswer": 1,
        "explanation": "Regulation 170 defines BNPL for corporate (not retail) customers meeting minimum monthly business thresholds. The bill is raised monthly by the 7th day."
    },
    {
        "id": "psgb-02-14",
        "text": "What is the time limit for a sender or addressee to file a complaint regarding the non-receipt of a domestic registered item?",
        "options": [
            "After 15 days and within 30 days of booking",
            "After 15 days and within 60 days of booking",
            "After 30 days and within 90 days of booking",
            "Within 15 days of booking"
        ],
        "correctAnswer": 1,
        "explanation": "Regulation 75(1)(a) specifies that a complaint for non-receipt of a domestic item may be made after fifteen days and within sixty days of booking."
    },
    {
        "id": "psgb-02-15",
        "text": "All of the following items can be legally disposed of immediately at the Returned Letter Office (RLO) EXCEPT:",
        "options": [
            "Items containing printed or handwritten papers with no intrinsic value",
            "Postcards on which postage has not been prepaid",
            "Letter cards on which postage has not been prepaid",
            "Unclaimed items with intrinsic value"
        ],
        "correctAnswer": 3,
        "explanation": "Under Regulation 68, items without intrinsic value and unpaid postcards/letter cards are destroyed/disposed of forthwith. Items with intrinsic value are disposed of through auction."
    },
    {
        "id": "psgb-02-16",
        "text": "What is the consequence if a letter card infringes the prescribed dimension conditions?",
        "options": [
            "It is returned to the sender.",
            "It is confiscated by the Returned Letter Office.",
            "It is treated as a letter and charged double the deficiency between postage already paid and postage payable for a letter.",
            "It is treated as an India Post Parcel."
        ],
        "correctAnswer": 2,
        "explanation": "Regulation 90(1) states that if conditions are infringed, the letter card is treated as a letter and charged with double the deficiency between the postage paid and the postage for a letter."
    },
    {
        "id": "psgb-02-17",
        "text": "A customer wishes to book a Logistics Post consignment. Which of the following statements does NOT apply to Logistics Post?",
        "options": [
            "The consignors are free to insure their goods with a third-party insurer.",
            "The Department of Posts is liable to compensate the consignor if the third-party insurer fails.",
            "Demurrage charges are equivalent to double the charges for storage, worked out on an hourly basis.",
            "Logistics Post Centre will prepare a delivery challan in five copies."
        ],
        "correctAnswer": 1,
        "explanation": "Under Logistics Post rules (Regulation 98), the Department of Posts explicitly states it would not be liable to compensate either the consignor/consignee or any insurer."
    },
    {
        "id": "psgb-02-18",
        "text": "In Night Post Offices, what specific items are accepted on Sundays and PO holidays?",
        "options": [
            "Savings Bank deposits",
            "Registered newspapers and packets of registered newspapers",
            "Insured articles",
            "Value Payable Parcels"
        ],
        "correctAnswer": 1,
        "explanation": "According to PO Guide Part-I, Clause 7, registered newspapers and packets of registered newspapers are accepted on Sundays and PO holidays in Press Sorting Offices, RMS offices, and Night Post Offices."
    },
    {
        "id": "psgb-02-19",
        "text": "Consider the following statements regarding the Remotely Managed Franking System (RMFS):\n1. The frank impression shall be blue in colour.\n2. A rebate of 5% is allowed on the franked value whenever the meter is reset.\n3. Machine Franked articles posted in letter boxes shall be treated as unpaid articles.\nWhich of the above statements is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "2 and 3 only",
            "All of the above"
        ],
        "correctAnswer": 1,
        "explanation": "Under Clause 11 of PO Guide Part-I, the rebate allowed is 3% (not 5%), making statement 2 incorrect. The frank impression is blue, and franked articles in letter boxes are treated as unpaid."
    },
    {
        "id": "psgb-02-20",
        "text": "Which of the following conditions is NOT required for claiming a refund on unused postage units in a Franking Machine?",
        "options": [
            "The franking machine must either be condemned or its use discontinued.",
            "The claim for refund must be submitted within three months from the date the machine was condemned or discontinued.",
            "A deduction of 5% on face value is strictly applied to all unused postage units.",
            "Refunds can only be granted for unused postage units remaining in the machine at the time of condemnation."
        ],
        "correctAnswer": 2,
        "explanation": "Clause 11 specifies a 5% deduction applies to the \"Refund of erroneous impression\", not automatically for unused postage units remaining in a condemned machine."
    },
    {
        "id": "psgb-02-21",
        "text": "The first stamp of independent India, issued on 21 November 1947, depicted which of the following?",
        "options": [
            "The Ashoka Chakra",
            "The Indian Flag with the slogan \"Jai Hind\"",
            "Mahatma Gandhi",
            "The Red Fort"
        ],
        "correctAnswer": 1,
        "explanation": "According to the Philately section, the first stamp of Independent India depicted the Indian Flag with the slogan \"Jai Hind\", valued at three and one-half annas."
    },
    {
        "id": "psgb-02-22",
        "text": "Under the Dhai Akhar Letter Writing Competition (2024-25), what is the First Prize amount at the National Level?",
        "options": [
            "Rs. 25,000",
            "Rs. 10,000",
            "Rs. 50,000",
            "Rs. 1,00,000"
        ],
        "correctAnswer": 2,
        "explanation": "The PO Guide Part-I specifies the Dhai Akhar National Level First Prize is Rs. 50,000. (The Circle level first prize is Rs. 25,000)."
    },
    {
        "id": "psgb-02-23",
        "text": "All of the following are valid rules for \"My Stamp\" Corporate Customers EXCEPT:",
        "options": [
            "The cost of one My Stamp sheet is Rs. 300.",
            "A minimum quantity of 100 sheets is mandatory for corporate customers.",
            "A discount of 10% is allowed on the purchase of 2 to 100 My Stamp sheetlets.",
            "A flat discount of 20% applies to the total purchase if a customer buys exactly 200 sheetlets."
        ],
        "correctAnswer": 3,
        "explanation": "The 20% discount applies ONLY to the additional sheetlets over 100. For 200 sheetlets, 10% applies to the first 100, and 20% to the next 100."
    },
    {
        "id": "psgb-02-24",
        "text": "What is the validity period of an Identification Card issued by a Head Post Office (HO)?",
        "options": [
            "1 year from the date of issue",
            "3 years from the date of issue",
            "5 years from the date of issue",
            "Valid for a lifetime"
        ],
        "correctAnswer": 1,
        "explanation": "Clause 63 of PO Guide Part-I states that an Identification Card is issued only in HO and is valid for 3 years from the date of issue."
    },
    {
        "id": "psgb-02-25",
        "text": "Consider the following statements regarding \"Poste Restante\":\n1. It is intended solely for the convenience of strangers and travellers.\n2. A Poste Restante article (except COD) can be kept in the post office for up to 30 days.\n3. The facility cannot be used by a person for more than 3 months.\nHow many of the above statements are correct?",
        "options": [
            "Only one",
            "One and Three",
            "All three",
            "Only three"
        ],
        "correctAnswer": 1,
        "explanation": "Statements 1 and 3 are correct. Statement 2 is incorrect because a standard Poste Restante article is kept for a period not exceeding one month, as per Clause 64."
    },
    {
        "id": "psgb-02-26",
        "text": "Under the Philately rules, what is the handling charge levied on each occasion for a Philatelic Deposit Account (PDA) held by a foreign customer?",
        "options": [
            "1% (minimum Rs. 5)",
            "2% (minimum Rs. 5)",
            "5% (minimum Rs. 10)",
            "No handling charge is levied"
        ],
        "correctAnswer": 1,
        "explanation": "PO Guide Part-I states that for foreigners, the handling charge for a PDA is 2% (minimum Rs. 5) on each occasion."
    },
    {
        "id": "psgb-02-27",
        "text": "Which of the following combinations regarding Indian Postal Orders (IPOs) is INCORRECT?",
        "options": [
            "Denomination Rs. 10 : Commission Rs. 1",
            "Denomination Rs. 20 : Commission Rs. 2",
            "Denomination Rs. 50 : Commission Rs. 5",
            "Denomination Rs. 100 : Commission Rs. 15"
        ],
        "correctAnswer": 3,
        "explanation": "According to the IPO table, the commission for a Rs. 100 denomination is Rs. 10, not Rs. 15."
    },
    {
        "id": "psgb-02-28",
        "text": "A Camp Bag is intended for high dignitaries. Match the items with their correct postage/charge requirements for a Camp Bag:",
        "options": [
            "1-Y, 2-X, 3-Z",
            "1-Z, 2-X, 3-Y",
            "1-X, 2-Z, 3-Y",
            "1-Z, 2-Y, 3-X"
        ],
        "correctAnswer": 1,
        "explanation": "Under Clause 205-207 for Camp Bags: Parcel postage is payable as on a 10 Kg Parcel; Letter mail is not charged as Postage; Registration Charge is Prepaid in Service Stamps.",
        "table": {
            "headers": [
                "Column I",
                "Column II"
            ],
            "rows": [
                [
                    "1. Parcel",
                    "X. Not charged as Postage"
                ],
                [
                    "2. Letter Mail",
                    "Y. Prepaid in Service Stamp"
                ],
                [
                    "3. Registration Charge",
                    "Z. Postage payable on 10 Kg Parcel"
                ]
            ]
        }
    },
    {
        "id": "psgb-02-29",
        "text": "Which of the following articles is totally exempted from postage, registration fees, and acknowledgement fees when transmitted by surface route?",
        "options": [
            "Registered Newspapers",
            "Blind Literature Packets",
            "Camp Bags",
            "Value Payable Parcels"
        ],
        "correctAnswer": 1,
        "explanation": "Clause 136 specifies that Blind Literature Packets are exempted from payment of postage, registration fee, and fee for acknowledgement by surface route."
    },
    {
        "id": "psgb-02-30",
        "text": "For the delivery of registered articles to messengers, the instructions received from the addressee authorising the post office remain valid for what time limit unless renewed?",
        "options": [
            "1 Year",
            "2 Years",
            "3 Years",
            "5 Years"
        ],
        "correctAnswer": 2,
        "explanation": "Clause 60 states that instructions received from an addressee authorizing the post office to deliver articles to persons other than themselves are treated as lapsed after 3 Years unless renewed."
    },
    {
        "id": "psgb-02-31",
        "text": "Consider the following statements regarding Commemorative Stamps:\n1. Stamps can be issued in honour of a Head of State on their first death anniversary.\n2. Commemorative stamps can be issued on a living personality.\n3. Unsold commemorative stamps are released to the definitive stamp vending counters after 6 months.\nWhich of the above statements is/are correct?",
        "options": [
            "1 and 2 only",
            "1 and 3 only",
            "2 and 3 only",
            "All of the above"
        ],
        "correctAnswer": 1,
        "explanation": "Under Philately rules, no postage stamp shall be issued on a living personality. Statements 1 and 3 are correct."
    },
    {
        "id": "psgb-02-32",
        "text": "What is the consequence if an Indian Postal Order (IPO) is presented for payment after 24 months but before 36 months from the last day of the month of issue?",
        "options": [
            "It is forfeited and no payment is made.",
            "It is paid normally without any additional charges.",
            "A second commission is collected in the form of postage stamps.",
            "It must be re-issued by the Head Post Office."
        ],
        "correctAnswer": 2,
        "explanation": "Clause 243-254 states that if presented after 2 years but before 3 years, a second commission is to be collected in the form of Postage. After 36 months, it is forfeited."
    },
    {
        "id": "psgb-02-33",
        "text": "A money order remains unpaid to the payee or remitter. At the end of which month following the month of its issue is it treated as \"void\"?",
        "options": [
            "First month",
            "Second month",
            "Sixth month",
            "Twelfth month"
        ],
        "correctAnswer": 1,
        "explanation": "Under the rules for Money Orders, an unpaid money order is treated as void at the end of the second month following the month of its issue."
    },
    {
        "id": "psgb-02-34",
        "text": "All of the following are correctly matched with their maximum weight limits EXCEPT:",
        "options": [
            "Letter - 2 kg",
            "Letter Card - 5 grams",
            "Registered Newspaper - 5 kg",
            "Camp Bag Parcel - 20 kg"
        ],
        "correctAnswer": 3,
        "explanation": "According to the Camp Bag table in PO Guide Part-I, the maximum weight for a parcel in a Camp Bag is 10 Kg, not 20 Kg."
    },
    {
        "id": "psgb-02-35",
        "text": "Where is the Headquarters of the Universal Postal Union (UPU) located?",
        "options": [
            "Bangkok, Thailand",
            "Geneva, Switzerland",
            "Berne, Switzerland",
            "Paris, France"
        ],
        "correctAnswer": 2,
        "explanation": "Section 3 of PO Guide Part II states that the UPU Headquarters is established in Berne (Switzerland)."
    },
    {
        "id": "psgb-02-36",
        "text": "Which of the following bodies is NOT a constituent part of the Universal Postal Union (UPU)?",
        "options": [
            "The Congress",
            "The Postal Operations Council (POC)",
            "The Asian-Pacific Postal College (APPC)",
            "The Council of Administration (CA)"
        ],
        "correctAnswer": 2,
        "explanation": "The APPC is run by the Asian Pacific Postal Union (APPU), not the UPU. UPU consists of The Congress, CA, POC, and IB."
    },
    {
        "id": "psgb-02-37",
        "text": "Under the Letter Post (LCAO) definition in foreign post, which of the following falls under the \"Autres Object\" (AO) category?",
        "options": [
            "Letters",
            "Aerogrammes",
            "Postcards",
            "Printed Papers"
        ],
        "correctAnswer": 3,
        "explanation": "According to Clause 6, \"Letter et Cartes\" (LC) includes Letters, Postcards, and Aerogrammes. \"Autres Object\" (AO) includes Printed Papers, Small Packets, and Literature for the blind."
    },
    {
        "id": "psgb-02-38",
        "text": "Consider the following statements regarding the treatment of an unpaid or insufficiently paid outward international airmail article where the sender's address is unknown:\n1. A letter taxed by air is charged 75% of the Air Surcharge.\n2. A postcard taxed by air is charged 50% of the Combined Charge.\n3. An aerogramme taxed by surface is charged less than 75% of the Air Surcharge.\nWhich of the above statements is/are correct?",
        "options": [
            "1 and 2 only",
            "2 and 3 only",
            "1 and 3 only",
            "All of the above"
        ],
        "correctAnswer": 0,
        "explanation": "According to Clause 60 flowcharts, an aerogramme taxed by surface is charged \"Less 50% of Combined Charge\", not less than 75% of the Air Surcharge. Hence statement 3 is incorrect."
    },
    {
        "id": "psgb-02-39",
        "text": "For the purpose of outward international articles, Customs Declaration Form CN 23 is used when the value of the contents exceeds:",
        "options": [
            "100 SDR",
            "300 SDR",
            "500 SDR",
            "1000 SDR"
        ],
        "correctAnswer": 1,
        "explanation": "Clause 23 states that CN 23 is used if the value of contents of articles is more than 300 Special Drawing Rights (SDR)."
    },
    {
        "id": "psgb-02-40",
        "text": "All of the following conditions apply to the M-Bag (Bulk bag) system EXCEPT:",
        "options": [
            "The maximum permissible weight of an M-bag is 30 kg.",
            "It is intended for transmission of printed papers to the same addressee at the same address.",
            "A rectangular address label not measuring more than 90mm X 140mm must be provided.",
            "Compensation claims are fully admissible for registered bulk bags (M Bags) in case of loss."
        ],
        "correctAnswer": 3,
        "explanation": "Clause 43(e) clearly states \"No compensation claim is admissible for registered bulk bag (M Bag).\""
    },
    {
        "id": "psgb-02-41",
        "text": "According to the dimensions specified for foreign letters in roll form, the sum of the length and twice the diameter should NOT exceed:",
        "options": [
            "900 mm",
            "1040 mm",
            "600 mm",
            "170 mm"
        ],
        "correctAnswer": 1,
        "explanation": "Section III A (Letter) states that for roll form, the sum of the length and twice the diameter should not exceed 1040 mm."
    },
    {
        "id": "psgb-02-42",
        "text": "Match the Postal items with their maximum weight limits in the international post:",
        "options": [
            "1-Y, 2-X, 3-Z",
            "1-Z, 2-X, 3-Y",
            "1-Y, 2-Z, 3-X",
            "1-X, 2-Y, 3-Z"
        ],
        "correctAnswer": 0,
        "explanation": "Small Packets have a maximum weight of 2 Kg; Aerogramme maximum weight is 3 gms; Literature for the blind maximum weight is 7 kg.",
        "table": {
            "headers": [
                "Column I",
                "Column II"
            ],
            "rows": [
                [
                    "1. Small Packets",
                    "X. 3 grams"
                ],
                [
                    "2. Aerogramme",
                    "Y. 2 Kg"
                ],
                [
                    "3. Literature for the Blind",
                    "Z. 7 Kg"
                ]
            ]
        }
    },
    {
        "id": "psgb-02-43",
        "text": "In international post, what is the mandatory phrase that must be indicated on \"Small Packets\"?",
        "options": [
            "Imprimes",
            "Par Avion",
            "Petits Paquets",
            "Cecogrammes"
        ],
        "correctAnswer": 2,
        "explanation": "Clause D (Small Packets) states they should bear the indication \"Petits Paquets\" or Small Packets."
    },
    {
        "id": "psgb-02-44",
        "text": "Under the compensation policy for an International Air Parcel, what is the maximum limit of compensation payable for loss, total theft, or total damage?",
        "options": [
            "30 SDR plus postage paid",
            "40 SDR plus 4.5 SDR per kg, subject to a ceiling of 130 SDR, plus postage paid",
            "130 SDR flat, inclusive of postage",
            "The exact declared value without any upper ceiling"
        ],
        "correctAnswer": 1,
        "explanation": "The compensation policy for International Air Parcels specifies 40 SDR plus 4.5 SDR per kg or the value of contents, whichever is less, subject to an upper ceiling of 130 SDR, plus the postage paid."
    },
    {
        "id": "psgb-02-45",
        "text": "Consider the following regarding Electronic Advance Data (EAD) for international mail:\n1. EAD adoption requires the mandatory submission of a 7+1 dataset.\n2. Letters and postcards not subject to customs duties are exempted from EAD requirements.\n3. Consignor and Consignee addresses are part of the mandatory data elements.\nHow many of the above statements are correct?",
        "options": [
            "Only one",
            "Only two",
            "All three",
            "None"
        ],
        "correctAnswer": 2,
        "explanation": "The clause on EAD states the 7+1 dataset is mandatory, exempts letters/postcards not subject to customs duties, and includes consignor/consignee addresses. All three are correct."
    },
    {
        "id": "psgb-02-46",
        "text": "For which of the following sets of countries is the Tariff for an Airmail Post Card fixed at Rs. 8.00?",
        "options": [
            "USA, Canada, and Mexico",
            "Great Britain, France, and Germany",
            "Pakistan, Nepal, Bangladesh, and Bhutan",
            "Japan, China, and South Korea"
        ],
        "correctAnswer": 2,
        "explanation": "According to the International Mail Tariff table, the Airmail Post Card rate for Pakistan, Nepal, Bangladesh, and Bhutan is Rs. 8.00."
    },
    {
        "id": "psgb-02-47",
        "text": "What is the time limit for submitting inquiries and requests for information regarding an International Speed Post (EMS) item?",
        "options": [
            "Within six months from the day of posting",
            "Within four months from the day after posting",
            "Within one year from the day of posting",
            "Within 30 days of posting"
        ],
        "correctAnswer": 1,
        "explanation": "Clause 200 states that inquiries shall be entertained within a period of four months for International Speed Post items from the day after that on which the article was posted."
    },
    {
        "id": "psgb-02-48",
        "text": "All of the following items are prohibited from being imported into India by letter post EXCEPT:",
        "options": [
            "Live plants",
            "Sugarcane",
            "Living insects without special permission",
            "Counterfeit items"
        ],
        "correctAnswer": 1,
        "explanation": "Clause 88 states \"No plant shall be imported in India by letter post except sugarcane.\""
    },
    {
        "id": "psgb-02-49",
        "text": "Which of the following correctly describes the \"Frane de Droits\" (free of charges) service in foreign parcels?",
        "options": [
            "Parcels delivered without levying any postage at the time of booking.",
            "Parcels where the sender prepays customs duty, clearance fee, and delivery charges so it is delivered free of charge to the addressee.",
            "Parcels addressed to military personnel exclusively.",
            "Parcels that contain blind literature and are completely exempt from air surcharges."
        ],
        "correctAnswer": 1,
        "explanation": "\"Frane de Droits\" allows the sender to prepay custom duty, clearance fees, etc., marked \"To be delivered free of charges\", so the addressee pays nothing on delivery."
    },
    {
        "id": "psgb-02-50",
        "text": "What is the maximum dimension limit for a Foreign Postcard?",
        "options": [
            "100 x 150 mm",
            "120 x 235 mm",
            "140 x 90 mm",
            "210 x 300 mm"
        ],
        "correctAnswer": 1,
        "explanation": "Clause B (Postcards) under foreign post dimensions states the maximum dimension is 120 X 235 mm. Minimum Dimensions: 90 x 140 mm (with a standard tolerance of 2 mm)"
    }
];
