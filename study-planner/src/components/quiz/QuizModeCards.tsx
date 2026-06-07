"use client";

import { GraduationCap, ClipboardCheck, RefreshCw, Check } from "lucide-react";

export type PracticeMode = 'practice' | 'exam' | 'revision';

interface QuizModeCardsProps {
    selectedMode: PracticeMode | null;
    onSelect: (mode: PracticeMode) => void;
    isPS: boolean;
    revisionCount: number;
    revisionLoading: boolean;
}

const MODES: { id: PracticeMode; title: string; short: string; desc: string; Icon: any }[] = [
    { id: 'practice', title: 'Practice Mode', short: 'Practice', desc: 'Instant answer & explanation after every question.', Icon: GraduationCap },
    { id: 'exam', title: 'Exam Mode', short: 'Exam', desc: 'No answers shown until final submission.', Icon: ClipboardCheck },
    { id: 'revision', title: 'Revision Mode', short: 'Revision', desc: 'Only your wrong & bookmarked questions.', Icon: RefreshCw },
];

export default function QuizModeCards({ selectedMode, onSelect, isPS, revisionCount, revisionLoading }: QuizModeCardsProps) {
    return (
        <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Choose Practice Mode</span>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
            </div>
            {/* Compact 3-up grid that stays a single row on phones for a clean, app-like feel */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {MODES.map(({ id, title, short, desc, Icon }) => {
                    const isSelected = selectedMode === id;
                    const isRevision = id === 'revision';
                    return (
                        <button
                            key={id}
                            onClick={() => onSelect(id)}
                            aria-pressed={isSelected}
                            className={`group relative text-left p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all active:scale-[0.97] overflow-hidden flex flex-col items-center sm:items-start text-center sm:text-left
                                ${isSelected
                                    ? (isPS
                                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-md shadow-teal-200/50 dark:shadow-teal-900/20'
                                        : 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md shadow-purple-200/50 dark:shadow-purple-900/20')
                                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 active:border-zinc-300 dark:active:border-zinc-700'}
                            `}
                        >
                            {isSelected && (
                                <span className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-white ${isPS ? 'bg-teal-500' : 'bg-purple-500'}`}>
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={3} />
                                </span>
                            )}
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-colors shrink-0
                                ${isSelected
                                    ? (isPS ? 'bg-teal-500 text-white' : 'bg-purple-500 text-white')
                                    : (isPS ? 'bg-teal-100 dark:bg-zinc-800 text-teal-600 dark:text-zinc-300' : 'bg-purple-100 dark:bg-zinc-800 text-purple-600 dark:text-zinc-300')}
                            `}>
                                <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                            </div>
                            {/* Short title on phones, full title on larger screens */}
                            <h3 className="font-bold text-[11px] leading-tight sm:text-sm text-zinc-900 dark:text-zinc-100">
                                <span className="sm:hidden">{short}</span>
                                <span className="hidden sm:inline">{title}</span>
                            </h3>
                            {/* Descriptions only on >= sm to keep mobile cards compact & even-height */}
                            <p className="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">{desc}</p>
                            {isRevision && (
                                <span className={`inline-block mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap
                                    ${revisionLoading
                                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                                        : revisionCount > 0
                                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}
                                `}>
                                    {revisionLoading ? '…' : `${revisionCount}`}<span className="hidden sm:inline"> available</span>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
