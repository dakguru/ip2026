"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Trophy, Users, User, LayoutDashboard, Crown } from "lucide-react";
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
        { label: "Study", href: "/quiz", icon: Trophy },
        {
            label: isPaidUser ? "Community" : "Upgrade",
            href: isPaidUser ? "/social" : "/pricing",
            icon: isPaidUser ? Users : Crown
        },
        { label: "Profile", href: "/settings", icon: User },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-2 sm:px-6 h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-all duration-200 group relative`}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <span className="absolute -top-[1px] w-8 h-1 bg-blue-600 rounded-b-full shadow-blue-500/50 shadow-sm" />
                            )}

                            <div className={`p-1.5 rounded-xl transition-colors ${isActive
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
                                : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                                }`}>
                                <item.icon className={`w-6 h-6 ${isActive ? "fill-current" : "stroke-[1.5px]"}`} />
                            </div>
                            <span className={`text-[10px] font-medium tracking-tight ${isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-zinc-400 dark:text-zinc-500"
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
