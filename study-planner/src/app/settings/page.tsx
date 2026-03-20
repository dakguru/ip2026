"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { User, Mail, Save, Loader2, ArrowLeft, Phone, MapPin, Building, Briefcase, Hash, Calendar, Shield, Crown, LogOut, ChevronRight, Target, Bell, MessageSquare, Send, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import UpdatesDrawer from "@/components/UpdatesDrawer";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import { useIsMobileApp } from "@/hooks/use-mobile-app";
import { useBetaAccess } from "@/hooks/useBetaAccess";
import { useCourse } from "@/contexts/CourseContext";
import { getDisplayMembership } from "@/lib/membership-utils";

const DESIGNATION_OPTIONS = [
    "Assistant Superintendent of Posts (ASP)",
    "Inspector of Posts (IP)",
    "Manager (Mail Motor Service)",
    "Junior Accounts Officer (JAO)",
    "Higher Selection Grade I (HSG-I)",
    "Higher Selection Grade II (HSG-II)",
    "Lower Selection Grade (LSG)",
    "Postal Assistant (PA)",
    "Sorting Assistant (SA)",
    "Postman",
    "Mail Guard",
    "Staff Car Driver",
    "Artisan (MMS)",
    "Multi-Tasking Staff (MTS)",
    "Branch Postmaster (BPM)",
    "Assistant Branch Postmaster (ABPM)",
    "Dak Sevak"
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
        dateOfJoining: "",
        courseMode: "LDCE_IP" as "LDCE_IP" | "PS_GR_B"
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

    const isMobileApp = useIsMobileApp();
    const hasBetaAccess = useBetaAccess();
    const { course, setCourse } = useCourse();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showUpdates, setShowUpdates] = useState(false);
    const [contactMessage, setContactMessage] = useState("");
    const [contactSending, setContactSending] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);
    const [contactError, setContactError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        const check = () => setIsMobileView(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            // Use ?logout=true to tell middleware to ignore any lingering tokens and force cookie deletion
            window.location.href = '/login?logout=true';
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
                    dateOfJoining: user.dateOfJoining ? new Date(user.dateOfJoining).toISOString().split('T')[0] : "",
                    courseMode: user.courseMode || "LDCE_IP",
                    membershipLevel: user.membershipLevel,
                    membershipValidity: user.membershipValidity,
                    planId: user.planId,
                    planName: user.planName
                };
                setFormData(userData as any);
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
        if (formData.mobile && !mobileRegex.test(formData.mobile)) {
            setMessage({ type: 'error', text: "Please enter a valid 10-digit mobile number." });
            return;
        }

        saveProfile();
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

    const membershipLevelActual = getDisplayMembership(initialData?.membershipLevel, initialData?.planName);

    const membershipLabel = membershipLevelActual.charAt(0).toUpperCase() + membershipLevelActual.slice(1);

    // ---- MOBILE PROFILE VIEW (Android App + Mobile Browser) ----
    if (isMobileView) {
        const sectionTitles: Record<string, string> = {
            profile: 'Manage Profile',
            security: 'Password & Security',
            course: 'Course Mode',
            membership: 'Membership',
            contact: 'Contact Us',
        };

        const MobileMenuItem = ({ icon: Icon, label, right, onClick, danger, iconBg, iconColor, last }: {
            icon: any; label: string; right?: string; onClick: () => void; danger?: boolean;
            iconBg?: string; iconColor?: string; last?: boolean;
        }) => (
            <button
                onClick={onClick}
                className={`w-full flex items-center gap-3.5 px-4 py-[13px] active:bg-zinc-50 dark:active:bg-zinc-800/50 transition-colors ${!last && !danger ? 'border-b border-zinc-50 dark:border-zinc-800/60' : ''}`}
            >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${danger ? 'bg-red-50 dark:bg-red-900/20' : iconBg || 'bg-zinc-100 dark:bg-zinc-800'}`}>
                    <Icon className={`w-[18px] h-[18px] ${danger ? 'text-red-500' : iconColor || 'text-zinc-600 dark:text-zinc-400'}`} />
                </div>
                <span className={`flex-1 text-left font-semibold text-[15px] ${danger ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'}`}>{label}</span>
                {right && <span className="text-[13px] text-zinc-400 dark:text-zinc-500 font-medium mr-0.5">{right}</span>}
                {!danger && <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />}
            </button>
        );


        // ... inside SettingsPage ...

        // ---- Sub-section view ----
        if (activeSection) {
            return (
                <AppScreenWrapper
                    hideStatusBarPadding={true}
                    header={
                        <div className="flex items-center gap-3">
                            <button onClick={() => setActiveSection(null)}
                                className="p-1.5 -ml-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                <ArrowLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                            </button>
                            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                {sectionTitles[activeSection] || 'Profile'}
                            </h1>
                        </div>
                    }
                >
                    <div className="px-5 py-6 pb-28">
                        {/* Manage Profile */}
                        {activeSection === 'profile' && (
                            <form onSubmit={initiateSave} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-3 w-5 h-5 text-zinc-400" />
                                        <input name="name" type="text" value={formData.name} onChange={handleChange}
                                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors text-[15px]" required />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-3 w-5 h-5 text-zinc-400" />
                                        <input name="email" type="email" value={formData.email} onChange={handleChange}
                                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors text-[15px]" required />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-3 w-5 h-5 text-zinc-400" />
                                        <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange}
                                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors text-[15px]" required />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">Designation</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3.5 top-3 w-5 h-5 text-zinc-400" />
                                        <select name="examPreparingFor" value={formData.examPreparingFor} onChange={handleChange}
                                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors appearance-none text-[15px]" required>
                                            <option value="">Select Designation</option>
                                            {DESIGNATION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">Date of Joining in DOP</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3.5 top-3 w-5 h-5 text-zinc-400" />
                                        <input name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange}
                                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors text-[15px]" required />
                                    </div>
                                </div>
                                {message && (
                                    <div className={`text-sm text-center py-3 rounded-xl ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
                                        {message.text}
                                    </div>
                                )}
                                <button type="submit" disabled={isLoading}
                                    className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold py-3.5 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
                                </button>
                            </form>
                        )}

                        {/* Password & Security */}
                        {activeSection === 'security' && (
                            <form onSubmit={savePassword} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">Current Password</label>
                                    <input name="currentPassword" type="password" value={passwordData.currentPassword}
                                        onChange={handlePasswordChangeInput} placeholder="Enter current password"
                                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors text-[15px]" required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">New Password</label>
                                    <input name="newPassword" type="password" value={passwordData.newPassword}
                                        onChange={handlePasswordChangeInput} placeholder="Enter new password"
                                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors text-[15px]" required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-1">Confirm New Password</label>
                                    <input name="confirmPassword" type="password" value={passwordData.confirmPassword}
                                        onChange={handlePasswordChangeInput} placeholder="Confirm new password"
                                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-500 transition-colors text-[15px]" required />
                                </div>
                                {passwordMessage && (
                                    <div className={`text-sm text-center py-3 rounded-xl ${passwordMessage.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
                                        {passwordMessage.text}
                                    </div>
                                )}
                                <button type="submit" disabled={isPasswordLoading}
                                    className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold py-3.5 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                                    {isPasswordLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> Update Password</>}
                                </button>
                            </form>
                        )}

                        {/* Course Mode */}
                        {activeSection === 'course' && (
                            <div className="space-y-4">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Switch between exam categories. This changes the content across the app.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={async () => {
                                        setCourse('LDCE_IP');
                                        setFormData(prev => ({ ...prev, courseMode: 'LDCE_IP' }));
                                        // Immediately update DB to ensure admin sees the change
                                        await fetch("/api/user/update", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ currentEmail: initialData.email, courseMode: 'LDCE_IP' }),
                                        });
                                    }}
                                        className={`relative p-4 rounded-2xl border-2 transition-all text-left ${course === 'LDCE_IP'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/20'
                                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'}`}>
                                        {course === 'LDCE_IP' && <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>}
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100">LDCE IP</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Inspector Posts 2026</p>
                                    </button>
                                    <button onClick={async () => {
                                        setCourse('PS_GR_B');
                                        setFormData(prev => ({ ...prev, courseMode: 'PS_GR_B' }));
                                        // Immediately update DB to ensure admin sees the change
                                        await fetch("/api/user/update", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ currentEmail: initialData.email, courseMode: 'PS_GR_B' }),
                                        });
                                    }}
                                        className={`relative p-4 rounded-2xl border-2 transition-all text-left ${course === 'PS_GR_B'
                                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500/20'
                                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'}`}>
                                        {course === 'PS_GR_B' && <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></span>}
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100">PS Group B</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">PS Group B Exam</p>
                                    </button>
                                </div>
                                <button
                                    onClick={() => router.push('/')}
                                    className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
                                >
                                    Change Course Mode & Go to Home
                                </button>
                            </div>
                        )}

                        {/* Membership */}
                        {activeSection === 'membership' && (
                            <div className="space-y-5">
                                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-12 -mt-12"></div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Current Membership</p>
                                                <h3 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                                    {membershipLabel.toUpperCase()} {membershipLabel === 'Free' ? 'TIER' : 'PLAN'}
                                                </h3>
                                            </div>
                                            <div className={`p-2.5 rounded-xl ${membershipLevelActual === 'diamond'
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : membershipLevelActual === 'platinum'
                                                    ? 'bg-indigo-500/20 text-indigo-400'
                                                    : membershipLevelActual === 'gold'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-zinc-800 text-zinc-400'}`}>
                                                <Crown className="w-5 h-5 fill-current" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-zinc-300 mb-5">
                                            <Shield className="w-4 h-4 text-emerald-400" />
                                            <span>Valid until: {initialData?.membershipValidity ? format(new Date(initialData.membershipValidity), 'MMM yyyy') : 'Lifetime'}</span>
                                        </div>
                                        {initialData?.membershipLevel !== 'gold' && (
                                            <Link href="/pricing" className="block w-full bg-white text-black font-bold py-3 rounded-xl text-center text-sm">
                                                Upgrade Plan
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact Us */}
                        {activeSection === 'contact' && (
                            <div className="space-y-6">
                                {/* Hero Text */}
                                <div>
                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                        Let&apos;s Discuss Your{' '}
                                        <span className="text-blue-600 dark:text-blue-400">Preparation Strategy</span>
                                    </h2>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                                        Have questions about the syllabus, notes, or the planner? We are here to help you clear every doubt.
                                    </p>
                                </div>

                                {/* Contact Cards */}
                                <div className="space-y-3">
                                    <a href="mailto:admin@dakguru.com"
                                        className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 active:scale-[0.98] transition-transform">
                                        <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Email Us</p>
                                            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">admin@dakguru.com</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                                    </a>

                                    <a href="tel:+919363030396"
                                        className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 active:scale-[0.98] transition-transform">
                                        <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                                            <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Call Us</p>
                                            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">+91 93630 30396</p>
                                            <p className="text-xs text-zinc-400">Mon - Sat (10am - 6pm)</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                                    </a>

                                    <a href="https://wa.me/919363030396" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30 active:scale-[0.98] transition-transform">
                                        <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                            <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">WhatsApp</p>
                                            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Chat with us instantly</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-green-400 dark:text-green-600" />
                                    </a>
                                </div>

                                {/* Inline DM Form */}
                                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5">
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 text-[15px]">Send a Message</h3>
                                    <p className="text-xs text-zinc-400 mb-4">We&apos;ll get back to you within 24 hours.</p>

                                    {contactSuccess ? (
                                        <div className="flex flex-col items-center py-6 text-center">
                                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-3">
                                                <Send className="w-6 h-6" />
                                            </div>
                                            <p className="font-bold text-zinc-800 dark:text-zinc-100">Message Sent!</p>
                                            <p className="text-sm text-zinc-500 mt-1">We&apos;ll respond shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={async (e) => {
                                            e.preventDefault();
                                            if (!contactMessage.trim()) return;
                                            setContactSending(true);
                                            setContactError("");
                                            try {
                                                const res = await fetch('/api/dm', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        message: contactMessage,
                                                        userName: formData.name || 'User',
                                                        userEmail: formData.email || 'No Email'
                                                    })
                                                });
                                                if (res.ok) {
                                                    setContactSuccess(true);
                                                    setTimeout(() => { setContactSuccess(false); setContactMessage(""); }, 3000);
                                                } else {
                                                    setContactError("Failed to send. Please try again.");
                                                }
                                            } catch { setContactError("Something went wrong."); }
                                            finally { setContactSending(false); }
                                        }} className="space-y-3">
                                            <textarea
                                                value={contactMessage}
                                                onChange={(e) => setContactMessage(e.target.value)}
                                                className="w-full h-28 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-[15px] outline-none focus:border-zinc-500 transition-colors resize-none placeholder:text-zinc-400"
                                                placeholder="How can we help you?"
                                                required
                                            />
                                            {contactError && <p className="text-xs text-red-500 font-medium">{contactError}</p>}
                                            <button type="submit" disabled={contactSending || !contactMessage.trim()}
                                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-[15px]">
                                                {contactSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </AppScreenWrapper>
            );
        }

        // ---- Main Menu View ----
        return (
            <AppScreenWrapper showBottomNav={true} hideStatusBarPadding={true} className="min-h-0 h-[calc(100dvh-64px)] overflow-hidden">
                <div className="flex flex-col h-full w-full">
                    {/* Premium Profile Hero */}
                    <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 pt-[max(24px,env(safe-area-inset-top))] pb-10 px-5">
                    {/* Ambient Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="relative mb-4">
                            <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 p-[3px] shadow-xl shadow-indigo-500/30">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-violet-300">
                                        {formData.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>
                            {/* Membership Badge */}
                            <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-black px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1 z-20 whitespace-nowrap ${membershipLevelActual === 'gold'
                                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-yellow-950'
                                : membershipLevelActual === 'silver'
                                    ? 'bg-gradient-to-r from-zinc-300 to-zinc-400 text-zinc-800'
                                    : membershipLevelActual === 'diamond'
                                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-blue-950 shadow-blue-500/20'
                                        : membershipLevelActual === 'platinum'
                                            ? 'bg-gradient-to-r from-indigo-300 via-purple-300 to-white text-purple-950 shadow-purple-500/20'
                                            : 'bg-gradient-to-r from-zinc-600 to-zinc-500 text-zinc-100'
                                }`}>
                                <Crown className="w-3 h-3 fill-current" />
                                <span className="tracking-wider uppercase">{membershipLabel}</span>
                            </div>
                        </div>

                        {/* Name & Email */}
                        <h2 className="text-[22px] font-extrabold text-white tracking-tight mt-1">{formData.name || 'User'}</h2>
                        <p className="text-[13px] text-indigo-200/70 font-medium mt-1">{formData.email}</p>

                        {/* Quick Stats Row */}
                        <div className="flex items-center gap-3 mt-5">
                            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.07] border border-white/[0.08] backdrop-blur-sm">
                                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[11px] font-semibold text-zinc-300">
                                    {initialData?.membershipValidity ? `Till ${format(new Date(initialData.membershipValidity), 'MMM yyyy')}` : 'Active'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.07] border border-white/[0.08] backdrop-blur-sm">
                                <Target className="w-3.5 h-3.5 text-orange-400" />
                                <span className="text-[11px] font-semibold text-zinc-300">{course === 'PS_GR_B' ? 'PS Gr. B' : 'LDCE IP'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Sections - Scrollable Area */}
                <div className="px-4 -mt-5 relative z-20 space-y-4 pb-[80px] flex-1 overflow-y-auto w-full pt-1">

                    {/* Account Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                        <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-4 pt-4 pb-1.5">Account</p>
                        <MobileMenuItem icon={User} label="Manage Profile" onClick={() => setActiveSection('profile')}
                            iconBg="bg-blue-50 dark:bg-blue-900/20" iconColor="text-blue-600 dark:text-blue-400" />
                        <MobileMenuItem icon={Shield} label="Password & Security" onClick={() => setActiveSection('security')}
                            iconBg="bg-indigo-50 dark:bg-indigo-900/20" iconColor="text-indigo-600 dark:text-indigo-400" />
                        <MobileMenuItem icon={Bell} label="What's New" onClick={() => setShowUpdates(true)}
                            iconBg="bg-rose-50 dark:bg-rose-900/20" iconColor="text-rose-500 dark:text-rose-400" />
                        <MobileMenuItem icon={Target} label="Course Mode"
                            right={course === 'PS_GR_B' ? 'PS Gr. B' : 'LDCE IP'}
                            onClick={() => setActiveSection('course')}
                            iconBg="bg-orange-50 dark:bg-orange-900/20" iconColor="text-orange-600 dark:text-orange-400" last />
                    </div>

                    {/* Membership Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                        <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-4 pt-4 pb-1.5">Membership</p>
                        <MobileMenuItem icon={Crown} label="Current Plan" right={membershipLabel} onClick={() => setActiveSection('membership')}
                            iconBg={membershipLevelActual === 'diamond' ? 'bg-cyan-50 dark:bg-cyan-900/20' : membershipLevelActual === 'platinum' ? 'bg-indigo-50 dark:bg-indigo-900/20' : membershipLevelActual === 'gold' ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-zinc-100 dark:bg-zinc-800'}
                            iconColor={membershipLevelActual === 'diamond' ? 'text-cyan-600 dark:text-cyan-400' : membershipLevelActual === 'platinum' ? 'text-indigo-600 dark:text-indigo-400' : membershipLevelActual === 'gold' ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-400'} last />
                    </div>

                    {/* Support Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                        <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-4 pt-4 pb-1.5">Support</p>
                        <MobileMenuItem icon={MessageSquare} label="Contact Us" onClick={() => setActiveSection('contact')}
                            iconBg="bg-sky-50 dark:bg-sky-900/20" iconColor="text-sky-600 dark:text-sky-400" last />
                    </div>

                    {/* Logout Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                        <MobileMenuItem icon={LogOut} label="Log Out" onClick={handleLogout} danger last />
                    </div>

                    {/* App Version Footer */}
                    <div className="text-center pt-8 pb-4 mt-auto">
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-widest mb-1.5 opacity-60">Dak Guru App</p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium px-6 leading-relaxed mb-1.5">Carefully Crafted in India for Aspirants Who Aim Higher 🎯📚</p>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold">www.dakguru.com</p>
                    </div>
                </div>
                </div>
                <UpdatesDrawer isOpen={showUpdates} onClose={() => setShowUpdates(false)} />
            </AppScreenWrapper>
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

                {/* 2. Membership Card */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Current Membership</p>
                                <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                    {formData.email ? (`${membershipLabel.toUpperCase()} PLAN`) : 'LOADING...'}
                                </h3>
                            </div>
                            <div className={`p-3 rounded-2xl ${membershipLevelActual === 'diamond'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : membershipLevelActual === 'platinum'
                                    ? 'bg-indigo-500/20 text-indigo-400'
                                    : membershipLevelActual === 'gold'
                                        ? 'bg-yellow-500/20 text-yellow-400'
                                        : 'bg-zinc-800 text-zinc-400'}`}>
                                <Crown className="w-6 h-6 fill-current" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-zinc-300 mb-6">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span>Valid until: {initialData?.membershipValidity ? format(new Date(initialData.membershipValidity), 'MMM yyyy') : 'Lifetime'}</span>
                            </div>
                        </div>

                        {initialData?.membershipLevel !== 'gold' && (
                            <Link href="/pricing" className="block w-full bg-white text-black font-bold py-3.5 rounded-xl text-center hover:bg-zinc-200 transition-colors">
                                Upgrade Plan
                            </Link>
                        )}
                    </div>
                </div>

                {/* Course Mode Switcher */}
                {
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Course Mode</h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Switch between exam categories. This changes the content across the app.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={async () => {
                                    setCourse('LDCE_IP');
                                    setFormData(prev => ({ ...prev, courseMode: 'LDCE_IP' }));
                                    await fetch("/api/user/update", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ currentEmail: initialData.email, courseMode: 'LDCE_IP' }),
                                    });
                                }}
                                className={`relative p-4 rounded-2xl border-2 transition-all text-left ${course === 'LDCE_IP'
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/20'
                                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                                    }`}
                            >
                                {course === 'LDCE_IP' && (
                                    <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>
                                )}
                                <p className="font-bold text-zinc-900 dark:text-zinc-100">LDCE IP</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Inspector Posts 2026</p>
                            </button>

                            <button
                                onClick={async () => {
                                    setCourse('PS_GR_B');
                                    setFormData(prev => ({ ...prev, courseMode: 'PS_GR_B' }));
                                    await fetch("/api/user/update", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ currentEmail: initialData.email, courseMode: 'PS_GR_B' }),
                                    });
                                }}
                                className={`relative p-4 rounded-2xl border-2 transition-all text-left ${course === 'PS_GR_B'
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500/20'
                                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                                    }`}
                            >
                                {course === 'PS_GR_B' && (
                                    <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></span>
                                )}
                                <p className="font-bold text-zinc-900 dark:text-zinc-100">PS Group B</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">PS Group B Exam</p>
                            </button>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => router.push('/')}
                                className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                Change Course Mode & Go to Home
                            </button>
                        </div>
                    </div>
                }

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

                            {/* Designation */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Designation</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400"><Briefcase className="w-5 h-5" /></div>
                                    <select
                                        name="examPreparingFor"
                                        value={formData.examPreparingFor}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:border-blue-500 transition-all appearance-none"
                                        required
                                    >
                                        <option value="">Select Designation</option>
                                        {DESIGNATION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
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
            {
                showOtpModal && (
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
                )
            }
        </div >
    );
}
