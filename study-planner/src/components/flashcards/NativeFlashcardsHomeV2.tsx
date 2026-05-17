import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, SlidersHorizontal, Layers, BookOpen, Clock,
    Zap, ChevronRight, Lock, Play, Star, Bookmark, Crown, Sparkles, Timer, ArrowRight
} from "lucide-react";
import { useTheme } from "next-themes";
import FlashcardsMarquee from "@/components/FlashcardsMarquee";

interface NativeFlashcardsHomeProps {
    decks: any[];
    progress: Record<string, number>;
    onDeckSelect: (id: string, startIdx?: number, shuffle?: boolean) => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    activeFilter: string;
    setActiveFilter: (f: string) => void;
    bookmarks: Set<any>;
    userStreak?: number; // Optional
    hasAccess?: boolean;
    course?: string;
}

export default function NativeFlashcardsHomeV2({
    decks,
    progress,
    onDeckSelect,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    bookmarks,
    userStreak = 0,
    hasAccess = true,
    course
}: NativeFlashcardsHomeProps) {
    const { theme } = useTheme();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Calculate Stats
    const totalCards = decks.reduce((acc, deck) => acc + deck.count, 0);
    const studiedCount = Object.keys(progress).length;

    // Filter Logic is effectively handled by parent (FlashcardsPage passes filtered 'decks')
    // BUT, the requirements say "Stats Row" scrolls horizontally, everything else vertical.
    // And "Floating Filter Chips".

    return (
        <div className="min-h-[100dvh] bg-[#f8f9fb] dark:bg-[#0a0a0a] text-slate-900 dark:text-white pb-[max(6rem,env(safe-area-inset-bottom))] font-sans selection:bg-indigo-500/30 transition-colors duration-300">

            {/* 1. HERO HEADER (Top 35% ish visually, simplified for scroll) */}
            <div className="relative pt-[max(2rem,env(safe-area-inset-top))] pb-4 px-6 overflow-hidden">
                {/* Background Ambient Gradients */}
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute top-[0%] right-[-20%] w-[60%] h-[60%] rounded-full bg-violet-600/5 blur-[80px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-slate-900 dark:text-white">
                        Flashcards
                    </h1>
                    <h2 className="text-sm font-medium text-slate-500 dark:text-zinc-400 mb-2">
                        Master Postal Laws Through Smart Revision
                    </h2>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-[0.2em]">
                        Prepare Faster • Recall Better
                    </p>
                </motion.div>
            </div>

            {/* 2. FLOATING SEARCH BAR & FILTERS */}
            <div className="sticky top-0 z-50 px-6 py-2 bg-[#f8f9fb]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-zinc-200/60 dark:border-zinc-800/60 transition-all">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`relative flex items-center bg-white dark:bg-zinc-900 border ${isSearchFocused ? 'border-indigo-400 shadow-sm ring-1 ring-indigo-400/30' : 'border-zinc-200 dark:border-zinc-800'} rounded-2xl h-12 px-4 mb-4 transition-all duration-200`}
                >
                    <Search className={`w-4 h-4 mr-3 transition-colors ${isSearchFocused ? 'text-indigo-500' : 'text-slate-400 dark:text-zinc-500'}`} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Search Acts, Rules, Sections..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 font-medium"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="p-1 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                            <span className="sr-only">Clear</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </motion.div>

                {/* 4. Floating Filter Chips (Horizontal Scroll) */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 mask-linear-fade">
                    {["All", "Paper - I", course === 'PS_GR_B' ? "Paper - II" : "Paper - III", "PYQs", "Bookmarked FCs"].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter === activeFilter && filter !== 'All' ? 'All' : filter)}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${activeFilter === filter
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                                : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    <FlashcardsMarquee />
                </div>
            </div>

            {/* 3. COMPACT STATS ROW (Horizontal Scroll) */}
            <div className="mt-4 mb-8 px-6">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                    {/* Total Cards */}
                    <div className="flex-shrink-0 w-32 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3 flex flex-col justify-between h-24">
                        <Layers className="w-5 h-5 text-emerald-500 mb-2" />
                        <div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{totalCards}</div>
                            <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase mt-1">Total Cards</div>
                        </div>
                    </div>
                    {/* Recently Studied */}
                    <div className="flex-shrink-0 w-32 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3 flex flex-col justify-between h-24">
                        <Clock className="w-5 h-5 text-blue-500 mb-2" />
                        <div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{studiedCount}</div>
                            <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase mt-1">Studied</div>
                        </div>
                    </div>
                    {/* Bookmarked */}
                    <div
                        onClick={() => bookmarks.size > 0 && onDeckSelect('bookmarks')}
                        className={`flex-shrink-0 w-32 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3 flex flex-col justify-between h-24 transition-opacity ${bookmarks.size === 0 ? 'opacity-50' : 'active:scale-95'}`}
                    >
                        <Bookmark className="w-5 h-5 text-amber-500 mb-2" />
                        <div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{bookmarks.size}</div>
                            <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase mt-1">Bookmarked</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. TOPICS / PAPERS SECTION (VERTICAL STACK) */}
            <div className="px-4 space-y-4">
                {activeFilter === 'All' && !searchQuery ? (
                    // CATEGORY VIEW
                    <div className="grid grid-cols-1 gap-4 pb-20">
                        <MobileCategoryCard
                            title="Paper I"
                            subtitle="Acts, Rules & Framework. The core foundation."
                            icon={<Layers className="w-6 h-6" />}
                            theme="indigo"
                            actionText="Explore Topics"
                            onClick={() => setActiveFilter('Paper - I')}
                        />
                        <MobileCategoryCard
                            title={course === 'PS_GR_B' ? "Paper II" : "Paper III"}
                            subtitle="Legal, Financial, and Administrative Knowledge."
                            icon={<BookOpen className="w-6 h-6" />}
                            theme="emerald"
                            actionText="Explore Topics"
                            onClick={() => setActiveFilter(course === 'PS_GR_B' ? 'Paper - II' : 'Paper - III')}
                        />
                        <MobileCategoryCard
                            title="PYQs"
                            subtitle="Previous Year Questions. Analyze patterns and study."
                            icon={<Timer className="w-6 h-6" />}
                            theme="amber"
                            actionText="Start Studying"
                            onClick={() => setActiveFilter('PYQs')}
                        />
                        <MobileCategoryCard
                            title="Current Affairs"
                            subtitle="Latest Updates, News, and General Awareness."
                            icon={<Sparkles className="w-6 h-6" />}
                            theme="rose"
                            actionText="Read Now"
                            onClick={() => setActiveFilter('Current Affairs')}
                        />
                    </div>
                ) : (
                    // DECK LIST VIEW
                    <>
                        <AnimatePresence mode="popLayout">
                            {decks.map((deck, i) => (
                                <VerticalPaperCard
                                    key={deck.id}
                                    deck={deck}
                                    progress={progress[deck.id] || 0}
                                    index={i}
                                    onSelect={() => onDeckSelect(deck.id)}
                                    locked={!hasAccess && (deck.category === 'Paper I' || deck.category === 'Paper II' || deck.category === 'Paper III' || deck.category === 'PYQ')}
                                    course={course}
                                />
                            ))}
                        </AnimatePresence>

                        {decks.length === 0 && (
                            <div className="text-center py-20 opacity-50">
                                <Layers className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-zinc-700" />
                                <p className="text-slate-500 dark:text-zinc-500 text-sm">No topics match your filter.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
}

// --- SUB COMPONENTS ---

function VerticalPaperCard({ deck, progress, index, onSelect, locked, course }: any) {
    // Generate a consistent gradient based on index/id for visual variety but calmness
    // Generate a consistent gradient based on index/id
    const gradients = [
        "bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/40 dark:to-black border-indigo-100 dark:border-indigo-500/20",
        "bg-gradient-to-br from-violet-50 to-white dark:from-violet-900/40 dark:to-black border-violet-100 dark:border-violet-500/20",
        "bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/40 dark:to-black border-blue-100 dark:border-blue-500/20",
        "bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/40 dark:to-black border-emerald-100 dark:border-emerald-500/20",
    ];
    const themeClass = gradients[index % gradients.length];

    // Progress Calculation
    const progressPercent = deck.count > 0 ? Math.round(((progress || 0) / deck.count) * 100) : 0;

    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={`w-full text-left relative overflow-hidden rounded-[24px] border p-5 ${themeClass} backdrop-blur-md group`}
        >
            {/* Gloss Effect - Adjusted for light mode */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 shadow-sm dark:shadow-none">
                        {deck.category}
                    </span>
                    {locked ? (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/30 text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-700/50">
                            LOCKED
                        </span>
                    ) : (progressPercent > 0 && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <Zap className="w-3 h-3 fill-current" />
                            {progressPercent}%
                        </div>
                    ))}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight pr-8">
                    {deck.title}
                </h3>

                {locked && (
                    <div className="flex items-center gap-1.5 mb-2">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wide">
                            {course === 'PS_GR_B' ? 'Only for Diamond Members' : 'Only for Gold Members'}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-400">
                        <Layers className="w-3.5 h-3.5" />
                        {deck.count} Cards
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-slate-400 dark:text-white/50 group-hover:bg-indigo-50 dark:group-hover:bg-white group-hover:text-indigo-600 dark:group-hover:text-indigo-900 transition-colors border border-slate-100 dark:border-transparent shadow-sm dark:shadow-none">
                        {locked ? <Lock className="w-3.5 h-3.5 ml-0.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
                    </div>
                </div>

                {/* Mini Progress Bar at Bottom */}
                {progressPercent > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                )}
            </div>
        </motion.button>
    );
}

function MobileCategoryCard({ title, subtitle, icon, theme, onClick, actionText }: any) {
    const styles: any = {
        indigo: { bgIcon: 'bg-indigo-100 dark:bg-indigo-900/30', textIcon: 'text-indigo-600 dark:text-indigo-400', accent: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400' },
        emerald: { bgIcon: 'bg-emerald-100 dark:bg-emerald-900/30', textIcon: 'text-emerald-600 dark:text-emerald-400', accent: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
        amber: { bgIcon: 'bg-amber-100 dark:bg-amber-900/30', textIcon: 'text-amber-600 dark:text-amber-400', accent: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
        rose: { bgIcon: 'bg-rose-100 dark:bg-rose-900/30', textIcon: 'text-rose-600 dark:text-rose-400', accent: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400' }
    };
    const s = styles[theme] || styles.indigo;

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative w-full bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 text-left overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 ${s.accent} rounded-bl-[80px] -mr-6 -mt-6 transition-transform group-hover:scale-110`} />

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl ${s.bgIcon} ${s.textIcon} flex items-center justify-center mb-4`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-5 pr-8 leading-relaxed max-w-[90%]">{subtitle}</p>

                <div className={`flex items-center text-xs font-bold ${s.text} uppercase tracking-wide`}>
                    {actionText} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
            </div>
        </motion.button>
    );
}
