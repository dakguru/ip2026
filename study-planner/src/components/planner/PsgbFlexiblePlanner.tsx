
import React, { useState, useMemo } from 'react';
import {
    Search,
    CheckCircle2,
    Circle,
    Clock,
    ChevronDown,
    ThumbsUp,
    ThumbsDown,
    HelpCircle,
    BookOpen,
    Scale,
    Briefcase,
    FileText,
} from 'lucide-react';
import { PsgbFlexibleTopic, PSGB_FLEXIBLE_TOPICS } from '@/data/psgbSchedule';

interface PsgbFlexiblePlannerProps {
    darkMode?: boolean;
}

export default function PsgbFlexiblePlanner({ darkMode = false }: PsgbFlexiblePlannerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPaper, setFilterPaper] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterMastery, setFilterMastery] = useState('All');

    // Completion state keyed by topic id
    const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('psgb_flexible_progress');
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });

    // Mastery state keyed by topic id
    const [topicMastery, setTopicMastery] = useState<Record<string, { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('psgb_flexible_mastery');
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });

    const [masteryDialog, setMasteryDialog] = useState<{ open: boolean; topic: PsgbFlexibleTopic | null }>({
        open: false,
        topic: null,
    });

    const filteredItems = useMemo(() => {
        return PSGB_FLEXIBLE_TOPICS.filter(item => {
            if (filterPaper !== 'All' && item.paper !== filterPaper) return false;

            const isCompleted = completedTopics[item.id];
            if (filterStatus === 'Completed' && !isCompleted) return false;
            if (filterStatus === 'Not Started' && isCompleted) return false;

            const meta = topicMastery[item.id] || {};
            if (filterMastery !== 'All') {
                if (filterMastery === 'Confident' && meta.mastery !== 'confident') return false;
                if (filterMastery === 'Weak' && meta.mastery !== 'not-confident' && meta.mastery !== 'partially-confident') return false;
                if (filterMastery === 'Unrated' && meta.mastery) return false;
            }

            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSearch;
        });
    }, [filterPaper, filterStatus, filterMastery, searchQuery, completedTopics, topicMastery]);

    const handleMasterySelect = (mastery: 'confident' | 'partially-confident' | 'not-confident') => {
        if (!masteryDialog.topic) return;
        const id = masteryDialog.topic.id;

        const updatedCompletion = { ...completedTopics, [id]: true };
        setCompletedTopics(updatedCompletion);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedCompletion));

        const updatedMastery = { ...topicMastery, [id]: { mastery, completionDate: new Date().toISOString() } };
        setTopicMastery(updatedMastery);
        localStorage.setItem('psgb_flexible_mastery', JSON.stringify(updatedMastery));

        setMasteryDialog({ open: false, topic: null });
    };

    const handleMarkIncomplete = () => {
        if (!masteryDialog.topic) return;
        const id = masteryDialog.topic.id;

        const updatedCompletion = { ...completedTopics, [id]: false };
        setCompletedTopics(updatedCompletion);
        localStorage.setItem('psgb_flexible_progress', JSON.stringify(updatedCompletion));

        const updatedMastery = { ...topicMastery };
        delete updatedMastery[id];
        setTopicMastery(updatedMastery);
        localStorage.setItem('psgb_flexible_mastery', JSON.stringify(updatedMastery));

        setMasteryDialog({ open: false, topic: null });
    };

    // Stats
    const totalTopics = PSGB_FLEXIBLE_TOPICS.length;
    const completedCount = PSGB_FLEXIBLE_TOPICS.filter(t => completedTopics[t.id]).length;
    const progress = Math.round((completedCount / totalTopics) * 100) || 0;
    const confidentCount = Object.values(topicMastery).filter(m => m.mastery === 'confident').length;
    const partialCount = Object.values(topicMastery).filter(m => m.mastery === 'partially-confident').length;
    const weakCount = Object.values(topicMastery).filter(m => m.mastery === 'not-confident').length;

    const getCategoryIcon = (category: string) => {
        if (category.includes('Law') || category.includes('Acts')) return <Scale className="w-3 h-3" />;
        if (category.includes('CCS') || category.includes('FR') || category.includes('NPS') || category.includes('Pension')) return <Briefcase className="w-3 h-3" />;
        if (category.includes('FHB') || category.includes('Manual') || category.includes('Postal')) return <BookOpen className="w-3 h-3" />;
        return <FileText className="w-3 h-3" />;
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Mini Stats Bar */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 ${darkMode ? '' : ''}`}>
                <div className={`rounded-2xl p-4 border ${darkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Coverage</p>
                    <p className={`text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{progress}%</p>
                    <div className={`mt-2 w-full h-1.5 rounded-full ${darkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                        <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                </div>
                <div className={`rounded-2xl p-4 border ${darkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Completed</p>
                    <p className={`text-2xl font-extrabold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{completedCount}</p>
                    <p className={`text-[10px] mt-1 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>of {totalTopics} topics</p>
                </div>
                <div className={`rounded-2xl p-4 border ${darkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Confident</p>
                    <p className={`text-2xl font-extrabold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{confidentCount}</p>
                    <div className="flex gap-1 mt-1">
                        <span className="text-[9px] text-amber-500">{partialCount} partial</span>
                        <span className="text-[9px] text-slate-400">•</span>
                        <span className="text-[9px] text-red-500">{weakCount} weak</span>
                    </div>
                </div>
                <div className={`rounded-2xl p-4 border ${darkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Remaining</p>
                    <p className={`text-2xl font-extrabold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{totalTopics - completedCount}</p>
                    <p className={`text-[10px] mt-1 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>topics left</p>
                </div>
            </div>

            {/* Controls */}
            <div className={`${darkMode ? 'bg-zinc-900/90 border-transparent shadow-none' : 'bg-white/95 border-slate-100 shadow-sm'} backdrop-blur-md rounded-2xl border p-4 mb-6 sticky top-16 md:top-24 z-20 transition-all`}>
                <div className="flex flex-col gap-4">
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

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        <div className={`flex items-center rounded-lg p-1 border shrink-0 ${darkMode ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                            {['All', 'Paper I', 'Paper II'].map(p => (
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
                    <span className="italic">Tap card to update</span>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                    const isCompleted = completedTopics[item.id];
                    const meta = topicMastery[item.id] || {};
                    const mastery = meta.mastery;

                    return (
                        <div
                            key={item.id}
                            onClick={() => setMasteryDialog({ open: true, topic: item })}
                            className={`rounded-xl border p-4 transition-all relative overflow-hidden cursor-pointer active:scale-[0.98]
                            ${darkMode
                                    ? (isCompleted ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-zinc-900 border-white/5 active:bg-zinc-800')
                                    : (isCompleted ? 'border-emerald-100 bg-emerald-50/10' : 'bg-white border-slate-100 hover:shadow-md active:bg-slate-50')
                                }
                            ${mastery === 'not-confident' ? (darkMode ? 'ring-1 ring-red-500/30' : 'ring-1 ring-red-100') : ''}
                        `}>
                            {/* Status Stripe */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCompleted
                                ? (mastery === 'confident' ? 'bg-emerald-500' : mastery === 'partially-confident' ? 'bg-amber-500' : 'bg-red-500')
                                : (darkMode ? 'bg-zinc-800' : 'bg-slate-200')
                                }`} />

                            <div className="pl-3">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide
                                        ${item.paper === 'Paper I'
                                            ? (darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700')
                                            : (darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-700')
                                        }
                                    `}>
                                        {item.paper}
                                    </span>
                                    <div className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${darkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-400'}`}>
                                        <Clock className="w-3 h-3" />
                                        {item.daysAllotted} {item.daysAllotted === 1 ? 'Day' : 'Days'}
                                    </div>
                                </div>

                                <h3 className={`text-sm font-bold leading-snug mb-1 ${isCompleted
                                    ? 'line-through decoration-slate-500 text-slate-500'
                                    : (darkMode ? 'text-slate-100' : 'text-slate-800')
                                    }`}>
                                    {item.title}
                                </h3>
                                <p className={`text-xs font-medium mb-3 line-clamp-1 flex items-center gap-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {getCategoryIcon(item.category)}
                                    {item.category}
                                </p>

                                <div className={`flex items-center justify-between mt-2 pt-2 border-t border-dashed ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                    {isCompleted ? (
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Completed</span>
                                            {mastery === 'confident' && <ThumbsUp className="w-3 h-3 ml-1" />}
                                            {mastery === 'partially-confident' && <HelpCircle className="w-3 h-3 ml-1 text-amber-500" />}
                                            {mastery === 'not-confident' && <ThumbsDown className="w-3 h-3 ml-1 text-red-500" />}
                                        </div>
                                    ) : (
                                        <div className={`flex items-center gap-1.5 text-xs font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                            <Circle className="w-4 h-4" />
                                            <span>Not Started</span>
                                        </div>
                                    )}

                                    <div className={`p-1 rounded-full ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                                        <ChevronDown className="-rotate-90 w-3 h-3 text-slate-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredItems.length === 0 && (
                <div className={`text-center py-20 rounded-2xl border-2 border-dashed ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <Search className={`w-10 h-10 mx-auto mb-3 ${darkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                    <p className={`font-medium text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>No topics found matching your criteria.</p>
                </div>
            )}

            {/* Mastery Dialog */}
            {masteryDialog.open && masteryDialog.topic && (
                <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4 pb-24 md:pb-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 ${darkMode ? 'bg-zinc-900 border border-white/10' : 'bg-white'}`}>
                        <div className="text-center mb-6">
                            <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                Topic Completion
                            </h3>
                            <p className="text-sm text-slate-400 line-clamp-2">
                                {masteryDialog.topic.title}
                            </p>
                            <p className={`text-[10px] mt-1 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                                {masteryDialog.topic.paper} • {masteryDialog.topic.category}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleMasterySelect('confident')}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all group"
                            >
                                <span className="font-bold">Confident</span>
                                <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>

                            <button
                                onClick={() => handleMasterySelect('partially-confident')}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white transition-all group"
                            >
                                <span className="font-bold">Partially Confident</span>
                                <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>

                            <button
                                onClick={() => handleMasterySelect('not-confident')}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                            >
                                <span className="font-bold">Low Confidence</span>
                                <ThumbsDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setMasteryDialog({ open: false, topic: null })}
                                className={`py-3 rounded-xl font-bold text-sm ${darkMode ? 'bg-zinc-800 text-slate-300 hover:bg-zinc-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} transition-colors`}
                            >
                                Cancel
                            </button>
                            {completedTopics[masteryDialog.topic.id] ? (
                                <button
                                    onClick={handleMarkIncomplete}
                                    className="py-3 rounded-xl font-bold text-sm text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                                >
                                    Mark Incomplete
                                </button>
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
