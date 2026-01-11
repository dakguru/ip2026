"use client";

import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, X, AlertCircle } from 'lucide-react';

export default function BackButtonHandler() {
    const router = useRouter();
    const pathname = usePathname();
    const [showExitDialog, setShowExitDialog] = useState(false);

    useEffect(() => {
        let listenerHandle: any;

        const setupListener = async () => {
            listenerHandle = await App.addListener('backButton', (data) => {
                // Determine if we are on a "Home" screen
                // You can add other root tabs here if needed (e.g., /learn, /practice) 
                // but usually user expects exit only from the main Home dashboard.
                const rootPaths = ['/', '/login'];

                if (rootPaths.includes(pathname)) {
                    // Logic for root pages: Show confirmation dialog
                    setShowExitDialog(true);
                } else {
                    // Logic for other pages: Go back
                    // Check if there is history? 
                    // In Next.js, router.back() attempts to go back. 
                    // If there is no history, it might fail silently or do nothing, 
                    // effectively preventing exit, which is safer than crashing.
                    router.back();
                }
            });
        };

        setupListener();

        return () => {
            if (listenerHandle) {
                listenerHandle.remove();
            }
        };
    }, [router, pathname]);

    const handleConfirmExit = () => {
        App.exitApp();
    };

    const handleCancelExit = () => {
        setShowExitDialog(false);
    };

    if (!showExitDialog) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xs bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-white/10 p-6 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4 text-red-600 dark:text-red-500">
                        <LogOut className="w-6 h-6 ml-0.5" />
                    </div>

                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        Exit App?
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                        Do you want to close the application?
                    </p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={handleCancelExit}
                            className="flex-1 py-2.5 rounded-xl font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-zinc-100 dark:bg-zinc-800"
                        >
                            No
                        </button>
                        <button
                            onClick={handleConfirmExit}
                            className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
