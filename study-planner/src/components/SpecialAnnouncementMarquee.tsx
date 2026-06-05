"use client";
import React from 'react';
import { LATEST_3_DAYS_UPDATES } from './UpdatesDrawer';

export default function SpecialAnnouncementMarquee() {
    const content = (
        <>
            <span className="text-amber-300 font-bold uppercase tracking-widest text-[10px] mr-2">✨ What&apos;s New</span>
            {LATEST_3_DAYS_UPDATES.map((day, dayIdx) => (
                <React.Fragment key={dayIdx}>
                    <span className="text-cyan-200 text-[10px] mr-2 font-semibold">({day.date})</span>
                    {day.titles.map((title, titleIdx) => (
                        <React.Fragment key={titleIdx}>
                            <span className="text-white/90">{title}</span>
                            {titleIdx < day.titles.length - 1 && (
                                <span className="mx-2 text-indigo-300">•</span>
                            )}
                        </React.Fragment>
                    ))}
                    {dayIdx < LATEST_3_DAYS_UPDATES.length - 1 && (
                        <span className="mx-4 text-amber-300">★</span>
                    )}
                </React.Fragment>
            ))}
        </>
    );

    return (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-blue-50 py-2.5 overflow-hidden relative shadow-inner border-y border-blue-700/50">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-900 to-transparent z-10 pointer-events-none"></div>

            <div
                className="flex animate-scroll hover:[animation-play-state:paused] w-max items-center"
                style={{ animationDuration: '60s' }}
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
