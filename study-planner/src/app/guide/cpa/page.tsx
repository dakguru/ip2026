'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
    BookOpen,
    Search,
    Moon,
    Sun,
    Printer,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    AlertTriangle,
    Scale,
    Copy,
    Check,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

/**
 * TYPE DEFINITIONS
 * Structured data model for Legal Content
 */
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
        isUpdate?: boolean; // Highlights statutory updates
        updateSource?: string;
    }[];
}

/**
 * SAMPLE DATA: CONSUMER PROTECTION ACT, 2019
 * Extracted and structured from the provided PDFs.
 * Note: Includes the Statutory Update regarding Pecuniary Jurisdiction (2021 Rules).
 */
const actData: Section[] = [
    // --- CHAPTER I ---
    {
        id: 'chap-1',
        title: 'Chapter I: Preliminary',
        subsections: [
            {
                id: 'sec-1',
                title: '1. Short title, extent, commencement and application',
                content: [
                    { type: 'text', content: 'This Act may be called the Consumer Protection Act, 2019.' },
                    { type: 'text', content: 'It extends to the whole of India (except J&K exclusion removed by Reorganisation Act).' },
                    { type: 'text', content: 'It shall come into force on such date as the Central Government may appoint.' }
                ]
            },
            {
                id: 'sec-2',
                title: '2. Definitions',
                content: [
                    { type: 'text', content: 'Key definitions crucial for the exam:' },
                    {
                        type: 'list',
                        content: [
                            '<strong>(1) Advertisement:</strong> Any audio or visual publicity, representation, endorsement or pronouncement made by means of light, sound, smoke, gas, print, electronic media, internet or website.',
                            '<strong>(6) Complaint:</strong> Any allegation in writing made by a complainant for obtaining relief regarding unfair trade practices, defects in goods, deficiency in services, or hazardous goods.',
                            '<strong>(7) Consumer:</strong> A person who buys goods or hires services for consideration. <em>Excludes</em> those who obtain goods for resale or commercial purposes.',
                            '<strong>(10) Defect:</strong> Any fault, imperfection or shortcoming in the quality, quantity, potency, purity or standard.',
                            '<strong>(41) Restrictive Trade Practice:</strong> A trade practice which tends to bring about manipulation of price or conditions of delivery (e.g., delay in supply, tie-up sales).',
                            '<strong>(46) Unfair Contract:</strong> A contract having terms which cause significant change in the rights of a consumer (e.g., excessive security deposits, disproportionate penalties).',
                            '<strong>(47) Unfair Trade Practice:</strong> A trade practice adopting any unfair method or deceptive practice (e.g., false representation, misleading ads, faking sponsorship).'
                        ]
                    }
                ]
            }
        ]
    },

    // --- CHAPTER II ---
    {
        id: 'chap-2',
        title: 'Chapter II: Consumer Protection Councils',
        subsections: [
            {
                id: 'sec-3-5',
                title: '3-5. Central Consumer Protection Council',
                content: [
                    { type: 'text', content: '<strong>Establishment:</strong> The Central Government shall establish the Central Consumer Protection Council.' },
                    {
                        type: 'list', content: [
                            '<strong>Chairperson:</strong> Minister-in-charge of Consumer Affairs (Central Govt).',
                            '<strong>Meetings:</strong> At least one meeting every year.',
                            '<strong>Object:</strong> To render advice on promotion and protection of consumer rights.'
                        ]
                    }
                ]
            },
            {
                id: 'sec-6-7',
                title: '6-7. State Consumer Protection Council',
                content: [
                    { type: 'text', content: '<strong>Establishment:</strong> Every State Government shall establish a State Council.' },
                    {
                        type: 'list', content: [
                            '<strong>Chairperson:</strong> Minister-in-charge of Consumer Affairs (State Govt).',
                            '<strong>Meetings:</strong> At least two meetings every year.',
                            '<strong>Object:</strong> Advice on promotion and protection of rights within the State.'
                        ]
                    }
                ]
            },
            {
                id: 'sec-8-9',
                title: '8-9. District Consumer Protection Council',
                content: [
                    { type: 'text', content: '<strong>Establishment:</strong> State Government shall establish a District Council for every district.' },
                    {
                        type: 'list', content: [
                            '<strong>Chairperson:</strong> The Collector of the district.',
                            '<strong>Meetings:</strong> At least two meetings every year.',
                            '<strong>Object:</strong> Advice on promotion and protection of rights within the district.'
                        ]
                    }
                ]
            }
        ]
    },

    // --- CHAPTER III ---
    {
        id: 'chap-3',
        title: 'Chapter III: Central Consumer Protection Authority (CCPA)',
        subsections: [
            {
                id: 'sec-10',
                title: '10. Establishment of Central Authority',
                content: [
                    { type: 'text', content: 'Established to regulate matters relating to violation of rights of consumers, unfair trade practices, and false/misleading advertisements.' }
                ]
            },
            {
                id: 'sec-15',
                title: '15. Investigation Wing',
                content: [
                    { type: 'text', content: 'The Central Authority shall have an Investigation Wing headed by a <strong>Director-General</strong> for conducting inquiry or investigation.' }
                ]
            },
            {
                id: 'sec-18',
                title: '18. Powers and Functions',
                content: [
                    {
                        type: 'list', content: [
                            'Protect and enforce the rights of consumers as a class.',
                            'Prevent unfair trade practices.',
                            'Ensure no false or misleading advertisement is made.',
                            'Suo motu inquiry into violations.',
                            'File complaints before the District, State, or National Commission.'
                        ]
                    }
                ]
            },
            {
                id: 'sec-21',
                title: '21. Penalties for Misleading Advertisements',
                content: [
                    { type: 'text', content: 'The Central Authority may issue directions and penalties:' },
                    {
                        type: 'list', content: [
                            '<strong>Manufacturer/Endorser Penalty:</strong> Up to <strong>Rs. 10 Lakhs</strong>.',
                            '<strong>Subsequent Offence:</strong> Up to <strong>Rs. 50 Lakhs</strong>.',
                            '<strong>Prohibition of Endorser:</strong> Up to 1 year (first offence) and 3 years (subsequent).'
                        ]
                    }
                ]
            }
        ]
    },

    // --- CHAPTER IV ---
    {
        id: 'chap-4',
        title: 'Chapter IV: Disputes Redressal Commission',
        subsections: [
            {
                id: 'sec-28',
                title: '28. District Commission Establishment',
                content: [
                    { type: 'text', content: 'State Government shall establish a District Consumer Disputes Redressal Commission in each district.' },
                    { type: 'text', content: '<strong>Composition:</strong> A President and not less than two members.' }
                ]
            },
            {
                id: 'sec-34',
                title: '34. Jurisdiction of District Commission',
                content: [
                    { type: 'text', content: '<strong>Original Act Text:</strong> Jurisdiction where value does not exceed one crore rupees.' }
                ]
            },
            {
                id: 'update-pecuniary',
                title: 'STATUTORY UPDATE: Pecuniary Jurisdiction (2021)',
                isUpdate: true,
                updateSource: 'Consumer Protection (Jurisdiction...) Rules, 2021',
                content: [
                    { type: 'text', content: 'The pecuniary jurisdiction limits have been revised to reduce the burden on higher commissions:' },
                    {
                        type: 'list', content: [
                            '<strong>District Commission:</strong> Up to <strong>Rs. 50 Lakhs</strong>',
                            '<strong>State Commission:</strong> > Rs. 50 Lakhs to <strong>Rs. 2 Crores</strong>',
                            '<strong>National Commission:</strong> Exceeding <strong>Rs. 2 Crores</strong>'
                        ]
                    }
                ]
            },
            {
                id: 'sec-35-36',
                title: '35-36. Filing and Proceedings',
                content: [
                    { type: 'text', content: '<strong>Filing:</strong> Complaint can be filed by a consumer, recognised consumer association, or Central/State Govt. Can be filed electronically.' },
                    { type: 'text', content: '<strong>Admissibility:</strong> Ordinarily decided within 21 days. If not decided, deemed admitted.' }
                ]
            },
            {
                id: 'sec-41',
                title: '41. Appeal against District Commission',
                content: [
                    { type: 'text', content: 'Appeal to State Commission within <strong>45 days</strong>. Appellant must deposit <strong>50%</strong> of the amount ordered.' }
                ]
            },
            {
                id: 'sec-42-47',
                title: '42-47. State Commission',
                content: [
                    { type: 'text', content: '<strong>Establishment:</strong> By State Government. Consists of a President and not less than 4 members.' },
                    { type: 'text', content: '<strong>Jurisdiction:</strong> Complaints > Rs. 50 Lakhs up to Rs. 2 Crores (Updated). Appeals against District Commission.' }
                ]
            },
            {
                id: 'sec-53-58',
                title: '53-58. National Commission',
                content: [
                    { type: 'text', content: '<strong>Establishment:</strong> By Central Government (NCR). Consists of a President and not less than 4 members.' },
                    { type: 'text', content: '<strong>Jurisdiction:</strong> Complaints > Rs. 2 Crores (Updated). Appeals against State Commission or Central Authority.' }
                ]
            },
            {
                id: 'sec-69',
                title: '69. Limitation Period',
                content: [
                    { type: 'text', content: 'Complaint must be filed within <strong>2 years</strong> from the date on which the cause of action has arisen.' }
                ]
            },
            {
                id: 'sec-72',
                title: '72. Penalty for non-compliance of Order',
                content: [
                    {
                        type: 'table', content: '',
                        tableData: {
                            headers: ['Offence', 'Punishment'],
                            rows: [
                                ['Failure to comply with Commission Order', 'Imprisonment: 1 month to 3 years'],
                                ['', 'Fine: Rs. 25,000 to Rs. 1 Lakh'],
                                ['', 'Or Both']
                            ]
                        }
                    }
                ]
            }
        ]
    },

    // --- CHAPTER V ---
    {
        id: 'chap-5',
        title: 'Chapter V: Mediation',
        subsections: [
            {
                id: 'sec-74',
                title: '74. Establishment of Consumer Mediation Cell',
                content: [
                    { type: 'text', content: 'Established by State Government (attached to District/State Commissions) and Central Government (attached to National Commission).' },
                    { type: 'text', content: '<strong>Role:</strong> Maintain list of empanelled mediators, cases handled, and records of proceedings.' }
                ]
            },
            {
                id: 'sec-75-80',
                title: '75-80. Mediation Process',
                content: [
                    {
                        type: 'list', content: [
                            '<strong>Empanelment:</strong> Panel valid for 5 years.',
                            '<strong>Duty:</strong> Mediator must disclose personal/financial interest.',
                            '<strong>Settlement:</strong> If agreement reached, terms reduced to writing and signed. Commission passes order within 7 days.'
                        ]
                    }
                ]
            }
        ]
    },

    // --- CHAPTER VI ---
    {
        id: 'chap-6',
        title: 'Chapter VI: Product Liability',
        subsections: [
            {
                id: 'sec-82-83',
                title: '82-83. Application and Action',
                content: [
                    { type: 'text', content: 'Applies to claims for compensation for harm caused by defective products. Action can be brought against Manufacturer, Service Provider, or Seller.' }
                ]
            },
            {
                id: 'sec-84',
                title: '84. Liability of Product Manufacturer',
                content: [
                    { type: 'text', content: 'Liable if product contains manufacturing defect, defective design, deviation from specs, no express warranty, or fails to contain adequate instructions.' }
                ]
            },
            {
                id: 'sec-86',
                title: '86. Liability of Product Seller',
                content: [
                    { type: 'text', content: 'Liable if they exercised substantial control over designing/packaging, altered the product, or made an independent express warranty.' }
                ]
            },
            {
                id: 'sec-87',
                title: '87. Exceptions',
                content: [
                    { type: 'text', content: 'Not liable if product was misused, altered, or modified by the user.' }
                ]
            }
        ]
    },

    // --- CHAPTER VII ---
    {
        id: 'chap-7',
        title: 'Chapter VII: Offences and Penalties',
        subsections: [
            {
                id: 'sec-88-89',
                title: '88-89. General Offences',
                content: [
                    {
                        type: 'table', content: '',
                        tableData: {
                            headers: ['Section', 'Offence', 'Max Imprisonment', 'Max Fine'],
                            rows: [
                                ['88', 'Fail to comply with Central Authority', '6 Months', 'Rs. 20 Lakh'],
                                ['89', 'False/Misleading Ad (1st time)', '2 Years', 'Rs. 10 Lakh'],
                                ['89', 'False/Misleading Ad (Subsequent)', '5 Years', 'Rs. 50 Lakh']
                            ]
                        }
                    }
                ]
            },
            {
                id: 'sec-90-91',
                title: '90-91. Adulterant and Spurious Goods',
                content: [
                    {
                        type: 'table', content: '',
                        tableData: {
                            headers: ['Condition', 'Imprisonment', 'Fine'],
                            rows: [
                                ['No Injury', 'Up to 6 Months (Adulterant) / 1 Yr (Spurious)', 'Up to 1 Lakh / 3 Lakh'],
                                ['Non-Grievous Injury', 'Up to 1 Year', 'Up to 3 Lakh'],
                                ['Grievous Hurt', 'Up to 7 Years', 'Up to 5 Lakh'],
                                ['Death', 'Min 7 Years - Life', 'Min 10 Lakh']
                            ]
                        }
                    },
                    { type: 'text', content: 'Note: Offences causing grievous hurt or death are cognizable and non-bailable.' }
                ]
            }
        ]
    },

    // --- CHAPTER VIII ---
    {
        id: 'chap-8',
        title: 'Chapter VIII: Miscellaneous',
        subsections: [
            {
                id: 'sec-94',
                title: '94. Measures for E-Commerce',
                content: [
                    { type: 'text', content: 'Central Government has notified the <strong>Consumer Protection (E-Commerce) Rules, 2020</strong> to prevent unfair trade practices in e-commerce.' },
                    {
                        type: 'list', content: [
                            '<strong>Applicability:</strong> All e-commerce entities (Marketplace & Inventory models) operating in India or serving Indian consumers.',
                            '<strong>Nodal Officer:</strong> Mandatory appointment of a Nodal Contact Person for 24x7 coordination with law enforcement.',
                            '<strong>Grievance Redressal:</strong> Appoint a Grievance Officer who must acknowledge receipt within <strong>48 hours</strong> and resolve the complaint within <strong>1 month</strong>.',
                            '<strong>Price Manipulation:</strong> E-commerce entities are prohibited from manipulating the price of goods/services to gain unreasonable profit.',
                            '<strong>Cancellation Charges:</strong> Cannot impose cancellation charges unless the entity bears specific costs and the user has been notified.',
                            '<strong>Country of Origin:</strong> Must be clearly displayed.',
                            '<strong>Consent:</strong> No pre-ticked checkboxes for additional payments (Explicit consent required).'
                        ]
                    }
                ]
            },
            {
                id: 'sec-107',
                title: '107. Repeal',
                content: [
                    { type: 'text', content: 'The Consumer Protection Act, 1986 is hereby repealed.' }
                ]
            }
        ]
    },

    // --- ANNEXURE (From Study Guide Source 4) ---
    {
        id: 'annexure',
        title: 'Annexure: Fee Structure',
        subsections: [
            {
                id: 'fee-table',
                title: 'Court Fee Structure (w.e.f. 17.08.2023)',
                content: [
                    {
                        type: 'table', content: '',
                        tableData: {
                            headers: ['Value of Consideration', 'Court Fee'],
                            rows: [
                                ['Up to 5 Lakh', 'Nil'],
                                ['Above 5 Lakh - 10 Lakh', 'Rs. 200'],
                                ['Above 10 Lakh - 20 Lakh', 'Rs. 400'],
                                ['Above 20 Lakh - 50 Lakh', 'Rs. 1000'],
                                ['Above 50 Lakh - 1 Crore', 'Rs. 2000'],
                                ['Above 1 Crore - 2 Crore', 'Rs. 2500'],
                                ['Above 2 Crore - 4 Crore', 'Rs. 3000'],
                                ['Above 4 Crore - 6 Crore', 'Rs. 4000'],
                                ['Above 6 Crore - 8 Crore', 'Rs. 5000'],
                                ['Above 8 Crore - 10 Crore', 'Rs. 6000'],
                                ['Above 10 Crore', 'Rs. 7500']
                            ]
                        }
                    }
                ]
            }
        ]
    }
];

/**
 * COMPONENT: Statutory Alert Card
 * Specialized styling for updates/amendments.
 */
const StatutoryUpdate = ({ title, source, children }: { title: string; source?: string; children: React.ReactNode }) => (
    <div className="my-6 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-400 font-bold uppercase text-xs tracking-wider">
            <AlertTriangle size={16} />
            <span>{title}</span>
        </div>
        <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
            {children}
        </div>
        {source && (
            <div className="mt-3 text-xs text-amber-700/70 dark:text-amber-500/70 italic border-t border-amber-200 dark:border-amber-800/50 pt-2">
                Ref: {source}
            </div>
        )}
    </div>
);

/**
 * COMPONENT: Metric Highlighter
 * Parses text to bold metrics (Currency, Dates, Percentages).
 */
const MetricParser = ({ text }: { text: string }) => {
    // Regex to find things inside <strong> tags for special styling
    const parts = text.split(/(<strong>.*?<\/strong>)/g);

    return (
        <span>
            {parts.map((part, index) => {
                if (part.startsWith('<strong>')) {
                    const content = part.replace(/<\/?strong>/g, '');
                    return (
                        <span key={index} className="font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-1 rounded mx-0.5">
                            {content}
                        </span>
                    );
                }
                return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
};

/**
 * MAIN COMPONENT: Dak Guru Study Portal
 */
export default function CPA2019Guide() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // ScrollSpy Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Filter Data based on Search
    const filteredData = actData.map(chapter => ({
        ...chapter,
        subsections: chapter.subsections.filter(sub =>
            sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.content.some(c =>
                typeof c.content === 'string' && c.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
    })).filter(chapter => chapter.subsections.length > 0);

    // Copy Link Handler
    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(`${window.location.origin}#${id}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Toggle Dark Mode class on body
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

            {/* --- HEADER --- */}
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
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <Scale size={18} />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                                Dak <span className="text-blue-600">Guru</span>
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Rules, Sections, or Keywords..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.print()}
                            className="p-2 text-slate-500 hover:text-blue-600 transition-colors"
                            title="Print Guide"
                        >
                            <Printer size={20} />
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 text-slate-500 hover:text-amber-500 transition-colors"
                            title="Toggle Theme"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>

                {/* Progress Bar (Visual Flair) */}
                <div className="h-1 bg-slate-200 dark:bg-slate-700 w-full">
                    <div className="h-full bg-blue-600 w-[35%]"></div>
                </div>
            </header>

            {/* --- MAIN LAYOUT --- */}
            <div className="max-w-7xl mx-auto pt-20 pb-12 flex items-start gap-6 px-4">

                {/* --- SIDEBAR (Table of Contents) --- */}
                <aside className={`
          fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:bg-transparent lg:border-none lg:overflow-y-auto lg:w-72 lg:block
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          print:hidden
        `}>
                    <div className="p-6 lg:p-0">
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <span className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Table of Contents</span>
                            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                        </div>

                        <nav className="space-y-8 pb-10 pr-2">
                            {filteredData.map((chapter) => (
                                <div key={chapter.id}>
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-4">
                                        {chapter.title.split(':')[0]}
                                    </h3>
                                    <ul className="space-y-1">
                                        {chapter.subsections.map((sub) => {
                                            // Formatting Label for Sidebar
                                            let label = sub.title;

                                            // If it starts with a number (e.g., "34. Jurisdiction...")
                                            const match = sub.title.match(/^(\d+)\./);
                                            if (match) {
                                                label = `Section ${match[1]}`;
                                            } else if (sub.isUpdate) {
                                                label = "Statutory Update";
                                            } else if (sub.title.includes("Fee Structure")) {
                                                label = "Fee Structure";
                                            }

                                            return (
                                                <li key={sub.id}>
                                                    <a
                                                        href={`#${sub.id}`}
                                                        className={`
                              group flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm transition-all duration-200 border-l-[3px]
                              ${activeSection === sub.id
                                                                ? 'bg-blue-50/80 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-600 font-semibold shadow-sm'
                                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:pl-5'}
                            `}
                                                        onClick={() => setSidebarOpen(false)}
                                                    >
                                                        {sub.isUpdate ? (
                                                            <AlertTriangle size={14} className={`shrink-0 ${activeSection === sub.id ? 'text-amber-500' : 'text-slate-400 group-hover:text-amber-500'}`} />
                                                        ) : (
                                                            <span className={`h-1.5 w-1.5 rounded-full ${activeSection === sub.id ? 'bg-blue-500' : 'bg-slate-300 group-hover:bg-blue-400'} transition-colors shrink-0`} />
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

                {/* --- MAIN CONTENT AREA --- */}
                <main className="flex-1 w-full min-w-0">
                    <div className="space-y-12">

                        {filteredData.length === 0 && (
                            <div className="text-center py-20 text-slate-400">
                                <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No sections found matching "{searchQuery}"</p>
                            </div>
                        )}

                        {filteredData.map((chapter) => (
                            <div key={chapter.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-4 mb-6 sticky top-20 bg-slate-50/95 dark:bg-slate-900/95 py-2 z-10 backdrop-blur">
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></span>
                                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        {chapter.title}
                                    </h2>
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></span>
                                </div>

                                <div className="space-y-6">
                                    {chapter.subsections.map((sub) => (
                                        <section
                                            key={sub.id}
                                            id={sub.id}
                                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden scroll-mt-24 group transition-all hover:shadow-md"
                                        >
                                            {/* Section Header */}
                                            <div className={`
                        px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start
                        ${sub.isUpdate ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}
                      `}>
                                                <div>
                                                    <h3 className={`text-lg font-bold ${sub.isUpdate ? 'text-amber-700 dark:text-amber-500' : 'text-slate-800 dark:text-white'} flex items-center gap-2`}>
                                                        {sub.title}
                                                        {sub.isUpdate && <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Updated</span>}
                                                    </h3>
                                                </div>
                                                <button
                                                    onClick={() => handleCopy(sub.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded transition-all"
                                                    title="Copy Link to Section"
                                                >
                                                    {copiedId === sub.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>

                                            {/* Section Content */}
                                            <div className="p-6 text-slate-600 dark:text-slate-300 leading-7">
                                                {sub.isUpdate ? (
                                                    <StatutoryUpdate title="Statutory Amendment" source={sub.updateSource}>
                                                        {sub.content.map((block, idx) => (
                                                            <div key={idx} className="mb-4 last:mb-0">
                                                                {block.type === 'list' && Array.isArray(block.content) ? (
                                                                    <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                                                                        {block.content.map((item, i) => (
                                                                            <li key={i}><MetricParser text={item} /></li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p><MetricParser text={block.content as string} /></p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </StatutoryUpdate>
                                                ) : (
                                                    sub.content.map((block, idx) => (
                                                        <div key={idx} className="mb-4 last:mb-0">
                                                            {block.type === 'text' && (
                                                                <p className="font-serif text-lg"><MetricParser text={block.content as string} /></p>
                                                            )}

                                                            {block.type === 'list' && Array.isArray(block.content) && (
                                                                <ul className="space-y-3 mt-2">
                                                                    {block.content.map((item, i) => (
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

                        {/* Footer */}
                        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-400 text-sm print:hidden">
                            <p>&copy; {new Date().getFullYear()} Dak Guru Learning Systems. All Rights Reserved.</p>
                            <p className="mt-2 text-xs">Content based on Consumer Protection Act, 2019 & Gazette Notifications.</p>
                        </footer>

                    </div>
                </main>
            </div>
        </div>
    );
}
