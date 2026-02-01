"use client";

import { useEffect, useState, useRef, useMemo } from 'react';
import { pdfjs } from 'react-pdf';
import { Loader2, AlertCircle } from 'lucide-react';

// Enhanced Block Types for Legal/Academic Structure
type BlockType = 'TITLE' | 'CHAPTER' | 'SECTION' | 'SUBSECTION' | 'BODY' | 'LIST_ITEM' | 'FOOTER' | 'HEADER';

interface TextBlock {
    type: BlockType;
    text: string;
    id: string;
}

interface ExtractedBlock {
    type: BlockType;
    text: string;
    id: string;
    size: number;
    y: number; // for header/footer detection
    page: number;
    isBold: boolean;
}

interface LiquidReaderProps {
    url: string;
    onLoadComplete?: () => void;
}

export default function LiquidReader({ url, onLoadComplete }: LiquidReaderProps) {
    const [blocks, setBlocks] = useState<TextBlock[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const processPdf = async () => {
            try {
                setLoading(true);
                setProgress(10);

                const loadingTask = pdfjs.getDocument(url);
                loadingTask.onProgress = ({ loaded, total }: { loaded: number; total: number }) => {
                    if (total > 0) setProgress(Math.round((loaded / total) * 20)); // PDF Load is 20%
                };

                const pdf = await loadingTask.promise;
                if (!isMounted) return;

                const extractedBlocks: ExtractedBlock[] = [];
                const fontSizes: { [size: number]: number } = {};

                // Helper to normalize font size
                const getFontSize = (transform: number[]) => Math.round(Math.abs(transform[0]));

                const totalPages = pdf.numPages;

                // 1. Extraction Pass
                for (let i = 1; i <= totalPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 1.0 });
                    const pageHeight = viewport.height;
                    const textContent = await page.getTextContent();
                    const items = textContent.items as any[]; // pdf.js item type

                    if (items.length === 0) continue;

                    // Group items into lines
                    const lines: { y: number; items: any[]; size: number; isBold: boolean, text: string }[] = [];
                    const TOLERANCE = 4; // reduced tolerance for better accuracy

                    // Pre-process items
                    items.forEach(item => {
                        // transform[5] is Y (origin bottom-left usually in PDF)
                        // But we want top-down for logic, so let's keep PDF coords (bottom-up) but sort descending
                        const y = item.transform[5];

                        // Find existing line
                        const existingLine = lines.find(l => Math.abs(l.y - y) < TOLERANCE);
                        if (existingLine) {
                            existingLine.items.push(item);
                        } else {
                            lines.push({
                                y,
                                items: [item],
                                size: 0,
                                isBold: false,
                                text: "" // filled later 
                            });
                        }
                    });

                    // Sort lines Top -> Bottom (Y Descending)
                    lines.sort((a, b) => b.y - a.y);

                    // Process each line properties
                    lines.forEach(line => {

                        // Header/Footer Detection (Geometry based)
                        // Top 5% or Bottom 7% (Footers are often larger)
                        const isTop = line.y > pageHeight * 0.95;
                        const isBottom = line.y < pageHeight * 0.07;

                        // Sort items Left -> Right
                        line.items.sort((a, b) => a.transform[4] - b.transform[4]);

                        // Build Text
                        const lineText = line.items.map(item => item.str).join(' ').trim();
                        if (!lineText) return;

                        // Identify properties
                        // simple heuristic: if font name contains 'Bold'
                        const isBold = line.items.some(item => item.fontName?.toLowerCase().includes('bold'));
                        const maxFontSize = Math.max(...line.items.map(item => getFontSize(item.transform)));

                        // Collect stats for body text detection
                        if (!isTop && !isBottom) {
                            fontSizes[maxFontSize] = (fontSizes[maxFontSize] || 0) + 1;
                        }

                        // Filter Noise/Watermarks
                        if (lineText.includes("Dak Guru") || lineText.match(/^\s*\d+\s*$/) || lineText.includes("www.dakguru.com")) {
                            // Likely watermark or page number
                            return;
                        }

                        extractedBlocks.push({
                            type: 'BODY', // default, will refine
                            text: lineText,
                            id: `p${i}-y${Math.round(line.y)}`,
                            size: maxFontSize,
                            y: line.y,
                            page: i,
                            isBold: isBold
                        });
                    });

                    if (isMounted) setProgress(20 + Math.round((i / totalPages) * 50));
                }

                // 2. Identify Body Font Size (Mode)
                let bodySize = 12;
                let maxCount = 0;
                Object.entries(fontSizes).forEach(([size, count]) => {
                    const s = parseFloat(size);
                    if (count > maxCount && s > 0) {
                        maxCount = count;
                        bodySize = s;
                    }
                });

                // 3. Structure Classification & Refinement
                const classifiedBlocks = extractedBlocks.map(block => {
                    // Filter Header/Footer via explicit check if not already caught
                    // (We did some filtering above, but lets be stricter)
                    // Re-assert geometry check if needed, but we trust the extraction loop generally.

                    let type: BlockType = 'BODY';

                    const ratio = block.size / bodySize;
                    const text = block.text;

                    // Classification Rules
                    if (ratio > 1.5 || (block.isBold && ratio > 1.2 && text === text.toUpperCase())) {
                        type = 'TITLE';
                    } else if (/^CHAPTER\s+[IVX0-9]+/i.test(text)) {
                        type = 'CHAPTER';
                    } else if (/^Section\s+\d+/i.test(text) || /^Part\s+[IVX]+/i.test(text)) {
                        type = 'SECTION';
                    } else if (/^\(\d+\)/.test(text) || /^\([a-z]\)/.test(text) || /^\d+\./.test(text)) {
                        // Matches (1), (a), 1.
                        // But if it's very bold/large, might be section.
                        // Usually subsection
                        if (block.isBold && ratio > 1.1) type = 'SECTION';
                        else type = 'SUBSECTION'; // Will effectively look like list/subsection
                    } else if (text.startsWith('•') || text.startsWith('- ')) {
                        type = 'LIST_ITEM';
                    } else if (ratio > 1.1 && block.isBold) {
                        // Generic sub-heading
                        type = 'SECTION';
                    }

                    return { ...block, type };
                });

                // 4. Paragraph Merging (The tricky part)
                const mergedBlocks: TextBlock[] = [];
                let currentBuffer: { type: BlockType, text: string, id: string } | null = null;

                const flushBuffer = () => {
                    if (currentBuffer) {
                        mergedBlocks.push({ ...currentBuffer });
                        currentBuffer = null;
                    }
                };

                classifiedBlocks.forEach((block, index) => {
                    const isHeading = ['TITLE', 'CHAPTER', 'SECTION'].includes(block.type);
                    const isList = ['SUBSECTION', 'LIST_ITEM'].includes(block.type);

                    if (isHeading || isList) {
                        flushBuffer();
                        mergedBlocks.push({
                            type: block.type,
                            text: block.text,
                            id: block.id
                        });
                    } else {
                        // It's BODY (or unclassified)
                        if (currentBuffer) {
                            // Check merge conditions
                            // Don't merge if previous line ended with period? 
                            // Actually, in PDF, a paragraph is split physically.
                            // Valid Layout:   "This is a long sentence that" (no dot)
                            //                 "continues on the next line." (dot)
                            // We SHOULD merge these.

                            // Invalid Merge:  "End of para."
                            //                 "Start of new."

                            // So, if buffer does NOT end in . or : or ?, merge.
                            const endsWithStop = /[.:!?]$/.test(currentBuffer.text.trim());
                            const currentStartsWithCap = /^[A-Z]/.test(block.text);

                            if (!endsWithStop) {
                                // Merge
                                // Add space if needed (hyphenation check could go here)
                                if (currentBuffer.text.endsWith('-')) {
                                    currentBuffer.text = currentBuffer.text.slice(0, -1) + block.text;
                                } else {
                                    currentBuffer.text += " " + block.text;
                                }
                            } else {
                                // Previous ended with stop. 
                                // If current starts with Capital, it's likely new para.
                                // If it starts with lowercase, it might be weird formatting, but usually PDF requires explicit breaks.
                                flushBuffer();
                                currentBuffer = {
                                    type: 'BODY',
                                    text: block.text,
                                    id: block.id
                                };
                            }
                        } else {
                            currentBuffer = {
                                type: 'BODY',
                                text: block.text,
                                id: block.id
                            };
                        }
                    }
                });
                flushBuffer();

                setBlocks(mergedBlocks);
                setLoading(false);
                setProgress(100);
                if (onLoadComplete) onLoadComplete();

            } catch (err: any) {
                console.error("Liquid Mode Error:", err);
                setError(err.message || "Failed to process PDF");
                setLoading(false);
            }
        };

        processPdf();

        return () => { isMounted = false; };
    }, [url, onLoadComplete]);

    const renderBlock = (block: TextBlock) => {
        // Highlight logic for "Section X"
        const processText = (text: string) => {
            // Bold "Section X" or "(1)"
            const parts = text.split(/(Section\s+\d+(?:[\.\)])?|^\(\d+\)|^\([a-z]\))/g);
            if (parts.length === 1) return text;

            return parts.map((part, i) => {
                if (part.match(/(Section\s+\d+(?:[\.\)])?|^\(\d+\)|^\([a-z]\))/)) {
                    return <span key={i} className="font-bold text-slate-900">{part}</span>;
                }
                return part;
            });
        };

        switch (block.type) {
            case 'TITLE':
                return (
                    <h1 key={block.id} className="text-[22px] font-bold text-center text-slate-900 mb-6 leading-tight uppercase tracking-wide">
                        {block.text}
                    </h1>
                );
            case 'CHAPTER':
                return (
                    <h2 key={block.id} className="text-[18px] font-bold text-slate-800 mt-5 mb-3 uppercase tracking-wider border-b-2 border-slate-100 pb-1">
                        {block.text}
                    </h2>
                );
            case 'SECTION':
                return (
                    <h3 key={block.id} className="text-[16px] font-semibold text-slate-800 mt-4 mb-2">
                        {block.text}
                    </h3>
                );
            case 'SUBSECTION':
                return (
                    <div key={block.id} className="text-[15px] font-medium text-slate-800 mt-2 mb-1 pl-4 indent-[-1rem] leading-relaxed">
                        {processText(block.text)}
                    </div>
                );
            case 'LIST_ITEM':
                return (
                    <div key={block.id} className="flex gap-3 my-2 pl-4 text-slate-700">
                        <span className="text-slate-900 font-bold">•</span>
                        <span className="flex-1 leading-relaxed">{block.text.replace(/^[-•]\s*/, '')}</span>
                    </div>
                );
            case 'BODY':
            default:
                return (
                    <p key={block.id} className="text-[15px] leading-[1.6] text-slate-700 mb-3 text-justify font-normal tracking-normal">
                        {processText(block.text)}
                    </p>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-6">
                <div className="relative w-16 h-16 mb-4">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-600">
                        {progress}%
                    </div>
                </div>
                <p className="text-slate-500 text-sm font-medium animate-pulse">Converting to Smart Reader...</p>
                <p className="text-slate-400 text-xs mt-2">Creating book-like layout</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] p-8 text-center">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Could not switch to Smart View</h3>
                <p className="text-slate-500 text-sm mb-6">{error}</p>
                <button onClick={() => window.location.reload()} className="text-blue-600 font-medium text-sm">Tap to Retry</button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-5 py-8 bg-white min-h-screen">
            {/* Legal Book Style Container */}
            <article className="prose prose-slate max-w-none">
                {blocks.map(renderBlock)}
            </article>

            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center gap-2">
                <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">End of Document</p>
            </div>
        </div>
    );
}
