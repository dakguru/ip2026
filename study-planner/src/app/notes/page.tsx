"use client";

import React, { useState, useEffect } from 'react';
import HomeHeader from '@/components/HomeHeader';
import { FileText, Download, Eye, BookOpen, Layers, Clock, Sparkles, Lock, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
    loading: () => <div className="flex items-center justify-center h-full text-slate-400">Loading viewer...</div>,
    ssr: false
});
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import { FileOpener } from '@capacitor-community/file-opener';
import { ShieldAlert, Info } from 'lucide-react';

// --- DATA ---
interface Note {
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

// Map for scheduled dates
const SCHEDULE_MAPPING: Record<string, string> = {
    "Consumer Protection Act, 2019": "19-01-2026",
    "Information Technology Act, 2000": "21-01-2026",
    "Government Savings Promotion Rules, 2018": "26-01-2026",
    "Post Office Savings Account Scheme, 2019": "27-01-2026",
    "National Savings Recurring Deposit Scheme, 2019": "28-01-2026",
    "National Savings Time Deposit Scheme, 2019": "29-01-2026",
    "National Savings (MIA) Scheme, 2019": "30-01-2026",
    "Senior Citizens' Savings Scheme, 2019": "31-01-2026",
    "National Savings Certificate (VIII Issue) Scheme": "02-02-2026",
    "Kisan Vikas Patra Scheme, 2019": "03-02-2026",
    "Public Provident Fund Scheme, 2019": "04-02-2026",
    "Sukanya Samriddhi Account Scheme, 2019": "05-02-2026",
    "Post Office Life Insurance Scheme, 2011": "06-02-2026",
    "Book of BO Rules": "16-02-2026",
    "Postal Manual Volume II": "16-02-2026",
    "Postal Manual Volume III": "16-02-2026",
    "Postal Manual Volume IV": "16-02-2026",
    "Postal Manual Volume V": "16-02-2026",
    "Postal Manual Volume VI, Part-I": "16-02-2026",
    "Postal Manual Volume VI, Part-II": "16-02-2026",
    "Postal Manual Volume VI, Part-III": "16-02-2026",
    "Postal Manual Volume VII": "18-02-2026",
    "Postal Manual Volume VIII": "18-02-2026",

    "Jansuraksha Schemes": "20-02-2026",
    "Post Office Guide Part-I": "21-02-2026",
    "Post Office Guide Part-II": "24-02-2026",
    "Domestic/Foreign Post Guidelines": "26-02-2026",
    "DIGIPIN": "27-02-2026",
    "MNOP & PNOP Guidelines": "28-02-2026",
    "Centralized Delivery Policy": "03-03-2026",
    "Dak Ghar Niryat Kendra (DNKs)": "04-03-2026",
    "Product Consolidation Guidelines": "05-03-2026",
    "SB Manual Vol I, II & III": "06-03-2026",
    "POSB (CBS) Manual": "09-03-2026",
    "Annual Reports & Book of Information": "11-03-2026",
    "APT Knowledge (IT 2.0)": "12-03-2026",
    "Core Banking Solutions, PLI-CIS": "13-03-2026",
    "India Post Payments Bank": "14-03-2026",
    "Preservation of Records": "16-03-2026",
    "CCS (Conduct) Rules, 1964": "17-03-2026",
    "CCS (CCA) Rules, 1965": "18-03-2026",
    "CCS (Temporary Service) Rules, 1965": "20-03-2026",
    "GDS (Conduct & Engagement) Rules, 2020": "20-03-2026",
    "Constitution of India": "21-03-2026",
    "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023": "31-03-2026",
    "Central Administrative Tribunal Act, 1985": "01-04-2026",
    "Revenue Recovery Act, 1890": "02-04-2026",
    "Prevention of Corruption Act, 1988": "03-04-2026",
    "RTI Act, 2005 and RTI Rules, 2012": "06-04-2026",
    "Manual on Procurement of Goods": "08-04-2026",
    "Manual on Procurement of Works": "10-04-2026",
    "Manual on Procurement of Consultancy": "13-04-2026",
    "CCS (GPF) Rules, 1961": "15-04-2026",
    "CCS (Pension) Rules, 2021": "16-04-2026",
    "CCS (Commutation of Pension) Rules, 1981": "18-04-2026",
    "Sexual Harassment of Women at Workplace Act, 2013": "20-04-2026",
    "CCS (Implementation of NPS) Rules, 2021": "21-04-2026",
    "CCS (Payment of Gratuity under NPS) Rules, 2021": "22-04-2026",
    "General Financial Rules, 2017": "23-04-2026",
    "Fundamental Rules (FR) and Supplementary Rules (SR)": "25-04-2026",
    "Brochure on Casual Labourers": "28-04-2026",
    "Maintenance of APAR": "29-04-2026",
    "Service Discharge Benefit Scheme, 2010": "30-04-2026",
    "Schedule of Financial Powers": "01-05-2026",
    "Welfare Measures": "02-05-2026",
    "P&T FHB Vol I": "05-05-2026",
    "Postal FHB Vol II": "07-05-2026",
};

const PDF_DATA: Record<string, Note[]> = {
    "Paper I": [
        // 6. Rules (Moved to top as per request)
        {
            title: "The PO Regulations, 2024",
            subtitle: "(and its recent amendments/changes)",
            description: "Detailed rules and regulations under the new Post Office Act.",
            filename: "PO_Regulations_2024.pdf",
            path: "/notes/paper-1/PO_Regulations_2024.pdf",
            size: "0.9 MB",
            color: "emerald",
            isFree: true
        },
        // 1. Acts
        {
            title: "The Post Office Act, 2023",
            description: "Act No.43 of 2023. Comprehensive notes on the new Post Office legal framework.",
            filename: "PO_Act_2023_Rules_2024.pdf",
            path: "/notes/paper-1/PO_Act_2023_Rules_2024.pdf",
            size: "8.7 MB",
            color: "blue"
        },
        {
            title: "Government Savings Promotion Act, 1873",
            description: "Key provisions of the GSPA 1873 governing savings schemes.",
            filename: "GSPA_1873.pdf",
            path: "/notes/paper-1/GSPA_1873.pdf",
            size: "8.7 MB",
            color: "indigo"
        },
        {
            title: "PMLA Act, 2002",
            description: "Prevention of Money Laundering Act, 2002 and its Amendments (AML/CFT Norms).",
            filename: "PMLA_2002.pdf",
            path: "/notes/paper-1/PMLA_2002.pdf",
            size: "0.3 MB",
            color: "purple"
        },
        {
            title: "Consumer Protection Act, 2019",
            description: "Notes on rights of consumers and redressal mechanisms.",
            filename: "Consumer_Protection_Act_2019.pdf",
            path: "/notes/paper-1/Consumer_Protection_Act_2019.pdf",
            size: "0.7 MB",
            color: "blue",
            isFree: true
        },
        {
            title: "Information Technology Act, 2000",
            description: "Legal framework for electronic governance and cyber crimes.",
            filename: "IT_Act_2000.pdf",
            path: "/notes/paper-1/IT_Act_2000.pdf",
            size: "0.3 MB",
            color: "blue"
        },

        // 6. Rules
        {
            title: "PO Small Savings Schemes & Practice Questions",
            description: "Comprehensive notes on Small Savings Schemes including practice questions.",
            filename: "PO_Small_Savings_Schemes_Practice_Questions.pdf",
            path: "/notes/paper-1/PO_Small_Savings_Schemes_Practice_Questions.pdf",
            size: "33.5 MB",
            color: "emerald"
        },

        {
            title: "Government Savings Promotion Rules, 2018",
            description: "General rules applicable to all Government Savings Schemes.",
            filename: "Government Savings Promotion Rules, 2018 FINAL.pdf",
            path: "/notes/paper-1/Government Savings Promotion Rules, 2018 FINAL.pdf",
            size: "0.7 MB",
            color: "emerald"
        },


        // 17. PLI
        {
            title: "Post Office Life Insurance Scheme, 2011",
            description: "POLI Rules 2011 & amendments (SANKALAN).",
            filename: "poli-rules-2011.pdf",
            path: "/notes/paper-1/poli-rules-2011.pdf",
            size: "0.4 MB",
            color: "rose"
        },

        // 18. Postal Manuals
        {
            title: "Book of BO Rules",
            description: "Rules for Branch Post Offices.",
            filename: "Book_of_BO_Rules.pdf",
            path: "/notes/paper-1/Book_of_BO_Rules.pdf",
            size: "0.6 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume II",
            description: "Organization and general regulations.",
            filename: "Postal_Manual_Vol_II.pdf",
            path: "/notes/paper-1/Postal_Manual_Vol_II.pdf",
            size: "0.8 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume III",
            description: "Discipline and Appeal rules.",
            filename: "Postal_Manual_Vol_III.pdf",
            path: "/notes/paper-1/Postal_Manual_Vol_III.pdf",
            size: "0.7 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume IV",
            description: "Leave, pension, gratuities, and establishment rules.",
            filename: "Postal_Manual_Vol_IV.pdf",
            path: "/notes/paper-1/Postal_Manual_Vol_IV.pdf",
            size: "0.6 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume VIII",
            description: "Manual for various postal operations.",
            filename: "Postal_Manual_Vol_VIII.pdf",
            path: "/notes/paper-1/Postal_Manual_Vol_VIII.pdf",
            size: "0.2 MB",
            color: "amber"
        },

        {
            title: "Postal Manual Volume V",
            description: "Except Appendix-1.",
            filename: "Postal_Manual_Vol_V.pdf",
            path: "/notes/paper-1/Postal_Manual_Vol_V.pdf",
            size: "0.7 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume VI, Part-I",
            description: "Chapter-1 details.",
            filename: "postal-manual-vol-vi-part-1.pdf",
            path: "/notes/paper-1/postal-manual-vol-vi-part-1.pdf",
            size: "0.8 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume VI, Part-II",
            description: "Except telegraphic money orders.",
            filename: "postal-manual-vol-vi-part-2.pdf",
            path: "/notes/paper-1/postal-manual-vol-vi-part-2.pdf",
            size: "0.3 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume VI, Part-III",
            description: "Except Appendices.",
            filename: "postal-manual-vol-vi-part-3.pdf",
            path: "/notes/paper-1/postal-manual-vol-vi-part-3.pdf",
            size: "0.7 MB",
            color: "amber"
        },
        {
            title: "Postal Manual Volume VII",
            description: "RMS work and innovative guidelines.",
            filename: "postal-manual-vol-vii.pdf",
            path: "/notes/paper-1/postal-manual-vol-vii.pdf",
            size: "0.8 MB",
            color: "amber"
        },

        // 29. Jansuraksha
        {
            title: "Jansuraksha Schemes",
            description: "PMJJBY, PMSBY, APY guidelines.",
            filename: "jan-suraksha-schemes.pdf",
            path: "/notes/paper-1/jan-suraksha-schemes.pdf",
            size: "0.6 MB",
            color: "orange"
        },

        // 30. Inland/Foreign
        {
            title: "Post Office Guide Part-I",
            description: "Rules for Inland Post.",
            filename: "PO_Guide_Part_I.pdf",
            path: "/notes/paper-1/PO_Guide_Part_I.pdf",
            size: "0.4 MB",
            color: "cyan"
        },
        {
            title: "Post Office Guide Part-II",
            description: "Except Section VII & VIII.",
            filename: "PO Guide Part - II.pdf",
            path: "/notes/paper-1/PO Guide Part - II.pdf",
            size: "0.5 MB",
            color: "cyan"
        },
        { title: "Domestic/Foreign Post Guidelines", description: "Issued by Directorate.", color: "cyan", comingSoon: true },

        // 33. DIGIPIN
        {
            title: "DIGIPIN",
            description: "Basic understanding of Digital Personal Identification Number.",
            filename: "DIGIPIN.pdf",
            path: "/notes/paper-1/DIGIPIN.pdf",
            size: "0.5 MB",
            color: "violet"
        },

        // 34. Network Optimization
        { title: "MNOP & PNOP Guidelines", description: "Mail & Parcel Network Optimization Projects.", color: "fuchsia", comingSoon: true },
        { title: "Centralized Delivery Policy", description: "Guidelines for delivery staff.", color: "fuchsia", comingSoon: true },
        { title: "Dak Ghar Niryat Kendra (DNKs)", description: "Guidelines for export centers.", color: "fuchsia", comingSoon: true },


        {
            title: "POSB (CBS) Manual",
            description: "Corrected up to 31.12.2021 and subsequent orders.",
            filename: "POSB_CBS_MANUAL.pdf",
            path: "/notes/paper-1/POSB_CBS_MANUAL.pdf",
            size: "0.5 MB",
            color: "teal"
        },

        // 40. Reports
        { title: "Annual Reports & Book of Information", description: "Department of Posts annual data.", color: "slate", comingSoon: true },

        // 41. IT
        { title: "APT Knowledge (IT 2.0)", description: "Advanced Postal Technology.", color: "sky", comingSoon: true },
        { title: "Core Banking Solutions, PLI-CIS", description: "Working knowledge of CBS and CIS.", color: "sky", comingSoon: true },

        // 43. IPPB
        { title: "India Post Payments Bank", description: "Operations and guidelines.", color: "indigo", comingSoon: true },

        // 44. Records
        { title: "Preservation of Records", description: "Disposal and preservation of postal records.", color: "gray", comingSoon: true },

        // 45. Conduct Rules
        {
            title: "CCS (Conduct) Rules, 1964",
            description: "Code of conduct for government servants.",
            filename: "CCS_Conduct_Rules_1965.pdf",
            path: "/notes/paper-1/CCS_Conduct_Rules_1965.pdf",
            size: "0.6 MB",
            color: "red"
        },
        {
            title: "CCS (CCA) Rules, 1965",
            description: "Classification, Control and Appeal rules.",
            filename: "CCS_CCA_Rules_1965.pdf",
            path: "/notes/paper-1/CCS_CCA_Rules_1965.pdf",
            size: "0.8 MB",
            color: "red"
        },
        {
            title: "CCS (Temporary Service) Rules, 1965",
            description: "Rules for temporary service.",
            filename: "CCS_Temporary_Services_Rules_1965.pdf",
            path: "/notes/paper-1/CCS_Temporary_Services_Rules_1965.pdf",
            size: "0.2 MB",
            color: "red"
        },
        {
            title: "GDS (Conduct & Engagement) Rules, 2020",
            description: "Rules related to Gramin Dak Sevaks.",
            filename: "GDS_CE_Rules_2020.pdf",
            path: "/notes/paper-1/GDS_CE_Rules_2020.pdf",
            size: "0.2 MB",
            color: "red"
        },
    ],
    "Paper III": [
        // 1-8. Constitution
        // 1. Constitution
        { title: "Constitution of India", description: "Comprehensive notes on Preamble, Fundamental Rights, Duties, and key Articles.", color: "amber", comingSoon: true },

        // 9. BNSS 2023
        {
            title: "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
            description: "Detailed analysis of the BNSS, 2023 replacing the CrPC.",
            filename: "BNSS_2023.pdf",
            path: "/notes/paper-3/BNSS_2023.pdf",
            size: "8.7 MB",
            color: "purple"
        },

        // 12. CAT Act
        {
            title: "Central Administrative Tribunal Act, 1985",
            description: "CAT Act provisions.",
            filename: "CENTRAL_ADMINISTRATIVE_TRIBUNALS_ACT_1985.pdf",
            path: "/notes/paper-3/CENTRAL_ADMINISTRATIVE_TRIBUNALS_ACT_1985.pdf",
            size: "0.6 MB",
            color: "indigo"
        },

        // 13. Revenue Recovery
        {
            title: "Revenue Recovery Act, 1890",
            description: "Act for recovery of public revenue.",
            filename: "Revenue_Recovery_Act_1890.pdf",
            path: "/notes/paper-3/Revenue_Recovery_Act_1890.pdf",
            size: "0.4 MB",
            color: "blue"
        },

        // 14. POCA
        {
            title: "Prevention of Corruption Act, 1988",
            description: "As amended.",
            filename: "Prevention_of_Corruption_Act_1988.pdf",
            path: "/notes/paper-3/Prevention_of_Corruption_Act_1988.pdf",
            size: "0.6 MB",
            color: "red"
        },

        // 15. RTI
        {
            title: "RTI Act, 2005 and RTI Rules, 2012",
            description: "Right to Information framework.",
            filename: "RTI_Act_2005_and_RTI_Rules_2012.pdf",
            path: "/notes/paper-3/RTI_Act_2005_and_RTI_Rules_2012.pdf",
            size: "0.7 MB",
            color: "cyan"
        },

        // 16-18. Procurement Manual
        { title: "Manual on Procurement of Goods", description: "Procurement Manual Part i", color: "slate", comingSoon: true },
        { title: "Manual on Procurement of Works", description: "Procurement Manual Part ii", color: "slate", comingSoon: true },
        { title: "Manual on Procurement of Consultancy", description: "Procurement Manual Part iii", color: "slate", comingSoon: true },

        // 19-21. CCS Rules
        {
            title: "CCS (Leave) Rules, 1972",
            description: "Central Civil Services (Leave) Rules, 1972.",
            filename: "CCS_Leave_Rules_1972.pdf",
            path: "/notes/paper-3/CCS_Leave_Rules_1972.pdf",
            size: "0.3 MB",
            color: "teal"
        },
        { title: "CCS (GPF) Rules, 1961", description: "General Provident Fund rules.", color: "teal", comingSoon: true },
        { title: "CCS (Pension) Rules, 2021", description: "New pension rules and amendments.", color: "teal", comingSoon: true },
        { title: "CCS (Commutation of Pension) Rules, 1981", description: "Commutation rules.", color: "teal", comingSoon: true },

        // 22. Sexual Harassment
        {
            title: "Sexual Harassment of Women at Workplace Act, 2013",
            description: "Prevention, Prohibition and Redressal.",
            filename: "POSH_Rules_2013.pdf",
            path: "/notes/paper-3/POSH_Rules_2013.pdf",
            size: "0.2 MB",
            color: "pink"
        },

        // 23-24. NPS
        { title: "CCS (Implementation of NPS) Rules, 2021", description: "National Pension System implementation.", color: "emerald", comingSoon: true },
        { title: "CCS (Payment of Gratuity under NPS) Rules, 2021", description: "Gratuity rules for NPS employees.", color: "emerald", comingSoon: true },

        // 25. GFR
        { title: "General Financial Rules, 2017", description: "Chapter 2 and 6 (and amendments).", color: "gray", comingSoon: true },

        // 26. FR & SR
        { title: "Fundamental Rules (FR) and Supplementary Rules (SR)", description: "Core service rules.", color: "indigo", comingSoon: true },

        // 27. Casual Labourers
        { title: "Brochure on Casual Labourers", description: "Instructions issued by DoP&T.", color: "amber", comingSoon: true },

        // 28. APAR
        { title: "Maintenance of APAR", description: "Instructions by Directorate and DoP&T.", color: "orange", comingSoon: true },

        // 29. Service Discharge
        { title: "Service Discharge Benefit Scheme, 2010", description: "SDBS details.", color: "rose", comingSoon: true },

        // 30. Financial Powers
        { title: "Schedule of Financial Powers", description: "Divisional Heads, Heads of Circle.", color: "blue", comingSoon: true },

        // 31. Welfare Measures
        { title: "Welfare Measures", description: "For Departmental Employees and GDS.", color: "green", comingSoon: true },

        // 32. FHB
        { title: "P&T FHB Vol I", description: "P&T Financial Hand Book Volume I.", color: "violet", comingSoon: true },
        { title: "Postal FHB Vol II", description: "Postal Financial Hand Book Volume II.", color: "violet", comingSoon: true },
    ],
    "SB Orders": [
        {
            title: "SB Orders 2025",
            description: "Compendium of SB Orders issued in 2025.",
            filename: "SB_Orders_2025.pdf",
            path: "https://drive.google.com/file/d/1No5fp0eZ5qQvk0bxmQhBIMCnxJ245l7K/preview",
            size: "PDF",
            color: "violet",
            isFree: true
        },
        {
            title: "SB Orders 2024",
            description: "Compendium of SB Orders issued in 2024.",
            filename: "SB_Orders_2024.pdf",
            path: "https://drive.google.com/file/d/1iGLeBO--IOUncz7ZLSxEbeUHmYy25wxn/preview",
            size: "PDF",
            color: "indigo",
            isFree: true
        },
        {
            title: "SB Orders 2023",
            description: "Compendium of SB Orders issued in 2023.",
            filename: "SB_Orders_2023.pdf",
            path: "https://drive.google.com/file/d/1ckB55EjsE3dvDikd49USwzeTZ8slUrLH/preview",
            size: "PDF",
            color: "blue",
            isFree: true
        },
        {
            title: "SB Orders 2022",
            description: "Compendium of SB Orders issued in 2022.",
            filename: "SB_Orders_2022.pdf",
            path: "https://drive.google.com/file/d/1-TelumAU96DmQLFw18BSbwjuOsrPljON/preview",
            size: "PDF",
            color: "cyan",
            isFree: true
        },
        {
            title: "SB Orders 2021",
            description: "Compendium of SB Orders issued in 2021.",
            filename: "SB_Orders_2021.pdf",
            path: "https://drive.google.com/file/d/1JIKGCFvwr6Usf_lvtIlfTvwPQFTJk13d/preview",
            size: "PDF",
            color: "teal",
            isFree: true
        },
        {
            title: "SB Orders 2020",
            description: "Compendium of SB Orders issued in 2020.",
            filename: "SB_Orders_2020.pdf",
            path: "https://drive.google.com/file/d/1uUWA8dIhcwBok5ElsKj7TlOtKrjBekFO/preview",
            size: "PDF",
            color: "emerald",
            isFree: true
        },
        {
            title: "SB Orders 2019",
            description: "Compendium of SB Orders issued in 2019.",
            filename: "SB_Orders_2019.pdf",
            path: "https://drive.google.com/file/d/1lQgAaFvDV4Rm1SW8NsNHx9zPAHyyaZU8/preview",
            size: "PDF",
            color: "green",
            isFree: true
        },
        {
            title: "SB Orders 2018",
            description: "Compendium of SB Orders issued in 2018.",
            filename: "SB_Orders_2018.pdf",
            path: "https://drive.google.com/file/d/1Cs8wlEp-HKVA4MvNv95EmsDkCN3A6r8B/preview",
            size: "PDF",
            color: "lime",
            isFree: true
        },
        {
            title: "SB Orders 2017",
            description: "Compendium of SB Orders issued in 2017.",
            filename: "SB_Orders_2017.pdf",
            path: "https://drive.google.com/file/d/1drQqjgLOre3N3IwPJZgLhYWJhRu0kImj/preview",
            size: "PDF",
            color: "yellow",
            isFree: true
        },
        {
            title: "SB Orders 2016",
            description: "Compendium of SB Orders issued in 2016.",
            filename: "SB_Orders_2016.pdf",
            path: "https://drive.google.com/file/d/14vQfA5J6CKt6cBc0ld2rgDNjoKIRylnA/preview",
            size: "PDF",
            color: "amber",
            isFree: true
        },
        {
            title: "SB Orders 2015",
            description: "Compendium of SB Orders issued in 2015.",
            filename: "SB_Orders_2015.pdf",
            path: "https://drive.google.com/file/d/1O-kdD32Ubw2UvpFmqUVJ0wI5VtD2oU_u/preview",
            size: "PDF",
            color: "orange",
            isFree: true
        },
        {
            title: "SB Orders 2014",
            description: "Compendium of SB Orders issued in 2014.",
            filename: "SB_Orders_2014.pdf",
            path: "https://drive.google.com/file/d/1w6f0OKLeBSEAKXm142IQwtKNLcde0zJs/preview",
            size: "PDF",
            color: "red",
            isFree: true
        },
        {
            title: "SB Orders 2013",
            description: "Compendium of SB Orders issued in 2013.",
            filename: "SB_Orders_2013.pdf",
            path: "https://drive.google.com/file/d/1NPXrk9FcEXwbcqhIk_jmxIOZqDaDvayF/preview",
            size: "PDF",
            color: "rose",
            isFree: true
        },
        {
            title: "SB Orders 2012",
            description: "Compendium of SB Orders issued in 2012.",
            filename: "SB_Orders_2012.pdf",
            path: "https://drive.google.com/file/d/1lf7gD-g1GU2K9APiNHkeLWKKdB8JjWI2/preview",
            size: "PDF",
            color: "pink",
            isFree: true
        },
        {
            title: "SB Orders 2011",
            description: "Compendium of SB Orders issued in 2011.",
            filename: "SB_Orders_2011.pdf",
            path: "https://drive.google.com/file/d/1CqyTfKpDurFWwfOJQxLgd00a7IFYEOHJ/preview",
            size: "PDF",
            color: "fuchsia",
            isFree: true
        }
    ]
};

export default function NotesPage() {
    const [activeTab, setActiveTab] = useState("Paper I");
    const [selectedPdf, setSelectedPdf] = useState<{ url: string, title: string } | null>(null);
    const [membershipLevel, setMembershipLevel] = useState<'free' | 'silver' | 'gold'>('free');
    const [pdfDarkMode, setPdfDarkMode] = useState(false);

    // Advisory Modal State
    const [showAdvisory, setShowAdvisory] = useState(false);
    const [advisoryAgreed, setAdvisoryAgreed] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ type: 'view' | 'download', url: string, title: string, filename?: string } | null>(null);

    const handleActionRequest = (type: 'view' | 'download', url: string, title: string, filename?: string) => {
        // Skip advisory for SB Orders
        if (activeTab === "SB Orders") {
            if (type === 'view') {
                setSelectedPdf({ url, title });
            } else if (type === 'download' && filename) {
                performDownload(url, filename);
            }
            return;
        }

        setPendingAction({ type, url, title, filename });
        setAdvisoryAgreed(false); // Reset agreement
        setShowAdvisory(true);
    };

    const handleAdvisoryConfirm = () => {
        setShowAdvisory(false);
        if (pendingAction) {
            if (pendingAction.type === 'view') {
                setSelectedPdf({ url: pendingAction.url, title: pendingAction.title });
            } else if (pendingAction.type === 'download' && pendingAction.filename) {
                performDownload(pendingAction.url, pendingAction.filename);
            }
            setPendingAction(null);
        }
    };

    useEffect(() => {
        const checkMembership = () => {
            const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
            if (match) {
                try {
                    const session = JSON.parse(decodeURIComponent(match[2]));
                    if (session.membershipLevel) {
                        setMembershipLevel(session.membershipLevel);
                    }
                } catch (e) {
                    console.error("Failed to parse session", e);
                }
            }
        };

        checkMembership();
    }, []);

    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const [showDownloadToast, setShowDownloadToast] = useState(false);

    useEffect(() => {
        if (showDownloadToast) {
            const timer = setTimeout(() => setShowDownloadToast(false), 7000);
            return () => clearTimeout(timer);
        }
    }, [showDownloadToast]);

    const getReleaseDate = (title: string, fallback: string = "As per schedule") => {
        return SCHEDULE_MAPPING[title] || fallback;
    };

    useEffect(() => {
        let listenerHandle: any;

        const setupListeners = async () => {
            // Dynamic import to avoid SSR issues
            const { default: PdfDownloader } = await import('@/plugins/PdfDownloader');

            listenerHandle = await PdfDownloader.addListener('downloadProgress', (data) => {
                setDownloadProgress(data.progress);
                if (data.status === 'completed') {
                    setIsDownloading(false);
                    setDownloadProgress(0);
                } else if (data.status === 'failed') {
                    setIsDownloading(false);
                    setDownloadProgress(0);
                    Toast.show({ text: 'Download failed.', duration: 'long' });
                } else {
                    setIsDownloading(true);
                }
            });
        };

        if (Capacitor.isNativePlatform()) {
            setupListeners();
        }

        return () => {
            if (listenerHandle) listenerHandle.remove();
        };
    }, []);

    const performDownload = async (url: string, filename: string) => {
        try {
            if (!Capacitor.isNativePlatform()) {
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setShowDownloadToast(true);
                return;
            }

            // Native Logic: Use Custom Plugin
            setIsDownloading(true);
            setDownloadProgress(1); // Start progress
            await Toast.show({
                text: 'Starting download...',
                duration: 'short'
            });

            // Dynamic import
            const { default: PdfDownloader } = await import('@/plugins/PdfDownloader');

            // The plugin handles permissions, download, notification, and auto-open
            await PdfDownloader.downloadPdf({ url });

        } catch (error) {
            console.error("Download failed", error);
            setIsDownloading(false);
            setDownloadProgress(0);
            await Toast.show({
                text: `Failed to initiate download: ${error instanceof Error ? error.message : 'Unknown error'}`,
                duration: 'long'
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-slate-800 dark:text-zinc-200">
            <HomeHeader isLoggedIn={true} membershipLevel={membershipLevel} />

            {/* --- HERO SECTION --- */}
            <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20 pt-16 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-800/50 rounded-full border border-purple-500/30 mb-6 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-medium text-purple-100 tracking-wide">DIGITAL LIBRARY</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Material</span>
                    </h1>
                    <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Curated PDF notes and reference materials for your preparation.
                    </p>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}

            {/* Native Download Progress Overlay */}
            {isDownloading && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 backdrop-blur-md">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">Downloading PDF...</span>
                        <div className="w-32 h-1 bg-zinc-700 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${downloadProgress}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-xs font-mono">{downloadProgress}%</span>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">

                {/* Marquee Banner */}
                <div className="mb-8 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 rounded-2xl py-3 px-4 shadow-sm overflow-hidden relative flex items-center">
                    <div className="shrink-0 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mr-4 shadow-sm z-10 relative">
                        Important Update
                    </div>
                    <div className="overflow-hidden relative flex-1 mask-linear-fade">
                        <div className="animate-marquee whitespace-nowrap inline-block text-amber-900 dark:text-amber-100 font-medium text-sm md:text-base">
                            <span className="mr-8"></span>
                            To ensure 99.99% accuracy, our team is currently updating all notes to include the latest amendments up to 31.12.2025. We appreciate your patience while we craft the highest quality content for you.
                        </div>
                    </div>
                    <style jsx>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-100%); }
                        }
                        .animate-marquee {
                            animation: marquee 25s linear infinite;
                            padding-left: 100%;
                            display: inline-block;
                        }
                        .animate-marquee:hover {
                            animation-play-state: paused;
                        }
                    `}</style>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-6 md:mb-8 sticky top-[64px] z-30 px-4 md:px-0">
                    <div className="w-full md:w-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-lg border border-slate-200/60 dark:border-zinc-800 grid grid-cols-3 md:inline-flex md:grid-cols-none gap-2">
                        {["Paper I", "Paper III", "SB Orders"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    relative p-2 md:px-6 md:py-2.5 rounded-lg md:rounded-xl font-bold text-[11px] xs:text-xs md:text-sm transition-colors duration-200 flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap outline-none
                                    ${activeTab === tab
                                        ? 'text-white'
                                        : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'
                                    } 
                                `}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-purple-600 rounded-lg md:rounded-xl shadow-md"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                                    <Layers className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                                    <span>{tab}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pb-20">
                    {PDF_DATA[activeTab as keyof typeof PDF_DATA]?.map((file, index) => (
                        <div
                            key={index}
                            className={`group bg-white dark:bg-zinc-900 rounded-2xl p-3 md:p-6 border shadow-sm transition-all duration-300 flex flex-col ${file.comingSoon
                                ? 'border-zinc-200 dark:border-zinc-800 opacity-90'
                                : 'border-slate-100 dark:border-zinc-800 hover:border-purple-200 dark:hover:border-purple-500/30 hover:shadow-xl hover:-translate-y-1'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 md:p-3 rounded-xl ${file.comingSoon
                                    ? membershipLevel === 'gold' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500' : 'bg-red-50 dark:bg-red-900/20 text-red-400'
                                    : file.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' :
                                        file.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400' :
                                            file.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' :
                                                file.color === 'rose' ? 'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400' :
                                                    file.color === 'amber' ? 'bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' :
                                                        file.color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400' :
                                                            file.color === 'cyan' ? 'bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400' :
                                                                file.color === 'violet' ? 'bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400' :
                                                                    file.color === 'fuchsia' ? 'bg-fuchsia-50 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400' :
                                                                        file.color === 'teal' ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400' :
                                                                            file.color === 'sky' ? 'bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400' :
                                                                                'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                                    }`}>
                                    {file.comingSoon && membershipLevel !== 'gold' ? (
                                        <Lock className="w-6 h-6 md:w-8 md:h-8" />
                                    ) : (
                                        <FileText className="w-6 h-6 md:w-8 md:h-8" />
                                    )}
                                </div>
                                <span className={`text-[10px] md:text-sm font-bold px-2 py-1 rounded-md ${file.comingSoon ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                                    }`}>
                                    {file.comingSoon ? 'SOON' : 'PDF'}
                                </span>
                            </div>

                            <h3 className={`text-sm md:text-lg font-bold mb-1 md:mb-2 leading-tight transition-colors ${file.comingSoon ? 'text-zinc-600 dark:text-zinc-500' : 'text-slate-800 dark:text-zinc-100 group-hover:text-purple-700 dark:group-hover:text-purple-400'
                                }`}>
                                {file.title}
                                {file.subtitle && (
                                    <span className="block text-[10px] md:text-sm font-normal italic text-slate-500 dark:text-zinc-500 mt-1">
                                        {file.subtitle}
                                    </span>
                                )}
                            </h3>
                            <p className="text-[10px] md:text-sm text-slate-500 dark:text-zinc-400 mb-4 md:mb-6 flex-grow leading-relaxed line-clamp-2 md:line-clamp-none">
                                {file.description}
                            </p>

                            {file.comingSoon ? (
                                membershipLevel === 'gold' ? (
                                    <div className="mt-auto relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/40 border border-amber-200 dark:border-amber-800/50 p-3 flex flex-col items-center justify-center text-center group-hover:from-amber-100 group-hover:to-amber-200 dark:group-hover:from-amber-900/60 dark:group-hover:to-amber-900/60 transition-all">
                                        <div className="relative flex items-center gap-2 text-amber-900 dark:text-amber-100 font-bold text-sm mb-1">
                                            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                            <span>Coming Soon</span>
                                        </div>
                                        <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                                            Materials will be uploaded on {getReleaseDate(file.title)}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-auto relative overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 flex flex-col items-center justify-center text-center">
                                        <div className="relative flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold text-sm mb-1">
                                            <Lock className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                                            <span>LOCKED</span>
                                        </div>
                                        <Link href="/pricing" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                            Upgrade to Gold to view schedule
                                        </Link>
                                    </div>
                                )
                            ) : (
                                membershipLevel === 'gold' || file.isFree ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-1.5 md:gap-3 mt-auto">
                                            <button
                                                onClick={() => handleActionRequest('view', file.path || '', file.title)}
                                                className="flex items-center justify-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-[10px] md:text-sm hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors border border-slate-200 dark:border-zinc-700"
                                            >
                                                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleActionRequest('download', file.path || '', file.title, file.filename || 'document.pdf')}
                                                className="flex items-center justify-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg bg-purple-600 text-white font-semibold text-[10px] md:text-sm hover:bg-purple-700 transition-all shadow-md hover:shadow-lg hover:shadow-purple-500/20"
                                            >
                                                <Download className="w-3 h-3 md:w-4 md:h-4" />
                                                Download
                                            </button>
                                        </div>
                                        <div className="mt-3 text-center">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-300 dark:text-zinc-600 font-semibold">{file.size}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-auto relative overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 flex flex-col items-center justify-center text-center">
                                        <div className="relative flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold text-sm mb-1">
                                            <Lock className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                                            <span>PREMIUM</span>
                                        </div>
                                        <Link href="/pricing" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                            Upgrade to Gold to unlock
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                    ))}

                    {(!PDF_DATA[activeTab as keyof typeof PDF_DATA] || PDF_DATA[activeTab as keyof typeof PDF_DATA].length === 0) && (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-slate-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-300 dark:text-zinc-600" />
                            </div>
                            <p className="text-slate-400 dark:text-zinc-500">No notes available for {activeTab} yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- PDF VIEWER MODAL --- */}
            {selectedPdf && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 rounded-none sm:rounded-2xl w-full h-full max-w-6xl flex flex-col shadow-2xl overflow-hidden relative">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 pb-3 pt-[calc(0.75rem+env(safe-area-inset-top))] sm:py-4 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-[60] w-full shrink-0">
                            <h3 className="font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2 text-sm sm:text-base truncate mr-2">
                                <FileText className="w-5 h-5 text-purple-600 shrink-0" />
                                <span className="truncate">{selectedPdf?.title || 'Document Viewer'}</span>
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPdfDarkMode(!pdfDarkMode)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors border ${pdfDarkMode
                                        ? 'bg-zinc-800 text-zinc-100 border-zinc-700'
                                        : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                                        }`}
                                >
                                    {pdfDarkMode ? <div className="w-4 h-4 rounded-full bg-yellow-400" /> : <div className="w-4 h-4 rounded-full bg-zinc-400" />}
                                    <span className="hidden sm:inline">{pdfDarkMode ? 'Light' : 'Dark'}</span>
                                </button>
                                <button
                                    onClick={() => handleActionRequest('download', selectedPdf?.url || '', selectedPdf?.title || '', selectedPdf?.url.split('/').pop() || 'download.pdf')}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold text-xs transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline">Download</span>
                                </button>
                                <button
                                    onClick={() => setSelectedPdf(null)}
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`flex-1 relative overflow-hidden ${pdfDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
                            {/* Use React-PDF for consistent viewing across all platforms */}
                            <PdfViewer url={selectedPdf?.url || ''} darkMode={pdfDarkMode} />
                        </div>
                    </div>
                </div>
            )}
            {/* --- ETHICS ADVISORY POPUP --- */}
            {showAdvisory && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-5 sm:p-6 text-white relative overflow-hidden shrink-0">
                            <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 absolute -bottom-2 -right-2 text-white/20" />
                            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                                Ethical Use Advisory
                            </h3>
                            <p className="text-red-100 text-xs sm:text-sm mt-1">Please read carefully before proceeding</p>
                        </div>

                        <div className="p-5 sm:p-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto space-y-3 sm:space-y-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                Paid members are respectfully advised not to share, circulate, forward, or distribute Dak Guru PDF Notes or other premium study materials to colleagues or non-paid users.
                            </p>
                            <p>
                                These materials are the result of extensive academic research, subject-matter expertise, and sustained effort by our dedicated content creators. Every note is carefully crafted to align with the latest syllabus, examination trends, and conceptual clarity required for departmental examinations.
                            </p>
                            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                                <p className="text-red-800 dark:text-red-200 font-medium text-xs sm:text-sm">
                                    Sharing paid content without authorization is not only a violation of professional ethics, but also undermines the Guru–Shishya values of respect, fairness, and integrity.
                                </p>
                            </div>
                            <p>
                                It directly affects the morale and livelihood of the educators and contributors who work tirelessly to support aspirants through high-quality resources. We sincerely request all paid members to uphold moral responsibility and professional discipline by using the materials strictly for personal academic purposes.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-red-500 text-xs sm:text-sm">
                                <li>Encouraging quality content creation</li>
                                <li>Sustaining affordable learning resources</li>
                                <li>Maintaining academic credibility and trust</li>
                            </ul>
                            <p className="font-bold text-center pt-2 text-zinc-800 dark:text-zinc-200 text-sm">
                                "Let us grow together by respecting knowledge, effort, and integrity." <br />
                                <span className="text-xs font-normal text-zinc-500">~ Team Dak Guru</span>
                            </p>
                        </div>

                        <div className="p-5 sm:p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
                            <label className="flex items-start gap-3 cursor-pointer group mb-5 select-none">
                                <div className="relative flex items-center mt-0.5">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={advisoryAgreed}
                                        onChange={(e) => setAdvisoryAgreed(e.target.checked)}
                                    />
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-zinc-300 rounded transition-colors peer-checked:bg-red-600 peer-checked:border-red-600 dark:border-zinc-600"></div>
                                    <Check className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 text-white left-1 top-0.5 sm:left-1 sm:top-1 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors leading-snug">
                                    I have read the advisory and agree to use these materials ethically for my personal use only.
                                </span>
                            </label>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowAdvisory(false)}
                                    className="flex-1 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors active:scale-95 duration-150"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdvisoryConfirm}
                                    disabled={!advisoryAgreed}
                                    className="flex-[2] py-3 sm:py-3.5 rounded-xl font-bold text-sm bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-700 hover:shadow-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 duration-150"
                                >
                                    Confirm & Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DOWNLOAD TOAST --- */}
            {showDownloadToast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-zinc-900 dark:bg-zinc-800 dark:border dark:border-zinc-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-green-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">Download Started</span>
                        <span className="text-xs text-zinc-400">Check your Downloads folder</span>
                    </div>
                </div>
            )}
        </div>
    );
}
