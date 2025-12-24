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
        <footer className="bg-zinc-950 text-white py-8 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
