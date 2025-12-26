'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Bell, BookOpen, ChevronRight, ChevronDown,
    Printer, Moon, Sun, ArrowLeft, Copy, CheckCircle2,
    Clock, ShieldCheck, Scale, Landmark, AlertCircle
} from 'lucide-react';

/**
 * DAK GURU: PMLA 2002 Interactive Study Guide
 * A premium EdTech UI for Civil Service Aspirants.
 */

const PMLAStudyGuide = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState("preliminary");
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ preliminary: true });
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Handle Scroll Progress
    useEffect(() => {
        const updateScroll = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setScrollProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
            }
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    const toggleSection = (id: string) => {
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const copyToClipboard = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handlePrint = () => window.print();

    // Custom Components
    const Highlight = ({ children }: { children: React.ReactNode }) => (
        <span className="font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-1 rounded">
            {children}
        </span>
    );

    const StatutoryUpdate = ({ title, children, refSource }: { title?: string, children: React.ReactNode, refSource?: string }) => (
        <div className="my-6 p-5 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-left-2">
            <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-300">
                <Bell size={18} className="animate-bounce" />
                <span className="font-bold uppercase tracking-wider text-sm">Statutory Update</span>
            </div>
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed italic">
                {children}
            </div>
            {refSource && (
                <div className="mt-3 text-xs font-medium text-amber-600 dark:text-amber-500 underline decoration-dotted">
                    Ref: {refSource}
                </div>
            )}
        </div>
    );

    const SectionHeader = ({ num, title, id }: { num: string, title: string, id: string }) => (
        <div
            className="group flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all border-b border-gray-100 dark:border-gray-800"
            onClick={() => toggleSection(id)}
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    {num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {title}
                </h3>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={(e) => { e.stopPropagation(); copyToClipboard(id, `${num}. ${title}`); }}
                    className="p-1.5 text-gray-400 hover:text-indigo-500 transition-colors"
                >
                    {copiedId === id ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                {expandedSections[id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
        </div>
    );

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-sans antialiased selection:bg-indigo-100 dark:selection:bg-indigo-900`}>
            <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">

                {/* Reading Progress Bar */}
                <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-gray-100 dark:bg-gray-800">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>

                {/* Header - Dak Guru */}
                <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md print:hidden">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">DAK GURU</h1>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Self-Learning Portal</p>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search rules, sections, or keywords..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={handlePrint} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"><Printer size={20} /></button>
                            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-none">
                                Dashboard
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">

                    {/* Navigation Sidebar (ToC) */}
                    <aside className="hidden lg:block w-64 sticky top-24 self-start h-[calc(100vh-120px)] print:hidden">
                        <nav className="space-y-1 overflow-y-auto pr-4 h-full scrollbar-hide">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Table of Contents</p>
                            {[
                                { id: "preliminary", title: "Preliminary", icon: <BookOpen size={16} /> },
                                { id: "offence", title: "Offence of ML", icon: <ShieldCheck size={16} /> },
                                { id: "attachment", title: "Attachment & Confiscation", icon: <Scale size={16} /> },
                                { id: "obligations", title: "Entity Obligations", icon: <Landmark size={16} /> },
                                { id: "investigation", title: "Investigation Powers", icon: <Search size={16} /> },
                                { id: "appellate", title: "Appellate Tribunal", icon: <AlertCircle size={16} /> },
                                { id: "kyc", title: "KYC & AML Norms", icon: <CheckCircle2 size={16} /> },
                            ].map(item => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === item.id ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-200' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    {item.icon}
                                    {item.title}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <article className="flex-1 max-w-4xl space-y-12 pb-24">

                        {/* Title Section */}
                        <div className="border-b border-gray-200 dark:border-gray-800 pb-8">
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-2">
                                <Clock size={16} /> Last Updated: Dec 2025
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                                Prevention of Money Laundering Act, 2002
                            </h2>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full">Act 15 of 2003</span>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">Enacted: 17th Jan 2003</span>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">Commenced: 01st July 2005</span>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <section id="preliminary" className="scroll-mt-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <SectionHeader num="Sec 1-2" title="Preliminary Definitions" id="preliminary" />
                                {expandedSections.preliminary && (
                                    <div className="p-6 font-serif text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-6">
                                        <p>
                                            The PMLA extends to the <Highlight>whole of India</Highlight>. It provides for the confiscation of property derived from money-laundering.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-4 not-serif font-sans">
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                                <h4 className="font-bold text-indigo-600 mb-1">Attachment</h4>
                                                <p className="text-sm">Prohibition of transfer, conversion, or movement of property by an order issued.</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                                <h4 className="font-bold text-indigo-600 mb-1">Proceeds of Crime</h4>
                                                <p className="text-sm">Any property derived directly or indirectly from criminal activity relating to a scheduled offence.</p>
                                            </div>
                                        </div>

                                        <StatutoryUpdate refSource="Amendment Act, 2019">
                                            The definition of "Proceeds of Crime" now includes property derived not only from the scheduled offence but also any criminal activity <Highlight>relatable</Highlight> to it.
                                        </StatutoryUpdate>

                                        <p>
                                            <Highlight>Reporting Entity</Highlight> means a banking company, financial institution, intermediary, or a person carrying on a designated business, including the <Highlight>Department of Posts</Highlight>.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section id="offence" className="scroll-mt-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <SectionHeader num="Sec 3-4" title="Offence of Money Laundering" id="offence" />
                                {expandedSections.offence && (
                                    <div className="p-6 font-serif text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                        <p className="mb-4">
                                            Whosoever directly or indirectly attempts to indulge or knowingly assists is guilty if involved in:
                                        </p>
                                        <ul className="grid grid-cols-2 gap-3 not-serif font-sans text-sm mb-6">
                                            {['Concealment', 'Possession', 'Acquisition', 'Use', 'Projecting as untainted', 'Claiming as untainted'].map(item => (
                                                <li key={item} className="flex items-center gap-2 p-2 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg">
                                                    <CheckCircle2 size={16} className="text-indigo-500" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="p-4 border-2 border-dashed border-red-200 dark:border-red-900/30 rounded-xl bg-red-50/30 dark:bg-red-900/10">
                                            <h4 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2">
                                                <Scale size={18} /> Section 4: Punishment
                                            </h4>
                                            <p className="text-sm font-sans">
                                                Rigorous imprisonment for <Highlight>3 to 7 years</Highlight> + Fine.
                                                <br />Note: If related to NDPS Act offences, the term extends up to <Highlight>10 years</Highlight>.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section id="attachment" className="scroll-mt-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <SectionHeader num="Sec 5-11" title="Attachment & Confiscation" id="attachment" />
                                {expandedSections.attachment && (
                                    <div className="p-6 font-serif text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                        <div className="space-y-4">
                                            <p>
                                                Where the Director has reason to believe that any person is in possession of any proceeds of crime and such proceeds of crime are likely to be <Highlight>concealed, transferred or dealt with</Highlight> in any manner, he may provisionally attach such property for a period not exceeding <Highlight>180 days</Highlight>.
                                            </p>
                                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                                <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">Adjudicating Authority</h4>
                                                <p className="text-sm">
                                                    The Adjudicating Authority is appointed by the Central Government. The Director shall file a complaint stating the facts of such attachment before the Adjudicating Authority within <Highlight>30 days</Highlight>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section id="obligations" className="scroll-mt-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <SectionHeader num="Sec 12-15" title="Obligations of Banking Companies, FIs & Intermediaries" id="obligations" />
                                {expandedSections.obligations && (
                                    <div className="p-6 font-serif text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                        <ul className="list-disc list-inside space-y-3 marker:text-indigo-500">
                                            <li><Highlight>Verification of Identity</Highlight>: Maintain records of the identity of all its clients.</li>
                                            <li><Highlight>Maintenance of Records</Highlight>: Maintain record of all transactions for a period of <Highlight>5 years</Highlight> from the date of transaction between a client and the reporting entity.</li>
                                            <li><Highlight>Furnishing Information</Highlight>: Furnish to the Director information relating to such transactions, whether attempted or executed.</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section id="investigation" className="scroll-mt-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <SectionHeader num="Sec 16-24" title="Summons, Searches and Seizures" id="investigation" />
                                {expandedSections.investigation && (
                                    <div className="p-6 font-serif text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                        <p className="mb-4">
                                            The Director or any other officer authorised by him shall have power to:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-serif font-sans text-sm">
                                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center text-center gap-2">
                                                <Search size={20} className="text-indigo-500" />
                                                <span className="font-medium">Survey</span>
                                            </div>
                                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center text-center gap-2">
                                                <ShieldCheck size={20} className="text-indigo-500" />
                                                <span className="font-medium">Search & Seizure</span>
                                            </div>
                                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center text-center gap-2">
                                                <Scale size={20} className="text-indigo-500" />
                                                <span className="font-medium">Power of Arrest</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section id="appellate" className="scroll-mt-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <SectionHeader num="Sec 25-42" title="Appellate Tribunal" id="appellate" />
                                {expandedSections.appellate && (
                                    <div className="p-6 font-serif text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                        <p>
                                            Any person aggrieved by an order made by the Adjudicating Authority may prefer an appeal to the Appellate Tribunal within a period of <Highlight>45 days</Highlight>.
                                        </p>
                                        <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-xl text-sm font-sans flex items-start gap-3">
                                            <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                            <p>Further appeal against the decision or order of the Appellate Tribunal may be filed to the <Highlight>High Court</Highlight> within <Highlight>60 days</Highlight>.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section id="kyc" className="scroll-mt-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <SectionHeader num="KYC" title="KYC & AML Norms (Dak Guru Specific)" id="kyc" />
                                {expandedSections.kyc && (
                                    <div className="p-6 space-y-6">
                                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                                            <table className="w-full text-left text-sm font-sans">
                                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500">
                                                    <tr>
                                                        <th className="p-4 font-bold uppercase tracking-wider">Risk Category</th>
                                                        <th className="p-4 font-bold uppercase tracking-wider">Threshold</th>
                                                        <th className="p-4 font-bold uppercase tracking-wider">Re-KYC Period</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                                    <tr>
                                                        <td className="p-4 font-bold text-green-600">Low Risk</td>
                                                        <td className="p-4">Up to <Highlight>₹50,000</Highlight></td>
                                                        <td className="p-4">Every <Highlight>7 Years</Highlight></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-4 font-bold text-amber-600">Medium Risk</td>
                                                        <td className="p-4">₹50k to <Highlight>₹10 Lakh</Highlight></td>
                                                        <td className="p-4">Every <Highlight>5 Years</Highlight></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-4 font-bold text-red-600">High Risk</td>
                                                        <td className="p-4">Exceeding <Highlight>₹10 Lakh</Highlight></td>
                                                        <td className="p-4">Every <Highlight>2 Years</Highlight></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="p-5 bg-indigo-900 text-indigo-100 rounded-xl">
                                            <h4 className="font-bold flex items-center gap-2 mb-3">
                                                <Landmark size={18} /> Post Office Reporting (CTR/STR)
                                            </h4>
                                            <ul className="text-sm space-y-2 opacity-90">
                                                <li>• Cash transactions &gt; <Highlight>₹10 Lakh</Highlight> must be reported (CTR).</li>
                                                <li>• Series of connected transactions &gt; <Highlight>₹10 Lakh</Highlight> in <Highlight>1 month</Highlight>.</li>
                                                <li>• Suspicious Transaction Reports (STR) must be filed <Highlight>regardless of value</Highlight>.</li>
                                                <li>• Attempted transactions that are aborted must also be reported as STR.</li>
                                            </ul>
                                        </div>

                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800 p-5">
                                            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                                                <Clock size={18} /> Strict Reporting Deadlines
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                                                    <span className="block font-bold text-gray-700 dark:text-gray-300 mb-1">CTR (Cash Transaction Report)</span>
                                                    <span className="text-gray-500">By <Highlight>15th</Highlight> of the succeeding month.</span>
                                                </div>
                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                                                    <span className="block font-bold text-gray-700 dark:text-gray-300 mb-1">STR (Suspicious Transaction Report)</span>
                                                    <span className="text-gray-500">Within <Highlight>7 working days</Highlight> of arriving at a conclusion.</span>
                                                </div>
                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                                                    <span className="block font-bold text-gray-700 dark:text-gray-300 mb-1">CCR (Counterfeit Currency Report)</span>
                                                    <span className="text-gray-500">By <Highlight>15th</Highlight> of the succeeding month.</span>
                                                </div>
                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                                                    <span className="block font-bold text-gray-700 dark:text-gray-300 mb-1">NTR (Non-Profit Org Transaction)</span>
                                                    <span className="text-gray-500">By <Highlight>15th</Highlight> of the succeeding month.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                    </article>
                </main>

                {/* Print Styles */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          @media print {
            .print\\:hidden { display: none !important; }
            body { background: white !important; color: black !important; }
            article { max-width: 100% !important; margin: 0 !important; }
            .rounded-2xl { border: 1px solid #eee !important; border-radius: 0 !important; }
          }
        `}} />
            </div>
        </div>
    );
};

export default PMLAStudyGuide;
