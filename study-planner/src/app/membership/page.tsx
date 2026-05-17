"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    Loader2, ArrowLeft, Crown, Calendar, 
    CalendarClock, CreditCard, ShieldCheck, 
    Clock, Smartphone, ChevronRight, Zap, Sparkles, Star, Award
} from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { getDisplayMembership } from "@/lib/membership-utils";
import { useCourse } from "@/contexts/CourseContext";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import HomeHeader from "@/components/HomeHeader";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { motion } from "framer-motion";
import PremiumLoader from "@/components/PremiumLoader";

export default function MembershipPage() {
    const router = useRouter();
    const { course } = useCourse();
    const isMobileApp = useIsMobileApp();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile browser (not just native app)
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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
            <PremiumLoader message="Loading membership..." />
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

    // Use mobile layout for native app OR mobile browser
    const useMobileLayout = isMobileApp || isMobile;

    if (useMobileLayout) {
        return <MobileLayout 
            userData={userData}
            displayMemberLevel={displayMemberLevel}
            isFree={isFree}
            themeColor={themeColor}
            formatDate={formatDate}
            daysRemaining={daysRemaining}
        />;
    }

    return <DesktopLayout 
        userData={userData}
        displayMemberLevel={displayMemberLevel}
        isFree={isFree}
        themeColor={themeColor}
        formatDate={formatDate}
        daysRemaining={daysRemaining}
    />;
}

// ─── MOBILE LAYOUT (Android App + Mobile Browser) ───────────────────────────
function MobileLayout({ userData, displayMemberLevel, isFree, themeColor, formatDate, daysRemaining }: LayoutProps) {
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
                    className={`relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl bg-zinc-900`}
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
                        <a href="https://wa.me/919363030396" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Contact Support</a>
                    </p>
                </div>

            </div>
        </AppScreenWrapper>
    );
}

// ─── DESKTOP LAYOUT ─────────────────────────────────────────────────────────
function DesktopLayout({ userData, displayMemberLevel, isFree, themeColor, formatDate, daysRemaining }: LayoutProps) {
    // Get membership badge gradient
    const getBadgeGradient = () => {
        switch (displayMemberLevel) {
            case 'diamond': return 'from-sky-400 via-blue-500 to-indigo-600';
            case 'platinum': return 'from-violet-400 via-purple-500 to-fuchsia-600';
            case 'gold': return 'from-amber-400 via-yellow-500 to-orange-500';
            case 'silver': return 'from-slate-300 via-zinc-400 to-slate-500';
            default: return 'from-zinc-400 via-zinc-500 to-zinc-600';
        }
    };

    const getAccentColor = () => {
        switch (displayMemberLevel) {
            case 'diamond': return { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/50', border: 'border-blue-200 dark:border-blue-800', ring: 'ring-blue-500/20' };
            case 'platinum': return { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/50', border: 'border-purple-200 dark:border-purple-800', ring: 'ring-purple-500/20' };
            case 'gold': return { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50', border: 'border-amber-200 dark:border-amber-800', ring: 'ring-amber-500/20' };
            default: return { text: 'text-zinc-600 dark:text-zinc-400', bg: 'bg-zinc-50 dark:bg-zinc-900', border: 'border-zinc-200 dark:border-zinc-800', ring: 'ring-zinc-500/20' };
        }
    };

    const accent = getAccentColor();

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <HomeHeader isLoggedIn={true} membershipLevel={displayMemberLevel as any} />
            
            <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">

                {/* Page Title */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-1">
                        <Link href="/" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                        <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Membership</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        Membership Details
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ─── LEFT COLUMN: Membership Card ─── */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="lg:col-span-1"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-8 text-white shadow-2xl shadow-zinc-900/30 h-full flex flex-col">
                            {/* Decorative glows */}
                            <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${getBadgeGradient()} pointer-events-none`} />
                            <div className={`absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${getBadgeGradient()} pointer-events-none`} />
                            {/* Subtle grid pattern */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                            <div className="relative z-10 flex-1 flex flex-col">
                                {/* Badge */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r ${getBadgeGradient()} text-white shadow-lg`}>
                                        <Crown className="w-3 h-3" fill="currentColor" />
                                        {displayMemberLevel}
                                    </span>
                                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                        <Award className={`w-5 h-5 ${
                                            themeColor === 'blue' ? 'text-blue-400' :
                                            themeColor === 'purple' ? 'text-purple-400' :
                                            themeColor === 'amber' ? 'text-amber-400' : 'text-zinc-400'
                                        }`} />
                                    </div>
                                </div>

                                {/* Plan Name */}
                                <h2 className="text-xl font-black uppercase tracking-wide mb-2">
                                    {userData.planName || `${displayMemberLevel} Plan`}
                                </h2>
                                
                                {/* Validity */}
                                <div className="flex items-center gap-2.5 mt-1 mb-auto">
                                    <div className="p-1 rounded-md bg-green-500/20">
                                        <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-white/70">
                                        {isFree ? 'Limited Access' : `Valid until ${dayjs(userData.membershipValidity).format("MMM YYYY")}`}
                                    </p>
                                </div>

                                {/* Upgrade Button */}
                                <Link 
                                    href="/pricing"
                                    className="mt-8 block w-full py-3.5 bg-white text-zinc-900 rounded-xl font-bold text-sm text-center shadow-lg hover:shadow-xl hover:bg-zinc-100 transition-all duration-200 group"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                                        {isFree ? 'Explore Plans' : 'Upgrade Plan'}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── RIGHT COLUMN: Details ─── */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Validity Details */}
                        {!isFree && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Validity Details
                                </h3>
                                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100 dark:divide-zinc-800">
                                        
                                        {/* Date of Purchase */}
                                        <div className="p-6 group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                                                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Purchased</span>
                                            </div>
                                            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                                {formatDate(userData.purchaseDate)}
                                            </p>
                                        </div>

                                        {/* Date of Expiry */}
                                        <div className="p-6 group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
                                                    <CalendarClock className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Expires</span>
                                            </div>
                                            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                                {formatDate(userData.membershipValidity)}
                                            </p>
                                        </div>

                                        {/* Days Left */}
                                        <div className="p-6 group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Remaining</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                                    {daysRemaining} Days
                                                </p>
                                                {daysRemaining < 30 && (
                                                    <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase">
                                                        Expiring Soon
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Quick Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Subscription Info
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                        <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Access On</p>
                                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">All Platforms</p>
                                    <p className="text-xs text-zinc-400 mt-1">Web, Android & iOS</p>
                                </div>
                                
                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Status</p>
                                    <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">Active</p>
                                    <p className="text-xs text-zinc-400 mt-1">Subscription is active</p>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                                        <Star className={`w-5 h-5 ${accent.text}`} fill="currentColor" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Tier</p>
                                    <p className={`text-base font-bold capitalize ${accent.text}`}>
                                        {displayMemberLevel}
                                    </p>
                                    <p className="text-xs text-zinc-400 mt-1">Current membership tier</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Support Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">Need Help?</h3>
                                    <p className="text-xs text-zinc-400">
                                        Have questions about your membership? We&apos;re here to help.
                                    </p>
                                </div>
                                <a 
                                    href="https://wa.me/919363030396"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
                                >
                                    Contact Support
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── SHARED TYPES ────────────────────────────────────────────────────────────
interface LayoutProps {
    userData: any;
    displayMemberLevel: string;
    isFree: boolean;
    themeColor: string;
    formatDate: (dateString?: string) => string;
    daysRemaining: number;
}

// ─── DETAIL ROW (Mobile only) ────────────────────────────────────────────────
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
