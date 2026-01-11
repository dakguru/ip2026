
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, Award, Target, Zap } from 'lucide-react';
import { ScheduleItem } from '@/data/schedule';

interface PlannerDashboardProps {
    schedule: ScheduleItem[];
    completedDays: Record<string, boolean>;
    topicMetadata: Record<string, { mastery?: 'confident' | 'partially-confident' | 'not-confident'; completionDate?: string }>;
    totalDuration: number; // 128
    startDate: Date; // Jan 14, 2026
}

export default function PlannerDashboard({
    schedule,
    completedDays,
    topicMetadata,
    totalDuration,
    startDate
}: PlannerDashboardProps) {
    const today = new Date();

    // Filter tasks (exclude revision/end)
    const tasks = schedule.filter(i => i.paper !== 'Revision' && i.paper !== 'End');
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => completedDays[t.date]).length;
    const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

    // Schedule Comparison
    const daysElapsed = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

    // Expected tasks to be done by today (roughly) based on date
    // We can just count tasks where date <= today
    const expectedTasks = tasks.filter(t => {
        const [d, m, y] = t.date.split('-');
        const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
        return dateObj <= today;
    }).length;

    const diff = completedTasks - expectedTasks;
    let status = "On Track";
    let statusColor = "text-green-600";
    let statusIcon = <TrendingUp className="w-5 h-5" />;

    if (diff < -5) {
        status = "Lagging Behind";
        statusColor = "text-red-600";
        statusIcon = <AlertCircle className="w-5 h-5" />;
    } else if (diff > 5) {
        status = "Ahead of Schedule";
        statusColor = "text-blue-600";
        statusIcon = <Zap className="w-5 h-5" />;
    }

    // Mastery Index
    const confidentCount = Object.values(topicMetadata).filter(m => m.mastery === 'confident').length;
    const partialCount = Object.values(topicMetadata).filter(m => m.mastery === 'partially-confident').length;
    const notConfidentCount = Object.values(topicMetadata).filter(m => m.mastery === 'not-confident').length;
    const ratedCount = confidentCount + partialCount + notConfidentCount;

    // Default to confident if completed but not rated? No, keep strictly rated.
    // Actually, if ratedCount is 0 but completedTasks > 0, we might want to prompt user.

    return (
        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-slate-100 mb-6 md:mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" /> Unified Progress Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* 1. Overall Coverage */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <PieChart width={80} height={80}>
                            <Pie data={[{ value: progress }, { value: 100 - progress }]} innerRadius={25} outerRadius={40} dataKey="value">
                                <Cell fill="#2563eb" />
                                <Cell fill="#cbd5e1" />
                            </Pie>
                        </PieChart>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Syllabus Coverage</p>
                        <h3 className="text-3xl font-extrabold text-slate-900">{progress}%</h3>
                    </div>
                    <div className="mt-4 w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{completedTasks} / {totalTasks} Topics Completed</p>
                </div>

                {/* 2. Schedule Monitor */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Schedule Status</p>
                        <div className={`flex items-center gap-2 text-lg font-bold ${statusColor}`}>
                            {statusIcon} {status}
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-slate-600">
                        <div className="flex justify-between mb-1">
                            <span>Actual:</span>
                            <span className="font-bold">{completedTasks}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Expected:</span>
                            <span className="font-bold">{expectedTasks}</span>
                        </div>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 text-right">
                        Based on Recommended Date
                    </div>
                </div>

                {/* 3. Mastery Index */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Concept Mastery</p>
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            <span className="font-bold text-slate-800">{confidentCount} Confident</span>
                        </div>
                    </div>
                    <div className="mt-4 flex h-2 rounded-full overflow-hidden bg-slate-200">
                        <div className="bg-emerald-500 h-full" style={{ width: `${(confidentCount / (ratedCount || 1)) * 100}%` }} />
                        <div className="bg-amber-500 h-full" style={{ width: `${(partialCount / (ratedCount || 1)) * 100}%` }} />
                        <div className="bg-red-500 h-full" style={{ width: `${(notConfidentCount / (ratedCount || 1)) * 100}%` }} />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Confident</span>
                        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Weak</span>
                    </div>
                </div>

                {/* 4. Time Horizon */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time Horizon</p>
                        <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            <Clock className="w-5 h-5 text-indigo-500" /> Day {daysElapsed}
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>Remaining</span>
                            <span className="font-bold">{Math.max(0, totalDuration - daysElapsed)} Days</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (daysElapsed / totalDuration) * 100)}%` }} />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 text-right">Target: May 2026</p>
                </div>

            </div>
        </div>
    );
}
