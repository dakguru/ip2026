"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-white py-8 border-t border-zinc-900 mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    {/* Left: Logo */}
                    <div className="flex items-center shrink-0">
                        <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center overflow-hidden bg-black">
                            <Image src="/dak-guru-round.png" alt="Dak Guru Logo" width={32} height={32} />
                        </div>
                    </div>

                    {/* Middle: Copyright */}
                    <div className="text-zinc-500 text-sm text-center">
                        &copy; {new Date().getFullYear()} Dak Guru InfoTech. All rights reserved.
                    </div>

                    {/* Right: Links */}
                    <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-2 text-sm font-medium text-zinc-500">
                        <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                        <Link href="/privacypolicy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                        <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
