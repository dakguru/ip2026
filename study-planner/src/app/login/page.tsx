"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { Lock, User, ArrowRight, Loader2, Mail, Phone, Eye, EyeOff } from "lucide-react";

function AuthForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        gender: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (searchParams.get("mode") === "signup") {
            setIsLogin(false);
        }
        if (searchParams.get("reason") === "session_expired") {
            setError("Your session has expired. Please sign in again.");
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Basic Signup Validation
        if (!isLogin) {
            if (!formData.gender) {
                setError("Please select a gender.");
                setIsLoading(false);
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError("Password not matching reenter");
                setIsLoading(false);
                return;
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError("Please enter a valid email address.");
                setIsLoading(false);
                return;
            }

            // Mobile Validation
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(formData.mobile)) {
                setError("Please enter a valid 10-digit mobile number.");
                setIsLoading(false);
                return;
            }
            if (formData.mobile === "1234567890" || formData.mobile === "0000000000") {
                setError("Please enter a valid, real mobile number.");
                setIsLoading(false);
                return;
            }
        }

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            if (isLogin) {
                router.push("/");
                router.refresh();
            } else {
                // Switch to login mode after successful signup
                setIsLogin(true);
                setError("");
                setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
                alert("Account created! Please sign in.");
            }
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((err as any).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white relative overflow-hidden">

            {/* Colorful Background Gradient */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>


            <div className={`w-full max-w-sm relative z-10 animate-in fade-in zoom-in-95 duration-500`}>
                <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl p-6 sm:p-8">

                    <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-blue-600/20 mb-4 border-2 border-white overflow-hidden bg-white">
                            <Image src="/dak-guru-new-logo.png" alt="Logo" width={80} height={80} className="object-cover" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {isLogin ? "Welcome to Dak Guru" : "Create Account"}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {isLogin
                                ? "Enter your credentials"
                                : "Explore Dak Guru"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {!isLogin && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-600 ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-gray-900 text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>


                                {/* Gender Selection */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-600 ml-1">
                                        Gender
                                    </label>
                                    <div className="flex items-center gap-4 px-1">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.gender === 'Male' ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                                {formData.gender === 'Male' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                            </div>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={formData.gender === 'Male'}
                                                onChange={handleInputChange}
                                                className="hidden"
                                                required
                                            />
                                            <span className="text-sm text-gray-700">Male</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.gender === 'Female' ? 'border-pink-600' : 'border-gray-300 group-hover:border-pink-400'}`}>
                                                {formData.gender === 'Female' && <div className="w-2 h-2 rounded-full bg-pink-600" />}
                                            </div>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={formData.gender === 'Female'}
                                                onChange={handleInputChange}
                                                className="hidden"
                                                required
                                            />
                                            <span className="text-sm text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Mobile No */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-600 ml-1">
                                        Mobile No.
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <input
                                            name="mobile"
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-gray-900 text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                            placeholder="9876543210"
                                            required
                                            minLength={10}
                                            maxLength={10}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-600 ml-1">
                                        Email ID
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-gray-900 text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-600 ml-1">
                                {isLogin ? "Email" : "Password"}
                            </label>

                            {isLogin ? (
                                <div className="relative group">
                                    <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 text-base outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            ) : (
                                <>
                                    <label className="text-xs font-semibold text-gray-600 ml-1 mt-2 block">
                                        Create Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-10 text-gray-900 text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <label className="text-xs font-semibold text-gray-600 ml-1 mt-2 block">
                                        Confirm Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-gray-900 text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-600 ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-gray-900 text-base outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="text-right">
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-500 hover:underline inline-block px-1"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-xs text-center bg-red-50 py-2 rounded-lg animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 group mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-500">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                    setFormData({ name: "", email: "", password: "", mobile: "", gender: "", confirmPassword: "" });

                                }}
                                className="text-blue-600 hover:text-blue-500 font-bold hover:underline bg-transparent border-none cursor-pointer ml-1"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div >

                <div className="mt-8 text-center text-gray-400 text-xs flex items-center justify-center gap-2">
                    <span className="opacity-70">Learn, Practice, Succeed</span>
                </div>
            </div >
        </div >
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
            <AuthForm />
        </Suspense>
    );
}
