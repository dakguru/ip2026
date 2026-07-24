"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
    ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search, Bookmark, 
    MoreVertical, Download, X, Layers, Maximize2, Minimize2,
    Sun, Moon, Coffee, Menu, ArrowLeft, Loader2, BookOpen
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Capacitor } from '@capacitor/core';
import { AnimatePresence, motion } from 'framer-motion';

import PdfSearchTool from './PdfSearchTool';
import PdfBookmarkOverlay from './PdfBookmarkOverlay';
import LiquidReader from '../LiquidReader';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const pdfOptions = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

type ColorMode = 'light' | 'dark' | 'sepia';
type FitMode = 'width' | 'page';

interface PdfReaderProps {
    url: string;
    title?: string;
    onBack?: () => void;
    isAndroid?: boolean;
    initialLiquidMode?: boolean;
}

export default function PdfReader({ url, title = "Document Viewer", onBack, isAndroid = false, initialLiquidMode = false }: PdfReaderProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [continuousScroll, setContinuousScroll] = useState(true);
    const [colorMode, setColorMode] = useState<ColorMode>('sepia');
    const [fitMode, setFitMode] = useState<FitMode>('width');
    const [isUIVisible, setIsUIVisible] = useState(true);
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [isLiquidMode, setIsLiquidMode] = useState(initialLiquidMode);
    
    // UI Overlays
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    
    // Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<{page: number}[]>([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    
    const [containerWidth, setContainerWidth] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [pdfDoc, setPdfDoc] = useState<any>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastScrollTop = useRef(0);

    // Initial load
    useEffect(() => {
        const savedBookmarks = localStorage.getItem(`pdf_bookmarks_${url}`);
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

        const savedPos = localStorage.getItem(`pdf_position_${url}`);
        if (savedPos) {
            const pos = JSON.parse(savedPos);
            setPageNumber(pos.page || 1);
        }

        async function fetchPdf() {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                setPdfBlob(blob);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }
        fetchPdf();
    }, [url]);

    // Save bookmarks
    useEffect(() => {
        localStorage.setItem(`pdf_bookmarks_${url}`, JSON.stringify(bookmarks));
    }, [bookmarks, url]);

    // Save reading position
    useEffect(() => {
        localStorage.setItem(`pdf_position_${url}`, JSON.stringify({ page: pageNumber }));
    }, [pageNumber, url]);

    // Container width observer
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Auto-hide UI logic
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollTop = container.scrollTop;
        const delta = scrollTop - lastScrollTop.current;
        lastScrollTop.current = scrollTop;

        // Threshold to avoid flickering
        if (Math.abs(delta) > 15) {
            if (delta > 0 && isUIVisible) {
                setIsUIVisible(false); // Hide on scroll down
            } else if (delta < 0 && !isUIVisible) {
                setIsUIVisible(true); // Show on scroll up
            }
        }

        // Detect current page
        if (continuousScroll) {
            let current = 1;
            const viewportCenter = scrollTop + (container.clientHeight / 2);
            pageRefs.current.forEach((ref, idx) => {
                if (ref && ref.offsetTop <= viewportCenter) {
                    current = idx + 1;
                }
            });
            if (current !== pageNumber) setPageNumber(current);
        }
    }, [isUIVisible, continuousScroll, pageNumber]);

    // Handle Tap to toggle UI
    const handleContainerClick = () => {
        setIsUIVisible(v => !v);
    };

    function onDocumentLoadSuccess(pdf: any) {
        setNumPages(pdf.numPages);
        setPdfDoc(pdf);
        setLoading(false);
    }

    const toggleBookmark = (page: number) => {
        setBookmarks(prev => 
            prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page].sort((a, b) => a - b)
        );
    };

    const jumpToPage = (pg: number) => {
        setPageNumber(pg);
        if (continuousScroll) {
            const ref = pageRefs.current[pg - 1];
            if (ref) {
                ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Force UI hide after jumping if scrolling down or just to stay clean
                setTimeout(() => setIsUIVisible(false), 800);
            }
        }
    };

    // Suppress harmless AbortException from react-pdf TextLayer
    const handleTextLayerError = useCallback((error: Error) => {
        if (error.message?.includes('TextLayer task cancelled')) return;
        console.error('TextLayer error:', error);
    }, []);

    // --- Search logic highlighting ---
    const customTextRenderer = useCallback((textItem: any) => {
        if (!searchTerm) return textItem.str;
        
        const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = textItem.str.split(new RegExp(`(${escapedSearch})`, 'gi'));
        
        return (
            <span>
                {parts.map((part: string, i: number) => (
                    part.toLowerCase() === searchTerm.toLowerCase() ?
                        <mark key={i} className="bg-yellow-300 text-black rounded-sm px-0.5">{part}</mark> :
                        part
                ))}
            </span>
        ) as any;
    }, [searchTerm]);

    // --- Search Logic ---
    const executeSearch = useCallback(async (text: string) => {
        if (!text || !pdfDoc) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        const results: {page: number}[] = [];
        try {
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const textContent = await page.getTextContent();
                const items = textContent.items.map((it: any) => it.str).join(' ');
                if (items.toLowerCase().includes(text.toLowerCase())) {
                    results.push({ page: i });
                }
            }
            setSearchResults(results);
            setCurrentSearchIndex(0);
            if (results.length > 0) jumpToPage(results[0].page);
        } catch (e) {
            console.error("Search error:", e);
        } finally {
            setIsSearching(false);
        }
    }, [pdfDoc, jumpToPage]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length >= 2) executeSearch(searchTerm);
            else if (searchTerm.length === 0) setSearchResults([]);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, executeSearch]);

    const navigateSearch = (direction: 'next' | 'prev') => {
        if (searchResults.length === 0) return;
        let nextIdx = direction === 'next' ? currentSearchIndex + 1 : currentSearchIndex - 1;
        if (nextIdx >= searchResults.length) nextIdx = 0;
        if (nextIdx < 0) nextIdx = searchResults.length - 1;
        setCurrentSearchIndex(nextIdx);
        jumpToPage(searchResults[nextIdx].page);
    };

    // --- Actions ---
    const handleDownload = () => {
        window.open(url, '_blank');
    };

    const colorStyles = {
        bg: colorMode === 'dark' ? 'bg-[#121212]' : colorMode === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-slate-200',
        ui: colorMode === 'dark' ? 'bg-zinc-900 border-zinc-700/50 text-zinc-100' : colorMode === 'sepia' ? 'bg-[#fdf6e3] border-[#d4c39c] text-[#3d2e24]' : 'bg-white border-slate-200 text-slate-800',
        mark: colorMode === 'dark' ? 'text-blue-400' : 'text-blue-600',
        floating: colorMode === 'dark' ? 'bg-zinc-800/90 text-zinc-100' : 'bg-white/90 text-zinc-900',
    };

    // Calculate width to fit page perfectly on mobile
    const effectiveWidth = fitMode === 'width' ? (containerWidth - 16) : undefined;

    return (
        <div 
            ref={containerRef}
            className={`relative flex flex-col h-full w-full overflow-hidden transition-colors duration-300 ${colorStyles.bg}`}
            onClick={handleContainerClick}
        >
            {/* Header */}
            <AnimatePresence>
                {isUIVisible && (
                    <motion.div 
                        initial={{ y: -60 }} animate={{ y: 0 }} exit={{ y: -60 }}
                        className={`absolute top-0 left-0 right-0 h-14 border-b px-4 flex items-center justify-between z-[55] ${colorStyles.ui} shadow-md backdrop-blur-md bg-opacity-95`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3">
                            <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex flex-col">
                                <h2 className="text-xs font-black uppercase tracking-wide truncate max-w-[140px] md:max-w-xs">{title}</h2>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] opacity-50 ${colorStyles.mark}`}>
                                    Page {pageNumber} / {numPages || '--'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {isAndroid && (
                                <button 
                                    onClick={() => setIsLiquidMode(!isLiquidMode)}
                                    className={`p-2 hover:bg-black/5 rounded-xl transition-all ${isLiquidMode ? 'text-blue-500' : ''}`}
                                    title="Switch Reader Mode"
                                >
                                    <BookOpen className="w-5 h-5" />
                                </button>
                            )}
                            <button 
                                onClick={handleDownload}
                                className="p-2 hover:bg-black/5 rounded-xl transition-all"
                                title="Download PDF"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => setShowSearch(true)}
                                className={`p-2 hover:bg-black/5 rounded-xl transition-all ${showSearch ? 'bg-blue-50 text-blue-600' : ''}`}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => toggleBookmark(pageNumber)}
                                className={`p-2 hover:bg-black/5 rounded-xl transition-all active:scale-125 ${bookmarks.includes(pageNumber) ? 'text-amber-500' : ''}`}
                            >
                                <Bookmark className="w-5 h-5" fill={bookmarks.includes(pageNumber) ? "currentColor" : "none"} />
                            </button>
                            <button 
                                onClick={() => setShowBookmarks(true)}
                                className="p-2 hover:bg-black/5 rounded-xl transition-all relative"
                            >
                                <Menu className="w-5 h-5" />
                                {bookmarks.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border border-white" />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content area */}
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={`flex-1 overflow-auto touch-pan-y scroll-smooth overscroll-contain ${continuousScroll && !isLiquidMode ? 'flex flex-col items-center py-20 px-2 gap-4' : 'flex items-center justify-center'}`}
            >
                {isLiquidMode ? (
                    <div className="w-full h-full bg-white transition-opacity">
                        <LiquidReader url={url} onFallbackToPdf={() => setIsLiquidMode(false)} />
                    </div>
                ) : pdfBlob && (
                    <Document
                        file={pdfBlob}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={pdfOptions}
                        loading={
                            <div className="flex flex-col items-center justify-center min-h-[400px] h-full space-y-4">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10" />
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Parsing PDF...</p>
                            </div>
                        }
                    >
                        {continuousScroll ? (
                            Array.from({ length: numPages || 0 }, (_, i) => i + 1).map(page => (
                                <div 
                                    key={page}
                                    ref={el => { pageRefs.current[page - 1] = el; }}
                                    className="shadow-2xl rounded-sm overflow-hidden bg-white mb-2"
                                >
                                    <Page 
                                        pageNumber={page} 
                                        width={effectiveWidth}
                                        scale={scale}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={true}
                                        customTextRenderer={customTextRenderer}
                                        onRenderTextLayerError={handleTextLayerError}
                                        loading={<div className="bg-white" style={{ width: effectiveWidth, height: effectiveWidth ? effectiveWidth * 1.4 : 800 }} />}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="shadow-2xl rounded-sm overflow-hidden bg-white">
                                <Page 
                                    pageNumber={pageNumber} 
                                    width={effectiveWidth}
                                    scale={scale}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={true}
                                    customTextRenderer={customTextRenderer}
                                    onRenderTextLayerError={handleTextLayerError}
                                />
                            </div>
                        )}
                    </Document>
                )}
            </div>

            {/* Bottom Controls (Mobile) */}
            <AnimatePresence>
                {isUIVisible && (
                    <motion.div 
                        initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
                        className={`absolute bottom-4 left-4 right-4 h-16 rounded-[2rem] border px-6 flex items-center justify-between z-[55] shadow-2xl ${colorStyles.ui} backdrop-blur-md bg-opacity-95`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => { setContinuousScroll(!continuousScroll); jumpToPage(pageNumber); }}
                                className={`flex flex-col items-center gap-1 transition-all ${continuousScroll ? colorStyles.mark : 'opacity-40'}`}
                            >
                                <Layers className="w-5 h-5" />
                                <span className="text-[8px] font-black uppercase tracking-tighter">Scroll</span>
                            </button>
                            <div className="w-px h-6 bg-current opacity-10" />
                            <div className="flex items-center gap-3">
                                <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))} className="p-1 active:scale-75 transition-transform"><ZoomOut className="w-4 h-4" /></button>
                                <span className="text-[11px] font-black tabular-nums tracking-tighter w-8 text-center">{Math.round(scale * 100)}%</span>
                                <button onClick={() => setScale(s => Math.min(3, s + 0.2))} className="p-1 active:scale-75 transition-transform"><ZoomIn className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-black/[0.03] rounded-full p-1 gap-1">
                                <button onClick={() => setColorMode('light')} className={`p-2 rounded-full transition-all ${colorMode === 'light' ? 'bg-white shadow-md text-amber-500 scale-110' : 'opacity-40'}`}><Sun className="w-4 h-4" /></button>
                                <button onClick={() => setColorMode('sepia')} className={`p-2 rounded-full transition-all ${colorMode === 'sepia' ? 'bg-[#f4ecd8] shadow-md text-amber-900 scale-110' : 'opacity-40'}`}><Coffee className="w-4 h-4" /></button>
                                <button onClick={() => setColorMode('dark')} className={`p-2 rounded-full transition-all ${colorMode === 'dark' ? 'bg-zinc-800 text-blue-400 shadow-md scale-110' : 'opacity-40'}`}><Moon className="w-4 h-4" /></button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => jumpToPage(Math.max(1, pageNumber - 1))} disabled={pageNumber <= 1} className="p-2 disabled:opacity-10 active:scale-75 transition-all"><ChevronLeft className="w-5 h-5"/></button>
                                <button onClick={() => jumpToPage(Math.min(numPages || 1, pageNumber + 1))} disabled={pageNumber >= (numPages || 1)} className="p-2 disabled:opacity-10 active:scale-75 transition-all"><ChevronRight className="w-5 h-5"/></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Overlays */}
            <PdfSearchTool 
                isVisible={showSearch}
                onClose={() => setShowSearch(false)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                totalMatches={searchResults.length}
                currentMatch={currentSearchIndex + 1}
                onNext={() => navigateSearch('next')}
                onPrev={() => navigateSearch('prev')}
                isSearching={isSearching}
                colorMode={colorMode}
            />

            <PdfBookmarkOverlay 
                isVisible={showBookmarks}
                onClose={() => setShowBookmarks(false)}
                bookmarks={bookmarks}
                onJump={jumpToPage}
                onRemove={(p) => setBookmarks(prev => prev.filter(pg => pg !== p))}
                colorMode={colorMode}
            />
        </div>
    );
}
