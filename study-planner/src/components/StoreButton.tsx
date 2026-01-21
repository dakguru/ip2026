"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface StoreButtonProps {
    store: "google" | "apple";
    href: string;
    className?: string;
}

// SVG components removed as we are using Image now

export default function StoreButton({ store, href, className = "" }: StoreButtonProps) {
    const isGoogle = store === "google";

    return (
        <Link
            href={href}
            className={`
                group relative flex items-center justify-center px-4 py-2.5 
                h-[64px] min-w-[210px] sm:min-w-[220px] 
                bg-black/90 hover:bg-black text-white 
                rounded-xl border border-white/10 overflow-hidden
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[0.98]
                ${className}
            `}
        >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${isGoogle ? 'from-green-500/10 to-blue-500/10' : 'from-blue-500/10 to-purple-500/10'}`} />

            {/* Light Sweep Animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

            <div className="relative z-20 flex items-center gap-3 w-full">
                <Image
                    src={isGoogle ? "/play-store-logo.png" : "/apple-logo-authentic.png"}
                    alt={isGoogle ? "Google Play" : "Apple"}
                    width={32}
                    height={32}
                    className="w-8 h-8 mr-3 object-contain shrink-0"
                />

                <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {isGoogle ? "Get it on" : "Download on the"}
                    </span>
                    <span className="text-[21px] font-bold font-sans tracking-tight text-white">
                        {isGoogle ? "Google Play" : "App Store"}
                    </span>
                </div>
            </div>
        </Link>
    );
}
