"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, FileText, Download, ExternalLink, Info, Star, 
    Eye, X, Loader2, Calendar, ChevronRight, Zap, Trophy,
    ShieldCheck, Sparkles, Files
} from 'lucide-react';
import AppScreenWrapper from '@/components/AppScreenWrapper';
import PdfViewer from '@/components/PdfViewer';

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

    const handleDownload = (fileName: string) => {
        const link = document.createElement('a');
        link.href = `/pdfs/ca/${fileName}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AppScreenWrapper
            className="bg-zinc-50 dark:bg-black"
            header={
                <div className="flex items-center justify-between w-full">
                    <Link href="/current-affairs" className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </Link>
                    <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Monthly Digests</h1>
                    <div className="w-9" />
                </div>
            }
        >
            <div className="relative min-h-full pb-20">
                
                {/* Visual Header Background */}
                <div className="absolute top-0 left-0 w-full h-[350px] bg-gradient-to-b from-rose-500/10 via-blue-500/5 to-transparent pointer-events-none" />

                <div className="max-w-5xl mx-auto px-5 pt-8 md:pt-12 relative z-10">
                    
                    {/* Banner Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 mb-12 shadow-2xl shadow-rose-500/5 md:flex items-center justify-between gap-12 overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[100px] pointer-events-none" />
                        
                        <div className="space-y-5 mb-8 md:mb-0 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800/50">
                                <span>📘 Curated External Resource</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
                                Targeted Current Affairs <br />
                                <span className="text-rose-600 dark:text-rose-400">Monthly PDF Digests</span>
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
                                Carefully curated current affairs materials sourced from reputed platforms to support your exam preparation. Integrated with a premium reader for effortless revision.
                            </p>
                        </div>

                        <div className="shrink-0 flex flex-col items-center gap-5 bg-zinc-50 dark:bg-zinc-800 p-8 rounded-[2rem] border-2 border-zinc-100 dark:border-zinc-700 shadow-inner relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-40 h-16">
                                <Image src="/ca-logo.png" alt="Adda247 Logo" fill className="object-contain" />
                            </div>
                            <div className="text-center relative z-10">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Source Credit</p>
                                <p className="text-base font-black text-zinc-800 dark:text-zinc-100">Adda247 Current Affairs</p>
                                <p className="text-[10px] text-zinc-500 mt-2 font-bold max-w-[180px] leading-relaxed">We acknowledge and thank Adda247 for the original content.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* PDF Section */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.25em] flex items-center gap-3">
                                <Files className="w-4 h-4 text-rose-500" />
                                <span>Archive: Aug 2025 - Mar 2026</span>
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-700">{MONTHLY_PDFS.length} Documents</span>
                            </div>
                        </div>

                        {/* Interactive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {MONTHLY_PDFS.map((pdf, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                                    className="group"
                                >
                                    <div className="relative h-full bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-6 hover:border-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-300 flex flex-col">
                                        
                                        {pdf.isNew && (
                                            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[8px] font-black uppercase tracking-widest animate-pulse z-20">
                                                New
                                            </div>
                                        )}

                                        <div className="relative w-full aspect-[3/4] rounded-2xl bg-zinc-50 dark:bg-zinc-800 mb-6 overflow-hidden border border-zinc-100 dark:border-zinc-700 group-hover:shadow-lg transition-all duration-500">
                                            {/* Preview Placeholder */}
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
                    </div>

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
