'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, Moon, Sun, Printer, Menu, X, Calculator, ArrowLeft,
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
        title: 'Chapter I: Preliminary & Definitions',
        subsections: [
            {
                id: 'sec-1',
                title: '1. Short title and commencement',
                content: [
                    { type: 'text', content: 'These rules may be called the <strong>Government Savings Promotion Rules, 2018 (GSPR)</strong>. They came into force on <strong>1st April 2018</strong>, replacing the earlier Government Savings Certificates Rules and related orders.' },
                    { type: 'text', content: 'Framed under the <strong>Government Savings Promotion Act, 1873</strong>. Applicable to all Small Savings Schemes operated through Post Offices and designated banks.' }
                ]
            },
            {
                id: 'definitions',
                title: '2. Key definitions',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Depositor:</strong> A person who has opened or holds a deposit account or subscribes to a small savings scheme.',
                            '<strong>Account:</strong> Savings account, time deposit, recurring deposit, or any scheme under these rules.',
                            '<strong>Small Savings Scheme:</strong> Schemes framed by the Central Government including SB, TD, MIS, NSC, PPF, SSY, SCSS, Senior Citizen Savings Scheme, etc.',
                            '<strong>Competent Authority:</strong> Director General (Posts), or any officer authorised by the Central Government for the purpose.',
                            '<strong>Post Office:</strong> Any post office doing savings bank business under the Department of Posts.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-2',
        title: 'Chapter II: Post Office Savings Bank (SB)',
        subsections: [
            {
                id: 'sb-account',
                title: 'Savings Bank Account – Opening & Operation',
                content: [
                    { type: 'text', content: 'Any individual (single or joint), minor through guardian, or organisation permitted under rules may open an SB account.' },
                    {
                        type: 'list',
                        content: [
                            'Minors above 10 years can open and operate independently (Rule 5).',
                            'Joint account: Either or Survivor / Former or Survivor / Latter or Survivor.',
                            'Minimum balance: As prescribed (often nil or nominal for single account).',
                            'Interest: Credited annually; rate as notified by Ministry of Finance (currently 4% p.a. for SB).'
                        ]
                    }
                ]
            },
            {
                id: 'sb-limits',
                title: 'Deposit & withdrawal limits',
                content: [
                    {
                        type: 'table',
                        content: '',
                        tableData: {
                            headers: ['Aspect', 'Limit'],
                            rows: [
                                ['Max balance (single)', 'Rs. 10 Lakh (excess may be converted to TD or other scheme)'],
                                ['Cash deposit (single)', 'As per KYC; large deposits may require PAN/declaration'],
                                ['Withdrawal', 'No upper limit subject to balance; cheque/withdrawal form as per CBS']
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-3',
        title: 'Chapter III: Small Savings Schemes – Overview',
        subsections: [
            {
                id: 'schemes-table',
                title: 'Scheme-wise summary (exam focus)',
                content: [
                    {
                        type: 'table',
                        content: '',
                        tableData: {
                            headers: ['Scheme', 'Term', 'Max deposit / limit', 'Key feature'],
                            rows: [
                                ['Post Office Time Deposit (TD)', '1, 2, 3, 5 years', 'No max', 'Interest as notified; premature with penalty'],
                                ['Monthly Income (MIS)', '5 years', 'Rs. 9 Lakh (single), Rs. 15 Lakh (joint)', 'Monthly interest; 1 nomination'],
                                ['NSC (VIII Issue)', '5 years', 'No max', 'Compound interest; 2% over PO TD 5Y; tax benefit 80C'],
                                ['PPF', '15 years (extendable)', 'Rs. 1.5 Lakh/year', 'Tax-free; 1 nomination; loan/withdrawal as per rules'],
                                ['Sukanya Samriddhi (SSY)', '21 years from opening', 'Rs. 1.5 Lakh/year', 'Girl child; marriage/education withdrawal'],
                                ['SCSS (Senior Citizen)', '5 years (extend 3Y)', 'Rs. 30 Lakh', '60+ age; quarterly interest; 8.2% (approx)'],
                                ['Kisan Vikas Patra (KVP)', '124 months', 'No max', 'Doubles on maturity; transferable']
                            ]
                        }
                    }
                ]
            },
            {
                id: 'nsc-ppf',
                title: 'NSC & PPF – Important points',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>NSC:</strong> No TDS; interest compounded annually; premature in specified cases (death, court order, etc.).',
                            '<strong>PPF:</strong> Min deposit Rs. 500/year; max 12 deposits/year; partial withdrawal from 7th year; loan from 3rd to 6th year.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-4',
        title: 'Chapter IV: Nomination & Payment',
        subsections: [
            {
                id: 'nomination',
                title: 'Nomination',
                content: [
                    { type: 'text', content: 'A depositor may nominate one or more persons. Nomination can be made or changed at any time. Minor can be nominee; appointee receives until minor attains 18.' },
                    { type: 'text', content: 'If no nomination, payment to legal heir (succession certificate may be required for large amounts).' }
                ]
            },
            {
                id: 'payment',
                title: 'Payment on maturity / death',
                content: [
                    {
                        type: 'list',
                        content: [
                            'Maturity: Payable at post office of deposit or as per CBS transfer norms.',
                            'Death: Nominee or legal heir to submit claim form, death certificate, passbook, ID. Threshold for succession certificate as per State/DoP instructions.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-5',
        title: 'Chapter V: Exam highlights',
        subsections: [
            {
                id: 'highlights',
                title: 'Quick revision points',
                content: [
                    {
                        type: 'list',
                        content: [
                            'GSPR 2018 effective from <strong>1 April 2018</strong>; under GSP Act 1873.',
                            'SB interest: As notified (e.g. 4% p.a.); credited annually.',
                            'MIS: 5-year; max Rs. 9 Lakh (single); monthly income.',
                            'PPF: 15-year; max Rs. 1.5 Lakh/year; tax-free; extendable in blocks of 5 years.',
                            'SCSS: 60+; max Rs. 30 Lakh; quarterly interest.',
                            'NSC: 5-year; 80C benefit; no TDS.',
                            'CBS: Core Banking Solution for PO SB; SB Orders and CBS Manual govern operations.'
                        ]
                    }
                ]
            }
        ]
    },
];

const StatutoryUpdate = ({ title, source, children }: { title: string; source?: string; children: React.ReactNode }) => (
    <div className="my-6 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-400 font-bold uppercase text-xs tracking-wider">
            <AlertTriangle size={16} />
            <span>{title}</span>
        </div>
        <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{children}</div>
        {source && <div className="mt-3 text-xs text-emerald-700/70 dark:text-emerald-500/70 italic border-t border-emerald-200 dark:border-emerald-800/50 pt-2">Ref: {source}</div>}
    </div>
);

const MetricParser = ({ text }: { text: string }) => {
    const parts = text.split(/(<strong>.*?<\/strong>)/g);
    return (
        <span>
            {parts.map((part, index) => {
                if (part.startsWith('<strong>')) {
                    const content = part.replace(/<\/?strong>/g, '');
                    return <span key={index} className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded mx-0.5">{content}</span>;
                }
                return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
};

export default function GSPRGuide() {
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
                        <Link href="/guide" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors mr-2">
                            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
                        </Link>
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300"><Menu size={20} /></button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white"><Calculator size={18} /></div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Dak <span className="text-emerald-600">Guru</span></h1>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search sections or keywords..." className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => window.print()} className="p-2 text-slate-500 hover:text-emerald-600 transition-colors" title="Print"><Printer size={20} /></button>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-500 hover:text-amber-500 transition-colors" title="Theme">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
                    </div>
                </div>
                <div className="h-1 bg-slate-200 dark:bg-slate-700 w-full"><div className="h-full bg-emerald-600 w-[35%]"></div></div>
            </header>

            <div className="max-w-7xl mx-auto pt-20 pb-12 flex items-start gap-6 px-4">
                <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:bg-transparent lg:border-none lg:overflow-y-auto lg:w-72 lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} print:hidden`}>
                    <div className="p-6 lg:p-0">
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <span className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Table of Contents</span>
                            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="mb-4 px-2 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">GSPR 2018</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">SB &amp; Small Savings · Effective 1 Apr 2018</p>
                        </div>
                        <nav className="space-y-8 pb-10 pr-2">
                            {filteredData.map((chapter) => (
                                <div key={chapter.id}>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-4">{chapter.title.split(':')[0]}</h3>
                                    <ul className="space-y-1">
                                        {chapter.subsections.map((sub) => {
                                            let label = sub.title;
                                            if (sub.isUpdate) label = 'Update';
                                            return (
                                                <li key={sub.id}>
                                                    <a href={`#${sub.id}`} className={`group flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm transition-all duration-200 border-l-[3px] ${activeSection === sub.id ? 'bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-600 font-semibold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:pl-5'}`} onClick={() => setSidebarOpen(false)}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${activeSection === sub.id ? 'bg-emerald-500' : 'bg-slate-300 group-hover:bg-emerald-400'} transition-colors shrink-0`} />
                                                        <span className="truncate">{label}</span>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main className="flex-1 w-full min-w-0">
                    <div className="space-y-12">
                        {filteredData.length === 0 && (
                            <div className="text-center py-20 text-slate-400">
                                <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No sections found matching &quot;{searchQuery}&quot;</p>
                            </div>
                        )}
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
                                            <div className={`px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start ${sub.isUpdate ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                                                <h3 className={`text-lg font-bold ${sub.isUpdate ? 'text-emerald-700 dark:text-emerald-500' : 'text-slate-800 dark:text-white'}`}>{sub.title}</h3>
                                                <button onClick={() => handleCopy(sub.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded transition-all" title="Copy link">
                                                    {copiedId === sub.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            <div className="p-6 text-slate-600 dark:text-slate-300 leading-7">
                                                {sub.content.map((block, idx) => (
                                                    <div key={idx} className="mb-4 last:mb-0">
                                                        {block.type === 'text' && <p className="font-serif text-base md:text-lg leading-relaxed"><MetricParser text={block.content as string} /></p>}
                                                        {block.type === 'list' && Array.isArray(block.content) && (
                                                            <ul className="space-y-3 mt-2">
                                                                {(block.content as string[]).map((item, i) => (
                                                                    <li key={i} className="flex gap-3 text-base">
                                                                        <div className="mt-2 w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
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
                            <p>&copy; {new Date().getFullYear()} Dak Guru Learning Systems. Content based on GSPR 2018 &amp; related notifications.</p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
