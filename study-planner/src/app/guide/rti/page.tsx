'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, Moon, Sun, Printer, Menu, X, FileText, ArrowLeft,
    AlertTriangle, Copy, Check,
} from 'lucide-react';
import Link from 'next/link';

type ContentType = 'text' | 'list' | 'table';
interface ContentBlock {
    type: ContentType;
    content: string | string[];
    tableData?: { headers: string[]; rows: string[][] };
}
interface Section {
    id: string;
    title: string;
    subsections: { id: string; title: string; content: ContentBlock[]; isUpdate?: boolean; updateSource?: string }[];
}

const actData: Section[] = [
    {
        id: 'chap-1',
        title: 'Chapter I: Preliminary',
        subsections: [
            {
                id: 'sec-1',
                title: '1. Short title, extent and commencement',
                content: [
                    { type: 'text', content: 'This Act may be called the <strong>Right to Information Act, 2005</strong>. It extends to the whole of India except Jammu and Kashmir (prior to 2019; J&K now covered). Came into force on <strong>12 October 2005</strong>.' }
                ]
            },
            {
                id: 'sec-2',
                title: '2. Definitions',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Information:</strong> Any material in any form including records, documents, memos, e-mails, opinions, advices, press releases, circulars, orders, logbooks, contracts, reports, papers, samples, models, data material held in any electronic form.',
                            '<strong>Right to Information:</strong> Right to access information held by or under the control of any public authority, including right to inspection, taking notes, certified copies, and taking samples.',
                            '<strong>Public Authority:</strong> Any body or institution of self-government established or constituted by or under the Constitution, by any law, by Government notification, or body owned, controlled or substantially financed by Government. Includes <strong>Department of Posts</strong>.',
                            '<strong>Public Information Officer (PIO):</strong> Officer designated by the public authority to provide information to applicants. <strong>Assistant PIO (APIO):</strong> Receives applications and forwards to PIO.',
                            '<strong>Central Information Commission (CIC) / State Information Commission (SIC):</strong> Appellate and enforcement body at Central and State level.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-2',
        title: 'Chapter II: Right to Information & Obligations',
        subsections: [
            {
                id: 'sec-3-4',
                title: '3–4. Right to information and obligations of public authorities',
                content: [
                    { type: 'text', content: 'Subject to the provisions of the Act, all citizens have the right to information. Public authorities shall maintain records, catalogue and index them, and publish certain information suo motu (Section 4(1)(b)).' },
                    {
                        type: 'list',
                        content: [
                            'Publish particulars of organisation, functions, duties, decision-making process, directory of officers, budget, norms, information held in electronic form, facilities for citizens.',
                            'Provide information in the form requested (printed, electronic, etc.) where feasible.',
                            'Designate PIOs and APIOs; publish their names and contact details.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-3',
        title: 'Chapter III: Request & Time Limits',
        subsections: [
            {
                id: 'sec-6',
                title: '6. Request for information',
                content: [
                    { type: 'text', content: 'A person desiring information shall make a request in writing or electronic means to the PIO or APIO, specifying particulars and the fee. No reason need be given. Applicant not bound to disclose personal details except for contact.' }
                ]
            },
            {
                id: 'sec-7',
                title: '7. Disposal of request – time limits',
                content: [
                    {
                        type: 'list',
                        content: [
                            'PIO shall provide information <strong>within 30 days</strong> from the date of receipt of request.',
                            'If the request relates to <strong>life or liberty</strong>, information shall be provided within <strong>48 hours</strong>.',
                            'Where the information is held by another public authority, the PIO shall transfer within <strong>5 days</strong> and inform the applicant. The receiving authority then has 30 days from receipt.',
                            'If the request is to APIO, it is deemed received by the public authority on the day it is received by APIO.'
                        ]
                    }
                ]
            },
            {
                id: 'fees',
                title: 'Fees and cost',
                content: [
                    {
                        type: 'list',
                        content: [
                            'Application fee: As prescribed (e.g. Rs. 10 for Central; varies by State).',
                            'Further fees: For providing information – cost of copying (Rs. 2 per A4 page), sample or model, diskette/floppy. No fee for BPL applicants (as prescribed).',
                            'If not provided in time, information to be provided free of charge.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-4',
        title: 'Chapter IV: Exemptions',
        subsections: [
            {
                id: 'sec-8',
                title: '8. Exemption from disclosure',
                content: [
                    {
                        type: 'list',
                        content: [
                            'Information which would prejudicially affect sovereignty, integrity, security, strategic interests, or incitement to an offence.',
                            'Information expressly forbidden by court or tribunal; or which may constitute contempt of court.',
                            'Information which would cause breach of privilege of Parliament/State Legislature.',
                            'Commercial confidence, trade secrets, or intellectual property, if disclosure would harm competitive position (unless larger public interest warrants).',
                            'Information received in confidence from foreign Government.',
                            'Information which would endanger life or physical safety; or assist in investigation or prosecution.',
                            'Cabinet papers including deliberations; after decision is taken, the decision and reasons may be disclosed if not exempt otherwise.',
                            '<strong>Personal information</strong> which has no relationship to any public activity or interest, or which would cause unwarranted invasion of privacy (unless larger public interest justifies).'
                        ]
                    }
                ]
            },
            {
                id: 'sec-9',
                title: '9. Grounds for rejection to be specified',
                content: [
                    { type: 'text', content: 'Where only part of the record is exempt, that part may be severed and the rest provided. The PIO shall give reasons for the rejection and the period within which appeal may be preferred.' }
                ]
            }
        ]
    },
    {
        id: 'chap-5',
        title: 'Chapter V: Appeal & Penalties',
        subsections: [
            {
                id: 'sec-19',
                title: '19. Appeal',
                content: [
                    {
                        type: 'list',
                        content: [
                            'First appeal: To the <strong>senior officer</strong> (designated by the public authority) within <strong>30 days</strong> from the expiry of the 30-day period or from the receipt of the decision.',
                            'Second appeal: To the <strong>Central Information Commission</strong> or <strong>State Information Commission</strong> within <strong>90 days</strong> from the date on which the first appeal decision was received.',
                            'No fee for first appeal; second appeal fee as prescribed.'
                        ]
                    }
                ]
            },
            {
                id: 'sec-20',
                title: '20. Penalties',
                content: [
                    {
                        type: 'table',
                        content: '',
                        tableData: {
                            headers: ['Default', 'Penalty'],
                            rows: [
                                ['PIO without reasonable cause: refused request, delayed, malafide denial', 'Rs. 250 per day (max Rs. 25,000)'],
                                ['PIO knowingly gives incorrect/incomplete/misleading information', 'Same as above'],
                                ['Disciplinary action', 'As per service rules (recommendation by CIC/SIC)']
                            ]
                        }
                    }
                ]
            },
            {
                id: 'highlights',
                title: 'Exam highlights',
                content: [
                    {
                        type: 'list',
                        content: [
                            'RTI Act 2005 – in force <strong>12 October 2005</strong>.',
                            'Normal response: <strong>30 days</strong>; life or liberty: <strong>48 hours</strong>.',
                            'First appeal: to senior officer within <strong>30 days</strong>; second appeal: to CIC/SIC within <strong>90 days</strong>.',
                            'Penalty on PIO: <strong>Rs. 250/day</strong> (max Rs. 25,000); disciplinary action as per service rules.',
                            'Department of Posts is a public authority; must designate PIO/APIO in each office.'
                        ]
                    }
                ]
            }
        ]
    },
];

const StatutoryUpdate = ({ title, source, children }: { title: string; source?: string; children: React.ReactNode }) => (
    <div className="my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-400 font-bold uppercase text-xs tracking-wider"><AlertTriangle size={16} /><span>{title}</span></div>
        <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{children}</div>
        {source && <div className="mt-3 text-xs text-blue-700/70 dark:text-blue-500/70 italic border-t border-blue-200 dark:border-blue-800/50 pt-2">Ref: {source}</div>}
    </div>
);

const MetricParser = ({ text }: { text: string }) => {
    const parts = text.split(/(<strong>.*?<\/strong>)/g);
    return (
        <span>
            {parts.map((part, index) => {
                if (part.startsWith('<strong>')) {
                    const content = part.replace(/<\/?strong>/g, '');
                    return <span key={index} className="font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-1 rounded mx-0.5">{content}</span>;
                }
                return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
};

export default function RTIGuide() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
            { rootMargin: '-20% 0px -60% 0px' }
        );
        document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const filteredData = actData.map((ch) => ({
        ...ch,
        subsections: ch.subsections.filter((sub) =>
            sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.content.some((c) =>
                typeof c.content === 'string'
                    ? c.content.toLowerCase().includes(searchQuery.toLowerCase())
                    : (c.content as string[]).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        ),
    })).filter((ch) => ch.subsections.length > 0);

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            <header className="fixed top-0 z-50 w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm print:hidden">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/guide" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors mr-2"><ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" /></Link>
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300"><Menu size={20} /></button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><FileText size={18} /></div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Dak <span className="text-blue-600">Guru</span></h1>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search sections..." className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => window.print()} className="p-2 text-slate-500 hover:text-blue-600 transition-colors" title="Print"><Printer size={20} /></button>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-500 hover:text-amber-500 transition-colors" title="Theme">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
                    </div>
                </div>
                <div className="h-1 bg-slate-200 dark:bg-slate-700 w-full"><div className="h-full bg-blue-600 w-[40%]"></div></div>
            </header>

            <div className="max-w-7xl mx-auto pt-20 pb-12 flex items-start gap-6 px-4">
                <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:bg-transparent lg:border-none lg:overflow-y-auto lg:w-72 lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} print:hidden`}>
                    <div className="p-6 lg:p-0">
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <span className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Table of Contents</span>
                            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="mb-4 px-2 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">RTI Act, 2005</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Right to Information · In force 12 Oct 2005</p>
                        </div>
                        <nav className="space-y-8 pb-10 pr-2">
                            {filteredData.map((chapter) => (
                                <div key={chapter.id}>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-4">{chapter.title.split(':')[0]}</h3>
                                    <ul className="space-y-1">
                                        {chapter.subsections.map((sub) => (
                                            <li key={sub.id}>
                                                <a href={`#${sub.id}`} className={`group flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm transition-all duration-200 border-l-[3px] ${activeSection === sub.id ? 'bg-blue-50/80 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-600 font-semibold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:pl-5'}`} onClick={() => setSidebarOpen(false)}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${activeSection === sub.id ? 'bg-blue-500' : 'bg-slate-300 group-hover:bg-blue-400'} transition-colors shrink-0`} />
                                                    <span className="truncate">{sub.title}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main className="flex-1 w-full min-w-0">
                    <div className="space-y-12">
                        {filteredData.length === 0 && <div className="text-center py-20 text-slate-400"><Search className="mx-auto h-12 w-12 mb-4 opacity-50" /><p>No sections found.</p></div>}
                        {filteredData.map((chapter) => (
                            <div key={chapter.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-4 mb-6 sticky top-20 bg-slate-50/95 dark:bg-slate-900/95 py-2 z-10 backdrop-blur">
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></span>
                                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{chapter.title}</h2>
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></span>
                                </div>
                                <div className="space-y-6">
                                    {chapter.subsections.map((sub) => (
                                        <section key={sub.id} id={sub.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden scroll-mt-24 group transition-all hover:shadow-md">
                                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
                                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{sub.title}</h3>
                                                <button onClick={() => handleCopy(sub.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-blue-600 rounded transition-all" title="Copy link">{copiedId === sub.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}</button>
                                            </div>
                                            <div className="p-6 text-slate-600 dark:text-slate-300 leading-7">
                                                {sub.content.map((block, idx) => (
                                                    <div key={idx} className="mb-4 last:mb-0">
                                                        {block.type === 'text' && <p className="font-serif text-base md:text-lg leading-relaxed"><MetricParser text={block.content as string} /></p>}
                                                        {block.type === 'list' && Array.isArray(block.content) && (
                                                            <ul className="space-y-3 mt-2">
                                                                {(block.content as string[]).map((item, i) => (
                                                                    <li key={i} className="flex gap-3 text-base">
                                                                        <div className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                                                                        <span><MetricParser text={item} /></span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {block.type === 'table' && block.tableData && (
                                                            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mt-4">
                                                                <table className="w-full text-sm text-left">
                                                                    <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase font-bold text-xs">
                                                                        <tr>{block.tableData.headers.map((h, i) => <th key={i} className="px-6 py-3">{h}</th>)}</tr>
                                                                    </thead>
                                                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                                                        {block.tableData.rows.map((row, rIdx) => (
                                                                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                                                                {row.map((cell, cIdx) => <td key={cIdx} className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{cell}</td>)}
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-400 text-sm print:hidden">
                            <p>&copy; {new Date().getFullYear()} Dak Guru Learning Systems. Content based on RTI Act, 2005.</p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
