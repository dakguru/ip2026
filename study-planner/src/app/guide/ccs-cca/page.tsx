'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, Moon, Sun, Printer, Menu, X, Gavel, ArrowLeft,
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
        title: 'Chapter I: Preliminary & Classification',
        subsections: [
            {
                id: 'intro',
                title: 'CCS (CCA) Rules, 1965 – Overview',
                content: [
                    { type: 'text', content: 'The <strong>Central Civil Services (Classification, Control and Appeal) Rules, 1965</strong> govern the classification of civil services/posts, the imposition of penalties, and the procedure for disciplinary proceedings and appeals. They apply to persons appointed to civil services and posts in connection with the affairs of the Union (with certain exclusions).' }
                ]
            },
            {
                id: 'classification',
                title: 'Classification of services',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Rule 5:</strong> Civil services and posts are classified into Group A, Group B, Group C, and Group D (as per pay/level).',
                            '<strong>Rule 6:</strong> The President may exclude any service or post from the operation of all or any of these rules.',
                            'Classification determines the <strong>disciplinary authority</strong> and the level at which penalties can be imposed.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-2',
        title: 'Chapter II: Disciplinary Authority & Suspension',
        subsections: [
            {
                id: 'authority',
                title: 'Appointing and disciplinary authority',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Appointing Authority:</strong> The authority that appointed the Government servant (or the authority declared as such).',
                            '<strong>Disciplinary Authority:</strong> The authority competent to impose a penalty. May be the Appointing Authority or any other authority specified in the rules.',
                            'Higher authority may impose any penalty that a lower authority can impose; can also exercise the powers of a lower authority.'
                        ]
                    }
                ]
            },
            {
                id: 'suspension',
                title: 'Suspension (Rule 10)',
                content: [
                    {
                        type: 'list',
                        content: [
                            'Competent authority may place a Government servant under suspension where disciplinary proceedings are contemplated or pending, or where a conviction has led to further consideration.',
                            '<strong>Deemed suspension:</strong> If detained in custody for more than <strong>48 hours</strong> (criminal or otherwise), the Government servant shall be deemed to have been suspended.',
                            'Subsistence allowance as per FR 53 (50% of leave salary + DA; review after 3 months).',
                            'Suspension shall be reviewed periodically; total period of suspension should be kept to the minimum.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-3',
        title: 'Chapter III: Penalties',
        subsections: [
            {
                id: 'minor-penalties',
                title: 'Minor penalties (Rule 11)',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Censure</strong> – recorded warning.',
                            '<strong>Withholding of promotion</strong> – for a specified period or indefinitely.',
                            '<strong>Recovery from pay</strong> – of whole or part of any pecuniary loss caused to Government.',
                            '<strong>Withholding of increments</strong> – with or without cumulative effect for a specified period.',
                            '<strong>Reduction to a lower stage</strong> in the time-scale of pay for a specified period.',
                            '<strong>Reduction to lower time-scale</strong>, grade, post or service (with specified conditions).'
                        ]
                    }
                ]
            },
            {
                id: 'major-penalties',
                title: 'Major penalties (Rule 11)',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Compulsory retirement</strong> (with or without pension/benefits as prescribed).',
                            '<strong>Removal from service</strong> – not disqualifying for future employment.',
                            '<strong>Dismissal from service</strong> – ordinarily disqualifies from future employment under Government.'
                        ]
                    }
                ]
            },
            {
                id: 'penalties-table',
                title: 'Summary table',
                content: [
                    {
                        type: 'table',
                        content: '',
                        tableData: {
                            headers: ['Type', 'Examples'],
                            rows: [
                                ['Minor', 'Censure, Withholding promotion/increments, Recovery, Reduction to lower stage/scale'],
                                ['Major', 'Compulsory retirement, Removal, Dismissal']
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-4',
        title: 'Chapter IV: Procedure',
        subsections: [
            {
                id: 'procedure-minor',
                title: 'Procedure for minor penalties (Rule 16)',
                content: [
                    {
                        type: 'list',
                        content: [
                            'Government servant shall be informed in writing of the proposal and the grounds; given opportunity to submit representation within a reasonable period (generally 15 days).',
                            'No oral inquiry is mandatory for minor penalties; the disciplinary authority may consider the representation and the records and decide.'
                        ]
                    }
                ]
            },
            {
                id: 'procedure-major',
                title: 'Procedure for major penalties (Rule 14)',
                content: [
                    {
                        type: 'list',
                        content: [
                            'A <strong>memorandum (charge-sheet)</strong> shall be served on the Government servant stating the articles of charge, statement of imputations, and list of documents/witnesses.',
                            'The Government servant shall be required to submit a <strong>written statement of defence</strong> within a specified period (e.g. 15 days).',
                            'If an <strong>inquiry</strong> is to be held: an Inquiry Authority is appointed. Oral inquiry is conducted; the charged officer can cross-examine witnesses and produce defence. Report of the Inquiry Authority is submitted to the Disciplinary Authority.',
                            'Disciplinary Authority considers the report, gives copy to the charged officer for representation if penalty is proposed, and then passes final order.'
                        ]
                    }
                ]
            },
            {
                id: 'consultation-upsc',
                title: 'Consultation with UPSC / Union Public Service Commission',
                content: [
                    { type: 'text', content: 'Where the penalty of dismissal, removal, or compulsory retirement is proposed, the Union Public Service Commission shall be consulted before passing the order, except in certain cases (e.g. where the President is satisfied that consultation is not practicable, or in security-related matters as prescribed).' }
                ]
            }
        ]
    },
    {
        id: 'chap-5',
        title: 'Chapter V: Appeal & Revision',
        subsections: [
            {
                id: 'appeal',
                title: 'Appeal (Rule 23–24)',
                content: [
                    {
                        type: 'list',
                        content: [
                            'A Government servant may prefer an <strong>appeal</strong> against an order imposing a penalty to the <strong>appellate authority</strong> (as specified in the rules).',
                            'Appeal to be submitted within a period (e.g. <strong>45 days</strong> from the date of receipt of the order).',
                            'Appellate authority may confirm, enhance, reduce, or set aside the penalty; or remit the case for reconsideration.'
                        ]
                    }
                ]
            },
            {
                id: 'revision',
                title: 'Revision and review',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Revision:</strong> The President or the prescribed authority may call for the records and pass such order as deemed fit (suo motu or on application).',
                            '<strong>Review:</strong> In certain cases, the order may be reviewed on discovery of new material or error.'
                        ]
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
                            'CCA Rules <strong>1965</strong> – Classification, Control & Appeal.',
                            '<strong>Minor penalties:</strong> Censure, withholding promotion/increments, recovery, reduction (stage/scale).',
                            '<strong>Major penalties:</strong> Compulsory retirement, Removal, Dismissal.',
                            '<strong>Deemed suspension:</strong> If detained in custody &gt; <strong>48 hours</strong>.',
                            'Major penalty procedure: Charge-sheet → written defence → inquiry (if held) → report → show-cause on penalty → order. <strong>UPSC</strong> consultation for dismissal/removal/compulsory retirement (with exceptions).',
                            'Appeal: to appellate authority (e.g. within <strong>45 days</strong>).'
                        ]
                    }
                ]
            }
        ]
    },
];

const MetricParser = ({ text }: { text: string }) => {
    const parts = text.split(/(<strong>.*?<\/strong>)/g);
    return (
        <span>
            {parts.map((part, index) => {
                if (part.startsWith('<strong>')) {
                    const content = part.replace(/<\/?strong>/g, '');
                    return <span key={index} className="font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 px-1 rounded mx-0.5">{content}</span>;
                }
                return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
};

export default function CCSCCAGuide() {
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
                            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white"><Gavel size={18} /></div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Dak <span className="text-rose-600">Guru</span></h1>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search sections..." className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-rose-500 text-sm transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => window.print()} className="p-2 text-slate-500 hover:text-rose-600 transition-colors" title="Print"><Printer size={20} /></button>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-500 hover:text-amber-500 transition-colors" title="Theme">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
                    </div>
                </div>
                <div className="h-1 bg-slate-200 dark:bg-slate-700 w-full"><div className="h-full bg-rose-600 w-[35%]"></div></div>
            </header>

            <div className="max-w-7xl mx-auto pt-20 pb-12 flex items-start gap-6 px-4">
                <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:bg-transparent lg:border-none lg:overflow-y-auto lg:w-72 lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} print:hidden`}>
                    <div className="p-6 lg:p-0">
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <span className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Table of Contents</span>
                            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="mb-4 px-2 py-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800">
                            <p className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">CCS (CCA) Rules, 1965</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Classification, Control &amp; Appeal</p>
                        </div>
                        <nav className="space-y-8 pb-10 pr-2">
                            {filteredData.map((chapter) => (
                                <div key={chapter.id}>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-4">{chapter.title.split(':')[0]}</h3>
                                    <ul className="space-y-1">
                                        {chapter.subsections.map((sub) => (
                                            <li key={sub.id}>
                                                <a href={`#${sub.id}`} className={`group flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm transition-all duration-200 border-l-[3px] ${activeSection === sub.id ? 'bg-rose-50/80 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-600 font-semibold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:pl-5'}`} onClick={() => setSidebarOpen(false)}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${activeSection === sub.id ? 'bg-rose-500' : 'bg-slate-300 group-hover:bg-rose-400'} transition-colors shrink-0`} />
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
                                                <button onClick={() => handleCopy(sub.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 rounded transition-all" title="Copy link">{copiedId === sub.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}</button>
                                            </div>
                                            <div className="p-6 text-slate-600 dark:text-slate-300 leading-7">
                                                {sub.content.map((block, idx) => (
                                                    <div key={idx} className="mb-4 last:mb-0">
                                                        {block.type === 'text' && <p className="font-serif text-base md:text-lg leading-relaxed"><MetricParser text={block.content as string} /></p>}
                                                        {block.type === 'list' && Array.isArray(block.content) && (
                                                            <ul className="space-y-3 mt-2">
                                                                {(block.content as string[]).map((item, i) => (
                                                                    <li key={i} className="flex gap-3 text-base">
                                                                        <div className="mt-2 w-1.5 h-1.5 bg-rose-400 rounded-full flex-shrink-0" />
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
                            <p>&copy; {new Date().getFullYear()} Dak Guru Learning Systems. Content based on CCS (CCA) Rules, 1965.</p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
