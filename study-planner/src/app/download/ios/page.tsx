"use client";

import React from "react";
import { Apple, Smartphone, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function IosDownloadPage() {
    const [interestCount, setInterestCount] = React.useState<number>(0);
    const [hasVoted, setHasVoted] = React.useState<boolean>(false);
    const [isVoting, setIsVoting] = React.useState<boolean>(false);

    React.useEffect(() => {
        // Fetch initial count
        fetch('/api/ios-interest')
            .then(res => res.json())
            .then(data => {
                if (data.count !== undefined) {
                    setInterestCount(data.count);
                }
            })
            .catch(err => console.error("Failed to fetch count", err));

        // Check local storage
        if (typeof window !== 'undefined') {
            const voted = localStorage.getItem('ios_interest_voted');
            if (voted) setHasVoted(true);
        }
    }, []);

    const handleVote = async () => {
        if (hasVoted || isVoting) return;
        setIsVoting(true);

        try {
            const res = await fetch('/api/ios-interest', { method: 'POST' });
            const data = await res.json();

            if (data.success) {
                setInterestCount(data.count);
                setHasVoted(true);
                localStorage.setItem('ios_interest_voted', 'true');
            }
        } catch (error) {
            console.error("Failed to register vote", error);
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden relative font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute top-[20%] left-[20%] w-[200px] h-[200px] bg-white/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

                {/* Back Button */}
                <Link href="/" className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/5 group">
                    <ArrowLeft className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl w-full text-center"
                >
                    {/* Glowing Logo Container */}
                    <div className="relative mx-auto mb-10 w-28 h-28 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-500 to-white opacity-20 blur-2xl rounded-full"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-b from-zinc-800 to-black rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-xl">
                            <Image
                                src="/apple-logo-grey.png"
                                alt="Apple Logo"
                                width={48}
                                height={48}
                                className="w-12 h-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] object-contain"
                            />
                        </div>
                        {/* Orbiting particles */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-white/5"
                        />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 mb-6 tracking-tight">
                        Dear Apple Aspirant,
                    </h1>

                    <div className="space-y-6 text-zinc-400 leading-relaxed text-lg mb-10">
                        <p>
                            <span className="text-white font-medium">Dak Guru</span> is ready. Our syllabus, MCQs, and All-India Mock Tests are already helping thousands of students on our Web and Android platforms.
                        </p>
                        <p>
                            However, launching a dedicated iOS app involves significant platform costs. At present, the limited number of active Apple users on our platform makes this financially unviable.
                        </p>
                        <p className="text-sm border-t border-white/10 pt-4 mt-4 text-zinc-500">
                            We are monitoring demand. Your interest helps us decide when to prioritize the App Store launch.
                        </p>
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={handleVote}
                            disabled={hasVoted || isVoting}
                            className={`
                                relative px-8 py-4 rounded-xl font-bold text-lg min-w-[300px] transition-all duration-300
                                ${hasVoted
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95'
                                }
                            `}
                        >
                            {isVoting ? (
                                <span className="animate-pulse">Recording...</span>
                            ) : hasVoted ? (
                                <span className="flex items-center justify-center gap-2">
                                    ✓ Interest Recorded ({interestCount})
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    👉 Show Your Interest <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-mono">({String(interestCount).padStart(2, '0')})</span>
                                </span>
                            )}
                        </button>

                        <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                            {hasVoted
                                ? "Thanks! Your interest has been recorded."
                                : "Once sufficient interest is reached, we’ll move forward with the App Store launch."
                            }
                        </p>
                    </div>

                    <div className="mt-16">
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium group">
                            <Smartphone className="w-4 h-4" />
                            <span>Continue learning on Web</span>
                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
