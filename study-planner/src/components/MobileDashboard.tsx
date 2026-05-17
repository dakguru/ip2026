"use client";

import DashboardCarousel from "@/components/dashboard/DashboardCarousel";
import Link from "next/link";
import { BookOpen, Layers, PenTool, FileText, Globe, GraduationCap, ChevronRight, Crown, Sparkles, Menu, X, LogOut, Search, User, Home, Lightbulb, MessageCircle, Info, History, Bell, TrendingUp, ChevronRight as ArrowIcon, CheckCircle2, PlayCircle, Trophy, Newspaper, AlertCircle, Shield } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";
import MockTestAnnouncementPopup from "@/components/MockTestAnnouncementPopup";
import LiveMockTestBanner from "@/components/LiveMockTestBanner";
import UpdatesDrawer from "./UpdatesDrawer";
import { getMembershipLevel, getDisplayMembership } from "@/lib/membership-utils";
import SpecialAnnouncementMarquee from "@/components/SpecialAnnouncementMarquee";

interface MobileDashboardProps {
    displayName: string;
}

export default function MobileDashboard({ displayName }: MobileDashboardProps) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [membership, setMembership] = useState<'free' | 'silver' | 'gold' | 'diamond' | 'platinum'>('free');
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [updatesOpen, setUpdatesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const popupTriggerRef = useRef<(() => void) | null>(null);

    // Sync membership for accurate display
    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[2]));
                // Use getDisplayMembership to resolve correct display name from planName
                const level = getDisplayMembership(session.membershipLevel, session.planName);
                setMembership(level);
                if (session.role === 'admin' || session.membershipLevel === 'admin' || session.isAdmin === true) {
                    setIsAdmin(true);
                }
            } catch (e) {
                console.error("Session parse error", e);
            }
        }
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/login?logout=true';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = searchQuery.toLowerCase();
        setSearchOpen(false);

        if (q.includes("syllabus")) {
            router.push("/syllabus");
        } else if (q.includes("mock") || q.includes("test") || q.includes("quiz")) {
            router.push("/quiz");
        } else if (q.includes("flash")) {
            router.push("/flashcards");
        } else if (q.includes("note") || q.includes("pdf")) {
            router.push("/notes");
        } else if (q.includes("conduct") || q.includes("ccs")) {
            router.push("/quiz?topic=p1-04"); // Assuming ID for CCS Rules or general quiz page
        } else if (q.includes("dak") || q.includes("sutra") || q.includes("rule")) {
            router.push("/dak-sutra");
        } else if (q.includes("community")) {
            router.push("/social");
        } else {
            // Fallback or generic search page if it existed
            // For now redirect to home/explore or just stay
            alert("No direct match found. Try 'Syllabus', 'Mock Tests', etc.");
        }
    };

    const mainFeatures = [
        { label: "PDF Notes", icon: FileText, color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", href: "/notes" },
        { label: "MCQs", icon: CheckCircle2, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", href: "/quiz" },
        { label: "Mock Tests", icon: Trophy, color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", href: "/mock-tests" },
        { label: "Flash Cards", icon: Layers, color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", href: "/flashcards" },
        { label: "Dak Sutra", icon: Newspaper, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", href: "/dak-sutra" },
        { label: "Community", icon: GraduationCap, color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20", href: "/social" },
        { label: "Current Affairs", icon: Globe, color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", href: "/current-affairs" },
        { label: "Admin Panel", icon: Shield, color: "text-red-700 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20", href: "/admin", adminOnly: true },
    ];

    const isGold = getMembershipLevel(membership) >= 3;

    const [recentNotifications, setRecentNotifications] = useState<any[]>([]);

    // Notification fetch removed as bell icon now shows What's New drawer
    useEffect(() => {
        // ... any other side effects ...
    }, []);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchEnd - touchStart;
        const isLeftToRight = distance > 80;
        const startedFromEdge = touchStart < 60; // Start swipe from left edge

        if (isLeftToRight && startedFromEdge) {
            setMenuOpen(true);
        }
    };

    return (
        <div
            className="h-[100dvh] overflow-hidden bg-[#f8f9fb] dark:bg-[#0a0a0a] flex flex-col font-sans selection:bg-blue-100 dark:selection:bg-blue-900"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >

            {/* --- ROYAL HEADER (Fixed) --- */}

            <header className="shrink-0 z-40 bg-gradient-to-br from-[#0c1631] via-[#162044] to-[#0f172a] dark:from-[#020617] dark:via-[#0a1128] dark:to-[#020617] px-5 py-4 pt-[max(16px,env(safe-area-inset-top))] shadow-xl shadow-slate-900/30 relative">
                {/* Subtle accent bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/60 via-indigo-400/80 to-purple-500/60"></div>
                <div className="flex items-center justify-between">
                    {/* Left: Hamburger + Brand */}
                    <div className="flex items-center gap-3">
                        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                            <SheetTrigger asChild>
                                <button className="text-slate-300 hover:text-white transition-colors p-1 -ml-1">
                                    <Menu className="w-6 h-6" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0 border-r-zinc-800 bg-white dark:bg-zinc-950">
                                {/* ... existing drawer content ... */}
                                <div className="h-full flex flex-col">
                                    <SheetHeader className="sr-only">
                                        <SheetTitle>Menu</SheetTitle>
                                        <SheetDescription>Navigation Menu</SheetDescription>
                                    </SheetHeader>
                                    <div className="p-6 pt-[max(32px,env(safe-area-inset-top))] border-b border-slate-100 dark:border-zinc-800 flex items-center gap-4 bg-slate-50 dark:bg-zinc-900">
                                        <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-white shadow-md">
                                            <Image src="/dak-guru-round.png" alt="Logo" fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100 tracking-tight">Dak Guru</h2>
                                            <p className="text-xs text-slate-500 font-medium">A Self-Learning Portal</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 space-y-1">
                                        {/* WhatsApp Group Button - Sidebar */}
                                        <a
                                            href="https://chat.whatsapp.com/DnXoTNtRie2Hji6Be1lx50"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3.5 mb-2 rounded-lg bg-[#25D366]/10 text-[#128C7E] dark:text-[#25D366] font-bold border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
                                        >
                                            <MessageCircle className="w-5 h-5 fill-current" />
                                            Join WhatsApp Group
                                        </a>

                                        {[
                                            { href: "/", icon: Home, label: "Home", color: "text-slate-500" },
                                            { href: "/guide", icon: Lightbulb, label: "Web Guide", color: "text-blue-600" },
                                            { href: "/syllabus", icon: BookOpen, label: "Syllabus", color: "text-purple-600" },
                                            { href: "/pyq", icon: History, label: "Previous Year Qs", color: "text-orange-600" },
                                            { href: "/social", icon: MessageCircle, label: "Community", color: "text-indigo-600" },
                                            { href: "/current-affairs", icon: Globe, label: "Current Affairs", color: "text-emerald-600" },
                                            { href: "/notes", icon: FileText, label: "PDF Notes", color: "text-rose-600" },
                                            { href: "/about", icon: Info, label: "About Us", color: "text-slate-500" },
                                            ...(isAdmin ? [{ href: "/admin", icon: Shield, label: "Admin Panel", color: "text-red-600" }] : []),
                                        ].map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-3 p-3.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-medium transition-colors"
                                                onClick={(e) => {
                                                    setMenuOpen(false);
                                                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                                                        e.preventDefault();
                                                        router.push(item.href);
                                                    }
                                                }}
                                            >
                                                <item.icon className={`w-5 h-5 ${item.color}`} /> {item.label}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="p-4 pb-[max(32px,env(safe-area-inset-bottom))] border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 space-y-4">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">Appearance</span>
                                            <ThemeToggle />
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all"
                                        >
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <div className="relative w-7 h-7 overflow-hidden rounded-full border-[1.5px] border-cyan-400/60 shadow-[0_0_14px_rgba(56,189,248,0.5)]">
                            <Image src="/dak-guru-round.png" alt="Branding" fill className="object-cover scale-110" />
                        </div>
                        <span className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
                            Dak Guru
                        </span>
                    </div>

                    {/* Right: Icons & Profile */}
                    <div className="flex items-center gap-4 md:gap-6">

                        {/* SEARCH SHEET */}
                        <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
                            <SheetTrigger asChild>
                                <button className="text-slate-300 hover:text-white transition-colors relative">
                                    <Search className="w-5 h-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="top" className="h-[90vh] sm:h-auto w-full p-0 bg-slate-50 dark:bg-zinc-950 border-b-0 rounded-b-2xl">
                                <div className="p-4 pt-[max(16px,env(safe-area-inset-top))]">
                                    <SheetHeader className="sr-only">
                                        <SheetTitle>Search</SheetTitle>
                                    </SheetHeader>
                                    <form onSubmit={handleSearch} className="flex items-center gap-3 relative mb-6">
                                        <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Search (e.g., 'Syllabus', 'Mock Test')"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                autoFocus
                                                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-400 font-medium"
                                            />
                                        </div>
                                        <button type="button" onClick={() => setSearchOpen(false)} className="p-2 bg-slate-200 dark:bg-zinc-800 rounded-full">
                                            <X className="w-5 h-5 text-slate-600 dark:text-zinc-400" />
                                        </button>
                                    </form>

                                    <div className="px-1">
                                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">Trending Now</h3>
                                        <div className="space-y-2">
                                            <button onClick={() => { setSearchOpen(false); router.push('/quiz'); }} className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-blue-500/30 transition-all group text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <span className="font-semibold text-slate-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Live Mock Test</span>
                                                </div>
                                                <ArrowIcon className="w-4 h-4 text-slate-400" />
                                            </button>

                                            <button onClick={() => { setSearchOpen(false); router.push('/syllabus'); }} className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-purple-500/30 transition-all group text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                                        <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                    </div>
                                                    <span className="font-semibold text-slate-700 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">Syllabus</span>
                                                </div>
                                                <ArrowIcon className="w-4 h-4 text-slate-400" />
                                            </button>

                                            {isAdmin && (
                                                <button onClick={() => { setSearchOpen(false); router.push('/flashcards'); }} className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-amber-500/30 transition-all group text-left">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                                                            <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                                        </div>
                                                        <span className="font-semibold text-slate-700 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">Flash Cards</span>
                                                    </div>
                                                    <ArrowIcon className="w-4 h-4 text-slate-400" />
                                                </button>
                                            )}

                                            <button onClick={() => { setSearchOpen(false); router.push('/quiz?topic=ccs-rules'); }} className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-emerald-500/30 transition-all group text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                                                        <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                    <span className="font-semibold text-slate-700 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">CCS Conduct Rules MCQs</span>
                                                </div>
                                                <ArrowIcon className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* WHAT'S NEW DRAWER TRIGGER */}
                        <button
                            onClick={() => setUpdatesOpen(true)}
                            className="text-slate-300 hover:text-white transition-colors relative p-1"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                        </button>


                    </div>
                </div>

                {/* User Greeting - Inside Header for Royal Feel */}
                <div className="mt-5 mb-1 flex items-center justify-between">
                    <div>
                        <p className="text-indigo-300/70 text-[11px] font-semibold tracking-wide">Welcome back,</p>
                        <h1 className="text-[22px] font-extrabold text-white flex items-center gap-2 tracking-tight">
                            {displayName} <span className="text-lg">👋</span>
                        </h1>
                    </div>

                </div>
            </header>

            {/* --- SCROLLABLE BODY --- */}
            <div className="flex-1 overflow-y-auto overscroll-contain pb-32">
            <div className="space-y-6 pt-5">
                {/* Android App Payment Announcement */}

                {/* --- SPECIAL ANNOUNCEMENT MARQUEE --- */}
                <SpecialAnnouncementMarquee />

                {/* --- ANNOUNCEMENT BANNER (Clean & Professional) --- */}
                <LiveMockTestBanner />



                {/* --- QUICK ACTIONS (NOW SECOND) --- */}
                <div className="px-5">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="h-5 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                        <h3 className="text-[11px] font-extrabold text-slate-700 dark:text-zinc-300 uppercase tracking-[0.08em]">
                            Study Tools
                        </h3>
                    </div>

                    <div className="grid grid-cols-4 gap-x-2 gap-y-5">
                        {mainFeatures
                            .filter(item => {
                                if ((item as any).adminOnly) return isAdmin;
                                if (item.label === "Dak Sutra") return false;
                                return true;
                            })

                            .map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="flex flex-col items-center gap-2 group active:scale-90 transition-all duration-150"
                                >
                                    <div className={`w-[56px] h-[56px] rounded-2xl flex items-center justify-center ${item.bg} shadow-sm border border-black/[0.04] dark:border-white/[0.06] transition-all duration-200 relative overflow-hidden`}>
                                        <item.icon className={`w-6 h-6 ${item.color}`} strokeWidth={1.8} />
                                    </div>
                                    <span className="text-[10px] font-bold text-center text-slate-600 dark:text-zinc-400 leading-tight tracking-tight max-w-[64px]">
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                    </div>
                </div>

                {/* --- DAK SUTRA BAR BUTTON --- */}
                <div className="px-5">
                    <Link href="/dak-sutra" className="group block active:scale-[0.98] transition-all duration-200">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a2f6e] via-[#1e3a8a] to-[#1d4ed8] shadow-lg shadow-blue-900/30">
                            {/* Background decorative elements */}
                            <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
                            {/* Shine sweep on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                            <div className="relative z-10 flex items-center gap-4 px-5 py-4">
                                {/* Icon container */}
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-inner">
                                    <Newspaper className="w-6 h-6 text-white drop-shadow" strokeWidth={1.8} />
                                </div>

                                {/* Text content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-sm font-black text-white tracking-wide">Dak Sutra</span>
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-[8px] font-black text-amber-300 uppercase tracking-wider">
                                            Exclusive
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-blue-200/80 font-semibold uppercase tracking-wider truncate">
                                        Rules, Circulars &amp; Guidelines
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* --- CAROUSEL (NOW THIRD - THE "SECOND BANNER") --- */}
                <div className="px-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-4 w-1 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
                            Live Events & Updates
                        </h3>
                    </div>
                    <DashboardCarousel />
                </div>

                {/* --- PRO UPGRADE CARD --- */}
                {!isGold && (
                    <div className="px-5">
                        <Link href="/pricing" className="block relative overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10 group active:scale-[0.98] transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800"></div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="relative z-10 p-6 flex flex-row items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[9px] font-black text-amber-400 uppercase tracking-[0.1em]">
                                        <Crown className="w-2.5 h-2.5 fill-current" />
                                        <span>Pro Membership</span>
                                    </div>
                                    <h3 className="text-lg font-black text-white leading-tight">Upgrade to Gold</h3>
                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Full Mock Tests & PDF Library</p>
                                </div>

                                <div className="shrink-0 bg-amber-500 text-black px-4 py-2 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-amber-500/20">
                                    Go Pro
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* --- COMMUNITY --- */}
                <div className="px-5 pb-6">
                    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 to-blue-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="relative p-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-white">Join Community</h3>
                                    <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-wider opacity-80 mt-1">Connect with Toppers</p>
                                </div>
                            </div>
                            <Link href="/social" className="bg-white text-indigo-700 px-4 py-2 rounded-xl font-black text-[10px] uppercase shadow-lg">Join</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>{/* end scrollable body */}

            {/* What's New Drawer Component */}
            <UpdatesDrawer isOpen={updatesOpen} onClose={() => setUpdatesOpen(false)} />
        </div >
    );
}

function MockTest04CompactTimer({ onOpen }: { onOpen: () => void }) {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        const targetDate = new Date('2026-02-07T00:00:00+05:30');

        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return null;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            // Recalculate time left
            const difference = +targetDate - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft(null); // Or handle expire
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    return (
        <div className="px-5 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <button
                onClick={onOpen}
                className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-xl p-3 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all group"
            >
                {/* Visual effects */}
                <div className="absolute inset-0 bg-white/5 opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg border border-white/20">
                            {/* Calendar Icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-5 h-5 text-white"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
                        </div>
                        <div className="text-left">
                            <h4 className="text-xs font-bold text-indigo-100 uppercase tracking-wider mb-0.5">Upcoming Test</h4>
                            <p className="text-sm font-black text-white leading-none">Mock Test - 04</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                        <div className="text-center">
                            <span className="block text-xs font-black text-white leading-none">{timeLeft.days}</span>
                            <span className="block text-[8px] font-bold text-indigo-200">DAYS</span>
                        </div>
                        <span className="text-white/40 font-light">:</span>
                        <div className="text-center">
                            <span className="block text-xs font-black text-white leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="block text-[8px] font-bold text-indigo-200">HRS</span>
                        </div>
                        <span className="text-white/40 font-light">:</span>
                        <div className="text-center">
                            <span className="block text-xs font-black text-white leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="block text-[8px] font-bold text-indigo-200">MIN</span>
                        </div>
                        {/* Chevron Right SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-4 h-4 text-white ml-1 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                </div>
            </button>
        </div>
    );
}
