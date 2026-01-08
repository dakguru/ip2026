"use client";

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    url: string;
    darkMode?: boolean;
}

export default function PdfViewer({ url, darkMode = false }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    // Adjust scale based on container width
    useEffect(() => {
        const updateWidth = () => {
            const container = document.getElementById('pdf-container');
            if (container) {
                setContainerWidth(container.clientWidth);
                // Default scale to fit width (approximate logic)
                // A4 is roughly 600px wide at scale 1.0, but it varies.
                // We'll let `width={containerWidth}` on Page handle fitting.
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

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
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                    </div>
                )}

                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex flex-col items-center gap-2 mt-20">
                            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                            <span className="text-sm text-slate-400">Loading document...</span>
                        </div>
                    }
                    error={
                        <div className="flex flex-col items-center gap-2 mt-20 text-red-500">
                            <span className="font-bold">Failed to load PDF</span>
                            <span className="text-sm">Please try downloading instead.</span>
                        </div>
                    }
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
