"use client";

import { useState, useEffect } from "react";
import { Check, X, Tag, ShieldCheck, Zap, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { DiscountRequestModal } from "@/components/DiscountRequestModal";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PricingPage() {
    const router = useRouter();
    const [selectedPlanKey, setSelectedPlanKey] = useState<string>('full_2026');
    const [activeTab, setActiveTab] = useState<'gold' | 'silver'>('gold');
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userMobile, setUserMobile] = useState<string | null>(null);
    const [currentMembership, setCurrentMembership] = useState<'free' | 'silver' | 'gold'>('free');
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

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

                // Auto-select upgrade plan if applicable
                if (session.membershipLevel === 'silver') {
                    setActiveTab('gold');
                }
            } catch (e) {
                console.error("Session parse error", e);
            }
        }
    }, []);

    // Gold Plans Data
    const goldPlans: Record<string, any> = {
        full_2026: {
            id: 'gold_2026_cracker',
            name: 'LDCE IP 2026 Gold Plan',
            validity: 'Valid till Exam 2026',
            price: 7500,
            originalPrice: 12000,
            isPopular: true,
            // tag: '50% OFF' // Applied via coupon now
        }
    };

    // Silver Plans Data
    const silverPlans: Record<string, any> = {
        full_2026: {
            id: 'silver_2026_cracker',
            name: 'LDCE IP 2026 Silver Plan',
            validity: 'Valid till Exam 2026',
            price: 4000,
            originalPrice: 7000,
            isPopular: false,
            // tag: '50% OFF' 
        }
    };

    const currentPlans = activeTab === 'gold' ? goldPlans : silverPlans;
    const selectedPlan = currentPlans[selectedPlanKey];

    // Coupon Logic
    const handleApplyCoupon = () => {
        // All codes disabled for now
        alert("Invalid Coupon Code");
        setDiscount(0);
    };

    const finalPrice = selectedPlan.price - discount;

    // Determine validity days based on plan ID
    const getValidityDays = (planId: string) => {
        // Assuming ~18 months or specific exam date logic on backend. 
        // Returning 500 days as a safe "till 2026" placeholder for now.
        return 500;
    };

    const handlePayment = async () => {
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
                body: JSON.stringify({ amount: finalPrice, currency: 'INR' }),
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
                description: selectedPlan.name,
                image: "/dak-guru-new-logo.png",
                order_id: order.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                email: userEmail,
                                plan: {
                                    id: selectedPlan.id,
                                    name: selectedPlan.name,
                                    type: activeTab,
                                    validityDays: getValidityDays(selectedPlan.id)
                                }
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

    const benefits = [
        { name: "Live Mock Tests", gold: true, silver: true },
        { name: "Updated Notes as per recent Amendments", gold: true, silver: false },
        { name: "Web Guide", gold: true, silver: true },
        { name: "Flash Cards", gold: true, silver: false },
        { name: "Current Affairs", gold: true, silver: true },
        { name: "Unlimited Re-Attempt mode", gold: true, silver: false },
        { name: "Previous year question papers", gold: true, silver: false },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pt-20 pb-12">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {/* Banner Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl p-8 md:p-12 text-center ring-4 ring-yellow-400/20">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse">
                            <Zap className="w-4 h-4" />
                            <span>HURRY! 50% DISCOUNT FOR FIRST 50 SUBSCRIBERS ONLY!</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-100 drop-shadow-sm font-heading">
                            LDCE IP 2026 EXAM CRACKER!
                        </h1>
                        <p className="text-blue-100 max-w-2xl mx-auto text-xl mb-8 font-medium">
                            Gold & Silver Subscription Plans Now Open. <br />
                            <span className="text-yellow-300">Learn. Practice. Succeed.</span>
                        </p>
                    </div>
                    {/* Abstract shapes for background */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
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
                                disabled={currentMembership === 'gold'}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ring-1 
                                    ${activeTab === 'gold'
                                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-yellow-200 dark:ring-yellow-800'
                                        : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 ring-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'}
                                    ${currentMembership === 'gold' ? 'opacity-50 cursor-not-allowed' : ''}
                                 `}
                            >
                                Gold Plan {activeTab === 'gold' && <span className="ml-2 bg-yellow-400 text-yellow-900 text-[10px] px-1.5 py-0.5 rounded uppercase">Recommended</span>}
                                {currentMembership === 'gold' && <span className="block text-[10px] uppercase mt-1">(Current Plan)</span>}
                            </button>
                            <button
                                onClick={() => { setActiveTab('silver'); setDiscount(0); }}
                                disabled={currentMembership === 'silver' || currentMembership === 'gold'}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ring-1 
                                    ${activeTab === 'silver'
                                        ? 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 ring-slate-200 dark:ring-slate-800'
                                        : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 ring-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'}
                                    ${(currentMembership === 'silver' || currentMembership === 'gold') ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                Silver Plan
                                {(currentMembership === 'silver' || currentMembership === 'gold') && <span className="block text-[10px] uppercase mt-1">(Already Active/Upgraded)</span>}
                            </button>
                        </div>

                        {/* Comparison Table */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="grid grid-cols-4 p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                                <div className="col-span-2 font-bold text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider">Plan Benefits</div>
                                <div className={`text-center font-bold ${activeTab === 'gold' ? 'text-zinc-900 dark:text-zinc-100 scale-105' : 'text-zinc-400 dark:text-zinc-500'}`}>Gold</div>
                                <div className={`text-center font-bold ${activeTab === 'silver' ? 'text-zinc-900 dark:text-zinc-100 scale-105' : 'text-zinc-400 dark:text-zinc-500'}`}>Silver</div>
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

                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 text-center">
                                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    100% Satisfaction Guarantee on Gold Plans
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

                                    {!showCouponInput && (
                                        <button
                                            onClick={() => setShowCouponInput(true)}
                                            className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
                                        >
                                            Apply Coupon
                                        </button>
                                    )}
                                </div>
                            </div>

                            {showCouponInput && (
                                <div className="mt-2 flex gap-2 animate-in fade-in slide-in-from-top-1">
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon Code"
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
                            )}
                        </div>

                        {/* Launch Offer Banner */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 shadow-lg shadow-orange-500/20 group cursor-pointer hover:scale-[1.01] transition-transform duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 relative z-10 h-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-spin-slow" />
                                    <span className="text-xs font-black tracking-widest text-orange-600 uppercase">Limited Time Launch Offer</span>
                                </div>
                                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600 leading-tight">
                                    50% DISCOUNT FOR FIRST 50 SUBSCRIBERS ONLY!
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                    Gold @ Rs. 3,750/- and Silver @ Rs. 2,000/-. Submit your details check your eligibility and claim your discount now.
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
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">Select your {activeTab === 'gold' ? 'Gold' : 'Silver'} Plan:</h3>

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
                            <div className="flex justify-between items-center mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                                <span>Total Amount to Pay</span>
                                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">₹{finalPrice}</span>
                            </div>

                            {discount > 0 && (
                                <div className="flex justify-between items-center mb-6 text-xs text-green-600 font-medium">
                                    <span>Coupon Discount Applied</span>
                                    <span>- ₹{discount}</span>
                                </div>
                            )}

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5 fill-current" />
                                        Proceed to Payment
                                    </>
                                )}
                            </button>

                            <p className="mt-4 text-center text-xs text-zinc-400">
                                By proceeding you agree to our Terms & Conditions.
                                <br />Secure payment powered by Razorpay.
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
