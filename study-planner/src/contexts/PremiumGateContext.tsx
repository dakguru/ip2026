"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";

const TIMER_DURATION = 30; // seconds free access per window
const REFRESH_WINDOW_MS = 90 * 60 * 1000; // 90 minutes in ms
const STORAGE_KEY = "dak_sutra_gate";

// Stored shape: { epoch: number; start: number }
// epoch  — which 90-min window this entry belongs to
// start  — timestamp when the user first opened a detail page in this window

function getCurrentEpoch(): number {
    return Math.floor(Date.now() / REFRESH_WINDOW_MS) * REFRESH_WINDOW_MS;
}

function getNextEpochMs(): number {
    return getCurrentEpoch() + REFRESH_WINDOW_MS;
}

interface StoredGate { epoch: number; start: number }

function loadGate(): StoredGate | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed: StoredGate = JSON.parse(raw);
        // Discard if it belongs to a previous 90-min window
        if (parsed.epoch !== getCurrentEpoch()) return null;
        return parsed;
    } catch {
        return null;
    }
}

function saveGate(start: number): void {
    const entry: StoredGate = { epoch: getCurrentEpoch(), start };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
}

interface PremiumGateContextType {
    isLocked: boolean;
    remainingTime: number;   // seconds left in free window
    nextRefreshAt: number;   // timestamp (ms) when next 90-min window opens
    isPremium: boolean;
}

const PremiumGateContext = createContext<PremiumGateContextType>({
    isLocked: false,
    remainingTime: TIMER_DURATION,
    nextRefreshAt: getNextEpochMs(),
    isPremium: false,
});

export function PremiumGateProvider({
    children,
    isPremium,
}: {
    children: ReactNode;
    isPremium: boolean;
}) {
    const [remainingTime, setRemainingTime] = useState<number>(() => {
        if (typeof window === "undefined") return TIMER_DURATION;
        const gate = loadGate();
        if (!gate) return TIMER_DURATION;
        const elapsed = Math.floor((Date.now() - gate.start) / 1000);
        return Math.max(0, TIMER_DURATION - elapsed);
    });

    const [isLocked, setIsLocked] = useState<boolean>(() => {
        if (typeof window === "undefined" || isPremium) return false;
        const gate = loadGate();
        if (!gate) return false;
        const elapsed = Math.floor((Date.now() - gate.start) / 1000);
        return elapsed >= TIMER_DURATION;
    });

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isPremium) {
            clearTimer();
            setIsLocked(false);
            setRemainingTime(TIMER_DURATION);
            localStorage.removeItem(STORAGE_KEY);
            return;
        }

        // Load (or create) gate entry for the current 90-min window
        let gate = loadGate();
        if (!gate) {
            const start = Date.now();
            saveGate(start);
            gate = { epoch: getCurrentEpoch(), start };
        }

        const startTime = gate.start;

        const tick = () => {
            // Check if a new 90-min window has started since we began
            const freshGate = loadGate();
            if (!freshGate) {
                // Window rolled over — reset
                const newStart = Date.now();
                saveGate(newStart);
                setRemainingTime(TIMER_DURATION);
                setIsLocked(false);
                clearTimer();
                // Restart with new gate
                intervalRef.current = setInterval(tick, 500);
                return;
            }

            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = Math.max(0, TIMER_DURATION - elapsed);
            setRemainingTime(remaining);
            if (remaining === 0) {
                setIsLocked(true);
                clearTimer();
            }
        };

        tick();
        intervalRef.current = setInterval(tick, 500);

        // Cross-tab sync
        const handleStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) tick();
        };
        window.addEventListener("storage", handleStorage);

        return () => {
            clearTimer();
            window.removeEventListener("storage", handleStorage);
        };
    }, [isPremium, clearTimer]);

    return (
        <PremiumGateContext.Provider value={{
            isLocked,
            remainingTime,
            nextRefreshAt: getNextEpochMs(),
            isPremium,
        }}>
            {children}
        </PremiumGateContext.Provider>
    );
}

export function usePremiumGate() {
    return useContext(PremiumGateContext);
}
