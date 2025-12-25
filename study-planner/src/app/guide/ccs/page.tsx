'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    BookOpen,
    ChevronDown,
    ChevronRight,
    ShieldAlert,
    CheckCircle2,
    Menu,
    X,
    Scale,
    Briefcase,
    Home,
    Gift,
    Globe,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA STRUCTURE (Parsed from CCS Rules Content) ---
const rulesData = [
    {
        id: "rule-1",
        ruleNumber: "Rule 1",
        title: "Short Title & Application",
        icon: <BookOpen className="w-5 h-5" />,
        content: [
            "These rules may be called the CCS (Conduct) Rules, 1964.",
            "Came into force at once from 12 Dec. 1964.",
            "Applies to every person appointed to a civil service or post in connection with the affairs of the Union.",
            "**Does NOT apply to:** Railway Govt. Servants, Members of All India Service, or specific posts in Ports, Docks, Defense installations (non-training), Mines, Factories, etc."
        ]
    },
    {
        id: "rule-2",
        ruleNumber: "Rule 2",
        title: "Definitions",
        icon: <Scale className="w-5 h-5" />,
        content: [
            "**Government:** Means the Central Government.",
            "**Government Servant:** Any person appointed by Government to any civil service or post in connection with the affairs of the Union.",
            "**Members of Family:** Includes wife/husband, son/daughter, parents, siblings, or any person related by blood or marriage, whether dependent on the Govt. servant or not."
        ]
    },
    {
        id: "rule-3",
        ruleNumber: "Rule 3",
        title: "General Conduct",
        icon: <CheckCircle2 className="w-5 h-5" />,
        content: [
            "Every Government servant shall at all times:",
            "1. Maintain absolute integrity.",
            "2. Maintain devotion to duty.",
            "3. Do nothing which is unbecoming of a government servant.",
            "**Supervisory Roles:** Those holding supervisory posts must ensure the integrity and devotion to duty of all subordinates.",
            "**Oral Directions:** Avoid oral directions. If unavoidable, the superior must confirm it in writing immediately. Subordinates receiving oral directions must seek written confirmation."
        ]
    },
    {
        id: "rule-3a-c",
        ruleNumber: "Rule 3A - 3C",
        title: "Promptness, Policies & Harassment",
        icon: <Users className="w-5 h-5" />,
        content: [
            "**Rule 3(A):** No servant shall act in a discourteous manner or adopt dilatory tactics (delays) in official dealings.",
            "**Rule 3(B):** Must observe policies regarding age of marriage, environment, wildlife, and prevention of crime against women.",
            "**Rule 3(C):** Prohibition of sexual harassment of working women. In-charge officers must take appropriate steps to prevent harassment."
        ],
        updates: [
            "Communications from MPs/Public bodies must be acknowledged within 15 days and replied to within the next 15 days.",
            "Lunch break is half an hour only.",
            "No playing cards on lawns/office buildings; confined to recreation rooms."
        ]
    },
    {
        id: "rule-4",
        ruleNumber: "Rule 4",
        title: "Employment of Near Relatives",
        icon: <Briefcase className="w-5 h-5" />,
        content: [
            "No Govt. servant shall use influence to secure employment for family members in any company.",
            "**Group A Officers:** Must get previous sanction before permitting a child/dependent to accept employment in a firm with which they have official dealings.",
            "No servant shall sanction contracts to a firm where a family member is employed."
        ]
    },
    {
        id: "rule-5",
        ruleNumber: "Rule 5",
        title: "Politics and Elections",
        icon: <Globe className="w-5 h-5" />,
        content: [
            "No Govt. servant shall be a member of any political party or assist any political movement.",
            "Must endeavor to prevent family members from taking part in subversive activities.",
            "**Elections:** Cannot canvass or interfere in elections. May vote but must not indicate who they voted for."
        ]
    },
    {
        id: "rule-13",
        ruleNumber: "Rule 13",
        title: "Gifts",
        icon: <Gift className="w-5 h-5" />,
        content: [
            "Cannot accept gifts (free transport, boarding, lodging, pecuniary advantage) from persons other than near relatives/personal friends.",
            "**Exceptions:** Casual meal, lift, or social hospitality is not a gift.",
            "**Report Required if Gift Value Exceeds:**",
            "- Group 'A' Post: Rs. 25000",
            "- Group 'B' Post: Rs. 15000",
            "- Group 'C' Post: Rs. 7500",
            "**Sanction Required:** If value exceeds Rs. 5000 (Group A/B) or Rs. 2000 (Group C) in other cases.",
            "**Dowry:** Giving, taking, or demanding dowry is strictly prohibited (Rule 13-A)."
        ]
    },
    {
        id: "rule-15",
        ruleNumber: "Rule 15",
        title: "Private Trade or Employment",
        icon: <Briefcase className="w-5 h-5" />,
        content: [
            "Cannot engage in trade, business, or other employment without previous sanction.",
            "Cannot hold elective office or canvass for insurance/commission agencies owned by family.",
            "**Allowed without sanction:** Honorary social/charitable work, occasional literary/artistic work, or amateur sports participation.",
            "**Fee Acceptance:** Cannot accept fees for private work without sanction."
        ],
        updates: [
            "Part-time Examinership for Universities permitted (rarely).",
            "Private tuition or part-time jobs after office hours are NOT allowed."
        ]
    },
    {
        id: "rule-18",
        ruleNumber: "Rule 18",
        title: "Movable & Immovable Property",
        icon: <Home className="w-5 h-5" />,
        content: [
            "**First Appointment:** Must submit a full return of assets and liabilities.",
            "**Annual Return:** Group A and B officers must submit annual immovable property returns.",
            "**Acquiring Property:** Previous knowledge/sanction required to acquire or dispose of immovable property.",
            "**Movable Property:** Must report transactions exceeding 2 months' basic pay within one month.",
            "**Outside India:** No servant shall acquire foreign property or trade with foreigners without sanction (Rule 18-A)."
        ],
        updates: [
            "Immovable property return deadline: 31st January every year.",
            "PRISM system developed by NIC for IAS officers' reporting."
        ]
    },
    {
        id: "rule-21-22",
        ruleNumber: "Rule 21-22",
        title: "Marriage & Intoxication",
        icon: <ShieldAlert className="w-5 h-5" />,
        content: [
            "**Marriage (Rule 21):** Cannot marry a person who has a living spouse, or marry again if you have a living spouse, without Govt. permission.",
            "**Intoxicating Drinks (Rule 22):** Strictly abide by local liquor laws. Do not be under influence during duty. Do not appear in public in a state of intoxication.",
            "**Child Labor (Rule 22-A):** Prohibited from employing children below 14 years."
        ]
    }
];

// --- UTILITY COMPONENTS ---

// 1. Smart Text Highlighter (Highlights Money, Dates, and Bold text)
const SmartText = ({ text }: { text: string }) => {
    if (!text) return null;

    // Regex patterns
    const moneyPattern = /(Rs\.\s?[\d,]+)/gi;
    const datePattern = /(\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z.]*\s\d{4})/gi;
    const boldPattern = /\*\*(.*?)\*\*/g;

    // Split by bold first
    const parts = text.split(boldPattern);

    return (
        <span className="leading-relaxed text-slate-700 dark:text-slate-300 font-serif">
            {parts.map((part, index) => {
                // If index is odd, it was wrapped in **, so bold it
                const isBold = index % 2 === 1;

                // Further process for Money and Dates
                const words = part.split(/(\s+)/);

                const processedPart = words.map((word, wIdx) => {
                    if (word.match(moneyPattern)) {
                        return <span key={wIdx} className="inline-flex items-center px-2 py-0.5 mx-1 rounded text-xs font-bold bg-green-100 text-green-800 border border-green-200">{word}</span>;
                    }
                    if (word.match(datePattern)) {
                        return <span key={wIdx} className="inline-flex items-center px-2 py-0.5 mx-1 rounded text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">{word}</span>;
                    }
                    return word;
                });

                return isBold ? (
                    <strong key={index} className="font-bold text-slate-900 dark:text-white">{processedPart}</strong>
                ) : (
                    <span key={index}>{processedPart}</span>
                );
            })}
        </span>
    );
};

// 2. Govt Decision Alert Card
const StatutoryUpdateCard = ({ updates }: { updates: string[] }) => {
    if (!updates || updates.length === 0) return null;
    return (
        <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-md">
            <div className="flex items-start">
                <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                    <h4 className="text-sm font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wide">
                        Statutory Updates & Decisions
                    </h4>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-amber-900 dark:text-amber-100">
                        {updates.map((u, i) => (
                            <li key={i}>{u}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export default function CCSConductGuide() {
    const [activeRule, setActiveRule] = useState(rulesData[0].id);
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Filter Logic
    const filteredRules = useMemo(() => {
        if (!searchQuery) return rulesData;
        const lowerQuery = searchQuery.toLowerCase();
        return rulesData.filter(
            (rule) =>
                rule.title.toLowerCase().includes(lowerQuery) ||
                rule.ruleNumber.toLowerCase().includes(lowerQuery) ||
                rule.content.some(c => c.toLowerCase().includes(lowerQuery))
        );
    }, [searchQuery]);

    // Scroll Progress Listener
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth Scroll to Section
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveRule(id);
            setSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

            {/* 1. TOP PROGRESS BAR */}
            <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-200 dark:bg-slate-800">
                <motion.div
                    className="h-full bg-gradient-to-r from-violet-600 via-blue-500 to-teal-400"
                    style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
                />
            </div>

            {/* 2. HEADER */}
            <header className="fixed top-1.5 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30">
                            D
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-blue-600 dark:from-violet-400 dark:to-blue-400">
                            Dak Guru
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="text-xs font-medium px-3 py-1 bg-violet-100 text-violet-700 rounded-full dark:bg-violet-900/30 dark:text-violet-300">
                            CCS (Conduct) Rules, 1964
                        </div>
                        <a href="/guide" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer">
                            Back to Dashboard
                        </a>
                    </div>

                    <button
                        className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            <div className="pt-20 max-w-7xl mx-auto flex">

                {/* 3. SIDEBAR (NAVIGATION) */}
                <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block md:h-[calc(100vh-80px)] md:sticky md:top-20 overflow-y-auto
          ${sidebarOpen ? "translate-x-0 pt-20" : "-translate-x-full pt-20 md:pt-0"}
          print:hidden
        `}>
                    <div className="p-4 space-y-1">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
                            Table of Contents
                        </h3>
                        {rulesData.map((rule) => (
                            <button
                                key={rule.id}
                                onClick={() => scrollToSection(rule.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${activeRule === rule.id
                                        ? "bg-violet-50 text-violet-700 font-semibold dark:bg-violet-900/20 dark:text-violet-300 shadow-sm border-l-4 border-violet-600"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 border-l-4 border-transparent"
                                    }`}
                            >
                                <span className={activeRule === rule.id ? "text-violet-600" : "text-slate-400"}>
                                    {rule.icon}
                                </span>
                                <span className="truncate">{rule.title}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* 4. MAIN CONTENT AREA */}
                <main className="flex-1 px-4 sm:px-8 py-6 pb-20 max-w-4xl min-w-0">

                    {/* SEARCH BAR */}
                    <div className="relative mb-8 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for rules, keywords (e.g. 'Gifts', 'Rule 15')..."
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* RULES LIST */}
                    <div className="space-y-8">
                        {filteredRules.length > 0 ? (
                            filteredRules.map((rule, index) => (
                                <RuleCard key={rule.id} rule={rule} index={index} />
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                                    <Search className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 dark:text-white">No rules found</h3>
                                <p className="text-slate-500">Try adjusting your search terms.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

// --- SUB-COMPONENT: RULE CARD ---

function RuleCard({ rule, index }: { rule: any, index: number }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <motion.div
            id={rule.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden scroll-mt-28"
        >
            {/* CARD HEADER */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-left"
            >
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 flex items-center justify-center">
                        {rule.icon}
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1">
                            {rule.ruleNumber}
                        </span>
                        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                            {rule.title}
                        </h2>
                    </div>
                </div>
                <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
            </button>

            {/* CARD CONTENT (ACCORDION) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-700/50">
                            <div className="mt-6 space-y-4">
                                {rule.content.map((paragraph: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-slate-300 dark:bg-slate-600" />
                                        <p className="text-base text-slate-700 dark:text-slate-300 leading-7">
                                            <SmartText text={paragraph} />
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* STATUTORY UPDATE ALERT */}
                            {rule.updates && <StatutoryUpdateCard updates={rule.updates} />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
