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
    Download
} from "lucide-react";
import { useTheme } from "next-themes";
import { pmlaFlashcards } from "./pmla_data";
import { poActData } from "./po_act_data";
import { poGuide1Flashcards } from "./po_guide1_data";
import {
    pmla2002,
    poAct2023,
    consumerProtectionAct2019,
    postalManualVolVIPartII,
    postalManualVolVIPartIII,
    gspr2018,
    postalManualVolVII,
    postalManualVolV
} from "../../data/flashcards";
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

const convertToUnified = (data: any[], tagPrefix: string): UnifiedFlashcard[] => {
    return data.map((item, index) => ({
        id: item.card_no || index + 1,
        question: item.question,
        answer: item.answer,
        explanation: item.explanation || item.keywords?.join(", "),
        tag: item.pdf_title || tagPrefix || item.topic,
        category: item.topic || "", // Keep the category (Paper I etc) here
        keywords: item.keywords
    }));
};

// --- DATA ---
const generatedDecksMapping = Object.entries(GeneratedCards).reduce((acc, [key, data]) => {
    const firstCard = (data as any[])[0];
    acc[key] = convertToUnified(data as any[], firstCard?.pdf_title || "General");
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
    'poact': poActData,
    'poguide1': poGuide1Flashcards,
    'poact_new': convertToUnified(poAct2023, "PO Act 2023"),
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

        setIsLoadingAuth(false);
    }, []);

    const handleSelectDeck = (id: string, startIdx: number = 0, shuffle: boolean = false) => {
        setSelectedDeckId(id);
        setCurrentCardIndex(startIdx);
        setIsInitiallyShuffled(shuffle);
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
        const activeDeck = selectedDeckId ? deckData[selectedDeckId] : [];
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

    if (!mounted) return null;

    // Access Control
    if (!isLoadingAuth && userRole !== 'admin') {
        return <FlashcardsIntroBanner />;
    }

    if (!selectedDeckId) {
        const filters = ["All", "Paper I", "Paper II", "Preliminary", "Acts", "Rules", "Schemes"];
        const filteredDecks = Object.entries(deckData).filter(([id, deck]) => {
            const title = deck[0]?.tag || id;
            const category = deck[0]?.category || "";
            const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === "All" || category.includes(activeFilter) || title.includes(activeFilter) ||
                (activeFilter === "Acts" && title.toLowerCase().includes("act")) ||
                (activeFilter === "Rules" && title.toLowerCase().includes("rule"));
            return matchesSearch && matchesFilter;
        });

        return (
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2f7)] dark:bg-[radial-gradient(circle_at_top,_#0a0a0a,_#000000)] relative overflow-hidden selection:bg-indigo-100">
                {/* Noise texture overlay */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

                <header className="relative z-10 pt-8 pb-12 px-6 text-center max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">Flashcards</h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-8">Master postal laws, rules & acts through smart revision.</p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 mx-auto rounded-full blur-[0.5px]">
                            <motion.div className="w-full h-full bg-white/30" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                        </div>
                    </motion.div>
                </header>

                <div className="relative z-10 px-6 max-w-3xl mx-auto mb-16">
                    <div className="relative group">
                        <div className="absolute inset-x-4 -bottom-4 h-10 bg-indigo-500/5 blur-2xl rounded-full" />
                        <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-white dark:border-white/10 rounded-[28px] h-16 flex items-center px-6 shadow-2xl">
                            <Sparkles className="w-5 h-5 text-indigo-500 mr-4" />
                            <input type="text" id="flash-search" placeholder="Search Acts, Rules, Schemes (PO Act, FR SR, GPF…)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-400">
                                <span className="text-[14px]">⌘</span> K
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto py-8 no-scrollbar">
                        {filters.map((f) => (
                            <button key={f} onClick={() => setActiveFilter(f)}
                                className={`px-5 py-2.5 rounded-2xl text-[13px] font-bold whitespace-nowrap transition-all border ${activeFilter === f ? 'bg-slate-900 border-slate-900 text-white shadow-xl dark:bg-white dark:border-white dark:text-black' : 'bg-white border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-500'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="relative z-10 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                    {filteredDecks.map(([id, deck], i) => (
                        <PremiumKnowledgeTile
                            key={id}
                            id={id}
                            index={i}
                            title={deck[0]?.tag || id}
                            category={deck[0]?.category || "Paper I"}
                            cardCount={deck.length}
                            onAction={handleSelectDeck}
                            lastIndex={deckProgress[id] || 0}
                        />
                    ))}
                </main>

                {userRole === 'admin' && (
                    <button className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group">
                        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
                            + Create Custom Deck
                        </div>
                    </button>
                )}

                <footer className="relative z-10 py-12 border-t border-slate-200 dark:border-white/5 text-center">
                    <span className="text-xs font-black text-slate-400 dark:text-slate-600 tracking-widest uppercase">www.dakguru.com</span>
                </footer>
            </div>
        );
    }

    // STUDY MODE (APP)
    const activeDeck = deckData[selectedDeckId] || [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black flex flex-col transition-colors duration-500">
            {/* ROW 2: DECK CONTROLS (Matches Screenshot 1 control row) */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 dark:border-white/5 shadow-sm">
                <div className="max-w-xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => setSelectedDeckId(null)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 font-black text-sm active:scale-95 transition-transform"
                    >
                        <ArrowLeft className="w-5 h-5" /> Exit Deck
                    </button>

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
                    title={activeDeck[0]?.tag || "Study Session"}
                    externalIndex={currentCardIndex}
                    onIndexChange={setCurrentCardIndex}
                    initialShuffled={isInitiallyShuffled}
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
            <div className="flex items-center justify-between mb-8">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${theme.b} dark:bg-white/5 ${theme.t}`}><BookOpen className="w-5 h-5" /></div>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-[9px] font-black uppercase tracking-widest text-slate-500">{category}</span>
            </div>
            <div className="flex-1 mb-10">
                <h3 className="text-[17px] font-black text-slate-800 dark:text-white leading-tight mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tighter">{title}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{cardCount} Smart Cards</p>
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
