"use client";

import React, { useState } from 'react';
import HomeHeader from '@/components/HomeHeader';
import { FileText, Download, Eye, BookOpen, Layers, Clock, Sparkles } from 'lucide-react';

// --- DATA ---
interface Note {
    title: string;
    description: string;
    filename?: string;
    path?: string;
    size?: string;
    color: string;
    comingSoon?: boolean;
}

const PDF_DATA: Record<string, Note[]> = {
    "Paper I": [
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
            filename: "PMLA_Act_2002.pdf",
            path: "/notes/paper-1/PMLA_Act_2002.pdf",
            size: "8.8 MB",
            color: "purple"
        },
        { title: "Consumer Protection Act, 2019", description: "Notes on rights of consumers and redressal mechanisms.", color: "blue", comingSoon: true },
        { title: "Information Technology Act, 2000", description: "Legal framework for electronic governance and cyber crimes.", color: "blue", comingSoon: true },

        // 6. Rules
        {
            title: "The Post Office Rules, 2024 & PO Regulations",
            description: "Detailed rules and regulations under the new Post Office Act.",
            filename: "PO_Act_2023_Rules_2024.pdf",
            path: "/notes/paper-1/PO_Act_2023_Rules_2024.pdf",
            size: "8.7 MB",
            color: "emerald"
        },
        { title: "Government Savings Promotion Rules, 2018", description: "General rules applicable to all Government Savings Schemes.", color: "emerald", comingSoon: true },
        { title: "Post Office Savings Account Scheme, 2019", description: "Rules governing POSA accounts.", color: "emerald", comingSoon: true },
        { title: "National Savings Recurring Deposit Scheme, 2019", description: "Rules for RD accounts.", color: "emerald", comingSoon: true },
        { title: "National Savings Time Deposit Scheme, 2019", description: "Rules for TD accounts (1, 2, 3, 5 years).", color: "emerald", comingSoon: true },
        { title: "National Savings (MIA) Scheme, 2019", description: "Monthly Income Account scheme details.", color: "emerald", comingSoon: true },
        { title: "Senior Citizens' Savings Scheme, 2019", description: "SCSS rules and regulations.", color: "emerald", comingSoon: true },
        { title: "National Savings Certificate (VIII Issue) Scheme", description: "NSC 2019 rules.", color: "emerald", comingSoon: true },
        { title: "Kisan Vikas Patra Scheme, 2019", description: "KVP rules and regulations.", color: "emerald", comingSoon: true },
        { title: "Public Provident Fund Scheme, 2019", description: "PPF rules and operation guidelines.", color: "emerald", comingSoon: true },
        { title: "Sukanya Samriddhi Account Scheme, 2019", description: "SSA rules for girl child welfare.", color: "emerald", comingSoon: true },

        // 17. PLI
        { title: "Post Office Life Insurance Scheme, 2011", description: "POLI Rules 2011 & amendments (SANKALAN).", color: "rose", comingSoon: true },

        // 18. Postal Manuals
        { title: "Book of BO Rules", description: "Rules for Branch Post Offices.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume II", description: "Organization and general regulations.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume III", description: "Discipline and Appeal rules.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume IV", description: "Leave, pension, gratuities, and establishment rules.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume VIII", description: "Manual for various postal operations.", color: "amber", comingSoon: true },
        { title: "Mail Operations and Money Remittances", description: "Guidelines on mail handling and remittances.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume V", description: "Except Appendix-1.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume VI, Part-I", description: "Chapter-1 details.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume VI, Part-II", description: "Except telegraphic money orders.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume VI, Part-III", description: "Except Appendices.", color: "amber", comingSoon: true },
        { title: "Postal Manual Volume VII", description: "RMS work and innovative guidelines.", color: "amber", comingSoon: true },

        // 29. Jansuraksha
        { title: "Jansuraksha Schemes", description: "PMJJBY, PMSBY, APY guidelines.", color: "orange", comingSoon: true },

        // 30. Inland/Foreign
        { title: "Post Office Guide Part-I", description: "Rules for Inland Post.", color: "cyan", comingSoon: true },
        { title: "Post Office Guide Part-II", description: "Except Section VII & VIII.", color: "cyan", comingSoon: true },
        { title: "Domestic/Foreign Post Guidelines", description: "Issued by Directorate.", color: "cyan", comingSoon: true },

        // 33. DIGIPIN
        { title: "DIGIPIN", description: "Basic understanding of Digital Personal Identification Number.", color: "violet", comingSoon: true },

        // 34. Network Optimization
        { title: "MNOP & PNOP Guidelines", description: "Mail & Parcel Network Optimization Projects.", color: "fuchsia", comingSoon: true },
        { title: "Centralized Delivery Policy", description: "Guidelines for delivery staff.", color: "fuchsia", comingSoon: true },
        { title: "Dak Ghar Niryat Kendra (DNKs)", description: "Guidelines for export centers.", color: "fuchsia", comingSoon: true },

        // 37. Product Consolidation
        { title: "Product Consolidation Guidelines", description: "Directorate instructions on consolidation.", color: "blue", comingSoon: true },

        // 38. Savings Bank
        { title: "SB Manual Vol I, II & III", description: "Read with SB orders issued by Directorate.", color: "teal", comingSoon: true },
        { title: "POSB (CBS) Manual", description: "Corrected up to 31.12.2021 and subsequent orders.", color: "teal", comingSoon: true },

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
        { title: "CCS (Conduct) Rules, 1964", description: "Code of conduct for government servants.", color: "red", comingSoon: true },
        { title: "CCS (CCA) Rules, 1965", description: "Classification, Control and Appeal rules.", color: "red", comingSoon: true },
        { title: "CCS (Temporary Service) Rules, 1965", description: "Rules for temporary service.", color: "red", comingSoon: true },
        { title: "GDS (Conduct & Engagement) Rules, 2020", description: "Rules related to Gramin Dak Sevaks.", color: "red", comingSoon: true },
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
        { title: "Central Administrative Tribunal Act, 1985", description: "CAT Act provisions.", color: "indigo", comingSoon: true },

        // 13. Revenue Recovery
        { title: "Revenue Recovery Act, 1890", description: "Act for recovery of public revenue.", color: "blue", comingSoon: true },

        // 14. POCA
        { title: "Prevention of Corruption Act, 1988", description: "As amended.", color: "red", comingSoon: true },

        // 15. RTI
        { title: "RTI Act, 2005 and RTI Rules, 2012", description: "Right to Information framework.", color: "cyan", comingSoon: true },

        // 16-18. Procurement Manual
        { title: "Manual on Procurement of Goods", description: "Procurement Manual Part i", color: "slate", comingSoon: true },
        { title: "Manual on Procurement of Works", description: "Procurement Manual Part ii", color: "slate", comingSoon: true },
        { title: "Manual on Procurement of Consultancy", description: "Procurement Manual Part iii", color: "slate", comingSoon: true },

        // 19-21. CCS Rules
        { title: "CCS (GPF) Rules, 1961", description: "General Provident Fund rules.", color: "teal", comingSoon: true },
        { title: "CCS (Pension) Rules, 2021", description: "New pension rules and amendments.", color: "teal", comingSoon: true },
        { title: "CCS (Commutation of Pension) Rules, 1981", description: "Commutation rules.", color: "teal", comingSoon: true },

        // 22. Sexual Harassment
        { title: "Sexual Harassment of Women at Workplace Act, 2013", description: "Prevention, Prohibition and Redressal.", color: "pink", comingSoon: true },

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
    ]
};

export default function NotesPage() {
    const [activeTab, setActiveTab] = useState("Paper I");
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <HomeHeader isLoggedIn={true} membershipLevel="silver" />

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-200/60 inline-flex gap-2">
                        {["Paper I", "Paper III"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === tab
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                <Layers className="w-4 h-4" />
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {PDF_DATA[activeTab as keyof typeof PDF_DATA]?.map((file, index) => (
                        <div
                            key={index}
                            className={`group bg-white rounded-2xl p-6 border shadow-sm transition-all duration-300 flex flex-col ${file.comingSoon
                                ? 'border-zinc-200 opacity-90'
                                : 'border-slate-100 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${file.comingSoon
                                    ? 'bg-zinc-100 text-zinc-400'
                                    : file.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        file.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                            file.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                                file.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                                                    file.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                                        file.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                                            file.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
                                                                file.color === 'violet' ? 'bg-violet-50 text-violet-600' :
                                                                    file.color === 'fuchsia' ? 'bg-fuchsia-50 text-fuchsia-600' :
                                                                        file.color === 'teal' ? 'bg-teal-50 text-teal-600' :
                                                                            file.color === 'sky' ? 'bg-sky-50 text-sky-600' :
                                                                                'bg-indigo-50 text-indigo-600'
                                    }`}>
                                    <FileText className="w-8 h-8" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${file.comingSoon ? 'bg-zinc-100 text-zinc-400' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {file.comingSoon ? 'SOON' : 'PDF'}
                                </span>
                            </div>

                            <h3 className={`text-lg font-bold mb-2 leading-tight transition-colors ${file.comingSoon ? 'text-zinc-600' : 'text-slate-800 group-hover:text-purple-700'
                                }`}>
                                {file.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">
                                {file.description}
                            </p>

                            {file.comingSoon ? (
                                <div className="mt-auto relative overflow-hidden rounded-xl bg-gradient-to-r from-zinc-50 to-zinc-100 border border-zinc-200 p-3 flex items-center justify-center group-hover:from-zinc-100 group-hover:to-zinc-200 transition-all">
                                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
                                    <div className="relative flex items-center gap-2 text-zinc-500 font-semibold text-sm">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                        <span>Coming Soon</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <button
                                            onClick={() => setSelectedPdf(file.path || null)}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors border border-slate-200"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                        <a
                                            href={file.path}
                                            download={file.filename}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-all shadow-md hover:shadow-lg hover:shadow-purple-500/20"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </a>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">{file.size}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {(!PDF_DATA[activeTab as keyof typeof PDF_DATA] || PDF_DATA[activeTab as keyof typeof PDF_DATA].length === 0) && (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-400">No notes available for {activeTab} yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- PDF VIEWER MODAL --- */}
            {selectedPdf && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full h-full max-w-6xl flex flex-col shadow-2xl overflow-hidden relative">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 w-full">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-purple-600" />
                                Document Viewer
                            </h3>
                            <button
                                onClick={() => setSelectedPdf(null)}
                                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-slate-100 relative">
                            <object
                                data={selectedPdf}
                                type="application/pdf"
                                className="w-full h-full absolute inset-0 rounded-b-2xl"
                            >
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
                                    <FileText className="w-12 h-12 text-slate-300 mb-4" />
                                    <p className="text-slate-600 font-medium mb-2">Unable to display PDF directly.</p>
                                    <p className="text-slate-400 text-sm mb-6 max-w-md">
                                        Your browser might not support embedding PDFs, or the file size is too large for the viewer.
                                    </p>
                                    <a
                                        href={selectedPdf}
                                        download
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg hover:shadow-purple-500/30 hover:bg-purple-700 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Instead
                                    </a>
                                </div>
                            </object>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
