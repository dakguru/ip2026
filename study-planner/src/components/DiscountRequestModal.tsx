import React, { useState, useEffect } from 'react';
import { X, Send, Gift, Sparkles, Loader2 } from 'lucide-react';

interface DiscountRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail?: string | null;
    userName?: string | null;
    userMobile?: string | null;
}

export const DiscountRequestModal = ({ isOpen, onClose, userEmail, userName, userMobile }: DiscountRequestModalProps) => {
    const [formData, setFormData] = useState({
        name: userName || '',
        mobile: userMobile || '',
        email: userEmail || ''
    });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Update form when props change
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            email: userEmail || prev.email,
            name: userName || prev.name,
            mobile: userMobile || prev.mobile
        }));
    }, [userEmail, userName, userMobile]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.mobile || !formData.email) {
            setError("All fields are required.");
            return;
        }

        setSending(true);

        try {
            // We use the existing DM API to send these details to Admin
            const messageBody = `LAUNCH OFFER REQUEST (50% OFF):
            
Name: ${formData.name}
Mobile: ${formData.mobile}
Email: ${formData.email}

Please send the discount code to this user.`;

            const res = await fetch('/api/dm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageBody,
                    userName: formData.name,
                    userEmail: formData.email
                })
            });

            if (res.ok) {
                setSuccess(true);
                // Auto close after 5 seconds or let user close
            } else {
                const data = await res.json();
                setError(data.error || "Failed to submit request.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md shadow-2xl border-2 border-yellow-400/50 overflow-hidden scale-100 animate-in zoom-in-95 duration-200 relative"
            >

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>

                {/* Header */}
                <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 relative z-20">
                    <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
                        <Gift className="w-5 h-5 fill-yellow-400" />
                        <h3 className="font-bold text-lg">Claim Launch Offer</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-zinc-400 hover:text-zinc-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 relative z-10">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in slide-in-from-bottom-4">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200">
                                <Sparkles className="w-10 h-10 fill-current" />
                            </div>
                            <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Request Sent!</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                The discount code will be sent to your email
                                <span className="block font-semibold text-blue-600 mt-1">{formData.email}</span>
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-6 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                                Please provide your details. Valid for the <span className="font-bold text-orange-600">First 50 Subscribers</span> only!
                            </p>

                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 ml-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!!userName}
                                    className={`w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all
                                        ${userName ? 'opacity-70 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800' : ''}
                                    `}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 ml-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    disabled={!!userMobile}
                                    className={`w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all
                                        ${userMobile ? 'opacity-70 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800' : ''}
                                    `}
                                    placeholder="Enter mobile number"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 ml-1">
                                    Email ID
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!!userEmail}
                                    className={`w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all
                                        ${userEmail ? 'opacity-70 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800' : ''}
                                    `}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {error && <p className="text-xs text-red-500 font-bold text-center">{error}</p>}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="flex-[2] py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 disabled:opacity-70 disabled:grayscale transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    {sending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Wait...
                                        </>
                                    ) : (
                                        <>
                                            Get Code <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
