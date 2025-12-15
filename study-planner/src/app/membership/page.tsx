"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Crown, Calendar, CalendarClock, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

export default function MembershipPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [membershipData, setMembershipData] = useState<any>(null);

    useEffect(() => {
        fetchMembershipDetails();
    }, []);

    const fetchMembershipDetails = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setMembershipData(data.user);
            } else {
                // Handle auth error
                router.push("/login?redirect=/membership");
            }
        } catch (error) {
            console.error(error);
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

    if (!membershipData) return null;

    const isFree = !membershipData.membershipLevel || membershipData.membershipLevel === 'free';
    const isGold = membershipData.membershipLevel === 'gold';
    const isSilver = membershipData.membershipLevel === 'silver';

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return dayjs(dateString).format("DD MMM YYYY");
    };

    const getDaysRemaining = (validityDate?: string) => {
        if (!validityDate) return 0;
        const now = dayjs();
        const expiry = dayjs(validityDate);
        return expiry.diff(now, 'day');
    };

    const daysRemaining = getDaysRemaining(membershipData.membershipValidity);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 relative">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/planner"
                    className="inline-flex items-center text-sm text-zinc-500 hover:text-blue-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative">

                    {/* Header Banner */}
                    <div className={`p-8 ${isGold
                        ? 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40'
                        : isSilver
                            ? 'bg-gradient-to-r from-slate-100 to-zinc-200 dark:from-slate-800/40 dark:to-zinc-800/40'
                            : 'bg-zinc-100 dark:bg-zinc-800'
                        }`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${isGold ? 'bg-yellow-400 text-yellow-900' :
                                    isSilver ? 'bg-slate-300 text-slate-800' : 'bg-zinc-300 text-zinc-600'
                                }`}>
                                <Crown className="w-8 h-8" fill="currentColor" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                                    {isFree ? 'Basic Member' : `${membershipData.membershipLevel} Member`}
                                </h1>
                                <p className={`text-sm font-medium ${isGold ? 'text-yellow-700 dark:text-yellow-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                    {isFree ? 'Upgrade to unlock premium features' : 'Thank you for being a premium member!'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {isFree ? (
                            <div className="text-center py-8">
                                <p className="text-zinc-500 mb-6">You are currently on a free plan. Upgrade to access premium content.</p>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105"
                                >
                                    <Crown className="w-5 h-5 fill-current" />
                                    Explore Plans
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Plan Details */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 border-b pb-2 dark:border-zinc-800">Plan Details</h3>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 mt-1">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Plan Name</p>
                                            <p className="text-zinc-900 dark:text-zinc-100 font-medium text-lg">{membershipData.planName || 'Custom Plan'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 rounded-lg text-purple-600 dark:text-purple-400 mt-1">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Ordered via</p>
                                            <p className="text-zinc-900 dark:text-zinc-100 font-mono text-sm">{membershipData.planId || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Validity Details */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 border-b pb-2 dark:border-zinc-800">Validity Period</h3>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-50 dark:bg-green-900/20 p-2.5 rounded-lg text-green-600 dark:text-green-400 mt-1">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Purchase Date</p>
                                            <p className="text-zinc-900 dark:text-zinc-100 font-medium">{formatDate(membershipData.purchaseDate)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className={`p-2.5 rounded-lg mt-1 ${daysRemaining < 7 ? 'bg-red-50 text-red-600' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'}`}>
                                            <CalendarClock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Expires On</p>
                                            <p className="text-zinc-900 dark:text-zinc-100 font-medium">{formatDate(membershipData.membershipValidity)}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold mt-1 inline-block ${daysRemaining < 0 ? 'bg-red-100 text-red-700' :
                                                    daysRemaining < 7 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {daysRemaining < 0 ? 'Expired' : `${daysRemaining} days remaining`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User ID/Email Footer */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 border-t border-zinc-100 dark:border-zinc-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400">
                        <p>Registered Email: {membershipData.email}</p>
                        <p>User ID: {membershipData.id}</p>
                    </div>
                </div>

                {!isFinalTier(membershipData.membershipLevel) && (
                    <div className="mt-8 text-center">
                        <p className="text-zinc-500 mb-2">Want to upgrade your experience?</p>
                        <Link href="/pricing" className="text-blue-600 font-semibold hover:underline">View Upgrade Options</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function isFinalTier(level?: string) {
    // For now, let's say Gold is final, but we can change logic if lifetime exists
    return false; // Always show upgrade option unless we decide otherwise
}
