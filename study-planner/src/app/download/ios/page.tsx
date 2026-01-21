"use client";

import React from "react";
import { Apple, Smartphone, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IosDownloadPage() {
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
                    className="max-w-md w-full text-center"
                >
                    {/* Glowing Logo Container */}
                    <div className="relative mx-auto mb-10 w-28 h-28 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-500 to-white opacity-20 blur-2xl rounded-full"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-b from-zinc-800 to-black rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-xl">
                            <Apple className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
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

                    <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                        <p>
                            <span className="text-white font-medium">Dak Guru</span> has completed the syllabus and mock tests,
                        </p>
                        <p>
                            but App Store admission fees are still under evaluation <span className="text-xl">😄</span>
                        </p>

                        <div className="py-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                </motion.div>
                                <span className="text-sm font-medium text-zinc-300">We’ll clear this stage soon.</span>
                            </div>
                        </div>

                        <p className="font-medium text-white">
                            Thank you for waiting!
                        </p>
                    </div>

                    <div className="mt-12">
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
