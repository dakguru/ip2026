"use client";
import React from 'react';

export default function SpecialAnnouncementMarquee() {
    const content = (
        <>
            <span className="text-amber-300">📚</span> We are curating <span className="text-cyan-200 font-extrabold">exam-oriented MCQs</span> for each topic with focus on questions carrying <span className="text-green-300 font-bold">high probability</span> of appearing in LDCE <span className="mx-3 text-blue-300">•</span>
            Every MCQ is framed to help you <span className="text-pink-200 font-bold">revise rules, understand concepts</span> &amp; prepare in the exact direction <span className="mx-3 text-blue-300">•</span>
            <span className="text-amber-200 font-extrabold">More Relevance</span> · <span className="text-purple-200 font-extrabold">More Accuracy</span> · <span className="text-green-200 font-extrabold">More Exam Value</span> <span className="mx-3 text-blue-300">•</span>
            Stay consistent — the right preparation today makes a big difference on exam day! <span className="mx-3 text-blue-300">•</span>
            <span className="text-cyan-200 font-extrabold">Dak Guru</span> — India&apos;s Smart Self Preparation Portal for LDCE · <span className="text-amber-200 font-bold">www.dakguru.com</span> 🚀
        </>
    );

    return (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-blue-50 py-2.5 overflow-hidden relative shadow-inner border-y border-blue-700/50">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-900 to-transparent z-10"></div>

            <div
                className="flex animate-scroll hover:[animation-play-state:paused] w-max items-center"
                style={{ animationDuration: '50s' }}
            >
                <div className="flex items-center px-4">
                    <span className="text-[13px] font-medium tracking-wide whitespace-nowrap flex items-center gap-1.5">
                        {content}
                    </span>
                </div>
                <div className="flex items-center px-4">
                    <span className="text-[13px] font-medium tracking-wide whitespace-nowrap flex items-center gap-1.5">
                        {content}
                    </span>
                </div>
            </div>
        </div>
    );
}
