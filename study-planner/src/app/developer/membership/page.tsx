"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Crown,
    Users,
    Calendar,
    Clock,
    Search,
    ChevronDown,
    ChevronUp,
    Gem,
    Star,
    Shield,
    Sparkles,
    AlertTriangle,
    RefreshCw,
    Filter,
} from "lucide-react";

interface MemberUser {
    _id: string;
    name: string;
    email: string;
    mobile?: string;
    courseMode?: string;
    membershipLevel: string;
    membershipValidity?: string;
    planId?: string;
    planName?: string;
    purchaseDate?: string;
    createdAt?: string;
}

type CategoryKey = "all" | "diamond" | "gold" | "platinum" | "silver";

const TIER_CONFIG: Record<string, {
    label: string;
    icon: any;
    gradient: string;
    bg: string;
    bgLight: string;
    text: string;
    textDark: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    ring: string;
    glow: string;
}> = {
    diamond: {
        label: "Diamond",
        icon: Gem,
        gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
        bg: "bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10",
        bgLight: "bg-violet-50 dark:bg-violet-950/30",
        text: "text-violet-600 dark:text-violet-400",
        textDark: "text-violet-700 dark:text-violet-300",
        border: "border-violet-200 dark:border-violet-800/60",
        badgeBg: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
        badgeText: "text-white",
        ring: "ring-violet-500/20",
        glow: "shadow-violet-500/10",
    },
    gold: {
        label: "Gold",
        icon: Crown,
        gradient: "from-amber-400 via-yellow-500 to-orange-500",
        bg: "bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10",
        bgLight: "bg-amber-50 dark:bg-amber-950/30",
        text: "text-amber-600 dark:text-amber-400",
        textDark: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800/60",
        badgeBg: "bg-gradient-to-r from-amber-400 to-orange-500",
        badgeText: "text-white",
        ring: "ring-amber-500/20",
        glow: "shadow-amber-500/10",
    },
    platinum: {
        label: "Platinum",
        icon: Star,
        gradient: "from-slate-400 via-zinc-300 to-slate-500",
        bg: "bg-gradient-to-br from-slate-500/10 via-zinc-400/5 to-slate-600/10",
        bgLight: "bg-slate-50 dark:bg-slate-950/30",
        text: "text-slate-600 dark:text-slate-400",
        textDark: "text-slate-700 dark:text-slate-300",
        border: "border-slate-200 dark:border-slate-700/60",
        badgeBg: "bg-gradient-to-r from-slate-400 to-zinc-500",
        badgeText: "text-white",
        ring: "ring-slate-500/20",
        glow: "shadow-slate-500/10",
    },
    silver: {
        label: "Silver",
        icon: Shield,
        gradient: "from-sky-400 via-blue-400 to-cyan-500",
        bg: "bg-gradient-to-br from-sky-500/10 via-blue-400/5 to-cyan-500/10",
        bgLight: "bg-sky-50 dark:bg-sky-950/30",
        text: "text-sky-600 dark:text-sky-400",
        textDark: "text-sky-700 dark:text-sky-300",
        border: "border-sky-200 dark:border-sky-800/60",
        badgeBg: "bg-gradient-to-r from-sky-400 to-cyan-500",
        badgeText: "text-white",
        ring: "ring-sky-500/20",
        glow: "shadow-sky-500/10",
    },
};

function getDisplayTier(membershipLevel: string, planName?: string): string {
    const raw = (membershipLevel || "free").toLowerCase();
    if (planName) {
        const pn = planName.toLowerCase();
        if (pn.includes("diamond")) return "diamond";
        if (pn.includes("platinum")) return "platinum";
    }
    return raw;
}

function getDaysLeft(validityDate: string | undefined): number | null {
    if (!validityDate) return null;
    const now = new Date();
    const validity = new Date(validityDate);
    const diff = validity.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function DaysLeftBadge({ days }: { days: number | null }) {
    if (days === null) return <span className="text-xs text-zinc-400 italic">No date</span>;

    if (days < 0) {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50">
                <AlertTriangle className="w-3 h-3" />
                Expired {Math.abs(days)}d ago
            </span>
        );
    }

    if (days === 0) {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 animate-pulse">
                <Clock className="w-3 h-3" />
                Expires Today
            </span>
        );
    }

    if (days <= 7) {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">
                <Clock className="w-3 h-3" />
                {days}d left
            </span>
        );
    }

    if (days <= 30) {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50">
                <Clock className="w-3 h-3" />
                {days}d left
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
            <Clock className="w-3 h-3" />
            {days}d left
        </span>
    );
}

export default function MembershipPage() {
    const [users, setUsers] = useState<MemberUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(["diamond", "gold", "platinum", "silver"])
    );

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("/api/developer/membership");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setUsers(data.users || []);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Resolve display tiers and group users
    const categorizedUsers = useMemo(() => {
        const groups: Record<string, (MemberUser & { displayTier: string; daysLeft: number | null })[]> = {
            diamond: [],
            gold: [],
            platinum: [],
            silver: [],
        };

        users.forEach((u) => {
            const tier = getDisplayTier(u.membershipLevel, u.planName);
            const daysLeft = getDaysLeft(u.membershipValidity);
            if (groups[tier]) {
                groups[tier].push({ ...u, displayTier: tier, daysLeft });
            }
        });

        // Sort each group by validity date ascending
        Object.values(groups).forEach((group) => {
            group.sort((a, b) => {
                if (!a.membershipValidity && !b.membershipValidity) return 0;
                if (!a.membershipValidity) return 1;
                if (!b.membershipValidity) return -1;
                return new Date(a.membershipValidity!).getTime() - new Date(b.membershipValidity!).getTime();
            });
        });

        return groups;
    }, [users]);

    // Filter by search and category
    const filteredGroups = useMemo(() => {
        const q = search.toLowerCase().trim();
        const result: typeof categorizedUsers = {};

        const categories = activeCategory === "all"
            ? ["diamond", "gold", "platinum", "silver"]
            : [activeCategory];

        categories.forEach((cat) => {
            const group = categorizedUsers[cat] || [];
            result[cat] = q
                ? group.filter(
                    (u) =>
                        u.name.toLowerCase().includes(q) ||
                        u.email.toLowerCase().includes(q) ||
                        (u.mobile && u.mobile.includes(q)) ||
                        (u.courseMode && u.courseMode.toLowerCase().includes(q))
                )
                : group;
        });

        return result;
    }, [categorizedUsers, search, activeCategory]);

    // Stats
    const stats = useMemo(() => {
        const total = users.length;
        const expiringSoon = users.filter((u) => {
            const d = getDaysLeft(u.membershipValidity);
            return d !== null && d >= 0 && d <= 30;
        }).length;
        const expired = users.filter((u) => {
            const d = getDaysLeft(u.membershipValidity);
            return d !== null && d < 0;
        }).length;
        const active = total - expired;
        return { total, active, expiringSoon, expired };
    }, [users]);

    const toggleCategory = (cat: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/developer"
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to CMS</span>
                            </Link>
                            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700" />
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl text-white shadow-lg shadow-violet-500/25">
                                    <Crown className="w-5 h-5" />
                                </div>
                                <div>
                                    <h1 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                                        User Membership
                                    </h1>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                                        Paid members & validity overview
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={fetchUsers}
                            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                            title="Refresh"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-bl-full" />
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                                <Users className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                            {stats.total}
                        </p>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Total Paid</p>
                    </div>
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full" />
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                            {stats.active}
                        </p>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Active</p>
                    </div>
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full" />
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                            {stats.expiringSoon}
                        </p>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Expiring (30d)</p>
                    </div>
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full" />
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400">
                            {stats.expired}
                        </p>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Expired</p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, mobile or course..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                                activeCategory === "all"
                                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg"
                                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            }`}
                        >
                            <Filter className="w-3.5 h-3.5" />
                            All
                        </button>
                        {(["diamond", "gold", "platinum", "silver"] as const).map((cat) => {
                            const cfg = TIER_CONFIG[cat];
                            const Icon = cfg.icon;
                            const count = categorizedUsers[cat]?.length || 0;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                                        activeCategory === cat
                                            ? `${cfg.badgeBg} ${cfg.badgeText} shadow-lg`
                                            : `bg-white dark:bg-zinc-900 ${cfg.text} border ${cfg.border} hover:${cfg.bgLight}`
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {cfg.label}
                                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] ${
                                        activeCategory === cat
                                            ? "bg-white/20 text-white"
                                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Loading / Error States */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-violet-200 dark:border-violet-800 rounded-full animate-spin border-t-violet-500" />
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                            Loading membership data...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-2xl p-6 text-center">
                        <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                        <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
                        <button
                            onClick={fetchUsers}
                            className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Category Groups */}
                {!loading && !error && (
                    <div className="space-y-5">
                        {Object.entries(filteredGroups).map(([category, members]) => {
                            const cfg = TIER_CONFIG[category];
                            if (!cfg || members.length === 0) return null;
                            const Icon = cfg.icon;
                            const isExpanded = expandedCategories.has(category);

                            return (
                                <div
                                    key={category}
                                    className={`rounded-2xl border ${cfg.border} overflow-hidden shadow-sm ${cfg.glow} transition-all`}
                                >
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className={`w-full flex items-center justify-between px-5 py-4 ${cfg.bg} hover:opacity-90 transition-all`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cfg.gradient} text-white shadow-lg`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <h2 className={`text-lg font-extrabold ${cfg.textDark}`}>
                                                    {cfg.label} Members
                                                </h2>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {members.length} member{members.length !== 1 ? "s" : ""}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`p-1.5 rounded-lg ${cfg.bgLight}`}>
                                            {isExpanded ? (
                                                <ChevronUp className={`w-5 h-5 ${cfg.text}`} />
                                            ) : (
                                                <ChevronDown className={`w-5 h-5 ${cfg.text}`} />
                                            )}
                                        </div>
                                    </button>

                                    {/* Members Table */}
                                    {isExpanded && (
                                        <div className="bg-white dark:bg-zinc-900">
                                            {/* Desktop Table */}
                                            <div className="hidden md:block overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">#</th>
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">Name</th>
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">Email</th>
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">Course</th>
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">Plan</th>
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">Purchased</th>
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">Valid Till</th>
                                                            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                                                        {members.map((user, i) => (
                                                            <tr
                                                                key={user._id}
                                                                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                                                            >
                                                                <td className="px-5 py-3.5 text-zinc-400 font-mono text-xs">
                                                                    {i + 1}
                                                                </td>
                                                                <td className="px-5 py-3.5">
                                                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                                                        {user.name}
                                                                    </span>
                                                                </td>
                                                                <td className="px-5 py-3.5 text-zinc-500 dark:text-zinc-400">
                                                                    {user.email}
                                                                </td>
                                                                <td className="px-5 py-3.5">
                                                                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                                                                        user.courseMode === "PS_GR_B"
                                                                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                                                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                                                    }`}>
                                                                        {user.courseMode === "PS_GR_B" ? "PS Gr B" : "LDCE IP"}
                                                                    </span>
                                                                </td>
                                                                <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300 text-xs">
                                                                    {user.planName || "—"}
                                                                </td>
                                                                <td className="px-5 py-3.5 text-zinc-500 dark:text-zinc-400 text-xs">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Calendar className="w-3 h-3" />
                                                                        {formatDate(user.purchaseDate)}
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3.5 text-zinc-500 dark:text-zinc-400 text-xs">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Calendar className="w-3 h-3" />
                                                                        {formatDate(user.membershipValidity)}
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3.5">
                                                                    <DaysLeftBadge days={user.daysLeft} />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Mobile Cards */}
                                            <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800/50">
                                                {members.map((user, i) => (
                                                    <div key={user._id} className="px-4 py-3.5 space-y-2">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                                                                        #{i + 1}
                                                                    </span>
                                                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm truncate">
                                                                        {user.name}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                                                                    {user.email}
                                                                </p>
                                                            </div>
                                                            <DaysLeftBadge days={user.daysLeft} />
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                                            <span className={`px-2 py-0.5 rounded-md font-bold ${
                                                                user.courseMode === "PS_GR_B"
                                                                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                                                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                                            }`}>
                                                                {user.courseMode === "PS_GR_B" ? "PS Gr B" : "LDCE IP"}
                                                            </span>
                                                            {user.planName && (
                                                                <span className="text-zinc-500 dark:text-zinc-400">
                                                                    {user.planName}
                                                                </span>
                                                            )}
                                                            <span className="text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                Valid: {formatDate(user.membershipValidity)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Empty state */}
                        {Object.values(filteredGroups).every((g) => g.length === 0) && (
                            <div className="text-center py-20">
                                <Users className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
                                <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                                    {search ? "No members match your search." : "No paid members found."}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
