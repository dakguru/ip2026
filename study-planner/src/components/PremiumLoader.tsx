"use client";

import Image from "next/image";

interface PremiumLoaderProps {
    /** Optional message below the loader */
    message?: string;
    /** If true, renders as full-page centered loader */
    fullPage?: boolean;
    /** Size variant */
    size?: "sm" | "md" | "lg";
}

/**
 * Premium branded loading animation using the Dak Guru logo.
 * Features a pulsing logo with an orbiting ring and subtle glow.
 */
export default function PremiumLoader({
    message,
    fullPage = true,
    size = "md",
}: PremiumLoaderProps) {
    const dimensions = {
        sm: { logo: 36, ring: 52, orbit: 56 },
        md: { logo: 48, ring: 64, orbit: 70 },
        lg: { logo: 56, ring: 76, orbit: 82 },
    }[size];

    const loader = (
        <div className="flex flex-col items-center gap-4">
            {/* Logo + Ring Container */}
            <div
                className="relative flex items-center justify-center"
                style={{ width: dimensions.orbit, height: dimensions.orbit }}
            >
                {/* Subtle glow behind logo */}
                <div
                    className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-xl animate-pulse"
                    style={{
                        width: dimensions.orbit,
                        height: dimensions.orbit,
                    }}
                />

                {/* Orbiting ring */}
                <div
                    className="absolute inset-0 rounded-full border-2 border-transparent animate-[loader-orbit_1.8s_linear_infinite]"
                    style={{
                        width: dimensions.ring,
                        height: dimensions.ring,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderTopColor: "#3b82f6",
                        borderRightColor: "#6366f1",
                    }}
                />

                {/* Secondary faint ring (counter-spin) */}
                <div
                    className="absolute rounded-full border border-zinc-200/40 dark:border-zinc-700/40 animate-[loader-orbit_3s_linear_infinite_reverse]"
                    style={{
                        width: dimensions.ring - 6,
                        height: dimensions.ring - 6,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />

                {/* Logo - pulse breathing */}
                <div className="relative z-10 animate-[loader-breathe_2s_ease-in-out_infinite]">
                    <Image
                        src="/dak-guru-logo.png"
                        alt="Loading"
                        width={dimensions.logo}
                        height={dimensions.logo}
                        className="rounded-full object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Optional message */}
            {message && (
                <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullPage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb] dark:bg-[#0a0a0a]">
                {loader}
            </div>
        );
    }

    return loader;
}
