'use client';

import React, { useState, useEffect } from 'react';
import {
    Search,
    Moon,
    Sun,
    Printer,
    Menu,
    X,
    Mail,
    ArrowLeft,
    AlertTriangle,
    Copy,
    Check,
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
    subsections: {
        id: string;
        title: string;
        content: ContentBlock[];
        isUpdate?: boolean;
        updateSource?: string;
    }[];
}

/**
 * Post Office Act, 2023 — Structured guide content
 * Act No. 43 of 2023 | Assented: 24 Dec 2023 | In force: 18 June 2024
 */
const actData: Section[] = [
    {
        id: 'chap-1',
        title: 'Chapter I: Preliminary',
        subsections: [
            {
                id: 'sec-1',
                title: '1. Short title, extent and commencement',
                content: [
                    { type: 'text', content: 'This Act may be called the <strong>Post Office Act, 2023</strong>.' },
                    { type: 'text', content: 'It extends to the whole of India.' },
                    {
                        type: 'list',
                        content: [
                            '<strong>Citation:</strong> Act No. 43 of 2023.',
                            '<strong>Passed by Rajya Sabha:</strong> 4 December 2023.',
                            '<strong>Passed by Lok Sabha:</strong> 18 December 2023.',
                            '<strong>Assented by President:</strong> 24 December 2023.',
                            '<strong>Came into force:</strong> 18 June 2024.',
                            '<strong>Repeals:</strong> The Indian Post Office Act, 1898 (6 of 1898).'
                        ]
                    }
                ]
            },
            {
                id: 'sec-2',
                title: '2. Definitions',
                content: [
                    { type: 'text', content: 'Key definitions for the Act:' },
                    {
                        type: 'list',
                        content: [
                            '<strong>Director General:</strong> The Director General of Post Office appointed by the Central Government. He is responsible for operations and may make regulations on services and charges.',
                            '<strong>Item:</strong> Any letter, postcard, parcel, or any other article transmitted by post.',
                            '<strong>Post Office:</strong> Any house, building, room, or place where postal articles are received, dispatched, or delivered.',
                            '<strong>Postage stamp:</strong> Any stamp, whether physical or digital, issued by the Post Office for the purpose of indicating payment of postage or other fees.',
                            '<strong>Postal stationery:</strong> Stationery issued by the Post Office for use in connection with postal services.',
                            '<strong>Transmission:</strong> Conveyance of items by the Post Office from one place to another.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-2',
        title: 'Chapter II: Post Office Services & Privileges',
        subsections: [
            {
                id: 'sec-3',
                title: '3. Services and powers of Director General',
                content: [
                    { type: 'text', content: 'The Post Office may provide such services as the <strong>Central Government</strong> may prescribe.' },
                    {
                        type: 'list',
                        content: [
                            'The <strong>Director General</strong> may make regulations on the conduct of service activities and the charges for such services.',
                            'The Act provides flexibility to the Department in determining prices of services within a competitive courier industry.',
                            'Enables prompt responsiveness to dynamic market demands (unlike the 1898 Act which required Parliament nod for fee changes).'
                        ]
                    }
                ]
            },
            {
                id: 'sec-4',
                title: '4. Exclusive privilege to issue postage stamps',
                content: [
                    { type: 'text', content: 'The <strong>Post Office</strong> shall have the <strong>exclusive privilege</strong> of issuing postage stamps in physical or digital form.' },
                    { type: 'text', content: 'Postage stamps shall be issued in accordance with regulations made by the Central Government.' }
                ]
            },
            {
                id: 'sec-5',
                title: '5. Addressing and postcodes',
                content: [
                    { type: 'text', content: 'The Central Government may prescribe <strong>standards for addressing</strong> items, <strong>address identifiers</strong>, and <strong>postcodes</strong> for the purpose of transmission and delivery of postal articles.' }
                ]
            },
            {
                id: 'regulations-dg',
                title: 'Regulations by Director General',
                content: [
                    { type: 'text', content: 'The Director General may, with the previous approval of the Central Government, make <strong>regulations</strong> to carry out the provisions of the Act.' },
                    {
                        type: 'list',
                        content: [
                            'Regulations may cover: conduct of postal services, charges, conditions of transmission, and other operational matters.',
                            'Such regulations are required to be laid before Parliament (positive/negative resolution as prescribed).',
                            'This gives the Department flexibility to adapt to market conditions without amending the Act.'
                        ]
                    }
                ]
            },
            {
                id: 'major-change',
                title: 'Major change from 1898 Act',
                isUpdate: true,
                updateSource: 'Post Office Act, 2023',
                content: [
                    { type: 'text', content: 'The Act <strong>removes</strong> the exclusive privilege of the Post Office for collecting, processing, and delivering letters. This is intended to enhance ease of doing business and allow private players in certain segments while India Post expands into banking, insurance, and e-commerce delivery.' }
                ]
            }
        ]
    },
    {
        id: 'chap-3',
        title: 'Chapter III: Interception & Detention',
        subsections: [
            {
                id: 'sec-9',
                title: '9. Interception, opening or detention of postal articles',
                content: [
                    { type: 'text', content: 'The <strong>Central Government</strong> may, by order, empower any officer to <strong>intercept, open or detain</strong> any item in the course of transmission by the Post Office.' },
                    {
                        type: 'list',
                        content: [
                            '<strong>Grounds:</strong> Security of the State; friendly relations with foreign States; public order; emergency; public safety; or prevention of any offence under this Act.',
                            'Such interception, opening or detention may be carried out in accordance with the procedure prescribed.',
                            'This provision has been a subject of debate regarding privacy and potential misuse; transparency and oversight are important.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-4',
        title: 'Chapter IV: Liability & Exemptions',
        subsections: [
            {
                id: 'sec-10',
                title: '10. Exemption from liability',
                content: [
                    { type: 'text', content: 'The <strong>Post Office</strong> and its officers are <strong>exempt from liability</strong> for loss, mis-delivery, delay, or damage to any postal article, except in such cases as may be prescribed.' },
                    {
                        type: 'list',
                        content: [
                            'Intended to protect officers from frivolous lawsuits.',
                            'Critics argue it may reduce accountability; balancing protection with responsible service delivery is key for exam discussions.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'chap-5',
        title: 'Chapter V: Inspection, Offences & Penalties',
        subsections: [
            {
                id: 'inspection',
                title: 'Inspection of consignments',
                content: [
                    { type: 'text', content: 'A Post Office official is authorised to <strong>scrutinise a consignment</strong> if there is reasonable suspicion that it contains restricted items or items on which duty is payable.' },
                    {
                        type: 'list',
                        content: [
                            'Purpose: To prevent transmission of prohibited goods, ensure compliance with customs/duty, and maintain security.',
                            'Reasonable suspicion: Must be based on tangible grounds; random or arbitrary examination may be subject to challenge.',
                            'Restricted items: As notified by the Central Government (e.g. arms, explosives, narcotics, counterfeit currency).'
                        ]
                    }
                ]
            },
            {
                id: 'offences',
                title: 'Offences and penalties',
                content: [
                    {
                        type: 'table',
                        content: '',
                        tableData: {
                            headers: ['Offence', 'Punishment'],
                            rows: [
                                ['Theft, misuse or damage to postal items by a Post Office employee', 'Imprisonment up to 7 years and fine'],
                                ['Other offences under the Act', 'As prescribed by the Central Government']
                            ]
                        }
                    },
                    { type: 'text', content: 'Note: The Act does not contain a long list of penal provisions compared to the 1898 Act; many aspects are left to regulations.' }
                ]
            },
            {
                id: 'recovery',
                title: 'Recovery of sums due',
                content: [
                    { type: 'text', content: 'Any sum due from a user to the Post Office (e.g. unpaid charges) may be recovered as <strong>arrears of land revenue</strong>.' }
                ]
            }
        ]
    },
    {
        id: 'chap-6',
        title: 'Chapter VI: Overview for Examinations',
        subsections: [
            {
                id: 'highlights',
                title: 'Key highlights for exams',
                content: [
                    {
                        type: 'list',
                        content: [
                            '<strong>Replacement:</strong> Replaces the 125-year-old Indian Post Office Act, 1898.',
                            '<strong>Objective:</strong> Legislative framework for citizen-centric services, banking, government scheme benefits, and expansion into financial services and e-commerce delivery.',
                            '<strong>Director General:</strong> Appointed by Central Government; can make regulations on services and charges.',
                            '<strong>Exclusive privilege:</strong> Only the Post Office can issue postage stamps (physical or digital); exclusive privilege for letters has been removed.',
                            '<strong>Interception (Sec 9):</strong> Centre can empower officers to intercept/open/detain items for security, public order, emergency, or prevention of offences.',
                            '<strong>Liability (Sec 10):</strong> Post Office and officers exempt from liability for loss, delay, mis-delivery, or damage except as prescribed.',
                            '<strong>Recovery:</strong> Unpaid dues recoverable as arrears of land revenue.'
                        ]
                    }
                ]
            },
            {
                id: 'comparison',
                title: 'Comparison with 1898 Act',
                content: [
                    {
                        type: 'table',
                        content: '',
                        tableData: {
                            headers: ['Aspect', '1898 Act', '2023 Act'],
                            rows: [
                                ['Fee changes', 'Parliament approval required', 'Department flexibility; market-responsive'],
                                ['Letter monopoly', 'Exclusive privilege for letters', 'Removed'],
                                ['Stamps', 'Post Office issue', 'Exclusive privilege retained (physical + digital)'],
                                ['Scope', 'Mainly mail', 'Mail + banking, insurance, e-commerce, citizen services']
                            ]
                        }
                    }
                ]
            }
        ]
    },
];

const StatutoryUpdate = ({ title, source, children }: { title: string; source?: string; children: React.ReactNode }) => (
    <div className="my-6 border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/20 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-teal-800 dark:text-teal-400 font-bold uppercase text-xs tracking-wider">
            <AlertTriangle size={16} />
            <span>{title}</span>
        </div>
        <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
            {children}
        </div>
        {source && (
            <div className="mt-3 text-xs text-teal-700/70 dark:text-teal-500/70 italic border-t border-teal-200 dark:border-teal-800/50 pt-2">
                Ref: {source}
            </div>
        )}
    </div>
);

const MetricParser = ({ text }: { text: string }) => {
    const parts = text.split(/(<strong>.*?<\/strong>)/g);
    return (
        <span>
            {parts.map((part, index) => {
                if (part.startsWith('<strong>')) {
                    const content = part.replace(/<\/?strong>/g, '');
                    return (
                        <span key={index} className="font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-1 rounded mx-0.5">
                            {content}
                        </span>
                    );
                }
                return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
};

export default function PostOfficeAct2023Guide() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );
        document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const filteredData = actData.map((chapter) => ({
        ...chapter,
        subsections: chapter.subsections.filter(
            (sub) =>
                sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sub.content.some((c) =>
                    typeof c.content === 'string'
                        ? c.content.toLowerCase().includes(searchQuery.toLowerCase())
                        : (c.content as string[]).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
                )
        ),
    })).filter((chapter) => chapter.subsections.length > 0);

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
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300">
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                                <Mail size={18} />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                                Dak <span className="text-teal-600">Guru</span>
                            </h1>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search sections or keywords..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-teal-500 text-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => window.print()} className="p-2 text-slate-500 hover:text-teal-600 transition-colors" title="Print Guide">
                            <Printer size={20} />
                        </button>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-500 hover:text-amber-500 transition-colors" title="Toggle Theme">
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
                <div className="h-1 bg-slate-200 dark:bg-slate-700 w-full">
                    <div className="h-full bg-teal-600 w-[40%]"></div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto pt-20 pb-12 flex items-start gap-6 px-4">
                <aside
                    className={`
          fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:bg-transparent lg:border-none lg:overflow-y-auto lg:w-72 lg:block
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          print:hidden
        `}
                >
                    <div className="p-6 lg:p-0">
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <span className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Table of Contents</span>
                            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="mb-4 px-2 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
                            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">Post Office Act, 2023</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Act No. 43 of 2023 · In force 18 June 2024</p>
                        </div>
                        <nav className="space-y-8 pb-10 pr-2">
                            {filteredData.map((chapter) => (
                                <div key={chapter.id}>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-4">{chapter.title.split(':')[0]}</h3>
                                    <ul className="space-y-1">
                                        {chapter.subsections.map((sub) => {
                                            let label = sub.title;
                                            const match = sub.title.match(/^(\d+)\./);
                                            if (match) label = `Section ${match[1]}`;
                                            else if (sub.isUpdate) label = 'Update';
                                            return (
                                                <li key={sub.id}>
                                                    <a
                                                        href={`#${sub.id}`}
                                                        className={`group flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm transition-all duration-200 border-l-[3px] ${
                                                            activeSection === sub.id
                                                                ? 'bg-teal-50/80 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-600 font-semibold shadow-sm'
                                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:pl-5'
                                                        }`}
                                                        onClick={() => setSidebarOpen(false)}
                                                    >
                                                        {sub.isUpdate ? (
                                                            <AlertTriangle size={14} className={`shrink-0 ${activeSection === sub.id ? 'text-teal-500' : 'text-slate-400 group-hover:text-teal-500'}`} />
                                                        ) : (
                                                            <span className={`h-1.5 w-1.5 rounded-full ${activeSection === sub.id ? 'bg-teal-500' : 'bg-slate-300 group-hover:bg-teal-400'} transition-colors shrink-0`} />
                                                        )}
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
                                        <section
                                            key={sub.id}
                                            id={sub.id}
                                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden scroll-mt-24 group transition-all hover:shadow-md"
                                        >
                                            <div className={`px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start ${sub.isUpdate ? 'bg-teal-50/50 dark:bg-teal-900/10' : ''}`}>
                                                <div>
                                                    <h3 className={`text-lg font-bold ${sub.isUpdate ? 'text-teal-700 dark:text-teal-500' : 'text-slate-800 dark:text-white'} flex items-center gap-2`}>
                                                        {sub.title}
                                                        {sub.isUpdate && (
                                                            <span className="bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Update</span>
                                                        )}
                                                    </h3>
                                                </div>
                                                <button
                                                    onClick={() => handleCopy(sub.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-slate-700 rounded transition-all"
                                                    title="Copy link"
                                                >
                                                    {copiedId === sub.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            <div className="p-6 text-slate-600 dark:text-slate-300 leading-7">
                                                {sub.isUpdate ? (
                                                    <StatutoryUpdate title="Key change" source={sub.updateSource}>
                                                        {sub.content.map((block, idx) => (
                                                            <div key={idx} className="mb-4 last:mb-0">
                                                                {block.type === 'list' && Array.isArray(block.content) ? (
                                                                    <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
                                                                        {(block.content as string[]).map((item, i) => (
                                                                            <li key={i}>
                                                                                <MetricParser text={item} />
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p>
                                                                        <MetricParser text={block.content as string} />
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </StatutoryUpdate>
                                                ) : (
                                                    sub.content.map((block, idx) => (
                                                        <div key={idx} className="mb-4 last:mb-0">
                                                            {block.type === 'text' && (
                                                                <p className="font-serif text-base md:text-lg leading-relaxed">
                                                                    <MetricParser text={block.content as string} />
                                                                </p>
                                                            )}
                                                            {block.type === 'list' && Array.isArray(block.content) && (
                                                                <ul className="space-y-3 mt-2">
                                                                    {(block.content as string[]).map((item, i) => (
                                                                        <li key={i} className="flex gap-3 text-base">
                                                                            <div className="mt-2 w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
                                                                            <span>
                                                                                <MetricParser text={item} />
                                                                            </span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                            {block.type === 'table' && block.tableData && (
                                                                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mt-4">
                                                                    <table className="w-full text-sm text-left">
                                                                        <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase font-bold text-xs">
                                                                            <tr>
                                                                                {block.tableData.headers.map((h, i) => (
                                                                                    <th key={i} className="px-6 py-3">{h}</th>
                                                                                ))}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                                                            {block.tableData.rows.map((row, rIdx) => (
                                                                                <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                                                                    {row.map((cell, cIdx) => (
                                                                                        <td key={cIdx} className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                                                                                            {cell}
                                                                                        </td>
                                                                                    ))}
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-400 text-sm print:hidden">
                            <p>&copy; {new Date().getFullYear()} Dak Guru Learning Systems. All Rights Reserved.</p>
                            <p className="mt-2 text-xs">Content based on the Post Office Act, 2023 (Act No. 43 of 2023) and related sources.</p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
