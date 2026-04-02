"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    ArrowLeft, Users, BarChart3, TrendingUp, UserCheck, UserMinus, 
    Monitor, Clock, Filter, Download, Search, AlertCircle,
    Calendar, ArrowUpRight, Smartphone, Tablet as TabletIcon, Laptop,
    ChevronRight, MoreHorizontal, LayoutDashboard
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
}

export default function AnalyticsDashboard() {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [trends, setTrends] = useState<TrendData | null>(null);
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        membership: "all",
        activity: "all",
        role: "all"
    });
    const [page, setPage] = useState(1);
    const [pageSize] = useState(25);
    const [days, setDays] = useState(30);
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        fetchData();
        
        // Auto-refresh every 60 seconds
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, [days]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [summaryRes, trendsRes, usersRes] = await Promise.all([
                fetch(`/api/developer/analytics/summary?days=${days}`),
                fetch(`/api/developer/analytics/trends?days=${days}`),
                fetch('/api/developer/analytics/users')
            ]);

            const summaryData = await summaryRes.json();
            const trendsData = await trendsRes.json();
            const usersData = await usersRes.json();

            setSummary(summaryData);
            setTrends(trendsData);
            setUsers(usersData.users);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
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
        const headers = ["Name", "Email", "Role", "Membership", "Total Logins", "Last Login", "Activity Status"];
        const rows = users.map(u => [
            u.name, u.email, u.role, u.membership, u.totalLogins, 
            u.lastLogin ? format(new Date(u.lastLogin), 'PP') : 'Never', 
            u.activityStatus
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

        return matchesSearch && matchesMembership && matchesActivity && matchesRole;
    });

    const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filteredUsers.length / pageSize);

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
                                        className={`flex-1 sm:flex-none px-5 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                                            days === d 
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

                {/* Stat Cards - Optimized for Mobile (Scroll horizontally if needed, or stack) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
                    <StatCard title="Total Logins" value={summary?.totalLoginsToday || 0} subValue="24h Window" icon={<TrendingUp />} color="blue" />
                    <StatCard title="Active Users" value={summary?.uniqueUsersToday || 0} subValue="Today" icon={<UserCheck />} color="emerald" />
                    <StatCard title="Peak Hour" value={summary?.peakLoginTime || "N/A"} subValue="Most Active" icon={<Clock />} color="amber" />
                    <StatCard title="Growth" value={((trends?.userTypes.firstTime || 0) / (summary?.totalUsersCount || 1) * 100).toFixed(1) + "%"} subValue="New Users" icon={<ArrowUpRight />} color="indigo" />
                </div>

                {/* Primary Visualization Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Chart Card */}
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
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
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

                    {/* Hourly Distribution Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-8">Hourly Distribution</h3>
                        <div className="h-[280px] md:h-[350px] w-full">
                            {trends?.hourlyDistribution && trends.hourlyDistribution.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends?.hourlyDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888815"/>
                                        <XAxis 
                                            dataKey="_id" 
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }} 
                                            tickFormatter={(h) => `${h}h`} 
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }} />
                                        <Tooltip 
                                            cursor={{fill: '#8888880a'}} 
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

                {/* Secondary Row: Device & Composition */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Visitor Makeup */}
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

                    {/* Retention Progress */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                         <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">Retention Pulse</h4>
                         <div className="space-y-6">
                             <RetentionItem label="7-Day Inactive" value={summary?.inactive7Days || 0} total={summary?.totalUsersCount || 1} color="#f59e0b" />
                             <RetentionItem label="15-Day Inactive" value={summary?.inactive15Days || 0} total={summary?.totalUsersCount || 1} color="#f97316" />
                             <RetentionItem label="30-Day Inactive" value={summary?.inactive30Days || 0} total={summary?.totalUsersCount || 1} color="#ef4444" />
                         </div>
                    </div>

                    {/* Platform Stats */}
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

                {/* User Deep Dive - Mobile Card Based / Desktop Table */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Active User Registry</h2>
                            <p className="text-sm text-zinc-500 font-medium italic">Showing the most recent activity across all membership tiers</p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input 
                                    type="text"
                                    placeholder="Filter by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => {setSearchTerm(e.target.value); setPage(1);}}
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar - Mobile Scrollable */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-3 px-3 no-scrollbar">
                        <select 
                            value={filters.membership}
                            onChange={(e) => {setFilters(prev => ({...prev, membership: e.target.value})); setPage(1);}}
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
                            onChange={(e) => {setFilters(prev => ({...prev, activity: e.target.value})); setPage(1);}}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 shrink-0 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                        >
                            <option value="all">Engagement: All</option>
                            <option value="Active">Status: Active</option>
                            <option value="Moderate">Status: Moderate</option>
                            <option value="Inactive">Status: Inactive</option>
                        </select>
                        <div className="flex-1 shrink-0 px-2 text-[10px] uppercase font-black tracking-widest text-zinc-400">
                             {filteredUsers.length} Records Found
                        </div>
                    </div>

                    {/* Mobile: Card View | Desktop: Table View */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
                        {/* Mobile Grid */}
                        <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((u) => (
                                    <MobileUserCard key={u.id} user={u} />
                                ))
                            ) : (
                                <EmptyState />
                            )}
                        </div>

                        {/* Desktop Table */}
                        <table className="hidden md:table w-full text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-100 dark:border-zinc-800">
                                <tr>
                                    <th className="px-8 py-5">S.No</th>
                                    <th className="px-8 py-5">Identity</th>
                                    <th className="px-8 py-5">Access Tier</th>
                                    <th className="px-8 py-5 text-center">Logs</th>
                                    <th className="px-8 py-5">Recent Activity</th>
                                    <th className="px-8 py-5">Engagement</th>
                                    <th className="px-8 py-5">Platform</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                                {paginatedUsers.map((u, idx) => (
                                    <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all group">
                                        <td className="px-8 py-5 text-xs font-mono font-bold text-zinc-400">
                                            {(page - 1) * pageSize + idx + 1}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center font-black text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm uppercase">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight text-sm leading-none">{u.name}</div>
                                                    <div className="text-xs text-zinc-500 mt-1">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <MembershipBadge tier={u.membership} />
                                        </td>
                                        <td className="px-8 py-5 text-center font-mono font-black text-xs">
                                            {u.totalLogins}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                                                {u.lastLogin ? format(new Date(u.lastLogin), 'PPp') : 'Never'}
                                            </div>
                                            <div className="text-[10px] text-zinc-400 font-medium">
                                                {u.daysSinceLastLogin === 'Never' ? 'Initial entry' : `${u.daysSinceLastLogin} days since visit`}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <StatusBadge status={u.activityStatus} />
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                {getDeviceIcon(u.devicePreference)}
                                                <span className="text-[10px] uppercase font-bold text-zinc-400">{u.devicePreference.replace('_', ' ')}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Enhanced Pagination */}
                    {filteredUsers.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                            <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400">
                                View {Math.min(filteredUsers.length, (page - 1) * pageSize + 1)} - {Math.min(filteredUsers.length, page * pageSize)} <span className="text-zinc-300 mx-1">/</span> Total {filteredUsers.length}
                            </span>
                            <div className="flex items-center gap-1">
                                <PaginationButton 
                                    onClick={() => {setPage(p => Math.max(1, p - 1)); window.scrollTo({top: 0, behavior: 'smooth'});}} 
                                    disabled={page === 1}
                                ><ArrowLeft className="w-3.5 h-3.5" /></PaginationButton>
                                
                                <div className="flex items-center px-4 h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black text-zinc-900 dark:text-white shadow-sm">
                                    {page} <span className="mx-2 opacity-30">|</span> {totalPages}
                                </div>

                                <PaginationButton 
                                    onClick={() => {setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({top: 0, behavior: 'smooth'});}} 
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
        </div>
    );
}

// --- Specialized Components ---

function StatCard({ title, value, subValue, icon, color }: { title: string; value: number | string; subValue: string; icon: React.ReactNode; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
        indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30",
        amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/30"
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

function MobileUserCard({ user }: { user: UserRecord }) {
    return (
        <div className="p-4 active:bg-zinc-50 dark:active:bg-zinc-800/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center font-black text-indigo-600 dark:text-indigo-400 text-sm uppercase">
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
                <StatusBadge status={user.activityStatus} isMini />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 bg-zinc-50 dark:bg-zinc-800/30 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                <div>
                    <span className="text-[8px] font-black uppercase text-zinc-400 tracking-[0.15em] block mb-1">Most Recent Login</span>
                    <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block">
                        {user.lastLogin ? format(new Date(user.lastLogin), 'dd MMM, HH:mm') : 'None'}
                    </span>
                    <span className="text-[9px] text-zinc-500">{user.daysSinceLastLogin === 'Never' ? 'First login' : `${user.daysSinceLastLogin} days ago`}</span>
                </div>
                <div className="text-right">
                    <span className="text-[8px] font-black uppercase text-zinc-400 tracking-[0.15em] block mb-1">Total Logs</span>
                    <div className="flex items-center justify-end gap-1.5">
                        <span className="text-base font-black text-zinc-900 dark:text-white">{user.totalLogins}</span>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-xs">
                             {getDeviceIcon(user.devicePreference)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border font-mono ${tierColors[tier]}`}>
                {tier.charAt(0)}
            </span>
        );
    }

    return (
        <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border whitespace-nowrap shadow-sm ${tierColors[tier]}`}>
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
                <div className={`w-2 h-2 rounded-full ${s.dot} shadow-sm shadow-${s.dot}/50 animate-pulse`} />
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
