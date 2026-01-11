
import React, { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    BookOpen,
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    Calendar as CalendarIcon,
    ChevronDown,
    BrainCircuit,
    ThumbsUp,
    ThumbsDown,
    HelpCircle
} from 'lucide-react';
import { ScheduleItem } from '@/data/schedule';
import { format } from 'date-fns';

interface FlexibleStudyPlannerProps {
    schedule: ScheduleItem[];
    completedDays: Record<string, boolean>; // Used for syncing status
    topicMetadata: Record<string, { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }>;
    onUpdateStatus: (item: ScheduleItem, isCompleted: boolean) => void;
    onUpdateMetadata: (item: ScheduleItem, metadata: { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }) => void;
    darkMode?: boolean;
}

export default function FlexibleStudyPlanner({
    schedule,
    completedDays,
    topicMetadata,
    onUpdateStatus,
    onUpdateMetadata,
    darkMode = false
}: FlexibleStudyPlannerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPaper, setFilterPaper] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All'); // All, Completed, In Progress, Not Started
    const [filterMastery, setFilterMastery] = useState('All'); // All, Confident, Weak

    // Filter Logic
    const filteredItems = useMemo(() => {
        return schedule.filter(item => {
            if (item.paper === 'Revision' || item.paper === 'End') return false;

            const isCompleted = completedDays[item.date];
            const meta = topicMetadata[item.date] || {};

            // Paper Filter
            if (filterPaper !== 'All' && item.paper !== filterPaper) return false;

            // Status Filter
            if (filterStatus === 'Completed' && !isCompleted) return false;
            // "In Progress" isn't explicitly tracked in boolean, so we assume "Not Started" vs "Completed" mostly.
            // But if we want to simulate "In Progress", we might look for Partial confidence? 
            // For now, let's stick to Completed vs Not Started as primary boolean state.
            if (filterStatus === 'Not Started' && isCompleted) return false;

            // Mastery Filter
            if (filterMastery !== 'All') {
                if (filterMastery === 'Confident' && meta.mastery !== 'confident') return false;
                if (filterMastery === 'Weak' && meta.mastery !== 'not-confident' && meta.mastery !== 'partially-confident') return false;
                if (filterMastery === 'Unrated' && meta.mastery) return false;
            }

            // Search
            const matchesSearch =
                item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subTopic.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSearch;
        });
    }, [schedule, completedDays, topicMetadata, filterPaper, filterStatus, filterMastery, searchQuery]);

    const handleMasteryChange = (item: ScheduleItem, mastery: 'confident' | 'partially-confident' | 'not-confident') => {
        const currentMeta = topicMetadata[item.date] || {};
        onUpdateMetadata(item, { ...currentMeta, mastery });
    };

    const handleCompletionToggle = (item: ScheduleItem) => {
        const isCompleted = completedDays[item.date];
        const newStatus = !isCompleted;
        onUpdateStatus(item, newStatus);

        // Auto-set date if completing
        if (newStatus && !topicMetadata[item.date]?.completionDate) {
            const currentMeta = topicMetadata[item.date] || {};
            onUpdateMetadata(item, {
                ...currentMeta,
                completionDate: new Date().toISOString()
            });
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Controls */}
            <div className={`${darkMode ? 'bg-zinc-900/90 border-transparent shadow-none' : 'bg-white/95 border-slate-100 shadow-sm'} backdrop-blur-md rounded-2xl border p-4 mb-6 sticky top-16 md:top-24 z-20 transition-all`}>
                <div className="flex flex-col gap-4">

                    {/* Top Row: Search */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 border ${darkMode ? 'bg-black border-white/10 text-slate-200 placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters Row - Horizontal Scrollable */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {/* Paper Filter */}
                        <div className={`flex items-center rounded-lg p-1 border shrink-0 ${darkMode ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                            {['All', 'Paper I', 'Paper III'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setFilterPaper(p)}
                                    className={`whitespace-nowrap px-3 py-2 rounded-md text-xs font-bold transition-all ${filterPaper === p
                                        ? (darkMode ? 'bg-zinc-800 text-white shadow-sm' : 'bg-white shadow-sm text-blue-700')
                                        : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Status Filter */}
                        <div className="shrink-0 relative">
                            <select
                                className={`appearance-none text-xs font-bold rounded-lg pl-3 pr-8 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 h-full border ${darkMode ? 'bg-black border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Not Started">Not Started</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Mastery Filter */}
                        <div className="shrink-0 relative">
                            <select
                                className={`appearance-none text-xs font-bold rounded-lg pl-3 pr-8 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 h-full border ${darkMode ? 'bg-black border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                                value={filterMastery}
                                onChange={(e) => setFilterMastery(e.target.value)}
                            >
                                <option value="All">All Mastery</option>
                                <option value="Confident">Confident</option>
                                <option value="Weak">Weak / Partial</option>
                                <option value="Unrated">Unrated</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className={`mt-4 flex items-center justify-between text-xs border-t pt-3 ${darkMode ? 'text-slate-500 border-white/5' : 'text-slate-400 border-slate-100'}`}>
                    <span>Showing {filteredItems.length} topics</span>
                    <span className="italic">Flexible Mode</span>
                </div>
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item, idx) => {
                    const isCompleted = completedDays[item.date];
                    const meta = topicMetadata[item.date] || {};
                    const mastery = meta.mastery;

                    return (
                        <div key={idx} className={`rounded-xl border p-4 md:p-5 transition-all
                            ${darkMode
                                ? (isCompleted ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-zinc-900 border-white/5')
                                : (isCompleted ? 'border-emerald-100 bg-emerald-50/10' : 'bg-white border-slate-100 hover:shadow-md')
                            }
                            ${mastery === 'not-confident' ? (darkMode ? 'ring-1 ring-red-500/30' : 'ring-1 ring-red-100') : ''}
                        `}>
                            {/* Header */}
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide
                                    ${item.paper === 'Paper I'
                                        ? (darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700')
                                        : (darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700')
                                    }
                                `}>
                                    {item.paper}
                                </span>
                                <div className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${darkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-400'}`}>
                                    <Clock className="w-3 h-3" /> {item.duration}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className={`text-base font-bold leading-tight mb-1 ${isCompleted
                                    ? 'line-through decoration-slate-500 text-slate-500'
                                    : (darkMode ? 'text-slate-100' : 'text-slate-800')
                                }`}>
                                {item.subTopic}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mb-4">{item.topic}</p>

                            {/* Controls Divider */}
                            <div className={`h-px w-full mb-4 ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}></div>

                            {/* Status & Mastery Controls */}
                            <div className="flex flex-col gap-3">

                                {/* Completion Toggle */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500">Status</span>
                                    <button
                                        onClick={() => handleCompletionToggle(item)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                                            ${isCompleted
                                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                                : (darkMode ? 'bg-black border-white/20 text-slate-300' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50')
                                            }
                                        `}
                                    >
                                        {isCompleted ? (
                                            <> <CheckCircle2 className="w-3.5 h-3.5" /> Completed </>
                                        ) : (
                                            <> <Circle className="w-3.5 h-3.5" /> Not Started </>
                                        )}
                                    </button>
                                </div>

                                {/* Mastery Selector */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500">Mastery</span>
                                    <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-black border border-white/10' : 'bg-slate-100'}`}>
                                        <button
                                            title="Confident"
                                            onClick={() => handleMasteryChange(item, 'confident')}
                                            className={`p-2 rounded-md transition-all ${mastery === 'confident'
                                                    ? (darkMode ? 'bg-zinc-800 text-emerald-400' : 'bg-white shadow text-emerald-600')
                                                    : 'text-slate-400 hover:text-emerald-500'
                                                }`}
                                        >
                                            <ThumbsUp className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Partially Confident"
                                            onClick={() => handleMasteryChange(item, 'partially-confident')}
                                            className={`p-2 rounded-md transition-all ${mastery === 'partially-confident'
                                                    ? (darkMode ? 'bg-zinc-800 text-amber-400' : 'bg-white shadow text-amber-500')
                                                    : 'text-slate-400 hover:text-amber-500'
                                                }`}
                                        >
                                            <HelpCircle className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Not Confident"
                                            onClick={() => handleMasteryChange(item, 'not-confident')}
                                            className={`p-2 rounded-md transition-all ${mastery === 'not-confident'
                                                    ? (darkMode ? 'bg-zinc-800 text-red-500' : 'bg-white shadow text-red-500')
                                                    : 'text-slate-400 hover:text-red-500'
                                                }`}
                                        >
                                            <ThumbsDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Completion Date Display if Completed */}
                                {isCompleted && meta.completionDate && (
                                    <div className="text-[10px] text-slate-400 text-right mt-1">
                                        Done on {format(new Date(meta.completionDate), 'MMM d, yyyy')}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {filteredItems.length === 0 && (
                <div className={`text-center py-20 rounded-2xl border-2 border-dashed ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <Search className={`w-10 h-10 mx-auto mb-3 ${darkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                    <p className={`font-medium text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>No topics found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}

