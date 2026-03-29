"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, Calendar, Download, Eye, ExternalLink, FileText, Share2, Tag, Gavel, Bell, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
    ssr: false,
    loading: () => (
        <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse text-zinc-500">Loading viewer…</div>
        </div>
    ),
});

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const [update, setUpdate] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetchUpdate = async () => {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const data = await res.json();
                setUpdate(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdate();
    }, [id]);

    // All blog post links are treated as viewable documents (PDFs / official docs)
    const hasLink = update?.link && update.link !== "#";
    const isImageLink = hasLink && /\.(jpeg|jpg|gif|png|webp|bmp)(?:[?#]|$)/i.test(update.link);
    const isPdfLink = hasLink;

    // Build the proxied URL for the PDF viewer (for external PDFs)
    const getPdfUrl = () => {
        if (!update?.link) return '';
        // For external URLs, proxy them through our API to avoid CORS
        if (update.link.startsWith('http')) {
            return `/api/proxy-pdf?url=${encodeURIComponent(update.link)}`;
        }
        return update.link;
    };

    // Handle download
    const handleDownload = async () => {
        if (!update?.link || update.link === '#') return;
        setDownloading(true);
        try {
            const proxyUrl = `/api/proxy-pdf?url=${encodeURIComponent(update.link)}`;
            const res = await fetch(proxyUrl);
            if (!res.ok) throw new Error('Download failed');
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            const safeName = update.title
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .trim()
                .replace(/\s+/g, '_')
                .substring(0, 60);

            const contentType = res.headers.get('content-type') || '';
            let extension = 'pdf';
            if (contentType.startsWith('image/')) {
                extension = contentType.split('/')[1];
                if (extension === 'jpeg') extension = 'jpg';
            } else {
                const match = update.link.match(/\.(jpeg|jpg|gif|png|webp|bmp)(?:[?#]|$)/i);
                if (match) extension = match[1].toLowerCase();
            }
            a.download = `${safeName}.${extension}`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Download failed:', err);
            // Fallback: open original link
            window.open(update.link, '_blank');
        } finally {
            setDownloading(false);
        }
    };

    // Lock body scroll when PDF viewer is open
    useEffect(() => {
        if (showPdfViewer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showPdfViewer]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 flex justify-center pt-20">
                <div className="animate-pulse space-y-4 max-w-3xl w-full">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
                    <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !update) {
        return notFound();
    }

    return (
        <>
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 md:p-12 font-sans pb-20 md:pb-0">
                <div className="max-w-4xl mx-auto">
                    {/* Header Navigation */}
                    <div className="sticky top-0 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md px-4 py-3 md:px-0 md:py-0 md:static flex items-center justify-between mb-4 md:mb-8 border-b md:border-none border-zinc-200 dark:border-zinc-800 md:bg-transparent">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors font-bold text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </Link>
                        <div className="flex gap-1 md:gap-2">
                            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors" title="Share">
                                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>

                    <article className="bg-white dark:bg-zinc-900 md:rounded-3xl shadow-sm border-y md:border border-zinc-100 dark:border-zinc-800 overflow-hidden">

                        {/* Featured Image */}
                        <div className="w-full h-48 md:h-80 relative bg-zinc-100 dark:bg-zinc-800">
                            {update.image ? (
                                <img src={update.image} alt={update.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className={`w-full h-full flex flex-col items-center justify-center p-6 text-white relative overflow-hidden ${update.category === 'Order' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                                    update.category === 'Circular' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                                        update.category === 'Notification' ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600' :
                                            'bg-gradient-to-br from-zinc-500 to-stone-600'
                                    }`}>
                                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                                    </div>
                                    <div className="relative z-10 opacity-90 scale-125 md:scale-150 mb-0 md:mb-4">
                                        {update.category === 'Order' ? <Gavel className="w-12 h-12 md:w-16 md:h-16" /> :
                                            update.category === 'Circular' ? <FileText className="w-12 h-12 md:w-16 md:h-16" /> :
                                                <Bell className="w-12 h-12 md:w-16 md:h-16" />}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-5 md:p-12">
                            {/* Meta Tags */}
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm">
                                <span className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full font-bold uppercase tracking-wider text-[10px] md:text-xs ${update.category === 'Order' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                    update.category === 'Circular' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                    }`}>
                                    {update.category}
                                </span>
                                <div className="flex items-center gap-1.5 md:gap-2 text-zinc-500 dark:text-zinc-400 font-medium">
                                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    <span>{new Date(update.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl md:text-4xl md:leading-tight font-extrabold text-zinc-900 dark:text-zinc-100 mb-6 md:mb-8 leading-snug">
                                {update.title}
                            </h1>

                            {/* Main Content */}
                            <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-7 md:leading-8 whitespace-pre-wrap font-sans">
                                {update.description}
                            </div>

                            {/* Document Action Box */}
                            {hasLink && (
                                <div className="mt-8 md:mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-900/80">
                                    {/* Header */}
                                    <div className="px-5 py-4 md:px-6 md:py-5 flex items-center gap-3 md:gap-4 border-b border-zinc-200 dark:border-zinc-700/60">
                                        <div className="p-2.5 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                                            <FileText className="w-6 h-6 md:w-7 md:h-7" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base md:text-lg text-zinc-900 dark:text-zinc-100">{isImageLink ? 'Official Image' : 'Official Document'}</h3>
                                            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">View or download the original {isImageLink ? 'image' : 'PDF'}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="px-5 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row gap-3">
                                        {/* View Document Button */}
                                        {isPdfLink ? (
                                            <button
                                                onClick={() => setShowPdfViewer(true)}
                                                className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 md:px-6 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all text-sm md:text-base"
                                            >
                                                <Eye className="w-4.5 h-4.5 md:w-5 md:h-5" />
                                                <span>View Document</span>
                                            </button>
                                        ) : (
                                            <a
                                                href={update.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 md:px-6 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all text-sm md:text-base"
                                            >
                                                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                                                <span>View Document</span>
                                            </a>
                                        )}

                                        {/* Download Button */}
                                        {isPdfLink && (
                                            <button
                                                onClick={handleDownload}
                                                disabled={downloading}
                                                className="flex items-center justify-center gap-2.5 px-5 py-3 md:px-6 md:py-3.5 bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-600 text-white rounded-xl font-bold shadow-lg shadow-zinc-900/20 active:scale-[0.98] transition-all text-sm md:text-base disabled:opacity-60"
                                            >
                                                {downloading ? (
                                                    <>
                                                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Downloading…</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="w-4 h-4 md:w-5 md:h-5" />
                                                        <span>{isImageLink ? 'Download Image' : 'Download PDF'}</span>
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        {/* Original Link (secondary) */}
                                        {isPdfLink && (
                                            <a
                                                href={update.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 px-4 py-3 md:px-5 md:py-3.5 border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl font-semibold transition-all text-sm md:text-base"
                                                title="Open original source link"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="hidden sm:inline">Original Link</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            </div>

            {/* ─── Full-screen PDF Viewer Modal ─── */}
            {showPdfViewer && isPdfLink && (
                <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex flex-col" style={{ animation: 'fadeIn 0.15s ease-out' }}>
                    {/* Viewer Header */}
                    <div className="shrink-0 flex items-center justify-between px-3 md:px-5 py-2.5 bg-zinc-900/95 border-b border-zinc-700/50 backdrop-blur-md">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <button
                                onClick={() => setShowPdfViewer(false)}
                                className="p-2 rounded-xl hover:bg-zinc-700/60 text-zinc-300 hover:text-white transition-all shrink-0"
                                title="Close viewer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="hidden md:flex items-center gap-2 min-w-0">
                                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                                <span className="text-sm font-semibold text-zinc-200 truncate max-w-lg">
                                    {update.title}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDownload}
                                disabled={downloading}
                                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs md:text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-[0.97]"
                            >
                                {downloading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Download className="w-4 h-4" />
                                )}
                                <span className="hidden md:inline">{downloading ? 'Downloading…' : 'Download'}</span>
                            </button>
                            <a
                                href={update.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl hover:bg-zinc-700/60 text-zinc-400 hover:text-white transition-all"
                                title="Open original link"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Document Viewer */}
                    <div className="flex-1 min-h-0 overflow-hidden bg-zinc-900/90 relative">
                        <PdfViewer url={getPdfUrl()} />
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </>
    );
}
