"use client";

import React, { useState, useEffect } from 'react';
import PremiumFlashCard, { FlashCardTheme } from './PremiumFlashCard';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardData {
    id: string | number;
    question: string;
    answer: string;
    explanation?: string;
    tag: string;
    category?: string;
}

interface PremiumFlashCardDeckProps {
    cards: CardData[];
    title: string;
}

export default function PremiumFlashCardDeck({ cards, title }: PremiumFlashCardDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [displayCards, setDisplayCards] = useState(cards);
    const [direction, setDirection] = useState(0);
    const [bookmarks, setBookmarks] = useState<Set<string | number>>(new Set());

    useEffect(() => {
        setDisplayCards(cards);
        setCurrentIndex(0);
    }, [cards]);

    const handleNext = () => {
        if (currentIndex < displayCards.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleShuffle = () => {
        const newIsShuffled = !isShuffled;
        setIsShuffled(newIsShuffled);

        if (newIsShuffled) {
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            setDisplayCards(shuffled);
        } else {
            setDisplayCards(cards);
        }
        setCurrentIndex(0);
        setDirection(0);
    };

    const toggleBookmark = (id: string | number) => {
        const newBookmarks = new Set(bookmarks);
        if (newBookmarks.has(id)) {
            newBookmarks.delete(id);
        } else {
            newBookmarks.add(id);
        }
        setBookmarks(newBookmarks);
    };

    const currentCard = displayCards[currentIndex];
    const progress = ((currentIndex + 1) / displayCards.length) * 100;

    const getThemeForTag = (tag: string): FlashCardTheme => {
        const t = tag.toLowerCase();
        if (t.includes('law') || t.includes('act') || t.includes('pmla')) return 'Postal Law';
        if (t.includes('account') || t.includes('finance')) return 'Accounts';
        if (t.includes('conduct') || t.includes('rule')) return 'Conduct Rules';
        if (t.includes('current') || t.includes('affair')) return 'Current Affairs';
        return 'General';
    };

    if (!currentCard) return null;

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-8">
            {/* PROGRESS HEADER */}
            <div className="w-full space-y-4 px-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Card {currentIndex + 1} of {displayCards.length}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleShuffle}
                            className={`p-2.5 rounded-xl transition-all ${isShuffled ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800'}`}
                            title="Shuffle Deck"
                        >
                            <Shuffle className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentIndex(0)}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 transition-all hover:text-slate-600 dark:hover:text-slate-200"
                            title="Reset Deck"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* CARD AREA */}
            <div className="relative w-full aspect-[4/5] max-h-[500px] px-4">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentCard.id}
                        initial={{ x: direction * 100, opacity: 0, scale: 0.95 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -direction * 100, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full h-full"
                    >
                        <PremiumFlashCard
                            question={currentCard.question}
                            answer={currentCard.answer}
                            explanation={currentCard.explanation}
                            category={currentCard.tag}
                            theme={getThemeForTag(currentCard.tag)}
                            isBookmarked={bookmarks.has(currentCard.id)}
                            onBookmarkToggle={() => toggleBookmark(currentCard.id)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* NAVIGATION CONTROLS */}
            <div className="flex items-center gap-6 pb-12">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-800 dark:text-white shadow-sm transition-all active:scale-90 disabled:opacity-30 disabled:grayscale"
                >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                <div className="flex flex-col items-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Navigation</p>
                    <div className="flex gap-1.5">
                        {Array.from({ length: Math.min(displayCards.length, 5) }).map((_, i) => {
                            // Simple dot indicator
                            const isActive = i === (currentIndex % 5);
                            return (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-4 bg-blue-500' : 'w-1.5 bg-slate-200 dark:bg-slate-800'}`} />
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === displayCards.length - 1}
                    className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-800 dark:text-white shadow-sm transition-all active:scale-90 disabled:opacity-30 disabled:grayscale"
                >
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>
            </div>
        </div>
    );
}
