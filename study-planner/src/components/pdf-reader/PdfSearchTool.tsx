"use client";

import { Search, X, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfSearchToolProps {
    isVisible: boolean;
    onClose: () => void;
    searchTerm: string;
    setSearchTerm: (s: string) => void;
    totalMatches: number;
    currentMatch: number;
    onNext: () => void;
    onPrev: () => void;
    isSearching: boolean;
    colorMode: 'light' | 'dark' | 'sepia';
}

export default function PdfSearchTool({ 
    isVisible, onClose, searchTerm, setSearchTerm, 
    totalMatches, currentMatch, onNext, onPrev, isSearching, colorMode
}: PdfSearchToolProps) {
    
    const colorStyles = {
        ui: colorMode === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : colorMode === 'sepia' ? 'bg-[#fdf6e3] border-[#d4c39c] text-[#3d2e24]' : 'bg-white border-zinc-200 text-zinc-900',
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className={`absolute top-16 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[60] p-3 rounded-2xl border shadow-2xl ${colorStyles.ui}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center bg-black/5 rounded-xl px-3 py-2">
                            <Search className="w-4 h-4 opacity-40 mr-2" />
                            <input 
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Find in document..."
                                className="bg-transparent border-none outline-none text-sm w-full font-medium"
                            />
                            {isSearching && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {searchTerm && (
                        <div className="mt-3 flex items-center justify-between border-t border-current/5 pt-3">
                            <span className="text-[10px] font-black uppercase opacity-50 tracking-widest pl-1">
                                {totalMatches > 0 ? `${currentMatch} of ${totalMatches} matches` : 'No matches found'}
                            </span>
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={onPrev}
                                    disabled={totalMatches === 0}
                                    className="p-1.5 hover:bg-black/5 disabled:opacity-20 rounded-lg"
                                >
                                    <ChevronUp className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={onNext}
                                    disabled={totalMatches === 0}
                                    className="p-1.5 hover:bg-black/5 disabled:opacity-20 rounded-lg"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
