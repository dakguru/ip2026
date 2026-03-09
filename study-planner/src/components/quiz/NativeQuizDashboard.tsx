import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Play, Star, Zap, BrainCircuit, ChevronRight, Layers } from 'lucide-react';
import { QuizTopic } from '@/lib/quizTypes';

import AppScreenWrapper from '@/components/AppScreenWrapper';

interface NativeQuizDashboardProps {
    group1Topics: QuizTopic[];
    group2Topics: QuizTopic[];
    group2Title: string;
    onSelectTopic: (topic: QuizTopic) => void;
    isUnlocked: (topicId: string) => boolean;
}

export default function NativeQuizDashboard({
    group1Topics,
    group2Topics,
    group2Title,
    onSelectTopic,
    isUnlocked
}: NativeQuizDashboardProps) {

    const renderTopicCard = (topic: QuizTopic) => {
        const locked = !isUnlocked(topic.id);
        const qCount = topic.sets.reduce((acc, s) => acc + s.questions.length, 0);

        return (
            <button
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className={`group relative flex flex-col items-start p-5 rounded-3xl transition-all w-full text-left
                    ${locked
                        ? 'bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800'
                        : 'bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm shadow-zinc-200/50 dark:shadow-black/50'
                    }
                `}
            >
                <div className="flex justify-between w-full mb-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center
                        ${locked
                            ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'
                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        }
                    `}>
                        {locked ? <Lock className="w-5 h-5" /> : <BrainCircuit className="w-5 h-5" />}
                    </div>
                    {locked && (
                        <span className="px-2 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wide">
                            Upgrade
                        </span>
                    )}
                </div>

                <h3 className={`font-bold text-base mb-1 line-clamp-2 leading-tight
                    ${locked ? 'text-zinc-500 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'}
                `}>
                    {topic.title}
                </h3>

                <p className="text-xs font-medium text-zinc-400 mt-auto">
                    {qCount} Questions
                </p>

                {!locked && (
                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-blue-500 fill-current opacity-20" />
                    </div>
                )}
            </button>
        );
    };

    return (
        <AppScreenWrapper
            header={
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Quiz Zone</h1>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Master your syllabus</p>
                </div>
            }
        >
            <div className="p-6 space-y-8">
                {/* Banners Carousel */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                    {/* 1. All India Mock Test Banner */}
                    <Link href="/mock-tests" className="flex-shrink-0 w-[85%] sm:w-[320px] flex flex-col group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white shadow-xl shadow-indigo-500/20">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Star className="w-24 h-24 rotate-12" />
                        </div>
                        <div className="relative p-5 flex-1 flex flex-col">
                            <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                Live Now
                            </div>
                            <h2 className="text-xl font-bold mb-2 pr-12">All India Mock Tests</h2>
                            <p className="text-indigo-100 text-[11px] font-medium max-w-[200px] mb-3 leading-relaxed">
                                Compete with aspirants across India in real-time.
                            </p>
                            <div className="mt-auto inline-flex max-w-fit items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold group-active:scale-95 transition-transform">
                                Join Series <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>

                    {/* 2. Quiz Zone Banner */}
                    <button onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })} className="flex-shrink-0 w-[85%] sm:w-[320px] flex flex-col group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-500/20 text-left">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <BrainCircuit className="w-24 h-24 -rotate-12" />
                        </div>
                        <div className="relative p-5 flex-1 flex flex-col">
                            <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/10">
                                Practice Mode
                            </div>
                            <h2 className="text-xl font-bold mb-2 pr-12">Topic-wise Quiz</h2>
                            <p className="text-emerald-50 text-[11px] font-medium max-w-[200px] mb-3 leading-relaxed">
                                Master specific topics with instant corrective feedback.
                            </p>
                            <div className="mt-auto inline-flex max-w-fit items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold group-active:scale-95 transition-transform">
                                Start Quiz <Play className="w-3 h-3 fill-current" />
                            </div>
                        </div>
                    </button>

                    {/* 3. Flash Cards Banner */}
                    <Link href="/flashcards" className="flex-shrink-0 w-[85%] sm:w-[320px] flex flex-col group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-xl shadow-orange-500/20">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Layers className="w-24 h-24 rotate-45" />
                        </div>
                        <div className="relative p-5 flex-1 flex flex-col">
                            <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/10">
                                Active Recall
                            </div>
                            <h2 className="text-xl font-bold mb-2 pr-12">Flash Cards</h2>
                            <p className="text-orange-50 text-[11px] font-medium max-w-[200px] mb-3 leading-relaxed">
                                Quickly memorize key points and manual rules.
                            </p>
                            <div className="mt-auto inline-flex max-w-fit items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-xl text-xs font-bold group-active:scale-95 transition-transform">
                                Open Cards <Layers className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Paper I */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-5 bg-blue-500 rounded-full" />
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Paper I</h2>
                        </div>
                        <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-lg">
                            {group1Topics.length} Topics
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {group1Topics.map(renderTopicCard)}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-5 bg-pink-500 rounded-full" />
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{group2Title}</h2>
                        </div>
                        <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-lg">
                            {group2Topics.length} Topics
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {group2Topics.map(renderTopicCard)}
                    </div>
                </section>
            </div>
        </AppScreenWrapper>
    );
}
