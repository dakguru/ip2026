import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-all duration-300">

            {/* Container for Animation */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                {/* 1. Outer Ring - Blue/Cyan Gradient */}
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 border-l-cyan-400 animate-spin"></div>

                {/* 2. Middle Ring - Indigo/Purple (Reverse Spin) */}
                <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-r-indigo-500 border-b-purple-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>

                {/* 3. Logo Container */}
                <div className="relative w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)] p-1.5 flex items-center justify-center z-10 animate-pulse">
                    <div className="relative w-full h-full">
                        <Image
                            src="/dak-guru-new-logo.png"
                            alt="Loading"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* 4. Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            </div>

            {/* Loading Text */}
            <div className="text-center space-y-3">
                <h2 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                    DAK GURU
                </h2>

                <div className="flex items-center justify-center gap-1.5 h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[bounce_1s_infinite_-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-[bounce_1s_infinite_-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-[bounce_1s_infinite]"></span>
                </div>
            </div>

        </div>
    );
}
