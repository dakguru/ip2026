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

/* ─────────────────────────────────────────
   Shared font import
───────────────────────────────────────── */
const stampStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Inter', sans-serif; }
`;

/* ─────────────────────────────────────────
   Shared input / label styles
───────────────────────────────────────── */
const inputCls =
    "w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-9 pr-4 " +
    "text-slate-800 text-sm outline-none focus:ring-2 focus:ring-orange-400/50 " +
    "focus:border-orange-400 transition-all placeholder:text-slate-400";

const labelCls = "block text-xs font-semibold text-slate-500 mb-1 ml-0.5";

/* ─────────────────────────────────────────
   Main Auth Form
───────────────────────────────────────── */
function AuthForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setCourse } = useCourse();

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", mobile: "",
        gender: "", courseMode: "", confirmPassword: "", website: "",
    });

    useEffect(() => {
        if (searchParams.get("mode") === "signup") setIsLogin(false);
        if (searchParams.get("reason") === "session_expired")
            setError("Your session has expired. Please sign in again.");
        if (searchParams.get("reason") === "multiple_login")
            setError("Signed out — your account was used on another device.");
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
            if (!formData.gender)       { setError("Please select your gender.");         setIsLoading(false); return; }
            if (!formData.courseMode)   { setError("Please select a preparation mode.");  setIsLoading(false); return; }
            if (formData.password !== formData.confirmPassword) { setError("Passwords do not match."); setIsLoading(false); return; }
            if (!turnstileToken)        { setError("Please complete the security check."); setIsLoading(false); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError("Enter a valid email."); setIsLoading(false); return; }
            if (!/^[0-9]{10}$/.test(formData.mobile))               { setError("Enter a valid 10-digit mobile number."); setIsLoading(false); return; }
        }

        try {
            const res = await fetch(isLogin ? "/api/auth/login" : "/api/auth/signup", {
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
                router.push("/");
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
            <style>{stampStyles}</style>

            {/* ── Page background ── */}
            <div
                className="min-h-screen flex items-center justify-center px-5 py-10"
                style={{ background: 'linear-gradient(150deg, #fff8ec 0%, #fef3c7 50%, #fdf4e3 100%)' }}
            >
                {/* ── Stamp Card ──
                     Clean layered border:
                     amber fill → 1px white inset line → warm drop shadow
                */}
                <div
                    className="w-full"
                    style={{
                        maxWidth: isLogin ? 400 : 460,
                        /* Amber border (6px) + 1px white inner rule + deep shadow */
                        border: '6px solid #e8930a',
                        borderRadius: '14px',
                        outline: '2px solid rgba(255,255,255,0.85)',
                        outlineOffset: '-9px',
                        boxShadow:
                            '0 24px 60px rgba(0,0,0,0.2), ' +
                            '0 6px 18px rgba(232,147,10,0.35)',
                        overflow: 'hidden',
                        background: 'white',
                    }}
                >


                    {/* Inner white surface */}
                    <div className="rounded-xl overflow-hidden bg-white">

                        {/* ── Stamp Header ── */}
                        <div
                            className="relative px-6 pt-6 pb-5 text-center"
                            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c75 100%)" }}
                        >
                            {/* Stamp badge row */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[9px] font-black tracking-[0.35em] text-amber-300 uppercase opacity-80">
                                    Dak Guru
                                </span>
                                <span className="text-[9px] font-black tracking-[0.3em] text-amber-300 opacity-80">
                                    2026
                                </span>
                            </div>

                            {/* Logo */}
                            <Link href="/">
                                <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden ring-2 ring-amber-400/70 ring-offset-2 ring-offset-[#1e3a5f] hover:scale-105 transition-transform">
                                    <Image src="/dak-guru-new-logo.png" alt="Dak Guru" width={64} height={64} className="object-cover" />
                                </div>
                            </Link>

                            <h1 className="text-white font-bold text-lg leading-tight">
                                {isLogin ? "Welcome to Dak Guru" : "Create Your Account"}
                            </h1>
                            <p className="text-amber-200/70 text-xs mt-0.5 tracking-wide">
                                {isLogin ? "Sign in to continue" : "Start your preparation journey"}
                            </p>

                            {/* Decorative bottom wave */}
                            <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                                <svg viewBox="0 0 400 12" className="w-full" preserveAspectRatio="none">
                                    <path d="M0,6 C100,12 300,0 400,6 L400,12 L0,12 Z" fill="white" />
                                </svg>
                            </div>
                        </div>

                        {/* ── Form Body ── */}
                        <div className="px-6 pt-4 pb-6">

                            <form onSubmit={handleSubmit} className="space-y-3.5">

                                {/* Signup-only fields */}
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
                                                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                                <input name="name" type="text" value={formData.name} onChange={handle}
                                                    className={inputCls} placeholder="Your full name" required />
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <label className={labelCls}>Gender <span className="text-red-500">*</span></label>
                                            <div className="flex gap-6 mt-1">
                                                {["Male", "Female"].map(g => (
                                                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                                            ${formData.gender === g ? "border-orange-500" : "border-slate-300"}`}>
                                                            {formData.gender === g && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                                                        </div>
                                                        <input type="radio" name="gender" value={g} checked={formData.gender === g}
                                                            onChange={handle} className="hidden" />
                                                        <span className="text-sm text-slate-700">{g}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Preparation Mode */}
                                        <div>
                                            <label className={labelCls}>Preparation Mode <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                                <select name="courseMode" value={formData.courseMode} onChange={handle}
                                                    className={`${inputCls} pr-9 appearance-none cursor-pointer ${!formData.courseMode ? "text-slate-400" : "text-slate-800"}`} required>
                                                    <option value="" disabled>Select your exam</option>
                                                    <option value="LDCE_IP">LDCE IP Exam</option>
                                                    <option value="PS_GR_B">PS Group &apos;B&apos; Exam</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label className={labelCls}>Mobile No. <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                                <input name="mobile" type="tel" value={formData.mobile} onChange={handle}
                                                    className={inputCls} placeholder="10-digit mobile number" required minLength={10} maxLength={10} />
                                            </div>
                                        </div>

                                        {/* Email (signup) */}
                                        <div>
                                            <label className={labelCls}>Email ID <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                                <input name="email" type="email" value={formData.email} onChange={handle}
                                                    className={inputCls} placeholder="name@example.com" required />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Email (login) */}
                                {isLogin && (
                                    <div>
                                        <label className={labelCls}>Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                            <input name="email" type="email" value={formData.email} onChange={handle}
                                                className={inputCls} placeholder="name@example.com" required />
                                        </div>
                                    </div>
                                )}

                                {/* Password */}
                                <div>
                                    <label className={labelCls}>
                                        {isLogin ? "Password" : "Create Password"} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                        <input name="password" type={showPassword ? "text" : "password"}
                                            value={formData.password} onChange={handle}
                                            className={`${inputCls} pr-10`} placeholder="••••••••" required minLength={6} />
                                        <button type="button" onClick={() => setShowPassword(p => !p)}
                                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {isLogin && (
                                        <div className="text-right mt-1">
                                            <Link href="/forgot-password" className="text-xs font-semibold text-orange-600 hover:underline">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password (signup) */}
                                {!isLogin && (
                                    <div>
                                        <label className={labelCls}>Confirm Password <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                            <input name="confirmPassword" type="password" value={formData.confirmPassword}
                                                onChange={handle} className={inputCls} placeholder="••••••••" required minLength={6} />
                                        </div>
                                    </div>
                                )}

                                {/* Turnstile (signup) */}
                                {!isLogin && (
                                    <div className="flex flex-col items-center pt-1">
                                        <Turnstile
                                            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                                            onVerify={token => setTurnstileToken(token)}
                                            theme="light"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-1 text-center">
                                            If the security widget doesn&apos;t appear, try disabling your ad blocker.
                                        </p>
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <div className="text-red-600 text-xs font-semibold text-center bg-red-50 border border-red-100 py-2 px-3 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                {/* Primary CTA */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 group py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 shadow-md mt-1"
                                    style={{ background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)", boxShadow: "0 6px 20px rgba(234,88,12,0.4)" }}
                                >
                                    {isLoading
                                        ? <Loader2 className="w-5 h-5 animate-spin" />
                                        : <>
                                            {isLogin ? "Sign In" : "Create Account"}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                          </>
                                    }
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-100" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-3 text-[11px] text-slate-400 bg-white">
                                        {isLogin ? "New to Dak Guru?" : "Already a member?"}
                                    </span>
                                </div>
                            </div>

                            {/* Secondary CTA */}
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full flex items-center justify-center gap-2 group py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                                style={{ background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)", boxShadow: "0 6px 20px rgba(13,148,136,0.35)" }}
                            >
                                {isLogin ? "Create an account" : "Sign in instead"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        {/* ── Stamp Footer ── */}
                        <div
                            className="flex items-center justify-center px-6 py-2 gap-2"
                            style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}
                        >
                            <span className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">
                                Learn · Practice · Succeed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-amber-50">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <AuthForm />
        </Suspense>
    );
}
