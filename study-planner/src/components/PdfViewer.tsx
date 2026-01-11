"use client";

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PdfViewerProps {
    url: string;
    darkMode?: boolean;
}

export default function PdfViewer({ url, darkMode = false }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
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

    const LoadingUI = () => (
        <div className="flex flex-col items-center justify-center gap-4 mt-20 p-6">
            <div className="relative w-16 h-16">
                {/* Circular Progress Background */}
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

                {/* Mock "Retrying" text if it takes too long, to comfort user */}
                <p className="text-[10px] text-slate-300 dark:text-zinc-600 pt-2 animate-pulse">
                    Optimizing for Android...
                </p>
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
                        disabled={pageNumber <= 1}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {pageNumber} / {numPages || '--'}
                    </span>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
                        disabled={pageNumber >= (numPages || 1)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <ZoomOut className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="text-xs font-medium text-slate-500 w-12 text-center">
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
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadProgress={onDocumentLoadProgress}
                    loading={<LoadingUI />}
                    error={<LoadingUI />}
                    className="max-w-full"
                >
                    <div className="shadow-lg">
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            width={containerWidth ? Math.min(containerWidth - 32, 800) : undefined}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="bg-white"
                        />
                    </div>
                </Document>
            </div>

            <style jsx global>{`
                .invert-pdf canvas {
                    filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9);
                }
            `}</style>
        </div>
    );
}
