
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
}

export default function FlexibleStudyPlanner({
    schedule,
    completedDays,
    topicMetadata,
    onUpdateStatus,
    onUpdateMetadata
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6 sticky top-24 z-20">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">

                    {/* Filters Left */}
                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                            {['All', 'Paper I', 'Paper III'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setFilterPaper(p)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${filterPaper === p ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <select
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Not Started">Not Started</option>
                        </select>
                        <select
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={filterMastery}
                            onChange={(e) => setFilterMastery(e.target.value)}
                        >
                            <option value="All">All Mastery</option>
                            <option value="Confident">Confident</option>
                            <option value="Weak">Weak / Partial</option>
                            <option value="Unrated">Unrated</option>
                        </select>
                    </div>

                    {/* Search Right */}
                    <div className="relative w-full lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                    <span>Showing {filteredItems.length} topics</span>
                    <span className="italic">Flexible Mode: Dates are ignored. Learn at your own pace.</span>
                </div>
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item, idx) => {
                    const isCompleted = completedDays[item.date];
                    const meta = topicMetadata[item.date] || {};
                    const mastery = meta.mastery;

                    return (
                        <div key={idx} className={`bg-white rounded-xl border p-5 transition-all hover:shadow-md
                            ${isCompleted ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-100'}
                            ${mastery === 'not-confident' ? 'ring-1 ring-red-100' : ''}
                        `}>
                            {/* Header */}
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide
                                    ${item.paper === 'Paper I' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}
                                `}>
                                    {item.paper}
                                </span>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                    <Clock className="w-3 h-3" /> {item.duration}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className={`text-base font-bold text-slate-800 leading-tight mb-1 ${isCompleted ? 'line-through decoration-slate-300 text-slate-500' : ''}`}>
                                {item.subTopic}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mb-4">{item.topic}</p>

                            {/* Controls Divider */}
                            <div className="h-px bg-slate-100 w-full mb-4"></div>

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
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}
                                        `}
                                    >
                                        {isCompleted ? (
                                            <> <CheckCircle2 className="w-3.5 h-3.5" /> Completed </>
                                        ) : (
                                            <> <Circle className="w-3.5 h-3.5" /> Not Started </>
                                        )}
                                    </button>
                                </div>

                                {/* Mastery Selector (Only if Completed ideally, but requirement says User-Editable Fields) */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500">Mastery</span>
                                    <div className="flex bg-slate-100 rounded-lg p-0.5 md:p-1">
                                        <button
                                            title="Confident"
                                            onClick={() => handleMasteryChange(item, 'confident')}
                                            className={`p-1.5 rounded-md transition-all ${mastery === 'confident' ? 'bg-white shadow text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            title="Partially Confident"
                                            onClick={() => handleMasteryChange(item, 'partially-confident')}
                                            className={`p-1.5 rounded-md transition-all ${mastery === 'partially-confident' ? 'bg-white shadow text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
                                        >
                                            <HelpCircle className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            title="Not Confident"
                                            onClick={() => handleMasteryChange(item, 'not-confident')}
                                            className={`p-1.5 rounded-md transition-all ${mastery === 'not-confident' ? 'bg-white shadow text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                                        >
                                            <ThumbsDown className="w-3.5 h-3.5" />
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
                <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium text-sm">No topics found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
