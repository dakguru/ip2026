"use client";

import { useEffect, useState, useRef } from 'react';
import { Info, ChevronRight, MessageCircle, Globe } from 'lucide-react';
import Link from 'next/link';

import { Capacitor } from '@capacitor/core';

export default function InfoMarqueeView() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isNative, setIsNative] = useState(false);

    useEffect(() => {
        setIsNative(Capacitor.isNativePlatform());
    }, []);

    interface LinkAction {
        type: string;
        url: string;
        label: string;
    }

    interface MessageItem {
        text: string;
        action: LinkAction | null;
    }

    const messages: MessageItem[] = [
        {
            text: "Visit PDF Notes page for Smart Reading Experience.",
            action: null
        },
        {
            text: "Contents are being updated. Thanks for your patience and support.",
            action: null
        }
    ];

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 4000); // 4 seconds per message

        return () => clearInterval(interval);
    }, [messages.length, isPaused]);

    if (!isNative) return null;

    const currentMessage = messages[currentIndex];

    const renderMessageContent = (msg: MessageItem) => {
        if (!msg.action) {
            return <span className="text-slate-700 dark:text-slate-200">{msg.text}</span>;
        }

        const parts = msg.text.split(msg.action.label);
        return (
            <span className="text-slate-700 dark:text-slate-200">
                {parts[0]}
                <a
                    href={msg.action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline mx-1 relative z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {msg.action.label}
                </a>
                {parts[1]}
            </span>
        );
    };

    return (
        <div className="px-5 pb-2 pt-2">
            <div
                className="relative overflow-hidden bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl shadow-sm h-16 sm:h-14 flex items-center pr-2"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* Left Icon Panel */}
                <div className="h-full w-12 flex items-center justify-center shrink-0 bg-amber-100/50 dark:bg-amber-900/20 border-r border-amber-100 dark:border-amber-900/20">
                    <div className="relative">
                        <Info className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </div>
                </div>

                {/* Content Area - Fade Transition */}
                <div className="flex-1 px-3 py-1 relative h-full flex items-center overflow-hidden">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 px-3 flex items-center transition-all duration-500 ease-in-out ${idx === currentIndex
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4'
                                }`}
                            aria-hidden={idx !== currentIndex}
                        >
                            <p className="text-[11px] sm:text-xs font-medium leading-tight line-clamp-2">
                                {renderMessageContent(msg)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Indicators */}
                <div className="flex flex-col gap-1 items-end justify-center px-1">
                    {messages.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1 h-1 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? 'bg-amber-500 h-2'
                                : 'bg-amber-200 dark:bg-amber-800'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
