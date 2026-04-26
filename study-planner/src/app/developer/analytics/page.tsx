"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ArrowLeft, Users, BarChart3, TrendingUp, UserCheck, UserMinus,
    Monitor, Clock, Filter, Download, Search, AlertCircle,
    Calendar, ArrowUpRight, Smartphone, Tablet as TabletIcon, Laptop,
    ChevronRight, MoreHorizontal, LayoutDashboard, Shield, ShieldAlert,
    X, ExternalLink
} from "lucide-react";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { format, subDays, differenceInDays } from "date-fns";
import { saveAs } from "file-saver";

// --- Types ---
interface SummaryData {
    totalLoginsToday: number;
    uniqueUsersToday: number;
    repeatUsersToday: number;
    activeUsers7Days: number;
    inactive7Days: number;
    inactive15Days: number;
    inactive30Days: number;
    avgDailyLogins: string;
    peakLoginTime: string;
    totalUsersCount: number;
}

interface TrendData {
    dailyTrends: { _id: string; count: number }[];
    hourlyDistribution: { _id: number; count: number }[];
    userTypes: { firstTime: number; returning: number };
}

interface UserRecord {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
    membership: string;
    totalLogins: number;
    lastLogin: string;
    daysSinceLastLogin: number | string;
    frequencyPerWeek: string;
    activityStatus: string;
    devicePreference: string;
    lastIp: string | null;
    distinctIpCount: number;
    suspiciousFlag: boolean;
}

interface LoginLogRecord {
    _id: string;
    loginAt: string;
    ip: string;
    location?: { city?: string; region?: string; country?: string };
    device?: { type?: string; os?: string; browser?: string };
    sessionId?: string;
}

interface SuspiciousUser {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    activeDevicesCount: number;
    knownDevices: {
        deviceId: string;
        deviceType: string;
        os: string;
        clientName: string;
        firstSeen: string;
        lastSeen: string;
    }[];
}

interface LocationData {
    city: string;
    region: string;
    country: string;
    count: number;
    percentage: string;
}

function maskIp(ip: string | null): string {
    if (!ip || ip === '0.0.0.0') return 'Unknown';
    const parts = ip.split('.');
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.xxx.xxx`;
    // IPv6 — show first 2 segments only
    const segs = ip.split(':');
    return segs.slice(0, 2).join(':') + ':xxxx:…';
}

export default function AnalyticsDashboard() {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [trends, setTrends] = useState<TrendData | null>(null);
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [suspiciousUsers, setSuspiciousUsers] = useState<SuspiciousUser[]>([]);
    const [locations, setLocations] = useState<LocationData[]>([]);
    const [selectedSuspiciousUser, setSelectedSuspiciousUser] = useState<SuspiciousUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        membership: "all",
        activity: "all",
        role: "all",
        suspicious: "all"
    });
    const [page, setPage] = useState(1);
    const [pageSize] = useState(25);
    const [days, setDays] = useState(30);
    const [seeding, setSeeding] = useState(false);

    // Login history modal state
    const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
    const [loginLogs, setLoginLogs] = useState<LoginLogRecord[]>([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [logPage, setLogPage] = useState(1);
    const [logPages, setLogPages] = useState(1);
    const [logTotal, setLogTotal] = useState(0);
    const [logDateFrom, setLogDateFrom] = useState('');
    const [logDateTo, setLogDateTo] = useState('');
    const [logIpFilter, setLogIpFilter] = useState('');

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, [days]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [summaryRes, trendsRes, usersRes, suspiciousRes, locationsRes] = await Promise.all([
                fetch(`/api/developer/analytics/summary?days=${days}`),
                fetch(`/api/developer/analytics/trends?days=${days}`),
                fetch('/api/developer/analytics/users'),
                fetch('/api/developer/analytics/suspicious-accounts'),
                fetch(`/api/developer/analytics/locations?days=${days}`)
            ]);

            const summaryData = await summaryRes.json();
            const trendsData = await trendsRes.json();
            const usersData = await usersRes.json();
            const suspiciousData = await suspiciousRes.json();
            const locationsData = await locationsRes.json();

            setSummary(summaryData);
            setTrends(trendsData);
            setUsers(usersData.users);
            setSuspiciousUsers(suspiciousData.users || []);
            setLocations(locationsData.locations || []);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLoginLogs = useCallback(async (userId: string, page: number) => {
        setLogsLoading(true);
        try {
            const params = new URLSearchParams({ page: String(page), limit: '50' });
            if (logDateFrom) params.set('from_date', logDateFrom);
            if (logDateTo) params.set('to_date', logDateTo);
            if (logIpFilter) params.set('ip', logIpFilter);

            const res = await fetch(`/api/developer/analytics/users/${userId}/login-logs?${params}`);
            const data = await res.json();
            setLoginLogs(data.logs || []);
            setLogPages(data.pages || 1);
            setLogTotal(data.total || 0);
        } catch (error) {
            console.error("Failed to fetch login logs:", error);
        } finally {
            setLogsLoading(false);
        }
    }, [logDateFrom, logDateTo, logIpFilter]);

    const openLoginHistory = (user: UserRecord) => {
        setSelectedUser(user);
        setLogPage(1);
        setLogDateFrom('');
        setLogDateTo('');
        setLogIpFilter('');
        setLoginLogs([]);
    };

    useEffect(() => {
        if (selectedUser) {
            fetchLoginLogs(selectedUser.id, logPage);
        }
    }, [selectedUser, logPage, fetchLoginLogs]);

    const applyLogFilters = () => {
        if (selectedUser) {
            setLogPage(1);
            fetchLoginLogs(selectedUser.id, 1);
        }
    };

    const exportLoginLogsCSV = async () => {
        if (!selectedUser) return;
        const params = new URLSearchParams({ limit: '5000', page: '1', export: '1' });
        if (logDateFrom) params.set('from_date', logDateFrom);
        if (logDateTo) params.set('to_date', logDateTo);
        if (logIpFilter) params.set('ip', logIpFilter);

        const res = await fetch(`/api/developer/analytics/users/${selectedUser.id}/login-logs?${params}`);
        const data = await res.json();
        const logs: LoginLogRecord[] = data.logs || [];

        const headers = ["Date & Time", "IP Address", "Location", "Device", "OS", "Browser", "Session ID"];
        const rows = logs.map(l => [
            format(new Date(l.loginAt), 'yyyy-MM-dd HH:mm:ss'),
            l.ip || 'Unknown',
            [l.location?.city, l.location?.region, l.location?.country].filter(Boolean).join(', ') || 'N/A',
            l.device?.type || 'Unknown',
            l.device?.os || 'Unknown',
            l.device?.browser || 'Unknown',
            l.sessionId || 'N/A'
        ]);

        const csvContent = [headers, ...rows].map(e => e.map(v => `"${v}"`).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `login-history-${selectedUser.email}-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    };

    const seedMockData = async () => {
        if (!confirm("This will generate fake login records for testing. Continue?")) return;
        setSeeding(true);
        try {
            const res = await fetch('/api/developer/analytics/seed', { method: 'POST' });
            if (res.ok) {
                alert("Mock data generated successfully!");
                fetchData();
            }
        } catch (error) {
            console.error("Seeding failed:", error);
        } finally {
            setSeeding(false);
        }
    };

    const exportToCSV = () => {
        const headers = ["Name", "Email", "Role", "Membership", "Total Logins", "Last Login", "Activity Status", "Last IP", "Distinct IPs (Recent)", "Suspicious"];
        const rows = users.map(u => [
            u.name, u.email, u.role, u.membership, u.totalLogins,
            u.lastLogin ? format(new Date(u.lastLogin), 'PP') : 'Never',
            u.activityStatus,
            u.lastIp || 'Unknown',
            u.distinctIpCount,
            u.suspiciousFlag ? 'Yes' : 'No'
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `user-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMembership = filters.membership === "all" || u.membership === filters.membership;
        const matchesActivity = filters.activity === "all" || u.activityStatus === filters.activity;
        const matchesRole = filters.role === "all" || u.role === filters.role;
        const matchesSuspicious = filters.suspicious === "all" ||
            (filters.suspicious === "suspicious" && u.suspiciousFlag) ||
            (filters.suspicious === "healthy" && !u.suspiciousFlag);

        return matchesSearch && matchesMembership && matchesActivity && matchesRole && matchesSuspicious;
    });

    const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const suspiciousCount = users.filter(u => u.suspiciousFlag).length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-500 font-medium animate-pulse">Synchronizing Analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-3 md:p-8 transition-colors selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
            <div className="max-w-7xl mx-auto pb-12">

                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-8 mt-2">
                    <div className="flex items-center justify-between">
                        <Link href="/developer" className="inline-flex items-center gap-2 py-1.5 px-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all shadow-sm active:scale-95">
                            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
                        </Link>
                        <div className="flex items-center gap-2">
                            {process.env.NODE_ENV !== 'production' && (
                                <button
                                    onClick={seedMockData}
                                    disabled={seeding}
                                    className="p-2.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl text-amber-600 dark:text-amber-500 hover:bg-amber-100 transition-all shadow-sm active:scale-95"
                                    title="Seed Mock Data"
                                >
                                    <Users className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={fetchData}
                                className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
                                title="Refresh"
                            >
                                <Clock className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                                <LayoutDashboard className="w-3 h-3" /> Growth & Insights
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                                User Analytics
                                <span className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-black px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 animate-pulse">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                    Live
                                </span>
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium max-w-xl">
                                Real-time monitoring of user engagement, login patterns, and regional activity distributions.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <div className="flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 shadow-sm w-full sm:w-auto">
                                {[7, 30, 90].map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setDays(d)}
                                        className={`flex-1 sm:flex-none px-5 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${days === d
                                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow-lg shadow-zinc-200 dark:shadow-none'
                                            : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                                            }`}
                                    >
                                        {d} Days
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={exportToCSV}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none font-bold text-xs uppercase tracking-wider active:scale-95"
                            >
                                <Download className="w-4 h-4" /> Export Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
                    <StatCard title="Total Logins" value={summary?.totalLoginsToday || 0} subValue="24h Window" icon={<TrendingUp />} color="blue" />
                    <StatCard title="Active Users" value={summary?.uniqueUsersToday || 0} subValue="Today" icon={<UserCheck />} color="emerald" />
                    <StatCard title="Peak Hour" value={summary?.peakLoginTime || "N/A"} subValue="Most Active" icon={<Clock />} color="amber" />
                    <StatCard title="Suspicious" value={suspiciousCount} subValue="Multi-IP Detected" icon={<ShieldAlert />} color="rose" />
                </div>

                {/* Primary Visualization Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-5 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <BarChart3 size={150} />
                        </div>
                        <div className="flex items-center justify-between mb-8 relative">
                            <div>
                                <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">Login Trajectory</h3>
                                <p className="text-xs text-zinc-500 font-medium">Daily interactive engagement metrics</p>
                            </div>
                            <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-zinc-200 dark:border-zinc-700">
                                {days}D Analysis
                            </div>
                        </div>
                        <div className="h-[280px] md:h-[350px] w-full mt-4">
                            {trends?.dailyTrends && trends.dailyTrends.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trends?.dailyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888815" />
                                        <XAxis
                                            dataKey="_id"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                                            tickFormatter={(val) => format(new Date(val), 'dd MMM')}
                                            minTickGap={25}
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }} />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '20px',
                                                border: 'none',
                                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                color: '#fff',
                                                padding: '12px'
                                            }}
                                            itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                                            labelStyle={{ fontWeight: 'black', color: '#fff', marginBottom: '4px' }}
                                            formatter={(value) => [`${value} Logins`, 'Activity']}
                                            labelFormatter={(val) => format(new Date(val), 'PPPP')}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#6366f1"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorEngagement)"
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <EmptyChart Icon={BarChart3} label="Awaiting data..." />
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-8">Hourly Distribution</h3>
                        <div className="h-[280px] md:h-[350px] w-full">
                            {trends?.hourlyDistribution && trends.hourlyDistribution.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends?.hourlyDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888815" />
                                        <XAxis
                                            dataKey="_id"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                                            tickFormatter={(h) => `${h}h`}
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }} />
                                        <Tooltip
                                            cursor={{ fill: '#8888880a' }}
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            labelFormatter={(h) => `${h}:00 - ${h}:59`}
                                        />
                                        <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <EmptyChart Icon={Clock} label="Capturing activity..." />
                            )}
                        </div>
                    </div>
                </div>

                {/* Secondary Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="bg-zinc-900 dark:bg-zinc-800 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">User Composition</h4>
                            <div className="flex items-center gap-10">
                                <div className="h-28 w-28 shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'New', value: trends?.userTypes.firstTime || 0 },
                                                    { name: 'Returning', value: trends?.userTypes.returning || 0 }
                                                ]}
                                                innerRadius={35}
                                                outerRadius={50}
                                                paddingAngle={8}
                                                dataKey="value"
                                                animationBegin={500}
                                            >
                                                <Cell fill="#818cf8" stroke="none" />
                                                <Cell fill="#10b981" stroke="none" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                                        <div>
                                            <span className="block text-lg font-black leading-tight">{trends?.userTypes.firstTime}</span>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase">New Users</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                        <div>
                                            <span className="block text-lg font-black leading-tight">{trends?.userTypes.returning}</span>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase">Loyal Users</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">Retention Pulse</h4>
                        <div className="space-y-6">
                            <RetentionItem label="7-Day Inactive" value={summary?.inactive7Days || 0} total={summary?.totalUsersCount || 1} color="#f59e0b" />
                            <RetentionItem label="15-Day Inactive" value={summary?.inactive15Days || 0} total={summary?.totalUsersCount || 1} color="#f97316" />
                            <RetentionItem label="30-Day Inactive" value={summary?.inactive30Days || 0} total={summary?.totalUsersCount || 1} color="#ef4444" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-200/50 dark:shadow-none flex flex-col justify-between">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 mb-6">Platform Distribution</h4>
                            <p className="text-sm font-medium text-indigo-100 leading-relaxed mb-6">
                                Android devices account for the majority of logins in the last 72 hours, with web mobile traffic increasing.
                            </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-indigo-500/30 pt-6">
                            <div className="flex flex-col items-center">
                                <Smartphone className="w-5 h-5 mb-2 text-indigo-100" />
                                <span className="text-xl font-black">74%</span>
                                <span className="text-[9px] font-bold uppercase text-indigo-300">App</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Monitor className="w-5 h-5 mb-2 text-indigo-100" />
                                <span className="text-xl font-black">18%</span>
                                <span className="text-[9px] font-bold uppercase text-indigo-300">Desktop</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Monitor className="w-5 h-5 mb-2 text-indigo-100 rotate-90" />
                                <span className="text-xl font-black">8%</span>
                                <span className="text-[9px] font-bold uppercase text-indigo-300">Mobile Web</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Geographic Login Distribution */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Geographic Login Distribution</h2>
                            <p className="text-sm text-zinc-500 font-medium italic">Clustered report of user activity by regional hubs.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {locations.length > 0 ? (
                            locations.map((loc, i) => (
                                <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 group active:scale-95">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center font-black text-zinc-400 text-[10px]">
                                            {i + 1}
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-black text-zinc-900 dark:text-white leading-none">{loc.count}</span>
                                            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">{loc.percentage}% share</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{loc.city}</h4>
                                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-none truncate">{loc.region}, {loc.country}</p>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full transition-all duration-1000 group-hover:bg-emerald-500" 
                                            style={{ width: `${loc.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">No regional data captured in this window</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Flagged For Credential Sharing */}
                {suspiciousUsers.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Flagged For Credential Sharing</h2>
                                <p className="text-sm text-zinc-500 font-medium italic">Users seen on more than 3 unique devices in the last 7 days.</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-rose-100/50 dark:shadow-none overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-rose-50/50 dark:bg-rose-900/10 text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em] border-b border-rose-100/50 dark:border-rose-900/20">
                                        <tr>
                                            <th className="px-6 py-5">Name</th>
                                            <th className="px-6 py-5">Email/Phone</th>
                                            <th className="px-6 py-5 text-center">Total Devices (Last 7 Days)</th>
                                            <th className="px-6 py-5 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                                        {suspiciousUsers.map((u) => (
                                            <tr key={u._id} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/10 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight text-sm">
                                                        {u.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-xs text-zinc-500">{u.email}</div>
                                                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{u.mobile}</div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-full font-black text-xs">
                                                        {u.activeDevicesCount} Devices
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <button
                                                        onClick={() => setSelectedSuspiciousUser(u)}
                                                        className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-all active:scale-95"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Deep Dive */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Active User Registry</h2>
                            <p className="text-sm text-zinc-500 font-medium italic">
                                Showing the most recent activity across all membership tiers
                                {suspiciousCount > 0 && (
                                    <span className="ml-2 text-rose-500 font-bold not-italic">
                                        — {suspiciousCount} flagged for multi-IP usage
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Filter by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-3 px-3 no-scrollbar">
                        <select
                            value={filters.membership}
                            onChange={(e) => { setFilters(prev => ({ ...prev, membership: e.target.value })); setPage(1); }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 shrink-0 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                        >
                            <option value="all">Tier: All</option>
                            <option value="diamond">Tier: Diamond</option>
                            <option value="platinum">Tier: Platinum</option>
                            <option value="gold">Tier: Gold</option>
                            <option value="silver">Tier: Silver</option>
                            <option value="free">Tier: Free</option>
                        </select>
                        <select
                            value={filters.activity}
                            onChange={(e) => { setFilters(prev => ({ ...prev, activity: e.target.value })); setPage(1); }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 shrink-0 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                        >
                            <option value="all">Engagement: All</option>
                            <option value="Active">Status: Active</option>
                            <option value="Moderate">Status: Moderate</option>
                            <option value="Inactive">Status: Inactive</option>
                        </select>
                        <select
                            value={filters.suspicious}
                            onChange={(e) => { setFilters(prev => ({ ...prev, suspicious: e.target.value })); setPage(1); }}
                            className="bg-white dark:bg-zinc-900 border border-rose-200 dark:border-rose-900/40 rounded-lg px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 shrink-0 outline-none focus:ring-2 focus:ring-rose-500 transition-all shadow-sm"
                        >
                            <option value="all">IP Status: All</option>
                            <option value="suspicious">⚠ Suspicious Only</option>
                            <option value="healthy">✓ Healthy Only</option>
                        </select>
                        <div className="flex-1 shrink-0 px-2 text-[10px] uppercase font-black tracking-widest text-zinc-400">
                            {filteredUsers.length} Records Found
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
                        {/* Mobile Card View */}
                        <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((u) => (
                                    <MobileUserCard key={u.id} user={u} onViewLogs={() => openLoginHistory(u)} />
                                ))
                            ) : (
                                <EmptyState />
                            )}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left min-w-[900px]">
                                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-100 dark:border-zinc-800">
                                    <tr>
                                        <th className="px-6 py-5">S.No</th>
                                        <th className="px-6 py-5">Identity</th>
                                        <th className="px-6 py-5">Access Tier</th>
                                        <th className="px-6 py-5 text-center">Logs</th>
                                        <th className="px-6 py-5">Recent Activity</th>
                                        <th className="px-6 py-5">Engagement</th>
                                        <th className="px-6 py-5">Last IP</th>
                                        <th className="px-6 py-5">IP Status</th>
                                        <th className="px-6 py-5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                                    {paginatedUsers.map((u, idx) => (
                                        <tr
                                            key={u.id}
                                            className={`transition-all group ${u.suspiciousFlag
                                                ? 'bg-rose-50/60 dark:bg-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                                                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/30'
                                                }`}
                                        >
                                            <td className="px-6 py-5 text-xs font-mono font-bold text-zinc-400">
                                                {(page - 1) * pageSize + idx + 1}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase transition-all ${u.suspiciousFlag
                                                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white'
                                                        : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white'
                                                        }`}>
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight text-sm leading-none flex items-center gap-1.5">
                                                            {u.name}
                                                            {u.suspiciousFlag && <ShieldAlert className="w-3 h-3 text-rose-500 shrink-0" />}
                                                        </div>
                                                        <div className="text-xs text-zinc-500 mt-1">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <MembershipBadge tier={u.membership} />
                                            </td>
                                            <td className="px-6 py-5 text-center font-mono font-black text-xs">
                                                {u.totalLogins}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                                                    {u.lastLogin ? format(new Date(u.lastLogin), 'PPp') : 'Never'}
                                                </div>
                                                <div className="text-[10px] text-zinc-400 font-medium">
                                                    {u.daysSinceLastLogin === 'Never' ? 'Initial entry' : `${u.daysSinceLastLogin} days since visit`}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <StatusBadge status={u.activityStatus} />
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-none">
                                                    {maskIp(u.lastIp)}
                                                </div>
                                                {u.distinctIpCount > 0 && (
                                                    <div className="text-[10px] text-zinc-400 mt-1">
                                                        {u.distinctIpCount} distinct {u.distinctIpCount === 1 ? 'IP' : 'IPs'} (last 10)
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-5">
                                                <IpStatusBadge suspicious={u.suspiciousFlag} count={u.distinctIpCount} />
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <button
                                                    onClick={() => openLoginHistory(u)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-200 dark:hover:border-indigo-800 rounded-lg text-[10px] font-black uppercase tracking-wide text-zinc-600 dark:text-zinc-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all active:scale-95"
                                                >
                                                    <ExternalLink className="w-3 h-3" /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {filteredUsers.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                            <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400">
                                View {Math.min(filteredUsers.length, (page - 1) * pageSize + 1)} - {Math.min(filteredUsers.length, page * pageSize)} <span className="text-zinc-300 mx-1">/</span> Total {filteredUsers.length}
                            </span>
                            <div className="flex items-center gap-1">
                                <PaginationButton
                                    onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    disabled={page === 1}
                                ><ArrowLeft className="w-3.5 h-3.5" /></PaginationButton>

                                <div className="flex items-center px-4 h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black text-zinc-900 dark:text-white shadow-sm">
                                    {page} <span className="mx-2 opacity-30">|</span> {totalPages}
                                </div>

                                <PaginationButton
                                    onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    disabled={page === totalPages}
                                ><ArrowLeft className="w-3.5 h-3.5 rotate-180" /></PaginationButton>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Insight */}
                <div className="mt-12 p-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row md:items-center gap-8 group">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xl group-hover:scale-110 transition-transform duration-500">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-1">Growth Advisory</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium italic">
                            Login frequency for <span className="text-indigo-600 dark:text-indigo-400 font-bold">Diamond Users</span> has increased by 14% compared to the previous 30-day window. Mobile app usage remains the primary engagement vector.
                        </p>
                    </div>
                </div>
            </div>

            {/* Login History Modal */}
            {selectedUser && (
                <LoginHistoryModal
                    user={selectedUser}
                    logs={loginLogs}
                    loading={logsLoading}
                    page={logPage}
                    pages={logPages}
                    total={logTotal}
                    dateFrom={logDateFrom}
                    dateTo={logDateTo}
                    ipFilter={logIpFilter}
                    onDateFromChange={setLogDateFrom}
                    onDateToChange={setLogDateTo}
                    onIpFilterChange={setLogIpFilter}
                    onApplyFilters={applyLogFilters}
                    onPageChange={setLogPage}
                    onExport={exportLoginLogsCSV}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {/* Device Detail Modal */}
            {selectedSuspiciousUser && (
                <DeviceDetailModal
                    user={selectedSuspiciousUser}
                    onClose={() => setSelectedSuspiciousUser(null)}
                />
            )}
        </div>
    );
}

// --- Device Detail Modal ---

interface DeviceDetailModalProps {
    user: SuspiciousUser;
    onClose: () => void;
}

function DeviceDetailModal({ user, onClose }: DeviceDetailModalProps) {
    // Sort devices by last seen date (newest first)
    const sortedDevices = [...user.knownDevices].sort((a, b) => 
        new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
    );

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Device Fingerprints</h3>
                            <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase rounded-lg">Suspicious Activity</span>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium">{user.name} • {user.email}</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-zinc-500 hover:bg-zinc-200 transition-all active:scale-95">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-4">
                        {sortedDevices.map((device) => (
                            <div key={device.deviceId} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between group hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-700">
                                        {getDeviceIcon(device.deviceType)}
                                    </div>
                                    <div>
                                        <div className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight text-sm mb-0.5">
                                            {device.clientName || 'Unknown Device'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{device.os}</span>
                                            <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{device.deviceType}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Last Seen</div>
                                    <div className="text-sm font-black text-zinc-900 dark:text-white">
                                        {format(new Date(device.lastSeen), 'PPp')}
                                    </div>
                                    <div className="text-[9px] font-bold text-indigo-500 uppercase tracking-tight mt-1 opacity-60">
                                        First seen: {format(new Date(device.firstSeen), 'PP')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Unique Device IDs: {user.knownDevices.length}</p>
                </div>
            </div>
        </div>
    );
}

// --- Login History Modal ---

interface LoginHistoryModalProps {
    user: UserRecord;
    logs: LoginLogRecord[];
    loading: boolean;
    page: number;
    pages: number;
    total: number;
    dateFrom: string;
    dateTo: string;
    ipFilter: string;
    onDateFromChange: (v: string) => void;
    onDateToChange: (v: string) => void;
    onIpFilterChange: (v: string) => void;
    onApplyFilters: () => void;
    onPageChange: (p: number) => void;
    onExport: () => void;
    onClose: () => void;
}

function LoginHistoryModal({
    user, logs, loading, page, pages, total,
    dateFrom, dateTo, ipFilter,
    onDateFromChange, onDateToChange, onIpFilterChange,
    onApplyFilters, onPageChange, onExport, onClose
}: LoginHistoryModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full sm:max-w-5xl max-h-[95vh] sm:max-h-[90vh] bg-white dark:bg-zinc-900 sm:rounded-3xl rounded-t-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-start justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg uppercase ${user.suspiciousFlag
                            ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                            : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                            }`}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight leading-none">
                                    {user.name}
                                </h3>
                                <IpStatusBadge suspicious={user.suspiciousFlag} count={user.distinctIpCount} />
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={onExport}
                            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 transition-all active:scale-95"
                        >
                            <Download className="w-3 h-3" /> Export CSV
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Summary bar */}
                <div className="flex items-center gap-6 px-6 py-3 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        Total Logins: <span className="text-zinc-900 dark:text-white">{user.totalLogins}</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        Distinct IPs (last 10): <span className={user.suspiciousFlag ? 'text-rose-600' : 'text-emerald-600'}>{user.distinctIpCount}</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        Last IP: <span className="text-zinc-900 dark:text-white font-mono">{user.lastIp || 'Unknown'}</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-end gap-3 p-4 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">From Date</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={e => onDateFromChange(e.target.value)}
                            className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">To Date</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={e => onDateToChange(e.target.value)}
                            className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">IP Address</label>
                        <input
                            type="text"
                            placeholder="e.g. 192.168"
                            value={ipFilter}
                            onChange={e => onIpFilterChange(e.target.value)}
                            className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-36"
                        />
                    </div>
                    <button
                        onClick={onApplyFilters}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 self-end"
                    >
                        Apply
                    </button>
                    {(dateFrom || dateTo || ipFilter) && (
                        <button
                            onClick={() => { onDateFromChange(''); onDateToChange(''); onIpFilterChange(''); setTimeout(onApplyFilters, 0); }}
                            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 self-end"
                        >
                            Reset
                        </button>
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 self-end ml-auto">
                        {total} records
                    </span>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 gap-3">
                            <Shield className="w-10 h-10 text-zinc-200 dark:text-zinc-700" />
                            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">No login records found</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] border-b border-zinc-100 dark:border-zinc-800 sticky top-0">
                                <tr>
                                    <th className="px-5 py-3">Date & Time</th>
                                    <th className="px-5 py-3">IP Address</th>
                                    <th className="px-5 py-3">Location</th>
                                    <th className="px-5 py-3">Device</th>
                                    <th className="px-5 py-3">Platform</th>
                                    <th className="px-5 py-3">Session ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                                {logs.map((log, i) => (
                                    <tr key={log._id || i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                                                {format(new Date(log.loginAt), 'dd MMM yyyy')}
                                            </div>
                                            <div className="text-[10px] text-zinc-400 font-mono">
                                                {format(new Date(log.loginAt), 'HH:mm:ss')}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                                            {log.ip || 'Unknown'}
                                        </td>
                                        <td className="px-5 py-3 text-xs text-zinc-600 dark:text-zinc-400">
                                            {[log.location?.city, log.location?.region, log.location?.country]
                                                .filter(Boolean).join(', ') || '—'}
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-1.5">
                                                {getDeviceIcon(log.device?.type || '')}
                                                <span className="text-[10px] uppercase font-bold text-zinc-500">{log.device?.type || 'Unknown'}</span>
                                            </div>
                                            <div className="text-[9px] text-zinc-400 mt-0.5">{log.device?.os || ''}</div>
                                        </td>
                                        <td className="px-5 py-3 text-[10px] text-zinc-500 font-medium">
                                            {log.device?.browser || '—'}
                                        </td>
                                        <td className="px-5 py-3 font-mono text-[9px] text-zinc-400 max-w-[120px] truncate">
                                            {log.sessionId ? log.sessionId.slice(0, 12) + '…' : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Modal Pagination */}
                {pages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
                        <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400">
                            Page {page} of {pages}
                        </span>
                        <div className="flex items-center gap-1">
                            <PaginationButton onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </PaginationButton>
                            <PaginationButton onClick={() => onPageChange(Math.min(pages, page + 1))} disabled={page === pages}>
                                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                            </PaginationButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Specialized Components ---

function StatCard({ title, value, subValue, icon, color }: { title: string; value: number | string; subValue: string; icon: React.ReactNode; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
        indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30",
        amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
        rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 border-rose-100 dark:border-rose-900/30"
    };

    return (
        <div className="bg-white dark:bg-zinc-900 p-5 md:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 active:scale-95 group">
            <div className={`p-3 rounded-2xl w-fit mb-5 ${colorClasses[color]} border transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1 block">{title}</span>
                <span className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 leading-none antialiased">{value}</span>
                <span className="block text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-wide italic opacity-60">{subValue}</span>
            </div>
        </div>
    );
}

function RetentionItem({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
    const percentage = Math.min(Math.round((value / total) * 100), 100);
    return (
        <div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-2 px-1">
                <span className="text-zinc-500">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-zinc-900 dark:text-white">{value}</span>
                    <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[9px] text-zinc-500">{percentage}%</span>
                </div>
            </div>
            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-50 dark:border-zinc-800/50 p-0.5">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}

function MobileUserCard({ user, onViewLogs }: { user: UserRecord; onViewLogs: () => void }) {
    return (
        <div className={`p-4 transition-colors ${user.suspiciousFlag ? 'bg-rose-50/50 dark:bg-rose-950/10' : 'active:bg-zinc-50 dark:active:bg-zinc-800/50'}`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase ${user.suspiciousFlag ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'}`}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-black text-zinc-900 dark:text-white uppercase tracking-tight text-sm leading-tight flex items-center gap-2">
                            {user.name}
                            <MembershipBadge tier={user.membership} isMini />
                        </div>
                        <div className="text-[10px] text-zinc-500 font-bold tracking-tight">{user.email}</div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={user.activityStatus} isMini />
                    <IpStatusBadge suspicious={user.suspiciousFlag} count={user.distinctIpCount} isMini />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 bg-zinc-50 dark:bg-zinc-800/30 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                <div>
                    <span className="text-[8px] font-black uppercase text-zinc-400 tracking-[0.15em] block mb-1">Last Login IP</span>
                    <span className="text-[11px] font-bold font-mono text-zinc-800 dark:text-zinc-200 block">{maskIp(user.lastIp)}</span>
                </div>
                <div className="text-right">
                    <span className="text-[8px] font-black uppercase text-zinc-400 tracking-[0.15em] block mb-1">Total Logs</span>
                    <span className="text-base font-black text-zinc-900 dark:text-white">{user.totalLogins}</span>
                </div>
            </div>

            <button
                onClick={onViewLogs}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-indigo-700 transition-all border border-zinc-200 dark:border-zinc-700"
            >
                <ExternalLink className="w-3 h-3" /> View Login Report
            </button>
        </div>
    );
}

function IpStatusBadge({ suspicious, count, isMini = false }: { suspicious: boolean; count: number; isMini?: boolean }) {
    if (isMini) {
        return suspicious ? (
            <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800">
                <ShieldAlert className="w-3 h-3 text-rose-500" />
            </div>
        ) : (
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <Shield className="w-3 h-3 text-emerald-500" />
            </div>
        );
    }

    if (suspicious) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 text-[9px] font-black uppercase tracking-tight text-rose-700 dark:text-rose-400 whitespace-nowrap">
                <ShieldAlert className="w-3 h-3" />
                Multiple IP ({count})
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-[9px] font-black uppercase tracking-tight text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
            <Shield className="w-3 h-3" />
            Healthy
        </span>
    );
}

function MembershipBadge({ tier, isMini = false }: { tier: string; isMini?: boolean }) {
    const tierColors: Record<string, string> = {
        diamond: "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-800",
        platinum: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
        gold: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
        silver: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
        free: "bg-zinc-50 text-zinc-700 border-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
    };

    if (isMini) {
        return (
            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border font-mono ${tierColors[tier] || tierColors.free}`}>
                {tier?.charAt(0) || '?'}
            </span>
        );
    }

    return (
        <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border whitespace-nowrap shadow-sm ${tierColors[tier] || tierColors.free}`}>
            {tier} Access
        </span>
    );
}

function StatusBadge({ status, isMini = false }: { status: string; isMini?: boolean }) {
    const statuses: Record<string, { bg: string; text: string; dot: string; label: string }> = {
        Active: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500', label: 'Healthy' },
        Moderate: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500', label: 'Average' },
        Inactive: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-700 dark:text-rose-400', dot: 'bg-rose-500', label: 'Churn Risk' },
    };

    const s = statuses[status] || statuses.Inactive;

    if (isMini) {
        return (
            <div className={`p-2 rounded-xl border border-transparent shadow-xs ${s.bg}`}>
                <div className={`w-2 h-2 rounded-full ${s.dot} shadow-sm animate-pulse`} />
            </div>
        );
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-transparent text-[10px] font-black uppercase tracking-tight shadow-xs ${s.bg} ${s.text}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
        </span>
    );
}

function PaginationButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="h-10 w-10 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-20 transition-all shadow-sm active:scale-95"
        >
            {children}
        </button>
    );
}

function EmptyChart({ Icon, label }: { Icon: any; label: string }) {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800/30 rounded-[2rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
            <Icon className="w-10 h-10 text-zinc-200 dark:text-zinc-700 mb-2 animate-pulse" />
            <p className="text-xs text-zinc-400 italic font-bold uppercase tracking-wider">{label}</p>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="p-16 text-center">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-indigo-400" />
            </div>
            <h4 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">Vortex Empty</h4>
            <p className="text-sm text-zinc-500 font-medium">No matching intelligence found for the current filter parameters.</p>
        </div>
    );
}

function getDeviceIcon(platform: string) {
    if (platform === 'mobile_browser' || platform === 'app' || platform === 'Mobile') return <Smartphone className="w-3.5 h-3.5 text-zinc-400" />;
    if (platform === 'desktop' || platform === 'Desktop') return <Laptop className="w-3.5 h-3.5 text-zinc-400" />;
    if (platform === 'Tablet') return <TabletIcon className="w-3.5 h-3.5 text-zinc-400" />;
    return <Monitor className="w-3.5 h-3.5 text-zinc-400" />;
}
