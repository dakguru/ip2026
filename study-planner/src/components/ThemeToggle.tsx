"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
    variant?: "default" | "header";
}

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isHeader = variant === "header";

    // Header variant: transparent bg with glowing icons on dark header
    const containerClass = isHeader
        ? "flex items-center gap-1 p-1 bg-white/10 rounded-full border border-white/15"
        : "flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700";

    const getButtonClass = (mode: string) => {
        const isActive = theme === mode;

        if (isHeader) {
            if (mode === "light") {
                return `p-1.5 rounded-full transition-all ${isActive
                    ? "bg-yellow-400/20 text-yellow-300 shadow-sm shadow-yellow-400/20"
                    : "text-white/50 hover:text-yellow-300"
                    }`;
            }
            if (mode === "dark") {
                return `p-1.5 rounded-full transition-all ${isActive
                    ? "bg-blue-400/20 text-blue-300 shadow-sm shadow-blue-400/20"
                    : "text-white/50 hover:text-blue-300"
                    }`;
            }
            // system
            return `p-1.5 rounded-full transition-all ${isActive
                ? "bg-purple-400/20 text-purple-300 shadow-sm shadow-purple-400/20"
                : "text-white/50 hover:text-purple-300"
                }`;
        }

        // Default variant
        if (mode === "light") {
            return `p-1.5 rounded-full transition-all ${isActive
                ? "bg-white text-yellow-600 shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`;
        }
        if (mode === "dark") {
            return `p-1.5 rounded-full transition-all ${isActive
                ? "bg-zinc-700 text-blue-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`;
        }
        // system
        return `p-1.5 rounded-full transition-all ${isActive
            ? "bg-zinc-200 dark:bg-zinc-600 text-zinc-900 dark:text-zinc-100 shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`;
    };

    return (
        <div className={containerClass}>
            <button
                onClick={() => setTheme("light")}
                className={getButtonClass("light")}
                title="Light Mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={getButtonClass("dark")}
                title="Dark Mode"
            >
                <Moon className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={getButtonClass("system")}
                title="System Preference"
            >
                <Monitor className="w-4 h-4" />
            </button>
        </div>
    );
}
