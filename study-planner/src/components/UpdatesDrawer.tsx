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
