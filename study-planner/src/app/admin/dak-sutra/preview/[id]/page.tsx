
"use client";

import { useEffect, useState, use } from "react";
import {
    ArrowLeft, FileText, BookOpen,
    Info, Download, Share2, Printer, Loader2,
    Calendar, Tag, Bookmark, Check
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function DakSutraPreviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [entry, setEntry] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/admin/dak-sutra/${id}`)
            .then(res => res.json())
            .then(data => {
                setEntry(data.entry);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    const [isSharing, setIsSharing] = useState(false);

    const handleDownload = async () => {
        const { generateDakSutraPDF } = await import("@/lib/pdf-generator-dak-sutra");
        await generateDakSutraPDF({
            title: entry.title,
            rule_number: entry.rule_number,
            act_name: entry.act_name,
            category: entry.category,
            effective_date: entry.effective_date,
            official_text: entry.official_text || "",
            guru_explanation: entry.guru_explanation || ""
        });
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Dak Sutra: ${entry.title}`,
                    text: `Check out this Postal Rule: ${entry.title}`,
                    url: url
                });
            } catch (err) {
                console.error("Share failed", err);
            }
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(url);
            setIsSharing(true);
            setTimeout(() => setIsSharing(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!entry) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <p className="text-zinc-500 text-lg font-bold">Entry not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-zinc-950 pb-20">
            {/* Header / Nav */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/admin/dak-sutra" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium text-sm">Back to List</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${entry.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {entry.status}
                        </span>
                        <Link href={`/admin/dak-sutra/edit/${entry._id}`} className="text-sm font-bold text-blue-600">Edit</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
                {/* Title Section */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{entry.category}</span>
                        {entry.exam_tags.map((tag: string) => (
                            <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {entry.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-blue-500" />
                            <span>{entry.act_name} {entry.rule_number ? `- ${entry.rule_number}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            <span>Eff. Date: {entry.effective_date ? format(new Date(entry.effective_date), 'PPP') : 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Content Cards */}
                <div className="grid grid-cols-1 gap-8">
                    {/* 1. Official Provision */}
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden">
                        <div className="px-6 py-3 bg-zinc-200/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Official Provision</span>
                            <FileText className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div className="p-8">
                            <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 font-serif text-lg leading-relaxed whitespace-pre-wrap">
                                {entry.official_text}
                            </div>
                        </div>
                    </div>

                    {/* 2. Dak Guru Explanation */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-xl shadow-blue-500/5 overflow-hidden ring-1 ring-blue-500/10">
                        <div className="px-6 py-3 bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-50 dark:border-blue-900/20 flex items-center justify-between">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Dak Guru Explanation</span>
                            <BookOpen className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="p-8">
                            <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed whitespace-pre-wrap">
                                {entry.guru_explanation}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-4 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={handleDownload}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95 group"
                    >
                        <Download className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Generate PDF</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95 group"
                    >
                        <Printer className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Print / Save</span>
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95 group"
                    >
                        {isSharing ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />}
                        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{isSharing ? 'Copied!' : 'Share Link'}</span>
                    </button>
                </div>

                {entry.document_url && (
                    <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-red-500" />
                            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Original Document Attached</span>
                        </div>
                        <a href={entry.document_url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600">Open PDF</a>
                    </div>
                )}
            </div>
        </div>
    );
}
