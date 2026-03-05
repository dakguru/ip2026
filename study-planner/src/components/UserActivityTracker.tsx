'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Capacitor } from '@capacitor/core';

export default function UserActivityTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Function to detect platform
        const detectPlatform = () => {
            if (typeof window === 'undefined') return 'desktop';

            // 1. Check if it's the native app
            const ua = navigator.userAgent;
            const isNative = Capacitor.isNativePlatform() ||
                ua.includes('Capacitor') ||
                ua.includes('wv') || // Android Webview marker
                window.location.protocol === 'capacitor:' ||
                window.location.protocol === 'app:';

            if (isNative) return 'app';

            // 2. Check if it's a mobile browser
            // More comprehensive mobile regex
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobi/i.test(ua);
            if (isMobile) return 'mobile_browser';

            return 'desktop';
        };

        // Function to send heartbeat
        const sendHeartbeat = async () => {
            try {
                const platform = detectPlatform();
                const res = await fetch('/api/user/heartbeat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ platform })
                });
                if (res.status === 401) {
                    const data = await res.json();
                    if (data.code === 'SESSION_CONFLICT') {
                        // Force logout and redirect
                        window.location.href = '/login?reason=multiple_login';
                    }
                }
            } catch (error) {
                // Ignore errors silently
            }
        };

        // Send immediately on mount
        sendHeartbeat();

        // Set up interval (every 1 minute for better enforcement)
        const intervalId = setInterval(sendHeartbeat, 60 * 1000);

        return () => clearInterval(intervalId);
    }, [pathname]); // Re-run/reset if pathname changes? No, actually just once on mount is fine, but keeping it simple. 
    // Actually, dependency on pathname is not strictly needed for the interval, but it helps ensure we trigger on navigation which is good.
    // However, if user navigates frequently, we might spam.
    // Better: Just on mount. The interval handles the periodic check.
    // If we want to capture "active" as "navigated", we could trigger on pathname change too.
    // Let's stick to interval + mount.

    return null; // Render nothing
}
