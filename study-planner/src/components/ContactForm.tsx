"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
                <input
                    name="firstName"
                    required
                    type="text"
                    placeholder="First Name"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                />
                <input
                    name="lastName"
                    required
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                />
            </div>

            <input
                name="email"
                required
                type="email"
                placeholder="Email Address"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
            />

            <div className="flex gap-3">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 flex items-center justify-center min-w-[80px]">
                    🇮🇳 +91
                </div>
                <input
                    name="mobile"
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                />
            </div>

            <textarea
                name="message"
                required
                placeholder="How can we help you?"
                rows={4}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500 resize-none"
            ></textarea>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLoading ? "Sending Message..." : "Send Message"}
            </button>

            {status === "success" && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                    Message sent successfully! We'll allow you to know shortly.
                </div>
            )}
            {status === "error" && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                    Something went wrong. Please try again.
                </div>
            )}
        </form>
    );
}
