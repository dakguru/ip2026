"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layout, MessageCircle, Menu } from "lucide-react";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

export default function MobileBottomNav() {
    const pathname = usePathname();
    const isMobileApp = useIsMobileApp();

    // ONLY render if it is the native app
    if (!isMobileApp) return null;

    const navItems = [
        { label: "Home", href: "/", icon: Home },
        { label: "Planner", href: "/planner", icon: Layout },
        { label: "Community", href: "/social", icon: MessageCircle },
        { label: "Updates", href: "/postal-updates", icon: Menu },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 z-50 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                                }`}
                        >
                            <item.icon
                                className={`w-6 h-6 ${isActive ? "fill-current" : ""}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
