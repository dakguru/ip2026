"use client";

import { useState, useEffect } from "react";

const BETA_EMAILS = ["admin@dakguru.com", "arun18@live.in"];

export function useBetaAccess(): boolean {
    const [hasBeta, setHasBeta] = useState(false);

    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                const session = JSON.parse(decoded);
                if (session?.email && BETA_EMAILS.includes(session.email.toLowerCase())) {
                    setHasBeta(true);
                }
            } catch {
                // ignore parse errors
            }
        }
    }, []);

    return hasBeta;
}
