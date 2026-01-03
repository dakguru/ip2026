"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layout, MessageCircle, PlayCircle, User } from "lucide-react";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

export default function MobileBottomNav() {
    const pathname = usePathname();
    const isMobileApp = useIsMobileApp();

    // ONLY render if it is the native app
    if (!isMobileApp) return null;

    const navItems = [
        { label: "Home", href: "/", icon: Home },
        { label: "My Plan", href: "/planner", icon: Layout },
        { label: "MCQs", href: "/quiz", icon: PlayCircle },
        { label: "Community", href: "/social", icon: MessageCircle },
        { label: "Profile", href: "/settings", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 z-50 pb-[env(safe-area-inset-bottom)] transition-all">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-90 transition-transform ${isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                                }`}
                        >
                            <div className="relative">
                                <item.icon
                                    className={`w-6 h-6 ${isActive ? "fill-current" : ""}`}
                                    strokeWidth={isActive ? 2.5 : 1.5}
                                />
                                {isActive && (
                                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                                )}
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
