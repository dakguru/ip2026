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

interface ExtractedBlock extends TextBlock {
    size: number;
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

                const loadingTask = pdfjs.getDocument(url);
                loadingTask.onProgress = ({ loaded, total }: { loaded: number; total: number }) => {
                    if (total > 0) setProgress(Math.round((loaded / total) * 30));
                };

                const pdf = await loadingTask.promise;

                if (!isMounted) return;

                const extractedBlocks: ExtractedBlock[] = [];
                const fontSizes: { [size: number]: number } = {};

                const recordFontSize = (size: number) => {
                    const rSize = Math.round(size);
                    fontSizes[rSize] = (fontSizes[rSize] || 0) + 1;
                };

                const totalPages = pdf.numPages;

                for (let i = 1; i <= totalPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();

                    const items = textContent.items as any[]; // Type assertion for pdf.js items

                    if (items.length === 0) continue;

                    const lines: { y: number; items: any[] }[] = [];
                    const TOLERANCE = 5;

                    items.forEach(item => {
                        const y = item.transform[5];
                        const existingLine = lines.find(l => Math.abs(l.y - y) < TOLERANCE);
                        if (existingLine) {
                            existingLine.items.push(item);
                        } else {
                            lines.push({ y, items: [item] });
                        }
                    });

                    lines.sort((a, b) => b.y - a.y);

                    lines.forEach(line => {
                        line.items.sort((a, b) => a.transform[4] - b.transform[4]);

                        const lineText = line.items.map(item => item.str).join(' ').trim();
                        if (!lineText) return;

                        const maxFontSize = Math.max(...line.items.map(item => Math.abs(item.transform[0])));
                        recordFontSize(maxFontSize);

                        extractedBlocks.push({
                            type: 'p',
                            text: lineText,
                            id: `page-${i}-y-${line.y}`,
                            size: maxFontSize
                        });
                    });

                    if (isMounted) {
                        setProgress(30 + Math.round((i / totalPages) * 60));
                    }
                }

                let bodySize = 12;
                let maxCount = 0;
                Object.entries(fontSizes).forEach(([size, count]) => {
                    if (count > maxCount) {
                        maxCount = count;
                        bodySize = parseFloat(size);
                    }
                });

                const structuredBlocks = extractedBlocks.map((block) => {
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
                        if (currentBuffer) {
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
    }, [url, onLoadComplete]);

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
                {blocks.map((block) => {
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
