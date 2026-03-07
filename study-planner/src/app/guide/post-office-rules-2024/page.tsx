'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, Moon, Sun, Printer, Menu, X, Mail, ArrowLeft,
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
                id: 'intro',
                title: 'Post Office Rules, 2024 – Overview',
                content: [
                    { type: 'text', content: 'The <strong>Post Office Rules, 2024</strong> were notified under the <strong>Post Office Act, 2023</strong>. They lay down the operational and procedural framework for postal services, licensing (where applicable), standards, and related matters.' },
                    { type: 'text', content: 'These rules are read along with the Post Office Act, 2023 and the <strong>Post Office Regulations, 2024</strong> issued by the Central Government / Director General.' }
                ]
            }
        ]
    },
    {
        id: 'chap-2',
        title: 'Chapter II: Services & Operations',
        subsections: [
            {
                id: 'services',
                title: 'Postal services under the rules',
                content: [
                    {
                        type: 'list',
                        content: [
                            'Services as may be <strong>prescribed by the Central Government</strong> or specified in regulations by the Director General.',
                            'Including: transmission of letters, parcels, packets; money remittance (e.g. eMO, iMO); savings bank and small savings; PLI/RPLI; other citizen-centric and government scheme services.',
                            'Charges and conditions for each service are determined as per the Act and regulations.'
                        ]
                    }
                ]
            },
            {
                id: 'standards',
                title: 'Standards and addressing',
                content: [
                    { type: 'text', content: 'Rules and regulations may prescribe <strong>standards for addressing</strong>, <strong>postcodes</strong>, and <strong>address identifiers</strong> for transmission and delivery. Compliance with these standards ensures efficient routing and delivery.' }
                ]
            }
        ]
    },
    {
        id: 'chap-3',
        title: 'Chapter III: Licensing & Designated Operators',
        subsections: [
            {
                id: 'licensing',
                title: 'Framework for private operators (if applicable)',
                content: [
                    { type: 'text', content: 'The Post Office Act, 2023 removed the exclusive privilege of the Department for collecting, processing and delivering letters. The Rules may provide for <strong>registration or licensing</strong> of private courier or delivery operators, where required by policy.' },
                    { type: 'text', content: 'India Post remains the designated operator for universal postal service and continues to provide SB, PLI, and government schemes at the last mile.' }
                ]
            }
        ]
    },
    {
        id: 'chap-4',
        title: 'Chapter IV: Exam Highlights',
        subsections: [
            {
                id: 'highlights',
                title: 'Quick revision',
                content: [
                    {
                        type: 'list',
                        content: [
                            'Post Office <strong>Rules, 2024</strong> – framed under the <strong>Post Office Act, 2023</strong>.',
                            'Complemented by <strong>Post Office Regulations, 2024</strong> (by CG/DG).',
                            'Govern <strong>services</strong>, <strong>charges</strong>, <strong>addressing standards</strong>, and operational procedures.',
                            'Director General may make regulations with approval of Central Government for conduct of services and charges.',
                            'For syllabus: read Rules and Regulations together with the Act for a complete picture.'
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
                    return <span key={index} className="font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 px-1 rounded mx-0.5">{content}</span>;
                }
                return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
};

export default function PostOfficeRules2024Guide() {
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
                            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center text-white"><Mail size={18} /></div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Dak <span className="text-cyan-600">Guru</span></h1>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search sections..." className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-cyan-500 text-sm transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => window.print()} className="p-2 text-slate-500 hover:text-cyan-600 transition-colors" title="Print"><Printer size={20} /></button>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-500 hover:text-amber-500 transition-colors" title="Theme">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
                    </div>
                </div>
                <div className="h-1 bg-slate-200 dark:bg-slate-700 w-full"><div className="h-full bg-cyan-600 w-[30%]"></div></div>
            </header>

            <div className="max-w-7xl mx-auto pt-20 pb-12 flex items-start gap-6 px-4">
                <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:bg-transparent lg:border-none lg:overflow-y-auto lg:w-72 lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} print:hidden`}>
                    <div className="p-6 lg:p-0">
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <span className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Table of Contents</span>
                            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="mb-4 px-2 py-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800">
                            <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">Post Office Rules, 2024</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Under Post Office Act, 2023</p>
                        </div>
                        <nav className="space-y-8 pb-10 pr-2">
                            {filteredData.map((chapter) => (
                                <div key={chapter.id}>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-4">{chapter.title.split(':')[0]}</h3>
                                    <ul className="space-y-1">
                                        {chapter.subsections.map((sub) => (
                                            <li key={sub.id}>
                                                <a href={`#${sub.id}`} className={`group flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm transition-all duration-200 border-l-[3px] ${activeSection === sub.id ? 'bg-cyan-50/80 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-600 font-semibold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:pl-5'}`} onClick={() => setSidebarOpen(false)}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${activeSection === sub.id ? 'bg-cyan-500' : 'bg-slate-300 group-hover:bg-cyan-400'} transition-colors shrink-0`} />
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
                                                <button onClick={() => handleCopy(sub.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-cyan-600 rounded transition-all" title="Copy link">{copiedId === sub.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}</button>
                                            </div>
                                            <div className="p-6 text-slate-600 dark:text-slate-300 leading-7">
                                                {sub.content.map((block, idx) => (
                                                    <div key={idx} className="mb-4 last:mb-0">
                                                        {block.type === 'text' && <p className="font-serif text-base md:text-lg leading-relaxed"><MetricParser text={block.content as string} /></p>}
                                                        {block.type === 'list' && Array.isArray(block.content) && (
                                                            <ul className="space-y-3 mt-2">
                                                                {(block.content as string[]).map((item, i) => (
                                                                    <li key={i} className="flex gap-3 text-base">
                                                                        <div className="mt-2 w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                                                                        <span><MetricParser text={item} /></span>
                                                                    </li>
                                                                ))}
                                                            </ul>
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
                            <p>&copy; {new Date().getFullYear()} Dak Guru Learning Systems. Content based on Post Office Rules, 2024.</p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
