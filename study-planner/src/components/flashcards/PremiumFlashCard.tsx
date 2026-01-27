"use client";

import React, { useState } from 'react';
import styles from './PremiumFlashCard.module.css';
import { RotateCcw, Bookmark, Info, ChevronRight, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

export type FlashCardTheme = 'Postal Law' | 'Accounts' | 'Conduct Rules' | 'Current Affairs' | 'General';

interface PremiumFlashCardProps {
    question: string;
    answer: string;
    explanation?: string;
    category?: string;
    theme?: FlashCardTheme;
    isBookmarked?: boolean;
    onBookmarkToggle?: () => void;
}

export default function PremiumFlashCard({
    question,
    answer,
    explanation,
    category,
    theme = 'General',
    isBookmarked = false,
    onBookmarkToggle
}: PremiumFlashCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFlip = (e: React.MouseEvent | React.KeyboardEvent) => {
        // Prevent flipping if clicking on action buttons
        if ((e.target as HTMLElement).closest('button')) return;

        setIsFlipped(!isFlipped);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleFlip(e);
        }
    };

    const getThemeClass = () => {
        switch (theme) {
            case 'Postal Law': return styles.themePostalLaw;
            case 'Accounts': return styles.themeAccounts;
            case 'Conduct Rules': return styles.themeConductRules;
            case 'Current Affairs': return styles.themeCurrentAffairs;
            default: return styles.themeGeneral;
        }
    };

    return (
        <div
            className={clsx(styles.flashcard, isFlipped && styles.flipped)}
            onClick={handleFlip}
            onTouchStart={() => {
                // Mobile behavior for immediate feedback
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Flashcard: ${question}`}
        >
            <div className={styles.flashcardInner}>
                {/* FRONT SIDE */}
                <div className={clsx(styles.flashcardFront, getThemeClass())}>
                    <div className={styles.watermark} />

                    <div className={styles.contentContainer}>
                        <div className={styles.header}>
                            <div className={styles.tag}>{category || theme}</div>
                            <HelpCircle className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                        </div>

                        <div className={styles.questionText}>
                            {question}
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question</span>
                        <div className={styles.iconButton}>
                            <RotateCcw className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div className={clsx(styles.flashcardBack, getThemeClass())}>
                    <div className={styles.watermark} />

                    <div className={styles.contentContainer}>
                        <div className={styles.header}>
                            <div className={styles.tag}>{category || theme}</div>
                            <button
                                className={clsx(styles.iconButton, isBookmarked && styles.active)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBookmarkToggle?.();
                                }}
                                aria-label="Mark for revision"
                            >
                                <Bookmark className={clsx("w-5 h-5", isBookmarked && "fill-current")} />
                            </button>
                        </div>

                        <div className={styles.answerText}>
                            {answer}
                        </div>

                        {explanation && (
                            <div className={styles.explanationBox} onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2 mb-2 font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                    <Info className="w-3.5 h-3.5" /> Explanation
                                </div>
                                <div className={clsx(
                                    "transition-all duration-500 overflow-y-auto scrollbar-hide",
                                    !isExpanded && explanation.length > 200 ? "max-h-[100px]" : "max-h-[250px]"
                                )}>
                                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {explanation}
                                    </p>
                                </div>
                                {explanation.length > 200 && (
                                    <button
                                        className="mt-3 text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1 self-start transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsExpanded(!isExpanded);
                                        }}
                                    >
                                        {isExpanded ? 'Show Less' : 'Read Full Explanation'}
                                        <ChevronRight className={clsx("w-3.5 h-3.5 transition-transform duration-300", isExpanded && "rotate-90")} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={styles.footer}>
                        <span className="text-[10px] font-bold text-blue-500/70 uppercase tracking-widest">Correct Answer</span>
                        <div className={styles.iconButton}>
                            <RotateCcw className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
