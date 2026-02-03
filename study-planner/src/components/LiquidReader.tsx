"use client";

import { useEffect, useState, useRef, useMemo } from 'react';
import { pdfjs } from 'react-pdf';
import { Loader2, AlertCircle, BookOpen, Quote, List, Settings, Type, X, Palette, Check } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { motion, AnimatePresence } from 'framer-motion';

// --- Semantic Data Structures ---

type NodeType = 'TITLE' | 'CHAPTER' | 'SECTION' | 'SUBSECTION' | 'CLAUSE' | 'PARAGRAPH' | 'LIST_ITEM' | 'UNKNOWN';

interface DocNode {
    id: string;
    type: NodeType;
    content: string;
    level: number; // For indentation hierarchy
    index: number; // Global reading position index
}

interface RawItem {
    str: string;
    x: number;
    y: number;
    w: number;
    h: number;
    fontName: string;
    hasEOL: boolean;
}

interface RawLine {
    text: string;
    y: number;
    page: number;
    height: number;
    isBold: boolean;
    isAllCap: boolean;
}

interface LiquidReaderProps {
    url: string;
    onLoadComplete?: () => void;
}

// --- Semantic Analysis Engine ---

class SemanticAnalyzer {
    private rawLines: RawLine[] = [];

    // Phase 1: Ingest & Global Noise Detection
    public addPageLines(lines: RawLine[]) {
        this.rawLines.push(...lines);
    }

    // Phase 2: The Pipeline
    public process(): DocNode[] {
        if (this.rawLines.length === 0) return [];

        // 1. Filter Noise (Header/Footer/Watermarks)
        const cleanLines = this.filterNoise(this.rawLines);

        // 2. Structural Tagging (Line by Line)
        const taggedLines = cleanLines.map(line => this.tagLine(line));

        // 3. Semantic Reduction (Continuous Prose Engine)
        const nodes = this.constructSemanticNodes(taggedLines);

        return nodes;
    }


    private filterNoise(lines: RawLine[]): RawLine[] {
        return lines.filter(line => {
            const txt = line.text.trim();
            if (!txt) return false;
            // Filter common watermarks or page numbers
            if (/^(Page\s+)?\d+(\s+of\s+\d+)?$/i.test(txt)) return false;
            if (txt.includes("Dak Guru") || txt.includes("dakguru.com")) return false;
            return true;
        });
    }

    private tagLine(line: RawLine): { line: RawLine; type: NodeType } {
        let text = line.text.trim();

        // Data Normalization (NFKC)
        if (text.normalize) {
            text = text.normalize('NFKC');
        }

        // 1. Explicit Matches
        if (/^CHAPTER\s+[IVX0-9]+/i.test(text)) return { line, type: 'CHAPTER' };
        if (/^(THE\s+)?(ACT|CODE|RULES)\s+\d{4}$/.test(text)) return { line, type: 'TITLE' };

        // 2. Sections
        if (/^(Section|Rule|Regulation)\s+\d+/i.test(text)) return { line, type: 'SECTION' };
        if (/^Part\s+[IVX]+/i.test(text)) return { line, type: 'SECTION' };

        // 3. Subsections / Clauses
        if (/^\(\d+\)/.test(text)) return { line, type: 'CLAUSE' };
        if (/^\([a-z]\)/.test(text)) return { line, type: 'CLAUSE' };
        if (/^\d+\.\s/.test(text)) return { line, type: 'LIST_ITEM' };

        // 4. Typography Heuristics
        if (line.height > 14 && line.isBold) return { line, type: 'CHAPTER' };
        if (line.isAllCap && line.isBold) return { line, type: 'SECTION' };

        return { line, type: 'PARAGRAPH' };
    }

    private constructSemanticNodes(taggedItems: { line: RawLine; type: NodeType }[]): DocNode[] {
        const nodes: DocNode[] = [];
        let buffer: { type: NodeType; text: string; level: number } | null = null;
        let pidx = 0;

        const flush = () => {
            if (buffer) {
                nodes.push({
                    id: `node-${pidx++}`,
                    type: buffer.type,
                    content: buffer.text,
                    level: buffer.level,
                    index: pidx
                });
                buffer = null;
            }
        };

        for (let i = 0; i < taggedItems.length; i++) {
            const current = taggedItems[i];

            // Structural elements break flow
            if (['TITLE', 'CHAPTER', 'SECTION'].includes(current.type)) {
                flush();
                nodes.push({
                    id: `node-${pidx++}`,
                    type: current.type,
                    content: current.line.text,
                    level: 0,
                    index: pidx
                });
                continue;
            }

            // List/Clauses
            if (['CLAUSE', 'LIST_ITEM'].includes(current.type)) {
                flush();
                buffer = {
                    type: current.type,
                    text: current.line.text,
                    level: 1
                };
                continue;
            }

            // Paragraph Merging Logic
            if (!buffer) {
                buffer = {
                    type: 'PARAGRAPH',
                    text: current.line.text,
                    level: 0
                };
            } else {
                // Merge decision
                const prevText = buffer.text.trim();
                const curText = current.line.text.trim();

                const endsWithStop = /[.:!?]$/.test(prevText);
                const startsLower = /^[a-z]/.test(curText);
                const endsHyphen = /-$/.test(prevText);

                if (!endsWithStop || startsLower || endsHyphen) {
                    if (endsHyphen) {
                        buffer.text = buffer.text.slice(0, -1) + curText;
                    } else {
                        buffer.text += " " + curText;
                    }
                } else {
                    flush();
                    buffer = {
                        type: 'PARAGRAPH',
                        text: current.line.text,
                        level: 0
                    };
                }
            }
        }
        flush();
        return nodes;
    }
}

// --- React Component ---

export default function LiquidReader({ url, onLoadComplete }: LiquidReaderProps) {
    const [nodes, setNodes] = useState<DocNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Preferences
    const [fontSize, setFontSize] = useState(18); // Default larger for readability
    const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
    const [showControls, setShowControls] = useState(false);
    const [watermarkEnabled, setWatermarkEnabled] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const process = async () => {
            try {
                setLoading(true);
                setProgress(5);

                const loadingTask = pdfjs.getDocument(url);
                loadingTask.onProgress = ({ loaded, total }: { loaded: number; total: number }) => {
                    if (total > 0) setProgress(Math.round((loaded / total) * 30));
                };
                const pdf = await loadingTask.promise;

                const analyzer = new SemanticAnalyzer();
                const totalPages = pdf.numPages;

                for (let i = 1; i <= totalPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const items = textContent.items as any[];
                    // Use common scale for width calcs
                    const viewport = page.getViewport({ scale: 1.0 });

                    if (items.length > 0) {
                        // 1. Pre-process items: Group by Line (Y-coord)
                        const linesMap = new Map<number, RawItem[]>();
                        const TOLERANCE = 4; // Vertical tolerance

                        items.forEach(item => {
                            const y = item.transform[5];
                            let foundY = -1;
                            for (const existingY of linesMap.keys()) {
                                if (Math.abs(existingY - y) < TOLERANCE) {
                                    foundY = existingY;
                                    break;
                                }
                            }
                            const key = foundY !== -1 ? foundY : y;
                            if (!linesMap.has(key)) linesMap.set(key, []);

                            // Calculate width roughly if not present
                            const w = item.width || (item.transform[0] * item.str.length * 0.5); // Fallback

                            linesMap.get(key)!.push({
                                str: item.str,
                                x: item.transform[4],
                                y: key,
                                w: w,
                                h: item.height || Math.abs(item.transform[0]),
                                fontName: item.fontName,
                                hasEOL: item.hasEOL
                            });
                        });

                        // 2. Construct Text from Items (Intelligent Spacing)
                        // This fixes "ill egal" by ignoring spaces if gaps are tiny
                        const rawPageLines: RawLine[] = [];

                        // Sort lines top to bottom
                        const sortedY = Array.from(linesMap.keys()).sort((a, b) => b - a);

                        for (const y of sortedY) {
                            const lineItems = linesMap.get(y)!;
                            // Sort LTR
                            lineItems.sort((a, b) => a.x - b.x);

                            let lineText = "";
                            let lastEnd = -1;
                            let maxH = 0;
                            let isBold = false;

                            for (let k = 0; k < lineItems.length; k++) {
                                const item = lineItems[k];
                                maxH = Math.max(maxH, item.h);
                                if (item.fontName?.toLowerCase().includes("bold")) isBold = true;

                                if (lastEnd !== -1) {
                                    const gap = item.x - lastEnd;
                                    // Threshold: if gap is significant (> 20% of font size approx), add space
                                    // Assuming avg font size ~ 10-12. 2-3px is kerning, 5-6px is space.
                                    // Let's allow tight kerning.
                                    if (gap > 4.0 && item.str.trim().length > 0) {
                                        lineText += " ";
                                    }
                                }
                                lineText += item.str;
                                lastEnd = item.x + item.w; // approx end
                            }

                            if (lineText.trim()) {
                                rawPageLines.push({
                                    text: lineText,
                                    y,
                                    page: i,
                                    height: maxH,
                                    isBold,
                                    isAllCap: lineText === lineText.toUpperCase() && lineText.length > 5
                                });
                            }
                        }

                        analyzer.addPageLines(rawPageLines);
                    }

                    if (isMounted) setProgress(30 + Math.round((i / totalPages) * 50));
                }

                if (!isMounted) return;

                const docNodes = analyzer.process();
                setNodes(docNodes);
                setLoading(false);
                setProgress(100);
                if (onLoadComplete) onLoadComplete();

            } catch (err: any) {
                console.error("Reader Error:", err);
                setError("Failed to process document.");
                setLoading(false);
            }
        };

        process();
        return () => { isMounted = false; };
    }, [url, onLoadComplete]);

    // --- Semantic Styling ---

    // Core Academic Coloring Component
    const SemanticText = ({ text }: { text: string }) => {
        // Regex to identify tokens:
        // 1. Regulation/Section ref: "Section 10", "Rule 5", "(1)", "(a)", "1."
        // 2. Keywords
        const parts = text.split(/(\(?[0-9]+[A-Za-z]?\)|Section\s+\d+|Rule\s+\d+|Regulation\s+\d+)/g);

        return (
            <span>
                {parts.map((part, i) => {
                    // Regulation / Numbering -> Indigo
                    if (/^(\(?[0-9]+[A-Za-z]?\)|Section\s+\d+|Rule\s+\d+|Regulation\s+\d+)$/.test(part)) {
                        return <span key={i} className="font-bold text-indigo-700 dark:text-indigo-400">{part}</span>;
                    }

                    // Specific Keywords -> Green (Dark Green)
                    // We split inside the plain part to find keywords
                    // Heuristic: only color FULL words
                    const lower = part.toLowerCase();
                    const keywords = ["prohibited", "penalty", "mandatory", "authorized", "illegal", "offence", "punishable", "contravention"];

                    // Check if part contains any keyword
                    if (keywords.some(k => lower.includes(k))) {
                        // Advanced split for keywords
                        return (
                            <span key={i}>
                                {part.split(/\b/).map((word, j) => {
                                    if (keywords.includes(word.toLowerCase())) {
                                        return <span key={j} className="text-emerald-700 dark:text-emerald-400 font-semibold">{word}</span>;
                                    }
                                    return word;
                                })}
                            </span>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </span>
        );
    };

    const renderNode = (node: DocNode) => {
        const key = node.id;

        // Base readability styles
        const baseStyle = { fontSize: `${fontSize}px`, lineHeight: '1.6' };

        switch (node.type) {
            case 'TITLE':
                return (
                    <div key={key} className="mb-10 text-center px-4 pt-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-4 font-serif leading-tight">
                            {node.content}
                        </h1>
                        <div className="h-1 w-24 bg-blue-900/20 mx-auto rounded-full" />
                    </div>
                );
            case 'CHAPTER':
                return (
                    <div key={key} className="mt-14 mb-8">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest border-b-2 border-slate-200 dark:border-slate-700 pb-2 font-serif">
                            {node.content}
                        </h2>
                    </div>
                );
            case 'SECTION':
                return (
                    <h3 key={key} className="mt-8 mb-4 text-lg font-bold text-blue-800 dark:text-blue-300 leading-snug font-serif">
                        <SemanticText text={node.content} />
                    </h3>
                );
            case 'CLAUSE':
            case 'SUBSECTION':
                return (
                    <div key={key} className="mt-3 mb-2 pl-4 md:pl-6 flex items-start gap-3">
                        <div className="flex-1 text-slate-800 dark:text-slate-300 text-left font-serif" style={baseStyle}>
                            <SemanticText text={node.content} />
                        </div>
                    </div>
                );
            case 'LIST_ITEM':
                return (
                    <div key={key} className="mt-2 mb-2 pl-8 relative">
                        {/* Teal bullet for sub-clauses/lists */}
                        <div className="absolute left-3 top-[0.6em] w-1.5 h-1.5 bg-teal-600 rounded-full opacity-80" />
                        <div className="text-slate-800 dark:text-slate-300 text-left font-serif" style={baseStyle}>
                            {node.content}
                        </div>
                    </div>
                );
            default: // PARAGRAPH
                return (
                    <p key={key} className="mb-6 text-slate-800 dark:text-slate-300 text-left font-serif" style={baseStyle}>
                        <SemanticText text={node.content} />
                    </p>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-6 min-h-[60vh] bg-white dark:bg-zinc-950">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Optimizing Reading Experience</h3>
                    <p className="text-slate-500 text-sm mt-1">Reflowing text, fixing splits, and applying academic styling...</p>
                    <div className="mt-4 text-xs font-mono text-blue-600">{progress}%</div>
                </div>
            </div>
        );
    }

    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    const themeClasses = {
        light: 'bg-white text-slate-900',
        sepia: 'bg-[#f4ecd8] text-[#5b4636]',
        dark: 'bg-zinc-950 text-slate-300'
    };

    return (
        <div className={`relative h-full flex flex-col ${themeClasses[theme]}`}>

            {/* Controls Bar */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2"
                    >
                        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-200 dark:border-zinc-700 shadow-2xl rounded-2xl p-5 w-72 space-y-5">

                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
                                <span className="font-bold text-sm text-slate-600 dark:text-slate-300">Reader Settings</span>
                                <button onClick={() => setShowControls(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Theme Toggle */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Palette className="w-3 h-3" /> Theme
                                </label>
                                <div className="flex gap-2">
                                    {(['light', 'sepia', 'dark'] as const).map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTheme(t)}
                                            className={`flex-1 h-10 rounded-xl border flex items-center justify-center transition-all ${theme === t ? 'ring-2 ring-blue-500 border-transparent shadow-sm' : 'border-slate-200 dark:border-zinc-700'} ${t === 'light' ? 'bg-white' : t === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-zinc-900'}`}
                                        >
                                            {theme === t && <Check className={`w-5 h-5 ${t === 'dark' ? 'text-white' : 'text-slate-900'}`} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Font Size */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Type className="w-3 h-3" /> Font Size
                                    </label>
                                    <span className="text-xs font-mono font-medium text-slate-500">{fontSize}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="14" max="24" step="1"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                    className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-slate-400 px-1">
                                    <span>Aa</span>
                                    <span>Aa</span>
                                </div>
                            </div>

                            {/* Watermark Toggle */}
                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Background Logo</label>
                                <button
                                    onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${watermarkEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${watermarkEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Settings Button */}
            <button
                onClick={() => setShowControls(!showControls)}
                className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-xl shadow-blue-900/20 transition-all active:scale-95 duration-200 ${showControls ? 'bg-slate-800 text-white rotate-0' : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'}`}
            >
                {showControls ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
            </button>

            <div className="max-w-3xl mx-auto w-full min-h-screen relative overflow-hidden transition-colors duration-300">

                {/* --- Watermark Layer --- */}
                {watermarkEnabled && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.06] select-none" style={{
                        backgroundImage: `url('/dak-guru-round.png')`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '180px', // Larger pattern
                        backgroundPosition: '0 0',
                        filter: theme === 'dark' ? 'invert(1) opacity(0.5)' : 'grayscale(1)',
                        transform: 'rotate(-10deg) scale(1.2)'
                    }} />
                )}

                {/* Content Layer */}
                <div className="relative z-10 px-6 sm:px-8 py-8 md:py-12">
                    {/* Header Branding */}
                    <div className="flex items-center justify-center gap-2 mb-12 opacity-30 select-none">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Dak Guru Smart Reader</span>
                    </div>

                    {nodes.map(renderNode)}

                    <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-center opacity-40 select-none">
                        <BookOpen className="w-6 h-6 mx-auto mb-3" />
                        <p className="text-[10px] uppercase tracking-widest">End of Document</p>
                    </div>
                </div>
            </div>

            {/* CSS Injection for Strict Text Rendering (Important!) */}
            <style jsx global>{`
                /* Override any global Tailwind Resets */
                p, h1, h2, h3, div, span {
                    word-break: normal !important;
                    overflow-wrap: break-word !important;
                    hyphens: none !important;
                    -webkit-hyphens: none !important;
                    text-rendering: optimizeLegibility;
                    text-align: left !important; /* Force left align (no justify) */
                }
            `}</style>
        </div>
    );
}
