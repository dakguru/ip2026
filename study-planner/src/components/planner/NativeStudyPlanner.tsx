import React, { useState, useMemo } from 'react';
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

interface NativeStudyPlannerProps {
    schedule: ScheduleItem[];
    completedDays: Record<string, boolean>;
    toggleDay: (date: string, topicName: string) => void;
    progress: number;
    userName: string | null;
}

export default function NativeStudyPlanner({
    schedule,
    completedDays,
    toggleDay,
    progress,
    userName
}: NativeStudyPlannerProps) {
    const [filterPaper, setFilterPaper] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [completionDialog, setCompletionDialog] = useState<{ open: boolean; date: string | null; topic: string }>({
        open: false,
        date: null,
        topic: ''
    });

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
        <div className="min-h-screen bg-black text-slate-200 font-sans pb-32">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 h-16 flex items-center justify-between pt-[env(safe-area-inset-top)]">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Dak Guru Study Planner - LDCE IP</span>
                    <h1 className="text-lg font-bold text-slate-100 leading-none">Your Timeline</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Progress</p>
                        <p className="text-sm font-bold text-blue-400">{progress}% Done</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center p-0.5 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-blue-500/30" style={{ clipPath: `inset(0 0 0 ${100 - progress}%)` }} />
                        <span className="text-[10px] font-bold text-blue-400">{Math.round(progress)}</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Paper I', 'Paper III'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setFilterPaper(filter)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${filterPaper === filter
                            ? 'bg-slate-100 text-black border-slate-100'
                            : 'bg-zinc-900 text-slate-400 border-white/10'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="px-4 mb-4">
                <div className="relative bg-zinc-900 rounded-xl border border-white/5">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                        className="w-full bg-transparent p-3 pl-10 text-sm focus:outline-none text-slate-200 placeholder:text-slate-600"
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Schedule List */}
            <div className="px-4 space-y-4">
                {Object.entries(groupedSchedule).map(([month, items]) => (
                    <div key={month} className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
                        <button
                            onClick={() => setExpandedMonth(expandedMonth === month ? null : month)}
                            className="w-full p-4 flex items-center justify-between bg-zinc-900 border-b border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${expandedMonth === month ? 'bg-blue-500' : 'bg-slate-600'}`} />
                                <span className={`font-bold text-sm ${expandedMonth === month ? 'text-white' : 'text-slate-400'}`}>{month}</span>
                                <span className="text-xs bg-white/5 px-2 py-0.5 rounded text-slate-500">{items.length}</span>
                            </div>
                            {expandedMonth === month ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </button>

                        <AnimatePresence>
                            {expandedMonth === month && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="divide-y divide-white/5">
                                        {items.map((item, idx) => {
                                            const isDone = completedDays[item.date];
                                            const isRevision = item.paper === 'Revision';

                                            // Determine styles
                                            let borderClass = "border-l-2 border-l-slate-700";
                                            if (item.paper === 'Paper I') borderClass = "border-l-2 border-l-blue-500";
                                            if (item.paper === 'Paper III') borderClass = "border-l-2 border-l-red-500";
                                            if (isRevision) borderClass = "border-l-2 border-l-amber-500";

                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => !isRevision && handleToggle(item.date, item.subTopic)}
                                                    className={`p-4 flex gap-4 active:bg-white/5 transition-colors ${isDone ? 'opacity-50 grayscale' : ''}`}
                                                >
                                                    {/* Date Col */}
                                                    <div className="flex flex-col items-center min-w-[3rem]">
                                                        <span className="text-[10px] font-bold uppercase text-slate-500">{item.day.substring(0, 3)}</span>
                                                        <span className="text-lg font-bold text-slate-200 leading-none my-0.5">{item.date.split('-')[0]}</span>
                                                        <div className={`h-full w-[1px] bg-white/10 mt-2 ${idx === items.length - 1 ? 'hidden' : ''}`} />
                                                    </div>

                                                    {/* Content Col */}
                                                    <div className={`flex-1 pl-4 ${borderClass}`}>
                                                        <div className="flex justify-between items-start mb-1">
                                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${item.paper === 'Paper I' ? 'bg-blue-500/10 text-blue-400' :
                                                                item.paper === 'Paper III' ? 'bg-red-500/10 text-red-400' :
                                                                    'bg-amber-500/10 text-amber-400'
                                                                }`}>
                                                                {item.paper}
                                                            </span>
                                                            {!isRevision && (
                                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isDone ? 'bg-green-500 border-green-500' : 'border-slate-600'}`}>
                                                                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h3 className={`text-sm font-semibold mb-0.5 ${isDone ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                                                            {item.subTopic}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 line-clamp-2">{item.topic}</p>

                                                        {isRevision && (
                                                            <div className="mt-2 flex items-center gap-2 text-amber-500 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded inline-flex">
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

            <TopicCompletionDialog
                open={completionDialog.open}
                onOpenChange={(open) => setCompletionDialog(prev => ({ ...prev, open }))}
                onMarkComplete={confirmCompletion}
                topicName={completionDialog.topic}
            />
        </div>
    );
}
