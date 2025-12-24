"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";

export default function GlobalNavigation() {
    const pathname = usePathname();
    // Start by hiding on home page, same as before
    if (pathname === "/" || pathname === "/social" || pathname.startsWith("/planner") || pathname.startsWith("/notes")) return null;

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-3 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                        <Image src="/dak-guru-new-logo.png" alt="Dak Guru" fill className="object-cover scale-110" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Dak Guru
                    </span>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block"
                    >
                        Home
                    </Link>
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
