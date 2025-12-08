"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface UserSession {
    name: string;
    email: string;
}

export default function SettingsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [currentEmail, setCurrentEmail] = useState("");

    useEffect(() => {
        // Load initial data from cookie
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                const session: UserSession = JSON.parse(decoded);
                setFormData({ name: session.name || "", email: session.email || "" });
                setCurrentEmail(session.email || "");
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentEmail,
                    ...formData
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update profile");
            }

            setMessage({ type: 'success', text: "Profile updated successfully!" });
            setCurrentEmail(formData.email); // Update current email reference
            router.refresh(); // Refresh to update server components/middleware checking

            // Optional: Reload page to reflect changes in global nav immediately if strictly needed, 
            // but router.refresh() + cookie update might be enough. 
            // A full reload ensures client-side 'UserMenu' re-reads the cookie freshly in its useEffect.
            window.location.reload();

        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setMessage({ type: 'error', text: (err as any).message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/planner"
                    className="inline-flex items-center text-sm text-zinc-500 hover:text-blue-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Account Settings</h1>
                            <p className="text-zinc-500 dark:text-zinc-400">Manage your profile information</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
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
                                    onChange={handleChange}
                                    className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`text-sm text-center py-2 rounded-lg animate-in fade-in slide-in-from-top-2 ${message.type === 'success'
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
            </div>
        </div>
    );
}
