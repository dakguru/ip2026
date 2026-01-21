import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import ContactForm from "@/components/ContactForm";
import FeatureGrid from "@/components/FeatureGrid";
import WelcomeSection from "@/components/WelcomeSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import MockTestAnnouncementPopup from "@/components/MockTestAnnouncementPopup";
// import LaunchPopup from "@/components/LaunchPopup";

interface WebLandingPageProps {
    displayName: string;
    membershipLevel: string;
    role: string;
    isLoggedIn: boolean;
}

export default function WebLandingPage({ displayName, membershipLevel, role, isLoggedIn }: WebLandingPageProps) {
    return (
        <div className="min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* 1. Navbar */}
            <HomeHeader isLoggedIn={isLoggedIn} membershipLevel={membershipLevel as any} />

            {/* LIVE MOCK TEST BANNER REMOVED AS PER USER REQUEST */}

            {/* 1.5. Launch Popup - Disabled as per request */}
            {/* {!["gold", "silver"].includes(membershipLevel.toLowerCase()) && <LaunchPopup />} */}

            {/* 1.6. Mock Test Description Popup */}
            {/* 1.6. Mock Test Description Popup - Removed */}
            {/* <MockTestAnnouncementPopup /> */}

            {/* 2. Hero Section */}
            <WelcomeSection displayName={displayName} />

            {/* 3. Feature Tiles */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <FeatureGrid membershipLevel={membershipLevel} role={role} />
            </section>

            {/* 4. Join Section */}
            <section className="bg-sky-50 dark:bg-sky-900/10 py-20 mb-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="mb-6">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold text-sm tracking-wide uppercase shadow-sm">
                            Be a Smart Aspirant, Not a Passive Viewer
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-6 leading-tight">
                        Prepare for Inspector Posts Exam 2026 with Confidence
                    </h2>

                    <p className="text-zinc-700 dark:text-zinc-200 text-xl font-medium mb-4 max-w-3xl mx-auto leading-relaxed">
                        Master the Inspector Posts Syllabus in half the time. No long videos. Just high-yield notes, instant quizzes, and rapid revision.
                    </p>

                    <p className="text-zinc-500 dark:text-zinc-400 text-base mb-10 max-w-3xl mx-auto">
                        Practice-rich MCQs, structured Study Planner, comprehensive Web Guide, quick-revision Flash Cards, and printable PDF Notes — everything you need to level up your preparation.
                    </p>

                    {!["gold", "silver"].includes(membershipLevel.toLowerCase()) && (
                        <Link href="/pricing" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
                            Join Now
                        </Link>
                    )}
                    <div className="w-24 h-1 bg-zinc-200 dark:bg-zinc-800 mx-auto mt-12 rounded-full"></div>
                </div>
            </section>

            {/* 5. Why Choose Us */}
            <WhyChooseUs />

            {/* 6. Contact Us */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0F1C] border border-white/5 shadow-2xl">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
                        {/* Left Content */}
                        <div className="p-10 md:p-16 flex flex-col justify-between h-full bg-white/0">
                            <div>
                                <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 font-medium text-xs tracking-widest uppercase mb-6 border border-blue-500/20">
                                    Contact Us
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    Let's Discuss Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Preparation Strategy</span>
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-12">
                                    Have questions about the syllabus, notes, or the planner? We are here to help you clear every doubt before you start.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                                            <Mail className="w-5 h-5 text-slate-300 group-hover:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email Us</p>
                                            <p className="text-slate-200 font-medium group-hover:text-white transition-colors">admin@dakguru.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all">
                                            <Phone className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Call Us</p>
                                            <p className="text-slate-200 font-medium group-hover:text-white transition-colors block">+91 93630 30396</p>
                                            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Mon - Sat (10am - 6pm)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content (Form) */}
                        <div className="p-8 md:p-16 lg:border-l border-white/5 flex flex-col justify-center bg-white/5 backdrop-blur-sm lg:bg-transparent">
                            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg shadow-blue-600/20">
                                    Send a Message
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Banner - Interactive Replacement */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-r from-slate-900 via-zinc-900 to-black border border-zinc-800">

                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                        <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-150 contrast-150"></div>
                        {/* Golden/Premium accents */}
                        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-500/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10">
                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left">
                            <span className="inline-block py-1.5 px-4 mb-6 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs tracking-[0.2em] uppercase border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                Coming Soon
                            </span>

                            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight drop-shadow-lg">
                                DAK GURU <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">MOBILE APP</span>
                            </h2>

                            <p className="text-zinc-400 text-lg md:text-xl font-medium mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
                                The power of Dak Guru in your pocket. <br />
                                Learn, Practice, and Succeed on the go.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                {/* Google Play Button */}
                                <Link
                                    href="/download/android"
                                    className="group flex items-center gap-3 bg-black hover:bg-zinc-900 text-white px-5 py-3.5 rounded-xl border border-zinc-700 hover:border-green-500/50 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] min-w-[200px]"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500 group-hover:text-green-400 transition-colors">
                                        <path d="M5,3V21L19,12L5,3Z" />
                                    </svg>
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Get it on</span>
                                        <span className="text-xl font-bold font-sans">Google Play</span>
                                    </div>
                                </Link>

                                {/* App Store Button */}
                                <Link
                                    href="/download/ios"
                                    className="group flex items-center gap-3 bg-white hover:bg-zinc-100 text-black px-5 py-3.5 rounded-xl border border-transparent hover:border-zinc-300 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] min-w-[200px]"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.87 11.13,7.75 11.9,7.75C12.63,7.75 13.9,6.67 15.68,6.8C16.4,6.84 17.65,7.1 18.5,8.35C18.41,8.4 16.85,9.3 16.89,11.25C16.93,12.9 18.23,13.96 18.29,14C18.26,14.07 17.2,17.76 15.2,19.34L18.71,19.5ZM13,3.5C13.66,2.67 14.15,1.54 14.03,0.41C13.06,0.45 11.89,1.06 11.21,1.88C10.6,2.63 10.06,3.8 10.18,4.91C11.23,5.03 12.35,4.33 13,3.5Z" />
                                    </svg>
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider">Download on the</span>
                                        <span className="text-xl font-bold font-sans">App Store</span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Visual / Phone Mockup Placeholder */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                            {/* Glowing Ring Effect behind the hypothetical phone */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 blur-3xl rounded-full transform scale-75 animate-pulse-slow"></div>

                            {/* Stylized App Icon/Badge since we don't have the 3D phone asset separated */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] bg-gradient-to-br from-zinc-800 to-black border border-white/10 shadow-2xl flex items-center justify-center transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500 group">
                                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                                {/* Inner Content */}
                                <div className="text-center p-6">
                                    <div className="relative w-28 h-28 mx-auto mb-4">
                                        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse-slow"></div>
                                        <Image
                                            src="/official-logo.png"
                                            alt="Dak Guru Logo"
                                            width={112}
                                            height={112}
                                            className="relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Dak Guru</h3>
                                    <p className="text-zinc-400 text-sm">Self Learning Portal</p>

                                    <div className="mt-6 flex justify-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <svg key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
