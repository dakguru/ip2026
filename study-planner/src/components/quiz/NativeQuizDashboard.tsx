import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lock, Play, Star, Zap, BrainCircuit, ChevronRight, Layers, Trophy } from 'lucide-react';
import { QuizTopic } from '@/lib/quizTypes';
import { useCourse } from '@/contexts/CourseContext';

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

    const [showTopics, setShowTopics] = useState(false);
    const [nativeSearch, setNativeSearch] = useState('');
    const { course } = useCourse();
    const isPS = course === 'PS_GR_B';

    const renderTopicCard = (topic: QuizTopic) => {
        const locked = !isUnlocked(topic.id);
        const qCount = topic.sets.reduce((acc, s) => acc + s.questions.length, 0);

        return (
            <button
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className={`group relative flex flex-col items-start p-4 rounded-2xl transition-all w-full text-left active:scale-[0.97]
                    ${locked
                        ? 'bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800'
                        : 'bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm'
                    }
                `}
            >
                <div className="flex justify-between w-full mb-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                        ${locked
                            ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'
                            : 'bg-blue-50 dark:bg-blue-900/25 text-blue-600 dark:text-blue-400'
                        }
                    `}>
                        {locked ? <Lock className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
                    </div>
                    {locked && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[9px] font-bold uppercase tracking-wide">
                            Upgrade
                        </span>
                    )}
                </div>

                <h3 className={`font-semibold text-[13px] mb-1.5 line-clamp-2 leading-snug
                    ${locked ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-100'}
                `}>
                    {topic.title}
                </h3>

                <p className="text-[11px] font-medium text-zinc-400 mt-auto">
                    {qCount} Qs
                </p>

                {!locked && (
                    <div className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
                        <Play className="w-3.5 h-3.5 text-blue-500 fill-current" />
                    </div>
                )}
            </button>
        );
    };

        if (showTopics) {
            return (
                <AppScreenWrapper hideStatusBarPadding={true}>
                    <div className="bg-slate-50 dark:bg-zinc-950 h-full flex flex-col font-sans text-slate-800 dark:text-zinc-200">
                        {/* Immersive Hero Bar (Fixed) */}
                        <div className={`shrink-0 relative w-full overflow-hidden transition-all duration-500 pt-[max(12px,calc(env(safe-area-inset-top,0px)+6px))] pb-3 shadow-md border-b
                            ${isPS ? 'bg-gradient-to-r from-teal-950 to-cyan-950 border-teal-900/50 text-white' : 'bg-gradient-to-r from-indigo-950 to-purple-950 border-purple-900/50 text-white'}
                        `}>
                            {/* Glow Effects */}
                            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none mix-blend-screen">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdi0xSDB2MXptMCAyMGg0MHYtMUgwdjF6TTEwIDB2NDBoLTFWMGgxeptMTAgMHY0MGgtMVYwaDF6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]"></div>
                            </div>
                            
                            <div className="max-w-4xl mx-auto px-4 relative z-10 flex items-center gap-2.5">
                                <button onClick={() => setShowTopics(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 active:bg-white/20 transition-colors border border-white/10 shrink-0">
                                    <ArrowLeft className="w-4 h-4 text-white" />
                                </button>
                                <div>
                                    <h1 className="text-lg font-black tracking-tight leading-none flex items-center gap-1.5 animate-in fade-in slide-in-from-left-4 duration-300">
                                        Topic Quizzes
                                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${isPS ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>STUDY MODE</span>
                                    </h1>
                                    <p className="text-[10px] text-white/60 font-medium mt-0.5">Select a topic to start practice</p>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6 pb-32 max-w-4xl mx-auto w-full relative z-20">
                            {/* Search Bar */}
                            <div className="relative">
                                <div className="flex items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden border border-zinc-200/80 dark:border-zinc-800">
                                    <div className="flex items-center justify-center pl-4 pr-1 shrink-0">
                                        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        value={nativeSearch}
                                        onChange={e => setNativeSearch(e.target.value)}
                                        placeholder="Search quiz topics..."
                                        className="flex-1 bg-transparent py-3 px-2 text-sm text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none min-w-0"
                                    />
                                    {nativeSearch && (
                                        <button onClick={() => setNativeSearch('')} className="flex items-center justify-center w-8 h-8 mr-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 transition-colors shrink-0">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                {nativeSearch && (
                                    <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 mt-2">
                                        {(() => {
                                            const q = nativeSearch.toLowerCase();
                                            const c = [...group1Topics, ...group2Topics].filter(t => t.title.toLowerCase().includes(q)).length;
                                            return c === 0 ? 'No topics found' : `${c} topic${c !== 1 ? 's' : ''} found`;
                                        })()}
                                    </p>
                                )}
                            </div>

                            {/* Paper I */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-5 bg-blue-500 rounded-full" />
                                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Paper I</h2>
                                </div>
                                <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-lg">
                                    {(nativeSearch ? group1Topics.filter(t => t.title.toLowerCase().includes(nativeSearch.toLowerCase())) : group1Topics).length} Topics
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                {(nativeSearch ? group1Topics.filter(t => t.title.toLowerCase().includes(nativeSearch.toLowerCase())) : group1Topics).map(renderTopicCard)}
                            </div>
                        </section>

                        {/* Paper II/III */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-5 bg-pink-500 rounded-full" />
                                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{group2Title}</h2>
                                </div>
                                <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-lg">
                                    {(nativeSearch ? group2Topics.filter(t => t.title.toLowerCase().includes(nativeSearch.toLowerCase())) : group2Topics).length} Topics
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                {(nativeSearch ? group2Topics.filter(t => t.title.toLowerCase().includes(nativeSearch.toLowerCase())) : group2Topics).map(renderTopicCard)}
                            </div>
                        </section>
                    </div>
                </div>
            </AppScreenWrapper>
        );
    }

    return (
        <AppScreenWrapper hideStatusBarPadding={true}>
            <div className="bg-slate-50 dark:bg-zinc-950 h-full flex flex-col font-sans text-slate-800 dark:text-zinc-200">
                {/* Immersive Hero Bar (Fixed) */}
                <div className={`shrink-0 relative w-full overflow-hidden transition-all duration-500 pt-[max(12px,calc(env(safe-area-inset-top,0px)+6px))] pb-3 shadow-md border-b
                    ${isPS ? 'bg-gradient-to-r from-teal-950 to-cyan-950 border-teal-900/50 text-white' : 'bg-gradient-to-r from-indigo-950 to-purple-950 border-purple-900/50 text-white'}
                `}>
                    {/* Glow Effects */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none mix-blend-screen">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdi0xSDB2MXptMCAyMGg0MHYtMUgwdjF6TTEwIDB2NDBoLTFWMGgxeptMTAgMHY0MGgtMVYwaDF6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]"></div>
                    </div>
                    
                    <div className="max-w-4xl mx-auto px-4 relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 active:bg-white/20 transition-colors border border-white/10 shrink-0">
                                <ArrowLeft className="w-4 h-4 text-white" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-black tracking-tight leading-none flex items-center gap-1.5 animate-in fade-in slide-in-from-left-4 duration-300">
                                    Practice Zone
                                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${isPS ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>
                                        {isPS ? 'PS Gr B' : 'LDCE IP'}
                                    </span>
                                </h1>
                                <p className="text-[10px] text-white/60 font-medium mt-0.5">Master Postal Syllabus via Active Recall</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 pb-32 space-y-6 max-w-4xl mx-auto w-full relative z-20">
                    <div className="flex flex-col gap-4 w-full">
                        {/* 1. All India Mock Test Banner */}
                        <Link href="/mock-tests" className="w-full flex flex-col group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-transform">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Star className="w-24 h-24 rotate-12" />
                            </div>
                            <div className="relative p-6 flex-1 flex flex-col">
                                <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                    Live Now
                                </div>
                                <h2 className="text-xl font-bold mb-2 pr-12">All India Mock Tests</h2>
                                <p className="text-indigo-100 text-xs font-medium max-w-[200px] mb-4 leading-relaxed">
                                    Compete with aspirants across India in real-time.
                                </p>
                                <div className="mt-auto inline-flex max-w-fit items-center gap-2 bg-white text-indigo-600 px-4 py-2.5 rounded-xl text-xs font-bold group-active:scale-95 transition-transform shadow-md">
                                    Join Series <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>

                        {/* 2. Quiz Zone Banner */}
                        <button onClick={() => setShowTopics(true)} className="w-full flex flex-col group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-500/20 text-left active:scale-[0.98] transition-transform">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <BrainCircuit className="w-24 h-24 -rotate-12" />
                            </div>
                            <div className="relative p-6 flex-1 flex flex-col">
                                <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/10">
                                    Study Mode
                                </div>
                                <h2 className="text-xl font-bold mb-2 pr-12">Topic-wise Quiz</h2>
                                <p className="text-emerald-50 text-xs font-medium max-w-[200px] mb-4 leading-relaxed">
                                    Master specific topics with instant corrective feedback.
                                </p>
                                <div className="mt-auto inline-flex max-w-fit items-center gap-2 bg-white text-emerald-600 px-4 py-2.5 rounded-xl text-xs font-bold group-active:scale-95 transition-transform shadow-md">
                                    Start Quiz <Play className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                        </button>

                        {/* 3. Flash Cards Banner */}
                        <Link href="/flashcards" className="w-full flex flex-col group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-transform">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Layers className="w-24 h-24 rotate-45" />
                            </div>
                            <div className="relative p-6 flex-1 flex flex-col">
                                <div className="inline-flex max-w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/10">
                                    Active Recall
                                </div>
                                <h2 className="text-xl font-bold mb-2 pr-12">Flash Cards</h2>
                                <p className="text-orange-50 text-xs font-medium max-w-[200px] mb-4 leading-relaxed">
                                    Quickly memorize key points and manual rules.
                                </p>
                                <div className="mt-auto inline-flex max-w-fit items-center gap-2 bg-white text-orange-600 px-4 py-2.5 rounded-xl text-xs font-bold group-active:scale-95 transition-transform shadow-md">
                                    Open Cards <Layers className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                </div>
            </AppScreenWrapper>
        );

}
