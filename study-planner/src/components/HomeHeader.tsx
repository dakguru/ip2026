"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, MessageCircle, Menu, X, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { useEffect, useState } from "react";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

export default function HomeHeader({ isLoggedIn, membershipLevel }: { isLoggedIn: boolean, membershipLevel?: 'free' | 'silver' | 'gold' }) {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentMembership, setCurrentMembership] = useState<'free' | 'silver' | 'gold'>(membershipLevel || 'free');

    useEffect(() => {
        // Sync membership from cookie to ensure immediate update after payment
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                const session = JSON.parse(decoded);
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
            router.push('/login');
            router.refresh();
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
                    sessionData = JSON.parse(decoded);
                    if (sessionData.membershipLevel) {
                        setCurrentMembership(sessionData.membershipLevel);
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

    return (
        <>
            <header className={`sticky top-0 z-50 bg-white dark:bg-zinc-950 transition-all border-b border-zinc-200 dark:border-zinc-800 pt-[max(12px,env(safe-area-inset-top))] ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4 md:gap-8">

                        {/* 1. Left: Logo & Nav */}
                        <div className="flex items-center gap-4 md:gap-8">
                            {/* Mobile Menu Button - Hide on Native App */}
                            <button
                                className={`lg:hidden p-2 -ml-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md ${isMobileApp ? 'hidden' : ''}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>

                            <Link href="/" className="flex items-center gap-2 shrink-0">
                                <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                                    <Image src="/dak-guru-round.png" alt="Dak Guru" fill className="object-cover scale-110" priority />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                    Dak Guru
                                </span>
                            </Link>

                            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</Link>
                                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">DG Blog</Link>
                                <Link href="/social" className="hover:text-blue-600 dark:hover:text-blue-400">DG Community</Link>
                                <Link href="/current-affairs" className="hover:text-blue-600 dark:hover:text-blue-400">Current Affairs</Link>
                                <Link href="/syllabus" className="hover:text-blue-600 dark:hover:text-blue-400">Syllabus</Link>

                                {isPremium ? (
                                    <span className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide shadow-sm border ${currentMembership === 'gold'
                                        ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-amber-900 border-amber-200'
                                        : 'bg-gradient-to-r from-slate-200 via-zinc-300 to-slate-400 text-slate-900 border-slate-300'
                                        }`}>
                                        {currentMembership === 'gold' ? '★ Gold Member' : '★ Silver Member'}
                                    </span>
                                ) : (
                                    <Link
                                        href="/pricing"
                                        className="relative px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/30 overflow-hidden group hover:scale-105 transition-transform"
                                    >
                                        <span className="relative z-10 flex items-center gap-1">
                                            Upgrade <span className="animate-pulse">✨</span>
                                        </span>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                                    </Link>
                                )}
                            </nav>
                        </div>

                        {/* 2. Middle: Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-6">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
                                    if (query.trim()) {
                                        router.push(`/search?q=${encodeURIComponent(query)}`);
                                    }
                                }}
                                className="relative w-full group"
                            >
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    className="block w-full pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full leading-5 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    placeholder="Search topic, notes..."
                                    autoComplete="off"
                                />
                            </form>
                        </div>

                        {/* 3. Right: Actions */}
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                            <div className="hidden md:block">
                                <ThemeToggle />
                            </div>

                            {isLoggedIn ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="hidden sm:inline-flex items-center justify-center font-semibold text-sm text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
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
                                        className="sm:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
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

                                {isPremium ? (
                                    <div className={`p-3 rounded-lg font-bold text-center ${currentMembership === 'gold'
                                        ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900'
                                        : 'bg-gradient-to-r from-slate-100 to-zinc-200 text-slate-800'
                                        }`}>
                                        {currentMembership === 'gold' ? '★ Gold Member' : '★ Silver Member'}
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
                                        onClick={() => {
                                            handleLogout();
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
        </>
    );
}
