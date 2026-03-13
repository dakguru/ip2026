"use client";

import { useEffect, useState, useMemo } from "react";
import { getMembershipTier } from "@/lib/membership-utils";
import { useCourse } from "@/contexts/CourseContext";
import { useRouter } from "next/navigation";
import {
    Shield, Users, ArrowLeft, Loader2, Search, Download, FileText,
    Crown, Star, Zap, Filter, MoreHorizontal, ChevronDown, ChevronUp, Check,
    CreditCard, Calendar, Bell, Clock, ArrowUpDown, Monitor, Smartphone,
    Activity, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Toast } from "@capacitor/toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    membershipLevel?: 'free' | 'silver' | 'gold' | 'diamond' | 'platinum';
    createdAt: string;
    mobile?: string;
    examPreparingFor?: string;
    dateOfJoining?: string; // or Date, but string is easier for UI display
    gender?: string;
    planId?: string;
    planName?: string;
    purchaseDate?: string;
    membershipValidity?: string;
    lastActiveAt?: string;
    lastPlatform?: 'desktop' | 'mobile_browser' | 'app';
    courseMode?: 'LDCE_IP' | 'PS_GR_B';
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [onlineCount, setOnlineCount] = useState(0);
    const [onlineUsersList, setOnlineUsersList] = useState<UserData[]>([]);
    const [showOnlineUsersModal, setShowOnlineUsersModal] = useState(false);
    const [couponStats, setCouponStats] = useState({ total: 0, claimed: 0, redeemed: 0, available: 0 });

    // Filters
    const [filterStatus, setFilterStatus] = useState<'all' | 'gold' | 'silver' | 'free' | 'diamond' | 'platinum' | 'ps_gr_b' | 'ldce_ip'>('all');

    // Sorting
    type SortColumn = 'name' | 'plan' | 'role' | 'joined' | 'lastActive';
    const [sortColumn, setSortColumn] = useState<SortColumn | null>('lastActive');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (col: SortColumn) => {
        if (sortColumn === col) {
            setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(col);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ col }: { col: SortColumn }) => {
        if (sortColumn !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40" />;
        return sortDirection === 'asc'
            ? <ChevronUp className="w-3 h-3 ml-1 text-blue-500" />
            : <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />;
    };

    // Edit State
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [viewingPaymentUser, setViewingPaymentUser] = useState<UserData | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchUsers();
        fetchOnlineCount();
        fetchCouponStats();

        // Auto refresh online list every 60 seconds as requested
        const interval = setInterval(() => {
            fetchOnlineCount();
        }, 60000);

        return () => clearInterval(interval);
    }, []);



    const fetchCouponStats = async () => {
        try {
            const res = await fetch('/api/admin/stats/coupons');
            if (res.ok) {
                const data = await res.json();
                setCouponStats(data.stats);
            }
        } catch (e) {
            console.error("Failed to fetch coupon stats", e);
        }
    };

    const fetchOnlineCount = async () => {
        try {
            const res = await fetch('/api/admin/stats/online');
            if (res.ok) {
                const data = await res.json();
                setOnlineCount(data.count);
                setOnlineUsersList(data.users || []); // Store full list
            }
        } catch (e) {
            console.error("Failed to fetch online count", e);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.status === 403) {
                setError("Access Denied: You need admin privileges.");
                setIsLoading(false);
                return;
            }
            if (!res.ok) throw new Error("Failed to fetch users");

            const data = await res.json();
            setUsers(data.users);
        } catch (err) {
            setError("Something went wrong loading the dashboard.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/users/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetEmail: editingUser.email,
                    updates: {
                        name: editingUser.name,
                        role: editingUser.role,
                        membershipLevel: editingUser.membershipLevel,
                        membershipValidity: editingUser.membershipValidity,
                        courseMode: editingUser.courseMode
                    }
                })
            });

            if (!res.ok) throw new Error("Failed to update user");

            // Refresh list
            await fetchUsers();
            setEditingUser(null);
        } catch (error) {
            alert("Failed to update user");
        } finally {
            setIsSaving(false);
        }
    };

    const stats = useMemo(() => {
        return {
            total: users.length,
            gold: users.filter(u => getMembershipTier(u.membershipLevel, u.courseMode, u.planName) === 'gold').length,
            diamond: users.filter(u => getMembershipTier(u.membershipLevel, u.courseMode, u.planName) === 'diamond').length,
            platinum: users.filter(u => getMembershipTier(u.membershipLevel, u.courseMode, u.planName) === 'platinum').length,
            silver: users.filter(u => getMembershipTier(u.membershipLevel, u.courseMode, u.planName) === 'silver').length,
            free: users.filter(u => getMembershipTier(u.membershipLevel, u.courseMode, u.planName) === 'free').length,
            psGroupB: users.filter(u => u.courseMode === 'PS_GR_B').length,
            ldceIP: users.filter(u => u.courseMode === 'LDCE_IP').length,
        };

    }, [users]);

    // New Data Segments for Insights Panels
    const newUsersLast7Days = useMemo(() => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return users.filter(u => new Date(u.createdAt) >= sevenDaysAgo)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [users]);

    const goldMembers = useMemo(() => {
        return users.filter(u => getMembershipTier(u.membershipLevel, u.courseMode, u.planName) === 'gold')

            .sort((a, b) => {
                const aTime = a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0;
                const bTime = b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0;
                return bTime - aTime;
            });
    }, [users]);

    const diamondMembers = useMemo(() => {
        return users.filter(u => getMembershipTier(u.membershipLevel, u.courseMode, u.planName) === 'diamond')

            .sort((a, b) => {
                const aTime = a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0;
                const bTime = b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0;
                return bTime - aTime;
            });
    }, [users]);

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());

        const userLevel = u.membershipLevel || 'free';
        let matchesStatus = filterStatus === 'all' ? true : userLevel === filterStatus;

        // Custom filter logic for PS_GR_B and LDCE_IP which are on a different field
        if (filterStatus === 'ps_gr_b') {
            matchesStatus = u.courseMode === 'PS_GR_B';
        } else if (filterStatus === 'ldce_ip') {
            // Default to LDCE_IP if not set, as it's the primary/original course
            matchesStatus = u.courseMode === 'LDCE_IP' || !u.courseMode;
        }

        return matchesSearch && matchesStatus;
    });

    const planOrder: Record<string, number> = { diamond: 5, platinum: 4, gold: 3, silver: 2, free: 1 };

    const sortedUsers = useMemo(() => {
        if (!sortColumn) return filteredUsers;
        return [...filteredUsers].sort((a, b) => {
            let aVal: number | string = 0;
            let bVal: number | string = 0;
            switch (sortColumn) {
                case 'name':
                    aVal = a.name.toLowerCase();
                    bVal = b.name.toLowerCase();
                    break;
                case 'plan':
                    aVal = planOrder[a.membershipLevel || 'free'] ?? 1;
                    bVal = planOrder[b.membershipLevel || 'free'] ?? 1;
                    break;
                case 'role':
                    aVal = a.role;
                    bVal = b.role;
                    break;
                case 'joined':
                    aVal = new Date(a.createdAt).getTime();
                    bVal = new Date(b.createdAt).getTime();
                    break;
                case 'lastActive':
                    aVal = a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0;
                    bVal = b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0;
                    break;
            }
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredUsers, sortColumn, sortDirection]);

    const downloadCSV = async () => {
        const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Joined', 'Last Active', 'Mobile', 'Exam', 'Joining Date', 'Plan', 'Amount'];
        const csvContent = [
            headers.join(','),
            ...users.map(u => [
                u.id,
                `"${u.name}"`,
                u.email,
                u.role,
                u.membershipLevel || 'free',
                format(new Date(u.createdAt), 'yyyy-MM-dd'),
                u.lastActiveAt ? format(new Date(u.lastActiveAt), 'yyyy-MM-dd HH:mm') : 'Never',
                u.mobile || '',
                u.examPreparingFor || '',
                u.dateOfJoining ? format(new Date(u.dateOfJoining), 'yyyy-MM-dd') : '',
                u.planName || '',
                u.planName?.includes('Yearly Gold') ? '649' : u.planName?.includes('Monthly Gold') ? '599' : u.planName?.includes('18 Months') ? '799' : '0'
            ].join(','))
        ].join('\n');

        const filename = `users_export_${format(new Date(), 'yyyy-MM-dd')}.csv`;

        if (!Capacitor.isNativePlatform()) {
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            return;
        }

        // Native CSV save
        try {
            await Filesystem.writeFile({
                path: filename,
                data: btoa(csvContent), // Need to encode as base64 for writeFile
                directory: Directory.Documents,
                recursive: true
            });
            await Toast.show({ text: 'CSV saved to Documents', duration: 'long' });
        } catch (err) {
            console.error(err);
            await Toast.show({ text: 'Failed to save CSV', duration: 'long' });
        }
    };

    const downloadPDF = async () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("User Report", 14, 22);
        doc.setFontSize(11);
        doc.text(`Generated on ${format(new Date(), 'PPP')}`, 14, 30);

        const tableBody = users.map(u => [
            u.name,
            u.email,
            u.role,
            u.membershipLevel || 'free',
            format(new Date(u.createdAt), 'MMM d, yyyy'),
            u.lastActiveAt ? format(new Date(u.lastActiveAt), 'MMM d, HH:mm') : '-',
            u.mobile || '-',
            u.planName?.includes('Yearly Gold') ? '649' : u.planName?.includes('Monthly Gold') ? '599' : u.planName?.includes('18 Months') ? '799' : '-'
        ]);

        autoTable(doc, {
            startY: 40,
            head: [['Name', 'Email', 'Role', 'Status', 'Joined', 'Last Active', 'Mobile', 'Paid']],
            body: tableBody,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [63, 63, 70] }
        });

        const filename = `users_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`;

        if (!Capacitor.isNativePlatform()) {
            doc.save(filename);
            return;
        }

        // Native PDF save
        try {
            const pdfBase64 = doc.output('datauristring').split(',')[1];
            await Filesystem.writeFile({
                path: filename,
                data: pdfBase64,
                directory: Directory.Documents,
                recursive: true
            });
            await Toast.show({ text: 'PDF saved to Documents', duration: 'long' });
        } catch (err) {
            console.error(err);
            await Toast.show({ text: 'Failed to save PDF', duration: 'long' });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
                <Shield className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Access Restricted</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">{error}</p>
                <Link href="/" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8 transition-colors font-sans overflow-x-hidden">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

                    {/* --- LEFT PANEL: ACTIVITY INSIGHTS --- */}
                    <div className="hidden lg:flex flex-col gap-6 lg:col-span-2 h-fit sticky top-8">
                        {/* Panel 1: Online Active Members */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[45vh]">
                            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between shrink-0">
                                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-widest">
                                    <Activity className="w-4 h-4 text-green-500" />
                                    Online Members ({onlineCount})
                                </h3>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <div className="p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                                {onlineUsersList.length > 0 ? (
                                    onlineUsersList.map((u, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group">
                                            <div className="relative shrink-0">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-400">
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-500 transition-colors">{u.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-tighter
                                                        ${getMembershipTier(u.membershipLevel, u.courseMode) === 'diamond' ? 'bg-fuchsia-500/10 text-fuchsia-500 border border-fuchsia-500/20' :
                                                            getMembershipTier(u.membershipLevel, u.courseMode) === 'gold' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                                                getMembershipTier(u.membershipLevel, u.courseMode) === 'platinum' ? 'bg-violet-500/10 text-violet-500 border border-violet-500/20' :
                                                                    getMembershipTier(u.membershipLevel, u.courseMode) === 'silver' ? 'bg-zinc-400/10 text-zinc-400 border border-zinc-400/20' :
                                                                        'bg-zinc-500/10 text-zinc-500/80 border border-zinc-500/10'}`}>
                                                        {getMembershipTier(u.membershipLevel, u.courseMode).charAt(0).toUpperCase() + getMembershipTier(u.membershipLevel, u.courseMode).slice(1)}
                                                    </span>

                                                    <span className="text-[10px] text-zinc-400 tabular-nums">
                                                        {u.lastActiveAt ? format(new Date(u.lastActiveAt), 'HH:mm') : 'Active'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-xs text-zinc-500 py-8">No active members</p>
                                )}
                            </div>
                        </div>

                        {/* Panel 2: New Users (Last 7 Days) */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[45vh]">
                            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between shrink-0">
                                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-widest">
                                    <TrendingUp className="w-4 h-4 text-blue-500" />
                                    New Users (7D)
                                </h3>
                                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">{newUsersLast7Days.length}</span>
                            </div>
                            <div className="p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                                {newUsersLast7Days.length > 0 ? (
                                    newUsersLast7Days.map((u, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 shrink-0">
                                                {u.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{u.name}</p>
                                                    {new Date().getTime() - new Date(u.createdAt).getTime() < 86400000 && (
                                                        <span className="text-[8px] bg-cyan-500 text-white px-1 py-0.5 rounded font-black animate-pulse uppercase">New</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <p className="text-[10px] text-zinc-400 truncate max-w-[80px]">{u.email}</p>
                                                    <p className="text-[10px] font-bold text-zinc-500 tabular-nums">{format(new Date(u.createdAt), 'MMM d')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-xs text-zinc-500 py-8">No recent registrations</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- CENTER SECTION: EXISTING DASHBOARD --- */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                            <div>
                                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors text-sm">
                                    <ArrowLeft className="w-4 h-4" /> Back to Home
                                </Link>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                                    Admin Dashboard
                                </h1>
                                <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Manage users, track growth, and oversee system settings.</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={downloadCSV} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                                    <FileText className="w-4 h-4 text-green-600" /> CSV
                                </button>
                                <button onClick={downloadPDF} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                                    <Download className="w-4 h-4 text-red-600" /> PDF
                                </button>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">

                            <div
                                onClick={() => setShowOnlineUsersModal(true)}
                                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all relative overflow-hidden cursor-pointer active:scale-95"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full -mr-8 -mt-8"></div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg animate-pulse">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Online</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{onlineCount}</span>
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Active Now</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{stats.total}</span>
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Registered</span>
                                </div>
                            </div>

                            {/* Diamond */}
                            <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/10 dark:to-pink-900/10 p-4 rounded-2xl shadow-sm border border-fuchsia-100 dark:border-fuchsia-900/30 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400 rounded-lg">
                                        <Crown className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-fuchsia-600/60 dark:text-fuchsia-400/60 uppercase tracking-wider">Diamond</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-fuchsia-700 dark:text-fuchsia-400">{stats.diamond}</span>
                                    <span className="text-[10px] text-fuchsia-600/70 dark:text-fuchsia-400/70 mt-0.5">Diamond</span>
                                </div>
                            </div>

                            {/* Platinum */}
                            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 p-4 rounded-2xl shadow-sm border border-violet-100 dark:border-violet-800/30 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-lg">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-wider">Platinum</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-violet-700 dark:text-violet-300">{stats.platinum}</span>
                                    <span className="text-[10px] text-violet-500 dark:text-violet-400 mt-0.5">Platinum</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 p-4 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/30 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-lg">
                                        <Crown className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-yellow-600/60 dark:text-yellow-400/60 uppercase tracking-wider">Gold</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-yellow-700 dark:text-yellow-400">{stats.gold}</span>
                                    <span className="text-[10px] text-yellow-600/70 dark:text-yellow-400/70 mt-0.5">Premium</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-slate-900/10 dark:to-zinc-900/10 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                                        <Star className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Silver</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">{stats.silver}</span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Standard</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-2xl shadow-sm border border-purple-100 dark:border-purple-800 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg">
                                        <Shield className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider">PS GR B</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">{stats.psGroupB}</span>
                                    <span className="text-[10px] text-purple-500 dark:text-purple-400 mt-0.5">PS Group B</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-800 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <Shield className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider">LDCE IP</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">{stats.ldceIP}</span>
                                    <span className="text-[10px] text-blue-500 dark:text-blue-400 mt-0.5">LDCE IP</span>
                                </div>
                            </div>
                        </div>

                        {/* Coupon Statistics */}
                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-pink-500" /> Coupon Insights
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Coupons</span>
                                        <span className="p-1 px-2 text-[10px] bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">All</span>
                                    </div>
                                    <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{couponStats.total}</span>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Claimed</span>
                                        <span className="p-1 px-2 text-[10px] bg-green-100 dark:bg-green-900/20 rounded text-green-600 dark:text-green-400">Assigned</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-extrabold text-green-600 dark:text-green-400">{couponStats.claimed}</span>
                                        <span className="text-[10px] text-zinc-400">Requested code</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Redeemed</span>
                                        <span className="p-1 px-2 text-[10px] bg-blue-100 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400">Used</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{couponStats.redeemed}</span>
                                        <span className="text-[10px] text-zinc-400">Applied in payment</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Available</span>
                                        <span className="p-1 px-2 text-[10px] bg-orange-100 dark:bg-orange-900/20 rounded text-orange-600 dark:text-orange-400">Left</span>
                                    </div>
                                    <span className="text-xl font-extrabold text-orange-600 dark:text-orange-400">{couponStats.available}</span>
                                </div>
                            </div>
                        </div>



                        {/* Main Content Area */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col">

                            {/* Toolbar */}
                            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
                                {/* Filter Tabs */}
                                <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl w-full overflow-x-auto no-scrollbar">
                                    {(['all', 'diamond', 'platinum', 'gold', 'silver', 'free', 'ps_gr_b', 'ldce_ip'] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setFilterStatus(tab)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize whitespace-nowrap flex-1
                                        ${filterStatus === tab
                                                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700'
                                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                                                }`}
                                        >
                                            {tab === 'ps_gr_b' ? 'PS Group B' : tab === 'ldce_ip' ? 'LDCE IP' : tab} Users
                                        </button>
                                    ))}
                                </div>
                                {/* Search */}
                                <div className="relative w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* ── MOBILE USER CARDS (shown on mobile, hidden on md+) ── */}
                            <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                                {sortedUsers.length > 0 ? sortedUsers.map((user) => (
                                    <div key={user.id} className="p-4 space-y-3">
                                        {/* Row 1: Avatar + Name + Edit */}
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm shrink-0
                                            ${user.membershipLevel === 'diamond' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30' :
                                                        user.membershipLevel === 'platinum' ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900/30' :
                                                            user.membershipLevel === 'gold' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                                                                user.membershipLevel === 'silver' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800' :
                                                                    'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                                                    }`}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm truncate">{user.name}</p>
                                                        {user.courseMode && (
                                                            <span className={`text-[8px] px-1 py-0.5 rounded font-bold uppercase
                                                        ${user.courseMode === 'PS_GR_B' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40'}`}>
                                                                {user.courseMode === 'PS_GR_B' ? 'PS' : 'IP'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setEditingUser(user)}
                                                className="px-3 py-1.5 text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors shrink-0"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        {/* Row 2: Badges */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border
                                        ${user.membershipLevel === 'diamond'
                                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400'
                                                    : user.membershipLevel === 'platinum'
                                                        ? 'bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/20'
                                                        : user.membershipLevel === 'gold'
                                                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400'
                                                            : user.membershipLevel === 'silver'
                                                                ? 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20'
                                                                : 'bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-900/20'
                                                }`}>
                                                {(user.membershipLevel === 'diamond' || user.membershipLevel === 'platinum' || user.membershipLevel === 'gold') && <Crown className="w-2.5 h-2.5 fill-current" />}
                                                {user.membershipLevel === 'silver' && <Star className="w-2.5 h-2.5 fill-current" />}
                                                {user.membershipLevel || 'Free'}
                                            </span>
                                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border
                                        ${user.role === 'admin'
                                                    ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
                                                    : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                            {user.membershipLevel && user.membershipLevel !== 'free' && (
                                                <button
                                                    onClick={() => setViewingPaymentUser(user)}
                                                    className="text-[10px] flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                                                >
                                                    <CreditCard className="w-3 h-3" /> Details
                                                </button>
                                            )}
                                        </div>
                                        {/* Row 3: Dates */}
                                        <div className="flex items-center gap-4 text-[10px] text-zinc-500 dark:text-zinc-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                Joined: <span className="font-medium text-zinc-700 dark:text-zinc-300">{format(new Date(user.createdAt), 'MMM d, yyyy')}</span>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {user.lastActiveAt ? (
                                                    <span className={new Date().getTime() - new Date(user.lastActiveAt).getTime() < 5 * 60 * 1000 ? 'text-green-600 dark:text-green-400 font-bold' : 'font-medium text-zinc-700 dark:text-zinc-300'}>
                                                        {format(new Date(user.lastActiveAt), 'MMM d, HH:mm')}
                                                    </span>
                                                ) : <span className="italic">Never</span>}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="py-12 text-center">
                                        <Search className="w-10 h-10 mx-auto mb-3 text-zinc-200 dark:text-zinc-800" />
                                        <p className="text-sm font-semibold text-zinc-500">No users found</p>
                                    </div>
                                )}
                            </div>

                            {/* ── DESKTOP TABLE (hidden on mobile, shown on md+) ── */}
                            <div className="hidden md:block overflow-x-auto min-h-[400px]">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                                            <th onClick={() => handleSort('name')} className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 select-none transition-colors">
                                                <span className="flex items-center">User Details <SortIcon col="name" /></span>
                                            </th>
                                            <th onClick={() => handleSort('plan')} className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 select-none transition-colors">
                                                <span className="flex items-center">Plan Status <SortIcon col="plan" /></span>
                                            </th>
                                            <th onClick={() => handleSort('role')} className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 select-none transition-colors">
                                                <span className="flex items-center">Role <SortIcon col="role" /></span>
                                            </th>
                                            <th onClick={() => handleSort('joined')} className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 select-none transition-colors">
                                                <span className="flex items-center">Joined On <SortIcon col="joined" /></span>
                                            </th>
                                            <th onClick={() => handleSort('lastActive')} className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 select-none transition-colors">
                                                <span className="flex items-center">Last Active <SortIcon col="lastActive" /></span>
                                            </th>
                                            <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        {sortedUsers.length > 0 ? (
                                            sortedUsers.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                                                >
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm shrink-0
                                                        ${(user.membershipLevel === 'diamond' || (user.membershipLevel === 'gold' && user.courseMode === 'PS_GR_B')) ? 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30' :
                                                                    (user.membershipLevel === 'platinum' || (user.membershipLevel === 'silver' && user.courseMode === 'PS_GR_B')) ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30' :
                                                                        user.membershipLevel === 'gold' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                                                                            user.membershipLevel === 'silver' ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800' :
                                                                                'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                                                                }`}>
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</p>
                                                                    {user.courseMode && (
                                                                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tight
                                                                    ${user.courseMode === 'PS_GR_B' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'}`}>
                                                                            {user.courseMode === 'PS_GR_B' ? 'PS Gr B' : 'LDCE IP'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col items-start gap-1">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm
                                                        ${getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'diamond'
                                                                    ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/20 dark:text-fuchsia-400 dark:border-fuchsia-800/50'
                                                                    : getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'platinum'
                                                                        ? 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800/50'
                                                                        : getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'gold'
                                                                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
                                                                            : getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'silver'
                                                                                ? 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800/50'
                                                                                : 'bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-900/20 dark:text-zinc-500 dark:border-zinc-800/50'
                                                                }`}>
                                                                {getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'diamond' && <Crown className="w-3 h-3 fill-current" />}
                                                                {getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'platinum' && <Zap className="w-3 h-3 fill-current" />}
                                                                {getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'gold' && <Crown className="w-3 h-3 fill-current" />}
                                                                {getMembershipTier(user.membershipLevel, user.courseMode, user.planName) === 'silver' && <Star className="w-3 h-3 fill-current" />}
                                                                {getMembershipTier(user.membershipLevel, user.courseMode, user.planName).charAt(0).toUpperCase() + getMembershipTier(user.membershipLevel, user.courseMode, user.planName).slice(1)}
                                                            </span>
                                                            {user.membershipLevel && user.membershipLevel !== 'free' && (
                                                                <button
                                                                    onClick={() => setViewingPaymentUser(user)}
                                                                    className="text-[10px] items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold ml-1 flex hover:underline"
                                                                >
                                                                    <CreditCard className="w-3 h-3" /> View Details
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border
                                                    ${user.role === 'admin'
                                                                ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
                                                                : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                                        {user.lastActiveAt ? (
                                                            <div className="flex items-center gap-2">
                                                                <span className={`inline-flex items-center gap-1.5 ${new Date().getTime() - new Date(user.lastActiveAt).getTime() < 5 * 60 * 1000
                                                                    ? 'text-green-600 dark:text-green-400 font-bold'
                                                                    : ''
                                                                    }`}>
                                                                    {new Date().getTime() - new Date(user.lastActiveAt).getTime() < 5 * 60 * 1000 && (
                                                                        <span className="relative flex h-2 w-2">
                                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                                        </span>
                                                                    )}
                                                                    {format(new Date(user.lastActiveAt), 'MMM d, HH:mm')}
                                                                </span>
                                                                <div className="shrink-0 flex items-center justify-center p-1 rounded-md text-zinc-400">
                                                                    {user.lastPlatform === 'app' ? (
                                                                        <div title="App User (Google Play)" className="flex items-center gap-0.5 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                                                                            <Smartphone className="w-3 h-3 text-blue-500" />
                                                                            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-blue-500 fill-current" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.23 2.23 0 0 1-.41-.448l.001-.001V2.262c.006-.158.05-.313.13-.448h-.001a1.9 1.9 0 0 1 .279-.448v.448l-.001-.448h.001zM15.549 13.784l2.88 1.666a2.6 2.6 0 0 1 1.08 1.254 2.1 2.1 0 0 1-.012 1.662L16.27 14.49zm-.063-3.66L18.66 4.75a2.12 2.12 0 0 1 1.006 1.34 2.5 2.5 0 0 1-.346 2.05L14.417 11zM13.792 12l.626.626-4.57 4.572L9.5 17.2h6.142l1.004-.848zm-.626-.626l-1.666-1.666L4.764 3.012l9.028 9.028v-.04z" />
                                                                            </svg>
                                                                        </div>
                                                                    ) : user.lastPlatform === 'mobile_browser' ? (
                                                                        <div title="Mobile Browser" className="bg-emerald-50 dark:bg-emerald-900/20 p-1 rounded border border-emerald-100 dark:border-emerald-800">
                                                                            <Smartphone className="w-3 h-3 text-emerald-500" />
                                                                        </div>
                                                                    ) : user.lastPlatform === 'desktop' ? (
                                                                        <div title="Desktop" className="bg-slate-50 dark:bg-slate-800 p-1 rounded border border-slate-200 dark:border-slate-700">
                                                                            <Monitor className="w-3 h-3 text-slate-400" />
                                                                        </div>
                                                                    ) : (
                                                                        <div title="Unknown / Previous Login" className="opacity-40">
                                                                            <Clock className="w-3 h-3 text-zinc-300" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-zinc-400 dark:text-zinc-600 text-xs italic">Never</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button
                                                            onClick={() => setEditingUser(user)}
                                                            className="px-3 py-1.5 text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center text-zinc-400">
                                                        <Search className="w-12 h-12 mb-3 text-zinc-200 dark:text-zinc-800" />
                                                        <p className="text-lg font-semibold text-zinc-500">No users found</p>
                                                        <p className="text-sm">Try adjusting your search or filter</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT PANEL: MEMBERSHIP OVERVIEW --- */}
                    <div className="hidden lg:flex flex-col gap-6 lg:col-span-2 h-fit sticky top-8">
                        {/* Panel 1: Gold Members */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[45vh]">
                            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10 flex items-center justify-between shrink-0">
                                <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2 uppercase tracking-widest">
                                    <Crown className="w-4 h-4 fill-amber-500" />
                                    Gold Members ({stats.gold})
                                </h3>
                            </div>
                            <div className="p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 dark:scrollbar-thumb-amber-900/40">
                                {goldMembers.length > 0 ? (
                                    goldMembers.map((u, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-2xl transition-all group border border-transparent hover:border-amber-100 dark:hover:border-amber-900/20">
                                            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 shrink-0 shadow-sm shadow-amber-500/10">
                                                {u.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">👑 {u.name}</p>
                                                </div>
                                                <p className="text-[10px] text-zinc-400 truncate mt-0.5">{u.email}</p>
                                                <div className="flex items-center justify-between mt-1 text-[9px] uppercase tracking-tighter font-bold opacity-60">
                                                    <span>Since {u.createdAt ? format(new Date(u.createdAt), 'MMM yyyy') : 'N/A'}</span>
                                                    <span className={u.lastActiveAt && new Date().getTime() - new Date(u.lastActiveAt).getTime() < 5 * 60 * 1000 ? 'text-green-500' : ''}>
                                                        {u.lastActiveAt ? format(new Date(u.lastActiveAt), 'MMM d') : '-'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-xs text-zinc-500 py-8">No gold members</p>
                                )}
                            </div>
                        </div>

                        {/* Panel 2: Diamond Members */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[45vh]">
                            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 flex items-center justify-between shrink-0">
                                <h3 className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2 uppercase tracking-widest">
                                    <Zap className="w-4 h-4 fill-blue-500" />
                                    Diamond Members ({stats.diamond})
                                </h3>
                            </div>
                            <div className="p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-900/40">
                                {diamondMembers.length > 0 ? (
                                    diamondMembers.map((u, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-2xl transition-all group border border-transparent hover:border-blue-100 dark:hover:border-blue-900/20">
                                            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 shrink-0 shadow-sm shadow-blue-500/10">
                                                {u.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">💎 {u.name}</p>
                                                </div>
                                                <p className="text-[10px] text-zinc-400 truncate mt-0.5">{u.email}</p>
                                                <div className="flex items-center justify-between mt-1 text-[9px] uppercase tracking-tighter font-bold opacity-60">
                                                    <span>Since {u.createdAt ? format(new Date(u.createdAt), 'MMM yyyy') : 'N/A'}</span>
                                                    <span className={u.lastActiveAt && new Date().getTime() - new Date(u.lastActiveAt).getTime() < 5 * 60 * 1000 ? 'text-green-500' : ''}>
                                                        {u.lastActiveAt ? format(new Date(u.lastActiveAt), 'MMM d') : '-'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-xs text-zinc-500 py-8">No diamond members</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- TABLET/MOBILE ONLY PANELS (Stacked below) --- */}
                    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-widest mb-4">
                                <Activity className="w-4 h-4 text-green-500" />
                                Online Now ({onlineCount})
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {onlineUsersList.slice(0, 8).map((u, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center text-[10px] font-bold">{u.name.charAt(0)}</div>
                                        <span className="text-xs font-medium dark:text-zinc-300">{u.name.split(' ')[0]}</span>
                                    </div>
                                ))}
                                {onlineCount > 8 && <div className="p-2 text-xs text-zinc-400">+{onlineCount - 8} more</div>}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-widest mb-4">
                                <TrendingUp className="w-4 h-4 text-blue-500" />
                                New Users ({newUsersLast7Days.length})
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {newUsersLast7Days.slice(0, 5).map((u, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-blue-500/5 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                        <span className="text-xs font-medium dark:text-blue-400">{u.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Details Dialog */}
            <Dialog open={!!viewingPaymentUser} onOpenChange={(open) => !open && setViewingPaymentUser(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Payment Details</DialogTitle>
                        <DialogDescription>
                            Payment and membership information for {viewingPaymentUser?.name}
                        </DialogDescription>
                    </DialogHeader>

                    {viewingPaymentUser && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-zinc-500 uppercase font-semibold">Current Plan</p>
                                        <p className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{viewingPaymentUser.planName || 'N/A'}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${(viewingPaymentUser.membershipLevel === 'diamond' || (viewingPaymentUser.membershipLevel === 'gold' && viewingPaymentUser.courseMode === 'PS_GR_B')) ? 'bg-fuchsia-100 text-fuchsia-800' :
                                        (viewingPaymentUser.membershipLevel === 'platinum' || (viewingPaymentUser.membershipLevel === 'silver' && viewingPaymentUser.courseMode === 'PS_GR_B')) ? 'bg-violet-100 text-violet-800' :
                                            viewingPaymentUser.membershipLevel === 'gold' ? 'bg-amber-100 text-amber-800' :
                                                'bg-slate-100 text-slate-800'
                                        }`}>
                                        {viewingPaymentUser.membershipLevel === 'gold' && viewingPaymentUser.courseMode === 'PS_GR_B' ? 'Diamond' :
                                            viewingPaymentUser.membershipLevel === 'silver' && viewingPaymentUser.courseMode === 'PS_GR_B' ? 'Platinum' :
                                                viewingPaymentUser.membershipLevel}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-zinc-500 uppercase font-semibold">Payment ID / Order</p>
                                    <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300 break-all">{viewingPaymentUser.planId || 'N/A'}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-zinc-500 uppercase font-semibold">Amount Paid</p>
                                    <p className="text-sm font-medium text-green-600">
                                        {viewingPaymentUser.planName?.includes('Yearly Gold') ? '₹649' :
                                            viewingPaymentUser.planName?.includes('Monthly Gold') ? '₹599' :
                                                viewingPaymentUser.planName?.includes('18 Months') ? '₹799' : 'Paid'}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-zinc-500 uppercase font-semibold">Purchase Date</p>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                        {viewingPaymentUser.purchaseDate
                                            ? format(new Date(viewingPaymentUser.purchaseDate), 'PP pp')
                                            : 'N/A'}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-zinc-500 uppercase font-semibold">Valid Until</p>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                        {viewingPaymentUser.membershipValidity
                                            ? format(new Date(viewingPaymentUser.membershipValidity), 'PP')
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <button onClick={() => setViewingPaymentUser(null)} className="w-full sm:w-auto px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium transition-colors">
                            Close
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Online Users Modal */}
            <Dialog open={showOnlineUsersModal} onOpenChange={setShowOnlineUsersModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Online Users Now</DialogTitle>
                        <DialogDescription>
                            Users active in the last 5 minutes ({onlineUsersList.length})
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 py-2">
                        {onlineUsersList.length > 0 ? (
                            onlineUsersList.map((u, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">
                                        {u.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{u.name}</p>
                                            <span className={`text-[8px] px-1 py-0.5 rounded-sm font-bold uppercase tracking-tight 
                                                ${(u.membershipLevel === 'diamond' || (u.membershipLevel === 'gold' && u.courseMode === 'PS_GR_B')) ? 'bg-fuchsia-500/10 text-fuchsia-500' :
                                                    u.membershipLevel === 'gold' ? 'bg-amber-500/10 text-amber-500' :
                                                        (u.membershipLevel === 'platinum' || (u.membershipLevel === 'silver' && u.courseMode === 'PS_GR_B')) ? 'bg-violet-500/10 text-violet-500' :
                                                            u.membershipLevel === 'silver' ? 'bg-zinc-400/10 text-zinc-400' :
                                                                'bg-zinc-500/10 text-zinc-500'}`}>
                                                {u.membershipLevel === 'gold' && u.courseMode === 'PS_GR_B' ? 'Diamond' :
                                                    u.membershipLevel === 'silver' && u.courseMode === 'PS_GR_B' ? 'Platinum' :
                                                        (u.membershipLevel || 'Free')}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-500">{u.email}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center justify-center p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                        {u.lastPlatform === 'app' ? (
                                            <div title="App User (Google Play)" className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-800">
                                                <Smartphone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                                <svg viewBox="0 0 24 24" className="w-3 h-3 text-blue-600 dark:text-blue-400 fill-current" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.23 2.23 0 0 1-.41-.448l.001-.001V2.262c.006-.158.05-.313.13-.448h-.001a1.9 1.9 0 0 1 .279-.448v.448l-.001-.448h.001zM15.549 13.784l2.88 1.666a2.6 2.6 0 0 1 1.08 1.254 2.1 2.1 0 0 1-.012 1.662L16.27 14.49zm-.063-3.66L18.66 4.75a2.12 2.12 0 0 1 1.006 1.34 2.5 2.5 0 0 1-.346 2.05L14.417 11zM13.792 12l.626.626-4.57 4.572L9.5 17.2h6.142l1.004-.848zm-.626-.626l-1.666-1.666L4.764 3.012l9.028 9.028v-.04z" />
                                                </svg>
                                            </div>
                                        ) : u.lastPlatform === 'mobile_browser' ? (
                                            <div title="Mobile Browser" className="bg-emerald-50 dark:bg-emerald-900/20 p-1.5 rounded-md border border-emerald-100 dark:border-emerald-800">
                                                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                        ) : u.lastPlatform === 'desktop' ? (
                                            <div title="Desktop" className="bg-slate-50 dark:bg-slate-800 p-1.5 rounded-md border border-slate-200 dark:border-slate-700">
                                                <Monitor className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                            </div>
                                        ) : (
                                            <div title="Detecting platform..." className="bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 opacity-50">
                                                <Clock className="w-4 h-4 text-zinc-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-sm text-zinc-500 py-4">No users found.</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Make changes to user profile and role here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    {editingUser && (
                        <form onSubmit={handleUpdateUser} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email (Read-only)</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    disabled
                                    className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-500 cursor-not-allowed"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Mobile</label>
                                    <input value={editingUser.mobile || ''} disabled className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-500" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Exam</label>
                                    <input value={editingUser.examPreparingFor || ''} disabled className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Date of Joining</label>
                                <input value={editingUser.dateOfJoining ? format(new Date(editingUser.dateOfJoining), 'PP') : ''} disabled className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-500" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Role</label>
                                <select
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as 'user' | 'admin' })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Course Mode</label>
                                <select
                                    value={editingUser.courseMode || 'LDCE_IP'}
                                    onChange={(e) => setEditingUser({ ...editingUser, courseMode: e.target.value as 'LDCE_IP' | 'PS_GR_B' })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="LDCE_IP">LDCE IP Exam</option>
                                    <option value="PS_GR_B">PS Group &apos;B&apos; Exam</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Membership Status</label>
                                <select
                                    value={editingUser.membershipLevel || 'free'}
                                    onChange={(e) => setEditingUser({ ...editingUser, membershipLevel: e.target.value as 'free' | 'silver' | 'gold' | 'diamond' | 'platinum' })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 capitalize"
                                >
                                    <option value="free">Free Member</option>
                                    <option value="silver">Silver Member</option>
                                    <option value="gold">Gold Member</option>
                                    <option value="diamond">Diamond Member</option>
                                    <option value="platinum">Platinum Member</option>
                                </select>
                            </div>

                            {["gold", "silver", "diamond", "platinum"].includes(editingUser.membershipLevel || "") && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Membership Validity</label>
                                    <input
                                        type="date"
                                        value={editingUser.membershipValidity ? new Date(editingUser.membershipValidity).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setEditingUser({ ...editingUser, membershipValidity: new Date(e.target.value).toISOString() })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            )}
                            <DialogFooter>
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Save Changes
                                </button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
