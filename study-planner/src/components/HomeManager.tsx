"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";
import MobileDashboard from "@/components/MobileDashboard";
import WebLandingPage from "@/components/WebLandingPage";
import { useEffect, useState } from "react";

interface HomeManagerProps {
    displayName: string;
    membershipLevel: string;
    role: string;
    isLoggedIn: boolean;
}

export default function HomeManager({ displayName, membershipLevel, role, isLoggedIn }: HomeManagerProps) {
    const isMobile = useIsMobileApp();
    // Avoid hydration mismatch by waiting for mount
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Render nothing or a skeleton until we know where we are
        // Or render WebLandingPage as default to be SEO friendly?
        // Next.js hydration prefers matching server usage. 
        // Since useIsMobileApp uses window, it defaults to false on server.
        // So server renders WebLandingPage.
        // If we return null here, it will flicker.
        return <WebLandingPage displayName={displayName} membershipLevel={membershipLevel} role={role} isLoggedIn={isLoggedIn} />;
    }

    if (isMobile) {
        return <MobileDashboard displayName={displayName} />;
    }

    return <WebLandingPage displayName={displayName} membershipLevel={membershipLevel} role={role} isLoggedIn={isLoggedIn} />;
}
