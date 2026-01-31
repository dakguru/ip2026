"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";
import {
    ArrowLeft, AlertTriangle, ChevronRight, ChevronLeft,
    RotateCcw, Sun, Moon, Sparkles, Layers, BookOpen, Scale, FileText, Bus, Shuffle,
    Home,
    Settings,
    Share2,
    Download,
    Timer,
    CheckCircle2
} from "lucide-react";
import { useTheme } from "next-themes";
import { pmlaFlashcards } from "./pmla_data";
import { poGuide1Flashcards } from "./po_guide1_data";
import {
    pmla2002,
    consumerProtectionAct2019,
    postalManualVolVIPartII,
    postalManualVolVIPartIII,
    gspr2018,
    postalManualVolVII,
    postalManualVolV,
    poAct2023,
    itAct2000,
    bookOfBORules,
    postalManualVolII,
    postalManualVolIV,
    postalManualVolVIII,
    poGuidePartII,
    postalManualVolIII,
    poGuidePartI,
    postalManualVolVIPartI
} from "../../data/flashcards";
import { QUIZ_DATA } from "@/data/quizzes";
import * as GeneratedCards from "../../data/flashcards/generated_from_mcq";
import Link from "next/link";
import Image from "next/image";
import FlashcardsIntroBanner from "@/components/FlashcardsIntroBanner";
import PremiumFlashCardDeck from "@/components/flashcards/PremiumFlashCardDeck";

// --- Types ---
interface UnifiedFlashcard {
    id: number | string;
    question: string;
    answer: string;
    explanation?: string;
    tag: string;
    category?: string;
    keywords?: string[];
}

const convertToUnified = (data: any[], tagPrefix: string, uniqueContext?: string): UnifiedFlashcard[] => {
    return data.map((item, index) => ({
        id: `${uniqueContext || tagPrefix}_${item.id || item.card_no || index + 1}`,
        question: item.question,
        answer: item.answer,
        explanation: item.explanation || item.keywords?.join(", "),
        tag: item.tag || item.pdf_title || tagPrefix || item.topic,
        category: item.category || item.topic || "",
        keywords: item.keywords
    }));
};

// --- DATA ---
const generatedDecksMapping = Object.entries(GeneratedCards).reduce((acc, [key, data]) => {
    const firstCard = (data as any[])[0];
    acc[key] = convertToUnified(data as any[], firstCard?.pdf_title || "General", key);
    return acc;
}, {} as Record<string, UnifiedFlashcard[]>);

// Merge all PMLA related content into one
const pMLAContent = [
    ...pmlaFlashcards,
    ...convertToUnified(pmla2002, "PMLA 2002"),
    ...(generatedDecksMapping['p1_3'] || [])
].map(card => ({ ...card, tag: "Prevention of Money Laundering Act, 2002" }));

// Remove merged ones from individual mapping to avoid duplicates
delete generatedDecksMapping['p1_3'];

const deckData: Record<string, UnifiedFlashcard[]> = {
    'pmla': pMLAContent,
    'poguide1': poGuide1Flashcards,
    'cpa2019': convertToUnified(consumerProtectionAct2019, "CPA 2019"),
    'vol6_2': convertToUnified(postalManualVolVIPartII, "Vol VI Part II"),
    'vol6_3': convertToUnified(postalManualVolVIPartIII, "Vol VI Part III"),
    'gspr': convertToUnified(gspr2018, "GSPR 2018"),
    'vol7': convertToUnified(postalManualVolVII, "Vol VII (RMS)"),
    'vol5': convertToUnified(postalManualVolV, "Vol V (Definitions)"),
    ...generatedDecksMapping
};

export default function FlashcardsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    // State
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isInitiallyShuffled, setIsInitiallyShuffled] = useState(false);
    const [deckProgress, setDeckProgress] = useState<Record<string, number>>({});
    const [bookmarks, setBookmarks] = useState<Set<string | number>>(new Set());

    useEffect(() => {
        setMounted(true);
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[2]));
                setUserRole(session.role || 'user');
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }

        // Load progress
        const savedProgress = localStorage.getItem('flashcards_progress');
        if (savedProgress) {
            try {
                setDeckProgress(JSON.parse(savedProgress));
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }

        // Load bookmarks
        const savedBookmarks = localStorage.getItem('flashcards_bookmarks');
        if (savedBookmarks) {
            try {
                setBookmarks(new Set(JSON.parse(savedBookmarks)));
            } catch (e) {
                console.error("Failed to parse bookmarks", e);
            }
        }

        setIsLoadingAuth(false);
    }, []);

    const handleSelectDeck = (id: string, startIdx: number = 0, shuffle: boolean = false) => {
        setSelectedDeckId(id);
        setCurrentCardIndex(startIdx);
        setIsInitiallyShuffled(shuffle);
    };

    const handleBookmarkToggle = (id: string | number) => {
        const newBookmarks = new Set(bookmarks);
        if (newBookmarks.has(id)) {
            newBookmarks.delete(id);
        } else {
            newBookmarks.add(id);
        }
        setBookmarks(newBookmarks);
        localStorage.setItem('flashcards_bookmarks', JSON.stringify(Array.from(newBookmarks)));
    };

    // Save progress when it changes
    useEffect(() => {
        if (selectedDeckId !== null && mounted) {
            const newProgress = { ...deckProgress, [selectedDeckId]: currentCardIndex };
            setDeckProgress(newProgress);
            localStorage.setItem('flashcards_progress', JSON.stringify(newProgress));
        }
    }, [currentCardIndex, selectedDeckId, mounted]);

    const handleShare = async () => {
        const activeDeck = selectedDeckId ? getDeckFromId(selectedDeckId) : [];
        const currentCard = activeDeck[currentCardIndex];
        if (!currentCard) return;

        const text = `Flashcard: ${currentCard.question}\n\nAnswer: ${currentCard.answer}\n\nshared from Dak Guru www.dakguru.com`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Dak Guru Flashcard',
                    text: text,
                    url: 'https://www.dakguru.com'
                });
            } catch (err) { }
        } else {
            navigator.clipboard.writeText(text);
            alert("Description copied with link!");
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('flash-search')?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // --- DATA PREPARATION ---
    const getDeckFromId = (id: string): UnifiedFlashcard[] => {
        if (id === 'bookmarks') {
            // Collect ALL cards from ALL sources and filter by bookmarks
            let allCards: UnifiedFlashcard[] = [];

            // 1. Manual decks
            allCards = [
                ...convertToUnified(pmlaFlashcards, "PMLA"),
                ...convertToUnified(pmla2002, "PMLA 2002"),
                ...convertToUnified(poGuide1Flashcards, "PO Guide I"),
                ...convertToUnified(poAct2023, "PO Act 2023"),
                ...convertToUnified(consumerProtectionAct2019, "CPA 2019"),
                ...convertToUnified(itAct2000, "IT Act 2000"),
                ...convertToUnified(gspr2018, "GSPR 2018"),
                ...convertToUnified(bookOfBORules, "BO Rules"),
                ...convertToUnified(postalManualVolII, "Vol II"),
                ...convertToUnified(postalManualVolIV, "Vol IV"),
                ...convertToUnified(postalManualVolVIII, "Vol VIII"),
                ...convertToUnified(postalManualVolV, "Vol V"),
                ...convertToUnified(postalManualVolVII, "Vol VII"),
                ...convertToUnified(poGuidePartII, "PO Guide II"),
                ...convertToUnified(postalManualVolIII, "Vol III"),
                ...convertToUnified(postalManualVolVIPartI, "Vol VI I"),
                ...convertToUnified(postalManualVolVIPartII, "Vol VI II"),
                ...convertToUnified(postalManualVolVIPartIII, "Vol VI III"),
                ...convertToUnified(poGuidePartI, "PO Guide I (Old)")
            ];

            // 2. Generated cards
            Object.values(generatedDecksMapping).forEach(deck => {
                allCards = [...allCards, ...deck];
            });

            // Filter for unique IDs that are bookmarked
            const bookmarkedCards = allCards.filter(card => bookmarks.has(card.id));

            // Deduplicate by ID just in case
            const uniqueBookmarked = Array.from(new Map(bookmarkedCards.map(item => [item.id, item])).values());

            return uniqueBookmarked.map(c => ({ ...c, tag: c.tag || "Bookmarked" }));
        }

        // Manual Mappings
        let manualContent: any[] = [];

        // Special merges
        if (id === 'p1-3') {
            manualContent = [...pmlaFlashcards, ...pmla2002];
        } else if (id === 'p1-18') {
            manualContent = [...poGuide1Flashcards, ...poGuidePartI];
        } else if (id === 'p1-15') {
            manualContent = [...postalManualVolVIPartI, ...postalManualVolVIPartII, ...postalManualVolVIPartIII];
        } else {
            // Direct Manual Mappings based on Manual Imports
            switch (id) {
                case 'p1-1': manualContent = poAct2023; break;
                case 'p1-4': manualContent = consumerProtectionAct2019; break;
                case 'p1-5': manualContent = itAct2000; break;
                case 'p1-7': manualContent = gspr2018; break;
                case 'p1-10': manualContent = bookOfBORules; break;
                case 'p1-11': manualContent = postalManualVolII; break;
                case 'p1-12': manualContent = postalManualVolIV; break;
                case 'p1-13': manualContent = postalManualVolVIII; break;
                case 'p1-14': manualContent = postalManualVolV; break;
                case 'p1-16': manualContent = postalManualVolVII; break;
                case 'p1-19': manualContent = poGuidePartII; break;
                case 'p1-36': manualContent = postalManualVolIII; break;
                default: manualContent = [];
            }
        }

        const generatedKey = id.replace('-', '_');
        const generatedContent = (generatedDecksMapping as any)[generatedKey] || [];

        // Convert Manual to Unified
        const unifiedManual = convertToUnified(manualContent, id, id); // id as placeholder tag if missing and as unique context

        // Merge: Manual first, then Generated
        // Filter duplicates if necessary? For now, we assume distinct sets or acceptable overlap
        return [...unifiedManual, ...generatedContent];
    };

    // Filter and Organize Decks
    const organizeDecks = () => {
        const organized: { id: string; title: string; category: string; count: number; deck: UnifiedFlashcard[] }[] = [];

        QUIZ_DATA.forEach(topic => {
            const fullDeck = getDeckFromId(topic.id);
            if (fullDeck.length > 0) {
                // Check Filters
                const title = topic.title;
                const category = topic.category;
                const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesFilter = activeFilter === "All" ||
                    (activeFilter === "Recently Studied" && !!deckProgress[topic.id]) ||
                    category.includes(activeFilter) || title.includes(activeFilter) ||
                    (activeFilter === "Acts" && title.toLowerCase().includes("act")) ||
                    (activeFilter === "Rules" && title.toLowerCase().includes("rule"));

                if (matchesSearch && matchesFilter) {
                    organized.push({
                        id: topic.id,
                        title: topic.title,
                        category: topic.category,
                        count: fullDeck.length,
                        deck: fullDeck
                    });
                }
            }
        });
        return organized;
    };

    const finalDecks = organizeDecks();
    const paper1Decks = finalDecks.filter(d => d.category === 'Paper I');
    const paper3Decks = finalDecks.filter(d => d.category === 'Paper III');
    const otherDecks = finalDecks.filter(d => d.category !== 'Paper I' && d.category !== 'Paper III');


    if (!mounted) return null;

    // Access Control (Keeping basic check from original file)
    if (!isLoadingAuth && userRole !== 'admin') {
        // NOTE: The user's previous requests imply stricter access control might be needed here.
        // But for this task, I will strictly follow the "arrangement" instruction.
        return <FlashcardsIntroBanner />;
    }

    if (!selectedDeckId) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 relative selection:bg-indigo-100 font-sans overflow-hidden">
                {/* Creative Modern Background Elements */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/20 dark:bg-violet-900/20 blur-3xl" />
                    <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-400/20 dark:bg-indigo-900/20 blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-900/20 blur-3xl" />
                    <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full bg-cyan-400/20 dark:bg-cyan-900/10 blur-3xl animate-pulse" />
                </div>

                {/* Grain Texture Overlay */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

                {/* 1. HERO SECTION (Mobile Optimized) */}
                <header className="relative z-10 pt-12 pb-8 md:pt-16 md:pb-12 text-center max-w-4xl mx-auto px-4 md:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

                        <div className="relative inline-block mb-2">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 via-violet-800 to-fuchsia-900 dark:from-white dark:via-indigo-200 dark:to-violet-200 mb-4 drop-shadow-sm">
                                FLASHCARDS
                            </h1>
                        </div>

                        <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-4 tracking-tight">
                            Master Postal Laws Through Smart Revision
                        </h2>

                        <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-8 px-4">
                            Prepare Faster • Recall Better • Succeed Confidently
                        </p>

                        <div className="h-px w-16 md:w-24 bg-slate-200 dark:bg-white/10 mx-auto mb-8 md:mb-10" />

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto group">
                            <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-full h-12 md:h-14 flex items-center px-5 md:px-6 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-indigo-500/30 transition-colors">
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 mr-3 md:mr-4" />
                                <input type="text" id="flash-search" placeholder="Search Acts, Rules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-sm md:text-base text-slate-800 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                                <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-400">
                                    ⌘ K
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* 2. STICKY LEARNING CONTEXT BAR (Desktop) */}
                <div className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-y border-slate-200 dark:border-zinc-800 py-3 px-[8vw] hidden md:block">
                    <div className="max-w-[1400px] mx-auto flex justify-between items-center text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-400 uppercase">
                        <div className="flex gap-8">
                            <span className="flex items-center gap-2 text-slate-900 dark:text-white"><Layers className="w-3.5 h-3.5 text-indigo-500" /> Paper I</span>
                            <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-emerald-500" /> {Object.values(finalDecks).reduce((a, b: any) => a + (b.count || 0), 0)} Smart Cards</span>
                            <span className="flex items-center gap-2"><Timer className="w-3.5 h-3.5 text-amber-500" /> 12m Avg Study</span>
                        </div>
                        <div className="flex gap-6">
                            <div onClick={() => bookmarks.size > 0 && handleSelectDeck('bookmarks')} className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors flex items-center gap-1.5 ${bookmarks.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${bookmarks.size > 0 ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-700'}`} />
                                Bookmarked ({bookmarks.size})
                            </div>
                            <div onClick={() => setActiveFilter('Recently Studied')} className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors flex items-center gap-1.5 ${activeFilter === 'Recently Studied' ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${activeFilter === 'Recently Studied' ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-700'}`} />
                                Recently Studied
                            </div>
                            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 cursor-pointer hover:underline">Continue Learning <ChevronRight className="w-3 h-3" /></span>
                        </div>
                    </div>
                </div>

                {/* 3. MOBILE STICKY ACTIONS BAR */}
                <div className="sticky top-0 z-40 md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-y border-slate-200 dark:border-zinc-800 overflow-x-auto">
                    <div className="flex items-center gap-4 px-4 py-3 min-w-max text-[10px] uppercase font-bold tracking-wider text-slate-500">
                        <div onClick={() => bookmarks.size > 0 && handleSelectDeck('bookmarks')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 ${bookmarks.size > 0 ? 'text-indigo-600 border-indigo-100' : 'opacity-50'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${bookmarks.size > 0 ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                            Bookmarked ({bookmarks.size})
                        </div>
                        <div onClick={() => setActiveFilter('Recently Studied')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 ${activeFilter === 'Recently Studied' ? 'text-indigo-600 border-indigo-100 bg-indigo-50' : ''}`}>
                            Recently Studied
                        </div>
                    </div>
                </div>

                {/* 4. MOBILE CATEGORIES SCROLL */}
                <div className="md:hidden overflow-x-auto pb-2 -mt-4 pt-8 px-4 flex gap-2 no-scrollbar">
                    {["All", "Acts", "Rules", "Schemes", "Laws"].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter === activeFilter && filter !== 'All' ? 'All' : filter)}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all ${activeFilter === filter ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-800'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* 6. FLOATING LEFT FILTER RAIL (Desktop Only) */}
                <div className="fixed left-0 top-1/3 z-30 hidden xl:flex flex-col gap-1 p-1 bg-white dark:bg-zinc-900 border-y border-r border-slate-200 dark:border-zinc-800 rounded-r-2xl shadow-lg -translate-x-[calc(100%-60px)] hover:translate-x-0 transition-transform duration-300 w-56 group">
                    <div className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Filters</div>
                    {[
                        { icon: "📘", label: "Acts", filter: "Act" },
                        { icon: "📗", label: "Rules", filter: "Rule" },
                        { icon: "📙", label: "Schemes", filter: "Scheme" },
                        { icon: "⚖️", label: "Laws", filter: "Law" }
                    ].map((item) => (
                        <div key={item.label} onClick={() => setActiveFilter(activeFilter === item.filter ? "All" : item.filter)}
                            className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${activeFilter === item.filter ? 'bg-indigo-50 dark:bg-indigo-900/20 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-zinc-800'}`}>
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 shadow-sm border border-slate-100 dark:border-zinc-700 flex items-center justify-center shrink-0 text-base shadow-slate-200/50">
                                {item.icon}
                            </div>
                            <span className={`text-sm font-medium ${activeFilter === item.filter ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{item.label}</span>
                            {activeFilter === item.filter && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                        </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-zinc-800 p-2">
                        <div onClick={() => setActiveFilter("All")} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <span className="text-xs font-bold pl-1">RESET FILTERS</span>
                        </div>
                    </div>
                </div>

                {/* 3. GRID SYSTEM & 4. ACADEMIC SECTION HEADERS */}
                <main className="relative z-10 px-4 md:px-[8vw] max-w-[1400px] mx-auto pb-20 md:pb-32 space-y-12 md:space-y-16 pt-8 md:pt-12">

                    {/* Paper I */}
                    {paper1Decks.length > 0 && (
                        <section>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                <div>
                                    <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Paper I</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Acts, Rules & Regulatory Framework</p>
                                </div>
                                <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{paper1Decks.length} TOPICS</span>
                            </motion.div>

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                {paper1Decks.map((item, i) => (
                                    <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                        <PremiumKnowledgeTile
                                            id={item.id}
                                            index={i}
                                            title={item.title}
                                            category="Paper I"
                                            cardCount={item.count}
                                            onAction={handleSelectDeck}
                                            lastIndex={deckProgress[item.id] || 0}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Paper III */}
                    {paper3Decks.length > 0 && (
                        <section>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                <div>
                                    <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Paper III</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Legal, Financial & Administrative</p>
                                </div>
                                <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{paper3Decks.length} TOPICS</span>
                            </motion.div>

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                {paper3Decks.map((item, i) => (
                                    <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                        <PremiumKnowledgeTile
                                            id={item.id}
                                            index={i}
                                            title={item.title}
                                            category="Paper III"
                                            cardCount={item.count}
                                            onAction={handleSelectDeck}
                                            lastIndex={deckProgress[item.id] || 0}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Other */}
                    {otherDecks.length > 0 && (
                        <section>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                <div>
                                    <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Others & PYQ</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Supplementary Materials & Practice</p>
                                </div>
                                <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{otherDecks.length} TOPICS</span>
                            </motion.div>

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                {otherDecks.map((item, i) => (
                                    <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                        <PremiumKnowledgeTile
                                            id={item.id}
                                            index={i}
                                            title={item.title}
                                            category={item.category}
                                            cardCount={item.count}
                                            onAction={handleSelectDeck}
                                            lastIndex={deckProgress[item.id] || 0}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {finalDecks.length === 0 && (
                        <div className="text-center py-20 opacity-50">
                            <Layers className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                            <p>No topics found matching your filters.</p>
                        </div>
                    )}
                </main>



            </div>
        );
    }


    // STUDY MODE (APP)
    const activeDeck = getDeckFromId(selectedDeckId);

    return (
        <div className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-slate-50 dark:bg-black flex flex-col transition-colors duration-500 overscroll-none touch-pan-x">
            {/* ROW 2: DECK CONTROLS (Matches Screenshot 1 control row) */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 pb-3 pt-[calc(0.75rem+env(safe-area-inset-top))] border-b border-slate-100 dark:border-white/5 shadow-sm">
                <div className="max-w-xl mx-auto flex items-center justify-between relative">
                    <button
                        onClick={() => setSelectedDeckId(null)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 font-black text-sm active:scale-95 transition-transform"
                    >
                        <ArrowLeft className="w-5 h-5" /> Exit
                    </button>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-xl font-black tracking-tighter">
                            <span className="text-indigo-700 dark:text-indigo-400">DAK</span> <span className="text-violet-700 dark:text-violet-400">GURU</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-white/10 transition-all hover:text-indigo-600"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-white/10 transition-all hover:text-indigo-600"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col pt-0 bg-transparent">
                <PremiumFlashCardDeck
                    cards={activeDeck}
                    title={selectedDeckId === 'bookmarks' ? 'Bookmarked Cards' : (activeDeck[0]?.tag || "Study Session")}
                    externalIndex={currentCardIndex}
                    onIndexChange={setCurrentCardIndex}
                    initialShuffled={isInitiallyShuffled}
                    bookmarks={bookmarks}
                    onBookmarkToggle={handleBookmarkToggle}
                />
            </main>
        </div>
    );
}

function PremiumKnowledgeTile({ id, title, category, cardCount, onAction, index, lastIndex }: any) {
    const themes = [
        { g: 'bg-blue-500', t: 'text-sky-600', b: 'bg-sky-50' },
        { g: 'bg-emerald-500', t: 'text-emerald-600', b: 'bg-emerald-50' },
        { g: 'bg-amber-500', t: 'text-orange-600', b: 'bg-orange-50' },
        { g: 'bg-violet-500', t: 'text-violet-600', b: 'bg-violet-50' },
        { g: 'bg-teal-500', t: 'text-teal-600', b: 'bg-teal-50' },
    ];
    const theme = themes[index % themes.length];

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (index % 8) }} whileHover={{ y: -8 }}
            className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[22px] p-5 h-full flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-none transition-all cursor-pointer hover:border-indigo-500/30 overflow-hidden"
            onClick={() => onAction(id, 0, false)}>
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity ${theme.g}`} />
            <div className="flex items-center justify-between mb-4 md:mb-8">
                <div className={`hidden md:flex w-10 h-10 rounded-xl items-center justify-center shadow-sm ${theme.b} dark:bg-white/5 ${theme.t}`}><BookOpen className="w-5 h-5" /></div>
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-slate-100 dark:bg-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-wide text-slate-500 truncate max-w-[100%]">{category}</span>
            </div>
            <div className="flex-1 mb-4 md:mb-10">
                <h3 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white leading-tight mb-1 md:mb-2 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-2">{title}</h3>
                <p className="text-[9px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider">{cardCount} Smart Cards</p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex-1 mr-4">
                    <div className="h-1 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${theme.g}`} style={{ width: lastIndex > 0 ? `${((lastIndex + 1) / cardCount) * 100}%` : '0%' }} />
                    </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform flex justify-center gap-1.5">
                <ActionButton icon={<BookOpen className="w-3.5 h-3.5" />} label="Open" onClick={(e: any) => { e.stopPropagation(); onAction(id, 0, false); }} />
                <ActionButton icon={<Shuffle className="w-3.5 h-3.5" />} label="Shuffle" onClick={(e: any) => { e.stopPropagation(); onAction(id, 0, true); }} />
                {lastIndex > 0 && (
                    <ActionButton icon={<RotateCcw className="w-3.5 h-3.5" />} label="Resume" onClick={(e: any) => { e.stopPropagation(); onAction(id, lastIndex, false); }} />
                )}
            </div>
        </motion.div>
    );
}

function ActionButton({ icon, label, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all border border-slate-100 dark:border-white/10"
        >
            {icon} {label}
        </button>
    );
}
