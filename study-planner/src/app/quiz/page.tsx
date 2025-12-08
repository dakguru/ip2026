'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, PlayCircle, Trophy, CheckCircle2, XCircle, Timer } from 'lucide-react';
import { QUIZ_DATA } from '@/data/quizzes';
import { QuizSet } from '@/lib/quizTypes';

export default function QuizDashboard() {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedSet, setSelectedSet] = useState<QuizSet | null>(null);

    // Quiz Session State
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({}); // qId -> optionIndex
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Helpers
    const activeTopic = QUIZ_DATA.find(t => t.id === selectedTopic);
    // const completedCount = Object.keys(answers).length;
    const currentQ = selectedSet?.questions[currentQIndex];

    const handleStartSet = (set: QuizSet) => {
        setSelectedSet(set);
        setCurrentQIndex(0);
        setAnswers({});
        setIsSubmitted(false);
    };

    const handleOptionSelect = (qId: string, idx: number) => {
        if (isSubmitted || answers[qId] !== undefined) return;
        setAnswers(prev => ({ ...prev, [qId]: idx }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const calculateScore = () => {
        if (!selectedSet) return 0;
        let score = 0;
        selectedSet.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) score++;
        });
        return score;
    };

    const resetQuiz = () => {
        setSelectedSet(null);
        setAnswers({});
        setIsSubmitted(false);
        setCurrentQIndex(0);
    };

    // VIEW: ACTIVE QUIZ
    if (selectedSet && currentQ) {
        const total = selectedSet.questions.length;
        const score = calculateScore();
        const isAnswered = answers[currentQ.id] !== undefined;

        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors">
                {/* Header */}
                <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-colors">
                    <button onClick={resetQuiz} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Quit Quiz
                    </button>
                    <div className="font-bold text-lg text-zinc-800 dark:text-zinc-100 hidden md:block">{selectedSet.title}</div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-zinc-500 dark:text-zinc-400">Q {currentQIndex + 1} / {total}</span>
                        {!isSubmitted && (
                            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full flex items-center gap-2">
                                <Timer className="w-4 h-4" />
                                <span>Practicing</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-3xl mx-auto w-full p-6">
                    {!isSubmitted ? (
                        <div className="space-y-8">
                            {/* Question Card */}
                            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 transition-colors">
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed mb-8">
                                    {currentQ.text}
                                </h3>
                                <div className="space-y-3">
                                    {currentQ.options.map((opt, idx) => {
                                        const isSelected = answers[currentQ.id] === idx;
                                        const isCorrect = idx === currentQ.correctAnswer;
                                        const showCorrect = isAnswered && isCorrect;
                                        const showWrong = isAnswered && isSelected && !isCorrect;

                                        let buttonStyle = "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300";
                                        let iconStyle = "border-zinc-300 dark:border-zinc-600";

                                        if (showCorrect) {
                                            buttonStyle = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium";
                                            iconStyle = "border-green-500 bg-green-500 text-white";
                                        } else if (showWrong) {
                                            buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-medium";
                                            iconStyle = "border-red-500 bg-red-500 text-white";
                                        } else if (isAnswered) {
                                            buttonStyle = "border-zinc-100 dark:border-zinc-800 opacity-50 dark:text-zinc-500"; // Dim other options
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionSelect(currentQ.id, idx)}
                                                disabled={isAnswered}
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
                                            <p className="text-zinc-700 dark:text-zinc-300">{currentQ.explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between">
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
                                        className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-200 dark:shadow-zinc-900/50"
                                    >
                                        Next Question
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
                                    >
                                        Submit Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        // RESULTS VIEW
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 text-white rounded-full shadow-lg mb-6">
                                    <Trophy className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Quiz Completed!</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                                    You scored <span className="text-zinc-900 dark:text-zinc-100 font-bold">{score} / {total}</span>
                                </p>
                            </div>

                            <div className="space-y-6">
                                {selectedSet.questions.map((q, idx) => {
                                    const userAnswer = answers[q.id];
                                    const isCorrect = userAnswer === q.correctAnswer;

                                    return (
                                        <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? 'border-green-100 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10' : 'border-red-100 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10'}`}>
                                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">{idx + 1}. {q.text}</p>

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
                                                <span className="font-bold text-zinc-400 dark:text-zinc-500 uppercase text-xs tracking-wider block mb-1">Explanation</span>
                                                {q.explanation}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center mt-12 pb-12">
                                <button onClick={resetQuiz} className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // VIEW: TOPIC SELECTION
    if (!selectedTopic) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 transition-colors">
                <div className="max-w-6xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/20">
                            <BrainCircuit className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Quiz Zone</h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg">Select a topic to start practicing.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {QUIZ_DATA.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => setSelectedTopic(topic.id)}
                                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-xl dark:shadow-lg dark:shadow-purple-900/10 transition-all text-left flex flex-col group h-full"
                            >
                                <span className={`text-xs font-bold uppercase tracking-wider mb-2
                                    ${topic.category === 'Paper I' ? 'text-blue-600 dark:text-blue-400' :
                                        topic.category === 'Paper II' ? 'text-purple-600 dark:text-purple-400' : 'text-pink-600 dark:text-pink-400'}
                                `}>{topic.category}</span>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">{topic.title}</h3>
                                <div className="mt-auto pt-4 flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-sm font-medium">
                                    <BrainCircuit className="w-4 h-4" />
                                    <span>{topic.sets.length} Sets Available</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // VIEW: SET SELECTION
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 transition-colors">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => setSelectedTopic(null)} className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Topics
                </button>

                <div className="mb-10">
                    <span className="text-purple-600 dark:text-purple-400 font-bold uppercase text-xs tracking-wider">{activeTopic?.category}</span>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">{activeTopic?.title}</h1>
                </div>

                <div className="space-y-4">
                    {activeTopic?.sets.map((set, idx) => (
                        <button
                            key={set.id}
                            onClick={() => handleStartSet(set)}
                            className="w-full bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-lg transition-all flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 dark:text-zinc-500 font-bold text-lg group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {idx + 1}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-700 dark:group-hover:text-purple-400">{set.title}</h3>
                                    <p className="text-zinc-400 dark:text-zinc-500 text-sm">{set.questions.length} Questions</p>
                                </div>
                            </div>
                            <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-full text-zinc-300 dark:text-zinc-600 group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:text-white transition-all">
                                <PlayCircle className="w-6 h-6" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
