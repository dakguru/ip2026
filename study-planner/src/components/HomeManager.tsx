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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return WebLandingPage as default for SEO/Server consistency
        return <WebLandingPage displayName={displayName} membershipLevel={membershipLevel} role={role} isLoggedIn={isLoggedIn} />;
    }

    // Show Mobile Dashboard ONLY if it's the Native App (Kapcitor)
    if (isMobile) {
        return <MobileDashboard displayName={displayName} />;
    }

    return <WebLandingPage displayName={displayName} membershipLevel={membershipLevel} role={role} isLoggedIn={isLoggedIn} />;
}
