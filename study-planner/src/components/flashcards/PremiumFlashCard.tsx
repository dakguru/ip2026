"use client";

import React, { useState } from 'react';
import styles from './PremiumFlashCard.module.css';
import { RotateCcw, Bookmark, Info } from 'lucide-react';
import { clsx } from 'clsx';
import FormattedQuestionText from '@/components/quiz/FormattedQuestionText';

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
                            <button
                                className={clsx(styles.iconButton, isBookmarked && styles.active, "active:scale-90 transition-transform")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBookmarkToggle?.();
                                }}
                                onPointerDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                aria-label="Mark for revision"
                            >
                                <Bookmark className={clsx("w-5 h-5", isBookmarked && "fill-current")} />
                            </button>
                        </div>

                        <div className={styles.questionText}>
                            <FormattedQuestionText text={question} className="text-xl md:text-2xl font-black text-slate-800 dark:text-white leading-tight" />
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
                                className={clsx(styles.iconButton, isBookmarked && styles.active, "active:scale-90 transition-transform")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBookmarkToggle?.();
                                }}
                                onPointerDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                aria-label="Mark for revision"
                            >
                                <Bookmark className={clsx("w-5 h-5", isBookmarked && "fill-current")} />
                            </button>
                        </div>

                        <div className={styles.answerText}>
                            <FormattedQuestionText text={answer} className="text-xl md:text-2xl font-black text-indigo-900 dark:text-indigo-100 leading-tight" />
                        </div>

                        {explanation && (
                            <div className={styles.explanationBox} onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2 mb-1.5 font-black text-[9px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                    <Info className="w-3 h-3" /> Explanation
                                </div>
                                <div
                                    className={styles.explanationContent}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onTouchStart={(e) => e.stopPropagation()}
                                >
                                    <div className="text-[12px] md:text-[13px] font-medium text-slate-600 dark:text-slate-300 leading-snug">
                                        <FormattedQuestionText text={explanation} className="space-y-2" />
                                    </div>
                                </div>
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
