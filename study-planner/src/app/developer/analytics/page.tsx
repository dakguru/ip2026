"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    ArrowLeft, Users, BarChart3, TrendingUp, UserCheck, UserMinus, 
    Monitor, Clock, Filter, Download, Search, AlertCircle,
    Calendar, ArrowUpRight, Smartphone, Tablet as TabletIcon, Laptop
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
                    <p className="text-zinc-500 font-medium">Loading Analytics...</p>
                </div>
            </div>
        );
    }

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8 transition-colors">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link href="/developer" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to CMS
                        </Link>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-indigo-600" />
                            User Login Analytics
                            <span className="ml-2 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-black px-1.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800 animate-pulse">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                Live
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 shadow-sm mr-2">
                            {[7, 30, 90].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDays(d)}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                                        days === d 
                                        ? 'bg-indigo-600 text-white shadow-sm' 
                                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                                    }`}
                                >
                                    {d}D
                                </button>
                            ))}
                        </div>
                        {process.env.NODE_ENV !== 'production' && (
                            <button 
                                onClick={seedMockData}
                                disabled={seeding}
                                className="p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-all shadow-sm"
                                title="Seed Mock Data (Dev Only)"
                            >
                                <Users className="w-5 h-5" />
                            </button>
                        )}
                        <button 
                            onClick={fetchData}
                            className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
                            title="Refresh Data"
                        >
                            <Clock className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button 
                            onClick={exportToCSV}
                            className="flex items-center gap-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm font-medium"
                        >
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Total Logins Today" value={summary?.totalLoginsToday || 0} icon={<TrendingUp />} color="blue" />
                    <StatCard title="Unique Users Today" value={summary?.uniqueUsersToday || 0} icon={<UserCheck />} color="emerald" />
                    <StatCard title="Repeat Users Today" value={summary?.repeatUsersToday || 0} icon={<ArrowUpRight />} color="indigo" />
                    <StatCard title="Active (7 Days)" value={summary?.activeUsers7Days || 0} icon={<Users />} color="cyan" />
                </div>

                {/* Engagement & Retention Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Daily Trend Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Daily Login Trend</h3>
                            <div className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Last 30 Days</div>
                        </div>
                        <div className="h-64 w-full flex items-center justify-center">
                            {trends?.dailyTrends && trends.dailyTrends.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trends?.dailyTrends}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                                        <XAxis 
                                            dataKey="_id" 
                                            tick={{ fontSize: 10 }} 
                                            tickFormatter={(val) => format(new Date(val), 'MMM dd')}
                                            minTickGap={30}
                                        />
                                        <YAxis tick={{ fontSize: 10 }} width={30} />
                                        <Tooltip 
                                            contentStyle={{ 
                                                borderRadius: '12px', 
                                                border: 'none', 
                                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                backdropFilter: 'blur(4px)'
                                            }}
                                            labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                                        />
                                        <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center">
                                    <BarChart3 className="w-10 h-10 text-zinc-200 dark:text-zinc-800 mx-auto mb-2" />
                                    <p className="text-xs text-zinc-400 italic">No login data available for this period</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hourly Distribution Bar */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6">Hourly Engagement</h3>
                        <div className="h-64 w-full flex items-center justify-center">
                            {trends?.hourlyDistribution && trends.hourlyDistribution.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends?.hourlyDistribution}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820"/>
                                        <XAxis dataKey="_id" tick={{ fontSize: 10 }} tickFormatter={(h) => `${h}:00`} />
                                        <YAxis tick={{ fontSize: 10 }} width={30} />
                                        <Tooltip 
                                            cursor={{fill: '#88888810'}} 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                                            labelFormatter={(h) => `Time: ${h}:00`}
                                        />
                                        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center">
                                    <Clock className="w-10 h-10 text-zinc-200 dark:text-zinc-800 mx-auto mb-2" />
                                    <p className="text-xs text-zinc-400 italic">No hourly data</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Secondary Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                         <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">Retention Overview</h4>
                         <div className="space-y-3">
                             <RetentionItem label="Inactive (7D)" value={summary?.inactive7Days || 0} total={summary?.totalUsersCount || 1} color="#f59e0b" />
                             <RetentionItem label="Inactive (15D)" value={summary?.inactive15Days || 0} total={summary?.totalUsersCount || 1} color="#f97316" />
                             <RetentionItem label="Inactive (30D)" value={summary?.inactive30Days || 0} total={summary?.totalUsersCount || 1} color="#ef4444" />
                         </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">Peak Activity</h4>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                                <Clock className="w-8 h-8" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-zinc-900 dark:text-zinc-100">{summary?.peakLoginTime}</span>
                                <span className="text-sm text-zinc-500">Most active hour</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Visitor Composition</h4>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> New</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Returning</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                             <div className="h-24 w-24">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={[
                                            { name: 'New', value: trends?.userTypes.firstTime || 0 },
                                            { name: 'Returning', value: trends?.userTypes.returning || 0 }
                                        ]} innerRadius={30} outerRadius={45} paddingAngle={5} dataKey="value">
                                            <Cell fill="#6366f1" />
                                            <Cell fill="#10b981" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                             </div>
                             <div className="flex-1">
                                 <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                     In the last 30 days, <span className="font-bold text-zinc-900 dark:text-zinc-100">{trends?.userTypes.firstTime}</span> users joined while <span className="font-bold text-zinc-900 dark:text-zinc-100">{trends?.userTypes.returning}</span> members returned to the platform.
                                 </p>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Table Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden mb-12">
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                             <select 
                                value={filters.membership}
                                onChange={(e) => setFilters(prev => ({...prev, membership: e.target.value}))}
                                className="text-xs font-semibold py-2 px-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-lg outline-none cursor-pointer"
                             >
                                 <option value="all">All Memberships</option>
                                 <option value="diamond">Diamond</option>
                                 <option value="platinum">Platinum</option>
                                 <option value="gold">Gold</option>
                                 <option value="silver">Silver</option>
                                 <option value="free">Free</option>
                             </select>

                             <select 
                                value={filters.activity}
                                onChange={(e) => setFilters(prev => ({...prev, activity: e.target.value}))}
                                className="text-xs font-semibold py-2 px-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-lg outline-none cursor-pointer"
                             >
                                 <option value="all">All Activity</option>
                                 <option value="Active">🟢 Active</option>
                                 <option value="Moderate">🟡 Moderate</option>
                                 <option value="Inactive">🔴 Inactive</option>
                             </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Membership</th>
                                    <th className="px-6 py-4 text-center">Logins</th>
                                    <th className="px-6 py-4">Last Login</th>
                                    <th className="px-6 py-4">Frequency</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Device</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {paginatedUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-bold text-zinc-900 dark:text-zinc-100">{u.name}</div>
                                                <div className="text-xs text-zinc-500">{u.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                                                u.membership === 'diamond' ? 'bg-cyan-100 text-cyan-700' :
                                                u.membership === 'platinum' ? 'bg-purple-100 text-purple-700' :
                                                u.membership === 'gold' ? 'bg-amber-100 text-amber-700' :
                                                u.membership === 'silver' ? 'bg-blue-100 text-blue-700' :
                                                'bg-zinc-100 text-zinc-600'
                                            }`}>
                                                {u.membership}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-mono font-bold text-sm">
                                            {u.totalLogins}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <div className="text-zinc-700 dark:text-zinc-300">
                                                {u.lastLogin ? format(new Date(u.lastLogin), 'PP') : 'Never'}
                                            </div>
                                            <div className="text-[10px] text-zinc-400">
                                                {u.daysSinceLastLogin === 'Never' ? 'N/A' : `${u.daysSinceLastLogin} days ago`}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {u.frequencyPerWeek} <span className="text-[10px] text-zinc-500 font-normal">/ wk</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1.5 text-xs font-bold ${
                                                u.activityStatus === 'Active' ? 'text-emerald-600' :
                                                u.activityStatus === 'Moderate' ? 'text-amber-600' :
                                                'text-rose-600'
                                            }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${
                                                    u.activityStatus === 'Active' ? 'bg-emerald-500' :
                                                    u.activityStatus === 'Moderate' ? 'bg-amber-500' :
                                                    'bg-rose-500'
                                                }`} />
                                                {u.activityStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getDeviceIcon(u.devicePreference)}
                                                <span className="text-xs capitalize text-zinc-500">{u.devicePreference.replace('_', ' ')}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Footer */}
                        {filteredUsers.length > 0 && (
                            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <div className="text-xs text-zinc-500">
                                    Showing {Math.min(filteredUsers.length, (page - 1) * pageSize + 1)} to {Math.min(filteredUsers.length, page * pageSize)} of {filteredUsers.length} users
                                </div>
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </button>
                                    <div className="px-3 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Page {page} of {totalPages}
                                    </div>
                                    <button 
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors rotate-180"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-zinc-400" />
                                </div>
                                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">No users found</h4>
                                <p className="text-sm text-zinc-500">Try adjusting your filters or search term.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Alerts Section (Flagging) */}
                <div className="mb-12">
                     <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-rose-500" />
                        Engagement Alerts
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AlertBox 
                            title="Inactive Premium Users"
                            description="High-value subscribers (Diamond/Platinum) who haven't logged in for 7+ days."
                            items={users.filter(u => ['diamond', 'platinum'].includes(u.membership) && (u.daysSinceLastLogin === 'Never' ? true : (u.daysSinceLastLogin as number) > 7)).slice(0, 5)}
                        />
                        <AlertBox 
                            title="Churn Risk"
                            description="Users whose login frequency dropped significantly this week."
                            items={users.filter(u => u.activityStatus === 'Inactive').slice(0, 5)}
                            color="rose"
                        />
                     </div>
                </div>

            </div>
        </div>
    );
}

// --- Helper Components ---

function StatCard({ title, value, icon, color }: { title: string; value: number | string; icon: React.ReactNode; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        emerald: "bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
        indigo: "bg-indigo-100/50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
        cyan: "bg-cyan-100/50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
    };

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start justify-between">
            <div>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1 block">{title}</span>
                <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 leading-none">{value}</span>
            </div>
            <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                {icon}
            </div>
        </div>
    );
}

function RetentionItem({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
    const percentage = Math.min(Math.round((value / total) * 100), 100);
    return (
        <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-zinc-600 dark:text-zinc-400">{label}</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{value} <span className="text-zinc-500 font-normal">({percentage}%)</span></span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, backgroundColor: color }} />
            </div>
        </div>
    );
}

function AlertBox({ title, description, items, color = "amber" }: { title: string; description: string; items: UserRecord[]; color?: string }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="mb-4">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
                <p className="text-xs text-zinc-500 mt-1">{description}</p>
            </div>
            <div className="space-y-2">
                {items.length > 0 ? items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs uppercase text-zinc-500">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-zinc-800 dark:text-zinc-200">{item.name}</div>
                                <div className="text-[10px] text-zinc-500">{item.email}</div>
                            </div>
                        </div>
                        <div className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${color === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                            {item.daysSinceLastLogin.toString() === 'Never' ? 'Never' : `${item.daysSinceLastLogin}D Inactive`}
                        </div>
                    </div>
                )) : (
                    <div className="py-8 text-center text-zinc-400 text-xs italic">No current alerts in this category</div>
                )}
            </div>
        </div>
    );
}

function getDeviceIcon(platform: string) {
    if (platform === 'mobile_browser' || platform === 'app') return <Smartphone className="w-4 h-4 text-zinc-400" />;
    if (platform === 'desktop') return <Laptop className="w-4 h-4 text-zinc-400" />;
    return <Monitor className="w-4 h-4 text-zinc-400" />;
}
