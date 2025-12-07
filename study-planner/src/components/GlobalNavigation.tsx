"use client";

import Link from "next/link";
import { Home, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function GlobalNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Don't show nav on login page
    if (pathname === "/login") return null;

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
            <Link
                href="/"
                className="p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-blue-600 hover:border-blue-200 dark:hover:text-blue-400 transition-all shadow-sm group"
                title="Go to Home"
            >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full shadow-sm">
                <ThemeToggle />
            </div>

            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 transition-all shadow-sm group disabled:opacity-50"
                title="Sign Out"
            >
                <LogOut className={`w-5 h-5 ${isLoggingOut ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform`} />
            </button>
        </div>
    );
}
