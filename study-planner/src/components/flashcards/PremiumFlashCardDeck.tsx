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
    initialShuffled?: boolean;
}

export default function PremiumFlashCardDeck({
    cards,
    title,
    externalIndex,
    onIndexChange,
    initialShuffled = false
}: PremiumFlashCardDeckProps) {
    const [internalIndex, setInternalIndex] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [displayCards, setDisplayCards] = useState(cards);
    const [direction, setDirection] = useState(0);
    const [bookmarks, setBookmarks] = useState<Set<string | number>>(new Set());

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
        if (onIndexChange) onIndexChange(externalIndex || 0);
        else setInternalIndex(0);
    }, [cards, onIndexChange, initialShuffled]);

    const handleNext = () => {
        if (currentIndex < displayCards.length - 1) {
            setDirection(1);
            const nextIdx = currentIndex + 1;
            if (onIndexChange) onIndexChange(nextIdx);
            else setInternalIndex(nextIdx);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            const prevIdx = currentIndex - 1;
            if (onIndexChange) onIndexChange(prevIdx);
            else setInternalIndex(prevIdx);
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
        if (onIndexChange) onIndexChange(0);
        else setInternalIndex(0);
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
        <div className="flex flex-col w-full max-w-lg mx-auto h-full min-h-[600px] relative bg-transparent">
            {/* ANDROID STYLE COMPACT HEADER (Matches Screenshot 1) */}
            <div className="w-full pt-4 pb-2 px-6">
                <div className="flex justify-between items-start mb-1">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white truncate tracking-tight uppercase leading-tight">
                            {title}
                        </h2>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-0.5">
                            Card {currentIndex + 1} of {displayCards.length}
                        </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                        <button
                            onClick={handleShuffle}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isShuffled ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10'}`}
                            title="Shuffle"
                        >
                            <Shuffle className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => {
                                if (onIndexChange) onIndexChange(0);
                                else setInternalIndex(0);
                            }}
                            className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all hover:text-indigo-600"
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
            <div className="flex-1 relative w-full px-4 py-8 flex items-center justify-center">
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
                            isBookmarked={bookmarks.has(currentCard.id)}
                            onBookmarkToggle={() => toggleBookmark(currentCard.id)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ANDROID-STYLE NAVIGATION (BOTTOM - Matches Screenshot 2) */}
            <div className="w-full px-6 py-6 flex flex-col items-center gap-4 mt-auto">
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
