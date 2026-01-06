'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function UserActivityTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Function to send heartbeat
        const sendHeartbeat = async () => {
            try {
                await fetch('/api/user/heartbeat', { method: 'POST' });
            } catch (error) {
                // Ignore errors silently
            }
        };

        // Send immediately on mount (if likely logged in - api handles auth check)
        sendHeartbeat();

        // Set up interval (every 2 minutes)
        const intervalId = setInterval(sendHeartbeat, 2 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [pathname]); // Re-run/reset if pathname changes? No, actually just once on mount is fine, but keeping it simple. 
    // Actually, dependency on pathname is not strictly needed for the interval, but it helps ensure we trigger on navigation which is good.
    // However, if user navigates frequently, we might spam.
    // Better: Just on mount. The interval handles the periodic check.
    // If we want to capture "active" as "navigated", we could trigger on pathname change too.
    // Let's stick to interval + mount.

    return null; // Render nothing
}
