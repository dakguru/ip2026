"use client";

import DashboardCarousel from "@/components/dashboard/DashboardCarousel";
import Link from "next/link";
import { BookOpen, Layers, PenTool, FileText, Globe, GraduationCap, ChevronRight, Crown, Sparkles, Menu, X, LogOut, Search, User, Home, Lightbulb, MessageCircle, Info, History, Bell, TrendingUp, ChevronRight as ArrowIcon, CheckCircle2, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";

interface MobileDashboardProps {
    displayName: string;
}

export default function MobileDashboard({ displayName }: MobileDashboardProps) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [membership, setMembership] = useState<'free' | 'silver' | 'gold'>('free');
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Sync membership for accurate display
    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const session = JSON.parse(decodeURIComponent(match[2]));
                if (session.membershipLevel) setMembership(session.membershipLevel);
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
        router.push('/login');
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
        } else if (q.includes("community")) {
            router.push("/social");
        } else {
            // Fallback or generic search page if it existed
            // For now redirect to home/explore or just stay
            alert("No direct match found. Try 'Syllabus', 'Mock Tests', etc.");
        }
    };

    const mainFeatures = [
        { label: "Web Guide", icon: BookOpen, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", href: "/guide" },
        ...(isAdmin ? [{ label: "Flashcards", icon: Layers, color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", href: "/flashcards" }] : []),
        { label: "Community", icon: GraduationCap, color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20", href: "https://chat.whatsapp.com/DnXoTNtRie2Hji6Be1lx50" },
        { label: "PDF Notes", icon: FileText, color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", href: "/notes" },
        { label: "Curr. Affairs", icon: Globe, color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", href: "/current-affairs" },
        { label: "DG Blog", icon: PenTool, color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", href: "/blog" },
    ];

    const isGold = membership === 'gold';

    const [recentNotifications, setRecentNotifications] = useState<any[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch('/api/admin/notifications?scope=public');
                const data = await res.json();
                if (data.notifications) {
                    const mapped = data.notifications.map((n: any) => {
                        let icon = Info;
                        let color = "text-blue-500";

                        // Map type to icon/color
                        switch (n.type) {
                            case 'system':
                            case 'deployment':
                                icon = Info; color = "text-blue-500"; break;
                            case 'enrollment':
                            case 'membership_upgrade':
                                icon = Sparkles; color = "text-amber-500"; break;
                            case 'purchase':
                            case 'coupon_claim':
                                icon = TrendingUp; color = "text-green-500"; break;
                            case 'community_post':
                            case 'community_comment':
                                icon = MessageCircle; color = "text-indigo-500"; break;
                            case 'admin_message':
                                icon = Bell; color = "text-red-500"; break;
                            default:
                                icon = Info; color = "text-slate-500";
                        }

                        // Calculate time ago
                        const diff = Math.floor((new Date().getTime() - new Date(n.createdAt).getTime()) / 1000);
                        let timeStr = "";
                        if (diff < 60) timeStr = "Now";
                        else if (diff < 3600) timeStr = `${Math.floor(diff / 60)}m ago`;
                        else if (diff < 86400) timeStr = `${Math.floor(diff / 3600)}h ago`;
                        else timeStr = `${Math.floor(diff / 86400)}d ago`;

                        return {
                            title: n.title,
                            desc: n.message,
                            time: timeStr,
                            icon,
                            color
                        };
                    });
                    setRecentNotifications(mapped);
                }
            } catch (e) {
                console.error("Failed to fetch notifications", e);
            }
        };

        if (notifOpen) {
            fetchNotifications();
        }
    }, [notifOpen]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black pb-32 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
            {/* --- ROYAL HEADER --- */}
            <header className="sticky top-0 z-40 bg-slate-900 dark:bg-black px-5 py-4 pt-[max(16px,env(safe-area-inset-top))] border-b border-slate-800 shadow-xl shadow-slate-900/20">
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
                                    <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center gap-4 bg-slate-50 dark:bg-zinc-900">
                                        <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-white shadow-md">
                                            <Image src="/dak-guru-round.png" alt="Logo" fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100 tracking-tight">Dak Guru</h2>
                                            <p className="text-xs text-slate-500 font-medium">Professional Learning</p>
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
                                        ].map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-3 p-3.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-medium transition-colors"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <item.icon className={`w-5 h-5 ${item.color}`} /> {item.label}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 space-y-4">
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

                        <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded-full border border-slate-700 shadow-sm">
                            <Image src="/dak-guru-round.png" alt="Branding" fill className="object-cover" />
                        </div>
                        {/* UPDATE: Branding Text Color */}
                        <span className="text-xl md:text-2xl font-bold text-blue-500 tracking-wide">
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

                        {/* NOTIFICATIONS SHEET */}
                        <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
                            <SheetTrigger asChild>
                                <button className="text-slate-300 hover:text-white transition-colors relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[85%] sm:w-[400px] p-0 bg-white dark:bg-zinc-950 border-l-zinc-800">
                                <div className="h-full flex flex-col">
                                    <div className="p-5 border-b border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 pt-[max(20px,env(safe-area-inset-top))]">
                                        <SheetHeader className="text-left">
                                            <SheetTitle className="text-lg font-bold text-slate-900 dark:text-zinc-100">Notifications</SheetTitle>
                                            <SheetDescription className="text-xs text-slate-500">Stay updated with latest changes</SheetDescription>
                                        </SheetHeader>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {recentNotifications.map((note, i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-800 shadow-sm">
                                                <div className={`mt-1 p-2 rounded-lg h-fit ${note.color.replace('text-', 'bg-')}/10`}>
                                                    <note.icon className={`w-5 h-5 ${note.color}`} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-zinc-100 leading-tight mb-1">{note.title}</h4>
                                                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-2">{note.desc}</p>
                                                    <span className="text-[10px] font-semibold text-slate-400">{note.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* User Avatar */}
                        <Link href="/settings">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 p-[1.5px]">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                    <User className="w-4 h-4 text-amber-100" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* User Greeting - Inside Header for Royal Feel */}
                <div className="mt-5 mb-1 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Hello,</p>
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            {displayName} <span className="text-lg">👋</span>
                        </h1>
                    </div>

                </div>
            </header>

            <div className="space-y-6 pt-5">

                {/* --- ANNOUNCEMENT BANNER (Clean & Professional) --- */}
                {/* --- LIVE MOCK TEST BANNER (Royal & Urgent) --- */}
                <div className="px-4 md:px-6">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 shadow-xl shadow-purple-900/20 p-5">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-200 font-bold text-[10px] uppercase tracking-wider">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
                                    </span>
                                    Upcoming
                                </div>
                                <span className="text-[10px] font-medium text-purple-200 bg-white/10 px-2 py-0.5 rounded-md">
                                    Jan 24 - 25
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                All India <br /> Mock Test - 02
                            </h3>

                            <div className="bg-black/20 rounded-lg p-3 border border-white/5 mb-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Syllabus</p>
                                <ul className="space-y-1">
                                    <li className="text-xs text-slate-200 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-green-400" /> Consumer Protection Act, 2019
                                    </li>
                                    <li className="text-xs text-slate-200 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-green-400" /> IT Act, 2000
                                    </li>
                                    <li className="text-xs text-slate-200 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-green-400" /> PO Rules & Regulations 2024
                                    </li>
                                </ul>
                            </div>

                            <Link href="/quiz" className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
                                <PlayCircle className="w-4 h-4 fill-indigo-900" />
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- CAROUSEL (Royal) --- */}
                <div className="px-4 md:px-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg shadow-blue-900/10">
                        <DashboardCarousel />
                    </div>
                </div>

                {/* --- PRO UPGRADE CARD (Royal Theme) --- */}
                {!isGold && (
                    <div className="px-4 md:px-6">
                        <Link href="/pricing" className="block relative overflow-hidden rounded-2xl shadow-xl shadow-slate-900/5 group transform transition-all duration-300 hover:scale-[1.01]">
                            {/* Deep Royal Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>

                            {/* Gold Accents */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl -ml-8 -mb-8"></div>

                            <div className="relative z-10 p-5 flex flex-row items-center justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                                        <Crown className="w-3 h-3 fill-current" />
                                        <span>Premium</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white leading-tight">
                                            Upgrade to Gold
                                        </h3>
                                        <p className="text-xs text-slate-400 font-medium mt-1">
                                            Unlock full mock tests & PDF library.
                                        </p>
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold text-xs shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-1">
                                        Get Started <ChevronRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* --- QUICK ACTIONS (Symmetrical Grid) --- */}
                <div className="px-4 md:px-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="h-4 w-1 bg-blue-600 rounded-full"></div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                            Quick Actions
                        </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
                        {mainFeatures.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className={`w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-2xl flex items-center justify-center ${item.bg} text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-zinc-800 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 relative overflow-hidden`}>
                                    {/* Subtle shine effect */}
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <item.icon className={`w-8 h-8 ${item.color} drop-shadow-sm`} strokeWidth={1.5} />
                                </div>
                                <span className="text-[11px] font-bold text-center text-slate-600 dark:text-zinc-400 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- COMMUNITY (Creative & Attractive Banner) --- */}
                <div className="px-4 md:px-6 pb-4">
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 shadow-xl shadow-indigo-500/30 transition-shadow hover:shadow-indigo-500/50">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                        <div className="relative p-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
                                    <MessageCircle className="w-6 h-6 text-white fill-white/20" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-white tracking-wide">Join Community</h3>
                                    <p className="text-xs text-indigo-100 mt-1 leading-snug font-medium opacity-90">
                                        Connect, discuss & grow with toppers.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/social"
                                className="shrink-0 px-4 py-2 bg-white text-indigo-700 rounded-lg text-[11px] font-extrabold uppercase tracking-wider hover:bg-indigo-50 transition-transform active:scale-95 shadow-lg shadow-black/20"
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
