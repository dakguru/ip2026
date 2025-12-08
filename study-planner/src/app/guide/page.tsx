'use client';

import Link from "next/link";
import { ArrowLeft, FileText, Download, Eye } from "lucide-react";



const PAPER_I_FILES = [
    "Annual_Report_2024-2025 & Book of Information.pdf",
    "APY_PMSBY_PMJJBY.pdf",
    "BOOK_OF_BO_RULES.pdf",
    "CCS_(CCA)_Rules_1965.pdf",
    "CCS_(Conduct)_Rules_1964.pdf",
    "CCS_(Temporary_Service)_Rules_1965.pdf",
    "Consolidation_of_Products_and_Centralized_Delivery_of_All_Articles.pdf",
    "Consumer_Protection_Act_2019.pdf",
    "Daghar_Niryat_Kendra.pdf",
    "DIGIPIN.pdf",
    "GDS_Conduct_and_Engagement_Rules_2020.pdf",
    "GDS_General_Rules.pdf",
    "GSPA_1873.pdf",
    "GSPR_2018.pdf",
    "India_Post_Payments_Bank.pdf",
    "Information Technology Act_2000.pdf",
    "IT Modernization Project.pdf",
    "IT_Modernization_APT 2.0.pdf",
    "MNOP_PNOP.pdf",
    "PMLA_2002.pdf",
    "POLI_Rules_2011.pdf",
    "POSB_CBS_Manual_31122021.pdf",
    "Postal_Manual_Volume-IV.pdf",
    "Postal_Manual_Volume-VIII.pdf",
    "Postal_Manual_Volume_II.pdf",
    "Postal_Manual_Volume_III.pdf",
    "Postal_Manual_Volume_V.pdf",
    "Postal_Manual_Volume_VI.pdf",
    "Postal_Manual_Volume_VII.pdf",
    "Post_Office_Act_2023_and_Rules_2024.pdf",
    "Post_Office_Guide_Part-I.pdf",
    "Post_Office_Guide_Part-II.pdf",
    "Post_Office_Regulations_2024.pdf",
    "SB_Order_2019-2025.pdf",
    "Small Savings Schemes 2019.pdf",
    "The_Consumer_Protection_Act_2019_Pro.pdf"
];

const PAPER_II_FILES = [
    "1. Noting_Drafting.pdf",
    "2. Draft_a_Major_Penalty_Charge-Sheet.pdf"
];

const PAPER_III_FILES = [
    "APAR_Instructions.pdf",
    "Bhartiya_Nagrik_Suraksha_Sanhita_2023_(English)_unlocked.pdf",
    "Brochure_on_Casual_labours_and_instructions.pdf",
    "CCS_(Commutation_of_Pension)_Rules_1981.pdf",
    "CCS_(Leave)_Rules_1972.pdf",
    "CCS_(LTC)_Rules_1988.pdf",
    "CCS_(Pension)_Rules_2021.pdf",
    "CEA_and_Hostel_Subsidy.pdf",
    "CEGGIS_1980.pdf",
    "Central_Administrative_Tribunal_Act_1985.pdf",
    "COI NEW SYLLABUS.pdf",
    "COI OLD SYLLABUS.pdf",
    "FHB_Volume-I-2022.pdf",
    "FHB_Volume-II.pdf",
    "FRSR_Part-II_TA_Rules.pdf",
    "FRSR_Part-IV_DA_DR_HRA.pdf",
    "FRSR_Part-I_General_Rules.pdf",
    "GFR_2017.pdf",
    "GPF_(CS)_Rules_1960.pdf",
    "Manual_for_Procurement_of_Goods & Services.pdf",
    "National_Pension_System-2021.pdf",
    "Prevention_of_Corruption_Act_1988.pdf",
    "Revenue_Recovery_Act_1890.pdf",
    "RTI_Act_2005__Rules_2012.pdf",
    "SDBS 2011.pdf",
    "Sexual_Harrassment_Act_2013.pdf",
    "Welfare_measurement_of_Dept_Employee_and_GDS.pdf"
];

const cleanName = (name: string) => {
    return name.replace('.pdf', '').replace(/_/g, ' ').replace(/-/g, ' ');
};

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
            <div className="max-w-[1400px] mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
                        <span className="text-pink-600 dark:text-pink-500">Resource</span> Library
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                        Official manuals, acts, and rulebooks for LDCE 2026.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Paper I Section */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Paper I Resources</h2>
                                <p className="text-zinc-400 dark:text-zinc-500 text-sm">{PAPER_I_FILES.length} Documents</p>
                            </div>
                        </div>

                        <div className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {PAPER_I_FILES.map((file, idx) => (
                                <div key={idx} className="group flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-zinc-100 dark:border-zinc-700/50 hover:border-blue-100 dark:hover:border-blue-900/30 transition-all">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 truncate">
                                            {cleanName(file)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`/resources/paper1/${file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`/resources/paper1/${file}`}
                                            download
                                            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                                            title="Download"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Paper II Section */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Paper II Resources</h2>
                                <p className="text-zinc-400 dark:text-zinc-500 text-sm">{PAPER_II_FILES.length} Documents</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {PAPER_II_FILES.map((file, idx) => (
                                <div key={idx} className="group flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-zinc-100 dark:border-zinc-700/50 hover:border-purple-100 dark:hover:border-purple-900/30 transition-all">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-300 group-hover:text-purple-500 dark:group-hover:text-purple-400 shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 truncate">
                                            {cleanName(file)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`/resources/paper2/${file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`/resources/paper2/${file}`}
                                            download
                                            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                                            title="Download"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Paper III Section */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Paper III Resources</h2>
                                <p className="text-zinc-400 dark:text-zinc-500 text-sm">{PAPER_III_FILES.length} Documents</p>
                            </div>
                        </div>

                        <div className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {PAPER_III_FILES.map((file, idx) => (
                                <div key={idx} className="group flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-pink-50 dark:hover:bg-pink-900/20 border border-zinc-100 dark:border-zinc-700/50 hover:border-pink-100 dark:hover:border-pink-900/30 transition-all">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-300 group-hover:text-pink-500 dark:group-hover:text-pink-400 shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-pink-700 dark:group-hover:text-pink-300 truncate">
                                            {cleanName(file)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`/resources/paper3/${file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`/resources/paper3/${file}`}
                                            download
                                            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                                            title="Download"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
