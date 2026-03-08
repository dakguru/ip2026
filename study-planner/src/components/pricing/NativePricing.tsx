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
    onPayment: (planKey: string, activeTab: 'gold' | 'silver', discount: number, couponCode?: string) => void;
    onApplyCoupon: (code: string) => Promise<{ valid: boolean; discount: number; error?: string }>;
    isProcessing: boolean;
    setIsOfferModalOpen: (isOpen: boolean) => void;
    isPsGroupB?: boolean;
    planId?: string | null;
}

export default function NativePricing({
    userEmail,
    userName,
    currentMembership,
    onPayment,
    onApplyCoupon,
    isProcessing,
    setIsOfferModalOpen,
    isPsGroupB = false,
    planId = null
}: NativePricingProps) {
    const [activeTab, setActiveTab] = useState<'gold' | 'silver'>('gold');
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);

    // Plan Data
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

    // PS Group B Plans
    const diamondPlans: Record<string, Plan> = {
        full_2026: {
            id: 'diamond_ps_gr_b',
            name: 'PS Group B Diamond Plan',
            validity: 'Valid for One Year',
            price: 9850,
            originalPrice: 15000,
            isPopular: true,
        }
    };

    const platinumPlans: Record<string, Plan> = {
        full_2026: {
            id: 'platinum_ps_gr_b',
            name: 'PS Group B Platinum Plan',
            validity: 'Valid for One Year',
            price: 5500,
            originalPrice: 8700,
            isPopular: false,
        }
    };

    const primaryPlans = isPsGroupB ? diamondPlans : goldPlans;
    const secondaryPlans = isPsGroupB ? platinumPlans : silverPlans;
    const primaryLabel = isPsGroupB ? 'DIAMOND' : 'GOLD';
    const secondaryLabel = isPsGroupB ? 'Platinum' : 'Silver';

    const currentPlans = activeTab === 'gold' ? primaryPlans : secondaryPlans;
    const selectedPlanKey = 'full_2026';
    const selectedPlan = currentPlans[selectedPlanKey];

    const ldceIpBenefits = [
        { name: "Live Mock Tests", gold: true, silver: true },
        { name: "Updated PDF Notes as per recent Amendments", gold: true, silver: false },
        { name: "Web Guide (Selected Topics)", gold: true, silver: true },
        { name: "Smart Flash Cards", gold: true, silver: false },
        { name: "Current Affairs", gold: true, silver: true },
        { name: "Unlimited Re-Attempt mode", gold: true, silver: false },
    ];

    const psGroupBBenefits = [
        { name: "Live Mock Tests", gold: true, silver: false },
        { name: "Advanced Management Notes", gold: true, silver: false },
        { name: "Previous Year Qs", gold: true, silver: false },
        { name: "Unlimited Re-Attempts", gold: true, silver: false },
        { name: "100% Satisfaction Guarantee", gold: true, silver: false },
        { name: "Updated PDF Notes", gold: true, silver: true },
        { name: "Web Guide", gold: true, silver: true },
        { name: "Flash Cards", gold: true, silver: true },
    ];

    const benefits = isPsGroupB ? psGroupBBenefits : ldceIpBenefits;

    const handleApply = async () => {
        if (!couponCode) return;
        const res = await onApplyCoupon(couponCode);
        if (res.valid) {
            // Determine base price for discount: if upgrading, use current effectivePrice, otherwise full price
            const baseForDiscount = isUpgradeMode ? effectivePrice : selectedPlan.price;
            const percentage = (res.discount || 50) / 100;
            const discountAmount = Math.round(baseForDiscount * percentage);
            setDiscount(discountAmount);
            alert(`Coupon Applied! You saved ₹${discountAmount}`);
        } else {
            setDiscount(0);
            alert(res.error || "Invalid Coupon");
        }
    };

    // Calculate effective price considering PS Group B upgrades
    const getEffectivePrice = () => {
        if (isPsGroupB && currentMembership !== 'free') {
            const hasDiamond = currentMembership === 'gold' && (planId?.includes('diamond') || planId?.includes('ps_gr_b'));
            const hasPlatinum = currentMembership === 'silver' && (planId?.includes('platinum') || planId?.includes('ps_gr_b'));

            if (activeTab === 'gold' && hasDiamond) return 0;
            if (activeTab === 'silver' && hasPlatinum) return 0;
            if (activeTab === 'silver' && hasDiamond) return 0;

            const currentPlanPrice = currentMembership === 'gold' ? goldPlans.full_2026.price : silverPlans.full_2026.price;
            const diff = selectedPlan.price - currentPlanPrice;
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

    return (
        <div className="min-h-screen bg-black text-white font-sans pb-48">


            <div className="p-4 space-y-6">

                {/* 1. Hero Offer Card */}
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 shadow-2xl shadow-purple-500/20">
                    <div className="bg-zinc-950 rounded-[23px] p-5 h-full relative overflow-hidden">
                        {/* Background fx */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className={`w-4 h-4 animate-pulse ${isPsGroupB ? 'text-purple-400' : 'text-yellow-400'}`} />
                            <span className={`text-xs font-bold tracking-widest uppercase ${isPsGroupB ? 'text-purple-400' : 'text-yellow-400'}`}>{isPsGroupB ? 'Beta Access' : 'Launch Offer'}</span>
                        </div>

                        <h2 className="text-2xl font-black mb-2 leading-tight">
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isPsGroupB ? 'from-purple-400 to-fuchsia-400' : 'from-yellow-400 to-orange-400'}`}>
                                {isPsGroupB ? 'PS GROUP B PLANS!' : '50% OFF — ENDING SOON!'}
                            </span>
                        </h2>

                        <p className="text-base font-bold text-white mb-1">
                            {isPsGroupB ? 'Diamond @ ₹4,999 | Platinum @ ₹3,000' : 'Gold @ ₹3,750 | Silver @ ₹2,000'}
                        </p>
                        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                            Complete your enrollment now before pricing resets.
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
                        {/* Tab Switcher */}
                        <button
                            onClick={() => { setActiveTab('gold'); setDiscount(0); }}
                            disabled={hasPsGrBDiamond}
                            className={`py-3 rounded-xl font-bold text-sm transition-all flex flex-col items-center gap-1 ${activeTab === 'gold'
                                ? `bg-zinc-800 shadow-lg ring-1 ring-white/10 ${isPsGroupB ? 'text-purple-400' : 'text-yellow-400'}`
                                : 'text-zinc-500 hover:text-zinc-300'
                                } ${hasPsGrBDiamond ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span>{isPsGroupB ? 'Diamond' : 'Gold'} Plan</span>
                            {activeTab === 'gold' && <span className={`text-[10px] px-1.5 rounded uppercase tracking-wider ${isPsGroupB ? 'bg-purple-400/10 text-purple-400' : 'bg-yellow-400/10 text-yellow-400'}`}>Recommended</span>}
                        </button>
                        <button
                            onClick={() => { setActiveTab('silver'); setDiscount(0); }}
                            disabled={hasPsGrBPlatinum || hasPsGrBDiamond}
                            className={`py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'silver'
                                ? 'bg-zinc-800 text-white shadow-lg ring-1 ring-white/10'
                                : 'text-zinc-500 hover:text-zinc-300'
                                } ${(hasPsGrBPlatinum || hasPsGrBDiamond) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isPsGroupB ? 'Platinum' : 'Silver'} Plan
                        </button>
                    </div>
                </div>

                {/* 3. Selected Plan Details */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm text-zinc-400 mb-1">Benefits included in</p>
                            <h3 className={`text-xl font-black ${activeTab === 'gold' ? (isPsGroupB ? 'text-purple-400' : 'text-yellow-400') : 'text-white'}`}>
                                {activeTab === 'gold' ? primaryLabel : secondaryLabel.toUpperCase()}
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
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-400" /> Have a coupon code?
                    </label>
                    <div className="flex gap-2">
                        <input
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter your Coupon code"
                            className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 flex-1 text-sm outline-none focus:border-blue-500 transition-colors"
                        />
                        <button
                            onClick={handleApply}
                            className="bg-blue-600 px-5 rounded-xl font-bold text-sm"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 p-4 bg-zinc-950/90 backdrop-blur-xl border-t border-white/5 z-40">
                <div className="flex justify-between items-center mb-1 px-1">
                    <p className="text-xs text-zinc-400">{isUpgradeMode ? 'Upgrade Price' : 'Plan Price'}</p>
                    <p className="text-sm font-bold">₹{effectivePrice}</p>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between items-center mb-1 px-1">
                        <p className="text-xs text-green-400">Coupon Discount</p>
                        <p className="text-sm font-bold text-green-400">- ₹{discount}</p>
                    </div>
                )}
                <div className="flex justify-between items-center mb-3 px-1 pt-1 border-t border-white/5">
                    <p className="text-xs font-bold text-white">Net Payable</p>
                    <p className="text-2xl font-bold text-green-400">₹{finalPrice}</p>
                </div>

                <button
                    onClick={() => onPayment(selectedPlanKey, activeTab, discount, discount > 0 ? couponCode : undefined)}
                    disabled={
                        isProcessing ||
                        (!isPsGroupB && (currentMembership === 'gold' ||
                            (currentMembership === 'silver' && activeTab === 'silver'))) ||
                        (isUpgradeMode && effectivePrice <= 0) || hasPsGrBDiamond || (hasPsGrBPlatinum && activeTab === 'silver')
                    }
                    className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 ${isProcessing || (!isPsGroupB && (currentMembership === 'gold' || (currentMembership === 'silver' && activeTab === 'silver'))) || hasPsGrBDiamond || (hasPsGrBPlatinum && activeTab === 'silver')
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none'
                        : 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20 active:scale-[0.98] transition-all'
                        }`}
                >
                    {isProcessing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isUpgradeMode ? (
                        <>
                            <Zap className="w-5 h-5 fill-current" />
                            Upgrade to {activeTab === 'gold' ? (isPsGroupB ? 'Diamond' : 'Gold') : (isPsGroupB ? 'Platinum' : 'Silver')} — ₹{finalPrice}
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
                            {activeTab === 'gold' && currentMembership === 'silver' && !isPsGroupB ? "Upgrade to Gold" : "Proceed to Payment"}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
