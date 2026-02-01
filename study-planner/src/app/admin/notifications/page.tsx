"use client";

import { useEffect, useState, useMemo } from "react";
import {
    Shield, Users, ArrowLeft, Loader2, FileText, Crown, Zap, Bell, Clock,
    Search, Check, CheckCheck, Filter, X, ChevronRight, Activity,
    Smartphone, AlertTriangle, Server, CreditCard, RefreshCw, LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
    _id: string;
    type: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterType, setFilterType] = useState<'all' | 'users' | 'system' | 'membership' | 'mock_tests'>('all');
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredNotifications = useMemo(() => {
        return notifications.filter(n => {
            const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.message.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            if (filterType === 'all') return true;
            if (filterType === 'users') return ['enrollment', 'community_post', 'new_user', 'user_register'].includes(n.type);
            if (filterType === 'system') return ['deployment', 'system', 'alert'].includes(n.type);

            // Split Purchase Logic
            if (filterType === 'mock_tests') {
                return n.type === 'purchase' && n.title.toLowerCase().includes('mock test');
            }
            if (filterType === 'membership') {
                return n.type === 'purchase' && !n.title.toLowerCase().includes('mock test');
            }

            return true;
        });
    }, [notifications, filterType, searchQuery]);

    const stats = useMemo(() => {
        const now = Date.now();
        const oneDay = 86400000;
        return {
            posts: notifications.filter(n => n.type === 'community_post' && new Date(n.createdAt).getTime() > now - oneDay).length,
            users: notifications.filter(n => ['enrollment', 'new_user', 'user_register'].includes(n.type) && new Date(n.createdAt).getTime() > now - oneDay).length,
            membership: notifications.filter(n => n.type === 'purchase' && !n.title.toLowerCase().includes('mock test') && new Date(n.createdAt).getTime() > now - oneDay).length,
            mockTests: notifications.filter(n => n.type === 'purchase' && n.title.toLowerCase().includes('mock test') && new Date(n.createdAt).getTime() > now - oneDay).length
        };
    }, [notifications]);

    const getIconForType = (type: string) => {
        switch (type) {
            case 'enrollment': return <Users className="w-5 h-5 text-green-600" />;
            case 'purchase': return <CreditCard className="w-5 h-5 text-amber-500" />;
            case 'community_post': return <FileText className="w-5 h-5 text-blue-500" />;
            case 'deployment': return <Zap className="w-5 h-5 text-purple-500" />;
            case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'system': return <Server className="w-5 h-5 text-zinc-500" />;
            default: return <Bell className="w-5 h-5 text-zinc-500" />;
        }
    };

    const getColorClass = (type: string) => {
        switch (type) {
            case 'enrollment': return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
            case 'purchase': return "bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800";
            case 'community_post': return "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
            case 'deployment': return "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800";
            case 'alert': return "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800";
            default: return "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700";
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors font-sans selection:bg-indigo-500 selection:text-white pb-20">
            {/* Header Background */}
            <div className="h-64 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 mb-6 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex justify-between items-end pb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-4">
                                System Notifications
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg font-medium max-w-2xl">
                                Real-time monitoring of user activities, system health, and revenue events.
                            </p>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <button
                                onClick={() => fetchNotifications()}
                                className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-indigo-600 rounded-xl hover:shadow-lg transition-all"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <Link href="/admin" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-500/10 hover:shadow-zinc-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                                <LayoutGrid className="w-5 h-5" />
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-zinc-900/40 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <FileText className="w-32 h-32 text-indigo-500" />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Posts (24h)</span>
                        </div>
                        <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100">{stats.posts}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-zinc-900/40 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <Users className="w-32 h-32 text-green-500" />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">New Users (24h)</span>
                        </div>
                        <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100">{stats.users}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-zinc-900/40 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <Crown className="w-32 h-32 text-amber-500" />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                                <Crown className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Membership</span>
                        </div>
                        <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100">{stats.membership}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-zinc-900/40 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <FileText className="w-32 h-32 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Mock Tests</span>
                        </div>
                        <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100">{stats.mockTests}</p>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 md:p-8">

                    {/* Toolbar */}
                    <div className="flex flex-col xl:flex-row gap-6 justify-between xl:items-center mb-8">
                        <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                            {[
                                { id: 'all', label: 'All Updates', icon: Bell },
                                { id: 'users', label: 'User Activity', icon: Users },
                                { id: 'membership', label: 'Membership', icon: Crown },
                                { id: 'mock_tests', label: 'Mock Tests', icon: FileText },
                                { id: 'system', label: 'System', icon: Server },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilterType(tab.id as any)}
                                    className={`
                                        whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all relative
                                        ${filterType === tab.id
                                            ? 'text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 shadow-lg shadow-zinc-500/10'
                                            : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
                                        }
                                    `}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search notifications..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full sm:w-64 pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>

                            {notifications.some(n => !n.isRead) && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 rounded-xl text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                                >
                                    <CheckCheck className="w-4 h-4" />
                                    <span className="whitespace-nowrap">Mark all read</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Feed */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map((notif) => (
                                    <motion.div
                                        layout
                                        key={notif._id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        whileHover={{ scale: 1.005, backgroundColor: "rgba(250, 250, 250, 0.8)" }}
                                        className={`
                                            group relative p-5 rounded-2xl border transition-all duration-300
                                            ${notif.isRead
                                                ? 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
                                                : 'bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30 shadow-sm'
                                            }
                                        `}
                                    >
                                        <div className="flex gap-5">
                                            {/* Icon Box */}
                                            <div className={`
                                                w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm mt-1 transition-transform group-hover:scale-105 duration-500
                                                ${getColorClass(notif.type)}
                                            `}>
                                                {getIconForType(notif.type)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className={`text-base font-bold truncate ${notif.isRead ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                                            {notif.title}
                                                        </h4>
                                                        {!notif.isRead && (
                                                            <span className="flex h-2 w-2 relative">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded ml-2 hidden sm:inline-block">
                                                            {notif.type.replace(/_/g, ' ')}
                                                        </span>
                                                    </div>

                                                    <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 whitespace-nowrap bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                                    </span>
                                                </div>

                                                <p className={`text-sm leading-relaxed ${notif.isRead ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-600 dark:text-zinc-300'} max-w-3xl font-medium`}>
                                                    {notif.message}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            {!notif.isRead && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleMarkRead(notif._id); }}
                                                    className="opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:text-green-600 hover:bg-green-50 shadow-lg border border-zinc-100 dark:border-zinc-700 transition-all duration-200 transform translate-x-4 group-hover:translate-x-0"
                                                    title="Mark as read"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-32 text-center"
                                >
                                    <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                                        <Bell className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No notifications found</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mt-2">
                                        {filterType === 'all'
                                            ? "You're all caught up! There are no new system alerts or activities to review."
                                            : `No notifications found in the '${filterType}' category.`}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
