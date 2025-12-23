'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar, Cell
} from 'recharts';
import { Trophy, Target, TrendingUp, Calendar, Clock, Star, BookOpen, AlertCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface QuizHistoryItem {
    _id: string;
    topicTitle: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    createdAt: string;
}

interface TopicStat {
    _id: string; // Topic Title
    attempts: number;
    avgScore: number;
    bestScore: number;
    lastAttempt: string;
}

export default function MyProgress() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{
        totalQuizzes: number;
        history: QuizHistoryItem[];
        topicStats: TopicStat[];
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/user/progress');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error("Failed to load progress", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!data || data.totalQuizzes === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
                    <Trophy className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No Quizzes Taken Yet</h1>
                <p className="text-zinc-500 max-w-md mb-8">Start your journey by taking your first quiz to see your progress analytics here.</p>
                <Link href="/quiz" className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold hover:scale-105 transition-transform">
                    Go to Quiz Zone
                </Link>
            </div>
        );
    }

    // Format data for charts
    const chartData = [...data.history].reverse().map((item, idx) => ({
        name: `Quiz ${idx + 1}`,
        score: Math.round(item.percentage),
        date: new Date(item.createdAt).toLocaleDateString(),
        fullDate: new Date(item.createdAt).toLocaleString(),
        topic: item.topicTitle
    }));

    const averageScore = chartData.reduce((acc, curr) => acc + curr.score, 0) / chartData.length;
    const bestPerformance = Math.max(...chartData.map(d => d.score));

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8 transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">My Progress</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Track your learning journey and improvements.</p>
                    </div>
                    <Link href="/quiz" className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                        <Target className="w-4 h-4" /> Take New Quiz
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatsCard
                        title="Total Quizzes"
                        value={data.totalQuizzes}
                        icon={BookOpen}
                        color="blue"
                        sub="Lifetime attempts"
                    />
                    <StatsCard
                        title="Average Score"
                        value={`${Math.round(averageScore)}%`}
                        icon={TrendingUp}
                        color="purple"
                        sub="Across all topics"
                    />
                    <StatsCard
                        title="Best Performance"
                        value={`${Math.round(bestPerformance)}%`}
                        icon={Trophy}
                        color="amber"
                        sub="Personal record"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800"
                    >
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-500" /> Performance Trend
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#71717a"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                    />
                                    <YAxis
                                        stroke="#71717a"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}%`}
                                        domain={[0, 100]}
                                    />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ stroke: '#8b5cf6', strokeWidth: 2 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Topic Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col"
                    >
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-500" /> Topic Mastery
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px] pr-2 custom-scrollbar">
                            {data.topicStats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm">{stat._id}</p>
                                        <p className="text-xs text-zinc-500">{stat.attempts} attempts</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-sm font-bold block ${stat.avgScore >= 80 ? 'text-green-600 dark:text-green-400' :
                                                stat.avgScore >= 60 ? 'text-amber-600 dark:text-amber-400' :
                                                    'text-red-600 dark:text-red-400'
                                            }`}>
                                            {Math.round(stat.avgScore)}%
                                        </span>
                                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide font-medium">Avg Score</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* History List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Recent Activity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.history.map((item) => (
                            <div key={item._id} className="group bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:shadow-lg dark:hover:shadow-purple-900/10 hover:border-purple-200 dark:hover:border-purple-800 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${item.percentage >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                            item.percentage >= 60 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                                                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                        }`}>
                                        {Math.round(item.percentage)}% Score
                                    </div>
                                    <time className="text-xs text-zinc-400 font-medium">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </time>
                                </div>
                                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {item.topicTitle}
                                </h4>
                                <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <span className="flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {item.totalQuestions} Qs
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const StatsCard = ({ title, value, icon: Icon, color, sub }: any) => {
    const colorStyles = {
        blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
        purple: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
        amber: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-5"
        >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorStyles[color as keyof typeof colorStyles]}`}>
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
                <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{value}</p>
                {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
            </div>
        </motion.div>
    );
};
