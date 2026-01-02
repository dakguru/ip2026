"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowLeft, Share2, Award, TrendingUp, Target, Clock } from 'lucide-react';
import { QuizSet, Question } from "@/lib/quizTypes";

interface NativeResultScreenProps {
    score: number;
    totalQuestions: number;
    questions: Question[];
    answers: Record<string, number>;
    timeTaken: number; // in seconds
    onBack: () => void;
}

export default function NativeResultScreen({ score, totalQuestions, questions, answers, timeTaken, onBack }: NativeResultScreenProps) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const correct = score;
    const wrong = Object.keys(answers).length - correct;
    const skipped = totalQuestions - Object.keys(answers).length;
    const accuracy = Object.keys(answers).length > 0 ? Math.round((correct / Object.keys(answers).length) * 100) : 0;

    // Mock Topper Score (usually top 1-5% get 90%+)
    const topperScore = Math.max(score + 2, Math.min(totalQuestions, Math.ceil(totalQuestions * 0.92)));
    const averageScore = Math.round(totalQuestions * 0.65);

    const pieData = [
        { name: 'Correct', value: correct, color: '#22c55e' },
        { name: 'Wrong', value: wrong, color: '#ef4444' },
        { name: 'Skipped', value: skipped, color: '#e4e4e7' },
    ];

    const barData = [
        { name: 'You', score: score, fill: '#3b82f6' },
        { name: 'Avg', score: averageScore, fill: '#a1a1aa' },
        { name: 'Top', score: topperScore, fill: '#f59e0b' },
    ];

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20">

            {/* 1. Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 sticky top-0 z-30 flex items-center justify-between">
                <button onClick={onBack} className="p-2 -ml-2 text-zinc-600 dark:text-zinc-400">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Test Analysis</h1>
                <button className="p-2 -mr-2 text-zinc-600 dark:text-zinc-400">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            <div className="p-4 space-y-6">

                {/* 2. Score Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Total Score</div>
                    <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">
                        {score} <span className="text-lg text-zinc-400 font-medium">/ {totalQuestions}</span>
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full border border-green-200 dark:border-green-800">
                            {percentage}% Marks
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800">
                            {accuracy}% Accuracy
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">142</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400">Rank</span>
                        </div>
                        <div className="flex flex-col items-center border-l border-r border-zinc-100 dark:border-zinc-800">
                            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{formatTime(timeTaken)}</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400">Time</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">92%</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400">Percentile</span>
                        </div>
                    </div>
                </div>

                {/* 3. Performance Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Accuracy Pie */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col items-center">
                        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4 w-full text-left flex items-center gap-2">
                            <Target className="w-4 h-4 text-zinc-400" /> Attempt Breakdown
                        </h3>
                        <div className="w-32 h-32 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-xs text-zinc-500">Total</span>
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">{totalQuestions}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> {correct}
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> {wrong}
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div> {skipped}
                            </div>
                        </div>
                    </div>

                    {/* Comparison Bar */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4 w-full text-left flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-zinc-400" /> Comparison
                        </h3>
                        <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ReBarChart data={barData} barSize={20}>
                                    <XAxis
                                        dataKey="name"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: '#71717a' }}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="score" radius={[4, 4, 0, 0]} />
                                </ReBarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-center text-zinc-500 mt-2">
                            You need <span className="text-orange-500 font-bold">+{topperScore - score} marks</span> to define the topper.
                        </p>
                    </div>
                </div>

                {/* 4. Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button onClick={onBack} className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl active:scale-95 transition-transform">
                        Go Dashboard
                    </button>
                    <button className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
                        View Solutions
                    </button>
                </div>

            </div>
        </div>
    );
}
