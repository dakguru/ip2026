"use client";
import React from 'react';

export default function SpecialAnnouncementMarquee() {
    const content = (
        <>
            <span className="text-yellow-300">⚠️ IMPORTANT UPDATE:</span> Weekly Tests for LDCE IP 2026 - 16 and PS Group B - 05 will be available for this week only from <span className="text-white font-bold">02.05.2026 at 2000 hours</span> (tonight) until <span className="text-white font-bold">04.05.2026 at 2000 hours</span>. This schedule is applicable due to certain technical difficulties. Aspirants may complete the tests within the given window. <span className="mx-4 text-blue-300">•</span>
        </>
    );

    return (
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-blue-50 py-2 overflow-hidden relative shadow-inner border-y border-blue-700/50">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-900 to-transparent z-10"></div>

            <div
                className="flex animate-scroll hover:[animation-play-state:paused] w-max items-center"
                style={{ animationDuration: '40s' }}
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
