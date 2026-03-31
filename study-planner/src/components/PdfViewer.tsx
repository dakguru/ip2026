"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
    ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Download, AlertCircle, RefreshCw,
    BookOpen, FileText, Maximize2, Minimize2, Sun, Moon, Coffee,
    ChevronUp, ChevronDown, Keyboard, LayoutGrid, Search, X
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

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const goToPageRef = useRef<HTMLInputElement>(null);

    // Zoom Presets
    const ZOOM_PRESETS = [50, 75, 100, 125, 150, 200];

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
            if (e.key === 'ArrowLeft') setPageNumber(p => Math.max(p - 1, 1));
            if (e.key === 'ArrowRight') setPageNumber(p => Math.min(p + 1, numPages || p));
            if (e.key === 'g' || e.key === 'G') { setShowGoToPage(true); setTimeout(() => goToPageRef.current?.focus(), 100); }
            if (e.key === 'f' || e.key === 'F') toggleFullscreen();
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [numPages, showGoToPage, showSearch]);

    // --- UI Helpers ---
    const colorStyles = {
        bg: colorMode === 'dark' ? 'bg-zinc-950' : colorMode === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-slate-50',
        text: colorMode === 'dark' ? 'text-zinc-200' : colorMode === 'sepia' ? 'text-[#3d2e24]' : 'text-slate-800',
        header: colorMode === 'dark' ? 'bg-zinc-900 border-zinc-800' : colorMode === 'sepia' ? 'bg-[#fdf6e3] border-[#d4c39c]' : 'bg-white border-slate-200',
        icon: colorMode === 'dark' ? 'text-zinc-300' : colorMode === 'sepia' ? 'text-[#5b4636]' : 'text-slate-600',
        hover: colorMode === 'dark' ? 'hover:bg-zinc-800' : colorMode === 'sepia' ? 'hover:bg-amber-100' : 'hover:bg-slate-100',
    };

    const effectiveWidth = containerWidth ? (fitMode === 'width' ? containerWidth - 40 : undefined) : undefined;
    const effectiveHeight = containerHeight ? (fitMode === 'page' ? containerHeight - 40 : undefined) : undefined;
    const effectiveScale = fitMode === 'custom' ? scale : 1.0;

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
                <div className="flex items-center gap-1.5">
                    {/* Liquid Mode Toggle */}
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
                            <button onClick={() => window.location.reload()} className={`p-1.5 rounded-lg transition-colors ${colorStyles.hover} ${colorStyles.icon}`} title="Refresh"><RefreshCw className="w-4 h-4" /></button>
                            <div className={`w-px h-4 mx-1 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />
                            
                            {/* Zoom & Fit Controls */}
                            <div className={`flex items-center gap-1.5 rounded-lg p-0.5 ${colorMode === 'dark' ? 'bg-zinc-800' : colorMode === 'sepia' ? 'bg-amber-200/50' : 'bg-slate-100'}`}>
                                <div className="flex bg-black/5 rounded-md p-0.5">
                                    <button onClick={() => { setFitMode('width'); setScale(1.0); }} className={`px-2 py-1 rounded text-[10px] font-extrabold ${fitMode === 'width' ? (colorMode === 'dark' ? 'bg-zinc-700 text-blue-400 shadow-sm' : 'bg-white shadow text-blue-600') : 'opacity-40'}`}>FW</button>
                                    <button onClick={() => { setFitMode('page'); setScale(1.0); }} className={`px-2 py-1 rounded text-[10px] font-extrabold ${fitMode === 'page' ? (colorMode === 'dark' ? 'bg-zinc-700 text-blue-400 shadow-sm' : 'bg-white shadow text-blue-600') : 'opacity-40'}`}>FP</button>
                                </div>
                                <div className={`w-px h-3 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />
                                <button 
                                    onClick={() => { setScale(prev => Math.max(prev - 0.1, 0.3)); setFitMode('custom'); }} 
                                    className={`p-1 hover:opacity-100 transition-opacity ${colorStyles.icon} ${scale <= 0.3 ? 'opacity-20' : 'opacity-100'}`}
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-3.5 h-3.5" />
                                </button>
                                <span className={`text-[10px] font-black min-w-[32px] text-center ${colorStyles.icon} tabular-nums`}>
                                    {Math.round(scale * 100)}%
                                </span>
                                <button 
                                    onClick={() => { setScale(prev => Math.min(prev + 0.1, 3.0)); setFitMode('custom'); }} 
                                    className={`p-1 hover:opacity-100 transition-opacity ${colorStyles.icon} ${scale >= 3.0 ? 'opacity-20' : 'opacity-100'}`}
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className={`w-px h-5 mx-0.5 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />

                            <button onClick={() => setColorMode('light')} className={`p-1.5 rounded-lg transition-colors ${colorMode === 'light' ? 'bg-white shadow text-amber-500' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Light Mode"><Sun className="w-4 h-4" /></button>
                            <button onClick={() => setColorMode('sepia')} className={`p-1.5 rounded-lg transition-colors ${colorMode === 'sepia' ? 'bg-amber-100 shadow border border-amber-300/50 text-amber-900' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Sepia Mode"><Coffee className="w-4 h-4" /></button>
                            <button onClick={() => setColorMode('dark')} className={`p-1.5 rounded-lg transition-colors ${colorMode === 'dark' ? 'bg-zinc-700 shadow text-blue-400 border border-zinc-600' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Dark Mode"><Moon className="w-4 h-4" /></button>
                            
                            <div className={`w-px h-4 mx-1 ${colorMode === 'dark' ? 'bg-zinc-700' : colorMode === 'sepia' ? 'bg-amber-300' : 'bg-slate-300'}`} />
                            <button onClick={handleDownload} className={`p-1.5 rounded-lg transition-colors text-blue-500 ${colorStyles.hover}`} title="Download"><Download className="w-4 h-4" /></button>
                            <button onClick={() => setShowSearch(!showSearch)} className={`p-1.5 rounded-lg transition-colors ${showSearch ? 'bg-blue-100 text-blue-600' : colorStyles.hover + ' ' + colorStyles.icon}`} title="Search"><Search className="w-4 h-4" /></button>
                            <button onClick={toggleFullscreen} className={`p-1.5 rounded-lg transition-colors ${colorStyles.hover} ${colorStyles.icon}`} title="Fullscreen"><Maximize2 className="w-4 h-4" /></button>
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
                <div 
                    ref={scrollContainerRef}
                    className={`flex-1 overflow-auto flex justify-center min-h-0 ${isAndroid ? 'p-0' : 'p-4'}`}
                    style={{ scrollBehavior: 'auto' }}
                >
                    {isLiquidMode ? (
                        <div className="w-full h-full bg-white dark:bg-zinc-900 border-none">
                            <LiquidReader url={url} onFallbackToPdf={() => setIsLiquidMode(false)} />
                        </div>
                    ) : (
                        <div className="relative">
                            {loading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10">
                                    <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-2" />
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
                                <div className="shadow-2xl rounded-sm overflow-hidden bg-white">
                                    <Page 
                                        pageNumber={pageNumber} 
                                        scale={effectiveScale}
                                        width={effectiveWidth}
                                        height={effectiveHeight}
                                        renderAnnotationLayer={false}
                                        customTextRenderer={customTextRenderer}
                                        loading={null}
                                    />
                                </div>
                            </Document>
                        </div>
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
                #pdf-container .react-pdf__Page canvas {
                    transition: transform 0.2s ease-out;
                    z-index: 1;
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
                #pdf-container .react-pdf__Page canvas {
                    transition: transform 0.2s ease-out;
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
