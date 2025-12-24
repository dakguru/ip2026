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
        },
        {
            title: "Government Savings Promotion Act, 1873",
            description: "Detailed notes on the Government Savings Promotion Act, 1873.",
            filename: "GSPA_1873.pdf",
            path: "/notes/paper-1/GSPA_1873.pdf",
            size: "8.7 MB",
            color: "blue"
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
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

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
                                <button
                                    onClick={() => setSelectedPdf(file.path)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors border border-slate-200"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
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

            {/* --- PDF VIEWER MODAL --- */}
            {selectedPdf && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full h-full max-w-6xl flex flex-col shadow-2xl overflow-hidden relative">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 w-full">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-purple-600" />
                                Document Viewer
                            </h3>
                            <button
                                onClick={() => setSelectedPdf(null)}
                                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-slate-100 relative">
                            <object
                                data={selectedPdf}
                                type="application/pdf"
                                className="w-full h-full absolute inset-0 rounded-b-2xl"
                            >
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
                                    <FileText className="w-12 h-12 text-slate-300 mb-4" />
                                    <p className="text-slate-600 font-medium mb-2">Unable to display PDF directly.</p>
                                    <p className="text-slate-400 text-sm mb-6 max-w-md">
                                        Your browser might not support embedding PDFs, or the file size is too large for the viewer.
                                    </p>
                                    <a
                                        href={selectedPdf}
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg hover:shadow-purple-500/30 hover:bg-purple-700 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Instead
                                    </a>
                                </div>
                            </object>
                        </div>
                    </div>
                </div>
            )}

            {/* --- FOOTER REMOVED --- */}
        </div>
    );
}
