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
    externalIndex?: number;
    onIndexChange?: (index: number) => void;
    bookmarks?: Set<string | number>;
    onBookmarkToggle?: (id: string | number) => void;
    initialShuffled?: boolean;
}

export default function PremiumFlashCardDeck({
    cards,
    title,
    externalIndex,
    onIndexChange,
    initialShuffled = false,
    bookmarks,
    onBookmarkToggle
}: PremiumFlashCardDeckProps) {
    const [internalIndex, setInternalIndex] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [displayCards, setDisplayCards] = useState(cards);
    const [direction, setDirection] = useState(0);
    // Removed local bookmarks state

    // Sync current index: prefer external if provided
    const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

    useEffect(() => {
        if (initialShuffled) {
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            setDisplayCards(shuffled);
            setIsShuffled(true);
        } else {
            setDisplayCards(cards);
            setIsShuffled(false);
        }

        // Reset index when cards change
        // Only reset if the deck literally changes content significantly, or we are explicitly switching decks.
        // For now, we trust the parent to handle resets if deck changes. 
        // But if we shuffle, we might want to reset.
    }, [cards, initialShuffled]);

    // Added separate effect for index reset to avoid loops if needed, but keeping it simple for now.
    useEffect(() => {
        // If cards change length or identity, we might want to reset, but parent controls index usually.
        // We'll rely on parent for index reset if switching decks.
    }, [cards]);


    // Haptic Feedback Helper
    const triggerHaptic = (pattern: number | number[] = 10) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    const handleNext = () => {
        if (currentIndex < displayCards.length - 1) {
            triggerHaptic(15);
            setDirection(1);
            const nextIdx = currentIndex + 1;
            if (onIndexChange) onIndexChange(nextIdx);
            else setInternalIndex(nextIdx);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            triggerHaptic(15);
            setDirection(-1);
            const prevIdx = currentIndex - 1;
            if (onIndexChange) onIndexChange(prevIdx);
            else setInternalIndex(prevIdx);
        }
    };

    const handleShuffle = () => {
        triggerHaptic(20);
        const newIsShuffled = !isShuffled;
        setIsShuffled(newIsShuffled);

        if (newIsShuffled) {
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            setDisplayCards(shuffled);
        } else {
            setDisplayCards(cards);
        }
        if (onIndexChange) onIndexChange(0);
        else setInternalIndex(0);
        setDirection(0);
    };

    const handleDragEnd = (event: any, info: any) => {
        const swipeThreshold = 50;
        if (info.offset.x < -swipeThreshold) {
            handleNext();
        } else if (info.offset.x > swipeThreshold) {
            handlePrev();
        }
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
        <div className="flex flex-col w-full max-w-lg mx-auto h-full md:min-h-[600px] relative bg-transparent">
            {/* ANDROID STYLE COMPACT HEADER (Matches Screenshot 1) */}
            <div className="w-full pt-4 pb-2 px-6">
                <div className="flex justify-between items-start mb-1">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white truncate tracking-tight uppercase leading-tight">
                            {/* If displaying Bookmarks, maybe show original tag? No, title is fine */}
                            {title}
                        </h2>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-0.5">
                            Card {currentIndex + 1} of {displayCards.length}
                        </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                        <button
                            onClick={handleShuffle}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${isShuffled ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10'}`}
                            title="Shuffle"
                        >
                            <Shuffle className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => {
                                triggerHaptic(20);
                                if (onIndexChange) onIndexChange(0);
                                else setInternalIndex(0);
                            }}
                            className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all hover:text-indigo-600 active:scale-95"
                            title="Reset"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Linear Progress Bar */}
                <div className="h-1 w-full bg-indigo-100 dark:bg-white/5 rounded-full overflow-hidden mt-4">
                    <motion.div
                        className="h-full bg-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* CARD AREA WITH SWIPE */}
            <div className="flex-1 relative w-full px-4 py-4 md:py-8 flex items-center justify-center pb-28 md:pb-8">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                        key={currentCard.id}
                        custom={direction}
                        initial={{ x: direction * 50, opacity: 0, scale: 0.98 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -direction * 50, opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.4}
                        onDragEnd={handleDragEnd}
                        className="w-full cursor-grab active:cursor-grabbing"
                    >
                        <PremiumFlashCard
                            question={currentCard.question}
                            answer={currentCard.answer}
                            explanation={currentCard.explanation}
                            category={currentCard.tag}
                            theme={getThemeForTag(currentCard.tag)}
                            isBookmarked={bookmarks?.has(currentCard.id)}
                            onBookmarkToggle={() => onBookmarkToggle?.(currentCard.id)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ANDROID-STYLE NAVIGATION (BOTTOM - Matches Screenshot 2) */}
            {/* ANDROID-STYLE NAVIGATION (BOTTOM - Matches Screenshot 2) */}

            {/* Mobile Fixed Bottom Navbar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-3xl border-t border-slate-100 dark:border-white/5 px-6 py-4 pb-6 flex items-center justify-between shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-800 dark:text-white active:scale-90 disabled:opacity-30 disabled:active:scale-100 transition-all touch-manipulation"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center flex-none opacity-80">
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2 leading-none">Card {currentIndex + 1} of {displayCards.length}</span>
                    <div className="w-12 h-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / displayCards.length) * 100}%` }} />
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === displayCards.length - 1}
                    className="w-14 h-14 rounded-2xl bg-indigo-600 border border-indigo-500 flex items-center justify-center text-white active:scale-90 disabled:opacity-30 disabled:bg-slate-200 disabled:border-slate-200 disabled:text-slate-400 disabled:active:scale-100 transition-all shadow-lg shadow-indigo-500/30 touch-manipulation"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Desktop Static Navigation */}
            <div className="hidden md:flex w-full px-6 py-6 flex-col items-center gap-4 mt-auto">
                <div className="flex items-center justify-between w-full max-w-sm gap-8">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="w-16 h-16 rounded-[24px] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none transition-all active:scale-90 disabled:opacity-20"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <div className="flex flex-col items-center flex-none">
                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em] mb-3 leading-none">Navigation</span>
                        <div className="flex gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const isActive = i === (currentIndex % 5);
                                return (
                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-indigo-600 shadow-lg shadow-indigo-500/30' : 'w-1.5 bg-slate-200 dark:bg-white/10'}`} />
                                );
                            })}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === displayCards.length - 1}
                        className="w-16 h-16 rounded-[24px] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none transition-all active:scale-90 disabled:opacity-20"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </div>
    );
}
