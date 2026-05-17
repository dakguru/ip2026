"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Trophy, Users, User, Crown } from "lucide-react";
import { useState, useEffect } from "react";

export default function MobileBottomNav() {
    const pathname = usePathname();
    const [membershipLevel, setMembershipLevel] = useState<string>('free');

    useEffect(() => {
        const checkSession = () => {
            const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
            if (match) {
                try {
                    const decoded = decodeURIComponent(match[2]);
                    const session = JSON.parse(decoded);
                    if (session && session.membershipLevel) {
                        setMembershipLevel(session.membershipLevel);
                    } else {
                        setMembershipLevel('free');
                    }
                } catch (e) {
                    console.error("Failed to parse session", e);
                    setMembershipLevel('free');
                }
            } else {
                setMembershipLevel('free');
            }
        };

        checkSession();
    }, [pathname]);

    // Hide on Mock Test Runner - Check AFTER hooks
    if (pathname && pathname.startsWith('/mock-tests/weekly/') && pathname.split('/').length > 3) {
        return null;
    }

    const isPaidUser = ['gold', 'silver'].includes(membershipLevel.toLowerCase());

    const navItems = [
        { label: "Home", href: "/", icon: Home },
        { label: "Learn", href: "/planner", icon: BookOpen },
        { label: "Practice", href: "/quiz", icon: Trophy },
        {
            label: isPaidUser ? "Community" : "Upgrade",
            href: isPaidUser ? "/social" : "/pricing",
            icon: isPaidUser ? Users : Crown
        },
        { label: "Profile", href: "/settings", icon: User },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            {/* Frosted glass navigation bar */}
            <div className="bg-white/95 dark:bg-[#141414]/95 backdrop-blur-2xl border-t border-zinc-200/60 dark:border-zinc-800/60 pb-[env(safe-area-inset-bottom)]">
                <div className="flex items-center justify-around px-2 h-[64px]">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex flex-col items-center justify-center min-w-[56px] h-full gap-0.5 active:scale-90 transition-all duration-150 group relative"
                            >
                                {/* Material 3 Pill Indicator */}
                                <div className={`relative flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 ${
                                    isActive
                                        ? "bg-blue-100 dark:bg-blue-900/30 m3-nav-indicator"
                                        : "bg-transparent"
                                }`}>
                                    <item.icon
                                        className={`w-[22px] h-[22px] transition-all duration-200 ${
                                            isActive
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-zinc-400 dark:text-zinc-500"
                                        }`}
                                        strokeWidth={isActive ? 2.2 : 1.8}
                                        fill={isActive ? "currentColor" : "none"}
                                    />
                                </div>

                                <span className={`text-[10px] font-semibold tracking-tight leading-none transition-colors duration-200 ${
                                    isActive
                                        ? "text-blue-600 dark:text-blue-400 font-bold"
                                        : "text-zinc-400 dark:text-zinc-500"
                                }`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
