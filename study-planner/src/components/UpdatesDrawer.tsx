"use client";

import { useEffect, useState } from "react";
import { X, Calendar, CheckCircle2, Sparkles, Bell } from "lucide-react";

interface UpdateItem {
    title: string;
    desc: string;
}

interface UpdateGroup {
    date: string;
    items: UpdateItem[];
}

const UPDATES_DATA: UpdateGroup[] = [
    {
        date: "07.02.2026",
        items: [
            {
                title: "PDF Notes Uploaded",
                desc: "GDS (Conduct & Engagement) Rules, 2020 PDF is now linked in the 'Paper I' section. Sexual Harassment of Women at Workplace Act, 2013 PDF is now linked in the 'Paper III' section. Both documents are now accessible in the application."
            }
        ]
    },
    {
        date: "04.02.2026",
        items: [
            { title: "Smart Reader Experience", desc: "The Smart Reader now provides a fully immersive reading experience with smooth, native-feeling vertical scrolling." },
            { title: "Layout Improvements", desc: "Fixed content overlap with navigation bars and ensured settings button is always fully accessible." },
            { title: "Device Optimization", desc: "Added proper safe area handling for modern devices while maintaining full-screen reading mode." }
        ]
    },
    {
        date: "03.02.2026",
        items: [
            { title: "Duplicate Topic Fix", desc: "Removed duplicate topics in the Flexible Study Planner view." },
            { title: "Mock Test Schedule Fix", desc: "Included Saturday in the weekly test topic aggregation." },
            { title: "Duration Format", desc: 'Updated the "1 Day, Day 1 of 2" display logic to show "1 Day" or "X Days" cleanly.' },
            { title: "Schedule Updates", desc: 'Consolidated "PO Life Insurance Rules, 2011 & RPLI Rules" into a 3-day block.' },
            { title: "New \"SB Orders\" Tab", desc: "Added a dedicated tab for SB Orders with years 2011-2025." },
            { title: "Google Drive Viewer", desc: "Integrated support for Google Drive preview links in the PdfViewer, allowing SB Orders to be viewed directly in the app." }
        ]
    }
];

interface UpdatesDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UpdatesDrawer({ isOpen, onClose }: UpdatesDrawerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Drawer Panel */}
            <div className="relative w-full sm:w-96 h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="header sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 p-4 sm:p-5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-blue-500/20 rounded-full animate-pulse"></div>
                            <div className="relative w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Bell className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-none">What's New</h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Latest features & fixes</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-8 pb-20 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {UPDATES_DATA.map((group, groupIndex) => (
                        <div key={groupIndex} className="relative pl-4 border-l-2 border-zinc-100 dark:border-zinc-800">
                            {/* Date Badge */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 bg-blue-600"></div>

                            <div className="mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-800 mb-4">
                                    <Calendar className="w-3 h-3" />
                                    {group.date}
                                </span>

                                <div className="space-y-4">
                                    {group.items.map((item, i) => (
                                        <div key={i} className="group bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:border-blue-200 dark:hover:border-blue-900/30 hover:shadow-sm transition-all duration-200">
                                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1.5 flex items-start gap-2">
                                                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                                {item.title}
                                            </h3>
                                            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 pl-5.5">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-300 mb-3">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-zinc-400">You are all caught up!</p>
                    </div>
                </div>

                {/* Footer (Optional) */}
                <div className="shrink-0 p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-center">
                    <p className="text-[10px] text-zinc-400">Dak Guru v1.2.0 • Made with ❤️</p>
                </div>
            </div>
        </div>
    );
}
