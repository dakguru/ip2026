import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/50 dark:bg-zinc-950/50 backdrop-blur-[30px] transition-all duration-500 overflow-hidden">
            
            {/* Background Moving Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[80px] animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-[70%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] bg-violet-600/20 dark:bg-violet-600/10 rounded-full blur-[60px] animate-pulse [animation-delay:-2s]"></div>

            {/* Orbiting Elements Container */}
            <div className="relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 mb-4 md:mb-6 z-10">
                
                {/* Orbital Path 1 */}
                <div className="absolute inset-1 md:inset-2 rounded-full border border-blue-500/20 dark:border-blue-400/10 animate-[spin_3s_linear_infinite]">
                    <div className="absolute top-[-3px] md:top-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                </div>

                {/* Orbital Path 2 (Reverse, larger) */}
                <div className="absolute -inset-1.5 md:-inset-2 rounded-full border border-violet-500/20 dark:border-violet-400/10 animate-[spin_5s_linear_infinite_reverse]">
                    <div className="absolute bottom-[-3px] md:bottom-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"></div>
                </div>

                {/* Orbital Path 3 (Different axis/speed) */}
                <div className="absolute -inset-4 md:-inset-6 rounded-full border border-cyan-500/20 dark:border-cyan-400/10 border-dashed animate-[spin_10s_linear_infinite]"></div>

                {/* Glassmorphic Core */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl shadow-blue-500/10 border border-white/50 dark:border-white/10 flex items-center justify-center overflow-hidden z-20 hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-violet-500/10 animate-pulse"></div>
                    
                    {/* Logo */}
                    <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center filter drop-shadow-lg">
                        <Image
                            src="/dak-guru-new-logo.png"
                            alt="Dak Guru Loading"
                            fill
                            className="object-contain animate-pulse"
                            priority
                            sizes="(max-width: 768px) 24px, 32px"
                        />
                    </div>
                </div>
            </div>

            {/* Typography and Loader Line */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-sm md:text-base font-black tracking-[0.1em] mb-2.5 opacity-90">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-500 to-indigo-600 dark:from-blue-400 dark:via-violet-400 dark:to-indigo-400 bg-[length:200%_auto]" style={{ animation: 'dak-gradient 3s linear infinite' }}>
                        DAK GURU
                    </span>
                </h1>
                
                {/* Modern fluid loading bar */}
                <div className="w-16 md:w-24 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative shadow-inner">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" style={{ animation: 'dak-loader 1.5s ease-in-out infinite' }}></div>
                </div>
            </div>
            
            <style>{`
                @keyframes dak-gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes dak-loader {
                    0% { left: -33%; }
                    100% { left: 100%; }
                }
            `}</style>
        </div>
    );
}
