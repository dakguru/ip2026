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

// Scale the type down as the text grows so long questions/answers still fit the card.
// Normal-length questions keep the original size; only genuinely long ones shrink.
const getTextSizeClass = (text: string): string => {
    const len = text.length;
    if (len > 550) return "text-xs md:text-sm leading-snug";
    if (len > 380) return "text-sm md:text-base leading-snug";
    if (len > 240) return "text-base md:text-lg leading-snug";
    if (len > 130) return "text-lg md:text-xl leading-tight";
    return "text-xl md:text-2xl leading-tight";
};

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
                    <div className={clsx(styles.watermark, "dark:opacity-10 dark:invert")} />

                    <div className={styles.header}>
                        <div className={clsx(styles.tag, "dark:bg-white/5")}>{category || theme}</div>
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

                    <div className={clsx(styles.contentContainer, styles.backScroll)}>
                        <div className={clsx(styles.questionText, "dark:text-slate-50")}>
                            <FormattedQuestionText text={question} className={clsx(getTextSizeClass(question), "font-black text-slate-800 dark:text-white")} />
                        </div>
                    </div>

                    <div className={clsx(styles.footer, "dark:border-white/5")}>
                        <span className={styles.footerLabel}>Question</span>
                        <div className={styles.iconButton}>
                            <RotateCcw className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div className={clsx(styles.flashcardBack, getThemeClass())}>
                    <div className={clsx(styles.watermark, "dark:opacity-10 dark:invert")} />

                    <div className={styles.header}>
                        <div className={clsx(styles.tag, "dark:bg-white/5")}>{category || theme}</div>
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

                    <div className={clsx(styles.contentContainer, styles.backScroll)}>
                        <div className={styles.backCenter}>
                            <div className={clsx(styles.answerText, "dark:text-blue-400")}>
                                <FormattedQuestionText text={answer} className={clsx(getTextSizeClass(answer), "font-black text-indigo-900 dark:text-blue-400")} />
                            </div>

                            {explanation && (
                                <div className={styles.explanationBox} onClick={(e) => e.stopPropagation()}>
                                    <div className={clsx(styles.explLabel, "flex items-center gap-2 mb-1.5 font-black text-[9px] uppercase tracking-[0.2em]")}>
                                        <Info className="w-3 h-3" /> Explanation
                                    </div>
                                    <div className={styles.explanationContent}>
                                        <div className="text-[12px] md:text-[13px] font-medium text-slate-600 dark:text-slate-100 leading-snug">
                                            <FormattedQuestionText text={explanation} className="space-y-2 dark:text-slate-100 text-slate-600" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={clsx(styles.footer, "dark:border-white/5")}>
                        <span className={styles.footerLabel}>Correct Answer</span>
                        <div className={styles.iconButton}>
                            <RotateCcw className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
