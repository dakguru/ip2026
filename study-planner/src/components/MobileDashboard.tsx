"use client";

import DashboardCarousel from "@/components/dashboard/DashboardCarousel";
import Link from "next/link";
import { BookOpen, Layers, PenTool, FileText, Globe, GraduationCap, ChevronRight, Crown, Sparkles, Menu, X, LogOut, Search, User, Home, Lightbulb, MessageCircle, Info, History } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"; // Assuming you have shadcn Sheet
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";

interface MobileDashboardProps {
    displayName: string;
}

export default function MobileDashboard({ displayName }: MobileDashboardProps) {
    const router = useRouter();
    const [membership, setMembership] = useState<'free' | 'silver' | 'gold'>('free');
    const [menuOpen, setMenuOpen] = useState(false);

    // Sync membership for accurate display
    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[2]));
                if (session.membershipLevel) setMembership(session.membershipLevel);
            } catch (e) {
                console.error("Session parse error", e);
            }
        }
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const mainFeatures = [
        { label: "Web Guide", icon: BookOpen, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", href: "/guide" },
        { label: "Flashcards", icon: Layers, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20", href: "/flashcards" },
        { label: "Community", icon: GraduationCap, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20", href: "/social" },
        { label: "PDF Notes", icon: FileText, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", href: "/notes" },
        { label: "Curr. Affairs", icon: Globe, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", href: "/current-affairs" },
        { label: "DG Blog", icon: PenTool, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", href: "/blog" },
    ];

    const isGold = membership === 'gold';

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-black pb-32 font-sans">
            {/* Custom Header - Matches Screenshot 2 */}
            <header className="sticky top-0 z-40 bg-zinc-950 px-4 py-3 flex items-center justify-between pt-[max(12px,env(safe-area-inset-top))] border-b border-zinc-900">
                <div className="flex items-center gap-4">
                    {/* Hamburger Menu (Left Panel Trigger) */}
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger asChild>
                            <button className="text-zinc-400 hover:text-white transition-colors">
                                <Menu className="w-7 h-7" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0 border-r-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                            <div className="h-full flex flex-col">
                                <SheetTitle className="sr-only">Menu</SheetTitle> {/* Accessibility fix */}
                                <SheetDescription className="sr-only">Navigation Menu</SheetDescription>
                                {/* Sheet Header */}
                                <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 bg-white dark:bg-zinc-900">
                                    <div className="relative w-10 h-10 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700">
                                        <Image src="/dak-guru-round.png" alt="Logo" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Dak Guru</h2>
                                        <p className="text-xs text-zinc-500">Learning App</p>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                    <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <Home className="w-5 h-5 text-zinc-400" /> Home
                                    </Link>
                                    <Link href="/guide" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <Lightbulb className="w-5 h-5 text-blue-500" /> Web Guide
                                    </Link>
                                    <Link href="/syllabus" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <BookOpen className="w-5 h-5 text-purple-500" /> Syllabus
                                    </Link>
                                    <Link href="/pyq" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <History className="w-5 h-5 text-orange-500" /> Previous Year Qs
                                    </Link>
                                    <Link href="/social" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <MessageCircle className="w-5 h-5 text-indigo-500" /> Community
                                    </Link>
                                    <Link href="/current-affairs" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <Globe className="w-5 h-5 text-emerald-500" /> Current Affairs
                                    </Link>
                                    <Link href="/notes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <FileText className="w-5 h-5 text-rose-500" /> PDF Notes
                                    </Link>
                                    <Link href="/about" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors" onClick={() => setMenuOpen(false)}>
                                        <Info className="w-5 h-5 text-zinc-400" /> About Us
                                    </Link>
                                </div>

                                {/* Sheet Footer */}
                                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Theme</span>
                                        <ThemeToggle />
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-red-600 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" /> Log Out
                                    </button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo & Text - Matches Screenshot */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded-full border border-zinc-800 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <Image src="/dak-guru-round.png" alt="Logo" fill className="object-cover" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 hidden sm:inline-block md:inline-block">
                            Dak Guru
                        </span>
                        <span className="text-xl font-bold text-blue-400 sm:hidden">
                            Dak Guru
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {/* Glowing UPGRADE Button - Hidden for Free & Gold Users (Only for Silver) */}
                    {membership === 'silver' && (
                        <Link href="/pricing" className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full opacity-60 group-hover:opacity-100 blur-[6px] transition duration-200 animate-pulse"></div>
                            <div className="relative px-4 py-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg border border-amber-300/50">
                                <span className="text-amber-950 text-[11px] font-black uppercase tracking-widest whitespace-nowrap drop-shadow-sm">Upgrade</span>
                            </div>
                        </Link>
                    )}

                    {/* User Avatar - Matches Screenshot */}
                    <Link href="/settings">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </Link>
                </div>
            </header>

            <div className="space-y-8 pt-4">
                {/* Welcome Message */}
                <div className="px-5 pt-4 pb-2">
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Hello, Aspirant</p>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-800 dark:from-white dark:via-zinc-200 dark:to-zinc-400 truncate tracking-tight">
                        Welcome, {displayName.split(' ')[0]} <span className="text-3xl align-middle">👋</span>
                    </h1>
                </div>

                {/* --- ANDROID ANNOUNCEMENT BANNER --- */}
                <div className="px-5">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 shadow-lg shadow-indigo-500/20">
                        {/* Background Deco */}
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>

                        <div className="relative z-10 flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 shrink-0">
                                <Info className="w-5 h-5 text-indigo-100" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white mb-1">App Update Available!</h4>
                                <p className="text-xs text-indigo-100 leading-relaxed font-medium opacity-90">
                                    We've fixed the "Back Button" issue. Please update your app from the Play Store for a smoother experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. Carousel */}
                <div className="pl-4">
                    <DashboardCarousel />
                </div>

                {/* PRO UPGRADE CARD - Hidden for Gold Users */}
                {!isGold && (
                    <div className="px-5">
                        <Link href="/pricing" className="block relative overflow-hidden rounded-[2rem] shadow-xl shadow-amber-500/20 group transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600"></div>

                            {/* Decorative Patterns */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/15 transition-colors duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl -ml-12 -mb-12"></div>

                            <div className="relative z-10 p-4 flex flex-row items-center justify-between gap-3">
                                <div className="text-white space-y-1">
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                        <Crown className="w-2.5 h-2.5 text-yellow-200 fill-current" />
                                        <span>Premium Access</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black leading-tight mb-0.5 drop-shadow-sm">
                                            Upgrade to Gold
                                        </h3>
                                        <p className="text-xs text-amber-50 font-medium leading-relaxed max-w-[200px]">
                                            Unlock full syllabus mock tests & PDF library.
                                        </p>
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <span className="inline-flex items-center gap-1.5 bg-white text-orange-600 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xl shadow-black/10 group-hover:bg-orange-50 transition-colors">
                                        Get Started <ChevronRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* 2. Main Features Grid (Crisp Shadows) */}
                <div className="px-5">
                    <div className="flex items-center justify-between mb-5 px-1">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-500" /> Quick Actions
                        </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {mainFeatures.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className={`w-[84px] h-[84px] rounded-[1.5rem] flex items-center justify-center ${item.bg} ${item.color} shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] border border-white dark:border-zinc-800 active:scale-95 transition-all duration-300 group-hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)] group-hover:-translate-y-1`}>
                                    <item.icon className="w-8 h-8 opacity-100 drop-shadow-sm" strokeWidth={1.8} />
                                </div>
                                <span className="text-xs font-semibold text-center text-zinc-600 dark:text-zinc-400 leading-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 3. Community Highlights (Stunning Card) */}
                <div className="px-5">
                    <div className="group relative overflow-hidden rounded-[2rem] bg-indigo-600 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.4)] active:scale-[0.98] transition-all">
                        {/* Background Image/Gradient */}
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700"></div>

                        <div className="relative z-10 p-6 sm:p-8 text-white flex flex-col items-start">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-inner">
                                <GraduationCap className="w-6 h-6 text-indigo-100" />
                            </div>

                            <h3 className="text-xl font-bold mb-2">Join the Community</h3>
                            <p className="text-indigo-100 text-sm mb-6 leading-relaxed max-w-xs font-medium opacity-90">
                                Connect with thousands of aspirants. Discuss doubts, share strategies, and grow together.
                            </p>

                            <Link href="/social" className="w-full sm:w-auto text-center bg-white text-indigo-700 px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:bg-indigo-50 transition-colors">
                                Enter Discussion Forum
                            </Link>
                        </div>

                        {/* Decorative 3D Effect */}
                        <div className="absolute -right-8 -bottom-8 opacity-10 transform rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <GraduationCap className="w-48 h-48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
