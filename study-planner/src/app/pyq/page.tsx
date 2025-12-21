'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileQuestion, PlayCircle, Trophy, CheckCircle2, XCircle, Timer, AlertCircle, Settings } from 'lucide-react';
import { QUIZ_DATA } from '@/data/quizzes';
import { QuizSet, QuizTopic } from '@/lib/quizTypes';

export default function PyqDashboard() {
    // Navigation State
    const [view, setView] = useState<'topics' | 'config' | 'quiz'>('topics');
    const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
    const [generatedSet, setGeneratedSet] = useState<QuizSet | null>(null);

    // Config State
    const [desiredCount, setDesiredCount] = useState<number>(10);

    // Quiz Session State
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({}); // qId -> optionIndex
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Helpers
    const currentQ = generatedSet?.questions[currentQIndex];

    const resetToDashboard = () => {
        setSelectedTopic(null);
        setGeneratedSet(null);
        setAnswers({});
        setIsSubmitted(false);
        setCurrentQIndex(0);
        setView('topics');
    };

    const handleTopicSelect = (topic: QuizTopic) => {
        setSelectedTopic(topic);
        setView('config');
        setDesiredCount(10); // Default
    };

    const startQuiz = () => {
        if (!selectedTopic) return;

        // 1. Gather all questions from all sets in this topic
        let allQuestions = selectedTopic.sets.flatMap(s => s.questions);

        // 2. Shuffle
        allQuestions = allQuestions.sort(() => Math.random() - 0.5);

        // 3. Slice
        const count = desiredCount === -1 ? allQuestions.length : Math.min(desiredCount, allQuestions.length);
        const finalQuestions = allQuestions.slice(0, count);

        // 4. Create a temporary set
        const tempSet: QuizSet = {
            id: `pyq-${Date.now()}`,
            title: `PYQ Practice: ${selectedTopic.title}`,
            questions: finalQuestions
        };

        setGeneratedSet(tempSet);
        setCurrentQIndex(0);
        setAnswers({});
        setIsSubmitted(false);
        setView('quiz');
    };

    const handleOptionSelect = (qId: string, idx: number) => {
        if (isSubmitted || answers[qId] !== undefined) return;
        setAnswers(prev => ({ ...prev, [qId]: idx }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const calculateScore = () => {
        if (!generatedSet) return 0;
        let score = 0;
        generatedSet.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) score++;
        });
        return score;
    };

    // --- VIEW: CONFIGURATION ---
    if (view === 'config' && selectedTopic) {
        const totalAvailable = selectedTopic.sets.reduce((acc, s) => acc + s.questions.length, 0);

        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
                <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{selectedTopic.title}</h2>
                        <p className="text-zinc-500 mb-8">Customize your practice session.</p>

                        {totalAvailable > 0 ? (
                            <>
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">How many questions do you want to attempt?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[10, 20, 50].filter(n => n <= totalAvailable).map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => setDesiredCount(num)}
                                                className={`p-3 rounded-xl border text-sm font-semibold transition-all
                                                    ${desiredCount === num
                                                        ? 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-700 dark:text-cyan-300'
                                                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}
                                                `}
                                            >
                                                {num} Questions
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setDesiredCount(-1)}
                                            className={`p-3 rounded-xl border text-sm font-semibold transition-all
                                                ${desiredCount === -1
                                                    ? 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-700 dark:text-cyan-300'
                                                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}
                                            `}
                                        >
                                            All Questions ({totalAvailable})
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={startQuiz}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-cyan-200 dark:shadow-cyan-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <PlayCircle className="w-5 h-5" /> Start Practice
                                </button>
                            </>
                        ) : (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-sm flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>We are currently updating the question bank for this topic. Please check back later.</p>
                            </div>
                        )}
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
                        <button onClick={resetToDashboard} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW: ACTIVE QUIZ & RESULTS ---
    if (view === 'quiz' && generatedSet && currentQ) {
        const total = generatedSet.questions.length;
        const score = calculateScore();
        const isAnswered = answers[currentQ.id] !== undefined;

        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors">
                {/* Header */}
                <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <button onClick={resetToDashboard} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Quit
                    </button>
                    <div className="font-bold text-lg text-zinc-800 dark:text-zinc-100 hidden md:block max-w-md truncate">{generatedSet.title}</div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-zinc-500 dark:text-zinc-400">Q {currentQIndex + 1} / {total}</span>
                        {!isSubmitted && (
                            <div className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full flex items-center gap-2">
                                <Timer className="w-4 h-4" />
                                <span>Time Running</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-6">
                    {!isSubmitted ? (
                        <div className="space-y-6 md:space-y-8">
                            {/* Question Card */}
                            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                                <h3 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed mb-6 md:mb-8 whitespace-pre-wrap">
                                    {currentQ.text}
                                </h3>
                                <div className="space-y-3">
                                    {currentQ.options.map((opt, idx) => {
                                        const isSelected = answers[currentQ.id] === idx;
                                        const isAnsweredAlready = answers[currentQ.id] !== undefined;

                                        // Instant Feedback Logic
                                        const isCorrect = idx === currentQ.correctAnswer;
                                        const showCorrect = isAnsweredAlready && isCorrect;
                                        const showWrong = isAnsweredAlready && isSelected && !isCorrect;

                                        let buttonStyle = "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300";
                                        let iconStyle = "border-zinc-300 dark:border-zinc-600";

                                        if (showCorrect) {
                                            buttonStyle = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium";
                                            iconStyle = "border-green-500 bg-green-500 text-white";
                                        } else if (showWrong) {
                                            buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-medium";
                                            iconStyle = "border-red-500 bg-red-500 text-white";
                                        } else if (isAnsweredAlready) {
                                            buttonStyle = "border-zinc-100 dark:border-zinc-800 opacity-50 dark:text-zinc-500";
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionSelect(currentQ.id, idx)}
                                                disabled={isAnsweredAlready}
                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${buttonStyle}`}
                                            >
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${iconStyle}`}>
                                                    {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                    {showWrong && <XCircle className="w-4 h-4 text-white" />}
                                                </div>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {isAnswered && (
                                    <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className={`p-4 rounded-xl border-l-4 ${answers[currentQ.id] === currentQ.correctAnswer ? 'bg-green-50 dark:bg-green-900/10 border-green-500' : 'bg-red-50 dark:bg-red-900/10 border-red-500'}`}>
                                            <p className="font-bold text-sm mb-1 uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Explanation</p>
                                            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{currentQ.explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between pb-8">
                                <button
                                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                                    disabled={currentQIndex === 0}
                                    className="px-6 py-3 rounded-xl font-medium text-zinc-600 dark:text-zinc-400 disabled:opacity-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Previous
                                </button>

                                {currentQIndex < total - 1 ? (
                                    <button
                                        onClick={() => setCurrentQIndex(prev => Math.min(total - 1, prev + 1))}
                                        className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
                                    >
                                        Next Question
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
                                    >
                                        Finish Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        // RESULTS VIEW
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 text-white rounded-full shadow-lg mb-6">
                                    <Trophy className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Paper Completed!</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                                    You scored <span className="text-zinc-900 dark:text-zinc-100 font-bold">{score} / {total} {total > 0 && `(${Math.round(score / total * 100)}%)`}</span>
                                </p>
                                <div className="mt-8">
                                    <button onClick={resetToDashboard} className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg">
                                        Solve Another Paper
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {generatedSet.questions.map((q, idx) => {
                                    const userAnswer = answers[q.id];
                                    const isCorrect = userAnswer === q.correctAnswer;

                                    return (
                                        <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? 'border-green-100 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10' : 'border-red-100 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10'}`}>
                                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 whitespace-pre-wrap">{idx + 1}. {q.text}</p>

                                            <div className="space-y-2 mb-4">
                                                {q.options.map((opt, oIdx) => (
                                                    <div key={oIdx} className={`flex items-center gap-3 p-2 rounded-lg text-sm
                                                        ${oIdx === q.correctAnswer ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium' :
                                                            (oIdx === userAnswer && !isCorrect) ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'text-zinc-500 dark:text-zinc-400'}
                                                    `}>
                                                        {oIdx === q.correctAnswer ? <CheckCircle2 className="w-4 h-4 shrink-0" /> :
                                                            (oIdx === userAnswer && !isCorrect) ? <XCircle className="w-4 h-4 shrink-0" /> :
                                                                <div className="w-4 h-4" />}
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="text-sm bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300">
                                                <span className="font-bold block mb-1">Explanation:</span>
                                                {q.explanation}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- VIEW: TOPIC SELECTION (DASHBOARD) ---
    const pyqTopics = QUIZ_DATA.filter(t => t.category === 'PYQ');

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 transition-colors">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/20">
                        <FileQuestion className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Previous Year Papers</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg">Practice with real exam questions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pyqTopics.map(topic => (
                        <button
                            key={topic.id}
                            onClick={() => handleTopicSelect(topic)}
                            className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-cyan-200 dark:hover:border-cyan-700/50 hover:shadow-xl dark:shadow-lg dark:shadow-cyan-900/10 transition-all text-left flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FileQuestion className="w-24 h-24 text-cyan-600" />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-wider mb-2 text-cyan-600 dark:text-cyan-400">
                                {topic.category}
                            </span>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors z-10">{topic.title}</h3>

                            <div className="mt-auto pt-4 flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-sm font-medium z-10">
                                {topic.sets.reduce((acc, s) => acc + s.questions.length, 0) > 0 ? (
                                    <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <CheckCircle2 className="w-4 h-4" /> {topic.sets.reduce((acc, s) => acc + s.questions.length, 0)} Questions
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Settings className="w-4 h-4" /> Coming Soon
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
