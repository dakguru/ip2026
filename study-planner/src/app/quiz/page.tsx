'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, PlayCircle, Trophy, CheckCircle2, XCircle, Timer, Settings, AlertCircle, Lock } from 'lucide-react';
import { QUIZ_DATA } from '@/data/quizzes';
import { QuizSet, QuizTopic } from '@/lib/quizTypes';
import { useIsMobileApp } from '@/hooks/use-mobile-app';
import NativeQuizRunner from '@/components/quiz/NativeQuizRunner';
import NativeResultScreen from '@/components/quiz/NativeResultScreen';
import NativeQuizDashboard from '@/components/quiz/NativeQuizDashboard';

// Custom styles for range slider
const sliderStyles = `
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #9333ea, #3b82f6);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.6);
  }
  
  input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1.1);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #9333ea, #3b82f6);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.6);
  }
  
  input[type="range"]::-moz-range-thumb:active {
    transform: scale(1.1);
  }
`;

const ALLOWED_FREE_TOPICS = ['p1-4', 'p1-5', 'p1-32'];

export default function QuizDashboard() {
    // Navigation State
    const [view, setView] = useState<'topics' | 'config' | 'quiz'>('topics');
    const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
    const [generatedSet, setGeneratedSet] = useState<QuizSet | null>(null);

    const isMobileApp = useIsMobileApp();

    // Membership State
    const [membershipLevel, setMembershipLevel] = useState<string>('free');
    const [userName, setUserName] = useState<string>("Aspirant");

    useEffect(() => {
        try {
            const cookie = document.cookie.split('; ').find(row => row.startsWith('user_session='));
            if (cookie) {
                const value = cookie.split('=')[1];
                const decoded = decodeURIComponent(value);
                const session = JSON.parse(decoded);
                if (session && session.membershipLevel) {
                    setMembershipLevel(session.membershipLevel);
                }
                if (session && session.name) {
                    setUserName(session.name);
                }
            }
        } catch (e) {
            console.error("Failed to parse session", e);
        }
    }, []);

    // Config State
    const [quizRange, setQuizRange] = useState<{ start: number; end: number }>({ start: 1, end: 10 });

    // Quiz Session State
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({}); // qId -> optionIndex
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    // Helpers
    // const activeTopic = QUIZ_DATA.find(t => t.id === selectedTopic);
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
        // Double check locked state (though UI should prevent it)
        const isLocked = !['gold', 'silver'].includes(membershipLevel.toLowerCase()) && !ALLOWED_FREE_TOPICS.includes(topic.id);

        if (isLocked) {
            // Optional: Show upgrade modal or redirect
            return;
        }

        setSelectedTopic(topic);
        setView('config');
        // Reset range to default 1-10 or max available
        const total = topic.sets.reduce((acc, s) => acc + s.questions.length, 0);
        setQuizRange({ start: 1, end: Math.min(10, total) });
    };

    const startQuiz = () => {
        if (!selectedTopic) return;

        // 1. Gather all questions
        let allQuestions = selectedTopic.sets.flatMap(s => s.questions);

        // 2. Select Range (1-based inputs converted to 0-based indices)
        const startIdx = Math.max(0, quizRange.start - 1);
        const endIdx = Math.min(allQuestions.length, quizRange.end);

        const selectedQuestions = allQuestions.slice(startIdx, endIdx);

        if (selectedQuestions.length === 0) return;

        // 3. Shuffle SELECTED questions (Optional, but good for quiz feel)
        const finalQuestions = selectedQuestions.sort(() => Math.random() - 0.5);

        // 4. Create a temporary set
        const tempSet: QuizSet = {
            id: `practice-${Date.now()}`,
            title: `Practice: ${selectedTopic.title}`,
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

    const submitQuizResults = async (finalAnswers: Record<string, number>, finalScore: number, correct: number, wrong: number) => {
        setIsSubmitted(true);
        // Update local state to show results (if we are in web mode OR if we want to show shared result view)
        // For native mode, we might want to stay in native result view or just use the same result view.
        // Let's reuse the existing result view infrastructure by syncing the answers up.
        setAnswers(finalAnswers);

        try {
            await fetch('/api/quiz/result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topicId: selectedTopic?.id || 'unknown',
                    topicTitle: generatedSet?.title.replace('Practice: ', '') || 'Practice',
                    score: finalScore,
                    totalQuestions: generatedSet?.questions.length || 0,
                    correctAnswers: correct,
                    wrongAnswers: wrong
                })
            });
        } catch (err) {
            console.error('Failed to save progress:', err);
        }
    };

    const handleSubmit = async () => {
        if (!generatedSet) return;

        let score = 0;
        let correct = 0;
        let wrong = 0;
        generatedSet.questions.forEach(q => {
            const ans = answers[q.id];
            if (ans === q.correctAnswer) {
                score++;
                correct++;
            } else if (ans !== undefined) {
                wrong++;
            }
        });

        await submitQuizResults(answers, score, correct, wrong);
    };

    const handleNativeComplete = async (finalAnswers: Record<string, number>, timeTaken: number) => {
        if (!generatedSet) return;

        let score = 0;
        let correct = 0;
        let wrong = 0;
        generatedSet.questions.forEach(q => {
            const ans = finalAnswers[q.id];
            if (ans === q.correctAnswer) {
                score++;
                correct++;
            } else if (ans !== undefined) {
                wrong++;
            }
        });

        // Sync state back to parent so we can show result screen
        setAnswers(finalAnswers);
        setTimeTaken(timeTaken);
        await submitQuizResults(finalAnswers, score, correct, wrong);
    };

    const calculateScore = () => {
        if (!generatedSet) return 0;
        let score = 0;
        generatedSet.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) score++;
        });
        return score;
    };

    // --- VIEW: ACTIVE QUIZ & RESULTS ---
    if (view === 'quiz' && generatedSet && currentQ) {

        // Native App Quiz Runner (Only when active doing quiz, loop back to web results for now or keep consistency)
        // If submitted, show shared result view
        if (isMobileApp && !isSubmitted) {
            return (
                <NativeQuizRunner
                    quizTitle={generatedSet.title}
                    questions={generatedSet.questions}
                    onComplete={handleNativeComplete}
                    onExit={resetToDashboard}
                    aspirantName={userName}
                />
            );
        }

        if (isMobileApp && isSubmitted) {
            return (
                <NativeResultScreen
                    score={calculateScore()}
                    totalQuestions={generatedSet.questions.length}
                    questions={generatedSet.questions}
                    answers={answers}
                    timeTaken={timeTaken}
                    onBack={resetToDashboard}
                />
            );
        }

        const total = generatedSet.questions.length;
        const score = calculateScore();
        const isAnswered = answers[currentQ.id] !== undefined;

        if (total === 0) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
                    <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">No Questions Available</h2>
                        <p className="text-zinc-500 mb-6">This topic currently has no questions uploaded.</p>
                        <button onClick={resetToDashboard} className="px-6 py-2 bg-zinc-900 text-white rounded-lg">Go Back</button>
                    </div>
                </div>
            )
        }

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
                            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full flex items-center gap-2">
                                <Timer className="w-4 h-4" />
                                <span>Practicing</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-6">
                    {!isSubmitted ? (
                        <div className="space-y-6 md:space-y-8">
                            {/* Question Card */}
                            <div className="relative bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                                {/* Watermark */}
                                <img
                                    src="/official-logo.png"
                                    alt=""
                                    className="absolute inset-0 m-auto w-40 opacity-[0.12] pointer-events-none select-none z-0 object-contain"
                                />

                                <div className="relative z-10">
                                    <h3 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed mb-6 md:mb-8 whitespace-pre-wrap">
                                        {currentQ.text}
                                    </h3>
                                    <div className="space-y-3">
                                        {currentQ.options.map((opt, idx) => {
                                            const isSelected = answers[currentQ.id] === idx;
                                            const isAnsweredAlready = answers[currentQ.id] !== undefined;

                                            // Visual Feedback Logic
                                            // If answered: show correctness immediately if that's the desired UX (Instant Feedback)
                                            // Based on existing code, it does show instant feedback.

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
                                                <p className="text-zinc-700 dark:text-zinc-300">{currentQ.explanation}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
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
                                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Pactice Completed!</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                                    You scored <span className="text-zinc-900 dark:text-zinc-100 font-bold">{score} / {total} {total > 0 && `(${Math.round(score / total * 100)}%)`}</span>
                                </p>
                            </div>

                            <div className="space-y-6">
                                {generatedSet.questions.map((q, idx) => {
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

                            <div className="flex justify-center mt-12">
                                <button onClick={resetToDashboard} className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- VIEW: CONFIGURATION ---
    if (view === 'config' && selectedTopic) {
        const availableQuestions = selectedTopic.sets.reduce((acc, set) => acc + set.questions.length, 0);

        // Calculate 20% Chunks
        const chunkSize = Math.ceil(availableQuestions / 5);
        const chunks = Array.from({ length: 5 }, (_, i) => {
            const start = i * chunkSize + 1;
            const end = Math.min((i + 1) * chunkSize, availableQuestions);
            return { start, end };
        }).filter(c => c.start <= availableQuestions);

        return (
            <>
                <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
                <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 flex items-center justify-center transition-colors">
                    <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-xl dark:shadow-purple-900/10 border border-zinc-100 dark:border-zinc-800 p-8">
                        <button onClick={() => setView('topics')} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-2 mb-6">
                            <ArrowLeft className="w-4 h-4" /> Change Topic
                        </button>

                        <div className="mb-8">
                            <span className="text-purple-600 dark:text-purple-400 font-bold uppercase text-xs tracking-wider">{selectedTopic.category}</span>
                            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">{selectedTopic.title}</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4" />
                                {availableQuestions} Questions available
                            </p>
                        </div>

                        {availableQuestions > 0 ? (
                            <>
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-6">How many questions do you want to attempt?</label>

                                    {/* Slider and Input Container */}
                                    <div className="space-y-6">

                                        {/* Dual Input Box */}
                                        <div className="flex items-center justify-center gap-4">
                                            {/* Start Input */}
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={quizRange.end}
                                                    value={quizRange.start}
                                                    onChange={(e) => {
                                                        const val = Math.max(1, Math.min(parseInt(e.target.value) || 1, quizRange.end));
                                                        setQuizRange(prev => ({ ...prev, start: val }));
                                                    }}
                                                    className="w-24 px-3 py-3 text-center text-xl font-bold bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-purple-500 transition-all"
                                                />
                                                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                                                    Start
                                                </div>
                                            </div>

                                            <div className="text-zinc-300 dark:text-zinc-600 font-bold">——</div>

                                            {/* End Input */}
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    min={quizRange.start}
                                                    max={availableQuestions}
                                                    value={quizRange.end}
                                                    onChange={(e) => {
                                                        const val = Math.max(quizRange.start, Math.min(parseInt(e.target.value) || availableQuestions, availableQuestions));
                                                        setQuizRange(prev => ({ ...prev, end: val }));
                                                    }}
                                                    className="w-24 px-3 py-3 text-center text-xl font-bold bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-purple-500 transition-all"
                                                />
                                                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                                                    End
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dual Handle Slider */}
                                        <div className="px-2 py-4">
                                            <div className="relative w-full h-8 flex items-center">
                                                {/* Track Background */}
                                                <div className="absolute left-0 right-0 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>

                                                {/* Active Range Highlight */}
                                                <div
                                                    className="absolute h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full z-10 pointer-events-none"
                                                    style={{
                                                        left: `${((quizRange.start - 1) / availableQuestions) * 100}%`,
                                                        width: `${((quizRange.end - quizRange.start + 1) / availableQuestions) * 100}%`
                                                    }}
                                                ></div>

                                                {/* Hidden Dual Inputs for Thumb Interaction */}
                                                {/* Start Thumb Input - Controls 'start' */}
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max={availableQuestions}
                                                    value={quizRange.start}
                                                    onChange={(e) => {
                                                        const val = Math.min(parseInt(e.target.value), quizRange.end);
                                                        setQuizRange(prev => ({ ...prev, start: Math.max(1, val) }));
                                                    }}
                                                    className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
                                                    style={{ pointerEvents: 'none' }}
                                                />
                                                {/* Note: Standard Range inputs don't allow multi-handle easily.
                                                    We need to use the trick where input has 'pointer-events: none' but the thumb has 'auto'.
                                                    However, standard CSS 'pointer-events' on pseudo-elements is not universally supported or easy to inline.
                                                    
                                                    Alternative simplified approach for reliability without libraries:
                                                    Just use the two inputs absolute positioned.
                                                    The problem is 'zIndex' interaction. The one on top blocks the one below.
                                                    
                                                    Trick: 
                                                    If we really want dual handles, we need to be clever.
                                                    Or we can just rely on the number inputs above for precise control and just use a visual representation here?
                                                    No, the design requires knobs.
                                                    
                                                    Let's try to implement the pointer-events trick via the style tag we already inject.
                                                 */}
                                                <style jsx>{`
                                                    input[type=range].dual-range {
                                                        pointer-events: none;
                                                        position: absolute;
                                                        left: 0;
                                                        top: 0;
                                                        width: 100%;
                                                        height: 100%;
                                                        -webkit-appearance: none;
                                                        background: transparent;
                                                        z-index: 20;
                                                    }
                                                    input[type=range].dual-range::-webkit-slider-thumb {
                                                        pointer-events: auto; /* Enable pointer events on thumb */
                                                        position: relative;
                                                        z-index: 30;
                                                        -webkit-appearance: none;
                                                        width: 24px;
                                                        height: 24px;
                                                        border-radius: 50%;
                                                        background: linear-gradient(135deg, #9333ea, #3b82f6);
                                                        cursor: pointer;
                                                        box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
                                                        border: 2px solid white;
                                                        margin-top: -10px; /* Center vertially relative to track if track is standard, but here we set h-full */
                                                    }
                                                    /* For Firefox */
                                                    input[type=range].dual-range::-moz-range-thumb {
                                                        pointer-events: auto;
                                                        z-index: 30;
                                                        width: 24px;
                                                        height: 24px;
                                                        border-radius: 50%;
                                                        background: linear-gradient(135deg, #9333ea, #3b82f6);
                                                        cursor: pointer;
                                                        border: 2px solid white;
                                                    }
                                                 `}</style>

                                                <input
                                                    type="range"
                                                    min="1"
                                                    max={availableQuestions}
                                                    value={quizRange.start}
                                                    onChange={(e) => {
                                                        const val = Math.min(parseInt(e.target.value), quizRange.end);
                                                        setQuizRange(prev => ({ ...prev, start: Math.max(1, val) }));
                                                    }}
                                                    className="dual-range"
                                                />
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max={availableQuestions}
                                                    value={quizRange.end}
                                                    onChange={(e) => {
                                                        const val = Math.max(parseInt(e.target.value), quizRange.start);
                                                        setQuizRange(prev => ({ ...prev, end: val }));
                                                    }}
                                                    className="dual-range"
                                                />
                                            </div>

                                            <div className="flex justify-between mt-4 text-xs font-semibold text-zinc-400">
                                                <span>1</span>
                                                <span>{availableQuestions}</span>
                                            </div>
                                        </div>

                                        {/* Smart Batches (20% Segments) */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Select Batch (20%)</span>
                                                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {chunks.map((chunk, index) => {
                                                    const isActive = quizRange.start === chunk.start && quizRange.end === chunk.end;
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => setQuizRange({ start: chunk.start, end: chunk.end })}
                                                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border
                                                                ${isActive
                                                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 shadow-sm'
                                                                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400'}
                                                            `}
                                                        >
                                                            {chunk.start}-{chunk.end}
                                                        </button>
                                                    );
                                                })}
                                                <button
                                                    onClick={() => setQuizRange({ start: 1, end: availableQuestions })}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border
                                                        ${quizRange.start === 1 && quizRange.end === availableQuestions
                                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 shadow-sm'
                                                            : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'}
                                                    `}
                                                >
                                                    All ({availableQuestions})
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={startQuiz}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-200 dark:shadow-purple-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <PlayCircle className="w-5 h-5" /> Start Practice
                                </button>
                            </>
                        ) : (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-sm flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>We are currently updating the question bank for this topic. Please check back later or try another topic.</p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }

    // --- VIEW: TOPIC SELECTION (DASHBOARD) ---
    const paper1Topics = QUIZ_DATA.filter(t => t.category === 'Paper I');
    const paper3Topics = QUIZ_DATA.filter(t => t.category === 'Paper III');

    const isUnlocked = (topicId: string) => {
        return ['gold', 'silver'].includes(membershipLevel.toLowerCase()) || ALLOWED_FREE_TOPICS.includes(topicId);
    };

    if (isMobileApp) {
        return (
            <NativeQuizDashboard
                paper1Topics={paper1Topics}
                paper3Topics={paper3Topics}
                onSelectTopic={handleTopicSelect}
                isUnlocked={isUnlocked}
            />
        );
    }

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
                        <Link href="/mock-tests" className="inline-flex items-center gap-2 px-4 py-2 mt-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors border border-amber-200 dark:border-amber-800 group">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span>Looking for Live All India Mock Tests? <span className="group-hover:underline decoration-amber-400 underline-offset-2 font-bold ml-1">Click here</span></span>
                        </Link>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Paper I Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Paper I</h2>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {paper1Topics.map(topic => (
                                <TopicCard
                                    key={topic.id}
                                    topic={topic}
                                    onSelect={handleTopicSelect}
                                    isLocked={!isUnlocked(topic.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Paper III Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Paper III</h2>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {paper3Topics.map(topic => (
                                <TopicCard
                                    key={topic.id}
                                    topic={topic}
                                    onSelect={handleTopicSelect}
                                    isLocked={!isUnlocked(topic.id)}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function TopicCard({ topic, onSelect, isLocked = false }: { topic: QuizTopic, onSelect: (t: QuizTopic) => void, isLocked?: boolean }) {
    const qCount = topic.sets.reduce((acc, s) => acc + s.questions.length, 0);

    const Content = () => (
        <>
            <div className={`absolute top-0 right-0 p-3 md:p-4 transition-opacity ${isLocked ? 'opacity-10' : 'opacity-5 group-hover:opacity-10'}`}>
                <BrainCircuit className="w-16 h-16 md:w-24 md:h-24 text-purple-600" />
            </div>

            <span className={`text-xs font-bold uppercase tracking-wider mb-2
                ${topic.category === 'Paper I' ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400'}
            `}>{topic.category}</span>
            <h3 className="text-sm md:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors z-10 pr-2 leading-tight">{topic.title}</h3>

            <div className="mt-auto pt-3 md:pt-4 flex items-center justify-between z-10 w-full">
                <div className="text-zinc-400 dark:text-zinc-500 text-xs md:text-sm font-medium">
                    {isLocked ? (
                        <div className="flex items-center gap-2 text-zinc-500">
                            <Lock className="w-4 h-4" />
                            <span>Locked</span>
                        </div>
                    ) : (
                        qCount > 0 ? (
                            <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <CheckCircle2 className="w-4 h-4" /> {qCount} Questions
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Settings className="w-4 h-4" /> Coming Soon
                            </span>
                        )
                    )}
                </div>

                {isLocked && (
                    <Link href="/pricing" className="relative z-20 px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow hover:shadow-lg transition-shadow hover:scale-105 active:scale-95">
                        Upgrade
                    </Link>
                )}
            </div>
        </>
    );

    const baseClasses = `group bg-white dark:bg-zinc-900 p-4 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-all text-left flex flex-col h-full relative overflow-hidden
        ${isLocked ? 'opacity-70 grayscale-[0.5]' : 'hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-xl dark:shadow-lg dark:shadow-purple-900/10 cursor-pointer'}
    `;

    if (isLocked) {
        return (
            <div className={baseClasses}>
                <Content />
            </div>
        );
    }

    return (
        <button
            onClick={() => onSelect(topic)}
            className={baseClasses}
        >
            <Content />
        </button>
    );
}
