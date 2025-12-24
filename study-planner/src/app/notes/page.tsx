"use client";

import React, { useState } from 'react';
import HomeHeader from '@/components/HomeHeader';
import { FileText, Download, Eye, BookOpen, Layers } from 'lucide-react';

// --- DATA ---
const PDF_DATA = {
    "Paper I": [
        {
            title: "The Post Office Act, 2023 & Rules 2024",
            description: "Comprehensive notes on the new Post Office Act and its associated rules.",
            filename: "PO_Act_2023_Rules_2024.pdf",
            path: "/notes/paper-1/PO_Act_2023_Rules_2024.pdf",
            size: "8.7 MB",
            color: "blue"
        },
        {
            title: "PMLA Act, 2002",
            description: "Prevention of Money Laundering Act, 2002 - Key provisions and amendments.",
            filename: "PMLA_Act_2002.pdf",
            path: "/notes/paper-1/PMLA_Act_2002.pdf",
            size: "8.8 MB",
            color: "indigo"
        }
    ],
    "Paper III": [
        {
            title: "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
            description: "Detailed analysis of the BNSS, 2023 replacing the CrPC.",
            filename: "BNSS_2023.pdf",
            path: "/notes/paper-3/BNSS_2023.pdf",
            size: "8.7 MB",
            color: "purple"
        }
    ]
};

export default function NotesPage() {
    const [activeTab, setActiveTab] = useState("Paper I");

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <HomeHeader isLoggedIn={true} membershipLevel="silver" />

            {/* --- HERO SECTION --- */}
            <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20 pt-16 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-800/50 rounded-full border border-purple-500/30 mb-6 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-medium text-purple-100 tracking-wide">DIGITAL LIBRARY</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Material</span>
                    </h1>
                    <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Curated PDF notes and reference materials for your preparation.
                    </p>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-200/60 inline-flex gap-2">
                        {["Paper I", "Paper III"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === tab
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                <Layers className="w-4 h-4" />
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {PDF_DATA[activeTab as keyof typeof PDF_DATA]?.map((file, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${file.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        file.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                            'bg-indigo-50 text-indigo-600'
                                    }`}>
                                    <FileText className="w-8 h-8" />
                                </div>
                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                                    PDF
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-purple-700 transition-colors">
                                {file.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">
                                {file.description}
                            </p>

                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <a
                                    href={file.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors border border-slate-200"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </a>
                                <a
                                    href={file.path}
                                    download={file.filename}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-all shadow-md hover:shadow-lg hover:shadow-purple-500/20"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </a>
                            </div>
                            <div className="mt-3 text-center">
                                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">{file.size}</span>
                            </div>
                        </div>
                    ))}

                    {(!PDF_DATA[activeTab as keyof typeof PDF_DATA] || PDF_DATA[activeTab as keyof typeof PDF_DATA].length === 0) && (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-400">No notes available for {activeTab} yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p>Dak Guru ~ Learn, Practice, Succeed.</p>
                </div>
            </div>
        </div>
    );
}
