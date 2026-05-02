"use client";
import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

export default function SpecialAnnouncementPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show after a short delay
        const timer = setTimeout(() => {
            const hasSeen = localStorage.getItem("seen_special_announcement_16");
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const close = () => {
        setIsOpen(false);
        localStorage.setItem("seen_special_announcement_16", "true");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
                <div className="p-6 relative">
                    <button 
                        onClick={close}
                        className="absolute right-4 top-4 p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                        <AlertCircle className="w-6 h-6" />
                        <h3 className="text-lg font-bold">Important Announcement</h3>
                    </div>
                    
                    <div className="space-y-4 text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <p>
                            Weekly Tests for <strong>LDCE IP 2026 - 16</strong> and <strong>PS Group B - 05</strong> will be available for this week only from <strong className="text-zinc-900 dark:text-zinc-100">02.05.2026 at 2000 hours</strong> (tonight) until <strong className="text-zinc-900 dark:text-zinc-100">04.05.2026 at 2000 hours</strong>.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            This schedule is applicable due to certain technical difficulties. Aspirants may complete the tests within the given window.
                        </p>
                    </div>

                    <div className="mt-6">
                        <button 
                            onClick={close}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
