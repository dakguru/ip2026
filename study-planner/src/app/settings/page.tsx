"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Save, Loader2, ArrowLeft, Phone, MapPin, Building, Briefcase, Hash, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

    useEffect(() => {
        fetchProfile();
    }, []);

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
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-zinc-500 hover:text-blue-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Account Settings</h1>
                            <p className="text-zinc-500 dark:text-zinc-400">Manage your profile and preferences.</p>
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
            </div>

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
