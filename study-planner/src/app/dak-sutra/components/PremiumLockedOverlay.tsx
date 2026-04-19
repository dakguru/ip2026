"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Crown, ArrowRight, Timer } from "lucide-react";
import Link from "next/link";

interface PremiumLockedOverlayProps {
    nextRefreshAt: number;
}

function useRefreshCountdown(nextRefreshAt: number) {
    const [label, setLabel] = useState("");

    useEffect(() => {
        const update = () => {
            const diff = Math.max(0, nextRefreshAt - Date.now());
            const h = Math.floor(diff / 3_600_000);
            const m = Math.floor((diff % 3_600_000) / 60_000);
            const s = Math.floor((diff % 60_000) / 1_000);
            if (h > 0) setLabel(`${h}h ${String(m).padStart(2, "0")}m`);
            else if (m > 0) setLabel(`${m}m ${String(s).padStart(2, "0")}s`);
            else setLabel(`${s}s`);
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [nextRefreshAt]);

    return label;
}

export default function PremiumLockedOverlay({ nextRefreshAt }: PremiumLockedOverlayProps) {
    const refreshLabel = useRefreshCountdown(nextRefreshAt);

    return (
        <>
            {/* ── Backdrop: covers only the content div, pointer-events off so scroll still works ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-40 pointer-events-none"
                style={{
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    background: "rgba(8, 8, 18, 0.72)",
                }}
            />

            {/*
             * ── Card: fixed to viewport center so it "follows" scroll.
             *    Uses safe-area-inset for Android/iOS notch & bottom bar.
             *    pointer-events-auto only on the card itself.
             * ──
             */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.45,
                        delay: 0.08,
                        type: "spring",
                        stiffness: 200,
                        damping: 22,
                    }}
                    className="pointer-events-auto flex flex-col items-center gap-4 px-5 py-7 text-center rounded-3xl shadow-2xl"
                    style={{
                        width: "min(calc(100vw - 2.5rem), 22rem)",
                        background: "rgba(12, 12, 24, 0.92)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,180,50,0.08)",
                    }}
                >
                    {/* Lock icon */}
                    <div className="relative mt-1">
                        <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full scale-[1.8]" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/40">
                            <Lock className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-amber-100/60">
                            <Crown className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-1.5 px-1">
                        <h3 className="text-[17px] font-black text-white leading-tight">
                            🔒 Premium Content
                        </h3>
                        <p className="text-[12.5px] text-white/60 leading-relaxed">
                            Your free access has ended. Upgrade to continue learning with Dak Sutra.
                        </p>
                    </div>

                    {/* Next free access pill */}
                    <div className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Timer className="w-4 h-4 text-amber-400 shrink-0" />
                        <p className="text-[11.5px] text-white/55 font-medium text-left leading-tight">
                            Next free access in{" "}
                            <span className="text-amber-400 font-black tabular-nums">{refreshLabel}</span>
                        </p>
                    </div>

                    {/* CTA — full width, min 48px touch target for mobile */}
                    <Link
                        href="/pricing"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl font-black text-[14px] text-white transition-transform active:scale-95 touch-manipulation"
                        style={{
                            minHeight: "48px",
                            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                            boxShadow: "0 8px 24px rgba(234,88,12,0.35)",
                        }}
                    >
                        <Crown className="w-4 h-4" />
                        Upgrade to Premium
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Small "not now" back link */}
                    <Link
                        href="/dak-sutra"
                        className="text-[11px] text-white/30 hover:text-white/60 transition-colors font-medium touch-manipulation py-1"
                    >
                        ← Back to all rules
                    </Link>
                </motion.div>
            </div>
        </>
    );
}
