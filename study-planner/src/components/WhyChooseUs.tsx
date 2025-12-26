"use client";

import { motion, Variants } from "framer-motion";
import { Shield, ClipboardCheck, Calendar, Brain, Layers, FileText, Users, Newspaper } from "lucide-react";
import React from "react";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

const FeatureCard = ({ feature, index, className = "" }: { feature: any, index: number, className?: string }) => {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${className}`}
        >
            {/* Gradient Glow Background on Hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`} />

            <div className="p-6 md:p-8 h-full flex flex-col relative z-10">
                {/* Icon Box */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl mb-4 md:mb-6 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-gradient-to-br ${feature.gradient}`}>
                    <feature.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-600 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-colors">
                    {feature.title}
                </h3>

                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-4 md:mb-6 flex-grow">
                    {feature.desc}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-zinc-300 group-hover:to-transparent transition-all duration-700" />
            </div>

            {/* Decorative Corner Blob */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`} />
        </motion.div>
    );
};

export default function WhyChooseUs() {
    const features = [
        {
            title: "Interactive 'Learn-Mode' Tests",
            desc: "Unlike traditional mocks, our Interactive Mode gives you immediate feedback and detailed explanations the moment you answer. Customize the question count to fit your schedule and practice \"On the GO.\"",
            icon: ClipboardCheck,
            gradient: "from-blue-500 to-indigo-600",
            colSpan: "md:col-span-1"
        },
        {
            title: "Smart Study Planner",
            desc: "Stay organized with our dynamic study schedules that automatically adjust to your pace, ensuring you cover the syllabus efficiently without the burnout.",
            icon: Calendar,
            gradient: "from-violet-500 to-purple-600",
            colSpan: "md:col-span-1"
        },
        {
            title: "Scientifically Engineered Web Guide",
            desc: "Designed for the Eye, Engineered for the Mind. Our study material leverages the science of sight to make content stand longer in memory, ensuring high-yield concepts stick without mental fatigue.",
            icon: Brain,
            gradient: "from-amber-400 to-orange-500",
            colSpan: "md:col-span-1"
        },
        {
            title: "Mastery Through Active Recall",
            desc: "Forget passive reading. Our Flashcards use Active Recall to build muscle memory and Smart Revision to focus strictly on weak areas, giving you the instant truth about your preparation levels.",
            icon: Layers,
            gradient: "from-emerald-400 to-teal-500",
            colSpan: "md:col-span-1"
        },
        {
            title: "Printable PDF Notes & Question Banks",
            desc: "Get the best of both worlds. Download concise Printable PDF Notes for offline study and access exhaustive practice questions with detailed answer keys for every single topic.",
            icon: FileText,
            gradient: "from-pink-500 to-rose-600",
            colSpan: "md:col-span-1"
        },
        {
            title: "The Dak Guru Community",
            desc: "Never study alone. Join the exclusive Dak Guru Community for 24/7 live interactions. Resolve doubts instantly, discuss strategies, and stay motivated by connecting with fellow active aspirants.",
            icon: Users,
            gradient: "from-blue-400 to-cyan-500",
            colSpan: "md:col-span-1"
        },
        {
            title: "Real-Time Updates & Affairs",
            desc: "Stay ahead of the curve. Keep your finger on the pulse with the DG Blog and our dedicated Current Affairs module, delivering the latest departmental updates and national happenings straight to you.",
            icon: Newspaper,
            gradient: "from-fuchsia-500 to-pink-600",
            colSpan: "md:col-span-2 lg:col-span-1 lg:col-start-2"
        },
    ];

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-black">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] md:bg-[size:24px_24px] z-0"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6"
                    >
                        <Shield className="w-3 h-3" />
                        <span>Designed for Excellence</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-100 mb-4 md:mb-6 tracking-tight leading-tight"
                    >
                        Why Dak Guru is <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            Your Unfair Advantage
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed px-4 md:px-0"
                    >
                        Don’t just study hard, study smart. From scientifically designed notes to 'learn-as-you-go' testing, we provide the complete ecosystem you need to crack the Inspector Posts LDCE.
                    </motion.p>
                </div>

                {/* Bento Grid Layout - Updated grid columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            className={feature.colSpan}
                        />
                    ))}
                </div>


            </div>
        </section>
    );
}
