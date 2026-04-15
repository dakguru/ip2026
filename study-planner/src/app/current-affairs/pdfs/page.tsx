"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, FileText, Download, Eye, X, 
    Calendar, ChevronRight, Sparkles, Files, ExternalLink
} from 'lucide-react';
import AppScreenWrapper from '@/components/AppScreenWrapper';
import PdfViewer from '@/components/PdfViewer';
import HomeHeader from '@/components/HomeHeader';
import { useIsMobileApp } from '@/hooks/use-mobile-app';

const MONTHLY_PDFS = [
    { title: "March 2026", file: "March-2026.pdf", isNew: true },
    { title: "February 2026", file: "February-2026.pdf" },
    { title: "January 2026", file: "January-2026.pdf" },
    { title: "December 2025", file: "December-2025.pdf" },
    { title: "November 2025", file: "November-2025.pdf" },
    { title: "October 2025", file: "October-2025.pdf" },
    { title: "September 2025", file: "September-2025.pdf" },
    { title: "August 2025", file: "August - 2025.pdf" },
];

export default function CurrentAffairsPDFs() {
    const [viewingPdf, setViewingPdf] = useState<string | null>(null);
    const isMobileApp = useIsMobileApp();

    const handleDownload = (fileName: string) => {
        const link = document.createElement('a');
        link.href = `/pdfs/ca/${fileName}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isMobileApp) {
        return (
            <AppScreenWrapper
                className="bg-zinc-50 dark:bg-zinc-950"
                header={
                    <div className="flex items-center gap-4 w-full">
                        <Link href="/current-affairs" className="p-1 -ml-1 rounded-full text-zinc-900 dark:text-zinc-100 active:bg-zinc-200 dark:active:bg-zinc-800 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Monthly Digests</h1>
                    </div>
                }
            >
                <div className="flex-1 flex flex-col pb-24">
                    
                    {/* Clean Info Card */}
                    <div className="px-5 py-6 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                                    <Files className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-zinc-900 dark:text-white">PDF Archive</h2>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Aug 2025 - Mar 2026</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500">
                                {MONTHLY_PDFS.length} Issues
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                            Curated monthly current affairs summaries sourced from Adda247 to streamline your preparation.
                        </p>
                    </div>

                    {/* PDF List - Native Style */}
                    <div className="px-4 space-y-3">
                        {MONTHLY_PDFS.map((pdf, idx) => (
                            <div key={idx} className="bg-white dark:bg-zinc-900 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 p-4 flex items-center gap-4">
                                <div className="shrink-0 w-12 h-14 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex flex-col items-center justify-center">
                                    <FileText className="w-6 h-6 text-rose-500" />
                                    <span className="text-[8px] font-black text-zinc-400 uppercase">PDF</span>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">{pdf.title}</h3>
                                        {pdf.isNew && (
                                            <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[8px] font-black uppercase">NEW</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 uppercase tracking-wider">Digest Issue</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setViewingPdf(pdf.file)}
                                        className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 active:scale-90 transition-transform"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDownload(pdf.file)}
                                        className="p-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 active:scale-90 transition-transform"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Source Credit Section */}
                    <div className="mt-12 mb-8 px-6 py-8 mx-4 rounded-[2rem] bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-center">
                        <p className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-4">Content Recognition</p>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-8 relative grayscale opacity-40">
                                <Image src="/ca-logo.png" alt="Adda247 Logo" fill className="object-contain" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-black text-zinc-800 dark:text-zinc-200">Adda247 Current Affairs</p>
                                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed px-4">
                                    This content is curated and presented for educational purposes. All rights and credits belong to Adda247.
                                </p>
                            </div>
                            <a 
                                href="https://www.adda247.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-2 text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest hover:underline"
                            >
                                Official Website <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Viewer Modal */}
                <AnimatePresence>
                    {viewingPdf && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="shrink-0 h-16 border-b border-zinc-800 px-6 flex items-center justify-between bg-zinc-900">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-rose-500/10">
                                        <FileText className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white truncate max-w-[200px]">{viewingPdf}</h3>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase">PDF Reader</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setViewingPdf(null)}
                                    className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center active:scale-95 transition-transform"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-hidden relative">
                                <PdfViewer url={`/pdfs/ca/${viewingPdf}`} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </AppScreenWrapper>
        );
    }

    // Default Desktop View
    return (
        <AppScreenWrapper hideStatusBarPadding={true}>
            <HomeHeader isLoggedIn={true} />
            
            <div className="flex-1 bg-white dark:bg-zinc-950 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Targeted Banner - Curated Resource */}
                    <div className="relative mb-8 rounded-[3rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl shadow-zinc-200/50 dark:shadow-none">
                        
                        {/* Decorative background flare */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-50/50 dark:bg-rose-950/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000"></div>
                        
                        <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-center gap-12">
                            
                            {/* Left Content */}
                            <div className="flex-1 space-y-6 text-center md:text-left">
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-[11px] font-black uppercase tracking-wider border border-rose-100 dark:border-rose-800/50"
                                >
                                    <span className="text-base">📘</span>
                                    <span>Curated External Resource</span>
                                </motion.div>

                                <div className="space-y-2">
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                                        Targeted Current Affairs
                                    </h1>
                                    <h2 className="text-4xl md:text-5xl font-black text-rose-600 dark:text-rose-500 tracking-tight leading-tight">
                                        Monthly PDF Digests
                                    </h2>
                                </div>

                                <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed max-w-xl">
                                    Carefully curated current affairs materials sourced from reputed platforms to support your exam preparation.
                                </p>
                            </div>

                            {/* Right Credit Box - Themed after Adda247 */}
                            <div className="shrink-0 w-full md:w-[320px]">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2.5rem] flex flex-col items-center gap-6 text-center relative overflow-hidden group shadow-sm"
                                >
                                    {/* Shimmer on credit box */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    
                                    <div className="relative w-40 h-16 transition-transform duration-500 group-hover:scale-105">
                                        <Image src="/adda247-logo.png" alt="Adda247 Logo" fill className="object-contain" />
                                    </div>
                                    
                                    <div className="h-[2px] w-12 bg-rose-500/20 rounded-full"></div>

                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">Source Credit</p>
                                            <p className="text-sm font-black text-zinc-800 dark:text-zinc-200">Adda247 Current Affairs</p>
                                        </div>
                                        <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">
                                            We acknowledge and thank Adda247 for the original content.
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50 w-full">
                                        <p className="text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em] mb-2">In Collaboration With</p>
                                        <a 
                                            href="https://www.adda247.com" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs font-black text-zinc-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors tracking-tight"
                                        >
                                            www.Adda247.com
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* PDF Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MONTHLY_PDFS.map((pdf, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <div className="group h-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-500/30">
                                    <div className="relative aspect-[4/5] mb-6 bg-white dark:bg-zinc-950 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                                                <FileText className="w-8 h-8 text-rose-500" strokeWidth={2.5} />
                                            </div>
                                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">PDF Document</p>
                                            <p className="text-xs font-bold text-zinc-300 dark:text-zinc-600">Secure Study Resource</p>
                                        </div>
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-3 duration-300">
                                            <button 
                                                onClick={() => setViewingPdf(pdf.file)}
                                                className="w-full py-3 bg-white text-zinc-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" /> View Now
                                            </button>
                                            <button 
                                                onClick={() => handleDownload(pdf.file)}
                                                className="w-full py-3 bg-zinc-800 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-4 h-4" /> Download
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-auto space-y-1">
                                        <h4 className="text-base font-black text-zinc-900 dark:text-white tracking-tight group-hover:text-rose-500 transition-colors">
                                            {pdf.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                                            <Calendar className="w-3 h-3" />
                                            <span>Monthly Digest</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tip Box */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/50 rounded-3xl flex items-start gap-5 shadow-sm"
                    >
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-800">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-black text-blue-900 dark:text-blue-200 uppercase tracking-widest">Efficiency Tip</p>
                            <p className="text-sm text-blue-800/80 dark:text-blue-300/80 font-medium leading-relaxed">Combine these digests with the <Link href="/flashcards?filter=ca" className="text-blue-600 dark:text-blue-400 underline font-extrabold">Active Recall Flashcards</Link> for 2x faster memorization of key facts and figures.</p>
                        </div>
                    </motion.div>

                    {/* Footer Credits */}
                    <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800 text-center">
                        <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6 px-4">Copyrighted Resource</p>
                        <div className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Original Content & Rights by</p>
                            <a href="https://www.adda247.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                <span className="text-lg font-black text-zinc-800 dark:text-zinc-200 group-hover:text-rose-600 transition-colors">Adda247 Current Affairs</span>
                                <div className="p-1 px-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-tighter">Visit Official Website</div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Viewer Modal */}
            <AnimatePresence>
                {viewingPdf && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col"
                    >
                        {/* Modal Header */}
                        <div className="shrink-0 h-16 border-b border-zinc-800 px-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-rose-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white tracking-tight uppercase">Reading Mode</h3>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{viewingPdf}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setViewingPdf(null)}
                                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-hidden relative">
                            <PdfViewer url={`/pdfs/ca/${viewingPdf}`} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AppScreenWrapper>
    );
}
