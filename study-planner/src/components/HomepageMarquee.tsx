import React from 'react';
import { LATEST_UPDATE_DATE, LATEST_UPDATE_TITLES } from './UpdatesDrawer';

export default function HomepageMarquee() {
    const content = (
        <>
            <span className="text-yellow-300 font-bold uppercase tracking-widest text-[10px] mr-2">✨ What&apos;s New</span>
            {LATEST_UPDATE_DATE && (
                <span className="text-indigo-200 text-[10px] mr-2">({LATEST_UPDATE_DATE})</span>
            )}
            {LATEST_UPDATE_TITLES.map((title, i) => (
                <React.Fragment key={i}>
                    <span className="text-white/90">{title}</span>
                    {i < LATEST_UPDATE_TITLES.length - 1 && (
                        <span className="mx-2 text-indigo-300">•</span>
                    )}
                </React.Fragment>
            ))}
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
                style={{ animationDuration: '80s' }}
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
