import { PlanItem, ProgressData } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BookOpen, BarChart2, ListChecks, Table as TableIcon } from "lucide-react";

interface SidebarProps {
    plan: PlanItem[];
    progress: ProgressData;
    activeTab: 'calendar' | 'list' | 'tracker' | 'table';
    onTabChange: (tab: 'calendar' | 'list' | 'tracker' | 'table') => void;
    onFilterSelect: (filter: 'all' | 'completed' | 'overdue' | 'pending') => void;
}

export default function Sidebar({ plan, progress, activeTab, onTabChange, onFilterSelect }: SidebarProps) {
    // 1. Calculate Stats
    const studyItems = plan.filter(p => p.type !== 'revision');
    const totalItems = studyItems.length;
    const completedItems = studyItems.filter(p => progress[p.date]?.completed).length;
    const percentage = Math.round((completedItems / totalItems) * 100) || 0;

    const getPaperProgress = (categoryStr: string) => {
        const items = studyItems.filter(p => p.title.includes(categoryStr));
        const done = items.filter(p => progress[p.date]?.completed).length;
        return { total: items.length, done, percent: Math.round((done / items.length) * 100) || 0 };
    };

    const p1 = getPaperProgress("Paper I");
    const p3 = getPaperProgress("Paper III");

    // 2. Chart Data
    const today = new Date().toISOString().split('T')[0];
    let overdueCount = 0;
    let pendingFutureCount = 0;

    studyItems.forEach(p => {
        if (!progress[p.date]?.completed) {
            if (p.date < today) overdueCount++;
            else pendingFutureCount++;
        }
    });

    const chartData = [
        { name: 'Completed', value: completedItems, color: '#2563eb' },
        { name: 'Overdue', value: overdueCount, color: '#ef4444' },
        { name: 'Pending', value: pendingFutureCount, color: '#e4e4e7' },
    ];

    return (
        <div className="w-80 shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-screen sticky top-0 flex flex-col overflow-y-auto transition-colors">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100">LDCE 2026</span>
                </div>

                <nav className="space-y-1">
                    <button
                        onClick={() => onTabChange('calendar')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'calendar' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                    >
                        <BarChart2 className="w-4 h-4" />
                        Calendar View
                    </button>
                    <button
                        onClick={() => onTabChange('list')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'list' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                    >
                        <ListChecks className="w-4 h-4" />
                        List View
                    </button>
                    <button
                        onClick={() => onTabChange('table')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'table' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                    >
                        <TableIcon className="w-4 h-4" />
                        Schedule Table
                    </button>
                    <button
                        onClick={() => onTabChange('tracker')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'tracker' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Syllabus Tracker
                    </button>
                </nav>
            </div>

            <div className="p-6 space-y-8 flex-1">
                {/* Syllabus Coverage */}
                <div>
                    <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">Syllabus Coverage</h3>

                    <div className="mb-6 text-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
                        onClick={() => { onTabChange('tracker'); onFilterSelect('pending'); }}>
                        <div className="relative w-32 h-32 mx-auto flex items-center justify-center rounded-full border-4 border-zinc-100 dark:border-zinc-800">
                            <div
                                className="absolute inset-0 rounded-full border-4 border-blue-600"
                                style={{ clipPath: `inset(${100 - percentage}% 0 0 0)` }}
                            />
                            <div className="text-center">
                                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 block">{percentage}%</span>
                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold">Completed</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-zinc-700 dark:text-zinc-300">Paper I</span>
                                <span className="text-blue-600 dark:text-blue-400">{p1.percent}%</span>
                            </div>
                            <Progress value={p1.percent} className="h-1.5" />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-zinc-700 dark:text-zinc-300">Paper III</span>
                                <span className="text-blue-600 dark:text-blue-400">{p3.percent}%</span>
                            </div>
                            <Progress value={p3.percent} className="h-1.5" />
                        </div>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="h-48">
                    <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Topic Status</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Detailed Counts */}
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => { onTabChange('tracker'); onFilterSelect('completed'); }}
                        className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-center border border-blue-100 dark:border-blue-900/30 cursor-pointer transition-all hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <span className="block text-xl font-bold text-blue-700 dark:text-blue-400">{completedItems}</span>
                        <span className="text-[10px] uppercase font-bold text-blue-400 dark:text-blue-500">Done</span>
                    </button>
                    <button
                        onClick={() => { onTabChange('tracker'); onFilterSelect('overdue'); }}
                        className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-center border border-red-100 dark:border-red-900/30 cursor-pointer transition-all hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                        <span className="block text-xl font-bold text-red-700 dark:text-red-400">{overdueCount}</span>
                        <span className="text-[10px] uppercase font-bold text-red-400 dark:text-red-500">Late</span>
                    </button>
                    <button
                        onClick={() => { onTabChange('tracker'); onFilterSelect('pending'); }}
                        className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg text-center border border-zinc-100 dark:border-zinc-700 cursor-pointer transition-all hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    >
                        <span className="block text-xl font-bold text-zinc-700 dark:text-zinc-300">{pendingFutureCount}</span>
                        <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500">Left</span>
                    </button>
                </div>
            </div>

            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-600">© 2025 Study Planner</p>
            </div>
        </div>
    );
}
