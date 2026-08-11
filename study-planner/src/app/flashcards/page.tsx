"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";
import {
    ArrowLeft, AlertTriangle, ChevronRight, ChevronLeft, ArrowRight,
    RotateCcw, Sun, Moon, Sparkles, Layers, BookOpen, Scale, FileText, Bus, Shuffle,
    Home,
    Settings,
    Share2,
    Download,
    Timer,
    CheckCircle2,
    Lock,
    Crown,
    Loader2
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCourse } from "@/contexts/CourseContext";
import PremiumLoader from "@/components/PremiumLoader";
import { pmlaFlashcards } from "./pmla_data";
import { poGuide1Flashcards } from "./po_guide1_data";
import {
    pmla2002,
    consumerProtectionAct2019,
    postalManualVolVIPartII,
    postalManualVolVIPartIII,
    gspr2018,
    postalManualVolVII,
    postalManualVolV,
    poAct2023,
    itAct2000,
    bookOfBORules,
    postalManualVolII,
    postalManualVolIV,
    postalManualVolVIII,
    poGuidePartII,
    postalManualVolIII,
    poGuidePartI,
    postalManualVolVIPartI,
    jan2026MostImportant,
    jan2026Banking,
    jan2026GovtSchemes,
    jan2026NationalNews,
    jan2026Sports,
    jan2026MoU,
    jan2026International,
    jan2026ScienceTech,
    feb2026MostImportant,
    feb2026Banking,
    feb2026GovtSchemes,
    feb2026NationalNews,
    feb2026Sports,
    feb2026MoU,
    feb2026International,
    feb2026ScienceTech,
    mar2026MostImportant,
    mar2026Banking,
    mar2026GovtSchemes,
    mar2026NationalNews,
    mar2026Sports,
    mar2026MoU,
    mar2026International,
    mar2026ScienceTech,
    apr2026MostImportant,
    apr2026Banking,
    apr2026GovtSchemes,
    apr2026NationalNews,
    apr2026Sports,
    apr2026MoU,
    apr2026International,
    apr2026ScienceTech
} from "../../data/flashcards";
import { QUIZ_DATA } from "@/data/quizzes";
import { PSGB_QUIZ_DATA } from "@/data/psgbQuizzesData";
import * as GeneratedCards from "../../data/flashcards/generated_from_mcq";
import Link from "next/link";
import Image from "next/image";
import FlashcardsIntroBanner from "@/components/FlashcardsIntroBanner";
import PremiumFlashCardDeck from "@/components/flashcards/PremiumFlashCardDeck";
import { Capacitor } from '@capacitor/core';
import ConfirmExitModal from '@/components/ConfirmExitModal';
import { App } from '@capacitor/app';
import NativeFlashcardsHomeV2 from "@/components/flashcards/NativeFlashcardsHomeV2";

import FlashcardsMarquee from "@/components/FlashcardsMarquee";

// --- Types ---
interface UnifiedFlashcard {
    id: number | string;
    question: string;
    answer: string;
    explanation?: string;
    tag: string;
    category?: string;
    keywords?: string[];
}

const convertToUnified = (data: any[], tagPrefix: string, uniqueContext?: string): UnifiedFlashcard[] => {
    return data.map((item, index) => ({
        id: `${uniqueContext || tagPrefix}_${item.id || item.card_no || index + 1}`,
        question: item.question,
        answer: item.answer,
        explanation: item.explanation || item.keywords?.join(", "),
        tag: item.tag || item.pdf_title || tagPrefix || item.topic,
        category: item.category || item.topic || "",
        keywords: item.keywords
    }));
};

// A flashcard shows only a question and its answer — there are no lettered options.
// MCQ-style stems that depend on a list of choices ("which of the following", "match the
// following", assertion-reason, statement-based, etc.) make no sense as flashcards, so we
// drop them. This applies to every deck source: manual, generated-from-MCQ, and the
// dynamic MCQ fallback that turns raw quiz questions into cards.
const UNSUITABLE_FLASHCARD_PATTERNS: RegExp[] = [
    /which of the following/i,
    /which of these/i,
    /which of the above/i,
    /which one of the following/i,
    /which of the given/i,
    /which (of the )?pairs?\b/i,
    /match the following/i,
    /match list/i,
    /list[\s-]*i+\b[\s\S]*list[\s-]*i+/i, // Match List-I with List-II
    /consider the following/i,
    /arrange the following/i,
    /following statements?\b/i,
    /statements? given below/i,
    /given below[\s\S]*statements?/i,
    /how many of the (above|following)/i,
    /all of the above/i,
    /none of the above/i,
    /select the (correct|right)/i,
    /choose the (correct|right)/i,
    /\bcodes?\s*:/i,
    /\bassertion\b/i,
    /identify the (correct|incorrect)/i,
];

const isSuitableForFlashcard = (question?: string): boolean => {
    if (!question || !question.trim()) return false;
    return !UNSUITABLE_FLASHCARD_PATTERNS.some((re) => re.test(question));
};

// --- DATA ---
const generatedDecksMapping = Object.entries(GeneratedCards).reduce((acc, [key, data]) => {
    const firstCard = (data as any[])[0];
    acc[key] = convertToUnified(data as any[], firstCard?.pdf_title || "General", key);
    return acc;
}, {} as Record<string, UnifiedFlashcard[]>);

// Merge all PMLA related content into one
const pMLAContent = [
    ...pmlaFlashcards,
    ...convertToUnified(pmla2002, "PMLA 2002"),
    ...(generatedDecksMapping['p1_3'] || [])
].map(card => ({ ...card, tag: "Prevention of Money Laundering Act, 2002" }));

// Remove merged ones from individual mapping to avoid duplicates
delete generatedDecksMapping['p1_3'];

const deckData: Record<string, UnifiedFlashcard[]> = {
    'pmla': pMLAContent,
    'poguide1': poGuide1Flashcards,
    'cpa2019': convertToUnified(consumerProtectionAct2019, "CPA 2019"),
    'vol6_2': convertToUnified(postalManualVolVIPartII, "Vol VI Part II"),
    'vol6_3': convertToUnified(postalManualVolVIPartIII, "Vol VI Part III"),
    'gspr': convertToUnified(gspr2018, "GSPR 2018"),
    'vol7': convertToUnified(postalManualVolVII, "Vol VII (RMS)"),
    'vol5': convertToUnified(postalManualVolV, "Vol V (Definitions)"),
    ...generatedDecksMapping
};

export default function FlashcardsPage() {
    return (
        <React.Suspense fallback={<PremiumLoader message="Loading flashcards..." />}>
            <FlashcardsContent />
        </React.Suspense>
    );
}

function FlashcardsContent() {
    const { course } = useCourse();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [membershipLevel, setMembershipLevel] = useState<string | null>(null);
    const [planId, setPlanId] = useState<string>('');
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // State
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const handleExitRequest = () => {
        if (selectedDeckId) {
            setShowExitConfirm(true);
        } else {
            handleBackToCategories();
        }
    };

    const confirmExit = () => {
        setSelectedDeckId(null);
        setShowExitConfirm(false);
    };
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [showCategories, setShowCategories] = useState(true); // New state for view mode
    const searchParams = useSearchParams();

    // Handle direct link filters
    useEffect(() => {
        const filter = searchParams.get('filter');
        if (filter === 'ca') {
            setActiveFilter('Current Affairs');
            setShowCategories(false);
        }
    }, [searchParams]);

    // Handle category selection
    const handleCategorySelect = (category: string) => {
        setActiveFilter(category);
        setShowCategories(false);
        setSelectedSubCategory(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle back to categories
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

    const handleBackToCategories = () => {
        if (selectedSubCategory) {
            setSelectedSubCategory(null);
            return;
        }
        setActiveFilter("All");
        setShowCategories(true);
        setSearchQuery("");
    };

    // Auto-switch to deck view if searching
    useEffect(() => {
        if (searchQuery.length > 0 && showCategories) {
            setShowCategories(false);
        }
    }, [searchQuery]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isInitiallyShuffled, setIsInitiallyShuffled] = useState(false);
    const [deckProgress, setDeckProgress] = useState<Record<string, number>>({});
    const [bookmarks, setBookmarks] = useState<Set<string | number>>(new Set());
    const [lastStudiedDeckId, setLastStudiedDeckId] = useState<string | null>(null);

    const router = useRouter();

    // --- ANDROID BACK BUTTON HANDLING ---
    const selectedDeckIdRef = useRef(selectedDeckId);
    const showExitConfirmRef = useRef(showExitConfirm);
    
    useEffect(() => {
        selectedDeckIdRef.current = selectedDeckId;
        showExitConfirmRef.current = showExitConfirm;
    }, [selectedDeckId, showExitConfirm]);

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;

        const listenerPromise = App.addListener('backButton', (data) => {
            if (showExitConfirmRef.current) {
                setShowExitConfirm(false);
            } else if (selectedDeckIdRef.current) {
                setShowExitConfirm(true);
            } else {
                if (data.canGoBack) {
                    router.back();
                } else {
                    App.exitApp();
                }
            }
        });

        return () => {
            listenerPromise.then(handle => handle.remove());
        };
    }, []);

    useEffect(() => {
        setMounted(true);
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[2]));
                setUserRole(session.role || 'user');
                setMembershipLevel(session.membershipLevel || 'free');
                if (session.planId) setPlanId(session.planId);
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }

        // Load progress
        const savedProgress = localStorage.getItem('flashcards_progress');
        if (savedProgress) {
            try {
                setDeckProgress(JSON.parse(savedProgress));
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }

        // Load last studied deck for "Continue Where You Left Off"
        const savedLastStudied = localStorage.getItem('flashcards_last_studied');
        if (savedLastStudied) {
            setLastStudiedDeckId(savedLastStudied);
        }

        // Load bookmarks
        const savedBookmarks = localStorage.getItem('flashcards_bookmarks');
        if (savedBookmarks) {
            try {
                setBookmarks(new Set(JSON.parse(savedBookmarks)));
            } catch (e) {
                console.error("Failed to parse bookmarks", e);
            }
        }

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        setIsLoadingAuth(false);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // --- ACCESS CONTROL ---
    // --- ACCESS CONTROL ---
    const hasAccess = userRole === 'admin' || (course === 'PS_GR_B' ? (membershipLevel === 'gold' && (planId.includes('diamond') || planId.includes('ps_gr_b'))) : membershipLevel === 'gold');

    // Early return removed to allow free users to see the library (but locked)


    const handleSelectDeck = (id: string, startIdx: number = 0, shuffle: boolean = false) => {
        if (id.startsWith('month_')) {
            setSelectedSubCategory(id.replace('month_', ''));
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Check for restricted categories
        if (id !== 'bookmarks') {
            const activeData = course === 'PS_GR_B' ? PSGB_QUIZ_DATA : QUIZ_DATA;
            const topic = activeData.find(t => t.id === id);
            const category = topic?.category;
            const isRestricted = category === 'Paper I' || category === 'Paper II' || category === 'Paper III' || category === 'PYQ';

            if (isRestricted && !hasAccess) {
                router.push('/pricing'); // Redirect free users to pricing only for restricted content
                return;
            }
        }

        setSelectedDeckId(id);
        setCurrentCardIndex(startIdx);
        setIsInitiallyShuffled(shuffle);
        // Track last studied deck for "Continue Where You Left Off"
        if (id !== 'bookmarks') {
            setLastStudiedDeckId(id);
            localStorage.setItem('flashcards_last_studied', id);
        }
    };

    const handleBookmarkToggle = (id: string | number) => {
        const newBookmarks = new Set(bookmarks);
        if (newBookmarks.has(id)) {
            newBookmarks.delete(id);
        } else {
            newBookmarks.add(id);
        }
        setBookmarks(newBookmarks);
        localStorage.setItem('flashcards_bookmarks', JSON.stringify(Array.from(newBookmarks)));
    };

    // Save progress when it changes
    useEffect(() => {
        if (selectedDeckId !== null && mounted) {
            const newProgress = { ...deckProgress, [selectedDeckId]: currentCardIndex };
            setDeckProgress(newProgress);
            localStorage.setItem('flashcards_progress', JSON.stringify(newProgress));
        }
    }, [currentCardIndex, selectedDeckId, mounted]);

    const handleShare = async () => {
        const activeDeck = selectedDeckId ? getDeckFromId(selectedDeckId) : [];
        const currentCard = activeDeck[currentCardIndex];
        if (!currentCard) return;

        const text = `Flashcard: ${currentCard.question}\n\nAnswer: ${currentCard.answer}\n\nshared from Dak Guru www.dakguru.com`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Dak Guru Flashcard',
                    text: text,
                    url: 'https://www.dakguru.com'
                });
            } catch (err) { }
        } else {
            navigator.clipboard.writeText(text);
            alert("Description copied with link!");
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('flash-search')?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // --- DATA PREPARATION ---
    const getDeckFromId = (id: string): UnifiedFlashcard[] => {
        const activeData = course === 'PS_GR_B' ? PSGB_QUIZ_DATA : QUIZ_DATA;

        if (id === 'bookmarks') {
            // Collect ALL cards from ALL sources using the active data
            let allCards: UnifiedFlashcard[] = [];

            activeData.forEach(topic => {
                if (topic.id !== 'bookmarks') {
                    allCards.push(...getDeckFromId(topic.id));
                }
            });

            // Filter for unique IDs that are bookmarked
            const bookmarkedCards = allCards.filter(card => bookmarks.has(card.id));

            // Deduplicate by ID just in case
            const uniqueBookmarked = Array.from(new Map(bookmarkedCards.map(item => [item.id, item])).values());

            return uniqueBookmarked;
        }

        // Handle PSGB Aliasing to fetch already generated flashcards from QUIZ_DATA
        let lookupId = id;
        if (id.startsWith('psgb-')) {
            const psTopic = PSGB_QUIZ_DATA.find(t => t.id === id);
            if (psTopic) {
                const origTopic = QUIZ_DATA.find(t => t.title === psTopic.title);
                if (origTopic) {
                    lookupId = origTopic.id;
                }
            }
        }

        // Manual Mappings
        let manualContent: any[] = [];

        // Special merges
        if (lookupId === 'p1-3') {
            manualContent = [...pmlaFlashcards, ...pmla2002];
        } else if (lookupId === 'p1-18') {
            manualContent = [...poGuide1Flashcards, ...poGuidePartI];
        } else if (lookupId === 'p1-15') {
            manualContent = [...postalManualVolVIPartI, ...postalManualVolVIPartII, ...postalManualVolVIPartIII];
        } else {
            // Direct Manual Mappings based on Manual Imports
            switch (lookupId) {
                case 'p1-1': manualContent = poAct2023; break;
                case 'p1-4': manualContent = consumerProtectionAct2019; break;
                case 'p1-5': manualContent = itAct2000; break;
                case 'p1-7': manualContent = gspr2018; break;
                case 'p1-10': manualContent = bookOfBORules; break;
                case 'p1-11': manualContent = postalManualVolII; break;
                case 'p1-12': manualContent = postalManualVolIV; break;
                case 'p1-13': manualContent = postalManualVolVIII; break;
                case 'p1-14': manualContent = postalManualVolV; break;
                case 'p1-16': manualContent = postalManualVolVII; break;
                case 'p1-19': manualContent = poGuidePartII; break;
                case 'p1-36': manualContent = postalManualVolIII; break;

                // Current Affairs - Jan 2026
                case 'ca-jan26-1': manualContent = jan2026MostImportant; break;
                case 'ca-jan26-2': manualContent = jan2026Banking; break;
                case 'ca-jan26-3': manualContent = jan2026GovtSchemes; break;
                case 'ca-jan26-4': manualContent = jan2026NationalNews; break;
                case 'ca-jan26-5': manualContent = jan2026Sports; break;
                case 'ca-jan26-6': manualContent = jan2026MoU; break;
                case 'ca-jan26-7': manualContent = jan2026International; break;
                case 'ca-jan26-8': manualContent = jan2026ScienceTech; break;
                
                // Current Affairs - Feb 2026
                case 'ca-feb26-1': manualContent = feb2026MostImportant; break;
                case 'ca-feb26-2': manualContent = feb2026Banking; break;
                case 'ca-feb26-3': manualContent = feb2026GovtSchemes; break;
                case 'ca-feb26-4': manualContent = feb2026NationalNews; break;
                case 'ca-feb26-5': manualContent = feb2026Sports; break;
                case 'ca-feb26-6': manualContent = feb2026MoU; break;
                case 'ca-feb26-7': manualContent = feb2026International; break;
                case 'ca-feb26-8': manualContent = feb2026ScienceTech; break;

                // Current Affairs - Mar 2026
                case 'ca-mar26-1': manualContent = mar2026MostImportant; break;
                case 'ca-mar26-2': manualContent = mar2026Banking; break;
                case 'ca-mar26-3': manualContent = mar2026GovtSchemes; break;
                case 'ca-mar26-4': manualContent = mar2026NationalNews; break;
                case 'ca-mar26-5': manualContent = mar2026Sports; break;
                case 'ca-mar26-6': manualContent = mar2026MoU; break;
                case 'ca-mar26-7': manualContent = mar2026International; break;
                case 'ca-mar26-8': manualContent = mar2026ScienceTech; break;

                // Current Affairs - Apr 2026
                case 'ca-apr26-1': manualContent = apr2026MostImportant; break;
                case 'ca-apr26-2': manualContent = apr2026Banking; break;
                case 'ca-apr26-3': manualContent = apr2026GovtSchemes; break;
                case 'ca-apr26-4': manualContent = apr2026NationalNews; break;
                case 'ca-apr26-5': manualContent = apr2026Sports; break;
                case 'ca-apr26-6': manualContent = apr2026MoU; break;
                case 'ca-apr26-7': manualContent = apr2026International; break;
                case 'ca-apr26-8': manualContent = apr2026ScienceTech; break;

                default: manualContent = [];
            }
        }

        const generatedKey = lookupId.replace('-', '_');
        let generatedContent = (generatedDecksMapping as any)[generatedKey] || [];

        // Dynamic fallback from MCQ Data
        if (generatedContent.length === 0) {
            const matchingTopic = activeData.find(t => t.id === id || t.id === lookupId);
            if (matchingTopic && matchingTopic.sets) {
                generatedContent = matchingTopic.sets.flatMap((s, sIdx) =>
                    s.questions.map((q, qIdx) => ({
                        id: `dyn_${matchingTopic.id}_${sIdx}_${qIdx}`,
                        question: q.text,
                        answer: q.options[q.correctAnswer] || "Review explanation",
                        explanation: q.explanation || "",
                        tag: matchingTopic.title,
                        category: matchingTopic.category
                    }))
                );
            }
        }

        // Convert Manual to Unified
        const unifiedManual = convertToUnified(manualContent, id, id); // id as placeholder tag if missing and as unique context

        // Merge: Manual first, then Generated
        // Filter duplicates if necessary? For now, we assume distinct sets or acceptable overlap
        // Drop MCQ-style questions that don't work as flashcards (option-dependent stems).
        return [...unifiedManual, ...generatedContent].filter(c => isSuitableForFlashcard(c.question));
    };

    // Filter and Organize Decks
    const organizeDecks = () => {
        const organized: { id: string; title: string; category: string; subCategory?: string; count: number; deck: UnifiedFlashcard[] }[] = [];
        const activeData = course === 'PS_GR_B' ? PSGB_QUIZ_DATA : QUIZ_DATA;

        activeData.forEach(topic => {
            const fullDeck = getDeckFromId(topic.id);
            if (fullDeck.length > 0) {
                // Check Filters
                const title = topic.title;
                const category = topic.category;
                const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());

                let matchesFilter = activeFilter === "All";

                if (course === 'PS_GR_B') {
                    if (activeFilter === "Paper - I" && category === "Paper I") matchesFilter = true;
                    if (activeFilter === "Paper - II" && category === "Paper II") matchesFilter = true;
                } else {
                    if (activeFilter === "Paper - I" && category === "Paper I") matchesFilter = true;
                    if (activeFilter === "Paper - III" && category === "Paper III") matchesFilter = true;
                }

                if (activeFilter === "PYQs" && category === "PYQ") matchesFilter = true;
                if (activeFilter === "Current Affairs" && category === "Current Affairs") matchesFilter = true;
                if (activeFilter === "Bookmarked FCs" && fullDeck.some(c => bookmarks.has(c.id))) matchesFilter = true;
                if (activeFilter === "Recently Studied" && deckProgress.hasOwnProperty(topic.id)) matchesFilter = true;

                if (matchesSearch && matchesFilter) {
                    organized.push({
                        id: topic.id,
                        title: topic.title,
                        category: topic.category,
                        subCategory: topic.subCategory,
                        count: fullDeck.length,
                        deck: fullDeck
                    });
                }
            }
        });

        // GROUPING logic for Current Affairs
        if (!searchQuery && (activeFilter === "Current Affairs" || activeFilter === "All")) {
            const caDecks = organized.filter(d => d.category === "Current Affairs");
            const nonCaDecks = organized.filter(d => d.category !== "Current Affairs");

            if (selectedSubCategory && activeFilter === "Current Affairs") {
                return caDecks.filter(d => d.subCategory === selectedSubCategory);
            } else if (!selectedSubCategory) {
                // Return Month Folders instead of topics
                const months = Array.from(new Set(caDecks.map(d => d.subCategory).filter(Boolean)));
                const folders: any[] = months.map(m => ({
                    id: `month_${m}`,
                    title: m as string,
                    category: "Current Affairs",
                    subCategory: m as string,
                    count: caDecks.filter(d => d.subCategory === m).length,
                    deck: [],
                    isMonthFolder: true
                }));
                return [...nonCaDecks, ...folders];
            }
        }

        return organized;
    };

    const finalDecks = organizeDecks();
    const paper1Decks = finalDecks.filter(d => d.category === 'Paper I');
    const paperGroup2Decks = finalDecks.filter(d => course === 'PS_GR_B' ? d.category === 'Paper II' : d.category === 'Paper III');
    const pyqDecks = finalDecks.filter(d => d.category === 'PYQ');
    const caDecks = finalDecks.filter(d => d.category === 'Current Affairs');
    const otherDecks = finalDecks.filter(d => !['Paper I', 'Paper II', 'Paper III', 'PYQ', 'Current Affairs'].includes(d.category));

    // Continue Where You Left Off — resolve last studied deck info
    const lastStudiedDeckInfo = (() => {
        if (!lastStudiedDeckId || deckProgress[lastStudiedDeckId] == null) return null;
        const activeData = course === 'PS_GR_B' ? PSGB_QUIZ_DATA : QUIZ_DATA;
        const topic = activeData.find(t => t.id === lastStudiedDeckId);
        if (!topic) return null;
        const deck = getDeckFromId(lastStudiedDeckId);
        if (!deck || deck.length === 0) return null;
        return {
            id: lastStudiedDeckId,
            title: topic.title,
            category: topic.category,
            cardCount: deck.length,
            lastIndex: deckProgress[lastStudiedDeckId],
        };
    })();


    if (!mounted) return null;



    // --- IMPORTS ADAPTATION ---
    // Ensure you have these imports at top of file:
    // import { Capacitor } from '@capacitor/core';
    // import NativeFlashcardsHomeV2 from "@/components/flashcards/NativeFlashcardsHomeV2";

    if (!selectedDeckId) {
        // ANDROID V2 IMMERSIVE HOME
        if (Capacitor.isNativePlatform() || isMobile) {
            return (
                <>
                <NativeFlashcardsHomeV2
                    decks={finalDecks}
                    progress={deckProgress}
                    onDeckSelect={handleSelectDeck}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    bookmarks={bookmarks}
                    hasAccess={hasAccess}
                    course={course}
                    lastStudiedDeckInfo={lastStudiedDeckInfo}
                />
                </>
            );
        }

        // DESKTOP / WEB HOME
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 relative selection:bg-indigo-100 font-sans overflow-hidden">
                {/* Creative Modern Background Elements */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full ${course === 'PS_GR_B' ? 'bg-teal-400/20 dark:bg-teal-900/20' : 'bg-violet-400/20 dark:bg-violet-900/20'} blur-3xl`} />
                    <div className={`absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full ${course === 'PS_GR_B' ? 'bg-indigo-400/20 dark:bg-indigo-900/20' : 'bg-indigo-400/20 dark:bg-indigo-900/20'} blur-3xl`} />
                    <div className={`absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full ${course === 'PS_GR_B' ? 'bg-purple-400/20 dark:bg-purple-900/20' : 'bg-fuchsia-400/20 dark:bg-fuchsia-900/20'} blur-3xl`} />
                    <div className={`absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full ${course === 'PS_GR_B' ? 'bg-cyan-400/20 dark:bg-cyan-900/10' : 'bg-cyan-400/20 dark:bg-cyan-900/10'} blur-3xl animate-pulse`} />
                </div>

                {/* Grain Texture Overlay */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

                {/* 1. HERO SECTION (Mobile Optimized) */}
                <header className="relative z-10 pt-8 pb-4 md:pt-10 md:pb-6 text-center max-w-4xl mx-auto px-4 md:px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

                        <div className="relative inline-block mb-1">
                            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text ${course === 'PS_GR_B' ? 'bg-gradient-to-br from-teal-900 via-indigo-800 to-purple-900 dark:from-white dark:via-cyan-200 dark:to-indigo-200' : 'bg-gradient-to-br from-indigo-900 via-violet-800 to-fuchsia-900 dark:from-white dark:via-indigo-200 dark:to-violet-200'} mb-2 drop-shadow-sm pb-2 pr-2`}>
                                FLASHCARDS
                            </h1>
                        </div>

                        <h2 className={`text-xl md:text-3xl font-extrabold text-transparent bg-clip-text ${course === 'PS_GR_B' ? 'bg-gradient-to-r from-teal-600 to-indigo-600' : 'bg-gradient-to-r from-indigo-600 to-violet-600'} mb-2 tracking-tight`}>
                            Master Postal Laws Through Smart Revision
                        </h2>

                        <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">
                            Prepare Faster • Recall Better • Succeed Confidently
                        </p>

                        <div className="h-px w-16 md:w-24 bg-slate-200 dark:bg-white/10 mx-auto mb-6 md:mb-8" />

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto group">
                            <div className={`absolute inset-0 ${course === 'PS_GR_B' ? 'bg-teal-500/5' : 'bg-indigo-500/5'} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
                            <div className={`relative bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-full h-12 md:h-14 flex items-center px-5 md:px-6 shadow-xl shadow-slate-200/40 dark:shadow-none transition-colors ${course === 'PS_GR_B' ? 'hover:border-teal-500/30' : 'hover:border-indigo-500/30'}`}>
                                <Sparkles className={`w-4 h-4 md:w-5 md:h-5 mr-3 md:mr-4 ${course === 'PS_GR_B' ? 'text-teal-500' : 'text-indigo-500'}`} />
                                <input type="text" id="flash-search" placeholder="Search Acts, Rules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-sm md:text-base text-slate-800 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                                <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-400">
                                    ⌘ K
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </header>

                <div className="md:mb-8">
                    <FlashcardsMarquee />
                </div>

                {/* 2. STICKY LEARNING CONTEXT BAR (Desktop) */}
                <div className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-y border-slate-200 dark:border-zinc-800 py-3 px-[8vw] hidden md:block">
                    <div className="max-w-[1400px] mx-auto flex justify-between items-center text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-400 uppercase">
                        <div className="flex gap-8">
                            <span className="flex items-center gap-2 text-slate-900 dark:text-white"><Layers className="w-3.5 h-3.5 text-indigo-500" /> Paper I</span>
                            <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-emerald-500" /> {Object.values(finalDecks).reduce((a, b: any) => a + (b.count || 0), 0)} Smart Cards</span>
                            <span className="flex items-center gap-2"><Timer className="w-3.5 h-3.5 text-amber-500" /> 12m Avg Study</span>
                        </div>
                        <div className="flex gap-6">
                            <div onClick={() => bookmarks.size > 0 && handleSelectDeck('bookmarks')} className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors flex items-center gap-1.5 ${bookmarks.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${bookmarks.size > 0 ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-700'}`} />
                                Bookmarked ({bookmarks.size})
                            </div>
                            <div onClick={() => setActiveFilter('Recently Studied')} className={`hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors flex items-center gap-1.5 ${activeFilter === 'Recently Studied' ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${activeFilter === 'Recently Studied' ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-700'}`} />
                                Recently Studied
                            </div>
                            {lastStudiedDeckInfo && (
                                <span onClick={() => handleSelectDeck(lastStudiedDeckInfo.id, lastStudiedDeckInfo.lastIndex, false)} className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 cursor-pointer hover:underline">Continue Learning <ChevronRight className="w-3 h-3" /></span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. MOBILE STICKY ACTIONS BAR */}
                <div className="sticky top-0 z-40 md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-y border-slate-200 dark:border-zinc-800 overflow-x-auto">
                    <div className="flex items-center gap-4 px-4 py-3 min-w-max text-[10px] uppercase font-bold tracking-wider text-slate-500">
                        <div onClick={() => bookmarks.size > 0 && handleSelectDeck('bookmarks')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 ${bookmarks.size > 0 ? 'text-indigo-600 border-indigo-100' : 'opacity-50'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${bookmarks.size > 0 ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                            Bookmarked ({bookmarks.size})
                        </div>
                        <div onClick={() => setActiveFilter('Recently Studied')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 ${activeFilter === 'Recently Studied' ? 'text-indigo-600 border-indigo-100 bg-indigo-50' : ''}`}>
                            Recently Studied
                        </div>
                    </div>
                </div>

                {/* 4. MOBILE CATEGORIES SCROLL - HIDDEN IN LANDING VIEW */}
                {!showCategories && (
                    <div className="md:hidden overflow-x-auto pb-2 -mt-4 pt-8 px-4 flex gap-2 no-scrollbar">
                        <button
                            onClick={handleBackToCategories}
                            className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-800 flex items-center gap-2"
                        >
                            <ChevronLeft className="w-3 h-3" /> Back
                        </button>
                        {["Paper - I", course === 'PS_GR_B' ? "Paper - II" : "Paper - III", "PYQs", "Current Affairs", "Bookmarked FCs"].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter === activeFilter ? 'All' : filter)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all ${activeFilter === filter ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-800'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                )}

                {/* 6. FLOATING LEFT FILTER RAIL (Desktop Only) - HIDDEN IN LANDING VIEW */}
                {!showCategories && (
                    <div className="fixed left-0 top-1/3 z-30 hidden xl:flex flex-col gap-1 p-1 bg-white dark:bg-zinc-900 border-y border-r border-slate-200 dark:border-zinc-800 rounded-r-2xl shadow-lg -translate-x-[calc(100%-60px)] hover:translate-x-0 transition-transform duration-300 w-56 group">
                        <div onClick={handleBackToCategories} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-slate-100 dark:border-zinc-800 mb-1">
                            <ChevronLeft className="w-4 h-4" />
                            <span className="text-xs font-bold pl-1">BACK TO HOME</span>
                        </div>
                        <div className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Filters</div>
                        {[
                            { icon: "📘", label: "Acts", filter: "Act" },
                            { icon: "📗", label: "Rules", filter: "Rule" },
                            { icon: "📙", label: "Schemes", filter: "Scheme" },
                            { icon: "⚖️", label: "Laws", filter: "Law" }
                        ].map((item) => (
                            <div key={item.label} onClick={() => setActiveFilter(activeFilter === item.filter ? "All" : item.filter)}
                                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${activeFilter === item.filter ? 'bg-indigo-50 dark:bg-indigo-900/20 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-zinc-800'}`}>
                                <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 shadow-sm border border-slate-100 dark:border-zinc-700 flex items-center justify-center shrink-0 text-base shadow-slate-200/50">
                                    {item.icon}
                                </div>
                                <span className={`text-sm font-medium ${activeFilter === item.filter ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{item.label}</span>
                                {activeFilter === item.filter && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                            </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-zinc-800 p-2">
                            <div onClick={() => setActiveFilter("All")} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <span className="text-xs font-bold pl-1">RESET FILTERS</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. GRID SYSTEM & 4. ACADEMIC SECTION HEADERS */}
                <main className="relative z-10 px-4 md:px-[8vw] max-w-[1400px] mx-auto pb-20 md:pb-32 space-y-12 md:space-y-16 pt-8 md:pt-12">

                    {/* CONTINUE WHERE YOU LEFT OFF — DESKTOP BANNER */}
                    {lastStudiedDeckInfo && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="-mt-4 mb-2"
                        >
                            <div
                                onClick={() => handleSelectDeck(lastStudiedDeckInfo.id, lastStudiedDeckInfo.lastIndex, false)}
                                className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-xl ${
                                    course === 'PS_GR_B'
                                        ? 'bg-gradient-to-r from-teal-50 via-white to-indigo-50 dark:from-teal-950/40 dark:via-zinc-900 dark:to-indigo-950/40 border-teal-200/60 dark:border-teal-800/40 hover:border-teal-400/60 hover:shadow-teal-500/10'
                                        : 'bg-gradient-to-r from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-zinc-900 dark:to-violet-950/40 border-indigo-200/60 dark:border-indigo-800/40 hover:border-indigo-400/60 hover:shadow-indigo-500/10'
                                }`}
                            >
                                {/* Ambient glow */}
                                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-30 ${course === 'PS_GR_B' ? 'bg-teal-400' : 'bg-indigo-400'}`} />

                                <div className="relative z-10 flex items-center justify-between p-5 md:p-6">
                                    <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                                        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                                            course === 'PS_GR_B'
                                                ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400'
                                                : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                                        }`}>
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1">Continue Where You Left Off</p>
                                            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white truncate">{lastStudiedDeckInfo.title}</h3>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-zinc-400">{lastStudiedDeckInfo.category}</span>
                                                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Card {lastStudiedDeckInfo.lastIndex + 1} of {lastStudiedDeckInfo.cardCount}</span>
                                            </div>
                                            {/* Progress bar */}
                                            <div className="mt-2.5 h-1.5 w-full max-w-xs bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-700 ${course === 'PS_GR_B' ? 'bg-gradient-to-r from-teal-500 to-indigo-500' : 'bg-gradient-to-r from-indigo-500 to-violet-500'}`}
                                                    style={{ width: `${((lastStudiedDeckInfo.lastIndex + 1) / lastStudiedDeckInfo.cardCount) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`shrink-0 ml-4 hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all group-hover:scale-105 group-hover:shadow-lg ${
                                        course === 'PS_GR_B'
                                            ? 'bg-gradient-to-r from-teal-600 to-indigo-600 group-hover:shadow-teal-500/25'
                                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:shadow-indigo-500/25'
                                    }`}>
                                        Continue <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CATEGORY LANDING VIEW */}
                    {showCategories ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                            {/* Paper I */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                onClick={() => handleCategorySelect('Paper - I')}
                                className="group relative bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 cursor-pointer hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${course === 'PS_GR_B' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}`}>
                                        <Layers className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Paper I</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Acts, Rules, and Regulatory Framework. The core foundation.</p>
                                    <div className={`flex items-center text-sm font-bold ${course === 'PS_GR_B' ? 'text-teal-600 dark:text-teal-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                                        Explore Topics <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Group 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                onClick={() => handleCategorySelect(course === 'PS_GR_B' ? 'Paper - II' : 'Paper - III')}
                                className="group relative bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 cursor-pointer hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${course === 'PS_GR_B' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                                        <BookOpen className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{course === 'PS_GR_B' ? 'Paper II' : 'Paper III'}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Legal, Financial, and Administrative Knowledge.</p>
                                    <div className="flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                        Explore Topics <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* PYQs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                onClick={() => handleCategorySelect('PYQs')}
                                className="group relative bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 cursor-pointer hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                                        <Timer className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">PYQs</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Previous Year Questions. Analyze patterns and practice.</p>
                                    <div className="flex items-center text-sm font-bold text-amber-600 dark:text-amber-400">
                                        Start Studying <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Current Affairs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                onClick={() => handleCategorySelect('Current Affairs')}
                                className="group relative bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 cursor-pointer hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6">
                                        <Sparkles className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Current Affairs</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Latest Updates, News, and General Awareness.</p>
                                    <div className="flex items-center text-sm font-bold text-rose-600 dark:text-rose-400">
                                        Read Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <>
                            {/* DECK LIST VIEWS - Only show if valid decks exist for the category or if strict category mode */}

                            {/* BACK BUTTON (Desktop Enhanced) */}
                            <div className="hidden md:flex mb-6">
                                <button
                                    onClick={handleBackToCategories}
                                    className="group flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mr-3 transition-colors">
                                        <ChevronLeft className="w-4 h-4" />
                                    </div>
                                    Back to Categories
                                </button>
                            </div>

                            {/* Paper I */}
                            {(paper1Decks.length > 0 && (activeFilter === "All" || activeFilter === "Paper - I")) && (
                                <section>
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                        <div>
                                            <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Paper I</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Acts, Rules & Regulatory Framework</p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{paper1Decks.length} TOPICS</span>
                                    </motion.div>

                                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                        {paper1Decks.map((item, i) => (
                                            <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                                <PremiumKnowledgeTile
                                                    id={item.id}
                                                    index={i}
                                                    title={item.title}
                                                    category="Paper I"
                                                    cardCount={item.count}
                                                    onAction={handleSelectDeck}
                                                    lastIndex={deckProgress[item.id] || 0}
                                                    locked={!hasAccess}
                                                    course={course}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Group 2 */}
                            {(paperGroup2Decks.length > 0 && (activeFilter === "All" || activeFilter === "Paper - II" || activeFilter === "Paper - III")) && (
                                <section>
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                        <div>
                                            <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{course === 'PS_GR_B' ? 'Paper II' : 'Paper III'}</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Rules and Regulations</p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{paperGroup2Decks.length} TOPICS</span>
                                    </motion.div>

                                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                        {paperGroup2Decks.map((item, i) => (
                                            <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                                <PremiumKnowledgeTile
                                                    id={item.id}
                                                    index={i}
                                                    title={item.title}
                                                    category={course === 'PS_GR_B' ? 'Paper II' : 'Paper III'}
                                                    cardCount={item.count}
                                                    onAction={handleSelectDeck}
                                                    lastIndex={deckProgress[item.id] || 0}
                                                    locked={!hasAccess}
                                                    course={course}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* PYQs */}
                            {(pyqDecks.length > 0 && (activeFilter === "All" || activeFilter === "PYQs")) && (
                                <section>
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                        <div>
                                            <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">PYQs</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Previous Year Questions & Analysis</p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{pyqDecks.length} TOPICS</span>
                                    </motion.div>

                                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                        {pyqDecks.map((item, i) => (
                                            <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                                <PremiumKnowledgeTile
                                                    id={item.id}
                                                    index={i}
                                                    title={item.title}
                                                    category="PYQ"
                                                    cardCount={item.count}
                                                    onAction={handleSelectDeck}
                                                    lastIndex={deckProgress[item.id] || 0}
                                                    locked={!hasAccess}
                                                    course={course}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Current Affairs */}
                            {((caDecks.length > 0 || activeFilter === 'Current Affairs')) && (
                                <section>
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                        <div>
                                            <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                                                {selectedSubCategory ? `Current Affairs — ${selectedSubCategory}` : "Current Affairs"}
                                            </h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                                {selectedSubCategory ? "Click a topic to start practicing" : "Latest Updates & Happenings"}
                                            </p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{caDecks.length} TOPICS</span>
                                    </motion.div>

                                    {caDecks.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                            {caDecks.map((item, i) => (
                                                <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                                    <PremiumKnowledgeTile
                                                        id={item.id}
                                                        index={i}
                                                        title={item.title}
                                                        category="Current Affairs"
                                                        cardCount={item.count}
                                                        onAction={handleSelectDeck}
                                                        lastIndex={deckProgress[item.id] || 0}
                                                        locked={false}
                                                        course={course}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 opacity-60">
                                            <p className="text-slate-500">Current Affairs cards coming shortly...</p>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Other */}
                            {(otherDecks.length > 0 && activeFilter === "All") && (
                                <section>
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
                                        <div>
                                            <h2 className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Others</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Supplementary Materials</p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2 py-1 rounded-md">{otherDecks.length} TOPICS</span>
                                    </motion.div>

                                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                        {otherDecks.map((item, i) => (
                                            <div key={item.id} className="flashcard-wrapper group rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                                                <PremiumKnowledgeTile
                                                    id={item.id}
                                                    index={i}
                                                    title={item.title}
                                                    category={item.category || "General"}
                                                    cardCount={item.count}
                                                    onAction={handleSelectDeck}
                                                    lastIndex={deckProgress[item.id] || 0}
                                                    locked={!hasAccess}
                                                    course={course}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {finalDecks.length === 0 && (
                                <div className="text-center py-20 opacity-50">
                                    <Layers className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                                    <p>No topics found matching your filters.</p>
                                </div>
                            )}
                        </>
                    )}

                </main>
            </div>
        );
    }


    // STUDY MODE (APP)
    const activeDeck = getDeckFromId(selectedDeckId);

    return (
        <div className="fixed inset-0 z-[100] h-screen-dvh w-screen overflow-hidden bg-slate-50 dark:bg-black flex flex-col transition-colors duration-500 overscroll-none touch-pan-x">
            {/* ROW 2: DECK CONTROLS (Matches Screenshot 1 control row) */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 pb-3 pt-[calc(0.75rem+env(safe-area-inset-top))] border-b border-slate-100 dark:border-white/5 shadow-sm">
                <div className="max-w-xl mx-auto flex items-center justify-between relative">
                    <button
                        onClick={() => setSelectedDeckId(null)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 font-black text-sm active:scale-95 transition-transform"
                    >
                        <ArrowLeft className="w-5 h-5" /> Exit
                    </button>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-xl font-black tracking-tighter">
                            <span className="text-indigo-700 dark:text-indigo-400">DAK</span> <span className="text-violet-700 dark:text-violet-400">GURU</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-white/10 transition-all hover:text-indigo-600"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-white/10 transition-all hover:text-indigo-600"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col pt-0 bg-transparent">
                <PremiumFlashCardDeck
                    cards={activeDeck}
                    title={selectedDeckId === 'bookmarks' ? 'Bookmarked Cards' : (activeDeck[0]?.tag || "Study Session")}
                    externalIndex={currentCardIndex}
                    onIndexChange={setCurrentCardIndex}
                    onBack={handleExitRequest}
                    initialShuffled={isInitiallyShuffled}
                    bookmarks={bookmarks}
                    onBookmarkToggle={handleBookmarkToggle}
                />
            </main>
            <ConfirmExitModal 
                isOpen={showExitConfirm}
                onConfirm={confirmExit}
                onCancel={() => setShowExitConfirm(false)}
            />
        </div>
    );
}

function PremiumKnowledgeTile({ id, title, category, cardCount, onAction, index, lastIndex, locked, course }: any) {
    const themes = [
        { g: 'bg-blue-500', t: 'text-sky-600', b: 'bg-sky-50' },
        { g: 'bg-emerald-500', t: 'text-emerald-600', b: 'bg-emerald-50' },
        { g: 'bg-amber-500', t: 'text-orange-600', b: 'bg-orange-50' },
        { g: 'bg-violet-500', t: 'text-violet-600', b: 'bg-violet-50' },
        { g: 'bg-teal-500', t: 'text-teal-600', b: 'bg-teal-50' },
    ];
    const theme = themes[index % themes.length];

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (index % 8) }} whileHover={{ y: -8 }}
            className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[22px] p-5 h-full flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-none transition-all cursor-pointer hover:border-indigo-500/30 overflow-hidden"
            onClick={() => onAction(id, 0, false)}>
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity ${theme.g}`} />
            <div className="flex items-center justify-between mb-4 md:mb-8">
                <div className={`hidden md:flex w-10 h-10 rounded-xl items-center justify-center shadow-sm ${theme.b} dark:bg-white/5 ${theme.t}`}><BookOpen className="w-5 h-5" /></div>
                <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-slate-100 dark:bg-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-wide text-slate-500 truncate max-w-[100%]">{category}</span>
                    {locked && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-700/50 flex items-center gap-1">
                            LOCKED
                        </span>
                    )}
                </div>
            </div>
            <div className="flex-1 mb-4 md:mb-10">
                <h3 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white leading-tight mb-1 md:mb-2 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-2">{title}</h3>
                <p className="text-[9px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider">{cardCount} Smart Cards</p>
                {locked && (
                    <p className="text-[10px] font-bold text-amber-600 dark:text-amber-500 mt-3 flex items-center gap-1.5 animate-pulse">
                        <Crown className="w-3.5 h-3.5" /> {course === 'PS_GR_B' ? 'Only for Diamond Members' : 'Only for Gold Members'}
                    </p>
                )}
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex-1 mr-4">
                    <div className="h-1 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${theme.g}`} style={{ width: lastIndex > 0 ? `${((lastIndex + 1) / cardCount) * 100}%` : '0%' }} />
                    </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                    {locked ? <Lock className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform flex justify-center gap-1.5">
                <ActionButton icon={locked ? <Lock className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />} label={locked ? "Locked" : "Open"} onClick={(e: any) => { e.stopPropagation(); onAction(id, 0, false); }} />
                {!locked && <ActionButton icon={<Shuffle className="w-3.5 h-3.5" />} label="Shuffle" onClick={(e: any) => { e.stopPropagation(); onAction(id, 0, true); }} />}
                {!locked && lastIndex > 0 && (
                    <ActionButton icon={<RotateCcw className="w-3.5 h-3.5" />} label="Resume" onClick={(e: any) => { e.stopPropagation(); onAction(id, lastIndex, false); }} />
                )}
            </div>
        </motion.div>
    );
}

function ActionButton({ icon, label, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all border border-slate-100 dark:border-white/10"
        >
            {icon} {label}
        </button>
    );
}
