"use client";

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Download, AlertCircle, RefreshCw } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker - Use CDN for better compatibility in Capacitor/Android
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.530/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    url: string;
    darkMode?: boolean;
}

export default function PdfViewer({ url, darkMode = false }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [loadProgress, setLoadProgress] = useState(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
        setError(null);
    }

    function onDocumentLoadError(err: Error) {
        console.error("PDF Load Error:", err);
        setError(err);
        setLoading(false);
    }

    function onDocumentLoadProgress({ loaded, total }: { loaded: number; total: number }) {
        if (total > 0) {
            setLoadProgress(Math.round((loaded / total) * 100));
        }
    }

    // Adjust scale based on container width
    useEffect(() => {
        const updateWidth = () => {
            const container = document.getElementById('pdf-container');
            if (container) {
                setContainerWidth(container.clientWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const LoadingUI = () => (
        <div className="flex flex-col items-center justify-center gap-4 mt-20 p-6">
            <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                        className="text-slate-200 dark:text-zinc-800"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="text-purple-600 drop-shadow-md transition-all duration-300 ease-out"
                        strokeDasharray={`${loadProgress || 30}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                </div>
            </div>
            <div className="text-center space-y-1">
                <p className="font-bold text-slate-700 dark:text-slate-200 text-lg">
                    {loadProgress > 0 ? `${loadProgress}%` : 'Loading...'}
                </p>
                <p className="text-xs text-slate-400 font-medium">Preparing document for view</p>
                <p className="text-[10px] text-slate-300 dark:text-zinc-600 pt-2 animate-pulse">
                    Optimizing for Android...
                </p>
            </div>
        </div>
    );

    const ErrorUI = () => (
        <div className="flex flex-col items-center justify-center gap-4 mt-20 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Unable to load PDF</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    {error?.message || "Something went wrong while loading the document."}
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                    <RefreshCw className="w-4 h-4" /> Retry
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors"
                >
                    <Download className="w-4 h-4" /> Download
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-900" id="pdf-container">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm z-10 shrink-0 gap-2 overflow-x-auto">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1 || loading}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap min-w-[3rem] text-center">
                        {loading ? '--' : `${pageNumber} / ${numPages || '--'}`}
                    </span>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
                        disabled={pageNumber >= (numPages || 1) || loading}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownload}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-blue-600 dark:text-blue-400"
                        title="Download PDF"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                    <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
                    <button
                        onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <ZoomOut className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="text-xs font-medium text-slate-500 w-10 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={() => setScale(prev => Math.min(prev + 0.1, 2.5))}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <ZoomIn className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>
            </div>

            {/* Document Area */}
            <div className={`flex-1 overflow-auto flex justify-center p-4 min-h-0 ${darkMode ? 'bg-zinc-900 invert-pdf' : 'bg-slate-100'}`}>
                {error ? (
                    <ErrorUI />
                ) : (
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadProgress={onDocumentLoadProgress}
                        onLoadError={onDocumentLoadError}
                        loading={<LoadingUI />}
                        error={<ErrorUI />} // Should not be needed if we handle state, but good backup
                        className="max-w-full"
                    >
                        <div className="shadow-lg transition-transform duration-200">
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                width={containerWidth ? Math.min(containerWidth - 32, 800) : undefined}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="bg-white"
                                loading={
                                    <div className="h-[500px] w-full bg-white animate-pulse flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-slate-200 animate-spin" />
                                    </div>
                                }
                            />
                        </div>
                    </Document>
                )}
            </div>

            <style jsx global>{`
                .invert-pdf canvas {
                    filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9);
                }
            `}</style>
        </div>
    );
}
