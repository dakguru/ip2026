
"use client";

import { useEffect, useState, use } from "react";
import {
    ArrowLeft, FileText, BookOpen, Zap,
    Info, Share2, Printer, Loader2,
    Calendar, Bookmark, Check, Download
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function DakSutraDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [entry, setEntry] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSharing, setIsSharing] = useState(false);

    useEffect(() => {
        fetch(`/api/dak-sutra/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.entry) setEntry(data.entry);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

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
            await navigator.clipboard.writeText(url);
            setIsSharing(true);
            setTimeout(() => setIsSharing(false), 2000);
        }
    };

    const handleDownload = async () => {
        const { generateDakSutraPDF } = await import("@/lib/pdf-generator-dak-sutra");
        await generateDakSutraPDF({
            title: entry.title,
            rule_number: entry.rule_number,
            act_name: entry.act_name,
            category: entry.category,
            effective_date: entry.effective_date,
            official_text: entry.official_text || "",
            guru_explanation: entry.guru_explanation || "",
            practical_example: entry.practical_example,
            exam_insight: entry.exam_insight
        });
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
                <p className="text-zinc-500 text-lg font-bold">Rule not found or restricted</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-zinc-950 pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <Link href="/dak-sutra" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium text-sm">All Rules</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{entry.category}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8 md:space-y-10">
                {/* Title Section */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {entry.exam_tags?.map((tag: string) => (
                            <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {entry.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-blue-500 shrink-0" />
                            <span>{entry.act_name} {entry.rule_number ? `- ${entry.rule_number}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                            <span>Eff. Date: {entry.effective_date ? format(new Date(entry.effective_date), 'PPP') : 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Content Cards */}
                <div className="grid grid-cols-1 gap-8">
                    {/* 1. Official Provision */}
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden">
                        <div className="px-5 md:px-6 py-3 bg-zinc-200/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Official Provision</span>
                            <FileText className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div className="p-5 md:p-8 overflow-x-auto">
                            <div
                                className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-base md:text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: entry.official_text }}
                            />
                        </div>
                    </div>

                    {/* 2. Dak Guru Explanation */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl md:rounded-3xl shadow-xl shadow-blue-500/5 overflow-hidden ring-1 ring-blue-500/10">
                        <div className="px-5 md:px-6 py-3 bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-50 dark:border-blue-900/20 flex items-center justify-between">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Dak Guru Explanation</span>
                            <BookOpen className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="p-5 md:p-8 overflow-x-auto">
                            <div
                                className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-base md:text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: entry.guru_explanation }}
                            />
                        </div>
                    </div>

                    {/* 3. Practical Example */}
                    {entry.practical_example && (
                        <div className="bg-blue-600 dark:bg-blue-900/30 border border-blue-500/50 rounded-2xl md:rounded-3xl shadow-xl shadow-blue-600/10 overflow-hidden text-white">
                            <div className="px-5 md:px-6 py-3 bg-blue-700/50 dark:bg-blue-800/50 border-b border-blue-500/50 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Practical Example</span>
                                <Info className="w-4 h-4 text-blue-200" />
                            </div>
                            <div className="p-5 md:p-8 overflow-x-auto">
                                <div
                                    className="prose prose-invert max-w-none text-blue-50 text-base md:text-lg leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: entry.practical_example }}
                                />
                            </div>
                        </div>
                    )}

                    {/* 4. LDCE Exam Insight */}
                    {entry.exam_insight && (
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 rounded-2xl md:rounded-3xl shadow-xl shadow-orange-500/20 overflow-hidden text-white">
                            <div className="px-5 md:px-6 py-3 bg-white/10 border-b border-white/10 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">LDCE Exam Insight</span>
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div className="p-5 md:p-8 overflow-x-auto">
                                <div
                                    className="prose prose-invert max-w-none text-white text-base md:text-lg leading-relaxed font-bold"
                                    dangerouslySetInnerHTML={{ __html: entry.exam_insight }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-center gap-4 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={handleShare}
                        className="flex flex-col items-center gap-2 p-3 md:p-4 min-w-[100px] rounded-xl md:rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95 group"
                    >
                        {isSharing ? <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" /> : <Share2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 group-hover:scale-110 transition-transform" />}
                        <span className="text-[10px] md:text-xs font-bold text-zinc-600 dark:text-zinc-400 text-center">{isSharing ? 'Done' : 'Share'}</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex flex-col items-center gap-2 p-3 md:p-4 min-w-[100px] rounded-xl md:rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm active:scale-95 group"
                    >
                        <Download className="w-4 h-4 md:w-5 md:h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] md:text-xs font-bold text-zinc-600 dark:text-zinc-400 text-center uppercase tracking-widest">PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
