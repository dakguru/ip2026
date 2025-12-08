"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Lock, User, ArrowRight, Loader2, Mail, UserPlus } from "lucide-react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

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
                setFormData(prev => ({ ...prev, password: "" })); // Clear password
                // Optional: show success message
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 shadow-2xl rounded-3xl p-8 md:p-10">

                    <div className="text-center mb-10">
                        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-blue-600/20 mb-6 border-2 border-white dark:border-zinc-700 overflow-hidden transform hover:scale-105 transition-transform bg-white">
                            <Image src="/logo.jpg" alt="Logo" width={80} height={80} className="object-cover" />
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            {isLogin ? "Welcome to Vidyālaya Academy" : "Create Account"}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {isLogin
                                ? "Enter your credentials"
                                : "Join to start tracking your study progress"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {!isLogin && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                Email
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/25 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                    setFormData({ name: "", email: "", password: "" });
                                }}
                                className="text-blue-600 hover:text-blue-500 font-semibold hover:underline bg-transparent border-none cursor-pointer ml-1"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-zinc-400 text-sm flex items-center justify-center gap-2">
                    <div className="px-2 py-1 bg-green-500/10 text-green-600 rounded text-xs font-medium border border-green-500/20">
                        v1.0.0
                    </div>
                    <span>Advanced Preparation Master</span>
                </div>
            </div>
        </div>
    );
}
