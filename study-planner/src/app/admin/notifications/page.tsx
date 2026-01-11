"use client";

import { useEffect, useState, useMemo } from "react";
import { Shield, Users, ArrowLeft, Loader2, FileText, Crown, Zap, Bell, Clock, Search } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 transition-colors font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                            <Bell className="w-8 h-8 text-blue-600" />
                            System Notifications
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Real-time system updates, user activities, and alerts.</p>
                    </div>
                    <div>
                        <Link href="/admin" className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-bold shadow hover:bg-zinc-800 transition-all">
                            Admin Dashboard
                        </Link>
                    </div>
                </div>

                {/* Main Notifications Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-blue-600" /> Notification Feed
                        </h3>
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                            {notifications.length} Total
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Quick Stats for Activity */}
                        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-4">
                            <div className="p-3 bg-white dark:bg-indigo-900/30 rounded-lg shadow-sm">
                                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Posts (24h)</p>
                                <p className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-100">
                                    {notifications.filter(n => n.type === 'community_post' && new Date(n.createdAt) > new Date(Date.now() - 86400000)).length}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 flex items-center gap-4">
                            <div className="p-3 bg-white dark:bg-green-900/30 rounded-lg shadow-sm">
                                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-400 uppercase tracking-wider">New Users (24h)</p>
                                <p className="text-2xl font-extrabold text-green-900 dark:text-green-100">
                                    {notifications.filter(n => n.type === 'enrollment' && new Date(n.createdAt) > new Date(Date.now() - 86400000)).length}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 flex items-center gap-4">
                            <div className="p-3 bg-white dark:bg-orange-900/30 rounded-lg shadow-sm">
                                <Crown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">Purchases (24h)</p>
                                <p className="text-2xl font-extrabold text-orange-900 dark:text-orange-100">
                                    {notifications.filter(n => n.type === 'purchase' && new Date(n.createdAt) > new Date(Date.now() - 86400000)).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div key={notif._id} className="group flex gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
                                    <div className={`mt-1 p-3 rounded-xl h-fit shadow-sm relative overflow-hidden shrink-0 ${notif.type === 'enrollment' ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700 dark:from-green-900/40 dark:to-green-800/40 dark:text-green-400' :
                                        notif.type === 'purchase' ? 'bg-gradient-to-br from-yellow-100 to-amber-200 text-yellow-800 dark:from-yellow-900/40 dark:to-amber-800/40 dark:text-yellow-400' :
                                            notif.type === 'community_post' ? 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 dark:from-indigo-900/40 dark:to-indigo-800/40 dark:text-indigo-400' :
                                                notif.type === 'deployment' ? 'bg-gradient-to-br from-purple-100 to-pink-200 text-purple-700 dark:from-purple-900/40 dark:to-pink-800/40 dark:text-purple-400' :
                                                    'bg-gradient-to-br from-slate-100 to-zinc-200 text-slate-700 dark:from-slate-900/40 dark:to-zinc-800/40 dark:text-slate-400'
                                        }`}>
                                        {notif.type === 'enrollment' ? <Users className="w-6 h-6" /> :
                                            notif.type === 'purchase' ? <Crown className="w-6 h-6" /> :
                                                notif.type === 'community_post' ? <FileText className="w-6 h-6" /> :
                                                    notif.type === 'deployment' ? <Zap className="w-6 h-6" /> :
                                                        <Bell className="w-6 h-6" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">{notif.title}</h4>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${notif.type === 'enrollment' ? 'bg-green-50 text-green-600 border-green-200' :
                                                    notif.type === 'purchase' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                                                        'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700'
                                                    }`}>
                                                    {notif.type.replace(/_/g, ' ')}
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-3 py-1 rounded-full shadow-sm w-fit">
                                                <Clock className="w-3.5 h-3.5" />
                                                {format(new Date(notif.createdAt), 'PPP p')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{notif.message}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700">
                                <Bell className="w-12 h-12 mx-auto mb-4 text-zinc-300 dark:text-zinc-600" />
                                <p className="text-lg font-semibold text-zinc-500">No new notifications</p>
                                <p className="text-sm text-zinc-400">Activity will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
