"use client";

import { useState, useEffect } from "react";
import { Check, X, Tag, ShieldCheck, Zap, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { DiscountRequestModal } from "@/components/DiscountRequestModal";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import NativePricing from "@/components/pricing/NativePricing";
import { useCourse } from "@/contexts/CourseContext";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PricingPage() {
    const router = useRouter();
    const [selectedPlanKey, setSelectedPlanKey] = useState<string>('full_2026');
    const [activeTab, setActiveTab] = useState<'gold' | 'silver'>('gold');
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userMobile, setUserMobile] = useState<string | null>(null);
    const [currentMembership, setCurrentMembership] = useState<'free' | 'silver' | 'gold'>('free');
    const [planId, setPlanId] = useState<string | null>(null);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

    const isMobileApp = useIsMobileApp();
    const { course } = useCourse();
    const isPsGroupB = course === 'PS_GR_B';

    // Check login status
    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                const session = JSON.parse(decoded);
                setUserEmail(session.email);
                setUserName(session.name);
                setUserMobile(session.mobile);
                setCurrentMembership(session.membershipLevel || 'free');
                setPlanId(session.planId || null);

                // Auto-select upgrade plan if applicable
                if (session.membershipLevel === 'silver') {
                    setActiveTab('gold');
                }
            } catch (e) {
                console.error("Session parse error", e);
            }
        }
    }, []);

    // LDCE IP Plans
    const goldPlans: Record<string, any> = {
        full_2026: {
            id: 'gold_2026_cracker',
            name: 'LDCE IP 2026 Gold Plan',
            validity: 'Valid for One Year',
            price: 7500,
            originalPrice: 12000,
            isPopular: true,
        }
    };

    const silverPlans: Record<string, any> = {
        full_2026: {
            id: 'silver_2026_cracker',
            name: 'LDCE IP 2026 Silver Plan',
            validity: 'Valid for One Year',
            price: 4000,
            originalPrice: 7000,
            isPopular: false,
        }
    };

    // PS Group B Plans (Beta)
    const diamondPlans: Record<string, any> = {
        full_2026: {
            id: 'diamond_ps_gr_b',
            name: 'PS Group B Diamond Plan',
            validity: 'Valid for One Year',
            price: 9850,
            originalPrice: 15000,
            isPopular: true,
        }
    };

    const platinumPlans: Record<string, any> = {
        full_2026: {
            id: 'platinum_ps_gr_b',
            name: 'PS Group B Platinum Plan',
            validity: 'Valid for One Year',
            price: 5500,
            originalPrice: 8700,
            isPopular: false,
        }
    };

    // Resolve plans based on mode
    const primaryPlans = isPsGroupB ? diamondPlans : goldPlans;
    const secondaryPlans = isPsGroupB ? platinumPlans : silverPlans;
    const primaryLabel = isPsGroupB ? 'Diamond' : 'Gold';
    const secondaryLabel = isPsGroupB ? 'Platinum' : 'Silver';
    const currentPlans = activeTab === 'gold' ? primaryPlans : secondaryPlans;
    const selectedPlan = currentPlans[selectedPlanKey];

    // Coupon Logic
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsProcessing(true);

        try {
            const res = await fetch('/api/offer/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: couponCode })
            });

            const data = await res.json();

            if (res.ok && data.valid) {
                // Determine base price for discount: if upgrading, use effectivePrice, otherwise full price
                const baseForDiscount = isUpgradeMode ? effectivePrice : selectedPlan.price;
                const percentage = (data.discount || 50) / 100;
                const discountAmount = Math.round(baseForDiscount * percentage);
                setDiscount(discountAmount);
                alert(`Coupon Applied! You saved ₹${discountAmount}`);
            } else {
                alert(data.error || "Invalid Coupon Code");
                setDiscount(0);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to validate coupon");
        } finally {
            setIsProcessing(false);
        }
    };

    const validateCoupon = async (code: string) => {
        try {
            const res = await fetch('/api/offer/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            if (res.ok && data.valid) {
                return { valid: true, discount: data.discount || 50 };
            } else {
                return { valid: false, discount: 0, error: data.error || "Invalid Coupon" };
            }
        } catch (error) {
            return { valid: false, discount: 0, error: "Validation failed" };
        }
    };

    // Calculate effective price considering PS Group B upgrades
    const getEffectivePrice = () => {
        if (isPsGroupB && currentMembership !== 'free') {
            const hasDiamond = currentMembership === 'gold' && (planId?.includes('diamond') || planId?.includes('ps_gr_b'));
            const hasPlatinum = currentMembership === 'silver' && (planId?.includes('platinum') || planId?.includes('ps_gr_b'));

            // If they are checking the same plan they already own, price should be 0 (will be disabled anyway)
            if (activeTab === 'gold' && hasDiamond) return 0;
            if (activeTab === 'silver' && hasPlatinum) return 0;
            if (activeTab === 'silver' && hasDiamond) return 0; // Diamond already has Platinum benefits

            const currentPlanPrice = currentMembership === 'gold' ? goldPlans.full_2026.price : silverPlans.full_2026.price;
            const diff = Math.round((selectedPlan.price / 2) - (currentPlanPrice / 2));
            return diff > 0 ? diff : 0;
        }
        return selectedPlan.price;
    };
    const effectivePrice = getEffectivePrice();
    const hasDiamond = planId?.includes('diamond') || planId?.includes('ps_gr_b');
    const hasPlatinum = planId?.includes('platinum') || planId?.includes('ps_gr_b');
    const hasPsGrBDiamond = isPsGroupB && currentMembership === 'gold' && hasDiamond;
    const hasPsGrBPlatinum = isPsGroupB && currentMembership === 'silver' && hasPlatinum;

    const isUpgradeMode = isPsGroupB && currentMembership !== 'free' && effectivePrice !== selectedPlan.price && !hasPsGrBDiamond && !(hasPsGrBPlatinum && activeTab === 'silver');
    const finalPrice = Math.max(0, effectivePrice - discount);

    // Determine validity days based on plan ID
    const getValidityDays = (planId: string) => {
        return 365;
    };

    const verifyMembershipPayment = async (
        orderId: string,
        paymentId: string,
        signature: string,
        planKey: string,
        tab: 'gold' | 'silver',
        coupon: string
    ) => {
        const effectivePlans = isPsGroupB ? (tab === 'gold' ? diamondPlans : platinumPlans) : (tab === 'gold' ? goldPlans : silverPlans);
        const effectivePlan = effectivePlans[planKey];
        if (!effectivePlan) return; // Should not happen

        try {
            const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    razorpay_order_id: orderId,
                    razorpay_payment_id: paymentId,
                    razorpay_signature: signature,
                    email: userEmail,
                    plan: {
                        id: effectivePlan.id,
                        name: effectivePlan.name,
                        type: tab,
                        validityDays: getValidityDays(effectivePlan.id)
                    },
                    couponCode: coupon // Pass coupon code here
                }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
                alert("Payment Successful! Membership Updated.");
                router.push('/membership'); // Redirect to membership details
                router.refresh();
            } else {
                alert("Payment verification failed: " + verifyData.error);
            }
        } catch (err) {
            console.error("Verification error", err);
            alert("Payment successful but verification failed. Please contact support.");
        }
    };

    const handlePayment = async (
        overridePlanKey?: string,
        overrideActiveTab?: 'gold' | 'silver',
        overrideDiscount?: number,
        overrideCouponCode?: string
    ) => {
        // Determine values to use (Override or State)
        const planKeyToUse = overridePlanKey || selectedPlanKey;
        const tabToUse = overrideActiveTab || activeTab;
        const discountToUse = overrideDiscount !== undefined ? overrideDiscount : discount;
        const couponCodeToUse = overrideCouponCode || couponCode;

        const effectivePlans = isPsGroupB
            ? (tabToUse === 'gold' ? diamondPlans : platinumPlans)
            : (tabToUse === 'gold' ? goldPlans : silverPlans);
        const effectivePlan = effectivePlans[planKeyToUse];
        let basePrice = effectivePlan.price;
        if (isPsGroupB && currentMembership !== 'free') {
            const curPrice = currentMembership === 'gold' ? goldPlans.full_2026.price : silverPlans.full_2026.price;
            const diff = Math.round((effectivePlan.price / 2) - (curPrice / 2));
            basePrice = diff > 0 ? diff : 0;
        }
        const effectiveFinalPrice = basePrice - discountToUse;

        if (!userEmail) {
            router.push('/login?redirect=/pricing');
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create Order
            const res = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: effectiveFinalPrice,
                    currency: 'INR',
                    email: userEmail,
                    plan: {
                        id: effectivePlan.id,
                        name: effectivePlan.name,
                        type: tabToUse,
                        validityDays: getValidityDays(effectivePlan.id)
                    },
                    couponCode: couponCodeToUse
                }),
            });

            const order = await res.json();

            if (!res.ok) {
                throw new Error(order.error || 'Failed to create order');
            }

            // 2. Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Should be env var in client
                amount: order.amount,
                currency: order.currency,
                name: "Dak Guru Study Planner",
                description: effectivePlan.name,
                image: "/dak-guru-new-logo.png",
                order_id: order.id,
                // Update callback_url to use the API route that handles POST and redirects to this page with query params
                callback_url: `${window.location.origin}/api/payment/callback?to=/pricing&planKey=${planKeyToUse}&activeTab=${tabToUse}&coupon=${couponCodeToUse}`,
                redirect: false,
                handler: async function (response: any) {
                    await verifyMembershipPayment(
                        response.razorpay_order_id,
                        response.razorpay_payment_id,
                        response.razorpay_signature,
                        planKeyToUse,
                        tabToUse,
                        couponCodeToUse
                    );
                },
                prefill: {
                    name: "User", // Ideally prepopulate name if available
                    email: userEmail,
                    contact: ""
                },

                theme: {
                    color: "#2563eb"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp1.open();

        } catch (error: any) {
            console.error("Payment Error:", error);
            alert("Something went wrong: " + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle Redirect Callback (e.g. UPI Intent on Mobile)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const rpPaymentId = params.get('razorpay_payment_id');
        const rpOrderId = params.get('razorpay_order_id');
        const rpSignature = params.get('razorpay_signature');

        const planKey = params.get('planKey');
        const tab = params.get('activeTab') as 'gold' | 'silver';
        const coupon = params.get('coupon') || "";

        if (rpPaymentId && rpOrderId && rpSignature && planKey && tab && userEmail) {
            verifyMembershipPayment(rpOrderId, rpPaymentId, rpSignature, planKey, tab, coupon);
            // Clear URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [userEmail]);

    if (isMobileApp) {
        return (
            <>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                <NativePricing
                    userEmail={userEmail}
                    userName={userName}
                    currentMembership={currentMembership}
                    onPayment={(key, tab, disc, code) => handlePayment(key, tab, disc, code)}
                    onApplyCoupon={validateCoupon}
                    isProcessing={isProcessing}
                    setIsOfferModalOpen={setIsOfferModalOpen}
                    isPsGroupB={isPsGroupB}
                />
                <DiscountRequestModal
                    isOpen={isOfferModalOpen}
                    onClose={() => setIsOfferModalOpen(false)}
                    userEmail={userEmail}
                    userName={userName}
                    userMobile={userMobile}
                />
            </>
        );
    }

    // LDCE IP benefits
    const ldceIpBenefits = [
        { name: "Live Mock Tests", gold: true, silver: true },
        { name: "Updated PDF Notes as per recent Amendments", gold: true, silver: false },
        { name: "Web Guide (Selected Topics)", gold: true, silver: true },
        { name: "Smart Flash Cards", gold: true, silver: false },
        { name: "Current Affairs", gold: true, silver: true },
        { name: "Unlimited Re-Attempt mode", gold: true, silver: false },
        { name: "Previous year question papers", gold: true, silver: false },
    ];

    // PS Group B benefits (diamond = primary/gold, platinum = secondary/silver)
    const psGroupBBenefits = [
        { name: "Live Mock Tests", gold: true, silver: false },
        { name: "Advanced Management Notes", gold: true, silver: false },
        { name: "Previous Year Question Papers", gold: true, silver: false },
        { name: "Unlimited Re-Attempts", gold: true, silver: false },
        { name: "100% Satisfaction Guarantee", gold: true, silver: false },
        { name: "Updated PDF Notes", gold: true, silver: true },
        { name: "Web Guide", gold: true, silver: true },
        { name: "Flash Cards", gold: true, silver: true },
    ];

    const benefits = isPsGroupB ? psGroupBBenefits : ldceIpBenefits;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pt-20 pb-12">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {/* Banner Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className={`relative overflow-hidden rounded-3xl text-white shadow-2xl p-8 md:p-12 text-center ring-4 ${isPsGroupB
                    ? 'bg-gradient-to-r from-purple-900 via-violet-800 to-fuchsia-900 ring-purple-400/20'
                    : 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 ring-yellow-400/20'
                    }`}>
                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse ${isPsGroupB
                            ? 'bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white'
                            : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900'
                            }`}>
                            <Zap className="w-4 h-4" />
                            <span>{isPsGroupB ? 'BETA ACCESS — PS GROUP B PLANS!' : '50% Discount Offer is only for Limited Period and Ending Soon.'}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-100 drop-shadow-sm font-heading">
                            {isPsGroupB ? 'PS GROUP B EXAM CRACKER!' : 'LDCE IP 2026 EXAM CRACKER!'}
                        </h1>
                        <p className="text-blue-100 max-w-2xl mx-auto text-xl mb-8 font-medium">
                            {isPsGroupB ? (
                                <>Diamond & Platinum Subscription Plans Now Open. <br /><span className="text-purple-300">Master, Practice, Excel</span></>
                            ) : (
                                <>Gold & Silver Subscription Plans Now Open. <br /><span className="text-yellow-300">Learn, Practice, Succeed</span></>
                            )}
                        </p>
                    </div>
                    {/* Abstract shapes for background */}
                    <div className={`absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${isPsGroupB ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                    <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${isPsGroupB ? 'bg-fuchsia-500' : 'bg-indigo-500'}`}></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Column: Plan Comparison */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Tab Switcher */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-2 inline-flex shadow-sm border border-zinc-200 dark:border-zinc-800 w-full md:w-auto gap-2">
                            <button
                                onClick={() => { setActiveTab('gold'); setDiscount(0); }}
                                disabled={(!isPsGroupB && currentMembership === 'gold') || hasPsGrBDiamond}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ring-1 
                                    ${activeTab === 'gold'
                                        ? (isPsGroupB
                                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 ring-purple-200 dark:ring-purple-800'
                                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-yellow-200 dark:ring-yellow-800')
                                        : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 ring-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'}
                                    ${((!isPsGroupB && currentMembership === 'gold') || hasPsGrBDiamond) ? 'opacity-50 cursor-not-allowed' : ''}
                                 `}
                            >
                                {primaryLabel} Plan {activeTab === 'gold' && <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded uppercase ${isPsGroupB ? 'bg-purple-400 text-purple-900' : 'bg-yellow-400 text-yellow-900'}`}>Recommended</span>}
                                {(!isPsGroupB && currentMembership === 'gold') || hasPsGrBDiamond ? <span className="block text-[10px] uppercase mt-1">(Current Plan)</span> : null}
                            </button>
                            <button
                                onClick={() => { setActiveTab('silver'); setDiscount(0); }}
                                disabled={(!isPsGroupB && (currentMembership === 'silver' || currentMembership === 'gold')) || hasPsGrBPlatinum || hasPsGrBDiamond}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ring-1 
                                    ${activeTab === 'silver'
                                        ? 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 ring-slate-200 dark:ring-slate-800'
                                        : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 ring-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'}
                                    ${((!isPsGroupB && (currentMembership === 'silver' || currentMembership === 'gold')) || hasPsGrBPlatinum || hasPsGrBDiamond) ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                {secondaryLabel} Plan
                                {((!isPsGroupB && (currentMembership === 'silver' || currentMembership === 'gold')) || hasPsGrBPlatinum || hasPsGrBDiamond) ? <span className="block text-[10px] uppercase mt-1">(Already Active)</span> : null}
                            </button>
                        </div>

                        {/* Comparison Table */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <div className="min-w-[500px]">
                                    <div className="grid grid-cols-4 p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                                        <div className="col-span-2 font-bold text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider">Plan Benefits</div>
                                        <div className={`text-center font-bold ${activeTab === 'gold' ? 'text-zinc-900 dark:text-zinc-100 scale-105' : 'text-zinc-400 dark:text-zinc-500'}`}>{primaryLabel}</div>
                                        <div className={`text-center font-bold ${activeTab === 'silver' ? 'text-zinc-900 dark:text-zinc-100 scale-105' : 'text-zinc-400 dark:text-zinc-500'}`}>{secondaryLabel}</div>
                                    </div>

                                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        {benefits.map((benefit, index) => (
                                            <div key={index} className="grid grid-cols-4 p-5 items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                                <div className="col-span-2 text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300">
                                                    {benefit.name}
                                                </div>
                                                <div className={`flex justify-center transition-all ${activeTab === 'gold' ? 'opacity-100 scale-110' : 'opacity-70'}`}>
                                                    {benefit.gold ? (
                                                        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shadow-sm">
                                                            <Check className="w-5 h-5" />
                                                        </div>
                                                    ) : (
                                                        <X className="w-5 h-5 text-zinc-300" />
                                                    )}
                                                </div>
                                                <div className={`flex justify-center transition-all ${activeTab === 'silver' ? 'opacity-100 scale-110' : 'opacity-70'}`}>
                                                    {benefit.silver ? (
                                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-900/20 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                                            <Check className="w-3.5 h-3.5" />
                                                        </div>
                                                    ) : (
                                                        <X className="w-5 h-5 text-red-300 dark:text-red-900/50" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 text-center ${isPsGroupB ? 'bg-purple-50 dark:bg-purple-900/10' : 'bg-yellow-50 dark:bg-yellow-900/10'}`}>
                                <p className={`text-sm font-medium flex items-center justify-center gap-2 ${isPsGroupB ? 'text-purple-800 dark:text-purple-200' : 'text-yellow-800 dark:text-yellow-200'}`}>
                                    <ShieldCheck className="w-4 h-4" />
                                    100% Satisfaction Guarantee on {primaryLabel} Plans
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Plan Selection */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Offer Box */}
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-2xl p-5 border border-pink-100 dark:border-pink-900/30 flex flex-col gap-3">
                            <div className="flex items-start gap-3">
                                <Tag className="w-5 h-5 text-pink-600 dark:text-pink-400 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-pink-700 dark:text-pink-300 text-sm mb-1">Exciting offers available</h3>
                                    <p className="text-pink-600/80 dark:text-pink-400/80 text-xs">Have a coupon code? Apply it here for extra discounts.</p>

                                </div>
                            </div>

                            <div className="mt-2 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter your Coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1 bg-white dark:bg-zinc-800 border border-pink-200 dark:border-pink-900/50 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-pink-500/20"
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Launch Offer Banner */}
                        <div className={`relative overflow-hidden rounded-2xl p-1 shadow-lg group cursor-pointer hover:scale-[1.01] transition-transform duration-300 ${isPsGroupB
                            ? 'bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 shadow-purple-500/20'
                            : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-orange-500/20'
                            }`}>
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 relative z-10 h-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className={`w-5 h-5 animate-spin-slow ${isPsGroupB ? 'text-purple-500 fill-purple-500' : 'text-yellow-500 fill-yellow-500'}`} />
                                    <span className={`text-xs font-black tracking-widest uppercase ${isPsGroupB ? 'text-purple-600' : 'text-orange-600'}`}>
                                        {isPsGroupB ? 'Course Mode Introduction Offer' : 'Limited Time Launch Offer'}
                                    </span>
                                </div>
                                <h3 className={`text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r leading-tight ${isPsGroupB
                                    ? 'from-purple-600 to-fuchsia-600'
                                    : 'from-yellow-600 to-red-600'
                                    }`}>
                                    {isPsGroupB ? 'EARLY BIRD PRICING — LIMITED SLOTS!' : '50% Discount Offer is only for Limited Period and Ending Soon.'}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                    {isPsGroupB
                                        ? 'Diamond @ Rs. 4,925/- and Platinum @ Rs. 2,750/-. Submit your details to check your eligibility and claim your discount now.'
                                        : 'Gold @ Rs. 3,750/- and Silver @ Rs. 2,000/-. Submit your details check your eligibility and claim your discount now.'
                                    }
                                </p>
                                <button
                                    onClick={() => setIsOfferModalOpen(true)}
                                    className="mt-2 w-full py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-200 text-white dark:text-black font-bold rounded-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                                >
                                    Check Eligibility <span className="text-lg group-hover:rotate-45 transition-transform">→</span>
                                </button>
                            </div>
                        </div>

                        {/* Plan Selection Cards */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">Select your {activeTab === 'gold' ? primaryLabel : secondaryLabel} Plan:</h3>

                            {(Object.keys(currentPlans) as Array<keyof typeof currentPlans>).map((key) => {
                                const plan = currentPlans[key];
                                const isSelected = selectedPlanKey === key;

                                return (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlanKey(key)}
                                        className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all duration-200 flex items-center gap-4 group
                                            ${isSelected
                                                ? 'bg-white dark:bg-zinc-800 border-green-500 shadow-md ring-1 ring-green-500/20'
                                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                                            ${isSelected ? 'border-green-500 bg-green-500' : 'border-zinc-300 dark:border-zinc-600'}`}>
                                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`font-bold text-base ${isSelected ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                                    {plan.name}
                                                </span>
                                                <div className="text-right">
                                                    <span className="text-xs text-zinc-400 line-through mr-2">₹{plan.originalPrice}</span>
                                                    <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">₹{plan.price}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">{plan.validity}</span>
                                                {'isPopular' in plan && plan.isPopular && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 px-2 py-0.5 rounded-full">
                                                        Best Value
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary & Checkout */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 sticky top-24">
                            {isUpgradeMode && (
                                <div className="flex justify-between items-center mb-2 text-xs text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                                    <span>Upgrade from {currentMembership === 'gold' ? 'Gold' : 'Silver'} Plan</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                                <span>{isUpgradeMode ? 'Upgrade Price' : 'Plan Price'}</span>
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">₹{effectivePrice}</span>
                            </div>

                            {discount > 0 && (
                                <div className="flex justify-between items-center mb-2 text-xs text-green-600 font-medium">
                                    <span>Coupon Discount Applied</span>
                                    <span>- ₹{discount}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">Net Payable</span>
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">₹{finalPrice}</span>
                            </div>

                            <button
                                onClick={() => handlePayment()}
                                disabled={isProcessing || (!isPsGroupB && (currentMembership === 'gold' || (currentMembership === 'silver' && activeTab === 'silver'))) || (isUpgradeMode && effectivePrice <= 0) || (hasPsGrBDiamond) || (hasPsGrBPlatinum && activeTab === 'silver')}
                                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed
                                    ${(!isPsGroupB && (currentMembership === 'gold' || (currentMembership === 'silver' && activeTab === 'silver'))) || hasPsGrBDiamond || (hasPsGrBPlatinum && activeTab === 'silver')
                                        ? 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 shadow-none'
                                        : 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/20 active:scale-[0.98]'
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : isUpgradeMode ? (
                                    <>
                                        <Zap className="w-5 h-5 fill-current" />
                                        Upgrade to {activeTab === 'gold' ? primaryLabel : secondaryLabel} — Pay ₹{finalPrice}
                                    </>
                                ) : (!isPsGroupB && currentMembership === 'gold') || hasPsGrBDiamond ? (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        {isPsGroupB ? 'Diamond' : 'Gold'} Plan Active
                                    </>
                                ) : (!isPsGroupB && currentMembership === 'silver' && activeTab === 'silver') || (hasPsGrBPlatinum && activeTab === 'silver') ? (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        {isPsGroupB ? 'Platinum' : 'Silver'} Plan Active
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5 fill-current" />
                                        Proceed to Payment
                                    </>
                                )}
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-zinc-500 mb-2">
                                    If you're facing any issues on payments, please contact admin through WhatsApp:
                                </p>
                                <a
                                    href="https://wa.me/919363030396"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-full transition-colors border border-green-200"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span className="font-bold text-sm">936 30 30 396</span>
                                </a>
                            </div>

                            <p className="mt-3 text-center text-xs text-zinc-500 font-medium bg-zinc-50 dark:bg-zinc-800/50 py-2 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                                <span className="font-bold text-zinc-700 dark:text-zinc-300">Note:</span> Make sure the payment is being made to <br />
                                <span className="font-bold text-blue-600 dark:text-blue-400">"Dak Guru = Vidhya A"</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <DiscountRequestModal
                isOpen={isOfferModalOpen}
                onClose={() => setIsOfferModalOpen(false)}
                userEmail={userEmail}
                userName={userName}
                userMobile={userMobile}
            />
        </div>
    );
}
