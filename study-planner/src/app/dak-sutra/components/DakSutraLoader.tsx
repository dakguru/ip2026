"use client";

import { BookOpen, Sparkles, Compass } from "lucide-react";

export default function DakSutraLoader() {
    return (
        <div className="py-12 md:py-24 min-h-[250px] md:min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
            {/* Background glowing orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[400px] md:h-[400px] bg-blue-500/10  rounded-full blur-[40px] md:blur-[60px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[250px] md:h-[250px] bg-violet-600/10  rounded-full blur-[30px] md:blur-[40px] animate-pulse [animation-delay:1s]" />
            
            {/* Central Element Container */}
            <div className="relative flex flex-col items-center z-10">
                {/* 3D Spinning rings */}
                <div className="relative w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 md:border-[3px] border-transparent border-t-blue-500 border-b-violet-500 rounded-full animate-[spin_2s_linear_infinite]" />
                    <div className="absolute inset-1 md:inset-2 border-2 md:border-[3px] border-transparent border-l-violet-400 border-r-blue-400 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
                    <div className="absolute inset-2 md:inset-4 border-2 md:border-[3px] border-transparent border-t-emerald-400 border-b-indigo-400 rounded-full animate-[spin_4s_linear_infinite] opacity-50" />
                    
                    {/* Glassmorphism Icon Box */}
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/40  backdrop-blur-md border border-white/60  shadow-xl flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
                        <BookOpen className="w-5 h-5 md:w-8 md:h-8 text-blue-600  animate-pulse" />
                        <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 text-violet-500 absolute -top-1 -right-1 md:-top-2 md:-right-2 animate-bounce" />
                        <Compass className="w-3 h-3 text-emerald-500 absolute -bottom-1 -left-1 opacity-70 animate-[spin_5s_linear_infinite]" />
                    </div>
                </div>
                
                {/* Text section */}
                <div className="mt-4 md:mt-10 flex flex-col items-center">
                    <h3 className="text-base md:text-2xl font-black tracking-tight mb-1.5 md:mb-2">
                        <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                            Dak Sutra
                        </span>
                    </h3>
                    
                    <div className="flex items-center gap-1 md:gap-1.5">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                    </div>
                    
                    <p className="text-zinc-400  text-[9px] md:text-xs font-bold uppercase tracking-[0.25em] mt-2 md:mt-3 animate-pulse">
                        Decoding Rules...
                    </p>
                </div>
            </div>
            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}
