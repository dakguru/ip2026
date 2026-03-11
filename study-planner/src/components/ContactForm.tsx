"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    // Pre-fill state for logged-in users
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Fetch logged-in user details on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    const user = data.user;
                    if (user) {
                        const nameParts = (user.name || "").trim().split(/\s+/);
                        setFirstName(nameParts[0] || "");
                        setLastName(nameParts.slice(1).join(" ") || "");
                        setEmail(user.email || "");
                        setMobile(user.mobile || "");
                        setIsLoggedIn(true);
                    }
                }
            } catch {
                // Not logged in — leave fields empty
            }
        };
        fetchUser();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            mobile: formData.get("mobile"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    }

    const inputClasses = "w-full py-3 px-3.5 md:p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm md:text-base outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500";
    const lockedClasses = "w-full py-3 px-3.5 md:p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-slate-300 text-sm md:text-base outline-none cursor-not-allowed opacity-70";

    return (
        <form onSubmit={handleSubmit} className="space-y-3.5 md:space-y-5">
            <div className="grid grid-cols-2 gap-3 md:gap-5">
                <input
                    name="firstName"
                    required
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => !isLoggedIn && setFirstName(e.target.value)}
                    readOnly={isLoggedIn}
                    className={isLoggedIn && firstName ? lockedClasses : inputClasses}
                />
                <input
                    name="lastName"
                    required
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => !isLoggedIn && setLastName(e.target.value)}
                    readOnly={isLoggedIn}
                    className={isLoggedIn && lastName ? lockedClasses : inputClasses}
                />
            </div>

            <input
                name="email"
                required
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => !isLoggedIn && setEmail(e.target.value)}
                readOnly={isLoggedIn}
                className={isLoggedIn && email ? lockedClasses : inputClasses}
            />

            <div className="flex gap-2.5 md:gap-3">
                <div className="py-3 px-3 md:p-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 flex items-center justify-center min-w-[68px] md:min-w-[80px] text-sm md:text-base">
                    🇮🇳 +91
                </div>
                <input
                    name="mobile"
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => !isLoggedIn && setMobile(e.target.value)}
                    readOnly={isLoggedIn}
                    className={`flex-1 ${isLoggedIn && mobile ? lockedClasses : inputClasses}`}
                />
            </div>

            <textarea
                name="message"
                required
                placeholder="How can we help you?"
                rows={3}
                className={`${inputClasses} resize-none`}
            ></textarea>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm md:text-base rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLoading ? "Sending Message..." : "Send Message"}
            </button>

            {status === "success" && (
                <div className="p-2.5 md:p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs md:text-sm font-medium text-center">
                    Message sent successfully! We&apos;ll get back to you shortly.
                </div>
            )}
            {status === "error" && (
                <div className="p-2.5 md:p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm font-medium text-center">
                    Something went wrong. Please try again.
                </div>
            )}
        </form>
    );
}
