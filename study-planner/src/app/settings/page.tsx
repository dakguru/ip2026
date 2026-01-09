"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Save, Loader2, ArrowLeft, Phone, MapPin, Building, Briefcase, Hash, Calendar, Shield, Crown, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { generateStudyPlan } from "@/lib/planner";
import { useIsMobileApp } from "@/hooks/use-mobile-app";

const EXAM_OPTIONS = [
    "CE for GDS to PA/SA",
    "LDCE - PA/SA",
    "LDCE - PM/MG",
    "LDCE - IP",
    "LDCE - PS Gr 'B'"
];

export default function SettingsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Initial Data Snapshot to check changes against
    const [initialData, setInitialData] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        examPreparingFor: "",
        dateOfJoining: ""
    });

    // OTP State
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [verificationStep, setVerificationStep] = useState(false);

    // Password State
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    // Progress Data for Dashboard
    const [progressData, setProgressData] = useState<Record<string, any>>({});
    const [studyPlan, setStudyPlan] = useState<any[]>([]);
    const isMobileApp = useIsMobileApp();

    useEffect(() => {
        fetchProfile();
        // Load Progress
        const savedProgress = localStorage.getItem('ldce2026_progress');
        if (savedProgress) {
            setProgressData(JSON.parse(savedProgress));
        }
        // Load Plan
        setStudyPlan(generateStudyPlan());
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                const user = data.user;
                const userData = {
                    name: user.name || "",
                    email: user.email || "",
                    mobile: user.mobile || "",
                    examPreparingFor: user.examPreparingFor || "",
                    dateOfJoining: user.dateOfJoining ? new Date(user.dateOfJoining).toISOString().split('T')[0] : ""
                };
                setFormData(userData);
                setInitialData(userData);
            } else {
                // If fetching profile fails (likely auth error or manual cookie edit), redirect to login
                // router.push("/login");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage(null);
    };

    const initiateSave = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage({ type: 'error', text: "Please enter a valid email address." });
            return;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setMessage({ type: 'error', text: "Please enter a valid 10-digit mobile number." });
            return;
        }
        if (formData.mobile === "1234567890" || formData.mobile === "0000000000") {
            setMessage({ type: 'error', text: "Please enter a valid, real mobile number." });
            return;
        }

        // Check if sensitive fields changed
        const emailChanged = formData.email !== initialData.email;
        const mobileChanged = formData.mobile !== initialData.mobile;

        if (emailChanged || mobileChanged) {
            // Trigger OTP
            const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(mockOtp);
            setShowOtpModal(true);
            setVerificationStep(true);
            // In a real app, send OTP to the NEW email/mobile here
            // For now, alert it
            alert(`OTP for verification (sent to new details): ${mockOtp}`);
        } else {
            // Safe to save directly
            saveProfile();
        }
    };

    const verifyAndSave = () => {
        if (otp === generatedOtp) {
            setShowOtpModal(false);
            setVerificationStep(false);
            setOtp("");
            saveProfile();
        } else {
            alert("Invalid OTP");
        }
    };

    const saveProfile = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentEmail: initialData.email, // Use initial email to identify user
                    ...formData
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update profile");
            }

            setMessage({ type: 'success', text: "Profile updated successfully!" });
            setInitialData(formData);

            // Refresh logic
            router.refresh();
            // Optional: Force reload to update global state if key identifiers changed
            if (formData.email !== initialData.email || formData.name !== initialData.name) {
                window.location.reload();
            }

        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setMessage({ type: 'error', text: (err as any).message });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        setPasswordMessage(null);
    };

    const savePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage(null);

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage({ type: 'error', text: "New passwords do not match" });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: "Password must be at least 6 characters" });
            return;
        }

        setIsPasswordLoading(true);
        try {
            const res = await fetch("/api/user/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to change password");
            }

            setPasswordMessage({ type: 'success', text: "Password changed successfully!" });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });

        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setPasswordMessage({ type: 'error', text: (err as any).message });
        } finally {
            setIsPasswordLoading(false);
        }
    };

    if (!initialData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 relative">
            <div className="max-w-3xl mx-auto space-y-8">
                {!isMobileApp && (
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-zinc-500 hover:text-blue-600 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                )}

                {/* Mobile Header (App View) */}
                {isMobileApp && (
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">My Profile</h1>
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center">
                                <User className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                            </div>
                        </div>
                    </div>
                )}

                {/* 1. Progress Dashboard (Embedded) */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                        My Progress
                    </h2>
                    <AnalyticsDashboard plan={studyPlan} progress={progressData} />
                </div>

                {/* 2. Membership Card */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Current Membership</p>
                                <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                    {formData.email ? (initialData?.membershipLevel === 'gold' ? 'GOLD PLAN' : initialData?.membershipLevel === 'silver' ? 'SILVER PLAN' : 'FREE TIER') : 'LOADING...'}
                                </h3>
                            </div>
                            <div className={`p-3 rounded-2xl ${initialData?.membershipLevel === 'gold' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-zinc-800 text-zinc-400'}`}>
                                <Crown className="w-6 h-6 fill-current" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-zinc-300 mb-6">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span>Valid until: Sep 2026</span>
                            </div>
                        </div>

                        {initialData?.membershipLevel !== 'gold' && (
                            <Link href="/pricing" className="block w-full bg-white text-black font-bold py-3.5 rounded-xl text-center hover:bg-zinc-200 transition-colors">
                                Upgrade Plan
                            </Link>
                        )}
                    </div>
                </div>

                {/* 3. Account Settings */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Personal Details</h1>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Update your basic information.</p>
                        </div>
                    </div>

                    <form onSubmit={initiateSave} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2 col-span-1 md:col-span-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400"><User className="w-5 h-5" /></div>
                                    <input
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400"><Mail className="w-5 h-5" /></div>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Mobile Number</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400"><Phone className="w-5 h-5" /></div>
                                    <input
                                        name="mobile"
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Exam Preparing For */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Exam Preparing for</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400"><Briefcase className="w-5 h-5" /></div>
                                    <select
                                        name="examPreparingFor"
                                        value={formData.examPreparingFor}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500 transition-all appearance-none"
                                        required
                                    >
                                        <option value="">Select Exam</option>
                                        {EXAM_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Date of Joining */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Date of Joining in DOP</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400"><Calendar className="w-5 h-5" /></div>
                                    <input
                                        name="dateOfJoining"
                                        type="date"
                                        value={formData.dateOfJoining}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        {message && (
                            <div className={`text-sm text-center py-3 rounded-xl animate-in fade-in slide-in-from-top-2 ${message.type === 'success'
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                : 'bg-red-50 dark:bg-red-900/20 text-red-500'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/25 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Password Change Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Hash className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Security</h1>
                            <p className="text-zinc-500 dark:text-zinc-400">Update your password to keep your account secure.</p>
                        </div>
                    </div>

                    <form onSubmit={savePassword} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current Password */}
                            <div className="space-y-2 col-span-1 md:col-span-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Current Password</label>
                                <input
                                    name="currentPassword"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChangeInput}
                                    placeholder="Enter current password"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-purple-500 transition-all"
                                    required
                                />
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">New Password</label>
                                <input
                                    name="newPassword"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChangeInput}
                                    placeholder="Enter new password"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-purple-500 transition-all"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Confirm New Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChangeInput}
                                    placeholder="Confirm new password"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-purple-500 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {passwordMessage && (
                            <div className={`text-sm text-center py-3 rounded-xl animate-in fade-in slide-in-from-top-2 ${passwordMessage.type === 'success'
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                : 'bg-red-50 dark:bg-red-900/20 text-red-500'
                                }`}>
                                {passwordMessage.text}
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isPasswordLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-purple-600/25 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                            >
                                {isPasswordLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold py-4 rounded-3xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all flex items-center justify-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
            </div>

            {/* Bottom Padding for Mobile Nav */}
            <div className="h-20 md:hidden"></div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-bold mb-4">Security Verification</h2>
                        <p className="text-zinc-500 mb-6">
                            You have changed your contact details. Please enter the OTP sent to your new mobile/email to verify this change.
                        </p>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full text-center text-2xl tracking-widest font-bold border rounded-2xl p-4 uppercase"
                            />
                            <p className="text-xs text-center text-zinc-400">Demo OTP: {generatedOtp}</p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowOtpModal(false)}
                                    className="flex-1 py-3 rounded-xl font-semibold border hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={verifyAndSave}
                                    className="flex-1 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Verify & Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
