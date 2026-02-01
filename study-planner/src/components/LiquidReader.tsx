"use client";

import { useEffect, useState, useRef } from 'react';
import { pdfjs } from 'react-pdf';
import { Loader2, AlertCircle } from 'lucide-react';

// Interfaces for structured content
interface TextBlock {
    type: 'h1' | 'h2' | 'h3' | 'p' | 'list-item';
    text: string;
    id: string;
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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let isMounted = true;

        const processPdf = async () => {
            try {
                setLoading(true);
                setProgress(5);

                // Load the PDF document
                const loadingTask = pdfjs.getDocument(url);
                loadingTask.onProgress = ({ loaded, total }) => {
                    if (total > 0) setProgress(Math.round((loaded / total) * 30)); // Load phase is 30%
                };

                const pdf = await loadingTask.promise;

                if (!isMounted) return;

                const extractedBlocks: TextBlock[] = [];
                const fontSizes: { [size: number]: number } = {};

                // Helper to record font size frequency to find "Body" size
                const recordFontSize = (size: number) => {
                    const rSize = Math.round(size);
                    fontSizes[rSize] = (fontSizes[rSize] || 0) + 1;
                };

                const totalPages = pdf.numPages;

                // We'll process pages in chunks to keep UI responsive? 
                // For now, simple loop as demanded "fast conversion"

                // First Pass: Extract all text items and determine structure
                // We assume strict sequential reading order for now.

                for (let i = 1; i <= totalPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();

                    // Simple text extraction for this MVP
                    // Real "Smart" extraction needs Y-sorting and line grouping

                    // Group items by Y coordinate (lines)
                    const items = textContent.items as any[];
                    // items have transform[4] = x, transform[5] = y
                    // origin is bottom-left usually

                    if (items.length === 0) continue;

                    // 1. Group by Lines (Y position with tolerance)
                    const lines: { y: number; items: any[] }[] = [];
                    const TOLERANCE = 5; // 5 units vertical tolerance

                    items.forEach(item => {
                        const y = item.transform[5];
                        const existingLine = lines.find(l => Math.abs(l.y - y) < TOLERANCE);
                        if (existingLine) {
                            existingLine.items.push(item);
                        } else {
                            lines.push({ y, items: [item] });
                        }
                    });

                    // 2. Sort Lines Top-to-Bottom (Y Descending)
                    lines.sort((a, b) => b.y - a.y);

                    // 3. Process Lines
                    lines.forEach(line => {
                        // Sort items Left-to-Right
                        line.items.sort((a, b) => a.transform[4] - b.transform[4]);

                        // Construct line text
                        const lineText = line.items.map(item => item.str).join(' ').trim();
                        if (!lineText) return;

                        // Identify Font Size (Max in line)
                        // item.transform[0] is usually font scale/size
                        const maxFontSize = Math.max(...line.items.map(item => Math.abs(item.transform[0])));
                        recordFontSize(maxFontSize);

                        // Temporary storage, we define types later
                        extractedBlocks.push({
                            type: 'p', // placeholder
                            text: lineText,
                            id: `page-${i}-y-${line.y}`,
                            // @ts-ignore - attaching temp size
                            size: maxFontSize
                        });
                    });

                    // Update Progress
                    if (isMounted) {
                        setProgress(30 + Math.round((i / totalPages) * 60));
                    }
                }

                // Determine Body Font Size (Mode)
                let bodySize = 12;
                let maxCount = 0;
                Object.entries(fontSizes).forEach(([size, count]) => {
                    if (count > maxCount) {
                        maxCount = count;
                        bodySize = parseFloat(size);
                    }
                });

                // Classify Blocks
                const structuredBlocks = extractedBlocks.map((block: any) => {
                    const size = block.size;
                    let type: TextBlock['type'] = 'p';

                    if (size > bodySize * 1.5) type = 'h1';
                    else if (size > bodySize * 1.15) type = 'h2';
                    else if (/^(\d+\.|-|•)\s/.test(block.text)) type = 'list-item';

                    return {
                        type,
                        text: block.text,
                        id: block.id
                    } as TextBlock;
                });

                // Post-Processing: Merge adjacent 'p' blocks that seem to be part of the same paragraph?
                // For Liquid Mode to be "Continuous", we should probably merge lines unless they are headers or list items.
                // Or simply rely on rendering with nice spacing.
                // Simple Merge Strategy:
                // If current is 'p' and prev is 'p', and neither ends with a hard stop (like .), maybe merge?
                // For this MVP, let's keep lines separate but style them closely to look like a paragraph flow,
                // OR attempt a merge.

                const mergedBlocks: TextBlock[] = [];
                let currentBuffer: TextBlock | null = null;

                structuredBlocks.forEach((block) => {
                    if (block.type === 'h1' || block.type === 'h2' || block.type === 'list-item') {
                        if (currentBuffer) {
                            mergedBlocks.push(currentBuffer);
                            currentBuffer = null;
                        }
                        mergedBlocks.push(block);
                    } else {
                        // It's a paragraph line
                        if (currentBuffer) {
                            // Check if acts like continuation (previous didn't end in typical sentence end)
                            // This is heuristic and can be buggy, but improves flow.
                            const prevText = currentBuffer.text;

                            // Simple merge: Just add space
                            currentBuffer.text += " " + block.text;
                        } else {
                            currentBuffer = block;
                        }
                    }
                });
                if (currentBuffer) mergedBlocks.push(currentBuffer);


                setBlocks(mergedBlocks);
                setLoading(false);
                setProgress(100);
                if (onLoadComplete) onLoadComplete();

            } catch (err: any) {
                console.error("Liquid Mode Error:", err);
                setError(err.message || "Failed to process PDF for Liquid Mode");
                setLoading(false);
            }
        };

        processPdf();

        return () => { isMounted = false; };
    }, [url]);


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4 min-h-[50vh]">
                <div className="relative w-16 h-16">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-600">
                        {progress}%
                    </div>
                </div>
                <p className="text-slate-500 text-sm font-medium animate-pulse">Converting to Smart View...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-red-500">
                <AlertCircle className="w-12 h-12 mb-2" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="max-w-2xl mx-auto px-4 py-8 bg-white min-h-full">
            <article className="prose prose-slate prose-lg max-w-none">
                {blocks.map((block, index) => {
                    switch (block.type) {
                        case 'h1':
                            return (
                                <h2 key={block.id} className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2 border-slate-100">
                                    {block.text}
                                </h2>
                            );
                        case 'h2':
                            return (
                                <h3 key={block.id} className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                                    {block.text}
                                </h3>
                            );
                        case 'list-item':
                            return (
                                <div key={block.id} className="flex gap-3 my-2 text-slate-700 leading-relaxed">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span>{block.text.replace(/^(\d+\.|-|•)\s/, '')}</span>
                                </div>
                            );
                        default:
                            return (
                                <p key={block.id} className="text-slate-700 leading-relaxed mb-4 text-[17px] text-justify">
                                    {block.text}
                                </p>
                            );
                    }
                })}
            </article>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
                End of Document
            </div>
        </div>
    );
}
