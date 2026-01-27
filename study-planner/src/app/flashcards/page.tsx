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
const deckData: Record<string, UnifiedFlashcard[]> = {
    'pmla': pmlaFlashcards,
    'poact': poActData,
    'poguide1': poGuide1Flashcards,
    'pmla_new': convertToUnified(pmla2002, "PMLA 2002"),
    'poact_new': convertToUnified(poAct2023, "PO Act 2023"),
    'cpa2019': convertToUnified(consumerProtectionAct2019, "CPA 2019"),
    'vol6_2': convertToUnified(postalManualVolVIPartII, "Vol VI Part II"),
    'vol6_3': convertToUnified(postalManualVolVIPartIII, "Vol VI Part III"),
    'gspr': convertToUnified(gspr2018, "GSPR 2018"),
    'vol7': convertToUnified(postalManualVolVII, "Vol VII (RMS)"),
    'vol5': convertToUnified(postalManualVolV, "Vol V (Definitions)"),
    // Add generated decks
    ...Object.entries(GeneratedCards).reduce((acc, [key, data]) => {
        const firstCard = (data as any[])[0];
        acc[key] = convertToUnified(data as any[], firstCard?.pdf_title || "General");
        return acc;
    }, {} as Record<string, UnifiedFlashcard[]>)
};

// --- CONSTANTS ---
const CARD_THEMES = [
    {
        name: "Navy Teal",
        gradient: "from-slate-900 to-teal-900",
        lightGradient: "from-slate-100 to-teal-50",
        accent: "text-teal-400",
        border: "border-teal-500/20",
        badge: "bg-teal-500/10 text-teal-400",
    },
    {
        name: "Deep Purple",
        gradient: "from-indigo-900 to-purple-900",
        lightGradient: "from-indigo-50 to-purple-50",
        accent: "text-purple-400",
        border: "border-purple-500/20",
        badge: "bg-purple-500/10 text-purple-400",
    },
    {
        name: "Emerald Cyan",
        gradient: "from-emerald-900 to-cyan-900",
        lightGradient: "from-emerald-50 to-cyan-50",
        accent: "text-cyan-400",
        border: "border-cyan-500/20",
        badge: "bg-cyan-500/10 text-cyan-400",
    },
];


export default function FlashcardsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    // State
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [shuffledDeck, setShuffledDeck] = useState<UnifiedFlashcard[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setMounted(true);

        // Check Auth
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[2]));
                // Check if role includes admin (case insensitive) just to be safe, or exact match
                // Based on UserMenu.tsx, role is usually 'admin'
                setUserRole(session.role || 'user');
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }
        setIsLoadingAuth(false);
    }, []);

    // Derived State
    const baseDeck = selectedDeckId ? deckData[selectedDeckId] : [];
    const activeDeck = isShuffled ? shuffledDeck : baseDeck;
    const currentCard = activeDeck[currentIndex];
    const progress = activeDeck.length > 0 ? ((currentIndex + 1) / activeDeck.length) * 100 : 0;
    const currentTheme = CARD_THEMES[currentIndex % CARD_THEMES.length];

    // Handlers
    const handleNext = () => {
        if (currentIndex < activeDeck.length - 1) {
            setDirection(1);
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleDragEnd = (event: any, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x < -threshold) handleNext();
        else if (info.offset.x > threshold) handlePrev();
    };

    const handleShare = async () => {
        if (!currentCard) return;
        const text = `Flashcard: ${currentCard.question}\n\nAnswer: ${currentCard.answer}\n\nShared via Dak Guru`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Dak Guru Flashcard',
                    text: text,
                    url: window.location.href
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(text);
            alert("Flashcard copied to clipboard!");
        }
    };

    const toggleShuffle = () => {
        if (!selectedDeckId) return;
        if (!isShuffled) {
            const newDeck = [...baseDeck];
            for (let i = newDeck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
            }
            setShuffledDeck(newDeck);
            setIsShuffled(true);
        } else {
            setIsShuffled(false);
            setShuffledDeck([]);
        }
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const handleSelectDeck = (id: string) => {
        setSelectedDeckId(id);
        setCurrentIndex(0);
        setIsFlipped(false);
        setDirection(0);
        setIsShuffled(false);
        setShuffledDeck([]);
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedDeckId) return;
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setIsFlipped(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedDeckId, currentIndex]); // eslint-disable-line

    if (!mounted) return null;

    // Access Control: Only Admin can see the flashcards
    // Everyone else sees the Coming Soon Banner
    if (!isLoadingAuth && userRole !== 'admin') {
        return <FlashcardsIntroBanner />;
    }


    // --- VIEW: DECK SELECTION ---
    if (!selectedDeckId) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 flex flex-col items-center p-4 md:p-8 font-sans transition-colors duration-300 pb-20">
                <header className="w-full max-w-5xl flex items-center justify-between mb-6 pt-2">
                    <Link href="/dashboard" className="p-3 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-zinc-100 dark:border-white/5 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-500">Flashcards</h1>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow-sm text-zinc-600 dark:text-zinc-400">
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </header>

                <div className="w-full max-w-5xl mb-6 sticky top-2 z-30">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Find a topic (e.g. PO Act, PMLA)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-4 pl-12 rounded-2xl bg-white dark:bg-neutral-900 border border-zinc-200 dark:border-white/10 shadow-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        />
                        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500 group-focus-within:animate-pulse" />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-400"
                            >
                                <RotateCcw className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Filtered Decks */}
                    {Object.entries(deckData)
                        .filter(([id, deck]) => {
                            if (!searchQuery) return true;
                            const title = deck[0]?.tag || id;
                            return title.toLowerCase().includes(searchQuery.toLowerCase());
                        })
                        .sort((a, b) => {
                            const titleA = a[1][0]?.tag || a[0];
                            const titleB = b[1][0]?.tag || b[0];
                            return titleA.localeCompare(titleB);
                        })
                        .map(([id, deck]) => {
                            const title = deck[0]?.tag || id;
                            const category = deck[0]?.category;
                            const count = deck.length;
                            return (
                                <DeckButton
                                    key={id}
                                    title={title}
                                    subtitle={category ? `${category} • ${count} Cards` : `${count} Cards`}
                                    icon={<BookOpen className="w-5 h-5" />}
                                    onClick={() => handleSelectDeck(id)}
                                    colorClass={getDeckColor(id)}
                                />
                            );
                        })}
                </div>
            </div>
        );
    }

    // --- VIEW: FLASHCARD APP MODE ---
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white font-sans flex flex-col">
            {/* Top Bar: Premium Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-100 dark:border-white/10 px-4 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => setSelectedDeckId(null)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors text-zinc-600 dark:text-zinc-400 font-bold text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Exit Deck
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Premium Deck Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                <PremiumFlashCardDeck
                    cards={activeDeck}
                    title={activeDeck[0]?.tag || "Flashcards"}
                />
            </main>
        </div>
    );
}

// Reusable Deck Color Utility
function getDeckColor(id: string) {
    const colors = [
        "from-cyan-500 to-blue-500",
        "from-emerald-500 to-teal-500",
        "from-orange-500 to-amber-500",
        "from-amber-500 to-orange-500",
        "from-indigo-500 to-purple-500",
        "from-pink-500 to-rose-500",
        "from-green-500 to-lime-500",
        "from-red-500 to-orange-500",
        "from-cyan-600 to-blue-600",
        "from-violet-500 to-fuchsia-500",
        "from-sky-500 to-indigo-500"
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

// Reusable Deck Button
function DeckButton({ title, subtitle, icon, onClick, colorClass }: any) {
    return (
        <button
            onClick={onClick}
            className="group relative overflow-hidden p-4 md:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-zinc-200 dark:border-white/5 hover:border-transparent transition-all text-left shadow-sm active:scale-95 touch-manipulation"
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity bg-gradient-to-r ${colorClass}`} />
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${colorClass} text-white shadow-lg shadow-black/5`}>
                        {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-lg font-black text-zinc-800 dark:text-white mb-0.5 truncate">{title}</h3>
                        <p className="text-[10px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tight">{subtitle}</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-neutral-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex-none" />
            </div>
        </button>
    );
}
