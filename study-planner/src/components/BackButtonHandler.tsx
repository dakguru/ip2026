"use client";

import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';

export default function BackButtonHandler() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let lastBackPress = 0;

        const setupListener = async () => {
            const listener = await App.addListener('backButton', (data) => {
                // Paths where pressing back should exit the app (or prompt)
                const rootPaths = ['/', '/login'];

                if (rootPaths.includes(pathname)) {
                    // Logic for root pages: Exit app
                    App.exitApp();
                } else {
                    // Logic for other pages: Go back
                    // If we want to be smarter, we could check canGoBack, but router.back() is usually safe in Next.js
                    router.back();
                }
            });

            return listener;
        };

        const cleanup = setupListener();

        return () => {
            cleanup.then(l => l.remove());
        };
    }, [router, pathname]);

    return null;
}
