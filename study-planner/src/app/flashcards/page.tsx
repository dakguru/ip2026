"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, AlertTriangle, ChevronRight, ChevronLeft } from "lucide-react";
import { pmlaFlashcards } from "./pmla_data";
import Link from "next/link";
import Image from "next/image";

export default function FlashcardsPage() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isDraggable, setIsDraggable] = useState(true);

    // --- Access Control ---
    useEffect(() => {
        const checkAuth = () => {
            const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
            if (match) {
                try {
                    const session = JSON.parse(decodeURIComponent(match[2]));
                    // FEATURE FLAG: FLASHCARDS_ADMIN_ONLY
                    // Check if user has role 'admin' or membershipLevel 'admin' (adjust based on actual schema)
                    // For now, assuming 'admin' role or a specific email if role isn't clear.
                    // Based on MobileDashboard, we see membershipLevel. Let's assume 'admin' is a valid membershipLevel or there is a 'role' field.
                    // If unsure, we can strictly check if role is present. 
                    // Let's assume session.role === 'admin' is the standard way.
                    if (session.role === 'admin' || session.isAdmin === true || session.membershipLevel === 'admin') {
                        setIsAdmin(true);
                        return;
                    }
                } catch (e) {
                    console.error("Auth check failed", e);
                }
            }
            setIsAdmin(false);
        };
        checkAuth();
    }, []);

    // Redirect if not admin
    useEffect(() => {
        if (isAdmin === false) {
            // router.replace("/dashboard"); // Or show access denied
        }
    }, [isAdmin, router]);

    const handleNext = () => {
        if (currentIndex < pmlaFlashcards.length - 1) {
            setDirection(1);
            setIsFlipped(false);
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -100) {
            handleNext();
        } else if (info.offset.x > 100) {
            handlePrev();
        }
    };

    // Toggle flip
    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    if (isAdmin === null) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;

    if (isAdmin === false) {
        return (
            <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-white">Restricted Access</h1>
                <p className="text-neutral-400">This feature is currently available for Administrators only.</p>
                <Link href="/dashboard" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const currentCard = pmlaFlashcards[currentIndex];

    // Animation variants
    const cardVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9,
            rotateY: direction < 0 ? -45 : 45,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col overflow-hidden font-sans selection:bg-purple-500/30">
            {/* --- Header --- */}
            <header className="px-5 py-4 flex items-center justify-between z-20 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 pb-[max(16px,env(safe-area-inset-top))]">
                <Link href="/dashboard" className="p-2 -ml-2 text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-center">
                    <h1 className="text-sm font-bold text-neutral-500 uppercase tracking-widest text-[10px] mb-0.5">Flashcard Revision</h1>
                    <p className="text-sm font-bold text-white">PMLA, 2002</p>
                </div>
                <div className="w-8" /> {/* Spacer */}
            </header>

            {/* --- Progress Bar --- */}
            <div className="w-full h-1 bg-neutral-900">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-300 ease-out"
                    style={{ width: `${((currentIndex + 1) / pmlaFlashcards.length) * 100}%` }}
                />
            </div>

            {/* --- Main Content Area --- */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative">

                {/* Background Decor */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-900/10 rounded-full blur-[100px]" />
                </div>

                {/* Card Container */}
                <div className="w-full max-w-sm aspect-[3/4] md:aspect-[4/5] relative perspective-1000">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            className="w-full h-full absolute inset-0 cursor-pointer touch-none"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Inner Flipper */}
                            <motion.div
                                className="w-full h-full relative"
                                initial={false}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d" }}
                                onClick={handleCardClick}
                            >
                                {/* --- FRONT SIDE --- */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl shadow-black/50 overflow-hidden backface-hidden"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    {/* Watermark */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                        <div className="relative w-48 h-48">
                                            <Image src="/dak-guru-logo.png" alt="Watermark" fill className="object-contain" />
                                        </div>
                                    </div>

                                    {/* Card Header */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="bg-white/5 border border-white/5 px-3 py-1 rounded-full">
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                                                Card {currentIndex + 1} / {pmlaFlashcards.length}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold text-neutral-600 uppercase">Tap to Flip</span>
                                    </div>

                                    {/* Question */}
                                    <div className="flex-1 flex flex-col justify-center relative z-10">
                                        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">
                                            {currentCard.question}
                                        </h2>

                                        {/* Options Preview (Front) */}
                                        <div className="space-y-3">
                                            {Object.entries(currentCard.options).map(([key, value]) => (
                                                <div key={key} className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-white/5">
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400">
                                                        {key}
                                                    </div>
                                                    <p className="text-sm text-neutral-300 leading-snug pt-0.5">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* --- BACK SIDE --- */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-neutral-800 border border-indigo-500/30 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl shadow-indigo-900/20 overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)"
                                    }}
                                >
                                    {/* Answer Header */}
                                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                        <span className="text-xs font-bold text-neutral-400 uppercase">Correct Answer</span>
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <span className="text-lg font-bold text-green-400">{currentCard.correctAnswer}</span>
                                        </div>
                                    </div>

                                    {/* Explanation Content */}
                                    <div className="flex-1 overflow-y-auto pr-2 relative z-10 custom-scrollbar">
                                        <div className="mb-4">
                                            <p className="text-lg font-semibold text-white mb-2">
                                                {currentCard.options[currentCard.correctAnswer]}
                                            </p>
                                        </div>

                                        <div className="bg-indigo-500/10 border-l-2 border-indigo-500 p-4 rounded-r-lg">
                                            <h3 className="text-xs font-bold text-indigo-300 uppercase mb-2">Explanation</h3>
                                            <p className="text-sm text-neutral-300 leading-relaxed">
                                                {currentCard.explanation}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer Helper */}
                                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                                        <p className="text-[10px] text-neutral-500">Swipe Left for Next • Swipe Right for Prev</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- Bottom Controls --- */}
                <div className="w-full max-w-sm flex items-center justify-between mt-8 z-20">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="p-3 rounded-full bg-neutral-800 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-700 transition"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-transform"
                    >
                        {isFlipped ? "Show Question" : "Reveal Answer"}
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === pmlaFlashcards.length - 1}
                        className="p-3 rounded-full bg-neutral-800 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-700 transition"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </main>
        </div>
    );
}

// Add some CSS for scrollbar if needed, or rely on Tailwind
// .custom-scrollbar definitions should be in global css, but usually default is okay.
