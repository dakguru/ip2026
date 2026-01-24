"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";
import {
    ArrowLeft, AlertTriangle, ChevronRight, ChevronLeft,
    RotateCcw, Sun, Moon, Sparkles, Layers, BookOpen, Scale, FileText, Bus, Shuffle,
    Home,
    Settings
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
import Link from "next/link";
import Image from "next/image";

// --- Types ---
interface UnifiedFlashcard {
    id: number | string;
    question: string;
    answer: string;
    explanation?: string;
    tag: string;
    keywords?: string[];
}

const convertToUnified = (data: any[], tagPrefix: string): UnifiedFlashcard[] => {
    return data.map((item, index) => ({
        id: item.card_no || index + 1,
        question: item.question,
        answer: item.answer,
        explanation: item.keywords?.join(", "),
        tag: item.topic || tagPrefix,
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
    'vol5': convertToUnified(postalManualVolV, "Vol V (Definitions)")
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

    // State
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [shuffledDeck, setShuffledDeck] = useState<UnifiedFlashcard[]>([]);

    useEffect(() => { setMounted(true); }, []);

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

    // --- VIEW: DECK SELECTION ---
    if (!selectedDeckId) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 flex flex-col items-center p-4 md:p-8 font-sans transition-colors duration-300">
                <header className="w-full max-w-5xl flex items-center justify-between mb-8">
                    <Link href="/dashboard" className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow-sm text-zinc-600 dark:text-zinc-400">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold text-zinc-800 dark:text-white">Flashcards</h1>
                    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow-sm text-zinc-600 dark:text-zinc-400">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </header>

                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                    <DeckButton
                        title="PO Act 2023 & Rules"
                        subtitle="20 Cards • Updated Legislation"
                        icon={<Sparkles className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('poact_new')}
                        colorClass="from-cyan-500 to-blue-500"
                    />
                    <DeckButton
                        title="PO Guide Part I"
                        subtitle="40 Cards • General Rules"
                        icon={<BookOpen className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('poguide1')}
                        colorClass="from-emerald-500 to-teal-500"
                    />
                    <DeckButton
                        title="Postal Manual Vol VI Pt II"
                        subtitle="10 Cards • Money Orders"
                        icon={<Layers className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('vol6_2')}
                        colorClass="from-orange-500 to-amber-500"
                    />
                    <DeckButton
                        title="Postal Manual Vol VI Pt III"
                        subtitle="10 Cards • Postmen Duties"
                        icon={<Layers className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('vol6_3')}
                        colorClass="from-amber-500 to-orange-500"
                    />
                    <DeckButton
                        title="PMLA, 2002"
                        subtitle="15 Cards • Money Laundering"
                        icon={<Scale className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('pmla_new')}
                        colorClass="from-indigo-500 to-purple-500"
                    />
                    <DeckButton
                        title="Consumer Protection Act"
                        subtitle="15 Cards • CPA 2019"
                        icon={<Scale className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('cpa2019')}
                        colorClass="from-pink-500 to-rose-500"
                    />
                    <DeckButton
                        title="GSPR 2018"
                        subtitle="32 Cards • Savings Rules"
                        icon={<FileText className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('gspr')}
                        colorClass="from-green-500 to-lime-500"
                    />
                    <DeckButton
                        title="Postal Manual Vol VII"
                        subtitle="45 Cards • RMS"
                        icon={<Bus className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('vol7')}
                        colorClass="from-red-500 to-orange-500"
                    />
                    <DeckButton
                        title="Postal Manual Vol V"
                        subtitle="50 Cards • Definitions"
                        icon={<BookOpen className="w-5 h-5" />}
                        onClick={() => handleSelectDeck('vol5')}
                        colorClass="from-cyan-600 to-blue-600"
                    />
                </div>
            </div>
        );
    }

    // --- VIEW: FLASHCARD APP MODE ---
    return (
        <div className="fixed inset-0 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white font-sans flex flex-col overflow-hidden">

            {/* Top Bar: Compact Header */}
            <div className="flex-none px-4 py-3 flex items-center justify-between z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-100 dark:border-white/10">
                <button
                    onClick={() => setSelectedDeckId(null)}
                    className="p-2 -ml-2 rounded-full active:bg-zinc-100 dark:active:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500">
                        {currentIndex + 1} / {activeDeck.length}
                    </span>
                    <div className="w-24 h-1 bg-zinc-200 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div
                            className="h-full bg-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={toggleShuffle}
                        className={`p-2 rounded-full transition-colors ${isShuffled ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-zinc-400 dark:text-zinc-600'}`}
                    >
                        <Shuffle className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full text-zinc-400 dark:text-zinc-600"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative flex flex-col items-center justify-center p-4 md:p-8">
                {/* Card Container */}
                <div className="w-full max-w-sm aspect-[3/4] md:aspect-[4/5] relative z-10">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
                                center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
                                exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 300 : -300, opacity: 0, scale: 0.95 })
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            className="absolute inset-0 w-full h-full cursor-pointer perspective-1000"
                            onClick={() => setIsFlipped(!isFlipped)}
                        >
                            <motion.div
                                className="w-full h-full relative preserve-3d transition-transform duration-500"
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                            >
                                {/* FRONT */}
                                <div className="absolute inset-0 backface-hidden bg-white dark:bg-neutral-900 rounded-[2rem] p-6 shadow-2xl border border-zinc-100 dark:border-white/5 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-[10px] font-bold uppercase text-zinc-500 tracking-wider">
                                            #{currentCard?.id}
                                        </span>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? currentTheme.accent : 'text-indigo-600'}`}>
                                            {currentCard?.tag}
                                        </span>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center text-center">
                                        <h2 className="text-2xl font-bold leading-tight text-zinc-800 dark:text-white select-none">
                                            {currentCard?.question}
                                        </h2>
                                    </div>

                                    <div className="pt-6 border-t border-zinc-100 dark:border-white/5 flex justify-center text-zinc-400 text-xs font-medium uppercase tracking-widest">
                                        Tap to Flip
                                    </div>
                                </div>

                                {/* BACK */}
                                <div className="absolute inset-0 backface-hidden bg-zinc-50 dark:bg-neutral-900 rounded-[2rem] p-6 shadow-2xl border border-zinc-200 dark:border-white/5 flex flex-col rotate-y-180">
                                    <div className="flex justify-center mb-6">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? currentTheme.badge : 'bg-indigo-100 text-indigo-700'}`}>
                                            Answer
                                        </span>
                                    </div>

                                    <div className="flex-none text-center mb-6">
                                        <h3 className={`text-xl font-bold leading-snug ${theme === 'dark' ? currentTheme.accent : 'text-indigo-600'}`}>
                                            {currentCard?.answer}
                                        </h3>
                                    </div>

                                    <div className="flex-1 overflow-y-auto bg-white dark:bg-white/5 rounded-xl p-4 border border-zinc-100 dark:border-white/5">
                                        <p className="text-xs text-zinc-400 uppercase font-bold mb-2">Explanation</p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                            {currentCard?.explanation || "No additional explanation provided."}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Navigation / Controls Bar */}
            <div className="flex-none pb-[env(safe-area-inset-bottom)] bg-white dark:bg-neutral-900 border-t border-zinc-100 dark:border-white/5">
                <div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto w-full gap-6">

                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="flex flex-col items-center gap-1 group disabled:opacity-30 transition-opacity"
                    >
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-active:scale-95 transition-transform">
                            <ChevronLeft className="w-6 h-6 text-zinc-600 dark:text-white" />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-500">Prev</span>
                    </button>

                    <button
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <div className="w-14 h-14 rounded-full bg-indigo-500 dark:bg-indigo-600 shadow-lg shadow-indigo-500/20 flex items-center justify-center group-active:scale-95 transition-transform">
                            <RotateCcw className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] font-medium text-indigo-500">Flip</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === activeDeck.length - 1}
                        className="flex flex-col items-center gap-1 group disabled:opacity-30 transition-opacity"
                    >
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-active:scale-95 transition-transform">
                            <ChevronRight className="w-6 h-6 text-zinc-600 dark:text-white" />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-500">Next</span>
                    </button>

                </div>
            </div>

        </div>
    );
}

// Reusable Deck Button
function DeckButton({ title, subtitle, icon, onClick, colorClass }: any) {
    return (
        <button
            onClick={onClick}
            className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-zinc-200 dark:border-white/5 hover:border-transparent transition-all text-left shadow-sm hover:shadow-xl active:scale-98"
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-r ${colorClass}`} />
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${colorClass} text-white shadow-md`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-0.5">{title}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-neutral-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
            </div>
        </button>
    );
}
