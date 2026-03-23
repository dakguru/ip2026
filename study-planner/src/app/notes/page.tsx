"use client";

import React, { useState, useEffect, useRef } from 'react';
import HomeHeader from '@/components/HomeHeader';
import { FileText, Download, Eye, BookOpen, Layers, Clock, Sparkles, Lock, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCourse } from '@/contexts/CourseContext';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
    loading: () => <div className="flex items-center justify-center h-full text-slate-400">Loading viewer...</div>,
    ssr: false
});
import { PSGB_PDF_DATA } from '@/data/psgbPdfData';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import { FileOpener } from '@capacitor-community/file-opener';
import AppScreenWrapper from '@/components/AppScreenWrapper';
import { ShieldAlert, Info } from 'lucide-react';
import { App } from '@capacitor/app';
import ConfirmExitModal from '@/components/ConfirmExitModal';

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
    isCommemorative?: boolean;
}

// Map for scheduled dates
const SCHEDULE_MAPPING: Record<string, string> = {
    "Consumer Protection Act, 2019": "19-01-2026",
    "Information Technology Act, 2000": "21-01-2026",
    "Government Savings Promotion Rules, 2018": "26-01-2026",

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
    "Core Banking Solutions (Working knowledge of CBS)": "13-03-2026",
    "India Post Payments Bank": "14-03-2026",
    "Preservation of Records": "16-03-2026",
    "CCS (Conduct) Rules, 1964": "17-03-2026",
    "CCS (CCA) Rules, 1965": "18-03-2026",
    "CCS (Temporary Service) Rules, 1965": "20-03-2026",
    "GDS (Conduct & Engagement) Rules, 2020": "20-03-2026",
    "Constitution of India": "14-04-2026",
    "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023": "31-03-2026",
    "Central Administrative Tribunal Act, 1985": "01-04-2026",
    "Revenue Recovery Act, 1890": "02-04-2026",
    "Prevention of Corruption Act, 1988": "03-04-2026",
    "RTI Act, 2005 and RTI Rules, 2012": "06-04-2026",
    "Manual for Procurement of Goods & Services": "08-04-2026",
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
            title: "PO Small Savings Schemes",
            description: "Comprehensive notes on Small Savings Schemes including practice questions.",
            filename: "PO_Small_Savings_Schemes.pdf",
            path: "/notes/paper-1/PO_Small_Savings_Schemes.pdf",
            size: "4.3 MB",
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
            size: "4.1 MB",
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
        {
            title: "MNOP & PNOP Guidelines",
            description: "Mail & Parcel Network Optimization Projects.",
            filename: "MNOP_PNOP.pdf",
            path: "/notes/paper-1/MNOP_PNOP.pdf",
            size: "0.7 MB",
            color: "fuchsia"
        },
        {
            title: "Consolidation of Products & Centralized Delivery Policy",
            description: "Guidelines for delivery staff.",
            filename: "Consolidation_Products_Centralized_Delivery_Policy.pdf",
            path: "/notes/paper-1/Consolidation_Products_Centralized_Delivery_Policy.pdf",
            size: "4.2 MB",
            color: "fuchsia"
        },
        {
            title: "Dak Ghar Niryat Kendra (DNKs)",
            description: "Guidelines for export centers.",
            filename: "Dak_Ghar_Niryat_Kendra.pdf",
            path: "/notes/paper-1/Dak_Ghar_Niryat_Kendra.pdf",
            size: "4.2 MB",
            color: "fuchsia"
        },


        {
            title: "POSB (CBS) Manual",
            description: "Corrected up to 31.12.2021 and subsequent orders.",
            filename: "POSB_CBS_MANUAL.pdf",
            path: "/notes/paper-1/POSB_CBS_MANUAL.pdf",
            size: "0.5 MB",
            color: "teal"
        },

        // 40. Reports
        {
            title: "Annual Reports & Book of Information",
            description: "Department of Posts annual data.",
            filename: "Annual_Report_and_Book_of_Information.pdf",
            path: "/notes/paper-1/Annual_Report_and_Book_of_Information.pdf",
            size: "4.5 MB",
            color: "slate"
        },

        // 41. IT
        {
            title: "APT Knowledge (IT 2.0)",
            description: "Advanced Postal Technology.",
            filename: "APT_Knowledge_IT_2.0.pdf",
            path: "/notes/paper-1/APT_Knowledge_IT_2.0.pdf",
            size: "0.8 MB",
            color: "sky"
        },
        {
            title: "Core Banking Solutions (Working knowledge of CBS)",
            description: "Working knowledge of CBS.",
            filename: "Working_knowledge_of_CBS.pdf",
            path: "/notes/paper-1/Working_knowledge_of_CBS.pdf",
            size: "0.4 MB",
            color: "sky"
        },

        // 43. IPPB
        {
            title: "India Post Payments Bank",
            description: "Operations and guidelines for India Post Payments Bank.",
            filename: "India_Post_Payments_Bank.pdf",
            path: "/notes/paper-1/India_Post_Payments_Bank.pdf",
            size: "0.8 MB",
            color: "indigo"
        },

        // 44. Records
        {
            title: "Preservation of Records",
            description: "Disposal and preservation of postal records.",
            filename: "Preservation_Period_of_Records.pdf",
            path: "/notes/paper-1/Preservation_Period_of_Records.pdf",
            size: "0.5 MB",
            color: "gray"
        },

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
        { title: "Constitution of India", description: "Comprehensive notes on the Preamble, Fundamental Rights, Fundamental Duties, and key Constitutional Articles.", color: "amber", comingSoon: true, isCommemorative: true },

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
        {
            title: "Manual for Procurement of Goods & Services",
            description: "Procurement Manual Part I, II & III",
            filename: "Manual_for_Procurement_of_Goods_and_Services.pdf",
            path: "/notes/paper-3/Manual_for_Procurement_of_Goods_and_Services.pdf",
            size: "0.6 MB",
            color: "slate"
        },

        // 19-21. CCS Rules
        {
            title: "CCS (Leave) Rules, 1972",
            description: "Central Civil Services (Leave) Rules, 1972.",
            filename: "CCS_Leave_Rules_1972.pdf",
            path: "/notes/paper-3/CCS_Leave_Rules_1972.pdf",
            size: "0.3 MB",
            color: "teal"
        },
        {
            title: "CCS (GPF) Rules, 1961",
            description: "General Provident Fund rules.",
            filename: "CCS_GPF_Rules_1961.pdf",
            path: "/notes/paper-3/CCS_GPF_Rules_1961.pdf",
            size: "0.8 MB",
            color: "teal"
        },
        {
            title: "CCS (Pension) Rules, 2021",
            description: "New pension rules and amendments.",
            filename: "CCS_Pension_Rules_2021.pdf",
            path: "/notes/paper-3/CCS_Pension_Rules_2021.pdf",
            size: "0.8 MB",
            color: "teal"
        },
        {
            title: "CCS (Commutation of Pension) Rules, 1981",
            description: "Commutation rules.",
            filename: "CCS_Commutation_Pension_Rules_1981.pdf",
            path: "/notes/paper-3/CCS_Commutation_Pension_Rules_1981.pdf",
            size: "0.5 MB",
            color: "teal"
        },

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
        {
            title: "CCS (Implementation of NPS) Rules, 2021",
            description: "National Pension System implementation.",
            filename: "CCS_Implementation_of_NPS_Rules_2021.pdf",
            path: "/notes/paper-3/CCS_Implementation_of_NPS_Rules_2021.pdf",
            size: "4.3 MB",
            color: "emerald"
        },
        {
            title: "CCS (Payment of Gratuity under NPS) Rules, 2021",
            description: "Gratuity rules for NPS employees.",
            filename: "CCS_Payment_of_Gratuity_under_NPS_Rules_2021.pdf",
            path: "/notes/paper-3/CCS_Payment_of_Gratuity_under_NPS_Rules_2021.pdf",
            size: "4.1 MB",
            color: "emerald"
        },

        // 25. GFR
        {
            title: "General Financial Rules, 2017",
            description: "Chapter 2 and 6 (and amendments).",
            filename: "General_Financial_Rules_2017.pdf",
            path: "/notes/paper-3/General_Financial_Rules_2017.pdf",
            size: "4.2 MB",
            color: "gray"
        },

        // 26. FR & SR
        {
            title: "FR & SR - General Rules",
            description: "Fundamental Rules (FR) and Supplementary Rules (SR) - General Rules.",
            filename: "FR_SR_General_Rules.pdf",
            path: "/notes/paper-3/FR_SR_General_Rules.pdf",
            size: "4.4 MB",
            color: "indigo"
        },
        {
            title: "FR & SR - TA Rules",
            description: "FR & SR - Traveling Allowance (TA) Rules.",
            filename: "FR_SR_TA_Rules.pdf",
            path: "/notes/paper-3/FR_SR_TA_Rules.pdf",
            size: "4.4 MB",
            color: "indigo"
        },
        {
            title: "FR & SR - DA, DR & HRA Rules",
            description: "FR & SR - Dearness Allowance (DA), Dearness Relief (DR) and House Rent Allowance (HRA) Rules.",
            filename: "FR_SR_DA_DR_HRA.pdf",
            path: "/notes/paper-3/FR_SR_DA_DR_HRA.pdf",
            size: "4.3 MB",
            color: "indigo"
        },

        // 27. Casual Labourers
        {
            title: "Brochure on Casual Labourers",
            description: "Instructions issued by DoP&T.",
            filename: "Brochure_Casual_Labourers.pdf",
            path: "/notes/paper-3/Brochure_Casual_Labourers.pdf",
            size: "0.6 MB",
            color: "amber"
        },

        // 28. APAR
        {
            title: "Maintenance of APAR",
            description: "Instructions by Directorate and DoP&T.",
            filename: "Maintenance_APAR.pdf",
            path: "/notes/paper-3/Maintenance_APAR.pdf",
            size: "0.6 MB",
            color: "orange"
        },

        // 29. Service Discharge
        {
            title: "Service Discharge Benefit Scheme, 2010",
            description: "SDBS details.",
            filename: "Service_Discharge_Benefit_Scheme.pdf",
            path: "/notes/paper-3/Service_Discharge_Benefit_Scheme.pdf",
            size: "0.7 MB",
            color: "rose"
        },
        {
            title: "Central Civil Services (Leave Travel Concession) Rules, 1988",
            description: "Central Civil Services (Leave Travel Concession) Rules, 1988",
            filename: "CCS_LTC_Rules_1988.pdf",
            path: "/notes/paper-3/CCS_LTC_Rules_1988.pdf",
            size: "4.2 MB",
            color: "emerald"
        },

        // 30. Financial Powers
        {
            title: "Schedule of Financial Powers",
            description: "Divisional Heads, Heads of Circle.",
            filename: "Schedule_of_Financial_Powers.pdf",
            path: "/notes/paper-3/Schedule_of_Financial_Powers.pdf",
            size: "1.2 MB",
            color: "blue"
        },

        // 31. Welfare Measures
        {
            title: "Welfare Measures",
            description: "For Departmental Employees and GDS.",
            filename: "Welfare_Measures_Employees_GDS.pdf",
            path: "/notes/paper-3/Welfare_Measures_Employees_GDS.pdf",
            size: "0.7 MB",
            color: "green"
        },

        // 32. FHB
        {
            title: "P&T FHB Vol I",
            description: "P&T Financial Hand Book Volume I.",
            filename: "FHB_Vol_I.pdf",
            path: "/notes/paper-3/FHB_Vol_I.pdf",
            size: "0.9 MB",
            color: "violet"
        },
        {
            title: "Postal FHB Vol II",
            description: "Postal Financial Hand Book Volume II.",
            filename: "FHB_Vol_II.pdf",
            path: "/notes/paper-3/FHB_Vol_II.pdf",
            size: "0.8 MB",
            color: "violet"
        },
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
    const { course } = useCourse();
    const isPS = course === 'PS_GR_B';
    const TABS = isPS ? ["Paper I", "Paper II", "SB Orders"] : ["Paper I", "Paper III", "SB Orders"];

    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPdf, setSelectedPdf] = useState<{ url: string, title: string } | null>(null);
    const [membershipLevel, setMembershipLevel] = useState<'free' | 'silver' | 'gold'>('free');
    const [planId, setPlanId] = useState<string>('');
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Advisory Modal State
    const [showAdvisory, setShowAdvisory] = useState(false);
    const [showAccuracyAdvisory, setShowAccuracyAdvisory] = useState(false);
    const [advisoryAgreed, setAdvisoryAgreed] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ type: 'view' | 'download', url: string, title: string, filename?: string } | null>(null);

    // --- ANDROID BACK BUTTON HANDLING ---
    const selectedPdfRef = useRef(selectedPdf);
    const showAdvisoryRef = useRef(showAdvisory);
    const showAccuracyAdvisoryRef = useRef(showAccuracyAdvisory);
    const showExitConfirmRef = useRef(showExitConfirm);

    useEffect(() => {
        selectedPdfRef.current = selectedPdf;
        showAdvisoryRef.current = showAdvisory;
        showAccuracyAdvisoryRef.current = showAccuracyAdvisory;
        showExitConfirmRef.current = showExitConfirm;
    }, [selectedPdf, showAdvisory, showAccuracyAdvisory, showExitConfirm]);

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;

        const listenerPromise = App.addListener('backButton', (data) => {
            if (showExitConfirmRef.current) {
                setShowExitConfirm(false);
            } else if (selectedPdfRef.current) {
                setShowExitConfirm(true);
            } else if (showAdvisoryRef.current || showAccuracyAdvisoryRef.current) {
                setShowAdvisory(false);
                setShowAccuracyAdvisory(false);
            } else {
                if (data.canGoBack) {
                    window.history.back();
                } else {
                    App.exitApp();
                }
            }
        });

        return () => {
            listenerPromise.then(handle => handle.remove());
        };
    }, []);

    const handleExitRequest = () => {
        if (selectedPdf) {
            setShowExitConfirm(true);
        } else {
            setSelectedPdf(null);
        }
    };

    const confirmExit = () => {
        setSelectedPdf(null);
        setShowExitConfirm(false);
    };

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

    const handleAdvisoryConfirm = async () => {
        setShowAdvisory(false);
        if (pendingAction) {
            const action = pendingAction; // Capture before clearing
            setPendingAction(null);       // Clear state immediately so UI closes cleanly
            if (action.type === 'view') {
                setSelectedPdf({ url: action.url, title: action.title });
            } else if (action.type === 'download' && action.filename) {
                await performDownload(action.url, action.filename);
            }
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
                        if (session.planId) setPlanId(session.planId);
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

    const getReleaseDate = (title: string, fallback: string = "or before 31.03.2026") => {
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

            // DownloadManager needs absolute, properly encoded URLs.
            // Paths may contain spaces, commas, and other special characters
            // that break Android's Uri.parse() if not encoded.
            let downloadUrl: string;
            if (url.startsWith('http')) {
                downloadUrl = url;
            } else {
                // Encode each segment of the path individually to handle
                // spaces, commas, etc. while preserving the '/' separators
                const encodedPath = url.split('/').map(segment => encodeURIComponent(segment)).join('/');
                downloadUrl = `https://dakguru.com${encodedPath}`;
            }

            // Ensure we have a clean filename for saving
            const safeFilename = filename || url.split('/').pop() || 'document.pdf';

            console.log('[PdfDownload] Downloading URL:', downloadUrl);
            console.log('[PdfDownload] Filename:', safeFilename);

            // The plugin handles permissions, download, notification, and auto-open
            await PdfDownloader.downloadPdf({ url: downloadUrl, filename: safeFilename });

            // Show toast confirming download was initiated
            setShowDownloadToast(true);

        } catch (error: any) {
            console.error("Download failed", error);
            setIsDownloading(false);
            setDownloadProgress(0);
            const message = error?.message || 'Unknown error';
            await Toast.show({
                text: `Download failed: ${message}`,
                duration: 'long'
            });
        }
    };

    const activeData = isPS ? { ...PSGB_PDF_DATA, "SB Orders": PDF_DATA["SB Orders"] } : PDF_DATA;
    // Diamond logic: if in PSGB mode, only allow access if the plan ID has 'diamond', else default to gold check.
    const hasPremiumAccess = isPS
        ? (membershipLevel === 'gold' && (planId?.includes('diamond') || planId?.includes('ps_gr_b')))
        : membershipLevel === 'gold';

    return (
        <AppScreenWrapper hideStatusBarPadding={true}>
            <div className="bg-slate-50 dark:bg-zinc-950 font-sans text-slate-800 dark:text-zinc-200">
                <HomeHeader isLoggedIn={true} membershipLevel={membershipLevel} />

                {/* --- HERO SECTION --- */}
                <div className={`relative ${course === 'PS_GR_B' ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-indigo-900' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'} text-white pb-20 pt-16 px-6 overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-96 h-96 ${course === 'PS_GR_B' ? 'bg-teal-500/10' : 'bg-purple-500/10'} rounded-full blur-3xl -mr-20 -mt-20`}></div>
                    <div className={`absolute bottom-0 left-0 w-64 h-64 ${course === 'PS_GR_B' ? 'bg-indigo-500/10' : 'bg-blue-500/10'} rounded-full blur-3xl -ml-10 -mb-10`}></div>

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 ${course === 'PS_GR_B' ? 'bg-teal-800/50 border-teal-500/30' : 'bg-purple-800/50 border-purple-500/30'} rounded-full border mb-6 backdrop-blur-sm`}>
                            <BookOpen className={`w-4 h-4 ${course === 'PS_GR_B' ? 'text-teal-300' : 'text-purple-300'}`} />
                            <span className={`text-sm font-medium ${course === 'PS_GR_B' ? 'text-teal-100' : 'text-purple-100'} tracking-wide`}>
                                {course === 'PS_GR_B' ? "LDCE PS GR 'B' DIGITAL LIBRARY" : "LDCE IP DIGITAL LIBRARY"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Study <span className={`text-transparent bg-clip-text bg-gradient-to-r ${course === 'PS_GR_B' ? 'from-teal-400 to-cyan-300' : 'from-purple-400 to-pink-300'}`}>Material</span>
                        </h1>
                        <p className={`text-lg ${course === 'PS_GR_B' ? 'text-teal-200' : 'text-purple-200'} max-w-2xl mx-auto mb-2 leading-relaxed`}>
                            Curated PDF notes and reference materials for your preparation.
                        </p>
                        <button
                            onClick={() => setShowAccuracyAdvisory(true)}
                            className="text-white/60 hover:text-white text-xs underline decoration-white/30 underline-offset-4 transition-colors font-medium"
                        >
                            Accuracy & Reference Advisory
                        </button>
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
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
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
                                            className={`absolute inset-0 ${course === 'PS_GR_B' ? 'bg-teal-600' : 'bg-purple-600'} rounded-lg md:rounded-xl shadow-md`}
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

                    {/* Search Bar */}
                    <div className="px-4 md:px-0 mb-4 md:mb-6">
                        <div className="relative max-w-2xl mx-auto">
                            {/* Gradient glow background */}
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-60 blur-sm" />
                            <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden border border-white/20">
                                {/* Search Icon */}
                                <div className="flex items-center justify-center pl-3.5 md:pl-4 pr-1 shrink-0">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                    </svg>
                                </div>
                                {/* Input */}
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search topics, acts, rules..."
                                    className="flex-1 bg-transparent py-2.5 md:py-3 px-2 md:px-3 text-xs md:text-sm text-slate-700 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 outline-none min-w-0"
                                />
                                {/* Clear button */}
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="flex items-center justify-center w-7 h-7 mr-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 dark:text-zinc-500 transition-colors shrink-0"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                                {/* Decorative pill badge */}
                                <div className="hidden sm:flex items-center gap-1 mr-3 px-2 py-1 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 shrink-0">
                                    <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-300 whitespace-nowrap">Quick Find</span>
                                </div>
                            </div>
                            {/* Colourful dots decoration */}
                            <div className="absolute right-3 -top-1 flex gap-0.5 pointer-events-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-70" />
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-70" />
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 opacity-70" />
                            </div>
                        </div>
                        {/* Result count hint */}
                        {searchQuery && (
                            <p className="text-center text-[11px] md:text-xs text-slate-400 dark:text-zinc-500 mt-1.5">
                                {(() => {
                                    const count = activeData[activeTab as keyof typeof activeData]?.filter(f =>
                                        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        (f.description && f.description.toLowerCase().includes(searchQuery.toLowerCase()))
                                    ).length ?? 0;
                                    return count === 0 ? 'No results found' : `${count} result${count !== 1 ? 's' : ''} found`;
                                })()}
                            </p>
                        )}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pb-20">
                        {(searchQuery
                            ? activeData[activeTab as keyof typeof activeData]?.filter(f =>
                                f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (f.description && f.description.toLowerCase().includes(searchQuery.toLowerCase()))
                              )
                            : activeData[activeTab as keyof typeof activeData]
                        )?.map((file, index) => (
                            <div
                                key={index}
                                className={`group rounded-2xl p-3 md:p-6 border shadow-sm transition-all duration-300 flex flex-col relative overflow-hidden ${
                                    file.isCommemorative
                                    ? 'border-amber-400/80 dark:border-amber-600/60 ring-1 ring-amber-300/60 dark:ring-amber-700/40 shadow-lg shadow-amber-200/40 dark:shadow-amber-800/20 gold-shine-card'
                                    : 'bg-white dark:bg-zinc-900'
                                } ${
                                    !file.isCommemorative && file.comingSoon
                                    ? 'border-zinc-200 dark:border-zinc-800 opacity-90'
                                    : !file.isCommemorative
                                    ? 'border-slate-100 dark:border-zinc-800 hover:border-purple-200 dark:hover:border-purple-500/30 hover:shadow-xl hover:-translate-y-1'
                                    : ''
                                    }`}
                                style={file.isCommemorative ? { 
                                    backgroundImage: 'url("/images/constitution-card.jpg")',
                                    backgroundSize: '100% 100%',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                } : undefined}
                            >
                                {file.isCommemorative && (
                                     <div className="absolute inset-0 pointer-events-none gold-shimmer-overlay z-10" />
                                )}

                                <div className={`flex flex-col h-full relative z-20 ${file.isCommemorative ? 'p-1 md:p-3' : ''}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                                            file.isCommemorative
                                            ? 'bg-amber-100/40 backdrop-blur-sm shadow-sm ring-1 ring-amber-200/50'
                                            : file.comingSoon
                                            ? hasPremiumAccess ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500' : 'bg-red-50 dark:bg-red-900/20 text-red-400'
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
                                            {file.comingSoon && !hasPremiumAccess && !file.isCommemorative ? (
                                                <Lock className="w-6 h-6 md:w-8 md:h-8" />
                                            ) : (
                                                <FileText className={`w-6 h-6 md:w-8 md:h-8 ${file.isCommemorative ? 'text-amber-900' : ''}`} />
                                            )}
                                        </div>
                                        <span className={`text-[9px] md:text-xs font-bold px-1.5 py-1 rounded-md italic tracking-wide transition-all duration-300 ${
                                            file.isCommemorative
                                            ? 'bg-amber-600 text-white shadow-md'
                                            : file.comingSoon ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                                            }`} style={file.isCommemorative ? { fontFamily: "'Georgia', 'Times New Roman', serif" } : undefined}>
                                            {file.isCommemorative ? '✦ GOLD Exclusive' : file.comingSoon ? 'SOON' : 'PDF'}
                                        </span>
                                    </div>

                                    <h3 className={`text-base md:text-xl font-black mb-1 md:mb-2 leading-tight transition-all duration-300 ${
                                        file.isCommemorative ? 'text-slate-900' : file.comingSoon ? 'text-zinc-600 dark:text-zinc-500' : 'text-slate-800 dark:text-zinc-100 group-hover:text-purple-700 dark:group-hover:text-purple-400'
                                        }`}>
                                        {file.title}
                                        {file.subtitle && (
                                            <span className="block text-[10px] md:text-sm font-normal italic text-slate-500 dark:text-zinc-500 mt-1">
                                                {file.subtitle}
                                            </span>
                                        )}
                                    </h3>
                                    <p className={`text-[10px] md:text-[15px] font-semibold leading-relaxed line-clamp-2 md:line-clamp-none mb-4 md:mb-6 ${
                                        file.isCommemorative ? 'text-[#334155]' : 'text-slate-500 dark:text-zinc-400'
                                    }`}>
                                        {file.description}
                                    </p>
                                </div>

                                {file.comingSoon ? (
                                    hasPremiumAccess ? (
                                        file.isCommemorative ? (
                                            /* ── Special Commemorative Banner for Constitution of India ── */
                                            <div className="mt-auto relative overflow-hidden rounded-xl border border-amber-400/50 p-2 md:p-4 flex flex-col items-center justify-center text-center z-20" style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}>
                                                {/* Ashoka Chakra watermark */}
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
                                                    <svg viewBox="0 0 200 200" className="w-24 h-24 md:w-40 md:h-40" fill="currentColor" style={{ color: '#1e3a5f' }}>
                                                        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2.5" />
                                                        <circle cx="100" cy="100" r="15" />
                                                        {[...Array(24)].map((_, i) => (
                                                            <line key={i} x1="100" y1="25" x2="100" y2="85" stroke="currentColor" strokeWidth="2" transform={`rotate(${i * 15} 100 100)`} />
                                                        ))}
                                                    </svg>
                                                </div>
                                                <div className="relative z-10 w-full">
                                                    <div className="flex items-center gap-1 justify-center mb-1">
                                                        <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-700" />
                                                        <span className="text-[9px] md:text-[14px] font-black tracking-tight uppercase" style={{ color: '#854d0e' }}>Uploading on 14th April 2026</span>
                                                    </div>
                                                    <p className="text-[7px] md:text-[11px] font-bold italic text-slate-600 mb-0.5">On the Birth Anniversary of</p>
                                                    <p className="text-[11px] md:text-[16px] font-black tracking-tight leading-none px-0.5" style={{ color: '#172554' }}>Dr. B. R. Ambedkar</p>
                                                    <p className="text-[7.5px] md:text-[11px] font-bold italic mt-0.5 text-slate-600 leading-tight">Architect of the Indian Constitution</p>
                                                </div>
                                            </div>
                                        ) : (
                                        <div className="mt-auto relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/40 border border-amber-200 dark:border-amber-800/50 p-3 flex flex-col items-center justify-center text-center group-hover:from-amber-100 group-hover:to-amber-200 dark:group-hover:from-amber-900/60 dark:group-hover:to-amber-900/60 transition-all">
                                            <div className="relative flex items-center gap-2 text-amber-900 dark:text-amber-100 font-bold text-sm mb-1">
                                                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                                <span>Coming Soon</span>
                                            </div>
                                            <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                                                Materials will be uploaded on {getReleaseDate(file.title)}
                                            </p>
                                        </div>
                                        )
                                    ) : (
                                        <div className="mt-auto relative overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 flex flex-col items-center justify-center text-center">
                                            <div className="relative flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold text-sm mb-1">
                                                <Lock className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                                                <span>LOCKED</span>
                                            </div>
                                            <Link href="/pricing" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                                Upgrade to {isPS ? 'Diamond' : 'Gold'} to view schedule
                                            </Link>
                                        </div>
                                    )
                                ) : (
                                    hasPremiumAccess || file.isFree ? (
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
                                                    className={`flex items-center justify-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg text-white font-semibold text-[10px] md:text-sm hover:shadow-lg transition-all shadow-md ${course === 'PS_GR_B' ? 'bg-teal-600 hover:bg-teal-700 hover:shadow-teal-500/20' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/20'}`}
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
                                                Upgrade to {isPS ? 'Diamond' : 'Gold'} to unlock
                                            </Link>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}

                        {(!activeData[activeTab as keyof typeof activeData] || activeData[activeTab as keyof typeof activeData].length === 0) && (
                            <div className="col-span-full py-20 text-center">
                                <div className="bg-slate-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-slate-300 dark:text-zinc-600" />
                                </div>
                                <p className="text-slate-400 dark:text-zinc-500">No notes available for {activeTab} yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- SMART PDF READER MODAL --- */}
                {selectedPdf && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-zinc-900 rounded-none sm:rounded-2xl w-full h-full max-w-7xl flex flex-col shadow-2xl overflow-hidden relative">
                            {/* Compact Header */}
                            <div className="flex items-center justify-between px-3 sm:px-4 pb-2 pt-[calc(0.5rem+env(safe-area-inset-top))] sm:py-2.5 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-[60] w-full shrink-0">
                                <h3 className="font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2 text-sm truncate mr-2">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shrink-0">
                                        <FileText className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="truncate text-sm font-bold">{selectedPdf?.title || 'Document Viewer'}</span>
                                        <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">Dak Guru Smart Reader</span>
                                    </div>
                                </h3>
                                <button
                                    onClick={handleExitRequest}
                                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors shrink-0"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>

                            {/* Smart Reader Content */}
                            <div className="flex-1 relative overflow-hidden">
                                <PdfViewer url={selectedPdf?.url || ''} />
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

                {/* --- ACCURACY ADVISORY MODAL --- */}
                {showAccuracyAdvisory && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800">
                            <div className={`p-6 sm:p-8 text-center ${course === 'PS_GR_B' ? 'bg-teal-50 dark:bg-teal-900/10' : 'bg-blue-50 dark:bg-blue-900/10'}`}>
                                <div className={`w-16 h-16 rounded-2xl ${course === 'PS_GR_B' ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-blue-100 dark:bg-blue-900/30'} flex items-center justify-center mx-auto mb-4`}>
                                    <ShieldAlert className={`w-8 h-8 ${course === 'PS_GR_B' ? 'text-teal-600 dark:text-teal-400' : 'text-blue-600 dark:text-blue-400'}`} />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Accuracy & Reference Advisory</h3>
                            </div>

                            <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">
                                    While every effort has been made to carefully research, verify, and draft the Dak Guru PDF Notes with high academic diligence, there remains a possibility that certain factual inaccuracies, typographical errors, or interpretation differences may inadvertently exist.
                                </p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">
                                    Users are therefore strongly advised to cross-verify important information with official sources, including departmental manuals, government notifications, circulars, and other authoritative resources, before relying on the material for examination or professional purposes.
                                </p>
                                <div className={`p-5 rounded-2xl ${course === 'PS_GR_B' ? 'bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800/30' : 'bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30'}`}>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed text-center">
                                        If any error, discrepancy, or outdated information is identified in the notes, users are kindly requested to report it immediately through the dedicated <Link href="/social?tab=report" className="font-bold underline text-blue-600 dark:text-blue-400 hover:text-blue-700">“Report Error” section</Link> in DG Community Page, so that our academic team can promptly review, rectify, and update the material for the benefit of all aspirants.
                                    </p>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">
                                    Your cooperation helps us maintain the accuracy, reliability, and continuous improvement of Dak Guru learning resources.
                                </p>
                            </div>

                            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-center bg-zinc-50 dark:bg-zinc-900/50">
                                <button
                                    onClick={() => setShowAccuracyAdvisory(false)}
                                    className={`w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-95 ${course === 'PS_GR_B' ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'}`}
                                >
                                    I Understand
                                </button>
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

                <ConfirmExitModal 
                    isOpen={showExitConfirm}
                    onConfirm={confirmExit}
                    onCancel={() => setShowExitConfirm(false)}
                />
            </div>
        </AppScreenWrapper>
    );
}
