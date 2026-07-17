"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Target, Lightbulb, CheckCircle2, Award, Zap, Layout, FileText, ShieldCheck, GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import AppScreenWrapper from "@/components/AppScreenWrapper";
import { UserMenu } from "@/components/UserMenu";

export default function AboutPage() {
    return (
        <AppScreenWrapper scrollableContent={false} hideStatusBarPadding>
            {/* Hero Section with integrated header bar */}
            <div className="relative shrink-0 bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-900 dark:from-black dark:via-zinc-950 dark:to-indigo-950 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />
                    <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] bg-blue-500/30 rounded-full blur-3xl animate-hero-float" />
                    <div className="absolute -bottom-32 -left-20 w-[32rem] h-[32rem] bg-purple-600/25 rounded-full blur-3xl animate-hero-float [animation-delay:-4s]" />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-64 bg-indigo-400/20 rounded-full blur-3xl" />
                </div>

                {/* Header Bar */}
                <header className="relative z-20 border-b border-white/10 bg-white/5 backdrop-blur-xl pt-[max(12px,env(safe-area-inset-top))]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/60 shadow-[0_0_18px_rgba(96,165,250,0.55)]">
                                <Image src="/dak-guru-new-logo.png" alt="Dak Guru" fill className="object-cover scale-110" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                Dak <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">Guru</span>
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-100/90">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <Link href="/mock-tests" className="hover:text-white transition-colors">Mock Tests</Link>
                            <Link href="/flashcards" className="hover:text-white transition-colors">Flash Cards</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        </nav>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="md:hidden text-sm font-medium text-blue-100/90 hover:text-white transition-colors"
                            >
                                Home
                            </Link>
                            <UserMenu />
                        </div>
                    </div>
                </header>

                {/* Hero Content */}
                <div className="max-w-7xl mx-auto relative z-10 text-center px-4 pt-16 pb-24 md:pt-24 md:pb-32">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-sm text-blue-100 mb-8 animate-fade-in-up">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>A Smart Self Preparation Portal for LDCE Aspirants</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 mb-6 animate-fade-in-up [animation-delay:0.1s]">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300">Dak Guru</span>
                    </h1>

                    <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed mb-10 animate-fade-in-up [animation-delay:0.2s]">
                        The dedicated learning platform for Limited Departmental Competitive Examinations (LDCE) of the Department of Posts — built to turn your syllabus into success.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-14 animate-fade-in-up [animation-delay:0.3s]">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 px-7 py-3 rounded-full font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-105 transition-all"
                        >
                            Start Learning <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/mock-tests"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
                        >
                            Explore Mock Tests
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up [animation-delay:0.4s]">
                        {[
                            { icon: ShieldCheck, label: "MSME Registered", sub: "Govt. of India" },
                            { icon: GraduationCap, label: "Expert Mentorship", sub: "Retired Postal Officers" },
                            { icon: Target, label: "LDCE Focused", sub: "IP & Departmental Cadres" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md text-left">
                                <item.icon className="w-7 h-7 text-amber-300 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-white leading-tight">{item.label}</p>
                                    <p className="text-xs text-blue-200/80 mt-0.5">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 md:p-12 border border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6 text-center md:text-left">
                        Dak Guru: Your Partner in Postal Excellence
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                        <span className="font-bold text-blue-600 dark:text-blue-400">Dak Guru</span> is a specialized learning platform dedicated exclusively to aspirants of the Department of Posts' Limited Departmental Competitive Examinations (LDCE). Registered as an MSME (Govt. of India) and mentored by Retired Postal Officers, we bridge the gap between syllabus and success.
                    </p>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        We combine expert insights with modern learning tools to create a structured, self-paced preparation environment. Whether you are aiming for Inspector Posts or other departmental cadres, Dak Guru provides the precise resources—from comprehensive study materials to real-time mock tests—needed to secure your promotion with confidence.
                    </p>
                </div>
            </div>

            {/* What We Offer Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-zinc-800 dark:text-zinc-100">
                        What We <span className="text-purple-600">Offer</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "MCQs & Practice Questions", desc: "Topic-wise and exam-oriented questions to strengthen conceptual understanding.", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
                            { title: "Web Guide", desc: "Comprehensive notes covering rules, acts, manuals, procedures, and departmental references.", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                            { title: "Flash Cards", desc: "Quick revision tools to help you recall important points instantly.", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
                            { title: "PDF Notes", desc: "Compact and printable study material for focused preparation.", icon: FileText, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
                            { title: "Study Planner", desc: "A smart organizing tool to help you plan and track your daily targets.", icon: Layout, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                            { title: "Mock Tests", desc: "Evaluate your preparation with full-length and topic-wise tests.", icon: Award, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-900/20" }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">{item.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Vision */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">Our Vision</h2>
                        </div>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            To become the most trusted and accessible self-study platform for all departmental aspirants across India, helping them learn systematically and achieve their career goals with confidence.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">Our Mission</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "To simplify complex postal rules and procedures through structured resources.",
                                "To provide aspirants with up-to-date, accurate, and exam-focused study material.",
                                "To support continuous learning through modern tools that work on both web and mobile.",
                                "To ensure every aspirant—irrespective of location or experience—gets equal access to quality content."
                            ].map((mission, idx) => (
                                <li key={idx} className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                                    <span className="text-zinc-600 dark:text-zinc-300">{mission}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                    <h2 className="text-3xl md:text-4xl font-extrabold mb-8 relative z-10">Why Dak Guru?</h2>

                    <div className="space-y-6 text-lg md:text-xl text-blue-50 leading-relaxed relative z-10">
                        <p>
                            We understand the challenges faced by departmental aspirants. Long working hours, shifting duties, and limited time make consistent preparation difficult. <span className="font-bold text-white">Dak Guru</span> is built to bridge that gap—offering self-paced, anytime-anywhere learning that fits perfectly into your daily routine.
                        </p>
                        <p>
                            With expert-designed content and smart revision tools, we aim to make your preparation smoother, sharper, and more efficient.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center gap-4 flex-wrap relative z-10">
                        <Link href="/" className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            Start Learning Now
                        </Link>
                    </div>
                </div>
            </section>
        </AppScreenWrapper>
    );
}
