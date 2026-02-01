"use client";

import { useEffect, useState, useRef, useMemo } from 'react';
import { pdfjs } from 'react-pdf';
import { Loader2, AlertCircle, BookOpen, Quote, List } from 'lucide-react';

// --- Semantic Data Structures ---

type NodeType = 'TITLE' | 'CHAPTER' | 'SECTION' | 'SUBSECTION' | 'CLAUSE' | 'PARAGRAPH' | 'LIST_ITEM' | 'UNKNOWN';

interface DocNode {
    id: string;
    type: NodeType;
    content: string;
    level: number; // For indentation hierarchy
    index: number; // Global reading position index
}

interface RawLine {
    text: string;
    y: number;
    x: number;
    page: number;
    height: number;
    fontName: string;
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
    private headerSignatures: Set<string> = new Set();
    private footerSignatures: Set<string> = new Set();
    private totalPages: number = 0;

    constructor() { }

    // Phase 1: Ingest & Global Noise Detection
    public addPageLines(lines: RawLine[], pageNum: number, totalPages: number) {
        this.rawLines.push(...lines);
        this.totalPages = totalPages;
    }

    // Identify repeating headers/footers based on frequency at specific Y zones
    public analyzeGlobalArtifacts() {
        const topZone: string[] = [];
        const bottomZone: string[] = [];

        // Sample first 10 pages or all if < 10
        const sampleLimit = Math.min(this.getMaxPage(), 10);

        // This is a simplified heuristic: textual match in top/bottom 5%
        // In a real robust system, we'd histogram Y-coords.
    }

    private getMaxPage() {
        if (this.rawLines.length === 0) return 0;
        return this.rawLines[this.rawLines.length - 1].page;
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
        // Frequencies for Top/Bottom lines
        const topFreq = new Map<string, number>();
        const bottomFreq = new Map<string, number>();
        const totalPages = this.getMaxPage();

        lines.forEach(line => {
            // Normalized text for frequency
            const txt = line.text.trim();
            if (!txt) return;

            // Assume Page Height is roughly 800-ish (PDF units). 
            // Top is usually > 780, Bottom < 50
            // (Coordinate system: 0,0 is usually bottom-left in PDF, but we extracted raw)
            // Let's rely on relative checks if we knew page height, but we stored raw PDF y.
            // We'll trust rigid cutoff for now or frequency.

            // Check specific watermarks
            if (txt.includes("Dak Guru") || txt.includes("dakguru.com") || /^\d+$/.test(txt)) {
                // Aggressive watermark/page number removal
                line.text = ""; // Mark for deletion
            }
        });

        return lines.filter(l => l.text !== "");
    }

    private tagLine(line: RawLine): { line: RawLine; type: NodeType } {
        const text = line.text.trim();
        const upper = text.toUpperCase();

        // 1. Explicit Matches
        if (/^CHAPTER\s+[IVX0-9]+/i.test(text)) return { line, type: 'CHAPTER' };
        if (/^(THE\s+)?(ACT|CODE|RULES)\s+\d{4}$/.test(text)) return { line, type: 'TITLE' };

        // 2. Sections
        if (/^Section\s+\d+/i.test(text)) return { line, type: 'SECTION' };
        if (/^Part\s+[IVX]+/i.test(text)) return { line, type: 'SECTION' }; // Parts treated as Sections/Headings

        // 3. Subsections / Clauses
        // (1), (a), 1. 2. 
        if (/^\(\d+\)/.test(text)) return { line, type: 'CLAUSE' };
        if (/^\([a-z]\)/.test(text)) return { line, type: 'CLAUSE' }; // or SUBSECTION
        if (/^\d+\.\s/.test(text)) return { line, type: 'LIST_ITEM' };

        // 4. Typography Heuristics
        // Large + Bold = Title/Chapter
        if (line.height > 14 && line.isBold) return { line, type: 'CHAPTER' };
        if (line.isAllCap && line.isBold) return { line, type: 'SECTION' };

        return { line, type: 'PARAGRAPH' }; // Default to Body
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
            const next = taggedItems[i + 1];

            // Heading Types: Always flush immediately, never merge
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

            // List/Clauses: Flush previous, then maybe merge continuous list items? 
            // Usually list items are distinct.
            if (['CLAUSE', 'LIST_ITEM'].includes(current.type)) {
                flush();
                // Check if we should merge with NEXT line if it's a continuation?
                // Logic: "Clause (a) starts here..."
                //        "and continues here." -> Merge

                // Start a buffer for this Clause
                buffer = {
                    type: current.type,
                    text: current.line.text,
                    level: 1
                };

                // Look ahead for "broken sentence" merging
                // But generally, the loop structure handles the `else` (Paragraph) merging.
                // We need to set `buffer` and fall through to merge check?
                // No, explicit merge logic here is safer.
                continue;
            }

            // PARAGRAPH / BODY merging logic
            if (!buffer) {
                buffer = {
                    type: 'PARAGRAPH',
                    text: current.line.text,
                    level: 0
                };
            } else {
                // We have a buffer (Paragraph OR Clause OR List Item)
                // Decide to merge 'current' into 'buffer'

                const prevText = buffer.text.trim();
                const curText = current.line.text.trim();

                // Merge Conditions:
                // 1. Previous does NOT end in stop char (. : ! ?)
                // 2. OR Previous ends in hyphen -
                // 3. OR Current starts with lowercase (strong signal)

                const endsWithStop = /[.:!?]$/.test(prevText);
                const startsLower = /^[a-z]/.test(curText);
                const endsHyphen = /-$/.test(prevText);

                if (!endsWithStop || startsLower || endsHyphen) {
                    // MERGE
                    if (endsHyphen) {
                        buffer.text = buffer.text.slice(0, -1) + curText;
                    } else {
                        buffer.text += " " + curText;
                    }
                } else {
                    // Hardware Break -> Flush and Start New
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

                // Extraction Loop
                for (let i = 1; i <= totalPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const items = textContent.items as any[];
                    // const viewport = page.getViewport({ scale: 1.0 }); // Needed? for height 

                    if (items.length > 0) {
                        // Extract Raw Lines
                        // Group by Y
                        const linesMap = new Map<number, RawLine>();
                        const TOLERANCE = 4;

                        items.forEach(item => {
                            const y = item.transform[5];
                            const height = item.height || Math.abs(item.transform[0]);
                            // Round Y to nearest bucket
                            let foundY = -1;
                            for (const existingY of linesMap.keys()) {
                                if (Math.abs(existingY - y) < TOLERANCE) {
                                    foundY = existingY;
                                    break;
                                }
                            }

                            const key = foundY !== -1 ? foundY : y;
                            const existing = linesMap.get(key);

                            if (existing) {
                                // Assume LTR mapping; textContent items usually disjoint
                                // We append based on X, but simply concatenating string works for most PDFs
                                // unless strict column layout (which we aren't handling perfectly yet)
                                // Ideally sort items by X
                                // For now, just append with space
                                if (item.transform[4] > existing.x) {
                                    existing.text += " " + item.str;
                                } else {
                                    existing.text = item.str + " " + existing.text;
                                    existing.x = item.transform[4];
                                }
                                // Update metadata maxes
                                existing.height = Math.max(existing.height, height);
                                existing.isBold = existing.isBold || (item.fontName || "").toLowerCase().includes("bold");
                                // isAllCap check on full string later
                            } else {
                                linesMap.set(key, {
                                    text: item.str,
                                    y: key,
                                    x: item.transform[4],
                                    page: i,
                                    height: height,
                                    fontName: item.fontName || "",
                                    isBold: (item.fontName || "").toLowerCase().includes("bold"),
                                    isAllCap: false // calc later
                                });
                            }
                        });

                        // Convert to array and sort Y Desc (Top to Bottom)
                        const rawPageLines = Array.from(linesMap.values())
                            .sort((a, b) => b.y - a.y)
                            .map(l => {
                                l.text = l.text.trim();
                                l.isAllCap = l.text.length > 3 && l.text === l.text.toUpperCase();
                                return l;
                            });

                        analyzer.addPageLines(rawPageLines, i, totalPages);
                    }

                    if (isMounted) setProgress(30 + Math.round((i / totalPages) * 50));
                }

                if (!isMounted) return;

                // Run Analysis
                const docNodes = analyzer.process();
                setNodes(docNodes);
                setLoading(false);
                setProgress(100);
                if (onLoadComplete) onLoadComplete();

            } catch (err: any) {
                console.error("Smart Reader Engine Failed:", err);
                setError("Failed to parse document structure.");
                setLoading(false);
            }
        };

        process();
        return () => { isMounted = false; };
    }, [url, onLoadComplete]);

    // --- Renderer ---

    const renderNode = (node: DocNode) => {
        // Highlight Section refs
        const highlightRefs = (text: string) => {
            const parts = text.split(/(Section\s+\d+(\(\d+\))?|^\(\d+\)|^\([a-z]\))/g);
            return parts.map((part, i) => {
                if (!part) return null;
                if (/^(Section\s+\d+|^\(\d+\)|^\([a-z]\))/.test(part)) {
                    return <span key={i} className="font-bold text-slate-800">{part}</span>;
                }
                return part;
            });
        };

        const content = highlightRefs(node.content);

        switch (node.type) {
            case 'TITLE':
                return (
                    <div key={node.id} className="mb-8 px-2 text-center">
                        <h1 className="text-[22px] font-bold text-slate-900 leading-tight uppercase tracking-wide">
                            {content}
                        </h1>
                        <div className="mx-auto mt-4 h-1 w-12 bg-slate-900 rounded-full opacity-20" />
                    </div>
                );
            case 'CHAPTER':
                return (
                    <div key={node.id} className="mt-8 mb-4">
                        <h2 className="text-[18px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2">
                            {content}
                        </h2>
                    </div>
                );
            case 'SECTION':
                return (
                    <h3 key={node.id} className="mt-6 mb-3 text-[17px] font-semibold text-slate-900 leading-snug">
                        {content}
                    </h3>
                );
            case 'SUBSECTION': // (1)
            case 'CLAUSE':     // (a)
                return (
                    <div key={node.id} className="mt-2 mb-2 pl-4 flex items-start gap-2">
                        {/* We try to split index from content if possible, simplistic for now */}
                        <div className="text-[15.5px] leading-[1.5] text-slate-800 text-justify">
                            {content}
                        </div>
                    </div>
                );
            case 'LIST_ITEM':
                return (
                    <div key={node.id} className="mt-1 mb-1 pl-6 relative">
                        <div className="absolute left-2 top-2 w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <p className="text-[15px] leading-[1.5] text-slate-700">
                            {node.content.replace(/^[-•]\s*/, '')}
                        </p>
                    </div>
                );
            case 'PARAGRAPH':
            default:
                // Check if it looks like a Clause start that missed tagging?
                // Logic: starts with "(1)" -> Indent
                const isClause = /^\(\w+\)/.test(node.content);
                return (
                    <p key={node.id} className={`text-[15px] leading-[1.65] text-slate-700 mb-4 text-justify ${isClause ? 'pl-4 font-medium text-slate-800' : ''}`}>
                        {content}
                    </p>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-6 min-h-[60vh]">
                <div className="relative w-20 h-20">
                    <svg className="w-full h-full animate-spin text-blue-100" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-600">
                        {progress}%
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold text-slate-800">Building Semantic Tree</h3>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Analysis • Layout • Typography</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">Reader Error</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-6">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">Retry</button>
            </div>
        );
    }

    return (
        <div className="h-full bg-slate-50 overflow-y-auto">
            <div className="max-w-3xl mx-auto min-h-screen bg-white shadow-sm pb-24">
                {/* Header Metadata (Simulated) */}
                <div className="h-1 bg-blue-600 w-full mb-8" />

                <div className="px-6 md:px-10 py-6">
                    {nodes.map(renderNode)}

                    <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                        <BookOpen className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">End of Document</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

