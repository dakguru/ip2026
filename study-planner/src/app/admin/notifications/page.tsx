"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
    Shield, Users, ArrowLeft, Loader2, FileText, Crown, Zap, Bell, Clock,
    Search, Check, CheckCheck, Filter, X, ChevronRight, Activity,
    Smartphone, AlertTriangle, Server, CreditCard, RefreshCw, LayoutGrid,
    MessageSquare, UserPlus, Ticket, Eye, EyeOff, Trash2, ChevronDown,
    TrendingUp, IndianRupee, CalendarDays, CircleDot, Archive, MailOpen
} from "lucide-react";
import Link from "next/link";
import { format, formatDistanceToNow, isToday, isYesterday, startOfDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { getMembershipTier } from "@/lib/membership-utils";

interface Notification {
    _id: string;
    type: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
    metadata?: Record<string, any>;
    userContext?: {
        membershipLevel?: string;
        planName?: string;
        courseMode?: string;
        name?: string;
    };
}

type FilterType = 'all' | 'users' | 'system' | 'membership' | 'mock_tests' | 'community';

// Helper: group notifications by date
function groupByDate(notifications: Notification[]): { label: string; date: string; items: Notification[] }[] {
    const groups: Record<string, Notification[]> = {};

    notifications.forEach(n => {
        const d = startOfDay(new Date(n.createdAt));
        const key = d.toISOString();
        if (!groups[key]) groups[key] = [];
        groups[key].push(n);
    });

    return Object.entries(groups)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([dateStr, items]) => {
            const d = new Date(dateStr);
            let label = format(d, 'EEEE, MMMM d, yyyy');
            if (isToday(d)) label = 'Today';
            else if (isYesterday(d)) label = 'Yesterday';
            return { label, date: dateStr, items };
        });
}

// Type config for consistent styling
const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string; darkBg: string; label: string; border: string }> = {
    new_user: {
        icon: UserPlus,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50',
        darkBg: 'dark:bg-emerald-500/10',
        border: 'border-emerald-100 dark:border-emerald-500/20',
        label: 'New User',
    },
    user_register: {
        icon: UserPlus,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50',
        darkBg: 'dark:bg-emerald-500/10',
        border: 'border-emerald-100 dark:border-emerald-500/20',
        label: 'Registration',
    },
    enrollment: {
        icon: Users,
        color: 'text-teal-600 dark:text-teal-400',
        bg: 'bg-teal-50',
        darkBg: 'dark:bg-teal-500/10',
        border: 'border-teal-100 dark:border-teal-500/20',
        label: 'Enrollment',
    },
    purchase: {
        icon: IndianRupee,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50',
        darkBg: 'dark:bg-amber-500/10',
        border: 'border-amber-100 dark:border-amber-500/20',
        label: 'Purchase',
    },
    community_post: {
        icon: MessageSquare,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50',
        darkBg: 'dark:bg-blue-500/10',
        border: 'border-blue-100 dark:border-blue-500/20',
        label: 'Community Post',
    },
    community_comment: {
        icon: MessageSquare,
        color: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-50',
        darkBg: 'dark:bg-sky-500/10',
        border: 'border-sky-100 dark:border-sky-500/20',
        label: 'Comment',
    },
    deployment: {
        icon: Zap,
        color: 'text-violet-600 dark:text-violet-400',
        bg: 'bg-violet-50',
        darkBg: 'dark:bg-violet-500/10',
        border: 'border-violet-100 dark:border-violet-500/20',
        label: 'Deployment',
    },
    system: {
        icon: Server,
        color: 'text-zinc-600 dark:text-zinc-400',
        bg: 'bg-zinc-100',
        darkBg: 'dark:bg-zinc-500/10',
        border: 'border-zinc-200 dark:border-zinc-500/20',
        label: 'System',
    },
    alert: {
        icon: AlertTriangle,
        color: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-50',
        darkBg: 'dark:bg-red-500/10',
        border: 'border-red-100 dark:border-red-500/20',
        label: 'Alert',
    },
    coupon_claim: {
        icon: Ticket,
        color: 'text-pink-600 dark:text-pink-400',
        bg: 'bg-pink-50',
        darkBg: 'dark:bg-pink-500/10',
        border: 'border-pink-100 dark:border-pink-500/20',
        label: 'Coupon',
    },
    coupon_redeem: {
        icon: Ticket,
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-50',
        darkBg: 'dark:bg-rose-500/10',
        border: 'border-rose-100 dark:border-rose-500/20',
        label: 'Coupon Redeemed',
    },
    membership_upgrade: {
        icon: Crown,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50',
        darkBg: 'dark:bg-amber-500/10',
        border: 'border-amber-100 dark:border-amber-500/20',
        label: 'Upgrade',
    },
    admin_message: {
        icon: Shield,
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50',
        darkBg: 'dark:bg-indigo-500/10',
        border: 'border-indigo-100 dark:border-indigo-500/20',
        label: 'Admin',
    },
};

const DEFAULT_TYPE_CONFIG = {
    icon: Bell,
    color: 'text-zinc-500 dark:text-zinc-400',
    bg: 'bg-zinc-100',
    darkBg: 'dark:bg-zinc-500/10',
    border: 'border-zinc-200 dark:border-zinc-600',
    label: 'Notification',
};

function getTypeConfig(type: string) {
    return TYPE_CONFIG[type] || DEFAULT_TYPE_CONFIG;
}

function getMembershipBadge(userContext?: Notification['userContext']): { label: string; color: string; bg: string; icon: any } {
    const tier = getMembershipTier(userContext?.membershipLevel, userContext?.courseMode);

    if (tier === 'diamond')
        return { label: 'Diamond', color: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-fuchsia-400/10', icon: Crown };
    if (tier === 'platinum')
        return { label: 'Platinum', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-400/10', icon: Zap };
    if (tier === 'gold')
        return { label: 'Gold', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-400/10', icon: Crown };
    if (tier === 'silver')
        return { label: 'Silver', color: 'text-zinc-600 dark:text-zinc-300', bg: 'bg-zinc-100 dark:bg-zinc-500/10', icon: Shield };

    return { label: 'Free', color: 'text-zinc-500', bg: 'bg-zinc-100 dark:bg-zinc-800', icon: Smartphone };
}


const FILTER_TABS: { id: FilterType; label: string; icon: any; count?: (n: Notification[]) => number }[] = [
    { id: 'all', label: 'All', icon: Bell },
    { id: 'users', label: 'Users', icon: UserPlus },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'membership', label: 'Revenue', icon: IndianRupee },
    { id: 'mock_tests', label: 'Mock Tests', icon: FileText },
    { id: 'system', label: 'System', icon: Server },
];

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/notifications');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications || []);
            }
        } catch (e) {
            console.error("Failed to fetch notifications", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('/api/admin/notifications');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications || []);
            }
        } catch (e) {
            console.error("Failed to refresh", e);
        } finally {
            setTimeout(() => setIsRefreshing(false), 600);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            const res = await fetch('/api/admin/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ markAll: true })
            });
            if (res.ok) {
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            }
        } catch (e) {
            console.error("Failed to mark all read", e);
        }
    };

    const handleMarkRead = async (id: string) => {
        try {
            const res = await fetch('/api/admin/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
            }
        } catch (e) {
            console.error("Failed to mark read", e);
        }
    };

    const filterFn = useCallback((n: Notification) => {
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;
        if (showUnreadOnly && n.isRead) return false;

        if (filterType === 'all') return true;
        if (filterType === 'users') return ['enrollment', 'new_user', 'user_register'].includes(n.type);
        if (filterType === 'community') return ['community_post', 'community_comment'].includes(n.type);
        if (filterType === 'system') return ['deployment', 'system', 'alert', 'admin_message'].includes(n.type);
        if (filterType === 'mock_tests') return n.type === 'purchase' && n.title.toLowerCase().includes('mock test');
        if (filterType === 'membership') return n.type === 'purchase' || ['coupon_claim', 'coupon_redeem', 'membership_upgrade'].includes(n.type);
        return true;
    }, [filterType, searchQuery, showUnreadOnly]);

    const filteredNotifications = useMemo(() => notifications.filter(filterFn), [notifications, filterFn]);
    const groupedNotifications = useMemo(() => groupByDate(filteredNotifications), [filteredNotifications]);

    const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

    // Count per filter
    const tabCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        FILTER_TABS.forEach(tab => {
            counts[tab.id] = notifications.filter(n => {
                if (tab.id === 'all') return !n.isRead;
                if (tab.id === 'users') return !n.isRead && ['enrollment', 'new_user', 'user_register'].includes(n.type);
                if (tab.id === 'community') return !n.isRead && ['community_post', 'community_comment'].includes(n.type);
                if (tab.id === 'system') return !n.isRead && ['deployment', 'system', 'alert', 'admin_message'].includes(n.type);
                if (tab.id === 'mock_tests') return !n.isRead && n.type === 'purchase' && n.title.toLowerCase().includes('mock test');
                if (tab.id === 'membership') return !n.isRead && (n.type === 'purchase' || ['coupon_claim', 'coupon_redeem', 'membership_upgrade'].includes(n.type));
                return false;
            }).length;
        });
        return counts;
    }, [notifications]);

    const stats = useMemo(() => {
        const now = Date.now();
        const oneDay = 86400000;
        const recent = notifications.filter(n => new Date(n.createdAt).getTime() > now - oneDay);
        return {
            total: notifications.length,
            unread: notifications.filter(n => !n.isRead).length,
            todayUsers: recent.filter(n => ['enrollment', 'new_user', 'user_register'].includes(n.type)).length,
            todayPosts: recent.filter(n => ['community_post', 'community_comment'].includes(n.type)).length,
            todayRevenue: recent.filter(n => n.type === 'purchase').length,
            todaySystem: recent.filter(n => ['deployment', 'system', 'alert'].includes(n.type)).length,
        };
    }, [notifications]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 gap-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                        <Bell className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    </div>
                </div>
                <p className="text-sm font-medium text-zinc-400">Loading notifications...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 transition-colors font-sans selection:bg-indigo-500 selection:text-white">

            {/* ── Top Bar ── */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 -ml-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Bell className="w-4.5 h-4.5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                                    Notifications
                                </h1>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                                    {stats.unread > 0 ? `${stats.unread} unread` : 'All caught up'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-colors"
                            >
                                <CheckCheck className="w-3.5 h-3.5" />
                                Mark all read
                            </button>
                        )}
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="p-2.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                        <Link
                            href="/admin"
                            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-bold shadow-lg shadow-zinc-900/10 hover:shadow-zinc-900/20 hover:-translate-y-px transition-all"
                        >
                            <LayoutGrid className="w-3.5 h-3.5" />
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

                {/* ── Stats Strip ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'New Users', value: stats.todayUsers, icon: UserPlus, gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/15' },
                        { label: 'Community', value: stats.todayPosts, icon: MessageSquare, gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/15' },
                        { label: 'Revenue', value: stats.todayRevenue, icon: IndianRupee, gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/15' },
                        { label: 'System', value: stats.todaySystem, icon: Server, gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/15' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.shadow} shadow-lg flex items-center justify-center`}>
                                    <stat.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">24h</span>
                            </div>
                            <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{stat.value}</p>
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Toolbar ── */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-3 sm:p-4">
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3 border-b border-zinc-100 dark:border-zinc-800">
                        {FILTER_TABS.map((tab) => {
                            const isActive = filterType === tab.id;
                            const count = tabCounts[tab.id];
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilterType(tab.id)}
                                    className={`
                                        relative whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all
                                        ${isActive
                                            ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md shadow-zinc-900/10'
                                            : 'text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                        }
                                    `}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                    {count > 0 && (
                                        <span className={`
                                            min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full text-[10px] font-black
                                            ${isActive
                                                ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900'
                                                : 'bg-red-500 text-white'
                                            }
                                        `}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search and Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-3 items-start sm:items-center justify-between">
                        <div className="relative group flex-1 max-w-sm">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search notifications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-500"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-zinc-400 hover:text-zinc-600 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                                className={`
                                    flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border
                                    ${showUnreadOnly
                                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
                                        : 'bg-white dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                                    }
                                `}
                            >
                                {showUnreadOnly ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                {showUnreadOnly ? 'Unread Only' : 'Show All'}
                            </button>

                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="sm:hidden flex items-center gap-2 px-3.5 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-xl text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                                >
                                    <CheckCheck className="w-3.5 h-3.5" />
                                    Read All
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Notification Feed ── */}
                <div className="space-y-6 pb-20">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {groupedNotifications.length > 0 ? (
                            groupedNotifications.map((group) => (
                                <motion.div
                                    key={group.date}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Date Header */}
                                    <div className="flex items-center gap-3 mb-3 px-1">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                                            <span className="text-xs font-extrabold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                                                {group.label}
                                            </span>
                                        </div>
                                        <div className="flex-1 h-px bg-zinc-200/80 dark:bg-zinc-800" />
                                        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                                            {group.items.length}
                                        </span>
                                    </div>

                                    {/* Notification Cards */}
                                    <div className="space-y-2">
                                        {group.items.map((notif, i) => {
                                            const config = getTypeConfig(notif.type);
                                            const TypeIcon = config.icon;
                                            const isExpanded = expandedId === notif._id;

                                            return (
                                                <motion.div
                                                    layout
                                                    key={notif._id}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ delay: i * 0.02, duration: 0.25 }}
                                                    onClick={() => {
                                                        if (!notif.isRead) handleMarkRead(notif._id);
                                                        setExpandedId(prev => prev === notif._id ? null : notif._id);
                                                    }}
                                                    className={`
                                                        group relative rounded-2xl border transition-all duration-200 cursor-pointer
                                                        ${notif.isRead
                                                            ? 'bg-zinc-50/80 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900'
                                                            : `bg-white dark:bg-zinc-900 border-l-[3px] ${config.border} shadow-sm hover:shadow-md`
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-start gap-3.5 p-4">
                                                        {/* Icon */}
                                                        <div className={`
                                                            w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                                            ${config.bg} ${config.darkBg} transition-transform group-hover:scale-105 duration-300
                                                        `}>
                                                            <TypeIcon className={`w-4.5 h-4.5 ${config.color}`} />
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <h4 className={`text-sm font-semibold leading-snug ${notif.isRead ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                                                            {notif.title}
                                                                        </h4>
                                                                        {!notif.isRead && (
                                                                            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                                                                        )}
                                                                        <span className={`
                                                                            text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md shrink-0
                                                                            ${config.bg} ${config.darkBg} ${config.color}
                                                                        `}>
                                                                            {config.label}
                                                                        </span>

                                                                        {/* Membership Badge */}
                                                                        {(notif.userContext || (notif.metadata?.email || notif.metadata?.userId)) && (
                                                                            <div className={`
                                                                                flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-transparent
                                                                                ${getMembershipBadge(notif.userContext).bg} ${getMembershipBadge(notif.userContext).color}
                                                                            `}>
                                                                                {(() => {
                                                                                    const badge = getMembershipBadge(notif.userContext);
                                                                                    const BadgeIcon = badge.icon;
                                                                                    return (
                                                                                        <>
                                                                                            <BadgeIcon className="w-2.5 h-2.5" />
                                                                                            {badge.label}
                                                                                        </>
                                                                                    );
                                                                                })()}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <p className={`text-[13px] mt-1 leading-relaxed ${notif.isRead ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-700 dark:text-zinc-300'} ${isExpanded ? '' : 'line-clamp-1'}`}>
                                                                        {notif.message}
                                                                    </p>
                                                                </div>

                                                                {/* Time */}
                                                                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0 mt-0.5">
                                                                    {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                                                </span>
                                                            </div>

                                                            {/* Expanded Detail */}
                                                            <AnimatePresence>
                                                                {isExpanded && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.2 }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800">
                                                                            <div className="flex items-center gap-4 text-[11px] text-zinc-500 dark:text-zinc-400">
                                                                                <span className="flex items-center gap-1.5">
                                                                                    <Clock className="w-3 h-3" />
                                                                                    {format(new Date(notif.createdAt), 'MMM d, yyyy · h:mm a')}
                                                                                </span>
                                                                                <span className="flex items-center gap-1.5">
                                                                                    <CircleDot className="w-3 h-3" />
                                                                                    {notif.isRead ? 'Read' : 'Unread'}
                                                                                </span>
                                                                            </div>
                                                                            <p className="text-[13px] text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                                                                                {notif.message}
                                                                            </p>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>

                                                        {/* Quick Mark Read Button */}
                                                        {!notif.isRead && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleMarkRead(notif._id); }}
                                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all shrink-0"
                                                                title="Mark as read"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-24 text-center"
                            >
                                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mb-5 shadow-inner">
                                    <MailOpen className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                    {showUnreadOnly ? 'All caught up!' : 'No notifications found'}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mt-1.5">
                                    {showUnreadOnly
                                        ? 'You have read all notifications. Toggle "Show All" to see previous activity.'
                                        : filterType === 'all'
                                            ? 'There are no system alerts or activities to review right now.'
                                            : `No notifications in the "${FILTER_TABS.find(t => t.id === filterType)?.label}" category.`}
                                </p>
                                {(showUnreadOnly || filterType !== 'all' || searchQuery) && (
                                    <button
                                        onClick={() => { setShowUnreadOnly(false); setFilterType('all'); setSearchQuery(''); }}
                                        className="mt-4 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
