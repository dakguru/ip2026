"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { X, Calendar, CheckCircle2, Sparkles, Bell } from "lucide-react";

interface UpdateItem {
    title: string;
    desc: string | ReactNode;
}

interface UpdateGroup {
    date: string;
    items: UpdateItem[];
}

const UPDATES_DATA: UpdateGroup[] = [
    {
        date: "02.05.2026",
        items: [
            {
                title: "🎯 Mock Test 16 & PSGB Mock 05 Schedule Update",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Weekly Mock Test - 16</strong> for LDCE IP and <strong>Mock Test - 05</strong> for PS Group B!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                <p className="font-bold text-amber-700 dark:text-amber-300 text-[10px] uppercase tracking-wide">Important Schedule Notice</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-[11px]">Due to technical difficulties, these weekly tests will be live and accessible until <strong>04.05.2026 @ 2000 hours</strong> for this week only.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Head to the Mock Tests section to attempt now!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "25.04.2026",
        items: [
            {
                title: "📚 New PDF Notes: DoP&T Instructions",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>DoP&T instructions on Establishment and administration</strong> PDF notes for PS Group B Course Mode!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-sky-50/50 dark:bg-sky-900/10 p-3 rounded-xl border border-sky-100 dark:border-sky-800/50">
                                <p className="font-bold text-sky-700 dark:text-sky-300 text-[10px] uppercase tracking-wide">Paper I (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-[11px]">Comprehensive instructions issued by DoP&T from time to time on establishment and administrative matters.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Digital Library!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "24.04.2026",
        items: [
            {
                title: "🎯 Mock Test 15 & PSGB Mock 04 Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Weekly Mock Test - 15</strong> for LDCE IP 2026 and <strong>Mock Test - 04</strong> for PS Group B 2026 aspirants!</p>
                        
                        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                            <ul className="space-y-4 text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    LDCE IP Weekly Mock Test - 15
                                </li>
                                <li className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                    </span>
                                    PS Group B Weekly Mock Test - 04
                                </li>
                            </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-800/50">
                                <p className="font-bold text-blue-700 dark:text-blue-300 text-[10px] uppercase tracking-wide mb-2">LDCE IP Topics:</p>
                                <ul className="space-y-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">✅</span>
                                        <span>FR & SR – General, TA, DA, DR & HRA Rules</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">✅</span>
                                        <span>Brochure on Casual Labourers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">✅</span>
                                        <span>Maintenance of APAR</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-purple-50/50 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-100 dark:border-purple-800/50">
                                <p className="font-bold text-purple-700 dark:text-purple-300 text-[10px] uppercase tracking-wide mb-2">PS Group B Topics:</p>
                                <ul className="space-y-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5">✅</span>
                                        <span>PO Small Savings Schemes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5">✅</span>
                                        <span>POSB (CBS) Manual & PLI Scheme, 2011</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            These tests will be open for attempts from <strong>25.04.2026</strong>. <strong>Top 7 Rankers</strong> will be published on Monday (27.04.2026).
                        </p>

                        <p className="pt-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Prepare well and secure your rank!
                        </p>
                    </div>
                )
            },
            {
                title: "📊 Admin: Live Leaderboard Monitoring",
                desc: (
                    <div className="space-y-4">
                        <p>We have introduced a <strong>Live Leaderboard</strong> feature exclusively for Administrators!</p>
                        
                        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                            <ul className="space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-500 mt-0.5">⏱️</span>
                                    <span><strong>Real-time Polling:</strong> Leaderboard updates every 20 seconds during live tests.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">🛡️</span>
                                    <span><strong>Secured Access:</strong> Results remain private until the live schedule concludes for regular users.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        ]
    },
    {
        date: "19.04.2026",
        items: [
            {
                title: "📚 NPS Rules Notes Updated",
                desc: (
                    <div className="space-y-4">
                        <p>We have updated the <strong>CCS (Implementation of NPS) Rules, 2021</strong> and <strong>CCS (Payment of Gratuity under NPS) Rules, 2021</strong> PDF notes for both LDCE IP and PS Group B courses.</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">LDCE IP & PS Group B</p>
                                <ul className="space-y-1.5 mt-1 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">✅</span>
                                        <span>CCS (Implementation of NPS) Rules, 2021</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">✅</span>
                                        <span>CCS (Payment of Gratuity under NPS) Rules, 2021</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Digital Library!
                        </p>
                    </div>
                )
            },
            {
                title: "💎 Dak Sutra: Premium Access Only",
                desc: (
                    <div className="space-y-4">
                        <p>Important update regarding <strong>Dak Sutra</strong> contents. To maintain the quality and exclusivity of our technical content, these series will now be accessible exclusively for our <strong>Premium Members</strong>.</p>
                        
                        <div className="bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100 dark:border-amber-800/50">
                            <p className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-300 text-[11px]">
                                <Sparkles className="w-3.5 h-3.5" />
                                Premium Exclusive Feature
                            </p>
                            <p className="mt-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                This change helps us provide better-curated technical rules and procedures specifically for our serious aspirants.
                            </p>
                        </div>

                        <p className="pt-1 text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                            Thank you for being part of Dak Guru! Upgrade to Premium today to unlock all technical series.
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "17.04.2026",
        items: [
            {
                title: "🎯 Mock Test 14 Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Weekly Mock Test - 14</strong> for LDCE IP 2026 aspirants and <strong>Mock Test - 03</strong> for PS Group B 2026 aspirants!</p>
                        
                        <div className="bg-red-50/50 dark:bg-red-900/10 p-3 rounded-2xl border border-red-100 dark:border-red-900/20">
                            <ul className="space-y-4 text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    LDCE IP Weekly Mock Test - 14
                                </li>
                                <li className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    PS Group B Weekly Mock Test - 03
                                </li>
                            </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-800/50">
                                <p className="font-bold text-blue-700 dark:text-blue-300 text-[10px] uppercase tracking-wide mb-2">LDCE IP Topics:</p>
                                <ul className="space-y-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">✅</span>
                                        <span>CCS (NPS & Gratuity) Rules</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">✅</span>
                                        <span>GFR, 2017</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-purple-50/50 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-100 dark:border-purple-800/50">
                                <p className="font-bold text-purple-700 dark:text-purple-300 text-[10px] uppercase tracking-wide mb-2">PS Group B Topics:</p>
                                <ul className="space-y-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5">✅</span>
                                        <span>Postal Manual Vol II, V & GSPR</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5">✅</span>
                                        <span>MNOP & PNOP Guidelines</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            These tests feature <strong>50 High-Quality MCQs</strong> each and will be open for attempts from <strong>18.04.2026</strong> and <strong>19.04.2026</strong>.
                        </p>

                        <p className="pt-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Prepare well and secure your rank!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "16.04.2026",
        items: [
            {
                title: "📚 Welfare Measures Notes Updated",
                desc: (
                    <div className="space-y-4">
                        <p>We have updated the <strong>Welfare Measures for Departmental Employees and Gramin Dak Sevaks (GDS)</strong> PDF notes across all courses.</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">LDCE IP & PS Group B (Paper III)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-[11px]">Latest study materials with updated welfare schemes, benefits, and support measures for employees and GDS.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Digital Library!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "14.04.2026",
        items: [
            {
                title: "⚖️ GDS (Conduct & Engagement) Rules Updated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the updated <strong>GDS (Conduct & Engagement) Rules, 2020</strong> notes for both LDCE IP and PS Group B courses.</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-rose-50/50 dark:bg-rose-900/10 p-3 rounded-xl border border-rose-100 dark:border-rose-800/50">
                                <p className="font-bold text-rose-700 dark:text-rose-300 text-[10px] uppercase tracking-wide">Paper I & II</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-[11px]">Comprehensive notes covering the latest GDS Conduct rules with high-quality formatting.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Digital Library!
                        </p>
                    </div>
                )
            },
            {
                title: "🌟 Revamped Current Affairs Section",
                desc: (
                    <div className="space-y-4">
                        <p>We have completely redesigned the <strong>Current Affairs</strong> section to provide a more streamlined and premium learning experience.</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-800/50">
                                <ul className="space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">🚀</span>
                                        <span><strong>New Hub Interface:</strong> A centralized dashboard for Live Updates, Flashcards, and PDFs.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-500 mt-0.5">📚</span>
                                        <span><strong>Monthly PDF Archive:</strong> Curated digests from Aug 2025 to Mar 2026 with an interactive reader.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">⚡</span>
                                        <span><strong>Quick Flashcards:</strong> Direct access to Current Affairs flashcards for better retention.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>✨</span> Experience the new Hub in the Current Affairs section!
                        </p>
                    </div>
                )
            },
            {
                title: "⚖️ Constitution of India Uploaded",
                desc: (
                    <div className="space-y-4">
                        <p>We are excited to announce that the <strong>Constitution of India</strong> PDF notes are now fully integrated and live for all premium users!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                <p className="font-bold text-amber-700 dark:text-amber-300 text-[10px] uppercase tracking-wide">Paper III (Digital Library)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-[11px]">Comprehensive notes covering the Preamble, Fundamental Rights, Duties, and key Articles of the Indian Constitution.</p>
                            </div>
                        </div>

                        <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl">
                            <p className="text-[10px] md:text-[11px] text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                                <strong>💡 Recommendation:</strong> Since the file size is large (59.7 MB), we advise <strong>Downloading</strong> the PDF for the best reading experience. The &quot;View&quot; option may take longer to load.
                            </p>
                        </div>

                        <p className="pt-1 text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            },
            {
                title: "📬 Dak Sutra: Preservation of Records Series Completed",
                desc: (
                    <div className="space-y-4">
                        <p>We have successfully completed the 3-part <strong>Dak Sutra</strong> series on the <strong>Disposal and Preservation of Postal Records</strong>.</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-800/50">
                                <ul className="space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">🗓️</span>
                                        <span><strong>Full Lifecycle:</strong> From record creation to retention and final disposal.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-violet-500 mt-0.5">🌸</span>
                                        <span><strong>Improved Legibility:</strong> New high-contrast styling for Case Study sections.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>✅</span> Check it out in the Dak Sutra section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "13.04.2026",
        items: [
            {
                title: "📚 New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Recruitment Rules relating to various cadres in D/o Posts</strong> PDF notes for PS Group B Course Mode!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">Paper I (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-[11px]">Comprehensive notes covering the latest Recruitment Rules for various cadres in Department of Posts.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "06.04.2026",
        items: [
            {
                title: "🏆 Top 7 Rankers Published",
                desc: (
                    <div className="space-y-4">
                        <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                            The highly anticipated <strong>Top 7 Rankers</strong> list has been officially published!
                        </p>
                        
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                            <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Mock Tests with Results:</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">12</div>
                                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">LDCE IP Weekly Mock Test - 12</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-xs">01</div>
                                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">PS Group &apos;B&apos; Weekly Mock Test - 01</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-start gap-3">
                            <span className="text-lg">📊</span>
                            <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium leading-snug">
                                Check out the concerned mock test cards listed under <strong>Previous Mock Tests</strong> section to view rankings and your detailed analysis.
                            </p>
                        </div>

                        <p className="pt-2 text-[12px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                            <span>🚀</span> Head to the Mock Tests section now!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "04.04.2026",
        items: [
            {
                title: "🎯 Mock Test is Live",
                desc: (
                    <div className="space-y-3">
                        <div className="bg-red-50/50 dark:bg-red-900/10 p-3 rounded-2xl border border-red-100 dark:border-red-900/20">
                            <ul className="space-y-2 text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    LDCE IP Weekly Mock Test - 12
                                </li>
                                <li className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                    PS Gr B - Weekly Mock Test 01
                                </li>
                            </ul>
                        </div>
                        
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Live Test window will be open during this weekend (From <strong>04.04.2026 : 0000 hours</strong> upto <strong>2359 hours of 05.04.2026</strong>).
                        </p>
                        
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50 flex items-start gap-3">
                            <span className="text-xl">🏆</span>
                            <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium leading-snug">
                                <strong>Top 7 Rankers</strong> list for each mock test will be released on Monday.
                            </p>
                        </div>
                    </div>
                )
            }
        ]
    },
    {
        date: "01.04.2026",
        items: [
            {
                title: "📚 New PDF Notes Integrated for PS Group B",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated 3 new critical PDF Notes for <strong>PS Group B Paper II</strong>!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide mb-2">Paper II (Rules & Regulations)</p>
                                <ul className="space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">✅</span>
                                        <span><strong>Joining Time Rules:</strong> Central Civil Services (Joining Time) Rules, 1979.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">✅</span>
                                        <span><strong>RSA Rules:</strong> CCS (Recognition of Service Association) Rules, 1993.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-500 mt-0.5">✅</span>
                                        <span><strong>Inspection Questionnaires:</strong> Full Questionnaires for Inspection of Various offices.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Digital Library & Syllabus section!
                        </p>
                    </div>
                )
            },
            {
                title: "⚖️ Dak Sutra: Consumer Protection Act 2019 Overhaul",
                desc: (
                    <div className="space-y-4">
                        <p className="text-zinc-700 dark:text-zinc-300">
                            Completed a full legal and factual overhaul of the <strong>Consumer Protection Act, 2019</strong> study materials.
                        </p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                <p className="font-bold text-amber-700 dark:text-amber-300 text-[10px] uppercase tracking-wide mb-2">Statutory Corrections</p>
                                <ul className="space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">⚖️</span>
                                        <span><strong>Product Liability:</strong> Full update based on statutory text (Sections 82–87).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">📍</span>
                                        <span><strong>Section 87(1):</strong> Corrected "Misuse/Alteration" exception reference.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">🛡️</span>
                                        <span><strong>Liability Rules:</strong> Removed fabricated "30-day disclosure rule" for sellers.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-zinc-500 italic leading-relaxed">
                            Ensuring 100% legal precision for your PS Group B preparation.
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "31.03.2026",
        items: [
            {
                title: "🎁 Rule 13: Gift Limits & Foreign Gifts Update",
                desc: (
                    <div className="space-y-3">
                        <p className="text-zinc-700 dark:text-zinc-300">
                            Updated <strong>Rule 13 of CCS (Conduct) Rules</strong> regarding acceptance of gifts:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                            <li><strong>Relatives/Friends:</strong> Group C limit corrected to <strong>₹7,500</strong>.</li>
                            <li><strong>Non-Relatives:</strong> Corrected sanction requirement for gifts over ₹5,000.</li>
                            <li><strong>Foreign Gifts:</strong> Aligned with current retention and reporting rules.</li>
                        </ul>
                        <p className="pt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Updated in CCS Conduct Rules Guide!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "29.03.2026",
        items: [
            {
                title: "🎯 Introducing \"Dak Sutra\" — Postal Rules, Simplified",
                desc: (
                    <div className="space-y-3">
                        <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                            Say goodbye to complex legal jargon! We are thrilled to launch <strong>Dak Sutra</strong>, your ultimate guide to decoding postal rules.
                        </p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/10 dark:to-violet-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-800/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 blur-xl rounded-full" />
                                
                                <ul className="space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300 relative z-10">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">✨</span>
                                        <span><strong>Plain-Language Explanations:</strong> Official provisions broken down simply.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-violet-500 mt-0.5">💡</span>
                                        <span><strong>Real-Life Examples:</strong> Practical case studies bridging theory with reality.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">📝</span>
                                        <span><strong>Exam-Focused Insights:</strong> Everything you need, nothing you don't.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="pt-2 text-[12px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                            <span>🚀</span> <Link href="/dak-sutra">Explore Dak Sutra today!</Link>
                        </p>
                    </div>
                )
            },
            {
                title: "📚 GST Act, 2017 PDF Notes Uploaded",
                desc: (
                    <div className="space-y-4">
                        <p>The following study materials have been successfully uploaded under <strong>PS Gr B Paper II</strong> PDF Notes:</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-2 rounded border border-indigo-100 dark:border-indigo-800/50">
                                <p className="font-bold text-indigo-700 dark:text-indigo-300 text-[10px] uppercase tracking-wide">Paper II (PS Group B)</p>
                                <ul className="list-disc pl-4 space-y-1 mt-1 text-zinc-600 dark:text-zinc-400">
                                    <li>📘 Goods and Services Tax (GST) Act, 2017 – <strong>Detailed Notes</strong></li>
                                    <li>📗 Goods and Services Tax (GST) Act, 2017 – <strong>Brief Notes</strong></li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-zinc-600 dark:text-zinc-400">These notes are prepared in a structured and exam-oriented manner to strengthen your preparation.</p>

                        <ul className="space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400 border-l-[3px] border-amber-400 pl-3">
                            <li className="flex items-start gap-1">
                                <span className="pt-0.5 text-amber-500">🔹</span> 
                                <span>Use <strong>Detailed Notes</strong> for in-depth conceptual clarity</span>
                            </li>
                            <li className="flex items-start gap-1">
                                <span className="pt-0.5 text-amber-500">🔹</span> 
                                <span>Use <strong>Brief Notes</strong> for quick revision of important and distinguished concepts</span>
                            </li>
                        </ul>

                        <p className="text-[11px] text-zinc-500 italic">Stay consistent and make the most of these resources.</p>

                        <p className="pt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "26.03.2026",
        items: [
            {
                title: "📚 Postal Manual Volume II (Chapters III-VII) Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Postal Manual Volume II (Chapters III, IV, V, and VII)</strong> PDF notes for PS Group B Paper II!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-2 rounded border border-indigo-100 dark:border-indigo-800/50">
                                <p className="font-bold text-indigo-700 dark:text-indigo-300 text-[10px] uppercase tracking-wide">Paper II (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Study material covering Appeals, Personal Matters, Security Deposits, and Counterfeit currency.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "23.03.2026",
        items: [
            {
                title: "📬 Postal Manual Volume II Chapters Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Postal Manual Volume II (Chapters VI, VIII, IX, and XII)</strong> PDF notes for PS Group B Paper I!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-2 rounded border border-blue-100 dark:border-blue-800/50">
                                <p className="font-bold text-blue-700 dark:text-blue-300 text-[10px] uppercase tracking-wide">Paper I (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Study material covering Stock, Printing, Contracts, and Budget Estimates.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            },
            {
                title: "📚 CCS (LTC) Rules Updated",
                desc: (
                    <div className="space-y-4">
                        <p>The <strong>Central Civil Services (Leave Travel Concession) Rules, 1988</strong> PDF notes have been updated for PS Group B Course Mode!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">PS Group B Course Mode</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Updated material with latest revisions under the <strong>Paper II</strong> Establishment section.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "22.03.2026",
        items: [
            {
                title: "🧹 Swatchh Bharat MCQs Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated <strong>45 New MCQs</strong> covering <strong>Swatchh Bharat</strong> for PS Group B Paper II!</p>

                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">Paper II (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">3 practice sets covering Key Milestones, Special Campaigns 1.0–5.0, Swachhta Pakhwada, Action Plan, and Fund Utilization.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span>✅</span> Access now in the Quiz section under Paper II!
                        </p>
                    </div>
                )
            },
            {
                title: "📚 New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Schedule of Financial Powers</strong> of Divisional Heads, Heads of Circle, etc., in the study materials!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-2 rounded border border-blue-100 dark:border-blue-800/50">
                                <p className="font-bold text-blue-700 dark:text-blue-300 text-[10px] uppercase tracking-wide">1. LDCE IP Course Mode</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Integrated under <strong>Paper III</strong> Financial & Procurement section.</p>
                            </div>
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">2. PS Group B Course Mode</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Integrated under <strong>Paper I</strong> Establishment section.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            },
            {
                title: "📝 Schedule of Financial Powers MCQs Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated <strong>135 New MCQs</strong> covering the <strong>Schedule of Financial Powers</strong> (DFPR 2024)!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-2 rounded border border-blue-100 dark:border-blue-800/50">
                                <p className="font-bold text-blue-700 dark:text-blue-300 text-[10px] uppercase tracking-wide">1. Paper I (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Available under <strong>Establishment</strong> section in Paper I.</p>
                            </div>
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">2. Paper III (LDCE IP)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Available under <strong>Financial & Procurement</strong> section in Paper III.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Practice now in the Quiz & Flashcard section!
                        </p>
                    </div>
                )
            },
            {
                title: "📬 Handbook on Philately PDF Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>Handbook on Philately</strong> PDF notes for PS Group B Paper I!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">Paper I (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Full study material covering Philately services, products, and guidelines.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            },
            {
                title: "🏛️ CVC Public Procurement Guidelines PDF Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated the <strong>CVC guidelines on Public procurement</strong> and e-procurement instructions for PS Group B Paper I!</p>
                        
                        <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 text-[10px] uppercase tracking-wide">Paper I (PS Group B)</p>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1">Detailed guidelines on Public Procurement, e-procurement, and anti-corruption measures.</p>
                            </div>
                        </div>

                        <p className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Notes section!
                        </p>
                    </div>
                )
            },
            {
                title: "📝 More MCQs Integrated for PS Group B",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated new practice sets for the following topics in PS Group B:</p>
                        
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                            <li><strong>Maintenance of APAR</strong> (Paper I)</li>
                            <li><strong>Brochure on Casual Labourer</strong> (Paper II)</li>
                            <li><strong>Preservation and Disposal of Records</strong> (Paper II)</li>
                        </ul>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>✅</span> Practice now in the Quiz section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "21.03.2026",
        items: [
            {
                title: "📅 PS Group B Study Planner",
                desc: (
                    <div className="space-y-2">
                        <p>A brand new <strong>14-week Study Planner</strong> for <strong>PS Group B</strong> is now live!</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>Aligned with the official PS Gr B exam syllabus</li>
                            <li>Flexible study tracking — mark topics as complete at your own pace</li>
                            <li>Course mode switcher: PS Gr B ↔ LDCE IP</li>
                        </ul>
                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Check it out in the Planner section!
                        </p>
                    </div>
                )
            },
            {
                title: "📝 PS Group B Mock Test Series (14 Weeks)",
                desc: (
                    <div className="space-y-2">
                        <p>Introducing <strong>14 weekly Mock Tests</strong> for <strong>PS Group B</strong> — covering all topics week by week!</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>50 MCQs per test • 60 minutes duration</li>
                            <li>Every Sunday with topics from that week&apos;s study plan</li>
                            <li>All India ranking, answer sheet downloads & leaderboard</li>
                            <li>Enroll per test for just ₹49 (free for Diamond/Platinum members)</li>
                        </ul>
                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Head to Mock Tests → PS Group B!
                        </p>
                    </div>
                )
            },
            {
                title: "📚 Post Office Regulations 2024 (MCQs Upgraded)",
                desc: (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-[10px] uppercase tracking-wide opacity-70">1. Advanced Level (Updated)</p>
                            <p className="text-zinc-600 dark:text-zinc-400">Integrated <strong>175 New MCQs</strong> with accurate regulation numbers and formatted <strong>Matching Tables</strong> for in-depth study.</p>
                        </div>
                        <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-[10px] uppercase tracking-wide opacity-70">2. LDCE Level (New)</p>
                            <p className="text-zinc-600 dark:text-zinc-400">Launched a new <strong>Revision Booster</strong> card with <strong>150 High-Quality MCQs</strong> ensuring 100% topic coverage including footnotes.</p>
                        </div>
                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Access now in the Quiz section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "20.03.2026",
        items: [
            {
                title: "New PDF Notes & Premium Interface Update",
                desc: (
                    <div className="space-y-4">
                        <p>We have released new study materials and interface updates for <strong>LDCE IP Course Mode</strong>:</p>

                        <div className="space-y-2">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">Paper I (New PDFs Uploaded)</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>APT Knowledge (IT 2.0)</li>
                                <li>Core Banking Solutions (Working knowledge of CBS)</li>
                            </ul>
                        </div>

                        <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">Paper III (Premium Interface)</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Golden Commemorative Card for <strong>Constitution of India</strong> honoring Dr. B. R. Ambedkar</li>
                            </ul>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Check them out in the Notes section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "16.03.2026",
        items: [
            {
                title: "New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-4">
                        <p>We have uploaded 3 new PDF Notes for <strong>PS Group B Course Mode</strong>:</p>

                        <div className="space-y-2">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">Paper I</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Establishment Norms</li>
                            </ul>
                        </div>

                        <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">Paper II</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Swatchh Bharat</li>
                                <li>Public Accountants Default Act, 1850</li>
                            </ul>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Check them out in the Notes section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "14.03.2026",
        items: [
            {
                title: "February 2026 Current Affairs Flashcards Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated <strong>544 new flashcards</strong> for <strong>February 2026</strong> across all major categories:</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-2 rounded border border-blue-100 dark:border-blue-800/50">
                                <p className="font-bold text-blue-700 dark:text-blue-300">National & Sports</p>
                                <p className="text-zinc-500">225 Cards</p>
                            </div>
                            <div className="bg-amber-50/50 dark:bg-amber-900/10 p-2 rounded border border-amber-100 dark:border-amber-800/50">
                                <p className="font-bold text-amber-700 dark:text-amber-300">Banking & Economy</p>
                                <p className="text-zinc-500">63 Cards</p>
                            </div>
                            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded border border-emerald-100 dark:border-emerald-800/50">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300">Sci-Tech & MoUs</p>
                                <p className="text-zinc-500">133 Cards</p>
                            </div>
                            <div className="bg-purple-50/50 dark:bg-purple-900/10 p-2 rounded border border-purple-100 dark:border-purple-800/50">
                                <p className="font-bold text-purple-700 dark:text-purple-300">International & Govt</p>
                                <p className="text-zinc-500">123 Cards</p>
                            </div>
                        </div>

                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                            Highlights: <strong>Union Budget 2026-27</strong>, <strong>U-19 World Cup 2026</strong>, <strong>Chandrayaan-4 landing site</strong>, and <strong>Pax Silica Coalition</strong>.
                        </p>
                        
                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Check them out in the Flashcards section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "09.03.2026",
        items: [
            {
                title: "New PDF Notes Integrated",
                desc: (
                    <div className="space-y-4">
                        <p>We have integrated 4 new PDF Notes across course modes:</p>

                        <div className="space-y-2">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">1. LDCE IP Course Mode</p>
                            <p className="text-[11px] text-zinc-500">New tiles in Paper III:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>FR & SR - General Rules</li>
                                <li>FR & SR - TA Rules</li>
                                <li>FR & SR - DA, DR & HRA Rules</li>
                            </ul>
                        </div>

                        <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">2. PS Group B Course Mode</p>
                            <p className="text-[11px] text-zinc-500">New tiles in Paper II:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>FR & SR - General Rules</li>
                                <li>FR & SR - TA Rules</li>
                                <li>FR & SR - DA, DR & HRA Rules</li>
                                <li>CCS (Revised Pay) Rules, 2016</li>
                            </ul>
                        </div>

                        <p className="pt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span>🚀</span> Check them out in the Notes section!
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        date: "08.03.2026",
        items: [
            {
                title: "Updated PYQs for PS Group B Course Mode",
                desc: (
                    <div className="space-y-2">
                        <p>We have integrated the <strong>LDCE PS Gr. B 2023 Previous Year Questions</strong> for interactive study:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li><strong>Paper I PYQ:</strong> General Financial Rules, Service Rules & other Acts.</li>
                            <li><strong>Paper II PYQ:</strong> Postal Operations, SB, PLI & Allied Topics.</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Start studying in the Previous Year Papers section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "06.03.2026",
        items: [
            {
                title: "New PDF Notes Uploaded for PS Group B",
                desc: (
                    <div className="space-y-2">
                        <p>We have uploaded the following PDF Notes under Paper III:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>Central Civil Services (Leave Travel Concession) Rules, 1988</li>
                            <li>Central Services (Medical Attendance) Rules, 1944</li>
                            <li>Rules relating to Children Education allowance and reimbursement of Hostel Subsidy</li>
                            <li>Central Government Employees Group Insurance Scheme, 1980</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section (PS Group B mode)!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "05.03.2026",
        items: [
            {
                title: "New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-2">
                        <p>We have uploaded the following PDF Notes:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>Manual of Office Procedure</li>
                            <li>Manual for Procurement of Goods &amp; Services</li>
                            <li>Instructions on Maintenance of APAR</li>
                            <li>
                                <span>Complaint &amp; Grievance Handling</span>
                                <span className="block text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">Updated with new version</span>
                            </li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "04.03.2026",
        items: [
            {
                title: "New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-2">
                        <p>We have uploaded the following PDF Notes:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>Citizen Charter of Department of Posts</li>
                            <li>Complaint &amp; Grievance Handling</li>
                            <li>Postal Manual Volume II - Chapter XI (Misc. Rules)</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "01.03.2026",
        items: [
            {
                title: "New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-2">
                        <p>We have updated/uploaded the following PDF Notes:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>
                                <strong>Postal Manual Volume IV</strong>
                                <span className="block text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">Correction in Page 5 and Removed Legislative Update in Page 6</span>
                            </li>
                            <li>Manual for Procurement of Goods &amp; Services</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "28.02.2026",
        items: [
            {
                title: "New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-2">
                        <p>We have uploaded the following PDF Notes:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>India Post Payments Bank</li>
                            <li>Preservation of Records</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "25.02.2026",
        items: [
            {
                title: "New PDF Notes Uploaded",
                desc: "Uploaded PDF Notes on Annual Report and Book of Information 2024-2025 & 2025-2026 for both LDCE IP and PS Gr B Courses."
            }
        ]
    },
    {
        date: "24.02.2026",
        items: [
            {
                title: "New PDF Notes Added to Paper III",
                desc: (
                    <div className="space-y-2">
                        <p>We have updated the following PDF Notes under <strong>Paper III</strong>:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>CCS (Implementation of NPS) Rules, 2021</li>
                            <li>CCS (Payment of Gratuity under NPS) Rules, 2021</li>
                            <li>General Financial Rules, 2017 (under the GFR section)</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "18.02.2026",
        items: [
            {
                title: "New PDF Notes Uploaded",
                desc: (
                    <div className="space-y-2">
                        <p>We have updated/uploaded the following PDF Notes:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>PO Small Savings Schemes</li>
                            <li>MNOP & PNOP Guidelines</li>
                            <li>Dak Ghar Niryat Kendra (DNKs)</li>
                            <li>Consolidation of Products & Centralized Delivery Policy</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "13.02.2026",
        items: [
            {
                title: "New PDF Notes Added to Paper III",
                desc: (
                    <div className="space-y-2">
                        <p>We have uploaded a comprehensive set of new PDF notes for <strong>Paper III</strong>. You can now access:</p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>CCS (Pension) Rules, 2021</li>
                            <li>Financial Hand Book (FHB) Vol - I & II</li>
                            <li>CCS (GPF) Rules, 1961</li>
                            <li>Brochure on Casual Labourers</li>
                            <li>CCS (Commutation of Pension) Rules, 1981</li>
                            <li>Service Discharge Benefit Scheme</li>
                            <li>Maintenance of APAR</li>
                            <li>Welfare Measures for Employees & GDS</li>
                        </ul>
                        <p className="pt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">👉 Check them out in the Notes section!</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "10.02.2026",
        items: [
            {
                title: "Flashcards Section Revamped – Now Live!",
                desc: (
                    <div className="space-y-2">
                        <p>We’re excited to announce that the <strong>Flashcards Section</strong> has been completely revamped!</p>
                        <div className="space-y-1">
                            <p className="font-semibold">✨ What’s New:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Added a dedicated <strong>Current Affairs</strong> category</li>
                                <li>Flashcards for <strong>January 2026</strong> are now being added under major and important sub-categories</li>
                                <li>The <strong>Current Affairs Flashcards page is open for FREE access</strong> to all users for a limited period</li>
                            </ul>
                        </div>
                        <p>We invite you to explore the updated section and share your <strong>valuable feedback and suggestions</strong> to help us further improve the content and user interface.</p>
                        <p className="pt-2">👉 Visit: <Link href="/flashcards" className="text-blue-600 hover:underline font-bold">www.dakguru.com/flashcards</Link> → Current Affairs Category</p>
                    </div>
                )
            }
        ]
    },
    {
        date: "07.02.2026",
        items: [
            {
                title: "PDF Notes Uploaded",
                desc: "GDS (Conduct & Engagement) Rules, 2020 PDF is now linked in the 'Paper I' section. Sexual Harassment of Women at Workplace Act, 2013 PDF is now linked in the 'Paper III' section. Both documents are now accessible in the application."
            }
        ]
    },
    {
        date: "04.02.2026",
        items: [
            { title: "Smart Reader Experience", desc: "The Smart Reader now provides a fully immersive reading experience with smooth, native-feeling vertical scrolling." },
            { title: "Layout Improvements", desc: "Fixed content overlap with navigation bars and ensured settings button is always fully accessible." },
            { title: "Device Optimization", desc: "Added proper safe area handling for modern devices while maintaining full-screen reading mode." }
        ]
    },
    {
        date: "03.02.2026",
        items: [
            { title: "Duplicate Topic Fix", desc: "Removed duplicate topics in the Flexible Study Planner view." },
            { title: "Mock Test Schedule Fix", desc: "Included Saturday in the weekly test topic aggregation." },
            { title: "Duration Format", desc: 'Updated the "1 Day, Day 1 of 2" display logic to show "1 Day" or "X Days" cleanly.' },
            { title: "Schedule Updates", desc: 'Consolidated "PO Life Insurance Rules, 2011 & RPLI Rules" into a 3-day block.' },
            { title: "New \"SB Orders\" Tab", desc: "Added a dedicated tab for SB Orders with years 2011-2025." },
            { title: "Google Drive Viewer", desc: "Integrated support for Google Drive preview links in the PdfViewer, allowing SB Orders to be viewed directly in the app." }
        ]
    }
];

interface UpdatesDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UpdatesDrawer({ isOpen, onClose }: UpdatesDrawerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Drawer Panel */}
            <div className="relative w-full sm:w-96 h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="header sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 p-4 pt-[max(20px,env(safe-area-inset-top,0px))] sm:p-5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-blue-500/20 rounded-full animate-pulse"></div>
                            <div className="relative w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Bell className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-none">What's New</h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Latest features & fixes</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-8 pb-20 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {UPDATES_DATA.map((group, groupIndex) => (
                        <div key={groupIndex} className="relative pl-4 border-l-2 border-zinc-100 dark:border-zinc-800">
                            {/* Date Badge */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 bg-blue-600"></div>

                            <div className="mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-800 mb-4">
                                    <Calendar className="w-3 h-3" />
                                    {group.date}
                                </span>

                                <div className="space-y-4">
                                    {group.items.map((item, i) => (
                                        <div key={i} className="group bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:border-blue-200 dark:hover:border-blue-900/30 hover:shadow-sm transition-all duration-200">
                                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1.5 flex items-start gap-2">
                                                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                                {item.title}
                                            </h3>
                                            <div className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 pl-5.5">
                                                {item.desc}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-300 mb-3">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-zinc-400">You are all caught up!</p>
                    </div>
                </div>

                {/* Footer (Optional) */}
                <div className="shrink-0 p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-center">
                    <p className="text-[10px] text-zinc-400">Dak Guru v1.2.0 • Made with ❤️</p>
                </div>
            </div>
        </div>
    );
}
