"use client";

import { useState } from "react";
import { Check, X, Tag, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PricingPage() {
    const [selectedPlanKey, setSelectedPlanKey] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');
    const [activeTab, setActiveTab] = useState<'pro' | 'pass'>('pro');
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);

    // Pro Plans Data
    const proPlans = {
        monthly: {
            id: 'monthly_pro',
            name: 'Monthly Pass Pro',
            validity: 'Valid for 31 Days',
            price: 599,
            originalPrice: 1199,
            isPopular: false,
        },
        yearly: {
            id: 'yearly_pro',
            name: 'Yearly Pass Pro',
            validity: 'Valid for 365 Days',
            price: 649,
            originalPrice: 1799,
            isPopular: true,
        },
        lifetime: {
            id: 'lifetime_pro',
            name: '18 Months Pass Pro',
            validity: 'Valid for 548 Days',
            price: 799,
            originalPrice: 1999,
            isPopular: false,
        }
    };

    // Basic Pass Plans Data
    const basicPlans = {
        monthly: {
            id: 'monthly_basic',
            name: 'Monthly Pass',
            validity: 'Valid for 31 Days',
            price: 299,
            originalPrice: 599,
            isPopular: false,
        },
        yearly: {
            id: 'yearly_basic',
            name: 'Yearly Pass',
            validity: 'Valid for 365 Days',
            price: 399,
            originalPrice: 999,
            isPopular: true,
        },
        lifetime: {
            id: 'lifetime_basic',
            name: 'Lifetime Pass',
            validity: 'Valid for 3 Years',
            price: 599,
            originalPrice: 1499,
            isPopular: false,
        }
    };

    const currentPlans = activeTab === 'pro' ? proPlans : basicPlans;
    const selectedPlan = currentPlans[selectedPlanKey];

    // Coupon Logic
    const handleApplyCoupon = () => {
        if (couponCode.trim().toUpperCase() === 'DISCOUNT50') {
            setDiscount(50);
            alert("Coupon Applied: ₹50 off!");
        } else {
            alert("Invalid Coupon Code");
            setDiscount(0);
        }
    };

    const finalPrice = selectedPlan.price - discount;

    const benefits = [
        { name: "Live Mock Tests", pro: true, basic: true },
        { name: "Updated Notes as per recent Amendments", pro: true, basic: false },
        { name: "Web Guide", pro: true, basic: true },
        { name: "Flash Cards", pro: true, basic: false },
        { name: "Current Affairs", pro: true, basic: true },
        { name: "Unlimited Re-Attempt mode", pro: true, basic: false },
        { name: "Previous year question papers", pro: true, basic: false },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pt-20 pb-12">

            {/* Banner Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl p-8 md:p-12 text-center">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20">
                            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span>Mission Officer</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-sm">
                            Your Journey to Inspector Posts Starts Here
                        </h1>
                        <p className="text-blue-200 max-w-2xl mx-auto text-lg mb-8">
                            Unlock unlimited access to the best resources and skyrocket your preparation.
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
                                onClick={() => { setActiveTab('pro'); setDiscount(0); }}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ring-1 ${activeTab === 'pro'
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-yellow-200 dark:ring-yellow-800'
                                    : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 ring-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                            >
                                Pass Pro {activeTab === 'pro' && <span className="ml-2 bg-yellow-400 text-yellow-900 text-[10px] px-1.5 py-0.5 rounded uppercase">Recommended</span>}
                            </button>
                            <button
                                onClick={() => { setActiveTab('pass'); setDiscount(0); }}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ring-1 ${activeTab === 'pass'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 ring-blue-200 dark:ring-blue-800'
                                    : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 ring-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                            >
                                Pass
                            </button>
                        </div>

                        {/* Comparison Table */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="grid grid-cols-4 p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                                <div className="col-span-2 font-bold text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider">Plan Benefits</div>
                                <div className={`text-center font-bold ${activeTab === 'pro' ? 'text-zinc-900 dark:text-zinc-100 scale-105' : 'text-zinc-400 dark:text-zinc-500'}`}>Pass Pro</div>
                                <div className={`text-center font-bold ${activeTab === 'pass' ? 'text-zinc-900 dark:text-zinc-100 scale-105' : 'text-zinc-400 dark:text-zinc-500'}`}>Pass</div>
                            </div>

                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="grid grid-cols-4 p-5 items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <div className="col-span-2 text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300">
                                            {benefit.name}
                                        </div>
                                        <div className={`flex justify-center transition-all ${activeTab === 'pro' ? 'opacity-100 scale-110' : 'opacity-70'}`}>
                                            {benefit.pro ? (
                                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shadow-sm">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                            ) : (
                                                <X className="w-5 h-5 text-zinc-300" />
                                            )}
                                        </div>
                                        <div className={`flex justify-center transition-all ${activeTab === 'pass' ? 'opacity-100 scale-110' : 'opacity-70'}`}>
                                            {benefit.basic ? (
                                                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
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
                                    100% Satisfaction Guarantee on Pro Plans
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
                                    <p className="text-pink-600/80 dark:text-pink-400/80 text-xs">Grab the best deals now! Hurry up, offer ends soon.</p>

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
                                        placeholder="Enter Code (try DISCOUNT50)"
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

                        {/* Plan Selection Cards */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">Select your {activeTab === 'pro' ? 'Pass Pro' : 'Pass'} Plan:</h3>

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

                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5 fill-current" />
                                Proceed to Payment
                            </button>

                            <p className="mt-4 text-center text-xs text-zinc-400">
                                By proceeding you agree to our Terms & Conditions.
                                <br />Secure payment powered by Razorpay.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
