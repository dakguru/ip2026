// PS Group B Mock Test Schedule - 14 Weeks (Week 1: Mar 30 - Apr 5 ... Week 14: Jun 29 - Jul 5)
// Each week's mock test is on Sunday, covering topics studied Mon-Sat that week.

export interface PsgbMockTestWeek {
    week: number;
    topics: string[];
    sundayDate: string; // Format: 'YYYY-MM-DD'
    saturdayDate: string; // Format: 'YYYY-MM-DD' (start of the mock window)
}

export const PSGB_MOCK_SCHEDULE: PsgbMockTestWeek[] = [
    {
        week: 1,
        topics: [
            "Consumer Protection Act, 2019",
            "PMLA Act, 2002",
            "The Post Office Act, 2023 & Rules 2024",
            "Book of BO Rules"
        ],
        saturdayDate: "2026-04-04",
        sundayDate: "2026-04-05"
    },
    {
        week: 2,
        topics: [
            "The PO Regulations, 2024",
            "PO Guide Part-I",
            "PO Guide Part-II"
        ],
        saturdayDate: "2026-04-11",
        sundayDate: "2026-04-12"
    },
    {
        week: 3,
        topics: [
            "Postal Manual Volume V",
            "Postal Manual Volume II (Organisation)",
            "MNOP & PNOP Guidelines",
            "GSPR, 2018"
        ],
        saturdayDate: "2026-04-18",
        sundayDate: "2026-04-19"
    },
    {
        week: 4,
        topics: [
            "PO Small Savings Schemes",
            "POSB (CBS) Manual",
            "PO Life Insurance Scheme, 2011"
        ],
        saturdayDate: "2026-04-25",
        sundayDate: "2026-04-26"
    },
    {
        week: 5,
        topics: [
            "Citizen Charter of DoP",
            "Complaint & Grievance Handling",
            "Postal Manual Vol II - Ch XI (Misc)",
            "Manual of Office Procedure",
            "Annual Reports & Book of Info"
        ],
        saturdayDate: "2026-05-02",
        sundayDate: "2026-05-03"
    },
    {
        week: 6,
        topics: [
            "Manual on Public Procurement",
            "CVC Guidelines on Public Procurement",
            "GFR 2017 (Other than Procurement)",
            "Postal Manual Volume IV"
        ],
        saturdayDate: "2026-05-09",
        sundayDate: "2026-05-10"
    },
    {
        week: 7,
        topics: [
            "Instructions on APAR Maintenance",
            "Welfare Measures (Employees & GDS)",
            "Postal Manual Vol II Ch VI, VIII, IX, XII",
            "Schedule of Financial Powers",
            "Instructions on Estt. & Admin"
        ],
        saturdayDate: "2026-05-16",
        sundayDate: "2026-05-17"
    },
    {
        week: 8,
        topics: [
            "Recruitment Rules for Various Cadres",
            "CCS (Conduct) Rules, 1964",
            "CCS (CCA) Rules, 1965",
            "CCS (Temporary Service) Rules, 1965",
            "Brochure on Casual Labourers"
        ],
        saturdayDate: "2026-05-23",
        sundayDate: "2026-05-24"
    },
    {
        week: 9,
        topics: [
            "CCS (Pension) Rules, 2021",
            "CCS (Implementation of NPS) Rules, 2021",
            "CCS (Gratuity under NPS) Rules, 2021",
            "CCS (Commutation of Pension) Rules, 1981",
            "CCS (Leave) Rules, 1972"
        ],
        saturdayDate: "2026-05-30",
        sundayDate: "2026-05-31"
    },
    {
        week: 10,
        topics: [
            "CCS (GPF) Rules, 1960",
            "CS (Medical Attendance) Rules, 1944",
            "FR & SR - General Rules",
            "FR & SR - TA Rules",
            "FR & SR - DA, DR & HRA Rules"
        ],
        saturdayDate: "2026-06-06",
        sundayDate: "2026-06-07"
    },
    {
        week: 11,
        topics: [
            "CCS (LTC) Rules, 1988",
            "CCS (Revised Pay) Rules, 2016",
            "CEA & Hostel Subsidy Rules",
            "CGEGIS, 1980",
            "Postal Manual Volume III"
        ],
        saturdayDate: "2026-06-13",
        sundayDate: "2026-06-14"
    },
    {
        week: 12,
        topics: [
            "P&T FHB Vol I (Part 2)",
            "Postal FHB Vol II",
            "Interface with IPPB",
            "Preservation of Records",
            "Swachh Bharat"
        ],
        saturdayDate: "2026-06-20",
        sundayDate: "2026-06-21"
    },
    {
        week: 13,
        topics: [
            "GDS (Conduct & Engagement) Rules, 2020",
            "CAT Act, 1985 & Rules",
            "RTI Act, 2005 & Rules 2012",
            "Sexual Harassment (POSH) Act, 2013",
            "Public Accountants Default Act, 1850",
            "Revenue Recovery Act, 1890"
        ],
        saturdayDate: "2026-06-27",
        sundayDate: "2026-06-28"
    },
    {
        week: 14,
        topics: [
            "Prevention of Corruption Act, 1988",
            "CCS (Joining Time) Rules, 1979",
            "CCS (Recognition of Service Assn) Rules, 1993",
            "Postal Manual Vol II: Ch III, IV, V, VII",
            "Inspection Questionnaires",
            "Goods and Services Tax (GST) Act, 2017"
        ],
        saturdayDate: "2026-07-04",
        sundayDate: "2026-07-05"
    }
];
