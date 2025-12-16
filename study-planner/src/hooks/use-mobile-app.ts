"use client";

import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";

export function useIsMobileApp() {
    const [isMobileApp, setIsMobileApp] = useState(false);

    useEffect(() => {
        // Check if running on Android or iOS via Capacitor
        if (Capacitor.isNativePlatform()) {
            setIsMobileApp(true);
        }
    }, []);

    return isMobileApp;
}
