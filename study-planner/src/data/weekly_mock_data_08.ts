import { Question } from "./live_mock_data";

export const WEEKLY_MOCK_08_QUESTIONS: Question[] = [
    {
        id: "weekly-08-1",
        text: "How many constituent bodies make up the Universal Postal Union (UPU) excluding the specific cooperatives?",
        options: ["2", "4", "6", "8"],
        correctAnswer: 1,
        explanation: "The Universal Postal Union consists of 4 main bodies: The Congress, The Council of Administration (CA), The Postal Operations Council (POC), and The International Bureau (IB), operating alongside 2 cooperatives."
    },
    {
        id: "weekly-08-2",
        text: "What is the maximum permitted weight for an M-Bag (Bulk bag) intended for foreign countries?",
        options: ["10 kg", "20 kg", "30 kg", "35 kg"],
        correctAnswer: 2,
        explanation: "The maximum permissible weight limit for an M-Bag containing printed documentation directed to the same addressee at the same address is 30 kg."
    },
    {
        id: "weekly-08-3",
        text: "Which customs declaration form must accompany an international postal article if the declared value of the contents exceeds 300 Special Drawing Rights (SDR)?",
        options: ["CN 22", "CN 23", "CP 71", "CN 29"],
        correctAnswer: 1,
        explanation: "Form CN 23 is mandatory when the declared value of the international item is greater than 300 Special Drawing Rights (SDR), whereas CN 22 is utilized for values up to 300 SDR."
    },
    {
        id: "weekly-08-4",
        text: "What is the prescribed treatment for a postcard addressed to a foreign destination that has postage stamps affixed on the back instead of the address side?",
        options: ["Taxed as insufficiently paid", "Treated as unpaid", "Returned to the sender immediately", "Forwarded without penalty"],
        correctAnswer: 1,
        explanation: "Postcards having stamps affixed on the back (other than the address side) are liable to be treated strictly as unpaid correspondence and processed accordingly."
    },
    {
        id: "weekly-08-5",
        text: "How is the compensation calculated for the loss, total theft, or total damage of an International Air Parcel?",
        options: [
            "30 SDR plus 4.5 SDR per kg, subject to an upper ceiling of 100 SDR",
            "40 SDR plus 4.5 SDR per kg, or the value of the contents, whichever is less, subject to an upper ceiling of 130 SDR, plus postage paid",
            "130 SDR flat rate, plus postage paid",
            "The exact declared value of the contents only, with no SDR limits"
        ],
        correctAnswer: 1,
        explanation: "Compensation for International Air Parcels is structured as 40 SDR plus 4.5 SDR per kg, or the value of the contents (whichever is less), capped at an upper limit of 130 SDR, in addition to the refund of the postage paid."
    },
    {
        id: "weekly-08-6",
        text: "Within what timeframe must an enquiry or request for information regarding an International Speed Post item be submitted?",
        options: [
            "Two months from the day of posting",
            "Four months from the day after the article was posted",
            "Six months from the day of posting",
            "One year from the day after the article was posted"
        ],
        correctAnswer: 1,
        explanation: "Enquiries regarding International Speed Post items must be entertained within a strict period of four months starting from the day after the article was posted."
    },
    {
        id: "weekly-08-7",
        text: "What is the maximum insured value permitted for a foreign postal article?",
        options: ["Rs. 10,000/-", "Rs. 50,000/-", "Rs. 1,00,000/-", "Rs. 5,00,000/-"],
        correctAnswer: 2,
        explanation: "The maximum insured value limit for any foreign article, encompassing letter post, parcel post, or express mail, is capped at Rs. 1,00,000/-."
    },
    {
        id: "weekly-08-8",
        text: "Which of the following living creatures is permitted to be transmitted by foreign post?",
        options: ["Silkworms", "Live poultry", "Reptiles", "Ornamental fish"],
        correctAnswer: 0,
        explanation: "All types of foreign articles containing living creatures are strictly prohibited, with the sole exceptions being bees, leeches, and silkworms."
    },
    {
        id: "weekly-08-9",
        text: "In the event of an outward international letter being insufficiently prepaid for air transmission, how is the article taxed if forwarded by air?",
        options: [
            "50% of the Air Surcharge",
            "75% of the Air Surcharge",
            "100% of the combined charge",
            "Returned to sender without taxing"
        ],
        correctAnswer: 1,
        explanation: "If an outward international letter is forwarded by air after being identified as insufficiently prepaid, the tax levied is exactly 75% of the applicable Air Surcharge."
    },
    {
        id: "weekly-08-10",
        text: "What is the maximum dimensional limit for an International Tracked Packet?",
        options: [
            "Sum of length, width, and depth not exceeding 90 cm, with the largest dimension not exceeding 60 cm",
            "Length not exceeding 1.05 meters",
            "Sum of length and greatest circumference not exceeding 3 meters",
            "Sum of length, width, and depth not exceeding 120 cm"
        ],
        correctAnswer: 0,
        explanation: "International Tracked Packets must have a combined length, width, and depth of no more than 90 cm, and the single largest dimension cannot exceed 60 cm."
    },
    {
        id: "weekly-08-11",
        text: "Which authority is empowered to issue a license for a Remotely Managed Franking System (RMFS) machine?",
        options: [
            "Postmaster General",
            "Head of the Postal Division or independent Gazetted Postmaster",
            "Sub-Postmaster of the designated office",
            "Director General of Posts"
        ],
        correctAnswer: 1,
        explanation: "The operational license for a Franking Machine is issued exclusively by the Head of the Postal Division, an independent Gazetted Postmaster, or Directors of specific GPOs."
    },
    {
        id: "weekly-08-12",
        text: "What is the validity period of an RMFS license?",
        options: ["1 Year", "3 Years", "5 Years", "10 Years"],
        correctAnswer: 2,
        explanation: "An RMFS license remains valid for a strict period of 5 years from the date of issue before requiring renewal."
    },
    {
        id: "weekly-08-13",
        text: "Under what condition is a rebate of 3% allowed on the franked value in an RMFS machine?",
        options: [
            "Minimum consumption of Rs. 1000/-",
            "Minimum consumption of Rs. 5000/-",
            "Only if sorted by Pin-Code",
            "Minimum consumption of Rs. 10,000/-"
        ],
        correctAnswer: 1,
        explanation: "A 3% rebate is allowed on the franked value whenever the meter is reset, provided there is a minimum consumption threshold of Rs. 5000/-."
    },
    {
        id: "weekly-08-14",
        text: "How long is a Poste Restante article (excluding Value Payable/COD) retained in the destination post office?",
        options: ["7 Days", "15 Days", "30 Days", "3 Months"],
        correctAnswer: 2,
        explanation: "A standard Poste Restante article is kept in the post office to which it is addressed for a retention period not exceeding 30 days."
    },
    {
        id: "weekly-08-15",
        text: "What is the maximum permissible weight for a single letter card?",
        options: ["2 grams", "3 grams", "5 grams", "10 grams"],
        correctAnswer: 2,
        explanation: "The weight of an inland letter card must not exceed 5 grams; if it infringes this condition, it is taxed as a standard letter."
    },
    {
        id: "weekly-08-16",
        text: "What late fee is applied to the renewal of a Registered Newspaper if the application is received after the date of expiry of the previous registration?",
        options: ["Rs. 50/-", "Rs. 100/-", "Rs. 200/-", "Rs. 500/-"],
        correctAnswer: 0,
        explanation: "If the renewal application for a Registered Newspaper is received after the previous registration's expiry date (after 31st Dec), a late fee of Rs. 50/- is charged."
    },
    {
        id: "weekly-08-17",
        text: "Which of the following conditions mandates the taxing of official postal articles sent \"On Government Service\"?",
        options: [
            "All official articles are taxed regardless of postage paid",
            "Unpaid articles are taxed at the prepaid rate, and insufficiently paid articles are taxed at the deficiency",
            "Unpaid articles are taxed at double the deficiency",
            "Official articles are entirely exempt from all postage taxes"
        ],
        correctAnswer: 1,
        explanation: "For official postal articles, unpaid items are charged the normal prepaid rate, while insufficiently paid items are charged only the exact deficiency amount, distinguishing them from public mail."
    },
    {
        id: "weekly-08-18",
        text: "What is the maximum monetary limit for a single retail Money Order?",
        options: ["Rs. 2,000/-", "Rs. 5,000/-", "Rs. 10,000/-", "Rs. 25,000/-"],
        correctAnswer: 2,
        explanation: "The maximum amount that can be remitted through a single retail Money Order transaction is Rs. 10,000/-."
    },
    {
        id: "weekly-08-19",
        text: "Under the Deen Dayal SPARSH Yojana, what is the annual scholarship amount awarded to selected students?",
        options: ["Rs. 1500/-", "Rs. 3000/-", "Rs. 6000/-", "Rs. 12000/-"],
        correctAnswer: 2,
        explanation: "The total scholarship amount distributed to selected students under the SPARSH Yojana is Rs. 6000/- per annum, disbursed at a rate of Rs. 1500/- per quarter."
    },
    {
        id: "weekly-08-20",
        text: "What is the minimum quantity of 'My Stamp' sheetlets that a corporate customer must mandate for purchase?",
        options: ["10 sheets", "50 sheets", "100 sheets", "5000 sheets"],
        correctAnswer: 3,
        explanation: "Applications for 'My Stamp' from corporate customers require a mandatory minimum order quantity of exactly 5000 sheets."
    },
    {
        id: "weekly-08-21",
        text: "Within the Mail Network Optimization Project (MNOP), what is the Key Performance Indicator (KPI) target for D+X Time Definite (TD) articles?",
        options: [
            "Average Time 1.28 days",
            "Average Time 2 days",
            "Average Time 3 days",
            "Average Time 4 days"
        ],
        correctAnswer: 0,
        explanation: "The strict KPI target for D+X for Time Definite (TD) articles is an average processing and delivery time of 1.28 days."
    },
    {
        id: "weekly-08-22",
        text: "What is the acceptable target for the share of bags without 'correct' bag labels under MNOP KPIs?",
        options: ["0%", "1%", "5%", "10%"],
        correctAnswer: 0,
        explanation: "The operational performance target mandates exactly 0% for the share of bags without correct bag labels, representing a zero-tolerance operational metric."
    },
    {
        id: "weekly-08-23",
        text: "How many mandatory scans constitute Full Scan Compliance for a Time Definite (TD) article booked under the MNOP scheme?",
        options: ["5 scans", "8 scans", "9 scans", "12 scans"],
        correctAnswer: 1,
        explanation: "A standard Time Definite (TD) article requires exactly 8 mandatory scans from booking to final delivery to achieve Full Scan Compliance."
    },
    {
        id: "weekly-08-24",
        text: "Which bag label format is correctly mapped to Registered Packets (RP) under MNOP guidelines?",
        options: ["RL-EB_1234567890", "CB_1234567890", "LB_1234567890", "RB_1234567890"],
        correctAnswer: 3,
        explanation: "The specific bag label identifier prefix for Registered Packets is \"RB\" followed by the 10-digit identification number."
    },
    {
        id: "weekly-08-25",
        text: "How is a \"TD Mis-sort\" defined operationally?",
        options: [
            "When an article is booked with a missing pin code",
            "When the pin code of the delivery PO for which the article is bagged differs from the pin code of the Delivery PO where the article is actually delivered",
            "When an article is routed to a different NSH than intended",
            "When an article lacks a final delivery scan within 5 working days"
        ],
        correctAnswer: 1,
        explanation: "A TD Mis-sort occurs precisely when the 6-digit pin code of the PO to which the article is bagged does not match the pin code of the PO where it is ultimately delivered."
    },
    {
        id: "weekly-08-26",
        text: "What is the delivery norm for a First Class (Registered) article destined for a neighboring state?",
        options: ["1-2 days", "2-3 days", "3-4 days", "5-6 days"],
        correctAnswer: 2,
        explanation: "The mandated delivery norm for First Class articles (both registered and unregistered) traveling to a neighboring state is 3-4 days."
    },
    {
        id: "weekly-08-27",
        text: "How is the daily fuel reimbursement charge calculated for delivery staff using their own 2-wheeler vehicles?",
        options: [
            "Flat rate of Rs. 100 per day",
            "Average expenditure on periodic maintenance per km plus average fuel charges per km, multiplied by the daily distance",
            "Total cost of fuel consumed during the month divided by 30",
            "Fixed at Rs. 3.68 per km regardless of actual fuel price"
        ],
        correctAnswer: 1,
        explanation: "The rate is calculated by adding the average expenditure on periodic maintenance per km to the average fuel charge per km, which is then multiplied by the daily distance covered."
    },
    {
        id: "weekly-08-28",
        text: "What percentage of accountable articles must be processed through the Postman Mobile App (PMA) for delivery staff to be eligible for 100% of their calculated fuel reimbursement?",
        options: ["80%", "90%", "95%", "100%"],
        correctAnswer: 2,
        explanation: "To receive 100% of the calculated fuel reimbursement charges, delivery performance (processing accountable articles through IMA) must be 95% or higher."
    },
    {
        id: "weekly-08-29",
        text: "Under the Bring Your Own Device (BYOD) Scheme, what is the fixed monthly incentive provided per smartphone for data/SMS charges specifically?",
        options: ["Rs. 200/-", "Rs. 300/-", "Rs. 500/-", "Rs. 1000/-"],
        correctAnswer: 0,
        explanation: "The BYOD remuneration includes a specific component of Rs. 200/- per month allocated explicitly for SIM/Data/SMS charges, distinct from the device usage incentive."
    },
    {
        id: "weekly-08-30",
        text: "What color is mandated for the bag label of a parcel connected via the Surface network (India Post Parcel)?",
        options: ["Red", "Yellow", "Blue", "Green"],
        correctAnswer: 2,
        explanation: "Parcel bag labels utilize a color-coded system where Blue is strictly designated for Surface connectivity (India Post Parcel) to distinguish it from air routing."
    },
    {
        id: "weekly-08-31",
        text: "What is the standard area footprint required for a Bag Opening Table in a parcel hub facility?",
        options: ["6 sq. ft.", "8 sq. ft.", "10 sq. ft.", "15 sq. ft."],
        correctAnswer: 2,
        explanation: "The required dimensions for a Bag Opening Table are 4 ft. x 2.5 ft., resulting in a standard operational area footprint of 10 sq. ft."
    },
    {
        id: "weekly-08-32",
        text: "How many parcels can a standard Roller Container hold, assuming it carries closed bags containing parcels?",
        options: ["50 parcels", "100 parcels", "150 parcels", "200 parcels"],
        correctAnswer: 3,
        explanation: "A standard Roller Container is designed to hold up to 20 closed parcel bags. With each bag containing an average of 10 parcels, the total capacity equals 200 parcels."
    },
    {
        id: "weekly-08-33",
        text: "What is the operational throughput target for a Medium Category Parcel Hub?",
        options: [
            "Less than 120 parcels per hour",
            "121 to 250 parcels per hour",
            "251 to 500 parcels per hour",
            "501 to 1400 parcels per hour"
        ],
        correctAnswer: 2,
        explanation: "A Medium Category Parcel Hub is operationally defined by a designated throughput capacity ranging from 251 to 500 parcels per hour."
    },
    {
        id: "weekly-08-34",
        text: "Which floor marking color is designated to indicate aisles and common walking pathways within a facility?",
        options: ["Blue", "Green", "Yellow", "Red"],
        correctAnswer: 2,
        explanation: "Yellow color markings are specifically mandated to identify aisles, common passages, and equipment movement pathways to ensure safe transit and organization."
    },
    {
        id: "weekly-08-35",
        text: "In an automated or manual facility, if a bag/parcel is not traced within 5 days of a discrepancy, what administrative action is initiated?",
        options: [
            "Write-off of the parcel value",
            "Immediate suspension of the record officer",
            "Recovery of presumptive loss from the officials at fault",
            "Dispatch of an Outward Error Register form to the sender"
        ],
        correctAnswer: 2,
        explanation: "If an item remains untraced after 5 days, the standard operating procedure mandates that the administration calculates a \"presumptive loss\" which must be recovered directly from the erring officials."
    },
    {
        id: "weekly-08-36",
        text: "According to the Ad-hoc Norms for a Manual Parcel Processing Centre, what is the letter processing rate for primary sorting?",
        options: ["150 letters/hour", "250 letters/hour", "350 letters/hour", "700 letters/hour"],
        correctAnswer: 3,
        explanation: "The designated ad-hoc operational norm for the manual primary sorting of parcels by an individual staff member is 700 letters per hour."
    },
    {
        id: "weekly-08-37",
        text: "Under the Joint Parcel Product (JPP) Express Cargo Service, what is the per kilogram charge levied if a customer opts for \"Only First Mile\" service?",
        options: ["Rs. 2/-", "Rs. 4/-", "Rs. 6/-", "Rs. 12.60/-"],
        correctAnswer: 1,
        explanation: "If a customer utilizes only the First Mile service (Pickup, Booking, and Handing over to Railways), the specific handling charge is Rs. 4/- per kg inclusive of GST."
    },
    {
        id: "weekly-08-38",
        text: "What is the maximum weight capacity of the Static Weight System (SWS) deployed under PNOP?",
        options: ["20 kg", "30 kg", "35 kg", "50 kg"],
        correctAnswer: 2,
        explanation: "The operational specification for the maximum weight measurement capacity of the Static Weight System (SWS) equipment is exactly 35 kg."
    },
    {
        id: "weekly-08-39",
        text: "Under the Remotely Managed Franking System (RMFS), what is the grace period allowed for renewal after the expiry of the licence before it is liable to be cancelled?",
        options: ["15 days", "1 month", "3 months", "6 months"],
        correctAnswer: 2,
        explanation: "An RMFS licence may be cancelled if an application for renewal has not been submitted after the expiry of 3 months from the date of the licence's expiry."
    },
    {
        id: "weekly-08-40",
        text: "What is the specific weight category targeted for the B2B and B2C segments under the Joint Parcel Product (JPP) Express Cargo Service?",
        options: ["10 Kg to 35 Kg", "20 Kg to 50 Kg", "35 Kg to 100 Kg", "50 Kg to 150 Kg"],
        correctAnswer: 2,
        explanation: "The Joint Parcel Product (JPP) Express Cargo Service specifically targets the parcel weight category of 35 Kg to 100 Kg for both B2C and B2B segments."
    },
    {
        id: "weekly-08-41",
        text: "In the Last Mile delivery process, how should parcels be arranged inside the delivery bag or vehicle?",
        options: [
            "First-In-First-Out (FIFO)",
            "Last-In-First-Out (LIFO)",
            "Arranged strictly by weight, heaviest at the bottom",
            "Arranged alphabetically by the addressee's name"
        ],
        correctAnswer: 1,
        explanation: "Delivery bags and vehicles must be loaded using the LIFO (Last-In-First-Out) principle, ensuring the last parcel loaded is the first one taken out for delivery on the beat route."
    },
    {
        id: "weekly-08-42",
        text: "What defines a \"Large Parcel\" strictly for the purpose of Last Mile delivery operations?",
        options: [
            "Any parcel weighing above 1 kg",
            "Any parcel weighing above 2 kg (physical or volumetric)",
            "Any parcel exceeding 500 grams",
            "Any parcel requiring a customs declaration"
        ],
        correctAnswer: 1,
        explanation: "For delivery logistics, Large Parcels are defined as those exceeding 2 kg in weight (either physical or volumetric) and usually require delivery via a four-wheeler."
    },
    {
        id: "weekly-08-43",
        text: "Which operational area in a Nodal Delivery Centre (NDC) handles the reconciliation of COD amounts and undelivered parcels?",
        options: [
            "Beat Sorting Area",
            "Secure Parcel Storage Area",
            "Data Admin Area",
            "Post Sort Staging Area"
        ],
        correctAnswer: 2,
        explanation: "The Data Admin Area within an NDC is specifically designated for data entry, treasury functions, COD reconciliation, and the processing of undelivered and return parcels."
    },
    {
        id: "weekly-08-44",
        text: "What is the ad-hoc time norm per kilometer for a Postman conducting a mechanized (2-wheeler) delivery in a congested area?",
        options: ["3 Minutes/KM", "5 Minutes/KM", "10 Minutes/KM", "12 Minutes/KM"],
        correctAnswer: 1,
        explanation: "The established ad-hoc time norm for a 2-wheeler vehicle operating in a designated congested area is set at 5 Minutes per kilometer."
    },
    {
        id: "weekly-08-45",
        text: "What is the handling capacity of a single Pigeon Hole within a standard Parcel Sorting Case?",
        options: ["5 parcels", "10 parcels", "16 parcels", "20 parcels"],
        correctAnswer: 2,
        explanation: "Each individual pigeon hole in a standard parcel sorting case is designed with the volumetric capacity to hold up to 16 standard parcels."
    },
    {
        id: "weekly-08-46",
        text: "In the context of parcel packaging, what is the required thickness specification for a Plastic Flyer/bag?",
        options: ["10-20 microns", "40 microns", "55-60 microns", "100-150 microns"],
        correctAnswer: 2,
        explanation: "Plastic flyers or bags used by customers or staff for securing parcels must maintain a minimum thickness specification of 55-60 microns."
    },
    {
        id: "weekly-08-47",
        text: "If a branch post office (BO) books a foreign parcel, what is the maximum limit for which it can be insured?",
        options: ["Rs. 600/-", "Rs. 1000/-", "Rs. 10,000/-", "Rs. 1,00,000/-"],
        correctAnswer: 0,
        explanation: "Foreign Parcels posted specifically at a Branch Post Office (BO) cannot be insured for an amount exceeding Rs. 600/-, despite higher limits existing for other office tiers."
    },
    {
        id: "weekly-08-48",
        text: "How is the \"Avis de reception\" treated in the context of international registered mail?",
        options: [
            "It is an expedited delivery service",
            "It is similar to the acknowledgement service in the inland post",
            "It is a mandatory customs clearance certificate",
            "It is a tax applied to insufficiently paid airmail"
        ],
        correctAnswer: 1,
        explanation: "\"Avis de reception\" translates to an advice of delivery, which functions operationally exactly like the standard acknowledgement (AD) service used in inland mail processing."
    },
    {
        id: "weekly-08-49",
        text: "What is the prescribed formula to determine if an unregistered letter qualifies as a \"Standard Envelope\" suitable for automatic machine processing in foreign post?",
        options: [
            "The ratio between length and breadth must be exactly 1",
            "The sum of length, breadth, and depth must be less than 900 mm",
            "The ratio between length and breadth must be more than 1.41",
            "The length must not exceed 600 mm"
        ],
        correctAnswer: 2,
        explanation: "Letters are treated as \"Standard Envelopes\" for automated transmission if the ratio between their length and breadth is greater than the square root of 2 (a value of 1.41)."
    },
    {
        id: "weekly-08-50",
        text: "Under what condition is a publisher allowed to post Registered Newspapers without prepaying postage?",
        options: [
            "If the newspaper is published daily without fail",
            "If a valid \"Licensed to post without prepayment\" (WPP) license is held and more than 500 copies are posted at a time",
            "If the newspaper weighs less than 50 grams per copy",
            "If the publisher submits the copies to a Night Post Office exclusively"
        ],
        correctAnswer: 1,
        explanation: "Publishers intending to post more than 500 copies of a registered newspaper at a time can do so without affixing postage, provided they possess a valid WPP (Without Prepayment) license authorized by the administrative head."
    },
];
