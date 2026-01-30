import React, { useState, useMemo, useEffect } from 'react';
import {
    Calendar,
    BookOpen,
    Search,
    ChevronDown,
    ChevronUp,
    CheckCircle2,
    Coffee,
    ArrowDownCircle,
    Filter
} from 'lucide-react';
import { ScheduleItem } from '@/data/schedule';
import TopicCompletionDialog from '@/components/TopicCompletionDialog';
import { motion, AnimatePresence } from 'framer-motion';
import FlexibleStudyPlanner from './FlexibleStudyPlanner';
import { LayoutGrid, List } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NativeStudyPlannerProps {
    schedule: ScheduleItem[];
    completedDays: Record<string, boolean>;
    toggleDay: (date: string, topicName: string) => void;
    progress: number;
    userName: string | null;
    topicMetadata: Record<string, { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }>;
    onUpdateStatus: (item: ScheduleItem, isCompleted: boolean) => void;
    onUpdateMetadata: (item: ScheduleItem, metadata: { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }) => void;
}

export default function NativeStudyPlanner({
    schedule,
    completedDays,
    toggleDay,
    progress,
    userName,
    topicMetadata,
    onUpdateStatus,
    onUpdateMetadata
}: NativeStudyPlannerProps) {
    const { resolvedTheme } = useTheme();
    // Mount check to avoid hydration mismatch with next-themes
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [viewMode, setViewMode] = useState<'recommended' | 'flexible'>('flexible');
    const [filterPaper, setFilterPaper] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [completionDialog, setCompletionDialog] = useState<{ open: boolean; date: string | null; topic: string }>({
        open: false,
        date: null,
        topic: ''
    });

    const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark on server to match initial expectation or prevent flash

    // Determine current month or filtered view
    const filteredSchedule = useMemo(() => {
        return schedule.filter(item => {
            const matchesPaper = filterPaper === 'All' || item.paper === filterPaper;
            const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subTopic.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPaper && matchesSearch;
        });
    }, [schedule, filterPaper, searchQuery]);

    const groupedSchedule = useMemo(() => {
        const groups: Record<string, typeof filteredSchedule> = {};
        filteredSchedule.forEach(item => {
            const [d, m, y] = item.date.split('-');
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            const monthKey = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[monthKey]) groups[monthKey] = [];
            groups[monthKey].push(item);
        });
        return groups;
    }, [filteredSchedule]);

    const [expandedMonth, setExpandedMonth] = useState<string | null>(Object.keys(groupedSchedule)[0] || null);

    const handleToggle = (date: string, topic: string) => {
        if (!completedDays[date]) {
            setCompletionDialog({ open: true, date, topic });
        } else {
            toggleDay(date, topic);
        }
    };

    const confirmCompletion = () => {
        if (completionDialog.date) {
            toggleDay(completionDialog.date, completionDialog.topic);
        }
        setCompletionDialog(prev => ({ ...prev, open: false }));
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-800 dark:text-slate-200 font-sans pb-32 transition-colors duration-300">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+12px)] transition-colors duration-300">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Study Planner</h1>
                    <p className="text-xs text-slate-500 font-medium">Track your journey to IP 2026</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-zinc-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/5">
                    <div className="text-right mr-1">
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Progress</p>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{progress}%</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-slate-200 dark:text-zinc-800 transition-colors"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="text-emerald-500"
                                strokeDasharray={`${progress}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mode Switcher */}
            <div className="relative z-20 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-white/10 flex gap-2 transition-colors duration-300">
                <button
                    onClick={() => setViewMode('recommended')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${viewMode === 'recommended' ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                        }`}
                >
                    <List className="w-4 h-4" /> Recommended
                </button>
                <button
                    onClick={() => setViewMode('flexible')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${viewMode === 'flexible' ? 'bg-slate-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
                        }`}
                >
                    <LayoutGrid className="w-4 h-4" /> Flexible
                </button>
            </div>

            {viewMode === 'flexible' ? (
                <div className="px-4 py-4 min-h-[80vh] bg-slate-50 dark:bg-black transition-colors">
                    <FlexibleStudyPlanner
                        schedule={schedule}
                        completedDays={completedDays}
                        topicMetadata={topicMetadata || {}}
                        onUpdateStatus={onUpdateStatus}
                        onUpdateMetadata={onUpdateMetadata}
                        darkMode={isDark}
                    />
                </div>
            ) : (
                <>
                    {/* Controls */}
                    <div className="p-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {['All', 'Paper I', 'Paper III'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setFilterPaper(filter)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${filterPaper === filter
                                    ? 'bg-blue-50 dark:bg-slate-100 text-blue-700 dark:text-black border-blue-100 dark:border-slate-100'
                                    : 'bg-white dark:bg-zinc-900 text-slate-500 border-slate-200 dark:border-white/10'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="px-4 mb-4">
                        <div className="relative bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-white/5 transition-colors">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <input
                                className="w-full bg-transparent p-3 pl-10 text-sm focus:outline-none text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                placeholder="Search topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Schedule List (Recommended Only) */}
            {viewMode === 'recommended' && (
                <div className="px-4 space-y-4">
                    {Object.entries(groupedSchedule).map(([month, items]) => (
                        <div key={month} className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-colors shadow-sm dark:shadow-none">
                            <button
                                onClick={() => setExpandedMonth(expandedMonth === month ? null : month)}
                                className="w-full p-4 flex items-center justify-between bg-slate-50 dark:bg-zinc-900 border-b border-slate-200 dark:border-white/5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${expandedMonth === month ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-600'}`} />
                                    <span className={`font-bold text-sm ${expandedMonth === month ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{month}</span>
                                    <span className="text-xs bg-slate-200 dark:bg-white/5 px-2 py-0.5 rounded text-slate-600 dark:text-slate-500">{items.length}</span>
                                </div>
                                {expandedMonth === month ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                            </button>

                            <AnimatePresence>
                                {expandedMonth === month && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden bg-white dark:bg-transparent"
                                    >
                                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                                            {items.map((item, idx) => {
                                                const isDone = completedDays[item.date];
                                                const isRevision = item.paper === 'Revision';

                                                // Determine styles
                                                let borderClass = "border-l-2 border-l-slate-300 dark:border-l-slate-700";
                                                if (item.paper === 'Paper I') borderClass = "border-l-2 border-l-blue-500";
                                                if (item.paper === 'Paper III') borderClass = "border-l-2 border-l-red-500";
                                                if (isRevision) borderClass = "border-l-2 border-l-amber-500";

                                                return (
                                                    <div
                                                        key={idx}
                                                        onClick={() => !isRevision && handleToggle(item.date, item.subTopic)}
                                                        className={`p-4 flex gap-4 active:bg-slate-50 dark:active:bg-white/5 transition-colors ${isDone ? 'opacity-50 grayscale bg-slate-50/50 dark:bg-transparent' : ''}`}
                                                    >
                                                        {/* Date Col */}
                                                        <div className="flex flex-col items-center min-w-[3rem]">
                                                            <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">{item.day.substring(0, 3)}</span>
                                                            <span className="text-lg font-bold text-slate-700 dark:text-slate-200 leading-none my-0.5">{item.date.split('-')[0]}</span>
                                                            <div className={`h-full w-[1px] bg-slate-200 dark:bg-white/10 mt-2 ${idx === items.length - 1 ? 'hidden' : ''}`} />
                                                        </div>

                                                        {/* Content Col */}
                                                        <div className={`flex-1 pl-4 ${borderClass}`}>
                                                            <div className="flex justify-between items-start mb-1">
                                                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${item.paper === 'Paper I' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                                                    item.paper === 'Paper III' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' :
                                                                        'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                                    }`}>
                                                                    {item.paper}
                                                                </span>
                                                                {!isRevision && (
                                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent'}`}>
                                                                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white dark:text-black" strokeWidth={3} />}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <h3 className={`text-sm font-semibold mb-0.5 ${isDone ? 'text-slate-400 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                                                                {item.subTopic}
                                                            </h3>
                                                            <p className="text-xs text-slate-500 line-clamp-2">{item.topic}</p>

                                                            {isRevision && (
                                                                <div className="mt-2 flex items-center gap-2 text-amber-600 dark:text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded inline-flex">
                                                                    <Coffee className="w-3 h-3" /> Weekly Break
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            )}

            <TopicCompletionDialog
                open={completionDialog.open}
                onOpenChange={(open) => setCompletionDialog(prev => ({ ...prev, open }))}
                onMarkComplete={confirmCompletion}
                topicName={completionDialog.topic}
            />
        </div>
    );
}
