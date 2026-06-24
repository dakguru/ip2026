"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import HomeHeader from '@/components/HomeHeader';
import TopicCompletionDialog from '@/components/TopicCompletionDialog';
import {
    Calendar,
    CheckCircle2,
    BookOpen,
    Award,
    Search,
    Filter,
    Download,
    ChevronRight,
    Target,
    Clock,
    Zap,
    Coffee,
    PieChart,
    ArrowDownCircle,
    Printer,
    ChevronDown,
    ChevronUp,
    Sparkles
} from 'lucide-react';
import { FULL_SCHEDULE } from '@/data/schedule';
import { PSGB_FULL_SCHEDULE, PsgbScheduleItem, FLEX_TO_RECOMMENDED_MAP, RECOMMENDED_TO_FLEX_MAP } from '@/data/psgbSchedule';
import { generatePlannerPDF } from '@/lib/pdf-generator';
import { useIsMobileApp } from '@/hooks/use-mobile-app';
import { useCourse } from '@/contexts/CourseContext';
import AppScreenWrapper from '@/components/AppScreenWrapper';
import NativeStudyPlanner from '@/components/planner/NativeStudyPlanner';
import PlannerDashboard from '@/components/planner/PlannerDashboard';
import FlexibleStudyPlanner from '@/components/planner/FlexibleStudyPlanner';
import PsgbFlexiblePlanner from '@/components/planner/PsgbFlexiblePlanner';
import { LayoutGrid, List } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';

// --- DATA: Full Schedule based on the final optimizations ---
// --- DATA: Full Schedule imported from @/data/schedule ---

// ==========================================================
// PS GROUP B - NATIVE (Mobile App) PLANNER
// ==========================================================
function PsgbNativePlanner() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted ? resolvedTheme === 'dark' : true;

    const [viewMode, setViewMode] = useState<'recommended' | 'flexible'>('flexible');
    const [filterPaper, setFilterPaper] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

    // Recommended schedule progress
    const [completedDays, setCompletedDays] = useState<Record<string, boolean>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('psgb_recommended_progress');
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });

    // Flexible schedule progress (lifted up for bidirectional sync)
    const [flexCompleted, setFlexCompleted] = useState<Record<string, boolean>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('psgb_flexible_progress');
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });
    const [flexMastery, setFlexMastery] = useState<Record<string, { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('psgb_flexible_mastery');
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });

    const [completionDialog, setCompletionDialog] = useState<{ open: boolean; date: string | null; topic: string }>({
        open: false, date: null, topic: ''
    });

    // Sync: when recommended date toggled, update flex topic state
    const syncFlexFromRecommended = (updatedRec: Record<string, boolean>, date: string, isCompleting: boolean) => {
        const topicId = RECOMMENDED_TO_FLEX_MAP[date];
        if (!topicId) return;
        const dates = FLEX_TO_RECOMMENDED_MAP[topicId] || [];
        let updatedFlex = { ...flexCompleted };
        if (isCompleting) {
            // Mark flex topic complete only if ALL its dates are now done
            const allDone = dates.every(d => updatedRec[d]);
            if (allDone) updatedFlex = { ...updatedFlex, [topicId]: true };
        } else {
            // Any date uncompleted → flex topic is no longer fully done
            updatedFlex = { ...updatedFlex, [topicId]: false };
        }
        setFlexCompleted(updatedFlex);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedFlex));
    };

    const toggleDay = (date: string, topic: string) => {
        if (!completedDays[date]) {
            setCompletionDialog({ open: true, date, topic });
        } else {
            const updated = { ...completedDays, [date]: false };
            setCompletedDays(updated);
            localStorage.setItem('psgb_recommended_progress', JSON.stringify(updated));
            syncFlexFromRecommended(updated, date, false);
        }
    };

    const confirmCompletion = () => {
        if (completionDialog.date) {
            const updated = { ...completedDays, [completionDialog.date]: true };
            setCompletedDays(updated);
            localStorage.setItem('psgb_recommended_progress', JSON.stringify(updated));
            syncFlexFromRecommended(updated, completionDialog.date, true);
        }
        setCompletionDialog(prev => ({ ...prev, open: false }));
    };

    // Sync: when flexible topic completed, mark all its recommended dates
    const handleFlexTopicComplete = (topicId: string, mastery: 'confident' | 'partially-confident' | 'not-confident') => {
        const dates = FLEX_TO_RECOMMENDED_MAP[topicId] || [];
        const updatedRec = { ...completedDays };
        dates.forEach(d => { updatedRec[d] = true; });
        setCompletedDays(updatedRec);
        localStorage.setItem('psgb_recommended_progress', JSON.stringify(updatedRec));

        const updatedFlex = { ...flexCompleted, [topicId]: true };
        setFlexCompleted(updatedFlex);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedFlex));

        const updatedMastery = { ...flexMastery, [topicId]: { mastery, completionDate: new Date().toISOString() } };
        setFlexMastery(updatedMastery);
        localStorage.setItem('psgb_flexible_mastery', JSON.stringify(updatedMastery));
    };

    // Sync: when flexible topic marked incomplete, unmark all its recommended dates
    const handleFlexTopicIncomplete = (topicId: string) => {
        const dates = FLEX_TO_RECOMMENDED_MAP[topicId] || [];
        const updatedRec = { ...completedDays };
        dates.forEach(d => { updatedRec[d] = false; });
        setCompletedDays(updatedRec);
        localStorage.setItem('psgb_recommended_progress', JSON.stringify(updatedRec));

        const updatedFlex = { ...flexCompleted, [topicId]: false };
        setFlexCompleted(updatedFlex);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedFlex));

        const updatedMastery = { ...flexMastery };
        delete updatedMastery[topicId];
        setFlexMastery(updatedMastery);
        localStorage.setItem('psgb_flexible_mastery', JSON.stringify(updatedMastery));
    };

    const schedule = PSGB_FULL_SCHEDULE;
    const totalTasks = schedule.filter(i => i.paper !== 'Revision').length;
    const completedTasks = schedule.filter(i => i.paper !== 'Revision' && completedDays[i.date]).length;
    const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

    const filteredSchedule = useMemo(() => {
        return schedule.filter(item => {
            const matchesPaper = filterPaper === 'All' || item.paper === filterPaper || (filterPaper === 'Revision' && item.paper === 'Revision');
            const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subTopic.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPaper && matchesSearch;
        });
    }, [schedule, filterPaper, searchQuery]);

    const groupedSchedule = useMemo(() => {
        const groups: Record<string, PsgbScheduleItem[]> = {};
        filteredSchedule.forEach(item => {
            const [d, m, y] = item.date.split('-');
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            const monthKey = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[monthKey]) groups[monthKey] = [];
            groups[monthKey].push(item);
        });
        return groups;
    }, [filteredSchedule]);

    useEffect(() => {
        if (!expandedMonth && Object.keys(groupedSchedule).length > 0) {
            setExpandedMonth(Object.keys(groupedSchedule)[0]);
        }
    }, [groupedSchedule]);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-800 dark:text-slate-200 font-sans pb-32 transition-colors duration-300">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+12px)] transition-colors duration-300">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Study Planner</h1>
                    <p className="text-xs text-slate-500 font-medium">PS Group B 2026 • 14-Week Plan</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-zinc-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/5">
                    <div className="text-right mr-1">
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Progress</p>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{progress}%</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-slate-200 dark:text-zinc-800 transition-colors" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-emerald-500" strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mode Switcher */}
            <div className="relative z-20 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-white/10 flex gap-2 transition-colors duration-300">
                <button
                    onClick={() => setViewMode('recommended')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${viewMode === 'recommended' ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                >
                    <List className="w-4 h-4" /> Recommended
                </button>
                <button
                    onClick={() => setViewMode('flexible')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${viewMode === 'flexible' ? 'bg-slate-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'}`}
                >
                    <LayoutGrid className="w-4 h-4" /> Flexible
                </button>
            </div>

            {viewMode === 'flexible' ? (
                <div className="px-4 py-4 min-h-[80vh] bg-slate-50 dark:bg-black transition-colors">
                    <PsgbFlexiblePlanner
                        darkMode={isDark}
                        completedTopics={flexCompleted}
                        topicMastery={flexMastery}
                        onTopicComplete={handleFlexTopicComplete}
                        onTopicIncomplete={handleFlexTopicIncomplete}
                    />
                </div>
            ) : (
                <>
                    {/* Paper filter + Search */}
                    <div className="p-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {['All', 'Paper I', 'Paper II'].map(filter => (
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

                    {/* Schedule List */}
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

                                                    let borderClass = "border-l-2 border-l-slate-300 dark:border-l-slate-700";
                                                    if (item.paper === 'Paper I') borderClass = "border-l-2 border-l-blue-500";
                                                    if (item.paper === 'Paper II') borderClass = "border-l-2 border-l-purple-500";
                                                    if (isRevision) borderClass = "border-l-2 border-l-amber-500";

                                                    return (
                                                        <div
                                                            key={idx}
                                                            onClick={() => !isRevision && toggleDay(item.date, item.subTopic)}
                                                            className={`p-4 flex gap-4 active:bg-slate-50 dark:active:bg-white/5 transition-colors ${isDone ? 'opacity-50 grayscale bg-slate-50/50 dark:bg-transparent' : ''}`}
                                                        >
                                                            <div className="flex flex-col items-center min-w-[3rem]">
                                                                <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">{item.day.substring(0, 3)}</span>
                                                                <span className="text-lg font-bold text-slate-700 dark:text-slate-200 leading-none my-0.5">{item.date.split('-')[0]}</span>
                                                                <div className={`h-full w-[1px] bg-slate-200 dark:bg-white/10 mt-2 ${idx === items.length - 1 ? 'hidden' : ''}`} />
                                                            </div>
                                                            <div className={`flex-1 pl-4 ${borderClass}`}>
                                                                <div className="flex justify-between items-start mb-1">
                                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${item.paper === 'Paper I' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                                                        item.paper === 'Paper II' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' :
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
                                                                <p className="text-xs text-slate-500 line-clamp-2">{item.topic} {item.week && <span className="text-[10px] font-medium text-slate-400">• {item.week}</span>}</p>
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
                </>
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

// ==========================================================
// PS GROUP B - WEB PLANNER
// ==========================================================
function PsgbWebPlanner() {
    const [viewMode, setViewMode] = useState<'recommended' | 'flexible'>('flexible');
    const [activeTab, setActiveTab] = useState('planner');
    const [filterPaper, setFilterPaper] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

    // Recommended schedule progress
    const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
    const [completionDialog, setCompletionDialog] = useState<{ open: boolean; date: string | null; topic: string }>({
        open: false, date: null, topic: ''
    });

    // Flexible schedule progress (lifted up for bidirectional sync)
    const [flexCompleted, setFlexCompleted] = useState<Record<string, boolean>>({});
    const [flexMastery, setFlexMastery] = useState<Record<string, { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }>>({});

    useEffect(() => {
        const saved = localStorage.getItem('psgb_recommended_progress');
        if (saved) setCompletedDays(JSON.parse(saved));
        const savedFlex = localStorage.getItem('psgb_flexible_progress');
        if (savedFlex) setFlexCompleted(JSON.parse(savedFlex));
        const savedMastery = localStorage.getItem('psgb_flexible_mastery');
        if (savedMastery) setFlexMastery(JSON.parse(savedMastery));
    }, []);

    const schedule = PSGB_FULL_SCHEDULE;
    const totalTasks = schedule.filter(i => i.paper !== 'Revision').length;
    const completedTasks = schedule.filter(i => i.paper !== 'Revision' && completedDays[i.date]).length;
    const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

    // Sync: when recommended date toggled, update flex topic state
    const syncFlexFromRecommended = (updatedRec: Record<string, boolean>, date: string, isCompleting: boolean) => {
        const topicId = RECOMMENDED_TO_FLEX_MAP[date];
        if (!topicId) return;
        const dates = FLEX_TO_RECOMMENDED_MAP[topicId] || [];
        const updatedFlex = { ...flexCompleted };
        if (isCompleting) {
            const allDone = dates.every(d => updatedRec[d]);
            if (allDone) updatedFlex[topicId] = true;
        } else {
            updatedFlex[topicId] = false;
        }
        setFlexCompleted(updatedFlex);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedFlex));
    };

    const toggleDay = (date: string, topic: string) => {
        if (!completedDays[date]) {
            setCompletionDialog({ open: true, date, topic });
        } else {
            const updated = { ...completedDays, [date]: false };
            setCompletedDays(updated);
            localStorage.setItem('psgb_recommended_progress', JSON.stringify(updated));
            syncFlexFromRecommended(updated, date, false);
        }
    };

    const confirmCompletion = () => {
        if (completionDialog.date) {
            const updated = { ...completedDays, [completionDialog.date]: true };
            setCompletedDays(updated);
            localStorage.setItem('psgb_recommended_progress', JSON.stringify(updated));
            syncFlexFromRecommended(updated, completionDialog.date, true);
        }
        setCompletionDialog(prev => ({ ...prev, open: false }));
    };

    // Sync: when flexible topic completed, mark all its recommended dates
    const handleFlexTopicComplete = (topicId: string, mastery: 'confident' | 'partially-confident' | 'not-confident') => {
        const dates = FLEX_TO_RECOMMENDED_MAP[topicId] || [];
        const updatedRec = { ...completedDays };
        dates.forEach(d => { updatedRec[d] = true; });
        setCompletedDays(updatedRec);
        localStorage.setItem('psgb_recommended_progress', JSON.stringify(updatedRec));

        const updatedFlex = { ...flexCompleted, [topicId]: true };
        setFlexCompleted(updatedFlex);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedFlex));

        const updatedMastery = { ...flexMastery, [topicId]: { mastery, completionDate: new Date().toISOString() } };
        setFlexMastery(updatedMastery);
        localStorage.setItem('psgb_flexible_mastery', JSON.stringify(updatedMastery));
    };

    // Sync: when flexible topic marked incomplete, unmark all its recommended dates
    const handleFlexTopicIncomplete = (topicId: string) => {
        const dates = FLEX_TO_RECOMMENDED_MAP[topicId] || [];
        const updatedRec = { ...completedDays };
        dates.forEach(d => { updatedRec[d] = false; });
        setCompletedDays(updatedRec);
        localStorage.setItem('psgb_recommended_progress', JSON.stringify(updatedRec));

        const updatedFlex = { ...flexCompleted, [topicId]: false };
        setFlexCompleted(updatedFlex);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedFlex));

        const updatedMastery = { ...flexMastery };
        delete updatedMastery[topicId];
        setFlexMastery(updatedMastery);
        localStorage.setItem('psgb_flexible_mastery', JSON.stringify(updatedMastery));
    };

    const filteredSchedule = useMemo(() => {
        return schedule.filter(item => {
            const matchesPaper = filterPaper === 'All' || item.paper === filterPaper || (filterPaper === 'Revision' && item.paper === 'Revision');
            const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subTopic.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPaper && matchesSearch;
        });
    }, [schedule, filterPaper, searchQuery]);

    const groupedSchedule = useMemo(() => {
        const groups: Record<string, PsgbScheduleItem[]> = {};
        filteredSchedule.forEach(item => {
            const [d, m, y] = item.date.split('-');
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            const monthKey = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[monthKey]) groups[monthKey] = [];
            groups[monthKey].push(item);
        });
        return groups;
    }, [filteredSchedule]);

    useEffect(() => {
        if (Object.keys(openMonths).length === 0 && Object.keys(groupedSchedule).length > 0) {
            const initial: Record<string, boolean> = {};
            Object.keys(groupedSchedule).forEach(k => initial[k] = true);
            setOpenMonths(initial);
        }
    }, [groupedSchedule]);

    const toggleMonth = (month: string) => {
        setOpenMonths(prev => ({ ...prev, [month]: !prev[month] }));
    };

    // Stats for dashboard
    const today = new Date();
    const startDate = new Date(2026, 2, 30); // Mar 30, 2026
    const daysElapsed = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const totalDuration = 112; // 16 weeks

    const scrollToToday = () => {
        const firstUncompleted = filteredSchedule.find(item => !completedDays[item.date] && item.paper !== 'Revision');
        if (firstUncompleted) {
            const id = `psgb-date-${firstUncompleted.date}`;
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-slate-800 dark:text-slate-200 print:bg-white transition-colors">
            <HomeHeader isLoggedIn={true} membershipLevel="silver" />

            {/* Hero */}
            <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white pb-24 pt-16 px-6 print:hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-800/50 rounded-full border border-violet-500/30 mb-6 backdrop-blur-sm">
                        <Target className="w-4 h-4 text-violet-300" />
                        <span className="text-sm font-medium text-violet-100 tracking-wide">14-WEEK INTENSIVE PLAN</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        <span className="text-red-500">Mission</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">&quot;PS Gr B 2026&quot;</span> 🎯
                    </h1>
                    <p className="text-xl text-violet-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your comprehensive, day-by-day strategic roadmap to crack the PS Group B Exam through self-study.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => {
                                setActiveTab('planner');
                                document.getElementById('psgb-main-content')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 ${activeTab === 'planner'
                                ? 'bg-white text-violet-900'
                                : 'bg-violet-600 hover:bg-violet-500 text-white'
                                }`}
                        >
                            <Calendar className="w-5 h-5" /> Start Studying
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('overview');
                                document.getElementById('psgb-main-content')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-2 ${activeTab === 'overview'
                                ? 'bg-white text-violet-900 border-white'
                                : 'border-white/30 hover:bg-white/10 text-white'
                                }`}
                        >
                            <BookOpen className="w-5 h-5" /> View Strategy
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 print:hidden">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center border border-slate-100 dark:border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">98 Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Start Date</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">Mar 30, 2026</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Goal</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">2-3 Hours</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-zinc-800 rounded-xl p-4 border border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Your Progress</span>
                            <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2.5">
                            <div className="bg-violet-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div id="psgb-main-content" className="max-w-7xl mx-auto px-6 py-12 print:px-0 print:py-0 scroll-mt-24">

                {activeTab === 'overview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-white/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-10 bg-violet-600 rounded-full"></div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Strategic Roadmap</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                        <PieChart className="w-5 h-5 text-violet-500" /> Plan Overview
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Success in PS Group B LDCE requires a disciplined approach. This <strong>14-Week / 98-Day Intensive Schedule</strong> is designed specifically for working aspirants. By dedicating 2-3 hours daily, you will complete the entire Paper I &amp; Paper II syllabus by July 2026, leaving sufficient time for revision and mock tests.
                                    </p>
                                    <div className="bg-violet-50 dark:bg-violet-500/5 p-6 rounded-2xl border border-violet-100 dark:border-violet-500/20">
                                        <h4 className="font-bold text-violet-900 dark:text-violet-300 mb-3">Key Features</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                                                <span className="text-violet-800 dark:text-violet-200 text-sm"><strong>Weeks 1–7:</strong> Paper I topics – Acts, Manuals, Savings, PLI, Office Procedures.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                                                <span className="text-violet-800 dark:text-violet-200 text-sm"><strong>Weeks 8–14:</strong> Paper II topics – CCS Rules, FR&amp;SR, FHB, Law Paper.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                                                <span className="text-violet-800 dark:text-violet-200 text-sm"><strong>Sunday Reset:</strong> Dedicated entirely to revising the week&apos;s topics and mock tests.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-amber-500" /> Execution Strategy
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200 dark:text-zinc-700">01</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100">The Daily Routine</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Hour 1: Read Bare Acts/Manuals. Hour 2: Make Notes. Hour 3: MCQs.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200 dark:text-zinc-700">02</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100">The Weekly Consolidation</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Use Sundays to revise short notes &amp; attempt weekly mock tests.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200 dark:text-zinc-700">03</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100">The Post-July Advantage</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Finish syllabus by July. Use remaining months exclusively for Mock Tests and Past Papers.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={() => setActiveTab('planner')}
                                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold shadow-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-2"
                                >
                                    View Full Schedule <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'planner' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Dashboard */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 md:p-8 shadow-sm border border-slate-100 dark:border-white/10 mb-6 md:mb-8 print:hidden">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <Target className="w-6 h-6 text-violet-600" /> Progress Dashboard
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-5 border border-slate-100 dark:border-white/5">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Syllabus Coverage</p>
                                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">{progress}%</h3>
                                    <div className="mt-4 w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-1.5">
                                        <div className="bg-violet-600 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">{completedTasks} / {totalTasks} Topics Completed</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-5 border border-slate-100 dark:border-white/5">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Paper I</p>
                                    <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                                        {schedule.filter(i => i.paper === 'Paper I' && completedDays[i.date]).length}
                                        <span className="text-sm font-medium text-slate-400"> / {schedule.filter(i => i.paper === 'Paper I').length}</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-2">Acts, Rules & General Knowledge</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-5 border border-slate-100 dark:border-white/5">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Paper II</p>
                                    <h3 className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                                        {schedule.filter(i => i.paper === 'Paper II' && completedDays[i.date]).length}
                                        <span className="text-sm font-medium text-slate-400"> / {schedule.filter(i => i.paper === 'Paper II').length}</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-2">Rules & Regulations</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-5 border border-slate-100 dark:border-white/5">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time Horizon</p>
                                    <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                                        <Clock className="w-5 h-5 text-indigo-500" /> Day {Math.max(0, daysElapsed)}
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                                            <span>Remaining</span>
                                            <span className="font-bold">{Math.max(0, totalDuration - daysElapsed)} Days</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-1.5">
                                            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (daysElapsed / totalDuration) * 100)}%` }} />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 text-right">Target: Jul 2026</p>
                                </div>
                            </div>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex justify-center mb-8 print:hidden">
                            <div className="bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl flex gap-1 shadow-inner">
                                <button
                                    onClick={() => setViewMode('recommended')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'recommended' ? 'bg-white dark:bg-zinc-700 shadow text-violet-700 dark:text-violet-300' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                                >
                                    <List className="w-4 h-4" /> Dak Guru Recommended Schedule
                                </button>
                                <button
                                    onClick={() => setViewMode('flexible')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'flexible' ? 'bg-white dark:bg-zinc-700 shadow text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" /> Flexible Completion Schedule
                                </button>
                            </div>
                        </div>

                        {viewMode === 'flexible' ? (
                            <PsgbFlexiblePlanner
                                completedTopics={flexCompleted}
                                topicMastery={flexMastery}
                                onTopicComplete={handleFlexTopicComplete}
                                onTopicIncomplete={handleFlexTopicIncomplete}
                            />
                        ) : (
                            <>
                                {/* Controls */}
                                <div className="sticky top-0 z-30 bg-slate-50/95 dark:bg-zinc-950/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-slate-200 dark:border-white/10 mb-8 transition-all print:hidden">
                                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm">
                                            {['All', 'Paper I', 'Paper II'].map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => setFilterPaper(p)}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterPaper === p
                                                        ? (p === 'Paper I' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                                                            p === 'Paper II' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' :
                                                                'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white')
                                                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <div className="relative w-full md:w-auto flex-1">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Search topics..."
                                                    className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                            <button
                                                onClick={scrollToToday}
                                                className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 hover:text-violet-600 transition-colors shadow-sm"
                                                title="Jump to Next Task"
                                            >
                                                <ArrowDownCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-8">
                                    {Object.entries(groupedSchedule).map(([month, items]) => (
                                        <div key={month} className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-white/10 overflow-hidden shadow-sm">
                                            <button
                                                onClick={() => toggleMonth(month)}
                                                className="w-full flex items-center justify-between p-6 bg-slate-50/50 dark:bg-zinc-800/50 hover:bg-slate-100/50 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-b border-slate-100 dark:border-white/5"
                                            >
                                                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                                                    {month}
                                                    <span className="text-sm font-normal text-slate-400 ml-2">({items.length} tasks)</span>
                                                </h3>
                                                {openMonths[month] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                            </button>

                                            <div className={`transition-all duration-300 ${openMonths[month] ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                                <div className="p-4 grid gap-4">
                                                    {items.map((item, index) => {
                                                        const isCompleted = completedDays[item.date];
                                                        const isRevision = item.paper === 'Revision';

                                                        return (
                                                            <div
                                                                key={index}
                                                                id={`psgb-date-${item.date}`}
                                                                onClick={() => !isRevision && toggleDay(item.date, item.subTopic)}
                                                                className={`group relative rounded-xl p-4 border transition-all cursor-pointer
                                                                    ${isRevision
                                                                        ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20'
                                                                        : isCompleted
                                                                            ? 'bg-emerald-50/30 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20 opacity-60'
                                                                            : 'bg-white dark:bg-zinc-800 border-slate-100 dark:border-white/5 hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-md hover:translate-x-1'}
                                                                `}
                                                            >
                                                                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                                                    <div className="flex items-center gap-4 min-w-[150px]">
                                                                        <div className={`p-2 rounded-lg text-center min-w-[50px] ${isRevision ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' : 'bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-slate-300'}`}>
                                                                            <div className="text-xs font-bold uppercase">{item.day.substring(0, 3)}</div>
                                                                            <div className="text-lg font-bold">{item.date.split('-')[0]}</div>
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-xs text-slate-400 font-medium">{item.date.substring(3)}</span>
                                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mt-1 tracking-wider uppercase
                                                                                ${item.paper === 'Paper I' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                                                                                    item.paper === 'Paper II' ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' :
                                                                                        'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'}
                                                                            `}>
                                                                                {item.paper}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex-1">
                                                                        <h4 className={`text-base font-bold ${isCompleted ? 'text-slate-500 line-through decoration-slate-400' : 'text-blue-950 dark:text-white'}`}>
                                                                            {item.subTopic}
                                                                        </h4>
                                                                        <p className={`text-sm mt-0.5 ${isCompleted ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                                                            {item.topic} <span className="text-[10px] text-slate-400">• {item.week}</span>
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex items-center gap-4 min-w-[120px] justify-between md:justify-end w-full md:w-auto mt-2 md:mt-0">
                                                                        {!isRevision && (
                                                                            <span className="text-xs font-semibold text-slate-400 bg-slate-50 dark:bg-zinc-700 px-2 py-1 rounded border border-slate-100 dark:border-white/5">
                                                                                {item.duration}
                                                                            </span>
                                                                        )}
                                                                        {!isRevision && (
                                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                                                                ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' : 'bg-slate-100 dark:bg-zinc-700 text-slate-300 dark:text-slate-500 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/10 group-hover:text-violet-500'}
                                                                            `}>
                                                                                <CheckCircle2 className="w-5 h-5" />
                                                                            </div>
                                                                        )}
                                                                        {isRevision && (
                                                                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-500/10 px-3 py-1 rounded-full text-xs font-bold border border-amber-100 dark:border-amber-500/20">
                                                                                <Coffee className="w-3 h-3" /> Weekly Break
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {filteredSchedule.length === 0 && (
                            <div className="text-center py-20">
                                <Search className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-400 font-medium">No topics found matching your filters.</p>
                            </div>
                        )}

                        <div className="h-20"></div>

                        <TopicCompletionDialog
                            open={completionDialog.open}
                            onOpenChange={(open) => setCompletionDialog(prev => ({ ...prev, open }))}
                            onMarkComplete={confirmCompletion}
                            topicName={completionDialog.topic}
                        />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 print:hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="mb-4">Designed for the 2026 LDCE PS Group B Examination.</p>
                    <p className="max-w-4xl mx-auto text-sm font-bold italic opacity-80 mt-6 leading-relaxed">
                        Disclaimer: This schedule covers the theoretical syllabus for Paper I and Paper II based on standard notifications. Aspirants are advised to practice Noting and Drafting alongside this schedule. Current Affairs topics (15 questions for 30 marks) should be prepared continuously. Best Wishes..!!!
                    </p>
                </div>
            </div>
        </div>
    );
}

// ==========================================================
// LDCE IP - MAIN STUDY PLANNER
// ==========================================================
export default function StudyPlanner() {
    const [schedule, setSchedule] = useState(FULL_SCHEDULE);
    const [filterPaper, setFilterPaper] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
    const [activeTab, setActiveTab] = useState('overview');
    const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});
    const [completionDialog, setCompletionDialog] = useState<{ open: boolean; date: string | null; topic: string }>({
        open: false,
        date: null,
        topic: ''
    });

    // Flexible Mode State
    const [viewMode, setViewMode] = useState<'recommended' | 'flexible'>('flexible');
    const [topicMetadata, setTopicMetadata] = useState<Record<string, { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }>>({});

    const isMobileApp = useIsMobileApp();
    const { course } = useCourse();
    const [userName, setUserName] = useState<string | null>(null);

    // Get username for native view
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
            if (match) {
                try {
                    const session = JSON.parse(decodeURIComponent(match[2]));
                    setUserName(session.name);
                } catch (e) { }
            }
        }
    }, []);

    const todayRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);

    // Initialize open months to have only the first one open by default, or current
    useEffect(() => {
        // Find current month key e.g., "Jan 2026"
        const now = new Date();
        // Just for demo, assuming 2026 date if real date is before start
        // Set all to open initially for search visibility
        const allMonths = {};
        // Group logic needs to be consistent
    }, []);

    // Load progress from local storage
    useEffect(() => {
        const saved = localStorage.getItem('ldce2026_progress');
        if (saved) {
            setCompletedDays(JSON.parse(saved));
        }

    }, []);

    // Load metadata
    useEffect(() => {
        const savedMeta = localStorage.getItem('ldce2026_metadata');
        if (savedMeta) {
            setTopicMetadata(JSON.parse(savedMeta));
        }
    }, []);





    // Scroll to today logic
    const scrollToToday = () => {
        // In real app, match current date. For demo, finding first uncompleted.
        // Assuming today is 14-01-2026 as per user metadata or similar? 
        // We'll just scroll to the first unfinished item for utility
        if (todayRef.current) {
            todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // Find first uncompleted and scroll there
            const firstUncompleted = filteredSchedule.find(item => !completedDays[item.date] && item.paper !== 'Revision');
            if (firstUncompleted) {
                const id = `date-${firstUncompleted.date}`;
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };



    // Save progress
    const toggleDay = (date: string, topicName: string = '') => {
        const isCurrentlyCompleted = completedDays[date];

        if (!isCurrentlyCompleted) {
            // If marking as complete, show dialog
            setCompletionDialog({
                open: true,
                date: date,
                topic: topicName
            });
        } else {
            // If unmarking, just do it
            const updated = { ...completedDays, [date]: false };
            setCompletedDays(updated);
            localStorage.setItem('ldce2026_progress', JSON.stringify(updated));
        }
    };



    const confirmCompletion = () => {
        if (completionDialog.date) {
            const updated = { ...completedDays, [completionDialog.date]: true };
            const meta = topicMetadata[completionDialog.date] || {};

            // Auto-set completion date if not flexible mode (or just update metadata anyway)
            if (!meta.completionDate) {
                const newMeta = { ...meta, completionDate: new Date().toISOString() };
                updateMetadataByDate(completionDialog.date, newMeta);
            }

            setCompletedDays(updated);
            localStorage.setItem('ldce2026_progress', JSON.stringify(updated));
        }
        setCompletionDialog(prev => ({ ...prev, open: false }));
    };

    const updateMetadataByDate = (date: string, meta: any) => {
        const updated = { ...topicMetadata, [date]: meta };
        setTopicMetadata(updated);
        localStorage.setItem('ldce2026_metadata', JSON.stringify(updated));
    };

    const handleFlexibleStatusUpdate = (item: any, isCompleted: boolean) => {
        const updated = { ...completedDays, [item.date]: isCompleted };
        setCompletedDays(updated);
        localStorage.setItem('ldce2026_progress', JSON.stringify(updated));
    };

    const handleFlexibleMetadataUpdate = (item: any, meta: any) => {
        updateMetadataByDate(item.date, meta);
    };

    // Filter Logic
    const filteredSchedule = useMemo(() => {
        return schedule.filter(item => {
            const matchesPaper = filterPaper === 'All' || item.paper === filterPaper || (filterPaper === 'Revision' && item.paper === 'Revision');
            const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subTopic.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPaper && matchesSearch;
        });
    }, [schedule, filterPaper, searchQuery]);

    // Grouping by Month
    const groupedSchedule = useMemo(() => {
        const groups: Record<string, typeof filteredSchedule> = {};
        filteredSchedule.forEach(item => {
            // Parse date "14-01-2026"
            const [d, m, y] = item.date.split('-');
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            const monthKey = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[monthKey]) groups[monthKey] = [];
            groups[monthKey].push(item);
        });
        return groups;
    }, [filteredSchedule]);

    // Auto-open current month / first month
    useEffect(() => {
        if (Object.keys(openMonths).length === 0 && Object.keys(groupedSchedule).length > 0) {
            const keys = Object.keys(groupedSchedule);
            // Default open all for better search UX, or just first
            const initial: Record<string, boolean> = {};
            keys.forEach(k => initial[k] = true);
            setOpenMonths(initial);
        }
    }, [groupedSchedule]);

    const toggleMonth = (month: string) => {
        setOpenMonths(prev => ({ ...prev, [month]: !prev[month] }));
    };

    // Statistics
    const totalTasks = schedule.filter(i => i.paper !== 'Revision' && i.paper !== 'End').length;
    const completedTasks = schedule.filter(i => i.paper !== 'Revision' && i.paper !== 'End' && completedDays[i.date]).length;
    const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

    const handlePrint = () => {
        generatePlannerPDF(schedule, progress);
    };

    if (isMobileApp) {
        if (course === 'PS_GR_B') {
            return (
                <PsgbNativePlanner />
            );
        }

        return (
            <NativeStudyPlanner
                schedule={schedule}
                completedDays={completedDays}
                toggleDay={toggleDay}
                progress={progress}
                userName={userName}
                topicMetadata={topicMetadata}
                onUpdateStatus={handleFlexibleStatusUpdate}
                onUpdateMetadata={handleFlexibleMetadataUpdate}
            />
        );
    }

    if (course === 'PS_GR_B') {
        return <PsgbWebPlanner />;
    }

    return (
        <div ref={topRef} className="min-h-screen bg-slate-50 font-sans text-slate-800 print:bg-white">
            <HomeHeader isLoggedIn={true} membershipLevel="silver" />

            {/* --- HERO SECTION (Hidden in Print) --- */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white pb-24 pt-16 px-6 print:hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800/50 rounded-full border border-blue-500/30 mb-6 backdrop-blur-sm">
                        <Target className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-medium text-blue-100 tracking-wide">TARGET: SEPTEMBER 2026</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        <span className="text-red-500">Mission</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">"IP 2026"</span> 🎯
                    </h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your comprehensive, day-by-day strategic roadmap to crack the Inspector Posts Exam through self-study.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => {
                                setActiveTab('planner');
                                document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 ${activeTab === 'planner'
                                ? 'bg-white text-blue-900'
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }`}
                        >
                            <Calendar className="w-5 h-5" /> Start Studying
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('overview');
                                document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-2 ${activeTab === 'overview'
                                ? 'bg-white text-blue-900 border-white'
                                : 'border-white/30 hover:bg-white/10 text-white'
                                }`}
                        >
                            <BookOpen className="w-5 h-5" /> View Strategy
                        </button>
                    </div>
                </div>
            </div>

            {/* --- STATS BAR --- */}
            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 print:hidden">
                <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
                            <p className="text-xl font-bold text-slate-900">128 Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Start Date</p>
                            <p className="text-xl font-bold text-slate-900">Jan 14, 2026</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Goal</p>
                            <p className="text-xl font-bold text-slate-900">2-3 Hours</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-600">Your Progress</span>
                            <span className="text-sm font-bold text-blue-600">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div id="main-content" className="max-w-7xl mx-auto px-6 py-12 print:px-0 print:py-0 scroll-mt-24">

                {activeTab === 'overview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
                                <h2 className="text-3xl font-bold text-slate-900">Strategic Roadmap</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <PieChart className="w-5 h-5 text-blue-500" /> Plan Overview
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Success in LDCE IP requires a disciplined approach. This <strong>128-Day Intensive Schedule</strong> is designed specifically for working aspirants. By dedicating 2-3 hours daily, you will complete the entire Paper I & III syllabus by May 2026, leaving 4 solid months for revision and mock tests before the September exam.
                                    </p>

                                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                        <h4 className="font-bold text-blue-900 mb-3">Key Features</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                <span className="text-blue-800 text-sm"><strong>Smart Allocation:</strong> 2 days for vast manuals (Vol V, FHB), 1 day for specific Acts.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                <span className="text-blue-800 text-sm"><strong>Consolidated Learning:</strong> Related topics like Philately and BNSS are grouped for efficiency.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                <span className="text-blue-800 text-sm"><strong>Sunday Reset:</strong> Dedicated entirely to revising the week's topics. No new study.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-amber-500" /> Execution Strategy
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200">01</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">The Daily Routine</h4>
                                                <p className="text-sm text-slate-600 mt-1">Hour 1: Read Bare Acts/Manuals. Hour 2: Make Notes. Hour 3: MCQs.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200">02</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">The Weekly Consolidations</h4>
                                                <p className="text-sm text-slate-600 mt-1">Use Sundays to recite short notes. Catch up on any missed topics.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200">03</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">The Post-May Advantage</h4>
                                                <p className="text-sm text-slate-600 mt-1">Finish syllabus by May. Use June-September exclusively for Mock Tests and Past Papers.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={() => setActiveTab('planner')}
                                    className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                                >
                                    View Full Schedule <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'planner' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* --- NEW DASHBOARD --- */}
                        <div className="mb-8 print:hidden">
                            <PlannerDashboard
                                schedule={schedule}
                                completedDays={completedDays}
                                topicMetadata={topicMetadata}
                                totalDuration={128}
                                startDate={new Date(2026, 0, 14)} // Jan 14, 2026
                            />
                        </div>

                        {/* --- MODE SWITCHER --- */}
                        <div className="flex justify-center mb-8 print:hidden">
                            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 shadow-inner">
                                <button
                                    onClick={() => setViewMode('recommended')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'recommended' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    <List className="w-4 h-4" /> Dak Guru Recommended Schedule
                                </button>
                                <button
                                    onClick={() => setViewMode('flexible')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'flexible' ? 'bg-white shadow text-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" /> Flexible Completion Schedule
                                </button>
                            </div>
                        </div>

                        {viewMode === 'flexible' ? (
                            <FlexibleStudyPlanner
                                schedule={schedule}
                                completedDays={completedDays}
                                topicMetadata={topicMetadata}
                                onUpdateStatus={handleFlexibleStatusUpdate}
                                onUpdateMetadata={handleFlexibleMetadataUpdate}
                            />
                        ) : (
                            <>
                                {/* --- CONTROLS SECTION (Sticky) --- */}
                                <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-slate-200 mb-8 transition-all print:hidden">
                                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                                            <button
                                                onClick={() => setFilterPaper('All')}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterPaper === 'All' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                                            >
                                                All
                                            </button>
                                            <button
                                                onClick={() => setFilterPaper('Paper I')}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterPaper === 'Paper I' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
                                            >
                                                Paper I
                                            </button>
                                            <button
                                                onClick={() => setFilterPaper('Paper III')}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterPaper === 'Paper III' ? 'bg-red-50 text-red-700' : 'text-slate-500 hover:text-slate-900'}`}
                                            >
                                                Paper III
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <div className="relative w-full md:w-auto flex-1">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Search topics..."
                                                    className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                            <button
                                                onClick={scrollToToday}
                                                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm tooltip"
                                                title="Jump to Today's Task"
                                            >
                                                <ArrowDownCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handlePrint}
                                                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                                                title="Print Schedule"
                                            >
                                                <Printer className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* --- TIMELINE (Grouped) --- */}
                                <div className="space-y-8">
                                    {Object.entries(groupedSchedule).map(([month, items]) => (
                                        <div key={month} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                                            {/* Month Header */}
                                            <button
                                                onClick={() => toggleMonth(month)}
                                                className="w-full flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer border-b border-slate-100"
                                            >
                                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    {month}
                                                    <span className="text-sm font-normal text-slate-400 ml-2">({items.length} tasks)</span>
                                                </h3>
                                                {openMonths[month] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                            </button>

                                            {/* Month Items (Collapsible) */}
                                            <div className={`transition-all duration-300 ${openMonths[month] ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                                <div className="p-4 grid gap-4">
                                                    {items.map((item, index) => {
                                                        const isCompleted = completedDays[item.date];
                                                        const isRevision = item.paper === 'Revision';

                                                        return (
                                                            <div
                                                                key={index}
                                                                id={`date-${item.date}`}
                                                                onClick={() => !isRevision && toggleDay(item.date, item.subTopic)}
                                                                className={`group relative rounded-xl p-4 border transition-all cursor-pointer
                                                            ${isRevision
                                                                        ? 'bg-amber-50/50 border-amber-100'
                                                                        : isCompleted
                                                                            ? 'bg-emerald-50/30 border-emerald-100 opacity-60'
                                                                            : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-md hover:translate-x-1'}
                                                        `}
                                                            >
                                                                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                                                    {/* Date & Tag */}
                                                                    <div className="flex items-center gap-4 min-w-[150px]">
                                                                        <div className={`p-2 rounded-lg text-center min-w-[50px] ${isRevision ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                                                            <div className="text-xs font-bold uppercase">{item.day.substring(0, 3)}</div>
                                                                            <div className="text-lg font-bold">{item.date.split('-')[0]}</div>
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-xs text-slate-400 font-medium">{item.date.substring(3)}</span>
                                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mt-1 tracking-wider uppercase
                                                                        ${item.paper === 'Paper I' ? 'bg-blue-100 text-blue-700' :
                                                                                    item.paper === 'Paper III' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}
                                                                    `}>
                                                                                {item.paper}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Content */}
                                                                    <div className="flex-1">
                                                                        <h4 className={`text-base font-bold ${isCompleted ? 'text-slate-500 line-through decoration-slate-400' : 'text-blue-950'}`}>
                                                                            {item.subTopic}
                                                                        </h4>
                                                                        <p className={`text-sm mt-0.5 ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                                                                            {item.topic}
                                                                        </p>
                                                                    </div>

                                                                    {/* Status/Duration */}
                                                                    <div className="flex items-center gap-4 min-w-[120px] justify-between md:justify-end w-full md:w-auto mt-2 md:mt-0">
                                                                        {!isRevision && (
                                                                            <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                                                {item.duration}
                                                                            </span>
                                                                        )}

                                                                        {!isRevision && (
                                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                                                        ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' : 'bg-slate-100 text-slate-300 group-hover:bg-blue-100 group-hover:text-blue-500'}
                                                                    `}>
                                                                                <CheckCircle2 className="w-5 h-5" />
                                                                            </div>
                                                                        )}

                                                                        {isRevision && (
                                                                            <div className="flex items-center gap-2 text-amber-600 bg-amber-100/50 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
                                                                                <Coffee className="w-3 h-3" /> Weekly Break
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Empty State */}
                        {filteredSchedule.length === 0 && (
                            <div className="text-center py-20">
                                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-medium">No topics found matching your filters.</p>
                            </div>
                        )}

                        {/* Bottom Spacer */}
                        <div className="h-20"></div>

                        <TopicCompletionDialog
                            open={completionDialog.open}
                            onOpenChange={(open) => setCompletionDialog(prev => ({ ...prev, open }))}
                            onMarkComplete={confirmCompletion}
                            topicName={completionDialog.topic}
                        />
                    </div>
                )}
            </div>

            {/* --- FOOTER (Hidden in Print) --- */}
            <div className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 print:hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="mb-4">Designed for the 2026 LDCE Inspector Posts Examination.</p>
                    <p className="max-w-4xl mx-auto text-sm font-bold italic opacity-80 mt-6 leading-relaxed">
                        Disclaimer: This schedule covers the theoretical syllabus for Paper I and Paper III based on standard notifications. Aspirants are advised to practice Drafting/Noting/Major Charge Sheet (Paper II) and General knowledge & Current Affairs/Reasoning/Aptitude/English language (Paper III) continuously alongside this schedule, perhaps on weekends. Best Wishes..!!!
                    </p>

                </div>
            </div>
        </div>
    );
}
