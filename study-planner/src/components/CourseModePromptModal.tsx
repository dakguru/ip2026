"use client";

import { useState, useEffect } from "react";
import { useCourse } from "@/contexts/CourseContext";
import { GraduationCap, ArrowRight, Sparkles, X } from "lucide-react";
import Image from "next/image";

const PROMPT_SEEN_KEY = "dg_course_mode_prompt_seen";

/**
 * One-time Course Mode Selection Prompt Modal
 * 
 * Shown to existing users (who currently only have LDCE_IP) to give them
 * a one-time opportunity to switch to PS Group B course mode.
 * 
 * This modal appears once after login. Users can:
 *  - Continue with LDCE IP (default)
 *  - Switch to PS Group B
 *  - Dismiss (keeps current LDCE IP)
 * 
 * After any action, the modal won't appear again (tracked via localStorage).
 * Users can always switch later from Settings > Course Mode.
 */
export default function CourseModePromptModal() {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<"LDCE_IP" | "PS_GR_B">("LDCE_IP");
    const [animateIn, setAnimateIn] = useState(false);
    const { course, setCourse } = useCourse();

    useEffect(() => {
        const checkStatus = async () => {
            if (typeof window === "undefined") return;

            // 1. Check LocalStorage first (fast)
            const localSeen = localStorage.getItem(PROMPT_SEEN_KEY);
            if (localSeen) return;

            // 2. Check Backend (source of truth)
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user?.hasSeenCoursePrompt) {
                        localStorage.setItem(PROMPT_SEEN_KEY, "true");
                        return;
                    }

                    // Only show if neither says seen
                    const timer = setTimeout(() => {
                        setShow(true);
                        requestAnimationFrame(() => setAnimateIn(true));
                    }, 800);
                    return () => clearTimeout(timer);
                }
            } catch (err) {
                console.error("Failed to check prompt status:", err);
            }
        };

        checkStatus();
    }, []);

    const handleConfirm = async () => {
        setCourse(selected);
        localStorage.setItem(PROMPT_SEEN_KEY, "true");

        // Sync with DB
        try {
            const meRes = await fetch("/api/auth/me");
            if (meRes.ok) {
                const meData = await meRes.json();
                if (meData.user?.email) {
                    await fetch("/api/user/update", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            currentEmail: meData.user.email,
                            courseMode: selected,
                            hasSeenCoursePrompt: true
                        }),
                    });
                }
            }
        } catch (err) {
            console.error("Failed to sync course mode with DB:", err);
        }

        setAnimateIn(false);
        setTimeout(() => setShow(false), 300);
    };

    const handleDismiss = async () => {
        localStorage.setItem(PROMPT_SEEN_KEY, "true");

        // Sync with DB even if dismissed (keeps current defaults)
        try {
            const meRes = await fetch("/api/auth/me");
            if (meRes.ok) {
                const meData = await meRes.json();
                if (meData.user?.email) {
                    await fetch("/api/user/update", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            currentEmail: meData.user.email,
                            hasSeenCoursePrompt: true
                        }),
                    });
                }
            }
        } catch (err) {
            console.error("Failed to mark prompt as seen in DB:", err);
        }

        setAnimateIn(false);
        setTimeout(() => setShow(false), 300);
    };

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${animateIn ? "bg-black/60 backdrop-blur-md" : "bg-black/0 backdrop-blur-none"
                }`}
            onClick={handleDismiss}
        >
            <div
                className={`relative w-full max-w-[420px] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${animateIn
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-8"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                    <X className="w-4 h-4 text-white" />
                </button>

                {/* Header */}
                <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 px-6 pt-8 pb-10 text-center overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10 border border-white/20 overflow-hidden">
                            <Image src="/dak-guru-new-logo.png" alt="Dak Guru" width={48} height={48} className="object-cover rounded-lg" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-1.5 tracking-tight">
                            Choose Your Course
                        </h2>
                        <p className="text-blue-100/80 text-sm font-medium max-w-[280px] mx-auto leading-relaxed">
                            We now offer <span className="text-white font-bold">PS Group &apos;B&apos;</span> course! Select your preferred exam category.
                        </p>
                    </div>
                </div>

                {/* Course Options */}
                <div className="px-5 -mt-5 relative z-10">
                    <div className="space-y-3">
                        {/* LDCE IP Option */}
                        <button
                            onClick={() => setSelected("LDCE_IP")}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${selected === "LDCE_IP"
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20"
                                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600"
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected === "LDCE_IP"
                                ? "bg-blue-100 dark:bg-blue-900/50"
                                : "bg-zinc-100 dark:bg-zinc-800"
                                }`}>
                                <span className="text-2xl">📋</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-[15px]">LDCE Inspector Posts</p>
                                    {course === "LDCE_IP" && (
                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 uppercase tracking-wider">Current</span>
                                    )}
                                </div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">IP Exam 2026 Preparation</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected === "LDCE_IP"
                                ? "border-blue-500 bg-blue-500"
                                : "border-zinc-300 dark:border-zinc-600"
                                }`}>
                                {selected === "LDCE_IP" && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </div>
                        </button>

                        {/* PS Group B Option */}
                        <button
                            onClick={() => setSelected("PS_GR_B")}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${selected === "PS_GR_B"
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 shadow-lg shadow-purple-500/10 ring-2 ring-purple-500/20"
                                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600"
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected === "PS_GR_B"
                                ? "bg-purple-100 dark:bg-purple-900/50"
                                : "bg-zinc-100 dark:bg-zinc-800"
                                }`}>
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-[15px]">PS Group &apos;B&apos;</p>
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-600 dark:text-purple-300 uppercase tracking-wider flex items-center gap-0.5">
                                        <Sparkles className="w-2.5 h-2.5" /> New
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">PS Group B LDCE Preparation</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected === "PS_GR_B"
                                ? "border-purple-500 bg-purple-500"
                                : "border-zinc-300 dark:border-zinc-600"
                                }`}>
                                {selected === "PS_GR_B" && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 pt-5 pb-5 space-y-3">
                    <button
                        onClick={handleConfirm}
                        className={`w-full py-3.5 rounded-xl font-bold text-white text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-lg active:scale-[0.98] ${selected === "PS_GR_B"
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/25"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25"
                            }`}
                    >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center leading-relaxed">
                        You can always change this later from <span className="font-semibold text-zinc-500 dark:text-zinc-400">Settings → Course Mode</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
