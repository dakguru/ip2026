"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Loader2, Search, Repeat, Crown, Mail, Phone, CheckCircle2, XCircle } from "lucide-react";
import { getDisplayMembership, type MembershipTier } from "@/lib/membership-utils";

interface UserData {
    id: string;
    name: string;
    email: string;
    mobile?: string;
    courseMode: "LDCE_IP" | "PS_GR_B";
    membershipLevel: string;
    planName?: string;
    planId?: string;
    purchaseDate?: string;
}

const PLAN_BADGE: Record<MembershipTier, { cls: string; paidFor: string | null }> = {
    free: { cls: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300", paidFor: null },
    silver: { cls: "bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-200", paidFor: "LDCE IP" },
    gold: { cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", paidFor: "LDCE IP" },
    platinum: { cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300", paidFor: "PS Group B" },
    diamond: { cls: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300", paidFor: "PS Group B" },
};

function PlanBadge({ membershipLevel, planName }: { membershipLevel: string; planName?: string }) {
    const tier = getDisplayMembership(membershipLevel, planName || null);
    const { cls, paidFor } = PLAN_BADGE[tier];
    const label = tier.charAt(0).toUpperCase() + tier.slice(1);
    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${cls}`}
            title={paidFor ? `Paid plan for ${paidFor}` : "Free tier"}
        >
            <Crown className="w-3 h-3" /> {label}
            {paidFor && <span className="font-semibold normal-case opacity-70">· {paidFor}</span>}
        </span>
    );
}

const MODE_LABEL: Record<string, string> = {
    LDCE_IP: "LDCE IP",
    PS_GR_B: "PS Group B",
};

export default function CourseSwitchClient() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const showToast = (type: "success" | "error", text: string) => {
        setToast({ type, text });
        setTimeout(() => setToast(null), 4000);
    };

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                // Filter only paid users
                const paidUsers = (data.users || []).filter(
                    (u: UserData) => u.membershipLevel && u.membershipLevel !== "free"
                );
                setUsers(paidUsers);
            } else {
                showToast("error", "Failed to load users.");
            }
        } catch {
            showToast("error", "Something went wrong while loading users.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSwitchCourse = async (userId: string, currentMode: "LDCE_IP" | "PS_GR_B") => {
        const newMode = currentMode === "LDCE_IP" ? "PS_GR_B" : "LDCE_IP";
        if (!confirm(`Are you sure you want to switch this user to ${MODE_LABEL[newMode]}?`)) return;

        setActionLoading(userId);
        try {
            const res = await fetch("/api/developer/switch-course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, courseMode: newMode }),
            });
            const data = await res.json();
            if (res.ok) {
                showToast("success", data.message || "Course mode updated.");
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, courseMode: newMode } : u));
            } else {
                showToast("error", data.error || "Failed to update course mode.");
            }
        } catch {
            showToast("error", "An error occurred.");
        } finally {
            setActionLoading(null);
        }
    };

    const filteredUsers = users.filter((u) => {
        const term = searchTerm.toLowerCase();
        return (
            u.name?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term) ||
            u.mobile?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Developer CMS
                    </Link>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                        <Repeat className="w-8 h-8 text-pink-600" />
                        Switch Course Modes
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">Manage course modes directly for paid users.</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="relative max-w-sm w-full">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or mobile..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-pink-500 dark:focus:border-pink-500 transition-colors"
                        />
                    </div>
                </div>

                {/* List */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20 text-zinc-400">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                        <p className="font-semibold text-zinc-700 dark:text-zinc-300">No paid users found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold shrink-0">
                                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{user.name}</p>
                                                    <PlanBadge membershipLevel={user.membershipLevel} planName={user.planName} />
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                                    <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                                                    {user.mobile && <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> {user.mobile}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm mt-3 pl-1 font-medium text-zinc-700 dark:text-zinc-300">
                                            Current Mode: <span className="text-zinc-900 dark:text-white font-bold">{MODE_LABEL[user.courseMode]}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center shrink-0">
                                        <button
                                            onClick={() => handleSwitchCourse(user.id, user.courseMode)}
                                            disabled={actionLoading === user.id}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Repeat className="w-4 h-4" />}
                                            Switch to {MODE_LABEL[user.courseMode === "LDCE_IP" ? "PS_GR_B" : "LDCE_IP"]}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
                    <div className={`px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                        {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {toast.text}
                    </div>
                </div>
            )}
        </div>
    );
}
