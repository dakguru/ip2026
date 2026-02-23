import React from 'react';

export default function HomepageMarquee() {
    // Content with colored accents for an immersive feel
    const content = (
        <>
            <span className="text-yellow-300">🚀</span> It is proudly announced that <span className="text-cyan-200 font-extrabold">DAK GURU</span> IS THE FIRST & ONLY PORTAL IN INDIA FOR LDCE PREPARATION PROVIDING <span className="mx-2 text-indigo-300">•</span>
            📚 MCQs with <span className="text-green-300">Instant Answer & Explanation</span> <span className="mx-2 text-indigo-300">•</span>
            🧠 <span className="text-pink-300">Smart Flashcards</span> for Rapid Revision <span className="mx-2 text-indigo-300">•</span>
            📖 Smart PDF Reader for All Topics <span className="mx-2 text-indigo-300">•</span>
            🎯 Structured, Rule-Based, Exam-Oriented Learning <span className="mx-2 text-indigo-300">•</span>
            🏆 All India Weekly <span className="text-orange-300">Live Mock Tests</span> with Answer Sheets in PDF for detailed analysis <span className="mx-2 text-indigo-300">•</span>
            <span className="italic text-yellow-200">Prepare Smarter</span> • <span className="italic text-yellow-200">Revise Faster</span> • <span className="italic text-yellow-200">Succeed Confidently</span> 🚀
        </>
    );

    return (
        <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white py-1.5 overflow-hidden border-b border-white/10 relative group z-40 shadow-md">
            {/* Glassy sheen effects */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>

            {/* Side Fade Gradients for immersion */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-indigo-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-indigo-900 to-transparent z-10 pointer-events-none"></div>

            <div
                className="flex animate-scroll hover:[animation-play-state:paused] w-max items-center"
                style={{ animationDuration: '80s' }} // Slower speed
            >
                {/* Original Content */}
                <div className="flex items-center px-8">
                    <span className="text-xs md:text-sm font-semibold tracking-wider whitespace-nowrap flex items-center gap-1.5 opacity-95">
                        {content}
                    </span>
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex items-center px-8">
                    <span className="text-xs md:text-sm font-semibold tracking-wider whitespace-nowrap flex items-center gap-1.5 opacity-95">
                        {content}
                    </span>
                </div>
            </div>
        </div>
    );
}
