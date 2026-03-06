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
}

export const PSGB_PDF_DATA: Record<string, Note[]> = {
    "Paper I": [
        {
            "title": "Consumer Protection Act, 2019",
            "description": "Consumer Protection Act, 2019",
            "filename": "Consumer_Protection_Act_2019.pdf",
            "path": "/notes/paper-1/Consumer_Protection_Act_2019.pdf",
            "size": "0.7 MB",
            "color": "blue",
            "isFree": true
        },
        {
            "title": "PMLA Act, 2002",
            "description": "Prevention of Money Laundering Act, 2002",
            "filename": "PMLA_2002.pdf",
            "path": "/notes/paper-1/PMLA_2002.pdf",
            "size": "0.3 MB",
            "color": "purple"
        },
        {
            "title": "The Post Office Act, 2023",
            "description": "The Post Office Act, 2023 & The Post Office Rules, 2024",
            "filename": "PO_Act_2023_Rules_2024.pdf",
            "path": "/notes/paper-1/PO_Act_2023_Rules_2024.pdf",
            "size": "8.7 MB",
            "color": "blue"
        },
        {
            "title": "The PO Regulations, 2024",
            "description": "The Post Office Regulations, 2024",
            "filename": "PO_Regulations_2024.pdf",
            "path": "/notes/paper-1/PO_Regulations_2024.pdf",
            "size": "0.9 MB",
            "color": "emerald",
            "isFree": true
        },
        {
            "title": "Post Office Guide Part-I",
            "description": "Post Office Guide Part I",
            "filename": "PO_Guide_Part_I.pdf",
            "path": "/notes/paper-1/PO_Guide_Part_I.pdf",
            "size": "0.4 MB",
            "color": "cyan"
        },
        {
            "title": "Post Office Guide Part-II",
            "description": "Post Office Guide Part II",
            "filename": "PO Guide Part - II.pdf",
            "path": "/notes/paper-1/PO Guide Part - II.pdf",
            "size": "0.5 MB",
            "color": "cyan"
        },
        {
            "title": "Domestic/Foreign Post guidelines issued by Directorate",
            "description": "Materials will be uploaded soon.",
            "color": "slate",
            "comingSoon": true
        },
        {
            "title": "Book of BO Rules",
            "description": "Book of BO Rules",
            "filename": "Book_of_BO_Rules.pdf",
            "path": "/notes/paper-1/Book_of_BO_Rules.pdf",
            "size": "0.6 MB",
            "color": "amber"
        },
        {
            "title": "Postal Manual Volume V",
            "description": "Postal Manual Volume V",
            "filename": "Postal_Manual_Vol_V.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_V.pdf",
            "size": "0.7 MB",
            "color": "amber"
        },
        {
            "title": "Postal Manual Volume II",
            "description": "Postal Manual Volume II (Chapter-I-organization)",
            "filename": "Postal_Manual_Vol_II.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_II.pdf",
            "size": "0.8 MB",
            "color": "amber"
        },
        {
            "title": "MNOP & PNOP Guidelines",
            "description": "Guidelines issued by Directorate from time to time on Mail Network optimization Project/PNOP / Business Development",
            "filename": "MNOP_PNOP.pdf",
            "path": "/notes/paper-1/MNOP_PNOP.pdf",
            "size": "0.7 MB",
            "color": "fuchsia"
        },
        {
            "title": "Guidelines issued by Directorate on eMO, iMO, IMTS and IFS MO",
            "description": "Materials will be uploaded soon.",
            "color": "sky",
            "comingSoon": true
        },
        {
            "title": "Government Savings Promotion Rules, 2018",
            "description": "Government Savings Promotion General Rules, 2018",
            "filename": "Government Savings Promotion Rules, 2018 FINAL.pdf",
            "path": "/notes/paper-1/Government Savings Promotion Rules, 2018 FINAL.pdf",
            "size": "0.7 MB",
            "color": "emerald"
        },
        {
            "title": "PO Small Savings Schemes",
            "description": "Comprehensive notes on Small Savings Schemes including practice questions.",
            "filename": "PO_Small_Savings_Schemes.pdf",
            "path": "/notes/paper-1/PO_Small_Savings_Schemes.pdf",
            "size": "4.3 MB",
            "color": "emerald"
        },
        {
            "title": "Post Office Saving Bank Manual Volume I & II",
            "description": "Materials will be uploaded soon.",
            "color": "emerald",
            "comingSoon": true
        },
        {
            "title": "POSB (CBS) Manual",
            "description": "Post Office Saving Bank (CBS) Manual",
            "filename": "POSB_CBS_MANUAL.pdf",
            "path": "/notes/paper-1/POSB_CBS_MANUAL.pdf",
            "size": "0.5 MB",
            "color": "teal"
        },
        {
            "title": "Post Office Life Insurance Scheme, 2011",
            "description": "Post Office Life Insurance Rules, 2011",
            "filename": "poli-rules-2011.pdf",
            "path": "/notes/paper-1/poli-rules-2011.pdf",
            "size": "0.4 MB",
            "color": "rose"
        },
        {
            "title": "Guidelines issued by Directorate from time to time on PLI/RPLI and Core Insurance solution",
            "description": "Materials will be uploaded soon.",
            "color": "slate",
            "comingSoon": true
        },
        {
            "title": "Citizen Charter of Department of Posts.",
            "description": "Citizen Charter of Department of Posts",
            "filename": "Citizen_Charter_Department_of_Posts.pdf",
            "path": "/notes/paper-1/Citizen_Charter_Department_of_Posts.pdf",
            "size": "0.6 MB",
            "color": "sky"
        },
        {
            "title": "Guidelines and instructions on complaint grievances handling in Department of Posts.",
            "description": "Complaint & Grievance Handling in Department of Posts",
            "filename": "Complaint_Grievance_Handling.pdf",
            "path": "/notes/paper-1/Complaint_Grievance_Handling.pdf",
            "size": "0.6 MB",
            "color": "indigo"
        },
        {
            "title": "Guidelines issued by Directorate from time to time on IT modernization Project of Department of Posts",
            "description": "Materials will be uploaded soon.",
            "color": "gray",
            "comingSoon": true
        },
        {
            "title": "Handbook on Philately",
            "description": "Materials will be uploaded soon.",
            "color": "emerald",
            "comingSoon": true
        },
        {
            "title": "Directorate instructions on Philately",
            "description": "Materials will be uploaded soon.",
            "color": "blue",
            "comingSoon": true
        },
        {
            "title": "Postal Manual Volume II - Chapter XI - Misc. Rules",
            "description": "Postal Manual Volume II - Chapter XI - Miscellaneous Rules",
            "filename": "Postal_Manual_Vol_II_Chapter_XI.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_II_Chapter_XI.pdf",
            "size": "4.6 MB",
            "color": "violet"
        },
        {
            "title": "Manual of Office Procedure",
            "description": "Manual of Office Procedure",
            "filename": "Manual_of_Office_Procedure.pdf",
            "path": "/notes/paper-1/Manual_of_Office_Procedure.pdf",
            "size": "4.7 MB",
            "color": "slate"
        },
        {
            "title": "Annual Reports and Book of Information of D/o Posts",
            "description": "Department of Posts annual data.",
            "filename": "Annual_Report_and_Book_of_Information.pdf",
            "path": "/notes/paper-1/Annual_Report_and_Book_of_Information.pdf",
            "size": "4.5 MB",
            "color": "sky"
        },
        {
            "title": "Postal Manual Volume II Chapter VI (Stock), VIII (Printing), IX(Contracts), XII (Budget Estimates and control)",
            "description": "Materials will be uploaded soon.",
            "color": "indigo",
            "comingSoon": true
        },
        {
            "title": "Chapter 6 of General Financial Rules, 2017",
            "description": "Chapter 6 of GFR 2017",
            "filename": "General_Financial_Rules_2017.pdf",
            "path": "/notes/paper-3/General_Financial_Rules_2017.pdf",
            "size": "4.2 MB",
            "color": "gray"
        },
        {
            "title": "CVC guidelines on Public procurement, guide-lines and instructions on e-procurement.",
            "description": "Materials will be uploaded soon.",
            "color": "emerald",
            "comingSoon": true
        },
        {
            "title": "Manual on policies and procedure for purchase of goods and services available on website of Ministry of Finance.",
            "description": "Manual for Procurement of Goods & Services",
            "filename": "Manual_Procurement_Goods_Services.pdf",
            "path": "/notes/paper-1/Manual_Procurement_Goods_Services.pdf",
            "size": "0.6 MB",
            "color": "blue"
        },
        {
            "title": "Postal Manual Volume IV",
            "description": "Postal Manual Volume IV.",
            "filename": "Postal_Manual_Vol_IV.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_IV.pdf",
            "size": "4.1 MB",
            "color": "amber"
        },
        {
            "title": "Instructions issued by Directorate and DoP&T on maintenance of APAR.",
            "description": "Instructions on Maintenance of Annual Performance Assessment Report (APAR)",
            "filename": "Instructions_Maintenance_APAR.pdf",
            "path": "/notes/paper-1/Instructions_Maintenance_APAR.pdf",
            "size": "0.6 MB",
            "color": "violet"
        },
        {
            "title": "Schedule of Financial Powers of Divisional Heads, Head of the Circle, etc.",
            "description": "Materials will be uploaded soon.",
            "color": "slate",
            "comingSoon": true
        },
        {
            "title": "Welfare Measures",
            "description": "Welfare measures available to Departmental Employees and Gramin Dak Sevak of DoP.",
            "filename": "Welfare_Measures_Employees_GDS.pdf",
            "path": "/notes/paper-3/Welfare_Measures_Employees_GDS.pdf",
            "size": "0.7 MB",
            "color": "green"
        },
        {
            "title": "DoP&T instructions issued from time to time on Establishment and administration.",
            "description": "Materials will be uploaded soon.",
            "color": "sky",
            "comingSoon": true
        },
        {
            "title": "Brochure on reservation, instructions regarding sports person reservation, compassionate appointment guidelines issued by DoP and DoP&T from time to time.",
            "description": "Materials will be uploaded soon.",
            "color": "indigo",
            "comingSoon": true
        },
        {
            "title": "Recruitment Rules relating to various cadres in D/o Posts",
            "description": "Materials will be uploaded soon.",
            "color": "gray",
            "comingSoon": true
        },
        {
            "title": "Establishment Norms",
            "description": "Materials will be uploaded soon.",
            "color": "emerald",
            "comingSoon": true
        },
    ],
    "Paper II": [
        {
            "title": "CCS (Conduct) Rules, 1964",
            "description": "Central Civil Services (Conduct) Rules, 1964",
            "filename": "CCS_Conduct_Rules_1965.pdf",
            "path": "/notes/paper-1/CCS_Conduct_Rules_1965.pdf",
            "size": "0.6 MB",
            "color": "red"
        },
        {
            "title": "CCS (CCA) Rules, 1965",
            "description": "Central Civil Services (Classification, Control and Appeal) Rules, 1965",
            "filename": "CCS_CCA_Rules_1965.pdf",
            "path": "/notes/paper-1/CCS_CCA_Rules_1965.pdf",
            "size": "0.8 MB",
            "color": "red"
        },
        {
            "title": "CCS (Temporary Service) Rules, 1965",
            "description": "Central Civil Services (Temporary Service Rules), 1965",
            "filename": "CCS_Temporary_Services_Rules_1965.pdf",
            "path": "/notes/paper-1/CCS_Temporary_Services_Rules_1965.pdf",
            "size": "0.2 MB",
            "color": "red"
        },
        {
            "title": "Brochure on Casual Labourers",
            "description": "Brochure on Casual labourer",
            "filename": "Brochure_Casual_Labourers.pdf",
            "path": "/notes/paper-3/Brochure_Casual_Labourers.pdf",
            "size": "0.6 MB",
            "color": "amber"
        },
        {
            "title": "CCS (Pension) Rules, 2021",
            "description": "CCS (Pension) Rules, 2021",
            "filename": "CCS_Pension_Rules_2021.pdf",
            "path": "/notes/paper-3/CCS_Pension_Rules_2021.pdf",
            "size": "0.8 MB",
            "color": "teal"
        },
        {
            "title": "CCS (Implementation of NPS) Rules, 2021",
            "description": "National Pension System implementation.",
            "filename": "CCS_Implementation_of_NPS_Rules_2021.pdf",
            "path": "/notes/paper-3/CCS_Implementation_of_NPS_Rules_2021.pdf",
            "size": "4.3 MB",
            "color": "emerald"
        },
        {
            "title": "CCS (Payment of Gratuity under NPS) Rules, 2021",
            "description": "Gratuity rules for NPS employees.",
            "filename": "CCS_Payment_of_Gratuity_under_NPS_Rules_2021.pdf",
            "path": "/notes/paper-3/CCS_Payment_of_Gratuity_under_NPS_Rules_2021.pdf",
            "size": "4.1 MB",
            "color": "emerald"
        },
        {
            "title": "CCS (Commutation of Pension) Rules, 1981",
            "description": "Central Civil Services (Commutation of Pension) Rules, 1981",
            "filename": "CCS_Commutation_Pension_Rules_1981.pdf",
            "path": "/notes/paper-3/CCS_Commutation_Pension_Rules_1981.pdf",
            "size": "0.5 MB",
            "color": "teal"
        },
        {
            "title": "CCS (Leave) Rules, 1972",
            "description": "Central Civil Services (Leave) Rules, 1972",
            "filename": "CCS_Leave_Rules_1972.pdf",
            "path": "/notes/paper-3/CCS_Leave_Rules_1972.pdf",
            "size": "0.3 MB",
            "color": "teal"
        },
        {
            "title": "Central Civil Services (Joining Time) Rules, 1979",
            "description": "Materials will be uploaded soon.",
            "color": "sky",
            "comingSoon": true
        },
        {
            "title": "CCS (GPF) Rules, 1961",
            "description": "General Provident Fund (Central Service) Rules, 1960",
            "filename": "CCS_GPF_Rules_1961.pdf",
            "path": "/notes/paper-3/CCS_GPF_Rules_1961.pdf",
            "size": "0.8 MB",
            "color": "teal"
        },
        {
            "title": "Central Services (Medical Attendance) Rules, 1944",
            "description": "Central Services (Medical Attendance) Rules, 1944",
            "filename": "CS_Medical_Attendance_Rules_1944.pdf",
            "path": "/notes/paper-3/CS_Medical_Attendance_Rules_1944.pdf",
            "size": "4.2 MB",
            "color": "indigo"
        },
        {
            "title": "Fundamental and Supplementary Rules",
            "description": "Materials will be uploaded soon.",
            "color": "gray",
            "comingSoon": true
        },
        {
            "title": "Central Civil Services (Leave Travel Concession) Rules, 1988",
            "description": "Central Civil Services (Leave Travel Concession) Rules, 1988",
            "filename": "CCS_LTC_Rules_1988.pdf",
            "path": "/notes/paper-3/CCS_LTC_Rules_1988.pdf",
            "size": "4.2 MB",
            "color": "emerald"
        },
        {
            "title": "Central Civil Services (Revised Pay) Rules, 2016",
            "description": "Materials will be uploaded soon.",
            "color": "blue",
            "comingSoon": true
        },
        {
            "title": "Rules relating to Children Education allowance and reimbursement of Hostel Subsidy",
            "description": "Rules relating to Children Education allowance and reimbursement of Hostel Subsidy",
            "filename": "CEA_and_Hostel_Subsidy.pdf",
            "path": "/notes/paper-3/CEA_and_Hostel_Subsidy.pdf",
            "size": "4.1 MB",
            "color": "violet"
        },
        {
            "title": "Central Government Employees Group Insurance Scheme, 1980",
            "description": "Central Government Employees Group Insurance Scheme, 1980",
            "filename": "CGEGIS_1980.pdf",
            "path": "/notes/paper-3/CGEGIS_1980.pdf",
            "size": "4.1 MB",
            "color": "slate"
        },
        {
            "title": "Central Civil Services (Recognition of Service Association) Rules, 1993",
            "description": "Materials will be uploaded soon.",
            "color": "sky",
            "comingSoon": true
        },
        {
            "title": "Postal Manual Volume III",
            "description": "Postal Manual Volume III",
            "filename": "Postal_Manual_Vol_III.pdf",
            "path": "/notes/paper-1/Postal_Manual_Vol_III.pdf",
            "size": "0.7 MB",
            "color": "amber"
        },
        {
            "title": "Postal Manual Volume II: Chapter III - Appeals and Petitions, Chapter IV-Personal matters, Chapter V-Security Deposits, Chapter VII - Forged counterfeit stamps and defaced postage stamps, coins and currency notes.",
            "description": "Materials will be uploaded soon.",
            "color": "indigo",
            "comingSoon": true
        },
        {
            "title": "P&T FHB Vol I",
            "description": "P&T Financial Hand Book Volume I.",
            "filename": "FHB_Vol_I.pdf",
            "path": "/notes/paper-3/FHB_Vol_I.pdf",
            "size": "0.9 MB",
            "color": "violet"
        },
        {
            "title": "Postal FHB Vol II",
            "description": "Postal Financial Hand Book Volume II.",
            "filename": "FHB_Vol_II.pdf",
            "path": "/notes/paper-3/FHB_Vol_II.pdf",
            "size": "0.8 MB",
            "color": "violet"
        },
        {
            "title": "General Financial Rules 2017 other than public procurement",
            "description": "General Financial Rules 2017 other than public procurement",
            "filename": "General_Financial_Rules_2017.pdf",
            "path": "/notes/paper-3/General_Financial_Rules_2017.pdf",
            "size": "4.2 MB",
            "color": "gray"
        },
        {
            "title": "Interface with India Post Payments Bank",
            "description": "Interface with India Post Payments Bank",
            "filename": "India_Post_Payments_Bank.pdf",
            "path": "/notes/paper-1/India_Post_Payments_Bank.pdf",
            "size": "0.8 MB",
            "color": "emerald"
        },
        {
            "title": "Preservation of Records",
            "description": "Disposal and preservation of postal records.",
            "filename": "Preservation_Period_of_Records.pdf",
            "path": "/notes/paper-1/Preservation_Period_of_Records.pdf",
            "size": "0.5 MB",
            "color": "gray"
        },
        {
            "title": "Swatchh Bharat",
            "description": "Materials will be uploaded soon.",
            "color": "violet",
            "comingSoon": true
        },
        {
            "title": "Inspection questionnaires.",
            "description": "Materials will be uploaded soon.",
            "color": "slate",
            "comingSoon": true
        },
        {
            "title": "GDS (Conduct & Engagement) Rules, 2020",
            "description": "Gramin Dak Sevak (Conduct and Engagement) Rules, 2011.",
            "filename": "GDS_CE_Rules_2020.pdf",
            "path": "/notes/paper-1/GDS_CE_Rules_2020.pdf",
            "size": "0.2 MB",
            "color": "red"
        },
        {
            "title": "Central Administrative Tribunal Act, 1985",
            "description": "Central Administrative Tribunal Act, 1985 and its Rules",
            "filename": "CENTRAL_ADMINISTRATIVE_TRIBUNALS_ACT_1985.pdf",
            "path": "/notes/paper-3/CENTRAL_ADMINISTRATIVE_TRIBUNALS_ACT_1985.pdf",
            "size": "0.6 MB",
            "color": "indigo"
        },
        {
            "title": "RTI Act, 2005 and RTI Rules, 2012",
            "description": "Right to Information Act 2005 and RTI Rules 2012",
            "filename": "RTI_Act_2005_and_RTI_Rules_2012.pdf",
            "path": "/notes/paper-3/RTI_Act_2005_and_RTI_Rules_2012.pdf",
            "size": "0.7 MB",
            "color": "cyan"
        },
        {
            "title": "Sexual Harassment of Women at Workplace Act, 2013",
            "description": "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
            "filename": "POSH_Rules_2013.pdf",
            "path": "/notes/paper-3/POSH_Rules_2013.pdf",
            "size": "0.2 MB",
            "color": "pink"
        },
        {
            "title": "Public Accountants Default Act, 1850",
            "description": "Materials will be uploaded soon.",
            "color": "indigo",
            "comingSoon": true
        },
        {
            "title": "Revenue Recovery Act, 1890",
            "description": "Revenue Recovery Act, 1890",
            "filename": "Revenue_Recovery_Act_1890.pdf",
            "path": "/notes/paper-3/Revenue_Recovery_Act_1890.pdf",
            "size": "0.4 MB",
            "color": "blue"
        },
        {
            "title": "Prevention of Corruption Act, 1988",
            "description": "Prevention of Corruption Act, 1988 read with its (Amendment) Act, 2018",
            "filename": "Prevention_of_Corruption_Act_1988.pdf",
            "path": "/notes/paper-3/Prevention_of_Corruption_Act_1988.pdf",
            "size": "0.6 MB",
            "color": "red"
        },
        {
            "title": "Goods and Services Tax (GST) Act, 2017",
            "description": "Materials will be uploaded soon.",
            "color": "gray",
            "comingSoon": true
        }
    ]
};
