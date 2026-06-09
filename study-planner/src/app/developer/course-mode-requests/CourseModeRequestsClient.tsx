"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
    ArrowLeft, Repeat, Loader2, Check, X, ArrowRight, Mail, Phone,
    CheckCircle2, XCircle, Clock, AlertTriangle,
} from "lucide-react";

type Status = "pending" | "approved" | "rejected";

interface CourseModeRequestItem {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userMobile: string | null;
    currentCourseMode: "LDCE_IP" | "PS_GR_B";
    requestedCourseMode: "LDCE_IP" | "PS_GR_B";
    status: Status;
    requestedAt: string;
    reviewedAt: string | null;
    reviewedBy: string | null;
    adminRemarks: string | null;
}

const MODE_LABEL: Record<string, string> = {
    LDCE_IP: "LDCE IP",
    PS_GR_B: "PS Group B",
};

const TABS: { key: "pending" | "approved" | "rejected" | "all"; label: string }[] = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "all", label: "All" },
];

function StatusBadge({ status }: { status: Status }) {
    const map: Record<Status, { cls: string; icon: any; label: string }> = {
        pending: { cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock, label: "Pending" },
        approved: { cls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle2, label: "Approved" },
        rejected: { cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle, label: "Rejected" },
    };
    const { cls, icon: Icon, label } = map[status];
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cls}`}>
            <Icon className="w-3.5 h-3.5" /> {label}
        </span>
    );
}

function ModePill({ mode, accent }: { mode: string; accent: "blue" | "purple" }) {
    const cls = accent === "blue"
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800"
        : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800";
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${cls}`}>
            {MODE_LABEL[mode] || mode}
        </span>
    );
}

export default function CourseModeRequestsClient() {
    const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");
    const [requests, setRequests] = useState<CourseModeRequestItem[]>([]);
    const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0, all: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Approve confirmation modal
    const [approveTarget, setApproveTarget] = useState<CourseModeRequestItem | null>(null);
    // Reject modal
    const [rejectTarget, setRejectTarget] = useState<CourseModeRequestItem | null>(null);
    const [rejectRemarks, setRejectRemarks] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const showToast = (type: "success" | "error", text: string) => {
        setToast({ type, text });
        setTimeout(() => setToast(null), 4000);
    };

    const fetchRequests = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/course-mode-requests?status=${activeTab}`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data.requests || []);
                if (data.counts) setCounts(data.counts);
            } else {
                showToast("error", "Failed to load requests.");
            }
        } catch {
            showToast("error", "Something went wrong while loading requests.");
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleReview = async (req: CourseModeRequestItem, action: "approve" | "reject", remarks?: string) => {
        setActionLoading(true);
        try {
            const res = await fetch(`/api/admin/course-mode-requests/${req.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, remarks }),
            });
            const data = await res.json();
            if (res.ok) {
                showToast("success", data.message || "Done.");
                setApproveTarget(null);
                setRejectTarget(null);
                setRejectRemarks("");
                fetchRequests();
            } else {
                showToast("error", data.error || "Action failed.");
            }
        } catch {
            showToast("error", "Something went wrong.");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Developer CMS
                    </Link>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                        <Repeat className="w-8 h-8 text-violet-600" />
                        Course Mode Requests
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">Review and approve user requests for switching between LDCE IP and PS Group B course modes.</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {TABS.map((tab) => {
                        const count = counts[tab.key];
                        const active = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${active
                                    ? "bg-violet-600 text-white shadow-sm shadow-violet-600/25"
                                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                {tab.label}
                                <span className={`px-1.5 py-0.5 rounded-md text-xs ${active ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800"}`}>{count}</span>
                            </button>
                        );
                    })}
                </div>

                {/* List */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20 text-zinc-400">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : requests.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                        <div className="w-14 h-14 mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <Repeat className="w-6 h-6 text-zinc-400" />
                        </div>
                        <p className="font-semibold text-zinc-700 dark:text-zinc-300">No {activeTab !== "all" ? activeTab : ""} requests</p>
                        <p className="text-sm text-zinc-400 mt-1">Requests will appear here when users submit them.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {requests.map((req) => (
                            <div key={req.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    {/* User + modes */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                                                {req.userName?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{req.userName}</p>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                                    <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" /> {req.userEmail}</span>
                                                    {req.userMobile && <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> {req.userMobile}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap pl-1">
                                            <ModePill mode={req.currentCourseMode} accent="blue" />
                                            <ArrowRight className="w-4 h-4 text-zinc-400" />
                                            <ModePill mode={req.requestedCourseMode} accent="purple" />
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-2 pl-1">
                                            Requested: {req.requestedAt ? format(new Date(req.requestedAt), "dd.MM.yyyy 'at' hh:mm a") : "—"}
                                            {req.reviewedAt && (
                                                <> · Reviewed: {format(new Date(req.reviewedAt), "dd.MM.yyyy")}{req.reviewedBy ? ` by ${req.reviewedBy}` : ""}</>
                                            )}
                                        </p>
                                        {req.adminRemarks && (
                                            <p className="text-xs text-red-500 mt-1 pl-1"><span className="font-semibold">Remarks:</span> {req.adminRemarks}</p>
                                        )}
                                    </div>

                                    {/* Status / actions */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        {req.status === "pending" ? (
                                            <>
                                                <button
                                                    onClick={() => setApproveTarget(req)}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
                                                >
                                                    <Check className="w-4 h-4" /> Approve
                                                </button>
                                                <button
                                                    onClick={() => { setRejectTarget(req); setRejectRemarks(""); }}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 text-sm font-semibold transition-colors"
                                                >
                                                    <X className="w-4 h-4" /> Reject
                                                </button>
                                            </>
                                        ) : (
                                            <StatusBadge status={req.status} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Approve confirmation modal */}
            {approveTarget && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-4">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Approve Course Mode Request</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                            Are you sure you want to approve this course mode switch request?
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
                            <span className="font-semibold">{approveTarget.userName}</span> will be switched from{" "}
                            <span className="font-semibold">{MODE_LABEL[approveTarget.currentCourseMode]}</span> to{" "}
                            <span className="font-semibold">{MODE_LABEL[approveTarget.requestedCourseMode]}</span>.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setApproveTarget(null)}
                                disabled={actionLoading}
                                className="flex-1 py-2.5 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleReview(approveTarget, "approve")}
                                disabled={actionLoading}
                                className="flex-1 py-2.5 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject modal */}
            {rejectTarget && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-4">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Reject Course Mode Request</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                            Rejecting <span className="font-semibold">{rejectTarget.userName}</span>&apos;s request to switch to{" "}
                            <span className="font-semibold">{MODE_LABEL[rejectTarget.requestedCourseMode]}</span>. Their course mode will stay unchanged.
                        </p>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Admin Remarks / Reason for Rejection</label>
                        <textarea
                            value={rejectRemarks}
                            onChange={(e) => setRejectRemarks(e.target.value)}
                            placeholder="Optional — shown to the user in their notification."
                            className="w-full h-24 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm outline-none focus:border-red-500 transition-colors resize-none mb-6"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setRejectTarget(null)}
                                disabled={actionLoading}
                                className="flex-1 py-2.5 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleReview(rejectTarget, "reject", rejectRemarks)}
                                disabled={actionLoading}
                                className="flex-1 py-2.5 rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />} Reject Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
