"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import {
    ArrowLeft, AlertTriangle, ChevronRight, ChevronLeft,
    RotateCcw, Sun, Moon, Sparkles, Layers, BookOpen
} from "lucide-react";
import { useTheme } from "next-themes";
import { pmlaFlashcards } from "./pmla_data";
import { poActData } from "./po_act_data";
import Link from "next/link";
import Image from "next/image";

// --- Types ---
type FlashcardDeck = typeof pmlaFlashcards;

// --- Constants & Themes ---
const CARD_THEMES = [
    {
        name: "Navy Teal",
        gradient: "from-slate-900 to-teal-900",
        lightGradient: "from-slate-100 to-teal-50",
        accent: "text-teal-400",
        lightAccent: "text-teal-700",
        border: "border-teal-500/20",
        shadow: "shadow-teal-900/20",
        badge: "bg-teal-500/10 text-teal-400"
    },
    {
        name: "Deep Purple",
        gradient: "from-indigo-900 to-purple-900",
        lightGradient: "from-indigo-50 to-purple-50",
        accent: "text-purple-400",
        lightAccent: "text-purple-700",
        border: "border-purple-500/20",
        shadow: "shadow-purple-900/20",
        badge: "bg-purple-500/10 text-purple-400"
    },
    {
        name: "Emerald Cyan",
        gradient: "from-emerald-900 to-cyan-900",
        lightGradient: "from-emerald-50 to-cyan-50",
        accent: "text-cyan-400",
        lightAccent: "text-cyan-700",
        border: "border-cyan-500/20",
        shadow: "shadow-cyan-900/20",
        badge: "bg-cyan-500/10 text-cyan-400"
    },
    {
        name: "Amber Orange",
        gradient: "from-amber-900 to-orange-900",
        lightGradient: "from-amber-50 to-orange-50",
        accent: "text-orange-400",
        lightAccent: "text-orange-700",
        border: "border-orange-500/20",
        shadow: "shadow-orange-900/20",
        badge: "bg-orange-500/10 text-orange-400"
    },
    {
        name: "Rose Pink",
        gradient: "from-rose-900 to-pink-900",
        lightGradient: "from-rose-50 to-pink-50",
        accent: "text-pink-400",
        lightAccent: "text-pink-700",
        border: "border-pink-500/20",
        shadow: "shadow-pink-900/20",
        badge: "bg-pink-500/10 text-pink-400"
    }
];

export default function FlashcardsPage() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Auth & Deck State
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [selectedDeck, setSelectedDeck] = useState<'pmla' | 'poact' | null>(null);

    // Card State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);

    // Derived State
    const activeDeck = selectedDeck === 'pmla' ? pmlaFlashcards : (selectedDeck === 'poact' ? poActData : []);

    // --- Access Control ---
    useEffect(() => {
        setMounted(true);
        const checkAuth = () => {
            const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
            if (match) {
                try {
                    const session = JSON.parse(decodeURIComponent(match[2]));
                    if (session.role === 'admin' || session.isAdmin === true || session.membershipLevel === 'admin') {
                        setIsAdmin(true);
                        return;
                    }
                } catch (e) { console.error(e); }
            }
            setIsAdmin(false);
        };
        checkAuth();
    }, []);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedDeck) return;
            switch (e.key) {
                case "ArrowRight": handleNext(); break;
                case "ArrowLeft": handlePrev(); break;
                case " ":
                case "Enter":
                    e.preventDefault();
                    setIsFlipped(prev => !prev);
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedDeck, currentIndex, isFlipped]);

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
        if (info.offset.x < -100) handleNext();
        else if (info.offset.x > 100) handlePrev();
    };

    const selectDeck = (deck: 'pmla' | 'poact') => {
        setSelectedDeck(deck);
        setCurrentIndex(0);
        setIsFlipped(false);
        setDirection(0);
    };

    // --- RENDER HELPERS ---

    // Theme Colors
    const currentTheme = CARD_THEMES[currentIndex % CARD_THEMES.length];

    // Conditional Access Rendering
    if (!mounted) return null;
    if (isAdmin === null) return <div className="min-h-screen grid place-items-center bg-zinc-50 dark:bg-neutral-950 text-zinc-500">Loading...</div>;

    if (isAdmin === false) {
        return (
            <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-white">Restricted Access</h1>
                <p className="text-neutral-400">This feature is strictly for Admin users.</p>
                <Link href="/dashboard" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors">Return to Dashboard</Link>
            </div>
        );
    }

    // --- DECK SELECTION SCREEN ---
    if (!selectedDeck) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 transition-colors duration-500 flex flex-col items-center justify-center p-6 font-sans">
                <header className="fixed top-0 left-0 right-0 p-5 flex items-center justify-between z-20">
                    <Link href="/dashboard" className="p-2 -ml-2 text-zinc-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-zinc-200 dark:bg-neutral-800 text-zinc-700 dark:text-neutral-300">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </header>

                <div className="text-center space-y-3 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Layers className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Flashcard Revision</h1>
                    <p className="text-zinc-500 dark:text-neutral-400">Select a topic to begin your session</p>
                </div>

                <div className="w-full max-w-md grid gap-4">
                    <DeckButton
                        title="PO Act 2023 & Rules 2024"
                        subtitle="20 Cards • Recent Legislation"
                        icon={<Sparkles className="w-5 h-5" />}
                        onClick={() => selectDeck('poact')}
                        colorClass="from-cyan-500 to-blue-500"
                    />
                    <DeckButton
                        title="PMLA, 2002"
                        subtitle="20 Cards • Money Laundering Act"
                        icon={<BookOpen className="w-5 h-5" />}
                        onClick={() => selectDeck('pmla')}
                        colorClass="from-indigo-500 to-purple-500"
                    />
                </div>
            </div>
        );
    }

    const card = activeDeck[currentIndex];
    if (!card) return null; // Safety fallback

    // Animation Variants
    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 500 : -500, opacity: 0, scale: 0.9, rotateY: d > 0 ? 45 : -45 }),
        center: { zIndex: 1, x: 0, opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.4, ease: "circOut" } },
        exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 500 : -500, opacity: 0, scale: 0.9, rotateY: d < 0 ? -45 : 45, transition: { duration: 0.4, ease: "circIn" } })
    };

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-neutral-950 flex flex-col overflow-hidden font-sans transition-colors duration-500 selection:bg-indigo-500/30">
            {/* --- Header --- */}
            <header className="px-5 py-4 flex items-center justify-between z-20 backdrop-blur-md sticky top-0 pb-[max(16px,env(safe-area-inset-top))]">
                <button onClick={() => setSelectedDeck(null)} className="p-2 -ml-2 text-zinc-500 dark:text-neutral-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${theme === 'dark' ? currentTheme.accent : currentTheme.lightAccent}`}>
                        {selectedDeck === 'pmla' ? "PMLA, 2002" : "PO Act 2023"}
                    </p>
                    <p className="text-xs font-medium text-zinc-500 dark:text-neutral-500">
                        Card {currentIndex + 1} of {activeDeck.length}
                    </p>
                </div>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-white dark:bg-neutral-800 text-zinc-700 dark:text-neutral-300 shadow-sm">
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </header>

            {/* --- Progress Bar --- */}
            <div className="w-full h-1 bg-zinc-200 dark:bg-neutral-900 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / activeDeck.length) * 100}%` }}
                    className={`h-full bg-gradient-to-r ${theme === 'dark' ? currentTheme.gradient : currentTheme.lightGradient}`}
                />
            </div>

            {/* --- Main Stage --- */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative perspective-1000">
                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[120px] opacity-30 dark:opacity-20 bg-gradient-to-br ${theme === 'dark' ? currentTheme.gradient : currentTheme.lightGradient}`} />
                </div>

                {/* Card Container */}
                <div className="w-full max-w-sm aspect-[3/4] md:aspect-[4/5] relative">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            className="w-full h-full absolute inset-0 cursor-pointer touch-none preserve-3d"
                        >
                            {/* Inner Flipper */}
                            <motion.div
                                className="w-full h-full relative preserve-3d"
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                {/* === FRONT SIDE === */}
                                <div className={`absolute inset-0 w-full h-full rounded-[32px] p-8 flex flex-col shadow-2xl backface-hidden border
                                    bg-white dark:bg-neutral-900 
                                    ${theme === 'dark' ? 'border-white/5 shadow-black/50' : 'border-zinc-200 shadow-zinc-200/50'}
                                `}>
                                    {/* Watermark */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                                        <div className="relative w-48 h-48">
                                            <Image src="/official-logo.png" alt="Watermark" fill className="object-contain grayscale" />
                                        </div>
                                    </div>

                                    {/* Top Metadata */}
                                    <div className="flex justify-between items-center mb-8 relative z-10">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-neutral-400`}>
                                            ID: #{card.id}
                                        </span>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? currentTheme.accent : currentTheme.lightAccent}`}>
                                            {card.tag}
                                        </span>
                                    </div>

                                    {/* Question */}
                                    <div className="flex-1 flex flex-col justify-center relative z-10">
                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-zinc-900 dark:text-white">
                                            {card.question}
                                        </h2>
                                    </div>

                                    {/* Bottom Hint */}
                                    <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/5 flex justify-between items-center relative z-10">
                                        <span className="text-xs font-semibold text-zinc-400 dark:text-neutral-500">Tap to Flip</span>
                                        <RotateCcw className="w-4 h-4 text-zinc-300 dark:text-neutral-600" />
                                    </div>
                                </div>

                                {/* === BACK SIDE === */}
                                <div
                                    className={`absolute inset-0 w-full h-full rounded-[32px] p-8 flex flex-col shadow-2xl overflow-hidden backface-hidden border
                                        ${theme === 'dark' ? 'bg-neutral-900 border-white/5' : 'bg-white border-zinc-200'}
                                    `}
                                    style={{ transform: "rotateY(180deg)" }}
                                >
                                    {/* Answer Indicator */}
                                    <div className="flex justify-center mb-8">
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? currentTheme.badge : 'bg-zinc-100 text-zinc-600'}`}>
                                            Correct Answer
                                        </div>
                                    </div>

                                    {/* The Answer */}
                                    <div className="relative z-10 mb-8 text-center">
                                        <h3 className={`text-2xl font-bold leading-snug ${theme === 'dark' ? currentTheme.accent : currentTheme.lightAccent}`}>
                                            {card.answer}
                                        </h3>
                                    </div>

                                    {/* Explanation */}
                                    <div className={`flex-1 overflow-y-auto p-4 rounded-2xl relative z-10 text-sm leading-relaxed
                                        ${theme === 'dark' ? 'bg-white/5 text-neutral-300' : 'bg-zinc-50 text-zinc-600'}
                                    `}>
                                        <span className={`block text-xs font-bold uppercase mb-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-zinc-400'}`}>Explanation</span>
                                        {card.explanation}
                                    </div>

                                    {/* Footer Nav Hint */}
                                    <div className="mt-6 text-center">
                                        <p className="text-[10px] text-zinc-400 dark:text-neutral-600 font-medium">
                                            Keyboard: Space to Flip • Arrows to Navigate
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- Bottom Controls (Mobile/Desktop) --- */}
                <div className="w-full max-w-sm flex items-center justify-between mt-8 z-20 gap-4">
                    <button onClick={handlePrev} disabled={currentIndex === 0}
                        className="p-4 rounded-full bg-white dark:bg-neutral-800 text-zinc-900 dark:text-white shadow-lg disabled:opacity-30 disabled:scale-95 active:scale-90 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button onClick={handleNext} disabled={currentIndex === activeDeck.length - 1}
                        className={`flex-1 py-4 rounded-full font-bold text-white shadow-lg active:scale-95 transition-all bg-gradient-to-r ${theme === 'dark' ? currentTheme.gradient : currentTheme.lightGradient} disabled:opacity-50`}
                    >
                        {currentIndex === activeDeck.length - 1 ? "Finish" : "Next Card"}
                    </button>

                    {/* Shuffle or random can go here, but omitted for simplicity as per MVP */}
                </div>
            </main>
        </div>
    );
}

// Reusable Deck Button Component
function DeckButton({ title, subtitle, icon, onClick, colorClass }: any) {
    return (
        <button
            onClick={onClick}
            className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-zinc-200 dark:border-white/5 hover:border-transparent transition-all text-left shadow-sm hover:shadow-xl"
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-r ${colorClass}`} />
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${colorClass} text-white shadow-md`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-0.5">{title}</h3>
                        <p className="text-xs text-zinc-500 dark:text-neutral-400">{subtitle}</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-neutral-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
            </div>
        </button>
    );
}
