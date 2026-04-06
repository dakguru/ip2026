"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
    ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Download, AlertCircle, RefreshCw,
    BookOpen, FileText, Maximize2, Minimize2, Sun, Moon, Coffee,
    ChevronUp, ChevronDown, Keyboard, LayoutGrid, Search, X,
    RotateCw, Printer, Layers, PanelLeft
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import LiquidReader from './LiquidReader';

// Configure worker using Cloudflare CDN for better production reliability
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const pdfOptions = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

type ViewMode = 'single';
type ColorMode = 'light' | 'dark' | 'sepia';
type FitMode = 'width' | 'page' | 'custom';

interface PdfViewerProps {
    url: string;
    darkMode?: boolean;
}

export default function PdfViewer({ url, darkMode = false }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);

    // Google Drive Embed Support
    if (url && url.includes('drive.google.com')) {
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

    // --- State Initialization ---
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [fallbackToImage, setFallbackToImage] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

    // Hard Defaults
    const [colorMode, setColorMode] = useState<ColorMode>('sepia');
    const [fitMode, setFitMode] = useState<FitMode>('page');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showGoToPage, setShowGoToPage] = useState(false);
    const [goToPageInput, setGoToPageInput] = useState('');
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [showThumbnails, setShowThumbnails] = useState(false);

    // Search
    const [pdfDoc, setPdfDoc] = useState<any>(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<{page: number}[]>([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Android/Browser Detection
    const [isLiquidMode, setIsLiquidMode] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);
    const [isBrowser, setIsBrowser] = useState(false);

    // New premium toolbar features
    const [continuousScroll, setContinuousScroll] = useState(false);
    const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
    const [showZoomPresets, setShowZoomPresets] = useState(false);

    // New virtualization & performance states
    const [visiblePageRange, setVisiblePageRange] = useState<[number, number]>([1, 5]);
    const [pageDimensions, setPageDimensions] = useState<Record<number, { width: number; height: number }>>({});
    const [scrollTicking, setScrollTicking] = useState(false);
    const [renderScale, setRenderScale] = useState(1.0); 
    const [visualScale, setVisualScale] = useState(1.0);
    const [visibleThumbRange, setVisibleThumbRange] = useState<[number, number]>([1, 10]);
    const [thumbScrollTicking, setThumbScrollTicking] = useState(false);
    const thumbContainerRef = useRef<HTMLDivElement>(null);
    const zoomTimeout = useRef<NodeJS.Timeout | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const goToPageRef = useRef<HTMLInputElement>(null);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastScrollTop = useRef(0);

    // --- Core Effects ---
    useEffect(() => {
        const platform = Capacitor.getPlatform();
        const isAndroidPlatform = platform === 'android';
        setIsAndroid(isAndroidPlatform);
        setIsBrowser(!Capacitor.isNativePlatform());

        if (isAndroidPlatform) {
            const savedPref = localStorage.getItem('liquidModePref');
            if (savedPref !== null) setIsLiquidMode(savedPref === 'true');
            else setIsLiquidMode(true);
        }

        // Suppress PDF worker cancel warnings
        const originalConsoleError = console.error;
        console.error = (...args: any[]) => {
            const msg = args[0];
            if (typeof msg === 'string' && (msg.includes('TextLayer task cancelled') || msg.includes('AbortException'))) return;
            originalConsoleError(...args);
        };
        return () => { console.error = originalConsoleError; };
    }, []);

    // Reset logic on URL change
    useEffect(() => {
        setPageNumber(1);
        setLoading(true);
        setError(null);
        setLoadProgress(0);
        setPdfDoc(null);
        setSearchText('');
        setSearchResults([]);
        setSearchInput('');
        setShowSearch(false);
        setPdfBlob(null);

        async function fetchPdf() {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const blob = await response.blob();
                setPdfBlob(blob);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
                setLoading(false);
            }
        }
        fetchPdf();
        
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }, [url]);

    // Force Sepia/Single/FullPage on open regardless of previous sessions
    useEffect(() => {
        setColorMode('sepia');
        setFitMode('page');
        setPageNumber(1);
    }, [url]);

    // Dimensions tracker
    useEffect(() => {
        const updateDims = () => {
            const container = containerRef.current;
            if (container) {
                setContainerWidth(container.clientWidth);
                setContainerHeight(container.clientHeight);
            }
        };
        updateDims();
        window.addEventListener('resize', updateDims);
        return () => window.removeEventListener('resize', updateDims);
    }, [isFullscreen, showThumbnails]);

    // --- Logic Handlers ---
    function onDocumentLoadSuccess(pdf: any) {
        setNumPages(pdf.numPages);
        setPdfDoc(pdf);
        setLoading(false);
        setError(null);
        setPageNumber(1);
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
        
        // Initial range calculation after metadata is loaded
        setTimeout(updateVisibleRange, 200);
    }

    function onDocumentLoadError(err: Error) {
        console.error("PDF Load Error:", err);
        setError(err);
        setLoading(false);
    }

    function onDocumentLoadProgress({ loaded, total }: any) {
        if (total > 0) setLoadProgress(Math.round((loaded / total) * 100));
    }

    const toggleFullscreen = () => {
        if (!isBrowser) return;
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
        }
    };

    const handleGoToPage = () => {
        const pg = parseInt(goToPageInput);
        if (pg >= 1 && pg <= (numPages || 1)) {
            setPageNumber(pg);
            setShowGoToPage(false);
            setGoToPageInput('');
        }
    };

    const handleDownload = async () => {
        if (isBrowser) {
            window.open(url, '_blank');
            return;
        }
        try {
            Toast.show({ text: 'Starting download...' });
            const fileName = url.split('/').pop() || 'document.pdf';
            const { data } = await (await fetch(url)).blob() as any; 
            // In real app use Capacitor Blob to Base64 etc. Simplified for now.
            window.open(url, '_blank');
        } catch (e) {
            Toast.show({ text: 'Error downloading file.' });
        }
    };

    // --- Search Logic ---
    const executeSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!searchInput || !pdfDoc) return;

        setIsSearching(true);
        setSearchText(searchInput);
        const results: {page: number}[] = [];

        try {
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const textContent = await page.getTextContent();
                const items = textContent.items.map((it: any) => it.str).join(' ');
                if (items.toLowerCase().includes(searchInput.toLowerCase())) {
                    results.push({ page: i });
                }
            }
            setSearchResults(results);
            setCurrentSearchIndex(0);
            if (results.length > 0) setPageNumber(results[0].page);
        } finally {
            setIsSearching(false);
        }
    };

    // Full cleanup on unmount to prevent leaks
    useEffect(() => {
        return () => {
            if (pdfDoc && pdfDoc.destroy) pdfDoc.destroy();
            if (pdfDoc && pdfDoc.cleanup) pdfDoc.cleanup();
            if (zoomTimeout.current) clearTimeout(zoomTimeout.current);
        };
    }, [pdfDoc]);

    const nextSearchResult = () => {
        if (searchResults.length === 0) return;
        const nextIdx = (currentSearchIndex + 1) % searchResults.length;
        setCurrentSearchIndex(nextIdx);
        setPageNumber(searchResults[nextIdx].page);
    };

    const prevSearchResult = () => {
        if (searchResults.length === 0) return;
        const prevIdx = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
        setCurrentSearchIndex(prevIdx);
        setPageNumber(searchResults[prevIdx].page);
    };

    const customTextRenderer = useCallback((textItem: any) => {
        if (!searchText) return textItem.str;
        
        // Escape special regex characters to prevent crashes
        const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = textItem.str.split(new RegExp(`(${escapedSearch})`, 'gi'));
        
        return (
            <span>
                {parts.map((part: string, i: number) => (
                    part.toLowerCase() === searchText.toLowerCase() ?
                        <mark key={i} className="pdf-search-highlight">{part}</mark> :
                        part
                ))}
            </span>
        ) as any;
    }, [searchText]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (showGoToPage || showSearch) return;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setPageNumber(p => Math.max(p - 1, 1));
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setPageNumber(p => Math.min(p + 1, numPages || p));
            if (e.key === 'g' || e.key === 'G') { setShowGoToPage(true); setTimeout(() => goToPageRef.current?.focus(), 100); }
            if (e.key === 'f' || e.key === 'F') toggleFullscreen();
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') { e.preventDefault(); setShowSearch(true); setTimeout(() => searchInputRef.current?.focus(), 100); }
            if (e.key === 'r' || e.key === 'R') handleRotate();
            if (e.key === 'c' || e.key === 'C') setContinuousScroll(v => !v);
            if (e.key === 't' || e.key === 'T') setShowThumbnails(v => !v);
            if (e.key === '+' || e.key === '=') { e.preventDefault(); handleZoomIn(); }
            if (e.key === '-') { e.preventDefault(); handleZoomOut(); }
            if (e.key === '0') { setFitMode('page'); setVisualScale(1.0); setRenderScale(1.0); }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [numPages, showGoToPage, showSearch]);

    // Handlers for new features
    const handlePrint = () => {
        if (pdfBlob) {
            const blobUrl = URL.createObjectURL(pdfBlob);
            const win = window.open(blobUrl, '_blank');
            if (win) { win.onload = () => { win.print(); }; }
        }
    };

    // Virtualization: High-performance scroll handler using requestAnimationFrame
    const updateVisibleRange = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container || !numPages || !continuousScroll) return;

        const scrollTop = container.scrollTop;
        const viewportHeight = container.clientHeight;
        const isScrollingDown = scrollTop > lastScrollTop.current;
        lastScrollTop.current = scrollTop;

        // PREDICTIVE BUFFER: If scrolling down, load more ahead (down), and vice versa
        const topBuffer = isScrollingDown ? viewportHeight * 0.5 : viewportHeight * 1.5;
        const bottomBuffer = isScrollingDown ? viewportHeight * 2.0 : viewportHeight * 1.0;

        let start = numPages;
        let end = 1;

        pageRefs.current.forEach((ref, idx) => {
            if (!ref) return;
            const pageNum = idx + 1;
            const top = ref.offsetTop;
            const height = ref.offsetHeight || 800;

            if (top + height >= scrollTop - topBuffer && top <= scrollTop + viewportHeight + bottomBuffer) {
                start = Math.min(start, pageNum);
                end = Math.max(end, pageNum);
            }
        });

        setVisiblePageRange([start, end]);
        
        // Find most visible page (closest to center of viewport)
        const viewportCenter = scrollTop + (viewportHeight / 2);
        let closestPage = 1;
        let minDiff = Infinity;

        pageRefs.current.forEach((ref, idx) => {
            if (!ref) return;
            const top = ref.offsetTop;
            const height = ref.offsetHeight || 800;
            const center = top + (height / 2);
            const diff = Math.abs(center - viewportCenter);

            if (diff < minDiff) {
                minDiff = diff;
                closestPage = idx + 1;
            }
        });

        if (closestPage !== pageNumber) {
            setPageNumber(closestPage);
        }
        
        setScrollTicking(false);
    }, [numPages, continuousScroll]);

    const handleScroll = useCallback(() => {
        if (!scrollTicking && continuousScroll) {
            setScrollTicking(true);
            requestAnimationFrame(updateVisibleRange);
        }
    }, [scrollTicking, continuousScroll, updateVisibleRange]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container && continuousScroll) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            // Initial call to set range
            updateVisibleRange();
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [continuousScroll, handleScroll, updateVisibleRange]);

    // Update virtualization on scale/rotation change as well
    useEffect(() => {
        if (continuousScroll) {
            setTimeout(updateVisibleRange, 100);
        }
    }, [visualScale, rotation, continuousScroll, updateVisibleRange]);

    // --- Zoom Engine ---
    const applyZoom = useCallback((newScale: number) => {
        setVisualScale(newScale);
        setFitMode('custom');
        
        if (zoomTimeout.current) clearTimeout(zoomTimeout.current);
        
        // Wait for zoom to stabilize before high-quality re-render
        zoomTimeout.current = setTimeout(() => {
            setRenderScale(newScale);
            // Re-sync range after render scale update
            setTimeout(updateVisibleRange, 200);
        }, 450);
    }, [updateVisibleRange]);

    const handleZoomIn = () => applyZoom(Math.min(visualScale + 0.25, 4.0));
    const handleZoomOut = () => applyZoom(Math.max(visualScale - 0.25, 0.25));

    // --- Sidebar Virtualization ---
    const updateVisibleThumbs = useCallback(() => {
        const container = thumbContainerRef.current;
        if (!container || !numPages || !showThumbnails) return;

        const scrollTop = container.scrollTop;
        const viewportHeight = container.clientHeight;
        
        // Increase buffer to prevent flickering (3 viewport heights)
        const buffer = viewportHeight * 3.0;

        let start = numPages;
        let end = 1;

        // ACCURATE SIZING: 128px (width) * 3/4 (aspect) + 20px (labels/padding) = ~116px
        // But the gap is 'gap-3' (12px) and 'py-2' (16px total)
        // Let's use an explicit container height in the render loop (160px)
        const thumbHeight = 160;
        start = Math.max(1, Math.floor((scrollTop - buffer) / thumbHeight) + 1);
        end = Math.min(numPages, Math.ceil((scrollTop + viewportHeight + buffer) / thumbHeight) + 1);

        setVisibleThumbRange([start, end]);
        setThumbScrollTicking(false);
    }, [numPages, showThumbnails]);

    const handleThumbScroll = useCallback(() => {
        if (!thumbScrollTicking && showThumbnails) {
            setThumbScrollTicking(true);
            requestAnimationFrame(updateVisibleThumbs);
        }
    }, [thumbScrollTicking, showThumbnails, updateVisibleThumbs]);

    useEffect(() => {
        const container = thumbContainerRef.current;
        if (container && showThumbnails) {
            container.addEventListener('scroll', handleThumbScroll, { passive: true });
            updateVisibleThumbs();
            return () => container.removeEventListener('scroll', handleThumbScroll);
        }
    }, [showThumbnails, handleThumbScroll, updateVisibleThumbs]);

    const handleRotate = () => setRotation(r => (r + 90) % 360);

    // When switching to continuous scroll, auto-switch to fit-width
    useEffect(() => {
        if (continuousScroll) {
            setFitMode('width');
            // Reset range when mode changes
            setTimeout(updateVisibleRange, 50);
        }
    }, [continuousScroll, updateVisibleRange]);

    // --- UI Helpers ---
    const colorStyles = {
        bg: colorMode === 'dark' ? 'bg-zinc-950' : colorMode === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-slate-50',
        text: colorMode === 'dark' ? 'text-zinc-200' : colorMode === 'sepia' ? 'text-[#3d2e24]' : 'text-slate-800',
        header: colorMode === 'dark' ? 'bg-zinc-900 border-zinc-800' : colorMode === 'sepia' ? 'bg-[#fdf6e3] border-[#d4c39c]' : 'bg-white border-slate-200',
        // Increased contrast for icons in Light and Sepia
        icon: colorMode === 'dark' ? 'text-zinc-300' : colorMode === 'sepia' ? 'text-[#3d2e24]' : 'text-slate-900',
        hover: colorMode === 'dark' ? 'hover:bg-zinc-800' : colorMode === 'sepia' ? 'hover:bg-amber-100 border border-amber-300/30' : 'hover:bg-slate-200',
    };

    const effectiveWidth = containerWidth ? (fitMode === 'width' ? containerWidth - 40 : undefined) : undefined;
    const effectiveHeight = containerHeight ? (fitMode === 'page' ? containerHeight - 40 : undefined) : undefined;
    
    // Virtualization / Rendering scale logic
    const effectiveScale = fitMode === 'custom' ? renderScale : 1.0;
    const currentScale = fitMode === 'custom' ? visualScale : 1.0;
    
    // Calculate CSS transform to maintain size during background rendering
    const zoomTransformScale = fitMode === 'custom' ? (visualScale / renderScale) : 1.0;

    return (
        <div ref={containerRef} id="pdf-container" className={`w-full h-full flex flex-col font-sans transition-colors duration-300 ${colorStyles.bg}`}>
            
            {/* TOOLBAR */}
            <div className={`shrink-0 h-14 border-b px-4 flex items-center justify-between z-40 transition-colors shadow-sm ${colorStyles.header}`}>
                
                {/* Left Area: Navigation */}
                <div className="flex items-center gap-3">
                    {!isLiquidMode && (
                        <div className="flex items-center">
                            <span className={`text-[10px] font-bold uppercase tracking-wider mr-2 ${colorStyles.icon}`}>
                                Page
                            </span>
                            <div className={`flex items-center border rounded-xl overflow-hidden ${colorMode === 'dark' ? 'border-zinc-700 bg-zinc-800/50' : colorMode === 'sepia' ? 'border-amber-300/50 bg-amber-50/50' : 'border-slate-200 bg-slate-50'}`}>
                                <button 
                                    onClick={() => setPageNumber(p => Math.max(p - 1, 1))}
                                    disabled={pageNumber <= 1 || loading}
                                    className={`p-1.5 disabled:opacity-30 transition-colors ${colorStyles.hover} ${colorStyles.icon}`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => { setShowGoToPage(true); setTimeout(() => goToPageRef.current?.focus(), 100); }}
                                    className={`px-3 py-1.5 text-xs font-black transition-all border-x ${colorMode === 'dark' ? 'border-zinc-700 text-white' : colorMode === 'sepia' ? 'border-amber-200 text-amber-900' : 'border-slate-200 text-slate-800'} ${colorStyles.hover}`}
                                >
                                    {loading ? '-- / --' : `${pageNumber} / ${numPages || '--'}`}
                                </button>
                                <button 
                                    onClick={() => setPageNumber(p => Math.min(p + 1, numPages || p))}
                                    disabled={pageNumber >= (numPages || 1) || loading}
                                    className={`p-1.5 disabled:opacity-30 transition-colors ${colorStyles.hover} ${colorStyles.icon}`}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Center Area: Beautiful Search Box (Visible when active) */}
                {showSearch && !isLiquidMode && (
                    <div className="hidden md:flex items-center flex-1 max-w-sm mx-4 animate-in fade-in slide-in-from-top-2">
                        <div className={`flex items-center w-full rounded-2xl border shadow-lg px-3 py-1.5 transition-all duration-300 ${colorMode === 'dark' ? 'bg-zinc-900 border-zinc-700 ring-1 ring-white/5' : 'bg-white border-slate-200 ring-1 ring-black/5'}`}>
                            <Search className="w-3.5 h-3.5 text-blue-500 mr-2" />
                            <form onSubmit={executeSearch} className="flex-1">
                                <input
                                    ref={searchInputRef}
                                    value={searchInput}
                                    onChange={e => {
                                        setSearchInput(e.target.value);
                                        // Real-time highlight as they type
                                        if (e.target.value.length >= 2) setSearchText(e.target.value);
                                        else if (e.target.value === '') setSearchText('');
                                    }}
                                    placeholder="Find in document..."
                                    className="w-full bg-transparent border-none outline-none text-xs font-semibold py-0.5"
                                />
                            </form>
                            {isSearching ? (
                                <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                            ) : searchResults.length > 0 ? (
                                <div className="flex items-center gap-1 pl-2 border-l ml-2">
                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                                        {currentSearchIndex + 1}/{searchResults.length}
                                    </span>
                                    <div className="flex items-center ml-1">
                                        <button onClick={prevSearchResult} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"><ChevronUp className="w-3.5 h-3.5"/></button>
                                        <button onClick={nextSearchResult} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"><ChevronDown className="w-3.5 h-3.5"/></button>
                                    </div>
                                </div>
                            ) : null}
                            <button onClick={() => { setShowSearch(false); setSearchText(''); setSearchInput(''); setSearchResults([]); }} className="ml-2 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Right Area */}
                <div className="flex items-center gap-1">
                    {/* Liquid Mode Toggle — Android only */}
                    {isAndroid && (
                        <button
                            onClick={() => {
                                const newVal = !isLiquidMode;
                                setIsLiquidMode(newVal);
                                localStorage.setItem('liquidModePref', String(newVal));
                            }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isLiquidMode ? 'bg-blue-600 text-white shadow-lg' : 'bg-black/5'}`}
                        >
                            {isLiquidMode ? <><BookOpen className="w-3.5 h-3.5" /><span>Reader</span></> : <><FileText className="w-3.5 h-3.5" /><span>PDF</span></>}
                        </button>
                    )}

                    {!isLiquidMode && (
                        <>
                            {/* ── VIEW MODE GROUP ── */}
                            {/* Thumbnail Panel Toggle */}
                            <button
                                onClick={() => setShowThumbnails(v => !v)}
                                className={`p-1.5 rounded-lg transition-colors ${showThumbnails ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600' : colorStyles.hover + ' ' + colorStyles.icon}`}
                                title="Thumbnail Panel"
                            >
                                <PanelLeft className="w-4 h-4" />
                            </button>

                            {/* Continuous Scroll Toggle */}
                            <button
                                onClick={() => setContinuousScroll(v => !v)}
                                className={`p-1.5 rounded-lg transition-colors ${continuousScroll ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600' : colorStyles.hover + ' ' + colorStyles.icon}`}
                                title={continuousScroll ? 'Single Page Mode' : 'Continuous Scroll'}
                            >
                                <Layers className="w-4 h-4" />
                            </button>

                            {/* Rotate */}
                            <button
                                onClick={handleRotate}
                                className={`p-1.5 rounded-lg transition-colors ${colorStyles.hover} ${colorStyles.icon}`}
                                title={`Rotate (${rotation}°)`}
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>

                            <div className={`w-px h-5 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />

                            {/* ── ZOOM GROUP ── */}
                            <div className={`flex items-center gap-1 rounded-lg p-0.5 ${colorMode === 'dark' ? 'bg-zinc-800' : colorMode === 'sepia' ? 'bg-amber-200/50' : 'bg-slate-100'}`}>
                                {/* FW / FP fit buttons — hide in continuous scroll */}
                                {!continuousScroll && (
                                    <div className={`flex rounded-md p-0.5 ${colorMode === 'dark' ? 'bg-black/30' : colorMode === 'sepia' ? 'bg-amber-900/10' : 'bg-slate-200'}`}>
                                        <button 
                                            onClick={() => { setFitMode('width'); setVisualScale(1.0); setRenderScale(1.0); }} 
                                            className={`px-2 py-1 rounded text-[10px] font-extrabold transition-all ${fitMode === 'width' ? (colorMode === 'dark' ? 'bg-zinc-700 text-blue-400 shadow-sm' : 'bg-white shadow text-blue-600') : (colorMode === 'dark' ? 'text-zinc-500' : colorMode === 'sepia' ? 'text-amber-900/60' : 'text-slate-500')}`} 
                                            title="Fit Width"
                                        >
                                            FW
                                        </button>
                                        <button 
                                            onClick={() => { setFitMode('page'); setVisualScale(1.0); setRenderScale(1.0); }} 
                                            className={`px-2 py-1 rounded text-[10px] font-extrabold transition-all ${fitMode === 'page' ? (colorMode === 'dark' ? 'bg-zinc-700 text-blue-400 shadow-sm' : 'bg-white shadow text-blue-600') : (colorMode === 'dark' ? 'text-zinc-500' : colorMode === 'sepia' ? 'text-amber-900/60' : 'text-slate-500')}`} 
                                            title="Fit Page"
                                        >
                                            FP
                                        </button>
                                    </div>
                                )}
                                <div className={`w-px h-3 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />
                                <button
                                    onClick={handleZoomOut}
                                    className={`p-1 transition-opacity ${colorStyles.icon} ${visualScale <= 0.25 ? 'opacity-20' : 'opacity-80 hover:opacity-100'}`}
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-3.5 h-3.5" />
                                </button>

                                {/* Zoom % — click to show presets */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowZoomPresets(v => !v)}
                                        className={`text-[10px] font-black min-w-[36px] text-center px-1 py-0.5 rounded hover:bg-black/10 transition-colors ${colorStyles.icon} tabular-nums`}
                                        title="Zoom Presets"
                                    >
                                        {Math.round(fitMode === 'custom' ? visualScale * 100 : (fitMode === 'width' ? (containerWidth ? Math.round(((containerWidth - 40) / 595) * 100) : 100) : (containerHeight ? Math.round(((containerHeight - 40) / 842) * 100) : 100)))}%
                                    </button>
                                    {showZoomPresets && (
                                        <div className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-50 rounded-xl shadow-2xl border overflow-hidden min-w-[70px] ${colorMode === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
                                            {[50, 75, 100, 125, 150, 175, 200, 300].map(pct => (
                                                <button
                                                    key={pct}
                                                    onClick={() => { applyZoom(pct / 100); setShowZoomPresets(false); }}
                                                    className={`w-full text-[11px] font-bold px-4 py-1.5 text-left transition-colors tabular-nums
                                                        ${Math.round(visualScale * 100) === pct && fitMode === 'custom'
                                                            ? 'bg-blue-500 text-white'
                                                            : colorMode === 'dark' ? 'text-zinc-200 hover:bg-zinc-800' : 'text-slate-700 hover:bg-slate-100'
                                                        }`}
                                                >
                                                    {pct}%
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleZoomIn}
                                    className={`p-1 transition-opacity ${colorStyles.icon} ${visualScale >= 4.0 ? 'opacity-20' : 'opacity-80 hover:opacity-100'}`}
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className={`w-px h-5 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />

                            {/* ── COLOR MODE GROUP ── */}
                            <button onClick={() => setColorMode('light')} className={`p-1.5 rounded-lg transition-colors ${colorMode === 'light' ? 'bg-white shadow text-amber-500' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Light Mode"><Sun className="w-4 h-4" /></button>
                            <button onClick={() => setColorMode('sepia')} className={`p-1.5 rounded-lg transition-colors ${colorMode === 'sepia' ? 'bg-amber-100 shadow border border-amber-300/50 text-amber-900' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Sepia Mode"><Coffee className="w-4 h-4" /></button>
                            <button onClick={() => setColorMode('dark')} className={`p-1.5 rounded-lg transition-colors ${colorMode === 'dark' ? 'bg-zinc-700 shadow text-blue-400 border border-zinc-600' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Dark Mode"><Moon className="w-4 h-4" /></button>

                            <div className={`w-px h-5 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />

                            {/* ── ACTIONS GROUP ── */}
                            <button onClick={() => window.location.reload()} className={`p-1.5 rounded-lg transition-colors ${colorStyles.hover} ${colorStyles.icon}`} title="Refresh"><RefreshCw className="w-4 h-4" /></button>
                            <button onClick={handlePrint} className={`p-1.5 rounded-lg transition-colors ${colorStyles.hover} ${colorStyles.icon}`} title="Print"><Printer className="w-4 h-4" /></button>
                            <button onClick={handleDownload} className={`p-1.5 rounded-lg transition-colors text-blue-500 ${colorStyles.hover}`} title="Download"><Download className="w-4 h-4" /></button>
                            <button onClick={() => { setShowSearch(!showSearch); if (!showSearch) setTimeout(() => searchInputRef.current?.focus(), 100); }} className={`p-1.5 rounded-lg transition-colors ${showSearch ? 'bg-blue-100 text-blue-600' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Search (Ctrl+F)"><Search className="w-4 h-4" /></button>
                            <button onClick={toggleFullscreen} className={`p-1.5 rounded-lg transition-colors ${colorStyles.hover} ${colorStyles.icon}`} title="Fullscreen (F)">{isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}</button>
                        </>
                    )}
                </div>
            </div>

            {/* MOBILE SEARCH BAR */}
            {showSearch && (
                <div className="md:hidden h-10 px-4 border-b flex items-center gap-3 bg-black/5 backdrop-blur-sm">
                    <form onSubmit={executeSearch} className="flex-1 flex items-center relative">
                        <Search className="w-4 h-4 absolute left-2 opacity-50" />
                        <input
                            ref={searchInputRef}
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            placeholder="Search document..."
                            className="w-full pl-8 pr-2 py-1 bg-transparent border-b border-current/20 outline-none text-xs"
                        />
                    </form>
                    {isSearching ? <Loader2 className="w-3 h-3 animate-spin"/> : searchResults.length > 0 && <span className="text-[10px] font-bold">{currentSearchIndex + 1}/{searchResults.length}</span>}
                    <button onClick={prevSearchResult} className="p-1"><ChevronUp className="w-4 h-4"/></button>
                    <button onClick={nextSearchResult} className="p-1"><ChevronDown className="w-4 h-4"/></button>
                    <button onClick={() => { setShowSearch(false); setSearchText(''); }}><X className="w-4 h-4"/></button>
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex overflow-hidden">

                {/* ── THUMBNAIL SIDEBAR ── */}
                {showThumbnails && !isLiquidMode && (
                    <div 
                        ref={thumbContainerRef}
                        className={`w-28 shrink-0 border-r flex flex-col items-center py-2 gap-3 overflow-y-auto ${colorMode === 'dark' ? 'bg-zinc-900 border-zinc-800' : colorMode === 'sepia' ? 'bg-[#f0e8d0] border-[#d4c39c]' : 'bg-slate-50 border-slate-200'}`}
                    >
                        <Document file={pdfBlob} loading={null} options={pdfOptions}>
                            {Array.from({ length: numPages || 0 }, (_, i) => i + 1).map(p => {
                                const isThumbVisible = p >= visibleThumbRange[0] && p <= visibleThumbRange[1];

                                return (
                                    <button
                                        key={p}
                                        onClick={() => { setPageNumber(p); if (continuousScroll) { const el = pageRefs.current[p - 1]; if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
                                        className={`w-full flex-shrink-0 flex flex-col items-center gap-1 p-1 rounded-lg transition-all ${pageNumber === p ? 'ring-2 ring-blue-500 ring-offset-1' : 'hover:bg-black/5 opacity-70 hover:opacity-100'}`}
                                        style={{ height: 160 }} // FIXED HEIGHT to match virtualization logic
                                        title={`Page ${p}`}
                                    >
                                        <div className="shadow-sm rounded overflow-hidden w-full bg-white relative" style={{ height: 120 }}>
                                            {isThumbVisible ? (
                                                <Page
                                                    pageNumber={p}
                                                    width={96}
                                                    renderAnnotationLayer={false}
                                                    renderTextLayer={false}
                                                    loading={<div className="w-full h-full bg-slate-100 animate-pulse rounded" />}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                                    <span className="text-[14px] font-black opacity-10">{p}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-[10px] h-4 font-bold tabular-nums ${pageNumber === p ? 'text-blue-600' : colorStyles.icon}`}>{p}</span>
                                    </button>
                                );
                            })}
                        </Document>
                    </div>
                )}

                {/* ── SCROLL CONTAINER ── */}
                <div
                    ref={scrollContainerRef}
                    className={`flex-1 overflow-auto flex min-h-0 ${isAndroid ? 'p-0' : continuousScroll ? 'flex-col items-center py-4 gap-3' : 'justify-center p-4'}`}
                    style={{ scrollBehavior: 'smooth' }}
                    onClick={() => setShowZoomPresets(false)}
                >
                    {isLiquidMode ? (
                        <div className="w-full h-full bg-white dark:bg-zinc-900 border-none">
                            <LiquidReader url={url} onFallbackToPdf={() => setIsLiquidMode(false)} />
                        </div>
                    ) : (
                        <>
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-20 gap-3">
                                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                                    <p className="text-sm font-medium opacity-60">Opening Secure Reader {loadProgress > 0 ? `${loadProgress}%` : ''}</p>
                                </div>
                            )}
                            {error && (
                                <div className="flex flex-col items-center justify-center gap-4 bg-red-50 p-10 rounded-2xl border border-red-100">
                                    <AlertCircle className="w-12 h-12 text-red-500" />
                                    <p className="text-red-700 font-bold">Failed to load document.</p>
                                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white rounded-full font-bold">Try Again</button>
                                </div>
                            )}
                            <Document
                                file={pdfBlob}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                                onLoadProgress={onDocumentLoadProgress}
                                loading={null}
                                options={pdfOptions}
                            >
                                {continuousScroll ? (
                                    // Continuous scroll: Virtualized rendering with placeholders
                                    Array.from({ length: numPages || 0 }, (_, i) => i + 1).map(p => {
                                        const isVisible = p >= visiblePageRange[0] && p <= visiblePageRange[1];
                                        const dims = pageDimensions[p];
                                        const placeholderHeight = dims ? dims.height * currentScale : (effectiveWidth ? effectiveWidth * 1.41 : 842 * currentScale);
                                        const placeholderWidth = effectiveWidth || (dims ? dims.width * currentScale : 595 * currentScale);

                                        return (
                                            <div
                                                key={p}
                                                ref={el => { pageRefs.current[p - 1] = el; }}
                                                data-page={p}
                                                className={`pdf-page shadow-2xl rounded-sm overflow-hidden bg-white mb-6 transition-[opacity,transform] duration-300 ring-1 ring-black/5 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                                style={{ 
                                                    minHeight: placeholderHeight,
                                                    width: placeholderWidth,
                                                    transform: `scale(${zoomTransformScale}) translateZ(0)`,
                                                    transformOrigin: 'top center',
                                                    willChange: isVisible ? 'transform, opacity' : 'auto'
                                                }}
                                            >
                                                {isVisible ? (
                                                    <Page
                                                        pageNumber={p}
                                                        scale={effectiveScale}
                                                        width={effectiveWidth}
                                                        rotate={rotation}
                                                        renderAnnotationLayer={false}
                                                        customTextRenderer={customTextRenderer}
                                                        onLoadSuccess={(page) => {
                                                            setPageDimensions(prev => ({
                                                                ...prev,
                                                                [p]: { width: page.width, height: page.height }
                                                            }));
                                                        }}
                                                        loading={
                                                            <div 
                                                                style={{ width: placeholderWidth, height: placeholderHeight }} 
                                                                className="bg-white flex flex-col gap-4 p-8 animate-pulse shadow-inner"
                                                            >
                                                                <div className="h-6 w-3/4 bg-slate-100 rounded-md" />
                                                                <div className="space-y-3">
                                                                    <div className="h-4 w-full bg-slate-50 rounded" />
                                                                    <div className="h-4 w-full bg-slate-50 rounded" />
                                                                    <div className="h-4 w-5/6 bg-slate-50 rounded" />
                                                                </div>
                                                                <div className="mt-8 flex justify-between">
                                                                    <div className="h-20 w-[48%] bg-slate-100 rounded" />
                                                                    <div className="h-20 w-[48%] bg-slate-100 rounded" />
                                                                </div>
                                                                <div className="mt-8 space-y-3">
                                                                    <div className="h-4 w-full bg-slate-50 rounded" />
                                                                    <div className="h-4 w-3/4 bg-slate-50 rounded" />
                                                                </div>
                                                            </div>
                                                        }
                                                    />
                                                ) : (
                                                    // Premium placeholder with page number for orienting
                                                    <div 
                                                        style={{ width: placeholderWidth, height: placeholderHeight }} 
                                                        className="bg-slate-50/30 flex flex-col items-center justify-center border-2 border-slate-100/50"
                                                    >
                                                        <div className="w-12 h-16 border-2 border-slate-200/50 rounded flex items-center justify-center opacity-20">
                                                            <span className="text-[12px] font-black">{p}</span>
                                                        </div>
                                                        <span className="mt-2 text-[10px] font-bold opacity-30 tracking-widest uppercase">Dak Guru Reader</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    // Single page mode (already efficient)
                                    <div className="pdf-page shadow-2xl rounded-sm overflow-hidden bg-white">
                                        <Page
                                            pageNumber={pageNumber}
                                            scale={effectiveScale}
                                            width={effectiveWidth}
                                            height={effectiveHeight}
                                            rotate={rotation}
                                            renderAnnotationLayer={false}
                                            customTextRenderer={customTextRenderer}
                                            loading={<div className="w-full h-screen bg-slate-50 animate-pulse" />}
                                        />
                                    </div>
                                )}
                            </Document>
                        </>
                    )}
                </div>
            </div>

            {/* GO TO PAGE MODAL */}
            {showGoToPage && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowGoToPage(false)}>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl w-64" onClick={e => e.stopPropagation()}>
                        <h4 className="font-bold mb-4">Go to Page</h4>
                        <div className="flex gap-2">
                            <input
                                ref={goToPageRef}
                                type="number"
                                autoFocus
                                value={goToPageInput}
                                onChange={e => setGoToPageInput(e.target.value)}
                                className="flex-1 border rounded-lg px-3 py-2 outline-none dark:bg-zinc-800"
                                placeholder={`1-${numPages}`}
                                onKeyDown={e => e.key === 'Enter' && handleGoToPage()}
                            />
                            <button onClick={handleGoToPage} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Go</button>
                        </div>
                    </div>
                </div>
            )}

            {/* STYLES */}
            <style jsx global>{`
                #pdf-container .pdf-page {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000;
                    margin-left: auto;
                    margin-right: auto;
                }
                #pdf-container .react-pdf__Page canvas {
                    transition: transform 0.2s ease-out;
                    z-index: 1;
                    image-rendering: crisp-edges;
                }
                #pdf-container .react-pdf__Page__textContent {
                    z-index: 10 !important;
                    opacity: 1 !important;
                    mix-blend-mode: multiply;
                }
                .pdf-search-highlight {
                    background-color: #ffeb3b !important;
                    color: black !important;
                    border-radius: 2px;
                    box-shadow: 0 0 5px rgba(255, 235, 59, 0.8), 0 0 0 1px rgba(0,0,0,0.1);
                    padding: 0 1px;
                    margin: 0 -1px;
                    font-weight: bold !important;
                    display: inline !important;
                    z-index: 20 !important;
                    position: relative;
                }
                .pdf-color-dark .pdf-search-highlight {
                    background-color: #ff9800 !important;
                    box-shadow: 0 0 8px rgba(255, 152, 0, 0.9);
                }
                .pdf-color-sepia .pdf-search-highlight {
                    background-color: #ffc107 !important;
                    box-shadow: 0 0 5px rgba(255, 193, 7, 0.7);
                }
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
