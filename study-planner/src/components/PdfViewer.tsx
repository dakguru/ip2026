"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
    ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Download, AlertCircle, RefreshCw,
    BookOpen, FileText, Maximize2, Minimize2, Columns, ArrowDown, Sun, Moon, Coffee,
    ChevronUp, ChevronDown, Keyboard, LayoutGrid, ArrowUp
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import LiquidReader from './LiquidReader';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const pdfOptions = {
    cMapUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/standard_fonts/',
    disableRange: true,
    disableStream: true,
};

type ViewMode = 'single' | 'continuous';
type ColorMode = 'light' | 'dark' | 'sepia';
type FitMode = 'width' | 'page' | 'custom';

interface PdfViewerProps {
    url: string;
    darkMode?: boolean;
}

export default function PdfViewer({ url, darkMode = false }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);

    // Google Drive Embed Support
    if (url.includes('drive.google.com')) {
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
    const [containerHeight, setContainerHeight] = useState<number>(0);

    // Smart Reader Features
    const [viewMode, setViewMode] = useState<ViewMode>('single');
    const [colorMode, setColorMode] = useState<ColorMode>(darkMode ? 'dark' : 'light');
    const [fitMode, setFitMode] = useState<FitMode>('width');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showGoToPage, setShowGoToPage] = useState(false);
    const [goToPageInput, setGoToPageInput] = useState('');
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Liquid Mode State (Android only)
    const [isLiquidMode, setIsLiquidMode] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);
    const [isBrowser, setIsBrowser] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const goToPageRef = useRef<HTMLInputElement>(null);

    // Detect platform
    useEffect(() => {
        const platform = Capacitor.getPlatform();
        const isAndroidPlatform = platform === 'android';
        setIsAndroid(isAndroidPlatform);
        setIsBrowser(!Capacitor.isNativePlatform());

        if (isAndroidPlatform) {
            const savedPref = localStorage.getItem('liquidModePref');
            if (savedPref !== null) {
                setIsLiquidMode(savedPref === 'true');
            } else {
                setIsLiquidMode(true);
            }
        }

        // Load saved preferences for browser users, with sensible defaults
        if (!Capacitor.isNativePlatform()) {
            const savedColorMode = localStorage.getItem('pdfColorMode');
            const savedViewMode = localStorage.getItem('pdfViewMode');
            const savedFitMode = localStorage.getItem('pdfFitMode');
            if (savedColorMode) setColorMode(savedColorMode as ColorMode);
            // Default to continuous scroll for browser users
            setViewMode(savedViewMode ? (savedViewMode as ViewMode) : 'continuous');
            if (savedFitMode) setFitMode(savedFitMode as FitMode);
        }

        // Suppress harmless react-pdf TextLayer abort warnings
        const originalConsoleError = console.error;
        console.error = (...args: any[]) => {
            const msg = args[0];
            if (typeof msg === 'string' && msg.includes('TextLayer task cancelled')) return;
            if (msg && msg.name === 'AbortException') return;
            originalConsoleError(...args);
        };
        return () => {
            console.error = originalConsoleError;
        };
    }, []);

    // Sync darkMode prop
    useEffect(() => {
        if (darkMode && colorMode === 'light') setColorMode('dark');
        else if (!darkMode && colorMode === 'dark') setColorMode('light');
    }, [darkMode]);

    // Save preferences
    useEffect(() => {
        if (isBrowser) {
            localStorage.setItem('pdfColorMode', colorMode);
            localStorage.setItem('pdfViewMode', viewMode);
            localStorage.setItem('pdfFitMode', fitMode);
        }
    }, [colorMode, viewMode, fitMode, isBrowser]);

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

    // Container dimensions
    useEffect(() => {
        const updateDimensions = () => {
            const container = containerRef.current || document.getElementById('pdf-container');
            if (container) {
                setContainerWidth(container.clientWidth);
                setContainerHeight(container.clientHeight);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [isFullscreen]);

    // Scroll tracking for continuous mode and scroll-to-top button
    useEffect(() => {
        const scrollEl = scrollContainerRef.current;
        if (!scrollEl) return;

        const handleScroll = () => {
            setShowScrollTop(scrollEl.scrollTop > 400);

            // Track current page in continuous mode
            if (viewMode === 'continuous' && numPages) {
                const pages = scrollEl.querySelectorAll('[data-page-number]');
                let currentPage = 1;
                pages.forEach((page) => {
                    const rect = page.getBoundingClientRect();
                    const containerRect = scrollEl.getBoundingClientRect();
                    if (rect.top < containerRect.top + containerRect.height / 2) {
                        currentPage = parseInt(page.getAttribute('data-page-number') || '1');
                    }
                });
                setPageNumber(currentPage);
            }
        };

        scrollEl.addEventListener('scroll', handleScroll);
        return () => scrollEl.removeEventListener('scroll', handleScroll);
    }, [viewMode, numPages]);

    // Keyboard shortcuts
    useEffect(() => {
        if (isLiquidMode) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't capture when typing in input
            if (e.target instanceof HTMLInputElement) return;

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    if (viewMode === 'single') setPageNumber(prev => Math.min(prev + 1, numPages || prev));
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    if (viewMode === 'single') setPageNumber(prev => Math.max(prev - 1, 1));
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    setScale(prev => Math.min(prev + 0.1, 3.0));
                    setFitMode('custom');
                    break;
                case '-':
                    e.preventDefault();
                    setScale(prev => Math.max(prev - 0.1, 0.3));
                    setFitMode('custom');
                    break;
                case 'f':
                case 'F':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        toggleFullscreen();
                    }
                    break;
                case 'g':
                case 'G':
                    e.preventDefault();
                    setShowGoToPage(true);
                    setTimeout(() => goToPageRef.current?.focus(), 100);
                    break;
                case 'Escape':
                    setShowGoToPage(false);
                    setShowShortcuts(false);
                    setShowThumbnails(false);
                    break;
                case 'Home':
                    e.preventDefault();
                    setPageNumber(1);
                    break;
                case 'End':
                    e.preventDefault();
                    if (numPages) setPageNumber(numPages);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [numPages, viewMode, isLiquidMode]);

    // Fullscreen
    const toggleFullscreen = useCallback(() => {
        const elem = containerRef.current;
        if (!elem) return;

        if (!document.fullscreenElement) {
            elem.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => { });
        } else {
            document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => { });
        }
    }, []);

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    // Fit mode calculations
    const getPageWidth = useCallback(() => {
        const availableWidth = containerWidth - (showThumbnails ? 180 : 0) - 32;
        const availableHeight = containerHeight - 60;

        if (fitMode === 'width') {
            return Math.min(availableWidth, 900);
        } else if (fitMode === 'page') {
            // Approximate A4 ratio (1 : 1.414)
            const widthFromHeight = availableHeight / 1.414;
            return Math.min(widthFromHeight, availableWidth, 900);
        }
        return Math.min(availableWidth, 900);
    }, [containerWidth, containerHeight, fitMode, showThumbnails]);

    const effectiveScale = fitMode === 'custom' ? scale : 1.0;
    const effectiveWidth = fitMode === 'custom' ? undefined : getPageWidth();

    // Go to page handler
    const handleGoToPage = () => {
        const page = parseInt(goToPageInput);
        if (page && page >= 1 && page <= (numPages || 1)) {
            setPageNumber(page);
            setShowGoToPage(false);
            setGoToPageInput('');

            // In continuous mode, scroll to the page
            if (viewMode === 'continuous') {
                setTimeout(() => {
                    const pageEl = scrollContainerRef.current?.querySelector(`[data-page-number="${page}"]`);
                    pageEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    };

    // Scroll to top
    const scrollToTop = () => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Download handler
    const handleDownload = async () => {
        const rawFilename = url.split('/').pop() || 'document.pdf';

        if (!Capacitor.isNativePlatform()) {
            const link = document.createElement('a');
            link.href = url;
            link.download = rawFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        try {
            await Toast.show({ text: 'Starting download...', duration: 'short' });

            try {
                const permStatus = await Filesystem.checkPermissions();
                if (permStatus.publicStorage !== 'granted') {
                    const req = await Filesystem.requestPermissions();
                    if (req.publicStorage !== 'granted') { /* continue */ }
                }
            } catch (e) {
                console.warn("Permission check skipped", e);
            }

            const absoluteUrl = url.startsWith('http') ? url : window.location.origin + url;
            const response = await fetch(absoluteUrl);
            if (!response.ok) throw new Error("Network fetch failed");
            const blob = await response.blob();

            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64data = reader.result as string;
                const data = base64data.split(',')[1];

                const timestamp = Math.floor(Date.now() / 1000);
                const namePart = rawFilename.replace(/\.pdf$/i, '');
                const savedFilename = `DakGuru_${namePart}_${timestamp}.pdf`;

                let fileUri = "";
                let savedPathDisplay = "Downloads";

                try {
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

    // Reading progress
    const readingProgress = numPages ? Math.round((pageNumber / numPages) * 100) : 0;

    // Color mode styles
    const getColorModeStyles = () => {
        switch (colorMode) {
            case 'dark':
                return { bg: 'bg-zinc-900', canvasFilter: 'invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9)' };
            case 'sepia':
                return { bg: 'bg-amber-50', canvasFilter: 'sepia(0.35) brightness(0.95) contrast(1.05)' };
            default:
                return { bg: 'bg-slate-100', canvasFilter: '' };
        }
    };

    const colorStyles = getColorModeStyles();

    const LoadingUI = () => {
        const progress = loadProgress || 0;
        const circumference = 2 * Math.PI * 54; // radius = 54
        const strokeDashoffset = circumference - (progress / 100) * circumference;

        return (
            <div className="flex flex-col items-center justify-center gap-6 mt-16 md:mt-24 p-6">
                {/* Outer glow container */}
                <div className="relative">
                    {/* Pulsing glow ring behind */}
                    <div
                        className="absolute inset-0 rounded-full blur-xl opacity-40"
                        style={{
                            background: 'conic-gradient(from 0deg, #7c3aed, #3b82f6, #06b6d4, #7c3aed)',
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    />

                    {/* Main circular progress */}
                    <div className="relative w-28 h-28 md:w-36 md:h-36">
                        <svg className="w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 120 120">
                            {/* Background track */}
                            <circle
                                cx="60" cy="60" r="54"
                                fill="none"
                                stroke={colorMode === 'dark' ? '#27272a' : colorMode === 'sepia' ? '#d6c5a0' : '#e2e8f0'}
                                strokeWidth="6"
                            />
                            {/* Animated progress arc */}
                            <circle
                                cx="60" cy="60" r="54"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={progress > 0 ? strokeDashoffset : circumference * 0.7}
                                style={{
                                    transition: 'stroke-dashoffset 0.5s ease-out',
                                    ...(progress === 0 ? { animation: 'spinProgress 1.5s linear infinite' } : {}),
                                }}
                            />
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#7c3aed" />
                                    <stop offset="50%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Center percentage / icon */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {progress > 0 ? (
                                <>
                                    <span className={`text-2xl md:text-3xl font-black tabular-nums tracking-tight ${colorMode === 'dark' ? 'text-white' : colorMode === 'sepia' ? 'text-amber-900' : 'text-slate-800'
                                        }`}>
                                        {progress}
                                    </span>
                                    <span className={`text-[10px] md:text-xs font-bold -mt-0.5 ${colorMode === 'dark' ? 'text-zinc-400' : colorMode === 'sepia' ? 'text-amber-700' : 'text-slate-400'
                                        }`}>
                                        percent
                                    </span>
                                </>
                            ) : (
                                <Loader2 className={`w-7 h-7 md:w-8 md:h-8 animate-spin ${colorMode === 'dark' ? 'text-blue-400' : 'text-purple-600'
                                    }`} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Text below */}
                <div className="text-center space-y-1.5">
                    <p className={`font-bold text-base md:text-lg ${colorMode === 'dark' ? 'text-zinc-200' : colorMode === 'sepia' ? 'text-amber-900' : 'text-slate-700'
                        }`}>
                        {progress > 0 ? 'Loading Document' : 'Connecting'}
                        <span className="inline-block w-6 text-left" style={{ animation: 'ellipsis 1.4s steps(4, end) infinite' }}>...</span>
                    </p>
                    <p className={`text-xs font-medium ${colorMode === 'dark' ? 'text-zinc-500' : colorMode === 'sepia' ? 'text-amber-600' : 'text-slate-400'
                        }`}>
                        {progress > 0 ? 'Preparing document for viewing' : 'Fetching document from server'}
                    </p>
                </div>

                {/* Shimmer progress bar */}
                <div className={`w-48 md:w-56 h-1.5 rounded-full overflow-hidden ${colorMode === 'dark' ? 'bg-zinc-800' : colorMode === 'sepia' ? 'bg-amber-200' : 'bg-slate-200'
                    }`}>
                    <div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                            width: progress > 0 ? `${progress}%` : '30%',
                            background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)',
                            transition: 'width 0.5s ease-out',
                            ...(progress === 0 ? { animation: 'shimmerBar 1.8s ease-in-out infinite' } : {}),
                        }}
                    >
                        {/* Shimmer shine effect */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                animation: 'shimmerShine 1.5s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>

                {/* Inline styles for custom animations */}
                <style>{`
                    @keyframes spinProgress {
                        0% { transform: rotate(0deg); transform-origin: center; }
                        100% { transform: rotate(360deg); transform-origin: center; }
                    }
                    @keyframes ellipsis {
                        0% { content: ''; width: 0; }
                        25% { width: 6px; }
                        50% { width: 12px; }
                        75% { width: 18px; }
                        100% { width: 0; }
                    }
                    @keyframes shimmerBar {
                        0%, 100% { width: 20%; opacity: 0.6; }
                        50% { width: 60%; opacity: 1; }
                    }
                    @keyframes shimmerShine {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(200%); }
                    }
                `}</style>
            </div>
        );
    };

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
                <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    <RefreshCw className="w-4 h-4" /> Retry
                </button>
                <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors">
                    <Download className="w-4 h-4" /> Download
                </button>
            </div>
        </div>
    );

    // --- TOUCH HANDLERS ---
    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
    const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
    const [initialScale, setInitialScale] = useState<number>(1.0);

    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        } else if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
            setInitialPinchDistance(dist);
            setInitialScale(scale);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && initialPinchDistance !== null) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
            const ratio = currentDist / initialPinchDistance;
            const newScale = Math.min(Math.max(initialScale * ratio, 0.5), 3.0);
            setScale(newScale);
            setFitMode('custom');
            if (e.cancelable) e.preventDefault();
        }
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStart && e.changedTouches.length === 1 && e.touches.length === 0) {
            if (initialPinchDistance !== null) {
                setInitialPinchDistance(null);
                return;
            }
            const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            const deltaX = touchStart.x - touchEnd.x;
            const deltaY = touchStart.y - touchEnd.y;
            if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30 && viewMode === 'single') {
                if (deltaX > 0) {
                    if (pageNumber < (numPages || 1)) setPageNumber(p => p + 1);
                } else {
                    if (pageNumber > 1) setPageNumber(p => p - 1);
                }
            }
        }
        setTouchStart(null);
        if (e.touches.length === 0) setInitialPinchDistance(null);
    };

    // Zoom presets
    const ZOOM_PRESETS = [50, 75, 100, 125, 150, 200];

    return (
        <div
            ref={containerRef}
            className={`flex flex-col h-full ${colorMode === 'dark' ? 'bg-zinc-950' : colorMode === 'sepia' ? 'bg-amber-50/80' : 'bg-slate-50'}`}
            id="pdf-container"
        >
            {/* ===== SMART TOOLBAR ===== */}
            <div className={`shrink-0 z-10 border-b transition-colors ${colorMode === 'dark'
                ? 'bg-zinc-900 border-zinc-800'
                : colorMode === 'sepia'
                    ? 'bg-amber-100/80 border-amber-200'
                    : 'bg-white border-slate-200'
                } shadow-sm`}>

                {/* Reading Progress Bar */}
                {!isLiquidMode && numPages && (
                    <div className="h-[3px] w-full bg-slate-100 dark:bg-zinc-800 relative overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-500 ease-out rounded-r-full"
                            style={{ width: `${readingProgress}%` }}
                        />
                    </div>
                )}

                {/* Main toolbar */}
                <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 gap-1 sm:gap-2 overflow-x-auto scrollbar-none">

                    {/* Left: Navigation */}
                    {!isLiquidMode && (
                        <div className="flex items-center gap-1 shrink-0">
                            {viewMode === 'single' && (
                                <>
                                    <button
                                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                        disabled={pageNumber <= 1 || loading}
                                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-colors ${colorMode === 'dark' ? 'hover:bg-zinc-800 text-zinc-300' : colorMode === 'sepia' ? 'hover:bg-amber-200 text-amber-800' : 'hover:bg-slate-100 text-slate-600'}`}
                                        title="Previous page (←)"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {/* Page indicator - clickable */}
                                    <button
                                        onClick={() => { setShowGoToPage(true); setTimeout(() => goToPageRef.current?.focus(), 100); }}
                                        className={`px-2 py-1 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${colorMode === 'dark'
                                            ? 'text-zinc-200 hover:bg-zinc-800'
                                            : colorMode === 'sepia'
                                                ? 'text-amber-900 hover:bg-amber-200'
                                                : 'text-slate-700 hover:bg-slate-100'
                                            }`}
                                        title="Go to page (G)"
                                    >
                                        {loading ? '--' : `${pageNumber} / ${numPages || '--'}`}
                                    </button>

                                    <button
                                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
                                        disabled={pageNumber >= (numPages || 1) || loading}
                                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-colors ${colorMode === 'dark' ? 'hover:bg-zinc-800 text-zinc-300' : colorMode === 'sepia' ? 'hover:bg-amber-200 text-amber-800' : 'hover:bg-slate-100 text-slate-600'}`}
                                        title="Next page (→)"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            {viewMode === 'continuous' && (
                                <span className={`px-2 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ${colorMode === 'dark' ? 'text-zinc-200' : colorMode === 'sepia' ? 'text-amber-900' : 'text-slate-700'}`}>
                                    {loading ? '--' : `${pageNumber} / ${numPages || '--'}`}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Liquid Mode Title */}
                    {isLiquidMode && (
                        <div className={`flex-1 text-sm font-semibold pl-2 ${colorMode === 'dark' ? 'text-zinc-200' : 'text-slate-700'}`}>
                            Dak Guru Smart Reader
                        </div>
                    )}

                    {/* Right: Controls */}
                    <div className="flex items-center gap-1 shrink-0">

                        {/* Liquid Mode Toggle - Android only */}
                        {isAndroid && (
                            <button
                                onClick={toggleLiquidMode}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${isLiquidMode
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : colorMode === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-600'
                                    }`}
                            >
                                {isLiquidMode ? <><BookOpen className="w-3.5 h-3.5" /><span>Reader</span></> : <><FileText className="w-3.5 h-3.5" /><span>PDF</span></>}
                            </button>
                        )}

                        {!isLiquidMode && (
                            <>
                                {/* Divider */}
                                <div className={`w-px h-4 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />

                                {/* View Mode Toggle */}
                                {isBrowser && (
                                    <div className={`flex rounded-lg p-0.5 ${colorMode === 'dark' ? 'bg-zinc-800' : colorMode === 'sepia' ? 'bg-amber-200/80' : 'bg-slate-100'}`}>
                                        <button
                                            onClick={() => setViewMode('single')}
                                            className={`p-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'single'
                                                ? 'bg-white dark:bg-zinc-700 text-purple-600 dark:text-purple-400 shadow-sm'
                                                : colorMode === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                            title="Single page"
                                        >
                                            <FileText className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('continuous')}
                                            className={`p-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'continuous'
                                                ? 'bg-white dark:bg-zinc-700 text-purple-600 dark:text-purple-400 shadow-sm'
                                                : colorMode === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                            title="Continuous scroll"
                                        >
                                            <Columns className="w-4 h-4 rotate-90" />
                                        </button>
                                    </div>
                                )}


                                {/* Fit Mode Toggle */}
                                {isBrowser && (
                                    <div className={`hidden sm:flex rounded-lg p-0.5 ${colorMode === 'dark' ? 'bg-zinc-800' : colorMode === 'sepia' ? 'bg-amber-200/80' : 'bg-slate-100'}`}>
                                        <button
                                            onClick={() => { setFitMode('width'); setScale(1.0); }}
                                            className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${fitMode === 'width'
                                                ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                                : colorMode === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                            title="Fit to width"
                                        >
                                            FW
                                        </button>
                                        <button
                                            onClick={() => { setFitMode('page'); setScale(1.0); }}
                                            className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${fitMode === 'page'
                                                ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                                : colorMode === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                            title="Fit to page"
                                        >
                                            FP
                                        </button>
                                    </div>
                                )}

                                {/* Divider */}
                                <div className={`w-px h-4 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />

                                {/* Zoom Controls */}
                                <div className="flex items-center gap-0.5">
                                    <button
                                        onClick={() => { setScale(prev => Math.max(prev - 0.1, 0.3)); setFitMode('custom'); }}
                                        className={`p-1.5 rounded-lg transition-colors ${colorMode === 'dark' ? 'hover:bg-zinc-800 text-zinc-300' : colorMode === 'sepia' ? 'hover:bg-amber-200 text-amber-800' : 'hover:bg-slate-100 text-slate-600'}`}
                                        title="Zoom out (-)"
                                    >
                                        <ZoomOut className="w-4 h-4" />
                                    </button>

                                    {/* Zoom dropdown */}
                                    <div className="relative group">
                                        <button
                                            className={`px-1.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer min-w-[3rem] text-center ${colorMode === 'dark' ? 'text-zinc-300 hover:bg-zinc-800' : colorMode === 'sepia' ? 'text-amber-800 hover:bg-amber-200' : 'text-slate-500 hover:bg-slate-100'}`}
                                        >
                                            {fitMode === 'custom' ? `${Math.round(scale * 100)}%` : fitMode === 'width' ? 'FW' : 'FP'}
                                        </button>
                                        <div className={`absolute top-full right-0 mt-1 rounded-xl shadow-xl border overflow-hidden z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ${colorMode === 'dark' ? 'bg-zinc-900 border-zinc-700' : colorMode === 'sepia' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
                                            {ZOOM_PRESETS.map(z => (
                                                <button
                                                    key={z}
                                                    onClick={() => { setScale(z / 100); setFitMode('custom'); }}
                                                    className={`block w-full text-left px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${colorMode === 'dark'
                                                        ? 'hover:bg-zinc-800 text-zinc-300' + (Math.round(scale * 100) === z ? ' bg-zinc-800 text-purple-400' : '')
                                                        : 'hover:bg-slate-50 text-slate-600' + (Math.round(scale * 100) === z ? ' bg-purple-50 text-purple-600' : '')
                                                        }`}
                                                >
                                                    {z}%
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { setScale(prev => Math.min(prev + 0.1, 3.0)); setFitMode('custom'); }}
                                        className={`p-1.5 rounded-lg transition-colors ${colorMode === 'dark' ? 'hover:bg-zinc-800 text-zinc-300' : colorMode === 'sepia' ? 'hover:bg-amber-200 text-amber-800' : 'hover:bg-slate-100 text-slate-600'}`}
                                        title="Zoom in (+)"
                                    >
                                        <ZoomIn className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className={`w-px h-4 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />

                                {/* Color Mode */}
                                <div className={`flex rounded-lg p-0.5 ${colorMode === 'dark' ? 'bg-zinc-800' : colorMode === 'sepia' ? 'bg-amber-200/80' : 'bg-slate-100'}`}>
                                    <button
                                        onClick={() => setColorMode('light')}
                                        className={`p-1.5 rounded-md transition-all ${colorMode === 'light' ? 'bg-white shadow-sm text-amber-500' : colorMode === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-amber-600 hover:text-amber-800'}`}
                                        title="Light mode"
                                    >
                                        <Sun className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setColorMode('sepia')}
                                        className={`p-1.5 rounded-md transition-all ${colorMode === 'sepia' ? 'bg-amber-100 shadow-sm text-amber-700' : colorMode === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-600'}`}
                                        title="Sepia mode"
                                    >
                                        <Coffee className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setColorMode('dark')}
                                        className={`p-1.5 rounded-md transition-all ${colorMode === 'dark' ? 'bg-zinc-700 shadow-sm text-blue-400' : 'text-slate-400 hover:text-slate-600'}`}
                                        title="Dark mode"
                                    >
                                        <Moon className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Download */}
                                <button
                                    onClick={handleDownload}
                                    className={`p-1.5 rounded-lg transition-colors ${colorMode === 'dark' ? 'hover:bg-zinc-800 text-blue-400' : colorMode === 'sepia' ? 'hover:bg-amber-200 text-blue-600' : 'hover:bg-slate-100 text-blue-600'}`}
                                    title="Download PDF"
                                >
                                    <Download className="w-4 h-4" />
                                </button>

                                {/* Thumbnails Toggle - Desktop only */}
                                {isBrowser && (
                                    <button
                                        onClick={() => setShowThumbnails(!showThumbnails)}
                                        className={`hidden md:flex p-1.5 rounded-lg transition-colors ${showThumbnails
                                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                                            : colorMode === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-slate-100 text-slate-400'
                                            }`}
                                        title="Page thumbnails"
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                )}

                                {/* Fullscreen */}
                                {isBrowser && (
                                    <button
                                        onClick={toggleFullscreen}
                                        className={`hidden sm:flex p-1.5 rounded-lg transition-colors ${colorMode === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : colorMode === 'sepia' ? 'hover:bg-amber-200 text-amber-700' : 'hover:bg-slate-100 text-slate-500'}`}
                                        title="Fullscreen (F)"
                                    >
                                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                    </button>
                                )}

                                {/* Keyboard Shortcuts Info */}
                                {isBrowser && (
                                    <button
                                        onClick={() => setShowShortcuts(!showShortcuts)}
                                        className={`hidden lg:flex p-1.5 rounded-lg transition-colors ${colorMode === 'dark' ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-slate-100 text-slate-400'}`}
                                        title="Keyboard shortcuts"
                                    >
                                        <Keyboard className="w-4 h-4" />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== DOCUMENT AREA ===== */}
            <div className="flex-1 flex overflow-hidden min-h-0">

                {/* Thumbnails Sidebar */}
                {showThumbnails && !isLiquidMode && numPages && (
                    <div className={`hidden md:flex flex-col w-[140px] shrink-0 border-r overflow-y-auto py-2 px-2 gap-2 scrollbar-thin ${colorMode === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 scrollbar-thumb-zinc-700'
                        : colorMode === 'sepia'
                            ? 'bg-amber-50 border-amber-200 scrollbar-thumb-amber-300'
                            : 'bg-slate-50 border-slate-200 scrollbar-thumb-slate-300'
                        }`}>
                        {Array.from({ length: numPages }, (_, i) => i + 1).map((pg) => (
                            <button
                                key={pg}
                                onClick={() => {
                                    setPageNumber(pg);
                                    if (viewMode === 'continuous') {
                                        const pageEl = scrollContainerRef.current?.querySelector(`[data-page-number="${pg}"]`);
                                        pageEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className={`rounded-lg overflow-hidden border-2 transition-all ${pageNumber === pg
                                    ? 'border-purple-500 shadow-lg shadow-purple-500/20 ring-1 ring-purple-300'
                                    : colorMode === 'dark' ? 'border-zinc-700 hover:border-zinc-500' : 'border-slate-200 hover:border-slate-400'
                                    }`}
                            >
                                <Document file={url} options={pdfOptions} loading={<div className="w-full h-24 bg-slate-100 dark:bg-zinc-800 animate-pulse" />}>
                                    <Page
                                        pageNumber={pg}
                                        width={116}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                </Document>
                                <div className={`text-center py-1 text-[10px] font-bold ${pageNumber === pg
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                                    : colorMode === 'dark' ? 'text-zinc-400 bg-zinc-900' : 'text-slate-500 bg-white'
                                    }`}>
                                    {pg}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Main content */}
                <div
                    ref={scrollContainerRef}
                    className={`flex-1 overflow-auto flex ${viewMode === 'continuous' ? 'flex-col items-center' : 'justify-center'} min-h-0 ${colorStyles.bg}`}
                    onTouchStart={!isLiquidMode ? onTouchStart : undefined}
                    onTouchMove={!isLiquidMode ? onTouchMove : undefined}
                    onTouchEnd={!isLiquidMode ? onTouchEnd : undefined}
                >
                    {isLiquidMode ? (
                        <div className="w-full h-full bg-white dark:bg-zinc-900 overflow-y-auto">
                            <LiquidReader url={url} onFallbackToPdf={() => { setIsLiquidMode(false); localStorage.setItem('liquidModePref', 'false'); }} />
                        </div>
                    ) : (
                        <div className={`p-4 ${viewMode === 'continuous' ? 'w-full flex flex-col items-center gap-4' : ''}`}>
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
                                    className={viewMode === 'continuous' ? 'flex flex-col items-center gap-4 w-full' : 'max-w-full'}
                                >
                                    {viewMode === 'single' ? (
                                        <div className="shadow-lg transition-transform duration-75 relative z-0 rounded-lg overflow-hidden">
                                            <Page
                                                pageNumber={pageNumber}
                                                scale={effectiveScale}
                                                width={effectiveWidth}
                                                renderTextLayer={true}
                                                renderAnnotationLayer={false}
                                                className="bg-white"
                                                loading={
                                                    <div className="h-[500px] w-full bg-white animate-pulse flex items-center justify-center rounded-lg">
                                                        <Loader2 className="w-8 h-8 text-slate-200 animate-spin" />
                                                    </div>
                                                }
                                            />
                                        </div>
                                    ) : (
                                        /* Continuous scroll mode */
                                        numPages && Array.from({ length: numPages }, (_, i) => i + 1).map((pg) => (
                                            <div
                                                key={pg}
                                                data-page-number={pg}
                                                className="shadow-lg rounded-lg overflow-hidden"
                                            >
                                                <Page
                                                    pageNumber={pg}
                                                    scale={effectiveScale}
                                                    width={effectiveWidth}
                                                    renderTextLayer={true}
                                                    renderAnnotationLayer={false}
                                                    className="bg-white"
                                                    loading={
                                                        <div className="h-[500px] w-full bg-white animate-pulse flex items-center justify-center rounded-lg">
                                                            <Loader2 className="w-8 h-8 text-slate-200 animate-spin" />
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        ))
                                    )}
                                </Document>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ===== GO TO PAGE MODAL ===== */}
            {showGoToPage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowGoToPage(false)}>
                    <div
                        className={`rounded-2xl p-6 shadow-2xl w-72 ${colorMode === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-slate-200'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4 className={`text-sm font-bold mb-3 ${colorMode === 'dark' ? 'text-zinc-200' : 'text-slate-800'}`}>
                            Go to Page
                        </h4>
                        <div className="flex gap-2">
                            <input
                                ref={goToPageRef}
                                type="number"
                                min={1}
                                max={numPages || 1}
                                value={goToPageInput}
                                onChange={(e) => setGoToPageInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleGoToPage(); if (e.key === 'Escape') setShowGoToPage(false); }}
                                placeholder={`1 - ${numPages || '?'}`}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border outline-none transition-colors ${colorMode === 'dark'
                                    ? 'bg-zinc-800 border-zinc-600 text-zinc-100 focus:border-purple-500 placeholder:text-zinc-500'
                                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-purple-500 placeholder:text-slate-400'
                                    }`}
                            />
                            <button
                                onClick={handleGoToPage}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-md"
                            >
                                Go
                            </button>
                        </div>
                        <p className={`text-[10px] mt-2 ${colorMode === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>
                            Press Enter to navigate, Escape to close
                        </p>
                    </div>
                </div>
            )}

            {/* ===== KEYBOARD SHORTCUTS PANEL ===== */}
            {showShortcuts && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}>
                    <div
                        className={`rounded-2xl p-6 shadow-2xl w-80 ${colorMode === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-slate-200'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${colorMode === 'dark' ? 'text-zinc-200' : 'text-slate-800'}`}>
                            <Keyboard className="w-4 h-4" /> Keyboard Shortcuts
                        </h4>
                        <div className="space-y-2">
                            {[
                                ['← / →', 'Previous / Next page'],
                                ['+ / -', 'Zoom in / out'],
                                ['G', 'Go to page'],
                                ['F', 'Toggle fullscreen'],
                                ['Home', 'First page'],
                                ['End', 'Last page'],
                                ['Esc', 'Close dialogs'],
                            ].map(([key, desc]) => (
                                <div key={key} className="flex items-center gap-3">
                                    <kbd className={`px-2 py-1 rounded-md text-[10px] font-bold min-w-[3rem] text-center ${colorMode === 'dark'
                                        ? 'bg-zinc-800 text-zinc-300 border border-zinc-600'
                                        : 'bg-slate-100 text-slate-700 border border-slate-300'
                                        }`}>{key}</kbd>
                                    <span className={`text-xs ${colorMode === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>{desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SCROLL TO TOP BUTTON ===== */}
            {showScrollTop && viewMode === 'continuous' && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-purple-600 text-white shadow-xl hover:bg-purple-700 transition-all flex items-center justify-center hover:scale-110 active:scale-95"
                    title="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}

            {/* ===== DYNAMIC STYLES ===== */}
            <style jsx global>{`
                .pdf-color-dark canvas {
                    filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9);
                }
                .pdf-color-sepia canvas {
                    filter: sepia(0.35) brightness(0.95) contrast(1.05);
                }
                /* Hide scrollbar for toolbar */
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
                /* Thin scrollbar */
                .scrollbar-thin::-webkit-scrollbar { width: 6px; }
                .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
                .scrollbar-thin::-webkit-scrollbar-thumb { border-radius: 3px; }
            `}</style>

            {/* Apply color filter */}
            <style jsx global>{`
                ${colorMode === 'dark' ? `
                    #pdf-container .react-pdf__Page canvas {
                        filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9);
                    }
                ` : ''}
                ${colorMode === 'sepia' ? `
                    #pdf-container .react-pdf__Page canvas {
                        filter: sepia(0.35) brightness(0.95) contrast(1.05);
                    }
                ` : ''}
            `}</style>
        </div>
    );
}
