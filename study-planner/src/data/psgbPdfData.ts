export interface Note {
    title: string;
    description: string;
    filename?: string;
    path?: string;
    size?: string;
    color: string;
    comingSoon?: boolean;
    subtitle?: string;
    isFree?: boolean;
    topic?: string;
}

export const PSGB_PDF_DATA: Record<string, Note[]> = {
    "Paper I": [
        {
            "title": "Consumer Protection Act, 2019",
            "description": "Consumer Protection Act, 2019",
            "filename": "Consumer_Protection_Act_2019.pdf",
            "path": "/notes/paper-1/Consumer_Protection_Act_2019.pdf",
            "size": "4.4 MB",
            "color": "blue",
            "isFree": true,
            "topic": "Acts"
        },
        {
            "title": "PMLA Act, 2002",
            "description": "Prevention of Money Laundering Act, 2002",
            "filename": "PMLA_2002.pdf",
            "path": "/notes/paper-1/PMLA_2002.pdf",
            "size": "0.3 MB",
            "color": "purple",
            "topic": "Acts"
        },
        {
            "title": "The Post Office Act, 2023",
            "description": "The Post Office Act, 2023 & The Post Office Rules, 2024",
            "filename": "PO_Act_2023_Rules_2024.pdf",
            "path": "/notes/paper-1/PO_Act_2023_Rules_2024.pdf",
            "size": "8.7 MB",
            "color": "blue",
            "topic": "Acts"
        },
        {
            "title": "The PO Regulations, 2024",
            "description": "The Post Office Regulations, 2024",
            "filename": "PO_Regulations_2024.pdf",
            "path": "/notes/paper-1/PO_Regulations_2024.pdf",
            "size": "0.9 MB",
            "color": "emerald",
            "isFree": true,
            "topic": "Rules"
        },
        {
            "title": "Post Office Guide Part-I",
            "description": "Post Office Guide Part I",
            "filename": "PO_Guide_Part_I.pdf",
            "path": "/notes/paper-1/PO_Guide_Part_I.pdf",
            "size": "0.4 MB",
            "color": "cyan",
            "topic": "Postal Manuals"
        },
        {
            "title": "Post Office Guide Part-II",
            "description": "Post Office Guide Part II",
            "filename": "PO Guide Part - II.pdf",
            "path": "/notes/paper-1/PO Guide Part - II.pdf",
            "size": "0.5 MB",
            "color": "cyan",
            "topic": "Postal Manuals"
        },
        {
            "title": "Book of BO Rules",
            "description": "Book of BO Rules",
            "filename": "Book_of_BO_Rules.pdf",
            "path": "/notes/paper-1/Book_of_BO_Rules.pdf",
            "size": "0.6 MB",
            "color": "amber",
            "topic": "Postal Manuals"
        },
        {
            "title": "Postal Manual Volume V",
            "description": "Postal Manual Volume V",
            "filename": "Postal_Manual_Vol_V.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_V.pdf",
            "size": "0.7 MB",
            "color": "amber",
            "topic": "Postal Manuals"
        },
        {
            "title": "Postal Manual Volume II",
            "description": "Revised comprehensive notes covering Organization and General Regulations.",
            "filename": "Postal_Manual_Vol_II.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_II.pdf",
            "size": "4.2 MB",
            "color": "amber",
            "topic": "Postal Manuals"
        },
        {
            "title": "MNOP & PNOP Guidelines",
            "description": "Guidelines issued by Directorate from time to time on Mail Network optimization Project/PNOP / Business Development",
            "filename": "MNOP_PNOP.pdf",
            "path": "/notes/paper-1/MNOP_PNOP.pdf",
            "size": "0.7 MB",
            "color": "fuchsia",
            "topic": "Operations"
        },

        {
            "title": "Government Savings Promotion Rules, 2018",
            "description": "Government Savings Promotion General Rules, 2018",
            "filename": "Government Savings Promotion Rules, 2018 FINAL.pdf",
            "path": "/notes/paper-1/Government Savings Promotion Rules, 2018 FINAL.pdf",
            "size": "0.7 MB",
            "color": "emerald",
            "topic": "Rules"
        },
        {
            "title": "PO Small Savings Schemes",
            "description": "Comprehensive notes on Small Savings Schemes including practice questions.",
            "filename": "PO_Small_Savings_Schemes.pdf",
            "path": "/notes/paper-1/PO_Small_Savings_Schemes.pdf",
            "size": "4.3 MB",
            "color": "emerald",
            "topic": "Savings & Insurance"
        },
        {
            "title": "POSB (CBS) Manual",
            "description": "Post Office Saving Bank (CBS) Manual",
            "filename": "POSB_CBS_MANUAL.pdf",
            "path": "/notes/paper-1/POSB_CBS_MANUAL.pdf",
            "size": "0.5 MB",
            "color": "teal",
            "topic": "Savings & Insurance"
        },
        {
            "title": "Post Office Life Insurance Scheme, 2011",
            "description": "Post Office Life Insurance Rules, 2011",
            "filename": "poli-rules-2011.pdf",
            "path": "/notes/paper-1/poli-rules-2011.pdf",
            "size": "0.4 MB",
            "color": "rose",
            "topic": "Savings & Insurance"
        },
        {
            "title": "Citizen Charter of Department of Posts.",
            "description": "Citizen Charter of Department of Posts",
            "filename": "Citizen_Charter_Department_of_Posts.pdf",
            "path": "/notes/paper-1/Citizen_Charter_Department_of_Posts.pdf",
            "size": "0.6 MB",
            "color": "sky",
            "topic": "Reports & Misc"
        },
        {
            "title": "Guidelines and instructions on complaint grievances handling in Department of Posts.",
            "description": "Complaint & Grievance Handling in Department of Posts",
            "filename": "Complaint_Grievance_Handling.pdf",
            "path": "/notes/paper-1/Complaint_Grievance_Handling.pdf",
            "size": "0.6 MB",
            "color": "indigo",
            "topic": "Reports & Misc"
        },
        {
            "title": "Handbook on Philately",
            "description": "Comprehensive guide on Philately services and products.",
            "filename": "Handbook_on_Philately.pdf",
            "path": "/notes/paper-1/Handbook_on_Philately.pdf",
            "size": "0.6 MB",
            "color": "emerald",
            "topic": "Reports & Misc"
        },

        {
            "title": "Postal Manual Volume II - Chapter XI - Misc. Rules",
            "description": "Postal Manual Volume II - Chapter XI - Miscellaneous Rules",
            "filename": "Postal_Manual_Vol_II_Chapter_XI.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_II_Chapter_XI.pdf",
            "size": "4.6 MB",
            "color": "violet",
            "topic": "Postal Manuals"
        },
        {
            "title": "Manual of Office Procedure",
            "description": "Manual of Office Procedure",
            "filename": "Manual_of_Office_Procedure.pdf",
            "path": "/notes/paper-1/Manual_of_Office_Procedure.pdf",
            "size": "4.7 MB",
            "color": "slate",
            "topic": "Reports & Misc"
        },
        {
            "title": "Annual Reports and Book of Information of D/o Posts",
            "description": "Department of Posts annual data.",
            "filename": "Annual_Report_and_Book_of_Information.pdf",
            "path": "/notes/paper-1/Annual_Report_and_Book_of_Information.pdf",
            "size": "4.5 MB",
            "color": "sky",
            "topic": "Reports & Misc"
        },
        {
            "title": "Postal Manual Volume II Chapter VI (Stock), VIII (Printing), IX(Contracts), XII (Budget Estimates and control)",
            "description": "Comprehensive notes covering Stock, Printing, Contracts, and Budget Estimates (control).",
            "filename": "Postal_Manual_Vol_II_Chapters.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_II_Chapters.pdf",
            "size": "0.7 MB",
            "color": "indigo",
            "topic": "Postal Manuals"
        },
        {
            "title": "Chapter 6 of General Financial Rules, 2017",
            "description": "Chapter 6 of GFR 2017",
            "filename": "General_Financial_Rules_2017.pdf",
            "path": "/notes/paper-3/General_Financial_Rules_2017.pdf",
            "size": "4.2 MB",
            "color": "gray",
            "topic": "Financial & Procurement"
        },
        {
            "title": "CVC guidelines on Public procurement, guide-lines and instructions on e-procurement.",
            "description": "Central Vigilance Commission (CVC) guidelines on public procurement and e-procurement.",
            "filename": "CVC_Guidelines_Public_Procurement.pdf",
            "path": "/notes/paper-1/CVC_Guidelines_Public_Procurement.pdf",
            "size": "4.2 MB",
            "color": "emerald",
            "topic": "Financial & Procurement"
        },
        {
            "title": "Manual for Procurement of Goods & Services",
            "description": "Procurement Manual Part I, II & III",
            "filename": "Manual_Procurement_Goods_Services.pdf",
            "path": "/notes/paper-1/Manual_Procurement_Goods_Services.pdf",
            "size": "4.3 MB",
            "color": "purple",
            "topic": "Financial & Procurement"
        },
        {
            "title": "Postal Manual Volume IV",
            "description": "Postal Manual Volume IV.",
            "filename": "Postal_Manual_Vol_IV.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_IV.pdf",
            "size": "4.1 MB",
            "color": "amber",
            "topic": "Postal Manuals"
        },
        {
            "title": "Instructions issued by Directorate and DoP&T on maintenance of APAR.",
            "description": "Instructions on Maintenance of Annual Performance Assessment Report (APAR)",
            "filename": "Instructions_Maintenance_APAR.pdf",
            "path": "/notes/paper-1/Instructions_Maintenance_APAR.pdf",
            "size": "0.6 MB",
            "color": "violet",
            "topic": "Reports & Misc"
        },
        {
            "title": "Schedule of Financial Powers of Divisional Heads, Head of the Circle, etc.",
            "description": "Financial Powers of Divisional Heads and Head of Circle.",
            "filename": "Schedule_of_Financial_Powers.pdf",
            "path": "/notes/paper-3/Schedule_of_Financial_Powers.pdf",
            "size": "4.7 MB",
            "color": "slate",
            "topic": "Financial & Procurement"
        },
        {
            "title": "Welfare Measures",
            "description": "Welfare measures available to Departmental Employees and Gramin Dak Sevak of DoP.",
            "filename": "Welfare_Measures_Employees_GDS.pdf",
            "path": "/notes/paper-3/Welfare_Measures_Employees_GDS.pdf",
            "size": "0.5 MB",
            "color": "green",
            "topic": "Reports & Misc"
        },
        {
            "title": "DoP&T instructions issued from time to time on Establishment and administration.",
            "description": "Instructions on Establishment and administration issued by DoP&T from time to time.",
            "filename": "DoPT_Instructions.pdf",
            "path": "/notes/paper-1/DoPT_Instructions.pdf",
            "size": "4.2 MB",
            "color": "sky",
            "topic": "Reports & Misc"
        },

        {
            "title": "Recruitment Rules relating to various cadres in D/o Posts",
            "description": "Comprehensive notes covering the Recruitment Rules relating to various cadres in D/o Posts.",
            "filename": "RR_DoP_Cadres_Corrected.pdf",
            "path": "/notes/paper-1/RR_DoP_Cadres_Corrected.pdf",
            "size": "0.8 MB",
            "color": "gray",
            "topic": "Reports & Misc"
        },
        {
            "title": "Establishment Norms",
            "description": "Establishment Norms",
            "filename": "Establishment_Norms.pdf",
            "path": "/notes/paper-1/Establishment_Norms.pdf",
            "size": "4.4 MB",
            "color": "emerald",
            "topic": "Reports & Misc"
        },
        {
            "title": "Brochure on Reservation, Sports Person Reservation & Compassionate Appointment",
            "description": "Brochure on Reservation, Instructions Regarding Sports Person Reservation, and Compassionate Appointment Guidelines Issued by Department of Posts and DoP&T.",
            "filename": "Reservation_Sports_Compassionate_Guidelines.pdf",
            "path": "/notes/paper-1/Reservation_Sports_Compassionate_Guidelines.pdf",
            "size": "0.8 MB",
            "color": "rose",
            "topic": "CCS Rules & Establishment"
        },
    ],
    "Paper II": [
        {
            "title": "CCS (Conduct) Rules, 1964",
            "description": "Central Civil Services (Conduct) Rules, 1964",
            "filename": "CCS_Conduct_Rules_1965.pdf",
            "path": "/notes/paper-1/CCS_Conduct_Rules_1965.pdf",
            "size": "4.5 MB",
            "color": "red",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (CCA) Rules, 1965",
            "description": "Central Civil Services (Classification, Control and Appeal) Rules, 1965",
            "filename": "CCS_CCA_Rules_1965.pdf",
            "path": "/notes/paper-1/CCS_CCA_Rules_1965.pdf",
            "size": "0.8 MB",
            "color": "red",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (Temporary Service) Rules, 1965",
            "description": "Central Civil Services (Temporary Service Rules), 1965",
            "filename": "CCS_Temporary_Services_Rules_1965.pdf",
            "path": "/notes/paper-1/CCS_Temporary_Services_Rules_1965.pdf",
            "size": "0.2 MB",
            "color": "red",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Brochure on Casual Labourers",
            "description": "Brochure on Casual labourer",
            "filename": "Brochure_Casual_Labourers.pdf",
            "path": "/notes/paper-3/Brochure_Casual_Labourers.pdf",
            "size": "0.6 MB",
            "color": "amber",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (Pension) Rules, 2021",
            "description": "CCS (Pension) Rules, 2021",
            "filename": "CCS_Pension_Rules_2021.pdf",
            "path": "/notes/paper-3/CCS_Pension_Rules_2021.pdf",
            "size": "0.8 MB",
            "color": "teal",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (Implementation of NPS) Rules, 2021",
            "description": "National Pension System implementation.",
            "filename": "CCS_Implementation_of_NPS_Rules_2021.pdf",
            "path": "/notes/paper-3/CCS_Implementation_of_NPS_Rules_2021.pdf",
            "size": "0.7 MB",
            "color": "emerald",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (Payment of Gratuity under NPS) Rules, 2021",
            "description": "Gratuity rules for NPS employees.",
            "filename": "CCS_Payment_of_Gratuity_under_NPS_Rules_2021.pdf",
            "path": "/notes/paper-3/CCS_Payment_of_Gratuity_under_NPS_Rules_2021.pdf",
            "size": "0.7 MB",
            "color": "emerald",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (Commutation of Pension) Rules, 1981",
            "description": "Central Civil Services (Commutation of Pension) Rules, 1981",
            "filename": "CCS (Commutation of Pension) Rules, 1981.pdf",
            "path": "/notes/paper-3/CCS (Commutation of Pension) Rules, 1981.pdf",
            "size": "0.5 MB",
            "color": "teal",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (Leave) Rules, 1972",
            "description": "Central Civil Services (Leave) Rules, 1972",
            "filename": "CCS_Leave_Rules_1972.pdf",
            "path": "/notes/paper-3/CCS_Leave_Rules_1972.pdf",
            "size": "0.3 MB",
            "color": "teal",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Central Civil Services (Joining Time) Rules, 1979",
            "description": "Rules governing joining time on transfer, etc.",
            "filename": "CCS Joining Time Rules.pdf",
            "path": "/notes/paper-2/CCS Joining Time Rules.pdf",
            "size": "4.1 MB",
            "color": "sky",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "CCS (GPF) Rules, 1960",
            "description": "General Provident Fund (Central Service) Rules, 1960",
            "filename": "CCS_GPF_Rules_1960.pdf",
            "path": "/notes/paper-3/CCS_GPF_Rules_1960.pdf",
            "size": "0.8 MB",
            "color": "teal",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Central Services (Medical Attendance) Rules, 1944",
            "description": "Central Services (Medical Attendance) Rules, 1944",
            "filename": "CS_Medical_Attendance_Rules_1944.pdf",
            "path": "/notes/paper-3/CS_Medical_Attendance_Rules_1944.pdf",
            "size": "4.3 MB",
            "color": "indigo",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "FR & SR - General Rules",
            "description": "Fundamental Rules (FR) and Supplementary Rules (SR) - General Rules.",
            "filename": "FR_SR_General_Rules.pdf",
            "path": "/notes/paper-3/FR_SR_General_Rules.pdf",
            "size": "4.4 MB",
            "color": "indigo",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "FR & SR - TA Rules",
            "description": "FR & SR - Traveling Allowance (TA) Rules.",
            "filename": "FR_SR_TA_Rules.pdf",
            "path": "/notes/paper-3/FR_SR_TA_Rules.pdf",
            "size": "4.4 MB",
            "color": "indigo",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "FR & SR - DA, DR & HRA Rules",
            "description": "FR & SR - Dearness Allowance (DA), Dearness Relief (DR) and House Rent Allowance (HRA) Rules.",
            "filename": "FR_SR_DA_DR_HRA.pdf",
            "path": "/notes/paper-3/FR_SR_DA_DR_HRA.pdf",
            "size": "4.1 MB",
            "color": "indigo",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Central Civil Services (Leave Travel Concession) Rules, 1988",
            "description": "Central Civil Services (Leave Travel Concession) Rules, 1988",
            "filename": "CCS LTC Rules.pdf",
            "path": "/notes/paper-2/CCS LTC Rules.pdf",
            "size": "0.5 MB",
            "color": "emerald",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Central Civil Services (Revised Pay) Rules, 2016",
            "description": "7th CPC Central Civil Services (Revised Pay) Rules, 2016.",
            "filename": "CCS_RP_Rules_2016.pdf",
            "path": "/notes/paper-3/CCS_RP_Rules_2016.pdf",
            "size": "4.1 MB",
            "color": "blue",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Rules relating to Children Education allowance and reimbursement of Hostel Subsidy",
            "description": "Rules relating to Children Education allowance and reimbursement of Hostel Subsidy",
            "filename": "CEA_and_Hostel_Subsidy.pdf",
            "path": "/notes/paper-3/CEA_and_Hostel_Subsidy.pdf",
            "size": "4.1 MB",
            "color": "violet",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Central Government Employees Group Insurance Scheme, 1980",
            "description": "Central Government Employees Group Insurance Scheme, 1980",
            "filename": "CGEGIS_1980.pdf",
            "path": "/notes/paper-2/CGEGIS_1980.pdf",
            "size": "0.3 MB",
            "color": "slate",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Central Civil Services (Recognition of Service Association) Rules, 1993",
            "description": "Rules for recognition of service associations of central government employees.",
            "filename": "CCS RSA Rules.pdf",
            "path": "/notes/paper-2/CCS RSA Rules.pdf",
            "size": "0.5 MB",
            "color": "sky",
            "topic": "CCS Rules & Establishment"
        },
        {
            "title": "Postal Manual Volume III",
            "description": "Postal Manual Volume III",
            "filename": "Postal_Manual_Vol_III.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_III.pdf",
            "size": "4.2 MB",
            "color": "amber",
            "topic": "Postal Manuals"
        },
        {
            "title": "Postal Manual Volume II: Chapter III - Appeals and Petitions, Chapter IV-Personal matters, Chapter V-Security Deposits, Chapter VII - Forged counterfeit stamps and defaced postage stamps, coins and currency notes.",
            "description": "Comprehensive notes covering Chapters III to VII of Postal Manual Vol II.",
            "filename": "Postal_Manual_Vol_II_Personal_Matters.pdf",
            "path": "/notes/paper-3/Postal_Manual_Vol_II_Personal_Matters.pdf",
            "size": "4.6 MB",
            "color": "indigo",
            "topic": "Postal Manuals"
        },
        {
            "title": "P&T FHB Vol I",
            "description": "P&T Financial Hand Book Volume I.",
            "filename": "FHB_Vol_I.pdf",
            "path": "/notes/paper-3/FHB_Vol_I.pdf",
            "size": "0.9 MB",
            "color": "violet",
            "topic": "Financial & Procurement"
        },
        {
            "title": "Postal FHB Vol II",
            "description": "Postal Financial Hand Book Volume II.",
            "filename": "FHB_Vol_II.pdf",
            "path": "/notes/paper-3/FHB_Vol_II.pdf",
            "size": "0.8 MB",
            "color": "violet",
            "topic": "Financial & Procurement"
        },
        {
            "title": "General Financial Rules 2017 other than public procurement",
            "description": "General Financial Rules 2017 other than public procurement",
            "filename": "GFR_2017_Other_than_Procurement_PSGB_Paper_II_Notes.pdf",
            "path": "/notes/paper-2/GFR_2017_Other_than_Procurement_PSGB_Paper_II_Notes.pdf",
            "size": "0.6 MB",
            "color": "gray",
            "topic": "Financial & Procurement"
        },
        {
            "title": "Interface with India Post Payments Bank",
            "description": "Interface with India Post Payments Bank",
            "filename": "India_Post_Payments_Bank.pdf",
            "path": "/notes/paper-1/India_Post_Payments_Bank.pdf",
            "size": "0.8 MB",
            "color": "emerald",
            "topic": "Savings & Insurance"
        },
        {
            "title": "Preservation of Records",
            "description": "Disposal and preservation of postal records.",
            "filename": "Preservation_Period_of_Records.pdf",
            "path": "/notes/paper-1/Preservation_Period_of_Records.pdf",
            "size": "0.5 MB",
            "color": "gray",
            "topic": "Reports & Misc"
        },
        {
            "title": "Swatchh Bharat",
            "description": "Swatchh Bharat",
            "filename": "Swatchh_Bharat.pdf",
            "path": "/notes/paper-3/Swatchh_Bharat.pdf",
            "size": "0.5 MB",
            "color": "violet",
            "topic": "Reports & Misc"
        },
        {
            "title": "Inspection Questionnaires",
            "description": "Inspection Questionnaires for various offices of India Post.",
            "filename": "Inspection Questionnaires.pdf",
            "path": "/notes/paper-2/Inspection Questionnaires.pdf",
            "size": "4.2 MB",
            "color": "slate",
            "topic": "Operations"
        },
        {
            "title": "GDS (Conduct & Engagement) Rules, 2020",
            "description": "Rules related to Gramin Dak Sevaks.",
            "filename": "GDS_CE_Rules_2020.pdf",
            "path": "/notes/paper-1/GDS_CE_Rules_2020.pdf",
            "size": "0.8 MB",
            "color": "red",
            "topic": "Rules"
        },
        {
            "title": "Central Administrative Tribunal Act, 1985",
            "description": "Central Administrative Tribunal Act, 1985 and its Rules",
            "filename": "CENTRAL_ADMINISTRATIVE_TRIBUNALS_ACT_1985.pdf",
            "path": "/notes/paper-3/CENTRAL_ADMINISTRATIVE_TRIBUNALS_ACT_1985.pdf",
            "size": "0.6 MB",
            "color": "indigo",
            "topic": "Constitution & Laws"
        },
        {
            "title": "RTI Act, 2005 and RTI Rules, 2012",
            "description": "Right to Information Act 2005 and RTI Rules 2012",
            "filename": "RTI_Act_2005_and_RTI_Rules_2012.pdf",
            "path": "/notes/paper-3/RTI_Act_2005_and_RTI_Rules_2012.pdf",
            "size": "0.7 MB",
            "color": "cyan",
            "topic": "Constitution & Laws"
        },
        {
            "title": "Sexual Harassment of Women at Workplace Act, 2013",
            "description": "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
            "filename": "POSH_Rules_2013.pdf",
            "path": "/notes/paper-3/POSH_Rules_2013.pdf",
            "size": "0.2 MB",
            "color": "pink",
            "topic": "Constitution & Laws"
        },
        {
            "title": "Public Accountants Default Act, 1850",
            "description": "Public Accountants Default Act, 1850",
            "filename": "Public_Accountants_Default_Act_1850.pdf",
            "path": "/notes/paper-3/Public_Accountants_Default_Act_1850.pdf",
            "size": "0.3 MB",
            "color": "indigo",
            "topic": "Constitution & Laws"
        },
        {
            "title": "Revenue Recovery Act, 1890",
            "description": "Revenue Recovery Act, 1890",
            "filename": "Revenue_Recovery_Act_1890.pdf",
            "path": "/notes/paper-3/Revenue_Recovery_Act_1890.pdf",
            "size": "0.4 MB",
            "color": "blue",
            "topic": "Constitution & Laws"
        },
        {
            "title": "Prevention of Corruption Act, 1988",
            "description": "Prevention of Corruption Act, 1988 read with its (Amendment) Act, 2018",
            "filename": "Prevention_of_Corruption_Act_1988.pdf",
            "path": "/notes/paper-3/Prevention_of_Corruption_Act_1988.pdf",
            "size": "0.6 MB",
            "color": "red",
            "topic": "Constitution & Laws"
        },
        {
            "title": "Goods and Services Tax (GST) Act, 2017 (Brief Notes)",
            "description": "Brief notes for quick revision of Goods and Services Tax (GST) Act, 2017.",
            "filename": "GST_Act_2017_Brief_Notes.pdf",
            "path": "/notes/paper-2/GST_Act_2017_Brief_Notes.pdf",
            "size": "0.8 MB",
            "color": "amber",
            "topic": "Acts"
        }
    ]
};
