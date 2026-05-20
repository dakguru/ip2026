"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Lock, User, ArrowRight, Loader2, Mail, Phone,
    Eye, EyeOff, GraduationCap, ChevronDown,
} from "lucide-react";
import { useCourse } from "@/contexts/CourseContext";
import Turnstile from "react-turnstile";
import PremiumLoader from "@/components/PremiumLoader";

/* ─────────────────────────────────────────
   Global styles
   - 16px minimum font on inputs (prevents iOS auto-zoom)
   - 100dvh for correct mobile viewport height
   - Safe-area padding for Android notch / nav bar
───────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
  }

  .login-page {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    padding-top: max(16px, env(safe-area-inset-top));
    padding-bottom: max(16px, env(safe-area-inset-bottom));
    background: linear-gradient(150deg, #fff8ec 0%, #fef3c7 55%, #fdf4e3 100%);
  }

  /* Prevent iOS auto-zoom on focus — keep inputs at 16px */
  .login-input {
    font-size: 16px !important;
  }

  /* Android ripple-free buttons */
  .login-btn {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    cursor: pointer;
    touch-action: manipulation;
  }

  /* Compact header on small screens */
  @media (max-height: 700px) {
    .stamp-header { padding-top: 12px !important; padding-bottom: 12px !important; }
    .stamp-logo   { width: 48px !important; height: 48px !important; }
    .stamp-title  { font-size: 15px !important; }
    .stamp-sub    { display: none; }
    .stamp-badge  { display: none; }
    .form-gap     { gap: 10px !important; }
  }
`;

/* ─────────────────────────────────────────
   Shared styles
───────────────────────────────────────── */
// 16px font prevents iOS auto-zoom; py-3 gives 44px min touch height
const inputCls =
    "login-input w-full bg-white border border-slate-200 rounded-xl " +
    "py-3 pl-10 pr-4 text-slate-800 outline-none " +
    "focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 " +
    "transition-colors placeholder:text-slate-400";

const labelCls = "block text-xs font-semibold text-slate-500 mb-1.5 ml-0.5";

/* ─────────────────────────────────────────
   Auth Form
───────────────────────────────────────── */
function AuthForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setCourse } = useCourse();

    const [isLogin,       setIsLogin]       = useState(true);
    const [showPassword,  setShowPassword]  = useState(false);
    const [turnstileToken,setTurnstileToken]= useState("");
    const [isLoading,     setIsLoading]     = useState(false);
    const [error,         setError]         = useState("");
    const [formData,      setFormData]      = useState({
        name: "", email: "", password: "", mobile: "",
        gender: "", courseMode: "", confirmPassword: "", website: "",
    });

    useEffect(() => {
        if (searchParams.get("mode") === "signup") setIsLogin(false);
        if (searchParams.get("reason") === "session_expired")
            setError("Your session has expired. Please sign in again.");
        if (searchParams.get("reason") === "multiple_login")
            setError("Signed out — account used on another device.");
    }, [searchParams]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!isLogin) {
            if (!formData.gender)     { setError("Please select your gender.");        setIsLoading(false); return; }
            if (!formData.courseMode) { setError("Please select a preparation mode."); setIsLoading(false); return; }
            if (formData.password !== formData.confirmPassword) { setError("Passwords do not match."); setIsLoading(false); return; }
            if (!turnstileToken)      { setError("Please complete the security check."); setIsLoading(false); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError("Enter a valid email."); setIsLoading(false); return; }
            if (!/^[0-9]{10}$/.test(formData.mobile)) { setError("Enter a valid 10-digit mobile number."); setIsLoading(false); return; }
        }

        try {
            const res  = await fetch(isLogin ? "/api/auth/login" : "/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, turnstileToken }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            if (isLogin) {
                if (data.user?.courseMode) {
                    setCourse(data.user.courseMode);
                    localStorage.setItem("selectedCourseMode", data.user.courseMode);
                }
                if (data.user?.hasSeenCoursePrompt)
                    localStorage.setItem("dg_course_mode_prompt_seen", "true");
                const redirectUrl = searchParams.get("redirect") || "/";
                router.push(redirectUrl);
                router.refresh();
            } else {
                if (formData.courseMode) {
                    setCourse(formData.courseMode as "LDCE_IP" | "PS_GR_B");
                    localStorage.setItem("selectedCourseMode", formData.courseMode);
                }
                setIsLogin(true);
                setFormData({ name: "", email: "", password: "", mobile: "", gender: "", courseMode: "", confirmPassword: "", website: "" });
                alert("Account created! Please sign in.");
            }
        } catch (err) {
            setError((err as { message: string }).message);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setIsLogin(l => !l);
        setError("");
        setFormData({ name: "", email: "", password: "", mobile: "", gender: "", courseMode: "", confirmPassword: "", website: "" });
    };

    return (
        <>
            <style>{globalStyles}</style>

            <div className="login-page">

                {/* ── Stamp Card ── */}
                <div
                    className="w-full"
                    style={{
                        maxWidth: isLogin ? 390 : 440,
                        border: '5px solid #e8930a',
                        borderRadius: '16px',
                        outline: '2px solid rgba(255,255,255,0.9)',
                        outlineOffset: '-8px',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(232,147,10,0.3)',
                        overflow: 'hidden',
                        background: 'white',
                    }}
                >

                    {/* ── HEADER ── */}
                    <div
                        className="stamp-header relative text-center px-5 pt-5 pb-5"
                        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #0f4c75 100%)" }}
                    >
                        {/* Badge row */}
                        <div className="stamp-badge flex items-center justify-between mb-3">
                            <span className="text-[9px] font-black tracking-[0.3em] text-amber-300 uppercase opacity-70">
                                Dak Guru
                            </span>
                            <span className="text-[9px] font-black tracking-[0.3em] text-amber-300 opacity-70">
                                2026
                            </span>
                        </div>

                        {/* Logo */}
                        <Link href="/">
                            <div
                                className="stamp-logo w-14 h-14 rounded-full mx-auto mb-2.5 overflow-hidden ring-2 ring-amber-400/70 ring-offset-2 ring-offset-[#1e3a5f] active:scale-95 transition-transform"
                                style={{ width: 56, height: 56 }}
                            >
                                <Image src="/dak-guru-new-logo.png" alt="Dak Guru" width={56} height={56} className="object-cover" priority />
                            </div>
                        </Link>

                        <h1 className="stamp-title text-white font-bold text-base leading-snug">
                            {isLogin ? "Welcome to Dak Guru" : "Create Your Account"}
                        </h1>
                        <p className="stamp-sub text-amber-200/65 text-[11px] mt-0.5">
                            {isLogin ? "Sign in to continue" : "Start your preparation journey"}
                        </p>

                        {/* Wave */}
                        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                            <svg viewBox="0 0 400 10" className="w-full" preserveAspectRatio="none">
                                <path d="M0,5 C100,10 300,0 400,5 L400,10 L0,10 Z" fill="white" />
                            </svg>
                        </div>
                    </div>

                    {/* ── FORM BODY ── */}
                    <div className="px-4 pt-4 pb-4">

                        <form onSubmit={handleSubmit}>
                            <div className="form-gap flex flex-col gap-3">

                                {/* ── SIGNUP FIELDS ── */}
                                {!isLogin && (
                                    <>
                                        {/* Honeypot */}
                                        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                                            <input type="text" name="website" value={formData.website} onChange={handle} tabIndex={-1} autoComplete="off" />
                                        </div>

                                        {/* Name */}
                                        <div>
                                            <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                                <input name="name" type="text" value={formData.name} onChange={handle}
                                                    className={inputCls} placeholder="Your full name"
                                                    autoComplete="name" required />
                                            </div>
                                        </div>

                                        {/* Gender — large touch targets */}
                                        <div>
                                            <label className={labelCls}>Gender <span className="text-red-500">*</span></label>
                                            <div className="flex gap-3">
                                                {["Male", "Female"].map(g => (
                                                    <label
                                                        key={g}
                                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 cursor-pointer transition-all active:scale-95
                                                            ${formData.gender === g
                                                                ? "border-orange-500 bg-orange-50 text-orange-700"
                                                                : "border-slate-200 bg-white text-slate-600"}`}
                                                    >
                                                        <input type="radio" name="gender" value={g} checked={formData.gender === g}
                                                            onChange={handle} className="hidden" />
                                                        <span className="text-sm font-semibold">{g}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Preparation Mode */}
                                        <div>
                                            <label className={labelCls}>Preparation Mode <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                                <select name="courseMode" value={formData.courseMode} onChange={handle}
                                                    className={`${inputCls} pr-9 appearance-none cursor-pointer ${!formData.courseMode ? "text-slate-400" : "text-slate-800"}`}
                                                    required>
                                                    <option value="" disabled>Select your exam</option>
                                                    <option value="LDCE_IP">LDCE IP Exam</option>
                                                    <option value="PS_GR_B">PS Group &apos;B&apos; Exam</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label className={labelCls}>Mobile No. <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                                <input name="mobile" type="tel" inputMode="numeric" value={formData.mobile} onChange={handle}
                                                    className={inputCls} placeholder="10-digit number"
                                                    autoComplete="tel" required minLength={10} maxLength={10} />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className={labelCls}>Email ID <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                                <input name="email" type="email" inputMode="email" value={formData.email} onChange={handle}
                                                    className={inputCls} placeholder="name@example.com"
                                                    autoComplete="email" required />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* ── LOGIN EMAIL ── */}
                                {isLogin && (
                                    <div>
                                        <label className={labelCls}>Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                            <input name="email" type="email" inputMode="email" value={formData.email} onChange={handle}
                                                className={inputCls} placeholder="name@example.com"
                                                autoComplete="email" required />
                                        </div>
                                    </div>
                                )}

                                {/* ── PASSWORD ── */}
                                <div>
                                    <label className={labelCls}>
                                        {isLogin ? "Password" : "Create Password"} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                        <input name="password" type={showPassword ? "text" : "password"}
                                            value={formData.password} onChange={handle}
                                            className={`${inputCls} pr-11`} placeholder="••••••••"
                                            autoComplete={isLogin ? "current-password" : "new-password"}
                                            required minLength={6} />
                                        {/* 44×44px touch target for show/hide */}
                                        <button type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            className="login-btn absolute right-0 top-0 h-full w-11 flex items-center justify-center text-slate-400 active:text-slate-700">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {isLogin && (
                                        <div className="text-right mt-1.5">
                                            <Link href="/forgot-password"
                                                className="text-xs font-semibold text-orange-600 active:opacity-70 py-1 inline-block">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                {!isLogin && (
                                    <div>
                                        <label className={labelCls}>Confirm Password <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                            <input name="confirmPassword" type="password"
                                                value={formData.confirmPassword} onChange={handle}
                                                className={inputCls} placeholder="••••••••"
                                                autoComplete="new-password" required minLength={6} />
                                        </div>
                                    </div>
                                )}

                                {/* Turnstile */}
                                {!isLogin && (
                                    <div className="flex flex-col items-center">
                                        <div className="scale-[0.88] origin-left -ml-2">
                                            <Turnstile
                                                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                                                onVerify={token => setTurnstileToken(token)}
                                                theme="light"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1 text-center">
                                            Disable ad blocker if security widget doesn&apos;t appear.
                                        </p>
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <div className="text-red-600 text-xs font-semibold text-center bg-red-50 border border-red-100 py-2.5 px-3 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                {/* ── Primary CTA ── min-height 48px for Android */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="login-btn w-full flex items-center justify-center gap-2 group rounded-xl font-bold text-sm text-white transition-all active:scale-[0.97] disabled:opacity-60 shadow-md"
                                    style={{
                                        minHeight: 48,
                                        background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                                        boxShadow: "0 4px 16px rgba(234,88,12,0.4)",
                                    }}
                                >
                                    {isLoading
                                        ? <Loader2 className="w-5 h-5 animate-spin" />
                                        : <>
                                            {isLogin ? "Sign In" : "Create Account"}
                                            <ArrowRight className="w-4 h-4 group-active:translate-x-0.5 transition-transform" />
                                          </>
                                    }
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-3.5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 text-[11px] text-slate-400 bg-white">
                                    {isLogin ? "New to Dak Guru?" : "Already a member?"}
                                </span>
                            </div>
                        </div>

                        {/* ── Secondary CTA ── */}
                        <button
                            type="button"
                            onClick={resetForm}
                            className="login-btn w-full flex items-center justify-center gap-2 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.97] shadow-md"
                            style={{
                                minHeight: 48,
                                background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
                                boxShadow: "0 4px 16px rgba(13,148,136,0.35)",
                            }}
                        >
                            {isLogin ? "Create an account" : "Sign in instead"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* ── Footer ── */}
                    <div
                        className="flex items-center justify-center px-4 py-2"
                        style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}
                    >
                        <span className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">
                            Learn · Practice · Succeed
                        </span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<PremiumLoader />}>
            <AuthForm />
        </Suspense>
    );
}
