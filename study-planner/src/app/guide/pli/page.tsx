'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    Search,
    BookOpen,
    ChevronDown,
    ChevronRight,
    Bell,
    Award,
    ShieldCheck,
    Info,
    Menu,
    X,
    Briefcase,
    TrendingUp,
    FileText,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

/**
 * UTILITY: Smart Text Highlighter
 * Automatically detects currency, percentages, and years to wrap them in styled badges.
 */
const SmartText = ({ text }: { text: string }) => {
    if (!text) return null;
    // Regex patterns for Money, Percentages, and Timeframes
    // Fixed: 'Rs' regex now requires at least one digit to prevent matching words like "Doctors," or "Engineers,"
    const parts = text.split(/((?:Rs\.?\s?[\d,]*\d+(?:\s?lakhs?)?)|(?:\d+(?:\.\d+)?%)|(?:\d+\s?years?))/gi);

    return (
        <span className="leading-relaxed text-slate-700 font-serif text-lg">
            {parts.map((part, i) => {
                if (part.match(/Rs\.?\s?[\d,]*\d+/i)) {
                    return <span key={i} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-sm font-sans tracking-wide shadow-sm border border-emerald-200">₹ {part.replace(/Rs\.?\s?/i, '')}</span>;
                }
                if (part.match(/\d+(?:\.\d+)?%/)) {
                    return <span key={i} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-blue-100 text-blue-800 font-bold text-sm font-sans shadow-sm border border-blue-200">{part}</span>;
                }
                if (part.match(/\d+\s?years?/i)) {
                    return <span key={i} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-amber-100 text-amber-800 font-medium text-sm font-sans border border-amber-200">{part}</span>;
                }
                return part;
            })}
        </span>
    );
};

interface Metric {
    label: string;
    value: string;
}

interface ContentItem {
    subtitle: string;
    text: string;
    points?: string[];
    isUpdate?: boolean;
    updateTitle?: string;
    updateText?: string;
    metrics?: Metric[];
    details?: string;
    isAlert?: boolean;
    alertType?: string;
    alertText?: string;
    table?: { col1: string; col2: string }[];
}

interface Section {
    id: string;
    title: string;
    icon: React.ReactElement;
    content: ContentItem[];
}


/**
 * DATA SOURCE
 * Curated from the provided Postal Life Insurance Rules 2011 PDF.
 */
const STUDY_DATA: Section[] = [
    {
        id: "intro",
        title: "Introduction & Definitions",
        icon: <BookOpen className="w-5 h-5" />,
        content: [
            {
                subtitle: "Key Definitions (Rule 5)",
                text: "Understanding the core terminology is crucial for PLI/RPLI administration.",
                points: [
                    "Auto Paid Up: A policy where 36 premiums are paid, 3 years duration completed, but payment stopped. It matures on original date for a reduced sum.",
                    "Surrender Value: Payable if at least 36 premiums paid and policy completed 36 months.",
                    "Void Policy: Policy < 3 years duration where premium is unpaid.",
                    "Commutation: Alteration in premium term or sum assured (except maturity date).",
                    "Conversion: Alteration affecting date of maturity (e.g., WLA to Endowment)."
                ]
            },
            {
                subtitle: "Eligibility (Rule 6)",
                text: "PLI covers employees of Central & State Govts, Defense, Banks, PSUs, Educational Institutes, and professionals like Doctors, Engineers, CAs, etc.",
                isUpdate: true,
                updateTitle: "Expanded Eligibility",
                updateText: "Now includes employees of companies listed on NSE/BSE and any person holding a Graduate Degree/Diploma from India or Foreign Countries."
            }
        ]
    },
    {
        id: "pli-schemes",
        title: "Part 1: Postal Life Insurance (PLI) Schemes",
        icon: <ShieldCheck className="w-5 h-5" />,
        content: [
            {
                subtitle: "1. Whole Life Assurance (Suraksha)",
                text: "Assured amount with accrued bonus payable at age 80 or on death (whichever is earlier).",
                metrics: [
                    { label: "Entry Age", value: "19-55 years" },
                    { label: "Premium Ages", value: "55, 58, or 60 yrs" },
                    { label: "Loan Facility", value: "After 4 years" },
                    { label: "Surrender", value: "After 3 years" }
                ],
                points: [
                    "Bonus not applicable if surrendered before 5 years.",
                    "Surrender Bonus: Proportionate bonus on reduced Sum Assured is paid on surrender.",
                    "Can convert to Endowment Assurance (EA) up to age 59."
                ]
            },
            {
                subtitle: "2. Convertible Whole Life Assurance (Suvidha)",
                text: "A Whole Life policy with the option to convert to Endowment Assurance (EA) after 5 years.",
                metrics: [
                    { label: "Entry Age", value: "19-50 years" },
                    { label: "Sum Assured", value: "₹20K - ₹50L" },
                    { label: "Loan Facility", value: "After 4 years" },
                    { label: "Surrender", value: "After 3 years" }
                ],
                points: [
                    "Must convert after 5 years but not later than 6 years; otherwise remains Whole Life policy.",
                    "Bonus Calculation: If converted, EA bonus payable from date of commencement (not conversion)."
                ]
            },
            {
                subtitle: "3. Endowment Assurance (Santosh)",
                text: "Matures at predetermined age (35, 40, 45, 50, 55, 58, 60). Best for planned financial goals.",
                metrics: [
                    { label: "Entry Age", value: "19-55 years" },
                    { label: "Loan Facility", value: "After 3 years" },
                    { label: "Surrender", value: "After 3 years" },
                    { label: "Max SA", value: "₹50 Lakhs" }
                ],
                points: [
                    "Surrender Bonus: Proportionate bonus on reduced Sum Assured is only paid if surrendered after 5 years."
                ]
            },
            {
                subtitle: "4. Joint Life Assurance (Yugal Suraksha)",
                text: "Covers both spouses with a single premium. One spouse must be eligible for PLI.",
                metrics: [
                    { label: "Entry Age", value: "21-45 years (both)" },
                    { label: "Policy Term", value: "5-20 years" },
                    { label: "Max SA", value: "₹50 Lakhs" },
                    { label: "Loan/Surrender", value: "After 3 years" }
                ],
                points: [
                    "Max Age of Elder Spouse cannot exceed 45 years.",
                    "Death Benefit: Paid to survivor in event of death of either spouse."
                ]
            },
            {
                subtitle: "5. Anticipated Endowment (Sumangal)",
                text: "Money Back Policy. Best for periodical returns. Important: In case of death, full Sum Assured is paid (previous benefits not deducted).",
                metrics: [
                    { label: "Entry (20yr)", value: "19-40 years" },
                    { label: "Entry (15yr)", value: "19-45 years" },
                    { label: "Max SA", value: "₹50 Lakhs" }
                ],
                table: [
                    { col1: "15-Year Term", col2: "20% at 6, 9, 12 yrs. 40% + Bonus at maturity." },
                    { col1: "20-Year Term", col2: "20% at 8, 12, 16 yrs. 40% + Bonus at maturity." }
                ]
            },
            {
                subtitle: "6. Children Policy (Bal Jivan Bima)",
                text: "Life cover for children of policyholders.",
                metrics: [
                    { label: "Child Age", value: "5-20 years" },
                    { label: "Parent Max Age", value: "45 years" },
                    { label: "Paid-Up", value: "After 5 years" },
                    { label: "Loan/Surrender", value: "Not Available" }
                ],
                points: [
                    "Max SA is ₹3 Lakhs or parent's SA (whichever is less).",
                    "Premium Waiver: If parent dies, no further premiums required. Full SA + Bonus paid at maturity.",
                    "Risk Commencement: From day of acceptance. No medical exam required."
                ]
            }
        ]
    },
    {
        id: "rpli-schemes",
        title: "Part 2: Rural Postal Life Insurance (RPLI)",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
        content: [
            {
                subtitle: "Overview & Age Proof",
                text: "Introduced on 24.03.1995. Eligibility: Rural Populace.",
                metrics: [
                    { label: "Min Sum Assured", value: "₹10,000" },
                    { label: "Max Sum Assured", value: "₹10 Lakhs" }
                ],
                points: [
                    "Non-Standard Age Proof: Max SA ₹25,000 (Max SA ₹1 Lakh with 5% extra premium).",
                    "Age Limit (Non-Standard): Max 45 years for policies ₹25,000+."
                ]
            },
            {
                subtitle: "1. Whole Life Assurance (Gram Suraksha)",
                text: "Entry Age: 19-55 years. Premium paying ages: 55, 58, 60 years. Loan after 4 years, Surrender after 3 years."
            },
            {
                subtitle: "2. Convertible WLA (Gram Suvidha)",
                text: "Convert to Endowment Assurance after 5 years. Entry Age: 19-50 years. Loan after 4 years, Surrender after 3 years."
            },
            {
                subtitle: "3. Endowment Assurance (Gram Santosh)",
                text: "Entry Age: 19-55 years. Loan after 3 years, Surrender after 3 years."
            },
            {
                subtitle: "4. 10-Year Rural PLI (Gram Priya)",
                text: "Short-term money back scheme for 10 years only.",
                metrics: [
                    { label: "Entry Age", value: "20-45 years" },
                    { label: "Max SA", value: "₹10 Lakhs" }
                ],
                points: [
                    "Survival Benefits: 20% at 4 & 7 years; 60% + Bonus at 10 years.",
                    "Special Feature: No interest charged up to 1 year on arrears in case of natural calamities."
                ]
            },
            {
                subtitle: "5. Anticipated Endowment (Gram Sumangal)",
                text: "Money Back Policy. Survival benefits same as PLI Sumangal.",
                metrics: [
                    { label: "Entry Age", value: "19-40/45 years" },
                    { label: "Max SA", value: "₹10 Lakhs" }
                ]
            },
            {
                subtitle: "6. Children Policy (Bal Jivan Bima)",
                text: "Similar to PLI Children Policy. No Loan/Surrender available.",
                metrics: [
                    { label: "Child Age", value: "5-20 years" },
                    { label: "Paid-Up", value: "After 5 years" },
                    { label: "Max SA", value: "₹1 Lakh" }
                ],
                points: [
                    "No medical exam for child necessary.",
                    "Premium waiver on parent's death."
                ]
            }
        ]
    },
    {
        id: "financial-rebates",
        title: "Part 3: Financial Parameters & Rebates",
        icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
        content: [
            {
                subtitle: "A. Bonus Rates (PLI FY 25-26 | RPLI FY 24-25)",
                text: "Latest bonus rates per ₹1000 Sum Assured.",
                table: [
                    { col1: "WLA (Suraksha)", col2: "PLI: ₹76 | RPLI: ₹60" },
                    { col1: "CWLA (Suvidha)", col2: "PLI: ₹76 (₹52 after conv) | RPLI: ₹60 (₹48 after conv)" },
                    { col1: "EA / YS / Children", col2: "PLI: ₹52 | RPLI: ₹48" },
                    { col1: "AEA / 10 Year", col2: "PLI: ₹48 | RPLI: ₹45" },
                    { col1: "Terminal Bonus", col2: "₹20 per ₹10k SA (Terms 20+ years)" }
                ]
            },
            {
                subtitle: "B. Rebate on Advance Premium",
                text: "Rebates for paying premiums in advance (12, 6, or 3 months).",
                table: [
                    { col1: "12 Months Advance", col2: "PLI/PLI: 2% | Yugal Suraksha: 50% of 1 month premium" },
                    { col1: "6 Months Advance", col2: "PLI/RPLI: 1% | Yugal Suraksha: 10% of 1 month premium" },
                    { col1: "3 Months Advance", col2: "RPLI: 0.5% | Yugal Suraksha: 2% of 1 month premium" }
                ]
            }
        ]
    },
    {
        id: "critical-clauses",
        title: "Part 4: Critical Clauses & Limits",
        icon: <Info className="w-5 h-5 text-rose-600" />,
        content: [
            {
                subtitle: "A. Medical vs. Non-Medical Limits",
                text: "Maximum Sum Assured allowed without medical examination.",
                metrics: [
                    { label: "PLI Max SA", value: "₹5 Lakhs" },
                    { label: "PLI Age Limit", value: "40 yrs (>₹2L)" },
                    { label: "RPLI Max SA", value: "₹1 Lakh" },
                    { label: "RPLI Age Limit", value: "35 years" }
                ],
                points: [
                    "PLI: No age limit for Non-Medical SA ≤ ₹2 Lakhs.",
                    "RPLI: Limit is ₹25,000 if Non-Standard Age Proof is used."
                ]
            },
            {
                subtitle: "B. Early Death Claims (Non-Medical)",
                text: "If death occurs before maturity in a non-medical policy, benefits are restricted.",
                table: [
                    { col1: "Death < 1 year", col2: "35% of (SA + Accrued Bonus)" },
                    { col1: "Death 1 - 2 years", col2: "60% of (SA + Accrued Bonus)" },
                    { col1: "Death 2 - 3 years", col2: "90% of (SA + Accrued Bonus)" },
                    { col1: "Death > 3 years", col2: "100% of (SA + Accrued Bonus)" }
                ],
                isAlert: true,
                alertType: "warning",
                alertText: "These restrictions apply only to non-medical policies where risk was accepted without a medical exam."
            },
            {
                subtitle: "C. Suicide Clause",
                text: "Specific rules for death by suicide.",
                points: [
                    "Committed < 1 year from acceptance/revival: 80% of premiums paid OR Surrender Value (whichever is higher) is payable.",
                    "Committed > 1 year: Treated as a normal death claim."
                ]
            },
            {
                subtitle: "D. Aviation Clause",
                text: "Death directly/indirectly from aviation (except as fare-paying passenger or Govt servant in Navy/Air Force).",
                isAlert: true,
                alertText: "Only Surrender Value is payable. Condition: Surrender value paid only if 3 years premiums paid and policy is 3+ years duration."
            }
        ]
    },
    {
        id: "loans-lapses",
        title: "Loans, Lapses & Revival",
        icon: <TrendingUp className="w-5 h-5" />,
        content: [
            {
                subtitle: "Lapsing Rules",
                text: "Policy becomes void if premium not paid. For policies < 3 years, 6 unpaid premiums causes lapse. For > 3 years, 12 unpaid premiums causes lapse.",
                isAlert: true,
                alertType: "critical",
                alertText: "Automatic Reinstatement: Permissible if policy > 3 years and < 12 months premium due."
            },
            {
                subtitle: "Loan Conditions",
                text: "Interest charged @ 10% per annum compounding half-yearly. Loan amount depends on Surrender Value.",
                points: [
                    "WLA/CWLA: Loan after 4 years.",
                    "EA/YS: Loan after 3 years.",
                    "Forced Surrender: Occurs if Loan + Interest exceeds Surrender Value (after 3rd reminder)."
                ]
            }
        ]
    },
    {
        id: "incentives",
        title: "Part 5: Incentive Structure (2025)",
        icon: <Award className="w-5 h-5" />,
        content: [
            {
                subtitle: "A. PLI Procurement Incentives",
                text: "Incentive payable on first year premium for new business.",
                table: [
                    { col1: "Term ≤ 15 Years", col2: "4% of 1st Year Premium" },
                    { col1: "15 < Term ≤ 25 Years", col2: "10% of 1st Year Premium" },
                    { col1: "Term > 25 Years", col2: "20% of 1st Year Premium" }
                ],
                isUpdate: true,
                updateTitle: "Major Policy Update (01.04.2025)",
                updateText: "The condition of procuring minimum 4 policies per financial year has been removed. No Minimum Business Requirement (MBR) applies."
            },
            {
                subtitle: "B. RPLI Procurement Incentives",
                text: "Higher incentives for rural sector expansion.",
                table: [
                    { col1: "New Policy", col2: "10% of 1st Year Premium" }
                ]
            },
            {
                subtitle: "C. Renewal Incentives",
                text: "Payable on renewal premiums collected.",
                table: [
                    { col1: "PLI Renewal", col2: "1% of Renewal Premium" },
                    { col1: "RPLI Renewal", col2: "2.5% of Renewal Premium" }
                ],
                points: [
                    "Payable only to direct sales force (Agents, GDS, Field Officers).",
                    "Monitoring staff (DOs, ASPs, etc.) are NOT eligible for renewal incentives."
                ]
            },
            {
                subtitle: "D. Monitoring Staff Incentives (Procurement)",
                text: "Incentive (% of New Business Premium) for overseeing staff.",
                table: [
                    { col1: "Development Officer", col2: "0.8% (on business by DA/FO)" },
                    { col1: "Sub-Divisional Head", col2: "0.6% (on GDS) | 0.8% (on Dept Emp)" },
                    { col1: "Mail Overseer", col2: "0.2% (on business by GDS)" },
                    { col1: "Divisional Head", col2: "0.2% (on all sales force)" }
                ]
            }
        ]
    }
];

export default function PLIGuide() {
    const [activeSection, setActiveSection] = useState("intro");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll Progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Toggle Accordion
    const toggleAccordion = (sectionId: string, index: number) => {
        setExpandedItems(prev => ({
            ...prev,
            [`${sectionId}-${index}`]: !prev[`${sectionId}-${index}`]
        }));
    };

    // Filter Data based on Search
    const filteredData = useMemo(() => {
        if (!searchQuery) return STUDY_DATA;
        return STUDY_DATA.map(section => ({
            ...section,
            content: section.content.filter(item =>
                item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.text.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(section => section.content.length > 0);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

            {/* 1. PROGRESS BAR */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* 2. HEADER */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Area */}
                        <div className="flex items-center gap-3">
                            <Link href="/guide" className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-2">
                                <ArrowLeft size={20} className="text-slate-600" />
                            </Link>
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-700">
                                    Dak Guru
                                </h1>
                                <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">PLI Rules 2011 Master Guide</p>
                            </div>
                        </div>

                        {/* Desktop Search */}
                        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search rules, schemes, or limits..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100 border-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-slate-600"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* 3. MAIN LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">

                {/* SIDEBAR NAVIGATION (Desktop) */}
                <nav className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-28 space-y-1">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Table of Contents</h3>
                        {STUDY_DATA.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setActiveSection(section.id);
                                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeSection === section.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                                    }`}
                            >
                                {/* Clone element to change color if active */}
                                {React.cloneElement(section.icon, {
                                    className: `w-5 h-5 ${activeSection === section.id ? 'text-indigo-200' : 'text-slate-400'}`
                                })}
                                <span className="truncate">{section.title}</span>
                            </button>
                        ))}

                        {/* Statutory Update Card in Sidebar */}
                        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                            <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold text-sm">
                                <Bell className="w-4 h-4" />
                                <span>Latest Update</span>
                            </div>
                            <p className="text-xs text-amber-800 leading-relaxed">
                                Bonus Rates for FY 2025-2026 effective from 01.04.2025. WLA Bonus: Rs. 76/- per 1000.
                            </p>
                        </div>
                    </div>
                </nav>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 min-w-0 pb-20">
                    {filteredData.length === 0 && (
                        <div className="text-center py-20">
                            <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-700">No results found</h3>
                            <p className="text-slate-500">Try searching for 'Loans' or 'Age Limit'</p>
                        </div>
                    )}

                    <div className="space-y-12">
                        {filteredData.map((section) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-32" // Offset for sticky header
                            >
                                {/* Section Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg">
                                        {section.icon}
                                    </span>
                                    <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
                                </div>

                                {/* Cards Container */}
                                <div className="grid gap-6">
                                    {section.content.map((item, idx) => {
                                        const isOpen = expandedItems[`${section.id}-${idx}`] ?? true; // Default open

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ duration: 0.4 }}
                                                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                                            >
                                                {/* Card Header (Accordion Trigger) */}
                                                <div
                                                    onClick={() => toggleAccordion(section.id, idx)}
                                                    className="px-6 py-4 flex justify-between items-center cursor-pointer bg-gradient-to-r from-white to-slate-50 border-b border-slate-100"
                                                >
                                                    <h3 className="text-lg font-bold text-slate-800 font-sans">{item.subtitle}</h3>
                                                    <button className={`p-1 rounded-full bg-slate-100 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                                    </button>
                                                </div>

                                                {/* Card Body */}
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <div className="p-6 space-y-4">

                                                                {/* Primary Text with Smart Highlighting */}
                                                                <div className="leading-relaxed">
                                                                    <SmartText text={item.text} />
                                                                </div>

                                                                {/* Key Metrics Grid */}
                                                                {item.metrics && (
                                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                                                        {item.metrics.map((m, i) => (
                                                                            <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                                                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">{m.label}</p>
                                                                                <p className="text-sm font-bold text-indigo-700">{m.value}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {/* Bullet Points */}
                                                                {item.points && (
                                                                    <ul className="space-y-2 mt-4">
                                                                        {item.points.map((pt, i) => (
                                                                            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                                                                <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                                                                <span>{pt}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}

                                                                {/* Data Tables */}
                                                                {item.table && (
                                                                    <div className="overflow-hidden rounded-xl border border-slate-200 mt-4">
                                                                        <table className="w-full text-sm text-left">
                                                                            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-xs">
                                                                                <tr>
                                                                                    <th className="px-4 py-3 border-b">Term / Category</th>
                                                                                    <th className="px-4 py-3 border-b">Detail / Rate</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="divide-y divide-slate-100">
                                                                                {item.table.map((row, r) => (
                                                                                    <tr key={r} className="hover:bg-slate-50/50">
                                                                                        <td className="px-4 py-3 font-medium text-slate-700">{row.col1}</td>
                                                                                        <td className="px-4 py-3 text-slate-600">{row.col2}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                )}

                                                                {/* Statutory Updates / Alerts (Pop-out) */}
                                                                {item.isUpdate && (
                                                                    <div className="mt-4 flex items-start gap-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                                                                        <div className="bg-amber-100 p-2 rounded-lg shrink-0">
                                                                            <Bell className="w-5 h-5 text-amber-600" />
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-bold text-amber-900 text-sm mb-1">{item.updateTitle}</h4>
                                                                            <p className="text-sm text-amber-800/90 leading-relaxed">{item.updateText}</p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {item.isAlert && (
                                                                    <div className="mt-4 flex items-start gap-4 p-4 bg-rose-50 rounded-xl border-l-4 border-rose-400">
                                                                        <div className="bg-rose-100 p-2 rounded-lg shrink-0">
                                                                            <Info className="w-5 h-5 text-rose-600" />
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-bold text-rose-900 text-sm mb-1">Critical Rule</h4>
                                                                            <p className="text-sm text-rose-800/90 leading-relaxed">{item.alertText}</p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Footer Quote */}
                    <div className="mt-20 text-center border-t border-slate-200 pt-10">
                        <p className="text-slate-400 font-serif italic">"PLI - Insuring Lives, Ensuring Futures since 1884"</p>
                    </div>
                </main>
            </div>

            {/* MOBILE DRAWER */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white z-50 shadow-2xl lg:hidden p-6"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-bold text-xl text-indigo-700">Content Index</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full">
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {STUDY_DATA.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            setActiveSection(section.id);
                                            setIsMobileMenuOpen(false);
                                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl ${activeSection === section.id
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {section.icon}
                                        {section.title}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
