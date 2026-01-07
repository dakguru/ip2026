"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Shield, Users, ArrowLeft, Loader2, Search, Download, FileText,
    Crown, Star, Zap, Filter, MoreHorizontal, ChevronDown, Check,
    CreditCard, Calendar
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
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
    membershipLevel?: 'free' | 'silver' | 'gold';
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
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [onlineCount, setOnlineCount] = useState(0);

    // Filters
    const [filterStatus, setFilterStatus] = useState<'all' | 'gold' | 'silver' | 'free'>('all');

    // Edit State
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [viewingPaymentUser, setViewingPaymentUser] = useState<UserData | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchUsers();
        fetchOnlineCount();
    }, []);

    const fetchOnlineCount = async () => {
        try {
            const res = await fetch('/api/admin/stats/online');
            if (res.ok) {
                const data = await res.json();
                setOnlineCount(data.count);
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
                        membershipValidity: editingUser.membershipValidity
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
            gold: users.filter(u => u.membershipLevel === 'gold').length,
            silver: users.filter(u => u.membershipLevel === 'silver').length,
            free: users.filter(u => !u.membershipLevel || u.membershipLevel === 'free').length,
        };
    }, [users]);

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());

        const userLevel = u.membershipLevel || 'free';
        const matchesStatus = filterStatus === 'all' ? true : userLevel === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const downloadCSV = () => {
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

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `users_export_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        link.click();
    };

    const downloadPDF = () => {
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

        doc.save(`users_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
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
                <Link href="/planner" className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium">
                    Return to Planner
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 transition-colors font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/planner" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Planner
                        </Link>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-blue-600" />
                            Admin Dashboard
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage users, track growth, and oversee system settings.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                            <FileText className="w-4 h-4 text-green-600" />
                            CSV
                        </button>
                        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                            <Download className="w-4 h-4 text-red-600" />
                            PDF
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full -mr-8 -mt-8"></div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg animate-pulse">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            </div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Online</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">{onlineCount}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Active Now</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">{stats.total}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Registered Users</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 p-5 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/30 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-lg">
                                <Crown className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-yellow-600/60 dark:text-yellow-400/60 uppercase tracking-wider">Gold</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-extrabold text-yellow-700 dark:text-yellow-400">{stats.gold}</span>
                            <span className="text-xs text-yellow-600/70 dark:text-yellow-400/70 mt-1">Premium Members</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-slate-900/10 dark:to-zinc-900/10 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                                <Star className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Silver</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-extrabold text-slate-700 dark:text-slate-300">{stats.silver}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Standard Members</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Free</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-extrabold text-zinc-700 dark:text-zinc-300">{stats.free}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Basic Users</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col">

                    {/* Toolbar */}
                    <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col lg:flex-row items-center justify-between gap-4">

                        {/* Filter Tabs */}
                        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl w-full lg:w-auto overflow-x-auto no-scrollbar">
                            {(['all', 'gold', 'silver', 'free'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilterStatus(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap
                                        ${filterStatus === tab
                                            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                                        }`}
                                >
                                    {tab} Users
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full lg:w-80">
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

                    {/* Users Table */}
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">User Details</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Plan Status</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Role</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Joined On</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Last Active</th>
                                    <th className="py-4 px-6 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm
                                                        ${user.membershipLevel === 'gold' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                                                            user.membershipLevel === 'silver' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800' :
                                                                'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                                                        }`}>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</p>
                                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm
                                                        ${user.membershipLevel === 'gold'
                                                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
                                                            : user.membershipLevel === 'silver'
                                                                ? 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800/50'
                                                                : 'bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-900/20 dark:text-zinc-500 dark:border-zinc-800/50'
                                                        }`}>
                                                        {user.membershipLevel === 'gold' && <Crown className="w-3 h-3 fill-current" />}
                                                        {user.membershipLevel === 'silver' && <Star className="w-3 h-3 fill-current" />}
                                                        {user.membershipLevel || 'Free'}
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
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${viewingPaymentUser.membershipLevel === 'gold' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                                        }`}>
                                        {viewingPaymentUser.membershipLevel}
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
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Membership Status</label>
                                <select
                                    value={editingUser.membershipLevel || 'free'}
                                    onChange={(e) => setEditingUser({ ...editingUser, membershipLevel: e.target.value as 'free' | 'silver' | 'gold' })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 capitalize"
                                >
                                    <option value="free">Free Member</option>
                                    <option value="silver">Silver Member</option>
                                    <option value="gold">Gold Member</option>
                                </select>
                            </div>

                            {["gold", "silver"].includes(editingUser.membershipLevel || "") && (
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
