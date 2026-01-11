"use client";

import { useIsMobileApp } from "@/hooks/use-mobile-app";
import MobileDashboard from "@/components/MobileDashboard";
import WebLandingPage from "@/components/WebLandingPage";
import { useEffect, useState } from "react";
import MockTestAnnouncementPopup from "@/components/MockTestAnnouncementPopup";

interface HomeManagerProps {
    displayName: string;
    membershipLevel: string;
    role: string;
    isLoggedIn: boolean;
}

export default function HomeManager({ displayName, membershipLevel, role, isLoggedIn }: HomeManagerProps) {
    const isMobile = useIsMobileApp();
    const [mounted, setMounted] = useState(false);
    const [isMobileBrowser, setIsMobileBrowser] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobileBrowser(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!mounted) {
        // Return WebLandingPage as default for SEO/Server consistency
        return <WebLandingPage displayName={displayName} membershipLevel={membershipLevel} role={role} isLoggedIn={isLoggedIn} />;
    }

    // Show Mobile Dashboard if it's the Native App OR a Mobile Browser
    if (isMobile || isMobileBrowser) {
        return (
            <>
                <MockTestAnnouncementPopup />
                <MobileDashboard displayName={displayName} />
            </>
        );
    }

    return <WebLandingPage displayName={displayName} membershipLevel={membershipLevel} role={role} isLoggedIn={isLoggedIn} />;
}
