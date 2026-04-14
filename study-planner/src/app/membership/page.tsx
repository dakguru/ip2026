"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    Loader2, ArrowLeft, Crown, Calendar, 
    CalendarClock, CreditCard, ShieldCheck, 
    Clock, Smartphone, ChevronRight, Zap
} from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { getDisplayMembership } from "@/lib/membership-utils";
import { useCourse } from "@/contexts/CourseContext";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import { motion } from "framer-motion";

export default function MembershipPage() {
    const router = useRouter();
    const { course } = useCourse();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        fetchMembershipDetails();
    }, []);

    const fetchMembershipDetails = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setUserData(data.user);
            } else {
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

    if (!userData) return null;

    const displayMemberLevel = getDisplayMembership(userData.membershipLevel, userData.planName);
    const isFree = displayMemberLevel === 'free';
    
    // Determine the theme color based on plan
    const themeColor = displayMemberLevel === 'diamond' ? 'blue' : 
                      displayMemberLevel === 'platinum' ? 'purple' :
                      displayMemberLevel === 'gold' ? 'amber' : 'zinc';

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Not Available";
        return dayjs(dateString).format("DD MMMM YYYY");
    };

    const getDaysRemaining = (validityDate?: string) => {
        if (!validityDate) return 0;
        const now = dayjs();
        const expiry = dayjs(validityDate);
        const diff = expiry.diff(now, 'day');
        return diff > 0 ? diff : 0;
    };

    const daysRemaining = getDaysRemaining(userData.membershipValidity);

    return (
        <AppScreenWrapper
            className="bg-zinc-50 dark:bg-zinc-950"
            header={
                <div className="flex items-center gap-4 w-full">
                    <Link href="/" className="p-1 -ml-1 rounded-full text-zinc-900 dark:text-zinc-100 active:bg-zinc-200 dark:active:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Membership</h1>
                </div>
            }
        >
            <div className="flex-1 flex flex-col p-5 pb-24 gap-6">
                
                {/* Membership Card - Premium Look */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl ${
                        themeColor === 'blue' ? 'bg-zinc-900' :
                        themeColor === 'purple' ? 'bg-zinc-900' :
                        themeColor === 'amber' ? 'bg-zinc-900' : 'bg-zinc-900'
                    }`}
                >
                    {/* Background Accents (Subtle) */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex justify-between items-start mb-10">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Current Membership</p>
                            <h2 className="text-2xl font-black uppercase tracking-[0.05em]">
                                {userData.planName || `${displayMemberLevel} Plan`}
                            </h2>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20`}>
                            <Crown className={`w-6 h-6 ${
                                themeColor === 'blue' ? 'text-blue-400' :
                                themeColor === 'purple' ? 'text-purple-400' :
                                themeColor === 'amber' ? 'text-amber-400' : 'text-zinc-400'
                            }`} fill="currentColor" />
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3 mb-8">
                        <div className="p-1.5 rounded-lg bg-green-500/20 text-green-400">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <p className="text-sm font-bold opacity-90">
                            {isFree ? 'Limited Access' : `Valid until: ${dayjs(userData.membershipValidity).format("MMM YYYY")}`}
                        </p>
                    </div>

                    <Link 
                        href="/pricing"
                        className="relative z-10 block w-full py-4 bg-white text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-lg active:scale-[0.98] transition-all"
                    >
                        {isFree ? 'Explore Plans' : 'Upgrade Plan'}
                    </Link>
                </motion.div>

                {/* Status Section - Requested Details */}
                {!isFree && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400 px-1">Validity Details</h3>
                        
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-50 dark:divide-zinc-800">
                            
                            {/* Date of Purchase */}
                            <DetailRow 
                                icon={Calendar}
                                label="Date of Purchase"
                                value={formatDate(userData.purchaseDate)}
                                color="text-green-600 dark:text-green-400"
                                bg="bg-green-50 dark:bg-green-900/20"
                            />

                            {/* Date of Expiry */}
                            <DetailRow 
                                icon={CalendarClock}
                                label="Date of Expiry"
                                value={formatDate(userData.membershipValidity)}
                                color="text-rose-600 dark:text-rose-400"
                                bg="bg-rose-50 dark:bg-rose-900/20"
                            />

                            {/* Days Left */}
                            <DetailRow 
                                icon={Clock}
                                label="Days Left"
                                value={`${daysRemaining} Days`}
                                color="text-blue-600 dark:text-blue-400"
                                bg="bg-blue-50 dark:bg-blue-900/20"
                                highlight={daysRemaining < 30 ? "Urgent" : undefined}
                            />

                        </div>
                    </motion.div>
                )}

                {/* Additional Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-zinc-900 p-5 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800"
                    >
                        <Smartphone className="w-5 h-5 text-zinc-400 mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Access On</p>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">All Platforms</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-zinc-900 p-5 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800"
                    >
                        <Zap className="w-5 h-5 text-amber-500 mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Status</p>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 text-green-500">Active</p>
                    </motion.div>
                </div>

                {/* Support/Footer Section */}
                <div className="mt-auto py-8 text-center px-4">
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                        Need assistance with your membership?<br />
                        <Link href="/help" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Contact Support</Link>
                    </p>
                </div>

            </div>
        </AppScreenWrapper>
    );
}

function DetailRow({ 
    icon: Icon, 
    label, 
    value, 
    color, 
    bg,
    highlight 
}: { 
    icon: any, 
    label: string, 
    value: string, 
    color: string, 
    bg: string,
    highlight?: string
}) {
    return (
        <div className="flex items-center gap-4 p-5">
            <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${bg} ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {value}
                    </p>
                    {highlight && (
                        <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[8px] font-black uppercase tracking-tighter">
                            {highlight}
                        </span>
                    )}
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-200 dark:text-zinc-800" />
        </div>
    );
}
