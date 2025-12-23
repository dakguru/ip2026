"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/quiz")) {
        return (
            <footer className="bg-zinc-950 text-white py-6 border-t border-zinc-900 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-zinc-500 text-sm">
                        &copy; {new Date().getFullYear()} Dak Guru InfoTech. All rights reserved.
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">

                    {/* Column 1: Brand & Description (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white/10 p-1">
                                <Image src="/dak-guru-new-logo.png" alt="Dak Guru" fill className="object-contain" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                Dak Guru
                            </span>
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            Your reliable partner for Departmental Exam Preparation. We provide structured learning, mock tests, and expert guidance to help you succeed.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Owned By</span>
                                <span className="text-sm font-medium text-white">Dak Guru InfoTech</span>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                Govt. of India Registered MSME
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="p-2.5 bg-zinc-900 rounded-lg hover:bg-blue-600 hover:text-white text-zinc-400 transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links (3 cols) */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg font-bold mb-6 text-white text-left">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { label: "About Us", href: "/about" },
                                { label: "Contact Us", href: "/contact" },
                                { label: "DG Blog", href: "/blog" },
                                { label: "Current Affairs", href: "/current-affairs" },
                                { label: "Dak Guru Community", href: "/social" }
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-zinc-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-blue-500 transition-colors"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <h3 className="text-lg font-bold mb-6 text-white text-left">Contact Us</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-zinc-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-zinc-400 transition-colors mt-1">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-1">Office Address</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Dak Guru InfoTech,<br />
                                        Chennai, Tamil Nadu
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-zinc-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-zinc-400 transition-colors mt-1">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-1">Email Us</h4>
                                    <a href="mailto:admin@dakguru.com" className="text-zinc-400 hover:text-blue-400 text-sm transition-colors">
                                        admin@dakguru.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-lg bg-zinc-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-zinc-400 transition-colors mt-1">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-1">Call Us</h4>
                                    <p className="text-zinc-400 text-sm mb-1">Mon - Sat (10am - 6pm)</p>
                                    <p className="text-white font-bold tracking-wide">+91 93630 30396</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-500 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Dak Guru InfoTech. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-500">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                        <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
