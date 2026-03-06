"use client";

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowLeft, Share2, Award, TrendingUp, Target, Clock, CheckCircle2, XCircle } from 'lucide-react';
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
    const [showSolutions, setShowSolutions] = useState(false);

    const percentage = Math.round((score / totalQuestions) * 100);
    const correct = score;
    const wrong = Object.keys(answers).length - correct;
    const skipped = totalQuestions - Object.keys(answers).length;
    const accuracy = Object.keys(answers).length > 0 ? Math.round((correct / Object.keys(answers).length) * 100) : 0;

    // Consistency Logic based on percentage
    let consistency = "Improving";
    if (percentage >= 80) consistency = "High";
    else if (percentage >= 50) consistency = "Medium";

    // Percentile - simple simulation based on percentage for now as requested
    // Mapping 0-100 score to 0-99 percentile roughly
    const displayPercentile = Math.min(99, Math.max(1, percentage));

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

    if (showSolutions) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20">
                <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 sticky top-0 z-30 flex items-center gap-3">
                    <button onClick={() => setShowSolutions(false)} className="p-2 -ml-2 text-zinc-600 dark:text-zinc-400">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Solutions</h1>
                </div>
                <div className="p-4 space-y-4">
                    {questions.map((q, idx) => {
                        const userAnswer = answers[q.id];
                        const isCorrect = userAnswer === q.correctAnswer;
                        const isSkipped = userAnswer === undefined;

                        return (
                            <div key={q.id} className={`p-4 rounded-xl border bg-white dark:bg-zinc-900 space-y-3
                                ${isCorrect ? 'border-green-200 dark:border-green-900' :
                                    isSkipped ? 'border-zinc-200 dark:border-zinc-800' :
                                        'border-red-200 dark:border-red-900'}
                            `}>
                                <div className="flex gap-3">
                                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                        ${isCorrect ? 'bg-green-100 text-green-700' :
                                            isSkipped ? 'bg-zinc-100 text-zinc-500' :
                                                'bg-red-100 text-red-700'}
                                    `}>
                                        {idx + 1}
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2 whitespace-pre-wrap">{q.text}</p>
                                        <div className="space-y-1.5">
                                            {q.options.map((opt, oIdx) => {
                                                const isOptCorrect = oIdx === q.correctAnswer;
                                                const isOptSelected = oIdx === userAnswer;

                                                let style = "text-zinc-500 dark:text-zinc-400 border-transparent bg-transparent";
                                                if (isOptCorrect) style = "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200";
                                                else if (isOptSelected) style = "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200";

                                                return (
                                                    <div key={oIdx} className={`text-xs p-2 rounded-lg border ${style} flex items-center justify-between`}>
                                                        <span>{opt}</span>
                                                        {isOptCorrect && <CheckCircle2 className="w-3 h-3 text-green-600" />}
                                                        {isOptSelected && !isOptCorrect && <XCircle className="w-3 h-3 text-red-600" />}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {q.explanation && (
                                            <div className="mt-3 text-xs bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                                                <span className="font-bold text-zinc-500 block text-[10px] uppercase mb-1">Explanation</span>
                                                {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

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
                            <span className={`text-xl font-bold ${consistency === 'High' ? 'text-green-600' : consistency === 'Medium' ? 'text-amber-600' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                {consistency}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400">Consistency</span>
                        </div>
                        <div className="flex flex-col items-center border-l border-r border-zinc-100 dark:border-zinc-800">
                            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{formatTime(timeTaken)}</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400">Time</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{displayPercentile}%</span>
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
                    <button
                        onClick={() => setShowSolutions(true)}
                        className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-transform"
                    >
                        View Solutions
                    </button>
                </div>

            </div>
        </div>
    );
}
