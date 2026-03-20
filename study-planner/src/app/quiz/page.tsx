'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, PlayCircle, Trophy, CheckCircle2, XCircle, Timer, Settings, AlertCircle, Lock, ChevronRight, ArrowRight } from 'lucide-react';
import { QUIZ_DATA } from '@/data/quizzes';
import { PSGB_QUIZ_DATA } from '@/data/psgbQuizzesData';
import { QuizSet, QuizTopic } from '@/lib/quizTypes';
import { useIsMobileApp } from '@/hooks/use-mobile-app';
import { useIsMobile } from '@/hooks/use-is-mobile';
import NativeQuizRunner from '@/components/quiz/NativeQuizRunner';
import NativeResultScreen from '@/components/quiz/NativeResultScreen';
import NativeQuizDashboard from '@/components/quiz/NativeQuizDashboard';
import { useCourse } from '@/contexts/CourseContext';
import AppScreenWrapper from '@/components/AppScreenWrapper';
import { getMembershipLevel } from '@/lib/membership-utils';
import FormattedQuestionText from '@/components/quiz/FormattedQuestionText';
import ConfirmExitModal from '@/components/ConfirmExitModal';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import HomeHeader from '@/components/HomeHeader';

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
  input[type="range"]::-moz-range-thumb:active {
    transform: scale(1.1);
  }
`;

const getSliderStyles = (isPS: boolean) => sliderStyles.replace(/#9333ea/g, isPS ? '#0d9488' : '#9333ea').replace(/#3b82f6/g, isPS ? '#06b6d4' : '#3b82f6').replace(/147, 51, 234/g, isPS ? '13, 148, 136' : '147, 51, 234');

const ALLOWED_FREE_TOPICS = ['p1-4', 'p1-5', 'p1-32'];

export default function QuizDashboard() {
    const { course } = useCourse();
    const isPS = course === 'PS_GR_B';
    // Navigation State
    const [view, setView] = useState<'topics' | 'config' | 'quiz'>('topics');
    const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
    const [generatedSet, setGeneratedSet] = useState<QuizSet | null>(null);

    const isNativeApp = useIsMobileApp();
    const isMobileScreen = useIsMobile();
    // Treat mobile browser as "Mobile App" for UI purposes
    const isMobileApp = isNativeApp || isMobileScreen;

    // Membership State
    const [membershipLevel, setMembershipLevel] = useState<string>('free');
    const [planId, setPlanId] = useState<string>('');
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
                if (session && session.planId) {
                    setPlanId(session.planId);
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
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const viewRef = useRef(view);
    const isSubmittedRef = useRef(isSubmitted);
    const showExitConfirmRef = useRef(showExitConfirm);
    
    useEffect(() => {
        viewRef.current = view;
        isSubmittedRef.current = isSubmitted;
        showExitConfirmRef.current = showExitConfirm;
    }, [view, isSubmitted, showExitConfirm]);

    // --- ANDROID BACK BUTTON HANDLING ---
    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;

        const listenerPromise = App.addListener('backButton', (data) => {
            const currentView = viewRef.current;
            const submitted = isSubmittedRef.current;
            
            if (showExitConfirmRef.current) {
                setShowExitConfirm(false);
                return;
            }

            if (currentView === 'quiz' && !submitted) {
                // Let NativeQuizRunner handle its own back intercept.
                // We do nothing, which stops Capacitor from natively going back.
                return;
            } else if (currentView === 'quiz' && submitted) {
                resetToDashboard();
            } else if (currentView === 'config') {
                setView('topics');
            } else {
                if (data.canGoBack) {
                    window.history.back();
                } else {
                    App.exitApp();
                }
            }
        });

        return () => {
            listenerPromise.then(handle => handle.remove());
        };
    }, []);

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
        const isLocked = !isUnlocked(topic.id);

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
            title: `Study: ${selectedTopic.title}`,
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
                    topicTitle: generatedSet?.title.replace('Study: ', '') || 'Study',
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
            <AppScreenWrapper hideStatusBarPadding={true}>
                <div className="bg-slate-50 dark:bg-zinc-950 font-sans text-slate-800 dark:text-zinc-200 min-h-screen">
                    <div className={`relative w-full overflow-hidden transition-all duration-500 pt-[max(24px,env(safe-area-inset-top,0px))] pb-16 shadow-lg
                        ${isPS 
                            ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-indigo-900 border-b border-teal-700/50' 
                            : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-purple-700/50'
                        }
                    `}>
                        {/* Immersive Background Elements */}
                        <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none overflow-hidden mix-blend-screen">
                            <div className={`absolute -top-12 -right-12 w-64 h-64 blur-[80px] rounded-full ${isPS ? 'bg-cyan-500/50' : 'bg-pink-500/50'}`}></div>
                            <div className={`absolute bottom-0 -left-12 w-48 h-48 blur-[60px] rounded-full ${isPS ? 'bg-emerald-500/50' : 'bg-blue-500/50'}`}></div>
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdi0xSDB2MXptMCAyMGg0MHYtMUgwdjF6TTEwIDB2NDBoLTFWMGgxeptMTAgMHY0MGgtMVYwaDF6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                        </div>

                        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-5 mt-4">
                            {/* Top Bar: Back & Counter */}
                            <div className="flex items-center justify-between text-white">
                                <button onClick={resetToDashboard} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors text-xs font-semibold select-none group shadow-sm">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Quizzes
                                </button>
                                <div className="flex items-center gap-2 select-none bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                                    <Timer className="w-4 h-4 opacity-80" />
                                    <span className="font-bold text-xs tracking-wider">Q {currentQIndex + 1} <span className="opacity-60">OF</span> {total}</span>
                                </div>
                            </div>

                            {/* Main Title Area */}
                            <div className="flex flex-col items-start gap-2.5 mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/50 shadow-sm shrink-0 bg-white">
                                        <img src="/dak-guru-new-logo.png" alt="Dak Guru" className="w-full h-full object-cover scale-110" />
                                    </div>
                                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded shadow-sm border border-white/20
                                        ${isPS ? 'bg-teal-500/30 text-teal-100' : 'bg-purple-500/30 text-purple-100'}
                                    `}>Practice Session</span>
                                </div>
                                
                                <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md line-clamp-3">
                                    {generatedSet.title.replace('Study: ', '')}
                                </h1>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-black/30 h-1.5 rounded-full mt-2 overflow-hidden border border-white/10 shadow-inner">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${isPS ? 'bg-gradient-to-r from-teal-400 to-cyan-400' : 'bg-gradient-to-r from-purple-400 to-pink-400'}`}
                                    style={{ width: `${((currentQIndex + 1) / total) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                {/* Content */}
                <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 relative z-20 pb-12" style={{ marginTop: '-2rem' }}>
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
                                    <FormattedQuestionText
                                        text={currentQ.text}
                                        className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed md:mb-8"
                                    />
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
                                                <FormattedQuestionText text={currentQ.explanation || ""} className="text-zinc-700 dark:text-zinc-300 text-sm" />
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
                                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Study Completed!</h2>
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

                                            <div className="text-sm bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
                                                <span className="font-bold text-zinc-400 dark:text-zinc-500 uppercase text-xs tracking-wider block mb-1">Explanation</span>
                                                {q.explanation}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center mt-12">
                                <Link href="/" className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </AppScreenWrapper>
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
                <style dangerouslySetInnerHTML={{ __html: getSliderStyles(isPS) }} />
                <AppScreenWrapper
                    header={
                        <div className="flex items-center gap-3">
                            <button onClick={() => setView('topics')} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 p-1.5 -ml-1.5 rounded-xl transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{selectedTopic.title}</h2>
                        </div>
                    }
                >
                    <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                        <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-xl dark:shadow-purple-900/10 border border-zinc-100 dark:border-zinc-800 p-8">
                            <button onClick={() => setView('topics')} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-2 mb-6">
                                <ArrowLeft className="w-4 h-4" /> Change Topic
                            </button>

                            <div className="mb-8">
                                <span className={`font-bold uppercase text-xs tracking-wider ${isPS ? 'text-teal-600 dark:text-teal-400' : 'text-purple-600 dark:text-purple-400'}`}>{selectedTopic.category}</span>
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
                                                        background: linear-gradient(135deg, ${isPS ? '#0d9488, #06b6d4' : '#9333ea, #3b82f6'});
                                                        cursor: pointer;
                                                        box-shadow: 0 2px 8px ${isPS ? 'rgba(13, 148, 136, 0.4)' : 'rgba(147, 51, 234, 0.4)'};
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
                                                        background: linear-gradient(135deg, ${isPS ? '#0d9488, #06b6d4' : '#9333ea, #3b82f6'});
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
                                                                        ? (isPS ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700 shadow-sm' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 shadow-sm')
                                                                        : (isPS ? 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-teal-300 dark:hover:border-teal-600 hover:text-teal-600 dark:hover:text-teal-400' : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400')}
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
                                        className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg ${isPS ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-teal-200 dark:shadow-teal-900/20' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-200 dark:shadow-purple-900/20'} transition-all active:scale-95 flex items-center justify-center gap-2`}
                                    >
                                        <PlayCircle className="w-5 h-5" /> Start Study
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
                </AppScreenWrapper>
            </>
        )
    }

    // --- VIEW: TOPIC SELECTION (DASHBOARD) ---
    const activeData = isPS ? PSGB_QUIZ_DATA : QUIZ_DATA;
    const group1Topics = activeData.filter(t => t.category === 'Paper I');
    const group2Title = isPS ? 'Paper II' : 'Paper III';
    const group2Topics = activeData.filter(t => t.category === group2Title);

    const isUnlocked = (topicId: string) => {
        // Use numeric level equivalence: Free=1, Silver/Platinum=2, Gold/Diamond=3
        const userLevel = getMembershipLevel(membershipLevel);
        if (userLevel >= 2) return true; // Silver/Platinum/Gold/Diamond can access all quiz topics
        return ALLOWED_FREE_TOPICS.includes(topicId); // Free users only get allowed topics
    };

    if (isMobileApp) {
        return (
            <NativeQuizDashboard
                group1Topics={group1Topics}
                group2Topics={group2Topics}
                group2Title={group2Title}
                onSelectTopic={handleTopicSelect}
                isUnlocked={isUnlocked}
            />
        );
    }

    return (
        <AppScreenWrapper hideStatusBarPadding={true}>
            <div className="bg-slate-50 dark:bg-zinc-950 font-sans text-slate-800 dark:text-zinc-200 min-h-screen pb-20">
                <HomeHeader isLoggedIn={true} membershipLevel={membershipLevel as any} />
                
                {/* Full-Length Quiz Zone Hero Banner */}
                <div className={`relative w-full overflow-hidden transition-all duration-500 pb-20 pt-16 md:pb-28 md:pt-20
                    ${isPS 
                        ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-indigo-900' 
                        : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
                    }
                `}>
                    {/* Immersive Background Elements */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none overflow-hidden mix-blend-screen">
                        {/* Glow 1 */}
                        <div className={`absolute -top-24 -right-24 w-96 h-96 blur-[100px] rounded-full
                            ${isPS ? 'bg-cyan-500/50' : 'bg-pink-500/50'}
                        `}></div>
                        {/* Glow 2 */}
                        <div className={`absolute -bottom-24 -left-24 w-80 h-80 blur-[80px] rounded-full
                            ${isPS ? 'bg-emerald-500/50' : 'bg-blue-500/50'}
                        `}></div>
                        {/* Grid Pattern */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdi0xSDB2MXptMCAyMGg0MHYtMUgwdjF6TTEwIDB2NDBoLTFWMGgxeptMTAgMHY0MGgtMVYwaDF6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                    </div>

                    {/* Banner Content */}
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                            <div className="flex-1 text-center md:text-left">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6
                                    ${isPS ? 'text-teal-100' : 'text-purple-100'} text-xs font-bold uppercase tracking-wider shadow-inner
                                `}>
                                    <BrainCircuit className="w-3.5 h-3.5" />
                                    Active Recall
                                </div>
                                
                                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight drop-shadow-lg">
                                    {isPS ? 'PS Gr B Quiz Zone' : 'LDCE IP Quiz Zone'} <br className="hidden md:block" />
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r drop-shadow-none ${isPS ? 'from-teal-300 to-cyan-300' : 'from-purple-300 to-pink-300'}`}>
                                        Master Your Syllabus
                                    </span>
                                </h2>
                                
                                <p className="text-zinc-200 text-sm md:text-base max-w-xl mx-auto md:mx-0 font-medium leading-relaxed opacity-90 drop-shadow-sm">
                                    Engage with premium topic-wise quizzes, get instant corrective feedback, and repeatedly test your knowledge for the final examination.
                                </p>
                            </div>

                            {/* Decorative Visual Element */}
                            <div className="hidden lg:flex w-48 h-48 lg:w-64 lg:h-64 relative shrink-0 z-20 items-center justify-center">
                                <div className={`absolute inset-0 rounded-[2.5rem] rotate-6 opacity-30 ${isPS ? 'bg-teal-400' : 'bg-purple-400'}`}></div>
                                <div className={`absolute inset-0 rounded-[2.5rem] -rotate-6 opacity-40 ${isPS ? 'bg-cyan-400' : 'bg-pink-400'} backdrop-blur-md border border-white/20`}></div>
                                <div className={`absolute inset-0 bg-gradient-to-br ${isPS ? 'from-white/20 to-white/5' : 'from-white/20 to-white/5'} rounded-[2.5rem] shadow-2xl flex items-center justify-center backdrop-blur-xl border border-white/30 p-8`}>
                                   <BrainCircuit className="w-full h-full text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] opacity-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10 mb-12">
                    {/* Secondary Box: Live Mock Tests */}
                    <Link href="/mock-tests" className="group block relative overflow-hidden w-full rounded-[1.5rem] p-6 shadow-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 border border-amber-300/30 hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-white">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shrink-0">
                                    <Trophy className="w-6 h-6 text-white drop-shadow-md" />
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="inline-flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-white/20 shadow-sm">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-300"></span>
                                        </span>
                                        Live Now
                                    </div>
                                    <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight">
                                        Accelerate Your Preparation With Live Mock Tests
                                    </h3>
                                    <p className="text-white/90 text-xs md:text-sm font-medium mt-1">
                                        Compete with thousands of aspirants across India and get real-time rankings.
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md group-hover:shadow-xl transition-all">
                                Join Series
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    <div className="space-y-12 mt-12 pb-12">
                        {/* Paper I Section */}
                        <section>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Paper I</h2>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {group1Topics.map(topic => (
                                <TopicCard
                                    key={topic.id}
                                    topic={topic}
                                    onSelect={handleTopicSelect}
                                    isLocked={!isUnlocked(topic.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Group 2 Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{group2Title}</h2>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {group2Topics.map(topic => (
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
            <ConfirmExitModal 
                isOpen={showExitConfirm}
                onConfirm={() => {
                    setShowExitConfirm(false);
                    resetToDashboard();
                }}
                onCancel={() => setShowExitConfirm(false)}
            />
        </AppScreenWrapper>
    );
}
function TopicCard({ topic, onSelect, isLocked = false }: { topic: QuizTopic, onSelect: (t: QuizTopic) => void, isLocked?: boolean }) {
    const { course } = useCourse();
    const isPS = course === 'PS_GR_B';
    const qCount = topic.sets.reduce((acc, s) => acc + s.questions.length, 0);

    const Content = () => (
        <>
            <div className={`absolute top-0 right-0 p-3 md:p-4 transition-opacity ${isLocked ? 'opacity-10' : 'opacity-5 group-hover:opacity-10'}`}>
                <BrainCircuit className={`w-16 h-16 md:w-24 md:h-24 ${isPS ? 'text-teal-600' : 'text-purple-600'}`} />
            </div>

            <span className={`text-xs font-bold uppercase tracking-wider mb-2
                ${topic.category === 'Paper I' ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400'}
            `}>{topic.category}</span>
            <h3 className={`text-sm md:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 transition-colors z-10 pr-2 leading-tight ${isPS ? 'group-hover:text-teal-700 dark:group-hover:text-teal-400' : 'group-hover:text-purple-700 dark:group-hover:text-purple-400'}`}>{topic.title}</h3>

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
        ${isLocked ? 'opacity-70 grayscale-[0.5]' : (isPS ? 'hover:border-teal-200 dark:hover:border-teal-700/50 hover:shadow-xl dark:shadow-lg dark:shadow-teal-900/10 cursor-pointer' : 'hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-xl dark:shadow-lg dark:shadow-purple-900/10 cursor-pointer')}
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
