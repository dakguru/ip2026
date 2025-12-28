
"use client";

import { useEffect, useState, useMemo } from "react";
import HomeHeader from "@/components/HomeHeader";
import { FULL_SCHEDULE } from "@/app/planner/page";
import {
    CheckCircle2,
    Trophy,
    Target,
    TrendingUp,
    BookOpen,
    Zap,
    Calendar,
    BarChart3,
    BrainCircuit,
    ArrowUpRight
} from "lucide-react";
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { motion } from "framer-motion";

interface QuizResult {
    _id: string;
    topicTitle: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    attemptedAt: string;
}

export default function ProgressPage() {
    const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Load Planner Progress
        const saved = localStorage.getItem('ldce2026_progress');
        if (saved) {
            setCompletedDays(JSON.parse(saved));
        }

        // 2. Load Quiz Progress
        fetch('/api/progress')
            .then(res => res.json())
            .then(data => {
                if (data.quizResults) {
                    setQuizResults(data.quizResults);
                }
            })
            .catch(err => console.error("Failed to load quizzes", err))
            .finally(() => setLoading(false));
    }, []);

    // --- CALCULATIONS ---

    // 1. Planner Stats
    const plannerStats = useMemo(() => {
        const totalTasks = FULL_SCHEDULE.filter(i => i.paper !== 'Revision' && i.paper !== 'End');
        const completedCount = totalTasks.filter(i => completedDays[i.date]).length;
        const totalCount = totalTasks.length;
        const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        // Paper-wise breakdown
        const paperStats = {
            'Paper I': { total: 0, completed: 0 },
            'Paper II': { total: 0, completed: 0 },
            'Paper III': { total: 0, completed: 0 },
            'Paper IV': { total: 0, completed: 0 },
        };

        totalTasks.forEach(task => {
            const p = task.paper as keyof typeof paperStats;
            if (paperStats[p]) {
                paperStats[p].total++;
                if (completedDays[task.date]) {
                    paperStats[p].completed++;
                }
            }
        });

        // Recent Activity (Completed Topics)
        const recentCompleted = totalTasks
            .filter(i => completedDays[i.date])
            // Sort by date desc (this is tricky as date is DD-MM-YYYY string)
            // We'll rely on schedule order which is approx chrono order
            // Actually schedule is chrono, so we reverse it
            .reverse()
            .slice(0, 5);

        return { completedCount, totalCount, percentage, paperStats, recentCompleted };
    }, [completedDays]);

    // 2. Quiz Stats
    const quizStats = useMemo(() => {
        const totalTaken = quizResults.length;
        const avgScore = totalTaken > 0
            ? Math.round(quizResults.reduce((acc, curr) => acc + curr.percentage, 0) / totalTaken)
            : 0;

        // Chart Data: Last 10 quizzes
        const chartData = [...quizResults].reverse().slice(-10).map((q, i) => ({
            name: `Quiz ${i + 1}`,
            score: q.percentage,
            title: q.topicTitle.substring(0, 15) + '...'
        }));

        return { totalTaken, avgScore, chartData };
    }, [quizResults]);

    // Data for Pie Chart
    const pieData = [
        { name: 'Completed', value: plannerStats.completedCount, color: '#10B981' }, // Green
        { name: 'Remaining', value: plannerStats.totalCount - plannerStats.completedCount, color: '#E2E8F0' }, // Slate-200
    ];

    // Data for Bar Chart (Paper-wise)
    const barData = Object.entries(plannerStats.paperStats).map(([key, val]) => ({
        name: key,
        Completed: val.completed,
        Remaining: val.total - val.completed
    })).filter(k => k.name !== 'Paper IV'); // Assuming Paper IV might not be main focus or empty

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pb-20">
            <HomeHeader isLoggedIn={true} membershipLevel="silver" /> {/* Helper handles actual fetch */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                        My Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Journey</span> 🚀
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                        Track your daily victories and visualize your path to success.
                    </p>
                </motion.div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* 1. MAIN PROGRESS CARD (Pie Chart) - Col Span 4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-100 dark:border-zinc-800 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-xs tracking-wider mb-1">Total Syllabus</h3>
                                <div className="text-4xl font-black text-zinc-900 dark:text-white flex items-baseline gap-1">
                                    {plannerStats.percentage}%
                                    <span className="text-sm font-medium text-zinc-400">Completed</span>
                                </div>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl text-green-600 dark:text-green-400">
                                <Target className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="h-48 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{plannerStats.completedCount}</span>
                                <span className="text-[10px] text-zinc-500 uppercase font-bold">Topics Done</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. QUIZ STATS - Col Span 4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-xs tracking-wider mb-1">Quiz Mastery</h3>
                                <div className="text-4xl font-black text-zinc-900 dark:text-white flex items-baseline gap-1">
                                    {quizStats.avgScore}%
                                    <span className="text-sm font-medium text-zinc-400">Avg. Score</span>
                                </div>
                            </div>
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-2xl text-indigo-600 dark:text-indigo-400">
                                <Trophy className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4">
                                <p className="text-xs text-zinc-500 mb-1">Quizzes Taken</p>
                                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{quizStats.totalTaken}</p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4">
                                <p className="text-xs text-zinc-500 mb-1">Best Score</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {Math.max(...quizResults.map(q => q.percentage), 0)}%
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. FLASHCARDS PREVIEW - Col Span 4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden group cursor-default"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BrainCircuit className="w-32 h-32" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-amber-100 font-bold uppercase text-xs tracking-wider mb-1">Flash Cards</h3>
                                    <div className="text-4xl font-black flex items-baseline gap-1">
                                        Soon
                                    </div>
                                </div>
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl text-white">
                                    <Zap className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-amber-100 text-sm mb-4">
                                    Adaptive spaced-repetition system arriving in just:
                                </p>
                                <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10">
                                    <Calendar className="w-4 h-4" />
                                    Feb 01, 2026
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. PAPER-WISE BREAKDOWN (Bar Chart) - Col Span 8 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-100 dark:border-zinc-800"
                    >
                        <h3 className="text-zinc-900 dark:text-zinc-100 font-bold text-lg mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            Topic Completion by Paper
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" opacity={0.5} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="Completed" stackId="a" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
                                    <Bar dataKey="Remaining" stackId="a" fill="#F1F5F9" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* 5. RECENT COMPLETED TOPICS - Col Span 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-4 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
                    >
                        <h3 className="text-zinc-900 dark:text-zinc-100 font-bold text-lg mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            Recently Completed
                        </h3>

                        <div className="space-y-4">
                            {plannerStats.recentCompleted.length > 0 ? (
                                plannerStats.recentCompleted.map((task, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                        <div className="mt-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                                                {task.subTopic}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                                                <span className="bg-white dark:bg-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-600">
                                                    {task.paper}
                                                </span>
                                                <span>• {task.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-zinc-400">
                                    <p className="text-sm">No topics marked as done yet.</p>
                                    <a href="/planner" className="text-blue-500 text-xs font-bold hover:underline mt-2 inline-block">Go to Planner →</a>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* 6. QUIZ TREND (Line Chart) - Col Span 12 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="md:col-span-12 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-100 dark:border-zinc-800"
                    >
                        <h3 className="text-zinc-900 dark:text-zinc-100 font-bold text-lg mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                            Quiz Performance Trend
                        </h3>
                        <div className="h-64 md:h-80 w-full">
                            {quizStats.chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={quizStats.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                                        <Tooltip
                                            cursor={{ fill: '#F1F5F9', opacity: 0.5 }}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            labelStyle={{ fontWeight: 'bold', color: '#1E293B' }}
                                        />
                                        <Bar dataKey="score" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                                    <BarChart3 className="w-10 h-10 mb-2 opacity-50" />
                                    <p>No quiz data available to show trend.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
