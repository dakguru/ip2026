
export interface PsgbScheduleItem {
    date: string;       // DD-MM-YYYY
    day: string;
    week: string;
    paper: string;      // "Paper I" | "Paper II" | "Revision" | "End"
    topic: string;
    subTopic: string;
    duration: string;
}

export const PSGB_FULL_SCHEDULE: PsgbScheduleItem[] = [
    // ===== WEEK 1 =====
    { date: "30-03-2026", day: "Monday",    week: "Week 1",  paper: "Paper I", topic: "Acts", subTopic: "Consumer Protection Act, 2019 (Part 1)", duration: "Day 1 of 2" },
    { date: "31-03-2026", day: "Tuesday",   week: "Week 1",  paper: "Paper I", topic: "Acts", subTopic: "Consumer Protection Act, 2019 (Part 2)", duration: "Day 2 of 2" },
    { date: "01-04-2026", day: "Wednesday", week: "Week 1",  paper: "Paper I", topic: "Acts", subTopic: "PMLA Act, 2002 (Part 1)", duration: "Day 1 of 2" },
    { date: "02-04-2026", day: "Thursday",  week: "Week 1",  paper: "Paper I", topic: "Acts", subTopic: "PMLA Act, 2002 (Part 2)", duration: "Day 2 of 2" },
    { date: "03-04-2026", day: "Friday",    week: "Week 1",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "The Post Office Act, 2023 & Rules 2024", duration: "1 Day" },
    { date: "04-04-2026", day: "Saturday",  week: "Week 1",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "Book of BO Rules", duration: "1 Day" },
    { date: "05-04-2026", day: "Sunday",    week: "Week 1",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 1", duration: "-" },

    // ===== WEEK 2 =====
    { date: "06-04-2026", day: "Monday",    week: "Week 2",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "The PO Regulations, 2024 (Part 1)", duration: "Day 1 of 3" },
    { date: "07-04-2026", day: "Tuesday",   week: "Week 2",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "The PO Regulations, 2024 (Part 2)", duration: "Day 2 of 3" },
    { date: "08-04-2026", day: "Wednesday", week: "Week 2",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "The PO Regulations, 2024 (Part 3)", duration: "Day 3 of 3" },
    { date: "09-04-2026", day: "Thursday",  week: "Week 2",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "PO Guide Part-I (Part 1)", duration: "Day 1 of 2" },
    { date: "10-04-2026", day: "Friday",    week: "Week 2",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "PO Guide Part-I (Part 2)", duration: "Day 2 of 2" },
    { date: "11-04-2026", day: "Saturday",  week: "Week 2",  paper: "Paper I", topic: "Inland/Foreign Post", subTopic: "PO Guide Part-II (Complete)", duration: "1 Day" },
    { date: "12-04-2026", day: "Sunday",    week: "Week 2",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 2", duration: "-" },

    // ===== WEEK 3 =====
    { date: "13-04-2026", day: "Monday",    week: "Week 3",  paper: "Paper I", topic: "Postal Manual", subTopic: "Postal Manual Volume V (Part 1)", duration: "Day 1 of 2" },
    { date: "14-04-2026", day: "Tuesday",   week: "Week 3",  paper: "Paper I", topic: "Postal Manual", subTopic: "Postal Manual Volume V (Part 2)", duration: "Day 2 of 2" },
    { date: "15-04-2026", day: "Wednesday", week: "Week 3",  paper: "Paper I", topic: "Postal Manual", subTopic: "Postal Manual Volume II (Org)", duration: "1 Day" },
    { date: "16-04-2026", day: "Thursday",  week: "Week 3",  paper: "Paper I", topic: "Mail Operations", subTopic: "MNOP & PNOP Guidelines (Part 1)", duration: "Day 1 of 2" },
    { date: "17-04-2026", day: "Friday",    week: "Week 3",  paper: "Paper I", topic: "Mail Operations", subTopic: "MNOP & PNOP Guidelines (Part 2)", duration: "Day 2 of 2" },
    { date: "18-04-2026", day: "Saturday",  week: "Week 3",  paper: "Paper I", topic: "Saving Bank", subTopic: "GSPR, 2018", duration: "1 Day" },
    { date: "19-04-2026", day: "Sunday",    week: "Week 3",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 3", duration: "-" },

    // ===== WEEK 4 =====
    { date: "20-04-2026", day: "Monday",    week: "Week 4",  paper: "Paper I", topic: "Saving Bank", subTopic: "PO Small Savings Schemes (Part 1)", duration: "Day 1 of 2" },
    { date: "21-04-2026", day: "Tuesday",   week: "Week 4",  paper: "Paper I", topic: "Saving Bank", subTopic: "PO Small Savings Schemes (Part 2)", duration: "Day 2 of 2" },
    { date: "22-04-2026", day: "Wednesday", week: "Week 4",  paper: "Paper I", topic: "Saving Bank", subTopic: "POSB (CBS) Manual (Part 1)", duration: "Day 1 of 2" },
    { date: "23-04-2026", day: "Thursday",  week: "Week 4",  paper: "Paper I", topic: "Saving Bank", subTopic: "POSB (CBS) Manual (Part 2)", duration: "Day 2 of 2" },
    { date: "24-04-2026", day: "Friday",    week: "Week 4",  paper: "Paper I", topic: "PLI", subTopic: "PO Life Insurance Scheme, 2011 (Part 1)", duration: "Day 1 of 2" },
    { date: "25-04-2026", day: "Saturday",  week: "Week 4",  paper: "Paper I", topic: "PLI", subTopic: "PO Life Insurance Scheme, 2011 (Part 2)", duration: "Day 2 of 2" },
    { date: "26-04-2026", day: "Sunday",    week: "Week 4",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 4", duration: "-" },

    // ===== WEEK 5 =====
    { date: "27-04-2026", day: "Monday",    week: "Week 5",  paper: "Paper I", topic: "Organization", subTopic: "Citizen Charter of DoP", duration: "1 Day" },
    { date: "28-04-2026", day: "Tuesday",   week: "Week 5",  paper: "Paper I", topic: "Organization", subTopic: "Complaint & Grievance Handling", duration: "1 Day" },
    { date: "29-04-2026", day: "Wednesday", week: "Week 5",  paper: "Paper I", topic: "Office Procedure", subTopic: "Postal Manual Vol II - Ch XI (Misc)", duration: "1 Day" },
    { date: "30-04-2026", day: "Thursday",  week: "Week 5",  paper: "Paper I", topic: "Office Procedure", subTopic: "Manual of Office Procedure (Part 1)", duration: "Day 1 of 2" },
    { date: "01-05-2026", day: "Friday",    week: "Week 5",  paper: "Paper I", topic: "Office Procedure", subTopic: "Manual of Office Procedure (Part 2)", duration: "Day 2 of 2" },
    { date: "02-05-2026", day: "Saturday",  week: "Week 5",  paper: "Paper I", topic: "Office Procedure", subTopic: "Annual Reports & Book of Info", duration: "1 Day" },
    { date: "03-05-2026", day: "Sunday",    week: "Week 5",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 5", duration: "-" },

    // ===== WEEK 6 =====
    { date: "04-05-2026", day: "Monday",    week: "Week 6",  paper: "Paper I", topic: "Material Mgmt", subTopic: "Manual on Public Procurement", duration: "1 Day" },
    { date: "05-05-2026", day: "Tuesday",   week: "Week 6",  paper: "Paper I", topic: "Material Mgmt", subTopic: "CVC guidelines on Public procurement", duration: "1 Day" },
    { date: "06-05-2026", day: "Wednesday", week: "Week 6",  paper: "Paper I", topic: "Material Mgmt", subTopic: "GFR 2017 (Other than Procurement) (Part 1)", duration: "Day 1 of 2" },
    { date: "07-05-2026", day: "Thursday",  week: "Week 6",  paper: "Paper I", topic: "Material Mgmt", subTopic: "GFR 2017 (Other than Procurement) (Part 2)", duration: "Day 2 of 2" },
    { date: "08-05-2026", day: "Friday",    week: "Week 6",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Postal Manual Volume IV (Part 1)", duration: "Day 1 of 2" },
    { date: "09-05-2026", day: "Saturday",  week: "Week 6",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Postal Manual Volume IV (Part 2)", duration: "Day 2 of 2" },
    { date: "10-05-2026", day: "Sunday",    week: "Week 6",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 6", duration: "-" },

    // ===== WEEK 7 =====
    { date: "11-05-2026", day: "Monday",    week: "Week 7",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Instructions on APAR Maintenance", duration: "1 Day" },
    { date: "12-05-2026", day: "Tuesday",   week: "Week 7",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Welfare Measures (Employees & GDS)", duration: "1 Day" },
    { date: "13-05-2026", day: "Wednesday", week: "Week 7",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Postal Manual Vol II Ch VI, VIII, IX, XII", duration: "1 Day" },
    { date: "14-05-2026", day: "Thursday",  week: "Week 7",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Schedule of Financial Powers", duration: "1 Day" },
    { date: "15-05-2026", day: "Friday",    week: "Week 7",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Instructions on Estt. & Admin", duration: "1 Day" },
    { date: "16-05-2026", day: "Saturday",  week: "Week 7",  paper: "Paper I", topic: "REVISION", subTopic: "Revision of Week 7 Topics", duration: "1 Day" },
    { date: "17-05-2026", day: "Sunday",    week: "Week 7",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 7", duration: "-" },

    // ===== WEEK 8 =====
    { date: "18-05-2026", day: "Monday",    week: "Week 8",  paper: "Paper I", topic: "Estt & Admin", subTopic: "Recruitment Rules for various cadres", duration: "1 Day" },
    { date: "19-05-2026", day: "Tuesday",   week: "Week 8",  paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (Conduct) Rules, 1964", duration: "1 Day" },
    { date: "20-05-2026", day: "Wednesday", week: "Week 8",  paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (CCA) Rules, 1965 (Part 1)", duration: "Day 1 of 2" },
    { date: "21-05-2026", day: "Thursday",  week: "Week 8",  paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (CCA) Rules, 1965 (Part 2)", duration: "Day 2 of 2" },
    { date: "22-05-2026", day: "Friday",    week: "Week 8",  paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (Temporary Service) Rules, 1965", duration: "1 Day" },
    { date: "23-05-2026", day: "Saturday",  week: "Week 8",  paper: "Paper II", topic: "CCS Rules", subTopic: "Brochure on Casual Labourers", duration: "1 Day" },
    { date: "24-05-2026", day: "Sunday",    week: "Week 8",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 8", duration: "-" },

    // ===== WEEK 9 =====
    { date: "25-05-2026", day: "Monday",    week: "Week 9",  paper: "Paper II", topic: "CCS Pension", subTopic: "CCS (Pension) Rules, 2021 (Part 1)", duration: "Day 1 of 2" },
    { date: "26-05-2026", day: "Tuesday",   week: "Week 9",  paper: "Paper II", topic: "CCS Pension", subTopic: "CCS (Pension) Rules, 2021 (Part 2)", duration: "Day 2 of 2" },
    { date: "27-05-2026", day: "Wednesday", week: "Week 9",  paper: "Paper II", topic: "CCS NPS", subTopic: "CCS (Implementation of NPS) Rules, 2021", duration: "1 Day" },
    { date: "28-05-2026", day: "Thursday",  week: "Week 9",  paper: "Paper II", topic: "CCS NPS", subTopic: "CCS (Gratuity under NPS) Rules, 2021", duration: "1 Day" },
    { date: "29-05-2026", day: "Friday",    week: "Week 9",  paper: "Paper II", topic: "CCS Pension", subTopic: "CCS (Commutation of Pension) Rules, 1981", duration: "1 Day" },
    { date: "30-05-2026", day: "Saturday",  week: "Week 9",  paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (Leave) Rules, 1972", duration: "1 Day" },
    { date: "31-05-2026", day: "Sunday",    week: "Week 9",  paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 9", duration: "-" },

    // ===== WEEK 10 =====
    { date: "01-06-2026", day: "Monday",    week: "Week 10", paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (GPF) Rules, 1960", duration: "1 Day" },
    { date: "02-06-2026", day: "Tuesday",   week: "Week 10", paper: "Paper II", topic: "CCS Rules", subTopic: "CS (Medical Attendance) Rules, 1944", duration: "1 Day" },
    { date: "03-06-2026", day: "Wednesday", week: "Week 10", paper: "Paper II", topic: "FR & SR", subTopic: "FR & SR - General Rules (Part 1)", duration: "Day 1 of 2" },
    { date: "04-06-2026", day: "Thursday",  week: "Week 10", paper: "Paper II", topic: "FR & SR", subTopic: "FR & SR - General Rules (Part 2)", duration: "Day 2 of 2" },
    { date: "05-06-2026", day: "Friday",    week: "Week 10", paper: "Paper II", topic: "FR & SR", subTopic: "FR & SR - TA Rules", duration: "1 Day" },
    { date: "06-06-2026", day: "Saturday",  week: "Week 10", paper: "Paper II", topic: "FR & SR", subTopic: "FR & SR - DA, DR & HRA Rules", duration: "1 Day" },
    { date: "07-06-2026", day: "Sunday",    week: "Week 10", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 10", duration: "-" },

    // ===== WEEK 11 =====
    { date: "08-06-2026", day: "Monday",    week: "Week 11", paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (LTC) Rules, 1988", duration: "1 Day" },
    { date: "09-06-2026", day: "Tuesday",   week: "Week 11", paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (Revised Pay) Rules, 2016", duration: "1 Day" },
    { date: "10-06-2026", day: "Wednesday", week: "Week 11", paper: "Paper II", topic: "CCS Rules", subTopic: "CEA & Hostel Subsidy Rules", duration: "1 Day" },
    { date: "11-06-2026", day: "Thursday",  week: "Week 11", paper: "Paper II", topic: "CCS Rules", subTopic: "CGEGIS, 1980", duration: "1 Day" },
    { date: "12-06-2026", day: "Friday",    week: "Week 11", paper: "Paper II", topic: "Postal Manual", subTopic: "Postal Manual Volume III", duration: "1 Day" },
    { date: "13-06-2026", day: "Saturday",  week: "Week 11", paper: "Paper II", topic: "FHB", subTopic: "P&T FHB Vol I (Part 1)", duration: "Day 1 of 2" },
    { date: "14-06-2026", day: "Sunday",    week: "Week 11", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 11", duration: "-" },

    // ===== WEEK 12 =====
    { date: "15-06-2026", day: "Monday",    week: "Week 12", paper: "Paper II", topic: "FHB", subTopic: "P&T FHB Vol I (Part 2)", duration: "Day 2 of 2" },
    { date: "16-06-2026", day: "Tuesday",   week: "Week 12", paper: "Paper II", topic: "FHB", subTopic: "Postal FHB Vol II (Part 1)", duration: "Day 1 of 2" },
    { date: "17-06-2026", day: "Wednesday", week: "Week 12", paper: "Paper II", topic: "FHB", subTopic: "Postal FHB Vol II (Part 2)", duration: "Day 2 of 2" },
    { date: "18-06-2026", day: "Thursday",  week: "Week 12", paper: "Paper II", topic: "Subjects", subTopic: "Interface with IPPB", duration: "1 Day" },
    { date: "19-06-2026", day: "Friday",    week: "Week 12", paper: "Paper II", topic: "Subjects", subTopic: "Preservation of Records", duration: "1 Day" },
    { date: "20-06-2026", day: "Saturday",  week: "Week 12", paper: "Paper II", topic: "Subjects", subTopic: "Swatchh Bharat", duration: "1 Day" },
    { date: "21-06-2026", day: "Sunday",    week: "Week 12", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 12", duration: "-" },

    // ===== WEEK 13 =====
    { date: "22-06-2026", day: "Monday",    week: "Week 13", paper: "Paper II", topic: "GDS Rules", subTopic: "GDS (Conduct & Engagement) Rules, 2020", duration: "1 Day" },
    { date: "23-06-2026", day: "Tuesday",   week: "Week 13", paper: "Paper II", topic: "Law Paper", subTopic: "CAT Act, 1985 & Rules", duration: "1 Day" },
    { date: "24-06-2026", day: "Wednesday", week: "Week 13", paper: "Paper II", topic: "Law Paper", subTopic: "RTI Act, 2005 & Rules 2012", duration: "1 Day" },
    { date: "25-06-2026", day: "Thursday",  week: "Week 13", paper: "Paper II", topic: "Law Paper", subTopic: "Sexual Harassment (POSH) Act, 2013", duration: "1 Day" },
    { date: "26-06-2026", day: "Friday",    week: "Week 13", paper: "Paper II", topic: "Law Paper", subTopic: "Public Accountants Default Act, 1850", duration: "1 Day" },
    { date: "27-06-2026", day: "Saturday",  week: "Week 13", paper: "Paper II", topic: "Law Paper", subTopic: "Revenue Recovery Act, 1890", duration: "1 Day" },
    { date: "28-06-2026", day: "Sunday",    week: "Week 13", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 13", duration: "-" },

    // ===== WEEK 14 =====
    { date: "29-06-2026", day: "Monday",    week: "Week 14", paper: "Paper II", topic: "Law Paper", subTopic: "Prevention of Corruption Act, 1988", duration: "1 Day" },
    { date: "30-06-2026", day: "Tuesday",   week: "Week 14", paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (Joining Time) Rules, 1979", duration: "1 Day" },
    { date: "01-07-2026", day: "Wednesday", week: "Week 14", paper: "Paper II", topic: "CCS Rules", subTopic: "CCS (Recognition of Service Assn) Rules, 1993", duration: "1 Day" },
    { date: "02-07-2026", day: "Thursday",  week: "Week 14", paper: "Paper II", topic: "Postal Manual", subTopic: "Postal Manual Vol II: Ch III, IV, V, VII", duration: "1 Day" },
    { date: "03-07-2026", day: "Friday",    week: "Week 14", paper: "Paper II", topic: "Subjects", subTopic: "Inspection questionnaires", duration: "1 Day" },
    { date: "04-07-2026", day: "Saturday",  week: "Week 14", paper: "Paper II", topic: "Law Paper", subTopic: "Goods and Services Tax (GST) Act, 2017", duration: "1 Day" },
    { date: "05-07-2026", day: "Sunday",    week: "Week 14", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision & Mock Test 14", duration: "-" },
];

// Flexible mode: unique topics grouped by paper
export interface PsgbFlexibleTopic {
    id: string;
    paper: string;
    category: string;
    title: string;
    daysAllotted: number;
}

export const PSGB_FLEXIBLE_TOPICS: PsgbFlexibleTopic[] = [
    // Paper I Topics
    { id: "psgb-p1-01", paper: "Paper I", category: "Acts", title: "Consumer Protection Act, 2019", daysAllotted: 2 },
    { id: "psgb-p1-02", paper: "Paper I", category: "Acts", title: "PMLA Act, 2002", daysAllotted: 2 },
    { id: "psgb-p1-03", paper: "Paper I", category: "Inland/Foreign Post", title: "The Post Office Act, 2023 & Rules 2024", daysAllotted: 1 },
    { id: "psgb-p1-04", paper: "Paper I", category: "Inland/Foreign Post", title: "Book of BO Rules", daysAllotted: 1 },
    { id: "psgb-p1-05", paper: "Paper I", category: "Inland/Foreign Post", title: "The PO Regulations, 2024", daysAllotted: 3 },
    { id: "psgb-p1-06", paper: "Paper I", category: "Inland/Foreign Post", title: "PO Guide Part-I", daysAllotted: 2 },
    { id: "psgb-p1-07", paper: "Paper I", category: "Inland/Foreign Post", title: "PO Guide Part-II", daysAllotted: 1 },
    { id: "psgb-p1-08", paper: "Paper I", category: "Postal Manual", title: "Postal Manual Volume V", daysAllotted: 2 },
    { id: "psgb-p1-09", paper: "Paper I", category: "Postal Manual", title: "Postal Manual Volume II (Org)", daysAllotted: 1 },
    { id: "psgb-p1-10", paper: "Paper I", category: "Mail Operations", title: "MNOP & PNOP Guidelines", daysAllotted: 2 },
    { id: "psgb-p1-11", paper: "Paper I", category: "Saving Bank", title: "GSPR, 2018", daysAllotted: 1 },
    { id: "psgb-p1-12", paper: "Paper I", category: "Saving Bank", title: "PO Small Savings Schemes", daysAllotted: 2 },
    { id: "psgb-p1-13", paper: "Paper I", category: "Saving Bank", title: "POSB (CBS) Manual", daysAllotted: 2 },
    { id: "psgb-p1-14", paper: "Paper I", category: "PLI", title: "PO Life Insurance Scheme, 2011", daysAllotted: 2 },
    { id: "psgb-p1-15", paper: "Paper I", category: "Organization", title: "Citizen Charter of DoP", daysAllotted: 1 },
    { id: "psgb-p1-16", paper: "Paper I", category: "Organization", title: "Complaint & Grievance Handling", daysAllotted: 1 },
    { id: "psgb-p1-17", paper: "Paper I", category: "Office Procedure", title: "Postal Manual Vol II - Ch XI (Misc)", daysAllotted: 1 },
    { id: "psgb-p1-18", paper: "Paper I", category: "Office Procedure", title: "Manual of Office Procedure", daysAllotted: 2 },
    { id: "psgb-p1-19", paper: "Paper I", category: "Office Procedure", title: "Annual Reports & Book of Info", daysAllotted: 1 },
    { id: "psgb-p1-20", paper: "Paper I", category: "Material Mgmt", title: "Manual on Public Procurement", daysAllotted: 1 },
    { id: "psgb-p1-21", paper: "Paper I", category: "Material Mgmt", title: "CVC guidelines on Public procurement", daysAllotted: 1 },
    { id: "psgb-p1-22", paper: "Paper I", category: "Material Mgmt", title: "GFR 2017 (Other than Procurement)", daysAllotted: 2 },
    { id: "psgb-p1-23", paper: "Paper I", category: "Estt & Admin", title: "Postal Manual Volume IV", daysAllotted: 2 },
    { id: "psgb-p1-24", paper: "Paper I", category: "Estt & Admin", title: "Instructions on APAR Maintenance", daysAllotted: 1 },
    { id: "psgb-p1-25", paper: "Paper I", category: "Estt & Admin", title: "Welfare Measures (Employees & GDS)", daysAllotted: 1 },
    { id: "psgb-p1-26", paper: "Paper I", category: "Estt & Admin", title: "Postal Manual Vol II Ch VI, VIII, IX, XII", daysAllotted: 1 },
    { id: "psgb-p1-27", paper: "Paper I", category: "Estt & Admin", title: "Schedule of Financial Powers", daysAllotted: 1 },
    { id: "psgb-p1-28", paper: "Paper I", category: "Estt & Admin", title: "Instructions on Estt. & Admin", daysAllotted: 1 },

    { id: "psgb-p1-30", paper: "Paper I", category: "Estt & Admin", title: "Recruitment Rules for various cadres", daysAllotted: 1 },
    { id: "psgb-p1-31", paper: "Paper I", category: "Estt & Admin", title: "Establishment Norms", daysAllotted: 1 },

    // Paper II Topics
    { id: "psgb-p2-01", paper: "Paper II", category: "CCS Rules", title: "CCS (Conduct) Rules, 1964", daysAllotted: 1 },
    { id: "psgb-p2-02", paper: "Paper II", category: "CCS Rules", title: "CCS (CCA) Rules, 1965", daysAllotted: 2 },
    { id: "psgb-p2-03", paper: "Paper II", category: "CCS Rules", title: "CCS (Temporary Service) Rules, 1965", daysAllotted: 1 },
    { id: "psgb-p2-04", paper: "Paper II", category: "CCS Rules", title: "Brochure on Casual Labourers", daysAllotted: 1 },
    { id: "psgb-p2-05", paper: "Paper II", category: "CCS Pension", title: "CCS (Pension) Rules, 2021", daysAllotted: 2 },
    { id: "psgb-p2-06", paper: "Paper II", category: "CCS NPS", title: "CCS (Implementation of NPS) Rules, 2021", daysAllotted: 1 },
    { id: "psgb-p2-07", paper: "Paper II", category: "CCS NPS", title: "CCS (Gratuity under NPS) Rules, 2021", daysAllotted: 1 },
    { id: "psgb-p2-08", paper: "Paper II", category: "CCS Pension", title: "CCS (Commutation of Pension) Rules, 1981", daysAllotted: 1 },
    { id: "psgb-p2-09", paper: "Paper II", category: "CCS Rules", title: "CCS (Leave) Rules, 1972", daysAllotted: 1 },
    { id: "psgb-p2-10", paper: "Paper II", category: "CCS Rules", title: "CCS (GPF) Rules, 1960", daysAllotted: 1 },
    { id: "psgb-p2-11", paper: "Paper II", category: "CCS Rules", title: "CS (Medical Attendance) Rules, 1944", daysAllotted: 1 },
    { id: "psgb-p2-12", paper: "Paper II", category: "FR & SR", title: "FR & SR - General Rules", daysAllotted: 2 },
    { id: "psgb-p2-13", paper: "Paper II", category: "FR & SR", title: "FR & SR - TA Rules", daysAllotted: 1 },
    { id: "psgb-p2-14", paper: "Paper II", category: "FR & SR", title: "FR & SR - DA, DR & HRA Rules", daysAllotted: 1 },
    { id: "psgb-p2-15", paper: "Paper II", category: "CCS Rules", title: "CCS (LTC) Rules, 1988", daysAllotted: 1 },
    { id: "psgb-p2-16", paper: "Paper II", category: "CCS Rules", title: "CCS (Revised Pay) Rules, 2016", daysAllotted: 1 },
    { id: "psgb-p2-17", paper: "Paper II", category: "CCS Rules", title: "CEA & Hostel Subsidy Rules", daysAllotted: 1 },
    { id: "psgb-p2-18", paper: "Paper II", category: "CCS Rules", title: "CGEGIS, 1980", daysAllotted: 1 },
    { id: "psgb-p2-19", paper: "Paper II", category: "CCS Rules", title: "CCS (Joining Time) Rules, 1979", daysAllotted: 1 },
    { id: "psgb-p2-20", paper: "Paper II", category: "CCS Rules", title: "CCS (Recognition of Service Assn) Rules, 1993", daysAllotted: 1 },
    { id: "psgb-p2-21", paper: "Paper II", category: "Postal Manual", title: "Postal Manual Volume III", daysAllotted: 1 },
    { id: "psgb-p2-22", paper: "Paper II", category: "Postal Manual", title: "Postal Manual Vol II: Ch III, IV, V, VII", daysAllotted: 1 },
    { id: "psgb-p2-23", paper: "Paper II", category: "FHB", title: "P&T FHB Vol I", daysAllotted: 2 },
    { id: "psgb-p2-24", paper: "Paper II", category: "FHB", title: "Postal FHB Vol II", daysAllotted: 2 },
    { id: "psgb-p2-25", paper: "Paper II", category: "Subjects", title: "GFR 2017 (Other than Procurement)", daysAllotted: 1 },
    { id: "psgb-p2-26", paper: "Paper II", category: "Subjects", title: "Interface with IPPB", daysAllotted: 1 },
    { id: "psgb-p2-27", paper: "Paper II", category: "Subjects", title: "Preservation of Records", daysAllotted: 1 },
    { id: "psgb-p2-28", paper: "Paper II", category: "Subjects", title: "Swatchh Bharat", daysAllotted: 1 },
    { id: "psgb-p2-29", paper: "Paper II", category: "Subjects", title: "Inspection questionnaires", daysAllotted: 1 },
    { id: "psgb-p2-30", paper: "Paper II", category: "GDS Rules", title: "GDS (Conduct & Engagement) Rules, 2020", daysAllotted: 1 },
    { id: "psgb-p2-31", paper: "Paper II", category: "Law Paper", title: "CAT Act, 1985 & Rules", daysAllotted: 1 },
    { id: "psgb-p2-32", paper: "Paper II", category: "Law Paper", title: "RTI Act, 2005 & Rules 2012", daysAllotted: 1 },
    { id: "psgb-p2-33", paper: "Paper II", category: "Law Paper", title: "Sexual Harassment (POSH) Act, 2013", daysAllotted: 1 },
    { id: "psgb-p2-34", paper: "Paper II", category: "Law Paper", title: "Public Accountants Default Act, 1850", daysAllotted: 1 },
    { id: "psgb-p2-35", paper: "Paper II", category: "Law Paper", title: "Revenue Recovery Act, 1890", daysAllotted: 1 },
    { id: "psgb-p2-36", paper: "Paper II", category: "Law Paper", title: "Prevention of Corruption Act, 1988", daysAllotted: 1 },
    { id: "psgb-p2-37", paper: "Paper II", category: "Law Paper", title: "Goods and Services Tax (GST) Act, 2017", daysAllotted: 1 },
];

// Mapping: flexible topic ID → all corresponding dates in the recommended schedule
// A recommended entry matches a flexible topic if same paper and subTopic equals or starts with the flexible title
export const FLEX_TO_RECOMMENDED_MAP: Record<string, string[]> = (() => {
    const map: Record<string, string[]> = {};
    PSGB_FLEXIBLE_TOPICS.forEach(flexTopic => {
        map[flexTopic.id] = PSGB_FULL_SCHEDULE
            .filter(item => {
                if (item.paper === 'Revision' || item.paper === 'End') return false;
                if (item.paper !== flexTopic.paper) return false;
                return (
                    item.subTopic === flexTopic.title ||
                    item.subTopic.startsWith(flexTopic.title + ' (')
                );
            })
            .map(item => item.date);
    });
    return map;
})();

// Reverse mapping: recommended schedule date → flexible topic ID
export const RECOMMENDED_TO_FLEX_MAP: Record<string, string> = (() => {
    const map: Record<string, string> = {};
    Object.entries(FLEX_TO_RECOMMENDED_MAP).forEach(([topicId, dates]) => {
        dates.forEach(date => { map[date] = topicId; });
    });
    return map;
})();
