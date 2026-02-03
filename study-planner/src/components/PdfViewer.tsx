"use client";

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Download, AlertCircle, RefreshCw, BookOpen, FileText } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import LiquidReader from './LiquidReader';

// Configure worker - Use CDN for better compatibility in Capacitor/Android
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const pdfOptions = {
    cMapUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/standard_fonts/',
    disableRange: true,
    disableStream: true,
};

interface PdfViewerProps {
    url: string;
    darkMode?: boolean;
}

export default function PdfViewer({ url, darkMode = false }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);

    // Google Drive Embed Support
    if (url.includes('drive.google.com')) {
        // Ensure it's in preview mode for embedding
        const embedUrl = url.includes('/preview') ? url : url.replace(/\/view.*/, '/preview');
        return (
            <div className="w-full h-full bg-zinc-900 flex flex-col">
                <iframe
                    src={embedUrl}
                    className="flex-1 w-full h-full border-0"
                    title="Document Viewer"
                    allow="autoplay"
                />
            </div>
        );
    }

    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [loadProgress, setLoadProgress] = useState(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    // Liquid Mode State
    const [isLiquidMode, setIsLiquidMode] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        // Check platform and load liquid mode preference
        const checkPlatform = () => {
            const platform = Capacitor.getPlatform();
            const isAndroidPlatform = platform === 'android';
            setIsAndroid(isAndroidPlatform);

            if (isAndroidPlatform) {
                const savedPref = localStorage.getItem('liquidModePref');
                if (savedPref !== null) {
                    setIsLiquidMode(savedPref === 'true');
                } else {
                    // Default ON for mobile (Android)
                    setIsLiquidMode(true);
                }
            }
        };
        checkPlatform();
    }, []);

    const toggleLiquidMode = () => {
        const newMode = !isLiquidMode;
        setIsLiquidMode(newMode);
        localStorage.setItem('liquidModePref', String(newMode));
    };

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

    const handleDownload = async () => {
        const rawFilename = url.split('/').pop() || 'document.pdf';

        // Web Fallback
        if (!Capacitor.isNativePlatform()) {
            const link = document.createElement('a');
            link.href = url;
            link.download = rawFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        // Native Android Download Logic
        try {
            await Toast.show({ text: 'Starting download...', duration: 'short' });

            // 1. Permissions (Try/Catch as some Android versions don't need explicit request for public folders if scoped)
            try {
                const permStatus = await Filesystem.checkPermissions();
                if (permStatus.publicStorage !== 'granted') {
                    const req = await Filesystem.requestPermissions();
                    if (req.publicStorage !== 'granted') {
                        // Continue anyway, as Android 10+ might allow writing without broad permission to own files
                    }
                }
            } catch (e) {
                console.warn("Permission check skipped", e);
            }

            // 2. Fetch File Blob
            const absoluteUrl = url.startsWith('http') ? url : window.location.origin + url;
            const response = await fetch(absoluteUrl);
            if (!response.ok) throw new Error("Network fetch failed");
            const blob = await response.blob();

            // 3. Convert to Base64
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64data = reader.result as string;
                const data = base64data.split(',')[1];

                // 4. Determine Filename with Timestamp
                const timestamp = Math.floor(Date.now() / 1000);
                // Strip extension to re-add it cleanly
                const namePart = rawFilename.replace(/\.pdf$/i, '');
                const savedFilename = `DakGuru_${namePart}_${timestamp}.pdf`;

                // 5. Try Write to /Download/DakGuru/ (ExternalStorage) first, then fallback to Documents
                let fileUri = "";
                let savedPathDisplay = "Downloads";

                try {
                    // Try writing to Download folder
                    const res = await Filesystem.writeFile({
                        path: `Download/DakGuru/${savedFilename}`,
                        data: data,
                        directory: Directory.ExternalStorage,
                        recursive: true
                    });
                    fileUri = res.uri;
                } catch (err) {
                    console.warn("Failed to write to Downloads, trying Documents...", err);
                    try {
                        // Fallback to Documents
                        const res = await Filesystem.writeFile({
                            path: `DakGuru/${savedFilename}`,
                            data: data,
                            directory: Directory.Documents,
                            recursive: true
                        });
                        fileUri = res.uri;
                        savedPathDisplay = "Documents";
                    } catch (finalErr) {
                        throw new Error("Failed to save file to storage");
                    }
                }

                await Toast.show({ text: `Saved to ${savedPathDisplay}. Opening...`, duration: 'short' });

                // 6. Auto-Open
                try {
                    const { FileOpener } = await import('@capacitor-community/file-opener');
                    await FileOpener.open({
                        filePath: fileUri,
                        contentType: 'application/pdf',
                        openWithDefault: true,
                    });
                } catch (openerErr) {
                    console.error("File Opener Failed", openerErr);
                    await Toast.show({ text: 'File saved, but could not auto-open.', duration: 'long' });
                }
            };

        } catch (error: any) {
            console.error("Download Error", error);
            await Toast.show({ text: 'Download failed. Please check internet connection.', duration: 'long' });
        }
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

    // --- TOUCH HANDLERS (Swipe & Zoom) ---
    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
    const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
    const [initialScale, setInitialScale] = useState<number>(1.0);

    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            // Single touch: Swipe start
            setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        } else if (e.touches.length === 2) {
            // Double touch: Pinch start
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
            setInitialPinchDistance(dist);
            setInitialScale(scale);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && initialPinchDistance !== null) {
            // Pinch to zoom logic
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

            // Calculate new scale
            const ratio = currentDist / initialPinchDistance;
            const newScale = Math.min(Math.max(initialScale * ratio, 0.5), 3.0); // Limit scale 0.5x to 3.0x

            setScale(newScale);

            // Prevent default to stop browser native zoom/scroll while pinching
            if (e.cancelable) e.preventDefault();
        }
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStart && e.changedTouches.length === 1 && e.touches.length === 0) {
            // Swipe end logic (only if not pinching)
            if (initialPinchDistance !== null) {
                // Was pinching, just reset
                setInitialPinchDistance(null);
                return;
            }

            // Calculate delta
            const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            const deltaX = touchStart.x - touchEnd.x;
            const deltaY = touchStart.y - touchEnd.y;

            // Threshold for swipe (50px)
            // Limit vertical movement to ensure it's a horizontal swipe intended
            if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30) {
                if (deltaX > 0) {
                    // Swiped Left -> Next Page
                    if (pageNumber < (numPages || 1)) setPageNumber(p => p + 1);
                } else {
                    // Swiped Right -> Prev Page
                    if (pageNumber > 1) setPageNumber(p => p - 1);
                }
            }
        }

        // Reset states
        setTouchStart(null);
        if (e.touches.length === 0) {
            setInitialPinchDistance(null);
        }
    };


    return (
        <div
            className="flex flex-col h-full bg-slate-50 dark:bg-zinc-900"
            id="pdf-container"
        >
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm z-10 shrink-0 gap-2 overflow-x-auto">

                {/* Controls for Standard View */}
                {!isLiquidMode && (
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
                )}

                {/* Liquid Mode Title */}
                {isLiquidMode && (
                    <div className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200 pl-2">
                        Smart Reader View
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {/* Liquid Mode Toggle - Exclusive to Android/Mobile */}
                    {isAndroid && (
                        <button
                            onClick={toggleLiquidMode}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isLiquidMode
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300'
                                }`}
                        >
                            {isLiquidMode ? (
                                <>
                                    <BookOpen className="w-4 h-4" />
                                    <span>Reader</span>
                                </>
                            ) : (
                                <>
                                    <FileText className="w-4 h-4" />
                                    <span>PDF</span>
                                </>
                            )}
                        </button>
                    )}

                    {!isLiquidMode && (
                        <>
                            <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
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
                        </>
                    )}
                </div>
            </div>

            {/* Document Area */}
            <div
                className={`flex-1 overflow-auto flex justify-center min-h-0 ${darkMode ? 'invert-pdf' : 'bg-slate-100'}`}
                onTouchStart={!isLiquidMode ? onTouchStart : undefined}
                onTouchMove={!isLiquidMode ? onTouchMove : undefined}
                onTouchEnd={!isLiquidMode ? onTouchEnd : undefined}
            >
                {isLiquidMode ? (
                    <div className="w-full h-full bg-white dark:bg-zinc-900 overflow-y-auto">
                        <LiquidReader url={url} />
                    </div>
                ) : (
                    <div className={`p-4 ${darkMode ? 'bg-zinc-900' : ''}`}>
                        {error ? (
                            <ErrorUI />
                        ) : (
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadProgress={onDocumentLoadProgress}
                                onLoadError={onDocumentLoadError}
                                loading={<LoadingUI />}
                                error={<ErrorUI />}
                                options={pdfOptions}
                                className="max-w-full"
                            >
                                <div className="shadow-lg transition-transform duration-75 relative z-0">
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
