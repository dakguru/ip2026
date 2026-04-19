
"use client";

import React, { useState } from 'react';
import {
    Book,
    Scale,
    FileText,
    Award,
    Globe,
    Shield,
    ExternalLink,
    ChevronRight,
    Menu,
    Briefcase,
    Landmark,
    Calculator,
    Mail,
    Home,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCourse } from '@/contexts/CourseContext';
import { psgbSyllabusData } from '@/data/psgbSyllabusData';
import AppScreenWrapper from '@/components/AppScreenWrapper';

// --- Data Structure for Syllabus ---

const syllabusData = {
    paper1: {
        title: "Paper I: Acts, Rules & Postal Manuals",
        subtitle: "125 Questions • 250 Marks • 2:30 Hours",
        description: "Comprehensive coverage of the core departmental acts, rules, regulations and manuals governing the postal operations.",
        sections: [
            {
                category: "1. Law Papers",
                icon: <Scale className="w-5 h-5" />,
                items: [
                    { name: "Prevention of Money Laundering Act, 2002 (AML/CFT)", link: "https://enforcementdirectorate.gov.in/sites/default/files/Act%26rules/THE%20PREVENTION%20OF%20MONEY%20LAUNDERING%20ACT%2C%202002.pdf" },
                    { name: "Consumer Protection Act, 2019", link: "https://www.indiacode.nic.in/handle/123456789/15256" },
                    { name: "Information Technology Act, 2000", link: "https://www.indiacode.nic.in/bitstream/123456789/13116/1/it_act_2000_updated.pdf" }
                ]
            },
            {
                category: "2. PO Acts and Rules",
                icon: <Landmark className="w-5 h-5" />,
                items: [
                    { name: "The Post Office Act, 2023 (Act No.43 of 2023)", link: "https://www.indiacode.nic.in/bitstream/123456789/20064/1/A2023-43.pdf" },
                    { name: "The Post Office Rules, 2024", link: "https://www.indiapost.gov.in/api/documents/file/U2FsdGVkX18YbtCQjFfkRpBCxl80aj4z8YmbyGSl0f5DTjV136-tGje7mBJaziCYk9yIi-9-H0CaZe1Iza0Img" },
                    { name: "The Post Office Regulations, 2024", link: "https://www.indiapost.gov.in/api/documents/file/U2FsdGVkX19OMUO4CSet8nPAf5rWenidP9IbZAf-3m0kDaEgT12dQeoHm_zUGsd7uQeHhdPfnGLO8ESRmGivzg" },
                    { name: "PO Guide Part I", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "PO Guide Part II", link: "https://www.indiapost.gov.in/documents/guidelines" }
                ]
            },
            {
                category: "3. Small Savings Schemes",
                icon: <Calculator className="w-5 h-5" />,
                items: [
                    { name: "Government Savings Promotion Act, 1873", link: "https://www.indiacode.nic.in/bitstream/123456789/2281/3/a1873-05.pdf" },
                    { name: "Government Savings Promotion Rules, 2018", link: "https://dea.gov.in/sites/default/files/GSPR%202018.pdf" },
                    { name: "PO Small Savings Schemes", link: "http://www.nsiindia.gov.in/" },
                    { name: "CBS Manual", link: "https://www.indiapost.gov.in/Financial/Pages/Content/SB-Orders.aspx" },
                    { name: "SB Orders", link: "https://www.indiapost.gov.in/Financial/Pages/Content/SB-Orders.aspx" },
                    { name: "India Post Payments Bank (IPPB)", link: "https://www.ippbonline.com/" },
                    { name: "Jansuraksha Schemes (PMJJBY, PMSBY, APY)", link: "https://jansuraksha.gov.in/" }
                ]
            },
            {
                category: "4. Postal Manuals and Guide",
                icon: <Book className="w-5 h-5" />,
                items: [
                    { name: "Book of BO Rules", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "Postal Manual Volume II", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "Postal Manual Volume III", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "Postal Manual Volume IV", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "Postal Manual Volume V", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "Postal Manual Volume VI (Parts I, II, III)", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "Postal Manual Volume VII", link: "https://www.indiapost.gov.in/documents/guidelines" },
                    { name: "Postal Manual Volume VIII", link: "https://www.indiapost.gov.in/documents/guidelines" }
                ]
            },
            {
                category: "5. Postal Life Insurance",
                icon: <Shield className="w-5 h-5" />,
                items: [
                    { name: "PLI Scheme 2011 & Amendments (SANKALAN)", link: "https://www.indiapost.gov.in/Financial/Pages/Content/pli-rules.aspx" }
                ]
            },
            {
                category: "6. Ops & Guidelines",
                icon: <Mail className="w-5 h-5" />,
                items: [
                    { name: "DIGIPIN (Digital Personal Identification Number)", link: "https://www.indiapost.gov.in/" },
                    { name: "Operational: MNOP, PNOP, Niryat Kendra", link: "https://www.indiapost.gov.in/MBE/Pages/Content/Parcel-Network.aspx" },
                    { name: "Preservation & Disposal of Records", link: "https://swachhportal.gov.in/" },
                    { name: "APT Knowledge (IT 2.0)", link: "https://www.indiapost.gov.in/" },
                    { name: "Core Banking Solutions (Working knowledge of CBS)", link: "https://www.indiapost.gov.in/" }
                ]
            },
            {
                category: "7. Service Rules",
                icon: <Briefcase className="w-5 h-5" />,
                items: [

                    { name: "CCS (Conduct) Rules, 1964", link: "https://dopt.gov.in/sites/default/files/CCS_Conduct_Rules_1964_Updated_27Feb15_0.pdf" },
                    { name: "CCS (CCA) Rules, 1965", link: "https://dopt.gov.in/sites/default/files/CCS-CCA-Rules-FINAL.pdf" },
                    { name: "GDS (Conduct & Engagement) Rules, 2020", link: "https://utilities.cept.gov.in/dop/pdfbind.ashx?id=4323" }
                ]
            }
        ]
    },
    paper2: {
        title: "Paper II: Noting & Drafting",
        subtitle: "50 Marks • 1 Hour • Subjective",
        description: "This paper tests the practical writing skills required for administrative duties. There are no specific textbooks, but candidates should follow standard office procedure formats.",
        sections: [
            {
                category: "Components",
                icon: <FileText className="w-5 h-5" />,
                items: [
                    { name: "Noting on a given topic (approx. 200 words)", details: "15 Marks", link: null },
                    { name: "Drafting on a given topic (approx. 200 words)", details: "15 Marks", link: null },
                    { name: "Draft Major Penalty Charge Sheet", details: "20 Marks - Critical Topic", link: "https://dopt.gov.in/sites/default/files/Simplification%20of%20Rules%2043020%2014%202021%20Estt%20A%20III.pdf" }
                ]
            }
        ]
    },
    paper3: {
        title: "Paper III: Law, Constitution & Admin",
        subtitle: "150 Questions • 300 Marks • 3 Hours",
        description: "Covers the broader legal and administrative framework for central government employees.",
        sections: [
            {
                category: "1. Constitution & Criminal Law",
                icon: <Landmark className="w-5 h-5" />,
                items: [
                    { name: "Constitution of India (Selected Articles)", link: "https://www.legislative.gov.in/documents/constitution-of-india?page=1" },
                    { name: "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)", link: "https://egazette.gov.in/WriteReadData/2023/250883.pdf" }
                ]
            },
            {
                category: "3-6. Key Acts",
                icon: <Scale className="w-5 h-5" />,
                items: [
                    { name: "Central Administrative Tribunal Act, 1985", link: "https://www.indiacode.nic.in/bitstream/123456789/1832/1/AA1985__13admin.pdf" },
                    { name: "Prevention of Corruption Act, 1988", link: "https://www.indiacode.nic.in/bitstream/123456789/15302/1/pc_act,_1988.pdf" },
                    { name: "RTI Act, 2005 & Rules 2012", link: "https://cic.gov.in/sites/default/files/RTI-Act_English.pdf" },
                    { name: "Sexual Harassment of Women at Workplace Act, 2013", link: "https://doe.gov.in/files/inline-documents/DoE_Prevention_sexual_harassment.pdf" }
                ]
            },
            {
                category: "7-13. Financial & Procurement",
                icon: <Calculator className="w-5 h-5" />,
                items: [
                    { name: "Manuals on Procurement (Goods, Works, Services)", link: "https://cvc.gov.in/files/procurement-manuals-pdf/PPM%2000008.pdf" },
                    { name: "General Financial Rules (GFR) 2017", link: "https://doe.gov.in/files/circulars_document/FInal_GFR_upto_31_07_2024.pdf" },
                    { name: "NPS Rules (Implementation & Gratuity)", link: "https://pensionersportal.gov.in/Document/Important_initiatives_under_NPS.pdf" }
                ]
            },
            {
                category: "14-20. Establishment & Welfare",
                icon: <Briefcase className="w-5 h-5" />,
                items: [
                    { name: "CCS (Pension) Rules, 2021 & Commutation of Pension", link: "https://pensionersportal.gov.in/Document/CCS-Pension-Rules%202021-English.pdf" },
                    { name: "CCS (GPF) Rules", link: "https://pensionersportal.gov.in/pension/rules_new/GPF_Rules_1960_230913.pdf" },
                    { name: "Fundamental Rules (FR) & Supplementary Rules (SR)", link: "https://dopt.gov.in/sites/default/files/Compilation_FR_SR_English.pdf" },
                    { name: "APAR Maintenance Guidelines", link: "https://documents.doptcirculars.nic.in/D2/D02ser/BROCHURE-CR.pdf" },
                    { name: "Welfare Measures & Casual Labourers", link: "https://documents.doptcirculars.nic.in/D2/D02est/DCCLGQLEv.pdf" }
                ]
            },
            {
                category: "21-23. General Aptitude",
                icon: <Award className="w-5 h-5" />,
                items: [
                    { name: "English Language", link: null },
                    { name: "GK & Current Affairs (Economy, Polity, Sports)", link: null },
                    { name: "Reasoning, Ethics & Mental Aptitude", link: null }
                ]
            }
        ]
    }
};

// Sleek Sticky Sub-Nav for Mobile & Desktop
const StickyTabNav = React.memo(({ activeTab, setActiveTab, isPS }: { activeTab: string, setActiveTab: (tab: string) => void, isPS: boolean }) => (
    <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2 md:py-3">
                {/* Mobile: Grid Layout for larger tap targets */}
                <div className={`grid ${isPS ? 'grid-cols-2' : 'grid-cols-3'} gap-2 md:flex md:justify-center md:space-x-2 bg-zinc-100/50 dark:bg-zinc-900/50 p-1.5 rounded-xl md:bg-transparent md:dark:bg-transparent md:p-0`}>
                    {(isPS ? ['paper1', 'paper2'] : ['paper1', 'paper2', 'paper3']).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`
                                relative px-3 py-2.5 md:px-6 md:py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center
                                ${activeTab === tab
                                    ? (isPS ? 'bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 md:ring-0 md:bg-teal-50 md:dark:bg-teal-900/20' : 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 md:ring-0 md:bg-blue-50 md:dark:bg-blue-900/20')
                                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                                }
                            `}
                        >
                            {/* Mobile Only Indicator Dot */}
                            {activeTab === tab && (
                                <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full md:hidden ${isPS ? 'bg-teal-500' : 'bg-blue-500'}`}></span>
                            )}
                            {tab === 'paper1' ? 'Paper I' : tab === 'paper2' ? 'Paper II' : 'Paper III'}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
));

StickyTabNav.displayName = "StickyTabNav";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SyllabusCard = React.memo(({ section, isPS }: { section: any, isPS: boolean }) => (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-gradient-to-r from-slate-50 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 px-5 py-4 border-b border-zinc-100 dark:border-zinc-700 flex items-center space-x-3">
            <div className={`p-2 rounded-xl shadow-sm ${isPS ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                {section.icon}
            </div>
            <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-lg">{section.category}</h3>
        </div>
        <div className="p-5">
            <ul className="space-y-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {section.items.map((item: any, idx: number) => (
                    <li key={idx} className="group">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isPS ? 'bg-teal-400' : 'bg-blue-400'}`}></div>
                                    <span className={`font-medium transition-colors leading-snug text-zinc-700 dark:text-zinc-300 ${isPS ? 'group-hover:text-teal-600 dark:group-hover:text-teal-400' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                        {item.name}
                                    </span>
                                </div>
                                {item.details && (
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 ml-3.5 pl-1 border-l-2 border-zinc-200 dark:border-zinc-700">{item.details}</p>
                                )}
                            </div>
                            {item.link ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-shrink-0 inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 shadow-sm ${isPS ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500' : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500'}`}
                                    title="Open Official Resource"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            ) : (
                                <div className="flex-shrink-0 p-2 w-8"></div>
                            )}
                        </div>
                        {idx !== section.items.length - 1 && <div className="h-px bg-zinc-100 dark:bg-zinc-800/50 mt-3 ml-3"></div>}
                    </li>
                ))}
            </ul>
        </div>
    </div>
));

SyllabusCard.displayName = "SyllabusCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HeroSection = ({ activeData, isPS }: { activeData: any, isPS: boolean }) => (
    <div className="relative bg-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className={`absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full blur-[100px] opacity-30 animate-pulse ${isPS ? 'bg-teal-600' : 'bg-indigo-600'}`}></div>
        <div className={`absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full blur-[100px] opacity-30 animate-pulse ${isPS ? 'bg-cyan-600' : 'bg-blue-600'}`} style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${isPS ? 'bg-teal-500/10 border border-teal-400/20 text-teal-300' : 'bg-blue-500/10 border border-blue-400/20 text-blue-300'}`}>
                        <Book className="w-3 h-3" /> {isPS ? 'PS Group B 2026 Syllabus' : 'Inspector Posts LDCE Syllabus'}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
                        {activeData.title}
                    </h2>
                    <p className="text-xl text-blue-200 font-light flex items-center">
                        {activeData.subtitle}
                    </p>
                </div>
                {activeData.description && (
                    <div className="md:max-w-md bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-xl">
                        <p className="text-sm text-blue-100 leading-relaxed font-medium">
                            {activeData.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
);



export default function SyllabusPageClient({ forceCourse }: { forceCourse?: string }) {
    const { course } = useCourse();
    const actualCourse = forceCourse || course;
    const isPS = actualCourse === 'PS_GR_B';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [activeTab, setActiveTab] = useState<string>('paper1');

    const sourceData = isPS ? psgbSyllabusData : syllabusData;
    // Explicit type assertion to handle the indexing
    const currentData = (sourceData as any)[activeTab] || sourceData.paper1;

    return (
        <AppScreenWrapper
            header={<StickyTabNav activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab as any)} isPS={isPS} />}
        >
            <main>
                <HeroSection activeData={currentData} isPS={isPS} />

                {/* Important Disclaimer Banner */}
                <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-100 dark:border-amber-900/30">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-start sm:items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5 sm:mt-0" />
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Official Reference Links Provided: Candidates are advised to use the linked official PDFs and websites for authoritative information.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumb / Info Bar */}
                    <div className="mb-8 flex items-center text-sm text-zinc-500 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 w-fit">
                        <Link href="/" className="hover:text-blue-600 transition-colors"><Home className="w-4 h-4" /></Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-zinc-300" />
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Syllabus</span>
                        <ChevronRight className="w-4 h-4 mx-2 text-zinc-300" />
                        <span className="capitalize font-medium text-zinc-900 dark:text-zinc-100">{activeTab.replace('paper', 'Paper ')}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentData.sections.map((section: any, index: number) => (
                            <SyllabusCard key={index} section={section} isPS={isPS} />
                        ))}
                    </div>

                    {/* Special Section for Paper II if active */}
                    {activeTab === 'paper2' && (
                        <div className="mt-12 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-zinc-800">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 opacity-10 blur-3xl rounded-full"></div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 relative z-10">Preparation Tip for Noting & Drafting</h3>
                                <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                    Focus on structure. For the Charge Sheet, memorize the standard form <span className="font-bold text-blue-600 dark:text-blue-400">(Standard Form No. 5 for Major Penalty)</span>.
                                    Ensure your noting represents a logical flow of facts and rules.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </AppScreenWrapper>
    );
}
