"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, MessageCircle, Menu, X, LogOut, User, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { useEffect, useState } from "react";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { useCourse } from "@/contexts/CourseContext";
import UpdatesDrawer from "./UpdatesDrawer";

export default function HomeHeader({ isLoggedIn, membershipLevel }: { isLoggedIn: boolean, membershipLevel?: 'free' | 'silver' | 'gold' }) {
    const router = useRouter();
    const { course } = useCourse();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentMembership, setCurrentMembership] = useState<'free' | 'silver' | 'gold'>(membershipLevel || 'free');
    const [sessionData, setSessionData] = useState<any>(null);
    const [showUpdates, setShowUpdates] = useState(false);

    useEffect(() => {
        // Sync membership from cookie to ensure immediate update after payment
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                const session = JSON.parse(decoded);
                setSessionData(session);
                if (session.membershipLevel) {
                    setCurrentMembership(session.membershipLevel);
                }
            } catch (e) {
                console.error("Session parse error", e);
            }
        }
    }, [membershipLevel]); // Re-run if prop changes, but also run on mount

    const isMobileApp = useIsMobileApp();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            // Use ?logout=true to tell middleware to ignore any lingering tokens and force cookie deletion
            window.location.href = '/login?logout=true';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        const validateSession = async () => {
            // 1. Initial sync from cookie
            const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
            let sessionData: any = {};
            if (match) {
                try {
                    const decoded = decodeURIComponent(match[2]);
                    const sessionDataObj = JSON.parse(decoded);
                    if (!sessionData) setSessionData(sessionDataObj);
                    if (sessionDataObj.membershipLevel) {
                        setCurrentMembership(sessionDataObj.membershipLevel);
                    }
                } catch (e) {
                    console.error("Session parse error", e);
                }
            }

            // 2. Fetch fresh data from server to catch DB changes (admin updates)
            // Throttle: only check once every 2 minutes unless membershipLevel prop changed
            const now = Date.now();
            const lastCheck = parseInt(sessionStorage.getItem('last_session_check') || '0');

            if ((isLoggedIn || match) && (now - lastCheck > 120000)) {
                try {
                    const res = await fetch('/api/auth/me');
                    if (res.ok) {
                        const data = await res.json();
                        sessionStorage.setItem('last_session_check', now.toString());
                        if (data.user && data.user.membershipLevel) {
                            const distinct = data.user.membershipLevel !== currentMembership;
                            // If DB says something different than what we have (or what was in cookie)
                            if (distinct || data.user.membershipLevel !== sessionData.membershipLevel) {
                                console.log("Updating membership from server:", data.user.membershipLevel);
                                setCurrentMembership(data.user.membershipLevel);
                                setSessionData((prev: any) => ({ ...prev, ...data.user }));

                                // Update the cookie
                                const newSession = { ...sessionData, ...data.user };
                                // recreate cookie string
                                const expires = new Date();
                                expires.setDate(expires.getDate() + 1); // 1 day
                                document.cookie = `user_session=${encodeURIComponent(JSON.stringify(newSession))}; path=/; max-age=86400; samesite=strict`;

                                // Trigger a router refresh to propagate changes if needed
                                router.refresh();
                            }
                        }
                    }
                } catch (err) {
                    console.error("Failed to validate session", err);
                }
            }
        };

        validateSession();
    }, [isLoggedIn, currentMembership, router]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when resizing to larger screen
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const isPremium = currentMembership === 'gold' || currentMembership === 'silver';

    let displayMembership = currentMembership as string;
    const plan = (sessionData?.planId || "").toLowerCase();
    const planName = (sessionData?.planName || "").toLowerCase();

    if (currentMembership !== 'free') {
        if (plan.includes('diamond') || planName.includes('diamond') || plan.includes('ps_gr_b')) {
            displayMembership = 'diamond';
        } else if (plan.includes('platinum') || planName.includes('platinum')) {
            displayMembership = 'platinum';
        }
    }

    return (
        <>
            <header className={`sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617] transition-all pt-[max(12px,env(safe-area-inset-top))] ${scrolled ? 'shadow-lg shadow-blue-900/20 py-2' : 'py-3'}`}>
                {/* Animated gradient bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 opacity-80"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8">

                        {/* 1. Left: Logo & Nav */}
                        <div className="flex items-center gap-4 md:gap-8">
                            {/* Mobile Menu Button - Hide on Native App */}
                            <button
                                className={`lg:hidden p-2 -ml-2 text-white/80 hover:text-cyan-300 hover:bg-white/10 rounded-md transition-colors ${isMobileApp ? 'hidden' : ''}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>

                            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                                <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(56,189,248,0.6)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.9)] transition-shadow duration-300">
                                    <Image src="/dak-guru-round.png" alt="Dak Guru" fill className="object-cover scale-110" priority />
                                </div>
                                <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-sm">
                                    Dak Guru
                                </span>
                            </Link>

                            <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold whitespace-nowrap">
                                <Link href="/" className="text-white/80 hover:text-cyan-300 transition-colors duration-200">Home</Link>
                                <Link href="/about" className="text-white/80 hover:text-pink-300 transition-colors duration-200">About Us</Link>
                                <Link href="/blog" className="text-white/80 hover:text-amber-300 transition-colors duration-200">DG Blog</Link>
                                <Link href="/social" className="text-white/80 hover:text-green-300 transition-colors duration-200">DG Community</Link>
                                <Link href="/current-affairs" className="text-white/80 hover:text-purple-300 transition-colors duration-200">Current Affairs</Link>
                            </nav>
                        </div>

                        {/* Spacer removed */}

                        {/* 3. Right: Actions */}
                        <div className="flex items-center gap-2 sm:gap-2 shrink-0 md:ml-8 lg:ml-12">
                            {/* Updates Bell - Visible on Desktop only */}
                            <button
                                onClick={() => setShowUpdates(true)}
                                className="hidden lg:block relative p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-yellow-300 transition-colors mr-1 sm:mr-2"
                                aria-label="Updates"
                            >
                                <Bell className="w-5 h-5 sm:w-5 sm:h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
                            </button>

                            {/* WhatsApp Group - Desktop */}
                            <a
                                href="https://chat.whatsapp.com/DnXoTNtRie2Hji6Be1lx50"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full text-xs font-bold transition-all shadow-sm hover:shadow-md mr-2"
                            >
                                <MessageCircle className="w-4 h-4 fill-white text-white" />
                                <span>Join Group</span>
                            </a>

                            <div className="hidden md:block">
                                <ThemeToggle variant="header" />
                            </div>

                            {isLoggedIn && (
                                <Link href="/pricing" className="mr-1">
                                    {(displayMembership === 'gold' || displayMembership === 'diamond') ? (
                                        <div className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-amber-900 text-[10px] md:text-xs font-bold border border-amber-200 shadow-sm flex items-center gap-1">
                                            <span className="hidden md:inline">★</span>
                                            <span className="uppercase">{displayMembership}</span>
                                        </div>
                                    ) : (displayMembership === 'silver' || displayMembership === 'platinum') ? (
                                        <div className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-gradient-to-r from-slate-200 via-zinc-300 to-slate-400 text-slate-900 text-[10px] md:text-xs font-bold border border-slate-300 shadow-sm flex items-center gap-1">
                                            <span className="hidden md:inline">★</span>
                                            <span className="uppercase">{displayMembership}</span>
                                        </div>
                                    ) : (
                                        <div className="relative group flex items-center">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full opacity-50 group-hover:opacity-100 blur-[4px] transition duration-200 animate-pulse"></div>
                                            <div className="relative px-3 py-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-full flex items-center gap-1 border border-amber-200 shadow-sm">
                                                <span className="text-amber-950 text-[10px] uppercase font-black tracking-wider">Upgrade</span>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            )}
                            {isLoggedIn ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="hidden sm:inline-flex items-center justify-center font-semibold text-sm text-white/70 hover:text-cyan-300 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/login?mode=signup"
                                        className="hidden sm:inline-flex bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
                                    >
                                        Get Started
                                    </Link>
                                    {/* Mobile Login Icon */}
                                    <Link
                                        href="/login"
                                        className="sm:hidden p-2 text-white/70 hover:text-cyan-300 hover:bg-white/10 rounded-full transition-colors"
                                        aria-label="Log in"
                                    >
                                        <User className="w-6 h-6" />
                                    </Link>
                                </>
                            )}


                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[60px] z-40 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 overflow-y-auto pb-20 p-4 pt-[max(20px,env(safe-area-inset-top))]">
                        <div className="flex flex-col space-y-4">
                            {/* Mobile Search */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
                                    if (query.trim()) {
                                        router.push(`/search?q=${encodeURIComponent(query)}`);
                                        setMobileMenuOpen(false);
                                    }
                                }}
                                className="relative w-full group mt-2"
                            >
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    className="block w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg leading-5 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-base transition-all duration-200"
                                    placeholder="Search topic, notes..."
                                    autoComplete="off"
                                />
                            </form>

                            <nav className="flex flex-col space-y-2">
                                {/* WhatsApp Group - Mobile Menu */}
                                <a
                                    href="https://chat.whatsapp.com/DnXoTNtRie2Hji6Be1lx50"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-[#25D366]/10 text-[#128C7E] dark:text-[#25D366] font-bold flex items-center gap-3 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                    Join WhatsApp Group
                                </a>

                                <Link
                                    href="/"
                                    className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/blog"
                                    className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    DG Blog
                                </Link>
                                <Link
                                    href="/social"
                                    className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    DG Community
                                </Link>
                                <Link
                                    href="/current-affairs"
                                    className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Current Affairs
                                </Link>
                                <Link
                                    href="/syllabus"
                                    className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Syllabus
                                </Link>

                                <button
                                    onClick={() => {
                                        setShowUpdates(true);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-3 w-full text-left"
                                >
                                    <div className="relative">
                                        <span>What&apos;s New</span>
                                        <span className="absolute -top-1 -right-2 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    </div>
                                </button>

                                {isPremium ? (
                                    <div className={`p-3 rounded-lg font-bold text-center uppercase ${displayMembership === 'gold' || displayMembership === 'diamond'
                                        ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900'
                                        : 'bg-gradient-to-r from-slate-100 to-zinc-200 text-slate-800'
                                        }`}>
                                        ★ {displayMembership} Member
                                    </div>
                                ) : (
                                    <Link
                                        href="/pricing"
                                        className="p-3 rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-900 dark:text-amber-200 font-bold flex items-center gap-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Upgrade <span>✨</span>
                                    </Link>
                                )}
                            </nav>

                            {/* Mobile Theme Switcher */}
                            <div className="px-3 py-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Theme</span>
                                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full border border-zinc-200 dark:border-zinc-700">
                                    <ThemeToggle />
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
                                {!isLoggedIn ? (
                                    <>
                                        <Link
                                            href="/login"
                                            className="w-full text-center p-3 rounded-lg font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/login?mode=signup"
                                            className="w-full text-center p-3 rounded-lg font-bold bg-green-600 text-white hover:bg-green-700 shadow-sm"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                ) : (
                                    <button
                                        onClick={async () => {
                                            await handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg font-semibold text-red-600 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Log Out
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <UpdatesDrawer isOpen={showUpdates} onClose={() => setShowUpdates(false)} />
        </>
    );
}
