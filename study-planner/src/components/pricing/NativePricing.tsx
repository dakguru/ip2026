import { useState } from "react";
import { Check, ShieldCheck, Zap, Sparkles, Tag, ChevronRight, Loader2, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Plan {
    id: string;
    name: string;
    validity: string;
    price: number;
    originalPrice: number;
    isPopular?: boolean;
}

interface NativePricingProps {
    userEmail: string | null;
    userName: string | null;
    currentMembership: 'free' | 'silver' | 'gold';
    onPayment: (planKey: string, activeTab: 'gold' | 'silver', discount: number) => void;
    onApplyCoupon: (code: string) => Promise<{ valid: boolean; discount: number; error?: string }>;
    isProcessing: boolean;
    setIsOfferModalOpen: (isOpen: boolean) => void;
}

export default function NativePricing({
    userEmail,
    userName,
    currentMembership,
    onPayment,
    onApplyCoupon,
    isProcessing,
    setIsOfferModalOpen
}: NativePricingProps) {
    const [activeTab, setActiveTab] = useState<'gold' | 'silver'>('gold');
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showCouponInput, setShowCouponInput] = useState(false);

    // Plan Data (Mirrored from main page)
    const goldPlans: Record<string, Plan> = {
        full_2026: {
            id: 'gold_2026_cracker',
            name: 'LDCE IP 2026 Gold Plan',
            validity: 'Valid for One Year',
            price: 7500,
            originalPrice: 12000,
            isPopular: true,
        }
    };

    const silverPlans: Record<string, Plan> = {
        full_2026: {
            id: 'silver_2026_cracker',
            name: 'LDCE IP 2026 Silver Plan',
            validity: 'Valid for One Year',
            price: 4000,
            originalPrice: 7000,
            isPopular: false,
        }
    };

    const currentPlans = activeTab === 'gold' ? goldPlans : silverPlans;
    const selectedPlanKey = 'full_2026';
    const selectedPlan = currentPlans[selectedPlanKey];

    const benefits = [
        { name: "Live Mock Tests", gold: true, silver: true },
        { name: "Updated Notes (Amendments)", gold: true, silver: false },
        { name: "Web Guide", gold: true, silver: true },
        { name: "Flash Cards", gold: true, silver: false },
        { name: "Current Affairs", gold: true, silver: true },
        { name: "Unlimited Re-Attempt mode", gold: true, silver: false },
        // { name: "Previous year question papers", gold: true, silver: false },
    ];

    const handleApply = async () => {
        if (!couponCode) return;
        const res = await onApplyCoupon(couponCode);
        if (res.valid) {
            // Calculate 50% discount based on plan price Logic duplicated/passed from parent? 
            // Ideally parent handles calculation, but for now we trust the hook or calculate here if static
            // Parent expects amount, so let's use the same logic: 50% flat for valid web coupons
            const discountAmount = selectedPlan.price * 0.5;
            setDiscount(discountAmount);
            setShowCouponInput(false);
            alert(`Coupon Applied! You saved ₹${discountAmount}`);
        } else {
            setDiscount(0);
            alert(res.error || "Invalid Coupon");
        }
    };

    const finalPrice = selectedPlan.price - discount;

    return (
        <div className="min-h-screen bg-black text-white font-sans pb-32">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 relative rounded-full overflow-hidden border border-white/20">
                        <Image src="/dak-guru-logo-new.jpg" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Dak Guru
                    </span>
                </div>
                {/* User Avatar Tiny */}
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xs ring-2 ring-white/10">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
            </div>

            <div className="p-4 space-y-6">

                {/* 1. Hero Offer Card */}
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 shadow-2xl shadow-purple-500/20">
                    <div className="bg-zinc-950 rounded-[23px] p-5 h-full relative overflow-hidden">
                        {/* Background fx */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                            <span className="text-xs font-bold text-yellow-400 tracking-widest uppercase">Launch Offer</span>
                        </div>

                        <h2 className="text-2xl font-black mb-2 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">50% DISCOUNT</span> <br />
                            FOR FIRST 50 SUBSCRIBERS!
                        </h2>

                        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                            Gold @ <span className="text-white font-bold">₹3,750</span> & Silver @ <span className="text-white font-bold">₹2,000</span>.
                            Claim yours now.
                        </p>

                        <button
                            onClick={() => setIsOfferModalOpen(true)}
                            className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                            Check Eligibility <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* 2. Plan Selector Tabs */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Select Plan</h3>
                    <div className="grid grid-cols-2 bg-zinc-900 p-1.5 rounded-2xl border border-white/10">
                        <button
                            onClick={() => { setActiveTab('gold'); setDiscount(0); }}
                            className={`py-3 rounded-xl font-bold text-sm transition-all flex flex-col items-center gap-1 ${activeTab === 'gold'
                                    ? 'bg-zinc-800 text-yellow-400 shadow-lg ring-1 ring-white/10'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            <span>Gold Plan</span>
                            {activeTab === 'gold' && <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-1.5 rounded uppercase tracking-wider">Recommended</span>}
                        </button>
                        <button
                            onClick={() => { setActiveTab('silver'); setDiscount(0); }}
                            className={`py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'silver'
                                    ? 'bg-zinc-800 text-white shadow-lg ring-1 ring-white/10'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            Silver Plan
                        </button>
                    </div>
                </div>

                {/* 3. Selected Plan Details */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm text-zinc-400 mb-1">Benefits included in</p>
                            <h3 className={`text-xl font-black ${activeTab === 'gold' ? 'text-yellow-400' : 'text-white'}`}>
                                {activeTab === 'gold' ? 'GOLD' : 'SILVER'}
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-zinc-500 line-through">₹{selectedPlan.originalPrice}</p>
                            <p className="text-2xl font-bold">₹{selectedPlan.price}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {benefits.map((bg, idx) => {
                            const isIncluded = activeTab === 'gold' ? bg.gold : bg.silver;
                            return (
                                <div key={idx} className={`flex items-center gap-3 ${isIncluded ? 'opacity-100' : 'opacity-30'}`}>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isIncluded
                                            ? (activeTab === 'gold' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/20 text-white')
                                            : 'bg-zinc-800 text-zinc-600'
                                        }`}>
                                        {isIncluded ? <Check className="w-3 h-3" strokeWidth={3} /> : <X className="w-3 h-3" />}
                                    </div>
                                    <span className="text-sm font-medium">{bg.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 4. Coupon Section */}
                {!showCouponInput && discount === 0 && (
                    <button
                        onClick={() => setShowCouponInput(true)}
                        className="flex items-center gap-2 text-sm text-blue-400 font-medium px-2"
                    >
                        <Tag className="w-4 h-4" /> Have a coupon code?
                    </button>
                )}

                {showCouponInput && (
                    <div className="flex gap-2">
                        <input
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter Code"
                            className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 flex-1 text-sm outline-none focus:border-blue-500 transition-colors"
                        />
                        <button
                            onClick={handleApply}
                            className="bg-blue-600 px-5 rounded-xl font-bold text-sm"
                        >
                            Apply
                        </button>
                    </div>
                )}
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/90 backdrop-blur-xl border-t border-white/5 z-40 pb-[max(20px,env(safe-area-inset-bottom))]">
                <div className="flex justify-between items-center mb-3 px-1">
                    <div>
                        <p className="text-xs text-zinc-400">Total Payable</p>
                        <p className="text-2xl font-bold">₹{finalPrice}</p>
                    </div>
                    {discount > 0 && (
                        <div className="text-right">
                            <p className="text-xs text-green-400">Coupon Saving</p>
                            <p className="text-sm font-bold text-green-400">- ₹{discount}</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => onPayment(selectedPlanKey, activeTab, discount)}
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 ${isProcessing
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20 active:scale-[0.98] transition-all'
                        }`}
                >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                    {isProcessing ? "Processing..." : "Proceed to Payment"}
                </button>
            </div>
        </div>
    );
}
